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
                // playlistNamesURI: [],
            }
        },
        mounted() {
        },
        methods: {
            // It is not used because of line 6: 
            // <router-link :to=" 'classes/' + p.replace(/ /g, '-') " tag="a">{{ p }}</router-link>
            // fixPlaylistNames() {
            //     for (var i=0; i < this.playlistNamesURI.length; ++i) {
            //         this.playlistNamesURI[i] = this.playlistNamesURI[i].replace(/ /g, "-")
            //     }
            // }
        },
        computed: {
            // Store: playlistNames[] array
            playlistNames() {
                return this.$store.state.playlistNames
            }
        },
    }
</script>

<style>
    .thumbnail a {
        color: #A90931
    }

</style>
