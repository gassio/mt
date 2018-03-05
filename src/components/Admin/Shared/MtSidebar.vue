<template>

		<aside class="admin__sidebar column is-2 aside">

			<div class="sidebar__actions">
				<a class="sidebar__actionsLink" v-show="role === 'Admin' || role === 'Professor'" @click="modalCreateClassIsOpen = true"><i class="fa fa-plus"></i>Create new class</a>
				<a class="sidebar__actionsLink" v-show="(role === 'Admin' || role === 'Professor') && !(currentClassSelected === 'Home')" @click="modalDeleteClassIsOpen = true"><i class="fa fa-trash"></i>Delete this class</a>
				<a class="sidebar__actionsLink" v-show="role === 'Student'" @click="modalEnrollClassIsOpen = true"><i class="fa fa-plus"></i>Find a class to enroll</a>
			</div>

			<div class="sidebar__classes">
				<el-input class="sidebar__classesInput" v-show="role === 'Admin'" icon="search" v-model="searchInputValue" @change="queryAdminClasses()" placeholder="Search for a class..."></el-input>	
				<el-input class="sidebar__classesInput" v-show="role === 'Student'" icon="search" v-model="searchInputValue" @change="queryStudentClasses()" placeholder="Search for a class..."></el-input>
				<a class="sidebar__classesLink" v-show="role === 'Admin'" v-for="c in adminClasses" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" :key="c.id" @click="setCurrentClass(c.name, c.number)">{{ c.number }} - {{ c.name }}</a>
				<a class="sidebar__classesLink" v-show="role === 'Student'" v-for="c in studentClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" @click="setCurrentClass(c.name, c.number)">{{ c.number }} -{{ c.name }}</a>
			</div>

			<!-- Admin, Professor -->
			<el-dialog title="Add new class" :visible.sync="modalCreateClassIsOpen">
					<el-form :model="newClass">
							<el-form-item label="Name">
									<el-input v-model="newClass.name" placeholder="Advanced Essay Workshop"></el-input>
							</el-form-item>
							<el-form-item label="Department">
								<el-input v-model="newClass.department" placeholder="Comparative Media Studies / Writing"></el-input>
									<!-- <el-select  placeholder="Choose a department" >
										<el-option v-model="newClass.department" :label="c.department" :value="c.department" v-for="c in classes" v-bind:key="c.title"></el-option>
									</el-select> -->
							</el-form-item>
							<el-form-item label="Number">
									<el-input v-model="newClass.number" placeholder="21W.745"></el-input>
							</el-form-item>
							<el-form-item label="Semester">
									<el-input v-model="newClass.semester" placeholder="Spring 2018"></el-input>
							</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
							<el-button @click="modalCreateClassIsOpen = false">Cancel</el-button>
							<el-button class="add-class-btn" @click="createClass(); modalCreateClassIsOpen = false;">Create Class</el-button>
					</span>
			</el-dialog>

			<!-- Admin, Professor -->
			<el-dialog :title="'Do you want to delete `' + currentClassSelected + '` class?'" :visible.sync="modalDeleteClassIsOpen">
				<el-button @click="modalDeleteClassIsOpen = false">Go back</el-button>
				<el-button class="add-class-btn" @click="deleteClass()"><strong>Delete Class</strong></el-button>
			</el-dialog>

			<!-- Student -->
			<el-dialog title="Find a class to enroll" class="student__enrollModal" :visible.sync="modalEnrollClassIsOpen" size="full">
				<a class="classes-card" v-for="c in otherClasses" :key="c.id" @click="enrollToClass($event)">
					<i aria-hidden="true" class="fa fa-book fa-5x"></i>
					<strong class="classes-card-title">"{{ c.name }}"</strong> 
					<p class="classes-card-title">{{ c.department }}</p> 
					<p class=""> {{ c.number }} - {{ c.semester }}</p> 
				</a>
			</el-dialog> 
			
		</aside>

