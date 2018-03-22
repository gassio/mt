import Vue from 'vue'
import Vuex from 'vuex'
import secureHttpService from '../services/SecureHttpService'
import authService from '../services/AuthService'

Vue.use(Vuex)

import { Loading } from 'element-ui';
let loadingInstance = Loading.service({ fullscreen: true });
const restapi = ''   

let errorHTML = `
<div style="padding-top:50px;">
    <h1 style="font-size:28px">We couldn't load the presentation videos</h1>
    <p style="padding-top:5px; font-size:18px">Please contact your administrator</p>
</div>
`

export const store = new Vuex.Store({
    state: {
        videos: [],
        videoAnnotations: [],
        classes: [],
        canons: [   
            { 
                name: 'Moves', 
                categories: [
                    { 
                        name: 'Introduction',
                        mvs: [
                            { desc: 'Shows that the research area is important/central/interesting/problematic/relevant and narrows down to the topic of the research' },
                            { desc: 'States the value of the present research and explains why it was conducted' },
                            { desc: 'Discusses the definitions of key terms' },
                            { desc: 'Summarizes and previews the methods used' },
                            { desc: 'Presents basic equations' }
                        ]
                    },
                    { 
                        name: 'Methodology',
                        mvs: [
                            { desc: 'Describes materials and instrumentation in the study' },
                            { desc: 'Describes tasks (actions) in the study' },
                            { desc: 'Describes the procedures of an experiment (activities)'},
                            { desc: 'Presents justification of techniques ' },
                            { desc: 'Describes variables in the study' },
                            { desc: 'Describes the procedures used in data analysis' },
                            { desc: 'Describes the relations between the experiment and prior/subsequent experiments' }
                        ]
                    },
                    { 
                        name: 'Results and Discussion',
                        mvs: [
                            { desc: 'Provides a description of the analysis conducted'},
                            { desc: 'Provides a comprehensive/complete explanation of the results and of the data analysis'},
                            { desc: 'Describes the reliability/validity of the measures used in the experiment'},
                            { desc: 'States the data that neither support nor conflict with the major finding '},
                            { desc: 'Evaluates findings with respect to the hypotheses and comments on whether the results are expected '},
                            { desc: 'Evaluates trends and patterns '},
                            { desc: 'Accounts for data that do not support the major finding  '},
                            { desc: 'Describes established knowledge on the topic and refers to previous research for comparison  '},
                            { desc: 'Makes a claim about the generalizability of particular results  '},
                            { desc: 'Indicates limits of sources (including error analysis) '},
                            { desc: 'Indicates significance of the outcome'},
                        ]
                    },
                    { 
                        name: 'Conclusion',
                        mvs: [
                            { desc: 'Summarizes findings qualitatively and highlights the overall research outcomes'},
                            { desc: 'Strengthens the discussion by recapitulating main points (such as research questions, aims and purposes, and theoretical or methodological approach)'},
                            { desc: 'Makes suggestions for future research '}
                        ]
                    },
                    { 
                        name: 'Question and Answer',
                        mvs: [
                            { desc: 'Responds to questions directly'},
                            { desc: 'Provides conceptual links to the talk '},
                            { desc: 'Uses specific details to respond '},
                            { desc: 'Recommends future research in the field '},
                        ]
                    }
                ]
            },
            { 
                name: 'Structure', 
                categories: [
                    { 
                        name: 'Terms',
                        desc: 'Provides overview of the talk, emphasizing the connection between key terms and concepts'
                    },
                    { 
                        name: 'Conceptual transitions',
                        desc: 'Uses conceptual transitions to connect key sections of the presentation'
                    },
                    { 
                        name: 'Line of argument',
                        desc: 'Provides a clear line of argument which is brought to a clear position at the end'
                    },
                    { 
                        name: 'Central moves',
                        desc: 'Uses the central rhetorical moves for each section appropriately '
                    }
                    ]
            },
            { 
                name: 'Delivery', 
                categories: [
                    { 
                        name: 'Volume',
                        desc: 'Volume, rate, and pitch are appropriate and modulated'
                    },
                    { 
                        name: 'Gestures',
                        desc: 'Gestures, eye contact, and body movement used intentionally to engage audience'
                    },
                    { 
                        name: 'Metadiscourse',
                        desc: 'Metadiscourse orients listener and helps transition between sections'
                    },
                    { 
                        name: 'Posture',
                        desc: 'Posture and stance project confidence, and allow speaker to interact with audience and screen'
                    },
                    { 
                        name: 'Language',
                        desc: 'Technical and informal language are both employed as appropriate'
                    }
                ]
            },
            { 
                name: 'Visuals', 
                categories: [
                    { 
                        name: 'Pictorial cues',
                        desc: 'Uses primarily pictorial cues (limited text)'
                    },
                    { 
                        name: 'Slide titles',
                        desc: 'Uses assertion-based slide titles to convey key concepts (including title slide)'
                    },
                    { 
                        name: 'Image-text highlight',
                        desc: 'Images and text highlight/focus audience on key points'
                    },
                    { 
                        name: 'Graphics',
                        desc: 'Graphics show relevant data/concepts to support the claims'
                    },
                    { 
                        name: 'Memorable images',
                        desc: 'Memorable images provide necessary context to support the oral discussion'
                    }
                ]
            },
            { 
                name: 'Style', 
                categories: [
                    { 
                        name: 'Coherence ',
                        desc: 'Uses transitions at the sentence level to connect key concepts and parts of the argument'
                    },
                    { 
                        name: 'Concision',
                        desc: 'Uses the fewest possible words to explain the concepts for the audience, avoiding unnecessary repetition'
                    },
                    { 
                        name: 'Flow',
                        desc: 'Uses structures such as given/new or three-part structures to help the audience follow the argument'
                    },
                    { 
                        name: 'Emphasis',
                        desc: 'Uses specific words or phrases to draw attention to important concepts'
                    },
                    { 
                        name: 'Figures of Speech',
                        desc: 'Uses analogies, metaphors or other rhetorical devices to enhance the concepts and make the speech memorable'
                    },
                    { 
                        name: 'Figures of Sound',
                        desc: 'Uses auditory cues at the sentence (e.g. patterned parallelism) or word level (e.g. alliteration) to make the oral delivery more memorable'
                    }
                ]
            }
        ],
        categories: [],
        genres: [],
        adminClasses: [], // only for admin.
        activeClasses: [], // only for professor.
        archivedClasses: [], // only for professor.
        studentClasses: [], // only for student.
        classesToEnroll: [],
        departments: [], 
        currentClassSelected: 'Home', // the class that is click from the user
        currentClassNumber: '',
        currentVideoID: null,
        uploadingVideo: false,
        uploadUrl: '',
        assignments: [],
        collaborators: []
    },

    actions: {
        /* VIDEOS  */
        getAllVideos: function ({ commit }) {
            secureHttpService.get("video")
                .then(function (response)
                {
                    commit('GET_ALL_VIDEOS', response.data.data )
                })
                .catch(function (err) {
                    $('.home').html(errorHTML)
                })
        },
        getVideo: function ({ commit }, payload) {
            secureHttpService.get("video/" + payload)
                .then(function (response)
                {
                    commit('GET_VIDEO', response.data.data)
                })
                .catch(function (err) {
                    $('.video').html(errorHTML)
                })
        },
        createVideo: function ({ commit }, payload) {
            secureHttpService.post("video/" + payload)
                .then( response => {
                    console.log('-----')
                    console.log('POST video')
                    commit('CREATE_VIDEO', response.data.data)
                })
                .catch( response => {
                    console.log('createVideo action error.')
                    console.log('payload: ', payload)
                    console.log('error:', response.error)
                })
        },
        editVideo: function ({ commit }, payload) {
            secureHttpService.put("video/" + payload.videoId, payload.linkDurationThumb)
                .then( response => {
                    console.log('-----')
                    console.log('PUT video')
                    commit('EDIT_VIDEO', payload.linkDurationThumb, payload.videoId)
                })
                .catch( response => console.log(response.error))
        },
        deleteVideo: function ({ commit }, payload) {
            secureHttpService.delete("video/" + payload)
                .then( response => {
                    console.log('-----')
                    console.log('DELETE video')
                    commit('DELETE_VIDEO', payload)
                })
                .catch( response => console.log(response.error))
        },
        featureVideo: function ({ commit }, payload) {
            secureHttpService.put("video/" + payload.id, payload)
                .then( response => {
                    console.log("store.js: Video object that sent: ", payload)
                    console.log(response)
                })
                .catch( response => console.log(response.error))
        },
        featureGlobal: function ({ commit }, payload) {
            secureHttpService.put("video/" + payload.id, payload)
                .then( response => {
                    console.log("store.js: Video object that sent: ", payload)
                    console.log(response)
                })
                .catch( response => console.log(response.error))
        },
        unfeatureGlobal: function ({ commit }, payload) {
            secureHttpService.put("video/" + payload.id, payload)
                .then( response => {
                    console.log("store.js: Video object that sent: ", payload)
                    console.log(response)
                })
                .catch( response => console.log(response.error))
        },
        unfeatureVideo: function ({ commit }, payload) {
            secureHttpService.put("video/" + payload.id, payload)
            .then( response => {
                console.log("store.js: Video object that sent: ", payload)
                console.log(response)
            })
            .catch( response => console.log(response.error))
        },
        /* ANNOTATIONS */
        getVideoAnnotations: function ({ commit, state }, payload) {
            secureHttpService.get("annotation/?videoId=" + payload)
                .then(function (response)
                {
                    commit( 'GET_VIDEO_ANNOTATIONS', response.data.data )
                    state.videoAnnotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        addAnnotation: function ({ commit, state }, payload) {
            secureHttpService.post("annotation/?videoId=" + payload.videoId, payload)
                .then(response => {
                    commit('ADD_ANNOTATION', response.data.data)
                })
                .catch(function (err) {
                    console.log('Error annotation add...', err)
                })
        },
        editAnnotation: function ({ commit }, payload) {            
            secureHttpService.put("video/" + payload.id, payload.video)
                .then(response => {
                })
                .catch(function (err) {
                    console.log('Error annotation edit...', err)
                })
        },
        deleteAnnotation: function ({ commit }, payload) {           
            secureHttpService.delete("annotation/" + payload) // payload is the cardID
                .then(response => {
                    commit('DELETE_ANNOTATION', payload)
                    // theVideo.annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );                    
                })
                .catch(function (err) {
                    console.log('Error annotation delete...', err)
                })
        },
        /* CLASSES */  
        getAllClasses: function ({ commit }) {
            secureHttpService.get("class/")
                .then(function (response)
                {
                    commit('GET_ALL_CLASSES', response.data.data)
                    commit('CREATE_ADMIN_CLASSES' )
                    commit('CREATE_ACTIVE_ARCHIVED_CLASSES' )
                    commit('FILL_DEPARTMENTS')
                })
                .catch(function (err) {
                    $('.classes').html(errorHTML)
                })
        },
        getClass: function ({ commit }, payload) {
            secureHttpService.get("class/" + payload)
                .then(function (response)
                {
                    commit('GET_CLASS', response.data.data )
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        createEnrollment: function ({ commit }, payload) {
            secureHttpService.post("enrollment", payload)
                .then(function (response)
                {
                    // TODO call mutation
                    console.log(response)
                })
        },
        getEnrollments: function ({ commit }) {
            secureHttpService.get("enrollment/?userId=" + authService.getAuthData().userId)
                .then(function (response)
                {
                    var enrolledClassIds = []
                    var enrollments = response.data.data
                    for (var i = 0, l = enrollments.length; i < l; i++) {
                        if (enrollments[i].accepted){
                            enrolledClassIds.push(enrollments[i].classId)
                        }
                    }
                    commit( 'FILL_STUDENT_CLASSES', enrolledClassIds)
                })
        },
        createClass: function ({ commit }, payload) {
            secureHttpService.post("class/", payload.newClass)
            .then(response => {
                commit('CREATE_CLASS', response.data.data)
            })
            .catch(function (err) {
                console.log('Error createClass()', err)
            })
        },
        deleteClass: function ({ commit }, payload) {
            secureHttpService.delete("class/" + payload)
            .then(response => {
                commit('DELETE_CLASS', payload)
            })
            .catch(function (err) {
                console.log('Error deleteClass()', err)
            })
        },
        archiveClass: function ({ commit }, payload) {
            secureHttpService.put("class/" + payload.classId, payload.classObject)
            .then(response => {
                commit('ARCHIVE_CLASS', payload)
            })
            .catch(function (err) {
                console.log('archiveClass() action error: ', err)
            })
        },
        unArchiveClass: function ({ commit }, payload) {
            secureHttpService.put("class/" + payload.classId, payload.classObject)
            .then(response => {
                commit('UNARCHIVE_CLASS', payload)
            })
            .catch(function (err) {
                console.log('unarchiveClass() action error: ', err)
            })
        },
        /* ASSIGNMENTS */ 
        getAssignments: function ({ commit }, payload) {
            secureHttpService.get("assignment?classId=" + payload)
                .then(function (response)
                {
                    commit('GET_ASSIGNMENTS', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
        createAssignment: function ({ commit }, payload) {
            secureHttpService.post("assignment", payload)
                .then(function (response)
                {
                    commit('CREATE_ASSIGNMENT', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
        deleteAssignment: function ({ commit }, payload) {
            secureHttpService.delete("assignment/" + payload)
                .then(function (response)
                {
                    commit('DELETE_ASSIGNMENT', payload)
                })
                .catch(function (err) {
                    
                })
        },
        /* GENRES */ 
        getGenres: function ({ commit }) {
            secureHttpService.get("genre")
                .then(function (response)
                {
                    commit('GET_GENRES', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
        /* CATEGORIES */ 
        getCategories: function ({ commit }) {
            secureHttpService.get("category")
                .then(function (response)
                {
                    commit('GET_CATEGORIES', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
         /* COLLABORATORS */ 
         getCollaborators: function ({ commit }, payload) {
            secureHttpService.get("collaboration?videoId=" + payload)
                .then(function (response)
                {
                    commit('GET_COLLABORATORS', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
    },

    mutations: {
        /* VIDEOS */
        GET_ALL_VIDEOS: (state, newVideos) => {
            loadingInstance.close()
            state.videos = newVideos
            state.videos.sort(function(a,b) {return (a.presentedAt < b.presentedAt) ? 1 : ((b.presentedAt < a.presentedAt) ? -1 : 0);} );
            for (var i = 0, l = state.videos.length; i < l; i++) {
                Vue.set(state.videos[i], 'featured', false)
            }
        },
        GET_VIDEO: (state, video) => {
            loadingInstance.close()
            state.videos = video
        },
        CREATE_VIDEO: (state, payload) => {
            var videos = state.videos
            videos.push(payload)
        },
        EDIT_VIDEO: (state, payload) => {
            var videos = state.videos
            for (var i=0, l = state.videos.length; i < l; i++) {
                if (videos[i].id === payload.videoId) {
                    
                } 
            }
            
            videos.push(payload)
        },
        DELETE_VIDEO: (state, payload) => {
            var videos = state.videos
            for (var i=0, l = annotations.length; i < l; i++) {
                if (videos[i].id === payload.video.id)
                    videos.splice(i, 1)              
            }
        },
        // Not used.
        GET_CLASS_VIDEOS: (state, classTitle) => {
            for (var i=0, l = state.videos.length; i < l; i++) {
                if (state.videos[i].class !== classTitle) 
                    state.videos.splice(i,1)
            }
        },
        // Not used.
        CREATE_UPLOAD_URL: (state, payload) => {      
            state.uploadUrl = payload.link.protocol + '://' + payload.link.address + payload.link.path + '?api_format=xml&key=' + payload.link.query.key + '&token=' + payload.link.query.token
        },
        /* ANNOTATIONS */
        GET_VIDEO_ANNOTATIONS: (state, newAnnotations) => {
            state.videoAnnotations = newAnnotations
        },
        ADD_ANNOTATION: (state, payload) => {
            state.videoAnnotations.push(payload)
        },
        EDIT_ANNOTATION: (state, payload) => {
            var currentAnnotation = state.videos[payload.id].annotations[payload.cardID]
            var annotations = state.videos[payload.id].annotations
            
            currentAnnotation.rating = payload.rating
            currentAnnotation.comment = payload.comment
            currentAnnotation.from = payload.from
            currentAnnotation.to = payload.to
            
            // Sorting annotations[] by from property
            annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );
            
            secureHttpService.put("video/" + payload.id)
            .then(response => {
                console.log(payload.videoObj)
                console.log('Success edit!')
            })
            .catch(function (err) {
                console.log('Error annotation edit...')
            })
        },
        DELETE_ANNOTATION: (state, payload) => {
            for (var i = 0, l = state.videoAnnotations.length; i < l; i++) {
                if (state.videoAnnotations[i].id === payload) {
                    state.videoAnnotations.splice(i, 1)
                }
            } 
        },
        SORT_ANNOTATIONS: (state) => {
            var annotations = state.videos.annotations
            annotations.sort(function(a,b) {return (a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0);} );
        },
        /* CLASSES */ 
        GET_ALL_CLASSES: (state, theClasses) => {
            loadingInstance.close()
            state.classes = theClasses
        },
        GET_CLASS: (state, theClass) => {
            loadingInstance.close()
            state.classes = theClass
        },
        CREATE_CLASS: (state, payload) => {
            state.classes.push(payload)
            state.adminClasses.push(payload)
            state.activeClasses.push(payload)
        },
        // Only for admin.
        DELETE_CLASS: (state, payload) => {
            for (var i = 0, l = state.adminClasses.length; i < l; i++) {
                if (state.adminClasses[i].id === payload) {
                    state.adminClasses.splice(i, 1)              
                }
            }
        },
        // Student only. Not completed.
        ENROLL_TO_CLASS: (state, payload) => {
            // state.classes.push(payload.newClass)
            state.activeClasses.push(payload)
        },
        CREATE_ACTIVE_ARCHIVED_CLASSES: (state) => {
            state.activeClasses = []
            state.archivedClasses = []
            for (var i = 0, l = state.classes.length; i < l; i++) {
                if (state.classes[i].archived === false)
                    state.activeClasses.push(state.classes[i])
                else
                    state.archivedClasses.push(state.classes[i])
            }
        },
        CREATE_ADMIN_CLASSES: (state) => {
            state.adminClasses = []
            for (var i = 0, l = state.classes.length; i < l; i++) {
                state.adminClasses.push(state.classes[i])
            }
        },
        FILL_STUDENT_CLASSES: (state, payload) => {
            state.studentClasses = []
            state.classesToEnroll = []

            var enrolledClassIds = payload
            for (var j = 0, m = state.classes.length; j < m; j++) {
                if (state.classes[j].archived === false) {
                    for (var i = 0, l = enrolledClassIds.length; i < l; i++) {
                        if (enrolledClassIds[i] === state.classes[j].id) {
                            state.studentClasses.push(state.classes[j])
                            break
                        } 
                    }
                }
            }
            for (var j = 0, m = state.classes.length; j < m; j++) {
                if (state.classes[j].archived === false) {
                    for (var i = 0, l = state.studentClasses.length; i < l; i++) {
                        var foundInStudentClasses = false
                        if (state.studentClasses[i].id === state.classes[j].id) {
                            foundInStudentClasses = true
                            break
                        } 
                    }
                    if (!foundInStudentClasses){
                        state.classesToEnroll.push(state.classes[j])
                    }
                }
            }
        },
        ARCHIVE_CLASS: (state, payload) => {
            var classes = state.classes
            for (var i = 0, l = state.activeClasses.length; i < l; i++) {
                if (state.activeClasses[i].id === payload.classId) {
                    state.activeClasses.splice(i, 1)
                    state.archivedClasses.push(payload.classObject)
                }
            }
        },
        UNARCHIVE_CLASS: (state, payload) => {
            var classes = state.classes
            for (var i = 0, l = state.archivedClasses.length; i < l; i++) {
                if (state.archivedClasses[i].id === payload.classId) {
                    state.archivedClasses.splice(i, 1)
                    state.activeClasses.push(payload.classObject)
                }
            }
        },
        // Is used for search functionality.    
        FILTER_ADMIN_CLASSES: (state, inputValue) => {
            // An array that helps for the filtering.
            const adminClassesLocal = []
            for (var i = 0, l = state.classes.length; i < l; i++) {
                adminClassesLocal.push(state.classes[i])
            }

            // Define the filter method that will be used above.
            var filterClasses = (queryString) => {
                return (theClass) => {
                    return theClass.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                }
            }  
            state.adminClasses = adminClassesLocal.filter(filterClasses(inputValue))
        },
        // Is used for search functionality.
        FILTER_ACTIVE_CLASSES: (state, inputValue) => {
            // An array that helps for the filtering.
            const activeClassesLocal = []
            for (var i = 0, l = state.classes.length; i < l; i++) {
                if (state.classes[i].archived === false)
                    activeClassesLocal.push(state.classes[i])
            }

            // Define the filter method that will be used above.
            var filterClasses = (queryString) => {
                return (theClass) => {
                    return theClass.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                }
            }  
            state.activeClasses = activeClassesLocal.filter(filterClasses(inputValue))
        },
        // Is used for search functionality.    
        FILTER_ARCHIVED_CLASSES: (state, inputValue) => {
            // An array that helps for the filtering.
            const archivedClassesLocal = []
            for (var i = 0, l = state.classes.length; i < l; i++) {
                if (state.classes[i].archived === true)
                archivedClassesLocal.push(state.classes[i])
            }

            // Define the filter method that will be used above.
            var filterClasses = (queryString) => {
                return (theClass) => {
                    return theClass.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                }
            }  
            state.archivedClasses = archivedClassesLocal.filter(filterClasses(inputValue))
        },
        // Is used for search functionality.    
        FILTER_STUDENT_CLASSES: (state, inputValue) => {
            // An array that helps for the filtering.
            const studentClassesLocal = []
            for (var i = 0, l = state.classes.length; i < l; i++) {
                if (state.classes.archived === false)
                    studentClassesLocal.push(state.classes[i])
            }

            // Define the filter method that will be used above.
            var filterClasses = (queryString) => {
                return (theClass) => {
                    return theClass.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                }
            }  
            state.studentClasses = studentClassesLocal.filter(filterClasses(inputValue))
        },
        FILL_DEPARTMENTS: (state) => {
            for (var i = 0, l = state.classes.length; i < l; i++) {
                if (!state.departments.includes(state.classes[i].department))
                    state.departments.push(state.classes[i].department)
            }
        },
        SET_UPLOAD_URL: (state, payload) => {
            state.uploadUrl = payload
        },
        CURRENT_CLASS_SELECT: (state, payload) => {
            state.currentClassSelected = payload.className
            state.currentClassNumber = payload.classNumber
        },
        /* ASSIGNMENTS */
        GET_ASSIGNMENTS: (state, assignments) => {
            state.assignments = assignments
        },
        CREATE_ASSIGNMENT: (state, newAssignment) => {
            state.assignments.push(newAssignment)
        },
        DELETE_ASSIGNMENT: (state, assignmentIdToBeDeleted) => {
            for (var i = 0, l = state.assignments.length; i < l; i++) {
                if (state.assignments[i].id === assignmentIdToBeDeleted) 
                    state.assignments.splice(i,1)
            }
        },
        /* GENRES */
        GET_GENRES: (state, genres) => {
            state.genres = genres
        },
        /* CATEGORIES */
        GET_CATEGORIES: (state, categories) => {
            state.categories = categories
        },
        /* COLLABORATORS */
        GET_COLLABORATORS: (state, collaborators) => {
            state.collaborators = collaborators
        },
    },

    getters: {
        videos: state => {
            return state.videos
        },
        videoAnnotations: state => {
            return state.videoAnnotations
        },
        classes: state => {
            return state.classes
        },
        assignments: state => {
            return state.assignments
        },
        genres: state => {
            return state.genres
        },
        categories: state => {
            return state.categories
        },
        collaborators: state => {
            return state.collaborators
        },
        currentVideoID: state => {
            return state.currentVideoID
        },
        canons: state => {
            return state.canons
        },
        classesToEnroll: state => {
            return state.classesToEnroll
        },
        adminClasses: state => {
            return state.adminClasses
        },
        activeClasses: state => {
            return state.activeClasses
        },
        archivedClasses: state => {
            return state.archivedClasses
        },
        studentClasses: state => {
            return state.studentClasses
        },
        departments: state => {
            return state.departments
        },
        currentClassSelected: state => {
            return state.currentClassSelected
        },
        currentClassNumber: state => {
            return state.currentClassNumber
        },
        uploadVideoProps: state => {
            return state.uploadVideoProps
        },
        uploadUrl: state => {
            return state.uploadUrl
        },
        uploadingVideo: state => {
            return state.uploadingVideo
        }
    }
})