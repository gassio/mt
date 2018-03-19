<template>

		<aside class="sidebar column is-2 aside">

			<!-- Sidebar buttons/actions  -->
			<div class="sidebar__actions">
				<a class="sidebar__actionsLink" v-show="role === 'administrator' || role === 'professor'" @click="modalCreateClassIsOpen = true"><i class="fa fa-plus"></i>Create new class</a>
				<a class="sidebar__actionsLink" v-show="role === 'administrator' || role === 'professor' && !(currentClassSelected === 'Home')" @click="openModalArchiveClass()"><i class="fa fa-archive"></i>Archive this class</a>
				<a class="sidebar__actionsLink" v-show="role === 'professor'" @click="modalClassAssignmentsIsOpen = true"><i class="fa fa-file-text-o"></i>Assignments</a>
				<a class="sidebar__actionsLink" v-show="role === 'administrator' && !(currentClassSelected === 'Home')" @click="modalDeleteClassIsOpen = true"><i class="fa fa-trash"></i>Delete this class</a>
				<a class="sidebar__actionsLink" v-show="role === 'student'" @click="modalEnrollClassIsOpen = true"><i class="fa fa-plus"></i>Find a class to enroll</a>
			</div>

			<!-- Sidebar Classes menu for student -->
			<div class="sidebar__classes" v-show="role === 'student'">	
				<el-input class="sidebar__classesInput" v-show="role === 'student'" icon="search" v-model="searchInputValue" @change="queryStudentClasses()" placeholder="Search for a class..."></el-input>
				<a class="sidebar__classesLink" v-show="role === 'student'" v-for="c in studentClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" @click="setCurrentClass(c.name, c.number)">{{ c.number }} -{{ c.name }}</a>
			</div>

			<!-- Sidebar Classes menu for professor/administrator-->
			<div class="sidebar__classes" v-show="role === 'administrator' || role === 'professor'">
				<el-tabs v-model="sidebarClassesTab">
					<el-tab-pane label="Active classes" name="activeClasses">
						<div class="sidebar__classes">
							<el-input class="sidebar__classesInput" icon="search" v-model="activeClassesInputValue" @change="queryActiveClasses()" placeholder="Search for a class..."></el-input>
							<a class="sidebar__classesLink" v-show="role === 'administrator'"     v-for="c in adminClasses"  :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" :key="c.id" @click="setCurrentClass(c.name, c.number)">{{ c.number }} - {{ c.name }}</a>
							<a class="sidebar__classesLink" v-show="role === 'professor'" v-for="c in activeClasses" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" :key="c.id" @click="setCurrentClass(c.name, c.number)">{{ c.number }} - {{ c.name }}</a>
							<!-- <a class="sidebar__classesLink" v-for="c in activeClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" @click="setCurrentClass(c.name, c.number)">{{ c.number }} - {{ c.name }}</a> -->
						</div>
					</el-tab-pane>
					<el-tab-pane label="Archived" name="archivedClasses">
						<div class="sidebar__classes">
							<el-input class="sidebar__classesInput" icon="search" v-model="archivedClassesInputValue" @change="queryArchivedClasses()" placeholder="Search archived classes..."></el-input>							
							<a class="sidebar__classesLink" v-for="c in archivedClasses" :key="c.id" :class="{ 'is-bg-light' : (currentClassSelected === c.name) }" @click="openModalUnarchiveClass(c.id)">{{ c.number }} - {{ c.name }}</a>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>

			<!-- administrator, professor -->
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

			<el-dialog :title="'Do you want to archive `' + currentClassSelected + '` class?'" :visible.sync="modalArchiveClassIsOpen">
				<el-button @click="modalArchiveClassIsOpen = false">Go back</el-button>
				<el-button class="add-class-btn" @click="archiveClass()"><strong>Archive Class</strong></el-button>
			</el-dialog>

			<el-dialog :title="'Do you want to unarchive this class?'" :visible.sync="modalUnarchiveClassIsOpen">
				<el-button @click="modalUnarchiveClassIsOpen = false">Go back</el-button>
				<el-button class="add-class-btn" @click="unArchiveClass()"><strong>Unarchive Class</strong></el-button>
			</el-dialog>	

			<el-dialog title="Genre customization" :visible.sync="modalGenreCustomization" size="large">
					<h3 style="margin-bottom:10px;">Choose genre:</h3>
					<!-- <el-select v-model="currentGenre" placeholder="Choose a genre">
						<el-option v-for="g in genres" :key="g.name" :label="g.name" :value="g.name"></el-option>
					</el-select> -->

					<el-radio class="radio" v-model="currentGenre" v-for="g in genres" :key="g.name" :label="g.name"></el-radio>

					<br/>
					<br/>
					<p>Choose canons:</p>
					<el-tree :data="canons" :props="genreProps" @node-click="handleNodeClick" show-checkbox>
					</el-tree>
					
					<span slot="footer" class="dialog-footer">
							<el-button @click="modalGenreCustomization = false">Close</el-button>
					</span>
			</el-dialog>	

			<el-dialog title="Genre customization" :visible.sync="modalGenreCustomization2" size="large">
					<h3 style="margin-bottom:10px;">Choose genre:</h3>
					<el-select v-model="currentGenre" placeholder="Choose a genre">
						<el-option v-for="g in genres" :key="g.name" :label="g.name" :value="g.name"></el-option>
					</el-select>
					<br/>
					<br/>
					<p style="font-weight:700; margin-top:10px;">STRUCTURE</p>
					<el-transfer v-model="structurePassed" :data="structureData" :titles="['Disabled', 'Enabled']">
					</el-transfer>
					<p style="font-weight:700; margin-top:10px;">DELIVERY</p>
					<el-transfer v-model="deliveryPassed" :data="deliveryData" :titles="['Disabled', 'Enabled']">
					</el-transfer>
					<p style="font-weight:700; margin-top:10px;">STYLE</p>
					<el-transfer v-model="stylePassed" :data="styleData" :titles="['Disabled', 'Enabled']">
					</el-transfer>
					<p style="font-weight:700; margin-top:10px;">VISUALS</p>
					<el-transfer v-model="visualsPassed" :data="visualsData" :titles="['Disabled', 'Enabled']">
					</el-transfer>
					
					<span slot="footer" class="dialog-footer">
							<el-button @click="modalGenreCustomization2 = false">Close</el-button>
					</span>
			</el-dialog>	

			<!-- administrator -->
			<el-dialog :title="'Do you want to delete `' + currentClassSelected + '` class?'" :visible.sync="modalDeleteClassIsOpen">
				<el-button @click="modalDeleteClassIsOpen = false">Go back</el-button>
				<el-button class="add-class-btn" @click="deleteClass()"><strong>Delete Class</strong></el-button>
			</el-dialog>

			<!-- professor -->
			<el-dialog title="Class assignments" :visible.sync="modalClassAssignmentsIsOpen" class="modal-class-assignments">
                <el-tabs v-model="classAssignmentsTab">
                    <el-tab-pane v-for="s in submissions" :key="s.assignmentId" :label="s.name">
						<p>{{ s.description }}</p>
						<p>{{ s.studentId }}</p>
						<p>{{ s.videoId }}</p>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>

			<!-- Student -->
			<el-dialog title="Find a class to enroll" class="student__enrollModal" :visible.sync="modalEnrollClassIsOpen" size="full">
				<a class="classes-card" v-for="c in classesToEnroll" :key="c.id" @click="enrollToClass($event)">
					<i aria-hidden="true" class="fa fa-book fa-5x"></i>
					<strong class="classes-card-title">"{{ c.name }}"</strong> 
					<p class="classes-card-title">{{ c.department }}</p> 
					<p class=""> {{ c.number }} - {{ c.semester }}</p> 
					<p style="visibility:hidden">{{ c.id }}</p> 
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
				role: this.$root.$options.authService.getAuthData().role,
				// administrator, professor
				sidebarClassesTab: 'activeClasses',
				searchInputValue: '',
				activeClassesInputValue: '',
				archivedClassesInputValue: '',
				modalCreateClassIsOpen: false,
				modalDeleteClassIsOpen: false,
				modalArchiveClassIsOpen: false,
				modalUnarchiveClassIsOpen: false,
				modalGenreCustomization: false,
				modalGenreCustomization2: false,
				classIdClicked: '',
				// Class Assignments
				modalClassAssignmentsIsOpen: false,
				classAssignmentsTab: 'assignment1',
				submissions: [
					{ name: "Assignment 1", assignmentId: '1', videoId: 'vidId1', studentId: 'studentId1', description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
					{ name: "Assignment 2", assignmentId: '2', videoId: 'vidId2', studentId: 'studentId2', description: 'Wwill be distracted by the readable content of a page when looking at its layout.' },
					{ name: "Assignment 3", assignmentId: '3', videoId: 'vidId3', studentId: 'studentId3', description: 'The readable content of a page when looking at its layout.' }
				],
				// Genre customization
				genres: [
					{ name: 'Elevator pitch' },
					{ name: 'Lab presentation' },
					{ name: 'Thesis talk' },
					{ name: 'Progress report' },
					{ name: 'Conference talk' }
				],
				currentGenre: 'Lab presentation',
				// Genre version 1
				canons: [
					{
						label: 'Moves',
						children: [
							{ label: 'Introduction', children: [
								{ label: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research' },
								{ label: 'States the value of the present research and explains why it was conducted' },
								{ label: 'Discusses the definitions of key terms' },
								{ label: 'Summarizes and previews the methods used' },
								{ label: 'Presents basic equations' },
							]},
							{ label: 'Methodology', children: [
								{ label: 'Describes materials and instrumentation in the study' },
								{ label: 'Describes tasks (actions) in the study' },
								{ label: 'Describes the procedures of an experiment (activities)' },
								{ label: 'Presents justification of techniques' },
								{ label: 'Describes variables in the study' },
								{ label: 'Describes the procedures used in data analysis' },
								{ label: 'Describes the relations between the experiment and prior/subsequent experiments' },
							]},
							{ label: 'Results and Discussion', children: [
								{ label: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research' },
								{ label: 'States the value of the present research and explains why it was conducted' },
								{ label: 'Discusses the definitions of key terms' },
								{ label: 'Summarizes and previews the methods used' },
								{ label: 'Presents basic equations' },
							]},
							{ label: 'Conclusion', children: [
								{ label: 'xxxxxxxxxx' },
							]},
							{ label: 'Question and Answer', children: [
								{ label: 'xxxxxxxxxx' },
							]},
						]
					}, 
					{
						label: 'Structure',
						children: [
							{ label: 'Terms', desc: 'Provides overview of the talk, emphasizing the connection between key terms and concepts'},
							{ label: 'Conceptual transitions' },
							{ label: 'Line of argument' },
							{ label: 'Central moves' },
						]
					}, 
					{
						label: 'Delivery',
						children: [
							{ label: 'Volume' },
							{ label: 'Gestures' },
							{ label: 'Metadiscourse' },
							{ label: 'Posture' },
							{ label: 'Language' },
						]
					}, 
					{
						label: 'Style',
						children: [
							{ label: 'Coherence' },
							{ label: 'Concision' },
							{ label: 'Flow' },
							{ label: 'Emphasis' },
							{ label: 'Figures of Speech' },
							{ label: 'Figures of Sound' },
						]
					},
					{
						label: 'Visuals',
						children: [
							{ label: 'Pictorial cues' },
							{ label: 'Slide titles' },
							{ label: 'Image-text highlight' },
							{ label: 'Graphics' },
							{ label: 'Memorable images' }
						]
					},
				],
				genreProps: {
					children: 'children',
					label: 'label',
					desc: 'desc'
				},
				// Genre version 2
				structureData: [
					{ key: 0, label: 'Terms'},
					{ key: 1, label: 'Conceptual transitions' },
					{ key: 2, label: 'Line of argument' },
					{ key: 3, label: 'Central moves' }
				],
				structurePassed: [],
				deliveryData: [
					{ key: 0, label: 'Volume' },
					{ key: 1, label: 'Gestures' },
					{ key: 2, label: 'Metadiscourse' },
					{ key: 3, label: 'Posture' },
					{ key: 4, label: 'Language' },
				],
				deliveryPassed: [],
				styleData: [
					{ key: 0, label: 'Coherence' },
					{ key: 1, label: 'Concision' },
					{ key: 2, label: 'Flow' },
					{ key: 3, label: 'Emphasis' },
					{ key: 4, label: 'Figures of Speech' },
					{ key: 5, label: 'Figures of Sound' },
				],
				stylePassed: [],
				visualsData: [
					{ label: 'Pictorial cues' },
					{ label: 'Slide titles' },
					{ label: 'Image-text highlight' },
					{ label: 'Graphics' },
					{ label: 'Memorable images' }
				],
				visualsPassed: [],
				newClass: {
					archived: false,
					department: '',
					name: '',
					number: '',
					semester: ''
				},
				// STUDENT
				modalEnrollClassIsOpen: false,
				otherClasses: []
			}
		},
		methods: {
			// administrator
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
			// administrator, professor
			setCurrentClass(className, classNumber) {
				this.$store.commit('CURRENT_CLASS_SELECT', {className: className, classNumber: classNumber})
			},
			createClass() {	
				this.$store.dispatch('createClass', { 
					newClass: this.newClass
				})
				this.newClass = {}
			},
			archiveClass() {
				// 1. Adds current class to Archived Classes.
				// 2. Removes current class from Active Classes.
				// 3. Modifies classes object.
				var objectToBeArchived = {}
				var objectId
				for (var i = 0, l = this.activeClasses.length; i < l; i++) {
					if (this.activeClasses[i].name === this.currentClassSelected) {
						this.activeClasses[i].archived = true
						objectToBeArchived = this.activeClasses[i]
						objectId = this.activeClasses[i].id
						break
					}
				}
				this.$store.dispatch('archiveClass', { 
					classId: objectId,
					classObject: objectToBeArchived 
				})
				
				this.modalArchiveClassIsOpen = false // Closes the modal.
				var noClass = 'select a class'
				this.$store.commit('CURRENT_CLASS_SELECT', { className: 'Home' }) // Sets the current showing class state to null.
			},
			unArchiveClass() {
				var self = this
				var objectToBeUnarchived = {}
				var objectId
				for (var i = 0, l = this.archivedClasses.length; i < l; i++) {
					if (this.archivedClasses[i].id === this.classIdClicked && this.archivedClasses[i].archived === true) {
						this.archivedClasses[i].archived = false
						objectToBeUnarchived = this.archivedClasses[i]
						break
					}
				}
				this.$store.dispatch('unArchiveClass', { 
					classId: self.classIdClicked,
					classObject: objectToBeUnarchived 
				})
				this.$store.commit('CURRENT_CLASS_SELECT', { className: objectToBeUnarchived.name, classNumber: objectToBeUnarchived.number })				
				this.modalUnarchiveClassIsOpen = false
			},
			// A Vue setter.
			queryActiveClasses: _.debounce(function () {
				console.log('QUERY ACTIVE CLASSES')
				this.$store.commit('FILTER_ACTIVE_CLASSES', this.activeClassesInputValue)
			}, 300),
			// A Vue setter.
			queryArchivedClasses: _.debounce(function () {
				console.log('QUERY ARCHIVED CLASSES')
				this.$store.commit('FILTER_ARCHIVED_CLASSES', this.archivedClassesInputValue)
			}, 300),
			openModalArchiveClass() {
				if (this.currentClassSelected !== '')
					this.modalArchiveClassIsOpen = true
			},
			openModalUnarchiveClass(classId) {
				this.classIdClicked = classId
				this.modalUnarchiveClassIsOpen = true
			},
			handleNodeClick(data) {
				console.log(data);
			},
			// Student
			enrollToClass(event) {
				const clickedClassId = event.currentTarget.children[4].innerHTML
				
				for (var i = 0, l = this.classesToEnroll.length; i < l; i++) {
					if (this.classesToEnroll[i].id === clickedClassId) {
						
						var body = {
							classId : clickedClassId,
							userId : this.$root.$options.authService.getAuthData().user_id
						}
						console.log(body)
						var self = this
						this.$store.dispatch('createEnrollment', body)
						.then(function(){
							// TODO move this to store - mutation
							self.studentClasses.push(self.classesToEnroll[i])
							self.classesToEnroll.splice(i,1)	
						})
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
                ['videos', 'classes', 'activeClasses', 'archivedClasses', 'currentClassSelected', 'currentClassNumber', 'adminClasses', 'studentClasses', 'classesToEnroll']
            )
		}
    }
</script>

<style>
/* ==============================================
                #ADMIN-SIDEBAR
	================================================= */

	.sidebar {
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

		.sidebar a {
			color: #4a4a4a;
			font-size: 13px;
			margin: 0;
			padding: 12px 12px 12px 12px;
		}
		.sidebar a:hover {
			background-color: #f5f5f5;
		}
			.sidebar a i {
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