</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
	import _ from 'lodash'
    
    export default {
		props: [],
		data() {
			return {
				role: this.$root.$options.authService.getAuthData().role_id,
				// ADMIN, PROFESSOR
				searchInputValue: '',
				modalCreateClassIsOpen: false,
				modalDeleteClassIsOpen: false,
				newClass: {
					archived: false,
					department: '',
					name: '',
					number: '',
					semester: ''
				},
				// STUDENT
				modalEnrollClassIsOpen: false,
				otherClasses: [
					{ id: '5bc87287-1271-4f0c-94a1', department: "Chemical Engineering", name: 'Numerical Methods Applied to Chemical Engineering', number: '10.34', semester: 'Spring 2018', archived: false },
					{ id: '6bc87287-1271-4f0c-94a2', department: "Chemical Engineering", name: 'Fundamentals of Advanced Energy Conversion', number: '10.390J', semester: 'Spring 2018', archived: false },
					{ id: '7bc87287-1271-4f0c-94a3', department: "Aeronautics and Astronautics", name: 'Dynamics', number: '16.07', semester: 'Spring 2018', archived: false },
					{ id: '8bc87287-1271-4f0c-94a4', department: "Aeronautics and Astronautics", name: 'System Safety', number: '16.863J', semester: 'Spring 2018', archived: false }
				]
			}
		},
		methods: {
			setCurrentClass(className, classNumber) {
				this.$store.commit('CURRENT_CLASS_SELECT', {className: className, classNumber: classNumber})
			},
			// ADMIN, PROFESSOR
			createClass() {	
				this.$store.dispatch('createClass', { 
					newClass: this.newClass
				})
				this.newClass = {}
			},
			deleteClass() {
				var objectId
				for (var i = 0, l = this.adminClasses.length; i < l; i++) {
					if (this.adminClasses[i].name === this.currentClassSelected) {
						objectId = this.adminClasses[i].id
					}
				}
				this.$store.dispatch( 'deleteClass', objectId )
				
				this.modalDeleteClassIsOpen = false
				this.$store.commit('CURRENT_CLASS_SELECT', { className: 'Home' }) // Sets the current showing class state to null.
			},
			queryAdminClasses: _.debounce(function () {
				console.log('QUERY ADMIN CLASSES')

				this.$store.commit('FILTER_ADMIN_CLASSES', this.searchInputValue) 
			}, 300),
			// STUDENT
			enrollToClass(event) {
				const clickedClassName = event.currentTarget.children[1].innerHTML
				for (var i = 0, l = this.otherClasses.length; i < l; i++) {
					if (this.otherClasses[i].name === clickedClassName) {
						this.currentClassSelected = this.otherClasses[i].name
						this.studentClasses.push(this.otherClasses[i])
						this.classes.push(this.otherClasses[i])
						this.otherClasses.splice(i,1)	
						break
					}
				}
				this.modalEnrollClassIsOpen = false
			},
			queryStudentClasses: _.debounce(function () {
				console.log('QUERY STUDENT CLASSES')

				this.$store.commit('FILTER_STUDENT_CLASSES', this.searchInputValue) 
			}, 300)
		},
        computed: {
            ...mapGetters(
                ['videos', 'classes', 'currentClassSelected', 'currentClassNumber', 'adminClasses', 'studentClasses']
            )
		}
    }
</script>

<style>
/* ==============================================
                #ADMIN-SIDEBAR
	================================================= */

	.admin__sidebar {
		margin: 0;
		padding: 0;
		background-color: #F9F9F9;
	}

	.sidebar__actions {
		margin-top: 15px;	
		display: flex;
		flex-direction: column;
	}

		.sidebar__actionsLink {
			padding: 10x 15px 10px 15px !important;
		}


	.sidebar__classes {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
	}

		.sidebar__classesInput {
			margin-bottom: 10px;
		}

		.sidebar__classesLink {

		}

		.admin__sidebar a {
			color: #4a4a4a;
			font-size: 13px;
			margin: 0;
			padding: 12px 12px 12px 12px;
		}
		.admin__sidebar a:hover {
			background-color: #f5f5f5;
		}
			.admin__sidebar a i {
				padding-right: 5px;
			}


	/* ==============================================
                #ENROLL-TO-CLASS CLASSES-CARD
	================================================= */

	.student__enrollModal .el-dialog__body {
		display: flex;
		flex-wrap: wrap;
	}
			.classes-card {
				background-color: rgba(169,9,49,0.04);
				color: #A90931;
				padding: 45px;
				margin: 20px;
				height: auto;
				transition:  box-shadow 0.5s ease;
				width: 250px;
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

</style>
