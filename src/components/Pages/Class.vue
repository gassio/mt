<template>
     <div class="class container">
     <h1>{{ classNames }}</h1>
        <router-link :to="{ path: '/classes'}">
            <button class="button is-warning"> <- Go back</button>
        </router-link>

        <h3>{{ replaceUnderscores(id) }}</h3>

        <div class="v-videos fx-dir-col">
            <div class="v-video fx-dir-row" v-for="vid in videos" v-if="vid.class === replaceUnderscores(id)">
                
                <router-link :to="'/video/' + vid.videoID"  tag="a" >
                    <img class="video-thumb" :src="vid.thumb">
                </router-link>
                <div class="video-meta">
                    <span class="video-title">Title: {{ vid.title }}</span>
                    <span class="video-duration">Duration: {{ vid.duration }}</span>
                    <p>----------------------------</p>
                    <span class="video-playlist">Playlist id: <strong>{{ vid.jwPlaylistID }}</strong></span>
                    <span class="video-id">Video id: {{ vid.videoID }}</span>
                    <span class="video-id">JW Video id: {{ vid.jwVideoID }}</span>
                </div>
            </div>
        </div>

        <router-view></router-view>
    </div>      
</template>

<script>
    export default {
        data() {
            return { 
                id: this.$route.params.id
            }
        },
        mounted(){
            // this.$store.commit('retrieveVideosByClass', this.id)
        },
        methods: {
            // setClasses() {
            //     this.$store.commit('setClasses')
            // },
            // fetchVideoByClass() {
            //     // to do: correct id in the URL
            //     var url = 'https://cdn.jwplayer.com/v2/playlists/' + this.playlistIDs[i]

            //     this.axios.get(url)
            //         .then(function (response)
            //         {
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
            // },
            replaceUnderscores(str) {
                return str.replace(/\-/g,' ')
            }
        },
        computed: {
            playlistIDs() {
                return this.$store.state.playlistIDs
            },
            videos() {
                return this.$store.state.videos
            },
            classNames() {
                return this.$store.state.classNames
            },
        },
    }
</script>

<style>
</style>