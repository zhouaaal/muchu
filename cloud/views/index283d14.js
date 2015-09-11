define("biz_common/utils/url/parse.js",[],function(){
"use strict";
function r(r){
var n=r.length,e=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?n:t,e=-1==e?t:e;
var s=r.substr(0,e),a=r.substr(e+1,t-e-1),i=r.substr(t+1);
return{
host:s,
query_str:a,
hash:i
};
}
function n(n,e){
var t=r(n),s=t.query_str,a=[];
for(var i in e)e.hasOwnProperty(i)&&a.push(i+"="+encodeURIComponent(e[i]));
return a.length>0&&(s+=(""!=s?"&":"")+a.join("&")),t.host+(""!=s?"?"+s:"")+(""!=t.hash?"#"+t.hash:"");
}
function e(r,n,e,t){
r=r||location.href,-1!=r.indexOf("&")&&-1==r.indexOf("?")&&(r=r.replace("&","?"));
var s=new RegExp("([\\?&]"+n+"=)[^&#]*");
return r.match(s)?t===!0?r.replace(s,"$1"+e):r:-1==r.indexOf("?")?r+"?"+n+"="+e:r+"&"+n+"="+e;
}
return{
parseUrl:r,
join:n,
addParam:e
};
});define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var e=s.match(/MQQBrowser\/(\d+\.\d+)/i),r=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+\.\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/MiuiBrowser\/(\d+\.\d+)/i),d=s.match(/MI-ONE/),h=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),c=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),b=s.match(/(ipod).*\s([\d_]+)/i),u=s.match(/(ipad).*\s([\d_]+)/i),p=s.match(/(iphone)\sos\s([\d_]+)/i),v=s.match(/Chrome\/(\d+\.\d+)/),m=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),f=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var l=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(l=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(l=8),
s.indexOf("Trident/5.0")>-1&&(l=9),s.indexOf("Trident/6.0")>-1&&(l=10),o.browser.ie=!0,
o.browser.version=l;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
f&&(this.os.android=!0,this.os.version=f[2]),b&&(this.os.ios=this.os.ipod=!0,this.os.version=b[2].replace(/_/g,".")),
u&&(this.os.ios=this.os.ipad=!0,this.os.version=u[2].replace(/_/g,".")),p&&(this.os.iphone=this.os.ios=!0,
this.os.version=p[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
h&&(this.os.MIPAD=!0),e&&(this.browser.MQQ=!0,this.browser.version=e[1]),r&&(this.browser.MQQClient=!0,
this.browser.version=r[1]),i&&(this.browser.WeChat=!0,this.browser.version=i[1]),
a&&(this.browser.MIUI=!0,this.browser.version=a[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
c&&(this.browser.IEMobile=!0,this.browser.version=c[2]),m&&(this.browser.AndriodBrowser=!0),
d&&(this.browser.M1=!0),v&&(this.browser.Chrome=!0,this.browser.version=v[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1);
var M={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var g in M)this.os[g]=-1!==s.indexOf(M[g]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,top.window.navigator.userAgent);
var e=function(){
var s=top.window.navigator.userAgent,e=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(e=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&e[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),r=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}();
return o.canSupportVideo=r||e,o.canSupportVideoMp4=r,o.canSupportH5Video=e,o;
});define("appmsg/index.js",["biz_wap/utils/device.js","biz_common/utils/url/parse.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","biz_common/dom/class.js","appmsg/report.js"],function(e){
"use strict";
function t(e,t){
var n={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},o=new Image;
o.onload=function(){
var n=o.width>0&&o.height>0;
t(e,n);
},o.onerror=function(){
t(e,!1);
},o.src="data:image/webp;base64,"+n[e];
}
var n=document.getElementsByTagName("body"),o=e("biz_wap/utils/device.js");
if(!n||!n[0])return!1;
n=n[0],function(){
var e=function(e,t){
t=t||"",t=["uin:"+top.window.user_uin,"resp:"+t].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random();
};
window.__report=e;
Math.random()<.05,top.window.navigator.userAgent,o.os;
}();
var i=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&top.location.href&&i.test(top.location.href)))throw new Error("in iframe");
}catch(s){
var r="",a=new Image;
a.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+r+"&r="+Math.random()).substr(0,1024);
}
window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&location.replace(location.href.replace(/#rd$/,"#wechat_redirect"));
var c=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
var p=e("biz_wap/utils/mmversion.js"),m=!p.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger"),d=-1!=navigator.userAgent.indexOf("WindowsWechat");
if(e("appmsg/share.js"),"mp.weixin.qq.com"==location.host){
var l=e("biz_common/log/jserr.js");
l({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var g=-1!=navigator.userAgent.indexOf("TBS/"),A=function(e,n){
t(e,function(e,t){
if(window.logs.webplog[e]=t?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var o=window.logs.webplog,i=Math.random();
g&&1>=i&&(o.lossy=o.lossless=o.alpha=1,window.logs.webplog=o);
var s=o.lossy&o.lossless&o.alpha;
n(!!s);
}
});
},w=function(e){
A("lossy",e),A("lossless",e),A("alpha",e),A("animation",e);
};
window.webp=!1,w(function(t){
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var n=document.getElementById("js_cover");
if(n){
var o=n.getAttribute("data-src");
if(o){
if(o.isCDN()){
var i=new Date;
for(i.setFullYear(2014,9,1);-1!=o.indexOf("?tp=webp");)o=o.replace("?tp=webp","");
for(;-1!=o.indexOf("&tp=webp");)o=o.replace("&tp=webp","");
1e3*ct>=i.getTime()&&""!=img_format&&"gif"!=img_format&&(o=o.replace(/\/0$/,"/640"),
o=o.replace(/\/0\?/,"/640?"),n.dataset&&(n.dataset.s="300,640")),t&&(o=c.addParam(o,"tp","webp",!0)),
o=c.addParam(o,"wxfrom","5",!0),is_https_res&&(o=o.http2https());
}
n.setAttribute("src",o),window.logs.img.read[o]=!0,window.logs.img.load[o]=!0,n.removeAttribute("data-src");
}
}
var s=e("biz_wap/ui/lazyload_img.js");
new s({
attrKey:"data-src",
lazyloadHeightWhenWifi:function(){
var e,t=1,n=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var o=e.getHours();
return o>=20&&23>o&&(t=.5,n=0),{
bottom:t,
top:n
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t){
if(!t)return"";
for(var n=t;-1!=n.indexOf("?tp=webp");)n=n.replace("?tp=webp","");
for(;-1!=n.indexOf("&tp=webp");)n=n.replace("&tp=webp","");
t.isCDN()&&((e.dataset&&e.dataset.s||-1!=t.indexOf("wx_fmt=")&&-1==t.indexOf("wx_fmt=gif"))&&(n=n.replace(/\/0$/,"/640"),
n=n.replace(/\/0\?/,"/640?")),window.webp&&(n=c.addParam(n,"tp","webp",!0)),n=c.addParam(n,"wxfrom","5",!0),
is_https_res&&(n=n.http2https()));
var o=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
return n=n.replace(o,"http://m.qpic.cn"),n=c.addParam(n,"wx_lazy","1",!0),window.logs.img.load[n]=!0,
n;
},
onerror:function(e){
if(e&&e.isCDN()){
var t=10;
/tp\=webp/.test(e)&&(t=11);
var n=new Image;
n.src="http://mp.weixin.qq.com/mp/jsreport?key="+t+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,n=e.loadList;
window.logs.img.download[t]=n;
}
},
container:document.getElementById("page-content")
});
}),e("appmsg/async.js");
var u=e("appmsg/copyright_report.js"),f=e("biz_common/dom/event.js"),_=e("biz_wap/jsapi/core.js");
!function(){
if(!window.isInWeixinApp()||!window.isWeixinCached&&!__appmsgCgiData.is_wxg_stuff_uin)return!1;
for(var e=[],t=document.getElementsByTagName("link"),n=0;n<t.length;n++)"stylesheet"==t[n].rel&&e.push(t[n].href);
location.href.replace(/\&key\=.*$/g,"#rd");
_.invoke("cache",{
disable:!1,
appId:"wx3be6367203f983ac",
resourceList:e
},function(e){
e&&"cache:ok"==e.err_msg;
});
}(),function(){
var e=document.getElementById("post-user"),t=document.getElementById("copyright_info"),n=[];
e&&n.push({
dom:e,
username:user_name_new||user_name,
scene:"57"
}),t&&source_username&&n.push({
dom:t,
username:source_username,
scene:"84"
});
for(var o=0,i=n.length;i>o;o++)!function(e){
f.on(e.dom,"click",function(){
return _.invoke("profile",{
username:e.username,
scene:e.scene
}),"copyright_info"==e.dom.id&&source_username&&u.card_click_report({
scene:"0"
}),!1;
}),p.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(n[o]);
}(),function(){
location.href.match(/fontScale=\d+/)&&p.isIOS&&_.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
document.getElementsByTagName("html").item(0).style.lineHeight=160/e.fontScale;
});
}();
var h=e("appmsg/outer_link.js");
if(new h({
container:document.getElementById("js_content"),
changeHref:function(e,t){
if(e&&0==e.indexOf("http://mp.weixin.qq.com/s"))e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),
e=e.replace(/[\?&]scene=21/,""),e+="&scene=21#wechat_redirect";else if(0!=e.indexOf("http://mp.weixin.qq.com/mp/redirect"))return"http://"+location.host+"/mp/redirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0";
return e;
}
}),!m){
var v=e("appmsg/review_image.js");
new v({
container:document.getElementById("js_content"),
is_https_res:is_https_res
});
}
e("appmsg/iframe.js"),e("appmsg/qqmusic.js"),e("appmsg/voice.js"),e("appmsg/cdn_speed_report.js"),
e("appmsg/page_pos.js"),function(){
if(d){
var e=document.createElement("link");
e.rel="stylesheet",e.type="text/css",e.async=!0,e.href=windowwx_css;
var t=document.getElementsByTagName("head")[0];
t.appendChild(e);
}
}(),setTimeout(function(){
f.tap(document.getElementById("copyright_logo"),function(){
location.href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
}),e("appmsg/report_and_source.js"),function(){
if(m){
var t=e("biz_common/dom/class.js");
t.addClass(n,"not_in_mm");
var o=document.createElement("link");
o.rel="stylesheet",o.type="text/css",o.async=!0,o.href=not_in_mm_css;
var i=document.getElementsByTagName("head")[0];
i.appendChild(o);
var s=document.getElementById("js_pc_qr_code_img");
if(s){
var r=10000004,a=document.referrer;
0==a.indexOf("http://weixin.sogou.com")?r=10000001:0==a.indexOf("https://wx.qq.com")&&(r=10000003),
s.setAttribute("src","/mp/qrcode?scene="+r+"&size=102&__biz="+biz),document.getElementById("js_pc_qr_code").style.display="block";
var c=new Image;
c.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+r+"&r="+Math.random();
}
var p=document.getElementById("js_profile_qrcode"),d=document.getElementById("js_profile_arrow_wrp"),l=document.getElementById("post-user");
if(p&&l&&d){
var g=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var n=document.getElementById("js_profile_qrcode_img");
n&&n.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz),p.style.display="block";
var o=new Image;
return o.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random(),
d.style.left=l.offsetLeft-p.offsetLeft+l.offsetWidth/2-8+"px",!1;
};
f.on(l,"click",g),f.on(p,"click",g),f.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=l&&t!=p&&(p.style.display="none");
});
}
}else{
var A=document.getElementById("js_report_article2");
!!A&&(A.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var n=t.getBoundingClientRect().height;
window.scrollTo(0,n);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),o=0,i=t.length;i>o;++o)t[o].parentNode.removeChild(t[o]);
u.card_pv_report();
},1e3);
});
