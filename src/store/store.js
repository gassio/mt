import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // JWPlayer DB
        playlistIDs: ['ccPaHVIt', 'O2LEnFP4'], // playlist ids
        playlistNames: ['Mathematics Class', 'NasaClass'],
        // MongoDB
        videos: [
            {
                "title": "Rabbit-video",
                "videoID": "1",
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
                        "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..",
                        "from": "00:08",
                        "to": "00:17",
                        "rating": "3",
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Posture & Stance",
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
                "videoID": "2",
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
                        "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..",
                        "from": "00:08",
                        "to": "00:17",
                        "rating": "3",
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Posture & Stance",
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
                "videoID": "3",
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
                        "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..",
                        "from": "00:08",
                        "to": "00:17",
                        "rating": "3",
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Posture & Stance",
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
                "videoID": "4",
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
                        "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..",
                        "from": "00:08",
                        "to": "00:17",
                        "rating": "3",
                        "author": "Ben Domino"
                    },
                    {
                        "category": "Posture & Stance",
                        "comment": "Lorem hahah",
                        "from": "00:56",
                        "to": "01:23",
                        "rating": "4",
                        "author": "Ben Domino"
                    }
                ]
            }
        ],
        // classNames: [],
        classNames: ['Mathematics Class', 'NasaClass'],
        counter: 0
    },
    getters: {
        getClassNames: state => {
            return state.classNames
        },
    },
    mutations: {
        // setClasses: state => {
        //     for (var i=0; i < state.videos[i].length; i++) {
        //         state.classNames.push(state.videos[i].title)
        //     }
        // },
        inc: state => {
            state.counter++
        }
    }
        
})