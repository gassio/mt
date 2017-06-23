<template>
    <div class="content home container">

        <div class="tabs">
            <ul>
                <li class="is-active"><a>All videos</a></li>
                <li><a>Spring '17</a></li>
                <li><a>Winter '16</a></li>
            </ul>
        </div>

        <div class="v-videos">
            <div class="v-video" v-for="vid in videos" v-if="vid.vidStudent === 'Ben Domino'">
                <router-link :to="'/video/' + vid.videoID"  tag="a" >
                    <img class="video-thumb" :src="vid.vidThumb">
                </router-link>
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
</template>

<script>
    import { eventBus } from '../../main'

    export default {
        data() {
            return {
                videos: eventBus.videos
            }
        } 
    }
</script>

<style>
    .v-videos {
        display: flex;
    }
        .v-video {
            display: flex;
            flex-direction: column;
            padding-right: 54px;
        }

        .video-thumb {
            width: 100%;
        }

        .tabs {
            margin: 0;
            padding: 0;
            margin-top: 30px;
        }
            .tabs ul {
                padding: 0;
                margin: 0
            }

                li.is-active a {
                    color: #6B6B6B !important;
                }

</style>
