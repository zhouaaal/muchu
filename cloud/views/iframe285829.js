define("appmsg/iframe.js",["new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}
function i(e,t){
t===!0?(d.checkOriTime=0,d.orientation!=window.orientation?(d.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1)):d.checkOriTime<=2&&(d.checkOriTime++,setTimeout(function(){
d.orientation!=window.orientation?(d.checkOriTime=0,d.orientation=window.orientation,
window.mpVideoFullScreent(e)):i(e,!1);
},150));
}
function o(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=d.video_top.length,i=0,n=0;t>n;n++){
var c=d.video_top[n];
c.reported?i++:e+d.innerHeight>=c.top&&(c.reported=!0,r.report({
step:1,
vid:c.vid
}));
}
i==t&&(a.off(window,"scroll",o),d.video_top=d.video_iframe=o=null);
}
{
var n,r=e("new_video/ctl.js"),d={
mpVideoBotH:37,
checkOri:"orientation"in window,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},c=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),s=m.setProperty,a=e("biz_common/dom/event.js"),p=document.getElementsByTagName("iframe");
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var u=0,l=p.length;l>u;++u){
n=p[u];
var f=n.getAttribute("data-src")||"",v=n.className||"",h=n.getAttribute("src")||f;
if(!f||"#"==f){
var g=n.getAttribute("data-display-src");
if(g&&(0==g.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==g.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
g=g.replace(/&amp;/g,"&");
for(var w=g.split("&"),_=["/mp/newappmsgvote?action=show"],u=0;u<w.length;u++)(0==w[u].indexOf("__biz=")||0==w[u].indexOf("supervoteid="))&&_.push(w[u]);
_.length>1&&(f=_.join("&")+"#wechat_redirect");
}
}
if(c.isShowMpVideo()&&h&&(0==h.indexOf("http://v.qq.com/iframe/player.html")||0==h.indexOf("http://v.qq.com/iframe/preview.html")||0==h.indexOf("https://v.qq.com/iframe/player.html")||0==h.indexOf("https://v.qq.com/iframe/preview.html"))){
f=f.replace(/^http:/,location.protocol),f=f.replace(/preview.html/,"player.html");
var x=h.match(/[\?&]vid\=([^&]*)/),y=x[1],b=document.getElementById("js_content").offsetWidth,O=Math.ceil(3*b/4);
window.reportVid.push(y),d.video_iframe.push({
dom:n,
vid:y
}),h=["/mp/videoplayer?video_h=",O,"&scene=1&source=4&vid=",y,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||""].join(""),
setTimeout(function(e,t,i,o){
return function(){
o.removeAttribute("style"),o.setAttribute("width",e),o.setAttribute("height",t+d.mpVideoBotH),
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(b,O,h,n),0);
}else if(f&&(f.indexOf("newappmsgvote")>-1&&v.indexOf("js_editor_vote_card")>=0||0==f.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&v.indexOf("card_iframe")>=0||f.indexOf("appmsgvote")>-1||f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(f=f.replace(/^http:/,location.protocol),v.indexOf("card_iframe")>=0){
var k=f.replace("#wechat_redirect",["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz].join(""));
reprint_ticket&&(k+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
n.setAttribute("src",k);
}else{
var A=f.indexOf("#wechat_redirect")>-1,j=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket].join("");
reprint_ticket?j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join(""):v.indexOf("vote_iframe")>=0&&(j+=["&mid=",mid,"&idx=",idx].join(""));
var k=A?f.replace("#wechat_redirect",j):f+j;
n.setAttribute("src",k);
}
-1==f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(n),n.appmsg_idx=u;
}
if(f&&f.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&b>0){
var q=b,H=3*q/4;
n.width=q,n.height=H,n.style.setProperty&&(n.style.setProperty("width",q+"px","important"),
n.style.setProperty("height",H+"px","important"));
}
}
var T="onorientationchange"in window?"orientationchange":"resize";
if(a.on(window,T,function(){
for(var e=document.getElementsByTagName("iframe"),t=0,o=e.length;o>t;t++){
var n=e[t],r=n.getAttribute("src");
r&&-1!=r.indexOf("/mp/videoplayer")&&n.className.indexOf("iframe_full_video")>=0&&setTimeout(function(e){
return function(){
d.checkOri?i(e,!0):window.mpVideoFullScreent(e);
};
}(n),0);
}
},!1),a.on(window,"resize",function(){
for(var e=document.getElementsByTagName("iframe"),t=0,i=e.length;i>t;t++){
var o=e[t],n=o.getAttribute("src");
n&&-1!=n.indexOf("/mp/videoplayer")&&setTimeout(function(e){
return function(){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4)+d.mpVideoBotH;
e.setAttribute("width",t),e.setAttribute("height",i);
};
}(o),100);
}
},!1),window.resetMpVideoH=function(e){
var t=document.getElementById("js_content").offsetWidth,i=Math.ceil(3*t/4)+d.mpVideoBotH;
return e.setAttribute("width",t),e.setAttribute("height",i),s(e,"position","static","important"),
!1;
},window.mpVideoFullScreent=function(e){
d.orientation=window.orientation||0;
var t=window.innerHeight,i=window.innerWidth,o=0;
if(d.checkOri&&90==Math.abs(d.orientation)){
var n=t;
t=i,i=n,o=0;
}
(e.getAttribute("height")!=t||e.getAttribute("width")!=i)&&setTimeout(function(){
s(e,"position","absolute","important"),e.setAttribute("width",i),e.setAttribute("height",t),
setTimeout(function(){
s(e,"position","fixed","important");
},20);
},0);
},window.iframe_reload=function(){
for(var e=0,i=p.length;i>e;++e){
n=p[e];
var o=n.getAttribute("src");
o&&(o.indexOf("newappmsgvote")>-1||o.indexOf("appmsgvote")>-1)&&t(n);
}
},"getElementsByClassName"in document)for(var B,E=document.getElementsByClassName("video_iframe"),u=0;B=E.item(u++);)B.setAttribute("scrolling","no"),
B.style.overflow="hidden";
d.video_iframe.length>0&&setTimeout(function(){
for(var e=d.video_iframe,t=document.getElementById("js_article"),i=0,n=e.length;n>i;i++){
var r=e[i];
if(!r||!r.dom)return;
for(var c=r.dom,m=c.offsetHeight,s=0;c&&t!==c;)s+=c.offsetTop,c=c.offsetParent;
d.video_top.push({
top:s+m/2,
reported:!1,
vid:r.vid
});
}
o(),a.on(window,"scroll",o);
},0);
});
