webpackJsonp([0],[,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),s.d(e,"eventBus",function(){return _});var i=s(14),a=s(12),n=s.n(a),o=s(13),r=s(10),l=s(9),c=s.n(l),v=s(11),d=s.n(v);i.a.use(o.a),i.a.use(d.a,c.a);var u=new o.a({routes:r.a,mode:"history"}),_=new i.a({data:{feeds:["ccPaHVIt","O2LEnFP4"],playlistNames:[],namesAndFeeds:[],videos:[]},methods:{navigateBack:function(t){t.$router.go(-1)}}});new i.a({el:"#app",router:u,render:function(t){return t(n.a)}}),i.a.config.productionTip=!1},,,,,,,,function(t,e,s){"use strict";s.d(e,"a",function(){return m});var i=s(55),a=s.n(i),n=s(56),o=s.n(n),r=s(59),l=s.n(r),c=s(54),v=s.n(c),d=s(53),u=s.n(d),_=s(57),f=s.n(_),p=s(58),h=s.n(p),m=[{path:"/",component:a.a},{path:"/library",component:o.a},{path:"/wiki",component:l.a},{path:"/classes",component:v.a},{path:"/classes/:id",component:u.a},{path:"/video/:id",component:f.a,children:[{path:"edit",component:h.a}]}]},,function(t,e,s){function i(t){s(49)}var a=s(1)(s(32),s(68),i,null,null);t.exports=a.exports},,,,,,,,,,,,,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2),a=s(52),n=s.n(a);e.default={mounted:function(){for(var t=0;t<i.eventBus.feeds.length;++t){var e="https://cdn.jwplayer.com/v2/playlists/"+i.eventBus.feeds[t];this.axios.get(e).then(function(t){var e=t.data.title;i.eventBus.playlistNames.push(e);for(var s=t.data.playlist,a=0;a<s.length;++a){var n={vidTitle:s[a].title,vidLink:s[a].link,vidThumb:s[a].image,vidDuration:s[a].duration,vidDesc:s[a].description,vidStudent:s[a].student,playlistID:s[a].feedid,videoID:s[a].mediaid,vidSources:s[a].sources,vidPlaylistName:e};i.eventBus.videos.push(n)}}).catch(function(t){console.log(t)})}},components:{"my-header":n.a}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2);e.default={data:function(){return{videos:i.eventBus.videos}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2);e.default={data:function(){return{feeds:i.eventBus.feeds,playlistNames:i.eventBus.playlistNames,videos:i.eventBus.videos,id:this.$route.params.id}},mounted:function(){},methods:{replaceUnderscores:function(t){return t.replace(/\-/g," ")}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2);e.default={data:function(){return{feeds:i.eventBus.feeds,playlistNames:i.eventBus.playlistNames,playlistNamesURI:[],videos:i.eventBus.videos}},mounted:function(){for(var t=0;t<this.playlistNames.length;++t)this.playlistNamesURI[t]=this.playlistNames[t];for(var t=0;t<this.playlistNamesURI.length;++t)this.playlistNamesURI[t]=this.playlistNamesURI[t].replace(/ /g,"-");console.log(this.playlistNames),console.log("URI"),console.log(this.playlistNamesURI)}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2);e.default={data:function(){return{videos:i.eventBus.videos}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(2);e.default={data:function(){return{videos:i.eventBus.videos,currVideoID:0,id:this.$route.params.id,player:null,goto1:5,goto2:10,goto3:13}},mounted:function(){for(var t=0;t<this.videos.length;++t)this.videos[t].videoID===this.id&&(this.currVideoID=t);var e=this.videos[this.currVideoID].vidSources.length,s=e-2;this.player=jwplayer("player"),this.player.setup({file:this.videos[this.currVideoID].vidSources[s].file,image:this.videos[this.currVideoID].vidThumb})},methods:{goBack:function(){i.eventBus.navigateBack(this)},gotoCard1:function(){this.player.seek(this.goto1)},gotoCard2:function(){this.player.seek(this.goto2)},gotoCard3:function(){this.player.seek(this.goto3)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,s){function i(t){s(46)}var a=s(1)(s(33),s(65),i,null,null);t.exports=a.exports},function(t,e,s){function i(t){s(41)}var a=s(1)(s(34),s(60),i,null,null);t.exports=a.exports},function(t,e,s){function i(t){s(42)}var a=s(1)(s(35),s(61),i,null,null);t.exports=a.exports},function(t,e,s){function i(t){s(48)}var a=s(1)(s(36),s(67),i,null,null);t.exports=a.exports},function(t,e,s){function i(t){s(43)}var a=s(1)(s(37),s(62),i,null,null);t.exports=a.exports},function(t,e,s){function i(t){s(47)}var a=s(1)(s(38),s(66),i,null,null);t.exports=a.exports},function(t,e,s){function i(t){s(44)}var a=s(1)(s(39),s(63),i,null,null);t.exports=a.exports},function(t,e,s){function i(t){s(45)}var a=s(1)(s(40),s(64),i,null,null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"class container"},[s("router-link",{attrs:{to:{path:"/classes"}}},[s("button",{staticClass:"button is-warning"},[t._v(" <- Go back")])]),t._v(" "),s("h3",[t._v(t._s(t.replaceUnderscores(t.id)))]),t._v(" "),s("div",{staticClass:"v-videos fx-dir-col"},t._l(t.videos,function(e){return e.vidPlaylistName===t.replaceUnderscores(t.id)?s("div",{staticClass:"v-video fx-dir-row"},[s("router-link",{attrs:{to:"/video/"+e.videoID,tag:"a"}},[s("img",{staticClass:"video-thumb",attrs:{src:e.vidThumb}})]),t._v(" "),s("div",{staticClass:"video-meta"},[s("span",{staticClass:"video-title"},[t._v("Title: "+t._s(e.vidTitle))]),t._v(" "),s("span",{staticClass:"video-duration"},[t._v("Duration: "+t._s(e.vidDuration))]),t._v(" "),s("span",{staticClass:"video-desc"},[t._v("Description: "+t._s(e.vidDesc))]),t._v(" "),s("span",{staticClass:"video-student"},[t._v("Student: "+t._s(e.vidStudent))]),t._v(" "),s("p",[t._v("----------------------------")]),t._v(" "),s("span",{staticClass:"video-playlist"},[t._v("Playlist id: "),s("strong",[t._v(t._s(e.playlistID))])]),t._v(" "),s("span",{staticClass:"video-id"},[t._v("Video id: "+t._s(e.videoID))])])],1):t._e()})),t._v(" "),s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"classes container"},[s("h3",[t._v("Classes")]),t._v(" "),s("div",{staticClass:"row"},t._l(t.playlistNames,function(e){return s("div",{staticClass:"col-xs-6 col-md-3 thumbnail"},[s("router-link",{attrs:{to:"classes/"+e.replace(/ /g,"-"),tag:"a"}},[t._v(t._s(e))])],1)})),t._v(" "),s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"about container"},[s("h3",[t._v("Library")]),t._v(" "),s("p",[t._v("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lcvj;alejfl;jsd")]),t._v(" "),s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"videos"},[s("h1",[t._v("Editing video "+t._s(this.$route.params.id)+" ...")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wiki container"},[s("h3",[t._v("Wiki")]),t._v("\n    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, hic?\n    "),s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"head"},[s("router-link",{staticClass:"head__logo title",attrs:{to:"/",tag:"h1"}},[s("i",{staticClass:"fa fa-circle-o fa-white",attrs:{"aria-hidden":"true"}}),s("a",[t._v("Metalogon")])]),t._v(" "),s("ul",{staticClass:"head__nav"},[s("router-link",{staticClass:"head__nav-item",attrs:{to:"/",tag:"li","active-class":"head__nav-item-active",exact:""}},[s("a",{staticClass:"head__nav-item-link"},[t._v("Home")])]),t._v(" "),s("router-link",{staticClass:"head__nav-item",attrs:{to:"/library",tag:"li","active-class":"head__nav-item-active"}},[s("a",[t._v("Library")])]),t._v(" "),s("router-link",{staticClass:"head__nav-item",attrs:{to:"/wiki",tag:"li","active-class":"head__nav-item-active"}},[s("a",[t._v("Wiki")])]),t._v(" "),s("router-link",{staticClass:"head__nav-item",attrs:{to:"/classes",tag:"li","active-class":"head__nav-item-active"}},[s("a",[t._v("Classes")])])],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"video container"},[s("div",{staticClass:"player"},[s("button",{staticClass:"button is-white",on:{click:function(e){t.goBack()}}},[s("i",{staticClass:"fa fa-chevron-left",attrs:{"aria-hidden":"true"}}),t._v(t._s(t.videos[t.currVideoID].vidTitle))]),t._v(" "),s("div",{attrs:{id:"player"}},[t._v("Loading the player...")])]),t._v(" "),s("div",{staticClass:"cards"},[s("div",{staticClass:"card",on:{click:function(e){t.gotoCard1()}}},[t._v("0:"+t._s(t.goto1))]),t._v(" "),s("div",{staticClass:"card",on:{click:function(e){t.gotoCard2()}}},[t._v("0:"+t._s(t.goto2))]),t._v(" "),s("div",{staticClass:"card",on:{click:function(e){t.gotoCard3()}}},[t._v("0:"+t._s(t.goto3))])]),t._v(" "),s("router-link",{attrs:{to:"/video/"+t.id+"/edit"}},[s("button",{staticClass:"button is-warning"},[t._v("Edit")])]),t._v(" "),s("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content home container"},[t._m(0),t._v(" "),s("div",{staticClass:"v-videos"},t._l(t.videos,function(e){return"Ben Domino"===e.vidStudent?s("div",{staticClass:"v-video"},[s("router-link",{attrs:{to:"/video/"+e.videoID,tag:"a"}},[s("img",{staticClass:"video-thumb",attrs:{src:e.vidThumb}})]),t._v(" "),s("span",{staticClass:"video-title"},[t._v("Title: "+t._s(e.vidTitle))]),t._v(" "),s("span",{staticClass:"video-duration"},[t._v("Duration: "+t._s(e.vidDuration))]),t._v(" "),s("span",{staticClass:"video-desc"},[t._v("Description: "+t._s(e.vidDesc))]),t._v(" "),s("span",{staticClass:"video-student"},[t._v("Student: "+t._s(e.vidStudent))]),t._v(" "),s("p",[t._v("----------------------------")]),t._v(" "),s("span",{staticClass:"video-playlist"},[t._v("Playlist id: "),s("strong",[t._v(t._s(e.playlistID))])]),t._v(" "),s("span",{staticClass:"video-id"},[t._v("Video id: "+t._s(e.videoID))])],1):t._e()}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"tabs"},[s("ul",[s("li",{staticClass:"is-active"},[s("a",[t._v("All videos")])]),t._v(" "),s("li",[s("a",[t._v("Spring '17")])]),t._v(" "),s("li",[s("a",[t._v("Winter '16")])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app"},[s("my-header"),t._v(" "),s("router-view")],1)},staticRenderFns:[]}}],[2]);
//# sourceMappingURL=app.05cb79beed20d2b1327c.js.map