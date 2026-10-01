import{Q as dr,o as Uh,m as Fh,r as Et,d as Hu,c as It,A as fc,a as $e,f as Qs,F as us,k as Or,e as ln,t as Yt,C as Br,g as dc,p as pc,x as Gu,T as Wu,z as Xu,h as qu,n as Yu,j as Nt}from"./index-p2MZ0nN6.js";import{_ as Zu}from"./AppIcon.vue_vue_type_script_setup_true_lang-C_wKxFmB.js";function Tx(){const i=Et(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return dr(i,r=>{document.body.style.overflow=r?"hidden":""}),Uh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),Fh(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Nl="185",Us={ROTATE:0,DOLLY:1,PAN:2},Ls={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$u=0,mc=1,Ku=2,vr=1,Ju=2,pr=3,Bi=0,Mn=1,Jt=2,Mi=0,Fs=1,gc=2,_c=3,vc=4,ju=5,$i=100,Qu=101,ef=102,tf=103,nf=104,sf=200,rf=201,af=202,of=203,zo=204,ko=205,lf=206,cf=207,hf=208,uf=209,ff=210,df=211,pf=212,mf=213,gf=214,Vo=0,Ho=1,Go=2,ks=3,Wo=4,Xo=5,qo=6,Yo=7,Ul=0,_f=1,vf=2,oi=0,Oh=1,Bh=2,zh=3,Fl=4,kh=5,Vh=6,Hh=7,Gh=300,ns=301,Vs=302,Ya=303,Za=304,za=306,li=1e3,yi=1001,Zo=1002,un=1003,xf=1004,zr=1005,_n=1006,$a=1007,Qi=1008,Pn=1009,Wh=1010,Xh=1011,Sr=1012,Ol=1013,hi=1014,qn=1015,Ei=1016,Bl=1017,zl=1018,br=1020,qh=35902,Yh=35899,Zh=1021,$h=1022,Yn=1023,wi=1026,es=1027,kl=1028,Vl=1029,is=1030,Hl=1031,Gl=1033,va=33776,xa=33777,ya=33778,Ma=33779,$o=35840,Ko=35841,Jo=35842,jo=35843,Qo=36196,el=37492,tl=37496,nl=37488,il=37489,wa=37490,sl=37491,rl=37808,al=37809,ol=37810,ll=37811,cl=37812,hl=37813,ul=37814,fl=37815,dl=37816,pl=37817,ml=37818,gl=37819,_l=37820,vl=37821,xl=36492,yl=36494,Ml=36495,Sl=36283,bl=36284,Ta=36285,El=36286,yf=3200,Aa=0,Mf=1,Fi="",hn="srgb",Ra="srgb-linear",Ca="linear",Ut="srgb",fs=7680,xc=519,Sf=512,bf=513,Ef=514,Wl=515,wf=516,Tf=517,Xl=518,Af=519,wl=35044,yc="300 es",ai=2e3,Er=2001;function Rf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Pa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cf(){const i=Pa("canvas");return i.style.display="block",i}const Mc={};function Da(...i){const e="THREE."+i.shift();console.log(e,...i)}function Kh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function it(...i){i=Kh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Mt(...i){i=Kh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Os(...i){const e=i.join(" ");e in Mc||(Mc[e]=!0,it(...i))}function Pf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Df={[Vo]:Ho,[Go]:qo,[Wo]:Yo,[ks]:Xo,[Ho]:Vo,[qo]:Go,[Yo]:Wo,[Xo]:ks};class zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sa=Math.PI/180,Tl=180/Math.PI;function Si(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function gt(i,e,t){return Math.max(e,Math.min(t,i))}function Lf(i,e){return(i%e+e)%e}function Ka(i,e,t){return(1-t)*i+t*e}function ri(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const If={DEG2RAD:Sa},sc=class sc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};sc.prototype.isVector2=!0;let j=sc;class Ti{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,l){let o=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(u!==_||o!==f||c!==p||h!==g){let m=o*f+c*p+h*g+u*_;m<0&&(f=-f,p=-p,g=-g,_=-_,m=-m);let d=1-l;if(m<.9995){const S=Math.acos(m),M=Math.sin(S);d=Math.sin(d*S)/M,l=Math.sin(l*S)/M,o=o*d+f*l,c=c*d+p*l,h=h*d+g*l,u=u*d+_*l}else{o=o*d+f*l,c=c*d+p*l,h=h*d+g*l,u=u*d+_*l;const S=1/Math.sqrt(o*o+c*c+h*h+u*u);o*=S,c*=S,h*=S,u*=S}}e[t]=o,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const l=n[s],o=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=l*g+h*u+o*p-c*f,e[t+1]=o*g+h*f+c*u-l*p,e[t+2]=c*g+h*p+l*f-o*u,e[t+3]=h*g-l*u-o*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,l=Math.cos,o=Math.sin,c=l(n/2),h=l(s/2),u=l(r/2),f=o(n/2),p=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:it("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],l=t[5],o=t[9],c=t[2],h=t[6],u=t[10],f=n+l+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-o)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>l&&n>u){const p=2*Math.sqrt(1+n-l-u);this._w=(h-o)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(l>u){const p=2*Math.sqrt(1+l-n-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(o+h)/p}else{const p=2*Math.sqrt(1+u-n-l);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(o+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,l=t._x,o=t._y,c=t._z,h=t._w;return this._x=n*h+a*l+s*c-r*o,this._y=s*h+a*o+r*l-n*c,this._z=r*h+a*c+n*o-s*l,this._w=a*h-n*l-s*o-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,l=this.dot(e);l<0&&(n=-n,s=-s,r=-r,a=-a,l=-l);let o=1-t;if(l<.9995){const c=Math.acos(l),h=Math.sin(c);o=Math.sin(o*c)/h,t=Math.sin(t*c)/h,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const rc=class rc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,l=e.z,o=e.w,c=2*(a*s-l*n),h=2*(l*t-r*s),u=2*(r*n-a*t);return this.x=t+o*c+a*u-l*h,this.y=n+o*h+l*c-r*u,this.z=s+o*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,l=t.y,o=t.z;return this.x=s*o-r*l,this.y=r*a-n*o,this.z=n*l-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ja.copy(this).projectOnVector(e),this.sub(Ja)}reflect(e){return this.sub(Ja.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};rc.prototype.isVector3=!0;let N=rc;const Ja=new N,Sc=new Ti,ac=class ac{constructor(e,t,n,s,r,a,l,o,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,l,o,c)}set(e,t,n,s,r,a,l,o,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=l,h[3]=t,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],l=n[3],o=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],_=s[0],m=s[3],d=s[6],S=s[1],M=s[4],y=s[7],w=s[2],E=s[5],C=s[8];return r[0]=a*_+l*S+o*w,r[3]=a*m+l*M+o*E,r[6]=a*d+l*y+o*C,r[1]=c*_+h*S+u*w,r[4]=c*m+h*M+u*E,r[7]=c*d+h*y+u*C,r[2]=f*_+p*S+g*w,r[5]=f*m+p*M+g*E,r[8]=f*d+p*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],l=e[5],o=e[6],c=e[7],h=e[8];return t*a*h-t*l*c-n*r*h+n*l*o+s*r*c-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],l=e[5],o=e[6],c=e[7],h=e[8],u=h*a-l*c,f=l*o-h*r,p=c*r-a*o,g=t*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(l*n-s*a)*_,e[3]=f*_,e[4]=(h*t-s*o)*_,e[5]=(s*r-l*t)*_,e[6]=p*_,e[7]=(n*o-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,l){const o=Math.cos(r),c=Math.sin(r);return this.set(n*o,n*c,-n*(o*a+c*l)+a+e,-s*c,s*o,-s*(-c*a+o*l)+l+t,0,0,1),this}scale(e,t){return Os("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ja.makeScale(e,t)),this}rotate(e){return Os("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ja.makeRotation(-e)),this}translate(e,t){return Os("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ac.prototype.isMatrix3=!0;let lt=ac;const ja=new lt,bc=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ec=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nf(){const i={enabled:!0,workingColorSpace:Ra,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ut&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ut&&(s.r=Bs(s.r),s.g=Bs(s.g),s.b=Bs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Fi?Ca:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ra]:{primaries:e,whitePoint:n,transfer:Ca,toXYZ:bc,fromXYZ:Ec,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:Ut,toXYZ:bc,fromXYZ:Ec,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const wt=Nf();function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ds;class Uf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ds===void 0&&(ds=Pa("canvas")),ds.width=e.width,ds.height=e.height;const s=ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ds}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Pa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=bi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bi(t[n]/255)*255):t[n]=bi(t[n]);return{data:t,width:e.width,height:e.height}}else return it("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ff=0;class ql{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Si(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,l=s.length;a<l;a++)s[a].isDataTexture?r.push(Qa(s[a].image)):r.push(Qa(s[a]))}else r=Qa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Qa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Uf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(it("Texture: Unable to serialize Texture."),{})}let Of=0;const eo=new N;class vn extends zi{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,n=yi,s=yi,r=_n,a=Qi,l=Yn,o=Pn,c=vn.DEFAULT_ANISOTROPY,h=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=Si(),this.name="",this.source=new ql(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=o,this.offset=new j(0,0),this.repeat=new j(1,1),this.center=new j(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(eo).x}get height(){return this.source.getSize(eo).y}get depth(){return this.source.getSize(eo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){it(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){it(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case li:e.x=e.x-Math.floor(e.x);break;case yi:e.x=e.x<0?0:1;break;case Zo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case li:e.y=e.y-Math.floor(e.y);break;case yi:e.y=e.y<0?0:1;break;case Zo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Gh;vn.DEFAULT_ANISOTROPY=1;const oc=class oc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,c=o[0],h=o[4],u=o[8],f=o[1],p=o[5],g=o[9],_=o[2],m=o[6],d=o[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,y=(p+1)/2,w=(d+1)/2,E=(h+f)/4,C=(u+_)/4,v=(g+m)/4;return M>y&&M>w?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=E/n,r=C/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=E/s,r=v/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=v/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(f-h)/S,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this.w=gt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this.w=gt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};oc.prototype.isVector4=!0;let $t=oc;class Bf extends zi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new $t(0,0,e,t),this.scissorTest=!1,this.viewport=new $t(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new vn(s),a=n.count;for(let l=0;l<a;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:_n,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ql(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends Bf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Jh extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zf extends vn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=un,this.minFilter=un,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ba=class Ba{constructor(e,t,n,s,r,a,l,o,c,h,u,f,p,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,l,o,c,h,u,f,p,g,_,m)}set(e,t,n,s,r,a,l,o,c,h,u,f,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=l,d[13]=o,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ba().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ps.setFromMatrixColumn(e,0).length(),r=1/ps.setFromMatrixColumn(e,1).length(),a=1/ps.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),l=Math.sin(n),o=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,p=a*u,g=l*h,_=l*u;t[0]=o*h,t[4]=-o*u,t[8]=c,t[1]=p+g*c,t[5]=f-_*c,t[9]=-l*o,t[2]=_-f*c,t[6]=g+p*c,t[10]=a*o}else if(e.order==="YXZ"){const f=o*h,p=o*u,g=c*h,_=c*u;t[0]=f+_*l,t[4]=g*l-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-l,t[2]=p*l-g,t[6]=_+f*l,t[10]=a*o}else if(e.order==="ZXY"){const f=o*h,p=o*u,g=c*h,_=c*u;t[0]=f-_*l,t[4]=-a*u,t[8]=g+p*l,t[1]=p+g*l,t[5]=a*h,t[9]=_-f*l,t[2]=-a*c,t[6]=l,t[10]=a*o}else if(e.order==="ZYX"){const f=a*h,p=a*u,g=l*h,_=l*u;t[0]=o*h,t[4]=g*c-p,t[8]=f*c+_,t[1]=o*u,t[5]=_*c+f,t[9]=p*c-g,t[2]=-c,t[6]=l*o,t[10]=a*o}else if(e.order==="YZX"){const f=a*o,p=a*c,g=l*o,_=l*c;t[0]=o*h,t[4]=_-f*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-l*h,t[2]=-c*h,t[6]=p*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=a*o,p=a*c,g=l*o,_=l*c;t[0]=o*h,t[4]=-u,t[8]=c*h,t[1]=f*u+_,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=l*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kf,e,Vf)}lookAt(e,t,n){const s=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Ci.crossVectors(n,wn),Ci.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Ci.crossVectors(n,wn)),Ci.normalize(),kr.crossVectors(wn,Ci),s[0]=Ci.x,s[4]=kr.x,s[8]=wn.x,s[1]=Ci.y,s[5]=kr.y,s[9]=wn.y,s[2]=Ci.z,s[6]=kr.z,s[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],l=n[4],o=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],S=n[3],M=n[7],y=n[11],w=n[15],E=s[0],C=s[4],v=s[8],T=s[12],D=s[1],U=s[5],V=s[9],Q=s[13],ee=s[2],B=s[6],q=s[10],W=s[14],ie=s[3],ae=s[7],X=s[11],Y=s[15];return r[0]=a*E+l*D+o*ee+c*ie,r[4]=a*C+l*U+o*B+c*ae,r[8]=a*v+l*V+o*q+c*X,r[12]=a*T+l*Q+o*W+c*Y,r[1]=h*E+u*D+f*ee+p*ie,r[5]=h*C+u*U+f*B+p*ae,r[9]=h*v+u*V+f*q+p*X,r[13]=h*T+u*Q+f*W+p*Y,r[2]=g*E+_*D+m*ee+d*ie,r[6]=g*C+_*U+m*B+d*ae,r[10]=g*v+_*V+m*q+d*X,r[14]=g*T+_*Q+m*W+d*Y,r[3]=S*E+M*D+y*ee+w*ie,r[7]=S*C+M*U+y*B+w*ae,r[11]=S*v+M*V+y*q+w*X,r[15]=S*T+M*Q+y*W+w*Y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],l=e[5],o=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15],S=o*p-c*f,M=l*p-c*u,y=l*f-o*u,w=a*p-c*h,E=a*f-o*h,C=a*u-l*h;return t*(_*S-m*M+d*y)-n*(g*S-m*w+d*E)+s*(g*M-_*w+d*C)-r*(g*y-_*E+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],l=e[9],o=e[2],c=e[6],h=e[10];return t*(a*h-l*c)-n*(r*h-l*o)+s*(r*c-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],l=e[5],o=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],S=t*l-n*a,M=t*o-s*a,y=t*c-r*a,w=n*o-s*l,E=n*c-r*l,C=s*c-r*o,v=h*_-u*g,T=h*m-f*g,D=h*d-p*g,U=u*m-f*_,V=u*d-p*_,Q=f*d-p*m,ee=S*Q-M*V+y*U+w*D-E*T+C*v;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/ee;return e[0]=(l*Q-o*V+c*U)*B,e[1]=(s*V-n*Q-r*U)*B,e[2]=(_*C-m*E+d*w)*B,e[3]=(f*E-u*C-p*w)*B,e[4]=(o*D-a*Q-c*T)*B,e[5]=(t*Q-s*D+r*T)*B,e[6]=(m*y-g*C-d*M)*B,e[7]=(h*C-f*y+p*M)*B,e[8]=(a*V-l*D+c*v)*B,e[9]=(n*D-t*V-r*v)*B,e[10]=(g*E-_*y+d*S)*B,e[11]=(u*y-h*E-p*S)*B,e[12]=(l*T-a*U-o*v)*B,e[13]=(t*U-n*T+s*v)*B,e[14]=(_*M-g*w-m*S)*B,e[15]=(h*w-u*M+f*S)*B,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,l=e.y,o=e.z,c=r*a,h=r*l;return this.set(c*a+n,c*l-s*o,c*o+s*l,0,c*l+s*o,h*l+n,h*o-s*a,0,c*o-s*l,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,l=t._z,o=t._w,c=r+r,h=a+a,u=l+l,f=r*c,p=r*h,g=r*u,_=a*h,m=a*u,d=l*u,S=o*c,M=o*h,y=o*u,w=n.x,E=n.y,C=n.z;return s[0]=(1-(_+d))*w,s[1]=(p+y)*w,s[2]=(g-M)*w,s[3]=0,s[4]=(p-y)*E,s[5]=(1-(f+d))*E,s[6]=(m+S)*E,s[7]=0,s[8]=(g+M)*C,s[9]=(m-S)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ps.set(s[0],s[1],s[2]).length();const l=ps.set(s[4],s[5],s[6]).length(),o=ps.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Hn.copy(this);const c=1/a,h=1/l,u=1/o;return Hn.elements[0]*=c,Hn.elements[1]*=c,Hn.elements[2]*=c,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=u,Hn.elements[9]*=u,Hn.elements[10]*=u,t.setFromRotationMatrix(Hn),n.x=a,n.y=l,n.z=o,this}makePerspective(e,t,n,s,r,a,l=ai,o=!1){const c=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),p=(n+s)/(n-s);let g,_;if(o)g=r/(a-r),_=a*r/(a-r);else if(l===ai)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(l===Er)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,l=ai,o=!1){const c=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),p=-(n+s)/(n-s);let g,_;if(o)g=1/(a-r),_=a/(a-r);else if(l===ai)g=-2/(a-r),_=-(a+r)/(a-r);else if(l===Er)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ba.prototype.isMatrix4=!0;let Lt=Ba;const ps=new N,Hn=new Lt,kf=new N(0,0,0),Vf=new N(1,1,1),Ci=new N,kr=new N,wn=new N,wc=new Lt,Tc=new Ti;class Ai{constructor(e=0,t=0,n=0,s=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],l=s[8],o=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:it("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tc.setFromEuler(this),this.setFromQuaternion(Tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class Yl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hf=0;const Ac=new N,ms=new Ti,di=new Lt,Vr=new N,er=new N,Gf=new N,Wf=new Ti,Rc=new N(1,0,0),Cc=new N(0,1,0),Pc=new N(0,0,1),Dc={type:"added"},Xf={type:"removed"},gs={type:"childadded",child:null},to={type:"childremoved",child:null};class tn extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new N,t=new Ai,n=new Ti,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Lt},normalMatrix:{value:new lt}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.multiply(ms),this}rotateOnWorldAxis(e,t){return ms.setFromAxisAngle(e,t),this.quaternion.premultiply(ms),this}rotateX(e){return this.rotateOnAxis(Rc,e)}rotateY(e){return this.rotateOnAxis(Cc,e)}rotateZ(e){return this.rotateOnAxis(Pc,e)}translateOnAxis(e,t){return Ac.copy(e).applyQuaternion(this.quaternion),this.position.add(Ac.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rc,e)}translateY(e){return this.translateOnAxis(Cc,e)}translateZ(e){return this.translateOnAxis(Pc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Vr.copy(e):Vr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(er,Vr,this.up):di.lookAt(Vr,er,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(di),this.quaternion.premultiply(ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dc),gs.child=e,this.dispatchEvent(gs),gs.child=null):Mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xf),to.child=e,this.dispatchEvent(to),to.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dc),gs.child=e,this.dispatchEvent(gs),gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,Gf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,Wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const o=l.shapes;if(Array.isArray(o))for(let c=0,h=o.length;c<h;c++){const u=o[c];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let o=0,c=this.material.length;o<c;o++)l.push(r(e.materials,this.material[o]));s.material=l}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const o=this.animations[l];s.animations.push(r(e.animations,o))}}if(t){const l=a(e.geometries),o=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);l.length>0&&(n.geometries=l),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(l){const o=[];for(const c in l){const h=l[c];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new N(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zt extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qf={type:"move"};class no{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const l=this._targetRay,o=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(qf)))}return l!==null&&(l.visible=s!==null),o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const jh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Hr={h:0,s:0,l:0};function io(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ut{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,wt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=wt.workingColorSpace){return this.r=e,this.g=t,this.b=n,wt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=wt.workingColorSpace){if(e=Lf(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=io(a,r,e+1/3),this.g=io(a,r,e),this.b=io(a,r,e-1/3)}return wt.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&it("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],l=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:it("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);it("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=jh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):it("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=Bs(e.r),this.g=Bs(e.g),this.b=Bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return wt.workingToColorSpace(gn.copy(this),e),Math.round(gt(gn.r*255,0,255))*65536+Math.round(gt(gn.g*255,0,255))*256+Math.round(gt(gn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=wt.workingColorSpace){wt.workingToColorSpace(gn.copy(this),t);const n=gn.r,s=gn.g,r=gn.b,a=Math.max(n,s,r),l=Math.min(n,s,r);let o,c;const h=(l+a)/2;if(l===a)o=0,c=0;else{const u=a-l;switch(c=h<=.5?u/(a+l):u/(2-a-l),a){case n:o=(s-r)/u+(s<r?6:0);break;case s:o=(r-n)/u+2;break;case r:o=(n-s)/u+4;break}o/=6}return e.h=o,e.s=c,e.l=h,e}getRGB(e,t=wt.workingColorSpace){return wt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=hn){wt.workingToColorSpace(gn.copy(this),e);const t=gn.r,n=gn.g,s=gn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Hr);const n=Ka(Pi.h,Hr.h,t),s=Ka(Pi.s,Hr.s,t),r=Ka(Pi.l,Hr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new ut;ut.NAMES=jh;class xr{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ut(e),this.near=t,this.far=n}clone(){return new xr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Qh extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Gn=new N,pi=new N,so=new N,mi=new N,_s=new N,vs=new N,Lc=new N,ro=new N,ao=new N,oo=new N,lo=new $t,co=new $t,ho=new $t;class Fn{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Gn.subVectors(e,t),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Gn.subVectors(s,t),pi.subVectors(n,t),so.subVectors(e,t);const a=Gn.dot(Gn),l=Gn.dot(pi),o=Gn.dot(so),c=pi.dot(pi),h=pi.dot(so),u=a*c-l*l;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*o-l*h)*f,g=(a*h-l*o)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,n,s,r,a,l,o){return this.getBarycoord(e,t,n,s,mi)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,mi.x),o.addScaledVector(a,mi.y),o.addScaledVector(l,mi.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return lo.setScalar(0),co.setScalar(0),ho.setScalar(0),lo.fromBufferAttribute(e,t),co.fromBufferAttribute(e,n),ho.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(lo,r.x),a.addScaledVector(co,r.y),a.addScaledVector(ho,r.z),a}static isFrontFacing(e,t,n,s){return Gn.subVectors(n,t),pi.subVectors(e,t),Gn.cross(pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Gn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Fn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,l;_s.subVectors(s,n),vs.subVectors(r,n),ro.subVectors(e,n);const o=_s.dot(ro),c=vs.dot(ro);if(o<=0&&c<=0)return t.copy(n);ao.subVectors(e,s);const h=_s.dot(ao),u=vs.dot(ao);if(h>=0&&u<=h)return t.copy(s);const f=o*u-h*c;if(f<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(_s,a);oo.subVectors(e,r);const p=_s.dot(oo),g=vs.dot(oo);if(g>=0&&p<=g)return t.copy(r);const _=p*c-o*g;if(_<=0&&c>=0&&g<=0)return l=c/(c-g),t.copy(n).addScaledVector(vs,l);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Lc.subVectors(r,s),l=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Lc,l);const d=1/(m+_+f);return a=_*d,l=f*d,t.copy(n).addScaledVector(_s,a).addScaledVector(vs,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class On{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,l=r.count;a<l;a++)e.isMesh===!0?e.getVertexPosition(a,Wn):Wn.fromBufferAttribute(r,a),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(tr),Wr.subVectors(this.max,tr),xs.subVectors(e.a,tr),ys.subVectors(e.b,tr),Ms.subVectors(e.c,tr),Di.subVectors(ys,xs),Li.subVectors(Ms,ys),Xi.subVectors(xs,Ms);let t=[0,-Di.z,Di.y,0,-Li.z,Li.y,0,-Xi.z,Xi.y,Di.z,0,-Di.x,Li.z,0,-Li.x,Xi.z,0,-Xi.x,-Di.y,Di.x,0,-Li.y,Li.x,0,-Xi.y,Xi.x,0];return!uo(t,xs,ys,Ms,Wr)||(t=[1,0,0,0,1,0,0,0,1],!uo(t,xs,ys,Ms,Wr))?!1:(Xr.crossVectors(Di,Li),t=[Xr.x,Xr.y,Xr.z],uo(t,xs,ys,Ms,Wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const gi=[new N,new N,new N,new N,new N,new N,new N,new N],Wn=new N,Gr=new On,xs=new N,ys=new N,Ms=new N,Di=new N,Li=new N,Xi=new N,tr=new N,Wr=new N,Xr=new N,qi=new N;function uo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){qi.fromArray(i,r);const l=s.x*Math.abs(qi.x)+s.y*Math.abs(qi.y)+s.z*Math.abs(qi.z),o=e.dot(qi),c=t.dot(qi),h=n.dot(qi);if(Math.max(-Math.max(o,c,h),Math.min(o,c,h))>l)return!1}return!0}const jt=new N,qr=new j;let Yf=0;class Bn extends zi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wl,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix3(e),this.setXY(t,qr.x,qr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix3(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ri(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ri(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ri(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ri(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class eu extends Bn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tu extends Bn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class St extends Bn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Zf=new On,nr=new N,fo=new N;class qs{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Zf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;nr.subVectors(e,this.center);const t=nr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(nr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(nr.copy(e.center).add(fo)),this.expandByPoint(nr.copy(e.center).sub(fo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let $f=0;const In=new Lt,po=new tn,Ss=new N,Tn=new On,ir=new On,cn=new N;class nn extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rf(e)?tu:eu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,t,n){return In.makeTranslation(e,t,n),this.applyMatrix4(In),this}scale(e,t,n){return In.makeScale(e,t,n),this.applyMatrix4(In),this}lookAt(e){return po.lookAt(e),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new St(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&it("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];ir.setFromBufferAttribute(l),this.morphTargetsRelative?(cn.addVectors(Tn.min,ir.min),Tn.expandByPoint(cn),cn.addVectors(Tn.max,ir.max),Tn.expandByPoint(cn)):(Tn.expandByPoint(ir.min),Tn.expandByPoint(ir.max))}Tn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)cn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(cn));if(t)for(let r=0,a=t.length;r<a;r++){const l=t[r],o=this.morphTargetsRelative;for(let c=0,h=l.count;c<h;c++)cn.fromBufferAttribute(l,c),o&&(Ss.fromBufferAttribute(e,c),cn.add(Ss)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Bn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const l=[],o=[];for(let v=0;v<n.count;v++)l[v]=new N,o[v]=new N;const c=new N,h=new N,u=new N,f=new j,p=new j,g=new j,_=new N,m=new N;function d(v,T,D){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,D),f.fromBufferAttribute(r,v),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,D),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(U),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(U),l[v].add(_),l[T].add(_),l[D].add(_),o[v].add(m),o[T].add(m),o[D].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,T=S.length;v<T;++v){const D=S[v],U=D.start,V=D.count;for(let Q=U,ee=U+V;Q<ee;Q+=3)d(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const M=new N,y=new N,w=new N,E=new N;function C(v){w.fromBufferAttribute(s,v),E.copy(w);const T=l[v];M.copy(T),M.sub(w.multiplyScalar(w.dot(T))).normalize(),y.crossVectors(E,T);const U=y.dot(o[v])<0?-1:1;a.setXYZW(v,M.x,M.y,M.z,U)}for(let v=0,T=S.length;v<T;++v){const D=S[v],U=D.start,V=D.count;for(let Q=U,ee=U+V;Q<ee;Q+=3)C(e.getX(Q+0)),C(e.getX(Q+1)),C(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Bn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new N,r=new N,a=new N,l=new N,o=new N,c=new N,h=new N,u=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),l.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),l.add(h),o.add(h),c.add(h),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(l,o){const c=l.array,h=l.itemSize,u=l.normalized,f=new c.constructor(o.length*h);let p=0,g=0;for(let _=0,m=o.length;_<m;_++){l.isInterleavedBufferAttribute?p=o[_]*l.data.stride+l.offset:p=o[_]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new Bn(f,h,u)}if(this.index===null)return it("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nn,n=this.index.array,s=this.attributes;for(const l in s){const o=s[l],c=e(o,n);t.setAttribute(l,c)}const r=this.morphAttributes;for(const l in r){const o=[],c=r[l];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,n);o.push(p)}t.morphAttributes[l]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,o=a.length;l<o;l++){const c=a[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const c in o)o[c]!==void 0&&(e[c]=o[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const c=n[o];e.data.attributes[o]=c.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const c=this.morphAttributes[o],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(s[o]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=wl,this.updateRanges=[],this.version=0,this.uuid=Si()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xn=new N;class La{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=ri(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ri(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ri(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ri(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ri(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),s=zt(s,this.array),r=zt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Da("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Bn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new La(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Da("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Jf=0;class ki extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=Fs,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=ko,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fs,this.stencilZFail=fs,this.stencilZPass=fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){it(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){it(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fs&&(n.blending=this.blending),this.side!==Bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zo&&(n.blendSrc=this.blendSrc),this.blendDst!==ko&&(n.blendDst=this.blendDst),this.blendEquation!==$i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const l in r){const o=r[l];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ut().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new j().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new j().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zs extends ki{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let bs;const sr=new N,Es=new N,ws=new N,Ts=new j,rr=new j,nu=new Lt,Yr=new N,ar=new N,Zr=new N,Ic=new j,mo=new j,Nc=new j;class Rn extends tn{constructor(e=new zs){if(super(),this.isSprite=!0,this.type="Sprite",bs===void 0){bs=new nn;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Kf(t,5);bs.setIndex([0,1,2,0,2,3]),bs.setAttribute("position",new La(n,3,0,!1)),bs.setAttribute("uv",new La(n,2,3,!1))}this.geometry=bs,this.material=e,this.center=new j(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Mt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Es.setFromMatrixScale(this.matrixWorld),nu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Es.multiplyScalar(-ws.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;$r(Yr.set(-.5,-.5,0),ws,a,Es,s,r),$r(ar.set(.5,-.5,0),ws,a,Es,s,r),$r(Zr.set(.5,.5,0),ws,a,Es,s,r),Ic.set(0,0),mo.set(1,0),Nc.set(1,1);let l=e.ray.intersectTriangle(Yr,ar,Zr,!1,sr);if(l===null&&($r(ar.set(-.5,.5,0),ws,a,Es,s,r),mo.set(0,1),l=e.ray.intersectTriangle(Yr,Zr,ar,!1,sr),l===null))return;const o=e.ray.origin.distanceTo(sr);o<e.near||o>e.far||t.push({distance:o,point:sr.clone(),uv:Fn.getInterpolation(sr,Yr,ar,Zr,Ic,mo,Nc,new j),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function $r(i,e,t,n,s,r){Ts.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(rr.x=r*Ts.x-s*Ts.y,rr.y=s*Ts.x+r*Ts.y):rr.copy(Ts),i.copy(e),i.x+=rr.x,i.y+=rr.y,i.applyMatrix4(nu)}const _i=new N,go=new N,Kr=new N,Ii=new N,_o=new N,Jr=new N,vo=new N;class ka{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){go.copy(e).add(t).multiplyScalar(.5),Kr.copy(t).sub(e).normalize(),Ii.copy(this.origin).sub(go);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Kr),l=Ii.dot(this.direction),o=-Ii.dot(Kr),c=Ii.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*o-l,f=a*l-o,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,p=u*(u+a*f+2*l)+f*(a*u+f+2*o)+c}else f=r,u=Math.max(0,-(a*f+l)),p=-u*u+f*(f+2*o)+c;else f=-r,u=Math.max(0,-(a*f+l)),p=-u*u+f*(f+2*o)+c;else f<=-g?(u=Math.max(0,-(-a*r+l)),f=u>0?-r:Math.min(Math.max(-r,-o),r),p=-u*u+f*(f+2*o)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-o),r),p=f*(f+2*o)+c):(u=Math.max(0,-(a*r+l)),f=u>0?r:Math.min(Math.max(-r,-o),r),p=-u*u+f*(f+2*o)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+l)),p=-u*u+f*(f+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(go).addScaledVector(Kr,f),p}intersectSphere(e,t){_i.subVectors(e.center,this.origin);const n=_i.dot(this.direction),s=_i.dot(_i)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),l=n-a,o=n+a;return o<0?null:l<0?this.at(o,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,l,o;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(l=(e.min.z-f.z)*u,o=(e.max.z-f.z)*u):(l=(e.max.z-f.z)*u,o=(e.min.z-f.z)*u),n>o||l>s)||((l>n||n!==n)&&(n=l),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,s,r){_o.subVectors(t,e),Jr.subVectors(n,e),vo.crossVectors(_o,Jr);let a=this.direction.dot(vo),l;if(a>0){if(s)return null;l=1}else if(a<0)l=-1,a=-a;else return null;Ii.subVectors(this.origin,e);const o=l*this.direction.dot(Jr.crossVectors(Ii,Jr));if(o<0)return null;const c=l*this.direction.dot(_o.cross(Ii));if(c<0||o+c>a)return null;const h=-l*Ii.dot(vo);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ss extends ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=Ul,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Uc=new Lt,Yi=new ka,jr=new qs,Fc=new N,Qr=new N,ea=new N,ta=new N,xo=new N,na=new N,Oc=new N,ia=new N;class Te extends tn{constructor(e=new nn,t=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const l=this.morphTargetInfluences;if(r&&l){na.set(0,0,0);for(let o=0,c=r.length;o<c;o++){const h=l[o],u=r[o];h!==0&&(xo.fromBufferAttribute(u,e),a?na.addScaledVector(xo,h):na.addScaledVector(xo.sub(t),h))}t.add(na)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(r),Yi.copy(e.ray).recast(e.near),!(jr.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(jr,Fc)===null||Yi.origin.distanceToSquared(Fc)>(e.far-e.near)**2))&&(Uc.copy(r).invert(),Yi.copy(e.ray).applyMatrix4(Uc),!(n.boundingBox!==null&&Yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Yi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,l=r.index,o=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(l!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,w=M;y<w;y+=3){const E=l.getX(y),C=l.getX(y+1),v=l.getX(y+2);s=sa(this,d,e,n,c,h,u,E,C,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const S=l.getX(m),M=l.getX(m+1),y=l.getX(m+2);s=sa(this,a,e,n,c,h,u,S,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],S=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,w=M;y<w;y+=3){const E=y,C=y+1,v=y+2;s=sa(this,d,e,n,c,h,u,E,C,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const S=m,M=m+1,y=m+2;s=sa(this,a,e,n,c,h,u,S,M,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function jf(i,e,t,n,s,r,a,l){let o;if(e.side===Mn?o=n.intersectTriangle(a,r,s,!0,l):o=n.intersectTriangle(s,r,a,e.side===Bi,l),o===null)return null;ia.copy(l),ia.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ia);return c<t.near||c>t.far?null:{distance:c,point:ia.clone(),object:i}}function sa(i,e,t,n,s,r,a,l,o,c){i.getVertexPosition(l,Qr),i.getVertexPosition(o,ea),i.getVertexPosition(c,ta);const h=jf(i,e,t,n,Qr,ea,ta,Oc);if(h){const u=new N;Fn.getBarycoord(Oc,Qr,ea,ta,u),s&&(h.uv=Fn.getInterpolatedAttribute(s,l,o,c,u,new j)),r&&(h.uv1=Fn.getInterpolatedAttribute(r,l,o,c,u,new j)),a&&(h.normal=Fn.getInterpolatedAttribute(a,l,o,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:l,b:o,c,normal:new N,materialIndex:0};Fn.getNormal(Qr,ea,ta,f.normal),h.face=f,h.barycoord=u}return h}class iu extends vn{constructor(e=null,t=1,n=1,s,r,a,l,o,c=un,h=un,u,f){super(null,a,l,o,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bc extends Bn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const As=new Lt,zc=new Lt,ra=[],kc=new On,Qf=new Lt,or=new Te,lr=new qs;class su extends Te{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Qf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new On),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),kc.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(kc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),lr.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(lr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let l=0;l<n.length;l++)n[l]=s[a+l]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(or.geometry=this.geometry,or.material=this.material,or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lr.copy(this.boundingSphere),lr.applyMatrix4(n),e.ray.intersectsSphere(lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,As),zc.multiplyMatrices(n,As),or.matrixWorld=zc,or.raycast(e,ra);for(let a=0,l=ra.length;a<l;a++){const o=ra[a];o.instanceId=r,o.object=this,t.push(o)}ra.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new iu(new Float32Array(s*this.count),s,this.count,kl,qn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const l=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=l,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const yo=new N,ed=new N,td=new lt;class xi{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=yo.subVectors(n,t).cross(ed.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(yo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||td.getNormalMatrix(e),s=this.coplanarPoint(yo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zi=new qs,nd=new j(.5,.5),aa=new N;class Zl{constructor(e=new xi,t=new xi,n=new xi,s=new xi,r=new xi,a=new xi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(s),l[4].copy(r),l[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ai,n=!1){const s=this.planes,r=e.elements,a=r[0],l=r[1],o=r[2],c=r[3],h=r[4],u=r[5],f=r[6],p=r[7],g=r[8],_=r[9],m=r[10],d=r[11],S=r[12],M=r[13],y=r[14],w=r[15];if(s[0].setComponents(c-a,p-h,d-g,w-S).normalize(),s[1].setComponents(c+a,p+h,d+g,w+S).normalize(),s[2].setComponents(c+l,p+u,d+_,w+M).normalize(),s[3].setComponents(c-l,p-u,d-_,w-M).normalize(),n)s[4].setComponents(o,f,m,y).normalize(),s[5].setComponents(c-o,p-f,d-m,w-y).normalize();else if(s[4].setComponents(c-o,p-f,d-m,w-y).normalize(),t===ai)s[5].setComponents(c+o,p+f,d+m,w+y).normalize();else if(t===Er)s[5].setComponents(o,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zi)}intersectsSprite(e){Zi.center.set(0,0,0);const t=nd.distanceTo(e.center);return Zi.radius=.7071067811865476+t,Zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(aa.x=s.normal.x>0?e.max.x:e.min.x,aa.y=s.normal.y>0?e.max.y:e.min.y,aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(aa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ru extends ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ia=new N,Na=new N,Vc=new Lt,cr=new ka,oa=new qs,Mo=new N,Hc=new N;class id extends tn{constructor(e=new nn,t=new ru){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ia.fromBufferAttribute(t,s-1),Na.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ia.distanceTo(Na);e.setAttribute("lineDistance",new St(n,1))}else it("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(s),oa.radius+=r,e.ray.intersectsSphere(oa)===!1)return;Vc.copy(s).invert(),cr.copy(e.ray).applyMatrix4(Vc);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=l*l,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const d=h.getX(_),S=h.getX(_+1),M=la(this,e,cr,o,d,S,_);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),d=la(this,e,cr,o,_,m,g-1);d&&t.push(d)}}else{const p=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=c){const d=la(this,e,cr,o,_,_+1,_);d&&t.push(d)}if(this.isLineLoop){const _=la(this,e,cr,o,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function la(i,e,t,n,s,r,a){const l=i.geometry.attributes.position;if(Ia.fromBufferAttribute(l,s),Na.fromBufferAttribute(l,r),t.distanceSqToSegment(Ia,Na,Mo,Hc)>n)return;Mo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Mo);if(!(c<e.near||c>e.far))return{distance:c,point:Hc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class au extends vn{constructor(e=[],t=ns,n,s,r,a,l,o,c,h){super(e,t,n,s,r,a,l,o,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wr extends vn{constructor(e,t,n,s,r,a,l,o,c){super(e,t,n,s,r,a,l,o,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hs extends vn{constructor(e,t,n=hi,s,r,a,l=un,o=un,c,h=wi,u=1){if(h!==wi&&h!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,a,l,o,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ql(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class sd extends Hs{constructor(e,t=hi,n=ns,s,r,a=un,l=un,o,c=wi){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,l,o,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ou extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rt extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const l=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(u,2));function g(_,m,d,S,M,y,w,E,C,v,T){const D=y/C,U=w/v,V=y/2,Q=w/2,ee=E/2,B=C+1,q=v+1;let W=0,ie=0;const ae=new N;for(let X=0;X<q;X++){const Y=X*U-Q;for(let he=0;he<B;he++){const Ie=he*D-V;ae[_]=Ie*S,ae[m]=Y*M,ae[d]=ee,c.push(ae.x,ae.y,ae.z),ae[_]=0,ae[m]=0,ae[d]=E>0?1:-1,h.push(ae.x,ae.y,ae.z),u.push(he/C),u.push(1-X/v),W+=1}}for(let X=0;X<v;X++)for(let Y=0;Y<C;Y++){const he=f+Y+B*X,Ie=f+Y+B*(X+1),ft=f+(Y+1)+B*(X+1),Qe=f+(Y+1)+B*X;o.push(he,Ie,Qe),o.push(Ie,ft,Qe),ie+=6}l.addGroup(p,ie,T),p+=ie,f+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ki extends nn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],l=[],o=[],c=new N,h=new j;a.push(0,0,0),l.push(0,0,1),o.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const p=n+u/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),l.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,o.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new St(a,3)),this.setAttribute("normal",new St(l,3)),this.setAttribute("uv",new St(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class te extends nn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,l=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:l,thetaLength:o};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const _=[],m=n/2;let d=0;S(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new St(u,3)),this.setAttribute("normal",new St(f,3)),this.setAttribute("uv",new St(p,2));function S(){const y=new N,w=new N;let E=0;const C=(t-e)/n;for(let v=0;v<=r;v++){const T=[],D=v/r,U=D*(t-e)+e;for(let V=0;V<=s;V++){const Q=V/s,ee=Q*o+l,B=Math.sin(ee),q=Math.cos(ee);w.x=U*B,w.y=-D*n+m,w.z=U*q,u.push(w.x,w.y,w.z),y.set(B,C,q).normalize(),f.push(y.x,y.y,y.z),p.push(Q,1-D),T.push(g++)}_.push(T)}for(let v=0;v<s;v++)for(let T=0;T<r;T++){const D=_[T][v],U=_[T+1][v],V=_[T+1][v+1],Q=_[T][v+1];(e>0||T!==0)&&(h.push(D,U,Q),E+=3),(t>0||T!==r-1)&&(h.push(U,V,Q),E+=3)}c.addGroup(d,E,0),d+=E}function M(y){const w=g,E=new j,C=new N;let v=0;const T=y===!0?e:t,D=y===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,m*D,0),f.push(0,D,0),p.push(.5,.5),g++;const U=g;for(let V=0;V<=s;V++){const ee=V/s*o+l,B=Math.cos(ee),q=Math.sin(ee);C.x=T*q,C.y=m*D,C.z=T*B,u.push(C.x,C.y,C.z),f.push(0,D,0),E.x=B*.5+.5,E.y=q*.5*D+.5,p.push(E.x,E.y),g++}for(let V=0;V<s;V++){const Q=w+V,ee=U+V;y===!0?h.push(ee,ee+1,Q):h.push(ee+1,ee,Q),v+=3}c.addGroup(d,v,y===!0?1:2),d+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new te(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xn extends te{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,l=Math.PI*2){super(0,e,t,n,s,r,a,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l}}static fromJSON(e){return new Xn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $l extends nn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];l(s),c(n),h(),this.setAttribute("position",new St(r,3)),this.setAttribute("normal",new St(r.slice(),3)),this.setAttribute("uv",new St(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function l(S){const M=new N,y=new N,w=new N;for(let E=0;E<t.length;E+=3)p(t[E+0],M),p(t[E+1],y),p(t[E+2],w),o(M,y,w,S)}function o(S,M,y,w){const E=w+1,C=[];for(let v=0;v<=E;v++){C[v]=[];const T=S.clone().lerp(y,v/E),D=M.clone().lerp(y,v/E),U=E-v;for(let V=0;V<=U;V++)V===0&&v===E?C[v][V]=T:C[v][V]=T.clone().lerp(D,V/U)}for(let v=0;v<E;v++)for(let T=0;T<2*(E-v)-1;T++){const D=Math.floor(T/2);T%2===0?(f(C[v][D+1]),f(C[v+1][D]),f(C[v][D])):(f(C[v][D+1]),f(C[v+1][D+1]),f(C[v+1][D]))}}function c(S){const M=new N;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(S),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function h(){const S=new N;for(let M=0;M<r.length;M+=3){S.x=r[M+0],S.y=r[M+1],S.z=r[M+2];const y=m(S)/2/Math.PI+.5,w=d(S)/Math.PI+.5;a.push(y,1-w)}g(),u()}function u(){for(let S=0;S<a.length;S+=6){const M=a[S+0],y=a[S+2],w=a[S+4],E=Math.max(M,y,w),C=Math.min(M,y,w);E>.9&&C<.1&&(M<.2&&(a[S+0]+=1),y<.2&&(a[S+2]+=1),w<.2&&(a[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function p(S,M){const y=S*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function g(){const S=new N,M=new N,y=new N,w=new N,E=new j,C=new j,v=new j;for(let T=0,D=0;T<r.length;T+=9,D+=6){S.set(r[T+0],r[T+1],r[T+2]),M.set(r[T+3],r[T+4],r[T+5]),y.set(r[T+6],r[T+7],r[T+8]),E.set(a[D+0],a[D+1]),C.set(a[D+2],a[D+3]),v.set(a[D+4],a[D+5]),w.copy(S).add(M).add(y).divideScalar(3);const U=m(w);_(E,D+0,S,U),_(C,D+2,M,U),_(v,D+4,y,U)}}function _(S,M,y,w){w<0&&S.x===1&&(a[M]=S.x-1),y.x===0&&y.z===0&&(a[M]=w/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function d(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $l(e.vertices,e.indices,e.radius,e.detail)}}class Kl extends $l{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kl(e.radius,e.detail)}}class Zn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){it("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let l=0,o=r-1,c;for(;l<=o;)if(s=Math.floor(l+(o-l)/2),c=n[s]-a,c<0)l=s+1;else if(c>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,p=(a-h)/f;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),l=this.getPoint(r),o=t||(a.isVector2?new j:new N);return o.copy(l).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new N,s=[],r=[],a=[],l=new N,o=new Lt;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),l.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],l),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),l.crossVectors(s[p-1],s[p]),l.length()>Number.EPSILON){l.normalize();const g=Math.acos(gt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(o.makeRotationAxis(l,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(gt(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(l.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Jl extends Zn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,l=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=l,this.aRotation=o}getPoint(e,t=new j){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const l=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(l),c=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=o-this.aX,p=c-this.aY;o=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return n.set(o,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class rd extends Jl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function jl(){let i=0,e=0,t=0,n=0;function s(r,a,l,o){i=r,e=l,t=-3*r+3*a-2*l-o,n=2*r-2*a+l+o}return{initCatmullRom:function(r,a,l,o,c){s(a,l,c*(l-r),c*(o-a))},initNonuniformCatmullRom:function(r,a,l,o,c,h,u){let f=(a-r)/c-(l-r)/(c+h)+(l-a)/h,p=(l-a)/h-(o-a)/(h+u)+(o-l)/u;f*=h,p*=h,s(a,l,f,p)},calc:function(r){const a=r*r,l=a*r;return i+e*r+t*a+n*l}}}const Gc=new N,Wc=new N,So=new jl,bo=new jl,Eo=new jl;class lu extends Zn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let l=Math.floor(a),o=a-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/r)+1)*r:o===0&&l===r-1&&(l=r-2,o=1);let c,h;this.closed||l>0?c=s[(l-1)%r]:(Wc.subVectors(s[0],s[1]).add(s[0]),c=Wc);const u=s[l%r],f=s[(l+1)%r];if(this.closed||l+2<r?h=s[(l+2)%r]:(Gc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Gc),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),So.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),bo.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),Eo.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(So.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),bo.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Eo.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(So.calc(o),bo.calc(o),Eo.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Xc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,l=i*i,o=i*l;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*l+r*i+t}function ad(i,e){const t=1-i;return t*t*e}function od(i,e){return 2*(1-i)*i*e}function ld(i,e){return i*i*e}function yr(i,e,t,n){return ad(i,e)+od(i,t)+ld(i,n)}function cd(i,e){const t=1-i;return t*t*t*e}function hd(i,e){const t=1-i;return 3*t*t*i*e}function ud(i,e){return 3*(1-i)*i*i*e}function fd(i,e){return i*i*i*e}function Mr(i,e,t,n,s){return cd(i,e)+hd(i,t)+ud(i,n)+fd(i,s)}class cu extends Zn{constructor(e=new j,t=new j,n=new j,s=new j){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new j){const n=t,s=this.v0,r=this.v1,a=this.v2,l=this.v3;return n.set(Mr(e,s.x,r.x,a.x,l.x),Mr(e,s.y,r.y,a.y,l.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class dd extends Zn{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2,l=this.v3;return n.set(Mr(e,s.x,r.x,a.x,l.x),Mr(e,s.y,r.y,a.y,l.y),Mr(e,s.z,r.z,a.z,l.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hu extends Zn{constructor(e=new j,t=new j){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new j){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new j){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pd extends Zn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class uu extends Zn{constructor(e=new j,t=new j,n=new j){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new j){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(yr(e,s.x,r.x,a.x),yr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ql extends Zn{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(yr(e,s.x,r.x,a.x),yr(e,s.y,r.y,a.y),yr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fu extends Zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new j){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),l=r-a,o=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Xc(l,o.x,c.x,h.x,u.x),Xc(l,o.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new j().fromArray(s))}return this}}var Ua=Object.freeze({__proto__:null,ArcCurve:rd,CatmullRomCurve3:lu,CubicBezierCurve:cu,CubicBezierCurve3:dd,EllipseCurve:Jl,LineCurve:hu,LineCurve3:pd,QuadraticBezierCurve:uu,QuadraticBezierCurve3:Ql,SplineCurve:fu});class md extends Zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ua[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,l=this.curves[r],o=l.getLength(),c=o===0?0:1-a/o;return l.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],l=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(l);for(let c=0;c<o.length;c++){const h=o[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ua[s.type]().fromJSON(s))}return this}}class qc extends md{constructor(e){super(),this.type="Path",this.currentPoint=new j,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new hu(this.currentPoint.clone(),new j(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new uu(this.currentPoint.clone(),new j(e,t),new j(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const l=new cu(this.currentPoint.clone(),new j(e,t),new j(n,s),new j(r,a));return this.curves.push(l),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new fu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const l=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+l,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,l,o){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,l,o),this}absellipse(e,t,n,s,r,a,l,o){const c=new Jl(e,t,n,s,r,a,l,o);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class mr extends qc{constructor(e){super(e),this.uuid=Si(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new qc().fromJSON(s))}return this}}function gd(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=du(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let l,o,c;if(n&&(r=Md(i,e,r,t)),i.length>80*t){l=i[0],o=i[1];let h=l,u=o;for(let f=t;f<s;f+=t){const p=i[f],g=i[f+1];p<l&&(l=p),g<o&&(o=g),p>h&&(h=p),g>u&&(u=g)}c=Math.max(h-l,u-o),c=c!==0?32767/c:0}return Tr(r,a,t,l,o,c,0),a}function du(i,e,t,n,s){let r;if(s===Ld(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Yc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Yc(a/n|0,i[a],i[a+1],r);return r&&Gs(r,r.next)&&(Rr(r),r=r.next),r}function rs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Gs(t,t.next)||Kt(t.prev,t,t.next)===0)){if(Rr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Tr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Td(i,n,s,r);let l=i;for(;i.prev!==i.next;){const o=i.prev,c=i.next;if(r?vd(i,n,s,r):_d(i)){e.push(o.i,i.i,c.i),Rr(i),i=c.next,l=c.next;continue}if(i=c,i===l){a?a===1?(i=xd(rs(i),e),Tr(i,e,t,n,s,r,2)):a===2&&yd(i,e,t,n,s,r):Tr(rs(i),e,t,n,s,r,1);break}}}function _d(i){const e=i.prev,t=i,n=i.next;if(Kt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,l=e.y,o=t.y,c=n.y,h=Math.min(s,r,a),u=Math.min(l,o,c),f=Math.max(s,r,a),p=Math.max(l,o,c);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=p&&gr(s,l,r,o,a,c,g.x,g.y)&&Kt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function vd(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Kt(s,r,a)>=0)return!1;const l=s.x,o=r.x,c=a.x,h=s.y,u=r.y,f=a.y,p=Math.min(l,o,c),g=Math.min(h,u,f),_=Math.max(l,o,c),m=Math.max(h,u,f),d=Al(p,g,e,t,n),S=Al(_,m,e,t,n);let M=i.prevZ,y=i.nextZ;for(;M&&M.z>=d&&y&&y.z<=S;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&gr(l,h,o,u,c,f,M.x,M.y)&&Kt(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&gr(l,h,o,u,c,f,y.x,y.y)&&Kt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=d;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&gr(l,h,o,u,c,f,M.x,M.y)&&Kt(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=S;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&gr(l,h,o,u,c,f,y.x,y.y)&&Kt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function xd(i,e){let t=i;do{const n=t.prev,s=t.next.next;!Gs(n,s)&&mu(n,t,t.next,s)&&Ar(n,s)&&Ar(s,n)&&(e.push(n.i,t.i,s.i),Rr(t),Rr(t.next),t=i=s),t=t.next}while(t!==i);return rs(t)}function yd(i,e,t,n,s,r){let a=i;do{let l=a.next.next;for(;l!==a.prev;){if(a.i!==l.i&&Cd(a,l)){let o=gu(a,l);a=rs(a,a.next),o=rs(o,o.next),Tr(a,e,t,n,s,r,0),Tr(o,e,t,n,s,r,0);return}l=l.next}a=a.next}while(a!==i)}function Md(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const l=e[r]*n,o=r<a-1?e[r+1]*n:i.length,c=du(i,l,o,n,!1);c===c.next&&(c.steiner=!0),s.push(Rd(c))}s.sort(Sd);for(let r=0;r<s.length;r++)t=bd(s[r],t);return t}function Sd(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function bd(i,e){const t=Ed(i,e);if(!t)return e;const n=gu(t,i);return rs(n,n.next),rs(t,t.next)}function Ed(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(Gs(i,t))return t;do{if(Gs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const l=a,o=a.x,c=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&pu(s<c?n:r,s,o,c,s<c?r:n,s,t.x,t.y)){const u=Math.abs(s-t.y)/(n-t.x);Ar(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&wd(a,t)))&&(a=t,h=u)}t=t.next}while(t!==l);return a}function wd(i,e){return Kt(i.prev,i,e.prev)<0&&Kt(e.next,i,i.next)<0}function Td(i,e,t,n){let s=i;do s.z===0&&(s.z=Al(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Ad(s)}function Ad(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,l=0;for(let c=0;c<t&&(l++,a=a.nextZ,!!a);c++);let o=t;for(;l>0||o>0&&a;)l!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,l--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Al(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Rd(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function pu(i,e,t,n,s,r,a,l){return(s-a)*(e-l)>=(i-a)*(r-l)&&(i-a)*(n-l)>=(t-a)*(e-l)&&(t-a)*(r-l)>=(s-a)*(n-l)}function gr(i,e,t,n,s,r,a,l){return!(i===a&&e===l)&&pu(i,e,t,n,s,r,a,l)}function Cd(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Pd(i,e)&&(Ar(i,e)&&Ar(e,i)&&Dd(i,e)&&(Kt(i.prev,i,e.prev)||Kt(i,e.prev,e))||Gs(i,e)&&Kt(i.prev,i,i.next)>0&&Kt(e.prev,e,e.next)>0)}function Kt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Gs(i,e){return i.x===e.x&&i.y===e.y}function mu(i,e,t,n){const s=ha(Kt(i,e,t)),r=ha(Kt(i,e,n)),a=ha(Kt(t,n,i)),l=ha(Kt(t,n,e));return!!(s!==r&&a!==l||s===0&&ca(i,t,e)||r===0&&ca(i,n,e)||a===0&&ca(t,i,n)||l===0&&ca(t,e,n))}function ca(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ha(i){return i>0?1:i<0?-1:0}function Pd(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&mu(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ar(i,e){return Kt(i.prev,i,i.next)<0?Kt(i,e,i.next)>=0&&Kt(i,i.prev,e)>=0:Kt(i,e,i.prev)<0||Kt(i,i.next,e)<0}function Dd(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function gu(i,e){const t=Rl(i.i,i.x,i.y),n=Rl(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Yc(i,e,t,n){const s=Rl(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Rr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Rl(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ld(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Id{static triangulate(e,t,n=2){return gd(e,t,n)}}class Is{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Is.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Zc(e),$c(n,e);let a=e.length;t.forEach(Zc);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,$c(n,t[o]);const l=Id.triangulate(n,s);for(let o=0;o<l.length;o+=3)r.push(l.slice(o,o+3));return r}}function Zc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function $c(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Ns extends nn{constructor(e=new mr([new j(.5,.5),new j(-.5,.5),new j(-.5,-.5),new j(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let l=0,o=e.length;l<o;l++){const c=e[l];a(c)}this.setAttribute("position",new St(s,3)),this.setAttribute("uv",new St(r,2)),this.computeVertexNormals();function a(l){const o=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const d=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:Nd;let M,y=!1,w,E,C,v;if(d){M=d.getSpacedPoints(h),y=!0,f=!1;const fe=d.isCatmullRomCurve3?d.closed:!1;w=d.computeFrenetFrames(h,fe),E=new N,C=new N,v=new N}f||(m=0,p=0,g=0,_=0);const T=l.extractPoints(c);let D=T.shape;const U=T.holes;if(!Is.isClockWise(D)){D=D.reverse();for(let fe=0,ge=U.length;fe<ge;fe++){const _e=U[fe];Is.isClockWise(_e)&&(U[fe]=_e.reverse())}}function Q(fe){const _e=10000000000000001e-36;let Ae=fe[0];for(let Me=1;Me<=fe.length;Me++){const Je=Me%fe.length,Ve=fe[Je],tt=Ve.x-Ae.x,rt=Ve.y-Ae.y,O=tt*tt+rt*rt,Tt=Math.max(Math.abs(Ve.x),Math.abs(Ve.y),Math.abs(Ae.x),Math.abs(Ae.y)),vt=_e*Tt*Tt;if(O<=vt){fe.splice(Je,1),Me--;continue}Ae=Ve}}Q(D),U.forEach(Q);const ee=U.length,B=D;for(let fe=0;fe<ee;fe++){const ge=U[fe];D=D.concat(ge)}function q(fe,ge,_e){return ge||Mt("ExtrudeGeometry: vec does not exist"),fe.clone().addScaledVector(ge,_e)}const W=D.length;function ie(fe,ge,_e){let Ae,Me,Je;const Ve=fe.x-ge.x,tt=fe.y-ge.y,rt=_e.x-fe.x,O=_e.y-fe.y,Tt=Ve*Ve+tt*tt,vt=Ve*O-tt*rt;if(Math.abs(vt)>Number.EPSILON){const R=Math.sqrt(Tt),x=Math.sqrt(rt*rt+O*O),G=ge.x-tt/R,$=ge.y+Ve/R,se=_e.x-O/x,ue=_e.y+rt/x,ye=((se-G)*O-(ue-$)*rt)/(Ve*O-tt*rt);Ae=G+Ve*ye-fe.x,Me=$+tt*ye-fe.y;const ne=Ae*Ae+Me*Me;if(ne<=2)return new j(Ae,Me);Je=Math.sqrt(ne/2)}else{let R=!1;Ve>Number.EPSILON?rt>Number.EPSILON&&(R=!0):Ve<-Number.EPSILON?rt<-Number.EPSILON&&(R=!0):Math.sign(tt)===Math.sign(O)&&(R=!0),R?(Ae=-tt,Me=Ve,Je=Math.sqrt(Tt)):(Ae=Ve,Me=tt,Je=Math.sqrt(Tt/2))}return new j(Ae/Je,Me/Je)}const ae=[];for(let fe=0,ge=B.length,_e=ge-1,Ae=fe+1;fe<ge;fe++,_e++,Ae++)_e===ge&&(_e=0),Ae===ge&&(Ae=0),ae[fe]=ie(B[fe],B[_e],B[Ae]);const X=[];let Y,he=ae.concat();for(let fe=0,ge=ee;fe<ge;fe++){const _e=U[fe];Y=[];for(let Ae=0,Me=_e.length,Je=Me-1,Ve=Ae+1;Ae<Me;Ae++,Je++,Ve++)Je===Me&&(Je=0),Ve===Me&&(Ve=0),Y[Ae]=ie(_e[Ae],_e[Je],_e[Ve]);X.push(Y),he=he.concat(Y)}let Ie;if(m===0)Ie=Is.triangulateShape(B,U);else{const fe=[],ge=[];for(let _e=0;_e<m;_e++){const Ae=_e/m,Me=p*Math.cos(Ae*Math.PI/2),Je=g*Math.sin(Ae*Math.PI/2)+_;for(let Ve=0,tt=B.length;Ve<tt;Ve++){const rt=q(B[Ve],ae[Ve],Je);Ne(rt.x,rt.y,-Me),Ae===0&&fe.push(rt)}for(let Ve=0,tt=ee;Ve<tt;Ve++){const rt=U[Ve];Y=X[Ve];const O=[];for(let Tt=0,vt=rt.length;Tt<vt;Tt++){const R=q(rt[Tt],Y[Tt],Je);Ne(R.x,R.y,-Me),Ae===0&&O.push(R)}Ae===0&&ge.push(O)}}Ie=Is.triangulateShape(fe,ge)}const ft=Ie.length,Qe=g+_;for(let fe=0;fe<W;fe++){const ge=f?q(D[fe],he[fe],Qe):D[fe];y?(C.copy(w.normals[0]).multiplyScalar(ge.x),E.copy(w.binormals[0]).multiplyScalar(ge.y),v.copy(M[0]).add(C).add(E),Ne(v.x,v.y,v.z)):Ne(ge.x,ge.y,0)}for(let fe=1;fe<=h;fe++)for(let ge=0;ge<W;ge++){const _e=f?q(D[ge],he[ge],Qe):D[ge];y?(C.copy(w.normals[fe]).multiplyScalar(_e.x),E.copy(w.binormals[fe]).multiplyScalar(_e.y),v.copy(M[fe]).add(C).add(E),Ne(v.x,v.y,v.z)):Ne(_e.x,_e.y,u/h*fe)}for(let fe=m-1;fe>=0;fe--){const ge=fe/m,_e=p*Math.cos(ge*Math.PI/2),Ae=g*Math.sin(ge*Math.PI/2)+_;for(let Me=0,Je=B.length;Me<Je;Me++){const Ve=q(B[Me],ae[Me],Ae);Ne(Ve.x,Ve.y,u+_e)}for(let Me=0,Je=U.length;Me<Je;Me++){const Ve=U[Me];Y=X[Me];for(let tt=0,rt=Ve.length;tt<rt;tt++){const O=q(Ve[tt],Y[tt],Ae);y?Ne(O.x,O.y+M[h-1].y,M[h-1].x+_e):Ne(O.x,O.y,u+_e)}}}re(),ve();function re(){const fe=s.length/3;if(f){let ge=0,_e=W*ge;for(let Ae=0;Ae<ft;Ae++){const Me=Ie[Ae];Xe(Me[2]+_e,Me[1]+_e,Me[0]+_e)}ge=h+m*2,_e=W*ge;for(let Ae=0;Ae<ft;Ae++){const Me=Ie[Ae];Xe(Me[0]+_e,Me[1]+_e,Me[2]+_e)}}else{for(let ge=0;ge<ft;ge++){const _e=Ie[ge];Xe(_e[2],_e[1],_e[0])}for(let ge=0;ge<ft;ge++){const _e=Ie[ge];Xe(_e[0]+W*h,_e[1]+W*h,_e[2]+W*h)}}n.addGroup(fe,s.length/3-fe,0)}function ve(){const fe=s.length/3;let ge=0;me(B,ge),ge+=B.length;for(let _e=0,Ae=U.length;_e<Ae;_e++){const Me=U[_e];me(Me,ge),ge+=Me.length}n.addGroup(fe,s.length/3-fe,1)}function me(fe,ge){let _e=fe.length;for(;--_e>=0;){const Ae=_e;let Me=_e-1;Me<0&&(Me=fe.length-1);for(let Je=0,Ve=h+m*2;Je<Ve;Je++){const tt=W*Je,rt=W*(Je+1),O=ge+Ae+tt,Tt=ge+Me+tt,vt=ge+Me+rt,R=ge+Ae+rt;Oe(O,Tt,vt,R)}}}function Ne(fe,ge,_e){o.push(fe),o.push(ge),o.push(_e)}function Xe(fe,ge,_e){ct(fe),ct(ge),ct(_e);const Ae=s.length/3,Me=S.generateTopUV(n,s,Ae-3,Ae-2,Ae-1);je(Me[0]),je(Me[1]),je(Me[2])}function Oe(fe,ge,_e,Ae){ct(fe),ct(ge),ct(Ae),ct(ge),ct(_e),ct(Ae);const Me=s.length/3,Je=S.generateSideWallUV(n,s,Me-6,Me-3,Me-2,Me-1);je(Je[0]),je(Je[1]),je(Je[3]),je(Je[1]),je(Je[2]),je(Je[3])}function ct(fe){s.push(o[fe*3+0]),s.push(o[fe*3+1]),s.push(o[fe*3+2])}function je(fe){r.push(fe.x),r.push(fe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ud(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const l=t[e.shapes[r]];n.push(l)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ua[s.type]().fromJSON(s)),new Ns(n,e.options)}}const Nd={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],l=e[n*3],o=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new j(r,a),new j(l,o),new j(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],l=e[t*3+1],o=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],p=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],d=e[r*3+2];return Math.abs(l-h)<Math.abs(a-c)?[new j(a,1-o),new j(c,1-u),new j(f,1-g),new j(_,1-d)]:[new j(l,1-o),new j(h,1-u),new j(p,1-g),new j(m,1-d)]}};function Ud(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class vi extends nn{constructor(e=[new j(0,-.5),new j(.5,0),new j(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=gt(s,0,Math.PI*2);const r=[],a=[],l=[],o=[],c=[],h=1/t,u=new N,f=new j,p=new N,g=new N,_=new N;let m=0,d=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:m=e[S+1].x-e[S].x,d=e[S+1].y-e[S].y,p.x=d*1,p.y=-m,p.z=d*0,_.copy(p),p.normalize(),o.push(p.x,p.y,p.z);break;case e.length-1:o.push(_.x,_.y,_.z);break;default:m=e[S+1].x-e[S].x,d=e[S+1].y-e[S].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),o.push(p.x,p.y,p.z),_.copy(g)}for(let S=0;S<=t;S++){const M=n+S*h*s,y=Math.sin(M),w=Math.cos(M);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*y,u.y=e[E].y,u.z=e[E].x*w,a.push(u.x,u.y,u.z),f.x=S/t,f.y=E/(e.length-1),l.push(f.x,f.y);const C=o[3*E+0]*y,v=o[3*E+1],T=o[3*E+0]*w;c.push(C,v,T)}}for(let S=0;S<t;S++)for(let M=0;M<e.length-1;M++){const y=M+S*e.length,w=y,E=y+e.length,C=y+e.length+1,v=y+1;r.push(w,E,v),r.push(C,v,E)}this.setIndex(r),this.setAttribute("position",new St(a,3)),this.setAttribute("uv",new St(l,2)),this.setAttribute("normal",new St(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vi(e.points,e.segments,e.phiStart,e.phiLength)}}class Dn extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,l=Math.floor(n),o=Math.floor(s),c=l+1,h=o+1,u=e/l,f=t/o,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const S=d*f-a;for(let M=0;M<c;M++){const y=M*u-r;g.push(y,-S,0),_.push(0,0,1),m.push(M/l),m.push(1-d/o)}}for(let d=0;d<o;d++)for(let S=0;S<l;S++){const M=S+c*d,y=S+c*(d+1),w=S+1+c*(d+1),E=S+1+c*d;p.push(M,y,E),p.push(y,w,E)}this.setIndex(p),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.width,e.height,e.widthSegments,e.heightSegments)}}class _u extends nn{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const l=[],o=[],c=[],h=[];let u=e;const f=(t-e)/s,p=new N,g=new j;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const d=r+m/n*a;p.x=u*Math.cos(d),p.y=u*Math.sin(d),o.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(n+1);for(let d=0;d<n;d++){const S=d+m,M=S,y=S+n+1,w=S+n+2,E=S+1;l.push(M,y,E),l.push(y,w,E)}}this.setIndex(l),this.setAttribute("position",new St(o,3)),this.setAttribute("normal",new St(c,3)),this.setAttribute("uv",new St(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _u(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Wt extends nn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+l,Math.PI);let c=0;const h=[],u=new N,f=new N,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const S=[],M=d/n,y=a+M*l,w=e*Math.cos(y),E=Math.sqrt(e*e-w*w);let C=0;d===0&&a===0?C=.5/t:d===n&&o===Math.PI&&(C=-.5/t);for(let v=0;v<=t;v++){const T=v/t,D=s+T*r;u.x=-E*Math.cos(D),u.y=w,u.z=E*Math.sin(D),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(T+C,1-M),S.push(c++)}h.push(S)}for(let d=0;d<n;d++)for(let S=0;S<t;S++){const M=h[d][S+1],y=h[d][S],w=h[d+1][S],E=h[d+1][S+1];(d!==0||a>0)&&p.push(M,y,E),(d!==n-1||o<Math.PI)&&p.push(y,w,E)}this.setIndex(p),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(_,3)),this.setAttribute("uv",new St(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qt extends nn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:l},n=Math.floor(n),s=Math.floor(s);const o=[],c=[],h=[],u=[],f=new N,p=new N,g=new N;for(let _=0;_<=n;_++){const m=a+_/n*l;for(let d=0;d<=s;d++){const S=d/s*r;p.x=(e+t*Math.cos(m))*Math.cos(S),p.y=(e+t*Math.cos(m))*Math.sin(S),p.z=t*Math.sin(m),c.push(p.x,p.y,p.z),f.x=e*Math.cos(S),f.y=e*Math.sin(S),g.subVectors(p,f).normalize(),h.push(g.x,g.y,g.z),u.push(d/s),u.push(_/n)}}for(let _=1;_<=n;_++)for(let m=1;m<=s;m++){const d=(s+1)*_+m-1,S=(s+1)*(_-1)+m-1,M=(s+1)*(_-1)+m,y=(s+1)*_+m;o.push(d,S,y),o.push(S,M,y)}this.setIndex(o),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(h,3)),this.setAttribute("uv",new St(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ts extends nn{constructor(e=new Ql(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const l=new N,o=new N,c=new j;let h=new N;const u=[],f=[],p=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new St(u,3)),this.setAttribute("normal",new St(f,3)),this.setAttribute("uv",new St(p,2));function _(){for(let M=0;M<t;M++)m(M);m(r===!1?t:0),S(),d()}function m(M){h=e.getPointAt(M/t,h);const y=a.normals[M],w=a.binormals[M];for(let E=0;E<=s;E++){const C=E/s*Math.PI*2,v=Math.sin(C),T=-Math.cos(C);o.x=T*y.x+v*w.x,o.y=T*y.y+v*w.y,o.z=T*y.z+v*w.z,o.normalize(),f.push(o.x,o.y,o.z),l.x=h.x+n*o.x,l.y=h.y+n*o.y,l.z=h.z+n*o.z,u.push(l.x,l.y,l.z)}}function d(){for(let M=1;M<=t;M++)for(let y=1;y<=s;y++){const w=(s+1)*(M-1)+(y-1),E=(s+1)*M+(y-1),C=(s+1)*M+y,v=(s+1)*(M-1)+y;g.push(w,E,v),g.push(E,C,v)}}function S(){for(let M=0;M<=t;M++)for(let y=0;y<=s;y++)c.x=M/t,c.y=y/s,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ts(new Ua[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Ws(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Kc(s))s.isRenderTargetTexture?(it("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Kc(s[0])){const r=[];for(let a=0,l=s.length;a<l;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function yn(i){const e={};for(let t=0;t<i.length;t++){const n=Ws(i[t]);for(const s in n)e[s]=n[s]}return e}function Kc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Fd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:wt.workingColorSpace}const Od={clone:Ws,merge:yn};var Bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bd,this.fragmentShader=zd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ws(e.uniforms),this.uniformsGroups=Fd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ut().setHex(s.value);break;case"v2":this.uniforms[n].value=new j().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new $t().fromArray(s.value);break;case"m3":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class kd extends ui{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class de extends ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Xs extends de{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new j(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ut(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ut(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ut(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Vd extends ki{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Aa,this.normalScale=new j(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=Ul,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hd extends ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gd extends ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ax extends ru{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class ec extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ut(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class xu extends ec{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ut(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const wo=new Lt,Jc=new N,jc=new N;class yu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new j(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new Lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zl,this._frameExtents=new j(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Jc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jc),jc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jc),t.updateMatrixWorld(),wo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Er||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ua=new N,fa=new Ti,Qn=new N;class Mu extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ua,fa,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,fa,Qn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ua,fa,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ua,fa,Qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new N,Qc=new j,eh=new j;class Cn extends Mu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Tl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tl*2*Math.atan(Math.tan(Sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,Qc,eh),t.subVectors(eh,Qc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/c,s*=a.width/o,n*=a.height/c}const l=this.filmOffset;l!==0&&(r+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Wd extends yu{constructor(){super(new Cn(90,1,.5,500)),this.isPointLightShadow=!0}}class Su extends ec{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Wd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class tc extends Mu{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,l=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,l-=h*this.view.offsetY,o=l-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,l,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Xd extends yu{constructor(){super(new tc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fa extends ec{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new Xd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const Rs=-90,Cs=1;class qd extends tn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Cn(Rs,Cs,e,t);s.layers=this.layers,this.add(s);const r=new Cn(Rs,Cs,e,t);r.layers=this.layers,this.add(r);const a=new Cn(Rs,Cs,e,t);a.layers=this.layers,this.add(a);const l=new Cn(Rs,Cs,e,t);l.layers=this.layers,this.add(l);const o=new Cn(Rs,Cs,e,t);o.layers=this.layers,this.add(o);const c=new Cn(Rs,Cs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,l,o]=t;for(const c of t)this.remove(c);if(e===ai)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Er)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,l,o,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yd extends Cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Zd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=$d.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function $d(){this._document.hidden===!1&&this.reset()}const th=new Lt;class Kd{constructor(e,t,n=0,s=1/0){this.ray=new ka(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Yl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Mt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return th.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(th),this}intersectObject(e,t=!0,n=[]){return Cl(e,this,n,t),n.sort(nh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Cl(e[s],this,n,t);return n.sort(nh),n}}function nh(i,e){return i.distance-e.distance}function Cl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,l=r.length;a<l;a++)Cl(r[a],e,t,!0)}}class ih{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=gt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(gt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const lc=class lc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};lc.prototype.isMatrix2=!0;let sh=lc;class Jd extends zi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){it("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function rh(i,e,t,n){const s=jd(n);switch(t){case Zh:return i*e;case kl:return i*e/s.components*s.byteLength;case Vl:return i*e/s.components*s.byteLength;case is:return i*e*2/s.components*s.byteLength;case Hl:return i*e*2/s.components*s.byteLength;case $h:return i*e*3/s.components*s.byteLength;case Yn:return i*e*4/s.components*s.byteLength;case Gl:return i*e*4/s.components*s.byteLength;case va:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ya:case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ko:case jo:return Math.max(i,16)*Math.max(e,8)/4;case $o:case Jo:return Math.max(i,8)*Math.max(e,8)/2;case Qo:case el:case nl:case il:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case tl:case wa:case sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ol:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ll:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case dl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case _l:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case xl:case yl:case Ml:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Sl:case bl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ta:case El:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jd(i){switch(i){case Pn:case Wh:return{byteLength:1,components:1};case Sr:case Xh:case Ei:return{byteLength:2,components:1};case Bl:case zl:return{byteLength:2,components:4};case hi:case Ol:case qn:return{byteLength:4,components:1};case qh:case Yh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Nl}}));typeof window<"u"&&(window.__THREE__?it("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Nl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bu(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Qd(i){const e=new WeakMap;function t(l,o){const c=l.array,h=l.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(o,f),i.bufferData(o,c,h),l.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:u}}function n(l,o,c){const h=o.array,u=o.updateRanges;if(i.bindBuffer(c,l),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const o=e.get(l);o&&(i.deleteBuffer(o.buffer),e.delete(l))}function a(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const h=e.get(l);(!h||h.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=e.get(l);if(c===void 0)e.set(l,t(l,o));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,l,o),c.version=l.version}}return{get:s,remove:r,update:a}}var ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tp=`#ifdef USE_ALPHAHASH
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
#endif`,np=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ip=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ap=`#ifdef USE_AOMAP
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
#endif`,op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lp=`#ifdef USE_BATCHING
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
#endif`,cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dp=`#ifdef USE_IRIDESCENCE
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
#endif`,pp=`#ifdef USE_BUMPMAP
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
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bp=`#define PI 3.141592653589793
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
} // validated`,Ep=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wp=`vec3 transformedNormal = objectNormal;
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
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
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
#endif`,Up=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
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
#endif`,Op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vp=`#ifdef USE_GRADIENTMAP
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
}`,Hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,qp=`#ifdef USE_ENVMAP
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
#endif`,Yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$p=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jp=`PhysicalMaterial material;
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
#endif`,jp=`uniform sampler2D dfgLUT;
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
}`,Qp=`
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
#endif`,e0=`#if defined( RE_IndirectDiffuse )
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
#endif`,t0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,n0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,i0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,s0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,a0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,o0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,l0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,c0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,h0=`#if defined( USE_POINTS_UV )
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
#endif`,u0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,f0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,d0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,p0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,m0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g0=`#ifdef USE_MORPHTARGETS
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
#endif`,_0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,x0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,b0=`#ifdef USE_NORMALMAP
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
#endif`,E0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,w0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,T0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,A0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,R0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,C0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,P0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,D0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,L0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,I0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,N0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,U0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,F0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,B0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,z0=`float getShadowMask() {
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
}`,k0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,V0=`#ifdef USE_SKINNING
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
#endif`,H0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,G0=`#ifdef USE_SKINNING
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
#endif`,W0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,X0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,q0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z0=`#ifdef USE_TRANSMISSION
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
#endif`,$0=`#ifdef USE_TRANSMISSION
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
#endif`,K0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const em=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tm=`uniform sampler2D t2D;
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,im=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,am=`#include <common>
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
}`,om=`#if DEPTH_PACKING == 3200
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
}`,lm=`#define DISTANCE
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
}`,cm=`#define DISTANCE
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
}`,hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,um=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`uniform float scale;
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
}`,dm=`uniform vec3 diffuse;
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
}`,pm=`#include <common>
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
}`,mm=`uniform vec3 diffuse;
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
}`,gm=`#define LAMBERT
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
}`,_m=`#define LAMBERT
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
}`,vm=`#define MATCAP
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
}`,xm=`#define MATCAP
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
}`,ym=`#define NORMAL
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
}`,Mm=`#define NORMAL
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
}`,Sm=`#define PHONG
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
}`,bm=`#define PHONG
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
}`,Em=`#define STANDARD
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
}`,wm=`#define STANDARD
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
}`,Tm=`#define TOON
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
}`,Am=`#define TOON
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
}`,Rm=`uniform float size;
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Pm=`#include <common>
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
}`,Dm=`uniform vec3 color;
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
}`,Lm=`uniform float rotation;
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
}`,Im=`uniform vec3 diffuse;
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
}`,_t={alphahash_fragment:ep,alphahash_pars_fragment:tp,alphamap_fragment:np,alphamap_pars_fragment:ip,alphatest_fragment:sp,alphatest_pars_fragment:rp,aomap_fragment:ap,aomap_pars_fragment:op,batching_pars_vertex:lp,batching_vertex:cp,begin_vertex:hp,beginnormal_vertex:up,bsdfs:fp,iridescence_fragment:dp,bumpmap_pars_fragment:pp,clipping_planes_fragment:mp,clipping_planes_pars_fragment:gp,clipping_planes_pars_vertex:_p,clipping_planes_vertex:vp,color_fragment:xp,color_pars_fragment:yp,color_pars_vertex:Mp,color_vertex:Sp,common:bp,cube_uv_reflection_fragment:Ep,defaultnormal_vertex:wp,displacementmap_pars_vertex:Tp,displacementmap_vertex:Ap,emissivemap_fragment:Rp,emissivemap_pars_fragment:Cp,colorspace_fragment:Pp,colorspace_pars_fragment:Dp,envmap_fragment:Lp,envmap_common_pars_fragment:Ip,envmap_pars_fragment:Np,envmap_pars_vertex:Up,envmap_physical_pars_fragment:qp,envmap_vertex:Fp,fog_vertex:Op,fog_pars_vertex:Bp,fog_fragment:zp,fog_pars_fragment:kp,gradientmap_pars_fragment:Vp,lightmap_pars_fragment:Hp,lights_lambert_fragment:Gp,lights_lambert_pars_fragment:Wp,lights_pars_begin:Xp,lights_toon_fragment:Yp,lights_toon_pars_fragment:Zp,lights_phong_fragment:$p,lights_phong_pars_fragment:Kp,lights_physical_fragment:Jp,lights_physical_pars_fragment:jp,lights_fragment_begin:Qp,lights_fragment_maps:e0,lights_fragment_end:t0,lightprobes_pars_fragment:n0,logdepthbuf_fragment:i0,logdepthbuf_pars_fragment:s0,logdepthbuf_pars_vertex:r0,logdepthbuf_vertex:a0,map_fragment:o0,map_pars_fragment:l0,map_particle_fragment:c0,map_particle_pars_fragment:h0,metalnessmap_fragment:u0,metalnessmap_pars_fragment:f0,morphinstance_vertex:d0,morphcolor_vertex:p0,morphnormal_vertex:m0,morphtarget_pars_vertex:g0,morphtarget_vertex:_0,normal_fragment_begin:v0,normal_fragment_maps:x0,normal_pars_fragment:y0,normal_pars_vertex:M0,normal_vertex:S0,normalmap_pars_fragment:b0,clearcoat_normal_fragment_begin:E0,clearcoat_normal_fragment_maps:w0,clearcoat_pars_fragment:T0,iridescence_pars_fragment:A0,opaque_fragment:R0,packing:C0,premultiplied_alpha_fragment:P0,project_vertex:D0,dithering_fragment:L0,dithering_pars_fragment:I0,roughnessmap_fragment:N0,roughnessmap_pars_fragment:U0,shadowmap_pars_fragment:F0,shadowmap_pars_vertex:O0,shadowmap_vertex:B0,shadowmask_pars_fragment:z0,skinbase_vertex:k0,skinning_pars_vertex:V0,skinning_vertex:H0,skinnormal_vertex:G0,specularmap_fragment:W0,specularmap_pars_fragment:X0,tonemapping_fragment:q0,tonemapping_pars_fragment:Y0,transmission_fragment:Z0,transmission_pars_fragment:$0,uv_pars_fragment:K0,uv_pars_vertex:J0,uv_vertex:j0,worldpos_vertex:Q0,background_vert:em,background_frag:tm,backgroundCube_vert:nm,backgroundCube_frag:im,cube_vert:sm,cube_frag:rm,depth_vert:am,depth_frag:om,distance_vert:lm,distance_frag:cm,equirect_vert:hm,equirect_frag:um,linedashed_vert:fm,linedashed_frag:dm,meshbasic_vert:pm,meshbasic_frag:mm,meshlambert_vert:gm,meshlambert_frag:_m,meshmatcap_vert:vm,meshmatcap_frag:xm,meshnormal_vert:ym,meshnormal_frag:Mm,meshphong_vert:Sm,meshphong_frag:bm,meshphysical_vert:Em,meshphysical_frag:wm,meshtoon_vert:Tm,meshtoon_frag:Am,points_vert:Rm,points_frag:Cm,shadow_vert:Pm,shadow_frag:Dm,sprite_vert:Lm,sprite_frag:Im},Le={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new j(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new j(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},ii={basic:{uniforms:yn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:yn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new ut(0)},envMapIntensity:{value:1}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:yn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:yn([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:yn([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new ut(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:yn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:yn([Le.points,Le.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:yn([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:yn([Le.common,Le.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:yn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:yn([Le.sprite,Le.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distance:{uniforms:yn([Le.common,Le.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distance_vert,fragmentShader:_t.distance_frag},shadow:{uniforms:yn([Le.lights,Le.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};ii.physical={uniforms:yn([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new j(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new j},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new j},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};const da={r:0,b:0,g:0},Nm=new Lt,Eu=new lt;Eu.set(-1,0,0,0,1,0,0,0,1);function Um(i,e,t,n,s,r){const a=new ut(0);let l=s===!0?0:1,o,c,h=null,u=0,f=null;function p(S){let M=S.isScene===!0?S.background:null;if(M&&M.isTexture){const y=S.backgroundBlurriness>0;M=e.get(M,y)}return M}function g(S){let M=!1;const y=p(S);y===null?m(a,l):y&&y.isColor&&(m(y,1),M=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(S,M){const y=p(M);y&&(y.isCubeTexture||y.mapping===za)?(c===void 0&&(c=new Te(new Rt(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:Ws(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Eu),c.material.toneMapped=wt.getTransfer(y.colorSpace)!==Ut,(h!==y||u!==y.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,f=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(o===void 0&&(o=new Te(new Dn(2,2),new ui({name:"BackgroundMaterial",uniforms:Ws(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=y,o.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,o.material.toneMapped=wt.getTransfer(y.colorSpace)!==Ut,y.matrixAutoUpdate===!0&&y.updateMatrix(),o.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||f!==i.toneMapping)&&(o.material.needsUpdate=!0,h=y,u=y.version,f=i.toneMapping),o.layers.enableAll(),S.unshift(o,o.geometry,o.material,0,0,null))}function m(S,M){S.getRGB(da,vu(i)),t.buffers.color.setClear(da.r,da.g,da.b,M,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),l=M,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,m(a,l)},render:g,addToRenderList:_,dispose:d}}function Fm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function l(U,V,Q,ee,B){let q=!1;const W=u(U,ee,Q,V);r!==W&&(r=W,c(r.object)),q=p(U,ee,Q,B),q&&g(U,ee,Q,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,y(U,V,Q,ee),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function o(){return i.createVertexArray()}function c(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function u(U,V,Q,ee){const B=ee.wireframe===!0;let q=n[V.id];q===void 0&&(q={},n[V.id]=q);const W=U.isInstancedMesh===!0?U.id:0;let ie=q[W];ie===void 0&&(ie={},q[W]=ie);let ae=ie[Q.id];ae===void 0&&(ae={},ie[Q.id]=ae);let X=ae[B];return X===void 0&&(X=f(o()),ae[B]=X),X}function f(U){const V=[],Q=[],ee=[];for(let B=0;B<t;B++)V[B]=0,Q[B]=0,ee[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:Q,attributeDivisors:ee,object:U,attributes:{},index:null}}function p(U,V,Q,ee){const B=r.attributes,q=V.attributes;let W=0;const ie=Q.getAttributes();for(const ae in ie)if(ie[ae].location>=0){const Y=B[ae];let he=q[ae];if(he===void 0&&(ae==="instanceMatrix"&&U.instanceMatrix&&(he=U.instanceMatrix),ae==="instanceColor"&&U.instanceColor&&(he=U.instanceColor)),Y===void 0||Y.attribute!==he||he&&Y.data!==he.data)return!0;W++}return r.attributesNum!==W||r.index!==ee}function g(U,V,Q,ee){const B={},q=V.attributes;let W=0;const ie=Q.getAttributes();for(const ae in ie)if(ie[ae].location>=0){let Y=q[ae];Y===void 0&&(ae==="instanceMatrix"&&U.instanceMatrix&&(Y=U.instanceMatrix),ae==="instanceColor"&&U.instanceColor&&(Y=U.instanceColor));const he={};he.attribute=Y,Y&&Y.data&&(he.data=Y.data),B[ae]=he,W++}r.attributes=B,r.attributesNum=W,r.index=ee}function _(){const U=r.newAttributes;for(let V=0,Q=U.length;V<Q;V++)U[V]=0}function m(U){d(U,0)}function d(U,V){const Q=r.newAttributes,ee=r.enabledAttributes,B=r.attributeDivisors;Q[U]=1,ee[U]===0&&(i.enableVertexAttribArray(U),ee[U]=1),B[U]!==V&&(i.vertexAttribDivisor(U,V),B[U]=V)}function S(){const U=r.newAttributes,V=r.enabledAttributes;for(let Q=0,ee=V.length;Q<ee;Q++)V[Q]!==U[Q]&&(i.disableVertexAttribArray(Q),V[Q]=0)}function M(U,V,Q,ee,B,q,W){W===!0?i.vertexAttribIPointer(U,V,Q,B,q):i.vertexAttribPointer(U,V,Q,ee,B,q)}function y(U,V,Q,ee){_();const B=ee.attributes,q=Q.getAttributes(),W=V.defaultAttributeValues;for(const ie in q){const ae=q[ie];if(ae.location>=0){let X=B[ie];if(X===void 0&&(ie==="instanceMatrix"&&U.instanceMatrix&&(X=U.instanceMatrix),ie==="instanceColor"&&U.instanceColor&&(X=U.instanceColor)),X!==void 0){const Y=X.normalized,he=X.itemSize,Ie=e.get(X);if(Ie===void 0)continue;const ft=Ie.buffer,Qe=Ie.type,re=Ie.bytesPerElement,ve=Qe===i.INT||Qe===i.UNSIGNED_INT||X.gpuType===Ol;if(X.isInterleavedBufferAttribute){const me=X.data,Ne=me.stride,Xe=X.offset;if(me.isInstancedInterleavedBuffer){for(let Oe=0;Oe<ae.locationSize;Oe++)d(ae.location+Oe,me.meshPerAttribute);U.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Oe=0;Oe<ae.locationSize;Oe++)m(ae.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Oe=0;Oe<ae.locationSize;Oe++)M(ae.location+Oe,he/ae.locationSize,Qe,Y,Ne*re,(Xe+he/ae.locationSize*Oe)*re,ve)}else{if(X.isInstancedBufferAttribute){for(let me=0;me<ae.locationSize;me++)d(ae.location+me,X.meshPerAttribute);U.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let me=0;me<ae.locationSize;me++)m(ae.location+me);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let me=0;me<ae.locationSize;me++)M(ae.location+me,he/ae.locationSize,Qe,Y,he*re,he/ae.locationSize*me*re,ve)}}else if(W!==void 0){const Y=W[ie];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(ae.location,Y);break;case 3:i.vertexAttrib3fv(ae.location,Y);break;case 4:i.vertexAttrib4fv(ae.location,Y);break;default:i.vertexAttrib1fv(ae.location,Y)}}}}S()}function w(){T();for(const U in n){const V=n[U];for(const Q in V){const ee=V[Q];for(const B in ee){const q=ee[B];for(const W in q)h(q[W].object),delete q[W];delete ee[B]}}delete n[U]}}function E(U){if(n[U.id]===void 0)return;const V=n[U.id];for(const Q in V){const ee=V[Q];for(const B in ee){const q=ee[B];for(const W in q)h(q[W].object),delete q[W];delete ee[B]}}delete n[U.id]}function C(U){for(const V in n){const Q=n[V];for(const ee in Q){const B=Q[ee];if(B[U.id]===void 0)continue;const q=B[U.id];for(const W in q)h(q[W].object),delete q[W];delete B[U.id]}}}function v(U){for(const V in n){const Q=n[V],ee=U.isInstancedMesh===!0?U.id:0,B=Q[ee];if(B!==void 0){for(const q in B){const W=B[q];for(const ie in W)h(W[ie].object),delete W[ie];delete B[q]}delete Q[ee],Object.keys(Q).length===0&&delete n[V]}}}function T(){D(),a=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:T,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Om(i,e,t){let n;function s(o){n=o}function r(o,c){i.drawArrays(n,o,c),t.update(c,n,1)}function a(o,c,h){h!==0&&(i.drawArraysInstanced(n,o,c,h),t.update(c,n,h))}function l(o,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,c,0,h);let f=0;for(let p=0;p<h;p++)f+=c[p];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=l}function Bm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Yn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(C){const v=C===Ei&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Pn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==qn&&!v)}function o(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=o(c);h!==c&&(it("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&it("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:y,maxSamples:w,samples:E}}function zm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new xi,l=new lt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,M=S*4;let y=d.clippingState||null;o.value=y,y=h(g,f,M,p);for(let w=0;w!==M;++w)y[w]=t[w];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=o.value,g!==!0||m===null){const d=p+_*4,S=f.matrixWorldInverse;l.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,y=p;M!==_;++M,y+=4)a.copy(u[M]).applyMatrix4(S,l),a.normal.toArray(m,y),m[y+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const Oi=4,ah=[.125,.215,.35,.446,.526,.582],Ji=20,km=256,hr=new tc,oh=new ut;let To=null,Ao=0,Ro=0,Co=!1;const Vm=new N;class Pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:l=Vm}=r;To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,l),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ch(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(To,Ao,Ro),this._renderer.xr.enabled=Co,e.scissorTest=!1,Ps(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),To=this._renderer.getRenderTarget(),Ao=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Ei,format:Yn,colorSpace:Ra,depthBuffer:!1},s=lh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lh(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Hm(r)),this._blurMaterial=Wm(r,e,t),this._ggxMaterial=Gm(r,e,t)}return s}_compileMaterial(e){const t=new Te(new nn,e);this._renderer.compile(t,hr)}_sceneToCubeUV(e,t,n,s,r){const o=new Cn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(oh),u.toneMapping=oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Te(new Rt,new ss({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let d=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,d=!0):(m.color.copy(oh),d=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(o.up.set(0,c[M],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+h[M],r.y,r.z)):y===1?(o.up.set(0,0,c[M]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+h[M],r.z)):(o.up.set(0,c[M],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+h[M]));const w=this._cubeSize;Ps(s,y*w,M>2?w:0,w,w),u.setRenderTarget(s),d&&u.render(_,o),u.render(e,o)}u.toneMapping=p,u.autoClear=f,e.background=S}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ns||e.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ch());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const l=r.uniforms;l.envMap.value=e;const o=this._cubeSize;Ps(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,hr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,l=this._lodMeshes[n];l.material=a;const o=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),f=0+c*1.25,p=u*f,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-Oi?n-g+Oi:0),d=4*(this._cubeSize-_);o.envMap.value=e.texture,o.roughness.value=p,o.mipInt.value=g-t,Ps(r,m,d,3*_,2*_),s.setRenderTarget(r),s.render(l,hr),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,Ps(e,m,d,3*_,2*_),s.setRenderTarget(e),s.render(l,hr)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,l){const o=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Mt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=c;const f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ji-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ji;m>Ji&&it(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ji}`);const d=[];let S=0;for(let C=0;C<Ji;++C){const v=C/_,T=Math.exp(-v*v/2);d.push(T),C===0?S+=T:C<m&&(S+=2*T)}for(let C=0;C<d.length;C++)d[C]=d[C]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",l&&(f.poleAxis.value=l);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const y=this._sizeLods[s],w=3*y*(s>M-Oi?s-M+Oi:0),E=4*(this._cubeSize-y);Ps(t,w,E,3*y,2*y),o.setRenderTarget(t),o.render(u,hr)}}function Hm(i){const e=[],t=[],n=[];let s=i;const r=i-Oi+1+ah.length;for(let a=0;a<r;a++){const l=Math.pow(2,s);e.push(l);let o=1/l;a>i-Oi?o=ah[a-i+Oi-1]:a===0&&(o=0),t.push(o);const c=1/(l-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,S=new Float32Array(_*g*p),M=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let E=0;E<p;E++){const C=E%3*2/3-1,v=E>2?0:-1,T=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];S.set(T,_*g*E),M.set(f,m*g*E);const D=[E,E,E,E,E,E];y.set(D,d*g*E)}const w=new nn;w.setAttribute("position",new Bn(S,_)),w.setAttribute("uv",new Bn(M,m)),w.setAttribute("faceIndex",new Bn(y,d)),n.push(new Te(w,null)),s>Oi&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function lh(i,e,t){const n=new ci(i,e,t);return n.texture.mapping=za,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ps(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Gm(i,e,t){return new ui({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:km,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Wm(i,e,t){const n=new Float32Array(Ji),s=new N(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function ch(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Va(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function hh(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Va(){return`

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
	`}class wu extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new au(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Rt(5,5,5),r=new ui({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:Mi});r.uniforms.tEquirect.value=t;const a=new Te(s,r),l=t.minFilter;return t.minFilter===Qi&&(t.minFilter=_n),new qd(1,10,this).update(e,a),t.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function Xm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,p=!1){return f==null?null:p?a(f):r(f)}function r(f){if(f&&f.isTexture){const p=f.mapping;if(p===Ya||p===Za)if(e.has(f)){const g=e.get(f).texture;return l(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const _=new wu(g.height);return _.fromEquirectangularTexture(i,f),e.set(f,_),f.addEventListener("dispose",c),l(_.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const p=f.mapping,g=p===Ya||p===Za,_=p===ns||p===Vs;if(g||_){let m=t.get(f);const d=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==d)return n===null&&(n=new Pl(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const S=f.image;return g&&S&&S.height>0||_&&S&&o(S)?(n===null&&(n=new Pl(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function l(f,p){return p===Ya?f.mapping=ns:p===Za&&(f.mapping=Vs),f}function o(f){let p=0;const g=6;for(let _=0;_<g;_++)f[_]!==void 0&&p++;return p===g}function c(f){const p=f.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(f){const p=f.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function qm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Os("WebGLRenderer: "+n+" extension not supported."),s}}}function Ym(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function l(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function o(u){const f=u.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER)}function c(u){const f=[],p=u.index,g=u.attributes.position;let _=0;if(g===void 0)return;if(p!==null){const S=p.array;_=p.version;for(let M=0,y=S.length;M<y;M+=3){const w=S[M+0],E=S[M+1],C=S[M+2];f.push(w,E,E,C,C,w)}}else{const S=g.array;_=g.version;for(let M=0,y=S.length/3-1;M<y;M+=3){const w=M+0,E=M+1,C=M+2;f.push(w,E,E,C,C,w)}}const m=new(g.count>=65535?tu:eu)(f,1);m.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:l,update:o,getWireframeAttribute:h}}function Zm(i,e,t){let n;function s(u){n=u}let r,a;function l(u){r=u.type,a=u.bytesPerElement}function o(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function c(u,f,p){p!==0&&(i.drawElementsInstanced(n,f,r,u*a,p),t.update(f,n,p))}function h(u,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,p);let _=0;for(let m=0;m<p;m++)_+=f[m];t.update(_,n,1)}this.setMode=s,this.setIndex=l,this.render=o,this.renderInstances=c,this.renderMultiDraw=h}function $m(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,l){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=l*(r/3);break;case i.LINES:t.lines+=l*(r/2);break;case i.LINE_STRIP:t.lines+=l*(r-1);break;case i.LINE_LOOP:t.lines+=l*r;break;case i.POINTS:t.points+=l*r;break;default:Mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Km(i,e,t){const n=new WeakMap,s=new $t;function r(a,l,o){const c=a.morphTargetInfluences,h=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(l);if(f===void 0||f.count!==u){let T=function(){C.dispose(),n.delete(l),l.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();const p=l.morphAttributes.position!==void 0,g=l.morphAttributes.normal!==void 0,_=l.morphAttributes.color!==void 0,m=l.morphAttributes.position||[],d=l.morphAttributes.normal||[],S=l.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let y=l.attributes.position.count*M,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*w*4*u),C=new Jh(E,y,w,u);C.type=qn,C.needsUpdate=!0;const v=M*4;for(let D=0;D<u;D++){const U=m[D],V=d[D],Q=S[D],ee=y*w*4*D;for(let B=0;B<U.count;B++){const q=B*v;p===!0&&(s.fromBufferAttribute(U,B),E[ee+q+0]=s.x,E[ee+q+1]=s.y,E[ee+q+2]=s.z,E[ee+q+3]=0),g===!0&&(s.fromBufferAttribute(V,B),E[ee+q+4]=s.x,E[ee+q+5]=s.y,E[ee+q+6]=s.z,E[ee+q+7]=0),_===!0&&(s.fromBufferAttribute(Q,B),E[ee+q+8]=s.x,E[ee+q+9]=s.y,E[ee+q+10]=s.z,E[ee+q+11]=Q.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new j(y,w)},n.set(l,f),l.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=l.morphTargetsRelative?1:1-p;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Jm(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return f}function l(){r=new WeakMap}function o(c){const h=c.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:l}}const jm={[Oh]:"LINEAR_TONE_MAPPING",[Bh]:"REINHARD_TONE_MAPPING",[zh]:"CINEON_TONE_MAPPING",[Fl]:"ACES_FILMIC_TONE_MAPPING",[Vh]:"AGX_TONE_MAPPING",[Hh]:"NEUTRAL_TONE_MAPPING",[kh]:"CUSTOM_TONE_MAPPING"};function Qm(i,e,t,n,s,r){const a=new ci(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Hs(e,t):void 0}),l=new ci(e,t,{type:Ei,depthBuffer:!1,stencilBuffer:!1}),o=new nn;o.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new St([0,2,0,0,2,0],2));const c=new kd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Te(o,c),u=new tc(-1,1,1,-1,0,1);let f=null,p=null,g=!1,_,m=null,d=[],S=!1;this.setSize=function(M,y){a.setSize(M,y),l.setSize(M,y);for(let w=0;w<d.length;w++){const E=d[w];E.setSize&&E.setSize(M,y)}},this.setEffects=function(M){d=M,S=d.length>0&&d[0].isRenderPass===!0;const y=a.width,w=a.height;for(let E=0;E<d.length;E++){const C=d[E];C.setSize&&C.setSize(y,w)}},this.begin=function(M,y){if(g||M.toneMapping===oi&&d.length===0)return!1;if(m=y,y!==null){const w=y.width,E=y.height;(a.width!==w||a.height!==E)&&this.setSize(w,E)}return S===!1&&M.setRenderTarget(a),_=M.toneMapping,M.toneMapping=oi,!0},this.hasRenderPass=function(){return S},this.end=function(M,y){M.toneMapping=_,g=!0;let w=a,E=l;for(let C=0;C<d.length;C++){const v=d[C];if(v.enabled!==!1&&(v.render(M,E,w,y),v.needsSwap!==!1)){const T=w;w=E,E=T}}if(f!==M.outputColorSpace||p!==M.toneMapping){f=M.outputColorSpace,p=M.toneMapping,c.defines={},wt.getTransfer(f)===Ut&&(c.defines.SRGB_TRANSFER="");const C=jm[p];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,M.setRenderTarget(m),M.render(h,u),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),l.dispose(),o.dispose(),c.dispose()}}const Tu=new vn,Dl=new Hs(1,1),Au=new Jh,Ru=new zf,Cu=new au,uh=[],fh=[],dh=new Float32Array(16),ph=new Float32Array(9),mh=new Float32Array(4);function Ys(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=uh[s];if(r===void 0&&(r=new Float32Array(s),uh[s]=r),e!==0){n.toArray(r,0);for(let a=1,l=0;a!==e;++a)l+=t,i[a].toArray(r,l)}return r}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ha(i,e){let t=fh[e];t===void 0&&(t=new Int32Array(e),fh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function eg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function tg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function sg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;mh.set(n),i.uniformMatrix2fv(this.addr,!1,mh),on(t,n)}}function rg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;ph.set(n),i.uniformMatrix3fv(this.addr,!1,ph),on(t,n)}}function ag(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;dh.set(n),i.uniformMatrix4fv(this.addr,!1,dh),on(t,n)}}function og(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function hg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function ug(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function fg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function dg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function mg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dl.compareFunction=t.isReversedDepthBuffer()?Xl:Wl,r=Dl):r=Tu,t.setTexture2D(e||r,s)}function gg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ru,s)}function _g(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Cu,s)}function vg(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Au,s)}function xg(i){switch(i){case 5126:return eg;case 35664:return tg;case 35665:return ng;case 35666:return ig;case 35674:return sg;case 35675:return rg;case 35676:return ag;case 5124:case 35670:return og;case 35667:case 35671:return lg;case 35668:case 35672:return cg;case 35669:case 35673:return hg;case 5125:return ug;case 36294:return fg;case 36295:return dg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return mg;case 35679:case 36299:case 36307:return gg;case 35680:case 36300:case 36308:case 36293:return _g;case 36289:case 36303:case 36311:case 36292:return vg}}function yg(i,e){i.uniform1fv(this.addr,e)}function Mg(i,e){const t=Ys(e,this.size,2);i.uniform2fv(this.addr,t)}function Sg(i,e){const t=Ys(e,this.size,3);i.uniform3fv(this.addr,t)}function bg(i,e){const t=Ys(e,this.size,4);i.uniform4fv(this.addr,t)}function Eg(i,e){const t=Ys(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function wg(i,e){const t=Ys(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tg(i,e){const t=Ys(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ag(i,e){i.uniform1iv(this.addr,e)}function Rg(i,e){i.uniform2iv(this.addr,e)}function Cg(i,e){i.uniform3iv(this.addr,e)}function Pg(i,e){i.uniform4iv(this.addr,e)}function Dg(i,e){i.uniform1uiv(this.addr,e)}function Lg(i,e){i.uniform2uiv(this.addr,e)}function Ig(i,e){i.uniform3uiv(this.addr,e)}function Ng(i,e){i.uniform4uiv(this.addr,e)}function Ug(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Dl:a=Tu;for(let l=0;l!==s;++l)t.setTexture2D(e[l]||a,r[l])}function Fg(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ru,r[a])}function Og(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Cu,r[a])}function Bg(i,e,t){const n=this.cache,s=e.length,r=Ha(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Au,r[a])}function zg(i){switch(i){case 5126:return yg;case 35664:return Mg;case 35665:return Sg;case 35666:return bg;case 35674:return Eg;case 35675:return wg;case 35676:return Tg;case 5124:case 35670:return Ag;case 35667:case 35671:return Rg;case 35668:case 35672:return Cg;case 35669:case 35673:return Pg;case 5125:return Dg;case 36294:return Lg;case 36295:return Ig;case 36296:return Ng;case 35678:case 36198:case 36298:case 36306:case 35682:return Ug;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return Bg}}class kg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=xg(t.type)}}class Vg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zg(t.type)}}class Hg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const l=s[r];l.setValue(e,t[l.id],n)}}}const Po=/(\w+)(\])?(\[|\.)?/g;function gh(i,e){i.seq.push(e),i.map[e.id]=e}function Gg(i,e,t){const n=i.name,s=n.length;for(Po.lastIndex=0;;){const r=Po.exec(n),a=Po.lastIndex;let l=r[1];const o=r[2]==="]",c=r[3];if(o&&(l=l|0),c===void 0||c==="["&&a+2===s){gh(t,c===void 0?new kg(l,i,e):new Vg(l,i,e));break}else{let u=t.map[l];u===void 0&&(u=new Hg(l),gh(t,u)),t=u}}}class ba{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const l=e.getActiveUniform(t,a),o=e.getUniformLocation(t,l.name);Gg(l,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const l=t[r],o=n[l.id];o.needsUpdate!==!1&&l.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function _h(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Wg=37297;let Xg=0;function qg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const l=a+1;n.push(`${l===e?">":" "} ${l}: ${t[a]}`)}return n.join(`
`)}const vh=new lt;function Yg(i){wt._getMatrix(vh,wt.workingColorSpace,i);const e=`mat3( ${vh.elements.map(t=>t.toFixed(4))} )`;switch(wt.getTransfer(i)){case Ca:return[e,"LinearTransferOETF"];case Ut:return[e,"sRGBTransferOETF"];default:return it("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function xh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+qg(i.getShaderSource(e),l)}else return r}function Zg(i,e){const t=Yg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const $g={[Oh]:"Linear",[Bh]:"Reinhard",[zh]:"Cineon",[Fl]:"ACESFilmic",[Vh]:"AgX",[Hh]:"Neutral",[kh]:"Custom"};function Kg(i,e){const t=$g[e];return t===void 0?(it("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const pa=new N;function Jg(){wt.getLuminanceCoefficients(pa);const i=pa.x.toFixed(4),e=pa.y.toFixed(4),t=pa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_r).join(`
`)}function Qg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function e_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let l=1;r.type===i.FLOAT_MAT2&&(l=2),r.type===i.FLOAT_MAT3&&(l=3),r.type===i.FLOAT_MAT4&&(l=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:l}}return t}function _r(i){return i!==""}function yh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const t_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ll(i){return i.replace(t_,i_)}const n_=new Map;function i_(i,e){let t=_t[e];if(t===void 0){const n=n_.get(e);if(n!==void 0)t=_t[n],it('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ll(t)}const s_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sh(i){return i.replace(s_,r_)}function r_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const a_={[vr]:"SHADOWMAP_TYPE_PCF",[pr]:"SHADOWMAP_TYPE_VSM"};function o_(i){return a_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const l_={[ns]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE",[za]:"ENVMAP_TYPE_CUBE_UV"};function c_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":l_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const h_={[Vs]:"ENVMAP_MODE_REFRACTION"};function u_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":h_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const f_={[Ul]:"ENVMAP_BLENDING_MULTIPLY",[_f]:"ENVMAP_BLENDING_MIX",[vf]:"ENVMAP_BLENDING_ADD"};function d_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":f_[i.combine]||"ENVMAP_BLENDING_NONE"}function p_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function m_(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,l=t.fragmentShader;const o=o_(t),c=c_(t),h=u_(t),u=d_(t),f=p_(t),p=jg(t),g=Qg(r),_=s.createProgram();let m,d,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_r).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_r).join(`
`),d.length>0&&(d+=`
`)):(m=[bh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_r).join(`
`),d=[bh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?_t.tonemapping_pars_fragment:"",t.toneMapping!==oi?Kg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,Zg("linearToOutputTexel",t.outputColorSpace),Jg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_r).join(`
`)),a=Ll(a),a=yh(a,t),a=Mh(a,t),l=Ll(l),l=yh(l,t),l=Mh(l,t),a=Sh(a),l=Sh(l),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=S+m+a,y=S+d+l,w=_h(s,s.VERTEX_SHADER,M),E=_h(s,s.FRAGMENT_SHADER,y);s.attachShader(_,w),s.attachShader(_,E),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(U){if(i.debug.checkShaderErrors){const V=s.getProgramInfoLog(_)||"",Q=s.getShaderInfoLog(w)||"",ee=s.getShaderInfoLog(E)||"",B=V.trim(),q=Q.trim(),W=ee.trim();let ie=!0,ae=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,E);else{const X=xh(s,w,"vertex"),Y=xh(s,E,"fragment");Mt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+X+`
`+Y)}else B!==""?it("WebGLProgram: Program Info Log:",B):(q===""||W==="")&&(ae=!1);ae&&(U.diagnostics={runnable:ie,programLog:B,vertexShader:{log:q,prefix:m},fragmentShader:{log:W,prefix:d}})}s.deleteShader(w),s.deleteShader(E),v=new ba(s,_),T=e_(s,_)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,Wg)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Xg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let g_=0;class __{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new v_(e),t.set(e,n)),n}}class v_{constructor(e){this.id=g_++,this.code=e,this.usedTimes=0}}function x_(i){return i===is||i===wa||i===Ta}function y_(i,e,t,n,s,r){const a=new Yl,l=new __,o=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return o.add(v),v===0?"uv":`uv${v}`}function _(v,T,D,U,V,Q){const ee=U.fog,B=V.geometry,q=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||q,W),ae=ie&&ie.mapping===za?ie.image.height:null,X=p[v.type];v.precision!==null&&(f=n.getMaxPrecision(v.precision),f!==v.precision&&it("WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const Y=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,he=Y!==void 0?Y.length:0;let Ie=0;B.morphAttributes.position!==void 0&&(Ie=1),B.morphAttributes.normal!==void 0&&(Ie=2),B.morphAttributes.color!==void 0&&(Ie=3);let ft,Qe,re,ve;if(X){const ze=ii[X];ft=ze.vertexShader,Qe=ze.fragmentShader}else{ft=v.vertexShader,Qe=v.fragmentShader;const ze=l.getVertexShaderStage(v),Ft=l.getFragmentShaderStage(v);l.update(v,ze,Ft),re=ze.id,ve=Ft.id}const me=i.getRenderTarget(),Ne=i.state.buffers.depth.getReversed(),Xe=V.isInstancedMesh===!0,Oe=V.isBatchedMesh===!0,ct=!!v.map,je=!!v.matcap,fe=!!ie,ge=!!v.aoMap,_e=!!v.lightMap,Ae=!!v.bumpMap&&v.wireframe===!1,Me=!!v.normalMap,Je=!!v.displacementMap,Ve=!!v.emissiveMap,tt=!!v.metalnessMap,rt=!!v.roughnessMap,O=v.anisotropy>0,Tt=v.clearcoat>0,vt=v.dispersion>0,R=v.iridescence>0,x=v.sheen>0,G=v.transmission>0,$=O&&!!v.anisotropyMap,se=Tt&&!!v.clearcoatMap,ue=Tt&&!!v.clearcoatNormalMap,ye=Tt&&!!v.clearcoatRoughnessMap,ne=R&&!!v.iridescenceMap,ce=R&&!!v.iridescenceThicknessMap,we=x&&!!v.sheenColorMap,qe=x&&!!v.sheenRoughnessMap,Re=!!v.specularMap,be=!!v.specularColorMap,He=!!v.specularIntensityMap,et=G&&!!v.transmissionMap,at=G&&!!v.thicknessMap,k=!!v.gradientMap,Se=!!v.alphaMap,le=v.alphaTest>0,Ee=!!v.alphaHash,De=!!v.extensions;let pe=oi;v.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(pe=i.toneMapping);const Ge={shaderID:X,shaderType:v.type,shaderName:v.name,vertexShader:ft,fragmentShader:Qe,defines:v.defines,customVertexShaderID:re,customFragmentShaderID:ve,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&V._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&V.instanceColor!==null,instancingMorph:Xe&&V.morphTexture!==null,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:wt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ct,matcap:je,envMap:fe,envMapMode:fe&&ie.mapping,envMapCubeUVHeight:ae,aoMap:ge,lightMap:_e,bumpMap:Ae,normalMap:Me,displacementMap:Je,emissiveMap:Ve,normalMapObjectSpace:Me&&v.normalMapType===Mf,normalMapTangentSpace:Me&&v.normalMapType===Aa,packedNormalMap:Me&&v.normalMapType===Aa&&x_(v.normalMap.format),metalnessMap:tt,roughnessMap:rt,anisotropy:O,anisotropyMap:$,clearcoat:Tt,clearcoatMap:se,clearcoatNormalMap:ue,clearcoatRoughnessMap:ye,dispersion:vt,iridescence:R,iridescenceMap:ne,iridescenceThicknessMap:ce,sheen:x,sheenColorMap:we,sheenRoughnessMap:qe,specularMap:Re,specularColorMap:be,specularIntensityMap:He,transmission:G,transmissionMap:et,thicknessMap:at,gradientMap:k,opaque:v.transparent===!1&&v.blending===Fs&&v.alphaToCoverage===!1,alphaMap:Se,alphaTest:le,alphaHash:Ee,combine:v.combine,mapUv:ct&&g(v.map.channel),aoMapUv:ge&&g(v.aoMap.channel),lightMapUv:_e&&g(v.lightMap.channel),bumpMapUv:Ae&&g(v.bumpMap.channel),normalMapUv:Me&&g(v.normalMap.channel),displacementMapUv:Je&&g(v.displacementMap.channel),emissiveMapUv:Ve&&g(v.emissiveMap.channel),metalnessMapUv:tt&&g(v.metalnessMap.channel),roughnessMapUv:rt&&g(v.roughnessMap.channel),anisotropyMapUv:$&&g(v.anisotropyMap.channel),clearcoatMapUv:se&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:we&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:qe&&g(v.sheenRoughnessMap.channel),specularMapUv:Re&&g(v.specularMap.channel),specularColorMapUv:be&&g(v.specularColorMap.channel),specularIntensityMapUv:He&&g(v.specularIntensityMap.channel),transmissionMapUv:et&&g(v.transmissionMap.channel),thicknessMapUv:at&&g(v.thicknessMap.channel),alphaMapUv:Se&&g(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||O),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!B.attributes.uv&&(ct||Se),fog:!!ee,useFog:v.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ne,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:Ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:pe,decodeVideoTexture:ct&&v.map.isVideoTexture===!0&&wt.getTransfer(v.map.colorSpace)===Ut,decodeVideoTextureEmissive:Ve&&v.emissiveMap.isVideoTexture===!0&&wt.getTransfer(v.emissiveMap.colorSpace)===Ut,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Jt,flipSided:v.side===Mn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:De&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(De&&v.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ge.vertexUv1s=o.has(1),Ge.vertexUv2s=o.has(2),Ge.vertexUv3s=o.has(3),o.clear(),Ge}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)T.push(D),T.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(d(T,v),S(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function d(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function S(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function M(v){const T=p[v.type];let D;if(T){const U=ii[T];D=Od.clone(U.uniforms)}else D=v.uniforms;return D}function y(v,T){let D=h.get(T);return D!==void 0?++D.usedTimes:(D=new m_(i,T,v,s),c.push(D),h.set(T,D)),D}function w(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function E(v){l.remove(v)}function C(){l.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:M,acquireProgram:y,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:C}}function M_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let l=i.get(a);return l===void 0&&(l={},i.set(a,l)),l}function n(a){i.delete(a)}function s(a,l,o){i.get(a)[l]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function S_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Eh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function l(f,p,g,_,m,d){let S=i[e];return S===void 0?(S={id:f.id,object:f,geometry:p,material:g,materialVariant:a(f),groupOrder:_,renderOrder:f.renderOrder,z:m,group:d},i[e]=S):(S.id=f.id,S.object=f,S.geometry=p,S.material=g,S.materialVariant=a(f),S.groupOrder=_,S.renderOrder=f.renderOrder,S.z=m,S.group=d),e++,S}function o(f,p,g,_,m,d){const S=l(f,p,g,_,m,d);g.transmission>0?n.push(S):g.transparent===!0?s.push(S):t.push(S)}function c(f,p,g,_,m,d){const S=l(f,p,g,_,m,d);g.transmission>0?n.unshift(S):g.transparent===!0?s.unshift(S):t.unshift(S)}function h(f,p,g){t.length>1&&t.sort(f||S_),n.length>1&&n.sort(p||Eh),s.length>1&&s.sort(p||Eh),g&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let f=e,p=i.length;f<p;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:h}}function b_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new wh,i.set(n,[a])):s>=r.length?(a=new wh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function E_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ut};break;case"SpotLight":t={position:new N,direction:new N,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ut,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":t={color:new ut,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function w_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new j,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let T_=0;function A_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function R_(i){const e=new E_,t=w_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const s=new N,r=new Lt,a=new Lt;function l(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,S=0,M=0,y=0,w=0,E=0,C=0;c.sort(A_);for(let T=0,D=c.length;T<D;T++){const U=c[T],V=U.color,Q=U.intensity,ee=U.distance;let B=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===is?B=U.shadow.map.texture:B=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=V.r*Q,u+=V.g*Q,f+=V.b*Q;else if(U.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(U.sh.coefficients[q],Q);C++}else if(U.isDirectionalLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const W=U.shadow,ie=t.get(U);ie.shadowIntensity=W.intensity,ie.shadowBias=W.bias,ie.shadowNormalBias=W.normalBias,ie.shadowRadius=W.radius,ie.shadowMapSize=W.mapSize,n.directionalShadow[p]=ie,n.directionalShadowMap[p]=B,n.directionalShadowMatrix[p]=U.shadow.matrix,S++}n.directional[p]=q,p++}else if(U.isSpotLight){const q=e.get(U);q.position.setFromMatrixPosition(U.matrixWorld),q.color.copy(V).multiplyScalar(Q),q.distance=ee,q.coneCos=Math.cos(U.angle),q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),q.decay=U.decay,n.spot[_]=q;const W=U.shadow;if(U.map&&(n.spotLightMap[w]=U.map,w++,W.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[_]=W.matrix,U.castShadow){const ie=t.get(U);ie.shadowIntensity=W.intensity,ie.shadowBias=W.bias,ie.shadowNormalBias=W.normalBias,ie.shadowRadius=W.radius,ie.shadowMapSize=W.mapSize,n.spotShadow[_]=ie,n.spotShadowMap[_]=B,y++}_++}else if(U.isRectAreaLight){const q=e.get(U);q.color.copy(V).multiplyScalar(Q),q.halfWidth.set(U.width*.5,0,0),q.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=q,m++}else if(U.isPointLight){const q=e.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),q.distance=U.distance,q.decay=U.decay,U.castShadow){const W=U.shadow,ie=t.get(U);ie.shadowIntensity=W.intensity,ie.shadowBias=W.bias,ie.shadowNormalBias=W.normalBias,ie.shadowRadius=W.radius,ie.shadowMapSize=W.mapSize,ie.shadowCameraNear=W.camera.near,ie.shadowCameraFar=W.camera.far,n.pointShadow[g]=ie,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=U.shadow.matrix,M++}n.point[g]=q,g++}else if(U.isHemisphereLight){const q=e.get(U);q.skyColor.copy(U.color).multiplyScalar(Q),q.groundColor.copy(U.groundColor).multiplyScalar(Q),n.hemi[d]=q,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Le.LTC_FLOAT_1,n.rectAreaLTC2=Le.LTC_FLOAT_2):(n.rectAreaLTC1=Le.LTC_HALF_1,n.rectAreaLTC2=Le.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const v=n.hash;(v.directionalLength!==p||v.pointLength!==g||v.spotLength!==_||v.rectAreaLength!==m||v.hemiLength!==d||v.numDirectionalShadows!==S||v.numPointShadows!==M||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,v.directionalLength=p,v.pointLength=g,v.spotLength=_,v.rectAreaLength=m,v.hemiLength=d,v.numDirectionalShadows=S,v.numPointShadows=M,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=C,n.version=T_++)}function o(c,h){let u=0,f=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,S=c.length;d<S;d++){const M=c[d];if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(M.isSpotLight){const y=n.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:l,setupView:o,state:n}}function Th(i){const e=new R_(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function l(f){n.push(f)}function o(f){s.push(f)}function c(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:l,pushLightProbeGrid:o}}function C_(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let l;return a===void 0?(l=new Th(i),e.set(s,[l])):r>=a.length?(l=new Th(i),a.push(l)):l=a[r],l}function n(){e=new WeakMap}return{get:t,dispose:n}}const P_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D_=`uniform sampler2D shadow_pass;
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
}`,L_=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],I_=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Ah=new Lt,ur=new N,Do=new N;function N_(i,e,t){let n=new Zl;const s=new j,r=new j,a=new $t,l=new Hd,o=new Gd,c={},h=t.maxTextureSize,u={[Bi]:Mn,[Mn]:Bi,[Jt]:Jt},f=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new j},radius:{value:4}},vertexShader:P_,fragmentShader:D_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new nn;g.setAttribute("position",new Bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Te(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vr;let d=this.type;this.render=function(E,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Ju&&(it("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=vr);const T=i.getRenderTarget(),D=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Mi),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const Q=d!==this.type;Q&&C.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(B=>B.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,B=E.length;ee<B;ee++){const q=E[ee],W=q.shadow;if(W===void 0){it("WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const ie=W.getFrameExtents();s.multiply(ie),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,W.mapSize.y=r.y));const ae=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=ae,W.map===null||Q===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===pr){if(q.isPointLight){it("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new ci(s.x,s.y,{format:is,type:Ei,minFilter:_n,magFilter:_n,generateMipmaps:!1}),W.map.texture.name=q.name+".shadowMap",W.map.depthTexture=new Hs(s.x,s.y,qn),W.map.depthTexture.name=q.name+".shadowMapDepth",W.map.depthTexture.format=wi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=un,W.map.depthTexture.magFilter=un}else q.isPointLight?(W.map=new wu(s.x),W.map.depthTexture=new sd(s.x,hi)):(W.map=new ci(s.x,s.y),W.map.depthTexture=new Hs(s.x,s.y,hi)),W.map.depthTexture.name=q.name+".shadowMap",W.map.depthTexture.format=wi,this.type===vr?(W.map.depthTexture.compareFunction=ae?Xl:Wl,W.map.depthTexture.minFilter=_n,W.map.depthTexture.magFilter=_n):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=un,W.map.depthTexture.magFilter=un);W.camera.updateProjectionMatrix()}const X=W.map.isWebGLCubeRenderTarget?6:1;for(let Y=0;Y<X;Y++){if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,Y),i.clear();else{Y===0&&(i.setRenderTarget(W.map),i.clear());const he=W.getViewport(Y);a.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),V.viewport(a)}if(q.isPointLight){const he=W.camera,Ie=W.matrix,ft=q.distance||he.far;ft!==he.far&&(he.far=ft,he.updateProjectionMatrix()),ur.setFromMatrixPosition(q.matrixWorld),he.position.copy(ur),Do.copy(he.position),Do.add(L_[Y]),he.up.copy(I_[Y]),he.lookAt(Do),he.updateMatrixWorld(),Ie.makeTranslation(-ur.x,-ur.y,-ur.z),Ah.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Ah,he.coordinateSystem,he.reversedDepth)}else W.updateMatrices(q);n=W.getFrustum(),y(C,v,W.camera,q,this.type)}W.isPointLightShadow!==!0&&this.type===pr&&S(W,v),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(T,D,U)};function S(E,C){const v=e.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ci(s.x,s.y,{format:is,type:Ei})),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,v,f,_,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,v,p,_,null)}function M(E,C,v,T){let D=null;const U=v.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)D=U;else if(D=v.isPointLight===!0?o:l,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const V=D.uuid,Q=C.uuid;let ee=c[V];ee===void 0&&(ee={},c[V]=ee);let B=ee[Q];B===void 0&&(B=D.clone(),ee[Q]=B,C.addEventListener("dispose",w)),D=B}if(D.visible=C.visible,D.wireframe=C.wireframe,T===pr?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:u[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,v.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const V=i.properties.get(D);V.light=v}return D}function y(E,C,v,T,D){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===pr)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,E.matrixWorld);const Q=e.update(E),ee=E.material;if(Array.isArray(ee)){const B=Q.groups;for(let q=0,W=B.length;q<W;q++){const ie=B[q],ae=ee[ie.materialIndex];if(ae&&ae.visible){const X=M(E,ae,T,D);E.onBeforeShadow(i,E,C,v,Q,X,ie),i.renderBufferDirect(v,null,Q,X,E,ie),E.onAfterShadow(i,E,C,v,Q,X,ie)}}}else if(ee.visible){const B=M(E,ee,T,D);E.onBeforeShadow(i,E,C,v,Q,B,null),i.renderBufferDirect(v,null,Q,B,E,null),E.onAfterShadow(i,E,C,v,Q,B,null)}}const V=E.children;for(let Q=0,ee=V.length;Q<ee;Q++)y(V[Q],C,v,T,D)}function w(E){E.target.removeEventListener("dispose",w);for(const v in c){const T=c[v],D=E.target.uuid;D in T&&(T[D].dispose(),delete T[D])}}}function U_(i,e){function t(){let k=!1;const Se=new $t;let le=null;const Ee=new $t(0,0,0,0);return{setMask:function(De){le!==De&&!k&&(i.colorMask(De,De,De,De),le=De)},setLocked:function(De){k=De},setClear:function(De,pe,Ge,ze,Ft){Ft===!0&&(De*=ze,pe*=ze,Ge*=ze),Se.set(De,pe,Ge,ze),Ee.equals(Se)===!1&&(i.clearColor(De,pe,Ge,ze),Ee.copy(Se))},reset:function(){k=!1,le=null,Ee.set(-1,0,0,0)}}}function n(){let k=!1,Se=!1,le=null,Ee=null,De=null;return{setReversed:function(pe){if(Se!==pe){const Ge=e.get("EXT_clip_control");pe?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),Se=pe;const ze=De;De=null,this.setClear(ze)}},getReversed:function(){return Se},setTest:function(pe){pe?me(i.DEPTH_TEST):Ne(i.DEPTH_TEST)},setMask:function(pe){le!==pe&&!k&&(i.depthMask(pe),le=pe)},setFunc:function(pe){if(Se&&(pe=Df[pe]),Ee!==pe){switch(pe){case Vo:i.depthFunc(i.NEVER);break;case Ho:i.depthFunc(i.ALWAYS);break;case Go:i.depthFunc(i.LESS);break;case ks:i.depthFunc(i.LEQUAL);break;case Wo:i.depthFunc(i.EQUAL);break;case Xo:i.depthFunc(i.GEQUAL);break;case qo:i.depthFunc(i.GREATER);break;case Yo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=pe}},setLocked:function(pe){k=pe},setClear:function(pe){De!==pe&&(De=pe,Se&&(pe=1-pe),i.clearDepth(pe))},reset:function(){k=!1,le=null,Ee=null,De=null,Se=!1}}}function s(){let k=!1,Se=null,le=null,Ee=null,De=null,pe=null,Ge=null,ze=null,Ft=null;return{setTest:function(Pt){k||(Pt?me(i.STENCIL_TEST):Ne(i.STENCIL_TEST))},setMask:function(Pt){Se!==Pt&&!k&&(i.stencilMask(Pt),Se=Pt)},setFunc:function(Pt,Ln,fn){(le!==Pt||Ee!==Ln||De!==fn)&&(i.stencilFunc(Pt,Ln,fn),le=Pt,Ee=Ln,De=fn)},setOp:function(Pt,Ln,fn){(pe!==Pt||Ge!==Ln||ze!==fn)&&(i.stencilOp(Pt,Ln,fn),pe=Pt,Ge=Ln,ze=fn)},setLocked:function(Pt){k=Pt},setClear:function(Pt){Ft!==Pt&&(i.clearStencil(Pt),Ft=Pt)},reset:function(){k=!1,Se=null,le=null,Ee=null,De=null,pe=null,Ge=null,ze=null,Ft=null}}}const r=new t,a=new n,l=new s,o=new WeakMap,c=new WeakMap;let h={},u={},f={},p=new WeakMap,g=[],_=null,m=!1,d=null,S=null,M=null,y=null,w=null,E=null,C=null,v=new ut(0,0,0),T=0,D=!1,U=null,V=null,Q=null,ee=null,B=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ie=0;const ae=i.getParameter(i.VERSION);ae.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(ae)[1]),W=ie>=1):ae.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),W=ie>=2);let X=null,Y={};const he=i.getParameter(i.SCISSOR_BOX),Ie=i.getParameter(i.VIEWPORT),ft=new $t().fromArray(he),Qe=new $t().fromArray(Ie);function re(k,Se,le,Ee){const De=new Uint8Array(4),pe=i.createTexture();i.bindTexture(k,pe),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ge=0;Ge<le;Ge++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,De):i.texImage2D(Se+Ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,De);return pe}const ve={};ve[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),ve[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ve[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),me(i.DEPTH_TEST),a.setFunc(ks),Ae(!1),Me(mc),me(i.CULL_FACE),ge(Mi);function me(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Ne(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function Xe(k,Se){return f[k]!==Se?(i.bindFramebuffer(k,Se),f[k]=Se,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Se),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function Oe(k,Se){let le=g,Ee=!1;if(k){le=p.get(Se),le===void 0&&(le=[],p.set(Se,le));const De=k.textures;if(le.length!==De.length||le[0]!==i.COLOR_ATTACHMENT0){for(let pe=0,Ge=De.length;pe<Ge;pe++)le[pe]=i.COLOR_ATTACHMENT0+pe;le.length=De.length,Ee=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(le)}function ct(k){return _!==k?(i.useProgram(k),_=k,!0):!1}const je={[$i]:i.FUNC_ADD,[Qu]:i.FUNC_SUBTRACT,[ef]:i.FUNC_REVERSE_SUBTRACT};je[tf]=i.MIN,je[nf]=i.MAX;const fe={[sf]:i.ZERO,[rf]:i.ONE,[af]:i.SRC_COLOR,[zo]:i.SRC_ALPHA,[ff]:i.SRC_ALPHA_SATURATE,[hf]:i.DST_COLOR,[lf]:i.DST_ALPHA,[of]:i.ONE_MINUS_SRC_COLOR,[ko]:i.ONE_MINUS_SRC_ALPHA,[uf]:i.ONE_MINUS_DST_COLOR,[cf]:i.ONE_MINUS_DST_ALPHA,[df]:i.CONSTANT_COLOR,[pf]:i.ONE_MINUS_CONSTANT_COLOR,[mf]:i.CONSTANT_ALPHA,[gf]:i.ONE_MINUS_CONSTANT_ALPHA};function ge(k,Se,le,Ee,De,pe,Ge,ze,Ft,Pt){if(k===Mi){m===!0&&(Ne(i.BLEND),m=!1);return}if(m===!1&&(me(i.BLEND),m=!0),k!==ju){if(k!==d||Pt!==D){if((S!==$i||w!==$i)&&(i.blendEquation(i.FUNC_ADD),S=$i,w=$i),Pt)switch(k){case Fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFunc(i.ONE,i.ONE);break;case _c:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case vc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Mt("WebGLState: Invalid blending: ",k);break}else switch(k){case Fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case _c:Mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vc:Mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Mt("WebGLState: Invalid blending: ",k);break}M=null,y=null,E=null,C=null,v.set(0,0,0),T=0,d=k,D=Pt}return}De=De||Se,pe=pe||le,Ge=Ge||Ee,(Se!==S||De!==w)&&(i.blendEquationSeparate(je[Se],je[De]),S=Se,w=De),(le!==M||Ee!==y||pe!==E||Ge!==C)&&(i.blendFuncSeparate(fe[le],fe[Ee],fe[pe],fe[Ge]),M=le,y=Ee,E=pe,C=Ge),(ze.equals(v)===!1||Ft!==T)&&(i.blendColor(ze.r,ze.g,ze.b,Ft),v.copy(ze),T=Ft),d=k,D=!1}function _e(k,Se){k.side===Jt?Ne(i.CULL_FACE):me(i.CULL_FACE);let le=k.side===Mn;Se&&(le=!le),Ae(le),k.blending===Fs&&k.transparent===!1?ge(Mi):ge(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);const Ee=k.stencilWrite;l.setTest(Ee),Ee&&(l.setMask(k.stencilWriteMask),l.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),l.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ve(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?me(i.SAMPLE_ALPHA_TO_COVERAGE):Ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ae(k){U!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),U=k)}function Me(k){k!==$u?(me(i.CULL_FACE),k!==V&&(k===mc?i.cullFace(i.BACK):k===Ku?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ne(i.CULL_FACE),V=k}function Je(k){k!==Q&&(W&&i.lineWidth(k),Q=k)}function Ve(k,Se,le){k?(me(i.POLYGON_OFFSET_FILL),(ee!==Se||B!==le)&&(ee=Se,B=le,a.getReversed()&&(Se=-Se),i.polygonOffset(Se,le))):Ne(i.POLYGON_OFFSET_FILL)}function tt(k){k?me(i.SCISSOR_TEST):Ne(i.SCISSOR_TEST)}function rt(k){k===void 0&&(k=i.TEXTURE0+q-1),X!==k&&(i.activeTexture(k),X=k)}function O(k,Se,le){le===void 0&&(X===null?le=i.TEXTURE0+q-1:le=X);let Ee=Y[le];Ee===void 0&&(Ee={type:void 0,texture:void 0},Y[le]=Ee),(Ee.type!==k||Ee.texture!==Se)&&(X!==le&&(i.activeTexture(le),X=le),i.bindTexture(k,Se||ve[k]),Ee.type=k,Ee.texture=Se)}function Tt(){const k=Y[X];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function vt(){try{i.compressedTexImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function x(){try{i.texSubImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function G(){try{i.texSubImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function se(){try{i.compressedTexSubImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ue(){try{i.texStorage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ye(){try{i.texStorage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ne(){try{i.texImage2D(...arguments)}catch(k){Mt("WebGLState:",k)}}function ce(){try{i.texImage3D(...arguments)}catch(k){Mt("WebGLState:",k)}}function we(k){return u[k]!==void 0?u[k]:i.getParameter(k)}function qe(k,Se){u[k]!==Se&&(i.pixelStorei(k,Se),u[k]=Se)}function Re(k){ft.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),ft.copy(k))}function be(k){Qe.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Qe.copy(k))}function He(k,Se){let le=c.get(Se);le===void 0&&(le=new WeakMap,c.set(Se,le));let Ee=le.get(k);Ee===void 0&&(Ee=i.getUniformBlockIndex(Se,k.name),le.set(k,Ee))}function et(k,Se){const Ee=c.get(Se).get(k);o.get(Se)!==Ee&&(i.uniformBlockBinding(Se,Ee,k.__bindingPointIndex),o.set(Se,Ee))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},X=null,Y={},f={},p=new WeakMap,g=[],_=null,m=!1,d=null,S=null,M=null,y=null,w=null,E=null,C=null,v=new ut(0,0,0),T=0,D=!1,U=null,V=null,Q=null,ee=null,B=null,ft.set(0,0,i.canvas.width,i.canvas.height),Qe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:me,disable:Ne,bindFramebuffer:Xe,drawBuffers:Oe,useProgram:ct,setBlending:ge,setMaterial:_e,setFlipSided:Ae,setCullFace:Me,setLineWidth:Je,setPolygonOffset:Ve,setScissorTest:tt,activeTexture:rt,bindTexture:O,unbindTexture:Tt,compressedTexImage2D:vt,compressedTexImage3D:R,texImage2D:ne,texImage3D:ce,pixelStorei:qe,getParameter:we,updateUBOMapping:He,uniformBlockBinding:et,texStorage2D:ue,texStorage3D:ye,texSubImage2D:x,texSubImage3D:G,compressedTexSubImage2D:$,compressedTexSubImage3D:se,scissor:Re,viewport:be,reset:at}}function F_(i,e,t,n,s,r,a){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new j,h=new WeakMap,u=new Set;let f;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,x){return g?new OffscreenCanvas(R,x):Pa("canvas")}function m(R,x,G){let $=1;const se=vt(R);if((se.width>G||se.height>G)&&($=G/Math.max(se.width,se.height)),$<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ue=Math.floor($*se.width),ye=Math.floor($*se.height);f===void 0&&(f=_(ue,ye));const ne=x?_(ue,ye):f;return ne.width=ue,ne.height=ye,ne.getContext("2d").drawImage(R,0,0,ue,ye),it("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ue+"x"+ye+")."),ne}else return"data"in R&&it("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),R;return R}function d(R){return R.generateMipmaps}function S(R){i.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(R,x,G,$,se,ue=!1){if(R!==null){if(i[R]!==void 0)return i[R];it("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ye;$&&(ye=e.get("EXT_texture_norm16"),ye||it("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ne=x;if(x===i.RED&&(G===i.FLOAT&&(ne=i.R32F),G===i.HALF_FLOAT&&(ne=i.R16F),G===i.UNSIGNED_BYTE&&(ne=i.R8),G===i.UNSIGNED_SHORT&&ye&&(ne=ye.R16_EXT),G===i.SHORT&&ye&&(ne=ye.R16_SNORM_EXT)),x===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(ne=i.R8UI),G===i.UNSIGNED_SHORT&&(ne=i.R16UI),G===i.UNSIGNED_INT&&(ne=i.R32UI),G===i.BYTE&&(ne=i.R8I),G===i.SHORT&&(ne=i.R16I),G===i.INT&&(ne=i.R32I)),x===i.RG&&(G===i.FLOAT&&(ne=i.RG32F),G===i.HALF_FLOAT&&(ne=i.RG16F),G===i.UNSIGNED_BYTE&&(ne=i.RG8),G===i.UNSIGNED_SHORT&&ye&&(ne=ye.RG16_EXT),G===i.SHORT&&ye&&(ne=ye.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(ne=i.RG8UI),G===i.UNSIGNED_SHORT&&(ne=i.RG16UI),G===i.UNSIGNED_INT&&(ne=i.RG32UI),G===i.BYTE&&(ne=i.RG8I),G===i.SHORT&&(ne=i.RG16I),G===i.INT&&(ne=i.RG32I)),x===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(ne=i.RGB8UI),G===i.UNSIGNED_SHORT&&(ne=i.RGB16UI),G===i.UNSIGNED_INT&&(ne=i.RGB32UI),G===i.BYTE&&(ne=i.RGB8I),G===i.SHORT&&(ne=i.RGB16I),G===i.INT&&(ne=i.RGB32I)),x===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(ne=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(ne=i.RGBA16UI),G===i.UNSIGNED_INT&&(ne=i.RGBA32UI),G===i.BYTE&&(ne=i.RGBA8I),G===i.SHORT&&(ne=i.RGBA16I),G===i.INT&&(ne=i.RGBA32I)),x===i.RGB&&(G===i.UNSIGNED_SHORT&&ye&&(ne=ye.RGB16_EXT),G===i.SHORT&&ye&&(ne=ye.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(ne=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(ne=i.R11F_G11F_B10F)),x===i.RGBA){const ce=ue?Ca:wt.getTransfer(se);G===i.FLOAT&&(ne=i.RGBA32F),G===i.HALF_FLOAT&&(ne=i.RGBA16F),G===i.UNSIGNED_BYTE&&(ne=ce===Ut?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&ye&&(ne=ye.RGBA16_EXT),G===i.SHORT&&ye&&(ne=ye.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(ne=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(ne=i.RGB5_A1)}return(ne===i.R16F||ne===i.R32F||ne===i.RG16F||ne===i.RG32F||ne===i.RGBA16F||ne===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function w(R,x){let G;return R?x===null||x===hi||x===br?G=i.DEPTH24_STENCIL8:x===qn?G=i.DEPTH32F_STENCIL8:x===Sr&&(G=i.DEPTH24_STENCIL8,it("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===hi||x===br?G=i.DEPTH_COMPONENT24:x===qn?G=i.DEPTH_COMPONENT32F:x===Sr&&(G=i.DEPTH_COMPONENT16),G}function E(R,x){return d(R)===!0||R.isFramebufferTexture&&R.minFilter!==un&&R.minFilter!==_n?Math.log2(Math.max(x.width,x.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?x.mipmaps.length:1}function C(R){const x=R.target;x.removeEventListener("dispose",C),T(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function v(R){const x=R.target;x.removeEventListener("dispose",v),U(x)}function T(R){const x=n.get(R);if(x.__webglInit===void 0)return;const G=R.source,$=p.get(G);if($){const se=$[x.__cacheKey];se.usedTimes--,se.usedTimes===0&&D(R),Object.keys($).length===0&&p.delete(G)}n.remove(R)}function D(R){const x=n.get(R);i.deleteTexture(x.__webglTexture);const G=R.source,$=p.get(G);delete $[x.__cacheKey],a.memory.textures--}function U(R){const x=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(x.__webglFramebuffer[$]))for(let se=0;se<x.__webglFramebuffer[$].length;se++)i.deleteFramebuffer(x.__webglFramebuffer[$][se]);else i.deleteFramebuffer(x.__webglFramebuffer[$]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[$])}else{if(Array.isArray(x.__webglFramebuffer))for(let $=0;$<x.__webglFramebuffer.length;$++)i.deleteFramebuffer(x.__webglFramebuffer[$]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let $=0;$<x.__webglColorRenderbuffer.length;$++)x.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const G=R.textures;for(let $=0,se=G.length;$<se;$++){const ue=n.get(G[$]);ue.__webglTexture&&(i.deleteTexture(ue.__webglTexture),a.memory.textures--),n.remove(G[$])}n.remove(R)}let V=0;function Q(){V=0}function ee(){return V}function B(R){V=R}function q(){const R=V;return R>=s.maxTextures&&it("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),V+=1,R}function W(R){const x=[];return x.push(R.wrapS),x.push(R.wrapT),x.push(R.wrapR||0),x.push(R.magFilter),x.push(R.minFilter),x.push(R.anisotropy),x.push(R.internalFormat),x.push(R.format),x.push(R.type),x.push(R.generateMipmaps),x.push(R.premultiplyAlpha),x.push(R.flipY),x.push(R.unpackAlignment),x.push(R.colorSpace),x.join()}function ie(R,x){const G=n.get(R);if(R.isVideoTexture&&O(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){const $=R.image;if($===null)it("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)it("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(G,R,x);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+x)}function ae(R,x){const G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){Ne(G,R,x);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+x)}function X(R,x){const G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){Ne(G,R,x);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+x)}function Y(R,x){const G=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&G.__version!==R.version){Xe(G,R,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+x)}const he={[li]:i.REPEAT,[yi]:i.CLAMP_TO_EDGE,[Zo]:i.MIRRORED_REPEAT},Ie={[un]:i.NEAREST,[xf]:i.NEAREST_MIPMAP_NEAREST,[zr]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[$a]:i.LINEAR_MIPMAP_NEAREST,[Qi]:i.LINEAR_MIPMAP_LINEAR},ft={[Sf]:i.NEVER,[Af]:i.ALWAYS,[bf]:i.LESS,[Wl]:i.LEQUAL,[Ef]:i.EQUAL,[Xl]:i.GEQUAL,[wf]:i.GREATER,[Tf]:i.NOTEQUAL};function Qe(R,x){if(x.type===qn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===_n||x.magFilter===$a||x.magFilter===zr||x.magFilter===Qi||x.minFilter===_n||x.minFilter===$a||x.minFilter===zr||x.minFilter===Qi)&&it("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,he[x.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,he[x.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,he[x.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ie[x.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ie[x.minFilter]),x.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ft[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===un||x.minFilter!==zr&&x.minFilter!==Qi||x.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function re(R,x){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,x.addEventListener("dispose",C));const $=x.source;let se=p.get($);se===void 0&&(se={},p.set($,se));const ue=W(x);if(ue!==R.__cacheKey){se[ue]===void 0&&(se[ue]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),se[ue].usedTimes++;const ye=se[R.__cacheKey];ye!==void 0&&(se[R.__cacheKey].usedTimes--,ye.usedTimes===0&&D(x)),R.__cacheKey=ue,R.__webglTexture=se[ue].texture}return G}function ve(R,x,G){return Math.floor(Math.floor(R/G)/x)}function me(R,x,G,$){const ue=R.updateRanges;if(ue.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,G,$,x.data);else{ue.sort((qe,Re)=>qe.start-Re.start);let ye=0;for(let qe=1;qe<ue.length;qe++){const Re=ue[ye],be=ue[qe],He=Re.start+Re.count,et=ve(be.start,x.width,4),at=ve(Re.start,x.width,4);be.start<=He+1&&et===at&&ve(be.start+be.count-1,x.width,4)===et?Re.count=Math.max(Re.count,be.start+be.count-Re.start):(++ye,ue[ye]=be)}ue.length=ye+1;const ne=t.getParameter(i.UNPACK_ROW_LENGTH),ce=t.getParameter(i.UNPACK_SKIP_PIXELS),we=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let qe=0,Re=ue.length;qe<Re;qe++){const be=ue[qe],He=Math.floor(be.start/4),et=Math.ceil(be.count/4),at=He%x.width,k=Math.floor(He/x.width),Se=et,le=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,at),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,at,k,Se,le,G,$,x.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ne),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(i.UNPACK_SKIP_ROWS,we)}}function Ne(R,x,G){let $=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&($=i.TEXTURE_3D);const se=re(R,x),ue=x.source;t.bindTexture($,R.__webglTexture,i.TEXTURE0+G);const ye=n.get(ue);if(ue.version!==ye.__version||se===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const le=wt.getPrimaries(wt.workingColorSpace),Ee=x.colorSpace===Fi?null:wt.getPrimaries(x.colorSpace),De=x.colorSpace===Fi||le===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let ce=m(x.image,!1,s.maxTextureSize);ce=Tt(x,ce);const we=r.convert(x.format,x.colorSpace),qe=r.convert(x.type);let Re=y(x.internalFormat,we,qe,x.normalized,x.colorSpace,x.isVideoTexture);Qe($,x);let be;const He=x.mipmaps,et=x.isVideoTexture!==!0,at=ye.__version===void 0||se===!0,k=ue.dataReady,Se=E(x,ce);if(x.isDepthTexture)Re=w(x.format===es,x.type),at&&(et?t.texStorage2D(i.TEXTURE_2D,1,Re,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,Re,ce.width,ce.height,0,we,qe,null));else if(x.isDataTexture)if(He.length>0){et&&at&&t.texStorage2D(i.TEXTURE_2D,Se,Re,He[0].width,He[0].height);for(let le=0,Ee=He.length;le<Ee;le++)be=He[le],et?k&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,be.width,be.height,we,qe,be.data):t.texImage2D(i.TEXTURE_2D,le,Re,be.width,be.height,0,we,qe,be.data);x.generateMipmaps=!1}else et?(at&&t.texStorage2D(i.TEXTURE_2D,Se,Re,ce.width,ce.height),k&&me(x,ce,we,qe)):t.texImage2D(i.TEXTURE_2D,0,Re,ce.width,ce.height,0,we,qe,ce.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){et&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Re,He[0].width,He[0].height,ce.depth);for(let le=0,Ee=He.length;le<Ee;le++)if(be=He[le],x.format!==Yn)if(we!==null)if(et){if(k)if(x.layerUpdates.size>0){const De=rh(be.width,be.height,x.format,x.type);for(const pe of x.layerUpdates){const Ge=be.data.subarray(pe*De/be.data.BYTES_PER_ELEMENT,(pe+1)*De/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,pe,be.width,be.height,1,we,Ge)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,be.width,be.height,ce.depth,we,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,le,Re,be.width,be.height,ce.depth,0,be.data,0,0);else it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,be.width,be.height,ce.depth,we,qe,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,le,Re,be.width,be.height,ce.depth,0,we,qe,be.data)}else{et&&at&&t.texStorage2D(i.TEXTURE_2D,Se,Re,He[0].width,He[0].height);for(let le=0,Ee=He.length;le<Ee;le++)be=He[le],x.format!==Yn?we!==null?et?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,le,0,0,be.width,be.height,we,be.data):t.compressedTexImage2D(i.TEXTURE_2D,le,Re,be.width,be.height,0,be.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?k&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,be.width,be.height,we,qe,be.data):t.texImage2D(i.TEXTURE_2D,le,Re,be.width,be.height,0,we,qe,be.data)}else if(x.isDataArrayTexture)if(et){if(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Re,ce.width,ce.height,ce.depth),k)if(x.layerUpdates.size>0){const le=rh(ce.width,ce.height,x.format,x.type);for(const Ee of x.layerUpdates){const De=ce.data.subarray(Ee*le/ce.data.BYTES_PER_ELEMENT,(Ee+1)*le/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ee,ce.width,ce.height,1,we,qe,De)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,we,qe,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ce.width,ce.height,ce.depth,0,we,qe,ce.data);else if(x.isData3DTexture)et?(at&&t.texStorage3D(i.TEXTURE_3D,Se,Re,ce.width,ce.height,ce.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,we,qe,ce.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ce.width,ce.height,ce.depth,0,we,qe,ce.data);else if(x.isFramebufferTexture){if(at)if(et)t.texStorage2D(i.TEXTURE_2D,Se,Re,ce.width,ce.height);else{let le=ce.width,Ee=ce.height;for(let De=0;De<Se;De++)t.texImage2D(i.TEXTURE_2D,De,Re,le,Ee,0,we,qe,null),le>>=1,Ee>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const le=i.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),ce.parentNode!==le){le.appendChild(ce),u.add(x),le.onpaint=Ee=>{const De=Ee.changedElements;for(const pe of u)De.includes(pe.image)&&(pe.needsUpdate=!0)},le.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ce);else{const De=i.RGBA,pe=i.RGBA,Ge=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,De,pe,Ge,ce)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(He.length>0){if(et&&at){const le=vt(He[0]);t.texStorage2D(i.TEXTURE_2D,Se,Re,le.width,le.height)}for(let le=0,Ee=He.length;le<Ee;le++)be=He[le],et?k&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,we,qe,be):t.texImage2D(i.TEXTURE_2D,le,Re,we,qe,be);x.generateMipmaps=!1}else if(et){if(at){const le=vt(ce);t.texStorage2D(i.TEXTURE_2D,Se,Re,le.width,le.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,qe,ce)}else t.texImage2D(i.TEXTURE_2D,0,Re,we,qe,ce);d(x)&&S($),ye.__version=ue.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Xe(R,x,G){if(x.image.length!==6)return;const $=re(R,x),se=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+G);const ue=n.get(se);if(se.version!==ue.__version||$===!0){t.activeTexture(i.TEXTURE0+G);const ye=wt.getPrimaries(wt.workingColorSpace),ne=x.colorSpace===Fi?null:wt.getPrimaries(x.colorSpace),ce=x.colorSpace===Fi||ye===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const we=x.isCompressedTexture||x.image[0].isCompressedTexture,qe=x.image[0]&&x.image[0].isDataTexture,Re=[];for(let pe=0;pe<6;pe++)!we&&!qe?Re[pe]=m(x.image[pe],!0,s.maxCubemapSize):Re[pe]=qe?x.image[pe].image:x.image[pe],Re[pe]=Tt(x,Re[pe]);const be=Re[0],He=r.convert(x.format,x.colorSpace),et=r.convert(x.type),at=y(x.internalFormat,He,et,x.normalized,x.colorSpace),k=x.isVideoTexture!==!0,Se=ue.__version===void 0||$===!0,le=se.dataReady;let Ee=E(x,be);Qe(i.TEXTURE_CUBE_MAP,x);let De;if(we){k&&Se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,at,be.width,be.height);for(let pe=0;pe<6;pe++){De=Re[pe].mipmaps;for(let Ge=0;Ge<De.length;Ge++){const ze=De[Ge];x.format!==Yn?He!==null?k?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge,0,0,ze.width,ze.height,He,ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge,at,ze.width,ze.height,0,ze.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge,0,0,ze.width,ze.height,He,et,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge,at,ze.width,ze.height,0,He,et,ze.data)}}}else{if(De=x.mipmaps,k&&Se){De.length>0&&Ee++;const pe=vt(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,at,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(qe){k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Re[pe].width,Re[pe].height,He,et,Re[pe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,at,Re[pe].width,Re[pe].height,0,He,et,Re[pe].data);for(let Ge=0;Ge<De.length;Ge++){const Ft=De[Ge].image[pe].image;k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge+1,0,0,Ft.width,Ft.height,He,et,Ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge+1,at,Ft.width,Ft.height,0,He,et,Ft.data)}}else{k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,He,et,Re[pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,at,He,et,Re[pe]);for(let Ge=0;Ge<De.length;Ge++){const ze=De[Ge];k?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge+1,0,0,He,et,ze.image[pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ge+1,at,He,et,ze.image[pe])}}}d(x)&&S(i.TEXTURE_CUBE_MAP),ue.__version=se.version,x.onUpdate&&x.onUpdate(x)}R.__version=x.version}function Oe(R,x,G,$,se,ue){const ye=r.convert(G.format,G.colorSpace),ne=r.convert(G.type),ce=y(G.internalFormat,ye,ne,G.normalized,G.colorSpace),we=n.get(x),qe=n.get(G);if(qe.__renderTarget=x,!we.__hasExternalTextures){const Re=Math.max(1,x.width>>ue),be=Math.max(1,x.height>>ue);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,ue,ce,Re,be,x.depth,0,ye,ne,null):t.texImage2D(se,ue,ce,Re,be,0,ye,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),rt(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,se,qe.__webglTexture,0,tt(x)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,se,qe.__webglTexture,ue),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ct(R,x,G){if(i.bindRenderbuffer(i.RENDERBUFFER,R),x.depthBuffer){const $=x.depthTexture,se=$&&$.isDepthTexture?$.type:null,ue=w(x.stencilBuffer,se),ye=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;rt(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt(x),ue,x.width,x.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt(x),ue,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ue,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,R)}else{const $=x.textures;for(let se=0;se<$.length;se++){const ue=$[se],ye=r.convert(ue.format,ue.colorSpace),ne=r.convert(ue.type),ce=y(ue.internalFormat,ye,ne,ue.normalized,ue.colorSpace);rt(x)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt(x),ce,x.width,x.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,tt(x),ce,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ce,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function je(R,x,G){const $=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const se=n.get(x.depthTexture);if(se.__renderTarget=x,(!se.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),$){if(se.__webglInit===void 0&&(se.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),se.__webglTexture===void 0){se.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),Qe(i.TEXTURE_CUBE_MAP,x.depthTexture);const we=r.convert(x.depthTexture.format),qe=r.convert(x.depthTexture.type);let Re;x.depthTexture.format===wi?Re=i.DEPTH_COMPONENT24:x.depthTexture.format===es&&(Re=i.DEPTH24_STENCIL8);for(let be=0;be<6;be++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Re,x.width,x.height,0,we,qe,null)}}else ie(x.depthTexture,0);const ue=se.__webglTexture,ye=tt(x),ne=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,ce=x.depthTexture.format===es?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===wi)rt(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,ne,ue,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,ce,ne,ue,0);else if(x.depthTexture.format===es)rt(x)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,ne,ue,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,ce,ne,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function fe(R){const x=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==R.depthTexture){const $=R.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),$){const se=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,$.removeEventListener("dispose",se)};$.addEventListener("dispose",se),x.__depthDisposeCallback=se}x.__boundDepthTexture=$}if(R.depthTexture&&!x.__autoAllocateDepthBuffer)if(G)for(let $=0;$<6;$++)je(x.__webglFramebuffer[$],R,$);else{const $=R.texture.mipmaps;$&&$.length>0?je(x.__webglFramebuffer[0],R,0):je(x.__webglFramebuffer,R,0)}else if(G){x.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[$]),x.__webglDepthbuffer[$]===void 0)x.__webglDepthbuffer[$]=i.createRenderbuffer(),ct(x.__webglDepthbuffer[$],R,!1);else{const se=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=x.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,ue)}}else{const $=R.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ct(x.__webglDepthbuffer,R,!1);else{const se=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,ue)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ge(R,x,G){const $=n.get(R);x!==void 0&&Oe($.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&fe(R)}function _e(R){const x=R.texture,G=n.get(R),$=n.get(x);R.addEventListener("dispose",v);const se=R.textures,ue=R.isWebGLCubeRenderTarget===!0,ye=se.length>1;if(ye||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=x.version,a.memory.textures++),ue){G.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer[ne]=[];for(let ce=0;ce<x.mipmaps.length;ce++)G.__webglFramebuffer[ne][ce]=i.createFramebuffer()}else G.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer=[];for(let ne=0;ne<x.mipmaps.length;ne++)G.__webglFramebuffer[ne]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(ye)for(let ne=0,ce=se.length;ne<ce;ne++){const we=n.get(se[ne]);we.__webglTexture===void 0&&(we.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&rt(R)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ne=0;ne<se.length;ne++){const ce=se[ne];G.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[ne]);const we=r.convert(ce.format,ce.colorSpace),qe=r.convert(ce.type),Re=y(ce.internalFormat,we,qe,ce.normalized,ce.colorSpace,R.isXRRenderTarget===!0),be=tt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,be,Re,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,G.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),ct(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Qe(i.TEXTURE_CUBE_MAP,x);for(let ne=0;ne<6;ne++)if(x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)Oe(G.__webglFramebuffer[ne][ce],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ce);else Oe(G.__webglFramebuffer[ne],R,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);d(x)&&S(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ne=0,ce=se.length;ne<ce;ne++){const we=se[ne],qe=n.get(we);let Re=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Re=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Re,qe.__webglTexture),Qe(Re,we),Oe(G.__webglFramebuffer,R,we,i.COLOR_ATTACHMENT0+ne,Re,0),d(we)&&S(Re)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ne=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,$.__webglTexture),Qe(ne,x),x.mipmaps&&x.mipmaps.length>0)for(let ce=0;ce<x.mipmaps.length;ce++)Oe(G.__webglFramebuffer[ce],R,x,i.COLOR_ATTACHMENT0,ne,ce);else Oe(G.__webglFramebuffer,R,x,i.COLOR_ATTACHMENT0,ne,0);d(x)&&S(ne),t.unbindTexture()}R.depthBuffer&&fe(R)}function Ae(R){const x=R.textures;for(let G=0,$=x.length;G<$;G++){const se=x[G];if(d(se)){const ue=M(R),ye=n.get(se).__webglTexture;t.bindTexture(ue,ye),S(ue),t.unbindTexture()}}}const Me=[],Je=[];function Ve(R){if(R.samples>0){if(rt(R)===!1){const x=R.textures,G=R.width,$=R.height;let se=i.COLOR_BUFFER_BIT;const ue=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(R),ne=x.length>1;if(ne)for(let we=0;we<x.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const ce=R.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let we=0;we<x.length;we++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[we]);const qe=n.get(x[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qe,0)}i.blitFramebuffer(0,0,G,$,0,0,G,$,se,i.NEAREST),o===!0&&(Me.length=0,Je.length=0,Me.push(i.COLOR_ATTACHMENT0+we),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Me.push(ue),Je.push(ue),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let we=0;we<x.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,ye.__webglColorRenderbuffer[we]);const qe=n.get(x[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&o){const x=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function tt(R){return Math.min(s.maxSamples,R.samples)}function rt(R){const x=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function O(R){const x=a.render.frame;h.get(R)!==x&&(h.set(R,x),R.update())}function Tt(R,x){const G=R.colorSpace,$=R.format,se=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==Ra&&G!==Fi&&(wt.getTransfer(G)===Ut?($!==Yn||se!==Pn)&&it("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Mt("WebGLTextures: Unsupported texture color space:",G)),x}function vt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=Q,this.getTextureUnits=ee,this.setTextureUnits=B,this.setTexture2D=ie,this.setTexture2DArray=ae,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=ge,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=Ae,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=rt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function O_(i,e){function t(n,s=Fi){let r;const a=wt.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===Bl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wh)return i.BYTE;if(n===Xh)return i.SHORT;if(n===Sr)return i.UNSIGNED_SHORT;if(n===Ol)return i.INT;if(n===hi)return i.UNSIGNED_INT;if(n===qn)return i.FLOAT;if(n===Ei)return i.HALF_FLOAT;if(n===Zh)return i.ALPHA;if(n===$h)return i.RGB;if(n===Yn)return i.RGBA;if(n===wi)return i.DEPTH_COMPONENT;if(n===es)return i.DEPTH_STENCIL;if(n===kl)return i.RED;if(n===Vl)return i.RED_INTEGER;if(n===is)return i.RG;if(n===Hl)return i.RG_INTEGER;if(n===Gl)return i.RGBA_INTEGER;if(n===va||n===xa||n===ya||n===Ma)if(a===Ut)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===va)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===va)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$o||n===Ko||n===Jo||n===jo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===$o)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qo||n===el||n===tl||n===nl||n===il||n===wa||n===sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qo||n===el)return a===Ut?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===tl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===nl)return r.COMPRESSED_R11_EAC;if(n===il)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wa)return r.COMPRESSED_RG11_EAC;if(n===sl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===rl||n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===fl||n===dl||n===pl||n===ml||n===gl||n===_l||n===vl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===rl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===al)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ol)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ll)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ul)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ml)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_l)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vl)return a===Ut?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xl||n===yl||n===Ml)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===xl)return a===Ut?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sl||n===bl||n===Ta||n===El)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===El)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===br?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const B_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z_=`
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

}`;class k_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ou(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ui({vertexShader:B_,fragmentShader:z_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Te(new Dn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class V_ extends zi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,l="local-floor",o=1,c=null,h=null,u=null,f=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new k_,d={},S=t.getContextAttributes();let M=null,y=null;const w=[],E=[],C=new j;let v=null;const T=new Cn;T.viewport=new $t;const D=new Cn;D.viewport=new $t;const U=[T,D],V=new Yd;let Q=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let ve=w[re];return ve===void 0&&(ve=new no,w[re]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(re){let ve=w[re];return ve===void 0&&(ve=new no,w[re]=ve),ve.getGripSpace()},this.getHand=function(re){let ve=w[re];return ve===void 0&&(ve=new no,w[re]=ve),ve.getHandSpace()};function B(re){const ve=E.indexOf(re.inputSource);if(ve===-1)return;const me=w[ve];me!==void 0&&(me.update(re.inputSource,re.frame,c||a),me.dispatchEvent({type:re.type,data:re.inputSource}))}function q(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",W);for(let re=0;re<w.length;re++){const ve=E[re];ve!==null&&(E[re]=null,w[re].disconnect(ve))}Q=null,ee=null,m.reset();for(const re in d)delete d[re];e.setRenderTarget(M),p=null,f=null,u=null,s=null,y=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){r=re,n.isPresenting===!0&&it("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){l=re,n.isPresenting===!0&&it("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(re){if(s=re,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",q),s.addEventListener("inputsourceschange",W),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Ne=null,Xe=null;S.depth&&(Xe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=S.stencil?es:wi,Ne=S.stencil?br:hi);const Oe={colorFormat:t.RGBA8,depthFormat:Xe,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Oe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new ci(f.textureWidth,f.textureHeight,{format:Yn,type:Pn,depthTexture:new Hs(f.textureWidth,f.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const me={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new ci(p.framebufferWidth,p.framebufferHeight,{format:Yn,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(o),c=null,a=await s.requestReferenceSpace(l),Qe.setContext(s),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function W(re){for(let ve=0;ve<re.removed.length;ve++){const me=re.removed[ve],Ne=E.indexOf(me);Ne>=0&&(E[Ne]=null,w[Ne].disconnect(me))}for(let ve=0;ve<re.added.length;ve++){const me=re.added[ve];let Ne=E.indexOf(me);if(Ne===-1){for(let Oe=0;Oe<w.length;Oe++)if(Oe>=E.length){E.push(me),Ne=Oe;break}else if(E[Oe]===null){E[Oe]=me,Ne=Oe;break}if(Ne===-1)break}const Xe=w[Ne];Xe&&Xe.connect(me)}}const ie=new N,ae=new N;function X(re,ve,me){ie.setFromMatrixPosition(ve.matrixWorld),ae.setFromMatrixPosition(me.matrixWorld);const Ne=ie.distanceTo(ae),Xe=ve.projectionMatrix.elements,Oe=me.projectionMatrix.elements,ct=Xe[14]/(Xe[10]-1),je=Xe[14]/(Xe[10]+1),fe=(Xe[9]+1)/Xe[5],ge=(Xe[9]-1)/Xe[5],_e=(Xe[8]-1)/Xe[0],Ae=(Oe[8]+1)/Oe[0],Me=ct*_e,Je=ct*Ae,Ve=Ne/(-_e+Ae),tt=Ve*-_e;if(ve.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(tt),re.translateZ(Ve),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Xe[10]===-1)re.projectionMatrix.copy(ve.projectionMatrix),re.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const rt=ct+Ve,O=je+Ve,Tt=Me-tt,vt=Je+(Ne-tt),R=fe*je/O*rt,x=ge*je/O*rt;re.projectionMatrix.makePerspective(Tt,vt,R,x,rt,O),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function Y(re,ve){ve===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(ve.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(s===null)return;let ve=re.near,me=re.far;m.texture!==null&&(m.depthNear>0&&(ve=m.depthNear),m.depthFar>0&&(me=m.depthFar)),V.near=D.near=T.near=ve,V.far=D.far=T.far=me,(Q!==V.near||ee!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),Q=V.near,ee=V.far),V.layers.mask=re.layers.mask|6,T.layers.mask=V.layers.mask&-5,D.layers.mask=V.layers.mask&-3;const Ne=re.parent,Xe=V.cameras;Y(V,Ne);for(let Oe=0;Oe<Xe.length;Oe++)Y(Xe[Oe],Ne);Xe.length===2?X(V,T,D):V.projectionMatrix.copy(T.projectionMatrix),he(re,V,Ne)};function he(re,ve,me){me===null?re.matrix.copy(ve.matrixWorld):(re.matrix.copy(me.matrixWorld),re.matrix.invert(),re.matrix.multiply(ve.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(ve.projectionMatrix),re.projectionMatrixInverse.copy(ve.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Tl*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(f===null&&p===null))return o},this.setFoveation=function(re){o=re,f!==null&&(f.fixedFoveation=re),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=re)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(re){return d[re]};let Ie=null;function ft(re,ve){if(h=ve.getViewerPose(c||a),g=ve,h!==null){const me=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Ne=!1;me.length!==V.cameras.length&&(V.cameras.length=0,Ne=!0);for(let je=0;je<me.length;je++){const fe=me[je];let ge=null;if(p!==null)ge=p.getViewport(fe);else{const Ae=u.getViewSubImage(f,fe);ge=Ae.viewport,je===0&&(e.setRenderTargetTextures(y,Ae.colorTexture,Ae.depthStencilTexture),e.setRenderTarget(y))}let _e=U[je];_e===void 0&&(_e=new Cn,_e.layers.enable(je),_e.viewport=new $t,U[je]=_e),_e.matrix.fromArray(fe.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(fe.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(ge.x,ge.y,ge.width,ge.height),je===0&&(V.matrix.copy(_e.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Ne===!0&&V.cameras.push(_e)}const Xe=s.enabledFeatures;if(Xe&&Xe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const je=u.getDepthInformation(me[0]);je&&je.isValid&&je.texture&&m.init(je,s.renderState)}if(Xe&&Xe.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let je=0;je<me.length;je++){const fe=me[je].camera;if(fe){let ge=d[fe];ge||(ge=new ou,d[fe]=ge);const _e=u.getCameraImage(fe);ge.sourceTexture=_e}}}}for(let me=0;me<w.length;me++){const Ne=E[me],Xe=w[me];Ne!==null&&Xe!==void 0&&Xe.update(Ne,ve,c||a)}Ie&&Ie(re,ve),ve.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ve}),g=null}const Qe=new bu;Qe.setAnimationLoop(ft),this.setAnimationLoop=function(re){Ie=re},this.dispose=function(){}}}const H_=new Lt,Pu=new lt;Pu.set(-1,0,0,0,1,0,0,0,1);function G_(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,vu(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,S,M,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&l(m,d)):d.isPointsMaterial?o(m,d,S,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Mn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Mn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=e.get(d),M=S.envMap,y=S.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(H_.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Pu),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function l(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function o(m,d,S,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=M*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Mn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const S=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function W_(i,e,t,n){let s={},r={},a=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(y,w){const E=w.program;n.uniformBlockBinding(y,E)}function c(y,w){let E=s[y.id];E===void 0&&(m(y),E=h(y),s[y.id]=E,y.addEventListener("dispose",S));const C=w.program;n.updateUBOMapping(y,C);const v=e.render.frame;r[y.id]!==v&&(f(y),r[y.id]=v)}function h(y){const w=u();y.__bindingPointIndex=w;const E=i.createBuffer(),C=y.__size,v=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,E),E}function u(){for(let y=0;y<l;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const w=s[y.id],E=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let v=0,T=E.length;v<T;v++){const D=E[v];if(Array.isArray(D))for(let U=0,V=D.length;U<V;U++)p(D[U],v,U,C);else p(D,v,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,w,E,C){if(_(y,w,E,C)===!0){const v=y.__offset,T=y.value;if(Array.isArray(T)){let D=0;for(let U=0;U<T.length;U++){const V=T[U],Q=d(V);g(V,y.__data,D),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(D+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,y.__data)}}function g(y,w,E){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,E)}function _(y,w,E,C){const v=y.value,T=w+"_"+E;if(C[T]===void 0)return typeof v=="number"||typeof v=="boolean"?C[T]=v:ArrayBuffer.isView(v)?C[T]=v.slice():C[T]=v.clone(),!0;{const D=C[T];if(typeof v=="number"||typeof v=="boolean"){if(D!==v)return C[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(D.equals(v)===!1)return D.copy(v),!0}}return!1}function m(y){const w=y.uniforms;let E=0;const C=16;for(let T=0,D=w.length;T<D;T++){const U=Array.isArray(w[T])?w[T]:[w[T]];for(let V=0,Q=U.length;V<Q;V++){const ee=U[V],B=Array.isArray(ee.value)?ee.value:[ee.value];for(let q=0,W=B.length;q<W;q++){const ie=B[q],ae=d(ie),X=E%C,Y=X%ae.boundary,he=X+Y;E+=Y,he!==0&&C-he<ae.storage&&(E+=C-he),ee.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),ee.__offset=E,E+=ae.storage}}}const v=E%C;return v>0&&(E+=C-v),y.__size=E,y.__cache={},this}function d(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?it("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):it("WebGLRenderer: Unsupported uniform value type.",y),w}function S(y){const w=y.target;w.removeEventListener("dispose",S);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function M(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:o,update:c,dispose:M}}const X_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ei=null;function q_(){return ei===null&&(ei=new iu(X_,16,16,is,Ei),ei.name="DFG_LUT",ei.minFilter=_n,ei.magFilter=_n,ei.wrapS=yi,ei.wrapT=yi,ei.generateMipmaps=!1,ei.needsUpdate=!0),ei}class Y_{constructor(e={}){const{canvas:t=Cf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Pn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=p,m=new Set([Gl,Hl,Vl]),d=new Set([Pn,hi,Sr,br,Bl,zl]),S=new Uint32Array(4),M=new Int32Array(4),y=new N;let w=null,E=null;const C=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let U=!1,V=null,Q=null,ee=null,B=null;this._outputColorSpace=hn;let q=0,W=0,ie=null,ae=-1,X=null;const Y=new $t,he=new $t;let Ie=null;const ft=new ut(0);let Qe=0,re=t.width,ve=t.height,me=1,Ne=null,Xe=null;const Oe=new $t(0,0,re,ve),ct=new $t(0,0,re,ve);let je=!1;const fe=new Zl;let ge=!1,_e=!1;const Ae=new Lt,Me=new N,Je=new $t,Ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function rt(){return ie===null?me:1}let O=n;function Tt(b,H){return t.getContext(b,H)}try{const b={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Nl}`),t.addEventListener("webglcontextlost",Ft,!1),t.addEventListener("webglcontextrestored",Pt,!1),t.addEventListener("webglcontextcreationerror",Ln,!1),O===null){const H="webgl2";if(O=Tt(H,b),O===null)throw Tt(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw Mt("WebGLRenderer: "+b.message),b}let vt,R,x,G,$,se,ue,ye,ne,ce,we,qe,Re,be,He,et,at,k,Se,le,Ee,De,pe;function Ge(){vt=new qm(O),vt.init(),Ee=new O_(O,vt),R=new Bm(O,vt,e,Ee),x=new U_(O,vt),R.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),Q=O.createFramebuffer(),ee=O.createFramebuffer(),B=O.createFramebuffer(),G=new $m(O),$=new M_,se=new F_(O,vt,x,$,R,Ee,G),ue=new Xm(D),ye=new Qd(O),De=new Fm(O,ye),ne=new Ym(O,ye,G,De),ce=new Jm(O,ne,ye,De,G),k=new Km(O,R,se),He=new zm($),we=new y_(D,ue,vt,R,De,He),qe=new G_(D,$),Re=new b_,be=new C_(vt),at=new Um(D,ue,x,ce,g,o),et=new N_(D,ce,R),pe=new W_(O,G,R,x),Se=new Om(O,vt,G),le=new Zm(O,vt,G),G.programs=we.programs,D.capabilities=R,D.extensions=vt,D.properties=$,D.renderLists=Re,D.shadowMap=et,D.state=x,D.info=G}Ge(),_!==Pn&&(T=new Qm(_,t.width,t.height,l,s,r));const ze=new V_(D,O);this.xr=ze,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=vt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=vt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(b){b!==void 0&&(me=b,this.setSize(re,ve,!1))},this.getSize=function(b){return b.set(re,ve)},this.setSize=function(b,H,J=!0){if(ze.isPresenting){it("WebGLRenderer: Can't change size while VR device is presenting.");return}re=b,ve=H,t.width=Math.floor(b*me),t.height=Math.floor(H*me),J===!0&&(t.style.width=b+"px",t.style.height=H+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,H)},this.getDrawingBufferSize=function(b){return b.set(re*me,ve*me).floor()},this.setDrawingBufferSize=function(b,H,J){re=b,ve=H,me=J,t.width=Math.floor(b*J),t.height=Math.floor(H*J),this.setViewport(0,0,b,H)},this.setEffects=function(b){if(_===Pn){Mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let H=0;H<b.length;H++)if(b[H].isOutputPass===!0){it("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(Y)},this.getViewport=function(b){return b.copy(Oe)},this.setViewport=function(b,H,J,Z){b.isVector4?Oe.set(b.x,b.y,b.z,b.w):Oe.set(b,H,J,Z),x.viewport(Y.copy(Oe).multiplyScalar(me).round())},this.getScissor=function(b){return b.copy(ct)},this.setScissor=function(b,H,J,Z){b.isVector4?ct.set(b.x,b.y,b.z,b.w):ct.set(b,H,J,Z),x.scissor(he.copy(ct).multiplyScalar(me).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(b){x.setScissorTest(je=b)},this.setOpaqueSort=function(b){Ne=b},this.setTransparentSort=function(b){Xe=b},this.getClearColor=function(b){return b.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(b=!0,H=!0,J=!0){let Z=0;if(b){let K=!1;if(ie!==null){const Ce=ie.texture.format;K=m.has(Ce)}if(K){const Ce=ie.texture.type,Ue=d.has(Ce),Pe=at.getClearColor(),ke=at.getClearAlpha(),Ye=Pe.r,ot=Pe.g,dt=Pe.b;Ue?(S[0]=Ye,S[1]=ot,S[2]=dt,S[3]=ke,O.clearBufferuiv(O.COLOR,0,S)):(M[0]=Ye,M[1]=ot,M[2]=dt,M[3]=ke,O.clearBufferiv(O.COLOR,0,M))}else Z|=O.COLOR_BUFFER_BIT}H&&(Z|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(Z|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&O.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),V=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",Pt,!1),t.removeEventListener("webglcontextcreationerror",Ln,!1),at.dispose(),Re.dispose(),be.dispose(),$.dispose(),ue.dispose(),ce.dispose(),De.dispose(),pe.dispose(),we.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",$s),ze.removeEventListener("sessionend",Ks),zn.stop()};function Ft(b){b.preventDefault(),Da("WebGLRenderer: Context Lost."),U=!0}function Pt(){Da("WebGLRenderer: Context Restored."),U=!1;const b=G.autoReset,H=et.enabled,J=et.autoUpdate,Z=et.needsUpdate,K=et.type;Ge(),G.autoReset=b,et.enabled=H,et.autoUpdate=J,et.needsUpdate=Z,et.type=K}function Ln(b){Mt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function fn(b){const H=b.target;H.removeEventListener("dispose",fn),as(H)}function as(b){Dr(b),$.remove(b)}function Dr(b){const H=$.get(b).programs;H!==void 0&&(H.forEach(function(J){we.releaseProgram(J)}),b.isShaderMaterial&&we.releaseShaderCache(b))}this.renderBufferDirect=function(b,H,J,Z,K,Ce){H===null&&(H=Ve);const Ue=K.isMesh&&K.matrixWorld.determinantAffine()<0,Pe=Ur(b,H,J,Z,K);x.setMaterial(Z,Ue);let ke=J.index,Ye=1;if(Z.wireframe===!0){if(ke=ne.getWireframeAttribute(J),ke===void 0)return;Ye=2}const ot=J.drawRange,dt=J.attributes.position;let Ze=ot.start*Ye,Be=(ot.start+ot.count)*Ye;Ce!==null&&(Ze=Math.max(Ze,Ce.start*Ye),Be=Math.min(Be,(Ce.start+Ce.count)*Ye)),ke!==null?(Ze=Math.max(Ze,0),Be=Math.min(Be,ke.count)):dt!=null&&(Ze=Math.max(Ze,0),Be=Math.min(Be,dt.count));const Vt=Be-Ze;if(Vt<0||Vt===1/0)return;De.setup(K,Z,Pe,J,ke);let Gt,Ct=Se;if(ke!==null&&(Gt=ye.get(ke),Ct=le,Ct.setIndex(Gt)),K.isMesh)Z.wireframe===!0?(x.setLineWidth(Z.wireframeLinewidth*rt()),Ct.setMode(O.LINES)):Ct.setMode(O.TRIANGLES);else if(K.isLine){let sn=Z.linewidth;sn===void 0&&(sn=1),x.setLineWidth(sn*rt()),K.isLineSegments?Ct.setMode(O.LINES):K.isLineLoop?Ct.setMode(O.LINE_LOOP):Ct.setMode(O.LINE_STRIP)}else K.isPoints?Ct.setMode(O.POINTS):K.isSprite&&Ct.setMode(O.TRIANGLES);if(K.isBatchedMesh)if(vt.get("WEBGL_multi_draw"))Ct.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const sn=K._multiDrawStarts,Fe=K._multiDrawCounts,dn=K._multiDrawCount,bt=ke?ye.get(ke).bytesPerElement:1,pn=$.get(Z).currentProgram.getUniforms();for(let bn=0;bn<dn;bn++)pn.setValue(O,"_gl_DrawID",bn),Ct.render(sn[bn]/bt,Fe[bn])}else if(K.isInstancedMesh)Ct.renderInstances(Ze,Vt,K.count);else if(J.isInstancedBufferGeometry){const sn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Fe=Math.min(J.instanceCount,sn);Ct.renderInstances(Ze,Vt,Fe)}else Ct.render(Ze,Vt)};function $n(b,H,J){b.transparent===!0&&b.side===Jt&&b.forceSinglePass===!1?(b.side=Mn,b.needsUpdate=!0,ls(b,H,J),b.side=Bi,b.needsUpdate=!0,ls(b,H,J),b.side=Jt):ls(b,H,J)}this.compile=function(b,H,J=null){J===null&&(J=b),E=be.get(J),E.init(H),v.push(E),J.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),b!==J&&b.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(E.pushLight(K),K.castShadow&&E.pushShadow(K))}),E.setupLights();const Z=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ce=K.material;if(Ce)if(Array.isArray(Ce))for(let Ue=0;Ue<Ce.length;Ue++){const Pe=Ce[Ue];$n(Pe,J,K),Z.add(Pe)}else $n(Ce,J,K),Z.add(Ce)}),E=v.pop(),Z},this.compileAsync=function(b,H,J=null){const Z=this.compile(b,H,J);return new Promise(K=>{function Ce(){if(Z.forEach(function(Ue){$.get(Ue).currentProgram.isReady()&&Z.delete(Ue)}),Z.size===0){K(b);return}setTimeout(Ce,10)}vt.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let Vi=null;function Zs(b){Vi&&Vi(b)}function $s(){zn.stop()}function Ks(){zn.start()}const zn=new bu;zn.setAnimationLoop(Zs),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(b){Vi=b,ze.setAnimationLoop(b),b===null?zn.stop():zn.start()},ze.addEventListener("sessionstart",$s),ze.addEventListener("sessionend",Ks),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0){Mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;V!==null&&V.renderStart(b,H);const J=ze.enabled===!0&&ze.isPresenting===!0,Z=T!==null&&(ie===null||J)&&T.begin(D,ie);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(H),H=ze.getCamera()),b.isScene===!0&&b.onBeforeRender(D,b,H,ie),E=be.get(b,v.length),E.init(H),E.state.textureUnits=se.getTextureUnits(),v.push(E),Ae.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),fe.setFromProjectionMatrix(Ae,ai,H.reversedDepth),_e=this.localClippingEnabled,ge=He.init(this.clippingPlanes,_e),w=Re.get(b,C.length),w.init(),C.push(w),ze.enabled===!0&&ze.isPresenting===!0){const Ue=D.xr.getDepthSensingMesh();Ue!==null&&Hi(Ue,H,-1/0,D.sortObjects)}Hi(b,H,0,D.sortObjects),w.finish(),D.sortObjects===!0&&w.sort(Ne,Xe,H.reversedDepth),tt=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,tt&&at.addToRenderList(w,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&He.beginShadows();const K=E.state.shadowsArray;if(et.render(K,b,H),ge===!0&&He.endShadows(),(Z&&T.hasRenderPass())===!1){const Ue=w.opaque,Pe=w.transmissive;if(E.setupLights(),H.isArrayCamera){const ke=H.cameras;if(Pe.length>0)for(let Ye=0,ot=ke.length;Ye<ot;Ye++){const dt=ke[Ye];Js(Ue,Pe,b,dt)}tt&&at.render(b);for(let Ye=0,ot=ke.length;Ye<ot;Ye++){const dt=ke[Ye];Lr(w,b,dt,dt.viewport)}}else Pe.length>0&&Js(Ue,Pe,b,H),tt&&at.render(b),Lr(w,b,H)}ie!==null&&W===0&&(se.updateMultisampleRenderTarget(ie),se.updateRenderTargetMipmap(ie)),Z&&T.end(D),b.isScene===!0&&b.onAfterRender(D,b,H),De.resetDefaultState(),ae=-1,X=null,v.pop(),v.length>0?(E=v[v.length-1],se.setTextureUnits(E.state.textureUnits),ge===!0&&He.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,V!==null&&V.renderEnd()};function Hi(b,H,J,Z){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||fe.intersectsSprite(b)){Z&&Je.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ae);const Ue=ce.update(b),Pe=b.material;Pe.visible&&w.push(b,Ue,Pe,J,Je.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||fe.intersectsObject(b))){const Ue=ce.update(b),Pe=b.material;if(Z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Je.copy(b.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Je.copy(Ue.boundingSphere.center)),Je.applyMatrix4(b.matrixWorld).applyMatrix4(Ae)),Array.isArray(Pe)){const ke=Ue.groups;for(let Ye=0,ot=ke.length;Ye<ot;Ye++){const dt=ke[Ye],Ze=Pe[dt.materialIndex];Ze&&Ze.visible&&w.push(b,Ue,Ze,J,Je.z,dt)}}else Pe.visible&&w.push(b,Ue,Pe,J,Je.z,null)}}const Ce=b.children;for(let Ue=0,Pe=Ce.length;Ue<Pe;Ue++)Hi(Ce[Ue],H,J,Z)}function Lr(b,H,J,Z){const{opaque:K,transmissive:Ce,transparent:Ue}=b;E.setupLightsView(J),ge===!0&&He.setGlobalState(D.clippingPlanes,J),Z&&x.viewport(Y.copy(Z)),K.length>0&&os(K,H,J),Ce.length>0&&os(Ce,H,J),Ue.length>0&&os(Ue,H,J),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Js(b,H,J,Z){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[Z.id]===void 0){const Ze=vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[Z.id]=new ci(1,1,{generateMipmaps:!0,type:Ze?Ei:Pn,minFilter:Qi,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:wt.workingColorSpace})}const Ce=E.state.transmissionRenderTarget[Z.id],Ue=Z.viewport||Y;Ce.setSize(Ue.z*D.transmissionResolutionScale,Ue.w*D.transmissionResolutionScale);const Pe=D.getRenderTarget(),ke=D.getActiveCubeFace(),Ye=D.getActiveMipmapLevel();D.setRenderTarget(Ce),D.getClearColor(ft),Qe=D.getClearAlpha(),Qe<1&&D.setClearColor(16777215,.5),D.clear(),tt&&at.render(J);const ot=D.toneMapping;D.toneMapping=oi;const dt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),E.setupLightsView(Z),ge===!0&&He.setGlobalState(D.clippingPlanes,Z),os(b,J,Z),se.updateMultisampleRenderTarget(Ce),se.updateRenderTargetMipmap(Ce),vt.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let Be=0,Vt=H.length;Be<Vt;Be++){const Gt=H[Be],{object:Ct,geometry:sn,material:Fe,group:dn}=Gt;if(Fe.side===Jt&&Ct.layers.test(Z.layers)){const bt=Fe.side;Fe.side=Mn,Fe.needsUpdate=!0,Gi(Ct,J,Z,sn,Fe,dn),Fe.side=bt,Fe.needsUpdate=!0,Ze=!0}}Ze===!0&&(se.updateMultisampleRenderTarget(Ce),se.updateRenderTargetMipmap(Ce))}D.setRenderTarget(Pe,ke,Ye),D.setClearColor(ft,Qe),dt!==void 0&&(Z.viewport=dt),D.toneMapping=ot}function os(b,H,J){const Z=H.isScene===!0?H.overrideMaterial:null;for(let K=0,Ce=b.length;K<Ce;K++){const Ue=b[K],{object:Pe,geometry:ke,group:Ye}=Ue;let ot=Ue.material;ot.allowOverride===!0&&Z!==null&&(ot=Z),Pe.layers.test(J.layers)&&Gi(Pe,H,J,ke,ot,Ye)}}function Gi(b,H,J,Z,K,Ce){b.onBeforeRender(D,H,J,Z,K,Ce),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(D,H,J,Z,b,Ce),K.transparent===!0&&K.side===Jt&&K.forceSinglePass===!1?(K.side=Mn,K.needsUpdate=!0,D.renderBufferDirect(J,H,Z,K,b,Ce),K.side=Bi,K.needsUpdate=!0,D.renderBufferDirect(J,H,Z,K,b,Ce),K.side=Jt):D.renderBufferDirect(J,H,Z,K,b,Ce),b.onAfterRender(D,H,J,Z,K,Ce)}function ls(b,H,J){H.isScene!==!0&&(H=Ve);const Z=$.get(b),K=E.state.lights,Ce=E.state.shadowsArray,Ue=K.state.version,Pe=we.getParameters(b,K.state,Ce,H,J,E.state.lightProbeGridArray),ke=we.getProgramCacheKey(Pe);let Ye=Z.programs;Z.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?H.environment:null,Z.fog=H.fog;const ot=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;Z.envMap=ue.get(b.envMap||Z.environment,ot),Z.envMapRotation=Z.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,Ye===void 0&&(b.addEventListener("dispose",fn),Ye=new Map,Z.programs=Ye);let dt=Ye.get(ke);if(dt!==void 0){if(Z.currentProgram===dt&&Z.lightsStateVersion===Ue)return Nr(b,Pe),dt}else Pe.uniforms=we.getUniforms(b),V!==null&&b.isNodeMaterial&&V.build(b,J,Pe),b.onBeforeCompile(Pe,D),dt=we.acquireProgram(Pe,ke),Ye.set(ke,dt),Z.uniforms=Pe.uniforms;const Ze=Z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ze.clippingPlanes=He.uniform),Nr(b,Pe),Z.needsLights=Xa(b),Z.lightsStateVersion=Ue,Z.needsLights&&(Ze.ambientLightColor.value=K.state.ambient,Ze.lightProbe.value=K.state.probe,Ze.directionalLights.value=K.state.directional,Ze.directionalLightShadows.value=K.state.directionalShadow,Ze.spotLights.value=K.state.spot,Ze.spotLightShadows.value=K.state.spotShadow,Ze.rectAreaLights.value=K.state.rectArea,Ze.ltc_1.value=K.state.rectAreaLTC1,Ze.ltc_2.value=K.state.rectAreaLTC2,Ze.pointLights.value=K.state.point,Ze.pointLightShadows.value=K.state.pointShadow,Ze.hemisphereLights.value=K.state.hemi,Ze.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ze.spotLightMatrix.value=K.state.spotLightMatrix,Ze.spotLightMap.value=K.state.spotLightMap,Ze.pointShadowMatrix.value=K.state.pointShadowMatrix),Z.lightProbeGrid=E.state.lightProbeGridArray.length>0,Z.currentProgram=dt,Z.uniformsList=null,dt}function Ir(b){if(b.uniformsList===null){const H=b.currentProgram.getUniforms();b.uniformsList=ba.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function Nr(b,H){const J=$.get(b);J.outputColorSpace=H.outputColorSpace,J.batching=H.batching,J.batchingColor=H.batchingColor,J.instancing=H.instancing,J.instancingColor=H.instancingColor,J.instancingMorph=H.instancingMorph,J.skinning=H.skinning,J.morphTargets=H.morphTargets,J.morphNormals=H.morphNormals,J.morphColors=H.morphColors,J.morphTargetsCount=H.morphTargetsCount,J.numClippingPlanes=H.numClippingPlanes,J.numIntersection=H.numClipIntersection,J.vertexAlphas=H.vertexAlphas,J.vertexTangents=H.vertexTangents,J.toneMapping=H.toneMapping}function kn(b,H){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(H.matrixWorld);for(let J=0,Z=b.length;J<Z;J++){const K=b[J];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function Ur(b,H,J,Z,K){H.isScene!==!0&&(H=Ve),se.resetTextureUnits();const Ce=H.fog,Ue=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?H.environment:null,Pe=ie===null?D.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:wt.workingColorSpace,ke=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Ye=ue.get(Z.envMap||Ue,ke),ot=Z.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,dt=!!J.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ze=!!J.morphAttributes.position,Be=!!J.morphAttributes.normal,Vt=!!J.morphAttributes.color;let Gt=oi;Z.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Gt=D.toneMapping);const Ct=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,sn=Ct!==void 0?Ct.length:0,Fe=$.get(Z),dn=E.state.lights;if(ge===!0&&(_e===!0||b!==X)){const Ot=b===X&&Z.id===ae;He.setState(Z,b,Ot)}let bt=!1;Z.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==dn.state.version||Fe.outputColorSpace!==Pe||K.isBatchedMesh&&Fe.batching===!1||!K.isBatchedMesh&&Fe.batching===!0||K.isBatchedMesh&&Fe.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Fe.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Fe.instancing===!1||!K.isInstancedMesh&&Fe.instancing===!0||K.isSkinnedMesh&&Fe.skinning===!1||!K.isSkinnedMesh&&Fe.skinning===!0||K.isInstancedMesh&&Fe.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Fe.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Fe.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Fe.instancingMorph===!1&&K.morphTexture!==null||Fe.envMap!==Ye||Z.fog===!0&&Fe.fog!==Ce||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==He.numPlanes||Fe.numIntersection!==He.numIntersection)||Fe.vertexAlphas!==ot||Fe.vertexTangents!==dt||Fe.morphTargets!==Ze||Fe.morphNormals!==Be||Fe.morphColors!==Vt||Fe.toneMapping!==Gt||Fe.morphTargetsCount!==sn||!!Fe.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,Fe.__version=Z.version);let pn=Fe.currentProgram;bt===!0&&(pn=ls(Z,H,K),V&&Z.isNodeMaterial&&V.onUpdateProgram(Z,pn,Fe));let bn=!1,Kn=!1,En=!1;const Dt=pn.getUniforms(),Xt=Fe.uniforms;if(x.useProgram(pn.program)&&(bn=!0,Kn=!0,En=!0),Z.id!==ae&&(ae=Z.id,Kn=!0),Fe.needsLights){const Ot=kn(E.state.lightProbeGridArray,K);Fe.lightProbeGrid!==Ot&&(Fe.lightProbeGrid=Ot,Kn=!0)}if(bn||X!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Dt.setValue(O,"projectionMatrix",b.projectionMatrix),Dt.setValue(O,"viewMatrix",b.matrixWorldInverse);const Vn=Dt.map.cameraPosition;Vn!==void 0&&Vn.setValue(O,Me.setFromMatrixPosition(b.matrixWorld)),R.logarithmicDepthBuffer&&Dt.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Dt.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),X!==b&&(X=b,Kn=!0,En=!0)}if(Fe.needsLights&&(dn.state.directionalShadowMap.length>0&&Dt.setValue(O,"directionalShadowMap",dn.state.directionalShadowMap,se),dn.state.spotShadowMap.length>0&&Dt.setValue(O,"spotShadowMap",dn.state.spotShadowMap,se),dn.state.pointShadowMap.length>0&&Dt.setValue(O,"pointShadowMap",dn.state.pointShadowMap,se)),K.isSkinnedMesh){Dt.setOptional(O,K,"bindMatrix"),Dt.setOptional(O,K,"bindMatrixInverse");const Ot=K.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Dt.setValue(O,"boneTexture",Ot.boneTexture,se))}K.isBatchedMesh&&(Dt.setOptional(O,K,"batchingTexture"),Dt.setValue(O,"batchingTexture",K._matricesTexture,se),Dt.setOptional(O,K,"batchingIdTexture"),Dt.setValue(O,"batchingIdTexture",K._indirectTexture,se),Dt.setOptional(O,K,"batchingColorTexture"),K._colorsTexture!==null&&Dt.setValue(O,"batchingColorTexture",K._colorsTexture,se));const Jn=J.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&k.update(K,J,pn),(Kn||Fe.receiveShadow!==K.receiveShadow)&&(Fe.receiveShadow=K.receiveShadow,Dt.setValue(O,"receiveShadow",K.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&H.environment!==null&&(Xt.envMapIntensity.value=H.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=q_()),Kn){if(Dt.setValue(O,"toneMappingExposure",D.toneMappingExposure),Fe.needsLights&&Wa(Xt,En),Ce&&Z.fog===!0&&qe.refreshFogUniforms(Xt,Ce),qe.refreshMaterialUniforms(Xt,Z,me,ve,E.state.transmissionRenderTarget[b.id]),Fe.needsLights&&Fe.lightProbeGrid){const Ot=Fe.lightProbeGrid;Xt.probesSH.value=Ot.texture,Xt.probesMin.value.copy(Ot.boundingBox.min),Xt.probesMax.value.copy(Ot.boundingBox.max),Xt.probesResolution.value.copy(Ot.resolution)}ba.upload(O,Ir(Fe),Xt,se)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ba.upload(O,Ir(Fe),Xt,se),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Dt.setValue(O,"center",K.center),Dt.setValue(O,"modelViewMatrix",K.modelViewMatrix),Dt.setValue(O,"normalMatrix",K.normalMatrix),Dt.setValue(O,"modelMatrix",K.matrixWorld),Z.uniformsGroups!==void 0){const Ot=Z.uniformsGroups;for(let Vn=0,fi=Ot.length;Vn<fi;Vn++){const Fr=Ot[Vn];pe.update(Fr,pn),pe.bind(Fr,pn)}}return pn}function Wa(b,H){b.ambientLightColor.needsUpdate=H,b.lightProbe.needsUpdate=H,b.directionalLights.needsUpdate=H,b.directionalLightShadows.needsUpdate=H,b.pointLights.needsUpdate=H,b.pointLightShadows.needsUpdate=H,b.spotLights.needsUpdate=H,b.spotLightShadows.needsUpdate=H,b.rectAreaLights.needsUpdate=H,b.hemisphereLights.needsUpdate=H}function Xa(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(b,H,J){const Z=$.get(b);Z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),$.get(b.texture).__webglTexture=H,$.get(b.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:J,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,H){const J=$.get(b);J.__webglFramebuffer=H,J.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,J=0){ie=b,q=H,W=J;let Z=null,K=!1,Ce=!1;if(b){const Pe=$.get(b);if(Pe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(O.FRAMEBUFFER,Pe.__webglFramebuffer),Y.copy(b.viewport),he.copy(b.scissor),Ie=b.scissorTest,x.viewport(Y),x.scissor(he),x.setScissorTest(Ie),ae=-1;return}else if(Pe.__webglFramebuffer===void 0)se.setupRenderTarget(b);else if(Pe.__hasExternalTextures)se.rebindTextures(b,$.get(b.texture).__webglTexture,$.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ot=b.depthTexture;if(Pe.__boundDepthTexture!==ot){if(ot!==null&&$.has(ot)&&(b.width!==ot.image.width||b.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");se.setupDepthRenderbuffer(b)}}const ke=b.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Ce=!0);const Ye=$.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ye[H])?Z=Ye[H][J]:Z=Ye[H],K=!0):b.samples>0&&se.useMultisampledRTT(b)===!1?Z=$.get(b).__webglMultisampledFramebuffer:Array.isArray(Ye)?Z=Ye[J]:Z=Ye,Y.copy(b.viewport),he.copy(b.scissor),Ie=b.scissorTest}else Y.copy(Oe).multiplyScalar(me).floor(),he.copy(ct).multiplyScalar(me).floor(),Ie=je;if(J!==0&&(Z=Q),x.bindFramebuffer(O.FRAMEBUFFER,Z)&&x.drawBuffers(b,Z),x.viewport(Y),x.scissor(he),x.setScissorTest(Ie),K){const Pe=$.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+H,Pe.__webglTexture,J)}else if(Ce){const Pe=H;for(let ke=0;ke<b.textures.length;ke++){const Ye=$.get(b.textures[ke]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+ke,Ye.__webglTexture,J,Pe)}}else if(b!==null&&J!==0){const Pe=$.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Pe.__webglTexture,J)}ae=-1},this.readRenderTargetPixels=function(b,H,J,Z,K,Ce,Ue,Pe=0){if(!(b&&b.isWebGLRenderTarget)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ue!==void 0&&(ke=ke[Ue]),ke){x.bindFramebuffer(O.FRAMEBUFFER,ke);try{const Ye=b.textures[Pe],ot=Ye.format,dt=Ye.type;if(b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Pe),!R.textureFormatReadable(ot)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(dt)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=b.width-Z&&J>=0&&J<=b.height-K&&O.readPixels(H,J,Z,K,Ee.convert(ot),Ee.convert(dt),Ce)}finally{const Ye=ie!==null?$.get(ie).__webglFramebuffer:null;x.bindFramebuffer(O.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(b,H,J,Z,K,Ce,Ue,Pe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ue!==void 0&&(ke=ke[Ue]),ke)if(H>=0&&H<=b.width-Z&&J>=0&&J<=b.height-K){x.bindFramebuffer(O.FRAMEBUFFER,ke);const Ye=b.textures[Pe],ot=Ye.format,dt=Ye.type;if(b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Pe),!R.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ze),O.bufferData(O.PIXEL_PACK_BUFFER,Ce.byteLength,O.STREAM_READ),O.readPixels(H,J,Z,K,Ee.convert(ot),Ee.convert(dt),0);const Be=ie!==null?$.get(ie).__webglFramebuffer:null;x.bindFramebuffer(O.FRAMEBUFFER,Be);const Vt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Pf(O,Vt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ze),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Ce),O.deleteBuffer(Ze),O.deleteSync(Vt),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,H=null,J=0){const Z=Math.pow(2,-J),K=Math.floor(b.image.width*Z),Ce=Math.floor(b.image.height*Z),Ue=H!==null?H.x:0,Pe=H!==null?H.y:0;se.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,J,0,0,Ue,Pe,K,Ce),x.unbindTexture()},this.copyTextureToTexture=function(b,H,J=null,Z=null,K=0,Ce=0){let Ue,Pe,ke,Ye,ot,dt,Ze,Be,Vt;const Gt=b.isCompressedTexture?b.mipmaps[Ce]:b.image;if(J!==null)Ue=J.max.x-J.min.x,Pe=J.max.y-J.min.y,ke=J.isBox3?J.max.z-J.min.z:1,Ye=J.min.x,ot=J.min.y,dt=J.isBox3?J.min.z:0;else{const Xt=Math.pow(2,-K);Ue=Math.floor(Gt.width*Xt),Pe=Math.floor(Gt.height*Xt),b.isDataArrayTexture?ke=Gt.depth:b.isData3DTexture?ke=Math.floor(Gt.depth*Xt):ke=1,Ye=0,ot=0,dt=0}Z!==null?(Ze=Z.x,Be=Z.y,Vt=Z.z):(Ze=0,Be=0,Vt=0);const Ct=Ee.convert(H.format),sn=Ee.convert(H.type);let Fe;H.isData3DTexture?(se.setTexture3D(H,0),Fe=O.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(se.setTexture2DArray(H,0),Fe=O.TEXTURE_2D_ARRAY):(se.setTexture2D(H,0),Fe=O.TEXTURE_2D),x.activeTexture(O.TEXTURE0),x.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),x.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),x.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);const dn=x.getParameter(O.UNPACK_ROW_LENGTH),bt=x.getParameter(O.UNPACK_IMAGE_HEIGHT),pn=x.getParameter(O.UNPACK_SKIP_PIXELS),bn=x.getParameter(O.UNPACK_SKIP_ROWS),Kn=x.getParameter(O.UNPACK_SKIP_IMAGES);x.pixelStorei(O.UNPACK_ROW_LENGTH,Gt.width),x.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Gt.height),x.pixelStorei(O.UNPACK_SKIP_PIXELS,Ye),x.pixelStorei(O.UNPACK_SKIP_ROWS,ot),x.pixelStorei(O.UNPACK_SKIP_IMAGES,dt);const En=b.isDataArrayTexture||b.isData3DTexture,Dt=H.isDataArrayTexture||H.isData3DTexture;if(b.isDepthTexture){const Xt=$.get(b),Jn=$.get(H),Ot=$.get(Xt.__renderTarget),Vn=$.get(Jn.__renderTarget);x.bindFramebuffer(O.READ_FRAMEBUFFER,Ot.__webglFramebuffer),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,Vn.__webglFramebuffer);for(let fi=0;fi<ke;fi++)En&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,$.get(b).__webglTexture,K,dt+fi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,$.get(H).__webglTexture,Ce,Vt+fi)),O.blitFramebuffer(Ye,ot,Ue,Pe,Ze,Be,Ue,Pe,O.DEPTH_BUFFER_BIT,O.NEAREST);x.bindFramebuffer(O.READ_FRAMEBUFFER,null),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||$.has(b)){const Xt=$.get(b),Jn=$.get(H);x.bindFramebuffer(O.READ_FRAMEBUFFER,ee),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,B);for(let Ot=0;Ot<ke;Ot++)En?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Xt.__webglTexture,K,dt+Ot):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Xt.__webglTexture,K),Dt?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Jn.__webglTexture,Ce,Vt+Ot):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Jn.__webglTexture,Ce),K!==0?O.blitFramebuffer(Ye,ot,Ue,Pe,Ze,Be,Ue,Pe,O.COLOR_BUFFER_BIT,O.NEAREST):Dt?O.copyTexSubImage3D(Fe,Ce,Ze,Be,Vt+Ot,Ye,ot,Ue,Pe):O.copyTexSubImage2D(Fe,Ce,Ze,Be,Ye,ot,Ue,Pe);x.bindFramebuffer(O.READ_FRAMEBUFFER,null),x.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Dt?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Fe,Ce,Ze,Be,Vt,Ue,Pe,ke,Ct,sn,Gt.data):H.isCompressedArrayTexture?O.compressedTexSubImage3D(Fe,Ce,Ze,Be,Vt,Ue,Pe,ke,Ct,Gt.data):O.texSubImage3D(Fe,Ce,Ze,Be,Vt,Ue,Pe,ke,Ct,sn,Gt):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Ce,Ze,Be,Ue,Pe,Ct,sn,Gt.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Ce,Ze,Be,Gt.width,Gt.height,Ct,Gt.data):O.texSubImage2D(O.TEXTURE_2D,Ce,Ze,Be,Ue,Pe,Ct,sn,Gt);x.pixelStorei(O.UNPACK_ROW_LENGTH,dn),x.pixelStorei(O.UNPACK_IMAGE_HEIGHT,bt),x.pixelStorei(O.UNPACK_SKIP_PIXELS,pn),x.pixelStorei(O.UNPACK_SKIP_ROWS,bn),x.pixelStorei(O.UNPACK_SKIP_IMAGES,Kn),Ce===0&&H.generateMipmaps&&O.generateMipmap(Fe),x.unbindTexture()},this.initRenderTarget=function(b){$.get(b).__webglFramebuffer===void 0&&se.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?se.setTextureCube(b,0):b.isData3DTexture?se.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?se.setTexture2DArray(b,0):se.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){q=0,W=0,ie=null,x.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=wt._getDrawingBufferColorSpace(e),t.unpackColorSpace=wt._getUnpackColorSpace()}}const fr=new N;function Nn(i,e,t,n,s,r){const a=2*Math.PI*s/4,l=Math.max(r-2*s,0),o=Math.PI/4;fr.copy(e),fr[n]=0,fr.normalize();const c=.5*a/(a+l),h=1-fr.angleTo(i)/o;return Math.sign(fr[t])===1?h*c:l/(a+l)+c+c*(1-h)}class Pr extends Rt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const l=this.toNonIndexed();this.index=null,this.attributes.position=l.attributes.position,this.attributes.normal=l.attributes.normal,this.attributes.uv=l.attributes.uv;const o=new N,c=new N,h=new N(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,p=this.attributes.uv.array,g=u.length/6,_=new N,m=.5/a;for(let d=0,S=0;d<u.length;d+=3,S+=2)switch(o.fromArray(u,d),c.copy(o),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),u[d+0]=h.x*Math.sign(o.x)+c.x*r,u[d+1]=h.y*Math.sign(o.y)+c.y*r,u[d+2]=h.z*Math.sign(o.z)+c.z*r,f[d+0]=c.x,f[d+1]=c.y,f[d+2]=c.z,Math.floor(d/g)){case 0:_.set(1,0,0),p[S+0]=Nn(_,c,"z","y",r,n),p[S+1]=1-Nn(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),p[S+0]=1-Nn(_,c,"z","y",r,n),p[S+1]=1-Nn(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),p[S+0]=1-Nn(_,c,"x","z",r,e),p[S+1]=Nn(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),p[S+0]=1-Nn(_,c,"x","z",r,e),p[S+1]=1-Nn(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),p[S+0]=1-Nn(_,c,"x","y",r,e),p[S+1]=1-Nn(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),p[S+0]=Nn(_,c,"x","y",r,e),p[S+1]=1-Nn(_,c,"y","x",r,t);break}}static fromJSON(e){return new Pr(e.width,e.height,e.depth,e.segments,e.radius)}}const Rh={type:"change"},nc={type:"start"},Du={type:"end"},ma=new ka,Ch=new xi,Z_=Math.cos(70*If.DEG2RAD),rn=new N,Sn=2*Math.PI,kt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lo=1e-6;class $_ extends Jd{constructor(e,t=null){super(e,t),this.state=kt.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Us.ROTATE,MIDDLE:Us.DOLLY,RIGHT:Us.PAN},this.touches={ONE:Ls.ROTATE,TWO:Ls.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Ti,this._lastTargetPosition=new N,this._quat=new Ti().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ih,this._sphericalDelta=new ih,this._scale=1,this._panOffset=new N,this._rotateStart=new j,this._rotateEnd=new j,this._rotateDelta=new j,this._panStart=new j,this._panEnd=new j,this._panDelta=new j,this._dollyStart=new j,this._dollyEnd=new j,this._dollyDelta=new j,this._dollyDirection=new N,this._mouse=new j,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=J_.bind(this),this._onPointerDown=K_.bind(this),this._onPointerUp=j_.bind(this),this._onContextMenu=rv.bind(this),this._onMouseWheel=tv.bind(this),this._onKeyDown=nv.bind(this),this._onTouchStart=iv.bind(this),this._onTouchMove=sv.bind(this),this._onMouseDown=Q_.bind(this),this._onMouseMove=ev.bind(this),this._interceptControlDown=av.bind(this),this._interceptControlUp=ov.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rh),this.update(),this.state=kt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;rn.copy(t).sub(this.target),rn.applyQuaternion(this._quat),this._spherical.setFromVector3(rn),this.autoRotate&&this.state===kt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Sn:n>Math.PI&&(n-=Sn),s<-Math.PI?s+=Sn:s>Math.PI&&(s-=Sn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(rn.setFromSpherical(this._spherical),rn.applyQuaternion(this._quatInverse),t.copy(this.target).add(rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const l=rn.length();a=this._clampDistance(l*this._scale);const o=l-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const l=new N(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(l),this.object.updateMatrixWorld(),a=rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ma.origin.copy(this.object.position),ma.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ma.direction))<Z_?this.object.lookAt(this.target):(Ch.setFromNormalAndCoplanarPoint(this.object.up,this.target),ma.intersectPlane(Ch,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Lo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lo||this._lastTargetPosition.distanceToSquared(this.target)>Lo?(this.dispatchEvent(Rh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){rn.setFromMatrixColumn(t,0),rn.multiplyScalar(-e),this._panOffset.add(rn)}_panUp(e,t){this.screenSpacePanning===!0?rn.setFromMatrixColumn(t,1):(rn.setFromMatrixColumn(t,0),rn.crossVectors(this.object.up,rn)),rn.multiplyScalar(e),this._panOffset.add(rn)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;rn.copy(s).sub(this.target);let r=rn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,l=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,l=(e.pageY+t.y)*.5;this._updateZoomParameters(a,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new j,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function K_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function J_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function j_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Du),this.state=kt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Q_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=kt.DOLLY;break;case Us.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=kt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=kt.ROTATE}break;case Us.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=kt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=kt.PAN}break;default:this.state=kt.NONE}this.state!==kt.NONE&&this.dispatchEvent(nc)}function ev(i){switch(this.state){case kt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case kt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case kt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function tv(i){this.enabled===!1||this.enableZoom===!1||this.state!==kt.NONE||(i.preventDefault(),this.dispatchEvent(nc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Du))}function nv(i){this.enabled!==!1&&this._handleKeyDown(i)}function iv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ls.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=kt.TOUCH_ROTATE;break;case Ls.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=kt.TOUCH_PAN;break;default:this.state=kt.NONE}break;case 2:switch(this.touches.TWO){case Ls.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=kt.TOUCH_DOLLY_PAN;break;case Ls.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=kt.TOUCH_DOLLY_ROTATE;break;default:this.state=kt.NONE}break;default:this.state=kt.NONE}this.state!==kt.NONE&&this.dispatchEvent(nc)}function sv(i){switch(this._trackPointer(i),this.state){case kt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case kt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case kt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case kt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=kt.NONE}}function rv(i){this.enabled!==!1&&i.preventDefault()}function av(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ov(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class lv extends Qh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Rt;e.deleteAttribute("uv");const t=new de({side:Mn}),n=new de,s=new Su(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new Te(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new su(e,n,6),l=new tn;l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),l.updateMatrix(),a.setMatrixAt(0,l.matrix),l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),l.updateMatrix(),a.setMatrixAt(1,l.matrix),l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),l.updateMatrix(),a.setMatrixAt(2,l.matrix),l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),l.updateMatrix(),a.setMatrixAt(3,l.matrix),l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),l.updateMatrix(),a.setMatrixAt(4,l.matrix),l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),l.updateMatrix(),a.setMatrixAt(5,l.matrix),this.add(a);const o=new Te(e,Ds(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const c=new Te(e,Ds(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new Te(e,Ds(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new Te(e,Ds(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const f=new Te(e,Ds(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const p=new Te(e,Ds(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Ds(i){return new Vd({color:0,emissive:16777215,emissiveIntensity:i})}const cv=1.8,si=.75,ji=.9;function hv(i,e={}){const t=new Y_({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=vr,t.outputColorSpace=hn,t.toneMapping=Fl,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new Qh;r.background=new ut(n?12377333:14672872),r.fog=n?new xr(12377333,60*s,160*s):new xr(14672872,4*s,9*s);const a=new Pl(t),l=a.fromScene(new lv,.04).texture;r.environment=l,r.environmentIntensity=.55,a.dispose();const o=new Cn(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),c=new N(...e.cameraPosition??[0,.5,1.45]),h=new N(...e.target??[0,.3,0]);o.position.copy(c);const u=new $_(o,t.domElement);u.target.copy(h),u.enableDamping=!0,u.dampingFactor=.08,u.enablePan=!1,u.minDistance=e.minDistance??.5,u.maxDistance=e.maxDistance??3,u.maxPolarAngle=Math.PI/2.05,u.minAzimuthAngle=-Math.PI/2.2,u.maxAzimuthAngle=Math.PI/2.2,u.update();const f=new Zt;f.scale.setScalar(s),r.add(f);const p=e.benchLength??cv,g=[],_=[];let m=null,d=null;if(n)gv(f),_v(f);else if(uv(f),m=mv(f,!!e.cupboard,p,s,!!e.wallCabinets),e.wallCabinets&&(d=pv(f,p,s)),e.sideBenches){const X=7-si/2-.02;for(const Y of[-1,1]){const he=Ph(p,s);he.group.position.set(Y*X,0,1.6),he.group.rotation.y=-Y*Math.PI/2,f.add(he.group),g.push(...he.parts.doors),_.push(...he.parts.blockers);const Ie=Ph(.9,s);Ie.group.position.set(Y*(p/2+.5+.45),0,0),f.add(Ie.group),g.push(...Ie.parts.doors),_.push(...Ie.parts.blockers)}}!n&&(e.cupboard||e.wallCabinets)&&(r.fog=new xr(14672872,11*s,26*s)),s!==1&&f.traverse(X=>{if(!(X instanceof Fa)||!X.castShadow)return;const Y=X.shadow.camera;Y.left*=s,Y.right*=s,Y.top*=s,Y.bottom*=s,Y.near*=s,Y.far*=s,Y.updateProjectionMatrix(),X.shadow.normalBias*=s});const S=[],M=new Zd;let y=0;const w=X=>{y=requestAnimationFrame(w),M.update(X);const Y=Math.min(1,M.getDelta());if(S.forEach(he=>he(Y)),D){D.t=Math.min(1,D.t+Y/.7);const he=D.t<.5?2*D.t*D.t:1-Math.pow(-2*D.t+2,2)/2;o.position.lerpVectors(D.fromPos,D.toPos,he),u.target.lerpVectors(D.fromTarget,D.toTarget,he),D.t>=1&&(D=null)}u.update(),xv(r,o,t.domElement.clientHeight),t.render(r,o)};y=requestAnimationFrame(w);let E=null,C=null,v=null,T=!1,D=null;u.addEventListener("start",()=>{T=!0,D=null});const U=new ResizeObserver(()=>{const X=i.clientWidth,Y=i.clientHeight;!X||!Y||(t.setSize(X,Y),o.aspect=X/Y,o.updateProjectionMatrix(),E&&!T&&(C!==null?V(E,C,{dir:v||void 0}):Q(E)))});U.observe(i);function V(X,Y=.7,he={}){if(X.isEmpty())return;E=X.clone(),C=Y,T=!1;const Ie=X.getCenter(new N),ft=(he.dir?he.dir.clone():c.clone().sub(h)).normalize();v=ft.clone();const Qe=o.position.clone(),re=u.target.clone(),ve=[0,1,2,3,4,5,6,7].map(Oe=>new N(Oe&1?X.max.x:X.min.x,Oe&2?X.max.y:X.min.y,Oe&4?X.max.z:X.min.z)),me=Oe=>(o.position.copy(Ie).addScaledVector(ft,Oe),o.lookAt(Ie),o.updateMatrixWorld(!0),ve.every(ct=>{const je=ct.clone().project(o);return je.z<1&&Math.abs(je.x)<=Y&&Math.abs(je.y)<=Y}));let Ne=.01,Xe=u.maxDistance*4;for(let Oe=0;Oe<40;Oe++){const ct=(Ne+Xe)/2;me(ct)?Xe=ct:Ne=ct}if(u.maxDistance=Math.max(u.maxDistance,Xe*1.5),h.copy(Ie),c.copy(Ie).addScaledVector(ft,Xe),he.animate){o.position.copy(Qe),o.lookAt(re),D={fromPos:Qe,toPos:c.clone(),fromTarget:re,toTarget:h.clone(),t:0};return}D=null,o.position.copy(c),u.target.copy(h),u.update()}function Q(X){if(X.isEmpty())return;E=X.clone(),C=null,T=!1;const Y=X.getCenter(new N),he=X.getSize(new N),Ie=o.fov*Math.PI/180,ft=2*Math.atan(Math.tan(Ie/2)*o.aspect),Qe=Math.max(he.x/2/Math.tan(ft/2),Math.max(he.y,he.z*.6)/2/Math.tan(Ie/2))*1.12+he.z*.25,re=c.clone().sub(h).normalize(),ve=Math.min(u.maxDistance,Math.max(u.minDistance,Qe));h.copy(Y),c.copy(Y).addScaledVector(re,ve),o.position.copy(c),u.target.copy(h),u.update()}const ee=new j,B=[...(m==null?void 0:m.doors)||[],...(d==null?void 0:d.doors)||[],...g];B.length&&S.push(X=>{B.forEach(Y=>{const he=Y.userData.open?Y.userData.openAngle:0;Y.rotation.y+=(he-Y.rotation.y)*Math.min(1,X*7)})});const q=X=>{let Y=X;for(;Y&&!Y.userData.cupboardDoor;)Y=Y.parent;return Y},W=X=>{X.userData.open=!X.userData.open},ie=d?{doors:d.doors,blockers:d.blockers,cabinets:d.cabinets.map(X=>({minX:X.minX*s,maxX:X.maxX*s,rows:X.rows.map(Y=>Y*s),rowHeight:X.rowHeight*s,depth:X.depth*s,z:X.z*s,frontZ:X.frontZ*s}))}:null;let ae=null;if(m){const X=m;ae={doors:X.doors,blockers:X.blockers,bays:X.bays.map(Y=>({minX:Y.minX*s,maxX:Y.maxX*s,levels:Y.levels.map(he=>he*s),frontZ:Y.frontZ*s,backZ:Y.backZ*s})),toggleDoor:W,isOpen:Y=>!!Y.userData.open,doorOf:q}}return{cupboard:ae,wallCabinets:ie,furniture:{doors:g,blockers:_},benchLength:p,toggleDoor:W,doorOf:q,renderer:t,scene:r,camera:o,controls:u,canvas:t.domElement,onFrame:X=>{S.push(X)},resetView:()=>{o.position.copy(c),u.target.copy(h),u.update()},frameBox:Q,fitBox:V,toNdc:X=>{const Y=t.domElement.getBoundingClientRect();return ee.set((X.clientX-Y.left)/Y.width*2-1,-((X.clientY-Y.top)/Y.height)*2+1),ee},dispose:()=>{cancelAnimationFrame(y),U.disconnect(),u.dispose(),r.traverse(X=>{var Y;(X instanceof Te||X instanceof id||X instanceof Rn)&&((Y=X.geometry)==null||Y.dispose(),(Array.isArray(X.material)?X.material:[X.material]).forEach(Ie=>{var ft;(ft=Ie.map)==null||ft.dispose(),Ie.dispose()}))}),l.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function uv(i){i.add(new xu(16119807,9080729,.55));const e=new Fa(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new Fa(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}const Ea=-si/2-.25,Lu=()=>new de({color:1976890,roughness:.95}),fv=()=>new de({color:14928028,roughness:.55});function Il(i,e,t,n,s,r,a=9){const l=new Te(new Rt(s,.008,.012),new de({color:16777215,emissive:16773590,emissiveIntensity:2}));l.position.set(e,t,n),i.add(l);const o=new Su(16773590,a,1.4*r,2);o.position.set(e,t-.05,n+.05),i.add(o)}function dv(i,e){const t=-ji,n=e-t,s=Cr(256,256,(g,_,m)=>{g.fillStyle="#1f5a63",g.fillRect(0,0,_,m);for(let d=0;d<_;d+=4)g.fillStyle=d%8===0?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",g.fillRect(d,0,2,m),g.fillRect(0,d,_,2);for(let d=0;d<900;d++)g.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"0,0,0"},${Math.random()*.06})`,g.fillRect(Math.random()*_,Math.random()*m,2,2);g.strokeStyle="rgba(255,255,255,0.06)",g.lineWidth=2,g.beginPath(),g.moveTo(_/2,0),g.lineTo(_,m/2),g.lineTo(_/2,m),g.lineTo(0,m/2),g.closePath(),g.stroke()});s.wrapS=s.wrapT=li;const r=new de({map:Ga(),roughness:.55}),a=new de({color:13936715,roughness:.25,metalness:1}),l=new de({color:15659250,roughness:.95}),o=7,c=7,h=c-Ea,u=(c+Ea)/2,f=5;[{x:0,z:Ea,rotY:0,length:2*o,newWall:!1},{x:-o,z:u,rotY:Math.PI/2,length:h,newWall:!0},{x:o,z:u,rotY:-Math.PI/2,length:h,newWall:!0},{x:0,z:c,rotY:Math.PI,length:2*o,newWall:!0}].forEach(({x:g,z:_,rotY:m,length:d,newWall:S})=>{const M=new Zt;if(M.position.set(g,0,_),M.rotation.y=m,i.add(M),S){const U=new Te(new Dn(d,f),l);U.position.y=t+f/2,U.receiveShadow=!0,M.add(U)}const y=s.clone();y.needsUpdate=!0,y.repeat.set(d/.35,n/.35);const w=new Te(new Dn(d,n),new de({map:y,roughness:.95}));w.position.set(0,t+n/2,.004),w.receiveShadow=!0,M.add(w);const E=new Te(new Rt(d,.045,.022),r);E.position.set(0,e-.0225,.015),E.castShadow=!0,E.receiveShadow=!0,M.add(E);const C=new Te(new Rt(d,.1,.018),r);C.position.set(0,t+.05,.013),M.add(C);const v=Math.floor(d/.15),T=new su(new Wt(.007,10,8),a,v),D=new Lt;for(let U=0;U<v;U++)D.makeTranslation(-d/2+.075+U*.15,e-.075,.007),T.setMatrixAt(U,D);M.add(T)})}function pv(i,e,t=1){const n=e/2+.1,s=.86,r=.3,a=.016,l=.5,o=Ea+.002,c=o+r,h=4,u=Ga(),f=new de({map:u,roughness:.6}),p=Lu(),g=fv(),_=new de({color:14146528,roughness:.3,metalness:.85}),m=new Xs({color:15398655,roughness:.05,metalness:0,transparent:!0,opacity:.16,depthWrite:!1}),d=[],S=[],M=[];dv(i,l);const y=.08+n/2;for(const w of[-y,y]){const E=w-n/2,C=w+n/2,v=(q,W,ie,ae,X,Y,he)=>{const Ie=new Te(new Rt(q,W,ie),he);Ie.position.set(ae,X,Y),Ie.castShadow=!0,Ie.receiveShadow=!0,i.add(Ie),S.push(Ie)};v(n,s,a,w,l+s/2,o+a/2,p),v(a,s,r,E+a/2,l+s/2,o+r/2,f),v(a,s,r,C-a/2,l+s/2,o+r/2,f),v(n,a*1.5,r,w,l+s-a*.75,o+r/2,f),v(n,a*1.5,r,w,l+a*.75,o+r/2,f),v(n+.03,.03,r+.02,w,l+s+.015,o+r/2+.01,f);const T=l+a*1.5,D=l+s-a*1.5,U=(D-T)/h,V=[];for(let q=0;q<h;q++){const W=T+q*U;q>0&&v(n-2*a,a,r-a-.03,w,W-a/2,o+a+(r-a-.03)/2,g),V.unshift(W)}for(const q of[w-n/4,w+n/4])Il(i,q,D-.006,o+r*.72,n/2-.08,t);M.push({minX:E+a,maxX:C-a,rows:V,rowHeight:U-a,depth:r-a-.05,z:o+a+(r-a-.03)/2,frontZ:o+r-.03});const Q=n/2-.004,ee=s-.01,B=.018;for(const[q,W]of[[E,1],[C,-1]]){const ie=new Zt;ie.position.set(q+W*.002,l+s/2,c+.008);const ae=new Te(new Rt(Q-B,ee-B,.004),m);ae.position.x=W*Q/2,ae.renderOrder=2,ie.add(ae);const X=(he,Ie,ft,Qe)=>{const re=new Te(new Rt(he,Ie,.014),_);re.position.set(ft,Qe,0),ie.add(re)};X(Q,B,W*Q/2,ee/2-B/2),X(Q,B,W*Q/2,-ee/2+B/2),X(B,ee,W*B/2,0),X(B,ee,W*(Q-B/2),0);const Y=new Te(new te(.008,.008,.07,12),ic.steel());Y.position.set(W*(Q-.04),-.12,.02),ie.add(Y),ie.userData.cupboardDoor=!0,ie.userData.open=!1,ie.userData.openAngle=-W*1.7,i.add(ie),d.push(ie)}}return{doors:d,blockers:S,cabinets:M}}function Ph(i,e){const t=new Zt,n=new Te(new Pr(i,.035,si,3,.008),new Xs({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));n.position.y=-.0175,n.castShadow=!0,n.receiveShadow=!0,t.add(n);const s=Iu(t,Ga(),i,e,!1);return{group:t,parts:s}}function mv(i,e=!1,t=1.8,n=1,s=!1){const r=Cr(512,512,(_,m,d)=>{_.fillStyle="#b9bec6",_.fillRect(0,0,m,d);for(let S=0;S<1200;S++)_.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,_.fillRect(Math.random()*m,Math.random()*d,3,3);_.strokeStyle="rgba(70,74,82,0.35)",_.lineWidth=3,_.strokeRect(0,0,m,d)});r.wrapS=r.wrapT=li,r.repeat.set(12,12);const a=new Te(new Dn(14,14),new de({map:r,roughness:.85}));a.rotation.x=-Math.PI/2,a.position.y=-ji,a.receiveShadow=!0,i.add(a);const l=new Te(new Dn(14,5),new de({color:15659250,roughness:.95}));l.position.set(0,1.6,-si/2-.25),l.receiveShadow=!0,i.add(l);const o=Cr(256,256,(_,m,d)=>{_.fillStyle="#f7f8f9",_.fillRect(0,0,m,d),_.strokeStyle="#c9ced4",_.lineWidth=4,_.strokeRect(0,0,m,d)});o.wrapS=o.wrapT=li,o.repeat.set(40,4);const c=new Te(new Dn(6,.6),new de({map:o,roughness:.3,metalness:0}));c.position.set(0,.3,-si/2-.249),s||i.add(c);const h=new Te(new Pr(t,.035,si,3,.008),new Xs({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));h.position.y=-.0175,h.receiveShadow=!0,h.castShadow=!0,i.add(h);const u=Ga();if(e)return Iu(i,u,t,n);const f=new Te(new Rt(t-.06,ji-.035,si-.06),new de({map:u,roughness:.7}));f.position.y=-ji/2-.0175,f.receiveShadow=!0,i.add(f);const p=new de({color:3877404,roughness:.8}),g=ic.steel();for(const _ of[-.6,0,.6]){const m=new Te(new Rt(.004,ji-.12,.002),p);m.position.set(_,-ji/2-.02,(si-.06)/2+.001),i.add(m)}for(const _ of[-.66,-.54,-.06,.06,.54,.66]){const m=new Te(new te(.006,.006,.1,12),g);m.position.set(_,-.2,(si-.06)/2+.015),i.add(m)}return null}function Iu(i,e,t,n=1,s=!0){const r=t-.06,a=si-.06,l=.018,o=-.035,c=-ji,h=o-c,u=a/2,f=-a/2,p=new de({map:e,roughness:.7}),g=new de({color:2898509,roughness:.7}),_=Lu(),m=[],d=(B,q,W,ie,ae,X,Y)=>{const he=new Te(new Rt(B,q,W),Y);return he.position.set(ie,ae,X),he.castShadow=!0,i.add(he),m.push(he),he},S=c+.06;d(l,h,a,-r/2+l/2,c+h/2,0,p),d(l,h,a,r/2-l/2,c+h/2,0,p),d(r,h,l,0,c+h/2,f+l/2,_),d(l,h,a-l,0,c+h/2,l/2,_),d(r,l,a,0,S-l/2,0,g),d(r,.06,l,0,c+.03,u-.03,p),d(r,.04,l,0,o-.02,u-l/2,p);const M=-.46,y=r/2-l*1.5;if(d(y,l,a-l,-r/4,M-l/2,l/2,g),d(y,l,a-l,r/4,M-l/2,l/2,g),s)for(const B of[-r/4,r/4])Il(i,B,o-.05,u-.12,y-.1,n,10),Il(i,B,M-l-.006,u-.12,y-.1,n,10);const w=o-.04,E=S-l,C=w-E-.002,v=r>2.2,T=(v?r/4:r/2)-.0025,D=new de({map:e,roughness:.65}),U=ic.steel(),V=[];(v?[[-r/2,1,1.95],[0,-1,1.5],[0,1,1.5],[r/2,-1,1.95]]:[[-r/2,1,1.95],[r/2,-1,1.95]]).forEach(([B,q,W],ie)=>{const ae=new Zt;ae.position.set(B+q*.001,(w+E)/2,u+l/2);const X=new Te(new Rt(T,C,l),D);X.position.x=q*T/2,X.castShadow=!0,ae.add(X);const Y=new Te(new te(.006,.006,.1,12),U);Y.position.set(q*(T-.045),-.2-ae.position.y,l/2+.015),ae.add(Y);for(const he of[Y.position.y-.05,Y.position.y+.05]){const Ie=new Te(new te(.004,.004,.016,8),U);Ie.rotation.x=Math.PI/2,Ie.position.set(Y.position.x,he,l/2+.008),ae.add(Ie)}ae.userData.cupboardDoor=!0,ae.userData.bay=v?ie<2?0:1:ie,ae.userData.open=!1,ae.userData.openAngle=-q*W,i.add(ae),V.push(ae)});const ee=(B,q)=>({minX:B,maxX:q,levels:[S,M],frontZ:u-.02,backZ:f+l});return{doors:V,blockers:m,bays:[ee(-r/2+l,-l/2),ee(l/2,r/2-l)]}}function gv(i){i.add(new xu(14675967,6126138,.8));const e=new Fa(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function _v(i){const e=Cr(512,512,(a,l,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,l,o);for(let c=0;c<6e3;c++){const h=60+Math.random()*70;a.fillStyle=`rgba(${h*.6},${h+40},${h*.4},0.35)`,a.fillRect(Math.random()*l,Math.random()*o,2,5)}});e.wrapS=e.wrapT=li,e.repeat.set(80,80);const t=new Te(new Dn(300,300),new de({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new Te(new Dn(80,.1),new de({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new de({color:5980976,roughness:.9}),r=new de({color:4156202,roughness:.9});for(let a=0;a<14;a++){const l=-20+a*6+a%3*1.5,o=-30-a%4*4,c=new Te(new te(.25,.35,3,8),s);c.position.set(l,1.5,o);const h=new Te(new Wt(2.2+a%3*.5,12,10),r);h.position.set(l,4.2+a%2,o),i.add(c,h)}}function Ga(){return Cr(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function Cr(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new wr(n);return s.colorSpace=hn,s.anisotropy=16,s}function vv(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const l=s.getContext("2d");l.fillStyle="rgba(255,255,255,0.92)",l.beginPath(),l.roundRect(0,0,s.width,s.height,18),l.fill(),l.strokeStyle="rgba(15,23,42,0.35)",l.lineWidth=3,l.stroke(),l.fillStyle="#0f172a",l.font="800 64px Arial, sans-serif",l.textAlign="center",l.textBaseline="middle",l.fillText(i,s.width/2,s.height/2+2);const o=new wr(s);o.colorSpace=hn;const c=new Rn(new zs({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));c.userData.screenPx=e,c.userData.aspect=s.width/s.height,c.userData.pairWith=t??null,c.userData.role="scale_label",c.renderOrder=6,c.raycast=()=>{};const h=e/700*.73;return c.scale.set(h*c.userData.aspect,h,1),c}const Io=new N,No=new N;function xv(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const l=s.userData.pairWith;if(!l)return;s.getWorldPosition(Io).project(e),l.getWorldPosition(No).project(e);const o=Math.abs(Io.y-No.y)*t/2+Math.abs(Io.x-No.x)*t/2;s.visible=o>r*1.25})}const ic={steel:()=>new de({color:13094097,metalness:1,roughness:.28}),chrome:()=>new de({color:15133164,metalness:1,roughness:.12}),brass:()=>new de({color:13936715,metalness:1,roughness:.22}),castIron:()=>new de({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new de({color:1776928,roughness:.5}),glass:()=>new de({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},mt=(i=15857397)=>new Xs({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:Jt,depthWrite:!1}),An=i=>new de({color:i,roughness:.45,metalness:.15}),xt=(i=13094097)=>new de({color:i,roughness:.28,metalness:1}),At=()=>new de({color:15133164,roughness:.12,metalness:1}),ni=()=>new de({color:13936715,roughness:.22,metalness:1}),Bt=i=>new de({color:i,roughness:.5,metalness:.05}),Qt=i=>new de({color:i,roughness:.35,metalness:.1}),ti=()=>new de({color:10119233,roughness:.7}),Ke=(i,e,t,n=Math.min(i,e,t)*.12)=>new Pr(i,e,t,3,n);function L(i,e,t=0,n=0,s=0){const r=new Te(i,e);return r.position.set(t,n,s),r}function en(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new wr(n);return s.colorSpace=hn,s.anisotropy=16,s}function Ui(i,e,t,n){const s=new Zt;return s.add(L(new te(.018,.022,.05,16),ni(),0,.025,0)),s.add(L(new te(.026,.026,.03,16),Bt(n),0,.06,0)),s.position.set(i,e,t),s}function Un(i,e,t,n=.55){const s=e*.85,r=new Te(new te(i*.9,i*.9,s,40),new de({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}const yv={corrosive:{text:"CORROSIVE",color:"#dc2626"},irritant:{text:"IRRITANT",color:"#ea580c"},flammable:{text:"FLAMMABLE",color:"#dc2626"},toxic:{text:"TOXIC",color:"#111827"},oxidising:{text:"OXIDISING",color:"#ca8a04"}};function Dh(i,e,t,n){const s=yv[n.hazard],r=en(512,256,(l,o,c)=>{l.fillStyle="#fffdf6",l.fillRect(0,0,o,c),l.fillStyle=(s==null?void 0:s.color)||"#1e3a8a",l.fillRect(0,0,o,34),l.fillStyle="#ffffff",l.font="bold 24px sans-serif",l.textAlign="center",l.textBaseline="middle",l.fillText(s?`⚠ ${s.text}`:"LABORATORY REAGENT",o/2,18),l.fillStyle="#111827";const h=String(n.display_name||"Reagent").split(" "),u=[];let f="";l.font="bold 40px sans-serif",h.forEach(g=>{const _=f?`${f} ${g}`:g;l.measureText(_).width>o-40&&f?(u.push(f),f=g):f=_}),u.push(f);const p=u.slice(0,2);p.forEach((g,_)=>l.fillText(g,o/2,(n.formula?86:110)+_*46-(p.length-1)*10)),n.formula&&(l.font="bold 54px serif",l.fillStyle="#1e3a8a",l.fillText(String(n.formula),o/2,212)),l.strokeStyle="#cbd5e1",l.lineWidth=4,l.strokeRect(2,2,o-4,c-4)}),a=L(new te(i,i,e,32,1,!0,-1.05,2.1),new de({map:r,roughness:.85,side:Jt}),0,t);return a.userData.role="reagent_label",a}function ga(i,e,t,n){const s=en(64,512,(a,l,o)=>{a.clearRect(0,0,l,o),a.fillStyle="#ffffff";const c=n*5;for(let h=1;h<=c;h++){const u=o-h/(c+1)*o;a.fillRect(0,u,h%5===0?44:24,h%5===0?4:2)}}),r=new Te(new te(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new ss({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function _a(i){const e=en(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new Rn(new zs({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function Lh(i,e){return en(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const l=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let c=0;c<=50;c++){const h=l+c/50*o,u=c%10===0;t.lineWidth=u?4:1.5;const f=u?a-48:c%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(h)*f,r+Math.sin(h)*f),t.lineTo(s+Math.cos(h)*(a-16),r+Math.sin(h)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let c=0;c<=10;c++){const h=l+c/10*o;t.font=`900 ${c%5===0?50:36}px Arial, sans-serif`,t.fillText(String(c),s+Math.cos(h)*(a-82),r+Math.sin(h)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function Nu(i){return en(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function Oa(i,e="#22c55e"){return en(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function Ih(){return en(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const l=n+a/r*s,o=a%5===0,c=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(l,10),i.lineTo(l,10+c),i.stroke(),o&&i.fillText(String(a),l,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function Mv(){return en(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,l=r%30===0,o=l?s-26:s-14;i.lineWidth=l?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),l&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const Uo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function Sv(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[Uo[n],Uo[s],Uo[r],"#d4af37"]}class Fo extends Zn{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new N){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function Oo(i,e,t,n={}){const s=new Zt;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const h=[new j(0,.004),new j(.301,.004),new j(.315,.03),new j(.33949999999999997,.58),new j(.357,.6),new j(.364,.612)];r(new Te(new vi(h,48),mt()));const u=L(new Xn(.045,.07,3),mt(),.35*1,.6-.015,0);u.rotation.z=-Math.PI/2,r(u,ga(.35*.95,.06,.6*.72,4),Un(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const h=L(new te(.12,.12,.55,32,1,!0),mt(),0,.375),u=L(new Wt(.12,32,16,0,Math.PI*2,0,Math.PI/2),mt(),0,.1);u.rotation.x=Math.PI;const f=L(new qt(.12*1.02,.012,10,32),mt(),0,.55+.1);f.rotation.x=Math.PI/2;const p=L(Ke(.34,.08,.34,.02),ti(),0,.04);r(h,u,f,p,Un(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const h=L(new te(.06,.06,1.1,32,1,!0),mt(),0,.7000000000000001),u=L(new te(.06*1.25,.06*1.25,.1,24),mt(15660799),0,.1),f=L(Ke(.16,.03,.035,.012),Bt(1920728),.09,.1),p=L(new te(.03,.01,.1,16,1,!0),mt(),0,.02),g=L(new te(.2,.22,.04,32),Qt(3099491),0,.02);r(h,u,f,p,g,ga(.06,.2,1.1*.85,10),Un(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=L(new te(.018,.008,.3,16),mt(),0,.2),c=L(new Wt(.055,24,16),mt(),0,.42);c.scale.y=1.8;const h=L(new te(.018,.018,.3,16),mt(),0,.68),u=L(new qt(.02,.003,6,20),new ss({color:1120295}),0,.74);u.rotation.x=Math.PI/2;const f=L(new Wt(.075,24,16),Bt(12131356),0,.9);f.scale.y=1.25;const p=L(Ke(.22,.07,.18,.02),ti(),0,.035);r(o,c,h,u,f,p);break}case"measuring_cylinder":{const h=L(new te(.18,.17099999999999999,.8,40,1,!0),mt(),0,.44),u=L(new te(.18*1.6,.18*1.7,.05,6),mt(15266293),0,.025),f=L(new Xn(.035,.06,3),mt(),.18,.8+.03,0);f.rotation.z=-Math.PI/2,r(h,u,f,ga(.18*.97,.12,.8*.8,5),Un(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new de({color:1920728,roughness:.45,metalness:.2}),c=[new j(0,.005),new j(.27,.005),new j(.272,.018),new j(.2,.05),new j(.11,.1),new j(.075,.13),new j(0,.13)],h=new Te(new vi(c,56),o),u=L(new te(.068,.07,.11,36),o,0,.175),f=en(128,16,(v,T,D)=>{v.fillStyle="#d4d4d8",v.fillRect(0,0,T,D),v.fillStyle="#71717a";for(let U=0;U<T;U+=4)v.fillRect(U,0,1.5,D)});f.wrapS=li,f.repeat.set(3,1);const p=L(new te(.052,.052,.075,40),new de({map:f,roughness:.3,metalness:1}),0,.268),g=L(new te(.066,.066,.03,6),At(),0,.32),_=L(new te(.06,.06,.012,40),At(),0,.341),m=L(new te(.048,.048,.28,36,1,!0),At(),0,.485),d=L(new te(.042,.042,.004,28),new de({color:4144966,roughness:.8}),0,.6),S=L(new qt(.046,.004,8,32),At(),0,.625);S.rotation.x=Math.PI/2;const M=new Zt,y=L(new te(.032,.032,.2,24),At(),0,.1);M.add(y);for(let v=0;v<3;v++)M.add(L(new te(.03,.036,.025,24),At(),0,.215+v*.03));M.add(L(new te(.02,.02,.004,20),new de({color:2565930}),0,.29)),M.rotation.z=Math.PI/2+.12,M.position.set(-.05,.16,0),r(h,u,p,g,_,m,d,S,M);const w=n.flame==="on",E=L(new Xn(.09,.3,24),new de({color:16751933,emissive:16738816,emissiveIntensity:w?1:0,transparent:!0,opacity:w?.75:0,depthWrite:!1}),0,.77);E.userData.role="flame";const C=L(new Xn(.045,.16,16),new de({color:6333946,emissive:2450411,emissiveIntensity:w?1.3:0,transparent:!0,opacity:w?.85:0,depthWrite:!1}),0,.7);C.userData.role="flame",r(E,C);break}case"thermometer":{const o=en(256,1690,(d,S,M)=>{d.fillStyle="#fbfbf8",d.fillRect(0,0,S,M),d.fillStyle="#0f172a",d.textAlign="left",d.textBaseline="middle";const y=M-250,w=M-400;for(let E=0;E<=100;E+=2){const C=y-E/100*w,v=E%10===0;d.fillRect(S-(v?90:50),C-(v?3:1.5),v?90:50,v?6:3),v&&(d.font=`900 ${E%50===0?62:52}px Arial, sans-serif`,d.fillText(String(E),10,C))}d.font="700 44px Arial, sans-serif",d.fillText("°C",14,y-w-70)}),c=L(Ke(.1,.66,.02,.008),new de({map:o,roughness:.5}),0,.45,-.025),h=L(new te(.022,.022,.62,24),mt(16777215),0,.45),u=L(new te(.008,.008,.45,12),new de({color:14427686,roughness:.2}),0,.32),f=L(new Wt(.05,24,24),new de({color:14427686,roughness:.2}),0,.1),p=L(new Wt(.065,24,24),mt(16777215),0,.1),g=L(Ke(.26,.04,.2,.015),Qt(3099491),0,.02);r(c,h,u,f,p,g);const _=d=>.78-(1440-d*12.9)/1690*.66;let m;for(const d of[0,25,50,75,100]){const S=vv(`${d}°`,12,d%50===0?void 0:m);S.center.set(0,.5),S.position.set(.065,_(d),-.02),r(S),d%50===0&&(m=S)}break}case"battery":{const o=en(512,256,(g,_,m)=>{g.fillStyle="#111827",g.fillRect(0,0,_,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,_,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,_/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",_/2,m*.9)}),c=Bt(2042167),h=L(Ke(.6,.3,.3,.035),[c,c,c,c,new de({map:o,roughness:.5}),c],0,.15),u=Ui(.2,.3,0,14427686),f=Ui(-.2,.3,0,1118481),p=new Rn(new zs({map:Nu(n.voltage||6),depthTest:!1,transparent:!0}));p.scale.set(.34,.136,1),p.position.set(0,.58,0),p.renderOrder=9,p.userData.role="voltage",r(h,u,f,p);break}case"ruler":{const h=new de({color:15381256,roughness:.6}),u=new de({map:Ih(),roughness:.55});r(L(new Rt(1.5,.015,.16),[h,h,u,h,h,h],0,.0075));break}case"bulb":{const o=n.state==="on",c=L(new Wt(.18,32,32),new Xs({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);c.userData.role="led";const h=L(new qt(.05,.006,8,24,Math.PI*1.7),new de({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);h.rotation.x=Math.PI/2,h.userData.role="led";const u=L(new te(.095,.11,.16,24),ni(),0,.12),f=new Zt;for(let g=0;g<5;g++){const _=L(new qt(.1,.006,6,24),ni(),0,.06+g*.028);_.rotation.x=Math.PI/2,f.add(_)}const p=L(Ke(.4,.04,.26,.015),ti(),0,.02);r(c,h,u,f,p,Ui(-.15,.04,.07,14427686),Ui(.15,.04,.07,1118481));break}case"switch":{const o=L(Ke(.4,.06,.2,.012),ti(),0,.03),c=L(new te(.02,.02,.1,16),ni(),-.12,.11),h=L(Ke(.05,.06,.05,.008),ni(),.12,.09),u=L(new te(.012,.012,.24,16),At()),f=n.state==="closed";u.position.set(f?0:-.06,.16,0),u.rotation.z=f?Math.PI/2-.35:Math.PI/2-.9,u.userData.role="lever",u.add(L(new Wt(.028,16,12),Bt(1118481),0,-.13,0)),r(o,c,h,u);break}case"resistor":{const o=en(256,64,(g,_,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,_,m),Sv(n.resistance_ohm).forEach((d,S)=>{g.fillStyle=d,g.fillRect(60+S*34+(S===3?22:0),0,16,m)})}),c=L(new te(.07,.07,.32,32),new de({map:o,roughness:.45}),0,.2);c.rotation.z=Math.PI/2;const h=L(new te(.01,.01,.52,10),xt(13948120),0,.2);h.rotation.z=Math.PI/2;const u=L(Ke(.6,.04,.2,.012),Bt(15195332),0,.02),f=L(new te(.012,.012,.16,10),xt(13948120),-.26,.12),p=f.clone();p.position.x=.26,r(c,h,u,f,p);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",c=L(Ke(.42,.4,.18,.03),Qt(o?1981066:8330525),0,.2),h=L(new qt(.155,.015,12,48),At(),0,.2,.091),u=L(new Ki(.15,48),new de({map:Lh(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),f=L(new Xn(.012,.13,8),An(14427686),.02,.2,.1);f.rotation.z=-Math.PI/2+.6,f.userData.role="needle";const p=L(new Wt(.014,12,12),xt(2565930),0,.2,.1);r(c,h,u,f,p,Ui(-.12,.4,0,14427686),Ui(.12,.4,0,1118481));break}case"microscope":{const o=Qt(15659250),c=Qt(2040616);r(L(Ke(.36,.06,.47,.02),o,0,.03,-.05)),r(L(Ke(.1,.28,.1,.02),o,0,.19,-.22));const h=new lu([new N(0,.27,-.23),new N(0,.55,-.23),new N(0,.74,-.14),new N(0,.8,-.03)]);r(new Te(new ts(h,24,.044,12,!1),o));const u=L(new te(.035,.035,.01,24),new de({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);u.userData.role="led",r(L(new te(.045,.05,.05,24),c,0,.085),u),r(L(Ke(.3,.022,.28,.006),c,0,.32));for(const f of[-.08,.08])r(L(new Rt(.016,.004,.11),At(),f,.333,.03));r(L(new te(.036,.036,.25,24),c,0,.7)),r(L(new te(.025,.03,.11,24),c,0,.88)),r(L(new te(.056,.06,.033,32),At(),0,.565)),[14427686,15381256,2450411].forEach((f,p)=>{const g=new Zt;g.position.y=.55,g.rotation.y=2*Math.PI*p/3;const _=new Zt;_.position.z=.03,_.rotation.x=.35,_.add(L(new te(.015,.012,.07+p*.015,16),At(),0,-.04-p*.008)),_.add(L(new te(.0158,.0158,.008,16),Bt(f),0,-.03)),g.add(_),r(g)});for(const f of[-1,1]){const p=L(new te(.05,.05,.028,24),c,f*.08,.25,-.22);p.rotation.z=Math.PI/2;const g=L(new te(.025,.025,.028,20),c,f*.11,.25,-.22);g.rotation.z=Math.PI/2,r(p,g)}break}case"lens":{const o=L(new Wt(.22,40,40),mt(15988991),0,.42);o.scale.set(1,1,.22);const c=L(new qt(.22,.02,16,48),xt(10265519),0,.42),h=L(new te(.015,.015,.2,12),xt(),0,.1),u=L(new te(.12,.14,.03,32),Qt(3099491),0,.015);r(o,c,h,u);break}case"mirror":{const o=L(Ke(.4,.5,.02,.006),[xt(4674921),xt(4674921),xt(4674921),xt(4674921),new de({color:16777215,metalness:1,roughness:.03}),xt(4674921)],0,.3,0),c=L(Ke(.36,.06,.12,.012),ti(),0,.03,-.02);r(o,c);break}case"biological_model":{const o=L(new Rt(.5,.012,.18),mt(14742270),0,.006),c=L(new Rt(.14,.003,.14),mt(15857397),0,.014),h=L(new Ki(.045,32),new de({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);h.rotation.x=-Math.PI/2;const u=L(new Rt(.12,.014,.17),Bt(16317180),-.18,.007);r(o,c,h,u);break}case"wire":{const o=new Te(new ts(new Fo(.12,.15,5),240,.012,8,!1),new de({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const c=L(new te(.135,.135,.14,24),Bt(3621201),0,.08);r(c,o);break}case"water_container":{const h=L(new te(.255,.3,.75,48,1,!0),mt(),0,.375),u=L(new Ki(.3,48),mt(),0,.003);u.rotation.x=-Math.PI/2;const f=L(new qt(.14,.02,12,32,Math.PI*1.3),mt(),.3*.85,.75*.6);f.rotation.z=Math.PI/2,r(h,u,f,Un(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,c=Math.max(.15,o*.05),h=L(new te(.025,.025,c,24),xt(10265519),0,.025);h.rotation.z=Math.PI/2;const u=L(new Wt(.025,16,16),xt(7434618),-c/2,.025),f=u.clone();f.position.x=c/2,r(h,u,f);break}case"balance":{const o=L(Ke(.55,.1,.42,.03),Qt(15067115),0,.05),c=L(new te(.16,.16,.015,40),At(),0,.11,.02),h=L(new te(.03,.03,.02,16),xt(),0,.1,.02),u=L(Ke(.3,.07,.05,.012),Bt(2042167),0,.07,.2),f=new Rn(new zs({map:Oa("0.0 g"),depthTest:!1,transparent:!0}));f.scale.set(.3,.135,1),f.position.set(0,.24,.2),f.renderOrder=9,f.userData.role="balance_display",r(o,c,h,u,f);break}case"stopwatch":{const o=L(new te(.13,.13,.045,48),Qt(2042167),0,.16);o.rotation.x=Math.PI/2;const c=L(new qt(.13,.01,10,48),At(),0,.16),h=L(new te(.022,.022,.04,16),At(),0,.305),u=L(new qt(.025,.006,8,20),At(),0,.34),f=L(Ke(.18,.03,.12,.01),Bt(3621201),0,.015),p=new Rn(new zs({map:Oa("00:00.0"),depthTest:!1,transparent:!0}));p.scale.set(.2,.09,1),p.position.set(0,.16,.03),p.renderOrder=9,p.userData.role="stopwatch_display",r(o,c,h,u,f,p);break}case"spring":{const o=n.natural_length_cm??15,c=n.max_safe_extension_cm??12,h=o*.05,u=(o+c*1.6)*.05,f=new Te(new ts(new Fo(u,.05,22),440,.007,6,!1),new de({color:13094097,roughness:.25,metalness:1}));f.userData.role="spring_body",f.userData.naturalLengthUnits=h,f.userData.maxLengthUnits=u,f.scale.y=h/u,f.position.y=.85-u*f.scale.y/2;const p=L(new qt(.03,.008,8,20),xt(7434618),0,.85),g=L(new te(.05,.05,.015,24),xt(5395035));g.userData.role="spring_hanger",g.position.y=.85-u*f.scale.y,r(f,p,g);break}case"retort_stand":{const o=Qt(3099491);r(L(Ke(.36,.035,.24,.012),o,0,.0175)),r(L(new te(.016,.016,.95,20),xt(),-.13,.5)),r(L(Ke(.07,.07,.07,.01),o,-.13,.9));const c=L(new te(.01,.01,.07,10),xt(),-.13,.9,.06);c.rotation.x=Math.PI/2;const h=L(new te(.012,.012,.3,16),xt(),.03,.9);h.rotation.z=Math.PI/2,r(c,h,L(Ke(.04,.05,.05,.008),ni(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,c=.05+Math.min(.05,o/4e3),h=.04+Math.min(.06,o/3e3),u=en(256,256,(p,g)=>{p.fillStyle="#4a525c",p.fillRect(0,0,g,g),p.fillStyle="#1f2328",p.beginPath(),p.arc(g/2,g/2,22,0,Math.PI*2),p.fill(),p.fillRect(g/2-9,g/2,18,g/2),p.fillStyle="#f1f5f9",p.font="bold 58px Arial",p.textAlign="center",p.textBaseline="middle",p.fillText(`${o}g`,g/2,g/2-62)}),f=Qt(4870748);f.metalness=.5,r(L(new te(c,c,h,36),[f,new de({map:u,metalness:.4,roughness:.5}),f],0,h/2));break}case"ray_box":{const o=n.state==="on",c=L(Ke(.35,.22,.28,.03),Qt(2042167),0,.11),h=L(new Rt(.2,.16,.012),Bt(988970),0,.11,.145),u=L(new Rt(.02,.12,.02),new de({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);u.userData.role="led";const f=L(new te(.012,.012,.3,10),Bt(1120295),0,.03,-.29);f.rotation.x=Math.PI/2,r(c,h,u,f);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(L(Ke(o,.1,.55,.01),mt(14676223),0,.05));break}case"projectile_launcher":{const o=new de({color:2962235,metalness:.6,roughness:.4});r(L(Ke(.5,.05,.36,.015),o,0,.025));for(const p of[-.09,.09])r(L(Ke(.1,.22,.02,.006),o,0,.14,p));const c=new Zt;c.position.y=.22,c.rotation.z=Math.PI/4;const h=L(new te(.05,.055,.45,28),new de({color:1920728,metalness:.5,roughness:.35}),.17,0);h.rotation.z=-Math.PI/2;const u=L(new qt(.053,.011,12,28),At(),.39,0);u.rotation.y=Math.PI/2;const f=L(new te(.018,.018,.22,16),xt());f.rotation.x=Math.PI/2,c.add(h,u,f),r(c);break}case"projectile":{r(L(new qt(.05,.012,10,28),Bt(3621201),0,.012)),r(L(new Wt(.07,32,20),new de({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=L(new te(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new de({map:Mv(),transparent:!0,opacity:.92,roughness:.3,side:Jt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",c=.3,h=.62,u=.085,f=[new j(0,.004),new j(c*.96,.004),new j(c,.03),new j(u+.01,h*.7),new j(u,h*.76),new j(u,h-.02),new j(u+.012,h),new j(u+.012,h+.012)],p=o?new Xs({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:Jt,depthWrite:!1}):mt();r(new Te(new vi(f,56),p));const g=en(512,512,(M,y,w)=>{M.clearRect(0,0,y,w),M.fillStyle="#ffffff",M.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([C,v])=>{M.fillRect(y*.6,w*C,y*.13,5),M.font="bold 34px Arial",M.fillText(v,y*.76,w*C+12)}),M.fillRect(y*.63,w*.64,y*.07,4),M.font="bold 40px Arial",M.fillText("250 ml",y*.12,w*.52),M.fillRect(y*.14,w*.58,y*.2,w*.09),M.save(),M.translate(y*.56,w*.86),M.rotate(-Math.PI/2),M.font="bold 22px Arial",M.fillText("APPROX. VOL",0,0),M.restore()}),_=.03,m=h*.7,d=new Te(new vi([new j(c*1.006,_),new j((u+.01)*1.006,m)],24,-.75,1.5),new ss({map:g,transparent:!0,depthWrite:!1,side:Jt}));r(d);const S=new Te(new te(.11,c*.94,h*.66,48),new de({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));S.userData.role="liquid",S.userData.maxFillHeight=h*.66,S.scale.y=.001,r(S);break}case"round_bottom_flask":{const o=L(new Wt(.28,40,28),mt(),0,.36),c=L(new te(.07,.07,.34,28,1,!0),mt(),0,.78),h=L(new qt(.2,.025,12,40),Bt(3621201),0,.05);h.rotation.x=Math.PI/2;const u=new Zt;u.position.y=.14,u.add(Un(.19,.5,n.color||"#e0f2fe",.001)),r(o,c,h,u);break}case"evaporating_dish":{const o=[new j(0,.01),new j(.12,.012),new j(.26,.09),new j(.3,.13)];r(new Te(new vi(o,48),new de({color:16317180,roughness:.25,side:Jt})));const c=new Zt;c.position.y=.012,c.add(Un(.2,.13,n.color||"#bae6fd",.001)),r(c);break}case"tripod_stand":{const o=L(new qt(.3,.02,12,48),xt(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let c=0;c<3;c++){const h=c/3*Math.PI*2,u=L(new te(.018,.018,.82,12),xt(5395035),Math.cos(h)*.34,.4,Math.sin(h)*.34);u.rotation.z=Math.cos(h)*-.08,u.rotation.x=Math.sin(h)*.08,r(u)}break}case"wire_gauze":{const o=en(256,256,(c,h,u)=>{c.fillStyle="#9ca3af",c.fillRect(0,0,h,u),c.strokeStyle="#4b5563",c.lineWidth=2;for(let f=0;f<h;f+=10)c.beginPath(),c.moveTo(f,0),c.lineTo(f,u),c.moveTo(0,f),c.lineTo(h,f),c.stroke();c.fillStyle="#f5f5f4",c.beginPath(),c.arc(h/2,u/2,h*.28,0,Math.PI*2),c.fill()});r(L(new Rt(.62,.008,.62),new de({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=L(new te(.26,.03,.32,40,1,!0),mt(),0,.52),c=L(new te(.025,.02,.32,20,1,!0),mt(),0,.2),h=L(new Xn(.22,.27,32,1,!0),new de({color:16777215,roughness:.9,side:Jt}),0,.53);h.rotation.x=Math.PI,r(o,c,h);break}case"test_tube_rack":{const o=L(Ke(.9,.04,.24,.01),ti(),0,.3),c=L(Ke(.9,.04,.24,.01),ti(),0,.02),h=L(Ke(.04,.3,.24,.01),ti(),-.43,.16),u=h.clone();u.position.x=.43,r(o,c,h,u);const f=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let p=0;p<4;p++){const g=-.3+p*.2;r(L(new te(.055,.055,.42,20,1,!0),mt(),g,.25)),r(L(new te(.05,.05,.12,20),new de({color:f[p],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=L(Ke(.32,.008,.05,.003),At(),.16,.006),c=L(new Wt(.04,20,10,0,Math.PI*2,0,Math.PI/2),At(),-.18,.04);c.rotation.x=Math.PI;const h=L(new te(.008,.008,.18,12),At(),-.06,.008);h.rotation.z=Math.PI/2,r(o,c,h);break}case"wash_bottle":{const o=L(new te(.17,.18,.5,36),new de({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),c=L(new te(.07,.09,.08,24),Bt(2450411),0,.54),h=L(new te(.012,.012,.3,10),Bt(2450411),.08,.66);h.rotation.z=-.9,r(o,c,h,Un(.16,.5,n.color||"#e0f2fe",.8));break}case"reagent_bottle":{const h=[new j(0,.003),new j(.188,.003),new j(.2,.03),new j(.2,.56),new j(.16000000000000003,.64),new j(.07,.6900000000000001),new j(.065,.75),new j(.072,.76)];r(new Te(new vi(h,40),mt())),r(Un(.2*.97,.56,n.color||"#eef6f8",.78));const u=L(new te(.06,.055,.07,24),mt(15266031),0,.56+.22),f=L(new te(.09,.09,.035,28),mt(15266031),0,.56+.27);r(u,f,Dh(.2+.003,.26,.56*.45,n));break}case"reagent_jar":{r(L(new te(.21,.21,.46,40,1,!0),mt(),0,.46/2+.005)),r(L(new te(.21,.21,.01,40),mt(),0,.005));const h=.46*.62,u=L(new te(.21*.95,.21*.95,h,40),new de({color:n.color||"#f5f5f5",roughness:1,metalness:n.chemical_id==="zn"?.6:0}),0,h/2+.01),f=L(new te(.21*1.04,.21*1.04,.07,40),Bt(2042167),0,.46+.035);r(u,f,Dh(.21+.003,.22,.46*.5,n));break}case"dropper":{const o=L(new te(.02,.008,.36,16),mt(),0,.24),c=L(new Wt(.045,20,14),Bt(1120295),0,.46);c.scale.y=1.6;const h=L(new te(.1,.1,.22,28),new de({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,c,h);break}case"crucible":{const o=[new j(0,.005),new j(.08,.005),new j(.13,.2),new j(.14,.21)],c=new de({color:16119284,roughness:.3,side:Jt});r(new Te(new vi(o,40),c));const h=L(new te(.15,.15,.015,40),c,.32,.008),u=L(new Wt(.025,16,12),c,.32,.025);r(h,u);break}case"bar_magnet":{r(L(Ke(.3,.08,.1,.01),Qt(14427686),-.15,.04),L(Ke(.3,.08,.1,.01),Qt(1920728),.15,.04));const o=_a("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const c=_a("S");c.scale.set(.2,.044,1),c.position.set(.22,.16,0),r(o,c);break}case"plotting_compass":{r(L(new te(.12,.12,.04,40),ni(),0,.02)),r(L(new te(.105,.105,.002,40),new de({color:16777215}),0,.041));const o=new Zt,c=L(new Xn(.018,.09,4),An(14427686),0,0,-.045);c.rotation.x=-Math.PI/2;const h=L(new Xn(.018,.09,4),An(2042167),0,0,.045);h.rotation.x=Math.PI/2,o.add(c,h),o.position.y=.05,o.userData.role="needle",r(o,L(new te(.11,.11,.012,40),mt(),0,.06));break}case"prism":{const o=new mr;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const c=new Ns(o,{depth:.22,bevelEnabled:!1});c.translate(0,0,-.11),r(new Te(c,mt(14742270)));break}case"rheostat":{const o=new de({color:6054233,roughness:.75,metalness:.45}),c=new de({color:14925716,roughness:.6}),h=new de({color:1118481,roughness:.35}),u=.2,f=.79,p=en(64,64,(M,y,w)=>{M.fillStyle="#1a1a1a",M.fillRect(0,0,y,w);for(let E=0;E<w;E+=4)M.fillStyle="#3a3a3a",M.fillRect(0,E,y,1),M.fillStyle="#050505",M.fillRect(0,E+2,y,1)});p.wrapS=p.wrapT=li,p.repeat.set(1,18);const g=L(new te(.125,.125,1.24,48),new de({map:p,roughness:.4,metalness:.6}),0,u);g.rotation.z=Math.PI/2,r(g);for(const M of[-1,1]){const y=L(new te(.12,.12,.1,40),c,M*.67,u),w=L(new te(.129,.129,.035,40),At(),M*.635,u),E=L(new te(.1,.1,.05,32),o,M*.745,u);for(const D of[y,w,E])D.rotation.z=Math.PI/2;r(y,w,E);const C=new mr;C.moveTo(-.17,0),C.lineTo(.17,0),C.lineTo(.09,.42),C.lineTo(-.09,.42),C.closePath();const v=new Ns(C,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});v.translate(0,0,-.015);const T=new Te(v,o);T.rotation.y=Math.PI/2,T.position.x=M*f,r(T);for(const D of[-.2,.2]){const U=L(Ke(.1,.025,.09,.008),o,M*(f-M*.04),.0125,D),V=L(new te(.018,.018,.027,16),new de({color:2042167}),M*(f-M*.04),.0125,D);r(U,V)}r(L(Ke(.05,.03,.06,.006),At(),M*.6,u-.15,.06)),r(L(new te(.014,.014,.02,12),xt(10265519),M*.6,u-.125,.06))}const _=(M,y,w,E)=>{const C=new Zt,v=L(new te(.012,.012,.04,12),ni(),E*.02,0,0);v.rotation.z=Math.PI/2;const T=L(new te(.03,.03,.06,18),h,E*.065,0,0);T.rotation.z=Math.PI/2;for(let D=0;D<9;D++){const U=L(new Rt(.06,.006,.006),h,E*.065,Math.cos(D*.7)*.03,Math.sin(D*.7)*.03);C.add(U)}return C.add(v,T),C.position.set(M,y,w),C};r(_(f+.02,.32,.03,1),_(f+.02,.1,.03,1),_(-f-.02,.2,.06,-1));const m=L(new te(.012,.016,.05,12),ni(),f+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(L(new Rt(f*2,.035,.035),At(),0,.395,-.02));const d=new Zt,S=en(128,128,(M,y,w)=>{M.fillStyle="#111111",M.fillRect(0,0,y,w),M.fillStyle="#e5e7eb",M.font="bold 26px Arial",M.textAlign="center",M.save(),M.translate(30,w/2),M.rotate(-Math.PI/2),M.fillText("11",0,-4),M.fillText("5",0,22),M.restore()});d.add(L(Ke(.13,.08,.13,.015),[h,h,new de({map:S,roughness:.35}),h,h,h],0,.41,-.01)),d.add(L(Ke(.12,.09,.05,.012),h,0,.34,.05));for(const M of[-.035,.025])d.add(L(new te(.017,.017,.006,20),At(),.02,.453,M));d.position.x=.05,d.userData.role="slider",r(d);break}case"dry_cell":{const o=en(512,256,(_,m,d)=>{_.fillStyle="#d61f26",_.fillRect(0,0,m,d),_.fillStyle="#f5c518",_.fillRect(0,0,m,10),_.fillRect(0,d-10,m,10);const S=m*.25;_.textAlign="center",_.font="italic bold 40px Georgia",_.fillStyle="#fde68a",_.fillText("Power Cell",S,52),_.fillStyle="#f59e0b",_.beginPath(),_.arc(S,118,40,0,Math.PI*2),_.fill(),_.fillStyle="#7c2d12",_.font="bold 44px Arial",_.fillText("+",S,134),_.fillStyle="#fde68a",_.font="bold 22px Arial",_.fillText("SUPER QUALITY",S,190),_.fillStyle="#ffffff",_.font="bold 24px Arial",_.fillText("BATTERY",S,218),_.fillText("1.5V",S,242),_.fillStyle="#fde68a",_.font="bold 30px Arial",_.fillText("1.5V  DRY CELL",m*.75,d/2+10)});o.wrapS=li,o.offset.x=.25;const c=.09,h=.32,u=L(new te(c,c,h,48,1,!0),new de({map:o,roughness:.35}),0,h/2+.006),f=L(new te(c*.98,c*.98,.012,48),At(),0,h+.006),p=L(new te(.03,.032,.025,24),At(),0,h+.024),g=L(new te(c*.98,c*.98,.012,48),xt(10265519),0,.006);r(u,f,p,g);break}case"accumulator":{const o=en(1024,768,(d,S,M)=>{d.fillStyle="#f8fafc",d.fillRect(0,0,S,M),d.fillStyle="#1d4ed8",d.strokeStyle="#1d4ed8",d.textAlign="center",d.font="bold 44px Arial",d.fillText("UPPER LEVEL",S/2,70),d.fillRect(S*.08,90,S*.84,6),d.fillText("LOWER LEVEL",S/2,170),d.fillRect(S*.08,190,S*.84,6),d.fillRect(S*.06,250,S*.88,12),d.fillRect(S*.06,280,S*.4,300),d.fillStyle="#ffffff",d.font="bold 120px Arial",d.fillText("12V",S*.26,440),d.font="bold 34px Arial",d.fillText("LEAD-ACID",S*.26,520),d.fillStyle="#1d4ed8",d.font="bold 110px Arial",d.fillText("NS60",S*.7,400),d.font="bold 56px Arial",d.fillText("12V / 45AH",S*.7,480),d.font="bold 34px Arial",d.fillText("ACCUMULATOR",S*.7,545),d.fillRect(S*.06,600,S*.88,10)}),c=new de({color:15857145,roughness:.55}),h=new de({color:1920728,roughness:.4}),u=L(Ke(.9,.62,.55,.03),[c,c,c,c,new de({map:o,roughness:.5}),c],0,.31),f=L(Ke(.94,.09,.59,.025),h,0,.665),p=L(Ke(.96,.03,.61,.01),h,0,.625),g=L(Ke(.16,.055,.03,.008),h,0,.66,.3);r(u,f,p,g);const _=new de({color:16436245,roughness:.45});for(let d=0;d<6;d++){const S=-.35+d*.14;r(L(new te(.045,.045,.02,24),h,S,.72,-.12)),r(L(new te(.036,.04,.05,8),_,S,.75,-.12)),r(L(new te(.026,.026,.012,16),_,S,.781,-.12))}const m=new de({color:9146260,roughness:.5,metalness:.7});for(const[d,S]of[[-.38,"+"],[.38,"-"]]){r(L(new te(.06,.06,.03,28),h,d,.725,.12)),r(L(new te(.026,.032,.09,20),m,d,.785,.12));const M=_a(S);M.scale.set(.16,.035,1),M.position.set(d,.86,.12),r(M)}break}case"metre_rule":{const o=new de({color:14066524,roughness:.6}),c=new de({map:Ih(),color:16113331,roughness:.55});r(L(new Rt(5,.02,.2),[o,o,c,o,o,o],0,.01));break}case"galvanometer":{const o=L(Ke(.42,.3,.2,.03),Qt(1976635),0,.15),c=L(new Ki(.13,40,0,Math.PI),new de({map:Lh("G","#1d4ed8")}),0,.12,.101),h=L(new Rt(.006,.12,.004),An(14427686),0,.18,.105);h.userData.role="needle",r(o,c,h,Ui(-.12,.3,0,14427686),Ui(.12,.3,0,1120295));break}case"tuning_fork":{const o=L(new Rt(.03,.4,.03),At(),-.04,.42),c=o.clone();c.position.x=.04;const h=L(new qt(.04,.015,10,20,Math.PI),At(),0,.22);h.rotation.z=Math.PI;const u=L(new te(.015,.015,.14,12),At(),0,.12),f=L(Ke(.24,.05,.14,.01),ti(),0,.025);r(o,c,h,u,f);break}case"pulley":{const o=L(new te(.15,.15,.05,40),xt(10265519),0,.9);o.rotation.x=Math.PI/2;const c=L(new qt(.15,.015,10,40),Bt(3621201),0,.9),h=L(Ke(.06,.12,.08,.01),xt(5395035),0,1.08),u=L(new te(.012,.012,1.1,12),xt(),-.3,.55),f=L(new te(.01,.01,.3,12),xt(),-.15,1.08);f.rotation.z=Math.PI/2;const p=L(Ke(.36,.03,.24,.01),Qt(2042167),-.3,.015),g=L(new te(.003,.003,.6,6),Bt(16119284),.15,.6);r(o,c,h,u,f,p,g,L(new te(.05,.05,.1,20),ni(),.15,.25));break}case"petri_dish":{r(L(new te(.22,.22,.05,48,1,!0),mt(),0,.025)),r(L(new te(.22,.22,.004,48),mt(),0,.002)),r(L(new te(.21,.21,.02,48),new de({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const c=o*1.3,h=.05+o%3*.04;r(L(new te(.02+o%2*.01,.02,.006,16),An(16317180),Math.cos(c)*h,.025,Math.sin(c)*h))}break}case"hand_lens":{const o=L(new Wt(.14,32,32),mt(15988991),0,.03);o.scale.set(1,.16,1);const c=L(new qt(.14,.018,12,48),Bt(1120295),0,.03);c.rotation.x=Math.PI/2;const h=L(Ke(.3,.035,.05,.012),Bt(1120295),.29,.03);r(o,c,h);break}case"scalpel":{const o=L(Ke(.32,.02,.035,.006),At(),0,.012),c=new mr;c.moveTo(0,0),c.lineTo(.14,0),c.quadraticCurveTo(.12,.05,0,.04),c.closePath();const h=new Te(new Ns(c,{depth:.003,bevelEnabled:!1}),At());h.rotation.x=-Math.PI/2,h.position.set(.16,.02,.02),r(o,h);break}case"forceps":{for(const o of[-1,1]){const c=L(Ke(.36,.012,.03,.004),At(),0,.012,o*.025);c.rotation.y=o*.07,r(c)}r(L(Ke(.05,.016,.08,.006),At(),-.18,.012));break}case"dissecting_tray":{r(L(Ke(.9,.08,.6,.03),Qt(2042167),0,.04)),r(L(new Rt(.82,.01,.52),new de({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(L(new te(.006,.006,.06,8),At(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(L(new te(.16,.16,.5,36,1,!0),mt(),0,.25)),r(L(new te(.17,.17,.06,36),Bt(1013358),0,.53)),r(L(new te(.161,.161,.18,36,1,!0,-.6,1.2),new de({color:16777215,roughness:.8,side:Jt}),0,.3)),r(Un(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=L(new te(.22,.16,.3,32),Qt(11817737),0,.15),c=L(new te(.2,.2,.02,32),An(4139549),0,.29),h=L(new te(.015,.02,.5,10),An(1409085),0,.54);r(o,c,h);const u=new de({color:2278750,roughness:.5,side:Jt});for(let f=0;f<6;f++){const p=L(new Wt(.09,16,10),u,0,.42+f*.07);p.scale.set(1.4,.15,.6),p.rotation.y=f*2.1,p.position.x=Math.cos(f*2.1)*.08,p.position.z=-Math.sin(f*2.1)*.08,r(p)}break}case"soil_sieve":{const o=L(new te(.4,.4,.14,48,1,!0),new de({color:10576391,roughness:.6,side:Jt}),0,.07),c=en(256,256,(u,f,p)=>{u.clearRect(0,0,f,p),u.strokeStyle="#6b7280",u.lineWidth=2;for(let g=0;g<f;g+=8)u.beginPath(),u.moveTo(g,0),u.lineTo(g,p),u.moveTo(0,g),u.lineTo(f,g),u.stroke()}),h=L(new Ki(.39,48),new de({map:c,transparent:!0,metalness:.6,side:Jt}),0,.03);h.rotation.x=-Math.PI/2,r(o,h);for(let u=0;u<14;u++){const f=u*2.4,p=u%4*.08;r(L(new Kl(.025+u%3*.01),An(7893356),Math.cos(f)*p,.05,Math.sin(f)*p))}break}case"rain_gauge":{const o=L(new te(.2,.06,.16,36,1,!0),xt(13358561),0,1),c=L(new te(.2,.2,.08,36,1,!0),xt(13358561),0,1.12),h=L(new te(.1,.1,.9,32,1,!0),mt(),0,.47),u=L(new te(.03,.01,.1,12),xt(5395035),0,.01);r(o,c,h,u,ga(.1,.1,.75,5),Un(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=L(new te(.22,.25,.42,36),Qt(1483594),0,.21),c=L(new te(.025,.04,.6,16),Qt(1483594),.4,.4);c.rotation.z=-.95;const h=L(new te(.07,.04,.06,20),xt(10265519),.64,.58);h.rotation.z=-.95;const u=L(new qt(.18,.022,10,32,Math.PI),Qt(1409085),0,.42);r(o,c,h,u,Un(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(L(Ke(.9,.12,.55,.02),Bt(1120295),0,.06)),r(L(new Rt(.84,.02,.49),An(4139549),0,.115));for(let o=0;o<6;o++)for(let c=0;c<3;c++){const h=-.35+o*.14,u=-.15+c*.15;r(L(new te(.004,.004,.08,6),An(1483594),h,.16,u));const f=L(new Wt(.022,10,8),An(2278750),h,.2,u);f.scale.set(1.6,.3,.8),r(f)}break}case"garden_trowel":{const o=L(new Wt(.12,24,12,0,Math.PI,0,Math.PI/2),xt(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const c=L(new te(.012,.012,.1,10),xt(),0,.03);c.rotation.z=Math.PI/2;const h=L(new te(.03,.03,.24,16),ti(),-.17,.03);h.rotation.z=Math.PI/2,r(o,c,h);break}case"hand_hoe":{const o=new Zt,c=new de({color:13213802,roughness:.6}),h=new de({color:1842980,roughness:.45,metalness:.6}),u=L(new te(.03,.034,1.6,20),c,.85,0);u.rotation.z=Math.PI/2;const f=L(new te(.05,.05,.14,24),h,.05,0);f.rotation.z=Math.PI/2;const p=L(Ke(.05,.14,.05,.01),h,0,-.09),g=new mr;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const _=new Ns(g,{depth:.014,bevelEnabled:!1}),m=new Te(_,new de({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const d=L(new Rt(.016,.04,.28),new de({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(u,f,p,m,d),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new Zt,c=new de({color:14729103,roughness:.55}),h=new de({color:2303531,roughness:.5,metalness:.6}),u=L(new te(.045,.036,1.3,20),c,.72,0);u.rotation.z=Math.PI/2;const f=L(Ke(.16,.11,.11,.012),h,.06,0),p=L(Ke(.03,.09,.08,.006),At(),.16,0),g=L(Ke(.05,.05,.24,.01),h,0,-.07);o.add(u,f,p,g);for(const _ of[-.09,0,.09]){const m=L(Ke(.04,.5,.025,.008),h,0,-.33,_),d=L(new Xn(.016,.07,4),new de({color:11844032,roughness:.25,metalness:1}),0,-.61,_);d.rotation.z=Math.PI,o.add(m,d)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=L(new te(.02,.02,1.2,12),xt(7041664),0,.75),c=L(new te(.025,.025,.5,12),xt(7041664),0,1.35);c.rotation.z=Math.PI/2;const h=new Te(new ts(new Fo(.3,.05,4),200,.012,6,!1),xt(10265519));h.position.y=.15,r(o,c,h,L(new te(.25,.25,.04,32),An(5978660),0,.02));break}case"soil_sample":{r(L(Ke(.7,.08,.45,.02),Bt(13948120),0,.04)),[5978660,10119999,12755563].forEach((c,h)=>{const u=L(new Wt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new de({color:c,roughness:1}),-.22+h*.22,.08);u.scale.y=.55,r(u)});break}case"safety_goggles":{for(const o of[-1,1]){const c=L(new Wt(.085,24,16),new de({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);c.scale.z=.5;const h=L(new qt(.085,.014,10,32),Bt(1013358),o*.1,.08);r(c,h)}r(L(new qt(.2,.012,8,40,Math.PI),Bt(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const c=L(new te(.01,.01,.5,10),xt(7041664),0,.015,o*.03);c.rotation.z=Math.PI/2,c.rotation.y=o*.08,r(c)}r(L(new qt(.03,.008,8,20),xt(7041664),.26,.015));break}case"heat_proof_mat":{r(L(Ke(.8,.03,.8,.01),new de({color:15197668,roughness:.95}),0,.015));break}default:r(L(Ke(.3,.3,.3,.03),An(10265519),0,.15))}s.traverse(o=>{o instanceof Te&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new On;s.children.forEach(o=>{o instanceof Rn||a.expandByObject(o)});const l=_a(t);return l.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(l),s}function Nh(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new Te(new ts(new Ql(t,s,n),32,.014,8,!1),new de({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const Uu=[[{id:"hcl",name:"Dilute Hydrochloric Acid",formula:"HCl",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"h2so4",name:"Dilute Sulphuric Acid",formula:"H₂SO₄",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"hno3",name:"Dilute Nitric Acid",formula:"HNO₃",color:"#f6f3e4",state:"liquid",hazard:"corrosive"},{id:"ch3cooh",name:"Ethanoic Acid",formula:"CH₃COOH",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"water",name:"Distilled Water",formula:"H₂O",color:"#dff1fb",state:"liquid"}],[{id:"naoh",name:"Sodium Hydroxide Solution",formula:"NaOH",color:"#eef6f8",state:"liquid",hazard:"corrosive"},{id:"nh3",name:"Ammonia Solution",formula:"NH₃(aq)",color:"#eef6f8",state:"liquid",hazard:"irritant"},{id:"limewater",name:"Limewater",formula:"Ca(OH)₂",color:"#f3f6f7",state:"liquid",hazard:"irritant"},{id:"cuso4",name:"Copper(II) Sulphate Solution",formula:"CuSO₄",color:"#2b8be0",state:"liquid",hazard:"irritant"},{id:"feso4",name:"Iron(II) Sulphate Solution",formula:"FeSO₄",color:"#a9d8a0",state:"liquid",hazard:"irritant"}],[{id:"benedicts",name:"Benedict's Solution",color:"#3f7fe0",state:"liquid",hazard:"irritant"},{id:"nacl",name:"Sodium Chloride",formula:"NaCl",color:"#fbfbfb",state:"solid"},{id:"cuo",name:"Copper(II) Oxide",formula:"CuO",color:"#1d1d1f",state:"solid",hazard:"irritant"},{id:"caco3",name:"Calcium Carbonate",formula:"CaCO₃",color:"#ecebe4",state:"solid"},{id:"zn",name:"Zinc Granules",formula:"Zn",color:"#9ca3af",state:"solid"}],[{id:"phenolphthalein",name:"Phenolphthalein Indicator",color:"#f4f6f7",state:"liquid",hazard:"flammable"},{id:"methyl_orange",name:"Methyl Orange Indicator",color:"#f28c28",state:"liquid",hazard:"toxic"},{id:"universal",name:"Universal Indicator",color:"#3fae4a",state:"liquid",hazard:"flammable"},{id:"kmno4",name:"Potassium Manganate(VII)",formula:"KMnO₄",color:"#7a1f8f",state:"liquid",hazard:"oxidising"},{id:"iodine",name:"Iodine Solution",formula:"I₂/KI",color:"#9a5a14",state:"liquid",hazard:"irritant"}]],bv=Uu.flat(),Ev=i=>bv.find(e=>e.id===i);function wv(i){return{chemical_id:i.id,display_name:i.name,formula:i.formula||"",color:i.color,hazard:i.hazard||"",capacity_ml:i.state==="liquid"?250:100}}const Tv=i=>i.state==="liquid"?"reagent_bottle":"reagent_jar",Av={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},Rv={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},Cv={class:"space-y-1"},Pv=["onClick"],Dv={class:"truncate"},Lv={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},Iv={class:"flex items-center justify-between gap-2 mb-2"},Nv={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},Uv={class:"flex flex-wrap gap-1.5"},Fv=["onClick"],Ov={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Bv={class:"flex items-center gap-2"},zv={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},kv={class:"text-xs font-medium text-gray-400 ml-1"},Vv={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Hv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},Gv=["max"],Wv={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Xv={class:"flex flex-wrap gap-1.5"},qv=["onClick"],Yv={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Zv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},$v={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},Kv={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},Jv={class:"flex gap-1.5"},jv=["onClick"],Qv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},ex=["value"],tx={class:"flex items-center justify-between"},nx={class:"flex gap-1.5"},ix={key:0,class:"pt-1"},sx={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},rx={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},ax={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},ox={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},lx={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},cx={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},hx={class:"flex flex-wrap gap-1.5"},ux={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},fx={class:"text-center"},dx={class:"flex items-center gap-2 flex-shrink-0"},px={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},mx={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},gx={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},_x=["max"],vx={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},xx={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},yx={class:"flex items-start justify-between gap-2"},Mx={class:"text-xs text-gray-700 dark:text-gray-200"},Sx={class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"},bx=.9,Bo=5,Rx=Hu({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean},cupboard:{type:Boolean},wallShelves:{type:Boolean},benchLength:{},sideBenches:{type:Boolean}},emits:["takeChemical","putBack","pickApparatus","action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=Et(null),a=Et(!1);let l,o,c,h;const u=new Map,f=new Kd,p=new j,g=new xi(new N(0,1,0),0),_=Et(null),m=Et(null),d=Et(null),S=Et(null);let M=!1,y=0;const w={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},E=A=>{if(D.value==="stopwatch"){if(A==="switch_on")return"Start";if(A==="switch_off")return"Stop";if(A==="measure")return"Read Time"}if(D.value==="microscope"){if(A==="switch_on")return"Light On";if(A==="switch_off")return"Light Off";if(A==="inspect")return"Observe"}return w[A]||A},C=()=>new Map(n.objectCatalog.map(A=>[A.object_type,A])),v=Et([]),T=Et(""),D=Et(null),U=Et(null),V=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can","reagent_bottle"],Q=["battery","dry_cell","accumulator"],ee=["water_container","burette","wash_bottle","watering_can","reagent_bottle"],B=new Map,q=new Map,W=new Map,ie=new Map,ae=Et([...n.connections||[]]),X=Et(null),Y=Et(null),he=Et(""),Ie=Et(0),ft=Et(100),Qe=Et(null),re=Et(!1),ve=Et(null),me=Et(null),Ne=Et(null),Xe=new Map,Oe=new Map,ct=new Map,je=Et(50),fe=Et(40),ge=Et("very_blurred"),_e=Et(!1),Ae=Et(!1),Me=new Map,Je=new Map,Ve=new Map,tt=Et(0),rt=Et(0),O=Et(!1);let Tt=[];const vt={very_blurred:10,blurred:5,almost_focused:2,focused:0};function R(A){me.value=A,Qe.value="protractor",m.value="measure"}const x=Et(null),G=Et([]);function $(A){const P=C().get(A.object_type),I={...(P==null?void 0:P.default_props)||{},...A.props||{}},F=Oo(A.object_type,A.key,I.display_name||(P==null?void 0:P.display_name)||A.object_type,I);if(F.position.set(A.position.x,A.position.y,A.position.z),A.rotation&&(F.rotation.y=A.rotation.y),o.add(F),u.set(A.key,F),V.includes(A.object_type)){const z=ye(A.object_type,I);B.set(A.key,z),ne(A.key,z/Number(I.capacity_ml??250))}Q.includes(A.object_type)&&q.set(A.key,Number(I.voltage??6))}function se(A){if(n.readOnly)return;const P=G.value.findIndex(F=>F.key===A);if(P===-1)return;const I=G.value[P];$(I),G.value.splice(P,1),s("action",{objectKey:A,action:"move",value:A})}function ue(A){const P=n.sceneObjects.find(F=>F.key===A);if(!P)return{};const I=C().get(P.object_type);return{...(I==null?void 0:I.default_props)||{},...P.props||{}}}function ye(A,P){return P.current_volume!==void 0?Number(P.current_volume):ee.includes(A)?Number(P.capacity_ml??50):0}function ne(A,P){const I=u.get(A);if(!I)return;const F=Math.max(.001,Math.min(1,P));I.traverse(z=>{if(z instanceof Te&&z.userData.role==="liquid"){const oe=z.userData.maxFillHeight;z.scale.y=F,z.position.y=oe*F/2}})}function ce(A){const P=new Set([A]),I=[A];for(;I.length;){const F=I.shift();ae.value.forEach(z=>{z.from===F&&!P.has(z.to)&&(P.add(z.to),I.push(z.to)),z.to===F&&!P.has(z.from)&&(P.add(z.from),I.push(z.from))})}return P}function we(A){const P=n.sceneObjects.find(Ht=>Q.includes(Ht.object_type)),I=n.sceneObjects.find(Ht=>Ht.object_type==="switch"),F=n.sceneObjects.find(Ht=>Ht.object_type==="resistor"),z=n.sceneObjects.find(Ht=>Ht.key===A);if(!z)return{value:0,reason:null};if(!P||!I||!F)return{value:0,reason:"The circuit is incomplete. Check your connections."};const oe=ce(P.key),xe=oe.has(I.key),We=oe.has(F.key),nt=oe.has(A),yt=W.get(I.key)==="on";if(xe&&yt&&!We)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!xe||!We)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((W.get(P.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!yt)return{value:0,reason:"Close the switch before taking the reading."};if(!nt)return z.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:z.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const pt=q.get(P.key)??ue(P.key).voltage??6,st=ue(F.key).resistance_ohm??10,ht=pt/st;return z.object_type==="ammeter"?{value:Math.round(ht*100)/100,reason:null}:z.object_type==="voltmeter"?{value:pt,reason:null}:{value:0,reason:null}}function qe(A){const P=ie.get(A);if(!P)return 25;const I=(Date.now()-P)/1e3;return Math.min(100,Math.round(25+I*3.5))}function Re(A,P){const I=u.get(A),F=u.get(P);if(!I||!F)return{ok:!1};if(I.position.distanceTo(F.position)>bx)return{ok:!1};const z=Je.has(P)?Number(ue(P).natural_length_cm??15)+(Je.get(P)??0):ue(P).length_cm??ue(P).natural_length_cm??10,oe=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((z+oe)*10)/10}}function be(A){const P=Xe.get(A);if(!P)return"very_blurred";const I=Number(ue(P).optimal_focus??50),F=Number(ue(P).focus_tolerance??6),z=ct.get(A)??40,oe=F*(40/z),xe=Oe.get(A)??0,We=Math.abs(xe-I);return We<=oe?"focused":We<=oe*2?"almost_focused":We<=oe*4?"blurred":"very_blurred"}function He(A){_.value===A&&(je.value=Oe.get(A)??50,fe.value=ct.get(A)??40,_e.value=W.get(A)==="on",Ae.value=Xe.has(A),ge.value=be(A))}function et(A){_.value&&(ct.set(_.value,A),s("action",{objectKey:_.value,action:"select_objective",value:String(A)}),He(_.value))}function at(A){_.value&&(Oe.set(_.value,A),s("action",{objectKey:_.value,action:"focus_coarse",value:String(Math.round(A))}),He(_.value))}function k(A){if(!_.value)return;const P=_.value,I=Math.max(0,Math.min(100,(Oe.get(P)??50)+A));Oe.set(P,I),s("action",{objectKey:P,action:"focus_fine",value:String(I)}),He(P)}function Se(A){const I=[...Me.get(A)??new Set].reduce((pt,st)=>pt+Number(ue(st).mass_g??0),0),F=Number(ue(A).spring_constant_n_per_m??40),oe=I/1e3*9.8/F*100,xe=Number(ue(A).max_safe_extension_cm??12),We=Ve.get(A)??0,nt=oe>xe;nt&&We===0&&Ve.set(A,(oe-xe)*.3);const yt=oe+(Ve.get(A)??0);return Je.set(A,Math.round(yt*100)/100),le(A,yt),_.value===A&&(rt.value=I,tt.value=Math.round(yt*100)/100,O.value=nt),{totalMassG:I,exceeded:nt}}function le(A,P){const I=u.get(A);I&&I.traverse(F=>{if(F instanceof Te&&F.userData.role==="spring_body"){const z=F.userData.naturalLengthUnits,oe=F.userData.maxLengthUnits,xe=Math.min(oe,z+Math.max(0,P)*.05);F.scale.y=xe/oe,F.position.y=.85-oe*F.scale.y/2}if(F.userData.role==="spring_hanger"){const z=[...I.children].find(oe=>oe.userData.role==="spring_body");z&&(F.position.y=.85-z.userData.maxLengthUnits*z.scale.y)}})}function Ee(A){return new N(Math.sin(A),0,Math.cos(A))}function De(A,P){return A.clone().sub(P.clone().multiplyScalar(2*A.dot(P)))}function pe(A,P,I,F){let z=P.clone(),oe=-z.dot(A);oe<0&&(oe=-oe,z=z.clone().negate());const xe=I/F,We=xe*xe*(1-oe*oe);if(We>1)return null;const nt=Math.sqrt(1-We);return A.clone().multiplyScalar(xe).add(z.clone().multiplyScalar(xe*oe-nt))}function Ge(A,P){const I=u.get(A),F=u.get(P);if(!I||!F)return null;const z=I.position.clone(),oe=Ee(I.rotation.y),xe=Ee(F.rotation.y),We=oe.dot(xe);if(Math.abs(We)<.001)return null;const nt=F.position.clone().sub(z).dot(xe)/We;if(nt<=.05)return null;const yt=z.clone().add(oe.clone().multiplyScalar(nt));return yt.distanceTo(F.position)>.35?null:{point:yt,normal:xe,incidentDir:oe}}function ze(){Tt.forEach(A=>{o.remove(A),A instanceof Te&&(A.geometry.dispose(),A.material.dispose())}),Tt=[]}function Ft(A,P,I){const F=A.clone().add(P).multiplyScalar(.5),z=Math.max(.01,A.distanceTo(P)),oe=new Te(new te(.006,.006,z,8),new de({color:I,emissive:I,emissiveIntensity:.4,roughness:.4}));oe.position.copy(F);const xe=P.clone().sub(A).normalize();return oe.quaternion.copy(new Ti().setFromUnitVectors(new N(0,1,0),xe)),oe}function Pt(){ze();const A=n.sceneObjects.find(nt=>nt.object_type==="ray_box"),P=n.sceneObjects.find(nt=>nt.object_type==="mirror"),I=n.sceneObjects.find(nt=>nt.object_type==="glass_block"),F=P||I;if(!A||!F||W.get(A.key)!=="on")return;const z=Ge(A.key,F.key);if(!z)return;const oe=u.get(A.key),xe=Ft(oe.position,z.point,16498468),We=Ft(z.point.clone().sub(z.normal.clone().multiplyScalar(.01)),z.point.clone().add(z.normal.clone().multiplyScalar(.4)),9741240);if(o.add(xe,We),Tt.push(xe,We),P){const nt=De(z.incidentDir,z.normal),yt=Ft(z.point,z.point.clone().add(nt.multiplyScalar(1.2)),16498468);o.add(yt),Tt.push(yt)}else if(I){const nt=Number(ue(I.key).refractive_index??1.5),yt=pe(z.incidentDir,z.normal,1,nt);if(yt){const pt=z.point.clone().add(yt.clone().multiplyScalar(.4)),st=Ft(z.point,pt,6333946),ht=Ft(pt,pt.clone().add(z.incidentDir.clone().multiplyScalar(1)),16498468);o.add(st,ht),Tt.push(st,ht)}}}function Ln(A,P,I){const F=n.sceneObjects.find(pt=>pt.object_type==="ray_box");if(!F)return{ok:!1};const z=Ge(F.key,P);if(!z)return{ok:!1};const oe=u.get(A);if(!oe||oe.position.distanceTo(z.point)>.4)return{ok:!1};let xe;if(I==="incidence")xe=z.incidentDir.clone().negate();else{const pt=n.sceneObjects.find(st=>st.key===P);if((pt==null?void 0:pt.object_type)==="glass_block"){const st=Number(ue(P).refractive_index??1.5),ht=pe(z.incidentDir,z.normal,1,st);if(!ht)return{ok:!1};xe=ht}else xe=De(z.incidentDir,z.normal)}const We=Math.abs(xe.normalize().dot(z.normal)),nt=Math.acos(Math.min(1,Math.max(-1,We)))*180/Math.PI,yt=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((nt+yt)*10)/10}}const fn=new Map,as=new Map;function Dr(A){const P=u.get(A);if(!P)return;const I=fn.get(A),F=I?Number(ue(I).mass_g??0):0;P.traverse(z=>{var oe;if(z instanceof Rn&&z.userData.role==="balance_display"){const xe=z.material;(oe=xe.map)==null||oe.dispose(),xe.map=Oa(`${F.toFixed(1)} g`),xe.needsUpdate=!0}})}const $n=new Map,Vi=new Map,Zs=new Map,$s=Et("00:00.0");function Ks(A){const P=Math.max(0,A)/1e3,I=Math.floor(P/60).toString().padStart(2,"0"),F=(P%60).toFixed(1).padStart(4,"0");return`${I}:${F}`}function zn(A){const P=Zs.get(A)??0;return $n.get(A)?P+(Date.now()-(Vi.get(A)??Date.now())):P}function Hi(A){const P=u.get(A),I=zn(A);_.value===A&&($s.value=Ks(I)),P&&P.traverse(F=>{var z;if(F instanceof Rn&&F.userData.role==="stopwatch_display"){const oe=F.material;(z=oe.map)==null||z.dispose(),oe.map=Oa(Ks(I)),oe.needsUpdate=!0}})}function Lr(A){$n.set(A,!1),Zs.set(A,0),Vi.delete(A),Hi(A)}function Js(A){u.forEach((P,I)=>{P.traverse(F=>{if(!(F instanceof Te)||F.userData.role==="flame"||F.userData.role==="led")return;(Array.isArray(F.material)?F.material:[F.material]).forEach(oe=>{oe instanceof de&&(oe.emissive.setHex(I===A?2282478:0),oe.emissiveIntensity=I===A?.3:0)})})})}function os(A){var F;_.value=A,S.value=null,d.value=null;const P=n.sceneObjects.find(z=>z.key===A),I=P?C().get(P.object_type):null;v.value=(I==null?void 0:I.supported_actions)??[],T.value=((F=P==null?void 0:P.props)==null?void 0:F.display_name)??(I==null?void 0:I.display_name)??A,D.value=(P==null?void 0:P.object_type)??null,U.value=(P==null?void 0:P.object_type)==="battery"?q.get(A)??ue(A).voltage??6:null,(P==null?void 0:P.object_type)==="microscope"&&He(A),(P==null?void 0:P.object_type)==="spring"&&Se(A),Js(A)}function Gi(){_.value=null,S.value=null,X.value=null,D.value=null,Js(null)}function ls(A){if(!_.value)return;U.value=A,q.set(_.value,A);const P=u.get(_.value);P&&P.traverse(I=>{var F;if(I instanceof Rn&&I.userData.role==="voltage"){const z=I.material;(F=z.map)==null||F.dispose(),z.map=Nu(A),z.needsUpdate=!0}})}function Ir(A){const P=n.sceneObjects.find(F=>F.key===A);if(!P)return;const I=P.object_type;if(re.value=!1,ve.value=A,V.includes(I)){X.value="readonly",he.value="ml",Y.value=Math.round(B.get(A)??0),S.value=A;return}if(I==="ammeter"||I==="voltmeter"){const F=we(A);F.reason&&(Ne.value=F.reason,setTimeout(()=>{Ne.value=null},4e3)),X.value="readonly",he.value=I==="ammeter"?"A":"V",Y.value=F.value,S.value=A,re.value=!!F.reason&&F.reason.includes("Short circuit");return}if(I==="balance"){X.value="readonly",he.value="g";const F=fn.get(A);Y.value=F?Number(ue(F).mass_g??0):0,S.value=A;return}if(I==="stopwatch"){X.value="readonly",he.value="s",Y.value=Math.round(zn(A)/100)/10,S.value=A;return}if(I==="spring"){X.value="readonly",he.value="cm";const F=Number(ue(A).natural_length_cm??15);Y.value=Math.round((F+(Je.get(A)??0))*10)/10,S.value=A,ve.value=A;return}if(I==="protractor"){me.value="incidence",Qe.value="protractor",m.value="measure";return}if(I==="ruler"||I==="metre_rule"||I==="thermometer"){Qe.value=I==="thermometer"?"thermometer":"ruler",m.value="measure";return}X.value="slider",he.value="ml",ft.value=Number(ue(A).capacity_ml??100),Ie.value=Math.round(ft.value/2),S.value=A}function Nr(A){var P;if(_.value&&!n.readOnly&&!(A==="focus_coarse"||A==="focus_fine"||A==="select_objective")){if(A==="inspect"){const I=n.sceneObjects.find(We=>We.key===_.value),F=I?C().get(I.object_type):null;let z=(F==null?void 0:F.description)||"No further detail available.";const oe=(P=I==null?void 0:I.props)!=null&&P.chemical_id?Ev(I.props.chemical_id):null;if(oe&&I){const We=oe.hazard?` Hazard: ${oe.hazard} - handle with care and wear goggles.`:"",nt=oe.state==="liquid"?` About ${Math.round(B.get(I.key)??0)} ml left in the bottle.`:" A solid - use a spatula to take some out.";z=`${oe.name}${oe.formula?` (${oe.formula})`:""}.${nt}${We}`}let xe=null;if(D.value==="microscope"){const We=_.value,nt=Xe.get(We),yt=ct.get(We)??40;if(!nt)z="Place a specimen slide on the stage first.";else if(W.get(We)!=="on")z="Switch on the illumination to see anything through the eyepiece.";else{const pt=be(We),st=ue(nt).expected_structures||"the specimen";pt==="focused"?z=`At ×${yt}, clearly focused - you can see ${st}.`:pt==="almost_focused"?z=`At ×${yt}, almost in focus - fine-tune the focus a little more.`:pt==="blurred"?z=`At ×${yt}, blurred - adjust the coarse and fine focus.`:z=`At ×${yt}, very blurred - use the focus knobs before observing.`,xe=pt}}d.value=z,s("action",{objectKey:_.value,action:A,value:xe});return}if(A==="zoom"){b(_.value),s("action",{objectKey:_.value,action:A,value:null});return}if(A==="switch_on"||A==="switch_off"){W.set(_.value,A==="switch_on"?"on":"off"),D.value==="stopwatch"&&(A==="switch_on"&&!$n.get(_.value)?($n.set(_.value,!0),Vi.set(_.value,Date.now())):A==="switch_off"&&$n.get(_.value)&&(Zs.set(_.value,zn(_.value)),$n.set(_.value,!1)),Hi(_.value)),D.value==="microscope"&&He(_.value),D.value==="ray_box"&&Pt(),s("action",{objectKey:_.value,action:A,value:null});return}if(A==="measure"){Ir(_.value);return}if(A==="connect"||A==="pour"||A==="heat"||A==="move"||A==="rotate"){m.value=A,h.enabled=A!=="move"&&A!=="rotate";return}}}const kn=Et("");dr(m,A=>{A==="connect"?kn.value="Click the object to connect to.":A==="pour"?kn.value="Click the container to pour into.":A==="heat"?kn.value="Click the object to place over the flame.":A==="move"?kn.value="Drag the object to reposition it, then click Done.":A==="rotate"?kn.value="Drag left/right to rotate, then click Done.":A==="measure"&&Qe.value==="ruler"?kn.value="Click the object to measure - place the ruler close to it first.":A==="measure"&&Qe.value==="thermometer"?kn.value="Click the substance to take a temperature reading.":A==="measure"&&Qe.value==="protractor"&&(kn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function Ur(){if(!S.value)return;const A=X.value==="slider"?String(Math.round(Ie.value)):Y.value!==null?String(Y.value):null;s("action",{objectKey:S.value,action:"measure",value:A,unit:he.value,label:T.value,safetyIssue:re.value,targetObjectKey:ve.value}),S.value=null,X.value=null,Y.value=null,re.value=!1,me.value=null}function Wa(){if(x.value){Ze();return}m.value=null,Qe.value=null,me.value=null,h.enabled=!0}function Xa(){var A,P,I;if(!(!_.value||!m.value)){if(m.value==="move"){const F=u.get(_.value);let z=null;F&&u.forEach((st,ht)=>{ht!==_.value&&st.position.distanceTo(F.position)<.6&&(z=ht)});const oe=_.value;fn.forEach((st,ht)=>{st===oe&&ht!==z&&(fn.delete(ht),Dr(ht))});const xe=z?(A=n.sceneObjects.find(st=>st.key===z))==null?void 0:A.object_type:null;xe==="balance"&&z&&(fn.set(z,oe),Dr(z)),as.forEach((st,ht)=>{if(ht===oe&&st!==z){const Ht=Number(ue(ht).volume_ml??0),cs=Math.max(0,(B.get(st)??0)-Ht);B.set(st,cs),ne(st,cs/Number(ue(st).capacity_ml??250)),as.delete(ht)}});const We=Number(ue(oe).volume_ml??0);if(xe&&V.includes(xe)&&z&&We>0&&!as.has(oe)){as.set(oe,z);const st=(B.get(z)??0)+We;B.set(z,st),ne(z,st/Number(ue(z).capacity_ml??250))}const nt=(P=n.sceneObjects.find(st=>st.key===oe))==null?void 0:P.object_type;if(Xe.forEach((st,ht)=>{st===oe&&ht!==z&&Xe.delete(ht)}),xe==="microscope"&&z&&nt==="biological_model"){Xe.set(z,oe);const st=Number(ue(oe).optimal_focus??50),ht=Number(ue(oe).focus_tolerance??6),Ht=Math.random()<.5?-1:1,cs=ht*(3+Math.random()*3)*Ht;Oe.set(z,Math.max(0,Math.min(100,st+cs))),ct.set(z,40),He(z)}let yt,pt=!1;if(nt==="mass_piece"){Me.forEach((ht,Ht)=>{ht.has(oe)&&Ht!==z&&ht.delete(oe)}),xe==="spring"&&z&&(Me.has(z)||Me.set(z,new Set),Me.get(z).add(oe));const st=new Set(z&&xe==="spring"?[z]:[]);Me.forEach((ht,Ht)=>st.add(Ht)),st.forEach(ht=>{const Ht=Se(ht);z===ht&&(yt=Ht.totalMassG,pt=Ht.exceeded)}),pt&&(Ne.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Ne.value=null},4500))}["ray_box","mirror","glass_block"].includes(nt||"")&&Pt(),s("action",{objectKey:_.value,action:"move",value:z,springLoadG:yt,safetyIssue:pt})}else if(m.value==="rotate"){const F=u.get(_.value),z=F?Math.round(F.rotation.y*180/Math.PI):0,oe=(I=n.sceneObjects.find(xe=>xe.key===_.value))==null?void 0:I.object_type;["ray_box","mirror","glass_block"].includes(oe||"")&&Pt(),s("action",{objectKey:_.value,action:"rotate",value:String(z)})}m.value=null,h.enabled=!0}}function b(A){const P=u.get(A);if(!P)return;const I=P.position.clone().add(new N(0,.3,0)),F=c.position.clone().sub(h.target).normalize(),z=I.clone().add(F.multiplyScalar(1.4)),oe=c.position.clone(),xe=h.target.clone();let We=0;const nt=()=>{We+=.05,c.position.lerpVectors(oe,z,Math.min(We,1)),h.target.lerpVectors(xe,I,Math.min(We,1)),h.update(),We<1&&requestAnimationFrame(nt)};nt()}function H(A){const P=l.domElement.getBoundingClientRect();p.x=(A.clientX-P.left)/P.width*2-1,p.y=-((A.clientY-P.top)/P.height)*2+1}function J(){f.setFromCamera(p,c);const A=[];u.forEach(F=>A.push(F));const P=f.intersectObjects(A,!0);if(P.length===0)return null;let I=P[0].object;for(;I&&!I.userData.objectKey;)I=I.parent;return I?I.userData.objectKey:null}let Z=null;function K(A){if(H(A),Z={x:A.clientX,y:A.clientY},m.value==="move"&&_.value){M=!0;return}if(m.value==="rotate"&&_.value){M=!0,y=A.clientX;return}}function Ce(A){if(!(!M||!_.value)){if(H(A),m.value==="move"){f.setFromCamera(p,c);const P=new N;f.ray.intersectPlane(g,P);const I=u.get(_.value);I&&P&&(I.position.x=P.x,I.position.z=P.z)}else if(m.value==="rotate"){const P=A.clientX-y,I=u.get(_.value);I&&(I.rotation.y=P*.02)}}}function Ue(A){const P=Z&&(Math.abs(A.clientX-Z.x)>4||Math.abs(A.clientY-Z.y)>4);if(M=!1,m.value==="move"||m.value==="rotate"||P||(H(A),Kn()))return;const I=J();if(!I){Gi();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(I===_.value)return;const F=_.value,z=m.value;if(z==="measure"){if(Qe.value==="ruler"){const oe=Re(F,I);if(!oe.ok){Ne.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Ne.value=null},3500);return}X.value="readonly",he.value="cm",Y.value=oe.value}else if(Qe.value==="thermometer")X.value="readonly",he.value="°C",Y.value=qe(I);else if(Qe.value==="protractor"){const oe=me.value??"incidence",xe=Ln(F,I,oe);if(!xe.ok){Ne.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Ne.value=null},3500);return}X.value="readonly",he.value="°",Y.value=xe.value}ve.value=I,S.value=F,m.value=null,Qe.value=null,h.enabled=!0;return}if(z==="connect"){const oe=u.get(F),xe=u.get(I);oe&&xe&&o.add(Nh(oe.position,xe.position)),ae.value.push({from:F,to:I}),s("action",{objectKey:F,action:z,value:I}),m.value=null,h.enabled=!0;return}if(z==="heat"){ie.set(I,Date.now()),s("action",{objectKey:F,action:z,value:I}),m.value=null,h.enabled=!0;return}if(z==="pour"){Pe(F,I);return}}os(I)}function Pe(A,P){var yt,pt,st,ht;const I=n.sceneObjects.find(Ht=>Ht.key===A),F=n.sceneObjects.find(Ht=>Ht.key===P);if(!I||!F)return;const z=Number(ue(P).capacity_ml??250),oe=B.get(P)??0,xe=Math.max(0,z-oe),We=V.includes(I.object_type),nt=We?B.get(A)??0:xe;x.value={from:A,to:P,amount:0,max:Math.max(1,Math.round(Math.min(xe,nt))),fromLabel:((yt=I.props)==null?void 0:yt.display_name)??((pt=C().get(I.object_type))==null?void 0:pt.display_name)??I.object_type,toLabel:((st=F.props)==null?void 0:st.display_name)??((ht=C().get(F.object_type))==null?void 0:ht.display_name)??F.object_type,fromTracked:We}}function ke(){if(!x.value)return;const{from:A,to:P,amount:I,fromTracked:F}=x.value,z=Number(ue(P).capacity_ml??250);if(ne(P,((B.get(P)??0)+I)/z),F){const oe=Number(ue(A).capacity_ml??250);ne(A,Math.max(0,(B.get(A)??0)-I)/oe)}}dr(()=>{var A;return(A=x.value)==null?void 0:A.amount},ke);function Ye(){if(!x.value)return;const{from:A,to:P,amount:I,fromTracked:F}=x.value;ot(A,P,I),B.set(P,Math.round((B.get(P)??0)+I)),F&&B.set(A,Math.max(0,Math.round((B.get(A)??0)-I))),s("action",{objectKey:P,action:"pour",value:String(Math.round(I))}),x.value=null,m.value=null,h.enabled=!0}function ot(A,P,I){if(I<=0)return;const F=dt(A),z=dt(P);if(!F||!z)return;const oe=B.get(P)??0;z.color.lerp(F.color,oe<=0?1:I/(oe+I))}function dt(A){var I;let P=null;return(I=u.get(A))==null||I.traverse(F=>{!P&&F instanceof Te&&F.userData.role==="liquid"&&(P=F.material)}),P}function Ze(){if(x.value){const{from:A,to:P,fromTracked:I}=x.value,F=Number(ue(P).capacity_ml??250);if(ne(P,(B.get(P)??0)/F),I){const z=Number(ue(A).capacity_ml??250);ne(A,(B.get(A)??0)/z)}}x.value=null,m.value=null,h.enabled=!0}let Be=null;const Vt=Et(null);function Gt(){const A=r.value;if(!A)return;try{Be=hv(A,{unitScale:Bo,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14,cupboard:!!n.cupboard,wallCabinets:!!n.wallShelves,benchLength:n.benchLength,sideBenches:!!n.sideBenches})}catch(I){console.error("Virtual Lab: failed to create a WebGL context",I),a.value=!0;return}l=Be.renderer,o=Be.scene,c=Be.camera,h=Be.controls,n.sceneObjects.forEach(I=>{if(I.in_tray){G.value.push(I);return}$(I)}),(n.connections||[]).forEach(I=>{const F=u.get(I.from),z=u.get(I.to);F&&z&&o.add(Nh(F.position,z.position))}),Pt(),bt(),fi(),n.fixedView?Bu():cc(),l.domElement.addEventListener("pointerdown",K),l.domElement.addEventListener("pointermove",Ce),l.domElement.addEventListener("pointermove",hc),l.domElement.addEventListener("pointerup",Ue);let P=0;Be.onFrame(I=>{P+=I,P>.15&&(P=0,$n.forEach((F,z)=>{F&&Hi(z)})),u.forEach((F,z)=>{const oe=z===_.value||z===Vt.value;F.children.forEach(xe=>{xe.userData.role==="label"&&(xe.visible=oe)})}),Ct.forEach((F,z)=>{F.children.forEach(oe=>{oe.userData.role==="label"&&(oe.visible=z===dn)})}),En.forEach((F,z)=>{F.children.forEach(oe=>{oe.userData.role==="label"&&(oe.visible=z===Xt)})})})}dr(()=>n.sceneObjects.map(A=>`${A.key}@${A.position.x},${A.position.z}`).join("|"),()=>{if(!Be)return;const A=new Map(n.sceneObjects.filter(I=>!I.in_tray).map(I=>[I.key,I]));let P=!1;u.forEach((I,F)=>{A.has(F)||(o.remove(I),I.traverse(z=>{var oe;(z instanceof Te||z instanceof Rn)&&((oe=z.geometry)==null||oe.dispose(),(Array.isArray(z.material)?z.material:[z.material]).forEach(We=>{var nt;(nt=We.map)==null||nt.dispose(),We.dispose()}))}),u.delete(F),_.value===F&&Gi())}),A.forEach((I,F)=>{const z=u.get(F);z?z.position.set(I.position.x,I.position.y,I.position.z):($(I),P=!0)}),P&&!n.fixedView&&cc(),pn()});const Ct=new Map,sn=[];function Fe(A,P){const I=document.createElement("canvas");I.width=512,I.height=144;const F=I.getContext("2d");F.fillStyle="#fffdf4",F.fillRect(0,0,512,144),F.fillStyle="#1e3a8a",F.fillRect(0,0,512,10),F.fillStyle="#111827",F.textAlign="center",F.textBaseline="middle";let z=46;for(F.font=`bold ${z}px sans-serif`;F.measureText(A).width>490&&z>26;)z-=2,F.font=`bold ${z}px sans-serif`;if(F.measureText(A).width>490){const xe=A.split(" "),We=Math.ceil(xe.length/2);F.fillText(xe.slice(0,We).join(" "),256,P?42:52),F.fillText(xe.slice(We).join(" "),256,P?80:96)}else F.fillText(A,256,P?54:76);P&&(F.font="bold 38px serif",F.fillStyle="#1e3a8a",F.fillText(P,256,118));const oe=new wr(I);return oe.colorSpace=hn,oe.anisotropy=8,oe}let dn=null;function bt(){const A=Be==null?void 0:Be.cupboard;A&&(Uu.forEach((P,I)=>{const F=A.bays[I<2?0:1],z=F.levels[I%2],oe=(F.maxX-F.minX)/P.length;P.forEach((xe,We)=>{const nt=Oo(Tv(xe),`cupboard:${xe.id}`,xe.name,wv(xe));nt.position.set(F.minX+oe*(We+.5),z,F.frontZ-.6),nt.userData.chemicalId=xe.id,nt.traverse(pt=>{pt instanceof Te&&(pt.castShadow=!1,pt.receiveShadow=!1)}),o.add(nt),Ct.set(xe.id,nt);const yt=new Te(new Dn(oe*.92,.26),new ss({map:Fe(xe.name,xe.formula),toneMapped:!1}));yt.position.set(nt.position.x,z+.14,F.frontZ-.08),yt.rotation.x=-.35,yt.userData.chemicalId=xe.id,o.add(yt),sn.push(yt)})}),pn())}function pn(){const A=new Set(n.sceneObjects.map(I=>{var F;return(F=I.props)==null?void 0:F.chemical_id}).filter(Boolean));Ct.forEach((I,F)=>{I.visible=!A.has(F)});const P=new Set(n.sceneObjects.filter(I=>{var F;return!((F=I.props)!=null&&F.chemical_id)}).map(I=>I.object_type));En.forEach((I,F)=>{I.visible=!P.has(F)})}function bn(){const A=Be==null?void 0:Be.cupboard,P=Be==null?void 0:Be.wallCabinets,I=Be==null?void 0:Be.furniture;if(!A&&!P&&!(I!=null&&I.doors.length))return null;f.setFromCamera(p,c);const F=[];A&&F.push(...A.doors,...A.blockers),P&&F.push(...P.doors,...P.blockers),I&&F.push(...I.doors,...I.blockers),u.forEach(We=>F.push(We)),Ct.forEach(We=>{We.visible&&F.push(We)}),sn.forEach(We=>F.push(We)),En.forEach(We=>{We.visible&&F.push(We)});const z=f.intersectObjects(F,!0)[0];if(!z)return null;const oe=Be.doorOf(z.object);if(oe)return{kind:"door",door:oe};let xe=z.object;for(;xe&&!xe.userData.chemicalId&&!xe.userData.shelfType;)xe=xe.parent;return xe?xe.userData.shelfType?{kind:"apparatus",type:xe.userData.shelfType}:{kind:"chemical",id:xe.userData.chemicalId}:null}function Kn(){const A=bn();if(!A)return!1;if(A.kind==="apparatus")return s("pickApparatus",A.type),!0;if(A.kind==="chemical"){const P=n.sceneObjects.find(I=>{var F;return((F=I.props)==null?void 0:F.chemical_id)===A.id});return P?s("putBack",P.key):s("takeChemical",A.id),!0}return Be.toggleDoor(A.door),!0}const En=new Map,Dt=[];let Xt=null;const Jn=[[{key:"physics",label:"Physics"},{key:"general",label:"General"}],[{key:"chemistry",label:"Chemistry"},{key:"biology",label:"Biology"},{key:"agriculture",label:"Agriculture"}]],Ot=["physics","chemistry","biology","agriculture"];function Vn(A){o.remove(A),A.traverse(P=>{var I;(P instanceof Te||P instanceof Rn)&&((I=P.geometry)==null||I.dispose(),(Array.isArray(P.material)?P.material:[P.material]).forEach(z=>{var oe;(oe=z.map)==null||oe.dispose(),z.dispose()}))})}function fi(){const A=Be==null?void 0:Be.wallCabinets;if(!A)return;En.forEach(Vn),En.clear(),Dt.splice(0).forEach(Vn);const P=n.objectCatalog.filter(F=>F.id>0&&F.is_active!==!1),I=F=>Ot.includes(F.category)?F.category:"general";A.cabinets.forEach((F,z)=>{const oe=Jn[z].map(pt=>({...pt,items:P.filter(st=>I(st)===pt.key).sort((st,ht)=>st.display_name.localeCompare(ht.display_name))})).filter(pt=>pt.items.length>0);let xe=8;const We=()=>oe.flatMap(pt=>{const st=[];for(let ht=0;ht<pt.items.length;ht+=xe)st.push({label:pt.label,items:pt.items.slice(ht,ht+xe)});return st});let nt=We();for(;nt.length>F.rows.length;)xe++,nt=We();const yt=(F.maxX-F.minX)/xe;nt.forEach((pt,st)=>{const ht=F.rows[st];pt.items.forEach((hs,Vu)=>{const Ri=Oo(hs.object_type,`shelf:${hs.object_type}`,hs.display_name,hs.default_props||{}),js=new On;Ri.children.forEach(jn=>{jn instanceof Rn||js.expandByObject(jn)});const qa=js.getSize(new N),uc=js.getCenter(new N),Wi=Math.min(1,yt*.84/Math.max(qa.x,.01),F.rowHeight*.8/Math.max(qa.y,.01),F.depth*.9/Math.max(qa.z,.01));Ri.scale.setScalar(Wi),Ri.position.set(F.minX+yt*(Vu+.5)-uc.x*Wi,ht-js.min.y*Wi,F.z-uc.z*Wi),Ri.children.forEach(jn=>{jn.userData.role==="label"&&(jn.scale.set(.72/Wi,.158/Wi,1),jn.position.y=js.max.y+.2/Wi,jn.visible=!1)}),Ri.traverse(jn=>{jn instanceof Te&&(jn.castShadow=!1)}),Ri.userData.shelfType=hs.object_type,o.add(Ri),En.set(hs.object_type,Ri)}),pn();const Ht=new Te(new Dn(F.maxX-F.minX,.17),new ss({map:Fr(pt.label),toneMapped:!1})),cs=st===F.rows.length-1?F.frontZ+.03*Bo+.005:F.frontZ+.005;Ht.position.set((F.minX+F.maxX)/2,ht-.085,cs),o.add(Ht),Dt.push(Ht)})})}function Fr(A){const P=document.createElement("canvas");P.width=1024,P.height=64;const I=P.getContext("2d"),F=I.createLinearGradient(0,0,0,64);F.addColorStop(0,"#f6d98b"),F.addColorStop(1,"#c9962f"),I.fillStyle=F,I.fillRect(0,0,1024,64),I.fillStyle="#3b2606",I.font="bold 50px sans-serif",I.textBaseline="middle",I.fillText(A.toUpperCase(),24,35);const z=new wr(P);return z.colorSpace=hn,z.anisotropy=8,z}dr(()=>n.objectCatalog.map(A=>A.object_type).join(","),()=>{Be&&fi()});const Fu=qu(()=>{var A,P;return!!((P=(A=n.sceneObjects.find(I=>I.key===_.value))==null?void 0:A.props)!=null&&P.chemical_id)});function Ou(){const A=_.value;A&&(Gi(),s("putBack",A))}function Bu(){if(!Be)return;const A=Bo,P=Be.benchLength/2,I=Be.wallCabinets?new On(new N(-(P+.25)*A,-.9*A,-.6*A),new N((P+.25)*A,1.4*A,.375*A)):new On(new N(-P*A,-.9*A,-.375*A),new N(P*A,.1*A,.375*A));Be.fitBox(I,Be.wallCabinets?.94:.72,{dir:new N(.4,Be.wallCabinets?3.4:4.2,6.4)})}function cc(){if(!Be||u.size===0)return;o.updateMatrixWorld(!0);const A=new On;u.forEach(P=>P.children.forEach(I=>{I.userData.role!=="label"&&A.expandByObject(I)})),Be.frameBox(A)}function hc(A){if(M)return;H(A),Vt.value=J();const P=Vt.value?null:bn();dn=(P==null?void 0:P.kind)==="chemical"?P.id:null,Xt=(P==null?void 0:P.kind)==="apparatus"?P.type:null,l.domElement.style.cursor=Vt.value||P?"pointer":"grab"}function zu(A,P){(P.state==="on"||P.state==="off")&&W.set(A,P.state);const I=u.get(A);I&&I.traverse(F=>{if(F.userData.role==="lever"&&"state"in P){const z=P.state==="on"||P.state==="closed";F.rotation.z=z?Math.PI/2-.35:Math.PI/2-.9,F.position.x=z?0:-.06}if(F.userData.role==="led"&&"state"in P&&F instanceof Te){const z=F.material;z.emissiveIntensity=P.state==="on"?1.2:0}if(F.userData.role==="flame"&&"flame"in P&&F instanceof Te){const z=F.material;z.emissiveIntensity=P.flame==="on"?1:0,z.opacity=P.flame==="on"?.9:0}})}e({setObjectState:zu});function ku(){a.value=!1,Yu(Gt)}return Uh(Gt),Fh(()=>{l==null||l.domElement.removeEventListener("pointerdown",K),l==null||l.domElement.removeEventListener("pointermove",Ce),l==null||l.domElement.removeEventListener("pointermove",hc),l==null||l.domElement.removeEventListener("pointerup",Ue),Be==null||Be.dispose(),Be=null}),(A,P)=>(Nt(),It("div",Av,[a.value?(Nt(),It("div",Rv,[fc(Zu,{name:"beaker",class:"w-8 h-8"}),P[9]||(P[9]=$e("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),$e("button",{onClick:ku,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(Nt(),It("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),G.value.length>0?(Nt(),It("div",{key:2,class:Qs(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||x.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[P[10]||(P[10]=$e("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),$e("div",Cv,[(Nt(!0),It(us,null,Or(G.value,I=>{var F,z;return Nt(),It("button",{key:I.key,onClick:oe=>se(I.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[$e("span",null,Yt(((F=C().get(I.object_type))==null?void 0:F.icon)||"🔬"),1),$e("span",Dv,Yt(((z=C().get(I.object_type))==null?void 0:z.display_name)||I.object_type),1)],8,Pv)}),128))])],2)):ln("",!0),_.value&&!m.value?(Nt(),It("div",Lv,[$e("div",Iv,[$e("p",Nv,Yt(T.value),1),$e("button",{onClick:Gi,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),$e("div",Uv,[(Nt(!0),It(us,null,Or(v.value,I=>(Nt(),It("button",{key:I,onClick:F=>Nr(I),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},Yt(E(I)),9,Fv))),128)),i.cupboard?(Nt(),It("button",{key:0,onClick:Ou,class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-transform"},Yt(Fu.value?"Put Back in Cupboard":"Put Back on Shelf"),1)):ln("",!0)]),S.value&&X.value==="readonly"?(Nt(),It("div",Ov,[P[11]||(P[11]=$e("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),$e("div",Bv,[$e("span",zv,[Br(Yt(Y.value),1),$e("span",kv,Yt(he.value),1)]),$e("button",{onClick:Ur,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):ln("",!0),S.value&&X.value==="slider"?(Nt(),It("div",Vv,[$e("p",Hv,"Reading: "+Yt(Math.round(Ie.value))+Yt(he.value),1),dc($e("input",{"onUpdate:modelValue":P[0]||(P[0]=I=>Ie.value=I),type:"range",min:"0",max:ft.value,step:"1",class:"w-full accent-emerald-600"},null,8,Gv),[[pc,Ie.value,void 0,{number:!0}]]),$e("button",{onClick:Ur,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):ln("",!0),D.value==="battery"?(Nt(),It("div",Wv,[P[12]||(P[12]=$e("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),$e("div",Xv,[(Nt(),It(us,null,Or([1.5,3,6,9,12],I=>$e("button",{key:I,onClick:F=>ls(I),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",U.value===I?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},Yt(I)+"V",11,qv)),64))])])):ln("",!0),D.value==="stopwatch"?(Nt(),It("div",Yv,[$e("p",Zv,"Elapsed: "+Yt($s.value),1),$e("button",{onClick:P[1]||(P[1]=I=>Lr(_.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):ln("",!0),D.value==="microscope"?(Nt(),It("div",$v,[Ae.value?(Nt(),It(us,{key:1},[$e("div",null,[P[13]||(P[13]=$e("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),$e("div",Jv,[(Nt(),It(us,null,Or([40,100,400],I=>$e("button",{key:I,onClick:F=>et(I),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",fe.value===I?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+Yt(I),11,jv)),64))])]),$e("div",null,[$e("p",Qv,"Coarse Focus: "+Yt(Math.round(je.value)),1),$e("input",{value:je.value,onChange:P[2]||(P[2]=I=>at(Number(I.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,ex)]),$e("div",tx,[P[14]||(P[14]=$e("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),$e("div",nx,[$e("button",{onClick:P[3]||(P[3]=I=>k(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),$e("button",{onClick:P[4]||(P[4]=I=>k(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),_e.value?(Nt(),It("div",ix,[P[16]||(P[16]=$e("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),$e("div",sx,[$e("div",{class:"absolute inset-0 flex items-center justify-center",style:Gu({filter:`blur(${vt[ge.value]}px)`})},[...P[15]||(P[15]=[$e("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),$e("p",rx,Yt(ge.value.replace("_"," "))+" · ×"+Yt(fe.value),1)])):ln("",!0)],64)):(Nt(),It("div",Kv,"Place a specimen slide on the stage first."))])):ln("",!0),D.value==="spring"?(Nt(),It("div",ax,[$e("p",ox,"Attached Load: "+Yt(rt.value)+" g · Extension: "+Yt(tt.value)+" cm",1),O.value?(Nt(),It("p",lx,"Beyond the spring's safe extension limit.")):ln("",!0)])):ln("",!0),D.value==="protractor"?(Nt(),It("div",cx,[P[17]||(P[17]=$e("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),$e("div",hx,[$e("button",{onClick:P[5]||(P[5]=I=>R("incidence")),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",me.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),$e("button",{onClick:P[6]||(P[6]=I=>R("outgoing")),class:Qs(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",me.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):ln("",!0)])):ln("",!0),m.value&&!x.value?(Nt(),It("div",ux,[$e("span",fx,Yt(kn.value),1),$e("span",dx,[m.value==="move"||m.value==="rotate"?(Nt(),It("button",{key:0,onClick:Xa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):ln("",!0),$e("button",{onClick:Wa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):ln("",!0),x.value?(Nt(),It("div",px,[$e("p",mx,"Pouring "+Yt(x.value.fromLabel)+" → "+Yt(x.value.toLabel),1),$e("p",gx,[Br(Yt(Math.round(x.value.amount))+" ",1),P[18]||(P[18]=$e("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),dc($e("input",{"onUpdate:modelValue":P[7]||(P[7]=I=>x.value.amount=I),type:"range",min:"0",max:x.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,_x),[[pc,x.value.amount,void 0,{number:!0}]]),$e("div",{class:"flex items-center gap-2 mt-2"},[$e("button",{onClick:Ze,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),$e("button",{onClick:Ye,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):ln("",!0),fc(Wu,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:Xu(()=>[Ne.value?(Nt(),It("div",vx,Yt(Ne.value),1)):ln("",!0)]),_:1}),d.value?(Nt(),It("div",xx,[$e("div",yx,[$e("p",Mx,Yt(d.value),1),$e("button",{onClick:P[8]||(P[8]=I=>d.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):ln("",!0),$e("p",Sx,[P[19]||(P[19]=Br(" Drag to orbit · Scroll to zoom · Click equipment to interact",-1)),i.cupboard||i.wallShelves?(Nt(),It(us,{key:0},[Br(" · Click a door to open it")],64)):ln("",!0)])]))}});export{hn as A,Rt as B,te as C,Jt as D,Fl as E,Fa as F,Zt as G,xu as H,Oo as I,id as L,Te as M,$_ as O,xi as P,Ql as Q,Kd as R,Wt as S,qt as T,N as V,Y_ as W,Rx as _,wv as a,Tv as b,Ev as c,hv as d,Pr as e,de as f,Cr as g,Ki as h,ss as i,nn as j,Ax as k,ic as l,ru as m,ts as n,Zn as o,Su as p,Dn as q,ut as r,vv as s,vi as t,Tx as u,j as v,lu as w,_u as x,Qh as y,Cn as z};
