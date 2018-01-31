import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

import { Loading } from 'element-ui';
let loadingInstance = Loading.service({ fullscreen: true });    

let errorHTML = `
<div style="padding-top:50px;">
    <h1 style="font-size:28px">We couldn't load the presentation videos</h1>
    <p style="padding-top:5px; font-size:18px">Please contact your administrator</p>
</div>
`

export const store = new Vuex.Store({
state: {
    videos: [],
    classes: [],
    canons: [   
        { 
            name: 'Moves', 
            categories: [
                { 
                    name: 'Introduction',
                    mvs: [
                        { desc: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research' },
                        { desc: 'States the value of the present research and explains why it was conducted' },
                        { desc: 'Discusses the definitions of key terms' },
                        { desc: 'Summarizes and previews the methods used' },
                        { desc: 'Presents basic equations' }
                    ]
                },
                { 
                    name: 'Methodology',
                    mvs: [
                        { desc: 'Describes materials and instrumentation in the study' },
                        { desc: 'Describes tasks (actions) in the study' },
                        { desc: 'Describes the procedures of an experiment (activities)'},
                        { desc: 'Presents justification of techniques ' },
                        { desc: 'Describes variables in the study' },
                        { desc: 'Describes the procedures used in data analysis' },
                        { desc: 'Describes the relations between the experiment and prior/subsequent experiments' }
                    ]
                },
                { 
                    name: 'Results and Discussion',
                    mvs: [
                        { desc: 'Provides a description of the analysis conducted'},
                        { desc: 'Provides a comprehensive/complete explanation of the results and of the data analysis'},
                        { desc: 'Describes the reliability/validity of the measures used in the experiment'},
                        { desc: 'States the data that neither support nor conflict with the major finding '},
                        { desc: 'Evaluates findings with respect to the hypotheses and comments on whether the results are expected '},
                        { desc: 'Evaluates trends and patterns '},
                        { desc: 'Accounts for data that do not support the major finding  '},
                        { desc: 'Describes established knowledge on the topic and refers to previous research for comparison  '},
                        { desc: 'Makes a claim about the generalizability of particular results  '},
                        { desc: 'Indicates limits of sources (including error analysis) '},
                        { desc: 'Indicates significance of the outcome'},
                    ]
                },
                { 
                    name: 'Conclusion',
                    mvs: [
                        { desc: 'Summarizes findings qualitatively and highlights the overall research outcomes'},
                        { desc: 'Strengthens the discussion by recapitulating main points (such as research questions, aims and purposes, and theoretical or methodological approach)'},
                        { desc: 'Makes suggestions for future research '}
                    ]
                },
                { 
                    name: 'Question and Answer',
                    mvs: [
                        { desc: 'Responds to questions directly'},
                        { desc: 'Provides conceptual links to the talk '},
                        { desc: 'Uses specific details to respond '},
                        { desc: 'Recommends future research in the field '},
                    ]
                }
            ]
        },
        { 
            name: 'Structure', 
            categories: [
            { 
                name: 'Terms',
                desc: 'Provides overview of the talk, emphasizing the connection between key terms and concepts'
            },
            { 
                name: 'Conceptual transitions',
                desc: 'Uses conceptual transitions to connect key sections of the presentation'
            },
            { 
                name: 'Line of argument',
                desc: 'Provides a clear line of argument which is brought to a clear position at the end'
            },
            { 
                name: 'Central moves',
                desc: 'Uses the central rhetorical moves for each section appropriately '
            }
            ]
        },
        { 
            name: 'Style', 
            categories: [
                { 
                    name: 'Coherence ',
                    desc: 'Uses transitions at the sentence level to connect key concepts and parts of the argument'
                },
                { 
                    name: 'Concision',
                    desc: 'Uses the fewest possible words to explain the concepts for the audience, avoiding unnecessary repetition'
                },
                { 
                    name: 'Flow',
                    desc: 'Uses structures such as given/new or three-part structures to help the audience follow the argument'
                },
                { 
                    name: 'Emphasis',
                    desc: 'Uses specific words or phrases to draw attention to important concepts'
                },
                { 
                    name: 'Figures of Speech',
                    desc: 'Uses analogies, metaphors or other rhetorical devices to enhance the concepts and make the speech memorable'
                },
                { 
                    name: 'Figures of Sound',
                    desc: 'Uses auditory cues at the sentence (e.g. patterned parallelism) or word level (e.g. alliteration) to make the oral delivery more memorable'
                }
            ]
        },
        { 
            name: 'Visuals', 
            categories: [
            { 
                name: 'Pictorial cues',
                desc: 'Uses primarily pictorial cues (limited text)'
            },
            { 
                name: 'Slide titles',
                desc: 'Uses assertion-based slide titles to convey key concepts (including title slide)'
            },
            { 
                name: 'Image-text highlight',
                desc: 'Images and text highlight/focus audience on key points'
            },
            { 
                name: 'Graphics',
                desc: 'Graphics show relevant data/concepts to support the claims'
            },
            { 
                name: 'Memorable images',
                desc: 'Memorable images provide necessary context to support the oral discussion'
            }
            ]
        },
        { 
            name: 'Delivery', 
            categories: [
            { 
                name: 'Volume',
                desc: 'Volume, rate, and pitch are appropriate and modulated'
            },
            { 
                name: 'Gestures',
                desc: 'Gestures, eye contact, and body movement used intentionally to engage audience'
            },
            { 
                name: 'Metadiscourse',
                desc: 'Metadiscourse orients listener and helps transition between sections'
            },
            { 
                name: 'Posture',
                desc: 'Posture and stance project confidence, and allow speaker to interact with audience and screen'
            },
            { 
                name: 'Language',
                desc: 'Technical and informal language are both employed as appropriate'
            }
            ]
        }
    ],
    activeClasses: [], // only for professor.
    archivedClasses: [], // only for professor.
    studentClasses: [], // only for student.
    currentVideoID: null,
    uploadingVideo: false,
    uploadUrl: ''
},
actions: {
    /* VIDEOS  */
    getAllVideos: function ({ commit }) {
        axios.get("https://metalogon-api.herokuapp.com/rest/video")
            .then(function (response)
            {
                commit('GET_ALL_VIDEOS', response.data.data )
            })
            .catch(function (err) {
                $('.home').html(errorHTML)
            })
    },
    getVideo: function ({ commit }, payload) {
        axios.get("https://metalogon-api.herokuapp.com/rest/video/" + payload)
            .then(function (response)
            {
                commit('GET_VIDEO', response.data.data)
            })
            .catch(function (err) {
                $('.video').html(errorHTML)
            })
    },
    getVideoAnnotations: function ({ commit }, payload) {
        axios.get("https://metalogon-api.herokuapp.com/rest/video/" + payload)
            .then(function (response)
            {
                commit('GET_VIDEO_ANNOTATIONS', response.data.data.annotations)
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    createVideo: function ({ commit }, payload) {
        axios.post('https://metalogon-api.herokuapp.com/rest/video/', payload)
            .then( response => {
                console.log('-----')
                console.log('POST video')
                commit('CREATE_VIDEO', payload)
            })
            .catch( response => console.log(response.error))
    },
    editVideo: function ({ commit }, payload) {
        axios.put('https://metalogon-api.herokuapp.com/rest/video/' + payload.videoId, 
                payload.linkDurationThumb)
            .then( response => {
                console.log('-----')
                console.log('PUT video')
                commit('EDIT_VIDEO', payload.linkDurationThumb, payload.videoId)
            })
            .catch( response => console.log(response.error))
    },
    deleteVideo: function ({ commit }, payload) {
        axios.delete('https://metalogon-api.herokuapp.com/rest/video/', payload)
            .then( response => {
                console.log('-----')
                console.log('DELETE video')
                commit('DELETE_VIDEO', payload)
            })
            .catch( response => console.log(response.error))
    },
    favoriteVideo: function ({ commit }, payload) {
        axios.put('https://metalogon-api.herokuapp.com/rest/video/' + payload.id, 
            {
                featured: true
            })
            .then( response => {
                commit('FAVORITE_VIDEO', payload)
            })
            .catch( response => console.log(response.error))
    },
    /* ANNOTATIONS */ 
    addAnnotation: function ({ commit, state }, payload) {
        var theVideo = payload.video
            
        axios.put("https://metalogon-api.herokuapp.com/rest/video/"+payload.id, theVideo)
            .then(response => {
                theVideo.annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );
            })
            .catch(function (err) {
                console.log('Error annotation add...', err)
            })
    },
    editAnnotation: function ({ commit }, payload) {
        var theVideo = payload.video
        
        axios.put("https://metalogon-api.herokuapp.com/rest/video/"+payload.id, theVideo)
            .then(response => {
            })
            .catch(function (err) {
                console.log('Error annotation edit...', err)
            })
    },
    deleteAnnotation: function ({ commit }, payload) {
        var theVideo = payload.video
        
        axios.put("https://metalogon-api.herokuapp.com/rest/video/"+payload.id, theVideo)
            .then(response => {
                theVideo.annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );                    
            })
            .catch(function (err) {
                console.log('Error annotation delete...', err)
            })
    },
    /* CLASSES */  
    getAllClasses: function ({ commit }) {
        axios.get("http://localhost:3000/classes")
            .then(function (response)
            {
                commit('GET_ALL_CLASSES', response.data)
                commit('CREATE_ACTIVE_ARCHIVED_CLASSES' )
                commit('CREATE_STUDENT_CLASSES' )
                
            })
            .catch(function (err) {
                $('.classes').html(errorHTML)
            })
    },
    getClass: function ({ commit }, payload) {
        axios.get("https://metalogon-api.herokuapp.com/rest/class/" +payload)
            .then(function (response)
            {
                commit('GET_CLASS', response.data.data )
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    createClass: function ({ commit }, payload) {
        axios.post("http://localhost:3000/classes", payload.newClass)
        .then(response => {
            commit('CREATE_CLASS', payload)
        })
        .catch(function (err) {
            console.log('Error createClass()', err)
        })
    },
    archiveClass: function ({ commit }, payload) {
        axios.put("http://localhost:3000/classes/"+payload.classId, payload.classObject)
        .then(response => {
            commit('ARCHIVE_CLASS', payload)
        })
        .catch(function (err) {
            console.log('archiveClass() action error: ', err)
        })
    },
},
mutations: {
    /* VIDEOS */
    GET_ALL_VIDEOS: (state, newVideos) => {
        loadingInstance.close()
        state.videos = newVideos
        state.videos.sort(function(a,b) {return (a.presentedAt < b.presentedAt) ? 1 : ((b.presentedAt < a.presentedAt) ? -1 : 0);} );
        for (var i = 0, l = state.videos.length; i < l; i++) {
            Vue.set(state.videos[i], 'featured', false)
        }
    },
    FAVORITE_VIDEO: (state, payload) => {
        for (var i = 0, l = state.videos.length; i < l; i++) {
            if (state.videos[i].title === payload.title) {
                // Vue.set(state.videos[i], 'featured', true)
                console.log(state.videos[i].title)
                console.log(state.videos[i])
            }
        }
    },
    UNFAVORITE_VIDEO: (state, payload) => {
        for (var i = 0, l = state.videos.length; i < l; i++) {
            if (state.videos[i].title === payload) {
                Vue.set(state.videos[i], 'featured', false)
                console.log(state.videos[i].title)
                console.log(state.videos[i])
            }
        }
    },
    GET_VIDEO: (state, video) => {
        loadingInstance.close()
        state.videos = video
    },
    GET_VIDEO_ANNOTATIONS: (state, newAnnos) => {
        state.videos.annotations = newAnnos
    },
    CREATE_VIDEO: (state, payload) => {
        var videos = state.videos
        videos.push(payload)
    },
    EDIT_VIDEO: (state, payload) => {
        var videos = state.videos
        for (var i=0, l = state.videos.length; i < l; i++) {
            if (videos[i].id === payload.videoId) {
                
            } 
        }
        
        videos.push(payload)
    },
    DELETE_VIDEO: (state, payload) => {
        var videos = state.videos
        for (var i=0, l = annotations.length; i < l; i++) {
            if (videos[i].id === payload.video.id)
                videos.splice(i, 1)              
        }
    },
    // Not used.
    GET_CLASS_VIDEOS: (state, classTitle) => {
        for (var i=0, l = state.videos.length; i < l; i++) {
            if (state.videos[i].class !== classTitle) 
                state.videos.splice(i,1)
        }
    },
    // Not used.
    CREATE_UPLOAD_URL: (state, payload) => {      
        state.uploadUrl = payload.link.protocol + '://' + payload.link.address + payload.link.path + '?api_format=xml&key=' + payload.link.query.key + '&token=' + payload.link.query.token
    },
    /* ANNOTATIONS */
    // Not used.
    ADD_ANNOTATION: (state, payload) => {
        var annotations = state.videos.annotations
        // Sorting annotations[] by from property
        annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );
    },
    EDIT_ANNOTATION: (state, payload) => {
        var currentAnnotation = state.videos[payload.id].annotations[payload.cardID]
        var annotations = state.videos[payload.id].annotations
        
        currentAnnotation.rating = payload.rating
        currentAnnotation.comment = payload.comment
        currentAnnotation.from = payload.from
        currentAnnotation.to = payload.to
        
        // Sorting annotations[] by from property
        annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );
        
        var url = "http://localhost:3000/videos/" + payload.id
        axios.put(url, payload.videoObj)
        .then(response => {
            console.log(payload.videoObj)
            console.log('Success edit!')
        })
        .catch(function (err) {
            console.log('Error annotation edit...')
        })
    },
    DELETE_ANNOTATION: (state, payload) => {
        var annotations = state.videos.annotations
        
        for (var i=0, l = annotations.length; i < l; i++) {
            if (annotations[i].id === payload.video.videoAnnotations._id)
                annotations.splice(i, 1)
        }
    },
    SORT_ANNOTATIONS: (state) => {
        var annotations = state.videos.annotations
        annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );
    },
    /* CLASSES */ 
    GET_ALL_CLASSES: (state, theClasses) => {
        loadingInstance.close()
        state.classes = theClasses
    },
    GET_CLASS: (state, theClass) => {
        loadingInstance.close()
        state.classes = theClass
    },
    // Professor only.
    CREATE_CLASS: (state, payload) => {
        state.classes.push(payload.newClass)
        state.activeClasses.push(payload.newClass)
    },
    // Student only. Not completed.
    ENROLL_TO_CLASS: (state, payload) => {
        // state.classes.push(payload.newClass)
        state.activeClasses.push(payload)
    },
    CREATE_ACTIVE_ARCHIVED_CLASSES: (state) => {
        state.activeClasses = []
        state.archivedClasses = []
        for (var i = 0, l = state.classes.length; i < l; i++) {
            if (state.classes[i].archived === false)
                state.activeClasses.push(state.classes[i])
            else
                state.archivedClasses.push(state.classes[i])
        }
    },
    CREATE_STUDENT_CLASSES: (state) => {
        state.studentClasses = []
        for (var i = 0, l = state.classes.length; i < l; i++) {
            state.studentClasses.push(state.classes[i])
        }
    },
    ARCHIVE_CLASS: (state, payload) => {
        var classes = state.classes
        for (var i = 0, l = state.activeClasses.length; i < l; i++) {
            if (state.activeClasses[i].id === payload.classId) {
                state.activeClasses.splice(i, 1)
                state.archivedClasses.push(payload.classObject)
            }
        }
    },
    // Is used for search functionality.
    FILTER_ACTIVE_CLASSES: (state, inputValue) => {
        // An array that helps for the filtering.
        const activeClassesLocal = []
        for (var i = 0, l = state.classes.length; i < l; i++) {
            if (state.classes[i].archived === false)
                activeClassesLocal.push(state.classes[i])
        }

        // Define the filter method that will be used above.
        var filterClasses = (queryString) => {
            return (theClass) => {
                return theClass.name.toLowerCase().indexOf(queryString) === 0
            }
        }  
        state.activeClasses = activeClassesLocal.filter(filterClasses(inputValue))
    },
    // Is used for search functionality.    
    FILTER_ARCHIVED_CLASSES: (state, inputValue) => {
        // An array that helps for the filtering.
        const archivedClassesLocal = []
        for (var i = 0, l = state.classes.length; i < l; i++) {
            if (state.classes[i].archived === true)
            archivedClassesLocal.push(state.classes[i])
        }

        // Define the filter method that will be used above.
        var filterClasses = (queryString) => {
            return (theClass) => {
                return theClass.name.toLowerCase().indexOf(queryString) === 0
            }
        }  
        state.archivedClasses = archivedClassesLocal.filter(filterClasses(inputValue))
    },
    // Is used for search functionality.    
    FILTER_STUDENT_CLASSES: (state, inputValue) => {
        // An array that helps for the filtering.
        const studentClassesLocal = []
        for (var i = 0, l = state.classes.length; i < l; i++) {
            studentClassesLocal.push(state.classes[i])
        }

        // Define the filter method that will be used above.
        var filterClasses = (queryString) => {
            return (theClass) => {
                return theClass.name.toLowerCase().indexOf(queryString) === 0
            }
        }  
        state.studentClasses = studentClassesLocal.filter(filterClasses(inputValue))
    },
    SET_UPLOAD_URL: (state, payload) => {
        state.uploadUrl = payload
    }
},
getters: {
    videos: state => {
        return state.videos
    },
    classes: state => {
        return state.classes
    },
    currentVideoID: state => {
        return state.currentVideoID
    },
    canons: state => {
        return state.canons
    },
    activeClasses: state => {
        return state.activeClasses
    },
    archivedClasses: state => {
        return state.archivedClasses
    },
    studentClasses: state => {
        return state.studentClasses
    },
    uploadVideoProps: state => {
        return state.uploadVideoProps
    },
    uploadUrl: state => {
        return state.uploadUrl
    },
    uploadingVideo: state => {
        return state.uploadingVideo
    }
}
})

    // LOAD_JW_VIDEOS: function ({ commit, state }) {
    //     for (var i=0; i < state.playlistIDs.length; ++i) {
    //         var url = 'https://cdn.jwplayer.com/v2/playlists/' + state.playlistIDs[i]

    //         axios.get(url)
    //             .then(function (response)
    //             {
    //                 // Here we commit a mutation
    //                 // videos is a parameter of the mutation
    //                 commit('SET_JW_VIDEOS', { videos: response.data })
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     } 
    // }

    // MUTATIONS
    // CALCULATE_TOTAL_GRADES: (state, payload) => {
    //     var annotations = state.videos[payload.id].annotations
    //     var sumRating = []

    //     for (var i=0, l = annotations.length; i < l; i++) {
    //         sumRating[i] = sumRating[i] + annotations[i].rating
    //     }
    //     // for (var i=0, l = annotations.length; i < l; i++) { 
    //     //     sumRating[i] = sumRating[i] / annotations[i].length
    //     // }
    //     // console.log('SUM RATING = ' + sumRating[0])
        
    // },
    // retrieveVideosByClass: (state, className) => {
    //     for (var i=0; i < state.videos.length; i++) {
    //         if (state.videos[i].class != className) {
    //             state.videos.pop(state.videos[i])
    //         }
    //     }
    // }

    // SORTING ARRAY BY FROM PROPERTY 
    // function compare(a,b) {
    //     if (a.from < b.from)
    //         return -1;
    //     if (a.from > b.from)
    //         return 1;
    //     return 0;
    // }
    // annotations.sort(compare);