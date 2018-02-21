<template>
    <div class="decide-home">
    </div>
</template>

<script>
    export default {
        name: 'DecideHome',
        mounted() {
            // const m = this.$root.$options.myAuth
            const role = this.$root.$options.myAuth.getAuthData().data.role_id
            this.$router.push('/' + role)

            // console.log('decidehome: ', m)
            // console.log('decidehome: ', role)

        }
    }
</script>

<style>

</style>
