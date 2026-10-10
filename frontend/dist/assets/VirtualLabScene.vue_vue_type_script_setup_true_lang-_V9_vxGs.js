import{s as Bs,o as Jh,m as jh,r as Ct,d as sf,c as Tt,y as Rc,a as ke,f as lr,F as oi,k as gs,e as nn,w as rf,t as qt,C as cr,g as Cc,p as Pc,K as af,A as of,z as lf,h as Ic,n as cf,j as At}from"./index-Dn5qnRdN.js";import{_ as hf}from"./AppIcon.vue_vue_type_script_setup_true_lang-DCvM9n_S.js";function cx(){const i=Ct(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return Bs(i,r=>{document.body.style.overflow=r?"hidden":""}),Jh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),jh(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xl="185",Gs={ROTATE:0,DOLLY:1,PAN:2},zs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},uf=0,Dc=1,ff=2,Tr=1,df=2,Sr=3,Ui=0,vn=1,Zt=2,Ii=0,Ws=1,Lc=2,Nc=3,Uc=4,pf=5,ss=100,mf=101,gf=102,_f=103,vf=104,xf=200,yf=201,Mf=202,bf=203,Zo=204,$o=205,Sf=206,wf=207,Ef=208,Tf=209,Af=210,Rf=211,Cf=212,Pf=213,If=214,Ko=0,Jo=1,jo=2,qs=3,Qo=4,el=5,tl=6,nl=7,Yl=0,Df=1,Lf=2,mi=0,Qh=1,eu=2,tu=3,ql=4,nu=5,iu=6,su=7,ru=300,cs=301,Zs=302,ja=303,Qa=304,Ya=306,gn=1e3,Pi=1001,il=1002,dn=1003,Nf=1004,Wr=1005,_n=1006,eo=1007,as=1008,Vn=1009,au=1010,ou=1011,Pr=1012,Zl=1013,xi=1014,ni=1015,Fi=1016,$l=1017,Kl=1018,Ir=1020,lu=35902,cu=35899,hu=1021,uu=1022,ii=1023,Oi=1026,os=1027,Jl=1028,jl=1029,hs=1030,Ql=1031,ec=1033,Ta=33776,Aa=33777,Ra=33778,Ca=33779,sl=35840,rl=35841,al=35842,ol=35843,ll=36196,cl=37492,hl=37496,ul=37488,fl=37489,Da=37490,dl=37491,pl=37808,ml=37809,gl=37810,_l=37811,vl=37812,xl=37813,yl=37814,Ml=37815,bl=37816,Sl=37817,wl=37818,El=37819,Tl=37820,Al=37821,Rl=36492,Cl=36494,Pl=36495,Il=36283,Dl=36284,La=36285,Ll=36286,Uf=3200,Na=0,Ff=1,$i="",cn="srgb",Ua="srgb-linear",Fa="linear",Gt="srgb",_s=7680,Fc=519,Of=512,Bf=513,kf=514,tc=515,zf=516,Vf=517,nc=518,Hf=519,Nl=35044,Oc="300 es",di=2e3,Dr=2001;function Gf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Oa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wf(){const i=Oa("canvas");return i.style.display="block",i}const Bc={};function Ba(...i){const e="THREE."+i.shift();console.log(e,...i)}function fu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ut(...i){i=fu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Pt(...i){i=fu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Xs(...i){const e=i.join(" ");e in Bc||(Bc[e]=!0,ut(...i))}function Xf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Yf={[Ko]:Jo,[jo]:tl,[Qo]:nl,[qs]:el,[Jo]:Ko,[tl]:jo,[nl]:Qo,[el]:qs};class ji{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pa=Math.PI/180,Ul=180/Math.PI;function Di(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pn[i&255]+pn[i>>8&255]+pn[i>>16&255]+pn[i>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[t&63|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function wt(i,e,t){return Math.max(e,Math.min(t,i))}function qf(i,e){return(i%e+e)%e}function to(i,e,t){return(1-t)*i+t*e}function fi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Zf={DEG2RAD:Pa},gc=class gc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};gc.prototype.isVector2=!0;let K=gc;class Bi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],_=r[a+2],g=r[a+3];if(u!==g||o!==f||l!==d||h!==_){let m=o*f+l*d+h*_+u*g;m<0&&(f=-f,d=-d,_=-_,g=-g,m=-m);let p=1-c;if(m<.9995){const x=Math.acos(m),y=Math.sin(x);p=Math.sin(p*x)/y,c=Math.sin(c*x)/y,o=o*p+f*c,l=l*p+d*c,h=h*p+_*c,u=u*p+g*c}else{o=o*p+f*c,l=l*p+d*c,h=h*p+_*c,u=u*p+g*c;const x=1/Math.sqrt(o*o+l*l+h*h+u*u);o*=x,l*=x,h*=x,u*=x}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],_=r[a+3];return e[t]=c*_+h*u+o*d-l*f,e[t+1]=o*_+h*f+l*u-c*d,e[t+2]=l*_+h*d+c*f-o*u,e[t+3]=h*_-c*u-o*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),h=c(s/2),u=c(r/2),f=o(n/2),d=o(s/2),_=o(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u-f*d*_;break;case"YXZ":this._x=f*h*u+l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u+f*d*_;break;case"ZXY":this._x=f*h*u-l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u-f*d*_;break;case"ZYX":this._x=f*h*u-l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u+f*d*_;break;case"YZX":this._x=f*h*u+l*d*_,this._y=l*d*u+f*h*_,this._z=l*h*_-f*d*u,this._w=l*h*u-f*d*_;break;case"XZY":this._x=f*h*u-l*d*_,this._y=l*d*u-f*h*_,this._z=l*h*_+f*d*u,this._w=l*h*u+f*d*_;break;default:ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-o)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>c&&n>u){const d=2*Math.sqrt(1+n-c-u);this._w=(h-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(c>u){const d=2*Math.sqrt(1+c-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+h)/d}else{const d=2*Math.sqrt(1+u-n-c);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(o+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,h=t._w;return this._x=n*h+a*c+s*l-r*o,this._y=s*h+a*o+r*c-n*l,this._z=r*h+a*l+n*o-s*c,this._w=a*h-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const _c=class _c{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),h=2*(c*t-r*s),u=2*(r*n-a*t);return this.x=t+o*l+a*u-c*h,this.y=n+o*h+c*l-r*u,this.z=s+o*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};_c.prototype.isVector3=!0;let P=_c;const no=new P,kc=new Bi,vc=class vc{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],_=n[8],g=s[0],m=s[3],p=s[6],x=s[1],y=s[4],M=s[7],E=s[2],S=s[5],T=s[8];return r[0]=a*g+c*x+o*E,r[3]=a*m+c*y+o*S,r[6]=a*p+c*M+o*T,r[1]=l*g+h*x+u*E,r[4]=l*m+h*y+u*S,r[7]=l*p+h*M+u*T,r[2]=f*g+d*x+_*E,r[5]=f*m+d*y+_*S,r[8]=f*p+d*M+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-n*r*h+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],u=h*a-c*l,f=c*o-h*r,d=l*r-a*o,_=t*u+n*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=u*g,e[1]=(s*l-h*n)*g,e[2]=(c*n-s*a)*g,e[3]=f*g,e[4]=(h*t-s*o)*g,e[5]=(s*r-c*t)*g,e[6]=d*g,e[7]=(n*o-l*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(io.makeScale(e,t)),this}rotate(e){return Xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(io.makeRotation(-e)),this}translate(e,t){return Xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};vc.prototype.isMatrix3=!0;let xt=vc;const io=new xt,zc=new xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vc=new xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $f(){const i={enabled:!0,workingColorSpace:Ua,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Gt&&(s.r=Li(s.r),s.g=Li(s.g),s.b=Li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Gt&&(s.r=Ys(s.r),s.g=Ys(s.g),s.b=Ys(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===$i?Fa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ua]:{primaries:e,whitePoint:n,transfer:Fa,toXYZ:zc,fromXYZ:Vc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:cn},outputColorSpaceConfig:{drawingBufferColorSpace:cn}},[cn]:{primaries:e,whitePoint:n,transfer:Gt,toXYZ:zc,fromXYZ:Vc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:cn}}}),i}const Dt=$f();function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vs;class Kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vs===void 0&&(vs=Oa("canvas")),vs.width=e.width,vs.height=e.height;const s=vs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=vs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Oa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Li(t[n]/255)*255):t[n]=Li(t[n]);return{data:t,width:e.width,height:e.height}}else return ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jf=0;class ic{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(so(s[a].image)):r.push(so(s[a]))}else r=so(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function so(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ut("Texture: Unable to serialize Texture."),{})}let jf=0;const ro=new P;class xn extends ji{constructor(e=xn.DEFAULT_IMAGE,t=xn.DEFAULT_MAPPING,n=Pi,s=Pi,r=_n,a=as,c=ii,o=Vn,l=xn.DEFAULT_ANISOTROPY,h=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Di(),this.name="",this.source=new ic(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ro).x}get height(){return this.source.getSize(ro).y}get depth(){return this.source.getSize(ro).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ut(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ut(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ru)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gn:e.x=e.x-Math.floor(e.x);break;case Pi:e.x=e.x<0?0:1;break;case il:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gn:e.y=e.y-Math.floor(e.y);break;case Pi:e.y=e.y<0?0:1;break;case il:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=ru;xn.DEFAULT_ANISOTROPY=1;const xc=class xc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],h=o[4],u=o[8],f=o[1],d=o[5],_=o[9],g=o[2],m=o[6],p=o[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(_+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,M=(d+1)/2,E=(p+1)/2,S=(h+f)/4,T=(u+g)/4,v=(_+m)/4;return y>M&&y>E?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=S/n,r=T/n):M>E?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=S/s,r=v/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=T/r,s=v/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-_)*(m-_)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(u-g)/x,this.z=(f-h)/x,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this.w=wt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this.w=wt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(wt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xc.prototype.isVector4=!0;let Qt=xc;class Qf extends ji{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qt(0,0,e,t),this.scissorTest=!1,this.viewport=new Qt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new xn(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:_n,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ic(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends Qf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class du extends xn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ed extends xn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xa=class Xa{constructor(e,t,n,s,r,a,c,o,l,h,u,f,d,_,g,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,h,u,f,d,_,g,m)}set(e,t,n,s,r,a,c,o,l,h,u,f,d,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=o,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xa().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/xs.setFromMatrixColumn(e,0).length(),r=1/xs.setFromMatrixColumn(e,1).length(),a=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,d=a*u,_=c*h,g=c*u;t[0]=o*h,t[4]=-o*u,t[8]=l,t[1]=d+_*l,t[5]=f-g*l,t[9]=-c*o,t[2]=g-f*l,t[6]=_+d*l,t[10]=a*o}else if(e.order==="YXZ"){const f=o*h,d=o*u,_=l*h,g=l*u;t[0]=f+g*c,t[4]=_*c-d,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-c,t[2]=d*c-_,t[6]=g+f*c,t[10]=a*o}else if(e.order==="ZXY"){const f=o*h,d=o*u,_=l*h,g=l*u;t[0]=f-g*c,t[4]=-a*u,t[8]=_+d*c,t[1]=d+_*c,t[5]=a*h,t[9]=g-f*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const f=a*h,d=a*u,_=c*h,g=c*u;t[0]=o*h,t[4]=_*l-d,t[8]=f*l+g,t[1]=o*u,t[5]=g*l+f,t[9]=d*l-_,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const f=a*o,d=a*l,_=c*o,g=c*l;t[0]=o*h,t[4]=g-f*u,t[8]=_*u+d,t[1]=u,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=d*u+_,t[10]=f-g*u}else if(e.order==="XZY"){const f=a*o,d=a*l,_=c*o,g=c*l;t[0]=o*h,t[4]=-u,t[8]=l*h,t[1]=f*u+g,t[5]=a*h,t[9]=d*u-_,t[2]=_*u-d,t[6]=c*h,t[10]=g*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(td,e,nd)}lookAt(e,t,n){const s=this.elements;return Fn.subVectors(e,t),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),Hi.crossVectors(n,Fn),Hi.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),Hi.crossVectors(n,Fn)),Hi.normalize(),Xr.crossVectors(Fn,Hi),s[0]=Hi.x,s[4]=Xr.x,s[8]=Fn.x,s[1]=Hi.y,s[5]=Xr.y,s[9]=Fn.y,s[2]=Hi.z,s[6]=Xr.z,s[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],_=n[2],g=n[6],m=n[10],p=n[14],x=n[3],y=n[7],M=n[11],E=n[15],S=s[0],T=s[4],v=s[8],A=s[12],I=s[1],N=s[5],O=s[9],Z=s[13],J=s[2],V=s[6],q=s[10],X=s[14],ie=s[3],oe=s[7],de=s[11],ce=s[15];return r[0]=a*S+c*I+o*J+l*ie,r[4]=a*T+c*N+o*V+l*oe,r[8]=a*v+c*O+o*q+l*de,r[12]=a*A+c*Z+o*X+l*ce,r[1]=h*S+u*I+f*J+d*ie,r[5]=h*T+u*N+f*V+d*oe,r[9]=h*v+u*O+f*q+d*de,r[13]=h*A+u*Z+f*X+d*ce,r[2]=_*S+g*I+m*J+p*ie,r[6]=_*T+g*N+m*V+p*oe,r[10]=_*v+g*O+m*q+p*de,r[14]=_*A+g*Z+m*X+p*ce,r[3]=x*S+y*I+M*J+E*ie,r[7]=x*T+y*N+M*V+E*oe,r[11]=x*v+y*O+M*q+E*de,r[15]=x*A+y*Z+M*X+E*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],_=e[3],g=e[7],m=e[11],p=e[15],x=o*d-l*f,y=c*d-l*u,M=c*f-o*u,E=a*d-l*h,S=a*f-o*h,T=a*u-c*h;return t*(g*x-m*y+p*M)-n*(_*x-m*E+p*S)+s*(_*y-g*E+p*T)-r*(_*M-g*S+m*T)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-n*(r*h-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],_=e[12],g=e[13],m=e[14],p=e[15],x=t*c-n*a,y=t*o-s*a,M=t*l-r*a,E=n*o-s*c,S=n*l-r*c,T=s*l-r*o,v=h*g-u*_,A=h*m-f*_,I=h*p-d*_,N=u*m-f*g,O=u*p-d*g,Z=f*p-d*m,J=x*Z-y*O+M*N+E*I-S*A+T*v;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/J;return e[0]=(c*Z-o*O+l*N)*V,e[1]=(s*O-n*Z-r*N)*V,e[2]=(g*T-m*S+p*E)*V,e[3]=(f*S-u*T-d*E)*V,e[4]=(o*I-a*Z-l*A)*V,e[5]=(t*Z-s*I+r*A)*V,e[6]=(m*M-_*T-p*y)*V,e[7]=(h*T-f*M+d*y)*V,e[8]=(a*O-c*I+l*v)*V,e[9]=(n*I-t*O-r*v)*V,e[10]=(_*S-g*M+p*x)*V,e[11]=(u*M-h*S-d*x)*V,e[12]=(c*A-a*N-o*v)*V,e[13]=(t*N-n*A+s*v)*V,e[14]=(g*y-_*E-m*x)*V,e[15]=(h*E-u*y+f*x)*V,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,h=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,h*c+n,h*o-s*a,0,l*o-s*c,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,h=a+a,u=c+c,f=r*l,d=r*h,_=r*u,g=a*h,m=a*u,p=c*u,x=o*l,y=o*h,M=o*u,E=n.x,S=n.y,T=n.z;return s[0]=(1-(g+p))*E,s[1]=(d+M)*E,s[2]=(_-y)*E,s[3]=0,s[4]=(d-M)*S,s[5]=(1-(f+p))*S,s[6]=(m+x)*S,s[7]=0,s[8]=(_+y)*T,s[9]=(m-x)*T,s[10]=(1-(f+g))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=xs.set(s[0],s[1],s[2]).length();const c=xs.set(s[4],s[5],s[6]).length(),o=xs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),jn.copy(this);const l=1/a,h=1/c,u=1/o;return jn.elements[0]*=l,jn.elements[1]*=l,jn.elements[2]*=l,jn.elements[4]*=h,jn.elements[5]*=h,jn.elements[6]*=h,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,t.setFromRotationMatrix(jn),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=di,o=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let _,g;if(o)_=r/(a-r),g=a*r/(a-r);else if(c===di)_=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(c===Dr)_=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=di,o=!1){const l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s);let _,g;if(o)_=1/(a-r),g=a/(a-r);else if(c===di)_=-2/(a-r),g=-(a+r)/(a-r);else if(c===Dr)_=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=_,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Xa.prototype.isMatrix4=!0;let zt=Xa;const xs=new P,jn=new zt,td=new P(0,0,0),nd=new P(1,1,1),Hi=new P,Xr=new P,Fn=new P,Hc=new zt,Gc=new Bi;class ki{constructor(e=0,t=0,n=0,s=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gc.setFromEuler(this),this.setFromQuaternion(Gc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class sc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let id=0;const Wc=new P,ys=new Bi,Si=new zt,Yr=new P,hr=new P,sd=new P,rd=new Bi,Xc=new P(1,0,0),Yc=new P(0,1,0),qc=new P(0,0,1),Zc={type:"added"},ad={type:"removed"},Ms={type:"childadded",child:null},ao={type:"childremoved",child:null};class sn extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DEFAULT_UP.clone();const e=new P,t=new ki,n=new Bi,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new zt},normalMatrix:{value:new xt}}),this.matrix=new zt,this.matrixWorld=new zt,this.matrixAutoUpdate=sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(Xc,e)}rotateY(e){return this.rotateOnAxis(Yc,e)}rotateZ(e){return this.rotateOnAxis(qc,e)}translateOnAxis(e,t){return Wc.copy(e).applyQuaternion(this.quaternion),this.position.add(Wc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xc,e)}translateY(e){return this.translateOnAxis(Yc,e)}translateZ(e){return this.translateOnAxis(qc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Yr.copy(e):Yr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),hr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(hr,Yr,this.up):Si.lookAt(Yr,hr,this.up),this.quaternion.setFromRotationMatrix(Si),s&&(Si.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(Si),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Pt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zc),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null):Pt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ad),ao.child=e,this.dispatchEvent(ao),ao.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zc),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,e,sd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,rd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,h=o.length;l<h;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),d=a(e.animations),_=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(c){const o=[];for(const l in c){const h=c[l];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}sn.DEFAULT_UP=new P(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class vt extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const od={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,_=.005;l.inputState.pinching&&f>d+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(od)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new vt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},qr={h:0,s:0,l:0};function lo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class yt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Dt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Dt.workingColorSpace){if(e=qf(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=lo(a,r,e+1/3),this.g=lo(a,r,e),this.b=lo(a,r,e-1/3)}return Dt.colorSpaceToWorking(this,s),this}setStyle(e,t=cn){function n(r){r!==void 0&&parseFloat(r)<1&&ut("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ut("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ut("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const n=pu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ut("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=Ys(e.r),this.g=Ys(e.g),this.b=Ys(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return Dt.workingToColorSpace(mn.copy(this),e),Math.round(wt(mn.r*255,0,255))*65536+Math.round(wt(mn.g*255,0,255))*256+Math.round(wt(mn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dt.workingColorSpace){Dt.workingToColorSpace(mn.copy(this),t);const n=mn.r,s=mn.g,r=mn.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const h=(c+a)/2;if(c===a)o=0,l=0;else{const u=a-c;switch(l=h<=.5?u/(a+c):u/(2-a-c),a){case n:o=(s-r)/u+(s<r?6:0);break;case s:o=(r-n)/u+2;break;case r:o=(n-s)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=Dt.workingColorSpace){return Dt.workingToColorSpace(mn.copy(this),t),e.r=mn.r,e.g=mn.g,e.b=mn.b,e}getStyle(e=cn){Dt.workingToColorSpace(mn.copy(this),e);const t=mn.r,n=mn.g,s=mn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Gi),this.setHSL(Gi.h+e,Gi.s+t,Gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gi),e.getHSL(qr);const n=to(Gi.h,qr.h,t),s=to(Gi.s,qr.s,t),r=to(Gi.l,qr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new yt;yt.NAMES=pu;class Ar{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new yt(e),this.near=t,this.far=n}clone(){return new Ar(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class mu extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Qn=new P,wi=new P,co=new P,Ei=new P,bs=new P,Ss=new P,$c=new P,ho=new P,uo=new P,fo=new P,po=new Qt,mo=new Qt,go=new Qt;class $n{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Qn.subVectors(e,t),s.cross(Qn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Qn.subVectors(s,t),wi.subVectors(n,t),co.subVectors(e,t);const a=Qn.dot(Qn),c=Qn.dot(wi),o=Qn.dot(co),l=wi.dot(wi),h=wi.dot(co),u=a*l-c*c;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*o-c*h)*f,_=(a*h-c*o)*f;return r.set(1-d-_,_,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ei)===null?!1:Ei.x>=0&&Ei.y>=0&&Ei.x+Ei.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,Ei)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,Ei.x),o.addScaledVector(a,Ei.y),o.addScaledVector(c,Ei.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return po.setScalar(0),mo.setScalar(0),go.setScalar(0),po.fromBufferAttribute(e,t),mo.fromBufferAttribute(e,n),go.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(po,r.x),a.addScaledVector(mo,r.y),a.addScaledVector(go,r.z),a}static isFrontFacing(e,t,n,s){return Qn.subVectors(n,t),wi.subVectors(e,t),Qn.cross(wi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Qn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return $n.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;bs.subVectors(s,n),Ss.subVectors(r,n),ho.subVectors(e,n);const o=bs.dot(ho),l=Ss.dot(ho);if(o<=0&&l<=0)return t.copy(n);uo.subVectors(e,s);const h=bs.dot(uo),u=Ss.dot(uo);if(h>=0&&u<=h)return t.copy(s);const f=o*u-h*l;if(f<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(bs,a);fo.subVectors(e,r);const d=bs.dot(fo),_=Ss.dot(fo);if(_>=0&&d<=_)return t.copy(r);const g=d*l-o*_;if(g<=0&&l>=0&&_<=0)return c=l/(l-_),t.copy(n).addScaledVector(Ss,c);const m=h*_-d*u;if(m<=0&&u-h>=0&&d-_>=0)return $c.subVectors(r,s),c=(u-h)/(u-h+(d-_)),t.copy(s).addScaledVector($c,c);const p=1/(m+g+f);return a=g*p,c=f*p,t.copy(n).addScaledVector(bs,a).addScaledVector(Ss,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class In{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zr.copy(n.boundingBox)),Zr.applyMatrix4(e.matrixWorld),this.union(Zr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),$r.subVectors(this.max,ur),ws.subVectors(e.a,ur),Es.subVectors(e.b,ur),Ts.subVectors(e.c,ur),Wi.subVectors(Es,ws),Xi.subVectors(Ts,Es),es.subVectors(ws,Ts);let t=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-es.z,es.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,es.z,0,-es.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-es.y,es.x,0];return!_o(t,ws,Es,Ts,$r)||(t=[1,0,0,0,1,0,0,0,1],!_o(t,ws,Es,Ts,$r))?!1:(Kr.crossVectors(Wi,Xi),t=[Kr.x,Kr.y,Kr.z],_o(t,ws,Es,Ts,$r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ti=[new P,new P,new P,new P,new P,new P,new P,new P],ei=new P,Zr=new In,ws=new P,Es=new P,Ts=new P,Wi=new P,Xi=new P,es=new P,ur=new P,$r=new P,Kr=new P,ts=new P;function _o(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ts.fromArray(i,r);const c=s.x*Math.abs(ts.x)+s.y*Math.abs(ts.y)+s.z*Math.abs(ts.z),o=e.dot(ts),l=t.dot(ts),h=n.dot(ts);if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>c)return!1}return!0}const an=new P,Jr=new K;let ld=0;class Kn extends ji{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ld++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Nl,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Jr.fromBufferAttribute(this,t),Jr.applyMatrix3(e),this.setXY(t,Jr.x,Jr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyMatrix3(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),s=Xt(s,this.array),r=Xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Nl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class gu extends Kn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _u extends Kn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rt extends Kn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const cd=new In,fr=new P,vo=new P;class js{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);const t=fr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(fr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(vo)),this.expandByPoint(fr.copy(e.center).sub(vo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hd=0;const Wn=new zt,xo=new sn,As=new P,On=new In,dr=new In,fn=new P;class rn extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gf(e)?_u:gu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new xt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,t,n){return Wn.makeTranslation(e,t,n),this.applyMatrix4(Wn),this}scale(e,t,n){return Wn.makeScale(e,t,n),this.applyMatrix4(Wn),this}lookAt(e){return xo.lookAt(e),xo.updateMatrix(),this.applyMatrix4(xo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Rt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];On.setFromBufferAttribute(r),this.morphTargetsRelative?(fn.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(fn),fn.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(fn)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new js);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];dr.setFromBufferAttribute(c),this.morphTargetsRelative?(fn.addVectors(On.min,dr.min),On.expandByPoint(fn),fn.addVectors(On.max,dr.max),On.expandByPoint(fn)):(On.expandByPoint(dr.min),On.expandByPoint(dr.max))}On.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)fn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(fn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)fn.fromBufferAttribute(c,l),o&&(As.fromBufferAttribute(e,l),fn.add(As)),s=Math.max(s,n.distanceToSquared(fn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Kn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let v=0;v<n.count;v++)c[v]=new P,o[v]=new P;const l=new P,h=new P,u=new P,f=new K,d=new K,_=new K,g=new P,m=new P;function p(v,A,I){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,I),f.fromBufferAttribute(r,v),d.fromBufferAttribute(r,A),_.fromBufferAttribute(r,I),h.sub(l),u.sub(l),d.sub(f),_.sub(f);const N=1/(d.x*_.y-_.x*d.y);isFinite(N)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(u,-d.y).multiplyScalar(N),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-_.x).multiplyScalar(N),c[v].add(g),c[A].add(g),c[I].add(g),o[v].add(m),o[A].add(m),o[I].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,A=x.length;v<A;++v){const I=x[v],N=I.start,O=I.count;for(let Z=N,J=N+O;Z<J;Z+=3)p(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const y=new P,M=new P,E=new P,S=new P;function T(v){E.fromBufferAttribute(s,v),S.copy(E);const A=c[v];y.copy(A),y.sub(E.multiplyScalar(E.dot(A))).normalize(),M.crossVectors(S,A);const N=M.dot(o[v])<0?-1:1;a.setXYZW(v,y.x,y.y,y.z,N)}for(let v=0,A=x.length;v<A;++v){const I=x[v],N=I.start,O=I.count;for(let Z=N,J=N+O;Z<J;Z+=3)T(e.getX(Z+0)),T(e.getX(Z+1)),T(e.getX(Z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Kn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,a=new P,c=new P,o=new P,l=new P,h=new P,u=new P;if(e)for(let f=0,d=e.count;f<d;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),c.fromBufferAttribute(n,_),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),c.add(h),o.add(h),l.add(h),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)fn.fromBufferAttribute(e,t),fn.normalize(),e.setXYZ(t,fn.x,fn.y,fn.z)}toNonIndexed(){function e(c,o){const l=c.array,h=c.itemSize,u=c.normalized,f=new l.constructor(o.length*h);let d=0,_=0;for(let g=0,m=o.length;g<m;g++){c.isInterleavedBufferAttribute?d=o[g]*c.data.stride+c.offset:d=o[g]*h;for(let p=0;p<h;p++)f[_++]=l[d++]}return new Kn(f,h,u)}if(this.index===null)return ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rn,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=e(f,n);o.push(d)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[o]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ud{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Nl,this.updateRanges=[],this.version=0,this.uuid=Di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Mn=new P;class ka{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix4(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyNormalMatrix(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.transformDirection(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=fi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=fi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=fi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=fi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=fi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),s=Xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),s=Xt(s,this.array),r=Xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ba("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Kn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ka(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ba("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let fd=0;class Qi extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=Ws,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zo,this.blendDst=$o,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_s,this.stencilZFail=_s,this.stencilZPass=_s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ut(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ut(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(n.blending=this.blending),this.side!==Ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zo&&(n.blendSrc=this.blendSrc),this.blendDst!==$o&&(n.blendDst=this.blendDst),this.blendEquation!==ss&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new yt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new K().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ls extends Qi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Rs;const pr=new P,Cs=new P,Ps=new P,Is=new K,mr=new K,vu=new zt,jr=new P,gr=new P,Qr=new P,Kc=new K,yo=new K,Jc=new K;class wn extends sn{constructor(e=new ls){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new rn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ud(t,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new ka(n,3,0,!1)),Rs.setAttribute("uv",new ka(n,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new K(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Pt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),vu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Ps.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ea(jr.set(-.5,-.5,0),Ps,a,Cs,s,r),ea(gr.set(.5,-.5,0),Ps,a,Cs,s,r),ea(Qr.set(.5,.5,0),Ps,a,Cs,s,r),Kc.set(0,0),yo.set(1,0),Jc.set(1,1);let c=e.ray.intersectTriangle(jr,gr,Qr,!1,pr);if(c===null&&(ea(gr.set(-.5,.5,0),Ps,a,Cs,s,r),yo.set(0,1),c=e.ray.intersectTriangle(jr,Qr,gr,!1,pr),c===null))return;const o=e.ray.origin.distanceTo(pr);o<e.near||o>e.far||t.push({distance:o,point:pr.clone(),uv:$n.getInterpolation(pr,jr,gr,Qr,Kc,yo,Jc,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ea(i,e,t,n,s,r){Is.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(mr.x=r*Is.x-s*Is.y,mr.y=s*Is.x+r*Is.y):mr.copy(Is),i.copy(e),i.x+=mr.x,i.y+=mr.y,i.applyMatrix4(vu)}const Ai=new P,Mo=new P,ta=new P,Yi=new P,bo=new P,na=new P,So=new P;class qa{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,t),Ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Mo.copy(e).add(t).multiplyScalar(.5),ta.copy(t).sub(e).normalize(),Yi.copy(this.origin).sub(Mo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ta),c=Yi.dot(this.direction),o=-Yi.dot(ta),l=Yi.lengthSq(),h=Math.abs(1-a*a);let u,f,d,_;if(h>0)if(u=a*o-c,f=a*c-o,_=r*h,u>=0)if(f>=-_)if(f<=_){const g=1/h;u*=g,f*=g,d=u*(u+a*f+2*c)+f*(a*u+f+2*o)+l}else f=r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;else f=-r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;else f<=-_?(u=Math.max(0,-(-a*r+c)),f=u>0?-r:Math.min(Math.max(-r,-o),r),d=-u*u+f*(f+2*o)+l):f<=_?(u=0,f=Math.min(Math.max(-r,-o),r),d=f*(f+2*o)+l):(u=Math.max(0,-(a*r+c)),f=u>0?r:Math.min(Math.max(-r,-o),r),d=-u*u+f*(f+2*o)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Mo).addScaledVector(ta,f),d}intersectSphere(e,t){Ai.subVectors(e.center,this.origin);const n=Ai.dot(this.direction),s=Ai.dot(Ai)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(c=(e.min.z-f.z)*u,o=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,o=(e.min.z-f.z)*u),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,t,n,s,r){bo.subVectors(t,e),na.subVectors(n,e),So.crossVectors(bo,na);let a=this.direction.dot(So),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Yi.subVectors(this.origin,e);const o=c*this.direction.dot(na.crossVectors(Yi,na));if(o<0)return null;const l=c*this.direction.dot(bo.cross(Yi));if(l<0||o+l>a)return null;const h=-c*Yi.dot(So);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pi extends Qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const jc=new zt,ns=new qa,ia=new js,Qc=new P,sa=new P,ra=new P,aa=new P,wo=new P,oa=new P,eh=new P,la=new P;class le extends sn{constructor(e=new rn,t=new pi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){oa.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const h=c[o],u=r[o];h!==0&&(wo.fromBufferAttribute(u,e),a?oa.addScaledVector(wo,h):oa.addScaledVector(wo.sub(t),h))}t.add(oa)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(r),ns.copy(e.ray).recast(e.near),!(ia.containsPoint(ns.origin)===!1&&(ns.intersectSphere(ia,Qc)===null||ns.origin.distanceToSquared(Qc)>(e.far-e.near)**2))&&(jc.copy(r).invert(),ns.copy(e.ray).applyMatrix4(jc),!(n.boundingBox!==null&&ns.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ns)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=a[m.materialIndex],x=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=x,E=y;M<E;M+=3){const S=c.getX(M),T=c.getX(M+1),v=c.getX(M+2);s=ca(this,p,e,n,l,h,u,S,T,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(c.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const x=c.getX(m),y=c.getX(m+1),M=c.getX(m+2);s=ca(this,a,e,n,l,h,u,x,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=a[m.materialIndex],x=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=x,E=y;M<E;M+=3){const S=M,T=M+1,v=M+2;s=ca(this,p,e,n,l,h,u,S,T,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const x=m,y=m+1,M=m+2;s=ca(this,a,e,n,l,h,u,x,y,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function dd(i,e,t,n,s,r,a,c){let o;if(e.side===vn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===Ui,c),o===null)return null;la.copy(c),la.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(la);return l<t.near||l>t.far?null:{distance:l,point:la.clone(),object:i}}function ca(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,sa),i.getVertexPosition(o,ra),i.getVertexPosition(l,aa);const h=dd(i,e,t,n,sa,ra,aa,eh);if(h){const u=new P;$n.getBarycoord(eh,sa,ra,aa,u),s&&(h.uv=$n.getInterpolatedAttribute(s,c,o,l,u,new K)),r&&(h.uv1=$n.getInterpolatedAttribute(r,c,o,l,u,new K)),a&&(h.normal=$n.getInterpolatedAttribute(a,c,o,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:o,c:l,normal:new P,materialIndex:0};$n.getNormal(sa,ra,aa,f.normal),h.face=f,h.barycoord=u}return h}class xu extends xn{constructor(e=null,t=1,n=1,s,r,a,c,o,l=dn,h=dn,u,f){super(null,a,c,o,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class th extends Kn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ds=new zt,nh=new zt,ha=[],ih=new In,pd=new zt,_r=new le,vr=new js;class yu extends le{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new th(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,pd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new In),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),ih.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(ih)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new js),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),vr.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vr.copy(this.boundingSphere),vr.applyMatrix4(n),e.ray.intersectsSphere(vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ds),nh.multiplyMatrices(n,Ds),_r.matrixWorld=nh,_r.raycast(e,ha);for(let a=0,c=ha.length;a<c;a++){const o=ha[a];o.instanceId=r,o.object=this,t.push(o)}ha.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new th(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new xu(new Float32Array(s*this.count),s,this.count,Jl,ni));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Eo=new P,md=new P,gd=new xt;class Ci{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Eo.subVectors(n,t).cross(md.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Eo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gd.getNormalMatrix(e),s=this.coplanarPoint(Eo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const is=new js,_d=new K(.5,.5),ua=new P;class rc{constructor(e=new Ci,t=new Ci,n=new Ci,s=new Ci,r=new Ci,a=new Ci){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=di,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],_=r[8],g=r[9],m=r[10],p=r[11],x=r[12],y=r[13],M=r[14],E=r[15];if(s[0].setComponents(l-a,d-h,p-_,E-x).normalize(),s[1].setComponents(l+a,d+h,p+_,E+x).normalize(),s[2].setComponents(l+c,d+u,p+g,E+y).normalize(),s[3].setComponents(l-c,d-u,p-g,E-y).normalize(),n)s[4].setComponents(o,f,m,M).normalize(),s[5].setComponents(l-o,d-f,p-m,E-M).normalize();else if(s[4].setComponents(l-o,d-f,p-m,E-M).normalize(),t===di)s[5].setComponents(l+o,d+f,p+m,E+M).normalize();else if(t===Dr)s[5].setComponents(o,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(e){is.center.set(0,0,0);const t=_d.distanceTo(e.center);return is.radius=.7071067811865476+t,is.applyMatrix4(e.matrixWorld),this.intersectsSphere(is)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ua.x=s.normal.x>0?e.max.x:e.min.x,ua.y=s.normal.y>0?e.max.y:e.min.y,ua.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ua)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ac extends Qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const za=new P,Va=new P,sh=new zt,xr=new qa,fa=new js,To=new P,rh=new P;class Mu extends sn{constructor(e=new rn,t=new ac){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)za.fromBufferAttribute(t,s-1),Va.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=za.distanceTo(Va);e.setAttribute("lineDistance",new Rt(n,1))}else ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(s),fa.radius+=r,e.ray.intersectsSphere(fa)===!1)return;sh.copy(s).invert(),xr.copy(e.ray).applyMatrix4(sh);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let g=d,m=_-1;g<m;g+=l){const p=h.getX(g),x=h.getX(g+1),y=da(this,e,xr,o,p,x,g);y&&t.push(y)}if(this.isLineLoop){const g=h.getX(_-1),m=h.getX(d),p=da(this,e,xr,o,g,m,_-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let g=d,m=_-1;g<m;g+=l){const p=da(this,e,xr,o,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=da(this,e,xr,o,_-1,d,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function da(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(za.fromBufferAttribute(c,s),Va.fromBufferAttribute(c,r),t.distanceSqToSegment(za,Va,To,rh)>n)return;To.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(To);if(!(l<e.near||l>e.far))return{distance:l,point:rh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class bu extends xn{constructor(e=[],t=cs,n,s,r,a,c,o,l,h){super(e,t,n,s,r,a,c,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qs extends xn{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $s extends xn{constructor(e,t,n=xi,s,r,a,c=dn,o=dn,l,h=Oi,u=1){if(h!==Oi&&h!==os)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,a,c,o,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ic(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class vd extends $s{constructor(e,t=xi,n=cs,s,r,a=dn,c=dn,o,l=Oi){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,c,o,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Su extends xn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Se extends rn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],h=[],u=[];let f=0,d=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(u,2));function _(g,m,p,x,y,M,E,S,T,v,A){const I=M/T,N=E/v,O=M/2,Z=E/2,J=S/2,V=T+1,q=v+1;let X=0,ie=0;const oe=new P;for(let de=0;de<q;de++){const ce=de*N-Z;for(let ye=0;ye<V;ye++){const We=ye*I-O;oe[g]=We*x,oe[m]=ce*y,oe[p]=J,l.push(oe.x,oe.y,oe.z),oe[g]=0,oe[m]=0,oe[p]=S>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(ye/T),u.push(1-de/v),X+=1}}for(let de=0;de<v;de++)for(let ce=0;ce<T;ce++){const ye=f+ce+V*de,We=f+ce+V*(de+1),ot=f+(ce+1)+V*(de+1),lt=f+(ce+1)+V*de;o.push(ye,We,lt),o.push(We,ot,lt),ie+=6}c.addGroup(d,ie,A),d+=ie,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Se(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Pn extends rn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new P,h=new K;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const d=n+u/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),c.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,o.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class F extends rn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let _=0;const g=[],m=n/2;let p=0;x(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Rt(u,3)),this.setAttribute("normal",new Rt(f,3)),this.setAttribute("uv",new Rt(d,2));function x(){const M=new P,E=new P;let S=0;const T=(t-e)/n;for(let v=0;v<=r;v++){const A=[],I=v/r,N=I*(t-e)+e;for(let O=0;O<=s;O++){const Z=O/s,J=Z*o+c,V=Math.sin(J),q=Math.cos(J);E.x=N*V,E.y=-I*n+m,E.z=N*q,u.push(E.x,E.y,E.z),M.set(V,T,q).normalize(),f.push(M.x,M.y,M.z),d.push(Z,1-I),A.push(_++)}g.push(A)}for(let v=0;v<s;v++)for(let A=0;A<r;A++){const I=g[A][v],N=g[A+1][v],O=g[A+1][v+1],Z=g[A][v+1];(e>0||A!==0)&&(h.push(I,N,Z),S+=3),(t>0||A!==r-1)&&(h.push(N,O,Z),S+=3)}l.addGroup(p,S,0),p+=S}function y(M){const E=_,S=new K,T=new P;let v=0;const A=M===!0?e:t,I=M===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,m*I,0),f.push(0,I,0),d.push(.5,.5),_++;const N=_;for(let O=0;O<=s;O++){const J=O/s*o+c,V=Math.cos(J),q=Math.sin(J);T.x=A*q,T.y=m*I,T.z=A*V,u.push(T.x,T.y,T.z),f.push(0,I,0),S.x=V*.5+.5,S.y=q*.5*I+.5,d.push(S.x,S.y),_++}for(let O=0;O<s;O++){const Z=E+O,J=N+O;M===!0?h.push(J,J+1,Z):h.push(J+1,J,Z),v+=3}l.addGroup(p,v,M===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new F(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class kn extends F{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new kn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class oc extends rn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),h(),this.setAttribute("position",new Rt(r,3)),this.setAttribute("normal",new Rt(r.slice(),3)),this.setAttribute("uv",new Rt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(x){const y=new P,M=new P,E=new P;for(let S=0;S<t.length;S+=3)d(t[S+0],y),d(t[S+1],M),d(t[S+2],E),o(y,M,E,x)}function o(x,y,M,E){const S=E+1,T=[];for(let v=0;v<=S;v++){T[v]=[];const A=x.clone().lerp(M,v/S),I=y.clone().lerp(M,v/S),N=S-v;for(let O=0;O<=N;O++)O===0&&v===S?T[v][O]=A:T[v][O]=A.clone().lerp(I,O/N)}for(let v=0;v<S;v++)for(let A=0;A<2*(S-v)-1;A++){const I=Math.floor(A/2);A%2===0?(f(T[v][I+1]),f(T[v+1][I]),f(T[v][I])):(f(T[v][I+1]),f(T[v+1][I+1]),f(T[v+1][I]))}}function l(x){const y=new P;for(let M=0;M<r.length;M+=3)y.x=r[M+0],y.y=r[M+1],y.z=r[M+2],y.normalize().multiplyScalar(x),r[M+0]=y.x,r[M+1]=y.y,r[M+2]=y.z}function h(){const x=new P;for(let y=0;y<r.length;y+=3){x.x=r[y+0],x.y=r[y+1],x.z=r[y+2];const M=m(x)/2/Math.PI+.5,E=p(x)/Math.PI+.5;a.push(M,1-E)}_(),u()}function u(){for(let x=0;x<a.length;x+=6){const y=a[x+0],M=a[x+2],E=a[x+4],S=Math.max(y,M,E),T=Math.min(y,M,E);S>.9&&T<.1&&(y<.2&&(a[x+0]+=1),M<.2&&(a[x+2]+=1),E<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function d(x,y){const M=x*3;y.x=e[M+0],y.y=e[M+1],y.z=e[M+2]}function _(){const x=new P,y=new P,M=new P,E=new P,S=new K,T=new K,v=new K;for(let A=0,I=0;A<r.length;A+=9,I+=6){x.set(r[A+0],r[A+1],r[A+2]),y.set(r[A+3],r[A+4],r[A+5]),M.set(r[A+6],r[A+7],r[A+8]),S.set(a[I+0],a[I+1]),T.set(a[I+2],a[I+3]),v.set(a[I+4],a[I+5]),E.copy(x).add(y).add(M).divideScalar(3);const N=m(E);g(S,I+0,x,N),g(T,I+2,y,N),g(v,I+4,M,N)}}function g(x,y,M,E){E<0&&x.x===1&&(a[y]=x.x-1),M.x===0&&M.z===0&&(a[y]=E/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.vertices,e.indices,e.radius,e.detail)}}class lc extends oc{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new lc(e.radius,e.detail)}}class ri{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ut("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new K:new P);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new P,s=[],r=[],a=[],c=new P,o=new zt;for(let d=0;d<=e;d++){const _=d/e;s[d]=this.getTangentAt(_,new P)}r[0]=new P,a[0]=new P;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();const _=Math.acos(wt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(o.makeRotationAxis(c,_))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(wt(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let _=1;_<=e;_++)r[_].applyMatrix4(o.makeRotationAxis(s[_],d*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class cc extends ri{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new K){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=o-this.aX,d=l-this.aY;o=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class xd extends cc{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function hc(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,h,u){let f=(a-r)/l-(c-r)/(l+h)+(c-a)/h,d=(c-a)/h-(o-a)/(h+u)+(o-c)/u;f*=h,d*=h,s(a,c,f,d)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const ah=new P,oh=new P,Ao=new hc,Ro=new hc,Co=new hc;class Vs extends ri{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,h;this.closed||c>0?l=s[(c-1)%r]:(oh.subVectors(s[0],s[1]).add(s[0]),l=oh);const u=s[c%r],f=s[(c+1)%r];if(this.closed||c+2<r?h=s[(c+2)%r]:(ah.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ah),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),Ao.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,_,g,m),Ro.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,_,g,m),Co.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,_,g,m)}else this.curveType==="catmullrom"&&(Ao.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Ro.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Co.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Ao.calc(o),Ro.calc(o),Co.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function lh(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function yd(i,e){const t=1-i;return t*t*e}function Md(i,e){return 2*(1-i)*i*e}function bd(i,e){return i*i*e}function Rr(i,e,t,n){return yd(i,e)+Md(i,t)+bd(i,n)}function Sd(i,e){const t=1-i;return t*t*t*e}function wd(i,e){const t=1-i;return 3*t*t*i*e}function Ed(i,e){return 3*(1-i)*i*i*e}function Td(i,e){return i*i*i*e}function Cr(i,e,t,n,s){return Sd(i,e)+wd(i,t)+Ed(i,n)+Td(i,s)}class wu extends ri{constructor(e=new K,t=new K,n=new K,s=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new K){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Cr(e,s.x,r.x,a.x,c.x),Cr(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ad extends ri{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Cr(e,s.x,r.x,a.x,c.x),Cr(e,s.y,r.y,a.y,c.y),Cr(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Eu extends ri{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new K){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rd extends ri{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Tu extends ri{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Rr(e,s.x,r.x,a.x),Rr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class uc extends ri{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Rr(e,s.x,r.x,a.x),Rr(e,s.y,r.y,a.y),Rr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Au extends ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new K){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(lh(c,o.x,l.x,h.x,u.x),lh(c,o.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new K().fromArray(s))}return this}}var Ha=Object.freeze({__proto__:null,ArcCurve:xd,CatmullRomCurve3:Vs,CubicBezierCurve:wu,CubicBezierCurve3:Ad,EllipseCurve:cc,LineCurve:Eu,LineCurve3:Rd,QuadraticBezierCurve:Tu,QuadraticBezierCurve3:uc,SplineCurve:Au});class Cd extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ha[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const h=o[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ha[s.type]().fromJSON(s))}return this}}class Fl extends Cd{constructor(e){super(),this.type="Path",this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Eu(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Tu(this.currentPoint.clone(),new K(e,t),new K(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new wu(this.currentPoint.clone(),new K(e,t),new K(n,s),new K(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Au(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new cc(e,t,n,s,r,a,c,o);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Zi extends Fl{constructor(e){super(e),this.uuid=Di(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Fl().fromJSON(s))}return this}}function Pd(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Ru(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=Ud(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let h=c,u=o;for(let f=t;f<s;f+=t){const d=i[f],_=i[f+1];d<c&&(c=d),_<o&&(o=_),d>h&&(h=d),_>u&&(u=_)}l=Math.max(h-c,u-o),l=l!==0?32767/l:0}return Lr(r,a,t,c,o,l,0),a}function Ru(i,e,t,n,s){let r;if(s===Yd(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=ch(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=ch(a/n|0,i[a],i[a+1],r);return r&&Ks(r,r.next)&&(Ur(r),r=r.next),r}function us(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Ks(t,t.next)||en(t.prev,t,t.next)===0)){if(Ur(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Lr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&zd(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?Dd(i,n,s,r):Id(i)){e.push(o.i,i.i,l.i),Ur(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=Ld(us(i),e),Lr(i,e,t,n,s,r,2)):a===2&&Nd(i,e,t,n,s,r):Lr(us(i),e,t,n,s,r,1);break}}}function Id(i){const e=i.prev,t=i,n=i.next;if(en(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,h=Math.min(s,r,a),u=Math.min(c,o,l),f=Math.max(s,r,a),d=Math.max(c,o,l);let _=n.next;for(;_!==e;){if(_.x>=h&&_.x<=f&&_.y>=u&&_.y<=d&&wr(s,c,r,o,a,l,_.x,_.y)&&en(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Dd(i,e,t,n){const s=i.prev,r=i,a=i.next;if(en(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(c,o,l),_=Math.min(h,u,f),g=Math.max(c,o,l),m=Math.max(h,u,f),p=Ol(d,_,e,t,n),x=Ol(g,m,e,t,n);let y=i.prevZ,M=i.nextZ;for(;y&&y.z>=p&&M&&M.z<=x;){if(y.x>=d&&y.x<=g&&y.y>=_&&y.y<=m&&y!==s&&y!==a&&wr(c,h,o,u,l,f,y.x,y.y)&&en(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=d&&M.x<=g&&M.y>=_&&M.y<=m&&M!==s&&M!==a&&wr(c,h,o,u,l,f,M.x,M.y)&&en(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=g&&y.y>=_&&y.y<=m&&y!==s&&y!==a&&wr(c,h,o,u,l,f,y.x,y.y)&&en(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=x;){if(M.x>=d&&M.x<=g&&M.y>=_&&M.y<=m&&M!==s&&M!==a&&wr(c,h,o,u,l,f,M.x,M.y)&&en(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Ld(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Ks(n,s)&&Pu(n,t,t.next,s)&&Nr(n,s)&&Nr(s,n)&&(e.push(n.i,t.i,s.i),Ur(t),Ur(t.next),t=i=s),t=t.next}while(t!==i);return us(t)}function Nd(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&Gd(a,c)){let o=Iu(a,c);a=us(a,a.next),o=us(o,o.next),Lr(a,e,t,n,s,r,0),Lr(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function Ud(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=Ru(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(Hd(l))}s.sort(Fd);for(let r=0;r<s.length;r++)t=Od(s[r],t);return t}function Fd(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Od(i,e){const t=Bd(i,e);if(!t)return e;const n=Iu(t,i);return us(n,n.next),us(t,t.next)}function Bd(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Ks(i,t))return t;do{if(Ks(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&Cu(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const u=Math.abs(s-t.y)/(n-t.x);Nr(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&kd(a,t)))&&(a=t,h=u)}t=t.next}while(t!==c);return a}function kd(i,e){return en(i.prev,i,e.prev)<0&&en(e.next,i,i.next)<0}function zd(i,e,t,n){let s=i;do s.z===0&&(s.z=Ol(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Vd(s)}function Vd(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ol(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Hd(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Cu(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function wr(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&Cu(i,e,t,n,s,r,a,c)}function Gd(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Wd(i,e)&&(Nr(i,e)&&Nr(e,i)&&Xd(i,e)&&(en(i.prev,i,e.prev)||en(i,e.prev,e))||Ks(i,e)&&en(i.prev,i,i.next)>0&&en(e.prev,e,e.next)>0)}function en(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ks(i,e){return i.x===e.x&&i.y===e.y}function Pu(i,e,t,n){const s=ma(en(i,e,t)),r=ma(en(i,e,n)),a=ma(en(t,n,i)),c=ma(en(t,n,e));return!!(s!==r&&a!==c||s===0&&pa(i,t,e)||r===0&&pa(i,n,e)||a===0&&pa(t,i,n)||c===0&&pa(t,e,n))}function pa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ma(i){return i>0?1:i<0?-1:0}function Wd(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Pu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Nr(i,e){return en(i.prev,i,i.next)<0?en(i,e,i.next)>=0&&en(i,i.prev,e)>=0:en(i,e,i.prev)<0||en(i,i.next,e)<0}function Xd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Iu(i,e){const t=Bl(i.i,i.x,i.y),n=Bl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function ch(i,e,t,n){const s=Bl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ur(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Bl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Yd(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class qd{static triangulate(e,t,n=2){return Pd(e,t,n)}}class Hs{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Hs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];hh(e),uh(n,e);let a=e.length;t.forEach(hh);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,uh(n,t[o]);const c=qd.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function hh(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function uh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ri extends rn{constructor(e=new Zi([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new Rt(s,3)),this.setAttribute("uv",new Rt(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,_=t.bevelSize!==void 0?t.bevelSize:d-.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Zd;let y,M=!1,E,S,T,v;if(p){y=p.getSpacedPoints(h),M=!0,f=!1;const H=p.isCatmullRomCurve3?p.closed:!1;E=p.computeFrenetFrames(h,H),S=new P,T=new P,v=new P}f||(m=0,d=0,_=0,g=0);const A=c.extractPoints(l);let I=A.shape;const N=A.holes;if(!Hs.isClockWise(I)){I=I.reverse();for(let H=0,j=N.length;H<j;H++){const te=N[H];Hs.isClockWise(te)&&(N[H]=te.reverse())}}function Z(H){const te=10000000000000001e-36;let me=H[0];for(let xe=1;xe<=H.length;xe++){const Le=xe%H.length,Ee=H[Le],Ge=Ee.x-me.x,qe=Ee.y-me.y,B=Ge*Ge+qe*qe,dt=Math.max(Math.abs(Ee.x),Math.abs(Ee.y),Math.abs(me.x),Math.abs(me.y)),ct=te*dt*dt;if(B<=ct){H.splice(Le,1),xe--;continue}me=Ee}}Z(I),N.forEach(Z);const J=N.length,V=I;for(let H=0;H<J;H++){const j=N[H];I=I.concat(j)}function q(H,j,te){return j||Pt("ExtrudeGeometry: vec does not exist"),H.clone().addScaledVector(j,te)}const X=I.length;function ie(H,j,te){let me,xe,Le;const Ee=H.x-j.x,Ge=H.y-j.y,qe=te.x-H.x,B=te.y-H.y,dt=Ee*Ee+Ge*Ge,ct=Ee*B-Ge*qe;if(Math.abs(ct)>Number.EPSILON){const L=Math.sqrt(dt),w=Math.sqrt(qe*qe+B*B),$=j.x-Ge/L,Q=j.y+Ee/L,he=te.x-B/w,we=te.y+qe/w,Te=((he-$)*B-(we-Q)*qe)/(Ee*B-Ge*qe);me=$+Ee*Te-H.x,xe=Q+Ge*Te-H.y;const ue=me*me+xe*xe;if(ue<=2)return new K(me,xe);Le=Math.sqrt(ue/2)}else{let L=!1;Ee>Number.EPSILON?qe>Number.EPSILON&&(L=!0):Ee<-Number.EPSILON?qe<-Number.EPSILON&&(L=!0):Math.sign(Ge)===Math.sign(B)&&(L=!0),L?(me=-Ge,xe=Ee,Le=Math.sqrt(dt)):(me=Ee,xe=Ge,Le=Math.sqrt(dt/2))}return new K(me/Le,xe/Le)}const oe=[];for(let H=0,j=V.length,te=j-1,me=H+1;H<j;H++,te++,me++)te===j&&(te=0),me===j&&(me=0),oe[H]=ie(V[H],V[te],V[me]);const de=[];let ce,ye=oe.concat();for(let H=0,j=J;H<j;H++){const te=N[H];ce=[];for(let me=0,xe=te.length,Le=xe-1,Ee=me+1;me<xe;me++,Le++,Ee++)Le===xe&&(Le=0),Ee===xe&&(Ee=0),ce[me]=ie(te[me],te[Le],te[Ee]);de.push(ce),ye=ye.concat(ce)}let We;if(m===0)We=Hs.triangulateShape(V,N);else{const H=[],j=[];for(let te=0;te<m;te++){const me=te/m,xe=d*Math.cos(me*Math.PI/2),Le=_*Math.sin(me*Math.PI/2)+g;for(let Ee=0,Ge=V.length;Ee<Ge;Ee++){const qe=q(V[Ee],oe[Ee],Le);He(qe.x,qe.y,-xe),me===0&&H.push(qe)}for(let Ee=0,Ge=J;Ee<Ge;Ee++){const qe=N[Ee];ce=de[Ee];const B=[];for(let dt=0,ct=qe.length;dt<ct;dt++){const L=q(qe[dt],ce[dt],Le);He(L.x,L.y,-xe),me===0&&B.push(L)}me===0&&j.push(B)}}We=Hs.triangulateShape(H,j)}const ot=We.length,lt=_+g;for(let H=0;H<X;H++){const j=f?q(I[H],ye[H],lt):I[H];M?(T.copy(E.normals[0]).multiplyScalar(j.x),S.copy(E.binormals[0]).multiplyScalar(j.y),v.copy(y[0]).add(T).add(S),He(v.x,v.y,v.z)):He(j.x,j.y,0)}for(let H=1;H<=h;H++)for(let j=0;j<X;j++){const te=f?q(I[j],ye[j],lt):I[j];M?(T.copy(E.normals[H]).multiplyScalar(te.x),S.copy(E.binormals[H]).multiplyScalar(te.y),v.copy(y[H]).add(T).add(S),He(v.x,v.y,v.z)):He(te.x,te.y,u/h*H)}for(let H=m-1;H>=0;H--){const j=H/m,te=d*Math.cos(j*Math.PI/2),me=_*Math.sin(j*Math.PI/2)+g;for(let xe=0,Le=V.length;xe<Le;xe++){const Ee=q(V[xe],oe[xe],me);He(Ee.x,Ee.y,u+te)}for(let xe=0,Le=N.length;xe<Le;xe++){const Ee=N[xe];ce=de[xe];for(let Ge=0,qe=Ee.length;Ge<qe;Ge++){const B=q(Ee[Ge],ce[Ge],me);M?He(B.x,B.y+y[h-1].y,y[h-1].x+te):He(B.x,B.y,u+te)}}}re(),Me();function re(){const H=s.length/3;if(f){let j=0,te=X*j;for(let me=0;me<ot;me++){const xe=We[me];Je(xe[2]+te,xe[1]+te,xe[0]+te)}j=h+m*2,te=X*j;for(let me=0;me<ot;me++){const xe=We[me];Je(xe[0]+te,xe[1]+te,xe[2]+te)}}else{for(let j=0;j<ot;j++){const te=We[j];Je(te[2],te[1],te[0])}for(let j=0;j<ot;j++){const te=We[j];Je(te[0]+X*h,te[1]+X*h,te[2]+X*h)}}n.addGroup(H,s.length/3-H,0)}function Me(){const H=s.length/3;let j=0;_e(V,j),j+=V.length;for(let te=0,me=N.length;te<me;te++){const xe=N[te];_e(xe,j),j+=xe.length}n.addGroup(H,s.length/3-H,1)}function _e(H,j){let te=H.length;for(;--te>=0;){const me=te;let xe=te-1;xe<0&&(xe=H.length-1);for(let Le=0,Ee=h+m*2;Le<Ee;Le++){const Ge=X*Le,qe=X*(Le+1),B=j+me+Ge,dt=j+xe+Ge,ct=j+xe+qe,L=j+me+qe;Ue(B,dt,ct,L)}}}function He(H,j,te){o.push(H),o.push(j),o.push(te)}function Je(H,j,te){rt(H),rt(j),rt(te);const me=s.length/3,xe=x.generateTopUV(n,s,me-3,me-2,me-1);se(xe[0]),se(xe[1]),se(xe[2])}function Ue(H,j,te,me){rt(H),rt(j),rt(me),rt(j),rt(te),rt(me);const xe=s.length/3,Le=x.generateSideWallUV(n,s,xe-6,xe-3,xe-2,xe-1);se(Le[0]),se(Le[1]),se(Le[3]),se(Le[1]),se(Le[2]),se(Le[3])}function rt(H){s.push(o[H*3+0]),s.push(o[H*3+1]),s.push(o[H*3+2])}function se(H){r.push(H.x),r.push(H.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return $d(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ha[s.type]().fromJSON(s)),new Ri(n,e.options)}}const Zd={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new K(r,a),new K(c,o),new K(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],d=e[s*3+1],_=e[s*3+2],g=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(c-h)<Math.abs(a-l)?[new K(a,1-o),new K(l,1-u),new K(f,1-_),new K(g,1-p)]:[new K(c,1-o),new K(h,1-u),new K(d,1-_),new K(m,1-p)]}};function $d(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class qn extends rn{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=wt(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],h=1/t,u=new P,f=new K,d=new P,_=new P,g=new P;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(g.x,g.y,g.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.x+=g.x,d.y+=g.y,d.z+=g.z,d.normalize(),o.push(d.x,d.y,d.z),g.copy(_)}for(let x=0;x<=t;x++){const y=n+x*h*s,M=Math.sin(y),E=Math.cos(y);for(let S=0;S<=e.length-1;S++){u.x=e[S].x*M,u.y=e[S].y,u.z=e[S].x*E,a.push(u.x,u.y,u.z),f.x=x/t,f.y=S/(e.length-1),c.push(f.x,f.y);const T=o[3*S+0]*M,v=o[3*S+1],A=o[3*S+0]*E;l.push(T,v,A)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const M=y+x*e.length,E=M,S=M+e.length,T=M+e.length+1,v=M+1;r.push(E,S,v),r.push(T,v,S)}this.setIndex(r),this.setAttribute("position",new Rt(a,3)),this.setAttribute("uv",new Rt(c,2)),this.setAttribute("normal",new Rt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.points,e.segments,e.phiStart,e.phiLength)}}class Ot extends rn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,h=o+1,u=e/c,f=t/o,d=[],_=[],g=[],m=[];for(let p=0;p<h;p++){const x=p*f-a;for(let y=0;y<l;y++){const M=y*u-r;_.push(M,-x,0),g.push(0,0,1),m.push(y/c),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let x=0;x<c;x++){const y=x+l*p,M=x+l*(p+1),E=x+1+l*(p+1),S=x+1+l*p;d.push(y,M,S),d.push(M,E,S)}this.setIndex(d),this.setAttribute("position",new Rt(_,3)),this.setAttribute("normal",new Rt(g,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.width,e.height,e.widthSegments,e.heightSegments)}}class Du extends rn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],h=[];let u=e;const f=(t-e)/s,d=new P,_=new K;for(let g=0;g<=s;g++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),o.push(d.x,d.y,d.z),l.push(0,0,1),_.x=(d.x/t+1)/2,_.y=(d.y/t+1)/2,h.push(_.x,_.y)}u+=f}for(let g=0;g<s;g++){const m=g*(n+1);for(let p=0;p<n;p++){const x=p+m,y=x,M=x+n+1,E=x+n+2,S=x+1;c.push(y,M,S),c.push(M,E,S)}}this.setIndex(c),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(l,3)),this.setAttribute("uv",new Rt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Du(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Lt extends rn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const h=[],u=new P,f=new P,d=[],_=[],g=[],m=[];for(let p=0;p<=n;p++){const x=[],y=p/n,M=a+y*c,E=e*Math.cos(M),S=Math.sqrt(e*e-E*E);let T=0;p===0&&a===0?T=.5/t:p===n&&o===Math.PI&&(T=-.5/t);for(let v=0;v<=t;v++){const A=v/t,I=s+A*r;u.x=-S*Math.cos(I),u.y=E,u.z=S*Math.sin(I),_.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),m.push(A+T,1-y),x.push(l++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const y=h[p][x+1],M=h[p][x],E=h[p+1][x],S=h[p+1][x+1];(p!==0||a>0)&&d.push(y,M,S),(p!==n-1||o<Math.PI)&&d.push(M,E,S)}this.setIndex(d),this.setAttribute("position",new Rt(_,3)),this.setAttribute("normal",new Rt(g,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class St extends rn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],h=[],u=[],f=new P,d=new P,_=new P;for(let g=0;g<=n;g++){const m=a+g/n*c;for(let p=0;p<=s;p++){const x=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(x),d.y=(e+t*Math.cos(m))*Math.sin(x),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),f.x=e*Math.cos(x),f.y=e*Math.sin(x),_.subVectors(d,f).normalize(),h.push(_.x,_.y,_.z),u.push(p/s),u.push(g/n)}}for(let g=1;g<=n;g++)for(let m=1;m<=s;m++){const p=(s+1)*g+m-1,x=(s+1)*(g-1)+m-1,y=(s+1)*(g-1)+m,M=(s+1)*g+m;o.push(p,x,M),o.push(x,y,M)}this.setIndex(o),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new St(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Zn extends rn{constructor(e=new uc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new P,o=new P,l=new K;let h=new P;const u=[],f=[],d=[],_=[];g(),this.setIndex(_),this.setAttribute("position",new Rt(u,3)),this.setAttribute("normal",new Rt(f,3)),this.setAttribute("uv",new Rt(d,2));function g(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),x(),p()}function m(y){h=e.getPointAt(y/t,h);const M=a.normals[y],E=a.binormals[y];for(let S=0;S<=s;S++){const T=S/s*Math.PI*2,v=Math.sin(T),A=-Math.cos(T);o.x=A*M.x+v*E.x,o.y=A*M.y+v*E.y,o.z=A*M.z+v*E.z,o.normalize(),f.push(o.x,o.y,o.z),c.x=h.x+n*o.x,c.y=h.y+n*o.y,c.z=h.z+n*o.z,u.push(c.x,c.y,c.z)}}function p(){for(let y=1;y<=t;y++)for(let M=1;M<=s;M++){const E=(s+1)*(y-1)+(M-1),S=(s+1)*y+(M-1),T=(s+1)*y+M,v=(s+1)*(y-1)+M;_.push(E,S,v),_.push(S,T,v)}}function x(){for(let y=0;y<=t;y++)for(let M=0;M<=s;M++)l.x=y/t,l.y=M/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Zn(new Ha[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Js(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(fh(s))s.isRenderTargetTexture?(ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(fh(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Sn(i){const e={};for(let t=0;t<i.length;t++){const n=Js(i[t]);for(const s in n)e[s]=n[s]}return e}function fh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Kd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Lu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}const Jd={clone:Js,merge:Sn};var jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends Qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=Kd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new yt().setHex(s.value);break;case"v2":this.uniforms[n].value=new K().fromArray(s.value);break;case"v3":this.uniforms[n].value=new P().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Qt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new xt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new zt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class e0 extends yi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class G extends Qi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Na,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _i extends G{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new K(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return wt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new yt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new yt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new yt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class t0 extends Qi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Na,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Yl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class n0 extends Qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class i0 extends Qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class hx extends ac{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class fc extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Nu extends fc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Po=new zt,dh=new P,ph=new P;class Uu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=Vn,this.map=null,this.mapPass=null,this.matrix=new zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rc,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new Qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;dh.setFromMatrixPosition(e.matrixWorld),t.position.copy(dh),ph.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ph),t.updateMatrixWorld(),Po.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Po,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Dr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Po)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ga=new P,_a=new Bi,li=new P;class Fu extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zt,this.projectionMatrix=new zt,this.projectionMatrixInverse=new zt,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ga,_a,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,li.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ga,_a,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ga,_a,li.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qi=new P,mh=new K,gh=new K;class zn extends Fu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ul*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ul*2*Math.atan(Math.tan(Pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,t){return this.getViewBounds(e,mh,gh),t.subVectors(gh,mh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class s0 extends Uu{constructor(){super(new zn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ou extends fc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new s0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class dc extends Fu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=h*this.view.offsetY,o=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class r0 extends Uu{constructor(){super(new dc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ga extends fc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new r0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ls=-90,Ns=1;class a0 extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zn(Ls,Ns,e,t);s.layers=this.layers,this.add(s);const r=new zn(Ls,Ns,e,t);r.layers=this.layers,this.add(r);const a=new zn(Ls,Ns,e,t);a.layers=this.layers,this.add(a);const c=new zn(Ls,Ns,e,t);c.layers=this.layers,this.add(c);const o=new zn(Ls,Ns,e,t);o.layers=this.layers,this.add(o);const l=new zn(Ls,Ns,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===di)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class o0 extends zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class l0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=c0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function c0(){this._document.hidden===!1&&this.reset()}const _h=new zt;class h0{constructor(e,t,n=0,s=1/0){this.ray=new qa(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new sc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Pt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return _h.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_h),this}intersectObject(e,t=!0,n=[]){return kl(e,this,n,t),n.sort(vh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)kl(e[s],this,n,t);return n.sort(vh),n}}function vh(i,e){return i.distance-e.distance}function kl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)kl(r[a],e,t,!0)}}class xh{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=wt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(wt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const yc=class yc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};yc.prototype.isMatrix2=!0;let yh=yc;const Mh=new P;let va,Io;class ux extends sn{constructor(e=new P(0,0,1),t=new P(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",va===void 0&&(va=new rn,va.setAttribute("position",new Rt([0,0,0,0,1,0],3)),Io=new kn(.5,1,5,1),Io.translate(0,-.5,0)),this.position.copy(t),this.line=new Mu(va,new ac({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new le(Io,new pi({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Mh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Mh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class u0 extends ji{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){ut("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function bh(i,e,t,n){const s=f0(n);switch(t){case hu:return i*e;case Jl:return i*e/s.components*s.byteLength;case jl:return i*e/s.components*s.byteLength;case hs:return i*e*2/s.components*s.byteLength;case Ql:return i*e*2/s.components*s.byteLength;case uu:return i*e*3/s.components*s.byteLength;case ii:return i*e*4/s.components*s.byteLength;case ec:return i*e*4/s.components*s.byteLength;case Ta:case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rl:case ol:return Math.max(i,16)*Math.max(e,8)/4;case sl:case al:return Math.max(i,8)*Math.max(e,8)/2;case ll:case cl:case ul:case fl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case hl:case Da:case dl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case xl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Tl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Al:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Cl:case Pl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Il:case Dl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case La:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function f0(i){switch(i){case Vn:case au:return{byteLength:1,components:1};case Pr:case ou:case Fi:return{byteLength:2,components:1};case $l:case Kl:return{byteLength:2,components:4};case xi:case Zl:case ni:return{byteLength:4,components:1};case lu:case cu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xl}}));typeof window<"u"&&(window.__THREE__?ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function d0(i){const e=new WeakMap;function t(c,o){const l=c.array,h=c.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(o,f),i.bufferData(o,l,h),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,o,l){const h=o.array,u=o.updateRanges;if(i.bindBuffer(l,c),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<u.length;d++){const _=u[f],g=u[d];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,u[f]=g)}u.length=f+1;for(let d=0,_=u.length;d<_;d++){const g=u[d];i.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var p0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,m0=`#ifdef USE_ALPHAHASH
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
#endif`,g0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,v0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,x0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,y0=`#ifdef USE_AOMAP
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
#endif`,M0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b0=`#ifdef USE_BATCHING
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
#endif`,S0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,w0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,E0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,T0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,A0=`#ifdef USE_IRIDESCENCE
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
#endif`,R0=`#ifdef USE_BUMPMAP
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
#endif`,C0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,L0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,N0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,U0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,F0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,O0=`#define PI 3.141592653589793
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
} // validated`,B0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,k0=`vec3 transformedNormal = objectNormal;
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
#endif`,z0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,V0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,H0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,G0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,W0="gl_FragColor = linearToOutputTexel( gl_FragColor );",X0=`vec4 LinearTransferOETF( in vec4 value ) {
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
#endif`,q0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Z0=`#ifdef USE_ENVMAP
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
#endif`,$0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,K0=`#ifdef USE_ENVMAP
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
#endif`,J0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,j0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Q0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ep=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tp=`#ifdef USE_GRADIENTMAP
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
}`,np=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ip=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ap=`#ifdef USE_ENVMAP
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
#endif`,op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,up=`PhysicalMaterial material;
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
#endif`,fp=`uniform sampler2D dfgLUT;
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
}`,dp=`
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
#endif`,pp=`#if defined( RE_IndirectDiffuse )
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
#endif`,mp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,_p=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wp=`#if defined( USE_POINTS_UV )
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
#endif`,Ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ap=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pp=`#ifdef USE_MORPHTARGETS
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
#endif`,Ip=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Np=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Op=`#ifdef USE_NORMALMAP
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
#endif`,Bp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qp=`float getShadowMask() {
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
}`,em=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tm=`#ifdef USE_SKINNING
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
#endif`,nm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,im=`#ifdef USE_SKINNING
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
#endif`,sm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,om=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lm=`#ifdef USE_TRANSMISSION
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
#endif`,cm=`#ifdef USE_TRANSMISSION
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mm=`uniform sampler2D t2D;
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_m=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ym=`#include <common>
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
}`,Mm=`#if DEPTH_PACKING == 3200
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
}`,bm=`#define DISTANCE
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
}`,Sm=`#define DISTANCE
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
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tm=`uniform float scale;
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
}`,Am=`uniform vec3 diffuse;
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
}`,Rm=`#include <common>
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Pm=`#define LAMBERT
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
}`,Im=`#define LAMBERT
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
}`,Dm=`#define MATCAP
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
}`,Lm=`#define MATCAP
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
}`,Nm=`#define NORMAL
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
}`,Um=`#define NORMAL
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
}`,Fm=`#define PHONG
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
}`,Om=`#define PHONG
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
}`,Bm=`#define STANDARD
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
}`,km=`#define STANDARD
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
}`,zm=`#define TOON
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
}`,Vm=`#define TOON
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
}`,Hm=`uniform float size;
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
}`,Gm=`uniform vec3 diffuse;
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
}`,Wm=`#include <common>
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
}`,Xm=`uniform vec3 color;
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
}`,qm=`uniform vec3 diffuse;
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
}`,Et={alphahash_fragment:p0,alphahash_pars_fragment:m0,alphamap_fragment:g0,alphamap_pars_fragment:_0,alphatest_fragment:v0,alphatest_pars_fragment:x0,aomap_fragment:y0,aomap_pars_fragment:M0,batching_pars_vertex:b0,batching_vertex:S0,begin_vertex:w0,beginnormal_vertex:E0,bsdfs:T0,iridescence_fragment:A0,bumpmap_pars_fragment:R0,clipping_planes_fragment:C0,clipping_planes_pars_fragment:P0,clipping_planes_pars_vertex:I0,clipping_planes_vertex:D0,color_fragment:L0,color_pars_fragment:N0,color_pars_vertex:U0,color_vertex:F0,common:O0,cube_uv_reflection_fragment:B0,defaultnormal_vertex:k0,displacementmap_pars_vertex:z0,displacementmap_vertex:V0,emissivemap_fragment:H0,emissivemap_pars_fragment:G0,colorspace_fragment:W0,colorspace_pars_fragment:X0,envmap_fragment:Y0,envmap_common_pars_fragment:q0,envmap_pars_fragment:Z0,envmap_pars_vertex:$0,envmap_physical_pars_fragment:ap,envmap_vertex:K0,fog_vertex:J0,fog_pars_vertex:j0,fog_fragment:Q0,fog_pars_fragment:ep,gradientmap_pars_fragment:tp,lightmap_pars_fragment:np,lights_lambert_fragment:ip,lights_lambert_pars_fragment:sp,lights_pars_begin:rp,lights_toon_fragment:op,lights_toon_pars_fragment:lp,lights_phong_fragment:cp,lights_phong_pars_fragment:hp,lights_physical_fragment:up,lights_physical_pars_fragment:fp,lights_fragment_begin:dp,lights_fragment_maps:pp,lights_fragment_end:mp,lightprobes_pars_fragment:gp,logdepthbuf_fragment:_p,logdepthbuf_pars_fragment:vp,logdepthbuf_pars_vertex:xp,logdepthbuf_vertex:yp,map_fragment:Mp,map_pars_fragment:bp,map_particle_fragment:Sp,map_particle_pars_fragment:wp,metalnessmap_fragment:Ep,metalnessmap_pars_fragment:Tp,morphinstance_vertex:Ap,morphcolor_vertex:Rp,morphnormal_vertex:Cp,morphtarget_pars_vertex:Pp,morphtarget_vertex:Ip,normal_fragment_begin:Dp,normal_fragment_maps:Lp,normal_pars_fragment:Np,normal_pars_vertex:Up,normal_vertex:Fp,normalmap_pars_fragment:Op,clearcoat_normal_fragment_begin:Bp,clearcoat_normal_fragment_maps:kp,clearcoat_pars_fragment:zp,iridescence_pars_fragment:Vp,opaque_fragment:Hp,packing:Gp,premultiplied_alpha_fragment:Wp,project_vertex:Xp,dithering_fragment:Yp,dithering_pars_fragment:qp,roughnessmap_fragment:Zp,roughnessmap_pars_fragment:$p,shadowmap_pars_fragment:Kp,shadowmap_pars_vertex:Jp,shadowmap_vertex:jp,shadowmask_pars_fragment:Qp,skinbase_vertex:em,skinning_pars_vertex:tm,skinning_vertex:nm,skinnormal_vertex:im,specularmap_fragment:sm,specularmap_pars_fragment:rm,tonemapping_fragment:am,tonemapping_pars_fragment:om,transmission_fragment:lm,transmission_pars_fragment:cm,uv_pars_fragment:hm,uv_pars_vertex:um,uv_vertex:fm,worldpos_vertex:dm,background_vert:pm,background_frag:mm,backgroundCube_vert:gm,backgroundCube_frag:_m,cube_vert:vm,cube_frag:xm,depth_vert:ym,depth_frag:Mm,distance_vert:bm,distance_frag:Sm,equirect_vert:wm,equirect_frag:Em,linedashed_vert:Tm,linedashed_frag:Am,meshbasic_vert:Rm,meshbasic_frag:Cm,meshlambert_vert:Pm,meshlambert_frag:Im,meshmatcap_vert:Dm,meshmatcap_frag:Lm,meshnormal_vert:Nm,meshnormal_frag:Um,meshphong_vert:Fm,meshphong_frag:Om,meshphysical_vert:Bm,meshphysical_frag:km,meshtoon_vert:zm,meshtoon_frag:Vm,points_vert:Hm,points_frag:Gm,shadow_vert:Wm,shadow_frag:Xm,sprite_vert:Ym,sprite_frag:qm},Oe={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xt}},envmap:{envMap:{value:null},envMapRotation:{value:new xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xt},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0},uvTransform:{value:new xt}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}}},hi={basic:{uniforms:Sn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:Et.meshbasic_vert,fragmentShader:Et.meshbasic_frag},lambert:{uniforms:Sn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new yt(0)},envMapIntensity:{value:1}}]),vertexShader:Et.meshlambert_vert,fragmentShader:Et.meshlambert_frag},phong:{uniforms:Sn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Et.meshphong_vert,fragmentShader:Et.meshphong_frag},standard:{uniforms:Sn([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Et.meshphysical_vert,fragmentShader:Et.meshphysical_frag},toon:{uniforms:Sn([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new yt(0)}}]),vertexShader:Et.meshtoon_vert,fragmentShader:Et.meshtoon_frag},matcap:{uniforms:Sn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:Et.meshmatcap_vert,fragmentShader:Et.meshmatcap_frag},points:{uniforms:Sn([Oe.points,Oe.fog]),vertexShader:Et.points_vert,fragmentShader:Et.points_frag},dashed:{uniforms:Sn([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Et.linedashed_vert,fragmentShader:Et.linedashed_frag},depth:{uniforms:Sn([Oe.common,Oe.displacementmap]),vertexShader:Et.depth_vert,fragmentShader:Et.depth_frag},normal:{uniforms:Sn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:Et.meshnormal_vert,fragmentShader:Et.meshnormal_frag},sprite:{uniforms:Sn([Oe.sprite,Oe.fog]),vertexShader:Et.sprite_vert,fragmentShader:Et.sprite_frag},background:{uniforms:{uvTransform:{value:new xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Et.background_vert,fragmentShader:Et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xt}},vertexShader:Et.backgroundCube_vert,fragmentShader:Et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Et.cube_vert,fragmentShader:Et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Et.equirect_vert,fragmentShader:Et.equirect_frag},distance:{uniforms:Sn([Oe.common,Oe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Et.distance_vert,fragmentShader:Et.distance_frag},shadow:{uniforms:Sn([Oe.lights,Oe.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:Et.shadow_vert,fragmentShader:Et.shadow_frag}};hi.physical={uniforms:Sn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xt},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xt},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xt},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xt},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xt},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xt}}]),vertexShader:Et.meshphysical_vert,fragmentShader:Et.meshphysical_frag};const xa={r:0,b:0,g:0},Zm=new zt,ku=new xt;ku.set(-1,0,0,0,1,0,0,0,1);function $m(i,e,t,n,s,r){const a=new yt(0);let c=s===!0?0:1,o,l,h=null,u=0,f=null;function d(x){let y=x.isScene===!0?x.background:null;if(y&&y.isTexture){const M=x.backgroundBlurriness>0;y=e.get(y,M)}return y}function _(x){let y=!1;const M=d(x);M===null?m(a,c):M&&M.isColor&&(m(M,1),y=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(x,y){const M=d(y);M&&(M.isCubeTexture||M.mapping===Ya)?(l===void 0&&(l=new le(new Se(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:Js(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Zm.makeRotationFromEuler(y.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ku),l.material.toneMapped=Dt.getTransfer(M.colorSpace)!==Gt,(h!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(o===void 0&&(o=new le(new Ot(2,2),new yi({name:"BackgroundMaterial",uniforms:Js(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=M,o.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,o.material.toneMapped=Dt.getTransfer(M.colorSpace)!==Gt,M.matrixAutoUpdate===!0&&M.updateMatrix(),o.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==i.toneMapping)&&(o.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),o.layers.enableAll(),x.unshift(o,o.geometry,o.material,0,0,null))}function m(x,y){x.getRGB(xa,Lu(i)),t.buffers.color.setClear(xa.r,xa.g,xa.b,y,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,m(a,c)},render:_,addToRenderList:g,dispose:p}}function Km(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function c(N,O,Z,J,V){let q=!1;const X=u(N,J,Z,O);r!==X&&(r=X,l(r.object)),q=d(N,J,Z,V),q&&_(N,J,Z,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,M(N,O,Z,J),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function o(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function u(N,O,Z,J){const V=J.wireframe===!0;let q=n[O.id];q===void 0&&(q={},n[O.id]=q);const X=N.isInstancedMesh===!0?N.id:0;let ie=q[X];ie===void 0&&(ie={},q[X]=ie);let oe=ie[Z.id];oe===void 0&&(oe={},ie[Z.id]=oe);let de=oe[V];return de===void 0&&(de=f(o()),oe[V]=de),de}function f(N){const O=[],Z=[],J=[];for(let V=0;V<t;V++)O[V]=0,Z[V]=0,J[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Z,attributeDivisors:J,object:N,attributes:{},index:null}}function d(N,O,Z,J){const V=r.attributes,q=O.attributes;let X=0;const ie=Z.getAttributes();for(const oe in ie)if(ie[oe].location>=0){const ce=V[oe];let ye=q[oe];if(ye===void 0&&(oe==="instanceMatrix"&&N.instanceMatrix&&(ye=N.instanceMatrix),oe==="instanceColor"&&N.instanceColor&&(ye=N.instanceColor)),ce===void 0||ce.attribute!==ye||ye&&ce.data!==ye.data)return!0;X++}return r.attributesNum!==X||r.index!==J}function _(N,O,Z,J){const V={},q=O.attributes;let X=0;const ie=Z.getAttributes();for(const oe in ie)if(ie[oe].location>=0){let ce=q[oe];ce===void 0&&(oe==="instanceMatrix"&&N.instanceMatrix&&(ce=N.instanceMatrix),oe==="instanceColor"&&N.instanceColor&&(ce=N.instanceColor));const ye={};ye.attribute=ce,ce&&ce.data&&(ye.data=ce.data),V[oe]=ye,X++}r.attributes=V,r.attributesNum=X,r.index=J}function g(){const N=r.newAttributes;for(let O=0,Z=N.length;O<Z;O++)N[O]=0}function m(N){p(N,0)}function p(N,O){const Z=r.newAttributes,J=r.enabledAttributes,V=r.attributeDivisors;Z[N]=1,J[N]===0&&(i.enableVertexAttribArray(N),J[N]=1),V[N]!==O&&(i.vertexAttribDivisor(N,O),V[N]=O)}function x(){const N=r.newAttributes,O=r.enabledAttributes;for(let Z=0,J=O.length;Z<J;Z++)O[Z]!==N[Z]&&(i.disableVertexAttribArray(Z),O[Z]=0)}function y(N,O,Z,J,V,q,X){X===!0?i.vertexAttribIPointer(N,O,Z,V,q):i.vertexAttribPointer(N,O,Z,J,V,q)}function M(N,O,Z,J){g();const V=J.attributes,q=Z.getAttributes(),X=O.defaultAttributeValues;for(const ie in q){const oe=q[ie];if(oe.location>=0){let de=V[ie];if(de===void 0&&(ie==="instanceMatrix"&&N.instanceMatrix&&(de=N.instanceMatrix),ie==="instanceColor"&&N.instanceColor&&(de=N.instanceColor)),de!==void 0){const ce=de.normalized,ye=de.itemSize,We=e.get(de);if(We===void 0)continue;const ot=We.buffer,lt=We.type,re=We.bytesPerElement,Me=lt===i.INT||lt===i.UNSIGNED_INT||de.gpuType===Zl;if(de.isInterleavedBufferAttribute){const _e=de.data,He=_e.stride,Je=de.offset;if(_e.isInstancedInterleavedBuffer){for(let Ue=0;Ue<oe.locationSize;Ue++)p(oe.location+Ue,_e.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let Ue=0;Ue<oe.locationSize;Ue++)m(oe.location+Ue);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let Ue=0;Ue<oe.locationSize;Ue++)y(oe.location+Ue,ye/oe.locationSize,lt,ce,He*re,(Je+ye/oe.locationSize*Ue)*re,Me)}else{if(de.isInstancedBufferAttribute){for(let _e=0;_e<oe.locationSize;_e++)p(oe.location+_e,de.meshPerAttribute);N.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let _e=0;_e<oe.locationSize;_e++)m(oe.location+_e);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let _e=0;_e<oe.locationSize;_e++)y(oe.location+_e,ye/oe.locationSize,lt,ce,ye*re,ye/oe.locationSize*_e*re,Me)}}else if(X!==void 0){const ce=X[ie];if(ce!==void 0)switch(ce.length){case 2:i.vertexAttrib2fv(oe.location,ce);break;case 3:i.vertexAttrib3fv(oe.location,ce);break;case 4:i.vertexAttrib4fv(oe.location,ce);break;default:i.vertexAttrib1fv(oe.location,ce)}}}}x()}function E(){A();for(const N in n){const O=n[N];for(const Z in O){const J=O[Z];for(const V in J){const q=J[V];for(const X in q)h(q[X].object),delete q[X];delete J[V]}}delete n[N]}}function S(N){if(n[N.id]===void 0)return;const O=n[N.id];for(const Z in O){const J=O[Z];for(const V in J){const q=J[V];for(const X in q)h(q[X].object),delete q[X];delete J[V]}}delete n[N.id]}function T(N){for(const O in n){const Z=n[O];for(const J in Z){const V=Z[J];if(V[N.id]===void 0)continue;const q=V[N.id];for(const X in q)h(q[X].object),delete q[X];delete V[N.id]}}}function v(N){for(const O in n){const Z=n[O],J=N.isInstancedMesh===!0?N.id:0,V=Z[J];if(V!==void 0){for(const q in V){const X=V[q];for(const ie in X)h(X[ie].object),delete X[ie];delete V[q]}delete Z[J],Object.keys(Z).length===0&&delete n[O]}}}function A(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:A,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function Jm(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,h){h!==0&&(i.drawArraysInstanced(n,o,l,h),t.update(l,n,h))}function c(o,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function jm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==ii&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(T){const v=T===Fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Vn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ni&&!v)}function o(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=o(l);h!==l&&(ut("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:M,maxSamples:E,samples:S}}function Qm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ci,c=new xt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const _=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||_===null||_.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,y=x*4;let M=p.clippingState||null;o.value=M,M=h(_,f,y,d);for(let E=0;E!==y;++E)M[E]=t[E];p.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,_){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=o.value,_!==!0||m===null){const p=d+g*4,x=f.matrixWorldInverse;c.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,M=d;y!==g;++y,M+=4)a.copy(u[y]).applyMatrix4(x,c),a.normal.toArray(m,M),m[M+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}const Ki=4,Sh=[.125,.215,.35,.446,.526,.582],rs=20,eg=256,yr=new dc,wh=new yt;let Do=null,Lo=0,No=0,Uo=!1;const tg=new P;class zl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=tg}=r;Do=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ah(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Do,Lo,No),this._renderer.xr.enabled=Uo,e.scissorTest=!1,Us(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cs||e.mapping===Zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Do=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Fi,format:ii,colorSpace:Ua,depthBuffer:!1},s=Eh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Eh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ng(r)),this._blurMaterial=sg(r,e,t),this._ggxMaterial=ig(r,e,t)}return s}_compileMaterial(e){const t=new le(new rn,e);this._renderer.compile(t,yr)}_sceneToCubeUV(e,t,n,s,r){const o=new zn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(wh),u.toneMapping=mi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new le(new Se,new pi({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,p=!0):(m.color.copy(wh),p=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(o.up.set(0,l[y],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+h[y],r.y,r.z)):M===1?(o.up.set(0,0,l[y]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+h[y],r.z)):(o.up.set(0,l[y],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+h[y]));const E=this._cubeSize;Us(s,M*E,y>2?E:0,E,E),u.setRenderTarget(s),p&&u.render(g,o),u.render(e,o)}u.toneMapping=d,u.autoClear=f,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===cs||e.mapping===Zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ah()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Th());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;Us(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,yr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=0+l*1.25,d=u*f,{_lodMax:_}=this,g=this._sizeLods[n],m=3*g*(n>_-Ki?n-_+Ki:0),p=4*(this._cubeSize-g);o.envMap.value=e.texture,o.roughness.value=d,o.mipInt.value=_-t,Us(r,m,p,3*g,2*g),s.setRenderTarget(r),s.render(c,yr),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=_-n,Us(e,m,p,3*g,2*g),s.setRenderTarget(e),s.render(c,yr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Pt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const f=l.uniforms,d=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*rs-1),g=r/_,m=isFinite(r)?1+Math.floor(h*g):rs;m>rs&&ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${rs}`);const p=[];let x=0;for(let T=0;T<rs;++T){const v=T/g,A=Math.exp(-v*v/2);p.push(A),T===0?x+=A:T<m&&(x+=2*A)}for(let T=0;T<p.length;T++)p[T]=p[T]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:y}=this;f.dTheta.value=_,f.mipInt.value=y-n;const M=this._sizeLods[s],E=3*M*(s>y-Ki?s-y+Ki:0),S=4*(this._cubeSize-M);Us(t,E,S,3*M,2*M),o.setRenderTarget(t),o.render(u,yr)}}function ng(i){const e=[],t=[],n=[];let s=i;const r=i-Ki+1+Sh.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-Ki?o=Sh[a-i+Ki-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,_=6,g=3,m=2,p=1,x=new Float32Array(g*_*d),y=new Float32Array(m*_*d),M=new Float32Array(p*_*d);for(let S=0;S<d;S++){const T=S%3*2/3-1,v=S>2?0:-1,A=[T,v,0,T+2/3,v,0,T+2/3,v+1,0,T,v,0,T+2/3,v+1,0,T,v+1,0];x.set(A,g*_*S),y.set(f,m*_*S);const I=[S,S,S,S,S,S];M.set(I,p*_*S)}const E=new rn;E.setAttribute("position",new Kn(x,g)),E.setAttribute("uv",new Kn(y,m)),E.setAttribute("faceIndex",new Kn(M,p)),n.push(new le(E,null)),s>Ki&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Eh(i,e,t){const n=new gi(i,e,t);return n.texture.mapping=Ya,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Us(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function ig(i,e,t){return new yi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:eg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function sg(i,e,t){const n=new Float32Array(rs),s=new P(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:rs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Th(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Ah(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Za(){return`

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
	`}class zu extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new bu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Se(5,5,5),r=new yi({name:"CubemapFromEquirect",uniforms:Js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vn,blending:Ii});r.uniforms.tEquirect.value=t;const a=new le(s,r),c=t.minFilter;return t.minFilter===as&&(t.minFilter=_n),new a0(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function rg(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===ja||d===Qa)if(e.has(f)){const _=e.get(f).texture;return c(_,f.mapping)}else{const _=f.image;if(_&&_.height>0){const g=new zu(_.height);return g.fromEquirectangularTexture(i,f),e.set(f,g),f.addEventListener("dispose",l),c(g.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,_=d===ja||d===Qa,g=d===cs||d===Zs;if(_||g){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new zl(i)),m=_?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const x=f.image;return _&&x&&x.height>0||g&&x&&o(x)?(n===null&&(n=new zl(i)),m=_?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function c(f,d){return d===ja?f.mapping=cs:d===Qa&&(f.mapping=Zs),f}function o(f){let d=0;const _=6;for(let g=0;g<_;g++)f[g]!==void 0&&d++;return d===_}function l(f){const d=f.target;d.removeEventListener("dispose",l);const _=e.get(d);_!==void 0&&(e.delete(d),_.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function ag(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Xs("WebGLRenderer: "+n+" extension not supported."),s}}}function og(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function o(u){const f=u.attributes;for(const d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,_=u.attributes.position;let g=0;if(_===void 0)return;if(d!==null){const x=d.array;g=d.version;for(let y=0,M=x.length;y<M;y+=3){const E=x[y+0],S=x[y+1],T=x[y+2];f.push(E,S,S,T,T,E)}}else{const x=_.array;g=_.version;for(let y=0,M=x.length/3-1;y<M;y+=3){const E=y+0,S=y+1,T=y+2;f.push(E,S,S,T,T,E)}}const m=new(_.count>=65535?_u:gu)(f,1);m.version=g;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:c,update:o,getWireframeAttribute:h}}function lg(i,e,t){let n;function s(u){n=u}let r,a;function c(u){r=u.type,a=u.bytesPerElement}function o(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let g=0;for(let m=0;m<d;m++)g+=f[m];t.update(g,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=h}function cg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:Pt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function hg(i,e,t){const n=new WeakMap,s=new Qt;function r(a,c,o){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let A=function(){T.dispose(),n.delete(c),c.removeEventListener("dispose",A)};f!==void 0&&f.texture.dispose();const d=c.morphAttributes.position!==void 0,_=c.morphAttributes.normal!==void 0,g=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],x=c.morphAttributes.color||[];let y=0;d===!0&&(y=1),_===!0&&(y=2),g===!0&&(y=3);let M=c.attributes.position.count*y,E=1;M>e.maxTextureSize&&(E=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const S=new Float32Array(M*E*4*u),T=new du(S,M,E,u);T.type=ni,T.needsUpdate=!0;const v=y*4;for(let I=0;I<u;I++){const N=m[I],O=p[I],Z=x[I],J=M*E*4*I;for(let V=0;V<N.count;V++){const q=V*v;d===!0&&(s.fromBufferAttribute(N,V),S[J+q+0]=s.x,S[J+q+1]=s.y,S[J+q+2]=s.z,S[J+q+3]=0),_===!0&&(s.fromBufferAttribute(O,V),S[J+q+4]=s.x,S[J+q+5]=s.y,S[J+q+6]=s.z,S[J+q+7]=0),g===!0&&(s.fromBufferAttribute(Z,V),S[J+q+8]=s.x,S[J+q+9]=s.y,S[J+q+10]=s.z,S[J+q+11]=Z.itemSize===4?s.w:1)}}f={count:u,texture:T,size:new K(M,E)},n.set(c,f),c.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let g=0;g<l.length;g++)d+=l[g];const _=c.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",_),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function ug(i,e,t,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function c(){r=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const fg={[Qh]:"LINEAR_TONE_MAPPING",[eu]:"REINHARD_TONE_MAPPING",[tu]:"CINEON_TONE_MAPPING",[ql]:"ACES_FILMIC_TONE_MAPPING",[iu]:"AGX_TONE_MAPPING",[su]:"NEUTRAL_TONE_MAPPING",[nu]:"CUSTOM_TONE_MAPPING"};function dg(i,e,t,n,s,r){const a=new gi(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new $s(e,t):void 0}),c=new gi(e,t,{type:Fi,depthBuffer:!1,stencilBuffer:!1}),o=new rn;o.setAttribute("position",new Rt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Rt([0,2,0,0,2,0],2));const l=new e0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new le(o,l),u=new dc(-1,1,1,-1,0,1);let f=null,d=null,_=!1,g,m=null,p=[],x=!1;this.setSize=function(y,M){a.setSize(y,M),c.setSize(y,M);for(let E=0;E<p.length;E++){const S=p[E];S.setSize&&S.setSize(y,M)}},this.setEffects=function(y){p=y,x=p.length>0&&p[0].isRenderPass===!0;const M=a.width,E=a.height;for(let S=0;S<p.length;S++){const T=p[S];T.setSize&&T.setSize(M,E)}},this.begin=function(y,M){if(_||y.toneMapping===mi&&p.length===0)return!1;if(m=M,M!==null){const E=M.width,S=M.height;(a.width!==E||a.height!==S)&&this.setSize(E,S)}return x===!1&&y.setRenderTarget(a),g=y.toneMapping,y.toneMapping=mi,!0},this.hasRenderPass=function(){return x},this.end=function(y,M){y.toneMapping=g,_=!0;let E=a,S=c;for(let T=0;T<p.length;T++){const v=p[T];if(v.enabled!==!1&&(v.render(y,S,E,M),v.needsSwap!==!1)){const A=E;E=S,S=A}}if(f!==y.outputColorSpace||d!==y.toneMapping){f=y.outputColorSpace,d=y.toneMapping,l.defines={},Dt.getTransfer(f)===Gt&&(l.defines.SRGB_TRANSFER="");const T=fg[d];T&&(l.defines[T]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,y.setRenderTarget(m),y.render(h,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const Vu=new xn,Vl=new $s(1,1),Hu=new du,Gu=new ed,Wu=new bu,Rh=[],Ch=[],Ph=new Float32Array(16),Ih=new Float32Array(9),Dh=new Float32Array(4);function er(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Rh[s];if(r===void 0&&(r=new Float32Array(s),Rh[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function hn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function un(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $a(i,e){let t=Ch[e];t===void 0&&(t=new Int32Array(e),Ch[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function pg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function mg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;i.uniform2fv(this.addr,e),un(t,e)}}function gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;i.uniform3fv(this.addr,e),un(t,e)}}function _g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;i.uniform4fv(this.addr,e),un(t,e)}}function vg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;Dh.set(n),i.uniformMatrix2fv(this.addr,!1,Dh),un(t,n)}}function xg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;Ih.set(n),i.uniformMatrix3fv(this.addr,!1,Ih),un(t,n)}}function yg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(hn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),un(t,e)}else{if(hn(t,n))return;Ph.set(n),i.uniformMatrix4fv(this.addr,!1,Ph),un(t,n)}}function Mg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;i.uniform2iv(this.addr,e),un(t,e)}}function Sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;i.uniform3iv(this.addr,e),un(t,e)}}function wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;i.uniform4iv(this.addr,e),un(t,e)}}function Eg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;i.uniform2uiv(this.addr,e),un(t,e)}}function Ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;i.uniform3uiv(this.addr,e),un(t,e)}}function Rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;i.uniform4uiv(this.addr,e),un(t,e)}}function Cg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Vl.compareFunction=t.isReversedDepthBuffer()?nc:tc,r=Vl):r=Vu,t.setTexture2D(e||r,s)}function Pg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Gu,s)}function Ig(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Wu,s)}function Dg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Hu,s)}function Lg(i){switch(i){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return _g;case 35674:return vg;case 35675:return xg;case 35676:return yg;case 5124:case 35670:return Mg;case 35667:case 35671:return bg;case 35668:case 35672:return Sg;case 35669:case 35673:return wg;case 5125:return Eg;case 36294:return Tg;case 36295:return Ag;case 36296:return Rg;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Pg;case 35680:case 36300:case 36308:case 36293:return Ig;case 36289:case 36303:case 36311:case 36292:return Dg}}function Ng(i,e){i.uniform1fv(this.addr,e)}function Ug(i,e){const t=er(e,this.size,2);i.uniform2fv(this.addr,t)}function Fg(i,e){const t=er(e,this.size,3);i.uniform3fv(this.addr,t)}function Og(i,e){const t=er(e,this.size,4);i.uniform4fv(this.addr,t)}function Bg(i,e){const t=er(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function kg(i,e){const t=er(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zg(i,e){const t=er(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Vg(i,e){i.uniform1iv(this.addr,e)}function Hg(i,e){i.uniform2iv(this.addr,e)}function Gg(i,e){i.uniform3iv(this.addr,e)}function Wg(i,e){i.uniform4iv(this.addr,e)}function Xg(i,e){i.uniform1uiv(this.addr,e)}function Yg(i,e){i.uniform2uiv(this.addr,e)}function qg(i,e){i.uniform3uiv(this.addr,e)}function Zg(i,e){i.uniform4uiv(this.addr,e)}function $g(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Vl:a=Vu;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Kg(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Gu,r[a])}function Jg(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Wu,r[a])}function jg(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Hu,r[a])}function Qg(i){switch(i){case 5126:return Ng;case 35664:return Ug;case 35665:return Fg;case 35666:return Og;case 35674:return Bg;case 35675:return kg;case 35676:return zg;case 5124:case 35670:return Vg;case 35667:case 35671:return Hg;case 35668:case 35672:return Gg;case 35669:case 35673:return Wg;case 5125:return Xg;case 36294:return Yg;case 36295:return qg;case 36296:return Zg;case 35678:case 36198:case 36298:case 36306:case 35682:return $g;case 35679:case 36299:case 36307:return Kg;case 35680:case 36300:case 36308:case 36293:return Jg;case 36289:case 36303:case 36311:case 36292:return jg}}class e_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lg(t.type)}}class t_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Qg(t.type)}}class n_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const Fo=/(\w+)(\])?(\[|\.)?/g;function Lh(i,e){i.seq.push(e),i.map[e.id]=e}function i_(i,e,t){const n=i.name,s=n.length;for(Fo.lastIndex=0;;){const r=Fo.exec(n),a=Fo.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){Lh(t,l===void 0?new e_(c,i,e):new t_(c,i,e));break}else{let u=t.map[c];u===void 0&&(u=new n_(c),Lh(t,u)),t=u}}}class Ia{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);i_(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Nh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const s_=37297;let r_=0;function a_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const Uh=new xt;function o_(i){Dt._getMatrix(Uh,Dt.workingColorSpace,i);const e=`mat3( ${Uh.elements.map(t=>t.toFixed(4))} )`;switch(Dt.getTransfer(i)){case Fa:return[e,"LinearTransferOETF"];case Gt:return[e,"sRGBTransferOETF"];default:return ut("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Fh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+a_(i.getShaderSource(e),c)}else return r}function l_(i,e){const t=o_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const c_={[Qh]:"Linear",[eu]:"Reinhard",[tu]:"Cineon",[ql]:"ACESFilmic",[iu]:"AgX",[su]:"Neutral",[nu]:"Custom"};function h_(i,e){const t=c_[e];return t===void 0?(ut("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ya=new P;function u_(){Dt.getLuminanceCoefficients(ya);const i=ya.x.toFixed(4),e=ya.y.toFixed(4),t=ya.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function f_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function d_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function p_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function Er(i){return i!==""}function Oh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const m_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(i){return i.replace(m_,__)}const g_=new Map;function __(i,e){let t=Et[e];if(t===void 0){const n=g_.get(e);if(n!==void 0)t=Et[n],ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Hl(t)}const v_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kh(i){return i.replace(v_,x_)}function x_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const y_={[Tr]:"SHADOWMAP_TYPE_PCF",[Sr]:"SHADOWMAP_TYPE_VSM"};function M_(i){return y_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const b_={[cs]:"ENVMAP_TYPE_CUBE",[Zs]:"ENVMAP_TYPE_CUBE",[Ya]:"ENVMAP_TYPE_CUBE_UV"};function S_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":b_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const w_={[Zs]:"ENVMAP_MODE_REFRACTION"};function E_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":w_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const T_={[Yl]:"ENVMAP_BLENDING_MULTIPLY",[Df]:"ENVMAP_BLENDING_MIX",[Lf]:"ENVMAP_BLENDING_ADD"};function A_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":T_[i.combine]||"ENVMAP_BLENDING_NONE"}function R_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function C_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=M_(t),l=S_(t),h=E_(t),u=A_(t),f=R_(t),d=f_(t),_=d_(r),g=s.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Er).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(m=[zh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[zh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==mi?"#define TONE_MAPPING":"",t.toneMapping!==mi?Et.tonemapping_pars_fragment:"",t.toneMapping!==mi?h_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Et.colorspace_pars_fragment,l_("linearToOutputTexel",t.outputColorSpace),u_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),a=Hl(a),a=Oh(a,t),a=Bh(a,t),c=Hl(c),c=Oh(c,t),c=Bh(c,t),a=kh(a),c=kh(c),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=x+m+a,M=x+p+c,E=Nh(s,s.VERTEX_SHADER,y),S=Nh(s,s.FRAGMENT_SHADER,M);s.attachShader(g,E),s.attachShader(g,S),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(N){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(g)||"",Z=s.getShaderInfoLog(E)||"",J=s.getShaderInfoLog(S)||"",V=O.trim(),q=Z.trim(),X=J.trim();let ie=!0,oe=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,E,S);else{const de=Fh(s,E,"vertex"),ce=Fh(s,S,"fragment");Pt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+V+`
`+de+`
`+ce)}else V!==""?ut("WebGLProgram: Program Info Log:",V):(q===""||X==="")&&(oe=!1);oe&&(N.diagnostics={runnable:ie,programLog:V,vertexShader:{log:q,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(E),s.deleteShader(S),v=new Ia(s,g),A=p_(s,g)}let v;this.getUniforms=function(){return v===void 0&&T(this),v};let A;this.getAttributes=function(){return A===void 0&&T(this),A};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(g,s_)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=E,this.fragmentShader=S,this}let P_=0;class I_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new D_(e),t.set(e,n)),n}}class D_{constructor(e){this.id=P_++,this.code=e,this.usedTimes=0}}function L_(i){return i===hs||i===Da||i===La}function N_(i,e,t,n,s,r){const a=new sc,c=new I_,o=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return o.add(v),v===0?"uv":`uv${v}`}function g(v,A,I,N,O,Z){const J=N.fog,V=O.geometry,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||q,X),oe=ie&&ie.mapping===Ya?ie.image.height:null,de=d[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&ut("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const ce=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ye=ce!==void 0?ce.length:0;let We=0;V.morphAttributes.position!==void 0&&(We=1),V.morphAttributes.normal!==void 0&&(We=2),V.morphAttributes.color!==void 0&&(We=3);let ot,lt,re,Me;if(de){const Xe=hi[de];ot=Xe.vertexShader,lt=Xe.fragmentShader}else{ot=v.vertexShader,lt=v.fragmentShader;const Xe=c.getVertexShaderStage(v),Vt=c.getFragmentShaderStage(v);c.update(v,Xe,Vt),re=Xe.id,Me=Vt.id}const _e=i.getRenderTarget(),He=i.state.buffers.depth.getReversed(),Je=O.isInstancedMesh===!0,Ue=O.isBatchedMesh===!0,rt=!!v.map,se=!!v.matcap,H=!!ie,j=!!v.aoMap,te=!!v.lightMap,me=!!v.bumpMap&&v.wireframe===!1,xe=!!v.normalMap,Le=!!v.displacementMap,Ee=!!v.emissiveMap,Ge=!!v.metalnessMap,qe=!!v.roughnessMap,B=v.anisotropy>0,dt=v.clearcoat>0,ct=v.dispersion>0,L=v.iridescence>0,w=v.sheen>0,$=v.transmission>0,Q=B&&!!v.anisotropyMap,he=dt&&!!v.clearcoatMap,we=dt&&!!v.clearcoatNormalMap,Te=dt&&!!v.clearcoatRoughnessMap,ue=L&&!!v.iridescenceMap,ge=L&&!!v.iridescenceThicknessMap,Re=w&&!!v.sheenColorMap,Qe=w&&!!v.sheenRoughnessMap,Ne=!!v.specularMap,be=!!v.specularColorMap,Ze=!!v.specularIntensityMap,st=$&&!!v.transmissionMap,mt=$&&!!v.thicknessMap,k=!!v.gradientMap,Pe=!!v.alphaMap,fe=v.alphaTest>0,De=!!v.alphaHash,Be=!!v.extensions;let ve=mi;v.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(ve=i.toneMapping);const je={shaderID:de,shaderType:v.type,shaderName:v.name,vertexShader:ot,fragmentShader:lt,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:Me,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Ue,batchingColor:Ue&&O._colorsTexture!==null,instancing:Je,instancingColor:Je&&O.instanceColor!==null,instancingMorph:Je&&O.morphTexture!==null,outputColorSpace:_e===null?i.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Dt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:rt,matcap:se,envMap:H,envMapMode:H&&ie.mapping,envMapCubeUVHeight:oe,aoMap:j,lightMap:te,bumpMap:me,normalMap:xe,displacementMap:Le,emissiveMap:Ee,normalMapObjectSpace:xe&&v.normalMapType===Ff,normalMapTangentSpace:xe&&v.normalMapType===Na,packedNormalMap:xe&&v.normalMapType===Na&&L_(v.normalMap.format),metalnessMap:Ge,roughnessMap:qe,anisotropy:B,anisotropyMap:Q,clearcoat:dt,clearcoatMap:he,clearcoatNormalMap:we,clearcoatRoughnessMap:Te,dispersion:ct,iridescence:L,iridescenceMap:ue,iridescenceThicknessMap:ge,sheen:w,sheenColorMap:Re,sheenRoughnessMap:Qe,specularMap:Ne,specularColorMap:be,specularIntensityMap:Ze,transmission:$,transmissionMap:st,thicknessMap:mt,gradientMap:k,opaque:v.transparent===!1&&v.blending===Ws&&v.alphaToCoverage===!1,alphaMap:Pe,alphaTest:fe,alphaHash:De,combine:v.combine,mapUv:rt&&_(v.map.channel),aoMapUv:j&&_(v.aoMap.channel),lightMapUv:te&&_(v.lightMap.channel),bumpMapUv:me&&_(v.bumpMap.channel),normalMapUv:xe&&_(v.normalMap.channel),displacementMapUv:Le&&_(v.displacementMap.channel),emissiveMapUv:Ee&&_(v.emissiveMap.channel),metalnessMapUv:Ge&&_(v.metalnessMap.channel),roughnessMapUv:qe&&_(v.roughnessMap.channel),anisotropyMapUv:Q&&_(v.anisotropyMap.channel),clearcoatMapUv:he&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:we&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Qe&&_(v.sheenRoughnessMap.channel),specularMapUv:Ne&&_(v.specularMap.channel),specularColorMapUv:be&&_(v.specularColorMap.channel),specularIntensityMapUv:Ze&&_(v.specularIntensityMap.channel),transmissionMapUv:st&&_(v.transmissionMap.channel),thicknessMapUv:mt&&_(v.thicknessMap.channel),alphaMapUv:Pe&&_(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(xe||B),vertexNormals:!!V.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!V.attributes.uv&&(rt||Pe),fog:!!J,useFog:v.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&xe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:He,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:V.attributes.position!==void 0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:We,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:Z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ve,decodeVideoTexture:rt&&v.map.isVideoTexture===!0&&Dt.getTransfer(v.map.colorSpace)===Gt,decodeVideoTextureEmissive:Ee&&v.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(v.emissiveMap.colorSpace)===Gt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Zt,flipSided:v.side===vn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Be&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&v.extensions.multiDraw===!0||Ue)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return je.vertexUv1s=o.has(1),je.vertexUv2s=o.has(2),je.vertexUv3s=o.has(3),o.clear(),je}function m(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)A.push(I),A.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(p(A,v),x(A,v),A.push(i.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function p(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function x(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function y(v){const A=d[v.type];let I;if(A){const N=hi[A];I=Jd.clone(N.uniforms)}else I=v.uniforms;return I}function M(v,A){let I=h.get(A);return I!==void 0?++I.usedTimes:(I=new C_(i,A,v,s),l.push(I),h.set(A,I)),I}function E(v){if(--v.usedTimes===0){const A=l.indexOf(v);l[A]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function S(v){c.remove(v)}function T(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:M,releaseProgram:E,releaseShaderCache:S,programs:l,dispose:T}}function U_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function F_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Vh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Hh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function c(f,d,_,g,m,p){let x=i[e];return x===void 0?(x={id:f.id,object:f,geometry:d,material:_,materialVariant:a(f),groupOrder:g,renderOrder:f.renderOrder,z:m,group:p},i[e]=x):(x.id=f.id,x.object=f,x.geometry=d,x.material=_,x.materialVariant=a(f),x.groupOrder=g,x.renderOrder=f.renderOrder,x.z=m,x.group=p),e++,x}function o(f,d,_,g,m,p){const x=c(f,d,_,g,m,p);_.transmission>0?n.push(x):_.transparent===!0?s.push(x):t.push(x)}function l(f,d,_,g,m,p){const x=c(f,d,_,g,m,p);_.transmission>0?n.unshift(x):_.transparent===!0?s.unshift(x):t.unshift(x)}function h(f,d,_){t.length>1&&t.sort(f||F_),n.length>1&&n.sort(d||Vh),s.length>1&&s.sort(d||Vh),_&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let f=e,d=i.length;f<d;f++){const _=i[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:h}}function O_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Hh,i.set(n,[a])):s>=r.length?(a=new Hh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function B_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new yt};break;case"SpotLight":t={position:new P,direction:new P,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function k_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let z_=0;function V_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function H_(i){const e=new B_,t=k_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const s=new P,r=new zt,a=new zt;function c(l){let h=0,u=0,f=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let d=0,_=0,g=0,m=0,p=0,x=0,y=0,M=0,E=0,S=0,T=0;l.sort(V_);for(let A=0,I=l.length;A<I;A++){const N=l[A],O=N.color,Z=N.intensity,J=N.distance;let V=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===hs?V=N.shadow.map.texture:V=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=O.r*Z,u+=O.g*Z,f+=O.b*Z;else if(N.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(N.sh.coefficients[q],Z);T++}else if(N.isDirectionalLight){const q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const X=N.shadow,ie=t.get(N);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,n.directionalShadow[d]=ie,n.directionalShadowMap[d]=V,n.directionalShadowMatrix[d]=N.shadow.matrix,x++}n.directional[d]=q,d++}else if(N.isSpotLight){const q=e.get(N);q.position.setFromMatrixPosition(N.matrixWorld),q.color.copy(O).multiplyScalar(Z),q.distance=J,q.coneCos=Math.cos(N.angle),q.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),q.decay=N.decay,n.spot[g]=q;const X=N.shadow;if(N.map&&(n.spotLightMap[E]=N.map,E++,X.updateMatrices(N),N.castShadow&&S++),n.spotLightMatrix[g]=X.matrix,N.castShadow){const ie=t.get(N);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,n.spotShadow[g]=ie,n.spotShadowMap[g]=V,M++}g++}else if(N.isRectAreaLight){const q=e.get(N);q.color.copy(O).multiplyScalar(Z),q.halfWidth.set(N.width*.5,0,0),q.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=q,m++}else if(N.isPointLight){const q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),q.distance=N.distance,q.decay=N.decay,N.castShadow){const X=N.shadow,ie=t.get(N);ie.shadowIntensity=X.intensity,ie.shadowBias=X.bias,ie.shadowNormalBias=X.normalBias,ie.shadowRadius=X.radius,ie.shadowMapSize=X.mapSize,ie.shadowCameraNear=X.camera.near,ie.shadowCameraFar=X.camera.far,n.pointShadow[_]=ie,n.pointShadowMap[_]=V,n.pointShadowMatrix[_]=N.shadow.matrix,y++}n.point[_]=q,_++}else if(N.isHemisphereLight){const q=e.get(N);q.skyColor.copy(N.color).multiplyScalar(Z),q.groundColor.copy(N.groundColor).multiplyScalar(Z),n.hemi[p]=q,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Oe.LTC_FLOAT_1,n.rectAreaLTC2=Oe.LTC_FLOAT_2):(n.rectAreaLTC1=Oe.LTC_HALF_1,n.rectAreaLTC2=Oe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const v=n.hash;(v.directionalLength!==d||v.pointLength!==_||v.spotLength!==g||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==x||v.numPointShadows!==y||v.numSpotShadows!==M||v.numSpotMaps!==E||v.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+E-S,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=T,v.directionalLength=d,v.pointLength=_,v.spotLength=g,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=x,v.numPointShadows=y,v.numSpotShadows=M,v.numSpotMaps=E,v.numLightProbes=T,n.version=z_++)}function o(l,h){let u=0,f=0,d=0,_=0,g=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const y=l[p];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(y.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const M=n.rectArea[_];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const M=n.hemi[g];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(m),g++}}}return{setup:c,setupView:o,state:n}}function Gh(i){const e=new H_(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function c(f){n.push(f)}function o(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function G_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new Gh(i),e.set(s,[c])):r>=a.length?(c=new Gh(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const W_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X_=`uniform sampler2D shadow_pass;
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
}`,Y_=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],q_=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Wh=new zt,Mr=new P,Oo=new P;function Z_(i,e,t){let n=new rc;const s=new K,r=new K,a=new Qt,c=new n0,o=new i0,l={},h=t.maxTextureSize,u={[Ui]:vn,[vn]:Ui,[Zt]:Zt},f=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:W_,fragmentShader:X_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const _=new rn;_.setAttribute("position",new Kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new le(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tr;let p=this.type;this.render=function(S,T,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===df&&(ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Tr);const A=i.getRenderTarget(),I=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Ii),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const Z=p!==this.type;Z&&T.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(V=>V.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,V=S.length;J<V;J++){const q=S[J],X=q.shadow;if(X===void 0){ut("WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const ie=X.getFrameExtents();s.multiply(ie),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,X.mapSize.y=r.y));const oe=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=oe,X.map===null||Z===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Sr){if(q.isPointLight){ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new gi(s.x,s.y,{format:hs,type:Fi,minFilter:_n,magFilter:_n,generateMipmaps:!1}),X.map.texture.name=q.name+".shadowMap",X.map.depthTexture=new $s(s.x,s.y,ni),X.map.depthTexture.name=q.name+".shadowMapDepth",X.map.depthTexture.format=Oi,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=dn,X.map.depthTexture.magFilter=dn}else q.isPointLight?(X.map=new zu(s.x),X.map.depthTexture=new vd(s.x,xi)):(X.map=new gi(s.x,s.y),X.map.depthTexture=new $s(s.x,s.y,xi)),X.map.depthTexture.name=q.name+".shadowMap",X.map.depthTexture.format=Oi,this.type===Tr?(X.map.depthTexture.compareFunction=oe?nc:tc,X.map.depthTexture.minFilter=_n,X.map.depthTexture.magFilter=_n):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=dn,X.map.depthTexture.magFilter=dn);X.camera.updateProjectionMatrix()}const de=X.map.isWebGLCubeRenderTarget?6:1;for(let ce=0;ce<de;ce++){if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,ce),i.clear();else{ce===0&&(i.setRenderTarget(X.map),i.clear());const ye=X.getViewport(ce);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),O.viewport(a)}if(q.isPointLight){const ye=X.camera,We=X.matrix,ot=q.distance||ye.far;ot!==ye.far&&(ye.far=ot,ye.updateProjectionMatrix()),Mr.setFromMatrixPosition(q.matrixWorld),ye.position.copy(Mr),Oo.copy(ye.position),Oo.add(Y_[ce]),ye.up.copy(q_[ce]),ye.lookAt(Oo),ye.updateMatrixWorld(),We.makeTranslation(-Mr.x,-Mr.y,-Mr.z),Wh.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Wh,ye.coordinateSystem,ye.reversedDepth)}else X.updateMatrices(q);n=X.getFrustum(),M(T,v,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===Sr&&x(X,v),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(A,I,N)};function x(S,T){const v=e.update(g);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new gi(s.x,s.y,{format:hs,type:Fi})),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(T,null,v,f,g,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(T,null,v,d,g,null)}function y(S,T,v,A){let I=null;const N=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(N!==void 0)I=N;else if(I=v.isPointLight===!0?o:c,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const O=I.uuid,Z=T.uuid;let J=l[O];J===void 0&&(J={},l[O]=J);let V=J[Z];V===void 0&&(V=I.clone(),J[Z]=V,T.addEventListener("dispose",E)),I=V}if(I.visible=T.visible,I.wireframe=T.wireframe,A===Sr?I.side=T.shadowSide!==null?T.shadowSide:T.side:I.side=T.shadowSide!==null?T.shadowSide:u[T.side],I.alphaMap=T.alphaMap,I.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,I.map=T.map,I.clipShadows=T.clipShadows,I.clippingPlanes=T.clippingPlanes,I.clipIntersection=T.clipIntersection,I.displacementMap=T.displacementMap,I.displacementScale=T.displacementScale,I.displacementBias=T.displacementBias,I.wireframeLinewidth=T.wireframeLinewidth,I.linewidth=T.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const O=i.properties.get(I);O.light=v}return I}function M(S,T,v,A,I){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&I===Sr)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);const Z=e.update(S),J=S.material;if(Array.isArray(J)){const V=Z.groups;for(let q=0,X=V.length;q<X;q++){const ie=V[q],oe=J[ie.materialIndex];if(oe&&oe.visible){const de=y(S,oe,A,I);S.onBeforeShadow(i,S,T,v,Z,de,ie),i.renderBufferDirect(v,null,Z,de,S,ie),S.onAfterShadow(i,S,T,v,Z,de,ie)}}}else if(J.visible){const V=y(S,J,A,I);S.onBeforeShadow(i,S,T,v,Z,V,null),i.renderBufferDirect(v,null,Z,V,S,null),S.onAfterShadow(i,S,T,v,Z,V,null)}}const O=S.children;for(let Z=0,J=O.length;Z<J;Z++)M(O[Z],T,v,A,I)}function E(S){S.target.removeEventListener("dispose",E);for(const v in l){const A=l[v],I=S.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function $_(i,e){function t(){let k=!1;const Pe=new Qt;let fe=null;const De=new Qt(0,0,0,0);return{setMask:function(Be){fe!==Be&&!k&&(i.colorMask(Be,Be,Be,Be),fe=Be)},setLocked:function(Be){k=Be},setClear:function(Be,ve,je,Xe,Vt){Vt===!0&&(Be*=Xe,ve*=Xe,je*=Xe),Pe.set(Be,ve,je,Xe),De.equals(Pe)===!1&&(i.clearColor(Be,ve,je,Xe),De.copy(Pe))},reset:function(){k=!1,fe=null,De.set(-1,0,0,0)}}}function n(){let k=!1,Pe=!1,fe=null,De=null,Be=null;return{setReversed:function(ve){if(Pe!==ve){const je=e.get("EXT_clip_control");ve?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT),Pe=ve;const Xe=Be;Be=null,this.setClear(Xe)}},getReversed:function(){return Pe},setTest:function(ve){ve?_e(i.DEPTH_TEST):He(i.DEPTH_TEST)},setMask:function(ve){fe!==ve&&!k&&(i.depthMask(ve),fe=ve)},setFunc:function(ve){if(Pe&&(ve=Yf[ve]),De!==ve){switch(ve){case Ko:i.depthFunc(i.NEVER);break;case Jo:i.depthFunc(i.ALWAYS);break;case jo:i.depthFunc(i.LESS);break;case qs:i.depthFunc(i.LEQUAL);break;case Qo:i.depthFunc(i.EQUAL);break;case el:i.depthFunc(i.GEQUAL);break;case tl:i.depthFunc(i.GREATER);break;case nl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}De=ve}},setLocked:function(ve){k=ve},setClear:function(ve){Be!==ve&&(Be=ve,Pe&&(ve=1-ve),i.clearDepth(ve))},reset:function(){k=!1,fe=null,De=null,Be=null,Pe=!1}}}function s(){let k=!1,Pe=null,fe=null,De=null,Be=null,ve=null,je=null,Xe=null,Vt=null;return{setTest:function(Wt){k||(Wt?_e(i.STENCIL_TEST):He(i.STENCIL_TEST))},setMask:function(Wt){Pe!==Wt&&!k&&(i.stencilMask(Wt),Pe=Wt)},setFunc:function(Wt,Hn,Dn){(fe!==Wt||De!==Hn||Be!==Dn)&&(i.stencilFunc(Wt,Hn,Dn),fe=Wt,De=Hn,Be=Dn)},setOp:function(Wt,Hn,Dn){(ve!==Wt||je!==Hn||Xe!==Dn)&&(i.stencilOp(Wt,Hn,Dn),ve=Wt,je=Hn,Xe=Dn)},setLocked:function(Wt){k=Wt},setClear:function(Wt){Vt!==Wt&&(i.clearStencil(Wt),Vt=Wt)},reset:function(){k=!1,Pe=null,fe=null,De=null,Be=null,ve=null,je=null,Xe=null,Vt=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let h={},u={},f={},d=new WeakMap,_=[],g=null,m=!1,p=null,x=null,y=null,M=null,E=null,S=null,T=null,v=new yt(0,0,0),A=0,I=!1,N=null,O=null,Z=null,J=null,V=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ie=0;const oe=i.getParameter(i.VERSION);oe.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(oe)[1]),X=ie>=1):oe.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),X=ie>=2);let de=null,ce={};const ye=i.getParameter(i.SCISSOR_BOX),We=i.getParameter(i.VIEWPORT),ot=new Qt().fromArray(ye),lt=new Qt().fromArray(We);function re(k,Pe,fe,De){const Be=new Uint8Array(4),ve=i.createTexture();i.bindTexture(k,ve),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<fe;je++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(Pe,0,i.RGBA,1,1,De,0,i.RGBA,i.UNSIGNED_BYTE,Be):i.texImage2D(Pe+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Be);return ve}const Me={};Me[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),Me[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Me[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),_e(i.DEPTH_TEST),a.setFunc(qs),me(!1),xe(Dc),_e(i.CULL_FACE),j(Ii);function _e(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function He(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function Je(k,Pe){return f[k]!==Pe?(i.bindFramebuffer(k,Pe),f[k]=Pe,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Pe),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Pe),!0):!1}function Ue(k,Pe){let fe=_,De=!1;if(k){fe=d.get(Pe),fe===void 0&&(fe=[],d.set(Pe,fe));const Be=k.textures;if(fe.length!==Be.length||fe[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,je=Be.length;ve<je;ve++)fe[ve]=i.COLOR_ATTACHMENT0+ve;fe.length=Be.length,De=!0}}else fe[0]!==i.BACK&&(fe[0]=i.BACK,De=!0);De&&i.drawBuffers(fe)}function rt(k){return g!==k?(i.useProgram(k),g=k,!0):!1}const se={[ss]:i.FUNC_ADD,[mf]:i.FUNC_SUBTRACT,[gf]:i.FUNC_REVERSE_SUBTRACT};se[_f]=i.MIN,se[vf]=i.MAX;const H={[xf]:i.ZERO,[yf]:i.ONE,[Mf]:i.SRC_COLOR,[Zo]:i.SRC_ALPHA,[Af]:i.SRC_ALPHA_SATURATE,[Ef]:i.DST_COLOR,[Sf]:i.DST_ALPHA,[bf]:i.ONE_MINUS_SRC_COLOR,[$o]:i.ONE_MINUS_SRC_ALPHA,[Tf]:i.ONE_MINUS_DST_COLOR,[wf]:i.ONE_MINUS_DST_ALPHA,[Rf]:i.CONSTANT_COLOR,[Cf]:i.ONE_MINUS_CONSTANT_COLOR,[Pf]:i.CONSTANT_ALPHA,[If]:i.ONE_MINUS_CONSTANT_ALPHA};function j(k,Pe,fe,De,Be,ve,je,Xe,Vt,Wt){if(k===Ii){m===!0&&(He(i.BLEND),m=!1);return}if(m===!1&&(_e(i.BLEND),m=!0),k!==pf){if(k!==p||Wt!==I){if((x!==ss||E!==ss)&&(i.blendEquation(i.FUNC_ADD),x=ss,E=ss),Wt)switch(k){case Ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lc:i.blendFunc(i.ONE,i.ONE);break;case Nc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Pt("WebGLState: Invalid blending: ",k);break}else switch(k){case Ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Nc:Pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uc:Pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pt("WebGLState: Invalid blending: ",k);break}y=null,M=null,S=null,T=null,v.set(0,0,0),A=0,p=k,I=Wt}return}Be=Be||Pe,ve=ve||fe,je=je||De,(Pe!==x||Be!==E)&&(i.blendEquationSeparate(se[Pe],se[Be]),x=Pe,E=Be),(fe!==y||De!==M||ve!==S||je!==T)&&(i.blendFuncSeparate(H[fe],H[De],H[ve],H[je]),y=fe,M=De,S=ve,T=je),(Xe.equals(v)===!1||Vt!==A)&&(i.blendColor(Xe.r,Xe.g,Xe.b,Vt),v.copy(Xe),A=Vt),p=k,I=!1}function te(k,Pe){k.side===Zt?He(i.CULL_FACE):_e(i.CULL_FACE);let fe=k.side===vn;Pe&&(fe=!fe),me(fe),k.blending===Ws&&k.transparent===!1?j(Ii):j(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const De=k.stencilWrite;c.setTest(De),De&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ee(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?_e(i.SAMPLE_ALPHA_TO_COVERAGE):He(i.SAMPLE_ALPHA_TO_COVERAGE)}function me(k){N!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),N=k)}function xe(k){k!==uf?(_e(i.CULL_FACE),k!==O&&(k===Dc?i.cullFace(i.BACK):k===ff?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):He(i.CULL_FACE),O=k}function Le(k){k!==Z&&(X&&i.lineWidth(k),Z=k)}function Ee(k,Pe,fe){k?(_e(i.POLYGON_OFFSET_FILL),(J!==Pe||V!==fe)&&(J=Pe,V=fe,a.getReversed()&&(Pe=-Pe),i.polygonOffset(Pe,fe))):He(i.POLYGON_OFFSET_FILL)}function Ge(k){k?_e(i.SCISSOR_TEST):He(i.SCISSOR_TEST)}function qe(k){k===void 0&&(k=i.TEXTURE0+q-1),de!==k&&(i.activeTexture(k),de=k)}function B(k,Pe,fe){fe===void 0&&(de===null?fe=i.TEXTURE0+q-1:fe=de);let De=ce[fe];De===void 0&&(De={type:void 0,texture:void 0},ce[fe]=De),(De.type!==k||De.texture!==Pe)&&(de!==fe&&(i.activeTexture(fe),de=fe),i.bindTexture(k,Pe||Me[k]),De.type=k,De.texture=Pe)}function dt(){const k=ce[de];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ct(){try{i.compressedTexImage2D(...arguments)}catch(k){Pt("WebGLState:",k)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(k){Pt("WebGLState:",k)}}function w(){try{i.texSubImage2D(...arguments)}catch(k){Pt("WebGLState:",k)}}function $(){try{i.texSubImage3D(...arguments)}catch(k){Pt("WebGLState:",k)}}function Q(){try{i.compressedTexSubImage2D(...arguments)}catch(k){Pt("WebGLState:",k)}}function he(){try{i.compressedTexSubImage3D(...arguments)}catch(k){Pt("WebGLState:",k)}}function we(){try{i.texStorage2D(...arguments)}catch(k){Pt("WebGLState:",k)}}function Te(){try{i.texStorage3D(...arguments)}catch(k){Pt("WebGLState:",k)}}function ue(){try{i.texImage2D(...arguments)}catch(k){Pt("WebGLState:",k)}}function ge(){try{i.texImage3D(...arguments)}catch(k){Pt("WebGLState:",k)}}function Re(k){return u[k]!==void 0?u[k]:i.getParameter(k)}function Qe(k,Pe){u[k]!==Pe&&(i.pixelStorei(k,Pe),u[k]=Pe)}function Ne(k){ot.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),ot.copy(k))}function be(k){lt.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),lt.copy(k))}function Ze(k,Pe){let fe=l.get(Pe);fe===void 0&&(fe=new WeakMap,l.set(Pe,fe));let De=fe.get(k);De===void 0&&(De=i.getUniformBlockIndex(Pe,k.name),fe.set(k,De))}function st(k,Pe){const De=l.get(Pe).get(k);o.get(Pe)!==De&&(i.uniformBlockBinding(Pe,De,k.__bindingPointIndex),o.set(Pe,De))}function mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},de=null,ce={},f={},d=new WeakMap,_=[],g=null,m=!1,p=null,x=null,y=null,M=null,E=null,S=null,T=null,v=new yt(0,0,0),A=0,I=!1,N=null,O=null,Z=null,J=null,V=null,ot.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:_e,disable:He,bindFramebuffer:Je,drawBuffers:Ue,useProgram:rt,setBlending:j,setMaterial:te,setFlipSided:me,setCullFace:xe,setLineWidth:Le,setPolygonOffset:Ee,setScissorTest:Ge,activeTexture:qe,bindTexture:B,unbindTexture:dt,compressedTexImage2D:ct,compressedTexImage3D:L,texImage2D:ue,texImage3D:ge,pixelStorei:Qe,getParameter:Re,updateUBOMapping:Ze,uniformBlockBinding:st,texStorage2D:we,texStorage3D:Te,texSubImage2D:w,texSubImage3D:$,compressedTexSubImage2D:Q,compressedTexSubImage3D:he,scissor:Ne,viewport:be,reset:mt}}function K_(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new K,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,w){return _?new OffscreenCanvas(L,w):Oa("canvas")}function m(L,w,$){let Q=1;const he=ct(L);if((he.width>$||he.height>$)&&(Q=$/Math.max(he.width,he.height)),Q<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const we=Math.floor(Q*he.width),Te=Math.floor(Q*he.height);f===void 0&&(f=g(we,Te));const ue=w?g(we,Te):f;return ue.width=we,ue.height=Te,ue.getContext("2d").drawImage(L,0,0,we,Te),ut("WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+we+"x"+Te+")."),ue}else return"data"in L&&ut("WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),L;return L}function p(L){return L.generateMipmaps}function x(L){i.generateMipmap(L)}function y(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(L,w,$,Q,he,we=!1){if(L!==null){if(i[L]!==void 0)return i[L];ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Te;Q&&(Te=e.get("EXT_texture_norm16"),Te||ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=w;if(w===i.RED&&($===i.FLOAT&&(ue=i.R32F),$===i.HALF_FLOAT&&(ue=i.R16F),$===i.UNSIGNED_BYTE&&(ue=i.R8),$===i.UNSIGNED_SHORT&&Te&&(ue=Te.R16_EXT),$===i.SHORT&&Te&&(ue=Te.R16_SNORM_EXT)),w===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.R8UI),$===i.UNSIGNED_SHORT&&(ue=i.R16UI),$===i.UNSIGNED_INT&&(ue=i.R32UI),$===i.BYTE&&(ue=i.R8I),$===i.SHORT&&(ue=i.R16I),$===i.INT&&(ue=i.R32I)),w===i.RG&&($===i.FLOAT&&(ue=i.RG32F),$===i.HALF_FLOAT&&(ue=i.RG16F),$===i.UNSIGNED_BYTE&&(ue=i.RG8),$===i.UNSIGNED_SHORT&&Te&&(ue=Te.RG16_EXT),$===i.SHORT&&Te&&(ue=Te.RG16_SNORM_EXT)),w===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.RG8UI),$===i.UNSIGNED_SHORT&&(ue=i.RG16UI),$===i.UNSIGNED_INT&&(ue=i.RG32UI),$===i.BYTE&&(ue=i.RG8I),$===i.SHORT&&(ue=i.RG16I),$===i.INT&&(ue=i.RG32I)),w===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.RGB8UI),$===i.UNSIGNED_SHORT&&(ue=i.RGB16UI),$===i.UNSIGNED_INT&&(ue=i.RGB32UI),$===i.BYTE&&(ue=i.RGB8I),$===i.SHORT&&(ue=i.RGB16I),$===i.INT&&(ue=i.RGB32I)),w===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(ue=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(ue=i.RGBA16UI),$===i.UNSIGNED_INT&&(ue=i.RGBA32UI),$===i.BYTE&&(ue=i.RGBA8I),$===i.SHORT&&(ue=i.RGBA16I),$===i.INT&&(ue=i.RGBA32I)),w===i.RGB&&($===i.UNSIGNED_SHORT&&Te&&(ue=Te.RGB16_EXT),$===i.SHORT&&Te&&(ue=Te.RGB16_SNORM_EXT),$===i.UNSIGNED_INT_5_9_9_9_REV&&(ue=i.RGB9_E5),$===i.UNSIGNED_INT_10F_11F_11F_REV&&(ue=i.R11F_G11F_B10F)),w===i.RGBA){const ge=we?Fa:Dt.getTransfer(he);$===i.FLOAT&&(ue=i.RGBA32F),$===i.HALF_FLOAT&&(ue=i.RGBA16F),$===i.UNSIGNED_BYTE&&(ue=ge===Gt?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT&&Te&&(ue=Te.RGBA16_EXT),$===i.SHORT&&Te&&(ue=Te.RGBA16_SNORM_EXT),$===i.UNSIGNED_SHORT_4_4_4_4&&(ue=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(ue=i.RGB5_A1)}return(ue===i.R16F||ue===i.R32F||ue===i.RG16F||ue===i.RG32F||ue===i.RGBA16F||ue===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function E(L,w){let $;return L?w===null||w===xi||w===Ir?$=i.DEPTH24_STENCIL8:w===ni?$=i.DEPTH32F_STENCIL8:w===Pr&&($=i.DEPTH24_STENCIL8,ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===xi||w===Ir?$=i.DEPTH_COMPONENT24:w===ni?$=i.DEPTH_COMPONENT32F:w===Pr&&($=i.DEPTH_COMPONENT16),$}function S(L,w){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==dn&&L.minFilter!==_n?Math.log2(Math.max(w.width,w.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?w.mipmaps.length:1}function T(L){const w=L.target;w.removeEventListener("dispose",T),A(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&u.delete(w)}function v(L){const w=L.target;w.removeEventListener("dispose",v),N(w)}function A(L){const w=n.get(L);if(w.__webglInit===void 0)return;const $=L.source,Q=d.get($);if(Q){const he=Q[w.__cacheKey];he.usedTimes--,he.usedTimes===0&&I(L),Object.keys(Q).length===0&&d.delete($)}n.remove(L)}function I(L){const w=n.get(L);i.deleteTexture(w.__webglTexture);const $=L.source,Q=d.get($);delete Q[w.__cacheKey],a.memory.textures--}function N(L){const w=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(w.__webglFramebuffer[Q]))for(let he=0;he<w.__webglFramebuffer[Q].length;he++)i.deleteFramebuffer(w.__webglFramebuffer[Q][he]);else i.deleteFramebuffer(w.__webglFramebuffer[Q]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[Q])}else{if(Array.isArray(w.__webglFramebuffer))for(let Q=0;Q<w.__webglFramebuffer.length;Q++)i.deleteFramebuffer(w.__webglFramebuffer[Q]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Q=0;Q<w.__webglColorRenderbuffer.length;Q++)w.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[Q]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const $=L.textures;for(let Q=0,he=$.length;Q<he;Q++){const we=n.get($[Q]);we.__webglTexture&&(i.deleteTexture(we.__webglTexture),a.memory.textures--),n.remove($[Q])}n.remove(L)}let O=0;function Z(){O=0}function J(){return O}function V(L){O=L}function q(){const L=O;return L>=s.maxTextures&&ut("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),O+=1,L}function X(L){const w=[];return w.push(L.wrapS),w.push(L.wrapT),w.push(L.wrapR||0),w.push(L.magFilter),w.push(L.minFilter),w.push(L.anisotropy),w.push(L.internalFormat),w.push(L.format),w.push(L.type),w.push(L.generateMipmaps),w.push(L.premultiplyAlpha),w.push(L.flipY),w.push(L.unpackAlignment),w.push(L.colorSpace),w.join()}function ie(L,w){const $=n.get(L);if(L.isVideoTexture&&B(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&$.__version!==L.version){const Q=L.image;if(Q===null)ut("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)ut("WebGLRenderer: Texture marked for update but image is incomplete");else{He($,L,w);return}}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+w)}function oe(L,w){const $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){He($,L,w);return}else L.isExternalTexture&&($.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+w)}function de(L,w){const $=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&$.__version!==L.version){He($,L,w);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+w)}function ce(L,w){const $=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&$.__version!==L.version){Je($,L,w);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+w)}const ye={[gn]:i.REPEAT,[Pi]:i.CLAMP_TO_EDGE,[il]:i.MIRRORED_REPEAT},We={[dn]:i.NEAREST,[Nf]:i.NEAREST_MIPMAP_NEAREST,[Wr]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[eo]:i.LINEAR_MIPMAP_NEAREST,[as]:i.LINEAR_MIPMAP_LINEAR},ot={[Of]:i.NEVER,[Hf]:i.ALWAYS,[Bf]:i.LESS,[tc]:i.LEQUAL,[kf]:i.EQUAL,[nc]:i.GEQUAL,[zf]:i.GREATER,[Vf]:i.NOTEQUAL};function lt(L,w){if(w.type===ni&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===_n||w.magFilter===eo||w.magFilter===Wr||w.magFilter===as||w.minFilter===_n||w.minFilter===eo||w.minFilter===Wr||w.minFilter===as)&&ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,ye[w.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,ye[w.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,ye[w.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,We[w.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,We[w.minFilter]),w.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,ot[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===dn||w.minFilter!==Wr&&w.minFilter!==as||w.type===ni&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function re(L,w){let $=!1;L.__webglInit===void 0&&(L.__webglInit=!0,w.addEventListener("dispose",T));const Q=w.source;let he=d.get(Q);he===void 0&&(he={},d.set(Q,he));const we=X(w);if(we!==L.__cacheKey){he[we]===void 0&&(he[we]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,$=!0),he[we].usedTimes++;const Te=he[L.__cacheKey];Te!==void 0&&(he[L.__cacheKey].usedTimes--,Te.usedTimes===0&&I(w)),L.__cacheKey=we,L.__webglTexture=he[we].texture}return $}function Me(L,w,$){return Math.floor(Math.floor(L/$)/w)}function _e(L,w,$,Q){const we=L.updateRanges;if(we.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,$,Q,w.data);else{we.sort((Qe,Ne)=>Qe.start-Ne.start);let Te=0;for(let Qe=1;Qe<we.length;Qe++){const Ne=we[Te],be=we[Qe],Ze=Ne.start+Ne.count,st=Me(be.start,w.width,4),mt=Me(Ne.start,w.width,4);be.start<=Ze+1&&st===mt&&Me(be.start+be.count-1,w.width,4)===st?Ne.count=Math.max(Ne.count,be.start+be.count-Ne.start):(++Te,we[Te]=be)}we.length=Te+1;const ue=t.getParameter(i.UNPACK_ROW_LENGTH),ge=t.getParameter(i.UNPACK_SKIP_PIXELS),Re=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let Qe=0,Ne=we.length;Qe<Ne;Qe++){const be=we[Qe],Ze=Math.floor(be.start/4),st=Math.ceil(be.count/4),mt=Ze%w.width,k=Math.floor(Ze/w.width),Pe=st,fe=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,mt),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,mt,k,Pe,fe,$,Q,w.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ue),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ge),t.pixelStorei(i.UNPACK_SKIP_ROWS,Re)}}function He(L,w,$){let Q=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Q=i.TEXTURE_3D);const he=re(L,w),we=w.source;t.bindTexture(Q,L.__webglTexture,i.TEXTURE0+$);const Te=n.get(we);if(we.version!==Te.__version||he===!0){if(t.activeTexture(i.TEXTURE0+$),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const fe=Dt.getPrimaries(Dt.workingColorSpace),De=w.colorSpace===$i?null:Dt.getPrimaries(w.colorSpace),Be=w.colorSpace===$i||fe===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be)}t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment);let ge=m(w.image,!1,s.maxTextureSize);ge=dt(w,ge);const Re=r.convert(w.format,w.colorSpace),Qe=r.convert(w.type);let Ne=M(w.internalFormat,Re,Qe,w.normalized,w.colorSpace,w.isVideoTexture);lt(Q,w);let be;const Ze=w.mipmaps,st=w.isVideoTexture!==!0,mt=Te.__version===void 0||he===!0,k=we.dataReady,Pe=S(w,ge);if(w.isDepthTexture)Ne=E(w.format===os,w.type),mt&&(st?t.texStorage2D(i.TEXTURE_2D,1,Ne,ge.width,ge.height):t.texImage2D(i.TEXTURE_2D,0,Ne,ge.width,ge.height,0,Re,Qe,null));else if(w.isDataTexture)if(Ze.length>0){st&&mt&&t.texStorage2D(i.TEXTURE_2D,Pe,Ne,Ze[0].width,Ze[0].height);for(let fe=0,De=Ze.length;fe<De;fe++)be=Ze[fe],st?k&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,be.width,be.height,Re,Qe,be.data):t.texImage2D(i.TEXTURE_2D,fe,Ne,be.width,be.height,0,Re,Qe,be.data);w.generateMipmaps=!1}else st?(mt&&t.texStorage2D(i.TEXTURE_2D,Pe,Ne,ge.width,ge.height),k&&_e(w,ge,Re,Qe)):t.texImage2D(i.TEXTURE_2D,0,Ne,ge.width,ge.height,0,Re,Qe,ge.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){st&&mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,Ne,Ze[0].width,Ze[0].height,ge.depth);for(let fe=0,De=Ze.length;fe<De;fe++)if(be=Ze[fe],w.format!==ii)if(Re!==null)if(st){if(k)if(w.layerUpdates.size>0){const Be=bh(be.width,be.height,w.format,w.type);for(const ve of w.layerUpdates){const je=be.data.subarray(ve*Be/be.data.BYTES_PER_ELEMENT,(ve+1)*Be/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,ve,be.width,be.height,1,Re,je)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,be.width,be.height,ge.depth,Re,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,Ne,be.width,be.height,ge.depth,0,be.data,0,0);else ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,be.width,be.height,ge.depth,Re,Qe,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,Ne,be.width,be.height,ge.depth,0,Re,Qe,be.data)}else{st&&mt&&t.texStorage2D(i.TEXTURE_2D,Pe,Ne,Ze[0].width,Ze[0].height);for(let fe=0,De=Ze.length;fe<De;fe++)be=Ze[fe],w.format!==ii?Re!==null?st?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,be.width,be.height,Re,be.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,Ne,be.width,be.height,0,be.data):ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?k&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,be.width,be.height,Re,Qe,be.data):t.texImage2D(i.TEXTURE_2D,fe,Ne,be.width,be.height,0,Re,Qe,be.data)}else if(w.isDataArrayTexture)if(st){if(mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,Ne,ge.width,ge.height,ge.depth),k)if(w.layerUpdates.size>0){const fe=bh(ge.width,ge.height,w.format,w.type);for(const De of w.layerUpdates){const Be=ge.data.subarray(De*fe/ge.data.BYTES_PER_ELEMENT,(De+1)*fe/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,De,ge.width,ge.height,1,Re,Qe,Be)}w.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Re,Qe,ge.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ne,ge.width,ge.height,ge.depth,0,Re,Qe,ge.data);else if(w.isData3DTexture)st?(mt&&t.texStorage3D(i.TEXTURE_3D,Pe,Ne,ge.width,ge.height,ge.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Re,Qe,ge.data)):t.texImage3D(i.TEXTURE_3D,0,Ne,ge.width,ge.height,ge.depth,0,Re,Qe,ge.data);else if(w.isFramebufferTexture){if(mt)if(st)t.texStorage2D(i.TEXTURE_2D,Pe,Ne,ge.width,ge.height);else{let fe=ge.width,De=ge.height;for(let Be=0;Be<Pe;Be++)t.texImage2D(i.TEXTURE_2D,Be,Ne,fe,De,0,Re,Qe,null),fe>>=1,De>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in i){const fe=i.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),ge.parentNode!==fe){fe.appendChild(ge),u.add(w),fe.onpaint=De=>{const Be=De.changedElements;for(const ve of u)Be.includes(ve.image)&&(ve.needsUpdate=!0)},fe.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ge);else{const Be=i.RGBA,ve=i.RGBA,je=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Be,ve,je,ge)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ze.length>0){if(st&&mt){const fe=ct(Ze[0]);t.texStorage2D(i.TEXTURE_2D,Pe,Ne,fe.width,fe.height)}for(let fe=0,De=Ze.length;fe<De;fe++)be=Ze[fe],st?k&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,Re,Qe,be):t.texImage2D(i.TEXTURE_2D,fe,Ne,Re,Qe,be);w.generateMipmaps=!1}else if(st){if(mt){const fe=ct(ge);t.texStorage2D(i.TEXTURE_2D,Pe,Ne,fe.width,fe.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,Qe,ge)}else t.texImage2D(i.TEXTURE_2D,0,Ne,Re,Qe,ge);p(w)&&x(Q),Te.__version=we.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function Je(L,w,$){if(w.image.length!==6)return;const Q=re(L,w),he=w.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+$);const we=n.get(he);if(he.version!==we.__version||Q===!0){t.activeTexture(i.TEXTURE0+$);const Te=Dt.getPrimaries(Dt.workingColorSpace),ue=w.colorSpace===$i?null:Dt.getPrimaries(w.colorSpace),ge=w.colorSpace===$i||Te===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Re=w.isCompressedTexture||w.image[0].isCompressedTexture,Qe=w.image[0]&&w.image[0].isDataTexture,Ne=[];for(let ve=0;ve<6;ve++)!Re&&!Qe?Ne[ve]=m(w.image[ve],!0,s.maxCubemapSize):Ne[ve]=Qe?w.image[ve].image:w.image[ve],Ne[ve]=dt(w,Ne[ve]);const be=Ne[0],Ze=r.convert(w.format,w.colorSpace),st=r.convert(w.type),mt=M(w.internalFormat,Ze,st,w.normalized,w.colorSpace),k=w.isVideoTexture!==!0,Pe=we.__version===void 0||Q===!0,fe=he.dataReady;let De=S(w,be);lt(i.TEXTURE_CUBE_MAP,w);let Be;if(Re){k&&Pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,De,mt,be.width,be.height);for(let ve=0;ve<6;ve++){Be=Ne[ve].mipmaps;for(let je=0;je<Be.length;je++){const Xe=Be[je];w.format!==ii?Ze!==null?k?fe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,0,0,Xe.width,Xe.height,Ze,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,mt,Xe.width,Xe.height,0,Xe.data):ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,0,0,Xe.width,Xe.height,Ze,st,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,mt,Xe.width,Xe.height,0,Ze,st,Xe.data)}}}else{if(Be=w.mipmaps,k&&Pe){Be.length>0&&De++;const ve=ct(Ne[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,De,mt,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Qe){k?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Ne[ve].width,Ne[ve].height,Ze,st,Ne[ve].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,mt,Ne[ve].width,Ne[ve].height,0,Ze,st,Ne[ve].data);for(let je=0;je<Be.length;je++){const Vt=Be[je].image[ve].image;k?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,0,0,Vt.width,Vt.height,Ze,st,Vt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,mt,Vt.width,Vt.height,0,Ze,st,Vt.data)}}else{k?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Ze,st,Ne[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,mt,Ze,st,Ne[ve]);for(let je=0;je<Be.length;je++){const Xe=Be[je];k?fe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,0,0,Ze,st,Xe.image[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,mt,Ze,st,Xe.image[ve])}}}p(w)&&x(i.TEXTURE_CUBE_MAP),we.__version=he.version,w.onUpdate&&w.onUpdate(w)}L.__version=w.version}function Ue(L,w,$,Q,he,we){const Te=r.convert($.format,$.colorSpace),ue=r.convert($.type),ge=M($.internalFormat,Te,ue,$.normalized,$.colorSpace),Re=n.get(w),Qe=n.get($);if(Qe.__renderTarget=w,!Re.__hasExternalTextures){const Ne=Math.max(1,w.width>>we),be=Math.max(1,w.height>>we);he===i.TEXTURE_3D||he===i.TEXTURE_2D_ARRAY?t.texImage3D(he,we,ge,Ne,be,w.depth,0,Te,ue,null):t.texImage2D(he,we,ge,Ne,be,0,Te,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),qe(w)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,he,Qe.__webglTexture,0,Ge(w)):(he===i.TEXTURE_2D||he>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,he,Qe.__webglTexture,we),t.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(L,w,$){if(i.bindRenderbuffer(i.RENDERBUFFER,L),w.depthBuffer){const Q=w.depthTexture,he=Q&&Q.isDepthTexture?Q.type:null,we=E(w.stencilBuffer,he),Te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;qe(w)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge(w),we,w.width,w.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge(w),we,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,we,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,L)}else{const Q=w.textures;for(let he=0;he<Q.length;he++){const we=Q[he],Te=r.convert(we.format,we.colorSpace),ue=r.convert(we.type),ge=M(we.internalFormat,Te,ue,we.normalized,we.colorSpace);qe(w)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ge(w),ge,w.width,w.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge(w),ge,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ge,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function se(L,w,$){const Q=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const he=n.get(w.depthTexture);if(he.__renderTarget=w,(!he.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Q){if(he.__webglInit===void 0&&(he.__webglInit=!0,w.depthTexture.addEventListener("dispose",T)),he.__webglTexture===void 0){he.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,he.__webglTexture),lt(i.TEXTURE_CUBE_MAP,w.depthTexture);const Re=r.convert(w.depthTexture.format),Qe=r.convert(w.depthTexture.type);let Ne;w.depthTexture.format===Oi?Ne=i.DEPTH_COMPONENT24:w.depthTexture.format===os&&(Ne=i.DEPTH24_STENCIL8);for(let be=0;be<6;be++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ne,w.width,w.height,0,Re,Qe,null)}}else ie(w.depthTexture,0);const we=he.__webglTexture,Te=Ge(w),ue=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+$:i.TEXTURE_2D,ge=w.depthTexture.format===os?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(w.depthTexture.format===Oi)qe(w)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,ue,we,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,ge,ue,we,0);else if(w.depthTexture.format===os)qe(w)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,ue,we,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,ge,ue,we,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function H(L){const w=n.get(L),$=L.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==L.depthTexture){const Q=L.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Q){const he=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Q.removeEventListener("dispose",he)};Q.addEventListener("dispose",he),w.__depthDisposeCallback=he}w.__boundDepthTexture=Q}if(L.depthTexture&&!w.__autoAllocateDepthBuffer)if($)for(let Q=0;Q<6;Q++)se(w.__webglFramebuffer[Q],L,Q);else{const Q=L.texture.mipmaps;Q&&Q.length>0?se(w.__webglFramebuffer[0],L,0):se(w.__webglFramebuffer,L,0)}else if($){w.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[Q]),w.__webglDepthbuffer[Q]===void 0)w.__webglDepthbuffer[Q]=i.createRenderbuffer(),rt(w.__webglDepthbuffer[Q],L,!1);else{const he=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=w.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,we),i.framebufferRenderbuffer(i.FRAMEBUFFER,he,i.RENDERBUFFER,we)}}else{const Q=L.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),rt(w.__webglDepthbuffer,L,!1);else{const he=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,we),i.framebufferRenderbuffer(i.FRAMEBUFFER,he,i.RENDERBUFFER,we)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function j(L,w,$){const Q=n.get(L);w!==void 0&&Ue(Q.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&H(L)}function te(L){const w=L.texture,$=n.get(L),Q=n.get(w);L.addEventListener("dispose",v);const he=L.textures,we=L.isWebGLCubeRenderTarget===!0,Te=he.length>1;if(Te||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=w.version,a.memory.textures++),we){$.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer[ue]=[];for(let ge=0;ge<w.mipmaps.length;ge++)$.__webglFramebuffer[ue][ge]=i.createFramebuffer()}else $.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){$.__webglFramebuffer=[];for(let ue=0;ue<w.mipmaps.length;ue++)$.__webglFramebuffer[ue]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(Te)for(let ue=0,ge=he.length;ue<ge;ue++){const Re=n.get(he[ue]);Re.__webglTexture===void 0&&(Re.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&qe(L)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ue=0;ue<he.length;ue++){const ge=he[ue];$.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[ue]);const Re=r.convert(ge.format,ge.colorSpace),Qe=r.convert(ge.type),Ne=M(ge.internalFormat,Re,Qe,ge.normalized,ge.colorSpace,L.isXRRenderTarget===!0),be=Ge(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,be,Ne,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,$.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),rt($.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(we){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),lt(i.TEXTURE_CUBE_MAP,w);for(let ue=0;ue<6;ue++)if(w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)Ue($.__webglFramebuffer[ue][ge],L,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ge);else Ue($.__webglFramebuffer[ue],L,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(w)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let ue=0,ge=he.length;ue<ge;ue++){const Re=he[ue],Qe=n.get(Re);let Ne=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ne=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ne,Qe.__webglTexture),lt(Ne,Re),Ue($.__webglFramebuffer,L,Re,i.COLOR_ATTACHMENT0+ue,Ne,0),p(Re)&&x(Ne)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ue=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,Q.__webglTexture),lt(ue,w),w.mipmaps&&w.mipmaps.length>0)for(let ge=0;ge<w.mipmaps.length;ge++)Ue($.__webglFramebuffer[ge],L,w,i.COLOR_ATTACHMENT0,ue,ge);else Ue($.__webglFramebuffer,L,w,i.COLOR_ATTACHMENT0,ue,0);p(w)&&x(ue),t.unbindTexture()}L.depthBuffer&&H(L)}function me(L){const w=L.textures;for(let $=0,Q=w.length;$<Q;$++){const he=w[$];if(p(he)){const we=y(L),Te=n.get(he).__webglTexture;t.bindTexture(we,Te),x(we),t.unbindTexture()}}}const xe=[],Le=[];function Ee(L){if(L.samples>0){if(qe(L)===!1){const w=L.textures,$=L.width,Q=L.height;let he=i.COLOR_BUFFER_BIT;const we=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(L),ue=w.length>1;if(ue)for(let Re=0;Re<w.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const ge=L.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Re=0;Re<w.length;Re++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(he|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(he|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Re]);const Qe=n.get(w[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Qe,0)}i.blitFramebuffer(0,0,$,Q,0,0,$,Q,he,i.NEAREST),o===!0&&(xe.length=0,Le.length=0,xe.push(i.COLOR_ATTACHMENT0+Re),L.depthBuffer&&L.resolveDepthBuffer===!1&&(xe.push(we),Le.push(we),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,xe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Re=0;Re<w.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Re]);const Qe=n.get(w[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,Qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&o){const w=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function Ge(L){return Math.min(s.maxSamples,L.samples)}function qe(L){const w=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function B(L){const w=a.render.frame;h.get(L)!==w&&(h.set(L,w),L.update())}function dt(L,w){const $=L.colorSpace,Q=L.format,he=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||$!==Ua&&$!==$i&&(Dt.getTransfer($)===Gt?(Q!==ii||he!==Vn)&&ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pt("WebGLTextures: Unsupported texture color space:",$)),w}function ct(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=Z,this.getTextureUnits=J,this.setTextureUnits=V,this.setTexture2D=ie,this.setTexture2DArray=oe,this.setTexture3D=de,this.setTextureCube=ce,this.rebindTextures=j,this.setupRenderTarget=te,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=H,this.setupFrameBufferTexture=Ue,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function J_(i,e){function t(n,s=$i){let r;const a=Dt.getTransfer(s);if(n===Vn)return i.UNSIGNED_BYTE;if(n===$l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===au)return i.BYTE;if(n===ou)return i.SHORT;if(n===Pr)return i.UNSIGNED_SHORT;if(n===Zl)return i.INT;if(n===xi)return i.UNSIGNED_INT;if(n===ni)return i.FLOAT;if(n===Fi)return i.HALF_FLOAT;if(n===hu)return i.ALPHA;if(n===uu)return i.RGB;if(n===ii)return i.RGBA;if(n===Oi)return i.DEPTH_COMPONENT;if(n===os)return i.DEPTH_STENCIL;if(n===Jl)return i.RED;if(n===jl)return i.RED_INTEGER;if(n===hs)return i.RG;if(n===Ql)return i.RG_INTEGER;if(n===ec)return i.RGBA_INTEGER;if(n===Ta||n===Aa||n===Ra||n===Ca)if(a===Gt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sl||n===rl||n===al||n===ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ll||n===cl||n===hl||n===ul||n===fl||n===Da||n===dl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ll||n===cl)return a===Gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===hl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ul)return r.COMPRESSED_R11_EAC;if(n===fl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Da)return r.COMPRESSED_RG11_EAC;if(n===dl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===pl||n===ml||n===gl||n===_l||n===vl||n===xl||n===yl||n===Ml||n===bl||n===Sl||n===wl||n===El||n===Tl||n===Al)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ml)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_l)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ml)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===El)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Tl)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Al)return a===Gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rl||n===Cl||n===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Rl)return a===Gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Il||n===Dl||n===La||n===Ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Il)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===La)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const j_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q_=`
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

}`;class e1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Su(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new yi({vertexShader:j_,fragmentShader:Q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new le(new Ot(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t1 extends ji{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,h=null,u=null,f=null,d=null,_=null;const g=typeof XRWebGLBinding<"u",m=new e1,p={},x=t.getContextAttributes();let y=null,M=null;const E=[],S=[],T=new K;let v=null;const A=new zn;A.viewport=new Qt;const I=new zn;I.viewport=new Qt;const N=[A,I],O=new o0;let Z=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let Me=E[re];return Me===void 0&&(Me=new oo,E[re]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(re){let Me=E[re];return Me===void 0&&(Me=new oo,E[re]=Me),Me.getGripSpace()},this.getHand=function(re){let Me=E[re];return Me===void 0&&(Me=new oo,E[re]=Me),Me.getHandSpace()};function V(re){const Me=S.indexOf(re.inputSource);if(Me===-1)return;const _e=E[Me];_e!==void 0&&(_e.update(re.inputSource,re.frame,l||a),_e.dispatchEvent({type:re.type,data:re.inputSource}))}function q(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",X);for(let re=0;re<E.length;re++){const Me=S[re];Me!==null&&(S[re]=null,E[re].disconnect(Me))}Z=null,J=null,m.reset();for(const re in p)delete p[re];e.setRenderTarget(y),d=null,f=null,u=null,s=null,M=null,lt.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,n.isPresenting===!0&&ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){c=re,n.isPresenting===!0&&ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(re){l=re},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",q),s.addEventListener("inputsourceschange",X),x.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,He=null,Je=null;x.depth&&(Je=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=x.stencil?os:Oi,He=x.stencil?Ir:xi);const Ue={colorFormat:t.RGBA8,depthFormat:Je,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ue),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new gi(f.textureWidth,f.textureHeight,{format:ii,type:Vn,depthTexture:new $s(f.textureWidth,f.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const _e={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new gi(d.framebufferWidth,d.framebufferHeight,{format:ii,type:Vn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),lt.setContext(s),lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(re){for(let Me=0;Me<re.removed.length;Me++){const _e=re.removed[Me],He=S.indexOf(_e);He>=0&&(S[He]=null,E[He].disconnect(_e))}for(let Me=0;Me<re.added.length;Me++){const _e=re.added[Me];let He=S.indexOf(_e);if(He===-1){for(let Ue=0;Ue<E.length;Ue++)if(Ue>=S.length){S.push(_e),He=Ue;break}else if(S[Ue]===null){S[Ue]=_e,He=Ue;break}if(He===-1)break}const Je=E[He];Je&&Je.connect(_e)}}const ie=new P,oe=new P;function de(re,Me,_e){ie.setFromMatrixPosition(Me.matrixWorld),oe.setFromMatrixPosition(_e.matrixWorld);const He=ie.distanceTo(oe),Je=Me.projectionMatrix.elements,Ue=_e.projectionMatrix.elements,rt=Je[14]/(Je[10]-1),se=Je[14]/(Je[10]+1),H=(Je[9]+1)/Je[5],j=(Je[9]-1)/Je[5],te=(Je[8]-1)/Je[0],me=(Ue[8]+1)/Ue[0],xe=rt*te,Le=rt*me,Ee=He/(-te+me),Ge=Ee*-te;if(Me.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(Ge),re.translateZ(Ee),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Je[10]===-1)re.projectionMatrix.copy(Me.projectionMatrix),re.projectionMatrixInverse.copy(Me.projectionMatrixInverse);else{const qe=rt+Ee,B=se+Ee,dt=xe-Ge,ct=Le+(He-Ge),L=H*se/B*qe,w=j*se/B*qe;re.projectionMatrix.makePerspective(dt,ct,L,w,qe,B),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function ce(re,Me){Me===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(Me.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let Me=re.near,_e=re.far;m.texture!==null&&(m.depthNear>0&&(Me=m.depthNear),m.depthFar>0&&(_e=m.depthFar)),O.near=I.near=A.near=Me,O.far=I.far=A.far=_e,(Z!==O.near||J!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),Z=O.near,J=O.far),O.layers.mask=re.layers.mask|6,A.layers.mask=O.layers.mask&-5,I.layers.mask=O.layers.mask&-3;const He=re.parent,Je=O.cameras;ce(O,He);for(let Ue=0;Ue<Je.length;Ue++)ce(Je[Ue],He);Je.length===2?de(O,A,I):O.projectionMatrix.copy(A.projectionMatrix),ye(re,O,He)};function ye(re,Me,_e){_e===null?re.matrix.copy(Me.matrixWorld):(re.matrix.copy(_e.matrixWorld),re.matrix.invert(),re.matrix.multiply(Me.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(Me.projectionMatrix),re.projectionMatrixInverse.copy(Me.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Ul*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return o},this.setFoveation=function(re){o=re,f!==null&&(f.fixedFoveation=re),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=re)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(re){return p[re]};let We=null;function ot(re,Me){if(h=Me.getViewerPose(l||a),_=Me,h!==null){const _e=h.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let He=!1;_e.length!==O.cameras.length&&(O.cameras.length=0,He=!0);for(let se=0;se<_e.length;se++){const H=_e[se];let j=null;if(d!==null)j=d.getViewport(H);else{const me=u.getViewSubImage(f,H);j=me.viewport,se===0&&(e.setRenderTargetTextures(M,me.colorTexture,me.depthStencilTexture),e.setRenderTarget(M))}let te=N[se];te===void 0&&(te=new zn,te.layers.enable(se),te.viewport=new Qt,N[se]=te),te.matrix.fromArray(H.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray(H.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(j.x,j.y,j.width,j.height),se===0&&(O.matrix.copy(te.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),He===!0&&O.cameras.push(te)}const Je=s.enabledFeatures;if(Je&&Je.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const se=u.getDepthInformation(_e[0]);se&&se.isValid&&se.texture&&m.init(se,s.renderState)}if(Je&&Je.includes("camera-access")&&g){e.state.unbindTexture(),u=n.getBinding();for(let se=0;se<_e.length;se++){const H=_e[se].camera;if(H){let j=p[H];j||(j=new Su,p[H]=j);const te=u.getCameraImage(H);j.sourceTexture=te}}}}for(let _e=0;_e<E.length;_e++){const He=S[_e],Je=E[_e];He!==null&&Je!==void 0&&Je.update(He,Me,l||a)}We&&We(re,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),_=null}const lt=new Bu;lt.setAnimationLoop(ot),this.setAnimationLoop=function(re){We=re},this.dispose=function(){}}}const n1=new zt,Xu=new xt;Xu.set(-1,0,0,0,1,0,0,0,1);function i1(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,y,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),g(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&c(m,p)):p.isPointsMaterial?o(m,p,x,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===vn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===vn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),y=x.envMap,M=x.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(n1.makeRotationFromEuler(M)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Xu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function c(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===vn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function s1(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(M,E){const S=E.program;n.uniformBlockBinding(M,S)}function l(M,E){let S=s[M.id];S===void 0&&(m(M),S=h(M),s[M.id]=S,M.addEventListener("dispose",x));const T=E.program;n.updateUBOMapping(M,T);const v=e.render.frame;r[M.id]!==v&&(f(M),r[M.id]=v)}function h(M){const E=u();M.__bindingPointIndex=E;const S=i.createBuffer(),T=M.__size,v=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,T,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function u(){for(let M=0;M<c;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Pt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const E=s[M.id],S=M.uniforms,T=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let v=0,A=S.length;v<A;v++){const I=S[v];if(Array.isArray(I))for(let N=0,O=I.length;N<O;N++)d(I[N],v,N,T);else d(I,v,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,E,S,T){if(g(M,E,S,T)===!0){const v=M.__offset,A=M.value;if(Array.isArray(A)){let I=0;for(let N=0;N<A.length;N++){const O=A[N],Z=p(O);_(O,M.__data,I),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(I+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,M.__data)}}function _(M,E,S){typeof M=="number"||typeof M=="boolean"?E[0]=M:M.isMatrix3?(E[0]=M.elements[0],E[1]=M.elements[1],E[2]=M.elements[2],E[3]=0,E[4]=M.elements[3],E[5]=M.elements[4],E[6]=M.elements[5],E[7]=0,E[8]=M.elements[6],E[9]=M.elements[7],E[10]=M.elements[8],E[11]=0):ArrayBuffer.isView(M)?E.set(new M.constructor(M.buffer,M.byteOffset,E.length)):M.toArray(E,S)}function g(M,E,S,T){const v=M.value,A=E+"_"+S;if(T[A]===void 0)return typeof v=="number"||typeof v=="boolean"?T[A]=v:ArrayBuffer.isView(v)?T[A]=v.slice():T[A]=v.clone(),!0;{const I=T[A];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return T[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function m(M){const E=M.uniforms;let S=0;const T=16;for(let A=0,I=E.length;A<I;A++){const N=Array.isArray(E[A])?E[A]:[E[A]];for(let O=0,Z=N.length;O<Z;O++){const J=N[O],V=Array.isArray(J.value)?J.value:[J.value];for(let q=0,X=V.length;q<X;q++){const ie=V[q],oe=p(ie),de=S%T,ce=de%oe.boundary,ye=de+ce;S+=ce,ye!==0&&T-ye<oe.storage&&(S+=T-ye),J.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=S,S+=oe.storage}}}const v=S%T;return v>0&&(S+=T-v),M.__size=S,M.__cache={},this}function p(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(E.boundary=16,E.storage=M.byteLength):ut("WebGLRenderer: Unsupported uniform value type.",M),E}function x(M){const E=M.target;E.removeEventListener("dispose",x);const S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function y(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:o,update:l,dispose:y}}const r1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ci=null;function a1(){return ci===null&&(ci=new xu(r1,16,16,hs,Fi),ci.name="DFG_LUT",ci.minFilter=_n,ci.magFilter=_n,ci.wrapS=Pi,ci.wrapT=Pi,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}class o1{constructor(e={}){const{canvas:t=Wf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Vn}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const g=d,m=new Set([ec,Ql,jl]),p=new Set([Vn,xi,Pr,Ir,$l,Kl]),x=new Uint32Array(4),y=new Int32Array(4),M=new P;let E=null,S=null;const T=[],v=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=mi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let N=!1,O=null,Z=null,J=null,V=null;this._outputColorSpace=cn;let q=0,X=0,ie=null,oe=-1,de=null;const ce=new Qt,ye=new Qt;let We=null;const ot=new yt(0);let lt=0,re=t.width,Me=t.height,_e=1,He=null,Je=null;const Ue=new Qt(0,0,re,Me),rt=new Qt(0,0,re,Me);let se=!1;const H=new rc;let j=!1,te=!1;const me=new zt,xe=new P,Le=new Qt,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function qe(){return ie===null?_e:1}let B=n;function dt(R,Y){return t.getContext(R,Y)}try{const R={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xl}`),t.addEventListener("webglcontextlost",Vt,!1),t.addEventListener("webglcontextrestored",Wt,!1),t.addEventListener("webglcontextcreationerror",Hn,!1),B===null){const Y="webgl2";if(B=dt(Y,R),B===null)throw dt(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw Pt("WebGLRenderer: "+R.message),R}let ct,L,w,$,Q,he,we,Te,ue,ge,Re,Qe,Ne,be,Ze,st,mt,k,Pe,fe,De,Be,ve;function je(){ct=new ag(B),ct.init(),De=new J_(B,ct),L=new jm(B,ct,e,De),w=new $_(B,ct),L.reversedDepthBuffer&&f&&w.buffers.depth.setReversed(!0),Z=B.createFramebuffer(),J=B.createFramebuffer(),V=B.createFramebuffer(),$=new cg(B),Q=new U_,he=new K_(B,ct,w,Q,L,De,$),we=new rg(I),Te=new d0(B),Be=new Km(B,Te),ue=new og(B,Te,$,Be),ge=new ug(B,ue,Te,Be,$),k=new hg(B,L,he),Ze=new Qm(Q),Re=new N_(I,we,ct,L,Be,Ze),Qe=new i1(I,Q),Ne=new O_,be=new G_(ct),mt=new $m(I,we,w,ge,_,o),st=new Z_(I,ge,L),ve=new s1(B,$,L,w),Pe=new Jm(B,ct,$),fe=new lg(B,ct,$),$.programs=Re.programs,I.capabilities=L,I.extensions=ct,I.properties=Q,I.renderLists=Ne,I.shadowMap=st,I.state=w,I.info=$}je(),g!==Vn&&(A=new dg(g,t.width,t.height,c,s,r));const Xe=new t1(I,B);this.xr=Xe,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const R=ct.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ct.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(R){R!==void 0&&(_e=R,this.setSize(re,Me,!1))},this.getSize=function(R){return R.set(re,Me)},this.setSize=function(R,Y,ae=!0){if(Xe.isPresenting){ut("WebGLRenderer: Can't change size while VR device is presenting.");return}re=R,Me=Y,t.width=Math.floor(R*_e),t.height=Math.floor(Y*_e),ae===!0&&(t.style.width=R+"px",t.style.height=Y+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,R,Y)},this.getDrawingBufferSize=function(R){return R.set(re*_e,Me*_e).floor()},this.setDrawingBufferSize=function(R,Y,ae){re=R,Me=Y,_e=ae,t.width=Math.floor(R*ae),t.height=Math.floor(Y*ae),this.setViewport(0,0,R,Y)},this.setEffects=function(R){if(g===Vn){Pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let Y=0;Y<R.length;Y++)if(R[Y].isOutputPass===!0){ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(ce)},this.getViewport=function(R){return R.copy(Ue)},this.setViewport=function(R,Y,ae,ee){R.isVector4?Ue.set(R.x,R.y,R.z,R.w):Ue.set(R,Y,ae,ee),w.viewport(ce.copy(Ue).multiplyScalar(_e).round())},this.getScissor=function(R){return R.copy(rt)},this.setScissor=function(R,Y,ae,ee){R.isVector4?rt.set(R.x,R.y,R.z,R.w):rt.set(R,Y,ae,ee),w.scissor(ye.copy(rt).multiplyScalar(_e).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(R){w.setScissorTest(se=R)},this.setOpaqueSort=function(R){He=R},this.setTransparentSort=function(R){Je=R},this.getClearColor=function(R){return R.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor(...arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha(...arguments)},this.clear=function(R=!0,Y=!0,ae=!0){let ee=0;if(R){let ne=!1;if(ie!==null){const Fe=ie.texture.format;ne=m.has(Fe)}if(ne){const Fe=ie.texture.type,ze=p.has(Fe),Ae=mt.getClearColor(),Ye=mt.getClearAlpha(),et=Ae.r,gt=Ae.g,bt=Ae.b;ze?(x[0]=et,x[1]=gt,x[2]=bt,x[3]=Ye,B.clearBufferuiv(B.COLOR,0,x)):(y[0]=et,y[1]=gt,y[2]=bt,y[3]=Ye,B.clearBufferiv(B.COLOR,0,y))}else ee|=B.COLOR_BUFFER_BIT}Y&&(ee|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ae&&(ee|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&B.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),O=R},this.dispose=function(){t.removeEventListener("webglcontextlost",Vt,!1),t.removeEventListener("webglcontextrestored",Wt,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),mt.dispose(),Ne.dispose(),be.dispose(),Q.dispose(),we.dispose(),ge.dispose(),Be.dispose(),ve.dispose(),Re.dispose(),Xe.dispose(),Xe.removeEventListener("sessionstart",nr),Xe.removeEventListener("sessionend",Br),Ln.stop()};function Vt(R){R.preventDefault(),Ba("WebGLRenderer: Context Lost."),N=!0}function Wt(){Ba("WebGLRenderer: Context Restored."),N=!1;const R=$.autoReset,Y=st.enabled,ae=st.autoUpdate,ee=st.needsUpdate,ne=st.type;je(),$.autoReset=R,st.enabled=Y,st.autoUpdate=ae,st.needsUpdate=ee,st.type=ne}function Hn(R){Pt("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Dn(R){const Y=R.target;Y.removeEventListener("dispose",Dn),Fr(Y)}function Fr(R){Ka(R),Q.remove(R)}function Ka(R){const Y=Q.get(R).programs;Y!==void 0&&(Y.forEach(function(ae){Re.releaseProgram(ae)}),R.isShaderMaterial&&Re.releaseShaderCache(R))}this.renderBufferDirect=function(R,Y,ae,ee,ne,Fe){Y===null&&(Y=Ee);const ze=ne.isMesh&&ne.matrixWorld.determinantAffine()<0,Ae=Vr(R,Y,ae,ee,ne);w.setMaterial(ee,ze);let Ye=ae.index,et=1;if(ee.wireframe===!0){if(Ye=ue.getWireframeAttribute(ae),Ye===void 0)return;et=2}const gt=ae.drawRange,bt=ae.attributes.position;let $e=gt.start*et,Bt=(gt.start+gt.count)*et;Fe!==null&&($e=Math.max($e,Fe.start*et),Bt=Math.min(Bt,(Fe.start+Fe.count)*et)),Ye!==null?($e=Math.max($e,0),Bt=Math.min(Bt,Ye.count)):bt!=null&&($e=Math.max($e,0),Bt=Math.min(Bt,bt.count));const $t=Bt-$e;if($t<0||$t===1/0)return;Be.setup(ne,ee,Ae,ae,Ye);let Jt,kt=Pe;if(Ye!==null&&(Jt=Te.get(Ye),kt=fe,kt.setIndex(Jt)),ne.isMesh)ee.wireframe===!0?(w.setLineWidth(ee.wireframeLinewidth*qe()),kt.setMode(B.LINES)):kt.setMode(B.TRIANGLES);else if(ne.isLine){let on=ee.linewidth;on===void 0&&(on=1),w.setLineWidth(on*qe()),ne.isLineSegments?kt.setMode(B.LINES):ne.isLineLoop?kt.setMode(B.LINE_LOOP):kt.setMode(B.LINE_STRIP)}else ne.isPoints?kt.setMode(B.POINTS):ne.isSprite&&kt.setMode(B.TRIANGLES);if(ne.isBatchedMesh)if(ct.get("WEBGL_multi_draw"))kt.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{const on=ne._multiDrawStarts,Ve=ne._multiDrawCounts,yn=ne._multiDrawCount,It=Ye?Te.get(Ye).bytesPerElement:1,Tn=Q.get(ee).currentProgram.getUniforms();for(let Nn=0;Nn<yn;Nn++)Tn.setValue(B,"_gl_DrawID",Nn),kt.render(on[Nn]/It,Ve[Nn])}else if(ne.isInstancedMesh)kt.renderInstances($e,$t,ne.count);else if(ae.isInstancedBufferGeometry){const on=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Ve=Math.min(ae.instanceCount,on);kt.renderInstances($e,$t,Ve)}else kt.render($e,$t)};function tr(R,Y,ae){R.transparent===!0&&R.side===Zt&&R.forceSinglePass===!1?(R.side=vn,R.needsUpdate=!0,Gn(R,Y,ae),R.side=Ui,R.needsUpdate=!0,Gn(R,Y,ae),R.side=Zt):Gn(R,Y,ae)}this.compile=function(R,Y,ae=null){ae===null&&(ae=R),S=be.get(ae),S.init(Y),v.push(S),ae.traverseVisible(function(ne){ne.isLight&&ne.layers.test(Y.layers)&&(S.pushLight(ne),ne.castShadow&&S.pushShadow(ne))}),R!==ae&&R.traverseVisible(function(ne){ne.isLight&&ne.layers.test(Y.layers)&&(S.pushLight(ne),ne.castShadow&&S.pushShadow(ne))}),S.setupLights();const ee=new Set;return R.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;const Fe=ne.material;if(Fe)if(Array.isArray(Fe))for(let ze=0;ze<Fe.length;ze++){const Ae=Fe[ze];tr(Ae,ae,ne),ee.add(Ae)}else tr(Fe,ae,ne),ee.add(Fe)}),S=v.pop(),ee},this.compileAsync=function(R,Y,ae=null){const ee=this.compile(R,Y,ae);return new Promise(ne=>{function Fe(){if(ee.forEach(function(ze){Q.get(ze).currentProgram.isReady()&&ee.delete(ze)}),ee.size===0){ne(R);return}setTimeout(Fe,10)}ct.get("KHR_parallel_shader_compile")!==null?Fe():setTimeout(Fe,10)})};let ds=null;function Or(R){ds&&ds(R)}function nr(){Ln.stop()}function Br(){Ln.start()}const Ln=new Bu;Ln.setAnimationLoop(Or),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(R){ds=R,Xe.setAnimationLoop(R),R===null?Ln.stop():Ln.start()},Xe.addEventListener("sessionstart",nr),Xe.addEventListener("sessionend",Br),this.render=function(R,Y){if(Y!==void 0&&Y.isCamera!==!0){Pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;O!==null&&O.renderStart(R,Y);const ae=Xe.enabled===!0&&Xe.isPresenting===!0,ee=A!==null&&(ie===null||ae)&&A.begin(I,ie);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(Y),Y=Xe.getCamera()),R.isScene===!0&&R.onBeforeRender(I,R,Y,ie),S=be.get(R,v.length),S.init(Y),S.state.textureUnits=he.getTextureUnits(),v.push(S),me.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),H.setFromProjectionMatrix(me,di,Y.reversedDepth),te=this.localClippingEnabled,j=Ze.init(this.clippingPlanes,te),E=Ne.get(R,T.length),E.init(),T.push(E),Xe.enabled===!0&&Xe.isPresenting===!0){const ze=I.xr.getDepthSensingMesh();ze!==null&&zi(ze,Y,-1/0,I.sortObjects)}zi(R,Y,0,I.sortObjects),E.finish(),I.sortObjects===!0&&E.sort(He,Je,Y.reversedDepth),Ge=Xe.enabled===!1||Xe.isPresenting===!1||Xe.hasDepthSensing()===!1,Ge&&mt.addToRenderList(E,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),j===!0&&Ze.beginShadows();const ne=S.state.shadowsArray;if(st.render(ne,R,Y),j===!0&&Ze.endShadows(),(ee&&A.hasRenderPass())===!1){const ze=E.opaque,Ae=E.transmissive;if(S.setupLights(),Y.isArrayCamera){const Ye=Y.cameras;if(Ae.length>0)for(let et=0,gt=Ye.length;et<gt;et++){const bt=Ye[et];Vi(ze,Ae,R,bt)}Ge&&mt.render(R);for(let et=0,gt=Ye.length;et<gt;et++){const bt=Ye[et];kr(E,R,bt,bt.viewport)}}else Ae.length>0&&Vi(ze,Ae,R,Y),Ge&&mt.render(R),kr(E,R,Y)}ie!==null&&X===0&&(he.updateMultisampleRenderTarget(ie),he.updateRenderTargetMipmap(ie)),ee&&A.end(I),R.isScene===!0&&R.onAfterRender(I,R,Y),Be.resetDefaultState(),oe=-1,de=null,v.pop(),v.length>0?(S=v[v.length-1],he.setTextureUnits(S.state.textureUnits),j===!0&&Ze.setGlobalState(I.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?E=T[T.length-1]:E=null,O!==null&&O.renderEnd()};function zi(R,Y,ae,ee){if(R.visible===!1)return;if(R.layers.test(Y.layers)){if(R.isGroup)ae=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Y);else if(R.isLightProbeGrid)S.pushLightProbeGrid(R);else if(R.isLight)S.pushLight(R),R.castShadow&&S.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||H.intersectsSprite(R)){ee&&Le.setFromMatrixPosition(R.matrixWorld).applyMatrix4(me);const ze=ge.update(R),Ae=R.material;Ae.visible&&E.push(R,ze,Ae,ae,Le.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||H.intersectsObject(R))){const ze=ge.update(R),Ae=R.material;if(ee&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Le.copy(R.boundingSphere.center)):(ze.boundingSphere===null&&ze.computeBoundingSphere(),Le.copy(ze.boundingSphere.center)),Le.applyMatrix4(R.matrixWorld).applyMatrix4(me)),Array.isArray(Ae)){const Ye=ze.groups;for(let et=0,gt=Ye.length;et<gt;et++){const bt=Ye[et],$e=Ae[bt.materialIndex];$e&&$e.visible&&E.push(R,ze,$e,ae,Le.z,bt)}}else Ae.visible&&E.push(R,ze,Ae,ae,Le.z,null)}}const Fe=R.children;for(let ze=0,Ae=Fe.length;ze<Ae;ze++)zi(Fe[ze],Y,ae,ee)}function kr(R,Y,ae,ee){const{opaque:ne,transmissive:Fe,transparent:ze}=R;S.setupLightsView(ae),j===!0&&Ze.setGlobalState(I.clippingPlanes,ae),ee&&w.viewport(ce.copy(ee)),ne.length>0&&Mi(ne,Y,ae),Fe.length>0&&Mi(Fe,Y,ae),ze.length>0&&Mi(ze,Y,ae),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function Vi(R,Y,ae,ee){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[ee.id]===void 0){const $e=ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[ee.id]=new gi(1,1,{generateMipmaps:!0,type:$e?Fi:Vn,minFilter:as,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Dt.workingColorSpace})}const Fe=S.state.transmissionRenderTarget[ee.id],ze=ee.viewport||ce;Fe.setSize(ze.z*I.transmissionResolutionScale,ze.w*I.transmissionResolutionScale);const Ae=I.getRenderTarget(),Ye=I.getActiveCubeFace(),et=I.getActiveMipmapLevel();I.setRenderTarget(Fe),I.getClearColor(ot),lt=I.getClearAlpha(),lt<1&&I.setClearColor(16777215,.5),I.clear(),Ge&&mt.render(ae);const gt=I.toneMapping;I.toneMapping=mi;const bt=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),S.setupLightsView(ee),j===!0&&Ze.setGlobalState(I.clippingPlanes,ee),Mi(R,ae,ee),he.updateMultisampleRenderTarget(Fe),he.updateRenderTargetMipmap(Fe),ct.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let Bt=0,$t=Y.length;Bt<$t;Bt++){const Jt=Y[Bt],{object:kt,geometry:on,material:Ve,group:yn}=Jt;if(Ve.side===Zt&&kt.layers.test(ee.layers)){const It=Ve.side;Ve.side=vn,Ve.needsUpdate=!0,ir(kt,ae,ee,on,Ve,yn),Ve.side=It,Ve.needsUpdate=!0,$e=!0}}$e===!0&&(he.updateMultisampleRenderTarget(Fe),he.updateRenderTargetMipmap(Fe))}I.setRenderTarget(Ae,Ye,et),I.setClearColor(ot,lt),bt!==void 0&&(ee.viewport=bt),I.toneMapping=gt}function Mi(R,Y,ae){const ee=Y.isScene===!0?Y.overrideMaterial:null;for(let ne=0,Fe=R.length;ne<Fe;ne++){const ze=R[ne],{object:Ae,geometry:Ye,group:et}=ze;let gt=ze.material;gt.allowOverride===!0&&ee!==null&&(gt=ee),Ae.layers.test(ae.layers)&&ir(Ae,Y,ae,Ye,gt,et)}}function ir(R,Y,ae,ee,ne,Fe){R.onBeforeRender(I,Y,ae,ee,ne,Fe),R.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ne.onBeforeRender(I,Y,ae,ee,R,Fe),ne.transparent===!0&&ne.side===Zt&&ne.forceSinglePass===!1?(ne.side=vn,ne.needsUpdate=!0,I.renderBufferDirect(ae,Y,ee,ne,R,Fe),ne.side=Ui,ne.needsUpdate=!0,I.renderBufferDirect(ae,Y,ee,ne,R,Fe),ne.side=Zt):I.renderBufferDirect(ae,Y,ee,ne,R,Fe),R.onAfterRender(I,Y,ae,ee,ne,Fe)}function Gn(R,Y,ae){Y.isScene!==!0&&(Y=Ee);const ee=Q.get(R),ne=S.state.lights,Fe=S.state.shadowsArray,ze=ne.state.version,Ae=Re.getParameters(R,ne.state,Fe,Y,ae,S.state.lightProbeGridArray),Ye=Re.getProgramCacheKey(Ae);let et=ee.programs;ee.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?Y.environment:null,ee.fog=Y.fog;const gt=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ee.envMap=we.get(R.envMap||ee.environment,gt),ee.envMapRotation=ee.environment!==null&&R.envMap===null?Y.environmentRotation:R.envMapRotation,et===void 0&&(R.addEventListener("dispose",Dn),et=new Map,ee.programs=et);let bt=et.get(Ye);if(bt!==void 0){if(ee.currentProgram===bt&&ee.lightsStateVersion===ze)return ms(R,Ae),bt}else Ae.uniforms=Re.getUniforms(R),O!==null&&R.isNodeMaterial&&O.build(R,ae,Ae),R.onBeforeCompile(Ae,I),bt=Re.acquireProgram(Ae,Ye),et.set(Ye,bt),ee.uniforms=Ae.uniforms;const $e=ee.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&($e.clippingPlanes=Ze.uniform),ms(R,Ae),ee.needsLights=rr(R),ee.lightsStateVersion=ze,ee.needsLights&&($e.ambientLightColor.value=ne.state.ambient,$e.lightProbe.value=ne.state.probe,$e.directionalLights.value=ne.state.directional,$e.directionalLightShadows.value=ne.state.directionalShadow,$e.spotLights.value=ne.state.spot,$e.spotLightShadows.value=ne.state.spotShadow,$e.rectAreaLights.value=ne.state.rectArea,$e.ltc_1.value=ne.state.rectAreaLTC1,$e.ltc_2.value=ne.state.rectAreaLTC2,$e.pointLights.value=ne.state.point,$e.pointLightShadows.value=ne.state.pointShadow,$e.hemisphereLights.value=ne.state.hemi,$e.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,$e.spotLightMatrix.value=ne.state.spotLightMatrix,$e.spotLightMap.value=ne.state.spotLightMap,$e.pointShadowMatrix.value=ne.state.pointShadowMatrix),ee.lightProbeGrid=S.state.lightProbeGridArray.length>0,ee.currentProgram=bt,ee.uniformsList=null,bt}function ps(R){if(R.uniformsList===null){const Y=R.currentProgram.getUniforms();R.uniformsList=Ia.seqWithValue(Y.seq,R.uniforms)}return R.uniformsList}function ms(R,Y){const ae=Q.get(R);ae.outputColorSpace=Y.outputColorSpace,ae.batching=Y.batching,ae.batchingColor=Y.batchingColor,ae.instancing=Y.instancing,ae.instancingColor=Y.instancingColor,ae.instancingMorph=Y.instancingMorph,ae.skinning=Y.skinning,ae.morphTargets=Y.morphTargets,ae.morphNormals=Y.morphNormals,ae.morphColors=Y.morphColors,ae.morphTargetsCount=Y.morphTargetsCount,ae.numClippingPlanes=Y.numClippingPlanes,ae.numIntersection=Y.numClipIntersection,ae.vertexAlphas=Y.vertexAlphas,ae.vertexTangents=Y.vertexTangents,ae.toneMapping=Y.toneMapping}function zr(R,Y){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;M.setFromMatrixPosition(Y.matrixWorld);for(let ae=0,ee=R.length;ae<ee;ae++){const ne=R[ae];if(ne.texture!==null&&ne.boundingBox.containsPoint(M))return ne}return null}function Vr(R,Y,ae,ee,ne){Y.isScene!==!0&&(Y=Ee),he.resetTextureUnits();const Fe=Y.fog,ze=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?Y.environment:null,Ae=ie===null?I.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Dt.workingColorSpace,Ye=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,et=we.get(ee.envMap||ze,Ye),gt=ee.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,bt=!!ae.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),$e=!!ae.morphAttributes.position,Bt=!!ae.morphAttributes.normal,$t=!!ae.morphAttributes.color;let Jt=mi;ee.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Jt=I.toneMapping);const kt=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,on=kt!==void 0?kt.length:0,Ve=Q.get(ee),yn=S.state.lights;if(j===!0&&(te===!0||R!==de)){const Ht=R===de&&ee.id===oe;Ze.setState(ee,R,Ht)}let It=!1;ee.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==yn.state.version||Ve.outputColorSpace!==Ae||ne.isBatchedMesh&&Ve.batching===!1||!ne.isBatchedMesh&&Ve.batching===!0||ne.isBatchedMesh&&Ve.batchingColor===!0&&ne.colorTexture===null||ne.isBatchedMesh&&Ve.batchingColor===!1&&ne.colorTexture!==null||ne.isInstancedMesh&&Ve.instancing===!1||!ne.isInstancedMesh&&Ve.instancing===!0||ne.isSkinnedMesh&&Ve.skinning===!1||!ne.isSkinnedMesh&&Ve.skinning===!0||ne.isInstancedMesh&&Ve.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&Ve.instancingColor===!1&&ne.instanceColor!==null||ne.isInstancedMesh&&Ve.instancingMorph===!0&&ne.morphTexture===null||ne.isInstancedMesh&&Ve.instancingMorph===!1&&ne.morphTexture!==null||Ve.envMap!==et||ee.fog===!0&&Ve.fog!==Fe||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Ze.numPlanes||Ve.numIntersection!==Ze.numIntersection)||Ve.vertexAlphas!==gt||Ve.vertexTangents!==bt||Ve.morphTargets!==$e||Ve.morphNormals!==Bt||Ve.morphColors!==$t||Ve.toneMapping!==Jt||Ve.morphTargetsCount!==on||!!Ve.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(It=!0):(It=!0,Ve.__version=ee.version);let Tn=Ve.currentProgram;It===!0&&(Tn=Gn(ee,Y,ne),O&&ee.isNodeMaterial&&O.onUpdateProgram(ee,Tn,Ve));let Nn=!1,Jn=!1,Ke=!1;const Ft=Tn.getUniforms(),jt=Ve.uniforms;if(w.useProgram(Tn.program)&&(Nn=!0,Jn=!0,Ke=!0),ee.id!==oe&&(oe=ee.id,Jn=!0),Ve.needsLights){const Ht=zr(S.state.lightProbeGridArray,ne);Ve.lightProbeGrid!==Ht&&(Ve.lightProbeGrid=Ht,Jn=!0)}if(Nn||de!==R){w.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Ft.setValue(B,"projectionMatrix",R.projectionMatrix),Ft.setValue(B,"viewMatrix",R.matrixWorldInverse);const ai=Ft.map.cameraPosition;ai!==void 0&&ai.setValue(B,xe.setFromMatrixPosition(R.matrixWorld)),L.logarithmicDepthBuffer&&Ft.setValue(B,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Ft.setValue(B,"isOrthographic",R.isOrthographicCamera===!0),de!==R&&(de=R,Jn=!0,Ke=!0)}if(Ve.needsLights&&(yn.state.directionalShadowMap.length>0&&Ft.setValue(B,"directionalShadowMap",yn.state.directionalShadowMap,he),yn.state.spotShadowMap.length>0&&Ft.setValue(B,"spotShadowMap",yn.state.spotShadowMap,he),yn.state.pointShadowMap.length>0&&Ft.setValue(B,"pointShadowMap",yn.state.pointShadowMap,he)),ne.isSkinnedMesh){Ft.setOptional(B,ne,"bindMatrix"),Ft.setOptional(B,ne,"bindMatrixInverse");const Ht=ne.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Ft.setValue(B,"boneTexture",Ht.boneTexture,he))}ne.isBatchedMesh&&(Ft.setOptional(B,ne,"batchingTexture"),Ft.setValue(B,"batchingTexture",ne._matricesTexture,he),Ft.setOptional(B,ne,"batchingIdTexture"),Ft.setValue(B,"batchingIdTexture",ne._indirectTexture,he),Ft.setOptional(B,ne,"batchingColorTexture"),ne._colorsTexture!==null&&Ft.setValue(B,"batchingColorTexture",ne._colorsTexture,he));const Un=ae.morphAttributes;if((Un.position!==void 0||Un.normal!==void 0||Un.color!==void 0)&&k.update(ne,ae,Tn),(Jn||Ve.receiveShadow!==ne.receiveShadow)&&(Ve.receiveShadow=ne.receiveShadow,Ft.setValue(B,"receiveShadow",ne.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&Y.environment!==null&&(jt.envMapIntensity.value=Y.environmentIntensity),jt.dfgLUT!==void 0&&(jt.dfgLUT.value=a1()),Jn){if(Ft.setValue(B,"toneMappingExposure",I.toneMappingExposure),Ve.needsLights&&sr(jt,Ke),Fe&&ee.fog===!0&&Qe.refreshFogUniforms(jt,Fe),Qe.refreshMaterialUniforms(jt,ee,_e,Me,S.state.transmissionRenderTarget[R.id]),Ve.needsLights&&Ve.lightProbeGrid){const Ht=Ve.lightProbeGrid;jt.probesSH.value=Ht.texture,jt.probesMin.value.copy(Ht.boundingBox.min),jt.probesMax.value.copy(Ht.boundingBox.max),jt.probesResolution.value.copy(Ht.resolution)}Ia.upload(B,ps(Ve),jt,he)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Ia.upload(B,ps(Ve),jt,he),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Ft.setValue(B,"center",ne.center),Ft.setValue(B,"modelViewMatrix",ne.modelViewMatrix),Ft.setValue(B,"normalMatrix",ne.normalMatrix),Ft.setValue(B,"modelMatrix",ne.matrixWorld),ee.uniformsGroups!==void 0){const Ht=ee.uniformsGroups;for(let ai=0,bi=Ht.length;ai<bi;ai++){const Hr=Ht[ai];ve.update(Hr,Tn),ve.bind(Hr,Tn)}}return Tn}function sr(R,Y){R.ambientLightColor.needsUpdate=Y,R.lightProbe.needsUpdate=Y,R.directionalLights.needsUpdate=Y,R.directionalLightShadows.needsUpdate=Y,R.pointLights.needsUpdate=Y,R.pointLightShadows.needsUpdate=Y,R.spotLights.needsUpdate=Y,R.spotLightShadows.needsUpdate=Y,R.rectAreaLights.needsUpdate=Y,R.hemisphereLights.needsUpdate=Y}function rr(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(R,Y,ae){const ee=Q.get(R);ee.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),Q.get(R.texture).__webglTexture=Y,Q.get(R.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:ae,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,Y){const ae=Q.get(R);ae.__webglFramebuffer=Y,ae.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(R,Y=0,ae=0){ie=R,q=Y,X=ae;let ee=null,ne=!1,Fe=!1;if(R){const Ae=Q.get(R);if(Ae.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(B.FRAMEBUFFER,Ae.__webglFramebuffer),ce.copy(R.viewport),ye.copy(R.scissor),We=R.scissorTest,w.viewport(ce),w.scissor(ye),w.setScissorTest(We),oe=-1;return}else if(Ae.__webglFramebuffer===void 0)he.setupRenderTarget(R);else if(Ae.__hasExternalTextures)he.rebindTextures(R,Q.get(R.texture).__webglTexture,Q.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const gt=R.depthTexture;if(Ae.__boundDepthTexture!==gt){if(gt!==null&&Q.has(gt)&&(R.width!==gt.image.width||R.height!==gt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(R)}}const Ye=R.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Fe=!0);const et=Q.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(et[Y])?ee=et[Y][ae]:ee=et[Y],ne=!0):R.samples>0&&he.useMultisampledRTT(R)===!1?ee=Q.get(R).__webglMultisampledFramebuffer:Array.isArray(et)?ee=et[ae]:ee=et,ce.copy(R.viewport),ye.copy(R.scissor),We=R.scissorTest}else ce.copy(Ue).multiplyScalar(_e).floor(),ye.copy(rt).multiplyScalar(_e).floor(),We=se;if(ae!==0&&(ee=Z),w.bindFramebuffer(B.FRAMEBUFFER,ee)&&w.drawBuffers(R,ee),w.viewport(ce),w.scissor(ye),w.setScissorTest(We),ne){const Ae=Q.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ae.__webglTexture,ae)}else if(Fe){const Ae=Y;for(let Ye=0;Ye<R.textures.length;Ye++){const et=Q.get(R.textures[Ye]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Ye,et.__webglTexture,ae,Ae)}}else if(R!==null&&ae!==0){const Ae=Q.get(R.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ae.__webglTexture,ae)}oe=-1},this.readRenderTargetPixels=function(R,Y,ae,ee,ne,Fe,ze,Ae=0){if(!(R&&R.isWebGLRenderTarget)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=Q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ze!==void 0&&(Ye=Ye[ze]),Ye){w.bindFramebuffer(B.FRAMEBUFFER,Ye);try{const et=R.textures[Ae],gt=et.format,bt=et.type;if(R.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ae),!L.textureFormatReadable(gt)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable(bt)){Pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=R.width-ee&&ae>=0&&ae<=R.height-ne&&B.readPixels(Y,ae,ee,ne,De.convert(gt),De.convert(bt),Fe)}finally{const et=ie!==null?Q.get(ie).__webglFramebuffer:null;w.bindFramebuffer(B.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(R,Y,ae,ee,ne,Fe,ze,Ae=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=Q.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&ze!==void 0&&(Ye=Ye[ze]),Ye)if(Y>=0&&Y<=R.width-ee&&ae>=0&&ae<=R.height-ne){w.bindFramebuffer(B.FRAMEBUFFER,Ye);const et=R.textures[Ae],gt=et.format,bt=et.type;if(R.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ae),!L.textureFormatReadable(gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,$e),B.bufferData(B.PIXEL_PACK_BUFFER,Fe.byteLength,B.STREAM_READ),B.readPixels(Y,ae,ee,ne,De.convert(gt),De.convert(bt),0);const Bt=ie!==null?Q.get(ie).__webglFramebuffer:null;w.bindFramebuffer(B.FRAMEBUFFER,Bt);const $t=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Xf(B,$t,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,$e),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Fe),B.deleteBuffer($e),B.deleteSync($t),Fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,Y=null,ae=0){const ee=Math.pow(2,-ae),ne=Math.floor(R.image.width*ee),Fe=Math.floor(R.image.height*ee),ze=Y!==null?Y.x:0,Ae=Y!==null?Y.y:0;he.setTexture2D(R,0),B.copyTexSubImage2D(B.TEXTURE_2D,ae,0,0,ze,Ae,ne,Fe),w.unbindTexture()},this.copyTextureToTexture=function(R,Y,ae=null,ee=null,ne=0,Fe=0){let ze,Ae,Ye,et,gt,bt,$e,Bt,$t;const Jt=R.isCompressedTexture?R.mipmaps[Fe]:R.image;if(ae!==null)ze=ae.max.x-ae.min.x,Ae=ae.max.y-ae.min.y,Ye=ae.isBox3?ae.max.z-ae.min.z:1,et=ae.min.x,gt=ae.min.y,bt=ae.isBox3?ae.min.z:0;else{const jt=Math.pow(2,-ne);ze=Math.floor(Jt.width*jt),Ae=Math.floor(Jt.height*jt),R.isDataArrayTexture?Ye=Jt.depth:R.isData3DTexture?Ye=Math.floor(Jt.depth*jt):Ye=1,et=0,gt=0,bt=0}ee!==null?($e=ee.x,Bt=ee.y,$t=ee.z):($e=0,Bt=0,$t=0);const kt=De.convert(Y.format),on=De.convert(Y.type);let Ve;Y.isData3DTexture?(he.setTexture3D(Y,0),Ve=B.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(he.setTexture2DArray(Y,0),Ve=B.TEXTURE_2D_ARRAY):(he.setTexture2D(Y,0),Ve=B.TEXTURE_2D),w.activeTexture(B.TEXTURE0),w.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,Y.flipY),w.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),w.pixelStorei(B.UNPACK_ALIGNMENT,Y.unpackAlignment);const yn=w.getParameter(B.UNPACK_ROW_LENGTH),It=w.getParameter(B.UNPACK_IMAGE_HEIGHT),Tn=w.getParameter(B.UNPACK_SKIP_PIXELS),Nn=w.getParameter(B.UNPACK_SKIP_ROWS),Jn=w.getParameter(B.UNPACK_SKIP_IMAGES);w.pixelStorei(B.UNPACK_ROW_LENGTH,Jt.width),w.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Jt.height),w.pixelStorei(B.UNPACK_SKIP_PIXELS,et),w.pixelStorei(B.UNPACK_SKIP_ROWS,gt),w.pixelStorei(B.UNPACK_SKIP_IMAGES,bt);const Ke=R.isDataArrayTexture||R.isData3DTexture,Ft=Y.isDataArrayTexture||Y.isData3DTexture;if(R.isDepthTexture){const jt=Q.get(R),Un=Q.get(Y),Ht=Q.get(jt.__renderTarget),ai=Q.get(Un.__renderTarget);w.bindFramebuffer(B.READ_FRAMEBUFFER,Ht.__webglFramebuffer),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let bi=0;bi<Ye;bi++)Ke&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Q.get(R).__webglTexture,ne,bt+bi),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Q.get(Y).__webglTexture,Fe,$t+bi)),B.blitFramebuffer(et,gt,ze,Ae,$e,Bt,ze,Ae,B.DEPTH_BUFFER_BIT,B.NEAREST);w.bindFramebuffer(B.READ_FRAMEBUFFER,null),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(ne!==0||R.isRenderTargetTexture||Q.has(R)){const jt=Q.get(R),Un=Q.get(Y);w.bindFramebuffer(B.READ_FRAMEBUFFER,J),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,V);for(let Ht=0;Ht<Ye;Ht++)Ke?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,jt.__webglTexture,ne,bt+Ht):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,jt.__webglTexture,ne),Ft?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Un.__webglTexture,Fe,$t+Ht):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Un.__webglTexture,Fe),ne!==0?B.blitFramebuffer(et,gt,ze,Ae,$e,Bt,ze,Ae,B.COLOR_BUFFER_BIT,B.NEAREST):Ft?B.copyTexSubImage3D(Ve,Fe,$e,Bt,$t+Ht,et,gt,ze,Ae):B.copyTexSubImage2D(Ve,Fe,$e,Bt,et,gt,ze,Ae);w.bindFramebuffer(B.READ_FRAMEBUFFER,null),w.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Ft?R.isDataTexture||R.isData3DTexture?B.texSubImage3D(Ve,Fe,$e,Bt,$t,ze,Ae,Ye,kt,on,Jt.data):Y.isCompressedArrayTexture?B.compressedTexSubImage3D(Ve,Fe,$e,Bt,$t,ze,Ae,Ye,kt,Jt.data):B.texSubImage3D(Ve,Fe,$e,Bt,$t,ze,Ae,Ye,kt,on,Jt):R.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Fe,$e,Bt,ze,Ae,kt,on,Jt.data):R.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Fe,$e,Bt,Jt.width,Jt.height,kt,Jt.data):B.texSubImage2D(B.TEXTURE_2D,Fe,$e,Bt,ze,Ae,kt,on,Jt);w.pixelStorei(B.UNPACK_ROW_LENGTH,yn),w.pixelStorei(B.UNPACK_IMAGE_HEIGHT,It),w.pixelStorei(B.UNPACK_SKIP_PIXELS,Tn),w.pixelStorei(B.UNPACK_SKIP_ROWS,Nn),w.pixelStorei(B.UNPACK_SKIP_IMAGES,Jn),Fe===0&&Y.generateMipmaps&&B.generateMipmap(Ve),w.unbindTexture()},this.initRenderTarget=function(R){Q.get(R).__webglFramebuffer===void 0&&he.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?he.setTextureCube(R,0):R.isData3DTexture?he.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?he.setTexture2DArray(R,0):he.setTexture2D(R,0),w.unbindTexture()},this.resetState=function(){q=0,X=0,ie=null,w.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dt._getUnpackColorSpace()}}const br=new P;function Xn(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;br.copy(e),br[n]=0,br.normalize();const l=.5*a/(a+c),h=1-br.angleTo(i)/o;return Math.sign(br[t])===1?h*l:c/(a+c)+l+l*(1-h)}class Ni extends Se{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new P,l=new P,h=new P(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,_=u.length/6,g=new P,m=.5/a;for(let p=0,x=0;p<u.length;p+=3,x+=2)switch(o.fromArray(u,p),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(o.x)+l.x*r,u[p+1]=h.y*Math.sign(o.y)+l.y*r,u[p+2]=h.z*Math.sign(o.z)+l.z*r,f[p+0]=l.x,f[p+1]=l.y,f[p+2]=l.z,Math.floor(p/_)){case 0:g.set(1,0,0),d[x+0]=Xn(g,l,"z","y",r,n),d[x+1]=1-Xn(g,l,"y","z",r,t);break;case 1:g.set(-1,0,0),d[x+0]=1-Xn(g,l,"z","y",r,n),d[x+1]=1-Xn(g,l,"y","z",r,t);break;case 2:g.set(0,1,0),d[x+0]=1-Xn(g,l,"x","z",r,e),d[x+1]=Xn(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),d[x+0]=1-Xn(g,l,"x","z",r,e),d[x+1]=1-Xn(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),d[x+0]=1-Xn(g,l,"x","y",r,e),d[x+1]=1-Xn(g,l,"y","x",r,t);break;case 5:g.set(0,0,-1),d[x+0]=Xn(g,l,"x","y",r,e),d[x+1]=1-Xn(g,l,"y","x",r,t);break}}static fromJSON(e){return new Ni(e.width,e.height,e.depth,e.segments,e.radius)}}const Xh={type:"change"},pc={type:"start"},Yu={type:"end"},Ma=new qa,Yh=new Ci,l1=Math.cos(70*Zf.DEG2RAD),ln=new P,An=2*Math.PI,Yt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Bo=1e-6;class c1 extends u0{constructor(e,t=null){super(e,t),this.state=Yt.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gs.ROTATE,MIDDLE:Gs.DOLLY,RIGHT:Gs.PAN},this.touches={ONE:zs.ROTATE,TWO:zs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Bi,this._lastTargetPosition=new P,this._quat=new Bi().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new xh,this._sphericalDelta=new xh,this._scale=1,this._panOffset=new P,this._rotateStart=new K,this._rotateEnd=new K,this._rotateDelta=new K,this._panStart=new K,this._panEnd=new K,this._panDelta=new K,this._dollyStart=new K,this._dollyEnd=new K,this._dollyDelta=new K,this._dollyDirection=new P,this._mouse=new K,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=u1.bind(this),this._onPointerDown=h1.bind(this),this._onPointerUp=f1.bind(this),this._onContextMenu=x1.bind(this),this._onMouseWheel=m1.bind(this),this._onKeyDown=g1.bind(this),this._onTouchStart=_1.bind(this),this._onTouchMove=v1.bind(this),this._onMouseDown=d1.bind(this),this._onMouseMove=p1.bind(this),this._interceptControlDown=y1.bind(this),this._interceptControlUp=M1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xh),this.update(),this.state=Yt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;ln.copy(t).sub(this.target),ln.applyQuaternion(this._quat),this._spherical.setFromVector3(ln),this.autoRotate&&this.state===Yt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=An:n>Math.PI&&(n-=An),s<-Math.PI?s+=An:s>Math.PI&&(s-=An),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ln.setFromSpherical(this._spherical),ln.applyQuaternion(this._quatInverse),t.copy(this.target).add(ln),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=ln.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=ln.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ma.origin.copy(this.object.position),Ma.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ma.direction))<l1?this.object.lookAt(this.target):(Yh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ma.intersectPlane(Yh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Bo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Bo||this._lastTargetPosition.distanceToSquared(this.target)>Bo?(this.dispatchEvent(Xh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?An/60*this.autoRotateSpeed*e:An/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ln.setFromMatrixColumn(t,0),ln.multiplyScalar(-e),this._panOffset.add(ln)}_panUp(e,t){this.screenSpacePanning===!0?ln.setFromMatrixColumn(t,1):(ln.setFromMatrixColumn(t,0),ln.crossVectors(this.object.up,ln)),ln.multiplyScalar(e),this._panOffset.add(ln)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ln.copy(s).sub(this.target);let r=ln.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(An*this._rotateDelta.x/t.clientHeight),this._rotateUp(An*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-An*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(An*this._rotateDelta.x/t.clientHeight),this._rotateUp(An*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new K,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function h1(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function u1(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function f1(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yu),this.state=Yt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function d1(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Yt.DOLLY;break;case Gs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Yt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Yt.ROTATE}break;case Gs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Yt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Yt.PAN}break;default:this.state=Yt.NONE}this.state!==Yt.NONE&&this.dispatchEvent(pc)}function p1(i){switch(this.state){case Yt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Yt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function m1(i){this.enabled===!1||this.enableZoom===!1||this.state!==Yt.NONE||(i.preventDefault(),this.dispatchEvent(pc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Yu))}function g1(i){this.enabled!==!1&&this._handleKeyDown(i)}function _1(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case zs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Yt.TOUCH_ROTATE;break;case zs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Yt.TOUCH_PAN;break;default:this.state=Yt.NONE}break;case 2:switch(this.touches.TWO){case zs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Yt.TOUCH_DOLLY_PAN;break;case zs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Yt.TOUCH_DOLLY_ROTATE;break;default:this.state=Yt.NONE}break;default:this.state=Yt.NONE}this.state!==Yt.NONE&&this.dispatchEvent(pc)}function v1(i){switch(this._trackPointer(i),this.state){case Yt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Yt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Yt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Yt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Yt.NONE}}function x1(i){this.enabled!==!1&&i.preventDefault()}function y1(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function M1(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class b1 extends mu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Se;e.deleteAttribute("uv");const t=new G({side:vn}),n=new G,s=new Ou(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new le(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new yu(e,n,6),c=new sn;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new le(e,Fs(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new le(e,Fs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new le(e,Fs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new le(e,Fs(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const f=new le(e,Fs(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const d=new le(e,Fs(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Fs(i){return new t0({color:0,emissive:16777215,emissiveIntensity:i})}const S1=1.8,ui=.75,En=.9;function w1(i,e={}){const t=new o1({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=Tr,t.outputColorSpace=cn,t.toneMapping=ql,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new mu;r.background=new yt(n?12377333:14672872),r.fog=n?new Ar(12377333,60*s,160*s):new Ar(14672872,4*s,9*s);const a=new zl(t),c=a.fromScene(new b1,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new zn(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new P(...e.cameraPosition??[0,.5,1.45]),h=new P(...e.target??[0,.3,0]);o.position.copy(l);const u=new c1(o,t.domElement);u.target.copy(h),u.enableDamping=!0,u.dampingFactor=.08,u.enablePan=!1,u.minDistance=e.minDistance??.5,u.maxDistance=e.maxDistance??3,u.maxPolarAngle=Math.PI/2.05,u.minAzimuthAngle=-Math.PI/2.2,u.maxAzimuthAngle=Math.PI/2.2,u.update();const f=/Mac|iPhone|iPad/.test(navigator.platform),d=document.createElement("div");d.textContent=f?"Use ⌘ + scroll to zoom the lab":"Use Ctrl + scroll to zoom the lab",Object.assign(d.style,{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:"5",padding:"10px 18px",borderRadius:"12px",background:"rgba(17, 24, 39, 0.78)",color:"#fff",font:"600 14px system-ui, sans-serif",pointerEvents:"none",opacity:"0",transition:"opacity 0.25s"}),getComputedStyle(i).position==="static"&&(i.style.position="relative"),i.appendChild(d);let _=0;const g=se=>{const H=document.body.style.overflow==="hidden"||document.documentElement.scrollHeight<=window.innerHeight;se.defaultPrevented||se.ctrlKey||se.metaKey||H||(u.enableZoom=!1,window.setTimeout(()=>{u.enableZoom=!0},0),d.style.opacity="1",window.clearTimeout(_),_=window.setTimeout(()=>{d.style.opacity="0"},1200))};i.addEventListener("wheel",g,{capture:!0,passive:!0});const m=new vt;m.scale.setScalar(s),r.add(m);const p=e.benchLength??S1,x=[],y=[];let M=null,E=null,S=null,T=null;const v=[];let A=null,I=null;if(n)F1(m),O1(m);else{if(E1(m),A=U1(m,!!e.cupboard,p,s,!!e.wallCabinets),e.wallCabinets){I=zo(m,p,s),M=A1(m),E=T1(m);const se=N1(m);x.push(...se.doors),y.push(...se.blockers),T=se.cctvLed;const H=.15;S=new In(new P(-7+H,-En+.3,Ji+H).multiplyScalar(s),new P(7-H,-En+5-H,mc-H).multiplyScalar(s)),u.minAzimuthAngle=-1/0,u.maxAzimuthAngle=1/0;const j=p/2+.1+.08+.16,te=6.1,me=te-j,xe=(j+te)/2,Le=zo(m,p,s,{width:me,centres:[-xe,xe],lit:!1,covering:!1,doorPairs:3});x.push(...Le.doors),y.push(...Le.blockers),v.push({c:Le.cabinets[0],rotY:0,offset:new P},{c:I.cabinets[0],rotY:0,offset:new P},{c:I.cabinets[1],rotY:0,offset:new P},{c:Le.cabinets[1],rotY:0,offset:new P})}if(e.sideBenches){const se=7-ui/2-.02;for(const H of[-1,1]){const j=qh(p,s);if(j.group.position.set(H*se,0,1.6),j.group.rotation.y=-H*Math.PI/2,m.add(j.group),x.push(...j.parts.doors),y.push(...j.parts.blockers),e.wallCabinets){const me=new vt;me.position.set(H*7,0,1.6),me.rotation.y=-H*Math.PI/2,m.add(me);const xe=p/2-.04,Le=zo(me,p,s,{wallZ:0,width:xe,centres:[-xe/2-.02,xe/2+.02],lit:!1,covering:!1});x.push(...Le.doors),y.push(...Le.blockers);for(const Ee of[...Le.cabinets].reverse())v.push({c:Ee,rotY:me.rotation.y,offset:me.position.clone()})}const te=qh(.9,s);te.group.position.set(H*(p/2+.5+.45),0,0),m.add(te.group),x.push(...te.parts.doors),y.push(...te.parts.blockers)}}}!n&&(e.cupboard||e.wallCabinets)&&(r.fog=new Ar(14672872,11*s,26*s)),s!==1&&m.traverse(se=>{if(!(se instanceof Ga)||!se.castShadow)return;const H=se.shadow.camera;H.left*=s,H.right*=s,H.top*=s,H.bottom*=s,H.near*=s,H.far*=s,H.updateProjectionMatrix(),se.shadow.normalBias*=s});const N=[],O=new l0;let Z=0;const J=se=>{Z=requestAnimationFrame(J),O.update(se);const H=Math.min(1,O.getDelta());if(N.forEach(j=>j(H)),oe){oe.t=Math.min(1,oe.t+H/.7);const j=oe.t<.5?2*oe.t*oe.t:1-Math.pow(-2*oe.t+2,2)/2;o.position.lerpVectors(oe.fromPos,oe.toPos,j),u.target.lerpVectors(oe.fromTarget,oe.toTarget,j),oe.t>=1&&(oe=null)}if(u.update(),S){const j=o.position,te=S,me=j.clone().clamp(te.min,te.max);me.equals(j)||(j.copy(me),o.lookAt(u.target))}B1(r,o,t.domElement.clientHeight),t.render(r,o)};Z=requestAnimationFrame(J);let V=null,q=null,X=null,ie=!1,oe=null;u.addEventListener("start",()=>{ie=!0,oe=null});const de=new ResizeObserver(()=>{const se=i.clientWidth,H=i.clientHeight;!se||!H||(t.setSize(se,H),o.aspect=se/H,o.updateProjectionMatrix(),V&&!ie&&(q!==null?ce(V,q,{dir:X||void 0}):ye(V)))});de.observe(i);function ce(se,H=.7,j={}){if(se.isEmpty())return;V=se.clone(),q=H,ie=!1;const te=se.getCenter(new P),me=(j.dir?j.dir.clone():l.clone().sub(h)).normalize();X=me.clone();const xe=o.position.clone(),Le=u.target.clone(),Ee=[0,1,2,3,4,5,6,7].map(dt=>new P(dt&1?se.max.x:se.min.x,dt&2?se.max.y:se.min.y,dt&4?se.max.z:se.min.z)),Ge=dt=>(o.position.copy(te).addScaledVector(me,dt),o.lookAt(te),o.updateMatrixWorld(!0),Ee.every(ct=>{const L=ct.clone().project(o);return L.z<1&&Math.abs(L.x)<=H&&Math.abs(L.y)<=H}));let qe=.01,B=u.maxDistance*4;for(let dt=0;dt<40;dt++){const ct=(qe+B)/2;Ge(ct)?B=ct:qe=ct}if(u.maxDistance=Math.max(u.maxDistance,B*1.5),h.copy(te),l.copy(te).addScaledVector(me,B),j.animate){o.position.copy(xe),o.lookAt(Le),oe={fromPos:xe,toPos:l.clone(),fromTarget:Le,toTarget:h.clone(),t:0};return}oe=null,o.position.copy(l),u.target.copy(h),u.update()}function ye(se){if(se.isEmpty())return;V=se.clone(),q=null,ie=!1;const H=se.getCenter(new P),j=se.getSize(new P),te=o.fov*Math.PI/180,me=2*Math.atan(Math.tan(te/2)*o.aspect),xe=Math.max(j.x/2/Math.tan(me/2),Math.max(j.y,j.z*.6)/2/Math.tan(te/2))*1.12+j.z*.25,Le=l.clone().sub(h).normalize(),Ee=Math.min(u.maxDistance,Math.max(u.minDistance,xe));h.copy(H),l.copy(H).addScaledVector(Le,Ee),o.position.copy(l),u.target.copy(h),u.update()}const We=new K;if(T){const se=T;let H=0;N.push(j=>{H+=j,se.visible=H%1.2<.7})}let ot=null;const lt=se=>{try{if(!ot){if(se===0)return;const te=window.AudioContext||window.webkitAudioContext,me=new te,xe=me.createBuffer(1,me.sampleRate*2,me.sampleRate),Le=xe.getChannelData(0);for(let L=0;L<Le.length;L++)Le[L]=Math.random()*2-1;const Ee=me.createBufferSource();Ee.buffer=xe,Ee.loop=!0;const Ge=me.createBiquadFilter();Ge.type="bandpass",Ge.frequency.value=1100,Ge.Q.value=.6;const qe=me.createBiquadFilter();qe.type="lowpass",qe.frequency.value=3500;const B=me.createGain();B.gain.value=0;const dt=me.createOscillator();dt.frequency.value=7;const ct=me.createGain();ct.gain.value=250,dt.connect(ct).connect(Ge.frequency),Ee.connect(Ge).connect(qe).connect(B).connect(me.destination),Ee.start(),dt.start(),ot={ctx:me,gain:B}}const{ctx:H,gain:j}=ot;H.state==="suspended"&&H.resume(),j.gain.setTargetAtTime(se===0?0:Math.min(.5,.3+.1*se),H.currentTime,.15)}catch{}};let re=null;if(M){const se=M;let H=0;N.push(j=>{H+=j,se.taps.forEach(Ee=>{const Ge=!!Ee.userData.on,qe=Ee.userData.handle;qe.rotation.y+=((Ge?-Math.PI/2:0)-qe.rotation.y)*Math.min(1,j*10);const B=Ee.userData.stream;if(B.visible=Ge,Ge){const dt=B.material.map;dt.offset.y=(dt.offset.y-j*3)%1,B.scale.x=B.scale.z=1+Math.sin(H*40)*.08}Ee.userData.splash.visible=Ge});const te=new Date,me=te.getSeconds()+te.getMilliseconds()/1e3,xe=te.getMinutes()+me/60,Le=te.getHours()%12+xe/60;se.clock.second.rotation.z=-(Math.floor(me)/60)*Math.PI*2,se.clock.minute.rotation.z=-(xe/60)*Math.PI*2,se.clock.hour.rotation.z=-(Le/12)*Math.PI*2}),re={taps:se.taps,tapOf:j=>{let te=j;for(;te&&!te.userData.isTap;)te=te.parent;return te},toggle:j=>{j.userData.on=!j.userData.on,lt(se.taps.filter(te=>te.userData.on).length)},isOn:j=>!!j.userData.on,anyOn:()=>se.taps.filter(j=>j.userData.on).length}}const Me=[...(A==null?void 0:A.doors)||[],...(I==null?void 0:I.doors)||[],...x];Me.length&&N.push(se=>{Me.forEach(H=>{const j=H.userData.open?H.userData.openAngle:0;H.rotation.y+=(j-H.rotation.y)*Math.min(1,se*7)})});const _e=se=>{let H=se;for(;H&&!H.userData.cupboardDoor;)H=H.parent;return H},He=se=>{se.userData.open=!se.userData.open},Je=I?{doors:I.doors,blockers:I.blockers,cabinets:v.map(({c:se,rotY:H,offset:j})=>({minX:se.minX*s,maxX:se.maxX*s,rows:se.rows.map(te=>te*s),rowHeight:se.rowHeight*s,depth:se.depth*s,z:se.z*s,frontZ:se.frontZ*s,bays:se.bays,topY:se.topY*s,corniceFrontZ:se.corniceFrontZ*s,cx:se.cx*s,rotY:H,offset:j.clone().multiplyScalar(s)}))}:null;let Ue=null;if(A){const se=A;Ue={doors:se.doors,blockers:se.blockers,bays:se.bays.map(H=>({minX:H.minX*s,maxX:H.maxX*s,levels:H.levels.map(j=>j*s),frontZ:H.frontZ*s,backZ:H.backZ*s})),toggleDoor:He,isOpen:H=>!!H.userData.open,doorOf:_e}}let rt=null;return E&&(N.push(E.update),rt=E.api),{cupboard:Ue,wallCabinets:Je,furniture:{doors:x,blockers:y},taps:re,extinguisher:rt,benchLength:p,unitScale:s,flyTo:(se,H)=>{V=null,q=null,ie=!1,l.copy(se).multiplyScalar(s),h.copy(H).multiplyScalar(s),u.maxDistance=Math.max(u.maxDistance,l.distanceTo(h)*1.5),oe={fromPos:o.position.clone(),toPos:l.clone(),fromTarget:u.target.clone(),toTarget:h.clone(),t:0}},toggleDoor:He,doorOf:_e,renderer:t,scene:r,camera:o,controls:u,canvas:t.domElement,onFrame:se=>{N.push(se)},resetView:()=>{o.position.copy(l),u.target.copy(h),u.update()},frameBox:ye,fitBox:ce,toNdc:se=>{const H=t.domElement.getBoundingClientRect();return We.set((se.clientX-H.left)/H.width*2-1,-((se.clientY-H.top)/H.height)*2+1),We},dispose:()=>{cancelAnimationFrame(Z),de.disconnect(),i.removeEventListener("wheel",g,{capture:!0}),ot==null||ot.ctx.close().catch(()=>{}),ot=null,window.clearTimeout(_),d.remove(),u.dispose(),r.traverse(se=>{var H;(se instanceof le||se instanceof Mu||se instanceof wn)&&((H=se.geometry)==null||H.dispose(),(Array.isArray(se.material)?se.material:[se.material]).forEach(te=>{var me;(me=te.map)==null||me.dispose(),te.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function E1(i){i.add(new Nu(16119807,9080729,.55));const e=new Ga(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new Ga(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}const Ji=-ui/2-.25;function T1(i){const e=-En,t=new vt;t.position.set(P1,e,I1),t.userData.isExtinguisher=!0,i.add(t);const n=new G({color:12986408,roughness:.35,metalness:.1}),s=new G({color:1382170,roughness:.5}),r=vi.steel(),a=(E,S,T,v,A,I=!0)=>{const N=new le(E,S);return N.position.set(T,v,A),N.castShadow=I,t.add(N),N};a(new Se(.16,.4,.01),r,0,.85,.095),a(new Se(.05,.05,.06),r,0,.85,.07);for(const E of[.7,1])a(new St(ba+.004,.008,8,28),r,0,E,0).rotation.x=Math.PI/2;a(new F(ba,ba,.5,28),n,0,.85,0),a(new F(.04,.045,.03,20),s,0,.585,0,!1),a(new F(.028,.032,.05,20),r,0,1.125,0);const c=a(new Se(.12,.02,.03),s,0,1.17,0),o=new P(0,.56,-.1),l=new Vs([new P(0,1.1,-.03),new P(0,1,-.1),new P(0,.72,-.12),o]);a(new Zn(l,24,.008,8,!1),s,0,0,0,!1);const h=new P(0,-.35,-.94).normalize(),u=a(new F(.008,.024,ko,16),s,0,0,0);u.quaternion.setFromUnitVectors(new P(0,1,0),h),u.position.copy(o).addScaledVector(h,ko/2);const f=o.clone().addScaledVector(h,ko).add(t.position),d=new le(new Ot(.1,.2),new G({roughness:.5,map:si(256,512,(E,S,T)=>{E.fillStyle="#ffffff",E.fillRect(0,0,S,T),E.fillStyle="#c62828",E.fillRect(0,0,S,T*.22),E.fillStyle="#ffffff",E.font="bold 110px Arial",E.textAlign="center",E.textBaseline="middle",E.fillText("CO₂",S/2,T*.11),E.fillStyle="#111827",E.font="bold 60px Arial",E.fillText("FIRE",S/2,T*.42),E.font="bold 38px Arial",E.fillText("EXTINGUISHER",S/2,T*.53),E.font="bold 30px Arial",E.fillText("CARBON DIOXIDE",S/2,T*.82)})}));d.position.set(0,.85,-ba-.002),d.rotation.y=Math.PI,t.add(d);const _=si(64,64,(E,S)=>{const T=E.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);T.addColorStop(0,"rgba(255,255,255,1)"),T.addColorStop(.45,"rgba(255,255,255,0.55)"),T.addColorStop(1,"rgba(255,255,255,0)"),E.fillStyle=T,E.fillRect(0,0,S,S)}),g=Array.from({length:L1},()=>{const E=new ls({map:_,color:16054523,transparent:!0,depthWrite:!1,opacity:0}),S=new wn(E);return S.visible=!1,S.renderOrder=4,S.raycast=()=>{},i.add(S),{sp:S,mat:E,vel:new P,age:0,life:1,size:.1,live:!1}});let m=0,p=0;const x=()=>{const E=g.find(T=>!T.live);if(!E)return;E.live=!0,E.age=0,E.life=2.6+Math.random()*1.2,E.size=.14+Math.random()*.08,E.sp.position.copy(f).add(new P((Math.random()-.5)*.02,(Math.random()-.5)*.02,(Math.random()-.5)*.02));const S=1.4+Math.random()*.6;E.vel.copy(h).add(new P((Math.random()-.5)*.35,(Math.random()-.5)*.35,(Math.random()-.5)*.35)).normalize().multiplyScalar(S),E.sp.visible=!0};return{api:{group:t,discharge:()=>{m=Math.max(m,D1)}},update:E=>{const S=m>0?-.35:0;if(c.rotation.z+=(S-c.rotation.z)*Math.min(1,E*12),m>0)for(m-=E,p+=E*60;p>=1;)p-=1,x();for(const T of g){if(!T.live)continue;if(T.age+=E,T.age>=T.life){T.live=!1,T.sp.visible=!1;continue}const v=T.age/T.life;T.vel.multiplyScalar(Math.max(0,1-E*2.2)),T.vel.y-=E*.08,T.sp.position.addScaledVector(T.vel,E),T.sp.scale.setScalar(T.size*(.6+2.4*v)),T.mat.opacity=.85*Math.min(1,T.age/.15)*Math.pow(1-v,.8)}}}}function A1(i){const e=vi.steel(),t=new G({color:13225684,roughness:.25,metalness:.9,side:Zt}),n=new G({map:fs(),roughness:.7}),s=new _i({color:2040616,roughness:.42,clearcoat:.4}),r=.8,a=.6,c=[];for(const y of[-1,1]){const M=new vt;M.position.set(y*(7-r/2-.02),0,Ji+a/2+.01),i.add(M);const E=.2,S=En-.035-E,T=new le(new Se(r-.04,S,a-.04),n);T.position.y=-En+S/2,T.castShadow=T.receiveShadow=!0,M.add(T);const v=(H,j,te,me)=>{const xe=new le(new Se(H,E,j),n);xe.position.set(te,-.035-E/2,me),M.add(xe)};v(r-.04,.02,0,(a-.04)/2-.01),v(r-.04,.02,0,-.5599999999999999/2+.01),v(.02,a-.04,(r-.04)/2-.01,0),v(.02,a-.04,-.76/2+.01,0);const A=new le(new Se(.004,En-.12,.002),new G({color:3877404}));A.position.set(0,-En/2-.02,(a-.04)/2+.001),M.add(A);for(const H of[-.04,.04]){const j=new le(new F(.006,.006,.1,12),e);j.position.set(H,-.2,(a-.04)/2+.015),M.add(j)}const I=.5,N=.36,O=.03,Z=.2,J=(H,j,te,me)=>{const xe=new le(new Se(H,.035,j),s);xe.position.set(te,-.0175,me),xe.receiveShadow=!0,M.add(xe)};J(r,a/2+O-N/2,0,-a/2+(a/2+O-N/2)/2),J(r,a/2-O-N/2,0,O+N/2+(a/2-O-N/2)/2),J((r-I)/2,N,-.325,O),J((r-I)/2,N,I/2+(r-I)/4,O);const V=new le(new Se(I,Z,N),[t,t,t,t,t,t]);V.geometry.groups.splice(2,1),V.position.set(0,-Z/2,O),M.add(V);const q=new le(new F(.025,.025,.004,20),new G({color:3621201,metalness:.8,roughness:.4}));q.position.set(0,-Z+.003,O),M.add(q);const X=new vt;X.userData.isTap=!0,X.userData.on=!1;const ie=O-N/2-.06,oe=.09,de=.3,ce=new le(new F(.014,.018,de,16),e);ce.position.set(0,de/2,ie);const ye=new le(new St(oe,.014,10,24,Math.PI),e);ye.position.set(0,de,ie+oe),ye.rotation.y=-Math.PI/2;const We=new le(new F(.016,.013,.04,14),e);We.position.set(0,de-.02,ie+2*oe);const ot=new le(new F(.03,.035,.02,20),e);ot.position.set(0,.01,ie);const lt=new vt;lt.position.set(0,.16,ie);const re=new le(new F(.022,.022,.04,16),e),Me=new le(new Se(.012,.012,.11),e);Me.position.set(0,.01,.06);const _e=new le(new Lt(.014,12,8),new G({color:2450411,roughness:.4}));_e.position.set(0,.01,.115),lt.add(re,Me,_e);const He=de-.04+Z,Je=si(32,128,(H,j,te)=>{H.fillStyle="#dbeafe",H.fillRect(0,0,j,te);for(let me=0;me<te;me+=6)H.fillStyle=`rgba(255,255,255,${.3+Math.random()*.5})`,H.fillRect(0,me,j,2)});Je.wrapS=Je.wrapT=gn,Je.repeat.set(1,3);const Ue=new le(new F(.009,.012,He,12,1,!0),new G({map:Je,color:12575743,transparent:!0,opacity:.75,roughness:.05,metalness:.1,depthWrite:!1}));Ue.position.set(0,de-.04-He/2,ie+2*oe),Ue.visible=!1;const rt=new le(new Pn(.07,24),new G({color:12575743,transparent:!0,opacity:.6,roughness:.05}));rt.rotation.x=-Math.PI/2,rt.position.set(0,-Z+.006,ie+2*oe),rt.visible=!1;const se=new le(new Se(I+.06,de+.05+Z,N+.16),new pi({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));se.position.set(0,(de+.05-Z)/2,O-.06),X.add(ce,ye,We,ot,lt,Ue,rt,se),X.userData.handle=lt,X.userData.stream=Ue,X.userData.splash=rt,M.add(X),c.push(X)}const o=new vt;o.position.set(0,1.68,Ji+.02),i.add(o);const l=.12,h=si(512,512,(y,M)=>{const E=M/2;y.fillStyle="#fffdf7",y.beginPath(),y.arc(E,E,E,0,Math.PI*2),y.fill(),y.fillStyle="#111827";for(let S=0;S<60;S++){const T=S/60*Math.PI*2,v=S%5===0;y.save(),y.translate(E,E),y.rotate(T),y.fillRect(v?-5:-2,-E+14,v?10:4,v?34:16),y.restore()}y.font="bold 54px Arial",y.textAlign="center",y.textBaseline="middle";for(let S=1;S<=12;S++){const T=S/12*Math.PI*2;y.fillText(String(S),E+Math.sin(T)*(E-92),E-Math.cos(T)*(E-92))}y.font="bold 22px Arial",y.fillStyle="#4b5563",y.fillText("LABORATORY",E,E+110)}),u=new le(new F(l+.02,l+.02,.05,48),new G({color:2042167,roughness:.4,metalness:.5}));u.rotation.x=Math.PI/2;const f=new le(new Pn(l,48),new G({map:h,roughness:.6}));f.position.z=.026;const d=new le(new Pn(l,48),new _i({color:16777215,transparent:!0,opacity:.12,roughness:.05,clearcoat:1,depthWrite:!1}));d.position.z=.05,o.add(u,f,d);const _=(y,M,E,S)=>{const T=new vt;T.position.z=S;const v=new le(new Se(M,y,.004),new G({color:E,roughness:.5}));return v.position.y=y/2-y*.12,T.add(v),o.add(T),T},g=_(l*.55,.014,1120295,.03),m=_(l*.8,.009,1120295,.034),p=_(l*.88,.004,14427686,.038),x=new le(new F(.01,.01,.012,16),new G({color:14427686}));return x.rotation.x=Math.PI/2,x.position.z=.042,o.add(x),{taps:c,clock:{hour:g,minute:m,second:p}}}const qu=()=>new G({color:1976890,roughness:.95}),R1=()=>new G({color:14928028,roughness:.55});function Gl(i,e,t,n,s,r,a=3.5){const c=new le(new Se(s,.008,.012),new G({color:16777215,emissive:16773590,emissiveIntensity:2}));c.position.set(e,t,n),i.add(c);const o=new Ou(16773590,a,1.4*r,2);o.position.set(e,t-.05,n+.05),i.add(o)}function C1(i,e){const t=-En,n=e-t,s=si(256,256,(_,g,m)=>{_.fillStyle="#1f5a63",_.fillRect(0,0,g,m);for(let p=0;p<g;p+=4)_.fillStyle=p%8===0?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",_.fillRect(p,0,2,m),_.fillRect(0,p,g,2);for(let p=0;p<900;p++)_.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"0,0,0"},${Math.random()*.06})`,_.fillRect(Math.random()*g,Math.random()*m,2,2);_.strokeStyle="rgba(255,255,255,0.06)",_.lineWidth=2,_.beginPath(),_.moveTo(g/2,0),_.lineTo(g,m/2),_.lineTo(g/2,m),_.lineTo(0,m/2),_.closePath(),_.stroke()});s.wrapS=s.wrapT=gn;const r=new G({map:fs(),roughness:.55}),a=new G({color:13936715,roughness:.25,metalness:1}),c=new G({color:15659250,roughness:.95}),o=7,l=7,h=l-Ji,u=(l+Ji)/2,f=5;[{x:0,z:Ji,rotY:0,length:2*o,newWall:!1},{x:-o,z:u,rotY:Math.PI/2,length:h,newWall:!0},{x:o,z:u,rotY:-Math.PI/2,length:h,newWall:!0},{x:0,z:l,rotY:Math.PI,length:2*o,newWall:!0,gap:ks+.2}].forEach(({x:_,z:g,rotY:m,length:p,newWall:x,gap:y})=>{const M=new vt;M.position.set(_,0,g),M.rotation.y=m,i.add(M);const E=y?[[-p/2,-y/2],[y/2,p/2]]:[[-p/2,p/2]];if(x&&y){const S=f-ti,T=new le(new Ot(y,S),c);T.position.y=t+ti+S/2,M.add(T)}E.forEach(([S,T])=>{const v=T-S,A=(S+T)/2;if(x){const X=new le(new Ot(v,f),c);X.position.set(A,t+f/2,0),X.receiveShadow=!0,M.add(X)}const I=s.clone();I.needsUpdate=!0,I.repeat.set(v/.35,n/.35);const N=new le(new Ot(v,n),new G({map:I,roughness:.95}));N.position.set(A,t+n/2,.004),N.receiveShadow=!0,M.add(N);const O=new le(new Se(v,.045,.022),r);O.position.set(A,e-.0225,.015),O.castShadow=!0,O.receiveShadow=!0,M.add(O);const Z=new le(new Se(v,.1,.018),r);Z.position.set(A,t+.05,.013),M.add(Z);const J=Math.floor(v/.15),V=new yu(new Lt(.007,10,8),a,J),q=new zt;for(let X=0;X<J;X++)q.makeTranslation(S+.075+X*.15,e-.075,.007),V.setMatrixAt(X,q);M.add(V)})})}const ks=1.8,ti=2.1,mc=7,P1=-2.3,I1=mc-.1,ba=.055,ko=.14,D1=3.5,L1=220;function N1(i){const e=-En,t=[],n=[],s=new G({map:fs(),roughness:.55}),r=new G({map:fs(),color:14727562,roughness:.5}),a=vi.steel(),c=mc,o=(v,A,I,N)=>{const O=new le(new Se(v,A,.08),s);O.position.set(I,N,c-.03),O.castShadow=!0,i.add(O),n.push(O)};o(.1,ti+.1,-ks/2-.05,e+(ti+.1)/2),o(.1,ti+.1,ks/2+.05,e+(ti+.1)/2),o(ks+.2,.1,0,e+ti+.05);const l=ks/2-.005,h=new _i({color:13625599,transparent:!0,opacity:.35,roughness:.05,depthWrite:!1});for(const v of[1,-1]){const A=new vt;A.position.set(-v*ks/2,e+ti/2,c-.02);const I=l,N=ti-.01,O=.045,Z=(ye,We,ot,lt)=>{const re=new le(new Se(ye,We,O),r);re.position.set(v*ot,lt,0),re.castShadow=!0,A.add(re)},J=.15,V=.75,q=.18,X=I-.18;Z(I,N/2+J,I/2,-N/2+(N/2+J)/2),Z(I,N/2-V,I/2,N/2-(N/2-V)/2),Z(q,V-J,q/2,(V+J)/2),Z(I-X,V-J,(I+X)/2,(V+J)/2);const ie=new le(new Ot(X-q,V-J),h);ie.position.set(v*(q+X)/2,(V+J)/2,0),ie.renderOrder=2,A.add(ie);const oe=new le(new Se(.1,.3,.004),a);oe.position.set(v*(I-.1),.05,-O/2-.003);const de=new le(new F(.012,.012,.3,12),a);de.position.set(v*(I-.1),.05,-O/2-.05);const ce=new le(new Se(I-.04,.2,.004),a);ce.position.set(v*I/2,-N/2+.12,-O/2-.003);for(const ye of[-.1,.2]){const We=new le(new F(.008,.008,.05,8),a);We.rotation.x=Math.PI/2,We.position.set(v*(I-.1),ye,-O/2-.025),A.add(We)}A.add(oe,de,ce),A.userData.cupboardDoor=!0,A.userData.open=!1,A.userData.openAngle=v*1.45,i.add(A),t.push(A)}const u=(v,A,I,N,O)=>{const Z=si(512,Math.round(512*A/v),N),J=new le(new Se(v,A,.03),[s,s,s,s,s,new G({map:Z,emissive:O?16777215:0,emissiveMap:O?Z:null,emissiveIntensity:O?.8:0,roughness:.4})]);J.position.set(0,I,c-.04),i.add(J)};u(.42,.15,e+ti+.25,(v,A,I)=>{v.fillStyle="#15803d",v.fillRect(0,0,A,I),v.fillStyle="#ffffff",v.font="bold 110px Arial",v.textAlign="center",v.textBaseline="middle",v.fillText("EXIT",A/2+40,I/2+6),v.fillRect(40,I*.3,70,16),v.beginPath(),v.moveTo(110,I*.3-22),v.lineTo(150,I*.3+8),v.lineTo(110,I*.3+38),v.fill()},!0),u(1.3,.18,e+ti+.5,(v,A,I)=>{const N=v.createLinearGradient(0,0,0,I);N.addColorStop(0,"#f8e3a1"),N.addColorStop(.5,"#d9a842"),N.addColorStop(1,"#a8781f"),v.fillStyle=N,v.fillRect(0,0,A,I),v.strokeStyle="#5a3f0c",v.lineWidth=4,v.strokeRect(6,6,A-12,I-12),v.fillStyle="#3b2606",v.font="bold 34px Georgia, serif",v.textAlign="center",v.textBaseline="middle",v.fillText("SCIENCE  LABORATORY",A/2,I/2+2)},!1);const f=new le(new Ot(6,4),new G({color:13159634,roughness:.8}));f.rotation.x=-Math.PI/2,f.position.set(0,e+.001,c+2),i.add(f);const d=new le(new Ot(6,5),new G({color:14673644,roughness:.9}));d.rotation.y=Math.PI,d.position.set(0,e+2.5,c+4),i.add(d);for(const v of[-3,3]){const A=new le(new Ot(4,5),new G({color:15265265,roughness:.9}));A.rotation.y=v<0?Math.PI/2:-Math.PI/2,A.position.set(v,e+2.5,c+2),i.add(A)}const _=new vt;_.position.set(4.2,2.35,Ji+.02),i.add(_);const g=new G({color:15987958,roughness:.4}),m=new le(new Se(.1,.12,.02),g),p=new le(new F(.015,.015,.16,12),g);p.rotation.x=Math.PI/2,p.position.z=.08,_.add(m,p);const x=new vt;x.position.z=.17;const y=new P(0,e+1.1,c).sub(_.position).sub(x.position);x.rotation.order="YXZ",x.rotation.y=Math.atan2(y.x,y.z),x.rotation.x=-Math.atan2(y.y,Math.hypot(y.x,y.z)),_.add(x);const M=new le(new Se(.09,.08,.24),g);M.position.z=.06;const E=new le(new Se(.11,.012,.28),g);E.position.set(0,.046,.08);const S=new le(new F(.028,.028,.02,20),new G({color:988970,roughness:.1,metalness:.6}));S.rotation.x=Math.PI/2,S.position.z=.185;const T=new le(new Lt(.006,8,6),new G({color:15680580,emissive:15680580,emissiveIntensity:2}));return T.position.set(.03,-.025,.182),x.add(M,E,S,T),{doors:t,blockers:n,cctvLed:T}}function zo(i,e,t=1,n={}){const s=n.width??e/2+.1,r=.86,a=.3,c=.016,o=.5,l=(n.wallZ??Ji)+.002,h=l+a,u=4,f=fs(),d=new G({map:f,roughness:.6}),_=qu(),g=R1(),m=new G({color:14146528,roughness:.3,metalness:.85}),p=new _i({color:15398655,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1}),x=[],y=[],M=[];n.covering!==!1&&C1(i,o);const E=.08+s/2;for(const S of n.centres??[-E,E]){const T=S-s/2,v=S+s/2,A=(de,ce,ye,We,ot,lt,re)=>{const Me=new le(new Se(de,ce,ye),re);Me.position.set(We,ot,lt),Me.castShadow=!0,Me.receiveShadow=!0,i.add(Me),y.push(Me)};A(s,r,c,S,o+r/2,l+c/2,_),A(c,r,a,T+c/2,o+r/2,l+a/2,d),A(c,r,a,v-c/2,o+r/2,l+a/2,d),A(s,c*1.5,a,S,o+r-c*.75,l+a/2,d),A(s,c*1.5,a,S,o+c*.75,l+a/2,d),A(s+.03,.03,a+.02,S,o+r+.015,l+a/2+.01,d);const I=o+c*1.5,N=o+r-c*1.5,O=(N-I)/u,Z=[];for(let de=0;de<u;de++){const ce=I+de*O;de>0&&A(s-2*c,c,a-c-.03,S,ce-c/2,l+c+(a-c-.03)/2,g),Z.unshift(ce)}if(n.lit!==!1)for(const de of[S-s/4,S+s/4])Gl(i,de,N-.006,l+a*.72,s/2-.08,t);M.push({bays:n.doorPairs??1,topY:o+r+.03,corniceFrontZ:l+a+.02,cx:S,minX:T+c,maxX:v-c,rows:Z,rowHeight:O-c,depth:a-c-.05,z:l+c+(a-c-.03)/2,frontZ:l+a-.03});const J=n.doorPairs??1,V=s/J;for(let de=1;de<J;de++)A(c,r,a,T+de*V,o+r/2,l+a/2,d);const q=V/2-.004,X=r-.01,ie=.018,oe=[];for(let de=0;de<J;de++)oe.push([T+de*V,1],[T+(de+1)*V,-1]);for(const[de,ce]of oe){const ye=new vt;ye.position.set(de+ce*.002,o+r/2,h+.008);const We=new le(new Se(q-ie,X-ie,.004),p);We.position.x=ce*q/2,We.renderOrder=2,ye.add(We);const ot=(re,Me,_e,He)=>{const Je=new le(new Se(re,Me,.014),m);Je.position.set(_e,He,0),ye.add(Je)};ot(q,ie,ce*q/2,X/2-ie/2),ot(q,ie,ce*q/2,-X/2+ie/2),ot(ie,X,ce*ie/2,0),ot(ie,X,ce*(q-ie/2),0);const lt=new le(new F(.008,.008,.07,12),vi.steel());lt.position.set(ce*(q-.04),-.12,.02),ye.add(lt),ye.userData.cupboardDoor=!0,ye.userData.open=!1,ye.userData.openAngle=-ce*1.7,i.add(ye),x.push(ye)}}return{doors:x,blockers:y,cabinets:M}}function qh(i,e){const t=new vt,n=new le(new Ni(i,.035,ui,3,.008),new _i({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));n.position.y=-.0175,n.castShadow=!0,n.receiveShadow=!0,t.add(n);const s=Zu(t,fs(),i,e,!1);return{group:t,parts:s}}function U1(i,e=!1,t=1.8,n=1,s=!1){const r=si(512,512,(g,m,p)=>{g.fillStyle="#b9bec6",g.fillRect(0,0,m,p);for(let x=0;x<1200;x++)g.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,g.fillRect(Math.random()*m,Math.random()*p,3,3);g.strokeStyle="rgba(70,74,82,0.35)",g.lineWidth=3,g.strokeRect(0,0,m,p)});r.wrapS=r.wrapT=gn,r.repeat.set(12,12);const a=new le(new Ot(14,14),new G({map:r,roughness:.85}));a.rotation.x=-Math.PI/2,a.position.y=-En,a.receiveShadow=!0,i.add(a);const c=new le(new Ot(14,5),new G({color:15659250,roughness:.95}));c.position.set(0,1.6,-ui/2-.25),c.receiveShadow=!0,i.add(c);const o=si(256,256,(g,m,p)=>{g.fillStyle="#f7f8f9",g.fillRect(0,0,m,p),g.strokeStyle="#c9ced4",g.lineWidth=4,g.strokeRect(0,0,m,p)});o.wrapS=o.wrapT=gn,o.repeat.set(40,4);const l=new le(new Ot(6,.6),new G({map:o,roughness:.3,metalness:0}));l.position.set(0,.3,-ui/2-.249),s||i.add(l);const h=new le(new Ni(t,.035,ui,3,.008),new _i({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));h.position.y=-.0175,h.receiveShadow=!0,h.castShadow=!0,i.add(h);const u=fs();if(e)return Zu(i,u,t,n);const f=new le(new Se(t-.06,En-.035,ui-.06),new G({map:u,roughness:.7}));f.position.y=-En/2-.0175,f.receiveShadow=!0,i.add(f);const d=new G({color:3877404,roughness:.8}),_=vi.steel();for(const g of[-.6,0,.6]){const m=new le(new Se(.004,En-.12,.002),d);m.position.set(g,-En/2-.02,(ui-.06)/2+.001),i.add(m)}for(const g of[-.66,-.54,-.06,.06,.54,.66]){const m=new le(new F(.006,.006,.1,12),_);m.position.set(g,-.2,(ui-.06)/2+.015),i.add(m)}return null}function Zu(i,e,t,n=1,s=!0){const r=t-.06,a=ui-.06,c=.018,o=-.035,l=-En,h=o-l,u=a/2,f=-a/2,d=new G({map:e,roughness:.7}),_=new G({color:2898509,roughness:.7}),g=qu(),m=[],p=(V,q,X,ie,oe,de,ce)=>{const ye=new le(new Se(V,q,X),ce);return ye.position.set(ie,oe,de),ye.castShadow=!0,i.add(ye),m.push(ye),ye},x=l+.06;p(c,h,a,-r/2+c/2,l+h/2,0,d),p(c,h,a,r/2-c/2,l+h/2,0,d),p(r,h,c,0,l+h/2,f+c/2,g),p(c,h,a-c,0,l+h/2,c/2,g),p(r,c,a,0,x-c/2,0,_),p(r,.06,c,0,l+.03,u-.03,d),p(r,.04,c,0,o-.02,u-c/2,d);const y=-.46,M=r/2-c*1.5;if(p(M,c,a-c,-r/4,y-c/2,c/2,_),p(M,c,a-c,r/4,y-c/2,c/2,_),s)for(const V of[-r/4,r/4])Gl(i,V,o-.05,u-.12,M-.1,n,4),Gl(i,V,y-c-.006,u-.12,M-.1,n,4);const E=o-.04,S=x-c,T=E-S-.002,v=r>2.2,A=(v?r/4:r/2)-.0025,I=new G({map:e,roughness:.65}),N=vi.steel(),O=[];(v?[[-r/2,1,1.95],[0,-1,1.5],[0,1,1.5],[r/2,-1,1.95]]:[[-r/2,1,1.95],[r/2,-1,1.95]]).forEach(([V,q,X],ie)=>{const oe=new vt;oe.position.set(V+q*.001,(E+S)/2,u+c/2);const de=new le(new Se(A,T,c),I);de.position.x=q*A/2,de.castShadow=!0,oe.add(de);const ce=new le(new F(.006,.006,.1,12),N);ce.position.set(q*(A-.045),-.2-oe.position.y,c/2+.015),oe.add(ce);for(const ye of[ce.position.y-.05,ce.position.y+.05]){const We=new le(new F(.004,.004,.016,8),N);We.rotation.x=Math.PI/2,We.position.set(ce.position.x,ye,c/2+.008),oe.add(We)}oe.userData.cupboardDoor=!0,oe.userData.bay=v?ie<2?0:1:ie,oe.userData.open=!1,oe.userData.openAngle=-q*X,i.add(oe),O.push(oe)});const J=(V,q)=>({minX:V,maxX:q,levels:[x,y],frontZ:u-.02,backZ:f+c});return{doors:O,blockers:m,bays:[J(-r/2+c,-c/2),J(c/2,r/2-c)]}}function F1(i){i.add(new Nu(14675967,6126138,.8));const e=new Ga(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function O1(i){const e=si(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const h=60+Math.random()*70;a.fillStyle=`rgba(${h*.6},${h+40},${h*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=gn,e.repeat.set(80,80);const t=new le(new Ot(300,300),new G({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new le(new Ot(80,.1),new G({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new G({color:5980976,roughness:.9}),r=new G({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new le(new F(.25,.35,3,8),s);l.position.set(c,1.5,o);const h=new le(new Lt(2.2+a%3*.5,12,10),r);h.position.set(c,4.2+a%2,o),i.add(l,h)}}function fs(){return si(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function si(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Qs(n);return s.colorSpace=cn,s.anisotropy=16,s}function $u(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new Qs(s);o.colorSpace=cn;const l=new wn(new ls({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const h=e/700*.73;return l.scale.set(h*l.userData.aspect,h,1),l}const Vo=new P,Ho=new P;function B1(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(Vo).project(e),c.getWorldPosition(Ho).project(e);const o=Math.abs(Vo.y-Ho.y)*t/2+Math.abs(Vo.x-Ho.x)*t/2;s.visible=o>r*1.25})}const vi={steel:()=>new G({color:13094097,metalness:1,roughness:.28}),chrome:()=>new G({color:15133164,metalness:1,roughness:.12}),brass:()=>new G({color:13936715,metalness:1,roughness:.22}),castIron:()=>new G({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new G({color:1776928,roughness:.5}),glass:()=>new G({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})};function k1({pivot:i,rodX:e,armZ:t,armEnd:n}){const s=new vt,r=vi.castIron(),a=vi.steel(),c=f=>(f.castShadow=!0,s.add(f),f),o=c(new le(new Ni(.3,.022,.2,3,.006),r));o.position.set(e+.09,.011,t+.04),o.receiveShadow=!0;const l=i.y+.1;c(new le(new F(.0065,.0065,l,24),a)).position.set(e,l/2,t),c(new le(new Ni(.036,.042,.032,2,.004),r)).position.set(e,i.y,t);const h=c(new le(new F(.004,.004,.03,12),a));h.rotation.x=Math.PI/2,h.position.set(e,i.y,t+.028);const u=c(new le(new F(.005,.005,n-e,20),a));return u.rotation.z=Math.PI/2,u.position.set((e+n)/2,i.y,t),c(new le(new Ni(.018,.024,i.z-t+.012,2,.003),vi.brass())).position.set(i.x,i.y,(i.z+t)/2),s}function fx(i,e,t){const n=new vt,r=i/100+.02,a=new G({roughness:.6});a.map=si(128,2048,(h,u,f)=>{h.fillStyle="#facc15",h.fillRect(0,0,u,f);const d=f*(i/100/r)/(i*10);h.strokeStyle="#000000",h.fillStyle="#000000",h.font="bold 30px sans-serif",h.textBaseline="middle";for(let _=0;_<=i*10;_++){const g=_*d,m=_%50===0?56:_%10===0?38:18;h.lineWidth=_%10===0?3:1.5,h.beginPath(),h.moveTo(0,g),h.lineTo(m,g),h.stroke(),_%50===0&&_>0&&h.fillText(String(_/10),64,g)}});const c=()=>new G({color:15381256,roughness:.6}),o=new le(new Se(.03,r,.004),[c(),c(),c(),c(),a,c()]);o.position.set(e.x,e.y-r/2,e.z),o.castShadow=!0,n.add(o);const l=new le(new Ni(.036,.018,Math.abs(t-e.z)+.02,2,.003),vi.blackPlastic());return l.position.set(e.x,e.y+.002,(e.z+t)/2),l.castShadow=!0,n.add(l),{group:n,mesh:o,setArmed:h=>{a.emissive.setHex(h?5195493:0),a.emissiveIntensity=h?.25:0}}}function dx(i,e){i.traverse(t=>{if(!(t instanceof le))return;(Array.isArray(t.material)?t.material:[t.material]).forEach(s=>{s instanceof G&&(s.emissive.setHex(e?3616931:0),s.emissiveIntensity=e?.45:0)})})}const ht=(i=15857397)=>new _i({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:Zt,depthWrite:!1}),bn=i=>new G({color:i,roughness:.45,metalness:.15}),nt=(i=13094097)=>new G({color:i,roughness:.28,metalness:1}),pt=()=>new G({color:15133164,roughness:.12,metalness:1}),Bn=()=>new G({color:13936715,roughness:.22,metalness:1}),tt=i=>new G({color:i,roughness:.5,metalness:.05}),Kt=i=>new G({color:i,roughness:.35,metalness:.1}),Rn=()=>new G({color:10119233,roughness:.7});function Os(i,e,t,n,s=!1){const r=i.distanceTo(e),a=s?new Se(t*2,r,t*2.6):new F(t,t*.8,r,12),c=new le(a,n);return c.position.copy(i).add(e).multiplyScalar(.5),c.quaternion.setFromUnitVectors(new P(0,1,0),e.clone().sub(i).normalize()),c}const Go=()=>new G({color:14278114,roughness:.3,metalness:.9}),Ce=(i,e,t,n=Math.min(i,e,t)*.12)=>new Ni(i,e,t,3,n);function b(i,e,t=0,n=0,s=0){const r=new le(i,e);return r.position.set(t,n,s),r}function Mt(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Qs(n);return s.colorSpace=cn,s.anisotropy=16,s}function Cn(i,e,t,n){const s=new vt;return s.add(b(new F(.018,.022,.05,16),Bn(),0,.025,0)),s.add(b(new F(.026,.026,.03,16),tt(n),0,.06,0)),s.position.set(i,e,t),s}function Yn(i,e,t,n=.55){const s=e*.85,r=new le(new F(i*.9,i*.9,s,40),new G({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const z1={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function Zh(i,e,t,n){const s=z1[n.hazard],r=Mt(512,256,(c,o,l)=>{c.fillStyle="#fffdf6",c.fillRect(0,0,o,l),c.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",c.fillRect(0,0,o,34),c.fillStyle="#ffffff",c.font="bold 24px sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),c.fillStyle="#111827";const h=String(n.display_name||"Reagent").split(" "),u=[];let f="";c.font="bold 40px sans-serif",h.forEach(_=>{const g=f?`${f} ${_}`:_;c.measureText(g).width>o-40&&f?(u.push(f),f=_):f=g}),u.push(f);const d=u.slice(0,2);d.forEach((_,g)=>c.fillText(_,o/2,(n.formula?86:110)+g*46-(d.length-1)*10)),n.formula&&(c.font="bold 54px serif",c.fillStyle="#1e3a8a",c.fillText(String(n.formula),o/2,212)),c.strokeStyle="#cbd5e1",c.lineWidth=4,c.strokeRect(2,2,o-4,l-4)}),a=b(new F(i,i,e,32,1,!0,-1.05,2.1),new G({map:r,roughness:.85,side:Zt}),0,t);return a.userData.role="reagent_label",a}function Sa(i,e,t,n){const s=Mt(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let h=1;h<=l;h++){const u=o-h/(l+1)*o;a.fillRect(0,u,h%5===0?44:24,h%5===0?4:2)}}),r=new le(new F(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new pi({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function wa(i){const e=Mt(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new wn(new ls({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function $h(i,e){return Mt(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const h=c+l/50*o,u=l%10===0;t.lineWidth=u?4:1.5;const f=u?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(h)*f,r+Math.sin(h)*f),t.lineTo(s+Math.cos(h)*(a-16),r+Math.sin(h)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const h=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(h)*(a-82),r+Math.sin(h)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function Ku(i){return Mt(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function Wa(i,e="#22c55e"){return Mt(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function Wo(){return Mt(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function V1(){return Mt(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const Xo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function H1(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[Xo[n],Xo[s],Xo[r],"#d4af37"]}class Yo extends ri{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new P){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function Wl(i,e,t,n={}){const s=new vt;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const h=[new K(0,.004),new K(.301,.004),new K(.315,.03),new K(.33949999999999997,.58),new K(.357,.6),new K(.364,.612)];r(new le(new qn(h,48),ht()));const u=b(new kn(.045,.07,3),ht(),.35*1,.6-.015,0);u.rotation.z=-Math.PI/2,r(u,Sa(.35*.95,.06,.6*.72,4),Yn(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const h=b(new F(.12,.12,.55,32,1,!0),ht(),0,.375),u=b(new Lt(.12,32,16,0,Math.PI*2,0,Math.PI/2),ht(),0,.1);u.rotation.x=Math.PI;const f=b(new St(.12*1.02,.012,10,32),ht(),0,.55+.1);f.rotation.x=Math.PI/2;const d=b(Ce(.34,.08,.34,.02),Rn(),0,.04);r(h,u,f,d,Yn(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const h=b(new F(.06,.06,1.1,32,1,!0),ht(),0,.7000000000000001),u=b(new F(.06*1.25,.06*1.25,.1,24),ht(15660799),0,.1),f=b(Ce(.16,.03,.035,.012),tt(1920728),.09,.1),d=b(new F(.03,.01,.1,16,1,!0),ht(),0,.02),_=b(new F(.2,.22,.04,32),Kt(3099491),0,.02);r(h,u,f,d,_,Sa(.06,.2,1.1*.85,10),Yn(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=b(new F(.018,.008,.3,16),ht(),0,.2),l=b(new Lt(.055,24,16),ht(),0,.42);l.scale.y=1.8;const h=b(new F(.018,.018,.3,16),ht(),0,.68),u=b(new St(.02,.003,6,20),new pi({color:1120295}),0,.74);u.rotation.x=Math.PI/2;const f=b(new Lt(.075,24,16),tt(12131356),0,.9);f.scale.y=1.25;const d=b(Ce(.22,.07,.18,.02),Rn(),0,.035);r(o,l,h,u,f,d);break}case"measuring_cylinder":{const h=b(new F(.18,.17099999999999999,.8,40,1,!0),ht(),0,.44),u=b(new F(.18*1.6,.18*1.7,.05,6),ht(15266293),0,.025),f=b(new kn(.035,.06,3),ht(),.18,.8+.03,0);f.rotation.z=-Math.PI/2,r(h,u,f,Sa(.18*.97,.12,.8*.8,5),Yn(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new G({color:1920728,roughness:.45,metalness:.2}),l=[new K(0,.005),new K(.27,.005),new K(.272,.018),new K(.2,.05),new K(.11,.1),new K(.075,.13),new K(0,.13)],h=new le(new qn(l,56),o),u=b(new F(.068,.07,.11,36),o,0,.175),f=Mt(128,16,(v,A,I)=>{v.fillStyle="#d4d4d8",v.fillRect(0,0,A,I),v.fillStyle="#71717a";for(let N=0;N<A;N+=4)v.fillRect(N,0,1.5,I)});f.wrapS=gn,f.repeat.set(3,1);const d=b(new F(.052,.052,.075,40),new G({map:f,roughness:.3,metalness:1}),0,.268),_=b(new F(.066,.066,.03,6),pt(),0,.32),g=b(new F(.06,.06,.012,40),pt(),0,.341),m=b(new F(.048,.048,.28,36,1,!0),pt(),0,.485),p=b(new F(.042,.042,.004,28),new G({color:4144966,roughness:.8}),0,.6),x=b(new St(.046,.004,8,32),pt(),0,.625);x.rotation.x=Math.PI/2;const y=new vt,M=b(new F(.032,.032,.2,24),pt(),0,.1);y.add(M);for(let v=0;v<3;v++)y.add(b(new F(.03,.036,.025,24),pt(),0,.215+v*.03));y.add(b(new F(.02,.02,.004,20),new G({color:2565930}),0,.29)),y.rotation.z=Math.PI/2+.12,y.position.set(-.05,.16,0),r(h,u,d,_,g,m,p,x,y);const E=n.flame==="on",S=b(new kn(.09,.3,24),new G({color:16751933,emissive:16738816,emissiveIntensity:E?1:0,transparent:!0,opacity:E?.75:0,depthWrite:!1}),0,.77);S.userData.role="flame";const T=b(new kn(.045,.16,16),new G({color:6333946,emissive:2450411,emissiveIntensity:E?1.3:0,transparent:!0,opacity:E?.85:0,depthWrite:!1}),0,.7);T.userData.role="flame",r(S,T);break}case"thermometer":{const o=Mt(256,1690,(p,x,y)=>{p.fillStyle="#fbfbf8",p.fillRect(0,0,x,y),p.fillStyle="#0f172a",p.textAlign="left",p.textBaseline="middle";const M=y-250,E=y-400;for(let S=0;S<=100;S+=2){const T=M-S/100*E,v=S%10===0;p.fillRect(x-(v?90:50),T-(v?3:1.5),v?90:50,v?6:3),v&&(p.font=`900 ${S%50===0?62:52}px Arial, sans-serif`,p.fillText(String(S),10,T))}p.font="700 44px Arial, sans-serif",p.fillText("°C",14,M-E-70)}),l=b(Ce(.1,.66,.02,.008),new G({map:o,roughness:.5}),0,.45,-.025),h=b(new F(.022,.022,.62,24),ht(16777215),0,.45),u=b(new F(.008,.008,.45,12),new G({color:14427686,roughness:.2}),0,.32),f=b(new Lt(.05,24,24),new G({color:14427686,roughness:.2}),0,.1),d=b(new Lt(.065,24,24),ht(16777215),0,.1),_=b(Ce(.26,.04,.2,.015),Kt(3099491),0,.02);r(l,h,u,f,d,_);const g=p=>.78-(1440-p*12.9)/1690*.66;let m;for(const p of[0,25,50,75,100]){const x=$u(`${p}°`,12,p%50===0?void 0:m);x.center.set(0,.5),x.position.set(.065,g(p),-.02),r(x),p%50===0&&(m=x)}break}case"battery":{const o=Mt(512,256,(_,g,m)=>{_.fillStyle="#111827",_.fillRect(0,0,g,m),_.fillStyle="#dc2626",_.fillRect(0,m*.62,g,m*.18),_.fillStyle="#fde68a",_.font="bold 96px Arial",_.textAlign="center",_.textBaseline="middle",_.fillText(`${n.voltage||6} V`,g/2,m*.34),_.fillStyle="#e5e7eb",_.font="bold 30px Arial",_.fillText("DC SUPPLY",g/2,m*.9)}),l=tt(2042167),h=b(Ce(.6,.3,.3,.035),[l,l,l,l,new G({map:o,roughness:.5}),l],0,.15),u=Cn(.2,.3,0,14427686),f=Cn(-.2,.3,0,1118481),d=new wn(new ls({map:Ku(n.voltage||6),depthTest:!1,transparent:!0}));d.scale.set(.34,.136,1),d.position.set(0,.58,0),d.renderOrder=9,d.userData.role="voltage",r(h,u,f,d);break}case"ruler":{const h=new G({color:15381256,roughness:.6}),u=new G({map:Wo(),roughness:.55});r(b(new Se(1.5,.015,.16),[h,h,u,h,h,h],0,.0075));break}case"bulb":{const o=n.state==="on",l=b(new Lt(.18,32,32),new _i({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const h=b(new St(.05,.006,8,24,Math.PI*1.7),new G({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);h.rotation.x=Math.PI/2,h.userData.role="led";const u=b(new F(.095,.11,.16,24),Bn(),0,.12),f=new vt;for(let _=0;_<5;_++){const g=b(new St(.1,.006,6,24),Bn(),0,.06+_*.028);g.rotation.x=Math.PI/2,f.add(g)}const d=b(Ce(.4,.04,.26,.015),Rn(),0,.02);r(l,h,u,f,d,Cn(-.15,.04,.07,14427686),Cn(.15,.04,.07,1118481));break}case"switch":{const o=b(Ce(.4,.06,.2,.012),Rn(),0,.03),l=b(new F(.02,.02,.1,16),Bn(),-.12,.11),h=b(Ce(.05,.06,.05,.008),Bn(),.12,.09),u=b(new F(.012,.012,.24,16),pt()),f=n.state==="closed";u.position.set(f?0:-.06,.16,0),u.rotation.z=f?Math.PI/2-.35:Math.PI/2-.9,u.userData.role="lever",u.add(b(new Lt(.028,16,12),tt(1118481),0,-.13,0)),r(o,l,h,u);break}case"resistor":{const o=Mt(256,64,(_,g,m)=>{_.fillStyle="#d9c6a1",_.fillRect(0,0,g,m),H1(n.resistance_ohm).forEach((p,x)=>{_.fillStyle=p,_.fillRect(60+x*34+(x===3?22:0),0,16,m)})}),l=b(new F(.07,.07,.32,32),new G({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const h=b(new F(.01,.01,.52,10),nt(13948120),0,.2);h.rotation.z=Math.PI/2;const u=b(Ce(.6,.04,.2,.012),tt(15195332),0,.02),f=b(new F(.012,.012,.16,10),nt(13948120),-.26,.12),d=f.clone();d.position.x=.26,r(l,h,u,f,d);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=b(Ce(.42,.4,.18,.03),Kt(o?1981066:8330525),0,.2),h=b(new St(.155,.015,12,48),pt(),0,.2,.091),u=b(new Pn(.15,48),new G({map:$h(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),f=b(new kn(.012,.13,8),bn(14427686),.02,.2,.1);f.rotation.z=-Math.PI/2+.6,f.userData.role="needle";const d=b(new Lt(.014,12,12),nt(2565930),0,.2,.1);r(l,h,u,f,d,Cn(-.12,.4,0,14427686),Cn(.12,.4,0,1118481));break}case"microscope":{const o=Kt(15659250),l=Kt(2040616);r(b(Ce(.36,.06,.47,.02),o,0,.03,-.05)),r(b(Ce(.1,.28,.1,.02),o,0,.19,-.22));const h=new Vs([new P(0,.27,-.23),new P(0,.55,-.23),new P(0,.74,-.14),new P(0,.8,-.03)]);r(new le(new Zn(h,24,.044,12,!1),o));const u=b(new F(.035,.035,.01,24),new G({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);u.userData.role="led",r(b(new F(.045,.05,.05,24),l,0,.085),u),r(b(Ce(.3,.022,.28,.006),l,0,.32));for(const f of[-.08,.08])r(b(new Se(.016,.004,.11),pt(),f,.333,.03));r(b(new F(.036,.036,.25,24),l,0,.7)),r(b(new F(.025,.03,.11,24),l,0,.88)),r(b(new F(.056,.06,.033,32),pt(),0,.565)),[14427686,15381256,2450411].forEach((f,d)=>{const _=new vt;_.position.y=.55,_.rotation.y=2*Math.PI*d/3;const g=new vt;g.position.z=.03,g.rotation.x=.35,g.add(b(new F(.015,.012,.07+d*.015,16),pt(),0,-.04-d*.008)),g.add(b(new F(.0158,.0158,.008,16),tt(f),0,-.03)),_.add(g),r(_)});for(const f of[-1,1]){const d=b(new F(.05,.05,.028,24),l,f*.08,.25,-.22);d.rotation.z=Math.PI/2;const _=b(new F(.025,.025,.028,20),l,f*.11,.25,-.22);_.rotation.z=Math.PI/2,r(d,_)}break}case"lens":{const o=b(new Lt(.22,40,40),ht(15988991),0,.42);o.scale.set(1,1,.22);const l=b(new St(.22,.02,16,48),nt(10265519),0,.42),h=b(new F(.015,.015,.2,12),nt(),0,.1),u=b(new F(.12,.14,.03,32),Kt(3099491),0,.015);r(o,l,h,u);break}case"mirror":{const o=b(Ce(.4,.5,.02,.006),[nt(4674921),nt(4674921),nt(4674921),nt(4674921),new G({color:16777215,metalness:1,roughness:.03}),nt(4674921)],0,.3,0),l=b(Ce(.36,.06,.12,.012),Rn(),0,.03,-.02);r(o,l);break}case"concave_mirror":{const h=()=>new Lt(.62,48,16,0,Math.PI*2,0,.5),u=b(h(),new G({color:14673646,metalness:.55,roughness:.12,side:vn}),0,.45,-.62);u.rotation.x=Math.PI/2;const f=b(h(),new G({color:2042167,roughness:.5,side:Ui}),0,.45,-.62+.012);f.rotation.x=Math.PI/2;const d=new vt;d.add(u,f);const _=.62*Math.sin(.5),g=-.62+.62*Math.cos(.5),m=b(new St(_,.016,10,48),nt(7041664),0,.45,g+.006),p=b(Ce(.05,.22,.05,.012),Kt(2565930),0,.33,.04),x=b(Ce(.32,.03,.22,.01),Kt(2565930),0,.015),y=b(new F(.014,.014,.3,12),nt(),0,.18),M=b(new Se(.5,.65,.4),new pi({visible:!1}),0,.3,0);r(d,m,p,x,y,M);break}case"illuminated_object":{const o=n.state==="on",l=b(Ce(.32,.4,.22,.02),Kt(2042167),0,.2),h=(g,m,p)=>{g.beginPath(),g.moveTo(m*.5,p*.12),g.lineTo(m*.78,p*.46),g.lineTo(m*.62,p*.46),g.lineTo(m*.62,p*.88),g.lineTo(m*.38,p*.88),g.lineTo(m*.38,p*.46),g.lineTo(m*.22,p*.46),g.closePath()},u=Mt(256,256,(g,m,p)=>{g.fillStyle="#111827",g.fillRect(0,0,m,p),g.strokeStyle="#94a3b8",g.lineWidth=2;for(let x=0;x<m;x+=12)g.beginPath(),g.moveTo(x,0),g.lineTo(x,p),g.moveTo(0,x),g.lineTo(m,x),g.stroke();g.fillStyle="#2a2e38",h(g,m,p),g.fill()}),f=Mt(256,256,(g,m,p)=>{g.fillStyle="#000000",g.fillRect(0,0,m,p),g.fillStyle="#fde68a",h(g,m,p),g.fill()}),d=b(new Ot(.24,.3),new G({map:u,emissiveMap:f,emissive:16769126,emissiveIntensity:o?1.6:0}),0,.22,.111);d.userData.role="led";const _=b(Ce(.3,.03,.2,.01),Kt(2565930),0,.015);r(l,d,_,Cn(-.1,.02,.13,14427686),Cn(.1,.02,.13,1118481));break}case"focus_screen":{const o=b(new Se(.3,.38,.015),new G({color:16448249,roughness:.85,side:Zt}),0,.26),l=b(Ce(.32,.4,.02,.01),Rn(),0,.26,-.005),h=b(Ce(.28,.03,.2,.01),Kt(2565930),0,.015),u=b(new F(.012,.012,.22,10),nt(),0,.1),f=b(new Se(.4,.5,.3),new pi({visible:!1}),0,.2,0);r(l,o,h,u,f);break}case"biological_model":{const o=b(new Se(.5,.012,.18),ht(14742270),0,.006),l=b(new Se(.14,.003,.14),ht(15857397),0,.014),h=b(new Pn(.045,32),new G({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);h.rotation.x=-Math.PI/2;const u=b(new Se(.12,.014,.17),tt(16317180),-.18,.007);r(o,l,h,u);break}case"wire":{const o=new le(new Zn(new Yo(.12,.15,5),240,.012,8,!1),new G({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=b(new F(.135,.135,.14,24),tt(3621201),0,.08);r(l,o);break}case"water_container":{const h=b(new F(.255,.3,.75,48,1,!0),ht(),0,.375),u=b(new Pn(.3,48),ht(),0,.003);u.rotation.x=-Math.PI/2;const f=b(new St(.14,.02,12,32,Math.PI*1.3),ht(),.3*.85,.75*.6);f.rotation.z=Math.PI/2,r(h,u,f,Yn(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),h=b(new F(.025,.025,l,24),nt(10265519),0,.025);h.rotation.z=Math.PI/2;const u=b(new Lt(.025,16,16),nt(7434618),-l/2,.025),f=u.clone();f.position.x=l/2,r(h,u,f);break}case"balance":{const o=b(Ce(.55,.1,.42,.03),Kt(15067115),0,.05),l=b(new F(.16,.16,.015,40),pt(),0,.11,.02),h=b(new F(.03,.03,.02,16),nt(),0,.1,.02),u=b(Ce(.3,.07,.05,.012),tt(2042167),0,.07,.2),f=new wn(new ls({map:Wa("0.0 g"),depthTest:!1,transparent:!0}));f.scale.set(.3,.135,1),f.position.set(0,.24,.2),f.renderOrder=9,f.userData.role="balance_display",r(o,l,h,u,f);break}case"stopwatch":{const o=b(new F(.13,.13,.045,48),Kt(2042167),0,.16);o.rotation.x=Math.PI/2;const l=b(new St(.13,.01,10,48),pt(),0,.16),h=b(new F(.022,.022,.04,16),pt(),0,.305),u=b(new St(.025,.006,8,20),pt(),0,.34),f=b(Ce(.18,.03,.12,.01),tt(3621201),0,.015),d=new wn(new ls({map:Wa("00:00.0"),depthTest:!1,transparent:!0}));d.scale.set(.2,.09,1),d.position.set(0,.16,.03),d.renderOrder=9,d.userData.role="stopwatch_display",r(o,l,h,u,f,d);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,h=o*.05,u=(o+l*1.6)*.05,f=new le(new Zn(new Yo(u,.05,22),440,.007,6,!1),new G({color:13094097,roughness:.25,metalness:1}));f.userData.role="spring_body",f.userData.naturalLengthUnits=h,f.userData.maxLengthUnits=u,f.scale.y=h/u,f.position.y=.85-u*f.scale.y/2;const d=b(new St(.03,.008,8,20),nt(7434618),0,.85),_=b(new F(.05,.05,.015,24),nt(5395035));_.userData.role="spring_hanger",_.position.y=.85-u*f.scale.y,r(f,d,_);break}case"retort_stand":{const o=k1({pivot:new P(0,.55,0),rodX:-.15,armZ:-.07,armEnd:.12});o.scale.setScalar(5),r(o);break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),h=.04+Math.min(.06,o/3e3),u=Mt(256,256,(d,_)=>{d.fillStyle="#4a525c",d.fillRect(0,0,_,_),d.fillStyle="#1f2328",d.beginPath(),d.arc(_/2,_/2,22,0,Math.PI*2),d.fill(),d.fillRect(_/2-9,_/2,18,_/2),d.fillStyle="#f1f5f9",d.font="bold 58px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText(`${o}g`,_/2,_/2-62)}),f=Kt(4870748);f.metalness=.5,r(b(new F(l,l,h,36),[f,new G({map:u,metalness:.4,roughness:.5}),f],0,h/2));break}case"ray_box":{const o=n.state==="on",l=b(Ce(.35,.22,.28,.03),Kt(2042167),0,.11),h=b(new Se(.2,.16,.012),tt(988970),0,.11,.145),u=b(new Se(.02,.12,.02),new G({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);u.userData.role="led";const f=b(new F(.012,.012,.3,10),tt(1120295),0,.03,-.29);f.rotation.x=Math.PI/2,r(l,h,u,f);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(b(Ce(o,.1,.55,.01),ht(14676223),0,.05));break}case"projectile_launcher":{const o=new G({color:2962235,metalness:.6,roughness:.4});r(b(Ce(.5,.05,.36,.015),o,0,.025));for(const d of[-.09,.09])r(b(Ce(.1,.22,.02,.006),o,0,.14,d));const l=new vt;l.position.y=.22,l.rotation.z=Math.PI/4;const h=b(new F(.05,.055,.45,28),new G({color:1920728,metalness:.5,roughness:.35}),.17,0);h.rotation.z=-Math.PI/2;const u=b(new St(.053,.011,12,28),pt(),.39,0);u.rotation.y=Math.PI/2;const f=b(new F(.018,.018,.22,16),nt());f.rotation.x=Math.PI/2,l.add(h,u,f),r(l);break}case"projectile":{r(b(new St(.05,.012,10,28),tt(3621201),0,.012)),r(b(new Lt(.07,32,20),new G({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=b(new F(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new G({map:V1(),transparent:!0,opacity:.92,roughness:.3,side:Zt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,h=.62,u=.085,f=[new K(0,.004),new K(l*.96,.004),new K(l,.03),new K(u+.01,h*.7),new K(u,h*.76),new K(u,h-.02),new K(u+.012,h),new K(u+.012,h+.012)],d=o?new _i({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:Zt,depthWrite:!1}):ht();r(new le(new qn(f,56),d));const _=Mt(512,512,(y,M,E)=>{y.clearRect(0,0,M,E),y.fillStyle="#ffffff",y.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([T,v])=>{y.fillRect(M*.6,E*T,M*.13,5),y.font="bold 34px Arial",y.fillText(v,M*.76,E*T+12)}),y.fillRect(M*.63,E*.64,M*.07,4),y.font="bold 40px Arial",y.fillText("250 ml",M*.12,E*.52),y.fillRect(M*.14,E*.58,M*.2,E*.09),y.save(),y.translate(M*.56,E*.86),y.rotate(-Math.PI/2),y.font="bold 22px Arial",y.fillText("APPROX. VOL",0,0),y.restore()}),g=.03,m=h*.7,p=new le(new qn([new K(l*1.006,g),new K((u+.01)*1.006,m)],24,-.75,1.5),new pi({map:_,transparent:!0,depthWrite:!1,side:Zt}));r(p);const x=new le(new F(.11,l*.94,h*.66,48),new G({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));x.userData.role="liquid",x.userData.maxFillHeight=h*.66,x.scale.y=.001,r(x);break}case"round_bottom_flask":{const o=b(new Lt(.28,40,28),ht(),0,.36),l=b(new F(.07,.07,.34,28,1,!0),ht(),0,.78),h=b(new St(.2,.025,12,40),tt(3621201),0,.05);h.rotation.x=Math.PI/2;const u=new vt;u.position.y=.14,u.add(Yn(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,h,u);break}case"evaporating_dish":{const o=[new K(0,.01),new K(.12,.012),new K(.26,.09),new K(.3,.13)];r(new le(new qn(o,48),new G({color:16317180,roughness:.25,side:Zt})));const l=new vt;l.position.y=.012,l.add(Yn(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=b(new St(.3,.02,12,48),nt(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const h=l/3*Math.PI*2,u=b(new F(.018,.018,.82,12),nt(5395035),Math.cos(h)*.34,.4,Math.sin(h)*.34);u.rotation.z=Math.cos(h)*-.08,u.rotation.x=Math.sin(h)*.08,r(u)}break}case"wire_gauze":{const o=Mt(256,256,(l,h,u)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,h,u),l.strokeStyle="#4b5563",l.lineWidth=2;for(let f=0;f<h;f+=10)l.beginPath(),l.moveTo(f,0),l.lineTo(f,u),l.moveTo(0,f),l.lineTo(h,f),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(h/2,u/2,h*.28,0,Math.PI*2),l.fill()});r(b(new Se(.62,.008,.62),new G({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=b(new F(.26,.03,.32,40,1,!0),ht(),0,.52),l=b(new F(.025,.02,.32,20,1,!0),ht(),0,.2),h=b(new kn(.22,.27,32,1,!0),new G({color:16777215,roughness:.9,side:Zt}),0,.53);h.rotation.x=Math.PI,r(o,l,h);break}case"test_tube_rack":{const o=b(Ce(.9,.04,.24,.01),Rn(),0,.3),l=b(Ce(.9,.04,.24,.01),Rn(),0,.02),h=b(Ce(.04,.3,.24,.01),Rn(),-.43,.16),u=h.clone();u.position.x=.43,r(o,l,h,u);const f=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let d=0;d<4;d++){const _=-.3+d*.2;r(b(new F(.055,.055,.42,20,1,!0),ht(),_,.25)),r(b(new F(.05,.05,.12,20),new G({color:f[d],transparent:!0,opacity:.8}),_,.12))}break}case"spatula":{const o=b(Ce(.32,.008,.05,.003),pt(),.16,.006),l=b(new Lt(.04,20,10,0,Math.PI*2,0,Math.PI/2),pt(),-.18,.04);l.rotation.x=Math.PI;const h=b(new F(.008,.008,.18,12),pt(),-.06,.008);h.rotation.z=Math.PI/2,r(o,l,h);break}case"wash_bottle":{const o=b(new F(.17,.18,.5,36),new G({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=b(new F(.07,.09,.08,24),tt(2450411),0,.54),h=b(new F(.012,.012,.3,10),tt(2450411),.08,.66);h.rotation.z=-.9,r(o,l,h,Yn(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const h=[new K(0,.003),new K(.188,.003),new K(.2,.03),new K(.2,.56),new K(.16000000000000003,.64),new K(.07,.6900000000000001),new K(.065,.75),new K(.072,.76)];r(new le(new qn(h,40),ht())),r(Yn(.2*.97,.56,n.color||"#eef6f8",.78));const u=b(new F(.06,.055,.07,24),ht(15266031),0,.56+.22),f=b(new F(.09,.09,.035,28),ht(15266031),0,.56+.27);r(u,f,Zh(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(b(new F(.21,.21,.46,40,1,!0),ht(),0,.46/2+.005)),r(b(new F(.21,.21,.01,40),ht(),0,.005));const h=.46*.62,u=b(new F(.21*.95,.21*.95,h,40),new G({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,h/2+.01),f=b(new F(.21*1.04,.21*1.04,.07,40),tt(2042167),0,.46+.035);r(u,f,Zh(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=b(new F(.02,.008,.36,16),ht(),0,.24),l=b(new Lt(.045,20,14),tt(1120295),0,.46);l.scale.y=1.6;const h=b(new F(.1,.1,.22,28),new G({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,h);break}case"crucible":{const o=[new K(0,.005),new K(.08,.005),new K(.13,.2),new K(.14,.21)],l=new G({color:16119284,roughness:.3,side:Zt});r(new le(new qn(o,40),l));const h=b(new F(.15,.15,.015,40),l,.32,.008),u=b(new Lt(.025,16,12),l,.32,.025);r(h,u);break}case"bar_magnet":{r(b(Ce(.3,.08,.1,.01),Kt(14427686),-.15,.04),b(Ce(.3,.08,.1,.01),Kt(1920728),.15,.04));const o=wa("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=wa("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(b(new F(.12,.12,.04,40),Bn(),0,.02)),r(b(new F(.105,.105,.002,40),new G({color:16777215}),0,.041));const o=new vt,l=b(new kn(.018,.09,4),bn(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const h=b(new kn(.018,.09,4),bn(2042167),0,0,.045);h.rotation.x=Math.PI/2,o.add(l,h),o.position.y=.05,o.userData.role="needle",r(o,b(new F(.11,.11,.012,40),ht(),0,.06));break}case"prism":{const o=new Zi;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new Ri(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new le(l,ht(14742270)));break}case"rheostat":{const o=new G({color:6054233,roughness:.75,metalness:.45}),l=new G({color:14925716,roughness:.6}),h=new G({color:1118481,roughness:.35}),u=.2,f=.79,d=Mt(64,64,(y,M,E)=>{y.fillStyle="#1a1a1a",y.fillRect(0,0,M,E);for(let S=0;S<E;S+=4)y.fillStyle="#3a3a3a",y.fillRect(0,S,M,1),y.fillStyle="#050505",y.fillRect(0,S+2,M,1)});d.wrapS=d.wrapT=gn,d.repeat.set(1,18);const _=b(new F(.125,.125,1.24,48),new G({map:d,roughness:.4,metalness:.6}),0,u);_.rotation.z=Math.PI/2,r(_);for(const y of[-1,1]){const M=b(new F(.12,.12,.1,40),l,y*.67,u),E=b(new F(.129,.129,.035,40),pt(),y*.635,u),S=b(new F(.1,.1,.05,32),o,y*.745,u);for(const I of[M,E,S])I.rotation.z=Math.PI/2;r(M,E,S);const T=new Zi;T.moveTo(-.17,0),T.lineTo(.17,0),T.lineTo(.09,.42),T.lineTo(-.09,.42),T.closePath();const v=new Ri(T,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});v.translate(0,0,-.015);const A=new le(v,o);A.rotation.y=Math.PI/2,A.position.x=y*f,r(A);for(const I of[-.2,.2]){const N=b(Ce(.1,.025,.09,.008),o,y*(f-y*.04),.0125,I),O=b(new F(.018,.018,.027,16),new G({color:2042167}),y*(f-y*.04),.0125,I);r(N,O)}r(b(Ce(.05,.03,.06,.006),pt(),y*.6,u-.15,.06)),r(b(new F(.014,.014,.02,12),nt(10265519),y*.6,u-.125,.06))}const g=(y,M,E,S)=>{const T=new vt,v=b(new F(.012,.012,.04,12),Bn(),S*.02,0,0);v.rotation.z=Math.PI/2;const A=b(new F(.03,.03,.06,18),h,S*.065,0,0);A.rotation.z=Math.PI/2;for(let I=0;I<9;I++){const N=b(new Se(.06,.006,.006),h,S*.065,Math.cos(I*.7)*.03,Math.sin(I*.7)*.03);T.add(N)}return T.add(v,A),T.position.set(y,M,E),T};r(g(f+.02,.32,.03,1),g(f+.02,.1,.03,1),g(-f-.02,.2,.06,-1));const m=b(new F(.012,.016,.05,12),Bn(),f+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(b(new Se(f*2,.035,.035),pt(),0,.395,-.02));const p=new vt,x=Mt(128,128,(y,M,E)=>{y.fillStyle="#111111",y.fillRect(0,0,M,E),y.fillStyle="#e5e7eb",y.font="bold 26px Arial",y.textAlign="center",y.save(),y.translate(30,E/2),y.rotate(-Math.PI/2),y.fillText("11",0,-4),y.fillText("5",0,22),y.restore()});p.add(b(Ce(.13,.08,.13,.015),[h,h,new G({map:x,roughness:.35}),h,h,h],0,.41,-.01)),p.add(b(Ce(.12,.09,.05,.012),h,0,.34,.05));for(const y of[-.035,.025])p.add(b(new F(.017,.017,.006,20),pt(),.02,.453,y));p.position.x=.05,p.userData.role="slider",r(p);break}case"dry_cell":{const o=Mt(512,256,(g,m,p)=>{g.fillStyle="#d61f26",g.fillRect(0,0,m,p),g.fillStyle="#f5c518",g.fillRect(0,0,m,10),g.fillRect(0,p-10,m,10);const x=m*.25;g.textAlign="center",g.font="italic bold 40px Georgia",g.fillStyle="#fde68a",g.fillText("Power Cell",x,52),g.fillStyle="#f59e0b",g.beginPath(),g.arc(x,118,40,0,Math.PI*2),g.fill(),g.fillStyle="#7c2d12",g.font="bold 44px Arial",g.fillText("+",x,134),g.fillStyle="#fde68a",g.font="bold 22px Arial",g.fillText("SUPER QUALITY",x,190),g.fillStyle="#ffffff",g.font="bold 24px Arial",g.fillText("BATTERY",x,218),g.fillText("1.5V",x,242),g.fillStyle="#fde68a",g.font="bold 30px Arial",g.fillText("1.5V  DRY CELL",m*.75,p/2+10)});o.wrapS=gn,o.offset.x=.25;const l=.09,h=.32,u=b(new F(l,l,h,48,1,!0),new G({map:o,roughness:.35}),0,h/2+.006),f=b(new F(l*.98,l*.98,.012,48),pt(),0,h+.006),d=b(new F(.03,.032,.025,24),pt(),0,h+.024),_=b(new F(l*.98,l*.98,.012,48),nt(10265519),0,.006);r(u,f,d,_);break}case"accumulator":{const o=Mt(1024,768,(p,x,y)=>{p.fillStyle="#f8fafc",p.fillRect(0,0,x,y),p.fillStyle="#1d4ed8",p.strokeStyle="#1d4ed8",p.textAlign="center",p.font="bold 44px Arial",p.fillText("UPPER LEVEL",x/2,70),p.fillRect(x*.08,90,x*.84,6),p.fillText("LOWER LEVEL",x/2,170),p.fillRect(x*.08,190,x*.84,6),p.fillRect(x*.06,250,x*.88,12),p.fillRect(x*.06,280,x*.4,300),p.fillStyle="#ffffff",p.font="bold 120px Arial",p.fillText("12V",x*.26,440),p.font="bold 34px Arial",p.fillText("LEAD-ACID",x*.26,520),p.fillStyle="#1d4ed8",p.font="bold 110px Arial",p.fillText("NS60",x*.7,400),p.font="bold 56px Arial",p.fillText("12V / 45AH",x*.7,480),p.font="bold 34px Arial",p.fillText("ACCUMULATOR",x*.7,545),p.fillRect(x*.06,600,x*.88,10)}),l=new G({color:15857145,roughness:.55}),h=new G({color:1920728,roughness:.4}),u=b(Ce(.9,.62,.55,.03),[l,l,l,l,new G({map:o,roughness:.5}),l],0,.31),f=b(Ce(.94,.09,.59,.025),h,0,.665),d=b(Ce(.96,.03,.61,.01),h,0,.625),_=b(Ce(.16,.055,.03,.008),h,0,.66,.3);r(u,f,d,_);const g=new G({color:16436245,roughness:.45});for(let p=0;p<6;p++){const x=-.35+p*.14;r(b(new F(.045,.045,.02,24),h,x,.72,-.12)),r(b(new F(.036,.04,.05,8),g,x,.75,-.12)),r(b(new F(.026,.026,.012,16),g,x,.781,-.12))}const m=new G({color:9146260,roughness:.5,metalness:.7});for(const[p,x]of[[-.38,"+"],[.38,"-"]]){r(b(new F(.06,.06,.03,28),h,p,.725,.12)),r(b(new F(.026,.032,.09,20),m,p,.785,.12));const y=wa(x);y.scale.set(.16,.035,1),y.position.set(p,.86,.12),r(y)}break}case"potentiometer":{const o=new G({color:13222799,roughness:.35,metalness:.9}),l=nt(12107462),h=new G({color:10108695,roughness:.55}),u=.12;r(b(new F(u,u,.09,48),o,0,.045));const f=new Zi;f.absarc(0,0,u*1.02,Math.PI*.05,Math.PI*.95,!0),f.lineTo(-u*1.05,u*.6),f.lineTo(u*1.05,u*.6);const d=new Ri(f,{depth:.012,bevelEnabled:!1}),_=b(d,h,0,.102,0);_.rotation.x=Math.PI/2,r(_),r(b(Ce(.2,.012,.14,.004),l,0,.114,-.02)),r(b(new F(.045,.045,.008,32),Bn(),0,.124));const g=b(new F(.05,.05,.03,6),o,0,.143);r(g),r(b(new F(.03,.03,.06,24),l,0,.16));for(let p=0;p<4;p++){const x=b(new St(.031,.004,6,24),l,0,.14+p*.012);x.rotation.x=Math.PI/2,r(x)}const m=b(new F(.024,.024,.2,24),l,0,.29);m.userData.role="lever",r(m,b(new Lt(.024,20,10,0,Math.PI*2,0,Math.PI/2),l,0,.39)),r(b(new Se(.02,.06,.012),l,-.08,.15,-.07));for(const p of[-.07,0,.07]){const x=b(new Se(.03,.08,.004),l,p,.07,u*.66),y=b(new St(.012,.005,8,16),l,p,.035,u*.66);r(x,y)}break}case"metre_bridge":{r(b(Ce(5.5,.08,.5,.01),new G({color:11561522,roughness:.6}),0,.04));const h=Mt(2048,96,(p,x,y)=>{p.fillStyle="#f6d58a",p.fillRect(0,0,x,y),p.fillStyle="#1f2937",p.strokeStyle="#1f2937",p.font="bold 22px Arial",p.textAlign="center";for(let M=0;M<=100;M++){const E=24+M/100*(x-48),S=M%10===0;p.lineWidth=S?3:1.4,p.beginPath(),p.moveTo(E,0),p.lineTo(E,S?46:M%5===0?34:22),p.stroke(),S&&p.fillText(String(M),E,76)}}),u=b(new Ot(5,.14),new G({map:h,roughness:.6}),0,.081,.12);u.rotation.x=-Math.PI/2,r(u);const f=Kt(14212579);r(b(new Se(.85,.012,.07),f,-2.1,.086,-.15)),r(b(new Se(.07,.012,.32),f,-2.5,.086,0)),r(b(new Se(.85,.012,.07),f,2.1,.086,-.15)),r(b(new Se(.07,.012,.32),f,2.5,.086,0)),r(b(new Se(2.6,.012,.07),f,0,.086,-.15));const d=b(new F(.004,.004,5,8),pt(),0,.1,.06);d.rotation.z=Math.PI/2,r(d);const _=tt(16436245);for(const[p,x]of[[-2.5,.13],[-2.4,-.15],[-1.75,-.15],[-1.2,-.15],[0,-.15],[1.2,-.15],[1.75,-.15],[2.4,-.15],[2.5,.13]])r(b(new F(.03,.035,.08,16),_,p,.13,x)),r(b(new F(.012,.012,.03,10),Bn(),p,.185,x));const g=b(new F(.03,.035,.28,16),tt(1120295),-.9,.16,.03);g.rotation.z=Math.PI/2.4;const m=b(new kn(.012,.05,8),pt(),-.79,.11,.05);r(g,m);for(const p of[-2.55,2.55])for(const x of[-.2,.2])r(b(new F(.03,.03,.02,12),tt(1120295),p,-.005,x));break}case"optical_pyrometer":{const o=new G({color:2040099,roughness:.8}),l=pt(),h=new G({color:9067051,roughness:.7});r(b(new F(.3,.3,1.3,40),o,0,.65,-.32)),r(b(new F(.31,.31,.08,40),o,0,1.33,-.32));for(const m of[.45,1.05]){const p=b(new St(.305,.012,6,48),h,0,m,-.32);p.rotation.x=Math.PI/2,p.scale.z=2.2,r(p)}r(b(new F(.2,.2,.95,40),o,0,.5,.05)),r(b(new F(.205,.205,.06,40),l,0,.03,.05));const u=Mt(512,128,(m,p,x)=>{m.fillStyle="#d6d9dc",m.fillRect(0,0,p,x),m.fillStyle="#f5f2e6",m.fillRect(150,18,210,92),m.strokeStyle="#374151",m.strokeRect(150,18,210,92),m.fillStyle="#14532d",m.font="italic bold 44px Georgia",m.fillText("Pyro",200,72),m.font="14px Arial",m.fillStyle="#111827";for(let y=0;y<9;y++)m.fillRect(160+y*22,98,2,8)});u.wrapS=gn,u.offset.x=.5,r(b(new F(.203,.203,.16,40,1,!0),new G({map:u,roughness:.3,metalness:.5}),0,.72,.05));const f=b(new St(.07,.015,10,32),l,0,.42,.25),d=b(new F(.05,.05,.02,24),o,0,.42,.25);d.rotation.x=Math.PI/2,r(f,d);const _=[new K(.06,0),new K(.065,.04),new K(.1,.11),new K(.095,.12)],g=new le(new qn(_,32),new G({color:2829616,roughness:.9,side:Zt}));g.position.set(0,1.05,.05),g.rotation.x=-.2,r(b(new F(.07,.08,.1,24),o,0,1,.05),g),r(b(new Se(.03,.1,.03),l,.2,.82,.05));break}case"power_transistor":{const o=new G({color:1579035,roughness:.55}),l=nt(14278114),h=.5;for(const m of[-.1,0,.1])r(b(new Se(.03,h,.012),l,m,h/2,0)),r(b(new Se(.05,.06,.014),l,m,h+.02,0));const u=b(Ce(.4,.36,.18,.015),o,0,h+.2,.02);r(u);const f=Mt(256,224,(m,p,x)=>{m.fillStyle="#18181b",m.fillRect(0,0,p,x),m.fillStyle="#e5e7eb",m.font="bold 48px Arial",m.textAlign="center",m.fillText("TIP122G",p/2,90),m.font="bold 40px Arial",m.fillText("AFN39",p/2,150),m.beginPath(),m.arc(40,40,18,0,Math.PI*2),m.lineWidth=4,m.strokeStyle="#e5e7eb",m.stroke()});r(b(new Ot(.38,.33),new G({map:f,roughness:.6}),0,h+.2,.111));const d=new Zi;d.moveTo(-.2,0),d.lineTo(.2,0),d.lineTo(.2,.34),d.lineTo(-.2,.34),d.lineTo(-.2,0);const _=new Fl;_.absarc(0,.26,.06,0,Math.PI*2,!1),d.holes.push(_);const g=b(new Ri(d,{depth:.05,bevelEnabled:!1}),l,0,h+.2,-.07);r(g);break}case"capacitor":{const u=Mt(1024,512,(f,d,_)=>{f.fillStyle="#38bdf8",f.fillRect(0,0,d,_),f.fillStyle="#0f172a",f.fillRect(d*.62,0,d*.16,_),f.fillStyle="#38bdf8";for(let g=60;g<_;g+=130)f.fillRect(d*.66,g,d*.08,18);f.fillStyle="#0f172a",f.save(),f.translate(d*.3,_/2),f.rotate(-Math.PI/2),f.textAlign="center",f.font="bold 84px Arial",f.fillText("2200 µF",0,-40),f.font="bold 64px Arial",f.fillText("16 V",0,40),f.font="italic 44px Georgia",f.fillText("Robicon®  -40+85°C",0,110),f.restore()});u.wrapS=gn,u.offset.x=.3,r(b(new F(.26,.26,.95,48),new G({map:u,roughness:.4}),0,.35+.95/2)),r(b(new F(.26*.94,.26*.94,.012,48),nt(13751771),0,.35+.95+.002)),r(b(new F(.26*.94,.26*.94,.02,48),tt(1120295),0,.35-.005));for(const f of[-.09,.09])r(b(new F(.008,.008,.35,8),Go(),f,.35/2,0));break}case"transformer":{const o=new G({color:5988456,roughness:.55,metalness:.4}),l=.9,h=.95,u=.42,f=.24;r(b(new Se(l,f*.8,u),o,0,f*.4)),r(b(new Se(l,f*.8,u),o,0,h-f*.4));for(const x of[-.66/2,(l-f)/2])r(b(new Se(f,h,u),o,x,h/2));const d=Mt(256,256,(x,y,M)=>{x.fillStyle="#5b6068",x.fillRect(0,0,y,M),x.strokeStyle="rgba(0,0,0,0.25)";for(let E=0;E<M;E+=6)x.beginPath(),x.moveTo(0,E),x.lineTo(y,E),x.stroke()});for(const x of[u/2+.001,-u/2-.001]){const y=b(new Ot(l,h),new G({map:d,roughness:.55,metalness:.4,transparent:!0,opacity:.5}),0,h/2,x);x<0&&(y.rotation.y=Math.PI),r(y)}const _=Mt(64,512,(x,y,M)=>{for(let E=0;E<M;E+=8){const S=x.createLinearGradient(0,E,0,E+8);S.addColorStop(0,"#7c2d12"),S.addColorStop(.5,"#e07a3f"),S.addColorStop(1,"#7c2d12"),x.fillStyle=S,x.fillRect(0,E,y,8)}});_.wrapS=_.wrapT=gn,_.repeat.set(4,1);const g=new G({map:_,roughness:.3,metalness:.75}),m=tt(15987958);for(const x of[-.66/2,(l-f)/2]){r(b(Ce(f+.22,h-f*1.7,u+.18,.08),g,x,h/2));for(const y of[f*.85,h-f*.85])r(b(Ce(f+.26,.02,u+.22,.006),m,x,y))}const p=(x,y)=>{const M=b(new F(.015,.015,.5,10),tt(x),l/2+.25,y,0);return M.rotation.z=Math.PI/2,M};r(p(14427686,h*.62),p(2450411,h*.38));break}case"twin_flex_wire":{const o=l=>{const h=[];for(let d=0;d<=900;d++){const _=d/900,g=_*5*Math.PI*2,m=.55+.05*Math.sin(g*.7)+.03*Math.sin(g*2.3),p=.04+.018*Math.sin(g*1.3)+_*.05,x=g*9+l,y=.016;h.push(new P((m+y*Math.cos(x))*Math.cos(g),p+y*Math.sin(x),(m+y*Math.cos(x))*Math.sin(g)*.85))}return new Vs(h)};r(b(new Zn(o(0),1400,.014,8,!1),tt(14427686))),r(b(new Zn(o(Math.PI),1400,.014,8,!1),tt(1120295)));break}case"toroid_inductor":{const h=b(new St(.3,.1,24,64),new G({color:15920326,roughness:.6}),0,.12000000000000001);h.rotation.x=Math.PI/2,r(h);const u=new G({color:12735786,roughness:.3,metalness:.8}),f=44;for(let d=0;d<f;d++){const _=d/f*Math.PI*2,g=b(new St(.1+.014,.012,6,20),u,Math.cos(_)*.3,.1+.02,Math.sin(_)*.3);g.rotation.y=-_,r(g)}for(const d of[-.05,.05]){const _=b(new F(.008,.008,.45,8),Go(),.6,.16,d);_.rotation.z=Math.PI/2,r(_)}break}case"micrometer":{const o=pt(),l=nt(13620184),h=new Zi;h.moveTo(-.32,.22),h.lineTo(-.32,0),h.absarc(0,0,.32,Math.PI,Math.PI*2,!1),h.lineTo(.32,.22),h.lineTo(.2,.22),h.lineTo(.2,0),h.absarc(0,0,.2,0,Math.PI,!0),h.lineTo(-.2,.22),h.lineTo(-.32,.22);const u=b(new Ri(h,{depth:.07,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:2}),l,0,.33,-.035);r(u);const f=Mt(256,128,(y,M,E)=>{y.fillStyle="#cfd3d8",y.fillRect(0,0,M,E),y.fillStyle="#111827",y.font="bold 34px Arial",y.textAlign="center",y.fillText("0-25mm",M/2,52),y.fillText("0.01",M/2,98)});r(b(new Ot(.2,.1),new G({map:f,roughness:.5,metalness:.4}),0,.07,.045));const d=.5,_=(y,M,E)=>{const S=b(y,M,E,d,0);return S.rotation.z=Math.PI/2,S};r(_(new F(.035,.035,.06,20),o,-.17)),r(_(new F(.03,.03,.32,20),o,.04)),r(_(new F(.06,.06,.12,24),l,.26));const g=Mt(256,512,(y,M,E)=>{y.fillStyle="#d8dce0",y.fillRect(0,0,M,E),y.fillStyle="#111827";const S=M*.5;y.fillRect(S-1,0,3,E),y.font="bold 18px Arial";for(let T=0;T<=25;T++){const v=12+T*19;y.fillRect(S-22,v,22,2),T<25&&y.fillRect(S+1,v+9,16,2),T%5===0&&(y.save(),y.translate(S-30,v),y.rotate(-Math.PI/2),y.fillText(String(T),-6,0),y.restore())}});g.wrapS=gn,g.offset.x=.25;const m=_(new F(.05,.05,.4,32),new G({map:g,roughness:.35,metalness:.6}),.52);r(m);const p=Mt(512,64,(y,M,E)=>{y.fillStyle="#d8dce0",y.fillRect(0,0,M,E),y.fillStyle="#111827";for(let S=0;S<50;S++)y.fillRect(S*(M/50),0,2,S%5===0?30:18)});r(_(new F(.07,.075,.1,40),new G({map:p,roughness:.35,metalness:.6}),.68));const x=Mt(128,128,(y,M,E)=>{y.fillStyle="#9aa0a6",y.fillRect(0,0,M,E),y.strokeStyle="#4b5563";for(let S=-E;S<M;S+=8)y.beginPath(),y.moveTo(S,0),y.lineTo(S+E,E),y.stroke(),y.beginPath(),y.moveTo(S+E,0),y.lineTo(S,E),y.stroke()});x.wrapS=x.wrapT=gn,x.repeat.set(6,2),r(_(new F(.075,.075,.24,40),new G({map:x,roughness:.5,metalness:.7}),.85)),r(_(new F(.035,.035,.08,20),o,1.01)),r(_(new F(.055,.055,.08,24,1),new G({map:x,roughness:.5,metalness:.7}),1.09));break}case"vernier_caliper":{const o=nt(14014942),l=new vt,h=1.8,u=.14,f=.025,d=Mt(2048,128,(x,y,M)=>{x.fillStyle="#e5e7eb",x.fillRect(0,0,y,M),x.fillStyle="#111827",x.textAlign="center",x.font="bold 26px Arial";const E=150,S=200,T=(y-S-60)/E;for(let v=0;v<=E;v++){const A=S+v*T,I=v%10===0?50:v%5===0?38:26;x.fillRect(A,M-I,2,I),v%10===0&&x.fillText(String(v/10),A,M-60)}}),_=b(new Se(h,u,f),[o,o,o,o,new G({map:d,roughness:.4,metalness:.6}),o],0,0,0);l.add(_),l.add(b(new Se(.16,.42,f),o,-h/2+.08,-.27,0)),l.add(b(new Se(.06,.16,f*.6),o,-h/2+.12,.15,0));const g=-h/2+.5,m=Mt(512,96,(x,y,M)=>{x.fillStyle="#cbd0d6",x.fillRect(0,0,y,M),x.fillStyle="#111827",x.font="bold 20px Arial",x.textAlign="center";for(let E=0;E<=50;E++){const S=40+E*8.6,T=E%10===0?34:E%5===0?26:18;x.fillRect(S,0,2,T),E%10===0&&x.fillText(String(E/2),S,60)}x.font="16px Arial",x.fillText("0.02 mm",440,86)});l.add(b(new Se(.5,u+.08,f+.02),[o,o,o,o,new G({map:m,roughness:.4,metalness:.6}),o],g+.2,-.01,.005)),l.add(b(new Se(.14,.42,f),o,g+.02,-.27,0)),l.add(b(new Se(.06,.16,f*.6),o,g-.02,.15,0)),l.add(b(new F(.03,.03,.05,16),o,g+.2,u/2+.065,0));const p=b(new F(.045,.045,.03,20),o,g+.35,-u/2-.05,0);p.rotation.x=Math.PI/2,l.add(p),l.add(b(new Se(.2,.02,.012),o,h/2+.1,-.03,0)),l.rotation.x=-Math.PI/2,l.position.y=f/2+.012,r(l);break}case"tape_measure":{const o=tt(16436245),l=new G({color:2042167,roughness:.85}),h=new vt,u=b(new F(.17,.17,.12,40),o,0,0,0);u.rotation.x=Math.PI/2;const f=b(new St(.17,.03,10,40,Math.PI*1.25),l,0,0,0);f.rotation.z=Math.PI*.6;const d=f.clone();d.position.z=-.045,f.position.z=.045;const _=b(Ce(.14,.1,.14,.02),l,.13,-.11,0),g=b(Ce(.06,.04,.05,.01),o,.05,.19,0),m=b(Ce(.12,.16,.012,.004),pt(),0,0,-.068);h.add(u,f,d,_,g,m),h.position.set(0,.18,0),r(h);const p=Mt(1024,64,(M,E,S)=>{M.fillStyle="#facc15",M.fillRect(0,0,E,S),M.fillStyle="#111827",M.font="bold 30px Arial";for(let T=0;T<=40;T++){const v=20+T*24.5;M.fillRect(v,0,2,T%10===0?30:T%5===0?22:14),T%10===0&&T>0&&M.fillText(String(T/10),v+4,58)}M.fillStyle="#dc2626",M.font="bold 20px Arial",M.fillText("25ft",470,58)}),x=b(new Se(.9,.004,.08),[tt(15381256),tt(15381256),new G({map:p,roughness:.4}),tt(15381256),tt(15381256),tt(15381256)],-.42,.02,0),y=b(new Se(.012,.05,.09),pt(),-.87,.035,0);r(x,y);break}case"triple_beam_balance":{const o=new G({color:14205861,roughness:.5}),l=pt();r(b(Ce(1.5,.1,.36,.03),o,.1,.05)),r(b(Ce(.3,.18,.3,.04),o,-.45,.17)),r(b(Ce(.12,.42,.14,.02),o,.78,.31)),r(b(new F(.03,.03,.1,12),l,-.45,.31)),r(b(new F(.28,.27,.02,48),l,-.45,.37));const h=_=>Mt(1024,48,(g,m,p)=>{g.fillStyle="#f8fafc",g.fillRect(0,0,m,p),g.fillStyle="#111827",g.font="16px Arial";for(let x=0;x<=50;x++){const y=10+x*19.6;g.fillRect(y,0,2,x%10===0?22:x%5===0?16:10),x%10===0&&g.fillText(String(x/50*_),y-6,42)}}),u=[.46,.4,.34],f=[10,500,100];u.forEach((_,g)=>{const m=b(new Se(1,.045,.02),[l,l,l,l,new G({map:h(f[g]),roughness:.4}),l],.22,_,0);r(m),r(b(Ce(.05,.06,.05,.008),o,-.15+g*.12,_+.005,.01))}),r(b(new Se(.18,.04,.06),l,-.25,.4,0)),r(b(new Se(.1,.01,.01),bn(1120295),.76,.42,.075)),r(b(new Se(.004,.08,.004),bn(14427686),.74,.42,.075));for(const[_,g]of[[-.1,.07],[.15,.06],[.38,.05]]){const m=b(new F(g*.8,g,.18,24),o,_,.17,.05);m.rotation.z=Math.PI/2,r(m)}const d=Mt(256,96,(_,g,m)=>{_.fillStyle="#fff",_.fillRect(0,0,g,m),_.fillStyle="#dc2626",_.fillRect(0,56,g,40),_.fillStyle="#111827",_.font="bold 22px Arial",_.textAlign="center",_.fillText("TRIPLE BEAM BALANCE",g/2,34)});r(b(new Ot(.22,.08),new G({map:d}),-.45,.17,.152));break}case"carbon_resistor":{const o=new G({color:14203276,roughness:.35}),l=[new K(.001,-.3),new K(.07,-.3),new K(.1,-.26),new K(.1,-.14),new K(.085,-.1),new K(.085,.1),new K(.1,.14),new K(.1,.26),new K(.07,.3),new K(.001,.3)],h=new le(new qn(l,40),o);h.rotation.z=Math.PI/2,h.position.y=.12,r(h),[[-.19,7027231,.103],[-.07,1118481,.088],[.03,14427686,.088],[.2,13934615,.103]].forEach(([f,d,_])=>{const g=b(new F(_,_,.04,40),new G({color:d,roughness:d===13934615?.3:.4,metalness:d===13934615?.7:0}),f,.12,0);g.rotation.z=Math.PI/2,r(g)});for(const f of[-.55,.55]){const d=b(new F(.012,.012,.5,10),Go(),f,.12,0);d.rotation.z=Math.PI/2,r(d)}break}case"antique_telescope":{const o=Bn(),l=Mt(512,256,(f,d,_)=>{f.fillStyle="#d9c39b",f.fillRect(0,0,d,_);for(let g=0;g<1500;g++)f.fillStyle=`rgba(110,70,30,${Math.random()*.08})`,f.fillRect(Math.random()*d,Math.random()*_,3,3);f.strokeStyle="rgba(90,60,30,0.35)",f.lineWidth=1;for(let g=0;g<12;g++)f.beginPath(),f.arc(Math.random()*d,Math.random()*_,20+Math.random()*60,0,Math.PI),f.stroke();f.fillStyle="rgba(160,60,40,0.25)",f.fillRect(40,0,120,_)}),h=new G({color:9063202,roughness:.6});r(b(new F(.2,.22,.06,32),h,0,.62));for(let f=0;f<3;f++){const d=f/3*Math.PI*2+Math.PI/2;r(Os(new P(Math.cos(d)*.15,.6,Math.sin(d)*.15),new P(Math.cos(d)*.36,0,Math.sin(d)*.36),.03,h,!0))}r(b(new F(.12,.12,.03,24),h,0,.25)),r(b(new F(.04,.05,.12,16),o,0,.71));const u=new vt;u.position.set(0,.86,0),u.rotation.z=.42,u.add(b(new F(.12,.12,1.1,40),new G({map:l,roughness:.75}),0,0,0));for(const f of[-.42,-.1,.25,.5])u.add(b(new F(.125,.125,.04,40),o,0,f,0));u.add(b(new F(.135,.13,.09,40),nt(10265519),0,.58,0)),u.add(b(new F(.11,.12,.08,32),o,0,-.59,0)),u.add(b(new F(.03,.04,.14,16),o,0,-.68,0));for(const f of[-.1,.1])u.add(b(new F(.02,.02,.1,12),o,.13,-.45,f));u.rotation.order="ZYX",u.rotation.z=-Math.PI/2+.42,r(u);break}case"telescope":{const o=new G({color:1120295,roughness:.5}),l=nt(13751771),h=.75;for(let g=0;g<3;g++){const m=g/3*Math.PI*2+Math.PI/2;r(Os(new P(Math.cos(m)*.05,h,Math.sin(m)*.05),new P(Math.cos(m)*.38,0,Math.sin(m)*.38),.016,l))}r(b(new F(.12,.12,.012,3),o,0,.3)),r(b(new F(.08,.09,.06,24),o,0,h)),r(b(Ce(.08,.14,.08,.01),o,0,h+.1));const u=new vt;u.position.set(0,h+.22,0),u.rotation.z=Math.PI/2-.25,u.add(b(new F(.09,.09,.7,40),new G({color:15068659,roughness:.3}),0,0,0)),u.add(b(new F(.11,.1,.22,40,1,!0),o,0,-.44,0));const f=b(new Pn(.095,32),new _i({color:9684477,roughness:.05,metalness:.3,clearcoat:1}),0,-.38,0);f.rotation.x=Math.PI/2,u.add(f),u.add(b(new F(.05,.06,.12,24),o,0,.41,0)),u.add(b(new Se(.07,.07,.07),o,0,.5,0));const d=b(new F(.028,.028,.12,16),o,.08,.5,0);d.rotation.z=Math.PI/2;const _=b(new F(.03,.03,.03,16),new G({color:15987958}),.15,.5,0);_.rotation.z=Math.PI/2,u.add(d,_),r(u);break}case"sct_telescope":{const o=new G({color:3104155,roughness:.45,metalness:.2}),l=new G({color:15987958,roughness:.35}),h=new G({color:1120295,roughness:.7,side:Zt});r(b(new F(.22,.25,.14,40),o,0,.07)),r(b(Ce(.5,.08,.2,.03),o,0,.2));for(const m of[-.24,.24]){r(Os(new P(m*.9,.22,0),new P(m,.72,0),.04,o,!0));const p=b(new F(.1,.1,.03,32),o,m*1.08,.72,0);p.rotation.z=Math.PI/2,r(p)}const u=new vt;u.position.set(0,.72,0),u.rotation.x=-.35,u.add(b(new F(.2,.2,.75,48,1,!0,Math.PI*.68,Math.PI*1.3),l,0,.15,0)),u.add(b(new F(.195,.195,.75,48,1,!0,Math.PI*.68,Math.PI*1.3),h,0,.15,0)),u.add(b(new St(.2,.025,10,48),o,0,.53,0).rotateX(Math.PI/2)),u.add(b(new F(.21,.21,.06,48),o,0,-.24,0));const f=b(new Pn(.19,40),ht(14412542),0,.52,0);f.rotation.x=-Math.PI/2,u.add(f),u.add(b(new F(.05,.05,.03,24),h,0,.5,0)),u.add(b(new F(.17,.17,.03,40),new G({color:15067115,metalness:1,roughness:.05}),0,-.16,0)),u.add(b(new F(.035,.035,.25,20),h,0,-.02,0)),u.add(b(new F(.03,.03,.1,16),h,0,-.32,0));const d=b(new F(.025,.025,.1,16),h,0,-.38,.05);d.rotation.x=Math.PI/2,u.add(d);const _=b(new F(.03,.03,.3,20),l,.27,.1,0);u.add(_,b(new F(.02,.02,.08,12),h,.27,-.08,0)),r(u);const g=b(new F(.22,.22,.06,40,1,!0),o,-.55,.03,.2);r(g,b(new Pn(.22,40),o,-.55,.002,.2).rotateX(-Math.PI/2));break}case"flow_calorimeter":{const o=new G({color:10119742,roughness:.65});r(b(Ce(1.6,.05,.45,.01),o,0,.025));for(const f of[-.45,.35])r(b(Ce(.16,.2,.14,.01),Rn(),f,.15,-.04));const l=new vt;l.position.set(0,.32,-.04);const h=b(new F(.06,.06,1.25,32,1,!0),ht(),0,0,0);h.rotation.z=Math.PI/2,l.add(h);const u=b(new F(.012,.012,.8,10),new G({color:4937059,metalness:.8,roughness:.4}),-.05,0,0);u.rotation.z=Math.PI/2,l.add(u);for(let f=0;f<40;f++){const d=b(new St(.016,.004,4,10),nt(10265519),-.45+f*.02,0,0);d.rotation.y=Math.PI/2,l.add(d)}for(const f of[-.65,.65]){const d=b(new F(.07,.065,.06,24),new G({color:12730636,roughness:.8}),f,0,0);d.rotation.z=Math.PI/2,l.add(d)}for(const f of[-.55,.55])l.add(b(new F(.015,.015,.1,12),ht(),f,.1,0));for(const f of[-.45,.35]){const d=b(new St(.065,.008,6,24,Math.PI),tt(15067115),f,-.005,0);d.rotation.y=Math.PI/2,l.add(d)}r(l);for(const f of[.5,.62])r(b(new F(.025,.03,.06,16),nt(12107462),f,.08,.14));r(b(new Zn(new Vs([new P(.69,.32,-.04),new P(.75,.25,.05),new P(.62,.11,.14)]),20,.008,6),tt(2450411))),r(b(new Zn(new Vs([new P(.69,.33,-.04),new P(.62,.25,.05),new P(.5,.11,.14)]),20,.008,6),tt(15381256)));break}case"sonometer":{const o=new G({map:Mt(512,64,(g,m,p)=>{g.fillStyle="#c98f4f",g.fillRect(0,0,m,p);for(let x=0;x<40;x++)g.strokeStyle=`rgba(110,60,20,${.1+Math.random()*.15})`,g.beginPath(),g.moveTo(0,Math.random()*p),g.bezierCurveTo(m/3,Math.random()*p,2*m/3,Math.random()*p,m,Math.random()*p),g.stroke()}),roughness:.6}),l=2.4,h=.36,u=.28;r(b(new Se(l,u,h),o,0,u/2));for(const g of[-.5,.6]){const m=b(new Pn(.06,24),new G({color:3875856}),g,u/2,h/2+.001);r(m)}const f=new G({map:Wo(),roughness:.5});for(const g of[-.15,.15]){const m=b(new Se(2,.006,.04),[f,f,f,f,f,f],0,u+.003,g);r(m)}for(const g of[-.75,.75])r(b(new Se(.06,.05,h-.05),Rn(),g,u+.025,0));const d=nt(15067115);for(const g of[-.06,0,.06]){const m=b(new F(.004,.004,l-.1,6),d,0,u+.052,g);m.rotation.z=Math.PI/2,r(m),r(b(new F(.012,.012,.07,10),nt(13751771),l/2-.05,u+.035,g))}for(const g of[-.12,.12])r(Os(new P(-l/2,u-.02,g),new P(-l/2-.25,u-.08,g*.6),.015,nt(12107462),!0));const _=b(new F(.08,.08,.02,32),nt(13751771),-l/2-.25,u-.08,0);_.rotation.x=Math.PI/2,r(_),r(b(new F(.003,.003,.45,6),d,-l/2-.33,u-.31,0)),r(b(new St(.02,.004,6,16),d,-l/2-.33,u-.55,0));break}case"kundts_tube":{const o=new vt;o.position.y=.55;const l=b(new F(.07,.07,1.6,40,1,!0),ht(16317180),0,0,0);l.rotation.z=Math.PI/2,o.add(l);const h=Mt(1024,48,(f,d,_)=>{f.fillStyle="#3730a3",f.fillRect(0,0,d,_),f.fillStyle="#ffffff",f.font="bold 22px Arial";for(let g=0;g<=60;g++){const m=8+g*16.8;f.fillRect(m,0,2,g%5===0?18:10),g%5===0&&g<60&&f.fillText(String(g/5+1),m+2,42)}});o.add(b(new Ot(1.55,.04),new G({map:h,side:Zt}),0,-.02,.0705));for(const f of[-.81,.81]){const d=b(new F(.08,.08,.04,32),tt(1120295),f,0,0);d.rotation.z=Math.PI/2,o.add(d)}const u=b(new F(.012,.012,1,12),nt(10265519),-1.2,0,0);u.rotation.z=Math.PI/2,o.add(u);for(let f=0;f<9;f++)o.add(b(new Lt(.03,10,6,0,Math.PI*2,0,Math.PI/2),new G({color:14071946,roughness:1}),-.65+f*.16,-.068,0));r(o);for(const f of[-.5,.5]){r(b(new F(.018,.018,.48,12),pt(),f,.24,0)),r(b(new F(.1,.12,.02,24),nt(7041664),f,.01,0));const d=b(new St(.075,.01,6,24,Math.PI*1.4),tt(1120295),f,.55,0);d.rotation.y=Math.PI/2,d.rotation.z=-Math.PI*.2,r(d)}break}case"van_de_graaff":{r(b(Ce(.9,.05,.5,.01),new G({color:13145434,roughness:.55}),.1,.025));const o=-.12;r(b(new Se(.14,.95,.1),ht(15067115),o,.55,0)),r(b(new Se(.06,.92,.004),new G({color:2042167,roughness:.9}),o,.55,.02)),r(b(Ce(.2,.08,.16,.02),tt(1120295),o-.02,.09,0)),r(b(new Lt(.26,48,32),pt(),o,1.17,0)),r(b(new Lt(.02,12,8),pt(),o,1.44,0));const l=b(Ce(.32,.2,.28,.02),new G({color:10265519,roughness:.45}),.3,.15,0);r(l);const h=Mt(256,160,(u,f,d)=>{u.fillStyle="#9ca3af",u.fillRect(0,0,f,d),u.fillStyle="#111827",u.font="bold 15px Arial",u.textAlign="center",u.fillText("VAN DE GRAAFF GENERATOR",f/2,26),u.fillStyle="#111827",u.fillRect(40,70,30,46),u.fillStyle="#dc2626",u.fillRect(180,70,34,46),u.fillStyle="#7f1d1d",u.beginPath(),u.arc(128,60,7,0,Math.PI*2),u.fill(),u.fillStyle="#111827",u.font="12px Arial",u.fillText("HIGH / LOW",55,135),u.fillText("ON / OFF",197,135)});r(b(new Ot(.3,.19),new G({map:h,roughness:.4}),.3,.15,.141));for(const u of[.12,.16]){const f=b(new F(.004,.004,.22,6),tt(1120295),.03,u,.02);f.rotation.z=Math.PI/2,r(f)}break}case"ripple_tank":{const f=tt(1120295);for(const O of[-.42,.42])for(const Z of[-.42,.42])r(b(new Se(.035,.5,.035),f,O,.5/2,Z));const d=tt(2042167);for(const O of[-.42,.42])r(b(new Se(2*.42+.07,.04,.05),d,0,.5,O));for(const O of[-.42,.42])r(b(new Se(.05,.04,2*.42+.07),d,O,.5,0));const _=ht(14412542),g=.5-.1;for(const O of[-.42,.42])r(b(new Ot(2*.42,g),_,0,.1+g/2,O));for(const O of[-.42,.42]){const Z=b(new Ot(.84,g),_,O,.1+g/2,0);Z.rotation.y=Math.PI/2,r(Z)}const m=b(new Ot(2*.42,2*.42),_,0,.1,0);m.rotation.x=-Math.PI/2,r(m);const p=b(new Ot(2*.42,2*.42),new G({color:3718648,roughness:.1,transparent:!0,opacity:.3,depthWrite:!1}),0,.25,0);p.rotation.x=-Math.PI/2,r(p);const x=tt(16317180),y=tt(16436245),M=b(new Se(.3,.16,.03),x,-.12,.1+.08,-.15);M.rotation.y=.5;const E=b(new Se(.3,.16,.03),x,.15,.1+.08,.2);E.rotation.y=-.7;const S=b(Ce(.22,.16,.08,.01),y,-.1,.1+.08,.14);S.rotation.y=.9,r(M,E,S);const T=nt(3621201),v=b(new F(.014,.014,.65,12),T,-.42,.5+.325,-.42);r(v);const A=new P(.22,1.15,0);r(Os(new P(-.42,1.15,-.42),A,.012,T));const I=b(new F(.08,.08,.14,24),Kt(2042167),A.x,1.1,0);r(I);const N=Os(new P(A.x,1.03,0),new P(A.x,.25,0),.008,nt(10265519));r(N),r(b(new Lt(.02,12,8),pt(),A.x,.25,0));break}case"metre_rule":{const o=new G({color:14066524,roughness:.6}),l=new G({map:Wo(),color:16113331,roughness:.55});r(b(new Se(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=b(Ce(.42,.3,.2,.03),Kt(1976635),0,.15),l=b(new Pn(.13,40,0,Math.PI),new G({map:$h("G","#1d4ed8")}),0,.12,.101),h=b(new Se(.006,.12,.004),bn(14427686),0,.18,.105);h.userData.role="needle",r(o,l,h,Cn(-.12,.3,0,14427686),Cn(.12,.3,0,1120295));break}case"tuning_fork":{const o=b(new Se(.03,.4,.03),pt(),-.04,.42),l=o.clone();l.position.x=.04;const h=b(new St(.04,.015,10,20,Math.PI),pt(),0,.22);h.rotation.z=Math.PI;const u=b(new F(.015,.015,.14,12),pt(),0,.12),f=b(Ce(.24,.05,.14,.01),Rn(),0,.025);r(o,l,h,u,f);break}case"pulley":{const o=b(new F(.15,.15,.05,40),nt(10265519),0,.9);o.rotation.x=Math.PI/2;const l=b(new St(.15,.015,10,40),tt(3621201),0,.9),h=b(Ce(.06,.12,.08,.01),nt(5395035),0,1.08),u=b(new F(.012,.012,1.1,12),nt(),-.3,.55),f=b(new F(.01,.01,.3,12),nt(),-.15,1.08);f.rotation.z=Math.PI/2;const d=b(Ce(.36,.03,.24,.01),Kt(2042167),-.3,.015),_=b(new F(.003,.003,.6,6),tt(16119284),.15,.6);r(o,l,h,u,f,d,_,b(new F(.05,.05,.1,20),Bn(),.15,.25));break}case"petri_dish":{r(b(new F(.22,.22,.05,48,1,!0),ht(),0,.025)),r(b(new F(.22,.22,.004,48),ht(),0,.002)),r(b(new F(.21,.21,.02,48),new G({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,h=.05+o%3*.04;r(b(new F(.02+o%2*.01,.02,.006,16),bn(16317180),Math.cos(l)*h,.025,Math.sin(l)*h))}break}case"hand_lens":{const o=b(new Lt(.14,32,32),ht(15988991),0,.03);o.scale.set(1,.16,1);const l=b(new St(.14,.018,12,48),tt(1120295),0,.03);l.rotation.x=Math.PI/2;const h=b(Ce(.3,.035,.05,.012),tt(1120295),.29,.03);r(o,l,h);break}case"scalpel":{const o=b(Ce(.32,.02,.035,.006),pt(),0,.012),l=new Zi;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const h=new le(new Ri(l,{depth:.003,bevelEnabled:!1}),pt());h.rotation.x=-Math.PI/2,h.position.set(.16,.02,.02),r(o,h);break}case"forceps":{for(const o of[-1,1]){const l=b(Ce(.36,.012,.03,.004),pt(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(b(Ce(.05,.016,.08,.006),pt(),-.18,.012));break}case"dissecting_tray":{r(b(Ce(.9,.08,.6,.03),Kt(2042167),0,.04)),r(b(new Se(.82,.01,.52),new G({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(b(new F(.006,.006,.06,8),pt(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(b(new F(.16,.16,.5,36,1,!0),ht(),0,.25)),r(b(new F(.17,.17,.06,36),tt(1013358),0,.53)),r(b(new F(.161,.161,.18,36,1,!0,-.6,1.2),new G({color:16777215,roughness:.8,side:Zt}),0,.3)),r(Yn(.16,.5,n.color||"#fef3c7",.6));break}case"soda_bottle":{const o=[new K(0,0),new K(.165,0),new K(.17,.03),new K(.17,.62),new K(.14,.72),new K(.07,.82),new K(.065,.95),new K(.08,.97),new K(.08,.99)];r(new le(new qn(o,40),ht(15399664)));const l=typeof n.cap_color=="string"?Number(n.cap_color.replace("#","0x")):1920728;r(b(new F(.082,.085,.07,24),tt(l),0,1.025)),r(b(new St(.083,.007,8,24),tt(l),0,.99).rotateX(Math.PI/2));const h=Mt(512,256,(u,f,d)=>{u.fillStyle="#dc2626",u.fillRect(0,0,f,d),u.fillStyle="#ffffff",u.fillRect(0,d*.38,f,d*.06),u.fillRect(0,d*.56,f,d*.06),u.font="bold 48px sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText("SODA",f/2,d*.47)});r(b(new F(.173,.173,.28,40,1,!0),new G({map:h,roughness:.6,side:Zt}),0,.33));break}case"potted_plant":{const o=b(new F(.22,.16,.3,32),Kt(11817737),0,.15),l=b(new F(.2,.2,.02,32),bn(4139549),0,.29),h=b(new F(.015,.02,.5,10),bn(1409085),0,.54);r(o,l,h);const u=new G({color:2278750,roughness:.5,side:Zt});for(let f=0;f<6;f++){const d=b(new Lt(.09,16,10),u,0,.42+f*.07);d.scale.set(1.4,.15,.6),d.rotation.y=f*2.1,d.position.x=Math.cos(f*2.1)*.08,d.position.z=-Math.sin(f*2.1)*.08,r(d)}break}case"soil_sieve":{const o=b(new F(.4,.4,.14,48,1,!0),new G({color:10576391,roughness:.6,side:Zt}),0,.07),l=Mt(256,256,(u,f,d)=>{u.clearRect(0,0,f,d),u.strokeStyle="#6b7280",u.lineWidth=2;for(let _=0;_<f;_+=8)u.beginPath(),u.moveTo(_,0),u.lineTo(_,d),u.moveTo(0,_),u.lineTo(f,_),u.stroke()}),h=b(new Pn(.39,48),new G({map:l,transparent:!0,metalness:.6,side:Zt}),0,.03);h.rotation.x=-Math.PI/2,r(o,h);for(let u=0;u<14;u++){const f=u*2.4,d=u%4*.08;r(b(new lc(.025+u%3*.01),bn(7893356),Math.cos(f)*d,.05,Math.sin(f)*d))}break}case"rain_gauge":{const o=b(new F(.2,.06,.16,36,1,!0),nt(13358561),0,1),l=b(new F(.2,.2,.08,36,1,!0),nt(13358561),0,1.12),h=b(new F(.1,.1,.9,32,1,!0),ht(),0,.47),u=b(new F(.03,.01,.1,12),nt(5395035),0,.01);r(o,l,h,u,Sa(.1,.1,.75,5),Yn(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=b(new F(.22,.25,.42,36),Kt(1483594),0,.21),l=b(new F(.025,.04,.6,16),Kt(1483594),.4,.4);l.rotation.z=-.95;const h=b(new F(.07,.04,.06,20),nt(10265519),.64,.58);h.rotation.z=-.95;const u=b(new St(.18,.022,10,32,Math.PI),Kt(1409085),0,.42);r(o,l,h,u,Yn(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(b(Ce(.9,.12,.55,.02),tt(1120295),0,.06)),r(b(new Se(.84,.02,.49),bn(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const h=-.35+o*.14,u=-.15+l*.15;r(b(new F(.004,.004,.08,6),bn(1483594),h,.16,u));const f=b(new Lt(.022,10,8),bn(2278750),h,.2,u);f.scale.set(1.6,.3,.8),r(f)}break}case"garden_trowel":{const o=b(new Lt(.12,24,12,0,Math.PI,0,Math.PI/2),nt(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=b(new F(.012,.012,.1,10),nt(),0,.03);l.rotation.z=Math.PI/2;const h=b(new F(.03,.03,.24,16),Rn(),-.17,.03);h.rotation.z=Math.PI/2,r(o,l,h);break}case"hand_hoe":{const o=new vt,l=new G({color:13213802,roughness:.6}),h=new G({color:1842980,roughness:.45,metalness:.6}),u=b(new F(.03,.034,1.6,20),l,.85,0);u.rotation.z=Math.PI/2;const f=b(new F(.05,.05,.14,24),h,.05,0);f.rotation.z=Math.PI/2;const d=b(Ce(.05,.14,.05,.01),h,0,-.09),_=new Zi;_.moveTo(-.07,0),_.lineTo(.07,0),_.lineTo(.14,-.34),_.lineTo(-.14,-.34),_.closePath();const g=new Ri(_,{depth:.014,bevelEnabled:!1}),m=new le(g,new G({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const p=b(new Se(.016,.04,.28),new G({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(u,f,d,m,p),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new vt,l=new G({color:14729103,roughness:.55}),h=new G({color:2303531,roughness:.5,metalness:.6}),u=b(new F(.045,.036,1.3,20),l,.72,0);u.rotation.z=Math.PI/2;const f=b(Ce(.16,.11,.11,.012),h,.06,0),d=b(Ce(.03,.09,.08,.006),pt(),.16,0),_=b(Ce(.05,.05,.24,.01),h,0,-.07);o.add(u,f,d,_);for(const g of[-.09,0,.09]){const m=b(Ce(.04,.5,.025,.008),h,0,-.33,g),p=b(new kn(.016,.07,4),new G({color:11844032,roughness:.25,metalness:1}),0,-.61,g);p.rotation.z=Math.PI,o.add(m,p)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=b(new F(.02,.02,1.2,12),nt(7041664),0,.75),l=b(new F(.025,.025,.5,12),nt(7041664),0,1.35);l.rotation.z=Math.PI/2;const h=new le(new Zn(new Yo(.3,.05,4),200,.012,6,!1),nt(10265519));h.position.y=.15,r(o,l,h,b(new F(.25,.25,.04,32),bn(5978660),0,.02));break}case"soil_sample":{r(b(Ce(.7,.08,.45,.02),tt(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,h)=>{const u=b(new Lt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new G({color:l,roughness:1}),-.22+h*.22,.08);u.scale.y=.55,r(u)});break}case"safety_goggles":{for(const o of[-1,1]){const l=b(new Lt(.085,24,16),new G({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const h=b(new St(.085,.014,10,32),tt(1013358),o*.1,.08);r(l,h)}r(b(new St(.2,.012,8,40,Math.PI),tt(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=b(new F(.01,.01,.5,10),nt(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(b(new St(.03,.008,8,20),nt(7041664),.26,.015));break}case"heat_proof_mat":{r(b(Ce(.8,.03,.8,.01),new G({color:15197668,roughness:.95}),0,.015));break}case"cell_holder":{r(b(Ce(.85,.15,.35,.02),tt(2042167),0,.075)),[-.18,.18].forEach(o=>{const l=b(new F(.078,.078,.31,32),new G({color:14032678,roughness:.35}),o,.17);l.rotation.z=Math.PI/2;const h=b(new F(.03,.03,.03,16),pt(),o+.17,.17);h.rotation.z=Math.PI/2,r(l,h)}),r(Cn(-.39,.15,0,1120295),Cn(.39,.15,0,14427686));break}case"constantan_wire":{const o=b(new F(.16,.16,.12,40),new G({color:12106948,metalness:.9,roughness:.35}),0,.13);o.rotation.x=Math.PI/2;const l=b(new F(.22,.22,.02,40),tt(2450411),0,.22,.07);l.rotation.x=Math.PI/2;const h=l.clone();h.position.z=-.07;const u=b(new F(.004,.004,.4,6),nt(12633292),.32,.02,0);u.rotation.z=Math.PI/2,r(o,l,h,u),o.position.y=.22;break}case"crocodile_clip":{[[-.09,14427686],[.09,1120295]].forEach(([o,l])=>{const h=b(new F(.03,.036,.16,16),tt(l),0,.04,o);h.rotation.z=Math.PI/2;const u=b(new Se(.16,.012,.04),nt(),.15,.06,o);u.rotation.z=-.15;const f=b(new Se(.16,.012,.04),nt(),.15,.025,o);r(h,u,f)});break}case"sellotape":{const o=b(new St(.13,.05,16,40),new G({color:16117968,transparent:!0,opacity:.75,roughness:.2}),0,.05);o.rotation.x=Math.PI/2,o.scale.z=.8;const l=b(new F(.085,.085,.1,32,1,!0),tt(14078929),0,.05);r(o,l);break}case"torch_bulb":{r(b(Ce(.5,.07,.22,.015),Rn(),0,.035)),r(b(new F(.045,.05,.08,24),Bn(),0,.11));const o=b(new Lt(.06,24,16),ht(),0,.2);o.scale.y=1.3,r(o,Cn(-.19,.07,0,1120295),Cn(.19,.07,0,1120295));break}default:r(b(Ce(.3,.3,.3,.03),bn(10265519),0,.15))}s.traverse(o=>{o instanceof le&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new In;s.children.forEach(o=>{o instanceof wn||a.expandByObject(o)});const c=wa(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function Kh(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new le(new Zn(new uc(t,s,n),32,.014,8,!1),new G({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const Ea=[{key:"physics",label:"Physics"},{key:"chemistry",label:"Chemistry"},{key:"biology",label:"Biology"},{key:"agriculture",label:"Agriculture"},{key:"general",label:"General"}],G1=["physics","chemistry","biology","agriculture"];function W1(i){const e=i.length;if(e===0)return[];if(e>=Ea.length)return Ea.map((r,a)=>({cabinet:a,subject:r,rows:i[a].rows.map((c,o)=>o)}));const t=[];Ea.slice(0,e-1).forEach((r,a)=>t.push({cabinet:a,subject:r,rows:i[a].rows.map((c,o)=>o)}));const n=Ea.slice(e-1),s=i[e-1].rows.length;return n.forEach((r,a)=>{const c=Math.floor(a*s/n.length),o=Math.floor((a+1)*s/n.length);t.push({cabinet:e-1,subject:r,rows:Array.from({length:Math.max(1,o-c)},(l,h)=>Math.min(s-1,c+h))})}),t}function X1(i,e,t,n){const s=n,r=[],a=new Map,c=new Map,o=new P(0,1,0),l=(_,g,m,p)=>new P(g,m,p).applyAxisAngle(o,_.rotY).add(_.offset),h=_=>{i.add(_),r.push(_)},u=t.filter(_=>_.id>0&&_.is_active!==!1),f=_=>G1.includes(_.category)?_.category:"general",d=W1(e.cabinets);e.cabinets.forEach((_,g)=>{const m=d.filter(x=>x.cabinet===g).map(x=>x.subject.label);if(!m.length)return;const p=q1(m.join(" & "),Math.min(.75*s,(_.maxX-_.minX)*.7),s);p.position.copy(l(_,_.cx,_.topY,_.corniceFrontZ)),p.rotation.y=_.rotY,h(p)});for(const _ of d){const g=e.cabinets[_.cabinet],m=Math.max(1,g.bays),p=(g.maxX-g.minX)/m;_.rows.forEach(T=>{const v=Y1(_.subject.label,c,s);v.position.copy(l(g,g.minX+p*.25,g.rows[T]-.017*s,g.frontZ+.002*s)),v.rotation.y=g.rotY,h(v)});const x=u.filter(T=>f(T)===_.subject.key).sort((T,v)=>T.display_name.localeCompare(v.display_name));if(!x.length)continue;let y=Math.max(1,Math.ceil(4/m));for(;Math.ceil(x.length/(y*m))>_.rows.length;)y++;const M=y*m,E=m>1?.03*s:0,S=(p-E*2)/y;x.forEach((T,v)=>{const A=_.rows[Math.floor(v/M)],I=v%M,N=Math.floor(I/y),O=g.rows[A],Z=Wl(T.object_type,`shelf:${T.object_type}`,T.display_name,T.default_props||{}),J=5/s,V=new In;Z.children.forEach(ce=>{ce instanceof wn||V.expandByObject(ce)});const q=V.getSize(new P).divideScalar(J),X=V.getCenter(new P).divideScalar(J),ie=Math.min(1,S*.84/Math.max(q.x,.01),g.rowHeight*.8/Math.max(q.y,.01),g.depth*.9/Math.max(q.z,.01));Z.scale.setScalar(ie/J);const oe=g.minX+N*p+E+S*(I%y+.5),de=new P(oe,O-V.min.y/J*ie,g.z).sub(new P(X.x*ie,0,X.z*ie));Z.position.copy(l(g,de.x,de.y,de.z)),Z.rotation.y=g.rotY,Z.children.forEach(ce=>{ce.userData.role==="label"&&(ce.scale.set(.72/ie,.158/ie,1),ce.position.y=V.max.y+.2/ie,ce.visible=!1)}),Z.traverse(ce=>{ce instanceof le&&(ce.castShadow=!1)}),Z.userData.shelfType=T.object_type,h(Z),a.set(T.object_type,Z)})}return{items:a,dispose:()=>{r.forEach(_=>{i.remove(_),_.traverse(g=>{var m;(g instanceof le||g instanceof wn)&&((m=g.geometry)==null||m.dispose(),(Array.isArray(g.material)?g.material:[g.material]).forEach(x=>{var y;c.has(x.name)||(y=x.map)==null||y.dispose(),x.dispose()}))})}),c.forEach(_=>_.dispose()),r.length=0,a.clear()}}}function Y1(i,e,t){let n=e.get(i);if(!n){const r=document.createElement("canvas");r.width=512,r.height=64;const a=r.getContext("2d");a.fillStyle="#f8fafc",a.fillRect(0,0,512,64),a.strokeStyle="#94a3b8",a.lineWidth=4,a.strokeRect(2,2,508,60),a.fillStyle="#1e293b",a.font="bold 46px Arial, sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText(i.toUpperCase().split("").join(" "),256,35),n=new Qs(r),n.colorSpace=cn,n.anisotropy=8,e.set(i,n)}const s=new G({map:n,roughness:.6});return s.name=i,new le(new Ot(.26*t,.034*t),s)}function q1(i,e,t){const n=.13*t,s=new vt,r=new le(new Se(e,n,.02*t),new G({color:5977112,roughness:.55}));r.position.set(0,n/2,-.008*t),s.add(r);const a=document.createElement("canvas");a.width=1024,a.height=200;const c=a.getContext("2d"),o=c.createLinearGradient(0,0,0,200);o.addColorStop(0,"#f8e3a1"),o.addColorStop(.45,"#d9a842"),o.addColorStop(1,"#a8781f"),c.fillStyle=o,c.beginPath(),c.roundRect(4,4,1016,192,22),c.fill(),c.strokeStyle="rgba(70,45,5,0.85)",c.lineWidth=6,c.beginPath(),c.roundRect(18,18,988,164,14),c.stroke(),c.lineWidth=2,c.beginPath(),c.roundRect(30,30,964,140,10),c.stroke();for(const d of[62,962]){const _=c.createRadialGradient(d-4,96,2,d,100,16);_.addColorStop(0,"#fff7d6"),_.addColorStop(1,"#7a5a17"),c.fillStyle=_,c.beginPath(),c.arc(d,100,15,0,Math.PI*2),c.fill(),c.strokeStyle="#5a3f0c",c.lineWidth=3,c.beginPath(),c.moveTo(d-9,100),c.lineTo(d+9,100),c.stroke()}c.textAlign="center",c.textBaseline="middle";let l=96;c.font=`bold ${l}px Georgia, serif`;const h=i.toUpperCase().split("").join(" ");for(;c.measureText(h).width>820&&l>40;)l-=4,c.font=`bold ${l}px Georgia, serif`;c.fillStyle="rgba(255,248,220,0.7)",c.fillText(h,512,104),c.fillStyle="#3b2606",c.fillText(h,512,101);const u=new Qs(a);u.colorSpace=cn,u.anisotropy=8;const f=new le(new Ot(e*.94,n*.8),new G({map:u,roughness:.3,metalness:.55,transparent:!0}));return f.position.set(0,n/2,.0035*t),s.add(f),s}const Ju=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],Z1=Ju.flat(),$1=i=>Z1.find(e=>e.id===i);function K1(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const J1=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",j1={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},Q1={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},ev={class:"space-y-1"},tv=["onClick"],nv={class:"truncate"},iv=["aria-label"],sv={class:"flex items-start justify-between gap-3 mb-3"},rv={class:"min-w-0"},av={class:"text-sm font-bold text-gray-900 dark:text-white truncate"},ov={class:"space-y-1.5 mb-4"},lv={class:"space-y-1.5"},cv={class:"min-w-0"},hv={class:"text-xs font-semibold text-gray-800 dark:text-gray-100"},uv={class:"text-[11px] text-gray-500 dark:text-gray-400"},fv=["onClick"],dv={key:4,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},pv={class:"flex items-center justify-between gap-2 mb-2"},mv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},gv={class:"flex flex-wrap gap-1.5"},_v=["onClick"],vv={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},xv={class:"flex items-center gap-2"},yv={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},Mv={class:"text-xs font-medium text-gray-400 ml-1"},bv={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Sv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},wv=["max"],Ev={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Tv={class:"flex flex-wrap gap-1.5"},Av=["onClick"],Rv={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Cv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},Pv={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},Iv={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},Dv={class:"flex gap-1.5"},Lv=["onClick"],Nv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Uv=["value"],Fv={class:"flex items-center justify-between"},Ov={class:"flex gap-1.5"},Bv={key:0,class:"pt-1"},kv={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},zv={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},Vv={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Hv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Gv={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},Wv={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Xv={class:"flex flex-wrap gap-1.5"},Yv={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},qv={class:"text-center"},Zv={class:"flex items-center gap-2 flex-shrink-0"},$v={key:6,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},Kv={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},Jv={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},jv=["max"],Qv={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},ex={key:7,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},tx={class:"flex items-start justify-between gap-2"},nx={class:"text-xs text-gray-700 dark:text-gray-200"},ix={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},sx=1.3,rx=.95,ax=.9,qo=5,px=sf({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean},wallShelves:{type:Boolean},benchLength:{},dirtyKeys:{},sideBenches:{type:Boolean},forcePlaced:{type:Boolean}},emits:["takeChemical","putBack","pickApparatus","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=Ct(null),a=Ct(!1);let c,o,l,h;const u=new Map,f=new h0,d=new K,_=new Ci(new P(0,1,0),0),g=Ct(null),m=Ct(null),p=Ct(null),x=Ct(null);let y=!1,M=0;const E={move:"Carry",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",wash:"Wash",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},S=C=>{if(ce.value==="stopwatch"){if(C==="switch_on")return"Start";if(C==="switch_off")return"Stop";if(C==="measure")return"Read Time"}if(ce.value==="microscope"){if(C==="switch_on")return"Light On";if(C==="switch_off")return"Light Off";if(C==="inspect")return"Observe"}return E[C]||C},T=()=>new Map(n.objectCatalog.map(C=>[C.object_type,C])),v=Ct([]),A=Ct(""),I=Ct(!1),N={heat:"Place the selected object over a lit flame. Click the object you want heated next.",connect:"Join the selected object to another with a wire or lead.",pour:"Pour from the selected container into another. Choose how much to pour.",measure:"Take a reading, such as length, temperature or current.",switch_on:"Turn it on, so it starts working.",switch_off:"Turn it off again.",rotate:"Turn the object to a new angle.",move:"Pick it up and carry it to a new place. Carry glassware to a sink basin to wash it.",wash:"Rinse glassware under the running tap in a sink basin.",zoom:"Get a closer view of the object.",inspect:"Look at the object closely and read what it is for."},O={bunsen_burner:["Switch the burner on, then heat a beaker of water over the flame.","Heat a test tube of water over the flame and read its temperature."],beaker:["Pour water into the beaker, then place it over a lit Bunsen burner to heat it.","Carry the beaker to a sink, turn on the tap and wash it."],conical_flask:["Pour water into the conical flask, then heat it over the flame.","Measure the temperature of the water in the flask while it heats.","Carry the flask to a sink, turn on the tap and wash it before pouring in a chemical."],round_bottom_flask:["Pour water into the flask and heat it over a lit burner."],test_tube:["Pour a little water into the test tube and heat it over the flame."],measuring_cylinder:["Pour water into the measuring cylinder and read the volume."],thermometer:["Measure the temperature of a heated beaker of water."],battery:["Connect a bulb to the battery with wire, then switch the battery on."],bulb:["Connect the bulb to a battery and switch the battery on to light it."],switch:["Connect the switch in series with a bulb and a battery, then switch it on."],ammeter:["Connect the ammeter in series in a circuit and measure the current."],voltmeter:["Connect the voltmeter across a bulb and measure the voltage."],ruler:["Measure the length of an object against the ruler."],metre_rule:["Measure the length of an object against the metre rule."]},Z=Ic(()=>{var D;const C=(D=n.sceneObjects.find(U=>U.key===g.value))==null?void 0:D.object_type;return C?O[C]??[]:[]}),J=C=>{I.value=!1,ze(C)},V=[{x:-32.9,z:-1.4,floorY:-1},{x:32.9,z:-1.4,floorY:-1}],q=["beaker","conical_flask","amber_conical_flask","round_bottom_flask","test_tube","measuring_cylinder"];function X(C){return V.findIndex(D=>Math.abs(C.x-D.x)<=sx&&Math.abs(C.z-D.z)<=rx)}function ie(){var U;if(!g.value)return!1;const C=(U=n.sceneObjects.find(z=>z.key===g.value))==null?void 0:U.object_type,D=u.get(g.value);return!!C&&q.includes(C)&&!!D&&X(D.position)>=0}function oe(){var C;if(g.value){if(!((C=Ke==null?void 0:Ke.taps)!=null&&C.anyOn())){Ee.value="Turn on a sink tap first, then wash the glassware.",setTimeout(()=>{Ee.value=null},3500);return}s("action",{objectKey:g.value,action:"wash",value:"sink"})}}function de(){const C=n.dirtyKeys??[];u.forEach((D,U)=>{var W;const z=D.children.find(pe=>pe.userData.dirtyLabel);if(C.includes(U)&&!z){const pe=new In;D.children.forEach(it=>{it instanceof wn||pe.expandByObject(it)});const Ie=$u("Dirty",13);Ie.userData.dirtyLabel=!0,Ie.position.set(0,pe.max.y+.3,0),D.add(Ie)}else!C.includes(U)&&z&&(D.remove(z),(W=z.material.map)==null||W.dispose(),z.material.dispose())})}Bs(()=>[n.dirtyKeys,n.sceneObjects],de,{deep:!0});const ce=Ct(null),ye=Ct(null),We=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],ot=["battery","dry_cell","accumulator"],lt=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],re=new Map,Me=new Map,_e=new Map,He=new Map,Je=Ct([...n.connections||[]]),Ue=Ct(null),rt=Ct(null),se=Ct(""),H=Ct(0),j=Ct(100),te=Ct(null),me=Ct(!1),xe=Ct(null),Le=Ct(null),Ee=Ct(null),Ge=new Map,qe=new Map,B=new Map,dt=Ct(50),ct=Ct(40),L=Ct("very_blurred"),w=Ct(!1),$=Ct(!1),Q=new Map,he=new Map,we=new Map,Te=Ct(0),ue=Ct(0),ge=Ct(!1);let Re=[];const Qe={very_blurred:10,blurred:5,almost_focused:2,focused:0};function Ne(C){Le.value=C,te.value="protractor",m.value="measure"}const be=Ct(null),Ze=Ct([]);function st(C){const D=T().get(C.object_type),U={...(D==null?void 0:D.default_props)||{},...C.props||{}},z=Wl(C.object_type,C.key,U.display_name||(D==null?void 0:D.display_name)||C.object_type,U);if(z.position.set(C.position.x,C.position.y,C.position.z),C.rotation&&(z.rotation.y=C.rotation.y),o.add(z),u.set(C.key,z),We.includes(C.object_type)){const W=Pe(C.object_type,U);re.set(C.key,W),fe(C.key,W/Number(U.capacity_ml??250))}ot.includes(C.object_type)&&Me.set(C.key,Number(U.voltage??6))}function mt(C){if(n.readOnly)return;const D=Ze.value.findIndex(z=>z.key===C);if(D===-1)return;const U=Ze.value[D];st(U),Ze.value.splice(D,1),s("action",{objectKey:C,action:"move",value:C})}function k(C){const D=n.sceneObjects.find(z=>z.key===C);if(!D)return{};const U=T().get(D.object_type);return{...(U==null?void 0:U.default_props)||{},...D.props||{}}}function Pe(C,D){return D.current_volume!==void 0?Number(D.current_volume):lt.includes(C)?Number(D.capacity_ml??50):0}function fe(C,D){const U=u.get(C);if(!U)return;const z=Math.max(.001,Math.min(1,D));U.traverse(W=>{if(W instanceof le&&W.userData.role==="liquid"){const pe=W.userData.maxFillHeight;W.scale.y=z,W.position.y=pe*z/2}})}function De(C){const D=new Set([C]),U=[C];for(;U.length;){const z=U.shift();Je.value.forEach(W=>{W.from===z&&!D.has(W.to)&&(D.add(W.to),U.push(W.to)),W.to===z&&!D.has(W.from)&&(D.add(W.from),U.push(W.from))})}return D}function Be(C){const D=n.sceneObjects.find(tn=>ot.includes(tn.object_type)),U=n.sceneObjects.find(tn=>tn.object_type==="switch"),z=n.sceneObjects.find(tn=>tn.object_type==="resistor"),W=n.sceneObjects.find(tn=>tn.key===C);if(!W)return{value:0,reason:null};if(!D||!U||!z)return{value:0,reason:"The circuit is incomplete. Check your connections."};const pe=De(D.key),Ie=pe.has(U.key),it=pe.has(z.key),ft=pe.has(C),_t=_e.get(U.key)==="on";if(Ie&&_t&&!it)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!Ie||!it)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((_e.get(D.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!_t)return{value:0,reason:"Close the switch before taking the reading."};if(!ft)return W.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:W.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const Nt=Me.get(D.key)??k(D.key).voltage??6,at=k(z.key).resistance_ohm??10,Ut=Nt/at;return W.object_type==="ammeter"?{value:Math.round(Ut*100)/100,reason:null}:W.object_type==="voltmeter"?{value:Nt,reason:null}:{value:0,reason:null}}function ve(C){const D=He.get(C);if(!D)return 25;const U=(Date.now()-D)/1e3;return Math.min(100,Math.round(25+U*3.5))}function je(C,D){const U=u.get(C),z=u.get(D);if(!U||!z)return{ok:!1};if(U.position.distanceTo(z.position)>ax)return{ok:!1};const W=he.has(D)?Number(k(D).natural_length_cm??15)+(he.get(D)??0):k(D).length_cm??k(D).natural_length_cm??10,pe=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((W+pe)*10)/10}}function Xe(C){const D=Ge.get(C);if(!D)return"very_blurred";const U=Number(k(D).optimal_focus??50),z=Number(k(D).focus_tolerance??6),W=B.get(C)??40,pe=z*(40/W),Ie=qe.get(C)??0,it=Math.abs(Ie-U);return it<=pe?"focused":it<=pe*2?"almost_focused":it<=pe*4?"blurred":"very_blurred"}function Vt(C){g.value===C&&(dt.value=qe.get(C)??50,ct.value=B.get(C)??40,w.value=_e.get(C)==="on",$.value=Ge.has(C),L.value=Xe(C))}function Wt(C){g.value&&(B.set(g.value,C),s("action",{objectKey:g.value,action:"select_objective",value:String(C)}),Vt(g.value))}function Hn(C){g.value&&(qe.set(g.value,C),s("action",{objectKey:g.value,action:"focus_coarse",value:String(Math.round(C))}),Vt(g.value))}function Dn(C){if(!g.value)return;const D=g.value,U=Math.max(0,Math.min(100,(qe.get(D)??50)+C));qe.set(D,U),s("action",{objectKey:D,action:"focus_fine",value:String(U)}),Vt(D)}function Fr(C){const U=[...Q.get(C)??new Set].reduce((Nt,at)=>Nt+Number(k(at).mass_g??0),0),z=Number(k(C).spring_constant_n_per_m??40),pe=U/1e3*9.8/z*100,Ie=Number(k(C).max_safe_extension_cm??12),it=we.get(C)??0,ft=pe>Ie;ft&&it===0&&we.set(C,(pe-Ie)*.3);const _t=pe+(we.get(C)??0);return he.set(C,Math.round(_t*100)/100),Ka(C,_t),g.value===C&&(ue.value=U,Te.value=Math.round(_t*100)/100,ge.value=ft),{totalMassG:U,exceeded:ft}}function Ka(C,D){const U=u.get(C);U&&U.traverse(z=>{if(z instanceof le&&z.userData.role==="spring_body"){const W=z.userData.naturalLengthUnits,pe=z.userData.maxLengthUnits,Ie=Math.min(pe,W+Math.max(0,D)*.05);z.scale.y=Ie/pe,z.position.y=.85-pe*z.scale.y/2}if(z.userData.role==="spring_hanger"){const W=[...U.children].find(pe=>pe.userData.role==="spring_body");W&&(z.position.y=.85-W.userData.maxLengthUnits*W.scale.y)}})}function tr(C){return new P(Math.sin(C),0,Math.cos(C))}function ds(C,D){return C.clone().sub(D.clone().multiplyScalar(2*C.dot(D)))}function Or(C,D,U,z){let W=D.clone(),pe=-W.dot(C);pe<0&&(pe=-pe,W=W.clone().negate());const Ie=U/z,it=Ie*Ie*(1-pe*pe);if(it>1)return null;const ft=Math.sqrt(1-it);return C.clone().multiplyScalar(Ie).add(W.clone().multiplyScalar(Ie*pe-ft))}function nr(C,D){const U=u.get(C),z=u.get(D);if(!U||!z)return null;const W=U.position.clone(),pe=tr(U.rotation.y),Ie=tr(z.rotation.y),it=pe.dot(Ie);if(Math.abs(it)<.001)return null;const ft=z.position.clone().sub(W).dot(Ie)/it;if(ft<=.05)return null;const _t=W.clone().add(pe.clone().multiplyScalar(ft));return _t.distanceTo(z.position)>.35?null:{point:_t,normal:Ie,incidentDir:pe}}function Br(){Re.forEach(C=>{o.remove(C),C instanceof le&&(C.geometry.dispose(),C.material.dispose())}),Re=[]}function Ln(C,D,U){const z=C.clone().add(D).multiplyScalar(.5),W=Math.max(.01,C.distanceTo(D)),pe=new le(new F(.006,.006,W,8),new G({color:U,emissive:U,emissiveIntensity:.4,roughness:.4}));pe.position.copy(z);const Ie=D.clone().sub(C).normalize();return pe.quaternion.copy(new Bi().setFromUnitVectors(new P(0,1,0),Ie)),pe}function zi(){Br();const C=n.sceneObjects.find(ft=>ft.object_type==="ray_box"),D=n.sceneObjects.find(ft=>ft.object_type==="mirror"),U=n.sceneObjects.find(ft=>ft.object_type==="glass_block"),z=D||U;if(!C||!z||_e.get(C.key)!=="on")return;const W=nr(C.key,z.key);if(!W)return;const pe=u.get(C.key),Ie=Ln(pe.position,W.point,16498468),it=Ln(W.point.clone().sub(W.normal.clone().multiplyScalar(.01)),W.point.clone().add(W.normal.clone().multiplyScalar(.4)),9741240);if(o.add(Ie,it),Re.push(Ie,it),D){const ft=ds(W.incidentDir,W.normal),_t=Ln(W.point,W.point.clone().add(ft.multiplyScalar(1.2)),16498468);o.add(_t),Re.push(_t)}else if(U){const ft=Number(k(U.key).refractive_index??1.5),_t=Or(W.incidentDir,W.normal,1,ft);if(_t){const Nt=W.point.clone().add(_t.clone().multiplyScalar(.4)),at=Ln(W.point,Nt,6333946),Ut=Ln(Nt,Nt.clone().add(W.incidentDir.clone().multiplyScalar(1)),16498468);o.add(at,Ut),Re.push(at,Ut)}}}function kr(C,D,U){const z=n.sceneObjects.find(Nt=>Nt.object_type==="ray_box");if(!z)return{ok:!1};const W=nr(z.key,D);if(!W)return{ok:!1};const pe=u.get(C);if(!pe||pe.position.distanceTo(W.point)>.4)return{ok:!1};let Ie;if(U==="incidence")Ie=W.incidentDir.clone().negate();else{const Nt=n.sceneObjects.find(at=>at.key===D);if((Nt==null?void 0:Nt.object_type)==="glass_block"){const at=Number(k(D).refractive_index??1.5),Ut=Or(W.incidentDir,W.normal,1,at);if(!Ut)return{ok:!1};Ie=Ut}else Ie=ds(W.incidentDir,W.normal)}const it=Math.abs(Ie.normalize().dot(W.normal)),ft=Math.acos(Math.min(1,Math.max(-1,it)))*180/Math.PI,_t=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((ft+_t)*10)/10}}const Vi=new Map,Mi=new Map;function ir(C){const D=u.get(C);if(!D)return;const U=Vi.get(C),z=U?Number(k(U).mass_g??0):0;D.traverse(W=>{var pe;if(W instanceof wn&&W.userData.role==="balance_display"){const Ie=W.material;(pe=Ie.map)==null||pe.dispose(),Ie.map=Wa(`${z.toFixed(1)} g`),Ie.needsUpdate=!0}})}const Gn=new Map,ps=new Map,ms=new Map,zr=Ct("00:00.0");function Vr(C){const D=Math.max(0,C)/1e3,U=Math.floor(D/60).toString().padStart(2,"0"),z=(D%60).toFixed(1).padStart(4,"0");return`${U}:${z}`}function sr(C){const D=ms.get(C)??0;return Gn.get(C)?D+(Date.now()-(ps.get(C)??Date.now())):D}function rr(C){const D=u.get(C),U=sr(C);g.value===C&&(zr.value=Vr(U)),D&&D.traverse(z=>{var W;if(z instanceof wn&&z.userData.role==="stopwatch_display"){const pe=z.material;(W=pe.map)==null||W.dispose(),pe.map=Wa(Vr(U)),pe.needsUpdate=!0}})}function R(C){Gn.set(C,!1),ms.set(C,0),ps.delete(C),rr(C)}function Y(C){u.forEach((D,U)=>{D.traverse(z=>{if(!(z instanceof le)||z.userData.role==="flame"||z.userData.role==="led")return;(Array.isArray(z.material)?z.material:[z.material]).forEach(pe=>{pe instanceof G&&(pe.emissive.setHex(U===C?2282478:0),pe.emissiveIntensity=U===C?.3:0)})})})}function ae(C){var z;g.value=C,x.value=null,p.value=null;const D=n.sceneObjects.find(W=>W.key===C),U=D?T().get(D.object_type):null;v.value=(U==null?void 0:U.supported_actions)??[],A.value=((z=D==null?void 0:D.props)==null?void 0:z.display_name)??(U==null?void 0:U.display_name)??C,ce.value=(D==null?void 0:D.object_type)??null,ye.value=(D==null?void 0:D.object_type)==="battery"?Me.get(C)??k(C).voltage??6:null,(D==null?void 0:D.object_type)==="microscope"&&Vt(C),(D==null?void 0:D.object_type)==="spring"&&Fr(C),Y(C)}function ee(){g.value=null,x.value=null,Ue.value=null,ce.value=null,Y(null)}function ne(C){if(!g.value)return;ye.value=C,Me.set(g.value,C);const D=u.get(g.value);D&&D.traverse(U=>{var z;if(U instanceof wn&&U.userData.role==="voltage"){const W=U.material;(z=W.map)==null||z.dispose(),W.map=Ku(C),W.needsUpdate=!0}})}function Fe(C){const D=n.sceneObjects.find(z=>z.key===C);if(!D)return;const U=D.object_type;if(me.value=!1,xe.value=C,We.includes(U)){Ue.value="readonly",se.value="ml",rt.value=Math.round(re.get(C)??0),x.value=C;return}if(U==="ammeter"||U==="voltmeter"){const z=Be(C);z.reason&&(Ee.value=z.reason,setTimeout(()=>{Ee.value=null},4e3)),Ue.value="readonly",se.value=U==="ammeter"?"A":"V",rt.value=z.value,x.value=C,me.value=!!z.reason&&z.reason.includes("Short circuit");return}if(U==="balance"){Ue.value="readonly",se.value="g";const z=Vi.get(C);rt.value=z?Number(k(z).mass_g??0):0,x.value=C;return}if(U==="stopwatch"){Ue.value="readonly",se.value="s",rt.value=Math.round(sr(C)/100)/10,x.value=C;return}if(U==="spring"){Ue.value="readonly",se.value="cm";const z=Number(k(C).natural_length_cm??15);rt.value=Math.round((z+(he.get(C)??0))*10)/10,x.value=C,xe.value=C;return}if(U==="protractor"){Le.value="incidence",te.value="protractor",m.value="measure";return}if(U==="ruler"||U==="metre_rule"||U==="thermometer"){te.value=U==="thermometer"?"thermometer":"ruler",m.value="measure";return}Ue.value="slider",se.value="ml",j.value=Number(k(C).capacity_ml??100),H.value=Math.round(j.value/2),x.value=C}function ze(C){var D;if(g.value&&!n.readOnly&&!(C==="focus_coarse"||C==="focus_fine"||C==="select_objective")){if(C==="inspect"){const U=n.sceneObjects.find(it=>it.key===g.value),z=U?T().get(U.object_type):null;let W=(z==null?void 0:z.description)||"No further detail available.";const pe=(D=U==null?void 0:U.props)!=null&&D.chemical_id?$1(U.props.chemical_id):null;if(pe&&U){const it=pe.hazard?` Hazard: ${pe.hazard} - handle with care and wear goggles.`:"",ft=pe.state==="liquid"?` About ${Math.round(re.get(U.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";W=`${pe.name}${pe.formula?` (${pe.formula})`:""}.${ft}${it}`}let Ie=null;if(ce.value==="microscope"){const it=g.value,ft=Ge.get(it),_t=B.get(it)??40;if(!ft)W="Place a specimen slide on the stage first.";else if(_e.get(it)!=="on")W="Switch on the illumination to see anything through the eyepiece.";else{const Nt=Xe(it),at=k(ft).expected_structures||"the specimen";Nt==="focused"?W=`At ×${_t}, clearly focused - you can see ${at}.`:Nt==="almost_focused"?W=`At ×${_t}, almost in focus - fine-tune the focus a little more.`:Nt==="blurred"?W=`At ×${_t}, blurred - adjust the coarse and fine focus.`:W=`At ×${_t}, very blurred - use the focus knobs before observing.`,Ie=Nt}}p.value=W,s("action",{objectKey:g.value,action:C,value:Ie});return}if(C==="zoom"){bt(g.value),s("action",{objectKey:g.value,action:C,value:null});return}if(C==="switch_on"||C==="switch_off"){_e.set(g.value,C==="switch_on"?"on":"off"),ce.value==="stopwatch"&&(C==="switch_on"&&!Gn.get(g.value)?(Gn.set(g.value,!0),ps.set(g.value,Date.now())):C==="switch_off"&&Gn.get(g.value)&&(ms.set(g.value,sr(g.value)),Gn.set(g.value,!1)),rr(g.value)),ce.value==="microscope"&&Vt(g.value),ce.value==="ray_box"&&zi(),s("action",{objectKey:g.value,action:C,value:null});return}if(C==="measure"){Fe(g.value);return}if(C==="connect"||C==="pour"||C==="heat"||C==="move"||C==="rotate"){m.value=C,h.enabled=C!=="move"&&C!=="rotate";return}}}const Ae=Ct("");Bs(m,C=>{C==="connect"?Ae.value="Click the object to connect to.":C==="pour"?Ae.value="Click the container to pour into.":C==="heat"?Ae.value="Click the object to place over the flame.":C==="move"?Ae.value="Drag the object to reposition it, then click Done.":C==="rotate"?Ae.value="Drag left/right to rotate, then click Done.":C==="measure"&&te.value==="ruler"?Ae.value="Click the object to measure - place the ruler close to it first.":C==="measure"&&te.value==="thermometer"?Ae.value="Click the substance to take a temperature reading.":C==="measure"&&te.value==="protractor"&&(Ae.value="Click the mirror or glass block - centre the protractor on the ray first.")});function Ye(){if(!x.value)return;const C=Ue.value==="slider"?String(Math.round(H.value)):rt.value!==null?String(rt.value):null;s("action",{objectKey:x.value,action:"measure",value:C,unit:se.value,label:A.value,safetyIssue:me.value,targetObjectKey:xe.value}),x.value=null,Ue.value=null,rt.value=null,me.value=!1,Le.value=null}function et(){if(be.value){Jn();return}m.value=null,te.value=null,Le.value=null,h.enabled=!0}function gt(){var C,D,U;if(!(!g.value||!m.value)){if(m.value==="move"){const z=u.get(g.value);let W=null;z&&u.forEach((at,Ut)=>{Ut!==g.value&&at.position.distanceTo(z.position)<.6&&(W=Ut)});const pe=g.value;Vi.forEach((at,Ut)=>{at===pe&&Ut!==W&&(Vi.delete(Ut),ir(Ut))});const Ie=W?(C=n.sceneObjects.find(at=>at.key===W))==null?void 0:C.object_type:null;Ie==="balance"&&W&&(Vi.set(W,pe),ir(W)),Mi.forEach((at,Ut)=>{if(Ut===pe&&at!==W){const tn=Number(k(Ut).volume_ml??0),Gr=Math.max(0,(re.get(at)??0)-tn);re.set(at,Gr),fe(at,Gr/Number(k(at).capacity_ml??250)),Mi.delete(Ut)}});const it=Number(k(pe).volume_ml??0);if(Ie&&We.includes(Ie)&&W&&it>0&&!Mi.has(pe)){Mi.set(pe,W);const at=(re.get(W)??0)+it;re.set(W,at),fe(W,at/Number(k(W).capacity_ml??250))}const ft=(D=n.sceneObjects.find(at=>at.key===pe))==null?void 0:D.object_type;if(Ge.forEach((at,Ut)=>{at===pe&&Ut!==W&&Ge.delete(Ut)}),Ie==="microscope"&&W&&ft==="biological_model"){Ge.set(W,pe);const at=Number(k(pe).optimal_focus??50),Ut=Number(k(pe).focus_tolerance??6),tn=Math.random()<.5?-1:1,Gr=Ut*(3+Math.random()*3)*tn;qe.set(W,Math.max(0,Math.min(100,at+Gr))),B.set(W,40),Vt(W)}let _t,Nt=!1;if(ft==="mass_piece"){Q.forEach((Ut,tn)=>{Ut.has(pe)&&tn!==W&&Ut.delete(pe)}),Ie==="spring"&&W&&(Q.has(W)||Q.set(W,new Set),Q.get(W).add(pe));const at=new Set(W&&Ie==="spring"?[W]:[]);Q.forEach((Ut,tn)=>at.add(tn)),at.forEach(Ut=>{const tn=Fr(Ut);W===Ut&&(_t=tn.totalMassG,Nt=tn.exceeded)}),Nt&&(Ee.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Ee.value=null},4500))}if(["ray_box","mirror","glass_block"].includes(ft||"")&&zi(),z){const at=X(z.position);z.position.y=at>=0?V[at].floorY:0}s("action",{objectKey:g.value,action:"move",value:W,springLoadG:_t,safetyIssue:Nt,position:z?{x:z.position.x,y:z.position.y,z:z.position.z}:void 0})}else if(m.value==="rotate"){const z=u.get(g.value),W=z?Math.round(z.rotation.y*180/Math.PI):0,pe=(U=n.sceneObjects.find(Ie=>Ie.key===g.value))==null?void 0:U.object_type;["ray_box","mirror","glass_block"].includes(pe||"")&&zi(),s("action",{objectKey:g.value,action:"rotate",value:String(W)})}m.value=null,h.enabled=!0}}function bt(C){const D=u.get(C);if(!D)return;const U=D.position.clone().add(new P(0,.3,0)),z=l.position.clone().sub(h.target).normalize(),W=U.clone().add(z.multiplyScalar(1.4)),pe=l.position.clone(),Ie=h.target.clone();let it=0;const ft=()=>{it+=.05,l.position.lerpVectors(pe,W,Math.min(it,1)),h.target.lerpVectors(Ie,U,Math.min(it,1)),h.update(),it<1&&requestAnimationFrame(ft)};ft()}function $e(C){const D=c.domElement.getBoundingClientRect();d.x=(C.clientX-D.left)/D.width*2-1,d.y=-((C.clientY-D.top)/D.height)*2+1}function Bt(){f.setFromCamera(d,l);const C=[];u.forEach(z=>C.push(z));const D=f.intersectObjects(C,!0);if(D.length===0)return null;let U=D[0].object;for(;U&&!U.userData.objectKey;)U=U.parent;return U?U.userData.objectKey:null}let $t=null;function Jt(C){if($e(C),$t={x:C.clientX,y:C.clientY},m.value==="move"&&g.value){y=!0;return}if(m.value==="rotate"&&g.value){y=!0,M=C.clientX;return}}function kt(C){if(!(!y||!g.value)){if($e(C),m.value==="move"){f.setFromCamera(d,l);const D=new P;f.ray.intersectPlane(_,D);const U=u.get(g.value);U&&D&&(U.position.x=D.x,U.position.z=D.z)}else if(m.value==="rotate"){const D=C.clientX-M,U=u.get(g.value);U&&(U.rotation.y=D*.02)}}}function on(C){const D=$t&&(Math.abs(C.clientX-$t.x)>4||Math.abs(C.clientY-$t.y)>4);if(y=!1,m.value==="move"||m.value==="rotate"||D||($e(C),ju()))return;const U=Bt();if(!U){ee();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(U===g.value)return;const z=g.value,W=m.value;if(W==="measure"){if(te.value==="ruler"){const pe=je(z,U);if(!pe.ok){Ee.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Ee.value=null},3500);return}Ue.value="readonly",se.value="cm",rt.value=pe.value}else if(te.value==="thermometer")Ue.value="readonly",se.value="°C",rt.value=ve(U);else if(te.value==="protractor"){const pe=Le.value??"incidence",Ie=kr(z,U,pe);if(!Ie.ok){Ee.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Ee.value=null},3500);return}Ue.value="readonly",se.value="°",rt.value=Ie.value}xe.value=U,x.value=z,m.value=null,te.value=null,h.enabled=!0;return}if(W==="connect"){const pe=u.get(z),Ie=u.get(U);pe&&Ie&&o.add(Kh(pe.position,Ie.position)),Je.value.push({from:z,to:U}),s("action",{objectKey:z,action:W,value:U}),m.value=null,h.enabled=!0;return}if(W==="heat"){He.set(U,Date.now()),s("action",{objectKey:z,action:W,value:U}),m.value=null,h.enabled=!0;return}if(W==="pour"){Ve(z,U);return}}ae(U)}function Ve(C,D){var _t,Nt,at,Ut;const U=n.sceneObjects.find(tn=>tn.key===C),z=n.sceneObjects.find(tn=>tn.key===D);if(!U||!z)return;const W=Number(k(D).capacity_ml??250),pe=re.get(D)??0,Ie=Math.max(0,W-pe),it=We.includes(U.object_type),ft=it?re.get(C)??0:Ie;be.value={from:C,to:D,amount:0,max:Math.max(1,Math.round(Math.min(Ie,ft))),fromLabel:((_t=U.props)==null?void 0:_t.display_name)??((Nt=T().get(U.object_type))==null?void 0:Nt.display_name)??U.object_type,toLabel:((at=z.props)==null?void 0:at.display_name)??((Ut=T().get(z.object_type))==null?void 0:Ut.display_name)??z.object_type,fromTracked:it}}function yn(){if(!be.value)return;const{from:C,to:D,amount:U,fromTracked:z}=be.value,W=Number(k(D).capacity_ml??250);if(fe(D,((re.get(D)??0)+U)/W),z){const pe=Number(k(C).capacity_ml??250);fe(C,Math.max(0,(re.get(C)??0)-U)/pe)}}Bs(()=>{var C;return(C=be.value)==null?void 0:C.amount},yn);function It(){if(!be.value)return;const{from:C,to:D,amount:U,fromTracked:z}=be.value;Tn(C,D,U),re.set(D,Math.round((re.get(D)??0)+U)),z&&re.set(C,Math.max(0,Math.round((re.get(C)??0)-U))),s("action",{objectKey:D,action:"pour",value:String(Math.round(U)),source:C}),be.value=null,m.value=null,h.enabled=!0}function Tn(C,D,U){if(U<=0)return;const z=Nn(C),W=Nn(D);if(!z||!W)return;const pe=re.get(D)??0;W.color.lerp(z.color,pe<=0?1:U/(pe+U))}function Nn(C){var U;let D=null;return(U=u.get(C))==null||U.traverse(z=>{!D&&z instanceof le&&z.userData.role==="liquid"&&(D=z.material)}),D}function Jn(){if(be.value){const{from:C,to:D,fromTracked:U}=be.value,z=Number(k(D).capacity_ml??250);if(fe(D,(re.get(D)??0)/z),U){const W=Number(k(C).capacity_ml??250);fe(C,(re.get(C)??0)/W)}}be.value=null,m.value=null,h.enabled=!0}let Ke=null;const Ft=Ct(null);function jt(){const C=r.value;if(!C)return;try{Ke=w1(C,{unitScale:qo,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:60,cupboard:!!n.cupboard,wallCabinets:!!n.wallShelves,benchLength:n.benchLength,sideBenches:!!n.sideBenches})}catch(U){console.error("Virtual Lab: failed to create a WebGL context",U),a.value=!0;return}c=Ke.renderer,o=Ke.scene,l=Ke.camera,h=Ke.controls,n.sceneObjects.forEach(U=>{if(U.in_tray&&!n.forcePlaced){Ze.value.push(U);return}st(U)}),(n.connections||[]).forEach(U=>{const z=u.get(U.from),W=u.get(U.to);z&&W&&o.add(Kh(z.position,W.position))}),zi(),Hr(),Sc(),n.fixedView?wc():Ec(),c.domElement.addEventListener("pointerdown",Jt),c.domElement.addEventListener("pointermove",kt),c.domElement.addEventListener("pointermove",Tc),c.domElement.addEventListener("pointerup",on);let D=0;Ke.onFrame(U=>{D+=U,D>.15&&(D=0,Gn.forEach((z,W)=>{z&&rr(W)})),u.forEach((z,W)=>{const pe=W===g.value||W===Ft.value;z.children.forEach(Ie=>{Ie.userData.role==="label"&&(Ie.visible=pe)})}),Un.forEach((z,W)=>{z.children.forEach(pe=>{pe.userData.role==="label"&&(pe.visible=W===bi)})}),ar.forEach((z,W)=>{z.children.forEach(pe=>{pe.userData.role==="label"&&(pe.visible=W===bc)})})})}Bs(()=>n.sceneObjects.map(C=>`${C.key}@${C.position.x},${C.position.y},${C.position.z}`).join("|"),()=>{if(!Ke)return;const C=new Map(n.sceneObjects.filter(U=>!U.in_tray).map(U=>[U.key,U]));let D=!1;u.forEach((U,z)=>{C.has(z)||(o.remove(U),U.traverse(W=>{var pe;(W instanceof le||W instanceof wn)&&((pe=W.geometry)==null||pe.dispose(),(Array.isArray(W.material)?W.material:[W.material]).forEach(it=>{var ft;(ft=it.map)==null||ft.dispose(),it.dispose()}))}),u.delete(z),g.value===z&&ee())}),C.forEach((U,z)=>{const W=u.get(z);W?W.position.set(U.position.x,U.position.y,U.position.z):(st(U),D=!0)}),D&&!n.fixedView&&Ec(),Ja()});const Un=new Map,Ht=[];function ai(C,D){const U=document.createElement("canvas");U.width=512,U.height=144;const z=U.getContext("2d");z.fillStyle="#fffdf4",z.fillRect(0,0,512,144),z.fillStyle="#1e3a8a",z.fillRect(0,0,512,10),z.fillStyle="#111827",z.textAlign="center",z.textBaseline="middle";let W=46;for(z.font=`bold ${W}px sans-serif`;z.measureText(C).width>490&&W>26;)W-=2,z.font=`bold ${W}px sans-serif`;if(z.measureText(C).width>490){const Ie=C.split(" "),it=Math.ceil(Ie.length/2);z.fillText(Ie.slice(0,it).join(" "),256,D?42:52),z.fillText(Ie.slice(it).join(" "),256,D?80:96)}else z.fillText(C,256,D?54:76);D&&(z.font="bold 38px serif",z.fillStyle="#1e3a8a",z.fillText(D,256,118));const pe=new Qs(U);return pe.colorSpace=cn,pe.anisotropy=8,pe}let bi=null;function Hr(){const C=Ke==null?void 0:Ke.cupboard;C&&(Ju.forEach((D,U)=>{const z=C.bays[U<2?0:1],W=z.levels[U%2],pe=(z.maxX-z.minX)/D.length;D.forEach((Ie,it)=>{const ft=Wl(J1(Ie),`cupboard:${Ie.id}`,Ie.name,K1(Ie));ft.position.set(z.minX+pe*(it+.5),W,z.frontZ-.6),ft.userData.chemicalId=Ie.id,ft.traverse(Nt=>{Nt instanceof le&&(Nt.castShadow=!1,Nt.receiveShadow=!1)}),o.add(ft),Un.set(Ie.id,ft);const _t=new le(new Ot(pe*.92,.26),new pi({map:ai(Ie.name,Ie.formula),toneMapped:!1}));_t.position.set(ft.position.x,W+.14,z.frontZ-.08),_t.rotation.x=-.35,_t.userData.chemicalId=Ie.id,o.add(_t),Ht.push(_t)})}),Ja())}function Ja(){const C=new Set(n.sceneObjects.map(U=>{var z;return(z=U.props)==null?void 0:z.chemical_id}).filter(Boolean));Un.forEach((U,z)=>{U.visible=!C.has(z)});const D=new Set(n.sceneObjects.filter(U=>{var z;return!((z=U.props)!=null&&z.chemical_id)}).map(U=>U.object_type));ar.forEach((U,z)=>{U.visible=!D.has(z)})}function Mc(){var Nt;const C=Ke==null?void 0:Ke.cupboard,D=Ke==null?void 0:Ke.wallCabinets,U=Ke==null?void 0:Ke.furniture,z=Ke==null?void 0:Ke.taps;if(!C&&!D&&!(U!=null&&U.doors.length)&&!z)return null;f.setFromCamera(d,l);const W=[];C&&W.push(...C.doors,...C.blockers),D&&W.push(...D.doors,...D.blockers),U&&W.push(...U.doors,...U.blockers),z&&W.push(...z.taps),Ke!=null&&Ke.extinguisher&&W.push(Ke.extinguisher.group),u.forEach(at=>W.push(at)),Un.forEach(at=>{at.visible&&W.push(at)}),Ht.forEach(at=>W.push(at)),ar.forEach(at=>{at.visible&&W.push(at)});const pe=f.intersectObjects(W,!0)[0];if(!pe)return null;const Ie=(Nt=Ke.taps)==null?void 0:Nt.tapOf(pe.object);if(Ie)return{kind:"tap",tap:Ie};let it=pe.object;for(;it&&!it.userData.isExtinguisher;)it=it.parent;if(it)return{kind:"extinguisher"};const ft=Ke.doorOf(pe.object);if(ft)return{kind:"door",door:ft};let _t=pe.object;for(;_t&&!_t.userData.chemicalId&&!_t.userData.shelfType;)_t=_t.parent;return _t?_t.userData.shelfType?{kind:"apparatus",type:_t.userData.shelfType}:{kind:"chemical",id:_t.userData.chemicalId}:null}function ju(){const C=Mc();if(!C)return!1;if(C.kind==="apparatus")return s("pickApparatus",C.type),!0;if(C.kind==="tap")return Ke.taps.toggle(C.tap),!0;if(C.kind==="extinguisher")return Ke.extinguisher.discharge(),n.sceneObjects.forEach(D=>{D.object_type==="bunsen_burner"&&Ac(D.key,{flame:"off"})}),!0;if(C.kind==="chemical"){const D=n.sceneObjects.find(U=>{var z;return((z=U.props)==null?void 0:z.chemical_id)===C.id});return D?s("putBack",D.key):s("takeChemical",C.id),!0}return Ke.toggleDoor(C.door),!0}const ar=new Map;let or=null,bc=null;function Sc(){const C=Ke==null?void 0:Ke.wallCabinets;C&&(or==null||or.dispose(),ar.clear(),or=X1(o,C,n.objectCatalog,qo),or.items.forEach((D,U)=>ar.set(U,D)),Ja())}Bs(()=>n.objectCatalog.map(C=>C.object_type).join(","),()=>{Ke&&Sc()});function Qu(C){Ke&&(C==="bench"?wc(!0):C==="entrance"?Ke.flyTo(new P(2.4,.95,2.4),new P(0,.25,7)):C==="left"?Ke.flyTo(new P(-1.2,1,1.6),new P(-7,.45,1.6)):Ke.flyTo(new P(1.2,1,1.6),new P(7,.45,1.6)))}const ef=Ic(()=>{var C,D;return!!((D=(C=n.sceneObjects.find(U=>U.key===g.value))==null?void 0:C.props)!=null&&D.chemical_id)});function tf(){const C=g.value;C&&(ee(),s("putBack",C))}function wc(C=!1){if(!Ke)return;const D=qo,U=Ke.benchLength/2,z=Ke.wallCabinets?new In(new P(-(U+.25)*D,-.9*D,-.6*D),new P((U+.25)*D,1.82*D,.375*D)):new In(new P(-U*D,-.9*D,-.375*D),new P(U*D,.1*D,.375*D));Ke.fitBox(z,Ke.wallCabinets?.94:.72,{dir:new P(.4,Ke.wallCabinets?3.4:4.2,6.4),animate:C})}function Ec(){if(!Ke||u.size===0)return;o.updateMatrixWorld(!0);const C=new In;u.forEach(D=>D.children.forEach(U=>{U.userData.role!=="label"&&C.expandByObject(U)})),Ke.frameBox(C)}function Tc(C){if(y)return;$e(C),Ft.value=Bt();const D=Ft.value?null:Mc();bi=(D==null?void 0:D.kind)==="chemical"?D.id:null,bc=(D==null?void 0:D.kind)==="apparatus"?D.type:null,c.domElement.style.cursor=Ft.value||D?"pointer":"grab"}function Ac(C,D){(D.state==="on"||D.state==="off")&&_e.set(C,D.state);const U=u.get(C);U&&U.traverse(z=>{if(z.userData.role==="lever"&&"state"in D){const W=D.state==="on"||D.state==="closed";z.rotation.z=W?Math.PI/2-.35:Math.PI/2-.9,z.position.x=W?0:-.06}if(z.userData.role==="led"&&"state"in D&&z instanceof le){const W=z.material;W.emissiveIntensity=D.state==="on"?1.2:0}if(z.userData.role==="flame"&&"flame"in D&&z instanceof le){const W=z.material;W.emissiveIntensity=D.flame==="on"?1:0,W.opacity=D.flame==="on"?.9:0}})}e({setObjectState:Ac,goToView:Qu});function nf(){a.value=!1,cf(jt)}return Jh(jt),jh(()=>{c==null||c.domElement.removeEventListener("pointerdown",Jt),c==null||c.domElement.removeEventListener("pointermove",kt),c==null||c.domElement.removeEventListener("pointermove",Tc),c==null||c.domElement.removeEventListener("pointerup",on),Ke==null||Ke.dispose(),Ke=null}),(C,D)=>(At(),Tt("div",j1,[a.value?(At(),Tt("div",Q1,[Rc(hf,{name:"beaker",class:"w-8 h-8"}),D[12]||(D[12]=ke("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),ke("button",{onClick:nf,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(At(),Tt("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),Ze.value.length>0?(At(),Tt("div",{key:2,class:lr(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||be.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[D[13]||(D[13]=ke("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),ke("div",ev,[(At(!0),Tt(oi,null,gs(Ze.value,U=>{var z,W;return At(),Tt("button",{key:U.key,onClick:pe=>mt(U.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[ke("span",null,qt(((z=T().get(U.object_type))==null?void 0:z.icon)||"🔬"),1),ke("span",nv,qt(((W=T().get(U.object_type))==null?void 0:W.display_name)||U.object_type),1)],8,tv)}),128))])],2)):nn("",!0),I.value&&g.value?(At(),Tt("div",{key:3,class:"absolute inset-0 z-30 flex items-center justify-center bg-gray-900/40 p-3",onClick:D[1]||(D[1]=rf(U=>I.value=!1,["self"]))},[ke("div",{class:"w-full max-w-md max-h-full overflow-y-auto rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 p-4",role:"dialog","aria-modal":"true","aria-label":`What can I do with ${A.value}`},[ke("div",sv,[ke("div",rv,[D[14]||(D[14]=ke("p",{class:"text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"},"What can I do?",-1)),ke("h2",av,qt(A.value),1)]),ke("button",{onClick:D[0]||(D[0]=U=>I.value=!1),class:"flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs","aria-label":"Close"},"✕")]),Z.value.length?(At(),Tt(oi,{key:0},[D[15]||(D[15]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Try these",-1)),ke("ul",ov,[(At(!0),Tt(oi,null,gs(Z.value,U=>(At(),Tt("li",{key:U,class:"text-xs text-gray-700 dark:text-gray-200 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg px-2.5 py-2"},qt(U),1))),128))])],64)):nn("",!0),D[16]||(D[16]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Actions",-1)),ke("div",lv,[(At(!0),Tt(oi,null,gs(v.value,U=>(At(),Tt("div",{key:U,class:"flex items-center justify-between gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-2"},[ke("div",cv,[ke("p",hv,qt(S(U)),1),ke("p",uv,qt(N[U]||"Looks at it closely."),1)]),ke("button",{onClick:z=>J(U),class:"flex-shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},"Try",8,fv)]))),128))])],8,iv)])):nn("",!0),g.value&&!m.value?(At(),Tt("div",dv,[ke("div",pv,[ke("p",mv,qt(A.value),1),ke("button",{onClick:ee,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),ke("div",gv,[(At(!0),Tt(oi,null,gs(v.value,U=>(At(),Tt("button",{key:U,onClick:z=>ze(U),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},qt(S(U)),9,_v))),128)),ie()?(At(),Tt("button",{key:0,onClick:oe,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 active:scale-95 transition-transform"}," Wash ")):nn("",!0),ke("button",{onClick:D[2]||(D[2]=U=>I.value=!0),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 active:scale-95 transition-transform"}," What can I do? "),i.cupboard?(At(),Tt("button",{key:1,onClick:tf,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},qt(ef.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):nn("",!0)]),x.value&&Ue.value==="readonly"?(At(),Tt("div",vv,[D[17]||(D[17]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),ke("div",xv,[ke("span",yv,[cr(qt(rt.value),1),ke("span",Mv,qt(se.value),1)]),ke("button",{onClick:Ye,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):nn("",!0),x.value&&Ue.value==="slider"?(At(),Tt("div",bv,[ke("p",Sv,"Reading: "+qt(Math.round(H.value))+qt(se.value),1),Cc(ke("input",{"onUpdate:modelValue":D[3]||(D[3]=U=>H.value=U),type:"range",min:"0",max:j.value,step:"1",class:"w-full accent-emerald-600"},null,8,wv),[[Pc,H.value,void 0,{number:!0}]]),ke("button",{onClick:Ye,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):nn("",!0),ce.value==="battery"?(At(),Tt("div",Ev,[D[18]||(D[18]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),ke("div",Tv,[(At(),Tt(oi,null,gs([1.5,3,6,9,12],U=>ke("button",{key:U,onClick:z=>ne(U),class:lr(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ye.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},qt(U)+"V",11,Av)),64))])])):nn("",!0),ce.value==="stopwatch"?(At(),Tt("div",Rv,[ke("p",Cv,"Elapsed: "+qt(zr.value),1),ke("button",{onClick:D[4]||(D[4]=U=>R(g.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):nn("",!0),ce.value==="microscope"?(At(),Tt("div",Pv,[$.value?(At(),Tt(oi,{key:1},[ke("div",null,[D[19]||(D[19]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),ke("div",Dv,[(At(),Tt(oi,null,gs([40,100,400],U=>ke("button",{key:U,onClick:z=>Wt(U),class:lr(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ct.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+qt(U),11,Lv)),64))])]),ke("div",null,[ke("p",Nv,"Coarse Focus: "+qt(Math.round(dt.value)),1),ke("input",{value:dt.value,onChange:D[5]||(D[5]=U=>Hn(Number(U.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,Uv)]),ke("div",Fv,[D[20]||(D[20]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),ke("div",Ov,[ke("button",{onClick:D[6]||(D[6]=U=>Dn(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),ke("button",{onClick:D[7]||(D[7]=U=>Dn(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),w.value?(At(),Tt("div",Bv,[D[22]||(D[22]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),ke("div",kv,[ke("div",{class:"absolute inset-0 flex items-center justify-center",style:af({filter:`blur(${Qe[L.value]}px)`})},[...D[21]||(D[21]=[ke("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),ke("p",zv,qt(L.value.replace("_"," "))+" · ×"+qt(ct.value),1)])):nn("",!0)],64)):(At(),Tt("div",Iv,"Place a specimen slide on the stage first."))])):nn("",!0),ce.value==="spring"?(At(),Tt("div",Vv,[ke("p",Hv,"Attached Load: "+qt(ue.value)+" g · Extension: "+qt(Te.value)+" cm",1),ge.value?(At(),Tt("p",Gv,"Beyond the spring's safe extension limit.")):nn("",!0)])):nn("",!0),ce.value==="protractor"?(At(),Tt("div",Wv,[D[23]||(D[23]=ke("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),ke("div",Xv,[ke("button",{onClick:D[8]||(D[8]=U=>Ne("incidence")),class:lr(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",Le.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),ke("button",{onClick:D[9]||(D[9]=U=>Ne("outgoing")),class:lr(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",Le.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):nn("",!0)])):nn("",!0),m.value&&!be.value?(At(),Tt("div",Yv,[ke("span",qv,qt(Ae.value),1),ke("span",Zv,[m.value==="move"||m.value==="rotate"?(At(),Tt("button",{key:0,onClick:gt,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):nn("",!0),ke("button",{onClick:et,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):nn("",!0),be.value?(At(),Tt("div",$v,[ke("p",Kv,"Pouring "+qt(be.value.fromLabel)+" → "+qt(be.value.toLabel),1),ke("p",Jv,[cr(qt(Math.round(be.value.amount))+" ",1),D[24]||(D[24]=ke("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),Cc(ke("input",{"onUpdate:modelValue":D[10]||(D[10]=U=>be.value.amount=U),type:"range",min:"0",max:be.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,jv),[[Pc,be.value.amount,void 0,{number:!0}]]),ke("div",{class:"flex items-center gap-2 mt-2"},[ke("button",{onClick:Jn,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),ke("button",{onClick:It,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):nn("",!0),Rc(of,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:lf(()=>[Ee.value?(At(),Tt("div",Qv,qt(Ee.value),1)):nn("",!0)]),_:1}),p.value?(At(),Tt("div",ex,[ke("div",tx,[ke("p",nx,qt(p.value),1),ke("button",{onClick:D[11]||(D[11]=U=>p.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):nn("",!0),ke("p",ix,[D[26]||(D[26]=cr(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard||i.wallShelves?(At(),Tt(oi,{key:0},[D[25]||(D[25]=cr(" · Click a door to open it",-1)),i.wallShelves?(At(),Tt(oi,{key:0},[cr(", a sink tap to run water, the extinguisher to spray CO₂")],64)):nn("",!0)],64)):nn("",!0)])]))}});export{c1 as $,Vs as A,rn as B,Pn as C,Zt as D,Du as E,kn as F,vt as G,Wl as H,wn as I,ls as J,Lc as K,Mu as L,le as M,ux as N,In as O,Ci as P,uc as Q,h0 as R,Lt as S,St as T,mu as U,P as V,zn as W,o1 as X,cn as Y,ql as Z,px as _,K1 as a,Nu as a0,Ga as a1,J1 as b,$1 as c,w1 as d,k1 as e,si as f,pi as g,hx as h,ac as i,F as j,G as k,vi as l,fx as m,Zn as n,ri as o,Ni as p,Se as q,Ou as r,X1 as s,Ot as t,cx as u,yt as v,dx as w,$u as x,qn as y,K as z};
