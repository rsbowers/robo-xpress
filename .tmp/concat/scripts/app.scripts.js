"undefined"==typeof jwplayer&&(jwplayer=function(e){if(jwplayer.api)return jwplayer.api.selectPlayer(e)},jwplayer.version="6.7.4071",jwplayer.vid=document.createElement("video"),jwplayer.audio=document.createElement("audio"),jwplayer.source=document.createElement("source"),function(e){function a(b){return function(){return c(b)}}function k(b){return function(){b("Error loading file")}}function f(m,a,c,g){return function(){try{var d=m.responseXML;if(d&&d.firstChild)return c(m)}catch(f){}(d=b.parseXML(m.responseText))&&
d.firstChild?(m=b.extend({},m,{responseXML:d}),c(m)):g&&g(m.responseText?"Invalid XML":a)}}var j=document,d=window,h=navigator,b=e.utils=function(){};b.exists=function(b){switch(typeof b){case "string":return 0<b.length;case "object":return null!==b;case "undefined":return!1}return!0};b.styleDimension=function(b){return b+(0<b.toString().indexOf("%")?"":"px")};b.getAbsolutePath=function(m,a){b.exists(a)||(a=j.location.href);if(b.exists(m)){var d;if(b.exists(m)){d=m.indexOf("://");var g=m.indexOf("?");
    d=0<d&&(0>g||g>d)}else d=void 0;if(d)return m;d=a.substring(0,a.indexOf("://")+3);var g=a.substring(d.length,a.indexOf("/",d.length+1)),c;0===m.indexOf("/")?c=m.split("/"):(c=a.split("?")[0],c=c.substring(d.length+g.length+1,c.lastIndexOf("/")),c=c.split("/").concat(m.split("/")));for(var f=[],n=0;n<c.length;n++)c[n]&&(b.exists(c[n])&&"."!=c[n])&&(".."==c[n]?f.pop():f.push(c[n]));return d+g+"/"+f.join("/")}};b.extend=function(){var m=b.extend.arguments;if(1<m.length){for(var a=1;a<m.length;a++)b.foreach(m[a],
    function(a,g){try{b.exists(g)&&(m[0][a]=g)}catch(d){}});return m[0]}return null};b.log=function(b,a){"undefined"!=typeof console&&"undefined"!=typeof console.log&&(a?console.log(b,a):console.log(b))};var c=b.userAgentMatch=function(b){return null!==h.userAgent.toLowerCase().match(b)};b.isIE=a(/msie/i);b.isFF=a(/firefox/i);b.isChrome=a(/chrome/i);b.isIPod=a(/iP(hone|od)/i);b.isIPad=a(/iPad/i);b.isSafari602=a(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i);b.isSafari=function(){return c(/safari/i)&&
    !c(/chrome/i)&&!c(/chromium/i)&&!c(/android/i)};b.isIOS=function(b){return b?c(RegExp("iP(hone|ad|od).+\\sOS\\s"+b,"i")):c(/iP(hone|ad|od)/i)};b.isAndroid=function(b,a){var d=a?!c(/chrome\/[23456789]/i):!0;return b?d&&c(RegExp("android.*"+b,"i")):d&&c(/android/i)};b.isMobile=function(){return b.isIOS()||b.isAndroid()};b.saveCookie=function(b,a){j.cookie="jwplayer."+b+"\x3d"+a+"; path\x3d/"};b.getCookies=function(){for(var b={},a=j.cookie.split("; "),d=0;d<a.length;d++){var g=a[d].split("\x3d");0==
g[0].indexOf("jwplayer.")&&(b[g[0].substring(9,g[0].length)]=g[1])}return b};b.typeOf=function(b){var a=typeof b;return"object"===a?!b?"null":b instanceof Array?"array":a:a};b.translateEventResponse=function(a,d){var c=b.extend({},d);a==e.events.JWPLAYER_FULLSCREEN&&!c.fullscreen?(c.fullscreen="true"==c.message?!0:!1,delete c.message):"object"==typeof c.data?(c=b.extend(c,c.data),delete c.data):"object"==typeof c.metadata&&b.deepReplaceKeyName(c.metadata,["__dot__","__spc__","__dsh__","__default__"],
    ["."," ","-","default"]);b.foreach(["position","duration","offset"],function(b,a){c[a]&&(c[a]=Math.round(1E3*c[a])/1E3)});return c};b.flashVersion=function(){if(b.isAndroid())return 0;var a=h.plugins,c;try{if("undefined"!==a&&(c=a["Shockwave Flash"]))return parseInt(c.description.replace(/\D+(\d+)\..*/,"$1"))}catch(f){}if("undefined"!=typeof d.ActiveXObject)try{if(c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return parseInt(c.GetVariable("$version").split(" ")[1].split(",")[0])}catch(g){}return 0};
    b.getScriptPath=function(b){for(var a=j.getElementsByTagName("script"),c=0;c<a.length;c++){var g=a[c].src;if(g&&0<=g.indexOf(b))return g.substr(0,g.indexOf(b))}return""};b.deepReplaceKeyName=function(a,c,d){switch(e.utils.typeOf(a)){case "array":for(var g=0;g<a.length;g++)a[g]=e.utils.deepReplaceKeyName(a[g],c,d);break;case "object":b.foreach(a,function(b,g){var f;if(c instanceof Array&&d instanceof Array){if(c.length!=d.length)return;f=c}else f=[c];for(var h=b,j=0;j<f.length;j++)h=h.replace(RegExp(c[j],
        "g"),d[j]);a[h]=e.utils.deepReplaceKeyName(g,c,d);b!=h&&delete a[b]})}return a};var q=b.pluginPathType={ABSOLUTE:0,RELATIVE:1,CDN:2};b.getPluginPathType=function(a){if("string"==typeof a){a=a.split("?")[0];var c=a.indexOf("://");if(0<c)return q.ABSOLUTE;var d=a.indexOf("/");a=b.extension(a);return 0>c&&0>d&&(!a||!isNaN(a))?q.CDN:q.RELATIVE}};b.getPluginName=function(b){return b.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/,"$2")};b.getPluginVersion=function(b){return b.replace(/[^-]*-?([^\.]*).*$/,"$1")};
    b.isYouTube=function(b){return/^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(b)};b.youTubeID=function(b){try{return/v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i.exec(b).slice(1).join("").replace("?","")}catch(a){return""}};b.isRtmp=function(b,a){return 0==b.indexOf("rtmp")||"rtmp"==a};b.foreach=function(a,c){var d,g;for(d in a)"function"==b.typeOf(a.hasOwnProperty)?a.hasOwnProperty(d)&&(g=a[d],c(d,g)):(g=a[d],c(d,g))};b.isHTTPS=function(){return 0==d.location.href.indexOf("https")};b.repo=function(){var a=
        "http://p.jwpcdn.com/"+e.version.split(/\W/).splice(0,2).join("/")+"/";try{b.isHTTPS()&&(a=a.replace("http://","https://ssl."))}catch(c){}return a};b.ajax=function(a,c,h){var g;0<a.indexOf("#")&&(a=a.replace(/#.*$/,""));var j;j=(j=a)&&0<=j.indexOf("://")&&j.split("/")[2]!=d.location.href.split("/")[2]?!0:!1;if(j&&b.exists(d.XDomainRequest))g=new XDomainRequest,g.onload=f(g,a,c,h),g.onerror=k(h,a,g),g.ontimeout=function(){},g.onprogress=function(){},g.timeout=5E3;else if(b.exists(d.XMLHttpRequest)){var e=
        g=new XMLHttpRequest,n=a;g.onreadystatechange=function(){if(4===e.readyState)switch(e.status){case 200:f(e,n,c,h)();break;case 404:h("File not found")}};g.onerror=k(h,a)}else h&&h();try{g.open("GET",a,!0),g.send(null)}catch(q){h&&h(a)}return g};b.parseXML=function(b){try{var a;if(d.DOMParser){a=(new DOMParser).parseFromString(b,"text/xml");try{if("parsererror"==a.childNodes[0].firstChild.nodeName)return}catch(c){}}else a=new ActiveXObject("Microsoft.XMLDOM"),a.async="false",a.loadXML(b);return a}catch(g){}};
    b.filterPlaylist=function(a,c){for(var d=[],g=0;g<a.length;g++){var f=b.extend({},a[g]);f.sources=b.filterSources(f.sources);if(0<f.sources.length){for(var h=0;h<f.sources.length;h++){var n=f.sources[h];n.label||(n.label=h.toString())}d.push(f)}}if(c&&0==d.length)for(g=0;g<a.length;g++)if(f=b.extend({},a[g]),f.sources=b.filterSources(f.sources,!0),0<f.sources.length){for(h=0;h<f.sources.length;h++)n=f.sources[h],n.label||(n.label=h.toString());d.push(f)}return d};b.filterSources=function(a,c){var d,
        g,f=b.extensionmap;if(a){g=[];for(var h=0;h<a.length;h++){var n=a[h].type,j=a[h].file;j&&(j=b.trim(j));n||(n=f.extType(b.extension(j)),a[h].type=n);c?e.embed.flashCanPlay(j,n)&&(d||(d=n),n==d&&g.push(b.extend({},a[h]))):b.canPlayHTML5(n)&&(d||(d=n),n==d&&g.push(b.extend({},a[h])))}}return g};b.canPlayHTML5=function(a){if(b.isAndroid()&&("hls"==a||"m3u"==a||"m3u8"==a))return!1;a=b.extensionmap.types[a];return!!a&&!!e.vid.canPlayType&&e.vid.canPlayType(a)};b.seconds=function(a){a=a.replace(",",".");
        var b=a.split(":"),c=0;"s"==a.substr(-1)?c=Number(a.substr(0,a.length-1)):"m"==a.substr(-1)?c=60*Number(a.substr(0,a.length-1)):"h"==a.substr(-1)?c=3600*Number(a.substr(0,a.length-1)):1<b.length?(c=Number(b[b.length-1]),c+=60*Number(b[b.length-2]),3==b.length&&(c+=3600*Number(b[b.length-3]))):c=Number(a);return c};b.serialize=function(a){return null==a?null:"true"==a.toString().toLowerCase()?!0:"false"==a.toString().toLowerCase()?!1:isNaN(Number(a))||5<a.length||0==a.length?a:Number(a)}}(jwplayer),
    function(e){var a="video/",k=e.foreach,f={mp4:a+"mp4",vorbis:"audio/ogg",ogg:a+"ogg",webm:a+"webm",aac:"audio/mp4",mp3:"audio/mpeg",hls:"application/vnd.apple.mpegurl"},j={mp4:f.mp4,f4v:f.mp4,m4v:f.mp4,mov:f.mp4,m4a:f.aac,f4a:f.aac,aac:f.aac,mp3:f.mp3,ogv:f.ogg,ogg:f.vorbis,oga:f.vorbis,webm:f.webm,m3u8:f.hls,hls:f.hls},a="video",a={flv:a,f4v:a,mov:a,m4a:a,m4v:a,mp4:a,aac:a,f4a:a,mp3:"sound",smil:"rtmp",m3u8:"hls",hls:"hls"},d=e.extensionmap={};k(j,function(a,b){d[a]={html5:b}});k(a,function(a,b){d[a]||
    (d[a]={});d[a].flash=b});d.types=f;d.mimeType=function(a){var b;k(f,function(c,d){!b&&d==a&&(b=c)});return b};d.extType=function(a){return d.mimeType(j[a])}}(jwplayer.utils),function(e){var a=e.loaderstatus={NEW:0,LOADING:1,ERROR:2,COMPLETE:3},k=document;e.scriptloader=function(f){function j(){h=a.ERROR;c.sendEvent(b.ERROR)}function d(){h=a.COMPLETE;c.sendEvent(b.COMPLETE)}var h=a.NEW,b=jwplayer.events,c=new b.eventdispatcher;e.extend(this,c);this.load=function(){var c=e.scriptloader.loaders[f];if(c&&
    (c.getStatus()==a.NEW||c.getStatus()==a.LOADING))c.addEventListener(b.ERROR,j),c.addEventListener(b.COMPLETE,d);else if(e.scriptloader.loaders[f]=this,h==a.NEW){h=a.LOADING;var m=k.createElement("script");m.addEventListener?(m.onload=d,m.onerror=j):m.readyState&&(m.onreadystatechange=function(){("loaded"==m.readyState||"complete"==m.readyState)&&d()});k.getElementsByTagName("head")[0].appendChild(m);m.src=f}};this.getStatus=function(){return h}};e.scriptloader.loaders={}}(jwplayer.utils),function(e){e.trim=
    function(a){return a.replace(/^\s*/,"").replace(/\s*$/,"")};e.pad=function(a,e,f){for(f||(f="0");a.length<e;)a=f+a;return a};e.xmlAttribute=function(a,e){for(var f=0;f<a.attributes.length;f++)if(a.attributes[f].name&&a.attributes[f].name.toLowerCase()==e.toLowerCase())return a.attributes[f].value.toString();return""};e.extension=function(a){if(!a||"rtmp"==a.substr(0,4))return"";a=a.substring(a.lastIndexOf("/")+1,a.length).split("?")[0].split("#")[0];if(-1<a.lastIndexOf("."))return a.substr(a.lastIndexOf(".")+
    1,a.length).toLowerCase()};e.stringToColor=function(a){a=a.replace(/(#|0x)?([0-9A-F]{3,6})$/gi,"$2");3==a.length&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2));return parseInt(a,16)}}(jwplayer.utils),function(e){var a="touchmove",k="touchstart";e.touch=function(f){function j(b){b.type==k?(c=!0,m=h(l.DRAG_START,b)):b.type==a?c&&(p||(d(l.DRAG_START,b,m),p=!0),d(l.DRAG,b)):(c&&(p?d(l.DRAG_END,b):(b.cancelBubble=!0,d(l.TAP,b))),c=p=!1,m=null)}function d(a,b,c){if(q[a]&&(b.preventManipulation&&
    b.preventManipulation(),b.preventDefault&&b.preventDefault(),b=c?c:h(a,b)))q[a](b)}function h(a,c){var d=null;c.touches&&c.touches.length?d=c.touches[0]:c.changedTouches&&c.changedTouches.length&&(d=c.changedTouches[0]);if(!d)return null;var f=b.getBoundingClientRect(),d={type:a,target:b,x:d.pageX-window.pageXOffset-f.left,y:d.pageY,deltaX:0,deltaY:0};a!=l.TAP&&m&&(d.deltaX=d.x-m.x,d.deltaY=d.y-m.y);return d}var b=f,c=!1,q={},m=null,p=!1,l=e.touchEvents;document.addEventListener(a,j);document.addEventListener("touchend",
    function(a){c&&p&&d(l.DRAG_END,a);c=p=!1;m=null});document.addEventListener("touchcancel",j);f.addEventListener(k,j);f.addEventListener("touchend",j);this.addEventListener=function(a,b){q[a]=b};this.removeEventListener=function(a){delete q[a]};return this}}(jwplayer.utils),function(e){e.touchEvents={DRAG:"jwplayerDrag",DRAG_START:"jwplayerDragStart",DRAG_END:"jwplayerDragEnd",TAP:"jwplayerTap"}}(jwplayer.utils),function(e){e.key=function(a){var k,f,j;this.edition=function(){return j&&j.getTime()<
(new Date).getTime()?"invalid":k};this.token=function(){return f};e.exists(a)||(a="");try{a=e.tea.decrypt(a,"36QXq4W@GSBV^teR");var d=a.split("/");(k=d[0])?/^(free|pro|premium|ads)$/i.test(k)?(f=d[1],d[2]&&0<parseInt(d[2])&&(j=new Date,j.setTime(String(d[2])))):k="invalid":k="free"}catch(h){k="invalid"}}}(jwplayer.utils),function(e){var a=e.tea={};a.encrypt=function(j,d){if(0==j.length)return"";var h=a.strToLongs(f.encode(j));1>=h.length&&(h[1]=0);for(var b=a.strToLongs(f.encode(d).slice(0,16)),c=
    h.length,e=h[c-1],m=h[0],p,l=Math.floor(6+52/c),g=0;0<l--;){g+=2654435769;p=g>>>2&3;for(var r=0;r<c;r++)m=h[(r+1)%c],e=(e>>>5^m<<2)+(m>>>3^e<<4)^(g^m)+(b[r&3^p]^e),e=h[r]+=e}h=a.longsToStr(h);return k.encode(h)};a.decrypt=function(j,d){if(0==j.length)return"";for(var h=a.strToLongs(k.decode(j)),b=a.strToLongs(f.encode(d).slice(0,16)),c=h.length,e=h[c-1],m=h[0],p,l=2654435769*Math.floor(6+52/c);0!=l;){p=l>>>2&3;for(var g=c-1;0<=g;g--)e=h[0<g?g-1:c-1],e=(e>>>5^m<<2)+(m>>>3^e<<4)^(l^m)+(b[g&3^p]^e),
    m=h[g]-=e;l-=2654435769}h=a.longsToStr(h);h=h.replace(/\0+$/,"");return f.decode(h)};a.strToLongs=function(a){for(var d=Array(Math.ceil(a.length/4)),f=0;f<d.length;f++)d[f]=a.charCodeAt(4*f)+(a.charCodeAt(4*f+1)<<8)+(a.charCodeAt(4*f+2)<<16)+(a.charCodeAt(4*f+3)<<24);return d};a.longsToStr=function(a){for(var d=Array(a.length),f=0;f<a.length;f++)d[f]=String.fromCharCode(a[f]&255,a[f]>>>8&255,a[f]>>>16&255,a[f]>>>24&255);return d.join("")};var k={code:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d",
    encode:function(a,d){var h,b,c,e,m=[],p="",l,g,r=k.code;g=("undefined"==typeof d?0:d)?f.encode(a):a;l=g.length%3;if(0<l)for(;3>l++;)p+="\x3d",g+="\x00";for(l=0;l<g.length;l+=3)h=g.charCodeAt(l),b=g.charCodeAt(l+1),c=g.charCodeAt(l+2),e=h<<16|b<<8|c,h=e>>18&63,b=e>>12&63,c=e>>6&63,e&=63,m[l/3]=r.charAt(h)+r.charAt(b)+r.charAt(c)+r.charAt(e);m=m.join("");return m=m.slice(0,m.length-p.length)+p},decode:function(a,d){d="undefined"==typeof d?!1:d;var h,b,c,e,m,p=[],l,g=k.code;l=d?f.decode(a):a;for(var r=
        0;r<l.length;r+=4)h=g.indexOf(l.charAt(r)),b=g.indexOf(l.charAt(r+1)),e=g.indexOf(l.charAt(r+2)),m=g.indexOf(l.charAt(r+3)),c=h<<18|b<<12|e<<6|m,h=c>>>16&255,b=c>>>8&255,c&=255,p[r/4]=String.fromCharCode(h,b,c),64==m&&(p[r/4]=String.fromCharCode(h,b)),64==e&&(p[r/4]=String.fromCharCode(h));e=p.join("");return d?f.decode(e):e}},f={encode:function(a){a=a.replace(/[\u0080-\u07ff]/g,function(a){a=a.charCodeAt(0);return String.fromCharCode(192|a>>6,128|a&63)});return a=a.replace(/[\u0800-\uffff]/g,function(a){a=
    a.charCodeAt(0);return String.fromCharCode(224|a>>12,128|a>>6&63,128|a&63)})},decode:function(a){a=a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(a){a=(a.charCodeAt(0)&15)<<12|(a.charCodeAt(1)&63)<<6|a.charCodeAt(2)&63;return String.fromCharCode(a)});return a=a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(a){a=(a.charCodeAt(0)&31)<<6|a.charCodeAt(1)&63;return String.fromCharCode(a)})}}}(jwplayer.utils),function(e){e.events={COMPLETE:"COMPLETE",ERROR:"ERROR",API_READY:"jwplayerAPIReady",
    JWPLAYER_READY:"jwplayerReady",JWPLAYER_FULLSCREEN:"jwplayerFullscreen",JWPLAYER_RESIZE:"jwplayerResize",JWPLAYER_ERROR:"jwplayerError",JWPLAYER_SETUP_ERROR:"jwplayerSetupError",JWPLAYER_MEDIA_BEFOREPLAY:"jwplayerMediaBeforePlay",JWPLAYER_MEDIA_BEFORECOMPLETE:"jwplayerMediaBeforeComplete",JWPLAYER_COMPONENT_SHOW:"jwplayerComponentShow",JWPLAYER_COMPONENT_HIDE:"jwplayerComponentHide",JWPLAYER_MEDIA_BUFFER:"jwplayerMediaBuffer",JWPLAYER_MEDIA_BUFFER_FULL:"jwplayerMediaBufferFull",JWPLAYER_MEDIA_ERROR:"jwplayerMediaError",
    JWPLAYER_MEDIA_LOADED:"jwplayerMediaLoaded",JWPLAYER_MEDIA_COMPLETE:"jwplayerMediaComplete",JWPLAYER_MEDIA_SEEK:"jwplayerMediaSeek",JWPLAYER_MEDIA_TIME:"jwplayerMediaTime",JWPLAYER_MEDIA_VOLUME:"jwplayerMediaVolume",JWPLAYER_MEDIA_META:"jwplayerMediaMeta",JWPLAYER_MEDIA_MUTE:"jwplayerMediaMute",JWPLAYER_MEDIA_LEVELS:"jwplayerMediaLevels",JWPLAYER_MEDIA_LEVEL_CHANGED:"jwplayerMediaLevelChanged",JWPLAYER_CAPTIONS_CHANGED:"jwplayerCaptionsChanged",JWPLAYER_CAPTIONS_LIST:"jwplayerCaptionsList",JWPLAYER_PLAYER_STATE:"jwplayerPlayerState",
    state:{BUFFERING:"BUFFERING",IDLE:"IDLE",PAUSED:"PAUSED",PLAYING:"PLAYING"},JWPLAYER_PLAYLIST_LOADED:"jwplayerPlaylistLoaded",JWPLAYER_PLAYLIST_ITEM:"jwplayerPlaylistItem",JWPLAYER_PLAYLIST_COMPLETE:"jwplayerPlaylistComplete",JWPLAYER_DISPLAY_CLICK:"jwplayerViewClick",JWPLAYER_CONTROLS:"jwplayerViewControls",JWPLAYER_USER_ACTION:"jwplayerUserAction",JWPLAYER_INSTREAM_CLICK:"jwplayerInstreamClicked",JWPLAYER_INSTREAM_DESTROYED:"jwplayerInstreamDestroyed",JWPLAYER_AD_TIME:"jwplayerAdTime",JWPLAYER_AD_ERROR:"jwplayerAdError",
    JWPLAYER_AD_CLICK:"jwplayerAdClicked",JWPLAYER_AD_COMPLETE:"jwplayerAdComplete",JWPLAYER_AD_IMPRESSION:"jwplayerAdImpression",JWPLAYER_AD_COMPANIONS:"jwplayerAdCompanions",JWPLAYER_AD_SKIPPED:"jwplayerAdSkipped"}}(jwplayer),function(e){var a=jwplayer.utils;e.eventdispatcher=function(e,f){var j,d;this.resetEventListeners=function(){j={};d=[]};this.resetEventListeners();this.addEventListener=function(d,b,c){try{a.exists(j[d])||(j[d]=[]),"string"==a.typeOf(b)&&(b=(new Function("return "+b))()),j[d].push({listener:b,
    count:c})}catch(f){a.log("error",f)}return!1};this.removeEventListener=function(d,b){if(j[d]){try{for(var c=0;c<j[d].length;c++)if(j[d][c].listener.toString()==b.toString()){j[d].splice(c,1);break}}catch(f){a.log("error",f)}return!1}};this.addGlobalListener=function(f,b){try{"string"==a.typeOf(f)&&(f=(new Function("return "+f))()),d.push({listener:f,count:b})}catch(c){a.log("error",c)}return!1};this.removeGlobalListener=function(f){if(f){try{for(var b=0;b<d.length;b++)if(d[b].listener.toString()==
    f.toString()){d.splice(b,1);break}}catch(c){a.log("error",c)}return!1}};this.sendEvent=function(h,b){a.exists(b)||(b={});a.extend(b,{id:e,version:jwplayer.version,type:h});f&&a.log(h,b);if("undefined"!=a.typeOf(j[h]))for(var c=0;c<j[h].length;c++){try{j[h][c].listener(b)}catch(q){a.log("There was an error while handling a listener: "+q.toString(),j[h][c].listener)}j[h][c]&&(1===j[h][c].count?delete j[h][c]:0<j[h][c].count&&(j[h][c].count-=1))}for(c=0;c<d.length;c++){try{d[c].listener(b)}catch(m){a.log("There was an error while handling a listener: "+
    m.toString(),d[c].listener)}d[c]&&(1===d[c].count?delete d[c]:0<d[c].count&&(d[c].count-=1))}}}}(jwplayer.events),function(e){var a={},k={};e.plugins=function(){};e.plugins.loadPlugins=function(f,j){k[f]=new e.plugins.pluginloader(new e.plugins.model(a),j);return k[f]};e.plugins.registerPlugin=function(f,j,d,h){var b=e.utils.getPluginName(f);a[b]||(a[b]=new e.plugins.plugin(f));a[b].registerPlugin(f,j,d,h)}}(jwplayer),function(e){e.plugins.model=function(a){this.addPlugin=function(k){var f=e.utils.getPluginName(k);
    a[f]||(a[f]=new e.plugins.plugin(k));return a[f]};this.getPlugins=function(){return a}}}(jwplayer),function(e){var a=jwplayer.utils,k=jwplayer.events;e.pluginmodes={FLASH:0,JAVASCRIPT:1,HYBRID:2};e.plugin=function(f){function j(){switch(a.getPluginPathType(f)){case a.pluginPathType.ABSOLUTE:return f;case a.pluginPathType.RELATIVE:return a.getAbsolutePath(f,window.location.href)}}function d(){p=setTimeout(function(){b=a.loaderstatus.COMPLETE;l.sendEvent(k.COMPLETE)},1E3)}function h(){b=a.loaderstatus.ERROR;
    l.sendEvent(k.ERROR)}var b=a.loaderstatus.NEW,c,q,m,p,l=new k.eventdispatcher;a.extend(this,l);this.load=function(){if(b==a.loaderstatus.NEW)if(0<f.lastIndexOf(".swf"))c=f,b=a.loaderstatus.COMPLETE,l.sendEvent(k.COMPLETE);else if(a.getPluginPathType(f)==a.pluginPathType.CDN)b=a.loaderstatus.COMPLETE,l.sendEvent(k.COMPLETE);else{b=a.loaderstatus.LOADING;var g=new a.scriptloader(j());g.addEventListener(k.COMPLETE,d);g.addEventListener(k.ERROR,h);g.load()}};this.registerPlugin=function(d,f,e,n){p&&(clearTimeout(p),
    p=void 0);m=f;e&&n?(c=n,q=e):"string"==typeof e?c=e:"function"==typeof e?q=e:!e&&!n&&(c=d);b=a.loaderstatus.COMPLETE;l.sendEvent(k.COMPLETE)};this.getStatus=function(){return b};this.getPluginName=function(){return a.getPluginName(f)};this.getFlashPath=function(){if(c)switch(a.getPluginPathType(c)){case a.pluginPathType.ABSOLUTE:return c;case a.pluginPathType.RELATIVE:return 0<f.lastIndexOf(".swf")?a.getAbsolutePath(c,window.location.href):a.getAbsolutePath(c,j())}return null};this.getJS=function(){return q};
    this.getTarget=function(){return m};this.getPluginmode=function(){if("undefined"!=typeof c&&"undefined"!=typeof q)return e.pluginmodes.HYBRID;if("undefined"!=typeof c)return e.pluginmodes.FLASH;if("undefined"!=typeof q)return e.pluginmodes.JAVASCRIPT};this.getNewInstance=function(a,b,c){return new q(a,b,c)};this.getURL=function(){return f}}}(jwplayer.plugins),function(e){var a=e.utils,k=e.events,f=a.foreach;e.plugins.pluginloader=function(j,d){function h(){m?g.sendEvent(k.ERROR,{message:p}):q||(q=
    !0,c=a.loaderstatus.COMPLETE,g.sendEvent(k.COMPLETE))}function b(){l||h();if(!q&&!m){var b=0,c=j.getPlugins();a.foreach(l,function(d){d=a.getPluginName(d);var f=c[d];d=f.getJS();var g=f.getTarget(),f=f.getStatus();if(f==a.loaderstatus.LOADING||f==a.loaderstatus.NEW)b++;else if(d&&(!g||parseFloat(g)>parseFloat(e.version)))m=!0,p="Incompatible player version",h()});0==b&&h()}}var c=a.loaderstatus.NEW,q=!1,m=!1,p,l=d,g=new k.eventdispatcher;a.extend(this,g);this.setupPlugins=function(b,c,d){var g={length:0,
    plugins:{}},e=0,h={},m=j.getPlugins();f(c.plugins,function(f,j){var k=a.getPluginName(f),l=m[k],q=l.getFlashPath(),r=l.getJS(),p=l.getURL();q&&(g.plugins[q]=a.extend({},j),g.plugins[q].pluginmode=l.getPluginmode(),g.length++);try{if(r&&c.plugins&&c.plugins[p]){var A=document.createElement("div");A.id=b.id+"_"+k;A.style.position="absolute";A.style.top=0;A.style.zIndex=e+10;h[k]=l.getNewInstance(b,a.extend({},c.plugins[p]),A);e++;b.onReady(d(h[k],A,!0));b.onResize(d(h[k],A))}}catch(F){a.log("ERROR: Failed to load "+
    k+".")}});b.plugins=h;return g};this.load=function(){if(!(a.exists(d)&&"object"!=a.typeOf(d))){c=a.loaderstatus.LOADING;f(d,function(c){a.exists(c)&&(c=j.addPlugin(c),c.addEventListener(k.COMPLETE,b),c.addEventListener(k.ERROR,r))});var g=j.getPlugins();f(g,function(a,b){b.load()})}b()};var r=this.pluginFailed=function(){m||(m=!0,p="File not found",h())};this.getStatus=function(){return c}}}(jwplayer),function(){jwplayer.parsers={localName:function(e){return e?e.localName?e.localName:e.baseName?e.baseName:
    "":""},textContent:function(e){return e?e.textContent?jwplayer.utils.trim(e.textContent):e.text?jwplayer.utils.trim(e.text):"":""},getChildNode:function(e,a){return e.childNodes[a]},numChildren:function(e){return e.childNodes?e.childNodes.length:0}}}(jwplayer),function(e){var a=e.parsers;(a.jwparser=function(){}).parseEntry=function(k,f){for(var j=[],d=[],h=e.utils.xmlAttribute,b=0;b<k.childNodes.length;b++){var c=k.childNodes[b];if("jwplayer"==c.prefix){var q=a.localName(c);"source"==q?(delete f.sources,
    j.push({file:h(c,"file"),"default":h(c,"default"),label:h(c,"label"),type:h(c,"type")})):"track"==q?(delete f.tracks,d.push({file:h(c,"file"),"default":h(c,"default"),kind:h(c,"kind"),label:h(c,"label")})):(f[q]=e.utils.serialize(a.textContent(c)),"file"==q&&f.sources&&delete f.sources)}f.file||(f.file=f.link)}if(j.length){f.sources=[];for(b=0;b<j.length;b++)0<j[b].file.length&&(j[b]["default"]="true"==j[b]["default"]?!0:!1,j[b].label.length||delete j[b].label,f.sources.push(j[b]))}if(d.length){f.tracks=
    [];for(b=0;b<d.length;b++)0<d[b].file.length&&(d[b]["default"]="true"==d[b]["default"]?!0:!1,d[b].kind=!d[b].kind.length?"captions":d[b].kind,d[b].label.length||delete d[b].label,f.tracks.push(d[b]))}return f}}(jwplayer),function(e){var a=jwplayer.utils,k=a.xmlAttribute,f=e.localName,j=e.textContent,d=e.numChildren,h=e.mediaparser=function(){};h.parseGroup=function(b,c){var e,m,p=[];for(m=0;m<d(b);m++)if(e=b.childNodes[m],"media"==e.prefix&&f(e))switch(f(e).toLowerCase()){case "content":k(e,"duration")&&
(c.duration=a.seconds(k(e,"duration")));0<d(e)&&(c=h.parseGroup(e,c));k(e,"url")&&(c.sources||(c.sources=[]),c.sources.push({file:k(e,"url"),type:k(e,"type"),width:k(e,"width"),label:k(e,"label")}));break;case "title":c.title=j(e);break;case "description":c.description=j(e);break;case "guid":c.mediaid=j(e);break;case "thumbnail":c.image||(c.image=k(e,"url"));break;case "group":h.parseGroup(e,c);break;case "subtitle":var l={};l.file=k(e,"url");l.kind="captions";if(0<k(e,"lang").length){var g=l;e=k(e,
    "lang");var r={zh:"Chinese",nl:"Dutch",en:"English",fr:"French",de:"German",it:"Italian",ja:"Japanese",pt:"Portuguese",ru:"Russian",es:"Spanish"};e=r[e]?r[e]:e;g.label=e}p.push(l)}c.hasOwnProperty("tracks")||(c.tracks=[]);for(m=0;m<p.length;m++)c.tracks.push(p[m]);return c}}(jwplayer.parsers),function(e){function a(a){for(var c={},d=0;d<a.childNodes.length;d++){var j=a.childNodes[d],p=h(j);if(p)switch(p.toLowerCase()){case "enclosure":c.file=k.xmlAttribute(j,"url");break;case "title":c.title=f(j);
    break;case "guid":c.mediaid=f(j);break;case "pubdate":c.date=f(j);break;case "description":c.description=f(j);break;case "link":c.link=f(j);break;case "category":c.tags=c.tags?c.tags+f(j):f(j)}}c=e.mediaparser.parseGroup(a,c);c=e.jwparser.parseEntry(a,c);return new jwplayer.playlist.item(c)}var k=jwplayer.utils,f=e.textContent,j=e.getChildNode,d=e.numChildren,h=e.localName;e.rssparser={};e.rssparser.parse=function(b){for(var c=[],f=0;f<d(b);f++){var e=j(b,f);if("channel"==h(e).toLowerCase())for(var k=
    0;k<d(e);k++){var l=j(e,k);"item"==h(l).toLowerCase()&&c.push(a(l))}}return c}}(jwplayer.parsers),function(e){e.playlist=function(a){var k=[];if("array"==e.utils.typeOf(a))for(var f=0;f<a.length;f++)k.push(new e.playlist.item(a[f]));else k.push(new e.playlist.item(a));return k}}(jwplayer),function(e){var a=e.item=function(k){var f=jwplayer.utils,j=f.extend({},a.defaults,k);j.tracks=k&&f.exists(k.tracks)?k.tracks:[];0==j.sources.length&&(j.sources=[new e.source(j)]);for(var d=0;d<j.sources.length;d++){var h=
    j.sources[d]["default"];j.sources[d]["default"]=h?"true"==h.toString():!1;j.sources[d]=new e.source(j.sources[d])}if(j.captions&&!f.exists(k.tracks)){for(k=0;k<j.captions.length;k++)j.tracks.push(j.captions[k]);delete j.captions}for(d=0;d<j.tracks.length;d++)j.tracks[d]=new e.track(j.tracks[d]);return j};a.defaults={description:"",image:"",mediaid:"",title:"",sources:[],tracks:[]}}(jwplayer.playlist),function(e){var a=jwplayer,k=a.utils,f=a.events,j=a.parsers;e.loader=function(){function a(d){try{var h=
    d.responseXML.childNodes;d="";for(var k=0;k<h.length&&!(d=h[k],8!=d.nodeType);k++);"xml"==j.localName(d)&&(d=d.nextSibling);if("rss"!=j.localName(d))b("Not a valid RSS feed");else{var l=new e(j.rssparser.parse(d));c.sendEvent(f.JWPLAYER_PLAYLIST_LOADED,{playlist:l})}}catch(g){b()}}function h(a){b(a.match(/invalid/i)?"Not a valid RSS feed":"")}function b(a){c.sendEvent(f.JWPLAYER_ERROR,{message:a?a:"Error loading file"})}var c=new f.eventdispatcher;k.extend(this,c);this.load=function(b){k.ajax(b,a,
    h)}}}(jwplayer.playlist),function(e){var a=jwplayer.utils,k={file:void 0,label:void 0,type:void 0,"default":void 0};e.source=function(f){var e=a.extend({},k);a.foreach(k,function(d){a.exists(f[d])&&(e[d]=f[d],delete f[d])});e.type&&0<e.type.indexOf("/")&&(e.type=a.extensionmap.mimeType(e.type));"m3u8"==e.type&&(e.type="hls");"smil"==e.type&&(e.type="rtmp");return e}}(jwplayer.playlist),function(e){var a=jwplayer.utils,k={file:void 0,label:void 0,kind:"captions","default":!1};e.track=function(f){var e=
    a.extend({},k);f||(f={});a.foreach(k,function(d){a.exists(f[d])&&(e[d]=f[d],delete f[d])});return e}}(jwplayer.playlist),function(e){function a(a,b,d){var f=a.style;f.backgroundColor="#000";f.color="#FFF";f.width=k.styleDimension(d.width);f.height=k.styleDimension(d.height);f.display="table";f.opacity=1;d=document.createElement("p");f=d.style;f.verticalAlign="middle";f.textAlign="center";f.display="table-cell";f.font="15px/20px Arial, Helvetica, sans-serif";d.innerHTML=b.replace(":",":\x3cbr\x3e");
    a.innerHTML="";a.appendChild(d)}var k=e.utils,f=e.events,j=!0,d=!1,h=document,b=e.embed=function(c){function q(a,b){k.foreach(b,function(b,c){"function"==typeof a[b]&&a[b].call(a,c)})}function m(){if(!D)if("array"==k.typeOf(n.playlist)&&2>n.playlist.length&&(0==n.playlist.length||!n.playlist[0].sources||0==n.playlist[0].sources.length))g();else if(!C)if("string"==k.typeOf(n.playlist)){var a=new e.playlist.loader;a.addEventListener(f.JWPLAYER_PLAYLIST_LOADED,function(a){n.playlist=a.playlist;C=d;m()});
    a.addEventListener(f.JWPLAYER_ERROR,function(a){C=d;g(a)});C=j;a.load(n.playlist)}else if(w.getStatus()==k.loaderstatus.COMPLETE){for(a=0;a<n.modes.length;a++)if(n.modes[a].type&&b[n.modes[a].type]){var h=k.extend({},n),l=new b[n.modes[a].type](v,n.modes[a],h,w,c);if(l.supportsConfig())return l.addEventListener(f.ERROR,p),l.embed(),q(c,h.events),c}if(n.fallback){var u="No suitable players found and fallback enabled";E=setTimeout(function(){r(u,j)},10);k.log(u);new b.download(v,n,g)}else u="No suitable players found and fallback disabled",
    r(u,d),k.log(u),v.parentNode.replaceChild(x,v)}}function p(a){u(B+a.message)}function l(a){u("Could not load plugins: "+a.message)}function g(a){a&&a.message?u("Error loading playlist: "+a.message):u(B+"No playable sources found")}function r(a,b){E&&(clearTimeout(E),E=null);c.dispatchEvent(f.JWPLAYER_SETUP_ERROR,{message:a,fallback:b})}function u(b){D||(n.fallback?(D=j,a(v,b,n),r(b,j)):r(b,d))}var n=new b.config(c.config),v,t,x,y=n.width,z=n.height,B="Error loading player: ",w=e.plugins.loadPlugins(c.id,
    n.plugins),C=d,D=d,E=null;n.fallbackDiv&&(x=n.fallbackDiv,delete n.fallbackDiv);n.id=c.id;t=h.getElementById(c.id);n.aspectratio?c.config.aspectratio=n.aspectratio:delete c.config.aspectratio;v=h.createElement("div");v.id=t.id;v.style.width=0<y.toString().indexOf("%")?y:y+"px";v.style.height=0<z.toString().indexOf("%")?z:z+"px";t.parentNode.replaceChild(v,t);this.embed=function(){D||(w.addEventListener(f.COMPLETE,m),w.addEventListener(f.ERROR,l),w.load())};this.errorScreen=u;return this};e.embed.errorScreen=
    a}(jwplayer),function(e){function a(a){if(a.playlist)for(var e=0;e<a.playlist.length;e++)a.playlist[e]=new j(a.playlist[e]);else{var b={};f.foreach(j.defaults,function(c){k(a,b,c)});b.sources||(a.levels?(b.sources=a.levels,delete a.levels):(e={},k(a,e,"file"),k(a,e,"type"),b.sources=e.file?[e]:[]));a.playlist=[new j(b)]}}function k(a,e,b){f.exists(a[b])&&(e[b]=a[b],delete a[b])}var f=e.utils,j=e.playlist.item;(e.embed.config=function(d){var h={fallback:!0,height:270,primary:"html5",width:480,base:d.base?
    d.base:f.getScriptPath("jwplayer.js"),aspectratio:""};d=f.extend(h,e.defaults,d);var h={type:"html5",src:d.base+"jwplayer.html5.js"},b={type:"flash",src:d.base+"jwplayer.flash.swf"};d.modes="flash"==d.primary?[b,h]:[h,b];d.listbar&&(d.playlistsize=d.listbar.size,d.playlistposition=d.listbar.position,d.playlistlayout=d.listbar.layout);d.flashplayer&&(b.src=d.flashplayer);d.html5player&&(h.src=d.html5player);a(d);b=d.aspectratio;if("string"!=typeof b||!f.exists(b))h=0;else{var c=b.indexOf(":");-1==
c?h=0:(h=parseFloat(b.substr(0,c)),b=parseFloat(b.substr(c+1)),h=0>=h||0>=b?0:100*(b/h)+"%")}-1==d.width.toString().indexOf("%")?delete d.aspectratio:h?d.aspectratio=h:delete d.aspectratio;return d}).addConfig=function(d,e){a(e);return f.extend(d,e)}}(jwplayer),function(e){var a=e.utils,k=document;e.embed.download=function(f,e,d){function h(b,c){for(var d=k.querySelectorAll(b),f=0;f<d.length;f++)a.foreach(c,function(a,b){d[f].style[a]=b})}function b(a,b,c){a=k.createElement(a);b&&(a.className="jwdownload"+
    b);c&&c.appendChild(a);return a}var c=a.extend({},e),q=c.width?c.width:480,m=c.height?c.height:320,p;e=e.logo?e.logo:{prefix:a.repo(),file:"logo.png",margin:10};var l,g,r,c=c.playlist,u,n=["mp4","aac","mp3"];if(c&&c.length){u=c[0];p=u.sources;for(c=0;c<p.length;c++){var v=p[c],t=v.type?v.type:a.extensionmap.extType(a.extension(v.file));v.file&&a.foreach(n,function(b){t==n[b]?(l=v.file,g=u.image):a.isYouTube(v.file)&&(r=v.file)})}l?(p=l,d=g,f&&(c=b("a","display",f),b("div","icon",c),b("div","logo",
    c),p&&c.setAttribute("href",a.getAbsolutePath(p))),c="#"+f.id+" .jwdownload",f.style.width="",f.style.height="",h(c+"display",{width:a.styleDimension(Math.max(320,q)),height:a.styleDimension(Math.max(180,m)),background:"black center no-repeat "+(d?"url("+d+")":""),backgroundSize:"contain",position:"relative",border:"none",display:"block"}),h(c+"display div",{position:"absolute",width:"100%",height:"100%"}),h(c+"logo",{top:e.margin+"px",right:e.margin+"px",background:"top right no-repeat url("+e.prefix+
e.file+")"}),h(c+"icon",{background:"center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)"})):
    r?(e=r,f=b("embed","",f),f.src="http://www.youtube.com/v/"+a.youTubeID(e),f.type="application/x-shockwave-flash",f.width=q,f.height=m):d()}}}(jwplayer),function(e){var a=e.utils,k=e.events,f={};(e.embed.flash=function(d,h,b,c,q){function m(a,b,c){var d=document.createElement("param");d.setAttribute("name",b);d.setAttribute("value",c);a.appendChild(d)}function p(a,b,c){return function(){try{c&&document.getElementById(q.id+"_wrapper").appendChild(b);var d=document.getElementById(q.id).getPluginConfig("display");
    "function"==typeof a.resize&&a.resize(d.width,d.height);b.style.left=d.x;b.style.top=d.h}catch(f){}}}function l(b){if(!b)return{};var c={},d=[];a.foreach(b,function(b,f){var e=a.getPluginName(b);d.push(b);a.foreach(f,function(a,b){c[e+"."+a]=b})});c.plugins=d.join(",");return c}var g=new e.events.eventdispatcher,r=a.flashVersion();a.extend(this,g);this.embed=function(){b.id=q.id;if(10>r)return g.sendEvent(k.ERROR,{message:"Flash version must be 10.0 or greater"}),!1;var e,n,j=q.config.listbar,t=a.extend({},
    b);if(d.id+"_wrapper"==d.parentNode.id)e=document.getElementById(d.id+"_wrapper");else{e=document.createElement("div");n=document.createElement("div");n.style.display="none";n.id=d.id+"_aspect";e.id=d.id+"_wrapper";e.style.position="relative";e.style.display="block";e.style.width=a.styleDimension(t.width);e.style.height=a.styleDimension(t.height);if(q.config.aspectratio){var x=parseFloat(q.config.aspectratio);n.style.display="block";n.style.marginTop=q.config.aspectratio;e.style.height="auto";e.style.display=
    "inline-block";j&&("bottom"==j.position?n.style.paddingBottom=j.size+"px":"right"==j.position&&(n.style.marginBottom=-1*j.size*(x/100)+"px"))}d.parentNode.replaceChild(e,d);e.appendChild(d);e.appendChild(n)}e=c.setupPlugins(q,t,p);0<e.length?a.extend(t,l(e.plugins)):delete t.plugins;"undefined"!=typeof t["dock.position"]&&"false"==t["dock.position"].toString().toLowerCase()&&(t.dock=t["dock.position"],delete t["dock.position"]);e=t.wmode?t.wmode:t.height&&40>=t.height?"transparent":"opaque";n="height width modes events primary base fallback volume".split(" ");
    for(j=0;j<n.length;j++)delete t[n[j]];n=a.getCookies();a.foreach(n,function(a,b){"undefined"==typeof t[a]&&(t[a]=b)});n=window.location.href.split("/");n.splice(n.length-1,1);n=n.join("/");t.base=n+"/";f[d.id]=t;a.isIE()?(n='\x3cobject classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width\x3d"100%" height\x3d"100%"id\x3d"'+d.id+'" name\x3d"'+d.id+'" tabindex\x3d0""\x3e',n+='\x3cparam name\x3d"movie" value\x3d"'+h.src+'"\x3e',n+='\x3cparam name\x3d"allowfullscreen" value\x3d"true"\x3e\x3cparam name\x3d"allowscriptaccess" value\x3d"always"\x3e',
        n+='\x3cparam name\x3d"seamlesstabbing" value\x3d"true"\x3e',n+='\x3cparam name\x3d"wmode" value\x3d"'+e+'"\x3e',n+='\x3cparam name\x3d"bgcolor" value\x3d"#000000"\x3e',n+="\x3c/object\x3e",d.outerHTML=n,e=document.getElementById(d.id)):(n=document.createElement("object"),n.setAttribute("type","application/x-shockwave-flash"),n.setAttribute("data",h.src),n.setAttribute("width","100%"),n.setAttribute("height","100%"),n.setAttribute("bgcolor","#000000"),n.setAttribute("id",d.id),n.setAttribute("name",
        d.id),n.setAttribute("tabindex",0),m(n,"allowfullscreen","true"),m(n,"allowscriptaccess","always"),m(n,"seamlesstabbing","true"),m(n,"wmode",e),d.parentNode.replaceChild(n,d),e=n);q.config.aspectratio&&(e.style.position="absolute");q.container=e;q.setPlayer(e,"flash")};this.supportsConfig=function(){if(r)if(b){if("string"==a.typeOf(b.playlist))return!0;try{var c=b.playlist[0].sources;if("undefined"==typeof c)return!0;for(var d=0;d<c.length;d++)if(c[d].file&&j(c[d].file,c[d].type))return!0}catch(e){}}else return!0;
    return!1}}).getVars=function(a){return f[a]};var j=e.embed.flashCanPlay=function(d,e){if(a.isYouTube(d)||a.isRtmp(d,e)||"hls"==e)return!0;var b=a.extensionmap[e?e:a.extension(d)];return!b?!1:!!b.flash}}(jwplayer),function(e){var a=e.utils,k=a.extensionmap,f=e.events;e.embed.html5=function(j,d,h,b,c){function q(a,b,c){return function(){try{var d=document.querySelector("#"+j.id+" .jwmain");c&&d.appendChild(b);"function"==typeof a.resize&&(a.resize(d.clientWidth,d.clientHeight),setTimeout(function(){a.resize(d.clientWidth,
    d.clientHeight)},400));b.left=d.style.left;b.top=d.style.top}catch(e){}}}function m(a){p.sendEvent(a.type,{message:"HTML5 player not found"})}var p=this,l=new f.eventdispatcher;a.extend(p,l);p.embed=function(){if(e.html5){b.setupPlugins(c,h,q);j.innerHTML="";var g=e.utils.extend({},h);delete g.volume;g=new e.html5.player(g);c.container=document.getElementById(c.id);c.setPlayer(g,"html5")}else g=new a.scriptloader(d.src),g.addEventListener(f.ERROR,m),g.addEventListener(f.COMPLETE,p.embed),g.load()};
    p.supportsConfig=function(){if(e.vid.canPlayType)try{if("string"==a.typeOf(h.playlist))return!0;for(var b=h.playlist[0].sources,c=0;c<b.length;c++){var d;var f=b[c].file,j=b[c].type;if(null!==navigator.userAgent.match(/BlackBerry/i)||a.isAndroid()&&("m3u"==a.extension(f)||"m3u8"==a.extension(f))||a.isRtmp(f,j))d=!1;else{var l=k[j?j:a.extension(f)],m;if(!l||l.flash&&!l.html5)m=!1;else{var q=l.html5,p=e.vid;if(q)try{m=p.canPlayType(q)?!0:!1}catch(B){m=!1}else m=!0}d=m}if(d)return!0}}catch(w){}return!1}}}(jwplayer),
    function(e){var a=e.embed,k=e.utils;e.embed=k.extend(function(f){function j(){n="Adobe SiteCatalyst Error: Could not find Media Module"}var d=k.repo(),h=k.extend({},e.defaults),b=k.extend({},h,f.config),c=f.config,q=b.plugins,m=b.analytics,p=d+"jwpsrv.js",l=d+"sharing.js",g=d+"related.js",r=d+"gapro.js",h=e.key?e.key:h.key,u=(new e.utils.key(h)).edition(),n,q=q?q:{};"ads"==u&&b.advertising&&(b.advertising.client.match(".js$|.swf$")?q[b.advertising.client]=b.advertising:q[d+b.advertising.client+".js"]=
        b.advertising);delete c.advertising;c.key=h;b.analytics&&(b.analytics.client&&b.analytics.client.match(".js$|.swf$"))&&(p=b.analytics.client);delete c.analytics;m&&"ads"!=u&&delete m.enabled;if("free"==u||!m||!1!==m.enabled)q[p]=m?m:{};delete q.sharing;delete q.related;switch(u){case "ads":if(c.sitecatalyst)try{null!=s&&s.hasOwnProperty("Media")?new e.embed.sitecatalyst(f):j()}catch(v){j()}case "premium":b.related&&(b.related.client&&b.related.client.match(".js$|.swf$")&&(g=b.related.client),q[g]=
        b.related),b.ga&&(b.ga.client&&b.ga.client.match(".js$|.swf$")&&(r=b.ga.client),q[r]=b.ga);case "pro":b.sharing&&(b.sharing.client&&b.sharing.client.match(".js$|.swf$")&&(l=b.sharing.client),q[l]=b.sharing),b.skin&&(c.skin=b.skin.replace(/^(beelden|bekle|five|glow|modieus|roundster|stormtrooper|vapor)$/i,k.repo()+"skins/$1.xml"))}c.plugins=q;f.config=c;f=new a(f);n&&f.errorScreen(n);return f},e.embed)}(jwplayer),function(e){var a=jwplayer.utils;e.sitecatalyst=function(e){function f(b){c.debug&&a.log(b)}
    function j(a){a=a.split("/");a=a[a.length-1];a=a.split("?");return a[0]}function d(){if(!g){g=!0;var a=b.getPosition();f("stop: "+m+" : "+a);s.Media.stop(m,a)}}function h(){r||(d(),r=!0,f("close: "+m),s.Media.close(m),u=!0,l=0)}var b=e,c=a.extend({},b.config.sitecatalyst),q={onPlay:function(){if(!u){var a=b.getPosition();g=!1;f("play: "+m+" : "+a);s.Media.play(m,a)}},onPause:d,onBuffer:d,onIdle:h,onPlaylistItem:function(d){try{u=!0;h();l=0;var e;if(c.mediaName)e=c.mediaName;else{var f=b.getPlaylistItem(d.index);
        e=f.title?f.title:f.file?j(f.file):f.sources&&f.sources.length?j(f.sources[0].file):""}m=e;p=c.playerName?c.playerName:b.id}catch(g){a.log(g)}},onTime:function(){if(u){var a=b.getDuration();if(-1==a)return;r=g=u=!1;f("open: "+m+" : "+a+" : "+p);s.Media.open(m,a,p);f("play: "+m+" : 0");s.Media.play(m,0)}a=b.getPosition();if(3<=Math.abs(a-l)){var c=l;f("seek: "+c+" to "+a);f("stop: "+m+" : "+c);s.Media.stop(m,c);f("play: "+m+" : "+a);s.Media.play(m,a)}l=a},onComplete:h},m,p,l,g=!0,r=!0,u;a.foreach(q,
        function(a){b[a](q[a])})}}(jwplayer.embed),function(e){var a=[],k=e.utils,f=e.events,j=f.state,d=document,h=e.api=function(a){function c(a,b){return function(c){return b(a,c)}}function q(a,b){u[a]||(u[a]=[],p(f.JWPLAYER_PLAYER_STATE,function(b){var c=b.newstate;b=b.oldstate;if(c==a){var d=u[c];if(d)for(var e=0;e<d.length;e++)"function"==typeof d[e]&&d[e].call(this,{oldstate:b,newstate:c})}}));u[a].push(b);return g}function m(a,b){try{a.jwAddEventListener(b,'function(dat) { jwplayer("'+g.id+'").dispatchEvent("'+
    b+'", dat); }')}catch(c){k.log("Could not add internal listener")}}function p(a,b){r[a]||(r[a]=[],n&&v&&m(n,a));r[a].push(b);return g}function l(){if(v){for(var a=arguments[0],b=[],c=1;c<arguments.length;c++)b.push(arguments[c]);if("undefined"!=typeof n&&"function"==typeof n[a])switch(b.length){case 5:return n[a](b[0],b[1],b[2],b[3],b[4]);case 4:return n[a](b[0],b[1],b[2],b[3]);case 3:return n[a](b[0],b[1],b[2]);case 2:return n[a](b[0],b[1]);case 1:return n[a](b[0]);default:return n[a]()}return null}t.push(arguments)}
    var g=this,r={},u={},n=void 0,v=!1,t=[],x=void 0,y={},z={};g.container=a;g.id=a.id;g.getBuffer=function(){return l("jwGetBuffer")};g.getContainer=function(){return g.container};g.addButton=function(a,b,c,d){try{z[d]=c,l("jwDockAddButton",a,b,"jwplayer('"+g.id+"').callback('"+d+"')",d)}catch(e){k.log("Could not add dock button"+e.message)}};g.removeButton=function(a){l("jwDockRemoveButton",a)};g.callback=function(a){if(z[a])z[a]()};g.forceState=function(a){l("jwForceState",a);return g};g.releaseState=
        function(){return l("jwReleaseState")};g.getDuration=function(){return l("jwGetDuration")};g.getFullscreen=function(){return l("jwGetFullscreen")};g.getHeight=function(){return l("jwGetHeight")};g.getLockState=function(){return l("jwGetLockState")};g.getMeta=function(){return g.getItemMeta()};g.getMute=function(){return l("jwGetMute")};g.getPlaylist=function(){var a=l("jwGetPlaylist");"flash"==g.renderingMode&&k.deepReplaceKeyName(a,["__dot__","__spc__","__dsh__","__default__"],["."," ","-","default"]);
        return a};g.getPlaylistItem=function(a){k.exists(a)||(a=g.getPlaylistIndex());return g.getPlaylist()[a]};g.getPlaylistIndex=function(){return l("jwGetPlaylistIndex")};g.getPosition=function(){return l("jwGetPosition")};g.getRenderingMode=function(){return g.renderingMode};g.getState=function(){return l("jwGetState")};g.getVolume=function(){return l("jwGetVolume")};g.getWidth=function(){return l("jwGetWidth")};g.setFullscreen=function(a){k.exists(a)?l("jwSetFullscreen",a):l("jwSetFullscreen",!l("jwGetFullscreen"));
        return g};g.setMute=function(a){k.exists(a)?l("jwSetMute",a):l("jwSetMute",!l("jwGetMute"));return g};g.lock=function(){return g};g.unlock=function(){return g};g.load=function(a){l("jwLoad",a);return g};g.playlistItem=function(a){l("jwPlaylistItem",parseInt(a));return g};g.playlistPrev=function(){l("jwPlaylistPrev");return g};g.playlistNext=function(){l("jwPlaylistNext");return g};g.resize=function(a,b){if("flash"!=g.renderingMode){var c=document.getElementById(g.id);c.className=c.className.replace(/\s+aspectMode/,
        "");c.style.display="block";l("jwResize",a,b)}else{var c=d.getElementById(g.id+"_wrapper"),e=d.getElementById(g.id+"_aspect");e&&(e.style.display="none");c&&(c.style.display="block",c.style.width=k.styleDimension(a),c.style.height=k.styleDimension(b))}return g};g.play=function(a){"undefined"==typeof a?(a=g.getState(),a==j.PLAYING||a==j.BUFFERING?l("jwPause"):l("jwPlay")):l("jwPlay",a);return g};g.pause=function(a){"undefined"==typeof a?(a=g.getState(),a==j.PLAYING||a==j.BUFFERING?l("jwPause"):l("jwPlay")):
        l("jwPause",a);return g};g.stop=function(){l("jwStop");return g};g.seek=function(a){l("jwSeek",a);return g};g.setVolume=function(a){l("jwSetVolume",a);return g};g.loadInstream=function(a,b){return x=new h.instream(this,n,a,b)};g.getQualityLevels=function(){return l("jwGetQualityLevels")};g.getCurrentQuality=function(){return l("jwGetCurrentQuality")};g.setCurrentQuality=function(a){l("jwSetCurrentQuality",a)};g.getCaptionsList=function(){return l("jwGetCaptionsList")};g.getCurrentCaptions=function(){return l("jwGetCurrentCaptions")};
    g.setCurrentCaptions=function(a){l("jwSetCurrentCaptions",a)};g.getControls=function(){return l("jwGetControls")};g.getSafeRegion=function(){return l("jwGetSafeRegion")};g.setControls=function(a){l("jwSetControls",a)};g.destroyPlayer=function(){l("jwPlayerDestroy")};g.playAd=function(a){var b=e(g.id).plugins;b.vast&&b.vast.jwPlayAd(a)};g.pauseAd=function(){var a=e(g.id).plugins;a.vast?a.vast.jwPauseAd():l("jwPauseAd")};var B={onBufferChange:f.JWPLAYER_MEDIA_BUFFER,onBufferFull:f.JWPLAYER_MEDIA_BUFFER_FULL,
        onError:f.JWPLAYER_ERROR,onSetupError:f.JWPLAYER_SETUP_ERROR,onFullscreen:f.JWPLAYER_FULLSCREEN,onMeta:f.JWPLAYER_MEDIA_META,onMute:f.JWPLAYER_MEDIA_MUTE,onPlaylist:f.JWPLAYER_PLAYLIST_LOADED,onPlaylistItem:f.JWPLAYER_PLAYLIST_ITEM,onPlaylistComplete:f.JWPLAYER_PLAYLIST_COMPLETE,onReady:f.API_READY,onResize:f.JWPLAYER_RESIZE,onComplete:f.JWPLAYER_MEDIA_COMPLETE,onSeek:f.JWPLAYER_MEDIA_SEEK,onTime:f.JWPLAYER_MEDIA_TIME,onVolume:f.JWPLAYER_MEDIA_VOLUME,onBeforePlay:f.JWPLAYER_MEDIA_BEFOREPLAY,onBeforeComplete:f.JWPLAYER_MEDIA_BEFORECOMPLETE,
        onDisplayClick:f.JWPLAYER_DISPLAY_CLICK,onControls:f.JWPLAYER_CONTROLS,onQualityLevels:f.JWPLAYER_MEDIA_LEVELS,onQualityChange:f.JWPLAYER_MEDIA_LEVEL_CHANGED,onCaptionsList:f.JWPLAYER_CAPTIONS_LIST,onCaptionsChange:f.JWPLAYER_CAPTIONS_CHANGED,onAdError:f.JWPLAYER_AD_ERROR,onAdClick:f.JWPLAYER_AD_CLICK,onAdImpression:f.JWPLAYER_AD_IMPRESSION,onAdTime:f.JWPLAYER_AD_TIME,onAdComplete:f.JWPLAYER_AD_COMPLETE,onAdCompanions:f.JWPLAYER_AD_COMPANIONS,onAdSkipped:f.JWPLAYER_AD_SKIPPED};k.foreach(B,function(a){g[a]=
        c(B[a],p)});var w={onBuffer:j.BUFFERING,onPause:j.PAUSED,onPlay:j.PLAYING,onIdle:j.IDLE};k.foreach(w,function(a){g[a]=c(w[a],q)});g.remove=function(){if(!v)throw"Cannot call remove() before player is ready";t=[];h.destroyPlayer(this.id)};g.setup=function(a){if(e.embed){var b=d.getElementById(g.id);b&&(a.fallbackDiv=b);b=g;t=[];h.destroyPlayer(b.id);b=e(g.id);b.config=a;(new e.embed(b)).embed()}return g};g.registerPlugin=function(a,b,c,d){e.plugins.registerPlugin(a,b,c,d)};g.setPlayer=function(a,b){n=
        a;g.renderingMode=b};g.detachMedia=function(){if("html5"==g.renderingMode)return l("jwDetachMedia")};g.attachMedia=function(a){if("html5"==g.renderingMode)return l("jwAttachMedia",a)};g.dispatchEvent=function(a,b){if(r[a])for(var c=k.translateEventResponse(a,b),d=0;d<r[a].length;d++)if("function"==typeof r[a][d])try{a==f.JWPLAYER_PLAYLIST_LOADED&&k.deepReplaceKeyName(c.playlist,["__dot__","__spc__","__dsh__","__default__"],["."," ","-","default"]),r[a][d].call(this,c)}catch(e){k.log("There was an error calling back an event handler")}};
    g.dispatchInstreamEvent=function(a){x&&x.dispatchEvent(a,arguments)};g.callInternal=l;g.playerReady=function(a){v=!0;n||g.setPlayer(d.getElementById(a.id));g.container=d.getElementById(g.id);k.foreach(r,function(a){m(n,a)});p(f.JWPLAYER_PLAYLIST_ITEM,function(){y={}});p(f.JWPLAYER_MEDIA_META,function(a){k.extend(y,a.metadata)});for(g.dispatchEvent(f.API_READY);0<t.length;)l.apply(this,t.shift())};g.getItemMeta=function(){return y};g.isBeforePlay=function(){return l("jwIsBeforePlay")};g.isBeforeComplete=
        function(){return l("jwIsBeforeComplete")};return g};h.selectPlayer=function(b){var c;k.exists(b)||(b=0);b.nodeType?c=b:"string"==typeof b&&(c=d.getElementById(b));return c?(b=h.playerById(c.id))?b:h.addPlayer(new h(c)):"number"==typeof b?a[b]:null};h.playerById=function(b){for(var c=0;c<a.length;c++)if(a[c].id==b)return a[c];return null};h.addPlayer=function(b){for(var c=0;c<a.length;c++)if(a[c]==b)return b;a.push(b);return b};h.destroyPlayer=function(b){for(var c=-1,e,f=0;f<a.length;f++)a[f].id==
b&&(c=f,e=a[f]);0<=c&&(b=e.id,f=d.getElementById(b+("flash"==e.renderingMode?"_wrapper":"")),k.clearCss&&k.clearCss("#"+b),f&&("html5"==e.renderingMode&&e.destroyPlayer(),e=d.createElement("div"),e.id=b,f.parentNode.replaceChild(e,f)),a.splice(c,1));return null};e.playerReady=function(a){var c=e.api.playerById(a.id);c?c.playerReady(a):e.api.selectPlayer(a.id).playerReady(a)}}(jwplayer),function(e){var a=e.events,k=e.utils,f=a.state;e.api.instream=function(e,d,h,b){function c(a,b){l[a]||(l[a]=[],p.jwInstreamAddEventListener(a,
    'function(dat) { jwplayer("'+m.id+'").dispatchInstreamEvent("'+a+'", dat); }'));l[a].push(b);return this}function q(b,e){g[b]||(g[b]=[],c(a.JWPLAYER_PLAYER_STATE,function(a){var c=a.newstate,e=a.oldstate;if(c==b){var d=g[c];if(d)for(var f=0;f<d.length;f++)"function"==typeof d[f]&&d[f].call(this,{oldstate:e,newstate:c,type:a.type})}}));g[b].push(e);return this}var m=e,p=d;e=b||{};var l={},g={};this.dispatchEvent=function(a,b){if(l[a])for(var c=k.translateEventResponse(a,b[1]),d=0;d<l[a].length;d++)"function"==
typeof l[a][d]&&l[a][d].call(this,c)};this.onError=function(b){return c(a.JWPLAYER_ERROR,b)};this.onMediaError=function(b){return c(a.JWPLAYER_MEDIA_ERROR,b)};this.onFullscreen=function(b){return c(a.JWPLAYER_FULLSCREEN,b)};this.onMeta=function(b){return c(a.JWPLAYER_MEDIA_META,b)};this.onMute=function(b){return c(a.JWPLAYER_MEDIA_MUTE,b)};this.onComplete=function(b){return c(a.JWPLAYER_MEDIA_COMPLETE,b)};this.onTime=function(b){return c(a.JWPLAYER_MEDIA_TIME,b)};this.onBuffer=function(a){return q(f.BUFFERING,
    a)};this.onPause=function(a){return q(f.PAUSED,a)};this.onPlay=function(a){return q(f.PLAYING,a)};this.onIdle=function(a){return q(f.IDLE,a)};this.onClick=function(b){return c(a.JWPLAYER_INSTREAM_CLICK,b)};this.onInstreamDestroyed=function(b){return c(a.JWPLAYER_INSTREAM_DESTROYED,b)};this.play=function(a){p.jwInstreamPlay(a)};this.pause=function(a){p.jwInstreamPause(a)};this.destroy=function(){p.jwInstreamDestroy()};this.setText=function(a){p.jwInstreamSetText(a?a:"")};this.updateSkipTime=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            b){p.jwInstreamUpdateSkipTime(a,b)};this.getState=function(){return p.jwInstreamState()};this.setClick=function(a){p.jwInstreamClick(a)};this.type="instream";this.tracker=e.tracker;m.callInternal("jwLoadInstream",h,e)}}(jwplayer),function(e){var a=e.api,k=a.selectPlayer;a.selectPlayer=function(a){return(a=k(a))?a:{registerPlugin:function(a,d,f){e.plugins.registerPlugin(a,d,f)}}}}(jwplayer));
//PROD
jwplayer.key = "25N2ZOTmozz/3c1gpM+ktqtrPMfPodASwMaINdctO0Q=";

//LOCAL
//jwplayer.key = "sWaiQNUQCLo7FjkLYvRqPW5SIVVT7hXten6vQA==";


/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

(function ( $ ) {

    $.fn.mdaJWPlayer = function( displayInOverlay, buttonClickOnly, options ) {

        var videoWrapper = $(this);

        var clickObject = $(this);

        var dataObject = videoWrapper.find('.video-play-button');

        if(buttonClickOnly) {
            clickObject = dataObject;
        }

        var videoPlayButton = videoWrapper.find('.video-play-button');

        if(displayInOverlay){
            videoPlayButton = videoWrapper.find('.mdicon-videoplay');
        }

        var hasFlash = true;
        // Flash Test
        if(!swfobject.hasFlashPlayerVersion('9.0.115'))
        {
            hasFlash = false;
        }

        //Assign poster image in collection or carousel
        if((dataObject.closest('.collection-item').length > 0 || dataObject.closest('.carousel-item').length > 0) && !dataObject.closest('.carousel-image').hasClass('mediahub-poster')){

            var imageContainer = videoWrapper.find('img');
            var videoAttr = (dataObject.data('video-data')) ? dataObject.data('video-data') : {};
            var videoData = (videoAttr.sourceJson) ? videoAttr.sourceJson : {};
            if(dataObject.closest('.carousel-item').length > 0 && videoAttr.source !== 'youtube'){
                imageContainer = dataObject.closest('.carousel-image');
                imageContainer.find('picture').remove();
                imageContainer = $('<img src=""/>').appendTo(imageContainer);;
            }

            var poster = 'http://media.mdanderson.org/poster/MDACC_wide.jpg';
            if(videoData.poster !== undefined) {
                poster = videoData.poster;
            }
            if(videoAttr.source !== 'youtube'){
                imageContainer.attr('src',poster);
                dataObject.closest('.carousel-image').addClass('mediahub-poster')
            }

        }

        clickObject.unbind('click');
        clickObject.unbind('customPlayer');
        clickObject.on('click customPlayer', function (e, triggerParam) {
            e.stopPropagation();
            clickObject.unbind('click');
            if(clickObject.closest('.flip-tile').length > 0 && triggerParam !== 'triggered' && APP.configs.isMobile.nullcheck()){


            } else{
                e.preventDefault();



                // Data attributes
                var videoDiv = dataObject.data('video-div');
                var videoAttr = (dataObject.data('video-data')) ? dataObject.data('video-data') : {};
                var videoData = videoAttr.sourceJson;
                var mediaHub = false;
                var youTube = false;


                if (videoAttr.source === 'youtube') {
                    youTube = true;
                } else if (videoAttr.source === 'mediahub') {
                    mediaHub = true;
                }

                var width = '768';
                var height = '432';
                var aspectratio = '16:9';

                if(videoDiv){
                    videoDiv = videoDiv.replace('#','');
                }
                if(videoDiv == undefined || videoDiv == ''){
                    displayInOverlay = true;
                }
                if(displayInOverlay){
                    videoDiv = 'video-overlay-player';                    
                }

                if(mediaHub){

                    // Video properties
                    var description = '';
                    var poster = 'http://media.mdanderson.org/poster/MDACC_wide.jpg';
                    var volume = '60';
                    var videoSources = [];
                    var videoSourcesPreferred = [];
                    var videoSourcesBackup = [];
                    var videoCaptions = [];
                    var videoCaption = "";
                    var manifestCount = 0;

                    // Get description
                    if(videoData.description !== undefined) {
                        description = videoData.description
                    }

                    // Get poster
                    if(videoData.poster !== undefined) {
                        poster = videoData.poster
                    }

                    // Get volume
                    if(videoData.audio_level !== undefined) {
                        volume = videoData.audio_level
                    }

                    var hasVideos = false;

                    // Get sources
                    if(videoData.media) {
                        var media = videoData.media;



                        // Get preferred and backup sources
                        for (var vid in media) {
                            if(media[vid]['url']) {
                                var v_a = media[vid]['url'].split('.');
                                var v_ext = v_a[v_a.length - 1];
                                if (v_ext == 'mov' || v_ext == 'm4v' || v_ext == 'mp4' || v_ext == 'flv') {
                                    hasVideos = true;
                                }
                                if (media.hasOwnProperty(vid)) {


                                    if (media[vid].preferred) {
                                        // Preferred source
                                        videoSourcesPreferred.push({
                                            'file': 'http://' + media[vid].url
                                        });
                                    } else {
                                        // Backup source
                                        var a = media[vid].url.split('.');
                                        var ext = a[a.length - 1];
                                        if (ext !== 'mp3') {
                                            videoSourcesBackup.push({
                                                'file': 'http://' + media[vid].url
                                            });
                                        }
                                    }
                                }
                            }
                        }

                        if(!hasVideos){
                            videoSourcesPreferred = []
                            for (var vid in media) {
                                if (media[vid]['media_type'] === 'Encodedaudio' || media[vid]['media_type'] === 'Encoded audio') {
                                    //To be replaced with global value
                                    var isProd = true;
                                    var v_url = '';

                                    if (media[vid]['url'].indexOf('/mp3:') === -1 && media[vid].url.indexOf('/audio/') > -1) {
                                        v_url =  media[vid]['url'].replace('/audio/', '/mp3:audio/').replace('.mp3', '');
                                    } else {
                                        v_url = media[vid]['url'].replace('/media/', '/mp3:media/').replace('.mp3', '');
                                    }

                                    if(isProd){
                                        v_url = v_url.replace('dcswlflash.mdanderson.edu','media.mdanderson.org');
                                    }
                                    if(v_url.indexOf('stream-public') > -1){
                                        videoSourcesPreferred.push({
                                            'file': 'rtmp://' + v_url
                                        });
                                    } else{
                                        videoSourcesPreferred.push({
                                            'file': 'http://' + v_url.replace('mp3:','') + '.mp3'
                                        });
                                    }
                                }
                            }
                        }

                        for (var vid in media) {
                            // Check for Encoded Video
                            if(media[vid]['media_type'] === 'Encoded video' || media[vid]['media_type'] === 'Encodedvideo' || media[vid]['media_type'] === 'Encoded HLS media') {
                                var v_a = media[vid].url.split('.');
                                var v_ext = v_a[v_a.length-1];
                                var r_ext = '';
                                if(v_ext === 'mov' || v_ext === 'm4v' || v_ext === 'mp4') {
                                    r_ext = 'mp4:';
                                } else if(v_ext = 'flv') {
                                    r_ext = 'flv:';
                                }

                                var v_url = '';

                                if(media[vid].url.indexOf('/vod/') > -1) {
                                    v_url = 'rtmp://'+media[vid].url.replace('/media/','/'+r_ext+'media/');
                                    v_url = v_url.replace('.mp4','.mov')
                                } else {
                                    var vv_url = 'rtmp://'+media[vid].url.replace('/video/','/'+r_ext+'video/');
                                    v_url = vv_url.replace('/depts/','/'+r_ext+'depts/')
                                }

                                videoSourcesPreferred.push({
                                    'file':v_url
                                });
                                videoSourcesPreferred.push({
                                    'file':'http://'+media[vid].url
                                });
                            }


                        }

                        // Check for Encoded HLS Media
                        if(media['Encoded HLS media']) {
                            if(media['Manifest HLS'] && manifestCount < 1) {
                                videoSourcesPreferred.push({
                                    'file':'http://'+media['Manifest HLS'].url
                                });
                                manifestCount++;
                            }
                            var m_a = media['Encoded HLS media'].url.split('.');
                            var m_ext = m_a[m_a.length-1];
                            if(m_ext === 'mov' || m_ext === 'm4v' || m_ext === 'mp4') {
                                m_ext = 'mp4'
                            }
                            var m_url = 'rtmp://'+media['Encoded HLS media'].url.replace('/media/','/'+m_ext+':media/');
                            videoSourcesPreferred.push({
                                'file':m_url
                            });
                        }

                        // Check for Encoded Video
                        if(media['Encoded video']) {
                            var v_a = media['Encoded video'].url.split('.');
                            var v_ext = v_a[v_a.length-1];
                            var r_ext = '';
                            if(v_ext === 'mov' || v_ext === 'm4v' || v_ext === 'mp4') {
                                r_ext = 'mp4:';
                            } else if(v_ext = 'flv') {
                                r_ext = 'flv:';
                            }

                            var v_url = '';

                            if(media['Encoded video'].url.indexOf('/vod/') > -1) {
                                v_url = 'rtmp://'+media['Encoded video'].url.replace('/media/','/'+r_ext+'media/');
                            } else {
                                var vv_url = 'rtmp://'+media['Encoded video'].url.replace('/video/','/'+r_ext+'video/');
                                v_url = vv_url.replace('/depts/','/'+r_ext+'depts/')
                            }

                            videoSourcesPreferred.push({
                                'file':v_url
                            });
                            videoSourcesPreferred.push({
                                'file':'http://'+media['Encoded video'].url
                            });
                        }
                        //Check for Caption

                        for(var k in media) {
                            if(media[k].media_type === 'Caption') {
                                videoCaption = "http://" + media[k].url;
                            }
                        }

                    }

                    videoSources = videoSourcesPreferred.concat(videoSourcesBackup);


                    // If no sources
                    if(videoSources.length < 1) {
                        poster = 'http://media.mdanderson.org/poster/NotAvaliable_Default.jpg';
                    }

                    if($('#'+videoDiv).closest('.media-player').length > 0){
                        width = '100%';
                    }

                    jwplayer(videoDiv).setVolume(volume);
                    var imageLocation = '/etc/designs/mda/mda-web/images/MDACC_wide.jpg';
                    if(APP.configs.isLocal){
                        imageLocation = '/mda-web/images/MDACC_wide.jpg';
                    }
                    var elements = [{
                        'src': imageLocation

                    }];
                    var lightGallery = $('#yt-overlay-player');
                    lightGallery.on('onAfterOpen.lg',function(event){
                        $('.lg-item').first().find('.lg-img-wrap').first().attr('id','mediahubholder');
                        videoDiv = 'mediahubholder';
                        $('.lg-close.lg-icon').focus();
                        var base = '/etc/designs/mda/mda-web/jwplayer/';
                        if(APP.configs.isLocal){
                            base = '/mda-web/jwplayer/';
                        }
                        var toolbar = $('.lg-outer').find('.lg-toolbar').detach();
                        $('.lg-outer').find('.lg').prepend(toolbar);
                        $('.lg-close').focus();


                        jwplayer(videoDiv).setup({
                            base: base,
                            width: width,
                            height: height,
                            aspectratio: aspectratio,
                            skin: '/mdaSkin.xml',
                            'controlbar': 'bottom',
                            fallback: 'true',
                            abouttext: 'MD Anderson Cancer Center',
                            aboutlink: 'http://www.mdanderson.org/',
                            sharing: { heading: 'Share MD Anderson Video'},
                            logo: {
                                file: '/etc/designs/mda/mda-web/images/spacer.png',
                                hide: true
                            },
                            playlist: [{
                                image: poster,
                                description: description,
                                tracks: [{
                                    file: videoCaption,
                                    label: "English",
                                    kind: "captions",
                                    "default": true
                                }],
                                sources: videoSources
                            }],
                            events: {
                                onComplete: function() {
                                    $('#video-overlay-player_wrapper').removeClass('fade-in');
                                    $('#video-overlay-player_wrapper').addClass('fade-out');
                                    $('#video-overlay').removeClass('fade-in');
                                    $('#video-overlay').addClass('fade-out');
                                    clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);

                                }
                            }

                        });
                        var topOffSet = -1 * height/2;
                        $('#'+videoDiv+'_wrapper').addClass('lg-object').css({ 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});

                        $('.lg-item').first().css({'opacity' : '0'});

                        jwplayer(videoDiv).onReady(function(){
                            var topOffSet = -1 * height/2;
                            $('.lg-item').first().find('.jwplayer').addClass('lg-object').css({ 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
                            $('.lg-item').first().find('.lg-object').css({'transform':'none'});

                            $('#'+videoDiv+'_wrapper').addClass('lg-object').css({ 'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
                            $('.lg-item').first().css({'opacity' : '1'});
                            clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                            setTimeout(function(){
                                $('.lg-item').first().find('.jwplayer').addClass('show-controls');
                            }, 1000);
                            if(!displayInOverlay){
                                $('#'+videoDiv + '_wrapper').css({'width':'100%','height':'100%','position':'absolute'}).addClass('fade-in');
                                videoWrapper.find('#basic-video-container').addClass('fade-in');
                                if(videoPlayButton.closest('.carousel-body-content').length > 0){
                                    videoPlayButton.hide();
                                }

                                if(videoWrapper.closest('.carousel-hero').length > 0){
                                    var $carousel = videoWrapper.closest('.carousel-hero');
                                    $carousel.find('button').on('click',function(){
                                        jwplayer(videoDiv).stop();
                                        clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                                    });
                                }

                            }
                            jwplayer(videoDiv).play();
                        });
                    }).on('onCloseAfter.lg',function(event){
                        lightGallery.removeData();
                        lightGallery.unbind('onAfterOpen.lg');
                        clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                        clickObject.focus();
                    }).lightGallery({
                        dynamic: true,
                        dynamicEl: elements,
                        counter : false
                    });
                    $('.lg-icon.lg-close').focus();


                } else if(youTube) {
                    if (APP.utils.getViewport().width < APP.configs.views['medium']) {
                        height = height/width * APP.utils.getViewport().width;
                    }
                    var topOffSet = -1 * height/2;
                    $('.lg-item').first().css({'opacity' : '0'});
                    var imageLocation = '/etc/designs/mda/mda-web/images/MDACC_wide.jpg';
                    if(APP.configs.isLocal){
                        imageLocation = '/mda-web/images/MDACC_wide.jpg';
                    }
                    var elements = [{
                        src : imageLocation

                    }];
                    var lightGallery = $('#yt-overlay-player');
                    lightGallery.on('onAfterOpen.lg',function(event) {
                        $('.lg-item').first().find('.lg-img-wrap').first().html('<iframe id="player" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+videoAttr.id+'?enablejsapi=1&autoplay=1" frameborder="0" allowfullscreen></iframe>')
                        if(window.onPlayerStateChange !== undefined && window.onPlayerReady !== undefined){
                            window.videoplayer;
                            for (var e = document.getElementsByTagName("iframe"), x = e.length; x--;) {
                                if (/youtube.com\/embed/.test(e[x].src)) {
                                    window.videoplayer = new YT.Player(e[x], {
                                        events: {
                                            onStateChange: window.onPlayerStateChange,
                                            onReady: window.onPlayerReady
                                        }
                                    });
                                    YT.gtmLastAction = "p";
                                }
                            }
                        }
                        var toolbar = $('.lg-outer').find('.lg-toolbar').detach();
                        $('.lg-outer').find('.lg').prepend(toolbar);

                        var prevButton = $('.lg-prev').wrap('<div class="lg-actions"></div>');
                        prevButton = prevButton.closest('.lg-actions');
                        prevButton = prevButton.detach();
                        $('.lg-toolbar').after(prevButton);

                        $('.lg-close').focus();

                        $('.lg-item').find('#player').css({'margin': topOffSet+'px auto','max-width' : $( window ).width()+'px'});
                        $('.lg-item').first().css({'opacity' : '1'});
                        $('.lg-close.lg-icon').focus();
                    }).on('onCloseAfter.lg',function(event){
                        lightGallery.removeData();
                        lightGallery.unbind('onAfterOpen.lg');
                        clickObject.mdaJWPlayer(displayInOverlay, buttonClickOnly);
                        clickObject.focus();
                        if(window.videoplayer !== undefined){
                            utag.link({
                                "time_viewed" : window.videoplayer.getCurrentTime()
                            })
                        }
                    }).lightGallery({
                        dynamic: true,
                        dynamicEl: elements,
                        counter : false
                    });
                    $('.lg-icon.lg-close').focus();

                }
            }


        });

        return this;
    };

}( jQuery ));
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($, F){
    // add in console we use in case it's missing
    window.console = window.console || { log:function(){}, error:function(){} };

    /**
     * The jQuery plugin initializer.
     * @function jQuery.fn.footable
     * @param {(object|FooTable.Defaults)} [options] - The options to initialize the plugin with.
     * @param {function} [ready] - A callback function to execute for each initialized plugin.
     * @returns {jQuery}
     */
    $.fn.footable = function (options, ready) {
        options = options || {};
        // make sure we only work with tables
        return this.filter('table').each(function (i, tbl) {
            var ft = F.get(tbl);
            if (ft instanceof F.Table) ft.destroy();
            F.init(tbl, options, ready);
        });
    };

    var debug_defaults = {
        events: []
    };
    F.__debug__ = JSON.parse(localStorage.getItem('footable_debug')) || false;
    F.__debug_options__ = JSON.parse(localStorage.getItem('footable_debug_options')) || debug_defaults;

    /**
     * Gets or sets the internal debug variable which enables some additional logging to the console.
     * When enabled this value is stored in the localStorage so it can persist across page reloads.
     * @param {boolean} value - Whether or not to enable additional logging.
     * @param {object} [options] - Any debug specific options.
     * @returns {(boolean|undefined)}
     */
    F.debug = function(value, options){
        if (!F.checker.isBoolean(value)) return F.__debug__;
        F.__debug__ = value;
        if (F.__debug__){
            localStorage.setItem('footable_debug', JSON.stringify(F.__debug__));
            F.__debug_options__ = $.extend(true, {}, debug_defaults, options || {});
            if (F.checker.hash(options)){
                localStorage.setItem('footable_debug_options', JSON.stringify(F.__debug_options__));
            }
        } else {
            localStorage.removeItem('footable_debug');
            localStorage.removeItem('footable_debug_options');
        }
    };

    /**
     * Gets the FooTable instance of the supplied table if one exists.
     * @param {(jQuery|jQuery.selector|HTMLTableElement)} table - The jQuery table object, selector or the HTMLTableElement to retrieve FooTable from.
     * @returns {(FooTable.Table|undefined)}
     */
    F.get = function(table){
        return $(table).first().data('__FooTable__');
    };

    /**
     * Initializes a new instance of FooTable on the supplied table.
     * @param {(jQuery|jQuery.selector|HTMLTableElement)} table - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
     * @param {object} options - The options to initialize FooTable with.
     * @param {function} [ready] - A callback function to execute once the plugin is initialized.
     * @returns {FooTable.Table}
     */
    F.init = function(table, options, ready){
        return new F.Table(table, options, ready);
    };

    // The below are external type definitions mainly used as pointers to jQuery docs for important information
    /**
     * jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API
     * that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.
     * @name jQuery
     * @constructor
     * @returns {jQuery}
     * @see {@link http://api.jquery.com/}
     */

    /**
     * This object provides a subset of the methods of the Deferred object (then, done, fail, always, pipe, and state) to prevent users from changing the state of the Deferred.
     * @typedef {object} jQuery.Promise
     * @see {@link http://api.jquery.com/Types/#Promise}
     */

    /**
     * As of jQuery 1.5, the Deferred object provides a way to register multiple callbacks into self-managed callback queues, invoke callback queues as appropriate,
     * and relay the success or failure state of any synchronous or asynchronous function.
     * @typedef {object} jQuery.Deferred
     * @see {@link http://api.jquery.com/Types/#Deferred}
     */

    /**
     * jQuery's event system normalizes the event object according to W3C standards. The event object is guaranteed to be passed to the event handler. Most properties from
     * the original event are copied over and normalized to the new event object.
     * @typedef {object} jQuery.Event
     * @see {@link http://api.jquery.com/category/events/event-object/}
     */

    /**
     * Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.
     * @memberof jQuery
     * @function when
     * @param {...jQuery.Deferred} deferreds - Any number of deferred objects to wait for.
     * @returns {jQuery.Promise}
     * @see {@link http://api.jquery.com/jQuery.when/}
     */

    /**
     * The jQuery.fn namespace used to register plugins with jQuery.
     * @memberof jQuery
     * @namespace fn
     * @see {@link http://learn.jquery.com/plugins/basic-plugin-creation/}
     */
})(
    jQuery,
    /**
     * The core FooTable namespace containing all the plugin code.
     * @namespace
     */
    FooTable = window.FooTable || {}
);
(function(F){
    var returnTrue = function(){ return true; };

    /**
     * This namespace contains commonly used array utility methods.
     * @namespace {object} FooTable.arr
     */
    F.arr = {};

    /**
     * Iterates over each item in the supplied array and performs the supplied function passing in the current item as the first argument.
     * @memberof FooTable.arr
     * @function each
     * @param {Array} array - The array to iterate
     * @param {function} func - The function to execute for each item. The first argument supplied to this function is the current item and the second is the current index.
     */
    F.arr.each = function (array, func) {
        if (!F.checker.array(array) || !F.checker.fn(func)) return;
        for (var i = 0, len = array.length; i < len; i++) {
            if (func(array[i], i) === false) break;
        }
    };

    /**
     * Get all items in the supplied array that optionally matches the supplied where function. If no items are found an empty array is returned.
     * @memberof FooTable.arr
     * @function get
     * @param {Array} array - The array to get items from.
     * @param {function} where - This function must return a boolean value, true includes the item in the result array.
     * @returns {Array}
     */
    F.arr.get = function (array, where) {
        var result = [];
        if (!F.checker.array(array)) return result;
        if (!F.checker.fn(where)) return array;
        for (var i = 0, len = array.length; i < len; i++) {
            if (where(array[i], i)) result.push(array[i]);
        }
        return result;
    };

    /**
     * Get a boolean value indicating if any item exists in the supplied array that optionally matches the supplied where function.
     * @memberof FooTable.arr
     * @function any
     * @param {Array} array - The array to check.
     * @param {function} [where] - [Optional] This function must return a boolean value, true indicates that the current item is a valid match.
     * @returns {boolean}
     */
    F.arr.any = function (array, where) {
        if (!F.checker.array(array)) return false;
        where = F.checker.fn(where) ? where : returnTrue;
        for (var i = 0, len = array.length; i < len; i++) {
            if (where(array[i], i)) return true;
        }
        return false;
    };

    /**
     * Checks if the supplied value exists in the array.
     * @memberof FooTable.arr
     * @function contains
     * @param {Array} array - The array to check.
     * @param {*} value - The value to check for.
     * @returns {boolean}
     */
    F.arr.contains = function(array, value){
        if (!F.checker.array(array) || F.checker.undef(value)) return false;
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] == value) return true;
        }
        return false;
    };

    /**
     * Get the first item in the supplied array that optionally matches the supplied where function. If no item is found null is returned.
     * @memberof FooTable.arr
     * @function first
     * @param {Array} array - The array to get the item from.
     * @param {function} [where] - [Optional] This function must return a boolean value, true indicates that the current item can be returned.
     * @returns {(*|null)}
     */
    F.arr.first = function (array, where) {
        if (!F.checker.array(array)) return null;
        where = F.checker.fn(where) ? where : returnTrue;
        for (var i = 0, len = array.length; i < len; i++) {
            if (where(array[i], i)) return array[i];
        }
        return null;
    };

    /**
     * Creates a new array from the results of the supplied getter function. If no items are found an empty array is returned, to exclude an item from the results return null.
     * @memberof FooTable.arr
     * @function map
     * @param {Array} array - The array to iterate.
     * @param {function} getter - This function must return either a new value or null.
     * The first argument is the result being returned at this point in the iteration. The second argument is the current item being iterated.
     * @returns {(*|null)}
     */
    F.arr.map = function (array, getter) {
        var result = [], returned = null;
        if (!F.checker.array(array) || !F.checker.fn(getter)) return result;
        for (var i = 0, len = array.length; i < len; i++) {
            if ((returned = getter(array[i], i)) != null) result.push(returned);
        }
        return result;
    };

    /**
     * Removes items from the array matching the supplied where function. All removed items are returned in a new array.
     * @memberof FooTable.arr
     * @function remove
     * @param {Array} array - The array to iterate and remove items from.
     * @param {function} where - This function must return a boolean value, true includes the item in the result array.
     * @returns {*}
     */
    F.arr.remove = function (array, where) {
        var remove = [], removed = [];
        if (!F.checker.array(array) || !F.checker.fn(where)) return removed;
        var i = 0, len = array.length;
        for (; i < len; i++) {
            if (where(array[i], i, removed)){
                remove.push(i);
                removed.push(array[i]);
            }
        }
        // sort the indexes to be removed from largest to smallest
        remove.sort(function(a, b){ return b - a; });
        i = 0; len = remove.length;
        for(; i < len; i++){
            var index = remove[i] - i;
            array.splice(index, 1);
        }
        return removed;
    };

})(FooTable);
(function (F) {

    /**
     * This namespace contains commonly used 'is' type methods that return boolean values.
     * @namespace FooTable.is
     */
    F.checker = {};

    /**
     * Checks if the type of the value is the same as that supplied.
     * @memberof FooTable.is
     * @function type
     * @param {*} value - The value to check the type of.
     * @param {string} type - The type to check for.
     * @returns {boolean}
     */
    F.checker.type = function (value, type) {
        return typeof value === type;
    };

    /**
     * Checks if the value is defined.
     * @memberof FooTable.is
     * @function defined
     * @param {*} value - The value to check is defined.
     * @returns {boolean}
     */
    F.checker.defined = function (value) {
        return typeof value !== 'undefined';
    };

    /**
     * Checks if the value is undefined.
     * @memberof FooTable.is
     * @function undef
     * @param {*} value - The value to check is undefined.
     * @returns {boolean}
     */
    F.checker.undef = function (value) {
        return typeof value === 'undefined';
    };

    /**
     * Checks if the value is an array.
     * @memberof FooTable.is
     * @function array
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.array = function (value) {
        return '[object Array]' === Object.prototype.toString.call(value);
    };

    /**
     * Checks if the value is a date.
     * @memberof FooTable.is
     * @function date
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.date = function (value) {
        return '[object Date]' === Object.prototype.toString.call(value) && !isNaN(value.getTime());
    };

    /**
     * Checks if the value is a boolean.
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.isBoolean = function (value) {
        return '[object Boolean]' === Object.prototype.toString.call(value);
    };

    /**
     * Checks if the value is a string.
     * @memberof FooTable.is
     * @function string
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.string = function (value) {
        return '[object String]' === Object.prototype.toString.call(value);
    };

    /**
     * Checks if the value is a number.
     * @memberof FooTable.is
     * @function number
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.number = function (value) {
        return '[object Number]' === Object.prototype.toString.call(value);
    };

    /**
     * Checks if the value is a function.
     * @memberof FooTable.is
     * @function fn
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.fn = function (value) {
        return (F.checker.defined(window) && value === window.alert) || '[object Function]' === Object.prototype.toString.call(value);
    };

    /**
     * Checks if the value is an error.
     * @memberof FooTable.is
     * @function error
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.error = function (value) {
        return '[object Error]' === Object.prototype.toString.call(value);
    };

    /**
     * Checks if the value is an object.
     * @memberof FooTable.is
     * @function object
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.object = function (value) {
        return '[object Object]' === Object.prototype.toString.call(value);
    };

    /**
     * Checks if the value is a hash.
     * @memberof FooTable.is
     * @function hash
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.hash = function (value) {
        return F.checker.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
    };

    /**
     * Checks if the supplied object is an HTMLElement
     * @memberof FooTable.is
     * @function element
     * @param {object} obj - The object to check.
     * @returns {boolean}
     */
    F.checker.element = function (obj) {
        return typeof HTMLElement === 'object'
            ? obj instanceof HTMLElement
            : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    };

    /**
     * This is a simple check to determine if an object is a jQuery promise object. It simply checks the object has a "then" and "promise" function defined.
     * The promise object is created as an object literal inside of jQuery.Deferred.
     * It has no prototype, nor any other truly unique properties that could be used to distinguish it.
     * This method should be a little more accurate than the internal jQuery one that simply checks for a "promise" method.
     * @memberof FooTable.is
     * @function promise
     * @param {object} obj - The object to check.
     * @returns {boolean}
     */
    F.checker.promise = function(obj){
        return F.checker.object(obj) && F.checker.fn(obj.then) && F.checker.fn(obj.promise);
    };

    /**
     * Checks if the supplied object is an instance of a jQuery object.
     * @memberof FooTable.is
     * @function jq
     * @param {object} obj - The object to check.
     * @returns {boolean}
     */
    F.checker.jq = function(obj){
        return F.checker.defined(jQuery) && obj instanceof jQuery && obj.length > 0;
    };

    /**
     * Checks if the supplied value is an object and if it is empty.
     * @memberof FooTable.is
     * @function emptyObject
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.emptyObject = function(value){
        if (!F.checker.hash(value)) return false;
        for(var prop in value) {
            if(value.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    /**
     * Checks if the supplied value is an array and if it is empty.
     * @memberof FooTable.is
     * @function emptyArray
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.emptyArray = function(value){
        return F.checker.array(value) ? value.length === 0 : true;
    };

    /**
     * Checks if the supplied value is a string and if it is empty.
     * @memberof FooTable.is
     * @function emptyString
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    F.checker.emptyString = function(value){
        return F.checker.string(value) ? value.length === 0 : true;
    };

})(FooTable);
(function (F) {
    /**
     * This namespace contains commonly used string utility methods.
     * @namespace FooTable.str
     */
    F.str = {};

    /**
     * Checks if the supplied string contains the given substring.
     * @memberof FooTable.str
     * @function contains
     * @param {string} str - The string to check.
     * @param {string} contains - The string to check for.
     * @param {boolean} [ignoreCase] - Whether or not to ignore casing when performing the check.
     * @returns {boolean}
     */
    F.str.contains = function (str, contains, ignoreCase) {
        return !F.checker.emptyString(str)
            && !F.checker.emptyString(contains) && contains.length <= str.length
            && (ignoreCase ? str.toUpperCase().indexOf(contains.toUpperCase()) : str.indexOf(contains)) !== -1;
    };

    /**
     * Checks if the supplied string contains the given word.
     * @memberof FooTable.str
     * @function containsWord
     * @param {string} str - The string to check.
     * @param {string} word - The word to check for.
     * @param {boolean} [ignoreCase] - Whether or not to ignore casing when performing the check.
     * @returns {boolean}
     */
    F.str.containsWord = function(str, word, ignoreCase){
        if (F.checker.emptyString(str) || F.checker.emptyString(word) || str.length < word.length)
            return false;
        var parts = str.split(/\W/);
        for (var i = 0, len = parts.length; i < len; i++){
            if (ignoreCase ? parts[i].toUpperCase() == word.toUpperCase() : parts[i] == word) return true;
        }
        return false;
    };

    /**
     * Returns the remainder of a string split on the first index of the given substring.
     * @memberof FooTable.str
     * @function from
     * @param {string} str - The string to split.
     * @param {string} from - The substring to split on.
     * @returns {string}
     */
    F.str.from = function (str, from) {
        return this.contains(str, from) ? str.substring(str.indexOf(from) + 1) : str;
    };

    /**
     * Checks if a string starts with the supplied prefix.
     * @memberof FooTable.str
     * @function startsWith
     * @param {string} str - The string to check.
     * @param {string} prefix - The prefix to check for.
     * @returns {boolean}
     */
    F.str.startsWith = function (str, prefix) {
        return str.slice(0, prefix.length) == prefix;
    };

    /**
     * Takes the supplied string and converts it to camel case.
     * @memberof FooTable.str
     * @function toCamelCase
     * @param {string} str - The string to camel case.
     * @returns {string}
     */
    F.str.toCamelCase = function (str) {
        if (str.toUpperCase() === str) return str.toLowerCase();
        return str.replace(/^([A-Z])|[-\s_](\w)/g, function (match, p1, p2) {
            if (p2) return p2.toUpperCase();
            return p1.toLowerCase();
        });
    };

})(FooTable);
(function (F) {
    "use strict";

    if (!Object.create) {
        Object.create = (function () {
            var Object = function () {};
            return function (prototype) {
                if (arguments.length > 1)
                    throw Error('Second argument not supported');

                if (!F.checker.object(prototype))
                    throw TypeError('Argument must be an object');

                Object.prototype = prototype;
                var result = new Object();
                Object.prototype = null;
                return result;
            };
        })();
    }

    /**
     * This base implementation does nothing except provide access to the {@link FooTable.Class#extend} method.
     * @constructs FooTable.Class
     * @classdesc This class is based off of John Resig's [Simple JavaScript Inheritance]{@link http://ejohn.org/blog/simple-javascript-inheritance} but it has been updated to be ES 5.1
     * compatible by implementing an [Object.create polyfill]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill}
     * for older browsers.
     * @see {@link http://ejohn.org/blog/simple-javascript-inheritance}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill}
     * @returns {FooTable.Class}
     */
    function Class() {}

    var __extendable__ = /xyz/.test(function () {xyz;}) ? /\b_super\b/ : /.*/;

    // this._super() within the context of the new function is a pointer to the original function
    // except if the hook param is specified then the this._super variable is the result of the original function
    Class.__extend__ = function(proto, name, func, original){
        // to all who venture here, here be dragons!
        proto[name] = F.checker.fn(original) && __extendable__.test(func) ?
            (function (name, fn) {
                return function () {
                    var tmp, ret;
                    tmp = this._super;
                    this._super = original;
                    ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, func) : func;
    };

    /**
     * Creates a new class that inherits from this class which in turn allows itself to be extended or if a name and function is supplied extends only that specific function on the class.
     * @param {(object|string)} arg1 - An object containing any new methods/members to implement or the name of the method to extend.
     * @param {function} arg2 - If the first argument is a method name then this is the new function to replace it with.
     * @returns {FooTable.Class} A new class that inherits from the base class.
     * @example <caption>The below shows an example of how to implement inheritance using this method.</caption>
     * var Person = FooTable.Class.extend({
	 *   construct: function(isDancing){
	 *     this.dancing = isDancing;
	 *   },
	 *   dance: function(){
	 *     return this.dancing;
	 *   }
	 * });
     *
     * var Ninja = Person.extend({
	 *   construct: function(){
	 *     this._super( false );
	 *   },
	 *   dance: function(){
	 *     // Call the inherited version of dance()
	 *     return this._super();
	 *   },
	 *   swingSword: function(){
	 *     return true;
	 *   }
	 * });
     *
     * var p = new Person(true);
     * p.dance(); // => true
     *
     * var n = new Ninja();
     * n.dance(); // => false
     * n.swingSword(); // => true
     *
     * // Should all be true
     * p instanceof Person && p instanceof FooTable.Class &&
     * n instanceof Ninja && n instanceof Person && n instanceof FooTable.Class
     */
    Class.extend = function (arg1 , arg2) {
        var args = Array.prototype.slice.call(arguments);
        arg1 = args.shift();
        arg2 = args.shift();

        function __extend__(proto, name, func, original){
            // to all who venture here, here be dragons!
            proto[name] = F.checker.fn(original) && __extendable__.test(func) ?
                (function (name, fn, ofn) {
                    return function () {
                        var tmp, ret;
                        tmp = this._super;
                        this._super = ofn;
                        ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, func, original) : func;
        }

        if (F.checker.hash(arg1)){
            var proto = Object.create(this.prototype),
                _super = this.prototype;
            for (var name in arg1) {
                if (name === '__ctor__') continue;
                __extend__(proto, name, arg1[name], _super[name]);
            }
            var obj = F.checker.fn(proto.__ctor__) ? proto.__ctor__ : function () {
                if (!F.checker.fn(this.construct))
                    throw new SyntaxError('FooTable class objects must be constructed with the "new" keyword.');
                this.construct.apply(this, arguments);
            };
            proto.construct = F.checker.fn(proto.construct) ? proto.construct : function(){};
            obj.prototype = proto;
            proto.constructor = obj;
            obj.extend = Class.extend;
            return obj;
        } else if (F.checker.string(arg1) && F.checker.fn(arg2)) {
            __extend__(this.prototype, arg1, arg2, this.prototype[arg1]);
        }
    };

    F.Class = Class;

    F.ClassFactory = F.Class.extend(/** @lends FooTable.ClassFactory */{
        /**
         * This is a simple factory for {@link FooTable.Class} objects allowing them to be registered using a friendly name
         * and then new instances can be created using this friendly name.
         * @constructs
         * @extends FooTable.Class
         * @returns {FooTable.ClassFactory}
         * @this FooTable.ClassFactory
         */
        construct: function(){
            /**
             * An object containing all registered classes.
             * @type {{}}
             */
            this.registered = {};
        },
        /**
         * Checks if the factory contains a class registered using the supplied name.
         * @instance
         * @param {string} name - The name of the class to check.
         * @returns {boolean}
         * @this FooTable.ClassFactory
         */
        contains: function(name){
            return F.checker.defined(this.registered[name]);
        },
        /**
         * Registers a class object using the supplied friendly name and priority. The priority is only taken into account when loading all registered classes
         * using the {@link FooTable.ClassFactory#load} method.
         * @instance
         * @param {string} name - The friendly name of the class.
         * @param {function} klass - The class to register.
         * @param {number} priority - This determines the order that the class is created when using the {@link FooTable.ClassFactory#load} method, higher values are loaded first.
         * @this FooTable.ClassFactory
         */
        register: function(name, klass, priority){
            if (!F.checker.string(name) || !F.checker.fn(klass)) return;
            var current = this.registered[name];
            this.registered[name] = {
                name: name,
                klass: klass,
                priority: F.checker.number(priority) ? priority : (F.checker.defined(current) ? current.priority : 0)
            };
        },
        /**
         * Creates new instances of all registered classes using there priority and the supplied arguments to return them in an array.
         * @instance
         * @param {*} arg1 - The first argument to supply when creating new instances of all registered classes.
         * @param {*} [argN...] - Any number of additional arguments to supply when creating new instances of all registered classes.
         * @returns {Array.<FooTable.Class>}
         * @this FooTable.ClassFactory
         */
        load: function(arg1, argN){
            var self = this, args = Array.prototype.slice.call(arguments), reg = [], loaded = [];
            for (var name in self.registered){
                if (!self.registered.hasOwnProperty(name)) continue;
                reg.push(self.registered[name]);
            }
            reg.sort(function(a, b){ return b.priority - a.priority; });
            F.arr.each(reg, function(r){
                if (F.checker.fn(r.klass)){
                    loaded.push(self._make(r.klass, args));
                }
            });
            return loaded;
        },
        /**
         * Create a new instance of a single class using the supplied name and arguments.
         * @instance
         * @param {string} name - The name of the class to create.
         * @param {*} arg1 - The first argument to supply to the new instance.
         * @param {*} [argN...] - Any number of additional arguments to supply to the new instance.
         * @returns {FooTable.Class}
         * @this FooTable.ClassFactory
         */
        make: function(name, arg1, argN){
            var self = this, args = Array.prototype.slice.call(arguments), reg;
            name = args.shift();
            reg = self.registered[name];
            if (F.checker.fn(reg.klass)){
                return self._make(reg.klass, args);
            }
            return null;
        },
        /**
         * This in effect lets us use the "apply" method on a function using the "new" keyword.
         * @instance
         * @private
         * @param {function} klass
         * @param args
         * @returns {FooTable.Class}
         * @this FooTable.ClassFactory
         */
        _make: function(klass, args){
            function Class() {
                return klass.apply(this, args);
            }
            Class.prototype = klass.prototype;
            return new Class();
        }
    });

})(FooTable);
(function($, F){

    /**
     * Converts the supplied cssText string into JSON object.
     * @param {string} cssText - The cssText to convert to a JSON object.
     * @returns {object}
     */
    F.css2json = function(cssText){
        if (F.checker.emptyString(cssText)) return {};
        var json = {}, props = cssText.split(';'), pair, key, value;
        for (var i = 0, i_len = props.length; i < i_len; i++){
            pair = props[i].split(':');
            key = F.str.toCamelCase($.trim(pair[0]));
            value = $.trim(pair[1]);
            json[key] = value;
        }
        return json;
    };

    /**
     * Attempts to retrieve a function pointer using the given name.
     * @protected
     * @param {string} functionName - The name of the function to fetch a pointer to.
     * @returns {(function|object|null)}
     */
    F.getFnPointer = function(functionName){
        if (F.checker.emptyString(functionName)) return null;
        if (F.checker.fn(window[functionName])) return window[functionName];
        return null;
    };

    /**
     * Checks the value for function properties such as the {@link FooTable.Column#formatter} option which could also be specified using just the name
     * and attempts to return the correct function pointer or null if none was found matching the value.
     * @param {FooTable.Class} self - The class to use as the 'this' keyword within the context of the function.
     * @param {(function|string)} value - The actual function or the name of the function for the property.
     * @param {function} [def] - A default function to return if none is found.
     * @returns {(function|null)}
     */
    F.checkFnValue = function(self, value, def){
        def = F.checker.fn(def) ? def : null;
        function wrap(t, fn, d){
            if (!F.checker.fn(fn)) return d;
            return function(){
                return fn.apply(t, arguments);
            };
        }
        return F.checker.fn(value) ? wrap(self, value, def) : (F.checker.type(value, 'string') ? wrap(self, F.getFnPointer(value), def) : def);
    };

})(jQuery, FooTable);
(function($, F){

    F.Cell = F.Class.extend(/** @lends FooTable.Cell */{
        /**
         * The cell class containing all the properties for cells.
         * @constructs
         * @extends FooTable.Class
         * @param {FooTable.Table} table -  The root {@link FooTable.Table} this cell belongs to.
         * @param {FooTable.Row} row - The parent {@link FooTable.Row} this cell belongs to.
         * @param {FooTable.Column} column - The {@link FooTable.Column} this cell falls under.
         * @param {(*|HTMLElement|jQuery)} valueOrElement - Either the value or the element for the cell.
         * @returns {FooTable.Cell}
         * @this FooTable.Cell
         */
        construct: function (table, row, column, valueOrElement) {
            /**
             * The root {@link FooTable.Table} for the cell.
             * @instance
             * @readonly
             * @type {FooTable.Table}
             */
            this.ft = table;
            /**
             * The parent {@link FooTable.Row} for the cell.
             * @instance
             * @readonly
             * @type {FooTable.Row}
             */
            this.row = row;
            /**
             * The {@link FooTable.Column} this cell falls under.
             * @instance
             * @readonly
             * @type {FooTable.Column}
             */
            this.column = column;
            this.created = false;
            this.define(valueOrElement);
        },
        /**
         * This is supplied either the value or the cell element/jQuery object if it exists.
         * If supplied the element we need set the $el property and parse the value from it.
         * @instance
         * @protected
         * @param {(*|jQuery)} valueOrElement - The value or element to define the cell.
         * @this FooTable.Cell
         */
        define: function(valueOrElement){
            /**
             * The jQuery table cell object this instance wraps.
             * @instance
             * @type {jQuery}
             */
            this.$el = F.checker.element(valueOrElement) || F.checker.jq(valueOrElement) ? $(valueOrElement) : null;
            /**
             * The jQuery row object that represents this cell in the details table.
             * @type {jQuery}
             */
            this.$detail = null;

            var hasOptions = F.checker.hash(valueOrElement) && F.checker.hash(valueOrElement.options) && F.checker.defined(valueOrElement.value);

            /**
             * The value of the cell.
             * @instance
             * @type {*}
             */
            this.value = this.column.parser.call(this.column, F.checker.jq(this.$el) ? this.$el : (hasOptions ? valueOrElement.value : valueOrElement), this.ft.o);

            /**
             * Contains any options for the cell. These are the options supplied through the plugin constructor as part of the row object itself.
             * @type {object}
             */
            this.o = $.extend(true, {
                classes: null,
                style: null
            }, hasOptions ? valueOrElement.options : {});
            /**
             * An array of CSS classes for the cell.
             * @instance
             * @protected
             * @type {Array.<string>}
             */
            this.classes = F.checker.jq(this.$el) && this.$el.attr('class') ? this.$el.attr('class').split(/\S+/g) : (F.checker.array(this.o.classes) ? this.o.classes : (F.checker.string(this.o.classes) ? this.o.classes.split(/\S+/g) : []));
            /**
             * The inline styles for the cell.
             * @instance
             * @protected
             * @type {object}
             */
            this.style = F.checker.jq(this.$el) && this.$el.attr('style') ? F.css2json(this.$el.attr('style')) : (F.checker.hash(this.o.style) ? this.o.style : (F.checker.string(this.o.style) ? F.css2json(this.o.style) : {}));
        },
        /**
         * After the cell has been defined this ensures that the $el and #detail properties are jQuery objects by either creating or updating them.
         * @instance
         * @protected
         * @this FooTable.Cell
         */
        $create: function(){
            if (this.created) return;
            (this.$el = F.checker.jq(this.$el) ? this.$el : $('<td/>'))
                .data('value', this.value)
                .contents().detach().end()
                .append(this.format(this.value));

            this._setClasses(this.$el);
            this._setStyle(this.$el);

            this.$detail = $('<tr/>').addClass(this.row.classes.join(' ')).data('__FooTableCell__', this)
                .append($('<th/>', { text: this.column.title }))
                .append($('<td/>'));

            this.created = true;
        },
        /**
         * Collapses this cell and displays it in the details row.
         * @instance
         * @protected
         */
        collapse: function(){
            if (!this.created) return;
            this.$detail.children('td').first()
                .attr('class', this.$el.attr('class'))
                .attr('style', this.$el.attr('style'))
                .css('display', 'table-cell')
                .append(this.$el.contents().detach());

            if (!F.checker.jq(this.$detail.parent()))
                this.$detail.appendTo(this.row.$details.find('.footable-details > tbody'));
        },
        /**
         * Restores this cell from a detail row back into the normal row.
         * @instance
         * @protected
         */
        restore: function(){
            if (!this.created) return;
            if (F.checker.jq(this.$detail.parent())){
                var $cell = this.$detail.children('td').first();
                this.$el
                    .attr('class', $cell.attr('class'))
                    .attr('style', $cell.attr('style'))
                    .css('display', (this.column.hidden || !this.column.visible) ? 'none' : 'table-cell')
                    .append($cell.contents().detach());
            }
            this.$detail.detach();
        },
        /**
         * Helper method to call this cell's column parser function supplying the required parameters.
         * @instance
         * @protected
         * @returns {*}
         * @see FooTable.Column#parser
         * @this FooTable.Cell
         */
        parse: function(){
            return this.column.parser.call(this.column, this.$el, this.ft.o);
        },
        /**
         * Helper method to call this cell's column formatter function using the supplied value and any additional required parameters.
         * @instance
         * @protected
         * @param {*} value - The value to format.
         * @returns {(string|HTMLElement|jQuery)}
         * @see FooTable.Column#formatter
         * @this FooTable.Cell
         */
        format: function(value){
            return this.column.formatter.call(this.column, value, this.ft.o);
        },
        /**
         * Allows easy access to getting or setting the cell's value. If the value is set all associated properties are also updated along with the actual element.
         * Using this method also allows us to supply an object containing options and the value for the cell.
         * @instance
         * @param {*} [value] - The value to set for the cell. If not supplied the current value of the cell is returned.
         * @param {boolean} [redraw=true] - Whether or not to redraw the row once the value has been set.
         * @returns {(*|undefined)}
         * @this FooTable.Cell
         */
        val: function(value, redraw){
            if (F.checker.undef(value)){
                // get
                return this.value;
            }
            // set
            var self = this, hasOptions = F.checker.hash(value) && F.checker.hash(value.options) && F.checker.defined(value.value);
            this.o = $.extend(true, {
                classes: self.classes,
                style: self.style
            }, hasOptions ? value.options : {});

            this.value = hasOptions ? value.value : value;
            this.classes = F.checker.array(this.o.classes) ? this.o.classes : (F.checker.string(this.o.classes) ? this.o.classes.split(/\S+/g) : []);
            this.style = F.checker.hash(this.o.style) ? this.o.style : (F.checker.string(this.o.style) ? F.css2json(this.o.style) : {});

            if (this.created){
                this.$el.data('value', this.value).empty();

                var $detail = this.$detail.children('td').first().empty(),
                    $target = F.checker.jq(this.$detail.parent()) ? $detail : this.$el;

                $target.append(this.format(this.value));

                this._setClasses($target);
                this._setStyle($target);

                if (F.checker.isBoolean(redraw) ? redraw : true) this.row.draw();
            }
        },
        _setClasses: function($el){
            var hasColClasses = !F.checker.emptyArray(this.column.classes),
                hasClasses = !F.checker.emptyArray(this.classes),
                classes = null;
            $el.removeAttr('class');
            if (!hasColClasses && !hasClasses) return;
            if (hasColClasses && hasClasses){
                classes = this.classes.concat(this.column.classes).join(' ');
            } else if (hasColClasses) {
                classes = this.column.classes.join(' ');
            } else if (hasClasses){
                classes = this.classes.join(' ');
            }
            if (!F.checker.emptyString(classes)){
                $el.addClass(classes);
            }
        },
        _setStyle: function($el){
            var hasColStyle = !F.checker.emptyObject(this.column.style),
                hasStyle = !F.checker.emptyObject(this.style),
                style = null;
            $el.removeAttr('style');
            if (!hasColStyle && !hasStyle) return;
            if (hasColStyle && hasStyle){
                style = $.extend({}, this.column.style, this.style);
            } else if (hasColStyle) {
                style = this.column.style;
            } else if (hasStyle){
                style = this.style;
            }
            if (F.checker.hash(style)){
                $el.css(style);
            }
        }
    });

})(jQuery, FooTable);
(function($, F){

    F.Column = F.Class.extend(/** @lends FooTable.Column */{
        /**
         * The column class containing all the properties for columns. All members marked as "readonly" should not be used when defining {@link FooTable.Defaults#columns}.
         * @constructs
         * @extends FooTable.Class
         * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this component belongs to.
         * @param {object} definition - An object containing all the properties to set for the column.
         * @returns {FooTable.Column}
         * @this FooTable.Column
         */
        construct: function(instance, definition){
            /**
             * The root {@link FooTable.Table} for the column.
             * @instance
             * @readonly
             * @type {FooTable.Table}
             */
            this.ft = instance;
            /**
             * The type of data displayed by the column.
             * @instance
             * @readonly
             * @type {string}
             */
            this.type = 'text';
            /**
             * Whether or not the column was parsed from a standard table row containing data instead of from an actual header row.
             * @instance
             * @readonly
             * @type {boolean}
             */
            this.virtual = F.checker.isBoolean(definition.virtual) ? definition.virtual : false;
            /**
             * The jQuery cell object for the column header.
             * @instance
             * @readonly
             * @type {jQuery}
             */
            this.$el = F.checker.jq(definition.$el) ? definition.$el : null;
            /**
             * The index of the column in the table. This is set by the plugin during initialization.
             * @instance
             * @readonly
             * @type {number}
             * @default -1
             */
            this.index = F.checker.number(definition.index) ? definition.index : -1;
            this.define(definition);
            this.$create();
        },
        /**
         * This is supplied the column definition in the form of a simple object created by merging options supplied via the plugin constructor with those parsed from the DOM.
         * @instance
         * @protected
         * @param {object} definition - The object containing the column definition.
         * @this FooTable.Column
         */
        define: function(definition){
            /**
             * Whether or not this column is hidden from view and appears in the details row.
             * @type {boolean}
             * @default false
             */
            this.hidden = F.checker.isBoolean(definition.hidden) ? definition.hidden : false;
            /**
             * Whether or not this column is completely hidden from view and will not appear in the details row.
             * @type {boolean}
             * @default true
             */
            this.visible = F.checker.isBoolean(definition.visible) ? definition.visible : true;

            /**
             * The name of the column. This name must correspond to the property name of the JSON row data.
             * @type {string}
             * @default null
             */
            this.name = F.checker.string(definition.name) ? definition.name : null;
            if (this.name == null) this.name = 'col'+(definition.index+1);
            /**
             * The title to display in the column header, this can be HTML.
             * @type {string}
             * @default null
             */
            this.title = F.checker.string(definition.title) ? definition.title : null;
            if (!this.virtual && this.title == null && F.checker.jq(this.$el)) this.title = this.$el.html();
            if (this.title == null) this.title = 'Column '+(definition.index+1);
            /**
             * The styles to apply to all cells in this column.
             * @type {object}
             */
            this.style = F.checker.hash(definition.style) ? definition.style : (F.checker.string(definition.style) ? F.css2json(definition.style) : {});
            /**
             * The classes to apply to all cells in this column.
             * @type {Array.<string>}
             */
            this.classes = F.checker.array(definition.classes) ? definition.classes : (F.checker.string(definition.classes) ? definition.classes.split(/\S+/g) : []);

            // override any default functions ensuring when they are executed "this" within the context of the function points to the instance of this object.
            this.parser = F.checkFnValue(this, definition.parser, this.parser);
            this.formatter = F.checkFnValue(this, definition.formatter, this.formatter);
        },
        /**
         * After the column has been defined this ensures that the $el property is a jQuery object by either creating or updating the current value.
         * @instance
         * @protected
         * @this FooTable.Column
         */
        $create: function(){
            (this.$el = !this.virtual && F.checker.jq(this.$el) ? this.$el : $('<th/>')).html(this.title);
        },
        /**
         * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and will be provided to the {@link FooTable.Column#format} function
         * to generate the cell contents.
         * @instance
         * @protected
         * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
         * @returns {string}
         * @this FooTable.Column
         */
        parser: function(valueOrElement){
            if (F.checker.jq(valueOrElement)) return valueOrElement.data('value') || valueOrElement.html(); // use jQuery to get the value
            if (F.checker.defined(valueOrElement) && valueOrElement != null) return valueOrElement+''; // use the native toString of the value
            return null; // otherwise we have no value so return null
        },
        /**
         * This is supplied the value retrieved from the {@link FooTable.Column#parse} function and must return a string, HTMLElement or jQuery object.
         * The return value from this function is what is displayed in the cell in the table.
         * @instance
         * @protected
         * @param {string} value - The value to format.
         * @returns {(string|HTMLElement|jQuery)}
         * @this FooTable.Column
         */
        formatter: function(value){
            return value == null ? '' : value;
        },
        /**
         * Creates a cell for this column from the supplied {@link FooTable.Row} object. This allows different column types to return different types of cells.
         * @instance
         * @protected
         * @param {FooTable.Row} row - The row to create the cell from.
         * @returns {FooTable.Cell}
         * @this FooTable.Column
         */
        createCell: function(row){
            var element = F.checker.jq(row.$el) ? row.$el.children('td,th').get(this.index) : null,
                data = F.checker.hash(row.value) ? row.value[this.name] : null;
            return new F.Cell(this.ft, row, this, element || data);
        }
    });

    F.columns = new F.ClassFactory();

})(jQuery, FooTable);
(function ($, F) {
    /**
     * Contains all the available options for the FooTable plugin.
     * @name FooTable.Defaults
     * @function
     * @constructor
     * @returns {FooTable.Defaults}
     */
    F.Defaults = function () {
        /**
         * Whether or not events raised using the {@link FooTable.Table#raise} method are propagated up the DOM. By default this is set to false and all events bubble up the DOM as per usual
         * however the reason for this option is if we have nested tables. If false the parent table would receive all the events raised by it's children and any handlers bound to both the
         * parent and child would be triggered which is not the desired behavior.
         * @type {boolean}
         * @default false
         */
        this.stopPropagation = false;
        /**
         * An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).
         * @type {object.<string, function>}
         * @default NULL
         * @example <caption>This example shows how to pass an object containing the events and handlers.</caption>
         * "on": {
		 * 	"click": function(e){
		 * 		// bind a custom click event to do something whenever the table is clicked
		 * 	},
		 * 	"init.ft.table": function(e, ft){
		 * 		// bind to the FooTable initialize event to do something
		 * 	}
		 * }
         */
        this.on = null;
    };

    /**
     * Contains all the default options for the plugin.
     * @type {FooTable.Defaults}
     */
    F.defaults = new F.Defaults();

})(jQuery, FooTable);
(function($, F){

    F.Row = F.Class.extend(/** @lends FooTable.Row */{
        /**
         * The row class containing all the properties for a row and its' cells.
         * @constructs
         * @extends FooTable.Class
         * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
         * @param {Array.<FooTable.Column>} columns - The array of {@link FooTable.Column} for this row.
         * @param {(*|HTMLElement|jQuery)} dataOrElement - Either the data for the row (create) or the element (parse) for the row.
         * @returns {FooTable.Row}
         */
        construct: function (table, columns, dataOrElement) {
            /**
             * The {@link FooTable.Table} for the row.
             * @type {FooTable.Table}
             */
            this.ft = table;
            /**
             * The array of {@link FooTable.Column} for this row.
             * @type {Array.<FooTable.Column>}
             */
            this.columns = columns;

            this.created = false;
            this.define(dataOrElement);
        },
        /**
         * This is supplied either the object containing the values for the row or the row element/jQuery object if it exists.
         * If supplied the element we need to set the $el property and parse the cells from it using the column index.
         * If we have an object we parse the cells from it using the column name.
         * @param {(object|jQuery)} dataOrElement - The row object or element to define the row.
         */
        define: function(dataOrElement){
            /**
             * The jQuery table row object this instance wraps.
             * @instance
             * @protected
             * @type {jQuery}
             */
            this.$el = F.checker.element(dataOrElement) || F.checker.jq(dataOrElement) ? $(dataOrElement) : null;
            /**
             * The jQuery toggle element for the row.
             * @instance
             * @protected
             * @type {jQuery}
             */
            this.$toggle = $('<span/>', {'class': 'footable-toggle fooicon fooicon-plus'});

            var isObj = F.checker.hash(dataOrElement),
                hasOptions = isObj && F.checker.hash(dataOrElement.options) && F.checker.hash(dataOrElement.value);

            /**
             * The value of the row.
             * @instance
             * @protected
             * @type {Object}
             */
            this.value = isObj ? (hasOptions ? dataOrElement.value : dataOrElement) : null;

            /**
             * Contains any options for the row.
             * @type {object}
             */
            this.o = $.extend(true, {
                expanded: false,
                classes: null,
                style: null
            }, hasOptions ? dataOrElement.options : {});

            /**
             * Whether or not this row is expanded and will display it's detail row when there are any hidden columns.
             * @instance
             * @protected
             * @type {boolean}
             */
            this.expanded = F.checker.jq(this.$el) ? (this.$el.data('expanded') || this.o.expanded) : this.o.expanded;
            /**
             * An array of CSS classes for the row.
             * @instance
             * @protected
             * @type {Array.<string>}
             */
            this.classes = F.checker.jq(this.$el) && this.$el.attr('class') ? this.$el.attr('class').split(/\S+/g) : (F.checker.array(this.o.classes) ? this.o.classes : (F.checker.string(this.o.classes) ? this.o.classes.split(/\S+/g) : []));
            /**
             * The inline styles for the row.
             * @instance
             * @protected
             * @type {object}
             */
            this.style = F.checker.jq(this.$el) && this.$el.attr('style') ? F.css2json(this.$el.attr('style')) : (F.checker.hash(this.o.style) ? this.o.style : (F.checker.string(this.o.style) ? F.css2json(this.o.style) : {}));

            /**
             * The cells array. This is populated before the call to the {@link FooTable.Row#createElement} method.
             * @instance
             * @type {Array.<FooTable.Cell>}
             */
            this.cells = this.createCells();

            // check the value property and build it from the cells if required.
            if (!F.checker.hash(this.value) || F.checker.emptyObject(this.value)){
                var val = {};
                F.arr.each(self.cells, function(cell){
                    val[cell.column.name] = cell.val();
                });
                this.value = val;
            }
        },
        /**
         * After the row has been defined this ensures that the $el property is a jQuery object by either creating or updating the current value.
         * @instance
         * @protected
         * @this FooTable.Row
         */
        $create: function(){
            if (this.created) return;
            (this.$el = F.checker.jq(this.$el) ? this.$el : $('<tr/>'))
                .data('__FooTableRow__', this);

            this._setClasses(this.$el);
            this._setStyle(this.$el);

            if (this.ft.rows.toggleColumn == 'last') this.$toggle.addClass('last-column');

            this.$details = $('<tr/>', { 'class': 'footable-detail-row' })
                .append($('<td/>', { colspan: this.ft.columns.visibleColspan })
                    .append($('<table/>', { 'class': 'footable-details ' + this.ft.classes.join(' ') })
                        .append('<tbody/>')));

            $('.rte-container th').each(function(){
                $(this).html($(this).text());
            });

            var self = this;
            F.arr.each(self.cells, function(cell){
                if (!cell.created) cell.$create();
                self.$el.append(cell.$el);
            });
            self.$el.off('click.ft.row').on('click.ft.row', { self: self }, self._onToggle);
            this.created = true;
        },
        /**
         * This is called during the construct method and uses the current column definitions to create an array of {@link FooTable.Cell} objects for the row.
         * @instance
         * @protected
         * @returns {Array.<FooTable.Cell>}
         * @this FooTable.Row
         */
        createCells: function(){
            var self = this;
            return F.arr.map(self.columns, function(col){
                return col.createCell(self);
            });
        },
        /**
         * Allows easy access to getting or setting the row's data. If the data is set all associated properties are also updated along with the actual element.
         * Using this method also allows us to supply an object containing options and the data for the row at the same time.
         * @instance
         * @param {object} [data] - The data to set for the row. If not supplied the current value of the row is returned.
         * @returns {(*|undefined)}
         * @this FooTable.Row
         */
        val: function(data){
            if (!F.checker.hash(data)){
                // get
                return this.value;
            }
            // set
            this.collapse(false);
            var self = this,
                isObj = F.checker.hash(data),
                hasOptions = isObj && F.checker.hash(data.options) && F.checker.hash(data.value);

            this.o = $.extend(true, {
                expanded: self.expanded,
                classes: self.classes,
                style: self.style
            }, hasOptions ? data.options : {});

            this.expanded = this.o.expanded;
            this.classes = F.checker.array(this.o.classes) ? this.o.classes : (F.checker.string(this.o.classes) ? this.o.classes.split(/\S+/g) : []);
            this.style = F.checker.hash(this.o.style) ? this.o.style : (F.checker.string(this.o.style) ? F.css2json(this.o.style) : {});

            var value = hasOptions ? data.value : data;
            F.arr.each(this.cells, function(cell){
                if (F.checker.defined(value[cell.column.name])) cell.val(value[cell.column.name], false);
            });

            if (this.created){
                this._setClasses(this.$el);
                this._setStyle(this.$el);
                this.draw();
            }
        },
        _setClasses: function($el){
            var hasClasses = !F.checker.emptyArray(this.classes),
                classes = null;
            $el.removeAttr('class');
            if (!hasClasses) return;
            else classes = this.classes.join(' ');
            if (!F.checker.emptyString(classes)){
                $el.addClass(classes);
            }
        },
        _setStyle: function($el){
            var hasStyle = !F.checker.emptyObject(this.style),
                style = null;
            $el.removeAttr('style');
            if (!hasStyle) return;
            else style = this.style;
            if (F.checker.hash(style)){
                $el.css(style);
            }
        },
        /**
         * Sets the current row to an expanded state displaying any hidden columns in a detail row just below it.
         * @instance
         * @this FooTable.Row
         */
        expand: function(){
            if (!this.created) return;
            this.__hidden__ = F.arr.map(this.cells, function(cell){
                return cell.column.hidden && cell.column.visible ? cell : null;
            });

            if (this.__hidden__.length > 0){
                this.$details.insertAfter(this.$el)
                    .children('td').first()
                    .attr('colspan', this.ft.columns.visibleColspan);

                F.arr.each(this.__hidden__, function(cell){
                    cell.collapse();
                });
            }
            this.$el.attr('data-expanded', true);
            this.$toggle.removeClass('fooicon-plus').addClass('fooicon-minus');
            this.expanded = true;
        },
        /**
         * Sets the current row to a collapsed state removing the detail row if it exists.
         * @instance
         * @this FooTable.Row
         */
        collapse: function(setExpanded){
            if (!this.created) return;
            F.arr.each(this.__hidden__, function(cell){
                cell.restore();
            });
            this.$details.detach();
            this.$el.removeAttr('data-expanded');
            this.$toggle.removeClass('fooicon-minus').addClass('fooicon-plus');
            if (F.checker.isBoolean(setExpanded) ? setExpanded : true) this.expanded = false;
        },
        /**
         * Prior to drawing this moves the details contents back to there original cells and detaches the toggle element from the row.
         * @instance
         * @this FooTable.Row
         */
        predraw: function(){
            if (this.created){
                if (this.expanded){
                    this.collapse(false);
                }
                this.$toggle.detach();
                this.$el.detach();
            }
        },
        /**
         * Draws the current row and cells.
         * @instance
         * @this FooTable.Row
         */
        draw: function($parent){
            if (!this.created) this.$create();
            $parent.append(this.$el);
            var self = this;
            F.arr.each(self.cells, function(cell){
                cell.$el.css('display', (cell.column.hidden || !cell.column.visible  ? 'none' : 'table-cell'));
                if (self.ft.rows.showToggle && self.ft.columns.hasHidden){
                    if ((self.ft.rows.toggleColumn == 'first' && cell.column.index == self.ft.columns.firstVisibleIndex)
                        || (self.ft.rows.toggleColumn == 'last' && cell.column.index == self.ft.columns.lastVisibleIndex)) {
                        cell.$el.prepend(self.$toggle);
                    }
                }
            });
            if (this.expanded){
                this.expand();
            }
        },
        /**
         * Toggles the row between it's expanded and collapsed state if there are hidden columns.
         * @instance
         * @this FooTable.Row
         */
        toggle: function(){
            if (this.created && this.ft.columns.hasHidden){
                if (this.expanded) this.collapse();
                else this.expand();
            }
        },
        /**
         * Handles the toggle click event for rows.
         * @instance
         * @param {jQuery.Event} e - The jQuery.Event object for the click event.
         * @private
         * @this jQuery
         */
        _onToggle: function (e) {
            var self = e.data.self;
            // only execute the toggle if the event.target is one of the approved initiators
            if ($(e.target).is('tr,td,.footable-toggle')){
                self.toggle();
            }
        }
    });

})(jQuery, FooTable);
(function ($, F) {

    /**
     * An array of all currently loaded instances of the plugin.
     * @protected
     * @readonly
     * @type {Array.<FooTable.Table>}
     */
    F.instances = [];

    F.Table = F.Class.extend(/** @lends FooTable.Table */{
        /**
         * This class is the core of the plugin and drives the logic of all components.
         * @constructs
         * @this FooTable.Table
         * @extends FooTable.Class
         * @param {(HTMLTableElement|jQuery)} element - The element or jQuery table object to bind the plugin to.
         * @param {object} options - The options to initialize the plugin with.
         * @param {function} [ready] - A callback function to execute once the plugin is initialized.
         * @returns {FooTable.Table}
         */
        construct: function (element, options, ready) {
            //BEGIN MEMBERS
            /**
             * The timeout ID for the resize event.
             * @instance
             * @private
             * @type {?number}
             */
            this._resizeTimeout = null;
            /**
             * The ID of the FooTable instance.
             * @instance
             * @type {number}
             */
            this.id = F.instances.push(this);
            /**
             * Whether or not the plugin and all components and add-ons are fully initialized.
             * @instance
             * @type {boolean}
             */
            this.initialized = false;
            /**
             * The jQuery table object the plugin is bound to.
             * @instance
             * @type {jQuery}
             */
            this.$el = (F.checker.jq(element) ? element : $(element)).first(); // ensure one table, one instance
            /**
             * The options for the plugin. This is a merge of user defined options and the default options.
             * @instance
             * @type {object}
             */
            this.o = $.extend(true, {}, F.defaults, options);
            /**
             * An array of all CSS classes on the table that do not start with "footable".
             * @instance
             * @protected
             * @type {Array.<string>}
             */
            this.classes = [];
            /**
             * The breakpoints component for this instance of the plugin.
             * @instance
             * @type {FooTable.Breakpoints}
             */
            this.breakpoints = F.components.internal.make('breakpoints', this);
            /**
             * The columns component for this instance of the plugin.
             * @instance
             * @type {FooTable.Columns}
             */
            this.columns = F.components.internal.make('columns', this);
            /**
             * The rows component for this instance of the plugin.
             * @instance
             * @type {FooTable.Rows}
             */
            this.rows = F.components.internal.make('rows', this);
            /**
             * All components for this instance of the plugin. These are executed in the order they appear in the array for the initialize phase and in reverse order for the destroy phase of the plugin.
             * @instance
             * @protected
             * @type {object}
             * @prop {Array.<FooTable.Component>} internal - The internal components for the plugin. These are executed either before all other components in the initialize phase or after them in the destroy phase of the plugin.
             * @prop {Array.<FooTable.Component>} core - The core components for the plugin. These are executed either after the internal components in the initialize phase or before them in the destroy phase of the plugin.
             * @prop {Array.<FooTable.Component>} custom - The custom components for the plugin. These are executed either after the core components in the initialize phase or before them in the destroy phase of the plugin.
             */
            this.components = {
                internal: [this.breakpoints, this.columns, this.rows],
                core: F.components.core.load(this),
                custom: F.components.load(this)
            };

            //END MEMBERS
            var self = this;
            self._preinit().then(function(){
                return self._init().then(function(){
                    if (F.checker.fn(ready)) ready.call(self, self);
                });
            }, function (err) {
                if (F.checker.error(err)){
                    console.error('FooTable: unhandled error thrown during initialization.', err);
                }
            });
        },
        /**
         * The preinit method is called prior to the plugins actual initialization and provides itself and it's components an opportunity to parse any additional option values.
         * @instance
         * @private
         * @returns {jQuery.Promise}
         * @fires FooTable.Table#"preinit.ft.table"
         */
        _preinit: function(){
            var self = this;
            /**
             * The preinit.ft.table event is raised before any components.
             * Calling preventDefault on this event will disable the entire plugin.
             * @event FooTable.Table#"preinit.ft.table"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            return this.raise('preinit.ft.table').then(function(){
                var classes = self.$el.attr('class').match(/\S+/g),
                    data = self.$el.data() || {};

                self.o.ajax = F.checkFnValue(self, data.ajax, self.o.ajax);
                self.o.stopPropagation = F.checker.isBoolean(data.stopPropagation)
                    ? data.stopPropagation
                    : self.o.stopPropagation;

                for (var i = 0, len = classes.length; i < len; i++){
                    if (!F.str.startsWith(classes[i], 'footable')) self.classes.push(classes[i]);
                }
                var $loader = $('<div/>', { 'class': 'footable-loader' }).append($('<span/>', {'class': 'fooicon fooicon-loader'}));
                self.$el.hide().after($loader);
                return self.execute(false, false, 'preinit', data).always(function(){
                    self.$el.show();
                    $loader.remove();
                });
            });
        },
        /**
         * Initializes this instance of the plugin and calls the callback function if one is supplied once complete.
         * @this FooTable.Table
         * @instance
         * @private
         * @return {jQuery.Promise}
         * @fires FooTable.Table#"init.ft.table"
         */
        _init: function(){
            var self = this;
            /**
             * The init.ft.table event is raised before any components are initialized.
             * Calling preventDefault on this event will disable the entire plugin.
             * @event FooTable.Table#"init.ft.table"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            return self.raise('init.ft.table').then(function(){
                var $thead = self.$el.children('thead'),
                    $tbody = self.$el.children('tbody'),
                    $tfoot = self.$el.children('tfoot');
                self.$el.addClass('footable footable-' + self.id);
                if (F.checker.hash(self.o.on)) self.$el.on(self.o.on);
                if ($tfoot.length == 0) self.$el.append($tfoot = $('<tfoot/>'));
                if ($tbody.length == 0) self.$el.append('<tbody/>');
                if ($thead.length == 0) self.$el.prepend($thead = $('<thead/>'));
                return self.execute(false, true, 'init').then(function(){
                    self.$el.data('__FooTable__', self);
                    if ($tfoot.children('tr').length == 0) $tfoot.remove();
                    if ($thead.children('tr').length == 0) $thead.remove();
                    return self.draw().then(function(){
                        $(window).off('resize.ft'+self.id, self._onWindowResize)
                            .on('resize.ft'+self.id, { self: self }, self._onWindowResize);
                        self.initialized = true;
                    });
                });
            });
        },
        /**
         * Destroys this plugin removing it from the table.
         * @this FooTable.Table
         * @instance
         * @fires FooTable.Table#"destroy.ft.table"
         */
        destroy: function () {
            var self = this;
            /**
             * The destroy.ft.table event is called before all core components.
             * Calling preventDefault on this event will prevent the entire plugin from being destroyed.
             * @event FooTable.Table#"destroy.ft.table"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            return self.raise('destroy.ft.table').then(function(){
                return self.execute(true, true, 'destroy').then(function () {
                    self.$el.removeData('__FooTable__');
                    if (F.checker.hash(self.o.on)) self.$el.off(self.o.on);
                    self.initialized = false;
                });
            },function(err){
                if (F.checker.error(err)){
                    console.error('FooTable: unhandled error thrown while destroying the plugin.', err);
                }
            });
        },
        /**
         * Raises an event on this instance supplying the args array as additional parameters to the handlers.
         * @this FooTable.Table
         * @instance
         * @param {string} eventName - The name of the event to raise, this can include namespaces.
         * @param {Array} [args] - An array containing additional parameters to be passed to any bound handlers.
         * @returns {jQuery.Event}
         */
        raise: function(eventName, args){
            var self = this,
                debug = F.__debug__ && (F.checker.emptyArray(F.__debug_options__.events) || F.arr.any(F.__debug_options__.events, function(name){ return F.str.contains(eventName, name); }));
            args = args || [];
            args.unshift(this);
            return $.Deferred(function(d){
                var evt = $.Event(eventName);
                if (self.o.stopPropagation == true){
                    self.$el.one(eventName, function (e) {e.stopPropagation();});
                }
                if (debug) console.log('FooTable:'+eventName+': ', args);
                self.$el.trigger(evt, args);
                if (evt.isDefaultPrevented()){
                    if (debug) console.log('FooTable: default prevented for the "'+eventName+'" event.');
                    d.reject(evt);
                }	else d.resolve(evt);
            });
        },
        /**
         * Attempts to retrieve the instance of the supplied component type for this instance.
         * @this FooTable.Table
         * @instance
         * @param {object} type - The content type to retrieve for this instance.
         * @returns {(*|null)}
         */
        use: function(type){
            var components = this.components.internal.concat(this.components.core, this.components.custom);
            for (var i = 0, len = components.length; i < len; i++){
                if (components[i] instanceof type) return components[i];
            }
            return null;
        },
        /**
         * Performs the drawing of the table.
         * @this FooTable.Table
         * @instance
         * @protected
         * @returns {jQuery.Promise}
         * @fires FooTable.Table#"predraw.ft.table"
         * @fires FooTable.Table#"draw.ft.table"
         * @fires FooTable.Table#"postdraw.ft.table"
         */
        draw: function () {
            var self = this;
            // when drawing the order that the components are executed is important so chain the methods but use promises to retain async safety.
            return self.execute(false, true, 'predraw').then(function(){
                /**
                 * The predraw.ft.table event is raised after all core components and add-ons have executed there predraw functions but before they execute there draw functions.
                 * @event FooTable.Table#"predraw.ft.table"
                 * @param {jQuery.Event} e - The jQuery.Event object for the event.
                 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                 */
                return self.raise('predraw.ft.table').then(function(){
                    return self.execute(false, true, 'draw').then(function(){
                        /**
                         * The draw.ft.table event is raised after all core components and add-ons have executed there draw functions.
                         * @event FooTable.Table#"draw.ft.table"
                         * @param {jQuery.Event} e - The jQuery.Event object for the event.
                         * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                         */
                        return self.raise('draw.ft.table').then(function(){
                            return self.execute(false, true, 'postdraw').then(function(){
                                /**
                                 * The postdraw.ft.table event is raised after all core components and add-ons have executed there postdraw functions.
                                 * @event FooTable.Table#"postdraw.ft.table"
                                 * @param {jQuery.Event} e - The jQuery.Event object for the event.
                                 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                                 */
                                self.raise('postdraw.ft.table');
                            });
                        });
                    });
                });
            }, function(err){
                if (F.checker.error(err)){
                    console.error('FooTable: unhandled error thrown during a draw operation.', err);
                }
            });
        },
        /**
         * Executes the specified method with the optional number of parameters on all components and waits for the promise from each to be resolved before executing the next.
         * @this FooTable.Table
         * @instance
         * @protected
         * @param {boolean} reverse - Whether or not to execute the component methods in the reverse order to what they were registered in.
         * @param {boolean} enabled - Whether or not to execute the method on enabled components only.
         * @param {string} methodName - The name of the method to execute.
         * @param {*} [param1] - The first parameter for the method.
         * @param {...*} [paramN] - Any number of additional parameters for the method.
         * @returns {jQuery.Promise}
         */
        execute: function(reverse, enabled, methodName, param1, paramN){
            var self = this, args = Array.prototype.slice.call(arguments);
            reverse = args.shift();
            enabled = args.shift();
            var internal = self.components.internal.slice(0),
                core = enabled ? F.arr.get(self.components.core, function(c){ return c.enabled; }) : self.components.core.slice(0),
                custom = enabled ? F.arr.get(self.components.custom, function(c){ return c.enabled; }) : self.components.custom.slice(0);

            args.unshift(reverse ? custom.reverse() : internal);
            return self._execute.apply(self, args).then(function(){
                args.shift();
                args.unshift(reverse ? core.reverse() : core);
                return self._execute.apply(self, args).then(function(){
                    args.shift();
                    args.unshift(reverse ? internal.reverse() : custom);
                    return self._execute.apply(self, args);
                });
            });
        },
        /**
         * Executes the specified method with the optional number of parameters on all supplied components waiting for the result of each before executing the next.
         * @this FooTable.Table
         * @instance
         * @private
         * @param {Array.<FooTable.Component>} components - The components to call the method on.
         * @param {string} methodName - The name of the method to execute
         * @param {*} [param1] - The first parameter for the method.
         * @param {...*} [paramN] - Any additional parameters for the method.
         * @returns {jQuery.Promise}
         */
        _execute: function(components, methodName, param1, paramN){
            if (!components || !components.length) return $.when();
            var self = this, args = Array.prototype.slice.call(arguments),
                component;
            components = args.shift();
            methodName = args.shift();
            component = components.shift();

            if (!F.checker.fn(component[methodName]))
                return self._execute.apply(self, [components, methodName].concat(args));

            return $.Deferred(function(d){
                try {
                    var result = component[methodName].apply(component, args);
                    if (F.checker.promise(result)){
                        return result.then(d.resolve, d.reject);
                    } else {
                        d.resolve(result);
                    }
                } catch (err) {
                    d.reject(err);
                }
            }).then(function(){
                return self._execute.apply(self, [components, methodName].concat(args));
            });
        },
        /**
         * Listens to the window resize event and performs a check to see if the breakpoint has changed.
         * @this window
         * @instance
         * @private
         * @fires FooTable.Table#"resize.ft.table"
         */
        _onWindowResize: function (e) {
            var self = e.data.self;
            if (self._resizeTimeout != null) { clearTimeout(self._resizeTimeout); }
            self._resizeTimeout = setTimeout(function () {
                self._resizeTimeout = null;
                /**
                 * The resize event is raised a short time after window resize operations cease.
                 * @event FooTable.Table#"resize.ft.table"
                 * @param {jQuery.Event} e - The jQuery.Event object for the event.
                 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                 */
                self.raise('resize.ft.table').then(function(){
                    self.breakpoints.check();
                });
            }, 300);
        }
    });

})(jQuery, FooTable);
(function($, F){

    if (F.checker.undef(window.moment)){
        // The DateColumn requires moment.js to parse and format date values. Goto http://momentjs.com/ to get it.
        return;
    }

    F.DateColumn = F.Column.extend(/** @lends FooTable.DateColumn */{
        /**
         * The date column class is used to handle date values. This column is dependent on [moment.js]{@link http://momentjs.com/} to provide date parsing and formatting functionality.
         * @constructs
         * @extends FooTable.Column
         * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
         * @param {object} definition - An object containing all the properties to set for the column.
         * @returns {FooTable.DateColumn}
         */
        construct: function(instance, definition){
            this._super(instance, definition);
            this.type = 'date';
            /**
             * The format string to use when parsing and formatting dates.
             * @instance
             * @type {string}
             */
            this.formatString = F.checker.string(definition.formatString) ? definition.formatString : 'MM-DD-YYYY';
        },
        /**
         * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and will be provided to the {@link FooTable.DateColumn#format} function
         * to generate the cell contents.
         * @instance
         * @protected
         * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
         * @returns {(moment|null)}
         * @this FooTable.DateColumn
         */
        parser: function(valueOrElement){
            if (F.checker.jq(valueOrElement)){
                valueOrElement = valueOrElement.data('value') || valueOrElement.text();
                if (F.checker.string(valueOrElement)) valueOrElement = isNaN(valueOrElement) ? valueOrElement : +valueOrElement;
            }
            if (F.checker.date(valueOrElement)) return moment(valueOrElement);
            if (F.checker.object(valueOrElement) && F.checker.isBoolean(valueOrElement._isAMomentObject)) return valueOrElement;
            if (F.checker.string(valueOrElement)){
                // if it looks like a number convert it and do nothing else otherwise create a new moment using the string value and formatString
                if (isNaN(valueOrElement)){
                    return moment(valueOrElement, this.formatString);
                } else {
                    valueOrElement = +valueOrElement;
                }
            }
            if (F.checker.number(valueOrElement)){
                return moment(valueOrElement);
            }
            return null;
        },
        /**
         * This is supplied the value retrieved from the {@link FooTable.DateColumn#parser} function and must return a string, HTMLElement or jQuery object.
         * The return value from this function is what is displayed in the cell in the table.
         * @instance
         * @protected
         * @param {*} value - The value to format.
         * @returns {(string|HTMLElement|jQuery)}
         * @this FooTable.DateColumn
         */
        formatter: function(value){
            return F.checker.object(value) && F.checker.isBoolean(value._isAMomentObject) ? value.format(this.formatString) : '';
        },
        /**
         * This is supplied either the cell value or jQuery object to parse. A string value must be returned from this method and will be used during filtering operations.
         * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
         * @returns {string}
         * @this FooTable.DateColumn
         */
        filterValue: function(valueOrElement){
            // if we have an element or a jQuery object use jQuery to get the value
            if (F.checker.element(valueOrElement) || F.checker.jq(valueOrElement)) valueOrElement = $(valueOrElement).data('filterValue') || $(valueOrElement).text();
            // if options are supplied with the value
            if (F.checker.hash(valueOrElement) && F.checker.hash(valueOrElement.options)){
                if (F.checker.string(valueOrElement.options.filterValue)) valueOrElement = valueOrElement.options.filterValue;
                if (F.checker.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
            }
            // if the value is a moment object just return the formatted value
            if (F.checker.object(valueOrElement) && F.checker.isBoolean(valueOrElement._isAMomentObject)) return valueOrElement.format(this.formatString);
            // if its a string
            if (F.checker.string(valueOrElement)){
                // if its not a number return it
                if (isNaN(valueOrElement)){
                    return valueOrElement;
                } else { // otherwise convert it and carry on
                    valueOrElement = +valueOrElement;
                }
            }
            // if the value is a number or date convert to a moment object and return the formatted result.
            if (F.checker.number(valueOrElement) || F.checker.date(valueOrElement)){
                return moment(valueOrElement).format(this.formatString);
            }
            // try use the native toString of the value if its not undefined or null
            if (F.checker.defined(valueOrElement) && valueOrElement != null) return valueOrElement+'';
            return ''; // otherwise we have no value so return an empty string
        }
    });

    F.columns.register('date', F.DateColumn);

})(jQuery, FooTable);
(function($, F){

    F.NumberColumn = F.Column.extend(/** @lends FooTable.NumberColumn */{
        /**
         * The number column class is used to handle simple number columns.
         * @constructs
         * @extends FooTable.Column
         * @param {FooTable.Table} instance -  The parent {@link FooTable.Table} this column belongs to.
         * @param {object} definition - An object containing all the properties to set for the column.
         * @returns {FooTable.TextColumn}
         */
        construct: function(instance, definition){
            this._super(instance, definition);
            this.type = 'number';
        },
        /**
         * This is supplied either the cell value or jQuery object to parse. Any value can be returned from this method and will be provided to the {@link FooTable.DateColumn#format} function
         * to generate the cell contents.
         * @instance
         * @protected
         * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
         * @returns {(number|null)}
         * @this FooTable.NumberColumn
         */
        parser: function(valueOrElement){
            if (F.checker.jq(valueOrElement)){
                valueOrElement = valueOrElement.data('value') || valueOrElement.text().replace(/[^0-9.\-]/g, '');
            }
            if (F.checker.string(valueOrElement)) valueOrElement = parseFloat(valueOrElement);
            if (F.checker.number(valueOrElement)) return valueOrElement;
            return null;
        }
    });

    F.columns.register('number', F.NumberColumn);

})(jQuery, FooTable);
(function ($, F) {

    F.Component = F.Class.extend(/** @lends FooTable.Component */{
        /**
         * The base class for all FooTable components.
         * @constructs
         * @extends FooTable.Class
         * @param {FooTable.Table} instance - The parent {@link FooTable.Table} object for the component.
         * @throws {TypeError} The instance parameter must be an instance of {@link FooTable.Table}.
         * @returns {FooTable.Component}
         */
        construct: function (instance, enabled) {
            if (!(instance instanceof F.Table))
                throw new TypeError('The instance parameter must be an instance of FooTable.Table.');

            /**
             * The parent {@link FooTable.Table} for the component.
             * @type {FooTable.Table}
             */
            this.ft = instance;
            /**
             * Whether or not this component is enabled. Disabled components only have there preinit method called allowing for this value to be overridden.
             * @type {boolean}
             */
            this.enabled = F.checker.isBoolean(enabled) ? enabled : false;
        },
        /**
         * The preinit method is called during the parent {@link FooTable.Table} constructor call.
         * @param {object} data - The jQuery.data() object of the root table.
         * @instance
         * @protected
         * @function
         */
        preinit: null,
        /**
         * The init method is called during the parent {@link FooTable.Table} constructor call.
         * @instance
         * @protected
         * @function
         */
        init: null,
        /**
         * This method is called from the {@link FooTable.Table#destroy} method.
         * @instance
         * @protected
         */
        destroy: null,
        /**
         * This method is called from the {@link FooTable.Table#draw} method.
         * @instance
         * @protected
         * @function
         */
        predraw: null,
        /**
         * This method is called from the {@link FooTable.Table#draw} method.
         * @instance
         * @protected
         * @function
         */
        draw: null,
        /**
         * This method is called from the {@link FooTable.Table#draw} method.
         * @instance
         * @protected
         * @function
         */
        postdraw: null
    });

    F.components = new F.ClassFactory();
    F.components.core = new F.ClassFactory();
    F.components.internal = new F.ClassFactory();

})(jQuery, FooTable);
(function($, F){

    F.Breakpoint = F.Class.extend(/** @lends FooTable.Breakpoint */{
        /**
         * The breakpoint class containing the name and maximum width for the breakpoint.
         * @constructs
         * @extends FooTable.Class
         * @param {string} name - The name of the breakpoint. Must contain no spaces or special characters.
         * @param {number} width - The width of the breakpoint in pixels.
         * @returns {FooTable.Breakpoint}
         */
        construct: function(name, width){
            /**
             * The name of the breakpoint.
             * @type {string}
             */
            this.name = name;
            /**
             * The maximum width of the breakpoint in pixels.
             * @type {number}
             */
            this.width = width;
        }
    });

})(jQuery, FooTable);
(function($, F){
    F.Breakpoints = F.Component.extend(/** @lends FooTable.Breakpoints */{
        /**
         * Contains the logic to calculate and apply breakpoints for the plugin.
         * @constructs
         * @extends FooTable.Component
         * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
         * @returns {FooTable.Breakpoints}
         */
        construct: function(table){
            // call the base class constructor
            this._super(table, true);

            /* PROTECTED */
            /**
             * This provides a shortcut to the {@link FooTable.Table#options} object.
             * @protected
             * @type {FooTable.Table#options}
             */
            this.o = table.o;

            /* PUBLIC */
            /**
             * The current breakpoint.
             * @type {FooTable.Breakpoint}
             */
            this.current = null;
            /**
             * An array of {@link FooTable.Breakpoint} objects created from parsing the options.
             * @type {Array.<FooTable.Breakpoint>}
             */
            this.array = [];
            /**
             * Whether or not breakpoints cascade. When set to true all breakpoints larger than the current will be hidden along with it.
             * @type {boolean}
             */
            this.cascade = this.o.cascade;
            /**
             * This value is updated each time the current breakpoint changes and contains a space delimited string of the names of the current breakpoint and all those smaller than it.
             * @type {string}
             */
            this.hidden = null;

            /* PRIVATE */
            /**
             * This value is set once when the {@link FooTable.Breakpoints#array} is generated and contains a space delimited string of all the breakpoint class names.
             * @type {string}
             * @private
             */
            this._classNames = '';

            // check if a function was supplied to override the default getWidth
            this.getWidth = F.checkFnValue(this, this.o.getWidth, this.getWidth);
        },

        /* PROTECTED */
        /**
         * Checks the supplied data and options for the breakpoints component.
         * @instance
         * @protected
         * @param {object} data - The jQuery data object from the parent table.
         * @fires FooTable.Breakpoints#"preinit.ft.breakpoints"
         */
        preinit: function(data){
            var self = this;
            /**
             * The preinit.ft.breakpoints event is raised before any UI is created and provides the tables jQuery data object for additional options parsing.
             * Calling preventDefault on this event will disable the entire plugin.
             * @event FooTable.Breakpoints#"preinit.ft.breakpoints"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {object} data - The jQuery data object of the table raising the event.
             */
            return this.ft.raise('preinit.ft.breakpoints', [data]).then(function(){
                self.cascade = F.checker.isBoolean(data.cascade) ? data.cascade : self.cascade;
                self.o.breakpoints = F.checker.hash(data.breakpoints) ? data.breakpoints : self.o.breakpoints;
                self.getWidth = F.checkFnValue(self, data.getWidth, self.getWidth);
                if (self.o.breakpoints == null) self.o.breakpoints = { "xs": 480, "sm": 768, "md": 992, "lg": 1200 };
                // Create a nice friendly array to work with out of the breakpoints object.
                for (var name in self.o.breakpoints) {
                    if (!self.o.breakpoints.hasOwnProperty(name)) continue;
                    self.array.push(new F.Breakpoint(name, self.o.breakpoints[name]));
                    self._classNames += 'breakpoint-' + name + ' ';
                }
                // Sort the breakpoints so the largest is checked first
                self.array.sort(function (a, b) {
                    return b.width - a.width;
                });
            });
        },
        /**
         * Initializes the class parsing the options into a sorted array of {@link FooTable.Breakpoint} objects.
         * @instance
         * @protected
         * @fires FooTable.Breakpoints#"init.ft.breakpoints"
         */
        init: function(){
            var self = this;
            /**
             * The init.ft.breakpoints event is raised before any UI is generated.
             * Calling preventDefault on this event will disable the entire plugin.
             * @event FooTable.Breakpoints#"init.ft.breakpoints"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            return this.ft.raise('init.ft.breakpoints').then(function(){
                self.current = self.get();
            });
        },
        /**
         * Whenever the table is drawn this ensures the correct breakpoint class is applied to the table.
         * @instance
         * @protected
         */
        draw: function(){
            this.ft.$el.removeClass(this._classNames).addClass('breakpoint-' + this.current.name);
        },

        /* PUBLIC */
        /**
         * Calculates the current breakpoint from the {@link FooTable.Breakpoints#array} and sets the {@link FooTable.Breakpoints#current} property.
         * @instance
         * @returns {FooTable.Breakpoint}
         */
        calculate: function(){
            var self = this, current = null, hidden = [], breakpoint, prev = null, width = self.getWidth();
            for (var i = 0, len = self.array.length; i < len; i++) {
                breakpoint = self.array[i];
                // if the width is smaller than the smallest breakpoint set the smallest as the current.
                // if the width is larger than the largest breakpoint set the largest as the current.
                // otherwise if the width is somewhere in between check all breakpoints testing if the width
                // is greater than the current but smaller than the previous.
                if ((!current && i == len -1)
                    || (width >= breakpoint.width && (prev instanceof F.Breakpoint ? width <= prev.width : true))) {
                    current = breakpoint;
                }
                if (!current) hidden.push(breakpoint.name);
                prev = breakpoint;
            }
            hidden.push(current.name);
            self.hidden = hidden.join(' ');
            return current;
        },
        /**
         * Supplied a columns breakpoints this returns a boolean value indicating whether or not the column is visible.
         * @param {string} breakpoints - A space separated string of breakpoint names.
         * @returns {boolean}
         */
        visible: function(breakpoints){
            if (F.checker.emptyString(breakpoints)) return true;
            if (breakpoints === 'all') return false;
            var parts = breakpoints.split(' '), i = 0, len = parts.length;
            for (; i < len; i++){
                if (this.cascade ? F.str.containsWord(this.hidden, parts[i]) : parts[i] == this.current.name) return false;
            }
            return true;
        },
        /**
         * Performs a check between the current breakpoint and the previous breakpoint and performs a redraw if they differ.
         * @instance
         * @fires FooTable.Breakpoints#"before.ft.breakpoints"
         * @fires FooTable.Breakpoints#"after.ft.breakpoints"
         */
        check: function(){
            var self = this, bp = self.get();
            if (!(bp instanceof F.Breakpoint)
                || bp == self.current)
                return;

            /**
             * The before.ft.breakpoints event is raised if the breakpoint has changed but before the UI is redrawn and is supplied both the current breakpoint
             * and the next "new" one that is about to be applied.
             * Calling preventDefault on this event will prevent the next breakpoint from being applied.
             * @event FooTable.Breakpoints#"before.ft.breakpoints"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {FooTable.Breakpoint} current - The current breakpoint.
             * @param {FooTable.Breakpoint} next - The breakpoint that is about to be applied.
             */
            self.ft.raise('before.ft.breakpoints', [self.current, bp]).then(function(){
                var previous = self.current;
                self.current = bp;
                return self.ft.draw().then(function(){
                    /**
                     * The after.ft.breakpoints event is raised after the breakpoint has changed and the UI is redrawn and is supplied both the "new" current breakpoint
                     * and the previous one that was replaced.
                     * @event FooTable.Breakpoints#"after.ft.breakpoints"
                     * @param {jQuery.Event} e - The jQuery.Event object for the event.
                     * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                     * @param {FooTable.Breakpoint} current - The current breakpoint.
                     * @param {FooTable.Breakpoint} previous - The breakpoint that was just replaced.
                     */
                    self.ft.raise('after.ft.breakpoints', [self.current, previous]);
                });
            });
        },
        /**
         * Attempts to return a {@link FooTable.Breakpoint} instance when passed a {@link FooTable.Breakpoint},
         * the {@link FooTable.Breakpoint#name} string or if nothing is supplied the current breakpoint.
         * @instance
         * @param {(FooTable.Breakpoint|string|number)} [breakpoint] - The breakpoint to retrieve.
         * @returns {FooTable.Breakpoint}
         */
        get: function(breakpoint){
            if (F.checker.undef(breakpoint)) return this.calculate();
            if (breakpoint instanceof F.Breakpoint) return breakpoint;
            if (F.checker.string(breakpoint)) return F.arr.first(this.array, function (bp) { return bp.name == breakpoint; });
            if (F.checker.number(breakpoint)) return breakpoint >= 0 && breakpoint < this.array.length ? this.array[breakpoint] : null;
            return null;
        },
        /**
         * Gets the width used to determine breakpoints whether it be from the viewport, parent or a custom function.
         * @instance
         * @returns {number}
         */
        getWidth: function(){
            if (F.checker.fn(this.o.getWidth)) return this.o.getWidth(this.ft);
            if (this.o.useParentWidth == true) return this.getParentWidth();
            return this.getViewportWidth();
        },
        /**
         * Gets the tables direct parents width.
         * @instance
         * @returns {number}
         */
        getParentWidth: function(){
            return this.ft.$el.parent().width();
        },
        /**
         * Gets the current viewport width.
         * @instance
         * @returns {number}
         */
        getViewportWidth: function(){
            var ratio = F.checker.defined(window.devicePixelRatio) ? window.devicePixelRatio : 1;
            return (window.innerWidth || (document.body ? document.body.offsetWidth : 0)) / ratio;
        }
    });

    F.components.internal.register('breakpoints', F.Breakpoints, 10);

})(jQuery, FooTable);
(function(F){
    /**
     * A space delimited string of breakpoint names that specify when the column will be hidden. You can also specify "all" to make a column permanently display in an expandable detail row.
     * @type {string}
     * @default null
     * @example <caption>The below shows how this value would be set</caption>
     * breakpoints: "md"
     */
    F.Column.prototype.breakpoints = null;

    F.Column.prototype.__breakpoints_define__ = function(definition){
        this.breakpoints = F.checker.emptyString(definition.breakpoints) ? null : definition.breakpoints;
    };

    F.Column.extend('define', function(definition){
        this._super(definition);
        this.__breakpoints_define__(definition);
    });
})(FooTable);
(function(F){
    /**
     * An object containing the breakpoints for the plugin.
     * @type {object.<string, number>}
     * @default { "xs": 480, "sm": 768, "md": 992, "lg": 1200 }
     */
    F.Defaults.prototype.breakpoints = null;

    /**
     * Whether or not breakpoints cascade. When set to true all breakpoints larger than the current will also be hidden along with it.
     * @type {boolean}
     * @default false
     */
    F.Defaults.prototype.cascade = false;

    /**
     * Whether or not to calculate breakpoints on the width of the parent element rather than the viewport.
     * @type {boolean}
     * @default false
     */
    F.Defaults.prototype.useParentWidth = false;

    /**
     * A function used to override the default getWidth function with a custom one.
     * @type {function}
     * @default null
     * @example <caption>The below shows what the default getWidth function would look like.</caption>
     * getWidth: function(instance){
	 * 	if (instance.o.useParentWidth == true) return instance.$el.parent().width();
	 * 	return instance.breakpoints.getViewportWidth();
	 * }
     */
    F.Defaults.prototype.getWidth = null;
})(FooTable);
(function($, F){
    F.Columns = F.Component.extend(/** @lends FooTable.Columns */{
        /**
         * The columns class contains all the logic for handling columns.
         * @constructs
         * @extends FooTable.Component
         * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
         * @returns {FooTable.Columns}
         */
        construct: function(table){
            // call the base class constructor
            this._super(table, true);

            /* PROTECTED */
            /**
             * This provides a shortcut to the {@link FooTable.Table#options} object.
             * @protected
             * @type {FooTable.Table#options}
             */
            this.o = table.o;

            /* PUBLIC */
            /**
             * An array of {@link FooTable.Column} objects created from parsing the options and/or DOM.
             * @type {Array.<FooTable.Column>}
             */
            this.array = [];
            /**
             * The jQuery header row object.
             * @type {jQuery}
             */
            this.$header = null;
            /**
             * Whether or not to display the header row.
             * @type {boolean}
             */
            this.showHeader = table.o.showHeader;
        },

        /* PROTECTED */
        /**
         * This parses the columns from either the tables rows or the supplied options.
         * @instance
         * @protected
         * @param {object} data - The tables jQuery data object.
         * @returns {jQuery.Promise}
         * @this FooTable.Columns
         */
        parse: function(data){
            var self = this;
            return $.Deferred(function(d){
                function merge(cols1, cols2){
                    var merged = [];
                    // check if either of the arrays is empty as it can save us having to merge them by index.
                    if (cols1.length == 0 || cols2.length == 0){
                        merged = cols1.concat(cols2);
                    } else {
                        // at this point we have two arrays of column definitions, we now need to merge them based on there index properties
                        // first figure out the highest column index provided so we can loop that many times to merge all columns and provide
                        // defaults where nothing was specified (fill in the gaps in the array as it were).
                        var highest = 0;
                        F.arr.each(cols1.concat(cols2), function(c){
                            if (c.index > highest) highest = c.index;
                        });
                        highest++;
                        for (var i = 0, cols1_c, cols2_c; i < highest; i++){
                            cols1_c = {};
                            F.arr.each(cols1, function(c){
                                if (c.index == i){
                                    cols1_c = c;
                                    return false;
                                }
                            });
                            cols2_c = {};
                            F.arr.each(cols2, function(c){
                                if (c.index == i){
                                    cols2_c = c;
                                    return false;
                                }
                            });
                            merged.push($.extend(true, {}, cols1_c, cols2_c));
                        }
                    }
                    return merged;
                }
                function complete(cols){
                    // we now have a merged array of all column definitions supplied to the plugin, time to make the objects.
                    var columns = [], column;
                    F.arr.each(cols, function(def){
                        // if we have a column registered using the definition type then create an instance of that column otherwise just create a default text column.
                        if (column = F.columns.contains(def.type) ? F.columns.make(def.type, self.ft, def) : new F.Column(self.ft, def))
                            columns.push(column);
                    });
                    if (F.checker.emptyArray(columns)){
                        d.reject(Error("No columns supplied."));
                    } else {
                        // make sure to sort by the column index as the merge process may have mixed them up
                        columns.sort(function(a, b){ return a.index - b.index; });
                        d.resolve(columns);
                    }
                }

                var json = [], html = [];
                // get the column options from the content
                var $header = self.ft.$el.find('tr.footable-header'), $cell, cdata;
                if ($header.length == 0) $header = self.ft.$el.find('thead > tr:last:has([data-breakpoints])');
                if ($header.length == 0) $header = self.ft.$el.find('tbody > tr:first:has([data-breakpoints])');
                if ($header.length > 0){
                    var virtual = $header.parent().is('tbody') && $header.children().length == $header.children('td').length;
                    if (!virtual) self.$header = $header.addClass('footable-header');
                    $header.children('td,th').each(function(i, cell){
                        $cell = $(cell);
                        cdata = $cell.data();
                        cdata.index = i;
                        cdata.$el = $cell;
                        cdata.virtual = virtual;
                        html.push(cdata);
                    });
                    if (virtual) self.showHeader = false;
                }
                // get the supplied column options
                if (F.checker.array(self.o.columns)){
                    F.arr.each(self.o.columns, function(c, i){
                        c.index = i;
                        json.push(c);
                    });
                    complete(merge(json, html));
                } else if (F.checker.promise(self.o.columns)){
                    self.o.columns.then(function(cols){
                        F.arr.each(cols, function(c, i){
                            c.index = i;
                            json.push(c);
                        });
                        complete(merge(json, html));
                    }, function(xhr){
                        d.reject(Error('Columns ajax request error: ' + xhr.status + ' (' + xhr.statusText + ')'));
                    });
                } else {
                    complete(merge(json, html));
                }
            });
        },
        /**
         * The columns preinit method is used to parse and check the column options supplied from both static content and through the constructor.
         * @instance
         * @protected
         * @param {object} data - The jQuery data object from the root table element.
         * @this FooTable.Columns
         */
        preinit: function(data){
            var self = this;
            /**
             * The preinit.ft.columns event is raised before any UI is created and provides the tables jQuery data object for additional options parsing.
             * Calling preventDefault on this event will disable the entire plugin.
             * @event FooTable.Columns#"preinit.ft.columns"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {object} data - The jQuery data object of the table raising the event.
             */
            return self.ft.raise('preinit.ft.columns', [data]).then(function(){
                return self.parse(data).then(function(columns){
                    self.array = columns;
                    self.showHeader = F.checker.isBoolean(data.showHeader) ? data.showHeader : self.showHeader;
                });
            });
        },
        /**
         * Initializes the columns creating the table header if required.
         * @instance
         * @protected
         * @fires FooTable.Columns#"init.ft.columns"
         * @this FooTable.Columns
         */
        init: function(){
            var self = this;
            /**
             * The init.ft.columns event is raised after the header row is created/parsed for column data.
             * @event FooTable.Columns#"init.ft.columns"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} instance - The instance of the plugin raising the event.
             * @param {Array.<FooTable.Column>} columns - The array of {@link FooTable.Column} objects parsed from the options and/or DOM.
             */
            return this.ft.raise('init.ft.columns', [ self.array ]).then(function(){
                self.$create();
            });
        },
        /**
         * The predraw method called from within the {@link FooTable.Table#draw} method.
         * @instance
         * @protected
         * @this FooTable.Columns
         */
        predraw: function(){
            var self = this, first = true;
            self.visibleColspan = 0;
            self.firstVisibleIndex = 0;
            self.lastVisibleIndex = 0;
            self.hasHidden = false;
            F.arr.each(self.array, function(col){
                col.hidden = !self.ft.breakpoints.visible(col.breakpoints);
                if (!col.hidden){
                    if (first){
                        self.firstVisibleIndex = col.index;
                        first = false;
                    }
                    self.lastVisibleIndex = col.index;
                    self.visibleColspan++;
                }
                if (col.hidden && col.visible) self.hasHidden = true;
            });
        },
        /**
         * Performs the actual drawing of the columns, hiding or displaying them depending on there breakpoints.
         * @instance
         * @protected
         * @this FooTable.Columns
         */
        draw: function(){
            F.arr.each(this.array, function(col){
                col.$el.css('display', (col.hidden || !col.visible  ? 'none' : 'table-cell'));
            });
        },
        /**
         * Creates the header row for the table from the parsed column definitions.
         * @instance
         * @protected
         * @this FooTable.Columns
         */
        $create: function(){
            var self = this;
            self.$header = F.checker.jq(self.$header) ? self.$header : $('<tr/>', {'class': 'footable-header'});
            self.$header.children('th,td').detach();
            F.arr.each(self.array, function(col){
                self.$header.append(col.$el);
            });
            if (self.showHeader && !F.checker.jq(self.$header.parent())){
                self.ft.$el.children('thead').append(self.$header);
            }
        },
        /**
         * Attempts to return a {@link FooTable.Column} instance when passed the {@link FooTable.Column} instance, the {@link FooTable.Column#name} string or the {@link FooTable.Column#index} number.
         * If supplied a function this will return an array by iterating all columns passing the index and column itself to the supplied callback as arguments.
         * Returning true in the callback will include the column in the result.
         * @instance
         * @param {(FooTable.Column|string|number|function)} column - The column to retrieve.
         * @returns {(Array.<FooTable.Column>|FooTable.Column|null)} The column if one is found otherwise it returns NULL.
         * @example <caption>This example shows retrieving a column by name assuming a column called "id" exists. The <code>columns</code> object is an instance of {@link FooTable.Columns}.</caption>
         * var column = columns.get('id');
         * if (column instanceof FooTable.Column){
		 * 	// found the "id" column
		 * } else {
		 * 	// no column with a name of "id" exists
		 * }
         * // to get an array of all hidden columns
         * var columns = columns.get(function(col){
		 *  return col.hidden;
		 * });
         */
        get: function(column){
            if (column instanceof F.Column) return column;
            if (F.checker.string(column)) return F.arr.first(this.array, function (col) { return col.name == column; });
            if (F.checker.number(column)) return F.arr.first(this.array, function (col) { return col.index == column; });
            if (F.checker.fn(column)) return F.arr.get(this.array, column);
            return null;
        },
        /**
         * Takes an array of column names, index's or actual {@link FooTable.Column} and ensures that an array of only {@link FooTable.Column} is returned.
         * @instance
         * @param {(Array.<string>|Array.<number>|Array.<FooTable.Column>)} columns - The array of column names, index's or {@link FooTable.Column} to check.
         * @returns {Array.<FooTable.Column>}
         */
        ensure: function(columns){
            var self = this, result = [];
            if (!F.checker.array(columns)) return result;
            F.arr.each(columns, function(name){
                result.push(self.get(name));
            });
            return result;
        }
    });

    F.components.internal.register('columns', F.Columns, 5);

})(jQuery, FooTable);
(function(F){
    /**
     * An array containing the column options or a jQuery promise that resolves returning the columns. The index of the definitions must match the index of each column as it should appear in the table. For more information on the options available see the {@link FooTable.Column} object.
     * @type {(Array.<object>|jQuery.Promise)}
     * @default []
     * @example <caption>The below shows column definitions for a row defined as <code>{ id: Number, name: String, age: Number }</code>. The ID column has a fixed width, the table is initially sorted on the Name column and the Age column will be hidden on phones.</caption>
     * columns: [
     * 	{ name: 'id', title: 'ID', type: 'number' },
     *	{ name: 'name', title: 'Name', sorted: true, direction: 'ASC' }
     *	{ name: 'age', title: 'Age', type: 'number', breakpoints: 'xs' }
     * ]
     */
    F.Defaults.prototype.columns = [];

    /**
     * Specifies whether or not the column headers should be displayed.
     * @type {boolean}
     * @default true
     */
    F.Defaults.prototype.showHeader = true;
})(FooTable);
(function ($, F) {
    F.Rows = F.Component.extend(/** @lends FooTable.Rows */{
        /**
         * The rows class contains all the logic for handling rows.
         * @constructs
         * @extends FooTable.Component
         * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
         * @returns {FooTable.Rows}
         */
        construct: function (table) {
            // call the base class constructor
            this._super(table, true);

            /**
             * This provides a shortcut to the {@link FooTable.Table#options} object.
             * @instance
             * @protected
             * @type {FooTable.Table#options}
             */
            this.o = table.o;
            /**
             * The current working array of {@link FooTable.Row} objects.
             * @instance
             * @protected
             * @type {Array.<FooTable.Row>}
             * @default []
             */
            this.array = [];
            /**
             * The base array of rows parsed from either the DOM or the constructor options.
             * The {@link FooTable.Rows#current} member is populated with a shallow clone of this array
             * during the predraw operation before any core or custom components are executed.
             * @instance
             * @protected
             * @type {Array.<FooTable.Row>}
             * @default []
             */
            this.all = [];
            /**
             * Whether or not to display a toggle in each row when it contains hidden columns.
             * @type {boolean}
             * @default true
             */
            this.showToggle = table.o.showToggle;
            /**
             * Specifies which column the row toggle is appended to. Supports only two values; "first" and "last"
             * @type {string}
             */
            this.toggleColumn = table.o.toggleColumn;
            /**
             * The text to display when the table has no rows.
             * @type {string}
             */
            this.emptyString = table.o.empty;
            /**
             * Whether or not the first rows details are expanded by default when displayed on a device that hides any columns.
             * @type {boolean}
             */
            this.expandFirst = table.o.expandFirst;
            /**
             * The jQuery object that contains the empty row control.
             * @type {jQuery}
             */
            this.$empty = null;
        },
        /**
         * This parses the rows from either the tables rows or the supplied options.
         * @instance
         * @protected
         * @returns {jQuery.Promise}
         */
        parse: function(){
            var self = this;
            return $.Deferred(function(d){
                var $rows = self.ft.$el.children('tbody').children('tr');
                function complete(rows){
                    var result = $.map(rows, function(r){
                        return new F.Row(self.ft, self.ft.columns.array, r);
                    });
                    if (F.checker.emptyArray(result)){
                        d.reject(Error("No rows supplied."));
                    } else {
                        d.resolve(result);
                    }
                }
                if (F.checker.jq($rows)){
                    complete($rows);
                } else if (F.checker.array(self.o.rows) && self.o.rows.length > 0){
                    complete(self.o.rows);
                } else if (F.checker.promise(self.o.rows)){
                    self.o.rows.then(function(rows){
                        complete(rows);
                    }, function(xhr){
                        d.reject(Error('Rows ajax request error: ' + xhr.status + ' (' + xhr.statusText + ')'));
                    });
                } else {
                    complete([]);
                }
            });
        },
        /**
         * The columns preinit method is used to parse and check the column options supplied from both static content and through the constructor.
         * @instance
         * @protected
         * @param {object} data - The jQuery data object from the root table element.
         * @fires FooTable.Rows#"preinit.ft.rows"
         */
        preinit: function(data){
            var self = this;
            /**
             * The preinit.ft.rows event is raised before any UI is created and provides the tables jQuery data object for additional options parsing.
             * Calling preventDefault on this event will disable the entire plugin.
             * @event FooTable.Rows#"preinit.ft.rows"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {object} data - The jQuery data object of the table raising the event.
             */
            return self.ft.raise('preinit.ft.rows', [data]).then(function(){
                return self.parse().then(function(rows){
                    self.all = rows;
                    self.array = self.all.slice(0);
                    self.showToggle = F.checker.isBoolean(data.showToggle) ? data.showToggle : self.showToggle;
                    self.toggleColumn = F.checker.string(data.toggleColumn) ? data.toggleColumn : self.toggleColumn;
                    if (self.toggleColumn != "first" && self.toggleColumn != "last") self.toggleColumn = "first";
                    self.emptyString = F.checker.string(data.empty) ? data.empty : self.emptyString;
                    self.expandFirst = F.checker.isBoolean(data.expandFirst) ? data.expandFirst : self.expandFirst;
                });
            });
        },
        /**
         * Initializes the rows class using the supplied table and options.
         * @instance
         * @protected
         * @fires FooTable.Rows#"init.ft.rows"
         */
        init: function () {
            var self = this;
            /**
             * The init.ft.rows event is raised after the the rows are parsed from either the DOM or the options.
             * Calling preventDefault on this event will disable the entire plugin.
             * @event FooTable.Rows#"init.ft.rows"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} instance - The instance of the plugin raising the event.
             * @param {Array.<FooTable.Row>} rows - The array of {@link FooTable.Row} objects parsed from the DOM or the options.
             */
            return self.ft.raise('init.ft.rows', [self.all]).then(function(){
                self.$empty = $('<tr/>', { 'class': 'footable-empty' }).append($('<td/>').text(self.emptyString));
            });
        },
        /**
         * Performs the predraw operations that are required including creating the shallow clone of the {@link FooTable.Rows#array} to work with.
         * @instance
         * @protected
         */
        predraw: function(){
            F.arr.each(this.array, function(row){
                row.predraw();
            });
            this.array = this.all.slice(0);
        },
        /**
         * Performs the actual drawing of the table rows.
         * @instance
         * @protected
         */
        draw: function(){
            var self = this, $tbody = self.ft.$el.children('tbody'), first = true;
            // if we have rows
            if (self.array.length > 0){
                self.$empty.detach();
                // loop through them appending to the tbody and then drawing
                F.arr.each(self.array, function(row){
                    if (self.expandFirst && first){
                        row.expanded = true;
                        first = false;
                    }
                    row.draw($tbody);
                });
            } else {
                // otherwise display the $empty row
                self.$empty.children('td').attr('colspan', self.ft.columns.visibleColspan);
                $tbody.append(self.$empty);
            }
        }
    });

    F.components.internal.register('rows', F.Rows, 0);

})(jQuery, FooTable);
(function(F){
    /**
     * An array of JSON objects containing the row data or a jQuery promise that resolves returning the row data.
     * @type {(Array.<object>|jQuery.Promise)}
     * @default []
     */
    F.Defaults.prototype.rows = [];

    /**
     * A string to display when there are no rows in the table.
     * @type {string}
     * @default "No results"
     */
    F.Defaults.prototype.empty = 'No results';

    /**
     * Whether or not the toggle is appended to each row.
     * @type {boolean}
     * @default true
     */
    F.Defaults.prototype.showToggle = true;

    /**
     * Specifies which column to display the row toggle in. The only supported values are "first" or "last".
     * @type {string}
     * @default "first"
     */
    F.Defaults.prototype.toggleColumn = 'first';

    /**
     * Whether or not the first rows details are expanded by default when displayed on a device that hides any columns.
     * @type {boolean}
     */
    F.Defaults.prototype.expandFirst = false;
})(FooTable);
(function(F){
    F.Filter = F.Class.extend(/** @lends FooTable.Filter */{
        /**
         * The filter object contains the query to filter by and the columns to apply it to.
         * @constructs
         * @extends FooTable.Class
         * @param {string} name - The name for the filter.
         * @param {string} query - The query for the filter.
         * @param {Array.<FooTable.Column>} columns - The columns to apply the query to.
         * @param {string} [space="AND"] - How the query treats space chars.
         * @returns {FooTable.Filter}
         */
        construct: function(name, query, columns, space){
            /**
             * The name of the filter.
             * @instance
             * @type {string}
             */
            this.name = name;
            /**
             * A string specifying how the filter treats space characters. Can be either "OR" or "AND".
             * @instance
             * @type {string}
             */
            this.space = F.checker.string(space) && (space == 'OR' || space == 'AND') ? space : 'AND';
            /**
             * The query for the filter.
             * @instance
             * @type {(string|FooTable.Query)}
             */
            this.query = new F.Query(query, this.space);
            /**
             * The columns to apply the query to.
             * @instance
             * @type {Array.<FooTable.Column>}
             */
            this.columns = columns;
        },
        /**
         * Checks if the current filter matches the supplied string.
         * If the current query property is a string it will be auto converted to a {@link FooTable.Query} object to perform the match.
         * @instance
         * @param {string} str - The string to check.
         * @returns {boolean}
         */
        match: function(str){
            if (!F.checker.string(str)) return false;
            if (F.checker.string(this.query)){
                this.query = new F.Query(this.query, this.space);
            }
            return this.query instanceof F.Query ? this.query.match(str) : false;
        },
        /**
         * Checks if the current filter matches the supplied {@link FooTable.Row}.
         * @instance
         * @param {FooTable.Row} row - The row to check.
         * @returns {boolean}
         */
        matchRow: function(row){
            var self = this, text = F.arr.map(row.cells, function(cell){
                return F.arr.contains(self.columns, cell.column) ? cell.filterValue : null;
            }).join(' ');
            return self.match(text);
        }
    });

})(FooTable);
(function ($, F) {
    F.Filtering = F.Component.extend(/** @lends FooTable.Filtering */{
        /**
         * The filtering component adds a search input and column selector dropdown to the table allowing users to filter the using space delimited queries.
         * @constructs
         * @extends FooTable.Component
         * @param {FooTable.Table} table - The parent {@link FooTable.Table} object for the component.
         * @returns {FooTable.Filtering}
         */
        construct: function (table) {
            // call the constructor of the base class
            this._super(table, table.o.filtering.enabled);

            /* PUBLIC */
            /**
             * The filters to apply to the current {@link FooTable.Rows#array}.
             * @instance
             * @type {Array.<FooTable.Filter>}
             */
            this.filters = table.o.filtering.filters;
            /**
             * The delay in milliseconds before the query is auto applied after a change.
             * @instance
             * @type {number}
             */
            this.delay = table.o.filtering.delay;
            /**
             * The minimum number of characters allowed in the search input before it is auto applied.
             * @instance
             * @type {number}
             */
            this.min = table.o.filtering.min;
            /**
             * Specifies how whitespace in a filter query is handled.
             * @instance
             * @type {string}
             */
            this.space = table.o.filtering.space;
            /**
             * The placeholder text to display within the search $input.
             * @instance
             * @type {string}
             */
            this.placeholder = table.o.filtering.placeholder;
            /**
             * The position of the $search input within the filtering rows cell.
             * @type {string}
             */
            this.position = table.o.filtering.position;
            /**
             * The jQuery row object that contains all the filtering specific elements.
             * @instance
             * @type {jQuery}
             */
            this.$row = null;
            /**
             * The jQuery cell object that contains the search input and column selector.
             * @instance
             * @type {jQuery}
             */
            this.$cell = null;
            /**
             * The jQuery object of the column selector dropdown.
             * @instance
             * @type {jQuery}
             */
            this.$dropdown = null;
            /**
             * The jQuery object of the search input.
             * @instance
             * @type {jQuery}
             */
            this.$input = null;
            /**
             * The jQuery object of the search button.
             * @instance
             * @type {jQuery}
             */
            this.$button = null;

            /* PRIVATE */
            /**
             * The timeout ID for the filter changed event.
             * @instance
             * @private
             * @type {?number}
             */
            this._filterTimeout = null;
        },

        /* PROTECTED */
        /**
         * Checks the supplied data and options for the filtering component.
         * @instance
         * @protected
         * @param {object} data - The jQuery data object from the parent table.
         * @fires FooTable.Filtering#"preinit.ft.filtering"
         */
        preinit: function(data){
            var self = this;
            /**
             * The preinit.ft.filtering event is raised before the UI is created and provides the tables jQuery data object for additional options parsing.
             * Calling preventDefault on this event will disable the component.
             * @event FooTable.Filtering#"preinit.ft.filtering"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {object} data - The jQuery data object of the table raising the event.
             */
            this.ft.raise('preinit.ft.filtering').then(function(){
                // first check if filtering is enabled via the class being applied
                if (self.ft.$el.hasClass('footable-filtering'))
                    self.enabled = true;
                // then check if the data-filtering-enabled attribute has been set
                self.enabled = F.checker.isBoolean(data.filtering)
                    ? data.filtering
                    : self.enabled;

                // if filtering is not enabled exit early as we don't need to do anything else
                if (!self.enabled) return;

                self.space = F.checker.string(data.filterSpace)
                    ? data.filteringSpace
                    : self.space;

                self.min = F.checker.number(data.filterMin)
                    ? data.filteringMin
                    : self.min;

                self.delay = F.checker.number(data.filterDelay)
                    ? data.filteringDelay
                    : self.delay;

                self.placeholder = F.checker.number(data.filterPlaceholder)
                    ? data.filterPlaceholder
                    : self.placeholder;

                self.filters = F.checker.array(data.filters)
                    ? self.ensure(data.filters)
                    : self.ensure(self.filters);

                if (self.ft.$el.hasClass('footable-filtering-left'))
                    self.position = 'left';
                if (self.ft.$el.hasClass('footable-filtering-center'))
                    self.position = 'center';
                if (self.ft.$el.hasClass('footable-filtering-right'))
                    self.position = 'right';

                self.position = F.checker.string(data.filterPosition)
                    ? data.filterPosition
                    : self.position;
            },function(){
                self.enabled = false;
            });
        },
        /**
         * Initializes the filtering component for the plugin.
         * @instance
         * @protected
         * @fires FooTable.Filtering#"init.ft.filtering"
         */
        init: function () {
            var self = this;
            /**
             * The init.ft.filtering event is raised before its UI is generated.
             * Calling preventDefault on this event will disable the component.
             * @event FooTable.Filtering#"init.ft.filtering"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            this.ft.raise('init.ft.filtering').then(function(){
                self.$create();
            }, function(){
                self.enabled = false;
            });
        },
        /**
         * Destroys the filtering component removing any UI from the table.
         * @instance
         * @protected
         * @fires FooTable.Filtering#"destroy.ft.filtering"
         */
        destroy: function () {
            /**
             * The destroy.ft.filtering event is raised before its UI is removed.
             * Calling preventDefault on this event will prevent the component from being destroyed.
             * @event FooTable.Filtering#"destroy.ft.filtering"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            var self = this;
            this.ft.raise('destroy.ft.filtering').then(function(){
                self.ft.$el.removeClass('footable-filtering')
                    .find('thead > tr.footable-filtering').remove();
            });
        },
        /**
         * Creates the filtering UI from the current options setting the various jQuery properties of this component.
         * @instance
         * @protected
         * @this FooTable.Filtering
         */
        $create: function () {
            var self = this;
            // generate the cell that actually contains all the UI.
            var $form_grp = $('<div/>', {'class': 'form-group'})
                    .append($('<label/>', {'class': 'sr-only', text: 'Search'})),
                $input_grp = $('<div/>', {'class': 'input-group'}).appendTo($form_grp),
                $input_grp_btn = $('<div/>', {'class': 'input-group-btn'}),
                $dropdown_toggle = $('<button/>', {type: 'button', 'class': 'btn btn-default dropdown-toggle'})
                    .on('click', { self: self }, self._onDropdownToggleClicked)
                    .append($('<span/>', {'class': 'caret'})),
                position;

            switch (self.position){
                case 'left': position = 'footable-filtering-left'; break;
                case 'center': position = 'footable-filtering-center'; break;
                default: position = 'footable-filtering-right'; break;
            }
            self.ft.$el.addClass('footable-filtering').addClass(position);

            // add it to a row and then populate it with the search input and column selector dropdown.
            self.$row = $('<tr/>', {'class': 'footable-filtering'}).prependTo(self.ft.$el.children('thead'));
            self.$cell = $('<th/>').attr('colspan', self.ft.columns.visibleColspan).appendTo(self.$row);
            self.$form = $('<form/>', {'class': 'form-inline'}).append($form_grp).appendTo(self.$cell);

            self.$input = $('<input/>', {type: 'text', 'class': 'form-control', placeholder: self.placeholder});

            self.$button = $('<button/>', {type: 'button', 'class': 'btn btn-primary'})
                .on('click', { self: self }, self._onSearchButtonClicked)
                .append($('<span/>', {'class': 'fooicon fooicon-search'}));

            self.$dropdown = $('<ul/>', {'class': 'dropdown-menu dropdown-menu-right'}).append(
                F.arr.map(self.ft.columns.array, function (col) {
                    return col.filterable && col.visible ? $('<li/>').append(
                        $('<a/>', {'class': 'checkbox'}).append(
                            $('<label/>', {text: col.title}).prepend(
                                $('<input/>', {type: 'checkbox', checked: true}).data('__FooTableColumn__', col)
                            )
                        )
                    ) : null;
                })
            );

            if (self.delay > 0){
                self.$input.on('keypress keyup', { self: self }, self._onSearchInputChanged);
                self.$dropdown.on('click', 'input[type="checkbox"]', self._onSearchColumnClicked);
            }

            $input_grp_btn.append(self.$button, $dropdown_toggle, self.$dropdown);
            $input_grp.append(self.$input, $input_grp_btn);
        },
        /**
         * Performs the filtering of rows before they are appended to the page.
         * @instance
         * @protected
         */
        predraw: function(){
            if (F.checker.emptyArray(this.filters))
                return;

            var self = this;
            self.ft.rows.array = $.grep(self.ft.rows.array, function(r){
                return r.filtered(self.filters);
            });
        },
        /**
         * As the rows are drawn by the {@link FooTable.Rows#draw} method this simply updates the colspan for the UI.
         * @instance
         * @protected
         */
        draw: function(){
            this.$cell.attr('colspan', this.ft.columns.visibleColspan);
        },

        /* PUBLIC */
        /**
         * Adds or updates the filter using the supplied name, query and columns.
         * @param {string} name - The name for the filter.
         * @param {(string|FooTable.Query)} query - The query for the filter.
         * @param {(Array.<number>|Array.<string>|Array.<FooTable.Column>)} columns - The columns to apply the filter to.
         */
        addFilter: function(name, query, columns){
            var f = F.arr.first(this.filters, function(f){ return f.name == name; });
            if (f instanceof F.Filter){
                f.name = name;
                f.query = query;
                f.columns = columns;
            } else {
                this.filters.push({name: name, query: query, columns: columns});
            }
        },
        /**
         * Removes the filter using the supplied name if it exists.
         * @param {string} name - The name of the filter to remove.
         */
        removeFilter: function(name){
            F.arr.remove(this.filters, function(f){ return f.name == name; });
        },
        /**
         * Creates a new search filter from the supplied parameters and applies it to the rows. If no parameters are supplied the current search input value
         * and selected columns are used to create or update the search filter. If there is no search input value then the search filter is removed.
         * @instance
         * @param {string} [query] - The query to filter the rows by.
         * @param {(Array.<string>|Array.<number>|Array.<FooTable.Column>)} [columns] - The columns to apply the filter to in each row.
         * @returns {jQuery.Promise}
         * @fires FooTable.Filtering#"before.ft.filtering"
         * @fires FooTable.Filtering#"after.ft.filtering"
         */
        filter: function(query, columns){
            if (F.checker.undef(query)){
                query = $.trim(this.$input.val() || '');
            } else {
                this.$input.val(query);
            }
            if (!F.checker.emptyString(query)) {
                this.addFilter('search', query, columns);
            } else {
                this.removeFilter('search');
            }
            this.$button.children('.fooicon').removeClass('fooicon-search').addClass('fooicon-remove');
            return this._filter();
        },
        /**
         * Removes the current search filter.
         * @instance
         * @returns {jQuery.Promise}
         * @fires FooTable.Filtering#"before.ft.filtering"
         * @fires FooTable.Filtering#"after.ft.filtering"
         */
        clear: function(){
            this.$button.children('.fooicon').removeClass('fooicon-remove').addClass('fooicon-search');
            this.$input.val(null);
            this.removeFilter('search');
            return this._filter();
        },
        /**
         * Gets an array of {@link FooTable.Column} to apply the search filter to. This also doubles as the default columns for filters which do not specify any columns.
         * @instance
         * @returns {Array.<FooTable.Column>}
         */
        columns: function(){
            if (F.checker.jq(this.$dropdown)){
                // if we have a dropdown containing the column names get the selected columns from there
                return this.$dropdown.find('input:checked').map(function(){
                    return $(this).data('__FooTableColumn__');
                }).get();
            } else {
                // otherwise find all columns that are set to be filterable.
                return this.ft.columns.get(function(c){ return c.filterable; });
            }
        },
        /**
         * Takes an array of plain objects containing the filter values or actual {@link FooTable.Filter} objects and ensures that an array of only {@link FooTable.Filter} is returned.
         * If supplied a plain object that object must contain a name, query and columns properties which are used to create a new {@link FooTable.Filter}.
         * @instance
         * @param {({name: string, query: (string|FooTable.Query), columns: (Array.<string>|Array.<number>|Array.<FooTable.Column>)}|Array.<FooTable.Filter>)} filters - The array of filters to check.
         * @returns {Array.<FooTable.Filter>}
         */
        ensure: function(filters){
            var self = this, parsed = [], filterable = self.columns();
            if (!F.checker.emptyArray(filters)){
                F.arr.each(filters, function(f){
                    if (F.checker.object(f) && (!F.checker.emptyString(f.query) || f.query instanceof F.Query)) {
                        f.name = F.checker.emptyString(f.name) ? 'anon' : f.name;
                        f.columns = F.checker.emptyArray(f.columns) ? filterable : self.ft.columns.ensure(f.columns);
                        parsed.push(f instanceof F.Filter ? f : new F.Filter(f.name, f.query, f.columns, self.space));
                    }
                });
            }
            return parsed;
        },

        /* PRIVATE */
        /**
         * Performs the required steps to handle filtering including the raising of the {@link FooTable.Filtering#"before.ft.filtering"} and {@link FooTable.Filtering#"after.ft.filtering"} events.
         * @instance
         * @private
         * @returns {jQuery.Promise}
         * @fires FooTable.Filtering#"before.ft.filtering"
         * @fires FooTable.Filtering#"after.ft.filtering"
         */
        _filter: function(){
            var self = this;
            self.filters = self.ensure(self.filters);
            /**
             * The before.ft.filtering event is raised before a filter is applied and allows listeners to modify the filter or cancel it completely by calling preventDefault on the jQuery.Event object.
             * @event FooTable.Filtering#"before.ft.filtering"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {Array.<FooTable.Filter>} filters - The filters that are about to be applied.
             */
            return self.ft.raise('before.ft.filtering', [self.filters]).then(function(){
                self.filters = self.ensure(self.filters);
                return self.ft.draw().then(function(){
                    /**
                     * The after.ft.filtering event is raised after a filter has been applied.
                     * @event FooTable.Filtering#"after.ft.filtering"
                     * @param {jQuery.Event} e - The jQuery.Event object for the event.
                     * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                     * @param {FooTable.Filter} filter - The filters that were applied.
                     */
                    self.ft.raise('after.ft.filtering', [self.filters]);
                });
            });
        },
        /**
         * Handles the change event for the {@link FooTable.Filtering#$input}.
         * @instance
         * @private
         * @param {jQuery.Event} e - The event object for the event.
         */
        _onSearchInputChanged: function (e) {
            var self = e.data.self;
            var alpha = e.type == 'keypress' && !F.checker.emptyString(String.fromCharCode(e.charCode)),
                ctrl = e.type == 'keyup' && (e.which == 8 || e.which == 46); // backspace & delete

            // if alphanumeric characters or specific control characters
            if(alpha || ctrl) {
                if (self._filterTimeout != null) clearTimeout(self._filterTimeout);
                self._filterTimeout = setTimeout(function(){
                    self._filterTimeout = null;
                    self.filter();
                }, self.delay);
            }
        },
        /**
         * Handles the click event for the {@link FooTable.Filtering#$button}.
         * @instance
         * @private
         * @param {jQuery.Event} e - The event object for the event.
         */
        _onSearchButtonClicked: function (e) {
            e.preventDefault();
            var self = e.data.self;
            if (self._filterTimeout != null) clearTimeout(self._filterTimeout);
            var $icon = self.$button.children('.fooicon');
            if ($icon.hasClass('fooicon-remove')) self.clear();
            else self.filter();
        },
        /**
         * Handles the click event for the column checkboxes in the {@link FooTable.Filtering#$dropdown}.
         * @instance
         * @private
         * @param {jQuery.Event} e - The event object for the event.
         */
        _onSearchColumnClicked: function (e) {
            var self = e.data.self;
            if (self._filterTimeout != null) clearTimeout(self._filterTimeout);
            self._filterTimeout = setTimeout(function(){
                self._filterTimeout = null;
                var $icon = self.$button.children('.fooicon');
                if ($icon.hasClass('fooicon-remove')){
                    $icon.removeClass('fooicon-remove').addClass('fooicon-search');
                    self.filter();
                }
            }, self.delay);
        },
        /**
         * Handles the click event for the {@link FooTable.Filtering#$dropdown} toggle.
         * @instance
         * @private
         * @param {jQuery.Event} e - The event object for the event.
         */
        _onDropdownToggleClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var self = e.data.self;
            self.$dropdown.parent().toggleClass('open');
            if (self.$dropdown.parent().hasClass('open')) $(document).on('click.footable', { self: self }, self._onDocumentClicked);
            else $(document).off('click.footable', self._onDocumentClicked);
        },
        /**
         * Checks all click events when the dropdown is visible and closes the menu if the target is not the dropdown.
         * @instance
         * @private
         * @param {jQuery.Event} e - The event object for the event.
         */
        _onDocumentClicked: function(e){
            if ($(e.target).closest('.dropdown-menu').length == 0){
                e.preventDefault();
                var self = e.data.self;
                self.$dropdown.parent().removeClass('open');
                $(document).off('click.footable', self._onDocumentClicked);
            }
        }
    });

    F.components.core.register('filtering', F.Filtering, 10);

})(jQuery, FooTable);
(function(F){
    F.Query = F.Class.extend(/** @lends FooTable.Query */{
        /**
         * The query object is used to parse and test the filtering component's queries
         * @constructs
         * @extends FooTable.Class
         * @param {string} query - The string value of the query.
         * @param {string} [space="AND"] - How the query treats whitespace.
         * @returns {FooTable.Query}
         */
        construct: function(query, space){
            /* PRIVATE */
            /**
             * Holds the previous value of the query and is used internally in the {@link FooTable.Query#val} method.
             * @type {string}
             * @private
             */
            this._original = null;
            /**
             * Holds the value for the query. Access to this variable is provided through the {@link FooTable.Query#val} method.
             * @type {string}
             * @private
             */
            this._value = null;
            /* PUBLIC */
            /**
             * A string specifying how the query treats whitespace. Can be either "OR" or "AND".
             * @type {string}
             */
            this.space = F.checker.string(space) && (space == 'OR' || space == 'AND') ? space : 'AND';
            /**
             * The left side of the query if one exists. OR takes precedence over AND.
             * @type {FooTable.Query}
             * @example <caption>The below shows what is meant by the "left" side of a query</caption>
             * query = "Dave AND Mary" - "Dave" is the left side of the query.
             * query = "Dave AND Mary OR John" - "Dave and Mary" is the left side of the query.
             */
            this.left = null;
            /**
             * The right side of the query if one exists. OR takes precedence over AND.
             * @type {FooTable.Query}
             * @example <caption>The below shows what is meant by the "right" side of a query</caption>
             * query = "Dave AND Mary" - "Mary" is the right side of the query.
             * query = "Dave AND Mary OR John" - "John" is the right side of the query.
             */
            this.right = null;
            /**
             * The parsed parts of the query. This contains the information used to actually perform a match against a string.
             * @type {Array}
             */
            this.parts = [];
            /**
             * The type of operand to apply to the results of the individual parts of the query.
             * @type {string}
             */
            this.operator = null;
            this.val(query);
        },
        /**
         * Gets or sets the value for the query. During set the value is parsed setting all properties as required.
         * @param {string} [value] - If supplied the value to set for this query.
         * @returns {(string|undefined)}
         */
        val: function(value){
            // get
            if (F.checker.emptyString(value)) return this._value;

            // set
            if (F.checker.emptyString(this._original)) this._original = value;
            else if (this._original == value) return;

            this._value = value;
            this._parse();
        },
        /**
         * Tests the supplied string against the query.
         * @param {string} str - The string to test.
         * @returns {boolean}
         */
        match: function(str){
            if (F.checker.emptyString(this.operator) || this.operator === 'OR')
                return this._left(str, false) || this._match(str, false) || this._right(str, false);
            if (this.operator === 'AND')
                return this._left(str, true) && this._match(str, true) && this._right(str, true);
        },
        /**
         * Matches this queries parts array against the supplied string.
         * @param {string} str - The string to test.
         * @param {boolean} def - The default value to return based on the operand.
         * @returns {boolean}
         * @private
         */
        _match: function(str, def){
            var self = this, result = false;
            if (F.checker.emptyArray(self.parts) && self.left instanceof F.Query) return def;
            if (F.checker.emptyArray(self.parts)) return result;
            if (self.space === 'OR'){
                // with OR we give the str every part to test and if any match it is a success, we do exit early if a negated match occurs
                F.arr.each(self.parts, function(p){
                    var match = F.str.contains(str, p.query, true);
                    if (match && !p.negate) result = true;
                    if (match && p.negate) {
                        result = false;
                        return result;
                    }
                });
            } else {
                // otherwise with AND we check until the first failure and then exit
                result = true;
                F.arr.each(self.parts, function(p){
                    var match = F.str.contains(str, p.query, true);
                    if ((!match && !p.negate) || (match && p.negate)) result = false;
                    return result;
                });
            }
            return result;
        },
        /**
         * Matches the left side of the query if one exists with the supplied string.
         * @param {string} str - The string to test.
         * @param {boolean} def - The default value to return based on the operand.
         * @returns {boolean}
         * @private
         */
        _left: function(str, def){
            return (this.left instanceof F.Query) ? this.left.match(str) : def;
        },
        /**
         * Matches the right side of the query if one exists with the supplied string.
         * @param {string} str - The string to test.
         * @param {boolean} def - The default value to return based on the operand.
         * @returns {boolean}
         * @private
         */
        _right: function(str, def){
            return (this.right instanceof F.Query) ? this.right.match(str) : def;
        },
        /**
         * Parses the private {@link FooTable.Query#_value} property and populates the object.
         * @private
         */
        _parse: function(){
            if (F.checker.emptyString(this._value)) return;
            // OR takes precedence so test for it first
            if (/\sOR\s/.test(this._value)){
                // we have an OR so split the value on the first occurrence of OR to get the left and right sides of the statement
                this.operator = 'OR';
                var or = this._value.split(/(?:\sOR\s)(.*)?/);
                this.left = new F.Query(or[0], this.space);
                this.right = new F.Query(or[1], this.space);
            } else if (/\sAND\s/.test(this._value)) {
                // there are no more OR's so start with AND
                this.operator = 'AND';
                var and = this._value.split(/(?:\sAND\s)(.*)?/);
                this.left = new F.Query(and[0], this.space);
                this.right = new F.Query(and[1], this.space);
            } else {
                // we have no more statements to parse so set the parts array by parsing each part of the remaining query
                this.parts = F.arr.map(this._value.match(/(?:[^\s"]+|"[^"]*")+/g), this._part);
            }
        },
        /**
         * Parses a single part of a query into an object to use during matching.
         * @param {string} str - The string representation of the part.
         * @returns {{query: string, negate: boolean, phrase: boolean, exact: boolean}}
         * @private
         */
        _part: function(str){
            var p = {
                query: str,
                negate: false,
                phrase: false,
                exact: false
            };
            // support for NEGATE operand - (minus sign). Remove this first so we can get onto phrase checking
            if (F.str.startsWith(p.query, '-')){
                p.query = F.str.from(p.query, '-');
                p.negate = true;
            }
            // support for PHRASES (exact matches)
            if (/^"(.*?)"$/.test(p.query)){ // if surrounded in quotes strip them and nothing else
                p.query = p.query.replace(/^"(.*?)"$/, '$1');
                p.phrase = true;
                p.exact = true;
            } else if (/(?:\w)+?([-_\+\.])(?:\w)+?/.test(p.query)) { // otherwise replace supported phrase connectors (-_+.) with spaces
                p.query = p.query.replace(/(?:\w)+?([-_\+\.])(?:\w)+?/g, function(match, p1){
                    return match.replace(p1, ' ');
                });
                p.phrase = true;
            }
            return p;
        }
    });

})(FooTable);
(function(F){

    /**
     * The value used by the filtering component during filter operations. Must be a string and can be set using the data-filter-value attribute on the cell itself.
     * If this is not supplied it is set to the result of the toString method called on the value for the cell. Added by the {@link FooTable.Filtering} component.
     * @type {string}
     * @default null
     */
    F.Cell.prototype.filterValue = null;

    // this is used to define the filtering specific properties on cell creation
    F.Cell.prototype.__filtering_define__ = function(valueOrElement){
        this.filterValue = this.column.filterValue.call(this.column, valueOrElement);
    };

    // this is used to update the filterValue property whenever the cell value is changed
    F.Cell.prototype.__filtering_val__ = function(value){
        if (F.checker.defined(value)){
            // set only
            this.filterValue = this.column.filterValue.call(this.column, value);
        }
    };

    // overrides the public define method and replaces it with our own
    F.Cell.extend('define', function(valueOrElement){
        this._super(valueOrElement);
        this.__filtering_define__(valueOrElement);
    });
    // overrides the public val method and replaces it with our own
    F.Cell.extend('val', function(value){
        var val = this._super(value);
        this.__filtering_val__(value);
        return val;
    });
})(FooTable);
(function($, F){
    /**
     * Whether or not the column can be used during filtering. Added by the {@link FooTable.Filtering} component.
     * @type {boolean}
     * @default true
     */
    F.Column.prototype.filterable = true;

    /**
     * This is supplied either the cell value or jQuery object to parse. A string value must be returned from this method and will be used during filtering operations.
     * @param {(*|jQuery)} valueOrElement - The value or jQuery cell object.
     * @returns {string}
     * @this FooTable.Column
     */
    F.Column.prototype.filterValue = function(valueOrElement){
        // if we have an element or a jQuery object use jQuery to get the value
        if (F.checker.element(valueOrElement) || F.checker.jq(valueOrElement)) return $(valueOrElement).data('filterValue') || $(valueOrElement).text();
        // if options are supplied with the value
        if (F.checker.hash(valueOrElement) && F.checker.hash(valueOrElement.options)){
            if (F.checker.string(valueOrElement.options.filterValue)) return valueOrElement.options.filterValue;
            if (F.checker.defined(valueOrElement.value)) valueOrElement = valueOrElement.value;
        }
        if (F.checker.defined(valueOrElement) && valueOrElement != null) return valueOrElement+''; // use the native toString of the value
        return ''; // otherwise we have no value so return an empty string
    };

    // this is used to define the filtering specific properties on column creation
    F.Column.prototype.__filtering_define__ = function(definition){
        this.filterable = F.checker.isBoolean(definition.filterable) ? definition.filterable : this.filterable;
    };

    // overrides the public define method and replaces it with our own
    F.Column.extend('define', function(definition){
        this._super(definition); // call the base so we don't have to redefine any previously set properties
        this.__filtering_define__(definition); // then call our own
    });
})(jQuery, FooTable);
(function(F){
    /**
     * An object containing the filtering options for the plugin. Added by the {@link FooTable.Filtering} component.
     * @type {object}
     * @prop {boolean} enabled=false - Whether or not to allow filtering on the table.
     * @prop {({name: string, query: (string|FooTable.Query), columns: (Array.<string>|Array.<number>|Array.<FooTable.Column>)}|Array.<FooTable.Filter>)} filters - The filters to apply to the current {@link FooTable.Rows#array}.
     * @prop {number} delay=1200 - The delay in milliseconds before the query is auto applied after a change (any value equal to or less than zero will disable this).
     * @prop {number} min=3 - The minimum number of characters allowed in the search input before it is auto applied.
     * @prop {string} space="AND" - Specifies how whitespace in a filter query is handled.
     * @prop {string} placeholder="Search" - The string used as the placeholder for the search input.
     * @prop {string} position="right" - The string used to specify the alignment of the search input.
     */
    F.Defaults.prototype.filtering = {
        enabled: false,
        filters: [],
        delay: 1200,
        min: 3,
        space: 'AND',
        placeholder: 'Search',
        position: 'right'
    };
})(FooTable);
(function(F){
    /**
     * Checks if the row is filtered using the supplied filters.
     * @this FooTable.Row
     * @param {Array.<FooTable.Filter>} filters - The filters to apply.
     * @returns {boolean}
     */
    F.Row.prototype.filtered = function(filters){
        var result = true, self = this;
        F.arr.each(filters, function(f){
            if ((result = f.matchRow(self)) == false) return false;
        });
        return result;
    };
})(FooTable);
(function(F){
    /**
     * Filter the table using the supplied query and columns. Added by the {@link FooTable.Filtering} component.
     * @instance
     * @param {string} query - The query to filter the rows by.
     * @param {(Array.<string>|Array.<number>|Array.<FooTable.Column>)} [columns] - The columns to apply the filter to in each row.
     * @returns {jQuery.Promise}
     * @fires FooTable.Filtering#before.ft.filtering
     * @fires FooTable.Filtering#after.ft.filtering
     * @see FooTable.Filtering#filter
     */
    F.Table.prototype.applyFilter = function(query, columns){
        return this.use(F.Filtering).filter(query, columns);
    };

    /**
     * Clear the current filter from the table. Added by the {@link FooTable.Filtering} component.
     * @instance
     * @returns {jQuery.Promise}
     * @fires FooTable.Filtering#before.ft.filtering
     * @fires FooTable.Filtering#after.ft.filtering
     * @see FooTable.Filtering#clear
     */
    F.Table.prototype.clearFilter = function(){
        return this.use(F.Filtering).clear();
    };
})(FooTable);
(function($, F){

    F.Sorter = F.Class.extend(/** @lends FooTable.Sorter */{
        /**
         * The sorter object contains the column and direction to sort by.
         * @constructs
         * @extends FooTable.Class
         * @param {FooTable.Column} column - The column to sort.
         * @param {string} direction - The direction to sort by.
         * @returns {FooTable.Sorter}
         */
        construct: function(column, direction){
            /**
             * The column to sort.
             * @type {FooTable.Column}
             */
            this.column = column;
            /**
             * The direction to sort by.
             * @type {string}
             */
            this.direction = direction;
        }
    });

})(jQuery, FooTable);
(function ($, F) {
    F.Sorting = F.Component.extend(/** @lends FooTable.Sorting */{
        /**
         * The sorting component adds a small sort button to specified column headers allowing users to sort those columns in the table.
         * @constructs
         * @extends FooTable.Component
         * @param {FooTable.Table} table - The parent {@link FooTable.Table} object for the component.
         * @returns {FooTable.Sorting}
         */
        construct: function (table) {
            // call the constructor of the base class
            this._super(table, table.o.sorting.enabled);

            /* PROTECTED */
            /**
             * This provides a shortcut to the {@link FooTable.Table#options}.[sorting]{@link FooTable.Defaults#sorting} object.
             * @instance
             * @protected
             * @type {object}
             */
            this.o = table.o.sorting;
            /**
             * The current sorted column.
             * @instance
             * @type {FooTable.Column}
             */
            this.column = null;

            /* PRIVATE */
            /**
             * Sets a flag indicating whether or not the sorting has changed. When set to true the {@link FooTable.Sorting#sorting_changing} and {@link FooTable.Sorting#sorting_changed} events
             * will be raised during the drawing operation.
             * @private
             * @type {boolean}
             */
            this._changed = false;
        },

        /* PROTECTED */
        /**
         * Checks the supplied data and options for the sorting component.
         * @instance
         * @protected
         * @param {object} data - The jQuery data object from the parent table.
         * @fires FooTable.Sorting#"preinit.ft.sorting"
         * @this FooTable.Sorting
         */
        preinit: function(data){
            var self = this;
            /**
             * The preinit.ft.sorting event is raised before the UI is created and provides the tables jQuery data object for additional options parsing.
             * Calling preventDefault on this event will disable the component.
             * @event FooTable.Sorting#"preinit.ft.sorting"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {object} data - The jQuery data object of the table raising the event.
             */
            this.ft.raise('preinit.ft.sorting', [data]).then(function(){
                if (self.ft.$el.hasClass('footable-sorting'))
                    self.enabled = true;
                self.enabled = F.checker.isBoolean(data.sorting)
                    ? data.sorting
                    : self.enabled;
                if (!self.enabled) return;
                self.column = F.arr.first(self.ft.columns.array, function(col){ return col.sorted; });
            }, function(){
                self.enabled = false;
            });
        },
        /**
         * Initializes the sorting component for the plugin using the supplied table and options.
         * @instance
         * @protected
         * @fires FooTable.Sorting#"init.ft.sorting"
         * @this FooTable.Sorting
         */
        init: function () {
            /**
             * The init.ft.sorting event is raised before its UI is generated.
             * Calling preventDefault on this event will disable the component.
             * @event FooTable.Sorting#"init.ft.sorting"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            var self = this;
            this.ft.raise('init.ft.sorting').then(function(){
                F.arr.each(self.ft.columns.array, function(col){
                    if (col.sortable){
                        col.$el.addClass('footable-sortable').append($('<span/>', {'class': 'fooicon fooicon-sort'}));
                    }
                });
                self.ft.$el.on('click.footable', '.footable-sortable', { self: self }, self._onSortClicked);
            }, function(){
                self.enabled = false;
            });
        },
        /**
         * Destroys the sorting component removing any UI generated from the table.
         * @instance
         * @protected
         * @fires FooTable.Sorting#"destroy.ft.sorting"
         */
        destroy: function () {
            /**
             * The destroy.ft.sorting event is raised before its UI is removed.
             * Calling preventDefault on this event will prevent the component from being destroyed.
             * @event FooTable.Sorting#"destroy.ft.sorting"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            var self = this;
            this.ft.raise('destroy.ft.paging').then(function(){
                self.ft.$el.off('click.footable', '.footable-sortable', self._onSortClicked);
                self.ft.$el.children('thead').children('tr.footable-header')
                    .children('.footable-sortable').removeClass('footable-sortable')
                    .find('span.fooicon').remove();
            });
        },
        /**
         * Performs the actual sorting against the {@link FooTable.Rows#current} array.
         * @instance
         * @protected
         */
        predraw: function () {
            if (!this.column) return;
            var self = this, col = self.column;
            self.ft.rows.array.sort(function (a, b) {
                return col.direction == 'ASC'
                    ? col.sorter(a.cells[col.index].value, b.cells[col.index].value)
                    : col.sorter(b.cells[col.index].value, a.cells[col.index].value);
            });
        },
        /**
         * Updates the sorting UI setting the state of the sort buttons.
         * @instance
         * @protected
         */
        draw: function () {
            if (!this.column) return;
            var self = this,
                $sortable = self.ft.$el.find('thead > tr > .footable-sortable'),
                $active = self.column.$el;

            $sortable.removeClass('footable-asc footable-desc').children('.fooicon').removeClass('fooicon-sort fooicon-sort-asc fooicon-sort-desc');
            $sortable.not($active).children('.fooicon').addClass('fooicon-sort');
            $active.addClass(self.column.direction == 'ASC' ? 'footable-asc' : 'footable-desc')
                .children('.fooicon').addClass(self.column.direction == 'ASC' ? 'fooicon-sort-asc' : 'fooicon-sort-desc');
        },

        /* PUBLIC */
        /**
         * Sets the sorting options and calls the {@link FooTable.Table#draw} method to perform the actual sorting.
         * @instance
         * @param {(string|number|FooTable.Column)} column - The column name, index or the actual {@link FooTable.Column} object to sort by.
         * @param {string} [direction="ASC"] - The direction to sort by, either ASC or DESC.
         * @returns {jQuery.Promise}
         * @fires FooTable.Sorting#"before.ft.sorting"
         * @fires FooTable.Sorting#"after.ft.sorting"
         */
        sort: function(column, direction){
            return this._sort(column, direction);
        },

        /* PRIVATE */
        /**
         * Performs the required steps to handle sorting including the raising of the {@link FooTable.Sorting#"before.ft.sorting"} and {@link FooTable.Sorting#"after.ft.sorting"} events.
         * @instance
         * @private
         * @param {(string|number|FooTable.Column)} column - The column name, index or the actual {@link FooTable.Column} object to sort by.
         * @param {string} [direction="ASC"] - The direction to sort by, either ASC or DESC.
         * @returns {jQuery.Promise}
         * @fires FooTable.Sorting#"before.ft.sorting"
         * @fires FooTable.Sorting#"after.ft.sorting"
         */
        _sort: function(column, direction){
            var self = this;
            var sorter = new F.Sorter(self.ft.columns.get(column), F.Sorting.dir(direction));
            /**
             * The before.ft.sorting event is raised before a sort is applied and allows listeners to modify the sorter or cancel it completely by calling preventDefault on the jQuery.Event object.
             * @event FooTable.Sorting#"before.ft.sorting"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {FooTable.Sorter} sorter - The sorter that is about to be applied.
             */
            return self.ft.raise('before.ft.sorting', [sorter]).then(function(){
                F.arr.each(self.ft.columns.array, function(col){
                    if (col != self.column) col.direction = null;
                });
                self.column = self.ft.columns.get(sorter.column);
                if (self.column) self.column.direction = F.Sorting.dir(sorter.direction);
                return self.ft.draw().then(function(){
                    /**
                     * The after.ft.sorting event is raised after a sorter has been applied.
                     * @event FooTable.Sorting#"after.ft.sorting"
                     * @param {jQuery.Event} e - The jQuery.Event object for the event.
                     * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                     * @param {FooTable.Sorter} sorter - The sorter that has been applied.
                     */
                    self.ft.raise('after.ft.sorting', [sorter]);
                });
            });
        },
        /**
         * Handles the sort button clicked event.
         * @instance
         * @private
         * @param {jQuery.Event} e - The event object for the event.
         */
        _onSortClicked: function (e) {
            e.preventDefault();
            var self = e.data.self, $header = $(this).closest('th,td'),
                direction = $header.is('.footable-asc, .footable-desc')
                    ? ($header.hasClass('footable-desc') ? 'ASC' : 'DESC')
                    : 'ASC';
            self._sort($header.index(), direction);
        }
    });

    /**
     * Checks the supplied string is a valid direction and if not returns ASC as default.
     * @static
     * @protected
     * @param {string} str - The string to check.
     */
    F.Sorting.dir = function(str){
        return F.checker.string(str) && (str == 'ASC' || str == 'DESC') ? str : 'ASC';
    };

    F.components.core.register('sorting', F.Sorting, 5);

})(jQuery, FooTable);
(function($, F){
    /**
     * The direction to sort if the {@link FooTable.Column#sorted} property is set to true. Can be "ASC", "DESC" or NULL. Added by the {@link FooTable.Sorting} component.
     * @type {string}
     * @default null
     */
    F.Column.prototype.direction = null;
    /**
     * Whether or not the column can be sorted. Added by the {@link FooTable.Sorting} component.
     * @type {boolean}
     * @default true
     */
    F.Column.prototype.sortable = true;
    /**
     * Whether or not the column is sorted. Added by the {@link FooTable.Sorting} component.
     * @type {boolean}
     * @default false
     */
    F.Column.prototype.sorted = false;

    /**
     * This is supplied two values from the column for a comparison to be made and the result returned. Added by the {@link FooTable.Sorting} component.
     * @param {*} a - The first value to be compared.
     * @param {*} b - The second value to compare to the first.
     * @returns {number}
     * @example <caption>This example shows using pseudo code what a sort function would look like.</caption>
     * "sorter": function(a, b){
	 * 	if (a is less than b by some ordering criterion) {
	 * 		return -1;
	 * 	}
	 * 	if (a is greater than b by the ordering criterion) {
	 * 		return 1;
	 * 	}
	 * 	// a must be equal to b
	 * 	return 0;
	 * }
     */
    F.Column.prototype.sorter = function(a, b){
        var tempA = $.parseHTML(a);
        if(tempA && tempA.length > 0){
            a = $(tempA[0]).text();
        }
        var tempB = $.parseHTML(b);
        if(tempB && tempB.length > 0){
            b = $(tempB[0]).text();
        }
        if (typeof a === 'string') a = a.toLowerCase();
        if (typeof b === 'string') b = b.toLowerCase();
        if (a === b) return 0;
        if (a < b) return -1;
        return 1;
    };

    // this is used to define the sorting specific properties on column creation
    F.Column.prototype.__sorting_define__ = function(definition){
        this.sorter = F.checkFnValue(this, definition.sorter, this.sorter);
        this.direction = F.checker.type(definition.direction, 'string') ? F.Sorting.dir(definition.direction) : null;
        this.sortable = F.checker.isBoolean(definition.sortable) ? definition.sortable : true;
        this.sorted = F.checker.isBoolean(definition.sorted) ? definition.sorted : false;
    };

    // overrides the public define method and replaces it with our own
    F.Column.extend('define', function(definition){
        this._super(definition);
        this.__sorting_define__(definition);
    });

})(jQuery, FooTable);
(function(F){
    /**
     * An object containing the sorting options for the plugin. Added by the {@link FooTable.Sorting} component.
     * @type {object}
     * @prop {boolean} enabled=false - Whether or not to allow sorting on the table.
     */
    F.Defaults.prototype.sorting = {
        enabled: false
    };
})(FooTable);
(function(F){
    /**
     * Sort the table using the specified column and direction. Added by the {@link FooTable.Sorting} component.
     * @instance
     * @param {(string|number|FooTable.Column)} column - The column name, index or the actual {@link FooTable.Column} object to sort by.
     * @param {string} [direction="ASC"] - The direction to sort by, either ASC or DESC.
     * @returns {jQuery.Promise}
     * @fires FooTable.Sorting#"change.ft.sorting"
     * @fires FooTable.Sorting#"changed.ft.sorting"
     * @see FooTable.Sorting#sort
     */
    F.Table.prototype.sort = function(column, direction){
        return this.use(F.Sorting).sort(column, direction);
    };
})(FooTable);
(function($, F){

    F.Pager = F.Class.extend(/** @lends FooTable.Pager */{
        /**
         * The pager object contains the page number and direction to page to.
         * @constructs
         * @extends FooTable.Class
         * @param {number} total - The total number of pages available.
         * @param {number} current - The current page number.
         * @param {number} size - The number of rows per page.
         * @param {number} page - The page number to goto.
         * @param {boolean} forward - A boolean indicating the direction of paging, TRUE = forward, FALSE = back.
         * @returns {FooTable.Pager}
         */
        construct: function(total, current, size, page, forward){
            /**
             * The total number of pages available.
             * @type {number}
             */
            this.total = total;
            /**
             * The current page number.
             * @type {number}
             */
            this.current = current;
            /**
             * The number of rows per page.
             * @type {number}
             */
            this.size = size;
            /**
             * The page number to goto.
             * @type {number}
             */
            this.page = page;
            /**
             * A boolean indicating the direction of paging, TRUE = forward, FALSE = back.
             * @type {boolean}
             */
            this.forward = forward;
        }
    });

})(jQuery, FooTable);
(function($, F){
    F.Paging = F.Component.extend(/** @lends FooTable.Paging */{
        /**
         * The paging component adds a pagination control to the table allowing users to navigate table rows via pages.
         * @constructs
         * @extends FooTable.Component
         * @param {FooTable.Table} table - The parent {@link FooTable.Table} object for the component.
         * @returns {FooTable.Filtering}
         */
        construct: function(table){
            // call the base constructor
            this._super(table, table.o.paging.enabled);

            /* PROTECTED */
            /**
             * An object containing the strings used by the paging buttons.
             * @type {{ first: string, prev: string, next: string, last: string }}
             */
            this.strings = table.o.paging.strings;

            /* PUBLIC */
            /**
             * The current page number to display.
             * @instance
             * @type {number}
             */
            this.current = table.o.paging.current;
            /**
             * The number of rows to display per page.
             * @instance
             * @type {number}
             */
            this.size = table.o.paging.size;
            /**
             * The maximum number of page links to display at once.
             * @type {number}
             */
            this.limit = table.o.paging.limit;
            /**
             * The position of the pagination control within the paging rows cell.
             * @type {string}
             */
            this.position = table.o.paging.position;
            /**
             * The format string used to generate the text displayed under the pagination control.
             * @type {string}
             */
            this.countFormat = table.o.paging.countFormat;
            /**
             * The total number of pages.
             * @instance
             * @type {number}
             */
            this.total = -1;
            /**
             * The jQuery row object that contains all the paging specific elements.
             * @instance
             * @type {jQuery}
             */
            this.$row = null;
            /**
             * The jQuery cell object that contains the pagination control and total count.
             * @instance
             * @type {jQuery}
             */
            this.$cell = null;
            /**
             * The jQuery object that contains the links for the pagination control.
             * @type {jQuery}
             */
            this.$pagination = null;
            /**
             * The jQuery object that contains the row count.
             * @type {jQuery}
             */
            this.$count = null;

            /* PRIVATE */
            /**
             * A number indicating the previous page displayed.
             * @private
             * @type {number}
             */
            this._previous = 1;

            /**
             * Used to hold the number of rows in the {@link FooTable.Rows#array} before paging is applied.
             * @type {number}
             * @private
             */
            this._total = 0;
        },

        /* PROTECTED */
        /**
         * Checks the supplied data and options for the paging component.
         * @instance
         * @protected
         * @param {object} data - The jQuery data object from the parent table.
         * @fires FooTable.Paging#"preinit.ft.paging"
         */
        preinit: function(data){
            var self = this;
            /**
             * The preinit.ft.paging event is raised before the UI is created and provides the tables jQuery data object for additional options parsing.
             * Calling preventDefault on this event will disable the component.
             * @event FooTable.Paging#"preinit.ft.paging"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {object} data - The jQuery data object of the table raising the event.
             */
            this.ft.raise('preinit.ft.paging', [data]).then(function(){
                if (self.ft.$el.hasClass('footable-paging'))
                    self.enabled = true;
                self.enabled = F.checker.isBoolean(data.paging)
                    ? data.paging
                    : self.enabled;

                if (!self.enabled) return;

                self.size = F.checker.number(data.pagingSize)
                    ? data.pagingSize
                    : self.size;

                self.current = F.checker.number(data.pagingCurrent)
                    ? data.pagingCurrent
                    : self.current;

                self.limit = F.checker.number(data.pagingLimit)
                    ? data.pagingLimit
                    : self.limit;

                if (self.ft.$el.hasClass('footable-paging-left'))
                    self.position = 'left';
                if (self.ft.$el.hasClass('footable-paging-center'))
                    self.position = 'center';
                if (self.ft.$el.hasClass('footable-paging-right'))
                    self.position = 'right';

                self.position = F.checker.string(data.pagingPosition)
                    ? data.pagingPosition
                    : self.position;

                self.countFormat = F.checker.string(data.pagingCountFormat)
                    ? data.pagingCountFormat
                    : self.countFormat;

                self.total = Math.ceil(self.ft.rows.array.length / self.size);
                self._total = self.total;
            }, function(){
                self.enabled = false;
            });
        },
        /**
         * Initializes the paging component for the plugin using the supplied table and options.
         * @instance
         * @protected
         * @fires FooTable.Paging#"init.ft.paging"
         */
        init: function(){
            /**
             * The init.ft.paging event is raised before its UI is generated.
             * Calling preventDefault on this event will disable the component.
             * @event FooTable.Paging#"init.ft.paging"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            var self = this;
            this.ft.raise('init.ft.paging').then(function(){
                self.$create();
            }, function(){
                self.enabled = false;
            });
        },
        /**
         * Destroys the paging component removing any UI generated from the table.
         * @instance
         * @protected
         * @fires FooTable.Paging#"destroy.ft.paging"
         */
        destroy: function () {
            /**
             * The destroy.ft.paging event is raised before its UI is removed.
             * Calling preventDefault on this event will prevent the component from being destroyed.
             * @event FooTable.Paging#"destroy.ft.paging"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             */
            var self = this;
            this.ft.raise('destroy.ft.paging').then(function(){
                self.ft.$el.removeClass('footable-paging')
                    .find('tfoot > tr.footable-paging').remove();
            });
        },
        /**
         * Performs the actual paging against the {@link FooTable.Rows#current} array removing all rows that are not on the current visible page.
         * @instance
         * @protected
         */
        predraw: function(){
            this.total = Math.ceil(this.ft.rows.array.length / this.size);
            this.current = this.current > this.total ? this.total : (this.current < 1 ? 1 : this.current);
            this._total = this.ft.rows.array.length;
            if (this.ft.rows.array.length > this.size)
                this.ft.rows.array = this.ft.rows.array.splice((this.current - 1) * this.size, this.size);
        },
        /**
         * Updates the paging UI setting the state of the pagination control.
         * @instance
         * @protected
         */
        draw: function(){
            this.$cell.attr('colspan', this.ft.columns.visibleColspan);
            this._setVisible(this.current, this.current > this._previous);
            this._setNavigation(true);
        },
        /**
         * Creates the paging UI from the current options setting the various jQuery properties of this component.
         * @instance
         * @protected
         */
        $create: function(){
            var self = this,
                multiple = self.total > 1,
                link = function(attr, html, klass){
                    return $('<li/>', {
                        'class': klass
                    }).attr('data-page', attr)
                        .append($('<a/>', {
                            'class': 'footable-page-link',
                            href: '#'
                        }).data('page', attr).html(html));
                },
                position;

            switch (self.position){
                case 'left': position = 'footable-paging-left'; break;
                case 'right': position = 'footable-paging-right'; break;
                default: position = 'footable-paging-center'; break;
            }
            self.ft.$el.addClass('footable-paging').addClass(position);
            self.$cell = $('<td/>').attr('colspan', self.ft.columns.visibleColspan);
            self.$row = $('<tr/>', { 'class': 'footable-paging' }).append(self.$cell).appendTo(self.ft.$el.children('tfoot'));
            self.$pagination = $('<ul/>', { 'class': 'pagination' }).on('click.footable', 'a.footable-page-link', { self: self }, self._onPageClicked);
            self.$count = $('<span/>', { 'class': 'label label-default' });

            if (self.total == 0 || self.total == 1){
                self.$pagination.empty();
                self.$count.text(self.total + ' of ' + self.total);
                self._total = self.total;
                return;
            }
            self.$pagination.empty();
            if (multiple) {
                self.$pagination.append(link('first', self.strings.first, 'footable-page-nav'));
                self.$pagination.append(link('prev', self.strings.prev, 'footable-page-nav'));
                if (self.limit > 0 && self.limit < self.total){
                    self.$pagination.append(link('prev-limit', self.strings.prevPages, 'footable-page-nav'));
                }
            }
            for (var i = 0, $li; i < self.total; i++){
                $li = link(i + 1, i + 1, 'footable-page');
                self.$pagination.append($li);
            }
            if (multiple){
                if (self.limit > 0 && self.limit < self.total){
                    self.$pagination.append(link('next-limit', self.strings.nextPages, 'footable-page-nav'));
                }
                self.$pagination.append(link('next', self.strings.next, 'footable-page-nav'));
                self.$pagination.append(link('last', self.strings.last, 'footable-page-nav'));
            }

            self.$cell.append(self.$pagination, $('<div/>', {'class': 'divider'}), self.$count);
            self._total = self.total;
        },

        /* PUBLIC */
        /**
         * Pages to the first page.
         * @instance
         * @returns {jQuery.Promise}
         * @fires FooTable.Paging#"before.ft.paging"
         * @fires FooTable.Paging#"after.ft.paging"
         */
        first: function(){
            return this._set(1);
        },
        /**
         * Pages to the previous page.
         * @instance
         * @returns {jQuery.Promise}
         * @fires FooTable.Paging#"before.ft.paging"
         * @fires FooTable.Paging#"after.ft.paging"
         */
        prev: function(){
            return this._set(this.current - 1 > 0 ? this.current - 1 : 1);
        },
        /**
         * Pages to the next page.
         * @instance
         * @returns {jQuery.Promise}
         * @fires FooTable.Paging#"before.ft.paging"
         * @fires FooTable.Paging#"after.ft.paging"
         */
        next: function(){
            return this._set(this.current + 1 < this.total ? this.current + 1 : this.total);
        },
        /**
         * Pages to the last page.
         * @instance
         * @returns {jQuery.Promise}
         * @fires FooTable.Paging#"before.ft.paging"
         * @fires FooTable.Paging#"after.ft.paging"
         */
        last: function(){
            return this._set(this.total);
        },
        /**
         * Pages to the specified page.
         * @instance
         * @param {number} page - The page number to go to.
         * @returns {jQuery.Promise}
         * @fires FooTable.Paging#"before.ft.paging"
         * @fires FooTable.Paging#"after.ft.paging"
         */
        goGet: function(page){
            return this._set(page > this.total ? this.total : (page < 1 ? 1 : page));
        },
        /**
         * Shows the previous X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit option value.
         * @instance
         */
        prevPages: function(){
            var page = this.$pagination.children('li.footable-page.visible:first').data('page') - 1;
            this._setVisible(page, true);
            this._setNavigation(false);
        },
        /**
         * Shows the next X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit option value.
         * @instance
         */
        nextPages: function(){
            var page = this.$pagination.children('li.footable-page.visible:last').data('page') + 1;
            this._setVisible(page, false);
            this._setNavigation(false);
        },

        /* PRIVATE */
        /**
         * Performs the required steps to handle paging including the raising of the {@link FooTable.Paging#"before.ft.paging"} and {@link FooTable.Paging#"after.ft.paging"} events.
         * @instance
         * @private
         * @param {number} page - The page to set.
         * @returns {jQuery.Promise}
         * @fires FooTable.Paging#"before.ft.paging"
         * @fires FooTable.Paging#"after.ft.paging"
         */
        _set: function(page){
            var self = this,
                pager = new F.Pager(self.total, self.current, self.size, page, page > self.current);
            /**
             * The before.ft.paging event is raised before a sort is applied and allows listeners to modify the pager or cancel it completely by calling preventDefault on the jQuery.Event object.
             * @event FooTable.Paging#"before.ft.paging"
             * @param {jQuery.Event} e - The jQuery.Event object for the event.
             * @param {FooTable.Table} ft - The instance of the plugin raising the event.
             * @param {FooTable.Pager} pager - The pager that is about to be applied.
             */
            return self.ft.raise('before.ft.paging', [pager]).then(function(){
                pager.page = pager.page > pager.total ? pager.total	: pager.page;
                pager.page = pager.page < 1 ? 1 : pager.page;
                if (self.current == page) return $.when();
                self._previous = self.current;
                self.current = pager.page;
                return self.ft.draw().then(function(){
                    /**
                     * The after.ft.paging event is raised after a pager has been applied.
                     * @event FooTable.Paging#"after.ft.paging"
                     * @param {jQuery.Event} e - The jQuery.Event object for the event.
                     * @param {FooTable.Table} ft - The instance of the plugin raising the event.
                     * @param {FooTable.Pager} pager - The pager that has been applied.
                     */
                    self.ft.raise('after.ft.paging', [pager]);
                });
            });
        },
        /**
         * Sets the state for the navigation links of the pagination control and optionally sets the active class state on the current page link.
         * @instance
         * @private
         * @param {boolean} active - Whether or not to set the active class state on the individual page links.
         */
        _setNavigation: function(active){
            if (this.current == 1) {
                this.$pagination.children('li[data-page="first"],li[data-page="prev"]').addClass('disabled');
            } else {
                this.$pagination.children('li[data-page="first"],li[data-page="prev"]').removeClass('disabled');
            }

            if (this.current == this.total) {
                this.$pagination.children('li[data-page="next"],li[data-page="last"]').addClass('disabled');
            } else {
                this.$pagination.children('li[data-page="next"],li[data-page="last"]').removeClass('disabled');
            }

            if ((this.$pagination.children('li.footable-page.visible:first').data('page') || 1) == 1) {
                this.$pagination.children('li[data-page="prev-limit"]').addClass('disabled');
            } else {
                this.$pagination.children('li[data-page="prev-limit"]').removeClass('disabled');
            }

            if ((this.$pagination.children('li.footable-page.visible:last').data('page') || this.limit) == this.total) {
                this.$pagination.children('li[data-page="next-limit"]').addClass('disabled');
            } else {
                this.$pagination.children('li[data-page="next-limit"]').removeClass('disabled');
            }

            if (this.limit > 0 && this.total < this.limit){
                this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').hide();
            } else {
                this.$pagination.children('li[data-page="prev-limit"],li[data-page="next-limit"]').show();
            }

            if (active){
                this.$pagination.children('li.footable-page').removeClass('active').filter('li[data-page="' + this.current + '"]').addClass('active');
            }
        },
        /**
         * Sets the visible page using the supplied parameters.
         * @instance
         * @private
         * @param {number} page - The page to make visible.
         * @param {boolean} right - If set to true the supplied page will be the right most visible pagination link.
         */
        _setVisible: function(page, right){
            if (this.limit > 0 && this.total > this.limit){
                if (!this.$pagination.children('li.footable-page[data-page="'+page+'"]').hasClass('visible')){
                    var start = 0, end = 0;
                    if (right == true){
                        end = page > this.total ? this.total : page;
                        start = end - this.limit;
                    } else {
                        start = page < 1 ? 0 : page - 1;
                        end = start + this.limit;
                    }
                    if (start < 0){
                        start = 0;
                        end = this.limit > this.total ? this.total : this.limit;
                    }
                    if (end > this.total){
                        end = this.total;
                        start = this.total - this.limit < 0 ? 0 : this.total - this.limit;
                    }
                    this.$pagination.children('li.footable-page').removeClass('visible').slice(start, end).addClass('visible');
                }
            } else {
                this.$pagination.children('li.footable-page').removeClass('visible').slice(0, this.total).addClass('visible');
            }
            var first = (this.size * (page - 1)) + 1,
                last = this.size * page;
            if (this.ft.rows.array.length == 0){
                first = 0;
                last = 0;
            } else {
                last = last > this._total ? this._total : last;
            }
            this._setCount(page, this.total, first, last, this._total);
        },
        /**
         * Uses the countFormat option to generate the text using the supplied parameters.
         * @param {number} currentPage - The current page.
         * @param {number} totalPages - The total number of pages.
         * @param {number} pageFirst - The first row number of the current page.
         * @param {number} pageLast - The last row number of the current page.
         * @param {number} totalRows - The total number of rows.
         * @private
         */
        _setCount: function(currentPage, totalPages, pageFirst, pageLast, totalRows){
            this.$count.text(this.countFormat.replace(/\{CP}/g, currentPage)
                .replace(/\{TP}/g, totalPages)
                .replace(/\{PF}/g, pageFirst)
                .replace(/\{PL}/g, pageLast)
                .replace(/\{TR}/g, totalRows));
        },
        /**
         * Handles the click event for all links in the pagination control.
         * @instance
         * @private
         * @param {jQuery.Event} e - The event object for the event.
         */
        _onPageClicked: function(e){
            e.preventDefault();
            if ($(e.target).closest('li').is('.active,.disabled')) return;

            var self = e.data.self, page = $(this).data('page');
            switch(page){
                case 'first': self.first();
                    return;
                case 'prev': self.prev();
                    return;
                case 'next': self.next();
                    return;
                case 'last': self.last();
                    return;
                case 'prev-limit': self.prevPages();
                    return;
                case 'next-limit': self.nextPages();
                    return;
                default: self._set(page);
                    return;
            }
        }
    });

    F.components.core.register('paging', F.Paging, 0);

})(jQuery, FooTable);
(function(F){
    /**
     * An object containing the paging options for the plugin. Added by the {@link FooTable.Paging} component.
     * @type {object}
     * @prop {boolean} enabled=false - Whether or not to allow paging on the table.
     * @prop {string} countFormat="{CP} of {TP}" - A string format used to generate the page count text.
     * @prop {number} current=1 - The page number to display.
     * @prop {number} limit=5 - The maximum number of page links to display at once.
     * @prop {string} position="center" - The string used to specify the alignment of the pagination control.
     * @prop {number} size=10 - The number of rows displayed per page.
     * @prop {object} strings - An object containing the strings used by the paging buttons.
     * @prop {string} strings.first="&laquo;" - The string used for the 'first' button.
     * @prop {string} strings.prev="&lsaquo;" - The string used for the 'previous' button.
     * @prop {string} strings.next="&rsaquo;" - The string used for the 'next' button.
     * @prop {string} strings.last="&raquo;" - The string used for the 'last' button.
     * @prop {string} strings.prevPages="..." - The string used for the 'previous X pages' button.
     * @prop {string} strings.nextPages="..." - The string used for the 'next X pages' button.
     */
    F.Defaults.prototype.paging = {
        enabled: false,
        countFormat: '{CP} of {TP}',
        current: 1,
        limit: 5,
        position: 'center',
        size: 10,
        strings: {
            first: '&laquo;',
            prev: '&lsaquo;',
            next: '&rsaquo;',
            last: '&raquo;',
            prevPages: '...',
            nextPages: '...'
        }
    };
})(FooTable);
(function(F){
    /**
     * Navigates to the specified page number. Added by the {@link FooTable.Paging} component.
     * @instance
     * @param {number} num - The page number to go to.
     * @returns {jQuery.Promise}
     * @fires FooTable.Paging#paging_changing
     * @fires FooTable.Paging#paging_changed
     * @see FooTable.Paging#goto
     */
    F.Table.prototype.gotoPage = function(num){
        return this.use(F.Paging).goGet(num);
    };

    /**
     * Navigates to the next page. Added by the {@link FooTable.Paging} component.
     * @instance
     * @returns {jQuery.Promise}
     * @fires FooTable.Paging#paging_changing
     * @fires FooTable.Paging#paging_changed
     * @see FooTable.Paging#next
     */
    F.Table.prototype.nextPage = function(){
        return this.use(F.Paging).next();
    };

    /**
     * Navigates to the previous page. Added by the {@link FooTable.Paging} component.
     * @instance
     * @returns {jQuery.Promise}
     * @fires FooTable.Paging#paging_changing
     * @fires FooTable.Paging#paging_changed
     * @see FooTable.Paging#prev
     */
    F.Table.prototype.prevPage = function(){
        return this.use(F.Paging).prev();
    };

    /**
     * Navigates to the first page. Added by the {@link FooTable.Paging} component.
     * @instance
     * @returns {jQuery.Promise}
     * @fires FooTable.Paging#paging_changing
     * @fires FooTable.Paging#paging_changed
     * @see FooTable.Paging#first
     */
    F.Table.prototype.firstPage = function(){
        return this.use(F.Paging).first();
    };

    /**
     * Navigates to the last page. Added by the {@link FooTable.Paging} component.
     * @instance
     * @returns {jQuery.Promise}
     * @fires FooTable.Paging#paging_changing
     * @fires FooTable.Paging#paging_changed
     * @see FooTable.Paging#last
     */
    F.Table.prototype.lastPage = function(){
        return this.use(F.Paging).last();
    };

    /**
     * Shows the next X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit.size option value. Added by the {@link FooTable.Paging} component.
     * @instance
     * @see FooTable.Paging#nextPages
     */
    F.Table.prototype.nextPages = function(){
        return this.use(F.Paging).nextPages();
    };

    /**
     * Shows the previous X number of pages in the pagination control where X is the value set by the {@link FooTable.Defaults#paging} - limit.size option value. Added by the {@link FooTable.Paging} component.
     * @instance
     * @see FooTable.Paging#prevPages
     */
    F.Table.prototype.prevPages = function(){
        return this.use(F.Paging).prevPages();
    };
})(FooTable);
/*!
 * jQuery Placeholder Plugin v2.1.3
 * https://github.com/mathiasbynens/jquery-placeholder
 *
 * Copyright 2011, 2015 Mathias Bynens
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;
    var settings = {};

    if (isInputSupported && isTextareaSupported) {

        placeholder = $.fn.placeholder = function() {
            return this;
        };

        placeholder.input = true;
        placeholder.textarea = true;

    } else {

        placeholder = $.fn.placeholder = function(options) {

            var defaults = {customClass: 'placeholder'};
            settings = $.extend({}, defaults, options);

            return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.'+settings.customClass)
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {

                var $element = $(element);
                var $passwordInput = $element.data('placeholder-password');

                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
            },
            'set': function(element, value) {

                var $element = $(element);
                var $replacement;
                var $passwordInput;

                if (value !== '') {

                    $replacement = $element.data('placeholder-textinput');
                    $passwordInput = $element.data('placeholder-password');

                    if ($replacement) {
                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
                        $replacement[0].value = value;

                    } else if ($passwordInput) {
                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
                        element.value = value;
                    }
                }

                if (!$element.data('placeholder-enabled')) {
                    element.value = value;
                    return $element;
                }

                if (value === '') {

                    element.value = value;

                    // Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }

                } else {

                    if ($element.hasClass(settings.customClass)) {
                        clearPlaceholder.call(element);
                    }

                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }

        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {

                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.'+settings.customClass, this).each(function() {
                    clearPlaceholder.call(this, true, '');
                });

                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.'+settings.customClass).each(function() {
                this.value = '';
            });
        });
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;

        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });

        return newAttrs;
    }

    function clearPlaceholder(event, value) {

        var input = this;
        var $input = $(input);

        if (input.value === $input.attr('placeholder') && $input.hasClass(settings.customClass)) {

            input.value = '';
            $input.removeClass(settings.customClass);

            if ($input.data('placeholder-password')) {

                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));

                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    $input[0].value = value;

                    return value;
                }

                $input.focus();

            } else {
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder(event) {
        var $replacement;
        var input = this;
        var $input = $(input);
        var id = input.id;

        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
        if (event && event.type === 'blur') {

            if ($input.hasClass(settings.customClass)) {
                return;
            }

            if (input.type === 'password') {
                $replacement = $input.prevAll('input[type="text"]:first');
                if ($replacement.length > 0 && $replacement.is(':visible')) {
                    return;
                }
            }
        }

        if (input.value === '') {
            if (input.type === 'password') {
                if (!$input.data('placeholder-textinput')) {

                    try {
                        $replacement = $input.clone().prop({ 'type': 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }

                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-enabled': true,
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);

                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }

                input.value = '';
                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

            } else {

                var $passwordInput = $input.data('placeholder-password');

                if ($passwordInput) {
                    $passwordInput[0].value = '';
                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
                }
            }

            $input.addClass(settings.customClass);
            $input[0].value = $input.attr('placeholder');

        } else {
            $input.removeClass(settings.customClass);
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        try {
            return document.activeElement;
        } catch (exception) {}
    }
}));
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function () {
    'use strict';

    //==================================================
    // "APP" NAMESPACE
    //--------------------------------------------------
    window.APP = (typeof APP !== 'undefined' && APP instanceof Object) ? APP : {

        //--------------------------------------------------
        // CONFIGS
        //--------------------------------------------------
        configs: {
            activeClass: 'app-active',
            views: { //from _site-settings.scss
                'large': 1200, // $width-large: 75em;  // 1200/16
                'medium': 992, // $width-medium: 62em; //  992/16
                'small': 752, // $width-small: 48em;  //  768/16
                'xsmall': 480
            },
            isMobile: {
                Android: function () {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function () {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function () {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function () {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function () {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function () {
                    return (APP.configs.isMobile.Android() || APP.configs.isMobile.BlackBerry() || APP.configs.isMobile.iOS() || APP.configs.isMobile.Opera() || APP.configs.isMobile.Windows());
                },
                nullcheck: function () {
                    return (APP.configs.isMobile.Android()!=null || APP.configs.isMobile.BlackBerry()!=null || APP.configs.isMobile.iOS()!=null || APP.configs.isMobile.Opera()!=null || APP.configs.isMobile.Windows()!=null);

                }
            },
            isLocal: false,
            isLocalImages: false //only relates to loading local images for picturefill
        },
        templates: {

        },
        //--------------------------------------------------
        // UTILITY METHODS
        //--------------------------------------------------
        utils: {
            getIEVersion: function () {
                var agent = navigator.userAgent;
                var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
                var matches = agent.match(reg);
                if (matches !== null) {
                    return {
                        major: matches[1],
                        minor: matches[2]
                    };
                }
                return {
                    major: '-1',
                    minor: '-1'
                };
            },
            getViewport: function () {
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                var size;
                if ($('html').hasClass('lt-ie9')) {
                    size = 'large';
                } else {
                    size = (w <= APP.configs.views.xsmall) ? 'xsmall' : size;
                    size = (w > APP.configs.views.xsmall) ? 'small' : size;
                    size = (w > APP.configs.views.small) ? 'medium' : size;
                    size = (w > APP.configs.views.medium) ? 'large' : size;
                    size = (w > APP.configs.views.large) ? 'xlarge' : size;
                }

                APP.configs.viewport = {
                    size: size,
                    width: w,
                    height: h
                };

                return APP.configs.viewport;
            },
            aspectRatio: function () {
                $('.flipper').each(function () {
                    var w = $(this).width();
                    $(this).css('height', w);
                });
            },
            transEndEventName: function () {
                var transEndEventNames = { // transition end event name
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                };
                return transEndEventNames[Modernizr.prefixed('transition')];
            },
            getUrlParameter: function (sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] === sParam) {
                        return sParameterName[1];
                    }
                }
            },

            truncateText: function(element,charCountObj){
                if(!charCountObj){
                    charCountObj = {xlarge: 60, large: 60, medium: 50, small: 40, xsmall: 40};
                }
                var charCount = charCountObj[APP.utils.getViewport().size];
                var elemText = $.trim(element.text());
                if(elemText.length > charCount){
                    var text = elemText.substring(0,charCount);
                    text = text.substring(0,text.lastIndexOf(' ')) + '...';
                    element.text(text);
                }
            }

        }
    };
    //--------------------------------------------------
    // end "APP" NAMESPACE
    //==================================================




    //==================================================
    // DOCUMENT READY...
    //--------------------------------------------------

    $(function () {

        //--------------------------------------------------
        // Init Fastclick
        //--------------------------------------------------
        FastClick.attach(document.body);


        APP.utils.getViewport();


        //--------------------------------------------------
        // Add IE10 Class
        //--------------------------------------------------
        if (APP.utils.getIEVersion().major === '10') {
            $('html').addClass('ie10');
        }
        var rv; var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
        if(rv === 11){ $('html').addClass('ie11'); }
        //--------------------------------------------------



        APP.utils.aspectRatio();



        //--------------------------------------------------
        // RESIZE EVENT
        // Fires "windowResize" on $(window)
        //--------------------------------------------------
        var resizeTimer;
        $(window).resize(function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                APP.utils.getViewport();
                APP.utils.aspectRatio();
                $(window).trigger('windowResize');
            }, 500);
        });
        //--------------------------------------------------

        //--------------------------------------------------
        //  ADJUST HEADLINE TEXT
        //  Adjust first char of headline if available
        //--------------------------------------------------
        $('.headline p.headline-content').html(function (i, html) {
            return html.replace(/^[^\s\S]*([\s\S])/g, '<span class="first-large">$1</span>');
        });

        //--------------------------------------------------

        //--------------------------------------------------
        //  ALTERNATE HIGHLIGHT ON SECTION
        //--------------------------------------------------
        // Prevent section titles in cell-d to have highlights
        $('.cell-d').find('.highlight').removeClass('highlight');
        $('.highlight').each(function (index) {
            if (index % 2 === 0) { /* we are even */ } else {
                $(this).addClass('apply');
            }
        });
        //--------------------------------------------------

         //--------------------------------------------------
        //  static hero functionality
        //--------------------------------------------------

        if($(".media-body-text h3").length == '' || $('.media-body-text h3').text() == ""){
          $('.media-body-text h3').addClass("hidden");
        }

        //--------------------------------------------------
        //  Alert bar close
        //--------------------------------------------------
        $('.alert-close').click(function () {
            $('.alerts').hide('slow');
        });

        //--------------------------------------------------
        //  Event details open/close
        //--------------------------------------------------
        $('.event-detail-title').click(function () {
            $(this).parent().find('.event-details').slideToggle('fast');
            $(this).find('.details-plus, .details-minus').toggle();
        });

        //--------------------------------------------------
        // Form Helper Dialog
        //--------------------------------------------------
        $('.field-helper').click(function () {
            $(this).siblings('.field-helper-dialog').css('opacity', 1);
        });

        $('.field-helper-dialog').click(function () {
            $(this).css('opacity', 0);
        });

        $('.md-field-toggle').click(function () {
            $(this).toggleClass('off');
        });

        $('html').on('touchmove', 'body.lg-on', function (event) {
            event.preventDefault();
        })

        //--------------------------------------------------
        //  INIT SCROLL MAGIC PLUGIN
        //  Create the controller to manage scrolling effects
        //--------------------------------------------------
        APP.scrollController = new ScrollMagic();


        //--------------------------------------------------
        //  INIT SCROLL MAGIC PLUGIN
        //  Create the controller to manage scrolling effects
        //--------------------------------------------------
        $('#iso-container').isotope({
            // options...
            itemSelector: '.iso-item',
            masonry: {
                columnWidth: '.iso-item'
            }
        });

        //--------------------------------------------------
        //  Left Navigation
        //--------------------------------------------------
        $('#sidebar-nav').find('.parent-link').each(function() {
            if ($(this).find('ul.child-level li').length === 0) {
                $(this).addClass('active-nochild');

            }
        });


        //--------------------------------------------------
        //  INIT MODULES
        //  Initialize the app's modules
        //--------------------------------------------------
        APP.Nav.init();
        APP.Footer.init();
        APP.Comments.init();
        APP.SearchResults.init();
        APP.GlossarySearch.init();


        $('#mobile-menu .search-wrapper').each(function(){
            $(this).searchForm($(this).data('predictiveurl'));
        });

        $('#nav-search.search-wrapper').each(function(){
            $(this).searchForm($(this).data('predictiveurl'));
        });

        $('#error-search-box-wrapper .search-wrapper').each(function(){
            $(this).searchForm($(this).data('predictiveurl'));

        });

        /*
         * For each cancer type search, initialize the predictive search form
         */
        $('#search-cancer-types').each(function(){
            $(this).predictiveSearchForm( $(this).data('searchurl') );
        });


        $('#search-clinical-trials.search-form').closest('.search-wrapper').each(function(){
            $(this).clinicalTrialsSearch($(this).data('searchurl'));
        });

        $('.mda-publication-search, .mda-blog-search').each(function() {
            $(this).searchForm($(this).data('predictiveurl'), $(this).data('predictivetype'));
        });

        if (APP.configs.isLocal) {
            var publicationTypeAheadQuery = '/suggest?max=4&site=mda_aem&access=access&format=rich&client=blog_fe&q=';
            var blogTypeAheadQuery = '/suggest?max=4&site=mda_aem&access=access&format=rich&client=blog_fe&q=';
        }

        //--------------------------------------------------
        //  INIT SECTIONS
        //  Initialize the section transitions
        //  (APP.scrollController must be initialized first)
        //--------------------------------------------------
        $('.scroll-trans').each(function () {
            $(this).scrollTransition();
        });
        //--------------------------------------------------
        //  Title truncation
        //--------------------------------------------------
        var articleTitleOneCol = {xlarge: 42, large: 42, medium: 42, small: 42, xsmall: 42};
        var articleSummaryOneCol = {xlarge: 440, large: 440, medium: 440, small: 440, xsmall: 440};


        var articleTitleTwoColWithImage = {xlarge: 60, large: 60, medium: 60, small: 54, xsmall: 54};
        var articleSummaryTwoColWithImage = {xlarge: 135, large: 135, medium: 135, small: 135, xsmall: 135};

        var articleTitleTwoColNoImage = {xlarge: 67, large: 67, medium: 60, small: 54, xsmall: 54};
        var articleSummaryTwoColNoImage = {xlarge: 135, large: 135, medium: 135, small: 135, xsmall: 135};

        var blogSummaryWrapper = $('.blog-summary');
        blogSummaryWrapper.each(function(){
            var $this = $(this);
            if($this.closest('.cell-l,.cell-r').length === 0){
                APP.utils.truncateText($this.find('.blog-title a'),articleTitleOneCol);
                APP.utils.truncateText($this.find('.summary-text'),articleSummaryOneCol);
            } else{
                if($this.find('.blog-summary-img-wrapper').length > 0){
                    APP.utils.truncateText($this.find('.blog-title a'),articleTitleTwoColWithImage);
                    APP.utils.truncateText($this.find('.summary-text'),articleSummaryTwoColWithImage);
                } else{
                    APP.utils.truncateText($this.find('.blog-title a'),articleTitleTwoColNoImage);
                    APP.utils.truncateText($this.find('.summary-text'),articleSummaryTwoColNoImage);
                }
            }

        });


        //--------------------------------------------------
        //  Programatically adding m-bledd to certain modules
        //--------------------------------------------------
        $('.promo-with-background').closest('.module').addClass('m-bleed');
        $('.basic-content-media').closest('.module').addClass('m-bleed');


    });

    $('.alert-close').click(function () {
        $('.alerts').hide('slow');
    });

    //--------------------------------------------------
    //  SHARE SECTIONS
    //  Share functionality
    //--------------------------------------------------
    $('.share-btn').on('click', function (e) {
        e.preventDefault();
        var shareBox = $(this).siblings('.social-share'),
            shareBoxWidth = shareBox.width(),
            leftOffset = shareBox.offset().left,
            screenWidth = APP.utils.getViewport().width;

        if ((screenWidth - (leftOffset + shareBoxWidth)) <= 50) {
            shareBox.addClass('adjust-right');
        }

        shareBox.toggleClass('visible');
    });

    $('.social-close-btn').on('click', function (e) {
        e.preventDefault();
        var shareBox = $(this).closest('.social-share');

        shareBox.removeClass('visible');
    });
    //--------------------------------------------------
    //  JWPlayer
    //  JWPlayer functionality
    //--------------------------------------------------
    $('.media-option').each(function(){
        $(this).mdaJWPlayer( true );
    });

    $('.basic-content-media').each(function(){
        $(this).mdaJWPlayer( true );
    });

    $('.flip-tile').each(function(){
        var $this = $(this);
        if($this.find('.video-play-button').length > 0){
            $this.on('mouseenter',function(e){
                $this.mdaJWPlayer( true );
            });
            $this.on('click', 'a', function (event) {
                event.preventDefault();
            })
        }
    });

    $('.static-hero').each(function (index, value) {
        var container = $(value).find('.inner');
        if ($(container).find('.video-play-button').length > 0) {
            $(container).mdaJWPlayer( true );
            $(container).on('click', function (event) {
                event.preventDefault();
            })
        }
    });

    $('.carousel-item').each(function(){
        var inOverlay = false;
        if($(this).closest('cell-l').length > 0 || $(this).closest('cell-r').length > 0 || $(this).closest('cell-s').length > 0 || $(this).closest('cell-t').length > 0){
            inOverlay = true;
        }
        if($(this).find('.video-play-button').length > 0){

            $(this).find('.carousel-item-link').on('click',function(e){
                e.preventDefault();
            });
            $(this).each(function(){
                $(this).mdaJWPlayer( true );
            });
        }
    });


    $('.collection-item .inner').each(function(){
        if($(this).find('.video-play-button').length > 0 && $(this).closest('.video-collection').length === 0){
            $(this).on('click',function(e){
                e.preventDefault();
            });

            $(this).each(function(){
                $(this).mdaJWPlayer( true );
            });


        }
    });

	$('.flip-row').each(function() {
        var flipTile = $(this).find('.flip-tile');
        $.each(flipTile, function(index, value){
            if (index < 2) return;
            $(this).addClass("hide");
        });
    });
    //--------------------------------------------------
    //  Hero Carousel Brightness
    //--------------------------------------------------
    var brightnessClass = 'mda-media-brightness';
    var $heros = $('.static-hero');

    $heros.each(function(){

        var $body = $(this).find('.media-body');
        var $image = $(this).find('.hero-image.fullwidth-image');
        var $title = $body.find('h1').not('.hidden-header');
        var $bodyCopy = $body.find('h3');
        if($title.length !== 0 || $bodyCopy.length !== 0 ){
            $image.addClass(brightnessClass);
        }

    });
    //--------------------------------------------------
    //  IE9 Place Holder
    //--------------------------------------------------

    $('input').placeholder({ customClass: 'ie9-placeholder' });
    //--------------------------------------------------
    //  Verify breadcrumbs avaibility
    //--------------------------------------------------

    function addBreadcrumb () {
        var global_header = $('#global-header'),
            breadcrumb_wrapper = $('.breadcrumb-wrapper'),
            back_button = $('#sidebar-nav').find('.sidebar-back');
        if (APP.utils.getViewport().width < APP.configs.views['medium']) {
          breadcrumb_wrapper.addClass('hide');
        } else {
          breadcrumb_wrapper.removeClass('hide');
          if (breadcrumb_wrapper.length > 0) {
            back_button.addClass('hidden');
          } else {
            back_button.removeClass('hidden');
          }
        }
    }

    addBreadcrumb();



    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================


    //--------------------------------------------------
    // Image Carousel Item Count...
    //==================================================

    function imageSlides () {
        var slides = $('.image-carousel').find('.carousel-item');
        $.each(slides, function function_name (index, value) {
            var count = '<span class="slide-count">'+ (index+1) + '/'+slides.length+'</span>'
            $(value).append(count);
        })
    }
    imageSlides();
    //--------------------------------------------------
    // End Image Carousel Item Count...
    //==================================================


    //--------------------------------------------------
    // Right over left
    //==================================================
    if (APP.utils.getViewport().width <= APP.configs.views['small']) {
        var rolCandidates = $('.table.right-over-left');
        rolCandidates.each(function () {
            var $this = $(this);
            var bottom = $this.find('.last').detach();
            $this.prepend(bottom);
        });
    }


    //--------------------------------------------------
    // End Right over left
    //==================================================


    //--------------------------------------------------
    // Text With Border
    //==================================================

    var $textWithBorders = $('.text-border-container');

    $textWithBorders.each(function(){
        var $borderItems = $('.border-item-wrapper');
        var maxHeight = 270;
        if (APP.utils.getViewport().width <= APP.configs.views['medium']) {
            maxHeight = 220;
        }

        $borderItems.each(function(){
            if($(this).find('a').first().outerHeight() > maxHeight){
                maxHeight = $(this).find('a').first().outerHeight();
            }
            $(this).find('a').css({'height': '100%'});
        });

        $borderItems.css({'height': maxHeight + 'px'})

    });


    //--------------------------------------------------
    // Text With Border
    //==================================================






}());

;(function () {
	'use strict';

    var $flipTiles = $('.flip-tile');
    var $flipTilesNotVid = $('.flip-tile').not('.video-hover');
    function shouldFlip() {
        var b = true;
        $('.flip-tile').each(function() {
            if ($(this).is(':hover') || $('html').hasClass('applyflip')) {
                b = false;
            }
        });
        if(!b) {
            $flipTiles.removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
        }
        return b;
    }

    if($flipTiles.length > 0) {
        if($('html').hasClass('ie10') || $('html').hasClass('ie9') || $('html').hasClass('lt-ie9') || $('html').hasClass('ie11')) {
            var flipTimer = setTimeout(shorterFlipIE, 10000);
        } else {
            var flipTimer = setTimeout(shorterFlip, 10000);
        }
    }

    function shorterFlipIE(){
        var flipTimer = setInterval(randomFlipIE, 3000);
    }

    function shorterFlip(){
        var flipTimer = setInterval(randomFlip, 3000);
    }

    function randomFlip() {
        if(shouldFlip()) { 
            $flipTilesNotVid.removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');;
            $($flipTilesNotVid[Math.floor(Math.random()*$flipTilesNotVid.length)]).addClass('applyflip');
        }
        
    }

    $('.flip-hero .flip-tile').on('mouseenter',function(){ 
        $('.flip-hero .flip-tile').not($(this)).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
    });


    function randomFlipIE() {
        if(shouldFlip()) {
            $flipTilesNotVid.each(function() {
                if (!$(this).is(':hover')) {
                    $(this).removeClass('applyflip').removeClass('randactive');
                }
            });
            $($flipTilesNotVid[Math.floor(Math.random()*$flipTilesNotVid.length)]).addClass('applyflip').addClass('randactive');
        }
    }

    $flipTiles.each(function(){
        var $this = $(this);
        if($this.find('a').length > 0 && !APP.configs.isMobile.nullcheck()){
            $this.find('a').on('click',function(e){
                e.stopPropagation();
                if(!$this.hasClass('applyflip') && !$this.hasClass('touched') && !$this.hasClass('active') && (!$this.is(':hover') || APP.configs.isMobile.nullcheck() )){
                    e.preventDefault();
                    if($this.find('div.video-play-button').length > 0){
                        $this.mdaJWPlayer( true );
                    }
                    $(this).closest('.flip-tile').addClass('active');
                    $(this).closest('.flip-tile').addClass('touched');
                    $('.flip-hero .flip-tile').not($(this).closest('.flip-tile')).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
                } else{
                    $this.find('div.video-play-button').trigger('customPlayer',["triggered"]);
                    $(this).closest('.flip-tile').removeClass('active');
                    $(this).closest('.flip-tile').removeClass('touched');
                }
            });
        } else{
            if($this.find('a').length > 0 ){
                $this.find('a').on('touchend',function(e){
                    if(!$this.hasClass('applyflip') && !$this.hasClass('touched') && !$this.hasClass('active')){
                        e.stopPropagation();
                        e.preventDefault();
                        if($this.find('div.video-play-button').length > 0){
                            $this.mdaJWPlayer( true );
                        }
                        $(this).closest('.flip-tile').addClass('active');
                        $(this).closest('.flip-tile').addClass('touched');
                        $('.flip-hero .flip-tile').not($(this).closest('.flip-tile')).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
                    } else{
                        if($this.find('div.video-play-button').length > 0){
                            e.stopPropagation();
                            e.preventDefault();
                            $this.find('div.video-play-button').trigger('customPlayer',["triggered"]);
                        }
                        $(this).closest('.flip-tile').removeClass('active');
                        $(this).closest('.flip-tile').removeClass('touched');
                    }
                });
            } else{
                $(this).on('touchend',function(e){
                    if(!$(this).hasClass('applyflip') && !$(this).hasClass('touched') && !$(this).hasClass('active')){
                        e.stopPropagation();
                        e.preventDefault();
                        if($this.find('div.video-play-button').length > 0){
                            $this.mdaJWPlayer( true );
                        }
                        $(this).closest('.flip-tile').addClass('active');
                        $(this).closest('.flip-tile').addClass('touched');
                        $('.flip-hero .flip-tile').not($(this).closest('.flip-tile')).removeClass('active').removeClass('applyflip').removeClass('randactive').removeClass('touched');
                    } else{
                        e.stopPropagation();
                        e.preventDefault();
                        $this.find('.video-play-button').trigger('click',["triggered"]);
                        $(this).closest('.flip-tile').removeClass('active');
                        $(this).closest('.flip-tile').removeClass('touched');
                    }
                });
            }

        }

    });

    //--------------------------------------------------
    //  Flip hero IE
    //--------------------------------------------------
    if($('html').hasClass('ie9') || $('html').hasClass('lt-ie9') || $('html').hasClass('ie11')) {
        $('.flip-tile').on('mouseenter', function(){
            if(!$(this).hasClass('randactive') ||  !$(this).hasClass('applyflip')) {
                $(this).toggleClass('applyflip');
            }
        }).on('mouseleave', function(){
            if(!$(this).hasClass('randactive')) {
                $(this).toggleClass('applyflip');
            }
        });
    }

	//--------------------------------------------------
    //  Flip hero alternate color
    //--------------------------------------------------
    var paintFlipHero = function (item) {
        var patients_tile = item.find('.flip-row .patient');
    	var others_tile = item.find('.flip-row .other');
    	$.each($(patients_tile), function (rowIndex, rowValue) {
    		switch (rowIndex % 3) {
                case 0:
                    $(rowValue).addClass('tan');
                break;
                case 1:
                    $(rowValue).addClass('white');
                break;
                case 2:
                    $(rowValue).addClass('black');
                break;
            }
    	});
        $.each($(others_tile), function (rowIndex, rowValue) {
            switch (rowIndex % 2) {
                case 0:
                    $(rowValue).addClass('blue');
                    break;
                case 1:
                    $(rowValue).addClass('red');
                    break;
            }
        });

    }
    $.each($('.flip-hero'), function (index, value) {
    	var self = $(value);
        paintFlipHero(self);
    })
}());
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var CarouselComponent = (function(Carousel) {
    return Carousel = {
      $el: $('.carousel-group'),
      config: {
        'default': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          slide: '.carousel-item',
          dots: true,
          arrows: true,
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'upcoming-events': {
          speed: 1000,
          slidesToShow: 2,
          slidesToScroll: 2,
          slide: '.carousel-item',
          dots: false,
          arrows: true,
          infinite: true,
          centerMode: false,
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'highlight': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          slide: '.carousel-item',
          dots: true,
          arrows: true,
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: true,
              arrows: false,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'hero': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          fade: true,
          slide: 'div',
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'hero-inline': {
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          fade: true,
          slide: 'div',
          responsive: [{
            breakpoint: 753,
            settings: {
              cssEase: 'linear',
              centerMode: false,
              arrows: false,
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
        },
        'standard': {
          speed: 1000,
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 753,
            settings: {
              arrows: false,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }]
        },
        'video': {
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          slide: '.collection-item',
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300,
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
            {
              breakpoint: 753,
              settings: {
                arrows: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }]
        },
        'image': {
          dots: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20%',
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300,
              centerPadding: '15%',
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
            {
              breakpoint: 753,
              settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '10%  ',
                slidesToShow: 1
              }
            }]
        },
        'promo': {
          speed: 1000,
          slidesToShow: 2,
          slidesToScroll: 2,
          responsive: [{
            breakpoint: 753,
            settings: {
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '30px',
              adaptiveHeight: false
            }

          }]
        },
        'faculty': {
          speed: 1000,
          dots: true,
          infinite: false,
          slidesToShow: 5,
          slidesToScroll: 2,
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300
            }
          },{
            breakpoint: 753,
            settings: {
              speed: 300,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: '100px',
              adaptiveHeight: false,
              infinite: true
            }
          }]
        },
        'standard-mobile':  {
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          slide: '.carousel-item',
          dots: true,
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          adaptiveHeight: false,
          responsive: [{
            breakpoint: 993,
            settings: {
              speed: 300
            }
          },{
            breakpoint: 753,
            settings: {
              speed: 300,
              dots: false
            }
          }]
        }
      },

      init: function() {
        Carousel.$el.each(Carousel.render);
      },

      render: function() {
        var $carousel = $(this),
            slickType = 'default',
            slickConfig = {};
        function buttonStyles() {
          var activeSlide = $carousel.find('.carousel-item.slick-active');
          if (($(activeSlide).find('.carousel-image').length <= 0) && (!$(activeSlide).hasClass('yellow')))
            $carousel.addClass('no-image');
          else
            $carousel.removeClass('no-image');
        }
        function highlightStyles (argument) {
          var slides = $carousel.find('.carousel-item'),
              noImageSlides = [];
          $.each(slides, function (index, slide) {
            if ($(slide).find('.carousel-image').length <= 0)
              noImageSlides.push(slide);
          })
          $.each(noImageSlides, function (index, slide) {
            switch (index % 4) {
              case 0 :
                $(slide).addClass('red');
                break;
              case 1 :
                $(slide).addClass('purple');
                break;
              case 2 :
                $(slide).addClass('blue');
                break;
              case 3 :
                $(slide).addClass('yellow');
                break;
            }
          })
        }

        if($carousel.is('.carousel-config-hero-inline')) {
          slickType = 'hero-inline';
        } else if($carousel.is('.carousel-config-hero')) {
          slickType = 'hero';
        } else if($carousel.is('.carousel-highlight')) {
          slickType = 'highlight';
          highlightStyles();
        } else if($carousel.is('.carousel-config-standard')) {
          if (APP.utils.getViewport().width <= APP.configs.views.small) {
            slickType = 'standard-mobile';
          } else{
            slickType = 'standard'
          }

        } else if($carousel.is('.carousel-config-promo')) {
          slickType = 'promo';
        }else if($carousel.is('.carousel-config-faculty')) {
          slickType = 'faculty';
        }else if($carousel.is('.carousel-config-video')) {
          slickType = 'video';
        }else if($carousel.is('.carousel-config-image')) {
          slickType = 'image';
        }else if($carousel.is('.carousel-upcoming-events')) {
          slickType = 'upcoming-events';

        }

        slickConfig = Carousel.merge(Carousel.config['default'], Carousel.config[slickType]);

        if ($carousel.attr('data-parallax-ratio')) {
          slickConfig.onAfterChange = function() {};
        }

        //render
        $carousel.slick(slickConfig);

        if($carousel.is('.carousel-upcoming-events')) {
          var $prevArrow = $carousel.find('.slick-prev').first().detach();
          var $nextArrow = $carousel.find('.slick-next').first();
          $carousel.prepend($prevArrow);

          var isShiftPressed = false;
          $(window).keydown(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            isShiftPressed = e.shiftKey;
          });
          $prevArrow.on('focus',function(){
            $prevArrow.addClass('active');
            $nextArrow.addClass('active');
          });
          $nextArrow.on('blur',function(){
            if(isShiftPressed){
              $carousel.find('.carousel-item.slick-active').last().find('a').focus();
            }
          });
          $carousel.find('.carousel-item').each(function(){
            var $carItem = $(this);
            $carItem.find('a').on('blur',function(ev){
              var isLastItem = $carousel.find('.carousel-item.slick-active').index($carItem) === 1;
              var isFirstItem = $carousel.find('.carousel-item.slick-active').index($carItem) === 0;

              if (isShiftPressed && isLastItem) {
                $carousel.find('.slick-active').first().find('a').focus();
              } else if(isShiftPressed && isFirstItem){
                ev.preventDefault();
                $prevArrow.focus();
              } else {
                if(isLastItem){
                  ev.preventDefault();
                  $nextArrow.focus();
                }
              }
            });
            $carItem.find('a').on('focus',function(e){
              if(!$carItem.hasClass('slick-active')){
                e.preventDefault();
                if($carItem.is($carousel.find('.carousel-item.slick-active').first().prev())){
                  $prevArrow.focus();
                } else if($carItem.is($carousel.find('.carousel-item.slick-active').last().next())){
                  $nextArrow.focus();
                } else{
                  $carousel.find('.slick-active').first().find('a').focus();
                }
              }
            })
          })
        }


        //Height of highlight carousel fix
        if (APP.utils.getViewport().width <= APP.configs.views['small'] && $carousel.hasClass('carousel-highlight')) {
          var $carouselItems = $carousel.find('.carousel-item');
          if($carousel.find('img').length === 0){
            Carousel.setHeight($carouselItems);
          } else{
            Carousel.getImageSize($carousel.find('img')[0], function(){
              Carousel.setHeight($carouselItems);
            });
          }
        }


        var carouselItems = $carousel.find('.carousel-item');
        var maxHeight = 200;
        carouselItems.each(function(){
          if($(this).height() > maxHeight){
            maxHeight = $(this).height();
          }
        });
        maxHeight = maxHeight - 30;
        carouselItems.each(function(){
          var $this = $(this);
          if($this.hasClass('dynamic') && $this.hasClass('no-img')){
            $this.css({'height': maxHeight+'px'});
          }
        });


        if(slickType === 'faculty' && (APP.utils.getViewport().width <= APP.configs.views.medium)) {
          var items = $carousel.find('.item-wrapper');
          $carousel.find('.slick-track').html('');

          $.each(items, function(){
            var $self = $(this);
            $self.addClass('carousel-item').addClass('slick-slide');
            $carousel.slickAdd($self);
          });

        }
        if(slickType === 'video'){
          $carousel.find()
        }
        if(APP.configs.isMobile.nullcheck()){
          $('.carousel-hero').find('.slick-prev').addClass('active');
          $('.carousel-hero').find('.slick-next').addClass('active');

        }

        $carousel.on('click', '> button', function () {
          buttonStyles();
        });
        $carousel.on('touchend', function () {
          setTimeout(function () {
            buttonStyles();
          },100);

        })
        buttonStyles();
      },

      merge: function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
          obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
          obj3[attrname] = obj2[attrname];
        }
        return obj3;
      },
      getImageSize: function(img, callback) {
        var $img = $(img);
        var wait = setInterval(function() {

          var w = $img[0].naturalWidth,
              h = $img[0].naturalHeight;
          if (w && h) {
            clearInterval(wait);
            callback.apply(this, [w, h]);
          }
        }, 30);
      },
      setHeight: function($carouselItems){
        var height = 250;
        var tempHeight = 0;
        var thisHeight = 0;
        $carouselItems.each(function () {
          var $thisItem = $(this);
          if($thisItem.find('img').length > 0){
            tempHeight = 100;
            if( $thisItem.find('img').first().outerHeight() > tempHeight){
              tempHeight = $thisItem.find('img').first().outerHeight(true);
            }
            thisHeight = $thisItem.find('.title').first().outerHeight(true) + $thisItem.find('.description').first().outerHeight(true) + $thisItem.find('.cta-container').first().outerHeight(true) + tempHeight;

          } else{
            thisHeight = $thisItem.find('.carousel-body').first().outerHeight(true);
          }

          if(thisHeight > height){
            height = thisHeight;
          }

          $thisItem.find('.cta-container').css({'position':'absolute'});
          if($thisItem.find('img').length > 0){
            $thisItem.find('.carousel-body').css({'height':'calc(100% - '+tempHeight+'px)'});
          } else{
            $thisItem.find('.carousel-body').css({'height':'calc(100% - 1px)'});
          }

        });
        $carouselItems.css({'height': height + 'px'});
      },

      mobileTabs: function() {
        var $tabCarousel = $('.mda-tabs > .collection-group').not('.video-collection');

        if ($tabCarousel.length) {
          if ($('html').width() < 752) {

            $tabCarousel.each(function() {
              if (!$(this).is('.tabs-carousel')) {
                $(this).addClass('tabs-carousel').addClass('carousel');
                Carousel.render.apply($(this));

                var $navtabs = $(this).parents().find('.nav-inner ul');
                $navtabs.addClass('navtabs-carousel').addClass('carousel');
                Carousel.render.apply($navtabs);
              }
            });

          } else {
            $tabCarousel.each(function() {
              if ($(this).is('.tabs-carousel')) {
                $(this).removeClass('tabs-carousel').removeClass('carousel')
                $(this).unslick();
              }
            });
          }
        }
      }
    };
  })(CarouselComponent || {}).init(); //Self Firing
})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var TabsComponent = (function(Tabs) {
    return Tabs = {
      $el: $('.mda-tabs'),

      init: function(){
        Tabs.$el.each(Tabs.render);
        Tabs.$el.each(Tabs.mobileInitialize);
      },

      render: function(){
        var $tabsContainer = $(this);

        $tabsContainer.tabs({
          heightStyle: 'content',
          hide: { effect: 'fade', duration: 100},
          show: { effect: 'fade', duration: 100},
          beforeActivate: function(event, ui){

            //  Check to see if it is mobile view
            if (APP.utils.getViewport().width <= APP.configs.views.small) {
              var $newPanel = $(ui.newPanel);

              $newPanel.css('visibility', 'hidden');
            }
          },
          activate: function(event, ui){
            //  Check to see if it is mobile view
            if (APP.utils.getViewport().width <= APP.configs.views.small){
              var $newPanel = $(ui.newPanel);


              $newPanel.slick({
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                slide: '.collection-item',
                dots: false,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                adaptiveHeight: false
              });
              var height = 100;
              $newPanel.find('.collection-item').each(function(){
                var $this = $(this);
                var width = ($(window).width() - 80 )+ 'px';
                var tempHeight = 0;
                if($this.find('img').length > 0){
                  tempHeight =  $this.outerHeight();
                } else{
                  tempHeight = $this.outerHeight();

                }
                if(tempHeight > height){
                  height = tempHeight;
                }
                $this.css({'min-width' : width});
              });
              $newPanel.find('.collection-item').css({'height' : height});



              $newPanel.css('visibility', 'visible');
            }
          },
          create: function(event, ui){
            if (APP.utils.getViewport().width <= APP.configs.views.small) {
              var $newPanel = $(ui.panel);

              $newPanel.slick({
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                slide: '.collection-item',
                dots: false,
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                adaptiveHeight: false
              });
              var height = 100;
              $newPanel.find('.collection-item').each(function(){
                var $this = $(this);
                var width = ($(window).width() - 80 )+ 'px';
                var tempHeight = 0;
                if($this.find('img').length > 0){
                  tempHeight =  $this.outerHeight();
                } else{
                  tempHeight = $this.outerHeight();

                }
                if(tempHeight > height){
                  height = tempHeight;
                }
                $this.css({'min-width' : width});
              });
              $newPanel.find('.collection-item').css({'height' : height});

              $newPanel.css('visibility', 'visible');
            }
          }
        });
      },

      mobileInitialize: function(){
        var $tabsContainer    = $(this),
            $mobileAnchor     = $tabsContainer.find('.tab-menu-mobile a'),
            $mobileMenu       = $tabsContainer.find('.tab-menu'),
            $mobileMenuItems  = $mobileMenu.find('li');

        if($mobileMenuItems[0]){
          $($mobileMenuItems[0]).addClass('active');
        }

        $mobileAnchor.on('click', function(e){
          e.preventDefault();

          $mobileMenu.toggleClass('active');
        });

        $mobileMenuItems.on('click', function(e){
          e.preventDefault();

          var $self = $(this);

          $mobileMenu.toggleClass('active');
          $mobileAnchor.text($self.text());

          //  Update the dropdown list after the list has closed.
          setTimeout(function(){
            $mobileMenu.find('li.active').removeClass('active');
            $self.addClass('active');
          }, 300);
        });
      }
    };
  })(TabsComponent || {}).init();
})(jQuery);
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var Modal = (function(Modal) {
    return Modal = {
      $el: $('#l-modal'),
      config: {},
      videoPlayer: '',
      videoTitle: '',
      varTimeout: '',
      varTimeoutMove: '',

      init: function() {

        Modal.ui = {
          overlay : $('<div id="lean_overlay"></div>'),
          body : Modal.$el.find('.l-modal-body'),
          closeBtn: Modal.$el.find('.modal-close')
        };

        // add click event to trigger the modal
        $('[rel*=leanModal]').on('click', function(ev){

          ev.preventDefault();

          // if video modal
          if( $(this).data('type')==='video') {

          }
          // if social share modal
          else if( $(this).data('type')==='share' ) {
            Modal.appendSocialContent( $(this) );
          }
          // if standard modal
          else {
            Modal.appendModalContent( $(this).attr('href') );
          }

          if ($(this).data('type')==='share') {
            Modal.open(true);
          } else {
            Modal.open();
          }


        });
      },



      appendModalContent: function(modalContentID) {
        Modal.ui.body.html( $(modalContentID)[0].outerHTML );
        Modal.$el.find(modalContentID).show();
      },



      appendSocialContent: function() {
        Modal.appendModalContent( '.share-see-more' );
      },


      open: function(share){
        $('body').append(Modal.ui.overlay);

        Modal.ui.overlay.fadeTo(200, .5);

        var modal_width = Modal.ui.body.find('>:first-child').outerWidth();
        var modal_height = Modal.ui.body.find('>:first-child').outerHeight();

        if(share) {
          modal_width = $(Modal.$el).width();
          modal_height = $(Modal.$el).height();

          $('.social-share').removeClass('visible');
        }


        Modal.$el.css({
          'left' : 50 + '%',
          'margin-left' : -(modal_width/2) + 'px',
          'top' : 50 + '%',
          'margin-top' : -(modal_height/2) + 'px'
        });

        if(share && (APP.utils.getViewport().width <= APP.configs.views.small)){
          Modal.$el.css({
            'width': '100%',
            'height': '98%',
            'left': '0',
            'margin-left': '0px',
            'top': '0',
            'margin-top': '0'
          });
        }

        Modal.$el.fadeIn(200);

        // close from overlay
        Modal.ui.overlay.click(function(ev) {
          ev.preventDefault();
          Modal.close();
        });

        // close from button
        Modal.ui.closeBtn.click(function(ev) {
          ev.preventDefault();
          Modal.close();
        });
      },


      close: function(){
        Modal.$el.trigger('close');
        Modal.ui.overlay.fadeOut(200, function(){
          Modal.ui.overlay.remove();
        });

        Modal.$el.fadeOut(200, function(){
          Modal.ui.body.empty();
        });
      },


      appendShareContent: function() {
        Modal.ui.body.html( $('.social-share')[0].outerHTML );
        Modal.$el.find('.social-share').show();

        $('.share-see-more-button').on('click', function(){
          Modal.$el.find('.share-see-more').show(400);
          Modal.$el.find('.first-page').hide(400);
        });
      }

    };
  })(Modal || {}).init(); //Self Firing
})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {


  $.fn.searchForm = function( url , searchfilter, options ) {
    var config = {
      page: 1,
      defaultPageSize: 25
    };

    /*
     * Setting for local configuration used in development of the prototype
     *
     */
    if(APP.configs.isLocal){
      var generalPredictiveSearchUrl = '/suggest?max=4&site=my_collection&access=access&format=rich&client=my_collection&q=';
      config.predictiveSearchUrl ='http://explore.mdanderson.org' +  generalPredictiveSearchUrl;
      if(url){
        config.predictiveSearchUrl ='http://explore.mdanderson.org' +  url;

      }
      var searchResultsPageUrl = '/search-results.html?q=';

    }else{
      if(url){
        config.predictiveSearchUrl = url;
      }else{
        config.predictiveSearchUrl = '/suggest?max=4&site=my_collection&access=access&format=rich&client=my_collection&q=';
      }

      if($(this).data('searchresultspageurl')){
        var searchResultsPageUrl = $(this).data('searchresultspageurl');
      } else{
        var searchResultsPageUrl = '/search-results.html?q=';
      }
    }

    var settings = $.extend({}, options );


    /*
     * Establishing variables specific to this instance of a search field
     *
     */

    var searchWrapper = $(this),
        searchForm = searchWrapper.find('form.search-form'),
        searchInput = searchWrapper.find('.search-field'),
        searchResults = searchWrapper.find('.search-results'),
        searchClear = searchWrapper.parent().find('.search-clear'),
        searchIcon = searchWrapper.find('.mda-icon-search'),
        searchText = searchForm.find('.search-field').attr('placeholder');

    searchWrapper.on('clear', clearSearch);

    /*
     * On the submit of a form, redirect to the authored search results page
     *
     */
    searchForm.submit(function (event) {

      event.preventDefault(); // stop the actual submit
      var searchTerm = searchForm.find('.search-field').val();

      //Ensure that there is a value in the box, otherwise show an error message
      if(searchTerm.length > 0 && (/[\S]+/g.test(searchTerm)) && searchTerm !== searchForm.find('.search-field').attr('placeholder')){
        if(searchfilter){
          searchTerm = searchTerm.trim() + '&searchType='+searchfilter;
        }
        window.location.href = searchResultsPageUrl+searchTerm.trim();
      } else{
        var errorCopy = 'Please enter a search term';
        if(searchWrapper.data('errorcopy')){
          errorCopy = searchWrapper.data('errorcopy');
        }
        searchForm.find('.search-field').attr('placeholder', errorCopy);
        $('input').placeholder({ customClass: 'ie9-placeholder' });
        searchForm.find('.search-field').val('');
      }

    });

    //On click of any search icon, do the submit
    searchIcon.on('click',function(){
      searchForm.submit();
    });

    //On click of the clear text, clear the box
    searchClear.on('click',clearSearch);

    //Do a clear on the nav clear button click
    $('#nav-search-wrapper').find('.search-clear a').on('click',clearSearch);

    //For mobile, when we focus we should lock scrolling to prevent swiping issues
    searchInput.focus(function(){
      searchWrapper.addClass('focus');
      if(searchWrapper.closest('#utilities-nav').length){
        searchWrapper.closest('#utilities-nav').find('.utilities-list').addClass('hide');
        searchWrapper.closest('#utilities-nav').find('#give-now-btn').addClass('hide');
        $('#nav-search-toggle').addClass('show');
      }
      $('.topnav-scroll-container').addClass('lock');
    });


    //When we blur away for mobile, we should allow scrolling again
    searchInput.blur(function(){

      if(!searchWrapper.closest('#utilities-nav').length){
        searchWrapper.removeClass('focus');
      }
      if($(this).val().length > 0 ){
        searchWrapper.addClass('hasVal');
      }
      else {
        searchWrapper.removeClass('hasVal');
      }

      $('.topnav-scroll-container').removeClass('lock');
    });



    /*
     * When a user is typing, after the 3rd character, get predictive search words
     *
     */
    searchInput.keyup(function(e){
      var length = $(this).val().length;
      if(length > 0) {
        searchWrapper.addClass('hasVal');
      }
      else {
        searchWrapper.removeClass('hasVal');
      }

      //If we are typing number characters, get suggested queries from GSA
      if(e.keyCode < 38 || e.keyCode > 40){
        if(length>=3){
          getSuggestedQueries($(this).val());
        } else {
          clearSuggestions();
        }
      }


    });


    /*
     * Get suggested queried based off of a specific query sting
     *
     */
    function getSuggestedQueries( query){
      $.ajax({
        url: config.predictiveSearchUrl + query,
        contentType: "json",
        dataType: "json",
        success: function (result) {
          var tempResult;
          var resultTitle;

          for(var i = 0; i < 4; i++){
            resultTitle = result.results[i];

            if(resultTitle !== undefined){
              resultTitle = resultTitle.name;
              var longTitle = resultTitle;
              // If the string length is greater than 60 characters, concat it at without cutting off a word.
              if(resultTitle.length > 60){
                resultTitle = resultTitle.substring(0,50);
                resultTitle = resultTitle.substring(0, resultTitle.lastIndexOf(' ')) + '...';
              }

              // If the search results are already populated, simply change out the text value for a better user experience, otherwise add in the div
              if(searchWrapper.find('.search-result-'+i).length > 0){
                searchWrapper.find('.search-result-'+i).html('<div role="option" id="' + resultTitle + '"><div data-actualval="'+longTitle+'" class="suggestion-name">' + resultTitle + '</div></div>');
              }else{
                tempResult = $('<li class="search-result search-result-'+i+'" dir="ltr" id="search-result-'+i+'"><div role="option" id="' + resultTitle + '"><div data-actualval="'+longTitle+'" class="suggestion-name">' + resultTitle + '</div></div></li>');
                addPredictiveResult(tempResult);
              }

            } else {
              if(searchWrapper.find('.search-result-'+i).length > 0){
                searchWrapper.find('.search-result-'+i).remove();
              }
            }
            resultTitle = undefined;

            addResultClickHandler();
          }
        }
      });
    }

    function addResultClickHandler(){
      if(APP.configs.isMobile.nullcheck()){
        searchWrapper.find('.suggestion-name').on('click', function(){

          var $this = $(this);
          searchInput.val($this.data('actualval'));
          searchForm.submit();
        });
      } else{
        searchWrapper.find('.suggestion-name').on('mousedown', function(){

          var $this = $(this);
          searchInput.val($this.data('actualval'));
          searchForm.submit();
        });
      }

    }


    /*
     * To add a predictive result to the div with animation
     *
     */
    function addPredictiveResult(result){
      result.appendTo(searchResults);
      setTimeout(function(){
        result.addClass('reveal');
      }, 80);
    }



    /*
     * To remove a specific result with animation
     *
     */
    function removeResult(result){
      result.removeClass('reveal');

      var onEndTransFn = function( ev ) {
        this.removeEventListener( APP.utils.transEndEventName(), onEndTransFn );
        setTimeout(function(){
          result.remove();
        }, 80);
      };

      if( Modernizr.csstransitions ) {
        result[0].addEventListener( APP.utils.transEndEventName(), onEndTransFn );
      }
      else {
        onEndTransFn.call();
      }
    }


    /*
     * Clear the entire search form and remove the suggestions
     *
     */
    function clearSearch(){
      searchInput.val('');
      searchForm.find('.search-field').attr('placeholder',searchText);
      if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
      if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
      if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
      if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
      if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));
    }


    /*
     * Remove only the suggestions
     *
     */
    function clearSuggestions(searchTerm){
      if( searchResults.find('#search-result-4').length ) removeResult(searchResults.find('.search-result-4'));
      if( searchResults.find('#search-result-3').length ) removeResult(searchResults.find('.search-result-3'));
      if( searchResults.find('#search-result-2').length ) removeResult(searchResults.find('.search-result-2'));
      if( searchResults.find('#search-result-1').length ) removeResult(searchResults.find('.search-result-1'));
      if( searchResults.find('#search-result-0').length ) removeResult(searchResults.find('.search-result-0'));

    }


    /*
     * This is the logic for the up and down arrow key events required for accesibility.
     *
     */

    searchInput.on('focus', function() {

    }).on('keydown', function(e) {
      var $selected = searchWrapper.find('li.search-result.active');
      if (e.keyCode == 40) {
        if($selected == undefined || $selected.length == 0){
          searchWrapper.find('li.search-result').first().addClass('active');
          searchInput.val(searchWrapper.find('li.search-result').first().find('.suggestion-name').data('actualval'));
        } else{
          $selected.removeClass('active');
          $selected.next().addClass('active');
          searchInput.val($selected.next().find('.suggestion-name').data('actualval'));
        }
        return false;
      } else if (e.keyCode == 38) {
        if($selected == undefined || $selected.length == 0){
          searchInput.val(searchWrapper.find('li.search-result').first().find('.suggestion-name').data('actualval'));
        } else{
          $selected.removeClass('active');
          $selected.prev().addClass('active');
          searchInput.val($selected.prev().find('.suggestion-name').data('actualval'));
        }
        return false;
      }
    });



    return this;
  };




}( jQuery ));
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  var DropdownComponent = (function(Dropdown) {
    return Dropdown = {
      $el: $('.mda-custom-dd').not('.clinical-trial-filter'),

      init: function(){
        Dropdown.$el.each(Dropdown.render);
      },

      render: function(){
        var $dropdown = $(this),
            $ddLink   = $dropdown.find('.mda-custom-dd-link'),
            $ddList   = $dropdown.find('.mda-custom-dd-list');

        $ddLink.on('click', function(e){
          e.preventDefault();

          $dropdown.toggleClass('extended');
        });

        $ddList.on('click', 'a', function(e){
          e.preventDefault();

          var $clicked = $(this);
          $dropdown.removeClass('extended');
          if($ddLink.closest('.clinical-trials-search-filter').length === 0){
            $ddLink.find('span').text($clicked.text());

          }

          //  Delay the following actions to allow time for the dropdown to close
          setTimeout(function(){
            $ddList.find('li.selected').removeClass('selected');
            $clicked.parent('li').addClass('selected');
          }, 500);
        });
      }
    };
  })(DropdownComponent || {}).init();
})(jQuery);

/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */

(function ( $ ) {

  $.fn.scrollTransition = function( options ) {


    var section = $(this);
    var transitionType = section.data('transition') ? section.data('transition') : 'fadeIn';
    var transitionDelay = section.data('transition-delay') ? parseInt(section.data('transition-delay')) : 0;

    var runTransition = {

      fadeIn : function(){
        if( !APP.configs.isMobile.any() ){
          var scene = new ScrollScene({
            offset: -300
          })
          .triggerHook('onCenter')
          .triggerElement(section[0])
          .addTo(APP.scrollController);

          scene.on('enter', function(){
            setTimeout(function(){
              section.addClass('reveal');
            }, transitionDelay);
          });
        }

        // mobile backup
        else {
          section.addClass('reveal');
        }
      },



      // transition for the badge counter
      badgeCounter : function(){

        var counter = section.find('.badge-countup');
        var maxCount = parseInt(counter.data('max-count'));
        var count = parseInt(counter.text());
        count = 0;

        function timer(){
          count++;
          if (count > maxCount)
          {
            clearInterval(counter);
            return;
          }
          counter.text(count);
        }

        if( !APP.configs.isMobile.any() ){
          var scene = new ScrollScene({
            offset: -200
          })
          .triggerHook('onCenter')
          .triggerElement(section[0])
          .addTo(APP.scrollController);

          scene.on('enter', function(){
            setTimeout(function(){
              var counter=setInterval(timer, 100);
            }, transitionDelay);
          });


        }

        //mobile backup
        else {
          counter.text(maxCount);
        }
      }
    };

    //run the transition defined for the section or element
    runTransition[ transitionType ]();



    return this;
  };





}( jQuery ));



/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */


var videoManager = (function (window, undefined) {
    var $el = $('.media-player').not('.media-single-small');

    var _slickIt = function (selector) {
        $(selector).slick();
    }
    var _addClickHandlers = function (elem) {
        elem.find('.media-option').each(function(){
            if($(this).find('.video-play-button').length > 0){
                $(this).on('click',function(e){
                    e.preventDefault();
                });

                $(this).each(function(){
                    $(this).mdaJWPlayer( true );
                });
            }
        });
    }
    var _resetHeights = function (elem) {
        elem.find('.media-matrix').removeAttr('style');
        elem.find('.media-options').removeAttr('style');
    }
    var _resetControls = function (elem, slick) {
        elem.find('#mg-left').click(function (event) {
            event.preventDefault();
            $(slick).slickPrev();
        });

        elem.find('#mg-right').click(function (event) {
            event.preventDefault();
            $(slick).slickNext();
        });
    }
    var _clearVideoItems = function (elem) {
        elem.find('.media-options').unslick();
        elem.find('.media-matrix').unslick();
        elem.find('.media-option').remove();
        elem.find('.media-item').remove();
    }
    var _toggleClickHandler = function () {
        $el.on('click', '#mg-toggle-mg-type', function (event) {
            event.preventDefault();
            var slidesToShow = 3,
                slidesToScroll = 0;
            var self = $(this);
            var parent = self.parents('.media-player'),
                mediaMatrix = parent.find('.media-matrix'),
                mediaOptions = parent.find('.media-options');
                mediaList = parent.find('.media-option').not('.slick-cloned').clone();

            if (!mediaMatrix.hasClass('show')) {
                $('#mg-toggle-mg-type').addClass('grid');
                mediaMatrix.addClass('show');
                setTimeout(function () {
                    var count = 0;
                    var container;
                    mediaMatrix.addClass('show');
                    _clearVideoItems(parent);
                    for (var i = 0; i < mediaList.length; i++) {
                        var mediaOption = mediaList[i];
                        count++;
                        if (count === 1) {
                            container = $('<div />', {
                                'class': 'media-item'
                            });
                            container.append(mediaOption);
                        } else if (count === 2) {
                            count = 0;
                            container.append(mediaOption);
                            mediaMatrix.append(container);
                        }

                        if(count === 1 && i === mediaList.length -1){
                            container.append(mediaOption);
                            mediaMatrix.append(container);
                        }

                    }

                    mediaMatrix.slick({
                        slidesToShow: slidesToShow,
                        slidesToScroll: slidesToScroll,
                        responsive: [{
                        breakpoint: 753,
                            settings: {
                              cssEase: 'linear',
                              centerMode: false,
                              arrows: false,
                              dots: true,
                              slidesToShow: 1,
                              slidesToScroll: 1
                            }
                          }]
                    });
                    _resetControls(parent, mediaMatrix);
                    mediaMatrix.addClass('matrixify');
                    mediaOptions.css({'display': 'none'});//removes arrows in grid view
                    _addClickHandlers(parent);
                }, 550);
            } else {
                $('#mg-toggle-mg-type').removeClass('grid')
                mediaMatrix.removeClass('show');
                _clearVideoItems(parent)
                mediaOptions.append(mediaList);
                _resetHeights(parent);
                _slickIt(mediaOptions);
                _addClickHandlers(parent);
                _resetControls(parent, mediaOptions);
            }

        })
    }
    var _initialize = function () {
        var playerMediaOptions = $el.find('.media-options');
        if ($(playerMediaOptions).length > 0) {
            _slickIt(playerMediaOptions);
            _resetControls($el, playerMediaOptions);
        }
        _toggleClickHandler();
    }
    var init = function (argument) {
        if ($el.length > 0) {
            _initialize();
        }
    }
    return {
        init : init
    }
}(window, undefined)).init();
/*
 * Copyright (C) 2015 Sapient Corporation
 * Licensed under the MIT license.
 */
;(function () {
  'use strict';



  Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }

    var operator = options.hash.operator || '==';

    var operators = {
      '==':       function(l,r) { return l == r; },
      '===':      function(l,r) { return l === r; },
      '!=':       function(l,r) { return l != r; },
      '!==':       function(l,r) { return l !== r; },
      '<':        function(l,r) { return l < r; },
      '>':        function(l,r) { return l > r; },
      '<=':       function(l,r) { return l <= r; },
      '>=':       function(l,r) { return l >= r; },
      'typeof':   function(l,r) { return typeof l == r; },
      'contains': function(l,r) { return l.indexOf(r) != -1;},
      'hasVariable' : function(l,r) {
        if(l !== undefined && r  !== undefined) {
          for (var i = 0; i < l.length; i++) {
            if (l[i]['@N'] === r) {
              return true;
            }
          }
        }
        return false;
      },
      'hasValue' : function(l,r) {
        if(l && r){
          for(var i = 0; i < l.length; i++){
            if(l[i]['@V'] === r){
              return true;
            }
          }
        }

        return false;
      },
      '!hasVariable': function(l,r) {
        if(l !== undefined && r  !== undefined){
          for(var i = 0; i < l.length; i++){
            if(l[i]['@N'] === r){
              return false;
            }
          }
        }

        return true;
      },

      'htmlDecode' : function(l,r) {
        return $('<div/>').html(l).text();
      },
      'notEmpty': function(l,r) {
        if(l != undefined){
          return((l.length != 0 && l != ''));

        }

        return false;
      },
      'empty': function(l,r) {
        if(l != undefined){
          return(l.length == 0 || l == '');
        }

        return true;
      }
    };

    if (!operators[operator]) {
      throw new Error('Handlerbars Helper "compare" does not know the operator '+operator);
    }

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  });

  Handlebars.registerHelper('replaceCommas', function(options) {
    return options.fn(this).replace(/,/g,', ');

  });

  Handlebars.registerHelper('raw', function(options) {
    return options.fn(this).replace(/\[\[/g, '{{').replace(/\]\]/g, '}}');
  });

  Handlebars.registerHelper('htmlDecode', function(options) {
    return $('<div/>').html(options.fn(this)).text();

  });

  Handlebars.registerHelper('removeBr', function(options) {
    return options.fn(this).replace(new RegExp('<br>', 'g'), '');

  });

  Handlebars.registerHelper('encodeSpaces', function(options) {
    return options.fn(this).replace(new RegExp(' ', 'g'), '%20');

  });

}());

this["APP"] = this["APP"] || {};
this["APP"]["Templates"] = this["APP"]["Templates"] || {};

this["APP"]["Templates"]["did_you_mean_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>Did you mean "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "?</p>";
},"useData":true});

this["APP"]["Templates"]["generated_linked_list"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                <a class=\"mdicon-linklist\" href=\""
    + alias2(alias1((depths[2] != null ? depths[2].U : depths[2]), depth0))
    + "\" >"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\n                </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </li>\n";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["glossary_search_letter_section"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<section class=\"scroll-trans fade-in\" data-transition=\"fadeIn\">\n    <div id=\""
    + alias3(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"letter","hash":{},"data":data}) : helper)))
    + "\" class=\"letter-section link-list\">\n        <h2 class=\"letter\">"
    + alias3(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"letter","hash":{},"data":data}) : helper)))
    + "</h2>\n        <div class=\"table\">\n            <div class=\"col-double cell-f link-list-body\">\n                <ul class=\"item-container-first\"></ul>\n            </div>\n            <div class=\"col-double last cell-m last link-list-body\">\n                <ul class=\"item-container-last\"></ul>\n            </div>\n        </div>\n    </div>\n</section>";
},"useData":true});

this["APP"]["Templates"]["glossary_search_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                    <p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"og:title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"7":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                                <p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + " ";
},"10":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),(depths[1] != null ? depths[1].displaytag : depths[1]),{"name":"compare","hash":{"operator":"==="},"fn":this.program(11, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                        <p class=\"search-result-details\">";
  stack1 = ((helper = (helper = helpers.replaceCommas || (depth0 != null ? depth0.replaceCommas : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"replaceCommas","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.replaceCommas) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<li class=\"glossary-search-result\">\n    <a class=\"mdicon-linklist\" href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"glossary-search-title\">\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"glossary-search-description\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n   </a>\n</li>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["no_results_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>No results found for "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"useData":true});

this["APP"]["Templates"]["related_posts_blogs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return " href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\"";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"imageThumb",{"name":"compare","hash":{"operator":"==="},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <img src=\""
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + ".resize.110.110.high.jpg\" class=\"mda-hide-sm\">\n";
},"6":function(depth0,helpers,partials,data) {
    return "                <img src="
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + " class=\"mda-hide-sm\">\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return "<p class=\"publish-date mda-hide-sm\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</div>";
},"10":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"gsaentity_Categories",{"name":"compare","hash":{"operator":"==="},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"12":function(depth0,helpers,partials,data) {
    return "                    <p class=\"link-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</p>\n";
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <h4 class=\"link-title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</h4>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"link\">\n    <a class = \"mdicon-linklist\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.U : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.MT : depth0),"Publication",{"name":"compare","hash":{"operator":"hasValue"},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</li>";
},"useData":true});

this["APP"]["Templates"]["related_posts_news"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return " href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\"";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"imageThumb",{"name":"compare","hash":{"operator":"==="},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "                <img src=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.110.110.high.jpg\" class=\"mda-hide-sm\">\n";
},"6":function(depth0,helpers,partials,data) {
    return "                <img src="
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + " class=\"mda-hide-sm\">\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return "<p class=\"publish-date mda-hide-sm\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</div>";
},"10":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"gsaentity_Categories",{"name":"compare","hash":{"operator":"==="},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"12":function(depth0,helpers,partials,data) {
    return "                    <p class=\"link-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</p>\n";
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <h4 class=\"link-title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</h4>\n";
},"17":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"description",{"name":"compare","hash":{"operator":"==="},"fn":this.program(18, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"18":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <p class=\"link-body mda-hide-sm\">\n                    "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                </p>\n";
},"20":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <p class=\"link-body mda-hide-sm\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(21, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"21":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.S || (depth0 != null ? depth0.S : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"S","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "<li class=\"link\">\n    <a class = \"mdicon-linklist\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.U : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"Publication",{"name":"compare","hash":{"operator":"hasValue"},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"description",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(20, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</li>";
},"useData":true});

this["APP"]["Templates"]["related_posts_publication"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return " href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\"";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"publication",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "                <p class=\"link-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</p>\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <h4 class=\"link-title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</h4>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"link\">\n    <a class = \"mdicon-linklist\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.U : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</li>";
},"useData":true});

this["APP"]["Templates"]["related_searches_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "\n    <a href=\"/en/search-results.html?q="
    + alias2(alias1((depth0 != null ? depth0['@q'] : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0['#text'] : depth0), depth0))
    + "</a> ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mda-related-searches\">\n    <h3 class=\"mda-related-search-header\">${properties.relatedSearchLabel}</h3> "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.Synonyms : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});

this["APP"]["Templates"]["resource_center_large"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "video";
},"3":function(depth0,helpers,partials,data) {
    return "small";
},"5":function(depth0,helpers,partials,data) {
    return "background red";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"8":function(depth0,helpers,partials,data) {
    return "             data-videoType=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"10":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videoId",{"name":"compare","hash":{"operator":"==="},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            ";
},"11":function(depth0,helpers,partials,data) {
    return "             data-videoId=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"13":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"poster",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(16, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"16":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                            <picture>\n                                <!--[if IE 9]>\n                                <video style=\"display: none;\"><![endif]-->\n                                <source srcset=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.344.194.high.jpg 1x , "
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.688.388.high.jpg 2x\"\n                                        alt=\"\" media=\"(min-width: 993px)\">\n                                <source srcset=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.431.387.high.jpg\" alt=\"\"\n                                        media=\"(min-width: 753px)\">\n                                <!--[if IE 9]></video><![endif]-->\n                                <img src=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.180.180.high.jpg\"\n                                     srcset=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.180.180.high.jpg 1x, "
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.360.360.high.jpg 2x\"\n                                     alt=\"\">\n                            </picture>\n";
},"18":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(19, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"19":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(20, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"20":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"poster",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(21, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"21":function(depth0,helpers,partials,data) {
    return "                            <div class=\"image-container\">\n                                <img src=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" alt=\"\">\n                            </div>\n";
},"23":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(24, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"24":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"publication",{"name":"compare","hash":{"operator":"==="},"fn":this.program(25, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"25":function(depth0,helpers,partials,data) {
    return "                            <span class=\"category\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n";
},"27":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"blogname",{"name":"compare","hash":{"operator":"==="},"fn":this.program(28, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"28":function(depth0,helpers,partials,data) {
    return "                        <span class=\"category\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n";
},"30":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                    <div class=\"blog-title\"><p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(31, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p></div>\n";
},"31":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"33":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(34, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"34":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                        <div class=\"blog-title\"><p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(35, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p></div>\n";
},"35":function(depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + " ";
},"37":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"author",{"name":"compare","hash":{"operator":"==="},"fn":this.program(38, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"38":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"author",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(39, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"39":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                            <span class=\"summary-author-info\">\n                        <p class=\"author-name\">By <span>"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span></p>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depths[2] != null ? depths[2].FS : depths[2])) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(40, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                        </span>\n";
},"40":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                                    <p class=\"author-date\">"
    + this.escapeExpression(this.lambda(((stack1 = (depths[2] != null ? depths[2].FS : depths[2])) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</p>\n";
},"42":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"description",{"name":"compare","hash":{"operator":"==="},"fn":this.program(43, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"43":function(depth0,helpers,partials,data) {
    var stack1;

  return "                        <p class=\"summary-text\">\n                            "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                        </p>\n";
},"45":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                    <p class=\"summary-text\">\n                        ";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(46, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n                    </p>\n";
},"46":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.S || (depth0 != null ? depth0.S : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"S","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<div class=\"cell-inner-f cell-full-height\">\n    <div class=\"module\">\n        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\" class=\"blog-summary "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"poster",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"poster",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(7, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(18, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            <div class=\"blog-summary-wrapper\">\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"publication",{"name":"compare","hash":{"operator":"hasValue"},"fn":this.program(23, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(27, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(30, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(33, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(37, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(42, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"description",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(45, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </a>\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["resource_center_small"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "video";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "     data-videoType=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videoId",{"name":"compare","hash":{"operator":"==="},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    ";
},"7":function(depth0,helpers,partials,data) {
    return "     data-videoId=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return "            <span class=\"date\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</span>\n";
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <span class=\"title\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <span class=\"title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3=this.lambda;

  return "<div class=\"collection-item  "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n    <a href=\""
    + alias2(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"icon "
    + alias2(alias3((depth0 != null ? depth0['icon-color'] : depth0), depth0))
    + "\"><i class=\"fa "
    + alias2(alias3((depth0 != null ? depth0.icon : depth0), depth0))
    + "\"></i></div>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</div>";
},"useData":true});

this["APP"]["Templates"]["search_filter_checkbox_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                <li>\n                    <input class=\"search-filter-check\" data-facetname=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@NM'] : depths[1]), depth0))
    + "\" type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@DN'] : depths[1]), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"/>\n                    <label for=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" onclick=\"javascript:void(0);\"></label><i class=\"fa fa-check\"></i><span class=\"option-text\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n                </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "<div class=\"mda-custom-dd style2 extended\">\n    <h2><a class=\"mda-custom-dd-link\"><span>"
    + this.escapeExpression(((helper = (helper = helpers['@DN'] || (depth0 != null ? depth0['@DN'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"@DN","hash":{},"data":data}) : helper)))
    + "</span><i class=\"fa fa-chevron-down dd-extended-icon\"></i><i class=\"fa fa-chevron-right dd-collapsed-icon\"></i></a></h2>\n    <div class=\"md-check\">\n        <ul class=\"mda-custom-dd-list\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.PV : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["search_filter_radio_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "                    <li>\n                        <input class=\"search-filter-radio\" data-facetname=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@NM'] : depths[1]), depth0))
    + "\" type=\"radio\" id=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@DN'] : depths[1]), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.checked : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        <label for=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" onclick=\"javascript:void(0);\"></label><span class=\"filter-radio-button\"><span class=\"inner\"></span></span><span class=\"option-text\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n                    </li>\n";
},"2":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"mda-custom-dd style2 extended\">\n    <h2><a class=\"mda-custom-dd-link\"><span>"
    + alias3(((helper = (helper = helpers['@DN'] || (depth0 != null ? depth0['@DN'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@DN","hash":{},"data":data}) : helper)))
    + "</span><i class=\"fa fa-minus dd-extended-icon\"></i><i class=\"fa fa-plus dd-collapsed-icon\"></i></a></h2>\n    <div class=\"md-radio style1\">\n        <form action=\"\">\n            <ul class=\"mda-custom-dd-list\">\n                <li>\n                    <input class=\"search-filter-radio\" data-facetname=\""
    + alias3(this.lambda((depths[1] != null ? depths[1]['@NM'] : depths[1]), depth0))
    + "\" type=\"radio\" id=\"allresults"
    + alias3(((helper = (helper = helpers['@NM'] || (depth0 != null ? depth0['@NM'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@NM","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + alias3(((helper = (helper = helpers['@DN'] || (depth0 != null ? depth0['@DN'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@DN","hash":{},"data":data}) : helper)))
    + "\" value=\"allresults\" checked>\n                    <label for=\"allresults"
    + alias3(((helper = (helper = helpers['@NM'] || (depth0 != null ? depth0['@NM'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@NM","hash":{},"data":data}) : helper)))
    + "\" onclick=\"javascript:void(0);\"></label><span class=\"filter-radio-button\"><span class=\"inner\"></span></span><span class=\"option-text\">All Results</span>\n                </li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.PV : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </form>\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["search_instead_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>Show results for "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " instead</p>";
},"useData":true});

this["APP"]["Templates"]["search_results_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "video";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "     data-videoType=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videoId",{"name":"compare","hash":{"operator":"==="},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    ";
},"7":function(depth0,helpers,partials,data) {
    return "     data-videoId=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"10":function(depth0,helpers,partials,data) {
    return "            <div class=\"search-result-img\"><img src=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"/></div>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"content-type",{"name":"compare","hash":{"operator":"==="},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(20, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"13":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"PDF",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"pdf",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"Power Point",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(16, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"docx",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(18, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"14":function(depth0,helpers,partials,data) {
    return "                        <i class=\"fa fa-file-pdf-o\"></i>\n";
},"16":function(depth0,helpers,partials,data) {
    return "                        <i class=\"fa fa-file-powerpoint-o\"></i>\n";
},"18":function(depth0,helpers,partials,data) {
    return "                        <i class=\"fa fa-file-word-o\"></i>\n";
},"20":function(depth0,helpers,partials,data) {
    return "                    <i class=\"fa fa-file-video-o\"></i>\n";
},"22":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(23, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(32, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"23":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(24, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"24":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(25, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"25":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depths[4] != null ? depths[4]['@MIME'] : depths[4]),"application/pdf",{"name":"compare","hash":{"operator":"==="},"fn":this.program(26, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depths[4] != null ? depths[4]['@MIME'] : depths[4]),"application/pdf",{"name":"compare","hash":{"operator":"!=="},"fn":this.program(29, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"26":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(27, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"27":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                    <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"29":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(30, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"30":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                    <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"32":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"==="},"fn":this.program(33, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"!=="},"fn":this.program(36, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"33":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "                        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : alias1),(options={"name":"htmlDecode","hash":{},"fn":this.program(34, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"34":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"36":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "                        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : alias1),(options={"name":"htmlDecode","hash":{},"fn":this.program(34, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"38":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(39, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"39":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(40, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"40":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"==="},"fn":this.program(41, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"!=="},"fn":this.program(44, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"41":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"og:title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(42, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"42":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"44":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"og:title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(45, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"45":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"47":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"publication",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"blogname",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"phase",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"48":function(depth0,helpers,partials,data) {
    return "                <div class=\"search-result-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</div>\n";
},"50":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"Phase",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"52":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"description",{"name":"compare","hash":{"operator":"==="},"fn":this.program(53, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"53":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"description",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(54, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"description",{"name":"compare","hash":{"operator":"empty"},"fn":this.program(56, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"54":function(depth0,helpers,partials,data) {
    var stack1;

  return "                    <p class=\"search-result-details\">\n                        "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                    </p>\n";
},"56":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, buffer = 
  "                    <p class=\"search-result-details\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(57, data, 0, blockParams, depths),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"57":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return " "
    + ((stack1 = this.lambda((depths[4] != null ? depths[4].S : depths[4]), depth0)) != null ? stack1 : "")
    + " ";
},"59":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <p class=\"search-result-details\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(60, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"60":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.S || (depth0 != null ? depth0.S : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"S","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"62":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"blog_date",{"name":"compare","hash":{"operator":"==="},"fn":this.program(63, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"pagetype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(66, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"63":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"blog_date",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(64, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"64":function(depth0,helpers,partials,data) {
    var stack1;

  return "                    <div class=\"search-result-date\">\n                        "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                    </div>\n";
},"66":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"clinical trial",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(67, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"news articles",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(67, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"publication",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(67, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"67":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                    <div class=\"search-result-date\">"
    + this.escapeExpression(this.lambda(((stack1 = (depths[3] != null ? depths[3].FS : depths[3])) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<div class=\"search-result "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " data-index=\""
    + this.escapeExpression(((helper = (helper = helpers['@N'] || (depth0 != null ? depth0['@N'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"@N","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(9, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"search-result-details\">\n        <div class=\"search-result-title\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(12, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(22, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(38, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(47, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(50, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(52, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"description",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(59, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(62, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["showing_results_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>Showing results for "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"useData":true});

this["APP"]["Templates"]["suggested_results_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "no-img";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"search-result-img\"><img src=\""
    + this.escapeExpression(((helper = (helper = helpers.imageThumb || (depth0 != null ? depth0.imageThumb : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"imageThumb","hash":{},"data":data}) : helper)))
    + "\"/></div>";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i> ";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"search-result-subtitle\">"
    + this.escapeExpression(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</div>";
},"9":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"search-result-date\">"
    + this.escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"date","hash":{},"data":data}) : helper)))
    + "</div>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<a href=\""
    + alias3(((helper = (helper = helpers.GL || (depth0 != null ? depth0.GL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"GL","hash":{},"data":data}) : helper)))
    + "\" class=\"search-result mdicon-linklist "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.imageThumb : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.imageThumb : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"search-result-details\">\n        <div class=\"search-result-title "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.imageThumb : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + alias3(((helper = (helper = helpers.GD || (depth0 != null ? depth0.GD : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"GD","hash":{},"data":data}) : helper)))
    + "</div>\n        "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.subtitle : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        <div class=\"search-result-desc\">"
    + alias3(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"desc","hash":{},"data":data}) : helper)))
    + "</div>\n        "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.date : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</a>";
},"useData":true});
/*
 * Adobe Systems Incorporated
 * Modified: October 30th, 2012
 *
 * Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs).
 * Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2
 *
 */

(function ($, w) {

    // Enable strict mode
    'use strict';

    w.herocarouselpicturefill = function (context) {
        var undefined;
        if (context === undefined) {
            context = $('body');
        }

        $('div[data-herocarouselpicture]', context).each(function () {
            var currentPicture = this;
            var matches = [];
            var retina = false;
            
            if (w.matchMedia) {
                var rt = w.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
                retina = (rt && rt.matches || (w.devicePixelRatio > 1)); 
            }

            $('div[data-media]', currentPicture).each(function () {
                var media = $(this).attr('data-media');
                var src = $(this).attr('data-src');
                var src2x = $(this).attr('data-src-2x');
                if(retina && typeof src2x !== typeof undefined && src2x !== false) {
                    src = src2x;
                }
                if (!media || ( w.matchMedia && w.matchMedia(media).matches )) {
                    matches.push(src);
                }
            });

            var $picImg = $('div.carousel-image', currentPicture).first();

            if (matches.length) {
                if ($picImg.size() === 0) {
                    var $currentPicture = $(currentPicture);
                }
                $picImg.attr('style', matches.pop());
            } else {
                $picImg.remove();
            }
        });
    };

    // Run on debounced resize and domready
    $(function () {
        w.herocarouselpicturefill();
    });

    $(w).on('debouncedresize', function () {
        w.herocarouselpicturefill();
    });

}(jQuery, this));
/*
 * Adobe Systems Incorporated
 * Modified: October 30th, 2012
 *
 * Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs).
 * Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2
 *
 */

(function ($, w) {

    // Enable strict mode
    'use strict';

    w.herocontentpicturefill = function (context) {
        var undefined;
        if (context === undefined) {
            context = $('body');
        }

        $('div[data-heropicture]', context).each(function () {
            var currentPicture = this;
            var matches = [];
            var retina = false;

            if (w.matchMedia) {
                var rt = w.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
                retina = (rt && rt.matches || (w.devicePixelRatio > 1)); 
            }

            $('div[data-media]', currentPicture).each(function () {
                var media = $(this).attr('data-media');
                var src = $(this).attr('data-src');
                var src2x = $(this).attr('data-src-2x');
                if(retina && typeof src2x !== typeof undefined && src2x !== false) {
                    src = src2x;
                }
                if (!media || ( w.matchMedia && w.matchMedia(media).matches )) {
                    matches.push(src);
                }
            });

            var $picImg = $('div.hero-image', currentPicture).first();

            if (matches.length) {
                if ($picImg.size() === 0) {
                    var $currentPicture = $(currentPicture);
                }
                $picImg.attr('style', matches.pop());
            } else {
                $picImg.remove();
            }
        });
    };

    // Run on debounced resize and domready
    $(function () {
        w.herocontentpicturefill();
    });

    $(w).on('debouncedresize', function () {
        w.herocontentpicturefill();
    });

}(jQuery, this));
/*! lightgallery - v1.2.12 - 2016-01-03
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!function(a,b,c,d){"use strict";function e(b,d){if(this.el=b,this.$el=a(b),this.s=a.extend({},f,d),this.s.dynamic&&"undefined"!==this.s.dynamicEl&&this.s.dynamicEl.constructor===Array&&!this.s.dynamicEl.length)throw"When using dynamic mode, you must also define dynamicEl as an Array.";return this.modules={},this.lGalleryOn=!1,this.lgBusy=!1,this.hideBartimeout=!1,this.isTouch="ontouchstart"in c.documentElement,this.s.slideEndAnimatoin&&(this.s.hideControlOnEnd=!1),this.s.dynamic?this.$items=this.s.dynamicEl:"this"===this.s.selector?this.$items=this.$el:""!==this.s.selector?this.s.selectWithin?this.$items=a(this.s.selectWithin).find(this.s.selector):this.$items=this.$el.find(a(this.s.selector)):this.$items=this.$el.children(),this.$slide="",this.$outer="",this.init(),this}var f={mode:"lg-slide",cssEasing:"ease",easing:"linear",speed:600,height:"100%",width:"100%",addClass:"",startClass:"lg-start-zoom",backdropDuration:150,hideBarsDelay:6e3,useLeft:!1,closable:!0,loop:!0,escKey:!0,keyPress:!0,controls:!0,slideEndAnimatoin:!0,hideControlOnEnd:!1,mousewheel:!0,appendSubHtmlTo:".lg-sub-html",preload:1,showAfterLoad:!0,selector:"",selectWithin:"",nextHtml:"",prevHtml:"",index:!1,iframeMaxWidth:"100%",download:!0,counter:!0,appendCounterTo:".lg-toolbar",swipeThreshold:50,enableSwipe:!0,enableDrag:!0,dynamic:!1,dynamicEl:[],galleryId:1};e.prototype.init=function(){var c=this;c.s.preload>c.$items.length&&(c.s.preload=c.$items.length);var d=b.location.hash;d.indexOf("lg="+this.s.galleryId)>0&&(c.index=parseInt(d.split("&slide=")[1],10),a("body").addClass("lg-from-hash"),a("body").hasClass("lg-on")||setTimeout(function(){c.build(c.index),a("body").addClass("lg-on")})),c.s.dynamic?(c.$el.trigger("onBeforeOpen.lg"),c.index=c.s.index||0,a("body").hasClass("lg-on")||setTimeout(function(){c.build(c.index),a("body").addClass("lg-on")})):c.$items.on("click.lgcustom",function(b){try{b.preventDefault(),b.preventDefault()}catch(d){b.returnValue=!1}c.$el.trigger("onBeforeOpen.lg"),c.index=c.s.index||c.$items.index(this),a("body").hasClass("lg-on")||(c.build(c.index),a("body").addClass("lg-on"))})},e.prototype.build=function(b){var c=this;c.structure(),a.each(a.fn.lightGallery.modules,function(b){c.modules[b]=new a.fn.lightGallery.modules[b](c.el)}),c.slide(b,!1,!1),c.s.keyPress&&c.keyPress(),c.$items.length>1&&(c.arrow(),setTimeout(function(){c.enableDrag(),c.enableSwipe()},50),c.s.mousewheel&&c.mousewheel()),c.counter(),c.closeGallery(),c.$el.trigger("onAfterOpen.lg"),c.$outer.on("mousemove.lg click.lg touchstart.lg",function(){c.$outer.removeClass("lg-hide-items"),clearTimeout(c.hideBartimeout),c.hideBartimeout=setTimeout(function(){c.$outer.addClass("lg-hide-items")},c.s.hideBarsDelay)})},e.prototype.structure=function(){var c,d="",e="",f=0,g="",h=this;for(a("body").append('<div class="lg-backdrop"></div>'),a(".lg-backdrop").css("transition-duration",this.s.backdropDuration+"ms"),f=0;f<this.$items.length;f++)d+='<div class="lg-item"></div>';if(this.s.controls&&this.$items.length>1&&(e='<div class="lg-actions"><a href="#" aria-label="previous" class="lg-prev lg-icon">'+this.s.prevHtml+'</a><a href="#" aria-label="next" class="lg-next lg-icon">'+this.s.nextHtml+"</a></div>"),".lg-sub-html"===this.s.appendSubHtmlTo&&(g='<div class="lg-sub-html"></div>'),c='<div class="lg-outer '+this.s.addClass+" "+this.s.startClass+'"><div class="lg" style="width:'+this.s.width+"; height:"+this.s.height+'"><div class="lg-inner">'+d+'</div><div class="lg-toolbar group"><a href="#" aria-label="close" class="lg-close lg-icon"></a></div>'+e+g+"</div></div>",a("body").append(c),this.$outer=a(".lg-outer"),this.$slide=this.$outer.find(".lg-item"),this.s.useLeft?(this.$outer.addClass("lg-use-left"),this.s.mode="lg-slide"):this.$outer.addClass("lg-use-css3"),h.setTop(),a(b).on("resize.lg orientationchange.lg",function(){setTimeout(function(){h.setTop()},100)}),this.$slide.eq(this.index).addClass("lg-current"),this.doCss()?this.$outer.addClass("lg-css3"):(this.$outer.addClass("lg-css"),this.s.speed=0),this.$outer.addClass(this.s.mode),this.s.enableDrag&&this.$items.length>1&&this.$outer.addClass("lg-grab"),this.s.showAfterLoad&&this.$outer.addClass("lg-show-after-load"),this.doCss()){var i=this.$outer.find(".lg-inner");i.css("transition-timing-function",this.s.cssEasing),i.css("transition-duration",this.s.speed+"ms")}a(".lg-backdrop").addClass("in"),setTimeout(function(){h.$outer.addClass("lg-visible")},this.s.backdropDuration),this.s.download&&this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'),this.prevScrollTop=a(b).scrollTop()},e.prototype.setTop=function(){if("100%"!==this.s.height){var c=a(b).height(),d=(c-parseInt(this.s.height,10))/2,e=this.$outer.find(".lg");c>=parseInt(this.s.height,10)?e.css("top",d+"px"):e.css("top","0px")}},e.prototype.doCss=function(){var a=function(){var a=["transition","MozTransition","WebkitTransition","OTransition","msTransition","KhtmlTransition"],b=c.documentElement,d=0;for(d=0;d<a.length;d++)if(a[d]in b.style)return!0};return a()?!0:!1},e.prototype.isVideo=function(a,b){var c;if(c=this.s.dynamic?this.s.dynamicEl[b].html:this.$items.eq(b).attr("data-html"),!a&&c)return{html5:!0};var d=a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),e=a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),f=a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i);return d?{youtube:d}:e?{vimeo:e}:f?{dailymotion:f}:void 0},e.prototype.counter=function(){this.s.counter&&a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">'+(parseInt(this.index,10)+1)+'</span> / <span id="lg-counter-all">'+this.$items.length+"</span></div>")},e.prototype.addHtml=function(b){var c,d=null;if(this.s.dynamic?this.s.dynamicEl[b].subHtmlUrl?c=this.s.dynamicEl[b].subHtmlUrl:d=this.s.dynamicEl[b].subHtml:this.$items.eq(b).attr("data-sub-html-url")?c=this.$items.eq(b).attr("data-sub-html-url"):d=this.$items.eq(b).attr("data-sub-html"),!c)if("undefined"!=typeof d&&null!==d){var e=d.substring(0,1);d="."===e||"#"===e?a(d).html():d}else d="";".lg-sub-html"===this.s.appendSubHtmlTo?c?this.$outer.find(this.s.appendSubHtmlTo).load(c):this.$outer.find(this.s.appendSubHtmlTo).html(d):c?this.$slide.eq(b).load(c):this.$slide.eq(b).find('.lg-subtitle').append(d),"undefined"!=typeof d&&null!==d&&(""===d?this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html"):this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")),this.$el.trigger("onAfterAppendSubHtml.lg",[b])},e.prototype.preload=function(a){var b=1,c=1;for(b=1;b<=this.s.preload&&!(b>=this.$items.length-a);b++)this.loadContent(a+b,!1,0);for(c=1;c<=this.s.preload&&!(0>a-c);c++)this.loadContent(a-c,!1,0)},e.prototype.loadContent=function(c,d,e){var f,g,h,i,j,k,l=this,m=!1,n=function(c){for(var d=[],e=[],f=0;f<c.length;f++){var h=c[f].split(" ");""===h[0]&&h.splice(0,1),e.push(h[0]),d.push(h[1])}for(var i=a(b).width(),j=0;j<d.length;j++)if(parseInt(d[j],10)>i){g=e[j];break}};if(l.s.dynamic){if(l.s.dynamicEl[c].poster&&(m=!0,h=l.s.dynamicEl[c].poster),k=l.s.dynamicEl[c].html,g=l.s.dynamicEl[c].src,l.s.dynamicEl[c].responsive){var o=l.s.dynamicEl[c].responsive.split(",");n(o)}i=l.s.dynamicEl[c].srcset,j=l.s.dynamicEl[c].sizes}else{if(l.$items.eq(c).attr("data-poster")&&(m=!0,h=l.$items.eq(c).attr("data-poster")),k=l.$items.eq(c).attr("data-html"),g=l.$items.eq(c).attr("href")||l.$items.eq(c).attr("data-src"),l.$items.eq(c).attr("data-responsive")){var p=l.$items.eq(c).attr("data-responsive").split(",");n(p)}i=l.$items.eq(c).attr("data-srcset"),j=l.$items.eq(c).attr("data-sizes")}var q=!1;l.s.dynamic?l.s.dynamicEl[c].iframe&&(q=!0):"true"===l.$items.eq(c).attr("data-iframe")&&(q=!0);var r=l.isVideo(g,c);if(!l.$slide.eq(c).hasClass("lg-loaded")){if(q)l.$slide.eq(c).prepend('<div class="lg-video-cont" style="max-width:'+l.s.iframeMaxWidth+'"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="'+g+'"  allowfullscreen="true"></iframe></div></div>');else if(m){var s="";s=r&&r.youtube?"lg-has-youtube":r&&r.vimeo?"lg-has-vimeo":"lg-has-html5",l.$slide.eq(c).prepend('<div class="lg-video-cont '+s+' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="'+h+'" /></div></div>')}else r?(l.$slide.eq(c).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'),l.$el.trigger("hasVideo.lg",[c,g,k])):l.$slide.eq(c).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="'+g+'" /><div class="lg-subtitle"></div></div>');if(l.$el.trigger("onAferAppendSlide.lg",[c]),f=l.$slide.eq(c).find(".lg-object"),j&&f.attr("sizes",j),i){f.attr("srcset",i);try{picturefill({elements:[f[0]]})}catch(t){console.error("Make sure you have included Picturefill version 2")}}".lg-sub-html"!==this.s.appendSubHtmlTo&&l.addHtml(c),l.$slide.eq(c).addClass("lg-loaded")}l.$slide.eq(c).find(".lg-object").on("load.lg error.lg",function(){var b=0;e&&!a("body").hasClass("lg-from-hash")&&(b=e),setTimeout(function(){l.$slide.eq(c).addClass("lg-complete"),l.$el.trigger("onSlideItemLoad.lg",[c,e||0])},b)}),r&&r.html5&&!m&&l.$slide.eq(c).addClass("lg-complete"),d===!0&&(l.$slide.eq(c).hasClass("lg-complete")?l.preload(c):l.$slide.eq(c).find(".lg-object").on("load.lg error.lg",function(){l.preload(c)}))},e.prototype.slide=function(b,c,d){var e=this.$outer.find(".lg-current").index(),f=this;if(!f.lGalleryOn||e!==b){var g=this.$slide.length,h=f.lGalleryOn?this.s.speed:0,i=!1,j=!1;if(!f.lgBusy){if(this.s.download){var k;k=f.s.dynamic?f.s.dynamicEl[b].downloadUrl!==!1&&(f.s.dynamicEl[b].downloadUrl||f.s.dynamicEl[b].src):"false"!==f.$items.eq(b).attr("data-download-url")&&(f.$items.eq(b).attr("data-download-url")||f.$items.eq(b).attr("href")||f.$items.eq(b).attr("data-src")),k?(a("#lg-download").attr("href",k),f.$outer.removeClass("lg-hide-download")):f.$outer.addClass("lg-hide-download")}if(this.$el.trigger("onBeforeSlide.lg",[e,b,c,d]),f.lgBusy=!0,clearTimeout(f.hideBartimeout),".lg-sub-html"===this.s.appendSubHtmlTo&&setTimeout(function(){f.addHtml(b)},h),this.arrowDisable(b),c){var l=b-1,m=b+1;0===b&&e===g-1?(m=0,l=g-1):b===g-1&&0===e&&(m=0,l=g-1),this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide"),f.$slide.eq(l).addClass("lg-prev-slide"),f.$slide.eq(m).addClass("lg-next-slide"),f.$slide.eq(b).addClass("lg-current")}else f.$outer.addClass("lg-no-trans"),this.$slide.removeClass("lg-prev-slide lg-next-slide"),e>b?(j=!0,0!==b||e!==g-1||d||(j=!1,i=!0)):b>e&&(i=!0,b!==g-1||0!==e||d||(j=!0,i=!1)),j?(this.$slide.eq(b).addClass("lg-prev-slide"),this.$slide.eq(e).addClass("lg-next-slide")):i&&(this.$slide.eq(b).addClass("lg-next-slide"),this.$slide.eq(e).addClass("lg-prev-slide")),setTimeout(function(){f.$slide.removeClass("lg-current"),f.$slide.eq(b).addClass("lg-current"),f.$outer.removeClass("lg-no-trans")},50);f.lGalleryOn?(setTimeout(function(){f.loadContent(b,!0,0)},this.s.speed+50),setTimeout(function(){f.lgBusy=!1,f.$el.trigger("onAfterSlide.lg",[e,b,c,d])},this.s.speed)):(f.loadContent(b,!0,f.s.backdropDuration),f.lgBusy=!1,f.$el.trigger("onAfterSlide.lg",[e,b,c,d])),f.lGalleryOn=!0,this.s.counter&&a("#lg-counter-current").text(b+1)}}},e.prototype.goToNextSlide=function(a){var b=this;b.lgBusy||(b.index+1<b.$slide.length?(b.index++,b.$el.trigger("onBeforeNextSlide.lg",[b.index]),b.slide(b.index,a,!1)):b.s.loop?(b.index=0,b.$el.trigger("onBeforeNextSlide.lg",[b.index]),b.slide(b.index,a,!1)):b.s.slideEndAnimatoin&&(b.$outer.addClass("lg-right-end"),setTimeout(function(){b.$outer.removeClass("lg-right-end")},400)))},e.prototype.goToPrevSlide=function(a){var b=this;b.lgBusy||(b.index>0?(b.index--,b.$el.trigger("onBeforePrevSlide.lg",[b.index,a]),b.slide(b.index,a,!1)):b.s.loop?(b.index=b.$items.length-1,b.$el.trigger("onBeforePrevSlide.lg",[b.index,a]),b.slide(b.index,a,!1)):b.s.slideEndAnimatoin&&(b.$outer.addClass("lg-left-end"),setTimeout(function(){b.$outer.removeClass("lg-left-end")},400)))},e.prototype.keyPress=function(){var c=this;this.$items.length>1&&a(b).on("keyup.lg",function(a){c.$items.length>1&&(37===a.keyCode&&(a.preventDefault(),c.goToPrevSlide()),39===a.keyCode&&(a.preventDefault(),c.goToNextSlide()))}),a(b).on("keydown.lg",function(a){c.s.escKey===!0&&27===a.keyCode&&(a.preventDefault(),c.$outer.hasClass("lg-thumb-open")?c.$outer.removeClass("lg-thumb-open"):c.destroy())})},e.prototype.arrow=function(){var a=this;this.$outer.find(".lg-prev").on("click.lg",function(event){event.preventDefault(),a.goToPrevSlide()}),this.$outer.find(".lg-next").on("click.lg",function(event){event.preventDefault(),a.goToNextSlide()})},e.prototype.arrowDisable=function(a){!this.s.loop&&this.s.hideControlOnEnd&&(a+1<this.$slide.length?this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled"):this.$outer.find(".lg-next").attr("disabled","disabled").addClass("disabled"),a>0?this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled"):this.$outer.find(".lg-prev").attr("disabled","disabled").addClass("disabled"))},e.prototype.setTranslate=function(a,b,c){this.s.useLeft?a.css("left",b):a.css({transform:"translate3d("+b+"px, "+c+"px, 0px)"})},e.prototype.touchMove=function(b,c){var d=c-b;this.$outer.addClass("lg-dragging"),this.setTranslate(this.$slide.eq(this.index),d,0),this.setTranslate(a(".lg-prev-slide"),-this.$slide.eq(this.index).width()+d,0),this.setTranslate(a(".lg-next-slide"),this.$slide.eq(this.index).width()+d,0)},e.prototype.touchEnd=function(a){var b=this;"lg-slide"!==b.s.mode&&b.$outer.addClass("lg-slide"),this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity","0"),setTimeout(function(){b.$outer.removeClass("lg-dragging"),0>a&&Math.abs(a)>b.s.swipeThreshold?b.goToNextSlide(!0):a>0&&Math.abs(a)>b.s.swipeThreshold?b.goToPrevSlide(!0):Math.abs(a)<5&&b.$el.trigger("onSlideClick.lg"),b.$slide.removeAttr("style")}),setTimeout(function(){b.$outer.hasClass("lg-dragging")||"lg-slide"===b.s.mode||b.$outer.removeClass("lg-slide")},b.s.speed+100)},e.prototype.enableSwipe=function(){var a=this,b=0,c=0,d=!1;a.s.enableSwipe&&a.isTouch&&a.doCss()&&(a.$slide.on("touchstart.lg",function(c){a.$outer.hasClass("lg-zoomed")||a.lgBusy||(c.preventDefault(),a.manageSwipeClass(),b=c.originalEvent.targetTouches[0].pageX)}),a.$slide.on("touchmove.lg",function(e){a.$outer.hasClass("lg-zoomed")||(e.preventDefault(),c=e.originalEvent.targetTouches[0].pageX,a.touchMove(b,c),d=!0)}),a.$slide.on("touchend.lg",function(){a.$outer.hasClass("lg-zoomed")||(d?(d=!1,a.touchEnd(c-b)):a.$el.trigger("onSlideClick.lg"))}))},e.prototype.enableDrag=function(){var c=this,d=0,e=0,f=!1,g=!1;c.s.enableDrag&&!c.isTouch&&c.doCss()&&(c.$slide.on("mousedown.lg",function(b){c.$outer.hasClass("lg-zoomed")||(a(b.target).hasClass("lg-object")||a(b.target).hasClass("lg-video-play"))&&(b.preventDefault(),c.lgBusy||(c.manageSwipeClass(),d=b.pageX,f=!0,c.$outer.scrollLeft+=1,c.$outer.scrollLeft-=1,c.$outer.removeClass("lg-grab").addClass("lg-grabbing"),c.$el.trigger("onDragstart.lg")))}),a(b).on("mousemove.lg",function(a){f&&(g=!0,e=a.pageX,c.touchMove(d,e),c.$el.trigger("onDragmove.lg"))}),a(b).on("mouseup.lg",function(b){g?(g=!1,c.touchEnd(e-d),c.$el.trigger("onDragend.lg")):(a(b.target).hasClass("lg-object")||a(b.target).hasClass("lg-video-play"))&&c.$el.trigger("onSlideClick.lg"),f&&(f=!1,c.$outer.removeClass("lg-grabbing").addClass("lg-grab"))}))},e.prototype.manageSwipeClass=function(){var a=this.index+1,b=this.index-1,c=this.$slide.length;this.s.loop&&(0===this.index?b=c-1:this.index===c-1&&(a=0)),this.$slide.removeClass("lg-next-slide lg-prev-slide"),b>-1&&this.$slide.eq(b).addClass("lg-prev-slide"),this.$slide.eq(a).addClass("lg-next-slide")},e.prototype.mousewheel=function(){var a=this;a.$outer.on("mousewheel.lg",function(b){b.deltaY&&(b.deltaY>0?a.goToPrevSlide():a.goToNextSlide(),b.preventDefault())})},e.prototype.closeGallery=function(){var b=this,c=!1;this.$outer.find(".lg-close").on("click.lg",function(event){event.preventDefault(),b.destroy()}),b.s.closable&&(b.$outer.on("mousedown.lg",function(b){c=a(b.target).is(".lg-outer")||a(b.target).is(".lg-item ")||a(b.target).is(".lg-img-wrap")?!0:!1}),b.$outer.on("mouseup.lg",function(d){(a(d.target).is(".lg-outer")||a(d.target).is(".lg-item ")||a(d.target).is(".lg-img-wrap")&&c)&&(b.$outer.hasClass("lg-dragging")||b.destroy())}))},e.prototype.destroy=function(c){var d=this;c||d.$el.trigger("onBeforeClose.lg"),a(b).scrollTop(d.prevScrollTop),c&&(d.s.dynamic||this.$items.off("click.lg click.lgcustom"),a.removeData(d.el,"lightGallery")),this.$el.off(".lg.tm"),a.each(a.fn.lightGallery.modules,function(a){d.modules[a]&&d.modules[a].destroy()}),this.lGalleryOn=!1,clearTimeout(d.hideBartimeout),this.hideBartimeout=!1,a(b).off(".lg"),a("body").removeClass("lg-on lg-from-hash"),d.$outer&&d.$outer.removeClass("lg-visible"),a(".lg-backdrop").removeClass("in"),setTimeout(function(){d.$outer&&d.$outer.remove(),a(".lg-backdrop").remove(),c||d.$el.trigger("onCloseAfter.lg")},d.s.backdropDuration+50)},a.fn.lightGallery=function(b){return this.each(function(){if(a.data(this,"lightGallery"))try{a(this).data("lightGallery").init()}catch(c){console.error("lightGallery has not initiated properly")}else a.data(this,"lightGallery",new e(this,b))})},a.fn.lightGallery.modules={}}(jQuery,window,document);
/*! lightgallery - v1.2.12 - 2016-01-03
* http://sachinchoolur.github.io/lightGallery/
* Copyright (c) 2016 Sachin N; Licensed Apache 2.0 */
!function(a,b,c,d){"use strict";var e={videoMaxWidth:"855px",youtubePlayerParams:!1,vimeoPlayerParams:!1,dailymotionPlayerParams:!1,videojs:!1},f=function(b){return this.core=a(b).data("lightGallery"),this.$el=a(b),this.core.s=a.extend({},e,this.core.s),this.videoLoaded=!1,this.init(),this};f.prototype.init=function(){var b=this;b.core.$el.on("hasVideo.lg.tm",function(a,c,d,e){if(b.core.$slide.eq(c).find(".lg-video").append(b.loadVideo(d,"lg-object",!0,c,e)),e)if(b.core.s.videojs)try{videojs(b.core.$slide.eq(c).find(".lg-html5").get(0),{},function(){b.videoLoaded||this.play()})}catch(f){console.error("Make sure you have included videojs")}else b.core.$slide.eq(c).find(".lg-html5").get(0).play()}),b.core.$el.on("onAferAppendSlide.lg.tm",function(a,c){b.core.$slide.eq(c).find(".lg-video-cont").css("max-width",b.core.s.videoMaxWidth),b.videoLoaded=!0});var c=function(a){if(a.find(".lg-object").hasClass("lg-has-poster")&&a.find(".lg-object").is(":visible"))if(a.hasClass("lg-has-video")){var c=a.find(".lg-youtube").get(0),d=a.find(".lg-vimeo").get(0),e=a.find(".lg-dailymotion").get(0),f=a.find(".lg-html5").get(0);if(c)c.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*");else if(d)try{$f(d).api("play")}catch(g){console.error("Make sure you have included froogaloop2 js")}else if(e)e.contentWindow.postMessage("play","*");else if(f)if(b.core.s.videojs)try{videojs(f).play()}catch(g){console.error("Make sure you have included videojs")}else f.play();a.addClass("lg-video-palying")}else{a.addClass("lg-video-palying lg-has-video");var h,i,j=function(c,d){if(a.find(".lg-video").append(b.loadVideo(c,"",!1,b.core.index,d)),d)if(b.core.s.videojs)try{videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0),{},function(){this.play()})}catch(e){console.error("Make sure you have included videojs")}else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play()};b.core.s.dynamic?(h=b.core.s.dynamicEl[b.core.index].src,i=b.core.s.dynamicEl[b.core.index].html,j(h,i)):(h=b.core.$items.eq(b.core.index).attr("href")||b.core.$items.eq(b.core.index).attr("data-src"),i=b.core.$items.eq(b.core.index).attr("data-html"),j(h,i));var k=a.find(".lg-object");a.find(".lg-video").append(k),a.find(".lg-video-object").hasClass("lg-html5")||(a.removeClass("lg-complete"),a.find(".lg-video-object").on("load.lg error.lg",function(){a.addClass("lg-complete")}))}};b.core.doCss()&&b.core.$items.length>1&&(b.core.s.enableSwipe&&b.core.isTouch||b.core.s.enableDrag&&!b.core.isTouch)?b.core.$el.on("onSlideClick.lg.tm",function(){var a=b.core.$slide.eq(b.core.index);c(a)}):b.core.$slide.on("click.lg",function(){c(a(this))}),b.core.$el.on("onBeforeSlide.lg.tm",function(a,c,d){var e=b.core.$slide.eq(c),f=e.find(".lg-youtube").get(0),g=e.find(".lg-vimeo").get(0),h=e.find(".lg-dailymotion").get(0),i=e.find(".lg-html5").get(0);if(f)f.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*");else if(g)try{$f(g).api("pause")}catch(j){console.error("Make sure you have included froogaloop2 js")}else if(h)h.contentWindow.postMessage("pause","*");else if(i)if(b.core.s.videojs)try{videojs(i).pause()}catch(j){console.error("Make sure you have included videojs")}else i.pause();var k;k=b.core.s.dynamic?b.core.s.dynamicEl[d].src:b.core.$items.eq(d).attr("href")||b.core.$items.eq(d).attr("data-src");var l=b.core.isVideo(k,d)||{};(l.youtube||l.vimeo||l.dailymotion)&&b.core.$outer.addClass("lg-hide-download")}),b.core.$el.on("onAfterSlide.lg.tm",function(a,c){b.core.$slide.eq(c).removeClass("lg-video-palying")})},f.prototype.loadVideo=function(b,c,d,e,f){var g="",h=1,i="",j=this.core.isVideo(b,e)||{};if(d&&(h=this.videoLoaded?0:1),j.youtube)i="?wmode=opaque&autoplay="+h+"&enablejsapi=1",this.core.s.youtubePlayerParams&&(i=i+"&"+a.param(this.core.s.youtubePlayerParams)),g='<iframe class="lg-video-object lg-youtube '+c+'" width="560" height="315" src="//www.youtube.com/embed/'+j.youtube[1]+i+'" frameborder="0" allowfullscreen></iframe>';else if(j.vimeo)i="?autoplay="+h+"&api=1",this.core.s.vimeoPlayerParams&&(i=i+"&"+a.param(this.core.s.vimeoPlayerParams)),g='<iframe class="lg-video-object lg-vimeo '+c+'" width="560" height="315"  src="http://player.vimeo.com/video/'+j.vimeo[1]+i+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';else if(j.dailymotion)i="?wmode=opaque&autoplay="+h+"&api=postMessage",this.core.s.dailymotionPlayerParams&&(i=i+"&"+a.param(this.core.s.dailymotionPlayerParams)),g='<iframe class="lg-video-object lg-dailymotion '+c+'" width="560" height="315" src="//www.dailymotion.com/embed/video/'+j.dailymotion[1]+i+'" frameborder="0" allowfullscreen></iframe>';else if(j.html5){var k=f.substring(0,1);("."===k||"#"===k)&&(f=a(f).html()),g=f}return g},f.prototype.destroy=function(){this.videoLoaded=!1},a.fn.lightGallery.modules.video=f}(jQuery,window,document);