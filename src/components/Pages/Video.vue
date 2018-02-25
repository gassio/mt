<template>
    <div class="video">
        
        <my-header></my-header>
        
        <!--<div class="video__breadcrumb spacer columns is-gapless is-marginless">
             <router-link :to="{ path: '/'}" class="video__breadcrumb-title column is-8">
                <button class="video__breadcrumb-title-btn button is-white">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i> &nbsp {{ this.videos.title }}
                </button>
            </router-link> -->

            <!-- <div class="video-timer column is-4">
                <span>{{ secondsToMMSS(videoCurrentTime) }}</span>
            </div>
        </div>-->
        <div class="main-content columns" style="padding-top:20px;padding-left:30px;">
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
                            <button class="button annotate-fields-left-back" @click="isAnnotateFields = false; isVideoline = false; isAnnotateMenu = true; selectedMove = 'Other'">
                                <i aria-hidden="true" class="fa fa-chevron-left"></i>Back
                            </button>
                        </div>
                        
                        <div class="annotate-fields-right">
                            <div class="annotate-desc field" v-for="canon in canons" v-if="canon.name === annotateCanon">
                                <div class="annotate-desc-text" v-for="cat in canon.categories" v-if="cat.name === annotateCategory">
                                    <h1>{{ cat.name }}</h1>
                                    <p>{{ cat.desc }}</p>
                                </div>
                                <div class="annotate-menu__canons-close"><span @click="isAnnotating = false; isAnnotateFields = false; isVideoline = false; selectedMove = 'Other'">X</span></div>
                            </div>  
                            <div class="annotate-subcategories" v-if="annotateCanon === 'Moves'">
                                <label class="label">Choose move</label>
                                <el-select v-model="selectedMove" v-for="cat in canons[0].categories" v-if="cat.name === annotateCategory" :key="cat.name" placeholder="Choose move:">
                                    <el-option v-for="mv in cat.mvs" :key="mv.desc" :label="mv.desc" :value="mv.desc">
                                    </el-option>
                                    <el-option label="Other" value="Other"></el-option>
                                </el-select>
                            </div>
                            <div class="annotate-comment field" v-show="selectedMove === 'Other'">
                                <label class="label">Comment</label>
                                <p class="control">
                                    <textarea class="textarea" 
                                    placeholder="[Name]
