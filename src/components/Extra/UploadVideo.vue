<template>
    <div class="home__upload-video">
        <div class="upload-video__container" @click="createJwVideo()">
            <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
            <span class="upload-video__text">Click to upload video</span>
        </div>
        
		<el-dialog class="uploadvid" title="Upload video" :visible.sync="visible" :before-close="closeUploadDragndrop">
            <div class="uploadvid__area">
                <span class="uploadvid__text">Drop videos here or click to upload</span>
            </div>
		</el-dialog>

        <el-dialog class="uploadvid__metadata" title="Video details" :visible.sync="visible2" :close-on-click-modal="false">
            <el-form ref="form" :model="uploadVidMetadata" label-width="120px">
                <el-form-item label="Title">
                    <el-input v-model="uploadVidMetadata.title"></el-input>
                </el-form-item>
                <el-form-item label="Class">
                    <el-input v-model="uploadVidMetadata.class"></el-input>
                </el-form-item>
                <el-form-item label="Genre">
                    <el-select v-model="uploadVidMetadata.genre" placeholder="Select the video genre">
                    <el-option label="Elevator pitch" value="Elevator pitch"></el-option>
                    <el-option label="Lab presentation" value="Lab presentation"></el-option>
                    <el-option label="Thesis talk" value="Thesis talk"></el-option>
                    <el-option label="Progress report" value="Progress report"></el-option>
                    <el-option label="Conference talk" value="Conference talk"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Presentation date">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="Pick a date" v-model="uploadVidMetadata.presentationDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="startUpload()">Start upload</el-button>
                    <el-button @click="visible2 = false">Cancel</el-button>
                </el-form-item>
            </el-form>
		</el-dialog>

		<el-dialog class="uploadvid__progress" title="Upload in progress" :visible.sync="visible3" :before-close="closeUploadProgress" :close-on-click-modal="false">
            <el-progress :percentage="parseInt(uploadProgress)" :stroke-width="14"></el-progress> 
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
                visible: false, // Upload screen modal
                visible2: false, // Upload video metadata modal
                visible3: false, // Upload video progress modal
                dropzoneInstance: null,
                uploadProgress: 0,
                dialogVisible: true,
                formLabelWidth: '120px',
                uploadVidMetadata: {
					title: '',
					class: '',
                    genre: '',
                    presentationDate: ''
				},
            }
        },
        methods: {
            createJwVideo() {
                let that = this
                this.visible = true

                axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
                    .then( response => {
                        let theData = response.data.data

                        var theUrl = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                        that.$store.commit('SET_UPLOAD_URL', theUrl)
                        console.log("Upload url created. The url is ", theUrl)

                        that.createVideo(theData)
                    })
                    .catch( error => console.log(error.response))
            },
            createVideo(theData) {
                var that = this 

                // Creating dropzone
                this.dropzoneInstance = new Dropzone('.uploadvid__text', { 
                    url: this.uploadUrl,
                    createImageThumbnails: false,
                    autoProcessQueue: false
                })

                // User enters video details (title, class, genre, presentedAt)
                this.dropzoneInstance.on("addedfile", (file) => {
                    this.visible = false
                    this.visible2 = true
                })

                // SUCCESS 
                this.dropzoneInstance.on("success", () => {
                    console.log('Jwvideo object created. The key is: ', theData.link.query.key)

                    // GA
                    // A message label is needed.
                    // Something like this: "Synchronizing video..."

                    // Shows loading spinner
                    let loadingInstance = Loading.service({ fullscreen: true }); 
                    // Close modal
                    that.visible3 = false

                    // GET link & duration
                    let link, duration
                    let thumb

                    let intervalID = setInterval(function () {
                        axios.get("https://metalogon-api.herokuapp.com/rest/jwconversion/?videoId=" + theData.link.query.key)
                            .then( response => {
                                console.log(' getting conversions...')
                                let conversions = response.data.data.conversions

                                for (var i = 0, l = conversions.length; i < l; i++) {
                                    if (conversions[i].status === 'Ready' && conversions[i].template.name === '720p') {
                                        link = conversions[i].link.protocol + '://' + conversions[i].link.address + conversions[i].link.path
                                        duration = conversions[i].duration
                                        console.log('|> Link: ', link)
                                        console.log('|> Duration: ', duration)

                                        // pass object 
                                        // POST video uploadVidMetadata {} to the request
                                            that.$store.dispatch('createVideo', {
                                            "title": that.uploadVidMetadata.title,
                                            "link": link,
                                            "thumb": "http://web.mit.edu/zhaox/www/image/2014_07_14_MIT_logo_2.jpg",
                                            "duration": parseInt(duration),
                                            "class": that.uploadVidMetadata.class,
                                            "jwVideoId": theData.link.query.key,
                                            "genre": that.uploadVidMetadata.genre,
                                            "presentedAt": that.uploadVidMetadata.presentedAt,
                                            "annotations": []
                                        })

                                        // Clearing modal form
                                        this.uploadVidMetadata = { title: '', class: '', genre: '', presentationDate: ''}
                                        // Clear interval
                                        clearInterval(intervalID)
                                        // Close loading bar
                                        loadingInstance.close()
                                    }
                                }
                            })
                    }, 5000)
                    
                    // GA
                    // GET thumb
                    // let intervalID2 = setInterval(function () {
                    //     axios.get("https://cdn.jwplayer.com/v2/media/" + theData.link.query.key)
                    //         .then( response => {
                    //             console.log('----- GET thumb ----')
                    //             thumb = response.data.playlist.image
                    //             console.log('|> Thumb: ', thumb)
                    //             clearInterval(intervalID2)
                    //         })
                    // }, 5000)

                    // {videoObj}
                    // JW: link, duration, thumb, jwVideoId, 
                    // USER: title, class, genre, presentedAt
                })

                this.dropzoneInstance.on("error", (errorMessage) => {
                    console.log(errorMessage)
                })

                this.dropzoneInstance.on("totaluploadprogress", (progress) => {
                    this.uploadProgress = progress
                })

                this.dropzoneInstance.on("dragover", event => {
                    $('.uploadvid__area').css('background-color', '#8F082A')
                    // $('.uploadvid__area').css('border', '3px dashed orange')
                })

                this.dropzoneInstance.on("dragleave", event => {
                    $('.uploadvid__area').css('background-color', '#FFF')
                })

                this.dropzoneInstance.on("drop", event => {
                    $('.uploadvid__area').css('background-color', '#8F082A')
                })   
            },
            startUpload() {
                this.visible3 = true
                this.visible2 = false
                this.dropzoneInstance.processQueue()
            },
            closeUploadDragndrop() {
                this.visible = false
            },
            closeUploadMetadata() {
                this.visible2 = false
            },
            closeUploadProgress() {
                this.visible3 = false
                this.dropzoneInstance.removeAllFiles(true)
            }
        },
        computed: {
            ...mapGetters([
				'videos', 'uploadUrl'
            ]),
        }
    }



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
        border: 3px solid #ccc;
        display: flex;
        justify-content: center;
	}
	.uploadvid__area:hover {
        transition: 0.40s;
        color: #FFF;
        border: none;
        background-color: #8F082A !important;
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
</style>
