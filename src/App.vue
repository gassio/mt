<template>
    <div class="app" v-cloak>
        <my-header></my-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import { eventBus } from './main'
    import MyHeader from './components/Layout/MyHeader.vue'

    export default {
        mounted() { 
        },
        methods: {
        },
        computed: {
            // Store: playlistIDs[] array
            playlistIDs() {
                return this.$store.state.playlistIDs
            }
        },
        components: {
            'my-header': MyHeader
        }
    }
</script>

<style>

    [v-cloak] > * { 
        display:none; 
    }
    [v-cloak]::before { 
        content: " ";
        display: block;
        width: 16px;
        height: 16px;
        background-image: url('data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==');
    }

    body {
        font-family: 'Source Sans Pro', 'Proxima Nova Alt', 'Segoe UI', sans-serif;
        font-weight: 400;
        line-height: 24px;
        height: 100%;
    }

    a {
        color: #FFF;
    }

    .app {
      width: 100%; 
      height: 100%;
      padding: 0;
      margin: 0;
    }

        .head {

        }

        .content {
            margin: auto 120px;
        }

    .fx-dir-col {
        flex-direction: column !important;
    }

    .fx-dir-row {
        flex-direction: row !important;
    }

</style>
