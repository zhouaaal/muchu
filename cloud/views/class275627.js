define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","biz_common/dom/class.js","pages/report.js"],function(t){
"use strict";
function e(t){
this._o={
type:0,
comment_id:"",
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
webUrl:[location.protocol,"//mp.weixin.qq.com/s?__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
playingCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:""
},this._init(t);
}
function o(t,e,o){
l.num++,e.musicSupport=l.musicSupport,e.show_not_support=!1,l.musicSupport||1!=l.num||(e.show_not_support=!0);
var i=document.createElement("div");
i.innerHTML=a.render(t,e),o.parentNode.appendChild(i.children[0]);
}
function i(){
"undefined"==typeof window.reportVoiceid&&(window.reportVoiceid=[]),"undefined"==typeof window.reportMid&&(window.reportMid=[]);
}
function r(){
s.on(window,"unload",n);
}
function n(){
for(var t in l.reportData)c.musicreport({
data:l.reportData[t]
});
}
function p(t){
return new e(t);
}
var s=t("biz_common/dom/event.js"),a=t("biz_common/tmpl.js"),d=t("pages/music_player.js"),u=t("biz_common/dom/class.js"),c=t("pages/report.js"),l={
musicSupport:d.getSurportType(),
reportData:{},
posIndex:{},
num:0
};
return i(),r(),e.prototype._init=function(t){
this._extend(t),this._g={},this._initReportData(),this._initPlayer(),this._playEvent();
},e.prototype._initReportData=function(){
var t=this._o;
2==t.type||3==t.type?window.reportVoiceid.push(t.songId):(0==t.type||1==t.type)&&window.reportMid.push(t.songId),
"undefined"==typeof l.reportData[t.type]&&(l.reportData[t.type]=c.getMusicReportData(t),
l.posIndex[t.type]=0),this._g.posIndex=l.posIndex[t.type]++;
var e=l.reportData[t.type];
e.musicid.push(t.songId),e.commentid.push(t.comment_id),e.hasended.push(0),e.mtitle.push(t.title),
e.detail_click.push(0),e.duration.push(parseInt(1e3*t.duration)),e.errorcode.push(0),
e.play_duration.push(0);
},e.prototype._initPlayer=function(){
l.musicSupport&&(this._o.onStatusChange=this._statusChangeCallBack(),this._o.onTimeupdate=this._timeupdateCallBack(),
this._o.onError=this._errorCallBack(),this.player=new d.init(this._o));
},e.prototype._playEvent=function(){
var t=this,e=this._o,o=this._g;
if(l.musicSupport){
var i=0;
2==e.type||3==e.type?i=3:(0==e.type||1==e.type)&&(i=1),s.tap(e.playArea,function(){
return u.hasClass(e.playCssDom,e.playingCss)?(t.player.stop(),c.report({
type:i,
comment_id:e.comment_id,
voiceid:e.songId,
action:5
})):(t.player.play(0),l.reportData[e.type].hasended[o.posIndex]=1,c.report({
type:i,
comment_id:e.comment_id,
voiceid:e.songId,
action:4
})),!1;
});
}
e.detailUrl&&e.detailArea&&s.tap(e.detailArea,function(){
l.reportData[e.type].detail_click[o.posIndex]=1,window.location.href=e.detailUrl;
});
},e.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},e.prototype._statusChangeCallBack=function(){
var t=this;
return function(e,o){
t._updatePlayerCss(this,o);
};
},e.prototype._timeupdateCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(i,r){
t._updateProgress(this,r),0!=r&&(l.reportData[e.type].play_duration[o.posIndex]=parseInt(1e3*r));
};
},e.prototype._errorCallBack=function(){
var t=this,e=this._o,o=this._g;
return function(i,r){
l.reportData[e.type].errorcode[o.posIndex]=r,t._updatePlayerCss(this,3);
};
},e.prototype._updatePlayerCss=function(t,e){
var o=this._o,i=o.playCssDom,r=o.progress;
2==e||3==e?(u.removeClass(i,o.playingCss),!!r&&(r.style.width=0)):1==e&&u.addClass(i,o.playingCss);
},e.prototype._updateProgress=function(t,e){
var o=this._o,i=o.progress,r=t.getDuration();
r&&i&&(i.style.width=this._countProgress(r,e));
},e.prototype._countProgress=function(t,e){
return e/t*100+"%";
},{
init:p,
renderPlayer:o
};
});define("new_video/ctl.js",["biz_wap/utils/ajax.js"],function(i){
"use strict";
var t=top.window.user_uin,e=Math.floor(top.window.user_uin/100)%20;
t||(e=-1);
var o=function(){
return 18!=e&&19!=e;
};
top.window.__webviewid||(top.window.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var i=top.window.mid,e=top.window.idx,o="";
o=i&&e?i+"_"+e:"";
var d=top.window.__webviewid,w=[t,o,d].join("_");
return w;
},w=function(t){
if(20>e)try{
var o=t.vid||"",w={};
w.__biz=top.window.biz||"",w.vid=o,w.clienttime=+new Date;
var r=top.window.mid,n=top.window.idx,a="";
r&&n?(w.type=1,a=r+"_"+n):(w.type=2,a=o),w.id=a,w.webviewid=d(),w.step=t.step||0,
w.orderid=t.orderid||0,w.traceid=t.traceid||0,w.ext1=t.ext1||"",w.ext2=t.ext2||"",
w.r=Math.random();
var p=i("biz_wap/utils/ajax.js");
p({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:w
});
}catch(_){}
};
return{
report:w,
getWebviewid:d,
showAd:o
};
});define("appmsg/reward_entry.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function n(e){
e&&(e.style.display="block");
}
function r(e){
e&&(e.style.display="none");
}
function t(e){
var t=window.innerWidth||document.documentElement.innerWidth,a=(Math.ceil((c-188)/42)+1)*Math.floor((t-15)/42);
l="/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+a+"&source=1#wechat_redirect";
var i="#wechat_redirect",w=document.getElementById("js_reward_link");
w&&(w.href="https://mp.weixin.qq.com/bizmall/reward?__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1"+i),
u=e.reward_head_imgs,_=e.self_head_img;
var f=d();
m.reward&&1==e.can_reward?(n(m.reward),s.on(window,"load",function(){
s.on(window,"scroll",o);
})):r(m.reward);
var p=document.getElementById("js_reward_inner");
p&&f>0&&n(p);
var g=document.getElementById("js_reward_total");
g&&(g.innerText=e.reward_total,g.setAttribute("href",l));
}
function a(e,n){
var r=document.createElement("span");
r.className="reward_user_avatar";
var t=new Image;
return t.onload=function(){
window.logs&&window.logs.reward_heads_total++,t.onload=t.onerror=null;
},t.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
t.onload=t.onerror=null;
},t.src=n,r.appendChild(t),e.appendChild(r),r;
}
function d(){
if(u.length||_){
var e=document.getElementById("js_reward_list"),n=0,r=document.createDocumentFragment();
if(e){
_&&(n++,a(r,_));
for(var t=0,d=u.length;d>t&&(n++,a(r,u[t]),n!=3*i);++t);
n>i&&(e.className+=" tl"),e.innerHTML="",e.appendChild(r);
}
return n;
}
}
function o(){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+c>m.reward.offsetTop&&(w({
type:"GET",
url:"/bizmall/reward?act=report&__biz="+biz+"&appmsgid="+mid+"&idx="+idx,
async:!0
}),s.off(window,"scroll",o),o=null);
}
var i,l,s=e("biz_common/dom/event.js"),w=e("biz_wap/utils/ajax.js"),c=window.innerHeight||document.documentElement.clientHeight,m={
reward:document.getElementById("js_reward_area")
},u=[],_=null;
return window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0),
{
handle:function(e,n){
i=n,t(e);
},
render:function(e){
i=e,d();
}
};
});define("appmsg/comment.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/hashrouter.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e){
"use strict";
function t(e,t){
e.style.display=t?t:"block";
}
function n(e){
e.style.display="none";
}
function o(){
setTimeout(function(){
t(R.toast);
},750),setTimeout(function(){
n(R.toast);
},1500);
}
function m(e){
return e.replace(/^\s+|\s+$/g,"");
}
function i(){
clearTimeout(D),D=setTimeout(function(){
if(!M&&-1!=T){
var e=window.innerHeight||document.documentElement.clientHeight,o=window.pageYOffset||document.documentElement.scrollTop,m=document.documentElement.scrollHeight;
if(!(T>0&&m-o-e>500)){
M=!0,n(R.tips),t(R.loading);
var i="/mp/appmsg_comment?action=getcomment&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+comment_id+"&offset="+T+"&limit="+z;
try{
F++,F>1&&((new Image).src="http://mp.weixin.qq.com/mp/jsreport?key=27&content="+encodeURIComponent(i)),
A.indexOf(i)>-1&&((new Image).src="http://mp.weixin.qq.com/mp/jsreport?key=25&content="+encodeURIComponent(i)),
A.push(i);
}catch(s){}
v({
url:i,
type:"get",
success:function(e){
var t={};
try{
t=window.eval.call(window,"("+e+")");
}catch(n){}
var o=t.base_resp&&t.base_resp.ret;
0==o?c(t):q.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:resperr;url:"+encodeURIComponent(i)+";ret="+o+"&r="+Math.random();
},
error:function(){
q.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:ajaxerr;url:"+encodeURIComponent(i)+"&r="+Math.random();
},
complete:function(){
M=!1,n(R.loading);
}
});
}
}
},50);
}
function c(e){
var o,m=document.createDocumentFragment();
P++,P>1&&(S.src="http://mp.weixin.qq.com/mp/jsreport?key=26&content="+encodeURIComponent(JSON.stringify({
comment_id:comment_id,
offset:T,
url:location.href
}))),0==T?(N=e.logo_url,O=e.nick_name,o=e.elected_comment,o&&o.length?(l(o,m,"elected"),
R.list.appendChild(m),t(R.main),1!=e.is_fans?t(document.getElementById("js_cmt_nofans1"),"block"):t(document.getElementById("js_cmt_addbtn1")),
e.elected_comment_total_cnt<=10&&(t(document.getElementById("js_cmt_statement")),
t(document.getElementById("js_cmt_qa")))):(n(R.main),t(1!=e.is_fans?document.getElementById("js_cmt_nofans2"):document.getElementById("js_cmt_addbtn2"))),
function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}
}()):(o=e.elected_comment,o&&o.length&&(l(o,m,"elected"),R.list.appendChild(m))),
0==e.elected_comment_total_cnt?(T=-1,I.off(window,"scroll",i),n(document.getElementById("js_cmt_loading")),
n(document.getElementById("js_cmt_statement")),n(document.getElementById("js_cmt_qa"))):T+z>=e.elected_comment_total_cnt?(T=-1,
I.off(window,"scroll",i),n(document.getElementById("js_cmt_loading")),t(document.getElementById("js_cmt_statement")),
t(document.getElementById("js_cmt_qa"))):T+=e.elected_comment.length;
}
function s(){
x.log("tag1");
var e=m(R.input.value);
if(x.log("tag2"),!E.hasClass(R.submit,"btn_disabled")){
if(x.log("tag3"),e.length<1)return u("评论不能为空");
if(x.log("tag4"),e.length>600)return u("字数不能多于600个");
x.log("tag5"),E.addClass(R.submit,"btn_disabled"),x.log("tag6");
var n=document.getElementById("activity-name");
x.log("tag7");
var i="/mp/appmsg_comment?action=addcomment&comment_id="+comment_id+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
v({
url:i,
data:{
content:e,
title:n&&m(n.innerText),
head_img:N,
nickname:O
},
type:"POST",
success:function(n){
x.log("tag8"),C.hidePannel();
var m={},c=document.createDocumentFragment();
try{
m=window.eval.call(window,"("+n+")");
}catch(s){}
switch(+m.ret){
case 0:
o(),l([{
content:e,
nick_name:O,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:N,
like_status:0,
content_id:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:m.my_id
}],c,"mine"),R.mylist.insertBefore(c,R.mylist.firstChild),t(R.mylist.parentNode),
R.input.value="";
break;

case-6:
u("你评论的太频繁了，休息一下吧");
break;

case-7:
u("你还未关注该公众号，不能参与评论");
break;

case-10:
u("字数不能多于600个");
break;

case-15:
u("评论已关闭");
break;

default:
u("系统错误，请重试");
}
0!=m.ret&&(q.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:resperr;url:"+encodeURIComponent(i)+";ret="+m.ret+"&r="+Math.random());
},
error:function(e){
x.log("shit;"+e.status+";"+e.statusText),q.src="http://mp.weixin.qq.com/mp/jsreport?key=19&content=type:ajaxerr;url:"+encodeURIComponent(i)+"&r="+Math.random();
},
complete:function(){
""!=R.input.value&&E.removeClass(R.submit,"btn_disabled");
}
});
}
}
function a(){
if(0==H){
var e="/mp/appmsg_comment?action=getmycomment&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+comment_id,o=document.getElementById("js_mycmt_loading");
H=1,t(o),v({
url:e,
type:"get",
success:function(n){
var o={};
try{
o=window.eval.call(window,"("+n+")");
}catch(m){}
var i=o.base_resp&&o.base_resp.ret;
if(0==i){
var c=o.my_comment,s=document.createDocumentFragment();
c&&c.length&&(l(c,s,"mine"),R.mylist.appendChild(s),t(R.mylist.parentNode)),H=2;
}else H=0,q.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:resperr;url:"+encodeURIComponent(e)+";ret="+i+"&r="+Math.random();
},
error:function(){
H=0,q.src="http://mp.weixin.qq.com/mp/jsreport?key=18&content=type:ajaxerr;url:"+encodeURIComponent(e)+"&r="+Math.random();
},
complete:function(){
n(o);
}
});
}
}
function r(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,m=n/1e3-e,i=new Date(n).getFullYear(),c=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"分钟前":86400>m?Math.floor(o/60/60)+"小时前":172800>m?"昨天":604800>m?Math.floor(m/24/60/60)+"天前":c.getFullYear()==i?c.getMonth()+1+"月"+c.getDate()+"日":c.getFullYear()+"年"+(c.getMonth()+1)+"月"+c.getDate()+"日";
}
function l(e,t,n){
var o,m="",i=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0";
L={};
for(var s,a=0;s=e[a];++a){
s.time=r(s.create_time),s.status="",s.logo_url=s.logo_url||c,s.logo_url=-1!=s.logo_url.indexOf("wx.qlogo.cn")?s.logo_url.replace(/\/132$/,"/96"):s.logo_url,
s.content=s.content.htmlDecode().htmlEncode(),s.nick_name=s.nick_name.htmlDecode().htmlEncode(),
s.like_num_format=parseInt(s.like_num)>=1e4?(s.like_num/1e4).toFixed(1)+"万":s.like_num,
s.is_from_friend=s.is_from_friend||0,s.is_from_me="mine"==n?1:s.is_from_me||0,s.reply=s.reply||{
reply_list:[]
},s.is_mine=n?!1:!0,s.is_elected="elected"==n?1:s.is_elected,s.reply.reply_list.length>0&&(s.reply.reply_list[0].time=r(s.reply.reply_list[0].create_time)),
m+=B.render("t_cmt",s);
try{
var l=s.nick_name+s.content,u=!1,_=23;
L[l]&&(u=!0,_=24),U.indexOf(s.content_id)>-1&&(u=!0,_=23),U.push(s.content_id),L[l]=!0,
u&&(S.src="http://mp.weixin.qq.com/mp/jsreport?key="+_+"&content="+encodeURIComponent(JSON.stringify({
comment_id:comment_id,
content_id:s.content_id,
offset:T,
length:e.length,
url:location.href
})));
}catch(p){}
}
for(i.innerHTML=m,d(i);o=i.children.item(0);)t.appendChild(o);
}
function d(e){
x.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=C.encode(e.innerHTML);
});
}
function u(e){
return setTimeout(function(){
alert(e);
});
}
function _(){
var e="1"===w.getParam("js_my_comment");
e&&p(!0);
}
function p(e){
n(R.article),t(R.mine),window.scrollTo(0,0),a(),e||x.later(function(){
R.input.focus();
});
}
function g(){
n(R.mine),t(R.article),window.scrollTo(0,document.documentElement.scrollHeight),
R.input.blur();
}
function f(e){
var t=e.target||e.srcElement,n=null;
if(E.hasClass(t,"js_comment_praise")&&(n=t),E.hasClass(t,"icon_praise_gray")&&"i"==t.nodeName.toLowerCase()&&(n=t.parentElement),
E.hasClass(t,"praise_num")&&"span"==t.nodeName.toLowerCase()&&(n=t.parentElement),
n){
var o=parseInt(n.dataset.status),m=0==o?1:0,i=n.dataset.contentId,c="/mp/appmsg_comment?action=likecomment&&like="+m+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+comment_id+"&content_id="+i;
y(n),v({
url:c,
type:"GET"
});
}
}
function y(e){
var t=E.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=n.innerHTML,m=o.indexOf("万"),i=parseInt(o)?parseInt(o):0;
t?(-1==m&&(n.innerHTML=i-1>0?i-1:""),E.removeClass(e,"praised"),e.dataset.status=0):(-1==m&&(n.innerHTML=i+1),
E.addClass(e,"praised"),e.dataset.status=1);
}
function h(e){
var o=e.delegatedTarget,m=o.getAttribute("data-my-id"),i="/mp/appmsg_comment?action=delete&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+comment_id+"&my_id="+m;
confirm("确定删除吗？")&&v({
url:i,
success:function(e){
var i,c=o;
try{
e=JSON.parse(e);
}catch(s){
e={};
}
if(0==e.ret){
for(;c&&(c.nodeType!=c.ELEMENT_NODE||"li"!=c.tagName.toLowerCase());)c=c.parentNode;
c&&(c.parentNode.removeChild(c),i=document.getElementById("cid"+m),i&&i.parentNode.removeChild(i),
0==R.list.children.length&&(n(R.main),n(document.getElementById("js_cmt_statement")),
n(document.getElementById("js_cmt_qa")),t(document.getElementById("js_cmt_addbtn2"))),
0==R.mylist.children.length&&n(R.mylist.parentNode));
}else alert("删除失败，请重试");
},
error:function(){
alert("网络错误，请重试");
}
});
}
function j(e){
var t=document.createElement("a");
t.setAttribute("href",e),this.el=t,this.parser=this.el,this.getParam=function(e){
var t=new RegExp("([?&])"+e+"=([^&#]*)([&#])?"),n=this.el.search.match(t);
return n?n[2]:null;
};
}
var b=document.getElementById("js_cmt_area"),w=new j(window.location.href);
if(0!=comment_id&&uin&&key){
if(-1==navigator.userAgent.indexOf("MicroMessenger"))return void(b&&(b.style.display="none"));
b&&(b.style.display="block");
var I=e("biz_common/dom/event.js"),E=e("biz_common/dom/class.js"),v=e("biz_wap/utils/ajax.js"),B=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),k=e("biz_wap/utils/hashrouter.js"),C=e("appmsg/emotion/emotion.js"),x=e("appmsg/emotion/dom.js"),q=new Image,T=0,z=50,M=!1,D=null,N="",O="我",H=0,R={
article:document.getElementById("js_article"),
more:document.getElementById("js_cmt_more"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading")
},U=[],L={},S=new Image,A=[],F=0,P=0;
!function(){
i(),_(),C.init();
}(),k.get("comment",function(){
p();
}),k.get("default",function(e){
"comment"==e&&g();
}),I.on(R.input,"input",function(){
var e=m(R.input.value);
e.length<1?E.addClass(R.submit,"btn_disabled"):E.removeClass(R.submit,"btn_disabled");
}),I.on(R.more,"touchend",f),I.on(R.list,"touchend",f),I.on(R.mylist,"touchend",f),
I.on(R.list,"tap",".js_del",h),I.on(R.mylist,"tap",".js_del",h),I.on(R.submit,"touchend",s);
}
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js"],function(require,exports,module){
"use strict";
function like_report(e){
var tmpAttr=el_like.getAttribute("like"),tmpHtml=el_likeNum.innerHTML,isLike=parseInt(tmpAttr)?parseInt(tmpAttr):0,like=isLike?0:1,likeNum=parseInt(tmpHtml)?parseInt(tmpHtml):0;
ajax({
url:"/mp/appmsg_like?__biz="+biz+"&mid="+mid+"&idx="+idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
type:"GET",
timeout:2e3,
success:function(res){
var data=eval("("+res+")");
0==data.base_resp.ret&&(isLike?(Class.removeClass(el_like,"praised"),el_like.setAttribute("like",0),
likeNum>0&&"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum-1==0?"赞":likeNum-1)):(el_like.setAttribute("like",1),
Class.addClass(el_like,"praised"),"100000+"!==tmpHtml&&(el_likeNum.innerHTML=likeNum+1)));
},
async:!0
});
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),el_toolbar=document.getElementById("js_toobar2"),el_like=el_toolbar.querySelector("#like2"),el_likeNum=el_toolbar.querySelector("#likeNum2"),el_readNum=el_toolbar.querySelector("#readNum2");
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
});
});define("appmsg/a.js",["biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/a_report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","a/profile.js","a/android.js","a/ios.js","a/gotoappdetail.js"],function(require,exports,module){
"use strict";
function ad_click(e,a,t,i,o,n,p,r,s,d,_,l){
if(!has_click[o]){
has_click[o]=!0;
var c=document.getElementById("loading_"+o);
c&&(c.style.display="inline"),AdClickReport({
click_pos:1,
report_type:2,
type:e,
url:encodeURIComponent(a),
tid:o,
rl:encodeURIComponent(t),
__biz:biz,
pos_type:d,
pt:s
},function(){
if(has_click[o]=!1,c&&(c.style.display="none"),"5"==e)location.href="/mp/profile?source=from_ad&tousername="+a+"&ticket="+n+"&uin="+uin+"&key="+key+"&__biz="+biz+"&mid="+mid+"&idx="+idx+"&tid="+o;else{
if(0==a.indexOf("https://itunes.apple.com/")||0==a.indexOf("http://itunes.apple.com/")){
var t=require("biz_wap/jsapi/core.js");
return t.invoke("downloadAppInternal",{
appUrl:a
},function(e){
e.err_msg&&-1!=e.err_msg.indexOf("ok")||(location.href="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(a)+"&ticket="+n+"&uin="+uin);
}),!1;
}
if(-1==a.indexOf("mp.weixin.qq.com"))a="http://"+location.host+"/mp/redirect?url="+encodeURIComponent(a);else if(-1==a.indexOf("mp.weixin.qq.com/s")&&-1==a.indexOf("mp.weixin.qq.com/mp/appmsg/show")){
var i={
source:4,
tid:o,
idx:idx,
mid:mid,
appuin:biz,
pt:s,
aid:r,
ad_engine:_,
pos_type:d
};
if("104"==s&&l){
var p=l.pkgname&&l.pkgname.replace(/\./g,"_");
i={
source:4,
traceid:o,
mid:mid,
idx:idx,
appuin:biz,
pt:s,
aid:r,
engine:_,
pos_type:d,
pkgname:p
};
}
a=URL.join(a,i),(0==a.indexOf("http://mp.weixin.qq.com/promotion/")||0==a.indexOf("https://mp.weixin.qq.com/promotion/"))&&(a=URL.join(a,{
traceid:o,
aid:r,
engine:_
}));
}
location.href=a;
}
});
}
}
var js_bottom_ad_area=document.getElementById("js_bottom_ad_area"),js_top_ad_area=document.getElementById("js_top_ad_area"),pos_type=window.pos_type||0,adDatas=window.adDatas,__report=window.__report,total_pos_type=2,el_gdt_areas={
pos_1:js_top_ad_area,
pos_0:js_bottom_ad_area
},gdt_as={
pos_1:js_top_ad_area.getElementsByClassName("js_ad_link"),
pos_0:js_bottom_ad_area.getElementsByClassName("js_ad_link")
};
if(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger"))return js_top_ad_area.style.display="none",
js_bottom_ad_area.style.display="none",!1;
var has_click={},DomEvent=require("biz_common/dom/event.js"),URL=require("biz_common/utils/url/parse.js"),AReport=require("appmsg/a_report.js"),AdClickReport=AReport.AdClickReport,ajax=require("biz_wap/utils/ajax.js"),ping_apurl={
pos_0:!1,
pos_1:!1
},innerHeight=window.innerHeight||document.documentElement.clientHeight,ad_engine=0;
if(adDatas.num>0){
var onScroll=function(){
for(var scrollTop=window.pageYOffset||document.documentElement.scrollTop,i=0;total_pos_type>i;++i)!function(i){
var pos_key="pos_"+i;
if(!ping_apurl[pos_key]){
var gdt_a=gdt_as[pos_key];
if(gdt_a=!!gdt_a&&gdt_a[0],gdt_a&&gdt_a.dataset&&gdt_a.dataset.apurl){
var gid=gdt_a.dataset.gid,tid=gdt_a.dataset.tid,apurl=gdt_a.dataset.apurl,pos_type=adDatas.ads[pos_key].a_info.pos_type,gdt_area=el_gdt_areas[pos_key],offsetTop=gdt_area.offsetTop;
adDatas.ads[pos_key].ad_engine=0,-1!=apurl.indexOf("ad.wx.com")&&(adDatas.ads[pos_key].ad_engine=1),
(0==pos_type&&scrollTop+innerHeight>offsetTop||1==pos_type&&(10>=scrollTop||scrollTop-10>=offsetTop))&&(ping_apurl[pos_key]=!0,
ajax({
url:"/mp/advertisement_report?report_type=1&tid="+tid+"&adver_group_id="+gid+"&apurl="+encodeURIComponent(apurl)+"&__biz="+biz+"&pos_type="+pos_type+"&r="+Math.random(),
success:function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0!=res.ret?ping_apurl[pos_key]=!1:ping_apurl.pos_0&&ping_apurl.pos_1&&DomEvent.off(window,"scroll",onScroll);
},
async:!0
}));
}
}
}(i);
};
DomEvent.on(window,"scroll",onScroll),onScroll();
}
for(var keyOffset="https:"==top.location.protocol?5:0,i=0;total_pos_type>i;++i)!function(e){
var a="pos_"+e,t=el_gdt_areas[a];
if(!t.getElementsByClassName)return t.style.display="none",!1;
var i=t.getElementsByClassName("js_ad_link")||[],o=adDatas.ads[a];
if(o){
for(var n=o.adData,p=o.a_info,r=p.pos_type,s=o.ad_engine,d=0,_=i.length;_>d;++d)!function(e,a){
var t=i[e],o=t.dataset,n=o.type,p=o.url,d=o.rl,_=o.apurl,l=o.tid,c=o.ticket,m=o.group_id,u=o.aid,g=o.pt;
DomEvent.on(t,"click",function(e){
var t=!!e&&e.target;
return t&&t.className&&-1!=t.className.indexOf("js_ad_btn")?void 0:(ad_click(n,p,d,_,l,c,m,u,g,r,s,a),
!1);
},!0);
}(d,n);
if(n){
n.adid=window.adid||n.adid;
var l="&tid="+n.traceid+"&uin="+uin+"&key="+key+"&__biz="+biz+"&source="+source+"&scene="+scene+"&appuin="+biz+"&aid="+n.adid+"&ad_engine="+s+"&pos_type="+r+"&r="+Math.random();
if("100"==n.pt){
var c=require("a/profile.js");
return void new c({
btnViewProfile:document.getElementById("js_view_profile_"+r),
btnAddContact:document.getElementById("js_add_contact_"+r),
adData:n,
pos_type:r,
report_param:l
});
}
if("102"==n.pt){
var m=require("a/android.js"),u=15,g=n.pkgname&&n.pkgname.replace(/\./g,"_");
return void new m({
btn:document.getElementById("js_app_action_"+r),
adData:n,
report_param:l,
task_ext_info:[n.adid,n.traceid,g,source,u,s].join("."),
via:[n.traceid,n.adid,g,source,u,s].join(".")
});
}
if("101"==n.pt){
var f=require("a/ios.js");
return void new f({
btn:document.getElementById("js_app_action_"+r),
adData:n,
ticket:n.ticket,
report_param:l
});
}
if("103"==n.pt||"104"==n.pt){
var y=require("a/gotoappdetail.js"),u=15,g=n.pkgname&&n.pkgname.replace(/\./g,"_");
return void new y({
btn:document.getElementById("js_appdetail_action_"+r),
js_app_rating:document.getElementById("js_app_rating_"+r),
adData:n,
report_param:l,
pos_type:r,
via:[n.traceid,n.adid,g,source,u,s].join("."),
ticket:n.ticket,
appdetail_params:["&aid="+n.adid,"traceid="+n.traceid,"pkgname="+g,"source="+source,"type="+u,"engine="+s,"appuin="+biz,"pos_type="+r,"ticket="+n.ticket,"scene="+scene].join("&")
});
}
}
}
}(i);
});define("pages/version4video.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/device.js","new_video/ctl.js"],function(e){
"use strict";
function i(e,i){
i=i||"",i=["uin:"+top.window.user_uin,"resp:"+i].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+i+"&r="+Math.random();
}
function o(){
return document.domain="qq.com",-1!=top.location.href.indexOf("&_newvideoplayer=1")?!0:d.canSupportVideo&&_.inWechat?_.is_ios||_.is_android&&_.is_x5?!0:!1:(top.window._hasReportCanSupportVideo||d.canSupportVideo||!_.inWechat||(top.window._hasReportCanSupportVideo=!0,
i(44)),!1);
}
function n(){
{
var e=top.location.href;
top.sn||"";
}
return-1!=e.indexOf("&_videoad=1")?!0:-1==e.indexOf("mp.weixin.qq.com/s")&&-1==e.indexOf("mp.weixin.qq.com/mp/appmsg/show")?!1:top.window.__appmsgCgiData.can_use_page&&(_.is_ios||_.is_android)?!0:a.showAd()?!0:!1;
}
function t(){
return!1;
}
function s(){
return w.networkType;
}
var r=e("biz_common/dom/event.js"),p=e("biz_wap/jsapi/core.js"),d=e("biz_wap/utils/device.js"),a=e("new_video/ctl.js"),w=(top.window.navigator.userAgent,
{
networkType:""
}),_={};
return function(e){
var i=d.os;
_.is_ios=/(iPhone|iPad|iPod|iOS)/i.test(e),_.is_android=!!i.android,_.is_wp=!!i.phone,
_.is_pc=!(i.phone||!i.Mac&&!i.windows),_.inWechat=/MicroMessenger/.test(e),_.is_android_phone=_.is_android&&/Mobile/i.test(e),
_.is_android_tablet=_.is_android&&!/Mobile/i.test(e),_.ipad=/iPad/i.test(e),_.iphone=!_.ipad&&/(iphone)\sos\s([\d_]+)/i.test(e),
_.is_x5=/TBS\//.test(e)&&/MQQBrowser/i.test(e);
var o=e.match(/MicroMessenger\/((\d+)(\.\d+)*)/);
_.wechatVer=o&&o[1]||0,r.on(window,"load",function(){
if(""==w.networkType&&_.inWechat){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
p.invoke("getNetworkType",{},function(i){
w.networkType=e[i.err_msg]||"fail";
});
}
},!1);
}(top.window.navigator.userAgent),"undefined"==typeof top.window._hasReportCanSupportVideo&&(top.window._hasReportCanSupportVideo=!1),
{
device:_,
isShowMpVideo:o,
isUseProxy:t,
isUseAd:n,
getNetworkType:s
};
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__";
return t.getItem=function(t){
return t=e+t,localStorage.getItem(t);
},t.setItem=function(n,r){
n=e+n;
for(var i=3;i--;)try{
localStorage.setItem(n,r);
break;
}catch(a){
t.clear();
}
},t.clear=function(){
var t,n;
for(t=localStorage.length-1;t>=0;t--)n=localStorage.key(t),0==n.indexOf(e)&&localStorage.removeItem(n);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
return e=JSON.parse(e);
},
check:function(){
var e,n,r=this.getData(),i={},a=+new Date;
for(e in r)n=r[e],+n.exp>a&&(i[e]=n);
t.setItem(this.key,JSON.stringify(i));
},
set:function(e,n,r){
var i=this.getData();
i[e]={
val:n,
exp:r||+new Date
},t.setItem(this.key,JSON.stringify(i));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/tmpl.js",[],function(){
"use strict";
var n=function(n,t){
var r=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)#>/g,"',$1,'").split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");
return r(t);
},t=function(t,r){
return n(document.getElementById(t).innerHTML,r);
};
return{
render:t,
tmpl:n
};
});define("biz_common/ui/imgonepx.js",[],function(){
"use strict";
return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC";
});define("biz_common/dom/attr.js",[],function(){
"use strict";
function t(t,e,n){
return"undefined"==typeof n?t.getAttribute(e):t.setAttribute(e,n);
}
function e(t,e,n,r){
t.style.setProperty?(r=r||null,t.style.setProperty(e,n,r)):"undefined"!=typeof t.style.cssText&&(r=r?"!"+r:"",
t.style.cssText+=";"+e+":"+n+r+";");
}
return{
attr:t,
setProperty:e
};
});define("biz_wap/utils/ajax.js",["biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(e){
var t={};
return"undefined"!=typeof uin&&(t.uin=uin),"undefined"!=typeof key&&(t.key=key),
"undefined"!=typeof pass_ticket&&(t.pass_ticket=pass_ticket),t.x5=r?"1":"0",o.join(e,t);
}
function n(e){
var n=(e.type||"GET").toUpperCase(),o=t(e.url),r="undefined"==typeof e.async?!0:e.async,s=new XMLHttpRequest,a=null,u=null;
if("object"==typeof e.data){
var i=e.data;
u=[];
for(var c in i)i.hasOwnProperty(c)&&u.push(c+"="+encodeURIComponent(i[c]));
u=u.join("&");
}else u="string"==typeof e.data?e.data:null;
s.open(n,o,r),s.onreadystatechange=function(){
3==s.readyState&&e.received&&e.received(s),4==s.readyState&&(s.onreadystatechange=null,
s.status>=200&&s.status<400?e.success&&e.success(s.responseText):e.error&&e.error(s),
clearTimeout(a),e.complete&&e.complete(),e.complete=null);
},"POST"==n&&s.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
s.setRequestHeader("X-Requested-With","XMLHttpRequest"),"undefined"!=typeof e.timeout&&(a=setTimeout(function(){
s.abort("timeout"),e.complete&&e.complete(),e.complete=null;
},e.timeout));
try{
s.send(u);
}catch(p){
e.error&&e.error();
}
}
var o=e("biz_common/utils/url/parse.js"),r=-1!=navigator.userAgent.indexOf("TBS/");
return n;
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e=["&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&amp;","&","&yen;","¥"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
}
};
});define("appmsg/report.js",["biz_common/dom/event.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_common/utils/monitor.js")),o=!1,r=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),r&&r.timing&&r.timing.navigationStart?(o=r.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==n.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,i=e.length;i>t;++t)if(-1!=n.indexOf(e[t]))return!0;
return!1;
}
var i=write_sceen_time-o,r=first_sceen__time-o,s=page_endtime-o,a=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-o:void 0,g=window.logs.a8key_ready_time?window.logs.a8key_ready_time-o:void 0;
if(window.logs.pagetime.wtime=i,window.logs.pagetime.ftime=r,window.logs.pagetime.ptime=s,
window.logs.pagetime.jsapi_ready_time=a,window.logs.pagetime.a8key_ready_time=g,
!(Math.random()>.5||0>i||0>r||0>s)){
if(a&&t.setAvg(27822,15,a),g&&t.setAvg(27822,17,g),s>=15e3)return t.setAvg(27822,29,s),
void t.send();
t.setAvg(27822,1,s).setAvg(27822,3,i).setAvg(27822,5,r),window.is_page_cached&&t.setAvg(27822,19,s),
e()?(t.setAvg(27822,9,s),window.is_page_cached&&t.setAvg(27822,23,s)):"wifi"==networkType?(t.setAvg(27822,7,s),
window.is_page_cached&&t.setAvg(27822,21,s)):"2g/3g"==networkType?(t.setAvg(27822,11,s),
window.is_page_cached&&t.setAvg(27822,25,s)):(t.setAvg(27822,13,s),window.is_page_cached&&t.setAvg(27822,28,s)),
t.send();
}
}(),function(){
window.logs.jsapi_ready_fail&&(t.setSum(24729,55,window.logs.jsapi_ready_fail),t.send());
}(),void function(){
var e=document.getElementById("js_toobar2"),t=document.getElementById("page-content"),n=window.innerHeight||document.documentElement.clientHeight;
if(t&&!(Math.random()>.1)){
var o=function(){
var s=window.pageYOffset||document.documentElement.scrollTop,a=e.offsetTop;
if(s+n>=a){
for(var g,w,d=t.getElementsByTagName("img"),m={},p=[],c=0,u=0,f=0,_=0,v=d.length;v>_;++_){
var l=d[_];
g=l.getAttribute("data-src")||l.getAttribute("src"),w=l.getAttribute("src"),g&&(g.isCDN()?u++:f++,
c++,m[w]={});
}
if(p.push("1="+1e3*c),p.push("2="+1e3*u),p.push("3="+1e3*f),r.getEntries){
var h=r.getEntries(),y=window.logs.img.download,A=[0,0,0],k=[0,0,0];
c=u=0;
for(var _=0,T=h.length;T>_;++_){
var j=h[_],b=j.name;
b&&"img"==j.initiatorType&&m[b]&&(b.isCDN()&&(k[0]+=j.duration,u++),A[0]+=j.duration,
c++,m[b]={
startTime:j.startTime,
responseEnd:j.responseEnd
});
}
A[0]>0&&c>0&&(A[2]=A[0]/c),k[0]>0&&u>0&&(k[2]=k[0]/u);
for(var _ in y)if(y.hasOwnProperty(_)){
for(var E=y[_],M=0,z=0,N=0,x=0,I=0,v=E.length;v>I;++I){
var g=E[I];
if(m[g]&&m[g].startTime&&m[g].responseEnd){
var O=m[g].startTime,P=m[g].responseEnd;
M=Math.max(M,P),z=z?Math.min(z,O):O,g.isCDN()&&(N=Math.max(M,P),x=z?Math.min(z,O):O);
}
}
A[1]+=Math.round(M-z),k[1]+=Math.round(N-x);
}
for(var S=4,B=7,_=0;3>_;_++)A[_]=Math.round(A[_]),k[_]=Math.round(k[_]),A[_]>0&&(p.push(S+_+"="+A[_]),
"wifi"==networkType?p.push(S+_+6+"="+A[_]):"2g/3g"==networkType&&p.push(S+_+12+"="+A[_])),
k[_]>0&&(p.push(B+_+"="+k[_]),"wifi"==networkType?p.push(B+_+6+"="+k[_]):"2g/3g"==networkType&&p.push(B+_+12+"="+k[_]));
}
i.off(window,"scroll",o,!1);
}
};
i.on(window,"scroll",o,!1);
}
}()):!1;
}
var i=e("biz_common/dom/event.js"),n=navigator.userAgent;
e("appmsg/cdn_img_lib.js"),i.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(i){
networkType=e[i.err_msg],t();
});
}else t();
},!1);
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});
