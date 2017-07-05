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
                "title": "Test",
                "videoID": 1,
                "link": "https://cdn.jwplayer.com/previews/wUu9NAdZ",
                "thumb": "https://cdn.jwplayer.com/thumbs/wUu9NAdZ-720.jpg",
                "sources": [
                            {
                                "width": 1280,
                                "type": "application/vnd.apple.mpegurl",
                                "file": "https://cdn.jwplayer.com/manifests/wUu9NAdZ.m3u8",
                                "height": 720
                            },
                            {
                                "width": 320,
                                "height": 180,
                                "type": "video/mp4",
                                "file": "https://cdn.jwplayer.com/videos/wUu9NAdZ-2thAkUNK.mp4",
                                "label": "180p"
                            },
                            {
                                "width": 480,
                                "height": 270,
                                "type": "video/mp4",
                                "file": "https://cdn.jwplayer.com/videos/wUu9NAdZ-I7QHntgN.mp4",
                                "label": "270p"
                            },
                            {
                                "width": 720,
                                "height": 406,
                                "type": "video/mp4",
                                "file": "https://cdn.jwplayer.com/videos/wUu9NAdZ-bjE4cNUM.mp4",
                                "label": "406p"
                            },
                            {
                                "width": 1280,
                                "height": 720,
                                "type": "video/mp4",
                                "file": "https://cdn.jwplayer.com/videos/wUu9NAdZ-2v7o7MEI.mp4",
                                "label": "720p"
                            },
                            {
                                "type": "audio/mp4",
                                "file": "https://cdn.jwplayer.com/videos/wUu9NAdZ-lJqrUNGH.m4a",
                                "label": "AAC Audio"
                            }
                        ],
                "duration": "90",
                "jwVideoID": "wUu9NAdZ",
                "jwPlaylistID": "ccPaHVIt",
                "class": "NasaClass",
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
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "Lorem hahah",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino"
                    }
                ]
            },
            {
                "title": "Rabbit-video",
                "videoID": 2,
                "link": "https://cdn.jwplayer.com/previews/d3LzLrAf",
                "thumb": "https://cdn.jwplayer.com/thumbs/d3LzLrAf-720.jpg",
                "sources": [
                    {
                        "width": 320,
                        "type": "application/vnd.apple.mpegurl",
                        "file": "https://cdn.jwplayer.com/manifests/d3LzLrAf.m3u8",
                        "height": 180
                    },
                    {
                        "width": 320,
                        "height": 180,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/d3LzLrAf-2thAkUNK.mp4",
                        "label": "180p"
                    },
                    {
                        "type": "audio/mp4",
                        "file": "https://cdn.jwplayer.com/videos/d3LzLrAf-lJqrUNGH.m4a",
                        "label": "AAC Audio"
                    }
                ],
                "duration": "13",
                "jwVideoID": "d3LzLrAf",
                "jwPlaylistID": "ccPaHVIt",
                "class": "NasaClass",
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
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "Lorem hahah",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino"
                    }
                ]
            },
            {
                "title": "Nasa presentation",
                "videoID": 3,
                "link": "https://cdn.jwplayer.com/previews/1zZ9ACm3",
                "thumb": "https://cdn.jwplayer.com/thumbs/1zZ9ACm3-720.jpg",
                "sources": [
                    {
                        "width": 1280,
                        "type": "application/vnd.apple.mpegurl",
                        "file": "https://cdn.jwplayer.com/manifests/1zZ9ACm3.m3u8",
                        "height": 720
                    },
                    {
                        "width": 320,
                        "height": 180,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-2thAkUNK.mp4",
                        "label": "180p"
                    },
                    {
                        "width": 480,
                        "height": 270,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-I7QHntgN.mp4",
                        "label": "270p"
                    },
                    {
                        "width": 720,
                        "height": 406,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-bjE4cNUM.mp4",
                        "label": "406p"
                    },
                    {
                        "width": 1280,
                        "height": 720,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-2v7o7MEI.mp4",
                        "label": "720p"
                    },
                    {
                        "type": "audio/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-lJqrUNGH.m4a",
                        "label": "AAC Audio"
                    }
                ],
                "duration": "59",
                "jwVideoID": "1zZ9ACm3",
                "jwPlaylistID": "ccPaHVIt",
                "class": "NasaClass",
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
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "Lorem hahah",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino"
                    }
                ]
            },
            {
                "title": "Nasa presentation",
                "videoID": 4,
                "link": "https://cdn.jwplayer.com/previews/1zZ9ACm3",
                "thumb": "https://cdn.jwplayer.com/thumbs/1zZ9ACm3-720.jpg",
                "sources": [
                    {
                        "width": 1280,
                        "type": "application/vnd.apple.mpegurl",
                        "file": "https://cdn.jwplayer.com/manifests/1zZ9ACm3.m3u8",
                        "height": 720
                    },
                    {
                        "width": 320,
                        "height": 180,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-2thAkUNK.mp4",
                        "label": "180p"
                    },
                    {
                        "width": 480,
                        "height": 270,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-I7QHntgN.mp4",
                        "label": "270p"
                    },
                    {
                        "width": 720,
                        "height": 406,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-bjE4cNUM.mp4",
                        "label": "406p"
                    },
                    {
                        "width": 1280,
                        "height": 720,
                        "type": "video/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-2v7o7MEI.mp4",
                        "label": "720p"
                    },
                    {
                        "type": "audio/mp4",
                        "file": "https://cdn.jwplayer.com/videos/1zZ9ACm3-lJqrUNGH.m4a",
                        "label": "AAC Audio"
                    }
                ],
                "duration": "59",
                "jwVideoID": "1zZ9ACm3",
                "jwPlaylistID": "O2LEnFP4",
                "class": "Mathematics Class",
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
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Graphics",
                        "canon": "Visual",
                        "comment": "Lorem hahah",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino"
                    }
                ]
            }
        ],
        classes: [
             {
                "title": "NasaClass",
                "section": "16.S982",
                "spring": 'Spring 17',
                "videosCount": "34",
                "classID": "1",
                "jwPlaylistID": "ccPaHVIt",
            },
            {
                "title": "Mathematics-Class",
                "section": "6.W482",
                "spring": 'Spring 16',
                "videosCount": "6",
                "classID": "2",
                "jwPlaylistID": "ccPaHVIt",
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
        currentVideoID: null
    },
    mutations: {
        setCurrentVideoID: (state, id) => {
            state.currentVideoID = id
        },
        ADD_ANNOTATION: (state, payload) => {
            state.videos[payload.id].annotations.push(payload.annotation)
            console.log(state.videos)
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