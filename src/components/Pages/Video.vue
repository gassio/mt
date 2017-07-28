<template>
    <div class="video container">
        <div class="spacer">
            <button class="button is-white player-spacer-button" @click="goBack()">
                <i class="fa fa-chevron-left" aria-hidden="true"></i> &nbsp {{ videos[id].title }}
            </button> 
             <button class="button is-white player-spacer-button">
                <i class="fa fa-bar-chart fa-2x" aria-hidden="true"></i>&nbsp See Grades
            </button> 
        </div>
        <div class="main-content columns is-gapless is-marginless">
            <div class="player column is-8">
                <div id="player">Loading the player...</div>

                <div class="times" v-show="isVideoline">
                    <!-- <span v-for="min in times" class="times-min" v-bind:style="{ marginLeft: min.marginleft }"></span> -->
                    <!-- v-for="t in 10"  style="color: #fff; font-size: 8px;"-->
                    <span class="times-min" v-for="time in times">{{ time.min }}</span> <!-- <span class="times-sec"></span><span class="times-sec"></span> -->
                </div>

                <div class="videoline" id="videoline" v-show="isVideoline">
                    <!--<span class="videoline__now-time">{{ videoCurrentTimeMMSS }}</span>-->

                    <div class="videoline-ribbon" draggable="true" v-show="false">
                        <span class="videoline-ribbon-circle"></span>
                        <span class="videoline-ribbon-line">
                            <p class="videoline-ribbon-line-time">{{ videoCurrentTimeMMSS }}</p>
                        </span>
                    </div>

                    <div class="crop videoline-crop" id="videoline-crop" >
                        <div class="crop__corner crop__start" draggable="true">
                            <span>|||</span>
                            <!--<span>&nbsp;</span>-->
                            <!--<div class="crop__grab" style="margin-left: -10px"> 
                                <span>||</span>
                            </div>-->
                            <p class="crop__time-label">{{ startDragTime }}</p>
                        </div>
                        <div class="crop__corner crop__end" draggable="true">
                            <span>|||</span>
                            <!--<div class="crop__grab">
                                <span>||</span>
                            </div> -->
                            <p class="crop__time-label">{{ endDragTime }}</p>
                        </div>
                        <span class="crop__space"></span>
                    </div>

                    <div class="videoline-progress" v-show="false">
                    </div>
                </div>

                <div class="annotate" v-show="isAnnotating">
                    <div class="annotate-menu" v-show="isAnnotateMenu">
                        <nav class="annotate-menu__canons">
                            <a @click="chooseCanonAnnotate(c.name, $event)" v-for="c in canons">{{ c.name }}</a>
                            <div class="annotate-menu__canons-close"><span @click="isAnnotating = false; isAnnotateMenu = false">X</span></div>
                        </nav>
                        <nav class="annotate-menu__categories" v-for="canon in canons" v-if="canon.name === annotateCanon">
                            <a v-for="cat in canon.categories" @click="chooseCategoryAnnotate(cat.name)" v-bind:title="cat.desc">{{ cat.name }}</a>  
                        </nav>
                    </div>
                    <div class="annotate-fields annotate-annotating" v-show="isAnnotateFields">
                        <div class="annotate-fields-left">
                            <button class="button annotate-fields-left-back" @click="isAnnotateFields = false; isVideoline = false; isAnnotateMenu = true;">
                                <i aria-hidden="true" class="fa fa-chevron-left"></i>Back
                            </button>
                        </div>
                        
                        <div class="annotate-fields-right">
                            <div class="annotate-desc field" v-for="canon in canons" v-if="canon.name === annotateCanon">
                                <p class="annotate-desc-text" v-for="cat in canon.categories" v-if="cat.name === annotateCategory">"{{ cat.desc }}"</p>
                                <div class="annotate-menu__canons-close"><span @click="isAnnotating = false; isAnnotateFields = false; isVideoline = false">X</span></div>
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
                                
                            </div>
                            <div class="annotate-submit">
                                <button class="button" @click="annotate()">Annotate</button>
                            </div>
                        </div>
                        
                    </div>


                </div>

                <div class="edit" v-show="isEditing">
                    <!-- FUTURE
                        <div class="annotate-menu" v-show="isEditMenu">
                            <nav class="annotate-menu__canons">
                                <a @click="chooseCanonAnnotate(c.name, $event)" v-for="c in canons">{{ c.name }}</a>
                                <div class="annotate-menu__canons-close"><span @click="isEditing = false">X</span></div>
                            </nav>
                            <nav class="annotate-menu__categories" v-for="canon in canons" v-if="canon.name === annotateCanon">
                                <a v-for="cat in canon.categories" @click="chooseCategoryAnnotate(cat.name)" v-bind:title="cat.desc">{{ cat.name }}</a>  
                            </nav>
                        </div> 
                    -->
                    <div class="annotate-fields" v-show="isEditFields">
                        <!-- FUTURE
                            <div class="annotate-fields-left">
                                <button class="button is-black" @click="isEditMenu = true; isEditFields = false; isVideoline = false">
                                    <i aria-hidden="true" class="fa fa-chevron-left"></i>Back
                                </button>
                            </div>
                        -->
                        <div class="annotate-fields-right">
                            <div class="annotate-desc field" v-for="canon in canons" v-if="canon.name === annotateCanon">
                                <p class="control" v-for="cat in canon.categories" v-if="cat.name === annotateCategory">"{{ cat.desc }}"</p>
                                <div class="annotate-menu__canons-close"><span @click="isEditing = false; isVideoline = false; isEditFields = false">X</span></div>
                            </div>
                            <div class="annotate-effectiveness field">
                                <label class="label">Set effectiveness:</label>
                                <el-slider v-model="editRating" :step="1" :min="0" :max="5" 
                                        show-stops 
                                        show-tooltip class="annotate-effectiveness-slider">
                                </el-slider>
                            </div>
                            <div class="annotate-comment field">
                                <label class="label">Comment:</label>
                                <p class="control">
                                    <textarea class="textarea" placeholder="It is always a good idea to include strategy hint..." 
                                            v-model="editComment">
                                    </textarea>
                                </p>
                                <div class="annotate-submit">
                                    <button class="button" @click="edit()">Edit</button>
                                </div>
                            </div>
                            <input type="text" v-model="editStart">
                            <input type="text" v-model="editEnd">
                        </div>
                    </div>
                </div>

                <div class="add-annotation-area" @click="annotating()" v-show="!isAnnotating">
                    <i class="fa fa-plus fa_1_5x" aria-hidden="true"></i><span>Add annotation</span>
                </div>

            </div>

            <div class="cards column is-4 is-gapless is-marginless" id="cards">
                <div class="cards-content columns is-gapless is-marginless">
                    <nav class="card-menu column is-2">
                        <a class="card-menu-link" @click="chooseCanonFilter($event, 'Moves')"><i class="fa fa-pencil-square-o fa_1_5x" aria-hidden="true"></i><span>Moves</span></a>
                        <a class="card-menu-link" @click="chooseCanonFilter($event, 'Structure')"><i class="fa fa-book fa_1_5x " aria-hidden="true"></i><span>Structure</span></a>
                        <a class="card-menu-link" @click="chooseCanonFilter($event, 'Delivery')"><i class="fa fa-commenting fa_1_5x " aria-hidden="true"></i><span>Delivery</span></a>
                        <a class="card-menu-link" @click="chooseCanonFilter($event, 'Visual')"><i class="fa fa-eye fa_1_5x " aria-hidden="true"></i><span>Visual</span></a>
                        <a class="card-menu-link" @click="chooseCanonFilter($event, 'Style')"><i class="fa fa-diamond fa_1_5x " aria-hidden="true"></i><span>Style</span></a>
                        <a class="card-menu-link" @click="chooseCanonFilter($event, 'All')"><i class="fa fa-cicle fa_1_5x " aria-hidden="true"></i><span>All</span></a>
                        <div id="more-annotations" class="more-annotations">
                            Scroll
                            <div class="scroll-mouse">
                                <i class="scroll-wheel fa fa-circle" aria-hidden="true"></i>
                            </div>
                        </div>
                    </nav>
                    <div class="timeline-content column is-10"> <!-- v-if="filterCanon === 'All'" -->
                        <div class="timeline-content-current-video-time"><span>{{ secondsToMMSS(videoCurrentTime) }}</span></div>

                        <!-- v-show="isAll === ''" -->
                        <div class="timeline-card columns is-gapless" v-for="card in videoAnnotations" 
                             v-if="card.canon === isMoves || card.canon === isStructure || card.canon === isDelivery || card.canon === isVisual || card.canon === isStyle"> 
                            <div class="column" @click="seekCard($event)">
                                <div class="columns is-gapless is-marginless">
                                    <div class="column is-8">
                                        <p class="timeline-card-title">{{ card.category }}</p>  <!-- {{ card.id }} -->
                                    </div>
                                    <div class="column is-4">
                                        <p class="timeline-card-time">{{ card.from }} - {{ card.to }} <span class="timeline-card-id">{{ card.id }}</span></p>
                                    </div>
                                </div>
                                <div class="columns is-gapless is-marginless">
                                    <div class="column">
                                        <p class="timeline-card-description">{{ card.comment }}</p>
                                    </div>
                                </div>
                                <div class="columns is-gapless is-marginless">
                                    <div class="timeline-card-effectiveness-bar column is-8">
                                        <progress class="progress is-small is-info" v-bind:value="20 * card.rating" max="100"></progress>
                                    </div>
                                    <div class="column is-4">
                                        <p class="timeline-card-effectiveness-label">{{ card.rating }} / 5 effective</p>
                                    </div>
                                </div>
                                <div class="columns is-gapless is-marginless">
                                    <p class="timeline-card-author">by {{ card.author }}</p>
                                </div>
                            </div>
                            <div class="timeline-card-edit">
                                <button class="edit-buttons-moreLess button" @click="toggleEditDelete($event)"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                <button class="edit-buttons edit-buttons-edit button" @click="editing($event)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></button>
                                <button class="edit-buttons edit-buttons-delete button" @click="deleteAnnotation($event)"><i class="fa fa-trash-o fa-1x" aria-hidden="true"></i></button>
                            </div>
                        </div>

                        <!--< <div v-show="isAll === 'All'" class="all-card columns is-gapless" v-for="card in videoAnnotations"> 
                        ALL
                            <div class="column" @click="seekCard($event)">
                                <div class="columns is-gapless is-marginless">
                                    <div class="column is-8">
                                        <p class="timeline-card-title">{{ card.category }}</p>
                                    </div>
                                    <div class="column is-4">
                                        <p class="timeline-card-time">{{ card.from }} - {{ card.to }} <span class="timeline-card-id">{{ card.id }}</span></p>
                                    </div>
                                </div>
                                <div class="columns is-gapless is-marginless">
                                    <div class="column">
                                        <p class="timeline-card-description">{{ card.comment }}</p>
                                    </div>
                                </div>
                                <div class="columns is-gapless is-marginless">
                                    <div class="timeline-card-effectiveness-bar column is-8">
                                        <progress class="progress is-small is-info" v-bind:value="20 * card.rating" max="100"></progress>
                                    </div>
                                    <div class="column is-4">
                                        <p class="timeline-card-effectiveness-label">{{ card.rating }} / 5 effective</p>
                                    </div>
                                </div>
                                <div class="columns is-gapless is-marginless">
                                    <p class="timeline-card-author">by {{ card.author }}</p>
                                </div>
                            </div>
                            <div class="timeline-card-edit">
                                <button class="edit-buttons-moreLess button" @click="toggleEditDelete($event)"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                <button class="edit-buttons edit-buttons-edit button" @click="editing($event)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></button>
                                <button class="edit-buttons edit-buttons-delete button" @click="deleteAnnotation($event)"><i class="fa fa-trash-o fa-1x" aria-hidden="true"></i></button>
                            </div>
                        </div> -->
                    </div>
            </div>
        </div>
            <!-- <router-link :to=" '/video/' + id + '/edit' ">d
                <button class="button is-warning">Edit</button>d
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
                annotateCanon: 'Delivery',
                annotateCategory: 'Volume',
                annotateRating: 1,
                annotateComment: '',
                annotateStart: null,
                annotateEnd: null,
                editRating: null,
                editComment: '',
                editStart: null,
                editEnd: null,
                editingCard: null,
                isAnnotating: false,
                isAnnotateMenu: false,
                isAnnotateFields: false,
                isVideoline: false,
                isEditing: false,
                isEditMenu: false,
                isEditFields: false,
                isDragging: false,
                startDragTime: 0,
                endDragTime: 0,
                filterCanon: 'All',
                isMoves: 'Moves',
                isStructure: 'Structure',
                isDelivery: 'Delivery',
                isVisual: 'Visual',
                isStyle: 'Style',
                isAll: '',
                times: [],
                toggleCardEditButton: false,
                dragEndIsMoving: false,
                annotationPauseTime: 0,
                id: this.$route.params.id,
            }
        },
        mounted() {          
            var that = this

            this.id = parseInt(this.id)
            
            this.$store.commit('setCurrentVideoID', this.id)
            
            this.videoDuration = this.videos[this.id].duration
            this.videoDurationMMSS = this.secondsToMMSS(this.videoDuration) 
            
            // Change the color and background of All in cards menu so that it looks active
            // var allButton = document.getElementById("all-is-active")
            // allButton.style.background = "#8F082A";
            // allButton.style.color = "#FFFFFF";
            $('.card-menu a').css('background-color', '#39425C')
            $('.card-menu a').css('color', '#FFF')
            

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
                "height": $('.player').height(),
                // events
            });
        
            // Animate progress bar width
            this.player.on('time', function(event) {
                if (that.player.getState() === 'playing') {
                    var totalTime = that.videoDuration;
                    var currentTime = event.position;

                    // Get the current time of video in sec
                    that.videoCurrentTime = that.player.getPosition()
                    // Convert the time to MM:SS
                    that.videoCurrentTimeMMSS = that.secondsToMMSS(that.videoCurrentTime)

                    // Scaling = 3 minutes 
                    var percentTime = (currentTime / 180) * 100;

                    $('.videoline-ribbon').animate({ left: percentTime + "%" }, 50);

                }
            })

            this.player.on('time', function(event) {
                // Color a card when videoCurrentTime is between card from and end
                that.hooping()
            })

            // DRAGGABLE RIBBON
            $( ".videoline-ribbon" ).draggable({
                axis: "x",
                containment: "#videoline",
                scroll: false,
                start() {

                },
                drag(event) {
                    var windowOffset = $('.videoline').offset().left
                    
                    var clickCoords = event.originalEvent.clientX - windowOffset; 
                    var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100

                    if (clickCoordsPercent < 0) {
                        clickCoordsPercent = 0
                    } else if (clickCoordsPercent > 100) {
                        clickCoordsPercent = 100
                    }
                   
                    // Scaling = 3 minutes 
                    var clickTime = (clickCoordsPercent * 180) / 100
                    
                    if (that.annotationPauseTime < 90) {
                        clickTime = clickTime // + that.annotationPauseTime
                    } else { 
                        clickTime = clickTime + that.annotationPauseTime - 90
                    }

                    that.player.seek(clickTime)      
                },
                stop(event) {
                }
            })

            // this.player.setControls(false);
        },
        updated() {
            // Fixes unknown man picture bug
            $('.jw-logo').hide()

            // Fetches annotations of the current video (videoid = URLid)
            // Stores annotations in videoAnnotations[]
            this.videoAnnotations = this.$store.state.videos[this.id].annotations
            
            // Show "Sroll down for more" when there are more than 5 cards
            this.moreAnnotations()
        },
        methods: {
            annotating() {
                var that = this

                this.isAnnotating = true
                this.isAnnotateMenu = true
                this.annotateRating = null
                this.annotateComment = ''
                this.player.pause()

                this.annotationPauseTime = this.player.getPosition();
                
                // Set times array
                this.setTimes()

                // setStartEndPosition()
                var annotationNowTime = this.videoCurrentTime - 5 // 5 seconds before pause
                var barWidth = $('.player').width() 

               // "out of bounds" exception
                if (this.annotationPauseTime < 0) 
                    annotationNowTime = 0

                var coordsPercentStart = (annotationNowTime * 100) / parseInt(that.videoDuration)
                // 10 seconds after "start"
                var coordsPercentEnd = ((annotationNowTime + 10)  * 100) / parseInt(that.videoDuration)
                if (coordsPercentEnd > 100) 
                    coordsPercentEnd = 100

                // var coordsStart = (coordsPercentStart * barWidth) / 100
                // var coordsEnd = (coordsPercentEnd * barWidth) / 100
                var middleCoords = barWidth / 2
                var coordsStart = middleCoords - 10
                var coordsEnd = middleCoords + 10
                console.log('Coords start: ' + coordsStart)
                console.log('Coords end: ' + coordsEnd)

                $('.crop__start').css('left', coordsStart)

                $('.crop__start').css('left', coordsStart)
                $('.crop__end').css('left', coordsEnd)
                $('.crop__space').css('left', coordsStart)
                $('.crop__space').css('width', coordsEnd - coordsStart)

                this.annotateStart = this.secondsToMMSS(this.annotationPauseTime - 5)
                this.annotateEnd = this.secondsToMMSS(this.annotationPauseTime + 5)

                this.startDragTime = this.secondsToMMSS(this.annotationPauseTime - 5)
                this.endDragTime = this.secondsToMMSS(this.annotationPauseTime + 5)

                // "out of bounds" exception
                if ((that.videoDuration - annotationNowTime) < 90) {
                    this.startDragTime = this.secondsToMMSS(annotationNowTime)
                    this.endDragTime = this.secondsToMMSS(this.videoDuration)
                } 

    
                // START
                $( ".crop__start" ).draggable({
                    cursor: "col-resize",
                    axis: "x",
                    containment: "#videoline",
                    scroll: false,
                    revert: false,
                    start(){
                         that.isDragging = true
                    },
                    drag(event) {
                        var revert = $( ".crop__start" ).draggable( "option", "revert" );
                        var cropWidth = $('.crop__end').position().left - $('.crop__start').position().left
                        if (cropWidth < 0) {
                            $( ".crop__start" ).draggable( "option", "revert", true );
                        } else {
                            $( ".crop__start" ).draggable( "option", "revert", false );
                            that.isDragging = true
                            var clickCoords = $('.crop__start').position().left
                            var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100

                            var clipLeft = $('.crop__start').position().left
                            var clipWidth = $('.crop__end').position().left - $('.crop__start').position().left
                            $('.crop__space').css('left', clipLeft)
                            $('.crop__space').css('width', clipWidth)

                            // "out of bounds" exception
                            if (clickCoords < 0) {
                                clickCoords = 0
                            } else if (clickCoords > barWidth) { 
                                clickCoords = barWidth
                            }
                            var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                            // 3 minutes scaling
                            var clickTime = (clickCoordsPercent * 180) / 100

                            if (that.annotationPauseTime < 90)
                                var targetTime = clickTime
                            else
                                var targetTime = clickTime + that.annotationPauseTime - 90
                            // Third scenario remaining (that.videoDuration - that.annotationPauseTime) < 90

                            that.player.seek(targetTime)
                            targetTime = that.secondsToMMSS(targetTime)
                            that.annotateStart = targetTime
                            that.startDragTime = targetTime
                        }
                    },
                    stop(event) {
                        that.isDragging = false
                        //var windowOffset = $('.videoline').offset().left
                        var clickCoords = $('.crop__start').position().left
                        // "out of bounds" exception
                        if (clickCoords < 0) {
                            clickCoords = 0
                        } else if (clickCoords > barWidth) { 
                            clickCoords = barWidth
                        }
                        var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                        // 3 minutes scaling
                        var clickTime = (clickCoordsPercent * 180) / 100

                        if (that.annotationPauseTime < 90)
                            var targetTime = clickTime
                        else
                            var targetTime = clickTime + that.annotationPauseTime - 90

                        that.player.seek(targetTime)
                        targetTime = that.secondsToMMSS(targetTime)
                        that.annotateStart = targetTime
                        that.startDragTime = targetTime
                        
                        //In case that cropWidth < 0, the crop__space should be drawn again
                        var clipLeft = $('.crop__start').position().left
                        var clipWidth = $('.crop__end').position().left - $('.crop__start').position().left
                        $('.crop__space').css('left', clipLeft)
                        $('.crop__space').css('width', clipWidth)
                        clickTime = that.secondsToMMSS(clickTime)
                    }
                })

                // END
                $( ".crop__end").draggable({
                    cursor: "col-resize",
                    axis: "x",
                    containment: "#videoline",
                    scroll: false,
                    revert: false,
                    start() {
                        that.isDragging = false
                    },
                    drag(event) {
                        var revert = $( ".crop__end" ).draggable( "option", "revert" );
                        var cropWidth = $('.crop__end').position().left - $('.crop__start').position().left
                        if(cropWidth < 0) {
                            $( ".crop__end" ).draggable( "option", "revert", true );
                        } else {
                            $( ".crop__end" ).draggable( "option", "revert", false );
                            that.isDragging = false
                            // var windowOffset = $('.videoline').offset().left
                            var clickCoords = $('.crop__end').position().left
                            var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                            // var clickTime = (clickCoordsPercent * that.videoDuration) / 100
                            // that.player.seek(clickTime)
                            var clipLeft = $('.crop__start').position().left
                            var clipWidth = $('.crop__end').position().left - $('.crop__start').position().left
                            $('.crop__space').css('left', clipLeft)
                            $('.crop__space').css('width', clipWidth)
                            // clickTime = that.secondsToMMSS(clickTime)

                            // "out of bounds" exception
                            if (clickCoords < 0) {
                                clickCoords = 0
                            } else if (clickCoords > barWidth) { 
                                clickCoords = barWidth
                            }
                            var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                            // 3 minutes scaling
                            var clickTime = (clickCoordsPercent * 180) / 100
                            if (that.annotationPauseTime < 90) {
                                var targetTime = clickTime
                            } else {
                                var targetTime = clickTime + that.annotationPauseTime - 90
                            }
                            that.player.seek(targetTime)
                            targetTime = that.secondsToMMSS(targetTime)
                            that.annotateEnd = targetTime
                            that.endDragTime = targetTime
                        }
                    },
                    stop(event) {
                        that.isDragging = false
                         //var windowOffset = $('.videoline').offset().left
                        var clickCoords = $('.crop__end').position().left
                        // "out of bounds" exception
                        if (clickCoords < 0) {
                            clickCoords = 0
                        } else if (clickCoords > barWidth) { 
                            clickCoords = barWidth
                        }
                        var clickCoordsPercent = ( clickCoords / $('.videoline').width() ) * 100
                        // 3 minutes scaling
                        var clickTime = (clickCoordsPercent * 180) / 100
                        if (that.annotationPauseTime < 90)
                            var targetTime = clickTime
                        else
                            var targetTime = clickTime + that.annotationPauseTime - 90
                    
                        that.player.seek(targetTime)
                        targetTime = that.secondsToMMSS(targetTime)
                        that.annotateEnd = targetTime
                        that.endDragTime = targetTime
                        
                        // In case that cropWidth < 0, the crop__space should be drawn again
                        var clipLeft = $('.crop__start').position().left
                        var clipWidth = $('.crop__end').position().left - $('.crop__start').position().left
                        $('.crop__space').css('left', clipLeft)
                        $('.crop__space').css('width', clipWidth)
                        clickTime = that.secondsToMMSS(clickTime)
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
                        from: this.annotateStart,
                        to: this.annotateEnd, 
                        rating: this.annotateRating,
                        id: this.videoAnnotations.length
                    }
                }
                this.$store.commit('ADD_ANNOTATION', {
                    annotation: card, 
                    id: this.id
                })

                // Reset default design states (no annotating)
                this.annotateComment = ''
                this.annotateStart = null
                this.annotateEnd = null
                this.annotateRating = 1
                this.isAnnotating = false
                this.isAnnotateMenu = false
                this.isAnnotateFields = false
                this.isVideoline = false

                this.player.seek(this.annotationPauseTime)

            },
            editing(event) {
                // Hide the Edit and Delete buttons
                $(event.currentTarget).hide(); $(event.currentTarget.parentElement).find('.edit-buttons').hide()

                // <div class="timeline-card">
                // The card that is being editing. It is a DOM object. 
                var editingCard = event.currentTarget.parentElement.parentElement
                this.editingCard = editingCard

                // Setting flags
                this.isEditing = true
                this.isEditFields = true
                this.player.pause()
                // this.isVideoline = true

                // Setting from + end annotate times
                // ga to be changed
                var time = editingCard.children[0].children[0].children[1].children[0].innerText // 03:05 - 03:17               
                var startTime = time.substring(0,5); // 03:05
                this.editStart = startTime
                var endTime = time.substring(8,13); // 03:17
                this.editEnd = endTime
                var totalTime = this.videoDuration;

                var a = startTime.split(':')
                var b = endTime.split(':')
                var startSec = (+a[0]) * 60 + (+a[1]) // in sec
                var endSec = (+b[0]) * 60 + (+b[1]) // in sec

                // Move the timeline according to the editStart & editEnd vars
                var barWidth = $('.player').width()
                var coordsPercentStart = (startSec  * 100) / this.videoDuration
                var coordsStart = (coordsPercentStart * barWidth) / 100
                var coordsPercentEnd = (endSec * 100) / this.videoDuration
                var coordsEnd = (coordsPercentEnd * barWidth) / 100

                $('.crop__start').css('left', coordsStart)
                $('.crop__end').css('left', coordsEnd)
                $('.crop__space').css('left', coordsStart)
                $('.crop__space').css('width', coordsEnd - coordsStart)

                // Render edit effectiveness
                var cardRating = $(editingCard).find('.timeline-card-effectiveness-label').text().slice(0,1) // e.g. '3' in string
                cardRating = parseInt(cardRating) // string => int
                this.editRating = cardRating

                // Render edit comment
                var cardComment = $(editingCard).find('.timeline-card-description').text()
                this.editComment = cardComment
                
            },
            edit() {
                var editingCard = this.editingCard

                // Get annotation id
                var cardID = $(editingCard).find('.timeline-card-id').text()
                cardID = parseInt(cardID)

                // Update data
                var that = this
                this.$store.commit('EDIT_ANNOTATION', {
                    id: this.id,
                    cardID: cardID,
                    rating: this.editRating,
                    comment: this.editComment,
                    from: this.editStart,
                    to: this.editEnd
                })

                this.isEditFields = false
                this.isEditing = false
                this.isVideoline = false
            },
            deleteAnnotation(event) {
                var that = this

                // var editingCard = event.currentTarget.parentElement.parentElement
                var editingCard = $(event.currentTarget).parent().parent()
                // console.log(editingCard)

                // Get annotation id
                var cardID = $(editingCard).find('.timeline-card-id').text()
                cardID = parseInt(cardID)

                var cardTitle = $(editingCard).find('.timeline-card-title').text()

                // Hide .edit-buttons
                $(event.currentTarget).hide(); $(event.currentTarget).siblings('.edit-buttons').hide()
                // Are you sure to Delete annotation?
                swal({
                    title: "Delete ''" + cardTitle + "'' annotation?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: 'gray',
                    confirmButtonText: 'Delete'
                    }).then(function () {
                        // Delete from store
                        that.$store.commit('DELETE_ANNOTATION', {
                            id: that.id,
                            cardID: cardID,
                        })
                    },
                )
            },
            annotateModeActiveItemProblem(event) {
                var children = event.currentTarget.parentNode.children
                for (var i=0; i < children.length; i++) {
                    children[i].style.backgroundColor = "transparent"
                    children[i].style.color = "#FFFFFF"
                }
                event.currentTarget.style.backgroundColor = "#27314d"
                event.currentTarget.style.color = "#FFFFFF"
            },
            chooseCanonFilter(event, canon) {
                if (canon === 'Moves') {
                    if (this.isMoves !== '')  {
                        this.isMoves = ''
                        event.currentTarget.style.backgroundColor = "transparent"
                        event.currentTarget.style.color = "#4a4a4a"
                    }
                    else {
                        this.isMoves = 'Moves'
                        event.currentTarget.style.backgroundColor = "#39425C"
                        event.currentTarget.style.color = "#FFFFFF"
                    }
                }
                if (canon === 'Structure') {
                    if (this.isStructure !== '') {
                        this.isStructure = ''
                        event.currentTarget.style.backgroundColor = "transparent"
                        event.currentTarget.style.color = "#4a4a4a"
                    }
                    else {
                        this.isStructure = 'Structure'
                        event.currentTarget.style.backgroundColor = "#39425C"
                        event.currentTarget.style.color = "#FFFFFF"
                    } 
                }
                if (canon === 'Delivery') {
                    if (this.isDelivery !== '') {
                        this.isDelivery = ''
                        event.currentTarget.style.backgroundColor = "transparent"
                        event.currentTarget.style.color = "#4a4a4a"
                    }
                    else {
                        this.isDelivery = 'Delivery'
                        event.currentTarget.style.backgroundColor = "#39425C"
                        event.currentTarget.style.color = "#FFFFFF"
                    }
                } 
                if (canon === 'Visual') {
                    if (this.isVisual !== '') {
                        this.isVisual = ''
                        event.currentTarget.style.backgroundColor = "transparent"
                        event.currentTarget.style.color = "#4a4a4a"
                    }
                    else { 
                        this.isVisual = 'Visual'
                        event.currentTarget.style.backgroundColor = "#39425C"
                        event.currentTarget.style.color = "#FFFFFF"
                    }
                }
                if (canon === 'Style') {
                    if (this.isStyle !== '') {
                        this.isStyle = ''
                        event.currentTarget.style.backgroundColor = "transparent"
                        event.currentTarget.style.color = "#4a4a4a"
                    }
                    else { 
                        this.isStyle = 'Style'
                        event.currentTarget.style.backgroundColor = "#39425C"
                        event.currentTarget.style.color = "#FFFFFF"
                    }
                }
                if (canon === 'All') {
                    if (this.isAll !== '') {
                        this.isAll = ''
                        event.currentTarget.style.backgroundColor = "transparent"
                        event.currentTarget.style.color = "#4a4a4a"
                    }
                    else { 
                        this.isAll = 'All'
                        event.currentTarget.style.backgroundColor = "#39425C"
                        event.currentTarget.style.color = "#FFFFFF"
                    }
                }
            },
            showAll(event) {
                var categoryBtn = $(event.currentTarget.parentElement)

                this.isMoves = 'Moves'
                this.isStructure = 'Structure'
                this.isDelivery = 'Delivery'
                this.isVisual = 'Visual'
                this.isStyle = 'Style'
                
                $(categoryBtn).siblings('.card-menu-link').css({
                    backgroundColor: "#39425C",
                    color: "#FFF"
                })

            },
            hideAll(event) {
                var categoryBtn = $(event.currentTarget.parentElement)

                this.isMoves = ''
                this.isStructure = ''
                this.isDelivery = ''
                this.isVisual = ''
                this.isStyle = ''
                
                $(categoryBtn).siblings('.card-menu-link').css({
                    backgroundColor: "#FFF",
                    color: "#39425C"
                })

            },
            chooseCanonAnnotate(canon, event) {
                this.annotateCanon = canon
                this.annotateModeActiveItemProblem(event)
            },
            chooseCategoryAnnotate(category) {
                this.annotateCategory = category
                this.annotateModeActiveItemProblem(event)
                this.isAnnotateMenu = false
                this.isAnnotateFields = true
                this.isVideoline = true
            },
            seekCard(event) {
                // this.isAnnotating = true;
                // ga to be changed                
                var time = event.currentTarget.children[0].children[1].children[0].innerText // 03:05 - 03:17
                var startTime = time.substring(0,5); // 03:05
                this.annotateStart = startTime
                var endTime = time.substring(8,13); // 03:17
                this.annotateEnd = endTime
                var totalTime = this.videoDuration;

                var a = startTime.split(':')
                var b = endTime.split(':')
                var startSec = (+a[0]) * 60 + (+a[1]) // in sec
                var endSec = (+b[0]) * 60 + (+b[1]) // in sec

                // Move the timeline according to the annotateStart & annotateEnd vars
                var barWidth = $('.player').width()
                var coordsPercentStart = (startSec  * 100) / this.videoDuration
                var coordsStart = (coordsPercentStart * barWidth) / 100
                var coordsPercentEnd = (endSec * 100) / this.videoDuration
                var coordsEnd = (coordsPercentEnd * barWidth) / 100

                $('.crop__start').css('left', coordsStart)
                $('.crop__end').css('left', coordsEnd)
                $('.crop__space').css('left', coordsStart)
                $('.crop__space').css('width', coordsEnd - coordsStart)
          
                // Seek player according to annotateStart var
                this.player.seek(startSec)
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
            paintTimes() {
                var minPos = $('.videoline').offset().left
                var maxPos = $('.videoline').width() + $('.videoline').offset().left
                minPos = parseInt(minPos)
                maxPos = parseInt(maxPos)

                var sum = 0

                for (var i = minPos; i < maxPos; i++) {
                    this.timesArray[i] = ( i / parseInt($('.videoline').width()) ) * 100
                    sum = sum + 1
                }
                console.log(this.timesArray)
                console.log('sum = ' + sum)
                //var clickTime = (clickCoordsPercent * that.videoDuration) / 100
            },
            setTimes() {
                if (this.annotationPauseTime < 90) {
                    this.times[0] = { min: this.secondsToMMSS(0) }
                    this.times[1] = { min: this.secondsToMMSS(18) }
                    this.times[2] = { min: this.secondsToMMSS(36) }
                    this.times[3] = { min: this.secondsToMMSS(54) }
                    this.times[4] = { min: this.secondsToMMSS(72) }
                    this.times[5] = { min: this.secondsToMMSS(90) }
                    this.times[6] = { min: this.secondsToMMSS(108) }
                    this.times[7] = { min: this.secondsToMMSS(126) }
                    this.times[8] = { min: this.secondsToMMSS(144) }
                    this.times[9] = { min: this.secondsToMMSS(162) }
                    this.times[10] = { min: this.secondsToMMSS(180) }
                } else if (this.annotationPauseTime > 90 && (this.videoDuration - this.annotationPauseTime) > 90) {
                    this.times[0] = { min: this.secondsToMMSS(this.annotationPauseTime - 90) }
                    this.times[1] = { min: this.secondsToMMSS(18 + this.annotationPauseTime - 90) }
                    this.times[2] = { min: this.secondsToMMSS(36 + this.annotationPauseTime - 90) }
                    this.times[3] = { min: this.secondsToMMSS(54 + this.annotationPauseTime - 90) }
                    this.times[4] = { min: this.secondsToMMSS(72 + this.annotationPauseTime - 90) }
                    this.times[5] = { min: this.secondsToMMSS(90 + this.annotationPauseTime - 90) }
                    this.times[6] = { min: this.secondsToMMSS(108 + this.annotationPauseTime - 90) }
                    this.times[7] = { min: this.secondsToMMSS(126 + this.annotationPauseTime - 90) }
                    this.times[8] = { min: this.secondsToMMSS(144 + this.annotationPauseTime - 90) }
                    this.times[9] = { min: this.secondsToMMSS(162 + this.annotationPauseTime - 90) }
                    this.times[10] = { min: this.secondsToMMSS(180 + this.annotationPauseTime - 90) }
                } else if ((this.videoDuration - this.annotationPauseTime) < 90) {
                    this.times[0] = { min: this.secondsToMMSS(this.videoDuration - 180) }
                    this.times[1] = { min: this.secondsToMMSS(this.videoDuration - 162) }
                    this.times[2] = { min: this.secondsToMMSS(this.videoDuration - 144) }
                    this.times[3] = { min: this.secondsToMMSS(this.videoDuration - 126) }
                    this.times[4] = { min: this.secondsToMMSS(this.videoDuration - 108) }
                    this.times[5] = { min: this.secondsToMMSS(this.videoDuration - 90) }
                    this.times[6] = { min: this.secondsToMMSS(this.videoDuration - 72) }
                    this.times[7] = { min: this.secondsToMMSS(this.videoDuration - 54) }
                    this.times[8] = { min: this.secondsToMMSS(this.videoDuration - 36) }
                    this.times[9] = { min: this.secondsToMMSS(this.videoDuration - 18) }
                    this.times[10] = { min: this.secondsToMMSS(this.videoDuration) }
                }
                
            },
            hooping() {
                var that = this

                var allCards = $('.timeline-card')
                var allStartTime = []
                var allEndTime = []
                var allTimeString = []
                var k = 0;
                for (k=0; k < allCards.length; k++) {
                    // ga to be changed                    
                    allTimeString[k] = allCards[k].children[0].children[0].children[1].children[0].innerText
                    allStartTime[k] = allTimeString[k].substring(0,5)
                    allEndTime[k] = allTimeString[k].substring(8,13)

                    allStartTime[k] = that.mmssToSeconds(allStartTime[k])
                    allEndTime[k] = that.mmssToSeconds(allEndTime[k])
                }
                
                this.player.on('time', function(event) {
                    if (that.player.getState() === 'playing') {
                        that.videoCurrentTime = this.getPosition()
                        var j=0;
                        for (j=0; j < allCards.length; j++) {
                            if (this.getPosition() > allStartTime[j] && this.getPosition() < allEndTime[j]) {
                                $('.timeline-card').eq(j).css('background-color', 'yellow')
                            }
                            if (this.getPosition() < allStartTime[j] || this.getPosition() > allEndTime[j]) {
                                $('.timeline-card').eq(j).css('background-color', 'white')
                            } 
                            // TO DO GASSI
                                // if (this.getPosition() > allEndTime[j]) {
                                //     $('.timeline-card').eq(allCards.length-1).after($('.timeline-card').eq(j));
                                //     console.log(allEndTime[j])
                                //     //$('.timeline-card').eq(j).fadeOut(700); 
                                // }
                                // // else {
                                //     //$('.timeline-card').eq(j).fadeIn(700);
                                // //}
                        }
                    }
                })
            },
            moreAnnotations() {
                var moreAnnotations = $('.more-annotations')
                var mydiv  = $('.timeline-content');
                var clientHeight = $(mydiv).height() + 160; // head=70px, spacer=70px, mydiv.padding=20px,  TOTAL:160px
                var windowHeight = $(window).height();
                if (clientHeight > windowHeight) {
                    moreAnnotations.css('display', 'flex')
                } else {
                    moreAnnotations.css('display', 'none')
                }
            },
            toggleEditDelete(event) {
                var moreLessBtn = $(event.currentTarget)

                // moreLessBtn.hide()

                if (moreLessBtn.siblings().css("display") === 'none') {
                    moreLessBtn.siblings().show()
                } else {
                    moreLessBtn.siblings().hide()
                }
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
    }
</script>

<style>
/* ==============================================
                #GENERIC
================================================= */

.structure, .delivery, .visual, .style, .moves {
    background-color: #39425C
}

.video {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* ==============================================
                #SPACER
================================================= */
.spacer {
    height: 70px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

    .player-spacer-button {
        transition: background-color 0.5s ease;
        color: #39425C !important;
        padding: 10px !important;
        height: 100% !important;
        background-color: none !important;
    }
    .player-spacer-button:hover {
        background-color: #A90931 !important;
        color: #FFFFFF !important;
    }





/* ==============================================
                #ADD ANNOTATION AREA
================================================= */

.add-annotation-area {
    cursor: pointer;
    height: 100px;
    color: #39425C;
    border: 0.1em solid #39425C;
    border-top: none;
    background: #FFF;
    transition: 0.25s;
    -webkit-transition: 0.25s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-annotation-area:hover {
    color: #FFF;
    background: #39425C;
}

    .add-annotation-area span {
        margin: 10px;    
        font-size: 1.4em;
    }

/* ==============================================
                #PROGRESS BAR
================================================= */

    .player {
        width: 100%;
    }

    .videoline {
        position: relative;
        height: 80px;
        border-radius: 0;
        background-color: #39425C;
        border-bottom: 1px solid #27314d;
        display: flex;
    }
    .videoline__now-time {
        color: #fff;
        margin-top: 10px;
    }

        .videoline-ribbon {
            /*display: none !important;*/
            position: absolute;
            height: 130px;
            left: 0;
            margin: 0;
            margin-top: 0px;
            padding: 0;
            cursor: pointer;
            z-index: 150;
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
                    font-size: 0.6em;
                    margin: -4px 0px 0px 10px;
                }

/*------------------------------------*\
  #DRAG N' DROP CROP
\*------------------------------------*/

.videoline-crop {
    height: 50%;
    /*position: relative;
    border-radius: 0;
    background-color: #39425C;
    display: flex;
    border-bottom: 1px solid #FFF;*/
}
    .crop__corner {
        width: 0px;
        margin: 0;
        padding: 0px 0px; /* Applying Fitt's Law */
        height: 90%; /* of 100px */
        /*margin-top: 20px;*/
        background-color: #F2C94C;
        cursor: col-resize;
        position: absolute;
        border-radius: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
    }

        .crop__corner span {
            height: 100%;
            display: flex;
            align-items: center;
        }

        .crop__grab {
            padding: 1px;
            padding: 18px 1px;
            border-radius: 0px;
            background-color: #F2C94C;
        }
        .crop__time-label {
            z-index: 200;
            padding: 2px 5px;
            font-size: 9px;
            font-weight: 700;
            color: rgb(25, 30, 42);
            background: #F2C94C;
            border-radius: 15px;
        }

            .crop__start .crop__time-label { 
                margin-left: -50px;
            }
            .crop__end .crop__time-label { 
                margin-left: 50px;
            }
        

    .crop__space {
        z-index: 90;
        /* margin-top: 20px;*/
        position: absolute;
        border-radius: 0px;
        border: 1px solid #F2C94C;
        height: 100%; /* of 100px */
        background-color: #7A7F8D;
    }

    .crop__start {
        z-index: 105;
        
    }
        .crop__start span:nth-child(1) {
            padding: 5px 5px; 
            background-color: #F2C94C; 
        }

    .crop__end {
        z-index: 100;
    }
        .crop__end span {
            padding: 5px 5px; 
            background-color: #F2C94C; 
        }

    .times {
        height: 30px;
        background-color: #39425C;
        display: flex;
        border-top: 1px solid #27314d;
        justify-content: space-between;
        align-items: flex-end;
    }
        .times-min {
            width: 1px;
            height: 70%;
            font-size: 9px;
            color: #ccc7c7; /*  rgb(25, 30, 42)*/
            border-right: 1px solid #FFF;
        }
        /*.times-sec {
            width: 1px;
            height: 40%;
            font-size: 7px;
            color: #FFF;
            background-color: #FFF;
            border-right: 1px solid #FFF;
        } */

.videoline-progress {
    /*z-index: 95;*/
    height: 100%;
    position: absolute;
    background-color: rgba(45, 54, 79, 0.67);
}

/* ==============================================
                #ANNOTATE FIELDS
================================================= */
        
    .annotate-btn {
      padding: 7px;
      cursor: pointer;
      pointer-events: all;
      color: #fff;
      background-color: #39425C;
      display: flex;
      justify-content: flex-end;
    }

    .annotate-menu__canons {
        background-color: #39425C;
        display: flex;
        justify-content: center;
    }

        .annotate-menu__canons a {
            color: #FFF;
            padding: 5px 15px;
            font-size: 1.4em;
            border-top: 1px solid #27314D;
            border-right: 1px solid #27314D;
        }

        .annotate-menu__canons-close {
            flex-grow: 1;
            display: flex;
            justify-content: flex-end;
        }
            .annotate-menu__canons-close span {
                width: 50px;
                color: #FFF;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .annotate-menu__canons-close span:hover {
                color: #39425C;
                background-color: #FFF;
            }

    .annotate-menu__categories {
        width: 100%;
        background-color: #39425C;
        display: flex;
    }
        .annotate-menu__categories a {
            width: 25%;
            height: 100px;
            color: #FFF;
            border: 1px solid #27314D;
            display: flex;
            justify-content: center;
            align-items: center;
        }
            .el-slider { width: 80%}
            .el-slider__bar, .el-slider__button-wrapper, .el-slider__stop { height: 40px !important; }
            .el-slider__stop { border-radius: 0 !important;}

            .el-slider__runway { height: 40px !important;}


    .annotate-fields {
        padding: 5px;
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
            .annotate-fields-left-back {
                color: #FFF;
                border: none;
                background-color: #39425C;
            }

            .annotate-fields-left-back:hover {
                color: #27314D;
            }

                .annotate-fields-left-back i {
                    padding-right: 3px;
                }

        .annotate-fields-right {
            width: 90%;
        }
            .annotate-desc {
                display: flex;
                justify-content: center;
            }

            .annotate-desc-text {
                margin-left: 60px;
            }

            .annotate-effectiveness {
                display: flex;
                flex-direction: column;
                padding: 0;
                margin: 0;
            }
                .annotate-effectiveness label {
                    padding: 0;
                    margin: 0;
                }
            
            .annotate-comment {
                display: flex;
                flex-direction: column;
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
                        padding: 15px;
                    }


/* ==============================================
                    #CARDS
================================================= */

.cards {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
}

    .card-menu {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

        .card-menu-link {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #6B6B6B;
            padding: 15px 10px;
            border-bottom: solid 1px rgba(0, 0, 0, .5);
        }
             .card-menu-link span {
                 font-size: 14px;
             }

        .add-annotation {
            color: #4A4A4A !important;
            background-color: #FFF !important;
        }

    .timeline-content {
        padding-top: 0px !important;
        padding-bottom: 10px !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
        height: 100%;
    }
        .timeline-content-current-video-time {
            width: 100%;
            height: 50px;
            font-size: 2em;
            text-align: center;
            color: #39425C;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .timeline {
            height:100%;
            width: 100%;
            overflow: auto;
            padding: 15px !important;
        }
            .timeline-card{
                background: none;
                padding: 15px !important;
                margin-bottom: 20px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.24);
                /*box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.25);*/
                cursor: pointer;
            }
                .timeline-card-title {
                    font-size: 1.1em;
                    font-style: bold;
                }
                .timeline-card-time {
                    font-size: 0.8em;
                }
                .timeline-card-description {
                     font-size: 0.8em;
                }
                .timeline-card-effectiveness-bar {
                    margin-top: 6px !important;
                    padding-right: 10px !important;
                }
                    .timeline-card-effectiveness-bar progress::-webkit-progress-value { 
                        border-radius: 1px !important; 
                        background-color: #39425C !important; 
                    }

                .timeline-card-effectiveness-label {
                    font-size: 0.8em;
                    text-align: right;
                }
                .timeline-card-author {
                    font-size: 0.8em;
                    opacity: 0.7;
                    margin-top: 5px;
                }

                .timeline-card-id{
                    visibility: hidden;
                }

                .timeline-card-edit {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                }


                .edit-buttons {
                    display: none;
                    justify-content: center;
                    align-items: center;
                    color: #FFFFFF;
                }
                    .edit-buttons-moreLess {
                        height: 36px;
                        width: 42px;
                    }
                    .edit-buttons-moreLess:hover {
                        background-color: #FFFFFF !important;
                       color: #6B6B6B !important;
                       box-shadow: inset 0 0 0 2px #6B6B6B;
                    }
                    .edit-buttons-edit {
                        background-color: #159D1A;
                        opacity:0.8;
                    }
                    .edit-buttons-edit:hover {
                       background-color: #FFFFFF !important;
                       color: #003300 !important;
                       box-shadow: inset 0 0 0 3px #003300;
                    }
                    .edit-buttons-delete {
                        background-color: #BC1715;
                    }
                    +.edit-buttons-delete:hover {
                       background-color: #FFFFFF !important;
                       color: #A90931 !important;
                       box-shadow: inset 0 0 0 3px #A90931;
                    }


                .timeline-card-edit button:hover {
                    color: #FFF;
                    background-color: #272424;
                }


/* ==============================================
                #OVERLAY STUFF
================================================= */
.more-annotations {
    position: fixed; 
    right:20px; 
    bottom:50px; 
    display:none; 
    flex-direction:column; 
    align-items:center; 
    font-weight: 600;
    color: #6B6B6B;
}

    .scroll-mouse {
        border: 1px solid;
        border-color: #6B6B6B;
        padding-left: 7px;
        padding-right: 7px;
        padding-top: 2px;
        padding-bottom: 10px;
        border-radius: 15px;
    }

    .scroll-wheel {
        position: relative;
        font-size: 8px;
        -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 2s; /* Safari 4.0 - 8.0 */
        -webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
        animation-name: example;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    /* Safari 4.0 - 8.0 */
    @-webkit-keyframes example {
        0%   {left:0px; top:0px;}
        50%  {left:0px; top:8px;}
        100% {left:0px; top:0px;}
    }

    /* Standard syntax */
    @keyframes example {
        0%   {left:0px; top:0px;}
        50%  {left:0px; top:8px;}
        100% {left:0px; top:0px;}
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
    background-color: #313A53;
    border: 0.12em solid #fff;
    font-size: 3em;
    top: 10%;
}

.jw-dock {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-end !important;
    justify-content: flex-end !important;
    height: 100%;
    width: 100%;
    margin: 0px !important;
    padding: 0px !important;
}

    .jw-dock-button {
        display: flex !important;
        margin: 35px !important;
        font-size: 3.5em;
    }


.jw-nextup-container {
    opacity: 1 !important;
    visibility: visible !important;
    padding: 0;
    margin: 0;
}
    .jw-nextup { display: none !important; }


.jw-background-color { background-color: #313A53 !important }

#player .jw-option.jw-active-option, #player .jw-progress { background-color: #27314d !important } 

.jw-buffer { background-color: #313A53 !important }

.jw-rail { background-color: #39425C !important }


/* ==============================================
                #TRUMPS
================================================= */

.fa_1_5x {
    font-size: 1.5em;
}

.progress.is-info {
    background-color: #313A53 !important; 
}


</style>