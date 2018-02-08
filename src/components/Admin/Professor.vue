<template>

		<div class="professor">
			
			<div class="professor__body columns">

				<div class="professor__main column is-10">

					<div class="professor__featured">
							<h3 class="featured__heading title is-size-4">Featured videos of {{ currentClassSelected }}</h3>
							
							<div class="professor__featured-container">
								<router-link class="ftdcard card" tag="a" :to="'/video/' + v.id" v-for="v in videos" v-if="v.class === currentClassSelected && v.featuredClass === true" v-bind:key="v.id">
									<div class="card-image">
										<figure class="image">
											<img :src="v.thumb" alt="Placeholder image">
										</figure>
									</div>
									<div class="card-content">
										<div class="media-content">
											<h3 class="is-size-5 has-text-black-bis">{{ v.title }}</h3>
											<p class="subtitle is-6">{{ v.class }}</p>
											<p>{{ v.genre }}</p>
											<p>{{ v.presentedAt | sliceDate }}</p>
										</div>
									</div>
								</router-link>
							</div>
					</div>

					<div class="professor__classvideos">

							<h3 class="class__heading title is-size-4">{{ currentClassSelected }} ({{ currentClassNumber }})</h3>

							<div class="classvideo" v-for="v in videos" v-bind:key="v.id" v-if="v.class === currentClassSelected">
									<img class="classvideo__favorite" src="../../assets/favorite-inactive.svg" @click="favoriteVideo($event)">

									<div class="classvideo__metadata">
										<img class="classvideo__image" :src="v.thumb"></router-link>
										<div class="classvideo__titles">
											<router-link :to="'/video/' + v.id" tag="a" class="classvideo__title">{{ v.title }}</router-link></h3>
											<p class="classvideo__class">{{ v.class }}</p>
											<p class="classvideo__genre">{{ secondsToMMSS(v.duration) }} / {{ v.genre }} </p>
										</div>
										<div class="classvideo__metameta">
											<span class="classvideo__score">
												<p class="classvideo__scoreNum">94%</p>
												<p class="classvideo__scoreLabel">Score</p>
											</span>
											<span class="classvideo__annotations">
												<p class="classvideo__annotationsNum">{{ v.annotations.length }}</p>
												<p class="classvideo__annotationsLabel">Annotations</p>
											</span>
										</div>
									</div>
							</div>

							<upload-video :currentClassProp="currentClassSelected"></upload-video>
							
					</div>

				</div>

				<aside class="professor__sidebar column is-2 aside">
					<div class="metalogon-home menu-list">
						<a @click="setCurrentClass('Home')"><i class="fa fa-home"></i> <span class="name">Metalogon Home</span></a>
						<hr>
					</div>
					<el-tabs v-model="sidebarClassesTab">
						<el-tab-pane label="Active classes" name="activeClasses">
							<el-input icon="search" v-model="activeClassesInputValue" @change="queryActiveClasses()" placeholder="Search a class..."></el-input>
							<div class="menu-list">
								<a v-for="c in activeClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" @click="setCurrentClass(c.name, c.number)"><span class="name">{{ c.number }} - {{ c.name }}</span></a>
									<a href="#" class="" @click="modalCreateClassIsOpen = true"><span class="name "><strong>+ Create new class</strong></span></a>
									<hr>
									<a href="#" @click="openModalArchiveClass()"><i class="fa fa-archive" aria-hidden="true"></i><span class="name" style="padding-left:5px;">Archive class</span></a>
									<hr>
							</div>
						</el-tab-pane>
						<el-tab-pane label="Archived" name="archivedClasses">
							<el-input icon="search" v-model="archivedClassesInputValue" @change="queryArchivedClasses()" placeholder="Search archived classes..."></el-input>							
							<div class="menu-list">
								<a v-for="c in archivedClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" @click="setCurrentClass(c.name, c.number)"><span class="name">{{ c.number }} - {{ c.name }}</span></a>
							</div>
						</el-tab-pane>
					</el-tabs>
				</aside>

			</div>
			
			<footer class="footer" style="padding: 2rem;">
				<div class="container">
					<div class="content has-text-centered">
						<p style="margin: 0.2rem;"><strong>©Metalogon</strong></p>
						<p>Writing, Rhetoric and Professional Communication  at Massachusetts Institute of Technology</p>
					</div>
				</div>
			</footer>		

			<el-dialog title="Add new class" :visible.sync="modalCreateClassIsOpen">
					<el-form :model="newClass">
							<el-form-item label="Name">
									<el-input v-model="newClass.name" placeholder="Advanced Essay Workshop"></el-input>
							</el-form-item>
							<el-form-item label="Department">
								<el-input v-model="newClass.department" placeholder="Comparative Media Studies / Writing"></el-input>
									<!-- <el-select  placeholder="Choose a department" >
										<el-option v-model="newClass.department" :label="c.department" :value="c.department" v-for="c in classes" v-bind:key="c.title"></el-option>
									</el-select> -->
							</el-form-item>
							<el-form-item label="Number">
									<el-input v-model="newClass.number" placeholder="21W.745"></el-input>
							</el-form-item>
							<el-form-item label="Semester">
									<el-input v-model="newClass.semester" placeholder="Spring 2018"></el-input>
							</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
							<el-button @click="modalCreateClassIsOpen = false">Cancel</el-button>
							<el-button class="add-class-btn" @click="createClass(); modalCreateClassIsOpen = false;">Create Class</el-button>
					</span>
			</el-dialog>	

			<el-dialog :title="'Do you want to archive `' + currentClassSelected + '` class?'" :visible.sync="modalArchiveClassIsOpen">
					<el-button @click="modalArchiveClassIsOpen = false">Go back</el-button>
					<el-button class="add-class-btn" @click="archiveClass()"><strong>Archive Class</strong></el-button>
			</el-dialog>	
			
		</div>	

