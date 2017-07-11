<template>
    <div class="video container">

        <div class="player">
            <button class="button is-white" @click="goBack()">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>{{videos[id].title}}
            </button>     
            
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
                        <button class="button is-black" @click="annotateMenuisShown = true">
                            <i aria-hidden="true" class="fa fa-chevron-left"></i>Back
                        </button>
                    </div>
                    
                    <div class="annotate-fields-right">
                        <div class="annotate-desc field" v-for="canon in canons" v-if="canon.name === annotateCanon">
                            <p class="control" v-for="cat in canon.categories" v-if="cat.name === annotateCategory">"{{ cat.desc }}"</p>
                            <div class="annotate-menu__canons-close"><span @click="isAnnotating = false">X</span></div>
                        </div>
                        <div class="annotate-effectiveness field">
                             <label class="label">Set effectiveness:</label>
                            <el-slider v-model="annotateRating" :step="1" :min="0" :max="5" 
                                       show-stops 
                                       show-tooltip class="annotate-effectiveness-slider">
                            </el-slider>
                        </div>
                        <div class="annotate-comment field">
                            <label class="label">Comment:</label>
                            <p class="control">
                                <textarea class="textarea" placeholder="It is always a good idea to include strategy hint..." 
                                          v-model="annotateComment">
                                </textarea>
                            </p>
                            <div class="annotate-submit">
                                <button class="button" @click="annotate()">Annotate</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="times" v-show="isAnnotating">
                <!-- <span v-for="min in times" class="times-min" v-bind:style="{ marginLeft: min.marginleft }"></span> -->
                <span class="times-min" v-for="t in 10"></span>
                <!-- <span class="times-sec" v-for="t in 10"></span> -->
            </div>

            <div class="videoline" v-show="isAnnotating">
                <span class="videoline__now-time">{{ videoCurrentTimeMMSS }}</span>

                <div class="videoline-ribbon" draggable="true" > <!-- v-show="!isAnnotating" -->
                    <span class="videoline-ribbon-circle"></span>
                    <span class="videoline-ribbon-line">
                        <p class="videoline-ribbon-line-time">{{ videoCurrentTimeMMSS }}</p>
                    </span>
                </div>

                <div class="crop videoline-crop" id="videoline-crop" >
                    <div class="crop__corner crop__start" draggable="true">
                        <div class="crop__grab" style="margin-left: -15px;">
                            <span>|||</span>
                        </div>
                        <p class="crop__time-label">{{ startDragTime }}</p>
                    </div>
                    <div class="crop__corner crop__end" draggable="true">
                        <div class="crop__grab">
                            <span>|||</span>
                        </div>
                        <p class="crop__time-label">{{ endDragTime }}</p>
                    </div>
                    <span class="crop__space"></span>
                </div>
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
                timeNow: 0,
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
                startDragTime: 0,
                endDragTime: 0,
                filterCanon: 'All',
                times: [
                    { marginleft: '10%' },
                    { marginleft: '20%' },
                    { marginleft: '30%' },
                    { marginleft: '40%' },
                    { marginleft: '50%' },
                ],
                id: this.$route.params.id,
            }
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

                    // $('.videoline-ribbon').animate({ left: percentTime + "%" }, 150);
                    
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

            // DRAGGABLE RIBBON
            $( ".videoline-ribbon" ).draggable({
                axis: "x",
                start() {
                    that.player.pause()
                },
                drag(event) {
                    var windowOffset = $('.videoline').offset().left

                    var clickCoords = event.originalEvent.clientX - windowOffset; 
                    var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                    var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                    console.log('Progress: ' + that.secondsToMMSS(clickTime));
                    that.player.seek(clickTime)
                    that.timeNow = that.videoCurrentTime
                },
                stop(event) {
                }
            })

            // this.player.setControls(false);
        },
        methods: {
            annotating() {
                var that = this
                this.isAnnotating = !this.isAnnotating

                this.player.pause()
                
                // setStartEndPosition()
                var annotationNowTime = this.videoCurrentTime - 10 // 10 seconds before pause
                var barWidth = 860 //$('.videoline-crop').width()

                var coordsPercentStart = (annotationNowTime  * 100) / that.videoDuration
                var coordsStart = (coordsPercentStart * barWidth) / 100
                var coordsPercentEnd = ((annotationNowTime + 15)  * 100) / that.videoDuration
                var coordsEnd = (coordsPercentEnd * barWidth) / 100

                $('.crop__start').css('left', coordsStart)
                $('.crop__end').css('left', coordsEnd)
                $('.crop__space').css('left', coordsStart)
                $('.crop__space').css('width', coordsEnd - coordsStart)

                this.startDragTime = this.secondsToMMSS(annotationNowTime)
                this.endDragTime = this.secondsToMMSS(annotationNowTime + 10)
                this.annotateFrom = this.startDragTime
                this.annotateTo = this.endDragTime

                // START
                $( ".crop__start" ).draggable({
                    cursor: "col-resize",
                    axis: "x",
                    drag(event) {
                        var windowOffset = $('.videoline').offset().left
                        var clickCoords = event.originalEvent.clientX - windowOffset
                        var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                        var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                        that.player.seek(clickTime)

                        var clipLeft = $('.crop__start').position().left
                        var clipWidth = $('.crop__end').position().left - $('.crop__start').position().left
                        $('.crop__space').css('left', clipLeft)
                        $('.crop__space').css('width', clipWidth)
                        clickTime = that.secondsToMMSS(clickTime)
                        that.startDragTime = clickTime
                    },
                    stop(event) {
                        var windowOffset = $('.videoline').offset().left
                        var clickCoords = event.originalEvent.clientX - windowOffset
                        var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                        var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                        clickTime = that.secondsToMMSS(clickTime)
                        that.annotateFrom = clickTime
                    }
                })

                // END
                $( ".crop__end").draggable({
                    cursor: "col-resize",
                    axis: "x",
                    drag(event) {
                        var windowOffset = $('.videoline').offset().left
                        var clickCoords = event.originalEvent.clientX - windowOffset
                        var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                        var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                        that.player.seek(clickTime)
                        var clipLeft = $('.crop__start').position().left
                        var clipWidth = $('.crop__end').position().left - $('.crop__start').position().left
                        $('.crop__space').css('left', clipLeft)
                        $('.crop__space').css('width', clipWidth)
                        clickTime = that.secondsToMMSS(clickTime)
                        that.endDragTime = clickTime
                    },
                    stop(event) {
                        var windowOffset = $('.videoline').offset().left
                        var clickCoords = event.originalEvent.clientX - windowOffset
                        var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                        var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                        clickTime = that.secondsToMMSS(clickTime)
                        that.annotateFrom = clickTime
                    }
                })

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
                // $('.videoline-ribbon').show()
            },
            loadVideoAnnotations() {
                // Fetches annotations of the current video (videoid = URLid)
                // Stores annotations in videoAnnotations[]
                for (var i=0; i < this.videos[this.id].annotations.length; ++i) {
                    this.videoAnnotations.push(this.videos[this.id].annotations[i])
                }
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
                // $('.crop__start').animate({ marginLeft: startPercent + "%" }, 150);
                // $('.crop__end').animate({ marginLeft: endPercent + "%" }, 150);
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
            },
            goBack() {
                eventBus.navigateBack(this)
            },
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
        }
    }
    // goCurrentRibbon() {
            //     var that = this

            //     $(document).ready(function(){
            //         var getWidth = $('.videoline-ribbon').css('margin-left') 
            //         var getWidthParent =  $('.videoline').width()
            //         var getPercent = parseInt(parseFloat(getWidth) / getWidthParent * 100)

            //         console.log(getPercent)
                    
            //         console.log("goto")
            //         var goToDrag = that.videoDuration/ ( 100 / getPercent )
            //         that.player.seek(goToDrag);
            //     });

            // <div class="videoline">
            //     <span class="videoline-ribbon" @click="goCurrentRibbon()"></span>
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

            
            // If from-to bar div is clicked, set from/to data
            // document.getElementById('videoline-crop').addEventListener('click', function (e) {
            //     var offset = this.getClientRects()[0];
            //     that.clickCoords = e.clientX - offset.left; 
            //     var clickCoordsPercent = ( that.clickCoords / $('.videoline-crop').width() ) * 100

            //     $('.crop__start').animate({ marginLeft: clickCoordsPercent + "%" }, 50);

            //     var clickTime = (clickCoordsPercent * that.videoDuration) / 100
            //     that.player.seek(clickTime)
            //     clickTime = that.secondsToMMSS(clickTime)
            //     console.log('from: ' + clickTime)
            //     that.annotateFrom = clickTime
            // }, false);
