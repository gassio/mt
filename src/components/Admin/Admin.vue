<template>
		
		<div class="admin">
			
			<my-header></my-header>
			
			<div class="admin__body columns">

				<div class="admin__main column is-10">

						<div class="featured">
								<h3 class="featured__heading">Featured videos of Home</h3>
								<div class="featured__container">
									<mt-video-card v-for="video in videos" v-bind:key="video.id" :currentVideo="video" v-if="video.featuredGlobal === true"></mt-video-card>
								</div>
						</div>

					<div class="admin__classvideos" v-show="!(currentClassSelected === 'Home')">
							<h3 class="class__heading"> {{ currentClassNumber }} - {{ currentClassSelected }}</h3>
							<mt-video-itemlist v-for="v in videos" v-bind:key="v.id" :currentVideo="v" v-if="v.class === currentClassSelected"></mt-video-itemlist>
					</div>
					
					<upload-video :currentClassProp="currentClassSelected"></upload-video>

				</div>

				<aside class="admin__sidebar column is-2 aside">

					<div class="menu-list">
						<a href="#" class="" @click="modalCreateClassIsOpen = true"><span class="name"><strong>+ Create new class</strong></span></a>
						<a v-show="!(currentClassSelected === 'Home')" class="" @click="modalDeleteClassIsOpen = true"><span class="name"><i class="fa fa-trash" aria-hidden="true"></i> Delete this class</span></a>
						<hr>
						<el-input icon="search" v-model="searchInputValue" @change="queryAdminClasses()" placeholder="Search for a class..."></el-input>	
						<a v-for="c in adminClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassString === c.name) }" @click="setCurrentClass(c.name, c.number)"><span class="name">{{ c.number }} - {{ c.name }}</span></a>
					</div>
					
				</aside>

			</div>
			
			<my-footer></my-footer>

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

			<el-dialog :title="'Do you want to delete `' + currentClassSelected + '` class?'" :visible.sync="modalDeleteClassIsOpen">
				<el-button @click="modalDeleteClassIsOpen = false">Go back</el-button>
				<el-button class="add-class-btn" @click="deleteClass()"><strong>Delete Class</strong></el-button>
			</el-dialog>			
			
		</div>	

</template>



<script>
	import axios from 'axios'
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	import UploadVideo from '../Extra/UploadVideo.vue'
	import MyHeader from '../Layout/MyHeader.vue'
	import MyFooter from '../Layout/MyFooter.vue'
	import MtVideoCard from './Shared/MtVideoCard.vue'
	import MtVideoItemList from './Shared/MtVideoItemList.vue'

    export default {
			data() {
				return {
					currentClassString: '',
					searchInputValue: '',
					modalCreateClassIsOpen: false,
					modalDeleteClassIsOpen: false,
					newClass: {
						archived: false,
						department: '',
						name: '',
						number: '',
						semester: ''
					},
				}
			},
			methods: {
				setCurrentClass(className, classNumber) {
					this.$store.commit('CURRENT_CLASS_SELECT', {className: className, classNumber: classNumber})
				},
				createClass() {	
						this.$store.dispatch('createClass', { 
								newClass: this.newClass
						})
						this.newClass = {}
				},
				deleteClass() {
					var objectId
					for (var i = 0, l = this.adminClasses.length; i < l; i++) {
						if (this.adminClasses[i].name === this.currentClassSelected) {
							objectId = this.adminClasses[i].id
						}
					}
					this.$store.dispatch( 'deleteClass', objectId )
					
					this.modalDeleteClassIsOpen = false
					this.$store.commit('CURRENT_CLASS_SELECT', { className: 'Home' }) // Sets the current showing class state to null.
				},
				queryAdminClasses: _.debounce(function () {
					console.log('QUERY ADMIN CLASSES')

					this.$store.commit('FILTER_ADMIN_CLASSES', this.searchInputValue) 
				}, 300),
				genreSelection() {
					let that = this
					$('.admin__genre').dropdown({
						onChange: function (value, text, $selectedItem) {
							that.currentGenre = text
						}
					})
				},
				secondsToMMSS(s) {
							s = Number(s);

							var m = Math.floor(s % 3600 / 60);
							var s = Math.floor(s % 3600 % 60);

							return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
				},
				jerryriggingFeatured() {
					for (var i = 0, l = this.videos.length; i < l; i++) {
						this.videos[i]["featured"] = false
					}
				},
			},
			created() {
				this.$store.dispatch('getAllVideos')
				this.$store.dispatch('getAllClasses')
				this.$store.state.currentClassSelected = 'Home'
			},
			mounted() {
				// Check if role is admin. If not redirect to current role's homePage
				const role = this.$root.$options.authService.getAuthData().role_id
				console.log("admin.vue, role: " + role)
				if (role.toLowerCase() != "admin") {
					console.log("admin.vue, pushing router /decideHome")
					this.$router.push('/DecideHome')
				}
			},
			computed: {
				...mapGetters(
					['videos', 'uploadUrl', 'classes', 'currentClassSelected', 'currentClassNumber', 'adminClasses']
				),
			},
			components: {
				'upload-video': UploadVideo,
				'my-header': MyHeader,
				'my-footer': MyFooter,
				'mt-video-card': MtVideoCard,
				'mt-video-itemlist': MtVideoItemList,
			}
		}
</script>

<style>
.admin__body { 
	margin-bottom: 0 !important;
	min-height: calc(100vh - 160px);
}

.admin__main {
	padding-left: 30px;
	margin-top: 25px;
}





/* ==============================================
                #CLASS-VIDEOS
	================================================= */

		.professor__classvideos {
			margin-top: 10px;
		}

		.class__heading {
			background-color: #16324f;
			color: #FFF;
			padding: 9px;
			margin-bottom: 0.5em !important;
			border-radius: 7px;
		}

		.classvideo {
			display: flex;
			padding: 17px 10px;
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
							font-size: 18px;
							font-weight: 600;
						}
						.classvideo__class {
							margin-top: 6px;
							font-size: 14px;
						}
						.classvideo__genre {
							margin-top: -4px;
							font-size: 14px;
						}

				.classvideo__metameta {
					display: flex;
					margin-left: 15px;
				}

					.classvideo__score {
						background-color:#89a9c0; 
						color: #fff;
						padding: 0px 8px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						border-radius: 4px;
						margin-top: 10px;
					}
							.classvideo__scoreNum {
								font-weight: 600;
								font-size: 1.8em;
								height: 50%;
								margin-top: 10px;
							}
							.classvideo__scoreLabel {
								font-size: 0.8em;
								text-align: center;
								height: 50%;
 							}

					.classvideo__annotations {
						margin-top: 10px;
						margin-left: 10px;
						background-color:#89a9c0; 
						color: #fff;
						padding: 0px 8px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						border-radius: 4px;
					}
							.classvideo__annotationsNum {
								font-weight: 600;
								font-size: 1.8em;
								text-align: center;
								height: 50%;
								margin-top: 10px;
							}
							.classvideo__annotationsLabel {
								font-size: 0.8em;
								text-align: center;
								height: 50%;
							}




/* ==============================================
                #ADMIN-SIDEBAR
	================================================= */

.admin__sidebar {
	padding: 0;
}

.admin__sidebar .menu-list {
	padding: 0;
	margin-top: 20px;	
}

	.admin__sidebar .menu-list a {
		padding: 15px 15px;
	}

	.menu-list span {
		font-size: 14px;
	}




/* ==============================================
                #ADMIN-SIDEBAR
	================================================= */

	.classvideo:hover	{
		background-color: #F5F5F5;
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

</style>