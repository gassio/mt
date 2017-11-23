<template>
    <div class="home__upload-video">
        <div class="upload-video__container" @click="createJwVideo()">
            <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
            <span class="upload-video__text">Click to upload video</span>
        </div>
        
		<el-dialog class="uploadvid" title="Upload video" :visible.sync="visible" :before-close="closeDialog">
            <div class="uploadvid__area">
                <span class="uploadvid__text">Drop videos here or click to upload</span>
            </div>
            <div class="uploadvid__progress">
                <span>Upload progress {{ uploadProgress }} %</span>
            </div>
		</el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    import Dropzone from 'dropzone'
	import 'dropzone/dist/dropzone.css'

    // import vue2Dropzone from 'vue2-dropzone'
    // import 'vue2-dropzone/dist/vue2Dropzone.css'

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
                visible: false,
                dropzoneInstance: null,
                uploadProgress: 0,
                dialogVisible: true,
                formLabelWidth: '120px',
                newVideo: {
					title: '',
					videoID: 100,
					link: '',
					thumb: '',
					sources: [],
					duration: '',
					jwVideoID: '',
					jwPlaylistID: '',
					class: '',
					genre: '',
					categories:  {},
					annotations: [],
					loading: true
				},
            }
        },
        created() {
			console.log('CHILD created()')
        },
        mounted() {
			console.log('CHILD mounted()')

            // var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
            //     url: "/target-url", // Set the url
            //     thumbnailWidth: 80,
            //     thumbnailHeight: 80,
            //     parallelUploads: 20,
            //     previewTemplate: previewTemplate,
            //     autoQueue: false, // Make sure the files aren't queued until manually added
            //     previewsContainer: "#previews", // Define the container to display the previews
            //     clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
            // });

        },
        methods: {
            closeDialog() {
                // this.$store.commit('SET_UPLOADING_VIDEO_AS_FALSE')
                this.visible = false
            },
            createJwVideo() {
                let that = this
                this.visible = true

                axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
                    .then( response => {
                        let theData = response.data.data
                        var theUrl = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                        // var theUrl = theData.link.protocol + '://' + theData.link.address + '/progress?token=' + theData.link.query.token + "&callback=callback"
                        that.$store.commit('SET_UPLOAD_URL', theUrl)
                        console.log('after commit url ', that.uploadUrl)

                        // Creating dropzone
                        that.dropzoneInstance = new Dropzone('.uploadvid__area', { 
                            url: that.uploadUrl,
                            createImageThumbnails: false
                            // previewContainer: '.uploadvid__progress'
                        })


                        that.dropzoneInstance.on("totaluploadprogress", (progress) => {
                            this.uploadProgress = progress
                        })

                        that.dropzoneInstance.on("success", () => {
                            console.log('SUCCESS')
                            console.log('jwVideoId = ', theData.link.query.key)

                            let link, thumb, duration, sources

                            let intervalID = setInterval(function () {
                                axios.get("https://metalogon-api.herokuapp.com/rest/jwconversion/?videoId=" + theData.link.query.key)
                                    .then( response => {
                                        console.log('jwconversion get...')
                                        let conversions = response.data.data.conversions
                                        for (var i = 0, l = conversions.length; i < l; i++) {
                                            console.log('Total conversions = ', l)
                                            console.log(conversions[i].status)
                                        }
                                        for (var i = 0, l = conversions.length; i < l; i++) {
                                            if (conversions[i].status === 'ready' && conversions[i].template.name === '720p') {
                                                
                                                link = conversions[i].link.protocol + '://' + conversions[i].link.address + conversions[i].link.path
                                                // thumb = response.data.playlist.image
                                                // duration = response.data.playlist.duration
                                                clearInterval(intervalID)
                                            }
                                        }
                                    })
                            }, 5000)

                            console.log('thumb: ', thumb)

                            // {videoObj}
                            // from jw: link, thumb, duration, jwVideoId, sources
                            // from user: title, class, genre, presentedAt

                            // POST ('metalogon.com/video', {videoObj}) 
                        })

                        that.dropzoneInstance.on("dragover", event => {
                            $('.uploadvid__area').css('background-color', 'red')
                        })

                        that.dropzoneInstance.on("dragleave", event => {
                            $('.uploadvid__area').css('background-color', 'white')
                        })

                        that.dropzoneInstance.on("drop", event => {
                            $('.uploadvid__area').css('background-color', 'white')
                        })
                    })
                    .catch( error => { console.log(error.response) })
            },
        },
        computed: {
            ...mapGetters([
				'videos', 'uploadUrl', 'uploadingVideo'
            ]),
        },
        // components: {
        //     'vue-dropzone': vue2Dropzone
        // }
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
}	
	.uploadvid__area {
        height: 150px;
        border: 3px dashed #ccc;
        display: flex;
        justify-content: center;
	}
        .uploadvid__text {
            font-size: 1.4em;
            display: flex;
            align-self: center;
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
