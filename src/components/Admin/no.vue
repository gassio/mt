<template>
    <div class="admin container">
		<div class="columns">
			<div class="admin__main column is-10">
				<div class="admin__head">
					<div class= "columns is-mobile is-gapless is-marginless">
						<!--<div class= "column is-8">
							<div class= "admin__head-semester">
								<button id="all" class="admin__head-semester-button" style="width: 60px" type="button">All</button>
								<button id="spring17" class="admin__head-semester-button" type="button">Spring '17</button>
								<button id="winter16" class="admin__head-semester-button" type="button">Winter '16</button>
							</div>
						</div>-->
						<div class= "column is-4">
							<div class= "admin-genre-selection">
								<p>Genre: &nbsp </p>
								<el-select v-model="currentGenre" filterable placeholder="Select" style="width: 210px;">
									<el-option v-for="genre in genres" :key="genre.name" :label="genre.name" :value="genre.name">
									</el-option>
								</el-select>
							</div>
						</div>
					</div>
				</div>

				<div class="admin__featured">

					<div class="ftdcard" v-for="v in videos" v-show="v.genre === currentGenre" v-bind:key="v.id">
						<router-link class="ftdcard-thumbnail" :to="'/video/' + v.id" tag="a">
							<img :src="v.thumb" alt="video-thumbnail" class="ftdcard-thumbnail-image">
						</router-link>
						<div class="ftdcard-content">
							<div class="ftdcard-details">
								<p class="ftdcard-description">{{ v.title }}</p>
								<p class="ftdcard-semester">{{ v.class }}</p>
								<p class="ftdcard-date">{{ v.presentedAt | sliceDate }}</p>
							</div>
							<div class="ftdcard-foot">
								<span class="ftdcard-genre">
									<i class="fa fa-commenting-o" aria-hidden="true"></i> 
									{{ v.genre }}
								</span>
							</div>				
						</div>
					</div>
					
					<!-- <upload-video></upload-video> -->

				</div>

				<div class="admin__class">
					<div class="classcards fx-dir-col">
						<div class="classcard fx-dir-row" v-for="v in videos" v-bind:key="v.id">
							<router-link :to="'/video/' + v.id"  tag="a" class="class-card columns is-gapless">
								<div class="class-card-image column is-2 is-gapless is-marginless">
									<img :src="v.thumb" alt="video-thumbnail" class="class-card-image-thumbnail">
								</div>
								<div class="class-card-description column is-7 is-gapless is-marginless has-text-left">
									<p class= "class-card-description-title">{{ v.title }}</p>
									<p class= "class-card-description-details">Duration: | Class: {{ v.class }}</p>
								</div>
								<div class="class-card-genre column is-3 is-gapless is-marginless">
									<strong class="class-card-genre-color">{{ v.genre }}</strong> &nbsp&nbsp<i class="fa fa-book fa-2x" aria-hidden="true"></i>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>

			<!-- <div class="admin__sidebar column is-2">
				<div class="container">
					<ul class="sidebar-menu">
						<li><a class="sidebar-menu__link">Home</a></li>
						<li><a class="sidebar-menu__link">Class 1</a></li>
						<li><a class="sidebar-menu__link">Class 2</a></li>
						<li><a class="sidebar-menu__link">Class 3</a></li>
					</ul>
				</div>
			</div> -->

			<aside class="menu admin__sidebar column is-2">
				<ul class="menu-list">
					<li><a>Metalogon Home</a></li>
					<li><a>Materials Science and Engineering</a></li>
					<li><a>Aeronastro Class</a></li>
					<li><a>Mathematics Class</a></li>
				</ul>
			</aside>
		</div>
	</div>

</template>



<script>
	import axios from 'axios'
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	import UploadVideo from '../Extra/UploadVideo.vue'

    export default {
		data() {
			return {
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
		},
		computed: {
            ...mapGetters([
				'videos', 'uploadUrl'
            ]),
        },
		components: {
			'upload-video': UploadVideo
		}
    }
</script>

<style>

.admin__head {
	min-width: 770px;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid #E8E9EA;
}
	.admin__head-semester {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-width: 770px;
		width: 100%;
		height: 60px;
	}
		.admin__head-semester-button {
			background: none;
			border: none;
			padding-left: 10px;
			padding-right: 10px;
		}

	.admin-genre-selection {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		justify-content: flex-end;
		line-height: 60px;
	}



.admin__featured {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	min-width: 770px;
	width: 100%;
	height: 50%;
}

	.ftdcard {
		height:auto;
		width: 350px; /* calc(100% /3 - 20px) */
		margin: 10px;
		border-radius: 3px;
		border: 1px solid rgba(170, 178, 200, 0.25);
	}	
		.ftdcard-video-thumbnail{
			width: 100%;
		}

		.ftdcard-content {
			padding: 15px 15px 5px 15px;
		}

			.ftdcard-details {
			}
				.ftdcard-description {
					font-size: 1em;
					padding: 0;
					margin: 0;
				}
			
				.ftdcard-semester,
				.ftdcard-date {
					font-size: 0.8em;
					padding: 0;
					margin: 0;
				}

			.ftdcard-foot {
				border-top: 1px solid rgba(170, 178, 200, 0.25);
				margin-top: 30px;
				padding-top: 10px;
				font-size: 0.8em;
				display: flex;
			}
				.ftdcard-genre {
					width: 50%;
				}
				.ftdcard-effectiveness {
					width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

					.ftdcard-effectiveness-bar {
					  background-color: red !important;
					}

					.ftdcard-effectiveness-label {
					}





/* ==============================================
                #ADMIN-FEATURED
	================================================= */	

	.admin__class {
		height: 50%;
	}





/* ==============================================
                #ADMIN-SIDEBAR
	================================================= */

	.admin__sidebar {
	}
			
			.sidebar-menu__link {
				color: #000;
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