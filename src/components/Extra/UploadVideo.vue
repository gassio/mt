<template>
    <div class="upload-video">
        
        <div class="upload-video__container" @click="createJwVideo()"> 
            <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
            <span class="upload-video__text">Click to upload video</span>
        </div>

		<el-dialog class="uploadvid" title="Upload video" :visible.sync="modalDragDropIsOpen" :before-close="closeModalDragDrop" size="medium">
            <div class="uploadvid__area">
                <span class="uploadvid__text">Drop videos here or click to upload</span>
            </div>
		</el-dialog>

        <el-dialog class="uploadvid__metadata" title="Video details" :visible.sync="modalMetadataIsOpen" :close-on-click-modal="false">
            <el-form :model="uploadVidMetadata" ref="uploadVidMetadata" label-width="120px" :rules="uploadVidMetadataRules">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="uploadVidMetadata.title"></el-input>
                </el-form-item>
                <el-form-item label="Class" prop="class">
                    <el-select v-model="uploadVidMetadata.class" placeholder="Select the class" @change="getAssignmentsByThisClass()">
                        <el-option :label="c.name" :value="c.name" v-for="c in activeClasses" :key="c.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Class number" prop="classNumber">
                    <el-select v-model="uploadVidMetadata.classNumber" placeholder="Get the class number">
                        <el-option :label="c.number" :value="c.number" v-for="c in activeClasses" :key="c.id" v-if="uploadVidMetadata.class === c.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Assignment" prop="assignment">
                    <el-select v-model="uploadVidMetadata.assignmentId" placeholder="Select an assignment" >
                        <el-option :label="a.title" :value="a.id" v-for="a in assignments" :key="a.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Department" prop="classDepartment">
                    <el-select placeholder="Select the department" v-model="uploadVidMetadata.classDepartment">
                        <el-option v-for="d in departments" :label="d" :value="d" :key="d"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Genre" prop="genre">
                    <el-select v-model="uploadVidMetadata.genre" placeholder="Select the video genre">
                        <el-option v-for="g in genres" :key="g.name" :label="g.name" :value="g.id"></el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="Presentation date" required>
                    <el-col :span="11">
                        <el-form-item prop="presentedAt">
                            <el-date-picker type="date" placeholder="Pick a date" v-model="uploadVidMetadata.presentedAt" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="startUpload('uploadVidMetadata')">Start upload</el-button>
                    <el-button @click="modalMetadataIsOpen = false">Cancel</el-button>
                </el-form-item>
            </el-form>
		</el-dialog>

		<el-dialog class="uploadvid__progress" title="Upload in progress" :visible.sync="modalProgressIsOpen" :before-close="closeModalProgress" :close-on-click-modal="false">
            <el-progress :percentage="parseFloat(uploadProgress.toFixed(2))" :stroke-width="14"></el-progress> 
        </el-dialog>

		<el-dialog class="uploadvid__sync" :visible.sync="modalSyncOpen" :close-on-click-modal="false" :show-close="false">
            <div class="uploadvid__sync-load" 
                v-loading="modalSyncOpen" 
                element-loading-text="Processing your file..." 
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"></div>
        </el-dialog>

        <!-- <el-dialog class="uploadvid__maintenance" title="Upload video" :visible.sync="modalMaintenanceIsOpen" :before-close="closeModalMaintenance" >
             <span>Coming soon.</span>
        </el-dialog> -->
        
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    import Dropzone from 'dropzone'
    import 'dropzone/dist/dropzone.css'

    import { Loading } from 'element-ui';
    
    export default {
        props: ['currentClassProp'],
        data() {
            return {
                dropzoneInstance: null,
                modalMaintenanceIsOpen: false,
                modalDragDropIsOpen: false,
                modalMetadataIsOpen: false,
                modalProgressIsOpen: false,
                modalSyncOpen: false,
                uploadProgress: 0,
                uploadVidMetadata: {
					title: '',
					class: this.currentClassProp,
                    classNumber: '',
                    classDepartment: '',
                    genre: '',
                    presentedAt: '',
                    assignmentId: ''
                },
                uploadVidMetadataRules: {
                    title: [
                        { required: true, message: 'Please input video title', trigger: 'blur' },
                    ],
                    class: [
                        { required: true, message: 'Please select class', trigger: 'blur' },
                    ],
                    genre: [
                        { required: true, message: 'Please select genre', trigger: 'blur' },
                    ],
                    presentedAt: [
                        { type: 'date', required: true, message: 'Please choose date', trigger: 'blur' },
                    ],
                },
                secureHTTPService : this.$root.$options.secureHTTPService
            }
        },
        created() {
            this.$store.dispatch('getAllClasses')
        },
        mounted() {
        },
        methods: {
            createJwVideo() {
                let self = this 
                this.modalDragDropIsOpen = true
                
                this.secureHTTPService.post("jwvideo")
                    .then( response => {
                        let theData = response.data.data

                        var theUrl = 'https' + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                        self.$store.commit('SET_UPLOAD_URL', theUrl)
                        console.log("Upload url created. The url is ", theUrl)

                        self.createVideo(theData.link.query.key)
                    })
                    .catch( error => console.log("Couldn't post jwvideo \n", error))
            },
            createVideo(jwVideoId) {
                var self = this
                
                // Creating dropzone
                if (this.dropzoneInstance === null) {
                    this.dropzoneInstance = new Dropzone('.uploadvid__text', { 
                        url: 'http://www.test.com', // this.uploadUrl
                        autoProcessQueue: false,
                        parallelUploads: 100,
                        maxFiles: 1,
                        timeout: 1800000, // 30min 
                        headers: {
                            'Cache-Control': null,
                            'X-Requested-With': null,
                        }
                    })
                }

                // Sets the dropzone url
                this.dropzoneInstance.options.url = this.uploadUrl
                console.log('this url: ', this.dropzoneInstance.options.url)

                // DROPZONE EVENTS
                // File added 
                // user enters video details
                this.dropzoneInstance.on("addedfile", (file) => {
                    // Resets the value of metadataModal fields
                    this.uploadVidMetadata.title = '';this.uploadVidMetadata.class = this.currentClassProp;this.uploadVidMetadata.genre = '';this.uploadVidMetadata.presentedAt = '';
                    // Closes and opens the modals
                    this.modalDragDropIsOpen = false
                    this.modalMetadataIsOpen = true
                    // Sets the title field as the added file.name 
                    this.uploadVidMetadata.title = file.name
                    console.log("Added file.")
                })

                // Updates the upload progress bar
                this.dropzoneInstance.on("totaluploadprogress", (progress) => {
                    this.uploadProgress = progress
                    console.log("Progress event \n ", progress)
                })
                
                // Event fired when the uploading process reaches 100%.
                this.dropzoneInstance.on("success", () => {
                    console.log('Jwvideo object created. The key is: ', jwVideoId)
                    
                    this.modalSyncOpen = true

                    // Shows loading spinner
                    let link, duration, thumb

                    // Fetching link and duration
                    let intervalID = setInterval(function () {
                        self.secureHTTPService.get("jwconversion?videoId=" + jwVideoId)
                            .then( response => {
                                console.log(' getting conversions...')
                                let conversions = response.data.data.conversions
                                var conversionNames = ['720p', '406p', 'Original'] // Conversion names in order of preference
                                console.log("conv1: ", conversions)
                                var everythingReady = true // this is a trick
                                for (var i = 0, l = conversions.length; i < l; i++) {
                                    if (conversions[i].status === 'Queued' && conversions[i].template.name === '720p'){
                                        everythingReady = false
                                    }
                                    else if (conversions[i].status === 'Queued' && conversions[i].template.name === '406p'){
                                        everythingReady = false
                                    }
                                    else if (conversions[i].status === 'Queued' && conversions[i].template.name === 'Original'){
                                        everythingReady = false
                                    }
                                }
                                if (conversions.length === 1) everythingReady = false
                                if (everythingReady) {
                                    // Pick conversion logic
                                    var pickedVidIndex = 0
                                    var foundIt = false
                                    for (var n = 0; n < conversionNames.length; n++) {
                                        console.log("conv2: ", conversions, conversionNames[n])
                                        for (var i = 0, l = conversions.length; i < l; i++) {
                                            if (conversions[i].status === 'Ready' && conversions[i].template.name === conversionNames[n]) {
                                                pickedVidIndex = i
                                                foundIt = true
                                                // Do necessary stuff after picking a conversion
                                                link = conversions[i].link.protocol + '://' + conversions[i].link.address + conversions[i].link.path
                                                duration = conversions[i].duration
                                                console.log('|> Link: ', link)
                                                console.log('|> Duration: ', duration)
                                                        
                                                // POST video 
                                                self.$store.dispatch('createVideo', {
                                                    "assignmentId": self.uploadVidMetadata.assignmentId,
                                                    "title": self.uploadVidMetadata.title,
                                                    "class": self.uploadVidMetadata.class,
                                                    "classNumber": self.uploadVidMetadata.classNumber,
                                                    "classDepartment": self.uploadVidMetadata.classDepartment,
                                                    "jwVideoId": jwVideoId,
                                                    "genre": self.uploadVidMetadata.genre,
                                                    "presentedAt": self.uploadVidMetadata.presentedAt,
                                                    "featuredGlobal": false,
                                                    "featuredClass": false,
                                                    "link": link,
                                                    "duration": parseInt(duration),
                                                    "thumb": 'http://www.ulivesmart.com/wp-content/uploads/2017/05/feature-video-thumbnail-overlay.png',
                                                })
                                                
                                                self.modalSyncOpen = false  // Close loading bar
                                                self.currentClassSelected = self.uploadVidMetadata.class // Change current class screen to the uploaded video class  
                                                console.log("currentClassSelected: ", self.currentClassSelected)
                                                clearInterval(intervalID)

                                                // Clearing modal form
                                                self.uploadVidMetadata = { title: '', class: '', genre: '', presentedAt: ''}
                                                break
                                            }
                                        }
                                        if (foundIt) {
                                            break
                                        }
                                    }     
                                }                           
                            })
                            .catch( (error) => console.log("Couldn't get conversions \n ", error))
                    }, 5000)

                
                    let uploadedId, 
                        uploadedTitle = self.uploadVidMetadata.title;

                    // Closing the progress modal
                    this.modalProgressIsOpen = false

                })

                this.dropzoneInstance.on("error", (files, response) => {
                    self.modalProgressIsOpen = false
                })

                this.dropzoneInstance.on("canceled", (files, response) => {
                    console.log('canceled')
                })

                // UI events
                this.dropzoneInstance.on("dragover", event => {
                    $('.uploadvid__area').css('border', '8px dashed #ccc')
                })

                this.dropzoneInstance.on("dragleave", event => {
                    $('.uploadvid__area').css('border', 'none')
                })

                this.dropzoneInstance.on("drop", event => {
                })   
            },
            startUpload(formName) {
                this.$refs[formName].validate(
                    (valid) => {
                        if (valid) {
                            this.modalMetadataIsOpen = false
                            this.modalProgressIsOpen = true
                            this.dropzoneInstance.processQueue()
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    })
            },
            closeModalDragDrop() {
                this.modalDragDropIsOpen = false
            },
            closeModalProgress() {
                this.modalProgressIsOpen = false
                this.openMsgUploadStopped()
                this.dropzoneInstance.removeAllFiles(true)
            },
            closeModalMaintenance() {
                this.modalMaintenanceIsOpen = false
            },
            loadUrlPOC() {
                this.modalDragDropIsOpen = true

                this.dropzoneInstance = new Dropzone('#mydropo', { 
                        url: 'http://www.test.com', // this.uploadUrl
                        uploadMultiple: true,
                        autoProcessQueue: false,
                        parallelUploads: 100,
                        maxFiles: 1,
                        timeout:  3000,// 1800000, // 30min 
                        headers: {
                            'Cache-Control': null,
                            'X-Requested-With': null,
                        }, 
                })
                let self = this
                this.secureHTTPService.post("jwvideo")
                    .then( response => {
                        let theData = response.data.data
                        let theUrl = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                        self.$store.commit('SET_UPLOAD_URL', theUrl)
                        console.log("Upload url created. The url is ", theUrl)

                        // document.getElementsByClassName('form.uploadvid__form').action = theUrl;
                        $("form.uploadvid__area").attr("action", theUrl); 
                        console.log('Form action assigned!')

                        $("form.uploadvid__area input:file").change(function() {
                            self.modalMetadataIsOpen = true
                        })
                    })
                    .catch( error => { 
                        console.log("Couldn't post jwvideo \n", error)
                    })
            },
            openMsgUploadStopped(vidTitle) {
                this.$message({
                    message: 'Video uploading was stopped...',
                    showClose: true
                })
            },
            getAssignmentsByThisClass() {
                this.uploadVidMetadata.classNumber = ''
                var classId;
                for (var i = 0, l = this.classes.length; i < l; i++) {
                    if (this.classes[i].name === this.uploadVidMetadata.class) {
                        classId = this.classes[i].id
                        break
                    }
                }
                this.$store.dispatch('getAssignments', classId)
            }
        },
        computed: {
            ...mapGetters([
                'videos', 'uploadUrl', 'classes', 
                'activeClasses', 'departments', 'assignments',
                'genres'
            ]),
        }    
}

</script>

<style>

/* ==============================================
                #VUE-DROPZONE
    ================================================= */

/* Disable files preview  */
.dz-preview {
    display: none;
}


.uploadvid {
    margin: 0;
    padding: 0;
    position: fixed;
    overflow: hidden;
}	
    .uploadvid .el-dialog {
        width: 100%;
        height: 100%;
    }

    .uploadvid .el-dialog__body {
        height: 80%;
        padding: 25px 10px;
    }

	.uploadvid__area {
        height: 100%;
        display: flex;
        justify-content: center;
	}
	.uploadvid__area:hover {
        border: 8px dashed #ccc;
	}
        .uploadvid__text {
            font-size: 1.4em;
            display: flex;
            justify-content: center;
            align-self: center;
            align-items: center;
            height: 100%;
            width: 100%;
        }
        




/* ==============================================
					#ADD-VIDEO-BUTTON
		================================================= */

    .upload-video {
		width: 400px;
        height: 150px;
		color: #A90931;
		background-color: #FFF;
		border: 1px dashed #DADDE2;
        /* padding: 25px;
        margin-bottom: 10px; */
		display: flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
	}
	.upload-video:hover {
		color: #FFF;
		cursor: pointer;
		transition: 0.2s;
		-webkit-transition: 0.2s;
		background-color: #A90931;
	}

        .upload-video__container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

            .upload-video__text {
                font-size: 14px;
            }


/* ==============================================
					#TRUMPS
    ================================================= */

    .uploadvid__sync .el-loading-text {
        font-size: 1.5em;
    }

    .uploadvid__sync .uploadvid__sync-load {
        padding: 10em 0 5em 0;        
    }

    .el-message__group p{
        font-size: 1.2em;
    }

</style>