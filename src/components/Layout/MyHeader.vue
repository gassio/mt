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
                    <router-link to="/professor" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active" exact>Home</router-link>
                    <router-link to="/wiki" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Wiki</router-link>
                    <router-link to="/library" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Library</router-link>
					<router-link to="/admin" style="color:#A90931" tag="a"><strong>Admin</strong></router-link>
					<router-link to="/student" style="color:#A90931" tag="a"><strong>Student</strong></router-link>
                </div>
                <div class="navbar-end">
                    <a class="head__nav-item navbar-item badge" :data-badge="studentRequests" @click="openModalStudentRequests()"><p>Student requests</p></a>
                    <a class="head__nav-item navbar-item"><p>Ben Domino</p><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <el-dialog title="STUDENT REQUESTS" :visible.sync="modalStudentRequestsIsOpen" class="modal-student-requests">
                <el-tabs v-model="studentRequestsTab">
                    <el-tab-pane label="Enrolled students" name="enrolledStudents">
                        <el-input icon="search" v-model="enrolledStudentsInputValue" @change="queryEnrolledStudents()" placeholder="Search a student..." style="width:220px;margin-bottom:7px;" class="mt-search-input"></el-input>
                        <el-table :data="enrolledStudentsClone" style="width: 100%" :show-header="false" empty-text="No enrolled students">
                            <el-table-column prop="name" width="180">
                                <template slot-scope="s1">
                                    <i class="fa fa-user"></i> {{ s1.row.name }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="class">
                                <template slot-scope="s1b">
                                    <i class="fa fa-book"></i> {{ s1b.row.class }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="Requested students" name="requestedStudents">
                        <el-input icon="search" v-model="requestedStudentsInputValue" @change="queryRequestedStudents()" placeholder="Search a student..." style="width:220px;margin-bottom:7px;"></el-input>
                        <el-table ref="multipleTable" :data="requestedStudentsClone" :border="false" style="width: 100%" :show-header="false" empty-text="No student requests">
                            <el-table-column prop="name" width="140">
                                <template slot-scope="s2">
                                    <i class="fa fa-user"></i> {{ s2.row.name }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="class" width="280">
                                <template slot-scope="s2b">
                                    <i class="fa fa-book"></i> {{ s2b.row.class }}
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="acceptStudent(scope.$index, scope.row)">Accept request</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br>
                        <el-button @click="acceptAllStudents()">Accept all</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>	

        </div>
    </nav>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'
    import _ from 'lodash'

    export default {
        data() {
            return {
                studentRequests: 2,
                modalStudentRequestsIsOpen: false,
                studentRequestsTab: 'enrolledStudents',
                enrolledStudentsInputValue: '',                          
                enrolledStudents: [
                    {
                        name: 'Ben Domino',
                        class: 'Materials Science and Engineering'
                    }, {
                        name: 'Bill Gates',
                        class: 'Materials Science and Engineering'
                    }, {
                        name: 'Steve Jobs',
                        class: 'Aeronautics and Astronautics'
                    }, {
                        name: 'Linus Torvalds',
                        class: 'Rhetoric and Writing'
                    }],
                enrolledStudentsClone: [],
                requestedStudentsInputValue: '',
                requestedStudents: [
                    {
                        name: 'Julius Caesar',
                        class: 'Materials Science and Engineering'
                    }, {
                        name: 'Alan Turing',
                        class: 'Aeronautics and Astronautics'
                    }],
                requestedStudentsClone: [],
                multipleSelection: []
            }
        },
        mounted() {
            document.addEventListener('DOMContentLoaded', function () {

                // Get all "navbar-burger" elements
                var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

                // Check if there are any navbar burgers
                if ($navbarBurgers.length > 0) {

                    // Add a click event on each of them
                    $navbarBurgers.forEach(function ($el) {
                        $el.addEventListener('click', function () {

                            // Get the target from the "data-target" attribute
                            var target = $el.dataset.target;
                            var $target = document.getElementById(target);
                            console.log($target)
                            console.log($el)

                            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                            $el.classList.toggle('is-active');
                            $target.classList.toggle('is-active');

                        });
                    });
                }

            });
        },
        methods: {
            openModalStudentRequests() {
                this.modalStudentRequestsIsOpen = true

                this.cloneEnrolledStudents() // Clone the enrolledStudents array
                this.cloneRequestedStudents() // Clone the requestedStudents array
            },
            cloneEnrolledStudents() {
                this.enrolledStudentsClone = []
                for (var i = 0, l = this.enrolledStudents.length; i < l; i++) {
                    this.enrolledStudentsClone.push(this.enrolledStudents[i])
                }
            },
            cloneRequestedStudents() {
                this.requestedStudentsClone = []
                for (var i = 0, l = this.requestedStudents.length; i < l; i++) {
                    this.requestedStudentsClone.push(this.requestedStudents[i])
                }
            },
            queryEnrolledStudents: _.debounce(function () {
                console.log('QUERY ENROLLED STUDENTS')

                // Define the filter method that is used above.
                var filterStudents = (queryString) => {
                    return (student) => {
                        return student.name.toLowerCase().indexOf(queryString) === 0
                    }
                } 

                this.enrolledStudentsClone = this.enrolledStudents.filter(filterStudents(this.enrolledStudentsInputValue))
     		}, 500),
            queryRequestedStudents: _.debounce(function () {
                console.log('QUERY REQUESTED STUDENTS')

                // Define the filter method that is used above.
                var filterStudents = (queryString) => {
                    return (student) => {
                        return student.name.toLowerCase().indexOf(queryString) === 0
                    }
                } 

                this.requestedStudentsClone = this.requestedStudents.filter(filterStudents(this.requestedStudentsInputValue))
     		}, 500),
            acceptStudent(index, row) {
                this.requestedStudents.splice(index, 1)
                this.requestedStudentsClone.splice(index, 1) // Same for the Cloned array.
                this.enrolledStudents.push(row)
                this.enrolledStudentsClone.push(row) // Same for the Cloned array.
            },
            acceptAllStudents() {
                for (var i = 0, l = this.requestedStudents.length; i < l; i++) {
                    this.enrolledStudents.push(this.requestedStudents[i])
                    this.enrolledStudentsClone.push(this.requestedStudents[i]) // Same for the Cloned array.
                }
                this.requestedStudents = []
                this.requestedStudentsClone = [] // Same for the Cloned array.
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
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
    background-color: #A90931;
    display: flex;
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

        .head__nav-item {
            margin-left: 20px;
            padding: 10px 16px;
        }
        .head__nav-item {
            color: #FFFFFF !important;
        }
        .head__nav-item:hover {
            background-color: #8F082A !important;
            color: #FFF;
        }

        .head__nav-item-active {
            background-color: #8F082A;
            border-radius: 3px;
            padding: 10px 16px;
        }

        .navbar-end .head__nav-item i {
            margin-left: 5px;
        }

/* ==============================================
            #STUDENT-REQUESTS
================================================= */

    .badge {
		position:relative;
	}
	.badge[data-badge]:after {
		content:attr(data-badge);
		position:absolute;
		top:3px;
		right:-5px;
		font-size:.7em;
		background:green;
		color:white;
		width:18px;height:18px;
		text-align:center;
		line-height:18px;
		border-radius:50%;
		box-shadow:0 0 1px #333;
	}



.modal-student-requests .el-dialog__body{
    padding: 10px 20px 20px 20px;
}

</style>