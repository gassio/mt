<template>
    <div class="video container">
        <img src="/static/add.png">

        <div class="player">
            <button class="button is-white" @click="goBack()"> <i class="fa fa-chevron-left" aria-hidden="true"></i>{{videos[currVideoID].vidTitle}}</button>     


            <div id="player">Loading the player...</div>

            <!--<annotate-path></annotate-path> -->


            <div class="player__progress" id="progress">

                <div class="player__ribbon">
                    <span class="player__ribbon-circle"></span>
                    <span class="player__ribbon-line"></span>
                </div>

                <!-- FOR THE FUTURE
									<div class="player__timeline">
									<span class="player__min"></span>
								</div> -->
            </div>
        </div>

        <div class="annotate" style="padding: 15px;">
            <div class="field">
                <p class="control">
                    Set effectiveness:
                    <el-slider v-model="annotateEffect" :step="1" :min="1" :max="5" show-stops show-tooltip></el-slider>
                </p>
            </div>

            <div class="field">
                <label class="label">Comment</label>
                <p class="control">
                    <textarea class="textarea" placeholder="Comment here..." v-model="annotateComment"></textarea>
                </p>
            </div>

            <div class="field">
                <p class="control">
                    <input class="input is-primary" type="text" placeholder="From" v-model="annotateFrom">
                    <input class="input is-primary" type="text" placeholder="To" v-model="annotateTo">
                </p>
            </div>

            <input type="submit" value="Annotate" @click="annotate()"/>
        </div>

        <div class="cards">
            <div class="card" v-for="card in cards">
                <div class="card-head">
                    <span class="card-title"><strong>{{ card.title }}</strong></span>
                    <span class="card-time"> {{ card.from }} - {{ card.to }} </span>
                </div> 
                <span class="card-desc">{{ card.desc }}</span>
                <span class="card-rating">{{ card.rating }}</span>
            </div>
            <!-- <router-link :to=" '/video/' + id + '/edit' ">
                <button class="button is-warning">Edit</button>
            </router-link>
            <router-view></router-view> -->
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../../main'
    import AnnotatePath from '../AnnotatePath.vue'

    export default {
        data() {
            return {
                videos: eventBus.videos,
                currVideoID: 0,
                id: this.$route.params.id,
                player: null,
                duration: 0,
                clickCoords: 0,
                annotateEffect: 1,
                annotateComment: '',
                annotateFrom: null,
                annotateTo: null,
                cards: [
                    { title: 'Posture & Stance', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', from: '03:05', to: '03:17', rating: '3' },
                    { title: 'Volume, rate and pitch', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', from: '03:05', to: '03:17', rating: '3' },
                ]
            }
        },
        mounted() {
            var that = this

            for (var i=0; i < this.videos.length; ++i){
                if(this.videos[i].videoID === this.id) {
                    this.currVideoID = i
                }
            }
            
            this.duration = this.videos[this.currVideoID].vidDuration

            // Get the correct source of the video. 
            // The "sources" resource (vidSources) is an array that contains about 3-6 objects.
            // The last object = sourcesLength - 1 contains an m4a file, which we do not want.
            // So, we get the last object - 1 = sourcesLength - 2 
            var sourcesLength = this.videos[this.currVideoID].vidSources.length
            var correctSource = sourcesLength - 2

            this.player = jwplayer('player')            
            this.player.setup({
                file: this.videos[this.currVideoID].vidSources[correctSource].file,
                image: this.videos[this.currVideoID].vidThumb,
                "width": 860,
                "height": 460
            });

            // this.player.on('ready', function() {
            //     that.player.addButton(
            //         "/static/add.png", 
            //         "Add annotation", 
            //         function() { that.showAnnoMenu() }, 
            //         "annomenu");
            // })

            // Animate progress bar width
            this.player.on('time', function(event) {
                if (that.player.getState() === 'playing') {
                    var totalTime = that.duration;
                    var currentTime = event.position;
                    var percentTime = (currentTime / totalTime) * 100;

                    // $('.player__bar').animate({width: percentTime + '%'});
                    $('.player__ribbon').animate({ marginLeft: percentTime + "%" }, 150);
                }
            })

            // $( ".player__ribbon" ).draggable({ axis: "x" })
            
            // If progress bar div is clicked, animate width  
            document.getElementById('progress').addEventListener('click', function (e) {
                var offset = this.getClientRects()[0];
                that.clickCoords = e.clientX - offset.left; 
                var clickCoordsPercent = ( that.clickCoords / $('.player__progress').width() ) * 100
                    console.log(clickCoordsPercent + ' %')

                // $('.player__bar').animate({ width: clickCoordsPercent + '%' });
                $('.player__ribbon').animate({ marginLeft: clickCoordsPercent + "%" }, 50);

                var clickTime = (clickCoordsPercent * that.duration) / 100
                    console.log(+ clickTime + ' sec');                     console.log('\n')
                that.player.seek(clickTime)
            }, false);

            // this.player.setControls(false);
        },
        methods: {
            goBack() {
                eventBus.navigateBack(this)
            },
            showAnnoMenu() {
                    $(document).ready(function() {
                        var annoMenu = `
                                <div class="annomenu">
                                        <div class="annomenu-option">
                                        1
                                        </div>
                                        <div class="annomenu-option">
                                        2
                                        </div>
                                        <div class="annomenu-option">
                                        3
                                        </div>
                                        <div class="annomenu-option">
                                        4
                                        </div>
                                        <div class="annomenu-option">
                                        5
                                        </div>
                                </div>
                        `;
                        $('.jw-nextup-container').append(annoMenu)
                    })
            },
            annotate() {
                for (var i=0; i < this.cards.length; i++) {
                    var card = { title: 'Posture & Stance', desc: this.annotateComment, from: this.annotateFrom, to: this.annotateTo, rating: this.annotateEffect }
                }
                this.cards.push(card)
            }
        },
        components: {
            'annotate-path': AnnotatePath
        },
        updated() {
            console.log(this.annotateEffect)
            console.log(this.annotateComment)
        }
    }


    // goCurrentRibbon() {
            //     var that = this

            //     $(document).ready(function(){
            //         var getWidth = $('.player__progress-ribbon').css('margin-left') 
            //         var getWidthParent =  $('.player__progress').width()
            //         var getPercent = parseInt(parseFloat(getWidth) / getWidthParent * 100)

            //         console.log(getPercent)
                    
            //         console.log("goto")
            //         var goToDrag = that.duration / ( 100 / getPercent )
            //         that.player.seek(goToDrag);
            //     });

            // <div class="player__progress">
            //     <span class="player__progress-ribbon" @click="goCurrentRibbon()"></span>
            // </div>
            // },
</script>

<style>

.video {
    padding: 0;
    padding-top: 25px;
    display: flex;
}

    .player {
    }

    .player__progress {
			position: relative;
			height: 125px;
			border-radius: 0;
			background-color: #39425C;
			display: flex;
    }

        .player__bar {
					background-color: red;
        }

        .player__ribbon {
					position: absolute;
					height: 90px;
					margin: 0;
					margin-top: 15px;
					z-index: 999;
					display: flex;
					flex-direction: column;
        }

            .player__ribbon-circle {
							width: 20px;
							height: 20px;
							border-radius: 50%;
							border: 2.5px solid #FFF;
							background-color: #C53B3B;
							display: flex;
							justify-content: center;
            }

            .player__ribbon-line {
							width: 2px;
							height: 100%;
							background-color: #fff;
							margin-left: 0;
							align-self: center;
            }

			.player__timeline {
				width: 100%;
				height: 100%;
				position: relative;
				display: flex;
			}
        .player__min {
					left: 100px;
					width: 1px;
					height: 65%;
					align-self: center;
					position: absolute;
					background-color: #E0E0E0;
        }
        

   
    .cards {
        width: 40%;
        padding-top: 26px;
        display: flex;
        flex-direction: column;
    }
        .card {
            height: 100p;
            background: #eee;
            margin: 10px 15px;
            border: 2px solid #555;
            display: flex;
            flex-direction: column;
        }
            .card-head, .card-desc, .card-rating {
                padding: 10px;
                border-bottom: 1px dotted black;
            }
            
            .card-head {
                display: flex;
                justify-content: space-between;
            }

        .jw-controlbar {
            display: none !important;
        }

        .jw-controlbar-center-group .jw-slider-time, 
        .jw-controlbar-center-group .jw-slider-container, 
        .jw-controlbar-center-group .jw-rail,
        .jw-controlbar-center-group .jw-slider-horizontal .jw-progress,
        .jw-controlbar-center-group .jw-buffer {
            height: 100% !important;
        }
        
        .jw-controlbar-center-group .jw-knob {
            background-color: #202020;
            border: 0.12em solid #fff;
            font-size: 3em;
            top: 10%;
        }
        
        .jw-dock {
            margin-top: 35%;
            margin-left: 10%;
        }

            .jw-dock-button {
                font-size: 3.5em;
                                    margin-top: 45% !important;
            }


        .jw-nextup-container {
            opacity: 1 !important;
            visibility: visible !important;
            padding: 0;
            margin: 0;
        }
            .jw-nextup { display: none !important; }

            /*.annomenu {
                color: #fff;
                height: 90px;
                border: 1px solid #fff;
                background: rgba(33,33,33,.8);
                display: flex;
            }
                .annomenu-option {
                        border-right: 1px solid #fff;
                        width: 25%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                } */

                .test {
                    display: none;
                }
</style>


