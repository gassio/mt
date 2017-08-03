<template>
    <div class="app">
        <my-header></my-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import { eventBus } from './main'
    import MyHeader from './components/Layout/MyHeader.vue'

    export default {
        created() {
            // this.fetchClasses()
        },
        mounted() {
            // for (var i=0; i < eventBus.feeds.length; ++i) {
            //     var url = 'https://cdn.jwplayer.com/v2/playlists/' + eventBus.feeds[i]

            //     this.axios.get(url)
            //         .then(function (response)
            //         {
            //             var title = response.data.title;
            //             eventBus.playlistNames.push(title)

            //             var playlist = response.data.playlist

            //             for (var i=0; i < playlist.length; ++i) {
            //                 var video = { 
            //                     vidTitle: playlist[i].title, 
            //                     vidLink: playlist[i].link, 
            //                     vidThumb: playlist[i].image, 
            //                     vidDuration: playlist[i].duration, 
            //                     vidDesc: playlist[i].description, 
            //                     vidStudent: playlist[i].student, 
            //                     playlistID: playlist[i].feedid,
            //                     videoID: playlist[i].mediaid,
            //                     vidSources: playlist[i].sources,
            //                     vidPlaylistName: title,
            //                     vidAnnotations: eventBus.allAnnotations
            //                 }
            //                 eventBus.videos.push(video)
            //             }
            //         })
            //         .catch(function (error) {
            //             console.log(error)
            //         })
            // }  
        },
        methods: {
            // JSON call in order to fetch the playlists (classes) of JW database
            // feeds[] are playlist ids
            fetchClasses() {
                var that = this
                for (var i=0; i < this.playlistIDs.length; ++i) {
                    var url = 'https://cdn.jwplayer.com/v2/playlists/' + this.playlistIDs[i]

                    this.axios.get(url)
                        .then(function (response) {
                            var title = response.data.title;
                            that.$store.state.playlistNames.push(title)

                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                } 
            },
        },
        computed: {
            // Store: playlistIDs[] array
            playlistIDs() {
                return this.$store.state.playlistIDs
            }
        },
        components: {
            'my-header': MyHeader
        }
    }
</script>

<style>
    body {
        font-family: 'Source Sans Pro', 'Proxima Nova Alt', 'Segoe UI', sans-serif;
        font-weight: 400;
        line-height: 24px;
        height: 100%;
    }

    a {
        color: #FFF;
    }

    .app {
      width: 100%; 
      height: 100%;
      padding: 0;
      margin: 0;
    }

        .head {

        }

        .content {
            margin: auto 120px;
        }

    .fx-dir-col {
        flex-direction: column !important;
    }

    .fx-dir-row {
        flex-direction: row !important;
    }

</style>
