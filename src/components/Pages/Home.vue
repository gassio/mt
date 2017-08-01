<template>
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

		<div class="home-content">

			<div class="videocard" v-for="v in videos">
				<router-link :to="'/video/' + v.videoID" class="videocard-thumbnail" tag="a">
					<img :src="v.thumb" alt="video-thumbnail" class="videocard-thumbnail-image">
				</router-link>
				<div class="videocard-content">
					<div class="videocard-details">
						<p class="videocard-description">{{ v.title }}</p>
						<p class="videocard-semester">Spring '17</p>
						<p class="videocard-date">July 2017</p>
					</div>
					<div class="videocard-foot">
						<span class="videocard-genre">Thesis Talk</span>
						<div class="videocard-effectiveness">
							<progress value="75" max="100"></progress>
							<p class="home-card-effectiveness-label">75%</p>
						</div>
					</div>				
				</div>
				
			</div>
			
			<div class="videocard-add-new">
				<i class="fa fa-plus fa-3x" aria-hidden="true"></i>
				<p>Add new video</p>
				<!--<span>Or drop it here</span>-->
			</div>
			
		</div>
	</div>    

</template>

<script>
    export default {
		computed: {
            videos() {
                return this.$store.getters.videos
            },
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
		justify-content: center;
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
	.videocard-add-new p {
		color: #A90931;
		font-size: 30px;
	}
	.videocard-add-new span {
		color: #6B6B6B;
	}

</style>
