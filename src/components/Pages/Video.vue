<template>
    <div class="video container">
        <img src="/static/add.png">

        <div class="player">
            <button class="button is-white" @click="goBack()"> <i class="fa fa-chevron-left" aria-hidden="true"></i>{{videos[currVideoIndex].vidTitle}}</button>     


            <div id="player">Loading the player...</div>

            <div class="annotate" v-show="isAnnotating">
                <div class="annotate-menu">
                    <nav class="annotate-menu__canons">
                        <a @click="chooseCanonAnnotate(c.name, $event)" v-for="c in canons">{{ c.name }}</a>
                        <!--<a @click="chooseCanonAnnotate('delivery', $event)">Delivery</a>
                        <a @click="chooseCanonAnnotate('visual', $event)">Visual</a>
                        <a @click="chooseCanonAnnotate('style', $event)">Style</a>
                        <a @click="chooseCanonAnnotate('moves', $event)">Moves</a> -->
                    </nav>
                    <nav class="annotate-menu__categories" v-if="canon.name === annotateCanon" v-for="canon in canons">
                        <a v-for="cat in canon.categories" @click="chooseCategoryAnnotate(cat.name)">{{ cat.name }}</a>
                        <!-- STRUCTURE
                            <a @click="chooseCategoryAnnotate('key-terms')">Key terms</a>
                        <a @click="chooseCategoryAnnotate('conseptual-transitions')">Conceptual transitions</a>
                        <a @click="chooseCategoryAnnotate('line-of-argument')">Line of argument</a>
                        <a @click="chooseCategoryAnnotate('central-moves')">Central moves</a>

                            DELIVERY
                            <a @click="chooseCategoryAnnotate('volume')">Volume</a>
                        <a @click="chooseCategoryAnnotate('gestures')">Gestures</a>
                        <a @click="chooseCategoryAnnotate('metadiscourse')">Metadiscourse</a>
                        <a @click="chooseCategoryAnnotate('posture')">Posture & stance</a>
                        <a @click="chooseCategoryAnnotate('language')">Language</a>
                            
                            VISUAL
                        <a @click="chooseCategoryAnnotate('pictorial-cues')">Pictorial cues</a>
                        <a @click="chooseCategoryAnnotate('slide-titles')">Slide titles</a>
                        <a @click="chooseCategoryAnnotate('image-text-highlight')">Image-text highlight</a>
                        <a @click="chooseCategoryAnnotate('graphics')">Graphics</a>
                        <a @click="chooseCategoryAnnotate('memorable-images')">Memorable images</a> 
                        -->
                    </nav>
                </div>
                <div class="annotate-desc field" v-for="canon in canons" v-if="canon.name === annotateCanon">
                    <p class="control" v-for="cat in canon.categories" v-if="cat.name === annotateCategory">
                       "{{ cat.desc }}"
                    </p>
                </div>
                <div class="annotate-rating field">
                    <p class="control">
                        Set effectiveness:
                        <el-slider v-model="annotateRating" :step="1" :min="0" :max="5" show-stops show-tooltip></el-slider>
                    </p>
                </div>

                <div class="annotate-comment field">
                    <label class="label">Comment</label>
                    <p class="control">
                        <textarea class="textarea" placeholder="It is always a good idea to include strategy hint..." v-model="annotateComment"></textarea>
                    </p>
                </div>

                <div class="annotate-drag field">
                    <p class="control" style="display:flex; width: 30%">
                        <input class="input is-primary" type="text" placeholder="From" v-model="annotateFrom">
                        <input class="input is-primary" type="text" placeholder="To" v-model="annotateTo">
                    </p>
                </div>
                <div>
                    <input type="submit" value="Annotate" @click="annotate()"/>
                </div>
            </div>

            <div class="annotate-btn" @click="isAnnotating = !isAnnotating">+Annotate</div>
            
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

        <div class="cards">
            <nav class="card-menu">
                <a @click="chooseCanonFilter('Moves')">Moves</a>
                <a @click="chooseCanonFilter('Structure')">Structure</a>
                <a @click="chooseCanonFilter('Delivery')">Delivery</a>
                <a @click="chooseCanonFilter('Visual')">Visual</a>
                <a @click="chooseCanonFilter('Style')">Style</a>
                <!--<a @click="chooseCanonFilter('All')">All</a>-->
            </nav>
            <div class="card" v-for="card in videoAnnotations" v-if="card.canon === filterCanon">
                <div class="card-head" @click="seekCard($event)">
                    <span class="card-title"><strong>{{ card.title }}</strong></span>
                    <span class="card-time"> {{ card.from }} - {{ card.to }} </span>
                </div> 
                <span class="card-comment">{{ card.comment }} </span>
                <span>Canon: {{ card.canon }}</span>
                <span>Category: {{ card.category }}</span>
                <span>Title: {{ card.title }}</span>
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
                videoAnnotations: [],
                canons: eventBus.canons,
                currVideoIndex: 0,
                duration: 0,
                player: null,
                clickCoords: 0,
                annotateCanon: '',
                annotateCategory: '',
                annotateComment: '',
                annotateRating: 1,
                annotateFrom: null,
                annotateTo: null,
                isAnnotating: false,
                filterCanon: 'Delivery',
                id: this.$route.params.id,
            }
        },
        mounted() {
            // console.log('All annotations: ')
            // console.log(eventBus.allAnnotations)
            // console.log('Canons: ')
            // console.log(this.canons)

            var that = this

            for (var i=0; i < this.videos.length; ++i){
                if(this.videos[i].videoID === this.id) {
                    this.currVideoIndex = i
                }
            }

            this.loadVideoAnnotations()

            this.duration = this.videos[this.currVideoIndex].vidDuration

            // Get the correct source of the video. 
            // The "sources" resource (vidSources) is an array that contains about 3-6 objects.
            // The last object = sourcesLength - 1 contains an m4a file, which we do not want.
            // So, we get the last object - 1 = sourcesLength - 2 
            var sourcesLength = this.videos[this.currVideoIndex].vidSources.length
            var correctSource = sourcesLength - 2

            this.player = jwplayer('player')            
            this.player.setup({
                file: this.videos[this.currVideoIndex].vidSources[correctSource].file,
                image: this.videos[this.currVideoIndex].vidThumb,
                "width": 860,
                "height": 460
            });

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
                        var annotatePath = $('.annotate')
                        $('#player').append(annotatePath)
                        $('.annotate').css('display', 'inline')
                    })
            },
            // Fetches annotations of the current video (videoid = URLid)
            // Stores annotations in videoAnnotations[]
            loadVideoAnnotations() {
                for (var i=0; i < eventBus.allAnnotations.length; ++i) {
                    if(eventBus.allAnnotations[i].videoID === this.id) {
                        this.videoAnnotations.push(eventBus.allAnnotations[i])
                    }
                }
            },
            annotate() {
                for (var i=0; i <= this.videoAnnotations.length; i++) {
                    var card = { 
                        title: this.annotateCategory,
                        comment: this.annotateComment,
                        from: this.annotateFrom,
                        to: this.annotateTo, 
                        rating: this.annotateRating, 
                        canon: this.annotateCanon,
                        category: this.annotateCategory,
                        videoID: this.id
                    }
                }
                this.videoAnnotations.push(card)

                // Pushes the new annotation to the main eventBus object
                eventBus.allAnnotations.push(card)
                console.log('eventbus')
                console.log(eventBus.allAnnotations)
                this.annotateComment = ''
                this.annotateFrom = null
                this.annotateTo = null
                this.annotateRating
            },
            activeItemProblem(event) {
                var children = event.currentTarget.parentNode.children
                for (var i=0; i < children.length; i++) {
                    children[i].style.backgroundColor = "transparent"
                }
                event.currentTarget.style.backgroundColor = "yellow"
            },
            chooseCanonFilter(canon) {
                this.filterCanon = canon
                this.activeItemProblem(event)
            },
            chooseCanonAnnotate(canon, event) {
                this.annotateCanon = canon
                this.activeItemProblem(event)
            },
            chooseCategoryAnnotate(category) {
                this.annotateCategory = category
                this.activeItemProblem(event)
            },
            seekCard(event) {
                var timeString = event.currentTarget.children[1].innerText // 03:05 - 03:17
                timeString = timeString.substring(0,5)
                var a = timeString.split(':'); // split it at the colons
                // minutes are worth 60 seconds. Hours are worth 60 minutes.
                var seekTimeSeconds = (+a[0]) * 60 + (+a[1]); // 185s
                this.player.seek(seekTimeSeconds)
                console.log('Seeked to ' + timeString)
            },
        },
        components: {
            'annotate-path': AnnotatePath
        },
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

            // showAnnoMenu() {
            //         $(document).ready(function() {
            //             var annoMenu = `
            //                     <div class="annomenu">
            //                             <div class="annomenu-option">
            //                             1
            //                             </div>
            //                             <div class="annomenu-option">
            //                             2
            //                             </div>
            //                             <div class="annomenu-option">
            //                             3
            //                             </div>
            //                             <div class="annomenu-option">
            //                             4
            //                             </div>
            //                             <div class="annomenu-option">
            //                             5
            //                             </div>
            //                     </div>
            //             `;
            //             $('.jw-nextup-container').append(annoMenu)
            //         })
            // },

            // Append inside the JWPlayer div
            // $(document).ready(function() {
            //     var annotateBtn = $('.annotate-btn')
            //     $('.jw-controls').append(annotateBtn)

            //     var annotate = $('.annotate')
            //     $('#player').append(annotate)
            // })

            // Create button inside JWPlayer, using their API.
            // this.player.on('ready', function() {
            //     that.player.addButton(
            //         "/static/add.png", 
            //         "Add annotation", 
            //         function() { that.showAnnoMenu() }, 
            //         "annomenu");
            // })
</script>

<style>

    .structure, .delivery, .visual, .style, .moves {
        background-color: #39425C
    }

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
        
    .annotate-btn {
      pointer-events: all;
      background-color: yellow;
    }

    .annotate-menu__canons {
        display: flex;
        justify-content: center;
    }

        .annotate-menu__canons a {
            color: #0a0a0a;
            padding: 5px;
        }


    .annotate-menu__categories {
        width: 100%;
        display: flex;
    }
        .annotate-menu__categories a {
            width: 25%;
            height: 100px;
            color: #0a0a0a;
            border: 1px solid #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
        }

            .el-slider__bar, .el-slider__button-wrapper, .el-slider__stop { height: 40px !important; }
            .el-slider__stop { border-radius: 0 !important;}
   
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
            .card-head, .card-comment, .card-rating {
                padding: 10px;
                border-bottom: 1px dotted black;
            }
            
            .card-head {
                display: flex;
                justify-content: space-between;
            }

    .card-menu {
        display: flex;
    }

        .card-menu a {
            color: #0a0a0a;
            padding: 15px;
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
</style>


