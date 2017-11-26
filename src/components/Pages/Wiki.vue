<template>
    <div class="wiki container">
        <h1>Coming soon.</h1>
        <button @click="createVideo()">Create video</button>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            createVideo() {
                this.$store.dispatch('createVideo', {
                    link: "http://www.google.com", 
                    duration: 135, 
                    key: '324key678'
                })
            }
        }
    }
</script>

<style>

</style>
