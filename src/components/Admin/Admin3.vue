<template>

		<div class="admin">
			
			<div class="admin__body columns">

				<div class="admin__main column is-10">

					<h3 class="featured__heading title is-size-4">Featured videos</h3>

					<div class="admin__featured">
							<div class="container">

								<div class="ftdcard card" v-for="v in videos" v-bind:key="v.id" v-if="v.featured === true">
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
								</div>

							</div>
					</div>

					<!-- <div class="columns">
						<div class="column is-2 container">
							<a class="button is-fullwidth is-info"><i class="fa fa-ellipsis-h"></i>More</a>
						</div>
					</div> -->

					<div class="admin__classvideos">

							<h3 class="class__heading title is-size-4">{{ currentClass }}</h3>

							<article class="classvideo media" style="margin-top:0" v-for="v in videos" v-bind:key="v.id" v-show="v.class === currentClass">
									<figure class="media-left" style="margin:0 0 0 20px">
										<p class="image" style="width:200px">
											<router-link :to="'/video/' + v.id"  tag="a">
												<img :src="v.thumb">
											</router-link>
										</p>
									</figure>
									<div class="media-content" style="align-self:center; margin-left: 10px;">
										<h3 class="is-size-4"><router-link :to="'/video/' + v.id" tag="a" class="classvideo-title has-text-black-ter">{{ v.title }}</router-link></h3>
										<p class="is-size-6 has-text-grey-dark">{{ v.class }}</p>
										<p class="is-size-6 has-text-grey-dark">{{ secondsToMMSS(v.duration) }} / {{ v.genre }} </p>
									</div>
									<div class="media-right" style="align-self:center; padding-right:15px;">
										<div class="star-video" @click="featureVideo($event)">
											<i class="fa fa-star fa-5x" aria-hidden="true"></i>
										</div>
										<div class="has-text-right has-text-grey-dark">
											<p class="is-marginless">Holistic score: <strong>94%</strong></p>
											<p class="is-marginless">Annotations: 34</p>
											<!-- <p class="is-marginless">Lab presentation </p> -->
											<!-- <i class="fa fa-commenting-o fa-2x"></i>										 -->
										</div>
									</div>
							</article>
							
					</div>

				</div>

				<aside class="admin__sidebar column is-2 aside">

					<div class="main">
						<a href="#" class="item" @click="currentClass = 'Home'"><span class="name">Metalogon Home</span></a>
						<a href="#" class="item" @click="currentClass = 'Materials Science and Engineering'"><span class="name">Materials Science and Engineering</span></a>
						<a href="#" class="item" @click="currentClass = 'Aerospace Engineering'"><span class="name">Aerospace Engineering</span></a>
						<a href="#" class="item" @click="currentClass = 'Mathematics'"><span class="name">Mathematics</span></a>
					</div>
					
				</aside>

			</div>
			
			<footer class="footer" style="padding: 2rem;">
				<div class="container">
					<div class="content has-text-centered">
						<p style="margin: 0.2rem;"><strong>©Metalogon</strong> by Andreas Karatsolis.</p>
						<p>Writing, Rhetoric and Professional Communication  at Massachusetts Institute of Technology</p>
					</div>
				</div>
			</footer>					
			
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
				currentClass: 'Materials Science and Engineering'
			}
		},
		created() {
			this.$store.dispatch('getAllVideos')
		},
		mounted() {
			// this.genreSelection()
			
			// this.jerryriggingFeatured()

		},
		methods: {
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
			featureVideo(event) {
				var eventTitle = $(event.currentTarget.parentElement.parentElement).find('.classvideo-title').text()
				for (var i = 0, l = this.videos.length; i < l; i++) {
					if (this.videos[i].title === eventTitle) {
							if (this.videos[i].featured === false) {
								this.$store.commit('FEATURE_VIDEO', this.videos[i].title)
								$(event.currentTarget).css('color', 'rgb(244, 226, 95)')
							} 
							else {
								this.$store.commit('UNFEATURE_VIDEO', this.videos[i].title)
								$(event.currentTarget).css('color', '#4a4a4a')
							}
					}
				}
			}
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

.admin__main {
	padding-left: 30px;
	margin-top: 25px;
}

/* ==============================================
                #ADMIN-FEATURED
	================================================= */

	.featured__heading, .class__heading {
		margin: 10px 20px;
	}

	.admin__featured {
		display: flex;
		/* flex-direction: row;
		flex-wrap: wrap;
		justify-content: center; */
	}

	.admin__featured > .container {
		display:flex;
		flex-wrap: wrap;
		/* background-color: green; */
	}

		.ftdcard {
			width: 30%;
			margin: 10px 20px;
			/* background-color: yellow; */
		}


.star-video {
	display:flex;
	justify-content: center;
	cursor: pointer;
}

	/* .star-video i:hover {
		background-color: yellow;
	} */



/* ==============================================
                #ADMIN-SIDEBAR
	================================================= */

	.admin__sidebar > .main {
		position: fixed;
	}
			
			.sidebar-menu__link {
				color: #000;
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

</style>