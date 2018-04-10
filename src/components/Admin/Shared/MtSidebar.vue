<template>

		<aside class="sidebar column is-2 aside">

			<!-- Sidebar buttons/actions  -->
			<div class="sidebar__actions">
				<a class="sidebar__actionsLink" v-show="role === 'administrator' || role === 'professor'" @click="modalCreateClassIsOpen = true"><i class="fa fa-plus"></i>Create new class</a>
				<a class="sidebar__actionsLink" v-show="role === 'administrator' || role === 'professor' && !(currentClassSelected === 'Home')" @click="openModalArchiveClass()"><i class="fa fa-archive"></i>Archive this class</a>
				<a class="sidebar__actionsLink" v-show="role === 'professor'" @click="modalClassAssignmentsIsOpen = true"><i class="fa fa-file-text-o"></i>Assignments</a>
				<a class="sidebar__actionsLink" v-show="role === 'professor'" @click="createCategoriesTreeDataForm(); modalGenreCustomization = true"><i class="fa fa-commenting-o"></i>Categories</a>
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
					<el-select v-model="currentGenre" placeholder="Choose a genre" style="width:300px">
						<el-option v-for="g in genres" :key="g.name" :label="g.name" :value="g.name"></el-option>
					</el-select>
					<br>
					<el-button v-show="currentGenre !== ''" style="margin-top:10px" @click="modalAddCategoryIsOpen = true"> Add category</el-button>
					<!-- <el-radio class="radio" v-model="currentGenre" v-for="g in genres" :key="g.name" :label="g.name"></el-radio> -->

					<br/>
					<br/>
					<div v-show="currentGenre">
						<p>Choose canons:</p>
						<el-tree :data="canons" :props="genreProps" @node-click="handleNodeClick" show-checkbox>
						</el-tree>
					</div>
					
					<span slot="footer" class="dialog-footer">
							<el-button @click="modalGenreCustomization = false; currentGenre = ''">Close</el-button>
					</span>
			</el-dialog>	

			<el-dialog title="Add category" :visible.sync="modalAddCategoryIsOpen" size="small">
					<el-select style="margin-bottom:10px;" v-model="newCategoryCanon" placeholder="Choose a canon">
						<el-option v-for="c in canons" :key="c.label" :label="c.label" :value="c.label"></el-option>
					</el-select>
					<el-input style="margin-bottom:10px;" placeholder="Category name" v-model="newCategoryName"></el-input>
					<el-input
						type="textarea"
						:rows="2"
						placeholder="Category description"
						v-model="newCategoryDesc">
					</el-input>
					<span slot="footer" class="dialog-footer">
							<el-button @click="modalAddCategoryIsOpen = false; addNewCategory()">Add</el-button>
					</span>
			</el-dialog>	

			<!-- administrator -->
			<el-dialog :title="'Do you want to delete `' + currentClassSelected + '` class?'" :visible.sync="modalDeleteClassIsOpen">
				<el-button @click="modalDeleteClassIsOpen = false">Go back</el-button>
				<el-button class="add-class-btn" @click="deleteClass()"><strong>Delete Class</strong></el-button>
			</el-dialog>

			<!-- professor -->
			<el-dialog title="Class assignments" :visible.sync="modalClassAssignmentsIsOpen" class="modal-class-assignments">
				<el-select v-model="assignmentsClassSelectedId" placeholder="Select a class" style="width:50%" @change="fetchAssignments()">
					<el-option :label="c.number + ' - ' + c.name" :value="c.id" v-for="c in activeClasses" v-bind:key="c.name"></el-option>
				</el-select>
                <el-tabs v-show="!!assignmentsClassSelectedId">
                    <el-tab-pane v-for="a in assignments" :key="a.id" :label="a.title">
						<div class="assignments-content">
							<span class="assignments__title">
								<strong>Title:</strong>
								<span class="assignments__titleId">{{ a.id }}</span>
								<p class="assignments__titleText" @click="toggleTitleEdit($event)">{{ a.title }}</p>
								<input v-model="a.title" @blur="saveTitleEdit($event)" type="text" class="input assignments__titleInput"></textarea>
							</span>
							<hr>
							<span class="assignments__desc">
								<strong class="assignments__descTitle">Description:</strong>
								<span class="assignments__descId">{{ a.id }}</span>
								<p class="assignments__descText" @click="toggleDescriptionEdit($event)">{{ a.description }}</p>
								<textarea v-model="a.description" @blur="saveDescriptionEdit($event)" type="text" class="textarea assignments__descTextarea"></textarea>
							</span>
							<hr>
							<span class="assignments__genre" v-for="g in genres" v-if="g.id === a.genre" :key="g.id">
								<strong class="assignments__genreTitle">Genre:</strong> 
								<span class="assignments__genreId">{{ a.id }}</span>
								<p class="assignments__genreName" @click="toggleGenreEdit($event)">{{ g.name }}</p>
								<select v-model="a.genre" @change="saveGenreEdit($event)" class="assignments__genreSelect select">
									<option v-for="g in genres" :label="g.name" :value="g.id" :key="g.id" class="option"></option>
								</select>
							</span>
							<hr>
							<router-link :to="'/video/' + v.id" tag="div" class="classvideo" v-for="v in videos" :key="v.id" v-if="v.assignmentId === a.id" style="cursor:pointer">
								<div class="classvideo__metadata">
									<img class="classvideo__image" :src="v.thumb">
									<div class="classvideo__titles">
										<p class="classvideo__title">{{ v.title }}</p>
										<p class="classvideo__genre">{{ secondsToMMSS(v.duration) }} / {{ v.genre }} </p>
									</div>
									<div class="classvideo__metameta">
										
									</div>
								</div>
							</router-link>
						</div>
                    </el-tab-pane>
					<el-tab-pane label="+ Add assignment">
						<el-input v-model="assignmentTitle" placeholder="Set a title" style="width:70%;margin-bottom:15px;"></el-input>
						<el-input v-model="assignmentDescription" placeholder="Set a description" type="textarea" style="width:70%;margin-bottom:15px;"></el-input>
						<p>Choose genre:</p>
						<el-select v-model="assignmentGenre" placeholder="Select a genre" style="width:50%" @change="fetchAssignments()">
							<el-option v-for="g in genres" :key="g.name" :label="g.name" :value="g.id"></el-option>
						</el-select>
						<hr>
						<el-button @click="createAssignment()">Create</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>

			<!-- <el-dialog title="Class Categories" :visible.sync="modalClassCategoriesIsOpen" class="modal-class-categories" size="small">
				<el-select v-model="categoriesGenre" placeholder="Select a genre" style="width:50%" @change="fetchCategories()">
					<el-option v-for="g in genres" :key="g.name" :label="g.name" :value="g.id"></el-option>
				</el-select>
				<div v-if="!!categoriesGenre">
					<p>Choose categories:</p>
					<el-checkbox-group v-model="categoriesCheckList" @change="categoriesListChanged()">
						<p>STRUCTURE</p>
						<el-checkbox :label="cat.name" v-for="cat in categories" v-if="cat.canon === 'Structure'" :key="cat._id" :value="cat.name" checked>
							<strong>{{cat.name}}:</strong> {{cat.description}}
						</el-checkbox>
						<p>DELIVERY</p>
						<el-checkbox :label="cat.name" v-for="cat in categories" v-if="cat.canon === 'Delivery'" :key="cat._id" :value="cat.name" checked>
							<strong>{{cat.name}}:</strong> {{cat.description}}
						</el-checkbox>
						<p>VISUALS</p>
						<el-checkbox :label="cat.name" v-for="cat in categories" v-if="cat.canon === 'Visuals'" :key="cat._id" :value="cat.name" checked>
							<strong>{{cat.name}}:</strong> {{cat.description}}
						</el-checkbox>
						<p>STYLE</p>
						<el-checkbox :label="cat.name" v-for="cat in categories" v-if="cat.canon === 'Style'" :key="cat._id" :value="cat.name" checked>
							<strong>{{cat.name}}:</strong> {{cat.description}}
						</el-checkbox>
						<p>MOVES</p>
						<el-checkbox :label="cat.name" v-for="cat in categories" v-if="cat.canon === 'Moves'" :key="cat._id" :value="cat.name" checked>
							<strong>{{cat.name}}:</strong>
						</el-checkbox>
					</el-checkbox-group>
				</div>
            </el-dialog> -->

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

			<!-- <el-tree :data="categories" :props="genreProps" @node-click="handleNodeClick" show-checkbox></el-tree> -->
			
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
				userId: this.$root.$options.authService.getAuthData().userId,
				// administrator, professor
				sidebarClassesTab: 'activeClasses',
				searchInputValue: '',
				activeClassesInputValue: '',
				archivedClassesInputValue: '',
				modalCreateClassIsOpen: false,
				modalDeleteClassIsOpen: false,
				modalArchiveClassIsOpen: false,
				modalUnarchiveClassIsOpen: false,
				// modalGenreCustomization2: false,
				// modalClassCategoriesIsOpen: false,
				classIdClicked: '',
				// Assignments
				modalClassAssignmentsIsOpen: false,
				assignmentSelectedId: '',
				assignmentsClassSelectedId: '',
				assignmentTitle: '',
				assignmentDescription: '',
				assignmentGenre: '',
				assignmentCategorySelected: '',
				categoriesCheckList: [],
				// Categories
				// categoriesGenre: '',
				currentGenre: '',
				modalGenreCustomization: false,
				modalAddCategoryIsOpen: false,
				newCategoryCanon: "",
				newCategoryName: "",
				newCategoryDesc: "",
				// STUDENT
				modalEnrollClassIsOpen: false,
				otherClasses: [],
				// Genre customization
				// Genre version 1
				canons: [
					{
						label: 'Moves',
						children: [
					// 		{ label: 'Introduction', children: [
					// 			{ label: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research' },
					// 			{ label: 'States the value of the present research and explains why it was conducted' },
					// 			{ label: 'Discusses the definitions of key terms' },
					// 			{ label: 'Summarizes and previews the methods used' },
					// 			{ label: 'Presents basic equations' },
					// 		]},
					// 		{ label: 'Methodology', children: [
					// 			{ label: 'Describes materials and instrumentation in the study' },
					// 			{ label: 'Describes tasks (actions) in the study' },
					// 			{ label: 'Describes the procedures of an experiment (activities)' },
					// 			{ label: 'Presents justification of techniques' },
					// 			{ label: 'Describes variables in the study' },
					// 			{ label: 'Describes the procedures used in data analysis' },
					// 			{ label: 'Describes the relations between the experiment and prior/subsequent experiments' },
					// 		]},
					// 		{ label: 'Results and Discussion', children: [
					// 			{ label: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research' },
					// 			{ label: 'States the value of the present research and explains why it was conducted' },
					// 			{ label: 'Discusses the definitions of key terms' },
					// 			{ label: 'Summarizes and previews the methods used' },
					// 			{ label: 'Presents basic equations' },
					// 		]},
					// 		{ label: 'Conclusion', children: [
					// 			{ label: 'xxxxxxxxxx' },
					// 		]},
					// 		{ label: 'Question and Answer', children: [
					// 			{ label: 'xxxxxxxxxx' },
					// 		]},
						]
					}, 
					{
						label: 'Structure',
						children: [
							// {
							// 	"_id": "59a86e7e0110587e400ff79b",
							// 	"name": "Coherence", // child label
							// 	"canon": "Structure", // canon label
							// 	"description": "Connects the central rhetorical moves for each section explicitly to each other" //desc
							// }
							// { label: 'Terms', desc: 'Provides overview of the talk, emphasizing the connection between key terms and concepts'},
							// { label: 'Conceptual transitions' },
							// { label: 'Line of argument' },
							// { label: 'Central moves' },
						]
					}, 
					{
						label: 'Delivery',
						children: [
							// { label: 'Volume' },
							// { label: 'Gestures' },
							// { label: 'Metadiscourse' },
							// { label: 'Posture' },
							// { label: 'Language' },
						]
					}, 
					{
						label: 'Style',
						children: [
							// { label: 'Coherence' },
							// { label: 'Concision' },
							// { label: 'Flow' },
							// { label: 'Emphasis' },
							// { label: 'Figures of Speech' },
							// { label: 'Figures of Sound' },
						]
					},
					{
						label: 'Visuals',
						children: [
							// { label: 'Pictorial cues' },
							// { label: 'Slide titles' },
							// { label: 'Image-text highlight' },
							// { label: 'Graphics' },
							// { label: 'Memorable images' }
						]
					},
				],
				genreProps: {
					children: 'children',
					label: 'label',
					desc: 'desc'
				},
				categoryProps: {
					children: 'children',
					label: 'label',
					desc: 'desc'
				},
				newClass: {
					archived: false,
					department: '',
					name: '',
					number: '',
					semester: ''
				},
			}
		},
		mounted () {
			this.fetchCategories()
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
				this.newClass['professorId'] = this.userId
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
			// ASSIGNMENTS
			fetchAssignments() {
				console.log(this.assignments)
				this.$store.dispatch('getAssignments', this.assignmentsClassSelectedId)
			},
			createAssignment() {
				if (this.assignmentsClassSelectedId !== '' && this.assignmentTitle !== '' && this.assignmentDescription !== '' && this.assignmentGenre !== '') {
					this.$store.dispatch('createAssignment', {
						classId: this.assignmentsClassSelectedId,
						title: this.assignmentTitle,
						description: this.assignmentDescription,
						genre: this.assignmentGenre
					})
					this.assignmentTitle = ''
					this.assignmentDescription = ''
					this.assignmentGenre = ''
				} else {
					alert('Please complete all assignment fields.')
				}
			},
			deleteAssignment(assignmentId) {
				console.log('delete assignment')
				this.$store.dispatch('deleteAssignment', assignmentId)
			},
			assignmentTabClicked(assignmentId) {
				console.log('tab clicked: ', assignmentId)
			},
			// edit functionality
			toggleTitleEdit(ev) {
				console.log("toggleTitleEdit()")
				ev.currentTarget.style.display = 'none'
				ev.currentTarget.parentElement.getElementsByClassName('assignments__titleInput')[0].style.display = 'block'
			},
			saveTitleEdit(ev) {
				console.log("saveTitleEdit()")
				ev.currentTarget.style.display = 'none'
				ev.currentTarget.parentElement.getElementsByClassName('assignments__titleText')[0].style.display = 'block'
				let editedId = ev.currentTarget.parentElement.getElementsByClassName('assignments__titleId')[0].innerHTML

				let assignmentObj = { classId: '', title: '', description: '', genre: '', id: '' }
				
				for (var i = 0, l = this.assignments.length; i < l; i++) {
					if (this.assignments[i].id === editedId) {
						assignmentObj.classId = this.assignments[i].classId
						assignmentObj.title = ev.currentTarget.parentElement.getElementsByClassName('assignments__titleInput')[0].value
						assignmentObj.description = this.assignments[i].description
						assignmentObj.genre = this.assignments[i].genre
						assignmentObj.id = editedId
					}
				}
				this.$store.dispatch('editAssignment', {
					id: editedId,
					assignment: assignmentObj
				})
			},
			toggleDescriptionEdit(ev) {
				console.log("toggleDescriptionEdit()")
				ev.currentTarget.style.display = 'none'
				ev.currentTarget.parentElement.getElementsByTagName('textarea')[0].style.display = 'block'
				console.log(this.assignments) 
			},
			saveDescriptionEdit(ev) {
				console.log("saveDescriptionEdit()")
				ev.currentTarget.style.display = 'none'
				ev.currentTarget.parentElement.getElementsByClassName('assignments__descText')[0].style.display = 'block'
				let editedId = ev.currentTarget.parentElement.getElementsByClassName('assignments__descId')[0].innerHTML

				let assignmentObj = { classId: '', title: '', description: '', genre: '', id: '' }

				for (var i = 0, l = this.assignments.length; i < l; i++) {
					if (this.assignments[i].id === editedId) {
						assignmentObj.classId = this.assignments[i].classId
						assignmentObj.title = this.assignments[i].title
						assignmentObj.description = ev.currentTarget.parentElement.getElementsByClassName('assignments__descText')[0].innerHTML
						assignmentObj.genre = this.assignments[i].genre
						assignmentObj.id = editedId
					}
				}
				
				this.$store.dispatch('editAssignment', {
					id: editedId,
					assignment: assignmentObj
				})
			},
			toggleGenreEdit(ev) {
				console.log("toggleGenreEdit()")
				ev.currentTarget.style.display = 'none'
				ev.currentTarget.parentElement.getElementsByClassName('assignments__genreSelect')[0].style.display = 'block'
			},
			saveGenreEdit(ev) {
				console.log("saveGenreEdit()")
				ev.currentTarget.style.display = 'none'
				ev.currentTarget.parentElement.getElementsByClassName('assignments__genreName')[0].style.display = 'block'
				let editedId = ev.currentTarget.parentElement.getElementsByClassName('assignments__genreId')[0].innerHTML

				let assignmentObj = { classId: '', title: '', description: '', genre: '', id: '' }
				
				for (var i = 0, l = this.assignments.length; i < l; i++) {
					if (this.assignments[i].id === editedId) {
						assignmentObj.classId = this.assignments[i].classId
						assignmentObj.title = this.assignments[i].title
						assignmentObj.description = this.assignments[i].description
						assignmentObj.genre = ev.currentTarget.parentElement.getElementsByClassName('assignments__genreSelect')[0].value
						assignmentObj.id = editedId
					}
				}
				this.$store.dispatch('editAssignment', {
					id: editedId,
					assignment: assignmentObj
				})
			},
			// CATEGORIES
			fetchCategories() {
				this.$store.dispatch('getCategories')
			},
			createCategoriesTreeDataForm() {
				try{
					// Clear out canon children, to get fresh ones from server
					for (var canon = 0; canon < this.canons.length; canon++) {
						this.canons[canon].children = []
					}
					// Loop through server categories
					for (var category = 0; category < this.categories.length; category++) {
						// Search for this category.canon in canons array
						for (var canon = 0; canon < this.canons.length; canon++) {
							if (this.canons[canon].label === this.categories[category].canon){
								// Push this category to the appropriate canon children array
								this.canons[canon].children.push(
									{
										label: this.categories[category].name, 
										desc: this.categories[category].description
									}
								)
							}
						}
					}
				}
				catch (err) {
					console.log("MtSidebar.vue: createCategoriesTreeDataForm error: ", err)
				}
			},
			addNewCategory() {
				console.log("Adding ", this.newCategoryName, "category to ", this.newCategoryCanon, "canon")
				console.log("With description ", this.newCategoryDesc)
				for (var canon = 0; canon < this.canons.length; canon++) {
					if (this.canons[canon].label === this.newCategoryCanon){
						this.canons[canon].children.push(
							{
								label: this.newCategoryName, 
								desc: this.newCategoryName
							}
						)
						this.newCategoryName = ''
						this.newCategoryDesc = ''
						this.newCategoryCanon = ''
					}
				}
			},
			categoriesListChanged() {
				console.log(this.categoriesCheckList)
				console.log('fetchCategories')
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
							userId : this.$root.$options.authService.getAuthData().userId
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
			}, 300),
			secondsToMMSS(s) {
				s = Number(s);

				var m = Math.floor(s % 3600 / 60);
				var s = Math.floor(s % 3600 % 60);

				return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
			},
		},
        computed: {
            ...mapGetters(
				[ 'videos', 'classes', 'activeClasses', 
				'archivedClasses', 'currentClassSelected', 'currentClassNumber', 
				'adminClasses', 'studentClasses', 'classesToEnroll', 
				'assignments', 'genres', 'categories'
				]
            )
		},
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



	/* ==============================================
                #MODAL-ASSIGNMENTS
	================================================= */
		.assignments-content {

		}

			.assignments__title {
				font-size: 16px;
			}

				.assignments__titleId {
					visibility: hidden;
				}

				.assignments__titleText {
					cursor: pointer;
					padding: 5px 0px;
				}
				.assignments__titleText:hover {
					background-color: #eee;
				}

				.assignments__titleInput {
					display: none;
				}

			.assignments__desc {
				font-size: 16px
			}

				.assignments__descTitle {
				}

				.assignments__descId {
					visibility: hidden;
				}
				
				.assignments__descText {
					cursor: pointer;
					padding: 5px 0px;
				}
				.assignments__descText:hover {
					background-color: #eee;
				}

				.assignments__descTextarea {
					display: none;
				}

			
			.assignments__genre {

			}

				.assignments__genreTitle {
					font-size: 16px;
				}
				.assignments__genreId {
					visibility: hidden;
				}

				.assignments__genreName {
					font-size: 16px;
					cursor: pointer;
					padding: 5px 0px;
				}
				.assignments__genreName:hover {
					background-color: #eee;
				}

				.assignments__genreSelect {
					display: none
				}

</style>
