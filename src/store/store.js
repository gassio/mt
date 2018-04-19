import Vue from 'vue'
import Vuex from 'vuex'
import secureHTTPService from '../services/SecureHttpService'
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
        canons: {
            // Structure: {
            //     _id: '59a870870110587e400ff7c4',
            //     name: 'Structure',
            //     categories: [
            //         {
            //             _id: '5ad5394e4da6db26cc8997d8',
            //             name: 'Coherence',
            //             canon: 'Structure',
            //             description: 'Connects the central rhetorical moves for each section explicitly to each other',
            //             id: '23ce4e5a-7be5-4f92-878c-b312cda3c1df',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997d9',
            //             name: 'Argumentation',
            //             canon: 'Structure',
            //             description: 'Provides a clear line of argument which is brought to a clear position at the end',
            //             id: '20333182-94e6-4867-8295-d4014531254e',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e1',
            //             name: 'Overview',
            //             canon: 'Structure',
            //             description: 'Provides overview of the talk, emphasizing the connection between key terms and concepts',
            //             id: 'f72f342e-1284-48d5-b3f9-11e873f01572',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e3',
            //             name: 'Transitions',
            //             canon: 'Structure',
            //             description: 'Uses conceptual transitions to connect key sections of the presentation',
            //             id: 'af69b134-0df7-41d4-bdba-95768f13548d',
            //             subcategories: [],
            //         },
            //     ],
            // },
            // Style: {
            //     _id: '59a870870110587e400ff7c5',
            //     name: 'Style',
            //     categories: [
            //         {
            //             _id: '5ad5394e4da6db26cc8997e0',
            //             name: 'Coherence',
            //             canon: 'Style',
            //             description: 'Uses transitions at the sentence level to connect key concepts and parts of the argument',
            //             id: '48de9842-8b5a-48c7-8b73-d05546246bca',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e2',
            //             name: 'Concision',
            //             canon: 'Style',
            //             description: 'Uses the fewest possible words to explain the concepts for the audience, avoiding unnecessary repetition',
            //             id: '4092dbf3-d5e0-4ba0-95fe-fc66ec5c909a',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e4',
            //             name: 'Emphasis',
            //             canon: 'Style',
            //             description: 'Uses specific words or phrases to draw attention to important concepts',
            //             id: '0f0e3a71-0b43-4468-876e-45952cf20f0a',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e9',
            //             name: 'Figures of Sound',
            //             canon: 'Style',
            //             description: 'Uses auditory cues at the sentence (e.g. patterned parallelism) or word level (e.g. alliteration) to make the oral delivery more memorable',
            //             id: '851035a5-c902-44b6-a258-ace5149101d8',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997ea',
            //             name: 'Flow',
            //             canon: 'Style',
            //             description: 'Uses structures such as given/new or three-part structures to help the audience follow the argument',
            //             id: '6e57c08d-8a83-49f7-9eb2-fb9a6f84ff52',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e7',
            //             name: 'Figures of Speech/Tropes',
            //             canon: 'Style',
            //             description: 'Uses analogies, metaphors or other rhetorical devices to enhance the concepts and make the speech memorable',
            //             id: '01c188b8-9f1c-4683-9e8d-fc3213e5538e',
            //             subcategories: [],
            //         },
            //     ],
            // },
            // Invention: {
            //     _id: '59a870870110587e400ff7c3',
            //     name: 'Invention',
            //     categories: [
            //         {
            //             _id: '5ad53bbdfbe7273c8c2ed0dd',
            //             canon: 'Invention',
            //             name: 'Appeals',
            //             id: '7d6a2b42-3803-402c-8c2a-a789b72bdcd7',
            //             subcategories: [
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a1',
            //                     canon: 'Invention',
            //                     parentId: '7d6a2b42-3803-402c-8c2a-a789b72bdcd7',
            //                     name: 'Pathos',
            //                     description: 'Appeals to human emotion, desire, or passion',
            //                     id: '7b94bf7a-69d7-434c-98d7-31b29f12b1bb',
            //                 },
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a0',
            //                     canon: 'Invention',
            //                     parentId: '7d6a2b42-3803-402c-8c2a-a789b72bdcd7',
            //                     name: 'Logos',
            //                     description: 'Appeals to reason or logic, including appeals to statistics, math, logic, order, and "objectivity."',
            //                     id: '17f9e576-0e8e-4d24-a32c-e5ff37c26b2a',
            //                 },
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a2',
            //                     canon: 'Invention',
            //                     parentId: '7d6a2b42-3803-402c-8c2a-a789b72bdcd7',
            //                     name: 'Ethos',
            //                     description: 'Appeals to the character or authority of the speaker (situated or invented)\n',
            //                     id: '41e813c6-ab17-4ac0-a4d4-64bf9ad24094',
            //                 },
            //             ],
            //         },
            //         {
            //             _id: '5ad53bbdfbe7273c8c2ed0de',
            //             canon: 'Invention',
            //             name: 'Kairos',
            //             id: 'fe224053-31cd-4e0c-9453-4dc592696ec4',
            //             subcategories: [
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a4',
            //                     canon: 'Invention',
            //                     parentId: 'fe224053-31cd-4e0c-9453-4dc592696ec4',
            //                     name: 'Relationship',
            //                     description: 'Audience-speaker relationship at the moment',
            //                     id: '3c4daec2-6475-44ae-ac4e-0e517bb82ec8',
            //                 },
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a6',
            //                     canon: 'Invention',
            //                     parentId: 'fe224053-31cd-4e0c-9453-4dc592696ec4',
            //                     name: 'Dynamics',
            //                     description: 'Power dynamics between communities or groups',
            //                     id: 'c421ba0e-d1dc-4fe1-8f45-cebc7d67e4f5',
            //                 },
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a3',
            //                     canon: 'Invention',
            //                     parentId: 'fe224053-31cd-4e0c-9453-4dc592696ec4',
            //                     name: 'Exigence',
            //                     description: 'Recent events to show urgency or relevance to the present (situation-driven)',
            //                     id: '1bf0403c-893b-4c7e-85e5-91164f46bd38',
            //                 },
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a5',
            //                     canon: 'Invention',
            //                     parentId: 'fe224053-31cd-4e0c-9453-4dc592696ec4',
            //                     name: 'Alignment',
            //                     description: 'Alignment to communities taking positions and serving a set of interests',
            //                     id: 'e44df013-3aab-464c-b795-02b191a89bd3',
            //                 },
            //                 {
            //                     _id: '5ad53d1be1a09324acc3d8a7',
            //                     canon: 'Invention',
            //                     parentId: 'fe224053-31cd-4e0c-9453-4dc592696ec4',
            //                     name: 'Argumentation',
            //                     description: 'Preferred or appropriate lines of argument, given the audience’s values/needs',
            //                     id: 'fbcca7e0-a167-4055-8f7b-14755e4772fe',
            //                 },
            //             ],
            //         },
            //         {
            //             _id: '5ad53bbdfbe7273c8c2ed0df',
            //             canon: 'Invention',
            //             name: 'Stasis',
            //             id: '0489dfca-5464-4bb1-85ef-05442b1bc629',
            //             subcategories: [
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8a8',
            //                 canon: 'Invention',
            //                 parentId: '0489dfca-5464-4bb1-85ef-05442b1bc629',
            //                 name: 'Fact',
            //                 id: '0d026903-6334-47aa-b32e-4ca346df7046',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8a9',
            //                 canon: 'Invention',
            //                 parentId: '0489dfca-5464-4bb1-85ef-05442b1bc629',
            //                 name: 'Definition',
            //                 id: 'c48bf3c7-129e-47e8-80c0-0a95a63182ad',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8aa',
            //                 canon: 'Invention',
            //                 parentId: '0489dfca-5464-4bb1-85ef-05442b1bc629',
            //                 name: 'Causation',
            //                 id: '4e4ac743-0e08-463a-af6c-69a65a4f1ddb',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8ab',
            //                 canon: 'Invention',
            //                 parentId: '0489dfca-5464-4bb1-85ef-05442b1bc629',
            //                 name: 'Quality',
            //                 id: '82068c97-f959-4146-8830-9c44d7ed3248',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8ad',
            //                 canon: 'Invention',
            //                 parentId: '0489dfca-5464-4bb1-85ef-05442b1bc629',
            //                 name: 'Place',
            //                 id: 'dd0eba36-9cf5-4161-89cb-233b429b3766',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8ac',
            //                 canon: 'Invention',
            //                 parentId: '0489dfca-5464-4bb1-85ef-05442b1bc629',
            //                 name: 'Policy',
            //                 id: '8850a3ba-940e-4581-932f-6f43707527fe',
            //             },
            //             ],
            //         },
            //         {
            //             _id: '5ad53bbdfbe7273c8c2ed0e0',
            //             canon: 'Invention',
            //             name: 'Topoi',
            //             id: '9dd3e433-2b2c-4c64-8b3f-206ccdc6055f',
            //             subcategories: [
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8ae',
            //                 canon: 'Invention',
            //                 parentId: '9dd3e433-2b2c-4c64-8b3f-206ccdc6055f',
            //                 name: 'Comparative',
            //                 id: 'db64971c-6d4e-4501-991e-b83ac0249ab6',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8b0',
            //                 canon: 'Invention',
            //                 parentId: '9dd3e433-2b2c-4c64-8b3f-206ccdc6055f',
            //                 name: 'Dimensional',
            //                 id: 'e0fe5d88-c3c5-4fbe-b5ff-bf96e224125b',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8af',
            //                 canon: 'Invention',
            //                 parentId: '9dd3e433-2b2c-4c64-8b3f-206ccdc6055f',
            //                 name: 'Causal',
            //                 id: '16f0b684-ff0c-4ea7-9dc4-5fc6d05ae5b8',
            //             },
            //             ],
            //         },
            //         {
            //             _id: '5ad53bbdfbe7273c8c2ed0e1',
            //             canon: 'Invention',
            //             name: 'Extrinsic proof',
            //             id: 'c4138d98-5580-4cc9-a4c2-5b7b03299ce2',
            //             subcategories: [
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8b1',
            //                 canon: 'Invention',
            //                 parentId: 'c4138d98-5580-4cc9-a4c2-5b7b03299ce2',
            //                 name: 'Testimony',
            //                 id: '84dc0662-69e8-4634-a425-b9f96363634b',
            //             },
            //             {
            //                 _id: '5ad53d1be1a09324acc3d8b2',
            //                 canon: 'Invention',
            //                 parentId: 'c4138d98-5580-4cc9-a4c2-5b7b03299ce2',
            //                 name: 'Data',
            //                 id: '5e3b0795-ad36-4ebf-a142-241c0a956372',
            //             },
            //             ],
            //         },
            //     ],
            // },
            // Visuals: {
            //     _id: '59a870870110587e400ff7c6',
            //     name: 'Visuals',
            //     categories: [
            //         {
            //             _id: '5ad5394e4da6db26cc8997da',
            //             name: 'Limited text',
            //             canon: 'Visuals',
            //             description: 'Uses primarily pictorial cues (limited text) ',
            //             id: 'b0ca80cb-1fab-4b64-a797-d3a79f36cae8',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997dc',
            //             name: 'Visual cues',
            //             canon: 'Visuals',
            //             description: 'Images and text highlight/focus audience on key points',
            //             id: 'f8f292d9-5e24-46f2-b62b-ac32587d8f88',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997db',
            //             name: 'Assertive slide titles',
            //             canon: 'Visuals',
            //             description: 'Uses assertion-based slide titles to convey key concepts (including title slide)',
            //             id: 'fbe18018-7474-4a93-b8a7-9a3172c03383',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997dd',
            //             name: 'Memorable images',
            //             canon: 'Visuals',
            //             description: 'Memorable images provide necessary context to support the oral discussion',
            //             id: 'f7ab11c9-2e33-4867-9567-9c5de1c26de4',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997de',
            //             name: 'Supportive graphics',
            //             canon: 'Visuals',
            //             description: 'Graphics show relevant data/concepts to support the claims',
            //             id: 'd1a8070c-47ef-425f-8282-52009c254d95',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997df',
            //             name: 'Effective graphs',
            //             canon: 'Visuals',
            //             description: 'Graphs are high resolution and legends/annotations are easily legible',
            //             id: '8abfcc66-f0ad-4b56-afa4-43dcdd3098dd',
            //             subcategories: [],
            //         },
            //     ],
            // },
            // Delivery: {
            //     _id: '59a870870110587e400ff7c7',
            //     name: 'Delivery',
            //     categories: [
            //         {
            //             _id: '5ad5394e4da6db26cc8997eb',
            //             name: 'Volume, rate and pitch',
            //             canon: 'Delivery',
            //             description: 'Volume, rate, and pitch are appropriate and modulated',
            //             id: '90443579-f986-4c6c-b5ad-87051f94754c',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e5',
            //             name: 'Metadiscourse',
            //             canon: 'Delivery',
            //             description: 'Metadiscourse orients listener and helps transition between sections',
            //             id: 'f30a75f8-213b-4353-ad93-c7ea23ea82a7',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e6',
            //             name: 'Posture and stance',
            //             canon: 'Delivery',
            //             description: 'Posture and stance project confidence, and allow speaker to interact with audience and screen',
            //             id: '663f68e0-989f-429a-8c46-2e5c95834b0d',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997e8',
            //             name: 'Language',
            //             canon: 'Delivery',
            //             description: 'Technical and informal language are both employed as appropriate',
            //             id: '6e275087-88a7-4fb2-b3fc-80daf27390ce',
            //             subcategories: [],
            //         },
            //         {
            //             _id: '5ad5394e4da6db26cc8997ec',
            //             name: 'Gestures, eye contact and body movement',
            //             canon: 'Delivery',
            //             description: 'Gestures, eye contact, and body movement used intentionally to engage audience',
            //             id: '6e67d011-d151-4562-9679-d3be0d363541',
            //             subcategories: [],
            //         },
            //     ],
            // },
        },
        categories: [],
        genres: [],
        departments: [],
        // The currently selected class 
        currentClass: { 
            name:'Home', 
            id: '',
            number: '',
            department: ''
        },
        currentVideoID: null,
        uploadingVideo: false,
        uploadUrl: '',
        assignments: [],
        collaborators: [],
        users: [],
        // ENROLLMENTS
        enrollments: [], // All enrollments
        // For administrator/professor
        classEnrolledStudents: [], // Current class enrolled students (both accepted/not accepted)
        classEnrollments: [],      // Current class enrollments (both accepted/not accepted)
        // For Student
        userEnrollments: [], // Current student's enrollments
        enrolledClasses: []  // Current student's classes (both accepted/not accepted)
    },

    actions: {
        /* VIDEOS  */
        getAllVideos: function ({ commit }) {
            secureHTTPService.get("video")
                .then(function (response)
                {
                    commit('GET_ALL_VIDEOS', response.data.data )
                })
                .catch(function (err) {
                    $('.home').html(errorHTML)
                })
        },
        getVideo: function ({ commit }, payload) {
            secureHTTPService.get("video/" + payload)
                .then(function (response)
                {
                    commit('GET_VIDEO', response.data.data)
                })
                .catch(function (err) {
                    $('.video').html(errorHTML)
                })
        },
        createVideo: function ({ commit, dispatch }, payload) {
            return secureHTTPService.post("video", payload)
                .then( response => {
                    // console.log('-----')
                    // console.log('POST video')
                    commit('CREATE_VIDEO', response.data.data)
                    dispatch( 'createCollaboration', { videoId: response.data.data.id, userId: authService.getAuthData().userId } )
                })
                .catch( response => {
                    console.log('createVideo action error.')
                    console.log('payload: ', payload)
                    console.log('error:', response.error)
                })
        },
        editVideo: function ({ commit }, payload) {
            secureHTTPService.put("video/" + payload.videoId, payload.videoBody)
                .then( response => {
                    console.log('PUT video')
                    commit('EDIT_VIDEO', payload.videoBody)
                })
                .catch( function(err) {
                    console.log(err)
                    console.log('videoBody: ', payload.videoBody)
                })
        },
        deleteVideo: function ({ commit }, payload) {
            secureHTTPService.delete("video/" + payload)
                .then( response => {
                    // console.log('-----')
                    // console.log('DELETE video')
                    // console.log(response)
                    // console.log(payload)
                    commit('DELETE_VIDEO', payload)
                })
                .then( response => {
                    // TODO delete annotations of video
                    // TODO delete collaborations of video
                    // TODO delete jwvideo
                })
                .catch(function (err) {
                    console.log('deleteVideo DELETE error: ', err)
                })
        },
        featureVideo: function ({ commit }, payload) {
            secureHTTPService.put("video/" + payload.id, payload)
                .then( response => {
                    // console.log("store.js: Video object that sent: ", payload)
                    // console.log(response)
                })
                .catch( response => console.log(response.error))
        },
        featureGlobal: function ({ commit }, payload) {
            secureHTTPService.put("video/" + payload.id, payload)
                .then( response => {
                    // console.log("store.js: Video object that sent: ", payload)
                    // console.log(response)
                })
                .catch( response => console.log(response.error))
        },
        unfeatureGlobal: function ({ commit }, payload) {
            secureHTTPService.put("video/" + payload.id, payload)
                .then( response => {
                    // console.log("store.js: Video object that sent: ", payload)
                    // console.log(response)
                })
                .catch( response => console.log(response.error))
        },
        unfeatureVideo: function ({ commit }, payload) {
            secureHTTPService.put("video/" + payload.id, payload)
            .then( response => {
                // console.log("store.js: Video object that sent: ", payload)
                // console.log(response)
            })
            .catch( response => console.log(response.error))
        },
        /* ANNOTATIONS */
        getVideoAnnotations: function ({ commit, state }, payload) {
            secureHTTPService.get("annotation/?videoId=" + payload)
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
            secureHTTPService.post("annotation/?videoId=" + payload.videoId, payload)
                .then(response => {
                    commit('ADD_ANNOTATION', response.data.data)
                })
                .catch(function (err) {
                    console.log('Error annotation add...', err)
                })
        },
        editAnnotation: function ({ commit }, payload) {            
            secureHTTPService.put("annotation/" + payload.annotationId, payload.body)
                .then(response => {
                    commit('EDIT_ANNOTATION', payload)
                })
                .catch(function (err) {
                    console.log('Error annotation edit...', err)
                })
        },
        deleteAnnotation: function ({ commit }, payload) {           
            secureHTTPService.delete("annotation/" + payload) // payload is the cardID
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
            return secureHTTPService.get("class/")
                .then(function (response)
                {
                    // console.log("getAllClasses action")
                    commit('GET_ALL_CLASSES', response.data.data)
                    commit('FILL_DEPARTMENTS')
                })
                .catch(function (err) {
                    $('.classes').html(errorHTML)
                })
        },
        // getClass: function ({ commit }, payload) {
        //     secureHTTPService.get("class/" + payload)
        //         .then(function (response)
        //         {
        //             commit('GET_CLASS', response.data.data )
        //         })
        //         .catch(function (err) {
        //             console.log(err)
        //         })
        // },
        createClass: function ({ commit }, payload) {
            return secureHTTPService.post("class/", payload.newClass)
            .then(response => {
                commit('CREATE_CLASS', response.data.data)
                return response
            })
            .catch(function (err) {
                console.log('createClass POST error: ', err)
            })
        },
        deleteClass: function ({ commit }, payload) {
            return secureHTTPService.delete("class/" + payload)
            .then(response => {
                commit('DELETE_CLASS', payload)
            })
            .catch(function (err) {
                console.log('deleteClass DELETE error: ', err)
            })
        },
        archiveClass: function ({ commit }, payload) {
            return secureHTTPService.put("class/" + payload.classId, payload.classObject)
            .then(response => {
                // pass through
            })
            .catch(function (err) {
                console.log('archiveClass PUT error: ', err)
            })
        },
        unArchiveClass: function ({ commit }, payload) {
            return secureHTTPService.put("class/" + payload.classId, payload.classObject)
            .then(response => {
                // pass through
            })
            .catch(function (err) {
                console.log('unarchiveClass PUT error: ', err)
            })
        },
        /* ENROLLMENTS */ 
        createEnrollment: function ({ commit }, payload) {
            return secureHTTPService.post("enrollment", payload)
            .then(function(response){
                // console.log("Create enrollment payload: ", payload)
                // console.log(response.data.data)
                commit('CREATE_ENROLLMENT', response.data.data)
            })
            .catch(function(err) {
                console.log("createEnrollment POST error: ", err)
            })
        },
        editEnrollment: function ({ commit }, payload) {
            return secureHTTPService.put("enrollment/" + payload.id, payload)
            .then(function(response){
                commit('EDIT_ENROLLMENT', response.data.data)
            })
            .catch(function(err) {
                console.log("editEnrollment PUT error: ", err)
            })
        },
        deleteEnrollment: function ({commit}, payload) {
            return secureHTTPService.delete("enrollment/" + payload)
            .then(function(response) {
                // console.log("Delete enrollment payload: ", payload)
                // console.log(response.data.data)
                commit('DELETE_ENROLLMENT', payload)
            })
            .catch(function(err) {
                console.log("deleteEnrollment DELETE error: ", err)
            })
        },
        getAllEnrollments: function ({ commit }, payload) {
            return secureHTTPService.get("enrollment")
            .then(function(response) {
                // console.log("getAllEnrollments action")
                commit('GET_ENROLLMENTS', response.data.data)
            })
            .catch(function (err) {
                
            })
        },
        getAllUserEnrollmentsByUserId: function ({ commit }, payload) {
            return secureHTTPService.get("enrollment?userId=" + payload)
            .then(function(response) {
                commit('GET_USER_ENROLLMENTS', response.data.data)
            })
            .catch(function (err) {
                console.log('getAllUserEnrollmentsByUserId GET error: ', err)
            })
        },
        getEnrolledClassesByUserId: function ({ commit }, payload) {
            return secureHTTPService.get("enrolledClass?userId=" + payload)
            .then(function(response) {
                // console.log("getEnrolledClassesByUserId action")
                commit('GET_ENROLLED_CLASSES', response.data.data)
            })
            .catch(function (err) {
                console.log('getEnrolledClassesByUserId GET error: ', err)
            })
        },
        getEnrolledUsersByClassId: function ({ commit }, payload) {
            return secureHTTPService.get("enrolledUser?classId=" + payload)
            .then(function(response) {
                commit('GET_ENROLLED_STUDENTS_BY_CLASSID', response.data.data)
            })
            .catch(function (err) {
                console.log('getEnrolledUsersByClassId GET error: ', err)
            })
        },
        getEnrollmentsByClassId: function ({ commit }, payload) {
            return secureHTTPService.get("enrollment?classId=" + payload)
            .then(function(response) {
                // console.log(response.data.data)
                commit('GET_ENROLLMENTS_BY_CLASS_ID', response.data.data)
            })
            .catch(function (err) {
                console.log('getEnrollmentsByClassId GET error: ', err)
            })
        },
        /* ASSIGNMENTS */ 
        getAssignments: function ({ commit }, payload) {
            return secureHTTPService.get("assignment?classId=" + payload)
            .then(function (response)
            {
                commit('GET_ASSIGNMENTS', response.data.data)
            })
            .catch(function (err) {
                console.log('getAssignments GET error: ', err)
            })
        },
        createAssignment: function ({ commit }, payload) {
            return secureHTTPService.post("assignment", payload)
            .then(function (response)
            {
                commit('CREATE_ASSIGNMENT', response.data.data)
            })
            .catch(function (err) {
                console.log('createAssignment POST error: ', err)
            })
        },
        editAssignment: function ({ commit }, payload) {
            console.log('editAssignment()')
            console.log(payload.assignment)
            secureHTTPService.put("assignment/" + payload.id, payload.assignment)
                .then(function (response)
                {
                    console.log(response)
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        deleteAssignment: function ({ commit }, payload) {
            secureHTTPService.delete("assignment/" + payload)
                .then(function (response)
                {
                    commit('DELETE_ASSIGNMENT', payload)
                })
                .catch(function (err) {
                    
                })
        },
        /* GENRES */ 
        getGenres: function ({ commit }) {
            secureHTTPService.get("genre")
                .then(function (response)
                {
                    commit('GET_GENRES', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
        /* CANONS */ 
        getCanons: function ({ commit }) {
            secureHTTPService.get("tree")
                .then(function (response)
                {
                    commit('GET_CANONS', response.data.data)
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        /* CATEGORIES */ 
        getCategories: function ({ commit }) {
            secureHTTPService.get("category")
                .then(function (response)
                {
                    commit('GET_CATEGORIES', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
        /* COLLABORATORS */ 
        getCollaborators: function ({ commit }, payload) {
            secureHTTPService.get("collaborator?videoId=" + payload)
                .then(function (response)
                {
                    commit('GET_COLLABORATORS', response.data.data)
                })
                .catch(function (err) {
                    
                })
        },
        createCollaboration: function ({ commit, dispatch }, payload) {
            secureHTTPService.post("collaboration", payload)
                .then(function (response)
                {
                    dispatch('getCollaborators', payload.videoId)
                })
                .catch(function (err) {
                    
                })
        },
        deleteCollaboration: function ({ commit, dispatch }, payload) {
            secureHTTPService.get("collaboration")
                .then(function (response)
                {
                    var collaborations = response.data.data

                    for (var i = 0, l = collaborations.length; i < l; i++) {
                        if (collaborations[i].videoId === payload.videoId && collaborations[i].userId === payload.userId) {
                            secureHTTPService.delete("collaboration/" + collaborations[i].id)
                                .then(function (response)
                                {
                                    console.log('deleted collaboration: ')
                                    dispatch('getCollaborators', payload.videoId)
                                })
                        }
                    } 
                    

                })
        },
        /* USERS */ 
        getUsers: function ({ commit }, payload) {
            secureHTTPService.get("user")
                .then(function (response)
                {
                    commit('GET_USERS', response.data.data)
                })
                .catch(function (err) {
                    
                })
        }
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
            state.videos.link = payload.link
            state.videos.duration = payload.duration
            state.videos.status = payload.status
        },
        DELETE_VIDEO: (state, videoId) => {
            for (var i=0, l = state.videos.length; i < l; i++) {
                if (state.videos[i].id === videoId)
                    try {
                        state.videos.splice(i, 1)            
                    }
                    catch(err) {
                        console.log(err)
                    }
            }
        },
        // Not used.
        // GET_CLASS_VIDEOS: (state, classTitle) => {
        //     for (var i=0, l = state.videos.length; i < l; i++) {
        //         if (state.videos[i].class !== classTitle) 
        //             state.videos.splice(i,1)
        //     }
        // },
        // Not used.
        // CREATE_UPLOAD_URL: (state, payload) => {      
        //     state.uploadUrl = payload.link.protocol + '://' + payload.link.address + payload.link.path + '?api_format=xml&key=' + payload.link.query.key + '&token=' + payload.link.query.token
        // },
        /* ANNOTATIONS */
        GET_VIDEO_ANNOTATIONS: (state, newAnnotations) => {
            state.videoAnnotations = newAnnotations
        },
        ADD_ANNOTATION: (state, payload) => {
            state.videoAnnotations.push(payload)
        },
        EDIT_ANNOTATION: (state, payload) => {
            for (var i=0, l = state.videoAnnotations.length; i < l; i++) {
                if (payload.annotationId === state.videoAnnotations[i].id) {
                    state.videoAnnotations[i].comment = payload.body.comment
                    state.videoAnnotations[i].from = payload.body.from
                    state.videoAnnotations[i].to = payload.body.to
                    state.videoAnnotations[i].rating = payload.body.rating
                }
            }
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
        },
        // Only for admin.
        DELETE_CLASS: (state, payload) => {
            for (var i = 0, l = state.classes.length; i < l; i++) {
                if (state.classes[i].id === payload) {
                    state.classes.splice(i, 1)              
                }
            }
        },
        // ADMIN
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
            state.currentClass.name = payload.name
            state.currentClass.id = payload.id
            state.currentClass.number = payload.number
            state.currentClass.department = payload.department
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
        /* CANONS */
        GET_CANONS: (state, canons) => {
            state.canons = canons
        },
        /* CATEGORIES */
        GET_CATEGORIES: (state, categories) => {
            state.categories = categories
        },
        /* COLLABORATORS */
        GET_COLLABORATORS: (state, collaborators) => {
            state.collaborators = collaborators
        },
        /* USERS */
        GET_USERS: (state, users) => {
            state.users = users
        },
        /* ENROLLMENTS */
        GET_ENROLLMENTS: (state, enrollments) => {
            state.enrollments = enrollments
        },
        GET_USER_ENROLLMENTS: (state, userEnrollments) => {
            state.userEnrollments = userEnrollments
        },
        /* ENROLLMENTS */
        GET_ENROLLED_STUDENTS_BY_CLASSID: (state, enrolledStudentsByClassId) => {
            // var enrolledUsersInThisClass = payload.data // All users that have enrolled, including the not yet accepted enrollments
            // var activeEnrolledUsers = [] // The users that have been accepted in this class
            // var inactiveEnrolledUsers = [] // The users that have requested enrollement but have not been accepted in this class
            // // console.log(enrolledUsersInThisClass)
            // for (var i = 0; i < enrolledUsersInThisClass.length; i++) {
            //     for(var j = 0; j < state.enrollments.length; j++){
            //         // UserId must be found in enrollments and the classId of that enrollment must be the current class
            //         if (state.enrollments[j].userId === enrolledUsersInThisClass[i].id && state.enrollments[j].classId === payload.classId){
            //             // The enrollment should be in accepted status or else the user is not considered "enrolled"/active
            //             if (state.enrollments[j].accepted){
            //                 activeEnrolledUsers.push(enrolledUsersInThisClass[i])
            //             }
            //             else {
            //                 inactiveEnrolledUsers.push(enrolledUsersInThisClass[i])
            //             }
            //         }
            //     }
            // }
            // console.log(activeEnrolledUsers)
            // console.log(enrolledUsersInThisClass)
            // state.enrolledUsersInThisClass = enrolledUsersInThisClass
            state.classEnrolledStudents = enrolledStudentsByClassId
        },
        GET_ENROLLMENTS_BY_CLASS_ID: (state, enrollmentsByClassId) => {
            state.classEnrollments = enrollmentsByClassId
        },
        GET_ENROLLED_CLASSES: (state, enrolledClasses) => {
            state.enrolledClasses = enrolledClasses
        },
        CREATE_ENROLLMENT: (state, newEnrollment) => {
            state.enrollments.push(newEnrollment)
        },
        EDIT_ENROLLMENT: (state, editedEnrollment) => {
            for (var e = 0; e < state.enrollments.length; e++) {
                if (state.enrollments[e].id === editedEnrollment.id)
                    state.enrollments[e] = editedEnrollment
                    break
            }
        },
        DELETE_ENROLLMENT: (state, deletedEnrollmentId) => {
            for (var i = 0, l = state.enrollments.length; i < l; i++) {
                if (state.enrollments[i].id === deletedEnrollmentId) 
                    state.enrollments.splice(i,1)
                    break
            }
        }
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
        users: state => {
            return state.users
        },
        // Enrollments
        enrollments: state => {
            return state.enrollments // All enrollments from enrollment resource
        },
        enrollmentsByClassId: state => {
            return state.enrollmentsByClassId // All enrollments of provided classId from enrollment resource
        },
        classEnrolledStudents: state => {
            return state.classEnrolledStudents // All students enrolled in provided classId from enrolledUser resource
        },
        classEnrollments: state => {
            return state.classEnrollments // All enrollments of provided classId from enrollment resource
        },
        userEnrollments: state => {
            return state.userEnrollments // All enrollments of provided userId from enrollment resource
        },
        enrolledClasses: state => {
            return state.enrolledClasses // All enrolled class of provided userId from enrolledClass resource
        },
        // End enrollments
        currentVideoID: state => {
            return state.currentVideoID
        },
        canons: state => {
            return state.canons
        },
        departments: state => {
            return state.departments
        },
        currentClass: state => {
            return state.currentClass
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