<template>
     <div class="class container">
        <router-link :to="{ path: '/classes'}">
            <button class="button is-warning"> <- Go back</button>
        </router-link>

        <h3>{{ replaceUnderscores(id) }}</h3>

        <div class="v-videos fx-dir-col">
            <div class="v-video fx-dir-row" v-for="vid in videos" v-if="vid.vidPlaylistName === replaceUnderscores(id)">
                
                <router-link :to="'/video/' + vid.videoID"  tag="a" >
                    <img class="video-thumb" :src="vid.vidThumb">
                </router-link>
                <div class="video-meta">
                    <span class="video-title">Title: {{ vid.vidTitle }}</span>
                    <span class="video-duration">Duration: {{ vid.vidDuration }}</span>
                    <span class="video-desc">Description: {{ vid.vidDesc }}</span>
                    <span class="video-student">Student: {{ vid.vidStudent }}</span>
                    <p>----------------------------</p>
                    <span class="video-playlist">Playlist id: <strong>{{ vid.playlistID }}</strong></span>
                    <span class="video-id">Video id: {{ vid.videoID }}</span>
                </div>
            </div>
        </div>

        <router-view></router-view>
    </div>      
</template>

<script>
    import { eventBus } from '../../main'
    export default {
        data() {
            return { 
                feeds: eventBus.feeds,
                playlistNames: eventBus.playlistNames,
                videos: eventBus.videos,
                id: this.$route.params.id
            }
        },
        mounted(){

        },
        methods: {
            // getPlaylistVideos() {

            // },
            replaceUnderscores(str) {
                return str.replace(/\-/g,' ')
            }
        }
    }
</script>

<style>



</style>