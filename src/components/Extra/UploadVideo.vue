<template>
    <div class="home__upload-video">
        <div class="upload-video__container" @click="createJwVideo()">
            <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
            <span class="upload-video__text">Click to upload video</span>
        </div>
        
		<el-dialog class="uploadvid" title="Upload video" :visible.sync="visible" :before-close="closeDialog" >
            <div class="uploadvid__area">
                <span class="uploadvid__text">Drop videos here or click to upload</span>
            </div>
		</el-dialog>

        <el-dialog class="uploadvid__metadata" title="Video details" :visible.sync="visible2" :before-close="closeDialog2">
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
                    <el-button type="primary">Start upload</el-button>
                    <el-button @click="visible2 = false">Cancel</el-button>
                </el-form-item>
            </el-form>
		</el-dialog>

		<el-dialog class="uploadvid__progress" title="Upload in progress" :visible.sync="visible3">
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

    export default {
        data() {
            return {
                myDropzone: null,
                uploadVideoProps: {
                    protocol: '',
                    address: '',
                    path: '',
                    key: '',
                    token: ''
                },
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
            // Upload screen modal
            closeDialog() {
                this.visible = false
            },
            // Upload video metadata modal
            closeDialog2() {
                this.visible2 = false
            },
            createJwVideo() {
                let that = this
                this.visible = true

                axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
                    .then( response => {
                        let theData = response.data.data
                        var theUrl = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                        that.$store.commit('SET_UPLOAD_URL', theUrl)
                        console.log('after commit url ', that.uploadUrl)

                        // Creating dropzone
                        that.dropzoneInstance = new Dropzone('.uploadvid__text', { 
                            url: that.uploadUrl,
                            createImageThumbnails: false
                            // previewContainer: '.uploadvid__progress'
                        })

                        // User enters video details (title, class, genre, presentedAt)
                        that.dropzoneInstance.on("addedfile", (file) => {
                            this.visible = false
                            this.visible2 = true
                            this.visible3 = true
                        })

                        // SUCCESS 
                        that.dropzoneInstance.on("success", () => {
                            console.log('SUCCESS')
                            console.log('jwVideoId = ', theData.link.query.key)

                            // GET link & duration
                            let link, duration
                            let thumb

                            let intervalID = setInterval(function () {
                                axios.get("https://metalogon-api.herokuapp.com/rest/jwconversion/?videoId=" + theData.link.query.key)
                                    .then( response => {
                                        console.log('----- GET link, duration ----')
                                        let conversions = response.data.data.conversions

                                        for (var i = 0, l = conversions.length; i < l; i++) {
                                            if (conversions[i].status === 'Ready' && conversions[i].template.name === '720p') {
                                                link = conversions[i].link.protocol + '://' + conversions[i].link.address + conversions[i].link.path
                                                duration = conversions[i].duration
                                                console.log('|> Link: ', link)
                                                console.log('|> Duration: ', duration)
                                                // Clear interval
                                                clearInterval(intervalID)

                                                // POST video
                                                that.$store.dispatch('createVideo', {
                                                    link: link, duration: duration, key: theData.link.query.key
                                                })
                                            }
                                        }
                                    })
                            }, 5000)
                            
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

                        that.dropzoneInstance.on("error", (errorMessage) => {
                            console.log(errorMessage)
                        })

                        that.dropzoneInstance.on("totaluploadprogress", (progress) => {
                            this.uploadProgress = progress
                        })

                        that.dropzoneInstance.on("dragover", event => {
                            $('.uploadvid__area').css('background-color', '#8F082A')
                            // $('.uploadvid__area').css('border', '3px dashed orange')
                        })

                        that.dropzoneInstance.on("dragleave", event => {
                            $('.uploadvid__area').css('background-color', '#FFF')
                        })

                        that.dropzoneInstance.on("drop", event => {
                            $('.uploadvid__area').css('background-color', '#8F082A')
                        })
                    })
                    .catch( error => { console.log(error.response) })
            },
        },
        computed: {
            ...mapGetters([
				'videos', 'uploadUrl', 'uploadingVideo'
            ]),
        }
        // components: {
        //     'vue-dropzone': vue2Dropzone
        // }
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
