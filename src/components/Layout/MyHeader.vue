<template>
    <div class="head">
        <router-link to="/" tag="h1" class="head__logo title"><i class="fa fa-circle-o fa-white" aria-hidden="true"></i><a>Metalogon</a></router-link>
        <ul class="head__nav">
            <router-link to="/" tag="li" class="head__nav-item" active-class="head__nav-item-active" exact><a class="head__nav-item-link">Home</a></router-link>
            <router-link to="/library" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Library</a></router-link>
            <router-link to="/wiki" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Wiki</a></router-link>
            <router-link to="/classes" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Classes</a></router-link>
        </ul>
    </div>
    
</template>

<script>
    import { eventBus } from '../../main'

    export default {
        data() {
            return {
                videos: eventBus.videos
            }
        }
    }
</script>

<style>
    .head {
      display: flex;
      background-color: #A90931;
      color: #FFF;
    }

        .head__logo {
          padding-top: 20px;
          margin-left: 120px;
          font-size: 24px;
          font-weight: bold;
        }
            .head__logo i {
                color: #FFF;
                padding-right: 5px;
            }

        .head__nav {
          display: flex;
          align-items: center;
          color: #FFF;
          margin-left: 60px;
          padding:0;
        }

            .head__nav-item {
                margin-left: 20px;
                padding: 10px 16px;
            }

    .head__nav-item-active {
      background-color: #8F082A;
      border-radius: 20px;
      padding: 10px 16px;
    }
</style>