import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // JWPlayer DB
        // playlistIDs: ['ccPaHVIt'], // For the phase 1 we will use only one playlist/class
        // playlistNames: ['Mathematics Class', 'NasaClass'],
        // classNames: ['Mathematics Class', 'NasaClass'],        
        // MongoDB
        videos: [
            {
                "title": "How To Sound Smart In Your Tedx Talk",
                "videoID": 0,
                "link": "http://content.jwplatform.com/videos/BYmoWNeA-DgOi1siB.mp4",
                "thumb": "http://content.jwplatform.com/thumbs/BYmoWNeA-720.jpg",
                "sources": [
                    {
                        "width": 720,
                        "type": "application/vnd.apple.mpegurl",
                        "file": "https://cdn.jwplayer.com/manifests/BYmoWNeA.m3u8",
                        "height": 406
                    },
                    {
                        "width": 320,
                        "height": 180,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/BYmoWNeA-S2DagQP7.mp4",
                        "label": "180p"
                    },
                    {
                        "width": 480,
                        "height": 270,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/BYmoWNeA-9B9NyP5t.mp4",
                        "label": "270p"
                    },
                    {
                        "width": 720,
                        "height": 406,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/BYmoWNeA-DgOi1siB.mp4",
                        "label": "406p"
                    },
                    {
                        "type": "audio/mp4",
                        "file": "https://cdn.jwplayer.com/videos/BYmoWNeA-BX5mUTQc.m4a",
                        "label": "AAC Audio"
                    }
                ],
                "duration": "355",
                "jwVideoID": "BYmoWNeA", // mediaID
                "jwPlaylistID": "2INkSmd7",
                "class": "Material Science Engineering",
                "categories": [
                    {
                        "name": "Posture & Stance",
                        "description": "Posture and stance project confidence, and allow speaker to interact with audience and screen",
                        "canon": "Delivery"
                    }
                ],
                "annotations": [
                    {
                        "category": "Posture & Stance",
                        "canon": "Delivery",
                        "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..",
                        "from": "00:08",
                        "to": "00:17",
                        "rating": "3",
                        "author": "Ben Domino",
                        "id": 0
                    },
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 1
                    },
                    {
                        "category": "Terms",
                        "canon": "Structure",
                        "comment": "There are many variations of passages of Lorem Ipsum available.",
                        "from": "03:32",
                        "to": "03:56",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 2
                    },
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                        "from": "05:21",
                        "to": "06:23",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 3
                    }
                ]
            },
            {
                "title": "Programming Your Mind For Success",
                "videoID": 1,
                "link": "https://cdn.jwplayer.com/previews/OTEe0Dn3",
                "thumb": "https://cdn.jwplayer.com/thumbs/OTEe0Dn3-720.jpg",
                "sources": [
                    {
                        "width": 1280,
                        "type": "application/vnd.apple.mpegurl",
                        "file": "https://cdn.jwplayer.com/manifests/OTEe0Dn3.m3u8",
                        "height": 720
                    },
                    {
                        "width": 320,
                        "height": 180,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/OTEe0Dn3-S2DagQP7.mp4",
                        "label": "180p"
                    },
                    {
                        "width": 480,
                        "height": 270,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/OTEe0Dn3-9B9NyP5t.mp4",
                        "label": "270p"
                    },
                    {
                        "width": 720,
                        "height": 406,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/OTEe0Dn3-DgOi1siB.mp4",
                        "label": "406p"
                    },
                    {
                        "width": 1280,
                        "height": 720,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/OTEe0Dn3-34JmzxrC.mp4",
                        "label": "720p"
                    },
                    {
                        "type": "audio/mp4",
                        "file": "https://cdn.jwplayer.com/videos/OTEe0Dn3-BX5mUTQc.m4a",
                        "label": "AAC Audio"
                    }
                ],
                "duration": "931",
                "jwVideoID": "OTEe0Dn3", // mediaID
                "jwPlaylistID": "2INkSmd7",
                "class": "Material Science Engineering",
                "categories": [
                    {
                        "name": "Posture & Stance",
                        "description": "Posture and stance project confidence, and allow speaker to interact with audience and screen",
                        "canon": "Delivery"
                    }
                ],
                "annotations": [
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "Lorem hahah",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 0
                    },
                    {
                        "category": "Terms",
                        "canon": "Structure",
                        "comment": "Lorem hahah",
                        "from": "03:32",
                        "to": "03:56",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 1
                    }
                ]
            }
        ],
        classes: [
            {
                "title": "Material Science Engineering",
                "section": "16.S982",
                "spring": 'Spring 17',
                "videosCount": "34",
                "classID": "1",
                "jwPlaylistID": "2INkSmd7",
            },
            // {
            //     "title": "Mathematics Class",
            //     "section": "16.S979",
            //     "spring": 'Spring 17',
            //     "videosCount": "22",
            //     "classID": "2",
            //     "jwPlaylistID": "k5WSiplm",
            // },   
        ],
        canons: [
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
            },
            { 
                name: 'Visual', 
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
                name: 'Style', 
                categories: [
                { 
                    name: 'Coherence ',
                    desc: 'To do...'
                },
                { 
                    name: 'Concision',
                    desc: 'To do...'
                },
                { 
                    name: 'Flow',
                    desc: 'To do...'
                },
                { 
                    name: 'Emphasis',
                    desc: 'To do...'
                },
                { 
                    name: 'Figures of Speech',
                    desc: 'To do...'
                },
                { 
                    name: 'Figures of Sound',
                    desc: 'To do...'
                },
                { 
                    name: 'Tropes',
                    desc: 'To do...'
                }
            ]
            },
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

        currentVideoID: null
    },
    mutations: {
        setCurrentVideoID: (state, id) => {
            state.currentVideoID = id
        },
        ADD_ANNOTATION: (state, payload) => {
            var annotations = state.videos[payload.id].annotations
            annotations.push(payload.annotation)

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

        },
        DELETE_ANNOTATION: (state, payload) => {
            var newAnnotations = state.videos[payload.id].annotations
            newAnnotations = newAnnotations.filter(function(a){
                return a.id !== payload.cardID
            })
            // Update annotations[]
            state.videos[payload.id].annotations = newAnnotations

            // Sorting annotations[] by from property
            newAnnotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} ); 
        },
        // future
        retrieveVideosByClass: (state, className) => {
            for (var i=0; i < state.videos.length; i++) {
                if (state.videos[i].class != className) {
                    state.videos.pop(state.videos[i])
                }
            }
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
        }
    }
})

        // ACTION
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


        // MUTATION
        // Sets the jw videos object in the state
        // SET_JW_VIDEOS: (state, { videos }) => {
        //     state.jwVideos = videos.playlist
        // },

        // SORTING ARRAY BY FROM PROPERTY 
        // function compare(a,b) {
        //     if (a.from < b.from)
        //         return -1;
        //     if (a.from > b.from)
        //         return 1;
        //     return 0;
        // }
        // annotations.sort(compare);