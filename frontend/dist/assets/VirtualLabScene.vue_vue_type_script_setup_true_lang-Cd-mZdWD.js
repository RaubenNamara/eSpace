import{Q as ur,o as Dh,m as Lh,r as Et,d as Uu,c as Lt,A as lc,a as qe,f as Js,F as cs,k as Nr,e as ln,t as Yt,C as Ur,g as cc,p as hc,x as Fu,T as Ou,z as Bu,h as zu,n as ku,j as It}from"./index-MuzRX5pG.js";import{_ as Vu}from"./AppIcon.vue_vue_type_script_setup_true_lang-DurKQ1wi.js";function yx(){const i=Et(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return ur(i,r=>{document.body.style.overflow=r?"hidden":""}),Dh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),Lh(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pl="185",Ns={ROTATE:0,DOLLY:1,PAN:2},Ds={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hu=0,uc=1,Gu=2,gr=1,Wu=2,fr=3,zi=0,Mn=1,Jt=2,yi=0,Us=1,fc=2,dc=3,pc=4,Xu=5,$i=100,qu=101,Yu=102,Zu=103,Ku=104,$u=200,Ju=201,ju=202,Qu=203,Uo=204,Fo=205,ef=206,tf=207,nf=208,sf=209,rf=210,af=211,of=212,lf=213,cf=214,Oo=0,Bo=1,zo=2,zs=3,ko=4,Vo=5,Ho=6,Go=7,Dl=0,hf=1,uf=2,oi=0,Ih=1,Nh=2,Uh=3,Ll=4,Fh=5,Oh=6,Bh=7,zh=300,ns=301,ks=302,Wa=303,Xa=304,Fa=306,Mi=1e3,xi=1001,Wo=1002,un=1003,ff=1004,Fr=1005,gn=1006,qa=1007,Qi=1008,Cn=1009,kh=1010,Vh=1011,yr=1012,Il=1013,ci=1014,qn=1015,Ei=1016,Nl=1017,Ul=1018,Mr=1020,Hh=35902,Gh=35899,Wh=1021,Xh=1022,Yn=1023,wi=1026,es=1027,Fl=1028,Ol=1029,is=1030,Bl=1031,zl=1033,ma=33776,ga=33777,_a=33778,va=33779,Xo=35840,qo=35841,Yo=35842,Zo=35843,Ko=36196,$o=37492,Jo=37496,jo=37488,Qo=37489,Ma=37490,el=37491,tl=37808,nl=37809,il=37810,sl=37811,rl=37812,al=37813,ol=37814,ll=37815,cl=37816,hl=37817,ul=37818,fl=37819,dl=37820,pl=37821,ml=36492,gl=36494,_l=36495,vl=36283,xl=36284,Sa=36285,yl=36286,df=3200,ba=0,pf=1,Oi="",hn="srgb",Ea="srgb-linear",wa="linear",Nt="srgb",hs=7680,mc=519,mf=512,gf=513,_f=514,kl=515,vf=516,xf=517,Vl=518,yf=519,Ml=35044,gc="300 es",ai=2e3,Sr=2001;function Mf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ta(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Sf(){const i=Ta("canvas");return i.style.display="block",i}const _c={};function Aa(...i){const e="THREE."+i.shift();console.log(e,...i)}function qh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function nt(...i){i=qh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function yt(...i){i=qh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Fs(...i){const e=i.join(" ");e in _c||(_c[e]=!0,nt(...i))}function bf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Ef={[Oo]:Bo,[zo]:Ho,[ko]:Go,[zs]:Vo,[Bo]:Oo,[Ho]:zo,[Go]:ko,[Vo]:zs};class ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xa=Math.PI/180,Sl=180/Math.PI;function Si(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pn[i&255]+pn[i>>8&255]+pn[i>>16&255]+pn[i>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[t&63|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function pt(i,e,t){return Math.max(e,Math.min(t,i))}function wf(i,e){return(i%e+e)%e}function Ya(i,e,t){return(1-t)*i+t*e}function ri(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Tf={DEG2RAD:xa},ec=class ec{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ec.prototype.isVector2=!0;let Q=ec;class Ti{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||o!==u||l!==d||h!==g){let m=o*u+l*d+h*g+f*_;m<0&&(u=-u,d=-d,g=-g,_=-_,m=-m);let p=1-c;if(m<.9995){const M=Math.acos(m),S=Math.sin(M);p=Math.sin(p*M)/S,c=Math.sin(c*M)/S,o=o*p+u*c,l=l*p+d*c,h=h*p+g*c,f=f*p+_*c}else{o=o*p+u*c,l=l*p+d*c,h=h*p+g*c,f=f*p+_*c;const M=1/Math.sqrt(o*o+l*l+h*h+f*f);o*=M,l*=M,h*=M,f*=M}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],h=n[s+3],f=r[a],u=r[a+1],d=r[a+2],g=r[a+3];return e[t]=c*g+h*f+o*d-l*u,e[t+1]=o*g+h*u+l*f-c*d,e[t+2]=l*g+h*d+c*u-o*f,e[t+3]=h*g-c*f-o*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),h=c(s/2),f=c(r/2),u=o(n/2),d=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f+u*d*g;break;case"YZX":this._x=u*h*f+l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f-u*d*g;break;case"XZY":this._x=u*h*f-l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f+u*d*g;break;default:nt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],h=t[6],f=t[10],u=n+c+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-o)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>c&&n>f){const d=2*Math.sqrt(1+n-c-f);this._w=(h-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(c>f){const d=2*Math.sqrt(1+c-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+h)/d}else{const d=2*Math.sqrt(1+f-n-c);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(o+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,h=t._w;return this._x=n*h+a*c+s*l-r*o,this._y=s*h+a*o+r*c-n*l,this._z=r*h+a*l+n*o-s*c,this._w=a*h-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const tc=class tc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),h=2*(c*t-r*s),f=2*(r*n-a*t);return this.x=t+o*l+a*f-c*h,this.y=n+o*h+c*l-r*f,this.z=s+o*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Za.copy(this).projectOnVector(e),this.sub(Za)}reflect(e){return this.sub(Za.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};tc.prototype.isVector3=!0;let I=tc;const Za=new I,vc=new Ti,nc=class nc{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],S=s[4],y=s[7],A=s[2],E=s[5],R=s[8];return r[0]=a*_+c*M+o*A,r[3]=a*m+c*S+o*E,r[6]=a*p+c*y+o*R,r[1]=l*_+h*M+f*A,r[4]=l*m+h*S+f*E,r[7]=l*p+h*y+f*R,r[2]=u*_+d*M+g*A,r[5]=u*m+d*S+g*E,r[8]=u*p+d*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-n*r*h+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],f=h*a-c*l,u=c*o-h*r,d=l*r-a*o,g=t*f+n*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-h*n)*_,e[2]=(c*n-s*a)*_,e[3]=u*_,e[4]=(h*t-s*o)*_,e[5]=(s*r-c*t)*_,e[6]=d*_,e[7]=(n*o-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Fs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ka.makeScale(e,t)),this}rotate(e){return Fs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ka.makeRotation(-e)),this}translate(e,t){return Fs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};nc.prototype.isMatrix3=!0;let lt=nc;const Ka=new lt,xc=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yc=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Af(){const i={enabled:!0,workingColorSpace:Ea,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Nt&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Nt&&(s.r=Os(s.r),s.g=Os(s.g),s.b=Os(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Oi?wa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Fs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Fs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ea]:{primaries:e,whitePoint:n,transfer:wa,toXYZ:xc,fromXYZ:yc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:Nt,toXYZ:xc,fromXYZ:yc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const wt=Af();function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let us;class Rf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{us===void 0&&(us=Ta("canvas")),us.width=e.width,us.height=e.height;const s=us.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=us}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ta("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=bi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bi(t[n]/255)*255):t[n]=bi(t[n]);return{data:t,width:e.width,height:e.height}}else return nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Cf=0;class Hl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Si(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push($a(s[a].image)):r.push($a(s[a]))}else r=$a(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function $a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(nt("Texture: Unable to serialize Texture."),{})}let Pf=0;const Ja=new I;class _n extends ki{constructor(e=_n.DEFAULT_IMAGE,t=_n.DEFAULT_MAPPING,n=xi,s=xi,r=gn,a=Qi,c=Yn,o=Cn,l=_n.DEFAULT_ANISOTROPY,h=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=Si(),this.name="",this.source=new Hl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new Q(0,0),this.repeat=new Q(1,1),this.center=new Q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ja).x}get height(){return this.source.getSize(Ja).y}get depth(){return this.source.getSize(Ja).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){nt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){nt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mi:e.x=e.x-Math.floor(e.x);break;case xi:e.x=e.x<0?0:1;break;case Wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mi:e.y=e.y-Math.floor(e.y);break;case xi:e.y=e.y<0?0:1;break;case Wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_n.DEFAULT_IMAGE=null;_n.DEFAULT_MAPPING=zh;_n.DEFAULT_ANISOTROPY=1;const ic=class ic{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],h=o[4],f=o[8],u=o[1],d=o[5],g=o[9],_=o[2],m=o[6],p=o[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,y=(d+1)/2,A=(p+1)/2,E=(h+u)/4,R=(f+_)/4,v=(g+m)/4;return S>y&&S>A?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=E/n,r=R/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=E/s,r=v/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=v/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ic.prototype.isVector4=!0;let Zt=ic;class Df extends ki{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Zt(0,0,e,t),this.scissorTest=!1,this.viewport=new Zt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new _n(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Hl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends Df{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yh extends _n{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lf extends _n{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ua=class Ua{constructor(e,t,n,s,r,a,c,o,l,h,f,u,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,h,f,u,d,g,_,m)}set(e,t,n,s,r,a,c,o,l,h,f,u,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=o,p[2]=l,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ua().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/fs.setFromMatrixColumn(e,0).length(),r=1/fs.setFromMatrixColumn(e,1).length(),a=1/fs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*h,d=a*f,g=c*h,_=c*f;t[0]=o*h,t[4]=-o*f,t[8]=l,t[1]=d+g*l,t[5]=u-_*l,t[9]=-c*o,t[2]=_-u*l,t[6]=g+d*l,t[10]=a*o}else if(e.order==="YXZ"){const u=o*h,d=o*f,g=l*h,_=l*f;t[0]=u+_*c,t[4]=g*c-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-c,t[2]=d*c-g,t[6]=_+u*c,t[10]=a*o}else if(e.order==="ZXY"){const u=o*h,d=o*f,g=l*h,_=l*f;t[0]=u-_*c,t[4]=-a*f,t[8]=g+d*c,t[1]=d+g*c,t[5]=a*h,t[9]=_-u*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const u=a*h,d=a*f,g=c*h,_=c*f;t[0]=o*h,t[4]=g*l-d,t[8]=u*l+_,t[1]=o*f,t[5]=_*l+u,t[9]=d*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const u=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=_-u*f,t[8]=g*f+d,t[1]=f,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=d*f+g,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=-f,t[8]=l*h,t[1]=u*f+_,t[5]=a*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=c*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(If,e,Nf)}lookAt(e,t,n){const s=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),Ci.crossVectors(n,En),Ci.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),Ci.crossVectors(n,En)),Ci.normalize(),Or.crossVectors(En,Ci),s[0]=Ci.x,s[4]=Or.x,s[8]=En.x,s[1]=Ci.y,s[5]=Or.y,s[9]=En.y,s[2]=Ci.z,s[6]=Or.z,s[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],S=n[7],y=n[11],A=n[15],E=s[0],R=s[4],v=s[8],w=s[12],L=s[1],U=s[5],z=s[9],q=s[13],J=s[2],k=s[6],$=s[10],F=s[14],X=s[3],se=s[7],fe=s[11],de=s[15];return r[0]=a*E+c*L+o*J+l*X,r[4]=a*R+c*U+o*k+l*se,r[8]=a*v+c*z+o*$+l*fe,r[12]=a*w+c*q+o*F+l*de,r[1]=h*E+f*L+u*J+d*X,r[5]=h*R+f*U+u*k+d*se,r[9]=h*v+f*z+u*$+d*fe,r[13]=h*w+f*q+u*F+d*de,r[2]=g*E+_*L+m*J+p*X,r[6]=g*R+_*U+m*k+p*se,r[10]=g*v+_*z+m*$+p*fe,r[14]=g*w+_*q+m*F+p*de,r[3]=M*E+S*L+y*J+A*X,r[7]=M*R+S*U+y*k+A*se,r[11]=M*v+S*z+y*$+A*fe,r[15]=M*w+S*q+y*F+A*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=o*d-l*u,S=c*d-l*f,y=c*u-o*f,A=a*d-l*h,E=a*u-o*h,R=a*f-c*h;return t*(_*M-m*S+p*y)-n*(g*M-m*A+p*E)+s*(g*S-_*A+p*R)-r*(g*y-_*E+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-n*(r*h-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*c-n*a,S=t*o-s*a,y=t*l-r*a,A=n*o-s*c,E=n*l-r*c,R=s*l-r*o,v=h*_-f*g,w=h*m-u*g,L=h*p-d*g,U=f*m-u*_,z=f*p-d*_,q=u*p-d*m,J=M*q-S*z+y*U+A*L-E*w+R*v;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/J;return e[0]=(c*q-o*z+l*U)*k,e[1]=(s*z-n*q-r*U)*k,e[2]=(_*R-m*E+p*A)*k,e[3]=(u*E-f*R-d*A)*k,e[4]=(o*L-a*q-l*w)*k,e[5]=(t*q-s*L+r*w)*k,e[6]=(m*y-g*R-p*S)*k,e[7]=(h*R-u*y+d*S)*k,e[8]=(a*z-c*L+l*v)*k,e[9]=(n*L-t*z-r*v)*k,e[10]=(g*E-_*y+p*M)*k,e[11]=(f*y-h*E-d*M)*k,e[12]=(c*w-a*U-o*v)*k,e[13]=(t*U-n*w+s*v)*k,e[14]=(_*S-g*A-m*M)*k,e[15]=(h*A-f*S+u*M)*k,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,h=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,h*c+n,h*o-s*a,0,l*o-s*c,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,h=a+a,f=c+c,u=r*l,d=r*h,g=r*f,_=a*h,m=a*f,p=c*f,M=o*l,S=o*h,y=o*f,A=n.x,E=n.y,R=n.z;return s[0]=(1-(_+p))*A,s[1]=(d+y)*A,s[2]=(g-S)*A,s[3]=0,s[4]=(d-y)*E,s[5]=(1-(u+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+S)*R,s[9]=(m-M)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=fs.set(s[0],s[1],s[2]).length();const c=fs.set(s[4],s[5],s[6]).length(),o=fs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Hn.copy(this);const l=1/a,h=1/c,f=1/o;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=f,Hn.elements[9]*=f,Hn.elements[10]*=f,t.setFromRotationMatrix(Hn),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=ai,o=!1){const l=this.elements,h=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let g,_;if(o)g=r/(a-r),_=a*r/(a-r);else if(c===ai)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(c===Sr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=ai,o=!1){const l=this.elements,h=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,_;if(o)g=1/(a-r),_=a/(a-r);else if(c===ai)g=-2/(a-r),_=-(a+r)/(a-r);else if(c===Sr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ua.prototype.isMatrix4=!0;let Ut=Ua;const fs=new I,Hn=new Ut,If=new I(0,0,0),Nf=new I(1,1,1),Ci=new I,Or=new I,En=new I,Mc=new Ut,Sc=new Ti;class Ai{constructor(e=0,t=0,n=0,s=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-pt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Sc.setFromEuler(this),this.setFromQuaternion(Sc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class Gl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Uf=0;const bc=new I,ds=new Ti,fi=new Ut,Br=new I,js=new I,Ff=new I,Of=new Ti,Ec=new I(1,0,0),wc=new I(0,1,0),Tc=new I(0,0,1),Ac={type:"added"},Bf={type:"removed"},ps={type:"childadded",child:null},ja={type:"childremoved",child:null};class tn extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new I,t=new Ai,n=new Ti,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ut},normalMatrix:{value:new lt}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.multiply(ds),this}rotateOnWorldAxis(e,t){return ds.setFromAxisAngle(e,t),this.quaternion.premultiply(ds),this}rotateX(e){return this.rotateOnAxis(Ec,e)}rotateY(e){return this.rotateOnAxis(wc,e)}rotateZ(e){return this.rotateOnAxis(Tc,e)}translateOnAxis(e,t){return bc.copy(e).applyQuaternion(this.quaternion),this.position.add(bc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ec,e)}translateY(e){return this.translateOnAxis(wc,e)}translateZ(e){return this.translateOnAxis(Tc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Br.copy(e):Br.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(js,Br,this.up):fi.lookAt(Br,js,this.up),this.quaternion.setFromRotationMatrix(fi),s&&(fi.extractRotation(s.matrixWorld),ds.setFromRotationMatrix(fi),this.quaternion.premultiply(ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(yt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ac),ps.child=e,this.dispatchEvent(ps),ps.child=null):yt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bf),ja.child=e,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ac),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,Ff),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,Of,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,h=o.length;l<h;l++){const f=o[l];r(e.shapes,f)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(c){const o=[];for(const l in c){const h=c[l];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new I(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class $t extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zf={type:"move"};class Qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&u>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(zf)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},zr={h:0,s:0,l:0};function eo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ht{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,wt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=wt.workingColorSpace){return this.r=e,this.g=t,this.b=n,wt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=wt.workingColorSpace){if(e=wf(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=eo(a,r,e+1/3),this.g=eo(a,r,e),this.b=eo(a,r,e-1/3)}return wt.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&nt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:nt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);nt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=Zh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):nt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return wt.workingToColorSpace(mn.copy(this),e),Math.round(pt(mn.r*255,0,255))*65536+Math.round(pt(mn.g*255,0,255))*256+Math.round(pt(mn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=wt.workingColorSpace){wt.workingToColorSpace(mn.copy(this),t);const n=mn.r,s=mn.g,r=mn.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const h=(c+a)/2;if(c===a)o=0,l=0;else{const f=a-c;switch(l=h<=.5?f/(a+c):f/(2-a-c),a){case n:o=(s-r)/f+(s<r?6:0);break;case s:o=(r-n)/f+2;break;case r:o=(n-s)/f+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=wt.workingColorSpace){return wt.workingToColorSpace(mn.copy(this),t),e.r=mn.r,e.g=mn.g,e.b=mn.b,e}getStyle(e=hn){wt.workingToColorSpace(mn.copy(this),e);const t=mn.r,n=mn.g,s=mn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(zr);const n=Ya(Pi.h,zr.h,t),s=Ya(Pi.s,zr.s,t),r=Ya(Pi.l,zr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new ht;ht.NAMES=Zh;class _r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ht(e),this.near=t,this.far=n}clone(){return new _r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Kh extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Gn=new I,di=new I,to=new I,pi=new I,ms=new I,gs=new I,Rc=new I,no=new I,io=new I,so=new I,ro=new Zt,ao=new Zt,oo=new Zt;class Un{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Gn.subVectors(e,t),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Gn.subVectors(s,t),di.subVectors(n,t),to.subVectors(e,t);const a=Gn.dot(Gn),c=Gn.dot(di),o=Gn.dot(to),l=di.dot(di),h=di.dot(to),f=a*l-c*c;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(l*o-c*h)*u,g=(a*h-c*o)*u;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,pi)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,pi.x),o.addScaledVector(a,pi.y),o.addScaledVector(c,pi.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return ro.setScalar(0),ao.setScalar(0),oo.setScalar(0),ro.fromBufferAttribute(e,t),ao.fromBufferAttribute(e,n),oo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ro,r.x),a.addScaledVector(ao,r.y),a.addScaledVector(oo,r.z),a}static isFrontFacing(e,t,n,s){return Gn.subVectors(n,t),di.subVectors(e,t),Gn.cross(di).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Gn.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Un.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;ms.subVectors(s,n),gs.subVectors(r,n),no.subVectors(e,n);const o=ms.dot(no),l=gs.dot(no);if(o<=0&&l<=0)return t.copy(n);io.subVectors(e,s);const h=ms.dot(io),f=gs.dot(io);if(h>=0&&f<=h)return t.copy(s);const u=o*f-h*l;if(u<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(ms,a);so.subVectors(e,r);const d=ms.dot(so),g=gs.dot(so);if(g>=0&&d<=g)return t.copy(r);const _=d*l-o*g;if(_<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector(gs,c);const m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return Rc.subVectors(r,s),c=(f-h)/(f-h+(d-g)),t.copy(s).addScaledVector(Rc,c);const p=1/(m+_+u);return a=_*p,c=u*p,t.copy(n).addScaledVector(ms,a).addScaledVector(gs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Fn{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Wn):Wn.fromBufferAttribute(r,a),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),kr.copy(n.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qs),Vr.subVectors(this.max,Qs),_s.subVectors(e.a,Qs),vs.subVectors(e.b,Qs),xs.subVectors(e.c,Qs),Di.subVectors(vs,_s),Li.subVectors(xs,vs),qi.subVectors(_s,xs);let t=[0,-Di.z,Di.y,0,-Li.z,Li.y,0,-qi.z,qi.y,Di.z,0,-Di.x,Li.z,0,-Li.x,qi.z,0,-qi.x,-Di.y,Di.x,0,-Li.y,Li.x,0,-qi.y,qi.x,0];return!lo(t,_s,vs,xs,Vr)||(t=[1,0,0,0,1,0,0,0,1],!lo(t,_s,vs,xs,Vr))?!1:(Hr.crossVectors(Di,Li),t=[Hr.x,Hr.y,Hr.z],lo(t,_s,vs,xs,Vr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const mi=[new I,new I,new I,new I,new I,new I,new I,new I],Wn=new I,kr=new Fn,_s=new I,vs=new I,xs=new I,Di=new I,Li=new I,qi=new I,Qs=new I,Vr=new I,Hr=new I,Yi=new I;function lo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Yi.fromArray(i,r);const c=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),o=e.dot(Yi),l=t.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>c)return!1}return!0}const jt=new I,Gr=new Q;let kf=0;class On extends ki{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ml,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gr.fromBufferAttribute(this,t),Gr.applyMatrix3(e),this.setXY(t,Gr.x,Gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ri(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ri(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ri(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ri(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ml&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class $h extends On{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jh extends On{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Mt extends On{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Vf=new Fn,er=new I,co=new I;class Ws{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Vf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(er,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(co.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(co)),this.expandByPoint(er.copy(e.center).sub(co))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Hf=0;const Ln=new Ut,ho=new tn,ys=new I,wn=new Fn,tr=new Fn,cn=new I;class nn extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mf(e)?Jh:$h)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ln.makeRotationFromQuaternion(e),this.applyMatrix4(Ln),this}rotateX(e){return Ln.makeRotationX(e),this.applyMatrix4(Ln),this}rotateY(e){return Ln.makeRotationY(e),this.applyMatrix4(Ln),this}rotateZ(e){return Ln.makeRotationZ(e),this.applyMatrix4(Ln),this}translate(e,t,n){return Ln.makeTranslation(e,t,n),this.applyMatrix4(Ln),this}scale(e,t,n){return Ln.makeScale(e,t,n),this.applyMatrix4(Ln),this}lookAt(e){return ho.lookAt(e),ho.updateMatrix(),this.applyMatrix4(ho.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];tr.setFromBufferAttribute(c),this.morphTargetsRelative?(cn.addVectors(wn.min,tr.min),wn.expandByPoint(cn),cn.addVectors(wn.max,tr.max),wn.expandByPoint(cn)):(wn.expandByPoint(tr.min),wn.expandByPoint(tr.max))}wn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)cn.fromBufferAttribute(c,l),o&&(ys.fromBufferAttribute(e,l),cn.add(ys)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new On(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let v=0;v<n.count;v++)c[v]=new I,o[v]=new I;const l=new I,h=new I,f=new I,u=new Q,d=new Q,g=new Q,_=new I,m=new I;function p(v,w,L){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,w),f.fromBufferAttribute(n,L),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,L),h.sub(l),f.sub(l),d.sub(u),g.sub(u);const U=1/(d.x*g.y-g.x*d.y);isFinite(U)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(U),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(U),c[v].add(_),c[w].add(_),c[L].add(_),o[v].add(m),o[w].add(m),o[L].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,w=M.length;v<w;++v){const L=M[v],U=L.start,z=L.count;for(let q=U,J=U+z;q<J;q+=3)p(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const S=new I,y=new I,A=new I,E=new I;function R(v){A.fromBufferAttribute(s,v),E.copy(A);const w=c[v];S.copy(w),S.sub(A.multiplyScalar(A.dot(w))).normalize(),y.crossVectors(E,w);const U=y.dot(o[v])<0?-1:1;a.setXYZW(v,S.x,S.y,S.z,U)}for(let v=0,w=M.length;v<w;++v){const L=M[v],U=L.start,z=L.count;for(let q=U,J=U+z;q<J;q+=3)R(e.getX(q+0)),R(e.getX(q+1)),R(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new On(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const s=new I,r=new I,a=new I,c=new I,o=new I,l=new I,h=new I,f=new I;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.add(h),o.add(h),l.add(h),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(c,o){const l=c.array,h=c.itemSize,f=c.normalized,u=new l.constructor(o.length*h);let d=0,g=0;for(let _=0,m=o.length;_<m;_++){c.isInterleavedBufferAttribute?d=o[_]*c.data.stride+c.offset:d=o[_]*h;for(let p=0;p<h;p++)u[g++]=l[d++]}return new On(u,h,f)}if(this.index===null)return nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nn,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let h=0,f=l.length;h<f;h++){const u=l[h],d=e(u,n);o.push(d)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],h=[];for(let f=0,u=l.length;f<u;f++){const d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(s[o]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ml,this.updateRanges=[],this.version=0,this.uuid=Si()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xn=new I;class Ra{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ri(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ri(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ri(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ri(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Aa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new On(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ra(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Aa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Wf=0;class Vi extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=Us,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uo,this.blendDst=Fo,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hs,this.stencilZFail=hs,this.stencilZPass=hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){nt(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){nt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(n.blending=this.blending),this.side!==zi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Uo&&(n.blendSrc=this.blendSrc),this.blendDst!==Fo&&(n.blendDst=this.blendDst),this.blendEquation!==$i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ht().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Q().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Q().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Bs extends Vi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ms;const nr=new I,Ss=new I,bs=new I,Es=new Q,ir=new Q,jh=new Ut,Wr=new I,sr=new I,Xr=new I,Cc=new Q,uo=new Q,Pc=new Q;class An extends tn{constructor(e=new Bs){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new nn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gf(t,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new Ra(n,3,0,!1)),Ms.setAttribute("uv",new Ra(n,2,3,!1))}this.geometry=Ms,this.material=e,this.center=new Q(.5,.5),this.count=1}raycast(e,t){e.camera===null&&yt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ss.setFromMatrixScale(this.matrixWorld),jh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),bs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ss.multiplyScalar(-bs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;qr(Wr.set(-.5,-.5,0),bs,a,Ss,s,r),qr(sr.set(.5,-.5,0),bs,a,Ss,s,r),qr(Xr.set(.5,.5,0),bs,a,Ss,s,r),Cc.set(0,0),uo.set(1,0),Pc.set(1,1);let c=e.ray.intersectTriangle(Wr,sr,Xr,!1,nr);if(c===null&&(qr(sr.set(-.5,.5,0),bs,a,Ss,s,r),uo.set(0,1),c=e.ray.intersectTriangle(Wr,Xr,sr,!1,nr),c===null))return;const o=e.ray.origin.distanceTo(nr);o<e.near||o>e.far||t.push({distance:o,point:nr.clone(),uv:Un.getInterpolation(nr,Wr,sr,Xr,Cc,uo,Pc,new Q),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function qr(i,e,t,n,s,r){Es.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(ir.x=r*Es.x-s*Es.y,ir.y=s*Es.x+r*Es.y):ir.copy(Es),i.copy(e),i.x+=ir.x,i.y+=ir.y,i.applyMatrix4(jh)}const gi=new I,fo=new I,Yr=new I,Ii=new I,po=new I,Zr=new I,mo=new I;class Oa{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.origin).addScaledVector(this.direction,t),gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){fo.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),Ii.copy(this.origin).sub(fo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Yr),c=Ii.dot(this.direction),o=-Ii.dot(Yr),l=Ii.lengthSq(),h=Math.abs(1-a*a);let f,u,d,g;if(h>0)if(f=a*o-c,u=a*c-o,g=r*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,d=f*(f+a*u+2*c)+u*(a*f+u+2*o)+l}else u=r,f=Math.max(0,-(a*u+c)),d=-f*f+u*(u+2*o)+l;else u=-r,f=Math.max(0,-(a*u+c)),d=-f*f+u*(u+2*o)+l;else u<=-g?(f=Math.max(0,-(-a*r+c)),u=f>0?-r:Math.min(Math.max(-r,-o),r),d=-f*f+u*(u+2*o)+l):u<=g?(f=0,u=Math.min(Math.max(-r,-o),r),d=u*(u+2*o)+l):(f=Math.max(0,-(a*r+c)),u=f>0?r:Math.min(Math.max(-r,-o),r),d=-f*f+u*(u+2*o)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+c)),d=-f*f+u*(u+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(fo).addScaledVector(Yr,u),d}intersectSphere(e,t){gi.subVectors(e.center,this.origin);const n=gi.dot(this.direction),s=gi.dot(gi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(c=(e.min.z-u.z)*f,o=(e.max.z-u.z)*f):(c=(e.max.z-u.z)*f,o=(e.min.z-u.z)*f),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,n,s,r){po.subVectors(t,e),Zr.subVectors(n,e),mo.crossVectors(po,Zr);let a=this.direction.dot(mo),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Ii.subVectors(this.origin,e);const o=c*this.direction.dot(Zr.crossVectors(Ii,Zr));if(o<0)return null;const l=c*this.direction.dot(po.cross(Ii));if(l<0||o+l>a)return null;const h=-c*Ii.dot(mo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ss extends Vi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=Dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dc=new Ut,Zi=new Oa,Kr=new Ws,Lc=new I,$r=new I,Jr=new I,jr=new I,go=new I,Qr=new I,Ic=new I,ea=new I;class Ie extends tn{constructor(e=new nn,t=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){Qr.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const h=c[o],f=r[o];h!==0&&(go.fromBufferAttribute(f,e),a?Qr.addScaledVector(go,h):Qr.addScaledVector(go.sub(t),h))}t.add(Qr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(Kr.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(Kr,Lc)===null||Zi.origin.distanceToSquared(Lc)>(e.far-e.near)**2))&&(Dc.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(Dc),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,A=S;y<A;y+=3){const E=c.getX(y),R=c.getX(y+1),v=c.getX(y+2);s=ta(this,p,e,n,l,h,f,E,R,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=c.getX(m),S=c.getX(m+1),y=c.getX(m+2);s=ta(this,a,e,n,l,h,f,M,S,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,A=S;y<A;y+=3){const E=y,R=y+1,v=y+2;s=ta(this,p,e,n,l,h,f,E,R,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,S=m+1,y=m+2;s=ta(this,a,e,n,l,h,f,M,S,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Xf(i,e,t,n,s,r,a,c){let o;if(e.side===Mn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===zi,c),o===null)return null;ea.copy(c),ea.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ea);return l<t.near||l>t.far?null:{distance:l,point:ea.clone(),object:i}}function ta(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,$r),i.getVertexPosition(o,Jr),i.getVertexPosition(l,jr);const h=Xf(i,e,t,n,$r,Jr,jr,Ic);if(h){const f=new I;Un.getBarycoord(Ic,$r,Jr,jr,f),s&&(h.uv=Un.getInterpolatedAttribute(s,c,o,l,f,new Q)),r&&(h.uv1=Un.getInterpolatedAttribute(r,c,o,l,f,new Q)),a&&(h.normal=Un.getInterpolatedAttribute(a,c,o,l,f,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:c,b:o,c:l,normal:new I,materialIndex:0};Un.getNormal($r,Jr,jr,u.normal),h.face=u,h.barycoord=f}return h}class Qh extends _n{constructor(e=null,t=1,n=1,s,r,a,c,o,l=un,h=un,f,u){super(null,a,c,o,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nc extends On{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ws=new Ut,Uc=new Ut,na=[],Fc=new Fn,qf=new Ut,rr=new Ie,ar=new Ws;class Yf extends Ie{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Nc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,qf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ws),Fc.copy(e.boundingBox).applyMatrix4(ws),this.boundingBox.union(Fc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ws),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ws),ar.copy(e.boundingSphere).applyMatrix4(ws),this.boundingSphere.union(ar)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(rr.geometry=this.geometry,rr.material=this.material,rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ar.copy(this.boundingSphere),ar.applyMatrix4(n),e.ray.intersectsSphere(ar)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ws),Uc.multiplyMatrices(n,ws),rr.matrixWorld=Uc,rr.raycast(e,na);for(let a=0,c=na.length;a<c;a++){const o=na[a];o.instanceId=r,o.object=this,t.push(o)}na.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Nc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qh(new Float32Array(s*this.count),s,this.count,Fl,qn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _o=new I,Zf=new I,Kf=new lt;class vi{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=_o.subVectors(n,t).cross(Zf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(_o),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Kf.getNormalMatrix(e),s=this.coplanarPoint(_o).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ki=new Ws,$f=new Q(.5,.5),ia=new I;class Wl{constructor(e=new vi,t=new vi,n=new vi,s=new vi,r=new vi,a=new vi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ai,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],S=r[13],y=r[14],A=r[15];if(s[0].setComponents(l-a,d-h,p-g,A-M).normalize(),s[1].setComponents(l+a,d+h,p+g,A+M).normalize(),s[2].setComponents(l+c,d+f,p+_,A+S).normalize(),s[3].setComponents(l-c,d-f,p-_,A-S).normalize(),n)s[4].setComponents(o,u,m,y).normalize(),s[5].setComponents(l-o,d-u,p-m,A-y).normalize();else if(s[4].setComponents(l-o,d-u,p-m,A-y).normalize(),t===ai)s[5].setComponents(l+o,d+u,p+m,A+y).normalize();else if(t===Sr)s[5].setComponents(o,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(e){Ki.center.set(0,0,0);const t=$f.distanceTo(e.center);return Ki.radius=.7071067811865476+t,Ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ia.x=s.normal.x>0?e.max.x:e.min.x,ia.y=s.normal.y>0?e.max.y:e.min.y,ia.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ia)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class eu extends Vi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ca=new I,Pa=new I,Oc=new Ut,or=new Oa,sa=new Ws,vo=new I,Bc=new I;class Jf extends tn{constructor(e=new nn,t=new eu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ca.fromBufferAttribute(t,s-1),Pa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ca.distanceTo(Pa);e.setAttribute("lineDistance",new Mt(n,1))}else nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(s),sa.radius+=r,e.ray.intersectsSphere(sa)===!1)return;Oc.copy(s).invert(),or.copy(e.ray).applyMatrix4(Oc);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=h.getX(_),M=h.getX(_+1),S=ra(this,e,or,o,p,M,_);S&&t.push(S)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=ra(this,e,or,o,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=ra(this,e,or,o,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=ra(this,e,or,o,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function ra(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(Ca.fromBufferAttribute(c,s),Pa.fromBufferAttribute(c,r),t.distanceSqToSegment(Ca,Pa,vo,Bc)>n)return;vo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(vo);if(!(l<e.near||l>e.far))return{distance:l,point:Bc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class tu extends _n{constructor(e=[],t=ns,n,s,r,a,c,o,l,h){super(e,t,n,s,r,a,c,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class br extends _n{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vs extends _n{constructor(e,t,n=ci,s,r,a,c=un,o=un,l,h=wi,f=1){if(h!==wi&&h!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,c,o,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class jf extends Vs{constructor(e,t=ci,n=ns,s,r,a=un,c=un,o,l=wi){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,c,o,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class nu extends _n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Dt extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(f,2));function g(_,m,p,M,S,y,A,E,R,v,w){const L=y/R,U=A/v,z=y/2,q=A/2,J=E/2,k=R+1,$=v+1;let F=0,X=0;const se=new I;for(let fe=0;fe<$;fe++){const de=fe*U-q;for(let ve=0;ve<k;ve++){const Je=ve*L-z;se[_]=Je*M,se[m]=de*S,se[p]=J,l.push(se.x,se.y,se.z),se[_]=0,se[m]=0,se[p]=E>0?1:-1,h.push(se.x,se.y,se.z),f.push(ve/R),f.push(1-fe/v),F+=1}}for(let fe=0;fe<v;fe++)for(let de=0;de<R;de++){const ve=u+de+k*fe,Je=u+de+k*(fe+1),St=u+(de+1)+k*(fe+1),it=u+(de+1)+k*fe;o.push(ve,Je,it),o.push(Je,St,it),X+=6}c.addGroup(d,X,w),d+=X,u+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ji extends nn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new I,h=new Q;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const d=n+f/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),c.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,o.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Mt(a,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ee extends nn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],d=[];let g=0;const _=[],m=n/2;let p=0;M(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Mt(f,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2));function M(){const y=new I,A=new I;let E=0;const R=(t-e)/n;for(let v=0;v<=r;v++){const w=[],L=v/r,U=L*(t-e)+e;for(let z=0;z<=s;z++){const q=z/s,J=q*o+c,k=Math.sin(J),$=Math.cos(J);A.x=U*k,A.y=-L*n+m,A.z=U*$,f.push(A.x,A.y,A.z),y.set(k,R,$).normalize(),u.push(y.x,y.y,y.z),d.push(q,1-L),w.push(g++)}_.push(w)}for(let v=0;v<s;v++)for(let w=0;w<r;w++){const L=_[w][v],U=_[w+1][v],z=_[w+1][v+1],q=_[w][v+1];(e>0||w!==0)&&(h.push(L,U,q),E+=3),(t>0||w!==r-1)&&(h.push(U,z,q),E+=3)}l.addGroup(p,E,0),p+=E}function S(y){const A=g,E=new Q,R=new I;let v=0;const w=y===!0?e:t,L=y===!0?1:-1;for(let z=1;z<=s;z++)f.push(0,m*L,0),u.push(0,L,0),d.push(.5,.5),g++;const U=g;for(let z=0;z<=s;z++){const J=z/s*o+c,k=Math.cos(J),$=Math.sin(J);R.x=w*$,R.y=m*L,R.z=w*k,f.push(R.x,R.y,R.z),u.push(0,L,0),E.x=k*.5+.5,E.y=$*.5*L+.5,d.push(E.x,E.y),g++}for(let z=0;z<s;z++){const q=A+z,J=U+z;y===!0?h.push(J,J+1,q):h.push(J+1,J,q),v+=3}l.addGroup(p,v,y===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ee(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xn extends ee{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new Xn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xl extends nn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),h(),this.setAttribute("position",new Mt(r,3)),this.setAttribute("normal",new Mt(r.slice(),3)),this.setAttribute("uv",new Mt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(M){const S=new I,y=new I,A=new I;for(let E=0;E<t.length;E+=3)d(t[E+0],S),d(t[E+1],y),d(t[E+2],A),o(S,y,A,M)}function o(M,S,y,A){const E=A+1,R=[];for(let v=0;v<=E;v++){R[v]=[];const w=M.clone().lerp(y,v/E),L=S.clone().lerp(y,v/E),U=E-v;for(let z=0;z<=U;z++)z===0&&v===E?R[v][z]=w:R[v][z]=w.clone().lerp(L,z/U)}for(let v=0;v<E;v++)for(let w=0;w<2*(E-v)-1;w++){const L=Math.floor(w/2);w%2===0?(u(R[v][L+1]),u(R[v+1][L]),u(R[v][L])):(u(R[v][L+1]),u(R[v+1][L+1]),u(R[v+1][L]))}}function l(M){const S=new I;for(let y=0;y<r.length;y+=3)S.x=r[y+0],S.y=r[y+1],S.z=r[y+2],S.normalize().multiplyScalar(M),r[y+0]=S.x,r[y+1]=S.y,r[y+2]=S.z}function h(){const M=new I;for(let S=0;S<r.length;S+=3){M.x=r[S+0],M.y=r[S+1],M.z=r[S+2];const y=m(M)/2/Math.PI+.5,A=p(M)/Math.PI+.5;a.push(y,1-A)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){const S=a[M+0],y=a[M+2],A=a[M+4],E=Math.max(S,y,A),R=Math.min(S,y,A);E>.9&&R<.1&&(S<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),A<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function d(M,S){const y=M*3;S.x=e[y+0],S.y=e[y+1],S.z=e[y+2]}function g(){const M=new I,S=new I,y=new I,A=new I,E=new Q,R=new Q,v=new Q;for(let w=0,L=0;w<r.length;w+=9,L+=6){M.set(r[w+0],r[w+1],r[w+2]),S.set(r[w+3],r[w+4],r[w+5]),y.set(r[w+6],r[w+7],r[w+8]),E.set(a[L+0],a[L+1]),R.set(a[L+2],a[L+3]),v.set(a[L+4],a[L+5]),A.copy(M).add(S).add(y).divideScalar(3);const U=m(A);_(E,L+0,M,U),_(R,L+2,S,U),_(v,L+4,y,U)}}function _(M,S,y,A){A<0&&M.x===1&&(a[S]=M.x-1),y.x===0&&y.z===0&&(a[S]=A/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.vertices,e.indices,e.radius,e.detail)}}class ql extends Xl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ql(e.radius,e.detail)}}class Kn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){nt("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new Q:new I);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,s=[],r=[],a=[],c=new I,o=new Ut;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();const g=Math.acos(pt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(o.makeRotationAxis(c,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(pt(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Yl extends Kn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new Q){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=o-this.aX,d=l-this.aY;o=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Qf extends Yl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Zl(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,h,f){let u=(a-r)/l-(c-r)/(l+h)+(c-a)/h,d=(c-a)/h-(o-a)/(h+f)+(o-c)/f;u*=h,d*=h,s(a,c,u,d)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const zc=new I,kc=new I,xo=new Zl,yo=new Zl,Mo=new Zl;class iu extends Kn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new I){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,h;this.closed||c>0?l=s[(c-1)%r]:(kc.subVectors(s[0],s[1]).add(s[0]),l=kc);const f=s[c%r],u=s[(c+1)%r];if(this.closed||c+2<r?h=s[(c+2)%r]:(zc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=zc),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),xo.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,g,_,m),yo.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,g,_,m),Mo.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(xo.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),yo.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Mo.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(xo.calc(o),yo.calc(o),Mo.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Vc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function ed(i,e){const t=1-i;return t*t*e}function td(i,e){return 2*(1-i)*i*e}function nd(i,e){return i*i*e}function vr(i,e,t,n){return ed(i,e)+td(i,t)+nd(i,n)}function id(i,e){const t=1-i;return t*t*t*e}function sd(i,e){const t=1-i;return 3*t*t*i*e}function rd(i,e){return 3*(1-i)*i*i*e}function ad(i,e){return i*i*i*e}function xr(i,e,t,n,s){return id(i,e)+sd(i,t)+rd(i,n)+ad(i,s)}class su extends Kn{constructor(e=new Q,t=new Q,n=new Q,s=new Q){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Q){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(xr(e,s.x,r.x,a.x,c.x),xr(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class od extends Kn{constructor(e=new I,t=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(xr(e,s.x,r.x,a.x,c.x),xr(e,s.y,r.y,a.y,c.y),xr(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ru extends Kn{constructor(e=new Q,t=new Q){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Q){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ld extends Kn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class au extends Kn{constructor(e=new Q,t=new Q,n=new Q){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Q){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(vr(e,s.x,r.x,a.x),vr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kl extends Kn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(vr(e,s.x,r.x,a.x),vr(e,s.y,r.y,a.y),vr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ou extends Kn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Q){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Vc(c,o.x,l.x,h.x,f.x),Vc(c,o.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new Q().fromArray(s))}return this}}var Da=Object.freeze({__proto__:null,ArcCurve:Qf,CatmullRomCurve3:iu,CubicBezierCurve:su,CubicBezierCurve3:od,EllipseCurve:Yl,LineCurve:ru,LineCurve3:ld,QuadraticBezierCurve:au,QuadraticBezierCurve3:Kl,SplineCurve:ou});class cd extends Kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Da[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const h=o[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Da[s.type]().fromJSON(s))}return this}}class Hc extends cd{constructor(e){super(),this.type="Path",this.currentPoint=new Q,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ru(this.currentPoint.clone(),new Q(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new au(this.currentPoint.clone(),new Q(e,t),new Q(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new su(this.currentPoint.clone(),new Q(e,t),new Q(n,s),new Q(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new ou(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new Yl(e,t,n,s,r,a,c,o);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class dr extends Hc{constructor(e){super(e),this.uuid=Si(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Hc().fromJSON(s))}return this}}function hd(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=lu(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=md(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let h=c,f=o;for(let u=t;u<s;u+=t){const d=i[u],g=i[u+1];d<c&&(c=d),g<o&&(o=g),d>h&&(h=d),g>f&&(f=g)}l=Math.max(h-c,f-o),l=l!==0?32767/l:0}return Er(r,a,t,c,o,l,0),a}function lu(i,e,t,n,s){let r;if(s===Td(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Gc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Gc(a/n|0,i[a],i[a+1],r);return r&&Hs(r,r.next)&&(Tr(r),r=r.next),r}function rs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Hs(t,t.next)||Kt(t.prev,t,t.next)===0)){if(Tr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Er(i,e,t,n,s,r,a){if(!i)return;!a&&r&&yd(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?fd(i,n,s,r):ud(i)){e.push(o.i,i.i,l.i),Tr(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=dd(rs(i),e),Er(i,e,t,n,s,r,2)):a===2&&pd(i,e,t,n,s,r):Er(rs(i),e,t,n,s,r,1);break}}}function ud(i){const e=i.prev,t=i,n=i.next;if(Kt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,h=Math.min(s,r,a),f=Math.min(c,o,l),u=Math.max(s,r,a),d=Math.max(c,o,l);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&pr(s,c,r,o,a,l,g.x,g.y)&&Kt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function fd(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Kt(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(c,o,l),g=Math.min(h,f,u),_=Math.max(c,o,l),m=Math.max(h,f,u),p=bl(d,g,e,t,n),M=bl(_,m,e,t,n);let S=i.prevZ,y=i.nextZ;for(;S&&S.z>=p&&y&&y.z<=M;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&pr(c,h,o,f,l,u,S.x,S.y)&&Kt(S.prev,S,S.next)>=0||(S=S.prevZ,y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&pr(c,h,o,f,l,u,y.x,y.y)&&Kt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&pr(c,h,o,f,l,u,S.x,S.y)&&Kt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;y&&y.z<=M;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&pr(c,h,o,f,l,u,y.x,y.y)&&Kt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function dd(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Hs(n,s)&&hu(n,t,t.next,s)&&wr(n,s)&&wr(s,n)&&(e.push(n.i,t.i,s.i),Tr(t),Tr(t.next),t=i=s),t=t.next}while(t!==i);return rs(t)}function pd(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&bd(a,c)){let o=uu(a,c);a=rs(a,a.next),o=rs(o,o.next),Er(a,e,t,n,s,r,0),Er(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function md(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=lu(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(Sd(l))}s.sort(gd);for(let r=0;r<s.length;r++)t=_d(s[r],t);return t}function gd(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function _d(i,e){const t=vd(i,e);if(!t)return e;const n=uu(t,i);return rs(n,n.next),rs(t,t.next)}function vd(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Hs(i,t))return t;do{if(Hs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&cu(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const f=Math.abs(s-t.y)/(n-t.x);wr(t,i)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&xd(a,t)))&&(a=t,h=f)}t=t.next}while(t!==c);return a}function xd(i,e){return Kt(i.prev,i,e.prev)<0&&Kt(e.next,i,i.next)<0}function yd(i,e,t,n){let s=i;do s.z===0&&(s.z=bl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Md(s)}function Md(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function bl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Sd(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function cu(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function pr(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&cu(i,e,t,n,s,r,a,c)}function bd(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Ed(i,e)&&(wr(i,e)&&wr(e,i)&&wd(i,e)&&(Kt(i.prev,i,e.prev)||Kt(i,e.prev,e))||Hs(i,e)&&Kt(i.prev,i,i.next)>0&&Kt(e.prev,e,e.next)>0)}function Kt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Hs(i,e){return i.x===e.x&&i.y===e.y}function hu(i,e,t,n){const s=oa(Kt(i,e,t)),r=oa(Kt(i,e,n)),a=oa(Kt(t,n,i)),c=oa(Kt(t,n,e));return!!(s!==r&&a!==c||s===0&&aa(i,t,e)||r===0&&aa(i,n,e)||a===0&&aa(t,i,n)||c===0&&aa(t,e,n))}function aa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function oa(i){return i>0?1:i<0?-1:0}function Ed(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&hu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function wr(i,e){return Kt(i.prev,i,i.next)<0?Kt(i,e,i.next)>=0&&Kt(i,i.prev,e)>=0:Kt(i,e,i.prev)<0||Kt(i,i.next,e)<0}function wd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function uu(i,e){const t=El(i.i,i.x,i.y),n=El(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Gc(i,e,t,n){const s=El(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Tr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function El(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Td(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Ad{static triangulate(e,t,n=2){return hd(e,t,n)}}class Ls{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Ls.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Wc(e),Xc(n,e);let a=e.length;t.forEach(Wc);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,Xc(n,t[o]);const c=Ad.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function Wc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Xc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Is extends nn{constructor(e=new dr([new Q(.5,.5),new Q(-.5,.5),new Q(-.5,-.5),new Q(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new Mt(s,3)),this.setAttribute("uv",new Mt(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Rd;let S,y=!1,A,E,R,v;if(p){S=p.getSpacedPoints(h),y=!0,u=!1;const he=p.isCatmullRomCurve3?p.closed:!1;A=p.computeFrenetFrames(h,he),E=new I,R=new I,v=new I}u||(m=0,d=0,g=0,_=0);const w=c.extractPoints(l);let L=w.shape;const U=w.holes;if(!Ls.isClockWise(L)){L=L.reverse();for(let he=0,me=U.length;he<me;he++){const ge=U[he];Ls.isClockWise(ge)&&(U[he]=ge.reverse())}}function q(he){const ge=10000000000000001e-36;let Te=he[0];for(let Me=1;Me<=he.length;Me++){const Ke=Me%he.length,ze=he[Ke],Qe=ze.x-Te.x,rt=ze.y-Te.y,B=Qe*Qe+rt*rt,Tt=Math.max(Math.abs(ze.x),Math.abs(ze.y),Math.abs(Te.x),Math.abs(Te.y)),gt=ge*Tt*Tt;if(B<=gt){he.splice(Ke,1),Me--;continue}Te=ze}}q(L),U.forEach(q);const J=U.length,k=L;for(let he=0;he<J;he++){const me=U[he];L=L.concat(me)}function $(he,me,ge){return me||yt("ExtrudeGeometry: vec does not exist"),he.clone().addScaledVector(me,ge)}const F=L.length;function X(he,me,ge){let Te,Me,Ke;const ze=he.x-me.x,Qe=he.y-me.y,rt=ge.x-he.x,B=ge.y-he.y,Tt=ze*ze+Qe*Qe,gt=ze*B-Qe*rt;if(Math.abs(gt)>Number.EPSILON){const C=Math.sqrt(Tt),x=Math.sqrt(rt*rt+B*B),W=me.x-Qe/C,Z=me.y+ze/C,ne=ge.x-B/x,le=ge.y+rt/x,ye=((ne-W)*B-(le-Z)*rt)/(ze*B-Qe*rt);Te=W+ze*ye-he.x,Me=Z+Qe*ye-he.y;const te=Te*Te+Me*Me;if(te<=2)return new Q(Te,Me);Ke=Math.sqrt(te/2)}else{let C=!1;ze>Number.EPSILON?rt>Number.EPSILON&&(C=!0):ze<-Number.EPSILON?rt<-Number.EPSILON&&(C=!0):Math.sign(Qe)===Math.sign(B)&&(C=!0),C?(Te=-Qe,Me=ze,Ke=Math.sqrt(Tt)):(Te=ze,Me=Qe,Ke=Math.sqrt(Tt/2))}return new Q(Te/Ke,Me/Ke)}const se=[];for(let he=0,me=k.length,ge=me-1,Te=he+1;he<me;he++,ge++,Te++)ge===me&&(ge=0),Te===me&&(Te=0),se[he]=X(k[he],k[ge],k[Te]);const fe=[];let de,ve=se.concat();for(let he=0,me=J;he<me;he++){const ge=U[he];de=[];for(let Te=0,Me=ge.length,Ke=Me-1,ze=Te+1;Te<Me;Te++,Ke++,ze++)Ke===Me&&(Ke=0),ze===Me&&(ze=0),de[Te]=X(ge[Te],ge[Ke],ge[ze]);fe.push(de),ve=ve.concat(de)}let Je;if(m===0)Je=Ls.triangulateShape(k,U);else{const he=[],me=[];for(let ge=0;ge<m;ge++){const Te=ge/m,Me=d*Math.cos(Te*Math.PI/2),Ke=g*Math.sin(Te*Math.PI/2)+_;for(let ze=0,Qe=k.length;ze<Qe;ze++){const rt=$(k[ze],se[ze],Ke);Le(rt.x,rt.y,-Me),Te===0&&he.push(rt)}for(let ze=0,Qe=J;ze<Qe;ze++){const rt=U[ze];de=fe[ze];const B=[];for(let Tt=0,gt=rt.length;Tt<gt;Tt++){const C=$(rt[Tt],de[Tt],Ke);Le(C.x,C.y,-Me),Te===0&&B.push(C)}Te===0&&me.push(B)}}Je=Ls.triangulateShape(he,me)}const St=Je.length,it=g+_;for(let he=0;he<F;he++){const me=u?$(L[he],ve[he],it):L[he];y?(R.copy(A.normals[0]).multiplyScalar(me.x),E.copy(A.binormals[0]).multiplyScalar(me.y),v.copy(S[0]).add(R).add(E),Le(v.x,v.y,v.z)):Le(me.x,me.y,0)}for(let he=1;he<=h;he++)for(let me=0;me<F;me++){const ge=u?$(L[me],ve[me],it):L[me];y?(R.copy(A.normals[he]).multiplyScalar(ge.x),E.copy(A.binormals[he]).multiplyScalar(ge.y),v.copy(S[he]).add(R).add(E),Le(v.x,v.y,v.z)):Le(ge.x,ge.y,f/h*he)}for(let he=m-1;he>=0;he--){const me=he/m,ge=d*Math.cos(me*Math.PI/2),Te=g*Math.sin(me*Math.PI/2)+_;for(let Me=0,Ke=k.length;Me<Ke;Me++){const ze=$(k[Me],se[Me],Te);Le(ze.x,ze.y,f+ge)}for(let Me=0,Ke=U.length;Me<Ke;Me++){const ze=U[Me];de=fe[Me];for(let Qe=0,rt=ze.length;Qe<rt;Qe++){const B=$(ze[Qe],de[Qe],Te);y?Le(B.x,B.y+S[h-1].y,S[h-1].x+ge):Le(B.x,B.y,f+ge)}}}re(),_e();function re(){const he=s.length/3;if(u){let me=0,ge=F*me;for(let Te=0;Te<St;Te++){const Me=Je[Te];Ye(Me[2]+ge,Me[1]+ge,Me[0]+ge)}me=h+m*2,ge=F*me;for(let Te=0;Te<St;Te++){const Me=Je[Te];Ye(Me[0]+ge,Me[1]+ge,Me[2]+ge)}}else{for(let me=0;me<St;me++){const ge=Je[me];Ye(ge[2],ge[1],ge[0])}for(let me=0;me<St;me++){const ge=Je[me];Ye(ge[0]+F*h,ge[1]+F*h,ge[2]+F*h)}}n.addGroup(he,s.length/3-he,0)}function _e(){const he=s.length/3;let me=0;ce(k,me),me+=k.length;for(let ge=0,Te=U.length;ge<Te;ge++){const Me=U[ge];ce(Me,me),me+=Me.length}n.addGroup(he,s.length/3-he,1)}function ce(he,me){let ge=he.length;for(;--ge>=0;){const Te=ge;let Me=ge-1;Me<0&&(Me=he.length-1);for(let Ke=0,ze=h+m*2;Ke<ze;Ke++){const Qe=F*Ke,rt=F*(Ke+1),B=me+Te+Qe,Tt=me+Me+Qe,gt=me+Me+rt,C=me+Te+rt;He(B,Tt,gt,C)}}}function Le(he,me,ge){o.push(he),o.push(me),o.push(ge)}function Ye(he,me,ge){vt(he),vt(me),vt(ge);const Te=s.length/3,Me=M.generateTopUV(n,s,Te-3,Te-2,Te-1);je(Me[0]),je(Me[1]),je(Me[2])}function He(he,me,ge,Te){vt(he),vt(me),vt(Te),vt(me),vt(ge),vt(Te);const Me=s.length/3,Ke=M.generateSideWallUV(n,s,Me-6,Me-3,Me-2,Me-1);je(Ke[0]),je(Ke[1]),je(Ke[3]),je(Ke[1]),je(Ke[2]),je(Ke[3])}function vt(he){s.push(o[he*3+0]),s.push(o[he*3+1]),s.push(o[he*3+2])}function je(he){r.push(he.x),r.push(he.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Cd(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Da[s.type]().fromJSON(s)),new Is(n,e.options)}}const Rd={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new Q(r,a),new Q(c,o),new Q(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[s*3],d=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(c-h)<Math.abs(a-l)?[new Q(a,1-o),new Q(l,1-f),new Q(u,1-g),new Q(_,1-p)]:[new Q(c,1-o),new Q(h,1-f),new Q(d,1-g),new Q(m,1-p)]}};function Cd(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class _i extends nn{constructor(e=[new Q(0,-.5),new Q(.5,0),new Q(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=pt(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],h=1/t,f=new I,u=new Q,d=new I,g=new I,_=new I;let m=0,p=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(_.x,_.y,_.z);break;default:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),o.push(d.x,d.y,d.z),_.copy(g)}for(let M=0;M<=t;M++){const S=n+M*h*s,y=Math.sin(S),A=Math.cos(S);for(let E=0;E<=e.length-1;E++){f.x=e[E].x*y,f.y=e[E].y,f.z=e[E].x*A,a.push(f.x,f.y,f.z),u.x=M/t,u.y=E/(e.length-1),c.push(u.x,u.y);const R=o[3*E+0]*y,v=o[3*E+1],w=o[3*E+0]*A;l.push(R,v,w)}}for(let M=0;M<t;M++)for(let S=0;S<e.length-1;S++){const y=S+M*e.length,A=y,E=y+e.length,R=y+e.length+1,v=y+1;r.push(A,E,v),r.push(R,v,E)}this.setIndex(r),this.setAttribute("position",new Mt(a,3)),this.setAttribute("uv",new Mt(c,2)),this.setAttribute("normal",new Mt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.points,e.segments,e.phiStart,e.phiLength)}}class Zn extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,h=o+1,f=e/c,u=t/o,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*u-a;for(let S=0;S<l;S++){const y=S*f-r;g.push(y,-M,0),_.push(0,0,1),m.push(S/c),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let M=0;M<c;M++){const S=M+l*p,y=M+l*(p+1),A=M+1+l*(p+1),E=M+1+l*p;d.push(S,y,E),d.push(y,A,E)}this.setIndex(d),this.setAttribute("position",new Mt(g,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.width,e.height,e.widthSegments,e.heightSegments)}}class fu extends nn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],h=[];let f=e;const u=(t-e)/s,d=new I,g=new Q;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=f*Math.cos(p),d.y=f*Math.sin(p),o.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,h.push(g.x,g.y)}f+=u}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,S=M,y=M+n+1,A=M+n+2,E=M+1;c.push(S,y,E),c.push(y,A,E)}}this.setIndex(c),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class qt extends nn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const h=[],f=new I,u=new I,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],S=p/n,y=a+S*c,A=e*Math.cos(y),E=Math.sqrt(e*e-A*A);let R=0;p===0&&a===0?R=.5/t:p===n&&o===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){const w=v/t,L=s+w*r;f.x=-E*Math.cos(L),f.y=A,f.z=E*Math.sin(L),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(w+R,1-S),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const S=h[p][M+1],y=h[p][M],A=h[p+1][M],E=h[p+1][M+1];(p!==0||a>0)&&d.push(S,y,E),(p!==n-1||o<Math.PI)&&d.push(y,A,E)}this.setIndex(d),this.setAttribute("position",new Mt(g,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Xt extends nn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],h=[],f=[],u=new I,d=new I,g=new I;for(let _=0;_<=n;_++){const m=a+_/n*c;for(let p=0;p<=s;p++){const M=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(M),d.y=(e+t*Math.cos(m))*Math.sin(M),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(p/s),f.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const p=(s+1)*_+m-1,M=(s+1)*(_-1)+m-1,S=(s+1)*(_-1)+m,y=(s+1)*_+m;o.push(p,M,y),o.push(M,S,y)}this.setIndex(o),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ts extends nn{constructor(e=new Kl(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new I,o=new I,l=new Q;let h=new I;const f=[],u=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Mt(f,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2));function _(){for(let S=0;S<t;S++)m(S);m(r===!1?t:0),M(),p()}function m(S){h=e.getPointAt(S/t,h);const y=a.normals[S],A=a.binormals[S];for(let E=0;E<=s;E++){const R=E/s*Math.PI*2,v=Math.sin(R),w=-Math.cos(R);o.x=w*y.x+v*A.x,o.y=w*y.y+v*A.y,o.z=w*y.z+v*A.z,o.normalize(),u.push(o.x,o.y,o.z),c.x=h.x+n*o.x,c.y=h.y+n*o.y,c.z=h.z+n*o.z,f.push(c.x,c.y,c.z)}}function p(){for(let S=1;S<=t;S++)for(let y=1;y<=s;y++){const A=(s+1)*(S-1)+(y-1),E=(s+1)*S+(y-1),R=(s+1)*S+y,v=(s+1)*(S-1)+y;g.push(A,E,v),g.push(E,R,v)}}function M(){for(let S=0;S<=t;S++)for(let y=0;y<=s;y++)l.x=S/t,l.y=y/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ts(new Da[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Gs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(qc(s))s.isRenderTargetTexture?(nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(qc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function yn(i){const e={};for(let t=0;t<i.length;t++){const n=Gs(i[t]);for(const s in n)e[s]=n[s]}return e}function qc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Pd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function du(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:wt.workingColorSpace}const Dd={clone:Gs,merge:yn};var Ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Id=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends Vi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ld,this.fragmentShader=Id,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Gs(e.uniforms),this.uniformsGroups=Pd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ht().setHex(s.value);break;case"v2":this.uniforms[n].value=new Q().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ut().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Nd extends hi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class pe extends Vi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ba,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ar extends pe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Q(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Ud extends Vi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ba,this.normalScale=new Q(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=Dl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fd extends Vi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=df,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Od extends Vi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Mx extends eu{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class $l extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ht(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class pu extends $l{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ht(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const So=new Ut,Yc=new I,Zc=new I;class mu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Q(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wl,this._frameExtents=new Q(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yc),Zc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zc),t.updateMatrixWorld(),So.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(So,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Sr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(So)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const la=new I,ca=new Ti,ei=new I;class gu extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(la,ca,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(la,ca,ei.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(la,ca,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(la,ca,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new I,Kc=new Q,$c=new Q;class Rn extends gu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Sl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sl*2*Math.atan(Math.tan(xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,Kc,$c),t.subVectors($c,Kc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Bd extends mu{constructor(){super(new Rn(90,1,.5,500)),this.isPointLightShadow=!0}}class zd extends $l{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Bd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Jl extends gu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=h*this.view.offsetY,o=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class kd extends mu{constructor(){super(new Jl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class La extends $l{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new kd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ts=-90,As=1;class Vd extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rn(Ts,As,e,t);s.layers=this.layers,this.add(s);const r=new Rn(Ts,As,e,t);r.layers=this.layers,this.add(r);const a=new Rn(Ts,As,e,t);a.layers=this.layers,this.add(a);const c=new Rn(Ts,As,e,t);c.layers=this.layers,this.add(c);const o=new Rn(Ts,As,e,t);o.layers=this.layers,this.add(o);const l=new Rn(Ts,As,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===ai)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Hd extends Rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Gd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Wd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Wd(){this._document.hidden===!1&&this.reset()}const Jc=new Ut;class Xd{constructor(e,t,n=0,s=1/0){this.ray=new Oa(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Gl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):yt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Jc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jc),this}intersectObject(e,t=!0,n=[]){return wl(e,this,n,t),n.sort(jc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)wl(e[s],this,n,t);return n.sort(jc),n}}function jc(i,e){return i.distance-e.distance}function wl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)wl(r[a],e,t,!0)}}class Qc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=pt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const sc=class sc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};sc.prototype.isMatrix2=!0;let eh=sc;class qd extends ki{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){nt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function th(i,e,t,n){const s=Yd(n);switch(t){case Wh:return i*e;case Fl:return i*e/s.components*s.byteLength;case Ol:return i*e/s.components*s.byteLength;case is:return i*e*2/s.components*s.byteLength;case Bl:return i*e*2/s.components*s.byteLength;case Xh:return i*e*3/s.components*s.byteLength;case Yn:return i*e*4/s.components*s.byteLength;case zl:return i*e*4/s.components*s.byteLength;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case _a:case va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qo:case Zo:return Math.max(i,16)*Math.max(e,8)/4;case Xo:case Yo:return Math.max(i,8)*Math.max(e,8)/2;case Ko:case $o:case jo:case Qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Jo:case Ma:case el:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case nl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case il:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case rl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case al:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ll:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ul:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case pl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ml:case gl:case _l:return Math.ceil(i/4)*Math.ceil(e/4)*16;case vl:case xl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Sa:case yl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yd(i){switch(i){case Cn:case kh:return{byteLength:1,components:1};case yr:case Vh:case Ei:return{byteLength:2,components:1};case Nl:case Ul:return{byteLength:2,components:4};case ci:case Il:case qn:return{byteLength:4,components:1};case Hh:case Gh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pl}}));typeof window<"u"&&(window.__THREE__?nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function _u(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Zd(i){const e=new WeakMap;function t(c,o){const l=c.array,h=c.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(o,u),i.bufferData(o,l,h),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:f}}function n(c,o,l){const h=o.array,f=o.updateRanges;if(i.bindBuffer(l,c),f.length===0)i.bufferSubData(l,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var Kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$d=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Mp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Np=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Vp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Zp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$p=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,n0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,i0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,r0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,a0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,l0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,c0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,f0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,d0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,p0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,m0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,v0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,x0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,y0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,S0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,E0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,w0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,T0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,R0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,C0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,P0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,D0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,I0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,N0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,U0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,F0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,O0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,B0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,z0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,k0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,V0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,H0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,G0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,W0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,X0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Z0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const K0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,em=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,nm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,im=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_m=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ym=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Em=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Am=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mt={alphahash_fragment:Kd,alphahash_pars_fragment:$d,alphamap_fragment:Jd,alphamap_pars_fragment:jd,alphatest_fragment:Qd,alphatest_pars_fragment:ep,aomap_fragment:tp,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:ap,bsdfs:op,iridescence_fragment:lp,bumpmap_pars_fragment:cp,clipping_planes_fragment:hp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:fp,clipping_planes_vertex:dp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:_p,common:vp,cube_uv_reflection_fragment:xp,defaultnormal_vertex:yp,displacementmap_pars_vertex:Mp,displacementmap_vertex:Sp,emissivemap_fragment:bp,emissivemap_pars_fragment:Ep,colorspace_fragment:wp,colorspace_pars_fragment:Tp,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Cp,envmap_pars_vertex:Pp,envmap_physical_pars_fragment:Vp,envmap_vertex:Dp,fog_vertex:Lp,fog_pars_vertex:Ip,fog_fragment:Np,fog_pars_fragment:Up,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:zp,lights_pars_begin:kp,lights_toon_fragment:Hp,lights_toon_pars_fragment:Gp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:Zp,lights_fragment_maps:Kp,lights_fragment_end:$p,lightprobes_pars_fragment:Jp,logdepthbuf_fragment:jp,logdepthbuf_pars_fragment:Qp,logdepthbuf_pars_vertex:e0,logdepthbuf_vertex:t0,map_fragment:n0,map_pars_fragment:i0,map_particle_fragment:s0,map_particle_pars_fragment:r0,metalnessmap_fragment:a0,metalnessmap_pars_fragment:o0,morphinstance_vertex:l0,morphcolor_vertex:c0,morphnormal_vertex:h0,morphtarget_pars_vertex:u0,morphtarget_vertex:f0,normal_fragment_begin:d0,normal_fragment_maps:p0,normal_pars_fragment:m0,normal_pars_vertex:g0,normal_vertex:_0,normalmap_pars_fragment:v0,clearcoat_normal_fragment_begin:x0,clearcoat_normal_fragment_maps:y0,clearcoat_pars_fragment:M0,iridescence_pars_fragment:S0,opaque_fragment:b0,packing:E0,premultiplied_alpha_fragment:w0,project_vertex:T0,dithering_fragment:A0,dithering_pars_fragment:R0,roughnessmap_fragment:C0,roughnessmap_pars_fragment:P0,shadowmap_pars_fragment:D0,shadowmap_pars_vertex:L0,shadowmap_vertex:I0,shadowmask_pars_fragment:N0,skinbase_vertex:U0,skinning_pars_vertex:F0,skinning_vertex:O0,skinnormal_vertex:B0,specularmap_fragment:z0,specularmap_pars_fragment:k0,tonemapping_fragment:V0,tonemapping_pars_fragment:H0,transmission_fragment:G0,transmission_pars_fragment:W0,uv_pars_fragment:X0,uv_pars_vertex:q0,uv_vertex:Y0,worldpos_vertex:Z0,background_vert:K0,background_frag:$0,backgroundCube_vert:J0,backgroundCube_frag:j0,cube_vert:Q0,cube_frag:em,depth_vert:tm,depth_frag:nm,distance_vert:im,distance_frag:sm,equirect_vert:rm,equirect_frag:am,linedashed_vert:om,linedashed_frag:lm,meshbasic_vert:cm,meshbasic_frag:hm,meshlambert_vert:um,meshlambert_frag:fm,meshmatcap_vert:dm,meshmatcap_frag:pm,meshnormal_vert:mm,meshnormal_frag:gm,meshphong_vert:_m,meshphong_frag:vm,meshphysical_vert:xm,meshphysical_frag:ym,meshtoon_vert:Mm,meshtoon_frag:Sm,points_vert:bm,points_frag:Em,shadow_vert:wm,shadow_frag:Tm,sprite_vert:Am,sprite_frag:Rm},De={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new Q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},si={basic:{uniforms:yn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:yn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:yn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:yn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:yn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new ht(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:yn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:yn([De.points,De.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:yn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:yn([De.common,De.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:yn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:yn([De.sprite,De.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:yn([De.common,De.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:yn([De.lights,De.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};si.physical={uniforms:yn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const ha={r:0,b:0,g:0},Cm=new Ut,vu=new lt;vu.set(-1,0,0,0,1,0,0,0,1);function Pm(i,e,t,n,s,r){const a=new ht(0);let c=s===!0?0:1,o,l,h=null,f=0,u=null;function d(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){const y=M.backgroundBlurriness>0;S=e.get(S,y)}return S}function g(M){let S=!1;const y=d(M);y===null?m(a,c):y&&y.isColor&&(m(y,1),S=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,S){const y=d(S);y&&(y.isCubeTexture||y.mapping===Fa)?(l===void 0&&(l=new Ie(new Dt(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:Gs(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cm.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(vu),l.material.toneMapped=wt.getTransfer(y.colorSpace)!==Nt,(h!==y||f!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(o===void 0&&(o=new Ie(new Zn(2,2),new hi({name:"BackgroundMaterial",uniforms:Gs(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=y,o.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,o.material.toneMapped=wt.getTransfer(y.colorSpace)!==Nt,y.matrixAutoUpdate===!0&&y.updateMatrix(),o.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==i.toneMapping)&&(o.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function m(M,S){M.getRGB(ha,du(i)),t.buffers.color.setClear(ha.r,ha.g,ha.b,S,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,S=1){a.set(M),c=S,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,m(a,c)},render:g,addToRenderList:_,dispose:p}}function Dm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function c(U,z,q,J,k){let $=!1;const F=f(U,J,q,z);r!==F&&(r=F,l(r.object)),$=d(U,J,q,k),$&&g(U,J,q,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(U,z,q,J),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function o(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function f(U,z,q,J){const k=J.wireframe===!0;let $=n[z.id];$===void 0&&($={},n[z.id]=$);const F=U.isInstancedMesh===!0?U.id:0;let X=$[F];X===void 0&&(X={},$[F]=X);let se=X[q.id];se===void 0&&(se={},X[q.id]=se);let fe=se[k];return fe===void 0&&(fe=u(o()),se[k]=fe),fe}function u(U){const z=[],q=[],J=[];for(let k=0;k<t;k++)z[k]=0,q[k]=0,J[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:q,attributeDivisors:J,object:U,attributes:{},index:null}}function d(U,z,q,J){const k=r.attributes,$=z.attributes;let F=0;const X=q.getAttributes();for(const se in X)if(X[se].location>=0){const de=k[se];let ve=$[se];if(ve===void 0&&(se==="instanceMatrix"&&U.instanceMatrix&&(ve=U.instanceMatrix),se==="instanceColor"&&U.instanceColor&&(ve=U.instanceColor)),de===void 0||de.attribute!==ve||ve&&de.data!==ve.data)return!0;F++}return r.attributesNum!==F||r.index!==J}function g(U,z,q,J){const k={},$=z.attributes;let F=0;const X=q.getAttributes();for(const se in X)if(X[se].location>=0){let de=$[se];de===void 0&&(se==="instanceMatrix"&&U.instanceMatrix&&(de=U.instanceMatrix),se==="instanceColor"&&U.instanceColor&&(de=U.instanceColor));const ve={};ve.attribute=de,de&&de.data&&(ve.data=de.data),k[se]=ve,F++}r.attributes=k,r.attributesNum=F,r.index=J}function _(){const U=r.newAttributes;for(let z=0,q=U.length;z<q;z++)U[z]=0}function m(U){p(U,0)}function p(U,z){const q=r.newAttributes,J=r.enabledAttributes,k=r.attributeDivisors;q[U]=1,J[U]===0&&(i.enableVertexAttribArray(U),J[U]=1),k[U]!==z&&(i.vertexAttribDivisor(U,z),k[U]=z)}function M(){const U=r.newAttributes,z=r.enabledAttributes;for(let q=0,J=z.length;q<J;q++)z[q]!==U[q]&&(i.disableVertexAttribArray(q),z[q]=0)}function S(U,z,q,J,k,$,F){F===!0?i.vertexAttribIPointer(U,z,q,k,$):i.vertexAttribPointer(U,z,q,J,k,$)}function y(U,z,q,J){_();const k=J.attributes,$=q.getAttributes(),F=z.defaultAttributeValues;for(const X in $){const se=$[X];if(se.location>=0){let fe=k[X];if(fe===void 0&&(X==="instanceMatrix"&&U.instanceMatrix&&(fe=U.instanceMatrix),X==="instanceColor"&&U.instanceColor&&(fe=U.instanceColor)),fe!==void 0){const de=fe.normalized,ve=fe.itemSize,Je=e.get(fe);if(Je===void 0)continue;const St=Je.buffer,it=Je.type,re=Je.bytesPerElement,_e=it===i.INT||it===i.UNSIGNED_INT||fe.gpuType===Il;if(fe.isInterleavedBufferAttribute){const ce=fe.data,Le=ce.stride,Ye=fe.offset;if(ce.isInstancedInterleavedBuffer){for(let He=0;He<se.locationSize;He++)p(se.location+He,ce.meshPerAttribute);U.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let He=0;He<se.locationSize;He++)m(se.location+He);i.bindBuffer(i.ARRAY_BUFFER,St);for(let He=0;He<se.locationSize;He++)S(se.location+He,ve/se.locationSize,it,de,Le*re,(Ye+ve/se.locationSize*He)*re,_e)}else{if(fe.isInstancedBufferAttribute){for(let ce=0;ce<se.locationSize;ce++)p(se.location+ce,fe.meshPerAttribute);U.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ce=0;ce<se.locationSize;ce++)m(se.location+ce);i.bindBuffer(i.ARRAY_BUFFER,St);for(let ce=0;ce<se.locationSize;ce++)S(se.location+ce,ve/se.locationSize,it,de,ve*re,ve/se.locationSize*ce*re,_e)}}else if(F!==void 0){const de=F[X];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(se.location,de);break;case 3:i.vertexAttrib3fv(se.location,de);break;case 4:i.vertexAttrib4fv(se.location,de);break;default:i.vertexAttrib1fv(se.location,de)}}}}M()}function A(){w();for(const U in n){const z=n[U];for(const q in z){const J=z[q];for(const k in J){const $=J[k];for(const F in $)h($[F].object),delete $[F];delete J[k]}}delete n[U]}}function E(U){if(n[U.id]===void 0)return;const z=n[U.id];for(const q in z){const J=z[q];for(const k in J){const $=J[k];for(const F in $)h($[F].object),delete $[F];delete J[k]}}delete n[U.id]}function R(U){for(const z in n){const q=n[z];for(const J in q){const k=q[J];if(k[U.id]===void 0)continue;const $=k[U.id];for(const F in $)h($[F].object),delete $[F];delete k[U.id]}}}function v(U){for(const z in n){const q=n[z],J=U.isInstancedMesh===!0?U.id:0,k=q[J];if(k!==void 0){for(const $ in k){const F=k[$];for(const X in F)h(F[X].object),delete F[X];delete k[$]}delete q[J],Object.keys(q).length===0&&delete n[z]}}}function w(){L(),a=!0,r!==s&&(r=s,l(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:w,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Lm(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,h){h!==0&&(i.drawArraysInstanced(n,o,l,h),t.update(l,n,h))}function c(o,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function Im(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Yn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const v=R===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Cn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==qn&&!v)}function o(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=o(l);h!==l&&(nt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:y,maxSamples:A,samples:E}}function Nm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new vi,c=new lt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,S=M*4;let y=p.clippingState||null;o.value=y,y=h(g,u,S,d);for(let A=0;A!==S;++A)y[A]=t[A];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const p=d+_*4,M=u.matrixWorldInverse;c.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,y=d;S!==_;++S,y+=4)a.copy(f[S]).applyMatrix4(M,c),a.normal.toArray(m,y),m[y+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Bi=4,nh=[.125,.215,.35,.446,.526,.582],ji=20,Um=256,lr=new Jl,ih=new ht;let bo=null,Eo=0,wo=0,To=!1;const Fm=new I;class Tl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=Fm}=r;bo=this._renderer.getRenderTarget(),Eo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),To=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ah(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bo,Eo,wo),this._renderer.xr.enabled=To,e.scissorTest=!1,Rs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===ks?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bo=this._renderer.getRenderTarget(),Eo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),To=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Ei,format:Yn,colorSpace:Ea,depthBuffer:!1},s=sh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Om(r)),this._blurMaterial=zm(r,e,t),this._ggxMaterial=Bm(r,e,t)}return s}_compileMaterial(e){const t=new Ie(new nn,e);this._renderer.compile(t,lr)}_sceneToCubeUV(e,t,n,s,r){const o=new Rn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(ih),f.toneMapping=oi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ie(new Dt,new ss({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(ih),p=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+h[S],r.y,r.z)):y===1?(o.up.set(0,0,l[S]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+h[S],r.z)):(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+h[S]));const A=this._cubeSize;Rs(s,y*A,S>2?A:0,A,A),f.setRenderTarget(s),p&&f.render(_,o),f.render(e,o)}f.toneMapping=d,f.autoClear=u,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ns||e.mapping===ks;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ah()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;Rs(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,lr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=0+l*1.25,d=f*u,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Bi?n-g+Bi:0),p=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=d,o.mipInt.value=g-t,Rs(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(c,lr),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,Rs(e,m,p,3*_,2*_),s.setRenderTarget(e),s.render(c,lr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&yt("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[s];f.material=l;const u=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ji-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ji;m>ji&&nt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ji}`);const p=[];let M=0;for(let R=0;R<ji;++R){const v=R/_,w=Math.exp(-v*v/2);p.push(w),R===0?M+=w:R<m&&(M+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",c&&(u.poleAxis.value=c);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-n;const y=this._sizeLods[s],A=3*y*(s>S-Bi?s-S+Bi:0),E=4*(this._cubeSize-y);Rs(t,A,E,3*y,2*y),o.setRenderTarget(t),o.render(f,lr)}}function Om(i){const e=[],t=[],n=[];let s=i;const r=i-Bi+1+nh.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-Bi?o=nh[a-i+Bi-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),S=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let E=0;E<d;E++){const R=E%3*2/3-1,v=E>2?0:-1,w=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];M.set(w,_*g*E),S.set(u,m*g*E);const L=[E,E,E,E,E,E];y.set(L,p*g*E)}const A=new nn;A.setAttribute("position",new On(M,_)),A.setAttribute("uv",new On(S,m)),A.setAttribute("faceIndex",new On(y,p)),n.push(new Ie(A,null)),s>Bi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function sh(i,e,t){const n=new li(i,e,t);return n.texture.mapping=Fa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Bm(i,e,t){return new hi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Um,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ba(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function zm(i,e,t){const n=new Float32Array(ji),s=new I(0,1,0);return new hi({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function rh(){return new hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function ah(){return new hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Ba(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class xu extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new tu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Dt(5,5,5),r=new hi({name:"CubemapFromEquirect",uniforms:Gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:yi});r.uniforms.tEquirect.value=t;const a=new Ie(s,r),c=t.minFilter;return t.minFilter===Qi&&(t.minFilter=gn),new Vd(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function km(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===Wa||d===Xa)if(e.has(u)){const g=e.get(u).texture;return c(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const _=new xu(g.height);return _.fromEquirectangularTexture(i,u),e.set(u,_),u.addEventListener("dispose",l),c(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,g=d===Wa||d===Xa,_=d===ns||d===ks;if(g||_){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Tl(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||_&&M&&o(M)?(n===null&&(n=new Tl(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function c(u,d){return d===Wa?u.mapping=ns:d===Xa&&(u.mapping=ks),u}function o(u){let d=0;const g=6;for(let _=0;_<g;_++)u[_]!==void 0&&d++;return d===g}function l(u){const d=u.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Vm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Fs("WebGLRenderer: "+n+" extension not supported."),s}}}function Hm(i,e,t,n){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const d=r.get(u);d&&(e.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function c(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function o(f){const u=f.attributes;for(const d in u)e.update(u[d],i.ARRAY_BUFFER)}function l(f){const u=[],d=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const M=d.array;_=d.version;for(let S=0,y=M.length;S<y;S+=3){const A=M[S+0],E=M[S+1],R=M[S+2];u.push(A,E,E,R,R,A)}}else{const M=g.array;_=g.version;for(let S=0,y=M.length/3-1;S<y;S+=3){const A=S+0,E=S+1,R=S+2;u.push(A,E,E,R,R,A)}}const m=new(g.count>=65535?Jh:$h)(u,1);m.version=_;const p=r.get(f);p&&e.remove(p),r.set(f,m)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:c,update:o,getWireframeAttribute:h}}function Gm(i,e,t){let n;function s(f){n=f}let r,a;function c(f){r=f.type,a=f.bytesPerElement}function o(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=u[m];t.update(_,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=h}function Wm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:yt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Xm(i,e,t){const n=new WeakMap,s=new Zt;function r(a,c,o){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(c);if(u===void 0||u.count!==f){let w=function(){R.dispose(),n.delete(c),c.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();const d=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let S=0;d===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let y=c.attributes.position.count*S,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*A*4*f),R=new Yh(E,y,A,f);R.type=qn,R.needsUpdate=!0;const v=S*4;for(let L=0;L<f;L++){const U=m[L],z=p[L],q=M[L],J=y*A*4*L;for(let k=0;k<U.count;k++){const $=k*v;d===!0&&(s.fromBufferAttribute(U,k),E[J+$+0]=s.x,E[J+$+1]=s.y,E[J+$+2]=s.z,E[J+$+3]=0),g===!0&&(s.fromBufferAttribute(z,k),E[J+$+4]=s.x,E[J+$+5]=s.y,E[J+$+6]=s.z,E[J+$+7]=0),_===!0&&(s.fromBufferAttribute(q,k),E[J+$+8]=s.x,E[J+$+9]=s.y,E[J+$+10]=s.z,E[J+$+11]=q.itemSize===4?s.w:1)}}u={count:f,texture:R,size:new Q(y,A)},n.set(c,u),c.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=c.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function qm(i,e,t,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function c(){r=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const Ym={[Ih]:"LINEAR_TONE_MAPPING",[Nh]:"REINHARD_TONE_MAPPING",[Uh]:"CINEON_TONE_MAPPING",[Ll]:"ACES_FILMIC_TONE_MAPPING",[Oh]:"AGX_TONE_MAPPING",[Bh]:"NEUTRAL_TONE_MAPPING",[Fh]:"CUSTOM_TONE_MAPPING"};function Zm(i,e,t,n,s,r){const a=new li(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Vs(e,t):void 0}),c=new li(e,t,{type:Ei,depthBuffer:!1,stencilBuffer:!1}),o=new nn;o.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Mt([0,2,0,0,2,0],2));const l=new Nd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Ie(o,l),f=new Jl(-1,1,1,-1,0,1);let u=null,d=null,g=!1,_,m=null,p=[],M=!1;this.setSize=function(S,y){a.setSize(S,y),c.setSize(S,y);for(let A=0;A<p.length;A++){const E=p[A];E.setSize&&E.setSize(S,y)}},this.setEffects=function(S){p=S,M=p.length>0&&p[0].isRenderPass===!0;const y=a.width,A=a.height;for(let E=0;E<p.length;E++){const R=p[E];R.setSize&&R.setSize(y,A)}},this.begin=function(S,y){if(g||S.toneMapping===oi&&p.length===0)return!1;if(m=y,y!==null){const A=y.width,E=y.height;(a.width!==A||a.height!==E)&&this.setSize(A,E)}return M===!1&&S.setRenderTarget(a),_=S.toneMapping,S.toneMapping=oi,!0},this.hasRenderPass=function(){return M},this.end=function(S,y){S.toneMapping=_,g=!0;let A=a,E=c;for(let R=0;R<p.length;R++){const v=p[R];if(v.enabled!==!1&&(v.render(S,E,A,y),v.needsSwap!==!1)){const w=A;A=E,E=w}}if(u!==S.outputColorSpace||d!==S.toneMapping){u=S.outputColorSpace,d=S.toneMapping,l.defines={},wt.getTransfer(u)===Nt&&(l.defines.SRGB_TRANSFER="");const R=Ym[d];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,S.setRenderTarget(m),S.render(h,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const yu=new _n,Al=new Vs(1,1),Mu=new Yh,Su=new Lf,bu=new tu,oh=[],lh=[],ch=new Float32Array(16),hh=new Float32Array(9),uh=new Float32Array(4);function Xs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=oh[s];if(r===void 0&&(r=new Float32Array(s),oh[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function za(i,e){let t=lh[e];t===void 0&&(t=new Int32Array(e),lh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Km(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function Jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function Qm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;uh.set(n),i.uniformMatrix2fv(this.addr,!1,uh),on(t,n)}}function eg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;hh.set(n),i.uniformMatrix3fv(this.addr,!1,hh),on(t,n)}}function tg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;ch.set(n),i.uniformMatrix4fv(this.addr,!1,ch),on(t,n)}}function ng(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function ag(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function hg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Al.compareFunction=t.isReversedDepthBuffer()?Vl:kl,r=Al):r=yu,t.setTexture2D(e||r,s)}function ug(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Su,s)}function fg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||bu,s)}function dg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Mu,s)}function pg(i){switch(i){case 5126:return Km;case 35664:return $m;case 35665:return Jm;case 35666:return jm;case 35674:return Qm;case 35675:return eg;case 35676:return tg;case 5124:case 35670:return ng;case 35667:case 35671:return ig;case 35668:case 35672:return sg;case 35669:case 35673:return rg;case 5125:return ag;case 36294:return og;case 36295:return lg;case 36296:return cg;case 35678:case 36198:case 36298:case 36306:case 35682:return hg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return fg;case 36289:case 36303:case 36311:case 36292:return dg}}function mg(i,e){i.uniform1fv(this.addr,e)}function gg(i,e){const t=Xs(e,this.size,2);i.uniform2fv(this.addr,t)}function _g(i,e){const t=Xs(e,this.size,3);i.uniform3fv(this.addr,t)}function vg(i,e){const t=Xs(e,this.size,4);i.uniform4fv(this.addr,t)}function xg(i,e){const t=Xs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function yg(i,e){const t=Xs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Mg(i,e){const t=Xs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sg(i,e){i.uniform1iv(this.addr,e)}function bg(i,e){i.uniform2iv(this.addr,e)}function Eg(i,e){i.uniform3iv(this.addr,e)}function wg(i,e){i.uniform4iv(this.addr,e)}function Tg(i,e){i.uniform1uiv(this.addr,e)}function Ag(i,e){i.uniform2uiv(this.addr,e)}function Rg(i,e){i.uniform3uiv(this.addr,e)}function Cg(i,e){i.uniform4uiv(this.addr,e)}function Pg(i,e,t){const n=this.cache,s=e.length,r=za(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Al:a=yu;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Dg(i,e,t){const n=this.cache,s=e.length,r=za(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Su,r[a])}function Lg(i,e,t){const n=this.cache,s=e.length,r=za(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||bu,r[a])}function Ig(i,e,t){const n=this.cache,s=e.length,r=za(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Mu,r[a])}function Ng(i){switch(i){case 5126:return mg;case 35664:return gg;case 35665:return _g;case 35666:return vg;case 35674:return xg;case 35675:return yg;case 35676:return Mg;case 5124:case 35670:return Sg;case 35667:case 35671:return bg;case 35668:case 35672:return Eg;case 35669:case 35673:return wg;case 5125:return Tg;case 36294:return Ag;case 36295:return Rg;case 36296:return Cg;case 35678:case 36198:case 36298:case 36306:case 35682:return Pg;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Lg;case 36289:case 36303:case 36311:case 36292:return Ig}}class Ug{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=pg(t.type)}}class Fg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ng(t.type)}}class Og{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const Ao=/(\w+)(\])?(\[|\.)?/g;function fh(i,e){i.seq.push(e),i.map[e.id]=e}function Bg(i,e,t){const n=i.name,s=n.length;for(Ao.lastIndex=0;;){const r=Ao.exec(n),a=Ao.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){fh(t,l===void 0?new Ug(c,i,e):new Fg(c,i,e));break}else{let f=t.map[c];f===void 0&&(f=new Og(c),fh(t,f)),t=f}}}class ya{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);Bg(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function dh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const zg=37297;let kg=0;function Vg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const ph=new lt;function Hg(i){wt._getMatrix(ph,wt.workingColorSpace,i);const e=`mat3( ${ph.elements.map(t=>t.toFixed(4))} )`;switch(wt.getTransfer(i)){case wa:return[e,"LinearTransferOETF"];case Nt:return[e,"sRGBTransferOETF"];default:return nt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function mh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Vg(i.getShaderSource(e),c)}else return r}function Gg(i,e){const t=Hg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Wg={[Ih]:"Linear",[Nh]:"Reinhard",[Uh]:"Cineon",[Ll]:"ACESFilmic",[Oh]:"AgX",[Bh]:"Neutral",[Fh]:"Custom"};function Xg(i,e){const t=Wg[e];return t===void 0?(nt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ua=new I;function qg(){wt.getLuminanceCoefficients(ua);const i=ua.x.toFixed(4),e=ua.y.toFixed(4),t=ua.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Yg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mr).join(`
`)}function Zg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Kg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function mr(i){return i!==""}function gh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _h(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $g=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rl(i){return i.replace($g,jg)}const Jg=new Map;function jg(i,e){let t=mt[e];if(t===void 0){const n=Jg.get(e);if(n!==void 0)t=mt[n],nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Rl(t)}const Qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vh(i){return i.replace(Qg,e_)}function e_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function xh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const t_={[gr]:"SHADOWMAP_TYPE_PCF",[fr]:"SHADOWMAP_TYPE_VSM"};function n_(i){return t_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const i_={[ns]:"ENVMAP_TYPE_CUBE",[ks]:"ENVMAP_TYPE_CUBE",[Fa]:"ENVMAP_TYPE_CUBE_UV"};function s_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":i_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const r_={[ks]:"ENVMAP_MODE_REFRACTION"};function a_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":r_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const o_={[Dl]:"ENVMAP_BLENDING_MULTIPLY",[hf]:"ENVMAP_BLENDING_MIX",[uf]:"ENVMAP_BLENDING_ADD"};function l_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":o_[i.combine]||"ENVMAP_BLENDING_NONE"}function c_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function h_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=n_(t),l=s_(t),h=a_(t),f=l_(t),u=c_(t),d=Yg(t),g=Zg(r),_=s.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(mr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(mr).join(`
`),p.length>0&&(p+=`
`)):(m=[xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mr).join(`
`),p=[xh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?mt.tonemapping_pars_fragment:"",t.toneMapping!==oi?Xg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,Gg("linearToOutputTexel",t.outputColorSpace),qg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mr).join(`
`)),a=Rl(a),a=gh(a,t),a=_h(a,t),c=Rl(c),c=gh(c,t),c=_h(c,t),a=vh(a),c=vh(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=M+m+a,y=M+p+c,A=dh(s,s.VERTEX_SHADER,S),E=dh(s,s.FRAGMENT_SHADER,y);s.attachShader(_,A),s.attachShader(_,E),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(U){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_)||"",q=s.getShaderInfoLog(A)||"",J=s.getShaderInfoLog(E)||"",k=z.trim(),$=q.trim(),F=J.trim();let X=!0,se=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,E);else{const fe=mh(s,A,"vertex"),de=mh(s,E,"fragment");yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+k+`
`+fe+`
`+de)}else k!==""?nt("WebGLProgram: Program Info Log:",k):($===""||F==="")&&(se=!1);se&&(U.diagnostics={runnable:X,programLog:k,vertexShader:{log:$,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(A),s.deleteShader(E),v=new ya(s,_),w=Kg(s,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(_,zg)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=E,this}let u_=0;class f_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new d_(e),t.set(e,n)),n}}class d_{constructor(e){this.id=u_++,this.code=e,this.usedTimes=0}}function p_(i){return i===is||i===Ma||i===Sa}function m_(i,e,t,n,s,r){const a=new Gl,c=new f_,o=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return o.add(v),v===0?"uv":`uv${v}`}function _(v,w,L,U,z,q){const J=U.fog,k=z.geometry,$=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,F=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,X=e.get(v.envMap||$,F),se=X&&X.mapping===Fa?X.image.height:null,fe=d[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&nt("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const de=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ve=de!==void 0?de.length:0;let Je=0;k.morphAttributes.position!==void 0&&(Je=1),k.morphAttributes.normal!==void 0&&(Je=2),k.morphAttributes.color!==void 0&&(Je=3);let St,it,re,_e;if(fe){const Fe=si[fe];St=Fe.vertexShader,it=Fe.fragmentShader}else{St=v.vertexShader,it=v.fragmentShader;const Fe=c.getVertexShaderStage(v),Ft=c.getFragmentShaderStage(v);c.update(v,Fe,Ft),re=Fe.id,_e=Ft.id}const ce=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Ye=z.isInstancedMesh===!0,He=z.isBatchedMesh===!0,vt=!!v.map,je=!!v.matcap,he=!!X,me=!!v.aoMap,ge=!!v.lightMap,Te=!!v.bumpMap&&v.wireframe===!1,Me=!!v.normalMap,Ke=!!v.displacementMap,ze=!!v.emissiveMap,Qe=!!v.metalnessMap,rt=!!v.roughnessMap,B=v.anisotropy>0,Tt=v.clearcoat>0,gt=v.dispersion>0,C=v.iridescence>0,x=v.sheen>0,W=v.transmission>0,Z=B&&!!v.anisotropyMap,ne=Tt&&!!v.clearcoatMap,le=Tt&&!!v.clearcoatNormalMap,ye=Tt&&!!v.clearcoatRoughnessMap,te=C&&!!v.iridescenceMap,oe=C&&!!v.iridescenceThicknessMap,we=x&&!!v.sheenColorMap,Ge=x&&!!v.sheenRoughnessMap,Ae=!!v.specularMap,be=!!v.specularColorMap,ke=!!v.specularIntensityMap,$e=W&&!!v.transmissionMap,at=W&&!!v.thicknessMap,V=!!v.gradientMap,Se=!!v.alphaMap,ae=v.alphaTest>0,Ee=!!v.alphaHash,Pe=!!v.extensions;let ue=oi;v.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(ue=i.toneMapping);const Ve={shaderID:fe,shaderType:v.type,shaderName:v.name,vertexShader:St,fragmentShader:it,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:_e,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:He,batchingColor:He&&z._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&z.instanceColor!==null,instancingMorph:Ye&&z.morphTexture!==null,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:wt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:vt,matcap:je,envMap:he,envMapMode:he&&X.mapping,envMapCubeUVHeight:se,aoMap:me,lightMap:ge,bumpMap:Te,normalMap:Me,displacementMap:Ke,emissiveMap:ze,normalMapObjectSpace:Me&&v.normalMapType===pf,normalMapTangentSpace:Me&&v.normalMapType===ba,packedNormalMap:Me&&v.normalMapType===ba&&p_(v.normalMap.format),metalnessMap:Qe,roughnessMap:rt,anisotropy:B,anisotropyMap:Z,clearcoat:Tt,clearcoatMap:ne,clearcoatNormalMap:le,clearcoatRoughnessMap:ye,dispersion:gt,iridescence:C,iridescenceMap:te,iridescenceThicknessMap:oe,sheen:x,sheenColorMap:we,sheenRoughnessMap:Ge,specularMap:Ae,specularColorMap:be,specularIntensityMap:ke,transmission:W,transmissionMap:$e,thicknessMap:at,gradientMap:V,opaque:v.transparent===!1&&v.blending===Us&&v.alphaToCoverage===!1,alphaMap:Se,alphaTest:ae,alphaHash:Ee,combine:v.combine,mapUv:vt&&g(v.map.channel),aoMapUv:me&&g(v.aoMap.channel),lightMapUv:ge&&g(v.lightMap.channel),bumpMapUv:Te&&g(v.bumpMap.channel),normalMapUv:Me&&g(v.normalMap.channel),displacementMapUv:Ke&&g(v.displacementMap.channel),emissiveMapUv:ze&&g(v.emissiveMap.channel),metalnessMapUv:Qe&&g(v.metalnessMap.channel),roughnessMapUv:rt&&g(v.roughnessMap.channel),anisotropyMapUv:Z&&g(v.anisotropyMap.channel),clearcoatMapUv:ne&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:le&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:we&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&g(v.sheenRoughnessMap.channel),specularMapUv:Ae&&g(v.specularMap.channel),specularColorMapUv:be&&g(v.specularColorMap.channel),specularIntensityMapUv:ke&&g(v.specularIntensityMap.channel),transmissionMapUv:$e&&g(v.transmissionMap.channel),thicknessMapUv:at&&g(v.thicknessMap.channel),alphaMapUv:Se&&g(v.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Me||B),vertexNormals:!!k.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!k.attributes.uv&&(vt||Se),fog:!!J,useFog:v.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||k.attributes.normal===void 0&&Me===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Le,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Je,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:vt&&v.map.isVideoTexture===!0&&wt.getTransfer(v.map.colorSpace)===Nt,decodeVideoTextureEmissive:ze&&v.emissiveMap.isVideoTexture===!0&&wt.getTransfer(v.emissiveMap.colorSpace)===Nt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Jt,flipSided:v.side===Mn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Pe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&v.extensions.multiDraw===!0||He)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ve.vertexUv1s=o.has(1),Ve.vertexUv2s=o.has(2),Ve.vertexUv3s=o.has(3),o.clear(),Ve}function m(v){const w=[];if(v.shaderID?w.push(v.shaderID):(w.push(v.customVertexShaderID),w.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)w.push(L),w.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(p(w,v),M(w,v),w.push(i.outputColorSpace)),w.push(v.customProgramCacheKey),w.join()}function p(v,w){v.push(w.precision),v.push(w.outputColorSpace),v.push(w.envMapMode),v.push(w.envMapCubeUVHeight),v.push(w.mapUv),v.push(w.alphaMapUv),v.push(w.lightMapUv),v.push(w.aoMapUv),v.push(w.bumpMapUv),v.push(w.normalMapUv),v.push(w.displacementMapUv),v.push(w.emissiveMapUv),v.push(w.metalnessMapUv),v.push(w.roughnessMapUv),v.push(w.anisotropyMapUv),v.push(w.clearcoatMapUv),v.push(w.clearcoatNormalMapUv),v.push(w.clearcoatRoughnessMapUv),v.push(w.iridescenceMapUv),v.push(w.iridescenceThicknessMapUv),v.push(w.sheenColorMapUv),v.push(w.sheenRoughnessMapUv),v.push(w.specularMapUv),v.push(w.specularColorMapUv),v.push(w.specularIntensityMapUv),v.push(w.transmissionMapUv),v.push(w.thicknessMapUv),v.push(w.combine),v.push(w.fogExp2),v.push(w.sizeAttenuation),v.push(w.morphTargetsCount),v.push(w.morphAttributeCount),v.push(w.numDirLights),v.push(w.numPointLights),v.push(w.numSpotLights),v.push(w.numSpotLightMaps),v.push(w.numHemiLights),v.push(w.numRectAreaLights),v.push(w.numDirLightShadows),v.push(w.numPointLightShadows),v.push(w.numSpotLightShadows),v.push(w.numSpotLightShadowsWithMaps),v.push(w.numLightProbes),v.push(w.shadowMapType),v.push(w.toneMapping),v.push(w.numClippingPlanes),v.push(w.numClipIntersection),v.push(w.depthPacking)}function M(v,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function S(v){const w=d[v.type];let L;if(w){const U=si[w];L=Dd.clone(U.uniforms)}else L=v.uniforms;return L}function y(v,w){let L=h.get(w);return L!==void 0?++L.usedTimes:(L=new h_(i,w,v,s),l.push(L),h.set(w,L)),L}function A(v){if(--v.usedTimes===0){const w=l.indexOf(v);l[w]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function E(v){c.remove(v)}function R(){c.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:S,acquireProgram:y,releaseProgram:A,releaseShaderCache:E,programs:l,dispose:R}}function g_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function __(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function yh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Mh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function c(u,d,g,_,m,p){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:d,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},i[e]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=g,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=p),e++,M}function o(u,d,g,_,m,p){const M=c(u,d,g,_,m,p);g.transmission>0?n.push(M):g.transparent===!0?s.push(M):t.push(M)}function l(u,d,g,_,m,p){const M=c(u,d,g,_,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,d,g){t.length>1&&t.sort(u||__),n.length>1&&n.sort(d||yh),s.length>1&&s.sort(d||yh),g&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let u=e,d=i.length;u<d;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:f,sort:h}}function v_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Mh,i.set(n,[a])):s>=r.length?(a=new Mh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function x_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new ht};break;case"SpotLight":t={position:new I,direction:new I,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function y_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Q,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let M_=0;function S_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function b_(i){const e=new x_,t=y_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new Ut,a=new Ut;function c(l){let h=0,f=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,S=0,y=0,A=0,E=0,R=0;l.sort(S_);for(let w=0,L=l.length;w<L;w++){const U=l[w],z=U.color,q=U.intensity,J=U.distance;let k=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===is?k=U.shadow.map.texture:k=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=z.r*q,f+=z.g*q,u+=z.b*q;else if(U.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(U.sh.coefficients[$],q);R++}else if(U.isDirectionalLight){const $=e.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const F=U.shadow,X=t.get(U);X.shadowIntensity=F.intensity,X.shadowBias=F.bias,X.shadowNormalBias=F.normalBias,X.shadowRadius=F.radius,X.shadowMapSize=F.mapSize,n.directionalShadow[d]=X,n.directionalShadowMap[d]=k,n.directionalShadowMatrix[d]=U.shadow.matrix,M++}n.directional[d]=$,d++}else if(U.isSpotLight){const $=e.get(U);$.position.setFromMatrixPosition(U.matrixWorld),$.color.copy(z).multiplyScalar(q),$.distance=J,$.coneCos=Math.cos(U.angle),$.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),$.decay=U.decay,n.spot[_]=$;const F=U.shadow;if(U.map&&(n.spotLightMap[A]=U.map,A++,F.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[_]=F.matrix,U.castShadow){const X=t.get(U);X.shadowIntensity=F.intensity,X.shadowBias=F.bias,X.shadowNormalBias=F.normalBias,X.shadowRadius=F.radius,X.shadowMapSize=F.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=k,y++}_++}else if(U.isRectAreaLight){const $=e.get(U);$.color.copy(z).multiplyScalar(q),$.halfWidth.set(U.width*.5,0,0),$.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=$,m++}else if(U.isPointLight){const $=e.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),$.distance=U.distance,$.decay=U.decay,U.castShadow){const F=U.shadow,X=t.get(U);X.shadowIntensity=F.intensity,X.shadowBias=F.bias,X.shadowNormalBias=F.normalBias,X.shadowRadius=F.radius,X.shadowMapSize=F.mapSize,X.shadowCameraNear=F.camera.near,X.shadowCameraFar=F.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=U.shadow.matrix,S++}n.point[g]=$,g++}else if(U.isHemisphereLight){const $=e.get(U);$.skyColor.copy(U.color).multiplyScalar(q),$.groundColor.copy(U.groundColor).multiplyScalar(q),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const v=n.hash;(v.directionalLength!==d||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==M||v.numPointShadows!==S||v.numSpotShadows!==y||v.numSpotMaps!==A||v.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=y+A-E,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,v.directionalLength=d,v.pointLength=g,v.spotLength=_,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=M,v.numPointShadows=S,v.numSpotShadows=y,v.numSpotMaps=A,v.numLightProbes=R,n.version=M_++)}function o(l,h){let f=0,u=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const S=l[p];if(S.isDirectionalLight){const y=n.directional[f];y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(S.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:c,setupView:o,state:n}}function Sh(i){const e=new b_(i),t=[],n=[],s=[];function r(u){f.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function c(u){n.push(u)}function o(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function E_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new Sh(i),e.set(s,[c])):r>=a.length?(c=new Sh(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const w_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,A_=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],R_=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],bh=new Ut,cr=new I,Ro=new I;function C_(i,e,t){let n=new Wl;const s=new Q,r=new Q,a=new Zt,c=new Fd,o=new Od,l={},h=t.maxTextureSize,f={[zi]:Mn,[Mn]:zi,[Jt]:Jt},u=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Q},radius:{value:4}},vertexShader:w_,fragmentShader:T_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new nn;g.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ie(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gr;let p=this.type;this.render=function(E,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Wu&&(nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=gr);const w=i.getRenderTarget(),L=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),z=i.state;z.setBlending(yi),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const q=p!==this.type;q&&R.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(k=>k.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,k=E.length;J<k;J++){const $=E[J],F=$.shadow;if(F===void 0){nt("WebGLShadowMap:",$,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const X=F.getFrameExtents();s.multiply(X),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,F.mapSize.y=r.y));const se=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=se,F.map===null||q===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===fr){if($.isPointLight){nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new li(s.x,s.y,{format:is,type:Ei,minFilter:gn,magFilter:gn,generateMipmaps:!1}),F.map.texture.name=$.name+".shadowMap",F.map.depthTexture=new Vs(s.x,s.y,qn),F.map.depthTexture.name=$.name+".shadowMapDepth",F.map.depthTexture.format=wi,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=un,F.map.depthTexture.magFilter=un}else $.isPointLight?(F.map=new xu(s.x),F.map.depthTexture=new jf(s.x,ci)):(F.map=new li(s.x,s.y),F.map.depthTexture=new Vs(s.x,s.y,ci)),F.map.depthTexture.name=$.name+".shadowMap",F.map.depthTexture.format=wi,this.type===gr?(F.map.depthTexture.compareFunction=se?Vl:kl,F.map.depthTexture.minFilter=gn,F.map.depthTexture.magFilter=gn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=un,F.map.depthTexture.magFilter=un);F.camera.updateProjectionMatrix()}const fe=F.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<fe;de++){if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,de),i.clear();else{de===0&&(i.setRenderTarget(F.map),i.clear());const ve=F.getViewport(de);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),z.viewport(a)}if($.isPointLight){const ve=F.camera,Je=F.matrix,St=$.distance||ve.far;St!==ve.far&&(ve.far=St,ve.updateProjectionMatrix()),cr.setFromMatrixPosition($.matrixWorld),ve.position.copy(cr),Ro.copy(ve.position),Ro.add(A_[de]),ve.up.copy(R_[de]),ve.lookAt(Ro),ve.updateMatrixWorld(),Je.makeTranslation(-cr.x,-cr.y,-cr.z),bh.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),F._frustum.setFromProjectionMatrix(bh,ve.coordinateSystem,ve.reversedDepth)}else F.updateMatrices($);n=F.getFrustum(),y(R,v,F.camera,$,this.type)}F.isPointLightShadow!==!0&&this.type===fr&&M(F,v),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,L,U)};function M(E,R){const v=e.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new li(s.x,s.y,{format:is,type:Ei})),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,v,u,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,v,d,_,null)}function S(E,R,v,w){let L=null;const U=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)L=U;else if(L=v.isPointLight===!0?o:c,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const z=L.uuid,q=R.uuid;let J=l[z];J===void 0&&(J={},l[z]=J);let k=J[q];k===void 0&&(k=L.clone(),J[q]=k,R.addEventListener("dispose",A)),L=k}if(L.visible=R.visible,L.wireframe=R.wireframe,w===fr?L.side=R.shadowSide!==null?R.shadowSide:R.side:L.side=R.shadowSide!==null?R.shadowSide:f[R.side],L.alphaMap=R.alphaMap,L.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,L.map=R.map,L.clipShadows=R.clipShadows,L.clippingPlanes=R.clippingPlanes,L.clipIntersection=R.clipIntersection,L.displacementMap=R.displacementMap,L.displacementScale=R.displacementScale,L.displacementBias=R.displacementBias,L.wireframeLinewidth=R.wireframeLinewidth,L.linewidth=R.linewidth,v.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const z=i.properties.get(L);z.light=v}return L}function y(E,R,v,w,L){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===fr)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const q=e.update(E),J=E.material;if(Array.isArray(J)){const k=q.groups;for(let $=0,F=k.length;$<F;$++){const X=k[$],se=J[X.materialIndex];if(se&&se.visible){const fe=S(E,se,w,L);E.onBeforeShadow(i,E,R,v,q,fe,X),i.renderBufferDirect(v,null,q,fe,E,X),E.onAfterShadow(i,E,R,v,q,fe,X)}}}else if(J.visible){const k=S(E,J,w,L);E.onBeforeShadow(i,E,R,v,q,k,null),i.renderBufferDirect(v,null,q,k,E,null),E.onAfterShadow(i,E,R,v,q,k,null)}}const z=E.children;for(let q=0,J=z.length;q<J;q++)y(z[q],R,v,w,L)}function A(E){E.target.removeEventListener("dispose",A);for(const v in l){const w=l[v],L=E.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function P_(i,e){function t(){let V=!1;const Se=new Zt;let ae=null;const Ee=new Zt(0,0,0,0);return{setMask:function(Pe){ae!==Pe&&!V&&(i.colorMask(Pe,Pe,Pe,Pe),ae=Pe)},setLocked:function(Pe){V=Pe},setClear:function(Pe,ue,Ve,Fe,Ft){Ft===!0&&(Pe*=Fe,ue*=Fe,Ve*=Fe),Se.set(Pe,ue,Ve,Fe),Ee.equals(Se)===!1&&(i.clearColor(Pe,ue,Ve,Fe),Ee.copy(Se))},reset:function(){V=!1,ae=null,Ee.set(-1,0,0,0)}}}function n(){let V=!1,Se=!1,ae=null,Ee=null,Pe=null;return{setReversed:function(ue){if(Se!==ue){const Ve=e.get("EXT_clip_control");ue?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),Se=ue;const Fe=Pe;Pe=null,this.setClear(Fe)}},getReversed:function(){return Se},setTest:function(ue){ue?ce(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(ue){ae!==ue&&!V&&(i.depthMask(ue),ae=ue)},setFunc:function(ue){if(Se&&(ue=Ef[ue]),Ee!==ue){switch(ue){case Oo:i.depthFunc(i.NEVER);break;case Bo:i.depthFunc(i.ALWAYS);break;case zo:i.depthFunc(i.LESS);break;case zs:i.depthFunc(i.LEQUAL);break;case ko:i.depthFunc(i.EQUAL);break;case Vo:i.depthFunc(i.GEQUAL);break;case Ho:i.depthFunc(i.GREATER);break;case Go:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=ue}},setLocked:function(ue){V=ue},setClear:function(ue){Pe!==ue&&(Pe=ue,Se&&(ue=1-ue),i.clearDepth(ue))},reset:function(){V=!1,ae=null,Ee=null,Pe=null,Se=!1}}}function s(){let V=!1,Se=null,ae=null,Ee=null,Pe=null,ue=null,Ve=null,Fe=null,Ft=null;return{setTest:function(Ct){V||(Ct?ce(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(Ct){Se!==Ct&&!V&&(i.stencilMask(Ct),Se=Ct)},setFunc:function(Ct,Pn,fn){(ae!==Ct||Ee!==Pn||Pe!==fn)&&(i.stencilFunc(Ct,Pn,fn),ae=Ct,Ee=Pn,Pe=fn)},setOp:function(Ct,Pn,fn){(ue!==Ct||Ve!==Pn||Fe!==fn)&&(i.stencilOp(Ct,Pn,fn),ue=Ct,Ve=Pn,Fe=fn)},setLocked:function(Ct){V=Ct},setClear:function(Ct){Ft!==Ct&&(i.clearStencil(Ct),Ft=Ct)},reset:function(){V=!1,Se=null,ae=null,Ee=null,Pe=null,ue=null,Ve=null,Fe=null,Ft=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let h={},f={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,S=null,y=null,A=null,E=null,R=null,v=new ht(0,0,0),w=0,L=!1,U=null,z=null,q=null,J=null,k=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,X=0;const se=i.getParameter(i.VERSION);se.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(se)[1]),F=X>=1):se.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),F=X>=2);let fe=null,de={};const ve=i.getParameter(i.SCISSOR_BOX),Je=i.getParameter(i.VIEWPORT),St=new Zt().fromArray(ve),it=new Zt().fromArray(Je);function re(V,Se,ae,Ee){const Pe=new Uint8Array(4),ue=i.createTexture();i.bindTexture(V,ue),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ve=0;Ve<ae;Ve++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(Se+Ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return ue}const _e={};_e[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),_e[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_e[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),ce(i.DEPTH_TEST),a.setFunc(zs),Te(!1),Me(uc),ce(i.CULL_FACE),me(yi);function ce(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function Le(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function Ye(V,Se){return u[V]!==Se?(i.bindFramebuffer(V,Se),u[V]=Se,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Se),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function He(V,Se){let ae=g,Ee=!1;if(V){ae=d.get(Se),ae===void 0&&(ae=[],d.set(Se,ae));const Pe=V.textures;if(ae.length!==Pe.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,Ve=Pe.length;ue<Ve;ue++)ae[ue]=i.COLOR_ATTACHMENT0+ue;ae.length=Pe.length,Ee=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(ae)}function vt(V){return _!==V?(i.useProgram(V),_=V,!0):!1}const je={[$i]:i.FUNC_ADD,[qu]:i.FUNC_SUBTRACT,[Yu]:i.FUNC_REVERSE_SUBTRACT};je[Zu]=i.MIN,je[Ku]=i.MAX;const he={[$u]:i.ZERO,[Ju]:i.ONE,[ju]:i.SRC_COLOR,[Uo]:i.SRC_ALPHA,[rf]:i.SRC_ALPHA_SATURATE,[nf]:i.DST_COLOR,[ef]:i.DST_ALPHA,[Qu]:i.ONE_MINUS_SRC_COLOR,[Fo]:i.ONE_MINUS_SRC_ALPHA,[sf]:i.ONE_MINUS_DST_COLOR,[tf]:i.ONE_MINUS_DST_ALPHA,[af]:i.CONSTANT_COLOR,[of]:i.ONE_MINUS_CONSTANT_COLOR,[lf]:i.CONSTANT_ALPHA,[cf]:i.ONE_MINUS_CONSTANT_ALPHA};function me(V,Se,ae,Ee,Pe,ue,Ve,Fe,Ft,Ct){if(V===yi){m===!0&&(Le(i.BLEND),m=!1);return}if(m===!1&&(ce(i.BLEND),m=!0),V!==Xu){if(V!==p||Ct!==L){if((M!==$i||A!==$i)&&(i.blendEquation(i.FUNC_ADD),M=$i,A=$i),Ct)switch(V){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fc:i.blendFunc(i.ONE,i.ONE);break;case dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case pc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:yt("WebGLState: Invalid blending: ",V);break}else switch(V){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case dc:yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pc:yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:yt("WebGLState: Invalid blending: ",V);break}S=null,y=null,E=null,R=null,v.set(0,0,0),w=0,p=V,L=Ct}return}Pe=Pe||Se,ue=ue||ae,Ve=Ve||Ee,(Se!==M||Pe!==A)&&(i.blendEquationSeparate(je[Se],je[Pe]),M=Se,A=Pe),(ae!==S||Ee!==y||ue!==E||Ve!==R)&&(i.blendFuncSeparate(he[ae],he[Ee],he[ue],he[Ve]),S=ae,y=Ee,E=ue,R=Ve),(Fe.equals(v)===!1||Ft!==w)&&(i.blendColor(Fe.r,Fe.g,Fe.b,Ft),v.copy(Fe),w=Ft),p=V,L=!1}function ge(V,Se){V.side===Jt?Le(i.CULL_FACE):ce(i.CULL_FACE);let ae=V.side===Mn;Se&&(ae=!ae),Te(ae),V.blending===Us&&V.transparent===!1?me(yi):me(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),r.setMask(V.colorWrite);const Ee=V.stencilWrite;c.setTest(Ee),Ee&&(c.setMask(V.stencilWriteMask),c.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),c.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),ze(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function Te(V){U!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),U=V)}function Me(V){V!==Hu?(ce(i.CULL_FACE),V!==z&&(V===uc?i.cullFace(i.BACK):V===Gu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),z=V}function Ke(V){V!==q&&(F&&i.lineWidth(V),q=V)}function ze(V,Se,ae){V?(ce(i.POLYGON_OFFSET_FILL),(J!==Se||k!==ae)&&(J=Se,k=ae,a.getReversed()&&(Se=-Se),i.polygonOffset(Se,ae))):Le(i.POLYGON_OFFSET_FILL)}function Qe(V){V?ce(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function rt(V){V===void 0&&(V=i.TEXTURE0+$-1),fe!==V&&(i.activeTexture(V),fe=V)}function B(V,Se,ae){ae===void 0&&(fe===null?ae=i.TEXTURE0+$-1:ae=fe);let Ee=de[ae];Ee===void 0&&(Ee={type:void 0,texture:void 0},de[ae]=Ee),(Ee.type!==V||Ee.texture!==Se)&&(fe!==ae&&(i.activeTexture(ae),fe=ae),i.bindTexture(V,Se||_e[V]),Ee.type=V,Ee.texture=Se)}function Tt(){const V=de[fe];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function gt(){try{i.compressedTexImage2D(...arguments)}catch(V){yt("WebGLState:",V)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(V){yt("WebGLState:",V)}}function x(){try{i.texSubImage2D(...arguments)}catch(V){yt("WebGLState:",V)}}function W(){try{i.texSubImage3D(...arguments)}catch(V){yt("WebGLState:",V)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(V){yt("WebGLState:",V)}}function ne(){try{i.compressedTexSubImage3D(...arguments)}catch(V){yt("WebGLState:",V)}}function le(){try{i.texStorage2D(...arguments)}catch(V){yt("WebGLState:",V)}}function ye(){try{i.texStorage3D(...arguments)}catch(V){yt("WebGLState:",V)}}function te(){try{i.texImage2D(...arguments)}catch(V){yt("WebGLState:",V)}}function oe(){try{i.texImage3D(...arguments)}catch(V){yt("WebGLState:",V)}}function we(V){return f[V]!==void 0?f[V]:i.getParameter(V)}function Ge(V,Se){f[V]!==Se&&(i.pixelStorei(V,Se),f[V]=Se)}function Ae(V){St.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),St.copy(V))}function be(V){it.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),it.copy(V))}function ke(V,Se){let ae=l.get(Se);ae===void 0&&(ae=new WeakMap,l.set(Se,ae));let Ee=ae.get(V);Ee===void 0&&(Ee=i.getUniformBlockIndex(Se,V.name),ae.set(V,Ee))}function $e(V,Se){const Ee=l.get(Se).get(V);o.get(Se)!==Ee&&(i.uniformBlockBinding(Se,Ee,V.__bindingPointIndex),o.set(Se,Ee))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},fe=null,de={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,S=null,y=null,A=null,E=null,R=null,v=new ht(0,0,0),w=0,L=!1,U=null,z=null,q=null,J=null,k=null,St.set(0,0,i.canvas.width,i.canvas.height),it.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:ce,disable:Le,bindFramebuffer:Ye,drawBuffers:He,useProgram:vt,setBlending:me,setMaterial:ge,setFlipSided:Te,setCullFace:Me,setLineWidth:Ke,setPolygonOffset:ze,setScissorTest:Qe,activeTexture:rt,bindTexture:B,unbindTexture:Tt,compressedTexImage2D:gt,compressedTexImage3D:C,texImage2D:te,texImage3D:oe,pixelStorei:Ge,getParameter:we,updateUBOMapping:ke,uniformBlockBinding:$e,texStorage2D:le,texStorage3D:ye,texSubImage2D:x,texSubImage3D:W,compressedTexSubImage2D:Z,compressedTexSubImage3D:ne,scissor:Ae,viewport:be,reset:at}}function D_(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Q,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,x){return g?new OffscreenCanvas(C,x):Ta("canvas")}function m(C,x,W){let Z=1;const ne=gt(C);if((ne.width>W||ne.height>W)&&(Z=W/Math.max(ne.width,ne.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const le=Math.floor(Z*ne.width),ye=Math.floor(Z*ne.height);u===void 0&&(u=_(le,ye));const te=x?_(le,ye):u;return te.width=le,te.height=ye,te.getContext("2d").drawImage(C,0,0,le,ye),nt("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+le+"x"+ye+")."),te}else return"data"in C&&nt("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),C;return C}function p(C){return C.generateMipmaps}function M(C){i.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,x,W,Z,ne,le=!1){if(C!==null){if(i[C]!==void 0)return i[C];nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ye;Z&&(ye=e.get("EXT_texture_norm16"),ye||nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=x;if(x===i.RED&&(W===i.FLOAT&&(te=i.R32F),W===i.HALF_FLOAT&&(te=i.R16F),W===i.UNSIGNED_BYTE&&(te=i.R8),W===i.UNSIGNED_SHORT&&ye&&(te=ye.R16_EXT),W===i.SHORT&&ye&&(te=ye.R16_SNORM_EXT)),x===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.R8UI),W===i.UNSIGNED_SHORT&&(te=i.R16UI),W===i.UNSIGNED_INT&&(te=i.R32UI),W===i.BYTE&&(te=i.R8I),W===i.SHORT&&(te=i.R16I),W===i.INT&&(te=i.R32I)),x===i.RG&&(W===i.FLOAT&&(te=i.RG32F),W===i.HALF_FLOAT&&(te=i.RG16F),W===i.UNSIGNED_BYTE&&(te=i.RG8),W===i.UNSIGNED_SHORT&&ye&&(te=ye.RG16_EXT),W===i.SHORT&&ye&&(te=ye.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.RG8UI),W===i.UNSIGNED_SHORT&&(te=i.RG16UI),W===i.UNSIGNED_INT&&(te=i.RG32UI),W===i.BYTE&&(te=i.RG8I),W===i.SHORT&&(te=i.RG16I),W===i.INT&&(te=i.RG32I)),x===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.RGB8UI),W===i.UNSIGNED_SHORT&&(te=i.RGB16UI),W===i.UNSIGNED_INT&&(te=i.RGB32UI),W===i.BYTE&&(te=i.RGB8I),W===i.SHORT&&(te=i.RGB16I),W===i.INT&&(te=i.RGB32I)),x===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),W===i.UNSIGNED_INT&&(te=i.RGBA32UI),W===i.BYTE&&(te=i.RGBA8I),W===i.SHORT&&(te=i.RGBA16I),W===i.INT&&(te=i.RGBA32I)),x===i.RGB&&(W===i.UNSIGNED_SHORT&&ye&&(te=ye.RGB16_EXT),W===i.SHORT&&ye&&(te=ye.RGB16_SNORM_EXT),W===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(te=i.R11F_G11F_B10F)),x===i.RGBA){const oe=le?wa:wt.getTransfer(ne);W===i.FLOAT&&(te=i.RGBA32F),W===i.HALF_FLOAT&&(te=i.RGBA16F),W===i.UNSIGNED_BYTE&&(te=oe===Nt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT&&ye&&(te=ye.RGBA16_EXT),W===i.SHORT&&ye&&(te=ye.RGBA16_SNORM_EXT),W===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function A(C,x){let W;return C?x===null||x===ci||x===Mr?W=i.DEPTH24_STENCIL8:x===qn?W=i.DEPTH32F_STENCIL8:x===yr&&(W=i.DEPTH24_STENCIL8,nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ci||x===Mr?W=i.DEPTH_COMPONENT24:x===qn?W=i.DEPTH_COMPONENT32F:x===yr&&(W=i.DEPTH_COMPONENT16),W}function E(C,x){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==un&&C.minFilter!==gn?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function R(C){const x=C.target;x.removeEventListener("dispose",R),w(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&f.delete(x)}function v(C){const x=C.target;x.removeEventListener("dispose",v),U(x)}function w(C){const x=n.get(C);if(x.__webglInit===void 0)return;const W=C.source,Z=d.get(W);if(Z){const ne=Z[x.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&L(C),Object.keys(Z).length===0&&d.delete(W)}n.remove(C)}function L(C){const x=n.get(C);i.deleteTexture(x.__webglTexture);const W=C.source,Z=d.get(W);delete Z[x.__cacheKey],a.memory.textures--}function U(C){const x=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(x.__webglFramebuffer[Z]))for(let ne=0;ne<x.__webglFramebuffer[Z].length;ne++)i.deleteFramebuffer(x.__webglFramebuffer[Z][ne]);else i.deleteFramebuffer(x.__webglFramebuffer[Z]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Z])}else{if(Array.isArray(x.__webglFramebuffer))for(let Z=0;Z<x.__webglFramebuffer.length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[Z]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Z=0;Z<x.__webglColorRenderbuffer.length;Z++)x.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Z]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const W=C.textures;for(let Z=0,ne=W.length;Z<ne;Z++){const le=n.get(W[Z]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(W[Z])}n.remove(C)}let z=0;function q(){z=0}function J(){return z}function k(C){z=C}function $(){const C=z;return C>=s.maxTextures&&nt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),z+=1,C}function F(C){const x=[];return x.push(C.wrapS),x.push(C.wrapT),x.push(C.wrapR||0),x.push(C.magFilter),x.push(C.minFilter),x.push(C.anisotropy),x.push(C.internalFormat),x.push(C.format),x.push(C.type),x.push(C.generateMipmaps),x.push(C.premultiplyAlpha),x.push(C.flipY),x.push(C.unpackAlignment),x.push(C.colorSpace),x.join()}function X(C,x){const W=n.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&W.__version!==C.version){const Z=C.image;if(Z===null)nt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)nt("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(W,C,x);return}}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+x)}function se(C,x){const W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){Le(W,C,x);return}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+x)}function fe(C,x){const W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){Le(W,C,x);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+x)}function de(C,x){const W=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&W.__version!==C.version){Ye(W,C,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+x)}const ve={[Mi]:i.REPEAT,[xi]:i.CLAMP_TO_EDGE,[Wo]:i.MIRRORED_REPEAT},Je={[un]:i.NEAREST,[ff]:i.NEAREST_MIPMAP_NEAREST,[Fr]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[qa]:i.LINEAR_MIPMAP_NEAREST,[Qi]:i.LINEAR_MIPMAP_LINEAR},St={[mf]:i.NEVER,[yf]:i.ALWAYS,[gf]:i.LESS,[kl]:i.LEQUAL,[_f]:i.EQUAL,[Vl]:i.GEQUAL,[vf]:i.GREATER,[xf]:i.NOTEQUAL};function it(C,x){if(x.type===qn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===gn||x.magFilter===qa||x.magFilter===Fr||x.magFilter===Qi||x.minFilter===gn||x.minFilter===qa||x.minFilter===Fr||x.minFilter===Qi)&&nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ve[x.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ve[x.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ve[x.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Je[x.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Je[x.minFilter]),x.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,St[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===un||x.minFilter!==Fr&&x.minFilter!==Qi||x.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function re(C,x){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",R));const Z=x.source;let ne=d.get(Z);ne===void 0&&(ne={},d.set(Z,ne));const le=F(x);if(le!==C.__cacheKey){ne[le]===void 0&&(ne[le]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ne[le].usedTimes++;const ye=ne[C.__cacheKey];ye!==void 0&&(ne[C.__cacheKey].usedTimes--,ye.usedTimes===0&&L(x)),C.__cacheKey=le,C.__webglTexture=ne[le].texture}return W}function _e(C,x,W){return Math.floor(Math.floor(C/W)/x)}function ce(C,x,W,Z){const le=C.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,W,Z,x.data);else{le.sort((Ge,Ae)=>Ge.start-Ae.start);let ye=0;for(let Ge=1;Ge<le.length;Ge++){const Ae=le[ye],be=le[Ge],ke=Ae.start+Ae.count,$e=_e(be.start,x.width,4),at=_e(Ae.start,x.width,4);be.start<=ke+1&&$e===at&&_e(be.start+be.count-1,x.width,4)===$e?Ae.count=Math.max(Ae.count,be.start+be.count-Ae.start):(++ye,le[ye]=be)}le.length=ye+1;const te=t.getParameter(i.UNPACK_ROW_LENGTH),oe=t.getParameter(i.UNPACK_SKIP_PIXELS),we=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Ge=0,Ae=le.length;Ge<Ae;Ge++){const be=le[Ge],ke=Math.floor(be.start/4),$e=Math.ceil(be.count/4),at=ke%x.width,V=Math.floor(ke/x.width),Se=$e,ae=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,at),t.pixelStorei(i.UNPACK_SKIP_ROWS,V),t.texSubImage2D(i.TEXTURE_2D,0,at,V,Se,ae,W,Z,x.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,te),t.pixelStorei(i.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(i.UNPACK_SKIP_ROWS,we)}}function Le(C,x,W){let Z=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Z=i.TEXTURE_3D);const ne=re(C,x),le=x.source;t.bindTexture(Z,C.__webglTexture,i.TEXTURE0+W);const ye=n.get(le);if(le.version!==ye.__version||ne===!0){if(t.activeTexture(i.TEXTURE0+W),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ae=wt.getPrimaries(wt.workingColorSpace),Ee=x.colorSpace===Oi?null:wt.getPrimaries(x.colorSpace),Pe=x.colorSpace===Oi||ae===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let oe=m(x.image,!1,s.maxTextureSize);oe=Tt(x,oe);const we=r.convert(x.format,x.colorSpace),Ge=r.convert(x.type);let Ae=y(x.internalFormat,we,Ge,x.normalized,x.colorSpace,x.isVideoTexture);it(Z,x);let be;const ke=x.mipmaps,$e=x.isVideoTexture!==!0,at=ye.__version===void 0||ne===!0,V=le.dataReady,Se=E(x,oe);if(x.isDepthTexture)Ae=A(x.format===es,x.type),at&&($e?t.texStorage2D(i.TEXTURE_2D,1,Ae,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Ae,oe.width,oe.height,0,we,Ge,null));else if(x.isDataTexture)if(ke.length>0){$e&&at&&t.texStorage2D(i.TEXTURE_2D,Se,Ae,ke[0].width,ke[0].height);for(let ae=0,Ee=ke.length;ae<Ee;ae++)be=ke[ae],$e?V&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,be.width,be.height,we,Ge,be.data):t.texImage2D(i.TEXTURE_2D,ae,Ae,be.width,be.height,0,we,Ge,be.data);x.generateMipmaps=!1}else $e?(at&&t.texStorage2D(i.TEXTURE_2D,Se,Ae,oe.width,oe.height),V&&ce(x,oe,we,Ge)):t.texImage2D(i.TEXTURE_2D,0,Ae,oe.width,oe.height,0,we,Ge,oe.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){$e&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ae,ke[0].width,ke[0].height,oe.depth);for(let ae=0,Ee=ke.length;ae<Ee;ae++)if(be=ke[ae],x.format!==Yn)if(we!==null)if($e){if(V)if(x.layerUpdates.size>0){const Pe=th(be.width,be.height,x.format,x.type);for(const ue of x.layerUpdates){const Ve=be.data.subarray(ue*Pe/be.data.BYTES_PER_ELEMENT,(ue+1)*Pe/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,ue,be.width,be.height,1,we,Ve)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,be.width,be.height,oe.depth,we,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Ae,be.width,be.height,oe.depth,0,be.data,0,0);else nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,be.width,be.height,oe.depth,we,Ge,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Ae,be.width,be.height,oe.depth,0,we,Ge,be.data)}else{$e&&at&&t.texStorage2D(i.TEXTURE_2D,Se,Ae,ke[0].width,ke[0].height);for(let ae=0,Ee=ke.length;ae<Ee;ae++)be=ke[ae],x.format!==Yn?we!==null?$e?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,be.width,be.height,we,be.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Ae,be.width,be.height,0,be.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?V&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,be.width,be.height,we,Ge,be.data):t.texImage2D(i.TEXTURE_2D,ae,Ae,be.width,be.height,0,we,Ge,be.data)}else if(x.isDataArrayTexture)if($e){if(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ae,oe.width,oe.height,oe.depth),V)if(x.layerUpdates.size>0){const ae=th(oe.width,oe.height,x.format,x.type);for(const Ee of x.layerUpdates){const Pe=oe.data.subarray(Ee*ae/oe.data.BYTES_PER_ELEMENT,(Ee+1)*ae/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ee,oe.width,oe.height,1,we,Ge,Pe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,we,Ge,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,oe.width,oe.height,oe.depth,0,we,Ge,oe.data);else if(x.isData3DTexture)$e?(at&&t.texStorage3D(i.TEXTURE_3D,Se,Ae,oe.width,oe.height,oe.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,we,Ge,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,oe.width,oe.height,oe.depth,0,we,Ge,oe.data);else if(x.isFramebufferTexture){if(at)if($e)t.texStorage2D(i.TEXTURE_2D,Se,Ae,oe.width,oe.height);else{let ae=oe.width,Ee=oe.height;for(let Pe=0;Pe<Se;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,Ae,ae,Ee,0,we,Ge,null),ae>>=1,Ee>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const ae=i.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),oe.parentNode!==ae){ae.appendChild(oe),f.add(x),ae.onpaint=Ee=>{const Pe=Ee.changedElements;for(const ue of f)Pe.includes(ue.image)&&(ue.needsUpdate=!0)},ae.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,oe);else{const Pe=i.RGBA,ue=i.RGBA,Ve=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Pe,ue,Ve,oe)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ke.length>0){if($e&&at){const ae=gt(ke[0]);t.texStorage2D(i.TEXTURE_2D,Se,Ae,ae.width,ae.height)}for(let ae=0,Ee=ke.length;ae<Ee;ae++)be=ke[ae],$e?V&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,we,Ge,be):t.texImage2D(i.TEXTURE_2D,ae,Ae,we,Ge,be);x.generateMipmaps=!1}else if($e){if(at){const ae=gt(oe);t.texStorage2D(i.TEXTURE_2D,Se,Ae,ae.width,ae.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,Ge,oe)}else t.texImage2D(i.TEXTURE_2D,0,Ae,we,Ge,oe);p(x)&&M(Z),ye.__version=le.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function Ye(C,x,W){if(x.image.length!==6)return;const Z=re(C,x),ne=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+W);const le=n.get(ne);if(ne.version!==le.__version||Z===!0){t.activeTexture(i.TEXTURE0+W);const ye=wt.getPrimaries(wt.workingColorSpace),te=x.colorSpace===Oi?null:wt.getPrimaries(x.colorSpace),oe=x.colorSpace===Oi||ye===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const we=x.isCompressedTexture||x.image[0].isCompressedTexture,Ge=x.image[0]&&x.image[0].isDataTexture,Ae=[];for(let ue=0;ue<6;ue++)!we&&!Ge?Ae[ue]=m(x.image[ue],!0,s.maxCubemapSize):Ae[ue]=Ge?x.image[ue].image:x.image[ue],Ae[ue]=Tt(x,Ae[ue]);const be=Ae[0],ke=r.convert(x.format,x.colorSpace),$e=r.convert(x.type),at=y(x.internalFormat,ke,$e,x.normalized,x.colorSpace),V=x.isVideoTexture!==!0,Se=le.__version===void 0||Z===!0,ae=ne.dataReady;let Ee=E(x,be);it(i.TEXTURE_CUBE_MAP,x);let Pe;if(we){V&&Se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,at,be.width,be.height);for(let ue=0;ue<6;ue++){Pe=Ae[ue].mipmaps;for(let Ve=0;Ve<Pe.length;Ve++){const Fe=Pe[Ve];x.format!==Yn?ke!==null?V?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve,0,0,Fe.width,Fe.height,ke,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve,at,Fe.width,Fe.height,0,Fe.data):nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve,0,0,Fe.width,Fe.height,ke,$e,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve,at,Fe.width,Fe.height,0,ke,$e,Fe.data)}}}else{if(Pe=x.mipmaps,V&&Se){Pe.length>0&&Ee++;const ue=gt(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,at,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Ge){V?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ae[ue].width,Ae[ue].height,ke,$e,Ae[ue].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,at,Ae[ue].width,Ae[ue].height,0,ke,$e,Ae[ue].data);for(let Ve=0;Ve<Pe.length;Ve++){const Ft=Pe[Ve].image[ue].image;V?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve+1,0,0,Ft.width,Ft.height,ke,$e,Ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve+1,at,Ft.width,Ft.height,0,ke,$e,Ft.data)}}else{V?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,ke,$e,Ae[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,at,ke,$e,Ae[ue]);for(let Ve=0;Ve<Pe.length;Ve++){const Fe=Pe[Ve];V?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve+1,0,0,ke,$e,Fe.image[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ve+1,at,ke,$e,Fe.image[ue])}}}p(x)&&M(i.TEXTURE_CUBE_MAP),le.__version=ne.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function He(C,x,W,Z,ne,le){const ye=r.convert(W.format,W.colorSpace),te=r.convert(W.type),oe=y(W.internalFormat,ye,te,W.normalized,W.colorSpace),we=n.get(x),Ge=n.get(W);if(Ge.__renderTarget=x,!we.__hasExternalTextures){const Ae=Math.max(1,x.width>>le),be=Math.max(1,x.height>>le);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,le,oe,Ae,be,x.depth,0,ye,te,null):t.texImage2D(ne,le,oe,Ae,be,0,ye,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),rt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ne,Ge.__webglTexture,0,Qe(x)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ne,Ge.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function vt(C,x,W){if(i.bindRenderbuffer(i.RENDERBUFFER,C),x.depthBuffer){const Z=x.depthTexture,ne=Z&&Z.isDepthTexture?Z.type:null,le=A(x.stencilBuffer,ne),ye=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;rt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Qe(x),le,x.width,x.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,Qe(x),le,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,le,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,C)}else{const Z=x.textures;for(let ne=0;ne<Z.length;ne++){const le=Z[ne],ye=r.convert(le.format,le.colorSpace),te=r.convert(le.type),oe=y(le.internalFormat,ye,te,le.normalized,le.colorSpace);rt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Qe(x),oe,x.width,x.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,Qe(x),oe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,oe,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function je(C,x,W){const Z=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=n.get(x.depthTexture);if(ne.__renderTarget=x,(!ne.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),ne.__webglTexture===void 0){ne.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),it(i.TEXTURE_CUBE_MAP,x.depthTexture);const we=r.convert(x.depthTexture.format),Ge=r.convert(x.depthTexture.type);let Ae;x.depthTexture.format===wi?Ae=i.DEPTH_COMPONENT24:x.depthTexture.format===es&&(Ae=i.DEPTH24_STENCIL8);for(let be=0;be<6;be++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ae,x.width,x.height,0,we,Ge,null)}}else X(x.depthTexture,0);const le=ne.__webglTexture,ye=Qe(x),te=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,oe=x.depthTexture.format===es?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===wi)rt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,te,le,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,oe,te,le,0);else if(x.depthTexture.format===es)rt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,te,le,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,oe,te,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function he(C){const x=n.get(C),W=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){const Z=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Z){const ne=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Z.removeEventListener("dispose",ne)};Z.addEventListener("dispose",ne),x.__depthDisposeCallback=ne}x.__boundDepthTexture=Z}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(W)for(let Z=0;Z<6;Z++)je(x.__webglFramebuffer[Z],C,Z);else{const Z=C.texture.mipmaps;Z&&Z.length>0?je(x.__webglFramebuffer[0],C,0):je(x.__webglFramebuffer,C,0)}else if(W){x.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Z]),x.__webglDepthbuffer[Z]===void 0)x.__webglDepthbuffer[Z]=i.createRenderbuffer(),vt(x.__webglDepthbuffer[Z],C,!1);else{const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=x.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,le)}}else{const Z=C.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),vt(x.__webglDepthbuffer,C,!1);else{const ne=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function me(C,x,W){const Z=n.get(C);x!==void 0&&He(Z.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&he(C)}function ge(C){const x=C.texture,W=n.get(C),Z=n.get(x);C.addEventListener("dispose",v);const ne=C.textures,le=C.isWebGLCubeRenderTarget===!0,ye=ne.length>1;if(ye||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=x.version,a.memory.textures++),le){W.__webglFramebuffer=[];for(let te=0;te<6;te++)if(x.mipmaps&&x.mipmaps.length>0){W.__webglFramebuffer[te]=[];for(let oe=0;oe<x.mipmaps.length;oe++)W.__webglFramebuffer[te][oe]=i.createFramebuffer()}else W.__webglFramebuffer[te]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){W.__webglFramebuffer=[];for(let te=0;te<x.mipmaps.length;te++)W.__webglFramebuffer[te]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(ye)for(let te=0,oe=ne.length;te<oe;te++){const we=n.get(ne[te]);we.__webglTexture===void 0&&(we.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&rt(C)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let te=0;te<ne.length;te++){const oe=ne[te];W.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[te]);const we=r.convert(oe.format,oe.colorSpace),Ge=r.convert(oe.type),Ae=y(oe.internalFormat,we,Ge,oe.normalized,oe.colorSpace,C.isXRRenderTarget===!0),be=Qe(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,be,Ae,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,W.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),vt(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),it(i.TEXTURE_CUBE_MAP,x);for(let te=0;te<6;te++)if(x.mipmaps&&x.mipmaps.length>0)for(let oe=0;oe<x.mipmaps.length;oe++)He(W.__webglFramebuffer[te][oe],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,oe);else He(W.__webglFramebuffer[te],C,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);p(x)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let te=0,oe=ne.length;te<oe;te++){const we=ne[te],Ge=n.get(we);let Ae=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ae=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ae,Ge.__webglTexture),it(Ae,we),He(W.__webglFramebuffer,C,we,i.COLOR_ATTACHMENT0+te,Ae,0),p(we)&&M(Ae)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(te=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,Z.__webglTexture),it(te,x),x.mipmaps&&x.mipmaps.length>0)for(let oe=0;oe<x.mipmaps.length;oe++)He(W.__webglFramebuffer[oe],C,x,i.COLOR_ATTACHMENT0,te,oe);else He(W.__webglFramebuffer,C,x,i.COLOR_ATTACHMENT0,te,0);p(x)&&M(te),t.unbindTexture()}C.depthBuffer&&he(C)}function Te(C){const x=C.textures;for(let W=0,Z=x.length;W<Z;W++){const ne=x[W];if(p(ne)){const le=S(C),ye=n.get(ne).__webglTexture;t.bindTexture(le,ye),M(le),t.unbindTexture()}}}const Me=[],Ke=[];function ze(C){if(C.samples>0){if(rt(C)===!1){const x=C.textures,W=C.width,Z=C.height;let ne=i.COLOR_BUFFER_BIT;const le=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(C),te=x.length>1;if(te)for(let we=0;we<x.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const oe=C.texture.mipmaps;oe&&oe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let we=0;we<x.length;we++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[we]);const Ge=n.get(x[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ge,0)}i.blitFramebuffer(0,0,W,Z,0,0,W,Z,ne,i.NEAREST),o===!0&&(Me.length=0,Ke.length=0,Me.push(i.COLOR_ATTACHMENT0+we),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Me.push(le),Ke.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let we=0;we<x.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,ye.__webglColorRenderbuffer[we]);const Ge=n.get(x[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,Ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&o){const x=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Qe(C){return Math.min(s.maxSamples,C.samples)}function rt(C){const x=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function B(C){const x=a.render.frame;h.get(C)!==x&&(h.set(C,x),C.update())}function Tt(C,x){const W=C.colorSpace,Z=C.format,ne=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==Ea&&W!==Oi&&(wt.getTransfer(W)===Nt?(Z!==Yn||ne!==Cn)&&nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):yt("WebGLTextures: Unsupported texture color space:",W)),x}function gt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=q,this.getTextureUnits=J,this.setTextureUnits=k,this.setTexture2D=X,this.setTexture2DArray=se,this.setTexture3D=fe,this.setTextureCube=de,this.rebindTextures=me,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=He,this.useMultisampledRTT=rt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function L_(i,e){function t(n,s=Oi){let r;const a=wt.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===Nl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ul)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===kh)return i.BYTE;if(n===Vh)return i.SHORT;if(n===yr)return i.UNSIGNED_SHORT;if(n===Il)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===qn)return i.FLOAT;if(n===Ei)return i.HALF_FLOAT;if(n===Wh)return i.ALPHA;if(n===Xh)return i.RGB;if(n===Yn)return i.RGBA;if(n===wi)return i.DEPTH_COMPONENT;if(n===es)return i.DEPTH_STENCIL;if(n===Fl)return i.RED;if(n===Ol)return i.RED_INTEGER;if(n===is)return i.RG;if(n===Bl)return i.RG_INTEGER;if(n===zl)return i.RGBA_INTEGER;if(n===ma||n===ga||n===_a||n===va)if(a===Nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xo||n===qo||n===Yo||n===Zo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ko||n===$o||n===Jo||n===jo||n===Qo||n===Ma||n===el)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ko||n===$o)return a===Nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Jo)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===jo)return r.COMPRESSED_R11_EAC;if(n===Qo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ma)return r.COMPRESSED_RG11_EAC;if(n===el)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===fl||n===dl||n===pl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===tl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===nl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===il)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===sl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===rl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===al)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ol)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ll)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===cl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ul)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ml||n===gl||n===_l)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ml)return a===Nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_l)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vl||n===xl||n===Sa||n===yl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===vl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===xl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const I_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,N_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class U_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new nu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new hi({vertexShader:I_,fragmentShader:N_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ie(new Zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F_ extends ki{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,h=null,f=null,u=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new U_,p={},M=t.getContextAttributes();let S=null,y=null;const A=[],E=[],R=new Q;let v=null;const w=new Rn;w.viewport=new Zt;const L=new Rn;L.viewport=new Zt;const U=[w,L],z=new Hd;let q=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let _e=A[re];return _e===void 0&&(_e=new Qa,A[re]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(re){let _e=A[re];return _e===void 0&&(_e=new Qa,A[re]=_e),_e.getGripSpace()},this.getHand=function(re){let _e=A[re];return _e===void 0&&(_e=new Qa,A[re]=_e),_e.getHandSpace()};function k(re){const _e=E.indexOf(re.inputSource);if(_e===-1)return;const ce=A[_e];ce!==void 0&&(ce.update(re.inputSource,re.frame,l||a),ce.dispatchEvent({type:re.type,data:re.inputSource}))}function $(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",F);for(let re=0;re<A.length;re++){const _e=E[re];_e!==null&&(E[re]=null,A[re].disconnect(_e))}q=null,J=null,m.reset();for(const re in p)delete p[re];e.setRenderTarget(S),d=null,u=null,f=null,s=null,y=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,n.isPresenting===!0&&nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){c=re,n.isPresenting===!0&&nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(re){l=re},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",$),s.addEventListener("inputsourceschange",F),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Le=null,Ye=null;M.depth&&(Ye=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=M.stencil?es:wi,Le=M.stencil?Mr:ci);const He={colorFormat:t.RGBA8,depthFormat:Ye,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(He),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new li(u.textureWidth,u.textureHeight,{format:Yn,type:Cn,depthTexture:new Vs(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ce={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new li(d.framebufferWidth,d.framebufferHeight,{format:Yn,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),it.setContext(s),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(re){for(let _e=0;_e<re.removed.length;_e++){const ce=re.removed[_e],Le=E.indexOf(ce);Le>=0&&(E[Le]=null,A[Le].disconnect(ce))}for(let _e=0;_e<re.added.length;_e++){const ce=re.added[_e];let Le=E.indexOf(ce);if(Le===-1){for(let He=0;He<A.length;He++)if(He>=E.length){E.push(ce),Le=He;break}else if(E[He]===null){E[He]=ce,Le=He;break}if(Le===-1)break}const Ye=A[Le];Ye&&Ye.connect(ce)}}const X=new I,se=new I;function fe(re,_e,ce){X.setFromMatrixPosition(_e.matrixWorld),se.setFromMatrixPosition(ce.matrixWorld);const Le=X.distanceTo(se),Ye=_e.projectionMatrix.elements,He=ce.projectionMatrix.elements,vt=Ye[14]/(Ye[10]-1),je=Ye[14]/(Ye[10]+1),he=(Ye[9]+1)/Ye[5],me=(Ye[9]-1)/Ye[5],ge=(Ye[8]-1)/Ye[0],Te=(He[8]+1)/He[0],Me=vt*ge,Ke=vt*Te,ze=Le/(-ge+Te),Qe=ze*-ge;if(_e.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(Qe),re.translateZ(ze),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Ye[10]===-1)re.projectionMatrix.copy(_e.projectionMatrix),re.projectionMatrixInverse.copy(_e.projectionMatrixInverse);else{const rt=vt+ze,B=je+ze,Tt=Me-Qe,gt=Ke+(Le-Qe),C=he*je/B*rt,x=me*je/B*rt;re.projectionMatrix.makePerspective(Tt,gt,C,x,rt,B),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function de(re,_e){_e===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(_e.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let _e=re.near,ce=re.far;m.texture!==null&&(m.depthNear>0&&(_e=m.depthNear),m.depthFar>0&&(ce=m.depthFar)),z.near=L.near=w.near=_e,z.far=L.far=w.far=ce,(q!==z.near||J!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),q=z.near,J=z.far),z.layers.mask=re.layers.mask|6,w.layers.mask=z.layers.mask&-5,L.layers.mask=z.layers.mask&-3;const Le=re.parent,Ye=z.cameras;de(z,Le);for(let He=0;He<Ye.length;He++)de(Ye[He],Le);Ye.length===2?fe(z,w,L):z.projectionMatrix.copy(w.projectionMatrix),ve(re,z,Le)};function ve(re,_e,ce){ce===null?re.matrix.copy(_e.matrixWorld):(re.matrix.copy(ce.matrixWorld),re.matrix.invert(),re.matrix.multiply(_e.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(_e.projectionMatrix),re.projectionMatrixInverse.copy(_e.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Sl*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&d===null))return o},this.setFoveation=function(re){o=re,u!==null&&(u.fixedFoveation=re),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=re)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(re){return p[re]};let Je=null;function St(re,_e){if(h=_e.getViewerPose(l||a),g=_e,h!==null){const ce=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Le=!1;ce.length!==z.cameras.length&&(z.cameras.length=0,Le=!0);for(let je=0;je<ce.length;je++){const he=ce[je];let me=null;if(d!==null)me=d.getViewport(he);else{const Te=f.getViewSubImage(u,he);me=Te.viewport,je===0&&(e.setRenderTargetTextures(y,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(y))}let ge=U[je];ge===void 0&&(ge=new Rn,ge.layers.enable(je),ge.viewport=new Zt,U[je]=ge),ge.matrix.fromArray(he.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(he.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(me.x,me.y,me.width,me.height),je===0&&(z.matrix.copy(ge.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Le===!0&&z.cameras.push(ge)}const Ye=s.enabledFeatures;if(Ye&&Ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const je=f.getDepthInformation(ce[0]);je&&je.isValid&&je.texture&&m.init(je,s.renderState)}if(Ye&&Ye.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let je=0;je<ce.length;je++){const he=ce[je].camera;if(he){let me=p[he];me||(me=new nu,p[he]=me);const ge=f.getCameraImage(he);me.sourceTexture=ge}}}}for(let ce=0;ce<A.length;ce++){const Le=E[ce],Ye=A[ce];Le!==null&&Ye!==void 0&&Ye.update(Le,_e,l||a)}Je&&Je(re,_e),_e.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_e}),g=null}const it=new _u;it.setAnimationLoop(St),this.setAnimationLoop=function(re){Je=re},this.dispose=function(){}}}const O_=new Ut,Eu=new lt;Eu.set(-1,0,0,0,1,0,0,0,1);function B_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,du(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,S,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&c(m,p)):p.isPointsMaterial?o(m,p,M,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Mn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Mn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),S=M.envMap,y=M.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(O_.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Eu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function c(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,M,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function z_(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(y,A){const E=A.program;n.uniformBlockBinding(y,E)}function l(y,A){let E=s[y.id];E===void 0&&(m(y),E=h(y),s[y.id]=E,y.addEventListener("dispose",M));const R=A.program;n.updateUBOMapping(y,R);const v=e.render.frame;r[y.id]!==v&&(u(y),r[y.id]=v)}function h(y){const A=f();y.__bindingPointIndex=A;const E=i.createBuffer(),R=y.__size,v=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,R,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,E),E}function f(){for(let y=0;y<c;y++)if(a.indexOf(y)===-1)return a.push(y),y;return yt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const A=s[y.id],E=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let v=0,w=E.length;v<w;v++){const L=E[v];if(Array.isArray(L))for(let U=0,z=L.length;U<z;U++)d(L[U],v,U,R);else d(L,v,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,A,E,R){if(_(y,A,E,R)===!0){const v=y.__offset,w=y.value;if(Array.isArray(w)){let L=0;for(let U=0;U<w.length;U++){const z=w[U],q=p(z);g(z,y.__data,L),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,y.__data)}}function g(y,A,E){typeof y=="number"||typeof y=="boolean"?A[0]=y:y.isMatrix3?(A[0]=y.elements[0],A[1]=y.elements[1],A[2]=y.elements[2],A[3]=0,A[4]=y.elements[3],A[5]=y.elements[4],A[6]=y.elements[5],A[7]=0,A[8]=y.elements[6],A[9]=y.elements[7],A[10]=y.elements[8],A[11]=0):ArrayBuffer.isView(y)?A.set(new y.constructor(y.buffer,y.byteOffset,A.length)):y.toArray(A,E)}function _(y,A,E,R){const v=y.value,w=A+"_"+E;if(R[w]===void 0)return typeof v=="number"||typeof v=="boolean"?R[w]=v:ArrayBuffer.isView(v)?R[w]=v.slice():R[w]=v.clone(),!0;{const L=R[w];if(typeof v=="number"||typeof v=="boolean"){if(L!==v)return R[w]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(L.equals(v)===!1)return L.copy(v),!0}}return!1}function m(y){const A=y.uniforms;let E=0;const R=16;for(let w=0,L=A.length;w<L;w++){const U=Array.isArray(A[w])?A[w]:[A[w]];for(let z=0,q=U.length;z<q;z++){const J=U[z],k=Array.isArray(J.value)?J.value:[J.value];for(let $=0,F=k.length;$<F;$++){const X=k[$],se=p(X),fe=E%R,de=fe%se.boundary,ve=fe+de;E+=de,ve!==0&&R-ve<se.storage&&(E+=R-ve),J.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=E,E+=se.storage}}}const v=E%R;return v>0&&(E+=R-v),y.__size=E,y.__cache={},this}function p(y){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(A.boundary=16,A.storage=y.byteLength):nt("WebGLRenderer: Unsupported uniform value type.",y),A}function M(y){const A=y.target;A.removeEventListener("dispose",M);const E=a.indexOf(A.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function S(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:o,update:l,dispose:S}}const k_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ti=null;function V_(){return ti===null&&(ti=new Qh(k_,16,16,is,Ei),ti.name="DFG_LUT",ti.minFilter=gn,ti.magFilter=gn,ti.wrapS=xi,ti.wrapT=xi,ti.generateMipmaps=!1,ti.needsUpdate=!0),ti}class H_{constructor(e={}){const{canvas:t=Sf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Cn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=d,m=new Set([zl,Bl,Ol]),p=new Set([Cn,ci,yr,Mr,Nl,Ul]),M=new Uint32Array(4),S=new Int32Array(4),y=new I;let A=null,E=null;const R=[],v=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let U=!1,z=null,q=null,J=null,k=null;this._outputColorSpace=hn;let $=0,F=0,X=null,se=-1,fe=null;const de=new Zt,ve=new Zt;let Je=null;const St=new ht(0);let it=0,re=t.width,_e=t.height,ce=1,Le=null,Ye=null;const He=new Zt(0,0,re,_e),vt=new Zt(0,0,re,_e);let je=!1;const he=new Wl;let me=!1,ge=!1;const Te=new Ut,Me=new I,Ke=new Zt,ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function rt(){return X===null?ce:1}let B=n;function Tt(b,G){return t.getContext(b,G)}try{const b={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pl}`),t.addEventListener("webglcontextlost",Ft,!1),t.addEventListener("webglcontextrestored",Ct,!1),t.addEventListener("webglcontextcreationerror",Pn,!1),B===null){const G="webgl2";if(B=Tt(G,b),B===null)throw Tt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw yt("WebGLRenderer: "+b.message),b}let gt,C,x,W,Z,ne,le,ye,te,oe,we,Ge,Ae,be,ke,$e,at,V,Se,ae,Ee,Pe,ue;function Ve(){gt=new Vm(B),gt.init(),Ee=new L_(B,gt),C=new Im(B,gt,e,Ee),x=new P_(B,gt),C.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),q=B.createFramebuffer(),J=B.createFramebuffer(),k=B.createFramebuffer(),W=new Wm(B),Z=new g_,ne=new D_(B,gt,x,Z,C,Ee,W),le=new km(L),ye=new Zd(B),Pe=new Dm(B,ye),te=new Hm(B,ye,W,Pe),oe=new qm(B,te,ye,Pe,W),V=new Xm(B,C,ne),ke=new Nm(Z),we=new m_(L,le,gt,C,Pe,ke),Ge=new B_(L,Z),Ae=new v_,be=new E_(gt),at=new Pm(L,le,x,oe,g,o),$e=new C_(L,oe,C),ue=new z_(B,W,C,x),Se=new Lm(B,gt,W),ae=new Gm(B,gt,W),W.programs=we.programs,L.capabilities=C,L.extensions=gt,L.properties=Z,L.renderLists=Ae,L.shadowMap=$e,L.state=x,L.info=W}Ve(),_!==Cn&&(w=new Zm(_,t.width,t.height,c,s,r));const Fe=new F_(L,B);this.xr=Fe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const b=gt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=gt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(b){b!==void 0&&(ce=b,this.setSize(re,_e,!1))},this.getSize=function(b){return b.set(re,_e)},this.setSize=function(b,G,j=!0){if(Fe.isPresenting){nt("WebGLRenderer: Can't change size while VR device is presenting.");return}re=b,_e=G,t.width=Math.floor(b*ce),t.height=Math.floor(G*ce),j===!0&&(t.style.width=b+"px",t.style.height=G+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,b,G)},this.getDrawingBufferSize=function(b){return b.set(re*ce,_e*ce).floor()},this.setDrawingBufferSize=function(b,G,j){re=b,_e=G,ce=j,t.width=Math.floor(b*j),t.height=Math.floor(G*j),this.setViewport(0,0,b,G)},this.setEffects=function(b){if(_===Cn){yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let G=0;G<b.length;G++)if(b[G].isOutputPass===!0){nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(de)},this.getViewport=function(b){return b.copy(He)},this.setViewport=function(b,G,j,Y){b.isVector4?He.set(b.x,b.y,b.z,b.w):He.set(b,G,j,Y),x.viewport(de.copy(He).multiplyScalar(ce).round())},this.getScissor=function(b){return b.copy(vt)},this.setScissor=function(b,G,j,Y){b.isVector4?vt.set(b.x,b.y,b.z,b.w):vt.set(b,G,j,Y),x.scissor(ve.copy(vt).multiplyScalar(ce).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(b){x.setScissorTest(je=b)},this.setOpaqueSort=function(b){Le=b},this.setTransparentSort=function(b){Ye=b},this.getClearColor=function(b){return b.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(b=!0,G=!0,j=!0){let Y=0;if(b){let K=!1;if(X!==null){const Re=X.texture.format;K=m.has(Re)}if(K){const Re=X.texture.type,Ne=p.has(Re),Ce=at.getClearColor(),Oe=at.getClearAlpha(),We=Ce.r,ot=Ce.g,ut=Ce.b;Ne?(M[0]=We,M[1]=ot,M[2]=ut,M[3]=Oe,B.clearBufferuiv(B.COLOR,0,M)):(S[0]=We,S[1]=ot,S[2]=ut,S[3]=Oe,B.clearBufferiv(B.COLOR,0,S))}else Y|=B.COLOR_BUFFER_BIT}G&&(Y|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Y|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&B.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),z=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",Ct,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),at.dispose(),Ae.dispose(),be.dispose(),Z.dispose(),le.dispose(),oe.dispose(),Pe.dispose(),ue.dispose(),we.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Ys),Fe.removeEventListener("sessionend",Zs),Bn.stop()};function Ft(b){b.preventDefault(),Aa("WebGLRenderer: Context Lost."),U=!0}function Ct(){Aa("WebGLRenderer: Context Restored."),U=!1;const b=W.autoReset,G=$e.enabled,j=$e.autoUpdate,Y=$e.needsUpdate,K=$e.type;Ve(),W.autoReset=b,$e.enabled=G,$e.autoUpdate=j,$e.needsUpdate=Y,$e.type=K}function Pn(b){yt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function fn(b){const G=b.target;G.removeEventListener("dispose",fn),as(G)}function as(b){Rr(b),Z.remove(b)}function Rr(b){const G=Z.get(b).programs;G!==void 0&&(G.forEach(function(j){we.releaseProgram(j)}),b.isShaderMaterial&&we.releaseShaderCache(b))}this.renderBufferDirect=function(b,G,j,Y,K,Re){G===null&&(G=ze);const Ne=K.isMesh&&K.matrixWorld.determinantAffine()<0,Ce=Lr(b,G,j,Y,K);x.setMaterial(Y,Ne);let Oe=j.index,We=1;if(Y.wireframe===!0){if(Oe=te.getWireframeAttribute(j),Oe===void 0)return;We=2}const ot=j.drawRange,ut=j.attributes.position;let Xe=ot.start*We,Be=(ot.start+ot.count)*We;Re!==null&&(Xe=Math.max(Xe,Re.start*We),Be=Math.min(Be,(Re.start+Re.count)*We)),Oe!==null?(Xe=Math.max(Xe,0),Be=Math.min(Be,Oe.count)):ut!=null&&(Xe=Math.max(Xe,0),Be=Math.min(Be,ut.count));const Vt=Be-Xe;if(Vt<0||Vt===1/0)return;Pe.setup(K,Y,Ce,j,Oe);let Gt,Rt=Se;if(Oe!==null&&(Gt=ye.get(Oe),Rt=ae,Rt.setIndex(Gt)),K.isMesh)Y.wireframe===!0?(x.setLineWidth(Y.wireframeLinewidth*rt()),Rt.setMode(B.LINES)):Rt.setMode(B.TRIANGLES);else if(K.isLine){let sn=Y.linewidth;sn===void 0&&(sn=1),x.setLineWidth(sn*rt()),K.isLineSegments?Rt.setMode(B.LINES):K.isLineLoop?Rt.setMode(B.LINE_LOOP):Rt.setMode(B.LINE_STRIP)}else K.isPoints?Rt.setMode(B.POINTS):K.isSprite&&Rt.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(gt.get("WEBGL_multi_draw"))Rt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const sn=K._multiDrawStarts,Ue=K._multiDrawCounts,dn=K._multiDrawCount,bt=Oe?ye.get(Oe).bytesPerElement:1,vn=Z.get(Y).currentProgram.getUniforms();for(let bn=0;bn<dn;bn++)vn.setValue(B,"_gl_DrawID",bn),Rt.render(sn[bn]/bt,Ue[bn])}else if(K.isInstancedMesh)Rt.renderInstances(Xe,Vt,K.count);else if(j.isInstancedBufferGeometry){const sn=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ue=Math.min(j.instanceCount,sn);Rt.renderInstances(Xe,Vt,Ue)}else Rt.render(Xe,Vt)};function $n(b,G,j){b.transparent===!0&&b.side===Jt&&b.forceSinglePass===!1?(b.side=Mn,b.needsUpdate=!0,ls(b,G,j),b.side=zi,b.needsUpdate=!0,ls(b,G,j),b.side=Jt):ls(b,G,j)}this.compile=function(b,G,j=null){j===null&&(j=b),E=be.get(j),E.init(G),v.push(E),j.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),b!==j&&b.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),E.setupLights();const Y=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Re=K.material;if(Re)if(Array.isArray(Re))for(let Ne=0;Ne<Re.length;Ne++){const Ce=Re[Ne];$n(Ce,j,K),Y.add(Ce)}else $n(Re,j,K),Y.add(Re)}),E=v.pop(),Y},this.compileAsync=function(b,G,j=null){const Y=this.compile(b,G,j);return new Promise(K=>{function Re(){if(Y.forEach(function(Ne){Z.get(Ne).currentProgram.isReady()&&Y.delete(Ne)}),Y.size===0){K(b);return}setTimeout(Re,10)}gt.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Hi=null;function qs(b){Hi&&Hi(b)}function Ys(){Bn.stop()}function Zs(){Bn.start()}const Bn=new _u;Bn.setAnimationLoop(qs),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(b){Hi=b,Fe.setAnimationLoop(b),b===null?Bn.stop():Bn.start()},Fe.addEventListener("sessionstart",Ys),Fe.addEventListener("sessionend",Zs),this.render=function(b,G){if(G!==void 0&&G.isCamera!==!0){yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;z!==null&&z.renderStart(b,G);const j=Fe.enabled===!0&&Fe.isPresenting===!0,Y=w!==null&&(X===null||j)&&w.begin(L,X);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(G),G=Fe.getCamera()),b.isScene===!0&&b.onBeforeRender(L,b,G,X),E=be.get(b,v.length),E.init(G),E.state.textureUnits=ne.getTextureUnits(),v.push(E),Te.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),he.setFromProjectionMatrix(Te,ai,G.reversedDepth),ge=this.localClippingEnabled,me=ke.init(this.clippingPlanes,ge),A=Ae.get(b,R.length),A.init(),R.push(A),Fe.enabled===!0&&Fe.isPresenting===!0){const Ne=L.xr.getDepthSensingMesh();Ne!==null&&Gi(Ne,G,-1/0,L.sortObjects)}Gi(b,G,0,L.sortObjects),A.finish(),L.sortObjects===!0&&A.sort(Le,Ye,G.reversedDepth),Qe=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,Qe&&at.addToRenderList(A,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),me===!0&&ke.beginShadows();const K=E.state.shadowsArray;if($e.render(K,b,G),me===!0&&ke.endShadows(),(Y&&w.hasRenderPass())===!1){const Ne=A.opaque,Ce=A.transmissive;if(E.setupLights(),G.isArrayCamera){const Oe=G.cameras;if(Ce.length>0)for(let We=0,ot=Oe.length;We<ot;We++){const ut=Oe[We];Ks(Ne,Ce,b,ut)}Qe&&at.render(b);for(let We=0,ot=Oe.length;We<ot;We++){const ut=Oe[We];Cr(A,b,ut,ut.viewport)}}else Ce.length>0&&Ks(Ne,Ce,b,G),Qe&&at.render(b),Cr(A,b,G)}X!==null&&F===0&&(ne.updateMultisampleRenderTarget(X),ne.updateRenderTargetMipmap(X)),Y&&w.end(L),b.isScene===!0&&b.onAfterRender(L,b,G),Pe.resetDefaultState(),se=-1,fe=null,v.pop(),v.length>0?(E=v[v.length-1],ne.setTextureUnits(E.state.textureUnits),me===!0&&ke.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?A=R[R.length-1]:A=null,z!==null&&z.renderEnd()};function Gi(b,G,j,Y){if(b.visible===!1)return;if(b.layers.test(G.layers)){if(b.isGroup)j=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(G);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||he.intersectsSprite(b)){Y&&Ke.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Te);const Ne=oe.update(b),Ce=b.material;Ce.visible&&A.push(b,Ne,Ce,j,Ke.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||he.intersectsObject(b))){const Ne=oe.update(b),Ce=b.material;if(Y&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ke.copy(b.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Ke.copy(Ne.boundingSphere.center)),Ke.applyMatrix4(b.matrixWorld).applyMatrix4(Te)),Array.isArray(Ce)){const Oe=Ne.groups;for(let We=0,ot=Oe.length;We<ot;We++){const ut=Oe[We],Xe=Ce[ut.materialIndex];Xe&&Xe.visible&&A.push(b,Ne,Xe,j,Ke.z,ut)}}else Ce.visible&&A.push(b,Ne,Ce,j,Ke.z,null)}}const Re=b.children;for(let Ne=0,Ce=Re.length;Ne<Ce;Ne++)Gi(Re[Ne],G,j,Y)}function Cr(b,G,j,Y){const{opaque:K,transmissive:Re,transparent:Ne}=b;E.setupLightsView(j),me===!0&&ke.setGlobalState(L.clippingPlanes,j),Y&&x.viewport(de.copy(Y)),K.length>0&&os(K,G,j),Re.length>0&&os(Re,G,j),Ne.length>0&&os(Ne,G,j),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Ks(b,G,j,Y){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[Y.id]===void 0){const Xe=gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[Y.id]=new li(1,1,{generateMipmaps:!0,type:Xe?Ei:Cn,minFilter:Qi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:wt.workingColorSpace})}const Re=E.state.transmissionRenderTarget[Y.id],Ne=Y.viewport||de;Re.setSize(Ne.z*L.transmissionResolutionScale,Ne.w*L.transmissionResolutionScale);const Ce=L.getRenderTarget(),Oe=L.getActiveCubeFace(),We=L.getActiveMipmapLevel();L.setRenderTarget(Re),L.getClearColor(St),it=L.getClearAlpha(),it<1&&L.setClearColor(16777215,.5),L.clear(),Qe&&at.render(j);const ot=L.toneMapping;L.toneMapping=oi;const ut=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),E.setupLightsView(Y),me===!0&&ke.setGlobalState(L.clippingPlanes,Y),os(b,j,Y),ne.updateMultisampleRenderTarget(Re),ne.updateRenderTargetMipmap(Re),gt.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Be=0,Vt=G.length;Be<Vt;Be++){const Gt=G[Be],{object:Rt,geometry:sn,material:Ue,group:dn}=Gt;if(Ue.side===Jt&&Rt.layers.test(Y.layers)){const bt=Ue.side;Ue.side=Mn,Ue.needsUpdate=!0,Wi(Rt,j,Y,sn,Ue,dn),Ue.side=bt,Ue.needsUpdate=!0,Xe=!0}}Xe===!0&&(ne.updateMultisampleRenderTarget(Re),ne.updateRenderTargetMipmap(Re))}L.setRenderTarget(Ce,Oe,We),L.setClearColor(St,it),ut!==void 0&&(Y.viewport=ut),L.toneMapping=ot}function os(b,G,j){const Y=G.isScene===!0?G.overrideMaterial:null;for(let K=0,Re=b.length;K<Re;K++){const Ne=b[K],{object:Ce,geometry:Oe,group:We}=Ne;let ot=Ne.material;ot.allowOverride===!0&&Y!==null&&(ot=Y),Ce.layers.test(j.layers)&&Wi(Ce,G,j,Oe,ot,We)}}function Wi(b,G,j,Y,K,Re){b.onBeforeRender(L,G,j,Y,K,Re),b.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(L,G,j,Y,b,Re),K.transparent===!0&&K.side===Jt&&K.forceSinglePass===!1?(K.side=Mn,K.needsUpdate=!0,L.renderBufferDirect(j,G,Y,K,b,Re),K.side=zi,K.needsUpdate=!0,L.renderBufferDirect(j,G,Y,K,b,Re),K.side=Jt):L.renderBufferDirect(j,G,Y,K,b,Re),b.onAfterRender(L,G,j,Y,K,Re)}function ls(b,G,j){G.isScene!==!0&&(G=ze);const Y=Z.get(b),K=E.state.lights,Re=E.state.shadowsArray,Ne=K.state.version,Ce=we.getParameters(b,K.state,Re,G,j,E.state.lightProbeGridArray),Oe=we.getProgramCacheKey(Ce);let We=Y.programs;Y.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?G.environment:null,Y.fog=G.fog;const ot=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;Y.envMap=le.get(b.envMap||Y.environment,ot),Y.envMapRotation=Y.environment!==null&&b.envMap===null?G.environmentRotation:b.envMapRotation,We===void 0&&(b.addEventListener("dispose",fn),We=new Map,Y.programs=We);let ut=We.get(Oe);if(ut!==void 0){if(Y.currentProgram===ut&&Y.lightsStateVersion===Ne)return Dr(b,Ce),ut}else Ce.uniforms=we.getUniforms(b),z!==null&&b.isNodeMaterial&&z.build(b,j,Ce),b.onBeforeCompile(Ce,L),ut=we.acquireProgram(Ce,Oe),We.set(Oe,ut),Y.uniforms=Ce.uniforms;const Xe=Y.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Xe.clippingPlanes=ke.uniform),Dr(b,Ce),Y.needsLights=Ha(b),Y.lightsStateVersion=Ne,Y.needsLights&&(Xe.ambientLightColor.value=K.state.ambient,Xe.lightProbe.value=K.state.probe,Xe.directionalLights.value=K.state.directional,Xe.directionalLightShadows.value=K.state.directionalShadow,Xe.spotLights.value=K.state.spot,Xe.spotLightShadows.value=K.state.spotShadow,Xe.rectAreaLights.value=K.state.rectArea,Xe.ltc_1.value=K.state.rectAreaLTC1,Xe.ltc_2.value=K.state.rectAreaLTC2,Xe.pointLights.value=K.state.point,Xe.pointLightShadows.value=K.state.pointShadow,Xe.hemisphereLights.value=K.state.hemi,Xe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Xe.spotLightMatrix.value=K.state.spotLightMatrix,Xe.spotLightMap.value=K.state.spotLightMap,Xe.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.lightProbeGrid=E.state.lightProbeGridArray.length>0,Y.currentProgram=ut,Y.uniformsList=null,ut}function Pr(b){if(b.uniformsList===null){const G=b.currentProgram.getUniforms();b.uniformsList=ya.seqWithValue(G.seq,b.uniforms)}return b.uniformsList}function Dr(b,G){const j=Z.get(b);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.batchingColor=G.batchingColor,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.instancingMorph=G.instancingMorph,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function zn(b,G){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(G.matrixWorld);for(let j=0,Y=b.length;j<Y;j++){const K=b[j];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function Lr(b,G,j,Y,K){G.isScene!==!0&&(G=ze),ne.resetTextureUnits();const Re=G.fog,Ne=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?G.environment:null,Ce=X===null?L.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:wt.workingColorSpace,Oe=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,We=le.get(Y.envMap||Ne,Oe),ot=Y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,ut=!!j.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Xe=!!j.morphAttributes.position,Be=!!j.morphAttributes.normal,Vt=!!j.morphAttributes.color;let Gt=oi;Y.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Gt=L.toneMapping);const Rt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,sn=Rt!==void 0?Rt.length:0,Ue=Z.get(Y),dn=E.state.lights;if(me===!0&&(ge===!0||b!==fe)){const Ot=b===fe&&Y.id===se;ke.setState(Y,b,Ot)}let bt=!1;Y.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==dn.state.version||Ue.outputColorSpace!==Ce||K.isBatchedMesh&&Ue.batching===!1||!K.isBatchedMesh&&Ue.batching===!0||K.isBatchedMesh&&Ue.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ue.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ue.instancing===!1||!K.isInstancedMesh&&Ue.instancing===!0||K.isSkinnedMesh&&Ue.skinning===!1||!K.isSkinnedMesh&&Ue.skinning===!0||K.isInstancedMesh&&Ue.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ue.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ue.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ue.instancingMorph===!1&&K.morphTexture!==null||Ue.envMap!==We||Y.fog===!0&&Ue.fog!==Re||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ke.numPlanes||Ue.numIntersection!==ke.numIntersection)||Ue.vertexAlphas!==ot||Ue.vertexTangents!==ut||Ue.morphTargets!==Xe||Ue.morphNormals!==Be||Ue.morphColors!==Vt||Ue.toneMapping!==Gt||Ue.morphTargetsCount!==sn||!!Ue.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,Ue.__version=Y.version);let vn=Ue.currentProgram;bt===!0&&(vn=ls(Y,G,K),z&&Y.isNodeMaterial&&z.onUpdateProgram(Y,vn,Ue));let bn=!1,Jn=!1,Dn=!1;const Pt=vn.getUniforms(),Wt=Ue.uniforms;if(x.useProgram(vn.program)&&(bn=!0,Jn=!0,Dn=!0),Y.id!==se&&(se=Y.id,Jn=!0),Ue.needsLights){const Ot=zn(E.state.lightProbeGridArray,K);Ue.lightProbeGrid!==Ot&&(Ue.lightProbeGrid=Ot,Jn=!0)}if(bn||fe!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Pt.setValue(B,"projectionMatrix",b.projectionMatrix),Pt.setValue(B,"viewMatrix",b.matrixWorldInverse);const kn=Pt.map.cameraPosition;kn!==void 0&&kn.setValue(B,Me.setFromMatrixPosition(b.matrixWorld)),C.logarithmicDepthBuffer&&Pt.setValue(B,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Pt.setValue(B,"isOrthographic",b.isOrthographicCamera===!0),fe!==b&&(fe=b,Jn=!0,Dn=!0)}if(Ue.needsLights&&(dn.state.directionalShadowMap.length>0&&Pt.setValue(B,"directionalShadowMap",dn.state.directionalShadowMap,ne),dn.state.spotShadowMap.length>0&&Pt.setValue(B,"spotShadowMap",dn.state.spotShadowMap,ne),dn.state.pointShadowMap.length>0&&Pt.setValue(B,"pointShadowMap",dn.state.pointShadowMap,ne)),K.isSkinnedMesh){Pt.setOptional(B,K,"bindMatrix"),Pt.setOptional(B,K,"bindMatrixInverse");const Ot=K.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Pt.setValue(B,"boneTexture",Ot.boneTexture,ne))}K.isBatchedMesh&&(Pt.setOptional(B,K,"batchingTexture"),Pt.setValue(B,"batchingTexture",K._matricesTexture,ne),Pt.setOptional(B,K,"batchingIdTexture"),Pt.setValue(B,"batchingIdTexture",K._indirectTexture,ne),Pt.setOptional(B,K,"batchingColorTexture"),K._colorsTexture!==null&&Pt.setValue(B,"batchingColorTexture",K._colorsTexture,ne));const jn=j.morphAttributes;if((jn.position!==void 0||jn.normal!==void 0||jn.color!==void 0)&&V.update(K,j,vn),(Jn||Ue.receiveShadow!==K.receiveShadow)&&(Ue.receiveShadow=K.receiveShadow,Pt.setValue(B,"receiveShadow",K.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&G.environment!==null&&(Wt.envMapIntensity.value=G.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=V_()),Jn){if(Pt.setValue(B,"toneMappingExposure",L.toneMappingExposure),Ue.needsLights&&Va(Wt,Dn),Re&&Y.fog===!0&&Ge.refreshFogUniforms(Wt,Re),Ge.refreshMaterialUniforms(Wt,Y,ce,_e,E.state.transmissionRenderTarget[b.id]),Ue.needsLights&&Ue.lightProbeGrid){const Ot=Ue.lightProbeGrid;Wt.probesSH.value=Ot.texture,Wt.probesMin.value.copy(Ot.boundingBox.min),Wt.probesMax.value.copy(Ot.boundingBox.max),Wt.probesResolution.value.copy(Ot.resolution)}ya.upload(B,Pr(Ue),Wt,ne)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ya.upload(B,Pr(Ue),Wt,ne),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Pt.setValue(B,"center",K.center),Pt.setValue(B,"modelViewMatrix",K.modelViewMatrix),Pt.setValue(B,"normalMatrix",K.normalMatrix),Pt.setValue(B,"modelMatrix",K.matrixWorld),Y.uniformsGroups!==void 0){const Ot=Y.uniformsGroups;for(let kn=0,ui=Ot.length;kn<ui;kn++){const Ir=Ot[kn];ue.update(Ir,vn),ue.bind(Ir,vn)}}return vn}function Va(b,G){b.ambientLightColor.needsUpdate=G,b.lightProbe.needsUpdate=G,b.directionalLights.needsUpdate=G,b.directionalLightShadows.needsUpdate=G,b.pointLights.needsUpdate=G,b.pointLightShadows.needsUpdate=G,b.spotLights.needsUpdate=G,b.spotLightShadows.needsUpdate=G,b.rectAreaLights.needsUpdate=G,b.hemisphereLights.needsUpdate=G}function Ha(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(b,G,j){const Y=Z.get(b);Y.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Z.get(b.texture).__webglTexture=G,Z.get(b.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:j,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,G){const j=Z.get(b);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(b,G=0,j=0){X=b,$=G,F=j;let Y=null,K=!1,Re=!1;if(b){const Ce=Z.get(b);if(Ce.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(B.FRAMEBUFFER,Ce.__webglFramebuffer),de.copy(b.viewport),ve.copy(b.scissor),Je=b.scissorTest,x.viewport(de),x.scissor(ve),x.setScissorTest(Je),se=-1;return}else if(Ce.__webglFramebuffer===void 0)ne.setupRenderTarget(b);else if(Ce.__hasExternalTextures)ne.rebindTextures(b,Z.get(b.texture).__webglTexture,Z.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ot=b.depthTexture;if(Ce.__boundDepthTexture!==ot){if(ot!==null&&Z.has(ot)&&(b.width!==ot.image.width||b.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(b)}}const Oe=b.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Re=!0);const We=Z.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(We[G])?Y=We[G][j]:Y=We[G],K=!0):b.samples>0&&ne.useMultisampledRTT(b)===!1?Y=Z.get(b).__webglMultisampledFramebuffer:Array.isArray(We)?Y=We[j]:Y=We,de.copy(b.viewport),ve.copy(b.scissor),Je=b.scissorTest}else de.copy(He).multiplyScalar(ce).floor(),ve.copy(vt).multiplyScalar(ce).floor(),Je=je;if(j!==0&&(Y=q),x.bindFramebuffer(B.FRAMEBUFFER,Y)&&x.drawBuffers(b,Y),x.viewport(de),x.scissor(ve),x.setScissorTest(Je),K){const Ce=Z.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ce.__webglTexture,j)}else if(Re){const Ce=G;for(let Oe=0;Oe<b.textures.length;Oe++){const We=Z.get(b.textures[Oe]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Oe,We.__webglTexture,j,Ce)}}else if(b!==null&&j!==0){const Ce=Z.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ce.__webglTexture,j)}se=-1},this.readRenderTargetPixels=function(b,G,j,Y,K,Re,Ne,Ce=0){if(!(b&&b.isWebGLRenderTarget)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ne!==void 0&&(Oe=Oe[Ne]),Oe){x.bindFramebuffer(B.FRAMEBUFFER,Oe);try{const We=b.textures[Ce],ot=We.format,ut=We.type;if(b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ce),!C.textureFormatReadable(ot)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(ut)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=b.width-Y&&j>=0&&j<=b.height-K&&B.readPixels(G,j,Y,K,Ee.convert(ot),Ee.convert(ut),Re)}finally{const We=X!==null?Z.get(X).__webglFramebuffer:null;x.bindFramebuffer(B.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(b,G,j,Y,K,Re,Ne,Ce=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ne!==void 0&&(Oe=Oe[Ne]),Oe)if(G>=0&&G<=b.width-Y&&j>=0&&j<=b.height-K){x.bindFramebuffer(B.FRAMEBUFFER,Oe);const We=b.textures[Ce],ot=We.format,ut=We.type;if(b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ce),!C.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Xe),B.bufferData(B.PIXEL_PACK_BUFFER,Re.byteLength,B.STREAM_READ),B.readPixels(G,j,Y,K,Ee.convert(ot),Ee.convert(ut),0);const Be=X!==null?Z.get(X).__webglFramebuffer:null;x.bindFramebuffer(B.FRAMEBUFFER,Be);const Vt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await bf(B,Vt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Xe),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Re),B.deleteBuffer(Xe),B.deleteSync(Vt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,G=null,j=0){const Y=Math.pow(2,-j),K=Math.floor(b.image.width*Y),Re=Math.floor(b.image.height*Y),Ne=G!==null?G.x:0,Ce=G!==null?G.y:0;ne.setTexture2D(b,0),B.copyTexSubImage2D(B.TEXTURE_2D,j,0,0,Ne,Ce,K,Re),x.unbindTexture()},this.copyTextureToTexture=function(b,G,j=null,Y=null,K=0,Re=0){let Ne,Ce,Oe,We,ot,ut,Xe,Be,Vt;const Gt=b.isCompressedTexture?b.mipmaps[Re]:b.image;if(j!==null)Ne=j.max.x-j.min.x,Ce=j.max.y-j.min.y,Oe=j.isBox3?j.max.z-j.min.z:1,We=j.min.x,ot=j.min.y,ut=j.isBox3?j.min.z:0;else{const Wt=Math.pow(2,-K);Ne=Math.floor(Gt.width*Wt),Ce=Math.floor(Gt.height*Wt),b.isDataArrayTexture?Oe=Gt.depth:b.isData3DTexture?Oe=Math.floor(Gt.depth*Wt):Oe=1,We=0,ot=0,ut=0}Y!==null?(Xe=Y.x,Be=Y.y,Vt=Y.z):(Xe=0,Be=0,Vt=0);const Rt=Ee.convert(G.format),sn=Ee.convert(G.type);let Ue;G.isData3DTexture?(ne.setTexture3D(G,0),Ue=B.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(ne.setTexture2DArray(G,0),Ue=B.TEXTURE_2D_ARRAY):(ne.setTexture2D(G,0),Ue=B.TEXTURE_2D),x.activeTexture(B.TEXTURE0),x.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,G.flipY),x.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),x.pixelStorei(B.UNPACK_ALIGNMENT,G.unpackAlignment);const dn=x.getParameter(B.UNPACK_ROW_LENGTH),bt=x.getParameter(B.UNPACK_IMAGE_HEIGHT),vn=x.getParameter(B.UNPACK_SKIP_PIXELS),bn=x.getParameter(B.UNPACK_SKIP_ROWS),Jn=x.getParameter(B.UNPACK_SKIP_IMAGES);x.pixelStorei(B.UNPACK_ROW_LENGTH,Gt.width),x.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Gt.height),x.pixelStorei(B.UNPACK_SKIP_PIXELS,We),x.pixelStorei(B.UNPACK_SKIP_ROWS,ot),x.pixelStorei(B.UNPACK_SKIP_IMAGES,ut);const Dn=b.isDataArrayTexture||b.isData3DTexture,Pt=G.isDataArrayTexture||G.isData3DTexture;if(b.isDepthTexture){const Wt=Z.get(b),jn=Z.get(G),Ot=Z.get(Wt.__renderTarget),kn=Z.get(jn.__renderTarget);x.bindFramebuffer(B.READ_FRAMEBUFFER,Ot.__webglFramebuffer),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let ui=0;ui<Oe;ui++)Dn&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Z.get(b).__webglTexture,K,ut+ui),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Z.get(G).__webglTexture,Re,Vt+ui)),B.blitFramebuffer(We,ot,Ne,Ce,Xe,Be,Ne,Ce,B.DEPTH_BUFFER_BIT,B.NEAREST);x.bindFramebuffer(B.READ_FRAMEBUFFER,null),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||Z.has(b)){const Wt=Z.get(b),jn=Z.get(G);x.bindFramebuffer(B.READ_FRAMEBUFFER,J),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,k);for(let Ot=0;Ot<Oe;Ot++)Dn?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Wt.__webglTexture,K,ut+Ot):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Wt.__webglTexture,K),Pt?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,jn.__webglTexture,Re,Vt+Ot):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,jn.__webglTexture,Re),K!==0?B.blitFramebuffer(We,ot,Ne,Ce,Xe,Be,Ne,Ce,B.COLOR_BUFFER_BIT,B.NEAREST):Pt?B.copyTexSubImage3D(Ue,Re,Xe,Be,Vt+Ot,We,ot,Ne,Ce):B.copyTexSubImage2D(Ue,Re,Xe,Be,We,ot,Ne,Ce);x.bindFramebuffer(B.READ_FRAMEBUFFER,null),x.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Pt?b.isDataTexture||b.isData3DTexture?B.texSubImage3D(Ue,Re,Xe,Be,Vt,Ne,Ce,Oe,Rt,sn,Gt.data):G.isCompressedArrayTexture?B.compressedTexSubImage3D(Ue,Re,Xe,Be,Vt,Ne,Ce,Oe,Rt,Gt.data):B.texSubImage3D(Ue,Re,Xe,Be,Vt,Ne,Ce,Oe,Rt,sn,Gt):b.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Re,Xe,Be,Ne,Ce,Rt,sn,Gt.data):b.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Re,Xe,Be,Gt.width,Gt.height,Rt,Gt.data):B.texSubImage2D(B.TEXTURE_2D,Re,Xe,Be,Ne,Ce,Rt,sn,Gt);x.pixelStorei(B.UNPACK_ROW_LENGTH,dn),x.pixelStorei(B.UNPACK_IMAGE_HEIGHT,bt),x.pixelStorei(B.UNPACK_SKIP_PIXELS,vn),x.pixelStorei(B.UNPACK_SKIP_ROWS,bn),x.pixelStorei(B.UNPACK_SKIP_IMAGES,Jn),Re===0&&G.generateMipmaps&&B.generateMipmap(Ue),x.unbindTexture()},this.initRenderTarget=function(b){Z.get(b).__webglFramebuffer===void 0&&ne.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ne.setTextureCube(b,0):b.isData3DTexture?ne.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ne.setTexture2DArray(b,0):ne.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){$=0,F=0,X=null,x.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=wt._getDrawingBufferColorSpace(e),t.unpackColorSpace=wt._getUnpackColorSpace()}}const hr=new I;function In(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;hr.copy(e),hr[n]=0,hr.normalize();const l=.5*a/(a+c),h=1-hr.angleTo(i)/o;return Math.sign(hr[t])===1?h*l:c/(a+c)+l+l*(1-h)}class ka extends Dt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new I,l=new I,h=new I(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,g=f.length/6,_=new I,m=.5/a;for(let p=0,M=0;p<f.length;p+=3,M+=2)switch(o.fromArray(f,p),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[p+0]=h.x*Math.sign(o.x)+l.x*r,f[p+1]=h.y*Math.sign(o.y)+l.y*r,f[p+2]=h.z*Math.sign(o.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),d[M+0]=In(_,l,"z","y",r,n),d[M+1]=1-In(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),d[M+0]=1-In(_,l,"z","y",r,n),d[M+1]=1-In(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),d[M+0]=1-In(_,l,"x","z",r,e),d[M+1]=In(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),d[M+0]=1-In(_,l,"x","z",r,e),d[M+1]=1-In(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),d[M+0]=1-In(_,l,"x","y",r,e),d[M+1]=1-In(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),d[M+0]=In(_,l,"x","y",r,e),d[M+1]=1-In(_,l,"y","x",r,t);break}}static fromJSON(e){return new ka(e.width,e.height,e.depth,e.segments,e.radius)}}const Eh={type:"change"},jl={type:"start"},wu={type:"end"},fa=new Oa,wh=new vi,G_=Math.cos(70*Tf.DEG2RAD),rn=new I,Sn=2*Math.PI,kt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Co=1e-6;class W_ extends qd{constructor(e,t=null){super(e,t),this.state=kt.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ns.ROTATE,MIDDLE:Ns.DOLLY,RIGHT:Ns.PAN},this.touches={ONE:Ds.ROTATE,TWO:Ds.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new Ti,this._lastTargetPosition=new I,this._quat=new Ti().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Qc,this._sphericalDelta=new Qc,this._scale=1,this._panOffset=new I,this._rotateStart=new Q,this._rotateEnd=new Q,this._rotateDelta=new Q,this._panStart=new Q,this._panEnd=new Q,this._panDelta=new Q,this._dollyStart=new Q,this._dollyEnd=new Q,this._dollyDelta=new Q,this._dollyDirection=new I,this._mouse=new Q,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=q_.bind(this),this._onPointerDown=X_.bind(this),this._onPointerUp=Y_.bind(this),this._onContextMenu=ev.bind(this),this._onMouseWheel=$_.bind(this),this._onKeyDown=J_.bind(this),this._onTouchStart=j_.bind(this),this._onTouchMove=Q_.bind(this),this._onMouseDown=Z_.bind(this),this._onMouseMove=K_.bind(this),this._interceptControlDown=tv.bind(this),this._interceptControlUp=nv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Eh),this.update(),this.state=kt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;rn.copy(t).sub(this.target),rn.applyQuaternion(this._quat),this._spherical.setFromVector3(rn),this.autoRotate&&this.state===kt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Sn:n>Math.PI&&(n-=Sn),s<-Math.PI?s+=Sn:s>Math.PI&&(s-=Sn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(rn.setFromSpherical(this._spherical),rn.applyQuaternion(this._quatInverse),t.copy(this.target).add(rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=rn.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(fa.origin.copy(this.object.position),fa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(fa.direction))<G_?this.object.lookAt(this.target):(wh.setFromNormalAndCoplanarPoint(this.object.up,this.target),fa.intersectPlane(wh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Co||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Co||this._lastTargetPosition.distanceToSquared(this.target)>Co?(this.dispatchEvent(Eh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){rn.setFromMatrixColumn(t,0),rn.multiplyScalar(-e),this._panOffset.add(rn)}_panUp(e,t){this.screenSpacePanning===!0?rn.setFromMatrixColumn(t,1):(rn.setFromMatrixColumn(t,0),rn.crossVectors(this.object.up,rn)),rn.multiplyScalar(e),this._panOffset.add(rn)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;rn.copy(s).sub(this.target);let r=rn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Q,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function X_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function q_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Y_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(wu),this.state=kt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Z_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ns.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=kt.DOLLY;break;case Ns.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=kt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=kt.ROTATE}break;case Ns.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=kt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=kt.PAN}break;default:this.state=kt.NONE}this.state!==kt.NONE&&this.dispatchEvent(jl)}function K_(i){switch(this.state){case kt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case kt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case kt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function $_(i){this.enabled===!1||this.enableZoom===!1||this.state!==kt.NONE||(i.preventDefault(),this.dispatchEvent(jl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(wu))}function J_(i){this.enabled!==!1&&this._handleKeyDown(i)}function j_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ds.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=kt.TOUCH_ROTATE;break;case Ds.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=kt.TOUCH_PAN;break;default:this.state=kt.NONE}break;case 2:switch(this.touches.TWO){case Ds.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=kt.TOUCH_DOLLY_PAN;break;case Ds.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=kt.TOUCH_DOLLY_ROTATE;break;default:this.state=kt.NONE}break;default:this.state=kt.NONE}this.state!==kt.NONE&&this.dispatchEvent(jl)}function Q_(i){switch(this._trackPointer(i),this.state){case kt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case kt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case kt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case kt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=kt.NONE}}function ev(i){this.enabled!==!1&&i.preventDefault()}function tv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function nv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class iv extends Kh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Dt;e.deleteAttribute("uv");const t=new pe({side:Mn}),n=new pe,s=new zd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ie(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Yf(e,n,6),c=new tn;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new Ie(e,Cs(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new Ie(e,Cs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new Ie(e,Cs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const f=new Ie(e,Cs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const u=new Ie(e,Cs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const d=new Ie(e,Cs(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Cs(i){return new Ud({color:0,emissive:16777215,emissiveIntensity:i})}const Cl=1.8,Fi=.75,Ps=.9;function sv(i,e={}){const t=new H_({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=gr,t.outputColorSpace=hn,t.toneMapping=Ll,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new Kh;r.background=new ht(n?12377333:14672872),r.fog=n?new _r(12377333,60*s,160*s):new _r(14672872,4*s,9*s);const a=new Tl(t),c=a.fromScene(new iv,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new Rn(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new I(...e.cameraPosition??[0,.5,1.45]),h=new I(...e.target??[0,.3,0]);o.position.copy(l);const f=new W_(o,t.domElement);f.target.copy(h),f.enableDamping=!0,f.dampingFactor=.08,f.enablePan=!1,f.minDistance=e.minDistance??.5,f.maxDistance=e.maxDistance??3,f.maxPolarAngle=Math.PI/2.05,f.minAzimuthAngle=-Math.PI/2.2,f.maxAzimuthAngle=Math.PI/2.2,f.update();const u=new $t;u.scale.setScalar(s),r.add(u);let d=null,g=null;n?(hv(u),uv(u)):(rv(u),d=lv(u,!!e.cupboard),e.wallCabinets&&(g=ov(u))),!n&&(e.cupboard||e.wallCabinets)&&(r.fog=new _r(14672872,7*s,16*s)),s!==1&&u.traverse(F=>{if(!(F instanceof La)||!F.castShadow)return;const X=F.shadow.camera;X.left*=s,X.right*=s,X.top*=s,X.bottom*=s,X.near*=s,X.far*=s,X.updateProjectionMatrix(),F.shadow.normalBias*=s});const _=[],m=new Gd;let p=0;const M=F=>{p=requestAnimationFrame(M),m.update(F);const X=Math.min(1,m.getDelta());if(_.forEach(se=>se(X)),R){R.t=Math.min(1,R.t+X/.7);const se=R.t<.5?2*R.t*R.t:1-Math.pow(-2*R.t+2,2)/2;o.position.lerpVectors(R.fromPos,R.toPos,se),f.target.lerpVectors(R.fromTarget,R.toTarget,se),R.t>=1&&(R=null)}f.update(),dv(r,o,t.domElement.clientHeight),t.render(r,o)};p=requestAnimationFrame(M);let S=null,y=null,A=null,E=!1,R=null;f.addEventListener("start",()=>{E=!0,R=null});const v=new ResizeObserver(()=>{const F=i.clientWidth,X=i.clientHeight;!F||!X||(t.setSize(F,X),o.aspect=F/X,o.updateProjectionMatrix(),S&&!E&&(y!==null?w(S,y,{dir:A||void 0}):L(S)))});v.observe(i);function w(F,X=.7,se={}){if(F.isEmpty())return;S=F.clone(),y=X,E=!1;const fe=F.getCenter(new I),de=(se.dir?se.dir.clone():l.clone().sub(h)).normalize();A=de.clone();const ve=o.position.clone(),Je=f.target.clone(),St=[0,1,2,3,4,5,6,7].map(ce=>new I(ce&1?F.max.x:F.min.x,ce&2?F.max.y:F.min.y,ce&4?F.max.z:F.min.z)),it=ce=>(o.position.copy(fe).addScaledVector(de,ce),o.lookAt(fe),o.updateMatrixWorld(!0),St.every(Le=>{const Ye=Le.clone().project(o);return Ye.z<1&&Math.abs(Ye.x)<=X&&Math.abs(Ye.y)<=X}));let re=.01,_e=f.maxDistance*4;for(let ce=0;ce<40;ce++){const Le=(re+_e)/2;it(Le)?_e=Le:re=Le}if(f.maxDistance=Math.max(f.maxDistance,_e*1.5),h.copy(fe),l.copy(fe).addScaledVector(de,_e),se.animate){o.position.copy(ve),o.lookAt(Je),R={fromPos:ve,toPos:l.clone(),fromTarget:Je,toTarget:h.clone(),t:0};return}R=null,o.position.copy(l),f.target.copy(h),f.update()}function L(F){if(F.isEmpty())return;S=F.clone(),y=null,E=!1;const X=F.getCenter(new I),se=F.getSize(new I),fe=o.fov*Math.PI/180,de=2*Math.atan(Math.tan(fe/2)*o.aspect),ve=Math.max(se.x/2/Math.tan(de/2),Math.max(se.y,se.z*.6)/2/Math.tan(fe/2))*1.12+se.z*.25,Je=l.clone().sub(h).normalize(),St=Math.min(f.maxDistance,Math.max(f.minDistance,ve));h.copy(X),l.copy(X).addScaledVector(Je,St),o.position.copy(l),f.target.copy(h),f.update()}const U=new Q,z=[...(d==null?void 0:d.doors)||[],...(g==null?void 0:g.doors)||[]];z.length&&_.push(F=>{z.forEach(X=>{const se=X.userData.open?X.userData.openAngle:0;X.rotation.y+=(se-X.rotation.y)*Math.min(1,F*7)})});const q=F=>{let X=F;for(;X&&!X.userData.cupboardDoor;)X=X.parent;return X},J=F=>{F.userData.open=!F.userData.open},k=g?{doors:g.doors,blockers:g.blockers,cabinets:g.cabinets.map(F=>({minX:F.minX*s,maxX:F.maxX*s,rows:F.rows.map(X=>X*s),rowHeight:F.rowHeight*s,depth:F.depth*s,z:F.z*s,frontZ:F.frontZ*s}))}:null;let $=null;if(d){const F=d;$={doors:F.doors,blockers:F.blockers,bays:F.bays.map(X=>({minX:X.minX*s,maxX:X.maxX*s,levels:X.levels.map(se=>se*s),frontZ:X.frontZ*s,backZ:X.backZ*s})),toggleDoor:J,isOpen:X=>!!X.userData.open,doorOf:q}}return{cupboard:$,wallCabinets:k,toggleDoor:J,doorOf:q,renderer:t,scene:r,camera:o,controls:f,canvas:t.domElement,onFrame:F=>{_.push(F)},resetView:()=>{o.position.copy(l),f.target.copy(h),f.update()},frameBox:L,fitBox:w,toNdc:F=>{const X=t.domElement.getBoundingClientRect();return U.set((F.clientX-X.left)/X.width*2-1,-((F.clientY-X.top)/X.height)*2+1),U},dispose:()=>{cancelAnimationFrame(p),v.disconnect(),f.dispose(),r.traverse(F=>{var X;(F instanceof Ie||F instanceof Jf||F instanceof An)&&((X=F.geometry)==null||X.dispose(),(Array.isArray(F.material)?F.material:[F.material]).forEach(fe=>{var de;(de=fe.map)==null||de.dispose(),fe.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function rv(i){i.add(new pu(16119807,9080729,.55));const e=new La(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new La(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}const av=-Fi/2-.25;function ov(i){const a=av+.002,c=a+.3,o=4,l=Tu(),h=new pe({map:l,roughness:.6}),f=new pe({color:15854818,roughness:.75}),u=new pe({color:14146528,roughness:.3,metalness:.85}),d=new Ar({color:15398655,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1}),g=[],_=[],m=[];for(const p of[-.83,.83]){const M=p-.65,S=p+1.3/2,y=(z,q,J,k,$,F,X)=>{const se=new Ie(new Dt(z,q,J),X);se.position.set(k,$,F),se.castShadow=!0,se.receiveShadow=!0,i.add(se),_.push(se)};y(1.3,.86,.016,p,.5+.86/2,a+.016/2,f),y(.016,.86,.3,M+.016/2,.5+.86/2,a+.3/2,h),y(.016,.86,.3,S-.016/2,.5+.86/2,a+.3/2,h),y(1.3,.016*1.5,.3,p,.5+.86-.016*.75,a+.3/2,h),y(1.3,.016*1.5,.3,p,.5+.016*.75,a+.3/2,h),y(1.3+.03,.03,.3+.02,p,.5+.86+.015,a+.3/2+.01,h);const A=.5+.016*1.5,R=(.5+.86-.016*1.5-A)/o,v=[];for(let z=0;z<o;z++){const q=A+z*R;z>0&&y(1.3-2*.016,.016,.3-.016-.03,p,q-.016/2,a+.016+(.3-.016-.03)/2,f),v.unshift(q)}m.push({minX:M+.016,maxX:S-.016,rows:v,rowHeight:R-.016,depth:.3-.016-.05,z:a+.016+(.3-.016-.03)/2,frontZ:a+.3-.03});const w=1.3/2-.004,L=.86-.01,U=.018;for(const[z,q]of[[M,1],[S,-1]]){const J=new $t;J.position.set(z+q*.002,.5+.86/2,c+.008);const k=new Ie(new Dt(w-U,L-U,.004),d);k.position.x=q*w/2,k.renderOrder=2,J.add(k);const $=(X,se,fe,de)=>{const ve=new Ie(new Dt(X,se,.014),u);ve.position.set(fe,de,0),J.add(ve)};$(w,U,q*w/2,L/2-U/2),$(w,U,q*w/2,-L/2+U/2),$(U,L,q*U/2,0),$(U,L,q*(w-U/2),0);const F=new Ie(new ee(.008,.008,.07,12),Ql.steel());F.position.set(q*(w-.04),-.12,.02),J.add(F),J.userData.cupboardDoor=!0,J.userData.open=!1,J.userData.openAngle=-q*1.7,i.add(J),g.push(J)}}return{doors:g,blockers:_,cabinets:m}}function lv(i,e=!1){const t=Ia(512,512,(u,d,g)=>{u.fillStyle="#b9bec6",u.fillRect(0,0,d,g);for(let _=0;_<1200;_++)u.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,u.fillRect(Math.random()*d,Math.random()*g,3,3);u.strokeStyle="rgba(70,74,82,0.35)",u.lineWidth=3,u.strokeRect(0,0,d,g)});t.wrapS=t.wrapT=Mi,t.repeat.set(12,12);const n=new Ie(new Zn(14,14),new pe({map:t,roughness:.85}));n.rotation.x=-Math.PI/2,n.position.y=-Ps,n.receiveShadow=!0,i.add(n);const s=new Ie(new Zn(14,5),new pe({color:15659250,roughness:.95}));s.position.set(0,1.6,-Fi/2-.25),s.receiveShadow=!0,i.add(s);const r=Ia(256,256,(u,d,g)=>{u.fillStyle="#f7f8f9",u.fillRect(0,0,d,g),u.strokeStyle="#c9ced4",u.lineWidth=4,u.strokeRect(0,0,d,g)});r.wrapS=r.wrapT=Mi,r.repeat.set(40,4);const a=new Ie(new Zn(6,.6),new pe({map:r,roughness:.3,metalness:0}));a.position.set(0,.3,-Fi/2-.249),i.add(a);const c=new Ie(new ka(Cl,.035,Fi,3,.008),new Ar({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));c.position.y=-.0175,c.receiveShadow=!0,c.castShadow=!0,i.add(c);const o=Tu();if(e)return cv(i,o);const l=new Ie(new Dt(Cl-.06,Ps-.035,Fi-.06),new pe({map:o,roughness:.7}));l.position.y=-Ps/2-.0175,l.receiveShadow=!0,i.add(l);const h=new pe({color:3877404,roughness:.8}),f=Ql.steel();for(const u of[-.6,0,.6]){const d=new Ie(new Dt(.004,Ps-.12,.002),h);d.position.set(u,-Ps/2-.02,(Fi-.06)/2+.001),i.add(d)}for(const u of[-.66,-.54,-.06,.06,.54,.66]){const d=new Ie(new ee(.006,.006,.1,12),f);d.position.set(u,-.2,(Fi-.06)/2+.015),i.add(d)}return null}function cv(i,e){const t=Cl-.06,n=Fi-.06,s=.018,r=-.035,a=-Ps,c=r-a,o=n/2,l=-n/2,h=new pe({map:e,roughness:.7}),f=new pe({color:15195336,roughness:.8}),u=[],d=(L,U,z,q,J,k,$)=>{const F=new Ie(new Dt(L,U,z),$);return F.position.set(q,J,k),F.castShadow=!0,i.add(F),u.push(F),F},g=a+.06;d(s,c,n,-t/2+s/2,a+c/2,0,h),d(s,c,n,t/2-s/2,a+c/2,0,h),d(t,c,s,0,a+c/2,l+s/2,f),d(s,c,n-s,0,a+c/2,s/2,f),d(t,s,n,0,g-s/2,0,f),d(t,.06,s,0,a+.03,o-.03,h),d(t,.04,s,0,r-.02,o-s/2,h);const _=-.46,m=t/2-s*1.5;d(m,s,n-s,-t/4,_-s/2,s/2,f),d(m,s,n-s,t/4,_-s/2,s/2,f);const p=r-.04,M=g-s,S=p-M-.002,y=t/2-.0025,A=new pe({map:e,roughness:.65}),E=Ql.steel(),R=[];[[-t/2,1],[t/2,-1]].forEach(([L,U],z)=>{const q=new $t;q.position.set(L+U*.001,(p+M)/2,o+s/2);const J=new Ie(new Dt(y,S,s),A);J.position.x=U*y/2,J.castShadow=!0,q.add(J);const k=new Ie(new ee(.006,.006,.1,12),E);k.position.set(U*(y-.045),-.2-q.position.y,s/2+.015),q.add(k);for(const $ of[k.position.y-.05,k.position.y+.05]){const F=new Ie(new ee(.004,.004,.016,8),E);F.rotation.x=Math.PI/2,F.position.set(k.position.x,$,s/2+.008),q.add(F)}q.userData.cupboardDoor=!0,q.userData.bay=z,q.userData.open=!1,q.userData.openAngle=-U*1.95,i.add(q),R.push(q)});const w=(L,U)=>({minX:L,maxX:U,levels:[g,_],frontZ:o-.02,backZ:l+s});return{doors:R,blockers:u,bays:[w(-t/2+s,-s/2),w(s/2,t/2-s)]}}function hv(i){i.add(new pu(14675967,6126138,.8));const e=new La(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function uv(i){const e=Ia(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const h=60+Math.random()*70;a.fillStyle=`rgba(${h*.6},${h+40},${h*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=Mi,e.repeat.set(80,80);const t=new Ie(new Zn(300,300),new pe({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new Ie(new Zn(80,.1),new pe({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new pe({color:5980976,roughness:.9}),r=new pe({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new Ie(new ee(.25,.35,3,8),s);l.position.set(c,1.5,o);const h=new Ie(new qt(2.2+a%3*.5,12,10),r);h.position.set(c,4.2+a%2,o),i.add(l,h)}}function Tu(){return Ia(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function Ia(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new br(n);return s.colorSpace=hn,s.anisotropy=16,s}function fv(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new br(s);o.colorSpace=hn;const l=new An(new Bs({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const h=e/700*.73;return l.scale.set(h*l.userData.aspect,h,1),l}const Po=new I,Do=new I;function dv(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(Po).project(e),c.getWorldPosition(Do).project(e);const o=Math.abs(Po.y-Do.y)*t/2+Math.abs(Po.x-Do.x)*t/2;s.visible=o>r*1.25})}const Ql={steel:()=>new pe({color:13094097,metalness:1,roughness:.28}),chrome:()=>new pe({color:15133164,metalness:1,roughness:.12}),brass:()=>new pe({color:13936715,metalness:1,roughness:.22}),castIron:()=>new pe({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new pe({color:1776928,roughness:.5}),glass:()=>new pe({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},dt=(i=15857397)=>new Ar({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:Jt,depthWrite:!1}),Tn=i=>new pe({color:i,roughness:.45,metalness:.15}),_t=(i=13094097)=>new pe({color:i,roughness:.28,metalness:1}),At=()=>new pe({color:15133164,roughness:.12,metalness:1}),ii=()=>new pe({color:13936715,roughness:.22,metalness:1}),Bt=i=>new pe({color:i,roughness:.5,metalness:.05}),Qt=i=>new pe({color:i,roughness:.35,metalness:.1}),ni=()=>new pe({color:10119233,roughness:.7}),Ze=(i,e,t,n=Math.min(i,e,t)*.12)=>new ka(i,e,t,3,n);function D(i,e,t=0,n=0,s=0){const r=new Ie(i,e);return r.position.set(t,n,s),r}function en(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new br(n);return s.colorSpace=hn,s.anisotropy=16,s}function Ui(i,e,t,n){const s=new $t;return s.add(D(new ee(.018,.022,.05,16),ii(),0,.025,0)),s.add(D(new ee(.026,.026,.03,16),Bt(n),0,.06,0)),s.position.set(i,e,t),s}function Nn(i,e,t,n=.55){const s=e*.85,r=new Ie(new ee(i*.9,i*.9,s,40),new pe({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const pv={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function Th(i,e,t,n){const s=pv[n.hazard],r=en(512,256,(c,o,l)=>{c.fillStyle="#fffdf6",c.fillRect(0,0,o,l),c.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",c.fillRect(0,0,o,34),c.fillStyle="#ffffff",c.font="bold 24px sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),c.fillStyle="#111827";const h=String(n.display_name||"Reagent").split(" "),f=[];let u="";c.font="bold 40px sans-serif",h.forEach(g=>{const _=u?`${u} ${g}`:g;c.measureText(_).width>o-40&&u?(f.push(u),u=g):u=_}),f.push(u);const d=f.slice(0,2);d.forEach((g,_)=>c.fillText(g,o/2,(n.formula?86:110)+_*46-(d.length-1)*10)),n.formula&&(c.font="bold 54px serif",c.fillStyle="#1e3a8a",c.fillText(String(n.formula),o/2,212)),c.strokeStyle="#cbd5e1",c.lineWidth=4,c.strokeRect(2,2,o-4,l-4)}),a=D(new ee(i,i,e,32,1,!0,-1.05,2.1),new pe({map:r,roughness:.85,side:Jt}),0,t);return a.userData.role="reagent_label",a}function da(i,e,t,n){const s=en(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let h=1;h<=l;h++){const f=o-h/(l+1)*o;a.fillRect(0,f,h%5===0?44:24,h%5===0?4:2)}}),r=new Ie(new ee(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new ss({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function pa(i){const e=en(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new An(new Bs({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function Ah(i,e){return en(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const h=c+l/50*o,f=l%10===0;t.lineWidth=f?4:1.5;const u=f?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(h)*u,r+Math.sin(h)*u),t.lineTo(s+Math.cos(h)*(a-16),r+Math.sin(h)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const h=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(h)*(a-82),r+Math.sin(h)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function Au(i){return en(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function Na(i,e="#22c55e"){return en(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function Rh(){return en(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function mv(){return en(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const Lo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function gv(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[Lo[n],Lo[s],Lo[r],"#d4af37"]}class Io extends Kn{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new I){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function No(i,e,t,n={}){const s=new $t;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const h=[new Q(0,.004),new Q(.301,.004),new Q(.315,.03),new Q(.33949999999999997,.58),new Q(.357,.6),new Q(.364,.612)];r(new Ie(new _i(h,48),dt()));const f=D(new Xn(.045,.07,3),dt(),.35*1,.6-.015,0);f.rotation.z=-Math.PI/2,r(f,da(.35*.95,.06,.6*.72,4),Nn(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const h=D(new ee(.12,.12,.55,32,1,!0),dt(),0,.375),f=D(new qt(.12,32,16,0,Math.PI*2,0,Math.PI/2),dt(),0,.1);f.rotation.x=Math.PI;const u=D(new Xt(.12*1.02,.012,10,32),dt(),0,.55+.1);u.rotation.x=Math.PI/2;const d=D(Ze(.34,.08,.34,.02),ni(),0,.04);r(h,f,u,d,Nn(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const h=D(new ee(.06,.06,1.1,32,1,!0),dt(),0,.7000000000000001),f=D(new ee(.06*1.25,.06*1.25,.1,24),dt(15660799),0,.1),u=D(Ze(.16,.03,.035,.012),Bt(1920728),.09,.1),d=D(new ee(.03,.01,.1,16,1,!0),dt(),0,.02),g=D(new ee(.2,.22,.04,32),Qt(3099491),0,.02);r(h,f,u,d,g,da(.06,.2,1.1*.85,10),Nn(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=D(new ee(.018,.008,.3,16),dt(),0,.2),l=D(new qt(.055,24,16),dt(),0,.42);l.scale.y=1.8;const h=D(new ee(.018,.018,.3,16),dt(),0,.68),f=D(new Xt(.02,.003,6,20),new ss({color:1120295}),0,.74);f.rotation.x=Math.PI/2;const u=D(new qt(.075,24,16),Bt(12131356),0,.9);u.scale.y=1.25;const d=D(Ze(.22,.07,.18,.02),ni(),0,.035);r(o,l,h,f,u,d);break}case"measuring_cylinder":{const h=D(new ee(.18,.17099999999999999,.8,40,1,!0),dt(),0,.44),f=D(new ee(.18*1.6,.18*1.7,.05,6),dt(15266293),0,.025),u=D(new Xn(.035,.06,3),dt(),.18,.8+.03,0);u.rotation.z=-Math.PI/2,r(h,f,u,da(.18*.97,.12,.8*.8,5),Nn(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new pe({color:1920728,roughness:.45,metalness:.2}),l=[new Q(0,.005),new Q(.27,.005),new Q(.272,.018),new Q(.2,.05),new Q(.11,.1),new Q(.075,.13),new Q(0,.13)],h=new Ie(new _i(l,56),o),f=D(new ee(.068,.07,.11,36),o,0,.175),u=en(128,16,(v,w,L)=>{v.fillStyle="#d4d4d8",v.fillRect(0,0,w,L),v.fillStyle="#71717a";for(let U=0;U<w;U+=4)v.fillRect(U,0,1.5,L)});u.wrapS=Mi,u.repeat.set(3,1);const d=D(new ee(.052,.052,.075,40),new pe({map:u,roughness:.3,metalness:1}),0,.268),g=D(new ee(.066,.066,.03,6),At(),0,.32),_=D(new ee(.06,.06,.012,40),At(),0,.341),m=D(new ee(.048,.048,.28,36,1,!0),At(),0,.485),p=D(new ee(.042,.042,.004,28),new pe({color:4144966,roughness:.8}),0,.6),M=D(new Xt(.046,.004,8,32),At(),0,.625);M.rotation.x=Math.PI/2;const S=new $t,y=D(new ee(.032,.032,.2,24),At(),0,.1);S.add(y);for(let v=0;v<3;v++)S.add(D(new ee(.03,.036,.025,24),At(),0,.215+v*.03));S.add(D(new ee(.02,.02,.004,20),new pe({color:2565930}),0,.29)),S.rotation.z=Math.PI/2+.12,S.position.set(-.05,.16,0),r(h,f,d,g,_,m,p,M,S);const A=n.flame==="on",E=D(new Xn(.09,.3,24),new pe({color:16751933,emissive:16738816,emissiveIntensity:A?1:0,transparent:!0,opacity:A?.75:0,depthWrite:!1}),0,.77);E.userData.role="flame";const R=D(new Xn(.045,.16,16),new pe({color:6333946,emissive:2450411,emissiveIntensity:A?1.3:0,transparent:!0,opacity:A?.85:0,depthWrite:!1}),0,.7);R.userData.role="flame",r(E,R);break}case"thermometer":{const o=en(256,1690,(p,M,S)=>{p.fillStyle="#fbfbf8",p.fillRect(0,0,M,S),p.fillStyle="#0f172a",p.textAlign="left",p.textBaseline="middle";const y=S-250,A=S-400;for(let E=0;E<=100;E+=2){const R=y-E/100*A,v=E%10===0;p.fillRect(M-(v?90:50),R-(v?3:1.5),v?90:50,v?6:3),v&&(p.font=`900 ${E%50===0?62:52}px Arial, sans-serif`,p.fillText(String(E),10,R))}p.font="700 44px Arial, sans-serif",p.fillText("°C",14,y-A-70)}),l=D(Ze(.1,.66,.02,.008),new pe({map:o,roughness:.5}),0,.45,-.025),h=D(new ee(.022,.022,.62,24),dt(16777215),0,.45),f=D(new ee(.008,.008,.45,12),new pe({color:14427686,roughness:.2}),0,.32),u=D(new qt(.05,24,24),new pe({color:14427686,roughness:.2}),0,.1),d=D(new qt(.065,24,24),dt(16777215),0,.1),g=D(Ze(.26,.04,.2,.015),Qt(3099491),0,.02);r(l,h,f,u,d,g);const _=p=>.78-(1440-p*12.9)/1690*.66;let m;for(const p of[0,25,50,75,100]){const M=fv(`${p}°`,12,p%50===0?void 0:m);M.center.set(0,.5),M.position.set(.065,_(p),-.02),r(M),p%50===0&&(m=M)}break}case"battery":{const o=en(512,256,(g,_,m)=>{g.fillStyle="#111827",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,_,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,_/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",_/2,m*.9)}),l=Bt(2042167),h=D(Ze(.6,.3,.3,.035),[l,l,l,l,new pe({map:o,roughness:.5}),l],0,.15),f=Ui(.2,.3,0,14427686),u=Ui(-.2,.3,0,1118481),d=new An(new Bs({map:Au(n.voltage||6),depthTest:!1,transparent:!0}));d.scale.set(.34,.136,1),d.position.set(0,.58,0),d.renderOrder=9,d.userData.role="voltage",r(h,f,u,d);break}case"ruler":{const h=new pe({color:15381256,roughness:.6}),f=new pe({map:Rh(),roughness:.55});r(D(new Dt(1.5,.015,.16),[h,h,f,h,h,h],0,.0075));break}case"bulb":{const o=n.state==="on",l=D(new qt(.18,32,32),new Ar({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const h=D(new Xt(.05,.006,8,24,Math.PI*1.7),new pe({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);h.rotation.x=Math.PI/2,h.userData.role="led";const f=D(new ee(.095,.11,.16,24),ii(),0,.12),u=new $t;for(let g=0;g<5;g++){const _=D(new Xt(.1,.006,6,24),ii(),0,.06+g*.028);_.rotation.x=Math.PI/2,u.add(_)}const d=D(Ze(.4,.04,.26,.015),ni(),0,.02);r(l,h,f,u,d,Ui(-.15,.04,.07,14427686),Ui(.15,.04,.07,1118481));break}case"switch":{const o=D(Ze(.4,.06,.2,.012),ni(),0,.03),l=D(new ee(.02,.02,.1,16),ii(),-.12,.11),h=D(Ze(.05,.06,.05,.008),ii(),.12,.09),f=D(new ee(.012,.012,.24,16),At()),u=n.state==="closed";f.position.set(u?0:-.06,.16,0),f.rotation.z=u?Math.PI/2-.35:Math.PI/2-.9,f.userData.role="lever",f.add(D(new qt(.028,16,12),Bt(1118481),0,-.13,0)),r(o,l,h,f);break}case"resistor":{const o=en(256,64,(g,_,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,_,m),gv(n.resistance_ohm).forEach((p,M)=>{g.fillStyle=p,g.fillRect(60+M*34+(M===3?22:0),0,16,m)})}),l=D(new ee(.07,.07,.32,32),new pe({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const h=D(new ee(.01,.01,.52,10),_t(13948120),0,.2);h.rotation.z=Math.PI/2;const f=D(Ze(.6,.04,.2,.012),Bt(15195332),0,.02),u=D(new ee(.012,.012,.16,10),_t(13948120),-.26,.12),d=u.clone();d.position.x=.26,r(l,h,f,u,d);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=D(Ze(.42,.4,.18,.03),Qt(o?1981066:8330525),0,.2),h=D(new Xt(.155,.015,12,48),At(),0,.2,.091),f=D(new Ji(.15,48),new pe({map:Ah(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),u=D(new Xn(.012,.13,8),Tn(14427686),.02,.2,.1);u.rotation.z=-Math.PI/2+.6,u.userData.role="needle";const d=D(new qt(.014,12,12),_t(2565930),0,.2,.1);r(l,h,f,u,d,Ui(-.12,.4,0,14427686),Ui(.12,.4,0,1118481));break}case"microscope":{const o=Qt(15659250),l=Qt(2040616);r(D(Ze(.36,.06,.47,.02),o,0,.03,-.05)),r(D(Ze(.1,.28,.1,.02),o,0,.19,-.22));const h=new iu([new I(0,.27,-.23),new I(0,.55,-.23),new I(0,.74,-.14),new I(0,.8,-.03)]);r(new Ie(new ts(h,24,.044,12,!1),o));const f=D(new ee(.035,.035,.01,24),new pe({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);f.userData.role="led",r(D(new ee(.045,.05,.05,24),l,0,.085),f),r(D(Ze(.3,.022,.28,.006),l,0,.32));for(const u of[-.08,.08])r(D(new Dt(.016,.004,.11),At(),u,.333,.03));r(D(new ee(.036,.036,.25,24),l,0,.7)),r(D(new ee(.025,.03,.11,24),l,0,.88)),r(D(new ee(.056,.06,.033,32),At(),0,.565)),[14427686,15381256,2450411].forEach((u,d)=>{const g=new $t;g.position.y=.55,g.rotation.y=2*Math.PI*d/3;const _=new $t;_.position.z=.03,_.rotation.x=.35,_.add(D(new ee(.015,.012,.07+d*.015,16),At(),0,-.04-d*.008)),_.add(D(new ee(.0158,.0158,.008,16),Bt(u),0,-.03)),g.add(_),r(g)});for(const u of[-1,1]){const d=D(new ee(.05,.05,.028,24),l,u*.08,.25,-.22);d.rotation.z=Math.PI/2;const g=D(new ee(.025,.025,.028,20),l,u*.11,.25,-.22);g.rotation.z=Math.PI/2,r(d,g)}break}case"lens":{const o=D(new qt(.22,40,40),dt(15988991),0,.42);o.scale.set(1,1,.22);const l=D(new Xt(.22,.02,16,48),_t(10265519),0,.42),h=D(new ee(.015,.015,.2,12),_t(),0,.1),f=D(new ee(.12,.14,.03,32),Qt(3099491),0,.015);r(o,l,h,f);break}case"mirror":{const o=D(Ze(.4,.5,.02,.006),[_t(4674921),_t(4674921),_t(4674921),_t(4674921),new pe({color:16777215,metalness:1,roughness:.03}),_t(4674921)],0,.3,0),l=D(Ze(.36,.06,.12,.012),ni(),0,.03,-.02);r(o,l);break}case"biological_model":{const o=D(new Dt(.5,.012,.18),dt(14742270),0,.006),l=D(new Dt(.14,.003,.14),dt(15857397),0,.014),h=D(new Ji(.045,32),new pe({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);h.rotation.x=-Math.PI/2;const f=D(new Dt(.12,.014,.17),Bt(16317180),-.18,.007);r(o,l,h,f);break}case"wire":{const o=new Ie(new ts(new Io(.12,.15,5),240,.012,8,!1),new pe({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=D(new ee(.135,.135,.14,24),Bt(3621201),0,.08);r(l,o);break}case"water_container":{const h=D(new ee(.255,.3,.75,48,1,!0),dt(),0,.375),f=D(new Ji(.3,48),dt(),0,.003);f.rotation.x=-Math.PI/2;const u=D(new Xt(.14,.02,12,32,Math.PI*1.3),dt(),.3*.85,.75*.6);u.rotation.z=Math.PI/2,r(h,f,u,Nn(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),h=D(new ee(.025,.025,l,24),_t(10265519),0,.025);h.rotation.z=Math.PI/2;const f=D(new qt(.025,16,16),_t(7434618),-l/2,.025),u=f.clone();u.position.x=l/2,r(h,f,u);break}case"balance":{const o=D(Ze(.55,.1,.42,.03),Qt(15067115),0,.05),l=D(new ee(.16,.16,.015,40),At(),0,.11,.02),h=D(new ee(.03,.03,.02,16),_t(),0,.1,.02),f=D(Ze(.3,.07,.05,.012),Bt(2042167),0,.07,.2),u=new An(new Bs({map:Na("0.0 g"),depthTest:!1,transparent:!0}));u.scale.set(.3,.135,1),u.position.set(0,.24,.2),u.renderOrder=9,u.userData.role="balance_display",r(o,l,h,f,u);break}case"stopwatch":{const o=D(new ee(.13,.13,.045,48),Qt(2042167),0,.16);o.rotation.x=Math.PI/2;const l=D(new Xt(.13,.01,10,48),At(),0,.16),h=D(new ee(.022,.022,.04,16),At(),0,.305),f=D(new Xt(.025,.006,8,20),At(),0,.34),u=D(Ze(.18,.03,.12,.01),Bt(3621201),0,.015),d=new An(new Bs({map:Na("00:00.0"),depthTest:!1,transparent:!0}));d.scale.set(.2,.09,1),d.position.set(0,.16,.03),d.renderOrder=9,d.userData.role="stopwatch_display",r(o,l,h,f,u,d);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,h=o*.05,f=(o+l*1.6)*.05,u=new Ie(new ts(new Io(f,.05,22),440,.007,6,!1),new pe({color:13094097,roughness:.25,metalness:1}));u.userData.role="spring_body",u.userData.naturalLengthUnits=h,u.userData.maxLengthUnits=f,u.scale.y=h/f,u.position.y=.85-f*u.scale.y/2;const d=D(new Xt(.03,.008,8,20),_t(7434618),0,.85),g=D(new ee(.05,.05,.015,24),_t(5395035));g.userData.role="spring_hanger",g.position.y=.85-f*u.scale.y,r(u,d,g);break}case"retort_stand":{const o=Qt(3099491);r(D(Ze(.36,.035,.24,.012),o,0,.0175)),r(D(new ee(.016,.016,.95,20),_t(),-.13,.5)),r(D(Ze(.07,.07,.07,.01),o,-.13,.9));const l=D(new ee(.01,.01,.07,10),_t(),-.13,.9,.06);l.rotation.x=Math.PI/2;const h=D(new ee(.012,.012,.3,16),_t(),.03,.9);h.rotation.z=Math.PI/2,r(l,h,D(Ze(.04,.05,.05,.008),ii(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),h=.04+Math.min(.06,o/3e3),f=en(256,256,(d,g)=>{d.fillStyle="#4a525c",d.fillRect(0,0,g,g),d.fillStyle="#1f2328",d.beginPath(),d.arc(g/2,g/2,22,0,Math.PI*2),d.fill(),d.fillRect(g/2-9,g/2,18,g/2),d.fillStyle="#f1f5f9",d.font="bold 58px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText(`${o}g`,g/2,g/2-62)}),u=Qt(4870748);u.metalness=.5,r(D(new ee(l,l,h,36),[u,new pe({map:f,metalness:.4,roughness:.5}),u],0,h/2));break}case"ray_box":{const o=n.state==="on",l=D(Ze(.35,.22,.28,.03),Qt(2042167),0,.11),h=D(new Dt(.2,.16,.012),Bt(988970),0,.11,.145),f=D(new Dt(.02,.12,.02),new pe({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);f.userData.role="led";const u=D(new ee(.012,.012,.3,10),Bt(1120295),0,.03,-.29);u.rotation.x=Math.PI/2,r(l,h,f,u);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(D(Ze(o,.1,.55,.01),dt(14676223),0,.05));break}case"projectile_launcher":{const o=new pe({color:2962235,metalness:.6,roughness:.4});r(D(Ze(.5,.05,.36,.015),o,0,.025));for(const d of[-.09,.09])r(D(Ze(.1,.22,.02,.006),o,0,.14,d));const l=new $t;l.position.y=.22,l.rotation.z=Math.PI/4;const h=D(new ee(.05,.055,.45,28),new pe({color:1920728,metalness:.5,roughness:.35}),.17,0);h.rotation.z=-Math.PI/2;const f=D(new Xt(.053,.011,12,28),At(),.39,0);f.rotation.y=Math.PI/2;const u=D(new ee(.018,.018,.22,16),_t());u.rotation.x=Math.PI/2,l.add(h,f,u),r(l);break}case"projectile":{r(D(new Xt(.05,.012,10,28),Bt(3621201),0,.012)),r(D(new qt(.07,32,20),new pe({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=D(new ee(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new pe({map:mv(),transparent:!0,opacity:.92,roughness:.3,side:Jt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,h=.62,f=.085,u=[new Q(0,.004),new Q(l*.96,.004),new Q(l,.03),new Q(f+.01,h*.7),new Q(f,h*.76),new Q(f,h-.02),new Q(f+.012,h),new Q(f+.012,h+.012)],d=o?new Ar({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:Jt,depthWrite:!1}):dt();r(new Ie(new _i(u,56),d));const g=en(512,512,(S,y,A)=>{S.clearRect(0,0,y,A),S.fillStyle="#ffffff",S.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([R,v])=>{S.fillRect(y*.6,A*R,y*.13,5),S.font="bold 34px Arial",S.fillText(v,y*.76,A*R+12)}),S.fillRect(y*.63,A*.64,y*.07,4),S.font="bold 40px Arial",S.fillText("250 ml",y*.12,A*.52),S.fillRect(y*.14,A*.58,y*.2,A*.09),S.save(),S.translate(y*.56,A*.86),S.rotate(-Math.PI/2),S.font="bold 22px Arial",S.fillText("APPROX. VOL",0,0),S.restore()}),_=.03,m=h*.7,p=new Ie(new _i([new Q(l*1.006,_),new Q((f+.01)*1.006,m)],24,-.75,1.5),new ss({map:g,transparent:!0,depthWrite:!1,side:Jt}));r(p);const M=new Ie(new ee(.11,l*.94,h*.66,48),new pe({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));M.userData.role="liquid",M.userData.maxFillHeight=h*.66,M.scale.y=.001,r(M);break}case"round_bottom_flask":{const o=D(new qt(.28,40,28),dt(),0,.36),l=D(new ee(.07,.07,.34,28,1,!0),dt(),0,.78),h=D(new Xt(.2,.025,12,40),Bt(3621201),0,.05);h.rotation.x=Math.PI/2;const f=new $t;f.position.y=.14,f.add(Nn(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,h,f);break}case"evaporating_dish":{const o=[new Q(0,.01),new Q(.12,.012),new Q(.26,.09),new Q(.3,.13)];r(new Ie(new _i(o,48),new pe({color:16317180,roughness:.25,side:Jt})));const l=new $t;l.position.y=.012,l.add(Nn(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=D(new Xt(.3,.02,12,48),_t(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const h=l/3*Math.PI*2,f=D(new ee(.018,.018,.82,12),_t(5395035),Math.cos(h)*.34,.4,Math.sin(h)*.34);f.rotation.z=Math.cos(h)*-.08,f.rotation.x=Math.sin(h)*.08,r(f)}break}case"wire_gauze":{const o=en(256,256,(l,h,f)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,h,f),l.strokeStyle="#4b5563",l.lineWidth=2;for(let u=0;u<h;u+=10)l.beginPath(),l.moveTo(u,0),l.lineTo(u,f),l.moveTo(0,u),l.lineTo(h,u),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(h/2,f/2,h*.28,0,Math.PI*2),l.fill()});r(D(new Dt(.62,.008,.62),new pe({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=D(new ee(.26,.03,.32,40,1,!0),dt(),0,.52),l=D(new ee(.025,.02,.32,20,1,!0),dt(),0,.2),h=D(new Xn(.22,.27,32,1,!0),new pe({color:16777215,roughness:.9,side:Jt}),0,.53);h.rotation.x=Math.PI,r(o,l,h);break}case"test_tube_rack":{const o=D(Ze(.9,.04,.24,.01),ni(),0,.3),l=D(Ze(.9,.04,.24,.01),ni(),0,.02),h=D(Ze(.04,.3,.24,.01),ni(),-.43,.16),f=h.clone();f.position.x=.43,r(o,l,h,f);const u=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let d=0;d<4;d++){const g=-.3+d*.2;r(D(new ee(.055,.055,.42,20,1,!0),dt(),g,.25)),r(D(new ee(.05,.05,.12,20),new pe({color:u[d],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=D(Ze(.32,.008,.05,.003),At(),.16,.006),l=D(new qt(.04,20,10,0,Math.PI*2,0,Math.PI/2),At(),-.18,.04);l.rotation.x=Math.PI;const h=D(new ee(.008,.008,.18,12),At(),-.06,.008);h.rotation.z=Math.PI/2,r(o,l,h);break}case"wash_bottle":{const o=D(new ee(.17,.18,.5,36),new pe({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=D(new ee(.07,.09,.08,24),Bt(2450411),0,.54),h=D(new ee(.012,.012,.3,10),Bt(2450411),.08,.66);h.rotation.z=-.9,r(o,l,h,Nn(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const h=[new Q(0,.003),new Q(.188,.003),new Q(.2,.03),new Q(.2,.56),new Q(.16000000000000003,.64),new Q(.07,.6900000000000001),new Q(.065,.75),new Q(.072,.76)];r(new Ie(new _i(h,40),dt())),r(Nn(.2*.97,.56,n.color||"#eef6f8",.78));const f=D(new ee(.06,.055,.07,24),dt(15266031),0,.56+.22),u=D(new ee(.09,.09,.035,28),dt(15266031),0,.56+.27);r(f,u,Th(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(D(new ee(.21,.21,.46,40,1,!0),dt(),0,.46/2+.005)),r(D(new ee(.21,.21,.01,40),dt(),0,.005));const h=.46*.62,f=D(new ee(.21*.95,.21*.95,h,40),new pe({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,h/2+.01),u=D(new ee(.21*1.04,.21*1.04,.07,40),Bt(2042167),0,.46+.035);r(f,u,Th(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=D(new ee(.02,.008,.36,16),dt(),0,.24),l=D(new qt(.045,20,14),Bt(1120295),0,.46);l.scale.y=1.6;const h=D(new ee(.1,.1,.22,28),new pe({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,h);break}case"crucible":{const o=[new Q(0,.005),new Q(.08,.005),new Q(.13,.2),new Q(.14,.21)],l=new pe({color:16119284,roughness:.3,side:Jt});r(new Ie(new _i(o,40),l));const h=D(new ee(.15,.15,.015,40),l,.32,.008),f=D(new qt(.025,16,12),l,.32,.025);r(h,f);break}case"bar_magnet":{r(D(Ze(.3,.08,.1,.01),Qt(14427686),-.15,.04),D(Ze(.3,.08,.1,.01),Qt(1920728),.15,.04));const o=pa("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=pa("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(D(new ee(.12,.12,.04,40),ii(),0,.02)),r(D(new ee(.105,.105,.002,40),new pe({color:16777215}),0,.041));const o=new $t,l=D(new Xn(.018,.09,4),Tn(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const h=D(new Xn(.018,.09,4),Tn(2042167),0,0,.045);h.rotation.x=Math.PI/2,o.add(l,h),o.position.y=.05,o.userData.role="needle",r(o,D(new ee(.11,.11,.012,40),dt(),0,.06));break}case"prism":{const o=new dr;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new Is(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new Ie(l,dt(14742270)));break}case"rheostat":{const o=new pe({color:6054233,roughness:.75,metalness:.45}),l=new pe({color:14925716,roughness:.6}),h=new pe({color:1118481,roughness:.35}),f=.2,u=.79,d=en(64,64,(S,y,A)=>{S.fillStyle="#1a1a1a",S.fillRect(0,0,y,A);for(let E=0;E<A;E+=4)S.fillStyle="#3a3a3a",S.fillRect(0,E,y,1),S.fillStyle="#050505",S.fillRect(0,E+2,y,1)});d.wrapS=d.wrapT=Mi,d.repeat.set(1,18);const g=D(new ee(.125,.125,1.24,48),new pe({map:d,roughness:.4,metalness:.6}),0,f);g.rotation.z=Math.PI/2,r(g);for(const S of[-1,1]){const y=D(new ee(.12,.12,.1,40),l,S*.67,f),A=D(new ee(.129,.129,.035,40),At(),S*.635,f),E=D(new ee(.1,.1,.05,32),o,S*.745,f);for(const L of[y,A,E])L.rotation.z=Math.PI/2;r(y,A,E);const R=new dr;R.moveTo(-.17,0),R.lineTo(.17,0),R.lineTo(.09,.42),R.lineTo(-.09,.42),R.closePath();const v=new Is(R,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});v.translate(0,0,-.015);const w=new Ie(v,o);w.rotation.y=Math.PI/2,w.position.x=S*u,r(w);for(const L of[-.2,.2]){const U=D(Ze(.1,.025,.09,.008),o,S*(u-S*.04),.0125,L),z=D(new ee(.018,.018,.027,16),new pe({color:2042167}),S*(u-S*.04),.0125,L);r(U,z)}r(D(Ze(.05,.03,.06,.006),At(),S*.6,f-.15,.06)),r(D(new ee(.014,.014,.02,12),_t(10265519),S*.6,f-.125,.06))}const _=(S,y,A,E)=>{const R=new $t,v=D(new ee(.012,.012,.04,12),ii(),E*.02,0,0);v.rotation.z=Math.PI/2;const w=D(new ee(.03,.03,.06,18),h,E*.065,0,0);w.rotation.z=Math.PI/2;for(let L=0;L<9;L++){const U=D(new Dt(.06,.006,.006),h,E*.065,Math.cos(L*.7)*.03,Math.sin(L*.7)*.03);R.add(U)}return R.add(v,w),R.position.set(S,y,A),R};r(_(u+.02,.32,.03,1),_(u+.02,.1,.03,1),_(-u-.02,.2,.06,-1));const m=D(new ee(.012,.016,.05,12),ii(),u+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(D(new Dt(u*2,.035,.035),At(),0,.395,-.02));const p=new $t,M=en(128,128,(S,y,A)=>{S.fillStyle="#111111",S.fillRect(0,0,y,A),S.fillStyle="#e5e7eb",S.font="bold 26px Arial",S.textAlign="center",S.save(),S.translate(30,A/2),S.rotate(-Math.PI/2),S.fillText("11",0,-4),S.fillText("5",0,22),S.restore()});p.add(D(Ze(.13,.08,.13,.015),[h,h,new pe({map:M,roughness:.35}),h,h,h],0,.41,-.01)),p.add(D(Ze(.12,.09,.05,.012),h,0,.34,.05));for(const S of[-.035,.025])p.add(D(new ee(.017,.017,.006,20),At(),.02,.453,S));p.position.x=.05,p.userData.role="slider",r(p);break}case"dry_cell":{const o=en(512,256,(_,m,p)=>{_.fillStyle="#d61f26",_.fillRect(0,0,m,p),_.fillStyle="#f5c518",_.fillRect(0,0,m,10),_.fillRect(0,p-10,m,10);const M=m*.25;_.textAlign="center",_.font="italic bold 40px Georgia",_.fillStyle="#fde68a",_.fillText("Power Cell",M,52),_.fillStyle="#f59e0b",_.beginPath(),_.arc(M,118,40,0,Math.PI*2),_.fill(),_.fillStyle="#7c2d12",_.font="bold 44px Arial",_.fillText("+",M,134),_.fillStyle="#fde68a",_.font="bold 22px Arial",_.fillText("SUPER QUALITY",M,190),_.fillStyle="#ffffff",_.font="bold 24px Arial",_.fillText("BATTERY",M,218),_.fillText("1.5V",M,242),_.fillStyle="#fde68a",_.font="bold 30px Arial",_.fillText("1.5V  DRY CELL",m*.75,p/2+10)});o.wrapS=Mi,o.offset.x=.25;const l=.09,h=.32,f=D(new ee(l,l,h,48,1,!0),new pe({map:o,roughness:.35}),0,h/2+.006),u=D(new ee(l*.98,l*.98,.012,48),At(),0,h+.006),d=D(new ee(.03,.032,.025,24),At(),0,h+.024),g=D(new ee(l*.98,l*.98,.012,48),_t(10265519),0,.006);r(f,u,d,g);break}case"accumulator":{const o=en(1024,768,(p,M,S)=>{p.fillStyle="#f8fafc",p.fillRect(0,0,M,S),p.fillStyle="#1d4ed8",p.strokeStyle="#1d4ed8",p.textAlign="center",p.font="bold 44px Arial",p.fillText("UPPER LEVEL",M/2,70),p.fillRect(M*.08,90,M*.84,6),p.fillText("LOWER LEVEL",M/2,170),p.fillRect(M*.08,190,M*.84,6),p.fillRect(M*.06,250,M*.88,12),p.fillRect(M*.06,280,M*.4,300),p.fillStyle="#ffffff",p.font="bold 120px Arial",p.fillText("12V",M*.26,440),p.font="bold 34px Arial",p.fillText("LEAD-ACID",M*.26,520),p.fillStyle="#1d4ed8",p.font="bold 110px Arial",p.fillText("NS60",M*.7,400),p.font="bold 56px Arial",p.fillText("12V / 45AH",M*.7,480),p.font="bold 34px Arial",p.fillText("ACCUMULATOR",M*.7,545),p.fillRect(M*.06,600,M*.88,10)}),l=new pe({color:15857145,roughness:.55}),h=new pe({color:1920728,roughness:.4}),f=D(Ze(.9,.62,.55,.03),[l,l,l,l,new pe({map:o,roughness:.5}),l],0,.31),u=D(Ze(.94,.09,.59,.025),h,0,.665),d=D(Ze(.96,.03,.61,.01),h,0,.625),g=D(Ze(.16,.055,.03,.008),h,0,.66,.3);r(f,u,d,g);const _=new pe({color:16436245,roughness:.45});for(let p=0;p<6;p++){const M=-.35+p*.14;r(D(new ee(.045,.045,.02,24),h,M,.72,-.12)),r(D(new ee(.036,.04,.05,8),_,M,.75,-.12)),r(D(new ee(.026,.026,.012,16),_,M,.781,-.12))}const m=new pe({color:9146260,roughness:.5,metalness:.7});for(const[p,M]of[[-.38,"+"],[.38,"-"]]){r(D(new ee(.06,.06,.03,28),h,p,.725,.12)),r(D(new ee(.026,.032,.09,20),m,p,.785,.12));const S=pa(M);S.scale.set(.16,.035,1),S.position.set(p,.86,.12),r(S)}break}case"metre_rule":{const o=new pe({color:14066524,roughness:.6}),l=new pe({map:Rh(),color:16113331,roughness:.55});r(D(new Dt(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=D(Ze(.42,.3,.2,.03),Qt(1976635),0,.15),l=D(new Ji(.13,40,0,Math.PI),new pe({map:Ah("G","#1d4ed8")}),0,.12,.101),h=D(new Dt(.006,.12,.004),Tn(14427686),0,.18,.105);h.userData.role="needle",r(o,l,h,Ui(-.12,.3,0,14427686),Ui(.12,.3,0,1120295));break}case"tuning_fork":{const o=D(new Dt(.03,.4,.03),At(),-.04,.42),l=o.clone();l.position.x=.04;const h=D(new Xt(.04,.015,10,20,Math.PI),At(),0,.22);h.rotation.z=Math.PI;const f=D(new ee(.015,.015,.14,12),At(),0,.12),u=D(Ze(.24,.05,.14,.01),ni(),0,.025);r(o,l,h,f,u);break}case"pulley":{const o=D(new ee(.15,.15,.05,40),_t(10265519),0,.9);o.rotation.x=Math.PI/2;const l=D(new Xt(.15,.015,10,40),Bt(3621201),0,.9),h=D(Ze(.06,.12,.08,.01),_t(5395035),0,1.08),f=D(new ee(.012,.012,1.1,12),_t(),-.3,.55),u=D(new ee(.01,.01,.3,12),_t(),-.15,1.08);u.rotation.z=Math.PI/2;const d=D(Ze(.36,.03,.24,.01),Qt(2042167),-.3,.015),g=D(new ee(.003,.003,.6,6),Bt(16119284),.15,.6);r(o,l,h,f,u,d,g,D(new ee(.05,.05,.1,20),ii(),.15,.25));break}case"petri_dish":{r(D(new ee(.22,.22,.05,48,1,!0),dt(),0,.025)),r(D(new ee(.22,.22,.004,48),dt(),0,.002)),r(D(new ee(.21,.21,.02,48),new pe({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,h=.05+o%3*.04;r(D(new ee(.02+o%2*.01,.02,.006,16),Tn(16317180),Math.cos(l)*h,.025,Math.sin(l)*h))}break}case"hand_lens":{const o=D(new qt(.14,32,32),dt(15988991),0,.03);o.scale.set(1,.16,1);const l=D(new Xt(.14,.018,12,48),Bt(1120295),0,.03);l.rotation.x=Math.PI/2;const h=D(Ze(.3,.035,.05,.012),Bt(1120295),.29,.03);r(o,l,h);break}case"scalpel":{const o=D(Ze(.32,.02,.035,.006),At(),0,.012),l=new dr;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const h=new Ie(new Is(l,{depth:.003,bevelEnabled:!1}),At());h.rotation.x=-Math.PI/2,h.position.set(.16,.02,.02),r(o,h);break}case"forceps":{for(const o of[-1,1]){const l=D(Ze(.36,.012,.03,.004),At(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(D(Ze(.05,.016,.08,.006),At(),-.18,.012));break}case"dissecting_tray":{r(D(Ze(.9,.08,.6,.03),Qt(2042167),0,.04)),r(D(new Dt(.82,.01,.52),new pe({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(D(new ee(.006,.006,.06,8),At(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(D(new ee(.16,.16,.5,36,1,!0),dt(),0,.25)),r(D(new ee(.17,.17,.06,36),Bt(1013358),0,.53)),r(D(new ee(.161,.161,.18,36,1,!0,-.6,1.2),new pe({color:16777215,roughness:.8,side:Jt}),0,.3)),r(Nn(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=D(new ee(.22,.16,.3,32),Qt(11817737),0,.15),l=D(new ee(.2,.2,.02,32),Tn(4139549),0,.29),h=D(new ee(.015,.02,.5,10),Tn(1409085),0,.54);r(o,l,h);const f=new pe({color:2278750,roughness:.5,side:Jt});for(let u=0;u<6;u++){const d=D(new qt(.09,16,10),f,0,.42+u*.07);d.scale.set(1.4,.15,.6),d.rotation.y=u*2.1,d.position.x=Math.cos(u*2.1)*.08,d.position.z=-Math.sin(u*2.1)*.08,r(d)}break}case"soil_sieve":{const o=D(new ee(.4,.4,.14,48,1,!0),new pe({color:10576391,roughness:.6,side:Jt}),0,.07),l=en(256,256,(f,u,d)=>{f.clearRect(0,0,u,d),f.strokeStyle="#6b7280",f.lineWidth=2;for(let g=0;g<u;g+=8)f.beginPath(),f.moveTo(g,0),f.lineTo(g,d),f.moveTo(0,g),f.lineTo(u,g),f.stroke()}),h=D(new Ji(.39,48),new pe({map:l,transparent:!0,metalness:.6,side:Jt}),0,.03);h.rotation.x=-Math.PI/2,r(o,h);for(let f=0;f<14;f++){const u=f*2.4,d=f%4*.08;r(D(new ql(.025+f%3*.01),Tn(7893356),Math.cos(u)*d,.05,Math.sin(u)*d))}break}case"rain_gauge":{const o=D(new ee(.2,.06,.16,36,1,!0),_t(13358561),0,1),l=D(new ee(.2,.2,.08,36,1,!0),_t(13358561),0,1.12),h=D(new ee(.1,.1,.9,32,1,!0),dt(),0,.47),f=D(new ee(.03,.01,.1,12),_t(5395035),0,.01);r(o,l,h,f,da(.1,.1,.75,5),Nn(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=D(new ee(.22,.25,.42,36),Qt(1483594),0,.21),l=D(new ee(.025,.04,.6,16),Qt(1483594),.4,.4);l.rotation.z=-.95;const h=D(new ee(.07,.04,.06,20),_t(10265519),.64,.58);h.rotation.z=-.95;const f=D(new Xt(.18,.022,10,32,Math.PI),Qt(1409085),0,.42);r(o,l,h,f,Nn(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(D(Ze(.9,.12,.55,.02),Bt(1120295),0,.06)),r(D(new Dt(.84,.02,.49),Tn(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const h=-.35+o*.14,f=-.15+l*.15;r(D(new ee(.004,.004,.08,6),Tn(1483594),h,.16,f));const u=D(new qt(.022,10,8),Tn(2278750),h,.2,f);u.scale.set(1.6,.3,.8),r(u)}break}case"garden_trowel":{const o=D(new qt(.12,24,12,0,Math.PI,0,Math.PI/2),_t(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=D(new ee(.012,.012,.1,10),_t(),0,.03);l.rotation.z=Math.PI/2;const h=D(new ee(.03,.03,.24,16),ni(),-.17,.03);h.rotation.z=Math.PI/2,r(o,l,h);break}case"hand_hoe":{const o=new $t,l=new pe({color:13213802,roughness:.6}),h=new pe({color:1842980,roughness:.45,metalness:.6}),f=D(new ee(.03,.034,1.6,20),l,.85,0);f.rotation.z=Math.PI/2;const u=D(new ee(.05,.05,.14,24),h,.05,0);u.rotation.z=Math.PI/2;const d=D(Ze(.05,.14,.05,.01),h,0,-.09),g=new dr;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const _=new Is(g,{depth:.014,bevelEnabled:!1}),m=new Ie(_,new pe({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const p=D(new Dt(.016,.04,.28),new pe({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(f,u,d,m,p),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new $t,l=new pe({color:14729103,roughness:.55}),h=new pe({color:2303531,roughness:.5,metalness:.6}),f=D(new ee(.045,.036,1.3,20),l,.72,0);f.rotation.z=Math.PI/2;const u=D(Ze(.16,.11,.11,.012),h,.06,0),d=D(Ze(.03,.09,.08,.006),At(),.16,0),g=D(Ze(.05,.05,.24,.01),h,0,-.07);o.add(f,u,d,g);for(const _ of[-.09,0,.09]){const m=D(Ze(.04,.5,.025,.008),h,0,-.33,_),p=D(new Xn(.016,.07,4),new pe({color:11844032,roughness:.25,metalness:1}),0,-.61,_);p.rotation.z=Math.PI,o.add(m,p)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=D(new ee(.02,.02,1.2,12),_t(7041664),0,.75),l=D(new ee(.025,.025,.5,12),_t(7041664),0,1.35);l.rotation.z=Math.PI/2;const h=new Ie(new ts(new Io(.3,.05,4),200,.012,6,!1),_t(10265519));h.position.y=.15,r(o,l,h,D(new ee(.25,.25,.04,32),Tn(5978660),0,.02));break}case"soil_sample":{r(D(Ze(.7,.08,.45,.02),Bt(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,h)=>{const f=D(new qt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new pe({color:l,roughness:1}),-.22+h*.22,.08);f.scale.y=.55,r(f)});break}case"safety_goggles":{for(const o of[-1,1]){const l=D(new qt(.085,24,16),new pe({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const h=D(new Xt(.085,.014,10,32),Bt(1013358),o*.1,.08);r(l,h)}r(D(new Xt(.2,.012,8,40,Math.PI),Bt(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=D(new ee(.01,.01,.5,10),_t(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(D(new Xt(.03,.008,8,20),_t(7041664),.26,.015));break}case"heat_proof_mat":{r(D(Ze(.8,.03,.8,.01),new pe({color:15197668,roughness:.95}),0,.015));break}default:r(D(Ze(.3,.3,.3,.03),Tn(10265519),0,.15))}s.traverse(o=>{o instanceof Ie&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new Fn;s.children.forEach(o=>{o instanceof An||a.expandByObject(o)});const c=pa(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function Ch(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new Ie(new ts(new Kl(t,s,n),32,.014,8,!1),new pe({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const Ru=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],_v=Ru.flat(),vv=i=>_v.find(e=>e.id===i);function xv(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const yv=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",Mv={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},Sv={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},bv={class:"space-y-1"},Ev=["onClick"],wv={class:"truncate"},Tv={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},Av={class:"flex items-center justify-between gap-2 mb-2"},Rv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},Cv={class:"flex flex-wrap gap-1.5"},Pv=["onClick"],Dv={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Lv={class:"flex items-center gap-2"},Iv={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},Nv={class:"text-xs font-medium text-gray-400 ml-1"},Uv={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Fv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Ov=["max"],Bv={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},zv={class:"flex flex-wrap gap-1.5"},kv=["onClick"],Vv={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Hv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},Gv={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},Wv={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},Xv={class:"flex gap-1.5"},qv=["onClick"],Yv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Zv=["value"],Kv={class:"flex items-center justify-between"},$v={class:"flex gap-1.5"},Jv={key:0,class:"pt-1"},jv={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},Qv={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},ex={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},tx={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},nx={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},ix={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},sx={class:"flex flex-wrap gap-1.5"},rx={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},ax={class:"text-center"},ox={class:"flex items-center gap-2 flex-shrink-0"},lx={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},cx={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},hx={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},ux=["max"],fx={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},dx={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},px={class:"flex items-start justify-between gap-2"},mx={class:"text-xs text-gray-700 dark:text-gray-200"},gx={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},_x=.9,Ph=5,Sx=Uu({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean},wallShelves:{type:Boolean}},emits:["takeChemical","putBack","pickApparatus","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=Et(null),a=Et(!1);let c,o,l,h;const f=new Map,u=new Xd,d=new Q,g=new vi(new I(0,1,0),0),_=Et(null),m=Et(null),p=Et(null),M=Et(null);let S=!1,y=0;const A={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},E=T=>{if(L.value==="stopwatch"){if(T==="switch_on")return"Start";if(T==="switch_off")return"Stop";if(T==="measure")return"Read Time"}if(L.value==="microscope"){if(T==="switch_on")return"Light On";if(T==="switch_off")return"Light Off";if(T==="inspect")return"Observe"}return A[T]||T},R=()=>new Map(n.objectCatalog.map(T=>[T.object_type,T])),v=Et([]),w=Et(""),L=Et(null),U=Et(null),z=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],q=["battery","dry_cell","accumulator"],J=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],k=new Map,$=new Map,F=new Map,X=new Map,se=Et([...n.connections||[]]),fe=Et(null),de=Et(null),ve=Et(""),Je=Et(0),St=Et(100),it=Et(null),re=Et(!1),_e=Et(null),ce=Et(null),Le=Et(null),Ye=new Map,He=new Map,vt=new Map,je=Et(50),he=Et(40),me=Et("very_blurred"),ge=Et(!1),Te=Et(!1),Me=new Map,Ke=new Map,ze=new Map,Qe=Et(0),rt=Et(0),B=Et(!1);let Tt=[];const gt={very_blurred:10,blurred:5,almost_focused:2,focused:0};function C(T){ce.value=T,it.value="protractor",m.value="measure"}const x=Et(null),W=Et([]);function Z(T){const P=R().get(T.object_type),N={...(P==null?void 0:P.default_props)||{},...T.props||{}},O=No(T.object_type,T.key,N.display_name||(P==null?void 0:P.display_name)||T.object_type,N);if(O.position.set(T.position.x,T.position.y,T.position.z),T.rotation&&(O.rotation.y=T.rotation.y),o.add(O),f.set(T.key,O),z.includes(T.object_type)){const H=ye(T.object_type,N);k.set(T.key,H),te(T.key,H/Number(N.capacity_ml??250))}q.includes(T.object_type)&&$.set(T.key,Number(N.voltage??6))}function ne(T){if(n.readOnly)return;const P=W.value.findIndex(O=>O.key===T);if(P===-1)return;const N=W.value[P];Z(N),W.value.splice(P,1),s("action",{objectKey:T,action:"move",value:T})}function le(T){const P=n.sceneObjects.find(O=>O.key===T);if(!P)return{};const N=R().get(P.object_type);return{...(N==null?void 0:N.default_props)||{},...P.props||{}}}function ye(T,P){return P.current_volume!==void 0?Number(P.current_volume):J.includes(T)?Number(P.capacity_ml??50):0}function te(T,P){const N=f.get(T);if(!N)return;const O=Math.max(.001,Math.min(1,P));N.traverse(H=>{if(H instanceof Ie&&H.userData.role==="liquid"){const ie=H.userData.maxFillHeight;H.scale.y=O,H.position.y=ie*O/2}})}function oe(T){const P=new Set([T]),N=[T];for(;N.length;){const O=N.shift();se.value.forEach(H=>{H.from===O&&!P.has(H.to)&&(P.add(H.to),N.push(H.to)),H.to===O&&!P.has(H.from)&&(P.add(H.from),N.push(H.from))})}return P}function we(T){const P=n.sceneObjects.find(Ht=>q.includes(Ht.object_type)),N=n.sceneObjects.find(Ht=>Ht.object_type==="switch"),O=n.sceneObjects.find(Ht=>Ht.object_type==="resistor"),H=n.sceneObjects.find(Ht=>Ht.key===T);if(!H)return{value:0,reason:null};if(!P||!N||!O)return{value:0,reason:"The circuit is incomplete. Check your connections."};const ie=oe(P.key),xe=ie.has(N.key),et=ie.has(O.key),tt=ie.has(T),xt=F.get(N.key)==="on";if(xe&&xt&&!et)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!xe||!et)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((F.get(P.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!xt)return{value:0,reason:"Close the switch before taking the reading."};if(!tt)return H.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:H.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const ft=$.get(P.key)??le(P.key).voltage??6,st=le(O.key).resistance_ohm??10,ct=ft/st;return H.object_type==="ammeter"?{value:Math.round(ct*100)/100,reason:null}:H.object_type==="voltmeter"?{value:ft,reason:null}:{value:0,reason:null}}function Ge(T){const P=X.get(T);if(!P)return 25;const N=(Date.now()-P)/1e3;return Math.min(100,Math.round(25+N*3.5))}function Ae(T,P){const N=f.get(T),O=f.get(P);if(!N||!O)return{ok:!1};if(N.position.distanceTo(O.position)>_x)return{ok:!1};const H=Ke.has(P)?Number(le(P).natural_length_cm??15)+(Ke.get(P)??0):le(P).length_cm??le(P).natural_length_cm??10,ie=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((H+ie)*10)/10}}function be(T){const P=Ye.get(T);if(!P)return"very_blurred";const N=Number(le(P).optimal_focus??50),O=Number(le(P).focus_tolerance??6),H=vt.get(T)??40,ie=O*(40/H),xe=He.get(T)??0,et=Math.abs(xe-N);return et<=ie?"focused":et<=ie*2?"almost_focused":et<=ie*4?"blurred":"very_blurred"}function ke(T){_.value===T&&(je.value=He.get(T)??50,he.value=vt.get(T)??40,ge.value=F.get(T)==="on",Te.value=Ye.has(T),me.value=be(T))}function $e(T){_.value&&(vt.set(_.value,T),s("action",{objectKey:_.value,action:"select_objective",value:String(T)}),ke(_.value))}function at(T){_.value&&(He.set(_.value,T),s("action",{objectKey:_.value,action:"focus_coarse",value:String(Math.round(T))}),ke(_.value))}function V(T){if(!_.value)return;const P=_.value,N=Math.max(0,Math.min(100,(He.get(P)??50)+T));He.set(P,N),s("action",{objectKey:P,action:"focus_fine",value:String(N)}),ke(P)}function Se(T){const N=[...Me.get(T)??new Set].reduce((ft,st)=>ft+Number(le(st).mass_g??0),0),O=Number(le(T).spring_constant_n_per_m??40),ie=N/1e3*9.8/O*100,xe=Number(le(T).max_safe_extension_cm??12),et=ze.get(T)??0,tt=ie>xe;tt&&et===0&&ze.set(T,(ie-xe)*.3);const xt=ie+(ze.get(T)??0);return Ke.set(T,Math.round(xt*100)/100),ae(T,xt),_.value===T&&(rt.value=N,Qe.value=Math.round(xt*100)/100,B.value=tt),{totalMassG:N,exceeded:tt}}function ae(T,P){const N=f.get(T);N&&N.traverse(O=>{if(O instanceof Ie&&O.userData.role==="spring_body"){const H=O.userData.naturalLengthUnits,ie=O.userData.maxLengthUnits,xe=Math.min(ie,H+Math.max(0,P)*.05);O.scale.y=xe/ie,O.position.y=.85-ie*O.scale.y/2}if(O.userData.role==="spring_hanger"){const H=[...N.children].find(ie=>ie.userData.role==="spring_body");H&&(O.position.y=.85-H.userData.maxLengthUnits*H.scale.y)}})}function Ee(T){return new I(Math.sin(T),0,Math.cos(T))}function Pe(T,P){return T.clone().sub(P.clone().multiplyScalar(2*T.dot(P)))}function ue(T,P,N,O){let H=P.clone(),ie=-H.dot(T);ie<0&&(ie=-ie,H=H.clone().negate());const xe=N/O,et=xe*xe*(1-ie*ie);if(et>1)return null;const tt=Math.sqrt(1-et);return T.clone().multiplyScalar(xe).add(H.clone().multiplyScalar(xe*ie-tt))}function Ve(T,P){const N=f.get(T),O=f.get(P);if(!N||!O)return null;const H=N.position.clone(),ie=Ee(N.rotation.y),xe=Ee(O.rotation.y),et=ie.dot(xe);if(Math.abs(et)<.001)return null;const tt=O.position.clone().sub(H).dot(xe)/et;if(tt<=.05)return null;const xt=H.clone().add(ie.clone().multiplyScalar(tt));return xt.distanceTo(O.position)>.35?null:{point:xt,normal:xe,incidentDir:ie}}function Fe(){Tt.forEach(T=>{o.remove(T),T instanceof Ie&&(T.geometry.dispose(),T.material.dispose())}),Tt=[]}function Ft(T,P,N){const O=T.clone().add(P).multiplyScalar(.5),H=Math.max(.01,T.distanceTo(P)),ie=new Ie(new ee(.006,.006,H,8),new pe({color:N,emissive:N,emissiveIntensity:.4,roughness:.4}));ie.position.copy(O);const xe=P.clone().sub(T).normalize();return ie.quaternion.copy(new Ti().setFromUnitVectors(new I(0,1,0),xe)),ie}function Ct(){Fe();const T=n.sceneObjects.find(tt=>tt.object_type==="ray_box"),P=n.sceneObjects.find(tt=>tt.object_type==="mirror"),N=n.sceneObjects.find(tt=>tt.object_type==="glass_block"),O=P||N;if(!T||!O||F.get(T.key)!=="on")return;const H=Ve(T.key,O.key);if(!H)return;const ie=f.get(T.key),xe=Ft(ie.position,H.point,16498468),et=Ft(H.point.clone().sub(H.normal.clone().multiplyScalar(.01)),H.point.clone().add(H.normal.clone().multiplyScalar(.4)),9741240);if(o.add(xe,et),Tt.push(xe,et),P){const tt=Pe(H.incidentDir,H.normal),xt=Ft(H.point,H.point.clone().add(tt.multiplyScalar(1.2)),16498468);o.add(xt),Tt.push(xt)}else if(N){const tt=Number(le(N.key).refractive_index??1.5),xt=ue(H.incidentDir,H.normal,1,tt);if(xt){const ft=H.point.clone().add(xt.clone().multiplyScalar(.4)),st=Ft(H.point,ft,6333946),ct=Ft(ft,ft.clone().add(H.incidentDir.clone().multiplyScalar(1)),16498468);o.add(st,ct),Tt.push(st,ct)}}}function Pn(T,P,N){const O=n.sceneObjects.find(ft=>ft.object_type==="ray_box");if(!O)return{ok:!1};const H=Ve(O.key,P);if(!H)return{ok:!1};const ie=f.get(T);if(!ie||ie.position.distanceTo(H.point)>.4)return{ok:!1};let xe;if(N==="incidence")xe=H.incidentDir.clone().negate();else{const ft=n.sceneObjects.find(st=>st.key===P);if((ft==null?void 0:ft.object_type)==="glass_block"){const st=Number(le(P).refractive_index??1.5),ct=ue(H.incidentDir,H.normal,1,st);if(!ct)return{ok:!1};xe=ct}else xe=Pe(H.incidentDir,H.normal)}const et=Math.abs(xe.normalize().dot(H.normal)),tt=Math.acos(Math.min(1,Math.max(-1,et)))*180/Math.PI,xt=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((tt+xt)*10)/10}}const fn=new Map,as=new Map;function Rr(T){const P=f.get(T);if(!P)return;const N=fn.get(T),O=N?Number(le(N).mass_g??0):0;P.traverse(H=>{var ie;if(H instanceof An&&H.userData.role==="balance_display"){const xe=H.material;(ie=xe.map)==null||ie.dispose(),xe.map=Na(`${O.toFixed(1)} g`),xe.needsUpdate=!0}})}const $n=new Map,Hi=new Map,qs=new Map,Ys=Et("00:00.0");function Zs(T){const P=Math.max(0,T)/1e3,N=Math.floor(P/60).toString().padStart(2,"0"),O=(P%60).toFixed(1).padStart(4,"0");return`${N}:${O}`}function Bn(T){const P=qs.get(T)??0;return $n.get(T)?P+(Date.now()-(Hi.get(T)??Date.now())):P}function Gi(T){const P=f.get(T),N=Bn(T);_.value===T&&(Ys.value=Zs(N)),P&&P.traverse(O=>{var H;if(O instanceof An&&O.userData.role==="stopwatch_display"){const ie=O.material;(H=ie.map)==null||H.dispose(),ie.map=Na(Zs(N)),ie.needsUpdate=!0}})}function Cr(T){$n.set(T,!1),qs.set(T,0),Hi.delete(T),Gi(T)}function Ks(T){f.forEach((P,N)=>{P.traverse(O=>{if(!(O instanceof Ie)||O.userData.role==="flame"||O.userData.role==="led")return;(Array.isArray(O.material)?O.material:[O.material]).forEach(ie=>{ie instanceof pe&&(ie.emissive.setHex(N===T?2282478:0),ie.emissiveIntensity=N===T?.3:0)})})})}function os(T){var O;_.value=T,M.value=null,p.value=null;const P=n.sceneObjects.find(H=>H.key===T),N=P?R().get(P.object_type):null;v.value=(N==null?void 0:N.supported_actions)??[],w.value=((O=P==null?void 0:P.props)==null?void 0:O.display_name)??(N==null?void 0:N.display_name)??T,L.value=(P==null?void 0:P.object_type)??null,U.value=(P==null?void 0:P.object_type)==="battery"?$.get(T)??le(T).voltage??6:null,(P==null?void 0:P.object_type)==="microscope"&&ke(T),(P==null?void 0:P.object_type)==="spring"&&Se(T),Ks(T)}function Wi(){_.value=null,M.value=null,fe.value=null,L.value=null,Ks(null)}function ls(T){if(!_.value)return;U.value=T,$.set(_.value,T);const P=f.get(_.value);P&&P.traverse(N=>{var O;if(N instanceof An&&N.userData.role==="voltage"){const H=N.material;(O=H.map)==null||O.dispose(),H.map=Au(T),H.needsUpdate=!0}})}function Pr(T){const P=n.sceneObjects.find(O=>O.key===T);if(!P)return;const N=P.object_type;if(re.value=!1,_e.value=T,z.includes(N)){fe.value="readonly",ve.value="ml",de.value=Math.round(k.get(T)??0),M.value=T;return}if(N==="ammeter"||N==="voltmeter"){const O=we(T);O.reason&&(Le.value=O.reason,setTimeout(()=>{Le.value=null},4e3)),fe.value="readonly",ve.value=N==="ammeter"?"A":"V",de.value=O.value,M.value=T,re.value=!!O.reason&&O.reason.includes("Short circuit");return}if(N==="balance"){fe.value="readonly",ve.value="g";const O=fn.get(T);de.value=O?Number(le(O).mass_g??0):0,M.value=T;return}if(N==="stopwatch"){fe.value="readonly",ve.value="s",de.value=Math.round(Bn(T)/100)/10,M.value=T;return}if(N==="spring"){fe.value="readonly",ve.value="cm";const O=Number(le(T).natural_length_cm??15);de.value=Math.round((O+(Ke.get(T)??0))*10)/10,M.value=T,_e.value=T;return}if(N==="protractor"){ce.value="incidence",it.value="protractor",m.value="measure";return}if(N==="ruler"||N==="metre_rule"||N==="thermometer"){it.value=N==="thermometer"?"thermometer":"ruler",m.value="measure";return}fe.value="slider",ve.value="ml",St.value=Number(le(T).capacity_ml??100),Je.value=Math.round(St.value/2),M.value=T}function Dr(T){var P;if(_.value&&!n.readOnly&&!(T==="focus_coarse"||T==="focus_fine"||T==="select_objective")){if(T==="inspect"){const N=n.sceneObjects.find(et=>et.key===_.value),O=N?R().get(N.object_type):null;let H=(O==null?void 0:O.description)||"No further detail available.";const ie=(P=N==null?void 0:N.props)!=null&&P.chemical_id?vv(N.props.chemical_id):null;if(ie&&N){const et=ie.hazard?` Hazard: ${ie.hazard} - handle with care and wear goggles.`:"",tt=ie.state==="liquid"?` About ${Math.round(k.get(N.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";H=`${ie.name}${ie.formula?` (${ie.formula})`:""}.${tt}${et}`}let xe=null;if(L.value==="microscope"){const et=_.value,tt=Ye.get(et),xt=vt.get(et)??40;if(!tt)H="Place a specimen slide on the stage first.";else if(F.get(et)!=="on")H="Switch on the illumination to see anything through the eyepiece.";else{const ft=be(et),st=le(tt).expected_structures||"the specimen";ft==="focused"?H=`At ×${xt}, clearly focused - you can see ${st}.`:ft==="almost_focused"?H=`At ×${xt}, almost in focus - fine-tune the focus a little more.`:ft==="blurred"?H=`At ×${xt}, blurred - adjust the coarse and fine focus.`:H=`At ×${xt}, very blurred - use the focus knobs before observing.`,xe=ft}}p.value=H,s("action",{objectKey:_.value,action:T,value:xe});return}if(T==="zoom"){b(_.value),s("action",{objectKey:_.value,action:T,value:null});return}if(T==="switch_on"||T==="switch_off"){F.set(_.value,T==="switch_on"?"on":"off"),L.value==="stopwatch"&&(T==="switch_on"&&!$n.get(_.value)?($n.set(_.value,!0),Hi.set(_.value,Date.now())):T==="switch_off"&&$n.get(_.value)&&(qs.set(_.value,Bn(_.value)),$n.set(_.value,!1)),Gi(_.value)),L.value==="microscope"&&ke(_.value),L.value==="ray_box"&&Ct(),s("action",{objectKey:_.value,action:T,value:null});return}if(T==="measure"){Pr(_.value);return}if(T==="connect"||T==="pour"||T==="heat"||T==="move"||T==="rotate"){m.value=T,h.enabled=T!=="move"&&T!=="rotate";return}}}const zn=Et("");ur(m,T=>{T==="connect"?zn.value="Click the object to connect to.":T==="pour"?zn.value="Click the container to pour into.":T==="heat"?zn.value="Click the object to place over the flame.":T==="move"?zn.value="Drag the object to reposition it, then click Done.":T==="rotate"?zn.value="Drag left/right to rotate, then click Done.":T==="measure"&&it.value==="ruler"?zn.value="Click the object to measure - place the ruler close to it first.":T==="measure"&&it.value==="thermometer"?zn.value="Click the substance to take a temperature reading.":T==="measure"&&it.value==="protractor"&&(zn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function Lr(){if(!M.value)return;const T=fe.value==="slider"?String(Math.round(Je.value)):de.value!==null?String(de.value):null;s("action",{objectKey:M.value,action:"measure",value:T,unit:ve.value,label:w.value,safetyIssue:re.value,targetObjectKey:_e.value}),M.value=null,fe.value=null,de.value=null,re.value=!1,ce.value=null}function Va(){if(x.value){Xe();return}m.value=null,it.value=null,ce.value=null,h.enabled=!0}function Ha(){var T,P,N;if(!(!_.value||!m.value)){if(m.value==="move"){const O=f.get(_.value);let H=null;O&&f.forEach((st,ct)=>{ct!==_.value&&st.position.distanceTo(O.position)<.6&&(H=ct)});const ie=_.value;fn.forEach((st,ct)=>{st===ie&&ct!==H&&(fn.delete(ct),Rr(ct))});const xe=H?(T=n.sceneObjects.find(st=>st.key===H))==null?void 0:T.object_type:null;xe==="balance"&&H&&(fn.set(H,ie),Rr(H)),as.forEach((st,ct)=>{if(ct===ie&&st!==H){const Ht=Number(le(ct).volume_ml??0),Vn=Math.max(0,(k.get(st)??0)-Ht);k.set(st,Vn),te(st,Vn/Number(le(st).capacity_ml??250)),as.delete(ct)}});const et=Number(le(ie).volume_ml??0);if(xe&&z.includes(xe)&&H&&et>0&&!as.has(ie)){as.set(ie,H);const st=(k.get(H)??0)+et;k.set(H,st),te(H,st/Number(le(H).capacity_ml??250))}const tt=(P=n.sceneObjects.find(st=>st.key===ie))==null?void 0:P.object_type;if(Ye.forEach((st,ct)=>{st===ie&&ct!==H&&Ye.delete(ct)}),xe==="microscope"&&H&&tt==="biological_model"){Ye.set(H,ie);const st=Number(le(ie).optimal_focus??50),ct=Number(le(ie).focus_tolerance??6),Ht=Math.random()<.5?-1:1,Vn=ct*(3+Math.random()*3)*Ht;He.set(H,Math.max(0,Math.min(100,st+Vn))),vt.set(H,40),ke(H)}let xt,ft=!1;if(tt==="mass_piece"){Me.forEach((ct,Ht)=>{ct.has(ie)&&Ht!==H&&ct.delete(ie)}),xe==="spring"&&H&&(Me.has(H)||Me.set(H,new Set),Me.get(H).add(ie));const st=new Set(H&&xe==="spring"?[H]:[]);Me.forEach((ct,Ht)=>st.add(Ht)),st.forEach(ct=>{const Ht=Se(ct);H===ct&&(xt=Ht.totalMassG,ft=Ht.exceeded)}),ft&&(Le.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Le.value=null},4500))}["ray_box","mirror","glass_block"].includes(tt||"")&&Ct(),s("action",{objectKey:_.value,action:"move",value:H,springLoadG:xt,safetyIssue:ft})}else if(m.value==="rotate"){const O=f.get(_.value),H=O?Math.round(O.rotation.y*180/Math.PI):0,ie=(N=n.sceneObjects.find(xe=>xe.key===_.value))==null?void 0:N.object_type;["ray_box","mirror","glass_block"].includes(ie||"")&&Ct(),s("action",{objectKey:_.value,action:"rotate",value:String(H)})}m.value=null,h.enabled=!0}}function b(T){const P=f.get(T);if(!P)return;const N=P.position.clone().add(new I(0,.3,0)),O=l.position.clone().sub(h.target).normalize(),H=N.clone().add(O.multiplyScalar(1.4)),ie=l.position.clone(),xe=h.target.clone();let et=0;const tt=()=>{et+=.05,l.position.lerpVectors(ie,H,Math.min(et,1)),h.target.lerpVectors(xe,N,Math.min(et,1)),h.update(),et<1&&requestAnimationFrame(tt)};tt()}function G(T){const P=c.domElement.getBoundingClientRect();d.x=(T.clientX-P.left)/P.width*2-1,d.y=-((T.clientY-P.top)/P.height)*2+1}function j(){u.setFromCamera(d,l);const T=[];f.forEach(O=>T.push(O));const P=u.intersectObjects(T,!0);if(P.length===0)return null;let N=P[0].object;for(;N&&!N.userData.objectKey;)N=N.parent;return N?N.userData.objectKey:null}let Y=null;function K(T){if(G(T),Y={x:T.clientX,y:T.clientY},m.value==="move"&&_.value){S=!0;return}if(m.value==="rotate"&&_.value){S=!0,y=T.clientX;return}}function Re(T){if(!(!S||!_.value)){if(G(T),m.value==="move"){u.setFromCamera(d,l);const P=new I;u.ray.intersectPlane(g,P);const N=f.get(_.value);N&&P&&(N.position.x=P.x,N.position.z=P.z)}else if(m.value==="rotate"){const P=T.clientX-y,N=f.get(_.value);N&&(N.rotation.y=P*.02)}}}function Ne(T){const P=Y&&(Math.abs(T.clientX-Y.x)>4||Math.abs(T.clientY-Y.y)>4);if(S=!1,m.value==="move"||m.value==="rotate"||P||(G(T),Jn()))return;const N=j();if(!N){Wi();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(N===_.value)return;const O=_.value,H=m.value;if(H==="measure"){if(it.value==="ruler"){const ie=Ae(O,N);if(!ie.ok){Le.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Le.value=null},3500);return}fe.value="readonly",ve.value="cm",de.value=ie.value}else if(it.value==="thermometer")fe.value="readonly",ve.value="°C",de.value=Ge(N);else if(it.value==="protractor"){const ie=ce.value??"incidence",xe=Pn(O,N,ie);if(!xe.ok){Le.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Le.value=null},3500);return}fe.value="readonly",ve.value="°",de.value=xe.value}_e.value=N,M.value=O,m.value=null,it.value=null,h.enabled=!0;return}if(H==="connect"){const ie=f.get(O),xe=f.get(N);ie&&xe&&o.add(Ch(ie.position,xe.position)),se.value.push({from:O,to:N}),s("action",{objectKey:O,action:H,value:N}),m.value=null,h.enabled=!0;return}if(H==="heat"){X.set(N,Date.now()),s("action",{objectKey:O,action:H,value:N}),m.value=null,h.enabled=!0;return}if(H==="pour"){Ce(O,N);return}}os(N)}function Ce(T,P){var xt,ft,st,ct;const N=n.sceneObjects.find(Ht=>Ht.key===T),O=n.sceneObjects.find(Ht=>Ht.key===P);if(!N||!O)return;const H=Number(le(P).capacity_ml??250),ie=k.get(P)??0,xe=Math.max(0,H-ie),et=z.includes(N.object_type),tt=et?k.get(T)??0:xe;x.value={from:T,to:P,amount:0,max:Math.max(1,Math.round(Math.min(xe,tt))),fromLabel:((xt=N.props)==null?void 0:xt.display_name)??((ft=R().get(N.object_type))==null?void 0:ft.display_name)??N.object_type,toLabel:((st=O.props)==null?void 0:st.display_name)??((ct=R().get(O.object_type))==null?void 0:ct.display_name)??O.object_type,fromTracked:et}}function Oe(){if(!x.value)return;const{from:T,to:P,amount:N,fromTracked:O}=x.value,H=Number(le(P).capacity_ml??250);if(te(P,((k.get(P)??0)+N)/H),O){const ie=Number(le(T).capacity_ml??250);te(T,Math.max(0,(k.get(T)??0)-N)/ie)}}ur(()=>{var T;return(T=x.value)==null?void 0:T.amount},Oe);function We(){if(!x.value)return;const{from:T,to:P,amount:N,fromTracked:O}=x.value;ot(T,P,N),k.set(P,Math.round((k.get(P)??0)+N)),O&&k.set(T,Math.max(0,Math.round((k.get(T)??0)-N))),s("action",{objectKey:P,action:"pour",value:String(Math.round(N))}),x.value=null,m.value=null,h.enabled=!0}function ot(T,P,N){if(N<=0)return;const O=ut(T),H=ut(P);if(!O||!H)return;const ie=k.get(P)??0;H.color.lerp(O.color,ie<=0?1:N/(ie+N))}function ut(T){var N;let P=null;return(N=f.get(T))==null||N.traverse(O=>{!P&&O instanceof Ie&&O.userData.role==="liquid"&&(P=O.material)}),P}function Xe(){if(x.value){const{from:T,to:P,fromTracked:N}=x.value,O=Number(le(P).capacity_ml??250);if(te(P,(k.get(P)??0)/O),N){const H=Number(le(T).capacity_ml??250);te(T,(k.get(T)??0)/H)}}x.value=null,m.value=null,h.enabled=!0}let Be=null;const Vt=Et(null);function Gt(){const T=r.value;if(!T)return;try{Be=sv(T,{unitScale:Ph,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14,cupboard:!!n.cupboard,wallCabinets:!!n.wallShelves})}catch(N){console.error("Virtual Lab: failed to create a WebGL context",N),a.value=!0;return}c=Be.renderer,o=Be.scene,l=Be.camera,h=Be.controls,n.sceneObjects.forEach(N=>{if(N.in_tray){W.value.push(N);return}Z(N)}),(n.connections||[]).forEach(N=>{const O=f.get(N.from),H=f.get(N.to);O&&H&&o.add(Ch(O.position,H.position))}),Ct(),bt(),ui(),n.fixedView?Du():rc(),c.domElement.addEventListener("pointerdown",K),c.domElement.addEventListener("pointermove",Re),c.domElement.addEventListener("pointermove",ac),c.domElement.addEventListener("pointerup",Ne);let P=0;Be.onFrame(N=>{P+=N,P>.15&&(P=0,$n.forEach((O,H)=>{O&&Gi(H)})),f.forEach((O,H)=>{const ie=H===_.value||H===Vt.value;O.children.forEach(xe=>{xe.userData.role==="label"&&(xe.visible=ie)})}),Rt.forEach((O,H)=>{O.children.forEach(ie=>{ie.userData.role==="label"&&(ie.visible=H===dn)})}),Dn.forEach((O,H)=>{O.children.forEach(ie=>{ie.userData.role==="label"&&(ie.visible=H===Wt)})})})}ur(()=>n.sceneObjects.map(T=>`${T.key}@${T.position.x},${T.position.z}`).join("|"),()=>{if(!Be)return;const T=new Map(n.sceneObjects.filter(N=>!N.in_tray).map(N=>[N.key,N]));let P=!1;f.forEach((N,O)=>{T.has(O)||(o.remove(N),N.traverse(H=>{var ie;(H instanceof Ie||H instanceof An)&&((ie=H.geometry)==null||ie.dispose(),(Array.isArray(H.material)?H.material:[H.material]).forEach(et=>{var tt;(tt=et.map)==null||tt.dispose(),et.dispose()}))}),f.delete(O),_.value===O&&Wi())}),T.forEach((N,O)=>{const H=f.get(O);H?H.position.set(N.position.x,N.position.y,N.position.z):(Z(N),P=!0)}),P&&!n.fixedView&&rc(),vn()});const Rt=new Map,sn=[];function Ue(T,P){const N=document.createElement("canvas");N.width=512,N.height=144;const O=N.getContext("2d");O.fillStyle="#fffdf4",O.fillRect(0,0,512,144),O.fillStyle="#1e3a8a",O.fillRect(0,0,512,10),O.fillStyle="#111827",O.textAlign="center",O.textBaseline="middle";let H=46;for(O.font=`bold ${H}px sans-serif`;O.measureText(T).width>490&&H>26;)H-=2,O.font=`bold ${H}px sans-serif`;if(O.measureText(T).width>490){const xe=T.split(" "),et=Math.ceil(xe.length/2);O.fillText(xe.slice(0,et).join(" "),256,P?42:52),O.fillText(xe.slice(et).join(" "),256,P?80:96)}else O.fillText(T,256,P?54:76);P&&(O.font="bold 38px serif",O.fillStyle="#1e3a8a",O.fillText(P,256,118));const ie=new br(N);return ie.colorSpace=hn,ie.anisotropy=8,ie}let dn=null;function bt(){const T=Be==null?void 0:Be.cupboard;T&&(Ru.forEach((P,N)=>{const O=T.bays[N<2?0:1],H=O.levels[N%2],ie=(O.maxX-O.minX)/P.length;P.forEach((xe,et)=>{const tt=No(yv(xe),`cupboard:${xe.id}`,xe.name,xv(xe));tt.position.set(O.minX+ie*(et+.5),H,O.frontZ-.6),tt.userData.chemicalId=xe.id,tt.traverse(ft=>{ft instanceof Ie&&(ft.castShadow=!1,ft.receiveShadow=!1)}),o.add(tt),Rt.set(xe.id,tt);const xt=new Ie(new Zn(ie*.92,.26),new ss({map:Ue(xe.name,xe.formula),toneMapped:!1}));xt.position.set(tt.position.x,H+.14,O.frontZ-.08),xt.rotation.x=-.35,xt.userData.chemicalId=xe.id,o.add(xt),sn.push(xt)})}),vn())}function vn(){if(Rt.size===0)return;const T=new Set(n.sceneObjects.map(P=>{var N;return(N=P.props)==null?void 0:N.chemical_id}).filter(Boolean));Rt.forEach((P,N)=>{P.visible=!T.has(N)})}function bn(){const T=Be==null?void 0:Be.cupboard,P=Be==null?void 0:Be.wallCabinets;if(!T&&!P)return null;u.setFromCamera(d,l);const N=[];T&&N.push(...T.doors,...T.blockers),P&&N.push(...P.doors,...P.blockers),f.forEach(xe=>N.push(xe)),Rt.forEach(xe=>{xe.visible&&N.push(xe)}),sn.forEach(xe=>N.push(xe)),Dn.forEach(xe=>N.push(xe));const O=u.intersectObjects(N,!0)[0];if(!O)return null;const H=Be.doorOf(O.object);if(H)return{kind:"door",door:H};let ie=O.object;for(;ie&&!ie.userData.chemicalId&&!ie.userData.shelfType;)ie=ie.parent;return ie?ie.userData.shelfType?{kind:"apparatus",type:ie.userData.shelfType}:{kind:"chemical",id:ie.userData.chemicalId}:null}function Jn(){const T=bn();if(!T)return!1;if(T.kind==="apparatus")return s("pickApparatus",T.type),!0;if(T.kind==="chemical"){const P=n.sceneObjects.find(N=>{var O;return((O=N.props)==null?void 0:O.chemical_id)===T.id});return P?s("putBack",P.key):s("takeChemical",T.id),!0}return Be.toggleDoor(T.door),!0}const Dn=new Map,Pt=[];let Wt=null;const jn=[[{key:"physics",label:"Physics"},{key:"general",label:"General"}],[{key:"chemistry",label:"Chemistry"},{key:"biology",label:"Biology"},{key:"agriculture",label:"Agriculture"}]],Ot=["physics","chemistry","biology","agriculture"];function kn(T){o.remove(T),T.traverse(P=>{var N;(P instanceof Ie||P instanceof An)&&((N=P.geometry)==null||N.dispose(),(Array.isArray(P.material)?P.material:[P.material]).forEach(H=>{var ie;(ie=H.map)==null||ie.dispose(),H.dispose()}))})}function ui(){const T=Be==null?void 0:Be.wallCabinets;if(!T)return;Dn.forEach(kn),Dn.clear(),Pt.splice(0).forEach(kn);const P=n.objectCatalog.filter(O=>O.id>0&&O.is_active!==!1),N=O=>Ot.includes(O.category)?O.category:"general";T.cabinets.forEach((O,H)=>{const ie=jn[H].map(ft=>({...ft,items:P.filter(st=>N(st)===ft.key).sort((st,ct)=>st.display_name.localeCompare(ct.display_name))})).filter(ft=>ft.items.length>0);let xe=8;const et=()=>ie.flatMap(ft=>{const st=[];for(let ct=0;ct<ft.items.length;ct+=xe)st.push({label:ft.label,items:ft.items.slice(ct,ct+xe)});return st});let tt=et();for(;tt.length>O.rows.length;)xe++,tt=et();const xt=(O.maxX-O.minX)/xe;tt.forEach((ft,st)=>{const ct=O.rows[st];ft.items.forEach((Vn,Nu)=>{const Ri=No(Vn.object_type,`shelf:${Vn.object_type}`,Vn.display_name,Vn.default_props||{}),$s=new Fn;Ri.children.forEach(Qn=>{Qn instanceof An||$s.expandByObject(Qn)});const Ga=$s.getSize(new I),oc=$s.getCenter(new I),Xi=Math.min(1,xt*.84/Math.max(Ga.x,.01),O.rowHeight*.8/Math.max(Ga.y,.01),O.depth*.9/Math.max(Ga.z,.01));Ri.scale.setScalar(Xi),Ri.position.set(O.minX+xt*(Nu+.5)-oc.x*Xi,ct-$s.min.y*Xi,O.z-oc.z*Xi),Ri.children.forEach(Qn=>{Qn.userData.role==="label"&&(Qn.scale.set(.72/Xi,.158/Xi,1),Qn.position.y=$s.max.y+.2/Xi,Qn.visible=!1)}),Ri.traverse(Qn=>{Qn instanceof Ie&&(Qn.castShadow=!1)}),Ri.userData.shelfType=Vn.object_type,o.add(Ri),Dn.set(Vn.object_type,Ri)});const Ht=new Ie(new Zn(O.maxX-O.minX,.17),new ss({map:Ir(ft.label),toneMapped:!1}));Ht.position.set((O.minX+O.maxX)/2,ct-.085,O.frontZ+.005),o.add(Ht),Pt.push(Ht)})})}function Ir(T){const P=document.createElement("canvas");P.width=1024,P.height=64;const N=P.getContext("2d"),O=N.createLinearGradient(0,0,0,64);O.addColorStop(0,"#f6d98b"),O.addColorStop(1,"#c9962f"),N.fillStyle=O,N.fillRect(0,0,1024,64),N.fillStyle="#3b2606",N.font="bold 50px sans-serif",N.textBaseline="middle",N.fillText(T.toUpperCase(),24,35);const H=new br(P);return H.colorSpace=hn,H.anisotropy=8,H}ur(()=>n.objectCatalog.map(T=>T.object_type).join(","),()=>{Be&&ui()});const Cu=zu(()=>{var T,P;return!!((P=(T=n.sceneObjects.find(N=>N.key===_.value))==null?void 0:T.props)!=null&&P.chemical_id)});function Pu(){const T=_.value;T&&(Wi(),s("putBack",T))}function Du(){if(!Be)return;const T=Ph,P=Be.wallCabinets?new Fn(new I(-1.5*T,-.9*T,-.6*T),new I(1.5*T,1.4*T,.375*T)):new Fn(new I(-.9*T,-.9*T,-.375*T),new I(.9*T,.1*T,.375*T));Be.fitBox(P,Be.wallCabinets?.94:.72,{dir:new I(.4,Be.wallCabinets?3.4:4.2,6.4)})}function rc(){if(!Be||f.size===0)return;o.updateMatrixWorld(!0);const T=new Fn;f.forEach(P=>P.children.forEach(N=>{N.userData.role!=="label"&&T.expandByObject(N)})),Be.frameBox(T)}function ac(T){if(S)return;G(T),Vt.value=j();const P=Vt.value?null:bn();dn=(P==null?void 0:P.kind)==="chemical"?P.id:null,Wt=(P==null?void 0:P.kind)==="apparatus"?P.type:null,c.domElement.style.cursor=Vt.value||P?"pointer":"grab"}function Lu(T,P){(P.state==="on"||P.state==="off")&&F.set(T,P.state);const N=f.get(T);N&&N.traverse(O=>{if(O.userData.role==="lever"&&"state"in P){const H=P.state==="on"||P.state==="closed";O.rotation.z=H?Math.PI/2-.35:Math.PI/2-.9,O.position.x=H?0:-.06}if(O.userData.role==="led"&&"state"in P&&O instanceof Ie){const H=O.material;H.emissiveIntensity=P.state==="on"?1.2:0}if(O.userData.role==="flame"&&"flame"in P&&O instanceof Ie){const H=O.material;H.emissiveIntensity=P.flame==="on"?1:0,H.opacity=P.flame==="on"?.9:0}})}e({setObjectState:Lu});function Iu(){a.value=!1,ku(Gt)}return Dh(Gt),Lh(()=>{c==null||c.domElement.removeEventListener("pointerdown",K),c==null||c.domElement.removeEventListener("pointermove",Re),c==null||c.domElement.removeEventListener("pointermove",ac),c==null||c.domElement.removeEventListener("pointerup",Ne),Be==null||Be.dispose(),Be=null}),(T,P)=>(It(),Lt("div",Mv,[a.value?(It(),Lt("div",Sv,[lc(Vu,{name:"beaker",class:"w-8 h-8"}),P[9]||(P[9]=qe("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),qe("button",{onClick:Iu,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(It(),Lt("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),W.value.length>0?(It(),Lt("div",{key:2,class:Js(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||x.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[P[10]||(P[10]=qe("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),qe("div",bv,[(It(!0),Lt(cs,null,Nr(W.value,N=>{var O,H;return It(),Lt("button",{key:N.key,onClick:ie=>ne(N.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[qe("span",null,Yt(((O=R().get(N.object_type))==null?void 0:O.icon)||"🔬"),1),qe("span",wv,Yt(((H=R().get(N.object_type))==null?void 0:H.display_name)||N.object_type),1)],8,Ev)}),128))])],2)):ln("",!0),_.value&&!m.value?(It(),Lt("div",Tv,[qe("div",Av,[qe("p",Rv,Yt(w.value),1),qe("button",{onClick:Wi,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),qe("div",Cv,[(It(!0),Lt(cs,null,Nr(v.value,N=>(It(),Lt("button",{key:N,onClick:O=>Dr(N),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},Yt(E(N)),9,Pv))),128)),i.cupboard?(It(),Lt("button",{key:0,onClick:Pu,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},Yt(Cu.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):ln("",!0)]),M.value&&fe.value==="readonly"?(It(),Lt("div",Dv,[P[11]||(P[11]=qe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),qe("div",Lv,[qe("span",Iv,[Ur(Yt(de.value),1),qe("span",Nv,Yt(ve.value),1)]),qe("button",{onClick:Lr,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):ln("",!0),M.value&&fe.value==="slider"?(It(),Lt("div",Uv,[qe("p",Fv,"Reading: "+Yt(Math.round(Je.value))+Yt(ve.value),1),cc(qe("input",{"onUpdate:modelValue":P[0]||(P[0]=N=>Je.value=N),type:"range",min:"0",max:St.value,step:"1",class:"w-full accent-emerald-600"},null,8,Ov),[[hc,Je.value,void 0,{number:!0}]]),qe("button",{onClick:Lr,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):ln("",!0),L.value==="battery"?(It(),Lt("div",Bv,[P[12]||(P[12]=qe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),qe("div",zv,[(It(),Lt(cs,null,Nr([1.5,3,6,9,12],N=>qe("button",{key:N,onClick:O=>ls(N),class:Js(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",U.value===N?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},Yt(N)+"V",11,kv)),64))])])):ln("",!0),L.value==="stopwatch"?(It(),Lt("div",Vv,[qe("p",Hv,"Elapsed: "+Yt(Ys.value),1),qe("button",{onClick:P[1]||(P[1]=N=>Cr(_.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):ln("",!0),L.value==="microscope"?(It(),Lt("div",Gv,[Te.value?(It(),Lt(cs,{key:1},[qe("div",null,[P[13]||(P[13]=qe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),qe("div",Xv,[(It(),Lt(cs,null,Nr([40,100,400],N=>qe("button",{key:N,onClick:O=>$e(N),class:Js(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",he.value===N?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+Yt(N),11,qv)),64))])]),qe("div",null,[qe("p",Yv,"Coarse Focus: "+Yt(Math.round(je.value)),1),qe("input",{value:je.value,onChange:P[2]||(P[2]=N=>at(Number(N.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,Zv)]),qe("div",Kv,[P[14]||(P[14]=qe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),qe("div",$v,[qe("button",{onClick:P[3]||(P[3]=N=>V(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),qe("button",{onClick:P[4]||(P[4]=N=>V(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),ge.value?(It(),Lt("div",Jv,[P[16]||(P[16]=qe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),qe("div",jv,[qe("div",{class:"absolute inset-0 flex items-center justify-center",style:Fu({filter:`blur(${gt[me.value]}px)`})},[...P[15]||(P[15]=[qe("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),qe("p",Qv,Yt(me.value.replace("_"," "))+" · ×"+Yt(he.value),1)])):ln("",!0)],64)):(It(),Lt("div",Wv,"Place a specimen slide on the stage first."))])):ln("",!0),L.value==="spring"?(It(),Lt("div",ex,[qe("p",tx,"Attached Load: "+Yt(rt.value)+" g · Extension: "+Yt(Qe.value)+" cm",1),B.value?(It(),Lt("p",nx,"Beyond the spring's safe extension limit.")):ln("",!0)])):ln("",!0),L.value==="protractor"?(It(),Lt("div",ix,[P[17]||(P[17]=qe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),qe("div",sx,[qe("button",{onClick:P[5]||(P[5]=N=>C("incidence")),class:Js(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ce.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),qe("button",{onClick:P[6]||(P[6]=N=>C("outgoing")),class:Js(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ce.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):ln("",!0)])):ln("",!0),m.value&&!x.value?(It(),Lt("div",rx,[qe("span",ax,Yt(zn.value),1),qe("span",ox,[m.value==="move"||m.value==="rotate"?(It(),Lt("button",{key:0,onClick:Ha,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):ln("",!0),qe("button",{onClick:Va,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):ln("",!0),x.value?(It(),Lt("div",lx,[qe("p",cx,"Pouring "+Yt(x.value.fromLabel)+" → "+Yt(x.value.toLabel),1),qe("p",hx,[Ur(Yt(Math.round(x.value.amount))+" ",1),P[18]||(P[18]=qe("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),cc(qe("input",{"onUpdate:modelValue":P[7]||(P[7]=N=>x.value.amount=N),type:"range",min:"0",max:x.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,ux),[[hc,x.value.amount,void 0,{number:!0}]]),qe("div",{class:"flex items-center gap-2 mt-2"},[qe("button",{onClick:Xe,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),qe("button",{onClick:We,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):ln("",!0),lc(Ou,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:Bu(()=>[Le.value?(It(),Lt("div",fx,Yt(Le.value),1)):ln("",!0)]),_:1}),p.value?(It(),Lt("div",dx,[qe("div",px,[qe("p",mx,Yt(p.value),1),qe("button",{onClick:P[8]||(P[8]=N=>p.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):ln("",!0),qe("p",gx,[P[19]||(P[19]=Ur(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard||i.wallShelves?(It(),Lt(cs,{key:0},[Ur(" · Click a door to open it")],64)):ln("",!0)])]))}});export{hn as A,Dt as B,ee as C,Jt as D,Ll as E,La as F,$t as G,pu as H,No as I,Jf as L,Ie as M,W_ as O,vi as P,Kl as Q,Xd as R,qt as S,Xt as T,I as V,H_ as W,Sx as _,xv as a,yv as b,vv as c,sv as d,ka as e,pe as f,Ia as g,Ji as h,ss as i,nn as j,Mx as k,Ql as l,eu as m,ts as n,Kn as o,zd as p,Zn as q,ht as r,fv as s,_i as t,yx as u,Q as v,iu as w,fu as x,Kh as y,Rn as z};
