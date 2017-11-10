<template>
    <div class="videocard">



-        <!--<vue-dropzone id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="dropzoneFileAdded" @vdropzone-sending="dropzoneSending">
        </vue-dropzone>

        <form :action="myCallback()" class="dropzone">
        </form>
       
        <div class="upvid">
        </div>
        
        <button v-on:click="loadKeyToken()">Load key & token</button>-->
        
		<el-dialog title="Upload video" :visible.sync="uploadingVideo" :before-close="closeDialog">
			<!--<el-form :model="newVideo">
				<el-form-item label="Video title" :label-width="formLabelWidth">
					<el-input v-model="newVideo.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Semester" :label-width="formLabelWidth">
					<el-select v-model="newVideo.semester" placeholder="Please select a semester">
						<el-option label="Winter '17" value="Winter '17"></el-option>
						<el-option label="Spring'17" value="Spring '17"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Genre" :label-width="formLabelWidth">
					<el-select v-model="newVideo.genre" placeholder="Please select a genre">
						<el-option label="Thesis proposal" value="Thesis proposal"></el-option>
						<el-option label="Progress work" value="Progress work"></el-option>
						<el-option label="Conference talk" value="Conference talk"></el-option>
						<el-option label="Elevator pitch" value="Elevator pitch"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button class="upload-video-btn" @click="uploadVid(); dialogVisible = false;">Upload video</el-button>
			</span>-->
		</el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    import dropzone from 'dropzone'
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
                // dropzoneOptions: {
                //     url: axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
                //             .then( response => {
                //                 let theUrl
                //                 let theData = response.data.data
                //                 theUrl = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                //                 return axios.post(theUrl)
                //                     .then( response => {
                //                         console.log('ICXN ', theUrl)
                //                         return theUrl
                //                     })
                //             }),
				// 	thumbnailWidth: 150,
				// 	headers: { "My-Awesome-Header": "header value" }
				// },
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

            // $("div.upvid").dropzone({ 
            //     url: '/', 
            //     thumbnailWidth: 80,
            //     thumbnailHeight: 80
            // });

            // this.loadKeyToken()
            // .then( theUrl => {
            // })

                // this.$store.dispatch('createUploadUrl')

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

            // axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
            //     .then( function (response) {
            //         let theData = response.data.data
            //         let theLink = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
            //         console.log(theLink)
            //         return theLink
            //     }),

        },
        methods: {
            closeDialog() {
                this.$store.commit('SET_UPLOADING_VIDEO_AS_FALSE')
            },
            createJwVideo() {
                let that = this
                axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
                    .then( response => {
                        console.log('createjwvideo call...')
                        let theData = response.data.data
                        that.uploadUrl = theData.link.protocol + '://' + theData.link.address + theData.link.path + '?api_format=xml&key=' + theData.link.query.key + '&token=' + theData.link.query.token
                    })
                    .catch( error => { 
                        console.log(error.response) 
                    })
            },
            createUploadUrl(theLink) {
                axios.post(theLink)
                    .then( response => {
                        console.log('createuploadurl call...')
                    })
                console.log()
            },
            dropzoneMounted() {
                console.log('dropzone mounted.')
                // console.log('upload url = ', this.uploadUrl)
            },
			dropzoneDrop(event) {
                console.log('drop...')

                // this.$store.dispatch('createJwVideo')
                // this.$store.dispatch('uploadVideoToLink')

			},
            dropzoneFileAdded: async function () {
                
                // var denxero = await this.createJwVideo()
                // var denxero2 = await this.createUploadUrl(this.uploadUrl)

                // this.loadKeyToken()
                // .then( theLink => {
                //     that.dropzoneOptions.url = await theLink
                //     console.log(this.dropzoneOptions.url)
                // })


            },
            dropzoneProcessing(file) {
                console.log('processing.')

                // this.dropzoneOptions.url = this.uploadUrl
				// this.dialogVisible = true
            },
			dropzoneSending(file, xhr, formData) {
                console.log('sending.')
                // this.dropzoneOptions.url = this.uploadUrl

                // formData.append('title', 'hello!');
                // xhr.open('POST', this.uploadUrl);
                // xhr.send(formData);

				// let that = this
				// $.ajax({
                //     type: 'POST',
                //     url: that.uploadUrl,
                //     contentType: 'multipart/form-data'                    
                // })
                // .done(data => console.log(data))
                // .fail(error => console.log(error))
					
				// // console.log('up url = ', this.uploadUrl)
				// // this.dropzoneOptions.url = this.uploadUrl
			},
        },
        updated() {
            
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
.upload {
    margin: 0;
    padding: 0;
}
		
	.vue-dropzone {
		
	}

</style>
