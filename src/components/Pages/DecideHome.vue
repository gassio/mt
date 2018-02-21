<template>
    <div class="decide-home">
    </div>
</template>

<script>
    export default {
        name: 'DecideHome',
        mounted() {
            const role = this.$root.$options.myAuth.getAuthData().role_id
            this.$router.push('/' + role)
        }
    }
</script>

<style>

</style>