</script>

<style>

/* ==============================================
                #GENERIC
================================================= */

.structure, .delivery, .visual, .style, .moves {
    background-color: #39425C
}

.video {
    padding: 0;
    padding-top: 25px;
    display: flex; 
}

/* ==============================================
                #PROGRESS BAR
================================================= */

    .player {
    }

    .videoline {
        position: relative;
        height: 100px;
        border-top: 1px solid #fff;
        border-radius: 0;
        background-color: #39425C;
        display: flex;
    }
    .videoline__now-time {
        color: #fff;
        margin-top: 10px;
    }

        .videoline-ribbon {
            position: absolute;
            height: 130px;
            left: 0;
            margin: 0;
            padding: 0;
            cursor: pointer;
            z-index: 200;
            display: flex;
            flex-direction: column;
            align-self: center;
        }
            .videoline-ribbon-circle {
                width: 20px;
                height: 20px;
                border-radius: 50%; /*1px;*/
                border: 3px solid #FFF;
                background-color: #C53B3B;
                display: flex;
                justify-content: center;
            }
            .videoline-ribbon-line {
                width: 1px;
                height: 100%;
                background-color: #fff;
                margin-left: 0;
                align-self: center;
            }
                .videoline-ribbon-line-time {
                    color: #FFF;
                    font-size: 12px;
                    margin: 20px 0px 0px 5px;
                }

