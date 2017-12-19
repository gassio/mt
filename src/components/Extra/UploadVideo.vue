<template>
    <div class="home__upload-video">
        <div class="upload-video__container" @click="createJwVideo()"> <!-- loadUrlPOC() -->
            <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
            <span class="upload-video__text">Click to upload video</span>
        </div>

        <!-- <el-dialog class="uploadvid__maintenance" title="Upload video" :visible.sync="modalMaintenanceIsOpen" :before-close="closeModalMaintenance" >
             <span>Coming soon.</span>
        </el-dialog> -->
        
		<el-dialog class="uploadvid" title="Upload video" :visible.sync="modalDragDropIsOpen" :before-close="closeModalDragDrop">
                <!-- <form id="mydropo" class="uploadvid__area" method="POST" action="" enctype="multipart/form-data">
                    <input type="file" name="file" class="uploadvid__text" />
                </form> -->
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
                    <el-select v-model="uploadVidMetadata.class" placeholder="Select the class" v-for="c in classes" v-bind:key="c.title">
                        <el-option :label="c.title" :value="c.title"></el-option>
                    </el-select>
                    <!-- <el-input v-model="uploadVidMetadata.class"></el-input> -->
                </el-form-item>
                <el-form-item label="Genre" prop="genre">
                    <el-select v-model="uploadVidMetadata.genre" placeholder="Select the video genre">
                        <el-option label="Elevator pitch" value="Elevator pitch"></el-option>
                        <el-option label="Lab presentation" value="Lab presentation"></el-option>
                        <el-option label="Thesis talk" value="Thesis talk"></el-option>
                        <el-option label="Progress report" value="Progress report"></el-option>
                        <el-option label="Conference talk" value="Conference talk"></el-option>
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
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    import Dropzone from 'dropzone'
    import 'dropzone/dist/dropzone.css'

    import { Loading } from 'element-ui';
    
    export default {
        data() {
            return {
                dropzoneInstance: null,
                modalMaintenanceIsOpen: false,
                modalDragDropIsOpen: false,
                modalMetadataIsOpen: false,
                modalProgressIsOpen: false,
                uploadProgress: 0,
                uploadVidMetadata: {
					title: '',
					class: '',
                    genre: '',
                    presentedAt: ''
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
                }
            }
        },
        created() {
            this.$store.dispatch('getAllClasses')
        },
        mounted() {

        },
        methods: {
            createJwVideo() {
                let that = this 
                this.modalDragDropIsOpen = true

                axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
                    .then( response => {
                        let theData = response.data.data

                        var theUrl = 'https' + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                        that.$store.commit('SET_UPLOAD_URL', theUrl)
                        console.log("Upload url created. The url is ", theUrl)

                        that.createVideo(theData.link.query.key)
                    })
                    .catch( error => console.log("Couldn't post jwvideo \n", error))
            },
            createVideo(jwVideoId) {
                var that = this
                
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
                    this.uploadVidMetadata.title = '';this.uploadVidMetadata.class = '';this.uploadVidMetadata.genre = '';this.uploadVidMetadata.presentedAt = '';
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
                    
                    // Shows loading spinner
                    var loadingInstance = Loading.service({ fullscreen: true, text: "Video synchronizing..." }); 
                    let link, duration, thumb

                    // Fetching link and duration
                    let intervalID = setInterval(function () {
                        axios.get("https://metalogon-api.herokuapp.com/rest/jwconversion?videoId=" + jwVideoId)
                            .then( response => {
                                console.log(' getting conversions...')
                                let conversions = response.data.data.conversions

                                for (var i = 0, l = conversions.length; i < l; i++) {
                                    if (conversions[i].status === 'Ready' && conversions[i].template.name === '720p') {
                                        link = conversions[i].link.protocol + '://' + conversions[i].link.address + conversions[i].link.path
                                        duration = conversions[i].duration
                                        console.log('|> Link: ', link)
                                        console.log('|> Duration: ', duration)
                                        
                                        // POST video 
                                        that.$store.dispatch('createVideo', {
                                            "jwVideoId": jwVideoId,
                                            "title": that.uploadVidMetadata.title,
                                            "class": that.uploadVidMetadata.class,
                                            "genre": that.uploadVidMetadata.genre,
                                            "presentedAt": that.uploadVidMetadata.presentedAt,
                                            "link": link,
                                            "duration": parseInt(duration),
                                            "thumb": 'http://www.ulivesmart.com/wp-content/uploads/2017/05/feature-video-thumbnail-overlay.png',
                                            "annotations": []
                                        })

                                        // Close loading bar
                                        loadingInstance.close()

                                        clearInterval(intervalID)

                                        // Clearing modal form
                                        that.uploadVidMetadata = { title: '', class: '', genre: '', presentedAt: ''}
                                    }
                                }
                            })
                            .catch( (error) => console.log("Couldn't get conversions \n ", error))
                    }, 5000)

                
                    let uploadedId, 
                        uploadedTitle = that.uploadVidMetadata.title;

                    // Closing the progress modal
                    this.modalProgressIsOpen = false

                })

                this.dropzoneInstance.on("error", (files, response) => {
                    that.modalProgressIsOpen = false
                    swal(that.uploadVidMetadata.title, 'The uploading was stopped...', 'info')
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
                this.dropzoneInstance.removeAllFiles(true)
            },
            closeModalMaintenance() {
                this.modalMaintenanceIsOpen = false
            },
            loadUrlPOC() {
                let that = this
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

                axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
                    .then( response => {
                        let theData = response.data.data
                        let theUrl = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                        that.$store.commit('SET_UPLOAD_URL', theUrl)
                        console.log("Upload url created. The url is ", theUrl)

                        // document.getElementsByClassName('form.uploadvid__form').action = theUrl;
                        $("form.uploadvid__area").attr("action", theUrl); 
                        console.log('Form action assigned!')

                        $("form.uploadvid__area input:file").change(function() {
                            that.modalMetadataIsOpen = true
                        })
                    })
                    .catch( error => { 
                        console.log("Couldn't post jwvideo \n", error)
                    })
            },
        },
        computed: {
            ...mapGetters([
				'videos', 'uploadUrl', 'classes'
            ]),
        }
    }


// axios.get("https://metalogon-api.herokuapp.com/rest/video")
//     .then(function (response)
//     {
//         let vids = response.data.data
//         for (let i=0, l=vids.length; i<l; i++) {
//             if (uploadedTitle === vids[i].title) {
//                 uploadedId = vids[i].id
//                 console.log('uploadedId: ', uploadedId)
//                 that.$router.push({ path: '/video/' + uploadedId })
//             }
//         }
//     })


</script>

<style>

/* .el-dialog__wrapper, .uploadvid { z-index: 2000 !important; } */

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

    .home__upload-video {
		display: flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
		height:280px;
		color: #A90931;
		background-color: #FFF;
		width: calc(100% /3 - 20px);
		margin: 10px;
		border: 1px dashed #DADDE2;
	}
	.home__upload-video:hover {
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
                font-size: 1.4em;
            }


/* ==============================================
					#TRUMPS
    ================================================= */

</style>
