import{Q as _r,o as kh,m as Vo,r as At,d as Xu,c as Ot,A as gc,a as et,f as ir,F as gs,k as zr,e as ln,t as $t,C as Vr,g as _c,p as vc,x as qu,T as Yu,z as Zu,h as $u,n as Ku,j as Bt}from"./index-DikwxJhe.js";import{_ as Ju}from"./AppIcon.vue_vue_type_script_setup_true_lang-oD-Xhntu.js";function Px(){const i=At(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return _r(i,r=>{document.body.style.overflow=r?"hidden":""}),kh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),Vo(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const kl="185",ks={ROTATE:0,DOLLY:1,PAN:2},Os={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ju=0,xc=1,Qu=2,Mr=1,ef=2,vr=3,Gi=0,bn=1,Kt=2,Ei=0,zs=1,yc=2,Mc=3,Sc=4,tf=5,is=100,nf=101,sf=102,rf=103,af=104,of=200,lf=201,cf=202,hf=203,Ho=204,Go=205,uf=206,ff=207,df=208,pf=209,mf=210,gf=211,_f=212,vf=213,xf=214,Wo=0,Xo=1,qo=2,Xs=3,Yo=4,Zo=5,$o=6,Ko=7,zl=0,yf=1,Mf=2,ui=0,zh=1,Vh=2,Hh=3,Vl=4,Gh=5,Wh=6,Xh=7,qh=300,os=301,qs=302,$a=303,Ka=304,Va=306,vn=1e3,wi=1001,Jo=1002,un=1003,Sf=1004,Hr=1005,xn=1006,Ja=1007,rs=1008,In=1009,Yh=1010,Zh=1011,Er=1012,Hl=1013,di=1014,$n=1015,Ri=1016,Gl=1017,Wl=1018,Tr=1020,$h=35902,Kh=35899,Jh=1021,jh=1022,Kn=1023,Ci=1026,as=1027,Xl=1028,ql=1029,ls=1030,Yl=1031,Zl=1033,Ma=33776,Sa=33777,ba=33778,wa=33779,jo=35840,Qo=35841,el=35842,tl=35843,nl=36196,il=37492,sl=37496,rl=37488,al=37489,Aa=37490,ol=37491,ll=37808,cl=37809,hl=37810,ul=37811,fl=37812,dl=37813,pl=37814,ml=37815,gl=37816,_l=37817,vl=37818,xl=37819,yl=37820,Ml=37821,Sl=36492,bl=36494,wl=36495,El=36283,Tl=36284,Ra=36285,Al=36286,bf=3200,Ca=0,wf=1,Vi="",hn="srgb",Pa="srgb-linear",Da="linear",kt="srgb",_s=7680,bc=519,Ef=512,Tf=513,Af=514,$l=515,Rf=516,Cf=517,Kl=518,Pf=519,Rl=35044,wc="300 es",hi=2e3,Ar=2001;function Df(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ia(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function If(){const i=Ia("canvas");return i.style.display="block",i}const Ec={};function La(...i){const e="THREE."+i.shift();console.log(e,...i)}function Qh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function lt(...i){i=Qh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function wt(...i){i=Qh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Vs(...i){const e=i.join(" ");e in Ec||(Ec[e]=!0,lt(...i))}function Lf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Nf={[Wo]:Xo,[qo]:$o,[Yo]:Ko,[Xs]:Zo,[Xo]:Wo,[$o]:qo,[Ko]:Yo,[Zo]:Xs};class qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ea=Math.PI/180,Cl=180/Math.PI;function Ti(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function xt(i,e,t){return Math.max(e,Math.min(t,i))}function Uf(i,e){return(i%e+e)%e}function ja(i,e,t){return(1-t)*i+t*e}function li(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Gt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ff={DEG2RAD:Ea},lc=class lc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};lc.prototype.isVector2=!0;let j=lc;class Pi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||o!==u||l!==p||h!==g){let m=o*u+l*p+h*g+f*_;m<0&&(u=-u,p=-p,g=-g,_=-_,m=-m);let d=1-c;if(m<.9995){const M=Math.acos(m),v=Math.sin(M);d=Math.sin(d*M)/v,c=Math.sin(c*M)/v,o=o*d+u*c,l=l*d+p*c,h=h*d+g*c,f=f*d+_*c}else{o=o*d+u*c,l=l*d+p*c,h=h*d+g*c,f=f*d+_*c;const M=1/Math.sqrt(o*o+l*l+h*h+f*f);o*=M,l*=M,h*=M,f*=M}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],h=n[s+3],f=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=c*g+h*f+o*p-l*u,e[t+1]=o*g+h*u+l*f-c*p,e[t+2]=l*g+h*p+c*u-o*f,e[t+3]=h*g-c*f-o*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),h=c(s/2),f=c(r/2),u=o(n/2),p=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f+u*p*g;break;case"YZX":this._x=u*h*f+l*p*g,this._y=l*p*f+u*h*g,this._z=l*h*g-u*p*f,this._w=l*h*f-u*p*g;break;case"XZY":this._x=u*h*f-l*p*g,this._y=l*p*f-u*h*g,this._z=l*h*g+u*p*f,this._w=l*h*f+u*p*g;break;default:lt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],h=t[6],f=t[10],u=n+c+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-o)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>c&&n>f){const p=2*Math.sqrt(1+n-c-f);this._w=(h-o)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(c>f){const p=2*Math.sqrt(1+c-n-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(o+h)/p}else{const p=2*Math.sqrt(1+f-n-c);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(o+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,h=t._w;return this._x=n*h+a*c+s*l-r*o,this._y=s*h+a*o+r*c-n*l,this._z=r*h+a*l+n*o-s*c,this._w=a*h-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const cc=class cc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),h=2*(c*t-r*s),f=2*(r*n-a*t);return this.x=t+o*l+a*f-c*h,this.y=n+o*h+c*l-r*f,this.z=s+o*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qa.copy(this).projectOnVector(e),this.sub(Qa)}reflect(e){return this.sub(Qa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};cc.prototype.isVector3=!0;let U=cc;const Qa=new U,Tc=new Pi,hc=class hc{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],h=n[4],f=n[7],u=n[2],p=n[5],g=n[8],_=s[0],m=s[3],d=s[6],M=s[1],v=s[4],y=s[7],w=s[2],b=s[5],C=s[8];return r[0]=a*_+c*M+o*w,r[3]=a*m+c*v+o*b,r[6]=a*d+c*y+o*C,r[1]=l*_+h*M+f*w,r[4]=l*m+h*v+f*b,r[7]=l*d+h*y+f*C,r[2]=u*_+p*M+g*w,r[5]=u*m+p*v+g*b,r[8]=u*d+p*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-n*r*h+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],f=h*a-c*l,u=c*o-h*r,p=l*r-a*o,g=t*f+n*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-h*n)*_,e[2]=(c*n-s*a)*_,e[3]=u*_,e[4]=(h*t-s*o)*_,e[5]=(s*r-c*t)*_,e[6]=p*_,e[7]=(n*o-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Vs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(eo.makeScale(e,t)),this}rotate(e){return Vs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(eo.makeRotation(-e)),this}translate(e,t){return Vs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(eo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};hc.prototype.isMatrix3=!0;let pt=hc;const eo=new pt,Ac=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rc=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Of(){const i={enabled:!0,workingColorSpace:Pa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===kt&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===kt&&(s.r=Hs(s.r),s.g=Hs(s.g),s.b=Hs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Vi?Da:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Vs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Vs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Pa]:{primaries:e,whitePoint:n,transfer:Da,toXYZ:Ac,fromXYZ:Rc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:kt,toXYZ:Ac,fromXYZ:Rc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const Rt=Of();function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Hs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vs;class Bf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vs===void 0&&(vs=Ia("canvas")),vs.width=e.width,vs.height=e.height;const s=vs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=vs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ia("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ai(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ai(t[n]/255)*255):t[n]=Ai(t[n]);return{data:t,width:e.width,height:e.height}}else return lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kf=0;class Jl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=Ti(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(to(s[a].image)):r.push(to(s[a]))}else r=to(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function to(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Bf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(lt("Texture: Unable to serialize Texture."),{})}let zf=0;const no=new U;class yn extends qi{constructor(e=yn.DEFAULT_IMAGE,t=yn.DEFAULT_MAPPING,n=wi,s=wi,r=xn,a=rs,c=Kn,o=In,l=yn.DEFAULT_ANISOTROPY,h=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=Ti(),this.name="",this.source=new Jl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new j(0,0),this.repeat=new j(1,1),this.center=new j(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(no).x}get height(){return this.source.getSize(no).y}get depth(){return this.source.getSize(no).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){lt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){lt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vn:e.x=e.x-Math.floor(e.x);break;case wi:e.x=e.x<0?0:1;break;case Jo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vn:e.y=e.y-Math.floor(e.y);break;case wi:e.y=e.y<0?0:1;break;case Jo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=qh;yn.DEFAULT_ANISOTROPY=1;const uc=class uc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],h=o[4],f=o[8],u=o[1],p=o[5],g=o[9],_=o[2],m=o[6],d=o[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,y=(p+1)/2,w=(d+1)/2,b=(h+u)/4,C=(f+_)/4,x=(g+m)/4;return v>y&&v>w?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=b/n,r=C/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=b/s,r=x/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=x/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};uc.prototype.isVector4=!0;let Jt=uc;class Vf extends qi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new yn(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Jl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends Vf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class eu extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hf extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const za=class za{constructor(e,t,n,s,r,a,c,o,l,h,f,u,p,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,h,f,u,p,g,_,m)}set(e,t,n,s,r,a,c,o,l,h,f,u,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=c,d[13]=o,d[2]=l,d[6]=h,d[10]=f,d[14]=u,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new za().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/xs.setFromMatrixColumn(e,0).length(),r=1/xs.setFromMatrixColumn(e,1).length(),a=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*h,p=a*f,g=c*h,_=c*f;t[0]=o*h,t[4]=-o*f,t[8]=l,t[1]=p+g*l,t[5]=u-_*l,t[9]=-c*o,t[2]=_-u*l,t[6]=g+p*l,t[10]=a*o}else if(e.order==="YXZ"){const u=o*h,p=o*f,g=l*h,_=l*f;t[0]=u+_*c,t[4]=g*c-p,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-c,t[2]=p*c-g,t[6]=_+u*c,t[10]=a*o}else if(e.order==="ZXY"){const u=o*h,p=o*f,g=l*h,_=l*f;t[0]=u-_*c,t[4]=-a*f,t[8]=g+p*c,t[1]=p+g*c,t[5]=a*h,t[9]=_-u*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const u=a*h,p=a*f,g=c*h,_=c*f;t[0]=o*h,t[4]=g*l-p,t[8]=u*l+_,t[1]=o*f,t[5]=_*l+u,t[9]=p*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const u=a*o,p=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=_-u*f,t[8]=g*f+p,t[1]=f,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=p*f+g,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*o,p=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=-f,t[8]=l*h,t[1]=u*f+_,t[5]=a*h,t[9]=p*f-g,t[2]=g*f-p,t[6]=c*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gf,e,Wf)}lookAt(e,t,n){const s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Li.crossVectors(n,An),Li.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Li.crossVectors(n,An)),Li.normalize(),Gr.crossVectors(An,Li),s[0]=Li.x,s[4]=Gr.x,s[8]=An.x,s[1]=Li.y,s[5]=Gr.y,s[9]=An.y,s[2]=Li.z,s[6]=Gr.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],h=n[1],f=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],M=n[3],v=n[7],y=n[11],w=n[15],b=s[0],C=s[4],x=s[8],A=s[12],I=s[1],L=s[5],z=s[9],J=s[13],Q=s[2],B=s[6],q=s[10],W=s[14],ne=s[3],ae=s[7],fe=s[11],me=s[15];return r[0]=a*b+c*I+o*Q+l*ne,r[4]=a*C+c*L+o*B+l*ae,r[8]=a*x+c*z+o*q+l*fe,r[12]=a*A+c*J+o*W+l*me,r[1]=h*b+f*I+u*Q+p*ne,r[5]=h*C+f*L+u*B+p*ae,r[9]=h*x+f*z+u*q+p*fe,r[13]=h*A+f*J+u*W+p*me,r[2]=g*b+_*I+m*Q+d*ne,r[6]=g*C+_*L+m*B+d*ae,r[10]=g*x+_*z+m*q+d*fe,r[14]=g*A+_*J+m*W+d*me,r[3]=M*b+v*I+y*Q+w*ne,r[7]=M*C+v*L+y*B+w*ae,r[11]=M*x+v*z+y*q+w*fe,r[15]=M*A+v*J+y*W+w*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],h=e[2],f=e[6],u=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15],M=o*p-l*u,v=c*p-l*f,y=c*u-o*f,w=a*p-l*h,b=a*u-o*h,C=a*f-c*h;return t*(_*M-m*v+d*y)-n*(g*M-m*w+d*b)+s*(g*v-_*w+d*C)-r*(g*y-_*b+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-n*(r*h-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],f=e[9],u=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],M=t*c-n*a,v=t*o-s*a,y=t*l-r*a,w=n*o-s*c,b=n*l-r*c,C=s*l-r*o,x=h*_-f*g,A=h*m-u*g,I=h*d-p*g,L=f*m-u*_,z=f*d-p*_,J=u*d-p*m,Q=M*J-v*z+y*L+w*I-b*A+C*x;if(Q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/Q;return e[0]=(c*J-o*z+l*L)*B,e[1]=(s*z-n*J-r*L)*B,e[2]=(_*C-m*b+d*w)*B,e[3]=(u*b-f*C-p*w)*B,e[4]=(o*I-a*J-l*A)*B,e[5]=(t*J-s*I+r*A)*B,e[6]=(m*y-g*C-d*v)*B,e[7]=(h*C-u*y+p*v)*B,e[8]=(a*z-c*I+l*x)*B,e[9]=(n*I-t*z-r*x)*B,e[10]=(g*b-_*y+d*M)*B,e[11]=(f*y-h*b-p*M)*B,e[12]=(c*A-a*L-o*x)*B,e[13]=(t*L-n*A+s*x)*B,e[14]=(_*v-g*w-m*M)*B,e[15]=(h*w-f*v+u*M)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,h=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,h*c+n,h*o-s*a,0,l*o-s*c,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,h=a+a,f=c+c,u=r*l,p=r*h,g=r*f,_=a*h,m=a*f,d=c*f,M=o*l,v=o*h,y=o*f,w=n.x,b=n.y,C=n.z;return s[0]=(1-(_+d))*w,s[1]=(p+y)*w,s[2]=(g-v)*w,s[3]=0,s[4]=(p-y)*b,s[5]=(1-(u+d))*b,s[6]=(m+M)*b,s[7]=0,s[8]=(g+v)*C,s[9]=(m-M)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=xs.set(s[0],s[1],s[2]).length();const c=xs.set(s[4],s[5],s[6]).length(),o=xs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Xn.copy(this);const l=1/a,h=1/c,f=1/o;return Xn.elements[0]*=l,Xn.elements[1]*=l,Xn.elements[2]*=l,Xn.elements[4]*=h,Xn.elements[5]*=h,Xn.elements[6]*=h,Xn.elements[8]*=f,Xn.elements[9]*=f,Xn.elements[10]*=f,t.setFromRotationMatrix(Xn),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=hi,o=!1){const l=this.elements,h=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s);let g,_;if(o)g=r/(a-r),_=a*r/(a-r);else if(c===hi)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(c===Ar)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=hi,o=!1){const l=this.elements,h=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),p=-(n+s)/(n-s);let g,_;if(o)g=1/(a-r),_=a/(a-r);else if(c===hi)g=-2/(a-r),_=-(a+r)/(a-r);else if(c===Ar)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};za.prototype.isMatrix4=!0;let Ft=za;const xs=new U,Xn=new Ft,Gf=new U(0,0,0),Wf=new U(1,1,1),Li=new U,Gr=new U,An=new U,Cc=new Ft,Pc=new Pi;class Di{constructor(e=0,t=0,n=0,s=Di.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],h=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,p));break;case"XZY":this._z=Math.asin(-xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pc.setFromEuler(this),this.setFromQuaternion(Pc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Di.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Xf=0;const Dc=new U,ys=new Pi,gi=new Ft,Wr=new U,sr=new U,qf=new U,Yf=new Pi,Ic=new U(1,0,0),Lc=new U(0,1,0),Nc=new U(0,0,1),Uc={type:"added"},Zf={type:"removed"},Ms={type:"childadded",child:null},io={type:"childremoved",child:null};class tn extends qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new U,t=new Di,n=new Pi,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ft},normalMatrix:{value:new pt}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,t){return ys.setFromAxisAngle(e,t),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(Ic,e)}rotateY(e){return this.rotateOnAxis(Lc,e)}rotateZ(e){return this.rotateOnAxis(Nc,e)}translateOnAxis(e,t){return Dc.copy(e).applyQuaternion(this.quaternion),this.position.add(Dc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ic,e)}translateY(e){return this.translateOnAxis(Lc,e)}translateZ(e){return this.translateOnAxis(Nc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Wr.copy(e):Wr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(sr,Wr,this.up):gi.lookAt(Wr,sr,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(gi),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(wt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uc),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null):wt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zf),io.child=e,this.dispatchEvent(io),io.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gi.multiply(e.parent.matrixWorld)),e.applyMatrix4(gi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uc),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,qf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,Yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,h=o.length;l<h;l++){const f=o[l];r(e.shapes,f)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(c){const o=[];for(const l in c){const h=c[l];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new U(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zt extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $f={type:"move"};class so{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),d=this._getHandJoint(l,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent($f)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Xr={h:0,s:0,l:0};function ro(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class gt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Rt.workingColorSpace){if(e=Uf(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ro(a,r,e+1/3),this.g=ro(a,r,e),this.b=ro(a,r,e-1/3)}return Rt.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&lt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:lt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);lt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=tu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):lt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=Hs(e.r),this.g=Hs(e.g),this.b=Hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return Rt.workingToColorSpace(_n.copy(this),e),Math.round(xt(_n.r*255,0,255))*65536+Math.round(xt(_n.g*255,0,255))*256+Math.round(xt(_n.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.workingToColorSpace(_n.copy(this),t);const n=_n.r,s=_n.g,r=_n.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const h=(c+a)/2;if(c===a)o=0,l=0;else{const f=a-c;switch(l=h<=.5?f/(a+c):f/(2-a-c),a){case n:o=(s-r)/f+(s<r?6:0);break;case s:o=(r-n)/f+2;break;case r:o=(n-s)/f+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=Rt.workingColorSpace){return Rt.workingToColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=hn){Rt.workingToColorSpace(_n.copy(this),e);const t=_n.r,n=_n.g,s=_n.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(Xr);const n=ja(Ni.h,Xr.h,t),s=ja(Ni.s,Xr.s,t),r=ja(Ni.l,Xr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new gt;gt.NAMES=tu;class Sr{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new gt(e),this.near=t,this.far=n}clone(){return new Sr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class nu extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Di,this.environmentIntensity=1,this.environmentRotation=new Di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const qn=new U,_i=new U,ao=new U,vi=new U,Ss=new U,bs=new U,Fc=new U,oo=new U,lo=new U,co=new U,ho=new Jt,uo=new Jt,fo=new Jt;class kn{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),qn.subVectors(e,t),s.cross(qn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){qn.subVectors(s,t),_i.subVectors(n,t),ao.subVectors(e,t);const a=qn.dot(qn),c=qn.dot(_i),o=qn.dot(ao),l=_i.dot(_i),h=_i.dot(ao),f=a*l-c*c;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(l*o-c*h)*u,g=(a*h-c*o)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,vi)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,vi.x),o.addScaledVector(a,vi.y),o.addScaledVector(c,vi.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return ho.setScalar(0),uo.setScalar(0),fo.setScalar(0),ho.fromBufferAttribute(e,t),uo.fromBufferAttribute(e,n),fo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ho,r.x),a.addScaledVector(uo,r.y),a.addScaledVector(fo,r.z),a}static isFrontFacing(e,t,n,s){return qn.subVectors(n,t),_i.subVectors(e,t),qn.cross(_i).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return qn.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),qn.cross(_i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return kn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;Ss.subVectors(s,n),bs.subVectors(r,n),oo.subVectors(e,n);const o=Ss.dot(oo),l=bs.dot(oo);if(o<=0&&l<=0)return t.copy(n);lo.subVectors(e,s);const h=Ss.dot(lo),f=bs.dot(lo);if(h>=0&&f<=h)return t.copy(s);const u=o*f-h*l;if(u<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(Ss,a);co.subVectors(e,r);const p=Ss.dot(co),g=bs.dot(co);if(g>=0&&p<=g)return t.copy(r);const _=p*l-o*g;if(_<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector(bs,c);const m=h*g-p*f;if(m<=0&&f-h>=0&&p-g>=0)return Fc.subVectors(r,s),c=(f-h)/(f-h+(p-g)),t.copy(s).addScaledVector(Fc,c);const d=1/(m+_+u);return a=_*d,c=u*d,t.copy(n).addScaledVector(Ss,a).addScaledVector(bs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zn{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Yn):Yn.fromBufferAttribute(r,a),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)),qr.applyMatrix4(e.matrixWorld),this.union(qr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),Yr.subVectors(this.max,rr),ws.subVectors(e.a,rr),Es.subVectors(e.b,rr),Ts.subVectors(e.c,rr),Ui.subVectors(Es,ws),Fi.subVectors(Ts,Es),Qi.subVectors(ws,Ts);let t=[0,-Ui.z,Ui.y,0,-Fi.z,Fi.y,0,-Qi.z,Qi.y,Ui.z,0,-Ui.x,Fi.z,0,-Fi.x,Qi.z,0,-Qi.x,-Ui.y,Ui.x,0,-Fi.y,Fi.x,0,-Qi.y,Qi.x,0];return!po(t,ws,Es,Ts,Yr)||(t=[1,0,0,0,1,0,0,0,1],!po(t,ws,Es,Ts,Yr))?!1:(Zr.crossVectors(Ui,Fi),t=[Zr.x,Zr.y,Zr.z],po(t,ws,Es,Ts,Yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xi=[new U,new U,new U,new U,new U,new U,new U,new U],Yn=new U,qr=new zn,ws=new U,Es=new U,Ts=new U,Ui=new U,Fi=new U,Qi=new U,rr=new U,Yr=new U,Zr=new U,es=new U;function po(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){es.fromArray(i,r);const c=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),o=e.dot(es),l=t.dot(es),h=n.dot(es);if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>c)return!1}return!0}const en=new U,$r=new j;let Kf=0;class Vn extends qi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rl,this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$r.fromBufferAttribute(this,t),$r.applyMatrix3(e),this.setXY(t,$r.x,$r.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),s=Gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),s=Gt(s,this.array),r=Gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class iu extends Vn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class su extends Vn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Et extends Vn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Jf=new zn,ar=new U,mo=new U;class Ks{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Jf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ar.subVectors(e,this.center);const t=ar.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ar.copy(e.center).add(mo)),this.expandByPoint(ar.copy(e.center).sub(mo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let jf=0;const Nn=new Ft,go=new tn,As=new U,Rn=new zn,or=new zn,cn=new U;class nn extends qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Df(e)?su:iu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new pt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,n){return Nn.makeTranslation(e,t,n),this.applyMatrix4(Nn),this}scale(e,t,n){return Nn.makeScale(e,t,n),this.applyMatrix4(Nn),this}lookAt(e){return go.lookAt(e),go.updateMatrix(),this.applyMatrix4(go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Et(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Rn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];or.setFromBufferAttribute(c),this.morphTargetsRelative?(cn.addVectors(Rn.min,or.min),Rn.expandByPoint(cn),cn.addVectors(Rn.max,or.max),Rn.expandByPoint(cn)):(Rn.expandByPoint(or.min),Rn.expandByPoint(or.max))}Rn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)cn.fromBufferAttribute(c,l),o&&(As.fromBufferAttribute(e,l),cn.add(As)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Vn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let x=0;x<n.count;x++)c[x]=new U,o[x]=new U;const l=new U,h=new U,f=new U,u=new j,p=new j,g=new j,_=new U,m=new U;function d(x,A,I){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,A),f.fromBufferAttribute(n,I),u.fromBufferAttribute(r,x),p.fromBufferAttribute(r,A),g.fromBufferAttribute(r,I),h.sub(l),f.sub(l),p.sub(u),g.sub(u);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(L),m.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),c[x].add(_),c[A].add(_),c[I].add(_),o[x].add(m),o[A].add(m),o[I].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let x=0,A=M.length;x<A;++x){const I=M[x],L=I.start,z=I.count;for(let J=L,Q=L+z;J<Q;J+=3)d(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const v=new U,y=new U,w=new U,b=new U;function C(x){w.fromBufferAttribute(s,x),b.copy(w);const A=c[x];v.copy(A),v.sub(w.multiplyScalar(w.dot(A))).normalize(),y.crossVectors(b,A);const L=y.dot(o[x])<0?-1:1;a.setXYZW(x,v.x,v.y,v.z,L)}for(let x=0,A=M.length;x<A;++x){const I=M[x],L=I.start,z=I.count;for(let J=L,Q=L+z;J<Q;J+=3)C(e.getX(J+0)),C(e.getX(J+1)),C(e.getX(J+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Vn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,a=new U,c=new U,o=new U,l=new U,h=new U,f=new U;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.add(h),o.add(h),l.add(h),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(c,o){const l=c.array,h=c.itemSize,f=c.normalized,u=new l.constructor(o.length*h);let p=0,g=0;for(let _=0,m=o.length;_<m;_++){c.isInterleavedBufferAttribute?p=o[_]*c.data.stride+c.offset:p=o[_]*h;for(let d=0;d<h;d++)u[g++]=l[p++]}return new Vn(u,h,f)}if(this.index===null)return lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nn,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let h=0,f=l.length;h<f;h++){const u=l[h],p=e(u,n);o.push(p)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],h=[];for(let f=0,u=l.length;f<u;f++){const p=l[f];h.push(p.toJSON(e.data))}h.length>0&&(s[o]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rl,this.updateRanges=[],this.version=0,this.uuid=Ti()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Mn=new U;class Na{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix4(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyNormalMatrix(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.transformDirection(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=li(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),s=Gt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),s=Gt(s,this.array),r=Gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){La("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Vn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Na(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){La("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let ed=0;class Yi extends qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=zs,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ho,this.blendDst=Go,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_s,this.stencilZFail=_s,this.stencilZPass=_s,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){lt(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){lt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zs&&(n.blending=this.blending),this.side!==Gi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ho&&(n.blendSrc=this.blendSrc),this.blendDst!==Go&&(n.blendDst=this.blendDst),this.blendEquation!==is&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_s&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_s&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_s&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new gt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new j().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new j().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Gs extends Yi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Rs;const lr=new U,Cs=new U,Ps=new U,Ds=new j,cr=new j,ru=new Ft,Kr=new U,hr=new U,Jr=new U,Oc=new j,_o=new j,Bc=new j;class Pn extends tn{constructor(e=new Gs){if(super(),this.isSprite=!0,this.type="Sprite",Rs===void 0){Rs=new nn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qf(t,5);Rs.setIndex([0,1,2,0,2,3]),Rs.setAttribute("position",new Na(n,3,0,!1)),Rs.setAttribute("uv",new Na(n,2,3,!1))}this.geometry=Rs,this.material=e,this.center=new j(.5,.5),this.count=1}raycast(e,t){e.camera===null&&wt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Cs.setFromMatrixScale(this.matrixWorld),ru.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Cs.multiplyScalar(-Ps.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;jr(Kr.set(-.5,-.5,0),Ps,a,Cs,s,r),jr(hr.set(.5,-.5,0),Ps,a,Cs,s,r),jr(Jr.set(.5,.5,0),Ps,a,Cs,s,r),Oc.set(0,0),_o.set(1,0),Bc.set(1,1);let c=e.ray.intersectTriangle(Kr,hr,Jr,!1,lr);if(c===null&&(jr(hr.set(-.5,.5,0),Ps,a,Cs,s,r),_o.set(0,1),c=e.ray.intersectTriangle(Kr,Jr,hr,!1,lr),c===null))return;const o=e.ray.origin.distanceTo(lr);o<e.near||o>e.far||t.push({distance:o,point:lr.clone(),uv:kn.getInterpolation(lr,Kr,hr,Jr,Oc,_o,Bc,new j),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function jr(i,e,t,n,s,r){Ds.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(cr.x=r*Ds.x-s*Ds.y,cr.y=s*Ds.x+r*Ds.y):cr.copy(Ds),i.copy(e),i.x+=cr.x,i.y+=cr.y,i.applyMatrix4(ru)}const yi=new U,vo=new U,Qr=new U,Oi=new U,xo=new U,ea=new U,yo=new U;class Ha{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yi.copy(this.origin).addScaledVector(this.direction,t),yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){vo.copy(e).add(t).multiplyScalar(.5),Qr.copy(t).sub(e).normalize(),Oi.copy(this.origin).sub(vo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Qr),c=Oi.dot(this.direction),o=-Oi.dot(Qr),l=Oi.lengthSq(),h=Math.abs(1-a*a);let f,u,p,g;if(h>0)if(f=a*o-c,u=a*c-o,g=r*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,p=f*(f+a*u+2*c)+u*(a*f+u+2*o)+l}else u=r,f=Math.max(0,-(a*u+c)),p=-f*f+u*(u+2*o)+l;else u=-r,f=Math.max(0,-(a*u+c)),p=-f*f+u*(u+2*o)+l;else u<=-g?(f=Math.max(0,-(-a*r+c)),u=f>0?-r:Math.min(Math.max(-r,-o),r),p=-f*f+u*(u+2*o)+l):u<=g?(f=0,u=Math.min(Math.max(-r,-o),r),p=u*(u+2*o)+l):(f=Math.max(0,-(a*r+c)),u=f>0?r:Math.min(Math.max(-r,-o),r),p=-f*f+u*(u+2*o)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+c)),p=-f*f+u*(u+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(vo).addScaledVector(Qr,u),p}intersectSphere(e,t){yi.subVectors(e.center,this.origin);const n=yi.dot(this.direction),s=yi.dot(yi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(c=(e.min.z-u.z)*f,o=(e.max.z-u.z)*f):(c=(e.max.z-u.z)*f,o=(e.min.z-u.z)*f),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,yi)!==null}intersectTriangle(e,t,n,s,r){xo.subVectors(t,e),ea.subVectors(n,e),yo.crossVectors(xo,ea);let a=this.direction.dot(yo),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Oi.subVectors(this.origin,e);const o=c*this.direction.dot(ea.crossVectors(Oi,ea));if(o<0)return null;const l=c*this.direction.dot(xo.cross(Oi));if(l<0||o+l>a)return null;const h=-c*Oi.dot(yo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wi extends Yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const kc=new Ft,ts=new Ha,ta=new Ks,zc=new U,na=new U,ia=new U,sa=new U,Mo=new U,ra=new U,Vc=new U,aa=new U;class xe extends tn{constructor(e=new nn,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){ra.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const h=c[o],f=r[o];h!==0&&(Mo.fromBufferAttribute(f,e),a?ra.addScaledVector(Mo,h):ra.addScaledVector(Mo.sub(t),h))}t.add(ra)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(r),ts.copy(e.ray).recast(e.near),!(ta.containsPoint(ts.origin)===!1&&(ts.intersectSphere(ta,zc)===null||ts.origin.distanceToSquared(zc)>(e.far-e.near)**2))&&(kc.copy(r).invert(),ts.copy(e.ray).applyMatrix4(kc),!(n.boundingBox!==null&&ts.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ts)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],d=a[m.materialIndex],M=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,w=v;y<w;y+=3){const b=c.getX(y),C=c.getX(y+1),x=c.getX(y+2);s=oa(this,d,e,n,l,h,f,b,C,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const M=c.getX(m),v=c.getX(m+1),y=c.getX(m+2);s=oa(this,a,e,n,l,h,f,M,v,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],d=a[m.materialIndex],M=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,w=v;y<w;y+=3){const b=y,C=y+1,x=y+2;s=oa(this,d,e,n,l,h,f,b,C,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const M=m,v=m+1,y=m+2;s=oa(this,a,e,n,l,h,f,M,v,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function td(i,e,t,n,s,r,a,c){let o;if(e.side===bn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===Gi,c),o===null)return null;aa.copy(c),aa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(aa);return l<t.near||l>t.far?null:{distance:l,point:aa.clone(),object:i}}function oa(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,na),i.getVertexPosition(o,ia),i.getVertexPosition(l,sa);const h=td(i,e,t,n,na,ia,sa,Vc);if(h){const f=new U;kn.getBarycoord(Vc,na,ia,sa,f),s&&(h.uv=kn.getInterpolatedAttribute(s,c,o,l,f,new j)),r&&(h.uv1=kn.getInterpolatedAttribute(r,c,o,l,f,new j)),a&&(h.normal=kn.getInterpolatedAttribute(a,c,o,l,f,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:c,b:o,c:l,normal:new U,materialIndex:0};kn.getNormal(na,ia,sa,u.normal),h.face=u,h.barycoord=f}return h}class au extends yn{constructor(e=null,t=1,n=1,s,r,a,c,o,l=un,h=un,f,u){super(null,a,c,o,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hc extends Vn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Is=new Ft,Gc=new Ft,la=[],Wc=new zn,nd=new Ft,ur=new xe,fr=new Ks;class ou extends xe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Hc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,nd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Is),Wc.copy(e.boundingBox).applyMatrix4(Is),this.boundingBox.union(Wc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ks),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Is),fr.copy(e.boundingSphere).applyMatrix4(Is),this.boundingSphere.union(fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ur.geometry=this.geometry,ur.material=this.material,ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fr.copy(this.boundingSphere),fr.applyMatrix4(n),e.ray.intersectsSphere(fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Is),Gc.multiplyMatrices(n,Is),ur.matrixWorld=Gc,ur.raycast(e,la);for(let a=0,c=la.length;a<c;a++){const o=la[a];o.instanceId=r,o.object=this,t.push(o)}la.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Hc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new au(new Float32Array(s*this.count),s,this.count,Xl,$n));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const So=new U,id=new U,sd=new pt;class Si{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=So.subVectors(n,t).cross(id.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(So),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||sd.getNormalMatrix(e),s=this.coplanarPoint(So).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ns=new Ks,rd=new j(.5,.5),ca=new U;class Ql{constructor(e=new Si,t=new Si,n=new Si,s=new Si,r=new Si,a=new Si){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hi,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],h=r[4],f=r[5],u=r[6],p=r[7],g=r[8],_=r[9],m=r[10],d=r[11],M=r[12],v=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,p-h,d-g,w-M).normalize(),s[1].setComponents(l+a,p+h,d+g,w+M).normalize(),s[2].setComponents(l+c,p+f,d+_,w+v).normalize(),s[3].setComponents(l-c,p-f,d-_,w-v).normalize(),n)s[4].setComponents(o,u,m,y).normalize(),s[5].setComponents(l-o,p-u,d-m,w-y).normalize();else if(s[4].setComponents(l-o,p-u,d-m,w-y).normalize(),t===hi)s[5].setComponents(l+o,p+u,d+m,w+y).normalize();else if(t===Ar)s[5].setComponents(o,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ns.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ns)}intersectsSprite(e){ns.center.set(0,0,0);const t=rd.distanceTo(e.center);return ns.radius=.7071067811865476+t,ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(ns)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ca.x=s.normal.x>0?e.max.x:e.min.x,ca.y=s.normal.y>0?e.max.y:e.min.y,ca.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ca)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lu extends Yi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ua=new U,Fa=new U,Xc=new Ft,dr=new Ha,ha=new Ks,bo=new U,qc=new U;class ad extends tn{constructor(e=new nn,t=new lu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ua.fromBufferAttribute(t,s-1),Fa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ua.distanceTo(Fa);e.setAttribute("lineDistance",new Et(n,1))}else lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,e.ray.intersectsSphere(ha)===!1)return;Xc.copy(s).invert(),dr.copy(e.ray).applyMatrix4(Xc);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const d=h.getX(_),M=h.getX(_+1),v=ua(this,e,dr,o,d,M,_);v&&t.push(v)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),d=ua(this,e,dr,o,_,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const d=ua(this,e,dr,o,_,_+1,_);d&&t.push(d)}if(this.isLineLoop){const _=ua(this,e,dr,o,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function ua(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(Ua.fromBufferAttribute(c,s),Fa.fromBufferAttribute(c,r),t.distanceSqToSegment(Ua,Fa,bo,qc)>n)return;bo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(bo);if(!(l<e.near||l>e.far))return{distance:l,point:qc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class cu extends yn{constructor(e=[],t=os,n,s,r,a,c,o,l,h){super(e,t,n,s,r,a,c,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rr extends yn{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ys extends yn{constructor(e,t,n=di,s,r,a,c=un,o=un,l,h=Ci,f=1){if(h!==Ci&&h!==as)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,c,o,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class od extends Ys{constructor(e,t=di,n=os,s,r,a=un,c=un,o,l=Ci){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,c,o,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class hu extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ke extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],h=[],f=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(f,2));function g(_,m,d,M,v,y,w,b,C,x,A){const I=y/C,L=w/x,z=y/2,J=w/2,Q=b/2,B=C+1,q=x+1;let W=0,ne=0;const ae=new U;for(let fe=0;fe<q;fe++){const me=fe*L-J;for(let Y=0;Y<B;Y++){const ue=Y*I-z;ae[_]=ue*M,ae[m]=me*v,ae[d]=Q,l.push(ae.x,ae.y,ae.z),ae[_]=0,ae[m]=0,ae[d]=b>0?1:-1,h.push(ae.x,ae.y,ae.z),f.push(Y/C),f.push(1-fe/x),W+=1}}for(let fe=0;fe<x;fe++)for(let me=0;me<C;me++){const Y=u+me+B*fe,ue=u+me+B*(fe+1),Fe=u+(me+1)+B*(fe+1),Te=u+(me+1)+B*fe;o.push(Y,ue,Te),o.push(ue,Fe,Te),ne+=6}c.addGroup(p,ne,A),p+=ne,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ke(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ci extends nn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new U,h=new j;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const p=n+f/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),c.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,o.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Et(a,3)),this.setAttribute("normal",new Et(c,3)),this.setAttribute("uv",new Et(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class G extends nn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],p=[];let g=0;const _=[],m=n/2;let d=0;M(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Et(f,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(p,2));function M(){const y=new U,w=new U;let b=0;const C=(t-e)/n;for(let x=0;x<=r;x++){const A=[],I=x/r,L=I*(t-e)+e;for(let z=0;z<=s;z++){const J=z/s,Q=J*o+c,B=Math.sin(Q),q=Math.cos(Q);w.x=L*B,w.y=-I*n+m,w.z=L*q,f.push(w.x,w.y,w.z),y.set(B,C,q).normalize(),u.push(y.x,y.y,y.z),p.push(J,1-I),A.push(g++)}_.push(A)}for(let x=0;x<s;x++)for(let A=0;A<r;A++){const I=_[A][x],L=_[A+1][x],z=_[A+1][x+1],J=_[A][x+1];(e>0||A!==0)&&(h.push(I,L,J),b+=3),(t>0||A!==r-1)&&(h.push(L,z,J),b+=3)}l.addGroup(d,b,0),d+=b}function v(y){const w=g,b=new j,C=new U;let x=0;const A=y===!0?e:t,I=y===!0?1:-1;for(let z=1;z<=s;z++)f.push(0,m*I,0),u.push(0,I,0),p.push(.5,.5),g++;const L=g;for(let z=0;z<=s;z++){const Q=z/s*o+c,B=Math.cos(Q),q=Math.sin(Q);C.x=A*q,C.y=m*I,C.z=A*B,f.push(C.x,C.y,C.z),u.push(0,I,0),b.x=B*.5+.5,b.y=q*.5*I+.5,p.push(b.x,b.y),g++}for(let z=0;z<s;z++){const J=w+z,Q=L+z;y===!0?h.push(Q,Q+1,J):h.push(Q+1,Q,J),x+=3}l.addGroup(d,x,y===!0?1:2),d+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new G(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bn extends G{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new Bn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ec extends nn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),h(),this.setAttribute("position",new Et(r,3)),this.setAttribute("normal",new Et(r.slice(),3)),this.setAttribute("uv",new Et(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(M){const v=new U,y=new U,w=new U;for(let b=0;b<t.length;b+=3)p(t[b+0],v),p(t[b+1],y),p(t[b+2],w),o(v,y,w,M)}function o(M,v,y,w){const b=w+1,C=[];for(let x=0;x<=b;x++){C[x]=[];const A=M.clone().lerp(y,x/b),I=v.clone().lerp(y,x/b),L=b-x;for(let z=0;z<=L;z++)z===0&&x===b?C[x][z]=A:C[x][z]=A.clone().lerp(I,z/L)}for(let x=0;x<b;x++)for(let A=0;A<2*(b-x)-1;A++){const I=Math.floor(A/2);A%2===0?(u(C[x][I+1]),u(C[x+1][I]),u(C[x][I])):(u(C[x][I+1]),u(C[x+1][I+1]),u(C[x+1][I]))}}function l(M){const v=new U;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(M),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function h(){const M=new U;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];const y=m(M)/2/Math.PI+.5,w=d(M)/Math.PI+.5;a.push(y,1-w)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){const v=a[M+0],y=a[M+2],w=a[M+4],b=Math.max(v,y,w),C=Math.min(v,y,w);b>.9&&C<.1&&(v<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function p(M,v){const y=M*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function g(){const M=new U,v=new U,y=new U,w=new U,b=new j,C=new j,x=new j;for(let A=0,I=0;A<r.length;A+=9,I+=6){M.set(r[A+0],r[A+1],r[A+2]),v.set(r[A+3],r[A+4],r[A+5]),y.set(r[A+6],r[A+7],r[A+8]),b.set(a[I+0],a[I+1]),C.set(a[I+2],a[I+3]),x.set(a[I+4],a[I+5]),w.copy(M).add(v).add(y).divideScalar(3);const L=m(w);_(b,I+0,M,L),_(C,I+2,v,L),_(x,I+4,y,L)}}function _(M,v,y,w){w<0&&M.x===1&&(a[v]=M.x-1),y.x===0&&y.z===0&&(a[v]=w/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function d(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.vertices,e.indices,e.radius,e.detail)}}class tc extends ec{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new tc(e.radius,e.detail)}}class Jn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){lt("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,p=(a-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new j:new U);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new U,s=[],r=[],a=[],c=new U,o=new Ft;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new U)}r[0]=new U,a[0]=new U;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),c.crossVectors(s[p-1],s[p]),c.length()>Number.EPSILON){c.normalize();const g=Math.acos(xt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(o.makeRotationAxis(c,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(xt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class nc extends Jn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new j){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=o-this.aX,p=l-this.aY;o=u*h-p*f+this.aX,l=u*f+p*h+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ld extends nc{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ic(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,h,f){let u=(a-r)/l-(c-r)/(l+h)+(c-a)/h,p=(c-a)/h-(o-a)/(h+f)+(o-c)/f;u*=h,p*=h,s(a,c,u,p)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const Yc=new U,Zc=new U,wo=new ic,Eo=new ic,To=new ic;class Pl extends Jn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new U){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,h;this.closed||c>0?l=s[(c-1)%r]:(Zc.subVectors(s[0],s[1]).add(s[0]),l=Zc);const f=s[c%r],u=s[(c+1)%r];if(this.closed||c+2<r?h=s[(c+2)%r]:(Yc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Yc),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),p),_=Math.pow(f.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),wo.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,g,_,m),Eo.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,g,_,m),To.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(wo.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Eo.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),To.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(wo.calc(o),Eo.calc(o),To.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new U().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function $c(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function cd(i,e){const t=1-i;return t*t*e}function hd(i,e){return 2*(1-i)*i*e}function ud(i,e){return i*i*e}function br(i,e,t,n){return cd(i,e)+hd(i,t)+ud(i,n)}function fd(i,e){const t=1-i;return t*t*t*e}function dd(i,e){const t=1-i;return 3*t*t*i*e}function pd(i,e){return 3*(1-i)*i*i*e}function md(i,e){return i*i*i*e}function wr(i,e,t,n,s){return fd(i,e)+dd(i,t)+pd(i,n)+md(i,s)}class uu extends Jn{constructor(e=new j,t=new j,n=new j,s=new j){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new j){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(wr(e,s.x,r.x,a.x,c.x),wr(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class gd extends Jn{constructor(e=new U,t=new U,n=new U,s=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(wr(e,s.x,r.x,a.x,c.x),wr(e,s.y,r.y,a.y,c.y),wr(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fu extends Jn{constructor(e=new j,t=new j){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new j){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new j){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _d extends Jn{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class du extends Jn{constructor(e=new j,t=new j,n=new j){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new j){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(br(e,s.x,r.x,a.x),br(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sc extends Jn{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(br(e,s.x,r.x,a.x),br(e,s.y,r.y,a.y),br(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pu extends Jn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new j){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set($c(c,o.x,l.x,h.x,f.x),$c(c,o.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new j().fromArray(s))}return this}}var Oa=Object.freeze({__proto__:null,ArcCurve:ld,CatmullRomCurve3:Pl,CubicBezierCurve:uu,CubicBezierCurve3:gd,EllipseCurve:nc,LineCurve:fu,LineCurve3:_d,QuadraticBezierCurve:du,QuadraticBezierCurve3:sc,SplineCurve:pu});class vd extends Jn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Oa[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const h=o[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Oa[s.type]().fromJSON(s))}return this}}class Dl extends vd{constructor(e){super(),this.type="Path",this.currentPoint=new j,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new fu(this.currentPoint.clone(),new j(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new du(this.currentPoint.clone(),new j(e,t),new j(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new uu(this.currentPoint.clone(),new j(e,t),new j(n,s),new j(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new pu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new nc(e,t,n,s,r,a,c,o);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class zi extends Dl{constructor(e){super(e),this.uuid=Ti(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Dl().fromJSON(s))}return this}}function xd(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=mu(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=wd(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let h=c,f=o;for(let u=t;u<s;u+=t){const p=i[u],g=i[u+1];p<c&&(c=p),g<o&&(o=g),p>h&&(h=p),g>f&&(f=g)}l=Math.max(h-c,f-o),l=l!==0?32767/l:0}return Cr(r,a,t,c,o,l,0),a}function mu(i,e,t,n,s){let r;if(s===Ud(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Kc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Kc(a/n|0,i[a],i[a+1],r);return r&&Zs(r,r.next)&&(Dr(r),r=r.next),r}function cs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Zs(t,t.next)||jt(t.prev,t,t.next)===0)){if(Dr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Cr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Cd(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?Md(i,n,s,r):yd(i)){e.push(o.i,i.i,l.i),Dr(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=Sd(cs(i),e),Cr(i,e,t,n,s,r,2)):a===2&&bd(i,e,t,n,s,r):Cr(cs(i),e,t,n,s,r,1);break}}}function yd(i){const e=i.prev,t=i,n=i.next;if(jt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,h=Math.min(s,r,a),f=Math.min(c,o,l),u=Math.max(s,r,a),p=Math.max(c,o,l);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=p&&xr(s,c,r,o,a,l,g.x,g.y)&&jt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Md(i,e,t,n){const s=i.prev,r=i,a=i.next;if(jt(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,h=s.y,f=r.y,u=a.y,p=Math.min(c,o,l),g=Math.min(h,f,u),_=Math.max(c,o,l),m=Math.max(h,f,u),d=Il(p,g,e,t,n),M=Il(_,m,e,t,n);let v=i.prevZ,y=i.nextZ;for(;v&&v.z>=d&&y&&y.z<=M;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&xr(c,h,o,f,l,u,v.x,v.y)&&jt(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&xr(c,h,o,f,l,u,y.x,y.y)&&jt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=d;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==a&&xr(c,h,o,f,l,u,v.x,v.y)&&jt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=M;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&xr(c,h,o,f,l,u,y.x,y.y)&&jt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Sd(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Zs(n,s)&&_u(n,t,t.next,s)&&Pr(n,s)&&Pr(s,n)&&(e.push(n.i,t.i,s.i),Dr(t),Dr(t.next),t=i=s),t=t.next}while(t!==i);return cs(t)}function bd(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&Id(a,c)){let o=vu(a,c);a=cs(a,a.next),o=cs(o,o.next),Cr(a,e,t,n,s,r,0),Cr(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function wd(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=mu(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(Dd(l))}s.sort(Ed);for(let r=0;r<s.length;r++)t=Td(s[r],t);return t}function Ed(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Td(i,e){const t=Ad(i,e);if(!t)return e;const n=vu(t,i);return cs(n,n.next),cs(t,t.next)}function Ad(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Zs(i,t))return t;do{if(Zs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&gu(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const f=Math.abs(s-t.y)/(n-t.x);Pr(t,i)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&Rd(a,t)))&&(a=t,h=f)}t=t.next}while(t!==c);return a}function Rd(i,e){return jt(i.prev,i,e.prev)<0&&jt(e.next,i,i.next)<0}function Cd(i,e,t,n){let s=i;do s.z===0&&(s.z=Il(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Pd(s)}function Pd(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Il(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Dd(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function gu(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function xr(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&gu(i,e,t,n,s,r,a,c)}function Id(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Ld(i,e)&&(Pr(i,e)&&Pr(e,i)&&Nd(i,e)&&(jt(i.prev,i,e.prev)||jt(i,e.prev,e))||Zs(i,e)&&jt(i.prev,i,i.next)>0&&jt(e.prev,e,e.next)>0)}function jt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Zs(i,e){return i.x===e.x&&i.y===e.y}function _u(i,e,t,n){const s=da(jt(i,e,t)),r=da(jt(i,e,n)),a=da(jt(t,n,i)),c=da(jt(t,n,e));return!!(s!==r&&a!==c||s===0&&fa(i,t,e)||r===0&&fa(i,n,e)||a===0&&fa(t,i,n)||c===0&&fa(t,e,n))}function fa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function da(i){return i>0?1:i<0?-1:0}function Ld(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&_u(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Pr(i,e){return jt(i.prev,i,i.next)<0?jt(i,e,i.next)>=0&&jt(i,i.prev,e)>=0:jt(i,e,i.prev)<0||jt(i,i.next,e)<0}function Nd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function vu(i,e){const t=Ll(i.i,i.x,i.y),n=Ll(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Kc(i,e,t,n){const s=Ll(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Dr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ll(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ud(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Fd{static triangulate(e,t,n=2){return xd(e,t,n)}}class Bs{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Bs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Jc(e),jc(n,e);let a=e.length;t.forEach(Jc);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,jc(n,t[o]);const c=Fd.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function Jc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function jc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Mi extends nn{constructor(e=new zi([new j(.5,.5),new j(-.5,.5),new j(-.5,-.5),new j(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new Et(s,3)),this.setAttribute("uv",new Et(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const d=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Od;let v,y=!1,w,b,C,x;if(d){v=d.getSpacedPoints(h),y=!0,u=!1;const oe=d.isCatmullRomCurve3?d.closed:!1;w=d.computeFrenetFrames(h,oe),b=new U,C=new U,x=new U}u||(m=0,p=0,g=0,_=0);const A=c.extractPoints(l);let I=A.shape;const L=A.holes;if(!Bs.isClockWise(I)){I=I.reverse();for(let oe=0,pe=L.length;oe<pe;oe++){const _e=L[oe];Bs.isClockWise(_e)&&(L[oe]=_e.reverse())}}function J(oe){const _e=10000000000000001e-36;let Se=oe[0];for(let Me=1;Me<=oe.length;Me++){const nt=Me%oe.length,Ye=oe[nt],ot=Ye.x-Se.x,ct=Ye.y-Se.y,k=ot*ot+ct*ct,Ct=Math.max(Math.abs(Ye.x),Math.abs(Ye.y),Math.abs(Se.x),Math.abs(Se.y)),Mt=_e*Ct*Ct;if(k<=Mt){oe.splice(nt,1),Me--;continue}Se=Ye}}J(I),L.forEach(J);const Q=L.length,B=I;for(let oe=0;oe<Q;oe++){const pe=L[oe];I=I.concat(pe)}function q(oe,pe,_e){return pe||wt("ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(pe,_e)}const W=I.length;function ne(oe,pe,_e){let Se,Me,nt;const Ye=oe.x-pe.x,ot=oe.y-pe.y,ct=_e.x-oe.x,k=_e.y-oe.y,Ct=Ye*Ye+ot*ot,Mt=Ye*k-ot*ct;if(Math.abs(Mt)>Number.EPSILON){const P=Math.sqrt(Ct),S=Math.sqrt(ct*ct+k*k),X=pe.x-ot/P,$=pe.y+Ye/P,re=_e.x-k/S,de=_e.y+ct/S,we=((re-X)*k-(de-$)*ct)/(Ye*k-ot*ct);Se=X+Ye*we-oe.x,Me=$+ot*we-oe.y;const se=Se*Se+Me*Me;if(se<=2)return new j(Se,Me);nt=Math.sqrt(se/2)}else{let P=!1;Ye>Number.EPSILON?ct>Number.EPSILON&&(P=!0):Ye<-Number.EPSILON?ct<-Number.EPSILON&&(P=!0):Math.sign(ot)===Math.sign(k)&&(P=!0),P?(Se=-ot,Me=Ye,nt=Math.sqrt(Ct)):(Se=Ye,Me=ot,nt=Math.sqrt(Ct/2))}return new j(Se/nt,Me/nt)}const ae=[];for(let oe=0,pe=B.length,_e=pe-1,Se=oe+1;oe<pe;oe++,_e++,Se++)_e===pe&&(_e=0),Se===pe&&(Se=0),ae[oe]=ne(B[oe],B[_e],B[Se]);const fe=[];let me,Y=ae.concat();for(let oe=0,pe=Q;oe<pe;oe++){const _e=L[oe];me=[];for(let Se=0,Me=_e.length,nt=Me-1,Ye=Se+1;Se<Me;Se++,nt++,Ye++)nt===Me&&(nt=0),Ye===Me&&(Ye=0),me[Se]=ne(_e[Se],_e[nt],_e[Ye]);fe.push(me),Y=Y.concat(me)}let ue;if(m===0)ue=Bs.triangulateShape(B,L);else{const oe=[],pe=[];for(let _e=0;_e<m;_e++){const Se=_e/m,Me=p*Math.cos(Se*Math.PI/2),nt=g*Math.sin(Se*Math.PI/2)+_;for(let Ye=0,ot=B.length;Ye<ot;Ye++){const ct=q(B[Ye],ae[Ye],nt);Ce(ct.x,ct.y,-Me),Se===0&&oe.push(ct)}for(let Ye=0,ot=Q;Ye<ot;Ye++){const ct=L[Ye];me=fe[Ye];const k=[];for(let Ct=0,Mt=ct.length;Ct<Mt;Ct++){const P=q(ct[Ct],me[Ct],nt);Ce(P.x,P.y,-Me),Se===0&&k.push(P)}Se===0&&pe.push(k)}}ue=Bs.triangulateShape(oe,pe)}const Fe=ue.length,Te=g+_;for(let oe=0;oe<W;oe++){const pe=u?q(I[oe],Y[oe],Te):I[oe];y?(C.copy(w.normals[0]).multiplyScalar(pe.x),b.copy(w.binormals[0]).multiplyScalar(pe.y),x.copy(v[0]).add(C).add(b),Ce(x.x,x.y,x.z)):Ce(pe.x,pe.y,0)}for(let oe=1;oe<=h;oe++)for(let pe=0;pe<W;pe++){const _e=u?q(I[pe],Y[pe],Te):I[pe];y?(C.copy(w.normals[oe]).multiplyScalar(_e.x),b.copy(w.binormals[oe]).multiplyScalar(_e.y),x.copy(v[oe]).add(C).add(b),Ce(x.x,x.y,x.z)):Ce(_e.x,_e.y,f/h*oe)}for(let oe=m-1;oe>=0;oe--){const pe=oe/m,_e=p*Math.cos(pe*Math.PI/2),Se=g*Math.sin(pe*Math.PI/2)+_;for(let Me=0,nt=B.length;Me<nt;Me++){const Ye=q(B[Me],ae[Me],Se);Ce(Ye.x,Ye.y,f+_e)}for(let Me=0,nt=L.length;Me<nt;Me++){const Ye=L[Me];me=fe[Me];for(let ot=0,ct=Ye.length;ot<ct;ot++){const k=q(Ye[ot],me[ot],Se);y?Ce(k.x,k.y+v[h-1].y,v[h-1].x+_e):Ce(k.x,k.y,f+_e)}}}ie(),ye();function ie(){const oe=s.length/3;if(u){let pe=0,_e=W*pe;for(let Se=0;Se<Fe;Se++){const Me=ue[Se];Ve(Me[2]+_e,Me[1]+_e,Me[0]+_e)}pe=h+m*2,_e=W*pe;for(let Se=0;Se<Fe;Se++){const Me=ue[Se];Ve(Me[0]+_e,Me[1]+_e,Me[2]+_e)}}else{for(let pe=0;pe<Fe;pe++){const _e=ue[pe];Ve(_e[2],_e[1],_e[0])}for(let pe=0;pe<Fe;pe++){const _e=ue[pe];Ve(_e[0]+W*h,_e[1]+W*h,_e[2]+W*h)}}n.addGroup(oe,s.length/3-oe,0)}function ye(){const oe=s.length/3;let pe=0;ge(B,pe),pe+=B.length;for(let _e=0,Se=L.length;_e<Se;_e++){const Me=L[_e];ge(Me,pe),pe+=Me.length}n.addGroup(oe,s.length/3-oe,1)}function ge(oe,pe){let _e=oe.length;for(;--_e>=0;){const Se=_e;let Me=_e-1;Me<0&&(Me=oe.length-1);for(let nt=0,Ye=h+m*2;nt<Ye;nt++){const ot=W*nt,ct=W*(nt+1),k=pe+Se+ot,Ct=pe+Me+ot,Mt=pe+Me+ct,P=pe+Se+ct;Be(k,Ct,Mt,P)}}}function Ce(oe,pe,_e){o.push(oe),o.push(pe),o.push(_e)}function Ve(oe,pe,_e){st(oe),st(pe),st(_e);const Se=s.length/3,Me=M.generateTopUV(n,s,Se-3,Se-2,Se-1);Ge(Me[0]),Ge(Me[1]),Ge(Me[2])}function Be(oe,pe,_e,Se){st(oe),st(pe),st(Se),st(pe),st(_e),st(Se);const Me=s.length/3,nt=M.generateSideWallUV(n,s,Me-6,Me-3,Me-2,Me-1);Ge(nt[0]),Ge(nt[1]),Ge(nt[3]),Ge(nt[1]),Ge(nt[2]),Ge(nt[3])}function st(oe){s.push(o[oe*3+0]),s.push(o[oe*3+1]),s.push(o[oe*3+2])}function Ge(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Bd(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Oa[s.type]().fromJSON(s)),new Mi(n,e.options)}}const Od={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new j(r,a),new j(c,o),new j(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[s*3],p=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],d=e[r*3+2];return Math.abs(c-h)<Math.abs(a-l)?[new j(a,1-o),new j(l,1-f),new j(u,1-g),new j(_,1-d)]:[new j(c,1-o),new j(h,1-f),new j(p,1-g),new j(m,1-d)]}};function Bd(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ri extends nn{constructor(e=[new j(0,-.5),new j(.5,0),new j(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=xt(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],h=1/t,f=new U,u=new j,p=new U,g=new U,_=new U;let m=0,d=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:m=e[M+1].x-e[M].x,d=e[M+1].y-e[M].y,p.x=d*1,p.y=-m,p.z=d*0,_.copy(p),p.normalize(),o.push(p.x,p.y,p.z);break;case e.length-1:o.push(_.x,_.y,_.z);break;default:m=e[M+1].x-e[M].x,d=e[M+1].y-e[M].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),o.push(p.x,p.y,p.z),_.copy(g)}for(let M=0;M<=t;M++){const v=n+M*h*s,y=Math.sin(v),w=Math.cos(v);for(let b=0;b<=e.length-1;b++){f.x=e[b].x*y,f.y=e[b].y,f.z=e[b].x*w,a.push(f.x,f.y,f.z),u.x=M/t,u.y=b/(e.length-1),c.push(u.x,u.y);const C=o[3*b+0]*y,x=o[3*b+1],A=o[3*b+0]*w;l.push(C,x,A)}}for(let M=0;M<t;M++)for(let v=0;v<e.length-1;v++){const y=v+M*e.length,w=y,b=y+e.length,C=y+e.length+1,x=y+1;r.push(w,b,x),r.push(C,x,b)}this.setIndex(r),this.setAttribute("position",new Et(a,3)),this.setAttribute("uv",new Et(c,2)),this.setAttribute("normal",new Et(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ri(e.points,e.segments,e.phiStart,e.phiLength)}}class fn extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,h=o+1,f=e/c,u=t/o,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const M=d*u-a;for(let v=0;v<l;v++){const y=v*f-r;g.push(y,-M,0),_.push(0,0,1),m.push(v/c),m.push(1-d/o)}}for(let d=0;d<o;d++)for(let M=0;M<c;M++){const v=M+l*d,y=M+l*(d+1),w=M+1+l*(d+1),b=M+1+l*d;p.push(v,y,b),p.push(y,w,b)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(_,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fn(e.width,e.height,e.widthSegments,e.heightSegments)}}class xu extends nn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],h=[];let f=e;const u=(t-e)/s,p=new U,g=new j;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),o.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}f+=u}for(let _=0;_<s;_++){const m=_*(n+1);for(let d=0;d<n;d++){const M=d+m,v=M,y=M+n+1,w=M+n+2,b=M+1;c.push(v,y,b),c.push(y,w,b)}}this.setIndex(c),this.setAttribute("position",new Et(o,3)),this.setAttribute("normal",new Et(l,3)),this.setAttribute("uv",new Et(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Xt extends nn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const h=[],f=new U,u=new U,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const M=[],v=d/n,y=a+v*c,w=e*Math.cos(y),b=Math.sqrt(e*e-w*w);let C=0;d===0&&a===0?C=.5/t:d===n&&o===Math.PI&&(C=-.5/t);for(let x=0;x<=t;x++){const A=x/t,I=s+A*r;f.x=-b*Math.cos(I),f.y=w,f.z=b*Math.sin(I),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(A+C,1-v),M.push(l++)}h.push(M)}for(let d=0;d<n;d++)for(let M=0;M<t;M++){const v=h[d][M+1],y=h[d][M],w=h[d+1][M],b=h[d+1][M+1];(d!==0||a>0)&&p.push(v,y,b),(d!==n-1||o<Math.PI)&&p.push(y,w,b)}this.setIndex(p),this.setAttribute("position",new Et(g,3)),this.setAttribute("normal",new Et(_,3)),this.setAttribute("uv",new Et(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Lt extends nn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],h=[],f=[],u=new U,p=new U,g=new U;for(let _=0;_<=n;_++){const m=a+_/n*c;for(let d=0;d<=s;d++){const M=d/s*r;p.x=(e+t*Math.cos(m))*Math.cos(M),p.y=(e+t*Math.cos(m))*Math.sin(M),p.z=t*Math.sin(m),l.push(p.x,p.y,p.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),g.subVectors(p,u).normalize(),h.push(g.x,g.y,g.z),f.push(d/s),f.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const d=(s+1)*_+m-1,M=(s+1)*(_-1)+m-1,v=(s+1)*(_-1)+m,y=(s+1)*_+m;o.push(d,M,y),o.push(M,v,y)}this.setIndex(o),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class bi extends nn{constructor(e=new sc(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new U,o=new U,l=new j;let h=new U;const f=[],u=[],p=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Et(f,3)),this.setAttribute("normal",new Et(u,3)),this.setAttribute("uv",new Et(p,2));function _(){for(let v=0;v<t;v++)m(v);m(r===!1?t:0),M(),d()}function m(v){h=e.getPointAt(v/t,h);const y=a.normals[v],w=a.binormals[v];for(let b=0;b<=s;b++){const C=b/s*Math.PI*2,x=Math.sin(C),A=-Math.cos(C);o.x=A*y.x+x*w.x,o.y=A*y.y+x*w.y,o.z=A*y.z+x*w.z,o.normalize(),u.push(o.x,o.y,o.z),c.x=h.x+n*o.x,c.y=h.y+n*o.y,c.z=h.z+n*o.z,f.push(c.x,c.y,c.z)}}function d(){for(let v=1;v<=t;v++)for(let y=1;y<=s;y++){const w=(s+1)*(v-1)+(y-1),b=(s+1)*v+(y-1),C=(s+1)*v+y,x=(s+1)*(v-1)+y;g.push(w,b,x),g.push(b,C,x)}}function M(){for(let v=0;v<=t;v++)for(let y=0;y<=s;y++)l.x=v/t,l.y=y/s,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new bi(new Oa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function $s(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Qc(s))s.isRenderTargetTexture?(lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Qc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Sn(i){const e={};for(let t=0;t<i.length;t++){const n=$s(i[t]);for(const s in n)e[s]=n[s]}return e}function Qc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function kd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function yu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const zd={clone:$s,merge:Sn};var Vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends Yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vd,this.fragmentShader=Hd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$s(e.uniforms),this.uniformsGroups=kd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new gt().setHex(s.value);break;case"v2":this.uniforms[n].value=new j().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Jt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new pt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ft().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Gd extends pi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class te extends Yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ca,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xi extends te{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new j(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new gt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new gt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new gt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Wd extends Yi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ca,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Di,this.combine=zl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xd extends Yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qd extends Yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Dx extends lu{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class rc extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new gt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Mu extends rc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new gt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ao=new Ft,eh=new U,th=new U;class Su{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new j(512,512),this.mapType=In,this.map=null,this.mapPass=null,this.matrix=new Ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ql,this._frameExtents=new j(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;eh.setFromMatrixPosition(e.matrixWorld),t.position.copy(eh),th.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(th),t.updateMatrixWorld(),Ao.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ao,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Ar||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ao)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const pa=new U,ma=new Pi,ni=new U;class bu extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(pa,ma,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pa,ma,ni.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(pa,ma,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pa,ma,ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Bi=new U,nh=new j,ih=new j;class Dn extends bu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ea*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cl*2*Math.atan(Math.tan(Ea*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z),Bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bi.x,Bi.y).multiplyScalar(-e/Bi.z)}getViewSize(e,t){return this.getViewBounds(e,nh,ih),t.subVectors(ih,nh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ea*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Yd extends Su{constructor(){super(new Dn(90,1,.5,500)),this.isPointLightShadow=!0}}class wu extends rc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Yd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ac extends bu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=h*this.view.offsetY,o=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zd extends Su{constructor(){super(new ac(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ba extends rc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new Zd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Ls=-90,Ns=1;class $d extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Dn(Ls,Ns,e,t);s.layers=this.layers,this.add(s);const r=new Dn(Ls,Ns,e,t);r.layers=this.layers,this.add(r);const a=new Dn(Ls,Ns,e,t);a.layers=this.layers,this.add(a);const c=new Dn(Ls,Ns,e,t);c.layers=this.layers,this.add(c);const o=new Dn(Ls,Ns,e,t);o.layers=this.layers,this.add(o);const l=new Dn(Ls,Ns,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===hi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Kd extends Dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Jd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=jd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function jd(){this._document.hidden===!1&&this.reset()}const sh=new Ft;class Qd{constructor(e,t,n=0,s=1/0){this.ray=new Ha(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new jl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):wt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return sh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sh),this}intersectObject(e,t=!0,n=[]){return Nl(e,this,n,t),n.sort(rh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Nl(e[s],this,n,t);return n.sort(rh),n}}function rh(i,e){return i.distance-e.distance}function Nl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)Nl(r[a],e,t,!0)}}class ah{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=xt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const fc=class fc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};fc.prototype.isMatrix2=!0;let oh=fc;class ep extends qi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){lt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function lh(i,e,t,n){const s=tp(n);switch(t){case Jh:return i*e;case Xl:return i*e/s.components*s.byteLength;case ql:return i*e/s.components*s.byteLength;case ls:return i*e*2/s.components*s.byteLength;case Yl:return i*e*2/s.components*s.byteLength;case jh:return i*e*3/s.components*s.byteLength;case Kn:return i*e*4/s.components*s.byteLength;case Zl:return i*e*4/s.components*s.byteLength;case Ma:case Sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ba:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qo:case tl:return Math.max(i,16)*Math.max(e,8)/4;case jo:case el:return Math.max(i,8)*Math.max(e,8)/2;case nl:case il:case rl:case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sl:case Aa:case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Sl:case bl:case wl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case El:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ra:case Al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tp(i){switch(i){case In:case Yh:return{byteLength:1,components:1};case Er:case Zh:case Ri:return{byteLength:2,components:1};case Gl:case Wl:return{byteLength:2,components:4};case di:case Hl:case $n:return{byteLength:4,components:1};case $h:case Kh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kl}}));typeof window<"u"&&(window.__THREE__?lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Eu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function np(i){const e=new WeakMap;function t(c,o){const l=c.array,h=c.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(o,u),i.bufferData(o,l,h),c.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:f}}function n(c,o,l){const h=o.array,f=o.updateRanges;if(i.bindBuffer(l,c),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){const g=f[u],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){const _=f[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sp=`#ifdef USE_ALPHAHASH
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
#endif`,rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ap=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,op=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cp=`#ifdef USE_AOMAP
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
#endif`,hp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,up=`#ifdef USE_BATCHING
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
#endif`,fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gp=`#ifdef USE_IRIDESCENCE
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
#endif`,_p=`#ifdef USE_BUMPMAP
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
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,wp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Tp=`#define PI 3.141592653589793
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
} // validated`,Ap=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rp=`vec3 transformedNormal = objectNormal;
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
#endif`,Cp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ip=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Np=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Up=`#ifdef USE_ENVMAP
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
#endif`,Fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Op=`#ifdef USE_ENVMAP
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
#endif`,Bp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
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
#endif`,zp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wp=`#ifdef USE_GRADIENTMAP
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
}`,Xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,$p=`#ifdef USE_ENVMAP
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
#endif`,Kp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e0=`PhysicalMaterial material;
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
#endif`,t0=`uniform sampler2D dfgLUT;
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
}`,n0=`
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
#endif`,i0=`#if defined( RE_IndirectDiffuse )
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
#endif`,s0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,r0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,a0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,h0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,u0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,d0=`#if defined( USE_POINTS_UV )
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
#endif`,p0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x0=`#ifdef USE_MORPHTARGETS
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
#endif`,y0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,S0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,b0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,T0=`#ifdef USE_NORMALMAP
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
#endif`,A0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,R0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,C0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,D0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,I0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,L0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,N0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,U0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,B0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,z0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,V0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,H0=`float getShadowMask() {
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
}`,G0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W0=`#ifdef USE_SKINNING
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
#endif`,X0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,q0=`#ifdef USE_SKINNING
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
#endif`,Y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,J0=`#ifdef USE_TRANSMISSION
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
#endif`,j0=`#ifdef USE_TRANSMISSION
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
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sm=`uniform sampler2D t2D;
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
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,am=`#ifdef ENVMAP_TYPE_CUBE
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cm=`#include <common>
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
}`,hm=`#if DEPTH_PACKING == 3200
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
}`,um=`#define DISTANCE
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
}`,fm=`#define DISTANCE
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
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`uniform float scale;
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
}`,gm=`uniform vec3 diffuse;
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
}`,_m=`#include <common>
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
}`,vm=`uniform vec3 diffuse;
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
}`,xm=`#define LAMBERT
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
}`,ym=`#define LAMBERT
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
}`,Mm=`#define MATCAP
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
}`,Sm=`#define MATCAP
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
}`,bm=`#define NORMAL
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
}`,wm=`#define NORMAL
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
}`,Em=`#define PHONG
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
}`,Tm=`#define PHONG
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
}`,Am=`#define STANDARD
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
}`,Rm=`#define STANDARD
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
}`,Cm=`#define TOON
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
}`,Pm=`#define TOON
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
}`,Dm=`uniform float size;
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
}`,Im=`uniform vec3 diffuse;
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
}`,Lm=`#include <common>
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
}`,Nm=`uniform vec3 color;
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
}`,Um=`uniform float rotation;
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
}`,Fm=`uniform vec3 diffuse;
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
}`,yt={alphahash_fragment:ip,alphahash_pars_fragment:sp,alphamap_fragment:rp,alphamap_pars_fragment:ap,alphatest_fragment:op,alphatest_pars_fragment:lp,aomap_fragment:cp,aomap_pars_fragment:hp,batching_pars_vertex:up,batching_vertex:fp,begin_vertex:dp,beginnormal_vertex:pp,bsdfs:mp,iridescence_fragment:gp,bumpmap_pars_fragment:_p,clipping_planes_fragment:vp,clipping_planes_pars_fragment:xp,clipping_planes_pars_vertex:yp,clipping_planes_vertex:Mp,color_fragment:Sp,color_pars_fragment:bp,color_pars_vertex:wp,color_vertex:Ep,common:Tp,cube_uv_reflection_fragment:Ap,defaultnormal_vertex:Rp,displacementmap_pars_vertex:Cp,displacementmap_vertex:Pp,emissivemap_fragment:Dp,emissivemap_pars_fragment:Ip,colorspace_fragment:Lp,colorspace_pars_fragment:Np,envmap_fragment:Up,envmap_common_pars_fragment:Fp,envmap_pars_fragment:Op,envmap_pars_vertex:Bp,envmap_physical_pars_fragment:$p,envmap_vertex:kp,fog_vertex:zp,fog_pars_vertex:Vp,fog_fragment:Hp,fog_pars_fragment:Gp,gradientmap_pars_fragment:Wp,lightmap_pars_fragment:Xp,lights_lambert_fragment:qp,lights_lambert_pars_fragment:Yp,lights_pars_begin:Zp,lights_toon_fragment:Kp,lights_toon_pars_fragment:Jp,lights_phong_fragment:jp,lights_phong_pars_fragment:Qp,lights_physical_fragment:e0,lights_physical_pars_fragment:t0,lights_fragment_begin:n0,lights_fragment_maps:i0,lights_fragment_end:s0,lightprobes_pars_fragment:r0,logdepthbuf_fragment:a0,logdepthbuf_pars_fragment:o0,logdepthbuf_pars_vertex:l0,logdepthbuf_vertex:c0,map_fragment:h0,map_pars_fragment:u0,map_particle_fragment:f0,map_particle_pars_fragment:d0,metalnessmap_fragment:p0,metalnessmap_pars_fragment:m0,morphinstance_vertex:g0,morphcolor_vertex:_0,morphnormal_vertex:v0,morphtarget_pars_vertex:x0,morphtarget_vertex:y0,normal_fragment_begin:M0,normal_fragment_maps:S0,normal_pars_fragment:b0,normal_pars_vertex:w0,normal_vertex:E0,normalmap_pars_fragment:T0,clearcoat_normal_fragment_begin:A0,clearcoat_normal_fragment_maps:R0,clearcoat_pars_fragment:C0,iridescence_pars_fragment:P0,opaque_fragment:D0,packing:I0,premultiplied_alpha_fragment:L0,project_vertex:N0,dithering_fragment:U0,dithering_pars_fragment:F0,roughnessmap_fragment:O0,roughnessmap_pars_fragment:B0,shadowmap_pars_fragment:k0,shadowmap_pars_vertex:z0,shadowmap_vertex:V0,shadowmask_pars_fragment:H0,skinbase_vertex:G0,skinning_pars_vertex:W0,skinning_vertex:X0,skinnormal_vertex:q0,specularmap_fragment:Y0,specularmap_pars_fragment:Z0,tonemapping_fragment:$0,tonemapping_pars_fragment:K0,transmission_fragment:J0,transmission_pars_fragment:j0,uv_pars_fragment:Q0,uv_pars_vertex:em,uv_vertex:tm,worldpos_vertex:nm,background_vert:im,background_frag:sm,backgroundCube_vert:rm,backgroundCube_frag:am,cube_vert:om,cube_frag:lm,depth_vert:cm,depth_frag:hm,distance_vert:um,distance_frag:fm,equirect_vert:dm,equirect_frag:pm,linedashed_vert:mm,linedashed_frag:gm,meshbasic_vert:_m,meshbasic_frag:vm,meshlambert_vert:xm,meshlambert_frag:ym,meshmatcap_vert:Mm,meshmatcap_frag:Sm,meshnormal_vert:bm,meshnormal_frag:wm,meshphong_vert:Em,meshphong_frag:Tm,meshphysical_vert:Am,meshphysical_frag:Rm,meshtoon_vert:Cm,meshtoon_frag:Pm,points_vert:Dm,points_frag:Im,shadow_vert:Lm,shadow_frag:Nm,sprite_vert:Um,sprite_frag:Fm},Ue={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new j(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new j(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},ai={basic:{uniforms:Sn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:Sn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new gt(0)},envMapIntensity:{value:1}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:Sn([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:Sn([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:Sn([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new gt(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:Sn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:Sn([Ue.points,Ue.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:Sn([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:Sn([Ue.common,Ue.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:Sn([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:Sn([Ue.sprite,Ue.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distance:{uniforms:Sn([Ue.common,Ue.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distance_vert,fragmentShader:yt.distance_frag},shadow:{uniforms:Sn([Ue.lights,Ue.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};ai.physical={uniforms:Sn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new j(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new j},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new j},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};const ga={r:0,b:0,g:0},Om=new Ft,Tu=new pt;Tu.set(-1,0,0,0,1,0,0,0,1);function Bm(i,e,t,n,s,r){const a=new gt(0);let c=s===!0?0:1,o,l,h=null,f=0,u=null;function p(M){let v=M.isScene===!0?M.background:null;if(v&&v.isTexture){const y=M.backgroundBlurriness>0;v=e.get(v,y)}return v}function g(M){let v=!1;const y=p(M);y===null?m(a,c):y&&y.isColor&&(m(y,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||v)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,v){const y=p(v);y&&(y.isCubeTexture||y.mapping===Va)?(l===void 0&&(l=new xe(new Ke(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:$s(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Om.makeRotationFromEuler(v.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Tu),l.material.toneMapped=Rt.getTransfer(y.colorSpace)!==kt,(h!==y||f!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(o===void 0&&(o=new xe(new fn(2,2),new pi({name:"BackgroundMaterial",uniforms:$s(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=y,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=Rt.getTransfer(y.colorSpace)!==kt,y.matrixAutoUpdate===!0&&y.updateMatrix(),o.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==i.toneMapping)&&(o.material.needsUpdate=!0,h=y,f=y.version,u=i.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function m(M,v){M.getRGB(ga,yu(i)),t.buffers.color.setClear(ga.r,ga.g,ga.b,v,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,v=1){a.set(M),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,m(a,c)},render:g,addToRenderList:_,dispose:d}}function km(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function c(L,z,J,Q,B){let q=!1;const W=f(L,Q,J,z);r!==W&&(r=W,l(r.object)),q=p(L,Q,J,B),q&&g(L,Q,J,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,y(L,z,J,Q),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function o(){return i.createVertexArray()}function l(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function f(L,z,J,Q){const B=Q.wireframe===!0;let q=n[z.id];q===void 0&&(q={},n[z.id]=q);const W=L.isInstancedMesh===!0?L.id:0;let ne=q[W];ne===void 0&&(ne={},q[W]=ne);let ae=ne[J.id];ae===void 0&&(ae={},ne[J.id]=ae);let fe=ae[B];return fe===void 0&&(fe=u(o()),ae[B]=fe),fe}function u(L){const z=[],J=[],Q=[];for(let B=0;B<t;B++)z[B]=0,J[B]=0,Q[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:J,attributeDivisors:Q,object:L,attributes:{},index:null}}function p(L,z,J,Q){const B=r.attributes,q=z.attributes;let W=0;const ne=J.getAttributes();for(const ae in ne)if(ne[ae].location>=0){const me=B[ae];let Y=q[ae];if(Y===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor)),me===void 0||me.attribute!==Y||Y&&me.data!==Y.data)return!0;W++}return r.attributesNum!==W||r.index!==Q}function g(L,z,J,Q){const B={},q=z.attributes;let W=0;const ne=J.getAttributes();for(const ae in ne)if(ne[ae].location>=0){let me=q[ae];me===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(me=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(me=L.instanceColor));const Y={};Y.attribute=me,me&&me.data&&(Y.data=me.data),B[ae]=Y,W++}r.attributes=B,r.attributesNum=W,r.index=Q}function _(){const L=r.newAttributes;for(let z=0,J=L.length;z<J;z++)L[z]=0}function m(L){d(L,0)}function d(L,z){const J=r.newAttributes,Q=r.enabledAttributes,B=r.attributeDivisors;J[L]=1,Q[L]===0&&(i.enableVertexAttribArray(L),Q[L]=1),B[L]!==z&&(i.vertexAttribDivisor(L,z),B[L]=z)}function M(){const L=r.newAttributes,z=r.enabledAttributes;for(let J=0,Q=z.length;J<Q;J++)z[J]!==L[J]&&(i.disableVertexAttribArray(J),z[J]=0)}function v(L,z,J,Q,B,q,W){W===!0?i.vertexAttribIPointer(L,z,J,B,q):i.vertexAttribPointer(L,z,J,Q,B,q)}function y(L,z,J,Q){_();const B=Q.attributes,q=J.getAttributes(),W=z.defaultAttributeValues;for(const ne in q){const ae=q[ne];if(ae.location>=0){let fe=B[ne];if(fe===void 0&&(ne==="instanceMatrix"&&L.instanceMatrix&&(fe=L.instanceMatrix),ne==="instanceColor"&&L.instanceColor&&(fe=L.instanceColor)),fe!==void 0){const me=fe.normalized,Y=fe.itemSize,ue=e.get(fe);if(ue===void 0)continue;const Fe=ue.buffer,Te=ue.type,ie=ue.bytesPerElement,ye=Te===i.INT||Te===i.UNSIGNED_INT||fe.gpuType===Hl;if(fe.isInterleavedBufferAttribute){const ge=fe.data,Ce=ge.stride,Ve=fe.offset;if(ge.isInstancedInterleavedBuffer){for(let Be=0;Be<ae.locationSize;Be++)d(ae.location+Be,ge.meshPerAttribute);L.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Be=0;Be<ae.locationSize;Be++)m(ae.location+Be);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let Be=0;Be<ae.locationSize;Be++)v(ae.location+Be,Y/ae.locationSize,Te,me,Ce*ie,(Ve+Y/ae.locationSize*Be)*ie,ye)}else{if(fe.isInstancedBufferAttribute){for(let ge=0;ge<ae.locationSize;ge++)d(ae.location+ge,fe.meshPerAttribute);L.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ge=0;ge<ae.locationSize;ge++)m(ae.location+ge);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let ge=0;ge<ae.locationSize;ge++)v(ae.location+ge,Y/ae.locationSize,Te,me,Y*ie,Y/ae.locationSize*ge*ie,ye)}}else if(W!==void 0){const me=W[ne];if(me!==void 0)switch(me.length){case 2:i.vertexAttrib2fv(ae.location,me);break;case 3:i.vertexAttrib3fv(ae.location,me);break;case 4:i.vertexAttrib4fv(ae.location,me);break;default:i.vertexAttrib1fv(ae.location,me)}}}}M()}function w(){A();for(const L in n){const z=n[L];for(const J in z){const Q=z[J];for(const B in Q){const q=Q[B];for(const W in q)h(q[W].object),delete q[W];delete Q[B]}}delete n[L]}}function b(L){if(n[L.id]===void 0)return;const z=n[L.id];for(const J in z){const Q=z[J];for(const B in Q){const q=Q[B];for(const W in q)h(q[W].object),delete q[W];delete Q[B]}}delete n[L.id]}function C(L){for(const z in n){const J=n[z];for(const Q in J){const B=J[Q];if(B[L.id]===void 0)continue;const q=B[L.id];for(const W in q)h(q[W].object),delete q[W];delete B[L.id]}}}function x(L){for(const z in n){const J=n[z],Q=L.isInstancedMesh===!0?L.id:0,B=J[Q];if(B!==void 0){for(const q in B){const W=B[q];for(const ne in W)h(W[ne].object),delete W[ne];delete B[q]}delete J[Q],Object.keys(J).length===0&&delete n[z]}}}function A(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:A,resetDefaultState:I,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function zm(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,h){h!==0&&(i.drawArraysInstanced(n,o,l,h),t.update(l,n,h))}function c(o,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function Vm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Kn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const x=C===Ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==In&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==$n&&!x)}function o(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=o(l);h!==l&&(lt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&lt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:y,maxSamples:w,samples:b}}function Hm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Si,c=new pt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||n!==0||s;return s=u,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,v=M*4;let y=d.clippingState||null;o.value=y,y=h(g,u,v,p);for(let w=0;w!==v;++w)y[w]=t[w];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const d=p+_*4,M=u.matrixWorldInverse;c.getNormalMatrix(M),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,y=p;v!==_;++v,y+=4)a.copy(f[v]).applyMatrix4(M,c),a.normal.toArray(m,y),m[y+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Hi=4,ch=[.125,.215,.35,.446,.526,.582],ss=20,Gm=256,pr=new ac,hh=new gt;let Ro=null,Co=0,Po=0,Do=!1;const Wm=new U;class Ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=Wm}=r;Ro=this._renderer.getRenderTarget(),Co=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ro,Co,Po),this._renderer.xr.enabled=Do,e.scissorTest=!1,Us(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===os||e.mapping===qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ro=this._renderer.getRenderTarget(),Co=this._renderer.getActiveCubeFace(),Po=this._renderer.getActiveMipmapLevel(),Do=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Ri,format:Kn,colorSpace:Pa,depthBuffer:!1},s=uh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Xm(r)),this._blurMaterial=Ym(r,e,t),this._ggxMaterial=qm(r,e,t)}return s}_compileMaterial(e){const t=new xe(new nn,e);this._renderer.compile(t,pr)}_sceneToCubeUV(e,t,n,s,r){const o=new Dn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(hh),f.toneMapping=ui,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xe(new Ke,new Wi({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let d=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,d=!0):(m.color.copy(hh),d=!0);for(let v=0;v<6;v++){const y=v%3;y===0?(o.up.set(0,l[v],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+h[v],r.y,r.z)):y===1?(o.up.set(0,0,l[v]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+h[v],r.z)):(o.up.set(0,l[v],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+h[v]));const w=this._cubeSize;Us(s,y*w,v>2?w:0,w,w),f.setRenderTarget(s),d&&f.render(_,o),f.render(e,o)}f.toneMapping=p,f.autoClear=u,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===os||e.mapping===qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=dh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;Us(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,pr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=0+l*1.25,p=f*u,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Hi?n-g+Hi:0),d=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=p,o.mipInt.value=g-t,Us(r,m,d,3*_,2*_),s.setRenderTarget(r),s.render(c,pr),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,Us(e,m,d,3*_,2*_),s.setRenderTarget(e),s.render(c,pr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&wt("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[s];f.material=l;const u=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ss-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ss;m>ss&&lt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ss}`);const d=[];let M=0;for(let C=0;C<ss;++C){const x=C/_,A=Math.exp(-x*x/2);d.push(A),C===0?M+=A:C<m&&(M+=2*A)}for(let C=0;C<d.length;C++)d[C]=d[C]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=d,u.latitudinal.value=a==="latitudinal",c&&(u.poleAxis.value=c);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;const y=this._sizeLods[s],w=3*y*(s>v-Hi?s-v+Hi:0),b=4*(this._cubeSize-y);Us(t,w,b,3*y,2*y),o.setRenderTarget(t),o.render(f,pr)}}function Xm(i){const e=[],t=[],n=[];let s=i;const r=i-Hi+1+ch.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-Hi?o=ch[a-i+Hi-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,_=3,m=2,d=1,M=new Float32Array(_*g*p),v=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let b=0;b<p;b++){const C=b%3*2/3-1,x=b>2?0:-1,A=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];M.set(A,_*g*b),v.set(u,m*g*b);const I=[b,b,b,b,b,b];y.set(I,d*g*b)}const w=new nn;w.setAttribute("position",new Vn(M,_)),w.setAttribute("uv",new Vn(v,m)),w.setAttribute("faceIndex",new Vn(y,d)),n.push(new xe(w,null)),s>Hi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function uh(i,e,t){const n=new fi(i,e,t);return n.texture.mapping=Va,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Us(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function qm(i,e,t){return new pi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Ym(i,e,t){const n=new Float32Array(ss),s=new U(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function fh(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function dh(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ga(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Ga(){return`

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
	`}class Au extends fi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new cu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ke(5,5,5),r=new pi({name:"CubemapFromEquirect",uniforms:$s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:Ei});r.uniforms.tEquirect.value=t;const a=new xe(s,r),c=t.minFilter;return t.minFilter===rs&&(t.minFilter=xn),new $d(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Zm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===$a||p===Ka)if(e.has(u)){const g=e.get(u).texture;return c(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const _=new Au(g.height);return _.fromEquirectangularTexture(i,u),e.set(u,_),u.addEventListener("dispose",l),c(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===$a||p===Ka,_=p===os||p===qs;if(g||_){let m=t.get(u);const d=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return n===null&&(n=new Ul(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||_&&M&&o(M)?(n===null&&(n=new Ul(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function c(u,p){return p===$a?u.mapping=os:p===Ka&&(u.mapping=qs),u}function o(u){let p=0;const g=6;for(let _=0;_<g;_++)u[_]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function $m(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Vs("WebGLRenderer: "+n+" extension not supported."),s}}}function Km(i,e,t,n){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function c(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function o(f){const u=f.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(f){const u=[],p=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(p!==null){const M=p.array;_=p.version;for(let v=0,y=M.length;v<y;v+=3){const w=M[v+0],b=M[v+1],C=M[v+2];u.push(w,b,b,C,C,w)}}else{const M=g.array;_=g.version;for(let v=0,y=M.length/3-1;v<y;v+=3){const w=v+0,b=v+1,C=v+2;u.push(w,b,b,C,C,w)}}const m=new(g.count>=65535?su:iu)(u,1);m.version=_;const d=r.get(f);d&&e.remove(d),r.set(f,m)}function h(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:c,update:o,getWireframeAttribute:h}}function Jm(i,e,t){let n;function s(f){n=f}let r,a;function c(f){r=f.type,a=f.bytesPerElement}function o(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,p){p!==0&&(i.drawElementsInstanced(n,u,r,f*a,p),t.update(u,n,p))}function h(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,p);let _=0;for(let m=0;m<p;m++)_+=u[m];t.update(_,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=h}function jm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:wt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Qm(i,e,t){const n=new WeakMap,s=new Jt;function r(a,c,o){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(c);if(u===void 0||u.count!==f){let A=function(){C.dispose(),n.delete(c),c.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();const p=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],d=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let v=0;p===!0&&(v=1),g===!0&&(v=2),_===!0&&(v=3);let y=c.attributes.position.count*v,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*w*4*f),C=new eu(b,y,w,f);C.type=$n,C.needsUpdate=!0;const x=v*4;for(let I=0;I<f;I++){const L=m[I],z=d[I],J=M[I],Q=y*w*4*I;for(let B=0;B<L.count;B++){const q=B*x;p===!0&&(s.fromBufferAttribute(L,B),b[Q+q+0]=s.x,b[Q+q+1]=s.y,b[Q+q+2]=s.z,b[Q+q+3]=0),g===!0&&(s.fromBufferAttribute(z,B),b[Q+q+4]=s.x,b[Q+q+5]=s.y,b[Q+q+6]=s.z,b[Q+q+7]=0),_===!0&&(s.fromBufferAttribute(J,B),b[Q+q+8]=s.x,b[Q+q+9]=s.y,b[Q+q+10]=s.z,b[Q+q+11]=J.itemSize===4?s.w:1)}}u={count:f,texture:C,size:new j(y,w)},n.set(c,u),c.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const g=c.morphTargetsRelative?1:1-p;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function eg(i,e,t,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function c(){r=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const tg={[zh]:"LINEAR_TONE_MAPPING",[Vh]:"REINHARD_TONE_MAPPING",[Hh]:"CINEON_TONE_MAPPING",[Vl]:"ACES_FILMIC_TONE_MAPPING",[Wh]:"AGX_TONE_MAPPING",[Xh]:"NEUTRAL_TONE_MAPPING",[Gh]:"CUSTOM_TONE_MAPPING"};function ng(i,e,t,n,s,r){const a=new fi(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ys(e,t):void 0}),c=new fi(e,t,{type:Ri,depthBuffer:!1,stencilBuffer:!1}),o=new nn;o.setAttribute("position",new Et([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Et([0,2,0,0,2,0],2));const l=new Gd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new xe(o,l),f=new ac(-1,1,1,-1,0,1);let u=null,p=null,g=!1,_,m=null,d=[],M=!1;this.setSize=function(v,y){a.setSize(v,y),c.setSize(v,y);for(let w=0;w<d.length;w++){const b=d[w];b.setSize&&b.setSize(v,y)}},this.setEffects=function(v){d=v,M=d.length>0&&d[0].isRenderPass===!0;const y=a.width,w=a.height;for(let b=0;b<d.length;b++){const C=d[b];C.setSize&&C.setSize(y,w)}},this.begin=function(v,y){if(g||v.toneMapping===ui&&d.length===0)return!1;if(m=y,y!==null){const w=y.width,b=y.height;(a.width!==w||a.height!==b)&&this.setSize(w,b)}return M===!1&&v.setRenderTarget(a),_=v.toneMapping,v.toneMapping=ui,!0},this.hasRenderPass=function(){return M},this.end=function(v,y){v.toneMapping=_,g=!0;let w=a,b=c;for(let C=0;C<d.length;C++){const x=d[C];if(x.enabled!==!1&&(x.render(v,b,w,y),x.needsSwap!==!1)){const A=w;w=b,b=A}}if(u!==v.outputColorSpace||p!==v.toneMapping){u=v.outputColorSpace,p=v.toneMapping,l.defines={},Rt.getTransfer(u)===kt&&(l.defines.SRGB_TRANSFER="");const C=tg[p];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(m),v.render(h,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const Ru=new yn,Fl=new Ys(1,1),Cu=new eu,Pu=new Hf,Du=new cu,ph=[],mh=[],gh=new Float32Array(16),_h=new Float32Array(9),vh=new Float32Array(4);function Js(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=ph[s];if(r===void 0&&(r=new Float32Array(s),ph[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Wa(i,e){let t=mh[e];t===void 0&&(t=new Int32Array(e),mh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ig(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function og(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;vh.set(n),i.uniformMatrix2fv(this.addr,!1,vh),on(t,n)}}function lg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;_h.set(n),i.uniformMatrix3fv(this.addr,!1,_h),on(t,n)}}function cg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;gh.set(n),i.uniformMatrix4fv(this.addr,!1,gh),on(t,n)}}function hg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ug(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function fg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function pg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function mg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function _g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function vg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Fl.compareFunction=t.isReversedDepthBuffer()?Kl:$l,r=Fl):r=Ru,t.setTexture2D(e||r,s)}function xg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Pu,s)}function yg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Du,s)}function Mg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Cu,s)}function Sg(i){switch(i){case 5126:return ig;case 35664:return sg;case 35665:return rg;case 35666:return ag;case 35674:return og;case 35675:return lg;case 35676:return cg;case 5124:case 35670:return hg;case 35667:case 35671:return ug;case 35668:case 35672:return fg;case 35669:case 35673:return dg;case 5125:return pg;case 36294:return mg;case 36295:return gg;case 36296:return _g;case 35678:case 36198:case 36298:case 36306:case 35682:return vg;case 35679:case 36299:case 36307:return xg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return Mg}}function bg(i,e){i.uniform1fv(this.addr,e)}function wg(i,e){const t=Js(e,this.size,2);i.uniform2fv(this.addr,t)}function Eg(i,e){const t=Js(e,this.size,3);i.uniform3fv(this.addr,t)}function Tg(i,e){const t=Js(e,this.size,4);i.uniform4fv(this.addr,t)}function Ag(i,e){const t=Js(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Rg(i,e){const t=Js(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Cg(i,e){const t=Js(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Pg(i,e){i.uniform1iv(this.addr,e)}function Dg(i,e){i.uniform2iv(this.addr,e)}function Ig(i,e){i.uniform3iv(this.addr,e)}function Lg(i,e){i.uniform4iv(this.addr,e)}function Ng(i,e){i.uniform1uiv(this.addr,e)}function Ug(i,e){i.uniform2uiv(this.addr,e)}function Fg(i,e){i.uniform3uiv(this.addr,e)}function Og(i,e){i.uniform4uiv(this.addr,e)}function Bg(i,e,t){const n=this.cache,s=e.length,r=Wa(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Fl:a=Ru;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function kg(i,e,t){const n=this.cache,s=e.length,r=Wa(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Pu,r[a])}function zg(i,e,t){const n=this.cache,s=e.length,r=Wa(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Du,r[a])}function Vg(i,e,t){const n=this.cache,s=e.length,r=Wa(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Cu,r[a])}function Hg(i){switch(i){case 5126:return bg;case 35664:return wg;case 35665:return Eg;case 35666:return Tg;case 35674:return Ag;case 35675:return Rg;case 35676:return Cg;case 5124:case 35670:return Pg;case 35667:case 35671:return Dg;case 35668:case 35672:return Ig;case 35669:case 35673:return Lg;case 5125:return Ng;case 36294:return Ug;case 36295:return Fg;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return kg;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Vg}}class Gg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Sg(t.type)}}class Wg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hg(t.type)}}class Xg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const Io=/(\w+)(\])?(\[|\.)?/g;function xh(i,e){i.seq.push(e),i.map[e.id]=e}function qg(i,e,t){const n=i.name,s=n.length;for(Io.lastIndex=0;;){const r=Io.exec(n),a=Io.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){xh(t,l===void 0?new Gg(c,i,e):new Wg(c,i,e));break}else{let f=t.map[c];f===void 0&&(f=new Xg(c),xh(t,f)),t=f}}}class Ta{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);qg(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function yh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Yg=37297;let Zg=0;function $g(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const Mh=new pt;function Kg(i){Rt._getMatrix(Mh,Rt.workingColorSpace,i);const e=`mat3( ${Mh.elements.map(t=>t.toFixed(4))} )`;switch(Rt.getTransfer(i)){case Da:return[e,"LinearTransferOETF"];case kt:return[e,"sRGBTransferOETF"];default:return lt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Sh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+$g(i.getShaderSource(e),c)}else return r}function Jg(i,e){const t=Kg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const jg={[zh]:"Linear",[Vh]:"Reinhard",[Hh]:"Cineon",[Vl]:"ACESFilmic",[Wh]:"AgX",[Xh]:"Neutral",[Gh]:"Custom"};function Qg(i,e){const t=jg[e];return t===void 0?(lt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _a=new U;function e_(){Rt.getLuminanceCoefficients(_a);const i=_a.x.toFixed(4),e=_a.y.toFixed(4),t=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yr).join(`
`)}function n_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function i_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function yr(i){return i!==""}function bh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const s_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ol(i){return i.replace(s_,a_)}const r_=new Map;function a_(i,e){let t=yt[e];if(t===void 0){const n=r_.get(e);if(n!==void 0)t=yt[n],lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ol(t)}const o_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eh(i){return i.replace(o_,l_)}function l_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Th(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const c_={[Mr]:"SHADOWMAP_TYPE_PCF",[vr]:"SHADOWMAP_TYPE_VSM"};function h_(i){return c_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const u_={[os]:"ENVMAP_TYPE_CUBE",[qs]:"ENVMAP_TYPE_CUBE",[Va]:"ENVMAP_TYPE_CUBE_UV"};function f_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":u_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const d_={[qs]:"ENVMAP_MODE_REFRACTION"};function p_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":d_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const m_={[zl]:"ENVMAP_BLENDING_MULTIPLY",[yf]:"ENVMAP_BLENDING_MIX",[Mf]:"ENVMAP_BLENDING_ADD"};function g_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":m_[i.combine]||"ENVMAP_BLENDING_NONE"}function __(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function v_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=h_(t),l=f_(t),h=p_(t),f=g_(t),u=__(t),p=t_(t),g=n_(r),_=s.createProgram();let m,d,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(yr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(yr).join(`
`),d.length>0&&(d+=`
`)):(m=[Th(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yr).join(`
`),d=[Th(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ui?"#define TONE_MAPPING":"",t.toneMapping!==ui?yt.tonemapping_pars_fragment:"",t.toneMapping!==ui?Qg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,Jg("linearToOutputTexel",t.outputColorSpace),e_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(yr).join(`
`)),a=Ol(a),a=bh(a,t),a=wh(a,t),c=Ol(c),c=bh(c,t),c=wh(c,t),a=Eh(a),c=Eh(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=M+m+a,y=M+d+c,w=yh(s,s.VERTEX_SHADER,v),b=yh(s,s.FRAGMENT_SHADER,y);s.attachShader(_,w),s.attachShader(_,b),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(L){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(_)||"",J=s.getShaderInfoLog(w)||"",Q=s.getShaderInfoLog(b)||"",B=z.trim(),q=J.trim(),W=Q.trim();let ne=!0,ae=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,b);else{const fe=Sh(s,w,"vertex"),me=Sh(s,b,"fragment");wt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+B+`
`+fe+`
`+me)}else B!==""?lt("WebGLProgram: Program Info Log:",B):(q===""||W==="")&&(ae=!1);ae&&(L.diagnostics={runnable:ne,programLog:B,vertexShader:{log:q,prefix:m},fragmentShader:{log:W,prefix:d}})}s.deleteShader(w),s.deleteShader(b),x=new Ta(s,_),A=i_(s,_)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(_,Yg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Zg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=b,this}let x_=0;class y_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new M_(e),t.set(e,n)),n}}class M_{constructor(e){this.id=x_++,this.code=e,this.usedTimes=0}}function S_(i){return i===ls||i===Aa||i===Ra}function b_(i,e,t,n,s,r){const a=new jl,c=new y_,o=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return o.add(x),x===0?"uv":`uv${x}`}function _(x,A,I,L,z,J){const Q=L.fog,B=z.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?L.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ne=e.get(x.envMap||q,W),ae=ne&&ne.mapping===Va?ne.image.height:null,fe=p[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&lt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const me=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Y=me!==void 0?me.length:0;let ue=0;B.morphAttributes.position!==void 0&&(ue=1),B.morphAttributes.normal!==void 0&&(ue=2),B.morphAttributes.color!==void 0&&(ue=3);let Fe,Te,ie,ye;if(fe){const We=ai[fe];Fe=We.vertexShader,Te=We.fragmentShader}else{Fe=x.vertexShader,Te=x.fragmentShader;const We=c.getVertexShaderStage(x),Vt=c.getFragmentShaderStage(x);c.update(x,We,Vt),ie=We.id,ye=Vt.id}const ge=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),Ve=z.isInstancedMesh===!0,Be=z.isBatchedMesh===!0,st=!!x.map,Ge=!!x.matcap,oe=!!ne,pe=!!x.aoMap,_e=!!x.lightMap,Se=!!x.bumpMap&&x.wireframe===!1,Me=!!x.normalMap,nt=!!x.displacementMap,Ye=!!x.emissiveMap,ot=!!x.metalnessMap,ct=!!x.roughnessMap,k=x.anisotropy>0,Ct=x.clearcoat>0,Mt=x.dispersion>0,P=x.iridescence>0,S=x.sheen>0,X=x.transmission>0,$=k&&!!x.anisotropyMap,re=Ct&&!!x.clearcoatMap,de=Ct&&!!x.clearcoatNormalMap,we=Ct&&!!x.clearcoatRoughnessMap,se=P&&!!x.iridescenceMap,he=P&&!!x.iridescenceThicknessMap,Pe=S&&!!x.sheenColorMap,Je=S&&!!x.sheenRoughnessMap,De=!!x.specularMap,Ae=!!x.specularColorMap,Ze=!!x.specularIntensityMap,at=X&&!!x.transmissionMap,ut=X&&!!x.thicknessMap,V=!!x.gradientMap,Ee=!!x.alphaMap,ce=x.alphaTest>0,Re=!!x.alphaHash,Ne=!!x.extensions;let ve=ui;x.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(ve=i.toneMapping);const $e={shaderID:fe,shaderType:x.type,shaderName:x.name,vertexShader:Fe,fragmentShader:Te,defines:x.defines,customVertexShaderID:ie,customFragmentShaderID:ye,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Be,batchingColor:Be&&z._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&z.instanceColor!==null,instancingMorph:Ve&&z.morphTexture!==null,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Rt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:st,matcap:Ge,envMap:oe,envMapMode:oe&&ne.mapping,envMapCubeUVHeight:ae,aoMap:pe,lightMap:_e,bumpMap:Se,normalMap:Me,displacementMap:nt,emissiveMap:Ye,normalMapObjectSpace:Me&&x.normalMapType===wf,normalMapTangentSpace:Me&&x.normalMapType===Ca,packedNormalMap:Me&&x.normalMapType===Ca&&S_(x.normalMap.format),metalnessMap:ot,roughnessMap:ct,anisotropy:k,anisotropyMap:$,clearcoat:Ct,clearcoatMap:re,clearcoatNormalMap:de,clearcoatRoughnessMap:we,dispersion:Mt,iridescence:P,iridescenceMap:se,iridescenceThicknessMap:he,sheen:S,sheenColorMap:Pe,sheenRoughnessMap:Je,specularMap:De,specularColorMap:Ae,specularIntensityMap:Ze,transmission:X,transmissionMap:at,thicknessMap:ut,gradientMap:V,opaque:x.transparent===!1&&x.blending===zs&&x.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ce,alphaHash:Re,combine:x.combine,mapUv:st&&g(x.map.channel),aoMapUv:pe&&g(x.aoMap.channel),lightMapUv:_e&&g(x.lightMap.channel),bumpMapUv:Se&&g(x.bumpMap.channel),normalMapUv:Me&&g(x.normalMap.channel),displacementMapUv:nt&&g(x.displacementMap.channel),emissiveMapUv:Ye&&g(x.emissiveMap.channel),metalnessMapUv:ot&&g(x.metalnessMap.channel),roughnessMapUv:ct&&g(x.roughnessMap.channel),anisotropyMapUv:$&&g(x.anisotropyMap.channel),clearcoatMapUv:re&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:he&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Je&&g(x.sheenRoughnessMap.channel),specularMapUv:De&&g(x.specularMap.channel),specularColorMapUv:Ae&&g(x.specularColorMap.channel),specularIntensityMapUv:Ze&&g(x.specularIntensityMap.channel),transmissionMapUv:at&&g(x.transmissionMap.channel),thicknessMapUv:ut&&g(x.thicknessMap.channel),alphaMapUv:Ee&&g(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||k),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!B.attributes.uv&&(st||Ee),fog:!!Q,useFog:x.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ce,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:ue,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ve,decodeVideoTexture:st&&x.map.isVideoTexture===!0&&Rt.getTransfer(x.map.colorSpace)===kt,decodeVideoTextureEmissive:Ye&&x.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(x.emissiveMap.colorSpace)===kt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Kt,flipSided:x.side===bn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ne&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&x.extensions.multiDraw===!0||Be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return $e.vertexUv1s=o.has(1),$e.vertexUv2s=o.has(2),$e.vertexUv3s=o.has(3),o.clear(),$e}function m(x){const A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(const I in x.defines)A.push(I),A.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(d(A,x),M(A,x),A.push(i.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function d(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function M(x,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function v(x){const A=p[x.type];let I;if(A){const L=ai[A];I=zd.clone(L.uniforms)}else I=x.uniforms;return I}function y(x,A){let I=h.get(A);return I!==void 0?++I.usedTimes:(I=new v_(i,A,x,s),l.push(I),h.set(A,I)),I}function w(x){if(--x.usedTimes===0){const A=l.indexOf(x);l[A]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){c.remove(x)}function C(){c.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:v,acquireProgram:y,releaseProgram:w,releaseShaderCache:b,programs:l,dispose:C}}function w_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function E_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ah(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Rh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function c(u,p,g,_,m,d){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:d},i[e]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=g,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=d),e++,M}function o(u,p,g,_,m,d){const M=c(u,p,g,_,m,d);g.transmission>0?n.push(M):g.transparent===!0?s.push(M):t.push(M)}function l(u,p,g,_,m,d){const M=c(u,p,g,_,m,d);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,p,g){t.length>1&&t.sort(u||E_),n.length>1&&n.sort(p||Ah),s.length>1&&s.sort(p||Ah),g&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let u=e,p=i.length;u<p;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:f,sort:h}}function T_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Rh,i.set(n,[a])):s>=r.length?(a=new Rh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function A_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new gt};break;case"SpotLight":t={position:new U,direction:new U,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new gt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":t={color:new gt,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function R_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let C_=0;function P_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function D_(i){const e=new A_,t=R_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);const s=new U,r=new Ft,a=new Ft;function c(l){let h=0,f=0,u=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,M=0,v=0,y=0,w=0,b=0,C=0;l.sort(P_);for(let A=0,I=l.length;A<I;A++){const L=l[A],z=L.color,J=L.intensity,Q=L.distance;let B=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===ls?B=L.shadow.map.texture:B=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=z.r*J,f+=z.g*J,u+=z.b*J;else if(L.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(L.sh.coefficients[q],J);C++}else if(L.isDirectionalLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const W=L.shadow,ne=t.get(L);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,n.directionalShadow[p]=ne,n.directionalShadowMap[p]=B,n.directionalShadowMatrix[p]=L.shadow.matrix,M++}n.directional[p]=q,p++}else if(L.isSpotLight){const q=e.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(z).multiplyScalar(J),q.distance=Q,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,n.spot[_]=q;const W=L.shadow;if(L.map&&(n.spotLightMap[w]=L.map,w++,W.updateMatrices(L),L.castShadow&&b++),n.spotLightMatrix[_]=W.matrix,L.castShadow){const ne=t.get(L);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,n.spotShadow[_]=ne,n.spotShadowMap[_]=B,y++}_++}else if(L.isRectAreaLight){const q=e.get(L);q.color.copy(z).multiplyScalar(J),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=q,m++}else if(L.isPointLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const W=L.shadow,ne=t.get(L);ne.shadowIntensity=W.intensity,ne.shadowBias=W.bias,ne.shadowNormalBias=W.normalBias,ne.shadowRadius=W.radius,ne.shadowMapSize=W.mapSize,ne.shadowCameraNear=W.camera.near,ne.shadowCameraFar=W.camera.far,n.pointShadow[g]=ne,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=L.shadow.matrix,v++}n.point[g]=q,g++}else if(L.isHemisphereLight){const q=e.get(L);q.skyColor.copy(L.color).multiplyScalar(J),q.groundColor.copy(L.groundColor).multiplyScalar(J),n.hemi[d]=q,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const x=n.hash;(x.directionalLength!==p||x.pointLength!==g||x.spotLength!==_||x.rectAreaLength!==m||x.hemiLength!==d||x.numDirectionalShadows!==M||x.numPointShadows!==v||x.numSpotShadows!==y||x.numSpotMaps!==w||x.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+w-b,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=C,x.directionalLength=p,x.pointLength=g,x.spotLength=_,x.rectAreaLength=m,x.hemiLength=d,x.numDirectionalShadows=M,x.numPointShadows=v,x.numSpotShadows=y,x.numSpotMaps=w,x.numLightProbes=C,n.version=C_++)}function o(l,h){let f=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,M=l.length;d<M;d++){const v=l[d];if(v.isDirectionalLight){const y=n.directional[f];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(v.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:c,setupView:o,state:n}}function Ch(i){const e=new D_(i),t=[],n=[],s=[];function r(u){f.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function c(u){n.push(u)}function o(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function I_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new Ch(i),e.set(s,[c])):r>=a.length?(c=new Ch(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const L_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N_=`uniform sampler2D shadow_pass;
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
}`,U_=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],F_=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Ph=new Ft,mr=new U,Lo=new U;function O_(i,e,t){let n=new Ql;const s=new j,r=new j,a=new Jt,c=new Xd,o=new qd,l={},h=t.maxTextureSize,f={[Gi]:bn,[bn]:Gi,[Kt]:Kt},u=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new j},radius:{value:4}},vertexShader:L_,fragmentShader:N_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new nn;g.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new xe(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mr;let d=this.type;this.render=function(b,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===ef&&(lt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Mr);const A=i.getRenderTarget(),I=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Ei),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const J=d!==this.type;J&&C.traverse(function(Q){Q.material&&(Array.isArray(Q.material)?Q.material.forEach(B=>B.needsUpdate=!0):Q.material.needsUpdate=!0)});for(let Q=0,B=b.length;Q<B;Q++){const q=b[Q],W=q.shadow;if(W===void 0){lt("WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const ne=W.getFrameExtents();s.multiply(ne),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ne.x),s.x=r.x*ne.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ne.y),s.y=r.y*ne.y,W.mapSize.y=r.y));const ae=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=ae,W.map===null||J===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===vr){if(q.isPointLight){lt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new fi(s.x,s.y,{format:ls,type:Ri,minFilter:xn,magFilter:xn,generateMipmaps:!1}),W.map.texture.name=q.name+".shadowMap",W.map.depthTexture=new Ys(s.x,s.y,$n),W.map.depthTexture.name=q.name+".shadowMapDepth",W.map.depthTexture.format=Ci,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=un,W.map.depthTexture.magFilter=un}else q.isPointLight?(W.map=new Au(s.x),W.map.depthTexture=new od(s.x,di)):(W.map=new fi(s.x,s.y),W.map.depthTexture=new Ys(s.x,s.y,di)),W.map.depthTexture.name=q.name+".shadowMap",W.map.depthTexture.format=Ci,this.type===Mr?(W.map.depthTexture.compareFunction=ae?Kl:$l,W.map.depthTexture.minFilter=xn,W.map.depthTexture.magFilter=xn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=un,W.map.depthTexture.magFilter=un);W.camera.updateProjectionMatrix()}const fe=W.map.isWebGLCubeRenderTarget?6:1;for(let me=0;me<fe;me++){if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,me),i.clear();else{me===0&&(i.setRenderTarget(W.map),i.clear());const Y=W.getViewport(me);a.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),z.viewport(a)}if(q.isPointLight){const Y=W.camera,ue=W.matrix,Fe=q.distance||Y.far;Fe!==Y.far&&(Y.far=Fe,Y.updateProjectionMatrix()),mr.setFromMatrixPosition(q.matrixWorld),Y.position.copy(mr),Lo.copy(Y.position),Lo.add(U_[me]),Y.up.copy(F_[me]),Y.lookAt(Lo),Y.updateMatrixWorld(),ue.makeTranslation(-mr.x,-mr.y,-mr.z),Ph.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Ph,Y.coordinateSystem,Y.reversedDepth)}else W.updateMatrices(q);n=W.getFrustum(),y(C,x,W.camera,q,this.type)}W.isPointLightShadow!==!0&&this.type===vr&&M(W,x),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(A,I,L)};function M(b,C){const x=e.update(_);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new fi(s.x,s.y,{format:ls,type:Ri})),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(C,null,x,u,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(C,null,x,p,_,null)}function v(b,C,x,A){let I=null;const L=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)I=L;else if(I=x.isPointLight===!0?o:c,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const z=I.uuid,J=C.uuid;let Q=l[z];Q===void 0&&(Q={},l[z]=Q);let B=Q[J];B===void 0&&(B=I.clone(),Q[J]=B,C.addEventListener("dispose",w)),I=B}if(I.visible=C.visible,I.wireframe=C.wireframe,A===vr?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:f[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const z=i.properties.get(I);z.light=x}return I}function y(b,C,x,A,I){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&I===vr)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const J=e.update(b),Q=b.material;if(Array.isArray(Q)){const B=J.groups;for(let q=0,W=B.length;q<W;q++){const ne=B[q],ae=Q[ne.materialIndex];if(ae&&ae.visible){const fe=v(b,ae,A,I);b.onBeforeShadow(i,b,C,x,J,fe,ne),i.renderBufferDirect(x,null,J,fe,b,ne),b.onAfterShadow(i,b,C,x,J,fe,ne)}}}else if(Q.visible){const B=v(b,Q,A,I);b.onBeforeShadow(i,b,C,x,J,B,null),i.renderBufferDirect(x,null,J,B,b,null),b.onAfterShadow(i,b,C,x,J,B,null)}}const z=b.children;for(let J=0,Q=z.length;J<Q;J++)y(z[J],C,x,A,I)}function w(b){b.target.removeEventListener("dispose",w);for(const x in l){const A=l[x],I=b.target.uuid;I in A&&(A[I].dispose(),delete A[I])}}}function B_(i,e){function t(){let V=!1;const Ee=new Jt;let ce=null;const Re=new Jt(0,0,0,0);return{setMask:function(Ne){ce!==Ne&&!V&&(i.colorMask(Ne,Ne,Ne,Ne),ce=Ne)},setLocked:function(Ne){V=Ne},setClear:function(Ne,ve,$e,We,Vt){Vt===!0&&(Ne*=We,ve*=We,$e*=We),Ee.set(Ne,ve,$e,We),Re.equals(Ee)===!1&&(i.clearColor(Ne,ve,$e,We),Re.copy(Ee))},reset:function(){V=!1,ce=null,Re.set(-1,0,0,0)}}}function n(){let V=!1,Ee=!1,ce=null,Re=null,Ne=null;return{setReversed:function(ve){if(Ee!==ve){const $e=e.get("EXT_clip_control");ve?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT),Ee=ve;const We=Ne;Ne=null,this.setClear(We)}},getReversed:function(){return Ee},setTest:function(ve){ve?ge(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(ve){ce!==ve&&!V&&(i.depthMask(ve),ce=ve)},setFunc:function(ve){if(Ee&&(ve=Nf[ve]),Re!==ve){switch(ve){case Wo:i.depthFunc(i.NEVER);break;case Xo:i.depthFunc(i.ALWAYS);break;case qo:i.depthFunc(i.LESS);break;case Xs:i.depthFunc(i.LEQUAL);break;case Yo:i.depthFunc(i.EQUAL);break;case Zo:i.depthFunc(i.GEQUAL);break;case $o:i.depthFunc(i.GREATER);break;case Ko:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Re=ve}},setLocked:function(ve){V=ve},setClear:function(ve){Ne!==ve&&(Ne=ve,Ee&&(ve=1-ve),i.clearDepth(ve))},reset:function(){V=!1,ce=null,Re=null,Ne=null,Ee=!1}}}function s(){let V=!1,Ee=null,ce=null,Re=null,Ne=null,ve=null,$e=null,We=null,Vt=null;return{setTest:function(It){V||(It?ge(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(It){Ee!==It&&!V&&(i.stencilMask(It),Ee=It)},setFunc:function(It,Ln,dn){(ce!==It||Re!==Ln||Ne!==dn)&&(i.stencilFunc(It,Ln,dn),ce=It,Re=Ln,Ne=dn)},setOp:function(It,Ln,dn){(ve!==It||$e!==Ln||We!==dn)&&(i.stencilOp(It,Ln,dn),ve=It,$e=Ln,We=dn)},setLocked:function(It){V=It},setClear:function(It){Vt!==It&&(i.clearStencil(It),Vt=It)},reset:function(){V=!1,Ee=null,ce=null,Re=null,Ne=null,ve=null,$e=null,We=null,Vt=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let h={},f={},u={},p=new WeakMap,g=[],_=null,m=!1,d=null,M=null,v=null,y=null,w=null,b=null,C=null,x=new gt(0,0,0),A=0,I=!1,L=null,z=null,J=null,Q=null,B=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const ae=i.getParameter(i.VERSION);ae.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(ae)[1]),W=ne>=1):ae.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),W=ne>=2);let fe=null,me={};const Y=i.getParameter(i.SCISSOR_BOX),ue=i.getParameter(i.VIEWPORT),Fe=new Jt().fromArray(Y),Te=new Jt().fromArray(ue);function ie(V,Ee,ce,Re){const Ne=new Uint8Array(4),ve=i.createTexture();i.bindTexture(V,ve),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $e=0;$e<ce;$e++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(Ee,0,i.RGBA,1,1,Re,0,i.RGBA,i.UNSIGNED_BYTE,Ne):i.texImage2D(Ee+$e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ne);return ve}const ye={};ye[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),ge(i.DEPTH_TEST),a.setFunc(Xs),Se(!1),Me(xc),ge(i.CULL_FACE),pe(Ei);function ge(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function Ce(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function Ve(V,Ee){return u[V]!==Ee?(i.bindFramebuffer(V,Ee),u[V]=Ee,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Ee),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Ee),!0):!1}function Be(V,Ee){let ce=g,Re=!1;if(V){ce=p.get(Ee),ce===void 0&&(ce=[],p.set(Ee,ce));const Ne=V.textures;if(ce.length!==Ne.length||ce[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,$e=Ne.length;ve<$e;ve++)ce[ve]=i.COLOR_ATTACHMENT0+ve;ce.length=Ne.length,Re=!0}}else ce[0]!==i.BACK&&(ce[0]=i.BACK,Re=!0);Re&&i.drawBuffers(ce)}function st(V){return _!==V?(i.useProgram(V),_=V,!0):!1}const Ge={[is]:i.FUNC_ADD,[nf]:i.FUNC_SUBTRACT,[sf]:i.FUNC_REVERSE_SUBTRACT};Ge[rf]=i.MIN,Ge[af]=i.MAX;const oe={[of]:i.ZERO,[lf]:i.ONE,[cf]:i.SRC_COLOR,[Ho]:i.SRC_ALPHA,[mf]:i.SRC_ALPHA_SATURATE,[df]:i.DST_COLOR,[uf]:i.DST_ALPHA,[hf]:i.ONE_MINUS_SRC_COLOR,[Go]:i.ONE_MINUS_SRC_ALPHA,[pf]:i.ONE_MINUS_DST_COLOR,[ff]:i.ONE_MINUS_DST_ALPHA,[gf]:i.CONSTANT_COLOR,[_f]:i.ONE_MINUS_CONSTANT_COLOR,[vf]:i.CONSTANT_ALPHA,[xf]:i.ONE_MINUS_CONSTANT_ALPHA};function pe(V,Ee,ce,Re,Ne,ve,$e,We,Vt,It){if(V===Ei){m===!0&&(Ce(i.BLEND),m=!1);return}if(m===!1&&(ge(i.BLEND),m=!0),V!==tf){if(V!==d||It!==I){if((M!==is||w!==is)&&(i.blendEquation(i.FUNC_ADD),M=is,w=is),It)switch(V){case zs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yc:i.blendFunc(i.ONE,i.ONE);break;case Mc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Sc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:wt("WebGLState: Invalid blending: ",V);break}else switch(V){case zs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Mc:wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sc:wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:wt("WebGLState: Invalid blending: ",V);break}v=null,y=null,b=null,C=null,x.set(0,0,0),A=0,d=V,I=It}return}Ne=Ne||Ee,ve=ve||ce,$e=$e||Re,(Ee!==M||Ne!==w)&&(i.blendEquationSeparate(Ge[Ee],Ge[Ne]),M=Ee,w=Ne),(ce!==v||Re!==y||ve!==b||$e!==C)&&(i.blendFuncSeparate(oe[ce],oe[Re],oe[ve],oe[$e]),v=ce,y=Re,b=ve,C=$e),(We.equals(x)===!1||Vt!==A)&&(i.blendColor(We.r,We.g,We.b,Vt),x.copy(We),A=Vt),d=V,I=!1}function _e(V,Ee){V.side===Kt?Ce(i.CULL_FACE):ge(i.CULL_FACE);let ce=V.side===bn;Ee&&(ce=!ce),Se(ce),V.blending===zs&&V.transparent===!1?pe(Ei):pe(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),r.setMask(V.colorWrite);const Re=V.stencilWrite;c.setTest(Re),Re&&(c.setMask(V.stencilWriteMask),c.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),c.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ye(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ge(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Se(V){L!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),L=V)}function Me(V){V!==ju?(ge(i.CULL_FACE),V!==z&&(V===xc?i.cullFace(i.BACK):V===Qu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),z=V}function nt(V){V!==J&&(W&&i.lineWidth(V),J=V)}function Ye(V,Ee,ce){V?(ge(i.POLYGON_OFFSET_FILL),(Q!==Ee||B!==ce)&&(Q=Ee,B=ce,a.getReversed()&&(Ee=-Ee),i.polygonOffset(Ee,ce))):Ce(i.POLYGON_OFFSET_FILL)}function ot(V){V?ge(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function ct(V){V===void 0&&(V=i.TEXTURE0+q-1),fe!==V&&(i.activeTexture(V),fe=V)}function k(V,Ee,ce){ce===void 0&&(fe===null?ce=i.TEXTURE0+q-1:ce=fe);let Re=me[ce];Re===void 0&&(Re={type:void 0,texture:void 0},me[ce]=Re),(Re.type!==V||Re.texture!==Ee)&&(fe!==ce&&(i.activeTexture(ce),fe=ce),i.bindTexture(V,Ee||ye[V]),Re.type=V,Re.texture=Ee)}function Ct(){const V=me[fe];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Mt(){try{i.compressedTexImage2D(...arguments)}catch(V){wt("WebGLState:",V)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(V){wt("WebGLState:",V)}}function S(){try{i.texSubImage2D(...arguments)}catch(V){wt("WebGLState:",V)}}function X(){try{i.texSubImage3D(...arguments)}catch(V){wt("WebGLState:",V)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(V){wt("WebGLState:",V)}}function re(){try{i.compressedTexSubImage3D(...arguments)}catch(V){wt("WebGLState:",V)}}function de(){try{i.texStorage2D(...arguments)}catch(V){wt("WebGLState:",V)}}function we(){try{i.texStorage3D(...arguments)}catch(V){wt("WebGLState:",V)}}function se(){try{i.texImage2D(...arguments)}catch(V){wt("WebGLState:",V)}}function he(){try{i.texImage3D(...arguments)}catch(V){wt("WebGLState:",V)}}function Pe(V){return f[V]!==void 0?f[V]:i.getParameter(V)}function Je(V,Ee){f[V]!==Ee&&(i.pixelStorei(V,Ee),f[V]=Ee)}function De(V){Fe.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),Fe.copy(V))}function Ae(V){Te.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),Te.copy(V))}function Ze(V,Ee){let ce=l.get(Ee);ce===void 0&&(ce=new WeakMap,l.set(Ee,ce));let Re=ce.get(V);Re===void 0&&(Re=i.getUniformBlockIndex(Ee,V.name),ce.set(V,Re))}function at(V,Ee){const Re=l.get(Ee).get(V);o.get(Ee)!==Re&&(i.uniformBlockBinding(Ee,Re,V.__bindingPointIndex),o.set(Ee,Re))}function ut(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},fe=null,me={},u={},p=new WeakMap,g=[],_=null,m=!1,d=null,M=null,v=null,y=null,w=null,b=null,C=null,x=new gt(0,0,0),A=0,I=!1,L=null,z=null,J=null,Q=null,B=null,Fe.set(0,0,i.canvas.width,i.canvas.height),Te.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:ge,disable:Ce,bindFramebuffer:Ve,drawBuffers:Be,useProgram:st,setBlending:pe,setMaterial:_e,setFlipSided:Se,setCullFace:Me,setLineWidth:nt,setPolygonOffset:Ye,setScissorTest:ot,activeTexture:ct,bindTexture:k,unbindTexture:Ct,compressedTexImage2D:Mt,compressedTexImage3D:P,texImage2D:se,texImage3D:he,pixelStorei:Je,getParameter:Pe,updateUBOMapping:Ze,uniformBlockBinding:at,texStorage2D:de,texStorage3D:we,texSubImage2D:S,texSubImage3D:X,compressedTexSubImage2D:$,compressedTexSubImage3D:re,scissor:De,viewport:Ae,reset:ut}}function k_(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new j,h=new WeakMap,f=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,S){return g?new OffscreenCanvas(P,S):Ia("canvas")}function m(P,S,X){let $=1;const re=Mt(P);if((re.width>X||re.height>X)&&($=X/Math.max(re.width,re.height)),$<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const de=Math.floor($*re.width),we=Math.floor($*re.height);u===void 0&&(u=_(de,we));const se=S?_(de,we):u;return se.width=de,se.height=we,se.getContext("2d").drawImage(P,0,0,de,we),lt("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+de+"x"+we+")."),se}else return"data"in P&&lt("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),P;return P}function d(P){return P.generateMipmaps}function M(P){i.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(P,S,X,$,re,de=!1){if(P!==null){if(i[P]!==void 0)return i[P];lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let we;$&&(we=e.get("EXT_texture_norm16"),we||lt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=S;if(S===i.RED&&(X===i.FLOAT&&(se=i.R32F),X===i.HALF_FLOAT&&(se=i.R16F),X===i.UNSIGNED_BYTE&&(se=i.R8),X===i.UNSIGNED_SHORT&&we&&(se=we.R16_EXT),X===i.SHORT&&we&&(se=we.R16_SNORM_EXT)),S===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.R8UI),X===i.UNSIGNED_SHORT&&(se=i.R16UI),X===i.UNSIGNED_INT&&(se=i.R32UI),X===i.BYTE&&(se=i.R8I),X===i.SHORT&&(se=i.R16I),X===i.INT&&(se=i.R32I)),S===i.RG&&(X===i.FLOAT&&(se=i.RG32F),X===i.HALF_FLOAT&&(se=i.RG16F),X===i.UNSIGNED_BYTE&&(se=i.RG8),X===i.UNSIGNED_SHORT&&we&&(se=we.RG16_EXT),X===i.SHORT&&we&&(se=we.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.RG8UI),X===i.UNSIGNED_SHORT&&(se=i.RG16UI),X===i.UNSIGNED_INT&&(se=i.RG32UI),X===i.BYTE&&(se=i.RG8I),X===i.SHORT&&(se=i.RG16I),X===i.INT&&(se=i.RG32I)),S===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.RGB8UI),X===i.UNSIGNED_SHORT&&(se=i.RGB16UI),X===i.UNSIGNED_INT&&(se=i.RGB32UI),X===i.BYTE&&(se=i.RGB8I),X===i.SHORT&&(se=i.RGB16I),X===i.INT&&(se=i.RGB32I)),S===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(se=i.RGBA16UI),X===i.UNSIGNED_INT&&(se=i.RGBA32UI),X===i.BYTE&&(se=i.RGBA8I),X===i.SHORT&&(se=i.RGBA16I),X===i.INT&&(se=i.RGBA32I)),S===i.RGB&&(X===i.UNSIGNED_SHORT&&we&&(se=we.RGB16_EXT),X===i.SHORT&&we&&(se=we.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(se=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(se=i.R11F_G11F_B10F)),S===i.RGBA){const he=de?Da:Rt.getTransfer(re);X===i.FLOAT&&(se=i.RGBA32F),X===i.HALF_FLOAT&&(se=i.RGBA16F),X===i.UNSIGNED_BYTE&&(se=he===kt?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&we&&(se=we.RGBA16_EXT),X===i.SHORT&&we&&(se=we.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(se=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(se=i.RGB5_A1)}return(se===i.R16F||se===i.R32F||se===i.RG16F||se===i.RG32F||se===i.RGBA16F||se===i.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function w(P,S){let X;return P?S===null||S===di||S===Tr?X=i.DEPTH24_STENCIL8:S===$n?X=i.DEPTH32F_STENCIL8:S===Er&&(X=i.DEPTH24_STENCIL8,lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===di||S===Tr?X=i.DEPTH_COMPONENT24:S===$n?X=i.DEPTH_COMPONENT32F:S===Er&&(X=i.DEPTH_COMPONENT16),X}function b(P,S){return d(P)===!0||P.isFramebufferTexture&&P.minFilter!==un&&P.minFilter!==xn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function C(P){const S=P.target;S.removeEventListener("dispose",C),A(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&f.delete(S)}function x(P){const S=P.target;S.removeEventListener("dispose",x),L(S)}function A(P){const S=n.get(P);if(S.__webglInit===void 0)return;const X=P.source,$=p.get(X);if($){const re=$[S.__cacheKey];re.usedTimes--,re.usedTimes===0&&I(P),Object.keys($).length===0&&p.delete(X)}n.remove(P)}function I(P){const S=n.get(P);i.deleteTexture(S.__webglTexture);const X=P.source,$=p.get(X);delete $[S.__cacheKey],a.memory.textures--}function L(P){const S=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(S.__webglFramebuffer[$]))for(let re=0;re<S.__webglFramebuffer[$].length;re++)i.deleteFramebuffer(S.__webglFramebuffer[$][re]);else i.deleteFramebuffer(S.__webglFramebuffer[$]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[$])}else{if(Array.isArray(S.__webglFramebuffer))for(let $=0;$<S.__webglFramebuffer.length;$++)i.deleteFramebuffer(S.__webglFramebuffer[$]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let $=0;$<S.__webglColorRenderbuffer.length;$++)S.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[$]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const X=P.textures;for(let $=0,re=X.length;$<re;$++){const de=n.get(X[$]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),n.remove(X[$])}n.remove(P)}let z=0;function J(){z=0}function Q(){return z}function B(P){z=P}function q(){const P=z;return P>=s.maxTextures&&lt("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),z+=1,P}function W(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function ne(P,S){const X=n.get(P);if(P.isVideoTexture&&k(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&X.__version!==P.version){const $=P.image;if($===null)lt("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)lt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(X,P,S);return}}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+S)}function ae(P,S){const X=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){Ce(X,P,S);return}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+S)}function fe(P,S){const X=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){Ce(X,P,S);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+S)}function me(P,S){const X=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&X.__version!==P.version){Ve(X,P,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+S)}const Y={[vn]:i.REPEAT,[wi]:i.CLAMP_TO_EDGE,[Jo]:i.MIRRORED_REPEAT},ue={[un]:i.NEAREST,[Sf]:i.NEAREST_MIPMAP_NEAREST,[Hr]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[Ja]:i.LINEAR_MIPMAP_NEAREST,[rs]:i.LINEAR_MIPMAP_LINEAR},Fe={[Ef]:i.NEVER,[Pf]:i.ALWAYS,[Tf]:i.LESS,[$l]:i.LEQUAL,[Af]:i.EQUAL,[Kl]:i.GEQUAL,[Rf]:i.GREATER,[Cf]:i.NOTEQUAL};function Te(P,S){if(S.type===$n&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===xn||S.magFilter===Ja||S.magFilter===Hr||S.magFilter===rs||S.minFilter===xn||S.minFilter===Ja||S.minFilter===Hr||S.minFilter===rs)&&lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Y[S.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Y[S.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Y[S.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,ue[S.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,ue[S.minFilter]),S.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Fe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===un||S.minFilter!==Hr&&S.minFilter!==rs||S.type===$n&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ie(P,S){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",C));const $=S.source;let re=p.get($);re===void 0&&(re={},p.set($,re));const de=W(S);if(de!==P.__cacheKey){re[de]===void 0&&(re[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),re[de].usedTimes++;const we=re[P.__cacheKey];we!==void 0&&(re[P.__cacheKey].usedTimes--,we.usedTimes===0&&I(S)),P.__cacheKey=de,P.__webglTexture=re[de].texture}return X}function ye(P,S,X){return Math.floor(Math.floor(P/X)/S)}function ge(P,S,X,$){const de=P.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,X,$,S.data);else{de.sort((Je,De)=>Je.start-De.start);let we=0;for(let Je=1;Je<de.length;Je++){const De=de[we],Ae=de[Je],Ze=De.start+De.count,at=ye(Ae.start,S.width,4),ut=ye(De.start,S.width,4);Ae.start<=Ze+1&&at===ut&&ye(Ae.start+Ae.count-1,S.width,4)===at?De.count=Math.max(De.count,Ae.start+Ae.count-De.start):(++we,de[we]=Ae)}de.length=we+1;const se=t.getParameter(i.UNPACK_ROW_LENGTH),he=t.getParameter(i.UNPACK_SKIP_PIXELS),Pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let Je=0,De=de.length;Je<De;Je++){const Ae=de[Je],Ze=Math.floor(Ae.start/4),at=Math.ceil(Ae.count/4),ut=Ze%S.width,V=Math.floor(Ze/S.width),Ee=at,ce=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ut),t.pixelStorei(i.UNPACK_SKIP_ROWS,V),t.texSubImage2D(i.TEXTURE_2D,0,ut,V,Ee,ce,X,$,S.data)}P.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,se),t.pixelStorei(i.UNPACK_SKIP_PIXELS,he),t.pixelStorei(i.UNPACK_SKIP_ROWS,Pe)}}function Ce(P,S,X){let $=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&($=i.TEXTURE_3D);const re=ie(P,S),de=S.source;t.bindTexture($,P.__webglTexture,i.TEXTURE0+X);const we=n.get(de);if(de.version!==we.__version||re===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const ce=Rt.getPrimaries(Rt.workingColorSpace),Re=S.colorSpace===Vi?null:Rt.getPrimaries(S.colorSpace),Ne=S.colorSpace===Vi||ce===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne)}t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let he=m(S.image,!1,s.maxTextureSize);he=Ct(S,he);const Pe=r.convert(S.format,S.colorSpace),Je=r.convert(S.type);let De=y(S.internalFormat,Pe,Je,S.normalized,S.colorSpace,S.isVideoTexture);Te($,S);let Ae;const Ze=S.mipmaps,at=S.isVideoTexture!==!0,ut=we.__version===void 0||re===!0,V=de.dataReady,Ee=b(S,he);if(S.isDepthTexture)De=w(S.format===as,S.type),ut&&(at?t.texStorage2D(i.TEXTURE_2D,1,De,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,De,he.width,he.height,0,Pe,Je,null));else if(S.isDataTexture)if(Ze.length>0){at&&ut&&t.texStorage2D(i.TEXTURE_2D,Ee,De,Ze[0].width,Ze[0].height);for(let ce=0,Re=Ze.length;ce<Re;ce++)Ae=Ze[ce],at?V&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Ae.width,Ae.height,Pe,Je,Ae.data):t.texImage2D(i.TEXTURE_2D,ce,De,Ae.width,Ae.height,0,Pe,Je,Ae.data);S.generateMipmaps=!1}else at?(ut&&t.texStorage2D(i.TEXTURE_2D,Ee,De,he.width,he.height),V&&ge(S,he,Pe,Je)):t.texImage2D(i.TEXTURE_2D,0,De,he.width,he.height,0,Pe,Je,he.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){at&&ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,De,Ze[0].width,Ze[0].height,he.depth);for(let ce=0,Re=Ze.length;ce<Re;ce++)if(Ae=Ze[ce],S.format!==Kn)if(Pe!==null)if(at){if(V)if(S.layerUpdates.size>0){const Ne=lh(Ae.width,Ae.height,S.format,S.type);for(const ve of S.layerUpdates){const $e=Ae.data.subarray(ve*Ne/Ae.data.BYTES_PER_ELEMENT,(ve+1)*Ne/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,ve,Ae.width,Ae.height,1,Pe,$e)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Ae.width,Ae.height,he.depth,Pe,Ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ce,De,Ae.width,Ae.height,he.depth,0,Ae.data,0,0);else lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Ae.width,Ae.height,he.depth,Pe,Je,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ce,De,Ae.width,Ae.height,he.depth,0,Pe,Je,Ae.data)}else{at&&ut&&t.texStorage2D(i.TEXTURE_2D,Ee,De,Ze[0].width,Ze[0].height);for(let ce=0,Re=Ze.length;ce<Re;ce++)Ae=Ze[ce],S.format!==Kn?Pe!==null?at?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,ce,0,0,Ae.width,Ae.height,Pe,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,ce,De,Ae.width,Ae.height,0,Ae.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?V&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Ae.width,Ae.height,Pe,Je,Ae.data):t.texImage2D(i.TEXTURE_2D,ce,De,Ae.width,Ae.height,0,Pe,Je,Ae.data)}else if(S.isDataArrayTexture)if(at){if(ut&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,De,he.width,he.height,he.depth),V)if(S.layerUpdates.size>0){const ce=lh(he.width,he.height,S.format,S.type);for(const Re of S.layerUpdates){const Ne=he.data.subarray(Re*ce/he.data.BYTES_PER_ELEMENT,(Re+1)*ce/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Re,he.width,he.height,1,Pe,Je,Ne)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Pe,Je,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,De,he.width,he.height,he.depth,0,Pe,Je,he.data);else if(S.isData3DTexture)at?(ut&&t.texStorage3D(i.TEXTURE_3D,Ee,De,he.width,he.height,he.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Pe,Je,he.data)):t.texImage3D(i.TEXTURE_3D,0,De,he.width,he.height,he.depth,0,Pe,Je,he.data);else if(S.isFramebufferTexture){if(ut)if(at)t.texStorage2D(i.TEXTURE_2D,Ee,De,he.width,he.height);else{let ce=he.width,Re=he.height;for(let Ne=0;Ne<Ee;Ne++)t.texImage2D(i.TEXTURE_2D,Ne,De,ce,Re,0,Pe,Je,null),ce>>=1,Re>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){const ce=i.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),he.parentNode!==ce){ce.appendChild(he),f.add(S),ce.onpaint=Re=>{const Ne=Re.changedElements;for(const ve of f)Ne.includes(ve.image)&&(ve.needsUpdate=!0)},ce.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,he);else{const Ne=i.RGBA,ve=i.RGBA,$e=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ne,ve,$e,he)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ze.length>0){if(at&&ut){const ce=Mt(Ze[0]);t.texStorage2D(i.TEXTURE_2D,Ee,De,ce.width,ce.height)}for(let ce=0,Re=Ze.length;ce<Re;ce++)Ae=Ze[ce],at?V&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Pe,Je,Ae):t.texImage2D(i.TEXTURE_2D,ce,De,Pe,Je,Ae);S.generateMipmaps=!1}else if(at){if(ut){const ce=Mt(he);t.texStorage2D(i.TEXTURE_2D,Ee,De,ce.width,ce.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Pe,Je,he)}else t.texImage2D(i.TEXTURE_2D,0,De,Pe,Je,he);d(S)&&M($),we.__version=de.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Ve(P,S,X){if(S.image.length!==6)return;const $=ie(P,S),re=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+X);const de=n.get(re);if(re.version!==de.__version||$===!0){t.activeTexture(i.TEXTURE0+X);const we=Rt.getPrimaries(Rt.workingColorSpace),se=S.colorSpace===Vi?null:Rt.getPrimaries(S.colorSpace),he=S.colorSpace===Vi||we===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Pe=S.isCompressedTexture||S.image[0].isCompressedTexture,Je=S.image[0]&&S.image[0].isDataTexture,De=[];for(let ve=0;ve<6;ve++)!Pe&&!Je?De[ve]=m(S.image[ve],!0,s.maxCubemapSize):De[ve]=Je?S.image[ve].image:S.image[ve],De[ve]=Ct(S,De[ve]);const Ae=De[0],Ze=r.convert(S.format,S.colorSpace),at=r.convert(S.type),ut=y(S.internalFormat,Ze,at,S.normalized,S.colorSpace),V=S.isVideoTexture!==!0,Ee=de.__version===void 0||$===!0,ce=re.dataReady;let Re=b(S,Ae);Te(i.TEXTURE_CUBE_MAP,S);let Ne;if(Pe){V&&Ee&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ut,Ae.width,Ae.height);for(let ve=0;ve<6;ve++){Ne=De[ve].mipmaps;for(let $e=0;$e<Ne.length;$e++){const We=Ne[$e];S.format!==Kn?Ze!==null?V?ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e,0,0,We.width,We.height,Ze,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e,ut,We.width,We.height,0,We.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e,0,0,We.width,We.height,Ze,at,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e,ut,We.width,We.height,0,Ze,at,We.data)}}}else{if(Ne=S.mipmaps,V&&Ee){Ne.length>0&&Re++;const ve=Mt(De[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,ut,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Je){V?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,De[ve].width,De[ve].height,Ze,at,De[ve].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ut,De[ve].width,De[ve].height,0,Ze,at,De[ve].data);for(let $e=0;$e<Ne.length;$e++){const Vt=Ne[$e].image[ve].image;V?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e+1,0,0,Vt.width,Vt.height,Ze,at,Vt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e+1,ut,Vt.width,Vt.height,0,Ze,at,Vt.data)}}else{V?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Ze,at,De[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ut,Ze,at,De[ve]);for(let $e=0;$e<Ne.length;$e++){const We=Ne[$e];V?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e+1,0,0,Ze,at,We.image[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,$e+1,ut,Ze,at,We.image[ve])}}}d(S)&&M(i.TEXTURE_CUBE_MAP),de.__version=re.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Be(P,S,X,$,re,de){const we=r.convert(X.format,X.colorSpace),se=r.convert(X.type),he=y(X.internalFormat,we,se,X.normalized,X.colorSpace),Pe=n.get(S),Je=n.get(X);if(Je.__renderTarget=S,!Pe.__hasExternalTextures){const De=Math.max(1,S.width>>de),Ae=Math.max(1,S.height>>de);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,de,he,De,Ae,S.depth,0,we,se,null):t.texImage2D(re,de,he,De,Ae,0,we,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,P),ct(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,re,Je.__webglTexture,0,ot(S)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,re,Je.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function st(P,S,X){if(i.bindRenderbuffer(i.RENDERBUFFER,P),S.depthBuffer){const $=S.depthTexture,re=$&&$.isDepthTexture?$.type:null,de=w(S.stencilBuffer,re),we=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ct(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(S),de,S.width,S.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(S),de,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,de,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,P)}else{const $=S.textures;for(let re=0;re<$.length;re++){const de=$[re],we=r.convert(de.format,de.colorSpace),se=r.convert(de.type),he=y(de.internalFormat,we,se,de.normalized,de.colorSpace);ct(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(S),he,S.width,S.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(S),he,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,he,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ge(P,S,X){const $=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=n.get(S.depthTexture);if(re.__renderTarget=S,(!re.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),$){if(re.__webglInit===void 0&&(re.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),re.__webglTexture===void 0){re.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),Te(i.TEXTURE_CUBE_MAP,S.depthTexture);const Pe=r.convert(S.depthTexture.format),Je=r.convert(S.depthTexture.type);let De;S.depthTexture.format===Ci?De=i.DEPTH_COMPONENT24:S.depthTexture.format===as&&(De=i.DEPTH24_STENCIL8);for(let Ae=0;Ae<6;Ae++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,De,S.width,S.height,0,Pe,Je,null)}}else ne(S.depthTexture,0);const de=re.__webglTexture,we=ot(S),se=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,he=S.depthTexture.format===as?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ci)ct(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,se,de,0,we):i.framebufferTexture2D(i.FRAMEBUFFER,he,se,de,0);else if(S.depthTexture.format===as)ct(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,se,de,0,we):i.framebufferTexture2D(i.FRAMEBUFFER,he,se,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function oe(P){const S=n.get(P),X=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const $=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),$){const re=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,$.removeEventListener("dispose",re)};$.addEventListener("dispose",re),S.__depthDisposeCallback=re}S.__boundDepthTexture=$}if(P.depthTexture&&!S.__autoAllocateDepthBuffer)if(X)for(let $=0;$<6;$++)Ge(S.__webglFramebuffer[$],P,$);else{const $=P.texture.mipmaps;$&&$.length>0?Ge(S.__webglFramebuffer[0],P,0):Ge(S.__webglFramebuffer,P,0)}else if(X){S.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[$]),S.__webglDepthbuffer[$]===void 0)S.__webglDepthbuffer[$]=i.createRenderbuffer(),st(S.__webglDepthbuffer[$],P,!1);else{const re=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,de)}}else{const $=P.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),st(S.__webglDepthbuffer,P,!1);else{const re=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,de)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function pe(P,S,X){const $=n.get(P);S!==void 0&&Be($.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&oe(P)}function _e(P){const S=P.texture,X=n.get(P),$=n.get(S);P.addEventListener("dispose",x);const re=P.textures,de=P.isWebGLCubeRenderTarget===!0,we=re.length>1;if(we||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=S.version,a.memory.textures++),de){X.__webglFramebuffer=[];for(let se=0;se<6;se++)if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer[se]=[];for(let he=0;he<S.mipmaps.length;he++)X.__webglFramebuffer[se][he]=i.createFramebuffer()}else X.__webglFramebuffer[se]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer=[];for(let se=0;se<S.mipmaps.length;se++)X.__webglFramebuffer[se]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(we)for(let se=0,he=re.length;se<he;se++){const Pe=n.get(re[se]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(P.samples>0&&ct(P)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let se=0;se<re.length;se++){const he=re[se];X.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[se]);const Pe=r.convert(he.format,he.colorSpace),Je=r.convert(he.type),De=y(he.internalFormat,Pe,Je,he.normalized,he.colorSpace,P.isXRRenderTarget===!0),Ae=ot(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,De,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,X.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),st(X.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Te(i.TEXTURE_CUBE_MAP,S);for(let se=0;se<6;se++)if(S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)Be(X.__webglFramebuffer[se][he],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,he);else Be(X.__webglFramebuffer[se],P,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);d(S)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let se=0,he=re.length;se<he;se++){const Pe=re[se],Je=n.get(Pe);let De=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(De=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(De,Je.__webglTexture),Te(De,Pe),Be(X.__webglFramebuffer,P,Pe,i.COLOR_ATTACHMENT0+se,De,0),d(Pe)&&M(De)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(se=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,$.__webglTexture),Te(se,S),S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)Be(X.__webglFramebuffer[he],P,S,i.COLOR_ATTACHMENT0,se,he);else Be(X.__webglFramebuffer,P,S,i.COLOR_ATTACHMENT0,se,0);d(S)&&M(se),t.unbindTexture()}P.depthBuffer&&oe(P)}function Se(P){const S=P.textures;for(let X=0,$=S.length;X<$;X++){const re=S[X];if(d(re)){const de=v(P),we=n.get(re).__webglTexture;t.bindTexture(de,we),M(de),t.unbindTexture()}}}const Me=[],nt=[];function Ye(P){if(P.samples>0){if(ct(P)===!1){const S=P.textures,X=P.width,$=P.height;let re=i.COLOR_BUFFER_BIT;const de=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(P),se=S.length>1;if(se)for(let Pe=0;Pe<S.length;Pe++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const he=P.texture.mipmaps;he&&he.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Pe=0;Pe<S.length;Pe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[Pe]);const Je=n.get(S[Pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Je,0)}i.blitFramebuffer(0,0,X,$,0,0,X,$,re,i.NEAREST),o===!0&&(Me.length=0,nt.length=0,Me.push(i.COLOR_ATTACHMENT0+Pe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Me.push(de),nt.push(de),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let Pe=0;Pe<S.length;Pe++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,we.__webglColorRenderbuffer[Pe]);const Je=n.get(S[Pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,Je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&o){const S=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function ot(P){return Math.min(s.maxSamples,P.samples)}function ct(P){const S=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function k(P){const S=a.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function Ct(P,S){const X=P.colorSpace,$=P.format,re=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==Pa&&X!==Vi&&(Rt.getTransfer(X)===kt?($!==Kn||re!==In)&&lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):wt("WebGLTextures: Unsupported texture color space:",X)),S}function Mt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=J,this.getTextureUnits=Q,this.setTextureUnits=B,this.setTexture2D=ne,this.setTexture2DArray=ae,this.setTexture3D=fe,this.setTextureCube=me,this.rebindTextures=pe,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=Be,this.useMultisampledRTT=ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function z_(i,e){function t(n,s=Vi){let r;const a=Rt.getTransfer(s);if(n===In)return i.UNSIGNED_BYTE;if(n===Gl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Wl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$h)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Yh)return i.BYTE;if(n===Zh)return i.SHORT;if(n===Er)return i.UNSIGNED_SHORT;if(n===Hl)return i.INT;if(n===di)return i.UNSIGNED_INT;if(n===$n)return i.FLOAT;if(n===Ri)return i.HALF_FLOAT;if(n===Jh)return i.ALPHA;if(n===jh)return i.RGB;if(n===Kn)return i.RGBA;if(n===Ci)return i.DEPTH_COMPONENT;if(n===as)return i.DEPTH_STENCIL;if(n===Xl)return i.RED;if(n===ql)return i.RED_INTEGER;if(n===ls)return i.RG;if(n===Yl)return i.RG_INTEGER;if(n===Zl)return i.RGBA_INTEGER;if(n===Ma||n===Sa||n===ba||n===wa)if(a===kt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jo||n===Qo||n===el||n===tl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nl||n===il||n===sl||n===rl||n===al||n===Aa||n===ol)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nl||n===il)return a===kt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===rl)return r.COMPRESSED_R11_EAC;if(n===al)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Aa)return r.COMPRESSED_RG11_EAC;if(n===ol)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ll||n===cl||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===_l||n===vl||n===xl||n===yl||n===Ml)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ll)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===cl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ul)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ml)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_l)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yl)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ml)return a===kt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sl||n===bl||n===wl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Sl)return a===kt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===El||n===Tl||n===Ra||n===Al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===El)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ra)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const V_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H_=`
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

}`;class G_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new hu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new pi({vertexShader:V_,fragmentShader:H_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xe(new fn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W_ extends qi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,h=null,f=null,u=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new G_,d={},M=t.getContextAttributes();let v=null,y=null;const w=[],b=[],C=new j;let x=null;const A=new Dn;A.viewport=new Jt;const I=new Dn;I.viewport=new Jt;const L=[A,I],z=new Kd;let J=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let ye=w[ie];return ye===void 0&&(ye=new so,w[ie]=ye),ye.getTargetRaySpace()},this.getControllerGrip=function(ie){let ye=w[ie];return ye===void 0&&(ye=new so,w[ie]=ye),ye.getGripSpace()},this.getHand=function(ie){let ye=w[ie];return ye===void 0&&(ye=new so,w[ie]=ye),ye.getHandSpace()};function B(ie){const ye=b.indexOf(ie.inputSource);if(ye===-1)return;const ge=w[ye];ge!==void 0&&(ge.update(ie.inputSource,ie.frame,l||a),ge.dispatchEvent({type:ie.type,data:ie.inputSource}))}function q(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",W);for(let ie=0;ie<w.length;ie++){const ye=b[ie];ye!==null&&(b[ie]=null,w[ie].disconnect(ye))}J=null,Q=null,m.reset();for(const ie in d)delete d[ie];e.setRenderTarget(v),p=null,u=null,f=null,s=null,y=null,Te.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){c=ie,n.isPresenting===!0&&lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ie){l=ie},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(v=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",q),s.addEventListener("inputsourceschange",W),M.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Ce=null,Ve=null;M.depth&&(Ve=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=M.stencil?as:Ci,Ce=M.stencil?Tr:di);const Be={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Be),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new fi(u.textureWidth,u.textureHeight,{format:Kn,type:In,depthTexture:new Ys(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ge={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ge),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new fi(p.framebufferWidth,p.framebufferHeight,{format:Kn,type:In,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),Te.setContext(s),Te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function W(ie){for(let ye=0;ye<ie.removed.length;ye++){const ge=ie.removed[ye],Ce=b.indexOf(ge);Ce>=0&&(b[Ce]=null,w[Ce].disconnect(ge))}for(let ye=0;ye<ie.added.length;ye++){const ge=ie.added[ye];let Ce=b.indexOf(ge);if(Ce===-1){for(let Be=0;Be<w.length;Be++)if(Be>=b.length){b.push(ge),Ce=Be;break}else if(b[Be]===null){b[Be]=ge,Ce=Be;break}if(Ce===-1)break}const Ve=w[Ce];Ve&&Ve.connect(ge)}}const ne=new U,ae=new U;function fe(ie,ye,ge){ne.setFromMatrixPosition(ye.matrixWorld),ae.setFromMatrixPosition(ge.matrixWorld);const Ce=ne.distanceTo(ae),Ve=ye.projectionMatrix.elements,Be=ge.projectionMatrix.elements,st=Ve[14]/(Ve[10]-1),Ge=Ve[14]/(Ve[10]+1),oe=(Ve[9]+1)/Ve[5],pe=(Ve[9]-1)/Ve[5],_e=(Ve[8]-1)/Ve[0],Se=(Be[8]+1)/Be[0],Me=st*_e,nt=st*Se,Ye=Ce/(-_e+Se),ot=Ye*-_e;if(ye.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(ot),ie.translateZ(Ye),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Ve[10]===-1)ie.projectionMatrix.copy(ye.projectionMatrix),ie.projectionMatrixInverse.copy(ye.projectionMatrixInverse);else{const ct=st+Ye,k=Ge+Ye,Ct=Me-ot,Mt=nt+(Ce-ot),P=oe*Ge/k*ct,S=pe*Ge/k*ct;ie.projectionMatrix.makePerspective(Ct,Mt,P,S,ct,k),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function me(ie,ye){ye===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(ye.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;let ye=ie.near,ge=ie.far;m.texture!==null&&(m.depthNear>0&&(ye=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),z.near=I.near=A.near=ye,z.far=I.far=A.far=ge,(J!==z.near||Q!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),J=z.near,Q=z.far),z.layers.mask=ie.layers.mask|6,A.layers.mask=z.layers.mask&-5,I.layers.mask=z.layers.mask&-3;const Ce=ie.parent,Ve=z.cameras;me(z,Ce);for(let Be=0;Be<Ve.length;Be++)me(Ve[Be],Ce);Ve.length===2?fe(z,A,I):z.projectionMatrix.copy(A.projectionMatrix),Y(ie,z,Ce)};function Y(ie,ye,ge){ge===null?ie.matrix.copy(ye.matrixWorld):(ie.matrix.copy(ge.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(ye.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(ye.projectionMatrix),ie.projectionMatrixInverse.copy(ye.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Cl*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&p===null))return o},this.setFoveation=function(ie){o=ie,u!==null&&(u.fixedFoveation=ie),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ie)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(ie){return d[ie]};let ue=null;function Fe(ie,ye){if(h=ye.getViewerPose(l||a),g=ye,h!==null){const ge=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Ce=!1;ge.length!==z.cameras.length&&(z.cameras.length=0,Ce=!0);for(let Ge=0;Ge<ge.length;Ge++){const oe=ge[Ge];let pe=null;if(p!==null)pe=p.getViewport(oe);else{const Se=f.getViewSubImage(u,oe);pe=Se.viewport,Ge===0&&(e.setRenderTargetTextures(y,Se.colorTexture,Se.depthStencilTexture),e.setRenderTarget(y))}let _e=L[Ge];_e===void 0&&(_e=new Dn,_e.layers.enable(Ge),_e.viewport=new Jt,L[Ge]=_e),_e.matrix.fromArray(oe.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(oe.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(pe.x,pe.y,pe.width,pe.height),Ge===0&&(z.matrix.copy(_e.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ce===!0&&z.cameras.push(_e)}const Ve=s.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const Ge=f.getDepthInformation(ge[0]);Ge&&Ge.isValid&&Ge.texture&&m.init(Ge,s.renderState)}if(Ve&&Ve.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let Ge=0;Ge<ge.length;Ge++){const oe=ge[Ge].camera;if(oe){let pe=d[oe];pe||(pe=new hu,d[oe]=pe);const _e=f.getCameraImage(oe);pe.sourceTexture=_e}}}}for(let ge=0;ge<w.length;ge++){const Ce=b[ge],Ve=w[ge];Ce!==null&&Ve!==void 0&&Ve.update(Ce,ye,l||a)}ue&&ue(ie,ye),ye.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ye}),g=null}const Te=new Eu;Te.setAnimationLoop(Fe),this.setAnimationLoop=function(ie){ue=ie},this.dispose=function(){}}}const X_=new Ft,Iu=new pt;Iu.set(-1,0,0,0,1,0,0,0,1);function q_(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,yu(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,M,v,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),u(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&c(m,d)):d.isPointsMaterial?o(m,d,M,v):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===bn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===bn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const M=e.get(d),v=M.envMap,y=M.envMapRotation;v&&(m.envMap.value=v,m.envMapRotation.value.setFromMatrix4(X_.makeRotationFromEuler(y)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Iu),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function c(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function o(m,d,M,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*M,m.scale.value=v*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function u(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,M){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===bn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const M=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Y_(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(y,w){const b=w.program;n.uniformBlockBinding(y,b)}function l(y,w){let b=s[y.id];b===void 0&&(m(y),b=h(y),s[y.id]=b,y.addEventListener("dispose",M));const C=w.program;n.updateUBOMapping(y,C);const x=e.render.frame;r[y.id]!==x&&(u(y),r[y.id]=x)}function h(y){const w=f();y.__bindingPointIndex=w;const b=i.createBuffer(),C=y.__size,x=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,b),b}function f(){for(let y=0;y<c;y++)if(a.indexOf(y)===-1)return a.push(y),y;return wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const w=s[y.id],b=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let x=0,A=b.length;x<A;x++){const I=b[x];if(Array.isArray(I))for(let L=0,z=I.length;L<z;L++)p(I[L],x,L,C);else p(I,x,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,w,b,C){if(_(y,w,b,C)===!0){const x=y.__offset,A=y.value;if(Array.isArray(A)){let I=0;for(let L=0;L<A.length;L++){const z=A[L],J=d(z);g(z,y.__data,I),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(I+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function g(y,w,b){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,b)}function _(y,w,b,C){const x=y.value,A=w+"_"+b;if(C[A]===void 0)return typeof x=="number"||typeof x=="boolean"?C[A]=x:ArrayBuffer.isView(x)?C[A]=x.slice():C[A]=x.clone(),!0;{const I=C[A];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return C[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function m(y){const w=y.uniforms;let b=0;const C=16;for(let A=0,I=w.length;A<I;A++){const L=Array.isArray(w[A])?w[A]:[w[A]];for(let z=0,J=L.length;z<J;z++){const Q=L[z],B=Array.isArray(Q.value)?Q.value:[Q.value];for(let q=0,W=B.length;q<W;q++){const ne=B[q],ae=d(ne),fe=b%C,me=fe%ae.boundary,Y=fe+me;b+=me,Y!==0&&C-Y<ae.storage&&(b+=C-Y),Q.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=b,b+=ae.storage}}}const x=b%C;return x>0&&(b+=C-x),y.__size=b,y.__cache={},this}function d(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):lt("WebGLRenderer: Unsupported uniform value type.",y),w}function M(y){const w=y.target;w.removeEventListener("dispose",M);const b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function v(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:o,update:l,dispose:v}}const Z_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ii=null;function $_(){return ii===null&&(ii=new au(Z_,16,16,ls,Ri),ii.name="DFG_LUT",ii.minFilter=xn,ii.magFilter=xn,ii.wrapS=wi,ii.wrapT=wi,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class K_{constructor(e={}){const{canvas:t=If(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=In}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=p,m=new Set([Zl,Yl,ql]),d=new Set([In,di,Er,Tr,Gl,Wl]),M=new Uint32Array(4),v=new Int32Array(4),y=new U;let w=null,b=null;const C=[],x=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let L=!1,z=null,J=null,Q=null,B=null;this._outputColorSpace=hn;let q=0,W=0,ne=null,ae=-1,fe=null;const me=new Jt,Y=new Jt;let ue=null;const Fe=new gt(0);let Te=0,ie=t.width,ye=t.height,ge=1,Ce=null,Ve=null;const Be=new Jt(0,0,ie,ye),st=new Jt(0,0,ie,ye);let Ge=!1;const oe=new Ql;let pe=!1,_e=!1;const Se=new Ft,Me=new U,nt=new Jt,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function ct(){return ne===null?ge:1}let k=n;function Ct(E,H){return t.getContext(E,H)}try{const E={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${kl}`),t.addEventListener("webglcontextlost",Vt,!1),t.addEventListener("webglcontextrestored",It,!1),t.addEventListener("webglcontextcreationerror",Ln,!1),k===null){const H="webgl2";if(k=Ct(H,E),k===null)throw Ct(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw wt("WebGLRenderer: "+E.message),E}let Mt,P,S,X,$,re,de,we,se,he,Pe,Je,De,Ae,Ze,at,ut,V,Ee,ce,Re,Ne,ve;function $e(){Mt=new $m(k),Mt.init(),Re=new z_(k,Mt),P=new Vm(k,Mt,e,Re),S=new B_(k,Mt),P.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),J=k.createFramebuffer(),Q=k.createFramebuffer(),B=k.createFramebuffer(),X=new jm(k),$=new w_,re=new k_(k,Mt,S,$,P,Re,X),de=new Zm(I),we=new np(k),Ne=new km(k,we),se=new Km(k,we,X,Ne),he=new eg(k,se,we,Ne,X),V=new Qm(k,P,re),Ze=new Hm($),Pe=new b_(I,de,Mt,P,Ne,Ze),Je=new q_(I,$),De=new T_,Ae=new I_(Mt),ut=new Bm(I,de,S,he,g,o),at=new O_(I,he,P),ve=new Y_(k,X,P,S),Ee=new zm(k,Mt,X),ce=new Jm(k,Mt,X),X.programs=Pe.programs,I.capabilities=P,I.extensions=Mt,I.properties=$,I.renderLists=De,I.shadowMap=at,I.state=S,I.info=X}$e(),_!==In&&(A=new ng(_,t.width,t.height,c,s,r));const We=new W_(I,k);this.xr=We,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const E=Mt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Mt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(E){E!==void 0&&(ge=E,this.setSize(ie,ye,!1))},this.getSize=function(E){return E.set(ie,ye)},this.setSize=function(E,H,ee=!0){if(We.isPresenting){lt("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=E,ye=H,t.width=Math.floor(E*ge),t.height=Math.floor(H*ge),ee===!0&&(t.style.width=E+"px",t.style.height=H+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(ie*ge,ye*ge).floor()},this.setDrawingBufferSize=function(E,H,ee){ie=E,ye=H,ge=ee,t.width=Math.floor(E*ee),t.height=Math.floor(H*ee),this.setViewport(0,0,E,H)},this.setEffects=function(E){if(_===In){wt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let H=0;H<E.length;H++)if(E[H].isOutputPass===!0){lt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(me)},this.getViewport=function(E){return E.copy(Be)},this.setViewport=function(E,H,ee,Z){E.isVector4?Be.set(E.x,E.y,E.z,E.w):Be.set(E,H,ee,Z),S.viewport(me.copy(Be).multiplyScalar(ge).round())},this.getScissor=function(E){return E.copy(st)},this.setScissor=function(E,H,ee,Z){E.isVector4?st.set(E.x,E.y,E.z,E.w):st.set(E,H,ee,Z),S.scissor(Y.copy(st).multiplyScalar(ge).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(E){S.setScissorTest(Ge=E)},this.setOpaqueSort=function(E){Ce=E},this.setTransparentSort=function(E){Ve=E},this.getClearColor=function(E){return E.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor(...arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha(...arguments)},this.clear=function(E=!0,H=!0,ee=!0){let Z=0;if(E){let K=!1;if(ne!==null){const Ie=ne.texture.format;K=m.has(Ie)}if(K){const Ie=ne.texture.type,ke=d.has(Ie),Le=ut.getClearColor(),qe=ut.getClearAlpha(),je=Le.r,ft=Le.g,_t=Le.b;ke?(M[0]=je,M[1]=ft,M[2]=_t,M[3]=qe,k.clearBufferuiv(k.COLOR,0,M)):(v[0]=je,v[1]=ft,v[2]=_t,v[3]=qe,k.clearBufferiv(k.COLOR,0,v))}else Z|=k.COLOR_BUFFER_BIT}H&&(Z|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&(Z|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&k.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),z=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Vt,!1),t.removeEventListener("webglcontextrestored",It,!1),t.removeEventListener("webglcontextcreationerror",Ln,!1),ut.dispose(),De.dispose(),Ae.dispose(),$.dispose(),de.dispose(),he.dispose(),Ne.dispose(),ve.dispose(),Pe.dispose(),We.dispose(),We.removeEventListener("sessionstart",Qs),We.removeEventListener("sessionend",er),Hn.stop()};function Vt(E){E.preventDefault(),La("WebGLRenderer: Context Lost."),L=!0}function It(){La("WebGLRenderer: Context Restored."),L=!1;const E=X.autoReset,H=at.enabled,ee=at.autoUpdate,Z=at.needsUpdate,K=at.type;$e(),X.autoReset=E,at.enabled=H,at.autoUpdate=ee,at.needsUpdate=Z,at.type=K}function Ln(E){wt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function dn(E){const H=E.target;H.removeEventListener("dispose",dn),us(H)}function us(E){Nr(E),$.remove(E)}function Nr(E){const H=$.get(E).programs;H!==void 0&&(H.forEach(function(ee){Pe.releaseProgram(ee)}),E.isShaderMaterial&&Pe.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,ee,Z,K,Ie){H===null&&(H=Ye);const ke=K.isMesh&&K.matrixWorld.determinantAffine()<0,Le=Br(E,H,ee,Z,K);S.setMaterial(Z,ke);let qe=ee.index,je=1;if(Z.wireframe===!0){if(qe=se.getWireframeAttribute(ee),qe===void 0)return;je=2}const ft=ee.drawRange,_t=ee.attributes.position;let Qe=ft.start*je,Oe=(ft.start+ft.count)*je;Ie!==null&&(Qe=Math.max(Qe,Ie.start*je),Oe=Math.min(Oe,(Ie.start+Ie.count)*je)),qe!==null?(Qe=Math.max(Qe,0),Oe=Math.min(Oe,qe.count)):_t!=null&&(Qe=Math.max(Qe,0),Oe=Math.min(Oe,_t.count));const qt=Oe-Qe;if(qt<0||qt===1/0)return;Ne.setup(K,Z,Le,ee,qe);let Yt,Pt=Ee;if(qe!==null&&(Yt=we.get(qe),Pt=ce,Pt.setIndex(Yt)),K.isMesh)Z.wireframe===!0?(S.setLineWidth(Z.wireframeLinewidth*ct()),Pt.setMode(k.LINES)):Pt.setMode(k.TRIANGLES);else if(K.isLine){let sn=Z.linewidth;sn===void 0&&(sn=1),S.setLineWidth(sn*ct()),K.isLineSegments?Pt.setMode(k.LINES):K.isLineLoop?Pt.setMode(k.LINE_LOOP):Pt.setMode(k.LINE_STRIP)}else K.isPoints?Pt.setMode(k.POINTS):K.isSprite&&Pt.setMode(k.TRIANGLES);if(K.isBatchedMesh)if(Mt.get("WEBGL_multi_draw"))Pt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const sn=K._multiDrawStarts,ze=K._multiDrawCounts,pn=K._multiDrawCount,Tt=qe?we.get(qe).bytesPerElement:1,mn=$.get(Z).currentProgram.getUniforms();for(let En=0;En<pn;En++)mn.setValue(k,"_gl_DrawID",En),Pt.render(sn[En]/Tt,ze[En])}else if(K.isInstancedMesh)Pt.renderInstances(Qe,qt,K.count);else if(ee.isInstancedBufferGeometry){const sn=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,ze=Math.min(ee.instanceCount,sn);Pt.renderInstances(Qe,qt,ze)}else Pt.render(Qe,qt)};function jn(E,H,ee){E.transparent===!0&&E.side===Kt&&E.forceSinglePass===!1?(E.side=bn,E.needsUpdate=!0,ds(E,H,ee),E.side=Gi,E.needsUpdate=!0,ds(E,H,ee),E.side=Kt):ds(E,H,ee)}this.compile=function(E,H,ee=null){ee===null&&(ee=E),b=Ae.get(ee),b.init(H),x.push(b),ee.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),E!==ee&&E.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),b.setupLights();const Z=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ie=K.material;if(Ie)if(Array.isArray(Ie))for(let ke=0;ke<Ie.length;ke++){const Le=Ie[ke];jn(Le,ee,K),Z.add(Le)}else jn(Ie,ee,K),Z.add(Ie)}),b=x.pop(),Z},this.compileAsync=function(E,H,ee=null){const Z=this.compile(E,H,ee);return new Promise(K=>{function Ie(){if(Z.forEach(function(ke){$.get(ke).currentProgram.isReady()&&Z.delete(ke)}),Z.size===0){K(E);return}setTimeout(Ie,10)}Mt.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let Zi=null;function js(E){Zi&&Zi(E)}function Qs(){Hn.stop()}function er(){Hn.start()}const Hn=new Eu;Hn.setAnimationLoop(js),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(E){Zi=E,We.setAnimationLoop(E),E===null?Hn.stop():Hn.start()},We.addEventListener("sessionstart",Qs),We.addEventListener("sessionend",er),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;z!==null&&z.renderStart(E,H);const ee=We.enabled===!0&&We.isPresenting===!0,Z=A!==null&&(ne===null||ee)&&A.begin(I,ne);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(We.cameraAutoUpdate===!0&&We.updateCamera(H),H=We.getCamera()),E.isScene===!0&&E.onBeforeRender(I,E,H,ne),b=Ae.get(E,x.length),b.init(H),b.state.textureUnits=re.getTextureUnits(),x.push(b),Se.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),oe.setFromProjectionMatrix(Se,hi,H.reversedDepth),_e=this.localClippingEnabled,pe=Ze.init(this.clippingPlanes,_e),w=De.get(E,C.length),w.init(),C.push(w),We.enabled===!0&&We.isPresenting===!0){const ke=I.xr.getDepthSensingMesh();ke!==null&&$i(ke,H,-1/0,I.sortObjects)}$i(E,H,0,I.sortObjects),w.finish(),I.sortObjects===!0&&w.sort(Ce,Ve,H.reversedDepth),ot=We.enabled===!1||We.isPresenting===!1||We.hasDepthSensing()===!1,ot&&ut.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&Ze.beginShadows();const K=b.state.shadowsArray;if(at.render(K,E,H),pe===!0&&Ze.endShadows(),(Z&&A.hasRenderPass())===!1){const ke=w.opaque,Le=w.transmissive;if(b.setupLights(),H.isArrayCamera){const qe=H.cameras;if(Le.length>0)for(let je=0,ft=qe.length;je<ft;je++){const _t=qe[je];tr(ke,Le,E,_t)}ot&&ut.render(E);for(let je=0,ft=qe.length;je<ft;je++){const _t=qe[je];Ur(w,E,_t,_t.viewport)}}else Le.length>0&&tr(ke,Le,E,H),ot&&ut.render(E),Ur(w,E,H)}ne!==null&&W===0&&(re.updateMultisampleRenderTarget(ne),re.updateRenderTargetMipmap(ne)),Z&&A.end(I),E.isScene===!0&&E.onAfterRender(I,E,H),Ne.resetDefaultState(),ae=-1,fe=null,x.pop(),x.length>0?(b=x[x.length-1],re.setTextureUnits(b.state.textureUnits),pe===!0&&Ze.setGlobalState(I.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,z!==null&&z.renderEnd()};function $i(E,H,ee,Z){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)ee=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||oe.intersectsSprite(E)){Z&&nt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Se);const ke=he.update(E),Le=E.material;Le.visible&&w.push(E,ke,Le,ee,nt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||oe.intersectsObject(E))){const ke=he.update(E),Le=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),nt.copy(E.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),nt.copy(ke.boundingSphere.center)),nt.applyMatrix4(E.matrixWorld).applyMatrix4(Se)),Array.isArray(Le)){const qe=ke.groups;for(let je=0,ft=qe.length;je<ft;je++){const _t=qe[je],Qe=Le[_t.materialIndex];Qe&&Qe.visible&&w.push(E,ke,Qe,ee,nt.z,_t)}}else Le.visible&&w.push(E,ke,Le,ee,nt.z,null)}}const Ie=E.children;for(let ke=0,Le=Ie.length;ke<Le;ke++)$i(Ie[ke],H,ee,Z)}function Ur(E,H,ee,Z){const{opaque:K,transmissive:Ie,transparent:ke}=E;b.setupLightsView(ee),pe===!0&&Ze.setGlobalState(I.clippingPlanes,ee),Z&&S.viewport(me.copy(Z)),K.length>0&&fs(K,H,ee),Ie.length>0&&fs(Ie,H,ee),ke.length>0&&fs(ke,H,ee),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function tr(E,H,ee,Z){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[Z.id]===void 0){const Qe=Mt.has("EXT_color_buffer_half_float")||Mt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[Z.id]=new fi(1,1,{generateMipmaps:!0,type:Qe?Ri:In,minFilter:rs,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace})}const Ie=b.state.transmissionRenderTarget[Z.id],ke=Z.viewport||me;Ie.setSize(ke.z*I.transmissionResolutionScale,ke.w*I.transmissionResolutionScale);const Le=I.getRenderTarget(),qe=I.getActiveCubeFace(),je=I.getActiveMipmapLevel();I.setRenderTarget(Ie),I.getClearColor(Fe),Te=I.getClearAlpha(),Te<1&&I.setClearColor(16777215,.5),I.clear(),ot&&ut.render(ee);const ft=I.toneMapping;I.toneMapping=ui;const _t=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),b.setupLightsView(Z),pe===!0&&Ze.setGlobalState(I.clippingPlanes,Z),fs(E,ee,Z),re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie),Mt.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Oe=0,qt=H.length;Oe<qt;Oe++){const Yt=H[Oe],{object:Pt,geometry:sn,material:ze,group:pn}=Yt;if(ze.side===Kt&&Pt.layers.test(Z.layers)){const Tt=ze.side;ze.side=bn,ze.needsUpdate=!0,Ki(Pt,ee,Z,sn,ze,pn),ze.side=Tt,ze.needsUpdate=!0,Qe=!0}}Qe===!0&&(re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie))}I.setRenderTarget(Le,qe,je),I.setClearColor(Fe,Te),_t!==void 0&&(Z.viewport=_t),I.toneMapping=ft}function fs(E,H,ee){const Z=H.isScene===!0?H.overrideMaterial:null;for(let K=0,Ie=E.length;K<Ie;K++){const ke=E[K],{object:Le,geometry:qe,group:je}=ke;let ft=ke.material;ft.allowOverride===!0&&Z!==null&&(ft=Z),Le.layers.test(ee.layers)&&Ki(Le,H,ee,qe,ft,je)}}function Ki(E,H,ee,Z,K,Ie){E.onBeforeRender(I,H,ee,Z,K,Ie),E.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(I,H,ee,Z,E,Ie),K.transparent===!0&&K.side===Kt&&K.forceSinglePass===!1?(K.side=bn,K.needsUpdate=!0,I.renderBufferDirect(ee,H,Z,K,E,Ie),K.side=Gi,K.needsUpdate=!0,I.renderBufferDirect(ee,H,Z,K,E,Ie),K.side=Kt):I.renderBufferDirect(ee,H,Z,K,E,Ie),E.onAfterRender(I,H,ee,Z,K,Ie)}function ds(E,H,ee){H.isScene!==!0&&(H=Ye);const Z=$.get(E),K=b.state.lights,Ie=b.state.shadowsArray,ke=K.state.version,Le=Pe.getParameters(E,K.state,Ie,H,ee,b.state.lightProbeGridArray),qe=Pe.getProgramCacheKey(Le);let je=Z.programs;Z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?H.environment:null,Z.fog=H.fog;const ft=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Z.envMap=de.get(E.envMap||Z.environment,ft),Z.envMapRotation=Z.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,je===void 0&&(E.addEventListener("dispose",dn),je=new Map,Z.programs=je);let _t=je.get(qe);if(_t!==void 0){if(Z.currentProgram===_t&&Z.lightsStateVersion===ke)return Or(E,Le),_t}else Le.uniforms=Pe.getUniforms(E),z!==null&&E.isNodeMaterial&&z.build(E,ee,Le),E.onBeforeCompile(Le,I),_t=Pe.acquireProgram(Le,qe),je.set(qe,_t),Z.uniforms=Le.uniforms;const Qe=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Qe.clippingPlanes=Ze.uniform),Or(E,Le),Z.needsLights=Ya(E),Z.lightsStateVersion=ke,Z.needsLights&&(Qe.ambientLightColor.value=K.state.ambient,Qe.lightProbe.value=K.state.probe,Qe.directionalLights.value=K.state.directional,Qe.directionalLightShadows.value=K.state.directionalShadow,Qe.spotLights.value=K.state.spot,Qe.spotLightShadows.value=K.state.spotShadow,Qe.rectAreaLights.value=K.state.rectArea,Qe.ltc_1.value=K.state.rectAreaLTC1,Qe.ltc_2.value=K.state.rectAreaLTC2,Qe.pointLights.value=K.state.point,Qe.pointLightShadows.value=K.state.pointShadow,Qe.hemisphereLights.value=K.state.hemi,Qe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Qe.spotLightMatrix.value=K.state.spotLightMatrix,Qe.spotLightMap.value=K.state.spotLightMap,Qe.pointShadowMatrix.value=K.state.pointShadowMatrix),Z.lightProbeGrid=b.state.lightProbeGridArray.length>0,Z.currentProgram=_t,Z.uniformsList=null,_t}function Fr(E){if(E.uniformsList===null){const H=E.currentProgram.getUniforms();E.uniformsList=Ta.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function Or(E,H){const ee=$.get(E);ee.outputColorSpace=H.outputColorSpace,ee.batching=H.batching,ee.batchingColor=H.batchingColor,ee.instancing=H.instancing,ee.instancingColor=H.instancingColor,ee.instancingMorph=H.instancingMorph,ee.skinning=H.skinning,ee.morphTargets=H.morphTargets,ee.morphNormals=H.morphNormals,ee.morphColors=H.morphColors,ee.morphTargetsCount=H.morphTargetsCount,ee.numClippingPlanes=H.numClippingPlanes,ee.numIntersection=H.numClipIntersection,ee.vertexAlphas=H.vertexAlphas,ee.vertexTangents=H.vertexTangents,ee.toneMapping=H.toneMapping}function Gn(E,H){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(H.matrixWorld);for(let ee=0,Z=E.length;ee<Z;ee++){const K=E[ee];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function Br(E,H,ee,Z,K){H.isScene!==!0&&(H=Ye),re.resetTextureUnits();const Ie=H.fog,ke=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?H.environment:null,Le=ne===null?I.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Rt.workingColorSpace,qe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,je=de.get(Z.envMap||ke,qe),ft=Z.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,_t=!!ee.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Qe=!!ee.morphAttributes.position,Oe=!!ee.morphAttributes.normal,qt=!!ee.morphAttributes.color;let Yt=ui;Z.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Yt=I.toneMapping);const Pt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,sn=Pt!==void 0?Pt.length:0,ze=$.get(Z),pn=b.state.lights;if(pe===!0&&(_e===!0||E!==fe)){const Ht=E===fe&&Z.id===ae;Ze.setState(Z,E,Ht)}let Tt=!1;Z.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==pn.state.version||ze.outputColorSpace!==Le||K.isBatchedMesh&&ze.batching===!1||!K.isBatchedMesh&&ze.batching===!0||K.isBatchedMesh&&ze.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&ze.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&ze.instancing===!1||!K.isInstancedMesh&&ze.instancing===!0||K.isSkinnedMesh&&ze.skinning===!1||!K.isSkinnedMesh&&ze.skinning===!0||K.isInstancedMesh&&ze.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&ze.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&ze.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&ze.instancingMorph===!1&&K.morphTexture!==null||ze.envMap!==je||Z.fog===!0&&ze.fog!==Ie||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Ze.numPlanes||ze.numIntersection!==Ze.numIntersection)||ze.vertexAlphas!==ft||ze.vertexTangents!==_t||ze.morphTargets!==Qe||ze.morphNormals!==Oe||ze.morphColors!==qt||ze.toneMapping!==Yt||ze.morphTargetsCount!==sn||!!ze.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Tt=!0):(Tt=!0,ze.__version=Z.version);let mn=ze.currentProgram;Tt===!0&&(mn=ds(Z,H,K),z&&Z.isNodeMaterial&&z.onUpdateProgram(Z,mn,ze));let En=!1,Qn=!1,Tn=!1;const Nt=mn.getUniforms(),Zt=ze.uniforms;if(S.useProgram(mn.program)&&(En=!0,Qn=!0,Tn=!0),Z.id!==ae&&(ae=Z.id,Qn=!0),ze.needsLights){const Ht=Gn(b.state.lightProbeGridArray,K);ze.lightProbeGrid!==Ht&&(ze.lightProbeGrid=Ht,Qn=!0)}if(En||fe!==E){S.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Nt.setValue(k,"projectionMatrix",E.projectionMatrix),Nt.setValue(k,"viewMatrix",E.matrixWorldInverse);const Wn=Nt.map.cameraPosition;Wn!==void 0&&Wn.setValue(k,Me.setFromMatrixPosition(E.matrixWorld)),P.logarithmicDepthBuffer&&Nt.setValue(k,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Nt.setValue(k,"isOrthographic",E.isOrthographicCamera===!0),fe!==E&&(fe=E,Qn=!0,Tn=!0)}if(ze.needsLights&&(pn.state.directionalShadowMap.length>0&&Nt.setValue(k,"directionalShadowMap",pn.state.directionalShadowMap,re),pn.state.spotShadowMap.length>0&&Nt.setValue(k,"spotShadowMap",pn.state.spotShadowMap,re),pn.state.pointShadowMap.length>0&&Nt.setValue(k,"pointShadowMap",pn.state.pointShadowMap,re)),K.isSkinnedMesh){Nt.setOptional(k,K,"bindMatrix"),Nt.setOptional(k,K,"bindMatrixInverse");const Ht=K.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Nt.setValue(k,"boneTexture",Ht.boneTexture,re))}K.isBatchedMesh&&(Nt.setOptional(k,K,"batchingTexture"),Nt.setValue(k,"batchingTexture",K._matricesTexture,re),Nt.setOptional(k,K,"batchingIdTexture"),Nt.setValue(k,"batchingIdTexture",K._indirectTexture,re),Nt.setOptional(k,K,"batchingColorTexture"),K._colorsTexture!==null&&Nt.setValue(k,"batchingColorTexture",K._colorsTexture,re));const ei=ee.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&V.update(K,ee,mn),(Qn||ze.receiveShadow!==K.receiveShadow)&&(ze.receiveShadow=K.receiveShadow,Nt.setValue(k,"receiveShadow",K.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&H.environment!==null&&(Zt.envMapIntensity.value=H.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=$_()),Qn){if(Nt.setValue(k,"toneMappingExposure",I.toneMappingExposure),ze.needsLights&&qa(Zt,Tn),Ie&&Z.fog===!0&&Je.refreshFogUniforms(Zt,Ie),Je.refreshMaterialUniforms(Zt,Z,ge,ye,b.state.transmissionRenderTarget[E.id]),ze.needsLights&&ze.lightProbeGrid){const Ht=ze.lightProbeGrid;Zt.probesSH.value=Ht.texture,Zt.probesMin.value.copy(Ht.boundingBox.min),Zt.probesMax.value.copy(Ht.boundingBox.max),Zt.probesResolution.value.copy(Ht.resolution)}Ta.upload(k,Fr(ze),Zt,re)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Ta.upload(k,Fr(ze),Zt,re),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Nt.setValue(k,"center",K.center),Nt.setValue(k,"modelViewMatrix",K.modelViewMatrix),Nt.setValue(k,"normalMatrix",K.normalMatrix),Nt.setValue(k,"modelMatrix",K.matrixWorld),Z.uniformsGroups!==void 0){const Ht=Z.uniformsGroups;for(let Wn=0,mi=Ht.length;Wn<mi;Wn++){const kr=Ht[Wn];ve.update(kr,mn),ve.bind(kr,mn)}}return mn}function qa(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function Ya(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(E,H,ee){const Z=$.get(E);Z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),$.get(E.texture).__webglTexture=H,$.get(E.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:ee,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,H){const ee=$.get(E);ee.__webglFramebuffer=H,ee.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(E,H=0,ee=0){ne=E,q=H,W=ee;let Z=null,K=!1,Ie=!1;if(E){const Le=$.get(E);if(Le.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(k.FRAMEBUFFER,Le.__webglFramebuffer),me.copy(E.viewport),Y.copy(E.scissor),ue=E.scissorTest,S.viewport(me),S.scissor(Y),S.setScissorTest(ue),ae=-1;return}else if(Le.__webglFramebuffer===void 0)re.setupRenderTarget(E);else if(Le.__hasExternalTextures)re.rebindTextures(E,$.get(E.texture).__webglTexture,$.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ft=E.depthTexture;if(Le.__boundDepthTexture!==ft){if(ft!==null&&$.has(ft)&&(E.width!==ft.image.width||E.height!==ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(E)}}const qe=E.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Ie=!0);const je=$.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(je[H])?Z=je[H][ee]:Z=je[H],K=!0):E.samples>0&&re.useMultisampledRTT(E)===!1?Z=$.get(E).__webglMultisampledFramebuffer:Array.isArray(je)?Z=je[ee]:Z=je,me.copy(E.viewport),Y.copy(E.scissor),ue=E.scissorTest}else me.copy(Be).multiplyScalar(ge).floor(),Y.copy(st).multiplyScalar(ge).floor(),ue=Ge;if(ee!==0&&(Z=J),S.bindFramebuffer(k.FRAMEBUFFER,Z)&&S.drawBuffers(E,Z),S.viewport(me),S.scissor(Y),S.setScissorTest(ue),K){const Le=$.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+H,Le.__webglTexture,ee)}else if(Ie){const Le=H;for(let qe=0;qe<E.textures.length;qe++){const je=$.get(E.textures[qe]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+qe,je.__webglTexture,ee,Le)}}else if(E!==null&&ee!==0){const Le=$.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Le.__webglTexture,ee)}ae=-1},this.readRenderTargetPixels=function(E,H,ee,Z,K,Ie,ke,Le=0){if(!(E&&E.isWebGLRenderTarget)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=$.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ke!==void 0&&(qe=qe[ke]),qe){S.bindFramebuffer(k.FRAMEBUFFER,qe);try{const je=E.textures[Le],ft=je.format,_t=je.type;if(E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Le),!P.textureFormatReadable(ft)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(_t)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-Z&&ee>=0&&ee<=E.height-K&&k.readPixels(H,ee,Z,K,Re.convert(ft),Re.convert(_t),Ie)}finally{const je=ne!==null?$.get(ne).__webglFramebuffer:null;S.bindFramebuffer(k.FRAMEBUFFER,je)}}},this.readRenderTargetPixelsAsync=async function(E,H,ee,Z,K,Ie,ke,Le=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qe=$.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ke!==void 0&&(qe=qe[ke]),qe)if(H>=0&&H<=E.width-Z&&ee>=0&&ee<=E.height-K){S.bindFramebuffer(k.FRAMEBUFFER,qe);const je=E.textures[Le],ft=je.format,_t=je.type;if(E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Le),!P.textureFormatReadable(ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(_t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qe=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Qe),k.bufferData(k.PIXEL_PACK_BUFFER,Ie.byteLength,k.STREAM_READ),k.readPixels(H,ee,Z,K,Re.convert(ft),Re.convert(_t),0);const Oe=ne!==null?$.get(ne).__webglFramebuffer:null;S.bindFramebuffer(k.FRAMEBUFFER,Oe);const qt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Lf(k,qt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Qe),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Ie),k.deleteBuffer(Qe),k.deleteSync(qt),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,H=null,ee=0){const Z=Math.pow(2,-ee),K=Math.floor(E.image.width*Z),Ie=Math.floor(E.image.height*Z),ke=H!==null?H.x:0,Le=H!==null?H.y:0;re.setTexture2D(E,0),k.copyTexSubImage2D(k.TEXTURE_2D,ee,0,0,ke,Le,K,Ie),S.unbindTexture()},this.copyTextureToTexture=function(E,H,ee=null,Z=null,K=0,Ie=0){let ke,Le,qe,je,ft,_t,Qe,Oe,qt;const Yt=E.isCompressedTexture?E.mipmaps[Ie]:E.image;if(ee!==null)ke=ee.max.x-ee.min.x,Le=ee.max.y-ee.min.y,qe=ee.isBox3?ee.max.z-ee.min.z:1,je=ee.min.x,ft=ee.min.y,_t=ee.isBox3?ee.min.z:0;else{const Zt=Math.pow(2,-K);ke=Math.floor(Yt.width*Zt),Le=Math.floor(Yt.height*Zt),E.isDataArrayTexture?qe=Yt.depth:E.isData3DTexture?qe=Math.floor(Yt.depth*Zt):qe=1,je=0,ft=0,_t=0}Z!==null?(Qe=Z.x,Oe=Z.y,qt=Z.z):(Qe=0,Oe=0,qt=0);const Pt=Re.convert(H.format),sn=Re.convert(H.type);let ze;H.isData3DTexture?(re.setTexture3D(H,0),ze=k.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(re.setTexture2DArray(H,0),ze=k.TEXTURE_2D_ARRAY):(re.setTexture2D(H,0),ze=k.TEXTURE_2D),S.activeTexture(k.TEXTURE0),S.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),S.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),S.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);const pn=S.getParameter(k.UNPACK_ROW_LENGTH),Tt=S.getParameter(k.UNPACK_IMAGE_HEIGHT),mn=S.getParameter(k.UNPACK_SKIP_PIXELS),En=S.getParameter(k.UNPACK_SKIP_ROWS),Qn=S.getParameter(k.UNPACK_SKIP_IMAGES);S.pixelStorei(k.UNPACK_ROW_LENGTH,Yt.width),S.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Yt.height),S.pixelStorei(k.UNPACK_SKIP_PIXELS,je),S.pixelStorei(k.UNPACK_SKIP_ROWS,ft),S.pixelStorei(k.UNPACK_SKIP_IMAGES,_t);const Tn=E.isDataArrayTexture||E.isData3DTexture,Nt=H.isDataArrayTexture||H.isData3DTexture;if(E.isDepthTexture){const Zt=$.get(E),ei=$.get(H),Ht=$.get(Zt.__renderTarget),Wn=$.get(ei.__renderTarget);S.bindFramebuffer(k.READ_FRAMEBUFFER,Ht.__webglFramebuffer),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let mi=0;mi<qe;mi++)Tn&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,$.get(E).__webglTexture,K,_t+mi),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,$.get(H).__webglTexture,Ie,qt+mi)),k.blitFramebuffer(je,ft,ke,Le,Qe,Oe,ke,Le,k.DEPTH_BUFFER_BIT,k.NEAREST);S.bindFramebuffer(k.READ_FRAMEBUFFER,null),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||$.has(E)){const Zt=$.get(E),ei=$.get(H);S.bindFramebuffer(k.READ_FRAMEBUFFER,Q),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,B);for(let Ht=0;Ht<qe;Ht++)Tn?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Zt.__webglTexture,K,_t+Ht):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Zt.__webglTexture,K),Nt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ei.__webglTexture,Ie,qt+Ht):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ei.__webglTexture,Ie),K!==0?k.blitFramebuffer(je,ft,ke,Le,Qe,Oe,ke,Le,k.COLOR_BUFFER_BIT,k.NEAREST):Nt?k.copyTexSubImage3D(ze,Ie,Qe,Oe,qt+Ht,je,ft,ke,Le):k.copyTexSubImage2D(ze,Ie,Qe,Oe,je,ft,ke,Le);S.bindFramebuffer(k.READ_FRAMEBUFFER,null),S.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Nt?E.isDataTexture||E.isData3DTexture?k.texSubImage3D(ze,Ie,Qe,Oe,qt,ke,Le,qe,Pt,sn,Yt.data):H.isCompressedArrayTexture?k.compressedTexSubImage3D(ze,Ie,Qe,Oe,qt,ke,Le,qe,Pt,Yt.data):k.texSubImage3D(ze,Ie,Qe,Oe,qt,ke,Le,qe,Pt,sn,Yt):E.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Ie,Qe,Oe,ke,Le,Pt,sn,Yt.data):E.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Ie,Qe,Oe,Yt.width,Yt.height,Pt,Yt.data):k.texSubImage2D(k.TEXTURE_2D,Ie,Qe,Oe,ke,Le,Pt,sn,Yt);S.pixelStorei(k.UNPACK_ROW_LENGTH,pn),S.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Tt),S.pixelStorei(k.UNPACK_SKIP_PIXELS,mn),S.pixelStorei(k.UNPACK_SKIP_ROWS,En),S.pixelStorei(k.UNPACK_SKIP_IMAGES,Qn),Ie===0&&H.generateMipmaps&&k.generateMipmap(ze),S.unbindTexture()},this.initRenderTarget=function(E){$.get(E).__webglFramebuffer===void 0&&re.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?re.setTextureCube(E,0):E.isData3DTexture?re.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?re.setTexture2DArray(E,0):re.setTexture2D(E,0),S.unbindTexture()},this.resetState=function(){q=0,W=0,ne=null,S.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Rt._getUnpackColorSpace()}}const gr=new U;function Un(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;gr.copy(e),gr[n]=0,gr.normalize();const l=.5*a/(a+c),h=1-gr.angleTo(i)/o;return Math.sign(gr[t])===1?h*l:c/(a+c)+l+l*(1-h)}class Ir extends Ke{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new U,l=new U,h=new U(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,p=this.attributes.uv.array,g=f.length/6,_=new U,m=.5/a;for(let d=0,M=0;d<f.length;d+=3,M+=2)switch(o.fromArray(f,d),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[d+0]=h.x*Math.sign(o.x)+l.x*r,f[d+1]=h.y*Math.sign(o.y)+l.y*r,f[d+2]=h.z*Math.sign(o.z)+l.z*r,u[d+0]=l.x,u[d+1]=l.y,u[d+2]=l.z,Math.floor(d/g)){case 0:_.set(1,0,0),p[M+0]=Un(_,l,"z","y",r,n),p[M+1]=1-Un(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),p[M+0]=1-Un(_,l,"z","y",r,n),p[M+1]=1-Un(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),p[M+0]=1-Un(_,l,"x","z",r,e),p[M+1]=Un(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),p[M+0]=1-Un(_,l,"x","z",r,e),p[M+1]=1-Un(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),p[M+0]=1-Un(_,l,"x","y",r,e),p[M+1]=1-Un(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),p[M+0]=Un(_,l,"x","y",r,e),p[M+1]=1-Un(_,l,"y","x",r,t);break}}static fromJSON(e){return new Ir(e.width,e.height,e.depth,e.segments,e.radius)}}const Dh={type:"change"},oc={type:"start"},Lu={type:"end"},va=new Ha,Ih=new Si,J_=Math.cos(70*Ff.DEG2RAD),rn=new U,wn=2*Math.PI,Wt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},No=1e-6;class j_ extends ep{constructor(e,t=null){super(e,t),this.state=Wt.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ks.ROTATE,MIDDLE:ks.DOLLY,RIGHT:ks.PAN},this.touches={ONE:Os.ROTATE,TWO:Os.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Pi,this._lastTargetPosition=new U,this._quat=new Pi().setFromUnitVectors(e.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ah,this._sphericalDelta=new ah,this._scale=1,this._panOffset=new U,this._rotateStart=new j,this._rotateEnd=new j,this._rotateDelta=new j,this._panStart=new j,this._panEnd=new j,this._panDelta=new j,this._dollyStart=new j,this._dollyEnd=new j,this._dollyDelta=new j,this._dollyDirection=new U,this._mouse=new j,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ev.bind(this),this._onPointerDown=Q_.bind(this),this._onPointerUp=tv.bind(this),this._onContextMenu=lv.bind(this),this._onMouseWheel=sv.bind(this),this._onKeyDown=rv.bind(this),this._onTouchStart=av.bind(this),this._onTouchMove=ov.bind(this),this._onMouseDown=nv.bind(this),this._onMouseMove=iv.bind(this),this._interceptControlDown=cv.bind(this),this._interceptControlUp=hv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Dh),this.update(),this.state=Wt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;rn.copy(t).sub(this.target),rn.applyQuaternion(this._quat),this._spherical.setFromVector3(rn),this.autoRotate&&this.state===Wt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=wn:n>Math.PI&&(n-=wn),s<-Math.PI?s+=wn:s>Math.PI&&(s-=wn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(rn.setFromSpherical(this._spherical),rn.applyQuaternion(this._quatInverse),t.copy(this.target).add(rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=rn.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(va.origin.copy(this.object.position),va.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(va.direction))<J_?this.object.lookAt(this.target):(Ih.setFromNormalAndCoplanarPoint(this.object.up,this.target),va.intersectPlane(Ih,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>No||8*(1-this._lastQuaternion.dot(this.object.quaternion))>No||this._lastTargetPosition.distanceToSquared(this.target)>No?(this.dispatchEvent(Dh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?wn/60*this.autoRotateSpeed*e:wn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){rn.setFromMatrixColumn(t,0),rn.multiplyScalar(-e),this._panOffset.add(rn)}_panUp(e,t){this.screenSpacePanning===!0?rn.setFromMatrixColumn(t,1):(rn.setFromMatrixColumn(t,0),rn.crossVectors(this.object.up,rn)),rn.multiplyScalar(e),this._panOffset.add(rn)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;rn.copy(s).sub(this.target);let r=rn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(wn*this._rotateDelta.x/t.clientHeight),this._rotateUp(wn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-wn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(wn*this._rotateDelta.x/t.clientHeight),this._rotateUp(wn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new j,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Q_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ev(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function tv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Lu),this.state=Wt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function nv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ks.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Wt.DOLLY;break;case ks.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Wt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Wt.ROTATE}break;case ks.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Wt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Wt.PAN}break;default:this.state=Wt.NONE}this.state!==Wt.NONE&&this.dispatchEvent(oc)}function iv(i){switch(this.state){case Wt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Wt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Wt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function sv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Wt.NONE||(i.preventDefault(),this.dispatchEvent(oc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Lu))}function rv(i){this.enabled!==!1&&this._handleKeyDown(i)}function av(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Os.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Wt.TOUCH_ROTATE;break;case Os.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Wt.TOUCH_PAN;break;default:this.state=Wt.NONE}break;case 2:switch(this.touches.TWO){case Os.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Wt.TOUCH_DOLLY_PAN;break;case Os.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Wt.TOUCH_DOLLY_ROTATE;break;default:this.state=Wt.NONE}break;default:this.state=Wt.NONE}this.state!==Wt.NONE&&this.dispatchEvent(oc)}function ov(i){switch(this._trackPointer(i),this.state){case Wt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Wt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Wt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Wt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Wt.NONE}}function lv(i){this.enabled!==!1&&i.preventDefault()}function cv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class uv extends nu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Ke;e.deleteAttribute("uv");const t=new te({side:bn}),n=new te,s=new wu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new xe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new ou(e,n,6),c=new tn;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new xe(e,Fs(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new xe(e,Fs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new xe(e,Fs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const f=new xe(e,Fs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const u=new xe(e,Fs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const p=new xe(e,Fs(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Fs(i){return new Wd({color:0,emissive:16777215,emissiveIntensity:i})}const fv=1.8,oi=.75,Zn=.9;function dv(i,e={}){const t=new K_({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=Mr,t.outputColorSpace=hn,t.toneMapping=Vl,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new nu;r.background=new gt(n?12377333:14672872),r.fog=n?new Sr(12377333,60*s,160*s):new Sr(14672872,4*s,9*s);const a=new Ul(t),c=a.fromScene(new uv,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new Dn(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new U(...e.cameraPosition??[0,.5,1.45]),h=new U(...e.target??[0,.3,0]);o.position.copy(l);const f=new j_(o,t.domElement);f.target.copy(h),f.enableDamping=!0,f.dampingFactor=.08,f.enablePan=!1,f.minDistance=e.minDistance??.5,f.maxDistance=e.maxDistance??3,f.maxPolarAngle=Math.PI/2.05,f.minAzimuthAngle=-Math.PI/2.2,f.maxAzimuthAngle=Math.PI/2.2,f.update();const u=new zt;u.scale.setScalar(s),r.add(u);const p=e.benchLength??fv,g=[],_=[];let m=null,d=null,M=null;if(n)yv(u),Mv(u);else if(pv(u),d=xv(u,!!e.cupboard,p,s,!!e.wallCabinets),e.wallCabinets&&(M=vv(u,p,s),m=mv(u)),e.sideBenches){const Y=7-oi/2-.02;for(const ue of[-1,1]){const Fe=Lh(p,s);Fe.group.position.set(ue*Y,0,1.6),Fe.group.rotation.y=-ue*Math.PI/2,u.add(Fe.group),g.push(...Fe.parts.doors),_.push(...Fe.parts.blockers);const Te=Lh(.9,s);Te.group.position.set(ue*(p/2+.5+.45),0,0),u.add(Te.group),g.push(...Te.parts.doors),_.push(...Te.parts.blockers)}}!n&&(e.cupboard||e.wallCabinets)&&(r.fog=new Sr(14672872,11*s,26*s)),s!==1&&u.traverse(Y=>{if(!(Y instanceof Ba)||!Y.castShadow)return;const ue=Y.shadow.camera;ue.left*=s,ue.right*=s,ue.top*=s,ue.bottom*=s,ue.near*=s,ue.far*=s,ue.updateProjectionMatrix(),Y.shadow.normalBias*=s});const v=[],y=new Jd;let w=0;const b=Y=>{w=requestAnimationFrame(b),y.update(Y);const ue=Math.min(1,y.getDelta());if(v.forEach(Fe=>Fe(ue)),L){L.t=Math.min(1,L.t+ue/.7);const Fe=L.t<.5?2*L.t*L.t:1-Math.pow(-2*L.t+2,2)/2;o.position.lerpVectors(L.fromPos,L.toPos,Fe),f.target.lerpVectors(L.fromTarget,L.toTarget,Fe),L.t>=1&&(L=null)}f.update(),bv(r,o,t.domElement.clientHeight),t.render(r,o)};w=requestAnimationFrame(b);let C=null,x=null,A=null,I=!1,L=null;f.addEventListener("start",()=>{I=!0,L=null});const z=new ResizeObserver(()=>{const Y=i.clientWidth,ue=i.clientHeight;!Y||!ue||(t.setSize(Y,ue),o.aspect=Y/ue,o.updateProjectionMatrix(),C&&!I&&(x!==null?J(C,x,{dir:A||void 0}):Q(C)))});z.observe(i);function J(Y,ue=.7,Fe={}){if(Y.isEmpty())return;C=Y.clone(),x=ue,I=!1;const Te=Y.getCenter(new U),ie=(Fe.dir?Fe.dir.clone():l.clone().sub(h)).normalize();A=ie.clone();const ye=o.position.clone(),ge=f.target.clone(),Ce=[0,1,2,3,4,5,6,7].map(Ge=>new U(Ge&1?Y.max.x:Y.min.x,Ge&2?Y.max.y:Y.min.y,Ge&4?Y.max.z:Y.min.z)),Ve=Ge=>(o.position.copy(Te).addScaledVector(ie,Ge),o.lookAt(Te),o.updateMatrixWorld(!0),Ce.every(oe=>{const pe=oe.clone().project(o);return pe.z<1&&Math.abs(pe.x)<=ue&&Math.abs(pe.y)<=ue}));let Be=.01,st=f.maxDistance*4;for(let Ge=0;Ge<40;Ge++){const oe=(Be+st)/2;Ve(oe)?st=oe:Be=oe}if(f.maxDistance=Math.max(f.maxDistance,st*1.5),h.copy(Te),l.copy(Te).addScaledVector(ie,st),Fe.animate){o.position.copy(ye),o.lookAt(ge),L={fromPos:ye,toPos:l.clone(),fromTarget:ge,toTarget:h.clone(),t:0};return}L=null,o.position.copy(l),f.target.copy(h),f.update()}function Q(Y){if(Y.isEmpty())return;C=Y.clone(),x=null,I=!1;const ue=Y.getCenter(new U),Fe=Y.getSize(new U),Te=o.fov*Math.PI/180,ie=2*Math.atan(Math.tan(Te/2)*o.aspect),ye=Math.max(Fe.x/2/Math.tan(ie/2),Math.max(Fe.y,Fe.z*.6)/2/Math.tan(Te/2))*1.12+Fe.z*.25,ge=l.clone().sub(h).normalize(),Ce=Math.min(f.maxDistance,Math.max(f.minDistance,ye));h.copy(ue),l.copy(ue).addScaledVector(ge,Ce),o.position.copy(l),f.target.copy(h),f.update()}const B=new j;let q=null;if(m){const Y=m;let ue=0;v.push(Fe=>{ue+=Fe,Y.taps.forEach(Ce=>{const Ve=!!Ce.userData.on,Be=Ce.userData.handle;Be.rotation.y+=((Ve?-Math.PI/2:0)-Be.rotation.y)*Math.min(1,Fe*10);const st=Ce.userData.stream;if(st.visible=Ve,Ve){const Ge=st.material.map;Ge.offset.y=(Ge.offset.y-Fe*3)%1,st.scale.x=st.scale.z=1+Math.sin(ue*40)*.08}Ce.userData.splash.visible=Ve});const Te=new Date,ie=Te.getSeconds()+Te.getMilliseconds()/1e3,ye=Te.getMinutes()+ie/60,ge=Te.getHours()%12+ye/60;Y.clock.second.rotation.z=-(Math.floor(ie)/60)*Math.PI*2,Y.clock.minute.rotation.z=-(ye/60)*Math.PI*2,Y.clock.hour.rotation.z=-(ge/12)*Math.PI*2}),q={taps:Y.taps,tapOf:Fe=>{let Te=Fe;for(;Te&&!Te.userData.isTap;)Te=Te.parent;return Te},toggle:Fe=>{Fe.userData.on=!Fe.userData.on},isOn:Fe=>!!Fe.userData.on,anyOn:()=>Y.taps.filter(Fe=>Fe.userData.on).length}}const W=[...(d==null?void 0:d.doors)||[],...(M==null?void 0:M.doors)||[],...g];W.length&&v.push(Y=>{W.forEach(ue=>{const Fe=ue.userData.open?ue.userData.openAngle:0;ue.rotation.y+=(Fe-ue.rotation.y)*Math.min(1,Y*7)})});const ne=Y=>{let ue=Y;for(;ue&&!ue.userData.cupboardDoor;)ue=ue.parent;return ue},ae=Y=>{Y.userData.open=!Y.userData.open},fe=M?{doors:M.doors,blockers:M.blockers,cabinets:M.cabinets.map(Y=>({minX:Y.minX*s,maxX:Y.maxX*s,rows:Y.rows.map(ue=>ue*s),rowHeight:Y.rowHeight*s,depth:Y.depth*s,z:Y.z*s,frontZ:Y.frontZ*s}))}:null;let me=null;if(d){const Y=d;me={doors:Y.doors,blockers:Y.blockers,bays:Y.bays.map(ue=>({minX:ue.minX*s,maxX:ue.maxX*s,levels:ue.levels.map(Fe=>Fe*s),frontZ:ue.frontZ*s,backZ:ue.backZ*s})),toggleDoor:ae,isOpen:ue=>!!ue.userData.open,doorOf:ne}}return{cupboard:me,wallCabinets:fe,furniture:{doors:g,blockers:_},taps:q,benchLength:p,toggleDoor:ae,doorOf:ne,renderer:t,scene:r,camera:o,controls:f,canvas:t.domElement,onFrame:Y=>{v.push(Y)},resetView:()=>{o.position.copy(l),f.target.copy(h),f.update()},frameBox:Q,fitBox:J,toNdc:Y=>{const ue=t.domElement.getBoundingClientRect();return B.set((Y.clientX-ue.left)/ue.width*2-1,-((Y.clientY-ue.top)/ue.height)*2+1),B},dispose:()=>{cancelAnimationFrame(w),z.disconnect(),f.dispose(),r.traverse(Y=>{var ue;(Y instanceof xe||Y instanceof ad||Y instanceof Pn)&&((ue=Y.geometry)==null||ue.dispose(),(Array.isArray(Y.material)?Y.material:[Y.material]).forEach(Te=>{var ie;(ie=Te.map)==null||ie.dispose(),Te.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function pv(i){i.add(new Mu(16119807,9080729,.55));const e=new Ba(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new Ba(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}const Ws=-oi/2-.25;function mv(i){const e=Xa.steel(),t=new te({color:13225684,roughness:.25,metalness:.9,side:Kt}),n=new te({map:Lr(),roughness:.7}),s=new Xi({color:2040616,roughness:.42,clearcoat:.4}),r=.8,a=.6,c=[];for(const v of[-1,1]){const y=new zt;y.position.set(v*(7-r/2-.02),0,Ws+a/2+.01),i.add(y);const w=.2,b=Zn-.035-w,C=new xe(new Ke(r-.04,b,a-.04),n);C.position.y=-Zn+b/2,C.castShadow=C.receiveShadow=!0,y.add(C);const x=(oe,pe,_e,Se)=>{const Me=new xe(new Ke(oe,w,pe),n);Me.position.set(_e,-.035-w/2,Se),y.add(Me)};x(r-.04,.02,0,(a-.04)/2-.01),x(r-.04,.02,0,-.5599999999999999/2+.01),x(.02,a-.04,(r-.04)/2-.01,0),x(.02,a-.04,-.76/2+.01,0);const A=new xe(new Ke(.004,Zn-.12,.002),new te({color:3877404}));A.position.set(0,-Zn/2-.02,(a-.04)/2+.001),y.add(A);for(const oe of[-.04,.04]){const pe=new xe(new G(.006,.006,.1,12),e);pe.position.set(oe,-.2,(a-.04)/2+.015),y.add(pe)}const I=.5,L=.36,z=.03,J=.2,Q=(oe,pe,_e,Se)=>{const Me=new xe(new Ke(oe,.035,pe),s);Me.position.set(_e,-.0175,Se),Me.receiveShadow=!0,y.add(Me)};Q(r,a/2+z-L/2,0,-a/2+(a/2+z-L/2)/2),Q(r,a/2-z-L/2,0,z+L/2+(a/2-z-L/2)/2),Q((r-I)/2,L,-.325,z),Q((r-I)/2,L,I/2+(r-I)/4,z);const B=new xe(new Ke(I,J,L),[t,t,t,t,t,t]);B.geometry.groups.splice(2,1),B.position.set(0,-J/2,z),y.add(B);const q=new xe(new G(.025,.025,.004,20),new te({color:3621201,metalness:.8,roughness:.4}));q.position.set(0,-J+.003,z),y.add(q);const W=new zt;W.userData.isTap=!0,W.userData.on=!1;const ne=z-L/2-.06,ae=.09,fe=.3,me=new xe(new G(.014,.018,fe,16),e);me.position.set(0,fe/2,ne);const Y=new xe(new Lt(ae,.014,10,24,Math.PI),e);Y.position.set(0,fe,ne+ae),Y.rotation.y=-Math.PI/2;const ue=new xe(new G(.016,.013,.04,14),e);ue.position.set(0,fe-.02,ne+2*ae);const Fe=new xe(new G(.03,.035,.02,20),e);Fe.position.set(0,.01,ne);const Te=new zt;Te.position.set(0,.16,ne);const ie=new xe(new G(.022,.022,.04,16),e),ye=new xe(new Ke(.012,.012,.11),e);ye.position.set(0,.01,.06);const ge=new xe(new Xt(.014,12,8),new te({color:2450411,roughness:.4}));ge.position.set(0,.01,.115),Te.add(ie,ye,ge);const Ce=fe-.04+J,Ve=hs(32,128,(oe,pe,_e)=>{oe.fillStyle="#dbeafe",oe.fillRect(0,0,pe,_e);for(let Se=0;Se<_e;Se+=6)oe.fillStyle=`rgba(255,255,255,${.3+Math.random()*.5})`,oe.fillRect(0,Se,pe,2)});Ve.wrapS=Ve.wrapT=vn,Ve.repeat.set(1,3);const Be=new xe(new G(.009,.012,Ce,12,1,!0),new te({map:Ve,color:12575743,transparent:!0,opacity:.75,roughness:.05,metalness:.1,depthWrite:!1}));Be.position.set(0,fe-.04-Ce/2,ne+2*ae),Be.visible=!1;const st=new xe(new ci(.07,24),new te({color:12575743,transparent:!0,opacity:.6,roughness:.05}));st.rotation.x=-Math.PI/2,st.position.set(0,-J+.006,ne+2*ae),st.visible=!1;const Ge=new xe(new Ke(I+.06,fe+.05+J,L+.16),new Wi({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));Ge.position.set(0,(fe+.05-J)/2,z-.06),W.add(me,Y,ue,Fe,Te,Be,st,Ge),W.userData.handle=Te,W.userData.stream=Be,W.userData.splash=st,y.add(W),c.push(W)}const o=new zt;o.position.set(0,1.62,Ws+.02),i.add(o);const l=.17,h=hs(512,512,(v,y)=>{const w=y/2;v.fillStyle="#fffdf7",v.beginPath(),v.arc(w,w,w,0,Math.PI*2),v.fill(),v.fillStyle="#111827";for(let b=0;b<60;b++){const C=b/60*Math.PI*2,x=b%5===0;v.save(),v.translate(w,w),v.rotate(C),v.fillRect(x?-5:-2,-w+14,x?10:4,x?34:16),v.restore()}v.font="bold 54px Arial",v.textAlign="center",v.textBaseline="middle";for(let b=1;b<=12;b++){const C=b/12*Math.PI*2;v.fillText(String(b),w+Math.sin(C)*(w-92),w-Math.cos(C)*(w-92))}v.font="bold 22px Arial",v.fillStyle="#4b5563",v.fillText("LABORATORY",w,w+110)}),f=new xe(new G(l+.02,l+.02,.05,48),new te({color:2042167,roughness:.4,metalness:.5}));f.rotation.x=Math.PI/2;const u=new xe(new ci(l,48),new te({map:h,roughness:.6}));u.position.z=.026;const p=new xe(new ci(l,48),new Xi({color:16777215,transparent:!0,opacity:.12,roughness:.05,clearcoat:1,depthWrite:!1}));p.position.z=.05,o.add(f,u,p);const g=(v,y,w,b)=>{const C=new zt;C.position.z=b;const x=new xe(new Ke(y,v,.004),new te({color:w,roughness:.5}));return x.position.y=v/2-v*.12,C.add(x),o.add(C),C},_=g(l*.55,.014,1120295,.03),m=g(l*.8,.009,1120295,.034),d=g(l*.88,.004,14427686,.038),M=new xe(new G(.01,.01,.012,16),new te({color:14427686}));return M.rotation.x=Math.PI/2,M.position.z=.042,o.add(M),{taps:c,clock:{hour:_,minute:m,second:d}}}const Nu=()=>new te({color:1976890,roughness:.95}),gv=()=>new te({color:14928028,roughness:.55});function Bl(i,e,t,n,s,r,a=9){const c=new xe(new Ke(s,.008,.012),new te({color:16777215,emissive:16773590,emissiveIntensity:2}));c.position.set(e,t,n),i.add(c);const o=new wu(16773590,a,1.4*r,2);o.position.set(e,t-.05,n+.05),i.add(o)}function _v(i,e){const t=-Zn,n=e-t,s=hs(256,256,(g,_,m)=>{g.fillStyle="#1f5a63",g.fillRect(0,0,_,m);for(let d=0;d<_;d+=4)g.fillStyle=d%8===0?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",g.fillRect(d,0,2,m),g.fillRect(0,d,_,2);for(let d=0;d<900;d++)g.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"0,0,0"},${Math.random()*.06})`,g.fillRect(Math.random()*_,Math.random()*m,2,2);g.strokeStyle="rgba(255,255,255,0.06)",g.lineWidth=2,g.beginPath(),g.moveTo(_/2,0),g.lineTo(_,m/2),g.lineTo(_/2,m),g.lineTo(0,m/2),g.closePath(),g.stroke()});s.wrapS=s.wrapT=vn;const r=new te({map:Lr(),roughness:.55}),a=new te({color:13936715,roughness:.25,metalness:1}),c=new te({color:15659250,roughness:.95}),o=7,l=7,h=l-Ws,f=(l+Ws)/2,u=5;[{x:0,z:Ws,rotY:0,length:2*o,newWall:!1},{x:-o,z:f,rotY:Math.PI/2,length:h,newWall:!0},{x:o,z:f,rotY:-Math.PI/2,length:h,newWall:!0},{x:0,z:l,rotY:Math.PI,length:2*o,newWall:!0}].forEach(({x:g,z:_,rotY:m,length:d,newWall:M})=>{const v=new zt;if(v.position.set(g,0,_),v.rotation.y=m,i.add(v),M){const L=new xe(new fn(d,u),c);L.position.y=t+u/2,L.receiveShadow=!0,v.add(L)}const y=s.clone();y.needsUpdate=!0,y.repeat.set(d/.35,n/.35);const w=new xe(new fn(d,n),new te({map:y,roughness:.95}));w.position.set(0,t+n/2,.004),w.receiveShadow=!0,v.add(w);const b=new xe(new Ke(d,.045,.022),r);b.position.set(0,e-.0225,.015),b.castShadow=!0,b.receiveShadow=!0,v.add(b);const C=new xe(new Ke(d,.1,.018),r);C.position.set(0,t+.05,.013),v.add(C);const x=Math.floor(d/.15),A=new ou(new Xt(.007,10,8),a,x),I=new Ft;for(let L=0;L<x;L++)I.makeTranslation(-d/2+.075+L*.15,e-.075,.007),A.setMatrixAt(L,I);v.add(A)})}function vv(i,e,t=1){const n=e/2+.1,s=.86,r=.3,a=.016,c=.5,o=Ws+.002,l=o+r,h=4,f=Lr(),u=new te({map:f,roughness:.6}),p=Nu(),g=gv(),_=new te({color:14146528,roughness:.3,metalness:.85}),m=new Xi({color:15398655,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1}),d=[],M=[],v=[];_v(i,c);const y=.08+n/2;for(const w of[-y,y]){const b=w-n/2,C=w+n/2,x=(q,W,ne,ae,fe,me,Y)=>{const ue=new xe(new Ke(q,W,ne),Y);ue.position.set(ae,fe,me),ue.castShadow=!0,ue.receiveShadow=!0,i.add(ue),M.push(ue)};x(n,s,a,w,c+s/2,o+a/2,p),x(a,s,r,b+a/2,c+s/2,o+r/2,u),x(a,s,r,C-a/2,c+s/2,o+r/2,u),x(n,a*1.5,r,w,c+s-a*.75,o+r/2,u),x(n,a*1.5,r,w,c+a*.75,o+r/2,u),x(n+.03,.03,r+.02,w,c+s+.015,o+r/2+.01,u);const A=c+a*1.5,I=c+s-a*1.5,L=(I-A)/h,z=[];for(let q=0;q<h;q++){const W=A+q*L;q>0&&x(n-2*a,a,r-a-.03,w,W-a/2,o+a+(r-a-.03)/2,g),z.unshift(W)}for(const q of[w-n/4,w+n/4])Bl(i,q,I-.006,o+r*.72,n/2-.08,t);v.push({minX:b+a,maxX:C-a,rows:z,rowHeight:L-a,depth:r-a-.05,z:o+a+(r-a-.03)/2,frontZ:o+r-.03});const J=n/2-.004,Q=s-.01,B=.018;for(const[q,W]of[[b,1],[C,-1]]){const ne=new zt;ne.position.set(q+W*.002,c+s/2,l+.008);const ae=new xe(new Ke(J-B,Q-B,.004),m);ae.position.x=W*J/2,ae.renderOrder=2,ne.add(ae);const fe=(Y,ue,Fe,Te)=>{const ie=new xe(new Ke(Y,ue,.014),_);ie.position.set(Fe,Te,0),ne.add(ie)};fe(J,B,W*J/2,Q/2-B/2),fe(J,B,W*J/2,-Q/2+B/2),fe(B,Q,W*B/2,0),fe(B,Q,W*(J-B/2),0);const me=new xe(new G(.008,.008,.07,12),Xa.steel());me.position.set(W*(J-.04),-.12,.02),ne.add(me),ne.userData.cupboardDoor=!0,ne.userData.open=!1,ne.userData.openAngle=-W*1.7,i.add(ne),d.push(ne)}}return{doors:d,blockers:M,cabinets:v}}function Lh(i,e){const t=new zt,n=new xe(new Ir(i,.035,oi,3,.008),new Xi({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));n.position.y=-.0175,n.castShadow=!0,n.receiveShadow=!0,t.add(n);const s=Uu(t,Lr(),i,e,!1);return{group:t,parts:s}}function xv(i,e=!1,t=1.8,n=1,s=!1){const r=hs(512,512,(_,m,d)=>{_.fillStyle="#b9bec6",_.fillRect(0,0,m,d);for(let M=0;M<1200;M++)_.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,_.fillRect(Math.random()*m,Math.random()*d,3,3);_.strokeStyle="rgba(70,74,82,0.35)",_.lineWidth=3,_.strokeRect(0,0,m,d)});r.wrapS=r.wrapT=vn,r.repeat.set(12,12);const a=new xe(new fn(14,14),new te({map:r,roughness:.85}));a.rotation.x=-Math.PI/2,a.position.y=-Zn,a.receiveShadow=!0,i.add(a);const c=new xe(new fn(14,5),new te({color:15659250,roughness:.95}));c.position.set(0,1.6,-oi/2-.25),c.receiveShadow=!0,i.add(c);const o=hs(256,256,(_,m,d)=>{_.fillStyle="#f7f8f9",_.fillRect(0,0,m,d),_.strokeStyle="#c9ced4",_.lineWidth=4,_.strokeRect(0,0,m,d)});o.wrapS=o.wrapT=vn,o.repeat.set(40,4);const l=new xe(new fn(6,.6),new te({map:o,roughness:.3,metalness:0}));l.position.set(0,.3,-oi/2-.249),s||i.add(l);const h=new xe(new Ir(t,.035,oi,3,.008),new Xi({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));h.position.y=-.0175,h.receiveShadow=!0,h.castShadow=!0,i.add(h);const f=Lr();if(e)return Uu(i,f,t,n);const u=new xe(new Ke(t-.06,Zn-.035,oi-.06),new te({map:f,roughness:.7}));u.position.y=-Zn/2-.0175,u.receiveShadow=!0,i.add(u);const p=new te({color:3877404,roughness:.8}),g=Xa.steel();for(const _ of[-.6,0,.6]){const m=new xe(new Ke(.004,Zn-.12,.002),p);m.position.set(_,-Zn/2-.02,(oi-.06)/2+.001),i.add(m)}for(const _ of[-.66,-.54,-.06,.06,.54,.66]){const m=new xe(new G(.006,.006,.1,12),g);m.position.set(_,-.2,(oi-.06)/2+.015),i.add(m)}return null}function Uu(i,e,t,n=1,s=!0){const r=t-.06,a=oi-.06,c=.018,o=-.035,l=-Zn,h=o-l,f=a/2,u=-a/2,p=new te({map:e,roughness:.7}),g=new te({color:2898509,roughness:.7}),_=Nu(),m=[],d=(B,q,W,ne,ae,fe,me)=>{const Y=new xe(new Ke(B,q,W),me);return Y.position.set(ne,ae,fe),Y.castShadow=!0,i.add(Y),m.push(Y),Y},M=l+.06;d(c,h,a,-r/2+c/2,l+h/2,0,p),d(c,h,a,r/2-c/2,l+h/2,0,p),d(r,h,c,0,l+h/2,u+c/2,_),d(c,h,a-c,0,l+h/2,c/2,_),d(r,c,a,0,M-c/2,0,g),d(r,.06,c,0,l+.03,f-.03,p),d(r,.04,c,0,o-.02,f-c/2,p);const v=-.46,y=r/2-c*1.5;if(d(y,c,a-c,-r/4,v-c/2,c/2,g),d(y,c,a-c,r/4,v-c/2,c/2,g),s)for(const B of[-r/4,r/4])Bl(i,B,o-.05,f-.12,y-.1,n,10),Bl(i,B,v-c-.006,f-.12,y-.1,n,10);const w=o-.04,b=M-c,C=w-b-.002,x=r>2.2,A=(x?r/4:r/2)-.0025,I=new te({map:e,roughness:.65}),L=Xa.steel(),z=[];(x?[[-r/2,1,1.95],[0,-1,1.5],[0,1,1.5],[r/2,-1,1.95]]:[[-r/2,1,1.95],[r/2,-1,1.95]]).forEach(([B,q,W],ne)=>{const ae=new zt;ae.position.set(B+q*.001,(w+b)/2,f+c/2);const fe=new xe(new Ke(A,C,c),I);fe.position.x=q*A/2,fe.castShadow=!0,ae.add(fe);const me=new xe(new G(.006,.006,.1,12),L);me.position.set(q*(A-.045),-.2-ae.position.y,c/2+.015),ae.add(me);for(const Y of[me.position.y-.05,me.position.y+.05]){const ue=new xe(new G(.004,.004,.016,8),L);ue.rotation.x=Math.PI/2,ue.position.set(me.position.x,Y,c/2+.008),ae.add(ue)}ae.userData.cupboardDoor=!0,ae.userData.bay=x?ne<2?0:1:ne,ae.userData.open=!1,ae.userData.openAngle=-q*W,i.add(ae),z.push(ae)});const Q=(B,q)=>({minX:B,maxX:q,levels:[M,v],frontZ:f-.02,backZ:u+c});return{doors:z,blockers:m,bays:[Q(-r/2+c,-c/2),Q(c/2,r/2-c)]}}function yv(i){i.add(new Mu(14675967,6126138,.8));const e=new Ba(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function Mv(i){const e=hs(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const h=60+Math.random()*70;a.fillStyle=`rgba(${h*.6},${h+40},${h*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=vn,e.repeat.set(80,80);const t=new xe(new fn(300,300),new te({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new xe(new fn(80,.1),new te({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new te({color:5980976,roughness:.9}),r=new te({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new xe(new G(.25,.35,3,8),s);l.position.set(c,1.5,o);const h=new xe(new Xt(2.2+a%3*.5,12,10),r);h.position.set(c,4.2+a%2,o),i.add(l,h)}}function Lr(){return hs(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function hs(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Rr(n);return s.colorSpace=hn,s.anisotropy=16,s}function Sv(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new Rr(s);o.colorSpace=hn;const l=new Pn(new Gs({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const h=e/700*.73;return l.scale.set(h*l.userData.aspect,h,1),l}const Uo=new U,Fo=new U;function bv(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(Uo).project(e),c.getWorldPosition(Fo).project(e);const o=Math.abs(Uo.y-Fo.y)*t/2+Math.abs(Uo.x-Fo.x)*t/2;s.visible=o>r*1.25})}const Xa={steel:()=>new te({color:13094097,metalness:1,roughness:.28}),chrome:()=>new te({color:15133164,metalness:1,roughness:.12}),brass:()=>new te({color:13936715,metalness:1,roughness:.22}),castIron:()=>new te({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new te({color:1776928,roughness:.5}),glass:()=>new te({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},vt=(i=15857397)=>new Xi({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:Kt,depthWrite:!1}),Cn=i=>new te({color:i,roughness:.45,metalness:.15}),mt=(i=13094097)=>new te({color:i,roughness:.28,metalness:1}),St=()=>new te({color:15133164,roughness:.12,metalness:1}),On=()=>new te({color:13936715,roughness:.22,metalness:1}),bt=i=>new te({color:i,roughness:.5,metalness:.05}),Qt=i=>new te({color:i,roughness:.35,metalness:.1}),si=()=>new te({color:10119233,roughness:.7}),Nh=()=>new te({color:14278114,roughness:.3,metalness:.9}),Xe=(i,e,t,n=Math.min(i,e,t)*.12)=>new Ir(i,e,t,3,n);function T(i,e,t=0,n=0,s=0){const r=new xe(i,e);return r.position.set(t,n,s),r}function Dt(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Rr(n);return s.colorSpace=hn,s.anisotropy=16,s}function ki(i,e,t,n){const s=new zt;return s.add(T(new G(.018,.022,.05,16),On(),0,.025,0)),s.add(T(new G(.026,.026,.03,16),bt(n),0,.06,0)),s.position.set(i,e,t),s}function Fn(i,e,t,n=.55){const s=e*.85,r=new xe(new G(i*.9,i*.9,s,40),new te({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const wv={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function Uh(i,e,t,n){const s=wv[n.hazard],r=Dt(512,256,(c,o,l)=>{c.fillStyle="#fffdf6",c.fillRect(0,0,o,l),c.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",c.fillRect(0,0,o,34),c.fillStyle="#ffffff",c.font="bold 24px sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),c.fillStyle="#111827";const h=String(n.display_name||"Reagent").split(" "),f=[];let u="";c.font="bold 40px sans-serif",h.forEach(g=>{const _=u?`${u} ${g}`:g;c.measureText(_).width>o-40&&u?(f.push(u),u=g):u=_}),f.push(u);const p=f.slice(0,2);p.forEach((g,_)=>c.fillText(g,o/2,(n.formula?86:110)+_*46-(p.length-1)*10)),n.formula&&(c.font="bold 54px serif",c.fillStyle="#1e3a8a",c.fillText(String(n.formula),o/2,212)),c.strokeStyle="#cbd5e1",c.lineWidth=4,c.strokeRect(2,2,o-4,l-4)}),a=T(new G(i,i,e,32,1,!0,-1.05,2.1),new te({map:r,roughness:.85,side:Kt}),0,t);return a.userData.role="reagent_label",a}function xa(i,e,t,n){const s=Dt(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let h=1;h<=l;h++){const f=o-h/(l+1)*o;a.fillRect(0,f,h%5===0?44:24,h%5===0?4:2)}}),r=new xe(new G(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new Wi({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function ya(i){const e=Dt(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new Pn(new Gs({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function Fh(i,e){return Dt(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const h=c+l/50*o,f=l%10===0;t.lineWidth=f?4:1.5;const u=f?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(h)*u,r+Math.sin(h)*u),t.lineTo(s+Math.cos(h)*(a-16),r+Math.sin(h)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const h=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(h)*(a-82),r+Math.sin(h)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function Fu(i){return Dt(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function ka(i,e="#22c55e"){return Dt(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function Oh(){return Dt(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function Ev(){return Dt(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const Oo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function Tv(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[Oo[n],Oo[s],Oo[r],"#d4af37"]}class Bo extends Jn{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new U){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function ko(i,e,t,n={}){const s=new zt;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const h=[new j(0,.004),new j(.301,.004),new j(.315,.03),new j(.33949999999999997,.58),new j(.357,.6),new j(.364,.612)];r(new xe(new ri(h,48),vt()));const f=T(new Bn(.045,.07,3),vt(),.35*1,.6-.015,0);f.rotation.z=-Math.PI/2,r(f,xa(.35*.95,.06,.6*.72,4),Fn(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const h=T(new G(.12,.12,.55,32,1,!0),vt(),0,.375),f=T(new Xt(.12,32,16,0,Math.PI*2,0,Math.PI/2),vt(),0,.1);f.rotation.x=Math.PI;const u=T(new Lt(.12*1.02,.012,10,32),vt(),0,.55+.1);u.rotation.x=Math.PI/2;const p=T(Xe(.34,.08,.34,.02),si(),0,.04);r(h,f,u,p,Fn(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const h=T(new G(.06,.06,1.1,32,1,!0),vt(),0,.7000000000000001),f=T(new G(.06*1.25,.06*1.25,.1,24),vt(15660799),0,.1),u=T(Xe(.16,.03,.035,.012),bt(1920728),.09,.1),p=T(new G(.03,.01,.1,16,1,!0),vt(),0,.02),g=T(new G(.2,.22,.04,32),Qt(3099491),0,.02);r(h,f,u,p,g,xa(.06,.2,1.1*.85,10),Fn(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=T(new G(.018,.008,.3,16),vt(),0,.2),l=T(new Xt(.055,24,16),vt(),0,.42);l.scale.y=1.8;const h=T(new G(.018,.018,.3,16),vt(),0,.68),f=T(new Lt(.02,.003,6,20),new Wi({color:1120295}),0,.74);f.rotation.x=Math.PI/2;const u=T(new Xt(.075,24,16),bt(12131356),0,.9);u.scale.y=1.25;const p=T(Xe(.22,.07,.18,.02),si(),0,.035);r(o,l,h,f,u,p);break}case"measuring_cylinder":{const h=T(new G(.18,.17099999999999999,.8,40,1,!0),vt(),0,.44),f=T(new G(.18*1.6,.18*1.7,.05,6),vt(15266293),0,.025),u=T(new Bn(.035,.06,3),vt(),.18,.8+.03,0);u.rotation.z=-Math.PI/2,r(h,f,u,xa(.18*.97,.12,.8*.8,5),Fn(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new te({color:1920728,roughness:.45,metalness:.2}),l=[new j(0,.005),new j(.27,.005),new j(.272,.018),new j(.2,.05),new j(.11,.1),new j(.075,.13),new j(0,.13)],h=new xe(new ri(l,56),o),f=T(new G(.068,.07,.11,36),o,0,.175),u=Dt(128,16,(x,A,I)=>{x.fillStyle="#d4d4d8",x.fillRect(0,0,A,I),x.fillStyle="#71717a";for(let L=0;L<A;L+=4)x.fillRect(L,0,1.5,I)});u.wrapS=vn,u.repeat.set(3,1);const p=T(new G(.052,.052,.075,40),new te({map:u,roughness:.3,metalness:1}),0,.268),g=T(new G(.066,.066,.03,6),St(),0,.32),_=T(new G(.06,.06,.012,40),St(),0,.341),m=T(new G(.048,.048,.28,36,1,!0),St(),0,.485),d=T(new G(.042,.042,.004,28),new te({color:4144966,roughness:.8}),0,.6),M=T(new Lt(.046,.004,8,32),St(),0,.625);M.rotation.x=Math.PI/2;const v=new zt,y=T(new G(.032,.032,.2,24),St(),0,.1);v.add(y);for(let x=0;x<3;x++)v.add(T(new G(.03,.036,.025,24),St(),0,.215+x*.03));v.add(T(new G(.02,.02,.004,20),new te({color:2565930}),0,.29)),v.rotation.z=Math.PI/2+.12,v.position.set(-.05,.16,0),r(h,f,p,g,_,m,d,M,v);const w=n.flame==="on",b=T(new Bn(.09,.3,24),new te({color:16751933,emissive:16738816,emissiveIntensity:w?1:0,transparent:!0,opacity:w?.75:0,depthWrite:!1}),0,.77);b.userData.role="flame";const C=T(new Bn(.045,.16,16),new te({color:6333946,emissive:2450411,emissiveIntensity:w?1.3:0,transparent:!0,opacity:w?.85:0,depthWrite:!1}),0,.7);C.userData.role="flame",r(b,C);break}case"thermometer":{const o=Dt(256,1690,(d,M,v)=>{d.fillStyle="#fbfbf8",d.fillRect(0,0,M,v),d.fillStyle="#0f172a",d.textAlign="left",d.textBaseline="middle";const y=v-250,w=v-400;for(let b=0;b<=100;b+=2){const C=y-b/100*w,x=b%10===0;d.fillRect(M-(x?90:50),C-(x?3:1.5),x?90:50,x?6:3),x&&(d.font=`900 ${b%50===0?62:52}px Arial, sans-serif`,d.fillText(String(b),10,C))}d.font="700 44px Arial, sans-serif",d.fillText("°C",14,y-w-70)}),l=T(Xe(.1,.66,.02,.008),new te({map:o,roughness:.5}),0,.45,-.025),h=T(new G(.022,.022,.62,24),vt(16777215),0,.45),f=T(new G(.008,.008,.45,12),new te({color:14427686,roughness:.2}),0,.32),u=T(new Xt(.05,24,24),new te({color:14427686,roughness:.2}),0,.1),p=T(new Xt(.065,24,24),vt(16777215),0,.1),g=T(Xe(.26,.04,.2,.015),Qt(3099491),0,.02);r(l,h,f,u,p,g);const _=d=>.78-(1440-d*12.9)/1690*.66;let m;for(const d of[0,25,50,75,100]){const M=Sv(`${d}°`,12,d%50===0?void 0:m);M.center.set(0,.5),M.position.set(.065,_(d),-.02),r(M),d%50===0&&(m=M)}break}case"battery":{const o=Dt(512,256,(g,_,m)=>{g.fillStyle="#111827",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,_,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,_/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",_/2,m*.9)}),l=bt(2042167),h=T(Xe(.6,.3,.3,.035),[l,l,l,l,new te({map:o,roughness:.5}),l],0,.15),f=ki(.2,.3,0,14427686),u=ki(-.2,.3,0,1118481),p=new Pn(new Gs({map:Fu(n.voltage||6),depthTest:!1,transparent:!0}));p.scale.set(.34,.136,1),p.position.set(0,.58,0),p.renderOrder=9,p.userData.role="voltage",r(h,f,u,p);break}case"ruler":{const h=new te({color:15381256,roughness:.6}),f=new te({map:Oh(),roughness:.55});r(T(new Ke(1.5,.015,.16),[h,h,f,h,h,h],0,.0075));break}case"bulb":{const o=n.state==="on",l=T(new Xt(.18,32,32),new Xi({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const h=T(new Lt(.05,.006,8,24,Math.PI*1.7),new te({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);h.rotation.x=Math.PI/2,h.userData.role="led";const f=T(new G(.095,.11,.16,24),On(),0,.12),u=new zt;for(let g=0;g<5;g++){const _=T(new Lt(.1,.006,6,24),On(),0,.06+g*.028);_.rotation.x=Math.PI/2,u.add(_)}const p=T(Xe(.4,.04,.26,.015),si(),0,.02);r(l,h,f,u,p,ki(-.15,.04,.07,14427686),ki(.15,.04,.07,1118481));break}case"switch":{const o=T(Xe(.4,.06,.2,.012),si(),0,.03),l=T(new G(.02,.02,.1,16),On(),-.12,.11),h=T(Xe(.05,.06,.05,.008),On(),.12,.09),f=T(new G(.012,.012,.24,16),St()),u=n.state==="closed";f.position.set(u?0:-.06,.16,0),f.rotation.z=u?Math.PI/2-.35:Math.PI/2-.9,f.userData.role="lever",f.add(T(new Xt(.028,16,12),bt(1118481),0,-.13,0)),r(o,l,h,f);break}case"resistor":{const o=Dt(256,64,(g,_,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,_,m),Tv(n.resistance_ohm).forEach((d,M)=>{g.fillStyle=d,g.fillRect(60+M*34+(M===3?22:0),0,16,m)})}),l=T(new G(.07,.07,.32,32),new te({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const h=T(new G(.01,.01,.52,10),mt(13948120),0,.2);h.rotation.z=Math.PI/2;const f=T(Xe(.6,.04,.2,.012),bt(15195332),0,.02),u=T(new G(.012,.012,.16,10),mt(13948120),-.26,.12),p=u.clone();p.position.x=.26,r(l,h,f,u,p);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=T(Xe(.42,.4,.18,.03),Qt(o?1981066:8330525),0,.2),h=T(new Lt(.155,.015,12,48),St(),0,.2,.091),f=T(new ci(.15,48),new te({map:Fh(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),u=T(new Bn(.012,.13,8),Cn(14427686),.02,.2,.1);u.rotation.z=-Math.PI/2+.6,u.userData.role="needle";const p=T(new Xt(.014,12,12),mt(2565930),0,.2,.1);r(l,h,f,u,p,ki(-.12,.4,0,14427686),ki(.12,.4,0,1118481));break}case"microscope":{const o=Qt(15659250),l=Qt(2040616);r(T(Xe(.36,.06,.47,.02),o,0,.03,-.05)),r(T(Xe(.1,.28,.1,.02),o,0,.19,-.22));const h=new Pl([new U(0,.27,-.23),new U(0,.55,-.23),new U(0,.74,-.14),new U(0,.8,-.03)]);r(new xe(new bi(h,24,.044,12,!1),o));const f=T(new G(.035,.035,.01,24),new te({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);f.userData.role="led",r(T(new G(.045,.05,.05,24),l,0,.085),f),r(T(Xe(.3,.022,.28,.006),l,0,.32));for(const u of[-.08,.08])r(T(new Ke(.016,.004,.11),St(),u,.333,.03));r(T(new G(.036,.036,.25,24),l,0,.7)),r(T(new G(.025,.03,.11,24),l,0,.88)),r(T(new G(.056,.06,.033,32),St(),0,.565)),[14427686,15381256,2450411].forEach((u,p)=>{const g=new zt;g.position.y=.55,g.rotation.y=2*Math.PI*p/3;const _=new zt;_.position.z=.03,_.rotation.x=.35,_.add(T(new G(.015,.012,.07+p*.015,16),St(),0,-.04-p*.008)),_.add(T(new G(.0158,.0158,.008,16),bt(u),0,-.03)),g.add(_),r(g)});for(const u of[-1,1]){const p=T(new G(.05,.05,.028,24),l,u*.08,.25,-.22);p.rotation.z=Math.PI/2;const g=T(new G(.025,.025,.028,20),l,u*.11,.25,-.22);g.rotation.z=Math.PI/2,r(p,g)}break}case"lens":{const o=T(new Xt(.22,40,40),vt(15988991),0,.42);o.scale.set(1,1,.22);const l=T(new Lt(.22,.02,16,48),mt(10265519),0,.42),h=T(new G(.015,.015,.2,12),mt(),0,.1),f=T(new G(.12,.14,.03,32),Qt(3099491),0,.015);r(o,l,h,f);break}case"mirror":{const o=T(Xe(.4,.5,.02,.006),[mt(4674921),mt(4674921),mt(4674921),mt(4674921),new te({color:16777215,metalness:1,roughness:.03}),mt(4674921)],0,.3,0),l=T(Xe(.36,.06,.12,.012),si(),0,.03,-.02);r(o,l);break}case"biological_model":{const o=T(new Ke(.5,.012,.18),vt(14742270),0,.006),l=T(new Ke(.14,.003,.14),vt(15857397),0,.014),h=T(new ci(.045,32),new te({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);h.rotation.x=-Math.PI/2;const f=T(new Ke(.12,.014,.17),bt(16317180),-.18,.007);r(o,l,h,f);break}case"wire":{const o=new xe(new bi(new Bo(.12,.15,5),240,.012,8,!1),new te({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=T(new G(.135,.135,.14,24),bt(3621201),0,.08);r(l,o);break}case"water_container":{const h=T(new G(.255,.3,.75,48,1,!0),vt(),0,.375),f=T(new ci(.3,48),vt(),0,.003);f.rotation.x=-Math.PI/2;const u=T(new Lt(.14,.02,12,32,Math.PI*1.3),vt(),.3*.85,.75*.6);u.rotation.z=Math.PI/2,r(h,f,u,Fn(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),h=T(new G(.025,.025,l,24),mt(10265519),0,.025);h.rotation.z=Math.PI/2;const f=T(new Xt(.025,16,16),mt(7434618),-l/2,.025),u=f.clone();u.position.x=l/2,r(h,f,u);break}case"balance":{const o=T(Xe(.55,.1,.42,.03),Qt(15067115),0,.05),l=T(new G(.16,.16,.015,40),St(),0,.11,.02),h=T(new G(.03,.03,.02,16),mt(),0,.1,.02),f=T(Xe(.3,.07,.05,.012),bt(2042167),0,.07,.2),u=new Pn(new Gs({map:ka("0.0 g"),depthTest:!1,transparent:!0}));u.scale.set(.3,.135,1),u.position.set(0,.24,.2),u.renderOrder=9,u.userData.role="balance_display",r(o,l,h,f,u);break}case"stopwatch":{const o=T(new G(.13,.13,.045,48),Qt(2042167),0,.16);o.rotation.x=Math.PI/2;const l=T(new Lt(.13,.01,10,48),St(),0,.16),h=T(new G(.022,.022,.04,16),St(),0,.305),f=T(new Lt(.025,.006,8,20),St(),0,.34),u=T(Xe(.18,.03,.12,.01),bt(3621201),0,.015),p=new Pn(new Gs({map:ka("00:00.0"),depthTest:!1,transparent:!0}));p.scale.set(.2,.09,1),p.position.set(0,.16,.03),p.renderOrder=9,p.userData.role="stopwatch_display",r(o,l,h,f,u,p);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,h=o*.05,f=(o+l*1.6)*.05,u=new xe(new bi(new Bo(f,.05,22),440,.007,6,!1),new te({color:13094097,roughness:.25,metalness:1}));u.userData.role="spring_body",u.userData.naturalLengthUnits=h,u.userData.maxLengthUnits=f,u.scale.y=h/f,u.position.y=.85-f*u.scale.y/2;const p=T(new Lt(.03,.008,8,20),mt(7434618),0,.85),g=T(new G(.05,.05,.015,24),mt(5395035));g.userData.role="spring_hanger",g.position.y=.85-f*u.scale.y,r(u,p,g);break}case"retort_stand":{const o=Qt(3099491);r(T(Xe(.36,.035,.24,.012),o,0,.0175)),r(T(new G(.016,.016,.95,20),mt(),-.13,.5)),r(T(Xe(.07,.07,.07,.01),o,-.13,.9));const l=T(new G(.01,.01,.07,10),mt(),-.13,.9,.06);l.rotation.x=Math.PI/2;const h=T(new G(.012,.012,.3,16),mt(),.03,.9);h.rotation.z=Math.PI/2,r(l,h,T(Xe(.04,.05,.05,.008),On(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),h=.04+Math.min(.06,o/3e3),f=Dt(256,256,(p,g)=>{p.fillStyle="#4a525c",p.fillRect(0,0,g,g),p.fillStyle="#1f2328",p.beginPath(),p.arc(g/2,g/2,22,0,Math.PI*2),p.fill(),p.fillRect(g/2-9,g/2,18,g/2),p.fillStyle="#f1f5f9",p.font="bold 58px Arial",p.textAlign="center",p.textBaseline="middle",p.fillText(`${o}g`,g/2,g/2-62)}),u=Qt(4870748);u.metalness=.5,r(T(new G(l,l,h,36),[u,new te({map:f,metalness:.4,roughness:.5}),u],0,h/2));break}case"ray_box":{const o=n.state==="on",l=T(Xe(.35,.22,.28,.03),Qt(2042167),0,.11),h=T(new Ke(.2,.16,.012),bt(988970),0,.11,.145),f=T(new Ke(.02,.12,.02),new te({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);f.userData.role="led";const u=T(new G(.012,.012,.3,10),bt(1120295),0,.03,-.29);u.rotation.x=Math.PI/2,r(l,h,f,u);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(T(Xe(o,.1,.55,.01),vt(14676223),0,.05));break}case"projectile_launcher":{const o=new te({color:2962235,metalness:.6,roughness:.4});r(T(Xe(.5,.05,.36,.015),o,0,.025));for(const p of[-.09,.09])r(T(Xe(.1,.22,.02,.006),o,0,.14,p));const l=new zt;l.position.y=.22,l.rotation.z=Math.PI/4;const h=T(new G(.05,.055,.45,28),new te({color:1920728,metalness:.5,roughness:.35}),.17,0);h.rotation.z=-Math.PI/2;const f=T(new Lt(.053,.011,12,28),St(),.39,0);f.rotation.y=Math.PI/2;const u=T(new G(.018,.018,.22,16),mt());u.rotation.x=Math.PI/2,l.add(h,f,u),r(l);break}case"projectile":{r(T(new Lt(.05,.012,10,28),bt(3621201),0,.012)),r(T(new Xt(.07,32,20),new te({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=T(new G(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new te({map:Ev(),transparent:!0,opacity:.92,roughness:.3,side:Kt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,h=.62,f=.085,u=[new j(0,.004),new j(l*.96,.004),new j(l,.03),new j(f+.01,h*.7),new j(f,h*.76),new j(f,h-.02),new j(f+.012,h),new j(f+.012,h+.012)],p=o?new Xi({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:Kt,depthWrite:!1}):vt();r(new xe(new ri(u,56),p));const g=Dt(512,512,(v,y,w)=>{v.clearRect(0,0,y,w),v.fillStyle="#ffffff",v.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([C,x])=>{v.fillRect(y*.6,w*C,y*.13,5),v.font="bold 34px Arial",v.fillText(x,y*.76,w*C+12)}),v.fillRect(y*.63,w*.64,y*.07,4),v.font="bold 40px Arial",v.fillText("250 ml",y*.12,w*.52),v.fillRect(y*.14,w*.58,y*.2,w*.09),v.save(),v.translate(y*.56,w*.86),v.rotate(-Math.PI/2),v.font="bold 22px Arial",v.fillText("APPROX. VOL",0,0),v.restore()}),_=.03,m=h*.7,d=new xe(new ri([new j(l*1.006,_),new j((f+.01)*1.006,m)],24,-.75,1.5),new Wi({map:g,transparent:!0,depthWrite:!1,side:Kt}));r(d);const M=new xe(new G(.11,l*.94,h*.66,48),new te({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));M.userData.role="liquid",M.userData.maxFillHeight=h*.66,M.scale.y=.001,r(M);break}case"round_bottom_flask":{const o=T(new Xt(.28,40,28),vt(),0,.36),l=T(new G(.07,.07,.34,28,1,!0),vt(),0,.78),h=T(new Lt(.2,.025,12,40),bt(3621201),0,.05);h.rotation.x=Math.PI/2;const f=new zt;f.position.y=.14,f.add(Fn(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,h,f);break}case"evaporating_dish":{const o=[new j(0,.01),new j(.12,.012),new j(.26,.09),new j(.3,.13)];r(new xe(new ri(o,48),new te({color:16317180,roughness:.25,side:Kt})));const l=new zt;l.position.y=.012,l.add(Fn(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=T(new Lt(.3,.02,12,48),mt(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const h=l/3*Math.PI*2,f=T(new G(.018,.018,.82,12),mt(5395035),Math.cos(h)*.34,.4,Math.sin(h)*.34);f.rotation.z=Math.cos(h)*-.08,f.rotation.x=Math.sin(h)*.08,r(f)}break}case"wire_gauze":{const o=Dt(256,256,(l,h,f)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,h,f),l.strokeStyle="#4b5563",l.lineWidth=2;for(let u=0;u<h;u+=10)l.beginPath(),l.moveTo(u,0),l.lineTo(u,f),l.moveTo(0,u),l.lineTo(h,u),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(h/2,f/2,h*.28,0,Math.PI*2),l.fill()});r(T(new Ke(.62,.008,.62),new te({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=T(new G(.26,.03,.32,40,1,!0),vt(),0,.52),l=T(new G(.025,.02,.32,20,1,!0),vt(),0,.2),h=T(new Bn(.22,.27,32,1,!0),new te({color:16777215,roughness:.9,side:Kt}),0,.53);h.rotation.x=Math.PI,r(o,l,h);break}case"test_tube_rack":{const o=T(Xe(.9,.04,.24,.01),si(),0,.3),l=T(Xe(.9,.04,.24,.01),si(),0,.02),h=T(Xe(.04,.3,.24,.01),si(),-.43,.16),f=h.clone();f.position.x=.43,r(o,l,h,f);const u=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let p=0;p<4;p++){const g=-.3+p*.2;r(T(new G(.055,.055,.42,20,1,!0),vt(),g,.25)),r(T(new G(.05,.05,.12,20),new te({color:u[p],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=T(Xe(.32,.008,.05,.003),St(),.16,.006),l=T(new Xt(.04,20,10,0,Math.PI*2,0,Math.PI/2),St(),-.18,.04);l.rotation.x=Math.PI;const h=T(new G(.008,.008,.18,12),St(),-.06,.008);h.rotation.z=Math.PI/2,r(o,l,h);break}case"wash_bottle":{const o=T(new G(.17,.18,.5,36),new te({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=T(new G(.07,.09,.08,24),bt(2450411),0,.54),h=T(new G(.012,.012,.3,10),bt(2450411),.08,.66);h.rotation.z=-.9,r(o,l,h,Fn(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const h=[new j(0,.003),new j(.188,.003),new j(.2,.03),new j(.2,.56),new j(.16000000000000003,.64),new j(.07,.6900000000000001),new j(.065,.75),new j(.072,.76)];r(new xe(new ri(h,40),vt())),r(Fn(.2*.97,.56,n.color||"#eef6f8",.78));const f=T(new G(.06,.055,.07,24),vt(15266031),0,.56+.22),u=T(new G(.09,.09,.035,28),vt(15266031),0,.56+.27);r(f,u,Uh(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(T(new G(.21,.21,.46,40,1,!0),vt(),0,.46/2+.005)),r(T(new G(.21,.21,.01,40),vt(),0,.005));const h=.46*.62,f=T(new G(.21*.95,.21*.95,h,40),new te({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,h/2+.01),u=T(new G(.21*1.04,.21*1.04,.07,40),bt(2042167),0,.46+.035);r(f,u,Uh(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=T(new G(.02,.008,.36,16),vt(),0,.24),l=T(new Xt(.045,20,14),bt(1120295),0,.46);l.scale.y=1.6;const h=T(new G(.1,.1,.22,28),new te({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,h);break}case"crucible":{const o=[new j(0,.005),new j(.08,.005),new j(.13,.2),new j(.14,.21)],l=new te({color:16119284,roughness:.3,side:Kt});r(new xe(new ri(o,40),l));const h=T(new G(.15,.15,.015,40),l,.32,.008),f=T(new Xt(.025,16,12),l,.32,.025);r(h,f);break}case"bar_magnet":{r(T(Xe(.3,.08,.1,.01),Qt(14427686),-.15,.04),T(Xe(.3,.08,.1,.01),Qt(1920728),.15,.04));const o=ya("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=ya("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(T(new G(.12,.12,.04,40),On(),0,.02)),r(T(new G(.105,.105,.002,40),new te({color:16777215}),0,.041));const o=new zt,l=T(new Bn(.018,.09,4),Cn(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const h=T(new Bn(.018,.09,4),Cn(2042167),0,0,.045);h.rotation.x=Math.PI/2,o.add(l,h),o.position.y=.05,o.userData.role="needle",r(o,T(new G(.11,.11,.012,40),vt(),0,.06));break}case"prism":{const o=new zi;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new Mi(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new xe(l,vt(14742270)));break}case"rheostat":{const o=new te({color:6054233,roughness:.75,metalness:.45}),l=new te({color:14925716,roughness:.6}),h=new te({color:1118481,roughness:.35}),f=.2,u=.79,p=Dt(64,64,(v,y,w)=>{v.fillStyle="#1a1a1a",v.fillRect(0,0,y,w);for(let b=0;b<w;b+=4)v.fillStyle="#3a3a3a",v.fillRect(0,b,y,1),v.fillStyle="#050505",v.fillRect(0,b+2,y,1)});p.wrapS=p.wrapT=vn,p.repeat.set(1,18);const g=T(new G(.125,.125,1.24,48),new te({map:p,roughness:.4,metalness:.6}),0,f);g.rotation.z=Math.PI/2,r(g);for(const v of[-1,1]){const y=T(new G(.12,.12,.1,40),l,v*.67,f),w=T(new G(.129,.129,.035,40),St(),v*.635,f),b=T(new G(.1,.1,.05,32),o,v*.745,f);for(const I of[y,w,b])I.rotation.z=Math.PI/2;r(y,w,b);const C=new zi;C.moveTo(-.17,0),C.lineTo(.17,0),C.lineTo(.09,.42),C.lineTo(-.09,.42),C.closePath();const x=new Mi(C,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});x.translate(0,0,-.015);const A=new xe(x,o);A.rotation.y=Math.PI/2,A.position.x=v*u,r(A);for(const I of[-.2,.2]){const L=T(Xe(.1,.025,.09,.008),o,v*(u-v*.04),.0125,I),z=T(new G(.018,.018,.027,16),new te({color:2042167}),v*(u-v*.04),.0125,I);r(L,z)}r(T(Xe(.05,.03,.06,.006),St(),v*.6,f-.15,.06)),r(T(new G(.014,.014,.02,12),mt(10265519),v*.6,f-.125,.06))}const _=(v,y,w,b)=>{const C=new zt,x=T(new G(.012,.012,.04,12),On(),b*.02,0,0);x.rotation.z=Math.PI/2;const A=T(new G(.03,.03,.06,18),h,b*.065,0,0);A.rotation.z=Math.PI/2;for(let I=0;I<9;I++){const L=T(new Ke(.06,.006,.006),h,b*.065,Math.cos(I*.7)*.03,Math.sin(I*.7)*.03);C.add(L)}return C.add(x,A),C.position.set(v,y,w),C};r(_(u+.02,.32,.03,1),_(u+.02,.1,.03,1),_(-u-.02,.2,.06,-1));const m=T(new G(.012,.016,.05,12),On(),u+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(T(new Ke(u*2,.035,.035),St(),0,.395,-.02));const d=new zt,M=Dt(128,128,(v,y,w)=>{v.fillStyle="#111111",v.fillRect(0,0,y,w),v.fillStyle="#e5e7eb",v.font="bold 26px Arial",v.textAlign="center",v.save(),v.translate(30,w/2),v.rotate(-Math.PI/2),v.fillText("11",0,-4),v.fillText("5",0,22),v.restore()});d.add(T(Xe(.13,.08,.13,.015),[h,h,new te({map:M,roughness:.35}),h,h,h],0,.41,-.01)),d.add(T(Xe(.12,.09,.05,.012),h,0,.34,.05));for(const v of[-.035,.025])d.add(T(new G(.017,.017,.006,20),St(),.02,.453,v));d.position.x=.05,d.userData.role="slider",r(d);break}case"dry_cell":{const o=Dt(512,256,(_,m,d)=>{_.fillStyle="#d61f26",_.fillRect(0,0,m,d),_.fillStyle="#f5c518",_.fillRect(0,0,m,10),_.fillRect(0,d-10,m,10);const M=m*.25;_.textAlign="center",_.font="italic bold 40px Georgia",_.fillStyle="#fde68a",_.fillText("Power Cell",M,52),_.fillStyle="#f59e0b",_.beginPath(),_.arc(M,118,40,0,Math.PI*2),_.fill(),_.fillStyle="#7c2d12",_.font="bold 44px Arial",_.fillText("+",M,134),_.fillStyle="#fde68a",_.font="bold 22px Arial",_.fillText("SUPER QUALITY",M,190),_.fillStyle="#ffffff",_.font="bold 24px Arial",_.fillText("BATTERY",M,218),_.fillText("1.5V",M,242),_.fillStyle="#fde68a",_.font="bold 30px Arial",_.fillText("1.5V  DRY CELL",m*.75,d/2+10)});o.wrapS=vn,o.offset.x=.25;const l=.09,h=.32,f=T(new G(l,l,h,48,1,!0),new te({map:o,roughness:.35}),0,h/2+.006),u=T(new G(l*.98,l*.98,.012,48),St(),0,h+.006),p=T(new G(.03,.032,.025,24),St(),0,h+.024),g=T(new G(l*.98,l*.98,.012,48),mt(10265519),0,.006);r(f,u,p,g);break}case"accumulator":{const o=Dt(1024,768,(d,M,v)=>{d.fillStyle="#f8fafc",d.fillRect(0,0,M,v),d.fillStyle="#1d4ed8",d.strokeStyle="#1d4ed8",d.textAlign="center",d.font="bold 44px Arial",d.fillText("UPPER LEVEL",M/2,70),d.fillRect(M*.08,90,M*.84,6),d.fillText("LOWER LEVEL",M/2,170),d.fillRect(M*.08,190,M*.84,6),d.fillRect(M*.06,250,M*.88,12),d.fillRect(M*.06,280,M*.4,300),d.fillStyle="#ffffff",d.font="bold 120px Arial",d.fillText("12V",M*.26,440),d.font="bold 34px Arial",d.fillText("LEAD-ACID",M*.26,520),d.fillStyle="#1d4ed8",d.font="bold 110px Arial",d.fillText("NS60",M*.7,400),d.font="bold 56px Arial",d.fillText("12V / 45AH",M*.7,480),d.font="bold 34px Arial",d.fillText("ACCUMULATOR",M*.7,545),d.fillRect(M*.06,600,M*.88,10)}),l=new te({color:15857145,roughness:.55}),h=new te({color:1920728,roughness:.4}),f=T(Xe(.9,.62,.55,.03),[l,l,l,l,new te({map:o,roughness:.5}),l],0,.31),u=T(Xe(.94,.09,.59,.025),h,0,.665),p=T(Xe(.96,.03,.61,.01),h,0,.625),g=T(Xe(.16,.055,.03,.008),h,0,.66,.3);r(f,u,p,g);const _=new te({color:16436245,roughness:.45});for(let d=0;d<6;d++){const M=-.35+d*.14;r(T(new G(.045,.045,.02,24),h,M,.72,-.12)),r(T(new G(.036,.04,.05,8),_,M,.75,-.12)),r(T(new G(.026,.026,.012,16),_,M,.781,-.12))}const m=new te({color:9146260,roughness:.5,metalness:.7});for(const[d,M]of[[-.38,"+"],[.38,"-"]]){r(T(new G(.06,.06,.03,28),h,d,.725,.12)),r(T(new G(.026,.032,.09,20),m,d,.785,.12));const v=ya(M);v.scale.set(.16,.035,1),v.position.set(d,.86,.12),r(v)}break}case"potentiometer":{const o=new te({color:13222799,roughness:.35,metalness:.9}),l=mt(12107462),h=new te({color:10108695,roughness:.55}),f=.12;r(T(new G(f,f,.09,48),o,0,.045));const u=new zi;u.absarc(0,0,f*1.02,Math.PI*.05,Math.PI*.95,!0),u.lineTo(-f*1.05,f*.6),u.lineTo(f*1.05,f*.6);const p=new Mi(u,{depth:.012,bevelEnabled:!1}),g=T(p,h,0,.102,0);g.rotation.x=Math.PI/2,r(g),r(T(Xe(.2,.012,.14,.004),l,0,.114,-.02)),r(T(new G(.045,.045,.008,32),On(),0,.124));const _=T(new G(.05,.05,.03,6),o,0,.143);r(_),r(T(new G(.03,.03,.06,24),l,0,.16));for(let d=0;d<4;d++){const M=T(new Lt(.031,.004,6,24),l,0,.14+d*.012);M.rotation.x=Math.PI/2,r(M)}const m=T(new G(.024,.024,.2,24),l,0,.29);m.userData.role="lever",r(m,T(new Xt(.024,20,10,0,Math.PI*2,0,Math.PI/2),l,0,.39)),r(T(new Ke(.02,.06,.012),l,-.08,.15,-.07));for(const d of[-.07,0,.07]){const M=T(new Ke(.03,.08,.004),l,d,.07,f*.66),v=T(new Lt(.012,.005,8,16),l,d,.035,f*.66);r(M,v)}break}case"metre_bridge":{r(T(Xe(5.5,.08,.5,.01),new te({color:11561522,roughness:.6}),0,.04));const h=Dt(2048,96,(d,M,v)=>{d.fillStyle="#f6d58a",d.fillRect(0,0,M,v),d.fillStyle="#1f2937",d.strokeStyle="#1f2937",d.font="bold 22px Arial",d.textAlign="center";for(let y=0;y<=100;y++){const w=24+y/100*(M-48),b=y%10===0;d.lineWidth=b?3:1.4,d.beginPath(),d.moveTo(w,0),d.lineTo(w,b?46:y%5===0?34:22),d.stroke(),b&&d.fillText(String(y),w,76)}}),f=T(new fn(5,.14),new te({map:h,roughness:.6}),0,.081,.12);f.rotation.x=-Math.PI/2,r(f);const u=Qt(14212579);r(T(new Ke(.85,.012,.07),u,-2.1,.086,-.15)),r(T(new Ke(.07,.012,.32),u,-2.5,.086,0)),r(T(new Ke(.85,.012,.07),u,2.1,.086,-.15)),r(T(new Ke(.07,.012,.32),u,2.5,.086,0)),r(T(new Ke(2.6,.012,.07),u,0,.086,-.15));const p=T(new G(.004,.004,5,8),St(),0,.1,.06);p.rotation.z=Math.PI/2,r(p);const g=bt(16436245);for(const[d,M]of[[-2.5,.13],[-2.4,-.15],[-1.75,-.15],[-1.2,-.15],[0,-.15],[1.2,-.15],[1.75,-.15],[2.4,-.15],[2.5,.13]])r(T(new G(.03,.035,.08,16),g,d,.13,M)),r(T(new G(.012,.012,.03,10),On(),d,.185,M));const _=T(new G(.03,.035,.28,16),bt(1120295),-.9,.16,.03);_.rotation.z=Math.PI/2.4;const m=T(new Bn(.012,.05,8),St(),-.79,.11,.05);r(_,m);for(const d of[-2.55,2.55])for(const M of[-.2,.2])r(T(new G(.03,.03,.02,12),bt(1120295),d,-.005,M));break}case"optical_pyrometer":{const o=new te({color:2040099,roughness:.8}),l=St(),h=new te({color:9067051,roughness:.7});r(T(new G(.3,.3,1.3,40),o,0,.65,-.32)),r(T(new G(.31,.31,.08,40),o,0,1.33,-.32));for(const m of[.45,1.05]){const d=T(new Lt(.305,.012,6,48),h,0,m,-.32);d.rotation.x=Math.PI/2,d.scale.z=2.2,r(d)}r(T(new G(.2,.2,.95,40),o,0,.5,.05)),r(T(new G(.205,.205,.06,40),l,0,.03,.05));const f=Dt(512,128,(m,d,M)=>{m.fillStyle="#d6d9dc",m.fillRect(0,0,d,M),m.fillStyle="#f5f2e6",m.fillRect(150,18,210,92),m.strokeStyle="#374151",m.strokeRect(150,18,210,92),m.fillStyle="#14532d",m.font="italic bold 44px Georgia",m.fillText("Pyro",200,72),m.font="14px Arial",m.fillStyle="#111827";for(let v=0;v<9;v++)m.fillRect(160+v*22,98,2,8)});f.wrapS=vn,f.offset.x=.5,r(T(new G(.203,.203,.16,40,1,!0),new te({map:f,roughness:.3,metalness:.5}),0,.72,.05));const u=T(new Lt(.07,.015,10,32),l,0,.42,.25),p=T(new G(.05,.05,.02,24),o,0,.42,.25);p.rotation.x=Math.PI/2,r(u,p);const g=[new j(.06,0),new j(.065,.04),new j(.1,.11),new j(.095,.12)],_=new xe(new ri(g,32),new te({color:2829616,roughness:.9,side:Kt}));_.position.set(0,1.05,.05),_.rotation.x=-.2,r(T(new G(.07,.08,.1,24),o,0,1,.05),_),r(T(new Ke(.03,.1,.03),l,.2,.82,.05));break}case"power_transistor":{const o=new te({color:1579035,roughness:.55}),l=mt(14278114),h=.5;for(const m of[-.1,0,.1])r(T(new Ke(.03,h,.012),l,m,h/2,0)),r(T(new Ke(.05,.06,.014),l,m,h+.02,0));const f=T(Xe(.4,.36,.18,.015),o,0,h+.2,.02);r(f);const u=Dt(256,224,(m,d,M)=>{m.fillStyle="#18181b",m.fillRect(0,0,d,M),m.fillStyle="#e5e7eb",m.font="bold 48px Arial",m.textAlign="center",m.fillText("TIP122G",d/2,90),m.font="bold 40px Arial",m.fillText("AFN39",d/2,150),m.beginPath(),m.arc(40,40,18,0,Math.PI*2),m.lineWidth=4,m.strokeStyle="#e5e7eb",m.stroke()});r(T(new fn(.38,.33),new te({map:u,roughness:.6}),0,h+.2,.111));const p=new zi;p.moveTo(-.2,0),p.lineTo(.2,0),p.lineTo(.2,.34),p.lineTo(-.2,.34),p.lineTo(-.2,0);const g=new Dl;g.absarc(0,.26,.06,0,Math.PI*2,!1),p.holes.push(g);const _=T(new Mi(p,{depth:.05,bevelEnabled:!1}),l,0,h+.2,-.07);r(_);break}case"capacitor":{const f=Dt(1024,512,(u,p,g)=>{u.fillStyle="#38bdf8",u.fillRect(0,0,p,g),u.fillStyle="#0f172a",u.fillRect(p*.62,0,p*.16,g),u.fillStyle="#38bdf8";for(let _=60;_<g;_+=130)u.fillRect(p*.66,_,p*.08,18);u.fillStyle="#0f172a",u.save(),u.translate(p*.3,g/2),u.rotate(-Math.PI/2),u.textAlign="center",u.font="bold 84px Arial",u.fillText("2200 µF",0,-40),u.font="bold 64px Arial",u.fillText("16 V",0,40),u.font="italic 44px Georgia",u.fillText("Robicon®  -40+85°C",0,110),u.restore()});f.wrapS=vn,f.offset.x=.3,r(T(new G(.26,.26,.95,48),new te({map:f,roughness:.4}),0,.35+.95/2)),r(T(new G(.26*.94,.26*.94,.012,48),mt(13751771),0,.35+.95+.002)),r(T(new G(.26*.94,.26*.94,.02,48),bt(1120295),0,.35-.005));for(const u of[-.09,.09])r(T(new G(.008,.008,.35,8),Nh(),u,.35/2,0));break}case"transformer":{const o=new te({color:5988456,roughness:.55,metalness:.4}),l=.9,h=.95,f=.42,u=.24;r(T(new Ke(l,u*.8,f),o,0,u*.4)),r(T(new Ke(l,u*.8,f),o,0,h-u*.4));for(const M of[-.66/2,(l-u)/2])r(T(new Ke(u,h,f),o,M,h/2));const p=Dt(256,256,(M,v,y)=>{M.fillStyle="#5b6068",M.fillRect(0,0,v,y),M.strokeStyle="rgba(0,0,0,0.25)";for(let w=0;w<y;w+=6)M.beginPath(),M.moveTo(0,w),M.lineTo(v,w),M.stroke()});for(const M of[f/2+.001,-f/2-.001]){const v=T(new fn(l,h),new te({map:p,roughness:.55,metalness:.4,transparent:!0,opacity:.5}),0,h/2,M);M<0&&(v.rotation.y=Math.PI),r(v)}const g=Dt(64,512,(M,v,y)=>{for(let w=0;w<y;w+=8){const b=M.createLinearGradient(0,w,0,w+8);b.addColorStop(0,"#7c2d12"),b.addColorStop(.5,"#e07a3f"),b.addColorStop(1,"#7c2d12"),M.fillStyle=b,M.fillRect(0,w,v,8)}});g.wrapS=g.wrapT=vn,g.repeat.set(4,1);const _=new te({map:g,roughness:.3,metalness:.75}),m=bt(15987958);for(const M of[-.66/2,(l-u)/2]){r(T(Xe(u+.22,h-u*1.7,f+.18,.08),_,M,h/2));for(const v of[u*.85,h-u*.85])r(T(Xe(u+.26,.02,f+.22,.006),m,M,v))}const d=(M,v)=>{const y=T(new G(.015,.015,.5,10),bt(M),l/2+.25,v,0);return y.rotation.z=Math.PI/2,y};r(d(14427686,h*.62),d(2450411,h*.38));break}case"twin_flex_wire":{const o=l=>{const h=[];for(let p=0;p<=900;p++){const g=p/900,_=g*5*Math.PI*2,m=.55+.05*Math.sin(_*.7)+.03*Math.sin(_*2.3),d=.04+.018*Math.sin(_*1.3)+g*.05,M=_*9+l,v=.016;h.push(new U((m+v*Math.cos(M))*Math.cos(_),d+v*Math.sin(M),(m+v*Math.cos(M))*Math.sin(_)*.85))}return new Pl(h)};r(T(new bi(o(0),1400,.014,8,!1),bt(14427686))),r(T(new bi(o(Math.PI),1400,.014,8,!1),bt(1120295)));break}case"toroid_inductor":{const h=T(new Lt(.3,.1,24,64),new te({color:15920326,roughness:.6}),0,.12000000000000001);h.rotation.x=Math.PI/2,r(h);const f=new te({color:12735786,roughness:.3,metalness:.8}),u=44;for(let p=0;p<u;p++){const g=p/u*Math.PI*2,_=T(new Lt(.1+.014,.012,6,20),f,Math.cos(g)*.3,.1+.02,Math.sin(g)*.3);_.rotation.y=-g,r(_)}for(const p of[-.05,.05]){const g=T(new G(.008,.008,.45,8),Nh(),.6,.16,p);g.rotation.z=Math.PI/2,r(g)}break}case"micrometer":{const o=St(),l=mt(13620184),h=new zi;h.moveTo(-.32,.22),h.lineTo(-.32,0),h.absarc(0,0,.32,Math.PI,Math.PI*2,!1),h.lineTo(.32,.22),h.lineTo(.2,.22),h.lineTo(.2,0),h.absarc(0,0,.2,0,Math.PI,!0),h.lineTo(-.2,.22),h.lineTo(-.32,.22);const f=T(new Mi(h,{depth:.07,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:2}),l,0,.33,-.035);r(f);const u=Dt(256,128,(v,y,w)=>{v.fillStyle="#cfd3d8",v.fillRect(0,0,y,w),v.fillStyle="#111827",v.font="bold 34px Arial",v.textAlign="center",v.fillText("0-25mm",y/2,52),v.fillText("0.01",y/2,98)});r(T(new fn(.2,.1),new te({map:u,roughness:.5,metalness:.4}),0,.07,.045));const p=.5,g=(v,y,w)=>{const b=T(v,y,w,p,0);return b.rotation.z=Math.PI/2,b};r(g(new G(.035,.035,.06,20),o,-.17)),r(g(new G(.03,.03,.32,20),o,.04)),r(g(new G(.06,.06,.12,24),l,.26));const _=Dt(256,512,(v,y,w)=>{v.fillStyle="#d8dce0",v.fillRect(0,0,y,w),v.fillStyle="#111827";const b=y*.5;v.fillRect(b-1,0,3,w),v.font="bold 18px Arial";for(let C=0;C<=25;C++){const x=12+C*19;v.fillRect(b-22,x,22,2),C<25&&v.fillRect(b+1,x+9,16,2),C%5===0&&(v.save(),v.translate(b-30,x),v.rotate(-Math.PI/2),v.fillText(String(C),-6,0),v.restore())}});_.wrapS=vn,_.offset.x=.25;const m=g(new G(.05,.05,.4,32),new te({map:_,roughness:.35,metalness:.6}),.52);r(m);const d=Dt(512,64,(v,y,w)=>{v.fillStyle="#d8dce0",v.fillRect(0,0,y,w),v.fillStyle="#111827";for(let b=0;b<50;b++)v.fillRect(b*(y/50),0,2,b%5===0?30:18)});r(g(new G(.07,.075,.1,40),new te({map:d,roughness:.35,metalness:.6}),.68));const M=Dt(128,128,(v,y,w)=>{v.fillStyle="#9aa0a6",v.fillRect(0,0,y,w),v.strokeStyle="#4b5563";for(let b=-w;b<y;b+=8)v.beginPath(),v.moveTo(b,0),v.lineTo(b+w,w),v.stroke(),v.beginPath(),v.moveTo(b+w,0),v.lineTo(b,w),v.stroke()});M.wrapS=M.wrapT=vn,M.repeat.set(6,2),r(g(new G(.075,.075,.24,40),new te({map:M,roughness:.5,metalness:.7}),.85)),r(g(new G(.035,.035,.08,20),o,1.01)),r(g(new G(.055,.055,.08,24,1),new te({map:M,roughness:.5,metalness:.7}),1.09));break}case"vernier_caliper":{const o=mt(14014942),l=new zt,h=1.8,f=.14,u=.025,p=Dt(2048,128,(M,v,y)=>{M.fillStyle="#e5e7eb",M.fillRect(0,0,v,y),M.fillStyle="#111827",M.textAlign="center",M.font="bold 26px Arial";const w=150,b=200,C=(v-b-60)/w;for(let x=0;x<=w;x++){const A=b+x*C,I=x%10===0?50:x%5===0?38:26;M.fillRect(A,y-I,2,I),x%10===0&&M.fillText(String(x/10),A,y-60)}}),g=T(new Ke(h,f,u),[o,o,o,o,new te({map:p,roughness:.4,metalness:.6}),o],0,0,0);l.add(g),l.add(T(new Ke(.16,.42,u),o,-h/2+.08,-.27,0)),l.add(T(new Ke(.06,.16,u*.6),o,-h/2+.12,.15,0));const _=-h/2+.5,m=Dt(512,96,(M,v,y)=>{M.fillStyle="#cbd0d6",M.fillRect(0,0,v,y),M.fillStyle="#111827",M.font="bold 20px Arial",M.textAlign="center";for(let w=0;w<=50;w++){const b=40+w*8.6,C=w%10===0?34:w%5===0?26:18;M.fillRect(b,0,2,C),w%10===0&&M.fillText(String(w/2),b,60)}M.font="16px Arial",M.fillText("0.02 mm",440,86)});l.add(T(new Ke(.5,f+.08,u+.02),[o,o,o,o,new te({map:m,roughness:.4,metalness:.6}),o],_+.2,-.01,.005)),l.add(T(new Ke(.14,.42,u),o,_+.02,-.27,0)),l.add(T(new Ke(.06,.16,u*.6),o,_-.02,.15,0)),l.add(T(new G(.03,.03,.05,16),o,_+.2,f/2+.065,0));const d=T(new G(.045,.045,.03,20),o,_+.35,-f/2-.05,0);d.rotation.x=Math.PI/2,l.add(d),l.add(T(new Ke(.2,.02,.012),o,h/2+.1,-.03,0)),l.rotation.x=-Math.PI/2,l.position.y=u/2+.012,r(l);break}case"metre_rule":{const o=new te({color:14066524,roughness:.6}),l=new te({map:Oh(),color:16113331,roughness:.55});r(T(new Ke(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=T(Xe(.42,.3,.2,.03),Qt(1976635),0,.15),l=T(new ci(.13,40,0,Math.PI),new te({map:Fh("G","#1d4ed8")}),0,.12,.101),h=T(new Ke(.006,.12,.004),Cn(14427686),0,.18,.105);h.userData.role="needle",r(o,l,h,ki(-.12,.3,0,14427686),ki(.12,.3,0,1120295));break}case"tuning_fork":{const o=T(new Ke(.03,.4,.03),St(),-.04,.42),l=o.clone();l.position.x=.04;const h=T(new Lt(.04,.015,10,20,Math.PI),St(),0,.22);h.rotation.z=Math.PI;const f=T(new G(.015,.015,.14,12),St(),0,.12),u=T(Xe(.24,.05,.14,.01),si(),0,.025);r(o,l,h,f,u);break}case"pulley":{const o=T(new G(.15,.15,.05,40),mt(10265519),0,.9);o.rotation.x=Math.PI/2;const l=T(new Lt(.15,.015,10,40),bt(3621201),0,.9),h=T(Xe(.06,.12,.08,.01),mt(5395035),0,1.08),f=T(new G(.012,.012,1.1,12),mt(),-.3,.55),u=T(new G(.01,.01,.3,12),mt(),-.15,1.08);u.rotation.z=Math.PI/2;const p=T(Xe(.36,.03,.24,.01),Qt(2042167),-.3,.015),g=T(new G(.003,.003,.6,6),bt(16119284),.15,.6);r(o,l,h,f,u,p,g,T(new G(.05,.05,.1,20),On(),.15,.25));break}case"petri_dish":{r(T(new G(.22,.22,.05,48,1,!0),vt(),0,.025)),r(T(new G(.22,.22,.004,48),vt(),0,.002)),r(T(new G(.21,.21,.02,48),new te({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,h=.05+o%3*.04;r(T(new G(.02+o%2*.01,.02,.006,16),Cn(16317180),Math.cos(l)*h,.025,Math.sin(l)*h))}break}case"hand_lens":{const o=T(new Xt(.14,32,32),vt(15988991),0,.03);o.scale.set(1,.16,1);const l=T(new Lt(.14,.018,12,48),bt(1120295),0,.03);l.rotation.x=Math.PI/2;const h=T(Xe(.3,.035,.05,.012),bt(1120295),.29,.03);r(o,l,h);break}case"scalpel":{const o=T(Xe(.32,.02,.035,.006),St(),0,.012),l=new zi;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const h=new xe(new Mi(l,{depth:.003,bevelEnabled:!1}),St());h.rotation.x=-Math.PI/2,h.position.set(.16,.02,.02),r(o,h);break}case"forceps":{for(const o of[-1,1]){const l=T(Xe(.36,.012,.03,.004),St(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(T(Xe(.05,.016,.08,.006),St(),-.18,.012));break}case"dissecting_tray":{r(T(Xe(.9,.08,.6,.03),Qt(2042167),0,.04)),r(T(new Ke(.82,.01,.52),new te({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(T(new G(.006,.006,.06,8),St(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(T(new G(.16,.16,.5,36,1,!0),vt(),0,.25)),r(T(new G(.17,.17,.06,36),bt(1013358),0,.53)),r(T(new G(.161,.161,.18,36,1,!0,-.6,1.2),new te({color:16777215,roughness:.8,side:Kt}),0,.3)),r(Fn(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=T(new G(.22,.16,.3,32),Qt(11817737),0,.15),l=T(new G(.2,.2,.02,32),Cn(4139549),0,.29),h=T(new G(.015,.02,.5,10),Cn(1409085),0,.54);r(o,l,h);const f=new te({color:2278750,roughness:.5,side:Kt});for(let u=0;u<6;u++){const p=T(new Xt(.09,16,10),f,0,.42+u*.07);p.scale.set(1.4,.15,.6),p.rotation.y=u*2.1,p.position.x=Math.cos(u*2.1)*.08,p.position.z=-Math.sin(u*2.1)*.08,r(p)}break}case"soil_sieve":{const o=T(new G(.4,.4,.14,48,1,!0),new te({color:10576391,roughness:.6,side:Kt}),0,.07),l=Dt(256,256,(f,u,p)=>{f.clearRect(0,0,u,p),f.strokeStyle="#6b7280",f.lineWidth=2;for(let g=0;g<u;g+=8)f.beginPath(),f.moveTo(g,0),f.lineTo(g,p),f.moveTo(0,g),f.lineTo(u,g),f.stroke()}),h=T(new ci(.39,48),new te({map:l,transparent:!0,metalness:.6,side:Kt}),0,.03);h.rotation.x=-Math.PI/2,r(o,h);for(let f=0;f<14;f++){const u=f*2.4,p=f%4*.08;r(T(new tc(.025+f%3*.01),Cn(7893356),Math.cos(u)*p,.05,Math.sin(u)*p))}break}case"rain_gauge":{const o=T(new G(.2,.06,.16,36,1,!0),mt(13358561),0,1),l=T(new G(.2,.2,.08,36,1,!0),mt(13358561),0,1.12),h=T(new G(.1,.1,.9,32,1,!0),vt(),0,.47),f=T(new G(.03,.01,.1,12),mt(5395035),0,.01);r(o,l,h,f,xa(.1,.1,.75,5),Fn(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=T(new G(.22,.25,.42,36),Qt(1483594),0,.21),l=T(new G(.025,.04,.6,16),Qt(1483594),.4,.4);l.rotation.z=-.95;const h=T(new G(.07,.04,.06,20),mt(10265519),.64,.58);h.rotation.z=-.95;const f=T(new Lt(.18,.022,10,32,Math.PI),Qt(1409085),0,.42);r(o,l,h,f,Fn(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(T(Xe(.9,.12,.55,.02),bt(1120295),0,.06)),r(T(new Ke(.84,.02,.49),Cn(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const h=-.35+o*.14,f=-.15+l*.15;r(T(new G(.004,.004,.08,6),Cn(1483594),h,.16,f));const u=T(new Xt(.022,10,8),Cn(2278750),h,.2,f);u.scale.set(1.6,.3,.8),r(u)}break}case"garden_trowel":{const o=T(new Xt(.12,24,12,0,Math.PI,0,Math.PI/2),mt(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=T(new G(.012,.012,.1,10),mt(),0,.03);l.rotation.z=Math.PI/2;const h=T(new G(.03,.03,.24,16),si(),-.17,.03);h.rotation.z=Math.PI/2,r(o,l,h);break}case"hand_hoe":{const o=new zt,l=new te({color:13213802,roughness:.6}),h=new te({color:1842980,roughness:.45,metalness:.6}),f=T(new G(.03,.034,1.6,20),l,.85,0);f.rotation.z=Math.PI/2;const u=T(new G(.05,.05,.14,24),h,.05,0);u.rotation.z=Math.PI/2;const p=T(Xe(.05,.14,.05,.01),h,0,-.09),g=new zi;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const _=new Mi(g,{depth:.014,bevelEnabled:!1}),m=new xe(_,new te({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const d=T(new Ke(.016,.04,.28),new te({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(f,u,p,m,d),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new zt,l=new te({color:14729103,roughness:.55}),h=new te({color:2303531,roughness:.5,metalness:.6}),f=T(new G(.045,.036,1.3,20),l,.72,0);f.rotation.z=Math.PI/2;const u=T(Xe(.16,.11,.11,.012),h,.06,0),p=T(Xe(.03,.09,.08,.006),St(),.16,0),g=T(Xe(.05,.05,.24,.01),h,0,-.07);o.add(f,u,p,g);for(const _ of[-.09,0,.09]){const m=T(Xe(.04,.5,.025,.008),h,0,-.33,_),d=T(new Bn(.016,.07,4),new te({color:11844032,roughness:.25,metalness:1}),0,-.61,_);d.rotation.z=Math.PI,o.add(m,d)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=T(new G(.02,.02,1.2,12),mt(7041664),0,.75),l=T(new G(.025,.025,.5,12),mt(7041664),0,1.35);l.rotation.z=Math.PI/2;const h=new xe(new bi(new Bo(.3,.05,4),200,.012,6,!1),mt(10265519));h.position.y=.15,r(o,l,h,T(new G(.25,.25,.04,32),Cn(5978660),0,.02));break}case"soil_sample":{r(T(Xe(.7,.08,.45,.02),bt(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,h)=>{const f=T(new Xt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new te({color:l,roughness:1}),-.22+h*.22,.08);f.scale.y=.55,r(f)});break}case"safety_goggles":{for(const o of[-1,1]){const l=T(new Xt(.085,24,16),new te({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const h=T(new Lt(.085,.014,10,32),bt(1013358),o*.1,.08);r(l,h)}r(T(new Lt(.2,.012,8,40,Math.PI),bt(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=T(new G(.01,.01,.5,10),mt(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(T(new Lt(.03,.008,8,20),mt(7041664),.26,.015));break}case"heat_proof_mat":{r(T(Xe(.8,.03,.8,.01),new te({color:15197668,roughness:.95}),0,.015));break}default:r(T(Xe(.3,.3,.3,.03),Cn(10265519),0,.15))}s.traverse(o=>{o instanceof xe&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new zn;s.children.forEach(o=>{o instanceof Pn||a.expandByObject(o)});const c=ya(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function Bh(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new xe(new bi(new sc(t,s,n),32,.014,8,!1),new te({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const Ou=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],Av=Ou.flat(),Rv=i=>Av.find(e=>e.id===i);function Cv(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const Pv=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",Dv={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},Iv={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},Lv={class:"space-y-1"},Nv=["onClick"],Uv={class:"truncate"},Fv={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},Ov={class:"flex items-center justify-between gap-2 mb-2"},Bv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},kv={class:"flex flex-wrap gap-1.5"},zv=["onClick"],Vv={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Hv={class:"flex items-center gap-2"},Gv={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},Wv={class:"text-xs font-medium text-gray-400 ml-1"},Xv={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},qv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Yv=["max"],Zv={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},$v={class:"flex flex-wrap gap-1.5"},Kv=["onClick"],Jv={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},jv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},Qv={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},ex={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},tx={class:"flex gap-1.5"},nx=["onClick"],ix={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},sx=["value"],rx={class:"flex items-center justify-between"},ax={class:"flex gap-1.5"},ox={key:0,class:"pt-1"},lx={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},cx={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},hx={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},ux={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},fx={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},dx={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},px={class:"flex flex-wrap gap-1.5"},mx={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},gx={class:"text-center"},_x={class:"flex items-center gap-2 flex-shrink-0"},vx={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},xx={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},yx={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},Mx=["max"],Sx={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},bx={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},wx={class:"flex items-start justify-between gap-2"},Ex={class:"text-xs text-gray-700 dark:text-gray-200"},Tx={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},Ax=.9,zo=5,Ix=Xu({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean},wallShelves:{type:Boolean},benchLength:{},sideBenches:{type:Boolean}},emits:["takeChemical","putBack","pickApparatus","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=At(null),a=At(!1);let c,o,l,h;const f=new Map,u=new Qd,p=new j,g=new Si(new U(0,1,0),0),_=At(null),m=At(null),d=At(null),M=At(null);let v=!1,y=0;const w={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},b=R=>{if(I.value==="stopwatch"){if(R==="switch_on")return"Start";if(R==="switch_off")return"Stop";if(R==="measure")return"Read Time"}if(I.value==="microscope"){if(R==="switch_on")return"Light On";if(R==="switch_off")return"Light Off";if(R==="inspect")return"Observe"}return w[R]||R},C=()=>new Map(n.objectCatalog.map(R=>[R.object_type,R])),x=At([]),A=At(""),I=At(null),L=At(null),z=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],J=["battery","dry_cell","accumulator"],Q=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],B=new Map,q=new Map,W=new Map,ne=new Map,ae=At([...n.connections||[]]),fe=At(null),me=At(null),Y=At(""),ue=At(0),Fe=At(100),Te=At(null),ie=At(!1),ye=At(null),ge=At(null),Ce=At(null),Ve=new Map,Be=new Map,st=new Map,Ge=At(50),oe=At(40),pe=At("very_blurred"),_e=At(!1),Se=At(!1),Me=new Map,nt=new Map,Ye=new Map,ot=At(0),ct=At(0),k=At(!1);let Ct=[];const Mt={very_blurred:10,blurred:5,almost_focused:2,focused:0};function P(R){ge.value=R,Te.value="protractor",m.value="measure"}const S=At(null),X=At([]);function $(R){const D=C().get(R.object_type),N={...(D==null?void 0:D.default_props)||{},...R.props||{}},F=ko(R.object_type,R.key,N.display_name||(D==null?void 0:D.display_name)||R.object_type,N);if(F.position.set(R.position.x,R.position.y,R.position.z),R.rotation&&(F.rotation.y=R.rotation.y),o.add(F),f.set(R.key,F),z.includes(R.object_type)){const O=we(R.object_type,N);B.set(R.key,O),se(R.key,O/Number(N.capacity_ml??250))}J.includes(R.object_type)&&q.set(R.key,Number(N.voltage??6))}function re(R){if(n.readOnly)return;const D=X.value.findIndex(F=>F.key===R);if(D===-1)return;const N=X.value[D];$(N),X.value.splice(D,1),s("action",{objectKey:R,action:"move",value:R})}function de(R){const D=n.sceneObjects.find(F=>F.key===R);if(!D)return{};const N=C().get(D.object_type);return{...(N==null?void 0:N.default_props)||{},...D.props||{}}}function we(R,D){return D.current_volume!==void 0?Number(D.current_volume):Q.includes(R)?Number(D.capacity_ml??50):0}function se(R,D){const N=f.get(R);if(!N)return;const F=Math.max(.001,Math.min(1,D));N.traverse(O=>{if(O instanceof xe&&O.userData.role==="liquid"){const le=O.userData.maxFillHeight;O.scale.y=F,O.position.y=le*F/2}})}function he(R){const D=new Set([R]),N=[R];for(;N.length;){const F=N.shift();ae.value.forEach(O=>{O.from===F&&!D.has(O.to)&&(D.add(O.to),N.push(O.to)),O.to===F&&!D.has(O.from)&&(D.add(O.from),N.push(O.from))})}return D}function Pe(R){const D=n.sceneObjects.find(Ut=>J.includes(Ut.object_type)),N=n.sceneObjects.find(Ut=>Ut.object_type==="switch"),F=n.sceneObjects.find(Ut=>Ut.object_type==="resistor"),O=n.sceneObjects.find(Ut=>Ut.key===R);if(!O)return{value:0,reason:null};if(!D||!N||!F)return{value:0,reason:"The circuit is incomplete. Check your connections."};const le=he(D.key),be=le.has(N.key),tt=le.has(F.key),He=le.has(R),dt=W.get(N.key)==="on";if(be&&dt&&!tt)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!be||!tt)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((W.get(D.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!dt)return{value:0,reason:"Close the switch before taking the reading."};if(!He)return O.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:O.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const it=q.get(D.key)??de(D.key).voltage??6,rt=de(F.key).resistance_ohm??10,ht=it/rt;return O.object_type==="ammeter"?{value:Math.round(ht*100)/100,reason:null}:O.object_type==="voltmeter"?{value:it,reason:null}:{value:0,reason:null}}function Je(R){const D=ne.get(R);if(!D)return 25;const N=(Date.now()-D)/1e3;return Math.min(100,Math.round(25+N*3.5))}function De(R,D){const N=f.get(R),F=f.get(D);if(!N||!F)return{ok:!1};if(N.position.distanceTo(F.position)>Ax)return{ok:!1};const O=nt.has(D)?Number(de(D).natural_length_cm??15)+(nt.get(D)??0):de(D).length_cm??de(D).natural_length_cm??10,le=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((O+le)*10)/10}}function Ae(R){const D=Ve.get(R);if(!D)return"very_blurred";const N=Number(de(D).optimal_focus??50),F=Number(de(D).focus_tolerance??6),O=st.get(R)??40,le=F*(40/O),be=Be.get(R)??0,tt=Math.abs(be-N);return tt<=le?"focused":tt<=le*2?"almost_focused":tt<=le*4?"blurred":"very_blurred"}function Ze(R){_.value===R&&(Ge.value=Be.get(R)??50,oe.value=st.get(R)??40,_e.value=W.get(R)==="on",Se.value=Ve.has(R),pe.value=Ae(R))}function at(R){_.value&&(st.set(_.value,R),s("action",{objectKey:_.value,action:"select_objective",value:String(R)}),Ze(_.value))}function ut(R){_.value&&(Be.set(_.value,R),s("action",{objectKey:_.value,action:"focus_coarse",value:String(Math.round(R))}),Ze(_.value))}function V(R){if(!_.value)return;const D=_.value,N=Math.max(0,Math.min(100,(Be.get(D)??50)+R));Be.set(D,N),s("action",{objectKey:D,action:"focus_fine",value:String(N)}),Ze(D)}function Ee(R){const N=[...Me.get(R)??new Set].reduce((it,rt)=>it+Number(de(rt).mass_g??0),0),F=Number(de(R).spring_constant_n_per_m??40),le=N/1e3*9.8/F*100,be=Number(de(R).max_safe_extension_cm??12),tt=Ye.get(R)??0,He=le>be;He&&tt===0&&Ye.set(R,(le-be)*.3);const dt=le+(Ye.get(R)??0);return nt.set(R,Math.round(dt*100)/100),ce(R,dt),_.value===R&&(ct.value=N,ot.value=Math.round(dt*100)/100,k.value=He),{totalMassG:N,exceeded:He}}function ce(R,D){const N=f.get(R);N&&N.traverse(F=>{if(F instanceof xe&&F.userData.role==="spring_body"){const O=F.userData.naturalLengthUnits,le=F.userData.maxLengthUnits,be=Math.min(le,O+Math.max(0,D)*.05);F.scale.y=be/le,F.position.y=.85-le*F.scale.y/2}if(F.userData.role==="spring_hanger"){const O=[...N.children].find(le=>le.userData.role==="spring_body");O&&(F.position.y=.85-O.userData.maxLengthUnits*O.scale.y)}})}function Re(R){return new U(Math.sin(R),0,Math.cos(R))}function Ne(R,D){return R.clone().sub(D.clone().multiplyScalar(2*R.dot(D)))}function ve(R,D,N,F){let O=D.clone(),le=-O.dot(R);le<0&&(le=-le,O=O.clone().negate());const be=N/F,tt=be*be*(1-le*le);if(tt>1)return null;const He=Math.sqrt(1-tt);return R.clone().multiplyScalar(be).add(O.clone().multiplyScalar(be*le-He))}function $e(R,D){const N=f.get(R),F=f.get(D);if(!N||!F)return null;const O=N.position.clone(),le=Re(N.rotation.y),be=Re(F.rotation.y),tt=le.dot(be);if(Math.abs(tt)<.001)return null;const He=F.position.clone().sub(O).dot(be)/tt;if(He<=.05)return null;const dt=O.clone().add(le.clone().multiplyScalar(He));return dt.distanceTo(F.position)>.35?null:{point:dt,normal:be,incidentDir:le}}function We(){Ct.forEach(R=>{o.remove(R),R instanceof xe&&(R.geometry.dispose(),R.material.dispose())}),Ct=[]}function Vt(R,D,N){const F=R.clone().add(D).multiplyScalar(.5),O=Math.max(.01,R.distanceTo(D)),le=new xe(new G(.006,.006,O,8),new te({color:N,emissive:N,emissiveIntensity:.4,roughness:.4}));le.position.copy(F);const be=D.clone().sub(R).normalize();return le.quaternion.copy(new Pi().setFromUnitVectors(new U(0,1,0),be)),le}function It(){We();const R=n.sceneObjects.find(He=>He.object_type==="ray_box"),D=n.sceneObjects.find(He=>He.object_type==="mirror"),N=n.sceneObjects.find(He=>He.object_type==="glass_block"),F=D||N;if(!R||!F||W.get(R.key)!=="on")return;const O=$e(R.key,F.key);if(!O)return;const le=f.get(R.key),be=Vt(le.position,O.point,16498468),tt=Vt(O.point.clone().sub(O.normal.clone().multiplyScalar(.01)),O.point.clone().add(O.normal.clone().multiplyScalar(.4)),9741240);if(o.add(be,tt),Ct.push(be,tt),D){const He=Ne(O.incidentDir,O.normal),dt=Vt(O.point,O.point.clone().add(He.multiplyScalar(1.2)),16498468);o.add(dt),Ct.push(dt)}else if(N){const He=Number(de(N.key).refractive_index??1.5),dt=ve(O.incidentDir,O.normal,1,He);if(dt){const it=O.point.clone().add(dt.clone().multiplyScalar(.4)),rt=Vt(O.point,it,6333946),ht=Vt(it,it.clone().add(O.incidentDir.clone().multiplyScalar(1)),16498468);o.add(rt,ht),Ct.push(rt,ht)}}}function Ln(R,D,N){const F=n.sceneObjects.find(it=>it.object_type==="ray_box");if(!F)return{ok:!1};const O=$e(F.key,D);if(!O)return{ok:!1};const le=f.get(R);if(!le||le.position.distanceTo(O.point)>.4)return{ok:!1};let be;if(N==="incidence")be=O.incidentDir.clone().negate();else{const it=n.sceneObjects.find(rt=>rt.key===D);if((it==null?void 0:it.object_type)==="glass_block"){const rt=Number(de(D).refractive_index??1.5),ht=ve(O.incidentDir,O.normal,1,rt);if(!ht)return{ok:!1};be=ht}else be=Ne(O.incidentDir,O.normal)}const tt=Math.abs(be.normalize().dot(O.normal)),He=Math.acos(Math.min(1,Math.max(-1,tt)))*180/Math.PI,dt=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((He+dt)*10)/10}}const dn=new Map,us=new Map;function Nr(R){const D=f.get(R);if(!D)return;const N=dn.get(R),F=N?Number(de(N).mass_g??0):0;D.traverse(O=>{var le;if(O instanceof Pn&&O.userData.role==="balance_display"){const be=O.material;(le=be.map)==null||le.dispose(),be.map=ka(`${F.toFixed(1)} g`),be.needsUpdate=!0}})}const jn=new Map,Zi=new Map,js=new Map,Qs=At("00:00.0");function er(R){const D=Math.max(0,R)/1e3,N=Math.floor(D/60).toString().padStart(2,"0"),F=(D%60).toFixed(1).padStart(4,"0");return`${N}:${F}`}function Hn(R){const D=js.get(R)??0;return jn.get(R)?D+(Date.now()-(Zi.get(R)??Date.now())):D}function $i(R){const D=f.get(R),N=Hn(R);_.value===R&&(Qs.value=er(N)),D&&D.traverse(F=>{var O;if(F instanceof Pn&&F.userData.role==="stopwatch_display"){const le=F.material;(O=le.map)==null||O.dispose(),le.map=ka(er(N)),le.needsUpdate=!0}})}function Ur(R){jn.set(R,!1),js.set(R,0),Zi.delete(R),$i(R)}function tr(R){f.forEach((D,N)=>{D.traverse(F=>{if(!(F instanceof xe)||F.userData.role==="flame"||F.userData.role==="led")return;(Array.isArray(F.material)?F.material:[F.material]).forEach(le=>{le instanceof te&&(le.emissive.setHex(N===R?2282478:0),le.emissiveIntensity=N===R?.3:0)})})})}function fs(R){var F;_.value=R,M.value=null,d.value=null;const D=n.sceneObjects.find(O=>O.key===R),N=D?C().get(D.object_type):null;x.value=(N==null?void 0:N.supported_actions)??[],A.value=((F=D==null?void 0:D.props)==null?void 0:F.display_name)??(N==null?void 0:N.display_name)??R,I.value=(D==null?void 0:D.object_type)??null,L.value=(D==null?void 0:D.object_type)==="battery"?q.get(R)??de(R).voltage??6:null,(D==null?void 0:D.object_type)==="microscope"&&Ze(R),(D==null?void 0:D.object_type)==="spring"&&Ee(R),tr(R)}function Ki(){_.value=null,M.value=null,fe.value=null,I.value=null,tr(null)}function ds(R){if(!_.value)return;L.value=R,q.set(_.value,R);const D=f.get(_.value);D&&D.traverse(N=>{var F;if(N instanceof Pn&&N.userData.role==="voltage"){const O=N.material;(F=O.map)==null||F.dispose(),O.map=Fu(R),O.needsUpdate=!0}})}function Fr(R){const D=n.sceneObjects.find(F=>F.key===R);if(!D)return;const N=D.object_type;if(ie.value=!1,ye.value=R,z.includes(N)){fe.value="readonly",Y.value="ml",me.value=Math.round(B.get(R)??0),M.value=R;return}if(N==="ammeter"||N==="voltmeter"){const F=Pe(R);F.reason&&(Ce.value=F.reason,setTimeout(()=>{Ce.value=null},4e3)),fe.value="readonly",Y.value=N==="ammeter"?"A":"V",me.value=F.value,M.value=R,ie.value=!!F.reason&&F.reason.includes("Short circuit");return}if(N==="balance"){fe.value="readonly",Y.value="g";const F=dn.get(R);me.value=F?Number(de(F).mass_g??0):0,M.value=R;return}if(N==="stopwatch"){fe.value="readonly",Y.value="s",me.value=Math.round(Hn(R)/100)/10,M.value=R;return}if(N==="spring"){fe.value="readonly",Y.value="cm";const F=Number(de(R).natural_length_cm??15);me.value=Math.round((F+(nt.get(R)??0))*10)/10,M.value=R,ye.value=R;return}if(N==="protractor"){ge.value="incidence",Te.value="protractor",m.value="measure";return}if(N==="ruler"||N==="metre_rule"||N==="thermometer"){Te.value=N==="thermometer"?"thermometer":"ruler",m.value="measure";return}fe.value="slider",Y.value="ml",Fe.value=Number(de(R).capacity_ml??100),ue.value=Math.round(Fe.value/2),M.value=R}function Or(R){var D;if(_.value&&!n.readOnly&&!(R==="focus_coarse"||R==="focus_fine"||R==="select_objective")){if(R==="inspect"){const N=n.sceneObjects.find(tt=>tt.key===_.value),F=N?C().get(N.object_type):null;let O=(F==null?void 0:F.description)||"No further detail available.";const le=(D=N==null?void 0:N.props)!=null&&D.chemical_id?Rv(N.props.chemical_id):null;if(le&&N){const tt=le.hazard?` Hazard: ${le.hazard} - handle with care and wear goggles.`:"",He=le.state==="liquid"?` About ${Math.round(B.get(N.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";O=`${le.name}${le.formula?` (${le.formula})`:""}.${He}${tt}`}let be=null;if(I.value==="microscope"){const tt=_.value,He=Ve.get(tt),dt=st.get(tt)??40;if(!He)O="Place a specimen slide on the stage first.";else if(W.get(tt)!=="on")O="Switch on the illumination to see anything through the eyepiece.";else{const it=Ae(tt),rt=de(He).expected_structures||"the specimen";it==="focused"?O=`At ×${dt}, clearly focused - you can see ${rt}.`:it==="almost_focused"?O=`At ×${dt}, almost in focus - fine-tune the focus a little more.`:it==="blurred"?O=`At ×${dt}, blurred - adjust the coarse and fine focus.`:O=`At ×${dt}, very blurred - use the focus knobs before observing.`,be=it}}d.value=O,s("action",{objectKey:_.value,action:R,value:be});return}if(R==="zoom"){E(_.value),s("action",{objectKey:_.value,action:R,value:null});return}if(R==="switch_on"||R==="switch_off"){W.set(_.value,R==="switch_on"?"on":"off"),I.value==="stopwatch"&&(R==="switch_on"&&!jn.get(_.value)?(jn.set(_.value,!0),Zi.set(_.value,Date.now())):R==="switch_off"&&jn.get(_.value)&&(js.set(_.value,Hn(_.value)),jn.set(_.value,!1)),$i(_.value)),I.value==="microscope"&&Ze(_.value),I.value==="ray_box"&&It(),s("action",{objectKey:_.value,action:R,value:null});return}if(R==="measure"){Fr(_.value);return}if(R==="connect"||R==="pour"||R==="heat"||R==="move"||R==="rotate"){m.value=R,h.enabled=R!=="move"&&R!=="rotate";return}}}const Gn=At("");_r(m,R=>{R==="connect"?Gn.value="Click the object to connect to.":R==="pour"?Gn.value="Click the container to pour into.":R==="heat"?Gn.value="Click the object to place over the flame.":R==="move"?Gn.value="Drag the object to reposition it, then click Done.":R==="rotate"?Gn.value="Drag left/right to rotate, then click Done.":R==="measure"&&Te.value==="ruler"?Gn.value="Click the object to measure - place the ruler close to it first.":R==="measure"&&Te.value==="thermometer"?Gn.value="Click the substance to take a temperature reading.":R==="measure"&&Te.value==="protractor"&&(Gn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function Br(){if(!M.value)return;const R=fe.value==="slider"?String(Math.round(ue.value)):me.value!==null?String(me.value):null;s("action",{objectKey:M.value,action:"measure",value:R,unit:Y.value,label:A.value,safetyIssue:ie.value,targetObjectKey:ye.value}),M.value=null,fe.value=null,me.value=null,ie.value=!1,ge.value=null}function qa(){if(S.value){Qe();return}m.value=null,Te.value=null,ge.value=null,h.enabled=!0}function Ya(){var R,D,N;if(!(!_.value||!m.value)){if(m.value==="move"){const F=f.get(_.value);let O=null;F&&f.forEach((rt,ht)=>{ht!==_.value&&rt.position.distanceTo(F.position)<.6&&(O=ht)});const le=_.value;dn.forEach((rt,ht)=>{rt===le&&ht!==O&&(dn.delete(ht),Nr(ht))});const be=O?(R=n.sceneObjects.find(rt=>rt.key===O))==null?void 0:R.object_type:null;be==="balance"&&O&&(dn.set(O,le),Nr(O)),us.forEach((rt,ht)=>{if(ht===le&&rt!==O){const Ut=Number(de(ht).volume_ml??0),ps=Math.max(0,(B.get(rt)??0)-Ut);B.set(rt,ps),se(rt,ps/Number(de(rt).capacity_ml??250)),us.delete(ht)}});const tt=Number(de(le).volume_ml??0);if(be&&z.includes(be)&&O&&tt>0&&!us.has(le)){us.set(le,O);const rt=(B.get(O)??0)+tt;B.set(O,rt),se(O,rt/Number(de(O).capacity_ml??250))}const He=(D=n.sceneObjects.find(rt=>rt.key===le))==null?void 0:D.object_type;if(Ve.forEach((rt,ht)=>{rt===le&&ht!==O&&Ve.delete(ht)}),be==="microscope"&&O&&He==="biological_model"){Ve.set(O,le);const rt=Number(de(le).optimal_focus??50),ht=Number(de(le).focus_tolerance??6),Ut=Math.random()<.5?-1:1,ps=ht*(3+Math.random()*3)*Ut;Be.set(O,Math.max(0,Math.min(100,rt+ps))),st.set(O,40),Ze(O)}let dt,it=!1;if(He==="mass_piece"){Me.forEach((ht,Ut)=>{ht.has(le)&&Ut!==O&&ht.delete(le)}),be==="spring"&&O&&(Me.has(O)||Me.set(O,new Set),Me.get(O).add(le));const rt=new Set(O&&be==="spring"?[O]:[]);Me.forEach((ht,Ut)=>rt.add(Ut)),rt.forEach(ht=>{const Ut=Ee(ht);O===ht&&(dt=Ut.totalMassG,it=Ut.exceeded)}),it&&(Ce.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Ce.value=null},4500))}["ray_box","mirror","glass_block"].includes(He||"")&&It(),s("action",{objectKey:_.value,action:"move",value:O,springLoadG:dt,safetyIssue:it})}else if(m.value==="rotate"){const F=f.get(_.value),O=F?Math.round(F.rotation.y*180/Math.PI):0,le=(N=n.sceneObjects.find(be=>be.key===_.value))==null?void 0:N.object_type;["ray_box","mirror","glass_block"].includes(le||"")&&It(),s("action",{objectKey:_.value,action:"rotate",value:String(O)})}m.value=null,h.enabled=!0}}function E(R){const D=f.get(R);if(!D)return;const N=D.position.clone().add(new U(0,.3,0)),F=l.position.clone().sub(h.target).normalize(),O=N.clone().add(F.multiplyScalar(1.4)),le=l.position.clone(),be=h.target.clone();let tt=0;const He=()=>{tt+=.05,l.position.lerpVectors(le,O,Math.min(tt,1)),h.target.lerpVectors(be,N,Math.min(tt,1)),h.update(),tt<1&&requestAnimationFrame(He)};He()}function H(R){const D=c.domElement.getBoundingClientRect();p.x=(R.clientX-D.left)/D.width*2-1,p.y=-((R.clientY-D.top)/D.height)*2+1}function ee(){u.setFromCamera(p,l);const R=[];f.forEach(F=>R.push(F));const D=u.intersectObjects(R,!0);if(D.length===0)return null;let N=D[0].object;for(;N&&!N.userData.objectKey;)N=N.parent;return N?N.userData.objectKey:null}let Z=null;function K(R){if(H(R),Z={x:R.clientX,y:R.clientY},m.value==="move"&&_.value){v=!0;return}if(m.value==="rotate"&&_.value){v=!0,y=R.clientX;return}}function Ie(R){if(!(!v||!_.value)){if(H(R),m.value==="move"){u.setFromCamera(p,l);const D=new U;u.ray.intersectPlane(g,D);const N=f.get(_.value);N&&D&&(N.position.x=D.x,N.position.z=D.z)}else if(m.value==="rotate"){const D=R.clientX-y,N=f.get(_.value);N&&(N.rotation.y=D*.02)}}}function ke(R){const D=Z&&(Math.abs(R.clientX-Z.x)>4||Math.abs(R.clientY-Z.y)>4);if(v=!1,m.value==="move"||m.value==="rotate"||D||(H(R),Qn()))return;const N=ee();if(!N){Ki();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(N===_.value)return;const F=_.value,O=m.value;if(O==="measure"){if(Te.value==="ruler"){const le=De(F,N);if(!le.ok){Ce.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Ce.value=null},3500);return}fe.value="readonly",Y.value="cm",me.value=le.value}else if(Te.value==="thermometer")fe.value="readonly",Y.value="°C",me.value=Je(N);else if(Te.value==="protractor"){const le=ge.value??"incidence",be=Ln(F,N,le);if(!be.ok){Ce.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Ce.value=null},3500);return}fe.value="readonly",Y.value="°",me.value=be.value}ye.value=N,M.value=F,m.value=null,Te.value=null,h.enabled=!0;return}if(O==="connect"){const le=f.get(F),be=f.get(N);le&&be&&o.add(Bh(le.position,be.position)),ae.value.push({from:F,to:N}),s("action",{objectKey:F,action:O,value:N}),m.value=null,h.enabled=!0;return}if(O==="heat"){ne.set(N,Date.now()),s("action",{objectKey:F,action:O,value:N}),m.value=null,h.enabled=!0;return}if(O==="pour"){Le(F,N);return}}fs(N)}function Le(R,D){var dt,it,rt,ht;const N=n.sceneObjects.find(Ut=>Ut.key===R),F=n.sceneObjects.find(Ut=>Ut.key===D);if(!N||!F)return;const O=Number(de(D).capacity_ml??250),le=B.get(D)??0,be=Math.max(0,O-le),tt=z.includes(N.object_type),He=tt?B.get(R)??0:be;S.value={from:R,to:D,amount:0,max:Math.max(1,Math.round(Math.min(be,He))),fromLabel:((dt=N.props)==null?void 0:dt.display_name)??((it=C().get(N.object_type))==null?void 0:it.display_name)??N.object_type,toLabel:((rt=F.props)==null?void 0:rt.display_name)??((ht=C().get(F.object_type))==null?void 0:ht.display_name)??F.object_type,fromTracked:tt}}function qe(){if(!S.value)return;const{from:R,to:D,amount:N,fromTracked:F}=S.value,O=Number(de(D).capacity_ml??250);if(se(D,((B.get(D)??0)+N)/O),F){const le=Number(de(R).capacity_ml??250);se(R,Math.max(0,(B.get(R)??0)-N)/le)}}_r(()=>{var R;return(R=S.value)==null?void 0:R.amount},qe);function je(){if(!S.value)return;const{from:R,to:D,amount:N,fromTracked:F}=S.value;ft(R,D,N),B.set(D,Math.round((B.get(D)??0)+N)),F&&B.set(R,Math.max(0,Math.round((B.get(R)??0)-N))),s("action",{objectKey:D,action:"pour",value:String(Math.round(N))}),S.value=null,m.value=null,h.enabled=!0}function ft(R,D,N){if(N<=0)return;const F=_t(R),O=_t(D);if(!F||!O)return;const le=B.get(D)??0;O.color.lerp(F.color,le<=0?1:N/(le+N))}function _t(R){var N;let D=null;return(N=f.get(R))==null||N.traverse(F=>{!D&&F instanceof xe&&F.userData.role==="liquid"&&(D=F.material)}),D}function Qe(){if(S.value){const{from:R,to:D,fromTracked:N}=S.value,F=Number(de(D).capacity_ml??250);if(se(D,(B.get(D)??0)/F),N){const O=Number(de(R).capacity_ml??250);se(R,(B.get(R)??0)/O)}}S.value=null,m.value=null,h.enabled=!0}let Oe=null;const qt=At(null);function Yt(){const R=r.value;if(!R)return;try{Oe=dv(R,{unitScale:zo,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14,cupboard:!!n.cupboard,wallCabinets:!!n.wallShelves,benchLength:n.benchLength,sideBenches:!!n.sideBenches})}catch(N){console.error("Virtual Lab: failed to create a WebGL context",N),a.value=!0;return}c=Oe.renderer,o=Oe.scene,l=Oe.camera,h=Oe.controls,n.sceneObjects.forEach(N=>{if(N.in_tray){X.value.push(N);return}$(N)}),(n.connections||[]).forEach(N=>{const F=f.get(N.from),O=f.get(N.to);F&&O&&o.add(Bh(F.position,O.position))}),It(),Tt(),mi(),n.fixedView?Vu():dc(),c.domElement.addEventListener("pointerdown",K),c.domElement.addEventListener("pointermove",Ie),c.domElement.addEventListener("pointermove",pc),c.domElement.addEventListener("pointerup",ke);let D=0;Oe.onFrame(N=>{D+=N,D>.15&&(D=0,jn.forEach((F,O)=>{F&&$i(O)})),f.forEach((F,O)=>{const le=O===_.value||O===qt.value;F.children.forEach(be=>{be.userData.role==="label"&&(be.visible=le)})}),Pt.forEach((F,O)=>{F.children.forEach(le=>{le.userData.role==="label"&&(le.visible=O===pn)})}),Tn.forEach((F,O)=>{F.children.forEach(le=>{le.userData.role==="label"&&(le.visible=O===Zt)})})})}_r(()=>n.sceneObjects.map(R=>`${R.key}@${R.position.x},${R.position.z}`).join("|"),()=>{if(!Oe)return;const R=new Map(n.sceneObjects.filter(N=>!N.in_tray).map(N=>[N.key,N]));let D=!1;f.forEach((N,F)=>{R.has(F)||(o.remove(N),N.traverse(O=>{var le;(O instanceof xe||O instanceof Pn)&&((le=O.geometry)==null||le.dispose(),(Array.isArray(O.material)?O.material:[O.material]).forEach(tt=>{var He;(He=tt.map)==null||He.dispose(),tt.dispose()}))}),f.delete(F),_.value===F&&Ki())}),R.forEach((N,F)=>{const O=f.get(F);O?O.position.set(N.position.x,N.position.y,N.position.z):($(N),D=!0)}),D&&!n.fixedView&&dc(),mn()});const Pt=new Map,sn=[];function ze(R,D){const N=document.createElement("canvas");N.width=512,N.height=144;const F=N.getContext("2d");F.fillStyle="#fffdf4",F.fillRect(0,0,512,144),F.fillStyle="#1e3a8a",F.fillRect(0,0,512,10),F.fillStyle="#111827",F.textAlign="center",F.textBaseline="middle";let O=46;for(F.font=`bold ${O}px sans-serif`;F.measureText(R).width>490&&O>26;)O-=2,F.font=`bold ${O}px sans-serif`;if(F.measureText(R).width>490){const be=R.split(" "),tt=Math.ceil(be.length/2);F.fillText(be.slice(0,tt).join(" "),256,D?42:52),F.fillText(be.slice(tt).join(" "),256,D?80:96)}else F.fillText(R,256,D?54:76);D&&(F.font="bold 38px serif",F.fillStyle="#1e3a8a",F.fillText(D,256,118));const le=new Rr(N);return le.colorSpace=hn,le.anisotropy=8,le}let pn=null;function Tt(){const R=Oe==null?void 0:Oe.cupboard;R&&(Ou.forEach((D,N)=>{const F=R.bays[N<2?0:1],O=F.levels[N%2],le=(F.maxX-F.minX)/D.length;D.forEach((be,tt)=>{const He=ko(Pv(be),`cupboard:${be.id}`,be.name,Cv(be));He.position.set(F.minX+le*(tt+.5),O,F.frontZ-.6),He.userData.chemicalId=be.id,He.traverse(it=>{it instanceof xe&&(it.castShadow=!1,it.receiveShadow=!1)}),o.add(He),Pt.set(be.id,He);const dt=new xe(new fn(le*.92,.26),new Wi({map:ze(be.name,be.formula),toneMapped:!1}));dt.position.set(He.position.x,O+.14,F.frontZ-.08),dt.rotation.x=-.35,dt.userData.chemicalId=be.id,o.add(dt),sn.push(dt)})}),mn())}function mn(){const R=new Set(n.sceneObjects.map(N=>{var F;return(F=N.props)==null?void 0:F.chemical_id}).filter(Boolean));Pt.forEach((N,F)=>{N.visible=!R.has(F)});const D=new Set(n.sceneObjects.filter(N=>{var F;return!((F=N.props)!=null&&F.chemical_id)}).map(N=>N.object_type));Tn.forEach((N,F)=>{N.visible=!D.has(F)})}function En(){var dt;const R=Oe==null?void 0:Oe.cupboard,D=Oe==null?void 0:Oe.wallCabinets,N=Oe==null?void 0:Oe.furniture,F=Oe==null?void 0:Oe.taps;if(!R&&!D&&!(N!=null&&N.doors.length)&&!F)return null;u.setFromCamera(p,l);const O=[];R&&O.push(...R.doors,...R.blockers),D&&O.push(...D.doors,...D.blockers),N&&O.push(...N.doors,...N.blockers),F&&O.push(...F.taps),f.forEach(it=>O.push(it)),Pt.forEach(it=>{it.visible&&O.push(it)}),sn.forEach(it=>O.push(it)),Tn.forEach(it=>{it.visible&&O.push(it)});const le=u.intersectObjects(O,!0)[0];if(!le)return null;const be=(dt=Oe.taps)==null?void 0:dt.tapOf(le.object);if(be)return{kind:"tap",tap:be};const tt=Oe.doorOf(le.object);if(tt)return{kind:"door",door:tt};let He=le.object;for(;He&&!He.userData.chemicalId&&!He.userData.shelfType;)He=He.parent;return He?He.userData.shelfType?{kind:"apparatus",type:He.userData.shelfType}:{kind:"chemical",id:He.userData.chemicalId}:null}function Qn(){const R=En();if(!R)return!1;if(R.kind==="apparatus")return s("pickApparatus",R.type),!0;if(R.kind==="tap")return Oe.taps.toggle(R.tap),Bu(Oe.taps.anyOn()),!0;if(R.kind==="chemical"){const D=n.sceneObjects.find(N=>{var F;return((F=N.props)==null?void 0:F.chemical_id)===R.id});return D?s("putBack",D.key):s("takeChemical",R.id),!0}return Oe.toggleDoor(R.door),!0}const Tn=new Map,Nt=[];let Zt=null;const ei=[[{key:"physics",label:"Physics"},{key:"general",label:"General"}],[{key:"chemistry",label:"Chemistry"},{key:"biology",label:"Biology"},{key:"agriculture",label:"Agriculture"}]],Ht=["physics","chemistry","biology","agriculture"];function Wn(R){o.remove(R),R.traverse(D=>{var N;(D instanceof xe||D instanceof Pn)&&((N=D.geometry)==null||N.dispose(),(Array.isArray(D.material)?D.material:[D.material]).forEach(O=>{var le;(le=O.map)==null||le.dispose(),O.dispose()}))})}function mi(){const R=Oe==null?void 0:Oe.wallCabinets;if(!R)return;Tn.forEach(Wn),Tn.clear(),Nt.splice(0).forEach(Wn);const D=n.objectCatalog.filter(F=>F.id>0&&F.is_active!==!1),N=F=>Ht.includes(F.category)?F.category:"general";R.cabinets.forEach((F,O)=>{const le=ei[O].map(it=>({...it,items:D.filter(rt=>N(rt)===it.key).sort((rt,ht)=>rt.display_name.localeCompare(ht.display_name))})).filter(it=>it.items.length>0);let be=8;const tt=()=>le.flatMap(it=>{const rt=[];for(let ht=0;ht<it.items.length;ht+=be)rt.push({label:it.label,items:it.items.slice(ht,ht+be)});return rt});let He=tt();for(;He.length>F.rows.length;)be++,He=tt();const dt=(F.maxX-F.minX)/be;He.forEach((it,rt)=>{const ht=F.rows[rt];it.items.forEach((ms,Wu)=>{const Ii=ko(ms.object_type,`shelf:${ms.object_type}`,ms.display_name,ms.default_props||{}),nr=new zn;Ii.children.forEach(ti=>{ti instanceof Pn||nr.expandByObject(ti)});const Za=nr.getSize(new U),mc=nr.getCenter(new U),ji=Math.min(1,dt*.84/Math.max(Za.x,.01),F.rowHeight*.8/Math.max(Za.y,.01),F.depth*.9/Math.max(Za.z,.01));Ii.scale.setScalar(ji),Ii.position.set(F.minX+dt*(Wu+.5)-mc.x*ji,ht-nr.min.y*ji,F.z-mc.z*ji),Ii.children.forEach(ti=>{ti.userData.role==="label"&&(ti.scale.set(.72/ji,.158/ji,1),ti.position.y=nr.max.y+.2/ji,ti.visible=!1)}),Ii.traverse(ti=>{ti instanceof xe&&(ti.castShadow=!1)}),Ii.userData.shelfType=ms.object_type,o.add(Ii),Tn.set(ms.object_type,Ii)}),mn();const Ut=new xe(new fn(F.maxX-F.minX,.17),new Wi({map:kr(it.label),toneMapped:!1})),ps=rt===F.rows.length-1?F.frontZ+.03*zo+.005:F.frontZ+.005;Ut.position.set((F.minX+F.maxX)/2,ht-.085,ps),o.add(Ut),Nt.push(Ut)})})}function kr(R){const D=document.createElement("canvas");D.width=1024,D.height=64;const N=D.getContext("2d"),F=N.createLinearGradient(0,0,0,64);F.addColorStop(0,"#f6d98b"),F.addColorStop(1,"#c9962f"),N.fillStyle=F,N.fillRect(0,0,1024,64),N.fillStyle="#3b2606",N.font="bold 50px sans-serif",N.textBaseline="middle",N.fillText(R.toUpperCase(),24,35);const O=new Rr(D);return O.colorSpace=hn,O.anisotropy=8,O}_r(()=>n.objectCatalog.map(R=>R.object_type).join(","),()=>{Oe&&mi()});let Ji=null;function Bu(R){try{if(!Ji){if(R===0)return;const F=window.AudioContext||window.webkitAudioContext,O=new F,le=O.createBuffer(1,O.sampleRate*2,O.sampleRate),be=le.getChannelData(0);for(let Ut=0;Ut<be.length;Ut++)be[Ut]=Math.random()*2-1;const tt=O.createBufferSource();tt.buffer=le,tt.loop=!0;const He=O.createBiquadFilter();He.type="bandpass",He.frequency.value=1100,He.Q.value=.6;const dt=O.createBiquadFilter();dt.type="lowpass",dt.frequency.value=3500;const it=O.createGain();it.gain.value=0;const rt=O.createOscillator();rt.frequency.value=7;const ht=O.createGain();ht.gain.value=250,rt.connect(ht).connect(He.frequency),tt.connect(He).connect(dt).connect(it).connect(O.destination),tt.start(),rt.start(),Ji={ctx:O,gain:it}}const{ctx:D,gain:N}=Ji;D.state==="suspended"&&D.resume(),N.gain.setTargetAtTime(R===0?0:Math.min(.5,.3+.1*R),D.currentTime,.15)}catch{}}Vo(()=>{Ji==null||Ji.ctx.close().catch(()=>{}),Ji=null});const ku=$u(()=>{var R,D;return!!((D=(R=n.sceneObjects.find(N=>N.key===_.value))==null?void 0:R.props)!=null&&D.chemical_id)});function zu(){const R=_.value;R&&(Ki(),s("putBack",R))}function Vu(){if(!Oe)return;const R=zo,D=Oe.benchLength/2,N=Oe.wallCabinets?new zn(new U(-(D+.25)*R,-.9*R,-.6*R),new U((D+.25)*R,1.82*R,.375*R)):new zn(new U(-D*R,-.9*R,-.375*R),new U(D*R,.1*R,.375*R));Oe.fitBox(N,Oe.wallCabinets?.94:.72,{dir:new U(.4,Oe.wallCabinets?3.4:4.2,6.4)})}function dc(){if(!Oe||f.size===0)return;o.updateMatrixWorld(!0);const R=new zn;f.forEach(D=>D.children.forEach(N=>{N.userData.role!=="label"&&R.expandByObject(N)})),Oe.frameBox(R)}function pc(R){if(v)return;H(R),qt.value=ee();const D=qt.value?null:En();pn=(D==null?void 0:D.kind)==="chemical"?D.id:null,Zt=(D==null?void 0:D.kind)==="apparatus"?D.type:null,c.domElement.style.cursor=qt.value||D?"pointer":"grab"}function Hu(R,D){(D.state==="on"||D.state==="off")&&W.set(R,D.state);const N=f.get(R);N&&N.traverse(F=>{if(F.userData.role==="lever"&&"state"in D){const O=D.state==="on"||D.state==="closed";F.rotation.z=O?Math.PI/2-.35:Math.PI/2-.9,F.position.x=O?0:-.06}if(F.userData.role==="led"&&"state"in D&&F instanceof xe){const O=F.material;O.emissiveIntensity=D.state==="on"?1.2:0}if(F.userData.role==="flame"&&"flame"in D&&F instanceof xe){const O=F.material;O.emissiveIntensity=D.flame==="on"?1:0,O.opacity=D.flame==="on"?.9:0}})}e({setObjectState:Hu});function Gu(){a.value=!1,Ku(Yt)}return kh(Yt),Vo(()=>{c==null||c.domElement.removeEventListener("pointerdown",K),c==null||c.domElement.removeEventListener("pointermove",Ie),c==null||c.domElement.removeEventListener("pointermove",pc),c==null||c.domElement.removeEventListener("pointerup",ke),Oe==null||Oe.dispose(),Oe=null}),(R,D)=>(Bt(),Ot("div",Dv,[a.value?(Bt(),Ot("div",Iv,[gc(Ju,{name:"beaker",class:"w-8 h-8"}),D[9]||(D[9]=et("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),et("button",{onClick:Gu,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(Bt(),Ot("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),X.value.length>0?(Bt(),Ot("div",{key:2,class:ir(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||S.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[D[10]||(D[10]=et("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),et("div",Lv,[(Bt(!0),Ot(gs,null,zr(X.value,N=>{var F,O;return Bt(),Ot("button",{key:N.key,onClick:le=>re(N.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[et("span",null,$t(((F=C().get(N.object_type))==null?void 0:F.icon)||"🔬"),1),et("span",Uv,$t(((O=C().get(N.object_type))==null?void 0:O.display_name)||N.object_type),1)],8,Nv)}),128))])],2)):ln("",!0),_.value&&!m.value?(Bt(),Ot("div",Fv,[et("div",Ov,[et("p",Bv,$t(A.value),1),et("button",{onClick:Ki,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),et("div",kv,[(Bt(!0),Ot(gs,null,zr(x.value,N=>(Bt(),Ot("button",{key:N,onClick:F=>Or(N),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},$t(b(N)),9,zv))),128)),i.cupboard?(Bt(),Ot("button",{key:0,onClick:zu,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},$t(ku.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):ln("",!0)]),M.value&&fe.value==="readonly"?(Bt(),Ot("div",Vv,[D[11]||(D[11]=et("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),et("div",Hv,[et("span",Gv,[Vr($t(me.value),1),et("span",Wv,$t(Y.value),1)]),et("button",{onClick:Br,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):ln("",!0),M.value&&fe.value==="slider"?(Bt(),Ot("div",Xv,[et("p",qv,"Reading: "+$t(Math.round(ue.value))+$t(Y.value),1),_c(et("input",{"onUpdate:modelValue":D[0]||(D[0]=N=>ue.value=N),type:"range",min:"0",max:Fe.value,step:"1",class:"w-full accent-emerald-600"},null,8,Yv),[[vc,ue.value,void 0,{number:!0}]]),et("button",{onClick:Br,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):ln("",!0),I.value==="battery"?(Bt(),Ot("div",Zv,[D[12]||(D[12]=et("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),et("div",$v,[(Bt(),Ot(gs,null,zr([1.5,3,6,9,12],N=>et("button",{key:N,onClick:F=>ds(N),class:ir(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",L.value===N?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},$t(N)+"V",11,Kv)),64))])])):ln("",!0),I.value==="stopwatch"?(Bt(),Ot("div",Jv,[et("p",jv,"Elapsed: "+$t(Qs.value),1),et("button",{onClick:D[1]||(D[1]=N=>Ur(_.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):ln("",!0),I.value==="microscope"?(Bt(),Ot("div",Qv,[Se.value?(Bt(),Ot(gs,{key:1},[et("div",null,[D[13]||(D[13]=et("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),et("div",tx,[(Bt(),Ot(gs,null,zr([40,100,400],N=>et("button",{key:N,onClick:F=>at(N),class:ir(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",oe.value===N?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+$t(N),11,nx)),64))])]),et("div",null,[et("p",ix,"Coarse Focus: "+$t(Math.round(Ge.value)),1),et("input",{value:Ge.value,onChange:D[2]||(D[2]=N=>ut(Number(N.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,sx)]),et("div",rx,[D[14]||(D[14]=et("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),et("div",ax,[et("button",{onClick:D[3]||(D[3]=N=>V(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),et("button",{onClick:D[4]||(D[4]=N=>V(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),_e.value?(Bt(),Ot("div",ox,[D[16]||(D[16]=et("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),et("div",lx,[et("div",{class:"absolute inset-0 flex items-center justify-center",style:qu({filter:`blur(${Mt[pe.value]}px)`})},[...D[15]||(D[15]=[et("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),et("p",cx,$t(pe.value.replace("_"," "))+" · ×"+$t(oe.value),1)])):ln("",!0)],64)):(Bt(),Ot("div",ex,"Place a specimen slide on the stage first."))])):ln("",!0),I.value==="spring"?(Bt(),Ot("div",hx,[et("p",ux,"Attached Load: "+$t(ct.value)+" g · Extension: "+$t(ot.value)+" cm",1),k.value?(Bt(),Ot("p",fx,"Beyond the spring's safe extension limit.")):ln("",!0)])):ln("",!0),I.value==="protractor"?(Bt(),Ot("div",dx,[D[17]||(D[17]=et("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),et("div",px,[et("button",{onClick:D[5]||(D[5]=N=>P("incidence")),class:ir(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ge.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),et("button",{onClick:D[6]||(D[6]=N=>P("outgoing")),class:ir(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ge.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):ln("",!0)])):ln("",!0),m.value&&!S.value?(Bt(),Ot("div",mx,[et("span",gx,$t(Gn.value),1),et("span",_x,[m.value==="move"||m.value==="rotate"?(Bt(),Ot("button",{key:0,onClick:Ya,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):ln("",!0),et("button",{onClick:qa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):ln("",!0),S.value?(Bt(),Ot("div",vx,[et("p",xx,"Pouring "+$t(S.value.fromLabel)+" → "+$t(S.value.toLabel),1),et("p",yx,[Vr($t(Math.round(S.value.amount))+" ",1),D[18]||(D[18]=et("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),_c(et("input",{"onUpdate:modelValue":D[7]||(D[7]=N=>S.value.amount=N),type:"range",min:"0",max:S.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,Mx),[[vc,S.value.amount,void 0,{number:!0}]]),et("div",{class:"flex items-center gap-2 mt-2"},[et("button",{onClick:Qe,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),et("button",{onClick:je,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):ln("",!0),gc(Yu,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:Zu(()=>[Ce.value?(Bt(),Ot("div",Sx,$t(Ce.value),1)):ln("",!0)]),_:1}),d.value?(Bt(),Ot("div",bx,[et("div",wx,[et("p",Ex,$t(d.value),1),et("button",{onClick:D[8]||(D[8]=N=>d.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):ln("",!0),et("p",Tx,[D[19]||(D[19]=Vr(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard||i.wallShelves?(Bt(),Ot(gs,{key:0},[Vr(" · Click a door to open it, a sink tap to run water")],64)):ln("",!0)])]))}});export{hn as A,Ke as B,G as C,Kt as D,Vl as E,Ba as F,zt as G,Mu as H,ko as I,ad as L,xe as M,j_ as O,Si as P,sc as Q,Qd as R,Xt as S,Lt as T,U as V,K_ as W,Ix as _,Cv as a,Pv as b,Rv as c,dv as d,Ir as e,te as f,hs as g,ci as h,Wi as i,nn as j,Dx as k,Xa as l,lu as m,bi as n,Jn as o,wu as p,fn as q,gt as r,Sv as s,ri as t,Px as u,j as v,Pl as w,xu as x,nu as y,Dn as z};
