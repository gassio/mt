<template>
    <div class="page">
        <div class="head  container">
            
            <ul class="head__nav">
                <div class="head__nav-left">
                <router-link to="/" tag="h1" class="head__logo title"> <i class="fa fa-circle-o" aria-hidden="true"></i><a>Metalogon</a></router-link>
                    <router-link to="/" tag="li" class="head__nav-item" active-class="head__nav-item-active" exact><a class="head__nav-item-link">Home</a></router-link>
                    <router-link to="/library" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Library</a></router-link>
                    <router-link to="/wiki" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Wiki</a></router-link>
                    <router-link to="/classes" class="head__nav-item" tag="li" active-class="head__nav-item-active"><a>Classes</a></router-link>
                </div>
                <div class="head__nav-right">
                    <li class="head__add-video"><a>+ Add Video</a></li>
                    <li class="head__add-video">Ben Domino | Student</li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../../main'

    export default {
        data() {
            return {
            }
        }
    }
</script>

<style>
.page {
    width: 100%;
    height: 70px;
    background: #A90931;
}
    .head {
      display: flex;
      background-color: #A90931;
      height: 70px;
      color: #FFF;
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
                    border-radius: 20px;
                }

                .head__add-video{
                    margin-left: 20px;
                }
                    .head__add-video a{
                        color: #FFFFFF !important;
                        background: #B6AC1C;
                        border-radius: 20px;
                        padding: 10px 16px;
                    }
    .head__nav-item-active {
      background-color: #8F082A;
      border-radius: 20px;
      padding: 10px 16px;
    }
</style>