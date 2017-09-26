<template>
     <div class="class container">
        <div class="class-go-back">
            <router-link :to="{ path: '/classes'}">
                <button class="button class-go-back-button"> <i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp All classes</button>
            </router-link>
        </div>
        <div class= "class-of-semester">
            <div class="class-of-semester-title"><p>{{ this.classes.title }}</p></div>
        </div><!-- end -->
        
        <!-- MAIN CONTENT - start -->
        <div class="class-content">
            <div class="v-videos fx-dir-col">
                <div class="v-video fx-dir-row" v-for="v in videos">
                    <!-- CLASS CARD - start -->
                    <router-link :to="'/video/' + v.id"  tag="a" class="class-card columns is-gapless">
                        <div class="class-card-image column is-2 is-gapless is-marginless">
                            <img :src="v.thumb" alt="video-thumbnail" class="class-card-image-thumbnail">	
                        </div>
                        <div class="class-card-description column is-7 is-gapless is-marginless has-text-left">
                            <p class= "class-card-description-title">{{ v.title }}</p>
                            <p class= "class-card-description-details">Duration: {{ v.duration }} | Class: {{ v.class }}</p>
                        </div>
                        <div class="class-card-genre column is-3 is-gapless is-marginless">
                            <strong class="class-card-genre-color">{{ v.genre }}</strong> &nbsp&nbsp<i class="fa fa-book fa-2x" aria-hidden="true"></i>
                        </div>
                    </router-link>
                </div>
            </div>
        </div><!-- end -->
        
        <router-view></router-view>
    </div>      
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return { 
                id: this.$route.params.id
            }
        },
        created() {
            this.$store.dispatch('getClass', this.id)
            this.$store.dispatch('getAllVideos')
        },
        mounted(){
            // this.$store.commit('GET_CLASS_VIDEOS', this.classes.id)
        },
        updated() {
        },
        methods: {

        },
        computed: {
            ...mapGetters([
				'classes',
                'videos'
            ])
        }
    }
</script>

<style>
.class-go-back{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 70px !important;
    padding: 10px;
}
    .class-go-back-button{
        transition: background-color 0.5s ease;
        color: #6B6B6B;
        height: 50px !important;
        background-color: none !important;
    }
    .class-go-back-button:hover{
        background-color: #A90931 !important;
        color: #FFFFFF !important;
    }

.class-of-semester{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 30px;
    width: 100%;
}
    .class-of-semester-title{
        height: 30px;
        width: auto;
        border-bottom: 2px solid;
        padding: 4px;
    }

/*-------------- MAIN CONTENT ---------------- */
.class-content{
	height: auto;
	width: 100%;
	padding-left: 20px;
	padding-right: 20px;
}

/*-------------- CLASS CARD ---------------- */
	.class-card{
		height: auto;
		width: 100%;
		margin-top: 30px !important;
		margin-bottom: 0px !important;
        transition:  box-shadow 0.5s ease;
	}
	.class-card i{
		color: #6B6B6B;
	}
	.class-card:hover{
		box-shadow: 3px 3px 9px 0px rgba(0,0,0,0.5);
		cursor: pointer;
	}
		@media screen and (min-width: 0px){
			.class-card-image{
				display: flex !important;
				flex-direction: row !important; 
				justify-content: center !important;
				width: 100%;
			}	
		}
		@media screen and (min-width: 769px){
			.class-card-image{
				display: flex !important;
				flex-direction: row !important; 
				justify-content: flex-start !important;
				width: 100%;
			}	
		}
			.class-card-image-thumbnail{
				max-height:110px;
			}
		.class-card-description{
			display: flex !important;
			flex-direction: column !important; 
			justify-content: flex-end ;
			width: 100%;
			padding: 14px !important;
			background: none;
		}
			.class-card-description-title{
				font-size: 20px;
				color: #A90931;
			}
            .class-card-description-details{
                color: #6B6B6B;
            }
		.class-card-genre{
			display: flex !important;
			flex-direction: row !important; 
			justify-content: flex-end;
			align-items: flex-end;
			width: 100%;
			padding: 14px !important;
		}
        .class-card-genre-color{
            color: #6B6B6B;
        }
					
</style>