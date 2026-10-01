import{Q as dr,o as Uh,m as Fh,r as Et,d as Vu,c as It,A as fc,a as Ye,f as Qs,F as us,k as Or,e as ln,t as Yt,C as Br,g as dc,p as pc,x as Hu,T as Gu,z as Wu,h as Xu,n as qu,j as Nt}from"./index-DuhB0ORz.js";import{_ as Yu}from"./AppIcon.vue_vue_type_script_setup_true_lang-DwriDNTw.js";function Tx(){const i=Et(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return dr(i,r=>{document.body.style.overflow=r?"hidden":""}),Uh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),Fh(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ul="185",Us={ROTATE:0,DOLLY:1,PAN:2},Ls={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Zu=0,mc=1,$u=2,vr=1,Ku=2,pr=3,zi=0,Mn=1,Jt=2,Si=0,Fs=1,gc=2,_c=3,vc=4,Ju=5,Ki=100,ju=101,Qu=102,ef=103,tf=104,nf=200,sf=201,rf=202,af=203,ko=204,Vo=205,of=206,lf=207,cf=208,hf=209,uf=210,ff=211,df=212,pf=213,mf=214,Ho=0,Go=1,Wo=2,ks=3,Xo=4,qo=5,Yo=6,Zo=7,Fl=0,gf=1,_f=2,li=0,Oh=1,Bh=2,zh=3,Ol=4,kh=5,Vh=6,Hh=7,Gh=300,ns=301,Vs=302,Za=303,$a=304,za=306,ci=1e3,Mi=1001,$o=1002,un=1003,vf=1004,zr=1005,_n=1006,Ka=1007,Qi=1008,Pn=1009,Wh=1010,Xh=1011,Sr=1012,Bl=1013,ui=1014,Zn=1015,wi=1016,zl=1017,kl=1018,br=1020,qh=35902,Yh=35899,Zh=1021,$h=1022,$n=1023,Ti=1026,es=1027,Vl=1028,Hl=1029,is=1030,Gl=1031,Wl=1033,va=33776,xa=33777,ya=33778,Ma=33779,Ko=35840,Jo=35841,jo=35842,Qo=35843,el=36196,tl=37492,nl=37496,il=37488,sl=37489,wa=37490,rl=37491,al=37808,ol=37809,ll=37810,cl=37811,hl=37812,ul=37813,fl=37814,dl=37815,pl=37816,ml=37817,gl=37818,_l=37819,vl=37820,xl=37821,yl=36492,Ml=36494,Sl=36495,bl=36283,El=36284,Ta=36285,wl=36286,xf=3200,Aa=0,yf=1,Oi="",hn="srgb",Ra="srgb-linear",Ca="linear",Ut="srgb",fs=7680,xc=519,Mf=512,Sf=513,bf=514,Xl=515,Ef=516,wf=517,ql=518,Tf=519,Tl=35044,yc="300 es",oi=2e3,Er=2001;function Af(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Pa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rf(){const i=Pa("canvas");return i.style.display="block",i}const Mc={};function Da(...i){const e="THREE."+i.shift();console.log(e,...i)}function Kh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function it(...i){i=Kh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Mt(...i){i=Kh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Os(...i){const e=i.join(" ");e in Mc||(Mc[e]=!0,it(...i))}function Cf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Pf={[Ho]:Go,[Wo]:Yo,[Xo]:Zo,[ks]:qo,[Go]:Ho,[Yo]:Wo,[Zo]:Xo,[qo]:ks};class ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sa=Math.PI/180,Al=180/Math.PI;function bi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function pt(i,e,t){return Math.max(e,Math.min(t,i))}function Df(i,e){return(i%e+e)%e}function Ja(i,e,t){return(1-t)*i+t*e}function ai(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Lf={DEG2RAD:Sa},sc=class sc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};sc.prototype.isVector2=!0;let ee=sc;class Ai{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(u!==_||o!==f||l!==d||h!==g){let m=o*f+l*d+h*g+u*_;m<0&&(f=-f,d=-d,g=-g,_=-_,m=-m);let p=1-c;if(m<.9995){const M=Math.acos(m),S=Math.sin(M);p=Math.sin(p*M)/S,c=Math.sin(c*M)/S,o=o*p+f*c,l=l*p+d*c,h=h*p+g*c,u=u*p+_*c}else{o=o*p+f*c,l=l*p+d*c,h=h*p+g*c,u=u*p+_*c;const M=1/Math.sqrt(o*o+l*l+h*h+u*u);o*=M,l*=M,h*=M,u*=M}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return e[t]=c*g+h*u+o*d-l*f,e[t+1]=o*g+h*f+l*u-c*d,e[t+2]=l*g+h*d+c*f-o*u,e[t+3]=h*g-c*u-o*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),h=c(s/2),u=c(r/2),f=o(n/2),d=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:it("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-o)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>c&&n>u){const d=2*Math.sqrt(1+n-c-u);this._w=(h-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(c>u){const d=2*Math.sqrt(1+c-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+h)/d}else{const d=2*Math.sqrt(1+u-n-c);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(o+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,h=t._w;return this._x=n*h+a*c+s*l-r*o,this._y=s*h+a*o+r*c-n*l,this._z=r*h+a*l+n*o-s*c,this._w=a*h-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const rc=class rc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),h=2*(c*t-r*s),u=2*(r*n-a*t);return this.x=t+o*l+a*u-c*h,this.y=n+o*h+c*l-r*u,this.z=s+o*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ja.copy(this).projectOnVector(e),this.sub(ja)}reflect(e){return this.sub(ja.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};rc.prototype.isVector3=!0;let N=rc;const ja=new N,Sc=new Ai,ac=class ac{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],S=s[4],y=s[7],w=s[2],E=s[5],C=s[8];return r[0]=a*_+c*M+o*w,r[3]=a*m+c*S+o*E,r[6]=a*p+c*y+o*C,r[1]=l*_+h*M+u*w,r[4]=l*m+h*S+u*E,r[7]=l*p+h*y+u*C,r[2]=f*_+d*M+g*w,r[5]=f*m+d*S+g*E,r[8]=f*p+d*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-n*r*h+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],u=h*a-c*l,f=c*o-h*r,d=l*r-a*o,g=t*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(c*n-s*a)*_,e[3]=f*_,e[4]=(h*t-s*o)*_,e[5]=(s*r-c*t)*_,e[6]=d*_,e[7]=(n*o-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qa.makeScale(e,t)),this}rotate(e){return Os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qa.makeRotation(-e)),this}translate(e,t){return Os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ac.prototype.isMatrix3=!0;let lt=ac;const Qa=new lt,bc=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ec=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function If(){const i={enabled:!0,workingColorSpace:Ra,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ut&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(s.r=Bs(s.r),s.g=Bs(s.g),s.b=Bs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Oi?Ca:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ra]:{primaries:e,whitePoint:n,transfer:Ca,toXYZ:bc,fromXYZ:Ec,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:bc,fromXYZ:Ec,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const Tt=If();function Ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ds;class Nf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ds===void 0&&(ds=Pa("canvas")),ds.width=e.width,ds.height=e.height;const s=ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ds}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Pa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ei(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ei(t[n]/255)*255):t[n]=Ei(t[n]);return{data:t,width:e.width,height:e.height}}else return it("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Uf=0;class Yl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=bi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(eo(s[a].image)):r.push(eo(s[a]))}else r=eo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function eo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(it("Texture: Unable to serialize Texture."),{})}let Ff=0;const to=new N;class vn extends ki{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,n=Mi,s=Mi,r=_n,a=Qi,c=$n,o=Pn,l=vn.DEFAULT_ANISOTROPY,h=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=bi(),this.name="",this.source=new Yl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(to).x}get height(){return this.source.getSize(to).y}get depth(){return this.source.getSize(to).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){it(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){it(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ci:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case $o:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ci:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case $o:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Gh;vn.DEFAULT_ANISOTROPY=1;const oc=class oc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],h=o[4],u=o[8],f=o[1],d=o[5],g=o[9],_=o[2],m=o[6],p=o[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,y=(d+1)/2,w=(p+1)/2,E=(h+f)/4,C=(u+_)/4,v=(g+m)/4;return S>y&&S>w?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=E/n,r=C/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=E/s,r=v/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=v/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};oc.prototype.isVector4=!0;let $t=oc;class Of extends ki{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $t(0,0,e,t),this.scissorTest=!1,this.viewport=new $t(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new vn(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:_n,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Yl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends Of{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Jh extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bf extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ba=class Ba{constructor(e,t,n,s,r,a,c,o,l,h,u,f,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,h,u,f,d,g,_,m)}set(e,t,n,s,r,a,c,o,l,h,u,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=o,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ba().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ps.setFromMatrixColumn(e,0).length(),r=1/ps.setFromMatrixColumn(e,1).length(),a=1/ps.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,d=a*u,g=c*h,_=c*u;t[0]=o*h,t[4]=-o*u,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-c*o,t[2]=_-f*l,t[6]=g+d*l,t[10]=a*o}else if(e.order==="YXZ"){const f=o*h,d=o*u,g=l*h,_=l*u;t[0]=f+_*c,t[4]=g*c-d,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-c,t[2]=d*c-g,t[6]=_+f*c,t[10]=a*o}else if(e.order==="ZXY"){const f=o*h,d=o*u,g=l*h,_=l*u;t[0]=f-_*c,t[4]=-a*u,t[8]=g+d*c,t[1]=d+g*c,t[5]=a*h,t[9]=_-f*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const f=a*h,d=a*u,g=c*h,_=c*u;t[0]=o*h,t[4]=g*l-d,t[8]=f*l+_,t[1]=o*u,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const f=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=_-f*u,t[8]=g*u+d,t[1]=u,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=d*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=a*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=c*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zf,e,kf)}lookAt(e,t,n){const s=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Pi.crossVectors(n,wn),Pi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Pi.crossVectors(n,wn)),Pi.normalize(),kr.crossVectors(wn,Pi),s[0]=Pi.x,s[4]=kr.x,s[8]=wn.x,s[1]=Pi.y,s[5]=kr.y,s[9]=wn.y,s[2]=Pi.z,s[6]=kr.z,s[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],S=n[7],y=n[11],w=n[15],E=s[0],C=s[4],v=s[8],T=s[12],I=s[1],U=s[5],H=s[9],j=s[13],J=s[2],B=s[6],Z=s[10],X=s[14],z=s[3],q=s[7],se=s[11],oe=s[15];return r[0]=a*E+c*I+o*J+l*z,r[4]=a*C+c*U+o*B+l*q,r[8]=a*v+c*H+o*Z+l*se,r[12]=a*T+c*j+o*X+l*oe,r[1]=h*E+u*I+f*J+d*z,r[5]=h*C+u*U+f*B+d*q,r[9]=h*v+u*H+f*Z+d*se,r[13]=h*T+u*j+f*X+d*oe,r[2]=g*E+_*I+m*J+p*z,r[6]=g*C+_*U+m*B+p*q,r[10]=g*v+_*H+m*Z+p*se,r[14]=g*T+_*j+m*X+p*oe,r[3]=M*E+S*I+y*J+w*z,r[7]=M*C+S*U+y*B+w*q,r[11]=M*v+S*H+y*Z+w*se,r[15]=M*T+S*j+y*X+w*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=o*d-l*f,S=c*d-l*u,y=c*f-o*u,w=a*d-l*h,E=a*f-o*h,C=a*u-c*h;return t*(_*M-m*S+p*y)-n*(g*M-m*w+p*E)+s*(g*S-_*w+p*C)-r*(g*y-_*E+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-n*(r*h-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*c-n*a,S=t*o-s*a,y=t*l-r*a,w=n*o-s*c,E=n*l-r*c,C=s*l-r*o,v=h*_-u*g,T=h*m-f*g,I=h*p-d*g,U=u*m-f*_,H=u*p-d*_,j=f*p-d*m,J=M*j-S*H+y*U+w*I-E*T+C*v;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/J;return e[0]=(c*j-o*H+l*U)*B,e[1]=(s*H-n*j-r*U)*B,e[2]=(_*C-m*E+p*w)*B,e[3]=(f*E-u*C-d*w)*B,e[4]=(o*I-a*j-l*T)*B,e[5]=(t*j-s*I+r*T)*B,e[6]=(m*y-g*C-p*S)*B,e[7]=(h*C-f*y+d*S)*B,e[8]=(a*H-c*I+l*v)*B,e[9]=(n*I-t*H-r*v)*B,e[10]=(g*E-_*y+p*M)*B,e[11]=(u*y-h*E-d*M)*B,e[12]=(c*T-a*U-o*v)*B,e[13]=(t*U-n*T+s*v)*B,e[14]=(_*S-g*w-m*M)*B,e[15]=(h*w-u*S+f*M)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,h=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,h*c+n,h*o-s*a,0,l*o-s*c,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,h=a+a,u=c+c,f=r*l,d=r*h,g=r*u,_=a*h,m=a*u,p=c*u,M=o*l,S=o*h,y=o*u,w=n.x,E=n.y,C=n.z;return s[0]=(1-(_+p))*w,s[1]=(d+y)*w,s[2]=(g-S)*w,s[3]=0,s[4]=(d-y)*E,s[5]=(1-(f+p))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+S)*C,s[9]=(m-M)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ps.set(s[0],s[1],s[2]).length();const c=ps.set(s[4],s[5],s[6]).length(),o=ps.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Gn.copy(this);const l=1/a,h=1/c,u=1/o;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,t.setFromRotationMatrix(Gn),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=oi,o=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let g,_;if(o)g=r/(a-r),_=a*r/(a-r);else if(c===oi)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(c===Er)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=oi,o=!1){const l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,_;if(o)g=1/(a-r),_=a/(a-r);else if(c===oi)g=-2/(a-r),_=-(a+r)/(a-r);else if(c===Er)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ba.prototype.isMatrix4=!0;let Lt=Ba;const ps=new N,Gn=new Lt,zf=new N(0,0,0),kf=new N(1,1,1),Pi=new N,kr=new N,wn=new N,wc=new Lt,Tc=new Ai;class Ri{constructor(e=0,t=0,n=0,s=Ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:it("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tc.setFromEuler(this),this.setFromQuaternion(Tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ri.DEFAULT_ORDER="XYZ";class Zl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Vf=0;const Ac=new N,ms=new Ai,pi=new Lt,Vr=new N,er=new N,Hf=new N,Gf=new Ai,Rc=new N(1,0,0),Cc=new N(0,1,0),Pc=new N(0,0,1),Dc={type:"added"},Wf={type:"removed"},gs={type:"childadded",child:null},no={type:"childremoved",child:null};class tn extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new N,t=new Ri,n=new Ai,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Lt},normalMatrix:{value:new lt}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.multiply(ms),this}rotateOnWorldAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.premultiply(ms),this}rotateX(e){return this.rotateOnAxis(Rc,e)}rotateY(e){return this.rotateOnAxis(Cc,e)}rotateZ(e){return this.rotateOnAxis(Pc,e)}translateOnAxis(e,t){return Ac.copy(e).applyQuaternion(this.quaternion),this.position.add(Ac.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rc,e)}translateY(e){return this.translateOnAxis(Cc,e)}translateZ(e){return this.translateOnAxis(Pc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Vr.copy(e):Vr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(er,Vr,this.up):pi.lookAt(Vr,er,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(pi),this.quaternion.premultiply(ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dc),gs.child=e,this.dispatchEvent(gs),gs.child=null):Mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wf),no.child=e,this.dispatchEvent(no),no.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dc),gs.child=e,this.dispatchEvent(gs),gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,Hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,Gf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,h=o.length;l<h;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(c){const o=[];for(const l in c){const h=c[l];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new N(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zt extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xf={type:"move"};class io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Xf)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const jh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Di={h:0,s:0,l:0},Hr={h:0,s:0,l:0};function so(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ht{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Tt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Tt.workingColorSpace){if(e=Df(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=so(a,r,e+1/3),this.g=so(a,r,e),this.b=so(a,r,e-1/3)}return Tt.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&it("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:it("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);it("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=jh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):it("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return Tt.workingToColorSpace(gn.copy(this),e),Math.round(pt(gn.r*255,0,255))*65536+Math.round(pt(gn.g*255,0,255))*256+Math.round(pt(gn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.workingToColorSpace(gn.copy(this),t);const n=gn.r,s=gn.g,r=gn.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const h=(c+a)/2;if(c===a)o=0,l=0;else{const u=a-c;switch(l=h<=.5?u/(a+c):u/(2-a-c),a){case n:o=(s-r)/u+(s<r?6:0);break;case s:o=(r-n)/u+2;break;case r:o=(n-s)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=Tt.workingColorSpace){return Tt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=hn){Tt.workingToColorSpace(gn.copy(this),e);const t=gn.r,n=gn.g,s=gn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Di),this.setHSL(Di.h+e,Di.s+t,Di.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Di),e.getHSL(Hr);const n=Ja(Di.h,Hr.h,t),s=Ja(Di.s,Hr.s,t),r=Ja(Di.l,Hr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new ht;ht.NAMES=jh;class xr{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ht(e),this.near=t,this.far=n}clone(){return new xr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Qh extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ri,this.environmentIntensity=1,this.environmentRotation=new Ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Wn=new N,mi=new N,ro=new N,gi=new N,_s=new N,vs=new N,Lc=new N,ao=new N,oo=new N,lo=new N,co=new $t,ho=new $t,uo=new $t;class On{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Wn.subVectors(e,t),s.cross(Wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Wn.subVectors(s,t),mi.subVectors(n,t),ro.subVectors(e,t);const a=Wn.dot(Wn),c=Wn.dot(mi),o=Wn.dot(ro),l=mi.dot(mi),h=mi.dot(ro),u=a*l-c*c;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*o-c*h)*f,g=(a*h-c*o)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,gi)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,gi.x),o.addScaledVector(a,gi.y),o.addScaledVector(c,gi.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return co.setScalar(0),ho.setScalar(0),uo.setScalar(0),co.fromBufferAttribute(e,t),ho.fromBufferAttribute(e,n),uo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(co,r.x),a.addScaledVector(ho,r.y),a.addScaledVector(uo,r.z),a}static isFrontFacing(e,t,n,s){return Wn.subVectors(n,t),mi.subVectors(e,t),Wn.cross(mi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Wn.cross(mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return On.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return On.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return On.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return On.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return On.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;_s.subVectors(s,n),vs.subVectors(r,n),ao.subVectors(e,n);const o=_s.dot(ao),l=vs.dot(ao);if(o<=0&&l<=0)return t.copy(n);oo.subVectors(e,s);const h=_s.dot(oo),u=vs.dot(oo);if(h>=0&&u<=h)return t.copy(s);const f=o*u-h*l;if(f<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(_s,a);lo.subVectors(e,r);const d=_s.dot(lo),g=vs.dot(lo);if(g>=0&&d<=g)return t.copy(r);const _=d*l-o*g;if(_<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector(vs,c);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Lc.subVectors(r,s),c=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector(Lc,c);const p=1/(m+_+f);return a=_*p,c=f*p,t.copy(n).addScaledVector(_s,a).addScaledVector(vs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Bn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Xn):Xn.fromBufferAttribute(r,a),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),Wr.subVectors(this.max,tr),xs.subVectors(e.a,tr),ys.subVectors(e.b,tr),Ms.subVectors(e.c,tr),Li.subVectors(ys,xs),Ii.subVectors(Ms,ys),qi.subVectors(xs,Ms);let t=[0,-Li.z,Li.y,0,-Ii.z,Ii.y,0,-qi.z,qi.y,Li.z,0,-Li.x,Ii.z,0,-Ii.x,qi.z,0,-qi.x,-Li.y,Li.x,0,-Ii.y,Ii.x,0,-qi.y,qi.x,0];return!fo(t,xs,ys,Ms,Wr)||(t=[1,0,0,0,1,0,0,0,1],!fo(t,xs,ys,Ms,Wr))?!1:(Xr.crossVectors(Li,Ii),t=[Xr.x,Xr.y,Xr.z],fo(t,xs,ys,Ms,Wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _i=[new N,new N,new N,new N,new N,new N,new N,new N],Xn=new N,Gr=new Bn,xs=new N,ys=new N,Ms=new N,Li=new N,Ii=new N,qi=new N,tr=new N,Wr=new N,Xr=new N,Yi=new N;function fo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Yi.fromArray(i,r);const c=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),o=e.dot(Yi),l=t.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>c)return!1}return!0}const jt=new N,qr=new ee;let qf=0;class zn extends ki{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Tl,this.updateRanges=[],this.gpuType=Zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix3(e),this.setXY(t,qr.x,qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Tl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class eu extends zn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tu extends zn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class St extends zn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Yf=new Bn,nr=new N,po=new N;class qs{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Yf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);const t=nr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(po)),this.expandByPoint(nr.copy(e.center).sub(po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Zf=0;const In=new Lt,mo=new tn,Ss=new N,Tn=new Bn,ir=new Bn,cn=new N;class nn extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Af(e)?tu:eu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return mo.lookAt(e),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new St(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&it("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];ir.setFromBufferAttribute(c),this.morphTargetsRelative?(cn.addVectors(Tn.min,ir.min),Tn.expandByPoint(cn),cn.addVectors(Tn.max,ir.max),Tn.expandByPoint(cn)):(Tn.expandByPoint(ir.min),Tn.expandByPoint(ir.max))}Tn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)cn.fromBufferAttribute(c,l),o&&(Ss.fromBufferAttribute(e,l),cn.add(Ss)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new zn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let v=0;v<n.count;v++)c[v]=new N,o[v]=new N;const l=new N,h=new N,u=new N,f=new ee,d=new ee,g=new ee,_=new N,m=new N;function p(v,T,I){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,I),f.fromBufferAttribute(r,v),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,I),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const U=1/(d.x*g.y-g.x*d.y);isFinite(U)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(U),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(U),c[v].add(_),c[T].add(_),c[I].add(_),o[v].add(m),o[T].add(m),o[I].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,T=M.length;v<T;++v){const I=M[v],U=I.start,H=I.count;for(let j=U,J=U+H;j<J;j+=3)p(e.getX(j+0),e.getX(j+1),e.getX(j+2))}const S=new N,y=new N,w=new N,E=new N;function C(v){w.fromBufferAttribute(s,v),E.copy(w);const T=c[v];S.copy(T),S.sub(w.multiplyScalar(w.dot(T))).normalize(),y.crossVectors(E,T);const U=y.dot(o[v])<0?-1:1;a.setXYZW(v,S.x,S.y,S.z,U)}for(let v=0,T=M.length;v<T;++v){const I=M[v],U=I.start,H=I.count;for(let j=U,J=U+H;j<J;j+=3)C(e.getX(j+0)),C(e.getX(j+1)),C(e.getX(j+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new zn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new N,r=new N,a=new N,c=new N,o=new N,l=new N,h=new N,u=new N;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.add(h),o.add(h),l.add(h),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(c,o){const l=c.array,h=c.itemSize,u=c.normalized,f=new l.constructor(o.length*h);let d=0,g=0;for(let _=0,m=o.length;_<m;_++){c.isInterleavedBufferAttribute?d=o[_]*c.data.stride+c.offset:d=o[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new zn(f,h,u)}if(this.index===null)return it("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nn,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=e(f,n);o.push(d)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[o]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $f{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Tl,this.updateRanges=[],this.version=0,this.uuid=bi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xn=new N;class La{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ai(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ai(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ai(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ai(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Da("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new zn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new La(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Da("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Kf=0;class Vi extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=bi(),this.name="",this.type="Material",this.blending=Fs,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ko,this.blendDst=Vo,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){it(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){it(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fs&&(n.blending=this.blending),this.side!==zi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ko&&(n.blendSrc=this.blendSrc),this.blendDst!==Vo&&(n.blendDst=this.blendDst),this.blendEquation!==Ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ht().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ee().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ee().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zs extends Vi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let bs;const sr=new N,Es=new N,ws=new N,Ts=new ee,rr=new ee,nu=new Lt,Yr=new N,ar=new N,Zr=new N,Ic=new ee,go=new ee,Nc=new ee;class Rn extends tn{constructor(e=new zs){if(super(),this.isSprite=!0,this.type="Sprite",bs===void 0){bs=new nn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new $f(t,5);bs.setIndex([0,1,2,0,2,3]),bs.setAttribute("position",new La(n,3,0,!1)),bs.setAttribute("uv",new La(n,2,3,!1))}this.geometry=bs,this.material=e,this.center=new ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Mt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Es.setFromMatrixScale(this.matrixWorld),nu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Es.multiplyScalar(-ws.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;$r(Yr.set(-.5,-.5,0),ws,a,Es,s,r),$r(ar.set(.5,-.5,0),ws,a,Es,s,r),$r(Zr.set(.5,.5,0),ws,a,Es,s,r),Ic.set(0,0),go.set(1,0),Nc.set(1,1);let c=e.ray.intersectTriangle(Yr,ar,Zr,!1,sr);if(c===null&&($r(ar.set(-.5,.5,0),ws,a,Es,s,r),go.set(0,1),c=e.ray.intersectTriangle(Yr,Zr,ar,!1,sr),c===null))return;const o=e.ray.origin.distanceTo(sr);o<e.near||o>e.far||t.push({distance:o,point:sr.clone(),uv:On.getInterpolation(sr,Yr,ar,Zr,Ic,go,Nc,new ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function $r(i,e,t,n,s,r){Ts.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(rr.x=r*Ts.x-s*Ts.y,rr.y=s*Ts.x+r*Ts.y):rr.copy(Ts),i.copy(e),i.x+=rr.x,i.y+=rr.y,i.applyMatrix4(nu)}const vi=new N,_o=new N,Kr=new N,Ni=new N,vo=new N,Jr=new N,xo=new N;class ka{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vi.copy(this.origin).addScaledVector(this.direction,t),vi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){_o.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(_o);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Kr),c=Ni.dot(this.direction),o=-Ni.dot(Kr),l=Ni.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*o-c,f=a*c-o,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+a*f+2*c)+f*(a*u+f+2*o)+l}else f=r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;else f=-r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;else f<=-g?(u=Math.max(0,-(-a*r+c)),f=u>0?-r:Math.min(Math.max(-r,-o),r),d=-u*u+f*(f+2*o)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-o),r),d=f*(f+2*o)+l):(u=Math.max(0,-(a*r+c)),f=u>0?r:Math.min(Math.max(-r,-o),r),d=-u*u+f*(f+2*o)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(_o).addScaledVector(Kr,f),d}intersectSphere(e,t){vi.subVectors(e.center,this.origin);const n=vi.dot(this.direction),s=vi.dot(vi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(c=(e.min.z-f.z)*u,o=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,o=(e.min.z-f.z)*u),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vi)!==null}intersectTriangle(e,t,n,s,r){vo.subVectors(t,e),Jr.subVectors(n,e),xo.crossVectors(vo,Jr);let a=this.direction.dot(xo),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Ni.subVectors(this.origin,e);const o=c*this.direction.dot(Jr.crossVectors(Ni,Jr));if(o<0)return null;const l=c*this.direction.dot(vo.cross(Ni));if(l<0||o+l>a)return null;const h=-c*Ni.dot(xo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ss extends Vi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ri,this.combine=Fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Uc=new Lt,Zi=new ka,jr=new qs,Fc=new N,Qr=new N,ea=new N,ta=new N,yo=new N,na=new N,Oc=new N,ia=new N;class be extends tn{constructor(e=new nn,t=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){na.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const h=c[o],u=r[o];h!==0&&(yo.fromBufferAttribute(u,e),a?na.addScaledVector(yo,h):na.addScaledVector(yo.sub(t),h))}t.add(na)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(jr.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(jr,Fc)===null||Zi.origin.distanceToSquared(Fc)>(e.far-e.near)**2))&&(Uc.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(Uc),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,w=S;y<w;y+=3){const E=c.getX(y),C=c.getX(y+1),v=c.getX(y+2);s=sa(this,p,e,n,l,h,u,E,C,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=c.getX(m),S=c.getX(m+1),y=c.getX(m+2);s=sa(this,a,e,n,l,h,u,M,S,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let y=M,w=S;y<w;y+=3){const E=y,C=y+1,v=y+2;s=sa(this,p,e,n,l,h,u,E,C,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,S=m+1,y=m+2;s=sa(this,a,e,n,l,h,u,M,S,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Jf(i,e,t,n,s,r,a,c){let o;if(e.side===Mn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===zi,c),o===null)return null;ia.copy(c),ia.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ia);return l<t.near||l>t.far?null:{distance:l,point:ia.clone(),object:i}}function sa(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,Qr),i.getVertexPosition(o,ea),i.getVertexPosition(l,ta);const h=Jf(i,e,t,n,Qr,ea,ta,Oc);if(h){const u=new N;On.getBarycoord(Oc,Qr,ea,ta,u),s&&(h.uv=On.getInterpolatedAttribute(s,c,o,l,u,new ee)),r&&(h.uv1=On.getInterpolatedAttribute(r,c,o,l,u,new ee)),a&&(h.normal=On.getInterpolatedAttribute(a,c,o,l,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:o,c:l,normal:new N,materialIndex:0};On.getNormal(Qr,ea,ta,f.normal),h.face=f,h.barycoord=u}return h}class iu extends vn{constructor(e=null,t=1,n=1,s,r,a,c,o,l=un,h=un,u,f){super(null,a,c,o,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bc extends zn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const As=new Lt,zc=new Lt,ra=[],kc=new Bn,jf=new Lt,or=new be,lr=new qs;class su extends be{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Bn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),kc.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(kc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),lr.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(lr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(or.geometry=this.geometry,or.material=this.material,or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lr.copy(this.boundingSphere),lr.applyMatrix4(n),e.ray.intersectsSphere(lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,As),zc.multiplyMatrices(n,As),or.matrixWorld=zc,or.raycast(e,ra);for(let a=0,c=ra.length;a<c;a++){const o=ra[a];o.instanceId=r,o.object=this,t.push(o)}ra.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new iu(new Float32Array(s*this.count),s,this.count,Vl,Zn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Mo=new N,Qf=new N,ed=new lt;class yi{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Mo.subVectors(n,t).cross(Qf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Mo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ed.getNormalMatrix(e),s=this.coplanarPoint(Mo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new qs,td=new ee(.5,.5),aa=new N;class $l{constructor(e=new yi,t=new yi,n=new yi,s=new yi,r=new yi,a=new yi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=oi,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],S=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,d-h,p-g,w-M).normalize(),s[1].setComponents(l+a,d+h,p+g,w+M).normalize(),s[2].setComponents(l+c,d+u,p+_,w+S).normalize(),s[3].setComponents(l-c,d-u,p-_,w-S).normalize(),n)s[4].setComponents(o,f,m,y).normalize(),s[5].setComponents(l-o,d-f,p-m,w-y).normalize();else if(s[4].setComponents(l-o,d-f,p-m,w-y).normalize(),t===oi)s[5].setComponents(l+o,d+f,p+m,w+y).normalize();else if(t===Er)s[5].setComponents(o,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){$i.center.set(0,0,0);const t=td.distanceTo(e.center);return $i.radius=.7071067811865476+t,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(aa.x=s.normal.x>0?e.max.x:e.min.x,aa.y=s.normal.y>0?e.max.y:e.min.y,aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(aa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ru extends Vi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ia=new N,Na=new N,Vc=new Lt,cr=new ka,oa=new qs,So=new N,Hc=new N;class nd extends tn{constructor(e=new nn,t=new ru){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ia.fromBufferAttribute(t,s-1),Na.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ia.distanceTo(Na);e.setAttribute("lineDistance",new St(n,1))}else it("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(s),oa.radius+=r,e.ray.intersectsSphere(oa)===!1)return;Vc.copy(s).invert(),cr.copy(e.ray).applyMatrix4(Vc);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=h.getX(_),M=h.getX(_+1),S=la(this,e,cr,o,p,M,_);S&&t.push(S)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=la(this,e,cr,o,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=la(this,e,cr,o,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=la(this,e,cr,o,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function la(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(Ia.fromBufferAttribute(c,s),Na.fromBufferAttribute(c,r),t.distanceSqToSegment(Ia,Na,So,Hc)>n)return;So.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(So);if(!(l<e.near||l>e.far))return{distance:l,point:Hc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class au extends vn{constructor(e=[],t=ns,n,s,r,a,c,o,l,h){super(e,t,n,s,r,a,c,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wr extends vn{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hs extends vn{constructor(e,t,n=ui,s,r,a,c=un,o=un,l,h=Ti,u=1){if(h!==Ti&&h!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,a,c,o,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class id extends Hs{constructor(e,t=ui,n=ns,s,r,a=un,c=un,o,l=Ti){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,c,o,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ou extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class wt extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new St(l,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(u,2));function g(_,m,p,M,S,y,w,E,C,v,T){const I=y/C,U=w/v,H=y/2,j=w/2,J=E/2,B=C+1,Z=v+1;let X=0,z=0;const q=new N;for(let se=0;se<Z;se++){const oe=se*U-j;for(let _e=0;_e<B;_e++){const Ze=_e*I-H;q[_]=Ze*M,q[m]=oe*S,q[p]=J,l.push(q.x,q.y,q.z),q[_]=0,q[m]=0,q[p]=E>0?1:-1,h.push(q.x,q.y,q.z),u.push(_e/C),u.push(1-se/v),X+=1}}for(let se=0;se<v;se++)for(let oe=0;oe<C;oe++){const _e=f+oe+B*se,Ze=f+oe+B*(se+1),_t=f+(oe+1)+B*(se+1),Je=f+(oe+1)+B*se;o.push(_e,Ze,Je),o.push(Ze,_t,Je),z+=6}c.addGroup(d,z,T),d+=z,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ji extends nn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new N,h=new ee;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const d=n+u/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),c.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,o.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new St(a,3)),this.setAttribute("normal",new St(c,3)),this.setAttribute("uv",new St(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class te extends nn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;M(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new St(u,3)),this.setAttribute("normal",new St(f,3)),this.setAttribute("uv",new St(d,2));function M(){const y=new N,w=new N;let E=0;const C=(t-e)/n;for(let v=0;v<=r;v++){const T=[],I=v/r,U=I*(t-e)+e;for(let H=0;H<=s;H++){const j=H/s,J=j*o+c,B=Math.sin(J),Z=Math.cos(J);w.x=U*B,w.y=-I*n+m,w.z=U*Z,u.push(w.x,w.y,w.z),y.set(B,C,Z).normalize(),f.push(y.x,y.y,y.z),d.push(j,1-I),T.push(g++)}_.push(T)}for(let v=0;v<s;v++)for(let T=0;T<r;T++){const I=_[T][v],U=_[T+1][v],H=_[T+1][v+1],j=_[T][v+1];(e>0||T!==0)&&(h.push(I,U,j),E+=3),(t>0||T!==r-1)&&(h.push(U,H,j),E+=3)}l.addGroup(p,E,0),p+=E}function S(y){const w=g,E=new ee,C=new N;let v=0;const T=y===!0?e:t,I=y===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,m*I,0),f.push(0,I,0),d.push(.5,.5),g++;const U=g;for(let H=0;H<=s;H++){const J=H/s*o+c,B=Math.cos(J),Z=Math.sin(J);C.x=T*Z,C.y=m*I,C.z=T*B,u.push(C.x,C.y,C.z),f.push(0,I,0),E.x=B*.5+.5,E.y=Z*.5*I+.5,d.push(E.x,E.y),g++}for(let H=0;H<s;H++){const j=w+H,J=U+H;y===!0?h.push(J,J+1,j):h.push(J+1,J,j),v+=3}l.addGroup(p,v,y===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new te(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qn extends te{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new qn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Kl extends nn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),h(),this.setAttribute("position",new St(r,3)),this.setAttribute("normal",new St(r.slice(),3)),this.setAttribute("uv",new St(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(M){const S=new N,y=new N,w=new N;for(let E=0;E<t.length;E+=3)d(t[E+0],S),d(t[E+1],y),d(t[E+2],w),o(S,y,w,M)}function o(M,S,y,w){const E=w+1,C=[];for(let v=0;v<=E;v++){C[v]=[];const T=M.clone().lerp(y,v/E),I=S.clone().lerp(y,v/E),U=E-v;for(let H=0;H<=U;H++)H===0&&v===E?C[v][H]=T:C[v][H]=T.clone().lerp(I,H/U)}for(let v=0;v<E;v++)for(let T=0;T<2*(E-v)-1;T++){const I=Math.floor(T/2);T%2===0?(f(C[v][I+1]),f(C[v+1][I]),f(C[v][I])):(f(C[v][I+1]),f(C[v+1][I+1]),f(C[v+1][I]))}}function l(M){const S=new N;for(let y=0;y<r.length;y+=3)S.x=r[y+0],S.y=r[y+1],S.z=r[y+2],S.normalize().multiplyScalar(M),r[y+0]=S.x,r[y+1]=S.y,r[y+2]=S.z}function h(){const M=new N;for(let S=0;S<r.length;S+=3){M.x=r[S+0],M.y=r[S+1],M.z=r[S+2];const y=m(M)/2/Math.PI+.5,w=p(M)/Math.PI+.5;a.push(y,1-w)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){const S=a[M+0],y=a[M+2],w=a[M+4],E=Math.max(S,y,w),C=Math.min(S,y,w);E>.9&&C<.1&&(S<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,S){const y=M*3;S.x=e[y+0],S.y=e[y+1],S.z=e[y+2]}function g(){const M=new N,S=new N,y=new N,w=new N,E=new ee,C=new ee,v=new ee;for(let T=0,I=0;T<r.length;T+=9,I+=6){M.set(r[T+0],r[T+1],r[T+2]),S.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),E.set(a[I+0],a[I+1]),C.set(a[I+2],a[I+3]),v.set(a[I+4],a[I+5]),w.copy(M).add(S).add(y).divideScalar(3);const U=m(w);_(E,I+0,M,U),_(C,I+2,S,U),_(v,I+4,y,U)}}function _(M,S,y,w){w<0&&M.x===1&&(a[S]=M.x-1),y.x===0&&y.z===0&&(a[S]=w/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kl(e.vertices,e.indices,e.radius,e.detail)}}class Jl extends Kl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Jl(e.radius,e.detail)}}class Kn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){it("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new ee:new N);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new N,s=[],r=[],a=[],c=new N,o=new Lt;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();const g=Math.acos(pt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(o.makeRotationAxis(c,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(pt(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class jl extends Kn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new ee){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=o-this.aX,d=l-this.aY;o=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class sd extends jl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ql(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,h,u){let f=(a-r)/l-(c-r)/(l+h)+(c-a)/h,d=(c-a)/h-(o-a)/(h+u)+(o-c)/u;f*=h,d*=h,s(a,c,f,d)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const Gc=new N,Wc=new N,bo=new Ql,Eo=new Ql,wo=new Ql;class lu extends Kn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,h;this.closed||c>0?l=s[(c-1)%r]:(Wc.subVectors(s[0],s[1]).add(s[0]),l=Wc);const u=s[c%r],f=s[(c+1)%r];if(this.closed||c+2<r?h=s[(c+2)%r]:(Gc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Gc),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),bo.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,m),Eo.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,m),wo.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(bo.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Eo.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),wo.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(bo.calc(o),Eo.calc(o),wo.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Xc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function rd(i,e){const t=1-i;return t*t*e}function ad(i,e){return 2*(1-i)*i*e}function od(i,e){return i*i*e}function yr(i,e,t,n){return rd(i,e)+ad(i,t)+od(i,n)}function ld(i,e){const t=1-i;return t*t*t*e}function cd(i,e){const t=1-i;return 3*t*t*i*e}function hd(i,e){return 3*(1-i)*i*i*e}function ud(i,e){return i*i*i*e}function Mr(i,e,t,n,s){return ld(i,e)+cd(i,t)+hd(i,n)+ud(i,s)}class cu extends Kn{constructor(e=new ee,t=new ee,n=new ee,s=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ee){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Mr(e,s.x,r.x,a.x,c.x),Mr(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fd extends Kn{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Mr(e,s.x,r.x,a.x,c.x),Mr(e,s.y,r.y,a.y,c.y),Mr(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hu extends Kn{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dd extends Kn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class uu extends Kn{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(yr(e,s.x,r.x,a.x),yr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ec extends Kn{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(yr(e,s.x,r.x,a.x),yr(e,s.y,r.y,a.y),yr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fu extends Kn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Xc(c,o.x,l.x,h.x,u.x),Xc(c,o.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ee().fromArray(s))}return this}}var Ua=Object.freeze({__proto__:null,ArcCurve:sd,CatmullRomCurve3:lu,CubicBezierCurve:cu,CubicBezierCurve3:fd,EllipseCurve:jl,LineCurve:hu,LineCurve3:dd,QuadraticBezierCurve:uu,QuadraticBezierCurve3:ec,SplineCurve:fu});class pd extends Kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ua[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const h=o[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ua[s.type]().fromJSON(s))}return this}}class qc extends pd{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new hu(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new uu(this.currentPoint.clone(),new ee(e,t),new ee(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new cu(this.currentPoint.clone(),new ee(e,t),new ee(n,s),new ee(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new fu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new jl(e,t,n,s,r,a,c,o);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class mr extends qc{constructor(e){super(e),this.uuid=bi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new qc().fromJSON(s))}return this}}function md(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=du(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=yd(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let h=c,u=o;for(let f=t;f<s;f+=t){const d=i[f],g=i[f+1];d<c&&(c=d),g<o&&(o=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-c,u-o),l=l!==0?32767/l:0}return Tr(r,a,t,c,o,l,0),a}function du(i,e,t,n,s){let r;if(s===Dd(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Yc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Yc(a/n|0,i[a],i[a+1],r);return r&&Gs(r,r.next)&&(Rr(r),r=r.next),r}function rs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Gs(t,t.next)||Kt(t.prev,t,t.next)===0)){if(Rr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Tr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&wd(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?_d(i,n,s,r):gd(i)){e.push(o.i,i.i,l.i),Rr(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=vd(rs(i),e),Tr(i,e,t,n,s,r,2)):a===2&&xd(i,e,t,n,s,r):Tr(rs(i),e,t,n,s,r,1);break}}}function gd(i){const e=i.prev,t=i,n=i.next;if(Kt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,h=Math.min(s,r,a),u=Math.min(c,o,l),f=Math.max(s,r,a),d=Math.max(c,o,l);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&gr(s,c,r,o,a,l,g.x,g.y)&&Kt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function _d(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Kt(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(c,o,l),g=Math.min(h,u,f),_=Math.max(c,o,l),m=Math.max(h,u,f),p=Rl(d,g,e,t,n),M=Rl(_,m,e,t,n);let S=i.prevZ,y=i.nextZ;for(;S&&S.z>=p&&y&&y.z<=M;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&gr(c,h,o,u,l,f,S.x,S.y)&&Kt(S.prev,S,S.next)>=0||(S=S.prevZ,y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&gr(c,h,o,u,l,f,y.x,y.y)&&Kt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&gr(c,h,o,u,l,f,S.x,S.y)&&Kt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;y&&y.z<=M;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&gr(c,h,o,u,l,f,y.x,y.y)&&Kt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function vd(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Gs(n,s)&&mu(n,t,t.next,s)&&Ar(n,s)&&Ar(s,n)&&(e.push(n.i,t.i,s.i),Rr(t),Rr(t.next),t=i=s),t=t.next}while(t!==i);return rs(t)}function xd(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&Rd(a,c)){let o=gu(a,c);a=rs(a,a.next),o=rs(o,o.next),Tr(a,e,t,n,s,r,0),Tr(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function yd(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=du(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(Ad(l))}s.sort(Md);for(let r=0;r<s.length;r++)t=Sd(s[r],t);return t}function Md(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Sd(i,e){const t=bd(i,e);if(!t)return e;const n=gu(t,i);return rs(n,n.next),rs(t,t.next)}function bd(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Gs(i,t))return t;do{if(Gs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&pu(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const u=Math.abs(s-t.y)/(n-t.x);Ar(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&Ed(a,t)))&&(a=t,h=u)}t=t.next}while(t!==c);return a}function Ed(i,e){return Kt(i.prev,i,e.prev)<0&&Kt(e.next,i,i.next)<0}function wd(i,e,t,n){let s=i;do s.z===0&&(s.z=Rl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Td(s)}function Td(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Rl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Ad(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function pu(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function gr(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&pu(i,e,t,n,s,r,a,c)}function Rd(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Cd(i,e)&&(Ar(i,e)&&Ar(e,i)&&Pd(i,e)&&(Kt(i.prev,i,e.prev)||Kt(i,e.prev,e))||Gs(i,e)&&Kt(i.prev,i,i.next)>0&&Kt(e.prev,e,e.next)>0)}function Kt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Gs(i,e){return i.x===e.x&&i.y===e.y}function mu(i,e,t,n){const s=ha(Kt(i,e,t)),r=ha(Kt(i,e,n)),a=ha(Kt(t,n,i)),c=ha(Kt(t,n,e));return!!(s!==r&&a!==c||s===0&&ca(i,t,e)||r===0&&ca(i,n,e)||a===0&&ca(t,i,n)||c===0&&ca(t,e,n))}function ca(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ha(i){return i>0?1:i<0?-1:0}function Cd(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&mu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ar(i,e){return Kt(i.prev,i,i.next)<0?Kt(i,e,i.next)>=0&&Kt(i,i.prev,e)>=0:Kt(i,e,i.prev)<0||Kt(i,i.next,e)<0}function Pd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function gu(i,e){const t=Cl(i.i,i.x,i.y),n=Cl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Yc(i,e,t,n){const s=Cl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Rr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Cl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Dd(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Ld{static triangulate(e,t,n=2){return md(e,t,n)}}class Is{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Is.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Zc(e),$c(n,e);let a=e.length;t.forEach(Zc);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,$c(n,t[o]);const c=Ld.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function Zc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function $c(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ns extends nn{constructor(e=new mr([new ee(.5,.5),new ee(-.5,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new St(s,3)),this.setAttribute("uv",new St(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Id;let S,y=!1,w,E,C,v;if(p){S=p.getSpacedPoints(h),y=!0,f=!1;const fe=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(h,fe),E=new N,C=new N,v=new N}f||(m=0,d=0,g=0,_=0);const T=c.extractPoints(l);let I=T.shape;const U=T.holes;if(!Is.isClockWise(I)){I=I.reverse();for(let fe=0,me=U.length;fe<me;fe++){const ge=U[fe];Is.isClockWise(ge)&&(U[fe]=ge.reverse())}}function j(fe){const ge=10000000000000001e-36;let Ae=fe[0];for(let Me=1;Me<=fe.length;Me++){const Ke=Me%fe.length,ke=fe[Ke],et=ke.x-Ae.x,rt=ke.y-Ae.y,O=et*et+rt*rt,At=Math.max(Math.abs(ke.x),Math.abs(ke.y),Math.abs(Ae.x),Math.abs(Ae.y)),gt=ge*At*At;if(O<=gt){fe.splice(Ke,1),Me--;continue}Ae=ke}}j(I),U.forEach(j);const J=U.length,B=I;for(let fe=0;fe<J;fe++){const me=U[fe];I=I.concat(me)}function Z(fe,me,ge){return me||Mt("ExtrudeGeometry: vec does not exist"),fe.clone().addScaledVector(me,ge)}const X=I.length;function z(fe,me,ge){let Ae,Me,Ke;const ke=fe.x-me.x,et=fe.y-me.y,rt=ge.x-fe.x,O=ge.y-fe.y,At=ke*ke+et*et,gt=ke*O-et*rt;if(Math.abs(gt)>Number.EPSILON){const R=Math.sqrt(At),x=Math.sqrt(rt*rt+O*O),W=me.x-et/R,$=me.y+ke/R,ie=ge.x-O/x,he=ge.y+rt/x,ye=((ie-W)*O-(he-$)*rt)/(ke*O-et*rt);Ae=W+ke*ye-fe.x,Me=$+et*ye-fe.y;const ne=Ae*Ae+Me*Me;if(ne<=2)return new ee(Ae,Me);Ke=Math.sqrt(ne/2)}else{let R=!1;ke>Number.EPSILON?rt>Number.EPSILON&&(R=!0):ke<-Number.EPSILON?rt<-Number.EPSILON&&(R=!0):Math.sign(et)===Math.sign(O)&&(R=!0),R?(Ae=-et,Me=ke,Ke=Math.sqrt(At)):(Ae=ke,Me=et,Ke=Math.sqrt(At/2))}return new ee(Ae/Ke,Me/Ke)}const q=[];for(let fe=0,me=B.length,ge=me-1,Ae=fe+1;fe<me;fe++,ge++,Ae++)ge===me&&(ge=0),Ae===me&&(Ae=0),q[fe]=z(B[fe],B[ge],B[Ae]);const se=[];let oe,_e=q.concat();for(let fe=0,me=J;fe<me;fe++){const ge=U[fe];oe=[];for(let Ae=0,Me=ge.length,Ke=Me-1,ke=Ae+1;Ae<Me;Ae++,Ke++,ke++)Ke===Me&&(Ke=0),ke===Me&&(ke=0),oe[Ae]=z(ge[Ae],ge[Ke],ge[ke]);se.push(oe),_e=_e.concat(oe)}let Ze;if(m===0)Ze=Is.triangulateShape(B,U);else{const fe=[],me=[];for(let ge=0;ge<m;ge++){const Ae=ge/m,Me=d*Math.cos(Ae*Math.PI/2),Ke=g*Math.sin(Ae*Math.PI/2)+_;for(let ke=0,et=B.length;ke<et;ke++){const rt=Z(B[ke],q[ke],Ke);Ce(rt.x,rt.y,-Me),Ae===0&&fe.push(rt)}for(let ke=0,et=J;ke<et;ke++){const rt=U[ke];oe=se[ke];const O=[];for(let At=0,gt=rt.length;At<gt;At++){const R=Z(rt[At],oe[At],Ke);Ce(R.x,R.y,-Me),Ae===0&&O.push(R)}Ae===0&&me.push(O)}}Ze=Is.triangulateShape(fe,me)}const _t=Ze.length,Je=g+_;for(let fe=0;fe<X;fe++){const me=f?Z(I[fe],_e[fe],Je):I[fe];y?(C.copy(w.normals[0]).multiplyScalar(me.x),E.copy(w.binormals[0]).multiplyScalar(me.y),v.copy(S[0]).add(C).add(E),Ce(v.x,v.y,v.z)):Ce(me.x,me.y,0)}for(let fe=1;fe<=h;fe++)for(let me=0;me<X;me++){const ge=f?Z(I[me],_e[me],Je):I[me];y?(C.copy(w.normals[fe]).multiplyScalar(ge.x),E.copy(w.binormals[fe]).multiplyScalar(ge.y),v.copy(S[fe]).add(C).add(E),Ce(v.x,v.y,v.z)):Ce(ge.x,ge.y,u/h*fe)}for(let fe=m-1;fe>=0;fe--){const me=fe/m,ge=d*Math.cos(me*Math.PI/2),Ae=g*Math.sin(me*Math.PI/2)+_;for(let Me=0,Ke=B.length;Me<Ke;Me++){const ke=Z(B[Me],q[Me],Ae);Ce(ke.x,ke.y,u+ge)}for(let Me=0,Ke=U.length;Me<Ke;Me++){const ke=U[Me];oe=se[Me];for(let et=0,rt=ke.length;et<rt;et++){const O=Z(ke[et],oe[et],Ae);y?Ce(O.x,O.y+S[h-1].y,S[h-1].x+ge):Ce(O.x,O.y,u+ge)}}}ae(),ve();function ae(){const fe=s.length/3;if(f){let me=0,ge=X*me;for(let Ae=0;Ae<_t;Ae++){const Me=Ze[Ae];Ge(Me[2]+ge,Me[1]+ge,Me[0]+ge)}me=h+m*2,ge=X*me;for(let Ae=0;Ae<_t;Ae++){const Me=Ze[Ae];Ge(Me[0]+ge,Me[1]+ge,Me[2]+ge)}}else{for(let me=0;me<_t;me++){const ge=Ze[me];Ge(ge[2],ge[1],ge[0])}for(let me=0;me<_t;me++){const ge=Ze[me];Ge(ge[0]+X*h,ge[1]+X*h,ge[2]+X*h)}}n.addGroup(fe,s.length/3-fe,0)}function ve(){const fe=s.length/3;let me=0;pe(B,me),me+=B.length;for(let ge=0,Ae=U.length;ge<Ae;ge++){const Me=U[ge];pe(Me,me),me+=Me.length}n.addGroup(fe,s.length/3-fe,1)}function pe(fe,me){let ge=fe.length;for(;--ge>=0;){const Ae=ge;let Me=ge-1;Me<0&&(Me=fe.length-1);for(let Ke=0,ke=h+m*2;Ke<ke;Ke++){const et=X*Ke,rt=X*(Ke+1),O=me+Ae+et,At=me+Me+et,gt=me+Me+rt,R=me+Ae+rt;Fe(O,At,gt,R)}}}function Ce(fe,me,ge){o.push(fe),o.push(me),o.push(ge)}function Ge(fe,me,ge){xt(fe),xt(me),xt(ge);const Ae=s.length/3,Me=M.generateTopUV(n,s,Ae-3,Ae-2,Ae-1);Qe(Me[0]),Qe(Me[1]),Qe(Me[2])}function Fe(fe,me,ge,Ae){xt(fe),xt(me),xt(Ae),xt(me),xt(ge),xt(Ae);const Me=s.length/3,Ke=M.generateSideWallUV(n,s,Me-6,Me-3,Me-2,Me-1);Qe(Ke[0]),Qe(Ke[1]),Qe(Ke[3]),Qe(Ke[1]),Qe(Ke[2]),Qe(Ke[3])}function xt(fe){s.push(o[fe*3+0]),s.push(o[fe*3+1]),s.push(o[fe*3+2])}function Qe(fe){r.push(fe.x),r.push(fe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Nd(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ua[s.type]().fromJSON(s)),new Ns(n,e.options)}}const Id={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new ee(r,a),new ee(c,o),new ee(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],d=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(c-h)<Math.abs(a-l)?[new ee(a,1-o),new ee(l,1-u),new ee(f,1-g),new ee(_,1-p)]:[new ee(c,1-o),new ee(h,1-u),new ee(d,1-g),new ee(m,1-p)]}};function Nd(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class xi extends nn{constructor(e=[new ee(0,-.5),new ee(.5,0),new ee(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=pt(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],h=1/t,u=new N,f=new ee,d=new N,g=new N,_=new N;let m=0,p=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(_.x,_.y,_.z);break;default:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),o.push(d.x,d.y,d.z),_.copy(g)}for(let M=0;M<=t;M++){const S=n+M*h*s,y=Math.sin(S),w=Math.cos(S);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*y,u.y=e[E].y,u.z=e[E].x*w,a.push(u.x,u.y,u.z),f.x=M/t,f.y=E/(e.length-1),c.push(f.x,f.y);const C=o[3*E+0]*y,v=o[3*E+1],T=o[3*E+0]*w;l.push(C,v,T)}}for(let M=0;M<t;M++)for(let S=0;S<e.length-1;S++){const y=S+M*e.length,w=y,E=y+e.length,C=y+e.length+1,v=y+1;r.push(w,E,v),r.push(C,v,E)}this.setIndex(r),this.setAttribute("position",new St(a,3)),this.setAttribute("uv",new St(c,2)),this.setAttribute("normal",new St(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.points,e.segments,e.phiStart,e.phiLength)}}class Dn extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,h=o+1,u=e/c,f=t/o,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*f-a;for(let S=0;S<l;S++){const y=S*u-r;g.push(y,-M,0),_.push(0,0,1),m.push(S/c),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let M=0;M<c;M++){const S=M+l*p,y=M+l*(p+1),w=M+1+l*(p+1),E=M+1+l*p;d.push(S,y,E),d.push(y,w,E)}this.setIndex(d),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.width,e.height,e.widthSegments,e.heightSegments)}}class _u extends nn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],h=[];let u=e;const f=(t-e)/s,d=new N,g=new ee;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),o.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,S=M,y=M+n+1,w=M+n+2,E=M+1;c.push(S,y,E),c.push(y,w,E)}}this.setIndex(c),this.setAttribute("position",new St(o,3)),this.setAttribute("normal",new St(l,3)),this.setAttribute("uv",new St(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _u(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Wt extends nn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const h=[],u=new N,f=new N,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],S=p/n,y=a+S*c,w=e*Math.cos(y),E=Math.sqrt(e*e-w*w);let C=0;p===0&&a===0?C=.5/t:p===n&&o===Math.PI&&(C=-.5/t);for(let v=0;v<=t;v++){const T=v/t,I=s+T*r;u.x=-E*Math.cos(I),u.y=w,u.z=E*Math.sin(I),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(T+C,1-S),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const S=h[p][M+1],y=h[p][M],w=h[p+1][M],E=h[p+1][M+1];(p!==0||a>0)&&d.push(S,y,E),(p!==n-1||o<Math.PI)&&d.push(y,w,E)}this.setIndex(d),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qt extends nn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],h=[],u=[],f=new N,d=new N,g=new N;for(let _=0;_<=n;_++){const m=a+_/n*c;for(let p=0;p<=s;p++){const M=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(M),d.y=(e+t*Math.cos(m))*Math.sin(M),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),g.subVectors(d,f).normalize(),h.push(g.x,g.y,g.z),u.push(p/s),u.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const p=(s+1)*_+m-1,M=(s+1)*(_-1)+m-1,S=(s+1)*(_-1)+m,y=(s+1)*_+m;o.push(p,M,y),o.push(M,S,y)}this.setIndex(o),this.setAttribute("position",new St(l,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ts extends nn{constructor(e=new ec(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new N,o=new N,l=new ee;let h=new N;const u=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new St(u,3)),this.setAttribute("normal",new St(f,3)),this.setAttribute("uv",new St(d,2));function _(){for(let S=0;S<t;S++)m(S);m(r===!1?t:0),M(),p()}function m(S){h=e.getPointAt(S/t,h);const y=a.normals[S],w=a.binormals[S];for(let E=0;E<=s;E++){const C=E/s*Math.PI*2,v=Math.sin(C),T=-Math.cos(C);o.x=T*y.x+v*w.x,o.y=T*y.y+v*w.y,o.z=T*y.z+v*w.z,o.normalize(),f.push(o.x,o.y,o.z),c.x=h.x+n*o.x,c.y=h.y+n*o.y,c.z=h.z+n*o.z,u.push(c.x,c.y,c.z)}}function p(){for(let S=1;S<=t;S++)for(let y=1;y<=s;y++){const w=(s+1)*(S-1)+(y-1),E=(s+1)*S+(y-1),C=(s+1)*S+y,v=(s+1)*(S-1)+y;g.push(w,E,v),g.push(E,C,v)}}function M(){for(let S=0;S<=t;S++)for(let y=0;y<=s;y++)l.x=S/t,l.y=y/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ts(new Ua[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Ws(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Kc(s))s.isRenderTargetTexture?(it("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Kc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function yn(i){const e={};for(let t=0;t<i.length;t++){const n=Ws(i[t]);for(const s in n)e[s]=n[s]}return e}function Kc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ud(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}const Fd={clone:Ws,merge:yn};var Od=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends Vi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Od,this.fragmentShader=Bd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ws(e.uniforms),this.uniformsGroups=Ud(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ht().setHex(s.value);break;case"v2":this.uniforms[n].value=new ee().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new $t().fromArray(s.value);break;case"m3":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class zd extends fi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ue extends Vi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ri,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xs extends ue{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ee(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class kd extends Vi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ri,this.combine=Fl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vd extends Vi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hd extends Vi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ax extends ru{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class tc extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ht(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class xu extends tc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ht(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const To=new Lt,Jc=new N,jc=new N;class yu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new Lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $l,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Jc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jc),jc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jc),t.updateMatrixWorld(),To.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(To,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Er||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(To)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ua=new N,fa=new Ai,ti=new N;class Mu extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ua,fa,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,fa,ti.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ua,fa,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,fa,ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new N,Qc=new ee,eh=new ee;class Cn extends Mu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Al*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Al*2*Math.atan(Math.tan(Sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,Qc,eh),t.subVectors(eh,Qc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Gd extends yu{constructor(){super(new Cn(90,1,.5,500)),this.isPointLightShadow=!0}}class Su extends tc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Gd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class nc extends Mu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=h*this.view.offsetY,o=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Wd extends yu{constructor(){super(new nc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fa extends tc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new Wd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Rs=-90,Cs=1;class Xd extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Cn(Rs,Cs,e,t);s.layers=this.layers,this.add(s);const r=new Cn(Rs,Cs,e,t);r.layers=this.layers,this.add(r);const a=new Cn(Rs,Cs,e,t);a.layers=this.layers,this.add(a);const c=new Cn(Rs,Cs,e,t);c.layers=this.layers,this.add(c);const o=new Cn(Rs,Cs,e,t);o.layers=this.layers,this.add(o);const l=new Cn(Rs,Cs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===oi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class qd extends Cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Yd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Zd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Zd(){this._document.hidden===!1&&this.reset()}const th=new Lt;class $d{constructor(e,t,n=0,s=1/0){this.ray=new ka(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Zl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Mt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return th.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(th),this}intersectObject(e,t=!0,n=[]){return Pl(e,this,n,t),n.sort(nh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Pl(e[s],this,n,t);return n.sort(nh),n}}function nh(i,e){return i.distance-e.distance}function Pl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)Pl(r[a],e,t,!0)}}class ih{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=pt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const lc=class lc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};lc.prototype.isMatrix2=!0;let sh=lc;class Kd extends ki{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){it("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function rh(i,e,t,n){const s=Jd(n);switch(t){case Zh:return i*e;case Vl:return i*e/s.components*s.byteLength;case Hl:return i*e/s.components*s.byteLength;case is:return i*e*2/s.components*s.byteLength;case Gl:return i*e*2/s.components*s.byteLength;case $h:return i*e*3/s.components*s.byteLength;case $n:return i*e*4/s.components*s.byteLength;case Wl:return i*e*4/s.components*s.byteLength;case va:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ya:case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Jo:case Qo:return Math.max(i,16)*Math.max(e,8)/4;case Ko:case jo:return Math.max(i,8)*Math.max(e,8)/2;case el:case tl:case il:case sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nl:case wa:case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ol:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case hl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ul:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case pl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case xl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case yl:case Ml:case Sl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case bl:case El:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ta:case wl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Jd(i){switch(i){case Pn:case Wh:return{byteLength:1,components:1};case Sr:case Xh:case wi:return{byteLength:2,components:1};case zl:case kl:return{byteLength:2,components:4};case ui:case Bl:case Zn:return{byteLength:4,components:1};case qh:case Yh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ul}}));typeof window<"u"&&(window.__THREE__?it("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ul);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function jd(i){const e=new WeakMap;function t(c,o){const l=c.array,h=c.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(o,f),i.bufferData(o,l,h),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,o,l){const h=o.array,u=o.updateRanges;if(i.bindBuffer(l,c),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var Qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ep=`#ifdef USE_ALPHAHASH
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
#endif`,tp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,np=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rp=`#ifdef USE_AOMAP
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
#endif`,ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,op=`#ifdef USE_BATCHING
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
#endif`,lp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,up=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fp=`#ifdef USE_IRIDESCENCE
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
#endif`,dp=`#ifdef USE_BUMPMAP
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
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Sp=`#define PI 3.141592653589793
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
} // validated`,bp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ep=`vec3 transformedNormal = objectNormal;
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
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ip=`#ifdef USE_ENVMAP
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
#endif`,Np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kp=`#ifdef USE_GRADIENTMAP
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
}`,Vp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Xp=`#ifdef USE_ENVMAP
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
#endif`,qp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kp=`PhysicalMaterial material;
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
#endif`,Jp=`uniform sampler2D dfgLUT;
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
}`,jp=`
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
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
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
#endif`,e0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,n0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,i0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,l0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,c0=`#if defined( USE_POINTS_UV )
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
#endif`,h0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,u0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,f0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,d0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,p0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,m0=`#ifdef USE_MORPHTARGETS
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
#endif`,g0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,v0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,x0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,S0=`#ifdef USE_NORMALMAP
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
#endif`,b0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,E0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,w0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,T0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,A0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,C0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,P0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,D0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,L0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,I0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,U0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B0=`float getShadowMask() {
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
}`,z0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,k0=`#ifdef USE_SKINNING
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
#endif`,V0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,H0=`#ifdef USE_SKINNING
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
#endif`,G0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,W0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,X0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,q0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Y0=`#ifdef USE_TRANSMISSION
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
#endif`,Z0=`#ifdef USE_TRANSMISSION
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
#endif`,$0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Q0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,em=`uniform sampler2D t2D;
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
}`,tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`#include <common>
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
}`,am=`#if DEPTH_PACKING == 3200
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
}`,om=`#define DISTANCE
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
}`,lm=`#define DISTANCE
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`uniform float scale;
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
}`,fm=`uniform vec3 diffuse;
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
}`,dm=`#include <common>
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
}`,pm=`uniform vec3 diffuse;
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
}`,mm=`#define LAMBERT
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
}`,gm=`#define LAMBERT
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
}`,_m=`#define MATCAP
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
}`,vm=`#define MATCAP
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
}`,xm=`#define NORMAL
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
}`,ym=`#define NORMAL
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
}`,Mm=`#define PHONG
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
}`,Sm=`#define PHONG
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
}`,bm=`#define STANDARD
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
}`,Em=`#define STANDARD
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
}`,wm=`#define TOON
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
}`,Tm=`#define TOON
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
}`,Am=`uniform float size;
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
}`,Rm=`uniform vec3 diffuse;
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
}`,Cm=`#include <common>
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
}`,Pm=`uniform vec3 color;
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
}`,Dm=`uniform float rotation;
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
}`,Lm=`uniform vec3 diffuse;
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
}`,mt={alphahash_fragment:Qd,alphahash_pars_fragment:ep,alphamap_fragment:tp,alphamap_pars_fragment:np,alphatest_fragment:ip,alphatest_pars_fragment:sp,aomap_fragment:rp,aomap_pars_fragment:ap,batching_pars_vertex:op,batching_vertex:lp,begin_vertex:cp,beginnormal_vertex:hp,bsdfs:up,iridescence_fragment:fp,bumpmap_pars_fragment:dp,clipping_planes_fragment:pp,clipping_planes_pars_fragment:mp,clipping_planes_pars_vertex:gp,clipping_planes_vertex:_p,color_fragment:vp,color_pars_fragment:xp,color_pars_vertex:yp,color_vertex:Mp,common:Sp,cube_uv_reflection_fragment:bp,defaultnormal_vertex:Ep,displacementmap_pars_vertex:wp,displacementmap_vertex:Tp,emissivemap_fragment:Ap,emissivemap_pars_fragment:Rp,colorspace_fragment:Cp,colorspace_pars_fragment:Pp,envmap_fragment:Dp,envmap_common_pars_fragment:Lp,envmap_pars_fragment:Ip,envmap_pars_vertex:Np,envmap_physical_pars_fragment:Xp,envmap_vertex:Up,fog_vertex:Fp,fog_pars_vertex:Op,fog_fragment:Bp,fog_pars_fragment:zp,gradientmap_pars_fragment:kp,lightmap_pars_fragment:Vp,lights_lambert_fragment:Hp,lights_lambert_pars_fragment:Gp,lights_pars_begin:Wp,lights_toon_fragment:qp,lights_toon_pars_fragment:Yp,lights_phong_fragment:Zp,lights_phong_pars_fragment:$p,lights_physical_fragment:Kp,lights_physical_pars_fragment:Jp,lights_fragment_begin:jp,lights_fragment_maps:Qp,lights_fragment_end:e0,lightprobes_pars_fragment:t0,logdepthbuf_fragment:n0,logdepthbuf_pars_fragment:i0,logdepthbuf_pars_vertex:s0,logdepthbuf_vertex:r0,map_fragment:a0,map_pars_fragment:o0,map_particle_fragment:l0,map_particle_pars_fragment:c0,metalnessmap_fragment:h0,metalnessmap_pars_fragment:u0,morphinstance_vertex:f0,morphcolor_vertex:d0,morphnormal_vertex:p0,morphtarget_pars_vertex:m0,morphtarget_vertex:g0,normal_fragment_begin:_0,normal_fragment_maps:v0,normal_pars_fragment:x0,normal_pars_vertex:y0,normal_vertex:M0,normalmap_pars_fragment:S0,clearcoat_normal_fragment_begin:b0,clearcoat_normal_fragment_maps:E0,clearcoat_pars_fragment:w0,iridescence_pars_fragment:T0,opaque_fragment:A0,packing:R0,premultiplied_alpha_fragment:C0,project_vertex:P0,dithering_fragment:D0,dithering_pars_fragment:L0,roughnessmap_fragment:I0,roughnessmap_pars_fragment:N0,shadowmap_pars_fragment:U0,shadowmap_pars_vertex:F0,shadowmap_vertex:O0,shadowmask_pars_fragment:B0,skinbase_vertex:z0,skinning_pars_vertex:k0,skinning_vertex:V0,skinnormal_vertex:H0,specularmap_fragment:G0,specularmap_pars_fragment:W0,tonemapping_fragment:X0,tonemapping_pars_fragment:q0,transmission_fragment:Y0,transmission_pars_fragment:Z0,uv_pars_fragment:$0,uv_pars_vertex:K0,uv_vertex:J0,worldpos_vertex:j0,background_vert:Q0,background_frag:em,backgroundCube_vert:tm,backgroundCube_frag:nm,cube_vert:im,cube_frag:sm,depth_vert:rm,depth_frag:am,distance_vert:om,distance_frag:lm,equirect_vert:cm,equirect_frag:hm,linedashed_vert:um,linedashed_frag:fm,meshbasic_vert:dm,meshbasic_frag:pm,meshlambert_vert:mm,meshlambert_frag:gm,meshmatcap_vert:_m,meshmatcap_frag:vm,meshnormal_vert:xm,meshnormal_frag:ym,meshphong_vert:Mm,meshphong_frag:Sm,meshphysical_vert:bm,meshphysical_frag:Em,meshtoon_vert:wm,meshtoon_frag:Tm,points_vert:Am,points_frag:Rm,shadow_vert:Cm,shadow_frag:Pm,sprite_vert:Dm,sprite_frag:Lm},Ie={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},ri={basic:{uniforms:yn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:yn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:yn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:yn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:yn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new ht(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:yn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:yn([Ie.points,Ie.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:yn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:yn([Ie.common,Ie.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:yn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:yn([Ie.sprite,Ie.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:yn([Ie.common,Ie.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:yn([Ie.lights,Ie.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};ri.physical={uniforms:yn([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const da={r:0,b:0,g:0},Im=new Lt,Eu=new lt;Eu.set(-1,0,0,0,1,0,0,0,1);function Nm(i,e,t,n,s,r){const a=new ht(0);let c=s===!0?0:1,o,l,h=null,u=0,f=null;function d(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){const y=M.backgroundBlurriness>0;S=e.get(S,y)}return S}function g(M){let S=!1;const y=d(M);y===null?m(a,c):y&&y.isColor&&(m(y,1),S=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,S){const y=d(S);y&&(y.isCubeTexture||y.mapping===za)?(l===void 0&&(l=new be(new wt(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:Ws(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Im.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Eu),l.material.toneMapped=Tt.getTransfer(y.colorSpace)!==Ut,(h!==y||u!==y.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(o===void 0&&(o=new be(new Dn(2,2),new fi({name:"BackgroundMaterial",uniforms:Ws(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=y,o.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,o.material.toneMapped=Tt.getTransfer(y.colorSpace)!==Ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),o.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||f!==i.toneMapping)&&(o.material.needsUpdate=!0,h=y,u=y.version,f=i.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function m(M,S){M.getRGB(da,vu(i)),t.buffers.color.setClear(da.r,da.g,da.b,S,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,S=1){a.set(M),c=S,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,m(a,c)},render:g,addToRenderList:_,dispose:p}}function Um(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function c(U,H,j,J,B){let Z=!1;const X=u(U,J,j,H);r!==X&&(r=X,l(r.object)),Z=d(U,J,j,B),Z&&g(U,J,j,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,y(U,H,j,J),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function o(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function u(U,H,j,J){const B=J.wireframe===!0;let Z=n[H.id];Z===void 0&&(Z={},n[H.id]=Z);const X=U.isInstancedMesh===!0?U.id:0;let z=Z[X];z===void 0&&(z={},Z[X]=z);let q=z[j.id];q===void 0&&(q={},z[j.id]=q);let se=q[B];return se===void 0&&(se=f(o()),q[B]=se),se}function f(U){const H=[],j=[],J=[];for(let B=0;B<t;B++)H[B]=0,j[B]=0,J[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:j,attributeDivisors:J,object:U,attributes:{},index:null}}function d(U,H,j,J){const B=r.attributes,Z=H.attributes;let X=0;const z=j.getAttributes();for(const q in z)if(z[q].location>=0){const oe=B[q];let _e=Z[q];if(_e===void 0&&(q==="instanceMatrix"&&U.instanceMatrix&&(_e=U.instanceMatrix),q==="instanceColor"&&U.instanceColor&&(_e=U.instanceColor)),oe===void 0||oe.attribute!==_e||_e&&oe.data!==_e.data)return!0;X++}return r.attributesNum!==X||r.index!==J}function g(U,H,j,J){const B={},Z=H.attributes;let X=0;const z=j.getAttributes();for(const q in z)if(z[q].location>=0){let oe=Z[q];oe===void 0&&(q==="instanceMatrix"&&U.instanceMatrix&&(oe=U.instanceMatrix),q==="instanceColor"&&U.instanceColor&&(oe=U.instanceColor));const _e={};_e.attribute=oe,oe&&oe.data&&(_e.data=oe.data),B[q]=_e,X++}r.attributes=B,r.attributesNum=X,r.index=J}function _(){const U=r.newAttributes;for(let H=0,j=U.length;H<j;H++)U[H]=0}function m(U){p(U,0)}function p(U,H){const j=r.newAttributes,J=r.enabledAttributes,B=r.attributeDivisors;j[U]=1,J[U]===0&&(i.enableVertexAttribArray(U),J[U]=1),B[U]!==H&&(i.vertexAttribDivisor(U,H),B[U]=H)}function M(){const U=r.newAttributes,H=r.enabledAttributes;for(let j=0,J=H.length;j<J;j++)H[j]!==U[j]&&(i.disableVertexAttribArray(j),H[j]=0)}function S(U,H,j,J,B,Z,X){X===!0?i.vertexAttribIPointer(U,H,j,B,Z):i.vertexAttribPointer(U,H,j,J,B,Z)}function y(U,H,j,J){_();const B=J.attributes,Z=j.getAttributes(),X=H.defaultAttributeValues;for(const z in Z){const q=Z[z];if(q.location>=0){let se=B[z];if(se===void 0&&(z==="instanceMatrix"&&U.instanceMatrix&&(se=U.instanceMatrix),z==="instanceColor"&&U.instanceColor&&(se=U.instanceColor)),se!==void 0){const oe=se.normalized,_e=se.itemSize,Ze=e.get(se);if(Ze===void 0)continue;const _t=Ze.buffer,Je=Ze.type,ae=Ze.bytesPerElement,ve=Je===i.INT||Je===i.UNSIGNED_INT||se.gpuType===Bl;if(se.isInterleavedBufferAttribute){const pe=se.data,Ce=pe.stride,Ge=se.offset;if(pe.isInstancedInterleavedBuffer){for(let Fe=0;Fe<q.locationSize;Fe++)p(q.location+Fe,pe.meshPerAttribute);U.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Fe=0;Fe<q.locationSize;Fe++)m(q.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let Fe=0;Fe<q.locationSize;Fe++)S(q.location+Fe,_e/q.locationSize,Je,oe,Ce*ae,(Ge+_e/q.locationSize*Fe)*ae,ve)}else{if(se.isInstancedBufferAttribute){for(let pe=0;pe<q.locationSize;pe++)p(q.location+pe,se.meshPerAttribute);U.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let pe=0;pe<q.locationSize;pe++)m(q.location+pe);i.bindBuffer(i.ARRAY_BUFFER,_t);for(let pe=0;pe<q.locationSize;pe++)S(q.location+pe,_e/q.locationSize,Je,oe,_e*ae,_e/q.locationSize*pe*ae,ve)}}else if(X!==void 0){const oe=X[z];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(q.location,oe);break;case 3:i.vertexAttrib3fv(q.location,oe);break;case 4:i.vertexAttrib4fv(q.location,oe);break;default:i.vertexAttrib1fv(q.location,oe)}}}}M()}function w(){T();for(const U in n){const H=n[U];for(const j in H){const J=H[j];for(const B in J){const Z=J[B];for(const X in Z)h(Z[X].object),delete Z[X];delete J[B]}}delete n[U]}}function E(U){if(n[U.id]===void 0)return;const H=n[U.id];for(const j in H){const J=H[j];for(const B in J){const Z=J[B];for(const X in Z)h(Z[X].object),delete Z[X];delete J[B]}}delete n[U.id]}function C(U){for(const H in n){const j=n[H];for(const J in j){const B=j[J];if(B[U.id]===void 0)continue;const Z=B[U.id];for(const X in Z)h(Z[X].object),delete Z[X];delete B[U.id]}}}function v(U){for(const H in n){const j=n[H],J=U.isInstancedMesh===!0?U.id:0,B=j[J];if(B!==void 0){for(const Z in B){const X=B[Z];for(const z in X)h(X[z].object),delete X[z];delete B[Z]}delete j[J],Object.keys(j).length===0&&delete n[H]}}}function T(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:T,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Fm(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,h){h!==0&&(i.drawArraysInstanced(n,o,l,h),t.update(l,n,h))}function c(o,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function Om(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==$n&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const v=C===wi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Pn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Zn&&!v)}function o(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=o(l);h!==l&&(it("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&it("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:y,maxSamples:w,samples:E}}function Bm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new yi,c=new lt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,S=M*4;let y=p.clippingState||null;o.value=y,y=h(g,f,S,d);for(let w=0;w!==S;++w)y[w]=t[w];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const p=d+_*4,M=f.matrixWorldInverse;c.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,y=d;S!==_;++S,y+=4)a.copy(u[S]).applyMatrix4(M,c),a.normal.toArray(m,y),m[y+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Bi=4,ah=[.125,.215,.35,.446,.526,.582],ji=20,zm=256,hr=new nc,oh=new ht;let Ao=null,Ro=0,Co=0,Po=!1;const km=new N;class Dl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=km}=r;Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ch(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ao,Ro,Co),this._renderer.xr.enabled=Po,e.scissorTest=!1,Ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ao=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:wi,format:$n,colorSpace:Ra,depthBuffer:!1},s=lh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Vm(r)),this._blurMaterial=Gm(r,e,t),this._ggxMaterial=Hm(r,e,t)}return s}_compileMaterial(e){const t=new be(new nn,e);this._renderer.compile(t,hr)}_sceneToCubeUV(e,t,n,s,r){const o=new Cn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(oh),u.toneMapping=li,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new be(new wt,new ss({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(oh),p=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+h[S],r.y,r.z)):y===1?(o.up.set(0,0,l[S]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+h[S],r.z)):(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+h[S]));const w=this._cubeSize;Ps(s,y*w,S>2?w:0,w,w),u.setRenderTarget(s),p&&u.render(_,o),u.render(e,o)}u.toneMapping=d,u.autoClear=f,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ns||e.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ch());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;Ps(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,hr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=0+l*1.25,d=u*f,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Bi?n-g+Bi:0),p=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=d,o.mipInt.value=g-t,Ps(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(c,hr),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,Ps(e,m,p,3*_,2*_),s.setRenderTarget(e),s.render(c,hr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Mt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ji-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ji;m>ji&&it(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ji}`);const p=[];let M=0;for(let C=0;C<ji;++C){const v=C/_,T=Math.exp(-v*v/2);p.push(T),C===0?M+=T:C<m&&(M+=2*T)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const y=this._sizeLods[s],w=3*y*(s>S-Bi?s-S+Bi:0),E=4*(this._cubeSize-y);Ps(t,w,E,3*y,2*y),o.setRenderTarget(t),o.render(u,hr)}}function Vm(i){const e=[],t=[],n=[];let s=i;const r=i-Bi+1+ah.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-Bi?o=ah[a-i+Bi-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),S=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let E=0;E<d;E++){const C=E%3*2/3-1,v=E>2?0:-1,T=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];M.set(T,_*g*E),S.set(f,m*g*E);const I=[E,E,E,E,E,E];y.set(I,p*g*E)}const w=new nn;w.setAttribute("position",new zn(M,_)),w.setAttribute("uv",new zn(S,m)),w.setAttribute("faceIndex",new zn(y,p)),n.push(new be(w,null)),s>Bi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function lh(i,e,t){const n=new hi(i,e,t);return n.texture.mapping=za,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ps(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Hm(i,e,t){return new fi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Gm(i,e,t){const n=new Float32Array(ji),s=new N(0,1,0);return new fi({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function ch(){return new fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function hh(){return new fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Va(){return`

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
	`}class wu extends hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new au(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new wt(5,5,5),r=new fi({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:Si});r.uniforms.tEquirect.value=t;const a=new be(s,r),c=t.minFilter;return t.minFilter===Qi&&(t.minFilter=_n),new Xd(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Wm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Za||d===$a)if(e.has(f)){const g=e.get(f).texture;return c(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const _=new wu(g.height);return _.fromEquirectangularTexture(i,f),e.set(f,_),f.addEventListener("dispose",l),c(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,g=d===Za||d===$a,_=d===ns||d===Vs;if(g||_){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Dl(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const M=f.image;return g&&M&&M.height>0||_&&M&&o(M)?(n===null&&(n=new Dl(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function c(f,d){return d===Za?f.mapping=ns:d===$a&&(f.mapping=Vs),f}function o(f){let d=0;const g=6;for(let _=0;_<g;_++)f[_]!==void 0&&d++;return d===g}function l(f){const d=f.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Xm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Os("WebGLRenderer: "+n+" extension not supported."),s}}}function qm(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function o(u){const f=u.attributes;for(const d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const M=d.array;_=d.version;for(let S=0,y=M.length;S<y;S+=3){const w=M[S+0],E=M[S+1],C=M[S+2];f.push(w,E,E,C,C,w)}}else{const M=g.array;_=g.version;for(let S=0,y=M.length/3-1;S<y;S+=3){const w=S+0,E=S+1,C=S+2;f.push(w,E,E,C,C,w)}}const m=new(g.count>=65535?tu:eu)(f,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:c,update:o,getWireframeAttribute:h}}function Ym(i,e,t){let n;function s(u){n=u}let r,a;function c(u){r=u.type,a=u.bytesPerElement}function o(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let _=0;for(let m=0;m<d;m++)_+=f[m];t.update(_,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=h}function Zm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:Mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function $m(i,e,t){const n=new WeakMap,s=new $t;function r(a,c,o){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let T=function(){C.dispose(),n.delete(c),c.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const d=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let S=0;d===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let y=c.attributes.position.count*S,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*w*4*u),C=new Jh(E,y,w,u);C.type=Zn,C.needsUpdate=!0;const v=S*4;for(let I=0;I<u;I++){const U=m[I],H=p[I],j=M[I],J=y*w*4*I;for(let B=0;B<U.count;B++){const Z=B*v;d===!0&&(s.fromBufferAttribute(U,B),E[J+Z+0]=s.x,E[J+Z+1]=s.y,E[J+Z+2]=s.z,E[J+Z+3]=0),g===!0&&(s.fromBufferAttribute(H,B),E[J+Z+4]=s.x,E[J+Z+5]=s.y,E[J+Z+6]=s.z,E[J+Z+7]=0),_===!0&&(s.fromBufferAttribute(j,B),E[J+Z+8]=s.x,E[J+Z+9]=s.y,E[J+Z+10]=s.z,E[J+Z+11]=j.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new ee(y,w)},n.set(c,f),c.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=c.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Km(i,e,t,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function c(){r=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const Jm={[Oh]:"LINEAR_TONE_MAPPING",[Bh]:"REINHARD_TONE_MAPPING",[zh]:"CINEON_TONE_MAPPING",[Ol]:"ACES_FILMIC_TONE_MAPPING",[Vh]:"AGX_TONE_MAPPING",[Hh]:"NEUTRAL_TONE_MAPPING",[kh]:"CUSTOM_TONE_MAPPING"};function jm(i,e,t,n,s,r){const a=new hi(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Hs(e,t):void 0}),c=new hi(e,t,{type:wi,depthBuffer:!1,stencilBuffer:!1}),o=new nn;o.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new St([0,2,0,0,2,0],2));const l=new zd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new be(o,l),u=new nc(-1,1,1,-1,0,1);let f=null,d=null,g=!1,_,m=null,p=[],M=!1;this.setSize=function(S,y){a.setSize(S,y),c.setSize(S,y);for(let w=0;w<p.length;w++){const E=p[w];E.setSize&&E.setSize(S,y)}},this.setEffects=function(S){p=S,M=p.length>0&&p[0].isRenderPass===!0;const y=a.width,w=a.height;for(let E=0;E<p.length;E++){const C=p[E];C.setSize&&C.setSize(y,w)}},this.begin=function(S,y){if(g||S.toneMapping===li&&p.length===0)return!1;if(m=y,y!==null){const w=y.width,E=y.height;(a.width!==w||a.height!==E)&&this.setSize(w,E)}return M===!1&&S.setRenderTarget(a),_=S.toneMapping,S.toneMapping=li,!0},this.hasRenderPass=function(){return M},this.end=function(S,y){S.toneMapping=_,g=!0;let w=a,E=c;for(let C=0;C<p.length;C++){const v=p[C];if(v.enabled!==!1&&(v.render(S,E,w,y),v.needsSwap!==!1)){const T=w;w=E,E=T}}if(f!==S.outputColorSpace||d!==S.toneMapping){f=S.outputColorSpace,d=S.toneMapping,l.defines={},Tt.getTransfer(f)===Ut&&(l.defines.SRGB_TRANSFER="");const C=Jm[d];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,S.setRenderTarget(m),S.render(h,u),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const Tu=new vn,Ll=new Hs(1,1),Au=new Jh,Ru=new Bf,Cu=new au,uh=[],fh=[],dh=new Float32Array(16),ph=new Float32Array(9),mh=new Float32Array(4);function Ys(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=uh[s];if(r===void 0&&(r=new Float32Array(s),uh[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ha(i,e){let t=fh[e];t===void 0&&(t=new Int32Array(e),fh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Qm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function ig(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;mh.set(n),i.uniformMatrix2fv(this.addr,!1,mh),on(t,n)}}function sg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;ph.set(n),i.uniformMatrix3fv(this.addr,!1,ph),on(t,n)}}function rg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;dh.set(n),i.uniformMatrix4fv(this.addr,!1,dh),on(t,n)}}function ag(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function hg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function fg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function pg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ll.compareFunction=t.isReversedDepthBuffer()?ql:Xl,r=Ll):r=Tu,t.setTexture2D(e||r,s)}function mg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ru,s)}function gg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Cu,s)}function _g(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Au,s)}function vg(i){switch(i){case 5126:return Qm;case 35664:return eg;case 35665:return tg;case 35666:return ng;case 35674:return ig;case 35675:return sg;case 35676:return rg;case 5124:case 35670:return ag;case 35667:case 35671:return og;case 35668:case 35672:return lg;case 35669:case 35673:return cg;case 5125:return hg;case 36294:return ug;case 36295:return fg;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return pg;case 35679:case 36299:case 36307:return mg;case 35680:case 36300:case 36308:case 36293:return gg;case 36289:case 36303:case 36311:case 36292:return _g}}function xg(i,e){i.uniform1fv(this.addr,e)}function yg(i,e){const t=Ys(e,this.size,2);i.uniform2fv(this.addr,t)}function Mg(i,e){const t=Ys(e,this.size,3);i.uniform3fv(this.addr,t)}function Sg(i,e){const t=Ys(e,this.size,4);i.uniform4fv(this.addr,t)}function bg(i,e){const t=Ys(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Eg(i,e){const t=Ys(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function wg(i,e){const t=Ys(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Tg(i,e){i.uniform1iv(this.addr,e)}function Ag(i,e){i.uniform2iv(this.addr,e)}function Rg(i,e){i.uniform3iv(this.addr,e)}function Cg(i,e){i.uniform4iv(this.addr,e)}function Pg(i,e){i.uniform1uiv(this.addr,e)}function Dg(i,e){i.uniform2uiv(this.addr,e)}function Lg(i,e){i.uniform3uiv(this.addr,e)}function Ig(i,e){i.uniform4uiv(this.addr,e)}function Ng(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ll:a=Tu;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Ug(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ru,r[a])}function Fg(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Cu,r[a])}function Og(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Au,r[a])}function Bg(i){switch(i){case 5126:return xg;case 35664:return yg;case 35665:return Mg;case 35666:return Sg;case 35674:return bg;case 35675:return Eg;case 35676:return wg;case 5124:case 35670:return Tg;case 35667:case 35671:return Ag;case 35668:case 35672:return Rg;case 35669:case 35673:return Cg;case 5125:return Pg;case 36294:return Dg;case 36295:return Lg;case 36296:return Ig;case 35678:case 36198:case 36298:case 36306:case 35682:return Ng;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Fg;case 36289:case 36303:case 36311:case 36292:return Og}}class zg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vg(t.type)}}class kg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Bg(t.type)}}class Vg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const Do=/(\w+)(\])?(\[|\.)?/g;function gh(i,e){i.seq.push(e),i.map[e.id]=e}function Hg(i,e,t){const n=i.name,s=n.length;for(Do.lastIndex=0;;){const r=Do.exec(n),a=Do.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){gh(t,l===void 0?new zg(c,i,e):new kg(c,i,e));break}else{let u=t.map[c];u===void 0&&(u=new Vg(c),gh(t,u)),t=u}}}class ba{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);Hg(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function _h(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Gg=37297;let Wg=0;function Xg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const vh=new lt;function qg(i){Tt._getMatrix(vh,Tt.workingColorSpace,i);const e=`mat3( ${vh.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(i)){case Ca:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return it("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function xh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Xg(i.getShaderSource(e),c)}else return r}function Yg(i,e){const t=qg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Zg={[Oh]:"Linear",[Bh]:"Reinhard",[zh]:"Cineon",[Ol]:"ACESFilmic",[Vh]:"AgX",[Hh]:"Neutral",[kh]:"Custom"};function $g(i,e){const t=Zg[e];return t===void 0?(it("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const pa=new N;function Kg(){Tt.getLuminanceCoefficients(pa);const i=pa.x.toFixed(4),e=pa.y.toFixed(4),t=pa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_r).join(`
`)}function jg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Qg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function _r(i){return i!==""}function yh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const e_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Il(i){return i.replace(e_,n_)}const t_=new Map;function n_(i,e){let t=mt[e];if(t===void 0){const n=t_.get(e);if(n!==void 0)t=mt[n],it('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Il(t)}const i_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sh(i){return i.replace(i_,s_)}function s_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const r_={[vr]:"SHADOWMAP_TYPE_PCF",[pr]:"SHADOWMAP_TYPE_VSM"};function a_(i){return r_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const o_={[ns]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE",[za]:"ENVMAP_TYPE_CUBE_UV"};function l_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":o_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const c_={[Vs]:"ENVMAP_MODE_REFRACTION"};function h_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":c_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const u_={[Fl]:"ENVMAP_BLENDING_MULTIPLY",[gf]:"ENVMAP_BLENDING_MIX",[_f]:"ENVMAP_BLENDING_ADD"};function f_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":u_[i.combine]||"ENVMAP_BLENDING_NONE"}function d_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function p_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=a_(t),l=l_(t),h=h_(t),u=f_(t),f=d_(t),d=Jg(t),g=jg(r),_=s.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_r).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_r).join(`
`),p.length>0&&(p+=`
`)):(m=[bh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_r).join(`
`),p=[bh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==li?"#define TONE_MAPPING":"",t.toneMapping!==li?mt.tonemapping_pars_fragment:"",t.toneMapping!==li?$g("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,Yg("linearToOutputTexel",t.outputColorSpace),Kg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_r).join(`
`)),a=Il(a),a=yh(a,t),a=Mh(a,t),c=Il(c),c=yh(c,t),c=Mh(c,t),a=Sh(a),c=Sh(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=M+m+a,y=M+p+c,w=_h(s,s.VERTEX_SHADER,S),E=_h(s,s.FRAGMENT_SHADER,y);s.attachShader(_,w),s.attachShader(_,E),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(U){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(_)||"",j=s.getShaderInfoLog(w)||"",J=s.getShaderInfoLog(E)||"",B=H.trim(),Z=j.trim(),X=J.trim();let z=!0,q=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,E);else{const se=xh(s,w,"vertex"),oe=xh(s,E,"fragment");Mt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+se+`
`+oe)}else B!==""?it("WebGLProgram: Program Info Log:",B):(Z===""||X==="")&&(q=!1);q&&(U.diagnostics={runnable:z,programLog:B,vertexShader:{log:Z,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(w),s.deleteShader(E),v=new ba(s,_),T=Qg(s,_)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(_,Gg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let m_=0;class g_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new __(e),t.set(e,n)),n}}class __{constructor(e){this.id=m_++,this.code=e,this.usedTimes=0}}function v_(i){return i===is||i===wa||i===Ta}function x_(i,e,t,n,s,r){const a=new Zl,c=new g_,o=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return o.add(v),v===0?"uv":`uv${v}`}function _(v,T,I,U,H,j){const J=U.fog,B=H.geometry,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,z=e.get(v.envMap||Z,X),q=z&&z.mapping===za?z.image.height:null,se=d[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&it("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const oe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_e=oe!==void 0?oe.length:0;let Ze=0;B.morphAttributes.position!==void 0&&(Ze=1),B.morphAttributes.normal!==void 0&&(Ze=2),B.morphAttributes.color!==void 0&&(Ze=3);let _t,Je,ae,ve;if(se){const Oe=ri[se];_t=Oe.vertexShader,Je=Oe.fragmentShader}else{_t=v.vertexShader,Je=v.fragmentShader;const Oe=c.getVertexShaderStage(v),Ft=c.getFragmentShaderStage(v);c.update(v,Oe,Ft),ae=Oe.id,ve=Ft.id}const pe=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Ge=H.isInstancedMesh===!0,Fe=H.isBatchedMesh===!0,xt=!!v.map,Qe=!!v.matcap,fe=!!z,me=!!v.aoMap,ge=!!v.lightMap,Ae=!!v.bumpMap&&v.wireframe===!1,Me=!!v.normalMap,Ke=!!v.displacementMap,ke=!!v.emissiveMap,et=!!v.metalnessMap,rt=!!v.roughnessMap,O=v.anisotropy>0,At=v.clearcoat>0,gt=v.dispersion>0,R=v.iridescence>0,x=v.sheen>0,W=v.transmission>0,$=O&&!!v.anisotropyMap,ie=At&&!!v.clearcoatMap,he=At&&!!v.clearcoatNormalMap,ye=At&&!!v.clearcoatRoughnessMap,ne=R&&!!v.iridescenceMap,ce=R&&!!v.iridescenceThicknessMap,Te=x&&!!v.sheenColorMap,We=x&&!!v.sheenRoughnessMap,Re=!!v.specularMap,Ee=!!v.specularColorMap,Ve=!!v.specularIntensityMap,je=W&&!!v.transmissionMap,at=W&&!!v.thicknessMap,k=!!v.gradientMap,Se=!!v.alphaMap,le=v.alphaTest>0,we=!!v.alphaHash,Le=!!v.extensions;let de=li;v.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(de=i.toneMapping);const He={shaderID:se,shaderType:v.type,shaderName:v.name,vertexShader:_t,fragmentShader:Je,defines:v.defines,customVertexShaderID:ae,customFragmentShaderID:ve,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&H._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&H.instanceColor!==null,instancingMorph:Ge&&H.morphTexture!==null,outputColorSpace:pe===null?i.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Tt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:xt,matcap:Qe,envMap:fe,envMapMode:fe&&z.mapping,envMapCubeUVHeight:q,aoMap:me,lightMap:ge,bumpMap:Ae,normalMap:Me,displacementMap:Ke,emissiveMap:ke,normalMapObjectSpace:Me&&v.normalMapType===yf,normalMapTangentSpace:Me&&v.normalMapType===Aa,packedNormalMap:Me&&v.normalMapType===Aa&&v_(v.normalMap.format),metalnessMap:et,roughnessMap:rt,anisotropy:O,anisotropyMap:$,clearcoat:At,clearcoatMap:ie,clearcoatNormalMap:he,clearcoatRoughnessMap:ye,dispersion:gt,iridescence:R,iridescenceMap:ne,iridescenceThicknessMap:ce,sheen:x,sheenColorMap:Te,sheenRoughnessMap:We,specularMap:Re,specularColorMap:Ee,specularIntensityMap:Ve,transmission:W,transmissionMap:je,thicknessMap:at,gradientMap:k,opaque:v.transparent===!1&&v.blending===Fs&&v.alphaToCoverage===!1,alphaMap:Se,alphaTest:le,alphaHash:we,combine:v.combine,mapUv:xt&&g(v.map.channel),aoMapUv:me&&g(v.aoMap.channel),lightMapUv:ge&&g(v.lightMap.channel),bumpMapUv:Ae&&g(v.bumpMap.channel),normalMapUv:Me&&g(v.normalMap.channel),displacementMapUv:Ke&&g(v.displacementMap.channel),emissiveMapUv:ke&&g(v.emissiveMap.channel),metalnessMapUv:et&&g(v.metalnessMap.channel),roughnessMapUv:rt&&g(v.roughnessMap.channel),anisotropyMapUv:$&&g(v.anisotropyMap.channel),clearcoatMapUv:ie&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:he&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:We&&g(v.sheenRoughnessMap.channel),specularMapUv:Re&&g(v.specularMap.channel),specularColorMapUv:Ee&&g(v.specularColorMap.channel),specularIntensityMapUv:Ve&&g(v.specularIntensityMap.channel),transmissionMapUv:je&&g(v.transmissionMap.channel),thicknessMapUv:at&&g(v.thicknessMap.channel),alphaMapUv:Se&&g(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||O),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!B.attributes.uv&&(xt||Se),fog:!!J,useFog:v.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ce,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Ze,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:j.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:xt&&v.map.isVideoTexture===!0&&Tt.getTransfer(v.map.colorSpace)===Ut,decodeVideoTextureEmissive:ke&&v.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(v.emissiveMap.colorSpace)===Ut,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Jt,flipSided:v.side===Mn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Le&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&v.extensions.multiDraw===!0||Fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return He.vertexUv1s=o.has(1),He.vertexUv2s=o.has(2),He.vertexUv3s=o.has(3),o.clear(),He}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)T.push(I),T.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(p(T,v),M(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function p(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function S(v){const T=d[v.type];let I;if(T){const U=ri[T];I=Fd.clone(U.uniforms)}else I=v.uniforms;return I}function y(v,T){let I=h.get(T);return I!==void 0?++I.usedTimes:(I=new p_(i,T,v,s),l.push(I),h.set(T,I)),I}function w(v){if(--v.usedTimes===0){const T=l.indexOf(v);l[T]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function E(v){c.remove(v)}function C(){c.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:S,acquireProgram:y,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:C}}function y_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function M_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Eh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function c(f,d,g,_,m,p){let M=i[e];return M===void 0?(M={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:p},i[e]=M):(M.id=f.id,M.object=f,M.geometry=d,M.material=g,M.materialVariant=a(f),M.groupOrder=_,M.renderOrder=f.renderOrder,M.z=m,M.group=p),e++,M}function o(f,d,g,_,m,p){const M=c(f,d,g,_,m,p);g.transmission>0?n.push(M):g.transparent===!0?s.push(M):t.push(M)}function l(f,d,g,_,m,p){const M=c(f,d,g,_,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(f,d,g){t.length>1&&t.sort(f||M_),n.length>1&&n.sort(d||Eh),s.length>1&&s.sort(d||Eh),g&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let f=e,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:h}}function S_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new wh,i.set(n,[a])):s>=r.length?(a=new wh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function b_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ht};break;case"SpotLight":t={position:new N,direction:new N,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function E_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let w_=0;function T_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function A_(i){const e=new b_,t=E_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new Lt,a=new Lt;function c(l){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,S=0,y=0,w=0,E=0,C=0;l.sort(T_);for(let T=0,I=l.length;T<I;T++){const U=l[T],H=U.color,j=U.intensity,J=U.distance;let B=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===is?B=U.shadow.map.texture:B=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=H.r*j,u+=H.g*j,f+=H.b*j;else if(U.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(U.sh.coefficients[Z],j);C++}else if(U.isDirectionalLight){const Z=e.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const X=U.shadow,z=t.get(U);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.directionalShadow[d]=z,n.directionalShadowMap[d]=B,n.directionalShadowMatrix[d]=U.shadow.matrix,M++}n.directional[d]=Z,d++}else if(U.isSpotLight){const Z=e.get(U);Z.position.setFromMatrixPosition(U.matrixWorld),Z.color.copy(H).multiplyScalar(j),Z.distance=J,Z.coneCos=Math.cos(U.angle),Z.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Z.decay=U.decay,n.spot[_]=Z;const X=U.shadow;if(U.map&&(n.spotLightMap[w]=U.map,w++,X.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[_]=X.matrix,U.castShadow){const z=t.get(U);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=B,y++}_++}else if(U.isRectAreaLight){const Z=e.get(U);Z.color.copy(H).multiplyScalar(j),Z.halfWidth.set(U.width*.5,0,0),Z.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=Z,m++}else if(U.isPointLight){const Z=e.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),Z.distance=U.distance,Z.decay=U.decay,U.castShadow){const X=U.shadow,z=t.get(U);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,z.shadowCameraNear=X.camera.near,z.shadowCameraFar=X.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=U.shadow.matrix,S++}n.point[g]=Z,g++}else if(U.isHemisphereLight){const Z=e.get(U);Z.skyColor.copy(U.color).multiplyScalar(j),Z.groundColor.copy(U.groundColor).multiplyScalar(j),n.hemi[p]=Z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const v=n.hash;(v.directionalLength!==d||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==M||v.numPointShadows!==S||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=y+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,v.directionalLength=d,v.pointLength=g,v.spotLength=_,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=M,v.numPointShadows=S,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=C,n.version=w_++)}function o(l,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const S=l[p];if(S.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(S.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:c,setupView:o,state:n}}function Th(i){const e=new A_(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function c(f){n.push(f)}function o(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function R_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new Th(i),e.set(s,[c])):r>=a.length?(c=new Th(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const C_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,P_=`uniform sampler2D shadow_pass;
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
}`,D_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],L_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Ah=new Lt,ur=new N,Lo=new N;function I_(i,e,t){let n=new $l;const s=new ee,r=new ee,a=new $t,c=new Vd,o=new Hd,l={},h=t.maxTextureSize,u={[zi]:Mn,[Mn]:zi,[Jt]:Jt},f=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:C_,fragmentShader:P_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new nn;g.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new be(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vr;let p=this.type;this.render=function(E,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Ku&&(it("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=vr);const T=i.getRenderTarget(),I=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Si),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const j=p!==this.type;j&&C.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(B=>B.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,B=E.length;J<B;J++){const Z=E[J],X=Z.shadow;if(X===void 0){it("WebGLShadowMap:",Z,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const z=X.getFrameExtents();s.multiply(z),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/z.x),s.x=r.x*z.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/z.y),s.y=r.y*z.y,X.mapSize.y=r.y));const q=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=q,X.map===null||j===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===pr){if(Z.isPointLight){it("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new hi(s.x,s.y,{format:is,type:wi,minFilter:_n,magFilter:_n,generateMipmaps:!1}),X.map.texture.name=Z.name+".shadowMap",X.map.depthTexture=new Hs(s.x,s.y,Zn),X.map.depthTexture.name=Z.name+".shadowMapDepth",X.map.depthTexture.format=Ti,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=un,X.map.depthTexture.magFilter=un}else Z.isPointLight?(X.map=new wu(s.x),X.map.depthTexture=new id(s.x,ui)):(X.map=new hi(s.x,s.y),X.map.depthTexture=new Hs(s.x,s.y,ui)),X.map.depthTexture.name=Z.name+".shadowMap",X.map.depthTexture.format=Ti,this.type===vr?(X.map.depthTexture.compareFunction=q?ql:Xl,X.map.depthTexture.minFilter=_n,X.map.depthTexture.magFilter=_n):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=un,X.map.depthTexture.magFilter=un);X.camera.updateProjectionMatrix()}const se=X.map.isWebGLCubeRenderTarget?6:1;for(let oe=0;oe<se;oe++){if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,oe),i.clear();else{oe===0&&(i.setRenderTarget(X.map),i.clear());const _e=X.getViewport(oe);a.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),H.viewport(a)}if(Z.isPointLight){const _e=X.camera,Ze=X.matrix,_t=Z.distance||_e.far;_t!==_e.far&&(_e.far=_t,_e.updateProjectionMatrix()),ur.setFromMatrixPosition(Z.matrixWorld),_e.position.copy(ur),Lo.copy(_e.position),Lo.add(D_[oe]),_e.up.copy(L_[oe]),_e.lookAt(Lo),_e.updateMatrixWorld(),Ze.makeTranslation(-ur.x,-ur.y,-ur.z),Ah.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Ah,_e.coordinateSystem,_e.reversedDepth)}else X.updateMatrices(Z);n=X.getFrustum(),y(C,v,X.camera,Z,this.type)}X.isPointLightShadow!==!0&&this.type===pr&&M(X,v),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,I,U)};function M(E,C){const v=e.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new hi(s.x,s.y,{format:is,type:wi})),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,v,f,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,v,d,_,null)}function S(E,C,v,T){let I=null;const U=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)I=U;else if(I=v.isPointLight===!0?o:c,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const H=I.uuid,j=C.uuid;let J=l[H];J===void 0&&(J={},l[H]=J);let B=J[j];B===void 0&&(B=I.clone(),J[j]=B,C.addEventListener("dispose",w)),I=B}if(I.visible=C.visible,I.wireframe=C.wireframe,T===pr?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:u[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const H=i.properties.get(I);H.light=v}return I}function y(E,C,v,T,I){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&I===pr)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const j=e.update(E),J=E.material;if(Array.isArray(J)){const B=j.groups;for(let Z=0,X=B.length;Z<X;Z++){const z=B[Z],q=J[z.materialIndex];if(q&&q.visible){const se=S(E,q,T,I);E.onBeforeShadow(i,E,C,v,j,se,z),i.renderBufferDirect(v,null,j,se,E,z),E.onAfterShadow(i,E,C,v,j,se,z)}}}else if(J.visible){const B=S(E,J,T,I);E.onBeforeShadow(i,E,C,v,j,B,null),i.renderBufferDirect(v,null,j,B,E,null),E.onAfterShadow(i,E,C,v,j,B,null)}}const H=E.children;for(let j=0,J=H.length;j<J;j++)y(H[j],C,v,T,I)}function w(E){E.target.removeEventListener("dispose",w);for(const v in l){const T=l[v],I=E.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function N_(i,e){function t(){let k=!1;const Se=new $t;let le=null;const we=new $t(0,0,0,0);return{setMask:function(Le){le!==Le&&!k&&(i.colorMask(Le,Le,Le,Le),le=Le)},setLocked:function(Le){k=Le},setClear:function(Le,de,He,Oe,Ft){Ft===!0&&(Le*=Oe,de*=Oe,He*=Oe),Se.set(Le,de,He,Oe),we.equals(Se)===!1&&(i.clearColor(Le,de,He,Oe),we.copy(Se))},reset:function(){k=!1,le=null,we.set(-1,0,0,0)}}}function n(){let k=!1,Se=!1,le=null,we=null,Le=null;return{setReversed:function(de){if(Se!==de){const He=e.get("EXT_clip_control");de?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),Se=de;const Oe=Le;Le=null,this.setClear(Oe)}},getReversed:function(){return Se},setTest:function(de){de?pe(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(de){le!==de&&!k&&(i.depthMask(de),le=de)},setFunc:function(de){if(Se&&(de=Pf[de]),we!==de){switch(de){case Ho:i.depthFunc(i.NEVER);break;case Go:i.depthFunc(i.ALWAYS);break;case Wo:i.depthFunc(i.LESS);break;case ks:i.depthFunc(i.LEQUAL);break;case Xo:i.depthFunc(i.EQUAL);break;case qo:i.depthFunc(i.GEQUAL);break;case Yo:i.depthFunc(i.GREATER);break;case Zo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=de}},setLocked:function(de){k=de},setClear:function(de){Le!==de&&(Le=de,Se&&(de=1-de),i.clearDepth(de))},reset:function(){k=!1,le=null,we=null,Le=null,Se=!1}}}function s(){let k=!1,Se=null,le=null,we=null,Le=null,de=null,He=null,Oe=null,Ft=null;return{setTest:function(Pt){k||(Pt?pe(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(Pt){Se!==Pt&&!k&&(i.stencilMask(Pt),Se=Pt)},setFunc:function(Pt,Ln,fn){(le!==Pt||we!==Ln||Le!==fn)&&(i.stencilFunc(Pt,Ln,fn),le=Pt,we=Ln,Le=fn)},setOp:function(Pt,Ln,fn){(de!==Pt||He!==Ln||Oe!==fn)&&(i.stencilOp(Pt,Ln,fn),de=Pt,He=Ln,Oe=fn)},setLocked:function(Pt){k=Pt},setClear:function(Pt){Ft!==Pt&&(i.clearStencil(Pt),Ft=Pt)},reset:function(){k=!1,Se=null,le=null,we=null,Le=null,de=null,He=null,Oe=null,Ft=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let h={},u={},f={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,S=null,y=null,w=null,E=null,C=null,v=new ht(0,0,0),T=0,I=!1,U=null,H=null,j=null,J=null,B=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,z=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(q)[1]),X=z>=1):q.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),X=z>=2);let se=null,oe={};const _e=i.getParameter(i.SCISSOR_BOX),Ze=i.getParameter(i.VIEWPORT),_t=new $t().fromArray(_e),Je=new $t().fromArray(Ze);function ae(k,Se,le,we){const Le=new Uint8Array(4),de=i.createTexture();i.bindTexture(k,de),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let He=0;He<le;He++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(Se+He,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return de}const ve={};ve[i.TEXTURE_2D]=ae(i.TEXTURE_2D,i.TEXTURE_2D,1),ve[i.TEXTURE_CUBE_MAP]=ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[i.TEXTURE_2D_ARRAY]=ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ve[i.TEXTURE_3D]=ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),pe(i.DEPTH_TEST),a.setFunc(ks),Ae(!1),Me(mc),pe(i.CULL_FACE),me(Si);function pe(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Ce(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function Ge(k,Se){return f[k]!==Se?(i.bindFramebuffer(k,Se),f[k]=Se,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Se),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function Fe(k,Se){let le=g,we=!1;if(k){le=d.get(Se),le===void 0&&(le=[],d.set(Se,le));const Le=k.textures;if(le.length!==Le.length||le[0]!==i.COLOR_ATTACHMENT0){for(let de=0,He=Le.length;de<He;de++)le[de]=i.COLOR_ATTACHMENT0+de;le.length=Le.length,we=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,we=!0);we&&i.drawBuffers(le)}function xt(k){return _!==k?(i.useProgram(k),_=k,!0):!1}const Qe={[Ki]:i.FUNC_ADD,[ju]:i.FUNC_SUBTRACT,[Qu]:i.FUNC_REVERSE_SUBTRACT};Qe[ef]=i.MIN,Qe[tf]=i.MAX;const fe={[nf]:i.ZERO,[sf]:i.ONE,[rf]:i.SRC_COLOR,[ko]:i.SRC_ALPHA,[uf]:i.SRC_ALPHA_SATURATE,[cf]:i.DST_COLOR,[of]:i.DST_ALPHA,[af]:i.ONE_MINUS_SRC_COLOR,[Vo]:i.ONE_MINUS_SRC_ALPHA,[hf]:i.ONE_MINUS_DST_COLOR,[lf]:i.ONE_MINUS_DST_ALPHA,[ff]:i.CONSTANT_COLOR,[df]:i.ONE_MINUS_CONSTANT_COLOR,[pf]:i.CONSTANT_ALPHA,[mf]:i.ONE_MINUS_CONSTANT_ALPHA};function me(k,Se,le,we,Le,de,He,Oe,Ft,Pt){if(k===Si){m===!0&&(Ce(i.BLEND),m=!1);return}if(m===!1&&(pe(i.BLEND),m=!0),k!==Ju){if(k!==p||Pt!==I){if((M!==Ki||w!==Ki)&&(i.blendEquation(i.FUNC_ADD),M=Ki,w=Ki),Pt)switch(k){case Fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFunc(i.ONE,i.ONE);break;case _c:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case vc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Mt("WebGLState: Invalid blending: ",k);break}else switch(k){case Fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case _c:Mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vc:Mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Mt("WebGLState: Invalid blending: ",k);break}S=null,y=null,E=null,C=null,v.set(0,0,0),T=0,p=k,I=Pt}return}Le=Le||Se,de=de||le,He=He||we,(Se!==M||Le!==w)&&(i.blendEquationSeparate(Qe[Se],Qe[Le]),M=Se,w=Le),(le!==S||we!==y||de!==E||He!==C)&&(i.blendFuncSeparate(fe[le],fe[we],fe[de],fe[He]),S=le,y=we,E=de,C=He),(Oe.equals(v)===!1||Ft!==T)&&(i.blendColor(Oe.r,Oe.g,Oe.b,Ft),v.copy(Oe),T=Ft),p=k,I=!1}function ge(k,Se){k.side===Jt?Ce(i.CULL_FACE):pe(i.CULL_FACE);let le=k.side===Mn;Se&&(le=!le),Ae(le),k.blending===Fs&&k.transparent===!1?me(Si):me(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const we=k.stencilWrite;c.setTest(we),we&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ke(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?pe(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(k){U!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),U=k)}function Me(k){k!==Zu?(pe(i.CULL_FACE),k!==H&&(k===mc?i.cullFace(i.BACK):k===$u?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),H=k}function Ke(k){k!==j&&(X&&i.lineWidth(k),j=k)}function ke(k,Se,le){k?(pe(i.POLYGON_OFFSET_FILL),(J!==Se||B!==le)&&(J=Se,B=le,a.getReversed()&&(Se=-Se),i.polygonOffset(Se,le))):Ce(i.POLYGON_OFFSET_FILL)}function et(k){k?pe(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function rt(k){k===void 0&&(k=i.TEXTURE0+Z-1),se!==k&&(i.activeTexture(k),se=k)}function O(k,Se,le){le===void 0&&(se===null?le=i.TEXTURE0+Z-1:le=se);let we=oe[le];we===void 0&&(we={type:void 0,texture:void 0},oe[le]=we),(we.type!==k||we.texture!==Se)&&(se!==le&&(i.activeTexture(le),se=le),i.bindTexture(k,Se||ve[k]),we.type=k,we.texture=Se)}function At(){const k=oe[se];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function gt(){try{i.compressedTexImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function x(){try{i.texSubImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function W(){try{i.texSubImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ie(){try{i.compressedTexSubImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function he(){try{i.texStorage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ye(){try{i.texStorage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ne(){try{i.texImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ce(){try{i.texImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function Te(k){return u[k]!==void 0?u[k]:i.getParameter(k)}function We(k,Se){u[k]!==Se&&(i.pixelStorei(k,Se),u[k]=Se)}function Re(k){_t.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),_t.copy(k))}function Ee(k){Je.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Je.copy(k))}function Ve(k,Se){let le=l.get(Se);le===void 0&&(le=new WeakMap,l.set(Se,le));let we=le.get(k);we===void 0&&(we=i.getUniformBlockIndex(Se,k.name),le.set(k,we))}function je(k,Se){const we=l.get(Se).get(k);o.get(Se)!==we&&(i.uniformBlockBinding(Se,we,k.__bindingPointIndex),o.set(Se,we))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},se=null,oe={},f={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,S=null,y=null,w=null,E=null,C=null,v=new ht(0,0,0),T=0,I=!1,U=null,H=null,j=null,J=null,B=null,_t.set(0,0,i.canvas.width,i.canvas.height),Je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:pe,disable:Ce,bindFramebuffer:Ge,drawBuffers:Fe,useProgram:xt,setBlending:me,setMaterial:ge,setFlipSided:Ae,setCullFace:Me,setLineWidth:Ke,setPolygonOffset:ke,setScissorTest:et,activeTexture:rt,bindTexture:O,unbindTexture:At,compressedTexImage2D:gt,compressedTexImage3D:R,texImage2D:ne,texImage3D:ce,pixelStorei:We,getParameter:Te,updateUBOMapping:Ve,uniformBlockBinding:je,texStorage2D:he,texStorage3D:ye,texSubImage2D:x,texSubImage3D:W,compressedTexSubImage2D:$,compressedTexSubImage3D:ie,scissor:Re,viewport:Ee,reset:at}}function U_(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ee,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,x){return g?new OffscreenCanvas(R,x):Pa("canvas")}function m(R,x,W){let $=1;const ie=gt(R);if((ie.width>W||ie.height>W)&&($=W/Math.max(ie.width,ie.height)),$<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const he=Math.floor($*ie.width),ye=Math.floor($*ie.height);f===void 0&&(f=_(he,ye));const ne=x?_(he,ye):f;return ne.width=he,ne.height=ye,ne.getContext("2d").drawImage(R,0,0,he,ye),it("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+he+"x"+ye+")."),ne}else return"data"in R&&it("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),R;return R}function p(R){return R.generateMipmaps}function M(R){i.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,x,W,$,ie,he=!1){if(R!==null){if(i[R]!==void 0)return i[R];it("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ye;$&&(ye=e.get("EXT_texture_norm16"),ye||it("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ne=x;if(x===i.RED&&(W===i.FLOAT&&(ne=i.R32F),W===i.HALF_FLOAT&&(ne=i.R16F),W===i.UNSIGNED_BYTE&&(ne=i.R8),W===i.UNSIGNED_SHORT&&ye&&(ne=ye.R16_EXT),W===i.SHORT&&ye&&(ne=ye.R16_SNORM_EXT)),x===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(ne=i.R8UI),W===i.UNSIGNED_SHORT&&(ne=i.R16UI),W===i.UNSIGNED_INT&&(ne=i.R32UI),W===i.BYTE&&(ne=i.R8I),W===i.SHORT&&(ne=i.R16I),W===i.INT&&(ne=i.R32I)),x===i.RG&&(W===i.FLOAT&&(ne=i.RG32F),W===i.HALF_FLOAT&&(ne=i.RG16F),W===i.UNSIGNED_BYTE&&(ne=i.RG8),W===i.UNSIGNED_SHORT&&ye&&(ne=ye.RG16_EXT),W===i.SHORT&&ye&&(ne=ye.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(ne=i.RG8UI),W===i.UNSIGNED_SHORT&&(ne=i.RG16UI),W===i.UNSIGNED_INT&&(ne=i.RG32UI),W===i.BYTE&&(ne=i.RG8I),W===i.SHORT&&(ne=i.RG16I),W===i.INT&&(ne=i.RG32I)),x===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),W===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),W===i.UNSIGNED_INT&&(ne=i.RGB32UI),W===i.BYTE&&(ne=i.RGB8I),W===i.SHORT&&(ne=i.RGB16I),W===i.INT&&(ne=i.RGB32I)),x===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),W===i.UNSIGNED_INT&&(ne=i.RGBA32UI),W===i.BYTE&&(ne=i.RGBA8I),W===i.SHORT&&(ne=i.RGBA16I),W===i.INT&&(ne=i.RGBA32I)),x===i.RGB&&(W===i.UNSIGNED_SHORT&&ye&&(ne=ye.RGB16_EXT),W===i.SHORT&&ye&&(ne=ye.RGB16_SNORM_EXT),W===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(ne=i.R11F_G11F_B10F)),x===i.RGBA){const ce=he?Ca:Tt.getTransfer(ie);W===i.FLOAT&&(ne=i.RGBA32F),W===i.HALF_FLOAT&&(ne=i.RGBA16F),W===i.UNSIGNED_BYTE&&(ne=ce===Ut?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT&&ye&&(ne=ye.RGBA16_EXT),W===i.SHORT&&ye&&(ne=ye.RGBA16_SNORM_EXT),W===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function w(R,x){let W;return R?x===null||x===ui||x===br?W=i.DEPTH24_STENCIL8:x===Zn?W=i.DEPTH32F_STENCIL8:x===Sr&&(W=i.DEPTH24_STENCIL8,it("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ui||x===br?W=i.DEPTH_COMPONENT24:x===Zn?W=i.DEPTH_COMPONENT32F:x===Sr&&(W=i.DEPTH_COMPONENT16),W}function E(R,x){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==un&&R.minFilter!==_n?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function C(R){const x=R.target;x.removeEventListener("dispose",C),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function v(R){const x=R.target;x.removeEventListener("dispose",v),U(x)}function T(R){const x=n.get(R);if(x.__webglInit===void 0)return;const W=R.source,$=d.get(W);if($){const ie=$[x.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&I(R),Object.keys($).length===0&&d.delete(W)}n.remove(R)}function I(R){const x=n.get(R);i.deleteTexture(x.__webglTexture);const W=R.source,$=d.get(W);delete $[x.__cacheKey],a.memory.textures--}function U(R){const x=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let ie=0;ie<x.__webglFramebuffer[$].length;ie++)i.deleteFramebuffer(x.__webglFramebuffer[$][ie]);else i.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)i.deleteFramebuffer(x.__webglFramebuffer[$]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const W=R.textures;for(let $=0,ie=W.length;$<ie;$++){const he=n.get(W[$]);he.__webglTexture&&(i.deleteTexture(he.__webglTexture),a.memory.textures--),n.remove(W[$])}n.remove(R)}let H=0;function j(){H=0}function J(){return H}function B(R){H=R}function Z(){const R=H;return R>=s.maxTextures&&it("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),H+=1,R}function X(R){const x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function z(R,x){const W=n.get(R);if(R.isVideoTexture&&O(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&W.__version!==R.version){const $=R.image;if($===null)it("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)it("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(W,R,x);return}}else R.isExternalTexture&&(W.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+x)}function q(R,x){const W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){Ce(W,R,x);return}else R.isExternalTexture&&(W.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+x)}function se(R,x){const W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){Ce(W,R,x);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+x)}function oe(R,x){const W=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&W.__version!==R.version){Ge(W,R,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+x)}const _e={[ci]:i.REPEAT,[Mi]:i.CLAMP_TO_EDGE,[$o]:i.MIRRORED_REPEAT},Ze={[un]:i.NEAREST,[vf]:i.NEAREST_MIPMAP_NEAREST,[zr]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[Ka]:i.LINEAR_MIPMAP_NEAREST,[Qi]:i.LINEAR_MIPMAP_LINEAR},_t={[Mf]:i.NEVER,[Tf]:i.ALWAYS,[Sf]:i.LESS,[Xl]:i.LEQUAL,[bf]:i.EQUAL,[ql]:i.GEQUAL,[Ef]:i.GREATER,[wf]:i.NOTEQUAL};function Je(R,x){if(x.type===Zn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===_n||x.magFilter===Ka||x.magFilter===zr||x.magFilter===Qi||x.minFilter===_n||x.minFilter===Ka||x.minFilter===zr||x.minFilter===Qi)&&it("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,_e[x.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,_e[x.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,_e[x.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ze[x.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ze[x.minFilter]),x.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,_t[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===un||x.minFilter!==zr&&x.minFilter!==Qi||x.type===Zn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ae(R,x){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",C));const $=x.source;let ie=d.get($);ie===void 0&&(ie={},d.set($,ie));const he=X(x);if(he!==R.__cacheKey){ie[he]===void 0&&(ie[he]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ie[he].usedTimes++;const ye=ie[R.__cacheKey];ye!==void 0&&(ie[R.__cacheKey].usedTimes--,ye.usedTimes===0&&I(x)),R.__cacheKey=he,R.__webglTexture=ie[he].texture}return W}function ve(R,x,W){return Math.floor(Math.floor(R/W)/x)}function pe(R,x,W,$){const he=R.updateRanges;if(he.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,W,$,x.data);else{he.sort((We,Re)=>We.start-Re.start);let ye=0;for(let We=1;We<he.length;We++){const Re=he[ye],Ee=he[We],Ve=Re.start+Re.count,je=ve(Ee.start,x.width,4),at=ve(Re.start,x.width,4);Ee.start<=Ve+1&&je===at&&ve(Ee.start+Ee.count-1,x.width,4)===je?Re.count=Math.max(Re.count,Ee.start+Ee.count-Re.start):(++ye,he[ye]=Ee)}he.length=ye+1;const ne=t.getParameter(i.UNPACK_ROW_LENGTH),ce=t.getParameter(i.UNPACK_SKIP_PIXELS),Te=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let We=0,Re=he.length;We<Re;We++){const Ee=he[We],Ve=Math.floor(Ee.start/4),je=Math.ceil(Ee.count/4),at=Ve%x.width,k=Math.floor(Ve/x.width),Se=je,le=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,at),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,at,k,Se,le,W,$,x.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ne),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(i.UNPACK_SKIP_ROWS,Te)}}function Ce(R,x,W){let $=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=i.TEXTURE_3D);const ie=ae(R,x),he=x.source;t.bindTexture($,R.__webglTexture,i.TEXTURE0+W);const ye=n.get(he);if(he.version!==ye.__version||ie===!0){if(t.activeTexture(i.TEXTURE0+W),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const le=Tt.getPrimaries(Tt.workingColorSpace),we=x.colorSpace===Oi?null:Tt.getPrimaries(x.colorSpace),Le=x.colorSpace===Oi||le===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let ce=m(x.image,!1,s.maxTextureSize);ce=At(x,ce);const Te=r.convert(x.format,x.colorSpace),We=r.convert(x.type);let Re=y(x.internalFormat,Te,We,x.normalized,x.colorSpace,x.isVideoTexture);Je($,x);let Ee;const Ve=x.mipmaps,je=x.isVideoTexture!==!0,at=ye.__version===void 0||ie===!0,k=he.dataReady,Se=E(x,ce);if(x.isDepthTexture)Re=w(x.format===es,x.type),at&&(je?t.texStorage2D(i.TEXTURE_2D,1,Re,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,Re,ce.width,ce.height,0,Te,We,null));else if(x.isDataTexture)if(Ve.length>0){je&&at&&t.texStorage2D(i.TEXTURE_2D,Se,Re,Ve[0].width,Ve[0].height);for(let le=0,we=Ve.length;le<we;le++)Ee=Ve[le],je?k&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Ee.width,Ee.height,Te,We,Ee.data):t.texImage2D(i.TEXTURE_2D,le,Re,Ee.width,Ee.height,0,Te,We,Ee.data);x.generateMipmaps=!1}else je?(at&&t.texStorage2D(i.TEXTURE_2D,Se,Re,ce.width,ce.height),k&&pe(x,ce,Te,We)):t.texImage2D(i.TEXTURE_2D,0,Re,ce.width,ce.height,0,Te,We,ce.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){je&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Re,Ve[0].width,Ve[0].height,ce.depth);for(let le=0,we=Ve.length;le<we;le++)if(Ee=Ve[le],x.format!==$n)if(Te!==null)if(je){if(k)if(x.layerUpdates.size>0){const Le=rh(Ee.width,Ee.height,x.format,x.type);for(const de of x.layerUpdates){const He=Ee.data.subarray(de*Le/Ee.data.BYTES_PER_ELEMENT,(de+1)*Le/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,de,Ee.width,Ee.height,1,Te,He)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Ee.width,Ee.height,ce.depth,Te,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,le,Re,Ee.width,Ee.height,ce.depth,0,Ee.data,0,0);else it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Ee.width,Ee.height,ce.depth,Te,We,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,le,Re,Ee.width,Ee.height,ce.depth,0,Te,We,Ee.data)}else{je&&at&&t.texStorage2D(i.TEXTURE_2D,Se,Re,Ve[0].width,Ve[0].height);for(let le=0,we=Ve.length;le<we;le++)Ee=Ve[le],x.format!==$n?Te!==null?je?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,le,0,0,Ee.width,Ee.height,Te,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,le,Re,Ee.width,Ee.height,0,Ee.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?k&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Ee.width,Ee.height,Te,We,Ee.data):t.texImage2D(i.TEXTURE_2D,le,Re,Ee.width,Ee.height,0,Te,We,Ee.data)}else if(x.isDataArrayTexture)if(je){if(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Re,ce.width,ce.height,ce.depth),k)if(x.layerUpdates.size>0){const le=rh(ce.width,ce.height,x.format,x.type);for(const we of x.layerUpdates){const Le=ce.data.subarray(we*le/ce.data.BYTES_PER_ELEMENT,(we+1)*le/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,we,ce.width,ce.height,1,Te,We,Le)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Te,We,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ce.width,ce.height,ce.depth,0,Te,We,ce.data);else if(x.isData3DTexture)je?(at&&t.texStorage3D(i.TEXTURE_3D,Se,Re,ce.width,ce.height,ce.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Te,We,ce.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ce.width,ce.height,ce.depth,0,Te,We,ce.data);else if(x.isFramebufferTexture){if(at)if(je)t.texStorage2D(i.TEXTURE_2D,Se,Re,ce.width,ce.height);else{let le=ce.width,we=ce.height;for(let Le=0;Le<Se;Le++)t.texImage2D(i.TEXTURE_2D,Le,Re,le,we,0,Te,We,null),le>>=1,we>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const le=i.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),ce.parentNode!==le){le.appendChild(ce),u.add(x),le.onpaint=we=>{const Le=we.changedElements;for(const de of u)Le.includes(de.image)&&(de.needsUpdate=!0)},le.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ce);else{const Le=i.RGBA,de=i.RGBA,He=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Le,de,He,ce)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ve.length>0){if(je&&at){const le=gt(Ve[0]);t.texStorage2D(i.TEXTURE_2D,Se,Re,le.width,le.height)}for(let le=0,we=Ve.length;le<we;le++)Ee=Ve[le],je?k&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Te,We,Ee):t.texImage2D(i.TEXTURE_2D,le,Re,Te,We,Ee);x.generateMipmaps=!1}else if(je){if(at){const le=gt(ce);t.texStorage2D(i.TEXTURE_2D,Se,Re,le.width,le.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,We,ce)}else t.texImage2D(i.TEXTURE_2D,0,Re,Te,We,ce);p(x)&&M($),ye.__version=he.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Ge(R,x,W){if(x.image.length!==6)return;const $=ae(R,x),ie=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+W);const he=n.get(ie);if(ie.version!==he.__version||$===!0){t.activeTexture(i.TEXTURE0+W);const ye=Tt.getPrimaries(Tt.workingColorSpace),ne=x.colorSpace===Oi?null:Tt.getPrimaries(x.colorSpace),ce=x.colorSpace===Oi||ye===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const Te=x.isCompressedTexture||x.image[0].isCompressedTexture,We=x.image[0]&&x.image[0].isDataTexture,Re=[];for(let de=0;de<6;de++)!Te&&!We?Re[de]=m(x.image[de],!0,s.maxCubemapSize):Re[de]=We?x.image[de].image:x.image[de],Re[de]=At(x,Re[de]);const Ee=Re[0],Ve=r.convert(x.format,x.colorSpace),je=r.convert(x.type),at=y(x.internalFormat,Ve,je,x.normalized,x.colorSpace),k=x.isVideoTexture!==!0,Se=he.__version===void 0||$===!0,le=ie.dataReady;let we=E(x,Ee);Je(i.TEXTURE_CUBE_MAP,x);let Le;if(Te){k&&Se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,at,Ee.width,Ee.height);for(let de=0;de<6;de++){Le=Re[de].mipmaps;for(let He=0;He<Le.length;He++){const Oe=Le[He];x.format!==$n?Ve!==null?k?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,0,0,Oe.width,Oe.height,Ve,Oe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,at,Oe.width,Oe.height,0,Oe.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,0,0,Oe.width,Oe.height,Ve,je,Oe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He,at,Oe.width,Oe.height,0,Ve,je,Oe.data)}}}else{if(Le=x.mipmaps,k&&Se){Le.length>0&&we++;const de=gt(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,at,de.width,de.height)}for(let de=0;de<6;de++)if(We){k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Re[de].width,Re[de].height,Ve,je,Re[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,at,Re[de].width,Re[de].height,0,Ve,je,Re[de].data);for(let He=0;He<Le.length;He++){const Ft=Le[He].image[de].image;k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,0,0,Ft.width,Ft.height,Ve,je,Ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,at,Ft.width,Ft.height,0,Ve,je,Ft.data)}}else{k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Ve,je,Re[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,at,Ve,je,Re[de]);for(let He=0;He<Le.length;He++){const Oe=Le[He];k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,0,0,Ve,je,Oe.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,He+1,at,Ve,je,Oe.image[de])}}}p(x)&&M(i.TEXTURE_CUBE_MAP),he.__version=ie.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Fe(R,x,W,$,ie,he){const ye=r.convert(W.format,W.colorSpace),ne=r.convert(W.type),ce=y(W.internalFormat,ye,ne,W.normalized,W.colorSpace),Te=n.get(x),We=n.get(W);if(We.__renderTarget=x,!Te.__hasExternalTextures){const Re=Math.max(1,x.width>>he),Ee=Math.max(1,x.height>>he);ie===i.TEXTURE_3D||ie===i.TEXTURE_2D_ARRAY?t.texImage3D(ie,he,ce,Re,Ee,x.depth,0,ye,ne,null):t.texImage2D(ie,he,ce,Re,Ee,0,ye,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),rt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,ie,We.__webglTexture,0,et(x)):(ie===i.TEXTURE_2D||ie>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,ie,We.__webglTexture,he),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(R,x,W){if(i.bindRenderbuffer(i.RENDERBUFFER,R),x.depthBuffer){const $=x.depthTexture,ie=$&&$.isDepthTexture?$.type:null,he=w(x.stencilBuffer,ie),ye=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;rt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(x),he,x.width,x.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(x),he,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,he,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,R)}else{const $=x.textures;for(let ie=0;ie<$.length;ie++){const he=$[ie],ye=r.convert(he.format,he.colorSpace),ne=r.convert(he.type),ce=y(he.internalFormat,ye,ne,he.normalized,he.colorSpace);rt(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(x),ce,x.width,x.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(x),ce,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ce,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Qe(R,x,W){const $=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ie=n.get(x.depthTexture);if(ie.__renderTarget=x,(!ie.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$){if(ie.__webglInit===void 0&&(ie.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),ie.__webglTexture===void 0){ie.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),Je(i.TEXTURE_CUBE_MAP,x.depthTexture);const Te=r.convert(x.depthTexture.format),We=r.convert(x.depthTexture.type);let Re;x.depthTexture.format===Ti?Re=i.DEPTH_COMPONENT24:x.depthTexture.format===es&&(Re=i.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,Re,x.width,x.height,0,Te,We,null)}}else z(x.depthTexture,0);const he=ie.__webglTexture,ye=et(x),ne=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,ce=x.depthTexture.format===es?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ti)rt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,ne,he,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,ce,ne,he,0);else if(x.depthTexture.format===es)rt(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,ne,he,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,ce,ne,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function fe(R){const x=n.get(R),W=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){const $=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const ie=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",ie)};$.addEventListener("dispose",ie),x.__depthDisposeCallback=ie}x.__boundDepthTexture=$}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(W)for(let $=0;$<6;$++)Qe(x.__webglFramebuffer[$],R,$);else{const $=R.texture.mipmaps;$&&$.length>0?Qe(x.__webglFramebuffer[0],R,0):Qe(x.__webglFramebuffer,R,0)}else if(W){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=i.createRenderbuffer(),xt(x.__webglDepthbuffer[$],R,!1);else{const ie=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=x.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,he)}}else{const $=R.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),xt(x.__webglDepthbuffer,R,!1);else{const ie=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,ie,i.RENDERBUFFER,he)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function me(R,x,W){const $=n.get(R);x!==void 0&&Fe($.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&fe(R)}function ge(R){const x=R.texture,W=n.get(R),$=n.get(x);R.addEventListener("dispose",v);const ie=R.textures,he=R.isWebGLCubeRenderTarget===!0,ye=ie.length>1;if(ye||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=x.version,a.memory.textures++),he){W.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0){W.__webglFramebuffer[ne]=[];for(let ce=0;ce<x.mipmaps.length;ce++)W.__webglFramebuffer[ne][ce]=i.createFramebuffer()}else W.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){W.__webglFramebuffer=[];for(let ne=0;ne<x.mipmaps.length;ne++)W.__webglFramebuffer[ne]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(ye)for(let ne=0,ce=ie.length;ne<ce;ne++){const Te=n.get(ie[ne]);Te.__webglTexture===void 0&&(Te.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&rt(R)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ne=0;ne<ie.length;ne++){const ce=ie[ne];W.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[ne]);const Te=r.convert(ce.format,ce.colorSpace),We=r.convert(ce.type),Re=y(ce.internalFormat,Te,We,ce.normalized,ce.colorSpace,R.isXRRenderTarget===!0),Ee=et(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,Re,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,W.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),xt(W.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(he){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Je(i.TEXTURE_CUBE_MAP,x);for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)Fe(W.__webglFramebuffer[ne][ce],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ce);else Fe(W.__webglFramebuffer[ne],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);p(x)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ne=0,ce=ie.length;ne<ce;ne++){const Te=ie[ne],We=n.get(Te);let Re=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Re=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Re,We.__webglTexture),Je(Re,Te),Fe(W.__webglFramebuffer,R,Te,i.COLOR_ATTACHMENT0+ne,Re,0),p(Te)&&M(Re)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ne=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,$.__webglTexture),Je(ne,x),x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)Fe(W.__webglFramebuffer[ce],R,x,i.COLOR_ATTACHMENT0,ne,ce);else Fe(W.__webglFramebuffer,R,x,i.COLOR_ATTACHMENT0,ne,0);p(x)&&M(ne),t.unbindTexture()}R.depthBuffer&&fe(R)}function Ae(R){const x=R.textures;for(let W=0,$=x.length;W<$;W++){const ie=x[W];if(p(ie)){const he=S(R),ye=n.get(ie).__webglTexture;t.bindTexture(he,ye),M(he),t.unbindTexture()}}}const Me=[],Ke=[];function ke(R){if(R.samples>0){if(rt(R)===!1){const x=R.textures,W=R.width,$=R.height;let ie=i.COLOR_BUFFER_BIT;const he=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(R),ne=x.length>1;if(ne)for(let Te=0;Te<x.length;Te++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const ce=R.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Te=0;Te<x.length;Te++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ie|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ie|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Te]);const We=n.get(x[Te]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,W,$,0,0,W,$,ie,i.NEAREST),o===!0&&(Me.length=0,Ke.length=0,Me.push(i.COLOR_ATTACHMENT0+Te),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Me.push(he),Ke.push(he),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let Te=0;Te<x.length;Te++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Te]);const We=n.get(x[Te]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Te,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&o){const x=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function et(R){return Math.min(s.maxSamples,R.samples)}function rt(R){const x=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function O(R){const x=a.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function At(R,x){const W=R.colorSpace,$=R.format,ie=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||W!==Ra&&W!==Oi&&(Tt.getTransfer(W)===Ut?($!==$n||ie!==Pn)&&it("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Mt("WebGLTextures: Unsupported texture color space:",W)),x}function gt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=j,this.getTextureUnits=J,this.setTextureUnits=B,this.setTexture2D=z,this.setTexture2DArray=q,this.setTexture3D=se,this.setTextureCube=oe,this.rebindTextures=me,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=Ae,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=rt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function F_(i,e){function t(n,s=Oi){let r;const a=Tt.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wh)return i.BYTE;if(n===Xh)return i.SHORT;if(n===Sr)return i.UNSIGNED_SHORT;if(n===Bl)return i.INT;if(n===ui)return i.UNSIGNED_INT;if(n===Zn)return i.FLOAT;if(n===wi)return i.HALF_FLOAT;if(n===Zh)return i.ALPHA;if(n===$h)return i.RGB;if(n===$n)return i.RGBA;if(n===Ti)return i.DEPTH_COMPONENT;if(n===es)return i.DEPTH_STENCIL;if(n===Vl)return i.RED;if(n===Hl)return i.RED_INTEGER;if(n===is)return i.RG;if(n===Gl)return i.RG_INTEGER;if(n===Wl)return i.RGBA_INTEGER;if(n===va||n===xa||n===ya||n===Ma)if(a===Ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===va)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===va)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ko||n===Jo||n===jo||n===Qo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ko)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===el||n===tl||n===nl||n===il||n===sl||n===wa||n===rl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===el||n===tl)return a===Ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===il)return r.COMPRESSED_R11_EAC;if(n===sl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wa)return r.COMPRESSED_RG11_EAC;if(n===rl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===_l||n===vl||n===xl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===al)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ol)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ll)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===cl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===hl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ul)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===dl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ml)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_l)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yl||n===Ml||n===Sl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===yl)return a===Ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ml)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bl||n===El||n===Ta||n===wl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===bl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===El)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===br?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const O_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,B_=`
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

}`;class z_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ou(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new fi({vertexShader:O_,fragmentShader:B_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new be(new Dn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k_ extends ki{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,h=null,u=null,f=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new z_,p={},M=t.getContextAttributes();let S=null,y=null;const w=[],E=[],C=new ee;let v=null;const T=new Cn;T.viewport=new $t;const I=new Cn;I.viewport=new $t;const U=[T,I],H=new qd;let j=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let ve=w[ae];return ve===void 0&&(ve=new io,w[ae]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(ae){let ve=w[ae];return ve===void 0&&(ve=new io,w[ae]=ve),ve.getGripSpace()},this.getHand=function(ae){let ve=w[ae];return ve===void 0&&(ve=new io,w[ae]=ve),ve.getHandSpace()};function B(ae){const ve=E.indexOf(ae.inputSource);if(ve===-1)return;const pe=w[ve];pe!==void 0&&(pe.update(ae.inputSource,ae.frame,l||a),pe.dispatchEvent({type:ae.type,data:ae.inputSource}))}function Z(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",X);for(let ae=0;ae<w.length;ae++){const ve=E[ae];ve!==null&&(E[ae]=null,w[ae].disconnect(ve))}j=null,J=null,m.reset();for(const ae in p)delete p[ae];e.setRenderTarget(S),d=null,f=null,u=null,s=null,y=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){r=ae,n.isPresenting===!0&&it("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){c=ae,n.isPresenting===!0&&it("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ae){l=ae},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ae){if(s=ae,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",X),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ce=null,Ge=null;M.depth&&(Ge=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=M.stencil?es:Ti,Ce=M.stencil?br:ui);const Fe={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Fe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new hi(f.textureWidth,f.textureHeight,{format:$n,type:Pn,depthTexture:new Hs(f.textureWidth,f.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const pe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new hi(d.framebufferWidth,d.framebufferHeight,{format:$n,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),Je.setContext(s),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(ae){for(let ve=0;ve<ae.removed.length;ve++){const pe=ae.removed[ve],Ce=E.indexOf(pe);Ce>=0&&(E[Ce]=null,w[Ce].disconnect(pe))}for(let ve=0;ve<ae.added.length;ve++){const pe=ae.added[ve];let Ce=E.indexOf(pe);if(Ce===-1){for(let Fe=0;Fe<w.length;Fe++)if(Fe>=E.length){E.push(pe),Ce=Fe;break}else if(E[Fe]===null){E[Fe]=pe,Ce=Fe;break}if(Ce===-1)break}const Ge=w[Ce];Ge&&Ge.connect(pe)}}const z=new N,q=new N;function se(ae,ve,pe){z.setFromMatrixPosition(ve.matrixWorld),q.setFromMatrixPosition(pe.matrixWorld);const Ce=z.distanceTo(q),Ge=ve.projectionMatrix.elements,Fe=pe.projectionMatrix.elements,xt=Ge[14]/(Ge[10]-1),Qe=Ge[14]/(Ge[10]+1),fe=(Ge[9]+1)/Ge[5],me=(Ge[9]-1)/Ge[5],ge=(Ge[8]-1)/Ge[0],Ae=(Fe[8]+1)/Fe[0],Me=xt*ge,Ke=xt*Ae,ke=Ce/(-ge+Ae),et=ke*-ge;if(ve.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(et),ae.translateZ(ke),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),Ge[10]===-1)ae.projectionMatrix.copy(ve.projectionMatrix),ae.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const rt=xt+ke,O=Qe+ke,At=Me-et,gt=Ke+(Ce-et),R=fe*Qe/O*rt,x=me*Qe/O*rt;ae.projectionMatrix.makePerspective(At,gt,R,x,rt,O),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function oe(ae,ve){ve===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(ve.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(s===null)return;let ve=ae.near,pe=ae.far;m.texture!==null&&(m.depthNear>0&&(ve=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),H.near=I.near=T.near=ve,H.far=I.far=T.far=pe,(j!==H.near||J!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),j=H.near,J=H.far),H.layers.mask=ae.layers.mask|6,T.layers.mask=H.layers.mask&-5,I.layers.mask=H.layers.mask&-3;const Ce=ae.parent,Ge=H.cameras;oe(H,Ce);for(let Fe=0;Fe<Ge.length;Fe++)oe(Ge[Fe],Ce);Ge.length===2?se(H,T,I):H.projectionMatrix.copy(T.projectionMatrix),_e(ae,H,Ce)};function _e(ae,ve,pe){pe===null?ae.matrix.copy(ve.matrixWorld):(ae.matrix.copy(pe.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(ve.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(ve.projectionMatrix),ae.projectionMatrixInverse.copy(ve.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Al*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(f===null&&d===null))return o},this.setFoveation=function(ae){o=ae,f!==null&&(f.fixedFoveation=ae),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ae)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(ae){return p[ae]};let Ze=null;function _t(ae,ve){if(h=ve.getViewerPose(l||a),g=ve,h!==null){const pe=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Ce=!1;pe.length!==H.cameras.length&&(H.cameras.length=0,Ce=!0);for(let Qe=0;Qe<pe.length;Qe++){const fe=pe[Qe];let me=null;if(d!==null)me=d.getViewport(fe);else{const Ae=u.getViewSubImage(f,fe);me=Ae.viewport,Qe===0&&(e.setRenderTargetTextures(y,Ae.colorTexture,Ae.depthStencilTexture),e.setRenderTarget(y))}let ge=U[Qe];ge===void 0&&(ge=new Cn,ge.layers.enable(Qe),ge.viewport=new $t,U[Qe]=ge),ge.matrix.fromArray(fe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(fe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(me.x,me.y,me.width,me.height),Qe===0&&(H.matrix.copy(ge.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Ce===!0&&H.cameras.push(ge)}const Ge=s.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const Qe=u.getDepthInformation(pe[0]);Qe&&Qe.isValid&&Qe.texture&&m.init(Qe,s.renderState)}if(Ge&&Ge.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let Qe=0;Qe<pe.length;Qe++){const fe=pe[Qe].camera;if(fe){let me=p[fe];me||(me=new ou,p[fe]=me);const ge=u.getCameraImage(fe);me.sourceTexture=ge}}}}for(let pe=0;pe<w.length;pe++){const Ce=E[pe],Ge=w[pe];Ce!==null&&Ge!==void 0&&Ge.update(Ce,ve,l||a)}Ze&&Ze(ae,ve),ve.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ve}),g=null}const Je=new bu;Je.setAnimationLoop(_t),this.setAnimationLoop=function(ae){Ze=ae},this.dispose=function(){}}}const V_=new Lt,Pu=new lt;Pu.set(-1,0,0,0,1,0,0,0,1);function H_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,vu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,S,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&c(m,p)):p.isPointsMaterial?o(m,p,M,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Mn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Mn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),S=M.envMap,y=M.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(V_.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Pu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function c(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,M,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function G_(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(y,w){const E=w.program;n.uniformBlockBinding(y,E)}function l(y,w){let E=s[y.id];E===void 0&&(m(y),E=h(y),s[y.id]=E,y.addEventListener("dispose",M));const C=w.program;n.updateUBOMapping(y,C);const v=e.render.frame;r[y.id]!==v&&(f(y),r[y.id]=v)}function h(y){const w=u();y.__bindingPointIndex=w;const E=i.createBuffer(),C=y.__size,v=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,E),E}function u(){for(let y=0;y<c;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const w=s[y.id],E=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let v=0,T=E.length;v<T;v++){const I=E[v];if(Array.isArray(I))for(let U=0,H=I.length;U<H;U++)d(I[U],v,U,C);else d(I,v,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,w,E,C){if(_(y,w,E,C)===!0){const v=y.__offset,T=y.value;if(Array.isArray(T)){let I=0;for(let U=0;U<T.length;U++){const H=T[U],j=p(H);g(H,y.__data,I),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(I+=j.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,y.__data)}}function g(y,w,E){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,E)}function _(y,w,E,C){const v=y.value,T=w+"_"+E;if(C[T]===void 0)return typeof v=="number"||typeof v=="boolean"?C[T]=v:ArrayBuffer.isView(v)?C[T]=v.slice():C[T]=v.clone(),!0;{const I=C[T];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return C[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function m(y){const w=y.uniforms;let E=0;const C=16;for(let T=0,I=w.length;T<I;T++){const U=Array.isArray(w[T])?w[T]:[w[T]];for(let H=0,j=U.length;H<j;H++){const J=U[H],B=Array.isArray(J.value)?J.value:[J.value];for(let Z=0,X=B.length;Z<X;Z++){const z=B[Z],q=p(z),se=E%C,oe=se%q.boundary,_e=se+oe;E+=oe,_e!==0&&C-_e<q.storage&&(E+=C-_e),J.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=E,E+=q.storage}}}const v=E%C;return v>0&&(E+=C-v),y.__size=E,y.__cache={},this}function p(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?it("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):it("WebGLRenderer: Unsupported uniform value type.",y),w}function M(y){const w=y.target;w.removeEventListener("dispose",M);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function S(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:o,update:l,dispose:S}}const W_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ni=null;function X_(){return ni===null&&(ni=new iu(W_,16,16,is,wi),ni.name="DFG_LUT",ni.minFilter=_n,ni.magFilter=_n,ni.wrapS=Mi,ni.wrapT=Mi,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class q_{constructor(e={}){const{canvas:t=Rf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Pn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=d,m=new Set([Wl,Gl,Hl]),p=new Set([Pn,ui,Sr,br,zl,kl]),M=new Uint32Array(4),S=new Int32Array(4),y=new N;let w=null,E=null;const C=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let U=!1,H=null,j=null,J=null,B=null;this._outputColorSpace=hn;let Z=0,X=0,z=null,q=-1,se=null;const oe=new $t,_e=new $t;let Ze=null;const _t=new ht(0);let Je=0,ae=t.width,ve=t.height,pe=1,Ce=null,Ge=null;const Fe=new $t(0,0,ae,ve),xt=new $t(0,0,ae,ve);let Qe=!1;const fe=new $l;let me=!1,ge=!1;const Ae=new Lt,Me=new N,Ke=new $t,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function rt(){return z===null?pe:1}let O=n;function At(b,G){return t.getContext(b,G)}try{const b={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ul}`),t.addEventListener("webglcontextlost",Ft,!1),t.addEventListener("webglcontextrestored",Pt,!1),t.addEventListener("webglcontextcreationerror",Ln,!1),O===null){const G="webgl2";if(O=At(G,b),O===null)throw At(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Mt("WebGLRenderer: "+b.message),b}let gt,R,x,W,$,ie,he,ye,ne,ce,Te,We,Re,Ee,Ve,je,at,k,Se,le,we,Le,de;function He(){gt=new Xm(O),gt.init(),we=new F_(O,gt),R=new Om(O,gt,e,we),x=new N_(O,gt),R.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),j=O.createFramebuffer(),J=O.createFramebuffer(),B=O.createFramebuffer(),W=new Zm(O),$=new y_,ie=new U_(O,gt,x,$,R,we,W),he=new Wm(I),ye=new jd(O),Le=new Um(O,ye),ne=new qm(O,ye,W,Le),ce=new Km(O,ne,ye,Le,W),k=new $m(O,R,ie),Ve=new Bm($),Te=new x_(I,he,gt,R,Le,Ve),We=new H_(I,$),Re=new S_,Ee=new R_(gt),at=new Nm(I,he,x,ce,g,o),je=new I_(I,ce,R),de=new G_(O,W,R,x),Se=new Fm(O,gt,W),le=new Ym(O,gt,W),W.programs=Te.programs,I.capabilities=R,I.extensions=gt,I.properties=$,I.renderLists=Re,I.shadowMap=je,I.state=x,I.info=W}He(),_!==Pn&&(T=new jm(_,t.width,t.height,c,s,r));const Oe=new k_(I,O);this.xr=Oe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=gt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=gt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(b){b!==void 0&&(pe=b,this.setSize(ae,ve,!1))},this.getSize=function(b){return b.set(ae,ve)},this.setSize=function(b,G,Q=!0){if(Oe.isPresenting){it("WebGLRenderer: Can't change size while VR device is presenting.");return}ae=b,ve=G,t.width=Math.floor(b*pe),t.height=Math.floor(G*pe),Q===!0&&(t.style.width=b+"px",t.style.height=G+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,G)},this.getDrawingBufferSize=function(b){return b.set(ae*pe,ve*pe).floor()},this.setDrawingBufferSize=function(b,G,Q){ae=b,ve=G,pe=Q,t.width=Math.floor(b*Q),t.height=Math.floor(G*Q),this.setViewport(0,0,b,G)},this.setEffects=function(b){if(_===Pn){Mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let G=0;G<b.length;G++)if(b[G].isOutputPass===!0){it("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(oe)},this.getViewport=function(b){return b.copy(Fe)},this.setViewport=function(b,G,Q,Y){b.isVector4?Fe.set(b.x,b.y,b.z,b.w):Fe.set(b,G,Q,Y),x.viewport(oe.copy(Fe).multiplyScalar(pe).round())},this.getScissor=function(b){return b.copy(xt)},this.setScissor=function(b,G,Q,Y){b.isVector4?xt.set(b.x,b.y,b.z,b.w):xt.set(b,G,Q,Y),x.scissor(_e.copy(xt).multiplyScalar(pe).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(b){x.setScissorTest(Qe=b)},this.setOpaqueSort=function(b){Ce=b},this.setTransparentSort=function(b){Ge=b},this.getClearColor=function(b){return b.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(b=!0,G=!0,Q=!0){let Y=0;if(b){let K=!1;if(z!==null){const Pe=z.texture.format;K=m.has(Pe)}if(K){const Pe=z.texture.type,Ne=p.has(Pe),De=at.getClearColor(),ze=at.getClearAlpha(),Xe=De.r,ot=De.g,ut=De.b;Ne?(M[0]=Xe,M[1]=ot,M[2]=ut,M[3]=ze,O.clearBufferuiv(O.COLOR,0,M)):(S[0]=Xe,S[1]=ot,S[2]=ut,S[3]=ze,O.clearBufferiv(O.COLOR,0,S))}else Y|=O.COLOR_BUFFER_BIT}G&&(Y|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(Y|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&O.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),H=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",Pt,!1),t.removeEventListener("webglcontextcreationerror",Ln,!1),at.dispose(),Re.dispose(),Ee.dispose(),$.dispose(),he.dispose(),ce.dispose(),Le.dispose(),de.dispose(),Te.dispose(),Oe.dispose(),Oe.removeEventListener("sessionstart",$s),Oe.removeEventListener("sessionend",Ks),kn.stop()};function Ft(b){b.preventDefault(),Da("WebGLRenderer: Context Lost."),U=!0}function Pt(){Da("WebGLRenderer: Context Restored."),U=!1;const b=W.autoReset,G=je.enabled,Q=je.autoUpdate,Y=je.needsUpdate,K=je.type;He(),W.autoReset=b,je.enabled=G,je.autoUpdate=Q,je.needsUpdate=Y,je.type=K}function Ln(b){Mt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function fn(b){const G=b.target;G.removeEventListener("dispose",fn),as(G)}function as(b){Dr(b),$.remove(b)}function Dr(b){const G=$.get(b).programs;G!==void 0&&(G.forEach(function(Q){Te.releaseProgram(Q)}),b.isShaderMaterial&&Te.releaseShaderCache(b))}this.renderBufferDirect=function(b,G,Q,Y,K,Pe){G===null&&(G=ke);const Ne=K.isMesh&&K.matrixWorld.determinantAffine()<0,De=Ur(b,G,Q,Y,K);x.setMaterial(Y,Ne);let ze=Q.index,Xe=1;if(Y.wireframe===!0){if(ze=ne.getWireframeAttribute(Q),ze===void 0)return;Xe=2}const ot=Q.drawRange,ut=Q.attributes.position;let qe=ot.start*Xe,Be=(ot.start+ot.count)*Xe;Pe!==null&&(qe=Math.max(qe,Pe.start*Xe),Be=Math.min(Be,(Pe.start+Pe.count)*Xe)),ze!==null?(qe=Math.max(qe,0),Be=Math.min(Be,ze.count)):ut!=null&&(qe=Math.max(qe,0),Be=Math.min(Be,ut.count));const Vt=Be-qe;if(Vt<0||Vt===1/0)return;Le.setup(K,Y,De,Q,ze);let Gt,Ct=Se;if(ze!==null&&(Gt=ye.get(ze),Ct=le,Ct.setIndex(Gt)),K.isMesh)Y.wireframe===!0?(x.setLineWidth(Y.wireframeLinewidth*rt()),Ct.setMode(O.LINES)):Ct.setMode(O.TRIANGLES);else if(K.isLine){let sn=Y.linewidth;sn===void 0&&(sn=1),x.setLineWidth(sn*rt()),K.isLineSegments?Ct.setMode(O.LINES):K.isLineLoop?Ct.setMode(O.LINE_LOOP):Ct.setMode(O.LINE_STRIP)}else K.isPoints?Ct.setMode(O.POINTS):K.isSprite&&Ct.setMode(O.TRIANGLES);if(K.isBatchedMesh)if(gt.get("WEBGL_multi_draw"))Ct.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const sn=K._multiDrawStarts,Ue=K._multiDrawCounts,dn=K._multiDrawCount,bt=ze?ye.get(ze).bytesPerElement:1,pn=$.get(Y).currentProgram.getUniforms();for(let bn=0;bn<dn;bn++)pn.setValue(O,"_gl_DrawID",bn),Ct.render(sn[bn]/bt,Ue[bn])}else if(K.isInstancedMesh)Ct.renderInstances(qe,Vt,K.count);else if(Q.isInstancedBufferGeometry){const sn=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Ue=Math.min(Q.instanceCount,sn);Ct.renderInstances(qe,Vt,Ue)}else Ct.render(qe,Vt)};function Jn(b,G,Q){b.transparent===!0&&b.side===Jt&&b.forceSinglePass===!1?(b.side=Mn,b.needsUpdate=!0,ls(b,G,Q),b.side=zi,b.needsUpdate=!0,ls(b,G,Q),b.side=Jt):ls(b,G,Q)}this.compile=function(b,G,Q=null){Q===null&&(Q=b),E=Ee.get(Q),E.init(G),v.push(E),Q.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),b!==Q&&b.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),E.setupLights();const Y=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Pe=K.material;if(Pe)if(Array.isArray(Pe))for(let Ne=0;Ne<Pe.length;Ne++){const De=Pe[Ne];Jn(De,Q,K),Y.add(De)}else Jn(Pe,Q,K),Y.add(Pe)}),E=v.pop(),Y},this.compileAsync=function(b,G,Q=null){const Y=this.compile(b,G,Q);return new Promise(K=>{function Pe(){if(Y.forEach(function(Ne){$.get(Ne).currentProgram.isReady()&&Y.delete(Ne)}),Y.size===0){K(b);return}setTimeout(Pe,10)}gt.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let Hi=null;function Zs(b){Hi&&Hi(b)}function $s(){kn.stop()}function Ks(){kn.start()}const kn=new bu;kn.setAnimationLoop(Zs),typeof self<"u"&&kn.setContext(self),this.setAnimationLoop=function(b){Hi=b,Oe.setAnimationLoop(b),b===null?kn.stop():kn.start()},Oe.addEventListener("sessionstart",$s),Oe.addEventListener("sessionend",Ks),this.render=function(b,G){if(G!==void 0&&G.isCamera!==!0){Mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;H!==null&&H.renderStart(b,G);const Q=Oe.enabled===!0&&Oe.isPresenting===!0,Y=T!==null&&(z===null||Q)&&T.begin(I,z);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Oe.enabled===!0&&Oe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Oe.cameraAutoUpdate===!0&&Oe.updateCamera(G),G=Oe.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,G,z),E=Ee.get(b,v.length),E.init(G),E.state.textureUnits=ie.getTextureUnits(),v.push(E),Ae.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),fe.setFromProjectionMatrix(Ae,oi,G.reversedDepth),ge=this.localClippingEnabled,me=Ve.init(this.clippingPlanes,ge),w=Re.get(b,C.length),w.init(),C.push(w),Oe.enabled===!0&&Oe.isPresenting===!0){const Ne=I.xr.getDepthSensingMesh();Ne!==null&&Gi(Ne,G,-1/0,I.sortObjects)}Gi(b,G,0,I.sortObjects),w.finish(),I.sortObjects===!0&&w.sort(Ce,Ge,G.reversedDepth),et=Oe.enabled===!1||Oe.isPresenting===!1||Oe.hasDepthSensing()===!1,et&&at.addToRenderList(w,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),me===!0&&Ve.beginShadows();const K=E.state.shadowsArray;if(je.render(K,b,G),me===!0&&Ve.endShadows(),(Y&&T.hasRenderPass())===!1){const Ne=w.opaque,De=w.transmissive;if(E.setupLights(),G.isArrayCamera){const ze=G.cameras;if(De.length>0)for(let Xe=0,ot=ze.length;Xe<ot;Xe++){const ut=ze[Xe];Js(Ne,De,b,ut)}et&&at.render(b);for(let Xe=0,ot=ze.length;Xe<ot;Xe++){const ut=ze[Xe];Lr(w,b,ut,ut.viewport)}}else De.length>0&&Js(Ne,De,b,G),et&&at.render(b),Lr(w,b,G)}z!==null&&X===0&&(ie.updateMultisampleRenderTarget(z),ie.updateRenderTargetMipmap(z)),Y&&T.end(I),b.isScene===!0&&b.onAfterRender(I,b,G),Le.resetDefaultState(),q=-1,se=null,v.pop(),v.length>0?(E=v[v.length-1],ie.setTextureUnits(E.state.textureUnits),me===!0&&Ve.setGlobalState(I.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,H!==null&&H.renderEnd()};function Gi(b,G,Q,Y){if(b.visible===!1)return;if(b.layers.test(G.layers)){if(b.isGroup)Q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(G);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||fe.intersectsSprite(b)){Y&&Ke.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ae);const Ne=ce.update(b),De=b.material;De.visible&&w.push(b,Ne,De,Q,Ke.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||fe.intersectsObject(b))){const Ne=ce.update(b),De=b.material;if(Y&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ke.copy(b.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Ke.copy(Ne.boundingSphere.center)),Ke.applyMatrix4(b.matrixWorld).applyMatrix4(Ae)),Array.isArray(De)){const ze=Ne.groups;for(let Xe=0,ot=ze.length;Xe<ot;Xe++){const ut=ze[Xe],qe=De[ut.materialIndex];qe&&qe.visible&&w.push(b,Ne,qe,Q,Ke.z,ut)}}else De.visible&&w.push(b,Ne,De,Q,Ke.z,null)}}const Pe=b.children;for(let Ne=0,De=Pe.length;Ne<De;Ne++)Gi(Pe[Ne],G,Q,Y)}function Lr(b,G,Q,Y){const{opaque:K,transmissive:Pe,transparent:Ne}=b;E.setupLightsView(Q),me===!0&&Ve.setGlobalState(I.clippingPlanes,Q),Y&&x.viewport(oe.copy(Y)),K.length>0&&os(K,G,Q),Pe.length>0&&os(Pe,G,Q),Ne.length>0&&os(Ne,G,Q),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Js(b,G,Q,Y){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[Y.id]===void 0){const qe=gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[Y.id]=new hi(1,1,{generateMipmaps:!0,type:qe?wi:Pn,minFilter:Qi,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace})}const Pe=E.state.transmissionRenderTarget[Y.id],Ne=Y.viewport||oe;Pe.setSize(Ne.z*I.transmissionResolutionScale,Ne.w*I.transmissionResolutionScale);const De=I.getRenderTarget(),ze=I.getActiveCubeFace(),Xe=I.getActiveMipmapLevel();I.setRenderTarget(Pe),I.getClearColor(_t),Je=I.getClearAlpha(),Je<1&&I.setClearColor(16777215,.5),I.clear(),et&&at.render(Q);const ot=I.toneMapping;I.toneMapping=li;const ut=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),E.setupLightsView(Y),me===!0&&Ve.setGlobalState(I.clippingPlanes,Y),os(b,Q,Y),ie.updateMultisampleRenderTarget(Pe),ie.updateRenderTargetMipmap(Pe),gt.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Be=0,Vt=G.length;Be<Vt;Be++){const Gt=G[Be],{object:Ct,geometry:sn,material:Ue,group:dn}=Gt;if(Ue.side===Jt&&Ct.layers.test(Y.layers)){const bt=Ue.side;Ue.side=Mn,Ue.needsUpdate=!0,Wi(Ct,Q,Y,sn,Ue,dn),Ue.side=bt,Ue.needsUpdate=!0,qe=!0}}qe===!0&&(ie.updateMultisampleRenderTarget(Pe),ie.updateRenderTargetMipmap(Pe))}I.setRenderTarget(De,ze,Xe),I.setClearColor(_t,Je),ut!==void 0&&(Y.viewport=ut),I.toneMapping=ot}function os(b,G,Q){const Y=G.isScene===!0?G.overrideMaterial:null;for(let K=0,Pe=b.length;K<Pe;K++){const Ne=b[K],{object:De,geometry:ze,group:Xe}=Ne;let ot=Ne.material;ot.allowOverride===!0&&Y!==null&&(ot=Y),De.layers.test(Q.layers)&&Wi(De,G,Q,ze,ot,Xe)}}function Wi(b,G,Q,Y,K,Pe){b.onBeforeRender(I,G,Q,Y,K,Pe),b.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(I,G,Q,Y,b,Pe),K.transparent===!0&&K.side===Jt&&K.forceSinglePass===!1?(K.side=Mn,K.needsUpdate=!0,I.renderBufferDirect(Q,G,Y,K,b,Pe),K.side=zi,K.needsUpdate=!0,I.renderBufferDirect(Q,G,Y,K,b,Pe),K.side=Jt):I.renderBufferDirect(Q,G,Y,K,b,Pe),b.onAfterRender(I,G,Q,Y,K,Pe)}function ls(b,G,Q){G.isScene!==!0&&(G=ke);const Y=$.get(b),K=E.state.lights,Pe=E.state.shadowsArray,Ne=K.state.version,De=Te.getParameters(b,K.state,Pe,G,Q,E.state.lightProbeGridArray),ze=Te.getProgramCacheKey(De);let Xe=Y.programs;Y.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?G.environment:null,Y.fog=G.fog;const ot=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;Y.envMap=he.get(b.envMap||Y.environment,ot),Y.envMapRotation=Y.environment!==null&&b.envMap===null?G.environmentRotation:b.envMapRotation,Xe===void 0&&(b.addEventListener("dispose",fn),Xe=new Map,Y.programs=Xe);let ut=Xe.get(ze);if(ut!==void 0){if(Y.currentProgram===ut&&Y.lightsStateVersion===Ne)return Nr(b,De),ut}else De.uniforms=Te.getUniforms(b),H!==null&&b.isNodeMaterial&&H.build(b,Q,De),b.onBeforeCompile(De,I),ut=Te.acquireProgram(De,ze),Xe.set(ze,ut),Y.uniforms=De.uniforms;const qe=Y.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(qe.clippingPlanes=Ve.uniform),Nr(b,De),Y.needsLights=qa(b),Y.lightsStateVersion=Ne,Y.needsLights&&(qe.ambientLightColor.value=K.state.ambient,qe.lightProbe.value=K.state.probe,qe.directionalLights.value=K.state.directional,qe.directionalLightShadows.value=K.state.directionalShadow,qe.spotLights.value=K.state.spot,qe.spotLightShadows.value=K.state.spotShadow,qe.rectAreaLights.value=K.state.rectArea,qe.ltc_1.value=K.state.rectAreaLTC1,qe.ltc_2.value=K.state.rectAreaLTC2,qe.pointLights.value=K.state.point,qe.pointLightShadows.value=K.state.pointShadow,qe.hemisphereLights.value=K.state.hemi,qe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,qe.spotLightMatrix.value=K.state.spotLightMatrix,qe.spotLightMap.value=K.state.spotLightMap,qe.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.lightProbeGrid=E.state.lightProbeGridArray.length>0,Y.currentProgram=ut,Y.uniformsList=null,ut}function Ir(b){if(b.uniformsList===null){const G=b.currentProgram.getUniforms();b.uniformsList=ba.seqWithValue(G.seq,b.uniforms)}return b.uniformsList}function Nr(b,G){const Q=$.get(b);Q.outputColorSpace=G.outputColorSpace,Q.batching=G.batching,Q.batchingColor=G.batchingColor,Q.instancing=G.instancing,Q.instancingColor=G.instancingColor,Q.instancingMorph=G.instancingMorph,Q.skinning=G.skinning,Q.morphTargets=G.morphTargets,Q.morphNormals=G.morphNormals,Q.morphColors=G.morphColors,Q.morphTargetsCount=G.morphTargetsCount,Q.numClippingPlanes=G.numClippingPlanes,Q.numIntersection=G.numClipIntersection,Q.vertexAlphas=G.vertexAlphas,Q.vertexTangents=G.vertexTangents,Q.toneMapping=G.toneMapping}function Vn(b,G){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(G.matrixWorld);for(let Q=0,Y=b.length;Q<Y;Q++){const K=b[Q];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function Ur(b,G,Q,Y,K){G.isScene!==!0&&(G=ke),ie.resetTextureUnits();const Pe=G.fog,Ne=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?G.environment:null,De=z===null?I.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Tt.workingColorSpace,ze=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Xe=he.get(Y.envMap||Ne,ze),ot=Y.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,ut=!!Q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),qe=!!Q.morphAttributes.position,Be=!!Q.morphAttributes.normal,Vt=!!Q.morphAttributes.color;let Gt=li;Y.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Gt=I.toneMapping);const Ct=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,sn=Ct!==void 0?Ct.length:0,Ue=$.get(Y),dn=E.state.lights;if(me===!0&&(ge===!0||b!==se)){const Ot=b===se&&Y.id===q;Ve.setState(Y,b,Ot)}let bt=!1;Y.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==dn.state.version||Ue.outputColorSpace!==De||K.isBatchedMesh&&Ue.batching===!1||!K.isBatchedMesh&&Ue.batching===!0||K.isBatchedMesh&&Ue.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ue.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ue.instancing===!1||!K.isInstancedMesh&&Ue.instancing===!0||K.isSkinnedMesh&&Ue.skinning===!1||!K.isSkinnedMesh&&Ue.skinning===!0||K.isInstancedMesh&&Ue.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ue.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ue.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ue.instancingMorph===!1&&K.morphTexture!==null||Ue.envMap!==Xe||Y.fog===!0&&Ue.fog!==Pe||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==Ve.numPlanes||Ue.numIntersection!==Ve.numIntersection)||Ue.vertexAlphas!==ot||Ue.vertexTangents!==ut||Ue.morphTargets!==qe||Ue.morphNormals!==Be||Ue.morphColors!==Vt||Ue.toneMapping!==Gt||Ue.morphTargetsCount!==sn||!!Ue.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,Ue.__version=Y.version);let pn=Ue.currentProgram;bt===!0&&(pn=ls(Y,G,K),H&&Y.isNodeMaterial&&H.onUpdateProgram(Y,pn,Ue));let bn=!1,jn=!1,En=!1;const Dt=pn.getUniforms(),Xt=Ue.uniforms;if(x.useProgram(pn.program)&&(bn=!0,jn=!0,En=!0),Y.id!==q&&(q=Y.id,jn=!0),Ue.needsLights){const Ot=Vn(E.state.lightProbeGridArray,K);Ue.lightProbeGrid!==Ot&&(Ue.lightProbeGrid=Ot,jn=!0)}if(bn||se!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Dt.setValue(O,"projectionMatrix",b.projectionMatrix),Dt.setValue(O,"viewMatrix",b.matrixWorldInverse);const Hn=Dt.map.cameraPosition;Hn!==void 0&&Hn.setValue(O,Me.setFromMatrixPosition(b.matrixWorld)),R.logarithmicDepthBuffer&&Dt.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Dt.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),se!==b&&(se=b,jn=!0,En=!0)}if(Ue.needsLights&&(dn.state.directionalShadowMap.length>0&&Dt.setValue(O,"directionalShadowMap",dn.state.directionalShadowMap,ie),dn.state.spotShadowMap.length>0&&Dt.setValue(O,"spotShadowMap",dn.state.spotShadowMap,ie),dn.state.pointShadowMap.length>0&&Dt.setValue(O,"pointShadowMap",dn.state.pointShadowMap,ie)),K.isSkinnedMesh){Dt.setOptional(O,K,"bindMatrix"),Dt.setOptional(O,K,"bindMatrixInverse");const Ot=K.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Dt.setValue(O,"boneTexture",Ot.boneTexture,ie))}K.isBatchedMesh&&(Dt.setOptional(O,K,"batchingTexture"),Dt.setValue(O,"batchingTexture",K._matricesTexture,ie),Dt.setOptional(O,K,"batchingIdTexture"),Dt.setValue(O,"batchingIdTexture",K._indirectTexture,ie),Dt.setOptional(O,K,"batchingColorTexture"),K._colorsTexture!==null&&Dt.setValue(O,"batchingColorTexture",K._colorsTexture,ie));const Qn=Q.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&k.update(K,Q,pn),(jn||Ue.receiveShadow!==K.receiveShadow)&&(Ue.receiveShadow=K.receiveShadow,Dt.setValue(O,"receiveShadow",K.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&G.environment!==null&&(Xt.envMapIntensity.value=G.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=X_()),jn){if(Dt.setValue(O,"toneMappingExposure",I.toneMappingExposure),Ue.needsLights&&Xa(Xt,En),Pe&&Y.fog===!0&&We.refreshFogUniforms(Xt,Pe),We.refreshMaterialUniforms(Xt,Y,pe,ve,E.state.transmissionRenderTarget[b.id]),Ue.needsLights&&Ue.lightProbeGrid){const Ot=Ue.lightProbeGrid;Xt.probesSH.value=Ot.texture,Xt.probesMin.value.copy(Ot.boundingBox.min),Xt.probesMax.value.copy(Ot.boundingBox.max),Xt.probesResolution.value.copy(Ot.resolution)}ba.upload(O,Ir(Ue),Xt,ie)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(ba.upload(O,Ir(Ue),Xt,ie),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Dt.setValue(O,"center",K.center),Dt.setValue(O,"modelViewMatrix",K.modelViewMatrix),Dt.setValue(O,"normalMatrix",K.normalMatrix),Dt.setValue(O,"modelMatrix",K.matrixWorld),Y.uniformsGroups!==void 0){const Ot=Y.uniformsGroups;for(let Hn=0,di=Ot.length;Hn<di;Hn++){const Fr=Ot[Hn];de.update(Fr,pn),de.bind(Fr,pn)}}return pn}function Xa(b,G){b.ambientLightColor.needsUpdate=G,b.lightProbe.needsUpdate=G,b.directionalLights.needsUpdate=G,b.directionalLightShadows.needsUpdate=G,b.pointLights.needsUpdate=G,b.pointLightShadows.needsUpdate=G,b.spotLights.needsUpdate=G,b.spotLightShadows.needsUpdate=G,b.rectAreaLights.needsUpdate=G,b.hemisphereLights.needsUpdate=G}function qa(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(b,G,Q){const Y=$.get(b);Y.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),$.get(b.texture).__webglTexture=G,$.get(b.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:Q,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,G){const Q=$.get(b);Q.__webglFramebuffer=G,Q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(b,G=0,Q=0){z=b,Z=G,X=Q;let Y=null,K=!1,Pe=!1;if(b){const De=$.get(b);if(De.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(O.FRAMEBUFFER,De.__webglFramebuffer),oe.copy(b.viewport),_e.copy(b.scissor),Ze=b.scissorTest,x.viewport(oe),x.scissor(_e),x.setScissorTest(Ze),q=-1;return}else if(De.__webglFramebuffer===void 0)ie.setupRenderTarget(b);else if(De.__hasExternalTextures)ie.rebindTextures(b,$.get(b.texture).__webglTexture,$.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ot=b.depthTexture;if(De.__boundDepthTexture!==ot){if(ot!==null&&$.has(ot)&&(b.width!==ot.image.width||b.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(b)}}const ze=b.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(Pe=!0);const Xe=$.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Xe[G])?Y=Xe[G][Q]:Y=Xe[G],K=!0):b.samples>0&&ie.useMultisampledRTT(b)===!1?Y=$.get(b).__webglMultisampledFramebuffer:Array.isArray(Xe)?Y=Xe[Q]:Y=Xe,oe.copy(b.viewport),_e.copy(b.scissor),Ze=b.scissorTest}else oe.copy(Fe).multiplyScalar(pe).floor(),_e.copy(xt).multiplyScalar(pe).floor(),Ze=Qe;if(Q!==0&&(Y=j),x.bindFramebuffer(O.FRAMEBUFFER,Y)&&x.drawBuffers(b,Y),x.viewport(oe),x.scissor(_e),x.setScissorTest(Ze),K){const De=$.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+G,De.__webglTexture,Q)}else if(Pe){const De=G;for(let ze=0;ze<b.textures.length;ze++){const Xe=$.get(b.textures[ze]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+ze,Xe.__webglTexture,Q,De)}}else if(b!==null&&Q!==0){const De=$.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,De.__webglTexture,Q)}q=-1},this.readRenderTargetPixels=function(b,G,Q,Y,K,Pe,Ne,De=0){if(!(b&&b.isWebGLRenderTarget)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ne!==void 0&&(ze=ze[Ne]),ze){x.bindFramebuffer(O.FRAMEBUFFER,ze);try{const Xe=b.textures[De],ot=Xe.format,ut=Xe.type;if(b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+De),!R.textureFormatReadable(ot)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(ut)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=b.width-Y&&Q>=0&&Q<=b.height-K&&O.readPixels(G,Q,Y,K,we.convert(ot),we.convert(ut),Pe)}finally{const Xe=z!==null?$.get(z).__webglFramebuffer:null;x.bindFramebuffer(O.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(b,G,Q,Y,K,Pe,Ne,De=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ne!==void 0&&(ze=ze[Ne]),ze)if(G>=0&&G<=b.width-Y&&Q>=0&&Q<=b.height-K){x.bindFramebuffer(O.FRAMEBUFFER,ze);const Xe=b.textures[De],ot=Xe.format,ut=Xe.type;if(b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+De),!R.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,qe),O.bufferData(O.PIXEL_PACK_BUFFER,Pe.byteLength,O.STREAM_READ),O.readPixels(G,Q,Y,K,we.convert(ot),we.convert(ut),0);const Be=z!==null?$.get(z).__webglFramebuffer:null;x.bindFramebuffer(O.FRAMEBUFFER,Be);const Vt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Cf(O,Vt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,qe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Pe),O.deleteBuffer(qe),O.deleteSync(Vt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,G=null,Q=0){const Y=Math.pow(2,-Q),K=Math.floor(b.image.width*Y),Pe=Math.floor(b.image.height*Y),Ne=G!==null?G.x:0,De=G!==null?G.y:0;ie.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,Q,0,0,Ne,De,K,Pe),x.unbindTexture()},this.copyTextureToTexture=function(b,G,Q=null,Y=null,K=0,Pe=0){let Ne,De,ze,Xe,ot,ut,qe,Be,Vt;const Gt=b.isCompressedTexture?b.mipmaps[Pe]:b.image;if(Q!==null)Ne=Q.max.x-Q.min.x,De=Q.max.y-Q.min.y,ze=Q.isBox3?Q.max.z-Q.min.z:1,Xe=Q.min.x,ot=Q.min.y,ut=Q.isBox3?Q.min.z:0;else{const Xt=Math.pow(2,-K);Ne=Math.floor(Gt.width*Xt),De=Math.floor(Gt.height*Xt),b.isDataArrayTexture?ze=Gt.depth:b.isData3DTexture?ze=Math.floor(Gt.depth*Xt):ze=1,Xe=0,ot=0,ut=0}Y!==null?(qe=Y.x,Be=Y.y,Vt=Y.z):(qe=0,Be=0,Vt=0);const Ct=we.convert(G.format),sn=we.convert(G.type);let Ue;G.isData3DTexture?(ie.setTexture3D(G,0),Ue=O.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(ie.setTexture2DArray(G,0),Ue=O.TEXTURE_2D_ARRAY):(ie.setTexture2D(G,0),Ue=O.TEXTURE_2D),x.activeTexture(O.TEXTURE0),x.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),x.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),x.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment);const dn=x.getParameter(O.UNPACK_ROW_LENGTH),bt=x.getParameter(O.UNPACK_IMAGE_HEIGHT),pn=x.getParameter(O.UNPACK_SKIP_PIXELS),bn=x.getParameter(O.UNPACK_SKIP_ROWS),jn=x.getParameter(O.UNPACK_SKIP_IMAGES);x.pixelStorei(O.UNPACK_ROW_LENGTH,Gt.width),x.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Gt.height),x.pixelStorei(O.UNPACK_SKIP_PIXELS,Xe),x.pixelStorei(O.UNPACK_SKIP_ROWS,ot),x.pixelStorei(O.UNPACK_SKIP_IMAGES,ut);const En=b.isDataArrayTexture||b.isData3DTexture,Dt=G.isDataArrayTexture||G.isData3DTexture;if(b.isDepthTexture){const Xt=$.get(b),Qn=$.get(G),Ot=$.get(Xt.__renderTarget),Hn=$.get(Qn.__renderTarget);x.bindFramebuffer(O.READ_FRAMEBUFFER,Ot.__webglFramebuffer),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let di=0;di<ze;di++)En&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,$.get(b).__webglTexture,K,ut+di),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,$.get(G).__webglTexture,Pe,Vt+di)),O.blitFramebuffer(Xe,ot,Ne,De,qe,Be,Ne,De,O.DEPTH_BUFFER_BIT,O.NEAREST);x.bindFramebuffer(O.READ_FRAMEBUFFER,null),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||$.has(b)){const Xt=$.get(b),Qn=$.get(G);x.bindFramebuffer(O.READ_FRAMEBUFFER,J),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,B);for(let Ot=0;Ot<ze;Ot++)En?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Xt.__webglTexture,K,ut+Ot):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Xt.__webglTexture,K),Dt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Qn.__webglTexture,Pe,Vt+Ot):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Qn.__webglTexture,Pe),K!==0?O.blitFramebuffer(Xe,ot,Ne,De,qe,Be,Ne,De,O.COLOR_BUFFER_BIT,O.NEAREST):Dt?O.copyTexSubImage3D(Ue,Pe,qe,Be,Vt+Ot,Xe,ot,Ne,De):O.copyTexSubImage2D(Ue,Pe,qe,Be,Xe,ot,Ne,De);x.bindFramebuffer(O.READ_FRAMEBUFFER,null),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Dt?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Ue,Pe,qe,Be,Vt,Ne,De,ze,Ct,sn,Gt.data):G.isCompressedArrayTexture?O.compressedTexSubImage3D(Ue,Pe,qe,Be,Vt,Ne,De,ze,Ct,Gt.data):O.texSubImage3D(Ue,Pe,qe,Be,Vt,Ne,De,ze,Ct,sn,Gt):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Pe,qe,Be,Ne,De,Ct,sn,Gt.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Pe,qe,Be,Gt.width,Gt.height,Ct,Gt.data):O.texSubImage2D(O.TEXTURE_2D,Pe,qe,Be,Ne,De,Ct,sn,Gt);x.pixelStorei(O.UNPACK_ROW_LENGTH,dn),x.pixelStorei(O.UNPACK_IMAGE_HEIGHT,bt),x.pixelStorei(O.UNPACK_SKIP_PIXELS,pn),x.pixelStorei(O.UNPACK_SKIP_ROWS,bn),x.pixelStorei(O.UNPACK_SKIP_IMAGES,jn),Pe===0&&G.generateMipmaps&&O.generateMipmap(Ue),x.unbindTexture()},this.initRenderTarget=function(b){$.get(b).__webglFramebuffer===void 0&&ie.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ie.setTextureCube(b,0):b.isData3DTexture?ie.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ie.setTexture2DArray(b,0):ie.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){Z=0,X=0,z=null,x.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}}const fr=new N;function Nn(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;fr.copy(e),fr[n]=0,fr.normalize();const l=.5*a/(a+c),h=1-fr.angleTo(i)/o;return Math.sign(fr[t])===1?h*l:c/(a+c)+l+l*(1-h)}class Pr extends wt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new N,l=new N,h=new N(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,g=u.length/6,_=new N,m=.5/a;for(let p=0,M=0;p<u.length;p+=3,M+=2)switch(o.fromArray(u,p),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(o.x)+l.x*r,u[p+1]=h.y*Math.sign(o.y)+l.y*r,u[p+2]=h.z*Math.sign(o.z)+l.z*r,f[p+0]=l.x,f[p+1]=l.y,f[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),d[M+0]=Nn(_,l,"z","y",r,n),d[M+1]=1-Nn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),d[M+0]=1-Nn(_,l,"z","y",r,n),d[M+1]=1-Nn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),d[M+0]=1-Nn(_,l,"x","z",r,e),d[M+1]=Nn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),d[M+0]=1-Nn(_,l,"x","z",r,e),d[M+1]=1-Nn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),d[M+0]=1-Nn(_,l,"x","y",r,e),d[M+1]=1-Nn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),d[M+0]=Nn(_,l,"x","y",r,e),d[M+1]=1-Nn(_,l,"y","x",r,t);break}}static fromJSON(e){return new Pr(e.width,e.height,e.depth,e.segments,e.radius)}}const Rh={type:"change"},ic={type:"start"},Du={type:"end"},ma=new ka,Ch=new yi,Y_=Math.cos(70*Lf.DEG2RAD),rn=new N,Sn=2*Math.PI,kt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Io=1e-6;class Z_ extends Kd{constructor(e,t=null){super(e,t),this.state=kt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Us.ROTATE,MIDDLE:Us.DOLLY,RIGHT:Us.PAN},this.touches={ONE:Ls.ROTATE,TWO:Ls.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Ai,this._lastTargetPosition=new N,this._quat=new Ai().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ih,this._sphericalDelta=new ih,this._scale=1,this._panOffset=new N,this._rotateStart=new ee,this._rotateEnd=new ee,this._rotateDelta=new ee,this._panStart=new ee,this._panEnd=new ee,this._panDelta=new ee,this._dollyStart=new ee,this._dollyEnd=new ee,this._dollyDelta=new ee,this._dollyDirection=new N,this._mouse=new ee,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=K_.bind(this),this._onPointerDown=$_.bind(this),this._onPointerUp=J_.bind(this),this._onContextMenu=sv.bind(this),this._onMouseWheel=ev.bind(this),this._onKeyDown=tv.bind(this),this._onTouchStart=nv.bind(this),this._onTouchMove=iv.bind(this),this._onMouseDown=j_.bind(this),this._onMouseMove=Q_.bind(this),this._interceptControlDown=rv.bind(this),this._interceptControlUp=av.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rh),this.update(),this.state=kt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;rn.copy(t).sub(this.target),rn.applyQuaternion(this._quat),this._spherical.setFromVector3(rn),this.autoRotate&&this.state===kt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Sn:n>Math.PI&&(n-=Sn),s<-Math.PI?s+=Sn:s>Math.PI&&(s-=Sn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(rn.setFromSpherical(this._spherical),rn.applyQuaternion(this._quatInverse),t.copy(this.target).add(rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=rn.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ma.origin.copy(this.object.position),ma.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ma.direction))<Y_?this.object.lookAt(this.target):(Ch.setFromNormalAndCoplanarPoint(this.object.up,this.target),ma.intersectPlane(Ch,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Io||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Io||this._lastTargetPosition.distanceToSquared(this.target)>Io?(this.dispatchEvent(Rh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){rn.setFromMatrixColumn(t,0),rn.multiplyScalar(-e),this._panOffset.add(rn)}_panUp(e,t){this.screenSpacePanning===!0?rn.setFromMatrixColumn(t,1):(rn.setFromMatrixColumn(t,0),rn.crossVectors(this.object.up,rn)),rn.multiplyScalar(e),this._panOffset.add(rn)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;rn.copy(s).sub(this.target);let r=rn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ee,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function $_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function K_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function J_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Du),this.state=kt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function j_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=kt.DOLLY;break;case Us.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=kt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=kt.ROTATE}break;case Us.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=kt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=kt.PAN}break;default:this.state=kt.NONE}this.state!==kt.NONE&&this.dispatchEvent(ic)}function Q_(i){switch(this.state){case kt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case kt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case kt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ev(i){this.enabled===!1||this.enableZoom===!1||this.state!==kt.NONE||(i.preventDefault(),this.dispatchEvent(ic),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Du))}function tv(i){this.enabled!==!1&&this._handleKeyDown(i)}function nv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ls.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=kt.TOUCH_ROTATE;break;case Ls.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=kt.TOUCH_PAN;break;default:this.state=kt.NONE}break;case 2:switch(this.touches.TWO){case Ls.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=kt.TOUCH_DOLLY_PAN;break;case Ls.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=kt.TOUCH_DOLLY_ROTATE;break;default:this.state=kt.NONE}break;default:this.state=kt.NONE}this.state!==kt.NONE&&this.dispatchEvent(ic)}function iv(i){switch(this._trackPointer(i),this.state){case kt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case kt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case kt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case kt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=kt.NONE}}function sv(i){this.enabled!==!1&&i.preventDefault()}function rv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function av(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class ov extends Qh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new wt;e.deleteAttribute("uv");const t=new ue({side:Mn}),n=new ue,s=new Su(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new be(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new su(e,n,6),c=new tn;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new be(e,Ds(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new be(e,Ds(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new be(e,Ds(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new be(e,Ds(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const f=new be(e,Ds(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const d=new be(e,Ds(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Ds(i){return new kd({color:0,emissive:16777215,emissiveIntensity:i})}const lv=1.8,Fn=.75,Yn=.9;function cv(i,e={}){const t=new q_({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=vr,t.outputColorSpace=hn,t.toneMapping=Ol,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new Qh;r.background=new ht(n?12377333:14672872),r.fog=n?new xr(12377333,60*s,160*s):new xr(14672872,4*s,9*s);const a=new Dl(t),c=a.fromScene(new ov,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new Cn(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new N(...e.cameraPosition??[0,.5,1.45]),h=new N(...e.target??[0,.3,0]);o.position.copy(l);const u=new Z_(o,t.domElement);u.target.copy(h),u.enableDamping=!0,u.dampingFactor=.08,u.enablePan=!1,u.minDistance=e.minDistance??.5,u.maxDistance=e.maxDistance??3,u.maxPolarAngle=Math.PI/2.05,u.minAzimuthAngle=-Math.PI/2.2,u.maxAzimuthAngle=Math.PI/2.2,u.update();const f=new Zt;f.scale.setScalar(s),r.add(f);const d=e.benchLength??lv;let g=null,_=null;if(n)gv(f),_v(f);else if(hv(f),g=pv(f,!!e.cupboard,d,s,!!e.wallCabinets),e.wallCabinets&&(_=dv(f,d,s)),e.sideBenches){const z=7-Fn/2-.02;for(const q of[-1,1]){const se=Ph(d);se.position.set(q*z,0,1.6),se.rotation.y=-q*Math.PI/2,f.add(se);const oe=Ph(.9);oe.position.set(q*(d/2+.5+.45),0,0),f.add(oe)}}!n&&(e.cupboard||e.wallCabinets)&&(r.fog=new xr(14672872,11*s,26*s)),s!==1&&f.traverse(z=>{if(!(z instanceof Fa)||!z.castShadow)return;const q=z.shadow.camera;q.left*=s,q.right*=s,q.top*=s,q.bottom*=s,q.near*=s,q.far*=s,q.updateProjectionMatrix(),z.shadow.normalBias*=s});const m=[],p=new Yd;let M=0;const S=z=>{M=requestAnimationFrame(S),p.update(z);const q=Math.min(1,p.getDelta());if(m.forEach(se=>se(q)),v){v.t=Math.min(1,v.t+q/.7);const se=v.t<.5?2*v.t*v.t:1-Math.pow(-2*v.t+2,2)/2;o.position.lerpVectors(v.fromPos,v.toPos,se),u.target.lerpVectors(v.fromTarget,v.toTarget,se),v.t>=1&&(v=null)}u.update(),xv(r,o,t.domElement.clientHeight),t.render(r,o)};M=requestAnimationFrame(S);let y=null,w=null,E=null,C=!1,v=null;u.addEventListener("start",()=>{C=!0,v=null});const T=new ResizeObserver(()=>{const z=i.clientWidth,q=i.clientHeight;!z||!q||(t.setSize(z,q),o.aspect=z/q,o.updateProjectionMatrix(),y&&!C&&(w!==null?I(y,w,{dir:E||void 0}):U(y)))});T.observe(i);function I(z,q=.7,se={}){if(z.isEmpty())return;y=z.clone(),w=q,C=!1;const oe=z.getCenter(new N),_e=(se.dir?se.dir.clone():l.clone().sub(h)).normalize();E=_e.clone();const Ze=o.position.clone(),_t=u.target.clone(),Je=[0,1,2,3,4,5,6,7].map(Ce=>new N(Ce&1?z.max.x:z.min.x,Ce&2?z.max.y:z.min.y,Ce&4?z.max.z:z.min.z)),ae=Ce=>(o.position.copy(oe).addScaledVector(_e,Ce),o.lookAt(oe),o.updateMatrixWorld(!0),Je.every(Ge=>{const Fe=Ge.clone().project(o);return Fe.z<1&&Math.abs(Fe.x)<=q&&Math.abs(Fe.y)<=q}));let ve=.01,pe=u.maxDistance*4;for(let Ce=0;Ce<40;Ce++){const Ge=(ve+pe)/2;ae(Ge)?pe=Ge:ve=Ge}if(u.maxDistance=Math.max(u.maxDistance,pe*1.5),h.copy(oe),l.copy(oe).addScaledVector(_e,pe),se.animate){o.position.copy(Ze),o.lookAt(_t),v={fromPos:Ze,toPos:l.clone(),fromTarget:_t,toTarget:h.clone(),t:0};return}v=null,o.position.copy(l),u.target.copy(h),u.update()}function U(z){if(z.isEmpty())return;y=z.clone(),w=null,C=!1;const q=z.getCenter(new N),se=z.getSize(new N),oe=o.fov*Math.PI/180,_e=2*Math.atan(Math.tan(oe/2)*o.aspect),Ze=Math.max(se.x/2/Math.tan(_e/2),Math.max(se.y,se.z*.6)/2/Math.tan(oe/2))*1.12+se.z*.25,_t=l.clone().sub(h).normalize(),Je=Math.min(u.maxDistance,Math.max(u.minDistance,Ze));h.copy(q),l.copy(q).addScaledVector(_t,Je),o.position.copy(l),u.target.copy(h),u.update()}const H=new ee,j=[...(g==null?void 0:g.doors)||[],...(_==null?void 0:_.doors)||[]];j.length&&m.push(z=>{j.forEach(q=>{const se=q.userData.open?q.userData.openAngle:0;q.rotation.y+=(se-q.rotation.y)*Math.min(1,z*7)})});const J=z=>{let q=z;for(;q&&!q.userData.cupboardDoor;)q=q.parent;return q},B=z=>{z.userData.open=!z.userData.open},Z=_?{doors:_.doors,blockers:_.blockers,cabinets:_.cabinets.map(z=>({minX:z.minX*s,maxX:z.maxX*s,rows:z.rows.map(q=>q*s),rowHeight:z.rowHeight*s,depth:z.depth*s,z:z.z*s,frontZ:z.frontZ*s}))}:null;let X=null;if(g){const z=g;X={doors:z.doors,blockers:z.blockers,bays:z.bays.map(q=>({minX:q.minX*s,maxX:q.maxX*s,levels:q.levels.map(se=>se*s),frontZ:q.frontZ*s,backZ:q.backZ*s})),toggleDoor:B,isOpen:q=>!!q.userData.open,doorOf:J}}return{cupboard:X,wallCabinets:Z,benchLength:d,toggleDoor:B,doorOf:J,renderer:t,scene:r,camera:o,controls:u,canvas:t.domElement,onFrame:z=>{m.push(z)},resetView:()=>{o.position.copy(l),u.target.copy(h),u.update()},frameBox:U,fitBox:I,toNdc:z=>{const q=t.domElement.getBoundingClientRect();return H.set((z.clientX-q.left)/q.width*2-1,-((z.clientY-q.top)/q.height)*2+1),H},dispose:()=>{cancelAnimationFrame(M),T.disconnect(),u.dispose(),r.traverse(z=>{var q;(z instanceof be||z instanceof nd||z instanceof Rn)&&((q=z.geometry)==null||q.dispose(),(Array.isArray(z.material)?z.material:[z.material]).forEach(oe=>{var _e;(_e=oe.map)==null||_e.dispose(),oe.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function hv(i){i.add(new xu(16119807,9080729,.55));const e=new Fa(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new Fa(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}const Ea=-Fn/2-.25,Lu=()=>new ue({color:1976890,roughness:.95}),uv=()=>new ue({color:14928028,roughness:.55});function Nl(i,e,t,n,s,r,a=9){const c=new be(new wt(s,.008,.012),new ue({color:16777215,emissive:16773590,emissiveIntensity:2}));c.position.set(e,t,n),i.add(c);const o=new Su(16773590,a,1.4*r,2);o.position.set(e,t-.05,n+.05),i.add(o)}function fv(i,e){const t=-Yn,n=e-t,s=Cr(256,256,(g,_,m)=>{g.fillStyle="#1f5a63",g.fillRect(0,0,_,m);for(let p=0;p<_;p+=4)g.fillStyle=p%8===0?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",g.fillRect(p,0,2,m),g.fillRect(0,p,_,2);for(let p=0;p<900;p++)g.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"0,0,0"},${Math.random()*.06})`,g.fillRect(Math.random()*_,Math.random()*m,2,2);g.strokeStyle="rgba(255,255,255,0.06)",g.lineWidth=2,g.beginPath(),g.moveTo(_/2,0),g.lineTo(_,m/2),g.lineTo(_/2,m),g.lineTo(0,m/2),g.closePath(),g.stroke()});s.wrapS=s.wrapT=ci;const r=new ue({map:Ga(),roughness:.55}),a=new ue({color:13936715,roughness:.25,metalness:1}),c=new ue({color:15659250,roughness:.95}),o=7,l=7,h=l-Ea,u=(l+Ea)/2,f=5;[{x:0,z:Ea,rotY:0,length:2*o,newWall:!1},{x:-o,z:u,rotY:Math.PI/2,length:h,newWall:!0},{x:o,z:u,rotY:-Math.PI/2,length:h,newWall:!0},{x:0,z:l,rotY:Math.PI,length:2*o,newWall:!0}].forEach(({x:g,z:_,rotY:m,length:p,newWall:M})=>{const S=new Zt;if(S.position.set(g,0,_),S.rotation.y=m,i.add(S),M){const U=new be(new Dn(p,f),c);U.position.y=t+f/2,U.receiveShadow=!0,S.add(U)}const y=s.clone();y.needsUpdate=!0,y.repeat.set(p/.35,n/.35);const w=new be(new Dn(p,n),new ue({map:y,roughness:.95}));w.position.set(0,t+n/2,.004),w.receiveShadow=!0,S.add(w);const E=new be(new wt(p,.045,.022),r);E.position.set(0,e-.0225,.015),E.castShadow=!0,E.receiveShadow=!0,S.add(E);const C=new be(new wt(p,.1,.018),r);C.position.set(0,t+.05,.013),S.add(C);const v=Math.floor(p/.15),T=new su(new Wt(.007,10,8),a,v),I=new Lt;for(let U=0;U<v;U++)I.makeTranslation(-p/2+.075+U*.15,e-.075,.007),T.setMatrixAt(U,I);S.add(T)})}function dv(i,e,t=1){const n=e/2+.1,s=.86,r=.3,a=.016,c=.5,o=Ea+.002,l=o+r,h=4,u=Ga(),f=new ue({map:u,roughness:.6}),d=Lu(),g=uv(),_=new ue({color:14146528,roughness:.3,metalness:.85}),m=new Xs({color:15398655,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1}),p=[],M=[],S=[];fv(i,c);const y=.08+n/2;for(const w of[-y,y]){const E=w-n/2,C=w+n/2,v=(Z,X,z,q,se,oe,_e)=>{const Ze=new be(new wt(Z,X,z),_e);Ze.position.set(q,se,oe),Ze.castShadow=!0,Ze.receiveShadow=!0,i.add(Ze),M.push(Ze)};v(n,s,a,w,c+s/2,o+a/2,d),v(a,s,r,E+a/2,c+s/2,o+r/2,f),v(a,s,r,C-a/2,c+s/2,o+r/2,f),v(n,a*1.5,r,w,c+s-a*.75,o+r/2,f),v(n,a*1.5,r,w,c+a*.75,o+r/2,f),v(n+.03,.03,r+.02,w,c+s+.015,o+r/2+.01,f);const T=c+a*1.5,I=c+s-a*1.5,U=(I-T)/h,H=[];for(let Z=0;Z<h;Z++){const X=T+Z*U;Z>0&&v(n-2*a,a,r-a-.03,w,X-a/2,o+a+(r-a-.03)/2,g),H.unshift(X)}for(const Z of[w-n/4,w+n/4])Nl(i,Z,I-.006,o+r*.72,n/2-.08,t);S.push({minX:E+a,maxX:C-a,rows:H,rowHeight:U-a,depth:r-a-.05,z:o+a+(r-a-.03)/2,frontZ:o+r-.03});const j=n/2-.004,J=s-.01,B=.018;for(const[Z,X]of[[E,1],[C,-1]]){const z=new Zt;z.position.set(Z+X*.002,c+s/2,l+.008);const q=new be(new wt(j-B,J-B,.004),m);q.position.x=X*j/2,q.renderOrder=2,z.add(q);const se=(_e,Ze,_t,Je)=>{const ae=new be(new wt(_e,Ze,.014),_);ae.position.set(_t,Je,0),z.add(ae)};se(j,B,X*j/2,J/2-B/2),se(j,B,X*j/2,-J/2+B/2),se(B,J,X*B/2,0),se(B,J,X*(j-B/2),0);const oe=new be(new te(.008,.008,.07,12),Wa.steel());oe.position.set(X*(j-.04),-.12,.02),z.add(oe),z.userData.cupboardDoor=!0,z.userData.open=!1,z.userData.openAngle=-X*1.7,i.add(z),p.push(z)}}return{doors:p,blockers:M,cabinets:S}}function Ph(i){const e=new Zt,t=0,n=new be(new Pr(i,.035,Fn,3,.008),new Xs({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));n.position.set(t,-.0175,0),n.castShadow=!0,n.receiveShadow=!0,e.add(n);const s=i-.06,r=new be(new wt(s,Yn-.035,Fn-.06),new ue({map:Ga(),roughness:.7}));r.position.set(t,-Yn/2-.0175,0),r.castShadow=!0,r.receiveShadow=!0,e.add(r);const a=i<1.5,c=new ue({color:3877404,roughness:.8}),o=Wa.steel(),l=(Fn-.06)/2;for(const h of a?[0]:[-.25,0,.25]){const u=new be(new wt(.004,Yn-.12,.002),c);u.position.set(t+h*s,-Yn/2-.02,l+.001),e.add(u)}for(const h of a?[0]:[-.25,.25])for(const u of[-.04,.04]){const f=new be(new te(.006,.006,.1,12),o);f.position.set(t+h*s+u,-.2,l+.015),e.add(f)}return e}function pv(i,e=!1,t=1.8,n=1,s=!1){const r=Cr(512,512,(_,m,p)=>{_.fillStyle="#b9bec6",_.fillRect(0,0,m,p);for(let M=0;M<1200;M++)_.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,_.fillRect(Math.random()*m,Math.random()*p,3,3);_.strokeStyle="rgba(70,74,82,0.35)",_.lineWidth=3,_.strokeRect(0,0,m,p)});r.wrapS=r.wrapT=ci,r.repeat.set(12,12);const a=new be(new Dn(14,14),new ue({map:r,roughness:.85}));a.rotation.x=-Math.PI/2,a.position.y=-Yn,a.receiveShadow=!0,i.add(a);const c=new be(new Dn(14,5),new ue({color:15659250,roughness:.95}));c.position.set(0,1.6,-Fn/2-.25),c.receiveShadow=!0,i.add(c);const o=Cr(256,256,(_,m,p)=>{_.fillStyle="#f7f8f9",_.fillRect(0,0,m,p),_.strokeStyle="#c9ced4",_.lineWidth=4,_.strokeRect(0,0,m,p)});o.wrapS=o.wrapT=ci,o.repeat.set(40,4);const l=new be(new Dn(6,.6),new ue({map:o,roughness:.3,metalness:0}));l.position.set(0,.3,-Fn/2-.249),s||i.add(l);const h=new be(new Pr(t,.035,Fn,3,.008),new Xs({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));h.position.y=-.0175,h.receiveShadow=!0,h.castShadow=!0,i.add(h);const u=Ga();if(e)return mv(i,u,t,n);const f=new be(new wt(t-.06,Yn-.035,Fn-.06),new ue({map:u,roughness:.7}));f.position.y=-Yn/2-.0175,f.receiveShadow=!0,i.add(f);const d=new ue({color:3877404,roughness:.8}),g=Wa.steel();for(const _ of[-.6,0,.6]){const m=new be(new wt(.004,Yn-.12,.002),d);m.position.set(_,-Yn/2-.02,(Fn-.06)/2+.001),i.add(m)}for(const _ of[-.66,-.54,-.06,.06,.54,.66]){const m=new be(new te(.006,.006,.1,12),g);m.position.set(_,-.2,(Fn-.06)/2+.015),i.add(m)}return null}function mv(i,e,t,n=1){const s=t-.06,r=Fn-.06,a=.018,c=-.035,o=-Yn,l=c-o,h=r/2,u=-r/2,f=new ue({map:e,roughness:.7}),d=new ue({color:2898509,roughness:.7}),g=Lu(),_=[],m=(J,B,Z,X,z,q,se)=>{const oe=new be(new wt(J,B,Z),se);return oe.position.set(X,z,q),oe.castShadow=!0,i.add(oe),_.push(oe),oe},p=o+.06;m(a,l,r,-s/2+a/2,o+l/2,0,f),m(a,l,r,s/2-a/2,o+l/2,0,f),m(s,l,a,0,o+l/2,u+a/2,g),m(a,l,r-a,0,o+l/2,a/2,g),m(s,a,r,0,p-a/2,0,d),m(s,.06,a,0,o+.03,h-.03,f),m(s,.04,a,0,c-.02,h-a/2,f);const M=-.46,S=s/2-a*1.5;m(S,a,r-a,-s/4,M-a/2,a/2,d),m(S,a,r-a,s/4,M-a/2,a/2,d);for(const J of[-s/4,s/4])Nl(i,J,c-.05,h-.12,S-.1,n,10),Nl(i,J,M-a-.006,h-.12,S-.1,n,10);const y=c-.04,w=p-a,E=y-w-.002,C=s>2.2,v=(C?s/4:s/2)-.0025,T=new ue({map:e,roughness:.65}),I=Wa.steel(),U=[];(C?[[-s/2,1,1.95],[0,-1,1.5],[0,1,1.5],[s/2,-1,1.95]]:[[-s/2,1,1.95],[s/2,-1,1.95]]).forEach(([J,B,Z],X)=>{const z=new Zt;z.position.set(J+B*.001,(y+w)/2,h+a/2);const q=new be(new wt(v,E,a),T);q.position.x=B*v/2,q.castShadow=!0,z.add(q);const se=new be(new te(.006,.006,.1,12),I);se.position.set(B*(v-.045),-.2-z.position.y,a/2+.015),z.add(se);for(const oe of[se.position.y-.05,se.position.y+.05]){const _e=new be(new te(.004,.004,.016,8),I);_e.rotation.x=Math.PI/2,_e.position.set(se.position.x,oe,a/2+.008),z.add(_e)}z.userData.cupboardDoor=!0,z.userData.bay=C?X<2?0:1:X,z.userData.open=!1,z.userData.openAngle=-B*Z,i.add(z),U.push(z)});const j=(J,B)=>({minX:J,maxX:B,levels:[p,M],frontZ:h-.02,backZ:u+a});return{doors:U,blockers:_,bays:[j(-s/2+a,-a/2),j(a/2,s/2-a)]}}function gv(i){i.add(new xu(14675967,6126138,.8));const e=new Fa(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function _v(i){const e=Cr(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const h=60+Math.random()*70;a.fillStyle=`rgba(${h*.6},${h+40},${h*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=ci,e.repeat.set(80,80);const t=new be(new Dn(300,300),new ue({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new be(new Dn(80,.1),new ue({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new ue({color:5980976,roughness:.9}),r=new ue({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new be(new te(.25,.35,3,8),s);l.position.set(c,1.5,o);const h=new be(new Wt(2.2+a%3*.5,12,10),r);h.position.set(c,4.2+a%2,o),i.add(l,h)}}function Ga(){return Cr(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function Cr(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new wr(n);return s.colorSpace=hn,s.anisotropy=16,s}function vv(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new wr(s);o.colorSpace=hn;const l=new Rn(new zs({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const h=e/700*.73;return l.scale.set(h*l.userData.aspect,h,1),l}const No=new N,Uo=new N;function xv(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(No).project(e),c.getWorldPosition(Uo).project(e);const o=Math.abs(No.y-Uo.y)*t/2+Math.abs(No.x-Uo.x)*t/2;s.visible=o>r*1.25})}const Wa={steel:()=>new ue({color:13094097,metalness:1,roughness:.28}),chrome:()=>new ue({color:15133164,metalness:1,roughness:.12}),brass:()=>new ue({color:13936715,metalness:1,roughness:.22}),castIron:()=>new ue({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new ue({color:1776928,roughness:.5}),glass:()=>new ue({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},dt=(i=15857397)=>new Xs({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:Jt,depthWrite:!1}),An=i=>new ue({color:i,roughness:.45,metalness:.15}),vt=(i=13094097)=>new ue({color:i,roughness:.28,metalness:1}),Rt=()=>new ue({color:15133164,roughness:.12,metalness:1}),si=()=>new ue({color:13936715,roughness:.22,metalness:1}),Bt=i=>new ue({color:i,roughness:.5,metalness:.05}),Qt=i=>new ue({color:i,roughness:.35,metalness:.1}),ii=()=>new ue({color:10119233,roughness:.7}),$e=(i,e,t,n=Math.min(i,e,t)*.12)=>new Pr(i,e,t,3,n);function L(i,e,t=0,n=0,s=0){const r=new be(i,e);return r.position.set(t,n,s),r}function en(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new wr(n);return s.colorSpace=hn,s.anisotropy=16,s}function Fi(i,e,t,n){const s=new Zt;return s.add(L(new te(.018,.022,.05,16),si(),0,.025,0)),s.add(L(new te(.026,.026,.03,16),Bt(n),0,.06,0)),s.position.set(i,e,t),s}function Un(i,e,t,n=.55){const s=e*.85,r=new be(new te(i*.9,i*.9,s,40),new ue({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const yv={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function Dh(i,e,t,n){const s=yv[n.hazard],r=en(512,256,(c,o,l)=>{c.fillStyle="#fffdf6",c.fillRect(0,0,o,l),c.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",c.fillRect(0,0,o,34),c.fillStyle="#ffffff",c.font="bold 24px sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),c.fillStyle="#111827";const h=String(n.display_name||"Reagent").split(" "),u=[];let f="";c.font="bold 40px sans-serif",h.forEach(g=>{const _=f?`${f} ${g}`:g;c.measureText(_).width>o-40&&f?(u.push(f),f=g):f=_}),u.push(f);const d=u.slice(0,2);d.forEach((g,_)=>c.fillText(g,o/2,(n.formula?86:110)+_*46-(d.length-1)*10)),n.formula&&(c.font="bold 54px serif",c.fillStyle="#1e3a8a",c.fillText(String(n.formula),o/2,212)),c.strokeStyle="#cbd5e1",c.lineWidth=4,c.strokeRect(2,2,o-4,l-4)}),a=L(new te(i,i,e,32,1,!0,-1.05,2.1),new ue({map:r,roughness:.85,side:Jt}),0,t);return a.userData.role="reagent_label",a}function ga(i,e,t,n){const s=en(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let h=1;h<=l;h++){const u=o-h/(l+1)*o;a.fillRect(0,u,h%5===0?44:24,h%5===0?4:2)}}),r=new be(new te(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new ss({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function _a(i){const e=en(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new Rn(new zs({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function Lh(i,e){return en(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const h=c+l/50*o,u=l%10===0;t.lineWidth=u?4:1.5;const f=u?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(h)*f,r+Math.sin(h)*f),t.lineTo(s+Math.cos(h)*(a-16),r+Math.sin(h)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const h=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(h)*(a-82),r+Math.sin(h)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function Iu(i){return en(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function Oa(i,e="#22c55e"){return en(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function Ih(){return en(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function Mv(){return en(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const Fo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function Sv(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[Fo[n],Fo[s],Fo[r],"#d4af37"]}class Oo extends Kn{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new N){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function Bo(i,e,t,n={}){const s=new Zt;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const h=[new ee(0,.004),new ee(.301,.004),new ee(.315,.03),new ee(.33949999999999997,.58),new ee(.357,.6),new ee(.364,.612)];r(new be(new xi(h,48),dt()));const u=L(new qn(.045,.07,3),dt(),.35*1,.6-.015,0);u.rotation.z=-Math.PI/2,r(u,ga(.35*.95,.06,.6*.72,4),Un(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const h=L(new te(.12,.12,.55,32,1,!0),dt(),0,.375),u=L(new Wt(.12,32,16,0,Math.PI*2,0,Math.PI/2),dt(),0,.1);u.rotation.x=Math.PI;const f=L(new qt(.12*1.02,.012,10,32),dt(),0,.55+.1);f.rotation.x=Math.PI/2;const d=L($e(.34,.08,.34,.02),ii(),0,.04);r(h,u,f,d,Un(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const h=L(new te(.06,.06,1.1,32,1,!0),dt(),0,.7000000000000001),u=L(new te(.06*1.25,.06*1.25,.1,24),dt(15660799),0,.1),f=L($e(.16,.03,.035,.012),Bt(1920728),.09,.1),d=L(new te(.03,.01,.1,16,1,!0),dt(),0,.02),g=L(new te(.2,.22,.04,32),Qt(3099491),0,.02);r(h,u,f,d,g,ga(.06,.2,1.1*.85,10),Un(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=L(new te(.018,.008,.3,16),dt(),0,.2),l=L(new Wt(.055,24,16),dt(),0,.42);l.scale.y=1.8;const h=L(new te(.018,.018,.3,16),dt(),0,.68),u=L(new qt(.02,.003,6,20),new ss({color:1120295}),0,.74);u.rotation.x=Math.PI/2;const f=L(new Wt(.075,24,16),Bt(12131356),0,.9);f.scale.y=1.25;const d=L($e(.22,.07,.18,.02),ii(),0,.035);r(o,l,h,u,f,d);break}case"measuring_cylinder":{const h=L(new te(.18,.17099999999999999,.8,40,1,!0),dt(),0,.44),u=L(new te(.18*1.6,.18*1.7,.05,6),dt(15266293),0,.025),f=L(new qn(.035,.06,3),dt(),.18,.8+.03,0);f.rotation.z=-Math.PI/2,r(h,u,f,ga(.18*.97,.12,.8*.8,5),Un(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new ue({color:1920728,roughness:.45,metalness:.2}),l=[new ee(0,.005),new ee(.27,.005),new ee(.272,.018),new ee(.2,.05),new ee(.11,.1),new ee(.075,.13),new ee(0,.13)],h=new be(new xi(l,56),o),u=L(new te(.068,.07,.11,36),o,0,.175),f=en(128,16,(v,T,I)=>{v.fillStyle="#d4d4d8",v.fillRect(0,0,T,I),v.fillStyle="#71717a";for(let U=0;U<T;U+=4)v.fillRect(U,0,1.5,I)});f.wrapS=ci,f.repeat.set(3,1);const d=L(new te(.052,.052,.075,40),new ue({map:f,roughness:.3,metalness:1}),0,.268),g=L(new te(.066,.066,.03,6),Rt(),0,.32),_=L(new te(.06,.06,.012,40),Rt(),0,.341),m=L(new te(.048,.048,.28,36,1,!0),Rt(),0,.485),p=L(new te(.042,.042,.004,28),new ue({color:4144966,roughness:.8}),0,.6),M=L(new qt(.046,.004,8,32),Rt(),0,.625);M.rotation.x=Math.PI/2;const S=new Zt,y=L(new te(.032,.032,.2,24),Rt(),0,.1);S.add(y);for(let v=0;v<3;v++)S.add(L(new te(.03,.036,.025,24),Rt(),0,.215+v*.03));S.add(L(new te(.02,.02,.004,20),new ue({color:2565930}),0,.29)),S.rotation.z=Math.PI/2+.12,S.position.set(-.05,.16,0),r(h,u,d,g,_,m,p,M,S);const w=n.flame==="on",E=L(new qn(.09,.3,24),new ue({color:16751933,emissive:16738816,emissiveIntensity:w?1:0,transparent:!0,opacity:w?.75:0,depthWrite:!1}),0,.77);E.userData.role="flame";const C=L(new qn(.045,.16,16),new ue({color:6333946,emissive:2450411,emissiveIntensity:w?1.3:0,transparent:!0,opacity:w?.85:0,depthWrite:!1}),0,.7);C.userData.role="flame",r(E,C);break}case"thermometer":{const o=en(256,1690,(p,M,S)=>{p.fillStyle="#fbfbf8",p.fillRect(0,0,M,S),p.fillStyle="#0f172a",p.textAlign="left",p.textBaseline="middle";const y=S-250,w=S-400;for(let E=0;E<=100;E+=2){const C=y-E/100*w,v=E%10===0;p.fillRect(M-(v?90:50),C-(v?3:1.5),v?90:50,v?6:3),v&&(p.font=`900 ${E%50===0?62:52}px Arial, sans-serif`,p.fillText(String(E),10,C))}p.font="700 44px Arial, sans-serif",p.fillText("°C",14,y-w-70)}),l=L($e(.1,.66,.02,.008),new ue({map:o,roughness:.5}),0,.45,-.025),h=L(new te(.022,.022,.62,24),dt(16777215),0,.45),u=L(new te(.008,.008,.45,12),new ue({color:14427686,roughness:.2}),0,.32),f=L(new Wt(.05,24,24),new ue({color:14427686,roughness:.2}),0,.1),d=L(new Wt(.065,24,24),dt(16777215),0,.1),g=L($e(.26,.04,.2,.015),Qt(3099491),0,.02);r(l,h,u,f,d,g);const _=p=>.78-(1440-p*12.9)/1690*.66;let m;for(const p of[0,25,50,75,100]){const M=vv(`${p}°`,12,p%50===0?void 0:m);M.center.set(0,.5),M.position.set(.065,_(p),-.02),r(M),p%50===0&&(m=M)}break}case"battery":{const o=en(512,256,(g,_,m)=>{g.fillStyle="#111827",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,_,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,_/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",_/2,m*.9)}),l=Bt(2042167),h=L($e(.6,.3,.3,.035),[l,l,l,l,new ue({map:o,roughness:.5}),l],0,.15),u=Fi(.2,.3,0,14427686),f=Fi(-.2,.3,0,1118481),d=new Rn(new zs({map:Iu(n.voltage||6),depthTest:!1,transparent:!0}));d.scale.set(.34,.136,1),d.position.set(0,.58,0),d.renderOrder=9,d.userData.role="voltage",r(h,u,f,d);break}case"ruler":{const h=new ue({color:15381256,roughness:.6}),u=new ue({map:Ih(),roughness:.55});r(L(new wt(1.5,.015,.16),[h,h,u,h,h,h],0,.0075));break}case"bulb":{const o=n.state==="on",l=L(new Wt(.18,32,32),new Xs({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const h=L(new qt(.05,.006,8,24,Math.PI*1.7),new ue({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);h.rotation.x=Math.PI/2,h.userData.role="led";const u=L(new te(.095,.11,.16,24),si(),0,.12),f=new Zt;for(let g=0;g<5;g++){const _=L(new qt(.1,.006,6,24),si(),0,.06+g*.028);_.rotation.x=Math.PI/2,f.add(_)}const d=L($e(.4,.04,.26,.015),ii(),0,.02);r(l,h,u,f,d,Fi(-.15,.04,.07,14427686),Fi(.15,.04,.07,1118481));break}case"switch":{const o=L($e(.4,.06,.2,.012),ii(),0,.03),l=L(new te(.02,.02,.1,16),si(),-.12,.11),h=L($e(.05,.06,.05,.008),si(),.12,.09),u=L(new te(.012,.012,.24,16),Rt()),f=n.state==="closed";u.position.set(f?0:-.06,.16,0),u.rotation.z=f?Math.PI/2-.35:Math.PI/2-.9,u.userData.role="lever",u.add(L(new Wt(.028,16,12),Bt(1118481),0,-.13,0)),r(o,l,h,u);break}case"resistor":{const o=en(256,64,(g,_,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,_,m),Sv(n.resistance_ohm).forEach((p,M)=>{g.fillStyle=p,g.fillRect(60+M*34+(M===3?22:0),0,16,m)})}),l=L(new te(.07,.07,.32,32),new ue({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const h=L(new te(.01,.01,.52,10),vt(13948120),0,.2);h.rotation.z=Math.PI/2;const u=L($e(.6,.04,.2,.012),Bt(15195332),0,.02),f=L(new te(.012,.012,.16,10),vt(13948120),-.26,.12),d=f.clone();d.position.x=.26,r(l,h,u,f,d);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=L($e(.42,.4,.18,.03),Qt(o?1981066:8330525),0,.2),h=L(new qt(.155,.015,12,48),Rt(),0,.2,.091),u=L(new Ji(.15,48),new ue({map:Lh(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),f=L(new qn(.012,.13,8),An(14427686),.02,.2,.1);f.rotation.z=-Math.PI/2+.6,f.userData.role="needle";const d=L(new Wt(.014,12,12),vt(2565930),0,.2,.1);r(l,h,u,f,d,Fi(-.12,.4,0,14427686),Fi(.12,.4,0,1118481));break}case"microscope":{const o=Qt(15659250),l=Qt(2040616);r(L($e(.36,.06,.47,.02),o,0,.03,-.05)),r(L($e(.1,.28,.1,.02),o,0,.19,-.22));const h=new lu([new N(0,.27,-.23),new N(0,.55,-.23),new N(0,.74,-.14),new N(0,.8,-.03)]);r(new be(new ts(h,24,.044,12,!1),o));const u=L(new te(.035,.035,.01,24),new ue({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);u.userData.role="led",r(L(new te(.045,.05,.05,24),l,0,.085),u),r(L($e(.3,.022,.28,.006),l,0,.32));for(const f of[-.08,.08])r(L(new wt(.016,.004,.11),Rt(),f,.333,.03));r(L(new te(.036,.036,.25,24),l,0,.7)),r(L(new te(.025,.03,.11,24),l,0,.88)),r(L(new te(.056,.06,.033,32),Rt(),0,.565)),[14427686,15381256,2450411].forEach((f,d)=>{const g=new Zt;g.position.y=.55,g.rotation.y=2*Math.PI*d/3;const _=new Zt;_.position.z=.03,_.rotation.x=.35,_.add(L(new te(.015,.012,.07+d*.015,16),Rt(),0,-.04-d*.008)),_.add(L(new te(.0158,.0158,.008,16),Bt(f),0,-.03)),g.add(_),r(g)});for(const f of[-1,1]){const d=L(new te(.05,.05,.028,24),l,f*.08,.25,-.22);d.rotation.z=Math.PI/2;const g=L(new te(.025,.025,.028,20),l,f*.11,.25,-.22);g.rotation.z=Math.PI/2,r(d,g)}break}case"lens":{const o=L(new Wt(.22,40,40),dt(15988991),0,.42);o.scale.set(1,1,.22);const l=L(new qt(.22,.02,16,48),vt(10265519),0,.42),h=L(new te(.015,.015,.2,12),vt(),0,.1),u=L(new te(.12,.14,.03,32),Qt(3099491),0,.015);r(o,l,h,u);break}case"mirror":{const o=L($e(.4,.5,.02,.006),[vt(4674921),vt(4674921),vt(4674921),vt(4674921),new ue({color:16777215,metalness:1,roughness:.03}),vt(4674921)],0,.3,0),l=L($e(.36,.06,.12,.012),ii(),0,.03,-.02);r(o,l);break}case"biological_model":{const o=L(new wt(.5,.012,.18),dt(14742270),0,.006),l=L(new wt(.14,.003,.14),dt(15857397),0,.014),h=L(new Ji(.045,32),new ue({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);h.rotation.x=-Math.PI/2;const u=L(new wt(.12,.014,.17),Bt(16317180),-.18,.007);r(o,l,h,u);break}case"wire":{const o=new be(new ts(new Oo(.12,.15,5),240,.012,8,!1),new ue({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=L(new te(.135,.135,.14,24),Bt(3621201),0,.08);r(l,o);break}case"water_container":{const h=L(new te(.255,.3,.75,48,1,!0),dt(),0,.375),u=L(new Ji(.3,48),dt(),0,.003);u.rotation.x=-Math.PI/2;const f=L(new qt(.14,.02,12,32,Math.PI*1.3),dt(),.3*.85,.75*.6);f.rotation.z=Math.PI/2,r(h,u,f,Un(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),h=L(new te(.025,.025,l,24),vt(10265519),0,.025);h.rotation.z=Math.PI/2;const u=L(new Wt(.025,16,16),vt(7434618),-l/2,.025),f=u.clone();f.position.x=l/2,r(h,u,f);break}case"balance":{const o=L($e(.55,.1,.42,.03),Qt(15067115),0,.05),l=L(new te(.16,.16,.015,40),Rt(),0,.11,.02),h=L(new te(.03,.03,.02,16),vt(),0,.1,.02),u=L($e(.3,.07,.05,.012),Bt(2042167),0,.07,.2),f=new Rn(new zs({map:Oa("0.0 g"),depthTest:!1,transparent:!0}));f.scale.set(.3,.135,1),f.position.set(0,.24,.2),f.renderOrder=9,f.userData.role="balance_display",r(o,l,h,u,f);break}case"stopwatch":{const o=L(new te(.13,.13,.045,48),Qt(2042167),0,.16);o.rotation.x=Math.PI/2;const l=L(new qt(.13,.01,10,48),Rt(),0,.16),h=L(new te(.022,.022,.04,16),Rt(),0,.305),u=L(new qt(.025,.006,8,20),Rt(),0,.34),f=L($e(.18,.03,.12,.01),Bt(3621201),0,.015),d=new Rn(new zs({map:Oa("00:00.0"),depthTest:!1,transparent:!0}));d.scale.set(.2,.09,1),d.position.set(0,.16,.03),d.renderOrder=9,d.userData.role="stopwatch_display",r(o,l,h,u,f,d);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,h=o*.05,u=(o+l*1.6)*.05,f=new be(new ts(new Oo(u,.05,22),440,.007,6,!1),new ue({color:13094097,roughness:.25,metalness:1}));f.userData.role="spring_body",f.userData.naturalLengthUnits=h,f.userData.maxLengthUnits=u,f.scale.y=h/u,f.position.y=.85-u*f.scale.y/2;const d=L(new qt(.03,.008,8,20),vt(7434618),0,.85),g=L(new te(.05,.05,.015,24),vt(5395035));g.userData.role="spring_hanger",g.position.y=.85-u*f.scale.y,r(f,d,g);break}case"retort_stand":{const o=Qt(3099491);r(L($e(.36,.035,.24,.012),o,0,.0175)),r(L(new te(.016,.016,.95,20),vt(),-.13,.5)),r(L($e(.07,.07,.07,.01),o,-.13,.9));const l=L(new te(.01,.01,.07,10),vt(),-.13,.9,.06);l.rotation.x=Math.PI/2;const h=L(new te(.012,.012,.3,16),vt(),.03,.9);h.rotation.z=Math.PI/2,r(l,h,L($e(.04,.05,.05,.008),si(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),h=.04+Math.min(.06,o/3e3),u=en(256,256,(d,g)=>{d.fillStyle="#4a525c",d.fillRect(0,0,g,g),d.fillStyle="#1f2328",d.beginPath(),d.arc(g/2,g/2,22,0,Math.PI*2),d.fill(),d.fillRect(g/2-9,g/2,18,g/2),d.fillStyle="#f1f5f9",d.font="bold 58px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText(`${o}g`,g/2,g/2-62)}),f=Qt(4870748);f.metalness=.5,r(L(new te(l,l,h,36),[f,new ue({map:u,metalness:.4,roughness:.5}),f],0,h/2));break}case"ray_box":{const o=n.state==="on",l=L($e(.35,.22,.28,.03),Qt(2042167),0,.11),h=L(new wt(.2,.16,.012),Bt(988970),0,.11,.145),u=L(new wt(.02,.12,.02),new ue({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);u.userData.role="led";const f=L(new te(.012,.012,.3,10),Bt(1120295),0,.03,-.29);f.rotation.x=Math.PI/2,r(l,h,u,f);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(L($e(o,.1,.55,.01),dt(14676223),0,.05));break}case"projectile_launcher":{const o=new ue({color:2962235,metalness:.6,roughness:.4});r(L($e(.5,.05,.36,.015),o,0,.025));for(const d of[-.09,.09])r(L($e(.1,.22,.02,.006),o,0,.14,d));const l=new Zt;l.position.y=.22,l.rotation.z=Math.PI/4;const h=L(new te(.05,.055,.45,28),new ue({color:1920728,metalness:.5,roughness:.35}),.17,0);h.rotation.z=-Math.PI/2;const u=L(new qt(.053,.011,12,28),Rt(),.39,0);u.rotation.y=Math.PI/2;const f=L(new te(.018,.018,.22,16),vt());f.rotation.x=Math.PI/2,l.add(h,u,f),r(l);break}case"projectile":{r(L(new qt(.05,.012,10,28),Bt(3621201),0,.012)),r(L(new Wt(.07,32,20),new ue({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=L(new te(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new ue({map:Mv(),transparent:!0,opacity:.92,roughness:.3,side:Jt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,h=.62,u=.085,f=[new ee(0,.004),new ee(l*.96,.004),new ee(l,.03),new ee(u+.01,h*.7),new ee(u,h*.76),new ee(u,h-.02),new ee(u+.012,h),new ee(u+.012,h+.012)],d=o?new Xs({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:Jt,depthWrite:!1}):dt();r(new be(new xi(f,56),d));const g=en(512,512,(S,y,w)=>{S.clearRect(0,0,y,w),S.fillStyle="#ffffff",S.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([C,v])=>{S.fillRect(y*.6,w*C,y*.13,5),S.font="bold 34px Arial",S.fillText(v,y*.76,w*C+12)}),S.fillRect(y*.63,w*.64,y*.07,4),S.font="bold 40px Arial",S.fillText("250 ml",y*.12,w*.52),S.fillRect(y*.14,w*.58,y*.2,w*.09),S.save(),S.translate(y*.56,w*.86),S.rotate(-Math.PI/2),S.font="bold 22px Arial",S.fillText("APPROX. VOL",0,0),S.restore()}),_=.03,m=h*.7,p=new be(new xi([new ee(l*1.006,_),new ee((u+.01)*1.006,m)],24,-.75,1.5),new ss({map:g,transparent:!0,depthWrite:!1,side:Jt}));r(p);const M=new be(new te(.11,l*.94,h*.66,48),new ue({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));M.userData.role="liquid",M.userData.maxFillHeight=h*.66,M.scale.y=.001,r(M);break}case"round_bottom_flask":{const o=L(new Wt(.28,40,28),dt(),0,.36),l=L(new te(.07,.07,.34,28,1,!0),dt(),0,.78),h=L(new qt(.2,.025,12,40),Bt(3621201),0,.05);h.rotation.x=Math.PI/2;const u=new Zt;u.position.y=.14,u.add(Un(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,h,u);break}case"evaporating_dish":{const o=[new ee(0,.01),new ee(.12,.012),new ee(.26,.09),new ee(.3,.13)];r(new be(new xi(o,48),new ue({color:16317180,roughness:.25,side:Jt})));const l=new Zt;l.position.y=.012,l.add(Un(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=L(new qt(.3,.02,12,48),vt(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const h=l/3*Math.PI*2,u=L(new te(.018,.018,.82,12),vt(5395035),Math.cos(h)*.34,.4,Math.sin(h)*.34);u.rotation.z=Math.cos(h)*-.08,u.rotation.x=Math.sin(h)*.08,r(u)}break}case"wire_gauze":{const o=en(256,256,(l,h,u)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,h,u),l.strokeStyle="#4b5563",l.lineWidth=2;for(let f=0;f<h;f+=10)l.beginPath(),l.moveTo(f,0),l.lineTo(f,u),l.moveTo(0,f),l.lineTo(h,f),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(h/2,u/2,h*.28,0,Math.PI*2),l.fill()});r(L(new wt(.62,.008,.62),new ue({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=L(new te(.26,.03,.32,40,1,!0),dt(),0,.52),l=L(new te(.025,.02,.32,20,1,!0),dt(),0,.2),h=L(new qn(.22,.27,32,1,!0),new ue({color:16777215,roughness:.9,side:Jt}),0,.53);h.rotation.x=Math.PI,r(o,l,h);break}case"test_tube_rack":{const o=L($e(.9,.04,.24,.01),ii(),0,.3),l=L($e(.9,.04,.24,.01),ii(),0,.02),h=L($e(.04,.3,.24,.01),ii(),-.43,.16),u=h.clone();u.position.x=.43,r(o,l,h,u);const f=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let d=0;d<4;d++){const g=-.3+d*.2;r(L(new te(.055,.055,.42,20,1,!0),dt(),g,.25)),r(L(new te(.05,.05,.12,20),new ue({color:f[d],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=L($e(.32,.008,.05,.003),Rt(),.16,.006),l=L(new Wt(.04,20,10,0,Math.PI*2,0,Math.PI/2),Rt(),-.18,.04);l.rotation.x=Math.PI;const h=L(new te(.008,.008,.18,12),Rt(),-.06,.008);h.rotation.z=Math.PI/2,r(o,l,h);break}case"wash_bottle":{const o=L(new te(.17,.18,.5,36),new ue({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=L(new te(.07,.09,.08,24),Bt(2450411),0,.54),h=L(new te(.012,.012,.3,10),Bt(2450411),.08,.66);h.rotation.z=-.9,r(o,l,h,Un(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const h=[new ee(0,.003),new ee(.188,.003),new ee(.2,.03),new ee(.2,.56),new ee(.16000000000000003,.64),new ee(.07,.6900000000000001),new ee(.065,.75),new ee(.072,.76)];r(new be(new xi(h,40),dt())),r(Un(.2*.97,.56,n.color||"#eef6f8",.78));const u=L(new te(.06,.055,.07,24),dt(15266031),0,.56+.22),f=L(new te(.09,.09,.035,28),dt(15266031),0,.56+.27);r(u,f,Dh(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(L(new te(.21,.21,.46,40,1,!0),dt(),0,.46/2+.005)),r(L(new te(.21,.21,.01,40),dt(),0,.005));const h=.46*.62,u=L(new te(.21*.95,.21*.95,h,40),new ue({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,h/2+.01),f=L(new te(.21*1.04,.21*1.04,.07,40),Bt(2042167),0,.46+.035);r(u,f,Dh(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=L(new te(.02,.008,.36,16),dt(),0,.24),l=L(new Wt(.045,20,14),Bt(1120295),0,.46);l.scale.y=1.6;const h=L(new te(.1,.1,.22,28),new ue({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,h);break}case"crucible":{const o=[new ee(0,.005),new ee(.08,.005),new ee(.13,.2),new ee(.14,.21)],l=new ue({color:16119284,roughness:.3,side:Jt});r(new be(new xi(o,40),l));const h=L(new te(.15,.15,.015,40),l,.32,.008),u=L(new Wt(.025,16,12),l,.32,.025);r(h,u);break}case"bar_magnet":{r(L($e(.3,.08,.1,.01),Qt(14427686),-.15,.04),L($e(.3,.08,.1,.01),Qt(1920728),.15,.04));const o=_a("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=_a("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(L(new te(.12,.12,.04,40),si(),0,.02)),r(L(new te(.105,.105,.002,40),new ue({color:16777215}),0,.041));const o=new Zt,l=L(new qn(.018,.09,4),An(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const h=L(new qn(.018,.09,4),An(2042167),0,0,.045);h.rotation.x=Math.PI/2,o.add(l,h),o.position.y=.05,o.userData.role="needle",r(o,L(new te(.11,.11,.012,40),dt(),0,.06));break}case"prism":{const o=new mr;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new Ns(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new be(l,dt(14742270)));break}case"rheostat":{const o=new ue({color:6054233,roughness:.75,metalness:.45}),l=new ue({color:14925716,roughness:.6}),h=new ue({color:1118481,roughness:.35}),u=.2,f=.79,d=en(64,64,(S,y,w)=>{S.fillStyle="#1a1a1a",S.fillRect(0,0,y,w);for(let E=0;E<w;E+=4)S.fillStyle="#3a3a3a",S.fillRect(0,E,y,1),S.fillStyle="#050505",S.fillRect(0,E+2,y,1)});d.wrapS=d.wrapT=ci,d.repeat.set(1,18);const g=L(new te(.125,.125,1.24,48),new ue({map:d,roughness:.4,metalness:.6}),0,u);g.rotation.z=Math.PI/2,r(g);for(const S of[-1,1]){const y=L(new te(.12,.12,.1,40),l,S*.67,u),w=L(new te(.129,.129,.035,40),Rt(),S*.635,u),E=L(new te(.1,.1,.05,32),o,S*.745,u);for(const I of[y,w,E])I.rotation.z=Math.PI/2;r(y,w,E);const C=new mr;C.moveTo(-.17,0),C.lineTo(.17,0),C.lineTo(.09,.42),C.lineTo(-.09,.42),C.closePath();const v=new Ns(C,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});v.translate(0,0,-.015);const T=new be(v,o);T.rotation.y=Math.PI/2,T.position.x=S*f,r(T);for(const I of[-.2,.2]){const U=L($e(.1,.025,.09,.008),o,S*(f-S*.04),.0125,I),H=L(new te(.018,.018,.027,16),new ue({color:2042167}),S*(f-S*.04),.0125,I);r(U,H)}r(L($e(.05,.03,.06,.006),Rt(),S*.6,u-.15,.06)),r(L(new te(.014,.014,.02,12),vt(10265519),S*.6,u-.125,.06))}const _=(S,y,w,E)=>{const C=new Zt,v=L(new te(.012,.012,.04,12),si(),E*.02,0,0);v.rotation.z=Math.PI/2;const T=L(new te(.03,.03,.06,18),h,E*.065,0,0);T.rotation.z=Math.PI/2;for(let I=0;I<9;I++){const U=L(new wt(.06,.006,.006),h,E*.065,Math.cos(I*.7)*.03,Math.sin(I*.7)*.03);C.add(U)}return C.add(v,T),C.position.set(S,y,w),C};r(_(f+.02,.32,.03,1),_(f+.02,.1,.03,1),_(-f-.02,.2,.06,-1));const m=L(new te(.012,.016,.05,12),si(),f+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(L(new wt(f*2,.035,.035),Rt(),0,.395,-.02));const p=new Zt,M=en(128,128,(S,y,w)=>{S.fillStyle="#111111",S.fillRect(0,0,y,w),S.fillStyle="#e5e7eb",S.font="bold 26px Arial",S.textAlign="center",S.save(),S.translate(30,w/2),S.rotate(-Math.PI/2),S.fillText("11",0,-4),S.fillText("5",0,22),S.restore()});p.add(L($e(.13,.08,.13,.015),[h,h,new ue({map:M,roughness:.35}),h,h,h],0,.41,-.01)),p.add(L($e(.12,.09,.05,.012),h,0,.34,.05));for(const S of[-.035,.025])p.add(L(new te(.017,.017,.006,20),Rt(),.02,.453,S));p.position.x=.05,p.userData.role="slider",r(p);break}case"dry_cell":{const o=en(512,256,(_,m,p)=>{_.fillStyle="#d61f26",_.fillRect(0,0,m,p),_.fillStyle="#f5c518",_.fillRect(0,0,m,10),_.fillRect(0,p-10,m,10);const M=m*.25;_.textAlign="center",_.font="italic bold 40px Georgia",_.fillStyle="#fde68a",_.fillText("Power Cell",M,52),_.fillStyle="#f59e0b",_.beginPath(),_.arc(M,118,40,0,Math.PI*2),_.fill(),_.fillStyle="#7c2d12",_.font="bold 44px Arial",_.fillText("+",M,134),_.fillStyle="#fde68a",_.font="bold 22px Arial",_.fillText("SUPER QUALITY",M,190),_.fillStyle="#ffffff",_.font="bold 24px Arial",_.fillText("BATTERY",M,218),_.fillText("1.5V",M,242),_.fillStyle="#fde68a",_.font="bold 30px Arial",_.fillText("1.5V  DRY CELL",m*.75,p/2+10)});o.wrapS=ci,o.offset.x=.25;const l=.09,h=.32,u=L(new te(l,l,h,48,1,!0),new ue({map:o,roughness:.35}),0,h/2+.006),f=L(new te(l*.98,l*.98,.012,48),Rt(),0,h+.006),d=L(new te(.03,.032,.025,24),Rt(),0,h+.024),g=L(new te(l*.98,l*.98,.012,48),vt(10265519),0,.006);r(u,f,d,g);break}case"accumulator":{const o=en(1024,768,(p,M,S)=>{p.fillStyle="#f8fafc",p.fillRect(0,0,M,S),p.fillStyle="#1d4ed8",p.strokeStyle="#1d4ed8",p.textAlign="center",p.font="bold 44px Arial",p.fillText("UPPER LEVEL",M/2,70),p.fillRect(M*.08,90,M*.84,6),p.fillText("LOWER LEVEL",M/2,170),p.fillRect(M*.08,190,M*.84,6),p.fillRect(M*.06,250,M*.88,12),p.fillRect(M*.06,280,M*.4,300),p.fillStyle="#ffffff",p.font="bold 120px Arial",p.fillText("12V",M*.26,440),p.font="bold 34px Arial",p.fillText("LEAD-ACID",M*.26,520),p.fillStyle="#1d4ed8",p.font="bold 110px Arial",p.fillText("NS60",M*.7,400),p.font="bold 56px Arial",p.fillText("12V / 45AH",M*.7,480),p.font="bold 34px Arial",p.fillText("ACCUMULATOR",M*.7,545),p.fillRect(M*.06,600,M*.88,10)}),l=new ue({color:15857145,roughness:.55}),h=new ue({color:1920728,roughness:.4}),u=L($e(.9,.62,.55,.03),[l,l,l,l,new ue({map:o,roughness:.5}),l],0,.31),f=L($e(.94,.09,.59,.025),h,0,.665),d=L($e(.96,.03,.61,.01),h,0,.625),g=L($e(.16,.055,.03,.008),h,0,.66,.3);r(u,f,d,g);const _=new ue({color:16436245,roughness:.45});for(let p=0;p<6;p++){const M=-.35+p*.14;r(L(new te(.045,.045,.02,24),h,M,.72,-.12)),r(L(new te(.036,.04,.05,8),_,M,.75,-.12)),r(L(new te(.026,.026,.012,16),_,M,.781,-.12))}const m=new ue({color:9146260,roughness:.5,metalness:.7});for(const[p,M]of[[-.38,"+"],[.38,"-"]]){r(L(new te(.06,.06,.03,28),h,p,.725,.12)),r(L(new te(.026,.032,.09,20),m,p,.785,.12));const S=_a(M);S.scale.set(.16,.035,1),S.position.set(p,.86,.12),r(S)}break}case"metre_rule":{const o=new ue({color:14066524,roughness:.6}),l=new ue({map:Ih(),color:16113331,roughness:.55});r(L(new wt(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=L($e(.42,.3,.2,.03),Qt(1976635),0,.15),l=L(new Ji(.13,40,0,Math.PI),new ue({map:Lh("G","#1d4ed8")}),0,.12,.101),h=L(new wt(.006,.12,.004),An(14427686),0,.18,.105);h.userData.role="needle",r(o,l,h,Fi(-.12,.3,0,14427686),Fi(.12,.3,0,1120295));break}case"tuning_fork":{const o=L(new wt(.03,.4,.03),Rt(),-.04,.42),l=o.clone();l.position.x=.04;const h=L(new qt(.04,.015,10,20,Math.PI),Rt(),0,.22);h.rotation.z=Math.PI;const u=L(new te(.015,.015,.14,12),Rt(),0,.12),f=L($e(.24,.05,.14,.01),ii(),0,.025);r(o,l,h,u,f);break}case"pulley":{const o=L(new te(.15,.15,.05,40),vt(10265519),0,.9);o.rotation.x=Math.PI/2;const l=L(new qt(.15,.015,10,40),Bt(3621201),0,.9),h=L($e(.06,.12,.08,.01),vt(5395035),0,1.08),u=L(new te(.012,.012,1.1,12),vt(),-.3,.55),f=L(new te(.01,.01,.3,12),vt(),-.15,1.08);f.rotation.z=Math.PI/2;const d=L($e(.36,.03,.24,.01),Qt(2042167),-.3,.015),g=L(new te(.003,.003,.6,6),Bt(16119284),.15,.6);r(o,l,h,u,f,d,g,L(new te(.05,.05,.1,20),si(),.15,.25));break}case"petri_dish":{r(L(new te(.22,.22,.05,48,1,!0),dt(),0,.025)),r(L(new te(.22,.22,.004,48),dt(),0,.002)),r(L(new te(.21,.21,.02,48),new ue({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,h=.05+o%3*.04;r(L(new te(.02+o%2*.01,.02,.006,16),An(16317180),Math.cos(l)*h,.025,Math.sin(l)*h))}break}case"hand_lens":{const o=L(new Wt(.14,32,32),dt(15988991),0,.03);o.scale.set(1,.16,1);const l=L(new qt(.14,.018,12,48),Bt(1120295),0,.03);l.rotation.x=Math.PI/2;const h=L($e(.3,.035,.05,.012),Bt(1120295),.29,.03);r(o,l,h);break}case"scalpel":{const o=L($e(.32,.02,.035,.006),Rt(),0,.012),l=new mr;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const h=new be(new Ns(l,{depth:.003,bevelEnabled:!1}),Rt());h.rotation.x=-Math.PI/2,h.position.set(.16,.02,.02),r(o,h);break}case"forceps":{for(const o of[-1,1]){const l=L($e(.36,.012,.03,.004),Rt(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(L($e(.05,.016,.08,.006),Rt(),-.18,.012));break}case"dissecting_tray":{r(L($e(.9,.08,.6,.03),Qt(2042167),0,.04)),r(L(new wt(.82,.01,.52),new ue({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(L(new te(.006,.006,.06,8),Rt(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(L(new te(.16,.16,.5,36,1,!0),dt(),0,.25)),r(L(new te(.17,.17,.06,36),Bt(1013358),0,.53)),r(L(new te(.161,.161,.18,36,1,!0,-.6,1.2),new ue({color:16777215,roughness:.8,side:Jt}),0,.3)),r(Un(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=L(new te(.22,.16,.3,32),Qt(11817737),0,.15),l=L(new te(.2,.2,.02,32),An(4139549),0,.29),h=L(new te(.015,.02,.5,10),An(1409085),0,.54);r(o,l,h);const u=new ue({color:2278750,roughness:.5,side:Jt});for(let f=0;f<6;f++){const d=L(new Wt(.09,16,10),u,0,.42+f*.07);d.scale.set(1.4,.15,.6),d.rotation.y=f*2.1,d.position.x=Math.cos(f*2.1)*.08,d.position.z=-Math.sin(f*2.1)*.08,r(d)}break}case"soil_sieve":{const o=L(new te(.4,.4,.14,48,1,!0),new ue({color:10576391,roughness:.6,side:Jt}),0,.07),l=en(256,256,(u,f,d)=>{u.clearRect(0,0,f,d),u.strokeStyle="#6b7280",u.lineWidth=2;for(let g=0;g<f;g+=8)u.beginPath(),u.moveTo(g,0),u.lineTo(g,d),u.moveTo(0,g),u.lineTo(f,g),u.stroke()}),h=L(new Ji(.39,48),new ue({map:l,transparent:!0,metalness:.6,side:Jt}),0,.03);h.rotation.x=-Math.PI/2,r(o,h);for(let u=0;u<14;u++){const f=u*2.4,d=u%4*.08;r(L(new Jl(.025+u%3*.01),An(7893356),Math.cos(f)*d,.05,Math.sin(f)*d))}break}case"rain_gauge":{const o=L(new te(.2,.06,.16,36,1,!0),vt(13358561),0,1),l=L(new te(.2,.2,.08,36,1,!0),vt(13358561),0,1.12),h=L(new te(.1,.1,.9,32,1,!0),dt(),0,.47),u=L(new te(.03,.01,.1,12),vt(5395035),0,.01);r(o,l,h,u,ga(.1,.1,.75,5),Un(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=L(new te(.22,.25,.42,36),Qt(1483594),0,.21),l=L(new te(.025,.04,.6,16),Qt(1483594),.4,.4);l.rotation.z=-.95;const h=L(new te(.07,.04,.06,20),vt(10265519),.64,.58);h.rotation.z=-.95;const u=L(new qt(.18,.022,10,32,Math.PI),Qt(1409085),0,.42);r(o,l,h,u,Un(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(L($e(.9,.12,.55,.02),Bt(1120295),0,.06)),r(L(new wt(.84,.02,.49),An(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const h=-.35+o*.14,u=-.15+l*.15;r(L(new te(.004,.004,.08,6),An(1483594),h,.16,u));const f=L(new Wt(.022,10,8),An(2278750),h,.2,u);f.scale.set(1.6,.3,.8),r(f)}break}case"garden_trowel":{const o=L(new Wt(.12,24,12,0,Math.PI,0,Math.PI/2),vt(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=L(new te(.012,.012,.1,10),vt(),0,.03);l.rotation.z=Math.PI/2;const h=L(new te(.03,.03,.24,16),ii(),-.17,.03);h.rotation.z=Math.PI/2,r(o,l,h);break}case"hand_hoe":{const o=new Zt,l=new ue({color:13213802,roughness:.6}),h=new ue({color:1842980,roughness:.45,metalness:.6}),u=L(new te(.03,.034,1.6,20),l,.85,0);u.rotation.z=Math.PI/2;const f=L(new te(.05,.05,.14,24),h,.05,0);f.rotation.z=Math.PI/2;const d=L($e(.05,.14,.05,.01),h,0,-.09),g=new mr;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const _=new Ns(g,{depth:.014,bevelEnabled:!1}),m=new be(_,new ue({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const p=L(new wt(.016,.04,.28),new ue({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(u,f,d,m,p),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new Zt,l=new ue({color:14729103,roughness:.55}),h=new ue({color:2303531,roughness:.5,metalness:.6}),u=L(new te(.045,.036,1.3,20),l,.72,0);u.rotation.z=Math.PI/2;const f=L($e(.16,.11,.11,.012),h,.06,0),d=L($e(.03,.09,.08,.006),Rt(),.16,0),g=L($e(.05,.05,.24,.01),h,0,-.07);o.add(u,f,d,g);for(const _ of[-.09,0,.09]){const m=L($e(.04,.5,.025,.008),h,0,-.33,_),p=L(new qn(.016,.07,4),new ue({color:11844032,roughness:.25,metalness:1}),0,-.61,_);p.rotation.z=Math.PI,o.add(m,p)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=L(new te(.02,.02,1.2,12),vt(7041664),0,.75),l=L(new te(.025,.025,.5,12),vt(7041664),0,1.35);l.rotation.z=Math.PI/2;const h=new be(new ts(new Oo(.3,.05,4),200,.012,6,!1),vt(10265519));h.position.y=.15,r(o,l,h,L(new te(.25,.25,.04,32),An(5978660),0,.02));break}case"soil_sample":{r(L($e(.7,.08,.45,.02),Bt(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,h)=>{const u=L(new Wt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new ue({color:l,roughness:1}),-.22+h*.22,.08);u.scale.y=.55,r(u)});break}case"safety_goggles":{for(const o of[-1,1]){const l=L(new Wt(.085,24,16),new ue({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const h=L(new qt(.085,.014,10,32),Bt(1013358),o*.1,.08);r(l,h)}r(L(new qt(.2,.012,8,40,Math.PI),Bt(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=L(new te(.01,.01,.5,10),vt(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(L(new qt(.03,.008,8,20),vt(7041664),.26,.015));break}case"heat_proof_mat":{r(L($e(.8,.03,.8,.01),new ue({color:15197668,roughness:.95}),0,.015));break}default:r(L($e(.3,.3,.3,.03),An(10265519),0,.15))}s.traverse(o=>{o instanceof be&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new Bn;s.children.forEach(o=>{o instanceof Rn||a.expandByObject(o)});const c=_a(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function Nh(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new be(new ts(new ec(t,s,n),32,.014,8,!1),new ue({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const Nu=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],bv=Nu.flat(),Ev=i=>bv.find(e=>e.id===i);function wv(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const Tv=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",Av={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},Rv={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},Cv={class:"space-y-1"},Pv=["onClick"],Dv={class:"truncate"},Lv={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},Iv={class:"flex items-center justify-between gap-2 mb-2"},Nv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},Uv={class:"flex flex-wrap gap-1.5"},Fv=["onClick"],Ov={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Bv={class:"flex items-center gap-2"},zv={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},kv={class:"text-xs font-medium text-gray-400 ml-1"},Vv={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Hv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Gv=["max"],Wv={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Xv={class:"flex flex-wrap gap-1.5"},qv=["onClick"],Yv={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Zv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},$v={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},Kv={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},Jv={class:"flex gap-1.5"},jv=["onClick"],Qv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},ex=["value"],tx={class:"flex items-center justify-between"},nx={class:"flex gap-1.5"},ix={key:0,class:"pt-1"},sx={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},rx={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},ax={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},ox={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},lx={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},cx={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},hx={class:"flex flex-wrap gap-1.5"},ux={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},fx={class:"text-center"},dx={class:"flex items-center gap-2 flex-shrink-0"},px={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},mx={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},gx={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},_x=["max"],vx={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},xx={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},yx={class:"flex items-start justify-between gap-2"},Mx={class:"text-xs text-gray-700 dark:text-gray-200"},Sx={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},bx=.9,zo=5,Rx=Vu({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean},wallShelves:{type:Boolean},benchLength:{},sideBenches:{type:Boolean}},emits:["takeChemical","putBack","pickApparatus","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=Et(null),a=Et(!1);let c,o,l,h;const u=new Map,f=new $d,d=new ee,g=new yi(new N(0,1,0),0),_=Et(null),m=Et(null),p=Et(null),M=Et(null);let S=!1,y=0;const w={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},E=A=>{if(I.value==="stopwatch"){if(A==="switch_on")return"Start";if(A==="switch_off")return"Stop";if(A==="measure")return"Read Time"}if(I.value==="microscope"){if(A==="switch_on")return"Light On";if(A==="switch_off")return"Light Off";if(A==="inspect")return"Observe"}return w[A]||A},C=()=>new Map(n.objectCatalog.map(A=>[A.object_type,A])),v=Et([]),T=Et(""),I=Et(null),U=Et(null),H=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],j=["battery","dry_cell","accumulator"],J=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],B=new Map,Z=new Map,X=new Map,z=new Map,q=Et([...n.connections||[]]),se=Et(null),oe=Et(null),_e=Et(""),Ze=Et(0),_t=Et(100),Je=Et(null),ae=Et(!1),ve=Et(null),pe=Et(null),Ce=Et(null),Ge=new Map,Fe=new Map,xt=new Map,Qe=Et(50),fe=Et(40),me=Et("very_blurred"),ge=Et(!1),Ae=Et(!1),Me=new Map,Ke=new Map,ke=new Map,et=Et(0),rt=Et(0),O=Et(!1);let At=[];const gt={very_blurred:10,blurred:5,almost_focused:2,focused:0};function R(A){pe.value=A,Je.value="protractor",m.value="measure"}const x=Et(null),W=Et([]);function $(A){const P=C().get(A.object_type),D={...(P==null?void 0:P.default_props)||{},...A.props||{}},F=Bo(A.object_type,A.key,D.display_name||(P==null?void 0:P.display_name)||A.object_type,D);if(F.position.set(A.position.x,A.position.y,A.position.z),A.rotation&&(F.rotation.y=A.rotation.y),o.add(F),u.set(A.key,F),H.includes(A.object_type)){const V=ye(A.object_type,D);B.set(A.key,V),ne(A.key,V/Number(D.capacity_ml??250))}j.includes(A.object_type)&&Z.set(A.key,Number(D.voltage??6))}function ie(A){if(n.readOnly)return;const P=W.value.findIndex(F=>F.key===A);if(P===-1)return;const D=W.value[P];$(D),W.value.splice(P,1),s("action",{objectKey:A,action:"move",value:A})}function he(A){const P=n.sceneObjects.find(F=>F.key===A);if(!P)return{};const D=C().get(P.object_type);return{...(D==null?void 0:D.default_props)||{},...P.props||{}}}function ye(A,P){return P.current_volume!==void 0?Number(P.current_volume):J.includes(A)?Number(P.capacity_ml??50):0}function ne(A,P){const D=u.get(A);if(!D)return;const F=Math.max(.001,Math.min(1,P));D.traverse(V=>{if(V instanceof be&&V.userData.role==="liquid"){const re=V.userData.maxFillHeight;V.scale.y=F,V.position.y=re*F/2}})}function ce(A){const P=new Set([A]),D=[A];for(;D.length;){const F=D.shift();q.value.forEach(V=>{V.from===F&&!P.has(V.to)&&(P.add(V.to),D.push(V.to)),V.to===F&&!P.has(V.from)&&(P.add(V.from),D.push(V.from))})}return P}function Te(A){const P=n.sceneObjects.find(Ht=>j.includes(Ht.object_type)),D=n.sceneObjects.find(Ht=>Ht.object_type==="switch"),F=n.sceneObjects.find(Ht=>Ht.object_type==="resistor"),V=n.sceneObjects.find(Ht=>Ht.key===A);if(!V)return{value:0,reason:null};if(!P||!D||!F)return{value:0,reason:"The circuit is incomplete. Check your connections."};const re=ce(P.key),xe=re.has(D.key),tt=re.has(F.key),nt=re.has(A),yt=X.get(D.key)==="on";if(xe&&yt&&!tt)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!xe||!tt)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((X.get(P.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!yt)return{value:0,reason:"Close the switch before taking the reading."};if(!nt)return V.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:V.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const ft=Z.get(P.key)??he(P.key).voltage??6,st=he(F.key).resistance_ohm??10,ct=ft/st;return V.object_type==="ammeter"?{value:Math.round(ct*100)/100,reason:null}:V.object_type==="voltmeter"?{value:ft,reason:null}:{value:0,reason:null}}function We(A){const P=z.get(A);if(!P)return 25;const D=(Date.now()-P)/1e3;return Math.min(100,Math.round(25+D*3.5))}function Re(A,P){const D=u.get(A),F=u.get(P);if(!D||!F)return{ok:!1};if(D.position.distanceTo(F.position)>bx)return{ok:!1};const V=Ke.has(P)?Number(he(P).natural_length_cm??15)+(Ke.get(P)??0):he(P).length_cm??he(P).natural_length_cm??10,re=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((V+re)*10)/10}}function Ee(A){const P=Ge.get(A);if(!P)return"very_blurred";const D=Number(he(P).optimal_focus??50),F=Number(he(P).focus_tolerance??6),V=xt.get(A)??40,re=F*(40/V),xe=Fe.get(A)??0,tt=Math.abs(xe-D);return tt<=re?"focused":tt<=re*2?"almost_focused":tt<=re*4?"blurred":"very_blurred"}function Ve(A){_.value===A&&(Qe.value=Fe.get(A)??50,fe.value=xt.get(A)??40,ge.value=X.get(A)==="on",Ae.value=Ge.has(A),me.value=Ee(A))}function je(A){_.value&&(xt.set(_.value,A),s("action",{objectKey:_.value,action:"select_objective",value:String(A)}),Ve(_.value))}function at(A){_.value&&(Fe.set(_.value,A),s("action",{objectKey:_.value,action:"focus_coarse",value:String(Math.round(A))}),Ve(_.value))}function k(A){if(!_.value)return;const P=_.value,D=Math.max(0,Math.min(100,(Fe.get(P)??50)+A));Fe.set(P,D),s("action",{objectKey:P,action:"focus_fine",value:String(D)}),Ve(P)}function Se(A){const D=[...Me.get(A)??new Set].reduce((ft,st)=>ft+Number(he(st).mass_g??0),0),F=Number(he(A).spring_constant_n_per_m??40),re=D/1e3*9.8/F*100,xe=Number(he(A).max_safe_extension_cm??12),tt=ke.get(A)??0,nt=re>xe;nt&&tt===0&&ke.set(A,(re-xe)*.3);const yt=re+(ke.get(A)??0);return Ke.set(A,Math.round(yt*100)/100),le(A,yt),_.value===A&&(rt.value=D,et.value=Math.round(yt*100)/100,O.value=nt),{totalMassG:D,exceeded:nt}}function le(A,P){const D=u.get(A);D&&D.traverse(F=>{if(F instanceof be&&F.userData.role==="spring_body"){const V=F.userData.naturalLengthUnits,re=F.userData.maxLengthUnits,xe=Math.min(re,V+Math.max(0,P)*.05);F.scale.y=xe/re,F.position.y=.85-re*F.scale.y/2}if(F.userData.role==="spring_hanger"){const V=[...D.children].find(re=>re.userData.role==="spring_body");V&&(F.position.y=.85-V.userData.maxLengthUnits*V.scale.y)}})}function we(A){return new N(Math.sin(A),0,Math.cos(A))}function Le(A,P){return A.clone().sub(P.clone().multiplyScalar(2*A.dot(P)))}function de(A,P,D,F){let V=P.clone(),re=-V.dot(A);re<0&&(re=-re,V=V.clone().negate());const xe=D/F,tt=xe*xe*(1-re*re);if(tt>1)return null;const nt=Math.sqrt(1-tt);return A.clone().multiplyScalar(xe).add(V.clone().multiplyScalar(xe*re-nt))}function He(A,P){const D=u.get(A),F=u.get(P);if(!D||!F)return null;const V=D.position.clone(),re=we(D.rotation.y),xe=we(F.rotation.y),tt=re.dot(xe);if(Math.abs(tt)<.001)return null;const nt=F.position.clone().sub(V).dot(xe)/tt;if(nt<=.05)return null;const yt=V.clone().add(re.clone().multiplyScalar(nt));return yt.distanceTo(F.position)>.35?null:{point:yt,normal:xe,incidentDir:re}}function Oe(){At.forEach(A=>{o.remove(A),A instanceof be&&(A.geometry.dispose(),A.material.dispose())}),At=[]}function Ft(A,P,D){const F=A.clone().add(P).multiplyScalar(.5),V=Math.max(.01,A.distanceTo(P)),re=new be(new te(.006,.006,V,8),new ue({color:D,emissive:D,emissiveIntensity:.4,roughness:.4}));re.position.copy(F);const xe=P.clone().sub(A).normalize();return re.quaternion.copy(new Ai().setFromUnitVectors(new N(0,1,0),xe)),re}function Pt(){Oe();const A=n.sceneObjects.find(nt=>nt.object_type==="ray_box"),P=n.sceneObjects.find(nt=>nt.object_type==="mirror"),D=n.sceneObjects.find(nt=>nt.object_type==="glass_block"),F=P||D;if(!A||!F||X.get(A.key)!=="on")return;const V=He(A.key,F.key);if(!V)return;const re=u.get(A.key),xe=Ft(re.position,V.point,16498468),tt=Ft(V.point.clone().sub(V.normal.clone().multiplyScalar(.01)),V.point.clone().add(V.normal.clone().multiplyScalar(.4)),9741240);if(o.add(xe,tt),At.push(xe,tt),P){const nt=Le(V.incidentDir,V.normal),yt=Ft(V.point,V.point.clone().add(nt.multiplyScalar(1.2)),16498468);o.add(yt),At.push(yt)}else if(D){const nt=Number(he(D.key).refractive_index??1.5),yt=de(V.incidentDir,V.normal,1,nt);if(yt){const ft=V.point.clone().add(yt.clone().multiplyScalar(.4)),st=Ft(V.point,ft,6333946),ct=Ft(ft,ft.clone().add(V.incidentDir.clone().multiplyScalar(1)),16498468);o.add(st,ct),At.push(st,ct)}}}function Ln(A,P,D){const F=n.sceneObjects.find(ft=>ft.object_type==="ray_box");if(!F)return{ok:!1};const V=He(F.key,P);if(!V)return{ok:!1};const re=u.get(A);if(!re||re.position.distanceTo(V.point)>.4)return{ok:!1};let xe;if(D==="incidence")xe=V.incidentDir.clone().negate();else{const ft=n.sceneObjects.find(st=>st.key===P);if((ft==null?void 0:ft.object_type)==="glass_block"){const st=Number(he(P).refractive_index??1.5),ct=de(V.incidentDir,V.normal,1,st);if(!ct)return{ok:!1};xe=ct}else xe=Le(V.incidentDir,V.normal)}const tt=Math.abs(xe.normalize().dot(V.normal)),nt=Math.acos(Math.min(1,Math.max(-1,tt)))*180/Math.PI,yt=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((nt+yt)*10)/10}}const fn=new Map,as=new Map;function Dr(A){const P=u.get(A);if(!P)return;const D=fn.get(A),F=D?Number(he(D).mass_g??0):0;P.traverse(V=>{var re;if(V instanceof Rn&&V.userData.role==="balance_display"){const xe=V.material;(re=xe.map)==null||re.dispose(),xe.map=Oa(`${F.toFixed(1)} g`),xe.needsUpdate=!0}})}const Jn=new Map,Hi=new Map,Zs=new Map,$s=Et("00:00.0");function Ks(A){const P=Math.max(0,A)/1e3,D=Math.floor(P/60).toString().padStart(2,"0"),F=(P%60).toFixed(1).padStart(4,"0");return`${D}:${F}`}function kn(A){const P=Zs.get(A)??0;return Jn.get(A)?P+(Date.now()-(Hi.get(A)??Date.now())):P}function Gi(A){const P=u.get(A),D=kn(A);_.value===A&&($s.value=Ks(D)),P&&P.traverse(F=>{var V;if(F instanceof Rn&&F.userData.role==="stopwatch_display"){const re=F.material;(V=re.map)==null||V.dispose(),re.map=Oa(Ks(D)),re.needsUpdate=!0}})}function Lr(A){Jn.set(A,!1),Zs.set(A,0),Hi.delete(A),Gi(A)}function Js(A){u.forEach((P,D)=>{P.traverse(F=>{if(!(F instanceof be)||F.userData.role==="flame"||F.userData.role==="led")return;(Array.isArray(F.material)?F.material:[F.material]).forEach(re=>{re instanceof ue&&(re.emissive.setHex(D===A?2282478:0),re.emissiveIntensity=D===A?.3:0)})})})}function os(A){var F;_.value=A,M.value=null,p.value=null;const P=n.sceneObjects.find(V=>V.key===A),D=P?C().get(P.object_type):null;v.value=(D==null?void 0:D.supported_actions)??[],T.value=((F=P==null?void 0:P.props)==null?void 0:F.display_name)??(D==null?void 0:D.display_name)??A,I.value=(P==null?void 0:P.object_type)??null,U.value=(P==null?void 0:P.object_type)==="battery"?Z.get(A)??he(A).voltage??6:null,(P==null?void 0:P.object_type)==="microscope"&&Ve(A),(P==null?void 0:P.object_type)==="spring"&&Se(A),Js(A)}function Wi(){_.value=null,M.value=null,se.value=null,I.value=null,Js(null)}function ls(A){if(!_.value)return;U.value=A,Z.set(_.value,A);const P=u.get(_.value);P&&P.traverse(D=>{var F;if(D instanceof Rn&&D.userData.role==="voltage"){const V=D.material;(F=V.map)==null||F.dispose(),V.map=Iu(A),V.needsUpdate=!0}})}function Ir(A){const P=n.sceneObjects.find(F=>F.key===A);if(!P)return;const D=P.object_type;if(ae.value=!1,ve.value=A,H.includes(D)){se.value="readonly",_e.value="ml",oe.value=Math.round(B.get(A)??0),M.value=A;return}if(D==="ammeter"||D==="voltmeter"){const F=Te(A);F.reason&&(Ce.value=F.reason,setTimeout(()=>{Ce.value=null},4e3)),se.value="readonly",_e.value=D==="ammeter"?"A":"V",oe.value=F.value,M.value=A,ae.value=!!F.reason&&F.reason.includes("Short circuit");return}if(D==="balance"){se.value="readonly",_e.value="g";const F=fn.get(A);oe.value=F?Number(he(F).mass_g??0):0,M.value=A;return}if(D==="stopwatch"){se.value="readonly",_e.value="s",oe.value=Math.round(kn(A)/100)/10,M.value=A;return}if(D==="spring"){se.value="readonly",_e.value="cm";const F=Number(he(A).natural_length_cm??15);oe.value=Math.round((F+(Ke.get(A)??0))*10)/10,M.value=A,ve.value=A;return}if(D==="protractor"){pe.value="incidence",Je.value="protractor",m.value="measure";return}if(D==="ruler"||D==="metre_rule"||D==="thermometer"){Je.value=D==="thermometer"?"thermometer":"ruler",m.value="measure";return}se.value="slider",_e.value="ml",_t.value=Number(he(A).capacity_ml??100),Ze.value=Math.round(_t.value/2),M.value=A}function Nr(A){var P;if(_.value&&!n.readOnly&&!(A==="focus_coarse"||A==="focus_fine"||A==="select_objective")){if(A==="inspect"){const D=n.sceneObjects.find(tt=>tt.key===_.value),F=D?C().get(D.object_type):null;let V=(F==null?void 0:F.description)||"No further detail available.";const re=(P=D==null?void 0:D.props)!=null&&P.chemical_id?Ev(D.props.chemical_id):null;if(re&&D){const tt=re.hazard?` Hazard: ${re.hazard} - handle with care and wear goggles.`:"",nt=re.state==="liquid"?` About ${Math.round(B.get(D.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";V=`${re.name}${re.formula?` (${re.formula})`:""}.${nt}${tt}`}let xe=null;if(I.value==="microscope"){const tt=_.value,nt=Ge.get(tt),yt=xt.get(tt)??40;if(!nt)V="Place a specimen slide on the stage first.";else if(X.get(tt)!=="on")V="Switch on the illumination to see anything through the eyepiece.";else{const ft=Ee(tt),st=he(nt).expected_structures||"the specimen";ft==="focused"?V=`At ×${yt}, clearly focused - you can see ${st}.`:ft==="almost_focused"?V=`At ×${yt}, almost in focus - fine-tune the focus a little more.`:ft==="blurred"?V=`At ×${yt}, blurred - adjust the coarse and fine focus.`:V=`At ×${yt}, very blurred - use the focus knobs before observing.`,xe=ft}}p.value=V,s("action",{objectKey:_.value,action:A,value:xe});return}if(A==="zoom"){b(_.value),s("action",{objectKey:_.value,action:A,value:null});return}if(A==="switch_on"||A==="switch_off"){X.set(_.value,A==="switch_on"?"on":"off"),I.value==="stopwatch"&&(A==="switch_on"&&!Jn.get(_.value)?(Jn.set(_.value,!0),Hi.set(_.value,Date.now())):A==="switch_off"&&Jn.get(_.value)&&(Zs.set(_.value,kn(_.value)),Jn.set(_.value,!1)),Gi(_.value)),I.value==="microscope"&&Ve(_.value),I.value==="ray_box"&&Pt(),s("action",{objectKey:_.value,action:A,value:null});return}if(A==="measure"){Ir(_.value);return}if(A==="connect"||A==="pour"||A==="heat"||A==="move"||A==="rotate"){m.value=A,h.enabled=A!=="move"&&A!=="rotate";return}}}const Vn=Et("");dr(m,A=>{A==="connect"?Vn.value="Click the object to connect to.":A==="pour"?Vn.value="Click the container to pour into.":A==="heat"?Vn.value="Click the object to place over the flame.":A==="move"?Vn.value="Drag the object to reposition it, then click Done.":A==="rotate"?Vn.value="Drag left/right to rotate, then click Done.":A==="measure"&&Je.value==="ruler"?Vn.value="Click the object to measure - place the ruler close to it first.":A==="measure"&&Je.value==="thermometer"?Vn.value="Click the substance to take a temperature reading.":A==="measure"&&Je.value==="protractor"&&(Vn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function Ur(){if(!M.value)return;const A=se.value==="slider"?String(Math.round(Ze.value)):oe.value!==null?String(oe.value):null;s("action",{objectKey:M.value,action:"measure",value:A,unit:_e.value,label:T.value,safetyIssue:ae.value,targetObjectKey:ve.value}),M.value=null,se.value=null,oe.value=null,ae.value=!1,pe.value=null}function Xa(){if(x.value){qe();return}m.value=null,Je.value=null,pe.value=null,h.enabled=!0}function qa(){var A,P,D;if(!(!_.value||!m.value)){if(m.value==="move"){const F=u.get(_.value);let V=null;F&&u.forEach((st,ct)=>{ct!==_.value&&st.position.distanceTo(F.position)<.6&&(V=ct)});const re=_.value;fn.forEach((st,ct)=>{st===re&&ct!==V&&(fn.delete(ct),Dr(ct))});const xe=V?(A=n.sceneObjects.find(st=>st.key===V))==null?void 0:A.object_type:null;xe==="balance"&&V&&(fn.set(V,re),Dr(V)),as.forEach((st,ct)=>{if(ct===re&&st!==V){const Ht=Number(he(ct).volume_ml??0),cs=Math.max(0,(B.get(st)??0)-Ht);B.set(st,cs),ne(st,cs/Number(he(st).capacity_ml??250)),as.delete(ct)}});const tt=Number(he(re).volume_ml??0);if(xe&&H.includes(xe)&&V&&tt>0&&!as.has(re)){as.set(re,V);const st=(B.get(V)??0)+tt;B.set(V,st),ne(V,st/Number(he(V).capacity_ml??250))}const nt=(P=n.sceneObjects.find(st=>st.key===re))==null?void 0:P.object_type;if(Ge.forEach((st,ct)=>{st===re&&ct!==V&&Ge.delete(ct)}),xe==="microscope"&&V&&nt==="biological_model"){Ge.set(V,re);const st=Number(he(re).optimal_focus??50),ct=Number(he(re).focus_tolerance??6),Ht=Math.random()<.5?-1:1,cs=ct*(3+Math.random()*3)*Ht;Fe.set(V,Math.max(0,Math.min(100,st+cs))),xt.set(V,40),Ve(V)}let yt,ft=!1;if(nt==="mass_piece"){Me.forEach((ct,Ht)=>{ct.has(re)&&Ht!==V&&ct.delete(re)}),xe==="spring"&&V&&(Me.has(V)||Me.set(V,new Set),Me.get(V).add(re));const st=new Set(V&&xe==="spring"?[V]:[]);Me.forEach((ct,Ht)=>st.add(Ht)),st.forEach(ct=>{const Ht=Se(ct);V===ct&&(yt=Ht.totalMassG,ft=Ht.exceeded)}),ft&&(Ce.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Ce.value=null},4500))}["ray_box","mirror","glass_block"].includes(nt||"")&&Pt(),s("action",{objectKey:_.value,action:"move",value:V,springLoadG:yt,safetyIssue:ft})}else if(m.value==="rotate"){const F=u.get(_.value),V=F?Math.round(F.rotation.y*180/Math.PI):0,re=(D=n.sceneObjects.find(xe=>xe.key===_.value))==null?void 0:D.object_type;["ray_box","mirror","glass_block"].includes(re||"")&&Pt(),s("action",{objectKey:_.value,action:"rotate",value:String(V)})}m.value=null,h.enabled=!0}}function b(A){const P=u.get(A);if(!P)return;const D=P.position.clone().add(new N(0,.3,0)),F=l.position.clone().sub(h.target).normalize(),V=D.clone().add(F.multiplyScalar(1.4)),re=l.position.clone(),xe=h.target.clone();let tt=0;const nt=()=>{tt+=.05,l.position.lerpVectors(re,V,Math.min(tt,1)),h.target.lerpVectors(xe,D,Math.min(tt,1)),h.update(),tt<1&&requestAnimationFrame(nt)};nt()}function G(A){const P=c.domElement.getBoundingClientRect();d.x=(A.clientX-P.left)/P.width*2-1,d.y=-((A.clientY-P.top)/P.height)*2+1}function Q(){f.setFromCamera(d,l);const A=[];u.forEach(F=>A.push(F));const P=f.intersectObjects(A,!0);if(P.length===0)return null;let D=P[0].object;for(;D&&!D.userData.objectKey;)D=D.parent;return D?D.userData.objectKey:null}let Y=null;function K(A){if(G(A),Y={x:A.clientX,y:A.clientY},m.value==="move"&&_.value){S=!0;return}if(m.value==="rotate"&&_.value){S=!0,y=A.clientX;return}}function Pe(A){if(!(!S||!_.value)){if(G(A),m.value==="move"){f.setFromCamera(d,l);const P=new N;f.ray.intersectPlane(g,P);const D=u.get(_.value);D&&P&&(D.position.x=P.x,D.position.z=P.z)}else if(m.value==="rotate"){const P=A.clientX-y,D=u.get(_.value);D&&(D.rotation.y=P*.02)}}}function Ne(A){const P=Y&&(Math.abs(A.clientX-Y.x)>4||Math.abs(A.clientY-Y.y)>4);if(S=!1,m.value==="move"||m.value==="rotate"||P||(G(A),jn()))return;const D=Q();if(!D){Wi();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(D===_.value)return;const F=_.value,V=m.value;if(V==="measure"){if(Je.value==="ruler"){const re=Re(F,D);if(!re.ok){Ce.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Ce.value=null},3500);return}se.value="readonly",_e.value="cm",oe.value=re.value}else if(Je.value==="thermometer")se.value="readonly",_e.value="°C",oe.value=We(D);else if(Je.value==="protractor"){const re=pe.value??"incidence",xe=Ln(F,D,re);if(!xe.ok){Ce.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Ce.value=null},3500);return}se.value="readonly",_e.value="°",oe.value=xe.value}ve.value=D,M.value=F,m.value=null,Je.value=null,h.enabled=!0;return}if(V==="connect"){const re=u.get(F),xe=u.get(D);re&&xe&&o.add(Nh(re.position,xe.position)),q.value.push({from:F,to:D}),s("action",{objectKey:F,action:V,value:D}),m.value=null,h.enabled=!0;return}if(V==="heat"){z.set(D,Date.now()),s("action",{objectKey:F,action:V,value:D}),m.value=null,h.enabled=!0;return}if(V==="pour"){De(F,D);return}}os(D)}function De(A,P){var yt,ft,st,ct;const D=n.sceneObjects.find(Ht=>Ht.key===A),F=n.sceneObjects.find(Ht=>Ht.key===P);if(!D||!F)return;const V=Number(he(P).capacity_ml??250),re=B.get(P)??0,xe=Math.max(0,V-re),tt=H.includes(D.object_type),nt=tt?B.get(A)??0:xe;x.value={from:A,to:P,amount:0,max:Math.max(1,Math.round(Math.min(xe,nt))),fromLabel:((yt=D.props)==null?void 0:yt.display_name)??((ft=C().get(D.object_type))==null?void 0:ft.display_name)??D.object_type,toLabel:((st=F.props)==null?void 0:st.display_name)??((ct=C().get(F.object_type))==null?void 0:ct.display_name)??F.object_type,fromTracked:tt}}function ze(){if(!x.value)return;const{from:A,to:P,amount:D,fromTracked:F}=x.value,V=Number(he(P).capacity_ml??250);if(ne(P,((B.get(P)??0)+D)/V),F){const re=Number(he(A).capacity_ml??250);ne(A,Math.max(0,(B.get(A)??0)-D)/re)}}dr(()=>{var A;return(A=x.value)==null?void 0:A.amount},ze);function Xe(){if(!x.value)return;const{from:A,to:P,amount:D,fromTracked:F}=x.value;ot(A,P,D),B.set(P,Math.round((B.get(P)??0)+D)),F&&B.set(A,Math.max(0,Math.round((B.get(A)??0)-D))),s("action",{objectKey:P,action:"pour",value:String(Math.round(D))}),x.value=null,m.value=null,h.enabled=!0}function ot(A,P,D){if(D<=0)return;const F=ut(A),V=ut(P);if(!F||!V)return;const re=B.get(P)??0;V.color.lerp(F.color,re<=0?1:D/(re+D))}function ut(A){var D;let P=null;return(D=u.get(A))==null||D.traverse(F=>{!P&&F instanceof be&&F.userData.role==="liquid"&&(P=F.material)}),P}function qe(){if(x.value){const{from:A,to:P,fromTracked:D}=x.value,F=Number(he(P).capacity_ml??250);if(ne(P,(B.get(P)??0)/F),D){const V=Number(he(A).capacity_ml??250);ne(A,(B.get(A)??0)/V)}}x.value=null,m.value=null,h.enabled=!0}let Be=null;const Vt=Et(null);function Gt(){const A=r.value;if(!A)return;try{Be=cv(A,{unitScale:zo,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14,cupboard:!!n.cupboard,wallCabinets:!!n.wallShelves,benchLength:n.benchLength,sideBenches:!!n.sideBenches})}catch(D){console.error("Virtual Lab: failed to create a WebGL context",D),a.value=!0;return}c=Be.renderer,o=Be.scene,l=Be.camera,h=Be.controls,n.sceneObjects.forEach(D=>{if(D.in_tray){W.value.push(D);return}$(D)}),(n.connections||[]).forEach(D=>{const F=u.get(D.from),V=u.get(D.to);F&&V&&o.add(Nh(F.position,V.position))}),Pt(),bt(),di(),n.fixedView?Ou():cc(),c.domElement.addEventListener("pointerdown",K),c.domElement.addEventListener("pointermove",Pe),c.domElement.addEventListener("pointermove",hc),c.domElement.addEventListener("pointerup",Ne);let P=0;Be.onFrame(D=>{P+=D,P>.15&&(P=0,Jn.forEach((F,V)=>{F&&Gi(V)})),u.forEach((F,V)=>{const re=V===_.value||V===Vt.value;F.children.forEach(xe=>{xe.userData.role==="label"&&(xe.visible=re)})}),Ct.forEach((F,V)=>{F.children.forEach(re=>{re.userData.role==="label"&&(re.visible=V===dn)})}),En.forEach((F,V)=>{F.children.forEach(re=>{re.userData.role==="label"&&(re.visible=V===Xt)})})})}dr(()=>n.sceneObjects.map(A=>`${A.key}@${A.position.x},${A.position.z}`).join("|"),()=>{if(!Be)return;const A=new Map(n.sceneObjects.filter(D=>!D.in_tray).map(D=>[D.key,D]));let P=!1;u.forEach((D,F)=>{A.has(F)||(o.remove(D),D.traverse(V=>{var re;(V instanceof be||V instanceof Rn)&&((re=V.geometry)==null||re.dispose(),(Array.isArray(V.material)?V.material:[V.material]).forEach(tt=>{var nt;(nt=tt.map)==null||nt.dispose(),tt.dispose()}))}),u.delete(F),_.value===F&&Wi())}),A.forEach((D,F)=>{const V=u.get(F);V?V.position.set(D.position.x,D.position.y,D.position.z):($(D),P=!0)}),P&&!n.fixedView&&cc(),pn()});const Ct=new Map,sn=[];function Ue(A,P){const D=document.createElement("canvas");D.width=512,D.height=144;const F=D.getContext("2d");F.fillStyle="#fffdf4",F.fillRect(0,0,512,144),F.fillStyle="#1e3a8a",F.fillRect(0,0,512,10),F.fillStyle="#111827",F.textAlign="center",F.textBaseline="middle";let V=46;for(F.font=`bold ${V}px sans-serif`;F.measureText(A).width>490&&V>26;)V-=2,F.font=`bold ${V}px sans-serif`;if(F.measureText(A).width>490){const xe=A.split(" "),tt=Math.ceil(xe.length/2);F.fillText(xe.slice(0,tt).join(" "),256,P?42:52),F.fillText(xe.slice(tt).join(" "),256,P?80:96)}else F.fillText(A,256,P?54:76);P&&(F.font="bold 38px serif",F.fillStyle="#1e3a8a",F.fillText(P,256,118));const re=new wr(D);return re.colorSpace=hn,re.anisotropy=8,re}let dn=null;function bt(){const A=Be==null?void 0:Be.cupboard;A&&(Nu.forEach((P,D)=>{const F=A.bays[D<2?0:1],V=F.levels[D%2],re=(F.maxX-F.minX)/P.length;P.forEach((xe,tt)=>{const nt=Bo(Tv(xe),`cupboard:${xe.id}`,xe.name,wv(xe));nt.position.set(F.minX+re*(tt+.5),V,F.frontZ-.6),nt.userData.chemicalId=xe.id,nt.traverse(ft=>{ft instanceof be&&(ft.castShadow=!1,ft.receiveShadow=!1)}),o.add(nt),Ct.set(xe.id,nt);const yt=new be(new Dn(re*.92,.26),new ss({map:Ue(xe.name,xe.formula),toneMapped:!1}));yt.position.set(nt.position.x,V+.14,F.frontZ-.08),yt.rotation.x=-.35,yt.userData.chemicalId=xe.id,o.add(yt),sn.push(yt)})}),pn())}function pn(){const A=new Set(n.sceneObjects.map(D=>{var F;return(F=D.props)==null?void 0:F.chemical_id}).filter(Boolean));Ct.forEach((D,F)=>{D.visible=!A.has(F)});const P=new Set(n.sceneObjects.filter(D=>{var F;return!((F=D.props)!=null&&F.chemical_id)}).map(D=>D.object_type));En.forEach((D,F)=>{D.visible=!P.has(F)})}function bn(){const A=Be==null?void 0:Be.cupboard,P=Be==null?void 0:Be.wallCabinets;if(!A&&!P)return null;f.setFromCamera(d,l);const D=[];A&&D.push(...A.doors,...A.blockers),P&&D.push(...P.doors,...P.blockers),u.forEach(xe=>D.push(xe)),Ct.forEach(xe=>{xe.visible&&D.push(xe)}),sn.forEach(xe=>D.push(xe)),En.forEach(xe=>{xe.visible&&D.push(xe)});const F=f.intersectObjects(D,!0)[0];if(!F)return null;const V=Be.doorOf(F.object);if(V)return{kind:"door",door:V};let re=F.object;for(;re&&!re.userData.chemicalId&&!re.userData.shelfType;)re=re.parent;return re?re.userData.shelfType?{kind:"apparatus",type:re.userData.shelfType}:{kind:"chemical",id:re.userData.chemicalId}:null}function jn(){const A=bn();if(!A)return!1;if(A.kind==="apparatus")return s("pickApparatus",A.type),!0;if(A.kind==="chemical"){const P=n.sceneObjects.find(D=>{var F;return((F=D.props)==null?void 0:F.chemical_id)===A.id});return P?s("putBack",P.key):s("takeChemical",A.id),!0}return Be.toggleDoor(A.door),!0}const En=new Map,Dt=[];let Xt=null;const Qn=[[{key:"physics",label:"Physics"},{key:"general",label:"General"}],[{key:"chemistry",label:"Chemistry"},{key:"biology",label:"Biology"},{key:"agriculture",label:"Agriculture"}]],Ot=["physics","chemistry","biology","agriculture"];function Hn(A){o.remove(A),A.traverse(P=>{var D;(P instanceof be||P instanceof Rn)&&((D=P.geometry)==null||D.dispose(),(Array.isArray(P.material)?P.material:[P.material]).forEach(V=>{var re;(re=V.map)==null||re.dispose(),V.dispose()}))})}function di(){const A=Be==null?void 0:Be.wallCabinets;if(!A)return;En.forEach(Hn),En.clear(),Dt.splice(0).forEach(Hn);const P=n.objectCatalog.filter(F=>F.id>0&&F.is_active!==!1),D=F=>Ot.includes(F.category)?F.category:"general";A.cabinets.forEach((F,V)=>{const re=Qn[V].map(ft=>({...ft,items:P.filter(st=>D(st)===ft.key).sort((st,ct)=>st.display_name.localeCompare(ct.display_name))})).filter(ft=>ft.items.length>0);let xe=8;const tt=()=>re.flatMap(ft=>{const st=[];for(let ct=0;ct<ft.items.length;ct+=xe)st.push({label:ft.label,items:ft.items.slice(ct,ct+xe)});return st});let nt=tt();for(;nt.length>F.rows.length;)xe++,nt=tt();const yt=(F.maxX-F.minX)/xe;nt.forEach((ft,st)=>{const ct=F.rows[st];ft.items.forEach((hs,ku)=>{const Ci=Bo(hs.object_type,`shelf:${hs.object_type}`,hs.display_name,hs.default_props||{}),js=new Bn;Ci.children.forEach(ei=>{ei instanceof Rn||js.expandByObject(ei)});const Ya=js.getSize(new N),uc=js.getCenter(new N),Xi=Math.min(1,yt*.84/Math.max(Ya.x,.01),F.rowHeight*.8/Math.max(Ya.y,.01),F.depth*.9/Math.max(Ya.z,.01));Ci.scale.setScalar(Xi),Ci.position.set(F.minX+yt*(ku+.5)-uc.x*Xi,ct-js.min.y*Xi,F.z-uc.z*Xi),Ci.children.forEach(ei=>{ei.userData.role==="label"&&(ei.scale.set(.72/Xi,.158/Xi,1),ei.position.y=js.max.y+.2/Xi,ei.visible=!1)}),Ci.traverse(ei=>{ei instanceof be&&(ei.castShadow=!1)}),Ci.userData.shelfType=hs.object_type,o.add(Ci),En.set(hs.object_type,Ci)}),pn();const Ht=new be(new Dn(F.maxX-F.minX,.17),new ss({map:Fr(ft.label),toneMapped:!1})),cs=st===F.rows.length-1?F.frontZ+.03*zo+.005:F.frontZ+.005;Ht.position.set((F.minX+F.maxX)/2,ct-.085,cs),o.add(Ht),Dt.push(Ht)})})}function Fr(A){const P=document.createElement("canvas");P.width=1024,P.height=64;const D=P.getContext("2d"),F=D.createLinearGradient(0,0,0,64);F.addColorStop(0,"#f6d98b"),F.addColorStop(1,"#c9962f"),D.fillStyle=F,D.fillRect(0,0,1024,64),D.fillStyle="#3b2606",D.font="bold 50px sans-serif",D.textBaseline="middle",D.fillText(A.toUpperCase(),24,35);const V=new wr(P);return V.colorSpace=hn,V.anisotropy=8,V}dr(()=>n.objectCatalog.map(A=>A.object_type).join(","),()=>{Be&&di()});const Uu=Xu(()=>{var A,P;return!!((P=(A=n.sceneObjects.find(D=>D.key===_.value))==null?void 0:A.props)!=null&&P.chemical_id)});function Fu(){const A=_.value;A&&(Wi(),s("putBack",A))}function Ou(){if(!Be)return;const A=zo,P=Be.benchLength/2,D=Be.wallCabinets?new Bn(new N(-(P+.25)*A,-.9*A,-.6*A),new N((P+.25)*A,1.4*A,.375*A)):new Bn(new N(-P*A,-.9*A,-.375*A),new N(P*A,.1*A,.375*A));Be.fitBox(D,Be.wallCabinets?.94:.72,{dir:new N(.4,Be.wallCabinets?3.4:4.2,6.4)})}function cc(){if(!Be||u.size===0)return;o.updateMatrixWorld(!0);const A=new Bn;u.forEach(P=>P.children.forEach(D=>{D.userData.role!=="label"&&A.expandByObject(D)})),Be.frameBox(A)}function hc(A){if(S)return;G(A),Vt.value=Q();const P=Vt.value?null:bn();dn=(P==null?void 0:P.kind)==="chemical"?P.id:null,Xt=(P==null?void 0:P.kind)==="apparatus"?P.type:null,c.domElement.style.cursor=Vt.value||P?"pointer":"grab"}function Bu(A,P){(P.state==="on"||P.state==="off")&&X.set(A,P.state);const D=u.get(A);D&&D.traverse(F=>{if(F.userData.role==="lever"&&"state"in P){const V=P.state==="on"||P.state==="closed";F.rotation.z=V?Math.PI/2-.35:Math.PI/2-.9,F.position.x=V?0:-.06}if(F.userData.role==="led"&&"state"in P&&F instanceof be){const V=F.material;V.emissiveIntensity=P.state==="on"?1.2:0}if(F.userData.role==="flame"&&"flame"in P&&F instanceof be){const V=F.material;V.emissiveIntensity=P.flame==="on"?1:0,V.opacity=P.flame==="on"?.9:0}})}e({setObjectState:Bu});function zu(){a.value=!1,qu(Gt)}return Uh(Gt),Fh(()=>{c==null||c.domElement.removeEventListener("pointerdown",K),c==null||c.domElement.removeEventListener("pointermove",Pe),c==null||c.domElement.removeEventListener("pointermove",hc),c==null||c.domElement.removeEventListener("pointerup",Ne),Be==null||Be.dispose(),Be=null}),(A,P)=>(Nt(),It("div",Av,[a.value?(Nt(),It("div",Rv,[fc(Yu,{name:"beaker",class:"w-8 h-8"}),P[9]||(P[9]=Ye("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),Ye("button",{onClick:zu,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(Nt(),It("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),W.value.length>0?(Nt(),It("div",{key:2,class:Qs(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||x.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[P[10]||(P[10]=Ye("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),Ye("div",Cv,[(Nt(!0),It(us,null,Or(W.value,D=>{var F,V;return Nt(),It("button",{key:D.key,onClick:re=>ie(D.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[Ye("span",null,Yt(((F=C().get(D.object_type))==null?void 0:F.icon)||"🔬"),1),Ye("span",Dv,Yt(((V=C().get(D.object_type))==null?void 0:V.display_name)||D.object_type),1)],8,Pv)}),128))])],2)):ln("",!0),_.value&&!m.value?(Nt(),It("div",Lv,[Ye("div",Iv,[Ye("p",Nv,Yt(T.value),1),Ye("button",{onClick:Wi,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),Ye("div",Uv,[(Nt(!0),It(us,null,Or(v.value,D=>(Nt(),It("button",{key:D,onClick:F=>Nr(D),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},Yt(E(D)),9,Fv))),128)),i.cupboard?(Nt(),It("button",{key:0,onClick:Fu,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},Yt(Uu.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):ln("",!0)]),M.value&&se.value==="readonly"?(Nt(),It("div",Ov,[P[11]||(P[11]=Ye("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),Ye("div",Bv,[Ye("span",zv,[Br(Yt(oe.value),1),Ye("span",kv,Yt(_e.value),1)]),Ye("button",{onClick:Ur,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):ln("",!0),M.value&&se.value==="slider"?(Nt(),It("div",Vv,[Ye("p",Hv,"Reading: "+Yt(Math.round(Ze.value))+Yt(_e.value),1),dc(Ye("input",{"onUpdate:modelValue":P[0]||(P[0]=D=>Ze.value=D),type:"range",min:"0",max:_t.value,step:"1",class:"w-full accent-emerald-600"},null,8,Gv),[[pc,Ze.value,void 0,{number:!0}]]),Ye("button",{onClick:Ur,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):ln("",!0),I.value==="battery"?(Nt(),It("div",Wv,[P[12]||(P[12]=Ye("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),Ye("div",Xv,[(Nt(),It(us,null,Or([1.5,3,6,9,12],D=>Ye("button",{key:D,onClick:F=>ls(D),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",U.value===D?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},Yt(D)+"V",11,qv)),64))])])):ln("",!0),I.value==="stopwatch"?(Nt(),It("div",Yv,[Ye("p",Zv,"Elapsed: "+Yt($s.value),1),Ye("button",{onClick:P[1]||(P[1]=D=>Lr(_.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):ln("",!0),I.value==="microscope"?(Nt(),It("div",$v,[Ae.value?(Nt(),It(us,{key:1},[Ye("div",null,[P[13]||(P[13]=Ye("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),Ye("div",Jv,[(Nt(),It(us,null,Or([40,100,400],D=>Ye("button",{key:D,onClick:F=>je(D),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",fe.value===D?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+Yt(D),11,jv)),64))])]),Ye("div",null,[Ye("p",Qv,"Coarse Focus: "+Yt(Math.round(Qe.value)),1),Ye("input",{value:Qe.value,onChange:P[2]||(P[2]=D=>at(Number(D.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,ex)]),Ye("div",tx,[P[14]||(P[14]=Ye("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),Ye("div",nx,[Ye("button",{onClick:P[3]||(P[3]=D=>k(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),Ye("button",{onClick:P[4]||(P[4]=D=>k(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),ge.value?(Nt(),It("div",ix,[P[16]||(P[16]=Ye("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),Ye("div",sx,[Ye("div",{class:"absolute inset-0 flex items-center justify-center",style:Hu({filter:`blur(${gt[me.value]}px)`})},[...P[15]||(P[15]=[Ye("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),Ye("p",rx,Yt(me.value.replace("_"," "))+" · ×"+Yt(fe.value),1)])):ln("",!0)],64)):(Nt(),It("div",Kv,"Place a specimen slide on the stage first."))])):ln("",!0),I.value==="spring"?(Nt(),It("div",ax,[Ye("p",ox,"Attached Load: "+Yt(rt.value)+" g · Extension: "+Yt(et.value)+" cm",1),O.value?(Nt(),It("p",lx,"Beyond the spring's safe extension limit.")):ln("",!0)])):ln("",!0),I.value==="protractor"?(Nt(),It("div",cx,[P[17]||(P[17]=Ye("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),Ye("div",hx,[Ye("button",{onClick:P[5]||(P[5]=D=>R("incidence")),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",pe.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),Ye("button",{onClick:P[6]||(P[6]=D=>R("outgoing")),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",pe.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):ln("",!0)])):ln("",!0),m.value&&!x.value?(Nt(),It("div",ux,[Ye("span",fx,Yt(Vn.value),1),Ye("span",dx,[m.value==="move"||m.value==="rotate"?(Nt(),It("button",{key:0,onClick:qa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):ln("",!0),Ye("button",{onClick:Xa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):ln("",!0),x.value?(Nt(),It("div",px,[Ye("p",mx,"Pouring "+Yt(x.value.fromLabel)+" → "+Yt(x.value.toLabel),1),Ye("p",gx,[Br(Yt(Math.round(x.value.amount))+" ",1),P[18]||(P[18]=Ye("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),dc(Ye("input",{"onUpdate:modelValue":P[7]||(P[7]=D=>x.value.amount=D),type:"range",min:"0",max:x.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,_x),[[pc,x.value.amount,void 0,{number:!0}]]),Ye("div",{class:"flex items-center gap-2 mt-2"},[Ye("button",{onClick:qe,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),Ye("button",{onClick:Xe,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):ln("",!0),fc(Gu,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:Wu(()=>[Ce.value?(Nt(),It("div",vx,Yt(Ce.value),1)):ln("",!0)]),_:1}),p.value?(Nt(),It("div",xx,[Ye("div",yx,[Ye("p",Mx,Yt(p.value),1),Ye("button",{onClick:P[8]||(P[8]=D=>p.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):ln("",!0),Ye("p",Sx,[P[19]||(P[19]=Br(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard||i.wallShelves?(Nt(),It(us,{key:0},[Br(" · Click a door to open it")],64)):ln("",!0)])]))}});export{hn as A,wt as B,te as C,Jt as D,Ol as E,Fa as F,Zt as G,xu as H,Bo as I,nd as L,be as M,Z_ as O,yi as P,ec as Q,$d as R,Wt as S,qt as T,N as V,q_ as W,Rx as _,wv as a,Tv as b,Ev as c,cv as d,Pr as e,ue as f,Cr as g,Ji as h,ss as i,nn as j,Ax as k,Wa as l,ru as m,ts as n,Kn as o,Su as p,Dn as q,ht as r,vv as s,xi as t,Tx as u,ee as v,lu as w,_u as x,Qh as y,Cn as z};
