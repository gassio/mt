<template>
    <div class="page">
        <div class="head container">
            
            <ul class="head__nav">
                <div class="head__nav-left">
                <router-link to="/" tag="h1" class="head__logo title"><a>Metalogon</a></router-link>
                    <router-link to="/" tag="li" class="head__nav-item" active-class="head__nav-item-active" exact><a class="head__nav-item-link">Home</a></router-link>
                    <router-link to="/classes" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Classes</a></router-link>
                    <router-link to="/library" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Library</a></router-link>
                    <router-link to="/wiki" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Wiki</a></router-link>
                    <!-- <li class="head__add-video"><a v-on:click="setUploadingVideoAsTrue()">+ Upload video</a></li> -->
                </div>
                <div class="head__nav-right">
                </div>
            </ul>
        </div>
    </div>
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
.page {
    width: 100%;
    background: #A90931;
}
    .head {
      height: 60px;
      color: #FFF;
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
                .head__nav-item a{
                    color: #FFFFFF;
                }
                .head__nav-item:hover {
                    background-color: #8F082A;
                    border-radius: 3px;
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