</template>

<script>
	import axios from 'axios'
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	import UploadVideo from '../Extra/UploadVideo.vue'
	import _ from 'lodash'

    export default {
			data() {
				return {
					sidebarClassesTab: 'activeClasses',
					// currentClassString: '',
					activeClassesInputValue: '',
					archivedClassesInputValue: '',
					modalCreateClassIsOpen: false,
					modalArchiveClassIsOpen: false,
					newClass: {
						archived: false,
						department: '',
						name: '',
						number: '',
						semester: ''
					},
				}
			},
			created() {	
				this.$store.dispatch('getAllVideos')
				this.$store.dispatch('getAllClasses')
			},
			mounted() {
			},
			methods: {
				// A Vue setter.
				queryActiveClasses: _.debounce(function () {
					console.log('QUERY ACTIVE CLASSES')
					this.$store.commit('FILTER_ACTIVE_CLASSES', this.activeClassesInputValue)
     		}, 300),
				// A Vue setter.
				queryArchivedClasses: _.debounce(function () {
					console.log('QUERY ARCHIVED CLASSES')
					this.$store.commit('FILTER_ARCHIVED_CLASSES', this.archivedClassesInputValue)
				}, 300),
				setCurrentClass(className, classNumber) {
					this.$store.commit('CURRENT_CLASS_SELECT', {className: className, classNumber: classNumber})
				},
				favoriteVideo(event) {
					var eventTitle = $(event.currentTarget.parentElement.parentElement).find('.classvideo-title').text()
					for (var i = 0, l = this.videos.length; i < l; i++) {
						if (this.videos[i].title === eventTitle) {
								if (this.videos[i].featured === false) {
									this.$store.commit('FAVORITE_VIDEO', this.videos[i].title)
									$(event.currentTarget).css('color', 'rgb(244, 226, 95)')
								} 
								else {
									this.$store.commit('UNFAVORITE_VIDEO', this.videos[i].title)
									$(event.currentTarget).css('color', '#4a4a4a')
								}
						}
					}
				},
				createClass() {	
						this.$store.dispatch('createClass', { 
								newClass: this.newClass
						})
						this.newClass = {}
				},
				openModalArchiveClass() {
						if (this.currentClassSelected !== '')
							this.modalArchiveClassIsOpen = true
				},
				archiveClass() {
					// 1. Adds current class to Archived Classes.
					// 2. Removes current class from Active Classes.
					// 3. Modifies classes object.
					var objectToBeArchived = {}
					var objectId
					for (var i = 0, l = this.activeClasses.length; i < l; i++) {
						if (this.activeClasses[i].name === this.currentClassSelected) {
							this.activeClasses[i].archived = true
							objectToBeArchived = this.activeClasses[i]
							objectId = this.activeClasses[i].id
							break
						}
					}
					this.$store.dispatch('archiveClass', { 
						classId: objectId,
						classObject: objectToBeArchived 
					})
					
					this.modalArchiveClassIsOpen = false // Closes the modal.
					var noClass = 'select a class'
					this.$store.commit('CURRENT_CLASS_SELECT', noClass) // Sets the current showing class state to null.
				},
				secondsToMMSS(s) {
					s = Number(s);

					var m = Math.floor(s % 3600 / 60);
					var s = Math.floor(s % 3600 % 60);

					return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
				}
			},
			computed: {
					...mapGetters(
							['videos', 'uploadUrl', 'classes', 'activeClasses', 'archivedClasses', 'currentClassSelected', 'currentClassNumber']
					)
			},
			components: {
				'upload-video': UploadVideo
			}
		}
