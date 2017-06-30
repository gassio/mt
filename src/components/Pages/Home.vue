<template>
    <!-- <div class="content home container">

        <div class="tabs">
            <ul>
                <li class="is-active"><a>All videos</a></li>
                <li><a>Spring '17</a></li>
                <li><a>Winter '16</a></li>
            </ul>
        </div>

        <div class="v-videos">
            <div class="v-video" v-for="vid in videos" v-if="vid.vidStudent === 'Ben Domino'">
                <router-link :to="'/video/' + vid.videoID"  tag="a" >
                    <img class="video-thumb" :src="vid.vidThumb">
                </router-link>
                <span class="video-title">Title: {{ vid.vidTitle }}</span>
                <span class="video-duration">Duration: {{ vid.vidDuration }}</span>
                <span class="video-desc">Description: {{ vid.vidDesc }}</span>
                <span class="video-student">Student: {{ vid.vidStudent }}</span>
                <p>----------------------------</p>
                <span class="video-playlist">Playlist id: <strong>{{ vid.playlistID }}</strong></span>
                <span class="video-id">Video id: {{ vid.videoID }}</span>
            </div>
        </div>
    </div> -->

    <div class= "container">

		<div class= "home-tabs">
			<div class= "columns is-mobile is-gapless is-marginless">
				<div class= "column is-9">
					<div class= "home-tabs-semester">
						<button id="all" class="home-tabs-semester-button" style="width: 60px" type="button">All</button>
						<button id="spring17" class="home-tabs-semester-button" type="button">Spring '17</button>
						<button id="winter16" class="home-tabs-semester-button" type="button">Winter '16</button>
					</div>
				</div>
				<div class= "column is-3">
					<div class= "home-genre-selection">
						<p>Genre: &nbsp </p>
						<select>
							<option value="volvo">All genres</option>
							<option value="saab">???</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<div class= "home-content">
			<div class="home-card" v-for="vid in videos" v-if="vid.vidStudent === 'Ben Domino'">
				<div class="home-card-container column">
					<div class="columns is-gapless is-marginless">
						<div class="column">
                            <router-link :to="'/video/' + vid.videoID"  tag="a" >
                                <img :src="vid.vidThumb" class="home-card-video-thumbnail" alt="video-thumbnail">
                            </router-link>
						</div>
					</div>
					<div class="columns is-gapless is-marginless">
						<div class="column">
							<p class="home-card-description">{{ vid.vidDesc }}</p>
						</div>
					</div>
					<div class="columns is-gapless is-marginless">
						<div class="column">
							<p class="home-card-semester">Spring '17</p>
						</div>
					</div>
					<div class="columns is-gapless is-marginless">
						<div class="column">
							<p class="home-card-date">May 14</p>
						</div>
					</div>
					<div class="columns is-gapless is-marginless">
						<div class="home-card-effectiveness-bar column is-8">
							<progress class="progress is-small" value="75" max="100"></progress>
						</div>
						<div class="column is-4">
							<p class="home-card-effectiveness-label">75% effective</p>
						</div>
					</div>
				</div>
			</div>
			
			<div class="home-card-add-new">
				<i class="fa fa-plus fa-4x" aria-hidden="true"></i>
				<p>Add new video</p>
			</div>
			
		</div>
	</div>    

</template>

<script>
    import { eventBus } from '../../main'

    export default {
        data() {
            return {
                videos: eventBus.videos,
                videoAnnotations: eventBus.allAnnotations
            }
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
.home-tabs{
	min-width: 770px;
	width: 100%;
	height: 60px;
}
	.home-tabs-semester{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-width: 770px;
		width: 100%;
		height: 60px;
	}
		.home-tabs-semester-button{
			background: none;
			border: none;
			padding-left: 10px;
			padding-right: 10px;
			border-bottom: solid 2px rgba(0, 0, 0, .3);
		}

	.home-genre-selection{
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		justify-content: center;
		line-height: 60px;
	}

.home-content{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	min-width: 770px;
	width: 100%;
	height: 100%;
}

	.home-card{
		height:auto;
		width: calc(100% /3 - 20px);
		margin: 10px;
		box-shadow: 3px 3px 9px 0px rgba(0,0,0,0.33);
	}	
		.home-card-container{
			padding: 0px !important;
		}
			.home-card-video-thumbnail{
				width: 100%;
			}
			
			.home-card-description{
				padding-left: 10px !important;
				padding-right: 10px !important;
				font-size:22px
			}
			.home-card-semester{
				padding-left: 20px !important;
				padding-right: 10px !important;
				font-size:18px
			}
			.home-card-date{
				padding-left: 20px !important;
				padding-right: 10px !important;
				font-size:12px
			}
			.home-card-effectiveness-bar{
				margin-top: 6px !important;
				padding-left: 20px !important;
				padding-right: 10px !important;
			}
			.home-card-effectiveness-label{
				padding-left: 20px !important;
				padding-right: 20px !important;
			}		
			
			.home-card-add-new{
				display: flex;
				flex-direction:column;
				justify-content: center;
				align-items: center;
				height:280px;
				width: calc(100% /3 - 20px);
				margin: 10px;
				border: dashed 2px rgba(0, 0, 0, .3);
				box-shadow: 3px 3px 9px 0px rgba(0,0,0,0.33);
			}
			.home-card-add-new p{
				color: #A90931;
				font-size: 30px;
			}

</style>
