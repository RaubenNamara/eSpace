import{Q as aa,o as yu,m as Su,r as yt,d as xh,c as Lt,A as Jl,a as Xe,f as qs,F as ss,k as wr,e as ln,t as qt,C as Tr,g as jl,p as Ql,x as Mh,T as yh,z as Sh,h as bh,n as Eh,j as It}from"./index-Np8SewUP.js";import{_ as wh}from"./AppIcon.vue_vue_type_script_setup_true_lang-Ba7g6Hbr.js";function ix(){const i=yt(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return aa(i,r=>{document.body.style.overflow=r?"hidden":""}),yu(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),Su(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bl="185",Cs={ROTATE:0,DOLLY:1,PAN:2},Ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Th=0,ec=1,Ah=2,ur=1,Rh=2,ar=3,Ui=0,yn=1,$t=2,gi=0,Ps=1,tc=2,nc=3,ic=4,Ch=5,qi=100,Ph=101,Dh=102,Lh=103,Ih=104,Nh=200,Uh=201,Fh=202,Oh=203,Ro=204,Co=205,Bh=206,zh=207,kh=208,Vh=209,Hh=210,Gh=211,Wh=212,Xh=213,qh=214,Po=0,Do=1,Lo=2,Ns=3,Io=4,No=5,Uo=6,Fo=7,El=0,Yh=1,Zh=2,ni=0,bu=1,Eu=2,wu=3,wl=4,Tu=5,Au=6,Ru=7,Cu=300,ji=301,Us=302,Ba=303,za=304,Pa=306,_i=1e3,mi=1001,Oo=1002,hn=1003,Kh=1004,Ar=1005,gn=1006,ka=1007,Ki=1008,Rn=1009,Pu=1010,Du=1011,dr=1012,Tl=1013,ri=1014,Hn=1015,Mi=1016,Al=1017,Rl=1018,pr=1020,Lu=35902,Iu=35899,Nu=1021,Uu=1022,Gn=1023,yi=1026,$i=1027,Cl=1028,Pl=1029,Qi=1030,Dl=1031,Ll=1033,oa=33776,la=33777,ca=33778,ua=33779,Bo=35840,zo=35841,ko=35842,Vo=35843,Ho=36196,Go=37492,Wo=37496,Xo=37488,qo=37489,da=37490,Yo=37491,Zo=37808,Ko=37809,$o=37810,Jo=37811,jo=37812,Qo=37813,el=37814,tl=37815,nl=37816,il=37817,sl=37818,rl=37819,al=37820,ol=37821,ll=36492,cl=36494,ul=36495,hl=36283,fl=36284,pa=36285,dl=36286,$h=3200,ma=0,Jh=1,Ii="",un="srgb",ga="srgb-linear",_a="linear",Nt="srgb",rs=7680,sc=519,jh=512,Qh=513,ef=514,Il=515,tf=516,nf=517,Nl=518,sf=519,pl=35044,rc="300 es",ti=2e3,mr=2001;function rf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function va(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function af(){const i=va("canvas");return i.style.display="block",i}const ac={};function xa(...i){const e="THREE."+i.shift();console.log(e,...i)}function Fu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function tt(...i){i=Fu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function vt(...i){i=Fu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ds(...i){const e=i.join(" ");e in ac||(ac[e]=!0,tt(...i))}function of(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const lf={[Po]:Do,[Lo]:Uo,[Io]:Fo,[Ns]:No,[Do]:Po,[Uo]:Lo,[Fo]:Io,[No]:Ns};class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ha=Math.PI/180,ml=180/Math.PI;function vi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pn[i&255]+pn[i>>8&255]+pn[i>>16&255]+pn[i>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[t&63|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function cf(i,e){return(i%e+e)%e}function Va(i,e,t){return(1-t)*i+t*e}function ei(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const uf={DEG2RAD:ha},ql=class ql{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ql.prototype.isVector2=!0;let j=ql;class Si{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(f!==_||o!==h||l!==d||u!==g){let m=o*h+l*d+u*g+f*_;m<0&&(h=-h,d=-d,g=-g,_=-_,m=-m);let p=1-c;if(m<.9995){const y=Math.acos(m),S=Math.sin(y);p=Math.sin(p*y)/S,c=Math.sin(c*y)/S,o=o*p+h*c,l=l*p+d*c,u=u*p+g*c,f=f*p+_*c}else{o=o*p+h*c,l=l*p+d*c,u=u*p+g*c,f=f*p+_*c;const y=1/Math.sqrt(o*o+l*l+u*u+f*f);o*=y,l*=y,u*=y,f*=y}}e[t]=o,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],u=n[s+3],f=r[a],h=r[a+1],d=r[a+2],g=r[a+3];return e[t]=c*g+u*f+o*d-l*h,e[t+1]=o*g+u*h+l*f-c*d,e[t+2]=l*g+u*d+c*h-o*f,e[t+3]=u*g-c*f-o*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),u=c(s/2),f=c(r/2),h=o(n/2),d=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:tt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],u=t[6],f=t[10],h=n+c+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-o)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>c&&n>f){const d=2*Math.sqrt(1+n-c-f);this._w=(u-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(c>f){const d=2*Math.sqrt(1+c-n-f);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+u)/d}else{const d=2*Math.sqrt(1+f-n-c);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(o+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,u=t._w;return this._x=n*u+a*c+s*l-r*o,this._y=s*u+a*o+r*c-n*l,this._z=r*u+a*l+n*o-s*c,this._w=a*u-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),u=Math.sin(l);o=Math.sin(o*l)/u,t=Math.sin(t*l)/u,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Yl=class Yl{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(oc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(oc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),u=2*(c*t-r*s),f=2*(r*n-a*t);return this.x=t+o*l+a*f-c*u,this.y=n+o*u+c*l-r*f,this.z=s+o*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ha.copy(this).projectOnVector(e),this.sub(Ha)}reflect(e){return this.sub(Ha.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yl.prototype.isVector3=!0;let L=Yl;const Ha=new L,oc=new Si,Zl=class Zl{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=c,u[3]=t,u[4]=r,u[5]=o,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],y=s[1],S=s[4],M=s[7],T=s[2],b=s[5],C=s[8];return r[0]=a*_+c*y+o*T,r[3]=a*m+c*S+o*b,r[6]=a*p+c*M+o*C,r[1]=l*_+u*y+f*T,r[4]=l*m+u*S+f*b,r[7]=l*p+u*M+f*C,r[2]=h*_+d*y+g*T,r[5]=h*m+d*S+g*b,r[8]=h*p+d*M+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],u=e[8];return t*a*u-t*c*l-n*r*u+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],u=e[8],f=u*a-c*l,h=c*o-u*r,d=l*r-a*o,g=t*f+n*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*l-u*n)*_,e[2]=(c*n-s*a)*_,e[3]=h*_,e[4]=(u*t-s*o)*_,e[5]=(s*r-c*t)*_,e[6]=d*_,e[7]=(n*o-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return Ds("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ga.makeScale(e,t)),this}rotate(e){return Ds("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ga.makeRotation(-e)),this}translate(e,t){return Ds("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ga.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Zl.prototype.isMatrix3=!0;let ot=Zl;const Ga=new ot,lc=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cc=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hf(){const i={enabled:!0,workingColorSpace:ga,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Nt&&(s.r=xi(s.r),s.g=xi(s.g),s.b=xi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Nt&&(s.r=Ls(s.r),s.g=Ls(s.g),s.b=Ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ii?_a:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ds("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ds("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ga]:{primaries:e,whitePoint:n,transfer:_a,toXYZ:lc,fromXYZ:cc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:e,whitePoint:n,transfer:Nt,toXYZ:lc,fromXYZ:cc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),i}const St=hf();function xi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let as;class ff{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{as===void 0&&(as=va("canvas")),as.width=e.width,as.height=e.height;const s=as.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=as}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=va("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=xi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(xi(t[n]/255)*255):t[n]=xi(t[n]);return{data:t,width:e.width,height:e.height}}else return tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let df=0;class Ul{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(Wa(s[a].image)):r.push(Wa(s[a]))}else r=Wa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Wa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ff.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(tt("Texture: Unable to serialize Texture."),{})}let pf=0;const Xa=new L;class _n extends Fi{constructor(e=_n.DEFAULT_IMAGE,t=_n.DEFAULT_MAPPING,n=mi,s=mi,r=gn,a=Ki,c=Gn,o=Rn,l=_n.DEFAULT_ANISOTROPY,u=Ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=vi(),this.name="",this.source=new Ul(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new j(0,0),this.repeat=new j(1,1),this.center=new j(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Xa).x}get height(){return this.source.getSize(Xa).y}get depth(){return this.source.getSize(Xa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){tt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){tt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _i:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case Oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _i:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case Oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_n.DEFAULT_IMAGE=null;_n.DEFAULT_MAPPING=Cu;_n.DEFAULT_ANISOTROPY=1;const Kl=class Kl{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],u=o[4],f=o[8],h=o[1],d=o[5],g=o[9],_=o[2],m=o[6],p=o[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,M=(d+1)/2,T=(p+1)/2,b=(u+h)/4,C=(f+_)/4,x=(g+m)/4;return S>M&&S>T?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=b/n,r=C/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=b/s,r=x/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=x/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(f-_)/y,this.z=(h-u)/y,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Kl.prototype.isVector4=!0;let Yt=Kl;class mf extends Fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Yt(0,0,e,t),this.scissorTest=!1,this.viewport=new Yt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new _n(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ul(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends mf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ou extends _n{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gf extends _n{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ca=class Ca{constructor(e,t,n,s,r,a,c,o,l,u,f,h,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,u,f,h,d,g,_,m)}set(e,t,n,s,r,a,c,o,l,u,f,h,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=o,p[2]=l,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ca().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,d=a*f,g=c*u,_=c*f;t[0]=o*u,t[4]=-o*f,t[8]=l,t[1]=d+g*l,t[5]=h-_*l,t[9]=-c*o,t[2]=_-h*l,t[6]=g+d*l,t[10]=a*o}else if(e.order==="YXZ"){const h=o*u,d=o*f,g=l*u,_=l*f;t[0]=h+_*c,t[4]=g*c-d,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-c,t[2]=d*c-g,t[6]=_+h*c,t[10]=a*o}else if(e.order==="ZXY"){const h=o*u,d=o*f,g=l*u,_=l*f;t[0]=h-_*c,t[4]=-a*f,t[8]=g+d*c,t[1]=d+g*c,t[5]=a*u,t[9]=_-h*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const h=a*u,d=a*f,g=c*u,_=c*f;t[0]=o*u,t[4]=g*l-d,t[8]=h*l+_,t[1]=o*f,t[5]=_*l+h,t[9]=d*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const h=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=a*u,t[9]=-c*u,t[2]=-l*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=a*o,d=a*l,g=c*o,_=c*l;t[0]=o*u,t[4]=-f,t[8]=l*u,t[1]=h*f+_,t[5]=a*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=c*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_f,e,vf)}lookAt(e,t,n){const s=this.elements;return En.subVectors(e,t),En.lengthSq()===0&&(En.z=1),En.normalize(),Ti.crossVectors(n,En),Ti.lengthSq()===0&&(Math.abs(n.z)===1?En.x+=1e-4:En.z+=1e-4,En.normalize(),Ti.crossVectors(n,En)),Ti.normalize(),Rr.crossVectors(En,Ti),s[0]=Ti.x,s[4]=Rr.x,s[8]=En.x,s[1]=Ti.y,s[5]=Rr.y,s[9]=En.y,s[2]=Ti.z,s[6]=Rr.z,s[10]=En.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],S=n[7],M=n[11],T=n[15],b=s[0],C=s[4],x=s[8],w=s[12],D=s[1],U=s[5],F=s[9],k=s[13],X=s[2],B=s[6],$=s[10],q=s[14],se=s[3],ue=s[7],ge=s[11],me=s[15];return r[0]=a*b+c*D+o*X+l*se,r[4]=a*C+c*U+o*B+l*ue,r[8]=a*x+c*F+o*$+l*ge,r[12]=a*w+c*k+o*q+l*me,r[1]=u*b+f*D+h*X+d*se,r[5]=u*C+f*U+h*B+d*ue,r[9]=u*x+f*F+h*$+d*ge,r[13]=u*w+f*k+h*q+d*me,r[2]=g*b+_*D+m*X+p*se,r[6]=g*C+_*U+m*B+p*ue,r[10]=g*x+_*F+m*$+p*ge,r[14]=g*w+_*k+m*q+p*me,r[3]=y*b+S*D+M*X+T*se,r[7]=y*C+S*U+M*B+T*ue,r[11]=y*x+S*F+M*$+T*ge,r[15]=y*w+S*k+M*q+T*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],y=o*d-l*h,S=c*d-l*f,M=c*h-o*f,T=a*d-l*u,b=a*h-o*u,C=a*f-c*u;return t*(_*y-m*S+p*M)-n*(g*y-m*T+p*b)+s*(g*S-_*T+p*C)-r*(g*M-_*b+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],u=e[10];return t*(a*u-c*l)-n*(r*u-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],y=t*c-n*a,S=t*o-s*a,M=t*l-r*a,T=n*o-s*c,b=n*l-r*c,C=s*l-r*o,x=u*_-f*g,w=u*m-h*g,D=u*p-d*g,U=f*m-h*_,F=f*p-d*_,k=h*p-d*m,X=y*k-S*F+M*U+T*D-b*w+C*x;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/X;return e[0]=(c*k-o*F+l*U)*B,e[1]=(s*F-n*k-r*U)*B,e[2]=(_*C-m*b+p*T)*B,e[3]=(h*b-f*C-d*T)*B,e[4]=(o*D-a*k-l*w)*B,e[5]=(t*k-s*D+r*w)*B,e[6]=(m*M-g*C-p*S)*B,e[7]=(u*C-h*M+d*S)*B,e[8]=(a*F-c*D+l*x)*B,e[9]=(n*D-t*F-r*x)*B,e[10]=(g*b-_*M+p*y)*B,e[11]=(f*M-u*b-d*y)*B,e[12]=(c*w-a*U-o*x)*B,e[13]=(t*U-n*w+s*x)*B,e[14]=(_*S-g*T-m*y)*B,e[15]=(u*T-f*S+h*y)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,u=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,u*c+n,u*o-s*a,0,l*o-s*c,u*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,u=a+a,f=c+c,h=r*l,d=r*u,g=r*f,_=a*u,m=a*f,p=c*f,y=o*l,S=o*u,M=o*f,T=n.x,b=n.y,C=n.z;return s[0]=(1-(_+p))*T,s[1]=(d+M)*T,s[2]=(g-S)*T,s[3]=0,s[4]=(d-M)*b,s[5]=(1-(h+p))*b,s[6]=(m+y)*b,s[7]=0,s[8]=(g+S)*C,s[9]=(m-y)*C,s[10]=(1-(h+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=os.set(s[0],s[1],s[2]).length();const c=os.set(s[4],s[5],s[6]).length(),o=os.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Bn.copy(this);const l=1/a,u=1/c,f=1/o;return Bn.elements[0]*=l,Bn.elements[1]*=l,Bn.elements[2]*=l,Bn.elements[4]*=u,Bn.elements[5]*=u,Bn.elements[6]*=u,Bn.elements[8]*=f,Bn.elements[9]*=f,Bn.elements[10]*=f,t.setFromRotationMatrix(Bn),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=ti,o=!1){const l=this.elements,u=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let g,_;if(o)g=r/(a-r),_=a*r/(a-r);else if(c===ti)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(c===mr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=ti,o=!1){const l=this.elements,u=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,_;if(o)g=1/(a-r),_=a/(a-r);else if(c===ti)g=-2/(a-r),_=-(a+r)/(a-r);else if(c===mr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ca.prototype.isMatrix4=!0;let Ut=Ca;const os=new L,Bn=new Ut,_f=new L(0,0,0),vf=new L(1,1,1),Ti=new L,Rr=new L,En=new L,uc=new Ut,hc=new Si;class bi{constructor(e=0,t=0,n=0,s=bi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return uc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hc.setFromEuler(this),this.setFromQuaternion(hc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bi.DEFAULT_ORDER="XYZ";class Fl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let xf=0;const fc=new L,ls=new Si,li=new Ut,Cr=new L,Ys=new L,Mf=new L,yf=new Si,dc=new L(1,0,0),pc=new L(0,1,0),mc=new L(0,0,1),gc={type:"added"},Sf={type:"removed"},cs={type:"childadded",child:null},qa={type:"childremoved",child:null};class tn extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new L,t=new bi,n=new Si,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ut},normalMatrix:{value:new ot}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(dc,e)}rotateY(e){return this.rotateOnAxis(pc,e)}rotateZ(e){return this.rotateOnAxis(mc,e)}translateOnAxis(e,t){return fc.copy(e).applyQuaternion(this.quaternion),this.position.add(fc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(dc,e)}translateY(e){return this.translateOnAxis(pc,e)}translateZ(e){return this.translateOnAxis(mc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cr.copy(e):Cr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(Ys,Cr,this.up):li.lookAt(Cr,Ys,this.up),this.quaternion.setFromRotationMatrix(li),s&&(li.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(li),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gc),cs.child=e,this.dispatchEvent(cs),cs.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sf),qa.child=e,this.dispatchEvent(qa),qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gc),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,e,Mf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,yf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,u=o.length;l<u;l++){const f=o[l];r(e.shapes,f)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(c){const o=[];for(const l in c){const u=c[l];delete u.metadata,o.push(u)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new L(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qt extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bf={type:"move"};class Ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(bf)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function Za(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class lt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=St.workingColorSpace){return this.r=e,this.g=t,this.b=n,St.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=St.workingColorSpace){if(e=cf(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Za(a,r,e+1/3),this.g=Za(a,r,e),this.b=Za(a,r,e-1/3)}return St.colorSpaceToWorking(this,s),this}setStyle(e,t=un){function n(r){r!==void 0&&parseFloat(r)<1&&tt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:tt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=un){const n=Bu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xi(e.r),this.g=xi(e.g),this.b=xi(e.b),this}copyLinearToSRGB(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=un){return St.workingToColorSpace(mn.copy(this),e),Math.round(ht(mn.r*255,0,255))*65536+Math.round(ht(mn.g*255,0,255))*256+Math.round(ht(mn.b*255,0,255))}getHexString(e=un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.workingToColorSpace(mn.copy(this),t);const n=mn.r,s=mn.g,r=mn.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const u=(c+a)/2;if(c===a)o=0,l=0;else{const f=a-c;switch(l=u<=.5?f/(a+c):f/(2-a-c),a){case n:o=(s-r)/f+(s<r?6:0);break;case s:o=(r-n)/f+2;break;case r:o=(n-s)/f+4;break}o/=6}return e.h=o,e.s=l,e.l=u,e}getRGB(e,t=St.workingColorSpace){return St.workingToColorSpace(mn.copy(this),t),e.r=mn.r,e.g=mn.g,e.b=mn.b,e}getStyle(e=un){St.workingToColorSpace(mn.copy(this),e);const t=mn.r,n=mn.g,s=mn.b;return e!==un?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ai),this.setHSL(Ai.h+e,Ai.s+t,Ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ai),e.getHSL(Pr);const n=Va(Ai.h,Pr.h,t),s=Va(Ai.s,Pr.s,t),r=Va(Ai.l,Pr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new lt;lt.NAMES=Bu;class Ma{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new lt(e),this.near=t,this.far=n}clone(){return new Ma(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class zu extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bi,this.environmentIntensity=1,this.environmentRotation=new bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const zn=new L,ci=new L,Ka=new L,ui=new L,us=new L,hs=new L,_c=new L,$a=new L,Ja=new L,ja=new L,Qa=new Yt,eo=new Yt,to=new Yt;class In{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),zn.subVectors(e,t),s.cross(zn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){zn.subVectors(s,t),ci.subVectors(n,t),Ka.subVectors(e,t);const a=zn.dot(zn),c=zn.dot(ci),o=zn.dot(Ka),l=ci.dot(ci),u=ci.dot(Ka),f=a*l-c*c;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(l*o-c*u)*h,g=(a*u-c*o)*h;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,ui)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,ui.x),o.addScaledVector(a,ui.y),o.addScaledVector(c,ui.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return Qa.setScalar(0),eo.setScalar(0),to.setScalar(0),Qa.fromBufferAttribute(e,t),eo.fromBufferAttribute(e,n),to.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Qa,r.x),a.addScaledVector(eo,r.y),a.addScaledVector(to,r.z),a}static isFrontFacing(e,t,n,s){return zn.subVectors(n,t),ci.subVectors(e,t),zn.cross(ci).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),zn.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return In.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return In.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;us.subVectors(s,n),hs.subVectors(r,n),$a.subVectors(e,n);const o=us.dot($a),l=hs.dot($a);if(o<=0&&l<=0)return t.copy(n);Ja.subVectors(e,s);const u=us.dot(Ja),f=hs.dot(Ja);if(u>=0&&f<=u)return t.copy(s);const h=o*f-u*l;if(h<=0&&o>=0&&u<=0)return a=o/(o-u),t.copy(n).addScaledVector(us,a);ja.subVectors(e,r);const d=us.dot(ja),g=hs.dot(ja);if(g>=0&&d<=g)return t.copy(r);const _=d*l-o*g;if(_<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector(hs,c);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return _c.subVectors(r,s),c=(f-u)/(f-u+(d-g)),t.copy(s).addScaledVector(_c,c);const p=1/(m+_+h);return a=_*p,c=h*p,t.copy(n).addScaledVector(us,a).addScaledVector(hs,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ai{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,kn):kn.fromBufferAttribute(r,a),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Dr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Dr.copy(n.boundingBox)),Dr.applyMatrix4(e.matrixWorld),this.union(Dr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),Lr.subVectors(this.max,Zs),fs.subVectors(e.a,Zs),ds.subVectors(e.b,Zs),ps.subVectors(e.c,Zs),Ri.subVectors(ds,fs),Ci.subVectors(ps,ds),Vi.subVectors(fs,ps);let t=[0,-Ri.z,Ri.y,0,-Ci.z,Ci.y,0,-Vi.z,Vi.y,Ri.z,0,-Ri.x,Ci.z,0,-Ci.x,Vi.z,0,-Vi.x,-Ri.y,Ri.x,0,-Ci.y,Ci.x,0,-Vi.y,Vi.x,0];return!no(t,fs,ds,ps,Lr)||(t=[1,0,0,0,1,0,0,0,1],!no(t,fs,ds,ps,Lr))?!1:(Ir.crossVectors(Ri,Ci),t=[Ir.x,Ir.y,Ir.z],no(t,fs,ds,ps,Lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const hi=[new L,new L,new L,new L,new L,new L,new L,new L],kn=new L,Dr=new ai,fs=new L,ds=new L,ps=new L,Ri=new L,Ci=new L,Vi=new L,Zs=new L,Lr=new L,Ir=new L,Hi=new L;function no(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Hi.fromArray(i,r);const c=s.x*Math.abs(Hi.x)+s.y*Math.abs(Hi.y)+s.z*Math.abs(Hi.z),o=e.dot(Hi),l=t.dot(Hi),u=n.dot(Hi);if(Math.max(-Math.max(o,l,u),Math.min(o,l,u))>c)return!1}return!0}const Jt=new L,Nr=new j;let Ef=0;class Nn extends Fi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ef++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pl,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),s=Bt(s,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class ku extends Nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Vu extends Nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class xt extends Nn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const wf=new ai,Ks=new L,io=new L;class ks{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):wf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ks.subVectors(e,this.center);const t=Ks.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ks,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(io.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ks.copy(e.center).add(io)),this.expandByPoint(Ks.copy(e.center).sub(io))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Tf=0;const Pn=new Ut,so=new tn,ms=new L,wn=new ai,$s=new ai,cn=new L;class nn extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rf(e)?Vu:ku)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ot().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return so.lookAt(e),so.updateMatrix(),this.applyMatrix4(so.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];wn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ks);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(wn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];$s.setFromBufferAttribute(c),this.morphTargetsRelative?(cn.addVectors(wn.min,$s.min),wn.expandByPoint(cn),cn.addVectors(wn.max,$s.max),wn.expandByPoint(cn)):(wn.expandByPoint($s.min),wn.expandByPoint($s.max))}wn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,u=c.count;l<u;l++)cn.fromBufferAttribute(c,l),o&&(ms.fromBufferAttribute(e,l),cn.add(ms)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Nn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let x=0;x<n.count;x++)c[x]=new L,o[x]=new L;const l=new L,u=new L,f=new L,h=new j,d=new j,g=new j,_=new L,m=new L;function p(x,w,D){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,w),f.fromBufferAttribute(n,D),h.fromBufferAttribute(r,x),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,D),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const U=1/(d.x*g.y-g.x*d.y);isFinite(U)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(U),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(U),c[x].add(_),c[w].add(_),c[D].add(_),o[x].add(m),o[w].add(m),o[D].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let x=0,w=y.length;x<w;++x){const D=y[x],U=D.start,F=D.count;for(let k=U,X=U+F;k<X;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const S=new L,M=new L,T=new L,b=new L;function C(x){T.fromBufferAttribute(s,x),b.copy(T);const w=c[x];S.copy(w),S.sub(T.multiplyScalar(T.dot(w))).normalize(),M.crossVectors(b,w);const U=M.dot(o[x])<0?-1:1;a.setXYZW(x,S.x,S.y,S.z,U)}for(let x=0,w=y.length;x<w;++x){const D=y[x],U=D.start,F=D.count;for(let k=U,X=U+F;k<X;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const s=new L,r=new L,a=new L,c=new L,o=new L,l=new L,u=new L,f=new L;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),c.add(u),o.add(u),l.add(u),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(c,o){const l=c.array,u=c.itemSize,f=c.normalized,h=new l.constructor(o.length*u);let d=0,g=0;for(let _=0,m=o.length;_<m;_++){c.isInterleavedBufferAttribute?d=o[_]*c.data.stride+c.offset:d=o[_]*u;for(let p=0;p<u;p++)h[g++]=l[d++]}return new Nn(h,u,f)}if(this.index===null)return tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nn,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=e(h,n);o.push(d)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(e.data))}u.length>0&&(s[o]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Af{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pl,this.updateRanges=[],this.version=0,this.uuid=vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xn=new L;class ya{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ei(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),s=Bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Bt(t,this.array),n=Bt(n,this.array),s=Bt(s,this.array),r=Bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){xa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Nn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ya(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){xa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Rf=0;class Oi extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=Ps,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ro,this.blendDst=Co,this.blendEquation=qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rs,this.stencilZFail=rs,this.stencilZPass=rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){tt(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){tt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(n.blending=this.blending),this.side!==Ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ro&&(n.blendSrc=this.blendSrc),this.blendDst!==Co&&(n.blendDst=this.blendDst),this.blendEquation!==qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==rs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==rs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new lt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new j().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new j().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Is extends Oi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let gs;const Js=new L,_s=new L,vs=new L,xs=new j,js=new j,Hu=new Ut,Ur=new L,Qs=new L,Fr=new L,vc=new j,ro=new j,xc=new j;class Wn extends tn{constructor(e=new Is){if(super(),this.isSprite=!0,this.type="Sprite",gs===void 0){gs=new nn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Af(t,5);gs.setIndex([0,1,2,0,2,3]),gs.setAttribute("position",new ya(n,3,0,!1)),gs.setAttribute("uv",new ya(n,2,3,!1))}this.geometry=gs,this.material=e,this.center=new j(.5,.5),this.count=1}raycast(e,t){e.camera===null&&vt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_s.setFromMatrixScale(this.matrixWorld),Hu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),vs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_s.multiplyScalar(-vs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Or(Ur.set(-.5,-.5,0),vs,a,_s,s,r),Or(Qs.set(.5,-.5,0),vs,a,_s,s,r),Or(Fr.set(.5,.5,0),vs,a,_s,s,r),vc.set(0,0),ro.set(1,0),xc.set(1,1);let c=e.ray.intersectTriangle(Ur,Qs,Fr,!1,Js);if(c===null&&(Or(Qs.set(-.5,.5,0),vs,a,_s,s,r),ro.set(0,1),c=e.ray.intersectTriangle(Ur,Fr,Qs,!1,Js),c===null))return;const o=e.ray.origin.distanceTo(Js);o<e.near||o>e.far||t.push({distance:o,point:Js.clone(),uv:In.getInterpolation(Js,Ur,Qs,Fr,vc,ro,xc,new j),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Or(i,e,t,n,s,r){xs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(js.x=r*xs.x-s*xs.y,js.y=s*xs.x+r*xs.y):js.copy(xs),i.copy(e),i.x+=js.x,i.y+=js.y,i.applyMatrix4(Hu)}const fi=new L,ao=new L,Br=new L,Pi=new L,oo=new L,zr=new L,lo=new L;class Da{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ao.copy(e).add(t).multiplyScalar(.5),Br.copy(t).sub(e).normalize(),Pi.copy(this.origin).sub(ao);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Br),c=Pi.dot(this.direction),o=-Pi.dot(Br),l=Pi.lengthSq(),u=Math.abs(1-a*a);let f,h,d,g;if(u>0)if(f=a*o-c,h=a*c-o,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+a*h+2*c)+h*(a*f+h+2*o)+l}else h=r,f=Math.max(0,-(a*h+c)),d=-f*f+h*(h+2*o)+l;else h=-r,f=Math.max(0,-(a*h+c)),d=-f*f+h*(h+2*o)+l;else h<=-g?(f=Math.max(0,-(-a*r+c)),h=f>0?-r:Math.min(Math.max(-r,-o),r),d=-f*f+h*(h+2*o)+l):h<=g?(f=0,h=Math.min(Math.max(-r,-o),r),d=h*(h+2*o)+l):(f=Math.max(0,-(a*r+c)),h=f>0?r:Math.min(Math.max(-r,-o),r),d=-f*f+h*(h+2*o)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+c)),d=-f*f+h*(h+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ao).addScaledVector(Br,h),d}intersectSphere(e,t){fi.subVectors(e.center,this.origin);const n=fi.dot(this.direction),s=fi.dot(fi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(c=(e.min.z-h.z)*f,o=(e.max.z-h.z)*f):(c=(e.max.z-h.z)*f,o=(e.min.z-h.z)*f),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,n,s,r){oo.subVectors(t,e),zr.subVectors(n,e),lo.crossVectors(oo,zr);let a=this.direction.dot(lo),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;Pi.subVectors(this.origin,e);const o=c*this.direction.dot(zr.crossVectors(Pi,zr));if(o<0)return null;const l=c*this.direction.dot(oo.cross(Pi));if(l<0||o+l>a)return null;const u=-c*Pi.dot(lo);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fs extends Oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=El,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Mc=new Ut,Gi=new Da,kr=new ks,yc=new L,Vr=new L,Hr=new L,Gr=new L,co=new L,Wr=new L,Sc=new L,Xr=new L;class Ue extends tn{constructor(e=new nn,t=new Fs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){Wr.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const u=c[o],f=r[o];u!==0&&(co.fromBufferAttribute(f,e),a?Wr.addScaledVector(co,u):Wr.addScaledVector(co.sub(t),u))}t.add(Wr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(r),Gi.copy(e.ray).recast(e.near),!(kr.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(kr,yc)===null||Gi.origin.distanceToSquared(yc)>(e.far-e.near)**2))&&(Mc.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(Mc),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=S;M<T;M+=3){const b=c.getX(M),C=c.getX(M+1),x=c.getX(M+2);s=qr(this,p,e,n,l,u,f,b,C,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const y=c.getX(m),S=c.getX(m+1),M=c.getX(m+2);s=qr(this,a,e,n,l,u,f,y,S,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=S;M<T;M+=3){const b=M,C=M+1,x=M+2;s=qr(this,p,e,n,l,u,f,b,C,x),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const y=m,S=m+1,M=m+2;s=qr(this,a,e,n,l,u,f,y,S,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Cf(i,e,t,n,s,r,a,c){let o;if(e.side===yn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===Ui,c),o===null)return null;Xr.copy(c),Xr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Xr);return l<t.near||l>t.far?null:{distance:l,point:Xr.clone(),object:i}}function qr(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,Vr),i.getVertexPosition(o,Hr),i.getVertexPosition(l,Gr);const u=Cf(i,e,t,n,Vr,Hr,Gr,Sc);if(u){const f=new L;In.getBarycoord(Sc,Vr,Hr,Gr,f),s&&(u.uv=In.getInterpolatedAttribute(s,c,o,l,f,new j)),r&&(u.uv1=In.getInterpolatedAttribute(r,c,o,l,f,new j)),a&&(u.normal=In.getInterpolatedAttribute(a,c,o,l,f,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:c,b:o,c:l,normal:new L,materialIndex:0};In.getNormal(Vr,Hr,Gr,h.normal),u.face=h,u.barycoord=f}return u}class Gu extends _n{constructor(e=null,t=1,n=1,s,r,a,c,o,l=hn,u=hn,f,h){super(null,a,c,o,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bc extends Nn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ms=new Ut,Ec=new Ut,Yr=[],wc=new ai,Pf=new Ut,er=new Ue,tr=new ks;class Df extends Ue{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Pf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ai),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ms),wc.copy(e.boundingBox).applyMatrix4(Ms),this.boundingBox.union(wc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ks),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ms),tr.copy(e.boundingSphere).applyMatrix4(Ms),this.boundingSphere.union(tr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(er.geometry=this.geometry,er.material=this.material,er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tr.copy(this.boundingSphere),tr.applyMatrix4(n),e.ray.intersectsSphere(tr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ms),Ec.multiplyMatrices(n,Ms),er.matrixWorld=Ec,er.raycast(e,Yr);for(let a=0,c=Yr.length;a<c;a++){const o=Yr[a];o.instanceId=r,o.object=this,t.push(o)}Yr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new bc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gu(new Float32Array(s*this.count),s,this.count,Cl,Hn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const uo=new L,Lf=new L,If=new ot;class pi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=uo.subVectors(n,t).cross(Lf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(uo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||If.getNormalMatrix(e),s=this.coplanarPoint(uo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wi=new ks,Nf=new j(.5,.5),Zr=new L;class Ol{constructor(e=new pi,t=new pi,n=new pi,s=new pi,r=new pi,a=new pi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ti,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],u=r[4],f=r[5],h=r[6],d=r[7],g=r[8],_=r[9],m=r[10],p=r[11],y=r[12],S=r[13],M=r[14],T=r[15];if(s[0].setComponents(l-a,d-u,p-g,T-y).normalize(),s[1].setComponents(l+a,d+u,p+g,T+y).normalize(),s[2].setComponents(l+c,d+f,p+_,T+S).normalize(),s[3].setComponents(l-c,d-f,p-_,T-S).normalize(),n)s[4].setComponents(o,h,m,M).normalize(),s[5].setComponents(l-o,d-h,p-m,T-M).normalize();else if(s[4].setComponents(l-o,d-h,p-m,T-M).normalize(),t===ti)s[5].setComponents(l+o,d+h,p+m,T+M).normalize();else if(t===mr)s[5].setComponents(o,h,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(e){Wi.center.set(0,0,0);const t=Nf.distanceTo(e.center);return Wi.radius=.7071067811865476+t,Wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Zr.x=s.normal.x>0?e.max.x:e.min.x,Zr.y=s.normal.y>0?e.max.y:e.min.y,Zr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wu extends Oi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Sa=new L,ba=new L,Tc=new Ut,nr=new Da,Kr=new ks,ho=new L,Ac=new L;class Uf extends tn{constructor(e=new nn,t=new Wu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Sa.fromBufferAttribute(t,s-1),ba.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Sa.distanceTo(ba);e.setAttribute("lineDistance",new xt(n,1))}else tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(s),Kr.radius+=r,e.ray.intersectsSphere(Kr)===!1)return;Tc.copy(s).invert(),nr.copy(e.ray).applyMatrix4(Tc);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),y=u.getX(_+1),S=$r(this,e,nr,o,p,y,_);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=$r(this,e,nr,o,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=$r(this,e,nr,o,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=$r(this,e,nr,o,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function $r(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(Sa.fromBufferAttribute(c,s),ba.fromBufferAttribute(c,r),t.distanceSqToSegment(Sa,ba,ho,Ac)>n)return;ho.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ho);if(!(l<e.near||l>e.far))return{distance:l,point:Ac.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class Xu extends _n{constructor(e=[],t=ji,n,s,r,a,c,o,l,u){super(e,t,n,s,r,a,c,o,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class La extends _n{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Os extends _n{constructor(e,t,n=ri,s,r,a,c=hn,o=hn,l,u=yi,f=1){if(u!==yi&&u!==$i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,c,o,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ul(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ff extends Os{constructor(e,t=ri,n=ji,s,r,a=hn,c=hn,o,l=yi){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,c,o,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qu extends _n{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class kt extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new xt(l,3)),this.setAttribute("normal",new xt(u,3)),this.setAttribute("uv",new xt(f,2));function g(_,m,p,y,S,M,T,b,C,x,w){const D=M/C,U=T/x,F=M/2,k=T/2,X=b/2,B=C+1,$=x+1;let q=0,se=0;const ue=new L;for(let ge=0;ge<$;ge++){const me=ge*U-k;for(let _e=0;_e<B;_e++){const Ze=_e*D-F;ue[_]=Ze*y,ue[m]=me*S,ue[p]=X,l.push(ue.x,ue.y,ue.z),ue[_]=0,ue[m]=0,ue[p]=b>0?1:-1,u.push(ue.x,ue.y,ue.z),f.push(_e/C),f.push(1-ge/x),q+=1}}for(let ge=0;ge<x;ge++)for(let me=0;me<C;me++){const _e=h+me+B*ge,Ze=h+me+B*(ge+1),gt=h+(me+1)+B*(ge+1),je=h+(me+1)+B*ge;o.push(_e,Ze,je),o.push(Ze,gt,je),se+=6}c.addGroup(d,se,w),d+=se,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Yi extends nn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new L,u=new j;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const d=n+f/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),c.push(0,0,1),u.x=(a[h]/e+1)/2,u.y=(a[h+1]/e+1)/2,o.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(c,3)),this.setAttribute("uv",new xt(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Q extends nn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],d=[];let g=0;const _=[],m=n/2;let p=0;y(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new xt(f,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(d,2));function y(){const M=new L,T=new L;let b=0;const C=(t-e)/n;for(let x=0;x<=r;x++){const w=[],D=x/r,U=D*(t-e)+e;for(let F=0;F<=s;F++){const k=F/s,X=k*o+c,B=Math.sin(X),$=Math.cos(X);T.x=U*B,T.y=-D*n+m,T.z=U*$,f.push(T.x,T.y,T.z),M.set(B,C,$).normalize(),h.push(M.x,M.y,M.z),d.push(k,1-D),w.push(g++)}_.push(w)}for(let x=0;x<s;x++)for(let w=0;w<r;w++){const D=_[w][x],U=_[w+1][x],F=_[w+1][x+1],k=_[w][x+1];(e>0||w!==0)&&(u.push(D,U,k),b+=3),(t>0||w!==r-1)&&(u.push(U,F,k),b+=3)}l.addGroup(p,b,0),p+=b}function S(M){const T=g,b=new j,C=new L;let x=0;const w=M===!0?e:t,D=M===!0?1:-1;for(let F=1;F<=s;F++)f.push(0,m*D,0),h.push(0,D,0),d.push(.5,.5),g++;const U=g;for(let F=0;F<=s;F++){const X=F/s*o+c,B=Math.cos(X),$=Math.sin(X);C.x=w*$,C.y=m*D,C.z=w*B,f.push(C.x,C.y,C.z),h.push(0,D,0),b.x=B*.5+.5,b.y=$*.5*D+.5,d.push(b.x,b.y),g++}for(let F=0;F<s;F++){const k=T+F,X=U+F;M===!0?u.push(X,X+1,k):u.push(X+1,X,k),x+=3}l.addGroup(p,x,M===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Q(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Vn extends Q{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new Vn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bl extends nn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),u(),this.setAttribute("position",new xt(r,3)),this.setAttribute("normal",new xt(r.slice(),3)),this.setAttribute("uv",new xt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(y){const S=new L,M=new L,T=new L;for(let b=0;b<t.length;b+=3)d(t[b+0],S),d(t[b+1],M),d(t[b+2],T),o(S,M,T,y)}function o(y,S,M,T){const b=T+1,C=[];for(let x=0;x<=b;x++){C[x]=[];const w=y.clone().lerp(M,x/b),D=S.clone().lerp(M,x/b),U=b-x;for(let F=0;F<=U;F++)F===0&&x===b?C[x][F]=w:C[x][F]=w.clone().lerp(D,F/U)}for(let x=0;x<b;x++)for(let w=0;w<2*(b-x)-1;w++){const D=Math.floor(w/2);w%2===0?(h(C[x][D+1]),h(C[x+1][D]),h(C[x][D])):(h(C[x][D+1]),h(C[x+1][D+1]),h(C[x+1][D]))}}function l(y){const S=new L;for(let M=0;M<r.length;M+=3)S.x=r[M+0],S.y=r[M+1],S.z=r[M+2],S.normalize().multiplyScalar(y),r[M+0]=S.x,r[M+1]=S.y,r[M+2]=S.z}function u(){const y=new L;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const M=m(y)/2/Math.PI+.5,T=p(y)/Math.PI+.5;a.push(M,1-T)}g(),f()}function f(){for(let y=0;y<a.length;y+=6){const S=a[y+0],M=a[y+2],T=a[y+4],b=Math.max(S,M,T),C=Math.min(S,M,T);b>.9&&C<.1&&(S<.2&&(a[y+0]+=1),M<.2&&(a[y+2]+=1),T<.2&&(a[y+4]+=1))}}function h(y){r.push(y.x,y.y,y.z)}function d(y,S){const M=y*3;S.x=e[M+0],S.y=e[M+1],S.z=e[M+2]}function g(){const y=new L,S=new L,M=new L,T=new L,b=new j,C=new j,x=new j;for(let w=0,D=0;w<r.length;w+=9,D+=6){y.set(r[w+0],r[w+1],r[w+2]),S.set(r[w+3],r[w+4],r[w+5]),M.set(r[w+6],r[w+7],r[w+8]),b.set(a[D+0],a[D+1]),C.set(a[D+2],a[D+3]),x.set(a[D+4],a[D+5]),T.copy(y).add(S).add(M).divideScalar(3);const U=m(T);_(b,D+0,y,U),_(C,D+2,S,U),_(x,D+4,M,U)}}function _(y,S,M,T){T<0&&y.x===1&&(a[S]=y.x-1),M.x===0&&M.z===0&&(a[S]=T/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bl(e.vertices,e.indices,e.radius,e.detail)}}class zl extends Bl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new zl(e.radius,e.detail)}}class Xn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){tt("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const u=n[s],h=n[s+1]-u,d=(a-u)/h;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new j:new L);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,s=[],r=[],a=[],c=new L,o=new Ut;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),h<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();const g=Math.acos(ht(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(o.makeRotationAxis(c,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(ht(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class kl extends Xn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new j){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=o-this.aX,d=l-this.aY;o=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Of extends kl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Vl(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,u,f){let h=(a-r)/l-(c-r)/(l+u)+(c-a)/u,d=(c-a)/u-(o-a)/(u+f)+(o-c)/f;h*=u,d*=u,s(a,c,h,d)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const Rc=new L,Cc=new L,fo=new Vl,po=new Vl,mo=new Vl;class Yu extends Xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,u;this.closed||c>0?l=s[(c-1)%r]:(Cc.subVectors(s[0],s[1]).add(s[0]),l=Cc);const f=s[c%r],h=s[(c+1)%r];if(this.closed||c+2<r?u=s[(c+2)%r]:(Rc.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Rc),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),d),_=Math.pow(f.distanceToSquared(h),d),m=Math.pow(h.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),fo.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,_,m),po.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,_,m),mo.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(fo.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),po.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),mo.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return n.set(fo.calc(o),po.calc(o),mo.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Pc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function Bf(i,e){const t=1-i;return t*t*e}function zf(i,e){return 2*(1-i)*i*e}function kf(i,e){return i*i*e}function hr(i,e,t,n){return Bf(i,e)+zf(i,t)+kf(i,n)}function Vf(i,e){const t=1-i;return t*t*t*e}function Hf(i,e){const t=1-i;return 3*t*t*i*e}function Gf(i,e){return 3*(1-i)*i*i*e}function Wf(i,e){return i*i*i*e}function fr(i,e,t,n,s){return Vf(i,e)+Hf(i,t)+Gf(i,n)+Wf(i,s)}class Zu extends Xn{constructor(e=new j,t=new j,n=new j,s=new j){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new j){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(fr(e,s.x,r.x,a.x,c.x),fr(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Xf extends Xn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(fr(e,s.x,r.x,a.x,c.x),fr(e,s.y,r.y,a.y,c.y),fr(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ku extends Xn{constructor(e=new j,t=new j){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new j){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new j){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qf extends Xn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $u extends Xn{constructor(e=new j,t=new j,n=new j){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new j){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(hr(e,s.x,r.x,a.x),hr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hl extends Xn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(hr(e,s.x,r.x,a.x),hr(e,s.y,r.y,a.y),hr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ju extends Xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new j){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Pc(c,o.x,l.x,u.x,f.x),Pc(c,o.y,l.y,u.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new j().fromArray(s))}return this}}var Ea=Object.freeze({__proto__:null,ArcCurve:Of,CatmullRomCurve3:Yu,CubicBezierCurve:Zu,CubicBezierCurve3:Xf,EllipseCurve:kl,LineCurve:Ku,LineCurve3:qf,QuadraticBezierCurve:$u,QuadraticBezierCurve3:Hl,SplineCurve:Ju});class Yf extends Xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ea[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const u=o[l];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ea[s.type]().fromJSON(s))}return this}}class Dc extends Yf{constructor(e){super(),this.type="Path",this.currentPoint=new j,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Ku(this.currentPoint.clone(),new j(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new $u(this.currentPoint.clone(),new j(e,t),new j(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new Zu(this.currentPoint.clone(),new j(e,t),new j(n,s),new j(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Ju(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new kl(e,t,n,s,r,a,c,o);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class or extends Dc{constructor(e){super(e),this.uuid=vi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Dc().fromJSON(s))}return this}}function Zf(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=ju(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=Qf(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let u=c,f=o;for(let h=t;h<s;h+=t){const d=i[h],g=i[h+1];d<c&&(c=d),g<o&&(o=g),d>u&&(u=d),g>f&&(f=g)}l=Math.max(u-c,f-o),l=l!==0?32767/l:0}return gr(r,a,t,c,o,l,0),a}function ju(i,e,t,n,s){let r;if(s===ud(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Lc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Lc(a/n|0,i[a],i[a+1],r);return r&&Bs(r,r.next)&&(vr(r),r=r.next),r}function es(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Bs(t,t.next)||Zt(t.prev,t,t.next)===0)){if(vr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function gr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&sd(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?$f(i,n,s,r):Kf(i)){e.push(o.i,i.i,l.i),vr(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=Jf(es(i),e),gr(i,e,t,n,s,r,2)):a===2&&jf(i,e,t,n,s,r):gr(es(i),e,t,n,s,r,1);break}}}function Kf(i){const e=i.prev,t=i,n=i.next;if(Zt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,u=Math.min(s,r,a),f=Math.min(c,o,l),h=Math.max(s,r,a),d=Math.max(c,o,l);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=d&&lr(s,c,r,o,a,l,g.x,g.y)&&Zt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function $f(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Zt(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,u=s.y,f=r.y,h=a.y,d=Math.min(c,o,l),g=Math.min(u,f,h),_=Math.max(c,o,l),m=Math.max(u,f,h),p=gl(d,g,e,t,n),y=gl(_,m,e,t,n);let S=i.prevZ,M=i.nextZ;for(;S&&S.z>=p&&M&&M.z<=y;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&lr(c,u,o,f,l,h,S.x,S.y)&&Zt(S.prev,S,S.next)>=0||(S=S.prevZ,M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&lr(c,u,o,f,l,h,M.x,M.y)&&Zt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&lr(c,u,o,f,l,h,S.x,S.y)&&Zt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;M&&M.z<=y;){if(M.x>=d&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&lr(c,u,o,f,l,h,M.x,M.y)&&Zt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Jf(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Bs(n,s)&&eh(n,t,t.next,s)&&_r(n,s)&&_r(s,n)&&(e.push(n.i,t.i,s.i),vr(t),vr(t.next),t=i=s),t=t.next}while(t!==i);return es(t)}function jf(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&od(a,c)){let o=th(a,c);a=es(a,a.next),o=es(o,o.next),gr(a,e,t,n,s,r,0),gr(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function Qf(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=ju(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(ad(l))}s.sort(ed);for(let r=0;r<s.length;r++)t=td(s[r],t);return t}function ed(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function td(i,e){const t=nd(i,e);if(!t)return e;const n=th(t,i);return es(n,n.next),es(t,t.next)}function nd(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Bs(i,t))return t;do{if(Bs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&Qu(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const f=Math.abs(s-t.y)/(n-t.x);_r(t,i)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&id(a,t)))&&(a=t,u=f)}t=t.next}while(t!==c);return a}function id(i,e){return Zt(i.prev,i,e.prev)<0&&Zt(e.next,i,i.next)<0}function sd(i,e,t,n){let s=i;do s.z===0&&(s.z=gl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,rd(s)}function rd(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function gl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ad(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Qu(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function lr(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&Qu(i,e,t,n,s,r,a,c)}function od(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ld(i,e)&&(_r(i,e)&&_r(e,i)&&cd(i,e)&&(Zt(i.prev,i,e.prev)||Zt(i,e.prev,e))||Bs(i,e)&&Zt(i.prev,i,i.next)>0&&Zt(e.prev,e,e.next)>0)}function Zt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Bs(i,e){return i.x===e.x&&i.y===e.y}function eh(i,e,t,n){const s=jr(Zt(i,e,t)),r=jr(Zt(i,e,n)),a=jr(Zt(t,n,i)),c=jr(Zt(t,n,e));return!!(s!==r&&a!==c||s===0&&Jr(i,t,e)||r===0&&Jr(i,n,e)||a===0&&Jr(t,i,n)||c===0&&Jr(t,e,n))}function Jr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function jr(i){return i>0?1:i<0?-1:0}function ld(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&eh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function _r(i,e){return Zt(i.prev,i,i.next)<0?Zt(i,e,i.next)>=0&&Zt(i,i.prev,e)>=0:Zt(i,e,i.prev)<0||Zt(i,i.next,e)<0}function cd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function th(i,e){const t=_l(i.i,i.x,i.y),n=_l(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Lc(i,e,t,n){const s=_l(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function vr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function _l(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ud(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class hd{static triangulate(e,t,n=2){return Zf(e,t,n)}}class As{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return As.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Ic(e),Nc(n,e);let a=e.length;t.forEach(Ic);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,Nc(n,t[o]);const c=hd.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function Ic(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Nc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Rs extends nn{constructor(e=new or([new j(.5,.5),new j(-.5,.5),new j(-.5,-.5),new j(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new xt(s,3)),this.setAttribute("uv",new xt(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let h=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:fd;let S,M=!1,T,b,C,x;if(p){S=p.getSpacedPoints(u),M=!0,h=!1;const le=p.isCatmullRomCurve3?p.closed:!1;T=p.computeFrenetFrames(u,le),b=new L,C=new L,x=new L}h||(m=0,d=0,g=0,_=0);const w=c.extractPoints(l);let D=w.shape;const U=w.holes;if(!As.isClockWise(D)){D=D.reverse();for(let le=0,fe=U.length;le<fe;le++){const de=U[le];As.isClockWise(de)&&(U[le]=de.reverse())}}function k(le){const de=10000000000000001e-36;let we=le[0];for(let Me=1;Me<=le.length;Me++){const Ye=Me%le.length,Be=le[Ye],et=Be.x-we.x,nt=Be.y-we.y,O=et*et+nt*nt,bt=Math.max(Math.abs(Be.x),Math.abs(Be.y),Math.abs(we.x),Math.abs(we.y)),dt=de*bt*bt;if(O<=dt){le.splice(Ye,1),Me--;continue}we=Be}}k(D),U.forEach(k);const X=U.length,B=D;for(let le=0;le<X;le++){const fe=U[le];D=D.concat(fe)}function $(le,fe,de){return fe||vt("ExtrudeGeometry: vec does not exist"),le.clone().addScaledVector(fe,de)}const q=D.length;function se(le,fe,de){let we,Me,Ye;const Be=le.x-fe.x,et=le.y-fe.y,nt=de.x-le.x,O=de.y-le.y,bt=Be*Be+et*et,dt=Be*O-et*nt;if(Math.abs(dt)>Number.EPSILON){const R=Math.sqrt(bt),v=Math.sqrt(nt*nt+O*O),W=fe.x-et/R,Z=fe.y+Be/R,te=de.x-O/v,ae=de.y+nt/v,xe=((te-W)*O-(ae-Z)*nt)/(Be*O-et*nt);we=W+Be*xe-le.x,Me=Z+et*xe-le.y;const ee=we*we+Me*Me;if(ee<=2)return new j(we,Me);Ye=Math.sqrt(ee/2)}else{let R=!1;Be>Number.EPSILON?nt>Number.EPSILON&&(R=!0):Be<-Number.EPSILON?nt<-Number.EPSILON&&(R=!0):Math.sign(et)===Math.sign(O)&&(R=!0),R?(we=-et,Me=Be,Ye=Math.sqrt(bt)):(we=Be,Me=et,Ye=Math.sqrt(bt/2))}return new j(we/Ye,Me/Ye)}const ue=[];for(let le=0,fe=B.length,de=fe-1,we=le+1;le<fe;le++,de++,we++)de===fe&&(de=0),we===fe&&(we=0),ue[le]=se(B[le],B[de],B[we]);const ge=[];let me,_e=ue.concat();for(let le=0,fe=X;le<fe;le++){const de=U[le];me=[];for(let we=0,Me=de.length,Ye=Me-1,Be=we+1;we<Me;we++,Ye++,Be++)Ye===Me&&(Ye=0),Be===Me&&(Be=0),me[we]=se(de[we],de[Ye],de[Be]);ge.push(me),_e=_e.concat(me)}let Ze;if(m===0)Ze=As.triangulateShape(B,U);else{const le=[],fe=[];for(let de=0;de<m;de++){const we=de/m,Me=d*Math.cos(we*Math.PI/2),Ye=g*Math.sin(we*Math.PI/2)+_;for(let Be=0,et=B.length;Be<et;Be++){const nt=$(B[Be],ue[Be],Ye);Ne(nt.x,nt.y,-Me),we===0&&le.push(nt)}for(let Be=0,et=X;Be<et;Be++){const nt=U[Be];me=ge[Be];const O=[];for(let bt=0,dt=nt.length;bt<dt;bt++){const R=$(nt[bt],me[bt],Ye);Ne(R.x,R.y,-Me),we===0&&O.push(R)}we===0&&fe.push(O)}}Ze=As.triangulateShape(le,fe)}const gt=Ze.length,je=g+_;for(let le=0;le<q;le++){const fe=h?$(D[le],_e[le],je):D[le];M?(C.copy(T.normals[0]).multiplyScalar(fe.x),b.copy(T.binormals[0]).multiplyScalar(fe.y),x.copy(S[0]).add(C).add(b),Ne(x.x,x.y,x.z)):Ne(fe.x,fe.y,0)}for(let le=1;le<=u;le++)for(let fe=0;fe<q;fe++){const de=h?$(D[fe],_e[fe],je):D[fe];M?(C.copy(T.normals[le]).multiplyScalar(de.x),b.copy(T.binormals[le]).multiplyScalar(de.y),x.copy(S[le]).add(C).add(b),Ne(x.x,x.y,x.z)):Ne(de.x,de.y,f/u*le)}for(let le=m-1;le>=0;le--){const fe=le/m,de=d*Math.cos(fe*Math.PI/2),we=g*Math.sin(fe*Math.PI/2)+_;for(let Me=0,Ye=B.length;Me<Ye;Me++){const Be=$(B[Me],ue[Me],we);Ne(Be.x,Be.y,f+de)}for(let Me=0,Ye=U.length;Me<Ye;Me++){const Be=U[Me];me=ge[Me];for(let et=0,nt=Be.length;et<nt;et++){const O=$(Be[et],me[et],we);M?Ne(O.x,O.y+S[u-1].y,S[u-1].x+de):Ne(O.x,O.y,f+de)}}}ne(),ve();function ne(){const le=s.length/3;if(h){let fe=0,de=q*fe;for(let we=0;we<gt;we++){const Me=Ze[we];Ke(Me[2]+de,Me[1]+de,Me[0]+de)}fe=u+m*2,de=q*fe;for(let we=0;we<gt;we++){const Me=Ze[we];Ke(Me[0]+de,Me[1]+de,Me[2]+de)}}else{for(let fe=0;fe<gt;fe++){const de=Ze[fe];Ke(de[2],de[1],de[0])}for(let fe=0;fe<gt;fe++){const de=Ze[fe];Ke(de[0]+q*u,de[1]+q*u,de[2]+q*u)}}n.addGroup(le,s.length/3-le,0)}function ve(){const le=s.length/3;let fe=0;he(B,fe),fe+=B.length;for(let de=0,we=U.length;de<we;de++){const Me=U[de];he(Me,fe),fe+=Me.length}n.addGroup(le,s.length/3-le,1)}function he(le,fe){let de=le.length;for(;--de>=0;){const we=de;let Me=de-1;Me<0&&(Me=le.length-1);for(let Ye=0,Be=u+m*2;Ye<Be;Ye++){const et=q*Ye,nt=q*(Ye+1),O=fe+we+et,bt=fe+Me+et,dt=fe+Me+nt,R=fe+we+nt;Ve(O,bt,dt,R)}}}function Ne(le,fe,de){o.push(le),o.push(fe),o.push(de)}function Ke(le,fe,de){_t(le),_t(fe),_t(de);const we=s.length/3,Me=y.generateTopUV(n,s,we-3,we-2,we-1);Qe(Me[0]),Qe(Me[1]),Qe(Me[2])}function Ve(le,fe,de,we){_t(le),_t(fe),_t(we),_t(fe),_t(de),_t(we);const Me=s.length/3,Ye=y.generateSideWallUV(n,s,Me-6,Me-3,Me-2,Me-1);Qe(Ye[0]),Qe(Ye[1]),Qe(Ye[3]),Qe(Ye[1]),Qe(Ye[2]),Qe(Ye[3])}function _t(le){s.push(o[le*3+0]),s.push(o[le*3+1]),s.push(o[le*3+2])}function Qe(le){r.push(le.x),r.push(le.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return dd(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ea[s.type]().fromJSON(s)),new Rs(n,e.options)}}const fd={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],u=e[s*3+1];return[new j(r,a),new j(c,o),new j(l,u)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],u=e[n*3+1],f=e[n*3+2],h=e[s*3],d=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(c-u)<Math.abs(a-l)?[new j(a,1-o),new j(l,1-f),new j(h,1-g),new j(_,1-p)]:[new j(c,1-o),new j(u,1-f),new j(d,1-g),new j(m,1-p)]}};function dd(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class di extends nn{constructor(e=[new j(0,-.5),new j(.5,0),new j(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=ht(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],u=1/t,f=new L,h=new j,d=new L,g=new L,_=new L;let m=0,p=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:m=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(_.x,_.y,_.z);break;default:m=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),o.push(d.x,d.y,d.z),_.copy(g)}for(let y=0;y<=t;y++){const S=n+y*u*s,M=Math.sin(S),T=Math.cos(S);for(let b=0;b<=e.length-1;b++){f.x=e[b].x*M,f.y=e[b].y,f.z=e[b].x*T,a.push(f.x,f.y,f.z),h.x=y/t,h.y=b/(e.length-1),c.push(h.x,h.y);const C=o[3*b+0]*M,x=o[3*b+1],w=o[3*b+0]*T;l.push(C,x,w)}}for(let y=0;y<t;y++)for(let S=0;S<e.length-1;S++){const M=S+y*e.length,T=M,b=M+e.length,C=M+e.length+1,x=M+1;r.push(T,b,x),r.push(C,x,b)}this.setIndex(r),this.setAttribute("position",new xt(a,3)),this.setAttribute("uv",new xt(c,2)),this.setAttribute("normal",new xt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new di(e.points,e.segments,e.phiStart,e.phiLength)}}class si extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,u=o+1,f=e/c,h=t/o,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const y=p*h-a;for(let S=0;S<l;S++){const M=S*f-r;g.push(M,-y,0),_.push(0,0,1),m.push(S/c),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let y=0;y<c;y++){const S=y+l*p,M=y+l*(p+1),T=y+1+l*(p+1),b=y+1+l*p;d.push(S,M,b),d.push(M,T,b)}this.setIndex(d),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.width,e.height,e.widthSegments,e.heightSegments)}}class nh extends nn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],u=[];let f=e;const h=(t-e)/s,d=new L,g=new j;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=f*Math.cos(p),d.y=f*Math.sin(p),o.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const y=p+m,S=y,M=y+n+1,T=y+n+2,b=y+1;c.push(S,M,b),c.push(M,T,b)}}this.setIndex(c),this.setAttribute("position",new xt(o,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Wt extends nn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const u=[],f=new L,h=new L,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const y=[],S=p/n,M=a+S*c,T=e*Math.cos(M),b=Math.sqrt(e*e-T*T);let C=0;p===0&&a===0?C=.5/t:p===n&&o===Math.PI&&(C=-.5/t);for(let x=0;x<=t;x++){const w=x/t,D=s+w*r;f.x=-b*Math.cos(D),f.y=T,f.z=b*Math.sin(D),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(w+C,1-S),y.push(l++)}u.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const S=u[p][y+1],M=u[p][y],T=u[p+1][y],b=u[p+1][y+1];(p!==0||a>0)&&d.push(S,M,b),(p!==n-1||o<Math.PI)&&d.push(M,T,b)}this.setIndex(d),this.setAttribute("position",new xt(g,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Gt extends nn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],u=[],f=[],h=new L,d=new L,g=new L;for(let _=0;_<=n;_++){const m=a+_/n*c;for(let p=0;p<=s;p++){const y=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(y),d.y=(e+t*Math.cos(m))*Math.sin(y),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),g.subVectors(d,h).normalize(),u.push(g.x,g.y,g.z),f.push(p/s),f.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const p=(s+1)*_+m-1,y=(s+1)*(_-1)+m-1,S=(s+1)*(_-1)+m,M=(s+1)*_+m;o.push(p,y,M),o.push(y,S,M)}this.setIndex(o),this.setAttribute("position",new xt(l,3)),this.setAttribute("normal",new xt(u,3)),this.setAttribute("uv",new xt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ji extends nn{constructor(e=new Hl(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new L,o=new L,l=new j;let u=new L;const f=[],h=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new xt(f,3)),this.setAttribute("normal",new xt(h,3)),this.setAttribute("uv",new xt(d,2));function _(){for(let S=0;S<t;S++)m(S);m(r===!1?t:0),y(),p()}function m(S){u=e.getPointAt(S/t,u);const M=a.normals[S],T=a.binormals[S];for(let b=0;b<=s;b++){const C=b/s*Math.PI*2,x=Math.sin(C),w=-Math.cos(C);o.x=w*M.x+x*T.x,o.y=w*M.y+x*T.y,o.z=w*M.z+x*T.z,o.normalize(),h.push(o.x,o.y,o.z),c.x=u.x+n*o.x,c.y=u.y+n*o.y,c.z=u.z+n*o.z,f.push(c.x,c.y,c.z)}}function p(){for(let S=1;S<=t;S++)for(let M=1;M<=s;M++){const T=(s+1)*(S-1)+(M-1),b=(s+1)*S+(M-1),C=(s+1)*S+M,x=(s+1)*(S-1)+M;g.push(T,b,x),g.push(b,C,x)}}function y(){for(let S=0;S<=t;S++)for(let M=0;M<=s;M++)l.x=S/t,l.y=M/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ji(new Ea[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function zs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Uc(s))s.isRenderTargetTexture?(tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Uc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Mn(i){const e={};for(let t=0;t<i.length;t++){const n=zs(i[t]);for(const s in n)e[s]=n[s]}return e}function Uc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function pd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ih(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:St.workingColorSpace}const md={clone:zs,merge:Mn};var gd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends Oi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gd,this.fragmentShader=_d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zs(e.uniforms),this.uniformsGroups=pd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new lt().setHex(s.value);break;case"v2":this.uniforms[n].value=new j().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Yt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ot().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ut().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class vd extends oi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class pe extends Oi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ma,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wa extends pe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new j(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class xd extends Oi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ma,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=El,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Md extends Oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yd extends Oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class sx extends Wu{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Gl extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class sh extends Gl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new lt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const go=new Ut,Fc=new L,Oc=new L;class rh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new j(512,512),this.mapType=Rn,this.map=null,this.mapPass=null,this.matrix=new Ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ol,this._frameExtents=new j(1,1),this._viewportCount=1,this._viewports=[new Yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Fc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fc),Oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oc),t.updateMatrixWorld(),go.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(go,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===mr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(go)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Qr=new L,ea=new Si,Kn=new L;class ah extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Qr,ea,Kn),Kn.x===1&&Kn.y===1&&Kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qr,ea,Kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Qr,ea,Kn),Kn.x===1&&Kn.y===1&&Kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Qr,ea,Kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Di=new L,Bc=new j,zc=new j;class An extends ah{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ml*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ha*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ml*2*Math.atan(Math.tan(ha*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Di.x,Di.y).multiplyScalar(-e/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Di.x,Di.y).multiplyScalar(-e/Di.z)}getViewSize(e,t){return this.getViewBounds(e,Bc,zc),t.subVectors(zc,Bc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ha*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Sd extends rh{constructor(){super(new An(90,1,.5,500)),this.isPointLightShadow=!0}}class bd extends Gl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Wl extends ah{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=u*this.view.offsetY,o=c-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ed extends rh{constructor(){super(new Wl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ta extends Gl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new Ed}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const ys=-90,Ss=1;class wd extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new An(ys,Ss,e,t);s.layers=this.layers,this.add(s);const r=new An(ys,Ss,e,t);r.layers=this.layers,this.add(r);const a=new An(ys,Ss,e,t);a.layers=this.layers,this.add(a);const c=new An(ys,Ss,e,t);c.layers=this.layers,this.add(c);const o=new An(ys,Ss,e,t);o.layers=this.layers,this.add(o);const l=new An(ys,Ss,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===ti)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Td extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ad{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Rd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Rd(){this._document.hidden===!1&&this.reset()}const kc=new Ut;class Cd{constructor(e,t,n=0,s=1/0){this.ray=new Da(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Fl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):vt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return kc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kc),this}intersectObject(e,t=!0,n=[]){return vl(e,this,n,t),n.sort(Vc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)vl(e[s],this,n,t);return n.sort(Vc),n}}function Vc(i,e){return i.distance-e.distance}function vl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)vl(r[a],e,t,!0)}}class Hc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ht(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const $l=class $l{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};$l.prototype.isMatrix2=!0;let Gc=$l;class Pd extends Fi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){tt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Wc(i,e,t,n){const s=Dd(n);switch(t){case Nu:return i*e;case Cl:return i*e/s.components*s.byteLength;case Pl:return i*e/s.components*s.byteLength;case Qi:return i*e*2/s.components*s.byteLength;case Dl:return i*e*2/s.components*s.byteLength;case Uu:return i*e*3/s.components*s.byteLength;case Gn:return i*e*4/s.components*s.byteLength;case Ll:return i*e*4/s.components*s.byteLength;case oa:case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ca:case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zo:case Vo:return Math.max(i,16)*Math.max(e,8)/4;case Bo:case ko:return Math.max(i,8)*Math.max(e,8)/2;case Ho:case Go:case Xo:case qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wo:case da:case Yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case $o:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case jo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case tl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case al:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ol:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ll:case cl:case ul:return Math.ceil(i/4)*Math.ceil(e/4)*16;case hl:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case pa:case dl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dd(i){switch(i){case Rn:case Pu:return{byteLength:1,components:1};case dr:case Du:case Mi:return{byteLength:2,components:1};case Al:case Rl:return{byteLength:2,components:4};case ri:case Tl:case Hn:return{byteLength:4,components:1};case Lu:case Iu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bl}}));typeof window<"u"&&(window.__THREE__?tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function oh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ld(i){const e=new WeakMap;function t(c,o){const l=c.array,u=c.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(o,h),i.bufferData(o,l,u),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:f}}function n(c,o,l){const u=o.array,f=o.updateRanges;if(i.bindBuffer(l,c),f.length===0)i.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const u=e.get(c);(!u||u.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var Id=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nd=`#ifdef USE_ALPHAHASH
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
#endif`,Ud=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Od=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zd=`#ifdef USE_AOMAP
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
#endif`,kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vd=`#ifdef USE_BATCHING
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
#endif`,Hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qd=`#ifdef USE_IRIDESCENCE
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
#endif`,Yd=`#ifdef USE_BUMPMAP
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
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ep=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,np=`#define PI 3.141592653589793
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
} // validated`,ip=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,sp=`vec3 transformedNormal = objectNormal;
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
#endif`,rp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,op=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",up=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hp=`#ifdef USE_ENVMAP
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
#endif`,fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dp=`#ifdef USE_ENVMAP
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
#endif`,pp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mp=`#ifdef USE_ENVMAP
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
#endif`,gp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_p=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mp=`#ifdef USE_GRADIENTMAP
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
}`,yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ep=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,wp=`#ifdef USE_ENVMAP
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
#endif`,Tp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pp=`PhysicalMaterial material;
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
#endif`,Dp=`uniform sampler2D dfgLUT;
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
}`,Lp=`
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
#endif`,Ip=`#if defined( RE_IndirectDiffuse )
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
#endif`,Np=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Up=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Fp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Op=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gp=`#if defined( USE_POINTS_UV )
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
#endif`,Wp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kp=`#ifdef USE_MORPHTARGETS
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
#endif`,$p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,n0=`#ifdef USE_NORMALMAP
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
#endif`,i0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,c0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,h0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,d0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,g0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,v0=`float getShadowMask() {
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
}`,x0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,M0=`#ifdef USE_SKINNING
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
#endif`,y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,S0=`#ifdef USE_SKINNING
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
#endif`,b0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,A0=`#ifdef USE_TRANSMISSION
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
#endif`,R0=`#ifdef USE_TRANSMISSION
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
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const I0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N0=`uniform sampler2D t2D;
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`#include <common>
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
}`,k0=`#if DEPTH_PACKING == 3200
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
}`,V0=`#define DISTANCE
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
}`,H0=`#define DISTANCE
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
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`uniform float scale;
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
}`,q0=`uniform vec3 diffuse;
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
}`,Y0=`#include <common>
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
}`,Z0=`uniform vec3 diffuse;
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
}`,K0=`#define LAMBERT
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
}`,$0=`#define LAMBERT
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
}`,J0=`#define MATCAP
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
}`,j0=`#define MATCAP
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
}`,Q0=`#define NORMAL
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
}`,em=`#define NORMAL
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
}`,tm=`#define PHONG
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
}`,nm=`#define PHONG
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
}`,im=`#define STANDARD
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
}`,sm=`#define STANDARD
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
}`,rm=`#define TOON
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
}`,am=`#define TOON
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
}`,om=`uniform float size;
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
}`,lm=`uniform vec3 diffuse;
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
}`,cm=`#include <common>
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
}`,um=`uniform vec3 color;
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
}`,hm=`uniform float rotation;
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
}`,fm=`uniform vec3 diffuse;
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
}`,ft={alphahash_fragment:Id,alphahash_pars_fragment:Nd,alphamap_fragment:Ud,alphamap_pars_fragment:Fd,alphatest_fragment:Od,alphatest_pars_fragment:Bd,aomap_fragment:zd,aomap_pars_fragment:kd,batching_pars_vertex:Vd,batching_vertex:Hd,begin_vertex:Gd,beginnormal_vertex:Wd,bsdfs:Xd,iridescence_fragment:qd,bumpmap_pars_fragment:Yd,clipping_planes_fragment:Zd,clipping_planes_pars_fragment:Kd,clipping_planes_pars_vertex:$d,clipping_planes_vertex:Jd,color_fragment:jd,color_pars_fragment:Qd,color_pars_vertex:ep,color_vertex:tp,common:np,cube_uv_reflection_fragment:ip,defaultnormal_vertex:sp,displacementmap_pars_vertex:rp,displacementmap_vertex:ap,emissivemap_fragment:op,emissivemap_pars_fragment:lp,colorspace_fragment:cp,colorspace_pars_fragment:up,envmap_fragment:hp,envmap_common_pars_fragment:fp,envmap_pars_fragment:dp,envmap_pars_vertex:pp,envmap_physical_pars_fragment:wp,envmap_vertex:mp,fog_vertex:gp,fog_pars_vertex:_p,fog_fragment:vp,fog_pars_fragment:xp,gradientmap_pars_fragment:Mp,lightmap_pars_fragment:yp,lights_lambert_fragment:Sp,lights_lambert_pars_fragment:bp,lights_pars_begin:Ep,lights_toon_fragment:Tp,lights_toon_pars_fragment:Ap,lights_phong_fragment:Rp,lights_phong_pars_fragment:Cp,lights_physical_fragment:Pp,lights_physical_pars_fragment:Dp,lights_fragment_begin:Lp,lights_fragment_maps:Ip,lights_fragment_end:Np,lightprobes_pars_fragment:Up,logdepthbuf_fragment:Fp,logdepthbuf_pars_fragment:Op,logdepthbuf_pars_vertex:Bp,logdepthbuf_vertex:zp,map_fragment:kp,map_pars_fragment:Vp,map_particle_fragment:Hp,map_particle_pars_fragment:Gp,metalnessmap_fragment:Wp,metalnessmap_pars_fragment:Xp,morphinstance_vertex:qp,morphcolor_vertex:Yp,morphnormal_vertex:Zp,morphtarget_pars_vertex:Kp,morphtarget_vertex:$p,normal_fragment_begin:Jp,normal_fragment_maps:jp,normal_pars_fragment:Qp,normal_pars_vertex:e0,normal_vertex:t0,normalmap_pars_fragment:n0,clearcoat_normal_fragment_begin:i0,clearcoat_normal_fragment_maps:s0,clearcoat_pars_fragment:r0,iridescence_pars_fragment:a0,opaque_fragment:o0,packing:l0,premultiplied_alpha_fragment:c0,project_vertex:u0,dithering_fragment:h0,dithering_pars_fragment:f0,roughnessmap_fragment:d0,roughnessmap_pars_fragment:p0,shadowmap_pars_fragment:m0,shadowmap_pars_vertex:g0,shadowmap_vertex:_0,shadowmask_pars_fragment:v0,skinbase_vertex:x0,skinning_pars_vertex:M0,skinning_vertex:y0,skinnormal_vertex:S0,specularmap_fragment:b0,specularmap_pars_fragment:E0,tonemapping_fragment:w0,tonemapping_pars_fragment:T0,transmission_fragment:A0,transmission_pars_fragment:R0,uv_pars_fragment:C0,uv_pars_vertex:P0,uv_vertex:D0,worldpos_vertex:L0,background_vert:I0,background_frag:N0,backgroundCube_vert:U0,backgroundCube_frag:F0,cube_vert:O0,cube_frag:B0,depth_vert:z0,depth_frag:k0,distance_vert:V0,distance_frag:H0,equirect_vert:G0,equirect_frag:W0,linedashed_vert:X0,linedashed_frag:q0,meshbasic_vert:Y0,meshbasic_frag:Z0,meshlambert_vert:K0,meshlambert_frag:$0,meshmatcap_vert:J0,meshmatcap_frag:j0,meshnormal_vert:Q0,meshnormal_frag:em,meshphong_vert:tm,meshphong_frag:nm,meshphysical_vert:im,meshphysical_frag:sm,meshtoon_vert:rm,meshtoon_frag:am,points_vert:om,points_frag:lm,shadow_vert:cm,shadow_frag:um,sprite_vert:hm,sprite_frag:fm},Pe={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new j(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new j(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},Qn={basic:{uniforms:Mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:Mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new lt(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:Mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:Mn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:Mn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new lt(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:Mn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:Mn([Pe.points,Pe.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:Mn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:Mn([Pe.common,Pe.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:Mn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:Mn([Pe.sprite,Pe.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:Mn([Pe.common,Pe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:Mn([Pe.lights,Pe.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};Qn.physical={uniforms:Mn([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new j(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new j},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new j},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const ta={r:0,b:0,g:0},dm=new Ut,lh=new ot;lh.set(-1,0,0,0,1,0,0,0,1);function pm(i,e,t,n,s,r){const a=new lt(0);let c=s===!0?0:1,o,l,u=null,f=0,h=null;function d(y){let S=y.isScene===!0?y.background:null;if(S&&S.isTexture){const M=y.backgroundBlurriness>0;S=e.get(S,M)}return S}function g(y){let S=!1;const M=d(y);M===null?m(a,c):M&&M.isColor&&(m(M,1),S=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(y,S){const M=d(S);M&&(M.isCubeTexture||M.mapping===Pa)?(l===void 0&&(l=new Ue(new kt(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:zs(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(dm.makeRotationFromEuler(S.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(lh),l.material.toneMapped=St.getTransfer(M.colorSpace)!==Nt,(u!==M||f!==M.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(o===void 0&&(o=new Ue(new si(2,2),new oi({name:"BackgroundMaterial",uniforms:zs(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=M,o.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,o.material.toneMapped=St.getTransfer(M.colorSpace)!==Nt,M.matrixAutoUpdate===!0&&M.updateMatrix(),o.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==i.toneMapping)&&(o.material.needsUpdate=!0,u=M,f=M.version,h=i.toneMapping),o.layers.enableAll(),y.unshift(o,o.geometry,o.material,0,0,null))}function m(y,S){y.getRGB(ta,ih(i)),t.buffers.color.setClear(ta.r,ta.g,ta.b,S,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),c=S,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(a,c)},render:g,addToRenderList:_,dispose:p}}function mm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function c(U,F,k,X,B){let $=!1;const q=f(U,X,k,F);r!==q&&(r=q,l(r.object)),$=d(U,X,k,B),$&&g(U,X,k,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,M(U,F,k,X),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function o(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function u(U){return i.deleteVertexArray(U)}function f(U,F,k,X){const B=X.wireframe===!0;let $=n[F.id];$===void 0&&($={},n[F.id]=$);const q=U.isInstancedMesh===!0?U.id:0;let se=$[q];se===void 0&&(se={},$[q]=se);let ue=se[k.id];ue===void 0&&(ue={},se[k.id]=ue);let ge=ue[B];return ge===void 0&&(ge=h(o()),ue[B]=ge),ge}function h(U){const F=[],k=[],X=[];for(let B=0;B<t;B++)F[B]=0,k[B]=0,X[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:k,attributeDivisors:X,object:U,attributes:{},index:null}}function d(U,F,k,X){const B=r.attributes,$=F.attributes;let q=0;const se=k.getAttributes();for(const ue in se)if(se[ue].location>=0){const me=B[ue];let _e=$[ue];if(_e===void 0&&(ue==="instanceMatrix"&&U.instanceMatrix&&(_e=U.instanceMatrix),ue==="instanceColor"&&U.instanceColor&&(_e=U.instanceColor)),me===void 0||me.attribute!==_e||_e&&me.data!==_e.data)return!0;q++}return r.attributesNum!==q||r.index!==X}function g(U,F,k,X){const B={},$=F.attributes;let q=0;const se=k.getAttributes();for(const ue in se)if(se[ue].location>=0){let me=$[ue];me===void 0&&(ue==="instanceMatrix"&&U.instanceMatrix&&(me=U.instanceMatrix),ue==="instanceColor"&&U.instanceColor&&(me=U.instanceColor));const _e={};_e.attribute=me,me&&me.data&&(_e.data=me.data),B[ue]=_e,q++}r.attributes=B,r.attributesNum=q,r.index=X}function _(){const U=r.newAttributes;for(let F=0,k=U.length;F<k;F++)U[F]=0}function m(U){p(U,0)}function p(U,F){const k=r.newAttributes,X=r.enabledAttributes,B=r.attributeDivisors;k[U]=1,X[U]===0&&(i.enableVertexAttribArray(U),X[U]=1),B[U]!==F&&(i.vertexAttribDivisor(U,F),B[U]=F)}function y(){const U=r.newAttributes,F=r.enabledAttributes;for(let k=0,X=F.length;k<X;k++)F[k]!==U[k]&&(i.disableVertexAttribArray(k),F[k]=0)}function S(U,F,k,X,B,$,q){q===!0?i.vertexAttribIPointer(U,F,k,B,$):i.vertexAttribPointer(U,F,k,X,B,$)}function M(U,F,k,X){_();const B=X.attributes,$=k.getAttributes(),q=F.defaultAttributeValues;for(const se in $){const ue=$[se];if(ue.location>=0){let ge=B[se];if(ge===void 0&&(se==="instanceMatrix"&&U.instanceMatrix&&(ge=U.instanceMatrix),se==="instanceColor"&&U.instanceColor&&(ge=U.instanceColor)),ge!==void 0){const me=ge.normalized,_e=ge.itemSize,Ze=e.get(ge);if(Ze===void 0)continue;const gt=Ze.buffer,je=Ze.type,ne=Ze.bytesPerElement,ve=je===i.INT||je===i.UNSIGNED_INT||ge.gpuType===Tl;if(ge.isInterleavedBufferAttribute){const he=ge.data,Ne=he.stride,Ke=ge.offset;if(he.isInstancedInterleavedBuffer){for(let Ve=0;Ve<ue.locationSize;Ve++)p(ue.location+Ve,he.meshPerAttribute);U.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ve=0;Ve<ue.locationSize;Ve++)m(ue.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let Ve=0;Ve<ue.locationSize;Ve++)S(ue.location+Ve,_e/ue.locationSize,je,me,Ne*ne,(Ke+_e/ue.locationSize*Ve)*ne,ve)}else{if(ge.isInstancedBufferAttribute){for(let he=0;he<ue.locationSize;he++)p(ue.location+he,ge.meshPerAttribute);U.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let he=0;he<ue.locationSize;he++)m(ue.location+he);i.bindBuffer(i.ARRAY_BUFFER,gt);for(let he=0;he<ue.locationSize;he++)S(ue.location+he,_e/ue.locationSize,je,me,_e*ne,_e/ue.locationSize*he*ne,ve)}}else if(q!==void 0){const me=q[se];if(me!==void 0)switch(me.length){case 2:i.vertexAttrib2fv(ue.location,me);break;case 3:i.vertexAttrib3fv(ue.location,me);break;case 4:i.vertexAttrib4fv(ue.location,me);break;default:i.vertexAttrib1fv(ue.location,me)}}}}y()}function T(){w();for(const U in n){const F=n[U];for(const k in F){const X=F[k];for(const B in X){const $=X[B];for(const q in $)u($[q].object),delete $[q];delete X[B]}}delete n[U]}}function b(U){if(n[U.id]===void 0)return;const F=n[U.id];for(const k in F){const X=F[k];for(const B in X){const $=X[B];for(const q in $)u($[q].object),delete $[q];delete X[B]}}delete n[U.id]}function C(U){for(const F in n){const k=n[F];for(const X in k){const B=k[X];if(B[U.id]===void 0)continue;const $=B[U.id];for(const q in $)u($[q].object),delete $[q];delete B[U.id]}}}function x(U){for(const F in n){const k=n[F],X=U.isInstancedMesh===!0?U.id:0,B=k[X];if(B!==void 0){for(const $ in B){const q=B[$];for(const se in q)u(q[se].object),delete q[se];delete B[$]}delete k[X],Object.keys(k).length===0&&delete n[F]}}}function w(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:w,resetDefaultState:D,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function gm(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,u){u!==0&&(i.drawArraysInstanced(n,o,l,u),t.update(l,n,u))}function c(o,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function _m(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Gn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const x=C===Mi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Rn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Hn&&!x)}function o(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=o(l);u!==l&&(tt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:M,maxSamples:T,samples:b}}function vm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new pi,c=new ot,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||s;return s=h,n=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const y=r?0:n,S=y*4;let M=p.clippingState||null;o.value=M,M=u(g,h,S,d);for(let T=0;T!==S;++T)M[T]=t[T];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const p=d+_*4,y=h.matrixWorldInverse;c.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,M=d;S!==_;++S,M+=4)a.copy(f[S]).applyMatrix4(y,c),a.normal.toArray(m,M),m[M+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Ni=4,Xc=[.125,.215,.35,.446,.526,.582],Zi=20,xm=256,ir=new Wl,qc=new lt;let _o=null,vo=0,xo=0,Mo=!1;const Mm=new L;class xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=Mm}=r;_o=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),xo=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_o,vo,xo),this._renderer.xr.enabled=Mo,e.scissorTest=!1,bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ji||e.mapping===Us?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_o=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),xo=this._renderer.getActiveMipmapLevel(),Mo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Mi,format:Gn,colorSpace:ga,depthBuffer:!1},s=Yc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ym(r)),this._blurMaterial=bm(r,e,t),this._ggxMaterial=Sm(r,e,t)}return s}_compileMaterial(e){const t=new Ue(new nn,e);this._renderer.compile(t,ir)}_sceneToCubeUV(e,t,n,s,r){const o=new An(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(qc),f.toneMapping=ni,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ue(new kt,new Fs({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(qc),p=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+u[S],r.y,r.z)):M===1?(o.up.set(0,0,l[S]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+u[S],r.z)):(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+u[S]));const T=this._cubeSize;bs(s,M*T,S>2?T:0,T,T),f.setRenderTarget(s),p&&f.render(_,o),f.render(e,o)}f.toneMapping=d,f.autoClear=h,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ji||e.mapping===Us;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;bs(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,ir)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=0+l*1.25,d=f*h,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Ni?n-g+Ni:0),p=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=d,o.mipInt.value=g-t,bs(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(c,ir),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,bs(e,m,p,3*_,2*_),s.setRenderTarget(e),s.render(c,ir)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&vt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Zi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Zi;m>Zi&&tt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zi}`);const p=[];let y=0;for(let C=0;C<Zi;++C){const x=C/_,w=Math.exp(-x*x/2);p.push(w),C===0?y+=w:C<m&&(y+=2*w)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=a==="latitudinal",c&&(h.poleAxis.value=c);const{_lodMax:S}=this;h.dTheta.value=g,h.mipInt.value=S-n;const M=this._sizeLods[s],T=3*M*(s>S-Ni?s-S+Ni:0),b=4*(this._cubeSize-M);bs(t,T,b,3*M,2*M),o.setRenderTarget(t),o.render(f,ir)}}function ym(i){const e=[],t=[],n=[];let s=i;const r=i-Ni+1+Xc.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-Ni?o=Xc[a-i+Ni-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*d),S=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let b=0;b<d;b++){const C=b%3*2/3-1,x=b>2?0:-1,w=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];y.set(w,_*g*b),S.set(h,m*g*b);const D=[b,b,b,b,b,b];M.set(D,p*g*b)}const T=new nn;T.setAttribute("position",new Nn(y,_)),T.setAttribute("uv",new Nn(S,m)),T.setAttribute("faceIndex",new Nn(M,p)),n.push(new Ue(T,null)),s>Ni&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Yc(i,e,t){const n=new ii(i,e,t);return n.texture.mapping=Pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Sm(i,e,t){return new oi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:xm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function bm(i,e,t){const n=new Float32Array(Zi),s=new L(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Zc(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Kc(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ia(){return`

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
	`}class ch extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Xu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new kt(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:zs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yn,blending:gi});r.uniforms.tEquirect.value=t;const a=new Ue(s,r),c=t.minFilter;return t.minFilter===Ki&&(t.minFilter=gn),new wd(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Em(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Ba||d===za)if(e.has(h)){const g=e.get(h).texture;return c(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const _=new ch(g.height);return _.fromEquirectangularTexture(i,h),e.set(h,_),h.addEventListener("dispose",l),c(_.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,g=d===Ba||d===za,_=d===ji||d===Us;if(g||_){let m=t.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new xl(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const y=h.image;return g&&y&&y.height>0||_&&y&&o(y)?(n===null&&(n=new xl(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function c(h,d){return d===Ba?h.mapping=ji:d===za&&(h.mapping=Us),h}function o(h){let d=0;const g=6;for(let _=0;_<g;_++)h[_]!==void 0&&d++;return d===g}function l(h){const d=h.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function wm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Ds("WebGLRenderer: "+n+" extension not supported."),s}}}function Tm(i,e,t,n){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const d=r.get(h);d&&(e.remove(d),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function c(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function o(f){const h=f.attributes;for(const d in h)e.update(h[d],i.ARRAY_BUFFER)}function l(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const y=d.array;_=d.version;for(let S=0,M=y.length;S<M;S+=3){const T=y[S+0],b=y[S+1],C=y[S+2];h.push(T,b,b,C,C,T)}}else{const y=g.array;_=g.version;for(let S=0,M=y.length/3-1;S<M;S+=3){const T=S+0,b=S+1,C=S+2;h.push(T,b,b,C,C,T)}}const m=new(g.count>=65535?Vu:ku)(h,1);m.version=_;const p=r.get(f);p&&e.remove(p),r.set(f,m)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return r.get(f)}return{get:c,update:o,getWireframeAttribute:u}}function Am(i,e,t){let n;function s(f){n=f}let r,a;function c(f){r=f.type,a=f.bytesPerElement}function o(f,h){i.drawElements(n,h,r,f*a),t.update(h,n,1)}function l(f,h,d){d!==0&&(i.drawElementsInstanced(n,h,r,f*a,d),t.update(h,n,d))}function u(f,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,d);let _=0;for(let m=0;m<d;m++)_+=h[m];t.update(_,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=u}function Rm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Cm(i,e,t){const n=new WeakMap,s=new Yt;function r(a,c,o){const l=a.morphTargetInfluences,u=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(c);if(h===void 0||h.count!==f){let w=function(){C.dispose(),n.delete(c),c.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const d=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],y=c.morphAttributes.color||[];let S=0;d===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let M=c.attributes.position.count*S,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const b=new Float32Array(M*T*4*f),C=new Ou(b,M,T,f);C.type=Hn,C.needsUpdate=!0;const x=S*4;for(let D=0;D<f;D++){const U=m[D],F=p[D],k=y[D],X=M*T*4*D;for(let B=0;B<U.count;B++){const $=B*x;d===!0&&(s.fromBufferAttribute(U,B),b[X+$+0]=s.x,b[X+$+1]=s.y,b[X+$+2]=s.z,b[X+$+3]=0),g===!0&&(s.fromBufferAttribute(F,B),b[X+$+4]=s.x,b[X+$+5]=s.y,b[X+$+6]=s.z,b[X+$+7]=0),_===!0&&(s.fromBufferAttribute(k,B),b[X+$+8]=s.x,b[X+$+9]=s.y,b[X+$+10]=s.z,b[X+$+11]=k.itemSize===4?s.w:1)}}h={count:f,texture:C,size:new j(M,T)},n.set(c,h),c.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=c.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Pm(i,e,t,n,s){let r=new WeakMap;function a(l){const u=s.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function c(){r=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:c}}const Dm={[bu]:"LINEAR_TONE_MAPPING",[Eu]:"REINHARD_TONE_MAPPING",[wu]:"CINEON_TONE_MAPPING",[wl]:"ACES_FILMIC_TONE_MAPPING",[Au]:"AGX_TONE_MAPPING",[Ru]:"NEUTRAL_TONE_MAPPING",[Tu]:"CUSTOM_TONE_MAPPING"};function Lm(i,e,t,n,s,r){const a=new ii(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Os(e,t):void 0}),c=new ii(e,t,{type:Mi,depthBuffer:!1,stencilBuffer:!1}),o=new nn;o.setAttribute("position",new xt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new xt([0,2,0,0,2,0],2));const l=new vd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Ue(o,l),f=new Wl(-1,1,1,-1,0,1);let h=null,d=null,g=!1,_,m=null,p=[],y=!1;this.setSize=function(S,M){a.setSize(S,M),c.setSize(S,M);for(let T=0;T<p.length;T++){const b=p[T];b.setSize&&b.setSize(S,M)}},this.setEffects=function(S){p=S,y=p.length>0&&p[0].isRenderPass===!0;const M=a.width,T=a.height;for(let b=0;b<p.length;b++){const C=p[b];C.setSize&&C.setSize(M,T)}},this.begin=function(S,M){if(g||S.toneMapping===ni&&p.length===0)return!1;if(m=M,M!==null){const T=M.width,b=M.height;(a.width!==T||a.height!==b)&&this.setSize(T,b)}return y===!1&&S.setRenderTarget(a),_=S.toneMapping,S.toneMapping=ni,!0},this.hasRenderPass=function(){return y},this.end=function(S,M){S.toneMapping=_,g=!0;let T=a,b=c;for(let C=0;C<p.length;C++){const x=p[C];if(x.enabled!==!1&&(x.render(S,b,T,M),x.needsSwap!==!1)){const w=T;T=b,b=w}}if(h!==S.outputColorSpace||d!==S.toneMapping){h=S.outputColorSpace,d=S.toneMapping,l.defines={},St.getTransfer(h)===Nt&&(l.defines.SRGB_TRANSFER="");const C=Dm[d];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,S.setRenderTarget(m),S.render(u,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const uh=new _n,Ml=new Os(1,1),hh=new Ou,fh=new gf,dh=new Xu,$c=[],Jc=[],jc=new Float32Array(16),Qc=new Float32Array(9),eu=new Float32Array(4);function Vs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=$c[s];if(r===void 0&&(r=new Float32Array(s),$c[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Na(i,e){let t=Jc[e];t===void 0&&(t=new Int32Array(e),Jc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Im(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function Um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function Fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function Om(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;eu.set(n),i.uniformMatrix2fv(this.addr,!1,eu),on(t,n)}}function Bm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;Qc.set(n),i.uniformMatrix3fv(this.addr,!1,Qc),on(t,n)}}function zm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;jc.set(n),i.uniformMatrix4fv(this.addr,!1,jc),on(t,n)}}function km(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function Hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function Gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function Wm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function Ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function Zm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ml.compareFunction=t.isReversedDepthBuffer()?Nl:Il,r=Ml):r=uh,t.setTexture2D(e||r,s)}function Km(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||fh,s)}function $m(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||dh,s)}function Jm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||hh,s)}function jm(i){switch(i){case 5126:return Im;case 35664:return Nm;case 35665:return Um;case 35666:return Fm;case 35674:return Om;case 35675:return Bm;case 35676:return zm;case 5124:case 35670:return km;case 35667:case 35671:return Vm;case 35668:case 35672:return Hm;case 35669:case 35673:return Gm;case 5125:return Wm;case 36294:return Xm;case 36295:return qm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return Zm;case 35679:case 36299:case 36307:return Km;case 35680:case 36300:case 36308:case 36293:return $m;case 36289:case 36303:case 36311:case 36292:return Jm}}function Qm(i,e){i.uniform1fv(this.addr,e)}function eg(i,e){const t=Vs(e,this.size,2);i.uniform2fv(this.addr,t)}function tg(i,e){const t=Vs(e,this.size,3);i.uniform3fv(this.addr,t)}function ng(i,e){const t=Vs(e,this.size,4);i.uniform4fv(this.addr,t)}function ig(i,e){const t=Vs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function sg(i,e){const t=Vs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function rg(i,e){const t=Vs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ag(i,e){i.uniform1iv(this.addr,e)}function og(i,e){i.uniform2iv(this.addr,e)}function lg(i,e){i.uniform3iv(this.addr,e)}function cg(i,e){i.uniform4iv(this.addr,e)}function ug(i,e){i.uniform1uiv(this.addr,e)}function hg(i,e){i.uniform2uiv(this.addr,e)}function fg(i,e){i.uniform3uiv(this.addr,e)}function dg(i,e){i.uniform4uiv(this.addr,e)}function pg(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ml:a=uh;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function mg(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||fh,r[a])}function gg(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||dh,r[a])}function _g(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hh,r[a])}function vg(i){switch(i){case 5126:return Qm;case 35664:return eg;case 35665:return tg;case 35666:return ng;case 35674:return ig;case 35675:return sg;case 35676:return rg;case 5124:case 35670:return ag;case 35667:case 35671:return og;case 35668:case 35672:return lg;case 35669:case 35673:return cg;case 5125:return ug;case 36294:return hg;case 36295:return fg;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return pg;case 35679:case 36299:case 36307:return mg;case 35680:case 36300:case 36308:case 36293:return gg;case 36289:case 36303:case 36311:case 36292:return _g}}class xg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jm(t.type)}}class Mg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vg(t.type)}}class yg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const yo=/(\w+)(\])?(\[|\.)?/g;function tu(i,e){i.seq.push(e),i.map[e.id]=e}function Sg(i,e,t){const n=i.name,s=n.length;for(yo.lastIndex=0;;){const r=yo.exec(n),a=yo.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){tu(t,l===void 0?new xg(c,i,e):new Mg(c,i,e));break}else{let f=t.map[c];f===void 0&&(f=new yg(c),tu(t,f)),t=f}}}class fa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);Sg(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function nu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const bg=37297;let Eg=0;function wg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const iu=new ot;function Tg(i){St._getMatrix(iu,St.workingColorSpace,i);const e=`mat3( ${iu.elements.map(t=>t.toFixed(4))} )`;switch(St.getTransfer(i)){case _a:return[e,"LinearTransferOETF"];case Nt:return[e,"sRGBTransferOETF"];default:return tt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function su(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+wg(i.getShaderSource(e),c)}else return r}function Ag(i,e){const t=Tg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Rg={[bu]:"Linear",[Eu]:"Reinhard",[wu]:"Cineon",[wl]:"ACESFilmic",[Au]:"AgX",[Ru]:"Neutral",[Tu]:"Custom"};function Cg(i,e){const t=Rg[e];return t===void 0?(tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const na=new L;function Pg(){St.getLuminanceCoefficients(na);const i=na.x.toFixed(4),e=na.y.toFixed(4),t=na.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cr).join(`
`)}function Lg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ig(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function cr(i){return i!==""}function ru(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function au(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ng=/^[ \t]*#include +<([\w\d./]+)>/gm;function yl(i){return i.replace(Ng,Fg)}const Ug=new Map;function Fg(i,e){let t=ft[e];if(t===void 0){const n=Ug.get(e);if(n!==void 0)t=ft[n],tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return yl(t)}const Og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ou(i){return i.replace(Og,Bg)}function Bg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const zg={[ur]:"SHADOWMAP_TYPE_PCF",[ar]:"SHADOWMAP_TYPE_VSM"};function kg(i){return zg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Vg={[ji]:"ENVMAP_TYPE_CUBE",[Us]:"ENVMAP_TYPE_CUBE",[Pa]:"ENVMAP_TYPE_CUBE_UV"};function Hg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Vg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Gg={[Us]:"ENVMAP_MODE_REFRACTION"};function Wg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Gg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Xg={[El]:"ENVMAP_BLENDING_MULTIPLY",[Yh]:"ENVMAP_BLENDING_MIX",[Zh]:"ENVMAP_BLENDING_ADD"};function qg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Xg[i.combine]||"ENVMAP_BLENDING_NONE"}function Yg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Zg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=kg(t),l=Hg(t),u=Wg(t),f=qg(t),h=Yg(t),d=Dg(t),g=Lg(r),_=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cr).join(`
`),p.length>0&&(p+=`
`)):(m=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cr).join(`
`),p=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?ft.tonemapping_pars_fragment:"",t.toneMapping!==ni?Cg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,Ag("linearToOutputTexel",t.outputColorSpace),Pg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cr).join(`
`)),a=yl(a),a=ru(a,t),a=au(a,t),c=yl(c),c=ru(c,t),c=au(c,t),a=ou(a),c=ou(c),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=y+m+a,M=y+p+c,T=nu(s,s.VERTEX_SHADER,S),b=nu(s,s.FRAGMENT_SHADER,M);s.attachShader(_,T),s.attachShader(_,b),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(U){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(T)||"",X=s.getShaderInfoLog(b)||"",B=F.trim(),$=k.trim(),q=X.trim();let se=!0,ue=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(se=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,b);else{const ge=su(s,T,"vertex"),me=su(s,b,"fragment");vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+ge+`
`+me)}else B!==""?tt("WebGLProgram: Program Info Log:",B):($===""||q==="")&&(ue=!1);ue&&(U.diagnostics={runnable:se,programLog:B,vertexShader:{log:$,prefix:m},fragmentShader:{log:q,prefix:p}})}s.deleteShader(T),s.deleteShader(b),x=new fa(s,_),w=Ig(s,_)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,bg)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Eg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=b,this}let Kg=0;class $g{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Jg(e),t.set(e,n)),n}}class Jg{constructor(e){this.id=Kg++,this.code=e,this.usedTimes=0}}function jg(i){return i===Qi||i===da||i===pa}function Qg(i,e,t,n,s,r){const a=new Fl,c=new $g,o=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer;let h=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return o.add(x),x===0?"uv":`uv${x}`}function _(x,w,D,U,F,k){const X=U.fog,B=F.geometry,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,se=e.get(x.envMap||$,q),ue=se&&se.mapping===Pa?se.image.height:null,ge=d[x.type];x.precision!==null&&(h=n.getMaxPrecision(x.precision),h!==x.precision&&tt("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const me=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_e=me!==void 0?me.length:0;let Ze=0;B.morphAttributes.position!==void 0&&(Ze=1),B.morphAttributes.normal!==void 0&&(Ze=2),B.morphAttributes.color!==void 0&&(Ze=3);let gt,je,ne,ve;if(ge){const Fe=Qn[ge];gt=Fe.vertexShader,je=Fe.fragmentShader}else{gt=x.vertexShader,je=x.fragmentShader;const Fe=c.getVertexShaderStage(x),Ft=c.getFragmentShaderStage(x);c.update(x,Fe,Ft),ne=Fe.id,ve=Ft.id}const he=i.getRenderTarget(),Ne=i.state.buffers.depth.getReversed(),Ke=F.isInstancedMesh===!0,Ve=F.isBatchedMesh===!0,_t=!!x.map,Qe=!!x.matcap,le=!!se,fe=!!x.aoMap,de=!!x.lightMap,we=!!x.bumpMap&&x.wireframe===!1,Me=!!x.normalMap,Ye=!!x.displacementMap,Be=!!x.emissiveMap,et=!!x.metalnessMap,nt=!!x.roughnessMap,O=x.anisotropy>0,bt=x.clearcoat>0,dt=x.dispersion>0,R=x.iridescence>0,v=x.sheen>0,W=x.transmission>0,Z=O&&!!x.anisotropyMap,te=bt&&!!x.clearcoatMap,ae=bt&&!!x.clearcoatNormalMap,xe=bt&&!!x.clearcoatRoughnessMap,ee=R&&!!x.iridescenceMap,re=R&&!!x.iridescenceThicknessMap,Ee=v&&!!x.sheenColorMap,He=v&&!!x.sheenRoughnessMap,Te=!!x.specularMap,Se=!!x.specularColorMap,ze=!!x.specularIntensityMap,$e=W&&!!x.transmissionMap,rt=W&&!!x.thicknessMap,z=!!x.gradientMap,ye=!!x.alphaMap,ie=x.alphaTest>0,be=!!x.alphaHash,Ce=!!x.extensions;let ce=ni;x.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(ce=i.toneMapping);const ke={shaderID:ge,shaderType:x.type,shaderName:x.name,vertexShader:gt,fragmentShader:je,defines:x.defines,customVertexShaderID:ne,customFragmentShaderID:ve,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Ve,batchingColor:Ve&&F._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&F.instanceColor!==null,instancingMorph:Ke&&F.morphTexture!==null,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:St.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:_t,matcap:Qe,envMap:le,envMapMode:le&&se.mapping,envMapCubeUVHeight:ue,aoMap:fe,lightMap:de,bumpMap:we,normalMap:Me,displacementMap:Ye,emissiveMap:Be,normalMapObjectSpace:Me&&x.normalMapType===Jh,normalMapTangentSpace:Me&&x.normalMapType===ma,packedNormalMap:Me&&x.normalMapType===ma&&jg(x.normalMap.format),metalnessMap:et,roughnessMap:nt,anisotropy:O,anisotropyMap:Z,clearcoat:bt,clearcoatMap:te,clearcoatNormalMap:ae,clearcoatRoughnessMap:xe,dispersion:dt,iridescence:R,iridescenceMap:ee,iridescenceThicknessMap:re,sheen:v,sheenColorMap:Ee,sheenRoughnessMap:He,specularMap:Te,specularColorMap:Se,specularIntensityMap:ze,transmission:W,transmissionMap:$e,thicknessMap:rt,gradientMap:z,opaque:x.transparent===!1&&x.blending===Ps&&x.alphaToCoverage===!1,alphaMap:ye,alphaTest:ie,alphaHash:be,combine:x.combine,mapUv:_t&&g(x.map.channel),aoMapUv:fe&&g(x.aoMap.channel),lightMapUv:de&&g(x.lightMap.channel),bumpMapUv:we&&g(x.bumpMap.channel),normalMapUv:Me&&g(x.normalMap.channel),displacementMapUv:Ye&&g(x.displacementMap.channel),emissiveMapUv:Be&&g(x.emissiveMap.channel),metalnessMapUv:et&&g(x.metalnessMap.channel),roughnessMapUv:nt&&g(x.roughnessMap.channel),anisotropyMapUv:Z&&g(x.anisotropyMap.channel),clearcoatMapUv:te&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ae&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:He&&g(x.sheenRoughnessMap.channel),specularMapUv:Te&&g(x.specularMap.channel),specularColorMapUv:Se&&g(x.specularColorMap.channel),specularIntensityMapUv:ze&&g(x.specularIntensityMap.channel),transmissionMapUv:$e&&g(x.transmissionMap.channel),thicknessMapUv:rt&&g(x.thicknessMap.channel),alphaMapUv:ye&&g(x.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||O),vertexNormals:!!B.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(_t||ye),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Ne,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Ze,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ce,decodeVideoTexture:_t&&x.map.isVideoTexture===!0&&St.getTransfer(x.map.colorSpace)===Nt,decodeVideoTextureEmissive:Be&&x.emissiveMap.isVideoTexture===!0&&St.getTransfer(x.emissiveMap.colorSpace)===Nt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===$t,flipSided:x.side===yn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ce&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&x.extensions.multiDraw===!0||Ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ke.vertexUv1s=o.has(1),ke.vertexUv2s=o.has(2),ke.vertexUv3s=o.has(3),o.clear(),ke}function m(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)w.push(D),w.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(p(w,x),y(w,x),w.push(i.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function p(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function y(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function S(x){const w=d[x.type];let D;if(w){const U=Qn[w];D=md.clone(U.uniforms)}else D=x.uniforms;return D}function M(x,w){let D=u.get(w);return D!==void 0?++D.usedTimes:(D=new Zg(i,w,x,s),l.push(D),u.set(w,D)),D}function T(x){if(--x.usedTimes===0){const w=l.indexOf(x);l[w]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function b(x){c.remove(x)}function C(){c.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:S,acquireProgram:M,releaseProgram:T,releaseShaderCache:b,programs:l,dispose:C}}function e_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function t_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function cu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function uu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function c(h,d,g,_,m,p){let y=i[e];return y===void 0?(y={id:h.id,object:h,geometry:d,material:g,materialVariant:a(h),groupOrder:_,renderOrder:h.renderOrder,z:m,group:p},i[e]=y):(y.id=h.id,y.object=h,y.geometry=d,y.material=g,y.materialVariant=a(h),y.groupOrder=_,y.renderOrder=h.renderOrder,y.z=m,y.group=p),e++,y}function o(h,d,g,_,m,p){const y=c(h,d,g,_,m,p);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):t.push(y)}function l(h,d,g,_,m,p){const y=c(h,d,g,_,m,p);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):t.unshift(y)}function u(h,d,g){t.length>1&&t.sort(h||t_),n.length>1&&n.sort(d||cu),s.length>1&&s.sort(d||cu),g&&(t.reverse(),n.reverse(),s.reverse())}function f(){for(let h=e,d=i.length;h<d;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:f,sort:u}}function n_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new uu,i.set(n,[a])):s>=r.length?(a=new uu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function i_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new lt};break;case"SpotLight":t={position:new L,direction:new L,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function s_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let r_=0;function a_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function o_(i){const e=new i_,t=s_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new Ut,a=new Ut;function c(l){let u=0,f=0,h=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,y=0,S=0,M=0,T=0,b=0,C=0;l.sort(a_);for(let w=0,D=l.length;w<D;w++){const U=l[w],F=U.color,k=U.intensity,X=U.distance;let B=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Qi?B=U.shadow.map.texture:B=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)u+=F.r*k,f+=F.g*k,h+=F.b*k;else if(U.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(U.sh.coefficients[$],k);C++}else if(U.isDirectionalLight){const $=e.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const q=U.shadow,se=t.get(U);se.shadowIntensity=q.intensity,se.shadowBias=q.bias,se.shadowNormalBias=q.normalBias,se.shadowRadius=q.radius,se.shadowMapSize=q.mapSize,n.directionalShadow[d]=se,n.directionalShadowMap[d]=B,n.directionalShadowMatrix[d]=U.shadow.matrix,y++}n.directional[d]=$,d++}else if(U.isSpotLight){const $=e.get(U);$.position.setFromMatrixPosition(U.matrixWorld),$.color.copy(F).multiplyScalar(k),$.distance=X,$.coneCos=Math.cos(U.angle),$.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),$.decay=U.decay,n.spot[_]=$;const q=U.shadow;if(U.map&&(n.spotLightMap[T]=U.map,T++,q.updateMatrices(U),U.castShadow&&b++),n.spotLightMatrix[_]=q.matrix,U.castShadow){const se=t.get(U);se.shadowIntensity=q.intensity,se.shadowBias=q.bias,se.shadowNormalBias=q.normalBias,se.shadowRadius=q.radius,se.shadowMapSize=q.mapSize,n.spotShadow[_]=se,n.spotShadowMap[_]=B,M++}_++}else if(U.isRectAreaLight){const $=e.get(U);$.color.copy(F).multiplyScalar(k),$.halfWidth.set(U.width*.5,0,0),$.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=$,m++}else if(U.isPointLight){const $=e.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),$.distance=U.distance,$.decay=U.decay,U.castShadow){const q=U.shadow,se=t.get(U);se.shadowIntensity=q.intensity,se.shadowBias=q.bias,se.shadowNormalBias=q.normalBias,se.shadowRadius=q.radius,se.shadowMapSize=q.mapSize,se.shadowCameraNear=q.camera.near,se.shadowCameraFar=q.camera.far,n.pointShadow[g]=se,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=U.shadow.matrix,S++}n.point[g]=$,g++}else if(U.isHemisphereLight){const $=e.get(U);$.skyColor.copy(U.color).multiplyScalar(k),$.groundColor.copy(U.groundColor).multiplyScalar(k),n.hemi[p]=$,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const x=n.hash;(x.directionalLength!==d||x.pointLength!==g||x.spotLength!==_||x.rectAreaLength!==m||x.hemiLength!==p||x.numDirectionalShadows!==y||x.numPointShadows!==S||x.numSpotShadows!==M||x.numSpotMaps!==T||x.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=M+T-b,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=C,x.directionalLength=d,x.pointLength=g,x.spotLength=_,x.rectAreaLength=m,x.hemiLength=p,x.numDirectionalShadows=y,x.numPointShadows=S,x.numSpotShadows=M,x.numSpotMaps=T,x.numLightProbes=C,n.version=r_++)}function o(l,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const S=l[p];if(S.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(S.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const M=n.point[h];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:c,setupView:o,state:n}}function hu(i){const e=new o_(i),t=[],n=[],s=[];function r(h){f.camera=h,t.length=0,n.length=0,s.length=0}function a(h){t.push(h)}function c(h){n.push(h)}function o(h){s.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function l_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new hu(i),e.set(s,[c])):r>=a.length?(c=new hu(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const c_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,u_=`uniform sampler2D shadow_pass;
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
}`,h_=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],f_=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],fu=new Ut,sr=new L,So=new L;function d_(i,e,t){let n=new Ol;const s=new j,r=new j,a=new Yt,c=new Md,o=new yd,l={},u=t.maxTextureSize,f={[Ui]:yn,[yn]:Ui,[$t]:$t},h=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new j},radius:{value:4}},vertexShader:c_,fragmentShader:u_}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new nn;g.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ue(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ur;let p=this.type;this.render=function(b,C,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===Rh&&(tt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ur);const w=i.getRenderTarget(),D=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),F=i.state;F.setBlending(gi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const k=p!==this.type;k&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(B=>B.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,B=b.length;X<B;X++){const $=b[X],q=$.shadow;if(q===void 0){tt("WebGLShadowMap:",$,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const se=q.getFrameExtents();s.multiply(se),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/se.x),s.x=r.x*se.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/se.y),s.y=r.y*se.y,q.mapSize.y=r.y));const ue=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=ue,q.map===null||k===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===ar){if($.isPointLight){tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new ii(s.x,s.y,{format:Qi,type:Mi,minFilter:gn,magFilter:gn,generateMipmaps:!1}),q.map.texture.name=$.name+".shadowMap",q.map.depthTexture=new Os(s.x,s.y,Hn),q.map.depthTexture.name=$.name+".shadowMapDepth",q.map.depthTexture.format=yi,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=hn,q.map.depthTexture.magFilter=hn}else $.isPointLight?(q.map=new ch(s.x),q.map.depthTexture=new Ff(s.x,ri)):(q.map=new ii(s.x,s.y),q.map.depthTexture=new Os(s.x,s.y,ri)),q.map.depthTexture.name=$.name+".shadowMap",q.map.depthTexture.format=yi,this.type===ur?(q.map.depthTexture.compareFunction=ue?Nl:Il,q.map.depthTexture.minFilter=gn,q.map.depthTexture.magFilter=gn):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=hn,q.map.depthTexture.magFilter=hn);q.camera.updateProjectionMatrix()}const ge=q.map.isWebGLCubeRenderTarget?6:1;for(let me=0;me<ge;me++){if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,me),i.clear();else{me===0&&(i.setRenderTarget(q.map),i.clear());const _e=q.getViewport(me);a.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),F.viewport(a)}if($.isPointLight){const _e=q.camera,Ze=q.matrix,gt=$.distance||_e.far;gt!==_e.far&&(_e.far=gt,_e.updateProjectionMatrix()),sr.setFromMatrixPosition($.matrixWorld),_e.position.copy(sr),So.copy(_e.position),So.add(h_[me]),_e.up.copy(f_[me]),_e.lookAt(So),_e.updateMatrixWorld(),Ze.makeTranslation(-sr.x,-sr.y,-sr.z),fu.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),q._frustum.setFromProjectionMatrix(fu,_e.coordinateSystem,_e.reversedDepth)}else q.updateMatrices($);n=q.getFrustum(),M(C,x,q.camera,$,this.type)}q.isPointLightShadow!==!0&&this.type===ar&&y(q,x),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,D,U)};function y(b,C){const x=e.update(_);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ii(s.x,s.y,{format:Qi,type:Mi})),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(C,null,x,h,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(C,null,x,d,_,null)}function S(b,C,x,w){let D=null;const U=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(U!==void 0)D=U;else if(D=x.isPointLight===!0?o:c,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=D.uuid,k=C.uuid;let X=l[F];X===void 0&&(X={},l[F]=X);let B=X[k];B===void 0&&(B=D.clone(),X[k]=B,C.addEventListener("dispose",T)),D=B}if(D.visible=C.visible,D.wireframe=C.wireframe,w===ar?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:f[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const F=i.properties.get(D);F.light=x}return D}function M(b,C,x,w,D){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&D===ar)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const k=e.update(b),X=b.material;if(Array.isArray(X)){const B=k.groups;for(let $=0,q=B.length;$<q;$++){const se=B[$],ue=X[se.materialIndex];if(ue&&ue.visible){const ge=S(b,ue,w,D);b.onBeforeShadow(i,b,C,x,k,ge,se),i.renderBufferDirect(x,null,k,ge,b,se),b.onAfterShadow(i,b,C,x,k,ge,se)}}}else if(X.visible){const B=S(b,X,w,D);b.onBeforeShadow(i,b,C,x,k,B,null),i.renderBufferDirect(x,null,k,B,b,null),b.onAfterShadow(i,b,C,x,k,B,null)}}const F=b.children;for(let k=0,X=F.length;k<X;k++)M(F[k],C,x,w,D)}function T(b){b.target.removeEventListener("dispose",T);for(const x in l){const w=l[x],D=b.target.uuid;D in w&&(w[D].dispose(),delete w[D])}}}function p_(i,e){function t(){let z=!1;const ye=new Yt;let ie=null;const be=new Yt(0,0,0,0);return{setMask:function(Ce){ie!==Ce&&!z&&(i.colorMask(Ce,Ce,Ce,Ce),ie=Ce)},setLocked:function(Ce){z=Ce},setClear:function(Ce,ce,ke,Fe,Ft){Ft===!0&&(Ce*=Fe,ce*=Fe,ke*=Fe),ye.set(Ce,ce,ke,Fe),be.equals(ye)===!1&&(i.clearColor(Ce,ce,ke,Fe),be.copy(ye))},reset:function(){z=!1,ie=null,be.set(-1,0,0,0)}}}function n(){let z=!1,ye=!1,ie=null,be=null,Ce=null;return{setReversed:function(ce){if(ye!==ce){const ke=e.get("EXT_clip_control");ce?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),ye=ce;const Fe=Ce;Ce=null,this.setClear(Fe)}},getReversed:function(){return ye},setTest:function(ce){ce?he(i.DEPTH_TEST):Ne(i.DEPTH_TEST)},setMask:function(ce){ie!==ce&&!z&&(i.depthMask(ce),ie=ce)},setFunc:function(ce){if(ye&&(ce=lf[ce]),be!==ce){switch(ce){case Po:i.depthFunc(i.NEVER);break;case Do:i.depthFunc(i.ALWAYS);break;case Lo:i.depthFunc(i.LESS);break;case Ns:i.depthFunc(i.LEQUAL);break;case Io:i.depthFunc(i.EQUAL);break;case No:i.depthFunc(i.GEQUAL);break;case Uo:i.depthFunc(i.GREATER);break;case Fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=ce}},setLocked:function(ce){z=ce},setClear:function(ce){Ce!==ce&&(Ce=ce,ye&&(ce=1-ce),i.clearDepth(ce))},reset:function(){z=!1,ie=null,be=null,Ce=null,ye=!1}}}function s(){let z=!1,ye=null,ie=null,be=null,Ce=null,ce=null,ke=null,Fe=null,Ft=null;return{setTest:function(Rt){z||(Rt?he(i.STENCIL_TEST):Ne(i.STENCIL_TEST))},setMask:function(Rt){ye!==Rt&&!z&&(i.stencilMask(Rt),ye=Rt)},setFunc:function(Rt,Cn,fn){(ie!==Rt||be!==Cn||Ce!==fn)&&(i.stencilFunc(Rt,Cn,fn),ie=Rt,be=Cn,Ce=fn)},setOp:function(Rt,Cn,fn){(ce!==Rt||ke!==Cn||Fe!==fn)&&(i.stencilOp(Rt,Cn,fn),ce=Rt,ke=Cn,Fe=fn)},setLocked:function(Rt){z=Rt},setClear:function(Rt){Ft!==Rt&&(i.clearStencil(Rt),Ft=Rt)},reset:function(){z=!1,ye=null,ie=null,be=null,Ce=null,ce=null,ke=null,Fe=null,Ft=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let u={},f={},h={},d=new WeakMap,g=[],_=null,m=!1,p=null,y=null,S=null,M=null,T=null,b=null,C=null,x=new lt(0,0,0),w=0,D=!1,U=null,F=null,k=null,X=null,B=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,se=0;const ue=i.getParameter(i.VERSION);ue.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(ue)[1]),q=se>=1):ue.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),q=se>=2);let ge=null,me={};const _e=i.getParameter(i.SCISSOR_BOX),Ze=i.getParameter(i.VIEWPORT),gt=new Yt().fromArray(_e),je=new Yt().fromArray(Ze);function ne(z,ye,ie,be){const Ce=new Uint8Array(4),ce=i.createTexture();i.bindTexture(z,ce),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<ie;ke++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,Ce):i.texImage2D(ye+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ce);return ce}const ve={};ve[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),ve[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ve[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),he(i.DEPTH_TEST),a.setFunc(Ns),we(!1),Me(ec),he(i.CULL_FACE),fe(gi);function he(z){u[z]!==!0&&(i.enable(z),u[z]=!0)}function Ne(z){u[z]!==!1&&(i.disable(z),u[z]=!1)}function Ke(z,ye){return h[z]!==ye?(i.bindFramebuffer(z,ye),h[z]=ye,z===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ye),z===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function Ve(z,ye){let ie=g,be=!1;if(z){ie=d.get(ye),ie===void 0&&(ie=[],d.set(ye,ie));const Ce=z.textures;if(ie.length!==Ce.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,ke=Ce.length;ce<ke;ce++)ie[ce]=i.COLOR_ATTACHMENT0+ce;ie.length=Ce.length,be=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,be=!0);be&&i.drawBuffers(ie)}function _t(z){return _!==z?(i.useProgram(z),_=z,!0):!1}const Qe={[qi]:i.FUNC_ADD,[Ph]:i.FUNC_SUBTRACT,[Dh]:i.FUNC_REVERSE_SUBTRACT};Qe[Lh]=i.MIN,Qe[Ih]=i.MAX;const le={[Nh]:i.ZERO,[Uh]:i.ONE,[Fh]:i.SRC_COLOR,[Ro]:i.SRC_ALPHA,[Hh]:i.SRC_ALPHA_SATURATE,[kh]:i.DST_COLOR,[Bh]:i.DST_ALPHA,[Oh]:i.ONE_MINUS_SRC_COLOR,[Co]:i.ONE_MINUS_SRC_ALPHA,[Vh]:i.ONE_MINUS_DST_COLOR,[zh]:i.ONE_MINUS_DST_ALPHA,[Gh]:i.CONSTANT_COLOR,[Wh]:i.ONE_MINUS_CONSTANT_COLOR,[Xh]:i.CONSTANT_ALPHA,[qh]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(z,ye,ie,be,Ce,ce,ke,Fe,Ft,Rt){if(z===gi){m===!0&&(Ne(i.BLEND),m=!1);return}if(m===!1&&(he(i.BLEND),m=!0),z!==Ch){if(z!==p||Rt!==D){if((y!==qi||T!==qi)&&(i.blendEquation(i.FUNC_ADD),y=qi,T=qi),Rt)switch(z){case Ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tc:i.blendFunc(i.ONE,i.ONE);break;case nc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ic:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:vt("WebGLState: Invalid blending: ",z);break}else switch(z){case Ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nc:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ic:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",z);break}S=null,M=null,b=null,C=null,x.set(0,0,0),w=0,p=z,D=Rt}return}Ce=Ce||ye,ce=ce||ie,ke=ke||be,(ye!==y||Ce!==T)&&(i.blendEquationSeparate(Qe[ye],Qe[Ce]),y=ye,T=Ce),(ie!==S||be!==M||ce!==b||ke!==C)&&(i.blendFuncSeparate(le[ie],le[be],le[ce],le[ke]),S=ie,M=be,b=ce,C=ke),(Fe.equals(x)===!1||Ft!==w)&&(i.blendColor(Fe.r,Fe.g,Fe.b,Ft),x.copy(Fe),w=Ft),p=z,D=!1}function de(z,ye){z.side===$t?Ne(i.CULL_FACE):he(i.CULL_FACE);let ie=z.side===yn;ye&&(ie=!ie),we(ie),z.blending===Ps&&z.transparent===!1?fe(gi):fe(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);const be=z.stencilWrite;c.setTest(be),be&&(c.setMask(z.stencilWriteMask),c.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),c.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Be(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):Ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function we(z){U!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),U=z)}function Me(z){z!==Th?(he(i.CULL_FACE),z!==F&&(z===ec?i.cullFace(i.BACK):z===Ah?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ne(i.CULL_FACE),F=z}function Ye(z){z!==k&&(q&&i.lineWidth(z),k=z)}function Be(z,ye,ie){z?(he(i.POLYGON_OFFSET_FILL),(X!==ye||B!==ie)&&(X=ye,B=ie,a.getReversed()&&(ye=-ye),i.polygonOffset(ye,ie))):Ne(i.POLYGON_OFFSET_FILL)}function et(z){z?he(i.SCISSOR_TEST):Ne(i.SCISSOR_TEST)}function nt(z){z===void 0&&(z=i.TEXTURE0+$-1),ge!==z&&(i.activeTexture(z),ge=z)}function O(z,ye,ie){ie===void 0&&(ge===null?ie=i.TEXTURE0+$-1:ie=ge);let be=me[ie];be===void 0&&(be={type:void 0,texture:void 0},me[ie]=be),(be.type!==z||be.texture!==ye)&&(ge!==ie&&(i.activeTexture(ie),ge=ie),i.bindTexture(z,ye||ve[z]),be.type=z,be.texture=ye)}function bt(){const z=me[ge];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function dt(){try{i.compressedTexImage2D(...arguments)}catch(z){vt("WebGLState:",z)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(z){vt("WebGLState:",z)}}function v(){try{i.texSubImage2D(...arguments)}catch(z){vt("WebGLState:",z)}}function W(){try{i.texSubImage3D(...arguments)}catch(z){vt("WebGLState:",z)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(z){vt("WebGLState:",z)}}function te(){try{i.compressedTexSubImage3D(...arguments)}catch(z){vt("WebGLState:",z)}}function ae(){try{i.texStorage2D(...arguments)}catch(z){vt("WebGLState:",z)}}function xe(){try{i.texStorage3D(...arguments)}catch(z){vt("WebGLState:",z)}}function ee(){try{i.texImage2D(...arguments)}catch(z){vt("WebGLState:",z)}}function re(){try{i.texImage3D(...arguments)}catch(z){vt("WebGLState:",z)}}function Ee(z){return f[z]!==void 0?f[z]:i.getParameter(z)}function He(z,ye){f[z]!==ye&&(i.pixelStorei(z,ye),f[z]=ye)}function Te(z){gt.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),gt.copy(z))}function Se(z){je.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),je.copy(z))}function ze(z,ye){let ie=l.get(ye);ie===void 0&&(ie=new WeakMap,l.set(ye,ie));let be=ie.get(z);be===void 0&&(be=i.getUniformBlockIndex(ye,z.name),ie.set(z,be))}function $e(z,ye){const be=l.get(ye).get(z);o.get(ye)!==be&&(i.uniformBlockBinding(ye,be,z.__bindingPointIndex),o.set(ye,be))}function rt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},ge=null,me={},h={},d=new WeakMap,g=[],_=null,m=!1,p=null,y=null,S=null,M=null,T=null,b=null,C=null,x=new lt(0,0,0),w=0,D=!1,U=null,F=null,k=null,X=null,B=null,gt.set(0,0,i.canvas.width,i.canvas.height),je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:he,disable:Ne,bindFramebuffer:Ke,drawBuffers:Ve,useProgram:_t,setBlending:fe,setMaterial:de,setFlipSided:we,setCullFace:Me,setLineWidth:Ye,setPolygonOffset:Be,setScissorTest:et,activeTexture:nt,bindTexture:O,unbindTexture:bt,compressedTexImage2D:dt,compressedTexImage3D:R,texImage2D:ee,texImage3D:re,pixelStorei:He,getParameter:Ee,updateUBOMapping:ze,uniformBlockBinding:$e,texStorage2D:ae,texStorage3D:xe,texSubImage2D:v,texSubImage3D:W,compressedTexSubImage2D:Z,compressedTexSubImage3D:te,scissor:Te,viewport:Se,reset:rt}}function m_(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new j,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,v){return g?new OffscreenCanvas(R,v):va("canvas")}function m(R,v,W){let Z=1;const te=dt(R);if((te.width>W||te.height>W)&&(Z=W/Math.max(te.width,te.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ae=Math.floor(Z*te.width),xe=Math.floor(Z*te.height);h===void 0&&(h=_(ae,xe));const ee=v?_(ae,xe):h;return ee.width=ae,ee.height=xe,ee.getContext("2d").drawImage(R,0,0,ae,xe),tt("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ae+"x"+xe+")."),ee}else return"data"in R&&tt("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function p(R){return R.generateMipmaps}function y(R){i.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,v,W,Z,te,ae=!1){if(R!==null){if(i[R]!==void 0)return i[R];tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let xe;Z&&(xe=e.get("EXT_texture_norm16"),xe||tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=v;if(v===i.RED&&(W===i.FLOAT&&(ee=i.R32F),W===i.HALF_FLOAT&&(ee=i.R16F),W===i.UNSIGNED_BYTE&&(ee=i.R8),W===i.UNSIGNED_SHORT&&xe&&(ee=xe.R16_EXT),W===i.SHORT&&xe&&(ee=xe.R16_SNORM_EXT)),v===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(ee=i.R8UI),W===i.UNSIGNED_SHORT&&(ee=i.R16UI),W===i.UNSIGNED_INT&&(ee=i.R32UI),W===i.BYTE&&(ee=i.R8I),W===i.SHORT&&(ee=i.R16I),W===i.INT&&(ee=i.R32I)),v===i.RG&&(W===i.FLOAT&&(ee=i.RG32F),W===i.HALF_FLOAT&&(ee=i.RG16F),W===i.UNSIGNED_BYTE&&(ee=i.RG8),W===i.UNSIGNED_SHORT&&xe&&(ee=xe.RG16_EXT),W===i.SHORT&&xe&&(ee=xe.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(ee=i.RG8UI),W===i.UNSIGNED_SHORT&&(ee=i.RG16UI),W===i.UNSIGNED_INT&&(ee=i.RG32UI),W===i.BYTE&&(ee=i.RG8I),W===i.SHORT&&(ee=i.RG16I),W===i.INT&&(ee=i.RG32I)),v===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),W===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),W===i.UNSIGNED_INT&&(ee=i.RGB32UI),W===i.BYTE&&(ee=i.RGB8I),W===i.SHORT&&(ee=i.RGB16I),W===i.INT&&(ee=i.RGB32I)),v===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),W===i.UNSIGNED_INT&&(ee=i.RGBA32UI),W===i.BYTE&&(ee=i.RGBA8I),W===i.SHORT&&(ee=i.RGBA16I),W===i.INT&&(ee=i.RGBA32I)),v===i.RGB&&(W===i.UNSIGNED_SHORT&&xe&&(ee=xe.RGB16_EXT),W===i.SHORT&&xe&&(ee=xe.RGB16_SNORM_EXT),W===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(ee=i.R11F_G11F_B10F)),v===i.RGBA){const re=ae?_a:St.getTransfer(te);W===i.FLOAT&&(ee=i.RGBA32F),W===i.HALF_FLOAT&&(ee=i.RGBA16F),W===i.UNSIGNED_BYTE&&(ee=re===Nt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT&&xe&&(ee=xe.RGBA16_EXT),W===i.SHORT&&xe&&(ee=xe.RGBA16_SNORM_EXT),W===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function T(R,v){let W;return R?v===null||v===ri||v===pr?W=i.DEPTH24_STENCIL8:v===Hn?W=i.DEPTH32F_STENCIL8:v===dr&&(W=i.DEPTH24_STENCIL8,tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ri||v===pr?W=i.DEPTH_COMPONENT24:v===Hn?W=i.DEPTH_COMPONENT32F:v===dr&&(W=i.DEPTH_COMPONENT16),W}function b(R,v){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==hn&&R.minFilter!==gn?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function C(R){const v=R.target;v.removeEventListener("dispose",C),w(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&f.delete(v)}function x(R){const v=R.target;v.removeEventListener("dispose",x),U(v)}function w(R){const v=n.get(R);if(v.__webglInit===void 0)return;const W=R.source,Z=d.get(W);if(Z){const te=Z[v.__cacheKey];te.usedTimes--,te.usedTimes===0&&D(R),Object.keys(Z).length===0&&d.delete(W)}n.remove(R)}function D(R){const v=n.get(R);i.deleteTexture(v.__webglTexture);const W=R.source,Z=d.get(W);delete Z[v.__cacheKey],a.memory.textures--}function U(R){const v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let te=0;te<v.__webglFramebuffer[Z].length;te++)i.deleteFramebuffer(v.__webglFramebuffer[Z][te]);else i.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[Z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const W=R.textures;for(let Z=0,te=W.length;Z<te;Z++){const ae=n.get(W[Z]);ae.__webglTexture&&(i.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(W[Z])}n.remove(R)}let F=0;function k(){F=0}function X(){return F}function B(R){F=R}function $(){const R=F;return R>=s.maxTextures&&tt("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),F+=1,R}function q(R){const v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function se(R,v){const W=n.get(R);if(R.isVideoTexture&&O(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&W.__version!==R.version){const Z=R.image;if(Z===null)tt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)tt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(W,R,v);return}}else R.isExternalTexture&&(W.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+v)}function ue(R,v){const W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){Ne(W,R,v);return}else R.isExternalTexture&&(W.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+v)}function ge(R,v){const W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){Ne(W,R,v);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+v)}function me(R,v){const W=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&W.__version!==R.version){Ke(W,R,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+v)}const _e={[_i]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[Oo]:i.MIRRORED_REPEAT},Ze={[hn]:i.NEAREST,[Kh]:i.NEAREST_MIPMAP_NEAREST,[Ar]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[ka]:i.LINEAR_MIPMAP_NEAREST,[Ki]:i.LINEAR_MIPMAP_LINEAR},gt={[jh]:i.NEVER,[sf]:i.ALWAYS,[Qh]:i.LESS,[Il]:i.LEQUAL,[ef]:i.EQUAL,[Nl]:i.GEQUAL,[tf]:i.GREATER,[nf]:i.NOTEQUAL};function je(R,v){if(v.type===Hn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===gn||v.magFilter===ka||v.magFilter===Ar||v.magFilter===Ki||v.minFilter===gn||v.minFilter===ka||v.minFilter===Ar||v.minFilter===Ki)&&tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,_e[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,_e[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,_e[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ze[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ze[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,gt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===hn||v.minFilter!==Ar&&v.minFilter!==Ki||v.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ne(R,v){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",C));const Z=v.source;let te=d.get(Z);te===void 0&&(te={},d.set(Z,te));const ae=q(v);if(ae!==R.__cacheKey){te[ae]===void 0&&(te[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),te[ae].usedTimes++;const xe=te[R.__cacheKey];xe!==void 0&&(te[R.__cacheKey].usedTimes--,xe.usedTimes===0&&D(v)),R.__cacheKey=ae,R.__webglTexture=te[ae].texture}return W}function ve(R,v,W){return Math.floor(Math.floor(R/W)/v)}function he(R,v,W,Z){const ae=R.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,W,Z,v.data);else{ae.sort((He,Te)=>He.start-Te.start);let xe=0;for(let He=1;He<ae.length;He++){const Te=ae[xe],Se=ae[He],ze=Te.start+Te.count,$e=ve(Se.start,v.width,4),rt=ve(Te.start,v.width,4);Se.start<=ze+1&&$e===rt&&ve(Se.start+Se.count-1,v.width,4)===$e?Te.count=Math.max(Te.count,Se.start+Se.count-Te.start):(++xe,ae[xe]=Se)}ae.length=xe+1;const ee=t.getParameter(i.UNPACK_ROW_LENGTH),re=t.getParameter(i.UNPACK_SKIP_PIXELS),Ee=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let He=0,Te=ae.length;He<Te;He++){const Se=ae[He],ze=Math.floor(Se.start/4),$e=Math.ceil(Se.count/4),rt=ze%v.width,z=Math.floor(ze/v.width),ye=$e,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),t.pixelStorei(i.UNPACK_SKIP_ROWS,z),t.texSubImage2D(i.TEXTURE_2D,0,rt,z,ye,ie,W,Z,v.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ee),t.pixelStorei(i.UNPACK_SKIP_PIXELS,re),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function Ne(R,v,W){let Z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=i.TEXTURE_3D);const te=ne(R,v),ae=v.source;t.bindTexture(Z,R.__webglTexture,i.TEXTURE0+W);const xe=n.get(ae);if(ae.version!==xe.__version||te===!0){if(t.activeTexture(i.TEXTURE0+W),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ie=St.getPrimaries(St.workingColorSpace),be=v.colorSpace===Ii?null:St.getPrimaries(v.colorSpace),Ce=v.colorSpace===Ii||ie===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let re=m(v.image,!1,s.maxTextureSize);re=bt(v,re);const Ee=r.convert(v.format,v.colorSpace),He=r.convert(v.type);let Te=M(v.internalFormat,Ee,He,v.normalized,v.colorSpace,v.isVideoTexture);je(Z,v);let Se;const ze=v.mipmaps,$e=v.isVideoTexture!==!0,rt=xe.__version===void 0||te===!0,z=ae.dataReady,ye=b(v,re);if(v.isDepthTexture)Te=T(v.format===$i,v.type),rt&&($e?t.texStorage2D(i.TEXTURE_2D,1,Te,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Te,re.width,re.height,0,Ee,He,null));else if(v.isDataTexture)if(ze.length>0){$e&&rt&&t.texStorage2D(i.TEXTURE_2D,ye,Te,ze[0].width,ze[0].height);for(let ie=0,be=ze.length;ie<be;ie++)Se=ze[ie],$e?z&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,Ee,He,Se.data):t.texImage2D(i.TEXTURE_2D,ie,Te,Se.width,Se.height,0,Ee,He,Se.data);v.generateMipmaps=!1}else $e?(rt&&t.texStorage2D(i.TEXTURE_2D,ye,Te,re.width,re.height),z&&he(v,re,Ee,He)):t.texImage2D(i.TEXTURE_2D,0,Te,re.width,re.height,0,Ee,He,re.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){$e&&rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Te,ze[0].width,ze[0].height,re.depth);for(let ie=0,be=ze.length;ie<be;ie++)if(Se=ze[ie],v.format!==Gn)if(Ee!==null)if($e){if(z)if(v.layerUpdates.size>0){const Ce=Wc(Se.width,Se.height,v.format,v.type);for(const ce of v.layerUpdates){const ke=Se.data.subarray(ce*Ce/Se.data.BYTES_PER_ELEMENT,(ce+1)*Ce/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ce,Se.width,Se.height,1,Ee,ke)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Se.width,Se.height,re.depth,Ee,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Te,Se.width,Se.height,re.depth,0,Se.data,0,0);else tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Se.width,Se.height,re.depth,Ee,He,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Te,Se.width,Se.height,re.depth,0,Ee,He,Se.data)}else{$e&&rt&&t.texStorage2D(i.TEXTURE_2D,ye,Te,ze[0].width,ze[0].height);for(let ie=0,be=ze.length;ie<be;ie++)Se=ze[ie],v.format!==Gn?Ee!==null?$e?z&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,Ee,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Te,Se.width,Se.height,0,Se.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?z&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,Ee,He,Se.data):t.texImage2D(i.TEXTURE_2D,ie,Te,Se.width,Se.height,0,Ee,He,Se.data)}else if(v.isDataArrayTexture)if($e){if(rt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Te,re.width,re.height,re.depth),z)if(v.layerUpdates.size>0){const ie=Wc(re.width,re.height,v.format,v.type);for(const be of v.layerUpdates){const Ce=re.data.subarray(be*ie/re.data.BYTES_PER_ELEMENT,(be+1)*ie/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,be,re.width,re.height,1,Ee,He,Ce)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,Ee,He,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,re.width,re.height,re.depth,0,Ee,He,re.data);else if(v.isData3DTexture)$e?(rt&&t.texStorage3D(i.TEXTURE_3D,ye,Te,re.width,re.height,re.depth),z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,Ee,He,re.data)):t.texImage3D(i.TEXTURE_3D,0,Te,re.width,re.height,re.depth,0,Ee,He,re.data);else if(v.isFramebufferTexture){if(rt)if($e)t.texStorage2D(i.TEXTURE_2D,ye,Te,re.width,re.height);else{let ie=re.width,be=re.height;for(let Ce=0;Ce<ye;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,Te,ie,be,0,Ee,He,null),ie>>=1,be>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),re.parentNode!==ie){ie.appendChild(re),f.add(v),ie.onpaint=be=>{const Ce=be.changedElements;for(const ce of f)Ce.includes(ce.image)&&(ce.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,re);else{const Ce=i.RGBA,ce=i.RGBA,ke=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ce,ce,ke,re)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ze.length>0){if($e&&rt){const ie=dt(ze[0]);t.texStorage2D(i.TEXTURE_2D,ye,Te,ie.width,ie.height)}for(let ie=0,be=ze.length;ie<be;ie++)Se=ze[ie],$e?z&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Ee,He,Se):t.texImage2D(i.TEXTURE_2D,ie,Te,Ee,He,Se);v.generateMipmaps=!1}else if($e){if(rt){const ie=dt(re);t.texStorage2D(i.TEXTURE_2D,ye,Te,ie.width,ie.height)}z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,He,re)}else t.texImage2D(i.TEXTURE_2D,0,Te,Ee,He,re);p(v)&&y(Z),xe.__version=ae.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Ke(R,v,W){if(v.image.length!==6)return;const Z=ne(R,v),te=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+W);const ae=n.get(te);if(te.version!==ae.__version||Z===!0){t.activeTexture(i.TEXTURE0+W);const xe=St.getPrimaries(St.workingColorSpace),ee=v.colorSpace===Ii?null:St.getPrimaries(v.colorSpace),re=v.colorSpace===Ii||xe===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const Ee=v.isCompressedTexture||v.image[0].isCompressedTexture,He=v.image[0]&&v.image[0].isDataTexture,Te=[];for(let ce=0;ce<6;ce++)!Ee&&!He?Te[ce]=m(v.image[ce],!0,s.maxCubemapSize):Te[ce]=He?v.image[ce].image:v.image[ce],Te[ce]=bt(v,Te[ce]);const Se=Te[0],ze=r.convert(v.format,v.colorSpace),$e=r.convert(v.type),rt=M(v.internalFormat,ze,$e,v.normalized,v.colorSpace),z=v.isVideoTexture!==!0,ye=ae.__version===void 0||Z===!0,ie=te.dataReady;let be=b(v,Se);je(i.TEXTURE_CUBE_MAP,v);let Ce;if(Ee){z&&ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,rt,Se.width,Se.height);for(let ce=0;ce<6;ce++){Ce=Te[ce].mipmaps;for(let ke=0;ke<Ce.length;ke++){const Fe=Ce[ke];v.format!==Gn?ze!==null?z?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke,0,0,Fe.width,Fe.height,ze,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke,rt,Fe.width,Fe.height,0,Fe.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke,0,0,Fe.width,Fe.height,ze,$e,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke,rt,Fe.width,Fe.height,0,ze,$e,Fe.data)}}}else{if(Ce=v.mipmaps,z&&ye){Ce.length>0&&be++;const ce=dt(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,rt,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(He){z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Te[ce].width,Te[ce].height,ze,$e,Te[ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,rt,Te[ce].width,Te[ce].height,0,ze,$e,Te[ce].data);for(let ke=0;ke<Ce.length;ke++){const Ft=Ce[ke].image[ce].image;z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke+1,0,0,Ft.width,Ft.height,ze,$e,Ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke+1,rt,Ft.width,Ft.height,0,ze,$e,Ft.data)}}else{z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ze,$e,Te[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,rt,ze,$e,Te[ce]);for(let ke=0;ke<Ce.length;ke++){const Fe=Ce[ke];z?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke+1,0,0,ze,$e,Fe.image[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ke+1,rt,ze,$e,Fe.image[ce])}}}p(v)&&y(i.TEXTURE_CUBE_MAP),ae.__version=te.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Ve(R,v,W,Z,te,ae){const xe=r.convert(W.format,W.colorSpace),ee=r.convert(W.type),re=M(W.internalFormat,xe,ee,W.normalized,W.colorSpace),Ee=n.get(v),He=n.get(W);if(He.__renderTarget=v,!Ee.__hasExternalTextures){const Te=Math.max(1,v.width>>ae),Se=Math.max(1,v.height>>ae);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,ae,re,Te,Se,v.depth,0,xe,ee,null):t.texImage2D(te,ae,re,Te,Se,0,xe,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),nt(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,te,He.__webglTexture,0,et(v)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,te,He.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(R,v,W){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){const Z=v.depthTexture,te=Z&&Z.isDepthTexture?Z.type:null,ae=T(v.stencilBuffer,te),xe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;nt(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(v),ae,v.width,v.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(v),ae,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ae,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xe,i.RENDERBUFFER,R)}else{const Z=v.textures;for(let te=0;te<Z.length;te++){const ae=Z[te],xe=r.convert(ae.format,ae.colorSpace),ee=r.convert(ae.type),re=M(ae.internalFormat,xe,ee,ae.normalized,ae.colorSpace);nt(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(v),re,v.width,v.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(v),re,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,re,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Qe(R,v,W){const Z=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=n.get(v.depthTexture);if(te.__renderTarget=v,(!te.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z){if(te.__webglInit===void 0&&(te.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),je(i.TEXTURE_CUBE_MAP,v.depthTexture);const Ee=r.convert(v.depthTexture.format),He=r.convert(v.depthTexture.type);let Te;v.depthTexture.format===yi?Te=i.DEPTH_COMPONENT24:v.depthTexture.format===$i&&(Te=i.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Te,v.width,v.height,0,Ee,He,null)}}else se(v.depthTexture,0);const ae=te.__webglTexture,xe=et(v),ee=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,re=v.depthTexture.format===$i?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===yi)nt(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ee,ae,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,re,ee,ae,0);else if(v.depthTexture.format===$i)nt(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ee,ae,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,re,ee,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function le(R){const v=n.get(R),W=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const te=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",te)};Z.addEventListener("dispose",te),v.__depthDisposeCallback=te}v.__boundDepthTexture=Z}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(W)for(let Z=0;Z<6;Z++)Qe(v.__webglFramebuffer[Z],R,Z);else{const Z=R.texture.mipmaps;Z&&Z.length>0?Qe(v.__webglFramebuffer[0],R,0):Qe(v.__webglFramebuffer,R,0)}else if(W){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=i.createRenderbuffer(),_t(v.__webglDepthbuffer[Z],R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=v.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ae)}}else{const Z=R.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),_t(v.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ae)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function fe(R,v,W){const Z=n.get(R);v!==void 0&&Ve(Z.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&le(R)}function de(R){const v=R.texture,W=n.get(R),Z=n.get(v);R.addEventListener("dispose",x);const te=R.textures,ae=R.isWebGLCubeRenderTarget===!0,xe=te.length>1;if(xe||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=v.version,a.memory.textures++),ae){W.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer[ee]=[];for(let re=0;re<v.mipmaps.length;re++)W.__webglFramebuffer[ee][re]=i.createFramebuffer()}else W.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer=[];for(let ee=0;ee<v.mipmaps.length;ee++)W.__webglFramebuffer[ee]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(xe)for(let ee=0,re=te.length;ee<re;ee++){const Ee=n.get(te[ee]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&nt(R)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ee=0;ee<te.length;ee++){const re=te[ee];W.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[ee]);const Ee=r.convert(re.format,re.colorSpace),He=r.convert(re.type),Te=M(re.internalFormat,Ee,He,re.normalized,re.colorSpace,R.isXRRenderTarget===!0),Se=et(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,Te,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,W.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),_t(W.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),je(i.TEXTURE_CUBE_MAP,v);for(let ee=0;ee<6;ee++)if(v.mipmaps&&v.mipmaps.length>0)for(let re=0;re<v.mipmaps.length;re++)Ve(W.__webglFramebuffer[ee][re],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,re);else Ve(W.__webglFramebuffer[ee],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);p(v)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ee=0,re=te.length;ee<re;ee++){const Ee=te[ee],He=n.get(Ee);let Te=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Te=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Te,He.__webglTexture),je(Te,Ee),Ve(W.__webglFramebuffer,R,Ee,i.COLOR_ATTACHMENT0+ee,Te,0),p(Ee)&&y(Te)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ee=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,Z.__webglTexture),je(ee,v),v.mipmaps&&v.mipmaps.length>0)for(let re=0;re<v.mipmaps.length;re++)Ve(W.__webglFramebuffer[re],R,v,i.COLOR_ATTACHMENT0,ee,re);else Ve(W.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,ee,0);p(v)&&y(ee),t.unbindTexture()}R.depthBuffer&&le(R)}function we(R){const v=R.textures;for(let W=0,Z=v.length;W<Z;W++){const te=v[W];if(p(te)){const ae=S(R),xe=n.get(te).__webglTexture;t.bindTexture(ae,xe),y(ae),t.unbindTexture()}}}const Me=[],Ye=[];function Be(R){if(R.samples>0){if(nt(R)===!1){const v=R.textures,W=R.width,Z=R.height;let te=i.COLOR_BUFFER_BIT;const ae=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xe=n.get(R),ee=v.length>1;if(ee)for(let Ee=0;Ee<v.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const re=R.texture.mipmaps;re&&re.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Ee=0;Ee<v.length;Ee++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xe.__webglColorRenderbuffer[Ee]);const He=n.get(v[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,He,0)}i.blitFramebuffer(0,0,W,Z,0,0,W,Z,te,i.NEAREST),o===!0&&(Me.length=0,Ye.length=0,Me.push(i.COLOR_ATTACHMENT0+Ee),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Me.push(ae),Ye.push(ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ye)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let Ee=0;Ee<v.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,xe.__webglColorRenderbuffer[Ee]);const He=n.get(v[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,He,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&o){const v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function et(R){return Math.min(s.maxSamples,R.samples)}function nt(R){const v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function O(R){const v=a.render.frame;u.get(R)!==v&&(u.set(R,v),R.update())}function bt(R,v){const W=R.colorSpace,Z=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||W!==ga&&W!==Ii&&(St.getTransfer(W)===Nt?(Z!==Gn||te!==Rn)&&tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",W)),v}function dt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=k,this.getTextureUnits=X,this.setTextureUnits=B,this.setTexture2D=se,this.setTexture2DArray=ue,this.setTexture3D=ge,this.setTextureCube=me,this.rebindTextures=fe,this.setupRenderTarget=de,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=Ve,this.useMultisampledRTT=nt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function g_(i,e){function t(n,s=Ii){let r;const a=St.getTransfer(s);if(n===Rn)return i.UNSIGNED_BYTE;if(n===Al)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Rl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Lu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Iu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Pu)return i.BYTE;if(n===Du)return i.SHORT;if(n===dr)return i.UNSIGNED_SHORT;if(n===Tl)return i.INT;if(n===ri)return i.UNSIGNED_INT;if(n===Hn)return i.FLOAT;if(n===Mi)return i.HALF_FLOAT;if(n===Nu)return i.ALPHA;if(n===Uu)return i.RGB;if(n===Gn)return i.RGBA;if(n===yi)return i.DEPTH_COMPONENT;if(n===$i)return i.DEPTH_STENCIL;if(n===Cl)return i.RED;if(n===Pl)return i.RED_INTEGER;if(n===Qi)return i.RG;if(n===Dl)return i.RG_INTEGER;if(n===Ll)return i.RGBA_INTEGER;if(n===oa||n===la||n===ca||n===ua)if(a===Nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===oa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===oa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===la)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ca)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bo||n===zo||n===ko||n===Vo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Bo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ko)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ho||n===Go||n===Wo||n===Xo||n===qo||n===da||n===Yo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ho||n===Go)return a===Nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wo)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Xo)return r.COMPRESSED_R11_EAC;if(n===qo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===da)return r.COMPRESSED_RG11_EAC;if(n===Yo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Zo||n===Ko||n===$o||n===Jo||n===jo||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zo)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ko)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$o)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Jo)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jo)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Qo)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===el)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===tl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===nl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===il)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===sl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===rl)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===al)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ol)return a===Nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ll||n===cl||n===ul)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ll)return a===Nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ul)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===fl||n===pa||n===dl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===hl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===pa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const __=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,v_=`
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

}`;class x_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new qu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new oi({vertexShader:__,fragmentShader:v_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ue(new si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class M_ extends Fi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,u=null,f=null,h=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new x_,p={},y=t.getContextAttributes();let S=null,M=null;const T=[],b=[],C=new j;let x=null;const w=new An;w.viewport=new Yt;const D=new An;D.viewport=new Yt;const U=[w,D],F=new Td;let k=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ve=T[ne];return ve===void 0&&(ve=new Ya,T[ne]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(ne){let ve=T[ne];return ve===void 0&&(ve=new Ya,T[ne]=ve),ve.getGripSpace()},this.getHand=function(ne){let ve=T[ne];return ve===void 0&&(ve=new Ya,T[ne]=ve),ve.getHandSpace()};function B(ne){const ve=b.indexOf(ne.inputSource);if(ve===-1)return;const he=T[ve];he!==void 0&&(he.update(ne.inputSource,ne.frame,l||a),he.dispatchEvent({type:ne.type,data:ne.inputSource}))}function $(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",q);for(let ne=0;ne<T.length;ne++){const ve=b[ne];ve!==null&&(b[ne]=null,T[ne].disconnect(ve))}k=null,X=null,m.reset();for(const ne in p)delete p[ne];e.setRenderTarget(S),d=null,h=null,f=null,s=null,M=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){c=ne,n.isPresenting===!0&&tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ne){if(s=ne,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",$),s.addEventListener("inputsourceschange",q),y.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,Ne=null,Ke=null;y.depth&&(Ke=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=y.stencil?$i:yi,Ne=y.stencil?pr:ri);const Ve={colorFormat:t.RGBA8,depthFormat:Ke,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ve),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new ii(h.textureWidth,h.textureHeight,{format:Gn,type:Rn,depthTexture:new Os(h.textureWidth,h.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const he={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,he),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new ii(d.framebufferWidth,d.framebufferHeight,{format:Gn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),je.setContext(s),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(ne){for(let ve=0;ve<ne.removed.length;ve++){const he=ne.removed[ve],Ne=b.indexOf(he);Ne>=0&&(b[Ne]=null,T[Ne].disconnect(he))}for(let ve=0;ve<ne.added.length;ve++){const he=ne.added[ve];let Ne=b.indexOf(he);if(Ne===-1){for(let Ve=0;Ve<T.length;Ve++)if(Ve>=b.length){b.push(he),Ne=Ve;break}else if(b[Ve]===null){b[Ve]=he,Ne=Ve;break}if(Ne===-1)break}const Ke=T[Ne];Ke&&Ke.connect(he)}}const se=new L,ue=new L;function ge(ne,ve,he){se.setFromMatrixPosition(ve.matrixWorld),ue.setFromMatrixPosition(he.matrixWorld);const Ne=se.distanceTo(ue),Ke=ve.projectionMatrix.elements,Ve=he.projectionMatrix.elements,_t=Ke[14]/(Ke[10]-1),Qe=Ke[14]/(Ke[10]+1),le=(Ke[9]+1)/Ke[5],fe=(Ke[9]-1)/Ke[5],de=(Ke[8]-1)/Ke[0],we=(Ve[8]+1)/Ve[0],Me=_t*de,Ye=_t*we,Be=Ne/(-de+we),et=Be*-de;if(ve.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(et),ne.translateZ(Be),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Ke[10]===-1)ne.projectionMatrix.copy(ve.projectionMatrix),ne.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const nt=_t+Be,O=Qe+Be,bt=Me-et,dt=Ye+(Ne-et),R=le*Qe/O*nt,v=fe*Qe/O*nt;ne.projectionMatrix.makePerspective(bt,dt,R,v,nt,O),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function me(ne,ve){ve===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ve.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(s===null)return;let ve=ne.near,he=ne.far;m.texture!==null&&(m.depthNear>0&&(ve=m.depthNear),m.depthFar>0&&(he=m.depthFar)),F.near=D.near=w.near=ve,F.far=D.far=w.far=he,(k!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),k=F.near,X=F.far),F.layers.mask=ne.layers.mask|6,w.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;const Ne=ne.parent,Ke=F.cameras;me(F,Ne);for(let Ve=0;Ve<Ke.length;Ve++)me(Ke[Ve],Ne);Ke.length===2?ge(F,w,D):F.projectionMatrix.copy(w.projectionMatrix),_e(ne,F,Ne)};function _e(ne,ve,he){he===null?ne.matrix.copy(ve.matrixWorld):(ne.matrix.copy(he.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ve.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ve.projectionMatrix),ne.projectionMatrixInverse.copy(ve.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=ml*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&d===null))return o},this.setFoveation=function(ne){o=ne,h!==null&&(h.fixedFoveation=ne),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(ne){return p[ne]};let Ze=null;function gt(ne,ve){if(u=ve.getViewerPose(l||a),g=ve,u!==null){const he=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Ne=!1;he.length!==F.cameras.length&&(F.cameras.length=0,Ne=!0);for(let Qe=0;Qe<he.length;Qe++){const le=he[Qe];let fe=null;if(d!==null)fe=d.getViewport(le);else{const we=f.getViewSubImage(h,le);fe=we.viewport,Qe===0&&(e.setRenderTargetTextures(M,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(M))}let de=U[Qe];de===void 0&&(de=new An,de.layers.enable(Qe),de.viewport=new Yt,U[Qe]=de),de.matrix.fromArray(le.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(le.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(fe.x,fe.y,fe.width,fe.height),Qe===0&&(F.matrix.copy(de.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ne===!0&&F.cameras.push(de)}const Ke=s.enabledFeatures;if(Ke&&Ke.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const Qe=f.getDepthInformation(he[0]);Qe&&Qe.isValid&&Qe.texture&&m.init(Qe,s.renderState)}if(Ke&&Ke.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let Qe=0;Qe<he.length;Qe++){const le=he[Qe].camera;if(le){let fe=p[le];fe||(fe=new qu,p[le]=fe);const de=f.getCameraImage(le);fe.sourceTexture=de}}}}for(let he=0;he<T.length;he++){const Ne=b[he],Ke=T[he];Ne!==null&&Ke!==void 0&&Ke.update(Ne,ve,l||a)}Ze&&Ze(ne,ve),ve.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ve}),g=null}const je=new oh;je.setAnimationLoop(gt),this.setAnimationLoop=function(ne){Ze=ne},this.dispose=function(){}}}const y_=new Ut,ph=new ot;ph.set(-1,0,0,0,1,0,0,0,1);function S_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ih(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,S,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&c(m,p)):p.isPointsMaterial?o(m,p,y,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===yn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===yn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),S=y.envMap,M=y.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(y_.makeRotationFromEuler(M)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ph),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function c(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,y,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function b_(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(M,T){const b=T.program;n.uniformBlockBinding(M,b)}function l(M,T){let b=s[M.id];b===void 0&&(m(M),b=u(M),s[M.id]=b,M.addEventListener("dispose",y));const C=T.program;n.updateUBOMapping(M,C);const x=e.render.frame;r[M.id]!==x&&(h(M),r[M.id]=x)}function u(M){const T=f();M.__bindingPointIndex=T;const b=i.createBuffer(),C=M.__size,x=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,C,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,b),b}function f(){for(let M=0;M<c;M++)if(a.indexOf(M)===-1)return a.push(M),M;return vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const T=s[M.id],b=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let x=0,w=b.length;x<w;x++){const D=b[x];if(Array.isArray(D))for(let U=0,F=D.length;U<F;U++)d(D[U],x,U,C);else d(D,x,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,T,b,C){if(_(M,T,b,C)===!0){const x=M.__offset,w=M.value;if(Array.isArray(w)){let D=0;for(let U=0;U<w.length;U++){const F=w[U],k=p(F);g(F,M.__data,D),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(D+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,M.__data)}}function g(M,T,b){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,b)}function _(M,T,b,C){const x=M.value,w=T+"_"+b;if(C[w]===void 0)return typeof x=="number"||typeof x=="boolean"?C[w]=x:ArrayBuffer.isView(x)?C[w]=x.slice():C[w]=x.clone(),!0;{const D=C[w];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return C[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function m(M){const T=M.uniforms;let b=0;const C=16;for(let w=0,D=T.length;w<D;w++){const U=Array.isArray(T[w])?T[w]:[T[w]];for(let F=0,k=U.length;F<k;F++){const X=U[F],B=Array.isArray(X.value)?X.value:[X.value];for(let $=0,q=B.length;$<q;$++){const se=B[$],ue=p(se),ge=b%C,me=ge%ue.boundary,_e=ge+me;b+=me,_e!==0&&C-_e<ue.storage&&(b+=C-_e),X.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=b,b+=ue.storage}}}const x=b%C;return x>0&&(b+=C-x),M.__size=b,M.__cache={},this}function p(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):tt("WebGLRenderer: Unsupported uniform value type.",M),T}function y(M){const T=M.target;T.removeEventListener("dispose",y);const b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function S(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:o,update:l,dispose:S}}const E_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let $n=null;function w_(){return $n===null&&($n=new Gu(E_,16,16,Qi,Mi),$n.name="DFG_LUT",$n.minFilter=gn,$n.magFilter=gn,$n.wrapS=mi,$n.wrapT=mi,$n.generateMipmaps=!1,$n.needsUpdate=!0),$n}class T_{constructor(e={}){const{canvas:t=af(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Rn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=d,m=new Set([Ll,Dl,Pl]),p=new Set([Rn,ri,dr,pr,Al,Rl]),y=new Uint32Array(4),S=new Int32Array(4),M=new L;let T=null,b=null;const C=[],x=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let U=!1,F=null,k=null,X=null,B=null;this._outputColorSpace=un;let $=0,q=0,se=null,ue=-1,ge=null;const me=new Yt,_e=new Yt;let Ze=null;const gt=new lt(0);let je=0,ne=t.width,ve=t.height,he=1,Ne=null,Ke=null;const Ve=new Yt(0,0,ne,ve),_t=new Yt(0,0,ne,ve);let Qe=!1;const le=new Ol;let fe=!1,de=!1;const we=new Ut,Me=new L,Ye=new Yt,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function nt(){return se===null?he:1}let O=n;function bt(E,G){return t.getContext(E,G)}try{const E={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bl}`),t.addEventListener("webglcontextlost",Ft,!1),t.addEventListener("webglcontextrestored",Rt,!1),t.addEventListener("webglcontextcreationerror",Cn,!1),O===null){const G="webgl2";if(O=bt(G,E),O===null)throw bt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw vt("WebGLRenderer: "+E.message),E}let dt,R,v,W,Z,te,ae,xe,ee,re,Ee,He,Te,Se,ze,$e,rt,z,ye,ie,be,Ce,ce;function ke(){dt=new wm(O),dt.init(),be=new g_(O,dt),R=new _m(O,dt,e,be),v=new p_(O,dt),R.reversedDepthBuffer&&h&&v.buffers.depth.setReversed(!0),k=O.createFramebuffer(),X=O.createFramebuffer(),B=O.createFramebuffer(),W=new Rm(O),Z=new e_,te=new m_(O,dt,v,Z,R,be,W),ae=new Em(D),xe=new Ld(O),Ce=new mm(O,xe),ee=new Tm(O,xe,W,Ce),re=new Pm(O,ee,xe,Ce,W),z=new Cm(O,R,te),ze=new vm(Z),Ee=new Qg(D,ae,dt,R,Ce,ze),He=new S_(D,Z),Te=new n_,Se=new l_(dt),rt=new pm(D,ae,v,re,g,o),$e=new d_(D,re,R),ce=new b_(O,W,R,v),ye=new gm(O,dt,W),ie=new Am(O,dt,W),W.programs=Ee.programs,D.capabilities=R,D.extensions=dt,D.properties=Z,D.renderLists=Te,D.shadowMap=$e,D.state=v,D.info=W}ke(),_!==Rn&&(w=new Lm(_,t.width,t.height,c,s,r));const Fe=new M_(D,O);this.xr=Fe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=dt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=dt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(E){E!==void 0&&(he=E,this.setSize(ne,ve,!1))},this.getSize=function(E){return E.set(ne,ve)},this.setSize=function(E,G,J=!0){if(Fe.isPresenting){tt("WebGLRenderer: Can't change size while VR device is presenting.");return}ne=E,ve=G,t.width=Math.floor(E*he),t.height=Math.floor(G*he),J===!0&&(t.style.width=E+"px",t.style.height=G+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,E,G)},this.getDrawingBufferSize=function(E){return E.set(ne*he,ve*he).floor()},this.setDrawingBufferSize=function(E,G,J){ne=E,ve=G,he=J,t.width=Math.floor(E*J),t.height=Math.floor(G*J),this.setViewport(0,0,E,G)},this.setEffects=function(E){if(_===Rn){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let G=0;G<E.length;G++)if(E[G].isOutputPass===!0){tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(me)},this.getViewport=function(E){return E.copy(Ve)},this.setViewport=function(E,G,J,Y){E.isVector4?Ve.set(E.x,E.y,E.z,E.w):Ve.set(E,G,J,Y),v.viewport(me.copy(Ve).multiplyScalar(he).round())},this.getScissor=function(E){return E.copy(_t)},this.setScissor=function(E,G,J,Y){E.isVector4?_t.set(E.x,E.y,E.z,E.w):_t.set(E,G,J,Y),v.scissor(_e.copy(_t).multiplyScalar(he).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(E){v.setScissorTest(Qe=E)},this.setOpaqueSort=function(E){Ne=E},this.setTransparentSort=function(E){Ke=E},this.getClearColor=function(E){return E.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(E=!0,G=!0,J=!0){let Y=0;if(E){let K=!1;if(se!==null){const Ae=se.texture.format;K=m.has(Ae)}if(K){const Ae=se.texture.type,Le=p.has(Ae),Re=rt.getClearColor(),Oe=rt.getClearAlpha(),Ge=Re.r,at=Re.g,ct=Re.b;Le?(y[0]=Ge,y[1]=at,y[2]=ct,y[3]=Oe,O.clearBufferuiv(O.COLOR,0,y)):(S[0]=Ge,S[1]=at,S[2]=ct,S[3]=Oe,O.clearBufferiv(O.COLOR,0,S))}else Y|=O.COLOR_BUFFER_BIT}G&&(Y|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(Y|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&O.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),F=E},this.dispose=function(){t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",Rt,!1),t.removeEventListener("webglcontextcreationerror",Cn,!1),rt.dispose(),Te.dispose(),Se.dispose(),Z.dispose(),ae.dispose(),re.dispose(),Ce.dispose(),ce.dispose(),Ee.dispose(),Fe.dispose(),Fe.removeEventListener("sessionstart",Gs),Fe.removeEventListener("sessionend",Ws),Un.stop()};function Ft(E){E.preventDefault(),xa("WebGLRenderer: Context Lost."),U=!0}function Rt(){xa("WebGLRenderer: Context Restored."),U=!1;const E=W.autoReset,G=$e.enabled,J=$e.autoUpdate,Y=$e.needsUpdate,K=$e.type;ke(),W.autoReset=E,$e.enabled=G,$e.autoUpdate=J,$e.needsUpdate=Y,$e.type=K}function Cn(E){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function fn(E){const G=E.target;G.removeEventListener("dispose",fn),ts(G)}function ts(E){xr(E),Z.remove(E)}function xr(E){const G=Z.get(E).programs;G!==void 0&&(G.forEach(function(J){Ee.releaseProgram(J)}),E.isShaderMaterial&&Ee.releaseShaderCache(E))}this.renderBufferDirect=function(E,G,J,Y,K,Ae){G===null&&(G=Be);const Le=K.isMesh&&K.matrixWorld.determinantAffine()<0,Re=br(E,G,J,Y,K);v.setMaterial(Y,Le);let Oe=J.index,Ge=1;if(Y.wireframe===!0){if(Oe=ee.getWireframeAttribute(J),Oe===void 0)return;Ge=2}const at=J.drawRange,ct=J.attributes.position;let We=at.start*Ge,Je=(at.start+at.count)*Ge;Ae!==null&&(We=Math.max(We,Ae.start*Ge),Je=Math.min(Je,(Ae.start+Ae.count)*Ge)),Oe!==null?(We=Math.max(We,0),Je=Math.min(Je,Oe.count)):ct!=null&&(We=Math.max(We,0),Je=Math.min(Je,ct.count));const Vt=Je-We;if(Vt<0||Vt===1/0)return;Ce.setup(K,Y,Re,J,Oe);let Ht,Tt=ye;if(Oe!==null&&(Ht=xe.get(Oe),Tt=ie,Tt.setIndex(Ht)),K.isMesh)Y.wireframe===!0?(v.setLineWidth(Y.wireframeLinewidth*nt()),Tt.setMode(O.LINES)):Tt.setMode(O.TRIANGLES);else if(K.isLine){let sn=Y.linewidth;sn===void 0&&(sn=1),v.setLineWidth(sn*nt()),K.isLineSegments?Tt.setMode(O.LINES):K.isLineLoop?Tt.setMode(O.LINE_LOOP):Tt.setMode(O.LINE_STRIP)}else K.isPoints?Tt.setMode(O.POINTS):K.isSprite&&Tt.setMode(O.TRIANGLES);if(K.isBatchedMesh)if(dt.get("WEBGL_multi_draw"))Tt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const sn=K._multiDrawStarts,Ie=K._multiDrawCounts,dn=K._multiDrawCount,Mt=Oe?xe.get(Oe).bytesPerElement:1,vn=Z.get(Y).currentProgram.getUniforms();for(let bn=0;bn<dn;bn++)vn.setValue(O,"_gl_DrawID",bn),Tt.render(sn[bn]/Mt,Ie[bn])}else if(K.isInstancedMesh)Tt.renderInstances(We,Vt,K.count);else if(J.isInstancedBufferGeometry){const sn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ie=Math.min(J.instanceCount,sn);Tt.renderInstances(We,Vt,Ie)}else Tt.render(We,Vt)};function qn(E,G,J){E.transparent===!0&&E.side===$t&&E.forceSinglePass===!1?(E.side=yn,E.needsUpdate=!0,is(E,G,J),E.side=Ui,E.needsUpdate=!0,is(E,G,J),E.side=$t):is(E,G,J)}this.compile=function(E,G,J=null){J===null&&(J=E),b=Se.get(J),b.init(G),x.push(b),J.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),E!==J&&E.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),b.setupLights();const Y=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ae=K.material;if(Ae)if(Array.isArray(Ae))for(let Le=0;Le<Ae.length;Le++){const Re=Ae[Le];qn(Re,J,K),Y.add(Re)}else qn(Ae,J,K),Y.add(Ae)}),b=x.pop(),Y},this.compileAsync=function(E,G,J=null){const Y=this.compile(E,G,J);return new Promise(K=>{function Ae(){if(Y.forEach(function(Le){Z.get(Le).currentProgram.isReady()&&Y.delete(Le)}),Y.size===0){K(E);return}setTimeout(Ae,10)}dt.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let Bi=null;function Hs(E){Bi&&Bi(E)}function Gs(){Un.stop()}function Ws(){Un.start()}const Un=new oh;Un.setAnimationLoop(Hs),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(E){Bi=E,Fe.setAnimationLoop(E),E===null?Un.stop():Un.start()},Fe.addEventListener("sessionstart",Gs),Fe.addEventListener("sessionend",Ws),this.render=function(E,G){if(G!==void 0&&G.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;F!==null&&F.renderStart(E,G);const J=Fe.enabled===!0&&Fe.isPresenting===!0,Y=w!==null&&(se===null||J)&&w.begin(D,se);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Fe.enabled===!0&&Fe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Fe.cameraAutoUpdate===!0&&Fe.updateCamera(G),G=Fe.getCamera()),E.isScene===!0&&E.onBeforeRender(D,E,G,se),b=Se.get(E,x.length),b.init(G),b.state.textureUnits=te.getTextureUnits(),x.push(b),we.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),le.setFromProjectionMatrix(we,ti,G.reversedDepth),de=this.localClippingEnabled,fe=ze.init(this.clippingPlanes,de),T=Te.get(E,C.length),T.init(),C.push(T),Fe.enabled===!0&&Fe.isPresenting===!0){const Le=D.xr.getDepthSensingMesh();Le!==null&&zi(Le,G,-1/0,D.sortObjects)}zi(E,G,0,D.sortObjects),T.finish(),D.sortObjects===!0&&T.sort(Ne,Ke,G.reversedDepth),et=Fe.enabled===!1||Fe.isPresenting===!1||Fe.hasDepthSensing()===!1,et&&rt.addToRenderList(T,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),fe===!0&&ze.beginShadows();const K=b.state.shadowsArray;if($e.render(K,E,G),fe===!0&&ze.endShadows(),(Y&&w.hasRenderPass())===!1){const Le=T.opaque,Re=T.transmissive;if(b.setupLights(),G.isArrayCamera){const Oe=G.cameras;if(Re.length>0)for(let Ge=0,at=Oe.length;Ge<at;Ge++){const ct=Oe[Ge];Xs(Le,Re,E,ct)}et&&rt.render(E);for(let Ge=0,at=Oe.length;Ge<at;Ge++){const ct=Oe[Ge];Mr(T,E,ct,ct.viewport)}}else Re.length>0&&Xs(Le,Re,E,G),et&&rt.render(E),Mr(T,E,G)}se!==null&&q===0&&(te.updateMultisampleRenderTarget(se),te.updateRenderTargetMipmap(se)),Y&&w.end(D),E.isScene===!0&&E.onAfterRender(D,E,G),Ce.resetDefaultState(),ue=-1,ge=null,x.pop(),x.length>0?(b=x[x.length-1],te.setTextureUnits(b.state.textureUnits),fe===!0&&ze.setGlobalState(D.clippingPlanes,b.state.camera)):b=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,F!==null&&F.renderEnd()};function zi(E,G,J,Y){if(E.visible===!1)return;if(E.layers.test(G.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(G);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||le.intersectsSprite(E)){Y&&Ye.setFromMatrixPosition(E.matrixWorld).applyMatrix4(we);const Le=re.update(E),Re=E.material;Re.visible&&T.push(E,Le,Re,J,Ye.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||le.intersectsObject(E))){const Le=re.update(E),Re=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ye.copy(E.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Ye.copy(Le.boundingSphere.center)),Ye.applyMatrix4(E.matrixWorld).applyMatrix4(we)),Array.isArray(Re)){const Oe=Le.groups;for(let Ge=0,at=Oe.length;Ge<at;Ge++){const ct=Oe[Ge],We=Re[ct.materialIndex];We&&We.visible&&T.push(E,Le,We,J,Ye.z,ct)}}else Re.visible&&T.push(E,Le,Re,J,Ye.z,null)}}const Ae=E.children;for(let Le=0,Re=Ae.length;Le<Re;Le++)zi(Ae[Le],G,J,Y)}function Mr(E,G,J,Y){const{opaque:K,transmissive:Ae,transparent:Le}=E;b.setupLightsView(J),fe===!0&&ze.setGlobalState(D.clippingPlanes,J),Y&&v.viewport(me.copy(Y)),K.length>0&&ns(K,G,J),Ae.length>0&&ns(Ae,G,J),Le.length>0&&ns(Le,G,J),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Xs(E,G,J,Y){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[Y.id]===void 0){const We=dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[Y.id]=new ii(1,1,{generateMipmaps:!0,type:We?Mi:Rn,minFilter:Ki,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:St.workingColorSpace})}const Ae=b.state.transmissionRenderTarget[Y.id],Le=Y.viewport||me;Ae.setSize(Le.z*D.transmissionResolutionScale,Le.w*D.transmissionResolutionScale);const Re=D.getRenderTarget(),Oe=D.getActiveCubeFace(),Ge=D.getActiveMipmapLevel();D.setRenderTarget(Ae),D.getClearColor(gt),je=D.getClearAlpha(),je<1&&D.setClearColor(16777215,.5),D.clear(),et&&rt.render(J);const at=D.toneMapping;D.toneMapping=ni;const ct=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),b.setupLightsView(Y),fe===!0&&ze.setGlobalState(D.clippingPlanes,Y),ns(E,J,Y),te.updateMultisampleRenderTarget(Ae),te.updateRenderTargetMipmap(Ae),dt.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Je=0,Vt=G.length;Je<Vt;Je++){const Ht=G[Je],{object:Tt,geometry:sn,material:Ie,group:dn}=Ht;if(Ie.side===$t&&Tt.layers.test(Y.layers)){const Mt=Ie.side;Ie.side=yn,Ie.needsUpdate=!0,ki(Tt,J,Y,sn,Ie,dn),Ie.side=Mt,Ie.needsUpdate=!0,We=!0}}We===!0&&(te.updateMultisampleRenderTarget(Ae),te.updateRenderTargetMipmap(Ae))}D.setRenderTarget(Re,Oe,Ge),D.setClearColor(gt,je),ct!==void 0&&(Y.viewport=ct),D.toneMapping=at}function ns(E,G,J){const Y=G.isScene===!0?G.overrideMaterial:null;for(let K=0,Ae=E.length;K<Ae;K++){const Le=E[K],{object:Re,geometry:Oe,group:Ge}=Le;let at=Le.material;at.allowOverride===!0&&Y!==null&&(at=Y),Re.layers.test(J.layers)&&ki(Re,G,J,Oe,at,Ge)}}function ki(E,G,J,Y,K,Ae){E.onBeforeRender(D,G,J,Y,K,Ae),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(D,G,J,Y,E,Ae),K.transparent===!0&&K.side===$t&&K.forceSinglePass===!1?(K.side=yn,K.needsUpdate=!0,D.renderBufferDirect(J,G,Y,K,E,Ae),K.side=Ui,K.needsUpdate=!0,D.renderBufferDirect(J,G,Y,K,E,Ae),K.side=$t):D.renderBufferDirect(J,G,Y,K,E,Ae),E.onAfterRender(D,G,J,Y,K,Ae)}function is(E,G,J){G.isScene!==!0&&(G=Be);const Y=Z.get(E),K=b.state.lights,Ae=b.state.shadowsArray,Le=K.state.version,Re=Ee.getParameters(E,K.state,Ae,G,J,b.state.lightProbeGridArray),Oe=Ee.getProgramCacheKey(Re);let Ge=Y.programs;Y.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?G.environment:null,Y.fog=G.fog;const at=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Y.envMap=ae.get(E.envMap||Y.environment,at),Y.envMapRotation=Y.environment!==null&&E.envMap===null?G.environmentRotation:E.envMapRotation,Ge===void 0&&(E.addEventListener("dispose",fn),Ge=new Map,Y.programs=Ge);let ct=Ge.get(Oe);if(ct!==void 0){if(Y.currentProgram===ct&&Y.lightsStateVersion===Le)return Sr(E,Re),ct}else Re.uniforms=Ee.getUniforms(E),F!==null&&E.isNodeMaterial&&F.build(E,J,Re),E.onBeforeCompile(Re,D),ct=Ee.acquireProgram(Re,Oe),Ge.set(Oe,ct),Y.uniforms=Re.uniforms;const We=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(We.clippingPlanes=ze.uniform),Sr(E,Re),Y.needsLights=Oa(E),Y.lightsStateVersion=Le,Y.needsLights&&(We.ambientLightColor.value=K.state.ambient,We.lightProbe.value=K.state.probe,We.directionalLights.value=K.state.directional,We.directionalLightShadows.value=K.state.directionalShadow,We.spotLights.value=K.state.spot,We.spotLightShadows.value=K.state.spotShadow,We.rectAreaLights.value=K.state.rectArea,We.ltc_1.value=K.state.rectAreaLTC1,We.ltc_2.value=K.state.rectAreaLTC2,We.pointLights.value=K.state.point,We.pointLightShadows.value=K.state.pointShadow,We.hemisphereLights.value=K.state.hemi,We.directionalShadowMatrix.value=K.state.directionalShadowMatrix,We.spotLightMatrix.value=K.state.spotLightMatrix,We.spotLightMap.value=K.state.spotLightMap,We.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.lightProbeGrid=b.state.lightProbeGridArray.length>0,Y.currentProgram=ct,Y.uniformsList=null,ct}function yr(E){if(E.uniformsList===null){const G=E.currentProgram.getUniforms();E.uniformsList=fa.seqWithValue(G.seq,E.uniforms)}return E.uniformsList}function Sr(E,G){const J=Z.get(E);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function Fn(E,G){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;M.setFromMatrixPosition(G.matrixWorld);for(let J=0,Y=E.length;J<Y;J++){const K=E[J];if(K.texture!==null&&K.boundingBox.containsPoint(M))return K}return null}function br(E,G,J,Y,K){G.isScene!==!0&&(G=Be),te.resetTextureUnits();const Ae=G.fog,Le=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?G.environment:null,Re=se===null?D.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:St.workingColorSpace,Oe=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Ge=ae.get(Y.envMap||Le,Oe),at=Y.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ct=!!J.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),We=!!J.morphAttributes.position,Je=!!J.morphAttributes.normal,Vt=!!J.morphAttributes.color;let Ht=ni;Y.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ht=D.toneMapping);const Tt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,sn=Tt!==void 0?Tt.length:0,Ie=Z.get(Y),dn=b.state.lights;if(fe===!0&&(de===!0||E!==ge)){const Dt=E===ge&&Y.id===ue;ze.setState(Y,E,Dt)}let Mt=!1;Y.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==dn.state.version||Ie.outputColorSpace!==Re||K.isBatchedMesh&&Ie.batching===!1||!K.isBatchedMesh&&Ie.batching===!0||K.isBatchedMesh&&Ie.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ie.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ie.instancing===!1||!K.isInstancedMesh&&Ie.instancing===!0||K.isSkinnedMesh&&Ie.skinning===!1||!K.isSkinnedMesh&&Ie.skinning===!0||K.isInstancedMesh&&Ie.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ie.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ie.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ie.instancingMorph===!1&&K.morphTexture!==null||Ie.envMap!==Ge||Y.fog===!0&&Ie.fog!==Ae||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ze.numPlanes||Ie.numIntersection!==ze.numIntersection)||Ie.vertexAlphas!==at||Ie.vertexTangents!==ct||Ie.morphTargets!==We||Ie.morphNormals!==Je||Ie.morphColors!==Vt||Ie.toneMapping!==Ht||Ie.morphTargetsCount!==sn||!!Ie.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Mt=!0):(Mt=!0,Ie.__version=Y.version);let vn=Ie.currentProgram;Mt===!0&&(vn=is(Y,G,K),F&&Y.isNodeMaterial&&F.onUpdateProgram(Y,vn,Ie));let bn=!1,Yn=!1,Ei=!1;const Pt=vn.getUniforms(),Xt=Ie.uniforms;if(v.useProgram(vn.program)&&(bn=!0,Yn=!0,Ei=!0),Y.id!==ue&&(ue=Y.id,Yn=!0),Ie.needsLights){const Dt=Fn(b.state.lightProbeGridArray,K);Ie.lightProbeGrid!==Dt&&(Ie.lightProbeGrid=Dt,Yn=!0)}if(bn||ge!==E){v.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Pt.setValue(O,"projectionMatrix",E.projectionMatrix),Pt.setValue(O,"viewMatrix",E.matrixWorldInverse);const Zn=Pt.map.cameraPosition;Zn!==void 0&&Zn.setValue(O,Me.setFromMatrixPosition(E.matrixWorld)),R.logarithmicDepthBuffer&&Pt.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Pt.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),ge!==E&&(ge=E,Yn=!0,Ei=!0)}if(Ie.needsLights&&(dn.state.directionalShadowMap.length>0&&Pt.setValue(O,"directionalShadowMap",dn.state.directionalShadowMap,te),dn.state.spotShadowMap.length>0&&Pt.setValue(O,"spotShadowMap",dn.state.spotShadowMap,te),dn.state.pointShadowMap.length>0&&Pt.setValue(O,"pointShadowMap",dn.state.pointShadowMap,te)),K.isSkinnedMesh){Pt.setOptional(O,K,"bindMatrix"),Pt.setOptional(O,K,"bindMatrixInverse");const Dt=K.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),Pt.setValue(O,"boneTexture",Dt.boneTexture,te))}K.isBatchedMesh&&(Pt.setOptional(O,K,"batchingTexture"),Pt.setValue(O,"batchingTexture",K._matricesTexture,te),Pt.setOptional(O,K,"batchingIdTexture"),Pt.setValue(O,"batchingIdTexture",K._indirectTexture,te),Pt.setOptional(O,K,"batchingColorTexture"),K._colorsTexture!==null&&Pt.setValue(O,"batchingColorTexture",K._colorsTexture,te));const On=J.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&z.update(K,J,vn),(Yn||Ie.receiveShadow!==K.receiveShadow)&&(Ie.receiveShadow=K.receiveShadow,Pt.setValue(O,"receiveShadow",K.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&G.environment!==null&&(Xt.envMapIntensity.value=G.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=w_()),Yn){if(Pt.setValue(O,"toneMappingExposure",D.toneMappingExposure),Ie.needsLights&&Fa(Xt,Ei),Ae&&Y.fog===!0&&He.refreshFogUniforms(Xt,Ae),He.refreshMaterialUniforms(Xt,Y,he,ve,b.state.transmissionRenderTarget[E.id]),Ie.needsLights&&Ie.lightProbeGrid){const Dt=Ie.lightProbeGrid;Xt.probesSH.value=Dt.texture,Xt.probesMin.value.copy(Dt.boundingBox.min),Xt.probesMax.value.copy(Dt.boundingBox.max),Xt.probesResolution.value.copy(Dt.resolution)}fa.upload(O,yr(Ie),Xt,te)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(fa.upload(O,yr(Ie),Xt,te),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Pt.setValue(O,"center",K.center),Pt.setValue(O,"modelViewMatrix",K.modelViewMatrix),Pt.setValue(O,"normalMatrix",K.normalMatrix),Pt.setValue(O,"modelMatrix",K.matrixWorld),Y.uniformsGroups!==void 0){const Dt=Y.uniformsGroups;for(let Zn=0,wi=Dt.length;Zn<wi;Zn++){const A=Dt[Zn];ce.update(A,vn),ce.bind(A,vn)}}return vn}function Fa(E,G){E.ambientLightColor.needsUpdate=G,E.lightProbe.needsUpdate=G,E.directionalLights.needsUpdate=G,E.directionalLightShadows.needsUpdate=G,E.pointLights.needsUpdate=G,E.pointLightShadows.needsUpdate=G,E.spotLights.needsUpdate=G,E.spotLightShadows.needsUpdate=G,E.rectAreaLights.needsUpdate=G,E.hemisphereLights.needsUpdate=G}function Oa(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(E,G,J){const Y=Z.get(E);Y.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Z.get(E.texture).__webglTexture=G,Z.get(E.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:J,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,G){const J=Z.get(E);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(E,G=0,J=0){se=E,$=G,q=J;let Y=null,K=!1,Ae=!1;if(E){const Re=Z.get(E);if(Re.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(O.FRAMEBUFFER,Re.__webglFramebuffer),me.copy(E.viewport),_e.copy(E.scissor),Ze=E.scissorTest,v.viewport(me),v.scissor(_e),v.setScissorTest(Ze),ue=-1;return}else if(Re.__webglFramebuffer===void 0)te.setupRenderTarget(E);else if(Re.__hasExternalTextures)te.rebindTextures(E,Z.get(E.texture).__webglTexture,Z.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const at=E.depthTexture;if(Re.__boundDepthTexture!==at){if(at!==null&&Z.has(at)&&(E.width!==at.image.width||E.height!==at.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(E)}}const Oe=E.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Ae=!0);const Ge=Z.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ge[G])?Y=Ge[G][J]:Y=Ge[G],K=!0):E.samples>0&&te.useMultisampledRTT(E)===!1?Y=Z.get(E).__webglMultisampledFramebuffer:Array.isArray(Ge)?Y=Ge[J]:Y=Ge,me.copy(E.viewport),_e.copy(E.scissor),Ze=E.scissorTest}else me.copy(Ve).multiplyScalar(he).floor(),_e.copy(_t).multiplyScalar(he).floor(),Ze=Qe;if(J!==0&&(Y=k),v.bindFramebuffer(O.FRAMEBUFFER,Y)&&v.drawBuffers(E,Y),v.viewport(me),v.scissor(_e),v.setScissorTest(Ze),K){const Re=Z.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+G,Re.__webglTexture,J)}else if(Ae){const Re=G;for(let Oe=0;Oe<E.textures.length;Oe++){const Ge=Z.get(E.textures[Oe]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Oe,Ge.__webglTexture,J,Re)}}else if(E!==null&&J!==0){const Re=Z.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Re.__webglTexture,J)}ue=-1},this.readRenderTargetPixels=function(E,G,J,Y,K,Ae,Le,Re=0){if(!(E&&E.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=Z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Le!==void 0&&(Oe=Oe[Le]),Oe){v.bindFramebuffer(O.FRAMEBUFFER,Oe);try{const Ge=E.textures[Re],at=Ge.format,ct=Ge.type;if(E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Re),!R.textureFormatReadable(at)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(ct)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=E.width-Y&&J>=0&&J<=E.height-K&&O.readPixels(G,J,Y,K,be.convert(at),be.convert(ct),Ae)}finally{const Ge=se!==null?Z.get(se).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(E,G,J,Y,K,Ae,Le,Re=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=Z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Le!==void 0&&(Oe=Oe[Le]),Oe)if(G>=0&&G<=E.width-Y&&J>=0&&J<=E.height-K){v.bindFramebuffer(O.FRAMEBUFFER,Oe);const Ge=E.textures[Re],at=Ge.format,ct=Ge.type;if(E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Re),!R.textureFormatReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,We),O.bufferData(O.PIXEL_PACK_BUFFER,Ae.byteLength,O.STREAM_READ),O.readPixels(G,J,Y,K,be.convert(at),be.convert(ct),0);const Je=se!==null?Z.get(se).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,Je);const Vt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await of(O,Vt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,We),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Ae),O.deleteBuffer(We),O.deleteSync(Vt),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,G=null,J=0){const Y=Math.pow(2,-J),K=Math.floor(E.image.width*Y),Ae=Math.floor(E.image.height*Y),Le=G!==null?G.x:0,Re=G!==null?G.y:0;te.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,J,0,0,Le,Re,K,Ae),v.unbindTexture()},this.copyTextureToTexture=function(E,G,J=null,Y=null,K=0,Ae=0){let Le,Re,Oe,Ge,at,ct,We,Je,Vt;const Ht=E.isCompressedTexture?E.mipmaps[Ae]:E.image;if(J!==null)Le=J.max.x-J.min.x,Re=J.max.y-J.min.y,Oe=J.isBox3?J.max.z-J.min.z:1,Ge=J.min.x,at=J.min.y,ct=J.isBox3?J.min.z:0;else{const Xt=Math.pow(2,-K);Le=Math.floor(Ht.width*Xt),Re=Math.floor(Ht.height*Xt),E.isDataArrayTexture?Oe=Ht.depth:E.isData3DTexture?Oe=Math.floor(Ht.depth*Xt):Oe=1,Ge=0,at=0,ct=0}Y!==null?(We=Y.x,Je=Y.y,Vt=Y.z):(We=0,Je=0,Vt=0);const Tt=be.convert(G.format),sn=be.convert(G.type);let Ie;G.isData3DTexture?(te.setTexture3D(G,0),Ie=O.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(te.setTexture2DArray(G,0),Ie=O.TEXTURE_2D_ARRAY):(te.setTexture2D(G,0),Ie=O.TEXTURE_2D),v.activeTexture(O.TEXTURE0),v.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),v.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),v.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment);const dn=v.getParameter(O.UNPACK_ROW_LENGTH),Mt=v.getParameter(O.UNPACK_IMAGE_HEIGHT),vn=v.getParameter(O.UNPACK_SKIP_PIXELS),bn=v.getParameter(O.UNPACK_SKIP_ROWS),Yn=v.getParameter(O.UNPACK_SKIP_IMAGES);v.pixelStorei(O.UNPACK_ROW_LENGTH,Ht.width),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ht.height),v.pixelStorei(O.UNPACK_SKIP_PIXELS,Ge),v.pixelStorei(O.UNPACK_SKIP_ROWS,at),v.pixelStorei(O.UNPACK_SKIP_IMAGES,ct);const Ei=E.isDataArrayTexture||E.isData3DTexture,Pt=G.isDataArrayTexture||G.isData3DTexture;if(E.isDepthTexture){const Xt=Z.get(E),On=Z.get(G),Dt=Z.get(Xt.__renderTarget),Zn=Z.get(On.__renderTarget);v.bindFramebuffer(O.READ_FRAMEBUFFER,Dt.__webglFramebuffer),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let wi=0;wi<Oe;wi++)Ei&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Z.get(E).__webglTexture,K,ct+wi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Z.get(G).__webglTexture,Ae,Vt+wi)),O.blitFramebuffer(Ge,at,Le,Re,We,Je,Le,Re,O.DEPTH_BUFFER_BIT,O.NEAREST);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||Z.has(E)){const Xt=Z.get(E),On=Z.get(G);v.bindFramebuffer(O.READ_FRAMEBUFFER,X),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,B);for(let Dt=0;Dt<Oe;Dt++)Ei?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Xt.__webglTexture,K,ct+Dt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Xt.__webglTexture,K),Pt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,On.__webglTexture,Ae,Vt+Dt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,On.__webglTexture,Ae),K!==0?O.blitFramebuffer(Ge,at,Le,Re,We,Je,Le,Re,O.COLOR_BUFFER_BIT,O.NEAREST):Pt?O.copyTexSubImage3D(Ie,Ae,We,Je,Vt+Dt,Ge,at,Le,Re):O.copyTexSubImage2D(Ie,Ae,We,Je,Ge,at,Le,Re);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Pt?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Ie,Ae,We,Je,Vt,Le,Re,Oe,Tt,sn,Ht.data):G.isCompressedArrayTexture?O.compressedTexSubImage3D(Ie,Ae,We,Je,Vt,Le,Re,Oe,Tt,Ht.data):O.texSubImage3D(Ie,Ae,We,Je,Vt,Le,Re,Oe,Tt,sn,Ht):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Ae,We,Je,Le,Re,Tt,sn,Ht.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Ae,We,Je,Ht.width,Ht.height,Tt,Ht.data):O.texSubImage2D(O.TEXTURE_2D,Ae,We,Je,Le,Re,Tt,sn,Ht);v.pixelStorei(O.UNPACK_ROW_LENGTH,dn),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Mt),v.pixelStorei(O.UNPACK_SKIP_PIXELS,vn),v.pixelStorei(O.UNPACK_SKIP_ROWS,bn),v.pixelStorei(O.UNPACK_SKIP_IMAGES,Yn),Ae===0&&G.generateMipmaps&&O.generateMipmap(Ie),v.unbindTexture()},this.initRenderTarget=function(E){Z.get(E).__webglFramebuffer===void 0&&te.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?te.setTextureCube(E,0):E.isData3DTexture?te.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?te.setTexture2DArray(E,0):te.setTexture2D(E,0),v.unbindTexture()},this.resetState=function(){$=0,q=0,se=null,v.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=St._getDrawingBufferColorSpace(e),t.unpackColorSpace=St._getUnpackColorSpace()}}const rr=new L;function Dn(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;rr.copy(e),rr[n]=0,rr.normalize();const l=.5*a/(a+c),u=1-rr.angleTo(i)/o;return Math.sign(rr[t])===1?u*l:c/(a+c)+l+l*(1-u)}class Ua extends kt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new L,l=new L,u=new L(e,t,n).divideScalar(2).subScalar(r),f=this.attributes.position.array,h=this.attributes.normal.array,d=this.attributes.uv.array,g=f.length/6,_=new L,m=.5/a;for(let p=0,y=0;p<f.length;p+=3,y+=2)switch(o.fromArray(f,p),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[p+0]=u.x*Math.sign(o.x)+l.x*r,f[p+1]=u.y*Math.sign(o.y)+l.y*r,f[p+2]=u.z*Math.sign(o.z)+l.z*r,h[p+0]=l.x,h[p+1]=l.y,h[p+2]=l.z,Math.floor(p/g)){case 0:_.set(1,0,0),d[y+0]=Dn(_,l,"z","y",r,n),d[y+1]=1-Dn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),d[y+0]=1-Dn(_,l,"z","y",r,n),d[y+1]=1-Dn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),d[y+0]=1-Dn(_,l,"x","z",r,e),d[y+1]=Dn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),d[y+0]=1-Dn(_,l,"x","z",r,e),d[y+1]=1-Dn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),d[y+0]=1-Dn(_,l,"x","y",r,e),d[y+1]=1-Dn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),d[y+0]=Dn(_,l,"x","y",r,e),d[y+1]=1-Dn(_,l,"y","x",r,t);break}}static fromJSON(e){return new Ua(e.width,e.height,e.depth,e.segments,e.radius)}}const du={type:"change"},Xl={type:"start"},mh={type:"end"},ia=new Da,pu=new pi,A_=Math.cos(70*uf.DEG2RAD),rn=new L,Sn=2*Math.PI,zt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bo=1e-6;class R_ extends Pd{constructor(e,t=null){super(e,t),this.state=zt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cs.ROTATE,MIDDLE:Cs.DOLLY,RIGHT:Cs.PAN},this.touches={ONE:Ts.ROTATE,TWO:Ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Si,this._lastTargetPosition=new L,this._quat=new Si().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hc,this._sphericalDelta=new Hc,this._scale=1,this._panOffset=new L,this._rotateStart=new j,this._rotateEnd=new j,this._rotateDelta=new j,this._panStart=new j,this._panEnd=new j,this._panDelta=new j,this._dollyStart=new j,this._dollyEnd=new j,this._dollyDelta=new j,this._dollyDirection=new L,this._mouse=new j,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=P_.bind(this),this._onPointerDown=C_.bind(this),this._onPointerUp=D_.bind(this),this._onContextMenu=B_.bind(this),this._onMouseWheel=N_.bind(this),this._onKeyDown=U_.bind(this),this._onTouchStart=F_.bind(this),this._onTouchMove=O_.bind(this),this._onMouseDown=L_.bind(this),this._onMouseMove=I_.bind(this),this._interceptControlDown=z_.bind(this),this._interceptControlUp=k_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(du),this.update(),this.state=zt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;rn.copy(t).sub(this.target),rn.applyQuaternion(this._quat),this._spherical.setFromVector3(rn),this.autoRotate&&this.state===zt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Sn:n>Math.PI&&(n-=Sn),s<-Math.PI?s+=Sn:s>Math.PI&&(s-=Sn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(rn.setFromSpherical(this._spherical),rn.applyQuaternion(this._quatInverse),t.copy(this.target).add(rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=rn.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ia.origin.copy(this.object.position),ia.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ia.direction))<A_?this.object.lookAt(this.target):(pu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ia.intersectPlane(pu,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>bo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bo||this._lastTargetPosition.distanceToSquared(this.target)>bo?(this.dispatchEvent(du),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){rn.setFromMatrixColumn(t,0),rn.multiplyScalar(-e),this._panOffset.add(rn)}_panUp(e,t){this.screenSpacePanning===!0?rn.setFromMatrixColumn(t,1):(rn.setFromMatrixColumn(t,0),rn.crossVectors(this.object.up,rn)),rn.multiplyScalar(e),this._panOffset.add(rn)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;rn.copy(s).sub(this.target);let r=rn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new j,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function C_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function P_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function D_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(mh),this.state=zt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function L_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=zt.DOLLY;break;case Cs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=zt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=zt.ROTATE}break;case Cs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=zt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=zt.PAN}break;default:this.state=zt.NONE}this.state!==zt.NONE&&this.dispatchEvent(Xl)}function I_(i){switch(this.state){case zt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case zt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function N_(i){this.enabled===!1||this.enableZoom===!1||this.state!==zt.NONE||(i.preventDefault(),this.dispatchEvent(Xl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(mh))}function U_(i){this.enabled!==!1&&this._handleKeyDown(i)}function F_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ts.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=zt.TOUCH_ROTATE;break;case Ts.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=zt.TOUCH_PAN;break;default:this.state=zt.NONE}break;case 2:switch(this.touches.TWO){case Ts.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=zt.TOUCH_DOLLY_PAN;break;case Ts.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=zt.TOUCH_DOLLY_ROTATE;break;default:this.state=zt.NONE}break;default:this.state=zt.NONE}this.state!==zt.NONE&&this.dispatchEvent(Xl)}function O_(i){switch(this._trackPointer(i),this.state){case zt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case zt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case zt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case zt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=zt.NONE}}function B_(i){this.enabled!==!1&&i.preventDefault()}function z_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function k_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class V_ extends zu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new kt;e.deleteAttribute("uv");const t=new pe({side:yn}),n=new pe,s=new bd(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Ue(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Df(e,n,6),c=new tn;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new Ue(e,Es(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new Ue(e,Es(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new Ue(e,Es(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new Ue(e,Es(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const h=new Ue(e,Es(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);const d=new Ue(e,Es(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Es(i){return new xd({color:0,emissive:16777215,emissiveIntensity:i})}const Sl=1.8,Xi=.75,ws=.9;function H_(i,e={}){const t=new T_({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=ur,t.outputColorSpace=un,t.toneMapping=wl,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new zu;r.background=new lt(n?12377333:14672872),r.fog=n?new Ma(12377333,60*s,160*s):new Ma(14672872,4*s,9*s);const a=new xl(t),c=a.fromScene(new V_,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new An(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new L(...e.cameraPosition??[0,.5,1.45]),u=new L(...e.target??[0,.3,0]);o.position.copy(l);const f=new R_(o,t.domElement);f.target.copy(u),f.enableDamping=!0,f.dampingFactor=.08,f.enablePan=!1,f.minDistance=e.minDistance??.5,f.maxDistance=e.maxDistance??3,f.maxPolarAngle=Math.PI/2.05,f.minAzimuthAngle=-Math.PI/2.2,f.maxAzimuthAngle=Math.PI/2.2,f.update();const h=new Qt;h.scale.setScalar(s),r.add(h);let d=null;n?(q_(h),Y_(h)):(G_(h),d=W_(h,!!e.cupboard)),s!==1&&h.traverse(F=>{if(!(F instanceof Ta)||!F.castShadow)return;const k=F.shadow.camera;k.left*=s,k.right*=s,k.top*=s,k.bottom*=s,k.near*=s,k.far*=s,k.updateProjectionMatrix(),F.shadow.normalBias*=s});const g=[],_=new Ad;let m=0;const p=F=>{m=requestAnimationFrame(p),_.update(F);const k=Math.min(1,_.getDelta());if(g.forEach(X=>X(k)),b){b.t=Math.min(1,b.t+k/.7);const X=b.t<.5?2*b.t*b.t:1-Math.pow(-2*b.t+2,2)/2;o.position.lerpVectors(b.fromPos,b.toPos,X),f.target.lerpVectors(b.fromTarget,b.toTarget,X),b.t>=1&&(b=null)}f.update(),$_(r,o,t.domElement.clientHeight),t.render(r,o)};m=requestAnimationFrame(p);let y=null,S=null,M=null,T=!1,b=null;f.addEventListener("start",()=>{T=!0,b=null});const C=new ResizeObserver(()=>{const F=i.clientWidth,k=i.clientHeight;!F||!k||(t.setSize(F,k),o.aspect=F/k,o.updateProjectionMatrix(),y&&!T&&(S!==null?x(y,S,{dir:M||void 0}):w(y)))});C.observe(i);function x(F,k=.7,X={}){if(F.isEmpty())return;y=F.clone(),S=k,T=!1;const B=F.getCenter(new L),$=(X.dir?X.dir.clone():l.clone().sub(u)).normalize();M=$.clone();const q=o.position.clone(),se=f.target.clone(),ue=[0,1,2,3,4,5,6,7].map(Ze=>new L(Ze&1?F.max.x:F.min.x,Ze&2?F.max.y:F.min.y,Ze&4?F.max.z:F.min.z)),ge=Ze=>(o.position.copy(B).addScaledVector($,Ze),o.lookAt(B),o.updateMatrixWorld(!0),ue.every(gt=>{const je=gt.clone().project(o);return je.z<1&&Math.abs(je.x)<=k&&Math.abs(je.y)<=k}));let me=.01,_e=f.maxDistance*4;for(let Ze=0;Ze<40;Ze++){const gt=(me+_e)/2;ge(gt)?_e=gt:me=gt}if(f.maxDistance=Math.max(f.maxDistance,_e*1.5),u.copy(B),l.copy(B).addScaledVector($,_e),X.animate){o.position.copy(q),o.lookAt(se),b={fromPos:q,toPos:l.clone(),fromTarget:se,toTarget:u.clone(),t:0};return}b=null,o.position.copy(l),f.target.copy(u),f.update()}function w(F){if(F.isEmpty())return;y=F.clone(),S=null,T=!1;const k=F.getCenter(new L),X=F.getSize(new L),B=o.fov*Math.PI/180,$=2*Math.atan(Math.tan(B/2)*o.aspect),q=Math.max(X.x/2/Math.tan($/2),Math.max(X.y,X.z*.6)/2/Math.tan(B/2))*1.12+X.z*.25,se=l.clone().sub(u).normalize(),ue=Math.min(f.maxDistance,Math.max(f.minDistance,q));u.copy(k),l.copy(k).addScaledVector(se,ue),o.position.copy(l),f.target.copy(u),f.update()}const D=new j;let U=null;if(d){const F=d;g.push(k=>{F.doors.forEach(X=>{const B=X.userData.open?X.userData.openAngle:0;X.rotation.y+=(B-X.rotation.y)*Math.min(1,k*7)})}),U={doors:F.doors,blockers:F.blockers,bays:F.bays.map(k=>({minX:k.minX*s,maxX:k.maxX*s,levels:k.levels.map(X=>X*s),frontZ:k.frontZ*s,backZ:k.backZ*s})),toggleDoor:k=>{k.userData.open=!k.userData.open},isOpen:k=>!!k.userData.open,doorOf:k=>{let X=k;for(;X&&!X.userData.cupboardDoor;)X=X.parent;return X}}}return{cupboard:U,renderer:t,scene:r,camera:o,controls:f,canvas:t.domElement,onFrame:F=>{g.push(F)},resetView:()=>{o.position.copy(l),f.target.copy(u),f.update()},frameBox:w,fitBox:x,toNdc:F=>{const k=t.domElement.getBoundingClientRect();return D.set((F.clientX-k.left)/k.width*2-1,-((F.clientY-k.top)/k.height)*2+1),D},dispose:()=>{cancelAnimationFrame(m),C.disconnect(),f.dispose(),r.traverse(F=>{var k;(F instanceof Ue||F instanceof Uf||F instanceof Wn)&&((k=F.geometry)==null||k.dispose(),(Array.isArray(F.material)?F.material:[F.material]).forEach(B=>{var $;($=B.map)==null||$.dispose(),B.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function G_(i){i.add(new sh(16119807,9080729,.55));const e=new Ta(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new Ta(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}function W_(i,e=!1){const t=Aa(512,512,(h,d,g)=>{h.fillStyle="#b9bec6",h.fillRect(0,0,d,g);for(let _=0;_<1200;_++)h.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,h.fillRect(Math.random()*d,Math.random()*g,3,3);h.strokeStyle="rgba(70,74,82,0.35)",h.lineWidth=3,h.strokeRect(0,0,d,g)});t.wrapS=t.wrapT=_i,t.repeat.set(12,12);const n=new Ue(new si(14,14),new pe({map:t,roughness:.85}));n.rotation.x=-Math.PI/2,n.position.y=-ws,n.receiveShadow=!0,i.add(n);const s=new Ue(new si(14,5),new pe({color:15659250,roughness:.95}));s.position.set(0,1.6,-Xi/2-.25),s.receiveShadow=!0,i.add(s);const r=Aa(256,256,(h,d,g)=>{h.fillStyle="#f7f8f9",h.fillRect(0,0,d,g),h.strokeStyle="#c9ced4",h.lineWidth=4,h.strokeRect(0,0,d,g)});r.wrapS=r.wrapT=_i,r.repeat.set(40,4);const a=new Ue(new si(6,.6),new pe({map:r,roughness:.3,metalness:0}));a.position.set(0,.3,-Xi/2-.249),i.add(a);const c=new Ue(new Ua(Sl,.035,Xi,3,.008),new wa({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));c.position.y=-.0175,c.receiveShadow=!0,c.castShadow=!0,i.add(c);const o=Z_();if(e)return X_(i,o);const l=new Ue(new kt(Sl-.06,ws-.035,Xi-.06),new pe({map:o,roughness:.7}));l.position.y=-ws/2-.0175,l.receiveShadow=!0,i.add(l);const u=new pe({color:3877404,roughness:.8}),f=gh.steel();for(const h of[-.6,0,.6]){const d=new Ue(new kt(.004,ws-.12,.002),u);d.position.set(h,-ws/2-.02,(Xi-.06)/2+.001),i.add(d)}for(const h of[-.66,-.54,-.06,.06,.54,.66]){const d=new Ue(new Q(.006,.006,.1,12),f);d.position.set(h,-.2,(Xi-.06)/2+.015),i.add(d)}return null}function X_(i,e){const t=Sl-.06,n=Xi-.06,s=.018,r=-.035,a=-ws,c=r-a,o=n/2,l=-n/2,u=new pe({map:e,roughness:.7}),f=new pe({color:15195336,roughness:.8}),h=[],d=(D,U,F,k,X,B,$)=>{const q=new Ue(new kt(D,U,F),$);return q.position.set(k,X,B),q.castShadow=!0,i.add(q),h.push(q),q},g=a+.06;d(s,c,n,-t/2+s/2,a+c/2,0,u),d(s,c,n,t/2-s/2,a+c/2,0,u),d(t,c,s,0,a+c/2,l+s/2,f),d(s,c,n-s,0,a+c/2,s/2,f),d(t,s,n,0,g-s/2,0,f),d(t,.06,s,0,a+.03,o-.03,u),d(t,.04,s,0,r-.02,o-s/2,u);const _=-.46,m=t/2-s*1.5;d(m,s,n-s,-t/4,_-s/2,s/2,f),d(m,s,n-s,t/4,_-s/2,s/2,f);const p=r-.04,y=g-s,S=p-y-.002,M=t/2-.0025,T=new pe({map:e,roughness:.65}),b=gh.steel(),C=[];[[-t/2,1],[t/2,-1]].forEach(([D,U],F)=>{const k=new Qt;k.position.set(D+U*.001,(p+y)/2,o+s/2);const X=new Ue(new kt(M,S,s),T);X.position.x=U*M/2,X.castShadow=!0,k.add(X);const B=new Ue(new Q(.006,.006,.1,12),b);B.position.set(U*(M-.045),-.2-k.position.y,s/2+.015),k.add(B);for(const $ of[B.position.y-.05,B.position.y+.05]){const q=new Ue(new Q(.004,.004,.016,8),b);q.rotation.x=Math.PI/2,q.position.set(B.position.x,$,s/2+.008),k.add(q)}k.userData.cupboardDoor=!0,k.userData.bay=F,k.userData.open=!1,k.userData.openAngle=-U*1.95,i.add(k),C.push(k)});const w=(D,U)=>({minX:D,maxX:U,levels:[g,_],frontZ:o-.02,backZ:l+s});return{doors:C,blockers:h,bays:[w(-t/2+s,-s/2),w(s/2,t/2-s)]}}function q_(i){i.add(new sh(14675967,6126138,.8));const e=new Ta(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function Y_(i){const e=Aa(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const u=60+Math.random()*70;a.fillStyle=`rgba(${u*.6},${u+40},${u*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=_i,e.repeat.set(80,80);const t=new Ue(new si(300,300),new pe({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new Ue(new si(80,.1),new pe({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new pe({color:5980976,roughness:.9}),r=new pe({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new Ue(new Q(.25,.35,3,8),s);l.position.set(c,1.5,o);const u=new Ue(new Wt(2.2+a%3*.5,12,10),r);u.position.set(c,4.2+a%2,o),i.add(l,u)}}function Z_(){return Aa(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function Aa(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new La(n);return s.colorSpace=un,s.anisotropy=16,s}function K_(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new La(s);o.colorSpace=un;const l=new Wn(new Is({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const u=e/700*.73;return l.scale.set(u*l.userData.aspect,u,1),l}const Eo=new L,wo=new L;function $_(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(Eo).project(e),c.getWorldPosition(wo).project(e);const o=Math.abs(Eo.y-wo.y)*t/2+Math.abs(Eo.x-wo.x)*t/2;s.visible=o>r*1.25})}const gh={steel:()=>new pe({color:13094097,metalness:1,roughness:.28}),chrome:()=>new pe({color:15133164,metalness:1,roughness:.12}),brass:()=>new pe({color:13936715,metalness:1,roughness:.22}),castIron:()=>new pe({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new pe({color:1776928,roughness:.5}),glass:()=>new pe({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},ut=(i=15857397)=>new wa({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:$t,depthWrite:!1}),Tn=i=>new pe({color:i,roughness:.45,metalness:.15}),mt=(i=13094097)=>new pe({color:i,roughness:.28,metalness:1}),wt=()=>new pe({color:15133164,roughness:.12,metalness:1}),jn=()=>new pe({color:13936715,roughness:.22,metalness:1}),Ot=i=>new pe({color:i,roughness:.5,metalness:.05}),jt=i=>new pe({color:i,roughness:.35,metalness:.1}),Jn=()=>new pe({color:10119233,roughness:.7}),qe=(i,e,t,n=Math.min(i,e,t)*.12)=>new Ua(i,e,t,3,n);function P(i,e,t=0,n=0,s=0){const r=new Ue(i,e);return r.position.set(t,n,s),r}function en(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new La(n);return s.colorSpace=un,s.anisotropy=16,s}function Li(i,e,t,n){const s=new Qt;return s.add(P(new Q(.018,.022,.05,16),jn(),0,.025,0)),s.add(P(new Q(.026,.026,.03,16),Ot(n),0,.06,0)),s.position.set(i,e,t),s}function Ln(i,e,t,n=.55){const s=e*.85,r=new Ue(new Q(i*.9,i*.9,s,40),new pe({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const J_={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function mu(i,e,t,n){const s=J_[n.hazard],r=en(512,256,(c,o,l)=>{c.fillStyle="#fffdf6",c.fillRect(0,0,o,l),c.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",c.fillRect(0,0,o,34),c.fillStyle="#ffffff",c.font="bold 24px sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),c.fillStyle="#111827";const u=String(n.display_name||"Reagent").split(" "),f=[];let h="";c.font="bold 40px sans-serif",u.forEach(g=>{const _=h?`${h} ${g}`:g;c.measureText(_).width>o-40&&h?(f.push(h),h=g):h=_}),f.push(h);const d=f.slice(0,2);d.forEach((g,_)=>c.fillText(g,o/2,(n.formula?86:110)+_*46-(d.length-1)*10)),n.formula&&(c.font="bold 54px serif",c.fillStyle="#1e3a8a",c.fillText(String(n.formula),o/2,212)),c.strokeStyle="#cbd5e1",c.lineWidth=4,c.strokeRect(2,2,o-4,l-4)}),a=P(new Q(i,i,e,32,1,!0,-1.05,2.1),new pe({map:r,roughness:.85,side:$t}),0,t);return a.userData.role="reagent_label",a}function sa(i,e,t,n){const s=en(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let u=1;u<=l;u++){const f=o-u/(l+1)*o;a.fillRect(0,f,u%5===0?44:24,u%5===0?4:2)}}),r=new Ue(new Q(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new Fs({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function ra(i){const e=en(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new Wn(new Is({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function gu(i,e){return en(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const u=c+l/50*o,f=l%10===0;t.lineWidth=f?4:1.5;const h=f?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(u)*h,r+Math.sin(u)*h),t.lineTo(s+Math.cos(u)*(a-16),r+Math.sin(u)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const u=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(u)*(a-82),r+Math.sin(u)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function _h(i){return en(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function Ra(i,e="#22c55e"){return en(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function _u(){return en(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function j_(){return en(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const To=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function Q_(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[To[n],To[s],To[r],"#d4af37"]}class Ao extends Xn{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new L){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function vu(i,e,t,n={}){const s=new Qt;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const u=[new j(0,.004),new j(.301,.004),new j(.315,.03),new j(.33949999999999997,.58),new j(.357,.6),new j(.364,.612)];r(new Ue(new di(u,48),ut()));const f=P(new Vn(.045,.07,3),ut(),.35*1,.6-.015,0);f.rotation.z=-Math.PI/2,r(f,sa(.35*.95,.06,.6*.72,4),Ln(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const u=P(new Q(.12,.12,.55,32,1,!0),ut(),0,.375),f=P(new Wt(.12,32,16,0,Math.PI*2,0,Math.PI/2),ut(),0,.1);f.rotation.x=Math.PI;const h=P(new Gt(.12*1.02,.012,10,32),ut(),0,.55+.1);h.rotation.x=Math.PI/2;const d=P(qe(.34,.08,.34,.02),Jn(),0,.04);r(u,f,h,d,Ln(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const u=P(new Q(.06,.06,1.1,32,1,!0),ut(),0,.7000000000000001),f=P(new Q(.06*1.25,.06*1.25,.1,24),ut(15660799),0,.1),h=P(qe(.16,.03,.035,.012),Ot(1920728),.09,.1),d=P(new Q(.03,.01,.1,16,1,!0),ut(),0,.02),g=P(new Q(.2,.22,.04,32),jt(3099491),0,.02);r(u,f,h,d,g,sa(.06,.2,1.1*.85,10),Ln(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=P(new Q(.018,.008,.3,16),ut(),0,.2),l=P(new Wt(.055,24,16),ut(),0,.42);l.scale.y=1.8;const u=P(new Q(.018,.018,.3,16),ut(),0,.68),f=P(new Gt(.02,.003,6,20),new Fs({color:1120295}),0,.74);f.rotation.x=Math.PI/2;const h=P(new Wt(.075,24,16),Ot(12131356),0,.9);h.scale.y=1.25;const d=P(qe(.22,.07,.18,.02),Jn(),0,.035);r(o,l,u,f,h,d);break}case"measuring_cylinder":{const u=P(new Q(.18,.17099999999999999,.8,40,1,!0),ut(),0,.44),f=P(new Q(.18*1.6,.18*1.7,.05,6),ut(15266293),0,.025),h=P(new Vn(.035,.06,3),ut(),.18,.8+.03,0);h.rotation.z=-Math.PI/2,r(u,f,h,sa(.18*.97,.12,.8*.8,5),Ln(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new pe({color:1920728,roughness:.45,metalness:.2}),l=[new j(0,.005),new j(.27,.005),new j(.272,.018),new j(.2,.05),new j(.11,.1),new j(.075,.13),new j(0,.13)],u=new Ue(new di(l,56),o),f=P(new Q(.068,.07,.11,36),o,0,.175),h=en(128,16,(x,w,D)=>{x.fillStyle="#d4d4d8",x.fillRect(0,0,w,D),x.fillStyle="#71717a";for(let U=0;U<w;U+=4)x.fillRect(U,0,1.5,D)});h.wrapS=_i,h.repeat.set(3,1);const d=P(new Q(.052,.052,.075,40),new pe({map:h,roughness:.3,metalness:1}),0,.268),g=P(new Q(.066,.066,.03,6),wt(),0,.32),_=P(new Q(.06,.06,.012,40),wt(),0,.341),m=P(new Q(.048,.048,.28,36,1,!0),wt(),0,.485),p=P(new Q(.042,.042,.004,28),new pe({color:4144966,roughness:.8}),0,.6),y=P(new Gt(.046,.004,8,32),wt(),0,.625);y.rotation.x=Math.PI/2;const S=new Qt,M=P(new Q(.032,.032,.2,24),wt(),0,.1);S.add(M);for(let x=0;x<3;x++)S.add(P(new Q(.03,.036,.025,24),wt(),0,.215+x*.03));S.add(P(new Q(.02,.02,.004,20),new pe({color:2565930}),0,.29)),S.rotation.z=Math.PI/2+.12,S.position.set(-.05,.16,0),r(u,f,d,g,_,m,p,y,S);const T=n.flame==="on",b=P(new Vn(.09,.3,24),new pe({color:16751933,emissive:16738816,emissiveIntensity:T?1:0,transparent:!0,opacity:T?.75:0,depthWrite:!1}),0,.77);b.userData.role="flame";const C=P(new Vn(.045,.16,16),new pe({color:6333946,emissive:2450411,emissiveIntensity:T?1.3:0,transparent:!0,opacity:T?.85:0,depthWrite:!1}),0,.7);C.userData.role="flame",r(b,C);break}case"thermometer":{const o=en(256,1690,(p,y,S)=>{p.fillStyle="#fbfbf8",p.fillRect(0,0,y,S),p.fillStyle="#0f172a",p.textAlign="left",p.textBaseline="middle";const M=S-250,T=S-400;for(let b=0;b<=100;b+=2){const C=M-b/100*T,x=b%10===0;p.fillRect(y-(x?90:50),C-(x?3:1.5),x?90:50,x?6:3),x&&(p.font=`900 ${b%50===0?62:52}px Arial, sans-serif`,p.fillText(String(b),10,C))}p.font="700 44px Arial, sans-serif",p.fillText("°C",14,M-T-70)}),l=P(qe(.1,.66,.02,.008),new pe({map:o,roughness:.5}),0,.45,-.025),u=P(new Q(.022,.022,.62,24),ut(16777215),0,.45),f=P(new Q(.008,.008,.45,12),new pe({color:14427686,roughness:.2}),0,.32),h=P(new Wt(.05,24,24),new pe({color:14427686,roughness:.2}),0,.1),d=P(new Wt(.065,24,24),ut(16777215),0,.1),g=P(qe(.26,.04,.2,.015),jt(3099491),0,.02);r(l,u,f,h,d,g);const _=p=>.78-(1440-p*12.9)/1690*.66;let m;for(const p of[0,25,50,75,100]){const y=K_(`${p}°`,12,p%50===0?void 0:m);y.center.set(0,.5),y.position.set(.065,_(p),-.02),r(y),p%50===0&&(m=y)}break}case"battery":{const o=en(512,256,(g,_,m)=>{g.fillStyle="#111827",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,_,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,_/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",_/2,m*.9)}),l=Ot(2042167),u=P(qe(.6,.3,.3,.035),[l,l,l,l,new pe({map:o,roughness:.5}),l],0,.15),f=Li(.2,.3,0,14427686),h=Li(-.2,.3,0,1118481),d=new Wn(new Is({map:_h(n.voltage||6),depthTest:!1,transparent:!0}));d.scale.set(.34,.136,1),d.position.set(0,.58,0),d.renderOrder=9,d.userData.role="voltage",r(u,f,h,d);break}case"ruler":{const u=new pe({color:15381256,roughness:.6}),f=new pe({map:_u(),roughness:.55});r(P(new kt(1.5,.015,.16),[u,u,f,u,u,u],0,.0075));break}case"bulb":{const o=n.state==="on",l=P(new Wt(.18,32,32),new wa({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const u=P(new Gt(.05,.006,8,24,Math.PI*1.7),new pe({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);u.rotation.x=Math.PI/2,u.userData.role="led";const f=P(new Q(.095,.11,.16,24),jn(),0,.12),h=new Qt;for(let g=0;g<5;g++){const _=P(new Gt(.1,.006,6,24),jn(),0,.06+g*.028);_.rotation.x=Math.PI/2,h.add(_)}const d=P(qe(.4,.04,.26,.015),Jn(),0,.02);r(l,u,f,h,d,Li(-.15,.04,.07,14427686),Li(.15,.04,.07,1118481));break}case"switch":{const o=P(qe(.4,.06,.2,.012),Jn(),0,.03),l=P(new Q(.02,.02,.1,16),jn(),-.12,.11),u=P(qe(.05,.06,.05,.008),jn(),.12,.09),f=P(new Q(.012,.012,.24,16),wt()),h=n.state==="closed";f.position.set(h?0:-.06,.16,0),f.rotation.z=h?Math.PI/2-.35:Math.PI/2-.9,f.userData.role="lever",f.add(P(new Wt(.028,16,12),Ot(1118481),0,-.13,0)),r(o,l,u,f);break}case"resistor":{const o=en(256,64,(g,_,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,_,m),Q_(n.resistance_ohm).forEach((p,y)=>{g.fillStyle=p,g.fillRect(60+y*34+(y===3?22:0),0,16,m)})}),l=P(new Q(.07,.07,.32,32),new pe({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const u=P(new Q(.01,.01,.52,10),mt(13948120),0,.2);u.rotation.z=Math.PI/2;const f=P(qe(.6,.04,.2,.012),Ot(15195332),0,.02),h=P(new Q(.012,.012,.16,10),mt(13948120),-.26,.12),d=h.clone();d.position.x=.26,r(l,u,f,h,d);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=P(qe(.42,.4,.18,.03),jt(o?1981066:8330525),0,.2),u=P(new Gt(.155,.015,12,48),wt(),0,.2,.091),f=P(new Yi(.15,48),new pe({map:gu(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),h=P(new Vn(.012,.13,8),Tn(14427686),.02,.2,.1);h.rotation.z=-Math.PI/2+.6,h.userData.role="needle";const d=P(new Wt(.014,12,12),mt(2565930),0,.2,.1);r(l,u,f,h,d,Li(-.12,.4,0,14427686),Li(.12,.4,0,1118481));break}case"microscope":{const o=jt(15659250),l=jt(2040616);r(P(qe(.36,.06,.47,.02),o,0,.03,-.05)),r(P(qe(.1,.28,.1,.02),o,0,.19,-.22));const u=new Yu([new L(0,.27,-.23),new L(0,.55,-.23),new L(0,.74,-.14),new L(0,.8,-.03)]);r(new Ue(new Ji(u,24,.044,12,!1),o));const f=P(new Q(.035,.035,.01,24),new pe({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);f.userData.role="led",r(P(new Q(.045,.05,.05,24),l,0,.085),f),r(P(qe(.3,.022,.28,.006),l,0,.32));for(const h of[-.08,.08])r(P(new kt(.016,.004,.11),wt(),h,.333,.03));r(P(new Q(.036,.036,.25,24),l,0,.7)),r(P(new Q(.025,.03,.11,24),l,0,.88)),r(P(new Q(.056,.06,.033,32),wt(),0,.565)),[14427686,15381256,2450411].forEach((h,d)=>{const g=new Qt;g.position.y=.55,g.rotation.y=2*Math.PI*d/3;const _=new Qt;_.position.z=.03,_.rotation.x=.35,_.add(P(new Q(.015,.012,.07+d*.015,16),wt(),0,-.04-d*.008)),_.add(P(new Q(.0158,.0158,.008,16),Ot(h),0,-.03)),g.add(_),r(g)});for(const h of[-1,1]){const d=P(new Q(.05,.05,.028,24),l,h*.08,.25,-.22);d.rotation.z=Math.PI/2;const g=P(new Q(.025,.025,.028,20),l,h*.11,.25,-.22);g.rotation.z=Math.PI/2,r(d,g)}break}case"lens":{const o=P(new Wt(.22,40,40),ut(15988991),0,.42);o.scale.set(1,1,.22);const l=P(new Gt(.22,.02,16,48),mt(10265519),0,.42),u=P(new Q(.015,.015,.2,12),mt(),0,.1),f=P(new Q(.12,.14,.03,32),jt(3099491),0,.015);r(o,l,u,f);break}case"mirror":{const o=P(qe(.4,.5,.02,.006),[mt(4674921),mt(4674921),mt(4674921),mt(4674921),new pe({color:16777215,metalness:1,roughness:.03}),mt(4674921)],0,.3,0),l=P(qe(.36,.06,.12,.012),Jn(),0,.03,-.02);r(o,l);break}case"biological_model":{const o=P(new kt(.5,.012,.18),ut(14742270),0,.006),l=P(new kt(.14,.003,.14),ut(15857397),0,.014),u=P(new Yi(.045,32),new pe({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);u.rotation.x=-Math.PI/2;const f=P(new kt(.12,.014,.17),Ot(16317180),-.18,.007);r(o,l,u,f);break}case"wire":{const o=new Ue(new Ji(new Ao(.12,.15,5),240,.012,8,!1),new pe({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=P(new Q(.135,.135,.14,24),Ot(3621201),0,.08);r(l,o);break}case"water_container":{const u=P(new Q(.255,.3,.75,48,1,!0),ut(),0,.375),f=P(new Yi(.3,48),ut(),0,.003);f.rotation.x=-Math.PI/2;const h=P(new Gt(.14,.02,12,32,Math.PI*1.3),ut(),.3*.85,.75*.6);h.rotation.z=Math.PI/2,r(u,f,h,Ln(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),u=P(new Q(.025,.025,l,24),mt(10265519),0,.025);u.rotation.z=Math.PI/2;const f=P(new Wt(.025,16,16),mt(7434618),-l/2,.025),h=f.clone();h.position.x=l/2,r(u,f,h);break}case"balance":{const o=P(qe(.55,.1,.42,.03),jt(15067115),0,.05),l=P(new Q(.16,.16,.015,40),wt(),0,.11,.02),u=P(new Q(.03,.03,.02,16),mt(),0,.1,.02),f=P(qe(.3,.07,.05,.012),Ot(2042167),0,.07,.2),h=new Wn(new Is({map:Ra("0.0 g"),depthTest:!1,transparent:!0}));h.scale.set(.3,.135,1),h.position.set(0,.24,.2),h.renderOrder=9,h.userData.role="balance_display",r(o,l,u,f,h);break}case"stopwatch":{const o=P(new Q(.13,.13,.045,48),jt(2042167),0,.16);o.rotation.x=Math.PI/2;const l=P(new Gt(.13,.01,10,48),wt(),0,.16),u=P(new Q(.022,.022,.04,16),wt(),0,.305),f=P(new Gt(.025,.006,8,20),wt(),0,.34),h=P(qe(.18,.03,.12,.01),Ot(3621201),0,.015),d=new Wn(new Is({map:Ra("00:00.0"),depthTest:!1,transparent:!0}));d.scale.set(.2,.09,1),d.position.set(0,.16,.03),d.renderOrder=9,d.userData.role="stopwatch_display",r(o,l,u,f,h,d);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,u=o*.05,f=(o+l*1.6)*.05,h=new Ue(new Ji(new Ao(f,.05,22),440,.007,6,!1),new pe({color:13094097,roughness:.25,metalness:1}));h.userData.role="spring_body",h.userData.naturalLengthUnits=u,h.userData.maxLengthUnits=f,h.scale.y=u/f,h.position.y=.85-f*h.scale.y/2;const d=P(new Gt(.03,.008,8,20),mt(7434618),0,.85),g=P(new Q(.05,.05,.015,24),mt(5395035));g.userData.role="spring_hanger",g.position.y=.85-f*h.scale.y,r(h,d,g);break}case"retort_stand":{const o=jt(3099491);r(P(qe(.36,.035,.24,.012),o,0,.0175)),r(P(new Q(.016,.016,.95,20),mt(),-.13,.5)),r(P(qe(.07,.07,.07,.01),o,-.13,.9));const l=P(new Q(.01,.01,.07,10),mt(),-.13,.9,.06);l.rotation.x=Math.PI/2;const u=P(new Q(.012,.012,.3,16),mt(),.03,.9);u.rotation.z=Math.PI/2,r(l,u,P(qe(.04,.05,.05,.008),jn(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),u=.04+Math.min(.06,o/3e3),f=en(256,256,(d,g)=>{d.fillStyle="#4a525c",d.fillRect(0,0,g,g),d.fillStyle="#1f2328",d.beginPath(),d.arc(g/2,g/2,22,0,Math.PI*2),d.fill(),d.fillRect(g/2-9,g/2,18,g/2),d.fillStyle="#f1f5f9",d.font="bold 58px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText(`${o}g`,g/2,g/2-62)}),h=jt(4870748);h.metalness=.5,r(P(new Q(l,l,u,36),[h,new pe({map:f,metalness:.4,roughness:.5}),h],0,u/2));break}case"ray_box":{const o=n.state==="on",l=P(qe(.35,.22,.28,.03),jt(2042167),0,.11),u=P(new kt(.2,.16,.012),Ot(988970),0,.11,.145),f=P(new kt(.02,.12,.02),new pe({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);f.userData.role="led";const h=P(new Q(.012,.012,.3,10),Ot(1120295),0,.03,-.29);h.rotation.x=Math.PI/2,r(l,u,f,h);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(P(qe(o,.1,.55,.01),ut(14676223),0,.05));break}case"projectile_launcher":{const o=new pe({color:2962235,metalness:.6,roughness:.4});r(P(qe(.5,.05,.36,.015),o,0,.025));for(const d of[-.09,.09])r(P(qe(.1,.22,.02,.006),o,0,.14,d));const l=new Qt;l.position.y=.22,l.rotation.z=Math.PI/4;const u=P(new Q(.05,.055,.45,28),new pe({color:1920728,metalness:.5,roughness:.35}),.17,0);u.rotation.z=-Math.PI/2;const f=P(new Gt(.053,.011,12,28),wt(),.39,0);f.rotation.y=Math.PI/2;const h=P(new Q(.018,.018,.22,16),mt());h.rotation.x=Math.PI/2,l.add(u,f,h),r(l);break}case"projectile":{r(P(new Gt(.05,.012,10,28),Ot(3621201),0,.012)),r(P(new Wt(.07,32,20),new pe({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=P(new Q(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new pe({map:j_(),transparent:!0,opacity:.92,roughness:.3,side:$t}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,u=.62,f=.085,h=[new j(0,.004),new j(l*.96,.004),new j(l,.03),new j(f+.01,u*.7),new j(f,u*.76),new j(f,u-.02),new j(f+.012,u),new j(f+.012,u+.012)],d=o?new wa({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:$t,depthWrite:!1}):ut();r(new Ue(new di(h,56),d));const g=en(512,512,(S,M,T)=>{S.clearRect(0,0,M,T),S.fillStyle="#ffffff",S.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([C,x])=>{S.fillRect(M*.6,T*C,M*.13,5),S.font="bold 34px Arial",S.fillText(x,M*.76,T*C+12)}),S.fillRect(M*.63,T*.64,M*.07,4),S.font="bold 40px Arial",S.fillText("250 ml",M*.12,T*.52),S.fillRect(M*.14,T*.58,M*.2,T*.09),S.save(),S.translate(M*.56,T*.86),S.rotate(-Math.PI/2),S.font="bold 22px Arial",S.fillText("APPROX. VOL",0,0),S.restore()}),_=.03,m=u*.7,p=new Ue(new di([new j(l*1.006,_),new j((f+.01)*1.006,m)],24,-.75,1.5),new Fs({map:g,transparent:!0,depthWrite:!1,side:$t}));r(p);const y=new Ue(new Q(.11,l*.94,u*.66,48),new pe({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));y.userData.role="liquid",y.userData.maxFillHeight=u*.66,y.scale.y=.001,r(y);break}case"round_bottom_flask":{const o=P(new Wt(.28,40,28),ut(),0,.36),l=P(new Q(.07,.07,.34,28,1,!0),ut(),0,.78),u=P(new Gt(.2,.025,12,40),Ot(3621201),0,.05);u.rotation.x=Math.PI/2;const f=new Qt;f.position.y=.14,f.add(Ln(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,u,f);break}case"evaporating_dish":{const o=[new j(0,.01),new j(.12,.012),new j(.26,.09),new j(.3,.13)];r(new Ue(new di(o,48),new pe({color:16317180,roughness:.25,side:$t})));const l=new Qt;l.position.y=.012,l.add(Ln(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=P(new Gt(.3,.02,12,48),mt(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const u=l/3*Math.PI*2,f=P(new Q(.018,.018,.82,12),mt(5395035),Math.cos(u)*.34,.4,Math.sin(u)*.34);f.rotation.z=Math.cos(u)*-.08,f.rotation.x=Math.sin(u)*.08,r(f)}break}case"wire_gauze":{const o=en(256,256,(l,u,f)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,u,f),l.strokeStyle="#4b5563",l.lineWidth=2;for(let h=0;h<u;h+=10)l.beginPath(),l.moveTo(h,0),l.lineTo(h,f),l.moveTo(0,h),l.lineTo(u,h),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(u/2,f/2,u*.28,0,Math.PI*2),l.fill()});r(P(new kt(.62,.008,.62),new pe({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=P(new Q(.26,.03,.32,40,1,!0),ut(),0,.52),l=P(new Q(.025,.02,.32,20,1,!0),ut(),0,.2),u=P(new Vn(.22,.27,32,1,!0),new pe({color:16777215,roughness:.9,side:$t}),0,.53);u.rotation.x=Math.PI,r(o,l,u);break}case"test_tube_rack":{const o=P(qe(.9,.04,.24,.01),Jn(),0,.3),l=P(qe(.9,.04,.24,.01),Jn(),0,.02),u=P(qe(.04,.3,.24,.01),Jn(),-.43,.16),f=u.clone();f.position.x=.43,r(o,l,u,f);const h=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let d=0;d<4;d++){const g=-.3+d*.2;r(P(new Q(.055,.055,.42,20,1,!0),ut(),g,.25)),r(P(new Q(.05,.05,.12,20),new pe({color:h[d],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=P(qe(.32,.008,.05,.003),wt(),.16,.006),l=P(new Wt(.04,20,10,0,Math.PI*2,0,Math.PI/2),wt(),-.18,.04);l.rotation.x=Math.PI;const u=P(new Q(.008,.008,.18,12),wt(),-.06,.008);u.rotation.z=Math.PI/2,r(o,l,u);break}case"wash_bottle":{const o=P(new Q(.17,.18,.5,36),new pe({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=P(new Q(.07,.09,.08,24),Ot(2450411),0,.54),u=P(new Q(.012,.012,.3,10),Ot(2450411),.08,.66);u.rotation.z=-.9,r(o,l,u,Ln(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const u=[new j(0,.003),new j(.188,.003),new j(.2,.03),new j(.2,.56),new j(.16000000000000003,.64),new j(.07,.6900000000000001),new j(.065,.75),new j(.072,.76)];r(new Ue(new di(u,40),ut())),r(Ln(.2*.97,.56,n.color||"#eef6f8",.78));const f=P(new Q(.06,.055,.07,24),ut(15266031),0,.56+.22),h=P(new Q(.09,.09,.035,28),ut(15266031),0,.56+.27);r(f,h,mu(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(P(new Q(.21,.21,.46,40,1,!0),ut(),0,.46/2+.005)),r(P(new Q(.21,.21,.01,40),ut(),0,.005));const u=.46*.62,f=P(new Q(.21*.95,.21*.95,u,40),new pe({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,u/2+.01),h=P(new Q(.21*1.04,.21*1.04,.07,40),Ot(2042167),0,.46+.035);r(f,h,mu(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=P(new Q(.02,.008,.36,16),ut(),0,.24),l=P(new Wt(.045,20,14),Ot(1120295),0,.46);l.scale.y=1.6;const u=P(new Q(.1,.1,.22,28),new pe({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,u);break}case"crucible":{const o=[new j(0,.005),new j(.08,.005),new j(.13,.2),new j(.14,.21)],l=new pe({color:16119284,roughness:.3,side:$t});r(new Ue(new di(o,40),l));const u=P(new Q(.15,.15,.015,40),l,.32,.008),f=P(new Wt(.025,16,12),l,.32,.025);r(u,f);break}case"bar_magnet":{r(P(qe(.3,.08,.1,.01),jt(14427686),-.15,.04),P(qe(.3,.08,.1,.01),jt(1920728),.15,.04));const o=ra("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=ra("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(P(new Q(.12,.12,.04,40),jn(),0,.02)),r(P(new Q(.105,.105,.002,40),new pe({color:16777215}),0,.041));const o=new Qt,l=P(new Vn(.018,.09,4),Tn(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const u=P(new Vn(.018,.09,4),Tn(2042167),0,0,.045);u.rotation.x=Math.PI/2,o.add(l,u),o.position.y=.05,o.userData.role="needle",r(o,P(new Q(.11,.11,.012,40),ut(),0,.06));break}case"prism":{const o=new or;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new Rs(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new Ue(l,ut(14742270)));break}case"rheostat":{const o=new pe({color:6054233,roughness:.75,metalness:.45}),l=new pe({color:14925716,roughness:.6}),u=new pe({color:1118481,roughness:.35}),f=.2,h=.79,d=en(64,64,(S,M,T)=>{S.fillStyle="#1a1a1a",S.fillRect(0,0,M,T);for(let b=0;b<T;b+=4)S.fillStyle="#3a3a3a",S.fillRect(0,b,M,1),S.fillStyle="#050505",S.fillRect(0,b+2,M,1)});d.wrapS=d.wrapT=_i,d.repeat.set(1,18);const g=P(new Q(.125,.125,1.24,48),new pe({map:d,roughness:.4,metalness:.6}),0,f);g.rotation.z=Math.PI/2,r(g);for(const S of[-1,1]){const M=P(new Q(.12,.12,.1,40),l,S*.67,f),T=P(new Q(.129,.129,.035,40),wt(),S*.635,f),b=P(new Q(.1,.1,.05,32),o,S*.745,f);for(const D of[M,T,b])D.rotation.z=Math.PI/2;r(M,T,b);const C=new or;C.moveTo(-.17,0),C.lineTo(.17,0),C.lineTo(.09,.42),C.lineTo(-.09,.42),C.closePath();const x=new Rs(C,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});x.translate(0,0,-.015);const w=new Ue(x,o);w.rotation.y=Math.PI/2,w.position.x=S*h,r(w);for(const D of[-.2,.2]){const U=P(qe(.1,.025,.09,.008),o,S*(h-S*.04),.0125,D),F=P(new Q(.018,.018,.027,16),new pe({color:2042167}),S*(h-S*.04),.0125,D);r(U,F)}r(P(qe(.05,.03,.06,.006),wt(),S*.6,f-.15,.06)),r(P(new Q(.014,.014,.02,12),mt(10265519),S*.6,f-.125,.06))}const _=(S,M,T,b)=>{const C=new Qt,x=P(new Q(.012,.012,.04,12),jn(),b*.02,0,0);x.rotation.z=Math.PI/2;const w=P(new Q(.03,.03,.06,18),u,b*.065,0,0);w.rotation.z=Math.PI/2;for(let D=0;D<9;D++){const U=P(new kt(.06,.006,.006),u,b*.065,Math.cos(D*.7)*.03,Math.sin(D*.7)*.03);C.add(U)}return C.add(x,w),C.position.set(S,M,T),C};r(_(h+.02,.32,.03,1),_(h+.02,.1,.03,1),_(-h-.02,.2,.06,-1));const m=P(new Q(.012,.016,.05,12),jn(),h+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(P(new kt(h*2,.035,.035),wt(),0,.395,-.02));const p=new Qt,y=en(128,128,(S,M,T)=>{S.fillStyle="#111111",S.fillRect(0,0,M,T),S.fillStyle="#e5e7eb",S.font="bold 26px Arial",S.textAlign="center",S.save(),S.translate(30,T/2),S.rotate(-Math.PI/2),S.fillText("11",0,-4),S.fillText("5",0,22),S.restore()});p.add(P(qe(.13,.08,.13,.015),[u,u,new pe({map:y,roughness:.35}),u,u,u],0,.41,-.01)),p.add(P(qe(.12,.09,.05,.012),u,0,.34,.05));for(const S of[-.035,.025])p.add(P(new Q(.017,.017,.006,20),wt(),.02,.453,S));p.position.x=.05,p.userData.role="slider",r(p);break}case"dry_cell":{const o=en(512,256,(_,m,p)=>{_.fillStyle="#d61f26",_.fillRect(0,0,m,p),_.fillStyle="#f5c518",_.fillRect(0,0,m,10),_.fillRect(0,p-10,m,10);const y=m*.25;_.textAlign="center",_.font="italic bold 40px Georgia",_.fillStyle="#fde68a",_.fillText("Power Cell",y,52),_.fillStyle="#f59e0b",_.beginPath(),_.arc(y,118,40,0,Math.PI*2),_.fill(),_.fillStyle="#7c2d12",_.font="bold 44px Arial",_.fillText("+",y,134),_.fillStyle="#fde68a",_.font="bold 22px Arial",_.fillText("SUPER QUALITY",y,190),_.fillStyle="#ffffff",_.font="bold 24px Arial",_.fillText("BATTERY",y,218),_.fillText("1.5V",y,242),_.fillStyle="#fde68a",_.font="bold 30px Arial",_.fillText("1.5V  DRY CELL",m*.75,p/2+10)});o.wrapS=_i,o.offset.x=.25;const l=.09,u=.32,f=P(new Q(l,l,u,48,1,!0),new pe({map:o,roughness:.35}),0,u/2+.006),h=P(new Q(l*.98,l*.98,.012,48),wt(),0,u+.006),d=P(new Q(.03,.032,.025,24),wt(),0,u+.024),g=P(new Q(l*.98,l*.98,.012,48),mt(10265519),0,.006);r(f,h,d,g);break}case"accumulator":{const o=en(1024,768,(p,y,S)=>{p.fillStyle="#f8fafc",p.fillRect(0,0,y,S),p.fillStyle="#1d4ed8",p.strokeStyle="#1d4ed8",p.textAlign="center",p.font="bold 44px Arial",p.fillText("UPPER LEVEL",y/2,70),p.fillRect(y*.08,90,y*.84,6),p.fillText("LOWER LEVEL",y/2,170),p.fillRect(y*.08,190,y*.84,6),p.fillRect(y*.06,250,y*.88,12),p.fillRect(y*.06,280,y*.4,300),p.fillStyle="#ffffff",p.font="bold 120px Arial",p.fillText("12V",y*.26,440),p.font="bold 34px Arial",p.fillText("LEAD-ACID",y*.26,520),p.fillStyle="#1d4ed8",p.font="bold 110px Arial",p.fillText("NS60",y*.7,400),p.font="bold 56px Arial",p.fillText("12V / 45AH",y*.7,480),p.font="bold 34px Arial",p.fillText("ACCUMULATOR",y*.7,545),p.fillRect(y*.06,600,y*.88,10)}),l=new pe({color:15857145,roughness:.55}),u=new pe({color:1920728,roughness:.4}),f=P(qe(.9,.62,.55,.03),[l,l,l,l,new pe({map:o,roughness:.5}),l],0,.31),h=P(qe(.94,.09,.59,.025),u,0,.665),d=P(qe(.96,.03,.61,.01),u,0,.625),g=P(qe(.16,.055,.03,.008),u,0,.66,.3);r(f,h,d,g);const _=new pe({color:16436245,roughness:.45});for(let p=0;p<6;p++){const y=-.35+p*.14;r(P(new Q(.045,.045,.02,24),u,y,.72,-.12)),r(P(new Q(.036,.04,.05,8),_,y,.75,-.12)),r(P(new Q(.026,.026,.012,16),_,y,.781,-.12))}const m=new pe({color:9146260,roughness:.5,metalness:.7});for(const[p,y]of[[-.38,"+"],[.38,"-"]]){r(P(new Q(.06,.06,.03,28),u,p,.725,.12)),r(P(new Q(.026,.032,.09,20),m,p,.785,.12));const S=ra(y);S.scale.set(.16,.035,1),S.position.set(p,.86,.12),r(S)}break}case"metre_rule":{const o=new pe({color:14066524,roughness:.6}),l=new pe({map:_u(),color:16113331,roughness:.55});r(P(new kt(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=P(qe(.42,.3,.2,.03),jt(1976635),0,.15),l=P(new Yi(.13,40,0,Math.PI),new pe({map:gu("G","#1d4ed8")}),0,.12,.101),u=P(new kt(.006,.12,.004),Tn(14427686),0,.18,.105);u.userData.role="needle",r(o,l,u,Li(-.12,.3,0,14427686),Li(.12,.3,0,1120295));break}case"tuning_fork":{const o=P(new kt(.03,.4,.03),wt(),-.04,.42),l=o.clone();l.position.x=.04;const u=P(new Gt(.04,.015,10,20,Math.PI),wt(),0,.22);u.rotation.z=Math.PI;const f=P(new Q(.015,.015,.14,12),wt(),0,.12),h=P(qe(.24,.05,.14,.01),Jn(),0,.025);r(o,l,u,f,h);break}case"pulley":{const o=P(new Q(.15,.15,.05,40),mt(10265519),0,.9);o.rotation.x=Math.PI/2;const l=P(new Gt(.15,.015,10,40),Ot(3621201),0,.9),u=P(qe(.06,.12,.08,.01),mt(5395035),0,1.08),f=P(new Q(.012,.012,1.1,12),mt(),-.3,.55),h=P(new Q(.01,.01,.3,12),mt(),-.15,1.08);h.rotation.z=Math.PI/2;const d=P(qe(.36,.03,.24,.01),jt(2042167),-.3,.015),g=P(new Q(.003,.003,.6,6),Ot(16119284),.15,.6);r(o,l,u,f,h,d,g,P(new Q(.05,.05,.1,20),jn(),.15,.25));break}case"petri_dish":{r(P(new Q(.22,.22,.05,48,1,!0),ut(),0,.025)),r(P(new Q(.22,.22,.004,48),ut(),0,.002)),r(P(new Q(.21,.21,.02,48),new pe({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,u=.05+o%3*.04;r(P(new Q(.02+o%2*.01,.02,.006,16),Tn(16317180),Math.cos(l)*u,.025,Math.sin(l)*u))}break}case"hand_lens":{const o=P(new Wt(.14,32,32),ut(15988991),0,.03);o.scale.set(1,.16,1);const l=P(new Gt(.14,.018,12,48),Ot(1120295),0,.03);l.rotation.x=Math.PI/2;const u=P(qe(.3,.035,.05,.012),Ot(1120295),.29,.03);r(o,l,u);break}case"scalpel":{const o=P(qe(.32,.02,.035,.006),wt(),0,.012),l=new or;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const u=new Ue(new Rs(l,{depth:.003,bevelEnabled:!1}),wt());u.rotation.x=-Math.PI/2,u.position.set(.16,.02,.02),r(o,u);break}case"forceps":{for(const o of[-1,1]){const l=P(qe(.36,.012,.03,.004),wt(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(P(qe(.05,.016,.08,.006),wt(),-.18,.012));break}case"dissecting_tray":{r(P(qe(.9,.08,.6,.03),jt(2042167),0,.04)),r(P(new kt(.82,.01,.52),new pe({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(P(new Q(.006,.006,.06,8),wt(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(P(new Q(.16,.16,.5,36,1,!0),ut(),0,.25)),r(P(new Q(.17,.17,.06,36),Ot(1013358),0,.53)),r(P(new Q(.161,.161,.18,36,1,!0,-.6,1.2),new pe({color:16777215,roughness:.8,side:$t}),0,.3)),r(Ln(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=P(new Q(.22,.16,.3,32),jt(11817737),0,.15),l=P(new Q(.2,.2,.02,32),Tn(4139549),0,.29),u=P(new Q(.015,.02,.5,10),Tn(1409085),0,.54);r(o,l,u);const f=new pe({color:2278750,roughness:.5,side:$t});for(let h=0;h<6;h++){const d=P(new Wt(.09,16,10),f,0,.42+h*.07);d.scale.set(1.4,.15,.6),d.rotation.y=h*2.1,d.position.x=Math.cos(h*2.1)*.08,d.position.z=-Math.sin(h*2.1)*.08,r(d)}break}case"soil_sieve":{const o=P(new Q(.4,.4,.14,48,1,!0),new pe({color:10576391,roughness:.6,side:$t}),0,.07),l=en(256,256,(f,h,d)=>{f.clearRect(0,0,h,d),f.strokeStyle="#6b7280",f.lineWidth=2;for(let g=0;g<h;g+=8)f.beginPath(),f.moveTo(g,0),f.lineTo(g,d),f.moveTo(0,g),f.lineTo(h,g),f.stroke()}),u=P(new Yi(.39,48),new pe({map:l,transparent:!0,metalness:.6,side:$t}),0,.03);u.rotation.x=-Math.PI/2,r(o,u);for(let f=0;f<14;f++){const h=f*2.4,d=f%4*.08;r(P(new zl(.025+f%3*.01),Tn(7893356),Math.cos(h)*d,.05,Math.sin(h)*d))}break}case"rain_gauge":{const o=P(new Q(.2,.06,.16,36,1,!0),mt(13358561),0,1),l=P(new Q(.2,.2,.08,36,1,!0),mt(13358561),0,1.12),u=P(new Q(.1,.1,.9,32,1,!0),ut(),0,.47),f=P(new Q(.03,.01,.1,12),mt(5395035),0,.01);r(o,l,u,f,sa(.1,.1,.75,5),Ln(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=P(new Q(.22,.25,.42,36),jt(1483594),0,.21),l=P(new Q(.025,.04,.6,16),jt(1483594),.4,.4);l.rotation.z=-.95;const u=P(new Q(.07,.04,.06,20),mt(10265519),.64,.58);u.rotation.z=-.95;const f=P(new Gt(.18,.022,10,32,Math.PI),jt(1409085),0,.42);r(o,l,u,f,Ln(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(P(qe(.9,.12,.55,.02),Ot(1120295),0,.06)),r(P(new kt(.84,.02,.49),Tn(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const u=-.35+o*.14,f=-.15+l*.15;r(P(new Q(.004,.004,.08,6),Tn(1483594),u,.16,f));const h=P(new Wt(.022,10,8),Tn(2278750),u,.2,f);h.scale.set(1.6,.3,.8),r(h)}break}case"garden_trowel":{const o=P(new Wt(.12,24,12,0,Math.PI,0,Math.PI/2),mt(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=P(new Q(.012,.012,.1,10),mt(),0,.03);l.rotation.z=Math.PI/2;const u=P(new Q(.03,.03,.24,16),Jn(),-.17,.03);u.rotation.z=Math.PI/2,r(o,l,u);break}case"hand_hoe":{const o=new Qt,l=new pe({color:13213802,roughness:.6}),u=new pe({color:1842980,roughness:.45,metalness:.6}),f=P(new Q(.03,.034,1.6,20),l,.85,0);f.rotation.z=Math.PI/2;const h=P(new Q(.05,.05,.14,24),u,.05,0);h.rotation.z=Math.PI/2;const d=P(qe(.05,.14,.05,.01),u,0,-.09),g=new or;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const _=new Rs(g,{depth:.014,bevelEnabled:!1}),m=new Ue(_,new pe({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const p=P(new kt(.016,.04,.28),new pe({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(f,h,d,m,p),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new Qt,l=new pe({color:14729103,roughness:.55}),u=new pe({color:2303531,roughness:.5,metalness:.6}),f=P(new Q(.045,.036,1.3,20),l,.72,0);f.rotation.z=Math.PI/2;const h=P(qe(.16,.11,.11,.012),u,.06,0),d=P(qe(.03,.09,.08,.006),wt(),.16,0),g=P(qe(.05,.05,.24,.01),u,0,-.07);o.add(f,h,d,g);for(const _ of[-.09,0,.09]){const m=P(qe(.04,.5,.025,.008),u,0,-.33,_),p=P(new Vn(.016,.07,4),new pe({color:11844032,roughness:.25,metalness:1}),0,-.61,_);p.rotation.z=Math.PI,o.add(m,p)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=P(new Q(.02,.02,1.2,12),mt(7041664),0,.75),l=P(new Q(.025,.025,.5,12),mt(7041664),0,1.35);l.rotation.z=Math.PI/2;const u=new Ue(new Ji(new Ao(.3,.05,4),200,.012,6,!1),mt(10265519));u.position.y=.15,r(o,l,u,P(new Q(.25,.25,.04,32),Tn(5978660),0,.02));break}case"soil_sample":{r(P(qe(.7,.08,.45,.02),Ot(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,u)=>{const f=P(new Wt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new pe({color:l,roughness:1}),-.22+u*.22,.08);f.scale.y=.55,r(f)});break}case"safety_goggles":{for(const o of[-1,1]){const l=P(new Wt(.085,24,16),new pe({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const u=P(new Gt(.085,.014,10,32),Ot(1013358),o*.1,.08);r(l,u)}r(P(new Gt(.2,.012,8,40,Math.PI),Ot(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=P(new Q(.01,.01,.5,10),mt(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(P(new Gt(.03,.008,8,20),mt(7041664),.26,.015));break}case"heat_proof_mat":{r(P(qe(.8,.03,.8,.01),new pe({color:15197668,roughness:.95}),0,.015));break}default:r(P(qe(.3,.3,.3,.03),Tn(10265519),0,.15))}s.traverse(o=>{o instanceof Ue&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new ai;s.children.forEach(o=>{o instanceof Wn||a.expandByObject(o)});const c=ra(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function xu(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new Ue(new Ji(new Hl(t,s,n),32,.014,8,!1),new pe({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const vh=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],ev=vh.flat(),tv=i=>ev.find(e=>e.id===i);function nv(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const iv=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",sv={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},rv={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},av={class:"space-y-1"},ov=["onClick"],lv={class:"truncate"},cv={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},uv={class:"flex items-center justify-between gap-2 mb-2"},hv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},fv={class:"flex flex-wrap gap-1.5"},dv=["onClick"],pv={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},mv={class:"flex items-center gap-2"},gv={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},_v={class:"text-xs font-medium text-gray-400 ml-1"},vv={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},xv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Mv=["max"],yv={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Sv={class:"flex flex-wrap gap-1.5"},bv=["onClick"],Ev={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},wv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},Tv={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},Av={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},Rv={class:"flex gap-1.5"},Cv=["onClick"],Pv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Dv=["value"],Lv={class:"flex items-center justify-between"},Iv={class:"flex gap-1.5"},Nv={key:0,class:"pt-1"},Uv={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},Fv={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},Ov={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Bv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},zv={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},kv={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Vv={class:"flex flex-wrap gap-1.5"},Hv={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},Gv={class:"text-center"},Wv={class:"flex items-center gap-2 flex-shrink-0"},Xv={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},qv={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},Yv={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},Zv=["max"],Kv={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},$v={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},Jv={class:"flex items-start justify-between gap-2"},jv={class:"text-xs text-gray-700 dark:text-gray-200"},Qv={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},ex=.9,Mu=5,rx=xh({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean}},emits:["takeChemical","putBack","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=yt(null),a=yt(!1);let c,o,l,u;const f=new Map,h=new Cd,d=new j,g=new pi(new L(0,1,0),0),_=yt(null),m=yt(null),p=yt(null),y=yt(null);let S=!1,M=0;const T={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},b=A=>{if(D.value==="stopwatch"){if(A==="switch_on")return"Start";if(A==="switch_off")return"Stop";if(A==="measure")return"Read Time"}if(D.value==="microscope"){if(A==="switch_on")return"Light On";if(A==="switch_off")return"Light Off";if(A==="inspect")return"Observe"}return T[A]||A},C=()=>new Map(n.objectCatalog.map(A=>[A.object_type,A])),x=yt([]),w=yt(""),D=yt(null),U=yt(null),F=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],k=["battery","dry_cell","accumulator"],X=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],B=new Map,$=new Map,q=new Map,se=new Map,ue=yt([...n.connections||[]]),ge=yt(null),me=yt(null),_e=yt(""),Ze=yt(0),gt=yt(100),je=yt(null),ne=yt(!1),ve=yt(null),he=yt(null),Ne=yt(null),Ke=new Map,Ve=new Map,_t=new Map,Qe=yt(50),le=yt(40),fe=yt("very_blurred"),de=yt(!1),we=yt(!1),Me=new Map,Ye=new Map,Be=new Map,et=yt(0),nt=yt(0),O=yt(!1);let bt=[];const dt={very_blurred:10,blurred:5,almost_focused:2,focused:0};function R(A){he.value=A,je.value="protractor",m.value="measure"}const v=yt(null),W=yt([]);function Z(A){const I=C().get(A.object_type),N={...(I==null?void 0:I.default_props)||{},...A.props||{}},V=vu(A.object_type,A.key,N.display_name||(I==null?void 0:I.display_name)||A.object_type,N);if(V.position.set(A.position.x,A.position.y,A.position.z),A.rotation&&(V.rotation.y=A.rotation.y),o.add(V),f.set(A.key,V),F.includes(A.object_type)){const H=xe(A.object_type,N);B.set(A.key,H),ee(A.key,H/Number(N.capacity_ml??250))}k.includes(A.object_type)&&$.set(A.key,Number(N.voltage??6))}function te(A){if(n.readOnly)return;const I=W.value.findIndex(V=>V.key===A);if(I===-1)return;const N=W.value[I];Z(N),W.value.splice(I,1),s("action",{objectKey:A,action:"move",value:A})}function ae(A){const I=n.sceneObjects.find(V=>V.key===A);if(!I)return{};const N=C().get(I.object_type);return{...(N==null?void 0:N.default_props)||{},...I.props||{}}}function xe(A,I){return I.current_volume!==void 0?Number(I.current_volume):X.includes(A)?Number(I.capacity_ml??50):0}function ee(A,I){const N=f.get(A);if(!N)return;const V=Math.max(.001,Math.min(1,I));N.traverse(H=>{if(H instanceof Ue&&H.userData.role==="liquid"){const oe=H.userData.maxFillHeight;H.scale.y=V,H.position.y=oe*V/2}})}function re(A){const I=new Set([A]),N=[A];for(;N.length;){const V=N.shift();ue.value.forEach(H=>{H.from===V&&!I.has(H.to)&&(I.add(H.to),N.push(H.to)),H.to===V&&!I.has(H.from)&&(I.add(H.from),N.push(H.from))})}return I}function Ee(A){const I=n.sceneObjects.find(Kt=>k.includes(Kt.object_type)),N=n.sceneObjects.find(Kt=>Kt.object_type==="switch"),V=n.sceneObjects.find(Kt=>Kt.object_type==="resistor"),H=n.sceneObjects.find(Kt=>Kt.key===A);if(!H)return{value:0,reason:null};if(!I||!N||!V)return{value:0,reason:"The circuit is incomplete. Check your connections."};const oe=re(I.key),De=oe.has(N.key),it=oe.has(V.key),st=oe.has(A),Et=q.get(N.key)==="on";if(De&&Et&&!it)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!De||!it)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((q.get(I.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!Et)return{value:0,reason:"Close the switch before taking the reading."};if(!st)return H.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:H.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const Ct=$.get(I.key)??ae(I.key).voltage??6,pt=ae(V.key).resistance_ohm??10,At=Ct/pt;return H.object_type==="ammeter"?{value:Math.round(At*100)/100,reason:null}:H.object_type==="voltmeter"?{value:Ct,reason:null}:{value:0,reason:null}}function He(A){const I=se.get(A);if(!I)return 25;const N=(Date.now()-I)/1e3;return Math.min(100,Math.round(25+N*3.5))}function Te(A,I){const N=f.get(A),V=f.get(I);if(!N||!V)return{ok:!1};if(N.position.distanceTo(V.position)>ex)return{ok:!1};const H=Ye.has(I)?Number(ae(I).natural_length_cm??15)+(Ye.get(I)??0):ae(I).length_cm??ae(I).natural_length_cm??10,oe=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((H+oe)*10)/10}}function Se(A){const I=Ke.get(A);if(!I)return"very_blurred";const N=Number(ae(I).optimal_focus??50),V=Number(ae(I).focus_tolerance??6),H=_t.get(A)??40,oe=V*(40/H),De=Ve.get(A)??0,it=Math.abs(De-N);return it<=oe?"focused":it<=oe*2?"almost_focused":it<=oe*4?"blurred":"very_blurred"}function ze(A){_.value===A&&(Qe.value=Ve.get(A)??50,le.value=_t.get(A)??40,de.value=q.get(A)==="on",we.value=Ke.has(A),fe.value=Se(A))}function $e(A){_.value&&(_t.set(_.value,A),s("action",{objectKey:_.value,action:"select_objective",value:String(A)}),ze(_.value))}function rt(A){_.value&&(Ve.set(_.value,A),s("action",{objectKey:_.value,action:"focus_coarse",value:String(Math.round(A))}),ze(_.value))}function z(A){if(!_.value)return;const I=_.value,N=Math.max(0,Math.min(100,(Ve.get(I)??50)+A));Ve.set(I,N),s("action",{objectKey:I,action:"focus_fine",value:String(N)}),ze(I)}function ye(A){const N=[...Me.get(A)??new Set].reduce((Ct,pt)=>Ct+Number(ae(pt).mass_g??0),0),V=Number(ae(A).spring_constant_n_per_m??40),oe=N/1e3*9.8/V*100,De=Number(ae(A).max_safe_extension_cm??12),it=Be.get(A)??0,st=oe>De;st&&it===0&&Be.set(A,(oe-De)*.3);const Et=oe+(Be.get(A)??0);return Ye.set(A,Math.round(Et*100)/100),ie(A,Et),_.value===A&&(nt.value=N,et.value=Math.round(Et*100)/100,O.value=st),{totalMassG:N,exceeded:st}}function ie(A,I){const N=f.get(A);N&&N.traverse(V=>{if(V instanceof Ue&&V.userData.role==="spring_body"){const H=V.userData.naturalLengthUnits,oe=V.userData.maxLengthUnits,De=Math.min(oe,H+Math.max(0,I)*.05);V.scale.y=De/oe,V.position.y=.85-oe*V.scale.y/2}if(V.userData.role==="spring_hanger"){const H=[...N.children].find(oe=>oe.userData.role==="spring_body");H&&(V.position.y=.85-H.userData.maxLengthUnits*H.scale.y)}})}function be(A){return new L(Math.sin(A),0,Math.cos(A))}function Ce(A,I){return A.clone().sub(I.clone().multiplyScalar(2*A.dot(I)))}function ce(A,I,N,V){let H=I.clone(),oe=-H.dot(A);oe<0&&(oe=-oe,H=H.clone().negate());const De=N/V,it=De*De*(1-oe*oe);if(it>1)return null;const st=Math.sqrt(1-it);return A.clone().multiplyScalar(De).add(H.clone().multiplyScalar(De*oe-st))}function ke(A,I){const N=f.get(A),V=f.get(I);if(!N||!V)return null;const H=N.position.clone(),oe=be(N.rotation.y),De=be(V.rotation.y),it=oe.dot(De);if(Math.abs(it)<.001)return null;const st=V.position.clone().sub(H).dot(De)/it;if(st<=.05)return null;const Et=H.clone().add(oe.clone().multiplyScalar(st));return Et.distanceTo(V.position)>.35?null:{point:Et,normal:De,incidentDir:oe}}function Fe(){bt.forEach(A=>{o.remove(A),A instanceof Ue&&(A.geometry.dispose(),A.material.dispose())}),bt=[]}function Ft(A,I,N){const V=A.clone().add(I).multiplyScalar(.5),H=Math.max(.01,A.distanceTo(I)),oe=new Ue(new Q(.006,.006,H,8),new pe({color:N,emissive:N,emissiveIntensity:.4,roughness:.4}));oe.position.copy(V);const De=I.clone().sub(A).normalize();return oe.quaternion.copy(new Si().setFromUnitVectors(new L(0,1,0),De)),oe}function Rt(){Fe();const A=n.sceneObjects.find(st=>st.object_type==="ray_box"),I=n.sceneObjects.find(st=>st.object_type==="mirror"),N=n.sceneObjects.find(st=>st.object_type==="glass_block"),V=I||N;if(!A||!V||q.get(A.key)!=="on")return;const H=ke(A.key,V.key);if(!H)return;const oe=f.get(A.key),De=Ft(oe.position,H.point,16498468),it=Ft(H.point.clone().sub(H.normal.clone().multiplyScalar(.01)),H.point.clone().add(H.normal.clone().multiplyScalar(.4)),9741240);if(o.add(De,it),bt.push(De,it),I){const st=Ce(H.incidentDir,H.normal),Et=Ft(H.point,H.point.clone().add(st.multiplyScalar(1.2)),16498468);o.add(Et),bt.push(Et)}else if(N){const st=Number(ae(N.key).refractive_index??1.5),Et=ce(H.incidentDir,H.normal,1,st);if(Et){const Ct=H.point.clone().add(Et.clone().multiplyScalar(.4)),pt=Ft(H.point,Ct,6333946),At=Ft(Ct,Ct.clone().add(H.incidentDir.clone().multiplyScalar(1)),16498468);o.add(pt,At),bt.push(pt,At)}}}function Cn(A,I,N){const V=n.sceneObjects.find(Ct=>Ct.object_type==="ray_box");if(!V)return{ok:!1};const H=ke(V.key,I);if(!H)return{ok:!1};const oe=f.get(A);if(!oe||oe.position.distanceTo(H.point)>.4)return{ok:!1};let De;if(N==="incidence")De=H.incidentDir.clone().negate();else{const Ct=n.sceneObjects.find(pt=>pt.key===I);if((Ct==null?void 0:Ct.object_type)==="glass_block"){const pt=Number(ae(I).refractive_index??1.5),At=ce(H.incidentDir,H.normal,1,pt);if(!At)return{ok:!1};De=At}else De=Ce(H.incidentDir,H.normal)}const it=Math.abs(De.normalize().dot(H.normal)),st=Math.acos(Math.min(1,Math.max(-1,it)))*180/Math.PI,Et=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((st+Et)*10)/10}}const fn=new Map,ts=new Map;function xr(A){const I=f.get(A);if(!I)return;const N=fn.get(A),V=N?Number(ae(N).mass_g??0):0;I.traverse(H=>{var oe;if(H instanceof Wn&&H.userData.role==="balance_display"){const De=H.material;(oe=De.map)==null||oe.dispose(),De.map=Ra(`${V.toFixed(1)} g`),De.needsUpdate=!0}})}const qn=new Map,Bi=new Map,Hs=new Map,Gs=yt("00:00.0");function Ws(A){const I=Math.max(0,A)/1e3,N=Math.floor(I/60).toString().padStart(2,"0"),V=(I%60).toFixed(1).padStart(4,"0");return`${N}:${V}`}function Un(A){const I=Hs.get(A)??0;return qn.get(A)?I+(Date.now()-(Bi.get(A)??Date.now())):I}function zi(A){const I=f.get(A),N=Un(A);_.value===A&&(Gs.value=Ws(N)),I&&I.traverse(V=>{var H;if(V instanceof Wn&&V.userData.role==="stopwatch_display"){const oe=V.material;(H=oe.map)==null||H.dispose(),oe.map=Ra(Ws(N)),oe.needsUpdate=!0}})}function Mr(A){qn.set(A,!1),Hs.set(A,0),Bi.delete(A),zi(A)}function Xs(A){f.forEach((I,N)=>{I.traverse(V=>{if(!(V instanceof Ue)||V.userData.role==="flame"||V.userData.role==="led")return;(Array.isArray(V.material)?V.material:[V.material]).forEach(oe=>{oe instanceof pe&&(oe.emissive.setHex(N===A?2282478:0),oe.emissiveIntensity=N===A?.3:0)})})})}function ns(A){var V;_.value=A,y.value=null,p.value=null;const I=n.sceneObjects.find(H=>H.key===A),N=I?C().get(I.object_type):null;x.value=(N==null?void 0:N.supported_actions)??[],w.value=((V=I==null?void 0:I.props)==null?void 0:V.display_name)??(N==null?void 0:N.display_name)??A,D.value=(I==null?void 0:I.object_type)??null,U.value=(I==null?void 0:I.object_type)==="battery"?$.get(A)??ae(A).voltage??6:null,(I==null?void 0:I.object_type)==="microscope"&&ze(A),(I==null?void 0:I.object_type)==="spring"&&ye(A),Xs(A)}function ki(){_.value=null,y.value=null,ge.value=null,D.value=null,Xs(null)}function is(A){if(!_.value)return;U.value=A,$.set(_.value,A);const I=f.get(_.value);I&&I.traverse(N=>{var V;if(N instanceof Wn&&N.userData.role==="voltage"){const H=N.material;(V=H.map)==null||V.dispose(),H.map=_h(A),H.needsUpdate=!0}})}function yr(A){const I=n.sceneObjects.find(V=>V.key===A);if(!I)return;const N=I.object_type;if(ne.value=!1,ve.value=A,F.includes(N)){ge.value="readonly",_e.value="ml",me.value=Math.round(B.get(A)??0),y.value=A;return}if(N==="ammeter"||N==="voltmeter"){const V=Ee(A);V.reason&&(Ne.value=V.reason,setTimeout(()=>{Ne.value=null},4e3)),ge.value="readonly",_e.value=N==="ammeter"?"A":"V",me.value=V.value,y.value=A,ne.value=!!V.reason&&V.reason.includes("Short circuit");return}if(N==="balance"){ge.value="readonly",_e.value="g";const V=fn.get(A);me.value=V?Number(ae(V).mass_g??0):0,y.value=A;return}if(N==="stopwatch"){ge.value="readonly",_e.value="s",me.value=Math.round(Un(A)/100)/10,y.value=A;return}if(N==="spring"){ge.value="readonly",_e.value="cm";const V=Number(ae(A).natural_length_cm??15);me.value=Math.round((V+(Ye.get(A)??0))*10)/10,y.value=A,ve.value=A;return}if(N==="protractor"){he.value="incidence",je.value="protractor",m.value="measure";return}if(N==="ruler"||N==="metre_rule"||N==="thermometer"){je.value=N==="thermometer"?"thermometer":"ruler",m.value="measure";return}ge.value="slider",_e.value="ml",gt.value=Number(ae(A).capacity_ml??100),Ze.value=Math.round(gt.value/2),y.value=A}function Sr(A){var I;if(_.value&&!n.readOnly&&!(A==="focus_coarse"||A==="focus_fine"||A==="select_objective")){if(A==="inspect"){const N=n.sceneObjects.find(it=>it.key===_.value),V=N?C().get(N.object_type):null;let H=(V==null?void 0:V.description)||"No further detail available.";const oe=(I=N==null?void 0:N.props)!=null&&I.chemical_id?tv(N.props.chemical_id):null;if(oe&&N){const it=oe.hazard?` Hazard: ${oe.hazard} - handle with care and wear goggles.`:"",st=oe.state==="liquid"?` About ${Math.round(B.get(N.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";H=`${oe.name}${oe.formula?` (${oe.formula})`:""}.${st}${it}`}let De=null;if(D.value==="microscope"){const it=_.value,st=Ke.get(it),Et=_t.get(it)??40;if(!st)H="Place a specimen slide on the stage first.";else if(q.get(it)!=="on")H="Switch on the illumination to see anything through the eyepiece.";else{const Ct=Se(it),pt=ae(st).expected_structures||"the specimen";Ct==="focused"?H=`At ×${Et}, clearly focused - you can see ${pt}.`:Ct==="almost_focused"?H=`At ×${Et}, almost in focus - fine-tune the focus a little more.`:Ct==="blurred"?H=`At ×${Et}, blurred - adjust the coarse and fine focus.`:H=`At ×${Et}, very blurred - use the focus knobs before observing.`,De=Ct}}p.value=H,s("action",{objectKey:_.value,action:A,value:De});return}if(A==="zoom"){E(_.value),s("action",{objectKey:_.value,action:A,value:null});return}if(A==="switch_on"||A==="switch_off"){q.set(_.value,A==="switch_on"?"on":"off"),D.value==="stopwatch"&&(A==="switch_on"&&!qn.get(_.value)?(qn.set(_.value,!0),Bi.set(_.value,Date.now())):A==="switch_off"&&qn.get(_.value)&&(Hs.set(_.value,Un(_.value)),qn.set(_.value,!1)),zi(_.value)),D.value==="microscope"&&ze(_.value),D.value==="ray_box"&&Rt(),s("action",{objectKey:_.value,action:A,value:null});return}if(A==="measure"){yr(_.value);return}if(A==="connect"||A==="pour"||A==="heat"||A==="move"||A==="rotate"){m.value=A,u.enabled=A!=="move"&&A!=="rotate";return}}}const Fn=yt("");aa(m,A=>{A==="connect"?Fn.value="Click the object to connect to.":A==="pour"?Fn.value="Click the container to pour into.":A==="heat"?Fn.value="Click the object to place over the flame.":A==="move"?Fn.value="Drag the object to reposition it, then click Done.":A==="rotate"?Fn.value="Drag left/right to rotate, then click Done.":A==="measure"&&je.value==="ruler"?Fn.value="Click the object to measure - place the ruler close to it first.":A==="measure"&&je.value==="thermometer"?Fn.value="Click the substance to take a temperature reading.":A==="measure"&&je.value==="protractor"&&(Fn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function br(){if(!y.value)return;const A=ge.value==="slider"?String(Math.round(Ze.value)):me.value!==null?String(me.value):null;s("action",{objectKey:y.value,action:"measure",value:A,unit:_e.value,label:w.value,safetyIssue:ne.value,targetObjectKey:ve.value}),y.value=null,ge.value=null,me.value=null,ne.value=!1,he.value=null}function Fa(){if(v.value){We();return}m.value=null,je.value=null,he.value=null,u.enabled=!0}function Oa(){var A,I,N;if(!(!_.value||!m.value)){if(m.value==="move"){const V=f.get(_.value);let H=null;V&&f.forEach((pt,At)=>{At!==_.value&&pt.position.distanceTo(V.position)<.6&&(H=At)});const oe=_.value;fn.forEach((pt,At)=>{pt===oe&&At!==H&&(fn.delete(At),xr(At))});const De=H?(A=n.sceneObjects.find(pt=>pt.key===H))==null?void 0:A.object_type:null;De==="balance"&&H&&(fn.set(H,oe),xr(H)),ts.forEach((pt,At)=>{if(At===oe&&pt!==H){const Kt=Number(ae(At).volume_ml??0),Er=Math.max(0,(B.get(pt)??0)-Kt);B.set(pt,Er),ee(pt,Er/Number(ae(pt).capacity_ml??250)),ts.delete(At)}});const it=Number(ae(oe).volume_ml??0);if(De&&F.includes(De)&&H&&it>0&&!ts.has(oe)){ts.set(oe,H);const pt=(B.get(H)??0)+it;B.set(H,pt),ee(H,pt/Number(ae(H).capacity_ml??250))}const st=(I=n.sceneObjects.find(pt=>pt.key===oe))==null?void 0:I.object_type;if(Ke.forEach((pt,At)=>{pt===oe&&At!==H&&Ke.delete(At)}),De==="microscope"&&H&&st==="biological_model"){Ke.set(H,oe);const pt=Number(ae(oe).optimal_focus??50),At=Number(ae(oe).focus_tolerance??6),Kt=Math.random()<.5?-1:1,Er=At*(3+Math.random()*3)*Kt;Ve.set(H,Math.max(0,Math.min(100,pt+Er))),_t.set(H,40),ze(H)}let Et,Ct=!1;if(st==="mass_piece"){Me.forEach((At,Kt)=>{At.has(oe)&&Kt!==H&&At.delete(oe)}),De==="spring"&&H&&(Me.has(H)||Me.set(H,new Set),Me.get(H).add(oe));const pt=new Set(H&&De==="spring"?[H]:[]);Me.forEach((At,Kt)=>pt.add(Kt)),pt.forEach(At=>{const Kt=ye(At);H===At&&(Et=Kt.totalMassG,Ct=Kt.exceeded)}),Ct&&(Ne.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Ne.value=null},4500))}["ray_box","mirror","glass_block"].includes(st||"")&&Rt(),s("action",{objectKey:_.value,action:"move",value:H,springLoadG:Et,safetyIssue:Ct})}else if(m.value==="rotate"){const V=f.get(_.value),H=V?Math.round(V.rotation.y*180/Math.PI):0,oe=(N=n.sceneObjects.find(De=>De.key===_.value))==null?void 0:N.object_type;["ray_box","mirror","glass_block"].includes(oe||"")&&Rt(),s("action",{objectKey:_.value,action:"rotate",value:String(H)})}m.value=null,u.enabled=!0}}function E(A){const I=f.get(A);if(!I)return;const N=I.position.clone().add(new L(0,.3,0)),V=l.position.clone().sub(u.target).normalize(),H=N.clone().add(V.multiplyScalar(1.4)),oe=l.position.clone(),De=u.target.clone();let it=0;const st=()=>{it+=.05,l.position.lerpVectors(oe,H,Math.min(it,1)),u.target.lerpVectors(De,N,Math.min(it,1)),u.update(),it<1&&requestAnimationFrame(st)};st()}function G(A){const I=c.domElement.getBoundingClientRect();d.x=(A.clientX-I.left)/I.width*2-1,d.y=-((A.clientY-I.top)/I.height)*2+1}function J(){h.setFromCamera(d,l);const A=[];f.forEach(V=>A.push(V));const I=h.intersectObjects(A,!0);if(I.length===0)return null;let N=I[0].object;for(;N&&!N.userData.objectKey;)N=N.parent;return N?N.userData.objectKey:null}let Y=null;function K(A){if(G(A),Y={x:A.clientX,y:A.clientY},m.value==="move"&&_.value){S=!0;return}if(m.value==="rotate"&&_.value){S=!0,M=A.clientX;return}}function Ae(A){if(!(!S||!_.value)){if(G(A),m.value==="move"){h.setFromCamera(d,l);const I=new L;h.ray.intersectPlane(g,I);const N=f.get(_.value);N&&I&&(N.position.x=I.x,N.position.z=I.z)}else if(m.value==="rotate"){const I=A.clientX-M,N=f.get(_.value);N&&(N.rotation.y=I*.02)}}}function Le(A){const I=Y&&(Math.abs(A.clientX-Y.x)>4||Math.abs(A.clientY-Y.y)>4);if(S=!1,m.value==="move"||m.value==="rotate"||I||(G(A),Yn()))return;const N=J();if(!N){ki();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(N===_.value)return;const V=_.value,H=m.value;if(H==="measure"){if(je.value==="ruler"){const oe=Te(V,N);if(!oe.ok){Ne.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Ne.value=null},3500);return}ge.value="readonly",_e.value="cm",me.value=oe.value}else if(je.value==="thermometer")ge.value="readonly",_e.value="°C",me.value=He(N);else if(je.value==="protractor"){const oe=he.value??"incidence",De=Cn(V,N,oe);if(!De.ok){Ne.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Ne.value=null},3500);return}ge.value="readonly",_e.value="°",me.value=De.value}ve.value=N,y.value=V,m.value=null,je.value=null,u.enabled=!0;return}if(H==="connect"){const oe=f.get(V),De=f.get(N);oe&&De&&o.add(xu(oe.position,De.position)),ue.value.push({from:V,to:N}),s("action",{objectKey:V,action:H,value:N}),m.value=null,u.enabled=!0;return}if(H==="heat"){se.set(N,Date.now()),s("action",{objectKey:V,action:H,value:N}),m.value=null,u.enabled=!0;return}if(H==="pour"){Re(V,N);return}}ns(N)}function Re(A,I){var Et,Ct,pt,At;const N=n.sceneObjects.find(Kt=>Kt.key===A),V=n.sceneObjects.find(Kt=>Kt.key===I);if(!N||!V)return;const H=Number(ae(I).capacity_ml??250),oe=B.get(I)??0,De=Math.max(0,H-oe),it=F.includes(N.object_type),st=it?B.get(A)??0:De;v.value={from:A,to:I,amount:0,max:Math.max(1,Math.round(Math.min(De,st))),fromLabel:((Et=N.props)==null?void 0:Et.display_name)??((Ct=C().get(N.object_type))==null?void 0:Ct.display_name)??N.object_type,toLabel:((pt=V.props)==null?void 0:pt.display_name)??((At=C().get(V.object_type))==null?void 0:At.display_name)??V.object_type,fromTracked:it}}function Oe(){if(!v.value)return;const{from:A,to:I,amount:N,fromTracked:V}=v.value,H=Number(ae(I).capacity_ml??250);if(ee(I,((B.get(I)??0)+N)/H),V){const oe=Number(ae(A).capacity_ml??250);ee(A,Math.max(0,(B.get(A)??0)-N)/oe)}}aa(()=>{var A;return(A=v.value)==null?void 0:A.amount},Oe);function Ge(){if(!v.value)return;const{from:A,to:I,amount:N,fromTracked:V}=v.value;at(A,I,N),B.set(I,Math.round((B.get(I)??0)+N)),V&&B.set(A,Math.max(0,Math.round((B.get(A)??0)-N))),s("action",{objectKey:I,action:"pour",value:String(Math.round(N))}),v.value=null,m.value=null,u.enabled=!0}function at(A,I,N){if(N<=0)return;const V=ct(A),H=ct(I);if(!V||!H)return;const oe=B.get(I)??0;H.color.lerp(V.color,oe<=0?1:N/(oe+N))}function ct(A){var N;let I=null;return(N=f.get(A))==null||N.traverse(V=>{!I&&V instanceof Ue&&V.userData.role==="liquid"&&(I=V.material)}),I}function We(){if(v.value){const{from:A,to:I,fromTracked:N}=v.value,V=Number(ae(I).capacity_ml??250);if(ee(I,(B.get(I)??0)/V),N){const H=Number(ae(A).capacity_ml??250);ee(A,(B.get(A)??0)/H)}}v.value=null,m.value=null,u.enabled=!0}let Je=null;const Vt=yt(null);function Ht(){const A=r.value;if(!A)return;try{Je=H_(A,{unitScale:Mu,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14,cupboard:!!n.cupboard})}catch(N){console.error("Virtual Lab: failed to create a WebGL context",N),a.value=!0;return}c=Je.renderer,o=Je.scene,l=Je.camera,u=Je.controls,n.sceneObjects.forEach(N=>{if(N.in_tray){W.value.push(N);return}Z(N)}),(n.connections||[]).forEach(N=>{const V=f.get(N.from),H=f.get(N.to);V&&H&&o.add(xu(V.position,H.position))}),Rt(),Mt(),n.fixedView?Xt():On(),c.domElement.addEventListener("pointerdown",K),c.domElement.addEventListener("pointermove",Ae),c.domElement.addEventListener("pointermove",Dt),c.domElement.addEventListener("pointerup",Le);let I=0;Je.onFrame(N=>{I+=N,I>.15&&(I=0,qn.forEach((V,H)=>{V&&zi(H)})),f.forEach((V,H)=>{const oe=H===_.value||H===Vt.value;V.children.forEach(De=>{De.userData.role==="label"&&(De.visible=oe)})}),Tt.forEach((V,H)=>{V.children.forEach(oe=>{oe.userData.role==="label"&&(oe.visible=H===dn)})})})}aa(()=>n.sceneObjects.map(A=>`${A.key}@${A.position.x},${A.position.z}`).join("|"),()=>{if(!Je)return;const A=new Map(n.sceneObjects.filter(N=>!N.in_tray).map(N=>[N.key,N]));let I=!1;f.forEach((N,V)=>{A.has(V)||(o.remove(N),N.traverse(H=>{var oe;(H instanceof Ue||H instanceof Wn)&&((oe=H.geometry)==null||oe.dispose(),(Array.isArray(H.material)?H.material:[H.material]).forEach(it=>{var st;(st=it.map)==null||st.dispose(),it.dispose()}))}),f.delete(V),_.value===V&&ki())}),A.forEach((N,V)=>{const H=f.get(V);H?H.position.set(N.position.x,N.position.y,N.position.z):(Z(N),I=!0)}),I&&!n.fixedView&&On(),vn()});const Tt=new Map,sn=[];function Ie(A,I){const N=document.createElement("canvas");N.width=512,N.height=144;const V=N.getContext("2d");V.fillStyle="#fffdf4",V.fillRect(0,0,512,144),V.fillStyle="#1e3a8a",V.fillRect(0,0,512,10),V.fillStyle="#111827",V.textAlign="center",V.textBaseline="middle";let H=46;for(V.font=`bold ${H}px sans-serif`;V.measureText(A).width>490&&H>26;)H-=2,V.font=`bold ${H}px sans-serif`;if(V.measureText(A).width>490){const De=A.split(" "),it=Math.ceil(De.length/2);V.fillText(De.slice(0,it).join(" "),256,I?42:52),V.fillText(De.slice(it).join(" "),256,I?80:96)}else V.fillText(A,256,I?54:76);I&&(V.font="bold 38px serif",V.fillStyle="#1e3a8a",V.fillText(I,256,118));const oe=new La(N);return oe.colorSpace=un,oe.anisotropy=8,oe}let dn=null;function Mt(){const A=Je==null?void 0:Je.cupboard;A&&(vh.forEach((I,N)=>{const V=A.bays[N<2?0:1],H=V.levels[N%2],oe=(V.maxX-V.minX)/I.length;I.forEach((De,it)=>{const st=vu(iv(De),`cupboard:${De.id}`,De.name,nv(De));st.position.set(V.minX+oe*(it+.5),H,V.frontZ-.6),st.userData.chemicalId=De.id,st.traverse(Ct=>{Ct instanceof Ue&&(Ct.castShadow=!1,Ct.receiveShadow=!1)}),o.add(st),Tt.set(De.id,st);const Et=new Ue(new si(oe*.92,.26),new Fs({map:Ie(De.name,De.formula),toneMapped:!1}));Et.position.set(st.position.x,H+.14,V.frontZ-.08),Et.rotation.x=-.35,Et.userData.chemicalId=De.id,o.add(Et),sn.push(Et)})}),vn())}function vn(){if(Tt.size===0)return;const A=new Set(n.sceneObjects.map(I=>{var N;return(N=I.props)==null?void 0:N.chemical_id}).filter(Boolean));Tt.forEach((I,N)=>{I.visible=!A.has(N)})}function bn(){const A=Je==null?void 0:Je.cupboard;if(!A)return null;h.setFromCamera(d,l);const I=[...A.doors,...A.blockers];f.forEach(oe=>I.push(oe)),Tt.forEach(oe=>{oe.visible&&I.push(oe)}),sn.forEach(oe=>I.push(oe));const N=h.intersectObjects(I,!0)[0];if(!N)return null;const V=A.doorOf(N.object);if(V)return{kind:"door",door:V};let H=N.object;for(;H&&!H.userData.chemicalId;)H=H.parent;return H?{kind:"chemical",id:H.userData.chemicalId}:null}function Yn(){const A=bn();if(!A)return!1;if(A.kind==="chemical"){const I=n.sceneObjects.find(N=>{var V;return((V=N.props)==null?void 0:V.chemical_id)===A.id});return I?s("putBack",I.key):s("takeChemical",A.id),!0}return Je.cupboard.toggleDoor(A.door),!0}const Ei=bh(()=>{var A,I;return!!((I=(A=n.sceneObjects.find(N=>N.key===_.value))==null?void 0:A.props)!=null&&I.chemical_id)});function Pt(){const A=_.value;A&&(ki(),s("putBack",A))}function Xt(){if(!Je)return;const A=Mu;Je.fitBox(new ai(new L(-.9*A,-.9*A,-.375*A),new L(.9*A,.1*A,.375*A)),.72,{dir:new L(.4,4.2,6.4)})}function On(){if(!Je||f.size===0)return;o.updateMatrixWorld(!0);const A=new ai;f.forEach(I=>I.children.forEach(N=>{N.userData.role!=="label"&&A.expandByObject(N)})),Je.frameBox(A)}function Dt(A){if(S)return;G(A),Vt.value=J();const I=Vt.value?null:bn();dn=(I==null?void 0:I.kind)==="chemical"?I.id:null,c.domElement.style.cursor=Vt.value||I?"pointer":"grab"}function Zn(A,I){(I.state==="on"||I.state==="off")&&q.set(A,I.state);const N=f.get(A);N&&N.traverse(V=>{if(V.userData.role==="lever"&&"state"in I){const H=I.state==="on"||I.state==="closed";V.rotation.z=H?Math.PI/2-.35:Math.PI/2-.9,V.position.x=H?0:-.06}if(V.userData.role==="led"&&"state"in I&&V instanceof Ue){const H=V.material;H.emissiveIntensity=I.state==="on"?1.2:0}if(V.userData.role==="flame"&&"flame"in I&&V instanceof Ue){const H=V.material;H.emissiveIntensity=I.flame==="on"?1:0,H.opacity=I.flame==="on"?.9:0}})}e({setObjectState:Zn});function wi(){a.value=!1,Eh(Ht)}return yu(Ht),Su(()=>{c==null||c.domElement.removeEventListener("pointerdown",K),c==null||c.domElement.removeEventListener("pointermove",Ae),c==null||c.domElement.removeEventListener("pointermove",Dt),c==null||c.domElement.removeEventListener("pointerup",Le),Je==null||Je.dispose(),Je=null}),(A,I)=>(It(),Lt("div",sv,[a.value?(It(),Lt("div",rv,[Jl(wh,{name:"beaker",class:"w-8 h-8"}),I[9]||(I[9]=Xe("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),Xe("button",{onClick:wi,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(It(),Lt("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),W.value.length>0?(It(),Lt("div",{key:2,class:qs(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||v.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[I[10]||(I[10]=Xe("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),Xe("div",av,[(It(!0),Lt(ss,null,wr(W.value,N=>{var V,H;return It(),Lt("button",{key:N.key,onClick:oe=>te(N.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[Xe("span",null,qt(((V=C().get(N.object_type))==null?void 0:V.icon)||"🔬"),1),Xe("span",lv,qt(((H=C().get(N.object_type))==null?void 0:H.display_name)||N.object_type),1)],8,ov)}),128))])],2)):ln("",!0),_.value&&!m.value?(It(),Lt("div",cv,[Xe("div",uv,[Xe("p",hv,qt(w.value),1),Xe("button",{onClick:ki,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),Xe("div",fv,[(It(!0),Lt(ss,null,wr(x.value,N=>(It(),Lt("button",{key:N,onClick:V=>Sr(N),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},qt(b(N)),9,dv))),128)),i.cupboard?(It(),Lt("button",{key:0,onClick:Pt,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},qt(Ei.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):ln("",!0)]),y.value&&ge.value==="readonly"?(It(),Lt("div",pv,[I[11]||(I[11]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),Xe("div",mv,[Xe("span",gv,[Tr(qt(me.value),1),Xe("span",_v,qt(_e.value),1)]),Xe("button",{onClick:br,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):ln("",!0),y.value&&ge.value==="slider"?(It(),Lt("div",vv,[Xe("p",xv,"Reading: "+qt(Math.round(Ze.value))+qt(_e.value),1),jl(Xe("input",{"onUpdate:modelValue":I[0]||(I[0]=N=>Ze.value=N),type:"range",min:"0",max:gt.value,step:"1",class:"w-full accent-emerald-600"},null,8,Mv),[[Ql,Ze.value,void 0,{number:!0}]]),Xe("button",{onClick:br,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):ln("",!0),D.value==="battery"?(It(),Lt("div",yv,[I[12]||(I[12]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),Xe("div",Sv,[(It(),Lt(ss,null,wr([1.5,3,6,9,12],N=>Xe("button",{key:N,onClick:V=>is(N),class:qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",U.value===N?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},qt(N)+"V",11,bv)),64))])])):ln("",!0),D.value==="stopwatch"?(It(),Lt("div",Ev,[Xe("p",wv,"Elapsed: "+qt(Gs.value),1),Xe("button",{onClick:I[1]||(I[1]=N=>Mr(_.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):ln("",!0),D.value==="microscope"?(It(),Lt("div",Tv,[we.value?(It(),Lt(ss,{key:1},[Xe("div",null,[I[13]||(I[13]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),Xe("div",Rv,[(It(),Lt(ss,null,wr([40,100,400],N=>Xe("button",{key:N,onClick:V=>$e(N),class:qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",le.value===N?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+qt(N),11,Cv)),64))])]),Xe("div",null,[Xe("p",Pv,"Coarse Focus: "+qt(Math.round(Qe.value)),1),Xe("input",{value:Qe.value,onChange:I[2]||(I[2]=N=>rt(Number(N.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,Dv)]),Xe("div",Lv,[I[14]||(I[14]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),Xe("div",Iv,[Xe("button",{onClick:I[3]||(I[3]=N=>z(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),Xe("button",{onClick:I[4]||(I[4]=N=>z(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),de.value?(It(),Lt("div",Nv,[I[16]||(I[16]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),Xe("div",Uv,[Xe("div",{class:"absolute inset-0 flex items-center justify-center",style:Mh({filter:`blur(${dt[fe.value]}px)`})},[...I[15]||(I[15]=[Xe("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),Xe("p",Fv,qt(fe.value.replace("_"," "))+" · ×"+qt(le.value),1)])):ln("",!0)],64)):(It(),Lt("div",Av,"Place a specimen slide on the stage first."))])):ln("",!0),D.value==="spring"?(It(),Lt("div",Ov,[Xe("p",Bv,"Attached Load: "+qt(nt.value)+" g · Extension: "+qt(et.value)+" cm",1),O.value?(It(),Lt("p",zv,"Beyond the spring's safe extension limit.")):ln("",!0)])):ln("",!0),D.value==="protractor"?(It(),Lt("div",kv,[I[17]||(I[17]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),Xe("div",Vv,[Xe("button",{onClick:I[5]||(I[5]=N=>R("incidence")),class:qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",he.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),Xe("button",{onClick:I[6]||(I[6]=N=>R("outgoing")),class:qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",he.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):ln("",!0)])):ln("",!0),m.value&&!v.value?(It(),Lt("div",Hv,[Xe("span",Gv,qt(Fn.value),1),Xe("span",Wv,[m.value==="move"||m.value==="rotate"?(It(),Lt("button",{key:0,onClick:Oa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):ln("",!0),Xe("button",{onClick:Fa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):ln("",!0),v.value?(It(),Lt("div",Xv,[Xe("p",qv,"Pouring "+qt(v.value.fromLabel)+" → "+qt(v.value.toLabel),1),Xe("p",Yv,[Tr(qt(Math.round(v.value.amount))+" ",1),I[18]||(I[18]=Xe("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),jl(Xe("input",{"onUpdate:modelValue":I[7]||(I[7]=N=>v.value.amount=N),type:"range",min:"0",max:v.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,Zv),[[Ql,v.value.amount,void 0,{number:!0}]]),Xe("div",{class:"flex items-center gap-2 mt-2"},[Xe("button",{onClick:We,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),Xe("button",{onClick:Ge,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):ln("",!0),Jl(yh,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:Sh(()=>[Ne.value?(It(),Lt("div",Kv,qt(Ne.value),1)):ln("",!0)]),_:1}),p.value?(It(),Lt("div",$v,[Xe("div",Jv,[Xe("p",jv,qt(p.value),1),Xe("button",{onClick:I[8]||(I[8]=N=>p.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):ln("",!0),Xe("p",Qv,[I[19]||(I[19]=Tr(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard?(It(),Lt(ss,{key:0},[Tr(" · Open the cupboard doors for chemicals · Click an empty shelf tag to put a chemical back")],64)):ln("",!0)])]))}});export{un as A,kt as B,Q as C,$t as D,wl as E,Ta as F,Qt as G,sh as H,vu as I,Uf as L,Ue as M,R_ as O,pi as P,Hl as Q,Cd as R,Wt as S,Gt as T,L as V,T_ as W,rx as _,nv as a,iv as b,tv as c,H_ as d,Ua as e,pe as f,Aa as g,Yi as h,Fs as i,nn as j,sx as k,gh as l,Wu as m,Ji as n,Xn as o,bd as p,si as q,lt as r,K_ as s,di as t,ix as u,j as v,Yu as w,nh as x,zu as y,An as z};