</script>

<style>
/* ==============================================
                #GENERAL-LAYOUT
	================================================= */
.professor__body { 
	margin-bottom: 0 !important;
}

.professor__main {
	padding-left: 30px;
	margin-top: 25px;
}





/* ==============================================
                #FEATURED
	================================================= */

	.professor__featured {

	}

		.professor__featured-container {
			display:flex;
			flex-wrap: wrap;
		}
			
		.featured__heading {
			background-color: #A90931;
			color: #FFF;
			padding: 9px;
			margin-bottom: 0.5em !important;
		}

			.ftdcard {
				width: 32.30%;
				margin: 0.3em;
				transition: 0.3s;
			}

			.ftdcard:hover {
				transform: scale(1.02);
				transition: 0.3s;
			}





/* ==============================================
                #CLASS-VIDEOS
	================================================= */

		.professor__classvideos {
			margin-top: 10px;
		}

		.class__heading {
			background-color: #A90931;
			color: #FFF;
			padding: 9px;
			margin-bottom: 0.5em !important;
		}

		.classvideo {
			display: flex;
			padding: 25px 10px;
			border-bottom: 1px solid #efefef;
		} 
		.classvideo:hover	{
			background-color: #F5F5F5;
		}

			.classvideo__favorite {
				width: 30px;
				height: 60px;
			}

			.classvideo__metadata {
				display: flex;
				justify-content: space-between;
				margin-left: 20px;
				width: 100%;
			}

				.classvideo__image {
					display: flex;
					width: 200px;
					height: 60px;
				}

				.classvideo__titles {
					width: 100%;
					margin-left: 15px;
				}
						.classvideo__title {
							color: #4a4a4a;
							font-weight: 600;
							font-size: 1.3em;
						}
						.classvideo__class {
							font-weight: 600;
							margin-top: 6px;
						}
						.classvideo__genre {
							font-weight: 600;
							margin-top: -4px;
						}

				.classvideo__metameta {
					display: flex;
					margin-left: 15px;
				}

					.classvideo__score {
						background-color:#89a9c0; 
						color: #fff;
						padding: 0px 15px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						border-radius: 4px;
					}
							.classvideo__scoreNum {
								font-weight: 600;
								font-size: 2em;
								text-align: center;
							}
							.classvideo__scoreLabel {
								font-size: 0.8em;
								text-align: center;
 							}

					.classvideo__annotations {
						margin-left: 10px;
						background-color:#89a9c0; 
						color: #fff;
						padding: 0px 15px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						border-radius: 4px;
					}
							.classvideo__annotationsNum {
								font-weight: 600;
								font-size: 2em;
								text-align: center;
							}
							.classvideo__annotationsLabel {
								font-size: 0.8em;
								text-align: center;
							}






/* ==============================================
                #professor-SIDEBAR
	================================================= */

.professor__sidebar {
	padding: 0;
	margin-top: 13px;
}

.professor__sidebar .menu-list {
	padding: 0;
	margin-top: 20px;	
	/* position: fixed; */
}

	.professor__sidebar .menu-list a {
		padding: 15px 15px;
	}

/*
	.professor__sidebar > .main {
		padding: 0 !important;
	}
		.professor__sidebar > .main > .item {
			padding: 10px !important;
		}
		.professor__sidebar > .main > .item:hover {
			 margin: 0 !important;
			padding: 0 !important; 
		}*/
			
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
                #TRUMPS-BULMA-THEME
	================================================= */