/*------------------------------------*\
  #DRAG N' DROP CROP
\*------------------------------------*/
.videoline-crop {
    /*position: relative;
    border-radius: 0;
    background-color: #39425C;
    display: flex;
    border-bottom: 1px solid #FFF;*/
}
    .crop__corner {
        width: 1px;
        margin: 0;
        padding: 0;
        z-index: 100;
        height: 100%; /* of 130px */
        /*margin-top: 30px;*/
        background-color: #F2C94C;
        cursor: col-resize;
        position: absolute;
        border-radius: 3px;
        display: flex;
        flex-direction: row;
        align-items: center;
        align-self: center;
    }
        .crop__grab {
            padding: 15px 3px;
            border-radius: 2px;
            background-color: #F2C94C;
        }
        .crop__time-label {
            color: #fff;
            z-index: 200;
            font-size: 12px;
        }

            .crop__start .crop__time-label { 
                margin-left: -50px;
            }
        

    .crop__space {
        z-index: 99;
        position: absolute;
        border-radius: 3px;
        border: 2px solid #F2C94C;
        height: 100%; /* of 100px */
        background-color: #7A7F8D;
    }

    .crop__start {

    }
    .crop__end {

    }

    .times {
        height: 30px;
        background-color: #39425C;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
        .times-min {
            width: 1px;
            height: 70%;
            background-color: #FFF;
            border-right: 1px solid #FFF;
        }
        .times-sec {
            width: 1px;
            height: 40%;
            background-color: #FFF;
            border-right: 1px solid #FFF;
        }

/* ==============================================
                #ANNOTATE FIELDS
================================================= */
        
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
        background-color: #39425C;
    }
    
    .annotate-fields p,
    .annotate-fields label {
        color: #fff;
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
                margin-bottom: 10px;
            }
                .annotate-comment label {
                    width: 15%;
                }
                .annotate-comment p {
                    width: 80%;
                }
                .annotate-comment textarea {
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
                    align-items: center;
                }
                    .annotate-submit button {
                        height: 100%;
                    }


/* ==============================================
                    #CARDS
================================================= */

.cards {
    width: 40%;
    padding-top: 26px;
    display: flex;
    flex-direction: column;
}

    .card-menu {
        display: flex;
    }

        .card-menu a {
            color: #0a0a0a;
            padding: 15px;
        }

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





/* ==============================================
                #JWPLAYER TRUMPS
================================================= */

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
        
</style>