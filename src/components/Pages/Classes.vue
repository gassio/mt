<template>
        <div class="classes container">
			<div class="classes-main columns is-gapless is-marginless">
				<div class="classes-content">
					<div class="classes-content-single-semester">
						<div class="classes-semester">
							<div class="classes-semester-title"><p><strong>Fall 2017</strong></p></div>
						</div><!-- end -->
						
						<div class="classes-of-semester">
							<router-link class="classes-card" :to="'classes/' + c.id" v-for="c in classes" :key="c.id">
								<i class="fa fa-book fa-5x" aria-hidden="true"></i>
								<p class="classes-card-title"> {{c.spring}} {{ c.title }}</p>
								<span class="classes-card-details"></span>
							</router-link><!-- end -->

							<!--
							<a class="classes-card add-new-class-container" @click="dialogVisible = true">
								<i class="fa fa-plus fa-3x" aria-hidden="true"></i>
								<p>Create new class</p>
							</a>-->						
						</div>
					</div>
				</div>	
			</div><!-- end -->
		<el-dialog title="Add new class" :visible.sync="dialogVisible">
			<el-form :model="newClass">
				<el-form-item label="Class name" :label-width="formLabelWidth">
					<el-input v-model="newClass.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Spring" :label-width="formLabelWidth">
					<el-input v-model="newClass.spring" auto-complete="off"></el-input>
				</el-form-item>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button class="add-class-btn" @click="createClass(); dialogVisible = false;">Add Class</el-button>
			</span>
		</el-dialog>

        <router-view></router-view>
    </div>      
</template>

<script>
    import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    export default {
        data() {
            return { 
                dialogVisible: false,
				formLabelWidth: '120px',
				newClass: {
					title: '',
					spring: '',
				}
            }
        },
		created() {
			this.$store.dispatch('getAllClasses')
		},
        mounted() {
        },
		updated() {
		},
        methods: {
			createClass() {	
				this.$store.dispatch('createClass', { 
					newClass: this.newClass
				})
				this.newClass = {}
			}
        },
        computed: {
            ...mapGetters([
				'classes'
            ])
        }
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
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
				.classes-card:hover {
					cursor: pointer;
					transition: 0.2s;
					-webkit-transition: 0.2s;
					background-color: #A90931;
					color: #FFF !important;
				}

				.classes-card-title {
					text-align: center;
					font-size: 18px;
				}
				.classes-card-details {
					text-align: center;
					color: #6B6B6B;
				}

		.add-new-class-container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			background-color: #FFF;
			border: 1px dashed #DADDE2;
		}

			.add-new-class-container i {
				font-size: 42px;
			}
			.add-new-class-container p {
				font-size: 24px;
			}
			.add-new-class-container span {
				font-size: 14px;
			}


	.dialog-footer .el-button.add-class-btn {
		background: #A90931;
		color: #fff;
		border: none;
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


</style>
