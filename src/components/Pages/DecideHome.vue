<template>
    <div class="decide-home">
    </div>
</template>

<script>
    export default {
        name: 'DecideHome',
        mounted() {
            const m = this.$root.$options.myAuth
            const role = m.getAuthData()

            console.log(m)
            console.log(role)

            // this.$router.push('/' + role)
        }
    }
</script>

<style>

</style>
