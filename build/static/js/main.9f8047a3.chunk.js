(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,n,t){e.exports=t(19)},16:function(e,n,t){},17:function(e,n,t){},19:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o),a=t(3),c=t.n(a),i=(t(16),t(4)),s=t(5),u=t(8),l=t(6),p=t(9),d=(t(17),t(1)),h=t.n(d),m=t(7),f={development:{root:"http://localhost:3000",backenUrl:"http://localhost:5000/my-firebase-project-8d074/us-central1/getVideoLinks"}},v=function(){var e=Object(m.a)(h.a.mark(function e(){var n,t;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(f.development.backenUrl,"/getVideoLinks"),{method:"get",mode:"cors"});case 2:return n=e.sent,e.next=5,n.json();case 5:return t=e.sent,console.log("get video",t),e.abrupt("return",t);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),w=function(e){function n(){return Object(i.a)(this,n),Object(u.a)(this,Object(l.a)(n).apply(this,arguments))}return Object(p.a)(n,e),Object(s.a)(n,[{key:"componentDidMount",value:function(){v()}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("p",null,"hello"))}}]),n}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.9f8047a3.chunk.js.map