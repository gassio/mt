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
                    <router-link to="/" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active" exact>Home</router-link>
                    <router-link to="/classes" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Classes</router-link>
                    <router-link to="/wiki" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Wiki</router-link>
                    <router-link to="/library" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active">Library</router-link>
                    <router-link to="/admin" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active"><strong>Admin</strong></router-link>
                    <router-link to="/professor" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active"><strong>Professor</strong></router-link>
                    <router-link to="/student" class="head__nav-item navbar-item" tag="a" active-class="head__nav-item-active"><strong>Student</strong></router-link>
                </div>
                <div class="navbar-end">
                    <a class="head__nav-item navbar-item badge" :data-badge="studentRequests" @click="modalStudentRequestsIsOpen = true"><p>Student requests</p></a>
                    <a class="head__nav-item navbar-item"><p>Ben Domino</p><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <el-dialog title="Student requests" :visible.sync="modalStudentRequestsIsOpen" class="modal-student-requests">
                  <el-tabs v-model="activeTab">
                    <el-tab-pane label="Enrolled students" name="enrolledStudents">
                         <el-table :data="enrolledStudents" style="width: 100%" :show-header="false">
                            <el-table-column prop="name" label="Student name" width="180">
                            </el-table-column>
                            <el-table-column prop="status" label="Student status">
                            </el-table-column>
                            <el-table-column prop="action" label="Action">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="New students" name="newStudents">
                        <el-table ref="multipleTable" :data="newStudents" :border="false" style="width: 100%" @selection-change="handleSelectionChange" :show-header="false">
                            <el-table-column property="name" label="Name">
                            </el-table-column>
                            <el-table-column property="status" label="Address">
                            </el-table-column>
                            <el-table-column type="selection">
                            </el-table-column>
                        </el-table>
                        <el-button @click="toggleSelection()">Clear selection</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>	

        </div>
    </nav>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
                studentRequests: 6,
                modalStudentRequestsIsOpen: false,
                activeTab: 'enrolledStudents',
                enrolledStudents: [
                    {
                        name: 'Ben Domino',
                        status: 'Enrolled'
                    }, {
                        name: 'Bill Gates',
                        status: 'Enrolled'
                    }, {
                        name: 'Steve Jobs',
                        status: 'Enrolled'
                    }, {
                        name: 'Linus Torvalds',
                        status: 'Enrolled'
                    }
                ],
                newStudents: [
                    {
                        name: 'Ben Domino',
                        status: 'New'
                    }, {
                        name: 'Bill Gates',
                        status: 'New'
                    }, {
                        name: 'Steve Jobs',
                        status: 'New'
                    }, {
                        name: 'Linus Torvalds',
                        status: 'New'
                    }
                ],
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
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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