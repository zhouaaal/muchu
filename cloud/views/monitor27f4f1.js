define("appmsg/emotion/caret.js",[],function(e,t){
"use strict";
var t={};
return t.get=function(e){
var t=0;
if(document.selection){
e.focus();
var a=document.selection.createRange();
a.moveStart("character",-e.value.length),t=Sel.text.length;
}else(e.selectionStart||"0"==e.selectionStart)&&(t=e.selectionStart);
return t;
},t.set=function(e,t){
if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){
var a=e.createTextRange();
a.collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select();
}
},t;
});define("appmsg/emotion/map.js",[],function(){
"use strict";
return["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰","凋谢","示爱","爱心","心碎","蛋糕","闪电","炸弹","刀","足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强","弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你","NO","OK","爱情","飞吻","跳跳","发抖","怄火","转圈","磕头","回头","跳绳","挥手","激动","街舞","献吻","左太极","右太极"];
});define("appmsg/emotion/textarea.js",["appmsg/emotion/map.js","appmsg/emotion/dom.js","appmsg/emotion/caret.js","biz_common/dom/class.js"],function(e,n){
"use strict";
function t(){
var e="translate3d(0, 0, 0)";
l.css({
webkitTransform:e,
transform:e
});
}
function a(){
var e=8;
l.on("keydown",function(n){
n.keyCode===e&&s(!0)&&n.preventDefault();
});
}
function s(e){
function n(){
var e=a-1;
0>e&&(e=0);
var n=s.slice(0,e),o=s.slice(a),i=+new Date;
t.value=n+o,p.set(t,e),r(+new Date-i);
}
var t=l.el[0],a=p.get(t),s=t.value,i=4,c=a-i;
0>c&&(c=0,i=a-c);
var m=s.slice(c,a),v=m.match(/\/([\u4e00-\u9fa5\w]+)$/g);
if(v){
var d=v[0],g=i-d.length,b=d.replace("/","");
if(o(b)){
var j=m.replace(d,""),_=s.slice(0,c)+j+s.slice(a),w=+new Date;
t.value=_,p.set(t,c+g),r(+new Date-w);
}else{
if(e)return!1;
n();
}
}else{
if(e)return!1;
n();
}
return e?(t.focus(),f.later(function(){
t.focus();
})):(t.blur(),f.later(function(){
t.blur();
})),u(t.value),!0;
}
function o(e){
for(var n=0,t=m.length;t>n;n++)if(m[n]==e)return!0;
return!1;
}
function i(e){
var n=l.el[0],t=p.get(n),a=n.value,a=a.slice(0,t)+"/"+e+a.slice(t);
n.value=a,p.set(n,t+e.length+1),n.blur(),f.later(function(){
n.blur();
}),u(a);
}
function r(){}
function u(e){
var n=c.el[0];
e.length<1?v.addClass(n,"btn_disabled"):v.removeClass(n,"btn_disabled");
}
var l,c,n={},m=e("appmsg/emotion/map.js"),f=e("appmsg/emotion/dom.js"),p=e("appmsg/emotion/caret.js"),v=e("biz_common/dom/class.js");
return n.init=function(){
l=f("#js_cmt_input"),c=f("#js_cmt_submit"),t(),a();
},n.inputEmotion=function(e,n){
-1===e?s(n):i(m[e-1]);
},n;
});define("appmsg/emotion/nav.js",["appmsg/emotion/common.js","appmsg/emotion/dom.js"],function(n,o){
"use strict";
var t=n("appmsg/emotion/common.js"),a=n("appmsg/emotion/dom.js"),m=a.each,o={};
return o.activeNav=function(n){
t.currentPage=n;
var o=t.navs;
m(o,function(t,a){
a===n?o[a].attr("class","emotion_nav current"):o[a].attr("class","emotion_nav");
});
},o;
});define("appmsg/emotion/common.js",[],function(){
"use strict";
return{
EMOTIONS_COUNT:105,
EMOTION_LI_SIZE:36,
EMOTION_SIZE:24
};
});define("appmsg/emotion/slide.js",["appmsg/emotion/common.js","appmsg/emotion/dom.js","appmsg/emotion/nav.js"],function(t,n){
"use strict";
function o(){
var t,n,o;
u.on("touchstart",function(n){
n.preventDefault(),n.stopPropagation(),l||(t=n.touches[0].clientX,c.isMoved=!1,o=+new Date);
}),u.on("touchmove",function(o){
o.preventDefault(),o.stopPropagation(),l||(n=o.touches[0].clientX,g=n-t,a(),Math.abs(g)>6&&(c.isMoved=!0));
}),u.on("touchend",function(){
l||s();
});
}
function a(){
var t=c.WIDTH,n=-d*t+g,o=t/4;
n>o?n=o:p-o>n&&(n=p-o);
var a="translate3d("+n+"px, 0, 0)";
u.css({
webkitTransform:a,
transform:a
});
}
function s(){
var t=c.WIDTH,n=55,o=parseInt(g/t),a=g%t;
d-=o,Math.abs(a)>n&&(d-=Math.abs(a)/a*1),d>c.pageCount-1?d=c.pageCount-1:0>d&&(d=0),
g=0,e(d);
}
function e(t){
l=!0,f=-t*c.WIDTH,i(),a(),setTimeout(function(){
l=!1,r();
},h),v.activeNav(t);
}
function i(){
var t="all 0.3s ease";
u.css({
transition:t,
webkitTransition:t
});
}
function r(){
var t=u.el[0].style;
t.transition="",t.webkitTransition="";
}
var p,c=t("appmsg/emotion/common.js"),m=t("appmsg/emotion/dom.js"),n={},u=m("#js_slide_wrapper"),f=0,v=t("appmsg/emotion/nav.js"),l=!1,d=0,g=0;
n.init=function(){
p=-c.wrapperWidth+c.WIDTH,o();
var t="translate3d(0, 0, 0)";
u.css({
webkitTransform:t,
transform:t
});
};
var h=300;
return n;
});define("pages/report.js",["biz_wap/utils/ajax.js","pages/version4video.js"],function(e){
"use strict";
function i(e){
var i=["/mp/pagereport?type=","undefined"==typeof e.type?1:e.type,"&comment_id=",e.comment_id,"&voiceid=",e.voiceid,"&action=",e.action,"&__biz=",top.window.biz||"","&mid=",top.window.mid||"","&idx=",top.window.idx||"","&uin=",top.window.uin||"","&key=",top.window.key||"","&pass_ticket=",top.window.pass_ticket||"","&t=",Math.random(),"#wechat_redirect"].join(""),t=new Image;
t.src=i;
}
function t(e){
l({
type:"POST",
url:"/mp/videoreport?#wechat_redirect",
timeout:2e4,
async:!1,
data:e.data
});
}
function o(e){
var i=e.data;
i.musicid=i.musicid.join(";"),i.hasended=i.hasended.join(";"),i.commentid=i.commentid.join(";"),
i.mtitle=i.mtitle.join(";#"),i.detail_click=i.detail_click.join(";"),i.duration=i.duration.join(";"),
i.errorcode=i.errorcode.join(";"),i.play_duration=i.play_duration.join(";"),l({
type:"POST",
url:"/mp/musicreport?#wechat_redirect",
timeout:2e4,
async:!1,
data:i
});
}
function n(e){
document.domain="qq.com";
var i=encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),t=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",a(),"&val=","undefined"!=typeof e.val?e.val:"","&val1=","undefined"!=typeof e.val1?e.val1:"","&vurl=",encodeURIComponent(e.vurl),"&t=",Math.random(),"&url=",i].join(""),o=new Image;
o.src=t.substr(0,1024);
}
function d(e){
if(3==e.step||6==e.step||1999==e.step){
document.domain="qq.com";
var i=encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g,"$1").replace(/&$/,"")),t=["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=",e.step,"&vid=","undefined"!=typeof e.vid?e.vid:"","&platform=",a(),"&loadwait=","undefined"!=typeof e.loadwait?e.loadwait:"","&val=","undefined"!=typeof e.val?e.val:"","&t=",Math.random(),"&url=",i].join(""),o=new Image;
o.src=t.substr(0,1024);
}
}
function a(){
return s.ipad?60101:s.is_android_phone?60301:s.iphone?60401:s.is_android_tablet?60501:"";
}
function r(){
return s.ipad?"v4010":s.is_android_phone&&_.isUseProxy()?"v5060":s.is_android_phone?"v5010":s.iphone&&_.isUseProxy()?"v3060":s.iphone?"v3010":s.is_android_tablet?"v6010":"";
}
function p(e){
var i={
mid:window.mid||"",
__biz:window.biz||"",
idx:window.idx||"",
musicid:[],
hasended:[],
commentid:[],
scene_type:e.type||0,
mtitle:[],
detail_click:[],
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
duration:[],
play_duration:[],
errorcode:[]
};
return i;
}
function c(){
var e={
videoerror:0,
like_kv_vid:"",
like_click_vid:"",
like_kv_alginfo:"",
like_click_alginfo:"",
tad:"",
page:0,
like_click_type:0,
iplat:2,
ptype:1,
rtype:"",
getvinfo_ret:-1,
getvinfo_time:0,
v_err_code:0,
loadwait:0,
hasended:0,
last_ms:0,
duration_ms:0,
app_btn_kv:0,
app_btn_click:0,
app_btn_type:0,
mid:"",
__biz:"",
idx:"",
detail_click:0,
vtitle:"",
vid:"",
commentid:"",
scene_type:"",
replay:0,
full_screen:0,
quick_play:0,
ad_play_time:-1,
video_play_time:-1,
click_play_button:0,
traceid:"",
webviewid:"",
orderid:0
};
return e;
}
var l=e("biz_wap/utils/ajax.js"),_=e("pages/version4video.js"),s=_.device;
return{
report:i,
videoreport:t,
getPlatformType:a,
getsdtfrom:r,
getinfoReport:n,
qqvideo_common_report:d,
musicreport:o,
getMusicReportData:p,
getVideoReportData:c
};
});define("pages/music_player.js",["biz_wap/jsapi/core.js","pages/version4video.js"],function(t){
"use strict";
function i(t){
this._o={
src:"",
mid:"",
songId:"",
autoPlay:!1,
duration:0,
debug:!1,
needVioceMutex:!0,
appPlay:!0,
title:"",
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){}
},this._extend(t),this._status=-1,this._g={},0!==p.surportType&&(this._setSrc(),
this._o.needVioceMutex&&p.mutexPlayers.push(this),this._o.autoPlay&&this.play());
}
function o(t){
a.invoke("musicPlay",{
app_id:"a",
title:"微信公众平台",
singer:"微信公众平台",
epname:"微信公众平台",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:p.ev,
lowbandUrl:p.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(i){
"function"==typeof t&&t(i);
});
}
function e(t){
for(var i=0,o=p.mutexPlayers.length;o>i;i++){
var e=p.mutexPlayers[i];
e&&"function"==typeof e._onPause&&e!=t&&(e._h5Audio&&"function"==typeof e._h5Audio.pause?e._h5Audio.pause():1==e.getSurportType()&&e._pauseJsapiPlay(!1));
}
}
function n(){
return p.surportType;
}
function s(t){
return new i(t);
}
function u(){
p.surportType>0&&p.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
var a=t("biz_wap/jsapi/core.js"),r=t("pages/version4video.js"),p={
hasCheckJsapi:!1,
ev:window._empty_v,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
surportType:"addEventListener"in window?2:0,
qqMusiceSongId:"http://thirdparty.gtimg.com/#songId#.m4a?fromtag=38&songid=#songId#",
qqMusiceMid:"http://thirdparty.gtimg.com/C100#mid#.m4a?fromtag=38&songid=#songId#",
mutexPlayers:[]
};
return u(),i.prototype._createAutoAndPlay=function(){
if(this._h5Audio=document.createElement("audio"),this._H5bindEvent(),this._h5Audio.setAttribute("style","height:0;width:0;display:none"),
this._h5Audio.setAttribute("autoplay",""),this._status=0,p.isAndroidLow)this._h5Audio.src=this._o.src,
document.body.appendChild(this._h5Audio),this._h5Audio.load();else{
document.body.appendChild(this._h5Audio);
var t=this;
setTimeout(function(){
t._h5Audio.src=t._o.src,t._h5Audio.play();
},0);
}
this._surportType=2;
},i.prototype._destoryH5Audio=function(){
this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),document.body.removeChild(this._h5Audio),
this._h5Audio=null,this._status=-1,this._surportType=0);
},i.prototype._createApp=function(t){
this._h5Audio&&this._destoryH5Audio();
var i=this,o=this._o;
a.invoke("musicPlay",{
app_id:"a",
title:o.title,
singer:o.singer,
epname:o.epname,
coverImgUrl:o.coverImgUrl,
dataUrl:o.src,
lowbandUrl:o.src,
webUrl:o.webUrl
},function(e){
e.err_msg.indexOf("ok")>=0?(i._surportType=1,p.surportType=1,i._g.checkJsapiTimeoutId&&clearTimeout(i._g.checkJsapiTimeoutId),
i.jsApiData&&i.jsApiData.updateTimeoutId&&clearTimeout(i.jsApiData.updateTimeoutId),
i.jsApiData={
starTime:+new Date,
curTime:0,
updateTimeoutId:null,
duration:o.duration||void 0
},i._onPlay(),"undefined"!=typeof o.duration&&1*o.duration>0&&i._analogUpdateTime()):2===p.surportType?i._h5Play(t):i._onError({},15);
});
},i.prototype._analogUpdateTime=function(){
function t(){
return o.curTime=1*((+new Date-o.starTime)/1e3).toFixed(2),o.curTime>=o.duration?void i._stopJsapiPlay(!1):(i._onTimeupdate(null,o.curTime),
void(o.updateTimeoutId=setTimeout(function(){
t();
},1e3)));
}
var i=this,o=i.jsApiData;
t();
},i.prototype._onPlay=function(t){
this._status=1;
try{
e(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status);
},i.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status);
},i.prototype._onEnd=function(t){
this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status);
},i.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},i.prototype._onTimeupdate=function(t,i){
"function"==typeof this._o.onTimeupdate&&this._o.onTimeupdate.call(this,t||{},i);
},i.prototype._onError=function(t,i){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},i);
},i.prototype._H5bindEvent=function(){
var t=this;
this._h5Audio.addEventListener("play",function(i){
t._onPlay(i);
},!1),this._h5Audio.addEventListener("ended",function(i){
t._onEnd(i);
},!1),this._h5Audio.addEventListener("pause",function(i){
t._onPause(i);
},!1),this._h5Audio.addEventListener("error",function(i){
var o=i.target.error.code;
(1>o||o>5)&&(o=5),t._onError(i,o);
},!1),"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",function(i){
t._onTimeupdate(i,t._h5Audio.currentTime);
},!1),"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",function(i){
t._onLoadedmetadata(i);
},!1);
},i.prototype._setSrc=function(){
var t=this._o;
t.debug||t.src||(t.mid?t.src=p.qqMusiceMid.replace("#mid#",t.mid).replace(/#songId#/g,t.songId):t.songId&&(t.src=p.qqMusiceSongId.replace(/#songId#/g,t.songId)));
},i.prototype._extend=function(t){
for(var i in t)this._o[i]=t[i];
},i.prototype._pauseJsapiPlay=function(t){
this._stopJsapiPlay(t);
},i.prototype._stopJsapiPlay=function(t){
function i(){
n.updateTimeoutId&&clearTimeout(n.updateTimeoutId),n.updateTimeoutId=null,n.curTime=0,
e._onTimeupdate(null,0),e._onEnd();
}
var e=this,n=e.jsApiData;
t?o(function(){
i();
}):i();
},i.prototype._h5Play=function(t){
(2===p.surportType||!this._o.appPlay&&1===p.surportType)&&(this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._h5Audio.ended&&(this._h5Audio.currentTime=0),
"undefined"!=typeof t?(this._h5Audio.currentTime=t,this._h5Audio.play()):this._h5Audio.play()):this._createAutoAndPlay());
},i.prototype.getSurportType=function(){
return this._surportType||0;
},i.prototype.getPlayStatus=function(){
return this._status;
},i.prototype.getCurTime=function(){
return 1==this._surportType&&this.jsApiData?this.jsApiData.curTime||0:this._h5Audio?this._h5Audio.currentTime:0;
},i.prototype.getDuration=function(){
return 1==this._surportType&&this.jsApiData?this.jsApiData.duration||void 0:this._h5Audio?this._h5Audio.duration||this._o.duration:void 0;
},i.prototype.pause=function(){
1==this._surportType?this._pauseJsapiPlay(!0):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause();
},i.prototype.stop=function(){
2==this._surportType&&this._h5Audio?(this._h5Audio.pause(),this._h5Audio.currentTime=0,
this._onEnd()):1==this._surportType&&this._stopJsapiPlay(!0);
},i.prototype.play=function(t){
var i=this,o=this._g;
o.checkJsapiTimeoutId&&clearTimeout(o.checkJsapiTimeoutId),r.device.inWechat&&this._o.appPlay?1!=this._status&&(this._createApp(t),
o.checkJsapiTimeoutId=setTimeout(function(){
i._h5Play(t);
},500)):this._h5Play(t);
},{
init:s,
getSurportType:n
};
});define("appmsg/emotion/dom.js",["biz_common/dom/event.js"],function(t){
"use strict";
function n(t){
if("string"==typeof t)var n=document.querySelectorAll(t);else n=[t];
return{
el:n,
on:function(t,n){
return this.each(function(e){
i.on(e,t,n);
}),this;
},
hide:function(){
return this.each(function(t){
t.style.display="none";
}),this;
},
show:function(){
return this.each(function(t){
t.style.display="block";
}),this;
},
each:function(t){
return e(this.el,t),this;
},
width:function(){
return this.el[0].clientWidth;
},
css:function(t){
return this.each(function(n){
for(var e in t)n.style[e]=t[e];
}),this;
},
attr:function(t,n){
var e=this.el[0];
return n?(e.setAttribute(t,n),this):e.getAttribute(t);
},
append:function(t){
return t.el&&(t=t.el[0]),this.el[0].appendChild(t),this;
},
html:function(t){
this.each(function(n){
n.innerHTML=t;
});
}
};
}
function e(t,n){
for(var e=0,i=t.length;i>e;e++)n(t[e],e);
}
var i=t("biz_common/dom/event.js");
return n.el=function(t){
return document.createElement(t);
},n.later=function(t){
setTimeout(t,3);
},n.log=function(){},n.each=e,n;
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","appmsg/emotion/map.js"],function(t,n){
"use strict";
function i(){
var t={};
j.each(b,function(n,i){
t[n]=i+1;
}),b=t;
}
function e(){
w.WIDTH=h=j("#js_article").width()||j("#js_cmt_mine").width(),w.pageCount=f=o(),
a(),s(),r();
}
function o(){
d=h-2*N,v=parseInt(d/C),_=3*v-1;
var t=parseInt(M/_);
return M%_!==0&&t++,t;
}
function a(){
var t=j("#js_slide_wrapper"),n=w.wrapperWidth=f*h;
t.css({
width:n+"px"
});
}
function s(){
for(var t=j("#js_slide_wrapper").el[0],n=(h-v*C)/2,i=0,e=f;e>i;i++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),t.appendChild(o),j(o).css({
width:h+"px",
"float":"left",
"padding-left":n+"px",
"padding-right":"0"
}),c(o,i);
}
}
function r(){
for(var t=j("#js_navbar"),n=0,i=f;i>n;n++){
var e=j(j.el("li"));
e.attr("class","emotion_nav js_emotion_nav"),T.push(e),t.append(e);
}
w.navs=T;
}
function c(t){
for(var n=0,i=_;i>n;n++){
var e=document.createElement("li");
if(k++,k>M)break;
e=p(k),j(t).append(e);
}
var o=m();
j(t).append(o);
}
function p(t){
var n=j(j.el("li")),i=j(j.el("i")),e=27===t?-1:1;
i.attr("class","icon_emotion icon"+t),i.css({
"background-position":(1-t)*S-e+"px -1px"
}),n.attr("class","emotion_item js_emotion_item"),n.attr("data-index",t);
var o=C+"px";
return n.css({
width:o,
height:o
}),n.append(i),n;
}
function m(){
var t=j(j.el("li")),n=j(j.el("i"));
t.attr("class","emotion_item del js_emotion_item"),t.attr("data-index",-1),n.attr("class","icon_emotion del");
var i=C+"px";
return t.css({
width:i,
height:i
}),t.append(n),t;
}
function u(){
function t(){
o.show(),O.show(),e.blur(),j.later(function(){
e.blur();
});
}
function n(){
o.hide(),O.hide(),e.focus(),j.later(function(){
e.focus();
});
}
O=j("#js_emotion_panel");
var i=j("#js_cmt_input"),e=i.el[0],o=j("#js_emotion_panel_arrow_wrp");
O.hide(),j("#js_emotion_switch").on("touchstart",function(i){
i.preventDefault(),i.stopPropagation(),E=!E,E?t():n();
}),i.on("tap",function(){
O.hide(),E=!1;
});
}
function l(){
j("li.js_emotion_item").on("touchend",function(t){
if(!w.isMoved){
var n=j(t.currentTarget),i=+n.attr("data-index");
I.inputEmotion(i);
}
});
}
var d,f,_,v,h,j=t("appmsg/emotion/dom.js"),g=t("appmsg/emotion/slide.js"),w=t("appmsg/emotion/common.js"),x=t("appmsg/emotion/nav.js"),I=t("appmsg/emotion/textarea.js"),n=(j.each,
{}),E=!1,O=null,b=t("appmsg/emotion/map.js"),T=[],N=15,M=w.EMOTIONS_COUNT,C=w.EMOTION_LI_SIZE,S=w.EMOTION_SIZE;
n.init=function(){
u(),e(),g.init(),x.activeNav(0),l(),I.init(),i();
};
var k=0;
return n.encode=function(t){
var n=/\/([\u4e00-\u9fa5\w]{1,3})/g,i=t.match(n);
return i?(j.each(i,function(n){
var i=n.replace("/",""),e=[i.slice(0,1),i.slice(0,2),i.slice(0,3)];
j.each(e,function(n){
if(void 0!==b[n]){
var i=b[n],e='<i class="icon_emotion_single icon'+i+'"></i>';
t=t.replace("/"+n,e);
}
});
}),t):t;
},n.hidePannel=function(){
O.hide();
},n;
});define("biz_wap/utils/hashrouter.js",[],function(){
"use strict";
function e(e,s){
h.push([e,s]);
}
function s(){
var e,s,t,i,r=a.hash.substr(1),o=!1,u=[];
for(e=0;e<h.length;e++)if(s=h[e],t=s[0],i=s[1],"default"!==t){
if("string"==typeof t&&t==r||t instanceof RegExp&&t.test(r)){
i(n),o=!0;
break;
}
}else u.push(i);
o||u.forEach(function(e){
e(n);
}),n=r;
}
var t=top.window,a=t.location,n=a.hash.substr(1),h=t.__HashMap=t.__HashMap||[];
return t.__hasListenedHashChange||(t.addEventListener("hashchange",s),t.addEventListener("load",s),
t.__hasListenedHashChange=!0),{
get:e
};
});define("a/gotoappdetail.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","appmsg/a_report.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function a(t){
"undefined"!=typeof d&&d.log&&d.log(t);
}
function e(t,a){
i("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+a.report_param);
}
function n(t){
var n=t.btn,i=t.js_app_rating;
if(!n)return!1;
var s={},f=t.adData,u="",g="",v=f.md5sum,j="",w=t.pos_type||0;
if(function(){
var t=1*f.app_rating;
t>5&&(t=5),0>t&&(t=0);
var a=["","one","two","three","four","five"],e="",n=Math.floor(t);
if(e="star_"+a[n],t>n&&(t=n+.5,e+="_half"),i&&t>0){
var o=i.getElementsByClassName("js_stars"),p=i.getElementsByClassName("js_scores");
o&&p&&o[0]&&p[0]&&(o=o[0],p=p[0],p.innerHTML=t,o.style.display="inline-block",r.addClass(o,e));
}
}(),"104"==f.pt){
var b=f.androiddownurl;
if(g=u=f.channel_id||"",b&&b.match){
var h=/&channelid\=([^&]*)/,k=b.match(h);
k&&k[1]&&(u=k[1],f.androiddownurl=b.replace(h,""));
}
u&&(u="&channelid="+u),t.via&&(j=["&via=ANDROIDWX.YYB.WX.ADVERTISE",t.via].join("."));
}
d.ready(function(){
"104"==f.pt&&(d.invoke("getInstallState",{
packageName:_
},function(t){
var e=t.err_msg;
a("getInstallState @yingyongbao : "+e);
var n=e.lastIndexOf("_")+1,o=e.substring(n);
1*o>=m&&e.indexOf("get_install_state:yes")>-1&&(c=!0);
}),d.invoke("getInstallState",{
packageName:f.pkgname
},function(t){
var e=t.err_msg;
a("getInstallState @"+f.pkgname+" : "+e);
var o=e.lastIndexOf("_")+1,i=e.substring(o);
1*i>=f.versioncode&&e.indexOf("get_install_state:yes")>-1&&(p=!0,n.innerHTML="已安装",
r.removeClass(n,"btn_download"),r.addClass(n,"btn_installed"));
})),o.on(n,"click",function(){
if(a("click @js_app_action"),p&&"104"==f.pt)return!1;
var n=function(){
if("104"==f.pt)return c?(e(24,t),void(location.href="tmast://download?oplist=1;2&pname="+f.pkgname+u+j)):(e(25,t),
void(location.href="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+f.app_id+(t.appdetail_params||"")+"&channel_id="+g+"&md5sum="+v+"&auto=1#wechat_redirect"));
if("103"==f.pt){
e(23,t);
var a="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(f.appinfo_url)+"&uin="+uin+"&ticket="+(t.ticket||window.ticket);
d.invoke("downloadAppInternal",{
appUrl:f.appinfo_url
},function(t){
t.err_msg&&-1!=t.err_msg.indexOf("ok")||(location.href=a);
});
}
};
return f.rl&&f.traceid?s[f.traceid]||(s[f.traceid]=!0,l({
type:f.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(f.androiddownurl),
tid:f.traceid,
rl:encodeURIComponent(f.rl),
__biz:biz,
pos_type:w,
pt:f.pt
},function(){
s[f.traceid]=!1,n();
})):n(),!1;
});
});
}
var o=t("biz_common/dom/event.js"),i=t("biz_common/utils/report.js"),r=(t("biz_wap/utils/ajax.js"),
t("biz_common/dom/class.js")),p=!1,s=t("appmsg/a_report.js"),l=s.AdClickReport,d=t("biz_wap/jsapi/core.js"),c=("https:"==top.location.protocol?5:0,
window.__report,!1),_="com.tencent.android.qqdownloader",m=1060125;
return n;
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function i(t){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(t);
}
function o(t,i){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+i.report_param);
}
function e(t){
var e=t.btn;
if(!e)return!1;
var n=t.adData,p=!1,c={};
t.report_param=t.report_param||"";
var d="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(n.appinfo_url)+"&uin"+uin+"&ticket="+(t.ticket||window.ticket);
r.on(e,"click",function(){
if(i("click @js_app_action"),p)return i("is_app_installed"),o(n.is_appmsg?17:13,t),
void(location.href=n.app_id+"://");
var e=function(){
i("download"),o(n.is_appmsg?15:11,t),i("go : "+d),location.href=d;
};
return i("download"),n.rl&&n.traceid?c[n.traceid]||(c[n.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+n.type+"&url="+encodeURIComponent(n.appinfo_url)+"&tid="+n.traceid+"&rl="+encodeURIComponent(n.rl)+"&pt="+n.pt+t.report_param,
type:"GET",
timeout:1e3,
complete:function(){
i("ready to download"),c[n.traceid]=!1,e();
},
async:!0
})):e(),!1;
});
}
{
var r=t("biz_common/dom/event.js"),n=t("biz_common/utils/report.js"),a=t("biz_wap/utils/ajax.js");
t("biz_wap/jsapi/core.js");
}
return e;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(n){
"use strict";
function a(n){
"undefined"!=typeof d&&d.log&&d.log(n);
}
function e(n,a){
o("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+a.report_param);
}
function t(n){
function t(){
d.invoke("getInstallState",{
packageName:s.pkgname
},function(n){
var a=n.err_msg;
a.indexOf("get_install_state:yes")>-1&&(window.clearInterval(y),g=!0,r.innerHTML=T.installed);
});
}
function o(){
j&&d.invoke("queryDownloadTask",{
download_id:j
},function(t){
if(t&&t.state){
if("download_succ"==t.state){
a("download_succ"),e(s.is_appmsg?18:14,n),window.clearInterval(b),k=!1,I=!0,r.innerHTML=T.downloaded;
var o=document.createEvent("MouseEvents");
o.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),r.dispatchEvent(o);
}
if("downloading"==t.state)return;
("download_fail"==t.state||"default"==t.state)&&(a("fail, download_state : "+t.state),
window.clearInterval(b),k=!1,alert("下载失败"),r.innerHTML=T.download);
}
});
}
var r=n.btn;
if(!r)return!1;
var l={},s=n.adData,c="",u="",m=s.androiddownurl;
if(m&&m.match){
var _=/&channelid\=([^&]*)/,p=m.match(_);
p&&p[1]&&(c="&channelid="+p[1],s.androiddownurl=m.replace(_,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,w="com.tencent.android.qqdownloader",v=1060125,g=!1,k=!1,I=!1,j=0,b=null,y=null,T={
download:"下载",
downloading:"下载中",
downloaded:"安装",
installed:"已安装"
};
r.innerHTML=T.download,d.ready(function(){
d.invoke("getInstallState",{
packageName:w
},function(n){
var e=n.err_msg;
a("getInstallState @yingyongbao : "+e);
var t=e.lastIndexOf("_")+1,o=e.substring(t);
1*o>=v&&e.indexOf("get_install_state:yes")>-1&&(f=!0);
}),d.invoke("getInstallState",{
packageName:s.pkgname
},function(n){
var e=n.err_msg;
a("getInstallState @"+s.pkgname+" : "+e);
var t=e.lastIndexOf("_")+1,o=e.substring(t);
1*o>=s.versioncode&&e.indexOf("get_install_state:yes")>-1&&(g=!0,r.innerHTML=T.installed);
}),r.addEventListener("click",function(){
if(a("click @js_app_action"),!k){
if(g)return!1;
if(I)return d.invoke("installDownloadTask",{
download_id:j,
file_md5:s.md5sum
},function(n){
var e=n.err_msg;
a("installDownloadTask : "+e),e.indexOf("install_download_task:ok")>-1?y=setInterval(t,1e3):alert("安装失败！");
}),!1;
var m=function(){
return f?(e(s.is_appmsg?16:12,n),void(location.href="tmast://download?oplist=1,2&pname="+s.pkgname+c+u)):void d.invoke("addDownloadTask",{
task_name:s.appname,
task_url:s.androiddownurl,
extInfo:n.task_ext_info,
file_md5:s.md5sum
},function(t){
var i=t.err_msg;
a("addDownloadTask : "+i),i.indexOf("add_download_task:ok")>-1?(e(s.is_appmsg?15:11,n),
k=!0,j=t.download_id,a("download_id : "+j),r.innerHTML=T.downloading,b=setInterval(o,1e3)):alert("调用下载器失败！");
});
};
return s.rl&&s.traceid?l[s.traceid]||(l[s.traceid]=!0,i({
url:"/mp/advertisement_report?report_type=2&type="+s.type+"&url="+encodeURIComponent(s.androiddownurl)+"&tid="+s.traceid+"&rl="+encodeURIComponent(s.rl)+"&__biz="+biz+"&pt="+s.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
l[s.traceid]=!1,m();
},
async:!0
})):m(),!1;
}
});
});
}
var o=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),i=n("biz_wap/utils/ajax.js"),d=n("biz_wap/jsapi/core.js");
return t;
});define("a/profile.js",["biz_common/dom/event.js","biz_common/utils/report.js","appmsg/a_report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function o(t,o){
a("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+o.report_param);
}
function e(t){
location.href=t;
}
function n(t){
var n=t.adData,p=t.pos_type||0,c={};
t.report_param=t.report_param||"",function(){
function l(){
{
var t=m.dataset;
"https:"==top.location.protocol?1500:1200;
}
if(t.rl&&t.url&&t.type&&t.tid){
var o=t.tid,e=t.type,n=t.url,i=t.rl;
c[o]||(c[o]=!0,r({
type:e,
report_type:2,
click_pos:0,
url:encodeURIComponent(n),
tid:o,
rl:encodeURIComponent(i),
__biz:biz,
pos_type:p,
pt:100
},function(){
c[o]=!1,_();
}));
}else _();
}
var m=t.btnAddContact,d=t.btnViewProfile;
if(m&&m.dataset){
var u=function(i,p){
var r=i.err_msg,c=n.is_appmsg?6:1;
-1!=r.indexOf("ok")?(d.style.display="inline-block",m.style.display="none",c=n.is_appmsg?9:4):"add_contact:added"==r?c=n.is_appmsg?7:2:"add_contact:cancel"==r?c=n.is_appmsg?8:3:(--p,
p>=0?s.invoke("addContact",{
scene:scene,
webtype:"1",
username:n.usename
},function(t){
u(t,p);
}):(r="addContact:fail|msg:"+r+"|uin:"+uin+"|biz:"+biz,a("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+r+"&r="+Math.random()),
e(n.url))),o(c,t);
},_=function(){
o(n.is_appmsg?10:5,t),s.invoke("addContact",{
scene:scene,
webtype:"1",
username:n.usename
},function(t){
u(t,1);
});
};
i.on(m,"click",l);
}
}(),function(){
var o=t.btnViewProfile;
o&&i.on(o,"click",function(){
return e(n.url),!1;
});
}();
}
{
var i=t("biz_common/dom/event.js"),a=t("biz_common/utils/report.js"),p=t("appmsg/a_report.js"),r=p.AdClickReport,s=(t("biz_wap/utils/ajax.js"),
t("biz_wap/jsapi/core.js"));
"https:"==top.location.protocol?5:0,window.__report;
}
return n;
});define("appmsg/a_report.js",["biz_wap/utils/ajax.js"],function(t){
"use strict";
function o(t,o){
var i="https:"==top.location.protocol?1500:1200,p="/mp/advertisement_report?r="+Math.random()+"&",a=[],s=!1;
for(var c in t)t.hasOwnProperty(c)&&a.push(c+"="+t[c]);
p+=a.join("&"),r({
url:p,
type:"GET",
success:function(){
n&&n(56+e);
},
error:function(){
n&&n(57+e);
},
complete:function(){
s||(s=!0,!!o&&o());
},
async:!0
}),setTimeout(function(){
s||(s=!0,!!o&&o());
},i);
}
var r=t("biz_wap/utils/ajax.js"),n=window.__report,i=top.location.protocol,e="https:"==i?5:0;
return{
AdClickReport:o
};
});define("biz_common/utils/monitor.js",[],function(){
"use strict";
var n=[],t={};
return t.setAvg=function(i,e,u){
return n.push(i+"_"+e+"_"+u),n.push(i+"_"+(e-1)+"_1"),t;
},t.setSum=function(i,e,u){
return n.push(i+"_"+e+"_"+u),t;
},t.send=function(){
if(0!=n.length){
var t=new Image;
t.src="http://mp.weixin.qq.com/mp/jsmonitor?idkey="+n.join(";"),n=[];
}
},t;
});
