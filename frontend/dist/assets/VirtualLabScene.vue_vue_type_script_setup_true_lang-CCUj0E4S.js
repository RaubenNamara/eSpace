import{Q as Mr,o as Zh,m as Yo,r as Pt,d as sf,c as Bt,A as Ec,a as tt,f as ar,F as xs,k as Xr,e as cn,t as $t,C as qr,g as Tc,p as Ac,x as rf,T as af,z as of,h as lf,n as cf,j as kt}from"./index-fF93YV_3.js";import{_ as hf}from"./AppIcon.vue_vue_type_script_setup_true_lang-CDu_9sH_.js";function Gx(){const i=Pt(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return Mr(i,r=>{document.body.style.overflow=r?"hidden":""}),Zh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),Yo(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xl="185",Gs={ROTATE:0,DOLLY:1,PAN:2},Vs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},uf=0,Rc=1,ff=2,Er=1,df=2,br=3,Yi=0,wn=1,Kt=2,Pi=0,Ws=1,Cc=2,Pc=3,Dc=4,pf=5,as=100,mf=101,gf=102,_f=103,vf=104,xf=200,yf=201,Mf=202,bf=203,Zo=204,$o=205,Sf=206,wf=207,Ef=208,Tf=209,Af=210,Rf=211,Cf=212,Pf=213,Df=214,Ko=0,Jo=1,jo=2,Zs=3,Qo=4,el=5,tl=6,nl=7,ql=0,If=1,Lf=2,pi=0,$h=1,Kh=2,Jh=3,Yl=4,jh=5,Qh=6,eu=7,tu=300,us=301,$s=302,eo=303,to=304,qa=306,vn=1e3,Ci=1001,il=1002,fn=1003,Nf=1004,Yr=1005,xn=1006,no=1007,ls=1008,Ln=1009,nu=1010,iu=1011,Cr=1012,Zl=1013,_i=1014,Qn=1015,Li=1016,$l=1017,Kl=1018,Pr=1020,su=35902,ru=35899,au=1021,ou=1022,ei=1023,Ni=1026,cs=1027,Jl=1028,jl=1029,fs=1030,Ql=1031,ec=1033,Ta=33776,Aa=33777,Ra=33778,Ca=33779,sl=35840,rl=35841,al=35842,ol=35843,ll=36196,cl=37492,hl=37496,ul=37488,fl=37489,Ia=37490,dl=37491,pl=37808,ml=37809,gl=37810,_l=37811,vl=37812,xl=37813,yl=37814,Ml=37815,bl=37816,Sl=37817,wl=37818,El=37819,Tl=37820,Al=37821,Rl=36492,Cl=36494,Pl=36495,Dl=36283,Il=36284,La=36285,Ll=36286,Uf=3200,Na=0,Ff=1,Xi="",un="srgb",Ua="srgb-linear",Fa="linear",zt="srgb",ys=7680,Ic=519,Of=512,Bf=513,kf=514,tc=515,zf=516,Vf=517,nc=518,Hf=519,Nl=35044,Lc="300 es",di=2e3,Dr=2001;function Gf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Oa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wf(){const i=Oa("canvas");return i.style.display="block",i}const Nc={};function Ba(...i){const e="THREE."+i.shift();console.log(e,...i)}function lu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ct(...i){i=lu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Tt(...i){i=lu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Xs(...i){const e=i.join(" ");e in Nc||(Nc[e]=!0,ct(...i))}function Xf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const qf={[Ko]:Jo,[jo]:tl,[Qo]:nl,[Zs]:el,[Jo]:Ko,[tl]:jo,[nl]:Qo,[el]:Zs};class $i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pa=Math.PI/180,Ul=180/Math.PI;function Di(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[e&255]+gn[e>>8&255]+"-"+gn[e>>16&15|64]+gn[e>>24&255]+"-"+gn[t&63|128]+gn[t>>8&255]+"-"+gn[t>>16&255]+gn[t>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function Mt(i,e,t){return Math.max(e,Math.min(t,i))}function Yf(i,e){return(i%e+e)%e}function io(i,e,t){return(1-t)*i+t*e}function fi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Zf={DEG2RAD:Pa},pc=class pc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};pc.prototype.isVector2=!0;let J=pc;class Ui{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],h=n[s+2],f=n[s+3],u=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||o!==u||l!==d||h!==g){let m=o*u+l*d+h*g+f*_;m<0&&(u=-u,d=-d,g=-g,_=-_,m=-m);let p=1-c;if(m<.9995){const M=Math.acos(m),y=Math.sin(M);p=Math.sin(p*M)/y,c=Math.sin(c*M)/y,o=o*p+u*c,l=l*p+d*c,h=h*p+g*c,f=f*p+_*c}else{o=o*p+u*c,l=l*p+d*c,h=h*p+g*c,f=f*p+_*c;const M=1/Math.sqrt(o*o+l*l+h*h+f*f);o*=M,l*=M,h*=M,f*=M}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],h=n[s+3],f=r[a],u=r[a+1],d=r[a+2],g=r[a+3];return e[t]=c*g+h*f+o*d-l*u,e[t+1]=o*g+h*u+l*f-c*d,e[t+2]=l*g+h*d+c*u-o*f,e[t+3]=h*g-c*f-o*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),h=c(s/2),f=c(r/2),u=o(n/2),d=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=u*h*f+l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f+u*d*g;break;case"YZX":this._x=u*h*f+l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f-u*d*g;break;case"XZY":this._x=u*h*f-l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f+u*d*g;break;default:ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],h=t[6],f=t[10],u=n+c+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-o)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>c&&n>f){const d=2*Math.sqrt(1+n-c-f);this._w=(h-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(c>f){const d=2*Math.sqrt(1+c-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+h)/d}else{const d=2*Math.sqrt(1+f-n-c);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(o+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,h=t._w;return this._x=n*h+a*c+s*l-r*o,this._y=s*h+a*o+r*c-n*l,this._z=r*h+a*l+n*o-s*c,this._w=a*h-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const mc=class mc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Uc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Uc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),h=2*(c*t-r*s),f=2*(r*n-a*t);return this.x=t+o*l+a*f-c*h,this.y=n+o*h+c*l-r*f,this.z=s+o*f+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return so.copy(this).projectOnVector(e),this.sub(so)}reflect(e){return this.sub(so.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};mc.prototype.isVector3=!0;let L=mc;const so=new L,Uc=new Ui,gc=class gc{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],M=s[1],y=s[4],x=s[7],w=s[2],S=s[5],R=s[8];return r[0]=a*_+c*M+o*w,r[3]=a*m+c*y+o*S,r[6]=a*p+c*x+o*R,r[1]=l*_+h*M+f*w,r[4]=l*m+h*y+f*S,r[7]=l*p+h*x+f*R,r[2]=u*_+d*M+g*w,r[5]=u*m+d*y+g*S,r[8]=u*p+d*x+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-n*r*h+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],f=h*a-c*l,u=c*o-h*r,d=l*r-a*o,g=t*f+n*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-h*n)*_,e[2]=(c*n-s*a)*_,e[3]=u*_,e[4]=(h*t-s*o)*_,e[5]=(s*r-c*t)*_,e[6]=d*_,e[7]=(n*o-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ro.makeScale(e,t)),this}rotate(e){return Xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ro.makeRotation(-e)),this}translate(e,t){return Xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ro.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};gc.prototype.isMatrix3=!0;let pt=gc;const ro=new pt,Fc=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Oc=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $f(){const i={enabled:!0,workingColorSpace:Ua,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===zt&&(s.r=Ii(s.r),s.g=Ii(s.g),s.b=Ii(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===zt&&(s.r=qs(s.r),s.g=qs(s.g),s.b=qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xi?Fa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ua]:{primaries:e,whitePoint:n,transfer:Fa,toXYZ:Fc,fromXYZ:Oc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:e,whitePoint:n,transfer:zt,toXYZ:Fc,fromXYZ:Oc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}const Dt=$f();function Ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ms;class Kf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=Oa("canvas")),Ms.width=e.width,Ms.height=e.height;const s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Oa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ii(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ii(t[n]/255)*255):t[n]=Ii(t[n]);return{data:t,width:e.width,height:e.height}}else return ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jf=0;class ic{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(ao(s[a].image)):r.push(ao(s[a]))}else r=ao(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ao(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ct("Texture: Unable to serialize Texture."),{})}let jf=0;const oo=new L;class yn extends $i{constructor(e=yn.DEFAULT_IMAGE,t=yn.DEFAULT_MAPPING,n=Ci,s=Ci,r=xn,a=ls,c=ei,o=Ln,l=yn.DEFAULT_ANISOTROPY,h=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Di(),this.name="",this.source=new ic(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(oo).x}get height(){return this.source.getSize(oo).y}get depth(){return this.source.getSize(oo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ct(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ct(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vn:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case il:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vn:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case il:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=tu;yn.DEFAULT_ANISOTROPY=1;const _c=class _c{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],h=o[4],f=o[8],u=o[1],d=o[5],g=o[9],_=o[2],m=o[6],p=o[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,x=(d+1)/2,w=(p+1)/2,S=(h+u)/4,R=(f+_)/4,v=(g+m)/4;return y>x&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=S/n,r=R/n):x>w?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=S/s,r=v/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=R/r,s=v/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this.w=Mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this.w=Mt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_c.prototype.isVector4=!0;let Jt=_c;class Qf extends $i{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new yn(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ic(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends Qf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class cu extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ed extends yn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xa=class Xa{constructor(e,t,n,s,r,a,c,o,l,h,f,u,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,h,f,u,d,g,_,m)}set(e,t,n,s,r,a,c,o,l,h,f,u,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=o,p[2]=l,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xa().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/bs.setFromMatrixColumn(e,0).length(),r=1/bs.setFromMatrixColumn(e,1).length(),a=1/bs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*h,d=a*f,g=c*h,_=c*f;t[0]=o*h,t[4]=-o*f,t[8]=l,t[1]=d+g*l,t[5]=u-_*l,t[9]=-c*o,t[2]=_-u*l,t[6]=g+d*l,t[10]=a*o}else if(e.order==="YXZ"){const u=o*h,d=o*f,g=l*h,_=l*f;t[0]=u+_*c,t[4]=g*c-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-c,t[2]=d*c-g,t[6]=_+u*c,t[10]=a*o}else if(e.order==="ZXY"){const u=o*h,d=o*f,g=l*h,_=l*f;t[0]=u-_*c,t[4]=-a*f,t[8]=g+d*c,t[1]=d+g*c,t[5]=a*h,t[9]=_-u*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const u=a*h,d=a*f,g=c*h,_=c*f;t[0]=o*h,t[4]=g*l-d,t[8]=u*l+_,t[1]=o*f,t[5]=_*l+u,t[9]=d*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const u=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=_-u*f,t[8]=g*f+d,t[1]=f,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=d*f+g,t[10]=u-_*f}else if(e.order==="XZY"){const u=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*h,t[4]=-f,t[8]=l*h,t[1]=u*f+_,t[5]=a*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=c*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(td,e,nd)}lookAt(e,t,n){const s=this.elements;return Rn.subVectors(e,t),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Oi.crossVectors(n,Rn),Oi.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Oi.crossVectors(n,Rn)),Oi.normalize(),Zr.crossVectors(Rn,Oi),s[0]=Oi.x,s[4]=Zr.x,s[8]=Rn.x,s[1]=Oi.y,s[5]=Zr.y,s[9]=Rn.y,s[2]=Oi.z,s[6]=Zr.z,s[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],x=n[11],w=n[15],S=s[0],R=s[4],v=s[8],T=s[12],P=s[1],N=s[5],F=s[9],Y=s[13],K=s[2],O=s[6],Z=s[10],G=s[14],ie=s[3],le=s[7],re=s[11],fe=s[15];return r[0]=a*S+c*P+o*K+l*ie,r[4]=a*R+c*N+o*O+l*le,r[8]=a*v+c*F+o*Z+l*re,r[12]=a*T+c*Y+o*G+l*fe,r[1]=h*S+f*P+u*K+d*ie,r[5]=h*R+f*N+u*O+d*le,r[9]=h*v+f*F+u*Z+d*re,r[13]=h*T+f*Y+u*G+d*fe,r[2]=g*S+_*P+m*K+p*ie,r[6]=g*R+_*N+m*O+p*le,r[10]=g*v+_*F+m*Z+p*re,r[14]=g*T+_*Y+m*G+p*fe,r[3]=M*S+y*P+x*K+w*ie,r[7]=M*R+y*N+x*O+w*le,r[11]=M*v+y*F+x*Z+w*re,r[15]=M*T+y*Y+x*G+w*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=o*d-l*u,y=c*d-l*f,x=c*u-o*f,w=a*d-l*h,S=a*u-o*h,R=a*f-c*h;return t*(_*M-m*y+p*x)-n*(g*M-m*w+p*S)+s*(g*y-_*w+p*R)-r*(g*x-_*S+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-n*(r*h-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*c-n*a,y=t*o-s*a,x=t*l-r*a,w=n*o-s*c,S=n*l-r*c,R=s*l-r*o,v=h*_-f*g,T=h*m-u*g,P=h*p-d*g,N=f*m-u*_,F=f*p-d*_,Y=u*p-d*m,K=M*Y-y*F+x*N+w*P-S*T+R*v;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/K;return e[0]=(c*Y-o*F+l*N)*O,e[1]=(s*F-n*Y-r*N)*O,e[2]=(_*R-m*S+p*w)*O,e[3]=(u*S-f*R-d*w)*O,e[4]=(o*P-a*Y-l*T)*O,e[5]=(t*Y-s*P+r*T)*O,e[6]=(m*x-g*R-p*y)*O,e[7]=(h*R-u*x+d*y)*O,e[8]=(a*F-c*P+l*v)*O,e[9]=(n*P-t*F-r*v)*O,e[10]=(g*S-_*x+p*M)*O,e[11]=(f*x-h*S-d*M)*O,e[12]=(c*T-a*N-o*v)*O,e[13]=(t*N-n*T+s*v)*O,e[14]=(_*y-g*w-m*M)*O,e[15]=(h*w-f*y+u*M)*O,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,h=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,h*c+n,h*o-s*a,0,l*o-s*c,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,h=a+a,f=c+c,u=r*l,d=r*h,g=r*f,_=a*h,m=a*f,p=c*f,M=o*l,y=o*h,x=o*f,w=n.x,S=n.y,R=n.z;return s[0]=(1-(_+p))*w,s[1]=(d+x)*w,s[2]=(g-y)*w,s[3]=0,s[4]=(d-x)*S,s[5]=(1-(u+p))*S,s[6]=(m+M)*S,s[7]=0,s[8]=(g+y)*R,s[9]=(m-M)*R,s[10]=(1-(u+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=bs.set(s[0],s[1],s[2]).length();const c=bs.set(s[4],s[5],s[6]).length(),o=bs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Yn.copy(this);const l=1/a,h=1/c,f=1/o;return Yn.elements[0]*=l,Yn.elements[1]*=l,Yn.elements[2]*=l,Yn.elements[4]*=h,Yn.elements[5]*=h,Yn.elements[6]*=h,Yn.elements[8]*=f,Yn.elements[9]*=f,Yn.elements[10]*=f,t.setFromRotationMatrix(Yn),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=di,o=!1){const l=this.elements,h=2*r/(t-e),f=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let g,_;if(o)g=r/(a-r),_=a*r/(a-r);else if(c===di)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(c===Dr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=di,o=!1){const l=this.elements,h=2/(t-e),f=2/(n-s),u=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,_;if(o)g=1/(a-r),_=a/(a-r);else if(c===di)g=-2/(a-r),_=-(a+r)/(a-r);else if(c===Dr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Xa.prototype.isMatrix4=!0;let Ot=Xa;const bs=new L,Yn=new Ot,td=new L(0,0,0),nd=new L(1,1,1),Oi=new L,Zr=new L,Rn=new L,Bc=new Ot,kc=new Ui;class Fi{constructor(e=0,t=0,n=0,s=Fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Mt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-Mt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kc.setFromEuler(this),this.setFromQuaternion(kc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fi.DEFAULT_ORDER="XYZ";class sc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let id=0;const zc=new L,Ss=new Ui,Mi=new Ot,$r=new L,or=new L,sd=new L,rd=new Ui,Vc=new L(1,0,0),Hc=new L(0,1,0),Gc=new L(0,0,1),Wc={type:"added"},ad={type:"removed"},ws={type:"childadded",child:null},lo={type:"childremoved",child:null};class nn extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const e=new L,t=new Fi,n=new Ui,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ot},normalMatrix:{value:new pt}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(Vc,e)}rotateY(e){return this.rotateOnAxis(Hc,e)}rotateZ(e){return this.rotateOnAxis(Gc,e)}translateOnAxis(e,t){return zc.copy(e).applyQuaternion(this.quaternion),this.position.add(zc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vc,e)}translateY(e){return this.translateOnAxis(Hc,e)}translateZ(e){return this.translateOnAxis(Gc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$r.copy(e):$r.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(or,$r,this.up):Mi.lookAt($r,or,this.up),this.quaternion.setFromRotationMatrix(Mi),s&&(Mi.extractRotation(s.matrixWorld),Ss.setFromRotationMatrix(Mi),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Tt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wc),ws.child=e,this.dispatchEvent(ws),ws.child=null):Tt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ad),lo.child=e,this.dispatchEvent(lo),lo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wc),ws.child=e,this.dispatchEvent(ws),ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,e,sd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(or,rd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,h=o.length;l<h;l++){const f=o[l];r(e.shapes,f)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(c){const o=[];for(const l in c){const h=c[l];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}nn.DEFAULT_UP=new L(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class wt extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const od={type:"move"};class co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&u>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(od)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new wt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bi={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function ho(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class mt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Dt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Dt.workingColorSpace){if(e=Yf(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ho(a,r,e+1/3),this.g=ho(a,r,e),this.b=ho(a,r,e-1/3)}return Dt.colorSpaceToWorking(this,s),this}setStyle(e,t=un){function n(r){r!==void 0&&parseFloat(r)<1&&ct("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ct("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ct("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const n=hu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ct("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}copyLinearToSRGB(e){return this.r=qs(e.r),this.g=qs(e.g),this.b=qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return Dt.workingToColorSpace(_n.copy(this),e),Math.round(Mt(_n.r*255,0,255))*65536+Math.round(Mt(_n.g*255,0,255))*256+Math.round(Mt(_n.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dt.workingColorSpace){Dt.workingToColorSpace(_n.copy(this),t);const n=_n.r,s=_n.g,r=_n.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const h=(c+a)/2;if(c===a)o=0,l=0;else{const f=a-c;switch(l=h<=.5?f/(a+c):f/(2-a-c),a){case n:o=(s-r)/f+(s<r?6:0);break;case s:o=(r-n)/f+2;break;case r:o=(n-s)/f+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=Dt.workingColorSpace){return Dt.workingToColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=un){Dt.workingToColorSpace(_n.copy(this),e);const t=_n.r,n=_n.g,s=_n.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Bi),this.setHSL(Bi.h+e,Bi.s+t,Bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bi),e.getHSL(Kr);const n=io(Bi.h,Kr.h,t),s=io(Bi.s,Kr.s,t),r=io(Bi.l,Kr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new mt;mt.NAMES=hu;class Tr{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new mt(e),this.near=t,this.far=n}clone(){return new Tr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class uu extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fi,this.environmentIntensity=1,this.environmentRotation=new Fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Zn=new L,bi=new L,uo=new L,Si=new L,Es=new L,Ts=new L,Xc=new L,fo=new L,po=new L,mo=new L,go=new Jt,_o=new Jt,vo=new Jt;class kn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Zn.subVectors(e,t),s.cross(Zn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Zn.subVectors(s,t),bi.subVectors(n,t),uo.subVectors(e,t);const a=Zn.dot(Zn),c=Zn.dot(bi),o=Zn.dot(uo),l=bi.dot(bi),h=bi.dot(uo),f=a*l-c*c;if(f===0)return r.set(0,0,0),null;const u=1/f,d=(l*o-c*h)*u,g=(a*h-c*o)*u;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,Si)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,Si.x),o.addScaledVector(a,Si.y),o.addScaledVector(c,Si.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return go.setScalar(0),_o.setScalar(0),vo.setScalar(0),go.fromBufferAttribute(e,t),_o.fromBufferAttribute(e,n),vo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(go,r.x),a.addScaledVector(_o,r.y),a.addScaledVector(vo,r.z),a}static isFrontFacing(e,t,n,s){return Zn.subVectors(n,t),bi.subVectors(e,t),Zn.cross(bi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),Zn.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return kn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return kn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;Es.subVectors(s,n),Ts.subVectors(r,n),fo.subVectors(e,n);const o=Es.dot(fo),l=Ts.dot(fo);if(o<=0&&l<=0)return t.copy(n);po.subVectors(e,s);const h=Es.dot(po),f=Ts.dot(po);if(h>=0&&f<=h)return t.copy(s);const u=o*f-h*l;if(u<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(Es,a);mo.subVectors(e,r);const d=Es.dot(mo),g=Ts.dot(mo);if(g>=0&&d<=g)return t.copy(r);const _=d*l-o*g;if(_<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector(Ts,c);const m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return Xc.subVectors(r,s),c=(f-h)/(f-h+(d-g)),t.copy(s).addScaledVector(Xc,c);const p=1/(m+_+u);return a=_*p,c=u*p,t.copy(n).addScaledVector(Es,a).addScaledVector(Ts,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Vn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,$n):$n.fromBufferAttribute(r,a),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jr.copy(n.boundingBox)),Jr.applyMatrix4(e.matrixWorld),this.union(Jr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lr),jr.subVectors(this.max,lr),As.subVectors(e.a,lr),Rs.subVectors(e.b,lr),Cs.subVectors(e.c,lr),ki.subVectors(Rs,As),zi.subVectors(Cs,Rs),ns.subVectors(As,Cs);let t=[0,-ki.z,ki.y,0,-zi.z,zi.y,0,-ns.z,ns.y,ki.z,0,-ki.x,zi.z,0,-zi.x,ns.z,0,-ns.x,-ki.y,ki.x,0,-zi.y,zi.x,0,-ns.y,ns.x,0];return!xo(t,As,Rs,Cs,jr)||(t=[1,0,0,0,1,0,0,0,1],!xo(t,As,Rs,Cs,jr))?!1:(Qr.crossVectors(ki,zi),t=[Qr.x,Qr.y,Qr.z],xo(t,As,Rs,Cs,jr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const wi=[new L,new L,new L,new L,new L,new L,new L,new L],$n=new L,Jr=new Vn,As=new L,Rs=new L,Cs=new L,ki=new L,zi=new L,ns=new L,lr=new L,jr=new L,Qr=new L,is=new L;function xo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){is.fromArray(i,r);const c=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),o=e.dot(is),l=t.dot(is),h=n.dot(is);if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>c)return!1}return!0}const tn=new L,ea=new J;let ld=0;class Hn extends $i{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ld++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Nl,this.updateRanges=[],this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ea.fromBufferAttribute(this,t),ea.applyMatrix3(e),this.setXY(t,ea.x,ea.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array),r=Wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Nl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class fu extends Hn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class du extends Hn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class At extends Hn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const cd=new Vn,cr=new L,yo=new L;class Qs{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;cr.subVectors(e,this.center);const t=cr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(cr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(cr.copy(e.center).add(yo)),this.expandByPoint(cr.copy(e.center).sub(yo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hd=0;const Un=new Ot,Mo=new nn,Ps=new L,Cn=new Vn,hr=new Vn,hn=new L;class sn extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gf(e)?du:fu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new pt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,n){return Un.makeTranslation(e,t,n),this.applyMatrix4(Un),this}scale(e,t,n){return Un.makeScale(e,t,n),this.applyMatrix4(Un),this}lookAt(e){return Mo.lookAt(e),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new At(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Tt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];hr.setFromBufferAttribute(c),this.morphTargetsRelative?(hn.addVectors(Cn.min,hr.min),Cn.expandByPoint(hn),hn.addVectors(Cn.max,hr.max),Cn.expandByPoint(hn)):(Cn.expandByPoint(hr.min),Cn.expandByPoint(hr.max))}Cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)hn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(hn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)hn.fromBufferAttribute(c,l),o&&(Ps.fromBufferAttribute(e,l),hn.add(Ps)),s=Math.max(s,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Tt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Tt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Hn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let v=0;v<n.count;v++)c[v]=new L,o[v]=new L;const l=new L,h=new L,f=new L,u=new J,d=new J,g=new J,_=new L,m=new L;function p(v,T,P){l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,T),f.fromBufferAttribute(n,P),u.fromBufferAttribute(r,v),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),h.sub(l),f.sub(l),d.sub(u),g.sub(u);const N=1/(d.x*g.y-g.x*d.y);isFinite(N)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(N),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(N),c[v].add(_),c[T].add(_),c[P].add(_),o[v].add(m),o[T].add(m),o[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,T=M.length;v<T;++v){const P=M[v],N=P.start,F=P.count;for(let Y=N,K=N+F;Y<K;Y+=3)p(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const y=new L,x=new L,w=new L,S=new L;function R(v){w.fromBufferAttribute(s,v),S.copy(w);const T=c[v];y.copy(T),y.sub(w.multiplyScalar(w.dot(T))).normalize(),x.crossVectors(S,T);const N=x.dot(o[v])<0?-1:1;a.setXYZW(v,y.x,y.y,y.z,N)}for(let v=0,T=M.length;v<T;++v){const P=M[v],N=P.start,F=P.count;for(let Y=N,K=N+F;Y<K;Y+=3)R(e.getX(Y+0)),R(e.getX(Y+1)),R(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Hn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const s=new L,r=new L,a=new L,c=new L,o=new L,l=new L,h=new L,f=new L;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.add(h),o.add(h),l.add(h),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(c,o){const l=c.array,h=c.itemSize,f=c.normalized,u=new l.constructor(o.length*h);let d=0,g=0;for(let _=0,m=o.length;_<m;_++){c.isInterleavedBufferAttribute?d=o[_]*c.data.stride+c.offset:d=o[_]*h;for(let p=0;p<h;p++)u[g++]=l[d++]}return new Hn(u,h,f)}if(this.index===null)return ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new sn,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let h=0,f=l.length;h<f;h++){const u=l[h],d=e(u,n);o.push(d)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],h=[];for(let f=0,u=l.length;f<u;f++){const d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(s[o]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],f=r[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ud{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Nl,this.updateRanges=[],this.version=0,this.uuid=Di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Mn=new L;class ka{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyMatrix4(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.applyNormalMatrix(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mn.fromBufferAttribute(this,t),Mn.transformDirection(e),this.setXYZ(t,Mn.x,Mn.y,Mn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=fi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Wt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=fi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=fi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=fi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=fi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Wt(t,this.array),n=Wt(n,this.array),s=Wt(s,this.array),r=Wt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ba("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Hn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ka(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ba("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let fd=0;class Ki extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Di(),this.name="",this.type="Material",this.blending=Ws,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zo,this.blendDst=$o,this.blendEquation=as,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=Zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ct(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ct(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(n.blending=this.blending),this.side!==Yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zo&&(n.blendSrc=this.blendSrc),this.blendDst!==$o&&(n.blendDst=this.blendDst),this.blendEquation!==as&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ic&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new mt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new J().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new J().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ys extends Ki{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ds;const ur=new L,Is=new L,Ls=new L,Ns=new J,fr=new J,pu=new Ot,ta=new L,dr=new L,na=new L,qc=new J,bo=new J,Yc=new J;class Dn extends nn{constructor(e=new Ys){if(super(),this.isSprite=!0,this.type="Sprite",Ds===void 0){Ds=new sn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ud(t,5);Ds.setIndex([0,1,2,0,2,3]),Ds.setAttribute("position",new ka(n,3,0,!1)),Ds.setAttribute("uv",new ka(n,2,3,!1))}this.geometry=Ds,this.material=e,this.center=new J(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Tt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Is.setFromMatrixScale(this.matrixWorld),pu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ls.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Is.multiplyScalar(-Ls.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ia(ta.set(-.5,-.5,0),Ls,a,Is,s,r),ia(dr.set(.5,-.5,0),Ls,a,Is,s,r),ia(na.set(.5,.5,0),Ls,a,Is,s,r),qc.set(0,0),bo.set(1,0),Yc.set(1,1);let c=e.ray.intersectTriangle(ta,dr,na,!1,ur);if(c===null&&(ia(dr.set(-.5,.5,0),Ls,a,Is,s,r),bo.set(0,1),c=e.ray.intersectTriangle(ta,na,dr,!1,ur),c===null))return;const o=e.ray.origin.distanceTo(ur);o<e.near||o>e.far||t.push({distance:o,point:ur.clone(),uv:kn.getInterpolation(ur,ta,dr,na,qc,bo,Yc,new J),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ia(i,e,t,n,s,r){Ns.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(fr.x=r*Ns.x-s*Ns.y,fr.y=s*Ns.x+r*Ns.y):fr.copy(Ns),i.copy(e),i.x+=fr.x,i.y+=fr.y,i.applyMatrix4(pu)}const Ei=new L,So=new L,sa=new L,Vi=new L,wo=new L,ra=new L,Eo=new L;class Ya{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,t),Ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){So.copy(e).add(t).multiplyScalar(.5),sa.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(So);const r=e.distanceTo(t)*.5,a=-this.direction.dot(sa),c=Vi.dot(this.direction),o=-Vi.dot(sa),l=Vi.lengthSq(),h=Math.abs(1-a*a);let f,u,d,g;if(h>0)if(f=a*o-c,u=a*c-o,g=r*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,d=f*(f+a*u+2*c)+u*(a*f+u+2*o)+l}else u=r,f=Math.max(0,-(a*u+c)),d=-f*f+u*(u+2*o)+l;else u=-r,f=Math.max(0,-(a*u+c)),d=-f*f+u*(u+2*o)+l;else u<=-g?(f=Math.max(0,-(-a*r+c)),u=f>0?-r:Math.min(Math.max(-r,-o),r),d=-f*f+u*(u+2*o)+l):u<=g?(f=0,u=Math.min(Math.max(-r,-o),r),d=u*(u+2*o)+l):(f=Math.max(0,-(a*r+c)),u=f>0?r:Math.min(Math.max(-r,-o),r),d=-f*f+u*(u+2*o)+l);else u=a>0?-r:r,f=Math.max(0,-(a*u+c)),d=-f*f+u*(u+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(So).addScaledVector(sa,u),d}intersectSphere(e,t){Ei.subVectors(e.center,this.origin);const n=Ei.dot(this.direction),s=Ei.dot(Ei)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(c=(e.min.z-u.z)*f,o=(e.max.z-u.z)*f):(c=(e.max.z-u.z)*f,o=(e.min.z-u.z)*f),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,t,n,s,r){wo.subVectors(t,e),ra.subVectors(n,e),Eo.crossVectors(wo,ra);let a=this.direction.dot(Eo),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Vi.subVectors(this.origin,e);const o=c*this.direction.dot(ra.crossVectors(Vi,ra));if(o<0)return null;const l=c*this.direction.dot(wo.cross(Vi));if(l<0||o+l>a)return null;const h=-c*Vi.dot(Eo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ds extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=ql,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zc=new Ot,ss=new Ya,aa=new Qs,$c=new L,oa=new L,la=new L,ca=new L,To=new L,ha=new L,Kc=new L,ua=new L;class pe extends nn{constructor(e=new sn,t=new ds){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){ha.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const h=c[o],f=r[o];h!==0&&(To.fromBufferAttribute(f,e),a?ha.addScaledVector(To,h):ha.addScaledVector(To.sub(t),h))}t.add(ha)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(r),ss.copy(e.ray).recast(e.near),!(aa.containsPoint(ss.origin)===!1&&(ss.intersectSphere(aa,$c)===null||ss.origin.distanceToSquared($c)>(e.far-e.near)**2))&&(Zc.copy(r).invert(),ss.copy(e.ray).applyMatrix4(Zc),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,w=y;x<w;x+=3){const S=c.getX(x),R=c.getX(x+1),v=c.getX(x+2);s=fa(this,p,e,n,l,h,f,S,R,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=c.getX(m),y=c.getX(m+1),x=c.getX(m+2);s=fa(this,a,e,n,l,h,f,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,w=y;x<w;x+=3){const S=x,R=x+1,v=x+2;s=fa(this,p,e,n,l,h,f,S,R,v),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,x=m+2;s=fa(this,a,e,n,l,h,f,M,y,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function dd(i,e,t,n,s,r,a,c){let o;if(e.side===wn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===Yi,c),o===null)return null;ua.copy(c),ua.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ua);return l<t.near||l>t.far?null:{distance:l,point:ua.clone(),object:i}}function fa(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,oa),i.getVertexPosition(o,la),i.getVertexPosition(l,ca);const h=dd(i,e,t,n,oa,la,ca,Kc);if(h){const f=new L;kn.getBarycoord(Kc,oa,la,ca,f),s&&(h.uv=kn.getInterpolatedAttribute(s,c,o,l,f,new J)),r&&(h.uv1=kn.getInterpolatedAttribute(r,c,o,l,f,new J)),a&&(h.normal=kn.getInterpolatedAttribute(a,c,o,l,f,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:c,b:o,c:l,normal:new L,materialIndex:0};kn.getNormal(oa,la,ca,u.normal),h.face=u,h.barycoord=f}return h}class mu extends yn{constructor(e=null,t=1,n=1,s,r,a,c,o,l=fn,h=fn,f,u){super(null,a,c,o,l,h,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jc extends Hn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Us=new Ot,jc=new Ot,da=[],Qc=new Vn,pd=new Ot,pr=new pe,mr=new Qs;class gu extends pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,pd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),Qc.copy(e.boundingBox).applyMatrix4(Us),this.boundingBox.union(Qc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Us),mr.copy(e.boundingSphere).applyMatrix4(Us),this.boundingSphere.union(mr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(pr.geometry=this.geometry,pr.material=this.material,pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mr.copy(this.boundingSphere),mr.applyMatrix4(n),e.ray.intersectsSphere(mr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Us),jc.multiplyMatrices(n,Us),pr.matrixWorld=jc,pr.raycast(e,da);for(let a=0,c=da.length;a<c;a++){const o=da[a];o.instanceId=r,o.object=this,t.push(o)}da.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Jc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mu(new Float32Array(s*this.count),s,this.count,Jl,Qn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ao=new L,md=new L,gd=new pt;class Ai{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ao.subVectors(n,t).cross(md.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Ao),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gd.getNormalMatrix(e),s=this.coplanarPoint(Ao).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const rs=new Qs,_d=new J(.5,.5),pa=new L;class rc{constructor(e=new Ai,t=new Ai,n=new Ai,s=new Ai,r=new Ai,a=new Ai){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=di,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],M=r[12],y=r[13],x=r[14],w=r[15];if(s[0].setComponents(l-a,d-h,p-g,w-M).normalize(),s[1].setComponents(l+a,d+h,p+g,w+M).normalize(),s[2].setComponents(l+c,d+f,p+_,w+y).normalize(),s[3].setComponents(l-c,d-f,p-_,w-y).normalize(),n)s[4].setComponents(o,u,m,x).normalize(),s[5].setComponents(l-o,d-u,p-m,w-x).normalize();else if(s[4].setComponents(l-o,d-u,p-m,w-x).normalize(),t===di)s[5].setComponents(l+o,d+u,p+m,w+x).normalize();else if(t===Dr)s[5].setComponents(o,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(e){rs.center.set(0,0,0);const t=_d.distanceTo(e.center);return rs.radius=.7071067811865476+t,rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(pa.x=s.normal.x>0?e.max.x:e.min.x,pa.y=s.normal.y>0?e.max.y:e.min.y,pa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(pa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class _u extends Ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const za=new L,Va=new L,eh=new Ot,gr=new Ya,ma=new Qs,Ro=new L,th=new L;class vd extends nn{constructor(e=new sn,t=new _u){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)za.fromBufferAttribute(t,s-1),Va.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=za.distanceTo(Va);e.setAttribute("lineDistance",new At(n,1))}else ct("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(s),ma.radius+=r,e.ray.intersectsSphere(ma)===!1)return;eh.copy(s).invert(),gr.copy(e.ray).applyMatrix4(eh);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=h.getX(_),M=h.getX(_+1),y=ga(this,e,gr,o,p,M,_);y&&t.push(y)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(d),p=ga(this,e,gr,o,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=ga(this,e,gr,o,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=ga(this,e,gr,o,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function ga(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(za.fromBufferAttribute(c,s),Va.fromBufferAttribute(c,r),t.distanceSqToSegment(za,Va,Ro,th)>n)return;Ro.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ro);if(!(l<e.near||l>e.far))return{distance:l,point:th.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class vu extends yn{constructor(e=[],t=us,n,s,r,a,c,o,l,h){super(e,t,n,s,r,a,c,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ir extends yn{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ks extends yn{constructor(e,t,n=_i,s,r,a,c=fn,o=fn,l,h=Ni,f=1){if(h!==Ni&&h!==cs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,c,o,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ic(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xd extends Ks{constructor(e,t=_i,n=us,s,r,a=fn,c=fn,o,l=Ni){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,c,o,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class xu extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ie extends sn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(h,3)),this.setAttribute("uv",new At(f,2));function g(_,m,p,M,y,x,w,S,R,v,T){const P=x/R,N=w/v,F=x/2,Y=w/2,K=S/2,O=R+1,Z=v+1;let G=0,ie=0;const le=new L;for(let re=0;re<Z;re++){const fe=re*N-Y;for(let ye=0;ye<O;ye++){const Xe=ye*P-F;le[_]=Xe*M,le[m]=fe*y,le[p]=K,l.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=S>0?1:-1,h.push(le.x,le.y,le.z),f.push(ye/R),f.push(1-re/v),G+=1}}for(let re=0;re<v;re++)for(let fe=0;fe<R;fe++){const ye=u+fe+O*re,Xe=u+fe+O*(re+1),me=u+(fe+1)+O*(re+1),ue=u+(fe+1)+O*re;o.push(ye,Xe,ue),o.push(Xe,me,ue),ie+=6}c.addGroup(d,ie,T),d+=ie,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ie(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class jn extends sn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new L,h=new J;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const d=n+f/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),c.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,o.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new At(a,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class z extends sn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],u=[],d=[];let g=0;const _=[],m=n/2;let p=0;M(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new At(f,3)),this.setAttribute("normal",new At(u,3)),this.setAttribute("uv",new At(d,2));function M(){const x=new L,w=new L;let S=0;const R=(t-e)/n;for(let v=0;v<=r;v++){const T=[],P=v/r,N=P*(t-e)+e;for(let F=0;F<=s;F++){const Y=F/s,K=Y*o+c,O=Math.sin(K),Z=Math.cos(K);w.x=N*O,w.y=-P*n+m,w.z=N*Z,f.push(w.x,w.y,w.z),x.set(O,R,Z).normalize(),u.push(x.x,x.y,x.z),d.push(Y,1-P),T.push(g++)}_.push(T)}for(let v=0;v<s;v++)for(let T=0;T<r;T++){const P=_[T][v],N=_[T+1][v],F=_[T+1][v+1],Y=_[T][v+1];(e>0||T!==0)&&(h.push(P,N,Y),S+=3),(t>0||T!==r-1)&&(h.push(N,F,Y),S+=3)}l.addGroup(p,S,0),p+=S}function y(x){const w=g,S=new J,R=new L;let v=0;const T=x===!0?e:t,P=x===!0?1:-1;for(let F=1;F<=s;F++)f.push(0,m*P,0),u.push(0,P,0),d.push(.5,.5),g++;const N=g;for(let F=0;F<=s;F++){const K=F/s*o+c,O=Math.cos(K),Z=Math.sin(K);R.x=T*Z,R.y=m*P,R.z=T*O,f.push(R.x,R.y,R.z),u.push(0,P,0),S.x=O*.5+.5,S.y=Z*.5*P+.5,d.push(S.x,S.y),g++}for(let F=0;F<s;F++){const Y=w+F,K=N+F;x===!0?h.push(K,K+1,Y):h.push(K+1,K,Y),v+=3}l.addGroup(p,v,x===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new z(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bn extends z{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new Bn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ac extends sn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),h(),this.setAttribute("position",new At(r,3)),this.setAttribute("normal",new At(r.slice(),3)),this.setAttribute("uv",new At(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(M){const y=new L,x=new L,w=new L;for(let S=0;S<t.length;S+=3)d(t[S+0],y),d(t[S+1],x),d(t[S+2],w),o(y,x,w,M)}function o(M,y,x,w){const S=w+1,R=[];for(let v=0;v<=S;v++){R[v]=[];const T=M.clone().lerp(x,v/S),P=y.clone().lerp(x,v/S),N=S-v;for(let F=0;F<=N;F++)F===0&&v===S?R[v][F]=T:R[v][F]=T.clone().lerp(P,F/N)}for(let v=0;v<S;v++)for(let T=0;T<2*(S-v)-1;T++){const P=Math.floor(T/2);T%2===0?(u(R[v][P+1]),u(R[v+1][P]),u(R[v][P])):(u(R[v][P+1]),u(R[v+1][P+1]),u(R[v+1][P]))}}function l(M){const y=new L;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(M),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){const M=new L;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const x=m(M)/2/Math.PI+.5,w=p(M)/Math.PI+.5;a.push(x,1-w)}g(),f()}function f(){for(let M=0;M<a.length;M+=6){const y=a[M+0],x=a[M+2],w=a[M+4],S=Math.max(y,x,w),R=Math.min(y,x,w);S>.9&&R<.1&&(y<.2&&(a[M+0]+=1),x<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function d(M,y){const x=M*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){const M=new L,y=new L,x=new L,w=new L,S=new J,R=new J,v=new J;for(let T=0,P=0;T<r.length;T+=9,P+=6){M.set(r[T+0],r[T+1],r[T+2]),y.set(r[T+3],r[T+4],r[T+5]),x.set(r[T+6],r[T+7],r[T+8]),S.set(a[P+0],a[P+1]),R.set(a[P+2],a[P+3]),v.set(a[P+4],a[P+5]),w.copy(M).add(y).add(x).divideScalar(3);const N=m(w);_(S,P+0,M,N),_(R,P+2,y,N),_(v,P+4,x,N)}}function _(M,y,x,w){w<0&&M.x===1&&(a[y]=M.x-1),x.x===0&&x.z===0&&(a[y]=w/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ac(e.vertices,e.indices,e.radius,e.detail)}}class oc extends ac{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new oc(e.radius,e.detail)}}class ti{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ct("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new J:new L);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,s=[],r=[],a=[],c=new L,o=new Ot;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),u<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();const g=Math.acos(Mt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(o.makeRotationAxis(c,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Mt(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class lc extends ti{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new J){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=o-this.aX,d=l-this.aY;o=u*h-d*f+this.aX,l=u*f+d*h+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class yd extends lc{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function cc(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,h,f){let u=(a-r)/l-(c-r)/(l+h)+(c-a)/h,d=(c-a)/h-(o-a)/(h+f)+(o-c)/f;u*=h,d*=h,s(a,c,u,d)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const nh=new L,ih=new L,Co=new cc,Po=new cc,Do=new cc;class Fl extends ti{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,h;this.closed||c>0?l=s[(c-1)%r]:(ih.subVectors(s[0],s[1]).add(s[0]),l=ih);const f=s[c%r],u=s[(c+1)%r];if(this.closed||c+2<r?h=s[(c+2)%r]:(nh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=nh),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Co.initNonuniformCatmullRom(l.x,f.x,u.x,h.x,g,_,m),Po.initNonuniformCatmullRom(l.y,f.y,u.y,h.y,g,_,m),Do.initNonuniformCatmullRom(l.z,f.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Co.initCatmullRom(l.x,f.x,u.x,h.x,this.tension),Po.initCatmullRom(l.y,f.y,u.y,h.y,this.tension),Do.initCatmullRom(l.z,f.z,u.z,h.z,this.tension));return n.set(Co.calc(o),Po.calc(o),Do.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function sh(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function Md(i,e){const t=1-i;return t*t*e}function bd(i,e){return 2*(1-i)*i*e}function Sd(i,e){return i*i*e}function Ar(i,e,t,n){return Md(i,e)+bd(i,t)+Sd(i,n)}function wd(i,e){const t=1-i;return t*t*t*e}function Ed(i,e){const t=1-i;return 3*t*t*i*e}function Td(i,e){return 3*(1-i)*i*i*e}function Ad(i,e){return i*i*i*e}function Rr(i,e,t,n,s){return wd(i,e)+Ed(i,t)+Td(i,n)+Ad(i,s)}class yu extends ti{constructor(e=new J,t=new J,n=new J,s=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new J){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Rr(e,s.x,r.x,a.x,c.x),Rr(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rd extends ti{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(Rr(e,s.x,r.x,a.x,c.x),Rr(e,s.y,r.y,a.y,c.y),Rr(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mu extends ti{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cd extends ti{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bu extends ti{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ar(e,s.x,r.x,a.x),Ar(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hc extends ti{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ar(e,s.x,r.x,a.x),Ar(e,s.y,r.y,a.y),Ar(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Su extends ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new J){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(sh(c,o.x,l.x,h.x,f.x),sh(c,o.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new J().fromArray(s))}return this}}var Ha=Object.freeze({__proto__:null,ArcCurve:yd,CatmullRomCurve3:Fl,CubicBezierCurve:yu,CubicBezierCurve3:Rd,EllipseCurve:lc,LineCurve:Mu,LineCurve3:Cd,QuadraticBezierCurve:bu,QuadraticBezierCurve3:hc,SplineCurve:Su});class Pd extends ti{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ha[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const h=o[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ha[s.type]().fromJSON(s))}return this}}class Ol extends Pd{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Mu(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new bu(this.currentPoint.clone(),new J(e,t),new J(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new yu(this.currentPoint.clone(),new J(e,t),new J(n,s),new J(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Su(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new lc(e,t,n,s,r,a,c,o);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Wi extends Ol{constructor(e){super(e),this.uuid=Di(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Ol().fromJSON(s))}return this}}function Dd(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=wu(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=Fd(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let h=c,f=o;for(let u=t;u<s;u+=t){const d=i[u],g=i[u+1];d<c&&(c=d),g<o&&(o=g),d>h&&(h=d),g>f&&(f=g)}l=Math.max(h-c,f-o),l=l!==0?32767/l:0}return Lr(r,a,t,c,o,l,0),a}function wu(i,e,t,n,s){let r;if(s===Yd(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=rh(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=rh(a/n|0,i[a],i[a+1],r);return r&&Js(r,r.next)&&(Ur(r),r=r.next),r}function ps(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Js(t,t.next)||jt(t.prev,t,t.next)===0)){if(Ur(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Lr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Vd(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?Ld(i,n,s,r):Id(i)){e.push(o.i,i.i,l.i),Ur(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=Nd(ps(i),e),Lr(i,e,t,n,s,r,2)):a===2&&Ud(i,e,t,n,s,r):Lr(ps(i),e,t,n,s,r,1);break}}}function Id(i){const e=i.prev,t=i,n=i.next;if(jt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,h=Math.min(s,r,a),f=Math.min(c,o,l),u=Math.max(s,r,a),d=Math.max(c,o,l);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&Sr(s,c,r,o,a,l,g.x,g.y)&&jt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ld(i,e,t,n){const s=i.prev,r=i,a=i.next;if(jt(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(c,o,l),g=Math.min(h,f,u),_=Math.max(c,o,l),m=Math.max(h,f,u),p=Bl(d,g,e,t,n),M=Bl(_,m,e,t,n);let y=i.prevZ,x=i.nextZ;for(;y&&y.z>=p&&x&&x.z<=M;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&Sr(c,h,o,f,l,u,y.x,y.y)&&jt(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Sr(c,h,o,f,l,u,x.x,x.y)&&jt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=d&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&Sr(c,h,o,f,l,u,y.x,y.y)&&jt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=M;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Sr(c,h,o,f,l,u,x.x,x.y)&&jt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Nd(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Js(n,s)&&Tu(n,t,t.next,s)&&Nr(n,s)&&Nr(s,n)&&(e.push(n.i,t.i,s.i),Ur(t),Ur(t.next),t=i=s),t=t.next}while(t!==i);return ps(t)}function Ud(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&Wd(a,c)){let o=Au(a,c);a=ps(a,a.next),o=ps(o,o.next),Lr(a,e,t,n,s,r,0),Lr(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function Fd(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=wu(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(Gd(l))}s.sort(Od);for(let r=0;r<s.length;r++)t=Bd(s[r],t);return t}function Od(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Bd(i,e){const t=kd(i,e);if(!t)return e;const n=Au(t,i);return ps(n,n.next),ps(t,t.next)}function kd(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Js(i,t))return t;do{if(Js(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&Eu(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const f=Math.abs(s-t.y)/(n-t.x);Nr(t,i)&&(f<h||f===h&&(t.x>a.x||t.x===a.x&&zd(a,t)))&&(a=t,h=f)}t=t.next}while(t!==c);return a}function zd(i,e){return jt(i.prev,i,e.prev)<0&&jt(e.next,i,i.next)<0}function Vd(i,e,t,n){let s=i;do s.z===0&&(s.z=Bl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Hd(s)}function Hd(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Bl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Gd(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Eu(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function Sr(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&Eu(i,e,t,n,s,r,a,c)}function Wd(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Xd(i,e)&&(Nr(i,e)&&Nr(e,i)&&qd(i,e)&&(jt(i.prev,i,e.prev)||jt(i,e.prev,e))||Js(i,e)&&jt(i.prev,i,i.next)>0&&jt(e.prev,e,e.next)>0)}function jt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Js(i,e){return i.x===e.x&&i.y===e.y}function Tu(i,e,t,n){const s=va(jt(i,e,t)),r=va(jt(i,e,n)),a=va(jt(t,n,i)),c=va(jt(t,n,e));return!!(s!==r&&a!==c||s===0&&_a(i,t,e)||r===0&&_a(i,n,e)||a===0&&_a(t,i,n)||c===0&&_a(t,e,n))}function _a(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function va(i){return i>0?1:i<0?-1:0}function Xd(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Tu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Nr(i,e){return jt(i.prev,i,i.next)<0?jt(i,e,i.next)>=0&&jt(i,i.prev,e)>=0:jt(i,e,i.prev)<0||jt(i,i.next,e)<0}function qd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Au(i,e){const t=kl(i.i,i.x,i.y),n=kl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function rh(i,e,t,n){const s=kl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ur(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function kl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Yd(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Zd{static triangulate(e,t,n=2){return Dd(e,t,n)}}class Hs{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Hs.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];ah(e),oh(n,e);let a=e.length;t.forEach(ah);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,oh(n,t[o]);const c=Zd.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function ah(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function oh(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ti extends sn{constructor(e=new Wi([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new At(s,3)),this.setAttribute("uv",new At(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:$d;let y,x=!1,w,S,R,v;if(p){y=p.getSpacedPoints(h),x=!0,u=!1;const oe=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(h,oe),S=new L,R=new L,v=new L}u||(m=0,d=0,g=0,_=0);const T=c.extractPoints(l);let P=T.shape;const N=T.holes;if(!Hs.isClockWise(P)){P=P.reverse();for(let oe=0,de=N.length;oe<de;oe++){const xe=N[oe];Hs.isClockWise(xe)&&(N[oe]=xe.reverse())}}function Y(oe){const xe=10000000000000001e-36;let we=oe[0];for(let Ee=1;Ee<=oe.length;Ee++){const nt=Ee%oe.length,Ze=oe[nt],ot=Ze.x-we.x,ht=Ze.y-we.y,V=ot*ot+ht*ht,It=Math.max(Math.abs(Ze.x),Math.abs(Ze.y),Math.abs(we.x),Math.abs(we.y)),St=xe*It*It;if(V<=St){oe.splice(nt,1),Ee--;continue}we=Ze}}Y(P),N.forEach(Y);const K=N.length,O=P;for(let oe=0;oe<K;oe++){const de=N[oe];P=P.concat(de)}function Z(oe,de,xe){return de||Tt("ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(de,xe)}const G=P.length;function ie(oe,de,xe){let we,Ee,nt;const Ze=oe.x-de.x,ot=oe.y-de.y,ht=xe.x-oe.x,V=xe.y-oe.y,It=Ze*Ze+ot*ot,St=Ze*V-ot*ht;if(Math.abs(St)>Number.EPSILON){const D=Math.sqrt(It),b=Math.sqrt(ht*ht+V*V),X=de.x-ot/D,Q=de.y+Ze/D,ae=xe.x-V/b,ve=xe.y+ht/b,Ae=((ae-X)*V-(ve-Q)*ht)/(Ze*V-ot*ht);we=X+Ze*Ae-oe.x,Ee=Q+ot*Ae-oe.y;const se=we*we+Ee*Ee;if(se<=2)return new J(we,Ee);nt=Math.sqrt(se/2)}else{let D=!1;Ze>Number.EPSILON?ht>Number.EPSILON&&(D=!0):Ze<-Number.EPSILON?ht<-Number.EPSILON&&(D=!0):Math.sign(ot)===Math.sign(V)&&(D=!0),D?(we=-ot,Ee=Ze,nt=Math.sqrt(It)):(we=Ze,Ee=ot,nt=Math.sqrt(It/2))}return new J(we/nt,Ee/nt)}const le=[];for(let oe=0,de=O.length,xe=de-1,we=oe+1;oe<de;oe++,xe++,we++)xe===de&&(xe=0),we===de&&(we=0),le[oe]=ie(O[oe],O[xe],O[we]);const re=[];let fe,ye=le.concat();for(let oe=0,de=K;oe<de;oe++){const xe=N[oe];fe=[];for(let we=0,Ee=xe.length,nt=Ee-1,Ze=we+1;we<Ee;we++,nt++,Ze++)nt===Ee&&(nt=0),Ze===Ee&&(Ze=0),fe[we]=ie(xe[we],xe[nt],xe[Ze]);re.push(fe),ye=ye.concat(fe)}let Xe;if(m===0)Xe=Hs.triangulateShape(O,N);else{const oe=[],de=[];for(let xe=0;xe<m;xe++){const we=xe/m,Ee=d*Math.cos(we*Math.PI/2),nt=g*Math.sin(we*Math.PI/2)+_;for(let Ze=0,ot=O.length;Ze<ot;Ze++){const ht=Z(O[Ze],le[Ze],nt);Se(ht.x,ht.y,-Ee),we===0&&oe.push(ht)}for(let Ze=0,ot=K;Ze<ot;Ze++){const ht=N[Ze];fe=re[Ze];const V=[];for(let It=0,St=ht.length;It<St;It++){const D=Z(ht[It],fe[It],nt);Se(D.x,D.y,-Ee),we===0&&V.push(D)}we===0&&de.push(V)}}Xe=Hs.triangulateShape(oe,de)}const me=Xe.length,ue=g+_;for(let oe=0;oe<G;oe++){const de=u?Z(P[oe],ye[oe],ue):P[oe];x?(R.copy(w.normals[0]).multiplyScalar(de.x),S.copy(w.binormals[0]).multiplyScalar(de.y),v.copy(y[0]).add(R).add(S),Se(v.x,v.y,v.z)):Se(de.x,de.y,0)}for(let oe=1;oe<=h;oe++)for(let de=0;de<G;de++){const xe=u?Z(P[de],ye[de],ue):P[de];x?(R.copy(w.normals[oe]).multiplyScalar(xe.x),S.copy(w.binormals[oe]).multiplyScalar(xe.y),v.copy(y[oe]).add(R).add(S),Se(v.x,v.y,v.z)):Se(xe.x,xe.y,f/h*oe)}for(let oe=m-1;oe>=0;oe--){const de=oe/m,xe=d*Math.cos(de*Math.PI/2),we=g*Math.sin(de*Math.PI/2)+_;for(let Ee=0,nt=O.length;Ee<nt;Ee++){const Ze=Z(O[Ee],le[Ee],we);Se(Ze.x,Ze.y,f+xe)}for(let Ee=0,nt=N.length;Ee<nt;Ee++){const Ze=N[Ee];fe=re[Ee];for(let ot=0,ht=Ze.length;ot<ht;ot++){const V=Z(Ze[ot],fe[ot],we);x?Se(V.x,V.y+y[h-1].y,y[h-1].x+xe):Se(V.x,V.y,f+xe)}}}q(),he();function q(){const oe=s.length/3;if(u){let de=0,xe=G*de;for(let we=0;we<me;we++){const Ee=Xe[we];Ve(Ee[2]+xe,Ee[1]+xe,Ee[0]+xe)}de=h+m*2,xe=G*de;for(let we=0;we<me;we++){const Ee=Xe[we];Ve(Ee[0]+xe,Ee[1]+xe,Ee[2]+xe)}}else{for(let de=0;de<me;de++){const xe=Xe[de];Ve(xe[2],xe[1],xe[0])}for(let de=0;de<me;de++){const xe=Xe[de];Ve(xe[0]+G*h,xe[1]+G*h,xe[2]+G*h)}}n.addGroup(oe,s.length/3-oe,0)}function he(){const oe=s.length/3;let de=0;ce(O,de),de+=O.length;for(let xe=0,we=N.length;xe<we;xe++){const Ee=N[xe];ce(Ee,de),de+=Ee.length}n.addGroup(oe,s.length/3-oe,1)}function ce(oe,de){let xe=oe.length;for(;--xe>=0;){const we=xe;let Ee=xe-1;Ee<0&&(Ee=oe.length-1);for(let nt=0,Ze=h+m*2;nt<Ze;nt++){const ot=G*nt,ht=G*(nt+1),V=de+we+ot,It=de+Ee+ot,St=de+Ee+ht,D=de+we+ht;Oe(V,It,St,D)}}}function Se(oe,de,xe){o.push(oe),o.push(de),o.push(xe)}function Ve(oe,de,xe){at(oe),at(de),at(xe);const we=s.length/3,Ee=M.generateTopUV(n,s,we-3,we-2,we-1);Je(Ee[0]),Je(Ee[1]),Je(Ee[2])}function Oe(oe,de,xe,we){at(oe),at(de),at(we),at(de),at(xe),at(we);const Ee=s.length/3,nt=M.generateSideWallUV(n,s,Ee-6,Ee-3,Ee-2,Ee-1);Je(nt[0]),Je(nt[1]),Je(nt[3]),Je(nt[1]),Je(nt[2]),Je(nt[3])}function at(oe){s.push(o[oe*3+0]),s.push(o[oe*3+1]),s.push(o[oe*3+2])}function Je(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Kd(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ha[s.type]().fromJSON(s)),new Ti(n,e.options)}}const $d={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new J(r,a),new J(c,o),new J(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],u=e[s*3],d=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(c-h)<Math.abs(a-l)?[new J(a,1-o),new J(l,1-f),new J(u,1-g),new J(_,1-p)]:[new J(c,1-o),new J(h,1-f),new J(d,1-g),new J(m,1-p)]}};function Kd(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Kn extends sn{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Mt(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],h=1/t,f=new L,u=new J,d=new L,g=new L,_=new L;let m=0,p=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(_.x,_.y,_.z);break;default:m=e[M+1].x-e[M].x,p=e[M+1].y-e[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),o.push(d.x,d.y,d.z),_.copy(g)}for(let M=0;M<=t;M++){const y=n+M*h*s,x=Math.sin(y),w=Math.cos(y);for(let S=0;S<=e.length-1;S++){f.x=e[S].x*x,f.y=e[S].y,f.z=e[S].x*w,a.push(f.x,f.y,f.z),u.x=M/t,u.y=S/(e.length-1),c.push(u.x,u.y);const R=o[3*S+0]*x,v=o[3*S+1],T=o[3*S+0]*w;l.push(R,v,T)}}for(let M=0;M<t;M++)for(let y=0;y<e.length-1;y++){const x=y+M*e.length,w=x,S=x+e.length,R=x+e.length+1,v=x+1;r.push(w,S,v),r.push(R,v,S)}this.setIndex(r),this.setAttribute("position",new At(a,3)),this.setAttribute("uv",new At(c,2)),this.setAttribute("normal",new At(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.points,e.segments,e.phiStart,e.phiLength)}}class Qt extends sn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,h=o+1,f=e/c,u=t/o,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*u-a;for(let y=0;y<l;y++){const x=y*f-r;g.push(x,-M,0),_.push(0,0,1),m.push(y/c),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let M=0;M<c;M++){const y=M+l*p,x=M+l*(p+1),w=M+1+l*(p+1),S=M+1+l*p;d.push(y,x,S),d.push(x,w,S)}this.setIndex(d),this.setAttribute("position",new At(g,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qt(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ru extends sn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],h=[];let f=e;const u=(t-e)/s,d=new L,g=new J;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=f*Math.cos(p),d.y=f*Math.sin(p),o.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,h.push(g.x,g.y)}f+=u}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,y=M,x=M+n+1,w=M+n+2,S=M+1;c.push(y,x,S),c.push(x,w,S)}}this.setIndex(c),this.setAttribute("position",new At(o,3)),this.setAttribute("normal",new At(l,3)),this.setAttribute("uv",new At(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ru(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Gt extends sn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const h=[],f=new L,u=new L,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],y=p/n,x=a+y*c,w=e*Math.cos(x),S=Math.sqrt(e*e-w*w);let R=0;p===0&&a===0?R=.5/t:p===n&&o===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){const T=v/t,P=s+T*r;f.x=-S*Math.cos(P),f.y=w,f.z=S*Math.sin(P),g.push(f.x,f.y,f.z),u.copy(f).normalize(),_.push(u.x,u.y,u.z),m.push(T+R,1-y),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const y=h[p][M+1],x=h[p][M],w=h[p+1][M],S=h[p+1][M+1];(p!==0||a>0)&&d.push(y,x,S),(p!==n-1||o<Math.PI)&&d.push(x,w,S)}this.setIndex(d),this.setAttribute("position",new At(g,3)),this.setAttribute("normal",new At(_,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Nt extends sn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],h=[],f=[],u=new L,d=new L,g=new L;for(let _=0;_<=n;_++){const m=a+_/n*c;for(let p=0;p<=s;p++){const M=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(M),d.y=(e+t*Math.cos(m))*Math.sin(M),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(p/s),f.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const p=(s+1)*_+m-1,M=(s+1)*(_-1)+m-1,y=(s+1)*(_-1)+m,x=(s+1)*_+m;o.push(p,M,x),o.push(M,y,x)}this.setIndex(o),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(h,3)),this.setAttribute("uv",new At(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ri extends sn{constructor(e=new hc(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new L,o=new L,l=new J;let h=new L;const f=[],u=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new At(f,3)),this.setAttribute("normal",new At(u,3)),this.setAttribute("uv",new At(d,2));function _(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),M(),p()}function m(y){h=e.getPointAt(y/t,h);const x=a.normals[y],w=a.binormals[y];for(let S=0;S<=s;S++){const R=S/s*Math.PI*2,v=Math.sin(R),T=-Math.cos(R);o.x=T*x.x+v*w.x,o.y=T*x.y+v*w.y,o.z=T*x.z+v*w.z,o.normalize(),u.push(o.x,o.y,o.z),c.x=h.x+n*o.x,c.y=h.y+n*o.y,c.z=h.z+n*o.z,f.push(c.x,c.y,c.z)}}function p(){for(let y=1;y<=t;y++)for(let x=1;x<=s;x++){const w=(s+1)*(y-1)+(x-1),S=(s+1)*y+(x-1),R=(s+1)*y+x,v=(s+1)*(y-1)+x;g.push(w,S,v),g.push(S,R,v)}}function M(){for(let y=0;y<=t;y++)for(let x=0;x<=s;x++)l.x=y/t,l.y=x/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ri(new Ha[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function js(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(lh(s))s.isRenderTargetTexture?(ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(lh(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Sn(i){const e={};for(let t=0;t<i.length;t++){const n=js(i[t]);for(const s in n)e[s]=n[s]}return e}function lh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Jd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}const jd={clone:js,merge:Sn};var Qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vi extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qd,this.fragmentShader=e0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=js(e.uniforms),this.uniformsGroups=Jd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new mt().setHex(s.value);break;case"v2":this.uniforms[n].value=new J().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Jt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new pt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ot().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class t0 extends vi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class $ extends Ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Na,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gi extends ${constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new mt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new mt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new mt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class n0 extends Ki{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Na,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fi,this.combine=ql,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class i0 extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class s0 extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wx extends _u{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class uc extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new mt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Pu extends uc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new mt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Io=new Ot,ch=new L,hh=new L;class Du{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rc,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ch.setFromMatrixPosition(e.matrixWorld),t.position.copy(ch),hh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hh),t.updateMatrixWorld(),Io.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Io,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Dr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Io)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xa=new L,ya=new Ui,oi=new L;class Iu extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xa,ya,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xa,ya,oi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(xa,ya,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xa,ya,oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new L,uh=new J,fh=new J;class In extends Iu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ul*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ul*2*Math.atan(Math.tan(Pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,uh,fh),t.subVectors(fh,uh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class r0 extends Du{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0}}class Lu extends uc{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new r0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class fc extends Iu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=h*this.view.offsetY,o=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class a0 extends Du{constructor(){super(new fc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ga extends uc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new a0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Fs=-90,Os=1;class o0 extends nn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new In(Fs,Os,e,t);s.layers=this.layers,this.add(s);const r=new In(Fs,Os,e,t);r.layers=this.layers,this.add(r);const a=new In(Fs,Os,e,t);a.layers=this.layers,this.add(a);const c=new In(Fs,Os,e,t);c.layers=this.layers,this.add(c);const o=new In(Fs,Os,e,t);o.layers=this.layers,this.add(o);const l=new In(Fs,Os,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===di)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class l0 extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class c0{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=h0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function h0(){this._document.hidden===!1&&this.reset()}const dh=new Ot;class u0{constructor(e,t,n=0,s=1/0){this.ray=new Ya(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new sc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Tt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return dh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dh),this}intersectObject(e,t=!0,n=[]){return zl(e,this,n,t),n.sort(ph),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)zl(e[s],this,n,t);return n.sort(ph),n}}function ph(i,e){return i.distance-e.distance}function zl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)zl(r[a],e,t,!0)}}class mh{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Mt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Mt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const vc=class vc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};vc.prototype.isMatrix2=!0;let gh=vc;class f0 extends $i{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){ct("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function _h(i,e,t,n){const s=d0(n);switch(t){case au:return i*e;case Jl:return i*e/s.components*s.byteLength;case jl:return i*e/s.components*s.byteLength;case fs:return i*e*2/s.components*s.byteLength;case Ql:return i*e*2/s.components*s.byteLength;case ou:return i*e*3/s.components*s.byteLength;case ei:return i*e*4/s.components*s.byteLength;case ec:return i*e*4/s.components*s.byteLength;case Ta:case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rl:case ol:return Math.max(i,16)*Math.max(e,8)/4;case sl:case al:return Math.max(i,8)*Math.max(e,8)/2;case ll:case cl:case ul:case fl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case hl:case Ia:case dl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case xl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case yl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Tl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Al:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Cl:case Pl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Dl:case Il:return Math.ceil(i/4)*Math.ceil(e/4)*8;case La:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function d0(i){switch(i){case Ln:case nu:return{byteLength:1,components:1};case Cr:case iu:case Li:return{byteLength:2,components:1};case $l:case Kl:return{byteLength:2,components:4};case _i:case Zl:case Qn:return{byteLength:4,components:1};case su:case ru:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xl}}));typeof window<"u"&&(window.__THREE__?ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Nu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function p0(i){const e=new WeakMap;function t(c,o){const l=c.array,h=c.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(o,u),i.bufferData(o,l,h),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:f}}function n(c,o,l){const h=o.array,f=o.updateRanges;if(i.bindBuffer(l,c),f.length===0)i.bufferSubData(l,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var m0=`#ifdef USE_ALPHAHASH
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
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dp=`#ifdef USE_MORPHTARGETS
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
}`,Dm=`#define LAMBERT
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
}`,bt={alphahash_fragment:m0,alphahash_pars_fragment:g0,alphamap_fragment:_0,alphamap_pars_fragment:v0,alphatest_fragment:x0,alphatest_pars_fragment:y0,aomap_fragment:M0,aomap_pars_fragment:b0,batching_pars_vertex:S0,batching_vertex:w0,begin_vertex:E0,beginnormal_vertex:T0,bsdfs:A0,iridescence_fragment:R0,bumpmap_pars_fragment:C0,clipping_planes_fragment:P0,clipping_planes_pars_fragment:D0,clipping_planes_pars_vertex:I0,clipping_planes_vertex:L0,color_fragment:N0,color_pars_fragment:U0,color_pars_vertex:F0,color_vertex:O0,common:B0,cube_uv_reflection_fragment:k0,defaultnormal_vertex:z0,displacementmap_pars_vertex:V0,displacementmap_vertex:H0,emissivemap_fragment:G0,emissivemap_pars_fragment:W0,colorspace_fragment:X0,colorspace_pars_fragment:q0,envmap_fragment:Y0,envmap_common_pars_fragment:Z0,envmap_pars_fragment:$0,envmap_pars_vertex:K0,envmap_physical_pars_fragment:op,envmap_vertex:J0,fog_vertex:j0,fog_pars_vertex:Q0,fog_fragment:ep,fog_pars_fragment:tp,gradientmap_pars_fragment:np,lightmap_pars_fragment:ip,lights_lambert_fragment:sp,lights_lambert_pars_fragment:rp,lights_pars_begin:ap,lights_toon_fragment:lp,lights_toon_pars_fragment:cp,lights_phong_fragment:hp,lights_phong_pars_fragment:up,lights_physical_fragment:fp,lights_physical_pars_fragment:dp,lights_fragment_begin:pp,lights_fragment_maps:mp,lights_fragment_end:gp,lightprobes_pars_fragment:_p,logdepthbuf_fragment:vp,logdepthbuf_pars_fragment:xp,logdepthbuf_pars_vertex:yp,logdepthbuf_vertex:Mp,map_fragment:bp,map_pars_fragment:Sp,map_particle_fragment:wp,map_particle_pars_fragment:Ep,metalnessmap_fragment:Tp,metalnessmap_pars_fragment:Ap,morphinstance_vertex:Rp,morphcolor_vertex:Cp,morphnormal_vertex:Pp,morphtarget_pars_vertex:Dp,morphtarget_vertex:Ip,normal_fragment_begin:Lp,normal_fragment_maps:Np,normal_pars_fragment:Up,normal_pars_vertex:Fp,normal_vertex:Op,normalmap_pars_fragment:Bp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:zp,clearcoat_pars_fragment:Vp,iridescence_pars_fragment:Hp,opaque_fragment:Gp,packing:Wp,premultiplied_alpha_fragment:Xp,project_vertex:qp,dithering_fragment:Yp,dithering_pars_fragment:Zp,roughnessmap_fragment:$p,roughnessmap_pars_fragment:Kp,shadowmap_pars_fragment:Jp,shadowmap_pars_vertex:jp,shadowmap_vertex:Qp,shadowmask_pars_fragment:em,skinbase_vertex:tm,skinning_pars_vertex:nm,skinning_vertex:im,skinnormal_vertex:sm,specularmap_fragment:rm,specularmap_pars_fragment:am,tonemapping_fragment:om,tonemapping_pars_fragment:lm,transmission_fragment:cm,transmission_pars_fragment:hm,uv_pars_fragment:um,uv_pars_vertex:fm,uv_vertex:dm,worldpos_vertex:pm,background_vert:mm,background_frag:gm,backgroundCube_vert:_m,backgroundCube_frag:vm,cube_vert:xm,cube_frag:ym,depth_vert:Mm,depth_frag:bm,distance_vert:Sm,distance_frag:wm,equirect_vert:Em,equirect_frag:Tm,linedashed_vert:Am,linedashed_frag:Rm,meshbasic_vert:Cm,meshbasic_frag:Pm,meshlambert_vert:Dm,meshlambert_frag:Im,meshmatcap_vert:Lm,meshmatcap_frag:Nm,meshnormal_vert:Um,meshnormal_frag:Fm,meshphong_vert:Om,meshphong_frag:Bm,meshphysical_vert:km,meshphysical_frag:zm,meshtoon_vert:Vm,meshtoon_frag:Hm,points_vert:Gm,points_frag:Wm,shadow_vert:Xm,shadow_frag:qm,sprite_vert:Ym,sprite_frag:Zm},ke={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},hi={basic:{uniforms:Sn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:Sn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new mt(0)},envMapIntensity:{value:1}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:Sn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:Sn([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:Sn([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new mt(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:Sn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:Sn([ke.points,ke.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:Sn([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:Sn([ke.common,ke.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:Sn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:Sn([ke.sprite,ke.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distance:{uniforms:Sn([ke.common,ke.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distance_vert,fragmentShader:bt.distance_frag},shadow:{uniforms:Sn([ke.lights,ke.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};hi.physical={uniforms:Sn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};const Ma={r:0,b:0,g:0},$m=new Ot,Uu=new pt;Uu.set(-1,0,0,0,1,0,0,0,1);function Km(i,e,t,n,s,r){const a=new mt(0);let c=s===!0?0:1,o,l,h=null,f=0,u=null;function d(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){const x=M.backgroundBlurriness>0;y=e.get(y,x)}return y}function g(M){let y=!1;const x=d(M);x===null?m(a,c):x&&x.isColor&&(m(x,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,y){const x=d(y);x&&(x.isCubeTexture||x.mapping===qa)?(l===void 0&&(l=new pe(new Ie(1,1,1),new vi({name:"BackgroundCubeMaterial",uniforms:js(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=x,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4($m.makeRotationFromEuler(y.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Uu),l.material.toneMapped=Dt.getTransfer(x.colorSpace)!==zt,(h!==x||f!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):x&&x.isTexture&&(o===void 0&&(o=new pe(new Qt(2,2),new vi({name:"BackgroundMaterial",uniforms:js(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=x,o.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,o.material.toneMapped=Dt.getTransfer(x.colorSpace)!==zt,x.matrixAutoUpdate===!0&&x.updateMatrix(),o.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||u!==i.toneMapping)&&(o.material.needsUpdate=!0,h=x,f=x.version,u=i.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function m(M,y){M.getRGB(Ma,Cu(i)),t.buffers.color.setClear(Ma.r,Ma.g,Ma.b,y,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,m(a,c)},render:g,addToRenderList:_,dispose:p}}function Jm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function c(N,F,Y,K,O){let Z=!1;const G=f(N,K,Y,F);r!==G&&(r=G,l(r.object)),Z=d(N,K,Y,O),Z&&g(N,K,Y,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,x(N,F,Y,K),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function o(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function f(N,F,Y,K){const O=K.wireframe===!0;let Z=n[F.id];Z===void 0&&(Z={},n[F.id]=Z);const G=N.isInstancedMesh===!0?N.id:0;let ie=Z[G];ie===void 0&&(ie={},Z[G]=ie);let le=ie[Y.id];le===void 0&&(le={},ie[Y.id]=le);let re=le[O];return re===void 0&&(re=u(o()),le[O]=re),re}function u(N){const F=[],Y=[],K=[];for(let O=0;O<t;O++)F[O]=0,Y[O]=0,K[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Y,attributeDivisors:K,object:N,attributes:{},index:null}}function d(N,F,Y,K){const O=r.attributes,Z=F.attributes;let G=0;const ie=Y.getAttributes();for(const le in ie)if(ie[le].location>=0){const fe=O[le];let ye=Z[le];if(ye===void 0&&(le==="instanceMatrix"&&N.instanceMatrix&&(ye=N.instanceMatrix),le==="instanceColor"&&N.instanceColor&&(ye=N.instanceColor)),fe===void 0||fe.attribute!==ye||ye&&fe.data!==ye.data)return!0;G++}return r.attributesNum!==G||r.index!==K}function g(N,F,Y,K){const O={},Z=F.attributes;let G=0;const ie=Y.getAttributes();for(const le in ie)if(ie[le].location>=0){let fe=Z[le];fe===void 0&&(le==="instanceMatrix"&&N.instanceMatrix&&(fe=N.instanceMatrix),le==="instanceColor"&&N.instanceColor&&(fe=N.instanceColor));const ye={};ye.attribute=fe,fe&&fe.data&&(ye.data=fe.data),O[le]=ye,G++}r.attributes=O,r.attributesNum=G,r.index=K}function _(){const N=r.newAttributes;for(let F=0,Y=N.length;F<Y;F++)N[F]=0}function m(N){p(N,0)}function p(N,F){const Y=r.newAttributes,K=r.enabledAttributes,O=r.attributeDivisors;Y[N]=1,K[N]===0&&(i.enableVertexAttribArray(N),K[N]=1),O[N]!==F&&(i.vertexAttribDivisor(N,F),O[N]=F)}function M(){const N=r.newAttributes,F=r.enabledAttributes;for(let Y=0,K=F.length;Y<K;Y++)F[Y]!==N[Y]&&(i.disableVertexAttribArray(Y),F[Y]=0)}function y(N,F,Y,K,O,Z,G){G===!0?i.vertexAttribIPointer(N,F,Y,O,Z):i.vertexAttribPointer(N,F,Y,K,O,Z)}function x(N,F,Y,K){_();const O=K.attributes,Z=Y.getAttributes(),G=F.defaultAttributeValues;for(const ie in Z){const le=Z[ie];if(le.location>=0){let re=O[ie];if(re===void 0&&(ie==="instanceMatrix"&&N.instanceMatrix&&(re=N.instanceMatrix),ie==="instanceColor"&&N.instanceColor&&(re=N.instanceColor)),re!==void 0){const fe=re.normalized,ye=re.itemSize,Xe=e.get(re);if(Xe===void 0)continue;const me=Xe.buffer,ue=Xe.type,q=Xe.bytesPerElement,he=ue===i.INT||ue===i.UNSIGNED_INT||re.gpuType===Zl;if(re.isInterleavedBufferAttribute){const ce=re.data,Se=ce.stride,Ve=re.offset;if(ce.isInstancedInterleavedBuffer){for(let Oe=0;Oe<le.locationSize;Oe++)p(le.location+Oe,ce.meshPerAttribute);N.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Oe=0;Oe<le.locationSize;Oe++)m(le.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,me);for(let Oe=0;Oe<le.locationSize;Oe++)y(le.location+Oe,ye/le.locationSize,ue,fe,Se*q,(Ve+ye/le.locationSize*Oe)*q,he)}else{if(re.isInstancedBufferAttribute){for(let ce=0;ce<le.locationSize;ce++)p(le.location+ce,re.meshPerAttribute);N.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ce=0;ce<le.locationSize;ce++)m(le.location+ce);i.bindBuffer(i.ARRAY_BUFFER,me);for(let ce=0;ce<le.locationSize;ce++)y(le.location+ce,ye/le.locationSize,ue,fe,ye*q,ye/le.locationSize*ce*q,he)}}else if(G!==void 0){const fe=G[ie];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(le.location,fe);break;case 3:i.vertexAttrib3fv(le.location,fe);break;case 4:i.vertexAttrib4fv(le.location,fe);break;default:i.vertexAttrib1fv(le.location,fe)}}}}M()}function w(){T();for(const N in n){const F=n[N];for(const Y in F){const K=F[Y];for(const O in K){const Z=K[O];for(const G in Z)h(Z[G].object),delete Z[G];delete K[O]}}delete n[N]}}function S(N){if(n[N.id]===void 0)return;const F=n[N.id];for(const Y in F){const K=F[Y];for(const O in K){const Z=K[O];for(const G in Z)h(Z[G].object),delete Z[G];delete K[O]}}delete n[N.id]}function R(N){for(const F in n){const Y=n[F];for(const K in Y){const O=Y[K];if(O[N.id]===void 0)continue;const Z=O[N.id];for(const G in Z)h(Z[G].object),delete Z[G];delete O[N.id]}}}function v(N){for(const F in n){const Y=n[F],K=N.isInstancedMesh===!0?N.id:0,O=Y[K];if(O!==void 0){for(const Z in O){const G=O[Z];for(const ie in G)h(G[ie].object),delete G[ie];delete O[Z]}delete Y[K],Object.keys(Y).length===0&&delete n[F]}}}function T(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function jm(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,h){h!==0&&(i.drawArraysInstanced(n,o,l,h),t.update(l,n,h))}function c(o,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function Qm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==ei&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(R){const v=R===Li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Ln&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Qn&&!v)}function o(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=o(l);h!==l&&(ct("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:x,maxSamples:w,samples:S}}function eg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ai,c=new pt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||s;return s=u,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,y=M*4;let x=p.clippingState||null;o.value=x,x=h(g,u,y,d);for(let w=0;w!==y;++w)x[w]=t[w];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const p=d+_*4,M=u.matrixWorldInverse;c.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,x=d;y!==_;++y,x+=4)a.copy(f[y]).applyMatrix4(M,c),a.normal.toArray(m,x),m[x+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const qi=4,vh=[.125,.215,.35,.446,.526,.582],os=20,tg=256,_r=new fc,xh=new mt;let Lo=null,No=0,Uo=0,Fo=!1;const ng=new L;class Vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=ng}=r;Lo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lo,No,Uo),this._renderer.xr.enabled=Fo,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lo=this._renderer.getRenderTarget(),No=this._renderer.getActiveCubeFace(),Uo=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Li,format:ei,colorSpace:Ua,depthBuffer:!1},s=yh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ig(r)),this._blurMaterial=rg(r,e,t),this._ggxMaterial=sg(r,e,t)}return s}_compileMaterial(e){const t=new pe(new sn,e);this._renderer.compile(t,_r)}_sceneToCubeUV(e,t,n,s,r){const o=new In(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(xh),f.toneMapping=pi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pe(new Ie,new ds({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(xh),p=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(o.up.set(0,l[y],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+h[y],r.y,r.z)):x===1?(o.up.set(0,0,l[y]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+h[y],r.z)):(o.up.set(0,l[y],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+h[y]));const w=this._cubeSize;Bs(s,x*w,y>2?w:0,w,w),f.setRenderTarget(s),p&&f.render(_,o),f.render(e,o)}f.toneMapping=d,f.autoClear=u,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===us||e.mapping===$s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;Bs(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,_r)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=0+l*1.25,d=f*u,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-qi?n-g+qi:0),p=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=d,o.mipInt.value=g-t,Bs(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(c,_r),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,Bs(e,m,p,3*_,2*_),s.setRenderTarget(e),s.render(c,_r)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Tt("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[s];f.material=l;const u=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*os-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):os;m>os&&ct(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${os}`);const p=[];let M=0;for(let R=0;R<os;++R){const v=R/_,T=Math.exp(-v*v/2);p.push(T),R===0?M+=T:R<m&&(M+=2*T)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",c&&(u.poleAxis.value=c);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-n;const x=this._sizeLods[s],w=3*x*(s>y-qi?s-y+qi:0),S=4*(this._cubeSize-x);Bs(t,w,S,3*x,2*x),o.setRenderTarget(t),o.render(f,_r)}}function ig(i){const e=[],t=[],n=[];let s=i;const r=i-qi+1+vh.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-qi?o=vh[a-i+qi-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),y=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let S=0;S<d;S++){const R=S%3*2/3-1,v=S>2?0:-1,T=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];M.set(T,_*g*S),y.set(u,m*g*S);const P=[S,S,S,S,S,S];x.set(P,p*g*S)}const w=new sn;w.setAttribute("position",new Hn(M,_)),w.setAttribute("uv",new Hn(y,m)),w.setAttribute("faceIndex",new Hn(x,p)),n.push(new pe(w,null)),s>qi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function yh(i,e,t){const n=new mi(i,e,t);return n.texture.mapping=qa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function sg(i,e,t){return new vi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:tg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function rg(i,e,t){const n=new Float32Array(os),s=new L(0,1,0);return new vi({name:"SphericalGaussianBlur",defines:{n:os,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Mh(){return new vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function bh(){return new vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function Za(){return`

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
	`}class Fu extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new vu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ie(5,5,5),r=new vi({name:"CubemapFromEquirect",uniforms:js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wn,blending:Pi});r.uniforms.tEquirect.value=t;const a=new pe(s,r),c=t.minFilter;return t.minFilter===ls&&(t.minFilter=xn),new o0(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function ag(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===eo||d===to)if(e.has(u)){const g=e.get(u).texture;return c(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const _=new Fu(g.height);return _.fromEquirectangularTexture(i,u),e.set(u,_),u.addEventListener("dispose",l),c(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,g=d===eo||d===to,_=d===us||d===$s;if(g||_){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Vl(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||_&&M&&o(M)?(n===null&&(n=new Vl(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function c(u,d){return d===eo?u.mapping=us:d===to&&(u.mapping=$s),u}function o(u){let d=0;const g=6;for(let _=0;_<g;_++)u[_]!==void 0&&d++;return d===g}function l(u){const d=u.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function og(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Xs("WebGLRenderer: "+n+" extension not supported."),s}}}function lg(i,e,t,n){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const d=r.get(u);d&&(e.remove(d),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function c(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function o(f){const u=f.attributes;for(const d in u)e.update(u[d],i.ARRAY_BUFFER)}function l(f){const u=[],d=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const M=d.array;_=d.version;for(let y=0,x=M.length;y<x;y+=3){const w=M[y+0],S=M[y+1],R=M[y+2];u.push(w,S,S,R,R,w)}}else{const M=g.array;_=g.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const w=y+0,S=y+1,R=y+2;u.push(w,S,S,R,R,w)}}const m=new(g.count>=65535?du:fu)(u,1);m.version=_;const p=r.get(f);p&&e.remove(p),r.set(f,m)}function h(f){const u=r.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:c,update:o,getWireframeAttribute:h}}function cg(i,e,t){let n;function s(f){n=f}let r,a;function c(f){r=f.type,a=f.bytesPerElement}function o(f,u){i.drawElements(n,u,r,f*a),t.update(u,n,1)}function l(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,r,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=u[m];t.update(_,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=h}function hg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:Tt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ug(i,e,t){const n=new WeakMap,s=new Jt;function r(a,c,o){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(c);if(u===void 0||u.count!==f){let T=function(){R.dispose(),n.delete(c),c.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();const d=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],M=c.morphAttributes.color||[];let y=0;d===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let x=c.attributes.position.count*y,w=1;x>e.maxTextureSize&&(w=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const S=new Float32Array(x*w*4*f),R=new cu(S,x,w,f);R.type=Qn,R.needsUpdate=!0;const v=y*4;for(let P=0;P<f;P++){const N=m[P],F=p[P],Y=M[P],K=x*w*4*P;for(let O=0;O<N.count;O++){const Z=O*v;d===!0&&(s.fromBufferAttribute(N,O),S[K+Z+0]=s.x,S[K+Z+1]=s.y,S[K+Z+2]=s.z,S[K+Z+3]=0),g===!0&&(s.fromBufferAttribute(F,O),S[K+Z+4]=s.x,S[K+Z+5]=s.y,S[K+Z+6]=s.z,S[K+Z+7]=0),_===!0&&(s.fromBufferAttribute(Y,O),S[K+Z+8]=s.x,S[K+Z+9]=s.y,S[K+Z+10]=s.z,S[K+Z+11]=Y.itemSize===4?s.w:1)}}u={count:f,texture:R,size:new J(x,w)},n.set(c,u),c.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=c.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function fg(i,e,t,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,f=l.geometry,u=e.get(l,f);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function c(){r=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const dg={[$h]:"LINEAR_TONE_MAPPING",[Kh]:"REINHARD_TONE_MAPPING",[Jh]:"CINEON_TONE_MAPPING",[Yl]:"ACES_FILMIC_TONE_MAPPING",[Qh]:"AGX_TONE_MAPPING",[eu]:"NEUTRAL_TONE_MAPPING",[jh]:"CUSTOM_TONE_MAPPING"};function pg(i,e,t,n,s,r){const a=new mi(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ks(e,t):void 0}),c=new mi(e,t,{type:Li,depthBuffer:!1,stencilBuffer:!1}),o=new sn;o.setAttribute("position",new At([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new At([0,2,0,0,2,0],2));const l=new t0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new pe(o,l),f=new fc(-1,1,1,-1,0,1);let u=null,d=null,g=!1,_,m=null,p=[],M=!1;this.setSize=function(y,x){a.setSize(y,x),c.setSize(y,x);for(let w=0;w<p.length;w++){const S=p[w];S.setSize&&S.setSize(y,x)}},this.setEffects=function(y){p=y,M=p.length>0&&p[0].isRenderPass===!0;const x=a.width,w=a.height;for(let S=0;S<p.length;S++){const R=p[S];R.setSize&&R.setSize(x,w)}},this.begin=function(y,x){if(g||y.toneMapping===pi&&p.length===0)return!1;if(m=x,x!==null){const w=x.width,S=x.height;(a.width!==w||a.height!==S)&&this.setSize(w,S)}return M===!1&&y.setRenderTarget(a),_=y.toneMapping,y.toneMapping=pi,!0},this.hasRenderPass=function(){return M},this.end=function(y,x){y.toneMapping=_,g=!0;let w=a,S=c;for(let R=0;R<p.length;R++){const v=p[R];if(v.enabled!==!1&&(v.render(y,S,w,x),v.needsSwap!==!1)){const T=w;w=S,S=T}}if(u!==y.outputColorSpace||d!==y.toneMapping){u=y.outputColorSpace,d=y.toneMapping,l.defines={},Dt.getTransfer(u)===zt&&(l.defines.SRGB_TRANSFER="");const R=dg[d];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(m),y.render(h,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const Ou=new yn,Hl=new Ks(1,1),Bu=new cu,ku=new ed,zu=new vu,Sh=[],wh=[],Eh=new Float32Array(16),Th=new Float32Array(9),Ah=new Float32Array(4);function er(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Sh[s];if(r===void 0&&(r=new Float32Array(s),Sh[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function on(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ln(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $a(i,e){let t=wh[e];t===void 0&&(t=new Int32Array(e),wh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function mg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2fv(this.addr,e),ln(t,e)}}function _g(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;i.uniform3fv(this.addr,e),ln(t,e)}}function vg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4fv(this.addr,e),ln(t,e)}}function xg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Ah.set(n),i.uniformMatrix2fv(this.addr,!1,Ah),ln(t,n)}}function yg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Th.set(n),i.uniformMatrix3fv(this.addr,!1,Th),ln(t,n)}}function Mg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(on(t,n))return;Eh.set(n),i.uniformMatrix4fv(this.addr,!1,Eh),ln(t,n)}}function bg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Sg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2iv(this.addr,e),ln(t,e)}}function wg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3iv(this.addr,e),ln(t,e)}}function Eg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4iv(this.addr,e),ln(t,e)}}function Tg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;i.uniform2uiv(this.addr,e),ln(t,e)}}function Rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;i.uniform3uiv(this.addr,e),ln(t,e)}}function Cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;i.uniform4uiv(this.addr,e),ln(t,e)}}function Pg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Hl.compareFunction=t.isReversedDepthBuffer()?nc:tc,r=Hl):r=Ou,t.setTexture2D(e||r,s)}function Dg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ku,s)}function Ig(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zu,s)}function Lg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Bu,s)}function Ng(i){switch(i){case 5126:return mg;case 35664:return gg;case 35665:return _g;case 35666:return vg;case 35674:return xg;case 35675:return yg;case 35676:return Mg;case 5124:case 35670:return bg;case 35667:case 35671:return Sg;case 35668:case 35672:return wg;case 35669:case 35673:return Eg;case 5125:return Tg;case 36294:return Ag;case 36295:return Rg;case 36296:return Cg;case 35678:case 36198:case 36298:case 36306:case 35682:return Pg;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Ig;case 36289:case 36303:case 36311:case 36292:return Lg}}function Ug(i,e){i.uniform1fv(this.addr,e)}function Fg(i,e){const t=er(e,this.size,2);i.uniform2fv(this.addr,t)}function Og(i,e){const t=er(e,this.size,3);i.uniform3fv(this.addr,t)}function Bg(i,e){const t=er(e,this.size,4);i.uniform4fv(this.addr,t)}function kg(i,e){const t=er(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function zg(i,e){const t=er(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Vg(i,e){const t=er(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hg(i,e){i.uniform1iv(this.addr,e)}function Gg(i,e){i.uniform2iv(this.addr,e)}function Wg(i,e){i.uniform3iv(this.addr,e)}function Xg(i,e){i.uniform4iv(this.addr,e)}function qg(i,e){i.uniform1uiv(this.addr,e)}function Yg(i,e){i.uniform2uiv(this.addr,e)}function Zg(i,e){i.uniform3uiv(this.addr,e)}function $g(i,e){i.uniform4uiv(this.addr,e)}function Kg(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Hl:a=Ou;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Jg(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ku,r[a])}function jg(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||zu,r[a])}function Qg(i,e,t){const n=this.cache,s=e.length,r=$a(t,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Bu,r[a])}function e_(i){switch(i){case 5126:return Ug;case 35664:return Fg;case 35665:return Og;case 35666:return Bg;case 35674:return kg;case 35675:return zg;case 35676:return Vg;case 5124:case 35670:return Hg;case 35667:case 35671:return Gg;case 35668:case 35672:return Wg;case 35669:case 35673:return Xg;case 5125:return qg;case 36294:return Yg;case 36295:return Zg;case 36296:return $g;case 35678:case 36198:case 36298:case 36306:case 35682:return Kg;case 35679:case 36299:case 36307:return Jg;case 35680:case 36300:case 36308:case 36293:return jg;case 36289:case 36303:case 36311:case 36292:return Qg}}class t_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ng(t.type)}}class n_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=e_(t.type)}}class i_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const Oo=/(\w+)(\])?(\[|\.)?/g;function Rh(i,e){i.seq.push(e),i.map[e.id]=e}function s_(i,e,t){const n=i.name,s=n.length;for(Oo.lastIndex=0;;){const r=Oo.exec(n),a=Oo.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){Rh(t,l===void 0?new t_(c,i,e):new n_(c,i,e));break}else{let f=t.map[c];f===void 0&&(f=new i_(c),Rh(t,f)),t=f}}}class Da{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);s_(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ch(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const r_=37297;let a_=0;function o_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const Ph=new pt;function l_(i){Dt._getMatrix(Ph,Dt.workingColorSpace,i);const e=`mat3( ${Ph.elements.map(t=>t.toFixed(4))} )`;switch(Dt.getTransfer(i)){case Fa:return[e,"LinearTransferOETF"];case zt:return[e,"sRGBTransferOETF"];default:return ct("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Dh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+o_(i.getShaderSource(e),c)}else return r}function c_(i,e){const t=l_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const h_={[$h]:"Linear",[Kh]:"Reinhard",[Jh]:"Cineon",[Yl]:"ACESFilmic",[Qh]:"AgX",[eu]:"Neutral",[jh]:"Custom"};function u_(i,e){const t=h_[e];return t===void 0?(ct("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ba=new L;function f_(){Dt.getLuminanceCoefficients(ba);const i=ba.x.toFixed(4),e=ba.y.toFixed(4),t=ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wr).join(`
`)}function p_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function m_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function wr(i){return i!==""}function Ih(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const g_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gl(i){return i.replace(g_,v_)}const __=new Map;function v_(i,e){let t=bt[e];if(t===void 0){const n=__.get(e);if(n!==void 0)t=bt[n],ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Gl(t)}const x_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nh(i){return i.replace(x_,y_)}function y_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const M_={[Er]:"SHADOWMAP_TYPE_PCF",[br]:"SHADOWMAP_TYPE_VSM"};function b_(i){return M_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const S_={[us]:"ENVMAP_TYPE_CUBE",[$s]:"ENVMAP_TYPE_CUBE",[qa]:"ENVMAP_TYPE_CUBE_UV"};function w_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":S_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const E_={[$s]:"ENVMAP_MODE_REFRACTION"};function T_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":E_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const A_={[ql]:"ENVMAP_BLENDING_MULTIPLY",[If]:"ENVMAP_BLENDING_MIX",[Lf]:"ENVMAP_BLENDING_ADD"};function R_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":A_[i.combine]||"ENVMAP_BLENDING_NONE"}function C_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function P_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=b_(t),l=w_(t),h=T_(t),f=R_(t),u=C_(t),d=d_(t),g=p_(r),_=s.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(wr).join(`
`),p.length>0&&(p+=`
`)):(m=[Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wr).join(`
`),p=[Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pi?"#define TONE_MAPPING":"",t.toneMapping!==pi?bt.tonemapping_pars_fragment:"",t.toneMapping!==pi?u_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,c_("linearToOutputTexel",t.outputColorSpace),f_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wr).join(`
`)),a=Gl(a),a=Ih(a,t),a=Lh(a,t),c=Gl(c),c=Ih(c,t),c=Lh(c,t),a=Nh(a),c=Nh(c),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Lc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+a,x=M+p+c,w=Ch(s,s.VERTEX_SHADER,y),S=Ch(s,s.FRAGMENT_SHADER,x);s.attachShader(_,w),s.attachShader(_,S),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(N){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",Y=s.getShaderInfoLog(w)||"",K=s.getShaderInfoLog(S)||"",O=F.trim(),Z=Y.trim(),G=K.trim();let ie=!0,le=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,S);else{const re=Dh(s,w,"vertex"),fe=Dh(s,S,"fragment");Tt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+O+`
`+re+`
`+fe)}else O!==""?ct("WebGLProgram: Program Info Log:",O):(Z===""||G==="")&&(le=!1);le&&(N.diagnostics={runnable:ie,programLog:O,vertexShader:{log:Z,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(w),s.deleteShader(S),v=new Da(s,_),T=m_(s,_)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(_,r_)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=a_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=S,this}let D_=0;class I_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new L_(e),t.set(e,n)),n}}class L_{constructor(e){this.id=D_++,this.code=e,this.usedTimes=0}}function N_(i){return i===fs||i===Ia||i===La}function U_(i,e,t,n,s,r){const a=new sc,c=new I_,o=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return o.add(v),v===0?"uv":`uv${v}`}function _(v,T,P,N,F,Y){const K=N.fog,O=F.geometry,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||Z,G),le=ie&&ie.mapping===qa?ie.image.height:null,re=d[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&ct("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const fe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ye=fe!==void 0?fe.length:0;let Xe=0;O.morphAttributes.position!==void 0&&(Xe=1),O.morphAttributes.normal!==void 0&&(Xe=2),O.morphAttributes.color!==void 0&&(Xe=3);let me,ue,q,he;if(re){const qe=hi[re];me=qe.vertexShader,ue=qe.fragmentShader}else{me=v.vertexShader,ue=v.fragmentShader;const qe=c.getVertexShaderStage(v),Vt=c.getFragmentShaderStage(v);c.update(v,qe,Vt),q=qe.id,he=Vt.id}const ce=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),Ve=F.isInstancedMesh===!0,Oe=F.isBatchedMesh===!0,at=!!v.map,Je=!!v.matcap,oe=!!ie,de=!!v.aoMap,xe=!!v.lightMap,we=!!v.bumpMap&&v.wireframe===!1,Ee=!!v.normalMap,nt=!!v.displacementMap,Ze=!!v.emissiveMap,ot=!!v.metalnessMap,ht=!!v.roughnessMap,V=v.anisotropy>0,It=v.clearcoat>0,St=v.dispersion>0,D=v.iridescence>0,b=v.sheen>0,X=v.transmission>0,Q=V&&!!v.anisotropyMap,ae=It&&!!v.clearcoatMap,ve=It&&!!v.clearcoatNormalMap,Ae=It&&!!v.clearcoatRoughnessMap,se=D&&!!v.iridescenceMap,_e=D&&!!v.iridescenceThicknessMap,De=b&&!!v.sheenColorMap,je=b&&!!v.sheenRoughnessMap,Le=!!v.specularMap,Ce=!!v.specularColorMap,$e=!!v.specularIntensityMap,rt=X&&!!v.transmissionMap,ft=X&&!!v.thicknessMap,H=!!v.gradientMap,Re=!!v.alphaMap,ge=v.alphaTest>0,Pe=!!v.alphaHash,Be=!!v.extensions;let Me=pi;v.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Me=i.toneMapping);const Ke={shaderID:re,shaderType:v.type,shaderName:v.name,vertexShader:me,fragmentShader:ue,defines:v.defines,customVertexShaderID:q,customFragmentShaderID:he,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Oe,batchingColor:Oe&&F._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&F.instanceColor!==null,instancingMorph:Ve&&F.morphTexture!==null,outputColorSpace:ce===null?i.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Dt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:at,matcap:Je,envMap:oe,envMapMode:oe&&ie.mapping,envMapCubeUVHeight:le,aoMap:de,lightMap:xe,bumpMap:we,normalMap:Ee,displacementMap:nt,emissiveMap:Ze,normalMapObjectSpace:Ee&&v.normalMapType===Ff,normalMapTangentSpace:Ee&&v.normalMapType===Na,packedNormalMap:Ee&&v.normalMapType===Na&&N_(v.normalMap.format),metalnessMap:ot,roughnessMap:ht,anisotropy:V,anisotropyMap:Q,clearcoat:It,clearcoatMap:ae,clearcoatNormalMap:ve,clearcoatRoughnessMap:Ae,dispersion:St,iridescence:D,iridescenceMap:se,iridescenceThicknessMap:_e,sheen:b,sheenColorMap:De,sheenRoughnessMap:je,specularMap:Le,specularColorMap:Ce,specularIntensityMap:$e,transmission:X,transmissionMap:rt,thicknessMap:ft,gradientMap:H,opaque:v.transparent===!1&&v.blending===Ws&&v.alphaToCoverage===!1,alphaMap:Re,alphaTest:ge,alphaHash:Pe,combine:v.combine,mapUv:at&&g(v.map.channel),aoMapUv:de&&g(v.aoMap.channel),lightMapUv:xe&&g(v.lightMap.channel),bumpMapUv:we&&g(v.bumpMap.channel),normalMapUv:Ee&&g(v.normalMap.channel),displacementMapUv:nt&&g(v.displacementMap.channel),emissiveMapUv:Ze&&g(v.emissiveMap.channel),metalnessMapUv:ot&&g(v.metalnessMap.channel),roughnessMapUv:ht&&g(v.roughnessMap.channel),anisotropyMapUv:Q&&g(v.anisotropyMap.channel),clearcoatMapUv:ae&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ve&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:De&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:je&&g(v.sheenRoughnessMap.channel),specularMapUv:Le&&g(v.specularMap.channel),specularColorMapUv:Ce&&g(v.specularColorMap.channel),specularIntensityMapUv:$e&&g(v.specularIntensityMap.channel),transmissionMapUv:rt&&g(v.transmissionMap.channel),thicknessMapUv:ft&&g(v.thicknessMap.channel),alphaMapUv:Re&&g(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ee||V),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(at||Re),fog:!!K,useFog:v.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&Ee===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Se,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Xe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Me,decodeVideoTexture:at&&v.map.isVideoTexture===!0&&Dt.getTransfer(v.map.colorSpace)===zt,decodeVideoTextureEmissive:Ze&&v.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(v.emissiveMap.colorSpace)===zt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Kt,flipSided:v.side===wn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Be&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&v.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ke.vertexUv1s=o.has(1),Ke.vertexUv2s=o.has(2),Ke.vertexUv3s=o.has(3),o.clear(),Ke}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)T.push(P),T.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(p(T,v),M(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function p(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function y(v){const T=d[v.type];let P;if(T){const N=hi[T];P=jd.clone(N.uniforms)}else P=v.uniforms;return P}function x(v,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new P_(i,T,v,s),l.push(P),h.set(T,P)),P}function w(v){if(--v.usedTimes===0){const T=l.indexOf(v);l[T]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function S(v){c.remove(v)}function R(){c.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:y,acquireProgram:x,releaseProgram:w,releaseShaderCache:S,programs:l,dispose:R}}function F_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function O_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Fh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Oh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function c(u,d,g,_,m,p){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:d,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},i[e]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=g,M.materialVariant=a(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=p),e++,M}function o(u,d,g,_,m,p){const M=c(u,d,g,_,m,p);g.transmission>0?n.push(M):g.transparent===!0?s.push(M):t.push(M)}function l(u,d,g,_,m,p){const M=c(u,d,g,_,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,d,g){t.length>1&&t.sort(u||O_),n.length>1&&n.sort(d||Fh),s.length>1&&s.sort(d||Fh),g&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let u=e,d=i.length;u<d;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:f,sort:h}}function B_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Oh,i.set(n,[a])):s>=r.length?(a=new Oh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function k_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new mt};break;case"SpotLight":t={position:new L,direction:new L,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":t={color:new mt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function z_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let V_=0;function H_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function G_(i){const e=new k_,t=z_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new Ot,a=new Ot;function c(l){let h=0,f=0,u=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,y=0,x=0,w=0,S=0,R=0;l.sort(H_);for(let T=0,P=l.length;T<P;T++){const N=l[T],F=N.color,Y=N.intensity,K=N.distance;let O=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===fs?O=N.shadow.map.texture:O=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=F.r*Y,f+=F.g*Y,u+=F.b*Y;else if(N.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(N.sh.coefficients[Z],Y);R++}else if(N.isDirectionalLight){const Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const G=N.shadow,ie=t.get(N);ie.shadowIntensity=G.intensity,ie.shadowBias=G.bias,ie.shadowNormalBias=G.normalBias,ie.shadowRadius=G.radius,ie.shadowMapSize=G.mapSize,n.directionalShadow[d]=ie,n.directionalShadowMap[d]=O,n.directionalShadowMatrix[d]=N.shadow.matrix,M++}n.directional[d]=Z,d++}else if(N.isSpotLight){const Z=e.get(N);Z.position.setFromMatrixPosition(N.matrixWorld),Z.color.copy(F).multiplyScalar(Y),Z.distance=K,Z.coneCos=Math.cos(N.angle),Z.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Z.decay=N.decay,n.spot[_]=Z;const G=N.shadow;if(N.map&&(n.spotLightMap[w]=N.map,w++,G.updateMatrices(N),N.castShadow&&S++),n.spotLightMatrix[_]=G.matrix,N.castShadow){const ie=t.get(N);ie.shadowIntensity=G.intensity,ie.shadowBias=G.bias,ie.shadowNormalBias=G.normalBias,ie.shadowRadius=G.radius,ie.shadowMapSize=G.mapSize,n.spotShadow[_]=ie,n.spotShadowMap[_]=O,x++}_++}else if(N.isRectAreaLight){const Z=e.get(N);Z.color.copy(F).multiplyScalar(Y),Z.halfWidth.set(N.width*.5,0,0),Z.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=Z,m++}else if(N.isPointLight){const Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),Z.distance=N.distance,Z.decay=N.decay,N.castShadow){const G=N.shadow,ie=t.get(N);ie.shadowIntensity=G.intensity,ie.shadowBias=G.bias,ie.shadowNormalBias=G.normalBias,ie.shadowRadius=G.radius,ie.shadowMapSize=G.mapSize,ie.shadowCameraNear=G.camera.near,ie.shadowCameraFar=G.camera.far,n.pointShadow[g]=ie,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=N.shadow.matrix,y++}n.point[g]=Z,g++}else if(N.isHemisphereLight){const Z=e.get(N);Z.skyColor.copy(N.color).multiplyScalar(Y),Z.groundColor.copy(N.groundColor).multiplyScalar(Y),n.hemi[p]=Z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ke.LTC_FLOAT_1,n.rectAreaLTC2=ke.LTC_FLOAT_2):(n.rectAreaLTC1=ke.LTC_HALF_1,n.rectAreaLTC2=ke.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const v=n.hash;(v.directionalLength!==d||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==M||v.numPointShadows!==y||v.numSpotShadows!==x||v.numSpotMaps!==w||v.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+w-S,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=R,v.directionalLength=d,v.pointLength=g,v.spotLength=_,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=M,v.numPointShadows=y,v.numSpotShadows=x,v.numSpotMaps=w,v.numLightProbes=R,n.version=V_++)}function o(l,h){let f=0,u=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const y=l[p];if(y.isDirectionalLight){const x=n.directional[f];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(y.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),u++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:c,setupView:o,state:n}}function Bh(i){const e=new G_(i),t=[],n=[],s=[];function r(u){f.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function c(u){n.push(u)}function o(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function W_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new Bh(i),e.set(s,[c])):r>=a.length?(c=new Bh(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const X_=`void main() {
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
}`,Y_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Z_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],kh=new Ot,vr=new L,Bo=new L;function $_(i,e,t){let n=new rc;const s=new J,r=new J,a=new Jt,c=new i0,o=new s0,l={},h=t.maxTextureSize,f={[Yi]:wn,[wn]:Yi,[Kt]:Kt},u=new vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:X_,fragmentShader:q_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new sn;g.setAttribute("position",new Hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new pe(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Er;let p=this.type;this.render=function(S,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===df&&(ct("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Er);const T=i.getRenderTarget(),P=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Pi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Y=p!==this.type;Y&&R.traverse(function(K){K.material&&(Array.isArray(K.material)?K.material.forEach(O=>O.needsUpdate=!0):K.material.needsUpdate=!0)});for(let K=0,O=S.length;K<O;K++){const Z=S[K],G=Z.shadow;if(G===void 0){ct("WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ie=G.getFrameExtents();s.multiply(ie),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,G.mapSize.y=r.y));const le=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=le,G.map===null||Y===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===br){if(Z.isPointLight){ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new mi(s.x,s.y,{format:fs,type:Li,minFilter:xn,magFilter:xn,generateMipmaps:!1}),G.map.texture.name=Z.name+".shadowMap",G.map.depthTexture=new Ks(s.x,s.y,Qn),G.map.depthTexture.name=Z.name+".shadowMapDepth",G.map.depthTexture.format=Ni,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=fn,G.map.depthTexture.magFilter=fn}else Z.isPointLight?(G.map=new Fu(s.x),G.map.depthTexture=new xd(s.x,_i)):(G.map=new mi(s.x,s.y),G.map.depthTexture=new Ks(s.x,s.y,_i)),G.map.depthTexture.name=Z.name+".shadowMap",G.map.depthTexture.format=Ni,this.type===Er?(G.map.depthTexture.compareFunction=le?nc:tc,G.map.depthTexture.minFilter=xn,G.map.depthTexture.magFilter=xn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=fn,G.map.depthTexture.magFilter=fn);G.camera.updateProjectionMatrix()}const re=G.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<re;fe++){if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(G.map),i.clear());const ye=G.getViewport(fe);a.set(r.x*ye.x,r.y*ye.y,r.x*ye.z,r.y*ye.w),F.viewport(a)}if(Z.isPointLight){const ye=G.camera,Xe=G.matrix,me=Z.distance||ye.far;me!==ye.far&&(ye.far=me,ye.updateProjectionMatrix()),vr.setFromMatrixPosition(Z.matrixWorld),ye.position.copy(vr),Bo.copy(ye.position),Bo.add(Y_[fe]),ye.up.copy(Z_[fe]),ye.lookAt(Bo),ye.updateMatrixWorld(),Xe.makeTranslation(-vr.x,-vr.y,-vr.z),kh.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),G._frustum.setFromProjectionMatrix(kh,ye.coordinateSystem,ye.reversedDepth)}else G.updateMatrices(Z);n=G.getFrustum(),x(R,v,G.camera,Z,this.type)}G.isPointLightShadow!==!0&&this.type===br&&M(G,v),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,P,N)};function M(S,R){const v=e.update(_);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new mi(s.x,s.y,{format:fs,type:Li})),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(R,null,v,u,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(R,null,v,d,_,null)}function y(S,R,v,T){let P=null;const N=v.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(N!==void 0)P=N;else if(P=v.isPointLight===!0?o:c,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=P.uuid,Y=R.uuid;let K=l[F];K===void 0&&(K={},l[F]=K);let O=K[Y];O===void 0&&(O=P.clone(),K[Y]=O,R.addEventListener("dispose",w)),P=O}if(P.visible=R.visible,P.wireframe=R.wireframe,T===br?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:f[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const F=i.properties.get(P);F.light=v}return P}function x(S,R,v,T,P){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===br)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,S.matrixWorld);const Y=e.update(S),K=S.material;if(Array.isArray(K)){const O=Y.groups;for(let Z=0,G=O.length;Z<G;Z++){const ie=O[Z],le=K[ie.materialIndex];if(le&&le.visible){const re=y(S,le,T,P);S.onBeforeShadow(i,S,R,v,Y,re,ie),i.renderBufferDirect(v,null,Y,re,S,ie),S.onAfterShadow(i,S,R,v,Y,re,ie)}}}else if(K.visible){const O=y(S,K,T,P);S.onBeforeShadow(i,S,R,v,Y,O,null),i.renderBufferDirect(v,null,Y,O,S,null),S.onAfterShadow(i,S,R,v,Y,O,null)}}const F=S.children;for(let Y=0,K=F.length;Y<K;Y++)x(F[Y],R,v,T,P)}function w(S){S.target.removeEventListener("dispose",w);for(const v in l){const T=l[v],P=S.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function K_(i,e){function t(){let H=!1;const Re=new Jt;let ge=null;const Pe=new Jt(0,0,0,0);return{setMask:function(Be){ge!==Be&&!H&&(i.colorMask(Be,Be,Be,Be),ge=Be)},setLocked:function(Be){H=Be},setClear:function(Be,Me,Ke,qe,Vt){Vt===!0&&(Be*=qe,Me*=qe,Ke*=qe),Re.set(Be,Me,Ke,qe),Pe.equals(Re)===!1&&(i.clearColor(Be,Me,Ke,qe),Pe.copy(Re))},reset:function(){H=!1,ge=null,Pe.set(-1,0,0,0)}}}function n(){let H=!1,Re=!1,ge=null,Pe=null,Be=null;return{setReversed:function(Me){if(Re!==Me){const Ke=e.get("EXT_clip_control");Me?Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.ZERO_TO_ONE_EXT):Ke.clipControlEXT(Ke.LOWER_LEFT_EXT,Ke.NEGATIVE_ONE_TO_ONE_EXT),Re=Me;const qe=Be;Be=null,this.setClear(qe)}},getReversed:function(){return Re},setTest:function(Me){Me?ce(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(Me){ge!==Me&&!H&&(i.depthMask(Me),ge=Me)},setFunc:function(Me){if(Re&&(Me=qf[Me]),Pe!==Me){switch(Me){case Ko:i.depthFunc(i.NEVER);break;case Jo:i.depthFunc(i.ALWAYS);break;case jo:i.depthFunc(i.LESS);break;case Zs:i.depthFunc(i.LEQUAL);break;case Qo:i.depthFunc(i.EQUAL);break;case el:i.depthFunc(i.GEQUAL);break;case tl:i.depthFunc(i.GREATER);break;case nl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Pe=Me}},setLocked:function(Me){H=Me},setClear:function(Me){Be!==Me&&(Be=Me,Re&&(Me=1-Me),i.clearDepth(Me))},reset:function(){H=!1,ge=null,Pe=null,Be=null,Re=!1}}}function s(){let H=!1,Re=null,ge=null,Pe=null,Be=null,Me=null,Ke=null,qe=null,Vt=null;return{setTest:function(Ut){H||(Ut?ce(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(Ut){Re!==Ut&&!H&&(i.stencilMask(Ut),Re=Ut)},setFunc:function(Ut,Nn,dn){(ge!==Ut||Pe!==Nn||Be!==dn)&&(i.stencilFunc(Ut,Nn,dn),ge=Ut,Pe=Nn,Be=dn)},setOp:function(Ut,Nn,dn){(Me!==Ut||Ke!==Nn||qe!==dn)&&(i.stencilOp(Ut,Nn,dn),Me=Ut,Ke=Nn,qe=dn)},setLocked:function(Ut){H=Ut},setClear:function(Ut){Vt!==Ut&&(i.clearStencil(Ut),Vt=Ut)},reset:function(){H=!1,Re=null,ge=null,Pe=null,Be=null,Me=null,Ke=null,qe=null,Vt=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let h={},f={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,y=null,x=null,w=null,S=null,R=null,v=new mt(0,0,0),T=0,P=!1,N=null,F=null,Y=null,K=null,O=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,ie=0;const le=i.getParameter(i.VERSION);le.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(le)[1]),G=ie>=1):le.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),G=ie>=2);let re=null,fe={};const ye=i.getParameter(i.SCISSOR_BOX),Xe=i.getParameter(i.VIEWPORT),me=new Jt().fromArray(ye),ue=new Jt().fromArray(Xe);function q(H,Re,ge,Pe){const Be=new Uint8Array(4),Me=i.createTexture();i.bindTexture(H,Me),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ke=0;Ke<ge;Ke++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(Re,0,i.RGBA,1,1,Pe,0,i.RGBA,i.UNSIGNED_BYTE,Be):i.texImage2D(Re+Ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Be);return Me}const he={};he[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),he[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),he[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),ce(i.DEPTH_TEST),a.setFunc(Zs),we(!1),Ee(Rc),ce(i.CULL_FACE),de(Pi);function ce(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function Se(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function Ve(H,Re){return u[H]!==Re?(i.bindFramebuffer(H,Re),u[H]=Re,H===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Re),H===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Re),!0):!1}function Oe(H,Re){let ge=g,Pe=!1;if(H){ge=d.get(Re),ge===void 0&&(ge=[],d.set(Re,ge));const Be=H.textures;if(ge.length!==Be.length||ge[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,Ke=Be.length;Me<Ke;Me++)ge[Me]=i.COLOR_ATTACHMENT0+Me;ge.length=Be.length,Pe=!0}}else ge[0]!==i.BACK&&(ge[0]=i.BACK,Pe=!0);Pe&&i.drawBuffers(ge)}function at(H){return _!==H?(i.useProgram(H),_=H,!0):!1}const Je={[as]:i.FUNC_ADD,[mf]:i.FUNC_SUBTRACT,[gf]:i.FUNC_REVERSE_SUBTRACT};Je[_f]=i.MIN,Je[vf]=i.MAX;const oe={[xf]:i.ZERO,[yf]:i.ONE,[Mf]:i.SRC_COLOR,[Zo]:i.SRC_ALPHA,[Af]:i.SRC_ALPHA_SATURATE,[Ef]:i.DST_COLOR,[Sf]:i.DST_ALPHA,[bf]:i.ONE_MINUS_SRC_COLOR,[$o]:i.ONE_MINUS_SRC_ALPHA,[Tf]:i.ONE_MINUS_DST_COLOR,[wf]:i.ONE_MINUS_DST_ALPHA,[Rf]:i.CONSTANT_COLOR,[Cf]:i.ONE_MINUS_CONSTANT_COLOR,[Pf]:i.CONSTANT_ALPHA,[Df]:i.ONE_MINUS_CONSTANT_ALPHA};function de(H,Re,ge,Pe,Be,Me,Ke,qe,Vt,Ut){if(H===Pi){m===!0&&(Se(i.BLEND),m=!1);return}if(m===!1&&(ce(i.BLEND),m=!0),H!==pf){if(H!==p||Ut!==P){if((M!==as||w!==as)&&(i.blendEquation(i.FUNC_ADD),M=as,w=as),Ut)switch(H){case Ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cc:i.blendFunc(i.ONE,i.ONE);break;case Pc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Dc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Tt("WebGLState: Invalid blending: ",H);break}else switch(H){case Ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Cc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Pc:Tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dc:Tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Tt("WebGLState: Invalid blending: ",H);break}y=null,x=null,S=null,R=null,v.set(0,0,0),T=0,p=H,P=Ut}return}Be=Be||Re,Me=Me||ge,Ke=Ke||Pe,(Re!==M||Be!==w)&&(i.blendEquationSeparate(Je[Re],Je[Be]),M=Re,w=Be),(ge!==y||Pe!==x||Me!==S||Ke!==R)&&(i.blendFuncSeparate(oe[ge],oe[Pe],oe[Me],oe[Ke]),y=ge,x=Pe,S=Me,R=Ke),(qe.equals(v)===!1||Vt!==T)&&(i.blendColor(qe.r,qe.g,qe.b,Vt),v.copy(qe),T=Vt),p=H,P=!1}function xe(H,Re){H.side===Kt?Se(i.CULL_FACE):ce(i.CULL_FACE);let ge=H.side===wn;Re&&(ge=!ge),we(ge),H.blending===Ws&&H.transparent===!1?de(Pi):de(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),r.setMask(H.colorWrite);const Pe=H.stencilWrite;c.setTest(Pe),Pe&&(c.setMask(H.stencilWriteMask),c.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),c.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ze(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function we(H){N!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),N=H)}function Ee(H){H!==uf?(ce(i.CULL_FACE),H!==F&&(H===Rc?i.cullFace(i.BACK):H===ff?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),F=H}function nt(H){H!==Y&&(G&&i.lineWidth(H),Y=H)}function Ze(H,Re,ge){H?(ce(i.POLYGON_OFFSET_FILL),(K!==Re||O!==ge)&&(K=Re,O=ge,a.getReversed()&&(Re=-Re),i.polygonOffset(Re,ge))):Se(i.POLYGON_OFFSET_FILL)}function ot(H){H?ce(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function ht(H){H===void 0&&(H=i.TEXTURE0+Z-1),re!==H&&(i.activeTexture(H),re=H)}function V(H,Re,ge){ge===void 0&&(re===null?ge=i.TEXTURE0+Z-1:ge=re);let Pe=fe[ge];Pe===void 0&&(Pe={type:void 0,texture:void 0},fe[ge]=Pe),(Pe.type!==H||Pe.texture!==Re)&&(re!==ge&&(i.activeTexture(ge),re=ge),i.bindTexture(H,Re||he[H]),Pe.type=H,Pe.texture=Re)}function It(){const H=fe[re];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function St(){try{i.compressedTexImage2D(...arguments)}catch(H){Tt("WebGLState:",H)}}function D(){try{i.compressedTexImage3D(...arguments)}catch(H){Tt("WebGLState:",H)}}function b(){try{i.texSubImage2D(...arguments)}catch(H){Tt("WebGLState:",H)}}function X(){try{i.texSubImage3D(...arguments)}catch(H){Tt("WebGLState:",H)}}function Q(){try{i.compressedTexSubImage2D(...arguments)}catch(H){Tt("WebGLState:",H)}}function ae(){try{i.compressedTexSubImage3D(...arguments)}catch(H){Tt("WebGLState:",H)}}function ve(){try{i.texStorage2D(...arguments)}catch(H){Tt("WebGLState:",H)}}function Ae(){try{i.texStorage3D(...arguments)}catch(H){Tt("WebGLState:",H)}}function se(){try{i.texImage2D(...arguments)}catch(H){Tt("WebGLState:",H)}}function _e(){try{i.texImage3D(...arguments)}catch(H){Tt("WebGLState:",H)}}function De(H){return f[H]!==void 0?f[H]:i.getParameter(H)}function je(H,Re){f[H]!==Re&&(i.pixelStorei(H,Re),f[H]=Re)}function Le(H){me.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),me.copy(H))}function Ce(H){ue.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),ue.copy(H))}function $e(H,Re){let ge=l.get(Re);ge===void 0&&(ge=new WeakMap,l.set(Re,ge));let Pe=ge.get(H);Pe===void 0&&(Pe=i.getUniformBlockIndex(Re,H.name),ge.set(H,Pe))}function rt(H,Re){const Pe=l.get(Re).get(H);o.get(Re)!==Pe&&(i.uniformBlockBinding(Re,Pe,H.__bindingPointIndex),o.set(Re,Pe))}function ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},re=null,fe={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,y=null,x=null,w=null,S=null,R=null,v=new mt(0,0,0),T=0,P=!1,N=null,F=null,Y=null,K=null,O=null,me.set(0,0,i.canvas.width,i.canvas.height),ue.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:ce,disable:Se,bindFramebuffer:Ve,drawBuffers:Oe,useProgram:at,setBlending:de,setMaterial:xe,setFlipSided:we,setCullFace:Ee,setLineWidth:nt,setPolygonOffset:Ze,setScissorTest:ot,activeTexture:ht,bindTexture:V,unbindTexture:It,compressedTexImage2D:St,compressedTexImage3D:D,texImage2D:se,texImage3D:_e,pixelStorei:je,getParameter:De,updateUBOMapping:$e,uniformBlockBinding:rt,texStorage2D:ve,texStorage3D:Ae,texSubImage2D:b,texSubImage3D:X,compressedTexSubImage2D:Q,compressedTexSubImage3D:ae,scissor:Le,viewport:Ce,reset:ft}}function J_(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new J,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,b){return g?new OffscreenCanvas(D,b):Oa("canvas")}function m(D,b,X){let Q=1;const ae=St(D);if((ae.width>X||ae.height>X)&&(Q=X/Math.max(ae.width,ae.height)),Q<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ve=Math.floor(Q*ae.width),Ae=Math.floor(Q*ae.height);u===void 0&&(u=_(ve,Ae));const se=b?_(ve,Ae):u;return se.width=ve,se.height=Ae,se.getContext("2d").drawImage(D,0,0,ve,Ae),ct("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ve+"x"+Ae+")."),se}else return"data"in D&&ct("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),D;return D}function p(D){return D.generateMipmaps}function M(D){i.generateMipmap(D)}function y(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(D,b,X,Q,ae,ve=!1){if(D!==null){if(i[D]!==void 0)return i[D];ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Ae;Q&&(Ae=e.get("EXT_texture_norm16"),Ae||ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=b;if(b===i.RED&&(X===i.FLOAT&&(se=i.R32F),X===i.HALF_FLOAT&&(se=i.R16F),X===i.UNSIGNED_BYTE&&(se=i.R8),X===i.UNSIGNED_SHORT&&Ae&&(se=Ae.R16_EXT),X===i.SHORT&&Ae&&(se=Ae.R16_SNORM_EXT)),b===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.R8UI),X===i.UNSIGNED_SHORT&&(se=i.R16UI),X===i.UNSIGNED_INT&&(se=i.R32UI),X===i.BYTE&&(se=i.R8I),X===i.SHORT&&(se=i.R16I),X===i.INT&&(se=i.R32I)),b===i.RG&&(X===i.FLOAT&&(se=i.RG32F),X===i.HALF_FLOAT&&(se=i.RG16F),X===i.UNSIGNED_BYTE&&(se=i.RG8),X===i.UNSIGNED_SHORT&&Ae&&(se=Ae.RG16_EXT),X===i.SHORT&&Ae&&(se=Ae.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.RG8UI),X===i.UNSIGNED_SHORT&&(se=i.RG16UI),X===i.UNSIGNED_INT&&(se=i.RG32UI),X===i.BYTE&&(se=i.RG8I),X===i.SHORT&&(se=i.RG16I),X===i.INT&&(se=i.RG32I)),b===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.RGB8UI),X===i.UNSIGNED_SHORT&&(se=i.RGB16UI),X===i.UNSIGNED_INT&&(se=i.RGB32UI),X===i.BYTE&&(se=i.RGB8I),X===i.SHORT&&(se=i.RGB16I),X===i.INT&&(se=i.RGB32I)),b===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(se=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(se=i.RGBA16UI),X===i.UNSIGNED_INT&&(se=i.RGBA32UI),X===i.BYTE&&(se=i.RGBA8I),X===i.SHORT&&(se=i.RGBA16I),X===i.INT&&(se=i.RGBA32I)),b===i.RGB&&(X===i.UNSIGNED_SHORT&&Ae&&(se=Ae.RGB16_EXT),X===i.SHORT&&Ae&&(se=Ae.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(se=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(se=i.R11F_G11F_B10F)),b===i.RGBA){const _e=ve?Fa:Dt.getTransfer(ae);X===i.FLOAT&&(se=i.RGBA32F),X===i.HALF_FLOAT&&(se=i.RGBA16F),X===i.UNSIGNED_BYTE&&(se=_e===zt?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&Ae&&(se=Ae.RGBA16_EXT),X===i.SHORT&&Ae&&(se=Ae.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(se=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(se=i.RGB5_A1)}return(se===i.R16F||se===i.R32F||se===i.RG16F||se===i.RG32F||se===i.RGBA16F||se===i.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function w(D,b){let X;return D?b===null||b===_i||b===Pr?X=i.DEPTH24_STENCIL8:b===Qn?X=i.DEPTH32F_STENCIL8:b===Cr&&(X=i.DEPTH24_STENCIL8,ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===_i||b===Pr?X=i.DEPTH_COMPONENT24:b===Qn?X=i.DEPTH_COMPONENT32F:b===Cr&&(X=i.DEPTH_COMPONENT16),X}function S(D,b){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==fn&&D.minFilter!==xn?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function R(D){const b=D.target;b.removeEventListener("dispose",R),T(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&f.delete(b)}function v(D){const b=D.target;b.removeEventListener("dispose",v),N(b)}function T(D){const b=n.get(D);if(b.__webglInit===void 0)return;const X=D.source,Q=d.get(X);if(Q){const ae=Q[b.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&P(D),Object.keys(Q).length===0&&d.delete(X)}n.remove(D)}function P(D){const b=n.get(D);i.deleteTexture(b.__webglTexture);const X=D.source,Q=d.get(X);delete Q[b.__cacheKey],a.memory.textures--}function N(D){const b=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(b.__webglFramebuffer[Q]))for(let ae=0;ae<b.__webglFramebuffer[Q].length;ae++)i.deleteFramebuffer(b.__webglFramebuffer[Q][ae]);else i.deleteFramebuffer(b.__webglFramebuffer[Q]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[Q])}else{if(Array.isArray(b.__webglFramebuffer))for(let Q=0;Q<b.__webglFramebuffer.length;Q++)i.deleteFramebuffer(b.__webglFramebuffer[Q]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Q=0;Q<b.__webglColorRenderbuffer.length;Q++)b.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[Q]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const X=D.textures;for(let Q=0,ae=X.length;Q<ae;Q++){const ve=n.get(X[Q]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(X[Q])}n.remove(D)}let F=0;function Y(){F=0}function K(){return F}function O(D){F=D}function Z(){const D=F;return D>=s.maxTextures&&ct("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),F+=1,D}function G(D){const b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function ie(D,b){const X=n.get(D);if(D.isVideoTexture&&V(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&X.__version!==D.version){const Q=D.image;if(Q===null)ct("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)ct("WebGLRenderer: Texture marked for update but image is incomplete");else{Se(X,D,b);return}}else D.isExternalTexture&&(X.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+b)}function le(D,b){const X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){Se(X,D,b);return}else D.isExternalTexture&&(X.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+b)}function re(D,b){const X=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&X.__version!==D.version){Se(X,D,b);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+b)}function fe(D,b){const X=n.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&X.__version!==D.version){Ve(X,D,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+b)}const ye={[vn]:i.REPEAT,[Ci]:i.CLAMP_TO_EDGE,[il]:i.MIRRORED_REPEAT},Xe={[fn]:i.NEAREST,[Nf]:i.NEAREST_MIPMAP_NEAREST,[Yr]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[no]:i.LINEAR_MIPMAP_NEAREST,[ls]:i.LINEAR_MIPMAP_LINEAR},me={[Of]:i.NEVER,[Hf]:i.ALWAYS,[Bf]:i.LESS,[tc]:i.LEQUAL,[kf]:i.EQUAL,[nc]:i.GEQUAL,[zf]:i.GREATER,[Vf]:i.NOTEQUAL};function ue(D,b){if(b.type===Qn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===xn||b.magFilter===no||b.magFilter===Yr||b.magFilter===ls||b.minFilter===xn||b.minFilter===no||b.minFilter===Yr||b.minFilter===ls)&&ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,ye[b.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,ye[b.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,ye[b.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Xe[b.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Xe[b.minFilter]),b.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,me[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===fn||b.minFilter!==Yr&&b.minFilter!==ls||b.type===Qn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function q(D,b){let X=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",R));const Q=b.source;let ae=d.get(Q);ae===void 0&&(ae={},d.set(Q,ae));const ve=G(b);if(ve!==D.__cacheKey){ae[ve]===void 0&&(ae[ve]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),ae[ve].usedTimes++;const Ae=ae[D.__cacheKey];Ae!==void 0&&(ae[D.__cacheKey].usedTimes--,Ae.usedTimes===0&&P(b)),D.__cacheKey=ve,D.__webglTexture=ae[ve].texture}return X}function he(D,b,X){return Math.floor(Math.floor(D/X)/b)}function ce(D,b,X,Q){const ve=D.updateRanges;if(ve.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,X,Q,b.data);else{ve.sort((je,Le)=>je.start-Le.start);let Ae=0;for(let je=1;je<ve.length;je++){const Le=ve[Ae],Ce=ve[je],$e=Le.start+Le.count,rt=he(Ce.start,b.width,4),ft=he(Le.start,b.width,4);Ce.start<=$e+1&&rt===ft&&he(Ce.start+Ce.count-1,b.width,4)===rt?Le.count=Math.max(Le.count,Ce.start+Ce.count-Le.start):(++Ae,ve[Ae]=Ce)}ve.length=Ae+1;const se=t.getParameter(i.UNPACK_ROW_LENGTH),_e=t.getParameter(i.UNPACK_SKIP_PIXELS),De=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let je=0,Le=ve.length;je<Le;je++){const Ce=ve[je],$e=Math.floor(Ce.start/4),rt=Math.ceil(Ce.count/4),ft=$e%b.width,H=Math.floor($e/b.width),Re=rt,ge=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ft),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,ft,H,Re,ge,X,Q,b.data)}D.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,se),t.pixelStorei(i.UNPACK_SKIP_PIXELS,_e),t.pixelStorei(i.UNPACK_SKIP_ROWS,De)}}function Se(D,b,X){let Q=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Q=i.TEXTURE_3D);const ae=q(D,b),ve=b.source;t.bindTexture(Q,D.__webglTexture,i.TEXTURE0+X);const Ae=n.get(ve);if(ve.version!==Ae.__version||ae===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const ge=Dt.getPrimaries(Dt.workingColorSpace),Pe=b.colorSpace===Xi?null:Dt.getPrimaries(b.colorSpace),Be=b.colorSpace===Xi||ge===Pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let _e=m(b.image,!1,s.maxTextureSize);_e=It(b,_e);const De=r.convert(b.format,b.colorSpace),je=r.convert(b.type);let Le=x(b.internalFormat,De,je,b.normalized,b.colorSpace,b.isVideoTexture);ue(Q,b);let Ce;const $e=b.mipmaps,rt=b.isVideoTexture!==!0,ft=Ae.__version===void 0||ae===!0,H=ve.dataReady,Re=S(b,_e);if(b.isDepthTexture)Le=w(b.format===cs,b.type),ft&&(rt?t.texStorage2D(i.TEXTURE_2D,1,Le,_e.width,_e.height):t.texImage2D(i.TEXTURE_2D,0,Le,_e.width,_e.height,0,De,je,null));else if(b.isDataTexture)if($e.length>0){rt&&ft&&t.texStorage2D(i.TEXTURE_2D,Re,Le,$e[0].width,$e[0].height);for(let ge=0,Pe=$e.length;ge<Pe;ge++)Ce=$e[ge],rt?H&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Ce.width,Ce.height,De,je,Ce.data):t.texImage2D(i.TEXTURE_2D,ge,Le,Ce.width,Ce.height,0,De,je,Ce.data);b.generateMipmaps=!1}else rt?(ft&&t.texStorage2D(i.TEXTURE_2D,Re,Le,_e.width,_e.height),H&&ce(b,_e,De,je)):t.texImage2D(i.TEXTURE_2D,0,Le,_e.width,_e.height,0,De,je,_e.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){rt&&ft&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Le,$e[0].width,$e[0].height,_e.depth);for(let ge=0,Pe=$e.length;ge<Pe;ge++)if(Ce=$e[ge],b.format!==ei)if(De!==null)if(rt){if(H)if(b.layerUpdates.size>0){const Be=_h(Ce.width,Ce.height,b.format,b.type);for(const Me of b.layerUpdates){const Ke=Ce.data.subarray(Me*Be/Ce.data.BYTES_PER_ELEMENT,(Me+1)*Be/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,Me,Ce.width,Ce.height,1,De,Ke)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,Ce.width,Ce.height,_e.depth,De,Ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ge,Le,Ce.width,Ce.height,_e.depth,0,Ce.data,0,0);else ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ge,0,0,0,Ce.width,Ce.height,_e.depth,De,je,Ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ge,Le,Ce.width,Ce.height,_e.depth,0,De,je,Ce.data)}else{rt&&ft&&t.texStorage2D(i.TEXTURE_2D,Re,Le,$e[0].width,$e[0].height);for(let ge=0,Pe=$e.length;ge<Pe;ge++)Ce=$e[ge],b.format!==ei?De!==null?rt?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,ge,0,0,Ce.width,Ce.height,De,Ce.data):t.compressedTexImage2D(i.TEXTURE_2D,ge,Le,Ce.width,Ce.height,0,Ce.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?H&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,Ce.width,Ce.height,De,je,Ce.data):t.texImage2D(i.TEXTURE_2D,ge,Le,Ce.width,Ce.height,0,De,je,Ce.data)}else if(b.isDataArrayTexture)if(rt){if(ft&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Re,Le,_e.width,_e.height,_e.depth),H)if(b.layerUpdates.size>0){const ge=_h(_e.width,_e.height,b.format,b.type);for(const Pe of b.layerUpdates){const Be=_e.data.subarray(Pe*ge/_e.data.BYTES_PER_ELEMENT,(Pe+1)*ge/_e.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Pe,_e.width,_e.height,1,De,je,Be)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,De,je,_e.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,_e.width,_e.height,_e.depth,0,De,je,_e.data);else if(b.isData3DTexture)rt?(ft&&t.texStorage3D(i.TEXTURE_3D,Re,Le,_e.width,_e.height,_e.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,De,je,_e.data)):t.texImage3D(i.TEXTURE_3D,0,Le,_e.width,_e.height,_e.depth,0,De,je,_e.data);else if(b.isFramebufferTexture){if(ft)if(rt)t.texStorage2D(i.TEXTURE_2D,Re,Le,_e.width,_e.height);else{let ge=_e.width,Pe=_e.height;for(let Be=0;Be<Re;Be++)t.texImage2D(i.TEXTURE_2D,Be,Le,ge,Pe,0,De,je,null),ge>>=1,Pe>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const ge=i.canvas;if(ge.hasAttribute("layoutsubtree")||ge.setAttribute("layoutsubtree","true"),_e.parentNode!==ge){ge.appendChild(_e),f.add(b),ge.onpaint=Pe=>{const Be=Pe.changedElements;for(const Me of f)Be.includes(Me.image)&&(Me.needsUpdate=!0)},ge.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,_e);else{const Be=i.RGBA,Me=i.RGBA,Ke=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Be,Me,Ke,_e)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if($e.length>0){if(rt&&ft){const ge=St($e[0]);t.texStorage2D(i.TEXTURE_2D,Re,Le,ge.width,ge.height)}for(let ge=0,Pe=$e.length;ge<Pe;ge++)Ce=$e[ge],rt?H&&t.texSubImage2D(i.TEXTURE_2D,ge,0,0,De,je,Ce):t.texImage2D(i.TEXTURE_2D,ge,Le,De,je,Ce);b.generateMipmaps=!1}else if(rt){if(ft){const ge=St(_e);t.texStorage2D(i.TEXTURE_2D,Re,Le,ge.width,ge.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,De,je,_e)}else t.texImage2D(i.TEXTURE_2D,0,Le,De,je,_e);p(b)&&M(Q),Ae.__version=ve.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Ve(D,b,X){if(b.image.length!==6)return;const Q=q(D,b),ae=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+X);const ve=n.get(ae);if(ae.version!==ve.__version||Q===!0){t.activeTexture(i.TEXTURE0+X);const Ae=Dt.getPrimaries(Dt.workingColorSpace),se=b.colorSpace===Xi?null:Dt.getPrimaries(b.colorSpace),_e=b.colorSpace===Xi||Ae===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const De=b.isCompressedTexture||b.image[0].isCompressedTexture,je=b.image[0]&&b.image[0].isDataTexture,Le=[];for(let Me=0;Me<6;Me++)!De&&!je?Le[Me]=m(b.image[Me],!0,s.maxCubemapSize):Le[Me]=je?b.image[Me].image:b.image[Me],Le[Me]=It(b,Le[Me]);const Ce=Le[0],$e=r.convert(b.format,b.colorSpace),rt=r.convert(b.type),ft=x(b.internalFormat,$e,rt,b.normalized,b.colorSpace),H=b.isVideoTexture!==!0,Re=ve.__version===void 0||Q===!0,ge=ae.dataReady;let Pe=S(b,Ce);ue(i.TEXTURE_CUBE_MAP,b);let Be;if(De){H&&Re&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,ft,Ce.width,Ce.height);for(let Me=0;Me<6;Me++){Be=Le[Me].mipmaps;for(let Ke=0;Ke<Be.length;Ke++){const qe=Be[Ke];b.format!==ei?$e!==null?H?ge&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,0,0,qe.width,qe.height,$e,qe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,ft,qe.width,qe.height,0,qe.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,0,0,qe.width,qe.height,$e,rt,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke,ft,qe.width,qe.height,0,$e,rt,qe.data)}}}else{if(Be=b.mipmaps,H&&Re){Be.length>0&&Pe++;const Me=St(Le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,ft,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(je){H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,Le[Me].width,Le[Me].height,$e,rt,Le[Me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ft,Le[Me].width,Le[Me].height,0,$e,rt,Le[Me].data);for(let Ke=0;Ke<Be.length;Ke++){const Vt=Be[Ke].image[Me].image;H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,0,0,Vt.width,Vt.height,$e,rt,Vt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,ft,Vt.width,Vt.height,0,$e,rt,Vt.data)}}else{H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,$e,rt,Le[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ft,$e,rt,Le[Me]);for(let Ke=0;Ke<Be.length;Ke++){const qe=Be[Ke];H?ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,0,0,$e,rt,qe.image[Me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Ke+1,ft,$e,rt,qe.image[Me])}}}p(b)&&M(i.TEXTURE_CUBE_MAP),ve.__version=ae.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Oe(D,b,X,Q,ae,ve){const Ae=r.convert(X.format,X.colorSpace),se=r.convert(X.type),_e=x(X.internalFormat,Ae,se,X.normalized,X.colorSpace),De=n.get(b),je=n.get(X);if(je.__renderTarget=b,!De.__hasExternalTextures){const Le=Math.max(1,b.width>>ve),Ce=Math.max(1,b.height>>ve);ae===i.TEXTURE_3D||ae===i.TEXTURE_2D_ARRAY?t.texImage3D(ae,ve,_e,Le,Ce,b.depth,0,Ae,se,null):t.texImage2D(ae,ve,_e,Le,Ce,0,Ae,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),ht(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,ae,je.__webglTexture,0,ot(b)):(ae===i.TEXTURE_2D||ae>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,ae,je.__webglTexture,ve),t.bindFramebuffer(i.FRAMEBUFFER,null)}function at(D,b,X){if(i.bindRenderbuffer(i.RENDERBUFFER,D),b.depthBuffer){const Q=b.depthTexture,ae=Q&&Q.isDepthTexture?Q.type:null,ve=w(b.stencilBuffer,ae),Ae=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ht(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(b),ve,b.width,b.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(b),ve,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ve,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,D)}else{const Q=b.textures;for(let ae=0;ae<Q.length;ae++){const ve=Q[ae],Ae=r.convert(ve.format,ve.colorSpace),se=r.convert(ve.type),_e=x(ve.internalFormat,Ae,se,ve.normalized,ve.colorSpace);ht(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot(b),_e,b.width,b.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot(b),_e,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,_e,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Je(D,b,X){const Q=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ae=n.get(b.depthTexture);if(ae.__renderTarget=b,(!ae.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Q){if(ae.__webglInit===void 0&&(ae.__webglInit=!0,b.depthTexture.addEventListener("dispose",R)),ae.__webglTexture===void 0){ae.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),ue(i.TEXTURE_CUBE_MAP,b.depthTexture);const De=r.convert(b.depthTexture.format),je=r.convert(b.depthTexture.type);let Le;b.depthTexture.format===Ni?Le=i.DEPTH_COMPONENT24:b.depthTexture.format===cs&&(Le=i.DEPTH24_STENCIL8);for(let Ce=0;Ce<6;Ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0,Le,b.width,b.height,0,De,je,null)}}else ie(b.depthTexture,0);const ve=ae.__webglTexture,Ae=ot(b),se=Q?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,_e=b.depthTexture.format===cs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ni)ht(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,se,ve,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,_e,se,ve,0);else if(b.depthTexture.format===cs)ht(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,se,ve,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,_e,se,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function oe(D){const b=n.get(D),X=D.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==D.depthTexture){const Q=D.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Q){const ae=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Q.removeEventListener("dispose",ae)};Q.addEventListener("dispose",ae),b.__depthDisposeCallback=ae}b.__boundDepthTexture=Q}if(D.depthTexture&&!b.__autoAllocateDepthBuffer)if(X)for(let Q=0;Q<6;Q++)Je(b.__webglFramebuffer[Q],D,Q);else{const Q=D.texture.mipmaps;Q&&Q.length>0?Je(b.__webglFramebuffer[0],D,0):Je(b.__webglFramebuffer,D,0)}else if(X){b.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[Q]),b.__webglDepthbuffer[Q]===void 0)b.__webglDepthbuffer[Q]=i.createRenderbuffer(),at(b.__webglDepthbuffer[Q],D,!1);else{const ae=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=b.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ve)}}else{const Q=D.texture.mipmaps;if(Q&&Q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),at(b.__webglDepthbuffer,D,!1);else{const ae=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,ae,i.RENDERBUFFER,ve)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(D,b,X){const Q=n.get(D);b!==void 0&&Oe(Q.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&oe(D)}function xe(D){const b=D.texture,X=n.get(D),Q=n.get(b);D.addEventListener("dispose",v);const ae=D.textures,ve=D.isWebGLCubeRenderTarget===!0,Ae=ae.length>1;if(Ae||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=b.version,a.memory.textures++),ve){X.__webglFramebuffer=[];for(let se=0;se<6;se++)if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer[se]=[];for(let _e=0;_e<b.mipmaps.length;_e++)X.__webglFramebuffer[se][_e]=i.createFramebuffer()}else X.__webglFramebuffer[se]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer=[];for(let se=0;se<b.mipmaps.length;se++)X.__webglFramebuffer[se]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let se=0,_e=ae.length;se<_e;se++){const De=n.get(ae[se]);De.__webglTexture===void 0&&(De.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&ht(D)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let se=0;se<ae.length;se++){const _e=ae[se];X.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[se]);const De=r.convert(_e.format,_e.colorSpace),je=r.convert(_e.type),Le=x(_e.internalFormat,De,je,_e.normalized,_e.colorSpace,D.isXRRenderTarget===!0),Ce=ot(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Le,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,X.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),at(X.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ve){t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),ue(i.TEXTURE_CUBE_MAP,b);for(let se=0;se<6;se++)if(b.mipmaps&&b.mipmaps.length>0)for(let _e=0;_e<b.mipmaps.length;_e++)Oe(X.__webglFramebuffer[se][_e],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,_e);else Oe(X.__webglFramebuffer[se],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);p(b)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let se=0,_e=ae.length;se<_e;se++){const De=ae[se],je=n.get(De);let Le=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Le=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Le,je.__webglTexture),ue(Le,De),Oe(X.__webglFramebuffer,D,De,i.COLOR_ATTACHMENT0+se,Le,0),p(De)&&M(Le)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(se=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,Q.__webglTexture),ue(se,b),b.mipmaps&&b.mipmaps.length>0)for(let _e=0;_e<b.mipmaps.length;_e++)Oe(X.__webglFramebuffer[_e],D,b,i.COLOR_ATTACHMENT0,se,_e);else Oe(X.__webglFramebuffer,D,b,i.COLOR_ATTACHMENT0,se,0);p(b)&&M(se),t.unbindTexture()}D.depthBuffer&&oe(D)}function we(D){const b=D.textures;for(let X=0,Q=b.length;X<Q;X++){const ae=b[X];if(p(ae)){const ve=y(D),Ae=n.get(ae).__webglTexture;t.bindTexture(ve,Ae),M(ve),t.unbindTexture()}}}const Ee=[],nt=[];function Ze(D){if(D.samples>0){if(ht(D)===!1){const b=D.textures,X=D.width,Q=D.height;let ae=i.COLOR_BUFFER_BIT;const ve=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(D),se=b.length>1;if(se)for(let De=0;De<b.length;De++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const _e=D.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let De=0;De<b.length;De++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ae|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ae|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[De]);const je=n.get(b[De]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,je,0)}i.blitFramebuffer(0,0,X,Q,0,0,X,Q,ae,i.NEAREST),o===!0&&(Ee.length=0,nt.length=0,Ee.push(i.COLOR_ATTACHMENT0+De),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Ee.push(ve),nt.push(ve),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,nt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let De=0;De<b.length;De++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[De]);const je=n.get(b[De]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&o){const b=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ot(D){return Math.min(s.maxSamples,D.samples)}function ht(D){const b=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function V(D){const b=a.render.frame;h.get(D)!==b&&(h.set(D,b),D.update())}function It(D,b){const X=D.colorSpace,Q=D.format,ae=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||X!==Ua&&X!==Xi&&(Dt.getTransfer(X)===zt?(Q!==ei||ae!==Ln)&&ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Tt("WebGLTextures: Unsupported texture color space:",X)),b}function St(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=Y,this.getTextureUnits=K,this.setTextureUnits=O,this.setTexture2D=ie,this.setTexture2DArray=le,this.setTexture3D=re,this.setTextureCube=fe,this.rebindTextures=de,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=Ze,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=ht,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function j_(i,e){function t(n,s=Xi){let r;const a=Dt.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===$l)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===su)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ru)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===nu)return i.BYTE;if(n===iu)return i.SHORT;if(n===Cr)return i.UNSIGNED_SHORT;if(n===Zl)return i.INT;if(n===_i)return i.UNSIGNED_INT;if(n===Qn)return i.FLOAT;if(n===Li)return i.HALF_FLOAT;if(n===au)return i.ALPHA;if(n===ou)return i.RGB;if(n===ei)return i.RGBA;if(n===Ni)return i.DEPTH_COMPONENT;if(n===cs)return i.DEPTH_STENCIL;if(n===Jl)return i.RED;if(n===jl)return i.RED_INTEGER;if(n===fs)return i.RG;if(n===Ql)return i.RG_INTEGER;if(n===ec)return i.RGBA_INTEGER;if(n===Ta||n===Aa||n===Ra||n===Ca)if(a===zt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ra)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sl||n===rl||n===al||n===ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===sl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ll||n===cl||n===hl||n===ul||n===fl||n===Ia||n===dl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ll||n===cl)return a===zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===hl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ul)return r.COMPRESSED_R11_EAC;if(n===fl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ia)return r.COMPRESSED_RG11_EAC;if(n===dl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===pl||n===ml||n===gl||n===_l||n===vl||n===xl||n===yl||n===Ml||n===bl||n===Sl||n===wl||n===El||n===Tl||n===Al)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ml)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_l)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ml)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Sl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===El)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Tl)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Al)return a===zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rl||n===Cl||n===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Rl)return a===zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Dl||n===Il||n===La||n===Ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Dl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Il)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===La)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Q_=`
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

}`;class tv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new xu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new vi({vertexShader:Q_,fragmentShader:ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pe(new Qt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class nv extends $i{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,h=null,f=null,u=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new tv,p={},M=t.getContextAttributes();let y=null,x=null;const w=[],S=[],R=new J;let v=null;const T=new In;T.viewport=new Jt;const P=new In;P.viewport=new Jt;const N=[T,P],F=new l0;let Y=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let he=w[q];return he===void 0&&(he=new co,w[q]=he),he.getTargetRaySpace()},this.getControllerGrip=function(q){let he=w[q];return he===void 0&&(he=new co,w[q]=he),he.getGripSpace()},this.getHand=function(q){let he=w[q];return he===void 0&&(he=new co,w[q]=he),he.getHandSpace()};function O(q){const he=S.indexOf(q.inputSource);if(he===-1)return;const ce=w[he];ce!==void 0&&(ce.update(q.inputSource,q.frame,l||a),ce.dispatchEvent({type:q.type,data:q.inputSource}))}function Z(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",G);for(let q=0;q<w.length;q++){const he=S[q];he!==null&&(S[q]=null,w[q].disconnect(he))}Y=null,K=null,m.reset();for(const q in p)delete p[q];e.setRenderTarget(y),d=null,u=null,f=null,s=null,x=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){c=q,n.isPresenting===!0&&ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",G),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Se=null,Ve=null;M.depth&&(Ve=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=M.stencil?cs:Ni,Se=M.stencil?Pr:_i);const Oe={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Oe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new mi(u.textureWidth,u.textureHeight,{format:ei,type:Ln,depthTexture:new Ks(u.textureWidth,u.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ce={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new mi(d.framebufferWidth,d.framebufferHeight,{format:ei,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),ue.setContext(s),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(q){for(let he=0;he<q.removed.length;he++){const ce=q.removed[he],Se=S.indexOf(ce);Se>=0&&(S[Se]=null,w[Se].disconnect(ce))}for(let he=0;he<q.added.length;he++){const ce=q.added[he];let Se=S.indexOf(ce);if(Se===-1){for(let Oe=0;Oe<w.length;Oe++)if(Oe>=S.length){S.push(ce),Se=Oe;break}else if(S[Oe]===null){S[Oe]=ce,Se=Oe;break}if(Se===-1)break}const Ve=w[Se];Ve&&Ve.connect(ce)}}const ie=new L,le=new L;function re(q,he,ce){ie.setFromMatrixPosition(he.matrixWorld),le.setFromMatrixPosition(ce.matrixWorld);const Se=ie.distanceTo(le),Ve=he.projectionMatrix.elements,Oe=ce.projectionMatrix.elements,at=Ve[14]/(Ve[10]-1),Je=Ve[14]/(Ve[10]+1),oe=(Ve[9]+1)/Ve[5],de=(Ve[9]-1)/Ve[5],xe=(Ve[8]-1)/Ve[0],we=(Oe[8]+1)/Oe[0],Ee=at*xe,nt=at*we,Ze=Se/(-xe+we),ot=Ze*-xe;if(he.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ot),q.translateZ(Ze),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ve[10]===-1)q.projectionMatrix.copy(he.projectionMatrix),q.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const ht=at+Ze,V=Je+Ze,It=Ee-ot,St=nt+(Se-ot),D=oe*Je/V*ht,b=de*Je/V*ht;q.projectionMatrix.makePerspective(It,St,D,b,ht,V),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function fe(q,he){he===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(he.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let he=q.near,ce=q.far;m.texture!==null&&(m.depthNear>0&&(he=m.depthNear),m.depthFar>0&&(ce=m.depthFar)),F.near=P.near=T.near=he,F.far=P.far=T.far=ce,(Y!==F.near||K!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),Y=F.near,K=F.far),F.layers.mask=q.layers.mask|6,T.layers.mask=F.layers.mask&-5,P.layers.mask=F.layers.mask&-3;const Se=q.parent,Ve=F.cameras;fe(F,Se);for(let Oe=0;Oe<Ve.length;Oe++)fe(Ve[Oe],Se);Ve.length===2?re(F,T,P):F.projectionMatrix.copy(T.projectionMatrix),ye(q,F,Se)};function ye(q,he,ce){ce===null?q.matrix.copy(he.matrixWorld):(q.matrix.copy(ce.matrixWorld),q.matrix.invert(),q.matrix.multiply(he.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(he.projectionMatrix),q.projectionMatrixInverse.copy(he.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ul*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&d===null))return o},this.setFoveation=function(q){o=q,u!==null&&(u.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(q){return p[q]};let Xe=null;function me(q,he){if(h=he.getViewerPose(l||a),g=he,h!==null){const ce=h.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let Se=!1;ce.length!==F.cameras.length&&(F.cameras.length=0,Se=!0);for(let Je=0;Je<ce.length;Je++){const oe=ce[Je];let de=null;if(d!==null)de=d.getViewport(oe);else{const we=f.getViewSubImage(u,oe);de=we.viewport,Je===0&&(e.setRenderTargetTextures(x,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(x))}let xe=N[Je];xe===void 0&&(xe=new In,xe.layers.enable(Je),xe.viewport=new Jt,N[Je]=xe),xe.matrix.fromArray(oe.transform.matrix),xe.matrix.decompose(xe.position,xe.quaternion,xe.scale),xe.projectionMatrix.fromArray(oe.projectionMatrix),xe.projectionMatrixInverse.copy(xe.projectionMatrix).invert(),xe.viewport.set(de.x,de.y,de.width,de.height),Je===0&&(F.matrix.copy(xe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Se===!0&&F.cameras.push(xe)}const Ve=s.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const Je=f.getDepthInformation(ce[0]);Je&&Je.isValid&&Je.texture&&m.init(Je,s.renderState)}if(Ve&&Ve.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let Je=0;Je<ce.length;Je++){const oe=ce[Je].camera;if(oe){let de=p[oe];de||(de=new xu,p[oe]=de);const xe=f.getCameraImage(oe);de.sourceTexture=xe}}}}for(let ce=0;ce<w.length;ce++){const Se=S[ce],Ve=w[ce];Se!==null&&Ve!==void 0&&Ve.update(Se,he,l||a)}Xe&&Xe(q,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),g=null}const ue=new Nu;ue.setAnimationLoop(me),this.setAnimationLoop=function(q){Xe=q},this.dispose=function(){}}}const iv=new Ot,Vu=new pt;Vu.set(-1,0,0,0,1,0,0,0,1);function sv(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Cu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,y,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&c(m,p)):p.isPointsMaterial?o(m,p,M,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===wn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===wn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),y=M.envMap,x=M.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(iv.makeRotationFromEuler(x)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Vu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function c(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===wn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function rv(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(x,w){const S=w.program;n.uniformBlockBinding(x,S)}function l(x,w){let S=s[x.id];S===void 0&&(m(x),S=h(x),s[x.id]=S,x.addEventListener("dispose",M));const R=w.program;n.updateUBOMapping(x,R);const v=e.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){const w=f();x.__bindingPointIndex=w;const S=i.createBuffer(),R=x.__size,v=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,S),S}function f(){for(let x=0;x<c;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const w=s[x.id],S=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let v=0,T=S.length;v<T;v++){const P=S[v];if(Array.isArray(P))for(let N=0,F=P.length;N<F;N++)d(P[N],v,N,R);else d(P,v,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,w,S,R){if(_(x,w,S,R)===!0){const v=x.__offset,T=x.value;if(Array.isArray(T)){let P=0;for(let N=0;N<T.length;N++){const F=T[N],Y=p(F);g(F,x.__data,P),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(P+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,x.__data)}}function g(x,w,S){typeof x=="number"||typeof x=="boolean"?w[0]=x:x.isMatrix3?(w[0]=x.elements[0],w[1]=x.elements[1],w[2]=x.elements[2],w[3]=0,w[4]=x.elements[3],w[5]=x.elements[4],w[6]=x.elements[5],w[7]=0,w[8]=x.elements[6],w[9]=x.elements[7],w[10]=x.elements[8],w[11]=0):ArrayBuffer.isView(x)?w.set(new x.constructor(x.buffer,x.byteOffset,w.length)):x.toArray(w,S)}function _(x,w,S,R){const v=x.value,T=w+"_"+S;if(R[T]===void 0)return typeof v=="number"||typeof v=="boolean"?R[T]=v:ArrayBuffer.isView(v)?R[T]=v.slice():R[T]=v.clone(),!0;{const P=R[T];if(typeof v=="number"||typeof v=="boolean"){if(P!==v)return R[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(P.equals(v)===!1)return P.copy(v),!0}}return!1}function m(x){const w=x.uniforms;let S=0;const R=16;for(let T=0,P=w.length;T<P;T++){const N=Array.isArray(w[T])?w[T]:[w[T]];for(let F=0,Y=N.length;F<Y;F++){const K=N[F],O=Array.isArray(K.value)?K.value:[K.value];for(let Z=0,G=O.length;Z<G;Z++){const ie=O[Z],le=p(ie),re=S%R,fe=re%le.boundary,ye=re+fe;S+=fe,ye!==0&&R-ye<le.storage&&(S+=R-ye),K.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=S,S+=le.storage}}}const v=S%R;return v>0&&(S+=R-v),x.__size=S,x.__cache={},this}function p(x){const w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(w.boundary=16,w.storage=x.byteLength):ct("WebGLRenderer: Unsupported uniform value type.",x),w}function M(x){const w=x.target;w.removeEventListener("dispose",M);const S=a.indexOf(w.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function y(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:o,update:l,dispose:y}}const av=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let li=null;function ov(){return li===null&&(li=new mu(av,16,16,fs,Li),li.name="DFG_LUT",li.minFilter=xn,li.magFilter=xn,li.wrapS=Ci,li.wrapT=Ci,li.generateMipmaps=!1,li.needsUpdate=!0),li}class lv{constructor(e={}){const{canvas:t=Wf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Ln}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=d,m=new Set([ec,Ql,jl]),p=new Set([Ln,_i,Cr,Pr,$l,Kl]),M=new Uint32Array(4),y=new Int32Array(4),x=new L;let w=null,S=null;const R=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,F=null,Y=null,K=null,O=null;this._outputColorSpace=un;let Z=0,G=0,ie=null,le=-1,re=null;const fe=new Jt,ye=new Jt;let Xe=null;const me=new mt(0);let ue=0,q=t.width,he=t.height,ce=1,Se=null,Ve=null;const Oe=new Jt(0,0,q,he),at=new Jt(0,0,q,he);let Je=!1;const oe=new rc;let de=!1,xe=!1;const we=new Ot,Ee=new L,nt=new Jt,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function ht(){return ie===null?ce:1}let V=n;function It(A,W){return t.getContext(A,W)}try{const A={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xl}`),t.addEventListener("webglcontextlost",Vt,!1),t.addEventListener("webglcontextrestored",Ut,!1),t.addEventListener("webglcontextcreationerror",Nn,!1),V===null){const W="webgl2";if(V=It(W,A),V===null)throw It(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw Tt("WebGLRenderer: "+A.message),A}let St,D,b,X,Q,ae,ve,Ae,se,_e,De,je,Le,Ce,$e,rt,ft,H,Re,ge,Pe,Be,Me;function Ke(){St=new og(V),St.init(),Pe=new j_(V,St),D=new Qm(V,St,e,Pe),b=new K_(V,St),D.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),Y=V.createFramebuffer(),K=V.createFramebuffer(),O=V.createFramebuffer(),X=new hg(V),Q=new F_,ae=new J_(V,St,b,Q,D,Pe,X),ve=new ag(P),Ae=new p0(V),Be=new Jm(V,Ae),se=new lg(V,Ae,X,Be),_e=new fg(V,se,Ae,Be,X),H=new ug(V,D,ae),$e=new eg(Q),De=new U_(P,ve,St,D,Be,$e),je=new sv(P,Q),Le=new B_,Ce=new W_(St),ft=new Km(P,ve,b,_e,g,o),rt=new $_(P,_e,D),Me=new rv(V,X,D,b),Re=new jm(V,St,X),ge=new cg(V,St,X),X.programs=De.programs,P.capabilities=D,P.extensions=St,P.properties=Q,P.renderLists=Le,P.shadowMap=rt,P.state=b,P.info=X}Ke(),_!==Ln&&(T=new pg(_,t.width,t.height,c,s,r));const qe=new nv(P,V);this.xr=qe,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const A=St.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=St.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(A){A!==void 0&&(ce=A,this.setSize(q,he,!1))},this.getSize=function(A){return A.set(q,he)},this.setSize=function(A,W,ne=!0){if(qe.isPresenting){ct("WebGLRenderer: Can't change size while VR device is presenting.");return}q=A,he=W,t.width=Math.floor(A*ce),t.height=Math.floor(W*ce),ne===!0&&(t.style.width=A+"px",t.style.height=W+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(q*ce,he*ce).floor()},this.setDrawingBufferSize=function(A,W,ne){q=A,he=W,ce=ne,t.width=Math.floor(A*ne),t.height=Math.floor(W*ne),this.setViewport(0,0,A,W)},this.setEffects=function(A){if(_===Ln){Tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let W=0;W<A.length;W++)if(A[W].isOutputPass===!0){ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(fe)},this.getViewport=function(A){return A.copy(Oe)},this.setViewport=function(A,W,ne,j){A.isVector4?Oe.set(A.x,A.y,A.z,A.w):Oe.set(A,W,ne,j),b.viewport(fe.copy(Oe).multiplyScalar(ce).round())},this.getScissor=function(A){return A.copy(at)},this.setScissor=function(A,W,ne,j){A.isVector4?at.set(A.x,A.y,A.z,A.w):at.set(A,W,ne,j),b.scissor(ye.copy(at).multiplyScalar(ce).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(A){b.setScissorTest(Je=A)},this.setOpaqueSort=function(A){Se=A},this.setTransparentSort=function(A){Ve=A},this.getClearColor=function(A){return A.copy(ft.getClearColor())},this.setClearColor=function(){ft.setClearColor(...arguments)},this.getClearAlpha=function(){return ft.getClearAlpha()},this.setClearAlpha=function(){ft.setClearAlpha(...arguments)},this.clear=function(A=!0,W=!0,ne=!0){let j=0;if(A){let ee=!1;if(ie!==null){const Ne=ie.texture.format;ee=m.has(Ne)}if(ee){const Ne=ie.texture.type,Ge=p.has(Ne),Ue=ft.getClearColor(),Ye=ft.getClearAlpha(),Qe=Ue.r,dt=Ue.g,gt=Ue.b;Ge?(M[0]=Qe,M[1]=dt,M[2]=gt,M[3]=Ye,V.clearBufferuiv(V.COLOR,0,M)):(y[0]=Qe,y[1]=dt,y[2]=gt,y[3]=Ye,V.clearBufferiv(V.COLOR,0,y))}else j|=V.COLOR_BUFFER_BIT}W&&(j|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(j|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&V.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),F=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Vt,!1),t.removeEventListener("webglcontextrestored",Ut,!1),t.removeEventListener("webglcontextcreationerror",Nn,!1),ft.dispose(),Le.dispose(),Ce.dispose(),Q.dispose(),ve.dispose(),_e.dispose(),Be.dispose(),Me.dispose(),De.dispose(),qe.dispose(),qe.removeEventListener("sessionstart",nr),qe.removeEventListener("sessionend",ir),Gn.stop()};function Vt(A){A.preventDefault(),Ba("WebGLRenderer: Context Lost."),N=!0}function Ut(){Ba("WebGLRenderer: Context Restored."),N=!1;const A=X.autoReset,W=rt.enabled,ne=rt.autoUpdate,j=rt.needsUpdate,ee=rt.type;Ke(),X.autoReset=A,rt.enabled=W,rt.autoUpdate=ne,rt.needsUpdate=j,rt.type=ee}function Nn(A){Tt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function dn(A){const W=A.target;W.removeEventListener("dispose",dn),gs(W)}function gs(A){Br(A),Q.remove(A)}function Br(A){const W=Q.get(A).programs;W!==void 0&&(W.forEach(function(ne){De.releaseProgram(ne)}),A.isShaderMaterial&&De.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,ne,j,ee,Ne){W===null&&(W=Ze);const Ge=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,Ue=Hr(A,W,ne,j,ee);b.setMaterial(j,Ge);let Ye=ne.index,Qe=1;if(j.wireframe===!0){if(Ye=se.getWireframeAttribute(ne),Ye===void 0)return;Qe=2}const dt=ne.drawRange,gt=ne.attributes.position;let et=dt.start*Qe,Fe=(dt.start+dt.count)*Qe;Ne!==null&&(et=Math.max(et,Ne.start*Qe),Fe=Math.min(Fe,(Ne.start+Ne.count)*Qe)),Ye!==null?(et=Math.max(et,0),Fe=Math.min(Fe,Ye.count)):gt!=null&&(et=Math.max(et,0),Fe=Math.min(Fe,gt.count));const qt=Fe-et;if(qt<0||qt===1/0)return;Be.setup(ee,j,Ue,ne,Ye);let Yt,Lt=Re;if(Ye!==null&&(Yt=Ae.get(Ye),Lt=ge,Lt.setIndex(Yt)),ee.isMesh)j.wireframe===!0?(b.setLineWidth(j.wireframeLinewidth*ht()),Lt.setMode(V.LINES)):Lt.setMode(V.TRIANGLES);else if(ee.isLine){let rn=j.linewidth;rn===void 0&&(rn=1),b.setLineWidth(rn*ht()),ee.isLineSegments?Lt.setMode(V.LINES):ee.isLineLoop?Lt.setMode(V.LINE_LOOP):Lt.setMode(V.LINE_STRIP)}else ee.isPoints?Lt.setMode(V.POINTS):ee.isSprite&&Lt.setMode(V.TRIANGLES);if(ee.isBatchedMesh)if(St.get("WEBGL_multi_draw"))Lt.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{const rn=ee._multiDrawStarts,We=ee._multiDrawCounts,pn=ee._multiDrawCount,Rt=Ye?Ae.get(Ye).bytesPerElement:1,mn=Q.get(j).currentProgram.getUniforms();for(let Tn=0;Tn<pn;Tn++)mn.setValue(V,"_gl_DrawID",Tn),Lt.render(rn[Tn]/Rt,We[Tn])}else if(ee.isInstancedMesh)Lt.renderInstances(et,qt,ee.count);else if(ne.isInstancedBufferGeometry){const rn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,We=Math.min(ne.instanceCount,rn);Lt.renderInstances(et,qt,We)}else Lt.render(et,qt)};function ni(A,W,ne){A.transparent===!0&&A.side===Kt&&A.forceSinglePass===!1?(A.side=wn,A.needsUpdate=!0,vs(A,W,ne),A.side=Yi,A.needsUpdate=!0,vs(A,W,ne),A.side=Kt):vs(A,W,ne)}this.compile=function(A,W,ne=null){ne===null&&(ne=A),S=Ce.get(ne),S.init(W),v.push(S),ne.traverseVisible(function(ee){ee.isLight&&ee.layers.test(W.layers)&&(S.pushLight(ee),ee.castShadow&&S.pushShadow(ee))}),A!==ne&&A.traverseVisible(function(ee){ee.isLight&&ee.layers.test(W.layers)&&(S.pushLight(ee),ee.castShadow&&S.pushShadow(ee))}),S.setupLights();const j=new Set;return A.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;const Ne=ee.material;if(Ne)if(Array.isArray(Ne))for(let Ge=0;Ge<Ne.length;Ge++){const Ue=Ne[Ge];ni(Ue,ne,ee),j.add(Ue)}else ni(Ne,ne,ee),j.add(Ne)}),S=v.pop(),j},this.compileAsync=function(A,W,ne=null){const j=this.compile(A,W,ne);return new Promise(ee=>{function Ne(){if(j.forEach(function(Ge){Q.get(Ge).currentProgram.isReady()&&j.delete(Ge)}),j.size===0){ee(A);return}setTimeout(Ne,10)}St.get("KHR_parallel_shader_compile")!==null?Ne():setTimeout(Ne,10)})};let Ji=null;function tr(A){Ji&&Ji(A)}function nr(){Gn.stop()}function ir(){Gn.start()}const Gn=new Nu;Gn.setAnimationLoop(tr),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(A){Ji=A,qe.setAnimationLoop(A),A===null?Gn.stop():Gn.start()},qe.addEventListener("sessionstart",nr),qe.addEventListener("sessionend",ir),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){Tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(A,W);const ne=qe.enabled===!0&&qe.isPresenting===!0,j=T!==null&&(ie===null||ne)&&T.begin(P,ie);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),qe.enabled===!0&&qe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(qe.cameraAutoUpdate===!0&&qe.updateCamera(W),W=qe.getCamera()),A.isScene===!0&&A.onBeforeRender(P,A,W,ie),S=Ce.get(A,v.length),S.init(W),S.state.textureUnits=ae.getTextureUnits(),v.push(S),we.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),oe.setFromProjectionMatrix(we,di,W.reversedDepth),xe=this.localClippingEnabled,de=$e.init(this.clippingPlanes,xe),w=Le.get(A,R.length),w.init(),R.push(w),qe.enabled===!0&&qe.isPresenting===!0){const Ge=P.xr.getDepthSensingMesh();Ge!==null&&ji(Ge,W,-1/0,P.sortObjects)}ji(A,W,0,P.sortObjects),w.finish(),P.sortObjects===!0&&w.sort(Se,Ve,W.reversedDepth),ot=qe.enabled===!1||qe.isPresenting===!1||qe.hasDepthSensing()===!1,ot&&ft.addToRenderList(w,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),de===!0&&$e.beginShadows();const ee=S.state.shadowsArray;if(rt.render(ee,A,W),de===!0&&$e.endShadows(),(j&&T.hasRenderPass())===!1){const Ge=w.opaque,Ue=w.transmissive;if(S.setupLights(),W.isArrayCamera){const Ye=W.cameras;if(Ue.length>0)for(let Qe=0,dt=Ye.length;Qe<dt;Qe++){const gt=Ye[Qe];sr(Ge,Ue,A,gt)}ot&&ft.render(A);for(let Qe=0,dt=Ye.length;Qe<dt;Qe++){const gt=Ye[Qe];kr(w,A,gt,gt.viewport)}}else Ue.length>0&&sr(Ge,Ue,A,W),ot&&ft.render(A),kr(w,A,W)}ie!==null&&G===0&&(ae.updateMultisampleRenderTarget(ie),ae.updateRenderTargetMipmap(ie)),j&&T.end(P),A.isScene===!0&&A.onAfterRender(P,A,W),Be.resetDefaultState(),le=-1,re=null,v.pop(),v.length>0?(S=v[v.length-1],ae.setTextureUnits(S.state.textureUnits),de===!0&&$e.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,F!==null&&F.renderEnd()};function ji(A,W,ne,j){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)ne=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLightProbeGrid)S.pushLightProbeGrid(A);else if(A.isLight)S.pushLight(A),A.castShadow&&S.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||oe.intersectsSprite(A)){j&&nt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(we);const Ge=_e.update(A),Ue=A.material;Ue.visible&&w.push(A,Ge,Ue,ne,nt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||oe.intersectsObject(A))){const Ge=_e.update(A),Ue=A.material;if(j&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),nt.copy(A.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),nt.copy(Ge.boundingSphere.center)),nt.applyMatrix4(A.matrixWorld).applyMatrix4(we)),Array.isArray(Ue)){const Ye=Ge.groups;for(let Qe=0,dt=Ye.length;Qe<dt;Qe++){const gt=Ye[Qe],et=Ue[gt.materialIndex];et&&et.visible&&w.push(A,Ge,et,ne,nt.z,gt)}}else Ue.visible&&w.push(A,Ge,Ue,ne,nt.z,null)}}const Ne=A.children;for(let Ge=0,Ue=Ne.length;Ge<Ue;Ge++)ji(Ne[Ge],W,ne,j)}function kr(A,W,ne,j){const{opaque:ee,transmissive:Ne,transparent:Ge}=A;S.setupLightsView(ne),de===!0&&$e.setGlobalState(P.clippingPlanes,ne),j&&b.viewport(fe.copy(j)),ee.length>0&&_s(ee,W,ne),Ne.length>0&&_s(Ne,W,ne),Ge.length>0&&_s(Ge,W,ne),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function sr(A,W,ne,j){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[j.id]===void 0){const et=St.has("EXT_color_buffer_half_float")||St.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[j.id]=new mi(1,1,{generateMipmaps:!0,type:et?Li:Ln,minFilter:ls,samples:Math.max(4,D.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Dt.workingColorSpace})}const Ne=S.state.transmissionRenderTarget[j.id],Ge=j.viewport||fe;Ne.setSize(Ge.z*P.transmissionResolutionScale,Ge.w*P.transmissionResolutionScale);const Ue=P.getRenderTarget(),Ye=P.getActiveCubeFace(),Qe=P.getActiveMipmapLevel();P.setRenderTarget(Ne),P.getClearColor(me),ue=P.getClearAlpha(),ue<1&&P.setClearColor(16777215,.5),P.clear(),ot&&ft.render(ne);const dt=P.toneMapping;P.toneMapping=pi;const gt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),S.setupLightsView(j),de===!0&&$e.setGlobalState(P.clippingPlanes,j),_s(A,ne,j),ae.updateMultisampleRenderTarget(Ne),ae.updateRenderTargetMipmap(Ne),St.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let Fe=0,qt=W.length;Fe<qt;Fe++){const Yt=W[Fe],{object:Lt,geometry:rn,material:We,group:pn}=Yt;if(We.side===Kt&&Lt.layers.test(j.layers)){const Rt=We.side;We.side=wn,We.needsUpdate=!0,Qi(Lt,ne,j,rn,We,pn),We.side=Rt,We.needsUpdate=!0,et=!0}}et===!0&&(ae.updateMultisampleRenderTarget(Ne),ae.updateRenderTargetMipmap(Ne))}P.setRenderTarget(Ue,Ye,Qe),P.setClearColor(me,ue),gt!==void 0&&(j.viewport=gt),P.toneMapping=dt}function _s(A,W,ne){const j=W.isScene===!0?W.overrideMaterial:null;for(let ee=0,Ne=A.length;ee<Ne;ee++){const Ge=A[ee],{object:Ue,geometry:Ye,group:Qe}=Ge;let dt=Ge.material;dt.allowOverride===!0&&j!==null&&(dt=j),Ue.layers.test(ne.layers)&&Qi(Ue,W,ne,Ye,dt,Qe)}}function Qi(A,W,ne,j,ee,Ne){A.onBeforeRender(P,W,ne,j,ee,Ne),A.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ee.onBeforeRender(P,W,ne,j,A,Ne),ee.transparent===!0&&ee.side===Kt&&ee.forceSinglePass===!1?(ee.side=wn,ee.needsUpdate=!0,P.renderBufferDirect(ne,W,j,ee,A,Ne),ee.side=Yi,ee.needsUpdate=!0,P.renderBufferDirect(ne,W,j,ee,A,Ne),ee.side=Kt):P.renderBufferDirect(ne,W,j,ee,A,Ne),A.onAfterRender(P,W,ne,j,ee,Ne)}function vs(A,W,ne){W.isScene!==!0&&(W=Ze);const j=Q.get(A),ee=S.state.lights,Ne=S.state.shadowsArray,Ge=ee.state.version,Ue=De.getParameters(A,ee.state,Ne,W,ne,S.state.lightProbeGridArray),Ye=De.getProgramCacheKey(Ue);let Qe=j.programs;j.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?W.environment:null,j.fog=W.fog;const dt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;j.envMap=ve.get(A.envMap||j.environment,dt),j.envMapRotation=j.environment!==null&&A.envMap===null?W.environmentRotation:A.envMapRotation,Qe===void 0&&(A.addEventListener("dispose",dn),Qe=new Map,j.programs=Qe);let gt=Qe.get(Ye);if(gt!==void 0){if(j.currentProgram===gt&&j.lightsStateVersion===Ge)return Vr(A,Ue),gt}else Ue.uniforms=De.getUniforms(A),F!==null&&A.isNodeMaterial&&F.build(A,ne,Ue),A.onBeforeCompile(Ue,P),gt=De.acquireProgram(Ue,Ye),Qe.set(Ye,gt),j.uniforms=Ue.uniforms;const et=j.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(et.clippingPlanes=$e.uniform),Vr(A,Ue),j.needsLights=Ja(A),j.lightsStateVersion=Ge,j.needsLights&&(et.ambientLightColor.value=ee.state.ambient,et.lightProbe.value=ee.state.probe,et.directionalLights.value=ee.state.directional,et.directionalLightShadows.value=ee.state.directionalShadow,et.spotLights.value=ee.state.spot,et.spotLightShadows.value=ee.state.spotShadow,et.rectAreaLights.value=ee.state.rectArea,et.ltc_1.value=ee.state.rectAreaLTC1,et.ltc_2.value=ee.state.rectAreaLTC2,et.pointLights.value=ee.state.point,et.pointLightShadows.value=ee.state.pointShadow,et.hemisphereLights.value=ee.state.hemi,et.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,et.spotLightMatrix.value=ee.state.spotLightMatrix,et.spotLightMap.value=ee.state.spotLightMap,et.pointShadowMatrix.value=ee.state.pointShadowMatrix),j.lightProbeGrid=S.state.lightProbeGridArray.length>0,j.currentProgram=gt,j.uniformsList=null,gt}function zr(A){if(A.uniformsList===null){const W=A.currentProgram.getUniforms();A.uniformsList=Da.seqWithValue(W.seq,A.uniforms)}return A.uniformsList}function Vr(A,W){const ne=Q.get(A);ne.outputColorSpace=W.outputColorSpace,ne.batching=W.batching,ne.batchingColor=W.batchingColor,ne.instancing=W.instancing,ne.instancingColor=W.instancingColor,ne.instancingMorph=W.instancingMorph,ne.skinning=W.skinning,ne.morphTargets=W.morphTargets,ne.morphNormals=W.morphNormals,ne.morphColors=W.morphColors,ne.morphTargetsCount=W.morphTargetsCount,ne.numClippingPlanes=W.numClippingPlanes,ne.numIntersection=W.numClipIntersection,ne.vertexAlphas=W.vertexAlphas,ne.vertexTangents=W.vertexTangents,ne.toneMapping=W.toneMapping}function Wn(A,W){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(W.matrixWorld);for(let ne=0,j=A.length;ne<j;ne++){const ee=A[ne];if(ee.texture!==null&&ee.boundingBox.containsPoint(x))return ee}return null}function Hr(A,W,ne,j,ee){W.isScene!==!0&&(W=Ze),ae.resetTextureUnits();const Ne=W.fog,Ge=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?W.environment:null,Ue=ie===null?P.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Dt.workingColorSpace,Ye=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,Qe=ve.get(j.envMap||Ge,Ye),dt=j.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,gt=!!ne.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),et=!!ne.morphAttributes.position,Fe=!!ne.morphAttributes.normal,qt=!!ne.morphAttributes.color;let Yt=pi;j.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Yt=P.toneMapping);const Lt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,rn=Lt!==void 0?Lt.length:0,We=Q.get(j),pn=S.state.lights;if(de===!0&&(xe===!0||A!==re)){const Ht=A===re&&j.id===le;$e.setState(j,A,Ht)}let Rt=!1;j.version===We.__version?(We.needsLights&&We.lightsStateVersion!==pn.state.version||We.outputColorSpace!==Ue||ee.isBatchedMesh&&We.batching===!1||!ee.isBatchedMesh&&We.batching===!0||ee.isBatchedMesh&&We.batchingColor===!0&&ee.colorTexture===null||ee.isBatchedMesh&&We.batchingColor===!1&&ee.colorTexture!==null||ee.isInstancedMesh&&We.instancing===!1||!ee.isInstancedMesh&&We.instancing===!0||ee.isSkinnedMesh&&We.skinning===!1||!ee.isSkinnedMesh&&We.skinning===!0||ee.isInstancedMesh&&We.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&We.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&We.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&We.instancingMorph===!1&&ee.morphTexture!==null||We.envMap!==Qe||j.fog===!0&&We.fog!==Ne||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==$e.numPlanes||We.numIntersection!==$e.numIntersection)||We.vertexAlphas!==dt||We.vertexTangents!==gt||We.morphTargets!==et||We.morphNormals!==Fe||We.morphColors!==qt||We.toneMapping!==Yt||We.morphTargetsCount!==rn||!!We.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Rt=!0):(Rt=!0,We.__version=j.version);let mn=We.currentProgram;Rt===!0&&(mn=vs(j,W,ee),F&&j.isNodeMaterial&&F.onUpdateProgram(j,mn,We));let Tn=!1,ii=!1,An=!1;const Ft=mn.getUniforms(),Zt=We.uniforms;if(b.useProgram(mn.program)&&(Tn=!0,ii=!0,An=!0),j.id!==le&&(le=j.id,ii=!0),We.needsLights){const Ht=Wn(S.state.lightProbeGridArray,ee);We.lightProbeGrid!==Ht&&(We.lightProbeGrid=Ht,ii=!0)}if(Tn||re!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ft.setValue(V,"projectionMatrix",A.projectionMatrix),Ft.setValue(V,"viewMatrix",A.matrixWorldInverse);const Xn=Ft.map.cameraPosition;Xn!==void 0&&Xn.setValue(V,Ee.setFromMatrixPosition(A.matrixWorld)),D.logarithmicDepthBuffer&&Ft.setValue(V,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Ft.setValue(V,"isOrthographic",A.isOrthographicCamera===!0),re!==A&&(re=A,ii=!0,An=!0)}if(We.needsLights&&(pn.state.directionalShadowMap.length>0&&Ft.setValue(V,"directionalShadowMap",pn.state.directionalShadowMap,ae),pn.state.spotShadowMap.length>0&&Ft.setValue(V,"spotShadowMap",pn.state.spotShadowMap,ae),pn.state.pointShadowMap.length>0&&Ft.setValue(V,"pointShadowMap",pn.state.pointShadowMap,ae)),ee.isSkinnedMesh){Ft.setOptional(V,ee,"bindMatrix"),Ft.setOptional(V,ee,"bindMatrixInverse");const Ht=ee.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Ft.setValue(V,"boneTexture",Ht.boneTexture,ae))}ee.isBatchedMesh&&(Ft.setOptional(V,ee,"batchingTexture"),Ft.setValue(V,"batchingTexture",ee._matricesTexture,ae),Ft.setOptional(V,ee,"batchingIdTexture"),Ft.setValue(V,"batchingIdTexture",ee._indirectTexture,ae),Ft.setOptional(V,ee,"batchingColorTexture"),ee._colorsTexture!==null&&Ft.setValue(V,"batchingColorTexture",ee._colorsTexture,ae));const si=ne.morphAttributes;if((si.position!==void 0||si.normal!==void 0||si.color!==void 0)&&H.update(ee,ne,mn),(ii||We.receiveShadow!==ee.receiveShadow)&&(We.receiveShadow=ee.receiveShadow,Ft.setValue(V,"receiveShadow",ee.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&W.environment!==null&&(Zt.envMapIntensity.value=W.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=ov()),ii){if(Ft.setValue(V,"toneMappingExposure",P.toneMappingExposure),We.needsLights&&Ka(Zt,An),Ne&&j.fog===!0&&je.refreshFogUniforms(Zt,Ne),je.refreshMaterialUniforms(Zt,j,ce,he,S.state.transmissionRenderTarget[A.id]),We.needsLights&&We.lightProbeGrid){const Ht=We.lightProbeGrid;Zt.probesSH.value=Ht.texture,Zt.probesMin.value.copy(Ht.boundingBox.min),Zt.probesMax.value.copy(Ht.boundingBox.max),Zt.probesResolution.value.copy(Ht.resolution)}Da.upload(V,zr(We),Zt,ae)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Da.upload(V,zr(We),Zt,ae),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Ft.setValue(V,"center",ee.center),Ft.setValue(V,"modelViewMatrix",ee.modelViewMatrix),Ft.setValue(V,"normalMatrix",ee.normalMatrix),Ft.setValue(V,"modelMatrix",ee.matrixWorld),j.uniformsGroups!==void 0){const Ht=j.uniformsGroups;for(let Xn=0,xi=Ht.length;Xn<xi;Xn++){const Gr=Ht[Xn];Me.update(Gr,mn),Me.bind(Gr,mn)}}return mn}function Ka(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function Ja(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(A,W,ne){const j=Q.get(A);j.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),Q.get(A.texture).__webglTexture=W,Q.get(A.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:ne,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,W){const ne=Q.get(A);ne.__webglFramebuffer=W,ne.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,ne=0){ie=A,Z=W,G=ne;let j=null,ee=!1,Ne=!1;if(A){const Ue=Q.get(A);if(Ue.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(V.FRAMEBUFFER,Ue.__webglFramebuffer),fe.copy(A.viewport),ye.copy(A.scissor),Xe=A.scissorTest,b.viewport(fe),b.scissor(ye),b.setScissorTest(Xe),le=-1;return}else if(Ue.__webglFramebuffer===void 0)ae.setupRenderTarget(A);else if(Ue.__hasExternalTextures)ae.rebindTextures(A,Q.get(A.texture).__webglTexture,Q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const dt=A.depthTexture;if(Ue.__boundDepthTexture!==dt){if(dt!==null&&Q.has(dt)&&(A.width!==dt.image.width||A.height!==dt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ae.setupDepthRenderbuffer(A)}}const Ye=A.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Ne=!0);const Qe=Q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Qe[W])?j=Qe[W][ne]:j=Qe[W],ee=!0):A.samples>0&&ae.useMultisampledRTT(A)===!1?j=Q.get(A).__webglMultisampledFramebuffer:Array.isArray(Qe)?j=Qe[ne]:j=Qe,fe.copy(A.viewport),ye.copy(A.scissor),Xe=A.scissorTest}else fe.copy(Oe).multiplyScalar(ce).floor(),ye.copy(at).multiplyScalar(ce).floor(),Xe=Je;if(ne!==0&&(j=Y),b.bindFramebuffer(V.FRAMEBUFFER,j)&&b.drawBuffers(A,j),b.viewport(fe),b.scissor(ye),b.setScissorTest(Xe),ee){const Ue=Q.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ue.__webglTexture,ne)}else if(Ne){const Ue=W;for(let Ye=0;Ye<A.textures.length;Ye++){const Qe=Q.get(A.textures[Ye]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Ye,Qe.__webglTexture,ne,Ue)}}else if(A!==null&&ne!==0){const Ue=Q.get(A.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Ue.__webglTexture,ne)}le=-1},this.readRenderTargetPixels=function(A,W,ne,j,ee,Ne,Ge,Ue=0){if(!(A&&A.isWebGLRenderTarget)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ge!==void 0&&(Ye=Ye[Ge]),Ye){b.bindFramebuffer(V.FRAMEBUFFER,Ye);try{const Qe=A.textures[Ue],dt=Qe.format,gt=Qe.type;if(A.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Ue),!D.textureFormatReadable(dt)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!D.textureTypeReadable(gt)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-j&&ne>=0&&ne<=A.height-ee&&V.readPixels(W,ne,j,ee,Pe.convert(dt),Pe.convert(gt),Ne)}finally{const Qe=ie!==null?Q.get(ie).__webglFramebuffer:null;b.bindFramebuffer(V.FRAMEBUFFER,Qe)}}},this.readRenderTargetPixelsAsync=async function(A,W,ne,j,ee,Ne,Ge,Ue=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ge!==void 0&&(Ye=Ye[Ge]),Ye)if(W>=0&&W<=A.width-j&&ne>=0&&ne<=A.height-ee){b.bindFramebuffer(V.FRAMEBUFFER,Ye);const Qe=A.textures[Ue],dt=Qe.format,gt=Qe.type;if(A.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Ue),!D.textureFormatReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,et),V.bufferData(V.PIXEL_PACK_BUFFER,Ne.byteLength,V.STREAM_READ),V.readPixels(W,ne,j,ee,Pe.convert(dt),Pe.convert(gt),0);const Fe=ie!==null?Q.get(ie).__webglFramebuffer:null;b.bindFramebuffer(V.FRAMEBUFFER,Fe);const qt=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Xf(V,qt,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,et),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Ne),V.deleteBuffer(et),V.deleteSync(qt),Ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,W=null,ne=0){const j=Math.pow(2,-ne),ee=Math.floor(A.image.width*j),Ne=Math.floor(A.image.height*j),Ge=W!==null?W.x:0,Ue=W!==null?W.y:0;ae.setTexture2D(A,0),V.copyTexSubImage2D(V.TEXTURE_2D,ne,0,0,Ge,Ue,ee,Ne),b.unbindTexture()},this.copyTextureToTexture=function(A,W,ne=null,j=null,ee=0,Ne=0){let Ge,Ue,Ye,Qe,dt,gt,et,Fe,qt;const Yt=A.isCompressedTexture?A.mipmaps[Ne]:A.image;if(ne!==null)Ge=ne.max.x-ne.min.x,Ue=ne.max.y-ne.min.y,Ye=ne.isBox3?ne.max.z-ne.min.z:1,Qe=ne.min.x,dt=ne.min.y,gt=ne.isBox3?ne.min.z:0;else{const Zt=Math.pow(2,-ee);Ge=Math.floor(Yt.width*Zt),Ue=Math.floor(Yt.height*Zt),A.isDataArrayTexture?Ye=Yt.depth:A.isData3DTexture?Ye=Math.floor(Yt.depth*Zt):Ye=1,Qe=0,dt=0,gt=0}j!==null?(et=j.x,Fe=j.y,qt=j.z):(et=0,Fe=0,qt=0);const Lt=Pe.convert(W.format),rn=Pe.convert(W.type);let We;W.isData3DTexture?(ae.setTexture3D(W,0),We=V.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ae.setTexture2DArray(W,0),We=V.TEXTURE_2D_ARRAY):(ae.setTexture2D(W,0),We=V.TEXTURE_2D),b.activeTexture(V.TEXTURE0),b.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,W.flipY),b.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),b.pixelStorei(V.UNPACK_ALIGNMENT,W.unpackAlignment);const pn=b.getParameter(V.UNPACK_ROW_LENGTH),Rt=b.getParameter(V.UNPACK_IMAGE_HEIGHT),mn=b.getParameter(V.UNPACK_SKIP_PIXELS),Tn=b.getParameter(V.UNPACK_SKIP_ROWS),ii=b.getParameter(V.UNPACK_SKIP_IMAGES);b.pixelStorei(V.UNPACK_ROW_LENGTH,Yt.width),b.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Yt.height),b.pixelStorei(V.UNPACK_SKIP_PIXELS,Qe),b.pixelStorei(V.UNPACK_SKIP_ROWS,dt),b.pixelStorei(V.UNPACK_SKIP_IMAGES,gt);const An=A.isDataArrayTexture||A.isData3DTexture,Ft=W.isDataArrayTexture||W.isData3DTexture;if(A.isDepthTexture){const Zt=Q.get(A),si=Q.get(W),Ht=Q.get(Zt.__renderTarget),Xn=Q.get(si.__renderTarget);b.bindFramebuffer(V.READ_FRAMEBUFFER,Ht.__webglFramebuffer),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let xi=0;xi<Ye;xi++)An&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Q.get(A).__webglTexture,ee,gt+xi),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Q.get(W).__webglTexture,Ne,qt+xi)),V.blitFramebuffer(Qe,dt,Ge,Ue,et,Fe,Ge,Ue,V.DEPTH_BUFFER_BIT,V.NEAREST);b.bindFramebuffer(V.READ_FRAMEBUFFER,null),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(ee!==0||A.isRenderTargetTexture||Q.has(A)){const Zt=Q.get(A),si=Q.get(W);b.bindFramebuffer(V.READ_FRAMEBUFFER,K),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,O);for(let Ht=0;Ht<Ye;Ht++)An?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Zt.__webglTexture,ee,gt+Ht):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Zt.__webglTexture,ee),Ft?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,si.__webglTexture,Ne,qt+Ht):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,si.__webglTexture,Ne),ee!==0?V.blitFramebuffer(Qe,dt,Ge,Ue,et,Fe,Ge,Ue,V.COLOR_BUFFER_BIT,V.NEAREST):Ft?V.copyTexSubImage3D(We,Ne,et,Fe,qt+Ht,Qe,dt,Ge,Ue):V.copyTexSubImage2D(We,Ne,et,Fe,Qe,dt,Ge,Ue);b.bindFramebuffer(V.READ_FRAMEBUFFER,null),b.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Ft?A.isDataTexture||A.isData3DTexture?V.texSubImage3D(We,Ne,et,Fe,qt,Ge,Ue,Ye,Lt,rn,Yt.data):W.isCompressedArrayTexture?V.compressedTexSubImage3D(We,Ne,et,Fe,qt,Ge,Ue,Ye,Lt,Yt.data):V.texSubImage3D(We,Ne,et,Fe,qt,Ge,Ue,Ye,Lt,rn,Yt):A.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Ne,et,Fe,Ge,Ue,Lt,rn,Yt.data):A.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Ne,et,Fe,Yt.width,Yt.height,Lt,Yt.data):V.texSubImage2D(V.TEXTURE_2D,Ne,et,Fe,Ge,Ue,Lt,rn,Yt);b.pixelStorei(V.UNPACK_ROW_LENGTH,pn),b.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Rt),b.pixelStorei(V.UNPACK_SKIP_PIXELS,mn),b.pixelStorei(V.UNPACK_SKIP_ROWS,Tn),b.pixelStorei(V.UNPACK_SKIP_IMAGES,ii),Ne===0&&W.generateMipmaps&&V.generateMipmap(We),b.unbindTexture()},this.initRenderTarget=function(A){Q.get(A).__webglFramebuffer===void 0&&ae.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ae.setTextureCube(A,0):A.isData3DTexture?ae.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ae.setTexture2DArray(A,0):ae.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){Z=0,G=0,ie=null,b.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dt._getUnpackColorSpace()}}const xr=new L;function Fn(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;xr.copy(e),xr[n]=0,xr.normalize();const l=.5*a/(a+c),h=1-xr.angleTo(i)/o;return Math.sign(xr[t])===1?h*l:c/(a+c)+l+l*(1-h)}class Fr extends Ie{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new L,l=new L,h=new L(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,g=f.length/6,_=new L,m=.5/a;for(let p=0,M=0;p<f.length;p+=3,M+=2)switch(o.fromArray(f,p),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[p+0]=h.x*Math.sign(o.x)+l.x*r,f[p+1]=h.y*Math.sign(o.y)+l.y*r,f[p+2]=h.z*Math.sign(o.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),d[M+0]=Fn(_,l,"z","y",r,n),d[M+1]=1-Fn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),d[M+0]=1-Fn(_,l,"z","y",r,n),d[M+1]=1-Fn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),d[M+0]=1-Fn(_,l,"x","z",r,e),d[M+1]=Fn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),d[M+0]=1-Fn(_,l,"x","z",r,e),d[M+1]=1-Fn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),d[M+0]=1-Fn(_,l,"x","y",r,e),d[M+1]=1-Fn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),d[M+0]=Fn(_,l,"x","y",r,e),d[M+1]=1-Fn(_,l,"y","x",r,t);break}}static fromJSON(e){return new Fr(e.width,e.height,e.depth,e.segments,e.radius)}}const zh={type:"change"},dc={type:"start"},Hu={type:"end"},Sa=new Ya,Vh=new Ai,cv=Math.cos(70*Zf.DEG2RAD),an=new L,En=2*Math.PI,Xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ko=1e-6;class hv extends f0{constructor(e,t=null){super(e,t),this.state=Xt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gs.ROTATE,MIDDLE:Gs.DOLLY,RIGHT:Gs.PAN},this.touches={ONE:Vs.ROTATE,TWO:Vs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Ui,this._lastTargetPosition=new L,this._quat=new Ui().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new mh,this._sphericalDelta=new mh,this._scale=1,this._panOffset=new L,this._rotateStart=new J,this._rotateEnd=new J,this._rotateDelta=new J,this._panStart=new J,this._panEnd=new J,this._panDelta=new J,this._dollyStart=new J,this._dollyEnd=new J,this._dollyDelta=new J,this._dollyDirection=new L,this._mouse=new J,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=fv.bind(this),this._onPointerDown=uv.bind(this),this._onPointerUp=dv.bind(this),this._onContextMenu=yv.bind(this),this._onMouseWheel=gv.bind(this),this._onKeyDown=_v.bind(this),this._onTouchStart=vv.bind(this),this._onTouchMove=xv.bind(this),this._onMouseDown=pv.bind(this),this._onMouseMove=mv.bind(this),this._interceptControlDown=Mv.bind(this),this._interceptControlUp=bv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zh),this.update(),this.state=Xt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;an.copy(t).sub(this.target),an.applyQuaternion(this._quat),this._spherical.setFromVector3(an),this.autoRotate&&this.state===Xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=En:n>Math.PI&&(n-=En),s<-Math.PI?s+=En:s>Math.PI&&(s-=En),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(an.setFromSpherical(this._spherical),an.applyQuaternion(this._quatInverse),t.copy(this.target).add(an),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=an.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=an.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Sa.origin.copy(this.object.position),Sa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sa.direction))<cv?this.object.lookAt(this.target):(Vh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sa.intersectPlane(Vh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ko||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ko||this._lastTargetPosition.distanceToSquared(this.target)>ko?(this.dispatchEvent(zh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?En/60*this.autoRotateSpeed*e:En/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){an.setFromMatrixColumn(t,0),an.multiplyScalar(-e),this._panOffset.add(an)}_panUp(e,t){this.screenSpacePanning===!0?an.setFromMatrixColumn(t,1):(an.setFromMatrixColumn(t,0),an.crossVectors(this.object.up,an)),an.multiplyScalar(e),this._panOffset.add(an)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;an.copy(s).sub(this.target);let r=an.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(En*this._rotateDelta.x/t.clientHeight),this._rotateUp(En*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-En*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(En*this._rotateDelta.x/t.clientHeight),this._rotateUp(En*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new J,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function uv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function fv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function dv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Hu),this.state=Xt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function pv(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Xt.DOLLY;break;case Gs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Xt.ROTATE}break;case Gs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Xt.PAN}break;default:this.state=Xt.NONE}this.state!==Xt.NONE&&this.dispatchEvent(dc)}function mv(i){switch(this.state){case Xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function gv(i){this.enabled===!1||this.enableZoom===!1||this.state!==Xt.NONE||(i.preventDefault(),this.dispatchEvent(dc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Hu))}function _v(i){this.enabled!==!1&&this._handleKeyDown(i)}function vv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Vs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Xt.TOUCH_ROTATE;break;case Vs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Xt.TOUCH_PAN;break;default:this.state=Xt.NONE}break;case 2:switch(this.touches.TWO){case Vs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Xt.TOUCH_DOLLY_PAN;break;case Vs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Xt.TOUCH_DOLLY_ROTATE;break;default:this.state=Xt.NONE}break;default:this.state=Xt.NONE}this.state!==Xt.NONE&&this.dispatchEvent(dc)}function xv(i){switch(this._trackPointer(i),this.state){case Xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Xt.NONE}}function yv(i){this.enabled!==!1&&i.preventDefault()}function Mv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Sv extends uu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Ie;e.deleteAttribute("uv");const t=new $({side:wn}),n=new $,s=new Lu(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new pe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new gu(e,n,6),c=new nn;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new pe(e,ks(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new pe(e,ks(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new pe(e,ks(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const f=new pe(e,ks(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const u=new pe(e,ks(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const d=new pe(e,ks(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ks(i){return new n0({color:0,emissive:16777215,emissiveIntensity:i})}const wv=1.8,ui=.75,zn=.9;function Ev(i,e={}){const t=new lv({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=Er,t.outputColorSpace=un,t.toneMapping=Yl,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new uu;r.background=new mt(n?12377333:14672872),r.fog=n?new Tr(12377333,60*s,160*s):new Tr(14672872,4*s,9*s);const a=new Vl(t),c=a.fromScene(new Sv,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new In(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new L(...e.cameraPosition??[0,.5,1.45]),h=new L(...e.target??[0,.3,0]);o.position.copy(l);const f=new hv(o,t.domElement);f.target.copy(h),f.enableDamping=!0,f.dampingFactor=.08,f.enablePan=!1,f.minDistance=e.minDistance??.5,f.maxDistance=e.maxDistance??3,f.maxPolarAngle=Math.PI/2.05,f.minAzimuthAngle=-Math.PI/2.2,f.maxAzimuthAngle=Math.PI/2.2,f.update();const u=new wt;u.scale.setScalar(s),r.add(u);const d=e.benchLength??wv,g=[],_=[];let m=null,p=null;const M=[];let y=null,x=null;if(n)Lv(u),Nv(u);else{if(Tv(u),y=Iv(u,!!e.cupboard,d,s,!!e.wallCabinets),e.wallCabinets){x=zo(u,d,s),m=Av(u);const me=Dv(u);g.push(...me.doors),_.push(...me.blockers),p=me.cctvLed,f.minAzimuthAngle=-1/0,f.maxAzimuthAngle=1/0;const ue=d/2+.1+.08+.16,q=6.1,he=q-ue,ce=(ue+q)/2,Se=zo(u,d,s,{width:he,centres:[-ce,ce],lit:!1,covering:!1,doorPairs:3});g.push(...Se.doors),_.push(...Se.blockers),M.push({c:Se.cabinets[0],rotY:0,offset:new L},{c:x.cabinets[0],rotY:0,offset:new L},{c:x.cabinets[1],rotY:0,offset:new L},{c:Se.cabinets[1],rotY:0,offset:new L})}if(e.sideBenches){const me=7-ui/2-.02;for(const ue of[-1,1]){const q=Hh(d,s);if(q.group.position.set(ue*me,0,1.6),q.group.rotation.y=-ue*Math.PI/2,u.add(q.group),g.push(...q.parts.doors),_.push(...q.parts.blockers),e.wallCabinets){const ce=new wt;ce.position.set(ue*7,0,1.6),ce.rotation.y=-ue*Math.PI/2,u.add(ce);const Se=d/2-.04,Ve=zo(ce,d,s,{wallZ:0,width:Se,centres:[-Se/2-.02,Se/2+.02],lit:!1,covering:!1});g.push(...Ve.doors),_.push(...Ve.blockers);for(const Oe of[...Ve.cabinets].reverse())M.push({c:Oe,rotY:ce.rotation.y,offset:ce.position.clone()})}const he=Hh(.9,s);he.group.position.set(ue*(d/2+.5+.45),0,0),u.add(he.group),g.push(...he.parts.doors),_.push(...he.parts.blockers)}}}!n&&(e.cupboard||e.wallCabinets)&&(r.fog=new Tr(14672872,11*s,26*s)),s!==1&&u.traverse(me=>{if(!(me instanceof Ga)||!me.castShadow)return;const ue=me.shadow.camera;ue.left*=s,ue.right*=s,ue.top*=s,ue.bottom*=s,ue.near*=s,ue.far*=s,ue.updateProjectionMatrix(),me.shadow.normalBias*=s});const w=[],S=new c0;let R=0;const v=me=>{R=requestAnimationFrame(v),S.update(me);const ue=Math.min(1,S.getDelta());if(w.forEach(q=>q(ue)),Y){Y.t=Math.min(1,Y.t+ue/.7);const q=Y.t<.5?2*Y.t*Y.t:1-Math.pow(-2*Y.t+2,2)/2;o.position.lerpVectors(Y.fromPos,Y.toPos,q),f.target.lerpVectors(Y.fromTarget,Y.toTarget,q),Y.t>=1&&(Y=null)}f.update(),Fv(r,o,t.domElement.clientHeight),t.render(r,o)};R=requestAnimationFrame(v);let T=null,P=null,N=null,F=!1,Y=null;f.addEventListener("start",()=>{F=!0,Y=null});const K=new ResizeObserver(()=>{const me=i.clientWidth,ue=i.clientHeight;!me||!ue||(t.setSize(me,ue),o.aspect=me/ue,o.updateProjectionMatrix(),T&&!F&&(P!==null?O(T,P,{dir:N||void 0}):Z(T)))});K.observe(i);function O(me,ue=.7,q={}){if(me.isEmpty())return;T=me.clone(),P=ue,F=!1;const he=me.getCenter(new L),ce=(q.dir?q.dir.clone():l.clone().sub(h)).normalize();N=ce.clone();const Se=o.position.clone(),Ve=f.target.clone(),Oe=[0,1,2,3,4,5,6,7].map(de=>new L(de&1?me.max.x:me.min.x,de&2?me.max.y:me.min.y,de&4?me.max.z:me.min.z)),at=de=>(o.position.copy(he).addScaledVector(ce,de),o.lookAt(he),o.updateMatrixWorld(!0),Oe.every(xe=>{const we=xe.clone().project(o);return we.z<1&&Math.abs(we.x)<=ue&&Math.abs(we.y)<=ue}));let Je=.01,oe=f.maxDistance*4;for(let de=0;de<40;de++){const xe=(Je+oe)/2;at(xe)?oe=xe:Je=xe}if(f.maxDistance=Math.max(f.maxDistance,oe*1.5),h.copy(he),l.copy(he).addScaledVector(ce,oe),q.animate){o.position.copy(Se),o.lookAt(Ve),Y={fromPos:Se,toPos:l.clone(),fromTarget:Ve,toTarget:h.clone(),t:0};return}Y=null,o.position.copy(l),f.target.copy(h),f.update()}function Z(me){if(me.isEmpty())return;T=me.clone(),P=null,F=!1;const ue=me.getCenter(new L),q=me.getSize(new L),he=o.fov*Math.PI/180,ce=2*Math.atan(Math.tan(he/2)*o.aspect),Se=Math.max(q.x/2/Math.tan(ce/2),Math.max(q.y,q.z*.6)/2/Math.tan(he/2))*1.12+q.z*.25,Ve=l.clone().sub(h).normalize(),Oe=Math.min(f.maxDistance,Math.max(f.minDistance,Se));h.copy(ue),l.copy(ue).addScaledVector(Ve,Oe),o.position.copy(l),f.target.copy(h),f.update()}const G=new J;if(p){const me=p;let ue=0;w.push(q=>{ue+=q,me.visible=ue%1.2<.7})}let ie=null;if(m){const me=m;let ue=0;w.push(q=>{ue+=q,me.taps.forEach(Oe=>{const at=!!Oe.userData.on,Je=Oe.userData.handle;Je.rotation.y+=((at?-Math.PI/2:0)-Je.rotation.y)*Math.min(1,q*10);const oe=Oe.userData.stream;if(oe.visible=at,at){const de=oe.material.map;de.offset.y=(de.offset.y-q*3)%1,oe.scale.x=oe.scale.z=1+Math.sin(ue*40)*.08}Oe.userData.splash.visible=at});const he=new Date,ce=he.getSeconds()+he.getMilliseconds()/1e3,Se=he.getMinutes()+ce/60,Ve=he.getHours()%12+Se/60;me.clock.second.rotation.z=-(Math.floor(ce)/60)*Math.PI*2,me.clock.minute.rotation.z=-(Se/60)*Math.PI*2,me.clock.hour.rotation.z=-(Ve/12)*Math.PI*2}),ie={taps:me.taps,tapOf:q=>{let he=q;for(;he&&!he.userData.isTap;)he=he.parent;return he},toggle:q=>{q.userData.on=!q.userData.on},isOn:q=>!!q.userData.on,anyOn:()=>me.taps.filter(q=>q.userData.on).length}}const le=[...(y==null?void 0:y.doors)||[],...(x==null?void 0:x.doors)||[],...g];le.length&&w.push(me=>{le.forEach(ue=>{const q=ue.userData.open?ue.userData.openAngle:0;ue.rotation.y+=(q-ue.rotation.y)*Math.min(1,me*7)})});const re=me=>{let ue=me;for(;ue&&!ue.userData.cupboardDoor;)ue=ue.parent;return ue},fe=me=>{me.userData.open=!me.userData.open},ye=x?{doors:x.doors,blockers:x.blockers,cabinets:M.map(({c:me,rotY:ue,offset:q})=>({minX:me.minX*s,maxX:me.maxX*s,rows:me.rows.map(he=>he*s),rowHeight:me.rowHeight*s,depth:me.depth*s,z:me.z*s,frontZ:me.frontZ*s,bays:me.bays,topY:me.topY*s,corniceFrontZ:me.corniceFrontZ*s,cx:me.cx*s,rotY:ue,offset:q.clone().multiplyScalar(s)}))}:null;let Xe=null;if(y){const me=y;Xe={doors:me.doors,blockers:me.blockers,bays:me.bays.map(ue=>({minX:ue.minX*s,maxX:ue.maxX*s,levels:ue.levels.map(q=>q*s),frontZ:ue.frontZ*s,backZ:ue.backZ*s})),toggleDoor:fe,isOpen:ue=>!!ue.userData.open,doorOf:re}}return{cupboard:Xe,wallCabinets:ye,furniture:{doors:g,blockers:_},taps:ie,benchLength:d,flyTo:(me,ue)=>{T=null,P=null,F=!1,l.copy(me).multiplyScalar(s),h.copy(ue).multiplyScalar(s),f.maxDistance=Math.max(f.maxDistance,l.distanceTo(h)*1.5),Y={fromPos:o.position.clone(),toPos:l.clone(),fromTarget:f.target.clone(),toTarget:h.clone(),t:0}},toggleDoor:fe,doorOf:re,renderer:t,scene:r,camera:o,controls:f,canvas:t.domElement,onFrame:me=>{w.push(me)},resetView:()=>{o.position.copy(l),f.target.copy(h),f.update()},frameBox:Z,fitBox:O,toNdc:me=>{const ue=t.domElement.getBoundingClientRect();return G.set((me.clientX-ue.left)/ue.width*2-1,-((me.clientY-ue.top)/ue.height)*2+1),G},dispose:()=>{cancelAnimationFrame(R),K.disconnect(),f.dispose(),r.traverse(me=>{var ue;(me instanceof pe||me instanceof vd||me instanceof Dn)&&((ue=me.geometry)==null||ue.dispose(),(Array.isArray(me.material)?me.material:[me.material]).forEach(he=>{var ce;(ce=he.map)==null||ce.dispose(),he.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function Tv(i){i.add(new Pu(16119807,9080729,.55));const e=new Ga(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new Ga(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}const hs=-ui/2-.25;function Av(i){const e=Or.steel(),t=new $({color:13225684,roughness:.25,metalness:.9,side:Kt}),n=new $({map:ms(),roughness:.7}),s=new gi({color:2040616,roughness:.42,clearcoat:.4}),r=.8,a=.6,c=[];for(const y of[-1,1]){const x=new wt;x.position.set(y*(7-r/2-.02),0,hs+a/2+.01),i.add(x);const w=.2,S=zn-.035-w,R=new pe(new Ie(r-.04,S,a-.04),n);R.position.y=-zn+S/2,R.castShadow=R.receiveShadow=!0,x.add(R);const v=(oe,de,xe,we)=>{const Ee=new pe(new Ie(oe,w,de),n);Ee.position.set(xe,-.035-w/2,we),x.add(Ee)};v(r-.04,.02,0,(a-.04)/2-.01),v(r-.04,.02,0,-.5599999999999999/2+.01),v(.02,a-.04,(r-.04)/2-.01,0),v(.02,a-.04,-.76/2+.01,0);const T=new pe(new Ie(.004,zn-.12,.002),new $({color:3877404}));T.position.set(0,-zn/2-.02,(a-.04)/2+.001),x.add(T);for(const oe of[-.04,.04]){const de=new pe(new z(.006,.006,.1,12),e);de.position.set(oe,-.2,(a-.04)/2+.015),x.add(de)}const P=.5,N=.36,F=.03,Y=.2,K=(oe,de,xe,we)=>{const Ee=new pe(new Ie(oe,.035,de),s);Ee.position.set(xe,-.0175,we),Ee.receiveShadow=!0,x.add(Ee)};K(r,a/2+F-N/2,0,-a/2+(a/2+F-N/2)/2),K(r,a/2-F-N/2,0,F+N/2+(a/2-F-N/2)/2),K((r-P)/2,N,-.325,F),K((r-P)/2,N,P/2+(r-P)/4,F);const O=new pe(new Ie(P,Y,N),[t,t,t,t,t,t]);O.geometry.groups.splice(2,1),O.position.set(0,-Y/2,F),x.add(O);const Z=new pe(new z(.025,.025,.004,20),new $({color:3621201,metalness:.8,roughness:.4}));Z.position.set(0,-Y+.003,F),x.add(Z);const G=new wt;G.userData.isTap=!0,G.userData.on=!1;const ie=F-N/2-.06,le=.09,re=.3,fe=new pe(new z(.014,.018,re,16),e);fe.position.set(0,re/2,ie);const ye=new pe(new Nt(le,.014,10,24,Math.PI),e);ye.position.set(0,re,ie+le),ye.rotation.y=-Math.PI/2;const Xe=new pe(new z(.016,.013,.04,14),e);Xe.position.set(0,re-.02,ie+2*le);const me=new pe(new z(.03,.035,.02,20),e);me.position.set(0,.01,ie);const ue=new wt;ue.position.set(0,.16,ie);const q=new pe(new z(.022,.022,.04,16),e),he=new pe(new Ie(.012,.012,.11),e);he.position.set(0,.01,.06);const ce=new pe(new Gt(.014,12,8),new $({color:2450411,roughness:.4}));ce.position.set(0,.01,.115),ue.add(q,he,ce);const Se=re-.04+Y,Ve=Zi(32,128,(oe,de,xe)=>{oe.fillStyle="#dbeafe",oe.fillRect(0,0,de,xe);for(let we=0;we<xe;we+=6)oe.fillStyle=`rgba(255,255,255,${.3+Math.random()*.5})`,oe.fillRect(0,we,de,2)});Ve.wrapS=Ve.wrapT=vn,Ve.repeat.set(1,3);const Oe=new pe(new z(.009,.012,Se,12,1,!0),new $({map:Ve,color:12575743,transparent:!0,opacity:.75,roughness:.05,metalness:.1,depthWrite:!1}));Oe.position.set(0,re-.04-Se/2,ie+2*le),Oe.visible=!1;const at=new pe(new jn(.07,24),new $({color:12575743,transparent:!0,opacity:.6,roughness:.05}));at.rotation.x=-Math.PI/2,at.position.set(0,-Y+.006,ie+2*le),at.visible=!1;const Je=new pe(new Ie(P+.06,re+.05+Y,N+.16),new ds({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}));Je.position.set(0,(re+.05-Y)/2,F-.06),G.add(fe,ye,Xe,me,ue,Oe,at,Je),G.userData.handle=ue,G.userData.stream=Oe,G.userData.splash=at,x.add(G),c.push(G)}const o=new wt;o.position.set(0,1.68,hs+.02),i.add(o);const l=.12,h=Zi(512,512,(y,x)=>{const w=x/2;y.fillStyle="#fffdf7",y.beginPath(),y.arc(w,w,w,0,Math.PI*2),y.fill(),y.fillStyle="#111827";for(let S=0;S<60;S++){const R=S/60*Math.PI*2,v=S%5===0;y.save(),y.translate(w,w),y.rotate(R),y.fillRect(v?-5:-2,-w+14,v?10:4,v?34:16),y.restore()}y.font="bold 54px Arial",y.textAlign="center",y.textBaseline="middle";for(let S=1;S<=12;S++){const R=S/12*Math.PI*2;y.fillText(String(S),w+Math.sin(R)*(w-92),w-Math.cos(R)*(w-92))}y.font="bold 22px Arial",y.fillStyle="#4b5563",y.fillText("LABORATORY",w,w+110)}),f=new pe(new z(l+.02,l+.02,.05,48),new $({color:2042167,roughness:.4,metalness:.5}));f.rotation.x=Math.PI/2;const u=new pe(new jn(l,48),new $({map:h,roughness:.6}));u.position.z=.026;const d=new pe(new jn(l,48),new gi({color:16777215,transparent:!0,opacity:.12,roughness:.05,clearcoat:1,depthWrite:!1}));d.position.z=.05,o.add(f,u,d);const g=(y,x,w,S)=>{const R=new wt;R.position.z=S;const v=new pe(new Ie(x,y,.004),new $({color:w,roughness:.5}));return v.position.y=y/2-y*.12,R.add(v),o.add(R),R},_=g(l*.55,.014,1120295,.03),m=g(l*.8,.009,1120295,.034),p=g(l*.88,.004,14427686,.038),M=new pe(new z(.01,.01,.012,16),new $({color:14427686}));return M.rotation.x=Math.PI/2,M.position.z=.042,o.add(M),{taps:c,clock:{hour:_,minute:m,second:p}}}const Gu=()=>new $({color:1976890,roughness:.95}),Rv=()=>new $({color:14928028,roughness:.55});function Wl(i,e,t,n,s,r,a=9){const c=new pe(new Ie(s,.008,.012),new $({color:16777215,emissive:16773590,emissiveIntensity:2}));c.position.set(e,t,n),i.add(c);const o=new Lu(16773590,a,1.4*r,2);o.position.set(e,t-.05,n+.05),i.add(o)}function Cv(i,e){const t=-zn,n=e-t,s=Zi(256,256,(g,_,m)=>{g.fillStyle="#1f5a63",g.fillRect(0,0,_,m);for(let p=0;p<_;p+=4)g.fillStyle=p%8===0?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",g.fillRect(p,0,2,m),g.fillRect(0,p,_,2);for(let p=0;p<900;p++)g.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"0,0,0"},${Math.random()*.06})`,g.fillRect(Math.random()*_,Math.random()*m,2,2);g.strokeStyle="rgba(255,255,255,0.06)",g.lineWidth=2,g.beginPath(),g.moveTo(_/2,0),g.lineTo(_,m/2),g.lineTo(_/2,m),g.lineTo(0,m/2),g.closePath(),g.stroke()});s.wrapS=s.wrapT=vn;const r=new $({map:ms(),roughness:.55}),a=new $({color:13936715,roughness:.25,metalness:1}),c=new $({color:15659250,roughness:.95}),o=7,l=7,h=l-hs,f=(l+hs)/2,u=5;[{x:0,z:hs,rotY:0,length:2*o,newWall:!1},{x:-o,z:f,rotY:Math.PI/2,length:h,newWall:!0},{x:o,z:f,rotY:-Math.PI/2,length:h,newWall:!0},{x:0,z:l,rotY:Math.PI,length:2*o,newWall:!0,gap:zs+.2}].forEach(({x:g,z:_,rotY:m,length:p,newWall:M,gap:y})=>{const x=new wt;x.position.set(g,0,_),x.rotation.y=m,i.add(x);const w=y?[[-p/2,-y/2],[y/2,p/2]]:[[-p/2,p/2]];if(M&&y){const S=u-Jn,R=new pe(new Qt(y,S),c);R.position.y=t+Jn+S/2,x.add(R)}w.forEach(([S,R])=>{const v=R-S,T=(S+R)/2;if(M){const G=new pe(new Qt(v,u),c);G.position.set(T,t+u/2,0),G.receiveShadow=!0,x.add(G)}const P=s.clone();P.needsUpdate=!0,P.repeat.set(v/.35,n/.35);const N=new pe(new Qt(v,n),new $({map:P,roughness:.95}));N.position.set(T,t+n/2,.004),N.receiveShadow=!0,x.add(N);const F=new pe(new Ie(v,.045,.022),r);F.position.set(T,e-.0225,.015),F.castShadow=!0,F.receiveShadow=!0,x.add(F);const Y=new pe(new Ie(v,.1,.018),r);Y.position.set(T,t+.05,.013),x.add(Y);const K=Math.floor(v/.15),O=new gu(new Gt(.007,10,8),a,K),Z=new Ot;for(let G=0;G<K;G++)Z.makeTranslation(S+.075+G*.15,e-.075,.007),O.setMatrixAt(G,Z);x.add(O)})})}const zs=1.8,Jn=2.1,Pv=7;function Dv(i){const e=-zn,t=[],n=[],s=new $({map:ms(),roughness:.55}),r=new $({map:ms(),color:14727562,roughness:.5}),a=Or.steel(),c=Pv,o=(v,T,P,N)=>{const F=new pe(new Ie(v,T,.08),s);F.position.set(P,N,c-.03),F.castShadow=!0,i.add(F),n.push(F)};o(.1,Jn+.1,-zs/2-.05,e+(Jn+.1)/2),o(.1,Jn+.1,zs/2+.05,e+(Jn+.1)/2),o(zs+.2,.1,0,e+Jn+.05);const l=zs/2-.005,h=new gi({color:13625599,transparent:!0,opacity:.35,roughness:.05,depthWrite:!1});for(const v of[1,-1]){const T=new wt;T.position.set(-v*zs/2,e+Jn/2,c-.02);const P=l,N=Jn-.01,F=.045,Y=(ye,Xe,me,ue)=>{const q=new pe(new Ie(ye,Xe,F),r);q.position.set(v*me,ue,0),q.castShadow=!0,T.add(q)},K=.15,O=.75,Z=.18,G=P-.18;Y(P,N/2+K,P/2,-N/2+(N/2+K)/2),Y(P,N/2-O,P/2,N/2-(N/2-O)/2),Y(Z,O-K,Z/2,(O+K)/2),Y(P-G,O-K,(P+G)/2,(O+K)/2);const ie=new pe(new Qt(G-Z,O-K),h);ie.position.set(v*(Z+G)/2,(O+K)/2,0),ie.renderOrder=2,T.add(ie);const le=new pe(new Ie(.1,.3,.004),a);le.position.set(v*(P-.1),.05,-F/2-.003);const re=new pe(new z(.012,.012,.3,12),a);re.position.set(v*(P-.1),.05,-F/2-.05);const fe=new pe(new Ie(P-.04,.2,.004),a);fe.position.set(v*P/2,-N/2+.12,-F/2-.003);for(const ye of[-.1,.2]){const Xe=new pe(new z(.008,.008,.05,8),a);Xe.rotation.x=Math.PI/2,Xe.position.set(v*(P-.1),ye,-F/2-.025),T.add(Xe)}T.add(le,re,fe),T.userData.cupboardDoor=!0,T.userData.open=!1,T.userData.openAngle=v*1.45,i.add(T),t.push(T)}const f=(v,T,P,N,F)=>{const Y=Zi(512,Math.round(512*T/v),N),K=new pe(new Ie(v,T,.03),[s,s,s,s,s,new $({map:Y,emissive:F?16777215:0,emissiveMap:F?Y:null,emissiveIntensity:F?.8:0,roughness:.4})]);K.position.set(0,P,c-.04),i.add(K)};f(.42,.15,e+Jn+.25,(v,T,P)=>{v.fillStyle="#15803d",v.fillRect(0,0,T,P),v.fillStyle="#ffffff",v.font="bold 110px Arial",v.textAlign="center",v.textBaseline="middle",v.fillText("EXIT",T/2+40,P/2+6),v.fillRect(40,P*.3,70,16),v.beginPath(),v.moveTo(110,P*.3-22),v.lineTo(150,P*.3+8),v.lineTo(110,P*.3+38),v.fill()},!0),f(1.3,.18,e+Jn+.5,(v,T,P)=>{const N=v.createLinearGradient(0,0,0,P);N.addColorStop(0,"#f8e3a1"),N.addColorStop(.5,"#d9a842"),N.addColorStop(1,"#a8781f"),v.fillStyle=N,v.fillRect(0,0,T,P),v.strokeStyle="#5a3f0c",v.lineWidth=4,v.strokeRect(6,6,T-12,P-12),v.fillStyle="#3b2606",v.font="bold 34px Georgia, serif",v.textAlign="center",v.textBaseline="middle",v.fillText("SCIENCE  LABORATORY",T/2,P/2+2)},!1);const u=new pe(new Qt(6,4),new $({color:13159634,roughness:.8}));u.rotation.x=-Math.PI/2,u.position.set(0,e+.001,c+2),i.add(u);const d=new pe(new Qt(6,5),new $({color:14673644,roughness:.9}));d.rotation.y=Math.PI,d.position.set(0,e+2.5,c+4),i.add(d);for(const v of[-3,3]){const T=new pe(new Qt(4,5),new $({color:15265265,roughness:.9}));T.rotation.y=v<0?Math.PI/2:-Math.PI/2,T.position.set(v,e+2.5,c+2),i.add(T)}const g=new wt;g.position.set(4.2,2.35,hs+.02),i.add(g);const _=new $({color:15987958,roughness:.4}),m=new pe(new Ie(.1,.12,.02),_),p=new pe(new z(.015,.015,.16,12),_);p.rotation.x=Math.PI/2,p.position.z=.08,g.add(m,p);const M=new wt;M.position.z=.17;const y=new L(0,e+1.1,c).sub(g.position).sub(M.position);M.rotation.order="YXZ",M.rotation.y=Math.atan2(y.x,y.z),M.rotation.x=-Math.atan2(y.y,Math.hypot(y.x,y.z)),g.add(M);const x=new pe(new Ie(.09,.08,.24),_);x.position.z=.06;const w=new pe(new Ie(.11,.012,.28),_);w.position.set(0,.046,.08);const S=new pe(new z(.028,.028,.02,20),new $({color:988970,roughness:.1,metalness:.6}));S.rotation.x=Math.PI/2,S.position.z=.185;const R=new pe(new Gt(.006,8,6),new $({color:15680580,emissive:15680580,emissiveIntensity:2}));return R.position.set(.03,-.025,.182),M.add(x,w,S,R),{doors:t,blockers:n,cctvLed:R}}function zo(i,e,t=1,n={}){const s=n.width??e/2+.1,r=.86,a=.3,c=.016,o=.5,l=(n.wallZ??hs)+.002,h=l+a,f=4,u=ms(),d=new $({map:u,roughness:.6}),g=Gu(),_=Rv(),m=new $({color:14146528,roughness:.3,metalness:.85}),p=new gi({color:15398655,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1}),M=[],y=[],x=[];n.covering!==!1&&Cv(i,o);const w=.08+s/2;for(const S of n.centres??[-w,w]){const R=S-s/2,v=S+s/2,T=(re,fe,ye,Xe,me,ue,q)=>{const he=new pe(new Ie(re,fe,ye),q);he.position.set(Xe,me,ue),he.castShadow=!0,he.receiveShadow=!0,i.add(he),y.push(he)};T(s,r,c,S,o+r/2,l+c/2,g),T(c,r,a,R+c/2,o+r/2,l+a/2,d),T(c,r,a,v-c/2,o+r/2,l+a/2,d),T(s,c*1.5,a,S,o+r-c*.75,l+a/2,d),T(s,c*1.5,a,S,o+c*.75,l+a/2,d),T(s+.03,.03,a+.02,S,o+r+.015,l+a/2+.01,d);const P=o+c*1.5,N=o+r-c*1.5,F=(N-P)/f,Y=[];for(let re=0;re<f;re++){const fe=P+re*F;re>0&&T(s-2*c,c,a-c-.03,S,fe-c/2,l+c+(a-c-.03)/2,_),Y.unshift(fe)}if(n.lit!==!1)for(const re of[S-s/4,S+s/4])Wl(i,re,N-.006,l+a*.72,s/2-.08,t);x.push({bays:n.doorPairs??1,topY:o+r+.03,corniceFrontZ:l+a+.02,cx:S,minX:R+c,maxX:v-c,rows:Y,rowHeight:F-c,depth:a-c-.05,z:l+c+(a-c-.03)/2,frontZ:l+a-.03});const K=n.doorPairs??1,O=s/K;for(let re=1;re<K;re++)T(c,r,a,R+re*O,o+r/2,l+a/2,d);const Z=O/2-.004,G=r-.01,ie=.018,le=[];for(let re=0;re<K;re++)le.push([R+re*O,1],[R+(re+1)*O,-1]);for(const[re,fe]of le){const ye=new wt;ye.position.set(re+fe*.002,o+r/2,h+.008);const Xe=new pe(new Ie(Z-ie,G-ie,.004),p);Xe.position.x=fe*Z/2,Xe.renderOrder=2,ye.add(Xe);const me=(q,he,ce,Se)=>{const Ve=new pe(new Ie(q,he,.014),m);Ve.position.set(ce,Se,0),ye.add(Ve)};me(Z,ie,fe*Z/2,G/2-ie/2),me(Z,ie,fe*Z/2,-G/2+ie/2),me(ie,G,fe*ie/2,0),me(ie,G,fe*(Z-ie/2),0);const ue=new pe(new z(.008,.008,.07,12),Or.steel());ue.position.set(fe*(Z-.04),-.12,.02),ye.add(ue),ye.userData.cupboardDoor=!0,ye.userData.open=!1,ye.userData.openAngle=-fe*1.7,i.add(ye),M.push(ye)}}return{doors:M,blockers:y,cabinets:x}}function Hh(i,e){const t=new wt,n=new pe(new Fr(i,.035,ui,3,.008),new gi({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));n.position.y=-.0175,n.castShadow=!0,n.receiveShadow=!0,t.add(n);const s=Wu(t,ms(),i,e,!1);return{group:t,parts:s}}function Iv(i,e=!1,t=1.8,n=1,s=!1){const r=Zi(512,512,(_,m,p)=>{_.fillStyle="#b9bec6",_.fillRect(0,0,m,p);for(let M=0;M<1200;M++)_.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,_.fillRect(Math.random()*m,Math.random()*p,3,3);_.strokeStyle="rgba(70,74,82,0.35)",_.lineWidth=3,_.strokeRect(0,0,m,p)});r.wrapS=r.wrapT=vn,r.repeat.set(12,12);const a=new pe(new Qt(14,14),new $({map:r,roughness:.85}));a.rotation.x=-Math.PI/2,a.position.y=-zn,a.receiveShadow=!0,i.add(a);const c=new pe(new Qt(14,5),new $({color:15659250,roughness:.95}));c.position.set(0,1.6,-ui/2-.25),c.receiveShadow=!0,i.add(c);const o=Zi(256,256,(_,m,p)=>{_.fillStyle="#f7f8f9",_.fillRect(0,0,m,p),_.strokeStyle="#c9ced4",_.lineWidth=4,_.strokeRect(0,0,m,p)});o.wrapS=o.wrapT=vn,o.repeat.set(40,4);const l=new pe(new Qt(6,.6),new $({map:o,roughness:.3,metalness:0}));l.position.set(0,.3,-ui/2-.249),s||i.add(l);const h=new pe(new Fr(t,.035,ui,3,.008),new gi({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));h.position.y=-.0175,h.receiveShadow=!0,h.castShadow=!0,i.add(h);const f=ms();if(e)return Wu(i,f,t,n);const u=new pe(new Ie(t-.06,zn-.035,ui-.06),new $({map:f,roughness:.7}));u.position.y=-zn/2-.0175,u.receiveShadow=!0,i.add(u);const d=new $({color:3877404,roughness:.8}),g=Or.steel();for(const _ of[-.6,0,.6]){const m=new pe(new Ie(.004,zn-.12,.002),d);m.position.set(_,-zn/2-.02,(ui-.06)/2+.001),i.add(m)}for(const _ of[-.66,-.54,-.06,.06,.54,.66]){const m=new pe(new z(.006,.006,.1,12),g);m.position.set(_,-.2,(ui-.06)/2+.015),i.add(m)}return null}function Wu(i,e,t,n=1,s=!0){const r=t-.06,a=ui-.06,c=.018,o=-.035,l=-zn,h=o-l,f=a/2,u=-a/2,d=new $({map:e,roughness:.7}),g=new $({color:2898509,roughness:.7}),_=Gu(),m=[],p=(O,Z,G,ie,le,re,fe)=>{const ye=new pe(new Ie(O,Z,G),fe);return ye.position.set(ie,le,re),ye.castShadow=!0,i.add(ye),m.push(ye),ye},M=l+.06;p(c,h,a,-r/2+c/2,l+h/2,0,d),p(c,h,a,r/2-c/2,l+h/2,0,d),p(r,h,c,0,l+h/2,u+c/2,_),p(c,h,a-c,0,l+h/2,c/2,_),p(r,c,a,0,M-c/2,0,g),p(r,.06,c,0,l+.03,f-.03,d),p(r,.04,c,0,o-.02,f-c/2,d);const y=-.46,x=r/2-c*1.5;if(p(x,c,a-c,-r/4,y-c/2,c/2,g),p(x,c,a-c,r/4,y-c/2,c/2,g),s)for(const O of[-r/4,r/4])Wl(i,O,o-.05,f-.12,x-.1,n,10),Wl(i,O,y-c-.006,f-.12,x-.1,n,10);const w=o-.04,S=M-c,R=w-S-.002,v=r>2.2,T=(v?r/4:r/2)-.0025,P=new $({map:e,roughness:.65}),N=Or.steel(),F=[];(v?[[-r/2,1,1.95],[0,-1,1.5],[0,1,1.5],[r/2,-1,1.95]]:[[-r/2,1,1.95],[r/2,-1,1.95]]).forEach(([O,Z,G],ie)=>{const le=new wt;le.position.set(O+Z*.001,(w+S)/2,f+c/2);const re=new pe(new Ie(T,R,c),P);re.position.x=Z*T/2,re.castShadow=!0,le.add(re);const fe=new pe(new z(.006,.006,.1,12),N);fe.position.set(Z*(T-.045),-.2-le.position.y,c/2+.015),le.add(fe);for(const ye of[fe.position.y-.05,fe.position.y+.05]){const Xe=new pe(new z(.004,.004,.016,8),N);Xe.rotation.x=Math.PI/2,Xe.position.set(fe.position.x,ye,c/2+.008),le.add(Xe)}le.userData.cupboardDoor=!0,le.userData.bay=v?ie<2?0:1:ie,le.userData.open=!1,le.userData.openAngle=-Z*G,i.add(le),F.push(le)});const K=(O,Z)=>({minX:O,maxX:Z,levels:[M,y],frontZ:f-.02,backZ:u+c});return{doors:F,blockers:m,bays:[K(-r/2+c,-c/2),K(c/2,r/2-c)]}}function Lv(i){i.add(new Pu(14675967,6126138,.8));const e=new Ga(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function Nv(i){const e=Zi(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const h=60+Math.random()*70;a.fillStyle=`rgba(${h*.6},${h+40},${h*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=vn,e.repeat.set(80,80);const t=new pe(new Qt(300,300),new $({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new pe(new Qt(80,.1),new $({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new $({color:5980976,roughness:.9}),r=new $({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new pe(new z(.25,.35,3,8),s);l.position.set(c,1.5,o);const h=new pe(new Gt(2.2+a%3*.5,12,10),r);h.position.set(c,4.2+a%2,o),i.add(l,h)}}function ms(){return Zi(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function Zi(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Ir(n);return s.colorSpace=un,s.anisotropy=16,s}function Uv(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new Ir(s);o.colorSpace=un;const l=new Dn(new Ys({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const h=e/700*.73;return l.scale.set(h*l.userData.aspect,h,1),l}const Vo=new L,Ho=new L;function Fv(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(Vo).project(e),c.getWorldPosition(Ho).project(e);const o=Math.abs(Vo.y-Ho.y)*t/2+Math.abs(Vo.x-Ho.x)*t/2;s.visible=o>r*1.25})}const Or={steel:()=>new $({color:13094097,metalness:1,roughness:.28}),chrome:()=>new $({color:15133164,metalness:1,roughness:.12}),brass:()=>new $({color:13936715,metalness:1,roughness:.22}),castIron:()=>new $({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new $({color:1776928,roughness:.5}),glass:()=>new $({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},vt=(i=15857397)=>new gi({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:Kt,depthWrite:!1}),bn=i=>new $({color:i,roughness:.45,metalness:.15}),ut=(i=13094097)=>new $({color:i,roughness:.28,metalness:1}),yt=()=>new $({color:15133164,roughness:.12,metalness:1}),Pn=()=>new $({color:13936715,roughness:.22,metalness:1}),xt=i=>new $({color:i,roughness:.5,metalness:.05}),en=i=>new $({color:i,roughness:.35,metalness:.1}),ci=()=>new $({color:10119233,roughness:.7});function Gh(i,e,t,n,s=!1){const r=i.distanceTo(e),a=s?new Ie(t*2,r,t*2.6):new z(t,t*.8,r,12),c=new pe(a,n);return c.position.copy(i).add(e).multiplyScalar(.5),c.quaternion.setFromUnitVectors(new L(0,1,0),e.clone().sub(i).normalize()),c}const Go=()=>new $({color:14278114,roughness:.3,metalness:.9}),He=(i,e,t,n=Math.min(i,e,t)*.12)=>new Fr(i,e,t,3,n);function E(i,e,t=0,n=0,s=0){const r=new pe(i,e);return r.position.set(t,n,s),r}function Et(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new Ir(n);return s.colorSpace=un,s.anisotropy=16,s}function Gi(i,e,t,n){const s=new wt;return s.add(E(new z(.018,.022,.05,16),Pn(),0,.025,0)),s.add(E(new z(.026,.026,.03,16),xt(n),0,.06,0)),s.position.set(i,e,t),s}function On(i,e,t,n=.55){const s=e*.85,r=new pe(new z(i*.9,i*.9,s,40),new $({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const Ov={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function Wh(i,e,t,n){const s=Ov[n.hazard],r=Et(512,256,(c,o,l)=>{c.fillStyle="#fffdf6",c.fillRect(0,0,o,l),c.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",c.fillRect(0,0,o,34),c.fillStyle="#ffffff",c.font="bold 24px sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),c.fillStyle="#111827";const h=String(n.display_name||"Reagent").split(" "),f=[];let u="";c.font="bold 40px sans-serif",h.forEach(g=>{const _=u?`${u} ${g}`:g;c.measureText(_).width>o-40&&u?(f.push(u),u=g):u=_}),f.push(u);const d=f.slice(0,2);d.forEach((g,_)=>c.fillText(g,o/2,(n.formula?86:110)+_*46-(d.length-1)*10)),n.formula&&(c.font="bold 54px serif",c.fillStyle="#1e3a8a",c.fillText(String(n.formula),o/2,212)),c.strokeStyle="#cbd5e1",c.lineWidth=4,c.strokeRect(2,2,o-4,l-4)}),a=E(new z(i,i,e,32,1,!0,-1.05,2.1),new $({map:r,roughness:.85,side:Kt}),0,t);return a.userData.role="reagent_label",a}function wa(i,e,t,n){const s=Et(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let h=1;h<=l;h++){const f=o-h/(l+1)*o;a.fillRect(0,f,h%5===0?44:24,h%5===0?4:2)}}),r=new pe(new z(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new ds({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function Ea(i){const e=Et(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new Dn(new Ys({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function Xh(i,e){return Et(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const h=c+l/50*o,f=l%10===0;t.lineWidth=f?4:1.5;const u=f?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(h)*u,r+Math.sin(h)*u),t.lineTo(s+Math.cos(h)*(a-16),r+Math.sin(h)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const h=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(h)*(a-82),r+Math.sin(h)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function Xu(i){return Et(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function Wa(i,e="#22c55e"){return Et(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function qh(){return Et(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function Bv(){return Et(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const Wo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function kv(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[Wo[n],Wo[s],Wo[r],"#d4af37"]}class Xo extends ti{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new L){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function qo(i,e,t,n={}){const s=new wt;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const h=[new J(0,.004),new J(.301,.004),new J(.315,.03),new J(.33949999999999997,.58),new J(.357,.6),new J(.364,.612)];r(new pe(new Kn(h,48),vt()));const f=E(new Bn(.045,.07,3),vt(),.35*1,.6-.015,0);f.rotation.z=-Math.PI/2,r(f,wa(.35*.95,.06,.6*.72,4),On(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const h=E(new z(.12,.12,.55,32,1,!0),vt(),0,.375),f=E(new Gt(.12,32,16,0,Math.PI*2,0,Math.PI/2),vt(),0,.1);f.rotation.x=Math.PI;const u=E(new Nt(.12*1.02,.012,10,32),vt(),0,.55+.1);u.rotation.x=Math.PI/2;const d=E(He(.34,.08,.34,.02),ci(),0,.04);r(h,f,u,d,On(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const h=E(new z(.06,.06,1.1,32,1,!0),vt(),0,.7000000000000001),f=E(new z(.06*1.25,.06*1.25,.1,24),vt(15660799),0,.1),u=E(He(.16,.03,.035,.012),xt(1920728),.09,.1),d=E(new z(.03,.01,.1,16,1,!0),vt(),0,.02),g=E(new z(.2,.22,.04,32),en(3099491),0,.02);r(h,f,u,d,g,wa(.06,.2,1.1*.85,10),On(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=E(new z(.018,.008,.3,16),vt(),0,.2),l=E(new Gt(.055,24,16),vt(),0,.42);l.scale.y=1.8;const h=E(new z(.018,.018,.3,16),vt(),0,.68),f=E(new Nt(.02,.003,6,20),new ds({color:1120295}),0,.74);f.rotation.x=Math.PI/2;const u=E(new Gt(.075,24,16),xt(12131356),0,.9);u.scale.y=1.25;const d=E(He(.22,.07,.18,.02),ci(),0,.035);r(o,l,h,f,u,d);break}case"measuring_cylinder":{const h=E(new z(.18,.17099999999999999,.8,40,1,!0),vt(),0,.44),f=E(new z(.18*1.6,.18*1.7,.05,6),vt(15266293),0,.025),u=E(new Bn(.035,.06,3),vt(),.18,.8+.03,0);u.rotation.z=-Math.PI/2,r(h,f,u,wa(.18*.97,.12,.8*.8,5),On(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new $({color:1920728,roughness:.45,metalness:.2}),l=[new J(0,.005),new J(.27,.005),new J(.272,.018),new J(.2,.05),new J(.11,.1),new J(.075,.13),new J(0,.13)],h=new pe(new Kn(l,56),o),f=E(new z(.068,.07,.11,36),o,0,.175),u=Et(128,16,(v,T,P)=>{v.fillStyle="#d4d4d8",v.fillRect(0,0,T,P),v.fillStyle="#71717a";for(let N=0;N<T;N+=4)v.fillRect(N,0,1.5,P)});u.wrapS=vn,u.repeat.set(3,1);const d=E(new z(.052,.052,.075,40),new $({map:u,roughness:.3,metalness:1}),0,.268),g=E(new z(.066,.066,.03,6),yt(),0,.32),_=E(new z(.06,.06,.012,40),yt(),0,.341),m=E(new z(.048,.048,.28,36,1,!0),yt(),0,.485),p=E(new z(.042,.042,.004,28),new $({color:4144966,roughness:.8}),0,.6),M=E(new Nt(.046,.004,8,32),yt(),0,.625);M.rotation.x=Math.PI/2;const y=new wt,x=E(new z(.032,.032,.2,24),yt(),0,.1);y.add(x);for(let v=0;v<3;v++)y.add(E(new z(.03,.036,.025,24),yt(),0,.215+v*.03));y.add(E(new z(.02,.02,.004,20),new $({color:2565930}),0,.29)),y.rotation.z=Math.PI/2+.12,y.position.set(-.05,.16,0),r(h,f,d,g,_,m,p,M,y);const w=n.flame==="on",S=E(new Bn(.09,.3,24),new $({color:16751933,emissive:16738816,emissiveIntensity:w?1:0,transparent:!0,opacity:w?.75:0,depthWrite:!1}),0,.77);S.userData.role="flame";const R=E(new Bn(.045,.16,16),new $({color:6333946,emissive:2450411,emissiveIntensity:w?1.3:0,transparent:!0,opacity:w?.85:0,depthWrite:!1}),0,.7);R.userData.role="flame",r(S,R);break}case"thermometer":{const o=Et(256,1690,(p,M,y)=>{p.fillStyle="#fbfbf8",p.fillRect(0,0,M,y),p.fillStyle="#0f172a",p.textAlign="left",p.textBaseline="middle";const x=y-250,w=y-400;for(let S=0;S<=100;S+=2){const R=x-S/100*w,v=S%10===0;p.fillRect(M-(v?90:50),R-(v?3:1.5),v?90:50,v?6:3),v&&(p.font=`900 ${S%50===0?62:52}px Arial, sans-serif`,p.fillText(String(S),10,R))}p.font="700 44px Arial, sans-serif",p.fillText("°C",14,x-w-70)}),l=E(He(.1,.66,.02,.008),new $({map:o,roughness:.5}),0,.45,-.025),h=E(new z(.022,.022,.62,24),vt(16777215),0,.45),f=E(new z(.008,.008,.45,12),new $({color:14427686,roughness:.2}),0,.32),u=E(new Gt(.05,24,24),new $({color:14427686,roughness:.2}),0,.1),d=E(new Gt(.065,24,24),vt(16777215),0,.1),g=E(He(.26,.04,.2,.015),en(3099491),0,.02);r(l,h,f,u,d,g);const _=p=>.78-(1440-p*12.9)/1690*.66;let m;for(const p of[0,25,50,75,100]){const M=Uv(`${p}°`,12,p%50===0?void 0:m);M.center.set(0,.5),M.position.set(.065,_(p),-.02),r(M),p%50===0&&(m=M)}break}case"battery":{const o=Et(512,256,(g,_,m)=>{g.fillStyle="#111827",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,_,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,_/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",_/2,m*.9)}),l=xt(2042167),h=E(He(.6,.3,.3,.035),[l,l,l,l,new $({map:o,roughness:.5}),l],0,.15),f=Gi(.2,.3,0,14427686),u=Gi(-.2,.3,0,1118481),d=new Dn(new Ys({map:Xu(n.voltage||6),depthTest:!1,transparent:!0}));d.scale.set(.34,.136,1),d.position.set(0,.58,0),d.renderOrder=9,d.userData.role="voltage",r(h,f,u,d);break}case"ruler":{const h=new $({color:15381256,roughness:.6}),f=new $({map:qh(),roughness:.55});r(E(new Ie(1.5,.015,.16),[h,h,f,h,h,h],0,.0075));break}case"bulb":{const o=n.state==="on",l=E(new Gt(.18,32,32),new gi({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const h=E(new Nt(.05,.006,8,24,Math.PI*1.7),new $({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);h.rotation.x=Math.PI/2,h.userData.role="led";const f=E(new z(.095,.11,.16,24),Pn(),0,.12),u=new wt;for(let g=0;g<5;g++){const _=E(new Nt(.1,.006,6,24),Pn(),0,.06+g*.028);_.rotation.x=Math.PI/2,u.add(_)}const d=E(He(.4,.04,.26,.015),ci(),0,.02);r(l,h,f,u,d,Gi(-.15,.04,.07,14427686),Gi(.15,.04,.07,1118481));break}case"switch":{const o=E(He(.4,.06,.2,.012),ci(),0,.03),l=E(new z(.02,.02,.1,16),Pn(),-.12,.11),h=E(He(.05,.06,.05,.008),Pn(),.12,.09),f=E(new z(.012,.012,.24,16),yt()),u=n.state==="closed";f.position.set(u?0:-.06,.16,0),f.rotation.z=u?Math.PI/2-.35:Math.PI/2-.9,f.userData.role="lever",f.add(E(new Gt(.028,16,12),xt(1118481),0,-.13,0)),r(o,l,h,f);break}case"resistor":{const o=Et(256,64,(g,_,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,_,m),kv(n.resistance_ohm).forEach((p,M)=>{g.fillStyle=p,g.fillRect(60+M*34+(M===3?22:0),0,16,m)})}),l=E(new z(.07,.07,.32,32),new $({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const h=E(new z(.01,.01,.52,10),ut(13948120),0,.2);h.rotation.z=Math.PI/2;const f=E(He(.6,.04,.2,.012),xt(15195332),0,.02),u=E(new z(.012,.012,.16,10),ut(13948120),-.26,.12),d=u.clone();d.position.x=.26,r(l,h,f,u,d);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=E(He(.42,.4,.18,.03),en(o?1981066:8330525),0,.2),h=E(new Nt(.155,.015,12,48),yt(),0,.2,.091),f=E(new jn(.15,48),new $({map:Xh(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),u=E(new Bn(.012,.13,8),bn(14427686),.02,.2,.1);u.rotation.z=-Math.PI/2+.6,u.userData.role="needle";const d=E(new Gt(.014,12,12),ut(2565930),0,.2,.1);r(l,h,f,u,d,Gi(-.12,.4,0,14427686),Gi(.12,.4,0,1118481));break}case"microscope":{const o=en(15659250),l=en(2040616);r(E(He(.36,.06,.47,.02),o,0,.03,-.05)),r(E(He(.1,.28,.1,.02),o,0,.19,-.22));const h=new Fl([new L(0,.27,-.23),new L(0,.55,-.23),new L(0,.74,-.14),new L(0,.8,-.03)]);r(new pe(new Ri(h,24,.044,12,!1),o));const f=E(new z(.035,.035,.01,24),new $({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);f.userData.role="led",r(E(new z(.045,.05,.05,24),l,0,.085),f),r(E(He(.3,.022,.28,.006),l,0,.32));for(const u of[-.08,.08])r(E(new Ie(.016,.004,.11),yt(),u,.333,.03));r(E(new z(.036,.036,.25,24),l,0,.7)),r(E(new z(.025,.03,.11,24),l,0,.88)),r(E(new z(.056,.06,.033,32),yt(),0,.565)),[14427686,15381256,2450411].forEach((u,d)=>{const g=new wt;g.position.y=.55,g.rotation.y=2*Math.PI*d/3;const _=new wt;_.position.z=.03,_.rotation.x=.35,_.add(E(new z(.015,.012,.07+d*.015,16),yt(),0,-.04-d*.008)),_.add(E(new z(.0158,.0158,.008,16),xt(u),0,-.03)),g.add(_),r(g)});for(const u of[-1,1]){const d=E(new z(.05,.05,.028,24),l,u*.08,.25,-.22);d.rotation.z=Math.PI/2;const g=E(new z(.025,.025,.028,20),l,u*.11,.25,-.22);g.rotation.z=Math.PI/2,r(d,g)}break}case"lens":{const o=E(new Gt(.22,40,40),vt(15988991),0,.42);o.scale.set(1,1,.22);const l=E(new Nt(.22,.02,16,48),ut(10265519),0,.42),h=E(new z(.015,.015,.2,12),ut(),0,.1),f=E(new z(.12,.14,.03,32),en(3099491),0,.015);r(o,l,h,f);break}case"mirror":{const o=E(He(.4,.5,.02,.006),[ut(4674921),ut(4674921),ut(4674921),ut(4674921),new $({color:16777215,metalness:1,roughness:.03}),ut(4674921)],0,.3,0),l=E(He(.36,.06,.12,.012),ci(),0,.03,-.02);r(o,l);break}case"biological_model":{const o=E(new Ie(.5,.012,.18),vt(14742270),0,.006),l=E(new Ie(.14,.003,.14),vt(15857397),0,.014),h=E(new jn(.045,32),new $({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);h.rotation.x=-Math.PI/2;const f=E(new Ie(.12,.014,.17),xt(16317180),-.18,.007);r(o,l,h,f);break}case"wire":{const o=new pe(new Ri(new Xo(.12,.15,5),240,.012,8,!1),new $({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=E(new z(.135,.135,.14,24),xt(3621201),0,.08);r(l,o);break}case"water_container":{const h=E(new z(.255,.3,.75,48,1,!0),vt(),0,.375),f=E(new jn(.3,48),vt(),0,.003);f.rotation.x=-Math.PI/2;const u=E(new Nt(.14,.02,12,32,Math.PI*1.3),vt(),.3*.85,.75*.6);u.rotation.z=Math.PI/2,r(h,f,u,On(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),h=E(new z(.025,.025,l,24),ut(10265519),0,.025);h.rotation.z=Math.PI/2;const f=E(new Gt(.025,16,16),ut(7434618),-l/2,.025),u=f.clone();u.position.x=l/2,r(h,f,u);break}case"balance":{const o=E(He(.55,.1,.42,.03),en(15067115),0,.05),l=E(new z(.16,.16,.015,40),yt(),0,.11,.02),h=E(new z(.03,.03,.02,16),ut(),0,.1,.02),f=E(He(.3,.07,.05,.012),xt(2042167),0,.07,.2),u=new Dn(new Ys({map:Wa("0.0 g"),depthTest:!1,transparent:!0}));u.scale.set(.3,.135,1),u.position.set(0,.24,.2),u.renderOrder=9,u.userData.role="balance_display",r(o,l,h,f,u);break}case"stopwatch":{const o=E(new z(.13,.13,.045,48),en(2042167),0,.16);o.rotation.x=Math.PI/2;const l=E(new Nt(.13,.01,10,48),yt(),0,.16),h=E(new z(.022,.022,.04,16),yt(),0,.305),f=E(new Nt(.025,.006,8,20),yt(),0,.34),u=E(He(.18,.03,.12,.01),xt(3621201),0,.015),d=new Dn(new Ys({map:Wa("00:00.0"),depthTest:!1,transparent:!0}));d.scale.set(.2,.09,1),d.position.set(0,.16,.03),d.renderOrder=9,d.userData.role="stopwatch_display",r(o,l,h,f,u,d);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,h=o*.05,f=(o+l*1.6)*.05,u=new pe(new Ri(new Xo(f,.05,22),440,.007,6,!1),new $({color:13094097,roughness:.25,metalness:1}));u.userData.role="spring_body",u.userData.naturalLengthUnits=h,u.userData.maxLengthUnits=f,u.scale.y=h/f,u.position.y=.85-f*u.scale.y/2;const d=E(new Nt(.03,.008,8,20),ut(7434618),0,.85),g=E(new z(.05,.05,.015,24),ut(5395035));g.userData.role="spring_hanger",g.position.y=.85-f*u.scale.y,r(u,d,g);break}case"retort_stand":{const o=en(3099491);r(E(He(.36,.035,.24,.012),o,0,.0175)),r(E(new z(.016,.016,.95,20),ut(),-.13,.5)),r(E(He(.07,.07,.07,.01),o,-.13,.9));const l=E(new z(.01,.01,.07,10),ut(),-.13,.9,.06);l.rotation.x=Math.PI/2;const h=E(new z(.012,.012,.3,16),ut(),.03,.9);h.rotation.z=Math.PI/2,r(l,h,E(He(.04,.05,.05,.008),Pn(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),h=.04+Math.min(.06,o/3e3),f=Et(256,256,(d,g)=>{d.fillStyle="#4a525c",d.fillRect(0,0,g,g),d.fillStyle="#1f2328",d.beginPath(),d.arc(g/2,g/2,22,0,Math.PI*2),d.fill(),d.fillRect(g/2-9,g/2,18,g/2),d.fillStyle="#f1f5f9",d.font="bold 58px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText(`${o}g`,g/2,g/2-62)}),u=en(4870748);u.metalness=.5,r(E(new z(l,l,h,36),[u,new $({map:f,metalness:.4,roughness:.5}),u],0,h/2));break}case"ray_box":{const o=n.state==="on",l=E(He(.35,.22,.28,.03),en(2042167),0,.11),h=E(new Ie(.2,.16,.012),xt(988970),0,.11,.145),f=E(new Ie(.02,.12,.02),new $({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);f.userData.role="led";const u=E(new z(.012,.012,.3,10),xt(1120295),0,.03,-.29);u.rotation.x=Math.PI/2,r(l,h,f,u);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(E(He(o,.1,.55,.01),vt(14676223),0,.05));break}case"projectile_launcher":{const o=new $({color:2962235,metalness:.6,roughness:.4});r(E(He(.5,.05,.36,.015),o,0,.025));for(const d of[-.09,.09])r(E(He(.1,.22,.02,.006),o,0,.14,d));const l=new wt;l.position.y=.22,l.rotation.z=Math.PI/4;const h=E(new z(.05,.055,.45,28),new $({color:1920728,metalness:.5,roughness:.35}),.17,0);h.rotation.z=-Math.PI/2;const f=E(new Nt(.053,.011,12,28),yt(),.39,0);f.rotation.y=Math.PI/2;const u=E(new z(.018,.018,.22,16),ut());u.rotation.x=Math.PI/2,l.add(h,f,u),r(l);break}case"projectile":{r(E(new Nt(.05,.012,10,28),xt(3621201),0,.012)),r(E(new Gt(.07,32,20),new $({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=E(new z(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new $({map:Bv(),transparent:!0,opacity:.92,roughness:.3,side:Kt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,h=.62,f=.085,u=[new J(0,.004),new J(l*.96,.004),new J(l,.03),new J(f+.01,h*.7),new J(f,h*.76),new J(f,h-.02),new J(f+.012,h),new J(f+.012,h+.012)],d=o?new gi({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:Kt,depthWrite:!1}):vt();r(new pe(new Kn(u,56),d));const g=Et(512,512,(y,x,w)=>{y.clearRect(0,0,x,w),y.fillStyle="#ffffff",y.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([R,v])=>{y.fillRect(x*.6,w*R,x*.13,5),y.font="bold 34px Arial",y.fillText(v,x*.76,w*R+12)}),y.fillRect(x*.63,w*.64,x*.07,4),y.font="bold 40px Arial",y.fillText("250 ml",x*.12,w*.52),y.fillRect(x*.14,w*.58,x*.2,w*.09),y.save(),y.translate(x*.56,w*.86),y.rotate(-Math.PI/2),y.font="bold 22px Arial",y.fillText("APPROX. VOL",0,0),y.restore()}),_=.03,m=h*.7,p=new pe(new Kn([new J(l*1.006,_),new J((f+.01)*1.006,m)],24,-.75,1.5),new ds({map:g,transparent:!0,depthWrite:!1,side:Kt}));r(p);const M=new pe(new z(.11,l*.94,h*.66,48),new $({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));M.userData.role="liquid",M.userData.maxFillHeight=h*.66,M.scale.y=.001,r(M);break}case"round_bottom_flask":{const o=E(new Gt(.28,40,28),vt(),0,.36),l=E(new z(.07,.07,.34,28,1,!0),vt(),0,.78),h=E(new Nt(.2,.025,12,40),xt(3621201),0,.05);h.rotation.x=Math.PI/2;const f=new wt;f.position.y=.14,f.add(On(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,h,f);break}case"evaporating_dish":{const o=[new J(0,.01),new J(.12,.012),new J(.26,.09),new J(.3,.13)];r(new pe(new Kn(o,48),new $({color:16317180,roughness:.25,side:Kt})));const l=new wt;l.position.y=.012,l.add(On(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=E(new Nt(.3,.02,12,48),ut(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const h=l/3*Math.PI*2,f=E(new z(.018,.018,.82,12),ut(5395035),Math.cos(h)*.34,.4,Math.sin(h)*.34);f.rotation.z=Math.cos(h)*-.08,f.rotation.x=Math.sin(h)*.08,r(f)}break}case"wire_gauze":{const o=Et(256,256,(l,h,f)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,h,f),l.strokeStyle="#4b5563",l.lineWidth=2;for(let u=0;u<h;u+=10)l.beginPath(),l.moveTo(u,0),l.lineTo(u,f),l.moveTo(0,u),l.lineTo(h,u),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(h/2,f/2,h*.28,0,Math.PI*2),l.fill()});r(E(new Ie(.62,.008,.62),new $({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=E(new z(.26,.03,.32,40,1,!0),vt(),0,.52),l=E(new z(.025,.02,.32,20,1,!0),vt(),0,.2),h=E(new Bn(.22,.27,32,1,!0),new $({color:16777215,roughness:.9,side:Kt}),0,.53);h.rotation.x=Math.PI,r(o,l,h);break}case"test_tube_rack":{const o=E(He(.9,.04,.24,.01),ci(),0,.3),l=E(He(.9,.04,.24,.01),ci(),0,.02),h=E(He(.04,.3,.24,.01),ci(),-.43,.16),f=h.clone();f.position.x=.43,r(o,l,h,f);const u=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let d=0;d<4;d++){const g=-.3+d*.2;r(E(new z(.055,.055,.42,20,1,!0),vt(),g,.25)),r(E(new z(.05,.05,.12,20),new $({color:u[d],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=E(He(.32,.008,.05,.003),yt(),.16,.006),l=E(new Gt(.04,20,10,0,Math.PI*2,0,Math.PI/2),yt(),-.18,.04);l.rotation.x=Math.PI;const h=E(new z(.008,.008,.18,12),yt(),-.06,.008);h.rotation.z=Math.PI/2,r(o,l,h);break}case"wash_bottle":{const o=E(new z(.17,.18,.5,36),new $({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=E(new z(.07,.09,.08,24),xt(2450411),0,.54),h=E(new z(.012,.012,.3,10),xt(2450411),.08,.66);h.rotation.z=-.9,r(o,l,h,On(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const h=[new J(0,.003),new J(.188,.003),new J(.2,.03),new J(.2,.56),new J(.16000000000000003,.64),new J(.07,.6900000000000001),new J(.065,.75),new J(.072,.76)];r(new pe(new Kn(h,40),vt())),r(On(.2*.97,.56,n.color||"#eef6f8",.78));const f=E(new z(.06,.055,.07,24),vt(15266031),0,.56+.22),u=E(new z(.09,.09,.035,28),vt(15266031),0,.56+.27);r(f,u,Wh(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(E(new z(.21,.21,.46,40,1,!0),vt(),0,.46/2+.005)),r(E(new z(.21,.21,.01,40),vt(),0,.005));const h=.46*.62,f=E(new z(.21*.95,.21*.95,h,40),new $({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,h/2+.01),u=E(new z(.21*1.04,.21*1.04,.07,40),xt(2042167),0,.46+.035);r(f,u,Wh(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=E(new z(.02,.008,.36,16),vt(),0,.24),l=E(new Gt(.045,20,14),xt(1120295),0,.46);l.scale.y=1.6;const h=E(new z(.1,.1,.22,28),new $({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,h);break}case"crucible":{const o=[new J(0,.005),new J(.08,.005),new J(.13,.2),new J(.14,.21)],l=new $({color:16119284,roughness:.3,side:Kt});r(new pe(new Kn(o,40),l));const h=E(new z(.15,.15,.015,40),l,.32,.008),f=E(new Gt(.025,16,12),l,.32,.025);r(h,f);break}case"bar_magnet":{r(E(He(.3,.08,.1,.01),en(14427686),-.15,.04),E(He(.3,.08,.1,.01),en(1920728),.15,.04));const o=Ea("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=Ea("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(E(new z(.12,.12,.04,40),Pn(),0,.02)),r(E(new z(.105,.105,.002,40),new $({color:16777215}),0,.041));const o=new wt,l=E(new Bn(.018,.09,4),bn(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const h=E(new Bn(.018,.09,4),bn(2042167),0,0,.045);h.rotation.x=Math.PI/2,o.add(l,h),o.position.y=.05,o.userData.role="needle",r(o,E(new z(.11,.11,.012,40),vt(),0,.06));break}case"prism":{const o=new Wi;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new Ti(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new pe(l,vt(14742270)));break}case"rheostat":{const o=new $({color:6054233,roughness:.75,metalness:.45}),l=new $({color:14925716,roughness:.6}),h=new $({color:1118481,roughness:.35}),f=.2,u=.79,d=Et(64,64,(y,x,w)=>{y.fillStyle="#1a1a1a",y.fillRect(0,0,x,w);for(let S=0;S<w;S+=4)y.fillStyle="#3a3a3a",y.fillRect(0,S,x,1),y.fillStyle="#050505",y.fillRect(0,S+2,x,1)});d.wrapS=d.wrapT=vn,d.repeat.set(1,18);const g=E(new z(.125,.125,1.24,48),new $({map:d,roughness:.4,metalness:.6}),0,f);g.rotation.z=Math.PI/2,r(g);for(const y of[-1,1]){const x=E(new z(.12,.12,.1,40),l,y*.67,f),w=E(new z(.129,.129,.035,40),yt(),y*.635,f),S=E(new z(.1,.1,.05,32),o,y*.745,f);for(const P of[x,w,S])P.rotation.z=Math.PI/2;r(x,w,S);const R=new Wi;R.moveTo(-.17,0),R.lineTo(.17,0),R.lineTo(.09,.42),R.lineTo(-.09,.42),R.closePath();const v=new Ti(R,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});v.translate(0,0,-.015);const T=new pe(v,o);T.rotation.y=Math.PI/2,T.position.x=y*u,r(T);for(const P of[-.2,.2]){const N=E(He(.1,.025,.09,.008),o,y*(u-y*.04),.0125,P),F=E(new z(.018,.018,.027,16),new $({color:2042167}),y*(u-y*.04),.0125,P);r(N,F)}r(E(He(.05,.03,.06,.006),yt(),y*.6,f-.15,.06)),r(E(new z(.014,.014,.02,12),ut(10265519),y*.6,f-.125,.06))}const _=(y,x,w,S)=>{const R=new wt,v=E(new z(.012,.012,.04,12),Pn(),S*.02,0,0);v.rotation.z=Math.PI/2;const T=E(new z(.03,.03,.06,18),h,S*.065,0,0);T.rotation.z=Math.PI/2;for(let P=0;P<9;P++){const N=E(new Ie(.06,.006,.006),h,S*.065,Math.cos(P*.7)*.03,Math.sin(P*.7)*.03);R.add(N)}return R.add(v,T),R.position.set(y,x,w),R};r(_(u+.02,.32,.03,1),_(u+.02,.1,.03,1),_(-u-.02,.2,.06,-1));const m=E(new z(.012,.016,.05,12),Pn(),u+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(E(new Ie(u*2,.035,.035),yt(),0,.395,-.02));const p=new wt,M=Et(128,128,(y,x,w)=>{y.fillStyle="#111111",y.fillRect(0,0,x,w),y.fillStyle="#e5e7eb",y.font="bold 26px Arial",y.textAlign="center",y.save(),y.translate(30,w/2),y.rotate(-Math.PI/2),y.fillText("11",0,-4),y.fillText("5",0,22),y.restore()});p.add(E(He(.13,.08,.13,.015),[h,h,new $({map:M,roughness:.35}),h,h,h],0,.41,-.01)),p.add(E(He(.12,.09,.05,.012),h,0,.34,.05));for(const y of[-.035,.025])p.add(E(new z(.017,.017,.006,20),yt(),.02,.453,y));p.position.x=.05,p.userData.role="slider",r(p);break}case"dry_cell":{const o=Et(512,256,(_,m,p)=>{_.fillStyle="#d61f26",_.fillRect(0,0,m,p),_.fillStyle="#f5c518",_.fillRect(0,0,m,10),_.fillRect(0,p-10,m,10);const M=m*.25;_.textAlign="center",_.font="italic bold 40px Georgia",_.fillStyle="#fde68a",_.fillText("Power Cell",M,52),_.fillStyle="#f59e0b",_.beginPath(),_.arc(M,118,40,0,Math.PI*2),_.fill(),_.fillStyle="#7c2d12",_.font="bold 44px Arial",_.fillText("+",M,134),_.fillStyle="#fde68a",_.font="bold 22px Arial",_.fillText("SUPER QUALITY",M,190),_.fillStyle="#ffffff",_.font="bold 24px Arial",_.fillText("BATTERY",M,218),_.fillText("1.5V",M,242),_.fillStyle="#fde68a",_.font="bold 30px Arial",_.fillText("1.5V  DRY CELL",m*.75,p/2+10)});o.wrapS=vn,o.offset.x=.25;const l=.09,h=.32,f=E(new z(l,l,h,48,1,!0),new $({map:o,roughness:.35}),0,h/2+.006),u=E(new z(l*.98,l*.98,.012,48),yt(),0,h+.006),d=E(new z(.03,.032,.025,24),yt(),0,h+.024),g=E(new z(l*.98,l*.98,.012,48),ut(10265519),0,.006);r(f,u,d,g);break}case"accumulator":{const o=Et(1024,768,(p,M,y)=>{p.fillStyle="#f8fafc",p.fillRect(0,0,M,y),p.fillStyle="#1d4ed8",p.strokeStyle="#1d4ed8",p.textAlign="center",p.font="bold 44px Arial",p.fillText("UPPER LEVEL",M/2,70),p.fillRect(M*.08,90,M*.84,6),p.fillText("LOWER LEVEL",M/2,170),p.fillRect(M*.08,190,M*.84,6),p.fillRect(M*.06,250,M*.88,12),p.fillRect(M*.06,280,M*.4,300),p.fillStyle="#ffffff",p.font="bold 120px Arial",p.fillText("12V",M*.26,440),p.font="bold 34px Arial",p.fillText("LEAD-ACID",M*.26,520),p.fillStyle="#1d4ed8",p.font="bold 110px Arial",p.fillText("NS60",M*.7,400),p.font="bold 56px Arial",p.fillText("12V / 45AH",M*.7,480),p.font="bold 34px Arial",p.fillText("ACCUMULATOR",M*.7,545),p.fillRect(M*.06,600,M*.88,10)}),l=new $({color:15857145,roughness:.55}),h=new $({color:1920728,roughness:.4}),f=E(He(.9,.62,.55,.03),[l,l,l,l,new $({map:o,roughness:.5}),l],0,.31),u=E(He(.94,.09,.59,.025),h,0,.665),d=E(He(.96,.03,.61,.01),h,0,.625),g=E(He(.16,.055,.03,.008),h,0,.66,.3);r(f,u,d,g);const _=new $({color:16436245,roughness:.45});for(let p=0;p<6;p++){const M=-.35+p*.14;r(E(new z(.045,.045,.02,24),h,M,.72,-.12)),r(E(new z(.036,.04,.05,8),_,M,.75,-.12)),r(E(new z(.026,.026,.012,16),_,M,.781,-.12))}const m=new $({color:9146260,roughness:.5,metalness:.7});for(const[p,M]of[[-.38,"+"],[.38,"-"]]){r(E(new z(.06,.06,.03,28),h,p,.725,.12)),r(E(new z(.026,.032,.09,20),m,p,.785,.12));const y=Ea(M);y.scale.set(.16,.035,1),y.position.set(p,.86,.12),r(y)}break}case"potentiometer":{const o=new $({color:13222799,roughness:.35,metalness:.9}),l=ut(12107462),h=new $({color:10108695,roughness:.55}),f=.12;r(E(new z(f,f,.09,48),o,0,.045));const u=new Wi;u.absarc(0,0,f*1.02,Math.PI*.05,Math.PI*.95,!0),u.lineTo(-f*1.05,f*.6),u.lineTo(f*1.05,f*.6);const d=new Ti(u,{depth:.012,bevelEnabled:!1}),g=E(d,h,0,.102,0);g.rotation.x=Math.PI/2,r(g),r(E(He(.2,.012,.14,.004),l,0,.114,-.02)),r(E(new z(.045,.045,.008,32),Pn(),0,.124));const _=E(new z(.05,.05,.03,6),o,0,.143);r(_),r(E(new z(.03,.03,.06,24),l,0,.16));for(let p=0;p<4;p++){const M=E(new Nt(.031,.004,6,24),l,0,.14+p*.012);M.rotation.x=Math.PI/2,r(M)}const m=E(new z(.024,.024,.2,24),l,0,.29);m.userData.role="lever",r(m,E(new Gt(.024,20,10,0,Math.PI*2,0,Math.PI/2),l,0,.39)),r(E(new Ie(.02,.06,.012),l,-.08,.15,-.07));for(const p of[-.07,0,.07]){const M=E(new Ie(.03,.08,.004),l,p,.07,f*.66),y=E(new Nt(.012,.005,8,16),l,p,.035,f*.66);r(M,y)}break}case"metre_bridge":{r(E(He(5.5,.08,.5,.01),new $({color:11561522,roughness:.6}),0,.04));const h=Et(2048,96,(p,M,y)=>{p.fillStyle="#f6d58a",p.fillRect(0,0,M,y),p.fillStyle="#1f2937",p.strokeStyle="#1f2937",p.font="bold 22px Arial",p.textAlign="center";for(let x=0;x<=100;x++){const w=24+x/100*(M-48),S=x%10===0;p.lineWidth=S?3:1.4,p.beginPath(),p.moveTo(w,0),p.lineTo(w,S?46:x%5===0?34:22),p.stroke(),S&&p.fillText(String(x),w,76)}}),f=E(new Qt(5,.14),new $({map:h,roughness:.6}),0,.081,.12);f.rotation.x=-Math.PI/2,r(f);const u=en(14212579);r(E(new Ie(.85,.012,.07),u,-2.1,.086,-.15)),r(E(new Ie(.07,.012,.32),u,-2.5,.086,0)),r(E(new Ie(.85,.012,.07),u,2.1,.086,-.15)),r(E(new Ie(.07,.012,.32),u,2.5,.086,0)),r(E(new Ie(2.6,.012,.07),u,0,.086,-.15));const d=E(new z(.004,.004,5,8),yt(),0,.1,.06);d.rotation.z=Math.PI/2,r(d);const g=xt(16436245);for(const[p,M]of[[-2.5,.13],[-2.4,-.15],[-1.75,-.15],[-1.2,-.15],[0,-.15],[1.2,-.15],[1.75,-.15],[2.4,-.15],[2.5,.13]])r(E(new z(.03,.035,.08,16),g,p,.13,M)),r(E(new z(.012,.012,.03,10),Pn(),p,.185,M));const _=E(new z(.03,.035,.28,16),xt(1120295),-.9,.16,.03);_.rotation.z=Math.PI/2.4;const m=E(new Bn(.012,.05,8),yt(),-.79,.11,.05);r(_,m);for(const p of[-2.55,2.55])for(const M of[-.2,.2])r(E(new z(.03,.03,.02,12),xt(1120295),p,-.005,M));break}case"optical_pyrometer":{const o=new $({color:2040099,roughness:.8}),l=yt(),h=new $({color:9067051,roughness:.7});r(E(new z(.3,.3,1.3,40),o,0,.65,-.32)),r(E(new z(.31,.31,.08,40),o,0,1.33,-.32));for(const m of[.45,1.05]){const p=E(new Nt(.305,.012,6,48),h,0,m,-.32);p.rotation.x=Math.PI/2,p.scale.z=2.2,r(p)}r(E(new z(.2,.2,.95,40),o,0,.5,.05)),r(E(new z(.205,.205,.06,40),l,0,.03,.05));const f=Et(512,128,(m,p,M)=>{m.fillStyle="#d6d9dc",m.fillRect(0,0,p,M),m.fillStyle="#f5f2e6",m.fillRect(150,18,210,92),m.strokeStyle="#374151",m.strokeRect(150,18,210,92),m.fillStyle="#14532d",m.font="italic bold 44px Georgia",m.fillText("Pyro",200,72),m.font="14px Arial",m.fillStyle="#111827";for(let y=0;y<9;y++)m.fillRect(160+y*22,98,2,8)});f.wrapS=vn,f.offset.x=.5,r(E(new z(.203,.203,.16,40,1,!0),new $({map:f,roughness:.3,metalness:.5}),0,.72,.05));const u=E(new Nt(.07,.015,10,32),l,0,.42,.25),d=E(new z(.05,.05,.02,24),o,0,.42,.25);d.rotation.x=Math.PI/2,r(u,d);const g=[new J(.06,0),new J(.065,.04),new J(.1,.11),new J(.095,.12)],_=new pe(new Kn(g,32),new $({color:2829616,roughness:.9,side:Kt}));_.position.set(0,1.05,.05),_.rotation.x=-.2,r(E(new z(.07,.08,.1,24),o,0,1,.05),_),r(E(new Ie(.03,.1,.03),l,.2,.82,.05));break}case"power_transistor":{const o=new $({color:1579035,roughness:.55}),l=ut(14278114),h=.5;for(const m of[-.1,0,.1])r(E(new Ie(.03,h,.012),l,m,h/2,0)),r(E(new Ie(.05,.06,.014),l,m,h+.02,0));const f=E(He(.4,.36,.18,.015),o,0,h+.2,.02);r(f);const u=Et(256,224,(m,p,M)=>{m.fillStyle="#18181b",m.fillRect(0,0,p,M),m.fillStyle="#e5e7eb",m.font="bold 48px Arial",m.textAlign="center",m.fillText("TIP122G",p/2,90),m.font="bold 40px Arial",m.fillText("AFN39",p/2,150),m.beginPath(),m.arc(40,40,18,0,Math.PI*2),m.lineWidth=4,m.strokeStyle="#e5e7eb",m.stroke()});r(E(new Qt(.38,.33),new $({map:u,roughness:.6}),0,h+.2,.111));const d=new Wi;d.moveTo(-.2,0),d.lineTo(.2,0),d.lineTo(.2,.34),d.lineTo(-.2,.34),d.lineTo(-.2,0);const g=new Ol;g.absarc(0,.26,.06,0,Math.PI*2,!1),d.holes.push(g);const _=E(new Ti(d,{depth:.05,bevelEnabled:!1}),l,0,h+.2,-.07);r(_);break}case"capacitor":{const f=Et(1024,512,(u,d,g)=>{u.fillStyle="#38bdf8",u.fillRect(0,0,d,g),u.fillStyle="#0f172a",u.fillRect(d*.62,0,d*.16,g),u.fillStyle="#38bdf8";for(let _=60;_<g;_+=130)u.fillRect(d*.66,_,d*.08,18);u.fillStyle="#0f172a",u.save(),u.translate(d*.3,g/2),u.rotate(-Math.PI/2),u.textAlign="center",u.font="bold 84px Arial",u.fillText("2200 µF",0,-40),u.font="bold 64px Arial",u.fillText("16 V",0,40),u.font="italic 44px Georgia",u.fillText("Robicon®  -40+85°C",0,110),u.restore()});f.wrapS=vn,f.offset.x=.3,r(E(new z(.26,.26,.95,48),new $({map:f,roughness:.4}),0,.35+.95/2)),r(E(new z(.26*.94,.26*.94,.012,48),ut(13751771),0,.35+.95+.002)),r(E(new z(.26*.94,.26*.94,.02,48),xt(1120295),0,.35-.005));for(const u of[-.09,.09])r(E(new z(.008,.008,.35,8),Go(),u,.35/2,0));break}case"transformer":{const o=new $({color:5988456,roughness:.55,metalness:.4}),l=.9,h=.95,f=.42,u=.24;r(E(new Ie(l,u*.8,f),o,0,u*.4)),r(E(new Ie(l,u*.8,f),o,0,h-u*.4));for(const M of[-.66/2,(l-u)/2])r(E(new Ie(u,h,f),o,M,h/2));const d=Et(256,256,(M,y,x)=>{M.fillStyle="#5b6068",M.fillRect(0,0,y,x),M.strokeStyle="rgba(0,0,0,0.25)";for(let w=0;w<x;w+=6)M.beginPath(),M.moveTo(0,w),M.lineTo(y,w),M.stroke()});for(const M of[f/2+.001,-f/2-.001]){const y=E(new Qt(l,h),new $({map:d,roughness:.55,metalness:.4,transparent:!0,opacity:.5}),0,h/2,M);M<0&&(y.rotation.y=Math.PI),r(y)}const g=Et(64,512,(M,y,x)=>{for(let w=0;w<x;w+=8){const S=M.createLinearGradient(0,w,0,w+8);S.addColorStop(0,"#7c2d12"),S.addColorStop(.5,"#e07a3f"),S.addColorStop(1,"#7c2d12"),M.fillStyle=S,M.fillRect(0,w,y,8)}});g.wrapS=g.wrapT=vn,g.repeat.set(4,1);const _=new $({map:g,roughness:.3,metalness:.75}),m=xt(15987958);for(const M of[-.66/2,(l-u)/2]){r(E(He(u+.22,h-u*1.7,f+.18,.08),_,M,h/2));for(const y of[u*.85,h-u*.85])r(E(He(u+.26,.02,f+.22,.006),m,M,y))}const p=(M,y)=>{const x=E(new z(.015,.015,.5,10),xt(M),l/2+.25,y,0);return x.rotation.z=Math.PI/2,x};r(p(14427686,h*.62),p(2450411,h*.38));break}case"twin_flex_wire":{const o=l=>{const h=[];for(let d=0;d<=900;d++){const g=d/900,_=g*5*Math.PI*2,m=.55+.05*Math.sin(_*.7)+.03*Math.sin(_*2.3),p=.04+.018*Math.sin(_*1.3)+g*.05,M=_*9+l,y=.016;h.push(new L((m+y*Math.cos(M))*Math.cos(_),p+y*Math.sin(M),(m+y*Math.cos(M))*Math.sin(_)*.85))}return new Fl(h)};r(E(new Ri(o(0),1400,.014,8,!1),xt(14427686))),r(E(new Ri(o(Math.PI),1400,.014,8,!1),xt(1120295)));break}case"toroid_inductor":{const h=E(new Nt(.3,.1,24,64),new $({color:15920326,roughness:.6}),0,.12000000000000001);h.rotation.x=Math.PI/2,r(h);const f=new $({color:12735786,roughness:.3,metalness:.8}),u=44;for(let d=0;d<u;d++){const g=d/u*Math.PI*2,_=E(new Nt(.1+.014,.012,6,20),f,Math.cos(g)*.3,.1+.02,Math.sin(g)*.3);_.rotation.y=-g,r(_)}for(const d of[-.05,.05]){const g=E(new z(.008,.008,.45,8),Go(),.6,.16,d);g.rotation.z=Math.PI/2,r(g)}break}case"micrometer":{const o=yt(),l=ut(13620184),h=new Wi;h.moveTo(-.32,.22),h.lineTo(-.32,0),h.absarc(0,0,.32,Math.PI,Math.PI*2,!1),h.lineTo(.32,.22),h.lineTo(.2,.22),h.lineTo(.2,0),h.absarc(0,0,.2,0,Math.PI,!0),h.lineTo(-.2,.22),h.lineTo(-.32,.22);const f=E(new Ti(h,{depth:.07,bevelEnabled:!0,bevelSize:.008,bevelThickness:.008,bevelSegments:2}),l,0,.33,-.035);r(f);const u=Et(256,128,(y,x,w)=>{y.fillStyle="#cfd3d8",y.fillRect(0,0,x,w),y.fillStyle="#111827",y.font="bold 34px Arial",y.textAlign="center",y.fillText("0-25mm",x/2,52),y.fillText("0.01",x/2,98)});r(E(new Qt(.2,.1),new $({map:u,roughness:.5,metalness:.4}),0,.07,.045));const d=.5,g=(y,x,w)=>{const S=E(y,x,w,d,0);return S.rotation.z=Math.PI/2,S};r(g(new z(.035,.035,.06,20),o,-.17)),r(g(new z(.03,.03,.32,20),o,.04)),r(g(new z(.06,.06,.12,24),l,.26));const _=Et(256,512,(y,x,w)=>{y.fillStyle="#d8dce0",y.fillRect(0,0,x,w),y.fillStyle="#111827";const S=x*.5;y.fillRect(S-1,0,3,w),y.font="bold 18px Arial";for(let R=0;R<=25;R++){const v=12+R*19;y.fillRect(S-22,v,22,2),R<25&&y.fillRect(S+1,v+9,16,2),R%5===0&&(y.save(),y.translate(S-30,v),y.rotate(-Math.PI/2),y.fillText(String(R),-6,0),y.restore())}});_.wrapS=vn,_.offset.x=.25;const m=g(new z(.05,.05,.4,32),new $({map:_,roughness:.35,metalness:.6}),.52);r(m);const p=Et(512,64,(y,x,w)=>{y.fillStyle="#d8dce0",y.fillRect(0,0,x,w),y.fillStyle="#111827";for(let S=0;S<50;S++)y.fillRect(S*(x/50),0,2,S%5===0?30:18)});r(g(new z(.07,.075,.1,40),new $({map:p,roughness:.35,metalness:.6}),.68));const M=Et(128,128,(y,x,w)=>{y.fillStyle="#9aa0a6",y.fillRect(0,0,x,w),y.strokeStyle="#4b5563";for(let S=-w;S<x;S+=8)y.beginPath(),y.moveTo(S,0),y.lineTo(S+w,w),y.stroke(),y.beginPath(),y.moveTo(S+w,0),y.lineTo(S,w),y.stroke()});M.wrapS=M.wrapT=vn,M.repeat.set(6,2),r(g(new z(.075,.075,.24,40),new $({map:M,roughness:.5,metalness:.7}),.85)),r(g(new z(.035,.035,.08,20),o,1.01)),r(g(new z(.055,.055,.08,24,1),new $({map:M,roughness:.5,metalness:.7}),1.09));break}case"vernier_caliper":{const o=ut(14014942),l=new wt,h=1.8,f=.14,u=.025,d=Et(2048,128,(M,y,x)=>{M.fillStyle="#e5e7eb",M.fillRect(0,0,y,x),M.fillStyle="#111827",M.textAlign="center",M.font="bold 26px Arial";const w=150,S=200,R=(y-S-60)/w;for(let v=0;v<=w;v++){const T=S+v*R,P=v%10===0?50:v%5===0?38:26;M.fillRect(T,x-P,2,P),v%10===0&&M.fillText(String(v/10),T,x-60)}}),g=E(new Ie(h,f,u),[o,o,o,o,new $({map:d,roughness:.4,metalness:.6}),o],0,0,0);l.add(g),l.add(E(new Ie(.16,.42,u),o,-h/2+.08,-.27,0)),l.add(E(new Ie(.06,.16,u*.6),o,-h/2+.12,.15,0));const _=-h/2+.5,m=Et(512,96,(M,y,x)=>{M.fillStyle="#cbd0d6",M.fillRect(0,0,y,x),M.fillStyle="#111827",M.font="bold 20px Arial",M.textAlign="center";for(let w=0;w<=50;w++){const S=40+w*8.6,R=w%10===0?34:w%5===0?26:18;M.fillRect(S,0,2,R),w%10===0&&M.fillText(String(w/2),S,60)}M.font="16px Arial",M.fillText("0.02 mm",440,86)});l.add(E(new Ie(.5,f+.08,u+.02),[o,o,o,o,new $({map:m,roughness:.4,metalness:.6}),o],_+.2,-.01,.005)),l.add(E(new Ie(.14,.42,u),o,_+.02,-.27,0)),l.add(E(new Ie(.06,.16,u*.6),o,_-.02,.15,0)),l.add(E(new z(.03,.03,.05,16),o,_+.2,f/2+.065,0));const p=E(new z(.045,.045,.03,20),o,_+.35,-f/2-.05,0);p.rotation.x=Math.PI/2,l.add(p),l.add(E(new Ie(.2,.02,.012),o,h/2+.1,-.03,0)),l.rotation.x=-Math.PI/2,l.position.y=u/2+.012,r(l);break}case"tape_measure":{const o=xt(16436245),l=new $({color:2042167,roughness:.85}),h=new wt,f=E(new z(.17,.17,.12,40),o,0,0,0);f.rotation.x=Math.PI/2;const u=E(new Nt(.17,.03,10,40,Math.PI*1.25),l,0,0,0);u.rotation.z=Math.PI*.6;const d=u.clone();d.position.z=-.045,u.position.z=.045;const g=E(He(.14,.1,.14,.02),l,.13,-.11,0),_=E(He(.06,.04,.05,.01),o,.05,.19,0),m=E(He(.12,.16,.012,.004),yt(),0,0,-.068);h.add(f,u,d,g,_,m),h.position.set(0,.18,0),r(h);const p=Et(1024,64,(x,w,S)=>{x.fillStyle="#facc15",x.fillRect(0,0,w,S),x.fillStyle="#111827",x.font="bold 30px Arial";for(let R=0;R<=40;R++){const v=20+R*24.5;x.fillRect(v,0,2,R%10===0?30:R%5===0?22:14),R%10===0&&R>0&&x.fillText(String(R/10),v+4,58)}x.fillStyle="#dc2626",x.font="bold 20px Arial",x.fillText("25ft",470,58)}),M=E(new Ie(.9,.004,.08),[xt(15381256),xt(15381256),new $({map:p,roughness:.4}),xt(15381256),xt(15381256),xt(15381256)],-.42,.02,0),y=E(new Ie(.012,.05,.09),yt(),-.87,.035,0);r(M,y);break}case"triple_beam_balance":{const o=new $({color:14205861,roughness:.5}),l=yt();r(E(He(1.5,.1,.36,.03),o,.1,.05)),r(E(He(.3,.18,.3,.04),o,-.45,.17)),r(E(He(.12,.42,.14,.02),o,.78,.31)),r(E(new z(.03,.03,.1,12),l,-.45,.31)),r(E(new z(.28,.27,.02,48),l,-.45,.37));const h=g=>Et(1024,48,(_,m,p)=>{_.fillStyle="#f8fafc",_.fillRect(0,0,m,p),_.fillStyle="#111827",_.font="16px Arial";for(let M=0;M<=50;M++){const y=10+M*19.6;_.fillRect(y,0,2,M%10===0?22:M%5===0?16:10),M%10===0&&_.fillText(String(M/50*g),y-6,42)}}),f=[.46,.4,.34],u=[10,500,100];f.forEach((g,_)=>{const m=E(new Ie(1,.045,.02),[l,l,l,l,new $({map:h(u[_]),roughness:.4}),l],.22,g,0);r(m),r(E(He(.05,.06,.05,.008),o,-.15+_*.12,g+.005,.01))}),r(E(new Ie(.18,.04,.06),l,-.25,.4,0)),r(E(new Ie(.1,.01,.01),bn(1120295),.76,.42,.075)),r(E(new Ie(.004,.08,.004),bn(14427686),.74,.42,.075));for(const[g,_]of[[-.1,.07],[.15,.06],[.38,.05]]){const m=E(new z(_*.8,_,.18,24),o,g,.17,.05);m.rotation.z=Math.PI/2,r(m)}const d=Et(256,96,(g,_,m)=>{g.fillStyle="#fff",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,56,_,40),g.fillStyle="#111827",g.font="bold 22px Arial",g.textAlign="center",g.fillText("TRIPLE BEAM BALANCE",_/2,34)});r(E(new Qt(.22,.08),new $({map:d}),-.45,.17,.152));break}case"carbon_resistor":{const o=new $({color:14203276,roughness:.35}),l=[new J(.001,-.3),new J(.07,-.3),new J(.1,-.26),new J(.1,-.14),new J(.085,-.1),new J(.085,.1),new J(.1,.14),new J(.1,.26),new J(.07,.3),new J(.001,.3)],h=new pe(new Kn(l,40),o);h.rotation.z=Math.PI/2,h.position.y=.12,r(h),[[-.19,7027231,.103],[-.07,1118481,.088],[.03,14427686,.088],[.2,13934615,.103]].forEach(([u,d,g])=>{const _=E(new z(g,g,.04,40),new $({color:d,roughness:d===13934615?.3:.4,metalness:d===13934615?.7:0}),u,.12,0);_.rotation.z=Math.PI/2,r(_)});for(const u of[-.55,.55]){const d=E(new z(.012,.012,.5,10),Go(),u,.12,0);d.rotation.z=Math.PI/2,r(d)}break}case"antique_telescope":{const o=Pn(),l=Et(512,256,(u,d,g)=>{u.fillStyle="#d9c39b",u.fillRect(0,0,d,g);for(let _=0;_<1500;_++)u.fillStyle=`rgba(110,70,30,${Math.random()*.08})`,u.fillRect(Math.random()*d,Math.random()*g,3,3);u.strokeStyle="rgba(90,60,30,0.35)",u.lineWidth=1;for(let _=0;_<12;_++)u.beginPath(),u.arc(Math.random()*d,Math.random()*g,20+Math.random()*60,0,Math.PI),u.stroke();u.fillStyle="rgba(160,60,40,0.25)",u.fillRect(40,0,120,g)}),h=new $({color:9063202,roughness:.6});r(E(new z(.2,.22,.06,32),h,0,.62));for(let u=0;u<3;u++){const d=u/3*Math.PI*2+Math.PI/2;r(Gh(new L(Math.cos(d)*.15,.6,Math.sin(d)*.15),new L(Math.cos(d)*.36,0,Math.sin(d)*.36),.03,h,!0))}r(E(new z(.12,.12,.03,24),h,0,.25)),r(E(new z(.04,.05,.12,16),o,0,.71));const f=new wt;f.position.set(0,.86,0),f.rotation.z=.42,f.add(E(new z(.12,.12,1.1,40),new $({map:l,roughness:.75}),0,0,0));for(const u of[-.42,-.1,.25,.5])f.add(E(new z(.125,.125,.04,40),o,0,u,0));f.add(E(new z(.135,.13,.09,40),ut(10265519),0,.58,0)),f.add(E(new z(.11,.12,.08,32),o,0,-.59,0)),f.add(E(new z(.03,.04,.14,16),o,0,-.68,0));for(const u of[-.1,.1])f.add(E(new z(.02,.02,.1,12),o,.13,-.45,u));f.rotation.order="ZYX",f.rotation.z=-Math.PI/2+.42,r(f);break}case"telescope":{const o=new $({color:1120295,roughness:.5}),l=ut(13751771),h=.75;for(let _=0;_<3;_++){const m=_/3*Math.PI*2+Math.PI/2;r(Gh(new L(Math.cos(m)*.05,h,Math.sin(m)*.05),new L(Math.cos(m)*.38,0,Math.sin(m)*.38),.016,l))}r(E(new z(.12,.12,.012,3),o,0,.3)),r(E(new z(.08,.09,.06,24),o,0,h)),r(E(He(.08,.14,.08,.01),o,0,h+.1));const f=new wt;f.position.set(0,h+.22,0),f.rotation.z=Math.PI/2-.25,f.add(E(new z(.09,.09,.7,40),new $({color:15068659,roughness:.3}),0,0,0)),f.add(E(new z(.11,.1,.22,40,1,!0),o,0,-.44,0));const u=E(new jn(.095,32),new gi({color:9684477,roughness:.05,metalness:.3,clearcoat:1}),0,-.38,0);u.rotation.x=Math.PI/2,f.add(u),f.add(E(new z(.05,.06,.12,24),o,0,.41,0)),f.add(E(new Ie(.07,.07,.07),o,0,.5,0));const d=E(new z(.028,.028,.12,16),o,.08,.5,0);d.rotation.z=Math.PI/2;const g=E(new z(.03,.03,.03,16),new $({color:15987958}),.15,.5,0);g.rotation.z=Math.PI/2,f.add(d,g),r(f);break}case"metre_rule":{const o=new $({color:14066524,roughness:.6}),l=new $({map:qh(),color:16113331,roughness:.55});r(E(new Ie(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=E(He(.42,.3,.2,.03),en(1976635),0,.15),l=E(new jn(.13,40,0,Math.PI),new $({map:Xh("G","#1d4ed8")}),0,.12,.101),h=E(new Ie(.006,.12,.004),bn(14427686),0,.18,.105);h.userData.role="needle",r(o,l,h,Gi(-.12,.3,0,14427686),Gi(.12,.3,0,1120295));break}case"tuning_fork":{const o=E(new Ie(.03,.4,.03),yt(),-.04,.42),l=o.clone();l.position.x=.04;const h=E(new Nt(.04,.015,10,20,Math.PI),yt(),0,.22);h.rotation.z=Math.PI;const f=E(new z(.015,.015,.14,12),yt(),0,.12),u=E(He(.24,.05,.14,.01),ci(),0,.025);r(o,l,h,f,u);break}case"pulley":{const o=E(new z(.15,.15,.05,40),ut(10265519),0,.9);o.rotation.x=Math.PI/2;const l=E(new Nt(.15,.015,10,40),xt(3621201),0,.9),h=E(He(.06,.12,.08,.01),ut(5395035),0,1.08),f=E(new z(.012,.012,1.1,12),ut(),-.3,.55),u=E(new z(.01,.01,.3,12),ut(),-.15,1.08);u.rotation.z=Math.PI/2;const d=E(He(.36,.03,.24,.01),en(2042167),-.3,.015),g=E(new z(.003,.003,.6,6),xt(16119284),.15,.6);r(o,l,h,f,u,d,g,E(new z(.05,.05,.1,20),Pn(),.15,.25));break}case"petri_dish":{r(E(new z(.22,.22,.05,48,1,!0),vt(),0,.025)),r(E(new z(.22,.22,.004,48),vt(),0,.002)),r(E(new z(.21,.21,.02,48),new $({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,h=.05+o%3*.04;r(E(new z(.02+o%2*.01,.02,.006,16),bn(16317180),Math.cos(l)*h,.025,Math.sin(l)*h))}break}case"hand_lens":{const o=E(new Gt(.14,32,32),vt(15988991),0,.03);o.scale.set(1,.16,1);const l=E(new Nt(.14,.018,12,48),xt(1120295),0,.03);l.rotation.x=Math.PI/2;const h=E(He(.3,.035,.05,.012),xt(1120295),.29,.03);r(o,l,h);break}case"scalpel":{const o=E(He(.32,.02,.035,.006),yt(),0,.012),l=new Wi;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const h=new pe(new Ti(l,{depth:.003,bevelEnabled:!1}),yt());h.rotation.x=-Math.PI/2,h.position.set(.16,.02,.02),r(o,h);break}case"forceps":{for(const o of[-1,1]){const l=E(He(.36,.012,.03,.004),yt(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(E(He(.05,.016,.08,.006),yt(),-.18,.012));break}case"dissecting_tray":{r(E(He(.9,.08,.6,.03),en(2042167),0,.04)),r(E(new Ie(.82,.01,.52),new $({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(E(new z(.006,.006,.06,8),yt(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(E(new z(.16,.16,.5,36,1,!0),vt(),0,.25)),r(E(new z(.17,.17,.06,36),xt(1013358),0,.53)),r(E(new z(.161,.161,.18,36,1,!0,-.6,1.2),new $({color:16777215,roughness:.8,side:Kt}),0,.3)),r(On(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=E(new z(.22,.16,.3,32),en(11817737),0,.15),l=E(new z(.2,.2,.02,32),bn(4139549),0,.29),h=E(new z(.015,.02,.5,10),bn(1409085),0,.54);r(o,l,h);const f=new $({color:2278750,roughness:.5,side:Kt});for(let u=0;u<6;u++){const d=E(new Gt(.09,16,10),f,0,.42+u*.07);d.scale.set(1.4,.15,.6),d.rotation.y=u*2.1,d.position.x=Math.cos(u*2.1)*.08,d.position.z=-Math.sin(u*2.1)*.08,r(d)}break}case"soil_sieve":{const o=E(new z(.4,.4,.14,48,1,!0),new $({color:10576391,roughness:.6,side:Kt}),0,.07),l=Et(256,256,(f,u,d)=>{f.clearRect(0,0,u,d),f.strokeStyle="#6b7280",f.lineWidth=2;for(let g=0;g<u;g+=8)f.beginPath(),f.moveTo(g,0),f.lineTo(g,d),f.moveTo(0,g),f.lineTo(u,g),f.stroke()}),h=E(new jn(.39,48),new $({map:l,transparent:!0,metalness:.6,side:Kt}),0,.03);h.rotation.x=-Math.PI/2,r(o,h);for(let f=0;f<14;f++){const u=f*2.4,d=f%4*.08;r(E(new oc(.025+f%3*.01),bn(7893356),Math.cos(u)*d,.05,Math.sin(u)*d))}break}case"rain_gauge":{const o=E(new z(.2,.06,.16,36,1,!0),ut(13358561),0,1),l=E(new z(.2,.2,.08,36,1,!0),ut(13358561),0,1.12),h=E(new z(.1,.1,.9,32,1,!0),vt(),0,.47),f=E(new z(.03,.01,.1,12),ut(5395035),0,.01);r(o,l,h,f,wa(.1,.1,.75,5),On(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=E(new z(.22,.25,.42,36),en(1483594),0,.21),l=E(new z(.025,.04,.6,16),en(1483594),.4,.4);l.rotation.z=-.95;const h=E(new z(.07,.04,.06,20),ut(10265519),.64,.58);h.rotation.z=-.95;const f=E(new Nt(.18,.022,10,32,Math.PI),en(1409085),0,.42);r(o,l,h,f,On(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(E(He(.9,.12,.55,.02),xt(1120295),0,.06)),r(E(new Ie(.84,.02,.49),bn(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const h=-.35+o*.14,f=-.15+l*.15;r(E(new z(.004,.004,.08,6),bn(1483594),h,.16,f));const u=E(new Gt(.022,10,8),bn(2278750),h,.2,f);u.scale.set(1.6,.3,.8),r(u)}break}case"garden_trowel":{const o=E(new Gt(.12,24,12,0,Math.PI,0,Math.PI/2),ut(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=E(new z(.012,.012,.1,10),ut(),0,.03);l.rotation.z=Math.PI/2;const h=E(new z(.03,.03,.24,16),ci(),-.17,.03);h.rotation.z=Math.PI/2,r(o,l,h);break}case"hand_hoe":{const o=new wt,l=new $({color:13213802,roughness:.6}),h=new $({color:1842980,roughness:.45,metalness:.6}),f=E(new z(.03,.034,1.6,20),l,.85,0);f.rotation.z=Math.PI/2;const u=E(new z(.05,.05,.14,24),h,.05,0);u.rotation.z=Math.PI/2;const d=E(He(.05,.14,.05,.01),h,0,-.09),g=new Wi;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const _=new Ti(g,{depth:.014,bevelEnabled:!1}),m=new pe(_,new $({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const p=E(new Ie(.016,.04,.28),new $({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(f,u,d,m,p),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new wt,l=new $({color:14729103,roughness:.55}),h=new $({color:2303531,roughness:.5,metalness:.6}),f=E(new z(.045,.036,1.3,20),l,.72,0);f.rotation.z=Math.PI/2;const u=E(He(.16,.11,.11,.012),h,.06,0),d=E(He(.03,.09,.08,.006),yt(),.16,0),g=E(He(.05,.05,.24,.01),h,0,-.07);o.add(f,u,d,g);for(const _ of[-.09,0,.09]){const m=E(He(.04,.5,.025,.008),h,0,-.33,_),p=E(new Bn(.016,.07,4),new $({color:11844032,roughness:.25,metalness:1}),0,-.61,_);p.rotation.z=Math.PI,o.add(m,p)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=E(new z(.02,.02,1.2,12),ut(7041664),0,.75),l=E(new z(.025,.025,.5,12),ut(7041664),0,1.35);l.rotation.z=Math.PI/2;const h=new pe(new Ri(new Xo(.3,.05,4),200,.012,6,!1),ut(10265519));h.position.y=.15,r(o,l,h,E(new z(.25,.25,.04,32),bn(5978660),0,.02));break}case"soil_sample":{r(E(He(.7,.08,.45,.02),xt(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,h)=>{const f=E(new Gt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new $({color:l,roughness:1}),-.22+h*.22,.08);f.scale.y=.55,r(f)});break}case"safety_goggles":{for(const o of[-1,1]){const l=E(new Gt(.085,24,16),new $({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const h=E(new Nt(.085,.014,10,32),xt(1013358),o*.1,.08);r(l,h)}r(E(new Nt(.2,.012,8,40,Math.PI),xt(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=E(new z(.01,.01,.5,10),ut(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(E(new Nt(.03,.008,8,20),ut(7041664),.26,.015));break}case"heat_proof_mat":{r(E(He(.8,.03,.8,.01),new $({color:15197668,roughness:.95}),0,.015));break}default:r(E(He(.3,.3,.3,.03),bn(10265519),0,.15))}s.traverse(o=>{o instanceof pe&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new Vn;s.children.forEach(o=>{o instanceof Dn||a.expandByObject(o)});const c=Ea(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function Yh(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new pe(new Ri(new hc(t,s,n),32,.014,8,!1),new $({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const qu=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],zv=qu.flat(),Vv=i=>zv.find(e=>e.id===i);function Hv(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const Gv=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",Wv={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},Xv={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},qv={class:"space-y-1"},Yv=["onClick"],Zv={class:"truncate"},$v={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},Kv={class:"flex items-center justify-between gap-2 mb-2"},Jv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},jv={class:"flex flex-wrap gap-1.5"},Qv=["onClick"],ex={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},tx={class:"flex items-center gap-2"},nx={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},ix={class:"text-xs font-medium text-gray-400 ml-1"},sx={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},rx={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},ax=["max"],ox={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},lx={class:"flex flex-wrap gap-1.5"},cx=["onClick"],hx={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},ux={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},fx={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},dx={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},px={class:"flex gap-1.5"},mx=["onClick"],gx={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},_x=["value"],vx={class:"flex items-center justify-between"},xx={class:"flex gap-1.5"},yx={key:0,class:"pt-1"},Mx={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},bx={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},Sx={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},wx={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Ex={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},Tx={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Ax={class:"flex flex-wrap gap-1.5"},Rx={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},Cx={class:"text-center"},Px={class:"flex items-center gap-2 flex-shrink-0"},Dx={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},Ix={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},Lx={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},Nx=["max"],Ux={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},Fx={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},Ox={class:"flex items-start justify-between gap-2"},Bx={class:"text-xs text-gray-700 dark:text-gray-200"},kx={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},zx=.9,yr=5,Xx=sf({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean},wallShelves:{type:Boolean},benchLength:{},sideBenches:{type:Boolean}},emits:["takeChemical","putBack","pickApparatus","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=Pt(null),a=Pt(!1);let c,o,l,h;const f=new Map,u=new u0,d=new J,g=new Ai(new L(0,1,0),0),_=Pt(null),m=Pt(null),p=Pt(null),M=Pt(null);let y=!1,x=0;const w={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},S=C=>{if(P.value==="stopwatch"){if(C==="switch_on")return"Start";if(C==="switch_off")return"Stop";if(C==="measure")return"Read Time"}if(P.value==="microscope"){if(C==="switch_on")return"Light On";if(C==="switch_off")return"Light Off";if(C==="inspect")return"Observe"}return w[C]||C},R=()=>new Map(n.objectCatalog.map(C=>[C.object_type,C])),v=Pt([]),T=Pt(""),P=Pt(null),N=Pt(null),F=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],Y=["battery","dry_cell","accumulator"],K=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],O=new Map,Z=new Map,G=new Map,ie=new Map,le=Pt([...n.connections||[]]),re=Pt(null),fe=Pt(null),ye=Pt(""),Xe=Pt(0),me=Pt(100),ue=Pt(null),q=Pt(!1),he=Pt(null),ce=Pt(null),Se=Pt(null),Ve=new Map,Oe=new Map,at=new Map,Je=Pt(50),oe=Pt(40),de=Pt("very_blurred"),xe=Pt(!1),we=Pt(!1),Ee=new Map,nt=new Map,Ze=new Map,ot=Pt(0),ht=Pt(0),V=Pt(!1);let It=[];const St={very_blurred:10,blurred:5,almost_focused:2,focused:0};function D(C){ce.value=C,ue.value="protractor",m.value="measure"}const b=Pt(null),X=Pt([]);function Q(C){const I=R().get(C.object_type),U={...(I==null?void 0:I.default_props)||{},...C.props||{}},k=qo(C.object_type,C.key,U.display_name||(I==null?void 0:I.display_name)||C.object_type,U);if(k.position.set(C.position.x,C.position.y,C.position.z),C.rotation&&(k.rotation.y=C.rotation.y),o.add(k),f.set(C.key,k),F.includes(C.object_type)){const B=Ae(C.object_type,U);O.set(C.key,B),se(C.key,B/Number(U.capacity_ml??250))}Y.includes(C.object_type)&&Z.set(C.key,Number(U.voltage??6))}function ae(C){if(n.readOnly)return;const I=X.value.findIndex(k=>k.key===C);if(I===-1)return;const U=X.value[I];Q(U),X.value.splice(I,1),s("action",{objectKey:C,action:"move",value:C})}function ve(C){const I=n.sceneObjects.find(k=>k.key===C);if(!I)return{};const U=R().get(I.object_type);return{...(U==null?void 0:U.default_props)||{},...I.props||{}}}function Ae(C,I){return I.current_volume!==void 0?Number(I.current_volume):K.includes(C)?Number(I.capacity_ml??50):0}function se(C,I){const U=f.get(C);if(!U)return;const k=Math.max(.001,Math.min(1,I));U.traverse(B=>{if(B instanceof pe&&B.userData.role==="liquid"){const te=B.userData.maxFillHeight;B.scale.y=k,B.position.y=te*k/2}})}function _e(C){const I=new Set([C]),U=[C];for(;U.length;){const k=U.shift();le.value.forEach(B=>{B.from===k&&!I.has(B.to)&&(I.add(B.to),U.push(B.to)),B.to===k&&!I.has(B.from)&&(I.add(B.from),U.push(B.from))})}return I}function De(C){const I=n.sceneObjects.find(Ct=>Y.includes(Ct.object_type)),U=n.sceneObjects.find(Ct=>Ct.object_type==="switch"),k=n.sceneObjects.find(Ct=>Ct.object_type==="resistor"),B=n.sceneObjects.find(Ct=>Ct.key===C);if(!B)return{value:0,reason:null};if(!I||!U||!k)return{value:0,reason:"The circuit is incomplete. Check your connections."};const te=_e(I.key),Te=te.has(U.key),be=te.has(k.key),ze=te.has(C),lt=G.get(U.key)==="on";if(Te&&lt&&!be)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!Te||!be)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((G.get(I.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!lt)return{value:0,reason:"Close the switch before taking the reading."};if(!ze)return B.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:B.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const it=Z.get(I.key)??ve(I.key).voltage??6,st=ve(k.key).resistance_ohm??10,_t=it/st;return B.object_type==="ammeter"?{value:Math.round(_t*100)/100,reason:null}:B.object_type==="voltmeter"?{value:it,reason:null}:{value:0,reason:null}}function je(C){const I=ie.get(C);if(!I)return 25;const U=(Date.now()-I)/1e3;return Math.min(100,Math.round(25+U*3.5))}function Le(C,I){const U=f.get(C),k=f.get(I);if(!U||!k)return{ok:!1};if(U.position.distanceTo(k.position)>zx)return{ok:!1};const B=nt.has(I)?Number(ve(I).natural_length_cm??15)+(nt.get(I)??0):ve(I).length_cm??ve(I).natural_length_cm??10,te=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((B+te)*10)/10}}function Ce(C){const I=Ve.get(C);if(!I)return"very_blurred";const U=Number(ve(I).optimal_focus??50),k=Number(ve(I).focus_tolerance??6),B=at.get(C)??40,te=k*(40/B),Te=Oe.get(C)??0,be=Math.abs(Te-U);return be<=te?"focused":be<=te*2?"almost_focused":be<=te*4?"blurred":"very_blurred"}function $e(C){_.value===C&&(Je.value=Oe.get(C)??50,oe.value=at.get(C)??40,xe.value=G.get(C)==="on",we.value=Ve.has(C),de.value=Ce(C))}function rt(C){_.value&&(at.set(_.value,C),s("action",{objectKey:_.value,action:"select_objective",value:String(C)}),$e(_.value))}function ft(C){_.value&&(Oe.set(_.value,C),s("action",{objectKey:_.value,action:"focus_coarse",value:String(Math.round(C))}),$e(_.value))}function H(C){if(!_.value)return;const I=_.value,U=Math.max(0,Math.min(100,(Oe.get(I)??50)+C));Oe.set(I,U),s("action",{objectKey:I,action:"focus_fine",value:String(U)}),$e(I)}function Re(C){const U=[...Ee.get(C)??new Set].reduce((it,st)=>it+Number(ve(st).mass_g??0),0),k=Number(ve(C).spring_constant_n_per_m??40),te=U/1e3*9.8/k*100,Te=Number(ve(C).max_safe_extension_cm??12),be=Ze.get(C)??0,ze=te>Te;ze&&be===0&&Ze.set(C,(te-Te)*.3);const lt=te+(Ze.get(C)??0);return nt.set(C,Math.round(lt*100)/100),ge(C,lt),_.value===C&&(ht.value=U,ot.value=Math.round(lt*100)/100,V.value=ze),{totalMassG:U,exceeded:ze}}function ge(C,I){const U=f.get(C);U&&U.traverse(k=>{if(k instanceof pe&&k.userData.role==="spring_body"){const B=k.userData.naturalLengthUnits,te=k.userData.maxLengthUnits,Te=Math.min(te,B+Math.max(0,I)*.05);k.scale.y=Te/te,k.position.y=.85-te*k.scale.y/2}if(k.userData.role==="spring_hanger"){const B=[...U.children].find(te=>te.userData.role==="spring_body");B&&(k.position.y=.85-B.userData.maxLengthUnits*B.scale.y)}})}function Pe(C){return new L(Math.sin(C),0,Math.cos(C))}function Be(C,I){return C.clone().sub(I.clone().multiplyScalar(2*C.dot(I)))}function Me(C,I,U,k){let B=I.clone(),te=-B.dot(C);te<0&&(te=-te,B=B.clone().negate());const Te=U/k,be=Te*Te*(1-te*te);if(be>1)return null;const ze=Math.sqrt(1-be);return C.clone().multiplyScalar(Te).add(B.clone().multiplyScalar(Te*te-ze))}function Ke(C,I){const U=f.get(C),k=f.get(I);if(!U||!k)return null;const B=U.position.clone(),te=Pe(U.rotation.y),Te=Pe(k.rotation.y),be=te.dot(Te);if(Math.abs(be)<.001)return null;const ze=k.position.clone().sub(B).dot(Te)/be;if(ze<=.05)return null;const lt=B.clone().add(te.clone().multiplyScalar(ze));return lt.distanceTo(k.position)>.35?null:{point:lt,normal:Te,incidentDir:te}}function qe(){It.forEach(C=>{o.remove(C),C instanceof pe&&(C.geometry.dispose(),C.material.dispose())}),It=[]}function Vt(C,I,U){const k=C.clone().add(I).multiplyScalar(.5),B=Math.max(.01,C.distanceTo(I)),te=new pe(new z(.006,.006,B,8),new $({color:U,emissive:U,emissiveIntensity:.4,roughness:.4}));te.position.copy(k);const Te=I.clone().sub(C).normalize();return te.quaternion.copy(new Ui().setFromUnitVectors(new L(0,1,0),Te)),te}function Ut(){qe();const C=n.sceneObjects.find(ze=>ze.object_type==="ray_box"),I=n.sceneObjects.find(ze=>ze.object_type==="mirror"),U=n.sceneObjects.find(ze=>ze.object_type==="glass_block"),k=I||U;if(!C||!k||G.get(C.key)!=="on")return;const B=Ke(C.key,k.key);if(!B)return;const te=f.get(C.key),Te=Vt(te.position,B.point,16498468),be=Vt(B.point.clone().sub(B.normal.clone().multiplyScalar(.01)),B.point.clone().add(B.normal.clone().multiplyScalar(.4)),9741240);if(o.add(Te,be),It.push(Te,be),I){const ze=Be(B.incidentDir,B.normal),lt=Vt(B.point,B.point.clone().add(ze.multiplyScalar(1.2)),16498468);o.add(lt),It.push(lt)}else if(U){const ze=Number(ve(U.key).refractive_index??1.5),lt=Me(B.incidentDir,B.normal,1,ze);if(lt){const it=B.point.clone().add(lt.clone().multiplyScalar(.4)),st=Vt(B.point,it,6333946),_t=Vt(it,it.clone().add(B.incidentDir.clone().multiplyScalar(1)),16498468);o.add(st,_t),It.push(st,_t)}}}function Nn(C,I,U){const k=n.sceneObjects.find(it=>it.object_type==="ray_box");if(!k)return{ok:!1};const B=Ke(k.key,I);if(!B)return{ok:!1};const te=f.get(C);if(!te||te.position.distanceTo(B.point)>.4)return{ok:!1};let Te;if(U==="incidence")Te=B.incidentDir.clone().negate();else{const it=n.sceneObjects.find(st=>st.key===I);if((it==null?void 0:it.object_type)==="glass_block"){const st=Number(ve(I).refractive_index??1.5),_t=Me(B.incidentDir,B.normal,1,st);if(!_t)return{ok:!1};Te=_t}else Te=Be(B.incidentDir,B.normal)}const be=Math.abs(Te.normalize().dot(B.normal)),ze=Math.acos(Math.min(1,Math.max(-1,be)))*180/Math.PI,lt=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((ze+lt)*10)/10}}const dn=new Map,gs=new Map;function Br(C){const I=f.get(C);if(!I)return;const U=dn.get(C),k=U?Number(ve(U).mass_g??0):0;I.traverse(B=>{var te;if(B instanceof Dn&&B.userData.role==="balance_display"){const Te=B.material;(te=Te.map)==null||te.dispose(),Te.map=Wa(`${k.toFixed(1)} g`),Te.needsUpdate=!0}})}const ni=new Map,Ji=new Map,tr=new Map,nr=Pt("00:00.0");function ir(C){const I=Math.max(0,C)/1e3,U=Math.floor(I/60).toString().padStart(2,"0"),k=(I%60).toFixed(1).padStart(4,"0");return`${U}:${k}`}function Gn(C){const I=tr.get(C)??0;return ni.get(C)?I+(Date.now()-(Ji.get(C)??Date.now())):I}function ji(C){const I=f.get(C),U=Gn(C);_.value===C&&(nr.value=ir(U)),I&&I.traverse(k=>{var B;if(k instanceof Dn&&k.userData.role==="stopwatch_display"){const te=k.material;(B=te.map)==null||B.dispose(),te.map=Wa(ir(U)),te.needsUpdate=!0}})}function kr(C){ni.set(C,!1),tr.set(C,0),Ji.delete(C),ji(C)}function sr(C){f.forEach((I,U)=>{I.traverse(k=>{if(!(k instanceof pe)||k.userData.role==="flame"||k.userData.role==="led")return;(Array.isArray(k.material)?k.material:[k.material]).forEach(te=>{te instanceof $&&(te.emissive.setHex(U===C?2282478:0),te.emissiveIntensity=U===C?.3:0)})})})}function _s(C){var k;_.value=C,M.value=null,p.value=null;const I=n.sceneObjects.find(B=>B.key===C),U=I?R().get(I.object_type):null;v.value=(U==null?void 0:U.supported_actions)??[],T.value=((k=I==null?void 0:I.props)==null?void 0:k.display_name)??(U==null?void 0:U.display_name)??C,P.value=(I==null?void 0:I.object_type)??null,N.value=(I==null?void 0:I.object_type)==="battery"?Z.get(C)??ve(C).voltage??6:null,(I==null?void 0:I.object_type)==="microscope"&&$e(C),(I==null?void 0:I.object_type)==="spring"&&Re(C),sr(C)}function Qi(){_.value=null,M.value=null,re.value=null,P.value=null,sr(null)}function vs(C){if(!_.value)return;N.value=C,Z.set(_.value,C);const I=f.get(_.value);I&&I.traverse(U=>{var k;if(U instanceof Dn&&U.userData.role==="voltage"){const B=U.material;(k=B.map)==null||k.dispose(),B.map=Xu(C),B.needsUpdate=!0}})}function zr(C){const I=n.sceneObjects.find(k=>k.key===C);if(!I)return;const U=I.object_type;if(q.value=!1,he.value=C,F.includes(U)){re.value="readonly",ye.value="ml",fe.value=Math.round(O.get(C)??0),M.value=C;return}if(U==="ammeter"||U==="voltmeter"){const k=De(C);k.reason&&(Se.value=k.reason,setTimeout(()=>{Se.value=null},4e3)),re.value="readonly",ye.value=U==="ammeter"?"A":"V",fe.value=k.value,M.value=C,q.value=!!k.reason&&k.reason.includes("Short circuit");return}if(U==="balance"){re.value="readonly",ye.value="g";const k=dn.get(C);fe.value=k?Number(ve(k).mass_g??0):0,M.value=C;return}if(U==="stopwatch"){re.value="readonly",ye.value="s",fe.value=Math.round(Gn(C)/100)/10,M.value=C;return}if(U==="spring"){re.value="readonly",ye.value="cm";const k=Number(ve(C).natural_length_cm??15);fe.value=Math.round((k+(nt.get(C)??0))*10)/10,M.value=C,he.value=C;return}if(U==="protractor"){ce.value="incidence",ue.value="protractor",m.value="measure";return}if(U==="ruler"||U==="metre_rule"||U==="thermometer"){ue.value=U==="thermometer"?"thermometer":"ruler",m.value="measure";return}re.value="slider",ye.value="ml",me.value=Number(ve(C).capacity_ml??100),Xe.value=Math.round(me.value/2),M.value=C}function Vr(C){var I;if(_.value&&!n.readOnly&&!(C==="focus_coarse"||C==="focus_fine"||C==="select_objective")){if(C==="inspect"){const U=n.sceneObjects.find(be=>be.key===_.value),k=U?R().get(U.object_type):null;let B=(k==null?void 0:k.description)||"No further detail available.";const te=(I=U==null?void 0:U.props)!=null&&I.chemical_id?Vv(U.props.chemical_id):null;if(te&&U){const be=te.hazard?` Hazard: ${te.hazard} - handle with care and wear goggles.`:"",ze=te.state==="liquid"?` About ${Math.round(O.get(U.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";B=`${te.name}${te.formula?` (${te.formula})`:""}.${ze}${be}`}let Te=null;if(P.value==="microscope"){const be=_.value,ze=Ve.get(be),lt=at.get(be)??40;if(!ze)B="Place a specimen slide on the stage first.";else if(G.get(be)!=="on")B="Switch on the illumination to see anything through the eyepiece.";else{const it=Ce(be),st=ve(ze).expected_structures||"the specimen";it==="focused"?B=`At ×${lt}, clearly focused - you can see ${st}.`:it==="almost_focused"?B=`At ×${lt}, almost in focus - fine-tune the focus a little more.`:it==="blurred"?B=`At ×${lt}, blurred - adjust the coarse and fine focus.`:B=`At ×${lt}, very blurred - use the focus knobs before observing.`,Te=it}}p.value=B,s("action",{objectKey:_.value,action:C,value:Te});return}if(C==="zoom"){A(_.value),s("action",{objectKey:_.value,action:C,value:null});return}if(C==="switch_on"||C==="switch_off"){G.set(_.value,C==="switch_on"?"on":"off"),P.value==="stopwatch"&&(C==="switch_on"&&!ni.get(_.value)?(ni.set(_.value,!0),Ji.set(_.value,Date.now())):C==="switch_off"&&ni.get(_.value)&&(tr.set(_.value,Gn(_.value)),ni.set(_.value,!1)),ji(_.value)),P.value==="microscope"&&$e(_.value),P.value==="ray_box"&&Ut(),s("action",{objectKey:_.value,action:C,value:null});return}if(C==="measure"){zr(_.value);return}if(C==="connect"||C==="pour"||C==="heat"||C==="move"||C==="rotate"){m.value=C,h.enabled=C!=="move"&&C!=="rotate";return}}}const Wn=Pt("");Mr(m,C=>{C==="connect"?Wn.value="Click the object to connect to.":C==="pour"?Wn.value="Click the container to pour into.":C==="heat"?Wn.value="Click the object to place over the flame.":C==="move"?Wn.value="Drag the object to reposition it, then click Done.":C==="rotate"?Wn.value="Drag left/right to rotate, then click Done.":C==="measure"&&ue.value==="ruler"?Wn.value="Click the object to measure - place the ruler close to it first.":C==="measure"&&ue.value==="thermometer"?Wn.value="Click the substance to take a temperature reading.":C==="measure"&&ue.value==="protractor"&&(Wn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function Hr(){if(!M.value)return;const C=re.value==="slider"?String(Math.round(Xe.value)):fe.value!==null?String(fe.value):null;s("action",{objectKey:M.value,action:"measure",value:C,unit:ye.value,label:T.value,safetyIssue:q.value,targetObjectKey:he.value}),M.value=null,re.value=null,fe.value=null,q.value=!1,ce.value=null}function Ka(){if(b.value){et();return}m.value=null,ue.value=null,ce.value=null,h.enabled=!0}function Ja(){var C,I,U;if(!(!_.value||!m.value)){if(m.value==="move"){const k=f.get(_.value);let B=null;k&&f.forEach((st,_t)=>{_t!==_.value&&st.position.distanceTo(k.position)<.6&&(B=_t)});const te=_.value;dn.forEach((st,_t)=>{st===te&&_t!==B&&(dn.delete(_t),Br(_t))});const Te=B?(C=n.sceneObjects.find(st=>st.key===B))==null?void 0:C.object_type:null;Te==="balance"&&B&&(dn.set(B,te),Br(B)),gs.forEach((st,_t)=>{if(_t===te&&st!==B){const Ct=Number(ve(_t).volume_ml??0),qn=Math.max(0,(O.get(st)??0)-Ct);O.set(st,qn),se(st,qn/Number(ve(st).capacity_ml??250)),gs.delete(_t)}});const be=Number(ve(te).volume_ml??0);if(Te&&F.includes(Te)&&B&&be>0&&!gs.has(te)){gs.set(te,B);const st=(O.get(B)??0)+be;O.set(B,st),se(B,st/Number(ve(B).capacity_ml??250))}const ze=(I=n.sceneObjects.find(st=>st.key===te))==null?void 0:I.object_type;if(Ve.forEach((st,_t)=>{st===te&&_t!==B&&Ve.delete(_t)}),Te==="microscope"&&B&&ze==="biological_model"){Ve.set(B,te);const st=Number(ve(te).optimal_focus??50),_t=Number(ve(te).focus_tolerance??6),Ct=Math.random()<.5?-1:1,qn=_t*(3+Math.random()*3)*Ct;Oe.set(B,Math.max(0,Math.min(100,st+qn))),at.set(B,40),$e(B)}let lt,it=!1;if(ze==="mass_piece"){Ee.forEach((_t,Ct)=>{_t.has(te)&&Ct!==B&&_t.delete(te)}),Te==="spring"&&B&&(Ee.has(B)||Ee.set(B,new Set),Ee.get(B).add(te));const st=new Set(B&&Te==="spring"?[B]:[]);Ee.forEach((_t,Ct)=>st.add(Ct)),st.forEach(_t=>{const Ct=Re(_t);B===_t&&(lt=Ct.totalMassG,it=Ct.exceeded)}),it&&(Se.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Se.value=null},4500))}["ray_box","mirror","glass_block"].includes(ze||"")&&Ut(),s("action",{objectKey:_.value,action:"move",value:B,springLoadG:lt,safetyIssue:it})}else if(m.value==="rotate"){const k=f.get(_.value),B=k?Math.round(k.rotation.y*180/Math.PI):0,te=(U=n.sceneObjects.find(Te=>Te.key===_.value))==null?void 0:U.object_type;["ray_box","mirror","glass_block"].includes(te||"")&&Ut(),s("action",{objectKey:_.value,action:"rotate",value:String(B)})}m.value=null,h.enabled=!0}}function A(C){const I=f.get(C);if(!I)return;const U=I.position.clone().add(new L(0,.3,0)),k=l.position.clone().sub(h.target).normalize(),B=U.clone().add(k.multiplyScalar(1.4)),te=l.position.clone(),Te=h.target.clone();let be=0;const ze=()=>{be+=.05,l.position.lerpVectors(te,B,Math.min(be,1)),h.target.lerpVectors(Te,U,Math.min(be,1)),h.update(),be<1&&requestAnimationFrame(ze)};ze()}function W(C){const I=c.domElement.getBoundingClientRect();d.x=(C.clientX-I.left)/I.width*2-1,d.y=-((C.clientY-I.top)/I.height)*2+1}function ne(){u.setFromCamera(d,l);const C=[];f.forEach(k=>C.push(k));const I=u.intersectObjects(C,!0);if(I.length===0)return null;let U=I[0].object;for(;U&&!U.userData.objectKey;)U=U.parent;return U?U.userData.objectKey:null}let j=null;function ee(C){if(W(C),j={x:C.clientX,y:C.clientY},m.value==="move"&&_.value){y=!0;return}if(m.value==="rotate"&&_.value){y=!0,x=C.clientX;return}}function Ne(C){if(!(!y||!_.value)){if(W(C),m.value==="move"){u.setFromCamera(d,l);const I=new L;u.ray.intersectPlane(g,I);const U=f.get(_.value);U&&I&&(U.position.x=I.x,U.position.z=I.z)}else if(m.value==="rotate"){const I=C.clientX-x,U=f.get(_.value);U&&(U.rotation.y=I*.02)}}}function Ge(C){const I=j&&(Math.abs(C.clientX-j.x)>4||Math.abs(C.clientY-j.y)>4);if(y=!1,m.value==="move"||m.value==="rotate"||I||(W(C),ii()))return;const U=ne();if(!U){Qi();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(U===_.value)return;const k=_.value,B=m.value;if(B==="measure"){if(ue.value==="ruler"){const te=Le(k,U);if(!te.ok){Se.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Se.value=null},3500);return}re.value="readonly",ye.value="cm",fe.value=te.value}else if(ue.value==="thermometer")re.value="readonly",ye.value="°C",fe.value=je(U);else if(ue.value==="protractor"){const te=ce.value??"incidence",Te=Nn(k,U,te);if(!Te.ok){Se.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Se.value=null},3500);return}re.value="readonly",ye.value="°",fe.value=Te.value}he.value=U,M.value=k,m.value=null,ue.value=null,h.enabled=!0;return}if(B==="connect"){const te=f.get(k),Te=f.get(U);te&&Te&&o.add(Yh(te.position,Te.position)),le.value.push({from:k,to:U}),s("action",{objectKey:k,action:B,value:U}),m.value=null,h.enabled=!0;return}if(B==="heat"){ie.set(U,Date.now()),s("action",{objectKey:k,action:B,value:U}),m.value=null,h.enabled=!0;return}if(B==="pour"){Ue(k,U);return}}_s(U)}function Ue(C,I){var lt,it,st,_t;const U=n.sceneObjects.find(Ct=>Ct.key===C),k=n.sceneObjects.find(Ct=>Ct.key===I);if(!U||!k)return;const B=Number(ve(I).capacity_ml??250),te=O.get(I)??0,Te=Math.max(0,B-te),be=F.includes(U.object_type),ze=be?O.get(C)??0:Te;b.value={from:C,to:I,amount:0,max:Math.max(1,Math.round(Math.min(Te,ze))),fromLabel:((lt=U.props)==null?void 0:lt.display_name)??((it=R().get(U.object_type))==null?void 0:it.display_name)??U.object_type,toLabel:((st=k.props)==null?void 0:st.display_name)??((_t=R().get(k.object_type))==null?void 0:_t.display_name)??k.object_type,fromTracked:be}}function Ye(){if(!b.value)return;const{from:C,to:I,amount:U,fromTracked:k}=b.value,B=Number(ve(I).capacity_ml??250);if(se(I,((O.get(I)??0)+U)/B),k){const te=Number(ve(C).capacity_ml??250);se(C,Math.max(0,(O.get(C)??0)-U)/te)}}Mr(()=>{var C;return(C=b.value)==null?void 0:C.amount},Ye);function Qe(){if(!b.value)return;const{from:C,to:I,amount:U,fromTracked:k}=b.value;dt(C,I,U),O.set(I,Math.round((O.get(I)??0)+U)),k&&O.set(C,Math.max(0,Math.round((O.get(C)??0)-U))),s("action",{objectKey:I,action:"pour",value:String(Math.round(U))}),b.value=null,m.value=null,h.enabled=!0}function dt(C,I,U){if(U<=0)return;const k=gt(C),B=gt(I);if(!k||!B)return;const te=O.get(I)??0;B.color.lerp(k.color,te<=0?1:U/(te+U))}function gt(C){var U;let I=null;return(U=f.get(C))==null||U.traverse(k=>{!I&&k instanceof pe&&k.userData.role==="liquid"&&(I=k.material)}),I}function et(){if(b.value){const{from:C,to:I,fromTracked:U}=b.value,k=Number(ve(I).capacity_ml??250);if(se(I,(O.get(I)??0)/k),U){const B=Number(ve(C).capacity_ml??250);se(C,(O.get(C)??0)/B)}}b.value=null,m.value=null,h.enabled=!0}let Fe=null;const qt=Pt(null);function Yt(){const C=r.value;if(!C)return;try{Fe=Ev(C,{unitScale:yr,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14,cupboard:!!n.cupboard,wallCabinets:!!n.wallShelves,benchLength:n.benchLength,sideBenches:!!n.sideBenches})}catch(U){console.error("Virtual Lab: failed to create a WebGL context",U),a.value=!0;return}c=Fe.renderer,o=Fe.scene,l=Fe.camera,h=Fe.controls,n.sceneObjects.forEach(U=>{if(U.in_tray){X.value.push(U);return}Q(U)}),(n.connections||[]).forEach(U=>{const k=f.get(U.from),B=f.get(U.to);k&&B&&o.add(Yh(k.position,B.position))}),Ut(),Rt(),xi(),n.fixedView?xc():yc(),c.domElement.addEventListener("pointerdown",ee),c.domElement.addEventListener("pointermove",Ne),c.domElement.addEventListener("pointermove",Mc),c.domElement.addEventListener("pointerup",Ge);let I=0;Fe.onFrame(U=>{I+=U,I>.15&&(I=0,ni.forEach((k,B)=>{k&&ji(B)})),f.forEach((k,B)=>{const te=B===_.value||B===qt.value;k.children.forEach(Te=>{Te.userData.role==="label"&&(Te.visible=te)})}),Lt.forEach((k,B)=>{k.children.forEach(te=>{te.userData.role==="label"&&(te.visible=B===pn)})}),An.forEach((k,B)=>{k.children.forEach(te=>{te.userData.role==="label"&&(te.visible=B===Zt)})})})}Mr(()=>n.sceneObjects.map(C=>`${C.key}@${C.position.x},${C.position.z}`).join("|"),()=>{if(!Fe)return;const C=new Map(n.sceneObjects.filter(U=>!U.in_tray).map(U=>[U.key,U]));let I=!1;f.forEach((U,k)=>{C.has(k)||(o.remove(U),U.traverse(B=>{var te;(B instanceof pe||B instanceof Dn)&&((te=B.geometry)==null||te.dispose(),(Array.isArray(B.material)?B.material:[B.material]).forEach(be=>{var ze;(ze=be.map)==null||ze.dispose(),be.dispose()}))}),f.delete(k),_.value===k&&Qi())}),C.forEach((U,k)=>{const B=f.get(k);B?B.position.set(U.position.x,U.position.y,U.position.z):(Q(U),I=!0)}),I&&!n.fixedView&&yc(),mn()});const Lt=new Map,rn=[];function We(C,I){const U=document.createElement("canvas");U.width=512,U.height=144;const k=U.getContext("2d");k.fillStyle="#fffdf4",k.fillRect(0,0,512,144),k.fillStyle="#1e3a8a",k.fillRect(0,0,512,10),k.fillStyle="#111827",k.textAlign="center",k.textBaseline="middle";let B=46;for(k.font=`bold ${B}px sans-serif`;k.measureText(C).width>490&&B>26;)B-=2,k.font=`bold ${B}px sans-serif`;if(k.measureText(C).width>490){const Te=C.split(" "),be=Math.ceil(Te.length/2);k.fillText(Te.slice(0,be).join(" "),256,I?42:52),k.fillText(Te.slice(be).join(" "),256,I?80:96)}else k.fillText(C,256,I?54:76);I&&(k.font="bold 38px serif",k.fillStyle="#1e3a8a",k.fillText(I,256,118));const te=new Ir(U);return te.colorSpace=un,te.anisotropy=8,te}let pn=null;function Rt(){const C=Fe==null?void 0:Fe.cupboard;C&&(qu.forEach((I,U)=>{const k=C.bays[U<2?0:1],B=k.levels[U%2],te=(k.maxX-k.minX)/I.length;I.forEach((Te,be)=>{const ze=qo(Gv(Te),`cupboard:${Te.id}`,Te.name,Hv(Te));ze.position.set(k.minX+te*(be+.5),B,k.frontZ-.6),ze.userData.chemicalId=Te.id,ze.traverse(it=>{it instanceof pe&&(it.castShadow=!1,it.receiveShadow=!1)}),o.add(ze),Lt.set(Te.id,ze);const lt=new pe(new Qt(te*.92,.26),new ds({map:We(Te.name,Te.formula),toneMapped:!1}));lt.position.set(ze.position.x,B+.14,k.frontZ-.08),lt.rotation.x=-.35,lt.userData.chemicalId=Te.id,o.add(lt),rn.push(lt)})}),mn())}function mn(){const C=new Set(n.sceneObjects.map(U=>{var k;return(k=U.props)==null?void 0:k.chemical_id}).filter(Boolean));Lt.forEach((U,k)=>{U.visible=!C.has(k)});const I=new Set(n.sceneObjects.filter(U=>{var k;return!((k=U.props)!=null&&k.chemical_id)}).map(U=>U.object_type));An.forEach((U,k)=>{U.visible=!I.has(k)})}function Tn(){var lt;const C=Fe==null?void 0:Fe.cupboard,I=Fe==null?void 0:Fe.wallCabinets,U=Fe==null?void 0:Fe.furniture,k=Fe==null?void 0:Fe.taps;if(!C&&!I&&!(U!=null&&U.doors.length)&&!k)return null;u.setFromCamera(d,l);const B=[];C&&B.push(...C.doors,...C.blockers),I&&B.push(...I.doors,...I.blockers),U&&B.push(...U.doors,...U.blockers),k&&B.push(...k.taps),f.forEach(it=>B.push(it)),Lt.forEach(it=>{it.visible&&B.push(it)}),rn.forEach(it=>B.push(it)),An.forEach(it=>{it.visible&&B.push(it)});const te=u.intersectObjects(B,!0)[0];if(!te)return null;const Te=(lt=Fe.taps)==null?void 0:lt.tapOf(te.object);if(Te)return{kind:"tap",tap:Te};const be=Fe.doorOf(te.object);if(be)return{kind:"door",door:be};let ze=te.object;for(;ze&&!ze.userData.chemicalId&&!ze.userData.shelfType;)ze=ze.parent;return ze?ze.userData.shelfType?{kind:"apparatus",type:ze.userData.shelfType}:{kind:"chemical",id:ze.userData.chemicalId}:null}function ii(){const C=Tn();if(!C)return!1;if(C.kind==="apparatus")return s("pickApparatus",C.type),!0;if(C.kind==="tap")return Fe.taps.toggle(C.tap),Yu(Fe.taps.anyOn()),!0;if(C.kind==="chemical"){const I=n.sceneObjects.find(U=>{var k;return((k=U.props)==null?void 0:k.chemical_id)===C.id});return I?s("putBack",I.key):s("takeChemical",C.id),!0}return Fe.toggleDoor(C.door),!0}const An=new Map,Ft=[];let Zt=null;const si=[{key:"physics",label:"Physics"},{key:"chemistry",label:"Chemistry"},{key:"biology",label:"Biology"},{key:"agriculture",label:"Agriculture"},{key:"general",label:"General"}],Ht=["physics","chemistry","biology","agriculture"];function Xn(C){o.remove(C),C.traverse(I=>{var U;(I instanceof pe||I instanceof Dn)&&((U=I.geometry)==null||U.dispose(),(Array.isArray(I.material)?I.material:[I.material]).forEach(B=>{var te;(te=B.map)==null||te.dispose(),B.dispose()}))})}function xi(){const C=Fe==null?void 0:Fe.wallCabinets;if(!C)return;An.forEach(Xn),An.clear(),Ft.splice(0).forEach(Xn);const I=n.objectCatalog.filter(te=>te.id>0&&te.is_active!==!1),U=te=>Ht.includes(te.category)?te.category:"general",k=new L(0,1,0),B=(te,Te,be,ze)=>new L(Te,be,ze).applyAxisAngle(k,te.rotY).add(te.offset);C.cabinets.forEach((te,Te)=>{const be=si[Te];if(!be)return;const ze=Gr(be.label,Math.min(.75*yr,(te.maxX-te.minX)*.7));ze.position.copy(B(te,te.cx,te.topY,te.corniceFrontZ)),ze.rotation.y=te.rotY,o.add(ze),Ft.push(ze);const lt=I.filter(ri=>U(ri)===be.key).sort((ri,Wr)=>ri.display_name.localeCompare(Wr.display_name));if(lt.length===0)return;const it=Math.max(1,te.bays);let st=Math.max(1,Math.ceil(4/it));for(;Math.ceil(lt.length/(st*it))>te.rows.length;)st++;const _t=st*it,Ct=(te.maxX-te.minX)/it,qn=it>1?.03*yr:0,bc=(Ct-qn*2)/st;lt.forEach((ri,Wr)=>{const Qu=Math.floor(Wr/_t),Sc=Wr%_t,ef=Math.floor(Sc/st),tf=te.rows[Qu],yi=qo(ri.object_type,`shelf:${ri.object_type}`,ri.display_name,ri.default_props||{}),rr=new Vn;yi.children.forEach(ai=>{ai instanceof Dn||rr.expandByObject(ai)});const ja=rr.getSize(new L),wc=rr.getCenter(new L),ts=Math.min(1,bc*.84/Math.max(ja.x,.01),te.rowHeight*.8/Math.max(ja.y,.01),te.depth*.9/Math.max(ja.z,.01));yi.scale.setScalar(ts);const nf=te.minX+ef*Ct+qn+bc*(Sc%st+.5),Qa=new L(nf,tf-rr.min.y*ts,te.z).sub(new L(wc.x*ts,0,wc.z*ts));yi.position.copy(B(te,Qa.x,Qa.y,Qa.z)),yi.rotation.y=te.rotY,yi.children.forEach(ai=>{ai.userData.role==="label"&&(ai.scale.set(.72/ts,.158/ts,1),ai.position.y=rr.max.y+.2/ts,ai.visible=!1)}),yi.traverse(ai=>{ai instanceof pe&&(ai.castShadow=!1)}),yi.userData.shelfType=ri.object_type,o.add(yi),An.set(ri.object_type,yi)})}),mn()}function Gr(C,I){const U=yr,k=.13*U,B=new wt,te=new pe(new Ie(I,k,.02*U),new $({color:5977112,roughness:.55}));te.position.set(0,k/2,-.008*U),B.add(te);const Te=document.createElement("canvas");Te.width=1024,Te.height=200;const be=Te.getContext("2d"),ze=be.createLinearGradient(0,0,0,200);ze.addColorStop(0,"#f8e3a1"),ze.addColorStop(.45,"#d9a842"),ze.addColorStop(1,"#a8781f"),be.fillStyle=ze,be.beginPath(),be.roundRect(4,4,1016,192,22),be.fill(),be.strokeStyle="rgba(70,45,5,0.85)",be.lineWidth=6,be.beginPath(),be.roundRect(18,18,988,164,14),be.stroke(),be.lineWidth=2,be.beginPath(),be.roundRect(30,30,964,140,10),be.stroke();for(const Ct of[62,962]){const qn=be.createRadialGradient(Ct-4,96,2,Ct,100,16);qn.addColorStop(0,"#fff7d6"),qn.addColorStop(1,"#7a5a17"),be.fillStyle=qn,be.beginPath(),be.arc(Ct,100,15,0,Math.PI*2),be.fill(),be.strokeStyle="#5a3f0c",be.lineWidth=3,be.beginPath(),be.moveTo(Ct-9,100),be.lineTo(Ct+9,100),be.stroke()}be.textAlign="center",be.textBaseline="middle";let lt=96;be.font=`bold ${lt}px Georgia, serif`;const it=C.toUpperCase().split("").join(" ");for(;be.measureText(it).width>820&&lt>40;)lt-=4,be.font=`bold ${lt}px Georgia, serif`;be.fillStyle="rgba(255,248,220,0.7)",be.fillText(it,512,104),be.fillStyle="#3b2606",be.fillText(it,512,101);const st=new Ir(Te);st.colorSpace=un,st.anisotropy=8;const _t=new pe(new Qt(I*.94,k*.8),new $({map:st,roughness:.3,metalness:.55,transparent:!0}));return _t.position.set(0,k/2,.0035*U),B.add(_t),B}Mr(()=>n.objectCatalog.map(C=>C.object_type).join(","),()=>{Fe&&xi()});let es=null;function Yu(C){try{if(!es){if(C===0)return;const k=window.AudioContext||window.webkitAudioContext,B=new k,te=B.createBuffer(1,B.sampleRate*2,B.sampleRate),Te=te.getChannelData(0);for(let Ct=0;Ct<Te.length;Ct++)Te[Ct]=Math.random()*2-1;const be=B.createBufferSource();be.buffer=te,be.loop=!0;const ze=B.createBiquadFilter();ze.type="bandpass",ze.frequency.value=1100,ze.Q.value=.6;const lt=B.createBiquadFilter();lt.type="lowpass",lt.frequency.value=3500;const it=B.createGain();it.gain.value=0;const st=B.createOscillator();st.frequency.value=7;const _t=B.createGain();_t.gain.value=250,st.connect(_t).connect(ze.frequency),be.connect(ze).connect(lt).connect(it).connect(B.destination),be.start(),st.start(),es={ctx:B,gain:it}}const{ctx:I,gain:U}=es;I.state==="suspended"&&I.resume(),U.gain.setTargetAtTime(C===0?0:Math.min(.5,.3+.1*C),I.currentTime,.15)}catch{}}Yo(()=>{es==null||es.ctx.close().catch(()=>{}),es=null});function Zu(C){Fe&&(C==="bench"?xc(!0):C==="entrance"?Fe.flyTo(new L(2.4,.95,2.4),new L(0,.25,7)):C==="left"?Fe.flyTo(new L(-1.2,1,1.6),new L(-7,.45,1.6)):Fe.flyTo(new L(1.2,1,1.6),new L(7,.45,1.6)))}const $u=lf(()=>{var C,I;return!!((I=(C=n.sceneObjects.find(U=>U.key===_.value))==null?void 0:C.props)!=null&&I.chemical_id)});function Ku(){const C=_.value;C&&(Qi(),s("putBack",C))}function xc(C=!1){if(!Fe)return;const I=yr,U=Fe.benchLength/2,k=Fe.wallCabinets?new Vn(new L(-(U+.25)*I,-.9*I,-.6*I),new L((U+.25)*I,1.82*I,.375*I)):new Vn(new L(-U*I,-.9*I,-.375*I),new L(U*I,.1*I,.375*I));Fe.fitBox(k,Fe.wallCabinets?.94:.72,{dir:new L(.4,Fe.wallCabinets?3.4:4.2,6.4),animate:C})}function yc(){if(!Fe||f.size===0)return;o.updateMatrixWorld(!0);const C=new Vn;f.forEach(I=>I.children.forEach(U=>{U.userData.role!=="label"&&C.expandByObject(U)})),Fe.frameBox(C)}function Mc(C){if(y)return;W(C),qt.value=ne();const I=qt.value?null:Tn();pn=(I==null?void 0:I.kind)==="chemical"?I.id:null,Zt=(I==null?void 0:I.kind)==="apparatus"?I.type:null,c.domElement.style.cursor=qt.value||I?"pointer":"grab"}function Ju(C,I){(I.state==="on"||I.state==="off")&&G.set(C,I.state);const U=f.get(C);U&&U.traverse(k=>{if(k.userData.role==="lever"&&"state"in I){const B=I.state==="on"||I.state==="closed";k.rotation.z=B?Math.PI/2-.35:Math.PI/2-.9,k.position.x=B?0:-.06}if(k.userData.role==="led"&&"state"in I&&k instanceof pe){const B=k.material;B.emissiveIntensity=I.state==="on"?1.2:0}if(k.userData.role==="flame"&&"flame"in I&&k instanceof pe){const B=k.material;B.emissiveIntensity=I.flame==="on"?1:0,B.opacity=I.flame==="on"?.9:0}})}e({setObjectState:Ju,goToView:Zu});function ju(){a.value=!1,cf(Yt)}return Zh(Yt),Yo(()=>{c==null||c.domElement.removeEventListener("pointerdown",ee),c==null||c.domElement.removeEventListener("pointermove",Ne),c==null||c.domElement.removeEventListener("pointermove",Mc),c==null||c.domElement.removeEventListener("pointerup",Ge),Fe==null||Fe.dispose(),Fe=null}),(C,I)=>(kt(),Bt("div",Wv,[a.value?(kt(),Bt("div",Xv,[Ec(hf,{name:"beaker",class:"w-8 h-8"}),I[9]||(I[9]=tt("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),tt("button",{onClick:ju,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(kt(),Bt("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),X.value.length>0?(kt(),Bt("div",{key:2,class:ar(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||b.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[I[10]||(I[10]=tt("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),tt("div",qv,[(kt(!0),Bt(xs,null,Xr(X.value,U=>{var k,B;return kt(),Bt("button",{key:U.key,onClick:te=>ae(U.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[tt("span",null,$t(((k=R().get(U.object_type))==null?void 0:k.icon)||"🔬"),1),tt("span",Zv,$t(((B=R().get(U.object_type))==null?void 0:B.display_name)||U.object_type),1)],8,Yv)}),128))])],2)):cn("",!0),_.value&&!m.value?(kt(),Bt("div",$v,[tt("div",Kv,[tt("p",Jv,$t(T.value),1),tt("button",{onClick:Qi,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),tt("div",jv,[(kt(!0),Bt(xs,null,Xr(v.value,U=>(kt(),Bt("button",{key:U,onClick:k=>Vr(U),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},$t(S(U)),9,Qv))),128)),i.cupboard?(kt(),Bt("button",{key:0,onClick:Ku,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},$t($u.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):cn("",!0)]),M.value&&re.value==="readonly"?(kt(),Bt("div",ex,[I[11]||(I[11]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),tt("div",tx,[tt("span",nx,[qr($t(fe.value),1),tt("span",ix,$t(ye.value),1)]),tt("button",{onClick:Hr,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):cn("",!0),M.value&&re.value==="slider"?(kt(),Bt("div",sx,[tt("p",rx,"Reading: "+$t(Math.round(Xe.value))+$t(ye.value),1),Tc(tt("input",{"onUpdate:modelValue":I[0]||(I[0]=U=>Xe.value=U),type:"range",min:"0",max:me.value,step:"1",class:"w-full accent-emerald-600"},null,8,ax),[[Ac,Xe.value,void 0,{number:!0}]]),tt("button",{onClick:Hr,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):cn("",!0),P.value==="battery"?(kt(),Bt("div",ox,[I[12]||(I[12]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),tt("div",lx,[(kt(),Bt(xs,null,Xr([1.5,3,6,9,12],U=>tt("button",{key:U,onClick:k=>vs(U),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",N.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},$t(U)+"V",11,cx)),64))])])):cn("",!0),P.value==="stopwatch"?(kt(),Bt("div",hx,[tt("p",ux,"Elapsed: "+$t(nr.value),1),tt("button",{onClick:I[1]||(I[1]=U=>kr(_.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):cn("",!0),P.value==="microscope"?(kt(),Bt("div",fx,[we.value?(kt(),Bt(xs,{key:1},[tt("div",null,[I[13]||(I[13]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),tt("div",px,[(kt(),Bt(xs,null,Xr([40,100,400],U=>tt("button",{key:U,onClick:k=>rt(U),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",oe.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+$t(U),11,mx)),64))])]),tt("div",null,[tt("p",gx,"Coarse Focus: "+$t(Math.round(Je.value)),1),tt("input",{value:Je.value,onChange:I[2]||(I[2]=U=>ft(Number(U.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,_x)]),tt("div",vx,[I[14]||(I[14]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),tt("div",xx,[tt("button",{onClick:I[3]||(I[3]=U=>H(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),tt("button",{onClick:I[4]||(I[4]=U=>H(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),xe.value?(kt(),Bt("div",yx,[I[16]||(I[16]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),tt("div",Mx,[tt("div",{class:"absolute inset-0 flex items-center justify-center",style:rf({filter:`blur(${St[de.value]}px)`})},[...I[15]||(I[15]=[tt("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),tt("p",bx,$t(de.value.replace("_"," "))+" · ×"+$t(oe.value),1)])):cn("",!0)],64)):(kt(),Bt("div",dx,"Place a specimen slide on the stage first."))])):cn("",!0),P.value==="spring"?(kt(),Bt("div",Sx,[tt("p",wx,"Attached Load: "+$t(ht.value)+" g · Extension: "+$t(ot.value)+" cm",1),V.value?(kt(),Bt("p",Ex,"Beyond the spring's safe extension limit.")):cn("",!0)])):cn("",!0),P.value==="protractor"?(kt(),Bt("div",Tx,[I[17]||(I[17]=tt("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),tt("div",Ax,[tt("button",{onClick:I[5]||(I[5]=U=>D("incidence")),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ce.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),tt("button",{onClick:I[6]||(I[6]=U=>D("outgoing")),class:ar(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",ce.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):cn("",!0)])):cn("",!0),m.value&&!b.value?(kt(),Bt("div",Rx,[tt("span",Cx,$t(Wn.value),1),tt("span",Px,[m.value==="move"||m.value==="rotate"?(kt(),Bt("button",{key:0,onClick:Ja,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):cn("",!0),tt("button",{onClick:Ka,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):cn("",!0),b.value?(kt(),Bt("div",Dx,[tt("p",Ix,"Pouring "+$t(b.value.fromLabel)+" → "+$t(b.value.toLabel),1),tt("p",Lx,[qr($t(Math.round(b.value.amount))+" ",1),I[18]||(I[18]=tt("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),Tc(tt("input",{"onUpdate:modelValue":I[7]||(I[7]=U=>b.value.amount=U),type:"range",min:"0",max:b.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,Nx),[[Ac,b.value.amount,void 0,{number:!0}]]),tt("div",{class:"flex items-center gap-2 mt-2"},[tt("button",{onClick:et,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),tt("button",{onClick:Qe,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):cn("",!0),Ec(af,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:of(()=>[Se.value?(kt(),Bt("div",Ux,$t(Se.value),1)):cn("",!0)]),_:1}),p.value?(kt(),Bt("div",Fx,[tt("div",Ox,[tt("p",Bx,$t(p.value),1),tt("button",{onClick:I[8]||(I[8]=U=>p.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):cn("",!0),tt("p",kx,[I[19]||(I[19]=qr(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard||i.wallShelves?(kt(),Bt(xs,{key:0},[qr(" · Click a door to open it, a sink tap to run water")],64)):cn("",!0)])]))}});export{un as A,Ie as B,z as C,Kt as D,Yl as E,Ga as F,wt as G,Pu as H,qo as I,vd as L,pe as M,hv as O,Ai as P,hc as Q,u0 as R,Gt as S,Nt as T,L as V,lv as W,Xx as _,Hv as a,Gv as b,Vv as c,Ev as d,Fr as e,$ as f,Zi as g,jn as h,ds as i,sn as j,Wx as k,Or as l,_u as m,Ri as n,ti as o,Lu as p,Qt as q,mt as r,Uv as s,Kn as t,Gx as u,J as v,Fl as w,Ru as x,uu as y,In as z};
