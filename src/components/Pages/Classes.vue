<template>
    <div class="classes">
        <div class="container">
			<!-- MAIN CONTENT - start -->
			<div class="classes-main columns is-gapless is-marginless">
				<div class="classes-content">
					<div class="classes-content-single-semester">
						<!-- SEMESTER - start -->
						<div class="classes-semester">
							<div class="classes-semester-title"><p><strong>Spring 2017</strong></p></div>
						</div><!-- end -->
						
						<div class="classes-of-semester">
							<!-- CLASS CARD - start -->
                            <div class="classes-card" v-for="c in classes">   
                                <router-link :to="'classes/' + c.title.replace(/ /g, '-')" tag="a" class="">
                                    <i class="fa fa-book fa-5x" aria-hidden="true"></i>
                                    <p class="classes-card-title"> {{c.section}} {{c.spring}} {{ c.title }}</p>
                                    <span class="classes-card-details">{{c.videosCount}} videos, 2 instructors</span>
                                </router-link><!-- end -->
					        </div>

							<div class="classes-card">
								<div class="add-new-class">
									<i class="fa fa-plus fa-3x" aria-hidden="true"></i>
									<p>Create new class</p>
									<span>A class contains student videos</span>
								</div>
							</div>						
						</div>
					</div>
				</div>	
			</div><!-- end -->
		</div>
        <router-view></router-view>
    </div>      
</template>

<script>    
    export default {
        data() {
            return { 
                // playlistNamesURI: [],
            }
        },
        mounted() {
        },
        methods: {
            // It is not used because of line 6: 
            // <router-link :to=" 'classes/' + p.replace(/ /g, '-') " tag="a">{{ p }}</router-link>
            // fixPlaylistNames() {
            //     for (var i=0; i < this.playlistNamesURI.length; ++i) {
            //         this.playlistNamesURI[i] = this.playlistNamesURI[i].replace(/ /g, "-")
            //     }
            // }
        },
        computed: {
            // Store: playlistNames[] array
            classes() {
                return this.$store.getters.classes
            }
        },
    }
</script>

<style>
/*-------------- MAIN CONTENT ---------------- */

.classes-main{
	display: flex;
	flex-direction: column;
}
	.classes-content{
		display: flex;
		flex-direction: column;
		height: auto;
		width: 100%;
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.classes-content-single-semester{
		display: flex;
		flex-direction: column;
		height: auto;
		width: 100%;
		margin-top: 60px;
	}
/*-------------- SEMESTER ---------------- */	
		.classes-semester{
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			height: 30px;
			width: 100%;
		}
			.classes-semester-title{
				height: 30px;
				width: auto;
				border-bottom: 2px solid;
			}
			
/*-------------- CLASS CARD ---------------- */			
		.classes-of-semester {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			height: auto;
			width: 100%;
			margin-top: 20px;
		}
			.classes-card {
				background-color: rgba(169,9,49,0.04);
				color: #A90931;
				padding: 45px;
				margin: 20px;
				height: auto;
				transition:  box-shadow 0.5s ease;
				display:flex; 
				align-items:center;
			}

			@media screen and (min-width: 0px) {
				.classes-card{
					width: 100%;
				}
			}
			
			@media screen and (min-width: 426px){
				.classes-card{
					width: calc(100% /2 - 40px);
				}
			}
			
			@media screen and (min-width: 600px){
				.classes-card{
					width: calc(100% /3 - 40px);
				}
			}
			
			@media screen and (min-width: 1024px){
				.classes-card{
					width: calc(100% /4 - 40px);
				}	
			}
				.classes-card a {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				.classes-card i {
					color: #6B6B6B;
				}

				.classes-card:hover{
					box-shadow: 3px 3px 9px 0px rgba(0,0,0,0.5);
					cursor: pointer;
				}	
				.classes-card-title{
					text-align: center;
					font-size: 18px;
					color: #A90931;
				}
				.classes-card-details {
					text-align: center;
					color: #6B6B6B;
				}

		.add-new-class {
			display: flex;
			flex-direction: column;
			align-items: center;
			align-content: center;
			text-align: center;
		}

			.add-new-class i {
				font-size: ;
				color: #A90931;
			}
			.add-new-class p {
				font-size: 24px;
				color: #A90931;
			}
			.add-new-class span {
				font-size: 14px;
				color: #6B6B6B;
			}

</style>
