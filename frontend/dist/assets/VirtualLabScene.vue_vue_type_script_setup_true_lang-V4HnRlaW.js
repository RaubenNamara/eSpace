import{Q as Mr,o as Zh,m as Ko,r as It,d as sf,c as kt,A as Ac,a as tt,f as ar,F as xs,k as qr,e as cn,t as Jt,C as Yr,g as Rc,p as Cc,x as rf,T as af,z as of,h as lf,n as cf,j as zt}from"./index-t6CZJLP0.js";import{_ as hf}from"./AppIcon.vue_vue_type_script_setup_true_lang-D7tRwu-a.js";function Gx(){const i=It(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return Mr(i,r=>{document.body.style.overflow=r?"hidden":""}),Zh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),Ko(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yl="185",Gs={ROTATE:0,DOLLY:1,PAN:2},Vs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},uf=0,Pc=1,ff=2,Tr=1,df=2,br=3,Yi=0,wn=1,Zt=2,Pi=0,Ws=1,Ic=2,Dc=3,Lc=4,pf=5,as=100,mf=101,gf=102,_f=103,vf=104,xf=200,yf=201,Mf=202,bf=203,Jo=204,jo=205,Sf=206,wf=207,Ef=208,Tf=209,Af=210,Rf=211,Cf=212,Pf=213,If=214,Qo=0,el=1,tl=2,Zs=3,nl=4,il=5,sl=6,rl=7,Zl=0,Df=1,Lf=2,mi=0,$h=1,Kh=2,Jh=3,$l=4,jh=5,Qh=6,eu=7,tu=300,us=301,$s=302,no=303,io=304,Za=306,vn=1e3,Ci=1001,al=1002,fn=1003,Nf=1004,Zr=1005,xn=1006,so=1007,ls=1008,Nn=1009,nu=1010,iu=1011,Pr=1012,Kl=1013,vi=1014,ti=1015,Li=1016,Jl=1017,jl=1018,Ir=1020,su=35902,ru=35899,au=1021,ou=1022,ni=1023,Ni=1026,cs=1027,Ql=1028,ec=1029,fs=1030,tc=1031,nc=1033,Ra=33776,Ca=33777,Pa=33778,Ia=33779,ol=35840,ll=35841,cl=35842,hl=35843,ul=36196,fl=37492,dl=37496,pl=37488,ml=37489,Na=37490,gl=37491,_l=37808,vl=37809,xl=37810,yl=37811,Ml=37812,bl=37813,Sl=37814,wl=37815,El=37816,Tl=37817,Al=37818,Rl=37819,Cl=37820,Pl=37821,Il=36492,Dl=36494,Ll=36495,Nl=36283,Ul=36284,Ua=36285,Fl=36286,Uf=3200,Fa=0,Ff=1,Xi="",un="srgb",Oa="srgb-linear",Ba="linear",Vt="srgb",ys=7680,Nc=519,Of=512,Bf=513,kf=514,ic=515,zf=516,Vf=517,sc=518,Hf=519,Ol=35044,Uc="300 es",pi=2e3,Dr=2001;function Gf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ka(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wf(){const i=ka("canvas");return i.style.display="block",i}const Fc={};function za(...i){const e="THREE."+i.shift();console.log(e,...i)}function lu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ht(...i){i=lu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function At(...i){i=lu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Xs(...i){const e=i.join(" ");e in Fc||(Fc[e]=!0,ht(...i))}function Xf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const qf={[Qo]:el,[tl]:sl,[nl]:rl,[Zs]:il,[el]:Qo,[sl]:tl,[rl]:nl,[il]:Zs};class $i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Da=Math.PI/180,Bl=180/Math.PI;function Ii(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function Mt(i,e,t){return Math.max(e,Math.min(t,i))}function Yf(i,e){return(i%e+e)%e}function ro(i,e,t){return(1-t)*i+t*e}function di(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Zf={DEG2RAD:Da},gc=class gc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};gc.prototype.isVector2=!0;let J=gc;class Ui{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||o!==h||l!==d||u!==g){let m=o*h+l*d+u*g+f*_;m<0&&(h=-h,d=-d,g=-g,_=-_,m=-m);let p=1-c;if(m<.9995){const M=Math.acos(m),y=Math.sin(M);p=Math.sin(p*M)/y,c=Math.sin(c*M)/y,o=o*p+h*c,l=l*p+d*c,u=u*p+g*c,f=f*p+_*c}else{o=o*p+h*c,l=l*p+d*c,u=u*p+g*c,f=f*p+_*c;const M=1/Math.sqrt(o*o+l*l+u*u+f*f);o*=M,l*=M,u*=M,f*=M}}e[t]=o,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],u=n[s+3],f=r[a],h=r[a+1],d=r[a+2],g=r[a+3];return e[t]=c*g+u*f+o*d-l*h,e[t+1]=o*g+u*h+l*f-c*d,e[t+2]=l*g+u*d+c*h-o*f,e[t+3]=u*g-c*f-o*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),u=c(s/2),f=c(r/2),h=o(n/2),d=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:ht("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],u=t[6],f=t[10],h=n+c+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-o)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>c&&n>f){const d=2*Math.sqrt(1+n-c-f);this._w=(u-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(c>f){const d=2*Math.sqrt(1+c-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+u)/d}else{const d=2*Math.sqrt(1+f-n-c);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(o+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,u=t._w;return this._x=n*u+a*c+s*l-r*o,this._y=s*u+a*o+r*c-n*l,this._z=r*u+a*l+n*o-s*c,this._w=a*u-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),u=Math.sin(l);o=Math.sin(o*l)/u,t=Math.sin(t*l)/u,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const _c=class _c{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Oc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Oc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),u=2*(c*t-r*s),f=2*(r*n-a*t);return this.x=t+o*l+a*f-c*u,this.y=n+o*u+c*l-r*f,this.z=s+o*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ao.copy(this).projectOnVector(e),this.sub(ao)}reflect(e){return this.sub(ao.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};_c.prototype.isVector3=!0;let I=_c;const ao=new I,Oc=new Ui,vc=class vc{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=c,u[3]=t,u[4]=r,u[5]=o,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],y=s[4],x=s[7],E=s[2],w=s[5],R=s[8];return r[0]=a*_+c*M+o*E,r[3]=a*m+c*y+o*w,r[6]=a*p+c*x+o*R,r[1]=l*_+u*M+f*E,r[4]=l*m+u*y+f*w,r[7]=l*p+u*x+f*R,r[2]=h*_+d*M+g*E,r[5]=h*m+d*y+g*w,r[8]=h*p+d*x+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],u=e[8];return t*a*u-t*c*l-n*r*u+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],u=e[8],f=u*a-c*l,h=c*o-u*r,d=l*r-a*o,g=t*f+n*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-u*n)*_,e[2]=(c*n-s*a)*_,e[3]=h*_,e[4]=(u*t-s*o)*_,e[5]=(s*r-c*t)*_,e[6]=d*_,e[7]=(n*o-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(oo.makeScale(e,t)),this}rotate(e){return Xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(oo.makeRotation(-e)),this}translate(e,t){return Xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(oo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};vc.prototype.isMatrix3=!0;let _t=vc;const oo=new _t,Bc=new _t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kc=new _t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $f(){const i={enabled:!0,workingColorSpace:Oa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Vt&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Vt&&(s.r=qs(s.r),s.g=qs(s.g),s.b=qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xi?Ba:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Oa]:{primaries:e,whitePoint:n,transfer:Ba,toXYZ:Bc,fromXYZ:kc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:e,whitePoint:n,transfer:Vt,toXYZ:Bc,fromXYZ:kc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}const Dt=$f();function Di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ms;class Kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=ka("canvas")),Ms.width=e.width,Ms.height=e.height;const s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ka("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Di(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Di(t[n]/255)*255):t[n]=Di(t[n]);return{data:t,width:e.width,height:e.height}}else return ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jf=0;class rc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(lo(s[a].image)):r.push(lo(s[a]))}else r=lo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function lo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ht("Texture: Unable to serialize Texture."),{})}let jf=0;const co=new I;class yn extends $i{constructor(e=yn.DEFAULT_IMAGE,t=yn.DEFAULT_MAPPING,n=Ci,s=Ci,r=xn,a=ls,c=ni,o=Nn,l=yn.DEFAULT_ANISOTROPY,u=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Ii(),this.name="",this.source=new rc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new _t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(co).x}get height(){return this.source.getSize(co).y}get depth(){return this.source.getSize(co).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ht(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ht(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vn:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case al:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vn:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case al:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=tu;yn.DEFAULT_ANISOTROPY=1;const xc=class xc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],u=o[4],f=o[8],h=o[1],d=o[5],g=o[9],_=o[2],m=o[6],p=o[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,x=(d+1)/2,E=(p+1)/2,w=(u+h)/4,R=(f+_)/4,v=(g+m)/4;return y>x&&y>E?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=R/n):x>E?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=v/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=R/r,s=v/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(h-u)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this.w=Mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this.w=Mt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xc.prototype.isVector4=!0;let jt=xc;class Qf extends $i{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new jt(0,0,e,t),this.scissorTest=!1,this.viewport=new jt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new yn(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new rc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends Qf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class cu extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ed extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ya=class Ya{constructor(e,t,n,s,r,a,c,o,l,u,f,h,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,u,f,h,d,g,_,m)}set(e,t,n,s,r,a,c,o,l,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=o,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ya().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/bs.setFromMatrixColumn(e,0).length(),r=1/bs.setFromMatrixColumn(e,1).length(),a=1/bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,d=a*f,g=c*u,_=c*f;t[0]=o*u,t[4]=-o*f,t[8]=l,t[1]=d+g*l,t[5]=h-_*l,t[9]=-c*o,t[2]=_-h*l,t[6]=g+d*l,t[10]=a*o}else if(e.order==="YXZ"){const h=o*u,d=o*f,g=l*u,_=l*f;t[0]=h+_*c,t[4]=g*c-d,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-c,t[2]=d*c-g,t[6]=_+h*c,t[10]=a*o}else if(e.order==="ZXY"){const h=o*u,d=o*f,g=l*u,_=l*f;t[0]=h-_*c,t[4]=-a*f,t[8]=g+d*c,t[1]=d+g*c,t[5]=a*u,t[9]=_-h*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const h=a*u,d=a*f,g=c*u,_=c*f;t[0]=o*u,t[4]=g*l-d,t[8]=h*l+_,t[1]=o*f,t[5]=_*l+h,t[9]=d*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const h=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=a*u,t[9]=-c*u,t[2]=-l*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*u,t[4]=-f,t[8]=l*u,t[1]=h*f+_,t[5]=a*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=c*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(td,e,nd)}lookAt(e,t,n){const s=this.elements;return Cn.subVectors(e,t),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Oi.crossVectors(n,Cn),Oi.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Oi.crossVectors(n,Cn)),Oi.normalize(),$r.crossVectors(Cn,Oi),s[0]=Oi.x,s[4]=$r.x,s[8]=Cn.x,s[1]=Oi.y,s[5]=$r.y,s[9]=Cn.y,s[2]=Oi.z,s[6]=$r.z,s[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],x=n[11],E=n[15],w=s[0],R=s[4],v=s[8],T=s[12],P=s[1],N=s[5],O=s[9],Z=s[13],K=s[2],B=s[6],$=s[10],G=s[14],ie=s[3],le=s[7],re=s[11],fe=s[15];return r[0]=a*w+c*P+o*K+l*ie,r[4]=a*R+c*N+o*B+l*le,r[8]=a*v+c*O+o*$+l*re,r[12]=a*T+c*Z+o*G+l*fe,r[1]=u*w+f*P+h*K+d*ie,r[5]=u*R+f*N+h*B+d*le,r[9]=u*v+f*O+h*$+d*re,r[13]=u*T+f*Z+h*G+d*fe,r[2]=g*w+_*P+m*K+p*ie,r[6]=g*R+_*N+m*B+p*le,r[10]=g*v+_*O+m*$+p*re,r[14]=g*T+_*Z+m*G+p*fe,r[3]=M*w+y*P+x*K+E*ie,r[7]=M*R+y*N+x*B+E*le,r[11]=M*v+y*O+x*$+E*re,r[15]=M*T+y*Z+x*G+E*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=o*d-l*h,y=c*d-l*f,x=c*h-o*f,E=a*d-l*u,w=a*h-o*u,R=a*f-c*u;return t*(_*M-m*y+p*x)-n*(g*M-m*E+p*w)+s*(g*y-_*E+p*R)-r*(g*x-_*w+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],u=e[10];return t*(a*u-c*l)-n*(r*u-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*c-n*a,y=t*o-s*a,x=t*l-r*a,E=n*o-s*c,w=n*l-r*c,R=s*l-r*o,v=u*_-f*g,T=u*m-h*g,P=u*p-d*g,N=f*m-h*_,O=f*p-d*_,Z=h*p-d*m,K=M*Z-y*O+x*N+E*P-w*T+R*v;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/K;return e[0]=(c*Z-o*O+l*N)*B,e[1]=(s*O-n*Z-r*N)*B,e[2]=(_*R-m*w+p*E)*B,e[3]=(h*w-f*R-d*E)*B,e[4]=(o*P-a*Z-l*T)*B,e[5]=(t*Z-s*P+r*T)*B,e[6]=(m*x-g*R-p*y)*B,e[7]=(u*R-h*x+d*y)*B,e[8]=(a*O-c*P+l*v)*B,e[9]=(n*P-t*O-r*v)*B,e[10]=(g*w-_*x+p*M)*B,e[11]=(f*x-u*w-d*M)*B,e[12]=(c*T-a*N-o*v)*B,e[13]=(t*N-n*T+s*v)*B,e[14]=(_*y-g*E-m*M)*B,e[15]=(u*E-f*y+h*M)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,u=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,u*c+n,u*o-s*a,0,l*o-s*c,u*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,u=a+a,f=c+c,h=r*l,d=r*u,g=r*f,_=a*u,m=a*f,p=c*f,M=o*l,y=o*u,x=o*f,E=n.x,w=n.y,R=n.z;return s[0]=(1-(_+p))*E,s[1]=(d+x)*E,s[2]=(g-y)*E,s[3]=0,s[4]=(d-x)*w,s[5]=(1-(h+p))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+y)*R,s[9]=(m-M)*R,s[10]=(1-(h+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=bs.set(s[0],s[1],s[2]).length();const c=bs.set(s[4],s[5],s[6]).length(),o=bs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),$n.copy(this);const l=1/a,u=1/c,f=1/o;return $n.elements[0]*=l,$n.elements[1]*=l,$n.elements[2]*=l,$n.elements[4]*=u,$n.elements[5]*=u,$n.elements[6]*=u,$n.elements[8]*=f,$n.elements[9]*=f,$n.elements[10]*=f,t.setFromRotationMatrix($n),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=pi,o=!1){const l=this.elements,u=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let g,_;if(o)g=r/(a-r),_=a*r/(a-r);else if(c===pi)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(c===Dr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=pi,o=!1){const l=this.elements,u=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,_;if(o)g=1/(a-r),_=a/(a-r);else if(c===pi)g=-2/(a-r),_=-(a+r)/(a-r);else if(c===Dr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ya.prototype.isMatrix4=!0;let Bt=Ya;const bs=new I,$n=new Bt,td=new I(0,0,0),nd=new I(1,1,1),Oi=new I,$r=new I,Cn=new I,zc=new Bt,Vc=new Ui;class Fi{constructor(e=0,t=0,n=0,s=Fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Mt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-Mt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vc.setFromEuler(this),this.setFromQuaternion(Vc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fi.DEFAULT_ORDER="XYZ";class ac{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let id=0;const Hc=new I,Ss=new Ui,bi=new Bt,Kr=new I,or=new I,sd=new I,rd=new Ui,Gc=new I(1,0,0),Wc=new I(0,1,0),Xc=new I(0,0,1),qc={type:"added"},ad={type:"removed"},ws={type:"childadded",child:null},ho={type:"childremoved",child:null};class nn extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const e=new I,t=new Fi,n=new Ui,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Bt},normalMatrix:{value:new _t}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ac,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Gc,e)}rotateY(e){return this.rotateOnAxis(Wc,e)}rotateZ(e){return this.rotateOnAxis(Xc,e)}translateOnAxis(e,t){return Hc.copy(e).applyQuaternion(this.quaternion),this.position.add(Hc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gc,e)}translateY(e){return this.translateOnAxis(Wc,e)}translateZ(e){return this.translateOnAxis(Xc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Kr.copy(e):Kr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(or,Kr,this.up):bi.lookAt(Kr,or,this.up),this.quaternion.setFromRotationMatrix(bi),s&&(bi.extractRotation(s.matrixWorld),Ss.setFromRotationMatrix(bi),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(At("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qc),ws.child=e,this.dispatchEvent(ws),ws.child=null):At("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ad),ho.child=e,this.dispatchEvent(ho),ho.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qc),ws.child=e,this.dispatchEvent(ws),ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,e,sd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,rd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,u=o.length;l<u;l++){const f=o[l];r(e.shapes,f)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(c){const o=[];for(const l in c){const u=c[l];delete u.metadata,o.push(u)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}nn.DEFAULT_UP=new I(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class St extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const od={type:"move"};class uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(od)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new St;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bi={h:0,s:0,l:0},Jr={h:0,s:0,l:0};function fo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class vt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Dt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Dt.workingColorSpace){if(e=Yf(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=fo(a,r,e+1/3),this.g=fo(a,r,e),this.b=fo(a,r,e-1/3)}return Dt.colorSpaceToWorking(this,s),this}setStyle(e,t=un){function n(r){r!==void 0&&parseFloat(r)<1&&ht("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ht("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ht("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const n=hu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ht("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=qs(e.r),this.g=qs(e.g),this.b=qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return Dt.workingToColorSpace(_n.copy(this),e),Math.round(Mt(_n.r*255,0,255))*65536+Math.round(Mt(_n.g*255,0,255))*256+Math.round(Mt(_n.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dt.workingColorSpace){Dt.workingToColorSpace(_n.copy(this),t);const n=_n.r,s=_n.g,r=_n.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const u=(c+a)/2;if(c===a)o=0,l=0;else{const f=a-c;switch(l=u<=.5?f/(a+c):f/(2-a-c),a){case n:o=(s-r)/f+(s<r?6:0);break;case s:o=(r-n)/f+2;break;case r:o=(n-s)/f+4;break}o/=6}return e.h=o,e.s=l,e.l=u,e}getRGB(e,t=Dt.workingColorSpace){return Dt.workingToColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=un){Dt.workingToColorSpace(_n.copy(this),e);const t=_n.r,n=_n.g,s=_n.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bi),this.setHSL(Bi.h+e,Bi.s+t,Bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bi),e.getHSL(Jr);const n=ro(Bi.h,Jr.h,t),s=ro(Bi.s,Jr.s,t),r=ro(Bi.l,Jr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new vt;vt.NAMES=hu;class Ar{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new vt(e),this.near=t,this.far=n}clone(){return new Ar(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class uu extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fi,this.environmentIntensity=1,this.environmentRotation=new Fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Kn=new I,Si=new I,po=new I,wi=new I,Es=new I,Ts=new I,Yc=new I,mo=new I,go=new I,_o=new I,vo=new jt,xo=new jt,yo=new jt;class Vn{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Kn.subVectors(e,t),s.cross(Kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Kn.subVectors(s,t),Si.subVectors(n,t),po.subVectors(e,t);const a=Kn.dot(Kn),c=Kn.dot(Si),o=Kn.dot(po),l=Si.dot(Si),u=Si.dot(po),f=a*l-c*c;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(l*o-c*u)*h,g=(a*u-c*o)*h;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,wi)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,wi.x),o.addScaledVector(a,wi.y),o.addScaledVector(c,wi.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return vo.setScalar(0),xo.setScalar(0),yo.setScalar(0),vo.fromBufferAttribute(e,t),xo.fromBufferAttribute(e,n),yo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(vo,r.x),a.addScaledVector(xo,r.y),a.addScaledVector(yo,r.z),a}static isFrontFacing(e,t,n,s){return Kn.subVectors(n,t),Si.subVectors(e,t),Kn.cross(Si).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),Kn.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Vn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;Es.subVectors(s,n),Ts.subVectors(r,n),mo.subVectors(e,n);const o=Es.dot(mo),l=Ts.dot(mo);if(o<=0&&l<=0)return t.copy(n);go.subVectors(e,s);const u=Es.dot(go),f=Ts.dot(go);if(u>=0&&f<=u)return t.copy(s);const h=o*f-u*l;if(h<=0&&o>=0&&u<=0)return a=o/(o-u),t.copy(n).addScaledVector(Es,a);_o.subVectors(e,r);const d=Es.dot(_o),g=Ts.dot(_o);if(g>=0&&d<=g)return t.copy(r);const _=d*l-o*g;if(_<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector(Ts,c);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Yc.subVectors(r,s),c=(f-u)/(f-u+(d-g)),t.copy(s).addScaledVector(Yc,c);const p=1/(m+_+h);return a=_*p,c=h*p,t.copy(n).addScaledVector(Es,a).addScaledVector(Ts,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Gn{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Jn):Jn.fromBufferAttribute(r,a),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)),jr.applyMatrix4(e.matrixWorld),this.union(jr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lr),Qr.subVectors(this.max,lr),As.subVectors(e.a,lr),Rs.subVectors(e.b,lr),Cs.subVectors(e.c,lr),ki.subVectors(Rs,As),zi.subVectors(Cs,Rs),ns.subVectors(As,Cs);let t=[0,-ki.z,ki.y,0,-zi.z,zi.y,0,-ns.z,ns.y,ki.z,0,-ki.x,zi.z,0,-zi.x,ns.z,0,-ns.x,-ki.y,ki.x,0,-zi.y,zi.x,0,-ns.y,ns.x,0];return!Mo(t,As,Rs,Cs,Qr)||(t=[1,0,0,0,1,0,0,0,1],!Mo(t,As,Rs,Cs,Qr))?!1:(ea.crossVectors(ki,zi),t=[ea.x,ea.y,ea.z],Mo(t,As,Rs,Cs,Qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ei=[new I,new I,new I,new I,new I,new I,new I,new I],Jn=new I,jr=new Gn,As=new I,Rs=new I,Cs=new I,ki=new I,zi=new I,ns=new I,lr=new I,Qr=new I,ea=new I,is=new I;function Mo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){is.fromArray(i,r);const c=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),o=e.dot(is),l=t.dot(is),u=n.dot(is);if(Math.max(-Math.max(o,l,u),Math.min(o,l,u))>c)return!1}return!0}const tn=new I,ta=new J;let ld=0;class Wn extends $i{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ld++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ol,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=di(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=di(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=di(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=di(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=di(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ol&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class fu extends Wn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class du extends Wn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rt extends Wn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const cd=new Gn,cr=new I,bo=new I;class Qs{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cr.subVectors(e,this.center);const t=cr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(cr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cr.copy(e.center).add(bo)),this.expandByPoint(cr.copy(e.center).sub(bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hd=0;const Fn=new Bt,So=new nn,Ps=new I,Pn=new Gn,hr=new Gn,hn=new I;class sn extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gf(e)?du:fu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new _t().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Fn.makeRotationFromQuaternion(e),this.applyMatrix4(Fn),this}rotateX(e){return Fn.makeRotationX(e),this.applyMatrix4(Fn),this}rotateY(e){return Fn.makeRotationY(e),this.applyMatrix4(Fn),this}rotateZ(e){return Fn.makeRotationZ(e),this.applyMatrix4(Fn),this}translate(e,t,n){return Fn.makeTranslation(e,t,n),this.applyMatrix4(Fn),this}scale(e,t,n){return Fn.makeScale(e,t,n),this.applyMatrix4(Fn),this}lookAt(e){return So.lookAt(e),So.updateMatrix(),this.applyMatrix4(So.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Rt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){At("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&At('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){At("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];hr.setFromBufferAttribute(c),this.morphTargetsRelative?(hn.addVectors(Pn.min,hr.min),Pn.expandByPoint(hn),hn.addVectors(Pn.max,hr.max),Pn.expandByPoint(hn)):(Pn.expandByPoint(hr.min),Pn.expandByPoint(hr.max))}Pn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)hn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(hn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,u=c.count;l<u;l++)hn.fromBufferAttribute(c,l),o&&(Ps.fromBufferAttribute(e,l),hn.add(Ps)),s=Math.max(s,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&At('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){At("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Wn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let v=0;v<n.count;v++)c[v]=new I,o[v]=new I;const l=new I,u=new I,f=new I,h=new J,d=new J,g=new J,_=new I,m=new I;function p(v,T,P){l.fromBufferAttribute(n,v),u.fromBufferAttribute(n,T),f.fromBufferAttribute(n,P),h.fromBufferAttribute(r,v),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const N=1/(d.x*g.y-g.x*d.y);isFinite(N)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(N),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(N),c[v].add(_),c[T].add(_),c[P].add(_),o[v].add(m),o[T].add(m),o[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,T=M.length;v<T;++v){const P=M[v],N=P.start,O=P.count;for(let Z=N,K=N+O;Z<K;Z+=3)p(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const y=new I,x=new I,E=new I,w=new I;function R(v){E.fromBufferAttribute(s,v),w.copy(E);const T=c[v];y.copy(T),y.sub(E.multiplyScalar(E.dot(T))).normalize(),x.crossVectors(w,T);const N=x.dot(o[v])<0?-1:1;a.setXYZW(v,y.x,y.y,y.z,N)}for(let v=0,T=M.length;v<T;++v){const P=M[v],N=P.start,O=P.count;for(let Z=N,K=N+O;Z<K;Z+=3)R(e.getX(Z+0)),R(e.getX(Z+1)),R(e.getX(Z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const s=new I,r=new I,a=new I,c=new I,o=new I,l=new I,u=new I,f=new I;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.add(u),o.add(u),l.add(u),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(c,o){const l=c.array,u=c.itemSize,f=c.normalized,h=new l.constructor(o.length*u);let d=0,g=0;for(let _=0,m=o.length;_<m;_++){c.isInterleavedBufferAttribute?d=o[_]*c.data.stride+c.offset:d=o[_]*u;for(let p=0;p<u;p++)h[g++]=l[d++]}return new Wn(h,u,f)}if(this.index===null)return ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new sn,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=e(h,n);o.push(d)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(s[o]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ud{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ol,this.updateRanges=[],this.version=0,this.uuid=Ii()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Mn=new I;class Va{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix4(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyNormalMatrix(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.transformDirection(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=di(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=di(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=di(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=di(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=di(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array),r=Wt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){za("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Wn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Va(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){za("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let fd=0;class Ki extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=Ws,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jo,this.blendDst=jo,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new vt(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ht(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ht(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(n.blending=this.blending),this.side!==Yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Jo&&(n.blendSrc=this.blendSrc),this.blendDst!==jo&&(n.blendDst=this.blendDst),this.blendEquation!==as&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new vt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new J().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new J().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ys extends Ki{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new vt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Is;const ur=new I,Ds=new I,Ls=new I,Ns=new J,fr=new J,pu=new Bt,na=new I,dr=new I,ia=new I,Zc=new J,wo=new J,$c=new J;class Dn extends nn{constructor(e=new Ys){if(super(),this.isSprite=!0,this.type="Sprite",Is===void 0){Is=new sn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ud(t,5);Is.setIndex([0,1,2,0,2,3]),Is.setAttribute("position",new Va(n,3,0,!1)),Is.setAttribute("uv",new Va(n,2,3,!1))}this.geometry=Is,this.material=e,this.center=new J(.5,.5),this.count=1}raycast(e,t){e.camera===null&&At('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ds.setFromMatrixScale(this.matrixWorld),pu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ls.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ds.multiplyScalar(-Ls.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;sa(na.set(-.5,-.5,0),Ls,a,Ds,s,r),sa(dr.set(.5,-.5,0),Ls,a,Ds,s,r),sa(ia.set(.5,.5,0),Ls,a,Ds,s,r),Zc.set(0,0),wo.set(1,0),$c.set(1,1);let c=e.ray.intersectTriangle(na,dr,ia,!1,ur);if(c===null&&(sa(dr.set(-.5,.5,0),Ls,a,Ds,s,r),wo.set(0,1),c=e.ray.intersectTriangle(na,ia,dr,!1,ur),c===null))return;const o=e.ray.origin.distanceTo(ur);o<e.near||o>e.far||t.push({distance:o,point:ur.clone(),uv:Vn.getInterpolation(ur,na,dr,ia,Zc,wo,$c,new J),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function sa(i,e,t,n,s,r){Ns.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(fr.x=r*Ns.x-s*Ns.y,fr.y=s*Ns.x+r*Ns.y):fr.copy(Ns),i.copy(e),i.x+=fr.x,i.y+=fr.y,i.applyMatrix4(pu)}const Ti=new I,Eo=new I,ra=new I,Vi=new I,To=new I,aa=new I,Ao=new I;class $a{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,t),Ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Eo.copy(e).add(t).multiplyScalar(.5),ra.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(Eo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ra),c=Vi.dot(this.direction),o=-Vi.dot(ra),l=Vi.lengthSq(),u=Math.abs(1-a*a);let f,h,d,g;if(u>0)if(f=a*o-c,h=a*c-o,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+a*h+2*c)+h*(a*f+h+2*o)+l}else h=r,f=Math.max(0,-(a*h+c)),d=-f*f+h*(h+2*o)+l;else h=-r,f=Math.max(0,-(a*h+c)),d=-f*f+h*(h+2*o)+l;else h<=-g?(f=Math.max(0,-(-a*r+c)),h=f>0?-r:Math.min(Math.max(-r,-o),r),d=-f*f+h*(h+2*o)+l):h<=g?(f=0,h=Math.min(Math.max(-r,-o),r),d=h*(h+2*o)+l):(f=Math.max(0,-(a*r+c)),h=f>0?r:Math.min(Math.max(-r,-o),r),d=-f*f+h*(h+2*o)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+c)),d=-f*f+h*(h+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Eo).addScaledVector(ra,h),d}intersectSphere(e,t){Ti.subVectors(e.center,this.origin);const n=Ti.dot(this.direction),s=Ti.dot(Ti)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(c=(e.min.z-h.z)*f,o=(e.max.z-h.z)*f):(c=(e.max.z-h.z)*f,o=(e.min.z-h.z)*f),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,t,n,s,r){To.subVectors(t,e),aa.subVectors(n,e),Ao.crossVectors(To,aa);let a=this.direction.dot(Ao),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Vi.subVectors(this.origin,e);const o=c*this.direction.dot(aa.crossVectors(Vi,aa));if(o<0)return null;const l=c*this.direction.dot(To.cross(Vi));if(l<0||o+l>a)return null;const u=-c*Vi.dot(Ao);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ds extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=Zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kc=new Bt,ss=new $a,oa=new Qs,Jc=new I,la=new I,ca=new I,ha=new I,Ro=new I,ua=new I,jc=new I,fa=new I;class pe extends nn{constructor(e=new sn,t=new ds){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){ua.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const u=c[o],f=r[o];u!==0&&(Ro.fromBufferAttribute(f,e),a?ua.addScaledVector(Ro,u):ua.addScaledVector(Ro.sub(t),u))}t.add(ua)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(r),ss.copy(e.ray).recast(e.near),!(oa.containsPoint(ss.origin)===!1&&(ss.intersectSphere(oa,Jc)===null||ss.origin.distanceToSquared(Jc)>(e.far-e.near)**2))&&(Kc.copy(r).invert(),ss.copy(e.ray).applyMatrix4(Kc),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,E=y;x<E;x+=3){const w=c.getX(x),R=c.getX(x+1),v=c.getX(x+2);s=da(this,p,e,n,l,u,f,w,R,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=c.getX(m),y=c.getX(m+1),x=c.getX(m+2);s=da(this,a,e,n,l,u,f,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,E=y;x<E;x+=3){const w=x,R=x+1,v=x+2;s=da(this,p,e,n,l,u,f,w,R,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,x=m+2;s=da(this,a,e,n,l,u,f,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function dd(i,e,t,n,s,r,a,c){let o;if(e.side===wn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===Yi,c),o===null)return null;fa.copy(c),fa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(fa);return l<t.near||l>t.far?null:{distance:l,point:fa.clone(),object:i}}function da(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,la),i.getVertexPosition(o,ca),i.getVertexPosition(l,ha);const u=dd(i,e,t,n,la,ca,ha,jc);if(u){const f=new I;Vn.getBarycoord(jc,la,ca,ha,f),s&&(u.uv=Vn.getInterpolatedAttribute(s,c,o,l,f,new J)),r&&(u.uv1=Vn.getInterpolatedAttribute(r,c,o,l,f,new J)),a&&(u.normal=Vn.getInterpolatedAttribute(a,c,o,l,f,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:c,b:o,c:l,normal:new I,materialIndex:0};Vn.getNormal(la,ca,ha,h.normal),u.face=h,u.barycoord=f}return u}class mu extends yn{constructor(e=null,t=1,n=1,s,r,a,c,o,l=fn,u=fn,f,h){super(null,a,c,o,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qc extends Wn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Us=new Bt,eh=new Bt,pa=[],th=new Gn,pd=new Bt,pr=new pe,mr=new Qs;class gu extends pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,pd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Gn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),th.copy(e.boundingBox).applyMatrix4(Us),this.boundingBox.union(th)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),mr.copy(e.boundingSphere).applyMatrix4(Us),this.boundingSphere.union(mr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(pr.geometry=this.geometry,pr.material=this.material,pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mr.copy(this.boundingSphere),mr.applyMatrix4(n),e.ray.intersectsSphere(mr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Us),eh.multiplyMatrices(n,Us),pr.matrixWorld=eh,pr.raycast(e,pa);for(let a=0,c=pa.length;a<c;a++){const o=pa[a];o.instanceId=r,o.object=this,t.push(o)}pa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Qc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mu(new Float32Array(s*this.count),s,this.count,Ql,ti));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Co=new I,md=new I,gd=new _t;class Ri{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Co.subVectors(n,t).cross(md.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Co),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gd.getNormalMatrix(e),s=this.coplanarPoint(Co).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const rs=new Qs,_d=new J(.5,.5),ma=new I;class oc{constructor(e=new Ri,t=new Ri,n=new Ri,s=new Ri,r=new Ri,a=new Ri){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pi,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],y=r[13],x=r[14],E=r[15];if(s[0].setComponents(l-a,d-u,p-g,E-M).normalize(),s[1].setComponents(l+a,d+u,p+g,E+M).normalize(),s[2].setComponents(l+c,d+f,p+_,E+y).normalize(),s[3].setComponents(l-c,d-f,p-_,E-y).normalize(),n)s[4].setComponents(o,h,m,x).normalize(),s[5].setComponents(l-o,d-h,p-m,E-x).normalize();else if(s[4].setComponents(l-o,d-h,p-m,E-x).normalize(),t===pi)s[5].setComponents(l+o,d+h,p+m,E+x).normalize();else if(t===Dr)s[5].setComponents(o,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){rs.center.set(0,0,0);const t=_d.distanceTo(e.center);return rs.radius=.7071067811865476+t,rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ma.x=s.normal.x>0?e.max.x:e.min.x,ma.y=s.normal.y>0?e.max.y:e.min.y,ma.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ma)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class _u extends Ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ha=new I,Ga=new I,nh=new Bt,gr=new $a,ga=new Qs,Po=new I,ih=new I;class vd extends nn{constructor(e=new sn,t=new _u){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ha.fromBufferAttribute(t,s-1),Ga.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ha.distanceTo(Ga);e.setAttribute("lineDistance",new Rt(n,1))}else ht("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(s),ga.radius+=r,e.ray.intersectsSphere(ga)===!1)return;nh.copy(s).invert(),gr.copy(e.ray).applyMatrix4(nh);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),M=u.getX(_+1),y=_a(this,e,gr,o,p,M,_);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=_a(this,e,gr,o,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=_a(this,e,gr,o,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=_a(this,e,gr,o,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function _a(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(Ha.fromBufferAttribute(c,s),Ga.fromBufferAttribute(c,r),t.distanceSqToSegment(Ha,Ga,Po,ih)>n)return;Po.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Po);if(!(l<e.near||l>e.far))return{distance:l,point:ih.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class vu extends yn{constructor(e=[],t=us,n,s,r,a,c,o,l,u){super(e,t,n,s,r,a,c,o,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Lr extends yn{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ks extends yn{constructor(e,t,n=vi,s,r,a,c=fn,o=fn,l,u=Ni,f=1){if(u!==Ni&&u!==cs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,c,o,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new rc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xd extends Ks{constructor(e,t=vi,n=us,s,r,a=fn,c=fn,o,l=Ni){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,c,o,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class xu extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Re extends sn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(f,2));function g(_,m,p,M,y,x,E,w,R,v,T){const P=x/R,N=E/v,O=x/2,Z=E/2,K=w/2,B=R+1,$=v+1;let G=0,ie=0;const le=new I;for(let re=0;re<$;re++){const fe=re*N-Z;for(let ye=0;ye<B;ye++){const Xe=ye*P-O;le[_]=Xe*M,le[m]=fe*y,le[p]=K,l.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=w>0?1:-1,u.push(le.x,le.y,le.z),f.push(ye/R),f.push(1-re/v),G+=1}}for(let re=0;re<v;re++)for(let fe=0;fe<R;fe++){const ye=h+fe+B*re,Xe=h+fe+B*(re+1),me=h+(fe+1)+B*(re+1),ue=h+(fe+1)+B*re;o.push(ye,Xe,ue),o.push(Xe,me,ue),ie+=6}c.addGroup(d,ie,T),d+=ie,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Re(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Tn extends sn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new I,u=new J;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const d=n+f/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),c.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,o.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class F extends sn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],d=[];let g=0;const _=[],m=n/2;let p=0;M(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Rt(f,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(d,2));function M(){const x=new I,E=new I;let w=0;const R=(t-e)/n;for(let v=0;v<=r;v++){const T=[],P=v/r,N=P*(t-e)+e;for(let O=0;O<=s;O++){const Z=O/s,K=Z*o+c,B=Math.sin(K),$=Math.cos(K);E.x=N*B,E.y=-P*n+m,E.z=N*$,f.push(E.x,E.y,E.z),x.set(B,R,$).normalize(),h.push(x.x,x.y,x.z),d.push(Z,1-P),T.push(g++)}_.push(T)}for(let v=0;v<s;v++)for(let T=0;T<r;T++){const P=_[T][v],N=_[T+1][v],O=_[T+1][v+1],Z=_[T][v+1];(e>0||T!==0)&&(u.push(P,N,Z),w+=3),(t>0||T!==r-1)&&(u.push(N,O,Z),w+=3)}l.addGroup(p,w,0),p+=w}function y(x){const E=g,w=new J,R=new I;let v=0;const T=x===!0?e:t,P=x===!0?1:-1;for(let O=1;O<=s;O++)f.push(0,m*P,0),h.push(0,P,0),d.push(.5,.5),g++;const N=g;for(let O=0;O<=s;O++){const K=O/s*o+c,B=Math.cos(K),$=Math.sin(K);R.x=T*$,R.y=m*P,R.z=T*B,f.push(R.x,R.y,R.z),h.push(0,P,0),w.x=B*.5+.5,w.y=$*.5*P+.5,d.push(w.x,w.y),g++}for(let O=0;O<s;O++){const Z=E+O,K=N+O;x===!0?u.push(K,K+1,Z):u.push(K+1,K,Z),v+=3}l.addGroup(p,v,x===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new F(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zn extends F{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new zn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class lc extends sn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),u(),this.setAttribute("position",new Rt(r,3)),this.setAttribute("normal",new Rt(r.slice(),3)),this.setAttribute("uv",new Rt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(M){const y=new I,x=new I,E=new I;for(let w=0;w<t.length;w+=3)d(t[w+0],y),d(t[w+1],x),d(t[w+2],E),o(y,x,E,M)}function o(M,y,x,E){const w=E+1,R=[];for(let v=0;v<=w;v++){R[v]=[];const T=M.clone().lerp(x,v/w),P=y.clone().lerp(x,v/w),N=w-v;for(let O=0;O<=N;O++)O===0&&v===w?R[v][O]=T:R[v][O]=T.clone().lerp(P,O/N)}for(let v=0;v<w;v++)for(let T=0;T<2*(w-v)-1;T++){const P=Math.floor(T/2);T%2===0?(h(R[v][P+1]),h(R[v+1][P]),h(R[v][P])):(h(R[v][P+1]),h(R[v+1][P+1]),h(R[v+1][P]))}}function l(M){const y=new I;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(M),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function u(){const M=new I;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const x=m(M)/2/Math.PI+.5,E=p(M)/Math.PI+.5;a.push(x,1-E)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){const y=a[M+0],x=a[M+2],E=a[M+4],w=Math.max(y,x,E),R=Math.min(y,x,E);w>.9&&R<.1&&(y<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),E<.2&&(a[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function d(M,y){const x=M*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){const M=new I,y=new I,x=new I,E=new I,w=new J,R=new J,v=new J;for(let T=0,P=0;T<r.length;T+=9,P+=6){M.set(r[T+0],r[T+1],r[T+2]),y.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),w.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),v.set(a[P+4],a[P+5]),E.copy(M).add(y).add(x).divideScalar(3);const N=m(E);_(w,P+0,M,N),_(R,P+2,y,N),_(v,P+4,x,N)}}function _(M,y,x,E){E<0&&M.x===1&&(a[y]=M.x-1),x.x===0&&x.z===0&&(a[y]=E/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lc(e.vertices,e.indices,e.radius,e.detail)}}class cc extends lc{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new cc(e.radius,e.detail)}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ht("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const u=n[s],h=n[s+1]-u,d=(a-u)/h;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new J:new I);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,s=[],r=[],a=[],c=new I,o=new Bt;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),h<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();const g=Math.acos(Mt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(o.makeRotationAxis(c,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Mt(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class hc extends ii{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new J){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=o-this.aX,d=l-this.aY;o=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class yd extends hc{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function uc(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,u,f){let h=(a-r)/l-(c-r)/(l+u)+(c-a)/u,d=(c-a)/u-(o-a)/(u+f)+(o-c)/f;h*=u,d*=u,s(a,c,h,d)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const sh=new I,rh=new I,Io=new uc,Do=new uc,Lo=new uc;class Sr extends ii{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new I){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,u;this.closed||c>0?l=s[(c-1)%r]:(rh.subVectors(s[0],s[1]).add(s[0]),l=rh);const f=s[c%r],h=s[(c+1)%r];if(this.closed||c+2<r?u=s[(c+2)%r]:(sh.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=sh),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Io.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,_,m),Do.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,_,m),Lo.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Io.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),Do.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),Lo.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return n.set(Io.calc(o),Do.calc(o),Lo.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ah(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function Md(i,e){const t=1-i;return t*t*e}function bd(i,e){return 2*(1-i)*i*e}function Sd(i,e){return i*i*e}function Rr(i,e,t,n){return Md(i,e)+bd(i,t)+Sd(i,n)}function wd(i,e){const t=1-i;return t*t*t*e}function Ed(i,e){const t=1-i;return 3*t*t*i*e}function Td(i,e){return 3*(1-i)*i*i*e}function Ad(i,e){return i*i*i*e}function Cr(i,e,t,n,s){return wd(i,e)+Ed(i,t)+Td(i,n)+Ad(i,s)}class yu extends ii{constructor(e=new J,t=new J,n=new J,s=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new J){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Cr(e,s.x,r.x,a.x,c.x),Cr(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rd extends ii{constructor(e=new I,t=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Cr(e,s.x,r.x,a.x,c.x),Cr(e,s.y,r.y,a.y,c.y),Cr(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mu extends ii{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cd extends ii{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bu extends ii{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Rr(e,s.x,r.x,a.x),Rr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fc extends ii{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Rr(e,s.x,r.x,a.x),Rr(e,s.y,r.y,a.y),Rr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Su extends ii{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new J){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(ah(c,o.x,l.x,u.x,f.x),ah(c,o.y,l.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new J().fromArray(s))}return this}}var Wa=Object.freeze({__proto__:null,ArcCurve:yd,CatmullRomCurve3:Sr,CubicBezierCurve:yu,CubicBezierCurve3:Rd,EllipseCurve:hc,LineCurve:Mu,LineCurve3:Cd,QuadraticBezierCurve:bu,QuadraticBezierCurve3:fc,SplineCurve:Su});class Pd extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wa[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const u=o[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Wa[s.type]().fromJSON(s))}return this}}class kl extends Pd{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Mu(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new bu(this.currentPoint.clone(),new J(e,t),new J(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new yu(this.currentPoint.clone(),new J(e,t),new J(n,s),new J(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Su(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new hc(e,t,n,s,r,a,c,o);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Wi extends kl{constructor(e){super(e),this.uuid=Ii(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new kl().fromJSON(s))}return this}}function Id(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=wu(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=Fd(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let u=c,f=o;for(let h=t;h<s;h+=t){const d=i[h],g=i[h+1];d<c&&(c=d),g<o&&(o=g),d>u&&(u=d),g>f&&(f=g)}l=Math.max(u-c,f-o),l=l!==0?32767/l:0}return Nr(r,a,t,c,o,l,0),a}function wu(i,e,t,n,s){let r;if(s===Yd(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=oh(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=oh(a/n|0,i[a],i[a+1],r);return r&&Js(r,r.next)&&(Fr(r),r=r.next),r}function ps(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Js(t,t.next)||Qt(t.prev,t,t.next)===0)){if(Fr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Nr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Vd(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?Ld(i,n,s,r):Dd(i)){e.push(o.i,i.i,l.i),Fr(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=Nd(ps(i),e),Nr(i,e,t,n,s,r,2)):a===2&&Ud(i,e,t,n,s,r):Nr(ps(i),e,t,n,s,r,1);break}}}function Dd(i){const e=i.prev,t=i,n=i.next;if(Qt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,u=Math.min(s,r,a),f=Math.min(c,o,l),h=Math.max(s,r,a),d=Math.max(c,o,l);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=d&&wr(s,c,r,o,a,l,g.x,g.y)&&Qt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ld(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Qt(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,u=s.y,f=r.y,h=a.y,d=Math.min(c,o,l),g=Math.min(u,f,h),_=Math.max(c,o,l),m=Math.max(u,f,h),p=zl(d,g,e,t,n),M=zl(_,m,e,t,n);let y=i.prevZ,x=i.nextZ;for(;y&&y.z>=p&&x&&x.z<=M;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&wr(c,u,o,f,l,h,y.x,y.y)&&Qt(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&wr(c,u,o,f,l,h,x.x,x.y)&&Qt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&wr(c,u,o,f,l,h,y.x,y.y)&&Qt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&wr(c,u,o,f,l,h,x.x,x.y)&&Qt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Nd(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Js(n,s)&&Tu(n,t,t.next,s)&&Ur(n,s)&&Ur(s,n)&&(e.push(n.i,t.i,s.i),Fr(t),Fr(t.next),t=i=s),t=t.next}while(t!==i);return ps(t)}function Ud(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&Wd(a,c)){let o=Au(a,c);a=ps(a,a.next),o=ps(o,o.next),Nr(a,e,t,n,s,r,0),Nr(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function Fd(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=wu(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(Gd(l))}s.sort(Od);for(let r=0;r<s.length;r++)t=Bd(s[r],t);return t}function Od(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Bd(i,e){const t=kd(i,e);if(!t)return e;const n=Au(t,i);return ps(n,n.next),ps(t,t.next)}function kd(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Js(i,t))return t;do{if(Js(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&Eu(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const f=Math.abs(s-t.y)/(n-t.x);Ur(t,i)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&zd(a,t)))&&(a=t,u=f)}t=t.next}while(t!==c);return a}function zd(i,e){return Qt(i.prev,i,e.prev)<0&&Qt(e.next,i,i.next)<0}function Vd(i,e,t,n){let s=i;do s.z===0&&(s.z=zl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Hd(s)}function Hd(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function zl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Gd(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Eu(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function wr(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&Eu(i,e,t,n,s,r,a,c)}function Wd(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Xd(i,e)&&(Ur(i,e)&&Ur(e,i)&&qd(i,e)&&(Qt(i.prev,i,e.prev)||Qt(i,e.prev,e))||Js(i,e)&&Qt(i.prev,i,i.next)>0&&Qt(e.prev,e,e.next)>0)}function Qt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Js(i,e){return i.x===e.x&&i.y===e.y}function Tu(i,e,t,n){const s=xa(Qt(i,e,t)),r=xa(Qt(i,e,n)),a=xa(Qt(t,n,i)),c=xa(Qt(t,n,e));return!!(s!==r&&a!==c||s===0&&va(i,t,e)||r===0&&va(i,n,e)||a===0&&va(t,i,n)||c===0&&va(t,e,n))}function va(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function xa(i){return i>0?1:i<0?-1:0}function Xd(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Tu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ur(i,e){return Qt(i.prev,i,i.next)<0?Qt(i,e,i.next)>=0&&Qt(i,i.prev,e)>=0:Qt(i,e,i.prev)<0||Qt(i,i.next,e)<0}function qd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Au(i,e){const t=Vl(i.i,i.x,i.y),n=Vl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function oh(i,e,t,n){const s=Vl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Fr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Vl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Yd(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Zd{static triangulate(e,t,n=2){return Id(e,t,n)}}class Hs{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Hs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];lh(e),ch(n,e);let a=e.length;t.forEach(lh);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,ch(n,t[o]);const c=Zd.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function lh(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ch(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ai extends sn{constructor(e=new Wi([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new Rt(s,3)),this.setAttribute("uv",new Rt(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:$d;let y,x=!1,E,w,R,v;if(p){y=p.getSpacedPoints(u),x=!0,h=!1;const oe=p.isCatmullRomCurve3?p.closed:!1;E=p.computeFrenetFrames(u,oe),w=new I,R=new I,v=new I}h||(m=0,d=0,g=0,_=0);const T=c.extractPoints(l);let P=T.shape;const N=T.holes;if(!Hs.isClockWise(P)){P=P.reverse();for(let oe=0,de=N.length;oe<de;oe++){const xe=N[oe];Hs.isClockWise(xe)&&(N[oe]=xe.reverse())}}function Z(oe){const xe=10000000000000001e-36;let we=oe[0];for(let Ee=1;Ee<=oe.length;Ee++){const nt=Ee%oe.length,Ze=oe[nt],lt=Ze.x-we.x,ft=Ze.y-we.y,V=lt*lt+ft*ft,Lt=Math.max(Math.abs(Ze.x),Math.abs(Ze.y),Math.abs(we.x),Math.abs(we.y)),wt=xe*Lt*Lt;if(V<=wt){oe.splice(nt,1),Ee--;continue}we=Ze}}Z(P),N.forEach(Z);const K=N.length,B=P;for(let oe=0;oe<K;oe++){const de=N[oe];P=P.concat(de)}function $(oe,de,xe){return de||At("ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(de,xe)}const G=P.length;function ie(oe,de,xe){let we,Ee,nt;const Ze=oe.x-de.x,lt=oe.y-de.y,ft=xe.x-oe.x,V=xe.y-oe.y,Lt=Ze*Ze+lt*lt,wt=Ze*V-lt*ft;if(Math.abs(wt)>Number.EPSILON){const D=Math.sqrt(Lt),b=Math.sqrt(ft*ft+V*V),q=de.x-lt/D,Q=de.y+Ze/D,ae=xe.x-V/b,ve=xe.y+ft/b,Ae=((ae-q)*V-(ve-Q)*ft)/(Ze*V-lt*ft);we=q+Ze*Ae-oe.x,Ee=Q+lt*Ae-oe.y;const se=we*we+Ee*Ee;if(se<=2)return new J(we,Ee);nt=Math.sqrt(se/2)}else{let D=!1;Ze>Number.EPSILON?ft>Number.EPSILON&&(D=!0):Ze<-Number.EPSILON?ft<-Number.EPSILON&&(D=!0):Math.sign(lt)===Math.sign(V)&&(D=!0),D?(we=-lt,Ee=Ze,nt=Math.sqrt(Lt)):(we=Ze,Ee=lt,nt=Math.sqrt(Lt/2))}return new J(we/nt,Ee/nt)}const le=[];for(let oe=0,de=B.length,xe=de-1,we=oe+1;oe<de;oe++,xe++,we++)xe===de&&(xe=0),we===de&&(we=0),le[oe]=ie(B[oe],B[xe],B[we]);const re=[];let fe,ye=le.concat();for(let oe=0,de=K;oe<de;oe++){const xe=N[oe];fe=[];for(let we=0,Ee=xe.length,nt=Ee-1,Ze=we+1;we<Ee;we++,nt++,Ze++)nt===Ee&&(nt=0),Ze===Ee&&(Ze=0),fe[we]=ie(xe[we],xe[nt],xe[Ze]);re.push(fe),ye=ye.concat(fe)}let Xe;if(m===0)Xe=Hs.triangulateShape(B,N);else{const oe=[],de=[];for(let xe=0;xe<m;xe++){const we=xe/m,Ee=d*Math.cos(we*Math.PI/2),nt=g*Math.sin(we*Math.PI/2)+_;for(let Ze=0,lt=B.length;Ze<lt;Ze++){const ft=$(B[Ze],le[Ze],nt);Se(ft.x,ft.y,-Ee),we===0&&oe.push(ft)}for(let Ze=0,lt=K;Ze<lt;Ze++){const ft=N[Ze];fe=re[Ze];const V=[];for(let Lt=0,wt=ft.length;Lt<wt;Lt++){const D=$(ft[Lt],fe[Lt],nt);Se(D.x,D.y,-Ee),we===0&&V.push(D)}we===0&&de.push(V)}}Xe=Hs.triangulateShape(oe,de)}const me=Xe.length,ue=g+_;for(let oe=0;oe<G;oe++){const de=h?$(P[oe],ye[oe],ue):P[oe];x?(R.copy(E.normals[0]).multiplyScalar(de.x),w.copy(E.binormals[0]).multiplyScalar(de.y),v.copy(y[0]).add(R).add(w),Se(v.x,v.y,v.z)):Se(de.x,de.y,0)}for(let oe=1;oe<=u;oe++)for(let de=0;de<G;de++){const xe=h?$(P[de],ye[de],ue):P[de];x?(R.copy(E.normals[oe]).multiplyScalar(xe.x),w.copy(E.binormals[oe]).multiplyScalar(xe.y),v.copy(y[oe]).add(R).add(w),Se(v.x,v.y,v.z)):Se(xe.x,xe.y,f/u*oe)}for(let oe=m-1;oe>=0;oe--){const de=oe/m,xe=d*Math.cos(de*Math.PI/2),we=g*Math.sin(de*Math.PI/2)+_;for(let Ee=0,nt=B.length;Ee<nt;Ee++){const Ze=$(B[Ee],le[Ee],we);Se(Ze.x,Ze.y,f+xe)}for(let Ee=0,nt=N.length;Ee<nt;Ee++){const Ze=N[Ee];fe=re[Ee];for(let lt=0,ft=Ze.length;lt<ft;lt++){const V=$(Ze[lt],fe[lt],we);x?Se(V.x,V.y+y[u-1].y,y[u-1].x+xe):Se(V.x,V.y,f+xe)}}}Y(),he();function Y(){const oe=s.length/3;if(h){let de=0,xe=G*de;for(let we=0;we<me;we++){const Ee=Xe[we];He(Ee[2]+xe,Ee[1]+xe,Ee[0]+xe)}de=u+m*2,xe=G*de;for(let we=0;we<me;we++){const Ee=Xe[we];He(Ee[0]+xe,Ee[1]+xe,Ee[2]+xe)}}else{for(let de=0;de<me;de++){const xe=Xe[de];He(xe[2],xe[1],xe[0])}for(let de=0;de<me;de++){const xe=Xe[de];He(xe[0]+G*u,xe[1]+G*u,xe[2]+G*u)}}n.addGroup(oe,s.length/3-oe,0)}function he(){const oe=s.length/3;let de=0;ce(B,de),de+=B.length;for(let xe=0,we=N.length;xe<we;xe++){const Ee=N[xe];ce(Ee,de),de+=Ee.length}n.addGroup(oe,s.length/3-oe,1)}function ce(oe,de){let xe=oe.length;for(;--xe>=0;){const we=xe;let Ee=xe-1;Ee<0&&(Ee=oe.length-1);for(let nt=0,Ze=u+m*2;nt<Ze;nt++){const lt=G*nt,ft=G*(nt+1),V=de+we+lt,Lt=de+Ee+lt,wt=de+Ee+ft,D=de+we+ft;Be(V,Lt,wt,D)}}}function Se(oe,de,xe){o.push(oe),o.push(de),o.push(xe)}function He(oe,de,xe){ot(oe),ot(de),ot(xe);const we=s.length/3,Ee=M.generateTopUV(n,s,we-3,we-2,we-1);Je(Ee[0]),Je(Ee[1]),Je(Ee[2])}function Be(oe,de,xe,we){ot(oe),ot(de),ot(we),ot(de),ot(xe),ot(we);const Ee=s.length/3,nt=M.generateSideWallUV(n,s,Ee-6,Ee-3,Ee-2,Ee-1);Je(nt[0]),Je(nt[1]),Je(nt[3]),Je(nt[1]),Je(nt[2]),Je(nt[3])}function ot(oe){s.push(o[oe*3+0]),s.push(o[oe*3+1]),s.push(o[oe*3+2])}function Je(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Kd(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Wa[s.type]().fromJSON(s)),new Ai(n,e.options)}}const $d={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new J(r,a),new J(c,o),new J(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],u=e[n*3+1],f=e[n*3+2],h=e[s*3],d=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(c-u)<Math.abs(a-l)?[new J(a,1-o),new J(l,1-f),new J(h,1-g),new J(_,1-p)]:[new J(c,1-o),new J(u,1-f),new J(d,1-g),new J(m,1-p)]}};function Kd(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class jn extends sn{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Mt(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],u=1/t,f=new I,h=new J,d=new I,g=new I,_=new I;let m=0,p=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(_.x,_.y,_.z);break;default:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),o.push(d.x,d.y,d.z),_.copy(g)}for(let M=0;M<=t;M++){const y=n+M*u*s,x=Math.sin(y),E=Math.cos(y);for(let w=0;w<=e.length-1;w++){f.x=e[w].x*x,f.y=e[w].y,f.z=e[w].x*E,a.push(f.x,f.y,f.z),h.x=M/t,h.y=w/(e.length-1),c.push(h.x,h.y);const R=o[3*w+0]*x,v=o[3*w+1],T=o[3*w+0]*E;l.push(R,v,T)}}for(let M=0;M<t;M++)for(let y=0;y<e.length-1;y++){const x=y+M*e.length,E=x,w=x+e.length,R=x+e.length+1,v=x+1;r.push(E,w,v),r.push(R,v,w)}this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("uv",new Rt(c,2)),this.setAttribute("normal",new Rt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.points,e.segments,e.phiStart,e.phiLength)}}class $t extends sn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,u=o+1,f=e/c,h=t/o,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const M=p*h-a;for(let y=0;y<l;y++){const x=y*f-r;g.push(x,-M,0),_.push(0,0,1),m.push(y/c),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let M=0;M<c;M++){const y=M+l*p,x=M+l*(p+1),E=M+1+l*(p+1),w=M+1+l*p;d.push(y,x,w),d.push(x,E,w)}this.setIndex(d),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $t(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ru extends sn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],u=[];let f=e;const h=(t-e)/s,d=new I,g=new J;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=f*Math.cos(p),d.y=f*Math.sin(p),o.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,y=M,x=M+n+1,E=M+n+2,w=M+1;c.push(y,x,w),c.push(x,E,w)}}this.setIndex(c),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(l,3)),this.setAttribute("uv",new Rt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ru(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ft extends sn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const u=[],f=new I,h=new I,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],y=p/n,x=a+y*c,E=e*Math.cos(x),w=Math.sqrt(e*e-E*E);let R=0;p===0&&a===0?R=.5/t:p===n&&o===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){const T=v/t,P=s+T*r;f.x=-w*Math.cos(P),f.y=E,f.z=w*Math.sin(P),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(T+R,1-y),M.push(l++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const y=u[p][M+1],x=u[p][M],E=u[p+1][M],w=u[p+1][M+1];(p!==0||a>0)&&d.push(y,x,w),(p!==n-1||o<Math.PI)&&d.push(x,E,w)}this.setIndex(d),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Tt extends sn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],u=[],f=[],h=new I,d=new I,g=new I;for(let _=0;_<=n;_++){const m=a+_/n*c;for(let p=0;p<=s;p++){const M=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(M),d.y=(e+t*Math.cos(m))*Math.sin(M),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),h.x=e*Math.cos(M),h.y=e*Math.sin(M),g.subVectors(d,h).normalize(),u.push(g.x,g.y,g.z),f.push(p/s),f.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const p=(s+1)*_+m-1,M=(s+1)*(_-1)+m-1,y=(s+1)*(_-1)+m,x=(s+1)*_+m;o.push(p,M,x),o.push(M,y,x)}this.setIndex(o),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ei extends sn{constructor(e=new fc(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new I,o=new I,l=new J;let u=new I;const f=[],h=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Rt(f,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(d,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),M(),p()}function m(y){u=e.getPointAt(y/t,u);const x=a.normals[y],E=a.binormals[y];for(let w=0;w<=s;w++){const R=w/s*Math.PI*2,v=Math.sin(R),T=-Math.cos(R);o.x=T*x.x+v*E.x,o.y=T*x.y+v*E.y,o.z=T*x.z+v*E.z,o.normalize(),h.push(o.x,o.y,o.z),c.x=u.x+n*o.x,c.y=u.y+n*o.y,c.z=u.z+n*o.z,f.push(c.x,c.y,c.z)}}function p(){for(let y=1;y<=t;y++)for(let x=1;x<=s;x++){const E=(s+1)*(y-1)+(x-1),w=(s+1)*y+(x-1),R=(s+1)*y+x,v=(s+1)*(y-1)+x;g.push(E,w,v),g.push(w,R,v)}}function M(){for(let y=0;y<=t;y++)for(let x=0;x<=s;x++)l.x=y/t,l.y=x/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ei(new Wa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function js(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(hh(s))s.isRenderTargetTexture?(ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(hh(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Sn(i){const e={};for(let t=0;t<i.length;t++){const n=js(i[t]);for(const s in n)e[s]=n[s]}return e}function hh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Jd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}const jd={clone:js,merge:Sn};var Qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xi extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qd,this.fragmentShader=e0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=js(e.uniforms),this.uniformsGroups=Jd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new vt().setHex(s.value);break;case"v2":this.uniforms[n].value=new J().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new jt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new _t().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Bt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class t0 extends xi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class X extends Ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fa,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _i extends X{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new vt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new vt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new vt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class n0 extends Ki{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fa,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=Zl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class i0 extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class s0 extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wx extends _u{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class dc extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new vt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Pu extends dc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new vt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const No=new Bt,uh=new I,fh=new I;class Iu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new Bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oc,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;uh.setFromMatrixPosition(e.matrixWorld),t.position.copy(uh),fh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(fh),t.updateMatrixWorld(),No.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(No,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Dr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(No)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ya=new I,Ma=new Ui,ci=new I;class Du extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ya,Ma,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ya,Ma,ci.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ya,Ma,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ya,Ma,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new I,dh=new J,ph=new J;class Ln extends Du{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bl*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,dh,ph),t.subVectors(ph,dh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Da*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class r0 extends Iu{constructor(){super(new Ln(90,1,.5,500)),this.isPointLightShadow=!0}}class Lu extends dc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new r0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class pc extends Du{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=u*this.view.offsetY,o=c-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class a0 extends Iu{constructor(){super(new pc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xa extends dc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new a0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Fs=-90,Os=1;class o0 extends nn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ln(Fs,Os,e,t);s.layers=this.layers,this.add(s);const r=new Ln(Fs,Os,e,t);r.layers=this.layers,this.add(r);const a=new Ln(Fs,Os,e,t);a.layers=this.layers,this.add(a);const c=new Ln(Fs,Os,e,t);c.layers=this.layers,this.add(c);const o=new Ln(Fs,Os,e,t);o.layers=this.layers,this.add(o);const l=new Ln(Fs,Os,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===pi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class l0 extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class c0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=h0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function h0(){this._document.hidden===!1&&this.reset()}const mh=new Bt;class u0{constructor(e,t,n=0,s=1/0){this.ray=new $a(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ac,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):At("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return mh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mh),this}intersectObject(e,t=!0,n=[]){return Hl(e,this,n,t),n.sort(gh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Hl(e[s],this,n,t);return n.sort(gh),n}}function gh(i,e){return i.distance-e.distance}function Hl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)Hl(r[a],e,t,!0)}}class _h{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Mt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Mt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const yc=class yc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};yc.prototype.isMatrix2=!0;let vh=yc;class f0 extends $i{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){ht("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function xh(i,e,t,n){const s=d0(n);switch(t){case au:return i*e;case Ql:return i*e/s.components*s.byteLength;case ec:return i*e/s.components*s.byteLength;case fs:return i*e*2/s.components*s.byteLength;case tc:return i*e*2/s.components*s.byteLength;case ou:return i*e*3/s.components*s.byteLength;case ni:return i*e*4/s.components*s.byteLength;case nc:return i*e*4/s.components*s.byteLength;case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pa:case Ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:case hl:return Math.max(i,16)*Math.max(e,8)/4;case ol:case cl:return Math.max(i,8)*Math.max(e,8)/2;case ul:case fl:case pl:case ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dl:case Na:case gl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _l:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case xl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ml:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case wl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Al:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Rl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Pl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Il:case Dl:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Nl:case Ul:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ua:case Fl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function d0(i){switch(i){case Nn:case nu:return{byteLength:1,components:1};case Pr:case iu:case Li:return{byteLength:2,components:1};case Jl:case jl:return{byteLength:2,components:4};case vi:case Kl:case ti:return{byteLength:4,components:1};case su:case ru:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yl}}));typeof window<"u"&&(window.__THREE__?ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Nu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function p0(i){const e=new WeakMap;function t(c,o){const l=c.array,u=c.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(o,h),i.bufferData(o,l,u),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:f}}function n(c,o,l){const u=o.array,f=o.updateRanges;if(i.bindBuffer(l,c),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const u=e.get(c);(!u||u.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var m0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,g0=`#ifdef USE_ALPHAHASH
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
#endif`,_0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,v0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,x0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,y0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,M0=`#ifdef USE_AOMAP
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
#endif`,b0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,S0=`#ifdef USE_BATCHING
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
#endif`,w0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,E0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,T0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,A0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,R0=`#ifdef USE_IRIDESCENCE
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
#endif`,C0=`#ifdef USE_BUMPMAP
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
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,L0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,N0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,U0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,F0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,O0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,B0=`#define PI 3.141592653589793
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
} // validated`,k0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,z0=`vec3 transformedNormal = objectNormal;
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
#endif`,V0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,H0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,G0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,W0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,X0="gl_FragColor = linearToOutputTexel( gl_FragColor );",q0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
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
#endif`,K0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,J0=`#ifdef USE_ENVMAP
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
#endif`,j0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Q0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ep=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,np=`#ifdef USE_GRADIENTMAP
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
}`,ip=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ap=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,op=`#ifdef USE_ENVMAP
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
#endif`,lp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fp=`PhysicalMaterial material;
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
#endif`,dp=`uniform sampler2D dfgLUT;
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
}`,pp=`
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
#endif`,mp=`#if defined( RE_IndirectDiffuse )
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
#endif`,gp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_p=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,vp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ep=`#if defined( USE_POINTS_UV )
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
#endif`,Tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ap=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ip=`#ifdef USE_MORPHTARGETS
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
#endif`,Dp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Np=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bp=`#ifdef USE_NORMALMAP
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
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$p=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,em=`float getShadowMask() {
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
}`,tm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nm=`#ifdef USE_SKINNING
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
#endif`,im=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sm=`#ifdef USE_SKINNING
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
#endif`,rm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,am=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,om=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cm=`#ifdef USE_TRANSMISSION
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
#endif`,hm=`#ifdef USE_TRANSMISSION
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
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gm=`uniform sampler2D t2D;
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
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ym=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mm=`#include <common>
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
}`,bm=`#if DEPTH_PACKING == 3200
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
}`,Sm=`#define DISTANCE
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
}`,wm=`#define DISTANCE
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`uniform float scale;
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
}`,Rm=`uniform vec3 diffuse;
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
}`,Cm=`#include <common>
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Im=`#define LAMBERT
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
}`,Dm=`#define LAMBERT
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
}`,Lm=`#define MATCAP
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
}`,Nm=`#define MATCAP
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
}`,Um=`#define NORMAL
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
}`,Fm=`#define NORMAL
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
}`,Om=`#define PHONG
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
}`,Bm=`#define PHONG
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
}`,km=`#define STANDARD
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
}`,zm=`#define STANDARD
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
}`,Vm=`#define TOON
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
}`,Hm=`#define TOON
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
}`,Gm=`uniform float size;
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
}`,Wm=`uniform vec3 diffuse;
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
}`,Xm=`#include <common>
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
}`,qm=`uniform vec3 color;
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
}`,Ym=`uniform float rotation;
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
}`,Zm=`uniform vec3 diffuse;
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
}`,bt={alphahash_fragment:m0,alphahash_pars_fragment:g0,alphamap_fragment:_0,alphamap_pars_fragment:v0,alphatest_fragment:x0,alphatest_pars_fragment:y0,aomap_fragment:M0,aomap_pars_fragment:b0,batching_pars_vertex:S0,batching_vertex:w0,begin_vertex:E0,beginnormal_vertex:T0,bsdfs:A0,iridescence_fragment:R0,bumpmap_pars_fragment:C0,clipping_planes_fragment:P0,clipping_planes_pars_fragment:I0,clipping_planes_pars_vertex:D0,clipping_planes_vertex:L0,color_fragment:N0,color_pars_fragment:U0,color_pars_vertex:F0,color_vertex:O0,common:B0,cube_uv_reflection_fragment:k0,defaultnormal_vertex:z0,displacementmap_pars_vertex:V0,displacementmap_vertex:H0,emissivemap_fragment:G0,emissivemap_pars_fragment:W0,colorspace_fragment:X0,colorspace_pars_fragment:q0,envmap_fragment:Y0,envmap_common_pars_fragment:Z0,envmap_pars_fragment:$0,envmap_pars_vertex:K0,envmap_physical_pars_fragment:op,envmap_vertex:J0,fog_vertex:j0,fog_pars_vertex:Q0,fog_fragment:ep,fog_pars_fragment:tp,gradientmap_pars_fragment:np,lightmap_pars_fragment:ip,lights_lambert_fragment:sp,lights_lambert_pars_fragment:rp,lights_pars_begin:ap,lights_toon_fragment:lp,lights_toon_pars_fragment:cp,lights_phong_fragment:hp,lights_phong_pars_fragment:up,lights_physical_fragment:fp,lights_physical_pars_fragment:dp,lights_fragment_begin:pp,lights_fragment_maps:mp,lights_fragment_end:gp,lightprobes_pars_fragment:_p,logdepthbuf_fragment:vp,logdepthbuf_pars_fragment:xp,logdepthbuf_pars_vertex:yp,logdepthbuf_vertex:Mp,map_fragment:bp,map_pars_fragment:Sp,map_particle_fragment:wp,map_particle_pars_fragment:Ep,metalnessmap_fragment:Tp,metalnessmap_pars_fragment:Ap,morphinstance_vertex:Rp,morphcolor_vertex:Cp,morphnormal_vertex:Pp,morphtarget_pars_vertex:Ip,morphtarget_vertex:Dp,normal_fragment_begin:Lp,normal_fragment_maps:Np,normal_pars_fragment:Up,normal_pars_vertex:Fp,normal_vertex:Op,normalmap_pars_fragment:Bp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:zp,clearcoat_pars_fragment:Vp,iridescence_pars_fragment:Hp,opaque_fragment:Gp,packing:Wp,premultiplied_alpha_fragment:Xp,project_vertex:qp,dithering_fragment:Yp,dithering_pars_fragment:Zp,roughnessmap_fragment:$p,roughnessmap_pars_fragment:Kp,shadowmap_pars_fragment:Jp,shadowmap_pars_vertex:jp,shadowmap_vertex:Qp,shadowmask_pars_fragment:em,skinbase_vertex:tm,skinning_pars_vertex:nm,skinning_vertex:im,skinnormal_vertex:sm,specularmap_fragment:rm,specularmap_pars_fragment:am,tonemapping_fragment:om,tonemapping_pars_fragment:lm,transmission_fragment:cm,transmission_pars_fragment:hm,uv_pars_fragment:um,uv_pars_vertex:fm,uv_vertex:dm,worldpos_vertex:pm,background_vert:mm,background_frag:gm,backgroundCube_vert:_m,backgroundCube_frag:vm,cube_vert:xm,cube_frag:ym,depth_vert:Mm,depth_frag:bm,distance_vert:Sm,distance_frag:wm,equirect_vert:Em,equirect_frag:Tm,linedashed_vert:Am,linedashed_frag:Rm,meshbasic_vert:Cm,meshbasic_frag:Pm,meshlambert_vert:Im,meshlambert_frag:Dm,meshmatcap_vert:Lm,meshmatcap_frag:Nm,meshnormal_vert:Um,meshnormal_frag:Fm,meshphong_vert:Om,meshphong_frag:Bm,meshphysical_vert:km,meshphysical_frag:zm,meshtoon_vert:Vm,meshtoon_frag:Hm,points_vert:Gm,points_frag:Wm,shadow_vert:Xm,shadow_frag:qm,sprite_vert:Ym,sprite_frag:Zm},ze={common:{diffuse:{value:new vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new _t}},envmap:{envMap:{value:null},envMapRotation:{value:new _t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new _t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new _t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new _t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new _t},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new _t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new _t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new _t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new _t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0},uvTransform:{value:new _t}},sprite:{diffuse:{value:new vt(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new _t},alphaMap:{value:null},alphaMapTransform:{value:new _t},alphaTest:{value:0}}},ui={basic:{uniforms:Sn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:Sn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new vt(0)},envMapIntensity:{value:1}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:Sn([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new vt(0)},specular:{value:new vt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:Sn([ze.common,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.roughnessmap,ze.metalnessmap,ze.fog,ze.lights,{emissive:{value:new vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:Sn([ze.common,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.gradientmap,ze.fog,ze.lights,{emissive:{value:new vt(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:Sn([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:Sn([ze.points,ze.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:Sn([ze.common,ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:Sn([ze.common,ze.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:Sn([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:Sn([ze.sprite,ze.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new _t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new _t}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distance:{uniforms:Sn([ze.common,ze.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distance_vert,fragmentShader:bt.distance_frag},shadow:{uniforms:Sn([ze.lights,ze.fog,{color:{value:new vt(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};ui.physical={uniforms:Sn([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new _t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new _t},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new _t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new _t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new _t},sheen:{value:0},sheenColor:{value:new vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new _t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new _t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new _t},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new _t},attenuationDistance:{value:0},attenuationColor:{value:new vt(0)},specularColor:{value:new vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new _t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new _t},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new _t}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};const ba={r:0,b:0,g:0},$m=new Bt,Uu=new _t;Uu.set(-1,0,0,0,1,0,0,0,1);function Km(i,e,t,n,s,r){const a=new vt(0);let c=s===!0?0:1,o,l,u=null,f=0,h=null;function d(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){const x=M.backgroundBlurriness>0;y=e.get(y,x)}return y}function g(M){let y=!1;const x=d(M);x===null?m(a,c):x&&x.isColor&&(m(x,1),y=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,y){const x=d(y);x&&(x.isCubeTexture||x.mapping===Za)?(l===void 0&&(l=new pe(new Re(1,1,1),new xi({name:"BackgroundCubeMaterial",uniforms:js(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4($m.makeRotationFromEuler(y.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Uu),l.material.toneMapped=Dt.getTransfer(x.colorSpace)!==Vt,(u!==x||f!==x.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(o===void 0&&(o=new pe(new $t(2,2),new xi({name:"BackgroundMaterial",uniforms:js(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=x,o.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,o.material.toneMapped=Dt.getTransfer(x.colorSpace)!==Vt,x.matrixAutoUpdate===!0&&x.updateMatrix(),o.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||h!==i.toneMapping)&&(o.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function m(M,y){M.getRGB(ba,Cu(i)),t.buffers.color.setClear(ba.r,ba.g,ba.b,y,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,m(a,c)},render:g,addToRenderList:_,dispose:p}}function Jm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function c(N,O,Z,K,B){let $=!1;const G=f(N,K,Z,O);r!==G&&(r=G,l(r.object)),$=d(N,K,Z,B),$&&g(N,K,Z,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,x(N,O,Z,K),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function o(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function u(N){return i.deleteVertexArray(N)}function f(N,O,Z,K){const B=K.wireframe===!0;let $=n[O.id];$===void 0&&($={},n[O.id]=$);const G=N.isInstancedMesh===!0?N.id:0;let ie=$[G];ie===void 0&&(ie={},$[G]=ie);let le=ie[Z.id];le===void 0&&(le={},ie[Z.id]=le);let re=le[B];return re===void 0&&(re=h(o()),le[B]=re),re}function h(N){const O=[],Z=[],K=[];for(let B=0;B<t;B++)O[B]=0,Z[B]=0,K[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Z,attributeDivisors:K,object:N,attributes:{},index:null}}function d(N,O,Z,K){const B=r.attributes,$=O.attributes;let G=0;const ie=Z.getAttributes();for(const le in ie)if(ie[le].location>=0){const fe=B[le];let ye=$[le];if(ye===void 0&&(le==="instanceMatrix"&&N.instanceMatrix&&(ye=N.instanceMatrix),le==="instanceColor"&&N.instanceColor&&(ye=N.instanceColor)),fe===void 0||fe.attribute!==ye||ye&&fe.data!==ye.data)return!0;G++}return r.attributesNum!==G||r.index!==K}function g(N,O,Z,K){const B={},$=O.attributes;let G=0;const ie=Z.getAttributes();for(const le in ie)if(ie[le].location>=0){let fe=$[le];fe===void 0&&(le==="instanceMatrix"&&N.instanceMatrix&&(fe=N.instanceMatrix),le==="instanceColor"&&N.instanceColor&&(fe=N.instanceColor));const ye={};ye.attribute=fe,fe&&fe.data&&(ye.data=fe.data),B[le]=ye,G++}r.attributes=B,r.attributesNum=G,r.index=K}function _(){const N=r.newAttributes;for(let O=0,Z=N.length;O<Z;O++)N[O]=0}function m(N){p(N,0)}function p(N,O){const Z=r.newAttributes,K=r.enabledAttributes,B=r.attributeDivisors;Z[N]=1,K[N]===0&&(i.enableVertexAttribArray(N),K[N]=1),B[N]!==O&&(i.vertexAttribDivisor(N,O),B[N]=O)}function M(){const N=r.newAttributes,O=r.enabledAttributes;for(let Z=0,K=O.length;Z<K;Z++)O[Z]!==N[Z]&&(i.disableVertexAttribArray(Z),O[Z]=0)}function y(N,O,Z,K,B,$,G){G===!0?i.vertexAttribIPointer(N,O,Z,B,$):i.vertexAttribPointer(N,O,Z,K,B,$)}function x(N,O,Z,K){_();const B=K.attributes,$=Z.getAttributes(),G=O.defaultAttributeValues;for(const ie in $){const le=$[ie];if(le.location>=0){let re=B[ie];if(re===void 0&&(ie==="instanceMatrix"&&N.instanceMatrix&&(re=N.instanceMatrix),ie==="instanceColor"&&N.instanceColor&&(re=N.instanceColor)),re!==void 0){const fe=re.normalized,ye=re.itemSize,Xe=e.get(re);if(Xe===void 0)continue;const me=Xe.buffer,ue=Xe.type,Y=Xe.bytesPerElement,he=ue===i.INT||ue===i.UNSIGNED_INT||re.gpuType===Kl;if(re.isInterleavedBufferAttribute){const ce=re.data,Se=ce.stride,He=re.offset;if(ce.isInstancedInterleavedBuffer){for(let Be=0;Be<le.locationSize;Be++)p(le.location+Be,ce.meshPerAttribute);N.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Be=0;Be<le.locationSize;Be++)m(le.location+Be);i.bindBuffer(i.ARRAY_BUFFER,me);for(let Be=0;Be<le.locationSize;Be++)y(le.location+Be,ye/le.locationSize,ue,fe,Se*Y,(He+ye/le.locationSize*Be)*Y,he)}else{if(re.isInstancedBufferAttribute){for(let ce=0;ce<le.locationSize;ce++)p(le.location+ce,re.meshPerAttribute);N.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ce=0;ce<le.locationSize;ce++)m(le.location+ce);i.bindBuffer(i.ARRAY_BUFFER,me);for(let ce=0;ce<le.locationSize;ce++)y(le.location+ce,ye/le.locationSize,ue,fe,ye*Y,ye/le.locationSize*ce*Y,he)}}else if(G!==void 0){const fe=G[ie];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(le.location,fe);break;case 3:i.vertexAttrib3fv(le.location,fe);break;case 4:i.vertexAttrib4fv(le.location,fe);break;default:i.vertexAttrib1fv(le.location,fe)}}}}M()}function E(){T();for(const N in n){const O=n[N];for(const Z in O){const K=O[Z];for(const B in K){const $=K[B];for(const G in $)u($[G].object),delete $[G];delete K[B]}}delete n[N]}}function w(N){if(n[N.id]===void 0)return;const O=n[N.id];for(const Z in O){const K=O[Z];for(const B in K){const $=K[B];for(const G in $)u($[G].object),delete $[G];delete K[B]}}delete n[N.id]}function R(N){for(const O in n){const Z=n[O];for(const K in Z){const B=Z[K];if(B[N.id]===void 0)continue;const $=B[N.id];for(const G in $)u($[G].object),delete $[G];delete B[N.id]}}}function v(N){for(const O in n){const Z=n[O],K=N.isInstancedMesh===!0?N.id:0,B=Z[K];if(B!==void 0){for(const $ in B){const G=B[$];for(const ie in G)u(G[ie].object),delete G[ie];delete B[$]}delete Z[K],Object.keys(Z).length===0&&delete n[O]}}}function T(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:T,resetDefaultState:P,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function jm(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,u){u!==0&&(i.drawArraysInstanced(n,o,l,u),t.update(l,n,u))}function c(o,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function Qm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==ni&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const v=R===Li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Nn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ti&&!v)}function o(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=o(l);u!==l&&(ht("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:x,maxSamples:E,samples:w}}function eg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ri,c=new _t,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||s;return s=h,n=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const M=r?0:n,y=M*4;let x=p.clippingState||null;o.value=x,x=u(g,h,y,d);for(let E=0;E!==y;++E)x[E]=t[E];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const p=d+_*4,M=h.matrixWorldInverse;c.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=d;y!==_;++y,x+=4)a.copy(f[y]).applyMatrix4(M,c),a.normal.toArray(m,x),m[x+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const qi=4,yh=[.125,.215,.35,.446,.526,.582],os=20,tg=256,_r=new pc,Mh=new vt;let Uo=null,Fo=0,Oo=0,Bo=!1;const ng=new I;class Gl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=ng}=r;Uo=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Uo,Fo,Oo),this._renderer.xr.enabled=Bo,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uo=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Li,format:ni,colorSpace:Oa,depthBuffer:!1},s=bh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ig(r)),this._blurMaterial=rg(r,e,t),this._ggxMaterial=sg(r,e,t)}return s}_compileMaterial(e){const t=new pe(new sn,e);this._renderer.compile(t,_r)}_sceneToCubeUV(e,t,n,s,r){const o=new Ln(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Mh),f.toneMapping=mi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pe(new Re,new ds({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(Mh),p=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(o.up.set(0,l[y],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+u[y],r.y,r.z)):x===1?(o.up.set(0,0,l[y]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+u[y],r.z)):(o.up.set(0,l[y],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+u[y]));const E=this._cubeSize;Bs(s,x*E,y>2?E:0,E,E),f.setRenderTarget(s),p&&f.render(_,o),f.render(e,o)}f.toneMapping=d,f.autoClear=h,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===us||e.mapping===$s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;Bs(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,_r)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=0+l*1.25,d=f*h,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-qi?n-g+qi:0),p=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=d,o.mipInt.value=g-t,Bs(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(c,_r),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,Bs(e,m,p,3*_,2*_),s.setRenderTarget(e),s.render(c,_r)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&At("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*os-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):os;m>os&&ht(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${os}`);const p=[];let M=0;for(let R=0;R<os;++R){const v=R/_,T=Math.exp(-v*v/2);p.push(T),R===0?M+=T:R<m&&(M+=2*T)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",c&&(h.poleAxis.value=c);const{_lodMax:y}=this;h.dTheta.value=g,h.mipInt.value=y-n;const x=this._sizeLods[s],E=3*x*(s>y-qi?s-y+qi:0),w=4*(this._cubeSize-x);Bs(t,E,w,3*x,2*x),o.setRenderTarget(t),o.render(f,_r)}}function ig(i){const e=[],t=[],n=[];let s=i;const r=i-qi+1+yh.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-qi?o=yh[a-i+qi-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),y=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let w=0;w<d;w++){const R=w%3*2/3-1,v=w>2?0:-1,T=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];M.set(T,_*g*w),y.set(h,m*g*w);const P=[w,w,w,w,w,w];x.set(P,p*g*w)}const E=new sn;E.setAttribute("position",new Wn(M,_)),E.setAttribute("uv",new Wn(y,m)),E.setAttribute("faceIndex",new Wn(x,p)),n.push(new pe(E,null)),s>qi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function bh(i,e,t){const n=new gi(i,e,t);return n.texture.mapping=Za,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function sg(i,e,t){return new xi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:tg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function rg(i,e,t){const n=new Float32Array(os),s=new I(0,1,0);return new xi({name:"SphericalGaussianBlur",defines:{n:os,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Sh(){return new xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function wh(){return new xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Ka(){return`

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
	`}class Fu extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new vu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Re(5,5,5),r=new xi({name:"CubemapFromEquirect",uniforms:js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wn,blending:Pi});r.uniforms.tEquirect.value=t;const a=new pe(s,r),c=t.minFilter;return t.minFilter===ls&&(t.minFilter=xn),new o0(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function ag(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===no||d===io)if(e.has(h)){const g=e.get(h).texture;return c(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const _=new Fu(g.height);return _.fromEquirectangularTexture(i,h),e.set(h,_),h.addEventListener("dispose",l),c(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,g=d===no||d===io,_=d===us||d===$s;if(g||_){let m=t.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Gl(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const M=h.image;return g&&M&&M.height>0||_&&M&&o(M)?(n===null&&(n=new Gl(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function c(h,d){return d===no?h.mapping=us:d===io&&(h.mapping=$s),h}function o(h){let d=0;const g=6;for(let _=0;_<g;_++)h[_]!==void 0&&d++;return d===g}function l(h){const d=h.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function og(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Xs("WebGLRenderer: "+n+" extension not supported."),s}}}function lg(i,e,t,n){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const d=r.get(h);d&&(e.remove(d),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function c(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function o(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const M=d.array;_=d.version;for(let y=0,x=M.length;y<x;y+=3){const E=M[y+0],w=M[y+1],R=M[y+2];h.push(E,w,w,R,R,E)}}else{const M=g.array;_=g.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const E=y+0,w=y+1,R=y+2;h.push(E,w,w,R,R,E)}}const m=new(g.count>=65535?du:fu)(h,1);m.version=_;const p=r.get(f);p&&e.remove(p),r.set(f,m)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:c,update:o,getWireframeAttribute:u}}function cg(i,e,t){let n;function s(f){n=f}let r,a;function c(f){r=f.type,a=f.bytesPerElement}function o(f,h){i.drawElements(n,h,r,f*a),t.update(h,n,1)}function l(f,h,d){d!==0&&(i.drawElementsInstanced(n,h,r,f*a,d),t.update(h,n,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=h[m];t.update(_,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=u}function hg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:At("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ug(i,e,t){const n=new WeakMap,s=new jt;function r(a,c,o){const l=a.morphTargetInfluences,u=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(c);if(h===void 0||h.count!==f){let T=function(){R.dispose(),n.delete(c),c.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const d=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let y=0;d===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let x=c.attributes.position.count*y,E=1;x>e.maxTextureSize&&(E=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const w=new Float32Array(x*E*4*f),R=new cu(w,x,E,f);R.type=ti,R.needsUpdate=!0;const v=y*4;for(let P=0;P<f;P++){const N=m[P],O=p[P],Z=M[P],K=x*E*4*P;for(let B=0;B<N.count;B++){const $=B*v;d===!0&&(s.fromBufferAttribute(N,B),w[K+$+0]=s.x,w[K+$+1]=s.y,w[K+$+2]=s.z,w[K+$+3]=0),g===!0&&(s.fromBufferAttribute(O,B),w[K+$+4]=s.x,w[K+$+5]=s.y,w[K+$+6]=s.z,w[K+$+7]=0),_===!0&&(s.fromBufferAttribute(Z,B),w[K+$+8]=s.x,w[K+$+9]=s.y,w[K+$+10]=s.z,w[K+$+11]=Z.itemSize===4?s.w:1)}}h={count:f,texture:R,size:new J(x,E)},n.set(c,h),c.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=c.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function fg(i,e,t,n,s){let r=new WeakMap;function a(l){const u=s.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function c(){r=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:c}}const dg={[$h]:"LINEAR_TONE_MAPPING",[Kh]:"REINHARD_TONE_MAPPING",[Jh]:"CINEON_TONE_MAPPING",[$l]:"ACES_FILMIC_TONE_MAPPING",[Qh]:"AGX_TONE_MAPPING",[eu]:"NEUTRAL_TONE_MAPPING",[jh]:"CUSTOM_TONE_MAPPING"};function pg(i,e,t,n,s,r){const a=new gi(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ks(e,t):void 0}),c=new gi(e,t,{type:Li,depthBuffer:!1,stencilBuffer:!1}),o=new sn;o.setAttribute("position",new Rt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Rt([0,2,0,0,2,0],2));const l=new t0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new pe(o,l),f=new pc(-1,1,1,-1,0,1);let h=null,d=null,g=!1,_,m=null,p=[],M=!1;this.setSize=function(y,x){a.setSize(y,x),c.setSize(y,x);for(let E=0;E<p.length;E++){const w=p[E];w.setSize&&w.setSize(y,x)}},this.setEffects=function(y){p=y,M=p.length>0&&p[0].isRenderPass===!0;const x=a.width,E=a.height;for(let w=0;w<p.length;w++){const R=p[w];R.setSize&&R.setSize(x,E)}},this.begin=function(y,x){if(g||y.toneMapping===mi&&p.length===0)return!1;if(m=x,x!==null){const E=x.width,w=x.height;(a.width!==E||a.height!==w)&&this.setSize(E,w)}return M===!1&&y.setRenderTarget(a),_=y.toneMapping,y.toneMapping=mi,!0},this.hasRenderPass=function(){return M},this.end=function(y,x){y.toneMapping=_,g=!0;let E=a,w=c;for(let R=0;R<p.length;R++){const v=p[R];if(v.enabled!==!1&&(v.render(y,w,E,x),v.needsSwap!==!1)){const T=E;E=w,w=T}}if(h!==y.outputColorSpace||d!==y.toneMapping){h=y.outputColorSpace,d=y.toneMapping,l.defines={},Dt.getTransfer(h)===Vt&&(l.defines.SRGB_TRANSFER="");const R=dg[d];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,y.setRenderTarget(m),y.render(u,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const Ou=new yn,Wl=new Ks(1,1),Bu=new cu,ku=new ed,zu=new vu,Eh=[],Th=[],Ah=new Float32Array(16),Rh=new Float32Array(9),Ch=new Float32Array(4);function er(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Eh[s];if(r===void 0&&(r=new Float32Array(s),Eh[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function on(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ja(i,e){let t=Th[e];t===void 0&&(t=new Int32Array(e),Th[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function mg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2fv(this.addr,e),ln(t,e)}}function _g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;i.uniform3fv(this.addr,e),ln(t,e)}}function vg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4fv(this.addr,e),ln(t,e)}}function xg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Ch.set(n),i.uniformMatrix2fv(this.addr,!1,Ch),ln(t,n)}}function yg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Rh.set(n),i.uniformMatrix3fv(this.addr,!1,Rh),ln(t,n)}}function Mg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Ah.set(n),i.uniformMatrix4fv(this.addr,!1,Ah),ln(t,n)}}function bg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2iv(this.addr,e),ln(t,e)}}function wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3iv(this.addr,e),ln(t,e)}}function Eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4iv(this.addr,e),ln(t,e)}}function Tg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2uiv(this.addr,e),ln(t,e)}}function Rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3uiv(this.addr,e),ln(t,e)}}function Cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4uiv(this.addr,e),ln(t,e)}}function Pg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wl.compareFunction=t.isReversedDepthBuffer()?sc:ic,r=Wl):r=Ou,t.setTexture2D(e||r,s)}function Ig(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ku,s)}function Dg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zu,s)}function Lg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bu,s)}function Ng(i){switch(i){case 5126:return mg;case 35664:return gg;case 35665:return _g;case 35666:return vg;case 35674:return xg;case 35675:return yg;case 35676:return Mg;case 5124:case 35670:return bg;case 35667:case 35671:return Sg;case 35668:case 35672:return wg;case 35669:case 35673:return Eg;case 5125:return Tg;case 36294:return Ag;case 36295:return Rg;case 36296:return Cg;case 35678:case 36198:case 36298:case 36306:case 35682:return Pg;case 35679:case 36299:case 36307:return Ig;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Lg}}function Ug(i,e){i.uniform1fv(this.addr,e)}function Fg(i,e){const t=er(e,this.size,2);i.uniform2fv(this.addr,t)}function Og(i,e){const t=er(e,this.size,3);i.uniform3fv(this.addr,t)}function Bg(i,e){const t=er(e,this.size,4);i.uniform4fv(this.addr,t)}function kg(i,e){const t=er(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function zg(i,e){const t=er(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Vg(i,e){const t=er(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hg(i,e){i.uniform1iv(this.addr,e)}function Gg(i,e){i.uniform2iv(this.addr,e)}function Wg(i,e){i.uniform3iv(this.addr,e)}function Xg(i,e){i.uniform4iv(this.addr,e)}function qg(i,e){i.uniform1uiv(this.addr,e)}function Yg(i,e){i.uniform2uiv(this.addr,e)}function Zg(i,e){i.uniform3uiv(this.addr,e)}function $g(i,e){i.uniform4uiv(this.addr,e)}function Kg(i,e,t){const n=this.cache,s=e.length,r=Ja(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Wl:a=Ou;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Jg(i,e,t){const n=this.cache,s=e.length,r=Ja(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ku,r[a])}function jg(i,e,t){const n=this.cache,s=e.length,r=Ja(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||zu,r[a])}function Qg(i,e,t){const n=this.cache,s=e.length,r=Ja(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Bu,r[a])}function e_(i){switch(i){case 5126:return Ug;case 35664:return Fg;case 35665:return Og;case 35666:return Bg;case 35674:return kg;case 35675:return zg;case 35676:return Vg;case 5124:case 35670:return Hg;case 35667:case 35671:return Gg;case 35668:case 35672:return Wg;case 35669:case 35673:return Xg;case 5125:return qg;case 36294:return Yg;case 36295:return Zg;case 36296:return $g;case 35678:case 36198:case 36298:case 36306:case 35682:return Kg;case 35679:case 36299:case 36307:return Jg;case 35680:case 36300:case 36308:case 36293:return jg;case 36289:case 36303:case 36311:case 36292:return Qg}}class t_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ng(t.type)}}class n_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=e_(t.type)}}class i_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const ko=/(\w+)(\])?(\[|\.)?/g;function Ph(i,e){i.seq.push(e),i.map[e.id]=e}function s_(i,e,t){const n=i.name,s=n.length;for(ko.lastIndex=0;;){const r=ko.exec(n),a=ko.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){Ph(t,l===void 0?new t_(c,i,e):new n_(c,i,e));break}else{let f=t.map[c];f===void 0&&(f=new i_(c),Ph(t,f)),t=f}}}class La{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);s_(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ih(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const r_=37297;let a_=0;function o_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const Dh=new _t;function l_(i){Dt._getMatrix(Dh,Dt.workingColorSpace,i);const e=`mat3( ${Dh.elements.map(t=>t.toFixed(4))} )`;switch(Dt.getTransfer(i)){case Ba:return[e,"LinearTransferOETF"];case Vt:return[e,"sRGBTransferOETF"];default:return ht("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Lh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+o_(i.getShaderSource(e),c)}else return r}function c_(i,e){const t=l_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const h_={[$h]:"Linear",[Kh]:"Reinhard",[Jh]:"Cineon",[$l]:"ACESFilmic",[Qh]:"AgX",[eu]:"Neutral",[jh]:"Custom"};function u_(i,e){const t=h_[e];return t===void 0?(ht("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sa=new I;function f_(){Dt.getLuminanceCoefficients(Sa);const i=Sa.x.toFixed(4),e=Sa.y.toFixed(4),t=Sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function p_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function m_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function Er(i){return i!==""}function Nh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Uh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const g_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xl(i){return i.replace(g_,v_)}const __=new Map;function v_(i,e){let t=bt[e];if(t===void 0){const n=__.get(e);if(n!==void 0)t=bt[n],ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Xl(t)}const x_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fh(i){return i.replace(x_,y_)}function y_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Oh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const M_={[Tr]:"SHADOWMAP_TYPE_PCF",[br]:"SHADOWMAP_TYPE_VSM"};function b_(i){return M_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const S_={[us]:"ENVMAP_TYPE_CUBE",[$s]:"ENVMAP_TYPE_CUBE",[Za]:"ENVMAP_TYPE_CUBE_UV"};function w_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":S_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const E_={[$s]:"ENVMAP_MODE_REFRACTION"};function T_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":E_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const A_={[Zl]:"ENVMAP_BLENDING_MULTIPLY",[Df]:"ENVMAP_BLENDING_MIX",[Lf]:"ENVMAP_BLENDING_ADD"};function R_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":A_[i.combine]||"ENVMAP_BLENDING_NONE"}function C_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function P_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=b_(t),l=w_(t),u=T_(t),f=R_(t),h=C_(t),d=d_(t),g=p_(r),_=s.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Er).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(m=[Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?bt.tonemapping_pars_fragment:"",t.toneMapping!==mi?u_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,c_("linearToOutputTexel",t.outputColorSpace),f_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),a=Xl(a),a=Nh(a,t),a=Uh(a,t),c=Xl(c),c=Nh(c,t),c=Uh(c,t),a=Fh(a),c=Fh(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Uc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+a,x=M+p+c,E=Ih(s,s.VERTEX_SHADER,y),w=Ih(s,s.FRAGMENT_SHADER,x);s.attachShader(_,E),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(N){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(_)||"",Z=s.getShaderInfoLog(E)||"",K=s.getShaderInfoLog(w)||"",B=O.trim(),$=Z.trim(),G=K.trim();let ie=!0,le=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,w);else{const re=Lh(s,E,"vertex"),fe=Lh(s,w,"fragment");At("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+B+`
`+re+`
`+fe)}else B!==""?ht("WebGLProgram: Program Info Log:",B):($===""||G==="")&&(le=!1);le&&(N.diagnostics={runnable:ie,programLog:B,vertexShader:{log:$,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(E),s.deleteShader(w),v=new La(s,_),T=m_(s,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(_,r_)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=a_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=w,this}let I_=0;class D_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new L_(e),t.set(e,n)),n}}class L_{constructor(e){this.id=I_++,this.code=e,this.usedTimes=0}}function N_(i){return i===fs||i===Na||i===Ua}function U_(i,e,t,n,s,r){const a=new ac,c=new D_,o=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer;let h=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return o.add(v),v===0?"uv":`uv${v}`}function _(v,T,P,N,O,Z){const K=N.fog,B=O.geometry,$=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||$,G),le=ie&&ie.mapping===Za?ie.image.height:null,re=d[v.type];v.precision!==null&&(h=n.getMaxPrecision(v.precision),h!==v.precision&&ht("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const fe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ye=fe!==void 0?fe.length:0;let Xe=0;B.morphAttributes.position!==void 0&&(Xe=1),B.morphAttributes.normal!==void 0&&(Xe=2),B.morphAttributes.color!==void 0&&(Xe=3);let me,ue,Y,he;if(re){const qe=ui[re];me=qe.vertexShader,ue=qe.fragmentShader}else{me=v.vertexShader,ue=v.fragmentShader;const qe=c.getVertexShaderStage(v),Ht=c.getFragmentShaderStage(v);c.update(v,qe,Ht),Y=qe.id,he=Ht.id}const ce=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),He=O.isInstancedMesh===!0,Be=O.isBatchedMesh===!0,ot=!!v.map,Je=!!v.matcap,oe=!!ie,de=!!v.aoMap,xe=!!v.lightMap,we=!!v.bumpMap&&v.wireframe===!1,Ee=!!v.normalMap,nt=!!v.displacementMap,Ze=!!v.emissiveMap,lt=!!v.metalnessMap,ft=!!v.roughnessMap,V=v.anisotropy>0,Lt=v.clearcoat>0,wt=v.dispersion>0,D=v.iridescence>0,b=v.sheen>0,q=v.transmission>0,Q=V&&!!v.anisotropyMap,ae=Lt&&!!v.clearcoatMap,ve=Lt&&!!v.clearcoatNormalMap,Ae=Lt&&!!v.clearcoatRoughnessMap,se=D&&!!v.iridescenceMap,_e=D&&!!v.iridescenceThicknessMap,De=b&&!!v.sheenColorMap,je=b&&!!v.sheenRoughnessMap,Le=!!v.specularMap,Pe=!!v.specularColorMap,$e=!!v.specularIntensityMap,at=q&&!!v.transmissionMap,pt=q&&!!v.thicknessMap,H=!!v.gradientMap,Ce=!!v.alphaMap,ge=v.alphaTest>0,Ie=!!v.alphaHash,ke=!!v.extensions;let Me=mi;v.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Me=i.toneMapping);const Ke={shaderID:re,shaderType:v.type,shaderName:v.name,vertexShader:me,fragmentShader:ue,defines:v.defines,customVertexShaderID:Y,customFragmentShaderID:he,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:Be,batchingColor:Be&&O._colorsTexture!==null,instancing:He,instancingColor:He&&O.instanceColor!==null,instancingMorph:He&&O.morphTexture!==null,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Dt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ot,matcap:Je,envMap:oe,envMapMode:oe&&ie.mapping,envMapCubeUVHeight:le,aoMap:de,lightMap:xe,bumpMap:we,normalMap:Ee,displacementMap:nt,emissiveMap:Ze,normalMapObjectSpace:Ee&&v.normalMapType===Ff,normalMapTangentSpace:Ee&&v.normalMapType===Fa,packedNormalMap:Ee&&v.normalMapType===Fa&&N_(v.normalMap.format),metalnessMap:lt,roughnessMap:ft,anisotropy:V,anisotropyMap:Q,clearcoat:Lt,clearcoatMap:ae,clearcoatNormalMap:ve,clearcoatRoughnessMap:Ae,dispersion:wt,iridescence:D,iridescenceMap:se,iridescenceThicknessMap:_e,sheen:b,sheenColorMap:De,sheenRoughnessMap:je,specularMap:Le,specularColorMap:Pe,specularIntensityMap:$e,transmission:q,transmissionMap:at,thicknessMap:pt,gradientMap:H,opaque:v.transparent===!1&&v.blending===Ws&&v.alphaToCoverage===!1,alphaMap:Ce,alphaTest:ge,alphaHash:Ie,combine:v.combine,mapUv:ot&&g(v.map.channel),aoMapUv:de&&g(v.aoMap.channel),lightMapUv:xe&&g(v.lightMap.channel),bumpMapUv:we&&g(v.bumpMap.channel),normalMapUv:Ee&&g(v.normalMap.channel),displacementMapUv:nt&&g(v.displacementMap.channel),emissiveMapUv:Ze&&g(v.emissiveMap.channel),metalnessMapUv:lt&&g(v.metalnessMap.channel),roughnessMapUv:ft&&g(v.roughnessMap.channel),anisotropyMapUv:Q&&g(v.anisotropyMap.channel),clearcoatMapUv:ae&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ve&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:De&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:je&&g(v.sheenRoughnessMap.channel),specularMapUv:Le&&g(v.specularMap.channel),specularColorMapUv:Pe&&g(v.specularColorMap.channel),specularIntensityMapUv:$e&&g(v.specularIntensityMap.channel),transmissionMapUv:at&&g(v.transmissionMap.channel),thicknessMapUv:pt&&g(v.thicknessMap.channel),alphaMapUv:Ce&&g(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Ee||V),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!B.attributes.uv&&(ot||Ce),fog:!!K,useFog:v.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&Ee===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Se,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Xe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Me,decodeVideoTexture:ot&&v.map.isVideoTexture===!0&&Dt.getTransfer(v.map.colorSpace)===Vt,decodeVideoTextureEmissive:Ze&&v.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(v.emissiveMap.colorSpace)===Vt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Zt,flipSided:v.side===wn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ke&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&v.extensions.multiDraw===!0||Be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ke.vertexUv1s=o.has(1),Ke.vertexUv2s=o.has(2),Ke.vertexUv3s=o.has(3),o.clear(),Ke}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)T.push(P),T.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(p(T,v),M(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function p(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function y(v){const T=d[v.type];let P;if(T){const N=ui[T];P=jd.clone(N.uniforms)}else P=v.uniforms;return P}function x(v,T){let P=u.get(T);return P!==void 0?++P.usedTimes:(P=new P_(i,T,v,s),l.push(P),u.set(T,P)),P}function E(v){if(--v.usedTimes===0){const T=l.indexOf(v);l[T]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function w(v){c.remove(v)}function R(){c.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:y,acquireProgram:x,releaseProgram:E,releaseShaderCache:w,programs:l,dispose:R}}function F_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function O_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Bh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function kh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function c(h,d,g,_,m,p){let M=i[e];return M===void 0?(M={id:h.id,object:h,geometry:d,material:g,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:m,group:p},i[e]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=g,M.materialVariant=a(h),M.groupOrder=_,M.renderOrder=h.renderOrder,M.z=m,M.group=p),e++,M}function o(h,d,g,_,m,p){const M=c(h,d,g,_,m,p);g.transmission>0?n.push(M):g.transparent===!0?s.push(M):t.push(M)}function l(h,d,g,_,m,p){const M=c(h,d,g,_,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function u(h,d,g){t.length>1&&t.sort(h||O_),n.length>1&&n.sort(d||Bh),s.length>1&&s.sort(d||Bh),g&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let h=e,d=i.length;h<d;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:f,sort:u}}function B_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new kh,i.set(n,[a])):s>=r.length?(a=new kh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function k_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new vt};break;case"SpotLight":t={position:new I,direction:new I,color:new vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new vt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new vt,groundColor:new vt};break;case"RectAreaLight":t={color:new vt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function z_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let V_=0;function H_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function G_(i){const e=new k_,t=z_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new Bt,a=new Bt;function c(l){let u=0,f=0,h=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,y=0,x=0,E=0,w=0,R=0;l.sort(H_);for(let T=0,P=l.length;T<P;T++){const N=l[T],O=N.color,Z=N.intensity,K=N.distance;let B=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===fs?B=N.shadow.map.texture:B=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=O.r*Z,f+=O.g*Z,h+=O.b*Z;else if(N.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(N.sh.coefficients[$],Z);R++}else if(N.isDirectionalLight){const $=e.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const G=N.shadow,ie=t.get(N);ie.shadowIntensity=G.intensity,ie.shadowBias=G.bias,ie.shadowNormalBias=G.normalBias,ie.shadowRadius=G.radius,ie.shadowMapSize=G.mapSize,n.directionalShadow[d]=ie,n.directionalShadowMap[d]=B,n.directionalShadowMatrix[d]=N.shadow.matrix,M++}n.directional[d]=$,d++}else if(N.isSpotLight){const $=e.get(N);$.position.setFromMatrixPosition(N.matrixWorld),$.color.copy(O).multiplyScalar(Z),$.distance=K,$.coneCos=Math.cos(N.angle),$.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),$.decay=N.decay,n.spot[_]=$;const G=N.shadow;if(N.map&&(n.spotLightMap[E]=N.map,E++,G.updateMatrices(N),N.castShadow&&w++),n.spotLightMatrix[_]=G.matrix,N.castShadow){const ie=t.get(N);ie.shadowIntensity=G.intensity,ie.shadowBias=G.bias,ie.shadowNormalBias=G.normalBias,ie.shadowRadius=G.radius,ie.shadowMapSize=G.mapSize,n.spotShadow[_]=ie,n.spotShadowMap[_]=B,x++}_++}else if(N.isRectAreaLight){const $=e.get(N);$.color.copy(O).multiplyScalar(Z),$.halfWidth.set(N.width*.5,0,0),$.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=$,m++}else if(N.isPointLight){const $=e.get(N);if($.color.copy(N.color).multiplyScalar(N.intensity),$.distance=N.distance,$.decay=N.decay,N.castShadow){const G=N.shadow,ie=t.get(N);ie.shadowIntensity=G.intensity,ie.shadowBias=G.bias,ie.shadowNormalBias=G.normalBias,ie.shadowRadius=G.radius,ie.shadowMapSize=G.mapSize,ie.shadowCameraNear=G.camera.near,ie.shadowCameraFar=G.camera.far,n.pointShadow[g]=ie,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=N.shadow.matrix,y++}n.point[g]=$,g++}else if(N.isHemisphereLight){const $=e.get(N);$.skyColor.copy(N.color).multiplyScalar(Z),$.groundColor.copy(N.groundColor).multiplyScalar(Z),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ze.LTC_FLOAT_1,n.rectAreaLTC2=ze.LTC_FLOAT_2):(n.rectAreaLTC1=ze.LTC_HALF_1,n.rectAreaLTC2=ze.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const v=n.hash;(v.directionalLength!==d||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==M||v.numPointShadows!==y||v.numSpotShadows!==x||v.numSpotMaps!==E||v.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,v.directionalLength=d,v.pointLength=g,v.spotLength=_,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=M,v.numPointShadows=y,v.numSpotShadows=x,v.numSpotMaps=E,v.numLightProbes=R,n.version=V_++)}function o(l,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const y=l[p];if(y.isDirectionalLight){const x=n.directional[f];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(y.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),h++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:c,setupView:o,state:n}}function zh(i){const e=new G_(i),t=[],n=[],s=[];function r(h){f.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function c(h){n.push(h)}function o(h){s.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function W_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new zh(i),e.set(s,[c])):r>=a.length?(c=new zh(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const X_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q_=`uniform sampler2D shadow_pass;
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
}`,Y_=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Z_=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Vh=new Bt,vr=new I,zo=new I;function $_(i,e,t){let n=new oc;const s=new J,r=new J,a=new jt,c=new i0,o=new s0,l={},u=t.maxTextureSize,f={[Yi]:wn,[wn]:Yi,[Zt]:Zt},h=new xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:X_,fragmentShader:q_}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new sn;g.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new pe(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tr;let p=this.type;this.render=function(w,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===df&&(ht("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Tr);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Pi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const Z=p!==this.type;Z&&R.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(B=>B.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,B=w.length;K<B;K++){const $=w[K],G=$.shadow;if(G===void 0){ht("WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ie=G.getFrameExtents();s.multiply(ie),r.copy(G.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ie.x),s.x=r.x*ie.x,G.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ie.y),s.y=r.y*ie.y,G.mapSize.y=r.y));const le=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=le,G.map===null||Z===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===br){if($.isPointLight){ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new gi(s.x,s.y,{format:fs,type:Li,minFilter:xn,magFilter:xn,generateMipmaps:!1}),G.map.texture.name=$.name+".shadowMap",G.map.depthTexture=new Ks(s.x,s.y,ti),G.map.depthTexture.name=$.name+".shadowMapDepth",G.map.depthTexture.format=Ni,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=fn,G.map.depthTexture.magFilter=fn}else $.isPointLight?(G.map=new Fu(s.x),G.map.depthTexture=new xd(s.x,vi)):(G.map=new gi(s.x,s.y),G.map.depthTexture=new Ks(s.x,s.y,vi)),G.map.depthTexture.name=$.name+".shadowMap",G.map.depthTexture.format=Ni,this.type===Tr?(G.map.depthTexture.compareFunction=le?sc:ic,G.map.depthTexture.minFilter=xn,G.map.depthTexture.magFilter=xn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=fn,G.map.depthTexture.magFilter=fn);G.camera.updateProjectionMatrix()}const re=G.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<re;fe++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(G.map),i.clear());const ye=G.getViewport(fe);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),O.viewport(a)}if($.isPointLight){const ye=G.camera,Xe=G.matrix,me=$.distance||ye.far;me!==ye.far&&(ye.far=me,ye.updateProjectionMatrix()),vr.setFromMatrixPosition($.matrixWorld),ye.position.copy(vr),zo.copy(ye.position),zo.add(Y_[fe]),ye.up.copy(Z_[fe]),ye.lookAt(zo),ye.updateMatrixWorld(),Xe.makeTranslation(-vr.x,-vr.y,-vr.z),Vh.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Vh,ye.coordinateSystem,ye.reversedDepth)}else G.updateMatrices($);n=G.getFrustum(),x(R,v,G.camera,$,this.type)}G.isPointLightShadow!==!0&&this.type===br&&M(G,v),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,P,N)};function M(w,R){const v=e.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new gi(s.x,s.y,{format:fs,type:Li})),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,v,h,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,v,d,_,null)}function y(w,R,v,T){let P=null;const N=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)P=N;else if(P=v.isPointLight===!0?o:c,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const O=P.uuid,Z=R.uuid;let K=l[O];K===void 0&&(K={},l[O]=K);let B=K[Z];B===void 0&&(B=P.clone(),K[Z]=B,R.addEventListener("dispose",E)),P=B}if(P.visible=R.visible,P.wireframe=R.wireframe,T===br?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:f[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const O=i.properties.get(P);O.light=v}return P}function x(w,R,v,T,P){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===br)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const Z=e.update(w),K=w.material;if(Array.isArray(K)){const B=Z.groups;for(let $=0,G=B.length;$<G;$++){const ie=B[$],le=K[ie.materialIndex];if(le&&le.visible){const re=y(w,le,T,P);w.onBeforeShadow(i,w,R,v,Z,re,ie),i.renderBufferDirect(v,null,Z,re,w,ie),w.onAfterShadow(i,w,R,v,Z,re,ie)}}}else if(K.visible){const B=y(w,K,T,P);w.onBeforeShadow(i,w,R,v,Z,B,null),i.renderBufferDirect(v,null,Z,B,w,null),w.onAfterShadow(i,w,R,v,Z,B,null)}}const O=w.children;for(let Z=0,K=O.length;Z<K;Z++)x(O[Z],R,v,T,P)}function E(w){w.target.removeEventListener("dispose",E);for(const v in l){const T=l[v],P=w.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function K_(i,e){function t(){let H=!1;const Ce=new jt;let ge=null;const Ie=new jt(0,0,0,0);return{setMask:function(ke){ge!==ke&&!H&&(i.colorMask(ke,ke,ke,ke),ge=ke)},setLocked:function(ke){H=ke},setClear:function(ke,Me,Ke,qe,Ht){Ht===!0&&(ke*=qe,Me*=qe,Ke*=qe),Ce.set(ke,Me,Ke,qe),Ie.equals(Ce)===!1&&(i.clearColor(ke,Me,Ke,qe),Ie.copy(Ce))},reset:function(){H=!1,ge=null,Ie.set(-1,0,0,0)}}}function n(){let H=!1,Ce=!1,ge=null,Ie=null,ke=null;return{setReversed:function(Me){if(Ce!==Me){const Ke=e.get("EXT_clip_control");Me?Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.ZERO_TO_ONE_EXT):Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.NEGATIVE_ONE_TO_ONE_EXT),Ce=Me;const qe=ke;ke=null,this.setClear(qe)}},getReversed:function(){return Ce},setTest:function(Me){Me?ce(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(Me){ge!==Me&&!H&&(i.depthMask(Me),ge=Me)},setFunc:function(Me){if(Ce&&(Me=qf[Me]),Ie!==Me){switch(Me){case Qo:i.depthFunc(i.NEVER);break;case el:i.depthFunc(i.ALWAYS);break;case tl:i.depthFunc(i.LESS);break;case Zs:i.depthFunc(i.LEQUAL);break;case nl:i.depthFunc(i.EQUAL);break;case il:i.depthFunc(i.GEQUAL);break;case sl:i.depthFunc(i.GREATER);break;case rl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ie=Me}},setLocked:function(Me){H=Me},setClear:function(Me){ke!==Me&&(ke=Me,Ce&&(Me=1-Me),i.clearDepth(Me))},reset:function(){H=!1,ge=null,Ie=null,ke=null,Ce=!1}}}function s(){let H=!1,Ce=null,ge=null,Ie=null,ke=null,Me=null,Ke=null,qe=null,Ht=null;return{setTest:function(Ut){H||(Ut?ce(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(Ut){Ce!==Ut&&!H&&(i.stencilMask(Ut),Ce=Ut)},setFunc:function(Ut,Un,dn){(ge!==Ut||Ie!==Un||ke!==dn)&&(i.stencilFunc(Ut,Un,dn),ge=Ut,Ie=Un,ke=dn)},setOp:function(Ut,Un,dn){(Me!==Ut||Ke!==Un||qe!==dn)&&(i.stencilOp(Ut,Un,dn),Me=Ut,Ke=Un,qe=dn)},setLocked:function(Ut){H=Ut},setClear:function(Ut){Ht!==Ut&&(i.clearStencil(Ut),Ht=Ut)},reset:function(){H=!1,Ce=null,ge=null,Ie=null,ke=null,Me=null,Ke=null,qe=null,Ht=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let u={},f={},h={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,y=null,x=null,E=null,w=null,R=null,v=new vt(0,0,0),T=0,P=!1,N=null,O=null,Z=null,K=null,B=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ie=0;const le=i.getParameter(i.VERSION);le.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(le)[1]),G=ie>=1):le.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),G=ie>=2);let re=null,fe={};const ye=i.getParameter(i.SCISSOR_BOX),Xe=i.getParameter(i.VIEWPORT),me=new jt().fromArray(ye),ue=new jt().fromArray(Xe);function Y(H,Ce,ge,Ie){const ke=new Uint8Array(4),Me=i.createTexture();i.bindTexture(H,Me),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ke=0;Ke<ge;Ke++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(Ce,0,i.RGBA,1,1,Ie,0,i.RGBA,i.UNSIGNED_BYTE,ke):i.texImage2D(Ce+Ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ke);return Me}const he={};he[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),he[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),he[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),ce(i.DEPTH_TEST),a.setFunc(Zs),we(!1),Ee(Pc),ce(i.CULL_FACE),de(Pi);function ce(H){u[H]!==!0&&(i.enable(H),u[H]=!0)}function Se(H){u[H]!==!1&&(i.disable(H),u[H]=!1)}function He(H,Ce){return h[H]!==Ce?(i.bindFramebuffer(H,Ce),h[H]=Ce,H===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Ce),H===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Be(H,Ce){let ge=g,Ie=!1;if(H){ge=d.get(Ce),ge===void 0&&(ge=[],d.set(Ce,ge));const ke=H.textures;if(ge.length!==ke.length||ge[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,Ke=ke.length;Me<Ke;Me++)ge[Me]=i.COLOR_ATTACHMENT0+Me;ge.length=ke.length,Ie=!0}}else ge[0]!==i.BACK&&(ge[0]=i.BACK,Ie=!0);Ie&&i.drawBuffers(ge)}function ot(H){return _!==H?(i.useProgram(H),_=H,!0):!1}const Je={[as]:i.FUNC_ADD,[mf]:i.FUNC_SUBTRACT,[gf]:i.FUNC_REVERSE_SUBTRACT};Je[_f]=i.MIN,Je[vf]=i.MAX;const oe={[xf]:i.ZERO,[yf]:i.ONE,[Mf]:i.SRC_COLOR,[Jo]:i.SRC_ALPHA,[Af]:i.SRC_ALPHA_SATURATE,[Ef]:i.DST_COLOR,[Sf]:i.DST_ALPHA,[bf]:i.ONE_MINUS_SRC_COLOR,[jo]:i.ONE_MINUS_SRC_ALPHA,[Tf]:i.ONE_MINUS_DST_COLOR,[wf]:i.ONE_MINUS_DST_ALPHA,[Rf]:i.CONSTANT_COLOR,[Cf]:i.ONE_MINUS_CONSTANT_COLOR,[Pf]:i.CONSTANT_ALPHA,[If]:i.ONE_MINUS_CONSTANT_ALPHA};function de(H,Ce,ge,Ie,ke,Me,Ke,qe,Ht,Ut){if(H===Pi){m===!0&&(Se(i.BLEND),m=!1);return}if(m===!1&&(ce(i.BLEND),m=!0),H!==pf){if(H!==p||Ut!==P){if((M!==as||E!==as)&&(i.blendEquation(i.FUNC_ADD),M=as,E=as),Ut)switch(H){case Ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ic:i.blendFunc(i.ONE,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:At("WebGLState: Invalid blending: ",H);break}else switch(H){case Ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ic:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Dc:At("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lc:At("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:At("WebGLState: Invalid blending: ",H);break}y=null,x=null,w=null,R=null,v.set(0,0,0),T=0,p=H,P=Ut}return}ke=ke||Ce,Me=Me||ge,Ke=Ke||Ie,(Ce!==M||ke!==E)&&(i.blendEquationSeparate(Je[Ce],Je[ke]),M=Ce,E=ke),(ge!==y||Ie!==x||Me!==w||Ke!==R)&&(i.blendFuncSeparate(oe[ge],oe[Ie],oe[Me],oe[Ke]),y=ge,x=Ie,w=Me,R=Ke),(qe.equals(v)===!1||Ht!==T)&&(i.blendColor(qe.r,qe.g,qe.b,Ht),v.copy(qe),T=Ht),p=H,P=!1}function xe(H,Ce){H.side===Zt?Se(i.CULL_FACE):ce(i.CULL_FACE);let ge=H.side===wn;Ce&&(ge=!ge),we(ge),H.blending===Ws&&H.transparent===!1?de(Pi):de(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),r.setMask(H.colorWrite);const Ie=H.stencilWrite;c.setTest(Ie),Ie&&(c.setMask(H.stencilWriteMask),c.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),c.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ze(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function we(H){N!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),N=H)}function Ee(H){H!==uf?(ce(i.CULL_FACE),H!==O&&(H===Pc?i.cullFace(i.BACK):H===ff?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),O=H}function nt(H){H!==Z&&(G&&i.lineWidth(H),Z=H)}function Ze(H,Ce,ge){H?(ce(i.POLYGON_OFFSET_FILL),(K!==Ce||B!==ge)&&(K=Ce,B=ge,a.getReversed()&&(Ce=-Ce),i.polygonOffset(Ce,ge))):Se(i.POLYGON_OFFSET_FILL)}function lt(H){H?ce(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function ft(H){H===void 0&&(H=i.TEXTURE0+$-1),re!==H&&(i.activeTexture(H),re=H)}function V(H,Ce,ge){ge===void 0&&(re===null?ge=i.TEXTURE0+$-1:ge=re);let Ie=fe[ge];Ie===void 0&&(Ie={type:void 0,texture:void 0},fe[ge]=Ie),(Ie.type!==H||Ie.texture!==Ce)&&(re!==ge&&(i.activeTexture(ge),re=ge),i.bindTexture(H,Ce||he[H]),Ie.type=H,Ie.texture=Ce)}function Lt(){const H=fe[re];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function wt(){try{i.compressedTexImage2D(...arguments)}catch(H){At("WebGLState:",H)}}function D(){try{i.compressedTexImage3D(...arguments)}catch(H){At("WebGLState:",H)}}function b(){try{i.texSubImage2D(...arguments)}catch(H){At("WebGLState:",H)}}function q(){try{i.texSubImage3D(...arguments)}catch(H){At("WebGLState:",H)}}function Q(){try{i.compressedTexSubImage2D(...arguments)}catch(H){At("WebGLState:",H)}}function ae(){try{i.compressedTexSubImage3D(...arguments)}catch(H){At("WebGLState:",H)}}function ve(){try{i.texStorage2D(...arguments)}catch(H){At("WebGLState:",H)}}function Ae(){try{i.texStorage3D(...arguments)}catch(H){At("WebGLState:",H)}}function se(){try{i.texImage2D(...arguments)}catch(H){At("WebGLState:",H)}}function _e(){try{i.texImage3D(...arguments)}catch(H){At("WebGLState:",H)}}function De(H){return f[H]!==void 0?f[H]:i.getParameter(H)}function je(H,Ce){f[H]!==Ce&&(i.pixelStorei(H,Ce),f[H]=Ce)}function Le(H){me.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),me.copy(H))}function Pe(H){ue.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),ue.copy(H))}function $e(H,Ce){let ge=l.get(Ce);ge===void 0&&(ge=new WeakMap,l.set(Ce,ge));let Ie=ge.get(H);Ie===void 0&&(Ie=i.getUniformBlockIndex(Ce,H.name),ge.set(H,Ie))}function at(H,Ce){const Ie=l.get(Ce).get(H);o.get(Ce)!==Ie&&(i.uniformBlockBinding(Ce,Ie,H.__bindingPointIndex),o.set(Ce,Ie))}function pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},re=null,fe={},h={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,y=null,x=null,E=null,w=null,R=null,v=new vt(0,0,0),T=0,P=!1,N=null,O=null,Z=null,K=null,B=null,me.set(0,0,i.canvas.width,i.canvas.height),ue.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:ce,disable:Se,bindFramebuffer:He,drawBuffers:Be,useProgram:ot,setBlending:de,setMaterial:xe,setFlipSided:we,setCullFace:Ee,setLineWidth:nt,setPolygonOffset:Ze,setScissorTest:lt,activeTexture:ft,bindTexture:V,unbindTexture:Lt,compressedTexImage2D:wt,compressedTexImage3D:D,texImage2D:se,texImage3D:_e,pixelStorei:je,getParameter:De,updateUBOMapping:$e,uniformBlockBinding:at,texStorage2D:ve,texStorage3D:Ae,texSubImage2D:b,texSubImage3D:q,compressedTexSubImage2D:Q,compressedTexSubImage3D:ae,scissor:Le,viewport:Pe,reset:pt}}function J_(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new J,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,b){return g?new OffscreenCanvas(D,b):ka("canvas")}function m(D,b,q){let Q=1;const ae=wt(D);if((ae.width>q||ae.height>q)&&(Q=q/Math.max(ae.width,ae.height)),Q<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ve=Math.floor(Q*ae.width),Ae=Math.floor(Q*ae.height);h===void 0&&(h=_(ve,Ae));const se=b?_(ve,Ae):h;return se.width=ve,se.height=Ae,se.getContext("2d").drawImage(D,0,0,ve,Ae),ht("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ve+"x"+Ae+")."),se}else return"data"in D&&ht("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),D;return D}function p(D){return D.generateMipmaps}function M(D){i.generateMipmap(D)}function y(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(D,b,q,Q,ae,ve=!1){if(D!==null){if(i[D]!==void 0)return i[D];ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Ae;Q&&(Ae=e.get("EXT_texture_norm16"),Ae||ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=b;if(b===i.RED&&(q===i.FLOAT&&(se=i.R32F),q===i.HALF_FLOAT&&(se=i.R16F),q===i.UNSIGNED_BYTE&&(se=i.R8),q===i.UNSIGNED_SHORT&&Ae&&(se=Ae.R16_EXT),q===i.SHORT&&Ae&&(se=Ae.R16_SNORM_EXT)),b===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.R8UI),q===i.UNSIGNED_SHORT&&(se=i.R16UI),q===i.UNSIGNED_INT&&(se=i.R32UI),q===i.BYTE&&(se=i.R8I),q===i.SHORT&&(se=i.R16I),q===i.INT&&(se=i.R32I)),b===i.RG&&(q===i.FLOAT&&(se=i.RG32F),q===i.HALF_FLOAT&&(se=i.RG16F),q===i.UNSIGNED_BYTE&&(se=i.RG8),q===i.UNSIGNED_SHORT&&Ae&&(se=Ae.RG16_EXT),q===i.SHORT&&Ae&&(se=Ae.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.RG8UI),q===i.UNSIGNED_SHORT&&(se=i.RG16UI),q===i.UNSIGNED_INT&&(se=i.RG32UI),q===i.BYTE&&(se=i.RG8I),q===i.SHORT&&(se=i.RG16I),q===i.INT&&(se=i.RG32I)),b===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.RGB8UI),q===i.UNSIGNED_SHORT&&(se=i.RGB16UI),q===i.UNSIGNED_INT&&(se=i.RGB32UI),q===i.BYTE&&(se=i.RGB8I),q===i.SHORT&&(se=i.RGB16I),q===i.INT&&(se=i.RGB32I)),b===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(se=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(se=i.RGBA16UI),q===i.UNSIGNED_INT&&(se=i.RGBA32UI),q===i.BYTE&&(se=i.RGBA8I),q===i.SHORT&&(se=i.RGBA16I),q===i.INT&&(se=i.RGBA32I)),b===i.RGB&&(q===i.UNSIGNED_SHORT&&Ae&&(se=Ae.RGB16_EXT),q===i.SHORT&&Ae&&(se=Ae.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(se=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(se=i.R11F_G11F_B10F)),b===i.RGBA){const _e=ve?Ba:Dt.getTransfer(ae);q===i.FLOAT&&(se=i.RGBA32F),q===i.HALF_FLOAT&&(se=i.RGBA16F),q===i.UNSIGNED_BYTE&&(se=_e===Vt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&Ae&&(se=Ae.RGBA16_EXT),q===i.SHORT&&Ae&&(se=Ae.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(se=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(se=i.RGB5_A1)}return(se===i.R16F||se===i.R32F||se===i.RG16F||se===i.RG32F||se===i.RGBA16F||se===i.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function E(D,b){let q;return D?b===null||b===vi||b===Ir?q=i.DEPTH24_STENCIL8:b===ti?q=i.DEPTH32F_STENCIL8:b===Pr&&(q=i.DEPTH24_STENCIL8,ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===vi||b===Ir?q=i.DEPTH_COMPONENT24:b===ti?q=i.DEPTH_COMPONENT32F:b===Pr&&(q=i.DEPTH_COMPONENT16),q}function w(D,b){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==fn&&D.minFilter!==xn?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function R(D){const b=D.target;b.removeEventListener("dispose",R),T(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&f.delete(b)}function v(D){const b=D.target;b.removeEventListener("dispose",v),N(b)}function T(D){const b=n.get(D);if(b.__webglInit===void 0)return;const q=D.source,Q=d.get(q);if(Q){const ae=Q[b.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&P(D),Object.keys(Q).length===0&&d.delete(q)}n.remove(D)}function P(D){const b=n.get(D);i.deleteTexture(b.__webglTexture);const q=D.source,Q=d.get(q);delete Q[b.__cacheKey],a.memory.textures--}function N(D){const b=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(b.__webglFramebuffer[Q]))for(let ae=0;ae<b.__webglFramebuffer[Q].length;ae++)i.deleteFramebuffer(b.__webglFramebuffer[Q][ae]);else i.deleteFramebuffer(b.__webglFramebuffer[Q]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[Q])}else{if(Array.isArray(b.__webglFramebuffer))for(let Q=0;Q<b.__webglFramebuffer.length;Q++)i.deleteFramebuffer(b.__webglFramebuffer[Q]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Q=0;Q<b.__webglColorRenderbuffer.length;Q++)b.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[Q]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const q=D.textures;for(let Q=0,ae=q.length;Q<ae;Q++){const ve=n.get(q[Q]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(q[Q])}n.remove(D)}let O=0;function Z(){O=0}function K(){return O}function B(D){O=D}function $(){const D=O;return D>=s.maxTextures&&ht("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),O+=1,D}function G(D){const b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function ie(D,b){const q=n.get(D);if(D.isVideoTexture&&V(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&q.__version!==D.version){const Q=D.image;if(Q===null)ht("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)ht("WebGLRenderer: Texture marked for update but image is incomplete");else{Se(q,D,b);return}}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+b)}function le(D,b){const q=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){Se(q,D,b);return}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+b)}function re(D,b){const q=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){Se(q,D,b);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+b)}function fe(D,b){const q=n.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&q.__version!==D.version){He(q,D,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+b)}const ye={[vn]:i.REPEAT,[Ci]:i.CLAMP_TO_EDGE,[al]:i.MIRRORED_REPEAT},Xe={[fn]:i.NEAREST,[Nf]:i.NEAREST_MIPMAP_NEAREST,[Zr]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[so]:i.LINEAR_MIPMAP_NEAREST,[ls]:i.LINEAR_MIPMAP_LINEAR},me={[Of]:i.NEVER,[Hf]:i.ALWAYS,[Bf]:i.LESS,[ic]:i.LEQUAL,[kf]:i.EQUAL,[sc]:i.GEQUAL,[zf]:i.GREATER,[Vf]:i.NOTEQUAL};function ue(D,b){if(b.type===ti&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===xn||b.magFilter===so||b.magFilter===Zr||b.magFilter===ls||b.minFilter===xn||b.minFilter===so||b.minFilter===Zr||b.minFilter===ls)&&ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,ye[b.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,ye[b.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,ye[b.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Xe[b.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Xe[b.minFilter]),b.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,me[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===fn||b.minFilter!==Zr&&b.minFilter!==ls||b.type===ti&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Y(D,b){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",R));const Q=b.source;let ae=d.get(Q);ae===void 0&&(ae={},d.set(Q,ae));const ve=G(b);if(ve!==D.__cacheKey){ae[ve]===void 0&&(ae[ve]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ae[ve].usedTimes++;const Ae=ae[D.__cacheKey];Ae!==void 0&&(ae[D.__cacheKey].usedTimes--,Ae.usedTimes===0&&P(b)),D.__cacheKey=ve,D.__webglTexture=ae[ve].texture}return q}function he(D,b,q){return Math.floor(Math.floor(D/q)/b)}function ce(D,b,q,Q){const ve=D.updateRanges;if(ve.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,q,Q,b.data);else{ve.sort((je,Le)=>je.start-Le.start);let Ae=0;for(let je=1;je<ve.length;je++){const Le=ve[Ae],Pe=ve[je],$e=Le.start+Le.count,at=he(Pe.start,b.width,4),pt=he(Le.start,b.width,4);Pe.start<=$e+1&&at===pt&&he(Pe.start+Pe.count-1,b.width,4)===at?Le.count=Math.max(Le.count,Pe.start+Pe.count-Le.start):(++Ae,ve[Ae]=Pe)}ve.length=Ae+1;const se=t.getParameter(i.UNPACK_ROW_LENGTH),_e=t.getParameter(i.UNPACK_SKIP_PIXELS),De=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let je=0,Le=ve.length;je<Le;je++){const Pe=ve[je],$e=Math.floor(Pe.start/4),at=Math.ceil(Pe.count/4),pt=$e%b.width,H=Math.floor($e/b.width),Ce=at,ge=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,pt),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,pt,H,Ce,ge,q,Q,b.data)}D.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,se),t.pixelStorei(i.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(i.UNPACK_SKIP_ROWS,De)}}function Se(D,b,q){let Q=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Q=i.TEXTURE_3D);const ae=Y(D,b),ve=b.source;t.bindTexture(Q,D.__webglTexture,i.TEXTURE0+q);const Ae=n.get(ve);if(ve.version!==Ae.__version||ae===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const ge=Dt.getPrimaries(Dt.workingColorSpace),Ie=b.colorSpace===Xi?null:Dt.getPrimaries(b.colorSpace),ke=b.colorSpace===Xi||ge===Ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let _e=m(b.image,!1,s.maxTextureSize);_e=Lt(b,_e);const De=r.convert(b.format,b.colorSpace),je=r.convert(b.type);let Le=x(b.internalFormat,De,je,b.normalized,b.colorSpace,b.isVideoTexture);ue(Q,b);let Pe;const $e=b.mipmaps,at=b.isVideoTexture!==!0,pt=Ae.__version===void 0||ae===!0,H=ve.dataReady,Ce=w(b,_e);if(b.isDepthTexture)Le=E(b.format===cs,b.type),pt&&(at?t.texStorage2D(i.TEXTURE_2D,1,Le,_e.width,_e.height):t.texImage2D(i.TEXTURE_2D,0,Le,_e.width,_e.height,0,De,je,null));else if(b.isDataTexture)if($e.length>0){at&&pt&&t.texStorage2D(i.TEXTURE_2D,Ce,Le,$e[0].width,$e[0].height);for(let ge=0,Ie=$e.length;ge<Ie;ge++)Pe=$e[ge],at?H&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Pe.width,Pe.height,De,je,Pe.data):t.texImage2D(i.TEXTURE_2D,ge,Le,Pe.width,Pe.height,0,De,je,Pe.data);b.generateMipmaps=!1}else at?(pt&&t.texStorage2D(i.TEXTURE_2D,Ce,Le,_e.width,_e.height),H&&ce(b,_e,De,je)):t.texImage2D(i.TEXTURE_2D,0,Le,_e.width,_e.height,0,De,je,_e.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){at&&pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Le,$e[0].width,$e[0].height,_e.depth);for(let ge=0,Ie=$e.length;ge<Ie;ge++)if(Pe=$e[ge],b.format!==ni)if(De!==null)if(at){if(H)if(b.layerUpdates.size>0){const ke=xh(Pe.width,Pe.height,b.format,b.type);for(const Me of b.layerUpdates){const Ke=Pe.data.subarray(Me*ke/Pe.data.BYTES_PER_ELEMENT,(Me+1)*ke/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,Me,Pe.width,Pe.height,1,De,Ke)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,Pe.width,Pe.height,_e.depth,De,Pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ge,Le,Pe.width,Pe.height,_e.depth,0,Pe.data,0,0);else ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,Pe.width,Pe.height,_e.depth,De,je,Pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ge,Le,Pe.width,Pe.height,_e.depth,0,De,je,Pe.data)}else{at&&pt&&t.texStorage2D(i.TEXTURE_2D,Ce,Le,$e[0].width,$e[0].height);for(let ge=0,Ie=$e.length;ge<Ie;ge++)Pe=$e[ge],b.format!==ni?De!==null?at?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,ge,0,0,Pe.width,Pe.height,De,Pe.data):t.compressedTexImage2D(i.TEXTURE_2D,ge,Le,Pe.width,Pe.height,0,Pe.data):ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?H&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Pe.width,Pe.height,De,je,Pe.data):t.texImage2D(i.TEXTURE_2D,ge,Le,Pe.width,Pe.height,0,De,je,Pe.data)}else if(b.isDataArrayTexture)if(at){if(pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ce,Le,_e.width,_e.height,_e.depth),H)if(b.layerUpdates.size>0){const ge=xh(_e.width,_e.height,b.format,b.type);for(const Ie of b.layerUpdates){const ke=_e.data.subarray(Ie*ge/_e.data.BYTES_PER_ELEMENT,(Ie+1)*ge/_e.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ie,_e.width,_e.height,1,De,je,ke)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,De,je,_e.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,_e.width,_e.height,_e.depth,0,De,je,_e.data);else if(b.isData3DTexture)at?(pt&&t.texStorage3D(i.TEXTURE_3D,Ce,Le,_e.width,_e.height,_e.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,De,je,_e.data)):t.texImage3D(i.TEXTURE_3D,0,Le,_e.width,_e.height,_e.depth,0,De,je,_e.data);else if(b.isFramebufferTexture){if(pt)if(at)t.texStorage2D(i.TEXTURE_2D,Ce,Le,_e.width,_e.height);else{let ge=_e.width,Ie=_e.height;for(let ke=0;ke<Ce;ke++)t.texImage2D(i.TEXTURE_2D,ke,Le,ge,Ie,0,De,je,null),ge>>=1,Ie>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const ge=i.canvas;if(ge.hasAttribute("layoutsubtree")||ge.setAttribute("layoutsubtree","true"),_e.parentNode!==ge){ge.appendChild(_e),f.add(b),ge.onpaint=Ie=>{const ke=Ie.changedElements;for(const Me of f)ke.includes(Me.image)&&(Me.needsUpdate=!0)},ge.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,_e);else{const ke=i.RGBA,Me=i.RGBA,Ke=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ke,Me,Ke,_e)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if($e.length>0){if(at&&pt){const ge=wt($e[0]);t.texStorage2D(i.TEXTURE_2D,Ce,Le,ge.width,ge.height)}for(let ge=0,Ie=$e.length;ge<Ie;ge++)Pe=$e[ge],at?H&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,De,je,Pe):t.texImage2D(i.TEXTURE_2D,ge,Le,De,je,Pe);b.generateMipmaps=!1}else if(at){if(pt){const ge=wt(_e);t.texStorage2D(i.TEXTURE_2D,Ce,Le,ge.width,ge.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,De,je,_e)}else t.texImage2D(i.TEXTURE_2D,0,Le,De,je,_e);p(b)&&M(Q),Ae.__version=ve.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function He(D,b,q){if(b.image.length!==6)return;const Q=Y(D,b),ae=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+q);const ve=n.get(ae);if(ae.version!==ve.__version||Q===!0){t.activeTexture(i.TEXTURE0+q);const Ae=Dt.getPrimaries(Dt.workingColorSpace),se=b.colorSpace===Xi?null:Dt.getPrimaries(b.colorSpace),_e=b.colorSpace===Xi||Ae===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const De=b.isCompressedTexture||b.image[0].isCompressedTexture,je=b.image[0]&&b.image[0].isDataTexture,Le=[];for(let Me=0;Me<6;Me++)!De&&!je?Le[Me]=m(b.image[Me],!0,s.maxCubemapSize):Le[Me]=je?b.image[Me].image:b.image[Me],Le[Me]=Lt(b,Le[Me]);const Pe=Le[0],$e=r.convert(b.format,b.colorSpace),at=r.convert(b.type),pt=x(b.internalFormat,$e,at,b.normalized,b.colorSpace),H=b.isVideoTexture!==!0,Ce=ve.__version===void 0||Q===!0,ge=ae.dataReady;let Ie=w(b,Pe);ue(i.TEXTURE_CUBE_MAP,b);let ke;if(De){H&&Ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ie,pt,Pe.width,Pe.height);for(let Me=0;Me<6;Me++){ke=Le[Me].mipmaps;for(let Ke=0;Ke<ke.length;Ke++){const qe=ke[Ke];b.format!==ni?$e!==null?H?ge&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,0,0,qe.width,qe.height,$e,qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,pt,qe.width,qe.height,0,qe.data):ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,0,0,qe.width,qe.height,$e,at,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,pt,qe.width,qe.height,0,$e,at,qe.data)}}}else{if(ke=b.mipmaps,H&&Ce){ke.length>0&&Ie++;const Me=wt(Le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ie,pt,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(je){H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,Le[Me].width,Le[Me].height,$e,at,Le[Me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,pt,Le[Me].width,Le[Me].height,0,$e,at,Le[Me].data);for(let Ke=0;Ke<ke.length;Ke++){const Ht=ke[Ke].image[Me].image;H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,0,0,Ht.width,Ht.height,$e,at,Ht.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,pt,Ht.width,Ht.height,0,$e,at,Ht.data)}}else{H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,$e,at,Le[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,pt,$e,at,Le[Me]);for(let Ke=0;Ke<ke.length;Ke++){const qe=ke[Ke];H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,0,0,$e,at,qe.image[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,pt,$e,at,qe.image[Me])}}}p(b)&&M(i.TEXTURE_CUBE_MAP),ve.__version=ae.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Be(D,b,q,Q,ae,ve){const Ae=r.convert(q.format,q.colorSpace),se=r.convert(q.type),_e=x(q.internalFormat,Ae,se,q.normalized,q.colorSpace),De=n.get(b),je=n.get(q);if(je.__renderTarget=b,!De.__hasExternalTextures){const Le=Math.max(1,b.width>>ve),Pe=Math.max(1,b.height>>ve);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,ve,_e,Le,Pe,b.depth,0,Ae,se,null):t.texImage2D(ae,ve,_e,Le,Pe,0,Ae,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),ft(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,ae,je.__webglTexture,0,lt(b)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,ae,je.__webglTexture,ve),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(D,b,q){if(i.bindRenderbuffer(i.RENDERBUFFER,D),b.depthBuffer){const Q=b.depthTexture,ae=Q&&Q.isDepthTexture?Q.type:null,ve=E(b.stencilBuffer,ae),Ae=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ft(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(b),ve,b.width,b.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(b),ve,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ve,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,D)}else{const Q=b.textures;for(let ae=0;ae<Q.length;ae++){const ve=Q[ae],Ae=r.convert(ve.format,ve.colorSpace),se=r.convert(ve.type),_e=x(ve.internalFormat,Ae,se,ve.normalized,ve.colorSpace);ft(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt(b),_e,b.width,b.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt(b),_e,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,_e,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Je(D,b,q){const Q=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ae=n.get(b.depthTexture);if(ae.__renderTarget=b,(!ae.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Q){if(ae.__webglInit===void 0&&(ae.__webglInit=!0,b.depthTexture.addEventListener("dispose",R)),ae.__webglTexture===void 0){ae.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),ue(i.TEXTURE_CUBE_MAP,b.depthTexture);const De=r.convert(b.depthTexture.format),je=r.convert(b.depthTexture.type);let Le;b.depthTexture.format===Ni?Le=i.DEPTH_COMPONENT24:b.depthTexture.format===cs&&(Le=i.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Le,b.width,b.height,0,De,je,null)}}else ie(b.depthTexture,0);const ve=ae.__webglTexture,Ae=lt(b),se=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,_e=b.depthTexture.format===cs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ni)ft(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,se,ve,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,_e,se,ve,0);else if(b.depthTexture.format===cs)ft(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,se,ve,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,_e,se,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function oe(D){const b=n.get(D),q=D.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==D.depthTexture){const Q=D.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Q){const ae=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Q.removeEventListener("dispose",ae)};Q.addEventListener("dispose",ae),b.__depthDisposeCallback=ae}b.__boundDepthTexture=Q}if(D.depthTexture&&!b.__autoAllocateDepthBuffer)if(q)for(let Q=0;Q<6;Q++)Je(b.__webglFramebuffer[Q],D,Q);else{const Q=D.texture.mipmaps;Q&&Q.length>0?Je(b.__webglFramebuffer[0],D,0):Je(b.__webglFramebuffer,D,0)}else if(q){b.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[Q]),b.__webglDepthbuffer[Q]===void 0)b.__webglDepthbuffer[Q]=i.createRenderbuffer(),ot(b.__webglDepthbuffer[Q],D,!1);else{const ae=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=b.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ve)}}else{const Q=D.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ot(b.__webglDepthbuffer,D,!1);else{const ae=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ve)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(D,b,q){const Q=n.get(D);b!==void 0&&Be(Q.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&oe(D)}function xe(D){const b=D.texture,q=n.get(D),Q=n.get(b);D.addEventListener("dispose",v);const ae=D.textures,ve=D.isWebGLCubeRenderTarget===!0,Ae=ae.length>1;if(Ae||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=b.version,a.memory.textures++),ve){q.__webglFramebuffer=[];for(let se=0;se<6;se++)if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer[se]=[];for(let _e=0;_e<b.mipmaps.length;_e++)q.__webglFramebuffer[se][_e]=i.createFramebuffer()}else q.__webglFramebuffer[se]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer=[];for(let se=0;se<b.mipmaps.length;se++)q.__webglFramebuffer[se]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let se=0,_e=ae.length;se<_e;se++){const De=n.get(ae[se]);De.__webglTexture===void 0&&(De.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&ft(D)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let se=0;se<ae.length;se++){const _e=ae[se];q.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[se]);const De=r.convert(_e.format,_e.colorSpace),je=r.convert(_e.type),Le=x(_e.internalFormat,De,je,_e.normalized,_e.colorSpace,D.isXRRenderTarget===!0),Pe=lt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,Le,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,q.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(q.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ve){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),ue(i.TEXTURE_CUBE_MAP,b);for(let se=0;se<6;se++)if(b.mipmaps&&b.mipmaps.length>0)for(let _e=0;_e<b.mipmaps.length;_e++)Be(q.__webglFramebuffer[se][_e],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,_e);else Be(q.__webglFramebuffer[se],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);p(b)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let se=0,_e=ae.length;se<_e;se++){const De=ae[se],je=n.get(De);let Le=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Le=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Le,je.__webglTexture),ue(Le,De),Be(q.__webglFramebuffer,D,De,i.COLOR_ATTACHMENT0+se,Le,0),p(De)&&M(Le)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(se=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,Q.__webglTexture),ue(se,b),b.mipmaps&&b.mipmaps.length>0)for(let _e=0;_e<b.mipmaps.length;_e++)Be(q.__webglFramebuffer[_e],D,b,i.COLOR_ATTACHMENT0,se,_e);else Be(q.__webglFramebuffer,D,b,i.COLOR_ATTACHMENT0,se,0);p(b)&&M(se),t.unbindTexture()}D.depthBuffer&&oe(D)}function we(D){const b=D.textures;for(let q=0,Q=b.length;q<Q;q++){const ae=b[q];if(p(ae)){const ve=y(D),Ae=n.get(ae).__webglTexture;t.bindTexture(ve,Ae),M(ve),t.unbindTexture()}}}const Ee=[],nt=[];function Ze(D){if(D.samples>0){if(ft(D)===!1){const b=D.textures,q=D.width,Q=D.height;let ae=i.COLOR_BUFFER_BIT;const ve=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(D),se=b.length>1;if(se)for(let De=0;De<b.length;De++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const _e=D.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let De=0;De<b.length;De++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[De]);const je=n.get(b[De]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,je,0)}i.blitFramebuffer(0,0,q,Q,0,0,q,Q,ae,i.NEAREST),o===!0&&(Ee.length=0,nt.length=0,Ee.push(i.COLOR_ATTACHMENT0+De),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ee.push(ve),nt.push(ve),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let De=0;De<b.length;De++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[De]);const je=n.get(b[De]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&o){const b=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function lt(D){return Math.min(s.maxSamples,D.samples)}function ft(D){const b=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function V(D){const b=a.render.frame;u.get(D)!==b&&(u.set(D,b),D.update())}function Lt(D,b){const q=D.colorSpace,Q=D.format,ae=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==Oa&&q!==Xi&&(Dt.getTransfer(q)===Vt?(Q!==ni||ae!==Nn)&&ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):At("WebGLTextures: Unsupported texture color space:",q)),b}function wt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=Z,this.getTextureUnits=K,this.setTextureUnits=B,this.setTexture2D=ie,this.setTexture2DArray=le,this.setTexture3D=re,this.setTextureCube=fe,this.rebindTextures=de,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=Ze,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=Be,this.useMultisampledRTT=ft,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function j_(i,e){function t(n,s=Xi){let r;const a=Dt.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===Jl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===jl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===su)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ru)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nu)return i.BYTE;if(n===iu)return i.SHORT;if(n===Pr)return i.UNSIGNED_SHORT;if(n===Kl)return i.INT;if(n===vi)return i.UNSIGNED_INT;if(n===ti)return i.FLOAT;if(n===Li)return i.HALF_FLOAT;if(n===au)return i.ALPHA;if(n===ou)return i.RGB;if(n===ni)return i.RGBA;if(n===Ni)return i.DEPTH_COMPONENT;if(n===cs)return i.DEPTH_STENCIL;if(n===Ql)return i.RED;if(n===ec)return i.RED_INTEGER;if(n===fs)return i.RG;if(n===tc)return i.RG_INTEGER;if(n===nc)return i.RGBA_INTEGER;if(n===Ra||n===Ca||n===Pa||n===Ia)if(a===Vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ol||n===ll||n===cl||n===hl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===cl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ul||n===fl||n===dl||n===pl||n===ml||n===Na||n===gl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ul||n===fl)return a===Vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===pl)return r.COMPRESSED_R11_EAC;if(n===ml)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Na)return r.COMPRESSED_RG11_EAC;if(n===gl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===_l||n===vl||n===xl||n===yl||n===Ml||n===bl||n===Sl||n===wl||n===El||n===Tl||n===Al||n===Rl||n===Cl||n===Pl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_l)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===vl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ml)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===El)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Al)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Rl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Cl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pl)return a===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Il||n===Dl||n===Ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Il)return a===Vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Dl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nl||n===Ul||n===Ua||n===Fl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Nl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Q_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ev=`
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

}`;class tv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new xu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new xi({vertexShader:Q_,fragmentShader:ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pe(new $t(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nv extends $i{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,u=null,f=null,h=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new tv,p={},M=t.getContextAttributes();let y=null,x=null;const E=[],w=[],R=new J;let v=null;const T=new Ln;T.viewport=new jt;const P=new Ln;P.viewport=new jt;const N=[T,P],O=new l0;let Z=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let he=E[Y];return he===void 0&&(he=new uo,E[Y]=he),he.getTargetRaySpace()},this.getControllerGrip=function(Y){let he=E[Y];return he===void 0&&(he=new uo,E[Y]=he),he.getGripSpace()},this.getHand=function(Y){let he=E[Y];return he===void 0&&(he=new uo,E[Y]=he),he.getHandSpace()};function B(Y){const he=w.indexOf(Y.inputSource);if(he===-1)return;const ce=E[he];ce!==void 0&&(ce.update(Y.inputSource,Y.frame,l||a),ce.dispatchEvent({type:Y.type,data:Y.inputSource}))}function $(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",G);for(let Y=0;Y<E.length;Y++){const he=w[Y];he!==null&&(w[Y]=null,E[Y].disconnect(he))}Z=null,K=null,m.reset();for(const Y in p)delete p[Y];e.setRenderTarget(y),d=null,h=null,f=null,s=null,x=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){c=Y,n.isPresenting===!0&&ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",$),s.addEventListener("inputsourceschange",G),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Se=null,He=null;M.depth&&(He=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=M.stencil?cs:Ni,Se=M.stencil?Ir:vi);const Be={colorFormat:t.RGBA8,depthFormat:He,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Be),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new gi(h.textureWidth,h.textureHeight,{format:ni,type:Nn,depthTexture:new Ks(h.textureWidth,h.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ce={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new gi(d.framebufferWidth,d.framebufferHeight,{format:ni,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),ue.setContext(s),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(Y){for(let he=0;he<Y.removed.length;he++){const ce=Y.removed[he],Se=w.indexOf(ce);Se>=0&&(w[Se]=null,E[Se].disconnect(ce))}for(let he=0;he<Y.added.length;he++){const ce=Y.added[he];let Se=w.indexOf(ce);if(Se===-1){for(let Be=0;Be<E.length;Be++)if(Be>=w.length){w.push(ce),Se=Be;break}else if(w[Be]===null){w[Be]=ce,Se=Be;break}if(Se===-1)break}const He=E[Se];He&&He.connect(ce)}}const ie=new I,le=new I;function re(Y,he,ce){ie.setFromMatrixPosition(he.matrixWorld),le.setFromMatrixPosition(ce.matrixWorld);const Se=ie.distanceTo(le),He=he.projectionMatrix.elements,Be=ce.projectionMatrix.elements,ot=He[14]/(He[10]-1),Je=He[14]/(He[10]+1),oe=(He[9]+1)/He[5],de=(He[9]-1)/He[5],xe=(He[8]-1)/He[0],we=(Be[8]+1)/Be[0],Ee=ot*xe,nt=ot*we,Ze=Se/(-xe+we),lt=Ze*-xe;if(he.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(lt),Y.translateZ(Ze),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),He[10]===-1)Y.projectionMatrix.copy(he.projectionMatrix),Y.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const ft=ot+Ze,V=Je+Ze,Lt=Ee-lt,wt=nt+(Se-lt),D=oe*Je/V*ft,b=de*Je/V*ft;Y.projectionMatrix.makePerspective(Lt,wt,D,b,ft,V),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function fe(Y,he){he===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(he.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let he=Y.near,ce=Y.far;m.texture!==null&&(m.depthNear>0&&(he=m.depthNear),m.depthFar>0&&(ce=m.depthFar)),O.near=P.near=T.near=he,O.far=P.far=T.far=ce,(Z!==O.near||K!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),Z=O.near,K=O.far),O.layers.mask=Y.layers.mask|6,T.layers.mask=O.layers.mask&-5,P.layers.mask=O.layers.mask&-3;const Se=Y.parent,He=O.cameras;fe(O,Se);for(let Be=0;Be<He.length;Be++)fe(He[Be],Se);He.length===2?re(O,T,P):O.projectionMatrix.copy(T.projectionMatrix),ye(Y,O,Se)};function ye(Y,he,ce){ce===null?Y.matrix.copy(he.matrixWorld):(Y.matrix.copy(ce.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(he.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(he.projectionMatrix),Y.projectionMatrixInverse.copy(he.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Bl*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&d===null))return o},this.setFoveation=function(Y){o=Y,h!==null&&(h.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Y){return p[Y]};let Xe=null;function me(Y,he){if(u=he.getViewerPose(l||a),g=he,u!==null){const ce=u.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let Se=!1;ce.length!==O.cameras.length&&(O.cameras.length=0,Se=!0);for(let Je=0;Je<ce.length;Je++){const oe=ce[Je];let de=null;if(d!==null)de=d.getViewport(oe);else{const we=f.getViewSubImage(h,oe);de=we.viewport,Je===0&&(e.setRenderTargetTextures(x,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(x))}let xe=N[Je];xe===void 0&&(xe=new Ln,xe.layers.enable(Je),xe.viewport=new jt,N[Je]=xe),xe.matrix.fromArray(oe.transform.matrix),xe.matrix.decompose(xe.position,xe.quaternion,xe.scale),xe.projectionMatrix.fromArray(oe.projectionMatrix),xe.projectionMatrixInverse.copy(xe.projectionMatrix).invert(),xe.viewport.set(de.x,de.y,de.width,de.height),Je===0&&(O.matrix.copy(xe.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Se===!0&&O.cameras.push(xe)}const He=s.enabledFeatures;if(He&&He.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const Je=f.getDepthInformation(ce[0]);Je&&Je.isValid&&Je.texture&&m.init(Je,s.renderState)}if(He&&He.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let Je=0;Je<ce.length;Je++){const oe=ce[Je].camera;if(oe){let de=p[oe];de||(de=new xu,p[oe]=de);const xe=f.getCameraImage(oe);de.sourceTexture=xe}}}}for(let ce=0;ce<E.length;ce++){const Se=w[ce],He=E[ce];Se!==null&&He!==void 0&&He.update(Se,he,l||a)}Xe&&Xe(Y,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),g=null}const ue=new Nu;ue.setAnimationLoop(me),this.setAnimationLoop=function(Y){Xe=Y},this.dispose=function(){}}}const iv=new Bt,Vu=new _t;Vu.set(-1,0,0,0,1,0,0,0,1);function sv(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Cu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&c(m,p)):p.isPointsMaterial?o(m,p,M,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===wn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===wn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),y=M.envMap,x=M.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(iv.makeRotationFromEuler(x)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Vu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function c(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===wn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rv(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(x,E){const w=E.program;n.uniformBlockBinding(x,w)}function l(x,E){let w=s[x.id];w===void 0&&(m(x),w=u(x),s[x.id]=w,x.addEventListener("dispose",M));const R=E.program;n.updateUBOMapping(x,R);const v=e.render.frame;r[x.id]!==v&&(h(x),r[x.id]=v)}function u(x){const E=f();x.__bindingPointIndex=E;const w=i.createBuffer(),R=x.__size,v=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,R,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,w),w}function f(){for(let x=0;x<c;x++)if(a.indexOf(x)===-1)return a.push(x),x;return At("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const E=s[x.id],w=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let v=0,T=w.length;v<T;v++){const P=w[v];if(Array.isArray(P))for(let N=0,O=P.length;N<O;N++)d(P[N],v,N,R);else d(P,v,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,E,w,R){if(_(x,E,w,R)===!0){const v=x.__offset,T=x.value;if(Array.isArray(T)){let P=0;for(let N=0;N<T.length;N++){const O=T[N],Z=p(O);g(O,x.__data,P),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(P+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,x.__data)}}function g(x,E,w){typeof x=="number"||typeof x=="boolean"?E[0]=x:x.isMatrix3?(E[0]=x.elements[0],E[1]=x.elements[1],E[2]=x.elements[2],E[3]=0,E[4]=x.elements[3],E[5]=x.elements[4],E[6]=x.elements[5],E[7]=0,E[8]=x.elements[6],E[9]=x.elements[7],E[10]=x.elements[8],E[11]=0):ArrayBuffer.isView(x)?E.set(new x.constructor(x.buffer,x.byteOffset,E.length)):x.toArray(E,w)}function _(x,E,w,R){const v=x.value,T=E+"_"+w;if(R[T]===void 0)return typeof v=="number"||typeof v=="boolean"?R[T]=v:ArrayBuffer.isView(v)?R[T]=v.slice():R[T]=v.clone(),!0;{const P=R[T];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function m(x){const E=x.uniforms;let w=0;const R=16;for(let T=0,P=E.length;T<P;T++){const N=Array.isArray(E[T])?E[T]:[E[T]];for(let O=0,Z=N.length;O<Z;O++){const K=N[O],B=Array.isArray(K.value)?K.value:[K.value];for(let $=0,G=B.length;$<G;$++){const ie=B[$],le=p(ie),re=w%R,fe=re%le.boundary,ye=re+fe;w+=fe,ye!==0&&R-ye<le.storage&&(w+=R-ye),K.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=w,w+=le.storage}}}const v=w%R;return v>0&&(w+=R-v),x.__size=w,x.__cache={},this}function p(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(E.boundary=16,E.storage=x.byteLength):ht("WebGLRenderer: Unsupported uniform value type.",x),E}function M(x){const E=x.target;E.removeEventListener("dispose",M);const w=a.indexOf(E.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function y(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:o,update:l,dispose:y}}const av=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hi=null;function ov(){return hi===null&&(hi=new mu(av,16,16,fs,Li),hi.name="DFG_LUT",hi.minFilter=xn,hi.magFilter=xn,hi.wrapS=Ci,hi.wrapT=Ci,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}class lv{constructor(e={}){const{canvas:t=Wf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Nn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=d,m=new Set([nc,tc,ec]),p=new Set([Nn,vi,Pr,Ir,Jl,jl]),M=new Uint32Array(4),y=new Int32Array(4),x=new I;let E=null,w=null;const R=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,O=null,Z=null,K=null,B=null;this._outputColorSpace=un;let $=0,G=0,ie=null,le=-1,re=null;const fe=new jt,ye=new jt;let Xe=null;const me=new vt(0);let ue=0,Y=t.width,he=t.height,ce=1,Se=null,He=null;const Be=new jt(0,0,Y,he),ot=new jt(0,0,Y,he);let Je=!1;const oe=new oc;let de=!1,xe=!1;const we=new Bt,Ee=new I,nt=new jt,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function ft(){return ie===null?ce:1}let V=n;function Lt(A,W){return t.getContext(A,W)}try{const A={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yl}`),t.addEventListener("webglcontextlost",Ht,!1),t.addEventListener("webglcontextrestored",Ut,!1),t.addEventListener("webglcontextcreationerror",Un,!1),V===null){const W="webgl2";if(V=Lt(W,A),V===null)throw Lt(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw At("WebGLRenderer: "+A.message),A}let wt,D,b,q,Q,ae,ve,Ae,se,_e,De,je,Le,Pe,$e,at,pt,H,Ce,ge,Ie,ke,Me;function Ke(){wt=new og(V),wt.init(),Ie=new j_(V,wt),D=new Qm(V,wt,e,Ie),b=new K_(V,wt),D.reversedDepthBuffer&&h&&b.buffers.depth.setReversed(!0),Z=V.createFramebuffer(),K=V.createFramebuffer(),B=V.createFramebuffer(),q=new hg(V),Q=new F_,ae=new J_(V,wt,b,Q,D,Ie,q),ve=new ag(P),Ae=new p0(V),ke=new Jm(V,Ae),se=new lg(V,Ae,q,ke),_e=new fg(V,se,Ae,ke,q),H=new ug(V,D,ae),$e=new eg(Q),De=new U_(P,ve,wt,D,ke,$e),je=new sv(P,Q),Le=new B_,Pe=new W_(wt),pt=new Km(P,ve,b,_e,g,o),at=new $_(P,_e,D),Me=new rv(V,q,D,b),Ce=new jm(V,wt,q),ge=new cg(V,wt,q),q.programs=De.programs,P.capabilities=D,P.extensions=wt,P.properties=Q,P.renderLists=Le,P.shadowMap=at,P.state=b,P.info=q}Ke(),_!==Nn&&(T=new pg(_,t.width,t.height,c,s,r));const qe=new nv(P,V);this.xr=qe,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const A=wt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=wt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(A){A!==void 0&&(ce=A,this.setSize(Y,he,!1))},this.getSize=function(A){return A.set(Y,he)},this.setSize=function(A,W,ne=!0){if(qe.isPresenting){ht("WebGLRenderer: Can't change size while VR device is presenting.");return}Y=A,he=W,t.width=Math.floor(A*ce),t.height=Math.floor(W*ce),ne===!0&&(t.style.width=A+"px",t.style.height=W+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(Y*ce,he*ce).floor()},this.setDrawingBufferSize=function(A,W,ne){Y=A,he=W,ce=ne,t.width=Math.floor(A*ne),t.height=Math.floor(W*ne),this.setViewport(0,0,A,W)},this.setEffects=function(A){if(_===Nn){At("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let W=0;W<A.length;W++)if(A[W].isOutputPass===!0){ht("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(fe)},this.getViewport=function(A){return A.copy(Be)},this.setViewport=function(A,W,ne,j){A.isVector4?Be.set(A.x,A.y,A.z,A.w):Be.set(A,W,ne,j),b.viewport(fe.copy(Be).multiplyScalar(ce).round())},this.getScissor=function(A){return A.copy(ot)},this.setScissor=function(A,W,ne,j){A.isVector4?ot.set(A.x,A.y,A.z,A.w):ot.set(A,W,ne,j),b.scissor(ye.copy(ot).multiplyScalar(ce).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(A){b.setScissorTest(Je=A)},this.setOpaqueSort=function(A){Se=A},this.setTransparentSort=function(A){He=A},this.getClearColor=function(A){return A.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor(...arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha(...arguments)},this.clear=function(A=!0,W=!0,ne=!0){let j=0;if(A){let ee=!1;if(ie!==null){const Ue=ie.texture.format;ee=m.has(Ue)}if(ee){const Ue=ie.texture.type,Ge=p.has(Ue),Fe=pt.getClearColor(),Ye=pt.getClearAlpha(),Qe=Fe.r,mt=Fe.g,xt=Fe.b;Ge?(M[0]=Qe,M[1]=mt,M[2]=xt,M[3]=Ye,V.clearBufferuiv(V.COLOR,0,M)):(y[0]=Qe,y[1]=mt,y[2]=xt,y[3]=Ye,V.clearBufferiv(V.COLOR,0,y))}else j|=V.COLOR_BUFFER_BIT}W&&(j|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(j|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&V.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),O=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Ht,!1),t.removeEventListener("webglcontextrestored",Ut,!1),t.removeEventListener("webglcontextcreationerror",Un,!1),pt.dispose(),Le.dispose(),Pe.dispose(),Q.dispose(),ve.dispose(),_e.dispose(),ke.dispose(),Me.dispose(),De.dispose(),qe.dispose(),qe.removeEventListener("sessionstart",nr),qe.removeEventListener("sessionend",ir),Xn.stop()};function Ht(A){A.preventDefault(),za("WebGLRenderer: Context Lost."),N=!0}function Ut(){za("WebGLRenderer: Context Restored."),N=!1;const A=q.autoReset,W=at.enabled,ne=at.autoUpdate,j=at.needsUpdate,ee=at.type;Ke(),q.autoReset=A,at.enabled=W,at.autoUpdate=ne,at.needsUpdate=j,at.type=ee}function Un(A){At("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function dn(A){const W=A.target;W.removeEventListener("dispose",dn),gs(W)}function gs(A){kr(A),Q.remove(A)}function kr(A){const W=Q.get(A).programs;W!==void 0&&(W.forEach(function(ne){De.releaseProgram(ne)}),A.isShaderMaterial&&De.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,ne,j,ee,Ue){W===null&&(W=Ze);const Ge=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,Fe=Gr(A,W,ne,j,ee);b.setMaterial(j,Ge);let Ye=ne.index,Qe=1;if(j.wireframe===!0){if(Ye=se.getWireframeAttribute(ne),Ye===void 0)return;Qe=2}const mt=ne.drawRange,xt=ne.attributes.position;let et=mt.start*Qe,Oe=(mt.start+mt.count)*Qe;Ue!==null&&(et=Math.max(et,Ue.start*Qe),Oe=Math.min(Oe,(Ue.start+Ue.count)*Qe)),Ye!==null?(et=Math.max(et,0),Oe=Math.min(Oe,Ye.count)):xt!=null&&(et=Math.max(et,0),Oe=Math.min(Oe,xt.count));const qt=Oe-et;if(qt<0||qt===1/0)return;ke.setup(ee,j,Fe,ne,Ye);let Yt,Nt=Ce;if(Ye!==null&&(Yt=Ae.get(Ye),Nt=ge,Nt.setIndex(Yt)),ee.isMesh)j.wireframe===!0?(b.setLineWidth(j.wireframeLinewidth*ft()),Nt.setMode(V.LINES)):Nt.setMode(V.TRIANGLES);else if(ee.isLine){let rn=j.linewidth;rn===void 0&&(rn=1),b.setLineWidth(rn*ft()),ee.isLineSegments?Nt.setMode(V.LINES):ee.isLineLoop?Nt.setMode(V.LINE_LOOP):Nt.setMode(V.LINE_STRIP)}else ee.isPoints?Nt.setMode(V.POINTS):ee.isSprite&&Nt.setMode(V.TRIANGLES);if(ee.isBatchedMesh)if(wt.get("WEBGL_multi_draw"))Nt.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{const rn=ee._multiDrawStarts,We=ee._multiDrawCounts,pn=ee._multiDrawCount,Ct=Ye?Ae.get(Ye).bytesPerElement:1,mn=Q.get(j).currentProgram.getUniforms();for(let An=0;An<pn;An++)mn.setValue(V,"_gl_DrawID",An),Nt.render(rn[An]/Ct,We[An])}else if(ee.isInstancedMesh)Nt.renderInstances(et,qt,ee.count);else if(ne.isInstancedBufferGeometry){const rn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,We=Math.min(ne.instanceCount,rn);Nt.renderInstances(et,qt,We)}else Nt.render(et,qt)};function si(A,W,ne){A.transparent===!0&&A.side===Zt&&A.forceSinglePass===!1?(A.side=wn,A.needsUpdate=!0,vs(A,W,ne),A.side=Yi,A.needsUpdate=!0,vs(A,W,ne),A.side=Zt):vs(A,W,ne)}this.compile=function(A,W,ne=null){ne===null&&(ne=A),w=Pe.get(ne),w.init(W),v.push(w),ne.traverseVisible(function(ee){ee.isLight&&ee.layers.test(W.layers)&&(w.pushLight(ee),ee.castShadow&&w.pushShadow(ee))}),A!==ne&&A.traverseVisible(function(ee){ee.isLight&&ee.layers.test(W.layers)&&(w.pushLight(ee),ee.castShadow&&w.pushShadow(ee))}),w.setupLights();const j=new Set;return A.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;const Ue=ee.material;if(Ue)if(Array.isArray(Ue))for(let Ge=0;Ge<Ue.length;Ge++){const Fe=Ue[Ge];si(Fe,ne,ee),j.add(Fe)}else si(Ue,ne,ee),j.add(Ue)}),w=v.pop(),j},this.compileAsync=function(A,W,ne=null){const j=this.compile(A,W,ne);return new Promise(ee=>{function Ue(){if(j.forEach(function(Ge){Q.get(Ge).currentProgram.isReady()&&j.delete(Ge)}),j.size===0){ee(A);return}setTimeout(Ue,10)}wt.get("KHR_parallel_shader_compile")!==null?Ue():setTimeout(Ue,10)})};let Ji=null;function tr(A){Ji&&Ji(A)}function nr(){Xn.stop()}function ir(){Xn.start()}const Xn=new Nu;Xn.setAnimationLoop(tr),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(A){Ji=A,qe.setAnimationLoop(A),A===null?Xn.stop():Xn.start()},qe.addEventListener("sessionstart",nr),qe.addEventListener("sessionend",ir),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){At("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;O!==null&&O.renderStart(A,W);const ne=qe.enabled===!0&&qe.isPresenting===!0,j=T!==null&&(ie===null||ne)&&T.begin(P,ie);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),qe.enabled===!0&&qe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(qe.cameraAutoUpdate===!0&&qe.updateCamera(W),W=qe.getCamera()),A.isScene===!0&&A.onBeforeRender(P,A,W,ie),w=Pe.get(A,v.length),w.init(W),w.state.textureUnits=ae.getTextureUnits(),v.push(w),we.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),oe.setFromProjectionMatrix(we,pi,W.reversedDepth),xe=this.localClippingEnabled,de=$e.init(this.clippingPlanes,xe),E=Le.get(A,R.length),E.init(),R.push(E),qe.enabled===!0&&qe.isPresenting===!0){const Ge=P.xr.getDepthSensingMesh();Ge!==null&&ji(Ge,W,-1/0,P.sortObjects)}ji(A,W,0,P.sortObjects),E.finish(),P.sortObjects===!0&&E.sort(Se,He,W.reversedDepth),lt=qe.enabled===!1||qe.isPresenting===!1||qe.hasDepthSensing()===!1,lt&&pt.addToRenderList(E,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),de===!0&&$e.beginShadows();const ee=w.state.shadowsArray;if(at.render(ee,A,W),de===!0&&$e.endShadows(),(j&&T.hasRenderPass())===!1){const Ge=E.opaque,Fe=E.transmissive;if(w.setupLights(),W.isArrayCamera){const Ye=W.cameras;if(Fe.length>0)for(let Qe=0,mt=Ye.length;Qe<mt;Qe++){const xt=Ye[Qe];sr(Ge,Fe,A,xt)}lt&&pt.render(A);for(let Qe=0,mt=Ye.length;Qe<mt;Qe++){const xt=Ye[Qe];zr(E,A,xt,xt.viewport)}}else Fe.length>0&&sr(Ge,Fe,A,W),lt&&pt.render(A),zr(E,A,W)}ie!==null&&G===0&&(ae.updateMultisampleRenderTarget(ie),ae.updateRenderTargetMipmap(ie)),j&&T.end(P),A.isScene===!0&&A.onAfterRender(P,A,W),ke.resetDefaultState(),le=-1,re=null,v.pop(),v.length>0?(w=v[v.length-1],ae.setTextureUnits(w.state.textureUnits),de===!0&&$e.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,R.pop(),R.length>0?E=R[R.length-1]:E=null,O!==null&&O.renderEnd()};function ji(A,W,ne,j){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)ne=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||oe.intersectsSprite(A)){j&&nt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(we);const Ge=_e.update(A),Fe=A.material;Fe.visible&&E.push(A,Ge,Fe,ne,nt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||oe.intersectsObject(A))){const Ge=_e.update(A),Fe=A.material;if(j&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),nt.copy(A.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),nt.copy(Ge.boundingSphere.center)),nt.applyMatrix4(A.matrixWorld).applyMatrix4(we)),Array.isArray(Fe)){const Ye=Ge.groups;for(let Qe=0,mt=Ye.length;Qe<mt;Qe++){const xt=Ye[Qe],et=Fe[xt.materialIndex];et&&et.visible&&E.push(A,Ge,et,ne,nt.z,xt)}}else Fe.visible&&E.push(A,Ge,Fe,ne,nt.z,null)}}const Ue=A.children;for(let Ge=0,Fe=Ue.length;Ge<Fe;Ge++)ji(Ue[Ge],W,ne,j)}function zr(A,W,ne,j){const{opaque:ee,transmissive:Ue,transparent:Ge}=A;w.setupLightsView(ne),de===!0&&$e.setGlobalState(P.clippingPlanes,ne),j&&b.viewport(fe.copy(j)),ee.length>0&&_s(ee,W,ne),Ue.length>0&&_s(Ue,W,ne),Ge.length>0&&_s(Ge,W,ne),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function sr(A,W,ne,j){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[j.id]===void 0){const et=wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[j.id]=new gi(1,1,{generateMipmaps:!0,type:et?Li:Nn,minFilter:ls,samples:Math.max(4,D.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Dt.workingColorSpace})}const Ue=w.state.transmissionRenderTarget[j.id],Ge=j.viewport||fe;Ue.setSize(Ge.z*P.transmissionResolutionScale,Ge.w*P.transmissionResolutionScale);const Fe=P.getRenderTarget(),Ye=P.getActiveCubeFace(),Qe=P.getActiveMipmapLevel();P.setRenderTarget(Ue),P.getClearColor(me),ue=P.getClearAlpha(),ue<1&&P.setClearColor(16777215,.5),P.clear(),lt&&pt.render(ne);const mt=P.toneMapping;P.toneMapping=mi;const xt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),w.setupLightsView(j),de===!0&&$e.setGlobalState(P.clippingPlanes,j),_s(A,ne,j),ae.updateMultisampleRenderTarget(Ue),ae.updateRenderTargetMipmap(Ue),wt.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let Oe=0,qt=W.length;Oe<qt;Oe++){const Yt=W[Oe],{object:Nt,geometry:rn,material:We,group:pn}=Yt;if(We.side===Zt&&Nt.layers.test(j.layers)){const Ct=We.side;We.side=wn,We.needsUpdate=!0,Qi(Nt,ne,j,rn,We,pn),We.side=Ct,We.needsUpdate=!0,et=!0}}et===!0&&(ae.updateMultisampleRenderTarget(Ue),ae.updateRenderTargetMipmap(Ue))}P.setRenderTarget(Fe,Ye,Qe),P.setClearColor(me,ue),xt!==void 0&&(j.viewport=xt),P.toneMapping=mt}function _s(A,W,ne){const j=W.isScene===!0?W.overrideMaterial:null;for(let ee=0,Ue=A.length;ee<Ue;ee++){const Ge=A[ee],{object:Fe,geometry:Ye,group:Qe}=Ge;let mt=Ge.material;mt.allowOverride===!0&&j!==null&&(mt=j),Fe.layers.test(ne.layers)&&Qi(Fe,W,ne,Ye,mt,Qe)}}function Qi(A,W,ne,j,ee,Ue){A.onBeforeRender(P,W,ne,j,ee,Ue),A.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ee.onBeforeRender(P,W,ne,j,A,Ue),ee.transparent===!0&&ee.side===Zt&&ee.forceSinglePass===!1?(ee.side=wn,ee.needsUpdate=!0,P.renderBufferDirect(ne,W,j,ee,A,Ue),ee.side=Yi,ee.needsUpdate=!0,P.renderBufferDirect(ne,W,j,ee,A,Ue),ee.side=Zt):P.renderBufferDirect(ne,W,j,ee,A,Ue),A.onAfterRender(P,W,ne,j,ee,Ue)}function vs(A,W,ne){W.isScene!==!0&&(W=Ze);const j=Q.get(A),ee=w.state.lights,Ue=w.state.shadowsArray,Ge=ee.state.version,Fe=De.getParameters(A,ee.state,Ue,W,ne,w.state.lightProbeGridArray),Ye=De.getProgramCacheKey(Fe);let Qe=j.programs;j.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?W.environment:null,j.fog=W.fog;const mt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;j.envMap=ve.get(A.envMap||j.environment,mt),j.envMapRotation=j.environment!==null&&A.envMap===null?W.environmentRotation:A.envMapRotation,Qe===void 0&&(A.addEventListener("dispose",dn),Qe=new Map,j.programs=Qe);let xt=Qe.get(Ye);if(xt!==void 0){if(j.currentProgram===xt&&j.lightsStateVersion===Ge)return Hr(A,Fe),xt}else Fe.uniforms=De.getUniforms(A),O!==null&&A.isNodeMaterial&&O.build(A,ne,Fe),A.onBeforeCompile(Fe,P),xt=De.acquireProgram(Fe,Ye),Qe.set(Ye,xt),j.uniforms=Fe.uniforms;const et=j.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(et.clippingPlanes=$e.uniform),Hr(A,Fe),j.needsLights=Qa(A),j.lightsStateVersion=Ge,j.needsLights&&(et.ambientLightColor.value=ee.state.ambient,et.lightProbe.value=ee.state.probe,et.directionalLights.value=ee.state.directional,et.directionalLightShadows.value=ee.state.directionalShadow,et.spotLights.value=ee.state.spot,et.spotLightShadows.value=ee.state.spotShadow,et.rectAreaLights.value=ee.state.rectArea,et.ltc_1.value=ee.state.rectAreaLTC1,et.ltc_2.value=ee.state.rectAreaLTC2,et.pointLights.value=ee.state.point,et.pointLightShadows.value=ee.state.pointShadow,et.hemisphereLights.value=ee.state.hemi,et.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,et.spotLightMatrix.value=ee.state.spotLightMatrix,et.spotLightMap.value=ee.state.spotLightMap,et.pointShadowMatrix.value=ee.state.pointShadowMatrix),j.lightProbeGrid=w.state.lightProbeGridArray.length>0,j.currentProgram=xt,j.uniformsList=null,xt}function Vr(A){if(A.uniformsList===null){const W=A.currentProgram.getUniforms();A.uniformsList=La.seqWithValue(W.seq,A.uniforms)}return A.uniformsList}function Hr(A,W){const ne=Q.get(A);ne.outputColorSpace=W.outputColorSpace,ne.batching=W.batching,ne.batchingColor=W.batchingColor,ne.instancing=W.instancing,ne.instancingColor=W.instancingColor,ne.instancingMorph=W.instancingMorph,ne.skinning=W.skinning,ne.morphTargets=W.morphTargets,ne.morphNormals=W.morphNormals,ne.morphColors=W.morphColors,ne.morphTargetsCount=W.morphTargetsCount,ne.numClippingPlanes=W.numClippingPlanes,ne.numIntersection=W.numClipIntersection,ne.vertexAlphas=W.vertexAlphas,ne.vertexTangents=W.vertexTangents,ne.toneMapping=W.toneMapping}function qn(A,W){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(W.matrixWorld);for(let ne=0,j=A.length;ne<j;ne++){const ee=A[ne];if(ee.texture!==null&&ee.boundingBox.containsPoint(x))return ee}return null}function Gr(A,W,ne,j,ee){W.isScene!==!0&&(W=Ze),ae.resetTextureUnits();const Ue=W.fog,Ge=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?W.environment:null,Fe=ie===null?P.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Dt.workingColorSpace,Ye=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,Qe=ve.get(j.envMap||Ge,Ye),mt=j.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,xt=!!ne.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),et=!!ne.morphAttributes.position,Oe=!!ne.morphAttributes.normal,qt=!!ne.morphAttributes.color;let Yt=mi;j.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Yt=P.toneMapping);const Nt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,rn=Nt!==void 0?Nt.length:0,We=Q.get(j),pn=w.state.lights;if(de===!0&&(xe===!0||A!==re)){const Gt=A===re&&j.id===le;$e.setState(j,A,Gt)}let Ct=!1;j.version===We.__version?(We.needsLights&&We.lightsStateVersion!==pn.state.version||We.outputColorSpace!==Fe||ee.isBatchedMesh&&We.batching===!1||!ee.isBatchedMesh&&We.batching===!0||ee.isBatchedMesh&&We.batchingColor===!0&&ee.colorTexture===null||ee.isBatchedMesh&&We.batchingColor===!1&&ee.colorTexture!==null||ee.isInstancedMesh&&We.instancing===!1||!ee.isInstancedMesh&&We.instancing===!0||ee.isSkinnedMesh&&We.skinning===!1||!ee.isSkinnedMesh&&We.skinning===!0||ee.isInstancedMesh&&We.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&We.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&We.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&We.instancingMorph===!1&&ee.morphTexture!==null||We.envMap!==Qe||j.fog===!0&&We.fog!==Ue||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==$e.numPlanes||We.numIntersection!==$e.numIntersection)||We.vertexAlphas!==mt||We.vertexTangents!==xt||We.morphTargets!==et||We.morphNormals!==Oe||We.morphColors!==qt||We.toneMapping!==Yt||We.morphTargetsCount!==rn||!!We.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ct=!0):(Ct=!0,We.__version=j.version);let mn=We.currentProgram;Ct===!0&&(mn=vs(j,W,ee),O&&j.isNodeMaterial&&O.onUpdateProgram(j,mn,We));let An=!1,ri=!1,Rn=!1;const Ot=mn.getUniforms(),Kt=We.uniforms;if(b.useProgram(mn.program)&&(An=!0,ri=!0,Rn=!0),j.id!==le&&(le=j.id,ri=!0),We.needsLights){const Gt=qn(w.state.lightProbeGridArray,ee);We.lightProbeGrid!==Gt&&(We.lightProbeGrid=Gt,ri=!0)}if(An||re!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ot.setValue(V,"projectionMatrix",A.projectionMatrix),Ot.setValue(V,"viewMatrix",A.matrixWorldInverse);const Yn=Ot.map.cameraPosition;Yn!==void 0&&Yn.setValue(V,Ee.setFromMatrixPosition(A.matrixWorld)),D.logarithmicDepthBuffer&&Ot.setValue(V,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Ot.setValue(V,"isOrthographic",A.isOrthographicCamera===!0),re!==A&&(re=A,ri=!0,Rn=!0)}if(We.needsLights&&(pn.state.directionalShadowMap.length>0&&Ot.setValue(V,"directionalShadowMap",pn.state.directionalShadowMap,ae),pn.state.spotShadowMap.length>0&&Ot.setValue(V,"spotShadowMap",pn.state.spotShadowMap,ae),pn.state.pointShadowMap.length>0&&Ot.setValue(V,"pointShadowMap",pn.state.pointShadowMap,ae)),ee.isSkinnedMesh){Ot.setOptional(V,ee,"bindMatrix"),Ot.setOptional(V,ee,"bindMatrixInverse");const Gt=ee.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),Ot.setValue(V,"boneTexture",Gt.boneTexture,ae))}ee.isBatchedMesh&&(Ot.setOptional(V,ee,"batchingTexture"),Ot.setValue(V,"batchingTexture",ee._matricesTexture,ae),Ot.setOptional(V,ee,"batchingIdTexture"),Ot.setValue(V,"batchingIdTexture",ee._indirectTexture,ae),Ot.setOptional(V,ee,"batchingColorTexture"),ee._colorsTexture!==null&&Ot.setValue(V,"batchingColorTexture",ee._colorsTexture,ae));const ai=ne.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&H.update(ee,ne,mn),(ri||We.receiveShadow!==ee.receiveShadow)&&(We.receiveShadow=ee.receiveShadow,Ot.setValue(V,"receiveShadow",ee.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&W.environment!==null&&(Kt.envMapIntensity.value=W.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=ov()),ri){if(Ot.setValue(V,"toneMappingExposure",P.toneMappingExposure),We.needsLights&&ja(Kt,Rn),Ue&&j.fog===!0&&je.refreshFogUniforms(Kt,Ue),je.refreshMaterialUniforms(Kt,j,ce,he,w.state.transmissionRenderTarget[A.id]),We.needsLights&&We.lightProbeGrid){const Gt=We.lightProbeGrid;Kt.probesSH.value=Gt.texture,Kt.probesMin.value.copy(Gt.boundingBox.min),Kt.probesMax.value.copy(Gt.boundingBox.max),Kt.probesResolution.value.copy(Gt.resolution)}La.upload(V,Vr(We),Kt,ae)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(La.upload(V,Vr(We),Kt,ae),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Ot.setValue(V,"center",ee.center),Ot.setValue(V,"modelViewMatrix",ee.modelViewMatrix),Ot.setValue(V,"normalMatrix",ee.normalMatrix),Ot.setValue(V,"modelMatrix",ee.matrixWorld),j.uniformsGroups!==void 0){const Gt=j.uniformsGroups;for(let Yn=0,yi=Gt.length;Yn<yi;Yn++){const Wr=Gt[Yn];Me.update(Wr,mn),Me.bind(Wr,mn)}}return mn}function ja(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function Qa(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(A,W,ne){const j=Q.get(A);j.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),Q.get(A.texture).__webglTexture=W,Q.get(A.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:ne,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,W){const ne=Q.get(A);ne.__webglFramebuffer=W,ne.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,ne=0){ie=A,$=W,G=ne;let j=null,ee=!1,Ue=!1;if(A){const Fe=Q.get(A);if(Fe.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(V.FRAMEBUFFER,Fe.__webglFramebuffer),fe.copy(A.viewport),ye.copy(A.scissor),Xe=A.scissorTest,b.viewport(fe),b.scissor(ye),b.setScissorTest(Xe),le=-1;return}else if(Fe.__webglFramebuffer===void 0)ae.setupRenderTarget(A);else if(Fe.__hasExternalTextures)ae.rebindTextures(A,Q.get(A.texture).__webglTexture,Q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const mt=A.depthTexture;if(Fe.__boundDepthTexture!==mt){if(mt!==null&&Q.has(mt)&&(A.width!==mt.image.width||A.height!==mt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ae.setupDepthRenderbuffer(A)}}const Ye=A.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Ue=!0);const Qe=Q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Qe[W])?j=Qe[W][ne]:j=Qe[W],ee=!0):A.samples>0&&ae.useMultisampledRTT(A)===!1?j=Q.get(A).__webglMultisampledFramebuffer:Array.isArray(Qe)?j=Qe[ne]:j=Qe,fe.copy(A.viewport),ye.copy(A.scissor),Xe=A.scissorTest}else fe.copy(Be).multiplyScalar(ce).floor(),ye.copy(ot).multiplyScalar(ce).floor(),Xe=Je;if(ne!==0&&(j=Z),b.bindFramebuffer(V.FRAMEBUFFER,j)&&b.drawBuffers(A,j),b.viewport(fe),b.scissor(ye),b.setScissorTest(Xe),ee){const Fe=Q.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+W,Fe.__webglTexture,ne)}else if(Ue){const Fe=W;for(let Ye=0;Ye<A.textures.length;Ye++){const Qe=Q.get(A.textures[Ye]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Ye,Qe.__webglTexture,ne,Fe)}}else if(A!==null&&ne!==0){const Fe=Q.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Fe.__webglTexture,ne)}le=-1},this.readRenderTargetPixels=function(A,W,ne,j,ee,Ue,Ge,Fe=0){if(!(A&&A.isWebGLRenderTarget)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ge!==void 0&&(Ye=Ye[Ge]),Ye){b.bindFramebuffer(V.FRAMEBUFFER,Ye);try{const Qe=A.textures[Fe],mt=Qe.format,xt=Qe.type;if(A.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Fe),!D.textureFormatReadable(mt)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!D.textureTypeReadable(xt)){At("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-j&&ne>=0&&ne<=A.height-ee&&V.readPixels(W,ne,j,ee,Ie.convert(mt),Ie.convert(xt),Ue)}finally{const Qe=ie!==null?Q.get(ie).__webglFramebuffer:null;b.bindFramebuffer(V.FRAMEBUFFER,Qe)}}},this.readRenderTargetPixelsAsync=async function(A,W,ne,j,ee,Ue,Ge,Fe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ge!==void 0&&(Ye=Ye[Ge]),Ye)if(W>=0&&W<=A.width-j&&ne>=0&&ne<=A.height-ee){b.bindFramebuffer(V.FRAMEBUFFER,Ye);const Qe=A.textures[Fe],mt=Qe.format,xt=Qe.type;if(A.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Fe),!D.textureFormatReadable(mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,et),V.bufferData(V.PIXEL_PACK_BUFFER,Ue.byteLength,V.STREAM_READ),V.readPixels(W,ne,j,ee,Ie.convert(mt),Ie.convert(xt),0);const Oe=ie!==null?Q.get(ie).__webglFramebuffer:null;b.bindFramebuffer(V.FRAMEBUFFER,Oe);const qt=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Xf(V,qt,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,et),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Ue),V.deleteBuffer(et),V.deleteSync(qt),Ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,W=null,ne=0){const j=Math.pow(2,-ne),ee=Math.floor(A.image.width*j),Ue=Math.floor(A.image.height*j),Ge=W!==null?W.x:0,Fe=W!==null?W.y:0;ae.setTexture2D(A,0),V.copyTexSubImage2D(V.TEXTURE_2D,ne,0,0,Ge,Fe,ee,Ue),b.unbindTexture()},this.copyTextureToTexture=function(A,W,ne=null,j=null,ee=0,Ue=0){let Ge,Fe,Ye,Qe,mt,xt,et,Oe,qt;const Yt=A.isCompressedTexture?A.mipmaps[Ue]:A.image;if(ne!==null)Ge=ne.max.x-ne.min.x,Fe=ne.max.y-ne.min.y,Ye=ne.isBox3?ne.max.z-ne.min.z:1,Qe=ne.min.x,mt=ne.min.y,xt=ne.isBox3?ne.min.z:0;else{const Kt=Math.pow(2,-ee);Ge=Math.floor(Yt.width*Kt),Fe=Math.floor(Yt.height*Kt),A.isDataArrayTexture?Ye=Yt.depth:A.isData3DTexture?Ye=Math.floor(Yt.depth*Kt):Ye=1,Qe=0,mt=0,xt=0}j!==null?(et=j.x,Oe=j.y,qt=j.z):(et=0,Oe=0,qt=0);const Nt=Ie.convert(W.format),rn=Ie.convert(W.type);let We;W.isData3DTexture?(ae.setTexture3D(W,0),We=V.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ae.setTexture2DArray(W,0),We=V.TEXTURE_2D_ARRAY):(ae.setTexture2D(W,0),We=V.TEXTURE_2D),b.activeTexture(V.TEXTURE0),b.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,W.flipY),b.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),b.pixelStorei(V.UNPACK_ALIGNMENT,W.unpackAlignment);const pn=b.getParameter(V.UNPACK_ROW_LENGTH),Ct=b.getParameter(V.UNPACK_IMAGE_HEIGHT),mn=b.getParameter(V.UNPACK_SKIP_PIXELS),An=b.getParameter(V.UNPACK_SKIP_ROWS),ri=b.getParameter(V.UNPACK_SKIP_IMAGES);b.pixelStorei(V.UNPACK_ROW_LENGTH,Yt.width),b.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Yt.height),b.pixelStorei(V.UNPACK_SKIP_PIXELS,Qe),b.pixelStorei(V.UNPACK_SKIP_ROWS,mt),b.pixelStorei(V.UNPACK_SKIP_IMAGES,xt);const Rn=A.isDataArrayTexture||A.isData3DTexture,Ot=W.isDataArrayTexture||W.isData3DTexture;if(A.isDepthTexture){const Kt=Q.get(A),ai=Q.get(W),Gt=Q.get(Kt.__renderTarget),Yn=Q.get(ai.__renderTarget);b.bindFramebuffer(V.READ_FRAMEBUFFER,Gt.__webglFramebuffer),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let yi=0;yi<Ye;yi++)Rn&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Q.get(A).__webglTexture,ee,xt+yi),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Q.get(W).__webglTexture,Ue,qt+yi)),V.blitFramebuffer(Qe,mt,Ge,Fe,et,Oe,Ge,Fe,V.DEPTH_BUFFER_BIT,V.NEAREST);b.bindFramebuffer(V.READ_FRAMEBUFFER,null),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(ee!==0||A.isRenderTargetTexture||Q.has(A)){const Kt=Q.get(A),ai=Q.get(W);b.bindFramebuffer(V.READ_FRAMEBUFFER,K),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,B);for(let Gt=0;Gt<Ye;Gt++)Rn?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Kt.__webglTexture,ee,xt+Gt):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Kt.__webglTexture,ee),Ot?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ai.__webglTexture,Ue,qt+Gt):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,ai.__webglTexture,Ue),ee!==0?V.blitFramebuffer(Qe,mt,Ge,Fe,et,Oe,Ge,Fe,V.COLOR_BUFFER_BIT,V.NEAREST):Ot?V.copyTexSubImage3D(We,Ue,et,Oe,qt+Gt,Qe,mt,Ge,Fe):V.copyTexSubImage2D(We,Ue,et,Oe,Qe,mt,Ge,Fe);b.bindFramebuffer(V.READ_FRAMEBUFFER,null),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Ot?A.isDataTexture||A.isData3DTexture?V.texSubImage3D(We,Ue,et,Oe,qt,Ge,Fe,Ye,Nt,rn,Yt.data):W.isCompressedArrayTexture?V.compressedTexSubImage3D(We,Ue,et,Oe,qt,Ge,Fe,Ye,Nt,Yt.data):V.texSubImage3D(We,Ue,et,Oe,qt,Ge,Fe,Ye,Nt,rn,Yt):A.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Ue,et,Oe,Ge,Fe,Nt,rn,Yt.data):A.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Ue,et,Oe,Yt.width,Yt.height,Nt,Yt.data):V.texSubImage2D(V.TEXTURE_2D,Ue,et,Oe,Ge,Fe,Nt,rn,Yt);b.pixelStorei(V.UNPACK_ROW_LENGTH,pn),b.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Ct),b.pixelStorei(V.UNPACK_SKIP_PIXELS,mn),b.pixelStorei(V.UNPACK_SKIP_ROWS,An),b.pixelStorei(V.UNPACK_SKIP_IMAGES,ri),Ue===0&&W.generateMipmaps&&V.generateMipmap(We),b.unbindTexture()},this.initRenderTarget=function(A){Q.get(A).__webglFramebuffer===void 0&&ae.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ae.setTextureCube(A,0):A.isData3DTexture?ae.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ae.setTexture2DArray(A,0):ae.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){$=0,G=0,ie=null,b.reset(),ke.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dt._getUnpackColorSpace()}}const xr=new I;function On(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;xr.copy(e),xr[n]=0,xr.normalize();const l=.5*a/(a+c),u=1-xr.angleTo(i)/o;return Math.sign(xr[t])===1?u*l:c/(a+c)+l+l*(1-u)}class Or extends Re{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new I,l=new I,u=new I(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,h=this.attributes.normal.array,d=this.attributes.uv.array,g=f.length/6,_=new I,m=.5/a;for(let p=0,M=0;p<f.length;p+=3,M+=2)switch(o.fromArray(f,p),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[p+0]=u.x*Math.sign(o.x)+l.x*r,f[p+1]=u.y*Math.sign(o.y)+l.y*r,f[p+2]=u.z*Math.sign(o.z)+l.z*r,h[p+0]=l.x,h[p+1]=l.y,h[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),d[M+0]=On(_,l,"z","y",r,n),d[M+1]=1-On(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),d[M+0]=1-On(_,l,"z","y",r,n),d[M+1]=1-On(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),d[M+0]=1-On(_,l,"x","z",r,e),d[M+1]=On(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),d[M+0]=1-On(_,l,"x","z",r,e),d[M+1]=1-On(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),d[M+0]=1-On(_,l,"x","y",r,e),d[M+1]=1-On(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),d[M+0]=On(_,l,"x","y",r,e),d[M+1]=1-On(_,l,"y","x",r,t);break}}static fromJSON(e){return new Or(e.width,e.height,e.depth,e.segments,e.radius)}}const Hh={type:"change"},mc={type:"start"},Hu={type:"end"},wa=new $a,Gh=new Ri,cv=Math.cos(70*Zf.DEG2RAD),an=new I,En=2*Math.PI,Xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vo=1e-6;class hv extends f0{constructor(e,t=null){super(e,t),this.state=Xt.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gs.ROTATE,MIDDLE:Gs.DOLLY,RIGHT:Gs.PAN},this.touches={ONE:Vs.ROTATE,TWO:Vs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new Ui,this._lastTargetPosition=new I,this._quat=new Ui().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _h,this._sphericalDelta=new _h,this._scale=1,this._panOffset=new I,this._rotateStart=new J,this._rotateEnd=new J,this._rotateDelta=new J,this._panStart=new J,this._panEnd=new J,this._panDelta=new J,this._dollyStart=new J,this._dollyEnd=new J,this._dollyDelta=new J,this._dollyDirection=new I,this._mouse=new J,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fv.bind(this),this._onPointerDown=uv.bind(this),this._onPointerUp=dv.bind(this),this._onContextMenu=yv.bind(this),this._onMouseWheel=gv.bind(this),this._onKeyDown=_v.bind(this),this._onTouchStart=vv.bind(this),this._onTouchMove=xv.bind(this),this._onMouseDown=pv.bind(this),this._onMouseMove=mv.bind(this),this._interceptControlDown=Mv.bind(this),this._interceptControlUp=bv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hh),this.update(),this.state=Xt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;an.copy(t).sub(this.target),an.applyQuaternion(this._quat),this._spherical.setFromVector3(an),this.autoRotate&&this.state===Xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=En:n>Math.PI&&(n-=En),s<-Math.PI?s+=En:s>Math.PI&&(s-=En),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(an.setFromSpherical(this._spherical),an.applyQuaternion(this._quatInverse),t.copy(this.target).add(an),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=an.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=an.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(wa.origin.copy(this.object.position),wa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wa.direction))<cv?this.object.lookAt(this.target):(Gh.setFromNormalAndCoplanarPoint(this.object.up,this.target),wa.intersectPlane(Gh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vo||this._lastTargetPosition.distanceToSquared(this.target)>Vo?(this.dispatchEvent(Hh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?En/60*this.autoRotateSpeed*e:En/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){an.setFromMatrixColumn(t,0),an.multiplyScalar(-e),this._panOffset.add(an)}_panUp(e,t){this.screenSpacePanning===!0?an.setFromMatrixColumn(t,1):(an.setFromMatrixColumn(t,0),an.crossVectors(this.object.up,an)),an.multiplyScalar(e),this._panOffset.add(an)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;an.copy(s).sub(this.target);let r=an.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(En*this._rotateDelta.x/t.clientHeight),this._rotateUp(En*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(En*this._rotateDelta.x/t.clientHeight),this._rotateUp(En*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new J,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function uv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function fv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function dv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Hu),this.state=Xt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function pv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Xt.DOLLY;break;case Gs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Xt.ROTATE}break;case Gs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Xt.PAN}break;default:this.state=Xt.NONE}this.state!==Xt.NONE&&this.dispatchEvent(mc)}function mv(i){switch(this.state){case Xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function gv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Xt.NONE||(i.preventDefault(),this.dispatchEvent(mc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Hu))}function _v(i){this.enabled!==!1&&this._handleKeyDown(i)}function vv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Vs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Xt.TOUCH_ROTATE;break;case Vs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Xt.TOUCH_PAN;break;default:this.state=Xt.NONE}break;case 2:switch(this.touches.TWO){case Vs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Xt.TOUCH_DOLLY_PAN;break;case Vs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Xt.TOUCH_DOLLY_ROTATE;break;default:this.state=Xt.NONE}break;default:this.state=Xt.NONE}this.state!==Xt.NONE&&this.dispatchEvent(mc)}function xv(i){switch(this._trackPointer(i),this.state){case Xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Xt.NONE}}function yv(i){this.enabled!==!1&&i.preventDefault()}function Mv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Sv extends uu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Re;e.deleteAttribute("uv");const t=new X({side:wn}),n=new X,s=new Lu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new pe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new gu(e,n,6),c=new nn;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new pe(e,ks(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new pe(e,ks(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new pe(e,ks(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new pe(e,ks(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const h=new pe(e,ks(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);const d=new pe(e,ks(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ks(i){return new n0({color:0,emissive:16777215,emissiveIntensity:i})}const wv=1.8,fi=.75,Hn=.9;function Ev(i,e={}){const t=new lv({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=Tr,t.outputColorSpace=un,t.toneMapping=$l,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new uu;r.background=new vt(n?12377333:14672872),r.fog=n?new Ar(12377333,60*s,160*s):new Ar(14672872,4*s,9*s);const a=new Gl(t),c=a.fromScene(new Sv,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new Ln(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new I(...e.cameraPosition??[0,.5,1.45]),u=new I(...e.target??[0,.3,0]);o.position.copy(l);const f=new hv(o,t.domElement);f.target.copy(u),f.enableDamping=!0,f.dampingFactor=.08,f.enablePan=!1,f.minDistance=e.minDistance??.5,f.maxDistance=e.maxDistance??3,f.maxPolarAngle=Math.PI/2.05,f.minAzimuthAngle=-Math.PI/2.2,f.maxAzimuthAngle=Math.PI/2.2,f.update();const h=new St;h.scale.setScalar(s),r.add(h);const d=e.benchLength??wv,g=[],_=[];let m=null,p=null;const M=[];let y=null,x=null;if(n)Lv(h),Nv(h);else{if(Tv(h),y=Dv(h,!!e.cupboard,d,s,!!e.wallCabinets),e.wallCabinets){x=Ho(h,d,s),m=Av(h);const me=Iv(h);g.push(...me.doors),_.push(...me.blockers),p=me.cctvLed,f.minAzimuthAngle=-1/0,f.maxAzimuthAngle=1/0;const ue=d/2+.1+.08+.16,Y=6.1,he=Y-ue,ce=(ue+Y)/2,Se=Ho(h,d,s,{width:he,centres:[-ce,ce],lit:!1,covering:!1,doorPairs:3});g.push(...Se.doors),_.push(...Se.blockers),M.push({c:Se.cabinets[0],rotY:0,offset:new I},{c:x.cabinets[0],rotY:0,offset:new I},{c:x.cabinets[1],rotY:0,offset:new I},{c:Se.cabinets[1],rotY:0,offset:new I})}if(e.sideBenches){const me=7-fi/2-.02;for(const ue of[-1,1]){const Y=Wh(d,s);if(Y.group.position.set(ue*me,0,1.6),Y.group.rotation.y=-ue*Math.PI/2,h.add(Y.group),g.push(...Y.parts.doors),_.push(...Y.parts.blockers),e.wallCabinets){const ce=new St;ce.position.set(ue*7,0,1.6),ce.rotation.y=-ue*Math.PI/2,h.add(ce);const Se=d/2-.04,He=Ho(ce,d,s,{wallZ:0,width:Se,centres:[-Se/2-.02,Se/2+.02],lit:!1,covering:!1});g.push(...He.doors),_.push(...He.blockers);for(const Be of[...He.cabinets].reverse())M.push({c:Be,rotY:ce.rotation.y,offset:ce.position.clone()})}const he=Wh(.9,s);he.group.position.set(ue*(d/2+.5+.45),0,0),h.add(he.group),g.push(...he.parts.doors),_.push(...he.parts.blockers)}}}!n&&(e.cupboard||e.wallCabinets)&&(r.fog=new Ar(14672872,11*s,26*s)),s!==1&&h.traverse(me=>{if(!(me instanceof Xa)||!me.castShadow)return;const ue=me.shadow.camera;ue.left*=s,ue.right*=s,ue.top*=s,ue.bottom*=s,ue.near*=s,ue.far*=s,ue.updateProjectionMatrix(),me.shadow.normalBias*=s});const E=[],w=new c0;let R=0;const v=me=>{R=requestAnimationFrame(v),w.update(me);const ue=Math.min(1,w.getDelta());if(E.forEach(Y=>Y(ue)),Z){Z.t=Math.min(1,Z.t+ue/.7);const Y=Z.t<.5?2*Z.t*Z.t:1-Math.pow(-2*Z.t+2,2)/2;o.position.lerpVectors(Z.fromPos,Z.toPos,Y),f.target.lerpVectors(Z.fromTarget,Z.toTarget,Y),Z.t>=1&&(Z=null)}f.update(),Fv(r,o,t.domElement.clientHeight),t.render(r,o)};R=requestAnimationFrame(v);let T=null,P=null,N=null,O=!1,Z=null;f.addEventListener("start",()=>{O=!0,Z=null});const K=new ResizeObserver(()=>{const me=i.clientWidth,ue=i.clientHeight;!me||!ue||(t.setSize(me,ue),o.aspect=me/ue,o.updateProjectionMatrix(),T&&!O&&(P!==null?B(T,P,{dir:N||void 0}):$(T)))});K.observe(i);function B(me,ue=.7,Y={}){if(me.isEmpty())return;T=me.clone(),P=ue,O=!1;const he=me.getCenter(new I),ce=(Y.dir?Y.dir.clone():l.clone().sub(u)).normalize();N=ce.clone();const Se=o.position.clone(),He=f.target.clone(),Be=[0,1,2,3,4,5,6,7].map(de=>new I(de&1?me.max.x:me.min.x,de&2?me.max.y:me.min.y,de&4?me.max.z:me.min.z)),ot=de=>(o.position.copy(he).addScaledVector(ce,de),o.lookAt(he),o.updateMatrixWorld(!0),Be.every(xe=>{const we=xe.clone().project(o);return we.z<1&&Math.abs(we.x)<=ue&&Math.abs(we.y)<=ue}));let Je=.01,oe=f.maxDistance*4;for(let de=0;de<40;de++){const xe=(Je+oe)/2;ot(xe)?oe=xe:Je=xe}if(f.maxDistance=Math.max(f.maxDistance,oe*1.5),u.copy(he),l.copy(he).addScaledVector(ce,oe),Y.animate){o.position.copy(Se),o.lookAt(He),Z={fromPos:Se,toPos:l.clone(),fromTarget:He,toTarget:u.clone(),t:0};return}Z=null,o.position.copy(l),f.target.copy(u),f.update()}function $(me){if(me.isEmpty())return;T=me.clone(),P=null,O=!1;const ue=me.getCenter(new I),Y=me.getSize(new I),he=o.fov*Math.PI/180,ce=2*Math.atan(Math.tan(he/2)*o.aspect),Se=Math.max(Y.x/2/Math.tan(ce/2),Math.max(Y.y,Y.z*.6)/2/Math.tan(he/2))*1.12+Y.z*.25,He=l.clone().sub(u).normalize(),Be=Math.min(f.maxDistance,Math.max(f.minDistance,Se));u.copy(ue),l.copy(ue).addScaledVector(He,Be),o.position.copy(l),f.target.copy(u),f.update()}const G=new J;if(p){const me=p;let ue=0;E.push(Y=>{ue+=Y,me.visible=ue%1.2<.7})}let ie=null;if(m){const me=m;let ue=0;E.push(Y=>{ue+=Y,me.taps.forEach(Be=>{const ot=!!Be.userData.on,Je=Be.userData.handle;Je.rotation.y+=((ot?-Math.PI/2:0)-Je.rotation.y)*Math.min(1,Y*10);const oe=Be.userData.stream;if(oe.visible=ot,ot){const de=oe.material.map;de.offset.y=(de.offset.y-Y*3)%1,oe.scale.x=oe.scale.z=1+Math.sin(ue*40)*.08}Be.userData.splash.visible=ot});const he=new Date,ce=he.getSeconds()+he.getMilliseconds()/1e3,Se=he.getMinutes()+ce/60,He=he.getHours()%12+Se/60;me.clock.second.rotation.z=-(Math.floor(ce)/60)*Math.PI*2,me.clock.minute.rotation.z=-(Se/60)*Math.PI*2,me.clock.hour.rotation.z=-(He/12)*Math.PI*2}),ie={taps:me.taps,tapOf:Y=>{let he=Y;for(;he&&!he.userData.isTap;)he=he.parent;return he},toggle:Y=>{Y.userData.on=!Y.userData.on},isOn:Y=>!!Y.userData.on,anyOn:()=>me.taps.filter(Y=>Y.userData.on).length}}const le=[...(y==null?void 0:y.doors)||[],...(x==null?void 0:x.doors)||[],...g];le.length&&E.push(me=>{le.forEach(ue=>{const Y=ue.userData.open?ue.userData.openAngle:0;ue.rotation.y+=(Y-ue.rotation.y)*Math.min(1,me*7)})});const re=me=>{let ue=me;for(;ue&&!ue.userData.cupboardDoor;)ue=ue.parent;return ue},fe=me=>{me.userData.open=!me.userData.open},ye=x?{doors:x.doors,blockers:x.blockers,cabinets:M.map(({c:me,rotY:ue,offset:Y})=>({minX:me.minX*s,maxX:me.maxX*s,rows:me.rows.map(he=>he*s),rowHeight:me.rowHeight*s,depth:me.depth*s,z:me.z*s,frontZ:me.frontZ*s,bays:me.bays,topY:me.topY*s,corniceFrontZ:me.corniceFrontZ*s,cx:me.cx*s,rotY:ue,offset:Y.clone().multiplyScalar(s)}))}:null;let Xe=null;if(y){const me=y;Xe={doors:me.doors,blockers:me.blockers,bays:me.bays.map(ue=>({minX:ue.minX*s,maxX:ue.maxX*s,levels:ue.levels.map(Y=>Y*s),frontZ:ue.frontZ*s,backZ:ue.backZ*s})),toggleDoor:fe,isOpen:ue=>!!ue.userData.open,doorOf:re}}return{cupboard:Xe,wallCabinets:ye,furniture:{doors:g,blockers:_},taps:ie,benchLength:d,flyTo:(me,ue)=>{T=null,P=null,O=!1,l.copy(me).multiplyScalar(s),u.copy(ue).multiplyScalar(s),f.maxDistance=Math.max(f.maxDistance,l.distanceTo(u)*1.5),Z={fromPos:o.position.clone(),toPos:l.clone(),fromTarget:f.target.clone(),toTarget:u.clone(),t:0}},toggleDoor:fe,doorOf:re,renderer:t,scene:r,camera:o,controls:f,canvas:t.domElement,onFrame:me=>{E.push(me)},resetView:()=>{o.position.copy(l),f.target.copy(u),f.update()},frameBox:$,fitBox:B,toNdc:me=>{const ue=t.domElement.getBoundingClientRect();return G.set((me.clientX-ue.left)/ue.width*2-1,-((me.clientY-ue.top)/ue.height)*2+1),G},dispose:()=>{cancelAnimationFrame(R),K.disconnect(),f.dispose(),r.traverse(me=>{var ue;(me instanceof pe||me instanceof vd||me instanceof Dn)&&((ue=me.geometry)==null||ue.dispose(),(Array.isArray(me.material)?me.material:[me.material]).forEach(he=>{var ce;(ce=he.map)==null||ce.dispose(),he.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function Tv(i){i.add(new Pu(16119807,9080729,.55));const e=new Xa(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new Xa(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}const hs=-fi/2-.25;function Av(i){const e=Br.steel(),t=new X({color:13225684,roughness:.25,metalness:.9,side:Zt}),n=new X({map:ms(),roughness:.7}),s=new _i({color:2040616,roughness:.42,clearcoat:.4}),r=.8,a=.6,c=[];for(const y of[-1,1]){const x=new St;x.position.set(y*(7-r/2-.02),0,hs+a/2+.01),i.add(x);const E=.2,w=Hn-.035-E,R=new pe(new Re(r-.04,w,a-.04),n);R.position.y=-Hn+w/2,R.castShadow=R.receiveShadow=!0,x.add(R);const v=(oe,de,xe,we)=>{const Ee=new pe(new Re(oe,E,de),n);Ee.position.set(xe,-.035-E/2,we),x.add(Ee)};v(r-.04,.02,0,(a-.04)/2-.01),v(r-.04,.02,0,-.5599999999999999/2+.01),v(.02,a-.04,(r-.04)/2-.01,0),v(.02,a-.04,-.76/2+.01,0);const T=new pe(new Re(.004,Hn-.12,.002),new X({color:3877404}));T.position.set(0,-Hn/2-.02,(a-.04)/2+.001),x.add(T);for(const oe of[-.04,.04]){const de=new pe(new F(.006,.006,.1,12),e);de.position.set(oe,-.2,(a-.04)/2+.015),x.add(de)}const P=.5,N=.36,O=.03,Z=.2,K=(oe,de,xe,we)=>{const Ee=new pe(new Re(oe,.035,de),s);Ee.position.set(xe,-.0175,we),Ee.receiveShadow=!0,x.add(Ee)};K(r,a/2+O-N/2,0,-a/2+(a/2+O-N/2)/2),K(r,a/2-O-N/2,0,O+N/2+(a/2-O-N/2)/2),K((r-P)/2,N,-.325,O),K((r-P)/2,N,P/2+(r-P)/4,O);const B=new pe(new Re(P,Z,N),[t,t,t,t,t,t]);B.geometry.groups.splice(2,1),B.position.set(0,-Z/2,O),x.add(B);const $=new pe(new F(.025,.025,.004,20),new X({color:3621201,metalness:.8,roughness:.4}));$.position.set(0,-Z+.003,O),x.add($);const G=new St;G.userData.isTap=!0,G.userData.on=!1;const ie=O-N/2-.06,le=.09,re=.3,fe=new pe(new F(.014,.018,re,16),e);fe.position.set(0,re/2,ie);const ye=new pe(new Tt(le,.014,10,24,Math.PI),e);ye.position.set(0,re,ie+le),ye.rotation.y=-Math.PI/2;const Xe=new pe(new F(.016,.013,.04,14),e);Xe.position.set(0,re-.02,ie+2*le);const me=new pe(new F(.03,.035,.02,20),e);me.position.set(0,.01,ie);const ue=new St;ue.position.set(0,.16,ie);const Y=new pe(new F(.022,.022,.04,16),e),he=new pe(new Re(.012,.012,.11),e);he.position.set(0,.01,.06);const ce=new pe(new Ft(.014,12,8),new X({color:2450411,roughness:.4}));ce.position.set(0,.01,.115),ue.add(Y,he,ce);const Se=re-.04+Z,He=Zi(32,128,(oe,de,xe)=>{oe.fillStyle="#dbeafe",oe.fillRect(0,0,de,xe);for(let we=0;we<xe;we+=6)oe.fillStyle=`rgba(255,255,255,${.3+Math.random()*.5})`,oe.fillRect(0,we,de,2)});He.wrapS=He.wrapT=vn,He.repeat.set(1,3);const Be=new pe(new F(.009,.012,Se,12,1,!0),new X({map:He,color:12575743,transparent:!0,opacity:.75,roughness:.05,metalness:.1,depthWrite:!1}));Be.position.set(0,re-.04-Se/2,ie+2*le),Be.visible=!1;const ot=new pe(new Tn(.07,24),new X({color:12575743,transparent:!0,opacity:.6,roughness:.05}));ot.rotation.x=-Math.PI/2,ot.position.set(0,-Z+.006,ie+2*le),ot.visible=!1;const Je=new pe(new Re(P+.06,re+.05+Z,N+.16),new ds({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));Je.position.set(0,(re+.05-Z)/2,O-.06),G.add(fe,ye,Xe,me,ue,Be,ot,Je),G.userData.handle=ue,G.userData.stream=Be,G.userData.splash=ot,x.add(G),c.push(G)}const o=new St;o.position.set(0,1.68,hs+.02),i.add(o);const l=.12,u=Zi(512,512,(y,x)=>{const E=x/2;y.fillStyle="#fffdf7",y.beginPath(),y.arc(E,E,E,0,Math.PI*2),y.fill(),y.fillStyle="#111827";for(let w=0;w<60;w++){const R=w/60*Math.PI*2,v=w%5===0;y.save(),y.translate(E,E),y.rotate(R),y.fillRect(v?-5:-2,-E+14,v?10:4,v?34:16),y.restore()}y.font="bold 54px Arial",y.textAlign="center",y.textBaseline="middle";for(let w=1;w<=12;w++){const R=w/12*Math.PI*2;y.fillText(String(w),E+Math.sin(R)*(E-92),E-Math.cos(R)*(E-92))}y.font="bold 22px Arial",y.fillStyle="#4b5563",y.fillText("LABORATORY",E,E+110)}),f=new pe(new F(l+.02,l+.02,.05,48),new X({color:2042167,roughness:.4,metalness:.5}));f.rotation.x=Math.PI/2;const h=new pe(new Tn(l,48),new X({map:u,roughness:.6}));h.position.z=.026;const d=new pe(new Tn(l,48),new _i({color:16777215,transparent:!0,opacity:.12,roughness:.05,clearcoat:1,depthWrite:!1}));d.position.z=.05,o.add(f,h,d);const g=(y,x,E,w)=>{const R=new St;R.position.z=w;const v=new pe(new Re(x,y,.004),new X({color:E,roughness:.5}));return v.position.y=y/2-y*.12,R.add(v),o.add(R),R},_=g(l*.55,.014,1120295,.03),m=g(l*.8,.009,1120295,.034),p=g(l*.88,.004,14427686,.038),M=new pe(new F(.01,.01,.012,16),new X({color:14427686}));return M.rotation.x=Math.PI/2,M.position.z=.042,o.add(M),{taps:c,clock:{hour:_,minute:m,second:p}}}const Gu=()=>new X({color:1976890,roughness:.95}),Rv=()=>new X({color:14928028,roughness:.55});function ql(i,e,t,n,s,r,a=9){const c=new pe(new Re(s,.008,.012),new X({color:16777215,emissive:16773590,emissiveIntensity:2}));c.position.set(e,t,n),i.add(c);const o=new Lu(16773590,a,1.4*r,2);o.position.set(e,t-.05,n+.05),i.add(o)}function Cv(i,e){const t=-Hn,n=e-t,s=Zi(256,256,(g,_,m)=>{g.fillStyle="#1f5a63",g.fillRect(0,0,_,m);for(let p=0;p<_;p+=4)g.fillStyle=p%8===0?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",g.fillRect(p,0,2,m),g.fillRect(0,p,_,2);for(let p=0;p<900;p++)g.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"0,0,0"},${Math.random()*.06})`,g.fillRect(Math.random()*_,Math.random()*m,2,2);g.strokeStyle="rgba(255,255,255,0.06)",g.lineWidth=2,g.beginPath(),g.moveTo(_/2,0),g.lineTo(_,m/2),g.lineTo(_/2,m),g.lineTo(0,m/2),g.closePath(),g.stroke()});s.wrapS=s.wrapT=vn;const r=new X({map:ms(),roughness:.55}),a=new X({color:13936715,roughness:.25,metalness:1}),c=new X({color:15659250,roughness:.95}),o=7,l=7,u=l-hs,f=(l+hs)/2,h=5;[{x:0,z:hs,rotY:0,length:2*o,newWall:!1},{x:-o,z:f,rotY:Math.PI/2,length:u,newWall:!0},{x:o,z:f,rotY:-Math.PI/2,length:u,newWall:!0},{x:0,z:l,rotY:Math.PI,length:2*o,newWall:!0,gap:zs+.2}].forEach(({x:g,z:_,rotY:m,length:p,newWall:M,gap:y})=>{const x=new St;x.position.set(g,0,_),x.rotation.y=m,i.add(x);const E=y?[[-p/2,-y/2],[y/2,p/2]]:[[-p/2,p/2]];if(M&&y){const w=h-Qn,R=new pe(new $t(y,w),c);R.position.y=t+Qn+w/2,x.add(R)}E.forEach(([w,R])=>{const v=R-w,T=(w+R)/2;if(M){const G=new pe(new $t(v,h),c);G.position.set(T,t+h/2,0),G.receiveShadow=!0,x.add(G)}const P=s.clone();P.needsUpdate=!0,P.repeat.set(v/.35,n/.35);const N=new pe(new $t(v,n),new X({map:P,roughness:.95}));N.position.set(T,t+n/2,.004),N.receiveShadow=!0,x.add(N);const O=new pe(new Re(v,.045,.022),r);O.position.set(T,e-.0225,.015),O.castShadow=!0,O.receiveShadow=!0,x.add(O);const Z=new pe(new Re(v,.1,.018),r);Z.position.set(T,t+.05,.013),x.add(Z);const K=Math.floor(v/.15),B=new gu(new Ft(.007,10,8),a,K),$=new Bt;for(let G=0;G<K;G++)$.makeTranslation(w+.075+G*.15,e-.075,.007),B.setMatrixAt(G,$);x.add(B)})})}const zs=1.8,Qn=2.1,Pv=7;function Iv(i){const e=-Hn,t=[],n=[],s=new X({map:ms(),roughness:.55}),r=new X({map:ms(),color:14727562,roughness:.5}),a=Br.steel(),c=Pv,o=(v,T,P,N)=>{const O=new pe(new Re(v,T,.08),s);O.position.set(P,N,c-.03),O.castShadow=!0,i.add(O),n.push(O)};o(.1,Qn+.1,-zs/2-.05,e+(Qn+.1)/2),o(.1,Qn+.1,zs/2+.05,e+(Qn+.1)/2),o(zs+.2,.1,0,e+Qn+.05);const l=zs/2-.005,u=new _i({color:13625599,transparent:!0,opacity:.35,roughness:.05,depthWrite:!1});for(const v of[1,-1]){const T=new St;T.position.set(-v*zs/2,e+Qn/2,c-.02);const P=l,N=Qn-.01,O=.045,Z=(ye,Xe,me,ue)=>{const Y=new pe(new Re(ye,Xe,O),r);Y.position.set(v*me,ue,0),Y.castShadow=!0,T.add(Y)},K=.15,B=.75,$=.18,G=P-.18;Z(P,N/2+K,P/2,-N/2+(N/2+K)/2),Z(P,N/2-B,P/2,N/2-(N/2-B)/2),Z($,B-K,$/2,(B+K)/2),Z(P-G,B-K,(P+G)/2,(B+K)/2);const ie=new pe(new $t(G-$,B-K),u);ie.position.set(v*($+G)/2,(B+K)/2,0),ie.renderOrder=2,T.add(ie);const le=new pe(new Re(.1,.3,.004),a);le.position.set(v*(P-.1),.05,-O/2-.003);const re=new pe(new F(.012,.012,.3,12),a);re.position.set(v*(P-.1),.05,-O/2-.05);const fe=new pe(new Re(P-.04,.2,.004),a);fe.position.set(v*P/2,-N/2+.12,-O/2-.003);for(const ye of[-.1,.2]){const Xe=new pe(new F(.008,.008,.05,8),a);Xe.rotation.x=Math.PI/2,Xe.position.set(v*(P-.1),ye,-O/2-.025),T.add(Xe)}T.add(le,re,fe),T.userData.cupboardDoor=!0,T.userData.open=!1,T.userData.openAngle=v*1.45,i.add(T),t.push(T)}const f=(v,T,P,N,O)=>{const Z=Zi(512,Math.round(512*T/v),N),K=new pe(new Re(v,T,.03),[s,s,s,s,s,new X({map:Z,emissive:O?16777215:0,emissiveMap:O?Z:null,emissiveIntensity:O?.8:0,roughness:.4})]);K.position.set(0,P,c-.04),i.add(K)};f(.42,.15,e+Qn+.25,(v,T,P)=>{v.fillStyle="#15803d",v.fillRect(0,0,T,P),v.fillStyle="#ffffff",v.font="bold 110px Arial",v.textAlign="center",v.textBaseline="middle",v.fillText("EXIT",T/2+40,P/2+6),v.fillRect(40,P*.3,70,16),v.beginPath(),v.moveTo(110,P*.3-22),v.lineTo(150,P*.3+8),v.lineTo(110,P*.3+38),v.fill()},!0),f(1.3,.18,e+Qn+.5,(v,T,P)=>{const N=v.createLinearGradient(0,0,0,P);N.addColorStop(0,"#f8e3a1"),N.addColorStop(.5,"#d9a842"),N.addColorStop(1,"#a8781f"),v.fillStyle=N,v.fillRect(0,0,T,P),v.strokeStyle="#5a3f0c",v.lineWidth=4,v.strokeRect(6,6,T-12,P-12),v.fillStyle="#3b2606",v.font="bold 34px Georgia, serif",v.textAlign="center",v.textBaseline="middle",v.fillText("SCIENCE  LABORATORY",T/2,P/2+2)},!1);const h=new pe(new $t(6,4),new X({color:13159634,roughness:.8}));h.rotation.x=-Math.PI/2,h.position.set(0,e+.001,c+2),i.add(h);const d=new pe(new $t(6,5),new X({color:14673644,roughness:.9}));d.rotation.y=Math.PI,d.position.set(0,e+2.5,c+4),i.add(d);for(const v of[-3,3]){const T=new pe(new $t(4,5),new X({color:15265265,roughness:.9}));T.rotation.y=v<0?Math.PI/2:-Math.PI/2,T.position.set(v,e+2.5,c+2),i.add(T)}const g=new St;g.position.set(4.2,2.35,hs+.02),i.add(g);const _=new X({color:15987958,roughness:.4}),m=new pe(new Re(.1,.12,.02),_),p=new pe(new F(.015,.015,.16,12),_);p.rotation.x=Math.PI/2,p.position.z=.08,g.add(m,p);const M=new St;M.position.z=.17;const y=new I(0,e+1.1,c).sub(g.position).sub(M.position);M.rotation.order="YXZ",M.rotation.y=Math.atan2(y.x,y.z),M.rotation.x=-Math.atan2(y.y,Math.hypot(y.x,y.z)),g.add(M);const x=new pe(new Re(.09,.08,.24),_);x.position.z=.06;const E=new pe(new Re(.11,.012,.28),_);E.position.set(0,.046,.08);const w=new pe(new F(.028,.028,.02,20),new X({color:988970,roughness:.1,metalness:.6}));w.rotation.x=Math.PI/2,w.position.z=.185;const R=new pe(new Ft(.006,8,6),new X({color:15680580,emissive:15680580,emissiveIntensity:2}));return R.position.set(.03,-.025,.182),M.add(x,E,w,R),{doors:t,blockers:n,cctvLed:R}}function Ho(i,e,t=1,n={}){const s=n.width??e/2+.1,r=.86,a=.3,c=.016,o=.5,l=(n.wallZ??hs)+.002,u=l+a,f=4,h=ms(),d=new X({map:h,roughness:.6}),g=Gu(),_=Rv(),m=new X({color:14146528,roughness:.3,metalness:.85}),p=new _i({color:15398655,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1}),M=[],y=[],x=[];n.covering!==!1&&Cv(i,o);const E=.08+s/2;for(const w of n.centres??[-E,E]){const R=w-s/2,v=w+s/2,T=(re,fe,ye,Xe,me,ue,Y)=>{const he=new pe(new Re(re,fe,ye),Y);he.position.set(Xe,me,ue),he.castShadow=!0,he.receiveShadow=!0,i.add(he),y.push(he)};T(s,r,c,w,o+r/2,l+c/2,g),T(c,r,a,R+c/2,o+r/2,l+a/2,d),T(c,r,a,v-c/2,o+r/2,l+a/2,d),T(s,c*1.5,a,w,o+r-c*.75,l+a/2,d),T(s,c*1.5,a,w,o+c*.75,l+a/2,d),T(s+.03,.03,a+.02,w,o+r+.015,l+a/2+.01,d);const P=o+c*1.5,N=o+r-c*1.5,O=(N-P)/f,Z=[];for(let re=0;re<f;re++){const fe=P+re*O;re>0&&T(s-2*c,c,a-c-.03,w,fe-c/2,l+c+(a-c-.03)/2,_),Z.unshift(fe)}if(n.lit!==!1)for(const re of[w-s/4,w+s/4])ql(i,re,N-.006,l+a*.72,s/2-.08,t);x.push({bays:n.doorPairs??1,topY:o+r+.03,corniceFrontZ:l+a+.02,cx:w,minX:R+c,maxX:v-c,rows:Z,rowHeight:O-c,depth:a-c-.05,z:l+c+(a-c-.03)/2,frontZ:l+a-.03});const K=n.doorPairs??1,B=s/K;for(let re=1;re<K;re++)T(c,r,a,R+re*B,o+r/2,l+a/2,d);const $=B/2-.004,G=r-.01,ie=.018,le=[];for(let re=0;re<K;re++)le.push([R+re*B,1],[R+(re+1)*B,-1]);for(const[re,fe]of le){const ye=new St;ye.position.set(re+fe*.002,o+r/2,u+.008);const Xe=new pe(new Re($-ie,G-ie,.004),p);Xe.position.x=fe*$/2,Xe.renderOrder=2,ye.add(Xe);const me=(Y,he,ce,Se)=>{const He=new pe(new Re(Y,he,.014),m);He.position.set(ce,Se,0),ye.add(He)};me($,ie,fe*$/2,G/2-ie/2),me($,ie,fe*$/2,-G/2+ie/2),me(ie,G,fe*ie/2,0),me(ie,G,fe*($-ie/2),0);const ue=new pe(new F(.008,.008,.07,12),Br.steel());ue.position.set(fe*($-.04),-.12,.02),ye.add(ue),ye.userData.cupboardDoor=!0,ye.userData.open=!1,ye.userData.openAngle=-fe*1.7,i.add(ye),M.push(ye)}}return{doors:M,blockers:y,cabinets:x}}function Wh(i,e){const t=new St,n=new pe(new Or(i,.035,fi,3,.008),new _i({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));n.position.y=-.0175,n.castShadow=!0,n.receiveShadow=!0,t.add(n);const s=Wu(t,ms(),i,e,!1);return{group:t,parts:s}}function Dv(i,e=!1,t=1.8,n=1,s=!1){const r=Zi(512,512,(_,m,p)=>{_.fillStyle="#b9bec6",_.fillRect(0,0,m,p);for(let M=0;M<1200;M++)_.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,_.fillRect(Math.random()*m,Math.random()*p,3,3);_.strokeStyle="rgba(70,74,82,0.35)",_.lineWidth=3,_.strokeRect(0,0,m,p)});r.wrapS=r.wrapT=vn,r.repeat.set(12,12);const a=new pe(new $t(14,14),new X({map:r,roughness:.85}));a.rotation.x=-Math.PI/2,a.position.y=-Hn,a.receiveShadow=!0,i.add(a);const c=new pe(new $t(14,5),new X({color:15659250,roughness:.95}));c.position.set(0,1.6,-fi/2-.25),c.receiveShadow=!0,i.add(c);const o=Zi(256,256,(_,m,p)=>{_.fillStyle="#f7f8f9",_.fillRect(0,0,m,p),_.strokeStyle="#c9ced4",_.lineWidth=4,_.strokeRect(0,0,m,p)});o.wrapS=o.wrapT=vn,o.repeat.set(40,4);const l=new pe(new $t(6,.6),new X({map:o,roughness:.3,metalness:0}));l.position.set(0,.3,-fi/2-.249),s||i.add(l);const u=new pe(new Or(t,.035,fi,3,.008),new _i({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));u.position.y=-.0175,u.receiveShadow=!0,u.castShadow=!0,i.add(u);const f=ms();if(e)return Wu(i,f,t,n);const h=new pe(new Re(t-.06,Hn-.035,fi-.06),new X({map:f,roughness:.7}));h.position.y=-Hn/2-.0175,h.receiveShadow=!0,i.add(h);const d=new X({color:3877404,roughness:.8}),g=Br.steel();for(const _ of[-.6,0,.6]){const m=new pe(new Re(.004,Hn-.12,.002),d);m.position.set(_,-Hn/2-.02,(fi-.06)/2+.001),i.add(m)}for(const _ of[-.66,-.54,-.06,.06,.54,.66]){const m=new pe(new F(.006,.006,.1,12),g);m.position.set(_,-.2,(fi-.06)/2+.015),i.add(m)}return null}function Wu(i,e,t,n=1,s=!0){const r=t-.06,a=fi-.06,c=.018,o=-.035,l=-Hn,u=o-l,f=a/2,h=-a/2,d=new X({map:e,roughness:.7}),g=new X({color:2898509,roughness:.7}),_=Gu(),m=[],p=(B,$,G,ie,le,re,fe)=>{const ye=new pe(new Re(B,$,G),fe);return ye.position.set(ie,le,re),ye.castShadow=!0,i.add(ye),m.push(ye),ye},M=l+.06;p(c,u,a,-r/2+c/2,l+u/2,0,d),p(c,u,a,r/2-c/2,l+u/2,0,d),p(r,u,c,0,l+u/2,h+c/2,_),p(c,u,a-c,0,l+u/2,c/2,_),p(r,c,a,0,M-c/2,0,g),p(r,.06,c,0,l+.03,f-.03,d),p(r,.04,c,0,o-.02,f-c/2,d);const y=-.46,x=r/2-c*1.5;if(p(x,c,a-c,-r/4,y-c/2,c/2,g),p(x,c,a-c,r/4,y-c/2,c/2,g),s)for(const B of[-r/4,r/4])ql(i,B,o-.05,f-.12,x-.1,n,10),ql(i,B,y-c-.006,f-.12,x-.1,n,10);const E=o-.04,w=M-c,R=E-w-.002,v=r>2.2,T=(v?r/4:r/2)-.0025,P=new X({map:e,roughness:.65}),N=Br.steel(),O=[];(v?[[-r/2,1,1.95],[0,-1,1.5],[0,1,1.5],[r/2,-1,1.95]]:[[-r/2,1,1.95],[r/2,-1,1.95]]).forEach(([B,$,G],ie)=>{const le=new St;le.position.set(B+$*.001,(E+w)/2,f+c/2);const re=new pe(new Re(T,R,c),P);re.position.x=$*T/2,re.castShadow=!0,le.add(re);const fe=new pe(new F(.006,.006,.1,12),N);fe.position.set($*(T-.045),-.2-le.position.y,c/2+.015),le.add(fe);for(const ye of[fe.position.y-.05,fe.position.y+.05]){const Xe=new pe(new F(.004,.004,.016,8),N);Xe.rotation.x=Math.PI/2,Xe.position.set(fe.position.x,ye,c/2+.008),le.add(Xe)}le.userData.cupboardDoor=!0,le.userData.bay=v?ie<2?0:1:ie,le.userData.open=!1,le.userData.openAngle=-$*G,i.add(le),O.push(le)});const K=(B,$)=>({minX:B,maxX:$,levels:[M,y],frontZ:f-.02,backZ:h+c});return{doors:O,blockers:m,bays:[K(-r/2+c,-c/2),K(c/2,r/2-c)]}}function Lv(i){i.add(new Pu(14675967,6126138,.8));const e=new Xa(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function Nv(i){const e=Zi(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const u=60+Math.random()*70;a.fillStyle=`rgba(${u*.6},${u+40},${u*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=vn,e.repeat.set(80,80);const t=new pe(new $t(300,300),new X({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new pe(new $t(80,.1),new X({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new X({color:5980976,roughness:.9}),r=new X({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new pe(new F(.25,.35,3,8),s);l.position.set(c,1.5,o);const u=new pe(new Ft(2.2+a%3*.5,12,10),r);u.position.set(c,4.2+a%2,o),i.add(l,u)}}function ms(){return Zi(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function Zi(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Lr(n);return s.colorSpace=un,s.anisotropy=16,s}function Uv(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new Lr(s);o.colorSpace=un;const l=new Dn(new Ys({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const u=e/700*.73;return l.scale.set(u*l.userData.aspect,u,1),l}const Go=new I,Wo=new I;function Fv(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(Go).project(e),c.getWorldPosition(Wo).project(e);const o=Math.abs(Go.y-Wo.y)*t/2+Math.abs(Go.x-Wo.x)*t/2;s.visible=o>r*1.25})}const Br={steel:()=>new X({color:13094097,metalness:1,roughness:.28}),chrome:()=>new X({color:15133164,metalness:1,roughness:.12}),brass:()=>new X({color:13936715,metalness:1,roughness:.22}),castIron:()=>new X({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new X({color:1776928,roughness:.5}),glass:()=>new X({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},dt=(i=15857397)=>new _i({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:Zt,depthWrite:!1}),bn=i=>new X({color:i,roughness:.45,metalness:.15}),rt=(i=13094097)=>new X({color:i,roughness:.28,metalness:1}),gt=()=>new X({color:15133164,roughness:.12,metalness:1}),In=()=>new X({color:13936715,roughness:.22,metalness:1}),ut=i=>new X({color:i,roughness:.5,metalness:.05}),en=i=>new X({color:i,roughness:.35,metalness:.1}),Bn=()=>new X({color:10119233,roughness:.7});function Ea(i,e,t,n,s=!1){const r=i.distanceTo(e),a=s?new Re(t*2,r,t*2.6):new F(t,t*.8,r,12),c=new pe(a,n);return c.position.copy(i).add(e).multiplyScalar(.5),c.quaternion.setFromUnitVectors(new I(0,1,0),e.clone().sub(i).normalize()),c}const Xo=()=>new X({color:14278114,roughness:.3,metalness:.9}),Ne=(i,e,t,n=Math.min(i,e,t)*.12)=>new Or(i,e,t,3,n);function S(i,e,t=0,n=0,s=0){const r=new pe(i,e);return r.position.set(t,n,s),r}function Et(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Lr(n);return s.colorSpace=un,s.anisotropy=16,s}function Gi(i,e,t,n){const s=new St;return s.add(S(new F(.018,.022,.05,16),In(),0,.025,0)),s.add(S(new F(.026,.026,.03,16),ut(n),0,.06,0)),s.position.set(i,e,t),s}function kn(i,e,t,n=.55){const s=e*.85,r=new pe(new F(i*.9,i*.9,s,40),new X({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const Ov={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function Xh(i,e,t,n){const s=Ov[n.hazard],r=Et(512,256,(c,o,l)=>{c.fillStyle="#fffdf6",c.fillRect(0,0,o,l),c.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",c.fillRect(0,0,o,34),c.fillStyle="#ffffff",c.font="bold 24px sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),c.fillStyle="#111827";const u=String(n.display_name||"Reagent").split(" "),f=[];let h="";c.font="bold 40px sans-serif",u.forEach(g=>{const _=h?`${h} ${g}`:g;c.measureText(_).width>o-40&&h?(f.push(h),h=g):h=_}),f.push(h);const d=f.slice(0,2);d.forEach((g,_)=>c.fillText(g,o/2,(n.formula?86:110)+_*46-(d.length-1)*10)),n.formula&&(c.font="bold 54px serif",c.fillStyle="#1e3a8a",c.fillText(String(n.formula),o/2,212)),c.strokeStyle="#cbd5e1",c.lineWidth=4,c.strokeRect(2,2,o-4,l-4)}),a=S(new F(i,i,e,32,1,!0,-1.05,2.1),new X({map:r,roughness:.85,side:Zt}),0,t);return a.userData.role="reagent_label",a}function Ta(i,e,t,n){const s=Et(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let u=1;u<=l;u++){const f=o-u/(l+1)*o;a.fillRect(0,f,u%5===0?44:24,u%5===0?4:2)}}),r=new pe(new F(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new ds({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function Aa(i){const e=Et(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new Dn(new Ys({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function qh(i,e){return Et(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const u=c+l/50*o,f=l%10===0;t.lineWidth=f?4:1.5;const h=f?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(u)*h,r+Math.sin(u)*h),t.lineTo(s+Math.cos(u)*(a-16),r+Math.sin(u)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const u=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(u)*(a-82),r+Math.sin(u)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function Xu(i){return Et(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function qa(i,e="#22c55e"){return Et(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function qo(){return Et(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function Bv(){return Et(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const Yo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function kv(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[Yo[n],Yo[s],Yo[r],"#d4af37"]}class Zo extends ii{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new I){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function $o(i,e,t,n={}){const s=new St;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const u=[new J(0,.004),new J(.301,.004),new J(.315,.03),new J(.33949999999999997,.58),new J(.357,.6),new J(.364,.612)];r(new pe(new jn(u,48),dt()));const f=S(new zn(.045,.07,3),dt(),.35*1,.6-.015,0);f.rotation.z=-Math.PI/2,r(f,Ta(.35*.95,.06,.6*.72,4),kn(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const u=S(new F(.12,.12,.55,32,1,!0),dt(),0,.375),f=S(new Ft(.12,32,16,0,Math.PI*2,0,Math.PI/2),dt(),0,.1);f.rotation.x=Math.PI;const h=S(new Tt(.12*1.02,.012,10,32),dt(),0,.55+.1);h.rotation.x=Math.PI/2;const d=S(Ne(.34,.08,.34,.02),Bn(),0,.04);r(u,f,h,d,kn(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const u=S(new F(.06,.06,1.1,32,1,!0),dt(),0,.7000000000000001),f=S(new F(.06*1.25,.06*1.25,.1,24),dt(15660799),0,.1),h=S(Ne(.16,.03,.035,.012),ut(1920728),.09,.1),d=S(new F(.03,.01,.1,16,1,!0),dt(),0,.02),g=S(new F(.2,.22,.04,32),en(3099491),0,.02);r(u,f,h,d,g,Ta(.06,.2,1.1*.85,10),kn(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=S(new F(.018,.008,.3,16),dt(),0,.2),l=S(new Ft(.055,24,16),dt(),0,.42);l.scale.y=1.8;const u=S(new F(.018,.018,.3,16),dt(),0,.68),f=S(new Tt(.02,.003,6,20),new ds({color:1120295}),0,.74);f.rotation.x=Math.PI/2;const h=S(new Ft(.075,24,16),ut(12131356),0,.9);h.scale.y=1.25;const d=S(Ne(.22,.07,.18,.02),Bn(),0,.035);r(o,l,u,f,h,d);break}case"measuring_cylinder":{const u=S(new F(.18,.17099999999999999,.8,40,1,!0),dt(),0,.44),f=S(new F(.18*1.6,.18*1.7,.05,6),dt(15266293),0,.025),h=S(new zn(.035,.06,3),dt(),.18,.8+.03,0);h.rotation.z=-Math.PI/2,r(u,f,h,Ta(.18*.97,.12,.8*.8,5),kn(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new X({color:1920728,roughness:.45,metalness:.2}),l=[new J(0,.005),new J(.27,.005),new J(.272,.018),new J(.2,.05),new J(.11,.1),new J(.075,.13),new J(0,.13)],u=new pe(new jn(l,56),o),f=S(new F(.068,.07,.11,36),o,0,.175),h=Et(128,16,(v,T,P)=>{v.fillStyle="#d4d4d8",v.fillRect(0,0,T,P),v.fillStyle="#71717a";for(let N=0;N<T;N+=4)v.fillRect(N,0,1.5,P)});h.wrapS=vn,h.repeat.set(3,1);const d=S(new F(.052,.052,.075,40),new X({map:h,roughness:.3,metalness:1}),0,.268),g=S(new F(.066,.066,.03,6),gt(),0,.32),_=S(new F(.06,.06,.012,40),gt(),0,.341),m=S(new F(.048,.048,.28,36,1,!0),gt(),0,.485),p=S(new F(.042,.042,.004,28),new X({color:4144966,roughness:.8}),0,.6),M=S(new Tt(.046,.004,8,32),gt(),0,.625);M.rotation.x=Math.PI/2;const y=new St,x=S(new F(.032,.032,.2,24),gt(),0,.1);y.add(x);for(let v=0;v<3;v++)y.add(S(new F(.03,.036,.025,24),gt(),0,.215+v*.03));y.add(S(new F(.02,.02,.004,20),new X({color:2565930}),0,.29)),y.rotation.z=Math.PI/2+.12,y.position.set(-.05,.16,0),r(u,f,d,g,_,m,p,M,y);const E=n.flame==="on",w=S(new zn(.09,.3,24),new X({color:16751933,emissive:16738816,emissiveIntensity:E?1:0,transparent:!0,opacity:E?.75:0,depthWrite:!1}),0,.77);w.userData.role="flame";const R=S(new zn(.045,.16,16),new X({color:6333946,emissive:2450411,emissiveIntensity:E?1.3:0,transparent:!0,opacity:E?.85:0,depthWrite:!1}),0,.7);R.userData.role="flame",r(w,R);break}case"thermometer":{const o=Et(256,1690,(p,M,y)=>{p.fillStyle="#fbfbf8",p.fillRect(0,0,M,y),p.fillStyle="#0f172a",p.textAlign="left",p.textBaseline="middle";const x=y-250,E=y-400;for(let w=0;w<=100;w+=2){const R=x-w/100*E,v=w%10===0;p.fillRect(M-(v?90:50),R-(v?3:1.5),v?90:50,v?6:3),v&&(p.font=`900 ${w%50===0?62:52}px Arial, sans-serif`,p.fillText(String(w),10,R))}p.font="700 44px Arial, sans-serif",p.fillText("°C",14,x-E-70)}),l=S(Ne(.1,.66,.02,.008),new X({map:o,roughness:.5}),0,.45,-.025),u=S(new F(.022,.022,.62,24),dt(16777215),0,.45),f=S(new F(.008,.008,.45,12),new X({color:14427686,roughness:.2}),0,.32),h=S(new Ft(.05,24,24),new X({color:14427686,roughness:.2}),0,.1),d=S(new Ft(.065,24,24),dt(16777215),0,.1),g=S(Ne(.26,.04,.2,.015),en(3099491),0,.02);r(l,u,f,h,d,g);const _=p=>.78-(1440-p*12.9)/1690*.66;let m;for(const p of[0,25,50,75,100]){const M=Uv(`${p}°`,12,p%50===0?void 0:m);M.center.set(0,.5),M.position.set(.065,_(p),-.02),r(M),p%50===0&&(m=M)}break}case"battery":{const o=Et(512,256,(g,_,m)=>{g.fillStyle="#111827",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,_,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,_/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",_/2,m*.9)}),l=ut(2042167),u=S(Ne(.6,.3,.3,.035),[l,l,l,l,new X({map:o,roughness:.5}),l],0,.15),f=Gi(.2,.3,0,14427686),h=Gi(-.2,.3,0,1118481),d=new Dn(new Ys({map:Xu(n.voltage||6),depthTest:!1,transparent:!0}));d.scale.set(.34,.136,1),d.position.set(0,.58,0),d.renderOrder=9,d.userData.role="voltage",r(u,f,h,d);break}case"ruler":{const u=new X({color:15381256,roughness:.6}),f=new X({map:qo(),roughness:.55});r(S(new Re(1.5,.015,.16),[u,u,f,u,u,u],0,.0075));break}case"bulb":{const o=n.state==="on",l=S(new Ft(.18,32,32),new _i({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const u=S(new Tt(.05,.006,8,24,Math.PI*1.7),new X({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);u.rotation.x=Math.PI/2,u.userData.role="led";const f=S(new F(.095,.11,.16,24),In(),0,.12),h=new St;for(let g=0;g<5;g++){const _=S(new Tt(.1,.006,6,24),In(),0,.06+g*.028);_.rotation.x=Math.PI/2,h.add(_)}const d=S(Ne(.4,.04,.26,.015),Bn(),0,.02);r(l,u,f,h,d,Gi(-.15,.04,.07,14427686),Gi(.15,.04,.07,1118481));break}case"switch":{const o=S(Ne(.4,.06,.2,.012),Bn(),0,.03),l=S(new F(.02,.02,.1,16),In(),-.12,.11),u=S(Ne(.05,.06,.05,.008),In(),.12,.09),f=S(new F(.012,.012,.24,16),gt()),h=n.state==="closed";f.position.set(h?0:-.06,.16,0),f.rotation.z=h?Math.PI/2-.35:Math.PI/2-.9,f.userData.role="lever",f.add(S(new Ft(.028,16,12),ut(1118481),0,-.13,0)),r(o,l,u,f);break}case"resistor":{const o=Et(256,64,(g,_,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,_,m),kv(n.resistance_ohm).forEach((p,M)=>{g.fillStyle=p,g.fillRect(60+M*34+(M===3?22:0),0,16,m)})}),l=S(new F(.07,.07,.32,32),new X({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const u=S(new F(.01,.01,.52,10),rt(13948120),0,.2);u.rotation.z=Math.PI/2;const f=S(Ne(.6,.04,.2,.012),ut(15195332),0,.02),h=S(new F(.012,.012,.16,10),rt(13948120),-.26,.12),d=h.clone();d.position.x=.26,r(l,u,f,h,d);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=S(Ne(.42,.4,.18,.03),en(o?1981066:8330525),0,.2),u=S(new Tt(.155,.015,12,48),gt(),0,.2,.091),f=S(new Tn(.15,48),new X({map:qh(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),h=S(new zn(.012,.13,8),bn(14427686),.02,.2,.1);h.rotation.z=-Math.PI/2+.6,h.userData.role="needle";const d=S(new Ft(.014,12,12),rt(2565930),0,.2,.1);r(l,u,f,h,d,Gi(-.12,.4,0,14427686),Gi(.12,.4,0,1118481));break}case"microscope":{const o=en(15659250),l=en(2040616);r(S(Ne(.36,.06,.47,.02),o,0,.03,-.05)),r(S(Ne(.1,.28,.1,.02),o,0,.19,-.22));const u=new Sr([new I(0,.27,-.23),new I(0,.55,-.23),new I(0,.74,-.14),new I(0,.8,-.03)]);r(new pe(new ei(u,24,.044,12,!1),o));const f=S(new F(.035,.035,.01,24),new X({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);f.userData.role="led",r(S(new F(.045,.05,.05,24),l,0,.085),f),r(S(Ne(.3,.022,.28,.006),l,0,.32));for(const h of[-.08,.08])r(S(new Re(.016,.004,.11),gt(),h,.333,.03));r(S(new F(.036,.036,.25,24),l,0,.7)),r(S(new F(.025,.03,.11,24),l,0,.88)),r(S(new F(.056,.06,.033,32),gt(),0,.565)),[14427686,15381256,2450411].forEach((h,d)=>{const g=new St;g.position.y=.55,g.rotation.y=2*Math.PI*d/3;const _=new St;_.position.z=.03,_.rotation.x=.35,_.add(S(new F(.015,.012,.07+d*.015,16),gt(),0,-.04-d*.008)),_.add(S(new F(.0158,.0158,.008,16),ut(h),0,-.03)),g.add(_),r(g)});for(const h of[-1,1]){const d=S(new F(.05,.05,.028,24),l,h*.08,.25,-.22);d.rotation.z=Math.PI/2;const g=S(new F(.025,.025,.028,20),l,h*.11,.25,-.22);g.rotation.z=Math.PI/2,r(d,g)}break}case"lens":{const o=S(new Ft(.22,40,40),dt(15988991),0,.42);o.scale.set(1,1,.22);const l=S(new Tt(.22,.02,16,48),rt(10265519),0,.42),u=S(new F(.015,.015,.2,12),rt(),0,.1),f=S(new F(.12,.14,.03,32),en(3099491),0,.015);r(o,l,u,f);break}case"mirror":{const o=S(Ne(.4,.5,.02,.006),[rt(4674921),rt(4674921),rt(4674921),rt(4674921),new X({color:16777215,metalness:1,roughness:.03}),rt(4674921)],0,.3,0),l=S(Ne(.36,.06,.12,.012),Bn(),0,.03,-.02);r(o,l);break}case"biological_model":{const o=S(new Re(.5,.012,.18),dt(14742270),0,.006),l=S(new Re(.14,.003,.14),dt(15857397),0,.014),u=S(new Tn(.045,32),new X({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);u.rotation.x=-Math.PI/2;const f=S(new Re(.12,.014,.17),ut(16317180),-.18,.007);r(o,l,u,f);break}case"wire":{const o=new pe(new ei(new Zo(.12,.15,5),240,.012,8,!1),new X({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=S(new F(.135,.135,.14,24),ut(3621201),0,.08);r(l,o);break}case"water_container":{const u=S(new F(.255,.3,.75,48,1,!0),dt(),0,.375),f=S(new Tn(.3,48),dt(),0,.003);f.rotation.x=-Math.PI/2;const h=S(new Tt(.14,.02,12,32,Math.PI*1.3),dt(),.3*.85,.75*.6);h.rotation.z=Math.PI/2,r(u,f,h,kn(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),u=S(new F(.025,.025,l,24),rt(10265519),0,.025);u.rotation.z=Math.PI/2;const f=S(new Ft(.025,16,16),rt(7434618),-l/2,.025),h=f.clone();h.position.x=l/2,r(u,f,h);break}case"balance":{const o=S(Ne(.55,.1,.42,.03),en(15067115),0,.05),l=S(new F(.16,.16,.015,40),gt(),0,.11,.02),u=S(new F(.03,.03,.02,16),rt(),0,.1,.02),f=S(Ne(.3,.07,.05,.012),ut(2042167),0,.07,.2),h=new Dn(new Ys({map:qa("0.0 g"),depthTest:!1,transparent:!0}));h.scale.set(.3,.135,1),h.position.set(0,.24,.2),h.renderOrder=9,h.userData.role="balance_display",r(o,l,u,f,h);break}case"stopwatch":{const o=S(new F(.13,.13,.045,48),en(2042167),0,.16);o.rotation.x=Math.PI/2;const l=S(new Tt(.13,.01,10,48),gt(),0,.16),u=S(new F(.022,.022,.04,16),gt(),0,.305),f=S(new Tt(.025,.006,8,20),gt(),0,.34),h=S(Ne(.18,.03,.12,.01),ut(3621201),0,.015),d=new Dn(new Ys({map:qa("00:00.0"),depthTest:!1,transparent:!0}));d.scale.set(.2,.09,1),d.position.set(0,.16,.03),d.renderOrder=9,d.userData.role="stopwatch_display",r(o,l,u,f,h,d);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,u=o*.05,f=(o+l*1.6)*.05,h=new pe(new ei(new Zo(f,.05,22),440,.007,6,!1),new X({color:13094097,roughness:.25,metalness:1}));h.userData.role="spring_body",h.userData.naturalLengthUnits=u,h.userData.maxLengthUnits=f,h.scale.y=u/f,h.position.y=.85-f*h.scale.y/2;const d=S(new Tt(.03,.008,8,20),rt(7434618),0,.85),g=S(new F(.05,.05,.015,24),rt(5395035));g.userData.role="spring_hanger",g.position.y=.85-f*h.scale.y,r(h,d,g);break}case"retort_stand":{const o=en(3099491);r(S(Ne(.36,.035,.24,.012),o,0,.0175)),r(S(new F(.016,.016,.95,20),rt(),-.13,.5)),r(S(Ne(.07,.07,.07,.01),o,-.13,.9));const l=S(new F(.01,.01,.07,10),rt(),-.13,.9,.06);l.rotation.x=Math.PI/2;const u=S(new F(.012,.012,.3,16),rt(),.03,.9);u.rotation.z=Math.PI/2,r(l,u,S(Ne(.04,.05,.05,.008),In(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),u=.04+Math.min(.06,o/3e3),f=Et(256,256,(d,g)=>{d.fillStyle="#4a525c",d.fillRect(0,0,g,g),d.fillStyle="#1f2328",d.beginPath(),d.arc(g/2,g/2,22,0,Math.PI*2),d.fill(),d.fillRect(g/2-9,g/2,18,g/2),d.fillStyle="#f1f5f9",d.font="bold 58px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText(`${o}g`,g/2,g/2-62)}),h=en(4870748);h.metalness=.5,r(S(new F(l,l,u,36),[h,new X({map:f,metalness:.4,roughness:.5}),h],0,u/2));break}case"ray_box":{const o=n.state==="on",l=S(Ne(.35,.22,.28,.03),en(2042167),0,.11),u=S(new Re(.2,.16,.012),ut(988970),0,.11,.145),f=S(new Re(.02,.12,.02),new X({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);f.userData.role="led";const h=S(new F(.012,.012,.3,10),ut(1120295),0,.03,-.29);h.rotation.x=Math.PI/2,r(l,u,f,h);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(S(Ne(o,.1,.55,.01),dt(14676223),0,.05));break}case"projectile_launcher":{const o=new X({color:2962235,metalness:.6,roughness:.4});r(S(Ne(.5,.05,.36,.015),o,0,.025));for(const d of[-.09,.09])r(S(Ne(.1,.22,.02,.006),o,0,.14,d));const l=new St;l.position.y=.22,l.rotation.z=Math.PI/4;const u=S(new F(.05,.055,.45,28),new X({color:1920728,metalness:.5,roughness:.35}),.17,0);u.rotation.z=-Math.PI/2;const f=S(new Tt(.053,.011,12,28),gt(),.39,0);f.rotation.y=Math.PI/2;const h=S(new F(.018,.018,.22,16),rt());h.rotation.x=Math.PI/2,l.add(u,f,h),r(l);break}case"projectile":{r(S(new Tt(.05,.012,10,28),ut(3621201),0,.012)),r(S(new Ft(.07,32,20),new X({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=S(new F(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new X({map:Bv(),transparent:!0,opacity:.92,roughness:.3,side:Zt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,u=.62,f=.085,h=[new J(0,.004),new J(l*.96,.004),new J(l,.03),new J(f+.01,u*.7),new J(f,u*.76),new J(f,u-.02),new J(f+.012,u),new J(f+.012,u+.012)],d=o?new _i({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:Zt,depthWrite:!1}):dt();r(new pe(new jn(h,56),d));const g=Et(512,512,(y,x,E)=>{y.clearRect(0,0,x,E),y.fillStyle="#ffffff",y.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([R,v])=>{y.fillRect(x*.6,E*R,x*.13,5),y.font="bold 34px Arial",y.fillText(v,x*.76,E*R+12)}),y.fillRect(x*.63,E*.64,x*.07,4),y.font="bold 40px Arial",y.fillText("250 ml",x*.12,E*.52),y.fillRect(x*.14,E*.58,x*.2,E*.09),y.save(),y.translate(x*.56,E*.86),y.rotate(-Math.PI/2),y.font="bold 22px Arial",y.fillText("APPROX. VOL",0,0),y.restore()}),_=.03,m=u*.7,p=new pe(new jn([new J(l*1.006,_),new J((f+.01)*1.006,m)],24,-.75,1.5),new ds({map:g,transparent:!0,depthWrite:!1,side:Zt}));r(p);const M=new pe(new F(.11,l*.94,u*.66,48),new X({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));M.userData.role="liquid",M.userData.maxFillHeight=u*.66,M.scale.y=.001,r(M);break}case"round_bottom_flask":{const o=S(new Ft(.28,40,28),dt(),0,.36),l=S(new F(.07,.07,.34,28,1,!0),dt(),0,.78),u=S(new Tt(.2,.025,12,40),ut(3621201),0,.05);u.rotation.x=Math.PI/2;const f=new St;f.position.y=.14,f.add(kn(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,u,f);break}case"evaporating_dish":{const o=[new J(0,.01),new J(.12,.012),new J(.26,.09),new J(.3,.13)];r(new pe(new jn(o,48),new X({color:16317180,roughness:.25,side:Zt})));const l=new St;l.position.y=.012,l.add(kn(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=S(new Tt(.3,.02,12,48),rt(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const u=l/3*Math.PI*2,f=S(new F(.018,.018,.82,12),rt(5395035),Math.cos(u)*.34,.4,Math.sin(u)*.34);f.rotation.z=Math.cos(u)*-.08,f.rotation.x=Math.sin(u)*.08,r(f)}break}case"wire_gauze":{const o=Et(256,256,(l,u,f)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,u,f),l.strokeStyle="#4b5563",l.lineWidth=2;for(let h=0;h<u;h+=10)l.beginPath(),l.moveTo(h,0),l.lineTo(h,f),l.moveTo(0,h),l.lineTo(u,h),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(u/2,f/2,u*.28,0,Math.PI*2),l.fill()});r(S(new Re(.62,.008,.62),new X({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=S(new F(.26,.03,.32,40,1,!0),dt(),0,.52),l=S(new F(.025,.02,.32,20,1,!0),dt(),0,.2),u=S(new zn(.22,.27,32,1,!0),new X({color:16777215,roughness:.9,side:Zt}),0,.53);u.rotation.x=Math.PI,r(o,l,u);break}case"test_tube_rack":{const o=S(Ne(.9,.04,.24,.01),Bn(),0,.3),l=S(Ne(.9,.04,.24,.01),Bn(),0,.02),u=S(Ne(.04,.3,.24,.01),Bn(),-.43,.16),f=u.clone();f.position.x=.43,r(o,l,u,f);const h=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let d=0;d<4;d++){const g=-.3+d*.2;r(S(new F(.055,.055,.42,20,1,!0),dt(),g,.25)),r(S(new F(.05,.05,.12,20),new X({color:h[d],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=S(Ne(.32,.008,.05,.003),gt(),.16,.006),l=S(new Ft(.04,20,10,0,Math.PI*2,0,Math.PI/2),gt(),-.18,.04);l.rotation.x=Math.PI;const u=S(new F(.008,.008,.18,12),gt(),-.06,.008);u.rotation.z=Math.PI/2,r(o,l,u);break}case"wash_bottle":{const o=S(new F(.17,.18,.5,36),new X({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=S(new F(.07,.09,.08,24),ut(2450411),0,.54),u=S(new F(.012,.012,.3,10),ut(2450411),.08,.66);u.rotation.z=-.9,r(o,l,u,kn(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const u=[new J(0,.003),new J(.188,.003),new J(.2,.03),new J(.2,.56),new J(.16000000000000003,.64),new J(.07,.6900000000000001),new J(.065,.75),new J(.072,.76)];r(new pe(new jn(u,40),dt())),r(kn(.2*.97,.56,n.color||"#eef6f8",.78));const f=S(new F(.06,.055,.07,24),dt(15266031),0,.56+.22),h=S(new F(.09,.09,.035,28),dt(15266031),0,.56+.27);r(f,h,Xh(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(S(new F(.21,.21,.46,40,1,!0),dt(),0,.46/2+.005)),r(S(new F(.21,.21,.01,40),dt(),0,.005));const u=.46*.62,f=S(new F(.21*.95,.21*.95,u,40),new X({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,u/2+.01),h=S(new F(.21*1.04,.21*1.04,.07,40),ut(2042167),0,.46+.035);r(f,h,Xh(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=S(new F(.02,.008,.36,16),dt(),0,.24),l=S(new Ft(.045,20,14),ut(1120295),0,.46);l.scale.y=1.6;const u=S(new F(.1,.1,.22,28),new X({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,u);break}case"crucible":{const o=[new J(0,.005),new J(.08,.005),new J(.13,.2),new J(.14,.21)],l=new X({color:16119284,roughness:.3,side:Zt});r(new pe(new jn(o,40),l));const u=S(new F(.15,.15,.015,40),l,.32,.008),f=S(new Ft(.025,16,12),l,.32,.025);r(u,f);break}case"bar_magnet":{r(S(Ne(.3,.08,.1,.01),en(14427686),-.15,.04),S(Ne(.3,.08,.1,.01),en(1920728),.15,.04));const o=Aa("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=Aa("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(S(new F(.12,.12,.04,40),In(),0,.02)),r(S(new F(.105,.105,.002,40),new X({color:16777215}),0,.041));const o=new St,l=S(new zn(.018,.09,4),bn(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const u=S(new zn(.018,.09,4),bn(2042167),0,0,.045);u.rotation.x=Math.PI/2,o.add(l,u),o.position.y=.05,o.userData.role="needle",r(o,S(new F(.11,.11,.012,40),dt(),0,.06));break}case"prism":{const o=new Wi;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new Ai(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new pe(l,dt(14742270)));break}case"rheostat":{const o=new X({color:6054233,roughness:.75,metalness:.45}),l=new X({color:14925716,roughness:.6}),u=new X({color:1118481,roughness:.35}),f=.2,h=.79,d=Et(64,64,(y,x,E)=>{y.fillStyle="#1a1a1a",y.fillRect(0,0,x,E);for(let w=0;w<E;w+=4)y.fillStyle="#3a3a3a",y.fillRect(0,w,x,1),y.fillStyle="#050505",y.fillRect(0,w+2,x,1)});d.wrapS=d.wrapT=vn,d.repeat.set(1,18);const g=S(new F(.125,.125,1.24,48),new X({map:d,roughness:.4,metalness:.6}),0,f);g.rotation.z=Math.PI/2,r(g);for(const y of[-1,1]){const x=S(new F(.12,.12,.1,40),l,y*.67,f),E=S(new F(.129,.129,.035,40),gt(),y*.635,f),w=S(new F(.1,.1,.05,32),o,y*.745,f);for(const P of[x,E,w])P.rotation.z=Math.PI/2;r(x,E,w);const R=new Wi;R.moveTo(-.17,0),R.lineTo(.17,0),R.lineTo(.09,.42),R.lineTo(-.09,.42),R.closePath();const v=new Ai(R,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});v.translate(0,0,-.015);const T=new pe(v,o);T.rotation.y=Math.PI/2,T.position.x=y*h,r(T);for(const P of[-.2,.2]){const N=S(Ne(.1,.025,.09,.008),o,y*(h-y*.04),.0125,P),O=S(new F(.018,.018,.027,16),new X({color:2042167}),y*(h-y*.04),.0125,P);r(N,O)}r(S(Ne(.05,.03,.06,.006),gt(),y*.6,f-.15,.06)),r(S(new F(.014,.014,.02,12),rt(10265519),y*.6,f-.125,.06))}const _=(y,x,E,w)=>{const R=new St,v=S(new F(.012,.012,.04,12),In(),w*.02,0,0);v.rotation.z=Math.PI/2;const T=S(new F(.03,.03,.06,18),u,w*.065,0,0);T.rotation.z=Math.PI/2;for(let P=0;P<9;P++){const N=S(new Re(.06,.006,.006),u,w*.065,Math.cos(P*.7)*.03,Math.sin(P*.7)*.03);R.add(N)}return R.add(v,T),R.position.set(y,x,E),R};r(_(h+.02,.32,.03,1),_(h+.02,.1,.03,1),_(-h-.02,.2,.06,-1));const m=S(new F(.012,.016,.05,12),In(),h+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(S(new Re(h*2,.035,.035),gt(),0,.395,-.02));const p=new St,M=Et(128,128,(y,x,E)=>{y.fillStyle="#111111",y.fillRect(0,0,x,E),y.fillStyle="#e5e7eb",y.font="bold 26px Arial",y.textAlign="center",y.save(),y.translate(30,E/2),y.rotate(-Math.PI/2),y.fillText("11",0,-4),y.fillText("5",0,22),y.restore()});p.add(S(Ne(.13,.08,.13,.015),[u,u,new X({map:M,roughness:.35}),u,u,u],0,.41,-.01)),p.add(S(Ne(.12,.09,.05,.012),u,0,.34,.05));for(const y of[-.035,.025])p.add(S(new F(.017,.017,.006,20),gt(),.02,.453,y));p.position.x=.05,p.userData.role="slider",r(p);break}case"dry_cell":{const o=Et(512,256,(_,m,p)=>{_.fillStyle="#d61f26",_.fillRect(0,0,m,p),_.fillStyle="#f5c518",_.fillRect(0,0,m,10),_.fillRect(0,p-10,m,10);const M=m*.25;_.textAlign="center",_.font="italic bold 40px Georgia",_.fillStyle="#fde68a",_.fillText("Power Cell",M,52),_.fillStyle="#f59e0b",_.beginPath(),_.arc(M,118,40,0,Math.PI*2),_.fill(),_.fillStyle="#7c2d12",_.font="bold 44px Arial",_.fillText("+",M,134),_.fillStyle="#fde68a",_.font="bold 22px Arial",_.fillText("SUPER QUALITY",M,190),_.fillStyle="#ffffff",_.font="bold 24px Arial",_.fillText("BATTERY",M,218),_.fillText("1.5V",M,242),_.fillStyle="#fde68a",_.font="bold 30px Arial",_.fillText("1.5V  DRY CELL",m*.75,p/2+10)});o.wrapS=vn,o.offset.x=.25;const l=.09,u=.32,f=S(new F(l,l,u,48,1,!0),new X({map:o,roughness:.35}),0,u/2+.006),h=S(new F(l*.98,l*.98,.012,48),gt(),0,u+.006),d=S(new F(.03,.032,.025,24),gt(),0,u+.024),g=S(new F(l*.98,l*.98,.012,48),rt(10265519),0,.006);r(f,h,d,g);break}case"accumulator":{const o=Et(1024,768,(p,M,y)=>{p.fillStyle="#f8fafc",p.fillRect(0,0,M,y),p.fillStyle="#1d4ed8",p.strokeStyle="#1d4ed8",p.textAlign="center",p.font="bold 44px Arial",p.fillText("UPPER LEVEL",M/2,70),p.fillRect(M*.08,90,M*.84,6),p.fillText("LOWER LEVEL",M/2,170),p.fillRect(M*.08,190,M*.84,6),p.fillRect(M*.06,250,M*.88,12),p.fillRect(M*.06,280,M*.4,300),p.fillStyle="#ffffff",p.font="bold 120px Arial",p.fillText("12V",M*.26,440),p.font="bold 34px Arial",p.fillText("LEAD-ACID",M*.26,520),p.fillStyle="#1d4ed8",p.font="bold 110px Arial",p.fillText("NS60",M*.7,400),p.font="bold 56px Arial",p.fillText("12V / 45AH",M*.7,480),p.font="bold 34px Arial",p.fillText("ACCUMULATOR",M*.7,545),p.fillRect(M*.06,600,M*.88,10)}),l=new X({color:15857145,roughness:.55}),u=new X({color:1920728,roughness:.4}),f=S(Ne(.9,.62,.55,.03),[l,l,l,l,new X({map:o,roughness:.5}),l],0,.31),h=S(Ne(.94,.09,.59,.025),u,0,.665),d=S(Ne(.96,.03,.61,.01),u,0,.625),g=S(Ne(.16,.055,.03,.008),u,0,.66,.3);r(f,h,d,g);const _=new X({color:16436245,roughness:.45});for(let p=0;p<6;p++){const M=-.35+p*.14;r(S(new F(.045,.045,.02,24),u,M,.72,-.12)),r(S(new F(.036,.04,.05,8),_,M,.75,-.12)),r(S(new F(.026,.026,.012,16),_,M,.781,-.12))}const m=new X({color:9146260,roughness:.5,metalness:.7});for(const[p,M]of[[-.38,"+"],[.38,"-"]]){r(S(new F(.06,.06,.03,28),u,p,.725,.12)),r(S(new F(.026,.032,.09,20),m,p,.785,.12));const y=Aa(M);y.scale.set(.16,.035,1),y.position.set(p,.86,.12),r(y)}break}case"potentiometer":{const o=new X({color:13222799,roughness:.35,metalness:.9}),l=rt(12107462),u=new X({color:10108695,roughness:.55}),f=.12;r(S(new F(f,f,.09,48),o,0,.045));const h=new Wi;h.absarc(0,0,f*1.02,Math.PI*.05,Math.PI*.95,!0),h.lineTo(-f*1.05,f*.6),h.lineTo(f*1.05,f*.6);const d=new Ai(h,{depth:.012,bevelEnabled:!1}),g=S(d,u,0,.102,0);g.rotation.x=Math.PI/2,r(g),r(S(Ne(.2,.012,.14,.004),l,0,.114,-.02)),r(S(new F(.045,.045,.008,32),In(),0,.124));const _=S(new F(.05,.05,.03,6),o,0,.143);r(_),r(S(new F(.03,.03,.06,24),l,0,.16));for(let p=0;p<4;p++){const M=S(new Tt(.031,.004,6,24),l,0,.14+p*.012);M.rotation.x=Math.PI/2,r(M)}const m=S(new F(.024,.024,.2,24),l,0,.29);m.userData.role="lever",r(m,S(new Ft(.024,20,10,0,Math.PI*2,0,Math.PI/2),l,0,.39)),r(S(new Re(.02,.06,.012),l,-.08,.15,-.07));for(const p of[-.07,0,.07]){const M=S(new Re(.03,.08,.004),l,p,.07,f*.66),y=S(new Tt(.012,.005,8,16),l,p,.035,f*.66);r(M,y)}break}case"metre_bridge":{r(S(Ne(5.5,.08,.5,.01),new X({color:11561522,roughness:.6}),0,.04));const u=Et(2048,96,(p,M,y)=>{p.fillStyle="#f6d58a",p.fillRect(0,0,M,y),p.fillStyle="#1f2937",p.strokeStyle="#1f2937",p.font="bold 22px Arial",p.textAlign="center";for(let x=0;x<=100;x++){const E=24+x/100*(M-48),w=x%10===0;p.lineWidth=w?3:1.4,p.beginPath(),p.moveTo(E,0),p.lineTo(E,w?46:x%5===0?34:22),p.stroke(),w&&p.fillText(String(x),E,76)}}),f=S(new $t(5,.14),new X({map:u,roughness:.6}),0,.081,.12);f.rotation.x=-Math.PI/2,r(f);const h=en(14212579);r(S(new Re(.85,.012,.07),h,-2.1,.086,-.15)),r(S(new Re(.07,.012,.32),h,-2.5,.086,0)),r(S(new Re(.85,.012,.07),h,2.1,.086,-.15)),r(S(new Re(.07,.012,.32),h,2.5,.086,0)),r(S(new Re(2.6,.012,.07),h,0,.086,-.15));const d=S(new F(.004,.004,5,8),gt(),0,.1,.06);d.rotation.z=Math.PI/2,r(d);const g=ut(16436245);for(const[p,M]of[[-2.5,.13],[-2.4,-.15],[-1.75,-.15],[-1.2,-.15],[0,-.15],[1.2,-.15],[1.75,-.15],[2.4,-.15],[2.5,.13]])r(S(new F(.03,.035,.08,16),g,p,.13,M)),r(S(new F(.012,.012,.03,10),In(),p,.185,M));const _=S(new F(.03,.035,.28,16),ut(1120295),-.9,.16,.03);_.rotation.z=Math.PI/2.4;const m=S(new zn(.012,.05,8),gt(),-.79,.11,.05);r(_,m);for(const p of[-2.55,2.55])for(const M of[-.2,.2])r(S(new F(.03,.03,.02,12),ut(1120295),p,-.005,M));break}case"optical_pyrometer":{const o=new X({color:2040099,roughness:.8}),l=gt(),u=new X({color:9067051,roughness:.7});r(S(new F(.3,.3,1.3,40),o,0,.65,-.32)),r(S(new F(.31,.31,.08,40),o,0,1.33,-.32));for(const m of[.45,1.05]){const p=S(new Tt(.305,.012,6,48),u,0,m,-.32);p.rotation.x=Math.PI/2,p.scale.z=2.2,r(p)}r(S(new F(.2,.2,.95,40),o,0,.5,.05)),r(S(new F(.205,.205,.06,40),l,0,.03,.05));const f=Et(512,128,(m,p,M)=>{m.fillStyle="#d6d9dc",m.fillRect(0,0,p,M),m.fillStyle="#f5f2e6",m.fillRect(150,18,210,92),m.strokeStyle="#374151",m.strokeRect(150,18,210,92),m.fillStyle="#14532d",m.font="italic bold 44px Georgia",m.fillText("Pyro",200,72),m.font="14px Arial",m.fillStyle="#111827";for(let y=0;y<9;y++)m.fillRect(160+y*22,98,2,8)});f.wrapS=vn,f.offset.x=.5,r(S(new F(.203,.203,.16,40,1,!0),new X({map:f,roughness:.3,metalness:.5}),0,.72,.05));const h=S(new Tt(.07,.015,10,32),l,0,.42,.25),d=S(new F(.05,.05,.02,24),o,0,.42,.25);d.rotation.x=Math.PI/2,r(h,d);const g=[new J(.06,0),new J(.065,.04),new J(.1,.11),new J(.095,.12)],_=new pe(new jn(g,32),new X({color:2829616,roughness:.9,side:Zt}));_.position.set(0,1.05,.05),_.rotation.x=-.2,r(S(new F(.07,.08,.1,24),o,0,1,.05),_),r(S(new Re(.03,.1,.03),l,.2,.82,.05));break}case"power_transistor":{const o=new X({color:1579035,roughness:.55}),l=rt(14278114),u=.5;for(const m of[-.1,0,.1])r(S(new Re(.03,u,.012),l,m,u/2,0)),r(S(new Re(.05,.06,.014),l,m,u+.02,0));const f=S(Ne(.4,.36,.18,.015),o,0,u+.2,.02);r(f);const h=Et(256,224,(m,p,M)=>{m.fillStyle="#18181b",m.fillRect(0,0,p,M),m.fillStyle="#e5e7eb",m.font="bold 48px Arial",m.textAlign="center",m.fillText("TIP122G",p/2,90),m.font="bold 40px Arial",m.fillText("AFN39",p/2,150),m.beginPath(),m.arc(40,40,18,0,Math.PI*2),m.lineWidth=4,m.strokeStyle="#e5e7eb",m.stroke()});r(S(new $t(.38,.33),new X({map:h,roughness:.6}),0,u+.2,.111));const d=new Wi;d.moveTo(-.2,0),d.lineTo(.2,0),d.lineTo(.2,.34),d.lineTo(-.2,.34),d.lineTo(-.2,0);const g=new kl;g.absarc(0,.26,.06,0,Math.PI*2,!1),d.holes.push(g);const _=S(new Ai(d,{depth:.05,bevelEnabled:!1}),l,0,u+.2,-.07);r(_);break}case"capacitor":{const f=Et(1024,512,(h,d,g)=>{h.fillStyle="#38bdf8",h.fillRect(0,0,d,g),h.fillStyle="#0f172a",h.fillRect(d*.62,0,d*.16,g),h.fillStyle="#38bdf8";for(let _=60;_<g;_+=130)h.fillRect(d*.66,_,d*.08,18);h.fillStyle="#0f172a",h.save(),h.translate(d*.3,g/2),h.rotate(-Math.PI/2),h.textAlign="center",h.font="bold 84px Arial",h.fillText("2200 µF",0,-40),h.font="bold 64px Arial",h.fillText("16 V",0,40),h.font="italic 44px Georgia",h.fillText("Robicon®  -40+85°C",0,110),h.restore()});f.wrapS=vn,f.offset.x=.3,r(S(new F(.26,.26,.95,48),new X({map:f,roughness:.4}),0,.35+.95/2)),r(S(new F(.26*.94,.26*.94,.012,48),rt(13751771),0,.35+.95+.002)),r(S(new F(.26*.94,.26*.94,.02,48),ut(1120295),0,.35-.005));for(const h of[-.09,.09])r(S(new F(.008,.008,.35,8),Xo(),h,.35/2,0));break}case"transformer":{const o=new X({color:5988456,roughness:.55,metalness:.4}),l=.9,u=.95,f=.42,h=.24;r(S(new Re(l,h*.8,f),o,0,h*.4)),r(S(new Re(l,h*.8,f),o,0,u-h*.4));for(const M of[-.66/2,(l-h)/2])r(S(new Re(h,u,f),o,M,u/2));const d=Et(256,256,(M,y,x)=>{M.fillStyle="#5b6068",M.fillRect(0,0,y,x),M.strokeStyle="rgba(0,0,0,0.25)";for(let E=0;E<x;E+=6)M.beginPath(),M.moveTo(0,E),M.lineTo(y,E),M.stroke()});for(const M of[f/2+.001,-f/2-.001]){const y=S(new $t(l,u),new X({map:d,roughness:.55,metalness:.4,transparent:!0,opacity:.5}),0,u/2,M);M<0&&(y.rotation.y=Math.PI),r(y)}const g=Et(64,512,(M,y,x)=>{for(let E=0;E<x;E+=8){const w=M.createLinearGradient(0,E,0,E+8);w.addColorStop(0,"#7c2d12"),w.addColorStop(.5,"#e07a3f"),w.addColorStop(1,"#7c2d12"),M.fillStyle=w,M.fillRect(0,E,y,8)}});g.wrapS=g.wrapT=vn,g.repeat.set(4,1);const _=new X({map:g,roughness:.3,metalness:.75}),m=ut(15987958);for(const M of[-.66/2,(l-h)/2]){r(S(Ne(h+.22,u-h*1.7,f+.18,.08),_,M,u/2));for(const y of[h*.85,u-h*.85])r(S(Ne(h+.26,.02,f+.22,.006),m,M,y))}const p=(M,y)=>{const x=S(new F(.015,.015,.5,10),ut(M),l/2+.25,y,0);return x.rotation.z=Math.PI/2,x};r(p(14427686,u*.62),p(2450411,u*.38));break}case"twin_flex_wire":{const o=l=>{const u=[];for(let d=0;d<=900;d++){const g=d/900,_=g*5*Math.PI*2,m=.55+.05*Math.sin(_*.7)+.03*Math.sin(_*2.3),p=.04+.018*Math.sin(_*1.3)+g*.05,M=_*9+l,y=.016;u.push(new I((m+y*Math.cos(M))*Math.cos(_),p+y*Math.sin(M),(m+y*Math.cos(M))*Math.sin(_)*.85))}return new Sr(u)};r(S(new ei(o(0),1400,.014,8,!1),ut(14427686))),r(S(new ei(o(Math.PI),1400,.014,8,!1),ut(1120295)));break}case"toroid_inductor":{const u=S(new Tt(.3,.1,24,64),new X({color:15920326,roughness:.6}),0,.12000000000000001);u.rotation.x=Math.PI/2,r(u);const f=new X({color:12735786,roughness:.3,metalness:.8}),h=44;for(let d=0;d<h;d++){const g=d/h*Math.PI*2,_=S(new Tt(.1+.014,.012,6,20),f,Math.cos(g)*.3,.1+.02,Math.sin(g)*.3);_.rotation.y=-g,r(_)}for(const d of[-.05,.05]){const g=S(new F(.008,.008,.45,8),Xo(),.6,.16,d);g.rotation.z=Math.PI/2,r(g)}break}case"micrometer":{const o=gt(),l=rt(13620184),u=new Wi;u.moveTo(-.32,.22),u.lineTo(-.32,0),u.absarc(0,0,.32,Math.PI,Math.PI*2,!1),u.lineTo(.32,.22),u.lineTo(.2,.22),u.lineTo(.2,0),u.absarc(0,0,.2,0,Math.PI,!0),u.lineTo(-.2,.22),u.lineTo(-.32,.22);const f=S(new Ai(u,{depth:.07,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:2}),l,0,.33,-.035);r(f);const h=Et(256,128,(y,x,E)=>{y.fillStyle="#cfd3d8",y.fillRect(0,0,x,E),y.fillStyle="#111827",y.font="bold 34px Arial",y.textAlign="center",y.fillText("0-25mm",x/2,52),y.fillText("0.01",x/2,98)});r(S(new $t(.2,.1),new X({map:h,roughness:.5,metalness:.4}),0,.07,.045));const d=.5,g=(y,x,E)=>{const w=S(y,x,E,d,0);return w.rotation.z=Math.PI/2,w};r(g(new F(.035,.035,.06,20),o,-.17)),r(g(new F(.03,.03,.32,20),o,.04)),r(g(new F(.06,.06,.12,24),l,.26));const _=Et(256,512,(y,x,E)=>{y.fillStyle="#d8dce0",y.fillRect(0,0,x,E),y.fillStyle="#111827";const w=x*.5;y.fillRect(w-1,0,3,E),y.font="bold 18px Arial";for(let R=0;R<=25;R++){const v=12+R*19;y.fillRect(w-22,v,22,2),R<25&&y.fillRect(w+1,v+9,16,2),R%5===0&&(y.save(),y.translate(w-30,v),y.rotate(-Math.PI/2),y.fillText(String(R),-6,0),y.restore())}});_.wrapS=vn,_.offset.x=.25;const m=g(new F(.05,.05,.4,32),new X({map:_,roughness:.35,metalness:.6}),.52);r(m);const p=Et(512,64,(y,x,E)=>{y.fillStyle="#d8dce0",y.fillRect(0,0,x,E),y.fillStyle="#111827";for(let w=0;w<50;w++)y.fillRect(w*(x/50),0,2,w%5===0?30:18)});r(g(new F(.07,.075,.1,40),new X({map:p,roughness:.35,metalness:.6}),.68));const M=Et(128,128,(y,x,E)=>{y.fillStyle="#9aa0a6",y.fillRect(0,0,x,E),y.strokeStyle="#4b5563";for(let w=-E;w<x;w+=8)y.beginPath(),y.moveTo(w,0),y.lineTo(w+E,E),y.stroke(),y.beginPath(),y.moveTo(w+E,0),y.lineTo(w,E),y.stroke()});M.wrapS=M.wrapT=vn,M.repeat.set(6,2),r(g(new F(.075,.075,.24,40),new X({map:M,roughness:.5,metalness:.7}),.85)),r(g(new F(.035,.035,.08,20),o,1.01)),r(g(new F(.055,.055,.08,24,1),new X({map:M,roughness:.5,metalness:.7}),1.09));break}case"vernier_caliper":{const o=rt(14014942),l=new St,u=1.8,f=.14,h=.025,d=Et(2048,128,(M,y,x)=>{M.fillStyle="#e5e7eb",M.fillRect(0,0,y,x),M.fillStyle="#111827",M.textAlign="center",M.font="bold 26px Arial";const E=150,w=200,R=(y-w-60)/E;for(let v=0;v<=E;v++){const T=w+v*R,P=v%10===0?50:v%5===0?38:26;M.fillRect(T,x-P,2,P),v%10===0&&M.fillText(String(v/10),T,x-60)}}),g=S(new Re(u,f,h),[o,o,o,o,new X({map:d,roughness:.4,metalness:.6}),o],0,0,0);l.add(g),l.add(S(new Re(.16,.42,h),o,-u/2+.08,-.27,0)),l.add(S(new Re(.06,.16,h*.6),o,-u/2+.12,.15,0));const _=-u/2+.5,m=Et(512,96,(M,y,x)=>{M.fillStyle="#cbd0d6",M.fillRect(0,0,y,x),M.fillStyle="#111827",M.font="bold 20px Arial",M.textAlign="center";for(let E=0;E<=50;E++){const w=40+E*8.6,R=E%10===0?34:E%5===0?26:18;M.fillRect(w,0,2,R),E%10===0&&M.fillText(String(E/2),w,60)}M.font="16px Arial",M.fillText("0.02 mm",440,86)});l.add(S(new Re(.5,f+.08,h+.02),[o,o,o,o,new X({map:m,roughness:.4,metalness:.6}),o],_+.2,-.01,.005)),l.add(S(new Re(.14,.42,h),o,_+.02,-.27,0)),l.add(S(new Re(.06,.16,h*.6),o,_-.02,.15,0)),l.add(S(new F(.03,.03,.05,16),o,_+.2,f/2+.065,0));const p=S(new F(.045,.045,.03,20),o,_+.35,-f/2-.05,0);p.rotation.x=Math.PI/2,l.add(p),l.add(S(new Re(.2,.02,.012),o,u/2+.1,-.03,0)),l.rotation.x=-Math.PI/2,l.position.y=h/2+.012,r(l);break}case"tape_measure":{const o=ut(16436245),l=new X({color:2042167,roughness:.85}),u=new St,f=S(new F(.17,.17,.12,40),o,0,0,0);f.rotation.x=Math.PI/2;const h=S(new Tt(.17,.03,10,40,Math.PI*1.25),l,0,0,0);h.rotation.z=Math.PI*.6;const d=h.clone();d.position.z=-.045,h.position.z=.045;const g=S(Ne(.14,.1,.14,.02),l,.13,-.11,0),_=S(Ne(.06,.04,.05,.01),o,.05,.19,0),m=S(Ne(.12,.16,.012,.004),gt(),0,0,-.068);u.add(f,h,d,g,_,m),u.position.set(0,.18,0),r(u);const p=Et(1024,64,(x,E,w)=>{x.fillStyle="#facc15",x.fillRect(0,0,E,w),x.fillStyle="#111827",x.font="bold 30px Arial";for(let R=0;R<=40;R++){const v=20+R*24.5;x.fillRect(v,0,2,R%10===0?30:R%5===0?22:14),R%10===0&&R>0&&x.fillText(String(R/10),v+4,58)}x.fillStyle="#dc2626",x.font="bold 20px Arial",x.fillText("25ft",470,58)}),M=S(new Re(.9,.004,.08),[ut(15381256),ut(15381256),new X({map:p,roughness:.4}),ut(15381256),ut(15381256),ut(15381256)],-.42,.02,0),y=S(new Re(.012,.05,.09),gt(),-.87,.035,0);r(M,y);break}case"triple_beam_balance":{const o=new X({color:14205861,roughness:.5}),l=gt();r(S(Ne(1.5,.1,.36,.03),o,.1,.05)),r(S(Ne(.3,.18,.3,.04),o,-.45,.17)),r(S(Ne(.12,.42,.14,.02),o,.78,.31)),r(S(new F(.03,.03,.1,12),l,-.45,.31)),r(S(new F(.28,.27,.02,48),l,-.45,.37));const u=g=>Et(1024,48,(_,m,p)=>{_.fillStyle="#f8fafc",_.fillRect(0,0,m,p),_.fillStyle="#111827",_.font="16px Arial";for(let M=0;M<=50;M++){const y=10+M*19.6;_.fillRect(y,0,2,M%10===0?22:M%5===0?16:10),M%10===0&&_.fillText(String(M/50*g),y-6,42)}}),f=[.46,.4,.34],h=[10,500,100];f.forEach((g,_)=>{const m=S(new Re(1,.045,.02),[l,l,l,l,new X({map:u(h[_]),roughness:.4}),l],.22,g,0);r(m),r(S(Ne(.05,.06,.05,.008),o,-.15+_*.12,g+.005,.01))}),r(S(new Re(.18,.04,.06),l,-.25,.4,0)),r(S(new Re(.1,.01,.01),bn(1120295),.76,.42,.075)),r(S(new Re(.004,.08,.004),bn(14427686),.74,.42,.075));for(const[g,_]of[[-.1,.07],[.15,.06],[.38,.05]]){const m=S(new F(_*.8,_,.18,24),o,g,.17,.05);m.rotation.z=Math.PI/2,r(m)}const d=Et(256,96,(g,_,m)=>{g.fillStyle="#fff",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,56,_,40),g.fillStyle="#111827",g.font="bold 22px Arial",g.textAlign="center",g.fillText("TRIPLE BEAM BALANCE",_/2,34)});r(S(new $t(.22,.08),new X({map:d}),-.45,.17,.152));break}case"carbon_resistor":{const o=new X({color:14203276,roughness:.35}),l=[new J(.001,-.3),new J(.07,-.3),new J(.1,-.26),new J(.1,-.14),new J(.085,-.1),new J(.085,.1),new J(.1,.14),new J(.1,.26),new J(.07,.3),new J(.001,.3)],u=new pe(new jn(l,40),o);u.rotation.z=Math.PI/2,u.position.y=.12,r(u),[[-.19,7027231,.103],[-.07,1118481,.088],[.03,14427686,.088],[.2,13934615,.103]].forEach(([h,d,g])=>{const _=S(new F(g,g,.04,40),new X({color:d,roughness:d===13934615?.3:.4,metalness:d===13934615?.7:0}),h,.12,0);_.rotation.z=Math.PI/2,r(_)});for(const h of[-.55,.55]){const d=S(new F(.012,.012,.5,10),Xo(),h,.12,0);d.rotation.z=Math.PI/2,r(d)}break}case"antique_telescope":{const o=In(),l=Et(512,256,(h,d,g)=>{h.fillStyle="#d9c39b",h.fillRect(0,0,d,g);for(let _=0;_<1500;_++)h.fillStyle=`rgba(110,70,30,${Math.random()*.08})`,h.fillRect(Math.random()*d,Math.random()*g,3,3);h.strokeStyle="rgba(90,60,30,0.35)",h.lineWidth=1;for(let _=0;_<12;_++)h.beginPath(),h.arc(Math.random()*d,Math.random()*g,20+Math.random()*60,0,Math.PI),h.stroke();h.fillStyle="rgba(160,60,40,0.25)",h.fillRect(40,0,120,g)}),u=new X({color:9063202,roughness:.6});r(S(new F(.2,.22,.06,32),u,0,.62));for(let h=0;h<3;h++){const d=h/3*Math.PI*2+Math.PI/2;r(Ea(new I(Math.cos(d)*.15,.6,Math.sin(d)*.15),new I(Math.cos(d)*.36,0,Math.sin(d)*.36),.03,u,!0))}r(S(new F(.12,.12,.03,24),u,0,.25)),r(S(new F(.04,.05,.12,16),o,0,.71));const f=new St;f.position.set(0,.86,0),f.rotation.z=.42,f.add(S(new F(.12,.12,1.1,40),new X({map:l,roughness:.75}),0,0,0));for(const h of[-.42,-.1,.25,.5])f.add(S(new F(.125,.125,.04,40),o,0,h,0));f.add(S(new F(.135,.13,.09,40),rt(10265519),0,.58,0)),f.add(S(new F(.11,.12,.08,32),o,0,-.59,0)),f.add(S(new F(.03,.04,.14,16),o,0,-.68,0));for(const h of[-.1,.1])f.add(S(new F(.02,.02,.1,12),o,.13,-.45,h));f.rotation.order="ZYX",f.rotation.z=-Math.PI/2+.42,r(f);break}case"telescope":{const o=new X({color:1120295,roughness:.5}),l=rt(13751771),u=.75;for(let _=0;_<3;_++){const m=_/3*Math.PI*2+Math.PI/2;r(Ea(new I(Math.cos(m)*.05,u,Math.sin(m)*.05),new I(Math.cos(m)*.38,0,Math.sin(m)*.38),.016,l))}r(S(new F(.12,.12,.012,3),o,0,.3)),r(S(new F(.08,.09,.06,24),o,0,u)),r(S(Ne(.08,.14,.08,.01),o,0,u+.1));const f=new St;f.position.set(0,u+.22,0),f.rotation.z=Math.PI/2-.25,f.add(S(new F(.09,.09,.7,40),new X({color:15068659,roughness:.3}),0,0,0)),f.add(S(new F(.11,.1,.22,40,1,!0),o,0,-.44,0));const h=S(new Tn(.095,32),new _i({color:9684477,roughness:.05,metalness:.3,clearcoat:1}),0,-.38,0);h.rotation.x=Math.PI/2,f.add(h),f.add(S(new F(.05,.06,.12,24),o,0,.41,0)),f.add(S(new Re(.07,.07,.07),o,0,.5,0));const d=S(new F(.028,.028,.12,16),o,.08,.5,0);d.rotation.z=Math.PI/2;const g=S(new F(.03,.03,.03,16),new X({color:15987958}),.15,.5,0);g.rotation.z=Math.PI/2,f.add(d,g),r(f);break}case"sct_telescope":{const o=new X({color:3104155,roughness:.45,metalness:.2}),l=new X({color:15987958,roughness:.35}),u=new X({color:1120295,roughness:.7,side:Zt});r(S(new F(.22,.25,.14,40),o,0,.07)),r(S(Ne(.5,.08,.2,.03),o,0,.2));for(const m of[-.24,.24]){r(Ea(new I(m*.9,.22,0),new I(m,.72,0),.04,o,!0));const p=S(new F(.1,.1,.03,32),o,m*1.08,.72,0);p.rotation.z=Math.PI/2,r(p)}const f=new St;f.position.set(0,.72,0),f.rotation.x=-.35,f.add(S(new F(.2,.2,.75,48,1,!0,Math.PI*.68,Math.PI*1.3),l,0,.15,0)),f.add(S(new F(.195,.195,.75,48,1,!0,Math.PI*.68,Math.PI*1.3),u,0,.15,0)),f.add(S(new Tt(.2,.025,10,48),o,0,.53,0).rotateX(Math.PI/2)),f.add(S(new F(.21,.21,.06,48),o,0,-.24,0));const h=S(new Tn(.19,40),dt(14412542),0,.52,0);h.rotation.x=-Math.PI/2,f.add(h),f.add(S(new F(.05,.05,.03,24),u,0,.5,0)),f.add(S(new F(.17,.17,.03,40),new X({color:15067115,metalness:1,roughness:.05}),0,-.16,0)),f.add(S(new F(.035,.035,.25,20),u,0,-.02,0)),f.add(S(new F(.03,.03,.1,16),u,0,-.32,0));const d=S(new F(.025,.025,.1,16),u,0,-.38,.05);d.rotation.x=Math.PI/2,f.add(d);const g=S(new F(.03,.03,.3,20),l,.27,.1,0);f.add(g,S(new F(.02,.02,.08,12),u,.27,-.08,0)),r(f);const _=S(new F(.22,.22,.06,40,1,!0),o,-.55,.03,.2);r(_,S(new Tn(.22,40),o,-.55,.002,.2).rotateX(-Math.PI/2));break}case"flow_calorimeter":{const o=new X({color:10119742,roughness:.65});r(S(Ne(1.6,.05,.45,.01),o,0,.025));for(const h of[-.45,.35])r(S(Ne(.16,.2,.14,.01),Bn(),h,.15,-.04));const l=new St;l.position.set(0,.32,-.04);const u=S(new F(.06,.06,1.25,32,1,!0),dt(),0,0,0);u.rotation.z=Math.PI/2,l.add(u);const f=S(new F(.012,.012,.8,10),new X({color:4937059,metalness:.8,roughness:.4}),-.05,0,0);f.rotation.z=Math.PI/2,l.add(f);for(let h=0;h<40;h++){const d=S(new Tt(.016,.004,4,10),rt(10265519),-.45+h*.02,0,0);d.rotation.y=Math.PI/2,l.add(d)}for(const h of[-.65,.65]){const d=S(new F(.07,.065,.06,24),new X({color:12730636,roughness:.8}),h,0,0);d.rotation.z=Math.PI/2,l.add(d)}for(const h of[-.55,.55])l.add(S(new F(.015,.015,.1,12),dt(),h,.1,0));for(const h of[-.45,.35]){const d=S(new Tt(.065,.008,6,24,Math.PI),ut(15067115),h,-.005,0);d.rotation.y=Math.PI/2,l.add(d)}r(l);for(const h of[.5,.62])r(S(new F(.025,.03,.06,16),rt(12107462),h,.08,.14));r(S(new ei(new Sr([new I(.69,.32,-.04),new I(.75,.25,.05),new I(.62,.11,.14)]),20,.008,6),ut(2450411))),r(S(new ei(new Sr([new I(.69,.33,-.04),new I(.62,.25,.05),new I(.5,.11,.14)]),20,.008,6),ut(15381256)));break}case"sonometer":{const o=new X({map:Et(512,64,(_,m,p)=>{_.fillStyle="#c98f4f",_.fillRect(0,0,m,p);for(let M=0;M<40;M++)_.strokeStyle=`rgba(110,60,20,${.1+Math.random()*.15})`,_.beginPath(),_.moveTo(0,Math.random()*p),_.bezierCurveTo(m/3,Math.random()*p,2*m/3,Math.random()*p,m,Math.random()*p),_.stroke()}),roughness:.6}),l=2.4,u=.36,f=.28;r(S(new Re(l,f,u),o,0,f/2));for(const _ of[-.5,.6]){const m=S(new Tn(.06,24),new X({color:3875856}),_,f/2,u/2+.001);r(m)}const h=new X({map:qo(),roughness:.5});for(const _ of[-.15,.15]){const m=S(new Re(2,.006,.04),[h,h,h,h,h,h],0,f+.003,_);r(m)}for(const _ of[-.75,.75])r(S(new Re(.06,.05,u-.05),Bn(),_,f+.025,0));const d=rt(15067115);for(const _ of[-.06,0,.06]){const m=S(new F(.004,.004,l-.1,6),d,0,f+.052,_);m.rotation.z=Math.PI/2,r(m),r(S(new F(.012,.012,.07,10),rt(13751771),l/2-.05,f+.035,_))}for(const _ of[-.12,.12])r(Ea(new I(-l/2,f-.02,_),new I(-l/2-.25,f-.08,_*.6),.015,rt(12107462),!0));const g=S(new F(.08,.08,.02,32),rt(13751771),-l/2-.25,f-.08,0);g.rotation.x=Math.PI/2,r(g),r(S(new F(.003,.003,.45,6),d,-l/2-.33,f-.31,0)),r(S(new Tt(.02,.004,6,16),d,-l/2-.33,f-.55,0));break}case"kundts_tube":{const o=new St;o.position.y=.55;const l=S(new F(.07,.07,1.6,40,1,!0),dt(16317180),0,0,0);l.rotation.z=Math.PI/2,o.add(l);const u=Et(1024,48,(h,d,g)=>{h.fillStyle="#3730a3",h.fillRect(0,0,d,g),h.fillStyle="#ffffff",h.font="bold 22px Arial";for(let _=0;_<=60;_++){const m=8+_*16.8;h.fillRect(m,0,2,_%5===0?18:10),_%5===0&&_<60&&h.fillText(String(_/5+1),m+2,42)}});o.add(S(new $t(1.55,.04),new X({map:u,side:Zt}),0,-.02,.0705));for(const h of[-.81,.81]){const d=S(new F(.08,.08,.04,32),ut(1120295),h,0,0);d.rotation.z=Math.PI/2,o.add(d)}const f=S(new F(.012,.012,1,12),rt(10265519),-1.2,0,0);f.rotation.z=Math.PI/2,o.add(f);for(let h=0;h<9;h++)o.add(S(new Ft(.03,10,6,0,Math.PI*2,0,Math.PI/2),new X({color:14071946,roughness:1}),-.65+h*.16,-.068,0));r(o);for(const h of[-.5,.5]){r(S(new F(.018,.018,.48,12),gt(),h,.24,0)),r(S(new F(.1,.12,.02,24),rt(7041664),h,.01,0));const d=S(new Tt(.075,.01,6,24,Math.PI*1.4),ut(1120295),h,.55,0);d.rotation.y=Math.PI/2,d.rotation.z=-Math.PI*.2,r(d)}break}case"van_de_graaff":{r(S(Ne(.9,.05,.5,.01),new X({color:13145434,roughness:.55}),.1,.025));const o=-.12;r(S(new Re(.14,.95,.1),dt(15067115),o,.55,0)),r(S(new Re(.06,.92,.004),new X({color:2042167,roughness:.9}),o,.55,.02)),r(S(Ne(.2,.08,.16,.02),ut(1120295),o-.02,.09,0)),r(S(new Ft(.26,48,32),gt(),o,1.17,0)),r(S(new Ft(.02,12,8),gt(),o,1.44,0));const l=S(Ne(.32,.2,.28,.02),new X({color:10265519,roughness:.45}),.3,.15,0);r(l);const u=Et(256,160,(f,h,d)=>{f.fillStyle="#9ca3af",f.fillRect(0,0,h,d),f.fillStyle="#111827",f.font="bold 15px Arial",f.textAlign="center",f.fillText("VAN DE GRAAFF GENERATOR",h/2,26),f.fillStyle="#111827",f.fillRect(40,70,30,46),f.fillStyle="#dc2626",f.fillRect(180,70,34,46),f.fillStyle="#7f1d1d",f.beginPath(),f.arc(128,60,7,0,Math.PI*2),f.fill(),f.fillStyle="#111827",f.font="12px Arial",f.fillText("HIGH / LOW",55,135),f.fillText("ON / OFF",197,135)});r(S(new $t(.3,.19),new X({map:u,roughness:.4}),.3,.15,.141));for(const f of[.12,.16]){const h=S(new F(.004,.004,.22,6),ut(1120295),.03,f,.02);h.rotation.z=Math.PI/2,r(h)}break}case"metre_rule":{const o=new X({color:14066524,roughness:.6}),l=new X({map:qo(),color:16113331,roughness:.55});r(S(new Re(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=S(Ne(.42,.3,.2,.03),en(1976635),0,.15),l=S(new Tn(.13,40,0,Math.PI),new X({map:qh("G","#1d4ed8")}),0,.12,.101),u=S(new Re(.006,.12,.004),bn(14427686),0,.18,.105);u.userData.role="needle",r(o,l,u,Gi(-.12,.3,0,14427686),Gi(.12,.3,0,1120295));break}case"tuning_fork":{const o=S(new Re(.03,.4,.03),gt(),-.04,.42),l=o.clone();l.position.x=.04;const u=S(new Tt(.04,.015,10,20,Math.PI),gt(),0,.22);u.rotation.z=Math.PI;const f=S(new F(.015,.015,.14,12),gt(),0,.12),h=S(Ne(.24,.05,.14,.01),Bn(),0,.025);r(o,l,u,f,h);break}case"pulley":{const o=S(new F(.15,.15,.05,40),rt(10265519),0,.9);o.rotation.x=Math.PI/2;const l=S(new Tt(.15,.015,10,40),ut(3621201),0,.9),u=S(Ne(.06,.12,.08,.01),rt(5395035),0,1.08),f=S(new F(.012,.012,1.1,12),rt(),-.3,.55),h=S(new F(.01,.01,.3,12),rt(),-.15,1.08);h.rotation.z=Math.PI/2;const d=S(Ne(.36,.03,.24,.01),en(2042167),-.3,.015),g=S(new F(.003,.003,.6,6),ut(16119284),.15,.6);r(o,l,u,f,h,d,g,S(new F(.05,.05,.1,20),In(),.15,.25));break}case"petri_dish":{r(S(new F(.22,.22,.05,48,1,!0),dt(),0,.025)),r(S(new F(.22,.22,.004,48),dt(),0,.002)),r(S(new F(.21,.21,.02,48),new X({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,u=.05+o%3*.04;r(S(new F(.02+o%2*.01,.02,.006,16),bn(16317180),Math.cos(l)*u,.025,Math.sin(l)*u))}break}case"hand_lens":{const o=S(new Ft(.14,32,32),dt(15988991),0,.03);o.scale.set(1,.16,1);const l=S(new Tt(.14,.018,12,48),ut(1120295),0,.03);l.rotation.x=Math.PI/2;const u=S(Ne(.3,.035,.05,.012),ut(1120295),.29,.03);r(o,l,u);break}case"scalpel":{const o=S(Ne(.32,.02,.035,.006),gt(),0,.012),l=new Wi;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const u=new pe(new Ai(l,{depth:.003,bevelEnabled:!1}),gt());u.rotation.x=-Math.PI/2,u.position.set(.16,.02,.02),r(o,u);break}case"forceps":{for(const o of[-1,1]){const l=S(Ne(.36,.012,.03,.004),gt(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(S(Ne(.05,.016,.08,.006),gt(),-.18,.012));break}case"dissecting_tray":{r(S(Ne(.9,.08,.6,.03),en(2042167),0,.04)),r(S(new Re(.82,.01,.52),new X({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(S(new F(.006,.006,.06,8),gt(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(S(new F(.16,.16,.5,36,1,!0),dt(),0,.25)),r(S(new F(.17,.17,.06,36),ut(1013358),0,.53)),r(S(new F(.161,.161,.18,36,1,!0,-.6,1.2),new X({color:16777215,roughness:.8,side:Zt}),0,.3)),r(kn(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=S(new F(.22,.16,.3,32),en(11817737),0,.15),l=S(new F(.2,.2,.02,32),bn(4139549),0,.29),u=S(new F(.015,.02,.5,10),bn(1409085),0,.54);r(o,l,u);const f=new X({color:2278750,roughness:.5,side:Zt});for(let h=0;h<6;h++){const d=S(new Ft(.09,16,10),f,0,.42+h*.07);d.scale.set(1.4,.15,.6),d.rotation.y=h*2.1,d.position.x=Math.cos(h*2.1)*.08,d.position.z=-Math.sin(h*2.1)*.08,r(d)}break}case"soil_sieve":{const o=S(new F(.4,.4,.14,48,1,!0),new X({color:10576391,roughness:.6,side:Zt}),0,.07),l=Et(256,256,(f,h,d)=>{f.clearRect(0,0,h,d),f.strokeStyle="#6b7280",f.lineWidth=2;for(let g=0;g<h;g+=8)f.beginPath(),f.moveTo(g,0),f.lineTo(g,d),f.moveTo(0,g),f.lineTo(h,g),f.stroke()}),u=S(new Tn(.39,48),new X({map:l,transparent:!0,metalness:.6,side:Zt}),0,.03);u.rotation.x=-Math.PI/2,r(o,u);for(let f=0;f<14;f++){const h=f*2.4,d=f%4*.08;r(S(new cc(.025+f%3*.01),bn(7893356),Math.cos(h)*d,.05,Math.sin(h)*d))}break}case"rain_gauge":{const o=S(new F(.2,.06,.16,36,1,!0),rt(13358561),0,1),l=S(new F(.2,.2,.08,36,1,!0),rt(13358561),0,1.12),u=S(new F(.1,.1,.9,32,1,!0),dt(),0,.47),f=S(new F(.03,.01,.1,12),rt(5395035),0,.01);r(o,l,u,f,Ta(.1,.1,.75,5),kn(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=S(new F(.22,.25,.42,36),en(1483594),0,.21),l=S(new F(.025,.04,.6,16),en(1483594),.4,.4);l.rotation.z=-.95;const u=S(new F(.07,.04,.06,20),rt(10265519),.64,.58);u.rotation.z=-.95;const f=S(new Tt(.18,.022,10,32,Math.PI),en(1409085),0,.42);r(o,l,u,f,kn(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(S(Ne(.9,.12,.55,.02),ut(1120295),0,.06)),r(S(new Re(.84,.02,.49),bn(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const u=-.35+o*.14,f=-.15+l*.15;r(S(new F(.004,.004,.08,6),bn(1483594),u,.16,f));const h=S(new Ft(.022,10,8),bn(2278750),u,.2,f);h.scale.set(1.6,.3,.8),r(h)}break}case"garden_trowel":{const o=S(new Ft(.12,24,12,0,Math.PI,0,Math.PI/2),rt(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=S(new F(.012,.012,.1,10),rt(),0,.03);l.rotation.z=Math.PI/2;const u=S(new F(.03,.03,.24,16),Bn(),-.17,.03);u.rotation.z=Math.PI/2,r(o,l,u);break}case"hand_hoe":{const o=new St,l=new X({color:13213802,roughness:.6}),u=new X({color:1842980,roughness:.45,metalness:.6}),f=S(new F(.03,.034,1.6,20),l,.85,0);f.rotation.z=Math.PI/2;const h=S(new F(.05,.05,.14,24),u,.05,0);h.rotation.z=Math.PI/2;const d=S(Ne(.05,.14,.05,.01),u,0,-.09),g=new Wi;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const _=new Ai(g,{depth:.014,bevelEnabled:!1}),m=new pe(_,new X({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const p=S(new Re(.016,.04,.28),new X({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(f,h,d,m,p),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new St,l=new X({color:14729103,roughness:.55}),u=new X({color:2303531,roughness:.5,metalness:.6}),f=S(new F(.045,.036,1.3,20),l,.72,0);f.rotation.z=Math.PI/2;const h=S(Ne(.16,.11,.11,.012),u,.06,0),d=S(Ne(.03,.09,.08,.006),gt(),.16,0),g=S(Ne(.05,.05,.24,.01),u,0,-.07);o.add(f,h,d,g);for(const _ of[-.09,0,.09]){const m=S(Ne(.04,.5,.025,.008),u,0,-.33,_),p=S(new zn(.016,.07,4),new X({color:11844032,roughness:.25,metalness:1}),0,-.61,_);p.rotation.z=Math.PI,o.add(m,p)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=S(new F(.02,.02,1.2,12),rt(7041664),0,.75),l=S(new F(.025,.025,.5,12),rt(7041664),0,1.35);l.rotation.z=Math.PI/2;const u=new pe(new ei(new Zo(.3,.05,4),200,.012,6,!1),rt(10265519));u.position.y=.15,r(o,l,u,S(new F(.25,.25,.04,32),bn(5978660),0,.02));break}case"soil_sample":{r(S(Ne(.7,.08,.45,.02),ut(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,u)=>{const f=S(new Ft(.11,20,12,0,Math.PI*2,0,Math.PI/2),new X({color:l,roughness:1}),-.22+u*.22,.08);f.scale.y=.55,r(f)});break}case"safety_goggles":{for(const o of[-1,1]){const l=S(new Ft(.085,24,16),new X({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const u=S(new Tt(.085,.014,10,32),ut(1013358),o*.1,.08);r(l,u)}r(S(new Tt(.2,.012,8,40,Math.PI),ut(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=S(new F(.01,.01,.5,10),rt(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(S(new Tt(.03,.008,8,20),rt(7041664),.26,.015));break}case"heat_proof_mat":{r(S(Ne(.8,.03,.8,.01),new X({color:15197668,roughness:.95}),0,.015));break}default:r(S(Ne(.3,.3,.3,.03),bn(10265519),0,.15))}s.traverse(o=>{o instanceof pe&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new Gn;s.children.forEach(o=>{o instanceof Dn||a.expandByObject(o)});const c=Aa(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function Yh(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new pe(new ei(new fc(t,s,n),32,.014,8,!1),new X({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const qu=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],zv=qu.flat(),Vv=i=>zv.find(e=>e.id===i);function Hv(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const Gv=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",Wv={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},Xv={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},qv={class:"space-y-1"},Yv=["onClick"],Zv={class:"truncate"},$v={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},Kv={class:"flex items-center justify-between gap-2 mb-2"},Jv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},jv={class:"flex flex-wrap gap-1.5"},Qv=["onClick"],ex={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},tx={class:"flex items-center gap-2"},nx={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},ix={class:"text-xs font-medium text-gray-400 ml-1"},sx={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},rx={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},ax=["max"],ox={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},lx={class:"flex flex-wrap gap-1.5"},cx=["onClick"],hx={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},ux={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},fx={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},dx={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},px={class:"flex gap-1.5"},mx=["onClick"],gx={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},_x=["value"],vx={class:"flex items-center justify-between"},xx={class:"flex gap-1.5"},yx={key:0,class:"pt-1"},Mx={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},bx={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},Sx={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},wx={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Ex={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},Tx={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Ax={class:"flex flex-wrap gap-1.5"},Rx={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},Cx={class:"text-center"},Px={class:"flex items-center gap-2 flex-shrink-0"},Ix={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},Dx={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},Lx={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},Nx=["max"],Ux={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},Fx={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},Ox={class:"flex items-start justify-between gap-2"},Bx={class:"text-xs text-gray-700 dark:text-gray-200"},kx={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},zx=.9,yr=5,Xx=sf({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean},wallShelves:{type:Boolean},benchLength:{},sideBenches:{type:Boolean}},emits:["takeChemical","putBack","pickApparatus","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=It(null),a=It(!1);let c,o,l,u;const f=new Map,h=new u0,d=new J,g=new Ri(new I(0,1,0),0),_=It(null),m=It(null),p=It(null),M=It(null);let y=!1,x=0;const E={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},w=C=>{if(P.value==="stopwatch"){if(C==="switch_on")return"Start";if(C==="switch_off")return"Stop";if(C==="measure")return"Read Time"}if(P.value==="microscope"){if(C==="switch_on")return"Light On";if(C==="switch_off")return"Light Off";if(C==="inspect")return"Observe"}return E[C]||C},R=()=>new Map(n.objectCatalog.map(C=>[C.object_type,C])),v=It([]),T=It(""),P=It(null),N=It(null),O=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],Z=["battery","dry_cell","accumulator"],K=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],B=new Map,$=new Map,G=new Map,ie=new Map,le=It([...n.connections||[]]),re=It(null),fe=It(null),ye=It(""),Xe=It(0),me=It(100),ue=It(null),Y=It(!1),he=It(null),ce=It(null),Se=It(null),He=new Map,Be=new Map,ot=new Map,Je=It(50),oe=It(40),de=It("very_blurred"),xe=It(!1),we=It(!1),Ee=new Map,nt=new Map,Ze=new Map,lt=It(0),ft=It(0),V=It(!1);let Lt=[];const wt={very_blurred:10,blurred:5,almost_focused:2,focused:0};function D(C){ce.value=C,ue.value="protractor",m.value="measure"}const b=It(null),q=It([]);function Q(C){const L=R().get(C.object_type),U={...(L==null?void 0:L.default_props)||{},...C.props||{}},z=$o(C.object_type,C.key,U.display_name||(L==null?void 0:L.display_name)||C.object_type,U);if(z.position.set(C.position.x,C.position.y,C.position.z),C.rotation&&(z.rotation.y=C.rotation.y),o.add(z),f.set(C.key,z),O.includes(C.object_type)){const k=Ae(C.object_type,U);B.set(C.key,k),se(C.key,k/Number(U.capacity_ml??250))}Z.includes(C.object_type)&&$.set(C.key,Number(U.voltage??6))}function ae(C){if(n.readOnly)return;const L=q.value.findIndex(z=>z.key===C);if(L===-1)return;const U=q.value[L];Q(U),q.value.splice(L,1),s("action",{objectKey:C,action:"move",value:C})}function ve(C){const L=n.sceneObjects.find(z=>z.key===C);if(!L)return{};const U=R().get(L.object_type);return{...(U==null?void 0:U.default_props)||{},...L.props||{}}}function Ae(C,L){return L.current_volume!==void 0?Number(L.current_volume):K.includes(C)?Number(L.capacity_ml??50):0}function se(C,L){const U=f.get(C);if(!U)return;const z=Math.max(.001,Math.min(1,L));U.traverse(k=>{if(k instanceof pe&&k.userData.role==="liquid"){const te=k.userData.maxFillHeight;k.scale.y=z,k.position.y=te*z/2}})}function _e(C){const L=new Set([C]),U=[C];for(;U.length;){const z=U.shift();le.value.forEach(k=>{k.from===z&&!L.has(k.to)&&(L.add(k.to),U.push(k.to)),k.to===z&&!L.has(k.from)&&(L.add(k.from),U.push(k.from))})}return L}function De(C){const L=n.sceneObjects.find(Pt=>Z.includes(Pt.object_type)),U=n.sceneObjects.find(Pt=>Pt.object_type==="switch"),z=n.sceneObjects.find(Pt=>Pt.object_type==="resistor"),k=n.sceneObjects.find(Pt=>Pt.key===C);if(!k)return{value:0,reason:null};if(!L||!U||!z)return{value:0,reason:"The circuit is incomplete. Check your connections."};const te=_e(L.key),Te=te.has(U.key),be=te.has(z.key),Ve=te.has(C),ct=G.get(U.key)==="on";if(Te&&ct&&!be)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!Te||!be)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((G.get(L.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!ct)return{value:0,reason:"Close the switch before taking the reading."};if(!Ve)return k.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:k.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const it=$.get(L.key)??ve(L.key).voltage??6,st=ve(z.key).resistance_ohm??10,yt=it/st;return k.object_type==="ammeter"?{value:Math.round(yt*100)/100,reason:null}:k.object_type==="voltmeter"?{value:it,reason:null}:{value:0,reason:null}}function je(C){const L=ie.get(C);if(!L)return 25;const U=(Date.now()-L)/1e3;return Math.min(100,Math.round(25+U*3.5))}function Le(C,L){const U=f.get(C),z=f.get(L);if(!U||!z)return{ok:!1};if(U.position.distanceTo(z.position)>zx)return{ok:!1};const k=nt.has(L)?Number(ve(L).natural_length_cm??15)+(nt.get(L)??0):ve(L).length_cm??ve(L).natural_length_cm??10,te=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((k+te)*10)/10}}function Pe(C){const L=He.get(C);if(!L)return"very_blurred";const U=Number(ve(L).optimal_focus??50),z=Number(ve(L).focus_tolerance??6),k=ot.get(C)??40,te=z*(40/k),Te=Be.get(C)??0,be=Math.abs(Te-U);return be<=te?"focused":be<=te*2?"almost_focused":be<=te*4?"blurred":"very_blurred"}function $e(C){_.value===C&&(Je.value=Be.get(C)??50,oe.value=ot.get(C)??40,xe.value=G.get(C)==="on",we.value=He.has(C),de.value=Pe(C))}function at(C){_.value&&(ot.set(_.value,C),s("action",{objectKey:_.value,action:"select_objective",value:String(C)}),$e(_.value))}function pt(C){_.value&&(Be.set(_.value,C),s("action",{objectKey:_.value,action:"focus_coarse",value:String(Math.round(C))}),$e(_.value))}function H(C){if(!_.value)return;const L=_.value,U=Math.max(0,Math.min(100,(Be.get(L)??50)+C));Be.set(L,U),s("action",{objectKey:L,action:"focus_fine",value:String(U)}),$e(L)}function Ce(C){const U=[...Ee.get(C)??new Set].reduce((it,st)=>it+Number(ve(st).mass_g??0),0),z=Number(ve(C).spring_constant_n_per_m??40),te=U/1e3*9.8/z*100,Te=Number(ve(C).max_safe_extension_cm??12),be=Ze.get(C)??0,Ve=te>Te;Ve&&be===0&&Ze.set(C,(te-Te)*.3);const ct=te+(Ze.get(C)??0);return nt.set(C,Math.round(ct*100)/100),ge(C,ct),_.value===C&&(ft.value=U,lt.value=Math.round(ct*100)/100,V.value=Ve),{totalMassG:U,exceeded:Ve}}function ge(C,L){const U=f.get(C);U&&U.traverse(z=>{if(z instanceof pe&&z.userData.role==="spring_body"){const k=z.userData.naturalLengthUnits,te=z.userData.maxLengthUnits,Te=Math.min(te,k+Math.max(0,L)*.05);z.scale.y=Te/te,z.position.y=.85-te*z.scale.y/2}if(z.userData.role==="spring_hanger"){const k=[...U.children].find(te=>te.userData.role==="spring_body");k&&(z.position.y=.85-k.userData.maxLengthUnits*k.scale.y)}})}function Ie(C){return new I(Math.sin(C),0,Math.cos(C))}function ke(C,L){return C.clone().sub(L.clone().multiplyScalar(2*C.dot(L)))}function Me(C,L,U,z){let k=L.clone(),te=-k.dot(C);te<0&&(te=-te,k=k.clone().negate());const Te=U/z,be=Te*Te*(1-te*te);if(be>1)return null;const Ve=Math.sqrt(1-be);return C.clone().multiplyScalar(Te).add(k.clone().multiplyScalar(Te*te-Ve))}function Ke(C,L){const U=f.get(C),z=f.get(L);if(!U||!z)return null;const k=U.position.clone(),te=Ie(U.rotation.y),Te=Ie(z.rotation.y),be=te.dot(Te);if(Math.abs(be)<.001)return null;const Ve=z.position.clone().sub(k).dot(Te)/be;if(Ve<=.05)return null;const ct=k.clone().add(te.clone().multiplyScalar(Ve));return ct.distanceTo(z.position)>.35?null:{point:ct,normal:Te,incidentDir:te}}function qe(){Lt.forEach(C=>{o.remove(C),C instanceof pe&&(C.geometry.dispose(),C.material.dispose())}),Lt=[]}function Ht(C,L,U){const z=C.clone().add(L).multiplyScalar(.5),k=Math.max(.01,C.distanceTo(L)),te=new pe(new F(.006,.006,k,8),new X({color:U,emissive:U,emissiveIntensity:.4,roughness:.4}));te.position.copy(z);const Te=L.clone().sub(C).normalize();return te.quaternion.copy(new Ui().setFromUnitVectors(new I(0,1,0),Te)),te}function Ut(){qe();const C=n.sceneObjects.find(Ve=>Ve.object_type==="ray_box"),L=n.sceneObjects.find(Ve=>Ve.object_type==="mirror"),U=n.sceneObjects.find(Ve=>Ve.object_type==="glass_block"),z=L||U;if(!C||!z||G.get(C.key)!=="on")return;const k=Ke(C.key,z.key);if(!k)return;const te=f.get(C.key),Te=Ht(te.position,k.point,16498468),be=Ht(k.point.clone().sub(k.normal.clone().multiplyScalar(.01)),k.point.clone().add(k.normal.clone().multiplyScalar(.4)),9741240);if(o.add(Te,be),Lt.push(Te,be),L){const Ve=ke(k.incidentDir,k.normal),ct=Ht(k.point,k.point.clone().add(Ve.multiplyScalar(1.2)),16498468);o.add(ct),Lt.push(ct)}else if(U){const Ve=Number(ve(U.key).refractive_index??1.5),ct=Me(k.incidentDir,k.normal,1,Ve);if(ct){const it=k.point.clone().add(ct.clone().multiplyScalar(.4)),st=Ht(k.point,it,6333946),yt=Ht(it,it.clone().add(k.incidentDir.clone().multiplyScalar(1)),16498468);o.add(st,yt),Lt.push(st,yt)}}}function Un(C,L,U){const z=n.sceneObjects.find(it=>it.object_type==="ray_box");if(!z)return{ok:!1};const k=Ke(z.key,L);if(!k)return{ok:!1};const te=f.get(C);if(!te||te.position.distanceTo(k.point)>.4)return{ok:!1};let Te;if(U==="incidence")Te=k.incidentDir.clone().negate();else{const it=n.sceneObjects.find(st=>st.key===L);if((it==null?void 0:it.object_type)==="glass_block"){const st=Number(ve(L).refractive_index??1.5),yt=Me(k.incidentDir,k.normal,1,st);if(!yt)return{ok:!1};Te=yt}else Te=ke(k.incidentDir,k.normal)}const be=Math.abs(Te.normalize().dot(k.normal)),Ve=Math.acos(Math.min(1,Math.max(-1,be)))*180/Math.PI,ct=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((Ve+ct)*10)/10}}const dn=new Map,gs=new Map;function kr(C){const L=f.get(C);if(!L)return;const U=dn.get(C),z=U?Number(ve(U).mass_g??0):0;L.traverse(k=>{var te;if(k instanceof Dn&&k.userData.role==="balance_display"){const Te=k.material;(te=Te.map)==null||te.dispose(),Te.map=qa(`${z.toFixed(1)} g`),Te.needsUpdate=!0}})}const si=new Map,Ji=new Map,tr=new Map,nr=It("00:00.0");function ir(C){const L=Math.max(0,C)/1e3,U=Math.floor(L/60).toString().padStart(2,"0"),z=(L%60).toFixed(1).padStart(4,"0");return`${U}:${z}`}function Xn(C){const L=tr.get(C)??0;return si.get(C)?L+(Date.now()-(Ji.get(C)??Date.now())):L}function ji(C){const L=f.get(C),U=Xn(C);_.value===C&&(nr.value=ir(U)),L&&L.traverse(z=>{var k;if(z instanceof Dn&&z.userData.role==="stopwatch_display"){const te=z.material;(k=te.map)==null||k.dispose(),te.map=qa(ir(U)),te.needsUpdate=!0}})}function zr(C){si.set(C,!1),tr.set(C,0),Ji.delete(C),ji(C)}function sr(C){f.forEach((L,U)=>{L.traverse(z=>{if(!(z instanceof pe)||z.userData.role==="flame"||z.userData.role==="led")return;(Array.isArray(z.material)?z.material:[z.material]).forEach(te=>{te instanceof X&&(te.emissive.setHex(U===C?2282478:0),te.emissiveIntensity=U===C?.3:0)})})})}function _s(C){var z;_.value=C,M.value=null,p.value=null;const L=n.sceneObjects.find(k=>k.key===C),U=L?R().get(L.object_type):null;v.value=(U==null?void 0:U.supported_actions)??[],T.value=((z=L==null?void 0:L.props)==null?void 0:z.display_name)??(U==null?void 0:U.display_name)??C,P.value=(L==null?void 0:L.object_type)??null,N.value=(L==null?void 0:L.object_type)==="battery"?$.get(C)??ve(C).voltage??6:null,(L==null?void 0:L.object_type)==="microscope"&&$e(C),(L==null?void 0:L.object_type)==="spring"&&Ce(C),sr(C)}function Qi(){_.value=null,M.value=null,re.value=null,P.value=null,sr(null)}function vs(C){if(!_.value)return;N.value=C,$.set(_.value,C);const L=f.get(_.value);L&&L.traverse(U=>{var z;if(U instanceof Dn&&U.userData.role==="voltage"){const k=U.material;(z=k.map)==null||z.dispose(),k.map=Xu(C),k.needsUpdate=!0}})}function Vr(C){const L=n.sceneObjects.find(z=>z.key===C);if(!L)return;const U=L.object_type;if(Y.value=!1,he.value=C,O.includes(U)){re.value="readonly",ye.value="ml",fe.value=Math.round(B.get(C)??0),M.value=C;return}if(U==="ammeter"||U==="voltmeter"){const z=De(C);z.reason&&(Se.value=z.reason,setTimeout(()=>{Se.value=null},4e3)),re.value="readonly",ye.value=U==="ammeter"?"A":"V",fe.value=z.value,M.value=C,Y.value=!!z.reason&&z.reason.includes("Short circuit");return}if(U==="balance"){re.value="readonly",ye.value="g";const z=dn.get(C);fe.value=z?Number(ve(z).mass_g??0):0,M.value=C;return}if(U==="stopwatch"){re.value="readonly",ye.value="s",fe.value=Math.round(Xn(C)/100)/10,M.value=C;return}if(U==="spring"){re.value="readonly",ye.value="cm";const z=Number(ve(C).natural_length_cm??15);fe.value=Math.round((z+(nt.get(C)??0))*10)/10,M.value=C,he.value=C;return}if(U==="protractor"){ce.value="incidence",ue.value="protractor",m.value="measure";return}if(U==="ruler"||U==="metre_rule"||U==="thermometer"){ue.value=U==="thermometer"?"thermometer":"ruler",m.value="measure";return}re.value="slider",ye.value="ml",me.value=Number(ve(C).capacity_ml??100),Xe.value=Math.round(me.value/2),M.value=C}function Hr(C){var L;if(_.value&&!n.readOnly&&!(C==="focus_coarse"||C==="focus_fine"||C==="select_objective")){if(C==="inspect"){const U=n.sceneObjects.find(be=>be.key===_.value),z=U?R().get(U.object_type):null;let k=(z==null?void 0:z.description)||"No further detail available.";const te=(L=U==null?void 0:U.props)!=null&&L.chemical_id?Vv(U.props.chemical_id):null;if(te&&U){const be=te.hazard?` Hazard: ${te.hazard} - handle with care and wear goggles.`:"",Ve=te.state==="liquid"?` About ${Math.round(B.get(U.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";k=`${te.name}${te.formula?` (${te.formula})`:""}.${Ve}${be}`}let Te=null;if(P.value==="microscope"){const be=_.value,Ve=He.get(be),ct=ot.get(be)??40;if(!Ve)k="Place a specimen slide on the stage first.";else if(G.get(be)!=="on")k="Switch on the illumination to see anything through the eyepiece.";else{const it=Pe(be),st=ve(Ve).expected_structures||"the specimen";it==="focused"?k=`At ×${ct}, clearly focused - you can see ${st}.`:it==="almost_focused"?k=`At ×${ct}, almost in focus - fine-tune the focus a little more.`:it==="blurred"?k=`At ×${ct}, blurred - adjust the coarse and fine focus.`:k=`At ×${ct}, very blurred - use the focus knobs before observing.`,Te=it}}p.value=k,s("action",{objectKey:_.value,action:C,value:Te});return}if(C==="zoom"){A(_.value),s("action",{objectKey:_.value,action:C,value:null});return}if(C==="switch_on"||C==="switch_off"){G.set(_.value,C==="switch_on"?"on":"off"),P.value==="stopwatch"&&(C==="switch_on"&&!si.get(_.value)?(si.set(_.value,!0),Ji.set(_.value,Date.now())):C==="switch_off"&&si.get(_.value)&&(tr.set(_.value,Xn(_.value)),si.set(_.value,!1)),ji(_.value)),P.value==="microscope"&&$e(_.value),P.value==="ray_box"&&Ut(),s("action",{objectKey:_.value,action:C,value:null});return}if(C==="measure"){Vr(_.value);return}if(C==="connect"||C==="pour"||C==="heat"||C==="move"||C==="rotate"){m.value=C,u.enabled=C!=="move"&&C!=="rotate";return}}}const qn=It("");Mr(m,C=>{C==="connect"?qn.value="Click the object to connect to.":C==="pour"?qn.value="Click the container to pour into.":C==="heat"?qn.value="Click the object to place over the flame.":C==="move"?qn.value="Drag the object to reposition it, then click Done.":C==="rotate"?qn.value="Drag left/right to rotate, then click Done.":C==="measure"&&ue.value==="ruler"?qn.value="Click the object to measure - place the ruler close to it first.":C==="measure"&&ue.value==="thermometer"?qn.value="Click the substance to take a temperature reading.":C==="measure"&&ue.value==="protractor"&&(qn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function Gr(){if(!M.value)return;const C=re.value==="slider"?String(Math.round(Xe.value)):fe.value!==null?String(fe.value):null;s("action",{objectKey:M.value,action:"measure",value:C,unit:ye.value,label:T.value,safetyIssue:Y.value,targetObjectKey:he.value}),M.value=null,re.value=null,fe.value=null,Y.value=!1,ce.value=null}function ja(){if(b.value){et();return}m.value=null,ue.value=null,ce.value=null,u.enabled=!0}function Qa(){var C,L,U;if(!(!_.value||!m.value)){if(m.value==="move"){const z=f.get(_.value);let k=null;z&&f.forEach((st,yt)=>{yt!==_.value&&st.position.distanceTo(z.position)<.6&&(k=yt)});const te=_.value;dn.forEach((st,yt)=>{st===te&&yt!==k&&(dn.delete(yt),kr(yt))});const Te=k?(C=n.sceneObjects.find(st=>st.key===k))==null?void 0:C.object_type:null;Te==="balance"&&k&&(dn.set(k,te),kr(k)),gs.forEach((st,yt)=>{if(yt===te&&st!==k){const Pt=Number(ve(yt).volume_ml??0),Zn=Math.max(0,(B.get(st)??0)-Pt);B.set(st,Zn),se(st,Zn/Number(ve(st).capacity_ml??250)),gs.delete(yt)}});const be=Number(ve(te).volume_ml??0);if(Te&&O.includes(Te)&&k&&be>0&&!gs.has(te)){gs.set(te,k);const st=(B.get(k)??0)+be;B.set(k,st),se(k,st/Number(ve(k).capacity_ml??250))}const Ve=(L=n.sceneObjects.find(st=>st.key===te))==null?void 0:L.object_type;if(He.forEach((st,yt)=>{st===te&&yt!==k&&He.delete(yt)}),Te==="microscope"&&k&&Ve==="biological_model"){He.set(k,te);const st=Number(ve(te).optimal_focus??50),yt=Number(ve(te).focus_tolerance??6),Pt=Math.random()<.5?-1:1,Zn=yt*(3+Math.random()*3)*Pt;Be.set(k,Math.max(0,Math.min(100,st+Zn))),ot.set(k,40),$e(k)}let ct,it=!1;if(Ve==="mass_piece"){Ee.forEach((yt,Pt)=>{yt.has(te)&&Pt!==k&&yt.delete(te)}),Te==="spring"&&k&&(Ee.has(k)||Ee.set(k,new Set),Ee.get(k).add(te));const st=new Set(k&&Te==="spring"?[k]:[]);Ee.forEach((yt,Pt)=>st.add(Pt)),st.forEach(yt=>{const Pt=Ce(yt);k===yt&&(ct=Pt.totalMassG,it=Pt.exceeded)}),it&&(Se.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Se.value=null},4500))}["ray_box","mirror","glass_block"].includes(Ve||"")&&Ut(),s("action",{objectKey:_.value,action:"move",value:k,springLoadG:ct,safetyIssue:it})}else if(m.value==="rotate"){const z=f.get(_.value),k=z?Math.round(z.rotation.y*180/Math.PI):0,te=(U=n.sceneObjects.find(Te=>Te.key===_.value))==null?void 0:U.object_type;["ray_box","mirror","glass_block"].includes(te||"")&&Ut(),s("action",{objectKey:_.value,action:"rotate",value:String(k)})}m.value=null,u.enabled=!0}}function A(C){const L=f.get(C);if(!L)return;const U=L.position.clone().add(new I(0,.3,0)),z=l.position.clone().sub(u.target).normalize(),k=U.clone().add(z.multiplyScalar(1.4)),te=l.position.clone(),Te=u.target.clone();let be=0;const Ve=()=>{be+=.05,l.position.lerpVectors(te,k,Math.min(be,1)),u.target.lerpVectors(Te,U,Math.min(be,1)),u.update(),be<1&&requestAnimationFrame(Ve)};Ve()}function W(C){const L=c.domElement.getBoundingClientRect();d.x=(C.clientX-L.left)/L.width*2-1,d.y=-((C.clientY-L.top)/L.height)*2+1}function ne(){h.setFromCamera(d,l);const C=[];f.forEach(z=>C.push(z));const L=h.intersectObjects(C,!0);if(L.length===0)return null;let U=L[0].object;for(;U&&!U.userData.objectKey;)U=U.parent;return U?U.userData.objectKey:null}let j=null;function ee(C){if(W(C),j={x:C.clientX,y:C.clientY},m.value==="move"&&_.value){y=!0;return}if(m.value==="rotate"&&_.value){y=!0,x=C.clientX;return}}function Ue(C){if(!(!y||!_.value)){if(W(C),m.value==="move"){h.setFromCamera(d,l);const L=new I;h.ray.intersectPlane(g,L);const U=f.get(_.value);U&&L&&(U.position.x=L.x,U.position.z=L.z)}else if(m.value==="rotate"){const L=C.clientX-x,U=f.get(_.value);U&&(U.rotation.y=L*.02)}}}function Ge(C){const L=j&&(Math.abs(C.clientX-j.x)>4||Math.abs(C.clientY-j.y)>4);if(y=!1,m.value==="move"||m.value==="rotate"||L||(W(C),ri()))return;const U=ne();if(!U){Qi();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(U===_.value)return;const z=_.value,k=m.value;if(k==="measure"){if(ue.value==="ruler"){const te=Le(z,U);if(!te.ok){Se.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Se.value=null},3500);return}re.value="readonly",ye.value="cm",fe.value=te.value}else if(ue.value==="thermometer")re.value="readonly",ye.value="°C",fe.value=je(U);else if(ue.value==="protractor"){const te=ce.value??"incidence",Te=Un(z,U,te);if(!Te.ok){Se.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Se.value=null},3500);return}re.value="readonly",ye.value="°",fe.value=Te.value}he.value=U,M.value=z,m.value=null,ue.value=null,u.enabled=!0;return}if(k==="connect"){const te=f.get(z),Te=f.get(U);te&&Te&&o.add(Yh(te.position,Te.position)),le.value.push({from:z,to:U}),s("action",{objectKey:z,action:k,value:U}),m.value=null,u.enabled=!0;return}if(k==="heat"){ie.set(U,Date.now()),s("action",{objectKey:z,action:k,value:U}),m.value=null,u.enabled=!0;return}if(k==="pour"){Fe(z,U);return}}_s(U)}function Fe(C,L){var ct,it,st,yt;const U=n.sceneObjects.find(Pt=>Pt.key===C),z=n.sceneObjects.find(Pt=>Pt.key===L);if(!U||!z)return;const k=Number(ve(L).capacity_ml??250),te=B.get(L)??0,Te=Math.max(0,k-te),be=O.includes(U.object_type),Ve=be?B.get(C)??0:Te;b.value={from:C,to:L,amount:0,max:Math.max(1,Math.round(Math.min(Te,Ve))),fromLabel:((ct=U.props)==null?void 0:ct.display_name)??((it=R().get(U.object_type))==null?void 0:it.display_name)??U.object_type,toLabel:((st=z.props)==null?void 0:st.display_name)??((yt=R().get(z.object_type))==null?void 0:yt.display_name)??z.object_type,fromTracked:be}}function Ye(){if(!b.value)return;const{from:C,to:L,amount:U,fromTracked:z}=b.value,k=Number(ve(L).capacity_ml??250);if(se(L,((B.get(L)??0)+U)/k),z){const te=Number(ve(C).capacity_ml??250);se(C,Math.max(0,(B.get(C)??0)-U)/te)}}Mr(()=>{var C;return(C=b.value)==null?void 0:C.amount},Ye);function Qe(){if(!b.value)return;const{from:C,to:L,amount:U,fromTracked:z}=b.value;mt(C,L,U),B.set(L,Math.round((B.get(L)??0)+U)),z&&B.set(C,Math.max(0,Math.round((B.get(C)??0)-U))),s("action",{objectKey:L,action:"pour",value:String(Math.round(U))}),b.value=null,m.value=null,u.enabled=!0}function mt(C,L,U){if(U<=0)return;const z=xt(C),k=xt(L);if(!z||!k)return;const te=B.get(L)??0;k.color.lerp(z.color,te<=0?1:U/(te+U))}function xt(C){var U;let L=null;return(U=f.get(C))==null||U.traverse(z=>{!L&&z instanceof pe&&z.userData.role==="liquid"&&(L=z.material)}),L}function et(){if(b.value){const{from:C,to:L,fromTracked:U}=b.value,z=Number(ve(L).capacity_ml??250);if(se(L,(B.get(L)??0)/z),U){const k=Number(ve(C).capacity_ml??250);se(C,(B.get(C)??0)/k)}}b.value=null,m.value=null,u.enabled=!0}let Oe=null;const qt=It(null);function Yt(){const C=r.value;if(!C)return;try{Oe=Ev(C,{unitScale:yr,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14,cupboard:!!n.cupboard,wallCabinets:!!n.wallShelves,benchLength:n.benchLength,sideBenches:!!n.sideBenches})}catch(U){console.error("Virtual Lab: failed to create a WebGL context",U),a.value=!0;return}c=Oe.renderer,o=Oe.scene,l=Oe.camera,u=Oe.controls,n.sceneObjects.forEach(U=>{if(U.in_tray){q.value.push(U);return}Q(U)}),(n.connections||[]).forEach(U=>{const z=f.get(U.from),k=f.get(U.to);z&&k&&o.add(Yh(z.position,k.position))}),Ut(),Ct(),yi(),n.fixedView?Mc():bc(),c.domElement.addEventListener("pointerdown",ee),c.domElement.addEventListener("pointermove",Ue),c.domElement.addEventListener("pointermove",Sc),c.domElement.addEventListener("pointerup",Ge);let L=0;Oe.onFrame(U=>{L+=U,L>.15&&(L=0,si.forEach((z,k)=>{z&&ji(k)})),f.forEach((z,k)=>{const te=k===_.value||k===qt.value;z.children.forEach(Te=>{Te.userData.role==="label"&&(Te.visible=te)})}),Nt.forEach((z,k)=>{z.children.forEach(te=>{te.userData.role==="label"&&(te.visible=k===pn)})}),Rn.forEach((z,k)=>{z.children.forEach(te=>{te.userData.role==="label"&&(te.visible=k===Kt)})})})}Mr(()=>n.sceneObjects.map(C=>`${C.key}@${C.position.x},${C.position.z}`).join("|"),()=>{if(!Oe)return;const C=new Map(n.sceneObjects.filter(U=>!U.in_tray).map(U=>[U.key,U]));let L=!1;f.forEach((U,z)=>{C.has(z)||(o.remove(U),U.traverse(k=>{var te;(k instanceof pe||k instanceof Dn)&&((te=k.geometry)==null||te.dispose(),(Array.isArray(k.material)?k.material:[k.material]).forEach(be=>{var Ve;(Ve=be.map)==null||Ve.dispose(),be.dispose()}))}),f.delete(z),_.value===z&&Qi())}),C.forEach((U,z)=>{const k=f.get(z);k?k.position.set(U.position.x,U.position.y,U.position.z):(Q(U),L=!0)}),L&&!n.fixedView&&bc(),mn()});const Nt=new Map,rn=[];function We(C,L){const U=document.createElement("canvas");U.width=512,U.height=144;const z=U.getContext("2d");z.fillStyle="#fffdf4",z.fillRect(0,0,512,144),z.fillStyle="#1e3a8a",z.fillRect(0,0,512,10),z.fillStyle="#111827",z.textAlign="center",z.textBaseline="middle";let k=46;for(z.font=`bold ${k}px sans-serif`;z.measureText(C).width>490&&k>26;)k-=2,z.font=`bold ${k}px sans-serif`;if(z.measureText(C).width>490){const Te=C.split(" "),be=Math.ceil(Te.length/2);z.fillText(Te.slice(0,be).join(" "),256,L?42:52),z.fillText(Te.slice(be).join(" "),256,L?80:96)}else z.fillText(C,256,L?54:76);L&&(z.font="bold 38px serif",z.fillStyle="#1e3a8a",z.fillText(L,256,118));const te=new Lr(U);return te.colorSpace=un,te.anisotropy=8,te}let pn=null;function Ct(){const C=Oe==null?void 0:Oe.cupboard;C&&(qu.forEach((L,U)=>{const z=C.bays[U<2?0:1],k=z.levels[U%2],te=(z.maxX-z.minX)/L.length;L.forEach((Te,be)=>{const Ve=$o(Gv(Te),`cupboard:${Te.id}`,Te.name,Hv(Te));Ve.position.set(z.minX+te*(be+.5),k,z.frontZ-.6),Ve.userData.chemicalId=Te.id,Ve.traverse(it=>{it instanceof pe&&(it.castShadow=!1,it.receiveShadow=!1)}),o.add(Ve),Nt.set(Te.id,Ve);const ct=new pe(new $t(te*.92,.26),new ds({map:We(Te.name,Te.formula),toneMapped:!1}));ct.position.set(Ve.position.x,k+.14,z.frontZ-.08),ct.rotation.x=-.35,ct.userData.chemicalId=Te.id,o.add(ct),rn.push(ct)})}),mn())}function mn(){const C=new Set(n.sceneObjects.map(U=>{var z;return(z=U.props)==null?void 0:z.chemical_id}).filter(Boolean));Nt.forEach((U,z)=>{U.visible=!C.has(z)});const L=new Set(n.sceneObjects.filter(U=>{var z;return!((z=U.props)!=null&&z.chemical_id)}).map(U=>U.object_type));Rn.forEach((U,z)=>{U.visible=!L.has(z)})}function An(){var ct;const C=Oe==null?void 0:Oe.cupboard,L=Oe==null?void 0:Oe.wallCabinets,U=Oe==null?void 0:Oe.furniture,z=Oe==null?void 0:Oe.taps;if(!C&&!L&&!(U!=null&&U.doors.length)&&!z)return null;h.setFromCamera(d,l);const k=[];C&&k.push(...C.doors,...C.blockers),L&&k.push(...L.doors,...L.blockers),U&&k.push(...U.doors,...U.blockers),z&&k.push(...z.taps),f.forEach(it=>k.push(it)),Nt.forEach(it=>{it.visible&&k.push(it)}),rn.forEach(it=>k.push(it)),Rn.forEach(it=>{it.visible&&k.push(it)});const te=h.intersectObjects(k,!0)[0];if(!te)return null;const Te=(ct=Oe.taps)==null?void 0:ct.tapOf(te.object);if(Te)return{kind:"tap",tap:Te};const be=Oe.doorOf(te.object);if(be)return{kind:"door",door:be};let Ve=te.object;for(;Ve&&!Ve.userData.chemicalId&&!Ve.userData.shelfType;)Ve=Ve.parent;return Ve?Ve.userData.shelfType?{kind:"apparatus",type:Ve.userData.shelfType}:{kind:"chemical",id:Ve.userData.chemicalId}:null}function ri(){const C=An();if(!C)return!1;if(C.kind==="apparatus")return s("pickApparatus",C.type),!0;if(C.kind==="tap")return Oe.taps.toggle(C.tap),Yu(Oe.taps.anyOn()),!0;if(C.kind==="chemical"){const L=n.sceneObjects.find(U=>{var z;return((z=U.props)==null?void 0:z.chemical_id)===C.id});return L?s("putBack",L.key):s("takeChemical",C.id),!0}return Oe.toggleDoor(C.door),!0}const Rn=new Map,Ot=[];let Kt=null;const ai=[{key:"physics",label:"Physics"},{key:"chemistry",label:"Chemistry"},{key:"biology",label:"Biology"},{key:"agriculture",label:"Agriculture"},{key:"general",label:"General"}],Gt=["physics","chemistry","biology","agriculture"];function Yn(C){o.remove(C),C.traverse(L=>{var U;(L instanceof pe||L instanceof Dn)&&((U=L.geometry)==null||U.dispose(),(Array.isArray(L.material)?L.material:[L.material]).forEach(k=>{var te;(te=k.map)==null||te.dispose(),k.dispose()}))})}function yi(){const C=Oe==null?void 0:Oe.wallCabinets;if(!C)return;Rn.forEach(Yn),Rn.clear(),Ot.splice(0).forEach(Yn);const L=n.objectCatalog.filter(te=>te.id>0&&te.is_active!==!1),U=te=>Gt.includes(te.category)?te.category:"general",z=new I(0,1,0),k=(te,Te,be,Ve)=>new I(Te,be,Ve).applyAxisAngle(z,te.rotY).add(te.offset);C.cabinets.forEach((te,Te)=>{const be=ai[Te];if(!be)return;const Ve=Wr(be.label,Math.min(.75*yr,(te.maxX-te.minX)*.7));Ve.position.copy(k(te,te.cx,te.topY,te.corniceFrontZ)),Ve.rotation.y=te.rotY,o.add(Ve),Ot.push(Ve);const ct=L.filter(oi=>U(oi)===be.key).sort((oi,Xr)=>oi.display_name.localeCompare(Xr.display_name));if(ct.length===0)return;const it=Math.max(1,te.bays);let st=Math.max(1,Math.ceil(4/it));for(;Math.ceil(ct.length/(st*it))>te.rows.length;)st++;const yt=st*it,Pt=(te.maxX-te.minX)/it,Zn=it>1?.03*yr:0,wc=(Pt-Zn*2)/st;ct.forEach((oi,Xr)=>{const Qu=Math.floor(Xr/yt),Ec=Xr%yt,ef=Math.floor(Ec/st),tf=te.rows[Qu],Mi=$o(oi.object_type,`shelf:${oi.object_type}`,oi.display_name,oi.default_props||{}),rr=new Gn;Mi.children.forEach(li=>{li instanceof Dn||rr.expandByObject(li)});const eo=rr.getSize(new I),Tc=rr.getCenter(new I),ts=Math.min(1,wc*.84/Math.max(eo.x,.01),te.rowHeight*.8/Math.max(eo.y,.01),te.depth*.9/Math.max(eo.z,.01));Mi.scale.setScalar(ts);const nf=te.minX+ef*Pt+Zn+wc*(Ec%st+.5),to=new I(nf,tf-rr.min.y*ts,te.z).sub(new I(Tc.x*ts,0,Tc.z*ts));Mi.position.copy(k(te,to.x,to.y,to.z)),Mi.rotation.y=te.rotY,Mi.children.forEach(li=>{li.userData.role==="label"&&(li.scale.set(.72/ts,.158/ts,1),li.position.y=rr.max.y+.2/ts,li.visible=!1)}),Mi.traverse(li=>{li instanceof pe&&(li.castShadow=!1)}),Mi.userData.shelfType=oi.object_type,o.add(Mi),Rn.set(oi.object_type,Mi)})}),mn()}function Wr(C,L){const U=yr,z=.13*U,k=new St,te=new pe(new Re(L,z,.02*U),new X({color:5977112,roughness:.55}));te.position.set(0,z/2,-.008*U),k.add(te);const Te=document.createElement("canvas");Te.width=1024,Te.height=200;const be=Te.getContext("2d"),Ve=be.createLinearGradient(0,0,0,200);Ve.addColorStop(0,"#f8e3a1"),Ve.addColorStop(.45,"#d9a842"),Ve.addColorStop(1,"#a8781f"),be.fillStyle=Ve,be.beginPath(),be.roundRect(4,4,1016,192,22),be.fill(),be.strokeStyle="rgba(70,45,5,0.85)",be.lineWidth=6,be.beginPath(),be.roundRect(18,18,988,164,14),be.stroke(),be.lineWidth=2,be.beginPath(),be.roundRect(30,30,964,140,10),be.stroke();for(const Pt of[62,962]){const Zn=be.createRadialGradient(Pt-4,96,2,Pt,100,16);Zn.addColorStop(0,"#fff7d6"),Zn.addColorStop(1,"#7a5a17"),be.fillStyle=Zn,be.beginPath(),be.arc(Pt,100,15,0,Math.PI*2),be.fill(),be.strokeStyle="#5a3f0c",be.lineWidth=3,be.beginPath(),be.moveTo(Pt-9,100),be.lineTo(Pt+9,100),be.stroke()}be.textAlign="center",be.textBaseline="middle";let ct=96;be.font=`bold ${ct}px Georgia, serif`;const it=C.toUpperCase().split("").join(" ");for(;be.measureText(it).width>820&&ct>40;)ct-=4,be.font=`bold ${ct}px Georgia, serif`;be.fillStyle="rgba(255,248,220,0.7)",be.fillText(it,512,104),be.fillStyle="#3b2606",be.fillText(it,512,101);const st=new Lr(Te);st.colorSpace=un,st.anisotropy=8;const yt=new pe(new $t(L*.94,z*.8),new X({map:st,roughness:.3,metalness:.55,transparent:!0}));return yt.position.set(0,z/2,.0035*U),k.add(yt),k}Mr(()=>n.objectCatalog.map(C=>C.object_type).join(","),()=>{Oe&&yi()});let es=null;function Yu(C){try{if(!es){if(C===0)return;const z=window.AudioContext||window.webkitAudioContext,k=new z,te=k.createBuffer(1,k.sampleRate*2,k.sampleRate),Te=te.getChannelData(0);for(let Pt=0;Pt<Te.length;Pt++)Te[Pt]=Math.random()*2-1;const be=k.createBufferSource();be.buffer=te,be.loop=!0;const Ve=k.createBiquadFilter();Ve.type="bandpass",Ve.frequency.value=1100,Ve.Q.value=.6;const ct=k.createBiquadFilter();ct.type="lowpass",ct.frequency.value=3500;const it=k.createGain();it.gain.value=0;const st=k.createOscillator();st.frequency.value=7;const yt=k.createGain();yt.gain.value=250,st.connect(yt).connect(Ve.frequency),be.connect(Ve).connect(ct).connect(it).connect(k.destination),be.start(),st.start(),es={ctx:k,gain:it}}const{ctx:L,gain:U}=es;L.state==="suspended"&&L.resume(),U.gain.setTargetAtTime(C===0?0:Math.min(.5,.3+.1*C),L.currentTime,.15)}catch{}}Ko(()=>{es==null||es.ctx.close().catch(()=>{}),es=null});function Zu(C){Oe&&(C==="bench"?Mc(!0):C==="entrance"?Oe.flyTo(new I(2.4,.95,2.4),new I(0,.25,7)):C==="left"?Oe.flyTo(new I(-1.2,1,1.6),new I(-7,.45,1.6)):Oe.flyTo(new I(1.2,1,1.6),new I(7,.45,1.6)))}const $u=lf(()=>{var C,L;return!!((L=(C=n.sceneObjects.find(U=>U.key===_.value))==null?void 0:C.props)!=null&&L.chemical_id)});function Ku(){const C=_.value;C&&(Qi(),s("putBack",C))}function Mc(C=!1){if(!Oe)return;const L=yr,U=Oe.benchLength/2,z=Oe.wallCabinets?new Gn(new I(-(U+.25)*L,-.9*L,-.6*L),new I((U+.25)*L,1.82*L,.375*L)):new Gn(new I(-U*L,-.9*L,-.375*L),new I(U*L,.1*L,.375*L));Oe.fitBox(z,Oe.wallCabinets?.94:.72,{dir:new I(.4,Oe.wallCabinets?3.4:4.2,6.4),animate:C})}function bc(){if(!Oe||f.size===0)return;o.updateMatrixWorld(!0);const C=new Gn;f.forEach(L=>L.children.forEach(U=>{U.userData.role!=="label"&&C.expandByObject(U)})),Oe.frameBox(C)}function Sc(C){if(y)return;W(C),qt.value=ne();const L=qt.value?null:An();pn=(L==null?void 0:L.kind)==="chemical"?L.id:null,Kt=(L==null?void 0:L.kind)==="apparatus"?L.type:null,c.domElement.style.cursor=qt.value||L?"pointer":"grab"}function Ju(C,L){(L.state==="on"||L.state==="off")&&G.set(C,L.state);const U=f.get(C);U&&U.traverse(z=>{if(z.userData.role==="lever"&&"state"in L){const k=L.state==="on"||L.state==="closed";z.rotation.z=k?Math.PI/2-.35:Math.PI/2-.9,z.position.x=k?0:-.06}if(z.userData.role==="led"&&"state"in L&&z instanceof pe){const k=z.material;k.emissiveIntensity=L.state==="on"?1.2:0}if(z.userData.role==="flame"&&"flame"in L&&z instanceof pe){const k=z.material;k.emissiveIntensity=L.flame==="on"?1:0,k.opacity=L.flame==="on"?.9:0}})}e({setObjectState:Ju,goToView:Zu});function ju(){a.value=!1,cf(Yt)}return Zh(Yt),Ko(()=>{c==null||c.domElement.removeEventListener("pointerdown",ee),c==null||c.domElement.removeEventListener("pointermove",Ue),c==null||c.domElement.removeEventListener("pointermove",Sc),c==null||c.domElement.removeEventListener("pointerup",Ge),Oe==null||Oe.dispose(),Oe=null}),(C,L)=>(zt(),kt("div",Wv,[a.value?(zt(),kt("div",Xv,[Ac(hf,{name:"beaker",class:"w-8 h-8"}),L[9]||(L[9]=tt("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),tt("button",{onClick:ju,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(zt(),kt("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),q.value.length>0?(zt(),kt("div",{key:2,class:ar(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||b.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[L[10]||(L[10]=tt("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),tt("div",qv,[(zt(!0),kt(xs,null,qr(q.value,U=>{var z,k;return zt(),kt("button",{key:U.key,onClick:te=>ae(U.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[tt("span",null,Jt(((z=R().get(U.object_type))==null?void 0:z.icon)||"🔬"),1),tt("span",Zv,Jt(((k=R().get(U.object_type))==null?void 0:k.display_name)||U.object_type),1)],8,Yv)}),128))])],2)):cn("",!0),_.value&&!m.value?(zt(),kt("div",$v,[tt("div",Kv,[tt("p",Jv,Jt(T.value),1),tt("button",{onClick:Qi,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),tt("div",jv,[(zt(!0),kt(xs,null,qr(v.value,U=>(zt(),kt("button",{key:U,onClick:z=>Hr(U),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},Jt(w(U)),9,Qv))),128)),i.cupboard?(zt(),kt("button",{key:0,onClick:Ku,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},Jt($u.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):cn("",!0)]),M.value&&re.value==="readonly"?(zt(),kt("div",ex,[L[11]||(L[11]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),tt("div",tx,[tt("span",nx,[Yr(Jt(fe.value),1),tt("span",ix,Jt(ye.value),1)]),tt("button",{onClick:Gr,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):cn("",!0),M.value&&re.value==="slider"?(zt(),kt("div",sx,[tt("p",rx,"Reading: "+Jt(Math.round(Xe.value))+Jt(ye.value),1),Rc(tt("input",{"onUpdate:modelValue":L[0]||(L[0]=U=>Xe.value=U),type:"range",min:"0",max:me.value,step:"1",class:"w-full accent-emerald-600"},null,8,ax),[[Cc,Xe.value,void 0,{number:!0}]]),tt("button",{onClick:Gr,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):cn("",!0),P.value==="battery"?(zt(),kt("div",ox,[L[12]||(L[12]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),tt("div",lx,[(zt(),kt(xs,null,qr([1.5,3,6,9,12],U=>tt("button",{key:U,onClick:z=>vs(U),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",N.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},Jt(U)+"V",11,cx)),64))])])):cn("",!0),P.value==="stopwatch"?(zt(),kt("div",hx,[tt("p",ux,"Elapsed: "+Jt(nr.value),1),tt("button",{onClick:L[1]||(L[1]=U=>zr(_.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):cn("",!0),P.value==="microscope"?(zt(),kt("div",fx,[we.value?(zt(),kt(xs,{key:1},[tt("div",null,[L[13]||(L[13]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),tt("div",px,[(zt(),kt(xs,null,qr([40,100,400],U=>tt("button",{key:U,onClick:z=>at(U),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",oe.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+Jt(U),11,mx)),64))])]),tt("div",null,[tt("p",gx,"Coarse Focus: "+Jt(Math.round(Je.value)),1),tt("input",{value:Je.value,onChange:L[2]||(L[2]=U=>pt(Number(U.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,_x)]),tt("div",vx,[L[14]||(L[14]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),tt("div",xx,[tt("button",{onClick:L[3]||(L[3]=U=>H(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),tt("button",{onClick:L[4]||(L[4]=U=>H(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),xe.value?(zt(),kt("div",yx,[L[16]||(L[16]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),tt("div",Mx,[tt("div",{class:"absolute inset-0 flex items-center justify-center",style:rf({filter:`blur(${wt[de.value]}px)`})},[...L[15]||(L[15]=[tt("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),tt("p",bx,Jt(de.value.replace("_"," "))+" · ×"+Jt(oe.value),1)])):cn("",!0)],64)):(zt(),kt("div",dx,"Place a specimen slide on the stage first."))])):cn("",!0),P.value==="spring"?(zt(),kt("div",Sx,[tt("p",wx,"Attached Load: "+Jt(ft.value)+" g · Extension: "+Jt(lt.value)+" cm",1),V.value?(zt(),kt("p",Ex,"Beyond the spring's safe extension limit.")):cn("",!0)])):cn("",!0),P.value==="protractor"?(zt(),kt("div",Tx,[L[17]||(L[17]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),tt("div",Ax,[tt("button",{onClick:L[5]||(L[5]=U=>D("incidence")),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ce.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),tt("button",{onClick:L[6]||(L[6]=U=>D("outgoing")),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ce.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):cn("",!0)])):cn("",!0),m.value&&!b.value?(zt(),kt("div",Rx,[tt("span",Cx,Jt(qn.value),1),tt("span",Px,[m.value==="move"||m.value==="rotate"?(zt(),kt("button",{key:0,onClick:Qa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):cn("",!0),tt("button",{onClick:ja,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):cn("",!0),b.value?(zt(),kt("div",Ix,[tt("p",Dx,"Pouring "+Jt(b.value.fromLabel)+" → "+Jt(b.value.toLabel),1),tt("p",Lx,[Yr(Jt(Math.round(b.value.amount))+" ",1),L[18]||(L[18]=tt("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),Rc(tt("input",{"onUpdate:modelValue":L[7]||(L[7]=U=>b.value.amount=U),type:"range",min:"0",max:b.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,Nx),[[Cc,b.value.amount,void 0,{number:!0}]]),tt("div",{class:"flex items-center gap-2 mt-2"},[tt("button",{onClick:et,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),tt("button",{onClick:Qe,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):cn("",!0),Ac(af,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:of(()=>[Se.value?(zt(),kt("div",Ux,Jt(Se.value),1)):cn("",!0)]),_:1}),p.value?(zt(),kt("div",Fx,[tt("div",Ox,[tt("p",Bx,Jt(p.value),1),tt("button",{onClick:L[8]||(L[8]=U=>p.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):cn("",!0),tt("p",kx,[L[19]||(L[19]=Yr(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard||i.wallShelves?(zt(),kt(xs,{key:0},[Yr(" · Click a door to open it, a sink tap to run water")],64)):cn("",!0)])]))}});export{un as A,Re as B,F as C,Zt as D,$l as E,Xa as F,St as G,Pu as H,$o as I,vd as L,pe as M,hv as O,Ri as P,fc as Q,u0 as R,Ft as S,Tt as T,I as V,lv as W,Xx as _,Hv as a,Gv as b,Vv as c,Ev as d,Or as e,X as f,Zi as g,Tn as h,ds as i,sn as j,Wx as k,Br as l,_u as m,ei as n,ii as o,Lu as p,$t as q,vt as r,Uv as s,jn as t,Gx as u,J as v,Sr as w,Ru as x,uu as y,Ln as z};
