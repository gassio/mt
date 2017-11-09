<template>
    <div class="videocard">
        <vueDropzone id="dropzone" :options="dropzoneOptions" @vdropzone-mounted="dropzoneMounted" @vdropzone-drop="dropzoneDrop($event)" @vdropzone-sending="dropzoneSending" @vdropzone-processing="dropzoneProcessing">
        </vueDropzone>
        
		<el-dialog title="Upload video" :visible.sync="dialogVisible">
			<el-form :model="newVideo">
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
			</span>
		</el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    import vue2Dropzone from 'vue2-dropzone'
	import 'vue2-dropzone/dist/vue2Dropzone.css'

    export default {
        data() {
            return {
                uploadVideoProps: {
                    protocol: '',
                    address: '',
                    path: '',
                    key: '',
                    token: ''
                },
                dropzoneOptions: {
                    url: this.keyTokenUrl,
					thumbnailWidth: 150,
					headers: { "My-Awesome-Header": "header value" }
				},
                dialogVisible: false,
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
        props: {
            keyTokenUrl: {
                type: String
            }
        },
        created() {
            console.log('created.')
        },
        mounted() {
            console.log("mounted.")
            console.log('entos toy component  ', this.keyTokenUrl)
        },
        updated() {
            console.log("updated.")
        },
        methods: {
            dropzoneMounted() {
                console.log('dropzone mounted.')
                // console.log('upload url = ', this.uploadUrl)
            },
			dropzoneDrop(event) {
                console.log('drop...')

                // this.$store.dispatch('createJwVideo')
                // this.$store.dispatch('uploadVideoToLink')

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
        computed: {
            ...mapGetters([
				'videos' 
            ]),
        },
        components: {
			vueDropzone : vue2Dropzone,
		}
    }

// axios.post("https://metalogon-api.herokuapp.com/rest/jwvideo")
//     .then( function (response) 
//     {
//         let theData = response.data.data

//         that.uploadVideoProps.protocol = theData.link.protocol
//         that.uploadVideoProps.address = theData.link.address
//         that.uploadVideoProps.path = theData.link.path
//         that.uploadVideoProps.key = theData.link.query.key
//         that.uploadVideoProps.token = theData.link.query.token

//         that.uploadUrl = that.uploadVideoProps.protocol + '://' + that.uploadVideoProps.address + that.uploadVideoProps.path + '?api_format=xml&key=' + that.uploadVideoProps.key + '&token=' + that.uploadVideoProps.token
//         that.dropzoneOptions.url = that.uploadUrl
//     })
//     .catch( function (error) 
//     { 
//         console.log(error.response) 
//     })

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