.nav.is-dark {
  background-color: #232B2D;
  color: #F6F7F7;
}
.nav.is-dark .nav-item a, .nav.is-dark a.nav-item {
    color: #F6F7F7;
}
.nav.is-dark .nav-item a.button.is-default {
    color: #F6F7F7;
    background-color: transparent;
    border-width: 2px;
}
.nav.menu {
  border-bottom: 1px solid #e1e1e1;
}
.nav.menu .nav-item .icon-btn {
  border: 3px solid #B7C6C9;
  border-radius: 90px;
  padding: 5px 7px;
  color: #B7C6C9;
}
.nav.menu .nav-item.is-active .icon-btn {
  color: #2EB398;
  border: 3px solid #2EB398;
}
.nav.menu .nav-item .icon-btn .fa {
  font-size: 20px;
  color: #B7C6C9;
}
.nav.menu .nav-item.is-active .icon-btn .fa {
  color: #2EB398;
}
.aside {
  display:block;
  background-color: #F9F9F9;
  border-right: 1px solid #DEDEDE;
}
.messages {
  display:block;
  background-color: #fff;
  border-right: 1px solid #DEDEDE;
}
.message {
  display:block;
  background-color: #fff;
}
.aside .compose {
  height: 95px;
  margin:0 -10px;
  padding: 25px 30px;
}
.aside .compose .button {
  color: #F6F7F7;
}
.aside .compose .button .compose {
  font-size: 14px;
  font-weight: 700;
}
.aside .main {
  padding: 40px;
  color: #6F7B7E;
}
.aside .title {
  color: #6F7B7E;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
.aside .main .item {
  display: block;
  padding: 10px 0;
  color: #6F7B7E;
}
.aside .main .item.active {
  background-color: #F1F1F1;
  margin: 0 -50px;
  padding-left: 50px;
}
.aside .main .item:active,.aside .main .item:hover {
  background-color: #F2F2F2;
  margin: 0 -50px;
  padding-left: 50px;
}
.aside .main .icon {
  font-size: 19px;
  padding-right: 30px;
  color: #A0A0A0;
}
.aside .main .name {
  font-size: 15px;
  color: #5D5D5D;
  font-weight: 500;
}
.messages {
  padding: 40px 20px;
}
.message {
  padding: 40px 20px;
}
.messages .action-buttons {
  padding: 0;
  margin-top: -20px;
}
.message .action-buttons {
  padding: 0;
  margin-top: -5px;
}
.action-buttons .control.is-grouped {
  display: inline-block;
  margin-right: 30px;
}
.action-buttons .control.is-grouped:last-child {
  margin-right: 0;
}
.action-buttons .control.is-grouped .button:first-child {
  border-radius: 5px 0 0 5px;
}
.action-buttons .control.is-grouped .button:last-child {
  border-radius: 0 5px 5px 0;
}
.action-buttons .control.is-grouped .button {
  margin-right: -5px;
  border-radius: 0;
}
.pg {
  display: inline-block;
  top:10px;
}
.action-buttons .pg .title {
  display: block;
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 3px;
  font-size:12px;
  color: #AAAAAA;
}
.action-buttons .pg a{
  font-size:12px;
  color: #AAAAAA;
  text-decoration: none;
}
.is-grouped .button {
  background-image: linear-gradient(#F8F8F8, #F1F1F1);
}
.is-grouped .button .fa {
  font-size: 15px;
  color: #AAAAAA;
}
.inbox-messages {
  margin-top:60px;
}
.message-preview {
  margin-top: 60px;
}
.inbox-messages .card {
  width: 100%;
}
.inbox-messages strong {
  color: #5D5D5D;
}
.inbox-messages .msg-check {
  padding: 0 20px;
}
.inbox-messages .msg-subject {
  padding: 10px 0;
  color: #5D5D5D;
}
.inbox-messages .msg-attachment {
  float:right;
}
.inbox-messages .msg-snippet {
  padding: 5px 20px 0px 5px;
}
.inbox-messages .msg-subject .fa {
  font-size: 14px;
  padding:3px 0;
}
.inbox-messages .msg-timestamp {
  float: right;
  padding: 0 20px;
  color: #5D5D5D;
}
.message-preview .avatar {
  display: inline-block;
}
.message-preview .top .address {
  display: inline-block;
  padding: 0 20px;
}
.avatar img {
  width: 40px;
  border-radius: 50px;
  border: 2px solid #999;
  padding: 2px;
}
.address .name {
  font-size: 16px;
  font-weight: bold;
}
.address .email {
  font-weight: bold;
  color: #B6C7D1;
}
.card.active {
  background-color:#F5F5F5;
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




	/* ==============================================
                #HELPERS
	================================================= */

	.is-bg-light {
	  background-color: #f1f1f1;
	}
	.is-bg-mt-yellow {
	  background-color: #B6AC1C;
	}
        .menu-list .is-bg-mt-yellow:hover {
            background-color: #ada316;
        }

</style>