You might also want to include a concrete strategy recommendation." 
                                            v-model="annotateComment">
                                    </textarea>
                                </p>
                            </div>
                            <div class="annotate-effectiveness field">
                                <label class="label">Effectiveness rating</label>
                                <el-slider v-model="annotateRating" :step="1" :min="0" :max="5" 
                                        show-stops 
                                        show-tooltip class="annotate-effectiveness-slider">
                                </el-slider>
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
                                    <button class="button" @click="edit()">Save</button>
                                </div>
                            </div>
                            <div class="field" style="color: #fff; font-size: 0.8em;">
                                Start time:
                                <input type="text" v-model="editStart">
                                End time:
                                <input type="text" v-model="editEnd">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="add-annotation-area" @click="annotating()" v-show="!isAnnotating">
                    <i class="fa fa-plus fa_1_5x" aria-hidden="true"></i><span>Add annotation</span>
                </div>

            </div>

            <div class="cards" id="cards">
                <div class="cards-content">
                    <nav class="card-menu">
                        <a class="card-menu-link" style="background-color: #395d41 !important;" title="Hide/show" @click="chooseCanonFilter($event, 'Moves')"><i class="fa fa-pencil-square-o fa_1x" aria-hidden="true"></i><span class="card-menu-link-title">Moves</span><div class="card-menu-link-ribbon"></div></a>
                        <a class="card-menu-link" style="background-color: #853a3e !important;" title="Hide/show" @click="chooseCanonFilter($event, 'Structure')"><i class="fa fa-book fa_1x " aria-hidden="true"></i><span class="card-menu-link-title">Structure</span></a>
                        <a class="card-menu-link" style="background-color: #ab8c3c !important;" title="Hide/show" @click="chooseCanonFilter($event, 'Delivery')"><i class="fa fa-commenting fa_1x " aria-hidden="true"></i><span class="card-menu-link-title">Delivery</span></a>
                        <a class="card-menu-link" style="background-color: #6c3765 !important;" title="Hide/show" @click="chooseCanonFilter($event, 'Visuals')"><i class="fa fa-eye fa_1x " aria-hidden="true"></i><span class="card-menu-link-title">Visuals</span></a>
                        <a class="card-menu-link" style="background-color: #38425d !important;" title="Hide/show" @click="chooseCanonFilter($event, 'Style')"><i class="fa fa-diamond fa_1x " aria-hidden="true"></i><span class="card-menu-link-title">Style</span></a>
                        <div id="more-annotations" class="more-annotations">
                            Scroll
                            <div class="scroll-mouse">
                                <i class="scroll-wheel fa fa-circle" aria-hidden="true"></i>
                            </div>
                        </div>
                    </nav>
                    <div class="timeline-container">
                        <div class="timeline-card column" @click="seekCard($event)" v-for="card in videoAnnotations" v-if="card.canon === isMoves || card.canon === isStructure || card.canon === isDelivery || card.canon === isVisuals || card.canon === isStyle" v-bind:style="{ 'border-left': '12px solid ' + card.color  }">
                            <div class="timeline-card__head">
                                <div class="timeline-card__title-container">
                                    <span class="timeline-card__title">{{ card.category }}</span>
                                    <span class="timeline-card__time">{{ card.from }} - {{ card.to }}</span>
                                </div>
                                <p class="timeline-card__desc">{{ card.label }}</p>                                
                            </div>
                            <div class="timeline-card__body" @click.stop.prevent>
                                <p class="timeline-card__body-title">COMMENT:</p>
                                <read-more class="timeline-card__comment" :text="card.comment" more-str="Read More" link="#" less-str="Read less" :max-chars="70"></read-more> 
                                <div class="timeline-card__effectiveness">
                                    <progress class="progress is-small is-info" v-bind:value="20 * card.rating" max="100"></progress>
                                    <p class="timeline-card__effectiveness-label">{{ card.rating }} / 5 effective</p>
                                </div>
                            </div>
                            <div class="timeline-card__footer">
                                <!-- TODO This line is buggy. This should print the author of the annotation on the annotation card -->
                                <!-- <span class="timeline-card__id">{{ card.id }} {{ this.$root.$options.myAuth.getAuthData().user_id }}</span> -->
                                <div class="timeline-card__edit-container" @click.stop.prevent>
                                    <button class="edit-buttons-moreLess button" @click="toggleEditDelete($event)"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                    <button class="edit-buttons edit-buttons-edit button" @click="editing($event)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></button>
                                    <button class="edit-buttons edit-buttons-delete button" @click="deleteAnnotation($event)"><i class="fa fa-trash-o fa-1x" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'
	import MyHeader from '../Layout/MyHeader.vue'

    import { Loading } from 'element-ui';

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
                videoIndexForCardColor: 0,
                annotateCanon: 'Delivery',
                annotateCategory: 'Volume',
                annotateSubCategory: '',
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
                isVisuals: 'Visuals',
                isStyle: 'Style',
                isAll: '',
                times: [],
                toggleCardEditButton: false,
                dragEndIsMoving: false,
                annotationPauseTime: 0,
                id: this.$route.params.id,
                selectedMove: 'Other',
                otherMoveSelected: false       
            }
        },
        created() {
            var that = this

            this.$store.dispatch('getVideo', this.id).then(() => {
                // This needs to be a function.
                that.videoAnnotations = that.videos[that.videoIndexForCardColor].annotations
                for (var i=0, l = that.videoAnnotations.length; i < l; i++) {
                    if (that.videoAnnotations[i].canon === 'Moves')
                        that.videoAnnotations[i]['color'] = '#395d41'
                    else if (that.videoAnnotations[i].canon === 'Structure')
                        that.videoAnnotations[i]['color'] = '#853a3e'
                    else if (that.videoAnnotations[i].canon === 'Delivery')
                        that.videoAnnotations[i]['color'] = '#ab8c3c'
                    else if (that.videoAnnotations[i].canon === 'Visuals')
                        that.videoAnnotations[i]['color'] = '#6c3765'
                    else if (that.videoAnnotations[i].canon === 'Style')
                        that.videoAnnotations[i]['color'] = '#38425d'
                }
            })
        },
        mounted() {
            var that = this

            // console.log('videoAnnotations: ', this.videoAnnotations.comment)
            
            // Temporary solution for MOUNTED() cycle because of Vuex stuff.
            // Trying to get the index (vIndex) of the video that the same id with the params.id
            var vIndex; 
            for (var i=0, l = this.videos.length; i < l; i++) {
                if (this.videos[i].id === this.id) 
                    vIndex = i
            }

            this.videoIndexForCardColor = vIndex
            
            this.videoDuration = this.videos[vIndex].duration
            this.videoDurationMMSS = this.secondsToMMSS(this.videoDuration) 

            // Loads video sources: 
            // link 
            // duration
            // thumb (not done yet GA)
            // this.getVideoSources(vIndex)

            // Get the correct source of the video. 
            // The "sources" resource (vidSources) is an array that contains about 3-6 objects.
            // The last object = sourcesLength - 1 contains an m4a file, which we do not want.
            // So, we get the last object - 1 = sourcesLength - 2
            var sourcesLength = this.videos[vIndex].sources.length
            var correctSource = sourcesLength - 2

            this.player = jwplayer('player')            
            this.player.setup({
                // If the video has sources (old way) then play the file: sources.[correctSource].file
                // Else the video has no sources and has instead a link field (new way) then play the file: link
                file: (this.videos[vIndex].sources.length !== 0) ? this.videos[vIndex].sources[correctSource].file : this.videos[vIndex].link,
                image: this.videos[vIndex].thumb,
                "height": $('.player').height(),
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

            // var cardCommentsArray = document.getElementsByClassName('timeline-container')[0].childNodes
            // console.log(cardCommentsArray)
            // for(var i = 0, l = cardCommentsArray.length; i < l; i++){
            //     var comment = cardCommentsArray[i].getElementsByClassName('timeline-card__comment')
            //     console.log(comment.text)
            // }
                
        },
        updated() {
            // Fixes unknown man picture bug
            $('.jw-logo').hide()

            // Fetches annotations of the current video (videoid = URLid)
            // Stores annotations in videoAnnotations[]
            // this.videoAnnotations = this.videos.annotations
            
            // Show "Sroll down for more" when there are more than 5 cards
            // this.moreAnnotations()

            // Color a card when videoCurrentTime is between card from and end
            // this.hooping()
        },
        methods: {
            getVideoSources(vIndex) {
                let that = this
                let link, duration, thumb
                // A message label is needed.
                // Something like this: "Synchronizing video..."
                // Shows loading spinner
                if (this.videos[vIndex].sources.length === 0) {
                    var loadingInstance = Loading.service({ fullscreen: true }); 
                    // console.log('video: ', this.videos)
                }
                // Close modal

                let intervalID = setInterval(function () {
                    axios.get("https://metalogon-api.herokuapp.com/rest/jwconversion?videoId=" + this.videos[vIndex].jwVideoId)
                        .then( response => {
                            console.log(' getting conversions...')
                            let conversions = response.data.data.conversions

                            for (var i = 0, l = conversions.length; i < l; i++) {
                                if (conversions[i].status === 'Ready' && conversions[i].template.name === '720p') {
                                    link = conversions[i].link.protocol + '://' + conversions[i].link.address + conversions[i].link.path
                                    duration = conversions[i].duration
                                    console.log('|> Link: ', link)
                                    console.log('|> Duration: ', duration)

                                    // axios.put("https://metalogon-api.herokuapp.com/rest/video/" + that.id, 
                                    //     { "link": link, "duration": duration }
                                    // )
                                    // .then( (response) => console.log('PUT video: /', that.id))
                                    // .catch( (error) => console.log('Not PUT video: ', error))
                                            // that.$store.dispatch('editVideo', {
                                            //     videoId: that.id,
                                            //     linkDurationThumb: {
                                            //         link: link,
                                            //         duration: duration
                                            //     }
                                            // })

                                    // Close loading bar
                                    if (that.videos[vIndex].sources.length !== 0)
                                        loadingInstance.close()
                                    // Clear interval
                                    clearInterval(intervalID)
                                }
                            }
                        })
                        .catch( (error) => console.log(error))
                }, 5000)
                
                // GA
                // GET thumb
                // let intervalID2 = setInterval(function () {
                //     axios.get("https://cdn.jwplayer.com/v2/media/" + theData.link.query.key)
                //         .then( response => {
                //             console.log('----- GET thumb ----')
                //             thumb = response.data.playlist.image
                //             console.log('|> Thumb: ', thumb)
                //             clearInterval(intervalID2)
                //         })
                // }, 5000)
            },
            annotating() {
                var that = this

                // CHECKING for new annotations in current video (for real time annotating)
                this.$store.dispatch('getVideoAnnotations', this.id)

                this.isAnnotating = true
                this.isAnnotateMenu = true
                this.annotateRating = null
                this.annotateComment = ''
                this.selectedMove = 'Other'
                if (this.player.getState() === 'playing') 
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
                // If other is enable, then show the annotation comment 
                var theComment = ''

                if (this.selectedMove === 'Other')
                    theComment = this.annotateComment
                else
                    theComment = this.selectedMove

                // Find the description of the chosen annotate category.
                var descIndex, annotateDesc
                for (var i = 0, l = this.canons.length; i < l; i++) {
                    if (this.annotateCanon === this.canons[i].name)
                        descIndex = i
                }
                var annotateCategories = this.canons[descIndex].categories
                for (var i = 0, l = annotateCategories.length; i < l; i++) {
                    if (this.annotateCategory === annotateCategories[i].name)
                        annotateDesc = annotateCategories[i].desc
                }

                var card = { 
                    author: 'User',
                    canon: this.annotateCanon,
                    category: this.annotateCategory,
                    label: annotateDesc, // category description
                    comment: theComment,
                    from: this.annotateStart,
                    to: this.annotateEnd, 
                    rating: this.annotateRating,
                    id: Math.floor((Math.random() * 1000000)),
                }

                // Pushing new annotation in current video
                if (card.comment === '' && card.rating === null) {
                    alert('Please insert a comment and set a rate.')
                } else if (card.rating === null) {
                    alert('Please set a rate.')
                } else if (card.comment === '') {
                    alert('Please insert a comment.')
                } else {

                    // We are pushing the card the state because the PUT call needs to pass the whole video object in the body.
                    this.videos.annotations.push(card)
                    this.$store.dispatch('addAnnotation', {
                        video: this.videos,
                        id: this.id,
                        annotation: card
                    })

                    // Sets the color of the card (it belongs to videoAnnotations[])
                    if (card.canon === 'Moves')
                        card["color"] = '#395d41'
                    else if (card.canon === 'Structure')
                        card["color"] = '#853a3e'
                    else if (card.canon === 'Delivery')
                        card["color"] = '#ab8c3c'
                    else if (card.canon === 'Visuals')
                        card["color"] = '#6c3765'
                    else if (card.canon === 'Style')
                        card["color"] = '#38425d'
                    
                    // We are pushing to card to videoAnnotations[]
                    this.videoAnnotations.push(card)

                    // Seek to previous paused time.
                    this.player.seek(this.mmssToSeconds(this.annotateStart))

                    // Reset default design states (no annotating)
                    this.annotateComment = ''
                    this.annotateStart = null
                    this.annotateEnd = null
                    this.annotateRating = 1
                    this.isAnnotating = false
                    this.isAnnotateMenu = false
                    this.isAnnotateFields = false
                    this.isVideoline = false
                    this.selectedMove = 'Other'
                }
            },
            editing(event) {
                // CHECKING for new annotations in current video (for real time annotating)
                this.$store.dispatch('getVideoAnnotations', this.id)

                // Hide the Edit and Delete buttons
                $(event.currentTarget).hide(); $(event.currentTarget.parentElement).find('.edit-buttons').hide()

                // The card that is being editing. It is a DOM object. 
                // <div class="timeline-card">
                var editingCard = event.currentTarget.parentElement.parentElement.parentElement
                this.editingCard = editingCard

                // Setting flags
                this.isEditing = true
                this.isEditFields = true
                this.player.pause()

                // Setting from + to annotate times
                var time = $(editingCard).find('.timeline-card__time').text() // 03:05 - 03:17
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
                var cardRating = $(editingCard).find('.timeline-card__effectiveness-label').text().slice(0,1) // e.g. '3' in string
                cardRating = parseInt(cardRating) // string => int
                this.editRating = cardRating

                // Render edit comment
                var cardComment = $(editingCard).find('.timeline-card__comment').text()
                this.editComment = cardComment
            },
            edit() {
                var editingCard = this.editingCard

                // Get annotation id
                var cardID = $(editingCard).find('.timeline-card__id').text()
                cardID = parseInt(cardID)

                for (var i=0, l = this.videos.annotations.length; i < l; i++) {
                    if (this.videos.annotations[i].id === cardID) {
                        this.videos.annotations[i].comment =  this.editComment
                        this.videos.annotations[i].from = this.editStart
                        this.videos.annotations[i].to = this.editEnd
                        this.videos.annotations[i].rating =  this.editRating

                        this.videoAnnotations[i].comment =  this.editComment
                        this.videoAnnotations[i].from = this.editStart
                        this.videoAnnotations[i].to = this.editEnd
                        this.videoAnnotations[i].rating =  this.editRating
                    }
                }

                // Update data
                var that = this
                this.$store.dispatch('editAnnotation', {
                    video: this.videos,
                    // annotation: card, 
                    id: this.id
                })

                // this.$store.commit('EDIT_ANNOTATION', {
                //     id: this.id,
                //     cardID: cardID,
                //     rating: this.editRating,
                //     comment: this.editComment,
                //     from: this.editStart,
                //     to: this.editEnd,
                //     videoObj: this.$store.getters.videos[this.id]
                // })

                this.isEditFields = false
                this.isEditing = false
                this.isVideoline = false
            },
            deleteAnnotation(event) {
                var that = this
                
                // CHECKING for new annotations in current video (for real time annotating)
                // this.$store.dispatch('getVideoAnnotations', this.id)

                var editingCard = $(event.currentTarget).parent().parent()

                // Get annotation id
                var cardID = $(editingCard).find('.timeline-card__id').text()
                cardID = parseInt(cardID)
                console.log("cardID", cardID)

                // Hide .edit-buttons
                $(event.currentTarget).hide()
                $(event.currentTarget).siblings('.edit-buttons').hide()

                var cardTitle = $(editingCard).find('.timeline-card__title').text()

                // Are you sure to Delete annotation?
                swal({
                    title: "Delete annotation?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: 'gdray',
                    confirmButtonText: 'Delete'
                    }).then(function () {
                        // Refresh fix
                        // that.player.seek(that.mmssToSeconds(that.videoAnnotations[that.id].from))

                        // Delete from STATE
                        for (var i=0, l = that.videos.annotations.length; i < l; i++) {
                            if (that.videos.annotations[i].id === cardID) {
                                console.log("anno id = ", that.videos.annotations[i].id)
                                that.videos.annotations.splice(i, 1)
                                that.videoAnnotations.splice(i, 1)
                            }
                        }

                        that.$store.dispatch('deleteAnnotation', {
                            id: that.id,
                            video: that.videos,
                            cardID: cardID
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
                        event.currentTarget.style.backgroundColor = "#395d41"
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
                        event.currentTarget.style.backgroundColor = "#853a3e"
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
                        event.currentTarget.style.backgroundColor = "#ab8c3c"
                        event.currentTarget.style.color = "#FFFFFF"
                    }
                } 
                if (canon === 'Visuals') {
                    if (this.isVisuals !== '') {
                        this.isVisuals = ''
                        event.currentTarget.style.backgroundColor = "transparent"
                        event.currentTarget.style.color = "#4a4a4a"
                    }
                    else { 
                        this.isVisuals = 'Visuals'
                        event.currentTarget.style.backgroundColor = "#6c3765"
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
                        event.currentTarget.style.backgroundColor = "#38425d"
                        event.currentTarget.style.color = "#FFFFFF"
                    }
                }
                if (canon === 'All') {
                    if (this.isAll !== '') {
                        this.isAll = ''
                        // event.currentTarget.style.backgroundColor = "transparent"
                        // event.currentTarget.style.color = "#4a4a4a"
                    }
                    else { 
                        this.isAll = 'All'
                        // event.currentTarget.style.backgroundColor = "#39425C"
                        // event.currentTarget.style.color = "#FFFFFF"
                    }
                }
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
                var time = $(event.currentTarget).find('.timeline-card__time').text()
                var startTime = time.substring(0,5); // 03:05
                this.annotateStart = startTime
                var endTime = time.substring(8,13); // 03:17
                this.annotateEnd = endTime
                var totalTime = this.videoDuration;

                var a = startTime.split(':')
                var b = endTime.split(':')
                var startSec = (+a[0]) * 60 + (+a[1]) // in sec
                var endSec = (+b[0]) * 60 + (+b[1]) // in sec

                // Seek player according to annotateStart var
                this.player.seek(startSec)

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
          
            },
            secondsToMMSS(s) {
                s = Number(s);

                var m = Math.floor(s % 3600 / 60);
                var s = Math.floor(s % 3600 % 60);

                return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
            },
            mmssToSeconds(timeMMSS) {
                var timeMMSS = timeMMSS.split(":")
                return (+timeMMSS[0]) * 60 + (+timeMMSS[1]) // in sec
            },
            showAnnotateMenu() {
                $('.annotate-menu').show()
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
                for (var k=0, l = allCards.length; k < l; k++) {
                    allTimeString[k] = allCards[k].children[0].children[0].children[1].innerText // 00:05 - 00:10
                    allStartTime[k] = allTimeString[k].substring(0,5)  // 00:05 
                    allEndTime[k] = allTimeString[k].substring(8,13) // 00:10 

                    allStartTime[k] = that.mmssToSeconds(allStartTime[k])
                    allEndTime[k] = that.mmssToSeconds(allEndTime[k])
                }
                
                console.log("_________")
                for (var j=0, l = allCards.length; j < l; j++) {
                    // Checking if currentTime is between start/end time 
                    // AND if the bgcolor is white.
                    if (this.videoCurrentTime >= allStartTime[j] && this.videoCurrentTime <= allEndTime[j] && $('.timeline-card').eq(j).css('background-color') === "rgb(255, 255, 255)") {
                        console.log('#' + j + ' annotation is in "' + $('.timeline-card').eq(j).find('.timeline-card__comment p').text() + '"')
                        $('.timeline-card').eq(j).css('background-color', '#fff293')
                        var firstCard = $('.timeline-card').eq(0)
                        $('.timeline-card').eq(j).effect('bounce',{times: 2}, 300)
                        $('.timeline-card').eq(j).insertBefore(firstCard)
                        if ($('.timeline-container').scrollTop !== 0) 
                            $('.timeline-container').animate({scrollTop:0}, 500)
                    } else if ((this.videoCurrentTime < allStartTime[j] || this.videoCurrentTime > allEndTime[j])) {
                        console.log('#' + j + ' annotation is out "' + $('.timeline-card').eq(j).find('.timeline-card__comment p').text() + '"')
                        $('.timeline-card').eq(j).css('background-color', 'white')
                    }
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
            },
        },
        computed: {
            ...mapGetters([
                'videos',
                'currentVideoID',
                'canons'
            ])
        },
        components: {
            'my-header': MyHeader
        }
    }
</script>

<style>
/* ==============================================
                #GENERIC
================================================= */

.structure, .delivery, .visual, .style, .moves {
    background-color: #39425C
}


/* ==============================================
                #VIDEO-BREADCRUMB
================================================= */

.video__breadcrumb {
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

    .video__breadcrumb-title {
        /*width: 72%;*/
    }

        .video__breadcrumb-title-btn  {
            transition: background-color 0.5s ease;
            color: #39425C !important;
            padding: 10px !important;
            height: 100% !important;
            background-color: none !important;
        }
        .video__breadcrumb-title-btn:hover {
            background-color: #A90931 !important;
            color: #FFFFFF !important;
        }

        .video-timer {
            /*width: 28%;*/
            height: 50px;
            font-size: 2em;
            text-align: center;
            color: #39425C;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
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
            .el-slider__button { width: 25px; height: 25px; }
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
                display: flex ;
                justify-content: center;
            }

            .annotate-desc-text {
                margin-left: 60px;
            }
                .annotate-desc-text h1{
                    color: #FFF;
                    font-size: 1.3em;
                    text-transform: uppercase;
                }
                .annotate-desc-text p{
                    font-style: italic;
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
    margin-left: 25px !important;
}   

    .card-menu {
        height: 50px;
        display: flex; /*  none*/
        justify-content: center;
        width: 100%;
        margin-bottom: 10px;
    }

        .card-menu-link {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #FFF;
            padding: 10px 24px;
            border-bottom: solid 1px rgba(0, 0, 0, .5);
        }
             .card-menu-link-title {
                 font-size: 14px;
             }

        .add-annotation {
            color: #4A4A4A !important;
            background-color: #FFF !important;
        }

    .timeline-container {
        height: 556px;
        overflow-y: scroll;
    }

        .timeline {
            height:100%;
            width: 100%;
            overflow: auto;
            padding: 15px !important;
        }
            .timeline-card {
                background: none;
                margin-bottom: 10px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.24);
            }

            .timeline-card:hover {
                opacity: 0.9;
                transition: 0.8;
            }

                .timeline-card__head {
                    cursor: pointer;
                }
                    .timeline-card__title-container {
                        display: flex;
                        justify-content: space-between;
                    }
                    
                    .timeline-card__title {
                        font-size: 1.2em;
                        font-style: bold;
                        text-transform: uppercase;
                    }
                    .timeline-card__time {
                        font-size: 0.8em;
                    }
                    .timeline-card__desc {
                        margin-top: 2px;
                        font-size: 0.8em;
                        line-height: 1.4em;
                    }

                .timeline-card__body {
                    margin-top: 5px;   
                }
                    .timeline-card__body-title {
                        font-size: 12px; 
                        display: flex;
                    }

                    .timeline-card__comment {
                        font-size: 0.8em;
                        line-height: 1.3em;
                        /*height: 35px;*/
                    }

                    #readmore {
                        color: #38425d;
                        font-weight: bold;
                        float: right;
                    }

                .timeline-card__footer {
                    margin-top: -20px;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                }

                    .timeline-card__effectiveness {
                        margin-top: 7px !important;
                        display: flex;
                    }
                        .timeline-card__effectiveness progress {
                            width: 75%;
                            margin-top: 5px;
                        }
                        .timeline-card__effectiveness progress::-webkit-progress-value { 
                            background-color: #89A9C0 !important; /*#38425d*/
                        }

                        .timeline-card__effectiveness-label {
                            width: 25%;
                            text-align: right;
                            font-size: 0.8em;
                        }
                    .timeline-card__author {
                        opacity: 0.7;
                        font-size: 0.8em;
                        margin-top: 5px;
                        display: flex;
                        align-self: flex-end;
                    }

                    .timeline-card__id {
                        visibility: hidden;
                        font-size: 0.4em;
                    }

                    .timeline-card__edit-container {
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


                    .timeline-card__edit-container button:hover {
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

.el-rate__icon {
    font-size: 26px;
}

.el-checkbox-group {
    display: flex !important;
    flex-direction: column !important;
}

.el-checkbox+.el-checkbox { 
    margin-left: 0 !important; 
}

.el-select {
    display: flex !important;
    width: 80%;
}

</style>