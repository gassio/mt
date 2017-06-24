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
        mounted() {
            for (var i=0; i < eventBus.feeds.length; ++i) {
                var url = 'https://cdn.jwplayer.com/v2/playlists/' + eventBus.feeds[i]

                this.axios.get(url)
                    .then(function (response)
                    {
                        var title = response.data.title;
                        eventBus.playlistNames.push(title)

                        var playlist = response.data.playlist

                        for (var i=0; i < playlist.length; ++i) {
                            var video = { 
                                vidTitle: playlist[i].title, 
                                vidLink: playlist[i].link, 
                                vidThumb: playlist[i].image, 
                                vidDuration: playlist[i].duration, 
                                vidDesc: playlist[i].description, 
                                vidStudent: playlist[i].student, 
                                playlistID: playlist[i].feedid,
                                videoID: playlist[i].mediaid,
                                vidSources: playlist[i].sources,
                                vidPlaylistName: title,
                                // here is going to put the card object
                                vidCards: [
                                    { title: 'Posture & Stance', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', from: '03:05', to: '03:17', rating: '3' },
                                    { title: 'Volume, rate and pitch', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat sunt pariatur, perferendis..', from: '03:05', to: '03:17', rating: '3' },
                                ]
                            }
                            eventBus.videos.push(video)
                        }
                        console.log(video)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            
            console.log(eventBus.videos)
        },
        components: {
            'my-header': MyHeader
        }
    }
</script>

<style>
    body {
        font-family: 'Proxima Nova Alt';
        font-weight: 500;
    }

    a {
        color: #FFF;
    }

    .app {
      width: 100%; 
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
