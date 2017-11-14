<template>
    <div class="videocard">

        <!--<vue-dropzone id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="dropzoneFileAdded" @vdropzone-sending="dropzoneSending">
        </vue-dropzone>

        <form :action="myCallback()" class="dropzone">
        </form>
       
        <div class="upvid">
        </div>-->
        
        <button @click="createJwVideo()">Load key & token</button> 
        
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

                        that.dropzoneInstance.on("addedfile", (file) => {
                            console.log(file)
                        })

                        that.dropzoneInstance.on("totaluploadprogress", (progress) => {
                            this.uploadProgress = progress
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

</style>
