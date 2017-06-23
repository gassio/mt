<template>
    <div class="classes container">
        <h3>Classes</h3>
        <div class="row">
            <div class="col-xs-6 col-md-3 thumbnail" v-for="p in playlistNames">
                <router-link :to=" 'classes/' + p.replace(/ /g, '-') " tag="a">{{ p }}</router-link>
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
                playlistNamesURI: [],
                videos: eventBus.videos,
            }
        },
        mounted() {

            for (var i=0; i < this.playlistNames.length; ++i) {
                this.playlistNamesURI[i] = this.playlistNames[i]
            }
            for (var i=0; i < this.playlistNamesURI.length; ++i) {
                this.playlistNamesURI[i] = this.playlistNamesURI[i].replace(/ /g, "-")
            }

            console.log(this.playlistNames)
            console.log("URI")
            console.log(this.playlistNamesURI)
        }
    }
</script>

<style>
    .thumbnail a {
        color: #A90931
    }

</style>
