<template>
    <nav class="head navbar">
        <div class="container">

            <div class="navbar-brand">
                <!-- <router-link to="/" tag="span" class="navbar-item"> -->
                    <span class="navbar-item">
                        <img src="../../assets/logo-white.png" width="112" height="28">
                    </span>
                <!-- </router-link> -->
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                                                                                                                    <!-- https://github.com/vuejs/vue-router/issues/800 -->
                    <router-link to="/" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active" @click.native="setCurrentClass('Home')" exact>Home</router-link>
                    <router-link to="/wiki" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active" exact>Wiki</router-link>
                </div>
                <div class="navbar-end">
                    <a class="head__nav-item navbar-item badge" :data-badge="this.requestedStudentsLen"  @click="openModalStudentRequests()"><p>Student requests</p></a>
                    <a class="head__nav-item navbar-item"><p><i class="fa fa-user-circle"></i> {{ usernameRole }}</p></a> 
                    <!-- <i class="fa fa-angle-down"></i> -->
                    <a class="head__nav-item navbar-item" @click="logOut()"><p><i class="fa fa-sign-out"></i>Logout</p></a>
                </div>
            </div>

            <el-dialog title="STUDENT REQUESTS" :visible.sync="modalStudentRequestsIsOpen" class="modal-student-requests">
                <el-tabs v-model="studentRequestsTab">
                    <el-tab-pane label="Enrolled students" name="enrolledStudents">
                        <el-input icon="search" v-model="enrolledStudentsInputValue" @change="queryEnrolledStudents()" placeholder="Search a student..." style="width:220px;margin-bottom:7px;" class="mt-search-input"></el-input>
                        <el-table :data="enrolledStudentsClone" style="width: 100%" :show-header="false" empty-text="No enrolled students">
                            <el-table-column prop="name" width="180">
                                <template scope="s1">
                                    <i class="fa fa-user"></i> {{ s1.row.user.firstName + " " +  s1.row.user.lastName}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="class">
                                <template scope="s1b">
                                    <i class="fa fa-book"></i> {{ s1b.row.class.name }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="Requested students" name="requestedStudents">
                        <el-input icon="search" v-model="requestedStudentsInputValue" @change="queryRequestedStudents()" placeholder="Search a student..." style="width:220px;margin-bottom:7px;"></el-input>
                        <el-table :data="requestedStudentsClone" :border="false" style="width: 100%" :show-header="false" empty-text="No student requests">
                            <el-table-column prop="name">
                                <template scope="s2">
                                    <i class="fa fa-user"></i> {{ s2.row.user.firstName + " " +  s2.row.user.lastName}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="class">
                                <template scope="s2b">
                                    <i class="fa fa-book"></i> {{ s2b.row.class.name }}
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template scope="scope">
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
        props: ['userProfile'],
        data() {
            return {
                usernameRole: "",
                modalStudentRequestsIsOpen: false,
                studentRequestsTab: 'enrolledStudents',
                enrolledStudentsInputValue: '',
                enrolledStudentsClone: [],
                requestedStudentsInputValue: '',
                requestedStudentsClone: [],
                multipleSelection: [],
                authData: {}
            }
        },
        methods: {
            setCurrentClass(className, classNumber) {
                console.log('CURRENT_CLASS_SELECT')
                this.$store.commit('CURRENT_CLASS_SELECT', {className: className, classNumber: classNumber})
            },
            logOut() {
                this.$router.push('/login')
                this.$root.$options.authService.logOff()
                // this.$store.commit('AUTHENTICATED', "logout") // Change store.authenticated to false (becomes true in login)
                // this.$store.commit('SET_USER_PROFILE', {})
            },
            openModalStudentRequests() {
                this.modalStudentRequestsIsOpen = true
                this.updateEnrollments() 
            },
            updateEnrollments() {
                // console.log("updenr")
                var self = this
                this.$store.dispatch('getEnrollments').then(function() {
                    self.$store.commit('FILTER_ENROLLMENTS')
                    self.cloneEnrolledStudents() // Clone the enrolledStudents array
                    self.cloneRequestedStudents() // Clone the requestedStudents array
                    // console.log(self.requestedStudentsLen)
                }).catch(function(err) {console.log('getEnrollments failed ', err)})
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
                var acceptedEnrollment = row.enrollment
                acceptedEnrollment.accepted = true
                var self = this
                this.$store.dispatch( 'acceptEnrollment', { id: row.enrollment.id , body: acceptedEnrollment } )
                .then(function(){
                    self.updateEnrollments()
                })
                .catch(function(err){
                    console.log(err)
                })
                // this.requestedStudents.splice(index, 1)
                // this.requestedStudentsClone.splice(index, 1) // Same for the Cloned array.
                // this.enrolledStudents.push(row)
                // this.enrolledStudentsClone.push(row) // Same for the Cloned array.
            },
            acceptAllStudents() {
                // this.$store.commit('ACCEPT_ENROLLMENT')
                // for (var i = 0, l = this.requestedStudents.length; i < l; i++) {
                //     this.enrolledStudents.push(this.requestedStudents[i])
                //     this.enrolledStudentsClone.push(this.requestedStudents[i]) // Same for the Cloned array.
                // }
                // this.requestedStudents = []
                // this.requestedStudentsClone = [] // Same for the Cloned array.
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
        mounted() {
            this.authData = this.$root.$options.authService.getAuthData()
            this.usernameRole = this.authData.firstName + " " + this.authData.lastName[0].toUpperCase() + ". - " + this.authData.role[0].toUpperCase() + this.authData.role.slice(1)
            // setInterval(() => {
            //     const authService = this.$root.$options.authService
            //     console.log(authService.getAuthData())

            //     try {
            //         this.authData = authService.getAuthData().data
            //     } 
            //     catch(err) {
            //         return null
            //     }
            // }, 1000)

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
        computed: {
            ...mapGetters([
                'uploadingVideo', 'requestedStudents', 'enrolledStudents',
                'requestedStudentsLen'
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