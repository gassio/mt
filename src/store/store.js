import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// test

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
                    ]
                },
                { 
                    name: 'Results and Discussion',
                    mvs: [
                        { desc: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research'},
                        { desc: 'States the value of the present research and explains why it was conducted'},
                        { desc: 'Discusses the definitions of key terms  '},
                        { desc: 'Summarizes and previews the methods used '},
                        { desc: 'Presents basic equations'},
                    ]
                },
                { 
                    name: 'Conclusion',
                    mvs: [
                        { desc: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research'},
                        { desc: 'States the value of the present research and explains why it was conducted'},
                        { desc: 'Discusses the definitions of key terms  '},
                        { desc: 'Summarizes and previews the methods used '},
                        { desc: 'Presents basic equations'},
                    ]
                },
                { 
                    name: 'Question and Answer',
                    mvs: [
                        { desc: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research'},
                        { desc: 'States the value of the present research and explains why it was conducted'},
                        { desc: 'Discusses the definitions of key terms  '},
                        { desc: 'Summarizes and previews the methods used '},
                        { desc: 'Presents basic equations'},
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
        user: [ 
            {
                firstName: 'Nikos',
                lastName: 'Dimitriou',
                email: 'nikos@gmail.com',
                password: '123',
                type: 'admin' // admin, professor, technical-instructor, communicational-instructor, student, 
            }
        ],
        currentVideoID: null,
    },
    mutations: {
        ADD_ANNOTATION: (state, payload) => {
            var annotations = state.videos[payload.id].annotations
            annotations.push(payload.annotation)

            // Sorting annotations[] by from property
            annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );

            var url = "http://localhost:3000/videos/" + payload.id
            axios.put(url, payload.videoObj)
                .then(response => {
                    console.log(payload.videoObj)
                    console.log('Success annotate!')
                })
                .catch(function (err) {
                    console.log('Error annotation add...')
                })
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
        // DELETE
        DELETE_ANNOTATION: (state, payload) => {
            var annotations = state.videos[payload.id].annotations

            for (var i=0, l = annotations.length; i < l; i++) {
                if (annotations[i].id === payload.cardID) {
                    annotations.splice(i, 1)
                    break
                }
            }

            var url = "http://localhost:3000/videos/" + payload.id
            axios.put(url, payload.videoObj)
                .then(response => {
                    console.log(payload.videoObj) // state.videos[payload.id]
                    console.log('Success delete!')
                })
                .catch(function (err) {
                    console.log('Error annotation delete...')
                })
        },
        ADD_CLASS: (state, payload) => {
            var classes = state.classes
            classes.push(payload.newClassObj)
        },
        UPLOAD_VIDEO: (state, payload) => {
            state.videos.push(payload)
        },
        setCurrentVideoID: (state, id) => {
            state.currentVideoID = id
        },
        FETCH_VIDEOS: (state, newVideos) => {
            state.videos = newVideos
        },
        FETCH_CLASSES: (state, newClasses) => {
            state.classes = newClasses
        }
    },
    actions: {
        fetchVideos: function ({ commit }) {
            axios.get("http://localhost:3000/videos")
                .then(function (response)
                {
                    commit('FETCH_VIDEOS', response.data )
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        uploadVideo: function ({ commit }, payload) {
             axios.post("http://localhost:3000/videos", payload)
                .then(function (response)
                {
                    commit('UPLOAD_VIDEO', payload)
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        fetchClasses: function ({ commit }) {
            axios.get("http://localhost:3000/classes")
                .then(function (response)
                {
                    commit('FETCH_CLASSES', response.data )
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        addClass: function ({ commit }, payload) {
            axios.post("http://localhost:3000/classes/", payload.newClassObj)
            .then(response => {
                commit('ADD_CLASS', payload)
            })
            .catch(function (err) {
                console.log('Oxi addClass()')
            })
        },
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
        }
    }
})

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