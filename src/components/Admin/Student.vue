<template>

		<div class="student">

			<my-header></my-header>
			
			<div class="student__body columns">

				<div class="student__main column is-10">

					<div class="student__featured">
							<h3 class="featured__heading title is-size-4">Featured videos of {{ currentClassSelected }}</h3>
							
							<div class="student__featured-container">

								<router-link class="ftdcard card" tag="a" :to="'/video/' + v.id" v-for="v in videos" v-if="currentClassSelected !== 'Home' && v.class === currentClassSelected && v.featuredClass === true" v-bind:key="v.id">
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

								<router-link class="ftdcard card" tag="a" :to="'/video/' + v.id" v-for="v in videos" v-if="currentClassSelected === 'Home' && v.featuredGlobal === true" v-bind:key="v.id">
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

					<div class="student__classvideos" v-show="!(currentClassSelected === 'Home')">

							<h3 class="class__heading title is-size-4"> {{ currentClassNumber }} - {{ currentClassSelected }}</h3>

							<div class="classvideo" v-for="v in videos" v-bind:key="v.id" v-if="v.class === currentClassSelected">
									<img class="classvideo__favorite" src="../../assets/favorite-inactive.svg" v-show="v.featuredClass === false" @click="featureVideo($event)">
									<img class="classvideo__favorite" src="../../assets/favorite-active.svg" v-show="v.featuredClass === true" @click="unfeatureVideo($event)">

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
												<p class="classvideo__annotationsLabel">Comments</p>
											</span>
										</div>
									</div>
							</div>
							
					</div>

				</div>

				<aside class="student__sidebar column is-2 aside">

					<div class="menu-list">
						<a href="#" @click="modalEnrollClassIsOpen = true"><span class="name"><strong>+ Find a class to enroll</strong></span></a>
					</div>
					<el-tabs v-model="sidebarClassesTab">
						<el-input icon="search" v-model="searchInputValue" @change="queryStudentClasses()" placeholder="Search for a class..."></el-input>	
						<div class="menu-list">
							<a v-for="c in studentClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassString === c.name) }" @click="setCurrentClass(c.name, c.number)"><span class="name">{{ c.name }}</span></a>
						</div>
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

			<el-dialog title="Find a class to enroll" class="student__enrollModal" :visible.sync="modalEnrollClassIsOpen" size="full">
					<a class="classes-card" v-for="c in otherClasses" :key="c.id" @click="enrollToClass($event)">
							<i aria-hidden="true" class="fa fa-book fa-5x"></i>
							<strong class="classes-card-title">"{{ c.name }}"</strong> 
							<p class="classes-card-title">{{ c.department }}</p> 
							<p class=""> {{ c.number }} - {{ c.semester }}</p> 
					</a>
			</el-dialog>	    
		
		</div>	

</template>

<script>
	import axios from 'axios'
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	import UploadVideo from '../Extra/UploadVideo.vue'
	import MyHeader from '../Layout/MyHeader.vue'
	import _ from 'lodash'

    export default {
			data() {
				return {
						sidebarClassesTab: 'activeClasses',
						currentClassString: '',
						searchInputValue: '',
						modalEnrollClassIsOpen: false,
						otherClasses: [
							{ id: '5bc87287-1271-4f0c-94a1', department: "Chemical Engineering", name: 'Numerical Methods Applied to Chemical Engineering', number: '10.34', semester: 'Spring 2018', archived: false },
							{ id: '6bc87287-1271-4f0c-94a2', department: "Chemical Engineering", name: 'Fundamentals of Advanced Energy Conversion', number: '10.390J', semester: 'Spring 2018', archived: false },
							{ id: '7bc87287-1271-4f0c-94a3', department: "Aeronautics and Astronautics", name: 'Dynamics', number: '16.07', semester: 'Spring 2018', archived: false },
							{ id: '8bc87287-1271-4f0c-94a4', department: "Aeronautics and Astronautics", name: 'System Safety', number: '16.863J', semester: 'Spring 2018', archived: false }
						]
				}
			},
			methods: {
				queryStudentClasses: _.debounce(function () {
					console.log('QUERY STUDENT CLASSES')

					this.$store.commit('FILTER_STUDENT_CLASSES', this.searchInputValue) 
				}, 300),
				setCurrentClass(className, classNumber) {
					this.$store.commit('CURRENT_CLASS_SELECT', {className: className, classNumber: classNumber})
				},
				enrollToClass(event) {
					const clickedClassName = event.currentTarget.children[1].innerHTML
					for (var i = 0, l = this.otherClasses.length; i < l; i++) {
						if (this.otherClasses[i].name === clickedClassName) {
							this.currentClassString = this.otherClasses[i].name
							this.studentClasses.push(this.otherClasses[i])
							this.classes.push(this.otherClasses[i])
							this.otherClasses.splice(i,1)	
							break
						}
					}
					this.modalEnrollClassIsOpen = false
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
				secondsToMMSS(s) {
							s = Number(s);

							var m = Math.floor(s % 3600 / 60);
							var s = Math.floor(s % 3600 % 60);

							return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
				},
			},
			created() {
				this.$store.dispatch('getAllVideos')
				this.$store.dispatch('getAllClasses')
				this.$store.state.currentClassSelected = 'Home'
			},
			mounted() {
				// Check if role is student. If not redirect to current role's homePage
				const role = this.$root.$options.myAuth.getAuthData().role_id
				console.log("student.vue, role: " + role)
				if (role.toLowerCase() != "student") {
					console.log("student.vue, pushing router /decideHome")
					this.$router.push('/DecideHome')
				}
				

				if (this.$router.currentRoute.fullPath === '/student')
					$('.navbar-end .badge').hide()
			},
			computed: {
				...mapGetters(
						['videos', 'uploadUrl', 'classes', 'studentClasses', 'currentClassSelected', 'currentClassNumber']
				),
			},
			components: {
				'upload-video': UploadVideo,
				'my-header': MyHeader
			}
		}
</script>

<style>

.student__body { 
	margin-bottom: 0 !important;
}

.student__main {
	padding-left: 30px;
	margin-top: 25px;
}

/* ==============================================
                #FEATURED
	================================================= */

	.student__featured {

	}

		.student__featured-container {
			display:flex;
			flex-wrap: wrap;
		}
			
		.featured__heading {
			background-color: #16324f;
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
			background-color: #16324f;
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
                #student-SIDEBAR
	================================================= */

.student__sidebar {
	padding: 0;
}

.student__sidebar .menu-list {
	padding: 0;
	margin-top: 20px;	
}

	.student__sidebar .menu-list a {
		padding: 15px 15px;
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
                #ENROLL-TO-CLASS CLASSES-CARD
	================================================= */

	.student__enrollModal .el-dialog__body {
		display: flex;
		flex-wrap: wrap;
	}
			.classes-card {
				background-color: rgba(169,9,49,0.04);
				color: #A90931;
				padding: 45px;
				margin: 20px;
				height: auto;
				transition:  box-shadow 0.5s ease;
				width: 250px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
				.classes-card:hover {
					cursor: pointer;
					transition: 0.2s;
					-webkit-transition: 0.2s;
					background-color: #A90931;
					color: #FFF !important;
				}

				.classes-card-title {
					text-align: center;
					font-size: 18px;
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