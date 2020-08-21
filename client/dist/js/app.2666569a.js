(function(e){function t(t){for(var r,i,c=t[0],s=t[1],l=t[2],u=0,d=[];u<c.length;u++)i=c[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);m&&m(t);while(d.length)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var s=n[c];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var m=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"10a3":function(e,t,n){"use strict";var r=n("bf04"),o=n.n(r);o.a},1527:function(e,t,n){"use strict";var r=n("46af"),o=n.n(r);o.a},1898:function(e,t,n){"use strict";var r=n("521e"),o=n.n(r);o.a},2:function(e,t){},3:function(e,t){},"46af":function(e,t,n){},"521e":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("4bea"),o=n.n(r),a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e.setup?e._e():n("Setup",{on:{complete:e.showPreview}}),e.setup?n("h1",[e._v("RoomId: "+e._s(e.roomId))]):e._e(),n("div",{staticClass:"main-preview"},[e.setup?n("Preview",{attrs:{stream:e.previewStream,name:e.name,controls:""}}):e._e()],1),n("Members",{on:{changePreview:e.changePreview}})],1)},c=[],s=(n("b0c0"),n("5530")),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ValidationObserver",{attrs:{slim:""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("button",{attrs:{type:"button"},on:{click:function(t){return e.setMode("create")}}},[e._v("Create")]),n("button",{attrs:{type:"button"},on:{click:function(t){return e.setMode("join")}}},[e._v("Join")]),e.mode?n("form",{on:{submit:function(n){return n.preventDefault(),t.handleSubmit(e.handleForm)}}},[n("Input",{attrs:{placeholder:"Enter RoomID",name:"room ID",rules:"required|min:6",id:"roomId"},model:{value:e.roomId,callback:function(t){e.roomId=t},expression:"roomId"}}),n("Input",{attrs:{placeholder:"Enter Name",name:"name",rules:"required|min:3",id:"name"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),n("button",{attrs:{type:"submit",disabled:t.invalid}},[e._v("Enter")])],1):e._e()]}}])})],1)},m=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form-input"},[n("ValidationProvider",{attrs:{name:e.name,vid:e.id,rules:e.rules},scopedSlots:e._u([{key:"default",fn:function(t){return[n("input",{attrs:{type:e.type,placeholder:e.placeholder},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){return e.$emit("change",t)}}}),n("span",[e._v(e._s(t.errors[0]))])]}}])})],1)},d=[],f={name:"Input",props:{type:{type:String,default:"text"},value:String,placeholder:String,name:{type:String,required:!0},id:{type:String,required:!0},rules:String}},p=f,v=n("2877"),h=Object(v["a"])(p,u,d,!1,null,null,null),b=h.exports,g=n("94ea"),w={name:"Setup",components:{Input:b},data:function(){return{roomId:null,name:null}},computed:Object(s["a"])({},Object(g["d"])({mode:"mode"})),methods:Object(s["a"])(Object(s["a"])({},Object(g["b"])({saveStream:"saveLocalStream",setMode:"setMode"})),{},{handleForm:function(){var e=this;console.log(this.name,this.roomId),window.navigator.mediaDevices.getUserMedia({audio:!0,video:{facingMode:"environment"}}).then((function(t){console.log("got stream",t),e.saveStream(t),e.$emit("complete",{name:e.name,roomId:e.roomId})})).catch((function(t){console.log("camera access failed"),console.log(t),e.$emit("complete",{name:e.name,roomId:e.roomId})})),this.$socket.client.emit("REGISTER",{name:this.name,roomId:this.roomId})}})},S=w,_=Object(v["a"])(S,l,m,!1,null,null,null),y=_.exports,O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("p",[e._v(e._s(e.name))]),n("video",{ref:"video",attrs:{controls:e.controls,muted:""},domProps:{muted:!0}})])},j=[],k=(n("99af"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),{name:"Preview",props:{stream:{required:!0},name:{type:String,required:!0},controls:{type:Boolean,default:!1}},data:function(){return{recordedChunks:[],recorder:null,seq:0,timer:null}},computed:Object(s["a"])({},Object(g["d"])({mode:"mode"})),watch:{stream:function(e){console.log("new stream",e),this.$refs.video.srcObject=e,this.$refs.video.play(),this.recorder&&"recording"==this.recorder.state||this.startRecording()}},mounted:function(){this.$refs.video.srcObject=this.stream,this.$refs.video.play(),!this.controls&&this.stream&&this.startRecording()},beforeDestroy:function(){this.stopRecording(!0),clearTimeout(this.timer)},methods:{startRecording:function(){var e=this;"create"==this.mode&&(this.recordedChunks=[],this.seq+=1,this.recorder||(this.recorder=new MediaRecorder(this.stream,{mimeType:"video/webm;codecs=vp9"}),this.recorder.ondataavailable=this.handleDataAvailable),this.recorder.start(3e3),this.timer=setTimeout((function(){e.stopRecording()}),3e4))},stopRecording:function(e){var t=this;this.recorder.stop(),console.log("stopped recording"),setTimeout((function(){t.saveRecording(),e||t.startRecording()}),1e3)},saveRecording:function(){var e=new Blob(this.recordedChunks,{type:"video/webm"});console.log("blob created from chunks");var t=URL.createObjectURL(e),n=document.createElement("a");document.body.appendChild(n),n.style="display: none",n.href=t;var r=new Date;n.download="".concat(this.name,"_").concat(this.seq,"_").concat(r.getDate(),"-").concat(r.getMonth()+1,"-").concat(r.getFullYear(),".webm"),n.click(),window.URL.revokeObjectURL(t),console.log("downloading")},handleDataAvailable:function(e){console.log(this.name,this.recorder.state,e.data.size),e.data.size>1&&this.recordedChunks.push(e.data)}}}),P=k,I=(n("1898"),Object(v["a"])(P,O,j,!1,null,"5e62201e",null)),M=I.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"members"},e._l(e.members,(function(t){return n("div",{key:t.id,staticClass:"member",on:{click:function(n){return e.$emit("changePreview",t)}}},[e._v(" "+e._s(t.id)+" "),e.$socket.client.id==t.id?n("Preview",{attrs:{stream:e.localStream,name:t.name}}):n("Preview",{attrs:{stream:t.stream,name:t.name}})],1)})),0)},$=[],x={name:"Members",components:{Preview:M},computed:Object(s["a"])({},Object(g["c"])({members:"allMembers",localStream:"getLocalStream"}))},E=x,q=(n("1527"),Object(v["a"])(E,R,$,!1,null,"4534f4c6",null)),C=q.exports,L={name:"App",components:{Setup:y,Preview:M,Members:C},data:function(){return{setup:!1,name:null,roomId:null,previewStream:null}},watch:{localStream:function(e){this.previewStream=e}},computed:Object(s["a"])({},Object(g["d"])(["localStream"])),methods:{showPreview:function(e){var t=e.name,n=e.roomId;this.setup=!0,this.name=t,this.roomId=n},changePreview:function(e){e.stream?this.previewStream=e.stream:this.previewStream=this.localStream}}},D=L,T=(n("10a3"),Object(v["a"])(D,i,c,!1,null,"3737c59b",null)),U=T.exports,B=n("9ac9"),V=n("fb74"),A=n("79dc");Object(V["c"])("required",Object(s["a"])(Object(s["a"])({},A["b"]),{},{message:"{_field_} is required"})),Object(V["c"])("min",Object(s["a"])(Object(s["a"])({},A["a"]),{},{params:["length"],message:"{_field_} must be {length} characters"})),a["a"].component("ValidationProvider",V["b"]),a["a"].component("ValidationObserver",V["a"]);n("4de4"),n("4160"),n("07ac"),n("159b");var F=n("6e32"),J=n.n(F);a["a"].use(g["a"]);var N=new g["a"].Store({state:{localStream:null,members:{},mode:null},getters:{allMembers:function(e){return Object.values(e.members)},getPeerById:function(e){return function(t){return e.members[t].peer}},getLocalStream:function(e){return e.localStream}},mutations:{setLocalStream:function(e,t){e.localStream=t},setRemoteStream:function(e,t){var n=t.id,r=t.stream;a["a"].set(e.members[n],"stream",r)},saveMembers:function(e,t){t.forEach((function(t){e.members[t.id]||a["a"].set(e.members,t.id,t)}))},addNewPeer:function(e,t){var n=t.id,r=t.peer;a["a"].set(e.members[n],"peer",r)},setMode:function(e,t){e.mode=t},removeMember:function(e,t){a["a"].delete(e.members,t)}},actions:{saveLocalStream:function(e,t){e.commit("setLocalStream",t)},socket_register:function(e,t){var n=this,r=t.id,o=t.members;console.log("register",o),e.commit("saveMembers",o);var a=e.getters.allMembers.filter((function(e){return e.id!=n._vm.$socket.client.id}));console.log("others",a),a.forEach((function(t){if(!t.peer){var o=new J.a({initiator:r==n._vm.$socket.client.id});o.on("signal",(function(e){console.log("peer signal ===>  ".concat(e.type," for ").concat(t.id)),n._vm.$socket.client.emit("signal",{id:t.id,signal:e})})),o.on("connect",(function(){console.log("peer connected"),e.state.localStream&&o.addStream(e.state.localStream)})),o.on("close",(function(){console.log("peer closed")})),o.on("error",(function(e){console.log("peer error",e)})),o.on("stream",(function(n){console.log("stream received",n),e.commit("setRemoteStream",{id:t.id,stream:n}),e.state.localStream&&o.addStream(e.state.localStream)})),e.commit("addNewPeer",{id:t.id,peer:o})}}))},socket_leave:function(e,t){var n=t.id;console.log("".concat(n," left room")),e.commit("removeMember",n)},socket_signal:function(e,t){var n=t.id,r=t.signal;console.log("socket signal <=== from ".concat(n," of type ").concat(r.type)),e.getters.getPeerById(n).signal(r)},setMode:function(e,t){e.commit("setMode",t)}}}),z=N;a["a"].use(B["a"],o()("http://http://52.25.161.204:3000/"),{store:z,actionPrefix:"socket_",mutationPrefix:"socket_"}),new a["a"]({store:z,render:function(e){return e(U)}}).$mount("#app")},bf04:function(e,t,n){}});
//# sourceMappingURL=app.2666569a.js.map