<template>
    <div class="video container">

        <div class="player">
            <button class="button is-white" @click="goBack()"> <i class="fa fa-chevron-left" aria-hidden="true"></i>{{videos[id].title}}</button>     

            <!--<annotate-path></annotate-path> -->
            
            <div id="player">Loading the player...</div>

            <div class="annotate" v-show="isAnnotating">
                <div class="annotate-menu" v-show="annotateMenuisShown">
                    <nav class="annotate-menu__canons">
                        <a @click="chooseCanonAnnotate(c.name, $event)" v-for="c in canons">{{ c.name }}</a>
                        <div class="annotate-menu__canons-close"><span @click="isAnnotating = false">X</span></div>
                    </nav>
                    <nav class="annotate-menu__categories" v-if="canon.name === annotateCanon" v-for="canon in canons">
                        <a v-for="cat in canon.categories" @click="chooseCategoryAnnotate(cat.name)">{{ cat.name }}</a>  
                    </nav>
                </div>
                
                
                <div class="annotate-fields" v-show="!annotateMenuisShown">
                    <div class="annotate-fields-left">
                        <button class="button is-white" @click="annotateMenuisShown = true"><i aria-hidden="true" class="fa fa-chevron-left"></i>Back</button>
                    </div>
                    
                    <div class="annotate-fields-right">
                        <div class="annotate-desc field" v-for="canon in canons" v-if="canon.name === annotateCanon">
                            <p class="control" v-for="cat in canon.categories" v-if="cat.name === annotateCategory">"{{ cat.desc }}"</p>
                            <div class="annotate-menu__canons-close"><span @click="isAnnotating = false">X</span></div>
                        </div>
                        <div class="annotate-effectiveness field">
                             <label class="label">Set effectiveness:</label>
                            <el-slider v-model="annotateRating" :step="1" :min="0" :max="5" show-stops show-tooltip class="annotate-effectiveness-slider"></el-slider>
                        </div>
                        <div class="annotate-comment field">
                            <label class="label">Comment:</label>
                            <p class="control">
                                <textarea class="textarea" placeholder="It is always a good idea to include strategy hint..." v-model="annotateComment"></textarea>
                            </p>
                        </div>
                        <div class="annotate-drag">
                            <div class="annotate-drag-inputs">
                                <input class="input is-primary" type="text" placeholder="From" v-model="annotateFrom">
                                <input class="input is-primary" type="text" placeholder="To" v-model="annotateTo">
                            </div>
                            <div class="annotate-submit">
                                <button class="button is-link" @click="annotate()">Annotate</button>
                            </div>                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>

            <div class="player__from-to" id="from-to" v-show="isAnnotating">
                <span class="timeline__start" draggable="true"></span>
                <span class="timeline__end" draggable="true"></span>
                <span class="timeline__clip"></span>
                <!--<div class="player__timeline">
                    <span class="timeline__start"></span>
                </div> -->
            </div>

            <div class="player__progress" id="progress" v-show="isAnnotating">
                <span style="color: #fff;margin-top: 10px;">{{ videoCurrentTimeMMSS }}</span>

                <div class="player__ribbon">
                    <span class="player__ribbon-circle"></span>
                    <span class="player__ribbon-line"></span>
                </div>

                <!-- <div class="annotate-btn" @click="annotating()">+Annotate</div> -->
                <!--<span style="color: #fff;margin-top: 10px; padding-left: 15px;">{{ videoDurationMMSS }}</span>-->
            </div>
        </div>

        <div class="cards">
            <nav class="card-menu">
                <a @click="chooseCanonFilter('Moves')">Moves</a>
                <a @click="chooseCanonFilter('Structure')">Structure</a>
                <a @click="chooseCanonFilter('Delivery')">Delivery</a>
                <a @click="chooseCanonFilter('Visual')">Visual</a>
                <a @click="chooseCanonFilter('Style')">Style</a>
                <a @click="chooseCanonFilter('All')">All</a>
            </nav>

            <div class="timeline-card columns is-gapless" v-for="card in videoAnnotations" v-if="card.canon === filterCanon">
                <div class="column" @click="seekCard($event)">
                    <div class="columns is-gapless is-marginless">
                        <div class="column is-9">
                            <p class="timeline-card-title">{{ card.category }}</p>
                        </div>
                        <div class="column is-3">
                            <p class="timeline-card-time">{{ card.from }} - {{ card.to }}</p>
                        </div>
                    </div>
                    <div class="columns is-gapless is-marginless">
                        <div class="column">
                            <p class="timeline-card-description">{{ card.comment }}</p>
                        </div>
                    </div>
                    <div class="columns is-gapless is-marginless">
                        <div class="timeline-card-effectiveness-bar column is-8">
                            <progress class="progress is-small" v-bind:value="20 * card.rating" max="100"></progress>
                        </div>
                        <div class="column is-4">
                            <p class="timeline-card-effectiveness-label">{{ card.rating }} / 5 effective</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="timeline-card columns is-gapless" v-for="card in videoAnnotations" v-if="filterCanon === 'All'">
                <div class="column" @click="seekCard($event)">
                    <div class="columns is-gapless is-marginless">
                        <div class="column is-9">
                            <p class="timeline-card-title">{{ card.category }}</p>
                        </div>
                        <div class="column is-3">
                            <p class="timeline-card-time">{{ card.from }} - {{ card.to }}</p>
                        </div>
                    </div>
                    <div class="columns is-gapless is-marginless">
                        <div class="column">
                            <p class="timeline-card-description">{{ card.comment }}</p>
                        </div>
                    </div>
                    <div class="columns is-gapless is-marginless">
                        <div class="timeline-card-effectiveness-bar column is-8">
                            <progress class="progress is-small" v-bind:value="20 * card.rating" max="100"></progress>
                        </div>
                        <div class="column is-4">
                            <p class="timeline-card-effectiveness-label">{{ card.rating }} / 5 effective</p>
                        </div>
                    </div>
                </div>
            </div>

            <!--<div class="card" v-for="card in videoAnnotations" v-if="card.canon === filterCanon">
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
            <div class="card" v-for="card in videoAnnotations" v-if="filterCanon === 'All'">
                <div class="card-head" @click="seekCard($event)">
                    <span class="card-title"><strong>{{ card.title }}</strong></span>
                    <span class="card-time"> {{ card.from }} - {{ card.to }} </span>
                </div> 
                <span class="card-comment">{{ card.comment }} </span>
                <span>Canon: {{ card.canon }}</span>
                <span>Category: {{ card.category }}</span>
                <span>Title: {{ card.title }}</span>
                <span class="card-rating">{{ card.rating }}</span>
            </div> -->
            
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
                player: null,
                clickCoords: 0,
                videoDuration: 0,
                videoAnnotations: [],
                videoDurationMMSS: 0,
                videoCurrentTime: 0,
                videoCurrentTimeMMSS: 0,
                annotateMenuisShown: true,
                annotateCanon: 'Delivery',
                annotateCategory: 'Volume',
                annotateComment: '',
                annotateRating: 1,
                annotateFrom: null,
                annotateTo: null,
                isAnnotating: false,
                filterCanon: 'All',
                id: this.$route.params.id,
            }
        },
        created() {
            // loading
            // JSON call allAnnotations/video_id
        },
        mounted() {          
            var that = this

            this.id = parseInt(this.id)
            this.$store.commit('setCurrentVideoID', this.id)

            this.loadVideoAnnotations()

            this.videoDuration = this.videos[this.id].duration
            this.videoDurationMMSS = this.secondsToMMSS(this.videoDuration) 

            // Get the correct source of the video. 
            // The "sources" resource (vidSources) is an array that contains about 3-6 objects.
            // The last object = sourcesLength - 1 contains an m4a file, which we do not want.
            // So, we get the last object - 1 = sourcesLength - 2 
            var sourcesLength = this.videos[this.id].sources.length
            var correctSource = sourcesLength - 2

            this.player = jwplayer('player')            
            this.player.setup({
                file: this.videos[this.id].sources[correctSource].file,
                image: this.videos[this.id].thumb,
                "width": 860,
                "height": 460,
                // events
            });

            // Animate progress bar width
            this.player.on('time', function(event) {
                if (that.player.getState() === 'playing') {
                    var totalTime = that.videoDuration;
                    var currentTime = event.position;
                    var percentTime = (currentTime / totalTime) * 100;

                    // Get the current time of video in sec
                    that.videoCurrentTime = that.player.getPosition()
                    // Convert the time to MM:SS
                    that.videoCurrentTimeMMSS = that.secondsToMMSS(that.videoCurrentTime)

                    $('.player__ribbon').animate({ marginLeft: percentTime + "%" }, 150);

                    // If current video time == annotation.from, then animate card
                    // for(var i=0; i< that.videoAnnotations.length; i++) {
                    //     var currentAnnotationTime = that.videoAnnotations[i].from
                    //     currentAnnotationTime = that.mmssToSeconds(currentAnnotationTime)
                    //     if (parseInt(that.videoCurrentTime) === currentAnnotationTime) {
                    //         // compare dbComment with rendered card-comment
                    //         var dbComment = that.videoAnnotations[i].comment

                    //         $('.cards').find('.card').each(function(){
                    //             var htmlComment = $(this).find('.card-comment').text()
                    //             if (dbComment === htmlComment) {
                    //                $(this).animate({marginLeft: '50px'}, 800);
                    //             }
                    //         })

                    //         console.log('animate: ' + that.videoAnnotations[i].title)
                    //     }                        
                    // }
                }
            })

            // Create button inside JWPlayer, using their API.
            this.player.on('ready', function() {
                that.player.addButton(
                    "/static/add.png", 
                    "Add annotation", 
                    function() { that.annotating() }, 
                    "annomenu");
            })

            // If progress bar div is clicked, animate width  
            document.getElementById('progress').addEventListener('click', function (e) {
                var offset = this.getClientRects()[0];
                that.clickCoords = e.clientX - offset.left; 
                var clickCoordsPercent = ( that.clickCoords / $('.player__progress').width() ) * 100

                $('.player__ribbon').animate({ marginLeft: clickCoordsPercent + "%" }, 50);

                var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                console.log('Progress: ' + that.secondsToMMSS(clickTime));
                that.player.seek(clickTime)
            }, false);

            $(document).ready(function() {
                $('.timeline__clip').css('left', 0)
                $('.timeline__clip').css('width', 10)
                $('.timeline__end').css('left', 10)
            })

            $( ".timeline__start" ).draggable({
                // helper: function( event ) {
                //     return $( "<div class='ui-widget-header'>I'm a custom helper</div>" );
                // },
                axis: "x",
                cursor: "e-resize",
                start() {
                    console.log('Start')
                },
                drag() {
                },
                stop(event) {
                    var clickCoords = event.originalEvent.clientX - 172
                    console.log('start left = ' + clickCoords)                    
                    var clickCoordsPercent = ( clickCoords / $('.player__from-to').width() ) * 100
                    var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                    that.player.seek(clickTime)
                    clickTime = that.secondsToMMSS(clickTime)
                    console.log(clickTime)
                    that.annotateFrom = clickTime
                    $(document).ready(function() {
                        var clipLeft = $('.timeline__start').position().left
                        console.log(clipLeft)
                        var clipWidth = $('.timeline__end').position().left - $('.timeline__start').position().left
                        console.log(clipWidth)
                        $('.timeline__clip').css('left', clipLeft)
                        $('.timeline__clip').css('width', clipWidth)
                    })
                }
            })

            $( ".timeline__end").draggable({
                axis: "x",
                cursor: "e-resize",
                start() {
                    console.log('End')
                },
                drag() {
                },
                stop(event) {
                    var clickCoords = event.originalEvent.clientX - 172
                    console.log('end left = ' + clickCoords)
                    var clickCoordsPercent = ( clickCoords / $('.player__from-to').width() ) * 100
                    var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                    clickTime = that.secondsToMMSS(clickTime)
                    console.log(clickTime)
                    that.annotateTo = clickTime

                    $(document).ready(function() {
                        var clipLeft = $('.timeline__start').position().left
                        console.log(clipLeft)
                        var clipWidth = $('.timeline__end').position().left - $('.timeline__start').position().left
                        console.log(clipWidth)
                        $('.timeline__clip').css('left', clipLeft)
                        $('.timeline__clip').css('width', clipWidth)
                    })
                }
            })

            // this.player.setControls(false);

            // If from-to bar div is clicked, set from/to data
            // document.getElementById('from-to').addEventListener('click', function (e) {
            //     var offset = this.getClientRects()[0];
            //     that.clickCoords = e.clientX - offset.left; 
            //     var clickCoordsPercent = ( that.clickCoords / $('.player__from-to').width() ) * 100

            //     $('.timeline__start').animate({ marginLeft: clickCoordsPercent + "%" }, 50);

            //     var clickTime = (clickCoordsPercent * that.videoDuration) / 100
            //     that.player.seek(clickTime)
            //     clickTime = that.secondsToMMSS(clickTime)
            //     console.log('from: ' + clickTime)
            //     that.annotateFrom = clickTime
            // }, false);
        },
        methods: {
            goBack() {
                eventBus.navigateBack(this)
            },
            annotating() {
                this.isAnnotating = !this.isAnnotating
                if (this.isAnnotating === false) {
                    $(document).ready(function() {
                        // $('.player__ribbon').show()
                    })
                } else {
                    $(document).ready(function() {
                        // $('.player__ribbon').hide()
                    })
                }
            },
            // Fetches annotations of the current video (videoid = URLid)
            // Stores annotations in videoAnnotations[]
            loadVideoAnnotations() {
                for (var i=0; i < this.videos[this.id].annotations.length; ++i) {
                    this.videoAnnotations.push(this.videos[this.id].annotations[i])
                }
            },
            annotate() {
                for (var i=0; i <= this.videoAnnotations.length; i++) {
                    var card = { 
                        author: "Ben Domino",
                        canon: this.annotateCanon,
                        category: this.annotateCategory,
                        comment: this.annotateComment,
                        from: this.annotateFrom,
                        to: this.annotateTo, 
                        rating: this.annotateRating, 
                    }
                }
                this.videoAnnotations.push(card)
                this.$store.commit('ADD_ANNOTATION', {
                    annotation: card, 
                    id: this.id
                })

                // Reset default design states (no annotating)
                this.annotateComment = ''
                this.annotateFrom = null
                this.annotateTo = null
                this.annotateRating
                this.isAnnotating = false
                this.annotateMenuisShown = true
                $('.player__ribbon').show()
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
                this.annotateMenuisShown = false
            },
            seekCard(event) {
                var time = event.currentTarget.children[0].children[1].children[0].innerText // 03:05 - 03:17
                var startTime = time.substring(0,5); // 03:05
                var endTime = time.substring(8,13); // 03:17
                var totalTime = this.videoDuration;

                var a = startTime.split(':')
                var b = endTime.split(':')
                var startSec = (+a[0]) * 60 + (+a[1]) // in sec
                var endSec = (+b[0]) * 60 + (+b[1]) // in sec
                
                // Seek player according to annotateFrom var
                this.player.seek(startSec)

                // Move the timeline according to the annotateFrom & annotateTo vars
                // var startPercent = (startSec / totalTime) * 100;
                // var endPercent = (endSec / totalTime) * 100;
                // $('.timeline__start').animate({ marginLeft: startPercent + "%" }, 150);
                // $('.timeline__end').animate({ marginLeft: endPercent + "%" }, 150);
            },
            secondsToMMSS(s) {
                s = Number(s);

                var m = Math.floor(s % 3600 / 60);
                var s = Math.floor(s % 3600 % 60);

                return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
            },
            mmssToSeconds(timeMMSS) {
                var timeMMSS = timeMMSS.split(':')
                return (+timeMMSS[0]) * 60 + (+timeMMSS[1]) // in sec
            },
            showAnnotateMenu() {
                $('.annotate-menu').show()
            }
        },
        computed: {
            videos() {
                return this.$store.getters.videos
            },
            currentVideoID() {
                return this.$store.getters.currentVideoID
            },
            canons() {
                return this.$store.getters.canons
            }
        },
        updated() {
            var time = this.secondsToMMSS(this.videoCurrentTime)
            // this.annotateFrom = time
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
            //         var goToDrag = that.videoDuration/ ( 100 / getPercent )
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

            // showAnnoMenu() {
            //         $(document).ready(function() {
            //             var annotatePath = $('.annotate')
            //             $('#player').append(annotatePath)
            //             $('.annotate').css('display', 'inline')
            //         })
            // },
</script>

<style>

.timeline {
	height:100%;
	width: 100%;
	overflow: auto;
	padding: 15px !important;
}
	.timeline-card{
		padding: 15px !important;
		margin-bottom: 20px;
		box-shadow: 3px 3px 9px 0px rgba(0,0,0,0.33);
        cursor: pointer;
	}
		.timeline-card-title{
			font-size: 25px;
			font-style: bold;
		}
		.timeline-card-time{
			font-style: italic;
		}
		.timeline-card-description{
			
		}
		.timeline-card-effectiveness-bar{
			margin-top: 6px !important;
			padding-left: 10px !important;
			padding-right: 10px !important;
		}
		.timeline-card-effectiveness-label{
			
		}
/* ---------------- /STEFANOS ------------------*/


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
        height: 100px;
        border-radius: 0;
        background-color: #39425C;
        display: flex;
    }
        .player__ribbon {
            position: absolute;
            height: 80%;/*90px;*/
            margin: 0;
            z-index: 999;
            display: flex;
            flex-direction: column;
            align-self: center;
        }
            .player__ribbon-circle {
                width: 20px;
                height: 20px;
                border-radius: 2px; /*50%;*/
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


    .player__from-to {
        position: relative;
        border-radius: 0;
        background-color: #39425C;
        display: flex;
        height: 50px;
        border-bottom: 2px solid #FFF;
    }
        .timeline__start {
            width: 3px;
            margin: 0;
            padding: 0;
            z-index: 100;
            height: 100%;
            cursor: e-resize;
            align-self: center;
            position: absolute;
            background-color: #E0E0E0;
        }
        .timeline__clip {
            width: 100px;
            background-color: red;
            position: relative;
        }
        .timeline__end {
            width: 3px;
            margin: 0;
            padding: 0;
            z-index: 100;            
            height: 100%;
            cursor: e-resize;
            align-self: center;
            position: absolute;
            background-color: #E0E0E0;
        }

        
    .annotate-btn {
      padding: 7px;
      color: #fff;
      cursor: pointer;
      pointer-events: all;
      background-color: #A90931;
      display: flex;
      justify-content: flex-end;
    }

    .annotate-menu__canons {
        display: flex;
        justify-content: center;
    }

        .annotate-menu__canons a {
            color: #0a0a0a;
            padding: 5px;
        }

        .annotate-menu__canons-close {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
        }
            .annotate-menu__canons-close span {
                width: 50px;
                color: #39425C;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .annotate-menu__canons-close span:hover {
                color: #FFF;
                background-color: #39425C;
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
            .el-slider { width: 80%}
            .el-slider__bar, .el-slider__button-wrapper, .el-slider__stop { height: 40px !important; }
            .el-slider__stop { border-radius: 0 !important;}

            .el-slider__runway { height: 40px !important;}


    .annotate-fields {
        display: flex;
    }

        .annotate-fields-left {
            width: 10%;
        }

        .annotate-fields-right {
            width: 90%;
        }
            .annotate-desc {
                display: flex;
            }

            .annotate-effectiveness {
                display: flex;
            }
                .annotate-effectiveness p {
                    width: 15%
                }
            
            .annotate-comment {
                display: flex;   
            }
                .annotate-comment label {
                    width: 15%;
                }

                .annotate-comment p {
                    width: 80%;
                }

            .annotate-drag {
                display: flex;
                justify-content: space-between;
                padding-left: 115px;
            }
                .annotate-drag-inputs {
                    display: flex;
                }
                    .annotate-drag-inputs input {
                        width: 100px;
                        margin-right: 5px;
                    }

                .annotate-submit {
                    display: flex;
                    justify-content: flex-end;
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
            /*display: none !important;*/
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
                margin-top: 40% !important;
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