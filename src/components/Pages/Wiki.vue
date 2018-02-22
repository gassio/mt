<template>
    <div class="wiki">
			
        <my-header></my-header>

        <h1>Coming soon.</h1>
        <router-view></router-view>
    </div>
</template>

<script>
    import MyHeader from '../Layout/MyHeader.vue'
    
    export default {
        components: {
            'my-header': MyHeader
        }
    }
</script>

<style>

</style>
