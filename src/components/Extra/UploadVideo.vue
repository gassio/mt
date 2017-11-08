<template>
        <vueDropzone id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="dropzoneFileAdded" @vdropzone-sending="dropzoneSending">
        </vueDropzone>
</template>

<script>
    import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    import vue2Dropzone from 'vue2-dropzone'
	import 'vue2-dropzone/dist/vue2Dropzone.css'

    export default {
        data() {
            return {
                dropzoneOptions: {
					url: "http://test.com",
					thumbnailWidth: 150,
					headers: { "My-Awesome-Header": "header value" }
				}
            }
        },
        mounted() {

        },
        methods: {
            createJwVideo() {
				this.$store.dispatch('createJwVideo')
				// this.uploadUrl = this.uploadVideoProps.protocol + '://' + this.uploadVideoProps.address + this.uploadVideoProps.path + '?api_format=xml&key=' + this.uploadVideoProps.key + '&token=' + this.uploadVideoProps.token
				// that.openModal()
			},
			uploadVideoToLink() {
				this.$store.dispatch('uploadVideoToLink')
			},
            ale() {
				alert('Uploading...')
			},
			onSubmit() {
				let that = this
				axios.post(that.uploadUrl)
                    .then( response => alert('Success upload') )
                    .catch( error => console.log(error.response) )
			},
			// DROPZONE UPLOAD
			dropzoneFileAdded() {
				this.$store.dispatch('createJwVideo')
			},
			dropzoneSending(file, xhr, formData) {
				let that = this
				$.ajax({
                    type: 'POST',
                    url: that.uploadUrl,
                    contentType: 'multipart/form-data'                    
                })
                .done(data => console.log(data))
                .fail(error => console.log(error))
					
				// console.log('up url = ', this.uploadUrl)
				// this.dropzoneOptions.url = this.uploadUrl
			}
        },
        computed: {
            ...mapGetters([
				'videos', 'uploadVideoProps', 'uploadUrl'
            ]),
        },
        components: {
			vueDropzone : vue2Dropzone,
		}
    }
</script>

<style>
	/* ==============================================
					#VUE-DROPZONE
		================================================= */
		
	.vue-dropzone {
		width: calc(100%/3 - 20px);
		height: auto;
	}

</style>