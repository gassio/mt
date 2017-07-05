<template>
    <div class="classes container">
        <h3>Classes</h3>
        <div class="row">
            <div class="col-xs-6 col-md-3 thumbnail classaki" v-for="c in classes">
                <router-link :to="'classes/' + c.title.replace(/ /g, '-')" tag="a"><strong>{{ c.title }}</strong> | {{c.section}} | {{c.spring}} | {{c.videosCount}} videos</router-link>
            </div>
        </div>

        <router-view></router-view>
    </div>      
</template>

<script>    
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
            classes() {
                return this.$store.getters.classes
            }
        },
    }
</script>

<style>
    .thumbnail a {
        color: #A90931
    }
    .classaki {
        background-color: yellow;
        height: 200px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
