<template>
    <div class="decide-home">
    </div>
</template>

<script>
    export default {
        name: 'DecideHome',
        mounted() {
            const m = this.$root.$options.myAuth
            const role = m.getAuthData().data.role_id

            console.log('decidehome: ', m)
            console.log('decidehome: ', role)

            // this.$router.push('/' + role)
        }
    }
</script>

<style>

</style>
