define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module){
"use strict";
function viewSource(){
var redirectUrl=sourceurl.indexOf("://")<0?"http://"+sourceurl:sourceurl;
redirectUrl=-1!=redirectUrl.indexOf("mp.weixin.qq.com/s")||-1!=redirectUrl.indexOf("mp.weixin.qq.com/mp/appmsg/show")?redirectUrl.replace(/#rd$/g,"#wechat_redirect"):"http://"+location.host+"/mp/redirect?url="+encodeURIComponent(sourceurl);
var opt={
url:"/mp/advertisement_report"+location.search+"&report_type=3&action_type=0&url="+encodeURIComponent(sourceurl)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
async:!1
};
return tid?opt.success=function(res){
try{
res=eval("("+res+")");
}catch(e){
res={};
}
res&&0==res.ret?location.href=redirectUrl:viewSource();
}:(opt.timeout=2e3,opt.complete=function(){
location.href=redirectUrl;
}),ajax(opt),!1;
}
require("biz_common/utils/string/html.js");
var DomEvent=require("biz_common/dom/event.js"),ajax=require("biz_wap/utils/ajax.js"),title=msg_title.htmlDecode(),sourceurl=msg_source_url.htmlDecode(),js_report_article=document.getElementById("js_report_article2"),JSAPI=require("biz_wap/jsapi/core.js");
DomEvent.tap(js_report_article,function(){
var e=["/mp/infringement?url=",encodeURIComponent(location.href),"&title=",encodeURIComponent(title),"&__biz=",biz].join("");
return location.href=e+"#wechat_redirect",!1;
});
var js_view_source=document.getElementById("js_view_source");
DomEvent.on(js_view_source,"click",function(){
return viewSource(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js"],function(e){
"use strict";
function t(e){
for(var t=5381,n=0;n<e.length;n++)t=(t<<5)+t+e.charCodeAt(n),t&=2147483647;
return t;
}
function n(e,t){
if(e&&!(e.length<=0))for(var n,o,i,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,l=0,m=e.length;m>l;++l)n=e[l],
n&&(o=n.getAttribute(t),o&&(i=o.match(a),i&&i[2]&&(w[i[2]]=!0)));
}
function o(e){
for(var t=0,n=f.length;n>t;++t)if(f[t]==e)return!0;
return!1;
}
function i(){
w={},n(document.getElementsByTagName("a"),"href"),n(document.getElementsByTagName("link"),"href"),
n(document.getElementsByTagName("iframe"),"src"),n(document.getElementsByTagName("script"),"src"),
n(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in w)w.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!_&&o(t)&&(_=!0),
e.push(t));
return w={},e.join(",");
}
function a(){
var e,t=window.pageYOffset||document.documentElement.scrollTop,n=document.getElementById("js_content"),o=document.documentElement.clientHeight||window.innerHeight,a=document.body.scrollHeight,l=Math.ceil(a/o),r=(window.logs.read_height||t)+o,d=document.getElementById("js_toobar2").offsetTop,g=n.getElementsByTagName("img")||[],w=Math.ceil(r/o)||1,f=document.getElementById("media"),p=50,u=0,h=0,v=0,b=0,y=r+p>d?1:0;
w>l&&(w=l);
var T=function(t){
if(t)for(var n=0,o=t.length;o>n;++n){
var i=t[n];
if(i){
u++;
var a=i.getAttribute("src"),l=i.getAttribute("data-type");
a&&0==a.indexOf("http")&&(h++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&b++),l&&(e["img_"+l+"_cnt"]=e["img_"+l+"_cnt"]||0,
e["img_"+l+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=b||0,e.download_img_cnt=h||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=u||0;
},j=window.appmsgstat||{},O=window.logs.img||{},x=window.logs.pagetime||{},z=O.load||{},E=O.read||{},D=[],B=[],N=0,k=0,S=0;
for(var I in E)I&&0==I.indexOf("http")&&E.hasOwnProperty(I)&&B.push(I);
for(var I in z)I&&0==I.indexOf("http")&&z.hasOwnProperty(I)&&D.push(I);
for(var M=0,Y=D.length;Y>M;++M){
var P=D[M];
P&&P.isCDN()&&(-1!=P.indexOf("/0")&&N++,-1!=P.indexOf("/640")&&k++,-1!=P.indexOf("/300")&&S++);
}
var e={
__biz:biz,
title:msg_title.htmlDecode(),
mid:mid,
idx:idx,
read_cnt:j.read_num||0,
like_cnt:j.like_num||0,
screen_height:o,
screen_num:l,
video_cnt:window.logs.video_cnt||0,
read_screen_num:w||0,
is_finished_read:y,
scene:source,
content_len:c.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
img_640_cnt:k,
img_0_cnt:N,
img_300_cnt:S,
wtime:x.wtime||0,
ftime:x.ftime||0,
ptime:x.ptime||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=D.length,
e.wifi_read_imgs_cnt=B.length),window.logs.webplog&&4==window.logs.webplog.total){
var A=window.logs.webplog;
e.webp_total=1,e.webp_lossy=A.lossy,e.webp_lossless=A.lossless,e.webp_alpha=A.alpha,
e.webp_animation=A.animation;
}
T(!!f&&f.getElementsByTagName("img")),T(g);
var C=(new Date).getDay(),H=i();
(_||0!==user_uin&&Math.floor(user_uin/100)%7==C)&&(e.domain_list=H),_&&(e.html_content=s),
m({
url:"/mp/appmsgreport?action=page_time",
type:"POST",
data:e,
async:!1,
timeout:2e3
});
}
e("biz_common/utils/string/html.js");
{
var l=e("biz_common/dom/event.js"),m=e("biz_wap/utils/ajax.js");
e("biz_common/utils/cookie.js");
}
e("appmsg/cdn_img_lib.js");
var s,r=e("biz_wap/utils/storage.js"),d=new r("ad"),g=new r("page_pos"),c={};
!function(){
if(s=document.getElementsByTagName("html"),s&&1==!!s.length){
s=s[0].innerHTML;
var e=s.replace(/[\x00-\xff]/g,""),t=s.replace(/[^\x00-\xff]/g,"");
c.content_length=1*t.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
window.logs.pageinfo=c;
}();
var w={},_=!1,f=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89"],p=null,u=0,h=msg_link.split("?").pop(),v=t(h);
!function(){
if(!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(l.on(window,"load",function(){
u=1*g.get(v);
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}else window.scrollTo(0,u);
}),l.on(window,"unload",function(){
if(g.set(n,u,+new Date+72e5),window._adRenderData&&"undefined"!=typeof JSON&&JSON.stringify){
var e=JSON.stringify(window._adRenderData),t=+new Date,n=[biz,sn,mid,idx].join("_");
d.set(n,{
info:e,
time:t
},+new Date+24e4);
}
a();
}),window.logs.read_height=0,l.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(p),p=setTimeout(function(){
u=window.pageYOffset,g.set(v,u,+new Date+72e5);
},500);
}),l.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(p),p=setTimeout(function(){
u=window.pageYOffset,g.set(v,u,+new Date+72e5);
},500);
}));
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function n(){
function e(e){
var n=[];
for(var i in e)n.push(i+"="+encodeURIComponent(e[i]||""));
return n.join("&");
}
if(networkType){
var n=window.performance||window.msPerformance||window.webkitPerformance;
if(n&&"undefined"!=typeof n.getEntries){
var i,t,a=100,o=document.getElementsByTagName("img"),s=o.length,p=navigator.userAgent,m=!1;
/micromessenger\/(\d+\.\d+)/i.test(p),t=RegExp.$1;
for(var g=0,w=o.length;w>g;g++)if(i=parseInt(100*Math.random()),!(i>a)){
var d=o[g].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,c=n.getEntries(),_=0;_<c.length;_++)if(f=c[_],f.name==d){
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:t,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[g].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:s>100?100:s,
delay_time:parseInt(f.duration)
})
}),m=!0;
break;
}
if(m)break;
}
}
}
}
}
var i=e("biz_common/dom/event.js"),t=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
t.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],n();
}),i.on(window,"load",n,!1);
});define("appmsg/voice.js",["pages/voice_component.js"],function(e){
"use strict";
function i(){
return a("js_content")?(m._oElements=js_content.getElementsByTagName("mpvoice")||[],
m._oElements.length<=0?!1:!0):!1;
}
function t(){
m.musicLen=m._oElements.length;
}
function n(){
for(var e=0,i=0;i<m.musicLen;i++){
var t=m._oElements[i],n={};
n.voiceid=decodeURIComponent(t.getAttribute("voice_encode_fileid")||""),n.voiceid&&"undefined"!=n.voiceid&&(n.src=m.srcRoot.replace("#meidaid#",n.voiceid),
o(t,n,e),e++);
}
}
function o(e,i,t){
i.duration=e.getAttribute("play_length")||0,i.duration_str=s(i.duration),i.posIndex=t,
i.title=decodeURIComponent(e.getAttribute("name")||""),d.renderPlayer("voice_tpl",i,e),
c(i),m.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex;
e.player=d.init({
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
duration:1*(e.duration/1e3).toFixed(2),
title:e.title.length>8?e.title.substr(0,8)+"...":e.title,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"playing",
playCssDom:a("voice_main_"+i),
playArea:a("voice_main_"+i),
progress:a("voice_progress_"+i)
});
}
function s(e){
var i=new Date(0),t=new Date(1*e),n=t.getHours()-i.getHours(),o=t.getMinutes()+60*n,c="i:ss".replace(/i|I/g,o).replace(/ss|SS/,r(t.getSeconds(),2));
return c;
}
function r(e,i){
for(var t=0,n=i-(e+"").length;n>t;t++)e="0"+e;
return e+"";
}
function a(e){
return document.getElementById(e);
}
var d=e("pages/voice_component.js"),m={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
if(i())return t(),n(),m.musicList;
});define("appmsg/qqmusic.js",["pages/voice_component.js"],function(i){
"use strict";
function e(){
return c("js_content")?(d._oElements=js_content.getElementsByTagName("qqmusic")||[],
d._oElements.length<=0?!1:!0):!1;
}
function t(){
d.musicLen=d._oElements.length;
}
function m(){
for(var i=0,e=0;e<d.musicLen;e++){
var t=d._oElements[e],m={};
m.musicid=t.getAttribute("musicid"),m.comment_id=t.getAttribute("commentid"),m.musicid&&"undefined"!=m.musicid&&m.comment_id&&"undefined"!=m.comment_id&&(n(t,m,i),
i++);
}
}
function n(i,e,t){
e.media_id=i.getAttribute("mid"),e.duration=i.getAttribute("play_length")||0,e.posIndex=t,
e.musicImgPart=i.getAttribute("albumurl")||"",e.music_img=d.imgroot+e.musicImgPart,
e.audiourl=i.getAttribute("audiourl"),e.singer=i.getAttribute("singer"),e.music_name=i.getAttribute("music_name"),
o.renderPlayer("qqmusic_tpl",e,i),s(e),d.musicList[e.musicid+"_"+e.posIndex]=e;
}
function s(i){
var e=i.musicid+"_"+i.posIndex,t=i.comment_id+"_"+i.posIndex,m=["http://data.music.qq.com/playsong.html?songmid=",i.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join("");
i.player=o.init({
type:0,
comment_id:i.comment_id,
mid:i.media_id,
songId:i.musicid,
duration:1*(i.duration/1e3).toFixed(2),
title:i.music_name.length>8?i.music_name.substr(0,8)+"...":i.music_name,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"QQ音乐",
coverImgUrl:i.music_img,
playingCss:"qqmusic_playing",
playCssDom:c("qqmusic_main_"+t),
playArea:c("qqmusic_play_"+e),
detailUrl:m,
detailArea:c("qqmusic_home_"+e)
});
}
function u(){}
function c(i){
return document.getElementById(i);
}
var o=i("pages/voice_component.js"),d={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_68",
musicList:{},
musicLen:0
};
if(e())return t(),m(),u(),d.musicList;
});define("appmsg/iframe.js",["new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
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
i==t&&(s.off(window,"scroll",o),d.video_top=d.video_iframe=o=null);
}
{
var n,r=e("new_video/ctl.js"),d={
mpVideoBotH:37,
checkOri:"orientation"in window,
innerHeight:window.innerHeight||document.documentElement.clientHeight,
video_iframe:[],
video_top:[]
},c=e("pages/version4video.js"),m=e("biz_common/dom/attr.js"),a=m.setProperty,s=e("biz_common/dom/event.js"),p=document.getElementsByTagName("iframe");
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var l=0,f=p.length;f>l;++l){
n=p[l];
var u=n.getAttribute("data-src")||"",v=n.className||"",h=n.getAttribute("src")||u;
if(!u||"#"==u){
var g=n.getAttribute("data-display-src");
if(g&&(0==g.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==g.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
g=g.replace(/&amp;/g,"&");
for(var w=g.split("&"),_=["/mp/newappmsgvote?action=show"],l=0;l<w.length;l++)(0==w[l].indexOf("__biz=")||0==w[l].indexOf("supervoteid="))&&_.push(w[l]);
_.length>1&&(u=_.join("&")+"#wechat_redirect");
}
}
if(c.isShowMpVideo()&&h&&(0==h.indexOf("http://v.qq.com/iframe/player.html")||0==h.indexOf("http://v.qq.com/iframe/preview.html")||0==h.indexOf("https://v.qq.com/iframe/player.html")||0==h.indexOf("https://v.qq.com/iframe/preview.html"))){
u=u.replace(/^http:/,location.protocol),u=u.replace(/preview.html/,"player.html");
var y=h.match(/[\?&]vid\=([^&]*)/),x=y[1],b=document.getElementById("js_content").offsetWidth,O=Math.ceil(3*b/4);
window.reportVid.push(x),d.video_iframe.push({
dom:n,
vid:x
}),h=["/mp/videoplayer?video_h=",O,"&scene=1&source=4&vid=",x,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||""].join(""),
setTimeout(function(e,t,i,o){
return function(){
o.removeAttribute("style"),o.setAttribute("width",e),o.setAttribute("height",t+d.mpVideoBotH),
o.setAttribute("marginWidth",0),o.setAttribute("marginHeight",0),o.style.top="0",
o.setAttribute("src",i);
};
}(b,O,h,n),0);
}else if(u&&(u.indexOf("newappmsgvote")>-1&&v.indexOf("js_editor_vote_card")>=0||0==u.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&v.indexOf("card_iframe")>=0||u.indexOf("appmsgvote")>-1||u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(u=u.replace(/^http:/,location.protocol),v.indexOf("card_iframe")>=0){
var k=u.replace("#wechat_redirect",["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz].join(""));
reprint_ticket&&(k+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket].join("")),
n.setAttribute("src",k);
}else{
var A=u.indexOf("#wechat_redirect")>-1,j=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket].join("");
reprint_ticket?j+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket].join(""):v.indexOf("vote_iframe")>=0&&(j+=["&mid=",mid,"&idx=",idx].join(""));
var k=A?u.replace("#wechat_redirect",j):u+j;
n.setAttribute("src",k);
}
-1==u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&!function(e){
e.onload=function(){
t(e);
};
}(n),n.appmsg_idx=l;
}
if(u&&u.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&b>0){
var q=b,H=3*q/4;
n.width=q,n.height=H,n.style.setProperty&&(n.style.setProperty("width",q+"px","important"),
n.style.setProperty("height",H+"px","important"));
}
}
var T="onorientationchange"in window?"orientationchange":"resize";
if(s.on(window,T,function(){
for(var e=document.getElementsByTagName("iframe"),t=0,o=e.length;o>t;t++){
var n=e[t],r=n.getAttribute("src");
r&&-1!=r.indexOf("/mp/videoplayer")&&n.className.indexOf("iframe_full_video")>=0&&setTimeout(function(e){
return function(){
d.checkOri?i(e,!0):window.mpVideoFullScreent(e);
};
}(n),0);
}
},!1),s.on(window,"resize",function(){
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
return e.setAttribute("width",t),e.setAttribute("height",i),a(e,"position","static","important"),
!1;
},window.mpVideoFullScreent=function(e){
d.orientation=window.orientation||0;
var t=window.innerHeight,i=window.innerWidth,o=0;
if(d.checkOri&&90==Math.abs(d.orientation)){
var n=t;
t=i,i=n,o=0;
}
(e.getAttribute("height")!=t||e.getAttribute("width")!=i)&&setTimeout(function(){
a(e,"position","absolute","important"),e.setAttribute("width",i),e.setAttribute("height",t),
setTimeout(function(){
a(e,"position","fixed","important");
},20);
},0);
},window.iframe_reload=function(){
for(var e=0,i=p.length;i>e;++e){
n=p[e];
var o=n.getAttribute("src");
o&&(o.indexOf("newappmsgvote")>-1||o.indexOf("appmsgvote")>-1)&&t(n);
}
},"getElementsByClassName"in document)for(var B,E=document.getElementsByClassName("video_iframe"),l=0;B=E.item(l++);)B.setAttribute("scrolling","no"),
B.style.overflow="hidden";
d.video_iframe.length>0&&setTimeout(function(){
for(var e=d.video_iframe,t=document.getElementById("js_article"),i=0,n=e.length;n>i;i++){
var r=e[i];
if(!r||!r.dom)return;
for(var c=r.dom,m=c.offsetHeight,a=0;c&&t!==c;)a+=c.offsetTop,c=c.offsetParent;
d.video_top.push({
top:a+m/2,
reported:!1,
vid:r.vid
});
}
o(),s.on(window,"scroll",o);
},0);
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t){
r.invoke("imagePreview",{
current:e,
urls:t
});
}
function i(e){
var i=[],r=e.container;
r=r?r.getElementsByTagName("img"):[];
for(var n=0,p=r.length;p>n;n++){
var m=r.item(n),c=m.getAttribute("data-src")||m.getAttribute("src"),o=m.getAttribute("data-type");
if(c){
for(;-1!=c.indexOf("?tp=webp");)c=c.replace("?tp=webp","");
m.dataset&&m.dataset.s&&c.isCDN()&&(c=c.replace(/\/640$/,"/0"),c=c.replace(/\/640\?/,"/0?")),
c.isCDN()&&(c=s.addParam(c,"wxfrom","3",!0)),e.is_https_res&&(c=c.http2https()),
o&&(c=s.addParam(c,"wxtype",o,!0)),i.push(c),function(e){
a.on(m,"click",function(){
return t(e,i),!1;
});
}(c);
}
}
}
var a=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),s=e("biz_common/utils/url/parse.js");
return e("appmsg/cdn_img_lib.js"),i;
});define("appmsg/outer_link.js",["biz_common/dom/event.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],i=0,o=r.length;o>i;++i)!function(n){
var i=r[n],o=i.getAttribute("href");
if(!o)return!1;
var a=0,c=i.innerHTML;
/^[^<>]+$/.test(c)?a=1:/^<img[^>]*>$/.test(c)&&(a=2),!!e.changeHref&&(o=e.changeHref(o,a)),
t.on(i,"click",function(){
return location.href=o,!1;
},!0);
}(i);
}
var t=e("biz_common/dom/event.js");
return n;
});define("biz_wap/jsapi/core.js",[],function(){
"use strict";
document.domain="qq.com";
var i={
ready:function(i){
"undefined"!=typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.invoke?i():top.window.document.addEventListener?top.window.document.addEventListener("WeixinJSBridgeReady",i,!1):top.window.document.attachEvent&&(top.window.document.attachEvent("WeixinJSBridgeReady",i),
top.window.document.attachEvent("onWeixinJSBridgeReady",i));
},
invoke:function(i,n,e){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?(alert("请在微信中打开此链接！"),!1):void top.window.WeixinJSBridge.invoke(i,n,e);
});
},
call:function(i){
this.ready(function(){
return"object"!=typeof top.window.WeixinJSBridge?!1:void top.window.WeixinJSBridge.call(i);
});
},
on:function(i,n){
this.ready(function(){
return"object"==typeof top.window.WeixinJSBridge&&top.window.WeixinJSBridge.on?void top.window.WeixinJSBridge.on(i,n):!1;
});
}
};
return i;
});define("biz_common/dom/event.js",[],function(){
"use strict";
function e(e,t,n,o){
a.isPc||a.isWp?i(e,"click",o,t,n):i(e,"touchend",o,function(e){
if(-1==a.tsTime||+new Date-a.tsTime>200)return a.tsTime=-1,!1;
var n=e.changedTouches[0];
return Math.abs(a.y-n.clientY)<=5&&Math.abs(a.x-n.clientX)<=5?t.call(this,e):void 0;
},n);
}
function t(e,t){
if(!e||!t||e.nodeType!=e.ELEMENT_NODE)return!1;
var n=e.webkitMatchesSelector||e.msMatchesSelector||e.matchesSelector;
return n?n.call(e,t):(t=t.substr(1),e.className.indexOf(t)>-1);
}
function n(e,n,i){
for(;e&&!t(e,n);)e=e!==i&&e.nodeType!==e.DOCUMENT_NODE&&e.parentNode;
return e;
}
function i(t,i,o,r,c){
var s,d,u;
return"input"==i&&a.isPc,t?("function"==typeof o&&(c=r,r=o,o=""),"string"!=typeof o&&(o=""),
t==window&&"load"==i&&/complete|loaded/.test(document.readyState)?r({
type:"load"
}):"tap"==i?e(t,r,c,o):(s=function(e){
var t=r(e);
return t===!1&&(e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault()),
t;
},o&&"."==o.charAt(0)&&(u=function(e){
var i=e.target||e.srcElement,r=n(i,o,t);
return r?(e.delegatedTarget=r,s(e)):void 0;
}),d=u||s,r[i+"_handler"]=d,t.addEventListener?void t.addEventListener(i,d,!!c):t.attachEvent?void t.attachEvent("on"+i,d,!!c):void 0)):void 0;
}
function o(e,t,n,i){
if(e){
var o=n[t+"_handler"]||n;
return e.removeEventListener?void e.removeEventListener(t,o,!!i):e.detachEvent?void e.detachEvent("on"+t,o,!!i):void 0;
}
}
var r=navigator.userAgent,a={
isPc:/(WindowsNT)|(Windows NT)|(Macintosh)/i.test(navigator.userAgent),
isWp:/Windows\sPhone/i.test(r),
tsTime:-1
};
return a.isPc||i(document,"touchstart",function(e){
var t=e.changedTouches[0];
a.x=t.clientX,a.y=t.clientY,a.tsTime=+new Date;
}),{
on:i,
off:o,
tap:e
};
});;define('appmsg/copyright_report.js', ['biz_common/dom/event.js'], function(require, exports, module){
	'use strict';

	var DomEvent = require('biz_common/dom/event.js'),
		g = {
		innerHeight : window.innerHeight || document.documentElement.clientHeight,
		copyright_top : 0
	};

	
	function card_click_report(opt){
		var url = [
           "/mp/copyrightreport?action=report&biz=",
           biz,
           "&scene=",opt.scene,
           "&card_pos=",window.__appmsgCgiData.card_pos,
           "&ori_username=",
           source_username,
           "&user_uin=",
           user_uin,
           "&uin=",uin,
           "&key=",key,
           "&pass_ticket=",pass_ticket,
           "&t=",Math.random()
       ].join(""),
       img = new Image();
       img.src = url.substr(0,1024);
	}

	
	function card_pv_report(){
		var a = __appmsgCgiData;
		if(a.copyright_stat=="2" && a.card_pos=="1"){
			card_click_report({
				scene : "1",
				card_pos : "1"
			});
		}else if(a.copyright_stat=="2" && a.card_pos=="0"){
			var parent = _id("copyright_info"),
				topDom = _id("js_article");
			while( !!parent && topDom!==parent  ){
				g.copyright_top += parent.offsetTop;
				parent = parent.offsetParent;
			}
			
			DomEvent.on(window, 'scroll', card_bottom_pv_report);
		}
	}

	function card_bottom_pv_report(){
		var scrollTop = (window.pageYOffset||document.documentElement.scrollTop);

        
        if ( (scrollTop + g.innerHeight) > g.copyright_top) {
           	card_click_report({
				scene : "1",
				card_pos : "0"
			});
            DomEvent.off(window, 'scroll', card_bottom_pv_report);
            card_bottom_pv_report = g.copyright_top = null;
        }
	}

	function _id(id){
		return document.getElementById(id);
	}

	return {
		card_click_report : card_click_report,
		card_pv_report : card_pv_report
	};
});define("appmsg/async.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/dom/class.js","biz_common/tmpl.js","biz_wap/utils/storage.js","pages/version4video.js","appmsg/cdn_img_lib.js","biz_common/utils/url/parse.js","appmsg/a.js","appmsg/like.js","appmsg/comment.js","appmsg/reward_entry.js"],function(require,exports,module){
"use strict";
function saveCopy(e){
var t={};
for(var a in e)if(e.hasOwnProperty(a)){
var r=e[a],i=typeof r;
r="string"==i?r.htmlDecode():r,"object"==i&&(r=saveCopy(r)),t[a]=r;
}
return t;
}
function fillVedio(e){
if(vedio_iframes&&vedio_iframes.length>0)for(var t,a,r,i=0,n=vedio_iframes.length;n>i;++i)t=vedio_iframes[i],
a=t.iframe,r=t.src,e&&(r=r.replace(/\&encryptVer=[^\&]*/gi,""),r=r.replace(/\&platform=[^\&]*/gi,""),
r=r.replace(/\&cKey=[^\&]*/gi,""),r=r+"&encryptVer=6.0&platform=61001&cKey="+e),
a.setAttribute("src",r);
}
function fillData(e){
var t=e.adRenderData||{
advertisement_num:0
};
if(!t.flag&&t.advertisement_num>0){
var a=t.advertisement_num,r=t.advertisement_info;
window.adDatas.num=a;
for(var i=0;a>i;++i){
var n=null,o=r[i];
if(o.biz_info=o.biz_info||{},o.app_info=o.app_info||{},o.pos_type=o.pos_type||0,
o.logo=o.logo||"",100==o.pt)n={
usename:o.biz_info.user_name,
pt:o.pt,
url:o.url,
traceid:o.traceid,
adid:o.aid,
is_appmsg:!0
};else if(102==o.pt)n={
appname:o.app_info.app_name,
versioncode:o.app_info.version_code,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
md5sum:o.app_info.app_md5,
signature:o.app_info.version_code,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(101==o.pt)n={
appname:o.app_info.app_name,
app_id:o.app_info.app_id,
icon_url:o.app_info.icon_url,
appinfo_url:o.app_info.appinfo_url,
rl:o.rl,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};else if(103==o.pt||104==o.pt){
var d=o.app_info.down_count||0,s=o.app_info.app_size||0,p=o.app_info.app_name||"",m=o.app_info.category,c=["万","百万","亿"];
if(d>=1e4){
d/=1e4;
for(var l=0;d>=10&&2>l;)d/=100,l++;
d=d.toFixed(1)+c[l]+"次";
}else d=d.toFixed(1)+"次";
s>=1024?(s/=1024,s=s>=1024?(s/1024).toFixed(2)+"MB":s.toFixed(2)+"KB"):s=s.toFixed(2)+"B",
m=m?m[0]||"其他":"其他";
for(var _=["-","(",":",'"',"'","：","（","—","“","‘"],f=-1,u=0,g=_.length;g>u;++u){
var w=_[u],v=p.indexOf(w);
-1!=v&&(-1==f||f>v)&&(f=v);
}
-1!=f&&(p=p.substring(0,f)),o.app_info._down_count=d,o.app_info._app_size=s,o.app_info._category=m,
o.app_info.app_name=p,n={
appname:o.app_info.app_name,
app_rating:o.app_info.app_rating||0,
app_id:o.app_info.app_id,
channel_id:o.app_info.channel_id,
md5sum:o.app_info.app_md5,
rl:o.rl,
pkgname:o.app_info.apk_name,
androiddownurl:o.app_info.apk_url,
versioncode:o.app_info.version_code,
appinfo_url:o.app_info.appinfo_url,
traceid:o.traceid,
pt:o.pt,
ticket:o.ticket,
type:o.type,
adid:o.aid,
is_appmsg:!0
};
}
var h=o.image_url;
require("appmsg/cdn_img_lib.js");
var y=require("biz_common/utils/url/parse.js");
h&&h.isCDN()&&(h=h.replace(/\/0$/,"/640"),h=h.replace(/\/0\?/,"/640?"),o.image_url=y.addParam(h,"wxfrom","50",!0)),
adDatas.ads["pos_"+o.pos_type]={
a_info:o,
adData:n
};
}
var b=function(e){
var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
"undefined"!=typeof e&&(t=e);
10>=t&&(x.style.display="block",DomEvent.off(window,"scroll",b));
},j=document.getElementById("js_bottom_ad_area"),x=document.getElementById("js_top_ad_area"),k=adDatas.ads;
for(var q in k)if(0==q.indexOf("pos_")){
var n=k[q],o=!!n&&n.a_info;
if(n&&o)if(0==o.pos_type)j.innerHTML=TMPL.render("t_ad",o);else if(1==o.pos_type){
x.style.display="none",x.innerHTML=TMPL.render("t_ad",o),DomEvent.on(window,"scroll",b);
var z=0;
window.localStorage&&(z=1*localStorage.getItem(q)||0),window.scrollTo(0,z),b(z);
}
}
require("appmsg/a.js");
}
var D=e.appmsgstat||{};
window.appmsgstat||(window.appmsgstat=D),D.show&&(!function(){
var e=document.getElementById("js_read_area2"),t=document.getElementById("like2");
e.style.display="block",t.style.display="inline",D.liked&&Class.addClass(t,"praised"),
t.setAttribute("like",D.liked?"1":"0");
var a=document.getElementById("likeNum2"),r=document.getElementById("readNum2"),i=D.read_num,n=D.like_num;
i||(i=1),n||(n="赞"),parseInt(i)>1e5?i="100000+":"",parseInt(n)>1e5?n="100000+":"",
r&&(r.innerHTML=i),a&&(a.innerHTML=n);
}(),require("appmsg/like.js")),1==e.comment_enabled&&require("appmsg/comment.js"),
-1==ua.indexOf("WindowsWechat")&&-1!=ua.indexOf("MicroMessenger")&&e.reward&&(rewardEntry=require("appmsg/reward_entry.js"),
rewardEntry.handle(e.reward,getCountPerLine()));
}
function getAsyncData(){
var is_need_ticket="";
vedio_iframes&&vedio_iframes.length>0&&(is_need_ticket="&is_need_ticket=1");
var is_need_ad=1,_adInfo=null;
if(window.localStorage)try{
var key=[biz,sn,mid,idx].join("_"),_ad=adLS.get(key);
_adInfo=_ad.info;
try{
_adInfo=eval("("+_adInfo+")");
}catch(e){
_adInfo=null;
}
var _adInfoSaveTime=_ad.time,_now=+new Date;
_adInfo&&18e4>_now-1*_adInfoSaveTime&&1*_adInfo.advertisement_num>0?is_need_ad=0:adLS.remove(key);
}catch(e){
is_need_ad=1,_adInfo=null;
}
(!document.getElementsByClassName||-1==navigator.userAgent.indexOf("MicroMessenger")||inwindowwx)&&(is_need_ad=0);
var screen_num=Math.ceil(document.body.scrollHeight/(document.documentElement.clientHeight||window.innerHeight)),both_ad=screen_num>=2?1:0;
ajax({
url:"/mp/getappmsgext?__biz="+biz+"&mid="+mid+"&sn="+sn+"&idx="+idx+"&scene="+source+"&title="+encodeURIComponent(msg_title.htmlDecode())+"&ct="+ct+"&devicetype="+devicetype.htmlDecode()+"&version="+version.htmlDecode()+"&f=json&r="+Math.random()+is_need_ticket+"&is_need_ad="+is_need_ad+"&comment_id="+comment_id+"&is_need_reward="+is_need_reward+"&both_ad="+both_ad+"&reward_uin_count="+(is_need_reward?3*getCountPerLine():0),
type:"GET",
async:!0,
success:function(ret){
var tmpret=ret;
if(ret)try{
try{
ret=eval("("+tmpret+")");
}catch(e){
var img=new Image;
return void(img.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=3&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key3]"+encodeURIComponent(tmpret)+"&r="+Math.random()).substr(0,1024));
}
if(fillVedio(ret.appmsgticket?ret.appmsgticket.ticket:""),ret.ret)return;
var adRenderData={};
if(0==is_need_ad)adRenderData=_adInfo,adRenderData||(adRenderData={
advertisement_num:0
});else{
if(ret.advertisement_num>0&&ret.advertisement_info){
var d=ret.advertisement_info;
adRenderData.advertisement_info=saveCopy(d);
}
adRenderData.advertisement_num=ret.advertisement_num;
}
1==is_need_ad&&(window._adRenderData=adRenderData),fillData({
adRenderData:adRenderData,
appmsgstat:ret.appmsgstat,
comment_enabled:ret.comment_enabled,
reward:{
reward_total:ret.reward_total_count,
self_head_img:ret.self_head_img,
reward_head_imgs:ret.reward_head_imgs||[],
can_reward:ret.can_reward,
timestamp:ret.timestamp
}
});
}catch(e){
var img=new Image;
return img.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(e.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(e));
}
},
error:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
function getCountPerLine(){
return DomEvent.on(window,"resize",function(){
onResize(),rewardEntry&&rewardEntry.render(getCountPerLine());
}),onResize();
}
function onResize(){
var e=window.innerWidth||document.documentElement.clientWidth;
try{
e=document.getElementById("page-content").getBoundingClientRect().width;
}catch(t){}
var a=30,r=34,i=Math.floor(.9*(e-a)/r);
return document.getElementById("js_reward_inner")&&(document.getElementById("js_reward_inner").style.width=i*r+"px"),
getCountPerLine=function(){
return i;
},i;
}
require("biz_common/utils/string/html.js");
var iswifi=!1,ua=navigator.userAgent,in_mm=-1!=ua.indexOf("MicroMessenger"),inwindowwx=-1!=navigator.userAgent.indexOf("WindowsWechat"),DomEvent=require("biz_common/dom/event.js"),offset=200,ajax=require("biz_wap/utils/ajax.js"),Class=require("biz_common/dom/class.js"),TMPL=require("biz_common/tmpl.js"),LS=require("biz_wap/utils/storage.js"),rewardEntry,adLS=new LS("ad"),iframes=document.getElementsByTagName("iframe"),iframe,js_content=document.getElementById("js_content"),vedio_iframes=[],w=js_content.offsetWidth,h=3*w/4;
window.logs.video_cnt=0;
for(var i=0,len=iframes.length;len>i;++i){
iframe=iframes[i];
var src=iframe.getAttribute("data-src")||"",realsrc=iframe.getAttribute("src")||src;
if(realsrc){
var Version4video=require("pages/version4video.js");
if(!Version4video.isShowMpVideo()&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html")||0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))||0==realsrc.indexOf("http://z.weishi.com/weixin/player.html")){
-1==realsrc.indexOf("http://z.weishi.com/weixin/player.html")&&-1==src.indexOf("http://z.weixin.com/weixin/player.html")&&(src=src.replace(/^https:/,"http:"),
src=src.replace(/preview.html/,"player.html"),realsrc=realsrc.replace(/^https:/,"http:"),
realsrc=realsrc.replace(/preview.html/,"player.html")),realsrc=realsrc.replace(/width=\d+/g,"width="+w),
realsrc=realsrc.replace(/height=\d+/g,"height="+h),in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/player.html")||0==realsrc.indexOf("https://v.qq.com/iframe/player.html"))||in_mm&&(0==realsrc.indexOf("http://v.qq.com/iframe/preview.html")||0==realsrc.indexOf("https://v.qq.com/iframe/preview.html"))?vedio_iframes.push({
iframe:iframe,
src:realsrc
}):iframe.setAttribute("src",realsrc),iframe.width=w,iframe.height=h,iframe.style.setProperty&&(iframe.style.setProperty("width",w+"px","important"),
iframe.style.setProperty("height",h+"px","important")),window.logs.video_cnt++;
continue;
}
}
}
window.adDatas={
ads:{},
num:0
};
var js_toobar=document.getElementById("js_toobar2"),innerHeight=window.innerHeight||document.documentElement.clientHeight,onScroll=function(){
var e=window.pageYOffset||document.documentElement.scrollTop,t=js_toobar.offsetTop;
e+innerHeight+offset>=t&&(getAsyncData(),DomEvent.off(window,"scroll",onScroll));
};
iswifi?(DomEvent.on(window,"scroll",onScroll),onScroll()):getAsyncData();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=e+40,n=this.offset||20,a=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),n=Math.max(s.bottom*e,n),
a=Math.max(s.top*e,a);
}
for(var l=+new Date,d=[],c=this.sw,u=0,w=t.length;w>u;u++){
var p=t[u],f=p.el.offsetTop;
if(!p.show&&(i>=f&&i<=f+p.height+a||f>i&&i+o+n>f)){
var g=p.src,v=this;
this.inImgRead&&(i>=f&&i<=f+p.height||f>i&&i+o>f)&&this.inImgRead(g,networkType),
this.changeSrc&&(g=this.changeSrc(p.el,g)),p.el.onerror=function(){
!!v.onerror&&v.onerror(g);
},p.el.onload=function(){
var t=this;
m(t,"height","auto","important"),t.getAttribute("_width")?m(t,"width",t.getAttribute("_width"),"important"):m(t,"width","auto","important");
},h(p.el,"src",g),d.push(g),p.show=!0,m(p.el,"visibility","visible","important");
}
r.isWp&&1*p.el.width>c&&(p.el.width=c);
}
d.length>0&&this.detect&&this.detect({
time:l,
loadList:d,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",r=o.offsetWidth,a=0;
o.currentStyle?a=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(a=getComputedStyle(o).width),
this.sw=1*a.replace("px","");
for(var s=0,d=t.length;d>s;s++){
var c=t.item(s),u=h(c,n);
if(u){
var w=100;
if(c.dataset&&c.dataset.ratio){
var p=1*c.dataset.ratio,f=1*c.dataset.w||r;
"number"==typeof p&&p>0?(f=r>=f?f:r,w=f*p,c.style.width&&c.setAttribute("_width",c.style.width),
m(c,"width",f+"px","important"),m(c,"visibility","visible","important"),c.setAttribute("src",l)):m(c,"visibility","hidden","important");
}else m(c,"visibility","hidden","important");
m(c,"height",w+"px","important"),e.push({
el:c,
src:u,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
var e=this,o=e.timer;
clearTimeout(o),e.timer=setTimeout(function(){
i.call(e,t);
},300);
}
function n(t){
a.on(window,"scroll",function(i){
o.call(t,i);
}),a.on(window,"load",function(i){
e.call(t,i);
}),a.on(document,"touchmove",function(i){
o.call(t,i);
});
}
var r=t("biz_wap/utils/mmversion.js"),a=t("biz_common/dom/event.js"),s=t("biz_common/dom/attr.js"),h=s.attr,m=s.setProperty,l=t("biz_common/ui/imgonepx.js");
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});
;define('appmsg/share.js', ['biz_common/utils/string/html.js', 'appmsg/cdn_img_lib.js', 'biz_common/dom/event.js', 'biz_common/utils/url/parse.js', 'biz_wap/utils/mmversion.js', 'biz_wap/utils/ajax.js', 'biz_wap/jsapi/core.js'], function(require, exports, module){
	'use strict';

	require('biz_common/utils/string/html.js');
  require('appmsg/cdn_img_lib.js');
	var 
		DomEvent = require('biz_common/dom/event.js'),
    ParseJs = require('biz_common/utils/url/parse.js'),
    mmversion = require('biz_wap/utils/mmversion.js'),
		ajax = require('biz_wap/utils/ajax.js');

	function share_scene(link, scene_type){
	    var extargs = "";
	    if (tid != ""){
	        extargs = "tid=" + tid + "&aid=" + 54;
	    }
	    var queryStr = link.split('?')[1] || '';
	        queryStr = queryStr.split('#')[0];
	    if( queryStr == '' ){
	        return;
	    }
	    
	    var queryarr = [queryStr, 'scene='+scene_type, "srcid="+srcid];
	    (extargs != "") && (queryarr.push(extargs));
	    queryStr = queryarr.join('&');

	    return link.split('?')[0] + '?' + queryStr + '#' + (link.split('#')[1]||'');
	}
	
	var JSAPI = require('biz_wap/jsapi/core.js');

    JSAPI.call("hideToolbar");
    JSAPI.call('showOptionMenu');

	var title     = msg_title.htmlDecode();
	var sourceurl = msg_source_url.htmlDecode();
    var appId  = '',
        imgUrl = msg_cdn_url,
        link   = msg_link.htmlDecode(),
        title  = msg_title.htmlDecode(),
        desc   = msg_desc.htmlDecode();    
    desc   = desc || link;  

    
    if (idx > 1 && document.getElementById('js_content')) {
        desc = document.getElementById('js_content').innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,'').substr(0,54);
    }

    if (!!imgUrl.isCDN()){
      imgUrl = imgUrl.replace(/\/0$/, "/300");
    }
	
	function report(link, fakeid, action_type){
	    var queryStr = link.split('?').pop();
	        queryStr = queryStr.split('#').shift();
	    if( queryStr == '' ){
	        return;
	    }

	    var param = [
	        queryStr,
	        'action_type=' + action_type,
          'vid=' + (typeof window.reportVid!="undefined"?window.reportVid.join(";"):""),
          'musicid=' + (typeof window.reportMid!="undefined"?window.reportMid.join(";"):""),
          'voiceid=' + (typeof window.reportVoiceid!="undefined"?window.reportVoiceid.join(";"):"")
	    ].join('&');

	    ajax({
	        url : '/mp/appmsg/show',
	        type: 'POST',
	        timeout: 2000,
	        data: param
	    });
	};

    
    function addUrlOrigin(url,type){
      if (url.isCDN()){
        url = ParseJs.addParam(url, "wxfrom", type, true);
      }
      return url;
    }

    if( "1" == is_limit_user ){
        JSAPI.call("hideOptionMenu");  
    }

    
    
    JSAPI.on('menu:share:appmessage', function(argv){
        var type = 1;
        
        var newUrl = addUrlOrigin(imgUrl,"1");
        if (!!argv && argv.scene == "favorite"){
            type = 4;            
            newUrl = addUrlOrigin(imgUrl,"4");
        }
        
        
        JSAPI.invoke('sendAppMessage',{
                              "appid"      : appId,
                              "img_url"    : newUrl,
                              "img_width"  : "640",
                              "img_height" : "640",
                              "link"       : share_scene(link, type),
                              "desc"       : desc,
                              "title"      : title
        }, function(res) {
        	report(link, fakeid, type);
        });
    });

            
    JSAPI.on('menu:share:timeline', function(argv){        
        var newUrl = imgUrl;
        
        
        if(!mmversion.isIOS){          
          newUrl = addUrlOrigin(imgUrl,"2");
        }        
        report(link, fakeid, 2);
        JSAPI.invoke('shareTimeline',{
                              "img_url"    : newUrl,
                              "img_width"  : "640",
                              "img_height" : "640",
                              "link"       : share_scene(link, 2),
                              "desc"       : desc,
                              "title"      : title
        }, function(res) {
        });
    });

    
    var weiboContent = '';
    JSAPI.on('menu:share:weiboApp', function(argv){
        JSAPI.invoke('shareWeiboApp',{
    			   "img_url"    : imgUrl,
              
              
              "link"       : share_scene(link, 3),
              
              "title"      : title
		}, function(res) {
			report(link, fakeid, 3);
		});
    });

    
    JSAPI.on('menu:share:facebook', function(argv){
        report(link, fakeid, 4);
        JSAPI.invoke('shareFB',{
              "img_url"    : imgUrl,
              "img_width"  : "640",
              "img_height" : "640",
              "link"       : share_scene(link, 4),
              "desc"       : desc,
              "title"      : title
        }, function(res) {});
    });

    
    JSAPI.on('menu:share:QZone', function(argv){
        var newUrl = addUrlOrigin(imgUrl, "6");

        report(link, fakeid, 5);
        JSAPI.invoke('shareQZone',{
              "img_url"    : newUrl,
              "img_width"  : "640",
              "img_height" : "640",
              "link"       : share_scene(link, 22),
              "desc"       : desc,
              "title"      : title
        }, function(res) {});
    });

    
    JSAPI.on('menu:share:qq', function(argv){
        var newUrl = addUrlOrigin(imgUrl, "7");

        report(link, fakeid, 5);
        JSAPI.invoke('shareQQ',{
              "img_url"    : newUrl,
              "img_width"  : "640",
              "img_height" : "640",
              "link"       : share_scene(link, 23),
              "desc"       : desc,
              "title"      : title
        }, function(res) {});
    });

    
    
    JSAPI.on('menu:share:email', function(argv){
        report(link, fakeid, 5);
        JSAPI.invoke('sendEmail',{
            "content"    : share_scene(link, 5),
            "title"      : title
        }, function(res) {});
    });
    
});
define("biz_wap/utils/mmversion.js",[],function(){
"use strict";
function n(){
var n=/MicroMessenger\/([\d\.]+)/i,t=s.match(n);
return t&&t[1]?t[1]:!1;
}
function t(t,r,i){
var e=n();
if(e){
e=e.split("."),t=t.split("."),e.pop();
for(var o,s,u=f["cp"+r],c=0,a=Math.max(e.length,t.length);a>c;++c){
o=e[c]||0,s=t[c]||0,o=parseInt(o)||0,s=parseInt(s)||0;
var p=f.cp0(o,s);
if(!p)return u(o,s);
}
return i||0==r?!0:!1;
}
}
function r(n){
return t(n,0);
}
function i(n,r){
return t(n,1,r);
}
function e(n,r){
return t(n,-1,r);
}
function o(){
return u?"ios":a?"android":"unknown";
}
var s=navigator.userAgent,u=/(iPhone|iPad|iPod|iOS)/i.test(s),c=/Windows\sPhone/i.test(s),a=/(Android)/i.test(s),f={
"cp-1":function(n,t){
return t>n;
},
cp0:function(n,t){
return n==t;
},
cp1:function(n,t){
return n>t;
}
};
return{
get:n,
cpVersion:t,
eqVersion:r,
gtVersion:i,
ltVersion:e,
getPlatform:o,
isWp:c,
isIOS:u,
isAndroid:a
};
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/");
},String.prototype.https2http=function(){
return this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/");
};
});
