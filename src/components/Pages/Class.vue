<template>
     <div class="class container">
        <div class="class-go-back">
            <router-link :to="{ path: '/classes'}">
                <button class="button class-go-back-button"> <i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp Go back</button>
            </router-link>
        </div>
        <div class= "class-of-semester">
            <div class="class-of-semester-title"><p>{{ replaceUnderscores(id) }}</p></div>
        </div><!-- end -->
        
        <!-- MAIN CONTENT - start -->
        <div class="class-content">
            <div class="v-videos fx-dir-col">
                <div class="v-video fx-dir-row" v-for="vid in videos" v-if="vid.class === replaceUnderscores(id)">
                    <!-- CLASS CARD - start -->
                    <router-link :to="'/video/' + vid.videoID"  tag="a" class="class-card columns is-gapless">
                        <div class="class-card-image column is-2 is-gapless is-marginless">
                            <img :src="vid.thumb" alt="video-thumbnail" class="class-card-image-thumbnail">	
                        </div>
                        <div class="class-card-description column is-7 is-gapless is-marginless has-text-left">
                            <p class= "class-card-description-title">{{ vid.title }}</p>
                            <p class= "class-card-description-details">Duration: {{ vid.duration }} | Video id: {{ vid.videoID }} | Playlist id: {{ vid.jwPlaylistID }} | JW Video id: {{ vid.jwVideoID }}</p>
                        </div>
                        <div class="class-card-genre column is-3 is-gapless is-marginless">
                            <strong class="class-card-genre-color">Thesis Proposal</strong> &nbsp&nbsp<i class="fa fa-book fa-2x" aria-hidden="true"></i>
                        </div>
                    </router-link><!-- end -->
                </div>
            </div>
        </div><!-- end -->
        
        <router-view></router-view>
    </div>      
</template>

<script>
    export default {
        data() {
            return { 
                id: this.$route.params.id
            }
        },
        mounted(){
            // this.$store.commit('retrieveVideosByClass', this.id)
        },
        methods: {
            // setClasses() {
            //     this.$store.commit('setClasses')
            // },
            // fetchVideoByClass() {
            //     // to do: correct id in the URL
            //     var url = 'https://cdn.jwplayer.com/v2/playlists/' + this.playlistIDs[i]

            //     this.axios.get(url)
            //         .then(function (response)
            //         {
            //             var playlist = response.data.playlist

            //             for (var i=0; i < playlist.length; ++i) {
            //                 var video = { 
            //                     vidTitle: playlist[i].title, 
            //                     vidLink: playlist[i].link, 
            //                     vidThumb: playlist[i].image, 
            //                     vidDuration: playlist[i].duration, 
            //                     vidDesc: playlist[i].description, 
            //                     vidStudent: playlist[i].student, 
            //                     playlistID: playlist[i].feedid,
            //                     videoID: playlist[i].mediaid,
            //                     vidSources: playlist[i].sources,
            //                     vidPlaylistName: title,
            //                     vidAnnotations: eventBus.allAnnotations
            //                 }
            //                 eventBus.videos.push(video)
            //             }
            //         })
            //         .catch(function (error) {
            //             console.log(error)
            //         })
            // },
            replaceUnderscores(str) {
                return str.replace(/\-/g,' ')
            }
        },
        computed: {
            playlistIDs() {
                return this.$store.state.playlistIDs
            },
            videos() {
                return this.$store.state.videos
            },
            classNames() {
                return this.$store.state.classNames
            },
        },
    }
</script>

<style>
.class-go-back{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 70px !important;
    padding: 10px;
}
    .class-go-back-button{
        transition: background-color 0.5s ease;
        color: #6B6B6B;
        height: 50px !important;
        background-color: none !important;
    }
    .class-go-back-button:hover{
        background-color: #A90931 !important;
        color: #FFFFFF !important;
    }

.class-of-semester{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 30px;
    width: 100%;
}
    .class-of-semester-title{
        height: 30px;
        width: auto;
        border-bottom: 2px solid;
        padding: 4px;
    }

/*-------------- MAIN CONTENT ---------------- */
.class-content{
	height: auto;
	width: 100%;
	padding-left: 20px;
	padding-right: 20px;
}

/*-------------- CLASS CARD ---------------- */
	.class-card{
		height: auto;
		width: 100%;
		margin-top: 30px !important;
		margin-bottom: 0px !important;
        transition:  box-shadow 0.5s ease;
        box-shadow: 3px 3px 9px 0px rgba(0,0,0,0.33);
	}
	.class-card i{
		color: #6B6B6B;
	}
	.class-card:hover{
		box-shadow: 3px 3px 9px 0px rgba(0,0,0,0.5);
		cursor: pointer;
	}
		@media screen and (min-width: 0px){
			.class-card-image{
				display: flex !important;
				flex-direction: row !important; 
				justify-content: center !important;
				width: 100%;
			}	
		}
		@media screen and (min-width: 769px){
			.class-card-image{
				display: flex !important;
				flex-direction: row !important; 
				justify-content: flex-start !important;
				width: 100%;
			}	
		}
			.class-card-image-thumbnail{
				max-height:110px;
			}
		.class-card-description{
			display: flex !important;
			flex-direction: column !important; 
			justify-content: flex-end ;
			width: 100%;
			padding: 14px !important;
			background: none;
		}
			.class-card-description-title{
				font-size: 20px;
				color: #A90931;
			}
            .class-card-description-details{
                color: #6B6B6B;
            }
		.class-card-genre{
			display: flex !important;
			flex-direction: row !important; 
			justify-content: flex-end;
			align-items: flex-end;
			width: 100%;
			padding: 14px !important;
		}
        .class-card-genre-color{
            color: #6B6B6B;
        }
					
</style>