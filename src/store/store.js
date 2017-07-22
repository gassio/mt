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
                "link": "http://content.jwplatform.com/videos/G4mlZSx4-mOPkLg6c.mp4",
                "thumb": "http://content.jwplatform.com/thumbs/G4mlZSx4-720.jpg",
                "sources": [
                             {
                    "width": 1280,
                    "type": "application/vnd.apple.mpegurl",
                    "file": "https://cdn.jwplayer.com/manifests/G4mlZSx4.m3u8",
                    "height": 720
                    },
                    {
                        "width": 320,
                        "height": 180,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/G4mlZSx4-t89KRkmF.mp4",
                        "label": "180p"
                    },
                    {
                        "width": 480,
                        "height": 270,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/G4mlZSx4-3gtc2psT.mp4",
                        "label": "270p"
                    },
                    {
                        "width": 720,
                        "height": 406,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/G4mlZSx4-mOPkLg6c.mp4",
                        "label": "406p"
                    },
                    {
                        "width": 1280,
                        "height": 720,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/G4mlZSx4-ASGnrRDI.mp4",
                        "label": "720p"
                    },
                    {
                        "type": "audio/mp4",
                        "file": "https://cdn.jwplayer.com/videos/G4mlZSx4-1smvQZjW.m4a",
                        "label": "AAC Audio"
                    }
                        ],
                "duration": "355",
                "jwVideoID": "G4mlZSx4", // mediaID
                "jwPlaylistID": "k5WSiplm", // k5WSiplm
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
                        "comment": "Lorem hahah",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 1
                    },
                    {
                        "category": "Terms",
                        "canon": "Structure",
                        "comment": "Lorem hahah",
                        "from": "03:32",
                        "to": "03:56",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 2
                    },
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "Lorem hahah",
                        "from": "05:21",
                        "to": "06:23",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 3
                    },
                    {
                        "category": "Volume",
                        "canon": "Delivery",
                        "comment": "Lorem hahah",
                        "from": "07:43",
                        "to": "10:58",
                        "rating": "4",
                        "author": "Ben Domino",
                        "id": 4
                    }
                ]
            },
            {
                "title": "Don't Follow Your Passion",
                "videoID": 1,
                "link": "https://cdn.jwplayer.com/previews/gj1SyIed",
                "thumb": "https://cdn.jwplayer.com/thumbs/gj1SyIed-720.jpg",
                "sources": [
                    {
                        "width": 1280,
                        "type": "application/vnd.apple.mpegurl",
                        "file": "https://cdn.jwplayer.com/manifests/gj1SyIed.m3u8",
                        "height": 720
                    },
                    {
                        "width": 320,
                        "height": 180,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/gj1SyIed-t89KRkmF.mp4",
                        "label": "180p"
                    },
                    {
                        "width": 480,
                        "height": 270,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/gj1SyIed-3gtc2psT.mp4",
                        "label": "270p"
                    },
                    {
                        "width": 720,
                        "height": 406,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/gj1SyIed-mOPkLg6c.mp4",
                        "label": "406p"
                    },
                    {
                        "width": 1280,
                        "height": 720,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/gj1SyIed-ASGnrRDI.mp4",
                        "label": "720p"
                    },
                    {
                        "type": "audio/mp4",
                        "file": "https://cdn.jwplayer.com/videos/gj1SyIed-1smvQZjW.m4a",
                        "label": "AAC Audio"
                    }
                ],
                "duration": "904",
                "jwVideoID": "gj1SyIed", // mediaID
                "jwPlaylistID": "k5WSiplm", // k5WSiplm
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
                "jwPlaylistID": "k5WSiplm",
            },
            {
                "title": "Mathematics Class",
                "section": "16.S979",
                "spring": 'Spring 17',
                "videosCount": "22",
                "classID": "2",
                "jwPlaylistID": "k5WSiplm",
            },
           
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