<template>
    <div class= "home container">

		<div class= "home-tabs">
			<div class= "columns is-mobile is-gapless is-marginless">
				<div class= "column is-8">
					<!--<div class= "home-tabs-semester">
						<button id="all" class="home-tabs-semester-button" style="width: 60px" type="button">All</button>
						<button id="spring17" class="home-tabs-semester-button" type="button">Spring '17</button>
						<button id="winter16" class="home-tabs-semester-button" type="button">Winter '16</button>
					</div>-->
				</div>
				<div class= "column is-4">
					<div class= "home-genre-selection">
						<p>Genre: &nbsp </p>
						<el-select v-model="currentGenre" filterable placeholder="Select" style="width: 210px;">
							<el-option v-for="genre in genres" :key="genre.name" :label="genre.name" :value="genre.name">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
		</div>

		<div class="home-content">

			<div class="videocard" v-for="v in videos" v-show="v.genre === currentGenre">
				<router-link :to="'/video/' + v.id" class="videocard-thumbnail" tag="a">
					<img :src="v.thumb" alt="video-thumbnail" class="videocard-thumbnail-image">
					<!--<div class="el-badge item"><span class="el-badge__content">{{ v.annotations.length }}</span></div>-->
				</router-link>
				<div class="videocard-content">
					<div class="videocard-details">
						<p class="videocard-description">{{ v.title }}</p>
						<p class="videocard-semester">{{ v.class }}</p>
						<p class="videocard-date">{{ v.presentedAt | sliceDate }}</p>
					</div>
					<div class="videocard-foot">
						<span class="videocard-genre"><i class="fa fa-commenting-o" aria-hidden="true"></i> {{ v.genre }}</span>

					</div>				
				</div>
				
			</div>

			<!--<form class="videocard-add-new" method="POST" :action="uploadUrl" enctype="multipart/form-data" @submit="onSubmit()">
				<input @click="createJwVideo()" type="file" name="file" />
				<button type="submit">Upload</button>
			</form>-->

			<!--
			<div>
				<input @click="createJwVideo()" type="file" name="file" />
			</div>
			<div>
				<button @click="uploadVideoToLink()" type="submit">Upload</button>
			</div>-->



					<!--<i class="fa fa-plus fa-3x" aria-hidden="true"></i>
					<input type="file" accept="video/*" name="file" id="file" class="inputfile">
					<label for="file" class="up-label">Upload video</label>-->
			

			

			<upload-video></upload-video>

		</div>

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
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	import UploadVideo from '../Extra/UploadVideo.vue'

    export default {
		data() {
			return {
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
				genres: [
					{ name: 'Elevator pitch' },
					{ name: 'Lab presentation' },
					{ name: 'Thesis talk' },
					{ name: 'Progress report' },
					{ name: 'Conference talk' }
				],
				currentGenre: 'Lab presentation',
			}
		},
		created() {
			this.$store.dispatch('getAllVideos')
		},
		mounted() {
		},
		methods: {
			
			openModal() {
				this.dialogVisible = true
			},
			open4() {
				this.$notify({
					title: 'Warning',
					message: 'This is a warning message',
					type: 'warning'
				});
			}
		},
		computed: {
            ...mapGetters([
				'videos', 'uploadVideoProps', 'uploadUrl'
            ]),
        },
		components: {
			'upload-video': UploadVideo
		}
    }
</script>

<style>
    .v-videos {
        display: flex;
    }
        .v-video {
            display: flex;
            flex-direction: column;
            padding-right: 54px;
        }

        .video-thumb {
            width: 100%;
        }

        .tabs {
            margin: 0;
            padding: 0;
            margin-top: 30px;
        }
            .tabs ul {
                padding: 0;
                margin: 0
            }

                li.is-active a {
                    color: #6B6B6B !important;
                }


/**************************************************************************/
/*---------------------------home.html----------------------------------*/
/**************************************************************************/

/*-------------- CARD ---------------- */
.home-tabs {
	min-width: 770px;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid #E8E9EA;
}
	.home-tabs-semester {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-width: 770px;
		width: 100%;
		height: 60px;
	}
		.home-tabs-semester-button {
			background: none;
			border: none;
			padding-left: 10px;
			padding-right: 10px;
		}

	.home-genre-selection {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		justify-content: flex-end;
		line-height: 60px;
	}

.home-content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	min-width: 770px;
	width: 100%;
	height: 100%;
}



	.videocard {
		height:auto;
		width: calc(100% /3 - 20px);
		margin: 10px;
		border-radius: 3px;
		border: 1px solid rgba(170, 178, 200, 0.25);
	}	
		.videocard-video-thumbnail{
			width: 100%;
		}

		.videocard-content {
			padding: 25px 25px 5px 25px;
		}

			.videocard-details {
			}
				.videocard-description {
					font-size: 1em;
					padding: 0;
					margin: 0;
				}
			
				.videocard-semester,
				.videocard-date {
					font-size: 0.8em;
					padding: 0;
					margin: 0;
				}

			.videocard-foot {
				border-top: 1px solid rgba(170, 178, 200, 0.25);
				margin-top: 30px;
				padding-top: 10px;
				font-size: 0.8em;
				display: flex;
			}
				.videocard-genre {
					width: 50%;
				}
				.videocard-effectiveness {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

					.videocard-effectiveness-bar {
					  background-color: red !important;
					}

					.videocard-effectiveness-label {
					}

					
		
	.videocard-add-new {
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
	.videocard-add-new:hover {
		color: #FFF;
		cursor: pointer;
		transition: 0.2s;
		-webkit-transition: 0.2s;
		background-color: #A90931;
	}

			.videocard-add-new p {
				font-size: 30px;
			}
			.videocard-add-new i {
				pointer-events: none;
				position: relative;
    			top: 100px;
			}



			

/* ==============================================
                #ANNOTATION-BADGE
	================================================= */

    .el-badge {
        position: relative;
        vertical-align: middle;
        display: inline-block;
		top: -120px;
    }

    .el-badge__content {
        background-color: #A90931;
        border-radius: 10px;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        border: 1px solid #fff;
    }

	



	/* ==============================================
                #TRUMPS
	================================================= */
	
	.dialog-footer .el-button.upload-video-btn {
		background: #A90931;
		color: #fff;
		border: none;
	}

	.inputfile {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}
	.inputfile + label {
		font-size: 1.25em;
		font-weight: 700;
		color: white;
		background-color: black;
		display: inline-block;
	}

	.inputfile:focus + label,
	.inputfile + label:hover {
		background-color: red;
	}
	.inputfile + label {
		cursor: pointer; /* "hand" cursor */
	}
	.inputfile:focus + label {
		outline: 1px dotted #000;
		outline: -webkit-focus-ring-color auto 5px;
	}

	.up-label {
		padding: 100px 135px 100px 135px;
    	font-size: 1.7em;
	}

</style>
