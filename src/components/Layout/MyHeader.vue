<template>
    <nav class="head navbar" role="navigation">
        <div class="container">

            <div class="navbar-brand">
                <router-link to="/" tag="span" class="navbar-item">
                    <img src="../../assets/logo-white.png" width="112" height="28">
                </router-link>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active" exact>Home</router-link>
                    <router-link to="/classes" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Classes</router-link>
                    <router-link to="/wiki" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Wiki</router-link>
                    <router-link to="/library" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Library</router-link>
                    <router-link to="/admin" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">admin</router-link>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item"></div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
            }
        },
        methods: {
            // Setting uploading video dialog state as true.
            setUploadingVideoAsTrue() {
                this.$store.commit('SET_UPLOADING_VIDEO_AS_TRUE')
            }
        },
        computed: {
            ...mapGetters([
				'uploadingVideo'
            ])
        },
    }
</script>

<style>

.head {
    /* width: 100%; */
    /* height: 60px; */
    /* color: #FFF; */
    background-color: #A90931;
    display: flex;
}

    .head__logo {
        padding-top: 20px;
        font-size: 24px;
        font-weight: bold;
    }
        .head__logo i {
            color: #FFF;
            padding-right: 5px;
        }

    .head__nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: #FFF;
        margin-left: 60px;
        padding:0;
    }
        .head__nav-left{
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        
        .head__nav-right {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: 60px;
        }
            .head__nav-item {
                margin-left: 20px;
                padding: 10px 16px;
            }
            .head__nav-item{
                color: #FFFFFF !important;
            }
            .head__nav-item:hover {
                background-color: #8F082A !important;
                color: #FFF;
            }

            .head__add-video {
                margin-left: 50px;
            }
                .head__add-video a {
                    color: #FFFFFF !important;
                    background: #B6AC1C;
                    border-radius: 3px;
                    padding: 10px 16px;
                    font-size: 0.9em;
                }
                .head__add-video a:hover {
                    color: #FFFFFF !important;
                    background: #9C9418;
                    border-radius: 3px;
                    padding: 10px 16px;
                    transition: 0.2s;
                }
.head__nav-item-active {
    background-color: #8F082A;
    border-radius: 3px;
    padding: 10px 16px;
}
</style>