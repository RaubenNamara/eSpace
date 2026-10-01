import{Q as qr,o as oh,m as lh,r as xt,d as iu,c as Nt,A as Ol,a as Xe,f as Ds,F as Ls,k as dr,e as on,t as Wt,C as Bl,g as zl,p as kl,x as su,z as ru,T as au,n as ou,j as Ut}from"./index-DP18QKtn.js";import{_ as lu}from"./AppIcon.vue_vue_type_script_setup_true_lang-4Ert8HBa.js";function Uv(){const i=xt(!1);async function e(){var r,a;i.value=!0;try{await((a=(r=document.documentElement).requestFullscreen)==null?void 0:a.call(r,{navigationUI:"hide"}))}catch{}}function t(){i.value=!1,document.fullscreenElement&&document.exitFullscreen().catch(()=>{})}function n(){!document.fullscreenElement&&i.value&&(i.value=!1)}function s(r){r.key==="Escape"&&i.value&&t()}return qr(i,r=>{document.body.style.overflow=r?"hidden":""}),oh(()=>{document.addEventListener("fullscreenchange",n),window.addEventListener("keydown",s)}),lh(()=>{document.removeEventListener("fullscreenchange",n),window.removeEventListener("keydown",s),i.value&&t(),document.body.style.overflow=""}),{labMaximized:i,enterMaximize:e,exitMaximize:t}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ll="185",ms={ROTATE:0,DOLLY:1,PAN:2},fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cu=0,Vl=1,hu=2,$s=1,uu=2,qs=3,bi=0,mn=1,qt=2,si=0,gs=1,Gl=2,Hl=3,Wl=4,fu=5,Li=100,du=101,pu=102,mu=103,gu=104,_u=200,vu=201,xu=202,Mu=203,po=204,mo=205,yu=206,Su=207,bu=208,Eu=209,wu=210,Tu=211,Au=212,Ru=213,Cu=214,go=0,_o=1,vo=2,Ms=3,xo=4,Mo=5,yo=6,So=7,cl=0,Pu=1,Du=2,Yn=0,ch=1,hh=2,uh=3,hl=4,fh=5,dh=6,ph=7,mh=300,Bi=301,ys=302,Ea=303,wa=304,_a=306,ri=1e3,ii=1001,bo=1002,rn=1003,Lu=1004,pr=1005,un=1006,Ta=1007,Ui=1008,yn=1009,gh=1010,_h=1011,er=1012,ul=1013,Zn=1014,Nn=1015,ci=1016,fl=1017,dl=1018,tr=1020,vh=35902,xh=35899,Mh=1021,yh=1022,Un=1023,hi=1026,Fi=1027,pl=1028,ml=1029,zi=1030,gl=1031,_l=1033,Zr=33776,Kr=33777,Jr=33778,$r=33779,Eo=35840,wo=35841,To=35842,Ao=35843,Ro=36196,Co=37492,Po=37496,Do=37488,Lo=37489,ea=37490,Io=37491,No=37808,Uo=37809,Fo=37810,Oo=37811,Bo=37812,zo=37813,ko=37814,Vo=37815,Go=37816,Ho=37817,Wo=37818,Xo=37819,Yo=37820,qo=37821,Zo=36492,Ko=36494,Jo=36495,$o=36283,Qo=36284,ta=36285,jo=36286,Iu=3200,na=0,Nu=1,yi="",hn="srgb",ia="srgb-linear",sa="linear",Ct="srgb",Xi=7680,Xl=519,Uu=512,Fu=513,Ou=514,vl=515,Bu=516,zu=517,xl=518,ku=519,el=35044,Yl="300 es",Xn=2e3,nr=2001;function Vu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ra(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gu(){const i=ra("canvas");return i.style.display="block",i}const ql={};function aa(...i){const e="THREE."+i.shift();console.log(e,...i)}function Sh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function tt(...i){i=Sh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function _t(...i){i=Sh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function _s(...i){const e=i.join(" ");e in ql||(ql[e]=!0,tt(...i))}function Hu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Wu={[go]:_o,[vo]:yo,[xo]:So,[Ms]:Mo,[_o]:go,[yo]:vo,[So]:xo,[Mo]:Ms};class Ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qr=Math.PI/180,tl=180/Math.PI;function ai(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]).toLowerCase()}function ut(i,e,t){return Math.max(e,Math.min(t,i))}function Xu(i,e){return(i%e+e)%e}function Aa(i,e,t){return(1-t)*i+t*e}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Yu={DEG2RAD:Qr},Ll=class Ll{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ll.prototype.isVector2=!0;let J=Ll;class ui{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,c){let o=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(u!==v||o!==f||l!==d||h!==g){let m=o*f+l*d+h*g+u*v;m<0&&(f=-f,d=-d,g=-g,v=-v,m=-m);let p=1-c;if(m<.9995){const y=Math.acos(m),S=Math.sin(y);p=Math.sin(p*y)/S,c=Math.sin(c*y)/S,o=o*p+f*c,l=l*p+d*c,h=h*p+g*c,u=u*p+v*c}else{o=o*p+f*c,l=l*p+d*c,h=h*p+g*c,u=u*p+v*c;const y=1/Math.sqrt(o*o+l*l+h*h+u*u);o*=y,l*=y,h*=y,u*=y}}e[t]=o,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const c=n[s],o=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return e[t]=c*g+h*u+o*d-l*f,e[t+1]=o*g+h*f+l*u-c*d,e[t+2]=l*g+h*d+c*f-o*u,e[t+3]=h*g-c*u-o*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,c=Math.cos,o=Math.sin,l=c(n/2),h=c(s/2),u=c(r/2),f=o(n/2),d=o(s/2),g=o(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:tt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],c=t[5],o=t[9],l=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-o)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>c&&n>u){const d=2*Math.sqrt(1+n-c-u);this._w=(h-o)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(c>u){const d=2*Math.sqrt(1+c-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(o+h)/d}else{const d=2*Math.sqrt(1+u-n-c);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(o+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,c=t._x,o=t._y,l=t._z,h=t._w;return this._x=n*h+a*c+s*l-r*o,this._y=s*h+a*o+r*c-n*l,this._z=r*h+a*l+n*o-s*c,this._w=a*h-n*c-s*o-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,s=-s,r=-r,a=-a,c=-c);let o=1-t;if(c<.9995){const l=Math.acos(c),h=Math.sin(l);o=Math.sin(o*l)/h,t=Math.sin(t*l)/h,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+r*t,this._w=this._w*o+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Il=class Il{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,c=e.z,o=e.w,l=2*(a*s-c*n),h=2*(c*t-r*s),u=2*(r*n-a*t);return this.x=t+o*l+a*u-c*h,this.y=n+o*h+c*l-r*u,this.z=s+o*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,c=t.y,o=t.z;return this.x=s*o-r*c,this.y=r*a-n*o,this.z=n*c-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ra.copy(this).projectOnVector(e),this.sub(Ra)}reflect(e){return this.sub(Ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Il.prototype.isVector3=!0;let L=Il;const Ra=new L,Zl=new ui,Nl=class Nl{constructor(e,t,n,s,r,a,c,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l)}set(e,t,n,s,r,a,c,o,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[3],o=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],v=s[0],m=s[3],p=s[6],y=s[1],S=s[4],M=s[7],T=s[2],E=s[5],C=s[8];return r[0]=a*v+c*y+o*T,r[3]=a*m+c*S+o*E,r[6]=a*p+c*M+o*C,r[1]=l*v+h*y+u*T,r[4]=l*m+h*S+u*E,r[7]=l*p+h*M+u*C,r[2]=f*v+d*y+g*T,r[5]=f*m+d*S+g*E,r[8]=f*p+d*M+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8];return t*a*h-t*c*l-n*r*h+n*c*o+s*r*l-s*a*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],u=h*a-c*l,f=c*o-h*r,d=l*r-a*o,g=t*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*l-h*n)*v,e[2]=(c*n-s*a)*v,e[3]=f*v,e[4]=(h*t-s*o)*v,e[5]=(s*r-c*t)*v,e[6]=d*v,e[7]=(n*o-l*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,c){const o=Math.cos(r),l=Math.sin(r);return this.set(n*o,n*l,-n*(o*a+l*c)+a+e,-s*l,s*o,-s*(-l*a+o*c)+c+t,0,0,1),this}scale(e,t){return _s("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ca.makeScale(e,t)),this}rotate(e){return _s("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ca.makeRotation(-e)),this}translate(e,t){return _s("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Nl.prototype.isMatrix3=!0;let ct=Nl;const Ca=new ct,Kl=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jl=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qu(){const i={enabled:!0,workingColorSpace:ia,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ct&&(s.r=oi(s.r),s.g=oi(s.g),s.b=oi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ct&&(s.r=vs(s.r),s.g=vs(s.g),s.b=vs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===yi?sa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _s("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _s("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ia]:{primaries:e,whitePoint:n,transfer:sa,toXYZ:Kl,fromXYZ:Jl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:Ct,toXYZ:Kl,fromXYZ:Jl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const Mt=qu();function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yi;class Zu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yi===void 0&&(Yi=ra("canvas")),Yi.width=e.width,Yi.height=e.height;const s=Yi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Yi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ra("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=oi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return tt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ku=0;class Ml{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,c=s.length;a<c;a++)s[a].isDataTexture?r.push(Pa(s[a].image)):r.push(Pa(s[a]))}else r=Pa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Pa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(tt("Texture: Unable to serialize Texture."),{})}let Ju=0;const Da=new L;class fn extends Ei{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,n=ii,s=ii,r=un,a=Ui,c=Un,o=yn,l=fn.DEFAULT_ANISOTROPY,h=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=ai(),this.name="",this.source=new Ml(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=c,this.internalFormat=null,this.type=o,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Da).x}get height(){return this.source.getSize(Da).y}get depth(){return this.source.getSize(Da).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){tt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){tt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ri:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case bo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ri:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case bo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=mh;fn.DEFAULT_ANISOTROPY=1;const Ul=class Ul{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const o=e.elements,l=o[0],h=o[4],u=o[8],f=o[1],d=o[5],g=o[9],v=o[2],m=o[6],p=o[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,M=(d+1)/2,T=(p+1)/2,E=(h+f)/4,C=(u+v)/4,_=(g+m)/4;return S>M&&S>T?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=E/n,r=C/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=E/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=_/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-v)/y,this.z=(f-h)/y,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ul.prototype.isVector4=!0;let Gt=Ul;class $u extends Ei{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Gt(0,0,e,t),this.scissorTest=!1,this.viewport=new Gt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new fn(s),a=n.count;for(let c=0;c<a;c++)this.textures[c]=r.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ml(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends $u{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class bh extends fn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=rn,this.minFilter=rn,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qu extends fn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=rn,this.minFilter=rn,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ga=class ga{constructor(e,t,n,s,r,a,c,o,l,h,u,f,d,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,c,o,l,h,u,f,d,g,v,m)}set(e,t,n,s,r,a,c,o,l,h,u,f,d,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=c,p[13]=o,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ga().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/qi.setFromMatrixColumn(e,0).length(),r=1/qi.setFromMatrixColumn(e,1).length(),a=1/qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),c=Math.sin(n),o=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,d=a*u,g=c*h,v=c*u;t[0]=o*h,t[4]=-o*u,t[8]=l,t[1]=d+g*l,t[5]=f-v*l,t[9]=-c*o,t[2]=v-f*l,t[6]=g+d*l,t[10]=a*o}else if(e.order==="YXZ"){const f=o*h,d=o*u,g=l*h,v=l*u;t[0]=f+v*c,t[4]=g*c-d,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-c,t[2]=d*c-g,t[6]=v+f*c,t[10]=a*o}else if(e.order==="ZXY"){const f=o*h,d=o*u,g=l*h,v=l*u;t[0]=f-v*c,t[4]=-a*u,t[8]=g+d*c,t[1]=d+g*c,t[5]=a*h,t[9]=v-f*c,t[2]=-a*l,t[6]=c,t[10]=a*o}else if(e.order==="ZYX"){const f=a*h,d=a*u,g=c*h,v=c*u;t[0]=o*h,t[4]=g*l-d,t[8]=f*l+v,t[1]=o*u,t[5]=v*l+f,t[9]=d*l-g,t[2]=-l,t[6]=c*o,t[10]=a*o}else if(e.order==="YZX"){const f=a*o,d=a*l,g=c*o,v=c*l;t[0]=o*h,t[4]=v-f*u,t[8]=g*u+d,t[1]=u,t[5]=a*h,t[9]=-c*h,t[2]=-l*h,t[6]=d*u+g,t[10]=f-v*u}else if(e.order==="XZY"){const f=a*o,d=a*l,g=c*o,v=c*l;t[0]=o*h,t[4]=-u,t[8]=l*h,t[1]=f*u+v,t[5]=a*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=c*h,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ju,e,ef)}lookAt(e,t,n){const s=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),di.crossVectors(n,_n),di.lengthSq()===0&&(Math.abs(n.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),di.crossVectors(n,_n)),di.normalize(),mr.crossVectors(_n,di),s[0]=di.x,s[4]=mr.x,s[8]=_n.x,s[1]=di.y,s[5]=mr.y,s[9]=_n.y,s[2]=di.z,s[6]=mr.z,s[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],c=n[4],o=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],v=n[6],m=n[10],p=n[14],y=n[3],S=n[7],M=n[11],T=n[15],E=s[0],C=s[4],_=s[8],w=s[12],P=s[1],N=s[5],B=s[9],Q=s[13],j=s[2],z=s[6],Z=s[10],X=s[14],re=s[3],de=s[7],me=s[11],ge=s[15];return r[0]=a*E+c*P+o*j+l*re,r[4]=a*C+c*N+o*z+l*de,r[8]=a*_+c*B+o*Z+l*me,r[12]=a*w+c*Q+o*X+l*ge,r[1]=h*E+u*P+f*j+d*re,r[5]=h*C+u*N+f*z+d*de,r[9]=h*_+u*B+f*Z+d*me,r[13]=h*w+u*Q+f*X+d*ge,r[2]=g*E+v*P+m*j+p*re,r[6]=g*C+v*N+m*z+p*de,r[10]=g*_+v*B+m*Z+p*me,r[14]=g*w+v*Q+m*X+p*ge,r[3]=y*E+S*P+M*j+T*re,r[7]=y*C+S*N+M*z+T*de,r[11]=y*_+S*B+M*Z+T*me,r[15]=y*w+S*Q+M*X+T*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],c=e[5],o=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],v=e[7],m=e[11],p=e[15],y=o*d-l*f,S=c*d-l*u,M=c*f-o*u,T=a*d-l*h,E=a*f-o*h,C=a*u-c*h;return t*(v*y-m*S+p*M)-n*(g*y-m*T+p*E)+s*(g*S-v*T+p*C)-r*(g*M-v*E+m*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],c=e[9],o=e[2],l=e[6],h=e[10];return t*(a*h-c*l)-n*(r*h-c*o)+s*(r*l-a*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],c=e[5],o=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],v=e[13],m=e[14],p=e[15],y=t*c-n*a,S=t*o-s*a,M=t*l-r*a,T=n*o-s*c,E=n*l-r*c,C=s*l-r*o,_=h*v-u*g,w=h*m-f*g,P=h*p-d*g,N=u*m-f*v,B=u*p-d*v,Q=f*p-d*m,j=y*Q-S*B+M*N+T*P-E*w+C*_;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/j;return e[0]=(c*Q-o*B+l*N)*z,e[1]=(s*B-n*Q-r*N)*z,e[2]=(v*C-m*E+p*T)*z,e[3]=(f*E-u*C-d*T)*z,e[4]=(o*P-a*Q-l*w)*z,e[5]=(t*Q-s*P+r*w)*z,e[6]=(m*M-g*C-p*S)*z,e[7]=(h*C-f*M+d*S)*z,e[8]=(a*B-c*P+l*_)*z,e[9]=(n*P-t*B-r*_)*z,e[10]=(g*E-v*M+p*y)*z,e[11]=(u*M-h*E-d*y)*z,e[12]=(c*w-a*N-o*_)*z,e[13]=(t*N-n*w+s*_)*z,e[14]=(v*S-g*T-m*y)*z,e[15]=(h*T-u*S+f*y)*z,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,c=e.y,o=e.z,l=r*a,h=r*c;return this.set(l*a+n,l*c-s*o,l*o+s*c,0,l*c+s*o,h*c+n,h*o-s*a,0,l*o-s*c,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,c=t._z,o=t._w,l=r+r,h=a+a,u=c+c,f=r*l,d=r*h,g=r*u,v=a*h,m=a*u,p=c*u,y=o*l,S=o*h,M=o*u,T=n.x,E=n.y,C=n.z;return s[0]=(1-(v+p))*T,s[1]=(d+M)*T,s[2]=(g-S)*T,s[3]=0,s[4]=(d-M)*E,s[5]=(1-(f+p))*E,s[6]=(m+y)*E,s[7]=0,s[8]=(g+S)*C,s[9]=(m-y)*C,s[10]=(1-(f+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=qi.set(s[0],s[1],s[2]).length();const c=qi.set(s[4],s[5],s[6]).length(),o=qi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Cn.copy(this);const l=1/a,h=1/c,u=1/o;return Cn.elements[0]*=l,Cn.elements[1]*=l,Cn.elements[2]*=l,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=u,Cn.elements[9]*=u,Cn.elements[10]*=u,t.setFromRotationMatrix(Cn),n.x=a,n.y=c,n.z=o,this}makePerspective(e,t,n,s,r,a,c=Xn,o=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let g,v;if(o)g=r/(a-r),v=a*r/(a-r);else if(c===Xn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(c===nr)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,c=Xn,o=!1){const l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s);let g,v;if(o)g=1/(a-r),v=a/(a-r);else if(c===Xn)g=-2/(a-r),v=-(a+r)/(a-r);else if(c===nr)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ga.prototype.isMatrix4=!0;let Pt=ga;const qi=new L,Cn=new Pt,ju=new L(0,0,0),ef=new L(1,1,1),di=new L,mr=new L,_n=new L,$l=new Pt,Ql=new ui;class fi{constructor(e=0,t=0,n=0,s=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],c=s[8],o=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,d),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(c,d));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(c,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:tt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $l.makeRotationFromQuaternion(e),this.setFromRotationMatrix($l,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ql.setFromEuler(this),this.setFromQuaternion(Ql,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class yl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tf=0;const jl=new L,Zi=new ui,$n=new Pt,gr=new L,Is=new L,nf=new L,sf=new ui,ec=new L(1,0,0),tc=new L(0,1,0),nc=new L(0,0,1),ic={type:"added"},rf={type:"removed"},Ki={type:"childadded",child:null},La={type:"childremoved",child:null};class Zt extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zt.DEFAULT_UP.clone();const e=new L,t=new fi,n=new ui,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Pt},normalMatrix:{value:new ct}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=Zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(ec,e)}rotateY(e){return this.rotateOnAxis(tc,e)}rotateZ(e){return this.rotateOnAxis(nc,e)}translateOnAxis(e,t){return jl.copy(e).applyQuaternion(this.quaternion),this.position.add(jl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ec,e)}translateY(e){return this.translateOnAxis(tc,e)}translateZ(e){return this.translateOnAxis(nc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gr.copy(e):gr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Is,gr,this.up):$n.lookAt(gr,Is,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix($n),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(_t("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ic),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null):_t("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rf),La.child=e,this.dispatchEvent(La),La.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ic),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,e,nf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,sf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,c=r.length;a<c;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>({...c})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(c,o){return c[o.uuid]===void 0&&(c[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const o=c.shapes;if(Array.isArray(o))for(let l=0,h=o.length;l<h;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let o=0,l=this.material.length;o<l;o++)c.push(r(e.materials,this.material[o]));s.material=c}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const o=this.animations[c];s.animations.push(r(e.animations,o))}}if(t){const c=a(e.geometries),o=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(c){const o=[];for(const l in c){const h=c[l];delete h.metadata,o.push(h)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Zt.DEFAULT_UP=new L(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class $t extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const af={type:"move"};class Ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const c=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(af)))}return c!==null&&(c.visible=s!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},_r={h:0,s:0,l:0};function Na(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ht{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Mt.workingColorSpace){if(e=Xu(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Na(a,r,e+1/3),this.g=Na(a,r,e),this.b=Na(a,r,e-1/3)}return Mt.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&tt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],c=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:tt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);tt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=Eh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):tt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return Mt.workingToColorSpace(cn.copy(this),e),Math.round(ut(cn.r*255,0,255))*65536+Math.round(ut(cn.g*255,0,255))*256+Math.round(ut(cn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(cn.copy(this),t);const n=cn.r,s=cn.g,r=cn.b,a=Math.max(n,s,r),c=Math.min(n,s,r);let o,l;const h=(c+a)/2;if(c===a)o=0,l=0;else{const u=a-c;switch(l=h<=.5?u/(a+c):u/(2-a-c),a){case n:o=(s-r)/u+(s<r?6:0);break;case s:o=(r-n)/u+2;break;case r:o=(n-s)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=h,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=hn){Mt.workingToColorSpace(cn.copy(this),e);const t=cn.r,n=cn.g,s=cn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(pi),this.setHSL(pi.h+e,pi.s+t,pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(pi),e.getHSL(_r);const n=Aa(pi.h,_r.h,t),s=Aa(pi.s,_r.s,t),r=Aa(pi.l,_r.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const cn=new ht;ht.NAMES=Eh;class oa{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ht(e),this.near=t,this.far=n}clone(){return new oa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class wh extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Pn=new L,Qn=new L,Ua=new L,jn=new L,Ji=new L,$i=new L,sc=new L,Fa=new L,Oa=new L,Ba=new L,za=new Gt,ka=new Gt,Va=new Gt;class wn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Pn.subVectors(e,t),s.cross(Pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Pn.subVectors(s,t),Qn.subVectors(n,t),Ua.subVectors(e,t);const a=Pn.dot(Pn),c=Pn.dot(Qn),o=Pn.dot(Ua),l=Qn.dot(Qn),h=Qn.dot(Ua),u=a*l-c*c;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*o-c*h)*f,g=(a*h-c*o)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,s,r,a,c,o){return this.getBarycoord(e,t,n,s,jn)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,jn.x),o.addScaledVector(a,jn.y),o.addScaledVector(c,jn.z),o)}static getInterpolatedAttribute(e,t,n,s,r,a){return za.setScalar(0),ka.setScalar(0),Va.setScalar(0),za.fromBufferAttribute(e,t),ka.fromBufferAttribute(e,n),Va.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(za,r.x),a.addScaledVector(ka,r.y),a.addScaledVector(Va,r.z),a}static isFrontFacing(e,t,n,s){return Pn.subVectors(n,t),Qn.subVectors(e,t),Pn.cross(Qn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Pn.cross(Qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return wn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,c;Ji.subVectors(s,n),$i.subVectors(r,n),Fa.subVectors(e,n);const o=Ji.dot(Fa),l=$i.dot(Fa);if(o<=0&&l<=0)return t.copy(n);Oa.subVectors(e,s);const h=Ji.dot(Oa),u=$i.dot(Oa);if(h>=0&&u<=h)return t.copy(s);const f=o*u-h*l;if(f<=0&&o>=0&&h<=0)return a=o/(o-h),t.copy(n).addScaledVector(Ji,a);Ba.subVectors(e,r);const d=Ji.dot(Ba),g=$i.dot(Ba);if(g>=0&&d<=g)return t.copy(r);const v=d*l-o*g;if(v<=0&&l>=0&&g<=0)return c=l/(l-g),t.copy(n).addScaledVector($i,c);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return sc.subVectors(r,s),c=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector(sc,c);const p=1/(m+v+f);return a=v*p,c=f*p,t.copy(n).addScaledVector(Ji,a).addScaledVector($i,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Kn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=r.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vr.copy(n.boundingBox)),vr.applyMatrix4(e.matrixWorld),this.union(vr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ns),xr.subVectors(this.max,Ns),Qi.subVectors(e.a,Ns),ji.subVectors(e.b,Ns),es.subVectors(e.c,Ns),mi.subVectors(ji,Qi),gi.subVectors(es,ji),Ri.subVectors(Qi,es);let t=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Ri.z,Ri.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Ri.z,0,-Ri.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Ri.y,Ri.x,0];return!Ga(t,Qi,ji,es,xr)||(t=[1,0,0,0,1,0,0,0,1],!Ga(t,Qi,ji,es,xr))?!1:(Mr.crossVectors(mi,gi),t=[Mr.x,Mr.y,Mr.z],Ga(t,Qi,ji,es,xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ei=[new L,new L,new L,new L,new L,new L,new L,new L],Dn=new L,vr=new Kn,Qi=new L,ji=new L,es=new L,mi=new L,gi=new L,Ri=new L,Ns=new L,xr=new L,Mr=new L,Ci=new L;function Ga(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ci.fromArray(i,r);const c=s.x*Math.abs(Ci.x)+s.y*Math.abs(Ci.y)+s.z*Math.abs(Ci.z),o=e.dot(Ci),l=t.dot(Ci),h=n.dot(Ci);if(Math.max(-Math.max(o,l,h),Math.min(o,l,h))>c)return!1}return!0}const Xt=new L,yr=new J;let of=0;class Tn extends Ei{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:of++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=el,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXY(t,yr.x,yr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==el&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Th extends Tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ah extends Tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class vt extends Tn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const lf=new Kn,Us=new L,Ha=new L;class ws{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):lf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);const t=Us.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Us,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add(Ha)),this.expandByPoint(Us.copy(e.center).sub(Ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let cf=0;const bn=new Pt,Wa=new Zt,ts=new L,vn=new Kn,Fs=new Kn,sn=new L;class Kt extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vu(e)?Ah:Th)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return Wa.lookAt(e),Wa.updateMatrix(),this.applyMatrix4(Wa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new vt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&tt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];vn.setFromBufferAttribute(r),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&_t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const c=t[r];Fs.setFromBufferAttribute(c),this.morphTargetsRelative?(sn.addVectors(vn.min,Fs.min),vn.expandByPoint(sn),sn.addVectors(vn.max,Fs.max),vn.expandByPoint(sn)):(vn.expandByPoint(Fs.min),vn.expandByPoint(Fs.max))}vn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)sn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(sn));if(t)for(let r=0,a=t.length;r<a;r++){const c=t[r],o=this.morphTargetsRelative;for(let l=0,h=c.count;l<h;l++)sn.fromBufferAttribute(c,l),o&&(ts.fromBufferAttribute(e,l),sn.add(ts)),s=Math.max(s,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&_t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){_t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Tn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],o=[];for(let _=0;_<n.count;_++)c[_]=new L,o[_]=new L;const l=new L,h=new L,u=new L,f=new J,d=new J,g=new J,v=new L,m=new L;function p(_,w,P){l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,P),f.fromBufferAttribute(r,_),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,P),h.sub(l),u.sub(l),d.sub(f),g.sub(f);const N=1/(d.x*g.y-g.x*d.y);isFinite(N)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(N),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(N),c[_].add(v),c[w].add(v),c[P].add(v),o[_].add(m),o[w].add(m),o[P].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,w=y.length;_<w;++_){const P=y[_],N=P.start,B=P.count;for(let Q=N,j=N+B;Q<j;Q+=3)p(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const S=new L,M=new L,T=new L,E=new L;function C(_){T.fromBufferAttribute(s,_),E.copy(T);const w=c[_];S.copy(w),S.sub(T.multiplyScalar(T.dot(w))).normalize(),M.crossVectors(E,w);const N=M.dot(o[_])<0?-1:1;a.setXYZW(_,S.x,S.y,S.z,N)}for(let _=0,w=y.length;_<w;++_){const P=y[_],N=P.start,B=P.count;for(let Q=N,j=N+B;Q<j;Q+=3)C(e.getX(Q+0)),C(e.getX(Q+1)),C(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,a=new L,c=new L,o=new L,l=new L,h=new L,u=new L;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),c.fromBufferAttribute(n,g),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),c.add(h),o.add(h),l.add(h),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(c,o){const l=c.array,h=c.itemSize,u=c.normalized,f=new l.constructor(o.length*h);let d=0,g=0;for(let v=0,m=o.length;v<m;v++){c.isInterleavedBufferAttribute?d=o[v]*c.data.stride+c.offset:d=o[v]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Tn(f,h,u)}if(this.index===null)return tt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,n=this.index.array,s=this.attributes;for(const c in s){const o=s[c],l=e(o,n);t.setAttribute(c,l)}const r=this.morphAttributes;for(const c in r){const o=[],l=r[c];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=e(f,n);o.push(d)}t.morphAttributes[c]=o}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,o=a.length;c<o;c++){const l=a[c];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const l=n[o];e.data.attributes[o]=l.toJSON(e.data)}const s={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[o]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=el,this.updateRanges=[],this.version=0,this.uuid=ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const dn=new L;class la{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyMatrix4(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyNormalMatrix(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.transformDirection(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){aa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Tn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new la(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){aa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let uf=0;class wi extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=ai(),this.name="",this.type="Material",this.blending=gs,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=po,this.blendDst=mo,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xi,this.stencilZFail=Xi,this.stencilZPass=Xi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){tt(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){tt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==po&&(n.blendSrc=this.blendSrc),this.blendDst!==mo&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const c in r){const o=r[c];delete o.metadata,a.push(o)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ht().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new J().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new J().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xs extends wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ns;const Os=new L,is=new L,ss=new L,rs=new J,Bs=new J,Rh=new Pt,Sr=new L,zs=new L,br=new L,rc=new J,Xa=new J,ac=new J;class Fn extends Zt{constructor(e=new xs){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new Kt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new hf(t,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new la(n,3,0,!1)),ns.setAttribute("uv",new la(n,2,3,!1))}this.geometry=ns,this.material=e,this.center=new J(.5,.5),this.count=1}raycast(e,t){e.camera===null&&_t('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),Rh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Er(Sr.set(-.5,-.5,0),ss,a,is,s,r),Er(zs.set(.5,-.5,0),ss,a,is,s,r),Er(br.set(.5,.5,0),ss,a,is,s,r),rc.set(0,0),Xa.set(1,0),ac.set(1,1);let c=e.ray.intersectTriangle(Sr,zs,br,!1,Os);if(c===null&&(Er(zs.set(-.5,.5,0),ss,a,is,s,r),Xa.set(0,1),c=e.ray.intersectTriangle(Sr,br,zs,!1,Os),c===null))return;const o=e.ray.origin.distanceTo(Os);o<e.near||o>e.far||t.push({distance:o,point:Os.clone(),uv:wn.getInterpolation(Os,Sr,zs,br,rc,Xa,ac,new J),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Er(i,e,t,n,s,r){rs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Bs.x=r*rs.x-s*rs.y,Bs.y=s*rs.x+r*rs.y):Bs.copy(rs),i.copy(e),i.x+=Bs.x,i.y+=Bs.y,i.applyMatrix4(Rh)}const ti=new L,Ya=new L,wr=new L,_i=new L,qa=new L,Tr=new L,Za=new L;class va{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ya.copy(e).add(t).multiplyScalar(.5),wr.copy(t).sub(e).normalize(),_i.copy(this.origin).sub(Ya);const r=e.distanceTo(t)*.5,a=-this.direction.dot(wr),c=_i.dot(this.direction),o=-_i.dot(wr),l=_i.lengthSq(),h=Math.abs(1-a*a);let u,f,d,g;if(h>0)if(u=a*o-c,f=a*c-o,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,d=u*(u+a*f+2*c)+f*(a*u+f+2*o)+l}else f=r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;else f=-r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;else f<=-g?(u=Math.max(0,-(-a*r+c)),f=u>0?-r:Math.min(Math.max(-r,-o),r),d=-u*u+f*(f+2*o)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-o),r),d=f*(f+2*o)+l):(u=Math.max(0,-(a*r+c)),f=u>0?r:Math.min(Math.max(-r,-o),r),d=-u*u+f*(f+2*o)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+c)),d=-u*u+f*(f+2*o)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ya).addScaledVector(wr,f),d}intersectSphere(e,t){ti.subVectors(e.center,this.origin);const n=ti.dot(this.direction),s=ti.dot(ti)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),c=n-a,o=n+a;return o<0?null:c<0?this.at(o,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,c,o;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(c=(e.min.z-f.z)*u,o=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,o=(e.min.z-f.z)*u),n>o||c>s)||((c>n||n!==n)&&(n=c),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,t,n,s,r){qa.subVectors(t,e),Tr.subVectors(n,e),Za.crossVectors(qa,Tr);let a=this.direction.dot(Za),c;if(a>0){if(s)return null;c=1}else if(a<0)c=-1,a=-a;else return null;_i.subVectors(this.origin,e);const o=c*this.direction.dot(Tr.crossVectors(_i,Tr));if(o<0)return null;const l=c*this.direction.dot(qa.cross(_i));if(l<0||o+l>a)return null;const h=-c*_i.dot(Za);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ir extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const oc=new Pt,Pi=new va,Ar=new ws,lc=new L,Rr=new L,Cr=new L,Pr=new L,Ka=new L,Dr=new L,cc=new L,Lr=new L;class qe extends Zt{constructor(e=new Kt,t=new ir){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(r&&c){Dr.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const h=c[o],u=r[o];h!==0&&(Ka.fromBufferAttribute(u,e),a?Dr.addScaledVector(Ka,h):Dr.addScaledVector(Ka.sub(t),h))}t.add(Dr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),Pi.copy(e.ray).recast(e.near),!(Ar.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Ar,lc)===null||Pi.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(oc.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(oc),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,c=r.index,o=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=S;M<T;M+=3){const E=c.getX(M),C=c.getX(M+1),_=c.getX(M+2);s=Ir(this,p,e,n,l,h,u,E,C,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const y=c.getX(m),S=c.getX(m+1),M=c.getX(m+2);s=Ir(this,a,e,n,l,h,u,y,S,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let g=0,v=f.length;g<v;g++){const m=f[g],p=a[m.materialIndex],y=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=y,T=S;M<T;M+=3){const E=M,C=M+1,_=M+2;s=Ir(this,p,e,n,l,h,u,E,C,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,p=v;m<p;m+=3){const y=m,S=m+1,M=m+2;s=Ir(this,a,e,n,l,h,u,y,S,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function ff(i,e,t,n,s,r,a,c){let o;if(e.side===mn?o=n.intersectTriangle(a,r,s,!0,c):o=n.intersectTriangle(s,r,a,e.side===bi,c),o===null)return null;Lr.copy(c),Lr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Lr);return l<t.near||l>t.far?null:{distance:l,point:Lr.clone(),object:i}}function Ir(i,e,t,n,s,r,a,c,o,l){i.getVertexPosition(c,Rr),i.getVertexPosition(o,Cr),i.getVertexPosition(l,Pr);const h=ff(i,e,t,n,Rr,Cr,Pr,cc);if(h){const u=new L;wn.getBarycoord(cc,Rr,Cr,Pr,u),s&&(h.uv=wn.getInterpolatedAttribute(s,c,o,l,u,new J)),r&&(h.uv1=wn.getInterpolatedAttribute(r,c,o,l,u,new J)),a&&(h.normal=wn.getInterpolatedAttribute(a,c,o,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:o,c:l,normal:new L,materialIndex:0};wn.getNormal(Rr,Cr,Pr,f.normal),h.face=f,h.barycoord=u}return h}class Ch extends fn{constructor(e=null,t=1,n=1,s,r,a,c,o,l=rn,h=rn,u,f){super(null,a,c,o,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hc extends Tn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const as=new Pt,uc=new Pt,Nr=[],fc=new Kn,df=new Pt,ks=new qe,Vs=new ws;class pf extends qe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new hc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,df)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),fc.copy(e.boundingBox).applyMatrix4(as),this.boundingBox.union(fc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ws),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,as),Vs.copy(e.boundingSphere).applyMatrix4(as),this.boundingSphere.union(Vs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let c=0;c<n.length;c++)n[c]=s[a+c]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ks.geometry=this.geometry,ks.material=this.material,ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(n),e.ray.intersectsSphere(Vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,as),uc.multiplyMatrices(n,as),ks.matrixWorld=uc,ks.raycast(e,Nr);for(let a=0,c=Nr.length;a<c;a++){const o=Nr[a];o.instanceId=r,o.object=this,t.push(o)}Nr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new hc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ch(new Float32Array(s*this.count),s,this.count,pl,Nn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const c=this.geometry.morphTargetsRelative?1:1-a,o=s*e;return r[o]=c,r.set(n,o+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ja=new L,mf=new L,gf=new ct;class ni{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ja.subVectors(n,t).cross(mf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(Ja),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gf.getNormalMatrix(e),s=this.coplanarPoint(Ja).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new ws,_f=new J(.5,.5),Ur=new L;class Sl{constructor(e=new ni,t=new ni,n=new ni,s=new ni,r=new ni,a=new ni){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(r),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xn,n=!1){const s=this.planes,r=e.elements,a=r[0],c=r[1],o=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],v=r[9],m=r[10],p=r[11],y=r[12],S=r[13],M=r[14],T=r[15];if(s[0].setComponents(l-a,d-h,p-g,T-y).normalize(),s[1].setComponents(l+a,d+h,p+g,T+y).normalize(),s[2].setComponents(l+c,d+u,p+v,T+S).normalize(),s[3].setComponents(l-c,d-u,p-v,T-S).normalize(),n)s[4].setComponents(o,f,m,M).normalize(),s[5].setComponents(l-o,d-f,p-m,T-M).normalize();else if(s[4].setComponents(l-o,d-f,p-m,T-M).normalize(),t===Xn)s[5].setComponents(l+o,d+f,p+m,T+M).normalize();else if(t===nr)s[5].setComponents(o,f,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){Di.center.set(0,0,0);const t=_f.distanceTo(e.center);return Di.radius=.7071067811865476+t,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ur.x=s.normal.x>0?e.max.x:e.min.x,Ur.y=s.normal.y>0?e.max.y:e.min.y,Ur.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ph extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ca=new L,ha=new L,dc=new Pt,Gs=new va,Fr=new ws,$a=new L,pc=new L;class vf extends Zt{constructor(e=new Kt,t=new Ph){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ca.fromBufferAttribute(t,s-1),ha.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ca.distanceTo(ha);e.setAttribute("lineDistance",new vt(n,1))}else tt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(s),Fr.radius+=r,e.ray.intersectsSphere(Fr)===!1)return;dc.copy(s).invert(),Gs.copy(e.ray).applyMatrix4(dc);const c=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=c*c,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=l){const p=h.getX(v),y=h.getX(v+1),S=Or(this,e,Gs,o,p,y,v);S&&t.push(S)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(d),p=Or(this,e,Gs,o,v,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let v=d,m=g-1;v<m;v+=l){const p=Or(this,e,Gs,o,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=Or(this,e,Gs,o,g-1,d,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const c=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=r}}}}}function Or(i,e,t,n,s,r,a){const c=i.geometry.attributes.position;if(ca.fromBufferAttribute(c,s),ha.fromBufferAttribute(c,r),t.distanceSqToSegment(ca,ha,$a,pc)>n)return;$a.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo($a);if(!(l<e.near||l>e.far))return{distance:l,point:pc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class Dh extends fn{constructor(e=[],t=Bi,n,s,r,a,c,o,l,h){super(e,t,n,s,r,a,c,o,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bl extends fn{constructor(e,t,n,s,r,a,c,o,l){super(e,t,n,s,r,a,c,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ss extends fn{constructor(e,t,n=Zn,s,r,a,c=rn,o=rn,l,h=hi,u=1){if(h!==hi&&h!==Fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,a,c,o,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ml(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xf extends Ss{constructor(e,t=Zn,n=Bi,s,r,a=rn,c=rn,o,l=hi){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,c,o,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Lh extends fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Bt extends Kt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const c=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],l=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(u,2));function g(v,m,p,y,S,M,T,E,C,_,w){const P=M/C,N=T/_,B=M/2,Q=T/2,j=E/2,z=C+1,Z=_+1;let X=0,re=0;const de=new L;for(let me=0;me<Z;me++){const ge=me*N-Q;for(let Se=0;Se<z;Se++){const rt=Se*P-B;de[v]=rt*y,de[m]=ge*S,de[p]=j,l.push(de.x,de.y,de.z),de[v]=0,de[m]=0,de[p]=E>0?1:-1,h.push(de.x,de.y,de.z),u.push(Se/C),u.push(1-me/_),X+=1}}for(let me=0;me<_;me++)for(let ge=0;ge<C;ge++){const Se=f+ge+z*me,rt=f+ge+z*(me+1),Et=f+(ge+1)+z*(me+1),st=f+(ge+1)+z*me;o.push(Se,rt,st),o.push(rt,Et,st),re+=6}c.addGroup(d,re,w),d+=re,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ii extends Kt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],c=[],o=[],l=new L,h=new J;a.push(0,0,0),c.push(0,0,1),o.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const d=n+u/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),a.push(l.x,l.y,l.z),c.push(0,0,1),h.x=(a[f]/e+1)/2,h.y=(a[f+1]/e+1)/2,o.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new vt(a,3)),this.setAttribute("normal",new vt(c,3)),this.setAttribute("uv",new vt(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ii(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ee extends Kt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,c=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:c,thetaLength:o};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let g=0;const v=[],m=n/2;let p=0;y(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new vt(u,3)),this.setAttribute("normal",new vt(f,3)),this.setAttribute("uv",new vt(d,2));function y(){const M=new L,T=new L;let E=0;const C=(t-e)/n;for(let _=0;_<=r;_++){const w=[],P=_/r,N=P*(t-e)+e;for(let B=0;B<=s;B++){const Q=B/s,j=Q*o+c,z=Math.sin(j),Z=Math.cos(j);T.x=N*z,T.y=-P*n+m,T.z=N*Z,u.push(T.x,T.y,T.z),M.set(z,C,Z).normalize(),f.push(M.x,M.y,M.z),d.push(Q,1-P),w.push(g++)}v.push(w)}for(let _=0;_<s;_++)for(let w=0;w<r;w++){const P=v[w][_],N=v[w+1][_],B=v[w+1][_+1],Q=v[w][_+1];(e>0||w!==0)&&(h.push(P,N,Q),E+=3),(t>0||w!==r-1)&&(h.push(N,B,Q),E+=3)}l.addGroup(p,E,0),p+=E}function S(M){const T=g,E=new J,C=new L;let _=0;const w=M===!0?e:t,P=M===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*P,0),f.push(0,P,0),d.push(.5,.5),g++;const N=g;for(let B=0;B<=s;B++){const j=B/s*o+c,z=Math.cos(j),Z=Math.sin(j);C.x=w*Z,C.y=m*P,C.z=w*z,u.push(C.x,C.y,C.z),f.push(0,P,0),E.x=z*.5+.5,E.y=Z*.5*P+.5,d.push(E.x,E.y),g++}for(let B=0;B<s;B++){const Q=T+B,j=N+B;M===!0?h.push(j,j+1,Q):h.push(j+1,j,Q),_+=3}l.addGroup(p,_,M===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ee(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class In extends ee{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,c=Math.PI*2){super(0,e,t,n,s,r,a,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c}}static fromJSON(e){return new In(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class El extends Kt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];c(s),l(n),h(),this.setAttribute("position",new vt(r,3)),this.setAttribute("normal",new vt(r.slice(),3)),this.setAttribute("uv",new vt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(y){const S=new L,M=new L,T=new L;for(let E=0;E<t.length;E+=3)d(t[E+0],S),d(t[E+1],M),d(t[E+2],T),o(S,M,T,y)}function o(y,S,M,T){const E=T+1,C=[];for(let _=0;_<=E;_++){C[_]=[];const w=y.clone().lerp(M,_/E),P=S.clone().lerp(M,_/E),N=E-_;for(let B=0;B<=N;B++)B===0&&_===E?C[_][B]=w:C[_][B]=w.clone().lerp(P,B/N)}for(let _=0;_<E;_++)for(let w=0;w<2*(E-_)-1;w++){const P=Math.floor(w/2);w%2===0?(f(C[_][P+1]),f(C[_+1][P]),f(C[_][P])):(f(C[_][P+1]),f(C[_+1][P+1]),f(C[_+1][P]))}}function l(y){const S=new L;for(let M=0;M<r.length;M+=3)S.x=r[M+0],S.y=r[M+1],S.z=r[M+2],S.normalize().multiplyScalar(y),r[M+0]=S.x,r[M+1]=S.y,r[M+2]=S.z}function h(){const y=new L;for(let S=0;S<r.length;S+=3){y.x=r[S+0],y.y=r[S+1],y.z=r[S+2];const M=m(y)/2/Math.PI+.5,T=p(y)/Math.PI+.5;a.push(M,1-T)}g(),u()}function u(){for(let y=0;y<a.length;y+=6){const S=a[y+0],M=a[y+2],T=a[y+4],E=Math.max(S,M,T),C=Math.min(S,M,T);E>.9&&C<.1&&(S<.2&&(a[y+0]+=1),M<.2&&(a[y+2]+=1),T<.2&&(a[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,S){const M=y*3;S.x=e[M+0],S.y=e[M+1],S.z=e[M+2]}function g(){const y=new L,S=new L,M=new L,T=new L,E=new J,C=new J,_=new J;for(let w=0,P=0;w<r.length;w+=9,P+=6){y.set(r[w+0],r[w+1],r[w+2]),S.set(r[w+3],r[w+4],r[w+5]),M.set(r[w+6],r[w+7],r[w+8]),E.set(a[P+0],a[P+1]),C.set(a[P+2],a[P+3]),_.set(a[P+4],a[P+5]),T.copy(y).add(S).add(M).divideScalar(3);const N=m(T);v(E,P+0,y,N),v(C,P+2,S,N),v(_,P+4,M,N)}}function v(y,S,M,T){T<0&&y.x===1&&(a[S]=y.x-1),M.x===0&&M.z===0&&(a[S]=T/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new El(e.vertices,e.indices,e.radius,e.detail)}}class wl extends El{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wl(e.radius,e.detail)}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){tt("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let c=0,o=r-1,l;for(;c<=o;)if(s=Math.floor(c+(o-c)/2),l=n[s]-a,l<0)c=s+1;else if(l>0)o=s-1;else{o=s;break}if(s=o,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),c=this.getPoint(r),o=t||(a.isVector2?new J:new L);return o.copy(c).sub(a).normalize(),o}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,s=[],r=[],a=[],c=new L,o=new Pt;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],c),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),c.crossVectors(s[d-1],s[d]),c.length()>Number.EPSILON){c.normalize();const g=Math.acos(ut(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(o.makeRotationAxis(c,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(ut(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(c.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(o.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Tl extends On{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,c=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=c,this.aRotation=o}getPoint(e,t=new J){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const c=this.aStartAngle+e*r;let o=this.aX+this.xRadius*Math.cos(c),l=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=o-this.aX,d=l-this.aY;o=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Mf extends Tl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Al(){let i=0,e=0,t=0,n=0;function s(r,a,c,o){i=r,e=c,t=-3*r+3*a-2*c-o,n=2*r-2*a+c+o}return{initCatmullRom:function(r,a,c,o,l){s(a,c,l*(c-r),l*(o-a))},initNonuniformCatmullRom:function(r,a,c,o,l,h,u){let f=(a-r)/l-(c-r)/(l+h)+(c-a)/h,d=(c-a)/h-(o-a)/(h+u)+(o-c)/u;f*=h,d*=h,s(a,c,f,d)},calc:function(r){const a=r*r,c=a*r;return i+e*r+t*a+n*c}}}const mc=new L,gc=new L,Qa=new Al,ja=new Al,eo=new Al;class Ih extends On{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let c=Math.floor(a),o=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/r)+1)*r:o===0&&c===r-1&&(c=r-2,o=1);let l,h;this.closed||c>0?l=s[(c-1)%r]:(gc.subVectors(s[0],s[1]).add(s[0]),l=gc);const u=s[c%r],f=s[(c+1)%r];if(this.closed||c+2<r?h=s[(c+2)%r]:(mc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=mc),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Qa.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,v,m),ja.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,v,m),eo.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Qa.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),ja.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),eo.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Qa.calc(o),ja.calc(o),eo.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function _c(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,c=i*i,o=i*c;return(2*t-2*n+r+a)*o+(-3*t+3*n-2*r-a)*c+r*i+t}function yf(i,e){const t=1-i;return t*t*e}function Sf(i,e){return 2*(1-i)*i*e}function bf(i,e){return i*i*e}function Qs(i,e,t,n){return yf(i,e)+Sf(i,t)+bf(i,n)}function Ef(i,e){const t=1-i;return t*t*t*e}function wf(i,e){const t=1-i;return 3*t*t*i*e}function Tf(i,e){return 3*(1-i)*i*i*e}function Af(i,e){return i*i*i*e}function js(i,e,t,n,s){return Ef(i,e)+wf(i,t)+Tf(i,n)+Af(i,s)}class Nh extends On{constructor(e=new J,t=new J,n=new J,s=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new J){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(js(e,s.x,r.x,a.x,c.x),js(e,s.y,r.y,a.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rf extends On{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2,c=this.v3;return n.set(js(e,s.x,r.x,a.x,c.x),js(e,s.y,r.y,a.y,c.y),js(e,s.z,r.z,a.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Uh extends On{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cf extends On{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fh extends On{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Qs(e,s.x,r.x,a.x),Qs(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rl extends On{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Qs(e,s.x,r.x,a.x),Qs(e,s.y,r.y,a.y),Qs(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Oh extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new J){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),c=r-a,o=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(_c(c,o.x,l.x,h.x,u.x),_c(c,o.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new J().fromArray(s))}return this}}var ua=Object.freeze({__proto__:null,ArcCurve:Mf,CatmullRomCurve3:Ih,CubicBezierCurve:Nh,CubicBezierCurve3:Rf,EllipseCurve:Tl,LineCurve:Uh,LineCurve3:Cf,QuadraticBezierCurve:Fh,QuadraticBezierCurve3:Rl,SplineCurve:Oh});class Pf extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ua[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,c=this.curves[r],o=c.getLength(),l=o===0?0:1-a/o;return c.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],c=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,o=a.getPoints(c);for(let l=0;l<o.length;l++){const h=o[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new ua[s.type]().fromJSON(s))}return this}}class vc extends Pf{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Uh(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Fh(this.currentPoint.clone(),new J(e,t),new J(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const c=new Nh(this.currentPoint.clone(),new J(e,t),new J(n,s),new J(r,a));return this.curves.push(c),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Oh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const c=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+c,t+o,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,c,o){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,c,o),this}absellipse(e,t,n,s,r,a,c,o){const l=new Tl(e,t,n,s,r,a,c,o);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Zs extends vc{constructor(e){super(e),this.uuid=ai(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new vc().fromJSON(s))}return this}}function Df(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Bh(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let c,o,l;if(n&&(r=Ff(i,e,r,t)),i.length>80*t){c=i[0],o=i[1];let h=c,u=o;for(let f=t;f<s;f+=t){const d=i[f],g=i[f+1];d<c&&(c=d),g<o&&(o=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-c,u-o),l=l!==0?32767/l:0}return sr(r,a,t,c,o,l,0),a}function Bh(i,e,t,n,s){let r;if(s===qf(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=xc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=xc(a/n|0,i[a],i[a+1],r);return r&&bs(r,r.next)&&(ar(r),r=r.next),r}function ki(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(bs(t,t.next)||Ht(t.prev,t,t.next)===0)){if(ar(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function sr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Vf(i,n,s,r);let c=i;for(;i.prev!==i.next;){const o=i.prev,l=i.next;if(r?If(i,n,s,r):Lf(i)){e.push(o.i,i.i,l.i),ar(i),i=l.next,c=l.next;continue}if(i=l,i===c){a?a===1?(i=Nf(ki(i),e),sr(i,e,t,n,s,r,2)):a===2&&Uf(i,e,t,n,s,r):sr(ki(i),e,t,n,s,r,1);break}}}function Lf(i){const e=i.prev,t=i,n=i.next;if(Ht(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,c=e.y,o=t.y,l=n.y,h=Math.min(s,r,a),u=Math.min(c,o,l),f=Math.max(s,r,a),d=Math.max(c,o,l);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Ks(s,c,r,o,a,l,g.x,g.y)&&Ht(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function If(i,e,t,n){const s=i.prev,r=i,a=i.next;if(Ht(s,r,a)>=0)return!1;const c=s.x,o=r.x,l=a.x,h=s.y,u=r.y,f=a.y,d=Math.min(c,o,l),g=Math.min(h,u,f),v=Math.max(c,o,l),m=Math.max(h,u,f),p=nl(d,g,e,t,n),y=nl(v,m,e,t,n);let S=i.prevZ,M=i.nextZ;for(;S&&S.z>=p&&M&&M.z<=y;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&Ks(c,h,o,u,l,f,S.x,S.y)&&Ht(S.prev,S,S.next)>=0||(S=S.prevZ,M.x>=d&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&Ks(c,h,o,u,l,f,M.x,M.y)&&Ht(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;S&&S.z>=p;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==s&&S!==a&&Ks(c,h,o,u,l,f,S.x,S.y)&&Ht(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;M&&M.z<=y;){if(M.x>=d&&M.x<=v&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&Ks(c,h,o,u,l,f,M.x,M.y)&&Ht(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Nf(i,e){let t=i;do{const n=t.prev,s=t.next.next;!bs(n,s)&&kh(n,t,t.next,s)&&rr(n,s)&&rr(s,n)&&(e.push(n.i,t.i,s.i),ar(t),ar(t.next),t=i=s),t=t.next}while(t!==i);return ki(t)}function Uf(i,e,t,n,s,r){let a=i;do{let c=a.next.next;for(;c!==a.prev;){if(a.i!==c.i&&Wf(a,c)){let o=Vh(a,c);a=ki(a,a.next),o=ki(o,o.next),sr(a,e,t,n,s,r,0),sr(o,e,t,n,s,r,0);return}c=c.next}a=a.next}while(a!==i)}function Ff(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const c=e[r]*n,o=r<a-1?e[r+1]*n:i.length,l=Bh(i,c,o,n,!1);l===l.next&&(l.steiner=!0),s.push(Hf(l))}s.sort(Of);for(let r=0;r<s.length;r++)t=Bf(s[r],t);return t}function Of(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Bf(i,e){const t=zf(i,e);if(!t)return e;const n=Vh(t,i);return ki(n,n.next),ki(t,t.next)}function zf(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(bs(i,t))return t;do{if(bs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;const c=a,o=a.x,l=a.y;let h=1/0;t=a;do{if(n>=t.x&&t.x>=o&&n!==t.x&&zh(s<l?n:r,s,o,l,s<l?r:n,s,t.x,t.y)){const u=Math.abs(s-t.y)/(n-t.x);rr(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&kf(a,t)))&&(a=t,h=u)}t=t.next}while(t!==c);return a}function kf(i,e){return Ht(i.prev,i,e.prev)<0&&Ht(e.next,i,i.next)<0}function Vf(i,e,t,n){let s=i;do s.z===0&&(s.z=nl(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Gf(s)}function Gf(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,c=0;for(let l=0;l<t&&(c++,a=a.nextZ,!!a);l++);let o=t;for(;c>0||o>0&&a;)c!==0&&(o===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,c--):(s=a,a=a.nextZ,o--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function nl(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Hf(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function zh(i,e,t,n,s,r,a,c){return(s-a)*(e-c)>=(i-a)*(r-c)&&(i-a)*(n-c)>=(t-a)*(e-c)&&(t-a)*(r-c)>=(s-a)*(n-c)}function Ks(i,e,t,n,s,r,a,c){return!(i===a&&e===c)&&zh(i,e,t,n,s,r,a,c)}function Wf(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Xf(i,e)&&(rr(i,e)&&rr(e,i)&&Yf(i,e)&&(Ht(i.prev,i,e.prev)||Ht(i,e.prev,e))||bs(i,e)&&Ht(i.prev,i,i.next)>0&&Ht(e.prev,e,e.next)>0)}function Ht(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function bs(i,e){return i.x===e.x&&i.y===e.y}function kh(i,e,t,n){const s=zr(Ht(i,e,t)),r=zr(Ht(i,e,n)),a=zr(Ht(t,n,i)),c=zr(Ht(t,n,e));return!!(s!==r&&a!==c||s===0&&Br(i,t,e)||r===0&&Br(i,n,e)||a===0&&Br(t,i,n)||c===0&&Br(t,e,n))}function Br(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function zr(i){return i>0?1:i<0?-1:0}function Xf(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&kh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function rr(i,e){return Ht(i.prev,i,i.next)<0?Ht(i,e,i.next)>=0&&Ht(i,i.prev,e)>=0:Ht(i,e,i.prev)<0||Ht(i,i.next,e)<0}function Yf(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Vh(i,e){const t=il(i.i,i.x,i.y),n=il(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function xc(i,e,t,n){const s=il(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ar(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function il(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function qf(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Zf{static triangulate(e,t,n=2){return Df(e,t,n)}}class ds{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return ds.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Mc(e),yc(n,e);let a=e.length;t.forEach(Mc);for(let o=0;o<t.length;o++)s.push(a),a+=t[o].length,yc(n,t[o]);const c=Zf.triangulate(n,s);for(let o=0;o<c.length;o+=3)r.push(c.slice(o,o+3));return r}}function Mc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function yc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ps extends Kt{constructor(e=new Zs([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let c=0,o=e.length;c<o;c++){const l=e[c];a(l)}this.setAttribute("position",new vt(s,3)),this.setAttribute("uv",new vt(r,2)),this.computeVertexNormals();function a(c){const o=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Kf;let S,M=!1,T,E,C,_;if(p){S=p.getSpacedPoints(h),M=!0,f=!1;const oe=p.isCatmullRomCurve3?p.closed:!1;T=p.computeFrenetFrames(h,oe),E=new L,C=new L,_=new L}f||(m=0,d=0,g=0,v=0);const w=c.extractPoints(l);let P=w.shape;const N=w.holes;if(!ds.isClockWise(P)){P=P.reverse();for(let oe=0,ue=N.length;oe<ue;oe++){const fe=N[oe];ds.isClockWise(fe)&&(N[oe]=fe.reverse())}}function Q(oe){const fe=10000000000000001e-36;let Te=oe[0];for(let Me=1;Me<=oe.length;Me++){const Ze=Me%oe.length,Oe=oe[Ze],et=Oe.x-Te.x,it=Oe.y-Te.y,F=et*et+it*it,yt=Math.max(Math.abs(Oe.x),Math.abs(Oe.y),Math.abs(Te.x),Math.abs(Te.y)),dt=fe*yt*yt;if(F<=dt){oe.splice(Ze,1),Me--;continue}Te=Oe}}Q(P),N.forEach(Q);const j=N.length,z=P;for(let oe=0;oe<j;oe++){const ue=N[oe];P=P.concat(ue)}function Z(oe,ue,fe){return ue||_t("ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(ue,fe)}const X=P.length;function re(oe,ue,fe){let Te,Me,Ze;const Oe=oe.x-ue.x,et=oe.y-ue.y,it=fe.x-oe.x,F=fe.y-oe.y,yt=Oe*Oe+et*et,dt=Oe*F-et*it;if(Math.abs(dt)>Number.EPSILON){const A=Math.sqrt(yt),x=Math.sqrt(it*it+F*F),V=ue.x-et/A,Y=ue.y+Oe/A,te=fe.x-F/x,ae=fe.y+it/x,xe=((te-V)*F-(ae-Y)*it)/(Oe*F-et*it);Te=V+Oe*xe-oe.x,Me=Y+et*xe-oe.y;const $=Te*Te+Me*Me;if($<=2)return new J(Te,Me);Ze=Math.sqrt($/2)}else{let A=!1;Oe>Number.EPSILON?it>Number.EPSILON&&(A=!0):Oe<-Number.EPSILON?it<-Number.EPSILON&&(A=!0):Math.sign(et)===Math.sign(F)&&(A=!0),A?(Te=-et,Me=Oe,Ze=Math.sqrt(yt)):(Te=Oe,Me=et,Ze=Math.sqrt(yt/2))}return new J(Te/Ze,Me/Ze)}const de=[];for(let oe=0,ue=z.length,fe=ue-1,Te=oe+1;oe<ue;oe++,fe++,Te++)fe===ue&&(fe=0),Te===ue&&(Te=0),de[oe]=re(z[oe],z[fe],z[Te]);const me=[];let ge,Se=de.concat();for(let oe=0,ue=j;oe<ue;oe++){const fe=N[oe];ge=[];for(let Te=0,Me=fe.length,Ze=Me-1,Oe=Te+1;Te<Me;Te++,Ze++,Oe++)Ze===Me&&(Ze=0),Oe===Me&&(Oe=0),ge[Te]=re(fe[Te],fe[Ze],fe[Oe]);me.push(ge),Se=Se.concat(ge)}let rt;if(m===0)rt=ds.triangulateShape(z,N);else{const oe=[],ue=[];for(let fe=0;fe<m;fe++){const Te=fe/m,Me=d*Math.cos(Te*Math.PI/2),Ze=g*Math.sin(Te*Math.PI/2)+v;for(let Oe=0,et=z.length;Oe<et;Oe++){const it=Z(z[Oe],de[Oe],Ze);Ne(it.x,it.y,-Me),Te===0&&oe.push(it)}for(let Oe=0,et=j;Oe<et;Oe++){const it=N[Oe];ge=me[Oe];const F=[];for(let yt=0,dt=it.length;yt<dt;yt++){const A=Z(it[yt],ge[yt],Ze);Ne(A.x,A.y,-Me),Te===0&&F.push(A)}Te===0&&ue.push(F)}}rt=ds.triangulateShape(oe,ue)}const Et=rt.length,st=g+v;for(let oe=0;oe<X;oe++){const ue=f?Z(P[oe],Se[oe],st):P[oe];M?(C.copy(T.normals[0]).multiplyScalar(ue.x),E.copy(T.binormals[0]).multiplyScalar(ue.y),_.copy(S[0]).add(C).add(E),Ne(_.x,_.y,_.z)):Ne(ue.x,ue.y,0)}for(let oe=1;oe<=h;oe++)for(let ue=0;ue<X;ue++){const fe=f?Z(P[ue],Se[ue],st):P[ue];M?(C.copy(T.normals[oe]).multiplyScalar(fe.x),E.copy(T.binormals[oe]).multiplyScalar(fe.y),_.copy(S[oe]).add(C).add(E),Ne(_.x,_.y,_.z)):Ne(fe.x,fe.y,u/h*oe)}for(let oe=m-1;oe>=0;oe--){const ue=oe/m,fe=d*Math.cos(ue*Math.PI/2),Te=g*Math.sin(ue*Math.PI/2)+v;for(let Me=0,Ze=z.length;Me<Ze;Me++){const Oe=Z(z[Me],de[Me],Te);Ne(Oe.x,Oe.y,u+fe)}for(let Me=0,Ze=N.length;Me<Ze;Me++){const Oe=N[Me];ge=me[Me];for(let et=0,it=Oe.length;et<it;et++){const F=Z(Oe[et],ge[et],Te);M?Ne(F.x,F.y+S[h-1].y,S[h-1].x+fe):Ne(F.x,F.y,u+fe)}}}ne(),ve();function ne(){const oe=s.length/3;if(f){let ue=0,fe=X*ue;for(let Te=0;Te<Et;Te++){const Me=rt[Te];Je(Me[2]+fe,Me[1]+fe,Me[0]+fe)}ue=h+m*2,fe=X*ue;for(let Te=0;Te<Et;Te++){const Me=rt[Te];Je(Me[0]+fe,Me[1]+fe,Me[2]+fe)}}else{for(let ue=0;ue<Et;ue++){const fe=rt[ue];Je(fe[2],fe[1],fe[0])}for(let ue=0;ue<Et;ue++){const fe=rt[ue];Je(fe[0]+X*h,fe[1]+X*h,fe[2]+X*h)}}n.addGroup(oe,s.length/3-oe,0)}function ve(){const oe=s.length/3;let ue=0;he(z,ue),ue+=z.length;for(let fe=0,Te=N.length;fe<Te;fe++){const Me=N[fe];he(Me,ue),ue+=Me.length}n.addGroup(oe,s.length/3-oe,1)}function he(oe,ue){let fe=oe.length;for(;--fe>=0;){const Te=fe;let Me=fe-1;Me<0&&(Me=oe.length-1);for(let Ze=0,Oe=h+m*2;Ze<Oe;Ze++){const et=X*Ze,it=X*(Ze+1),F=ue+Te+et,yt=ue+Me+et,dt=ue+Me+it,A=ue+Te+it;Ge(F,yt,dt,A)}}}function Ne(oe,ue,fe){o.push(oe),o.push(ue),o.push(fe)}function Je(oe,ue,fe){mt(oe),mt(ue),mt(fe);const Te=s.length/3,Me=y.generateTopUV(n,s,Te-3,Te-2,Te-1);je(Me[0]),je(Me[1]),je(Me[2])}function Ge(oe,ue,fe,Te){mt(oe),mt(ue),mt(Te),mt(ue),mt(fe),mt(Te);const Me=s.length/3,Ze=y.generateSideWallUV(n,s,Me-6,Me-3,Me-2,Me-1);je(Ze[0]),je(Ze[1]),je(Ze[3]),je(Ze[1]),je(Ze[2]),je(Ze[3])}function mt(oe){s.push(o[oe*3+0]),s.push(o[oe*3+1]),s.push(o[oe*3+2])}function je(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Jf(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const c=t[e.shapes[r]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new ua[s.type]().fromJSON(s)),new ps(n,e.options)}}const Kf={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],c=e[n*3],o=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new J(r,a),new J(c,o),new J(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],c=e[t*3+1],o=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],d=e[s*3+1],g=e[s*3+2],v=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(c-h)<Math.abs(a-l)?[new J(a,1-o),new J(l,1-u),new J(f,1-g),new J(v,1-p)]:[new J(c,1-o),new J(h,1-u),new J(d,1-g),new J(m,1-p)]}};function Jf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Mi extends Kt{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=ut(s,0,Math.PI*2);const r=[],a=[],c=[],o=[],l=[],h=1/t,u=new L,f=new J,d=new L,g=new L,v=new L;let m=0,p=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:m=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case e.length-1:o.push(v.x,v.y,v.z);break;default:m=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),o.push(d.x,d.y,d.z),v.copy(g)}for(let y=0;y<=t;y++){const S=n+y*h*s,M=Math.sin(S),T=Math.cos(S);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*M,u.y=e[E].y,u.z=e[E].x*T,a.push(u.x,u.y,u.z),f.x=y/t,f.y=E/(e.length-1),c.push(f.x,f.y);const C=o[3*E+0]*M,_=o[3*E+1],w=o[3*E+0]*T;l.push(C,_,w)}}for(let y=0;y<t;y++)for(let S=0;S<e.length-1;S++){const M=S+y*e.length,T=M,E=M+e.length,C=M+e.length+1,_=M+1;r.push(T,E,_),r.push(C,_,E)}this.setIndex(r),this.setAttribute("position",new vt(a,3)),this.setAttribute("uv",new vt(c,2)),this.setAttribute("normal",new vt(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.points,e.segments,e.phiStart,e.phiLength)}}class li extends Kt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,c=Math.floor(n),o=Math.floor(s),l=c+1,h=o+1,u=e/c,f=t/o,d=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const y=p*f-a;for(let S=0;S<l;S++){const M=S*u-r;g.push(M,-y,0),v.push(0,0,1),m.push(S/c),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let y=0;y<c;y++){const S=y+l*p,M=y+l*(p+1),T=y+1+l*(p+1),E=y+1+l*p;d.push(S,M,E),d.push(M,T,E)}this.setIndex(d),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(v,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new li(e.width,e.height,e.widthSegments,e.heightSegments)}}class Gh extends Kt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const c=[],o=[],l=[],h=[];let u=e;const f=(t-e)/s,d=new L,g=new J;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;d.x=u*Math.cos(p),d.y=u*Math.sin(p),o.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let p=0;p<n;p++){const y=p+m,S=y,M=y+n+1,T=y+n+2,E=y+1;c.push(S,M,E),c.push(M,T,E)}}this.setIndex(c),this.setAttribute("position",new vt(o,3)),this.setAttribute("normal",new vt(l,3)),this.setAttribute("uv",new vt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gh(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class kt extends Kt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const o=Math.min(a+c,Math.PI);let l=0;const h=[],u=new L,f=new L,d=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const y=[],S=p/n,M=a+S*c,T=e*Math.cos(M),E=Math.sqrt(e*e-T*T);let C=0;p===0&&a===0?C=.5/t:p===n&&o===Math.PI&&(C=-.5/t);for(let _=0;_<=t;_++){const w=_/t,P=s+w*r;u.x=-E*Math.cos(P),u.y=T,u.z=E*Math.sin(P),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(w+C,1-S),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const S=h[p][y+1],M=h[p][y],T=h[p+1][y],E=h[p+1][y+1];(p!==0||a>0)&&d.push(S,M,E),(p!==n-1||o<Math.PI)&&d.push(M,T,E)}this.setIndex(d),this.setAttribute("position",new vt(g,3)),this.setAttribute("normal",new vt(v,3)),this.setAttribute("uv",new vt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class zt extends Kt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:c},n=Math.floor(n),s=Math.floor(s);const o=[],l=[],h=[],u=[],f=new L,d=new L,g=new L;for(let v=0;v<=n;v++){const m=a+v/n*c;for(let p=0;p<=s;p++){const y=p/s*r;d.x=(e+t*Math.cos(m))*Math.cos(y),d.y=(e+t*Math.cos(m))*Math.sin(y),d.z=t*Math.sin(m),l.push(d.x,d.y,d.z),f.x=e*Math.cos(y),f.y=e*Math.sin(y),g.subVectors(d,f).normalize(),h.push(g.x,g.y,g.z),u.push(p/s),u.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=s;m++){const p=(s+1)*v+m-1,y=(s+1)*(v-1)+m-1,S=(s+1)*(v-1)+m,M=(s+1)*v+m;o.push(p,y,M),o.push(y,S,M)}this.setIndex(o),this.setAttribute("position",new vt(l,3)),this.setAttribute("normal",new vt(h,3)),this.setAttribute("uv",new vt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Oi extends Kt{constructor(e=new Rl(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const c=new L,o=new L,l=new J;let h=new L;const u=[],f=[],d=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new vt(u,3)),this.setAttribute("normal",new vt(f,3)),this.setAttribute("uv",new vt(d,2));function v(){for(let S=0;S<t;S++)m(S);m(r===!1?t:0),y(),p()}function m(S){h=e.getPointAt(S/t,h);const M=a.normals[S],T=a.binormals[S];for(let E=0;E<=s;E++){const C=E/s*Math.PI*2,_=Math.sin(C),w=-Math.cos(C);o.x=w*M.x+_*T.x,o.y=w*M.y+_*T.y,o.z=w*M.z+_*T.z,o.normalize(),f.push(o.x,o.y,o.z),c.x=h.x+n*o.x,c.y=h.y+n*o.y,c.z=h.z+n*o.z,u.push(c.x,c.y,c.z)}}function p(){for(let S=1;S<=t;S++)for(let M=1;M<=s;M++){const T=(s+1)*(S-1)+(M-1),E=(s+1)*S+(M-1),C=(s+1)*S+M,_=(s+1)*(S-1)+M;g.push(T,E,_),g.push(E,C,_)}}function y(){for(let S=0;S<=t;S++)for(let M=0;M<=s;M++)l.x=S/t,l.y=M/s,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Oi(new ua[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function Es(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Sc(s))s.isRenderTargetTexture?(tt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Sc(s[0])){const r=[];for(let a=0,c=s.length;a<c;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function pn(i){const e={};for(let t=0;t<i.length;t++){const n=Es(i[t]);for(const s in n)e[s]=n[s]}return e}function Sc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function $f(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Hh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}const Qf={clone:Es,merge:pn};var jf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ed=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jf,this.fragmentShader=ed,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=$f(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ht().setHex(s.value);break;case"v2":this.uniforms[n].value=new J().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Gt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ct().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Pt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class td extends Jn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class pe extends wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=na,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fa extends pe{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new J(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class nd extends wi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=na,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=cl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class id extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class sd extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Fv extends Ph{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class Cl extends Zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ht(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Wh extends Cl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ht(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const to=new Pt,bc=new L,Ec=new L;class Xh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new Pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sl,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new Gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;bc.setFromMatrixPosition(e.matrixWorld),t.position.copy(bc),Ec.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ec),t.updateMatrixWorld(),to.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(to,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===nr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(to)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const kr=new L,Vr=new ui,zn=new L;class Yh extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=Xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(kr,Vr,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kr,Vr,zn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(kr,Vr,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kr,Vr,zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const vi=new L,wc=new J,Tc=new J;class Mn extends Yh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=tl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return tl*2*Math.atan(Math.tan(Qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,wc,Tc),t.subVectors(Tc,wc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Qr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/o,t-=a.offsetY*n/l,s*=a.width/o,n*=a.height/l}const c=this.filmOffset;c!==0&&(r+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class rd extends Xh{constructor(){super(new Mn(90,1,.5,500)),this.isPointLightShadow=!0}}class ad extends Cl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new rd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Pl extends Yh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,c=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,c-=h*this.view.offsetY,o=c-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,c,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class od extends Xh{constructor(){super(new Pl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class da extends Cl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new od}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const os=-90,ls=1;class ld extends Zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(os,ls,e,t);s.layers=this.layers,this.add(s);const r=new Mn(os,ls,e,t);r.layers=this.layers,this.add(r);const a=new Mn(os,ls,e,t);a.layers=this.layers,this.add(a);const c=new Mn(os,ls,e,t);c.layers=this.layers,this.add(c);const o=new Mn(os,ls,e,t);o.layers=this.layers,this.add(o);const l=new Mn(os,ls,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,c,o]=t;for(const l of t)this.remove(l);if(e===Xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,c,o,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class cd extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class hd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=ud.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function ud(){this._document.hidden===!1&&this.reset()}const Ac=new Pt;class fd{constructor(e,t,n=0,s=1/0){this.ray=new va(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new yl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):_t("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ac.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ac),this}intersectObject(e,t=!0,n=[]){return sl(e,this,n,t),n.sort(Rc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)sl(e[s],this,n,t);return n.sort(Rc),n}}function Rc(i,e){return i.distance-e.distance}function sl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,c=r.length;a<c;a++)sl(r[a],e,t,!0)}}class Cc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Fl=class Fl{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Fl.prototype.isMatrix2=!0;let Pc=Fl;class dd extends Ei{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){tt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Dc(i,e,t,n){const s=pd(n);switch(t){case Mh:return i*e;case pl:return i*e/s.components*s.byteLength;case ml:return i*e/s.components*s.byteLength;case zi:return i*e*2/s.components*s.byteLength;case gl:return i*e*2/s.components*s.byteLength;case yh:return i*e*3/s.components*s.byteLength;case Un:return i*e*4/s.components*s.byteLength;case _l:return i*e*4/s.components*s.byteLength;case Zr:case Kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Jr:case $r:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wo:case Ao:return Math.max(i,16)*Math.max(e,8)/4;case Eo:case To:return Math.max(i,8)*Math.max(e,8)/2;case Ro:case Co:case Do:case Lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Po:case ea:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case No:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Uo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case zo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ko:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Go:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Yo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case qo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Zo:case Ko:case Jo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case $o:case Qo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ta:case jo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pd(i){switch(i){case yn:case gh:return{byteLength:1,components:1};case er:case _h:case ci:return{byteLength:2,components:1};case fl:case dl:return{byteLength:2,components:4};case Zn:case ul:case Nn:return{byteLength:4,components:1};case vh:case xh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ll}}));typeof window<"u"&&(window.__THREE__?tt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ll);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function qh(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function md(i){const e=new WeakMap;function t(c,o){const l=c.array,h=c.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(o,f),i.bufferData(o,l,h),c.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)c.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,o,l){const h=o.array,u=o.updateRanges;if(i.bindBuffer(l,c),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],v=u[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const v=u[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const o=e.get(c);o&&(i.deleteBuffer(o.buffer),e.delete(c))}function a(c,o){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const l=e.get(c);if(l===void 0)e.set(c,t(c,o));else if(l.version<c.version){if(l.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,c,o),l.version=c.version}}return{get:s,remove:r,update:a}}var gd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_d=`#ifdef USE_ALPHAHASH
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
#endif`,vd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Md=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sd=`#ifdef USE_AOMAP
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
#endif`,bd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ed=`#ifdef USE_BATCHING
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
#endif`,wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ad=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cd=`#ifdef USE_IRIDESCENCE
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
#endif`,Pd=`#ifdef USE_BUMPMAP
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
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ud=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Od=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,zd=`#define PI 3.141592653589793
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
} // validated`,kd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vd=`vec3 transformedNormal = objectNormal;
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
#endif`,Gd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yd="gl_FragColor = linearToOutputTexel( gl_FragColor );",qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zd=`#ifdef USE_ENVMAP
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
#endif`,Kd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Jd=`#ifdef USE_ENVMAP
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
#endif`,$d=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qd=`#ifdef USE_ENVMAP
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
#endif`,jd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ep=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ip=`#ifdef USE_GRADIENTMAP
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
}`,sp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,op=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,lp=`#ifdef USE_ENVMAP
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
#endif`,cp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,up=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dp=`PhysicalMaterial material;
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
#endif`,pp=`uniform sampler2D dfgLUT;
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
}`,mp=`
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
#endif`,gp=`#if defined( RE_IndirectDiffuse )
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
#endif`,_p=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ep=`#ifdef USE_MAP
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
#endif`,Tp=`#if defined( USE_POINTS_UV )
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
#endif`,Ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lp=`#ifdef USE_MORPHTARGETS
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
#endif`,Np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Up=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zp=`#ifdef USE_NORMALMAP
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
#endif`,Vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gp=`#ifdef USE_CLEARCOATMAP
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
#endif`,Wp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$p=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,e0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,t0=`float getShadowMask() {
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
}`,n0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i0=`#ifdef USE_SKINNING
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
#endif`,s0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r0=`#ifdef USE_SKINNING
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
#endif`,a0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,o0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,h0=`#ifdef USE_TRANSMISSION
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
#endif`,u0=`#ifdef USE_TRANSMISSION
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
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const g0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_0=`uniform sampler2D t2D;
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
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S0=`#include <common>
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
}`,b0=`#if DEPTH_PACKING == 3200
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
}`,E0=`#define DISTANCE
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
}`,w0=`#define DISTANCE
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
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`uniform float scale;
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
}`,C0=`uniform vec3 diffuse;
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
}`,P0=`#include <common>
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
}`,D0=`uniform vec3 diffuse;
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
}`,L0=`#define LAMBERT
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
}`,I0=`#define LAMBERT
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
}`,N0=`#define MATCAP
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
}`,U0=`#define MATCAP
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
}`,F0=`#define NORMAL
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
}`,O0=`#define NORMAL
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
}`,B0=`#define PHONG
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
}`,z0=`#define PHONG
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
}`,k0=`#define STANDARD
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
}`,V0=`#define STANDARD
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
}`,G0=`#define TOON
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
}`,H0=`#define TOON
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
}`,W0=`uniform float size;
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
}`,X0=`uniform vec3 diffuse;
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
}`,Y0=`#include <common>
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
}`,q0=`uniform vec3 color;
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
}`,Z0=`uniform float rotation;
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
}`,K0=`uniform vec3 diffuse;
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
}`,ft={alphahash_fragment:gd,alphahash_pars_fragment:_d,alphamap_fragment:vd,alphamap_pars_fragment:xd,alphatest_fragment:Md,alphatest_pars_fragment:yd,aomap_fragment:Sd,aomap_pars_fragment:bd,batching_pars_vertex:Ed,batching_vertex:wd,begin_vertex:Td,beginnormal_vertex:Ad,bsdfs:Rd,iridescence_fragment:Cd,bumpmap_pars_fragment:Pd,clipping_planes_fragment:Dd,clipping_planes_pars_fragment:Ld,clipping_planes_pars_vertex:Id,clipping_planes_vertex:Nd,color_fragment:Ud,color_pars_fragment:Fd,color_pars_vertex:Od,color_vertex:Bd,common:zd,cube_uv_reflection_fragment:kd,defaultnormal_vertex:Vd,displacementmap_pars_vertex:Gd,displacementmap_vertex:Hd,emissivemap_fragment:Wd,emissivemap_pars_fragment:Xd,colorspace_fragment:Yd,colorspace_pars_fragment:qd,envmap_fragment:Zd,envmap_common_pars_fragment:Kd,envmap_pars_fragment:Jd,envmap_pars_vertex:$d,envmap_physical_pars_fragment:lp,envmap_vertex:Qd,fog_vertex:jd,fog_pars_vertex:ep,fog_fragment:tp,fog_pars_fragment:np,gradientmap_pars_fragment:ip,lightmap_pars_fragment:sp,lights_lambert_fragment:rp,lights_lambert_pars_fragment:ap,lights_pars_begin:op,lights_toon_fragment:cp,lights_toon_pars_fragment:hp,lights_phong_fragment:up,lights_phong_pars_fragment:fp,lights_physical_fragment:dp,lights_physical_pars_fragment:pp,lights_fragment_begin:mp,lights_fragment_maps:gp,lights_fragment_end:_p,lightprobes_pars_fragment:vp,logdepthbuf_fragment:xp,logdepthbuf_pars_fragment:Mp,logdepthbuf_pars_vertex:yp,logdepthbuf_vertex:Sp,map_fragment:bp,map_pars_fragment:Ep,map_particle_fragment:wp,map_particle_pars_fragment:Tp,metalnessmap_fragment:Ap,metalnessmap_pars_fragment:Rp,morphinstance_vertex:Cp,morphcolor_vertex:Pp,morphnormal_vertex:Dp,morphtarget_pars_vertex:Lp,morphtarget_vertex:Ip,normal_fragment_begin:Np,normal_fragment_maps:Up,normal_pars_fragment:Fp,normal_pars_vertex:Op,normal_vertex:Bp,normalmap_pars_fragment:zp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Vp,clearcoat_pars_fragment:Gp,iridescence_pars_fragment:Hp,opaque_fragment:Wp,packing:Xp,premultiplied_alpha_fragment:Yp,project_vertex:qp,dithering_fragment:Zp,dithering_pars_fragment:Kp,roughnessmap_fragment:Jp,roughnessmap_pars_fragment:$p,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:jp,shadowmap_vertex:e0,shadowmask_pars_fragment:t0,skinbase_vertex:n0,skinning_pars_vertex:i0,skinning_vertex:s0,skinnormal_vertex:r0,specularmap_fragment:a0,specularmap_pars_fragment:o0,tonemapping_fragment:l0,tonemapping_pars_fragment:c0,transmission_fragment:h0,transmission_pars_fragment:u0,uv_pars_fragment:f0,uv_pars_vertex:d0,uv_vertex:p0,worldpos_vertex:m0,background_vert:g0,background_frag:_0,backgroundCube_vert:v0,backgroundCube_frag:x0,cube_vert:M0,cube_frag:y0,depth_vert:S0,depth_frag:b0,distance_vert:E0,distance_frag:w0,equirect_vert:T0,equirect_frag:A0,linedashed_vert:R0,linedashed_frag:C0,meshbasic_vert:P0,meshbasic_frag:D0,meshlambert_vert:L0,meshlambert_frag:I0,meshmatcap_vert:N0,meshmatcap_frag:U0,meshnormal_vert:F0,meshnormal_frag:O0,meshphong_vert:B0,meshphong_frag:z0,meshphysical_vert:k0,meshphysical_frag:V0,meshtoon_vert:G0,meshtoon_frag:H0,points_vert:W0,points_frag:X0,shadow_vert:Y0,shadow_frag:q0,sprite_vert:Z0,sprite_frag:K0},De={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Hn={basic:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:pn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:pn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:pn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new ht(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:pn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:pn([De.points,De.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:pn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:pn([De.common,De.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:pn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:pn([De.sprite,De.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:pn([De.common,De.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:pn([De.lights,De.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};Hn.physical={uniforms:pn([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const Gr={r:0,b:0,g:0},J0=new Pt,Zh=new ct;Zh.set(-1,0,0,0,1,0,0,0,1);function $0(i,e,t,n,s,r){const a=new ht(0);let c=s===!0?0:1,o,l,h=null,u=0,f=null;function d(y){let S=y.isScene===!0?y.background:null;if(S&&S.isTexture){const M=y.backgroundBlurriness>0;S=e.get(S,M)}return S}function g(y){let S=!1;const M=d(y);M===null?m(a,c):M&&M.isColor&&(m(M,1),S=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(y,S){const M=d(S);M&&(M.isCubeTexture||M.mapping===_a)?(l===void 0&&(l=new qe(new Bt(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:Es(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(J0.makeRotationFromEuler(S.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Zh),l.material.toneMapped=Mt.getTransfer(M.colorSpace)!==Ct,(h!==M||u!==M.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(o===void 0&&(o=new qe(new li(2,2),new Jn({name:"BackgroundMaterial",uniforms:Es(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=M,o.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,o.material.toneMapped=Mt.getTransfer(M.colorSpace)!==Ct,M.matrixAutoUpdate===!0&&M.updateMatrix(),o.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==i.toneMapping)&&(o.material.needsUpdate=!0,h=M,u=M.version,f=i.toneMapping),o.layers.enableAll(),y.unshift(o,o.geometry,o.material,0,0,null))}function m(y,S){y.getRGB(Gr,Hh(i)),t.buffers.color.setClear(Gr.r,Gr.g,Gr.b,S,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,S=1){a.set(y),c=S,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,m(a,c)},render:g,addToRenderList:v,dispose:p}}function Q0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function c(N,B,Q,j,z){let Z=!1;const X=u(N,j,Q,B);r!==X&&(r=X,l(r.object)),Z=d(N,j,Q,z),Z&&g(N,j,Q,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,M(N,B,Q,j),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function o(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function u(N,B,Q,j){const z=j.wireframe===!0;let Z=n[B.id];Z===void 0&&(Z={},n[B.id]=Z);const X=N.isInstancedMesh===!0?N.id:0;let re=Z[X];re===void 0&&(re={},Z[X]=re);let de=re[Q.id];de===void 0&&(de={},re[Q.id]=de);let me=de[z];return me===void 0&&(me=f(o()),de[z]=me),me}function f(N){const B=[],Q=[],j=[];for(let z=0;z<t;z++)B[z]=0,Q[z]=0,j[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:Q,attributeDivisors:j,object:N,attributes:{},index:null}}function d(N,B,Q,j){const z=r.attributes,Z=B.attributes;let X=0;const re=Q.getAttributes();for(const de in re)if(re[de].location>=0){const ge=z[de];let Se=Z[de];if(Se===void 0&&(de==="instanceMatrix"&&N.instanceMatrix&&(Se=N.instanceMatrix),de==="instanceColor"&&N.instanceColor&&(Se=N.instanceColor)),ge===void 0||ge.attribute!==Se||Se&&ge.data!==Se.data)return!0;X++}return r.attributesNum!==X||r.index!==j}function g(N,B,Q,j){const z={},Z=B.attributes;let X=0;const re=Q.getAttributes();for(const de in re)if(re[de].location>=0){let ge=Z[de];ge===void 0&&(de==="instanceMatrix"&&N.instanceMatrix&&(ge=N.instanceMatrix),de==="instanceColor"&&N.instanceColor&&(ge=N.instanceColor));const Se={};Se.attribute=ge,ge&&ge.data&&(Se.data=ge.data),z[de]=Se,X++}r.attributes=z,r.attributesNum=X,r.index=j}function v(){const N=r.newAttributes;for(let B=0,Q=N.length;B<Q;B++)N[B]=0}function m(N){p(N,0)}function p(N,B){const Q=r.newAttributes,j=r.enabledAttributes,z=r.attributeDivisors;Q[N]=1,j[N]===0&&(i.enableVertexAttribArray(N),j[N]=1),z[N]!==B&&(i.vertexAttribDivisor(N,B),z[N]=B)}function y(){const N=r.newAttributes,B=r.enabledAttributes;for(let Q=0,j=B.length;Q<j;Q++)B[Q]!==N[Q]&&(i.disableVertexAttribArray(Q),B[Q]=0)}function S(N,B,Q,j,z,Z,X){X===!0?i.vertexAttribIPointer(N,B,Q,z,Z):i.vertexAttribPointer(N,B,Q,j,z,Z)}function M(N,B,Q,j){v();const z=j.attributes,Z=Q.getAttributes(),X=B.defaultAttributeValues;for(const re in Z){const de=Z[re];if(de.location>=0){let me=z[re];if(me===void 0&&(re==="instanceMatrix"&&N.instanceMatrix&&(me=N.instanceMatrix),re==="instanceColor"&&N.instanceColor&&(me=N.instanceColor)),me!==void 0){const ge=me.normalized,Se=me.itemSize,rt=e.get(me);if(rt===void 0)continue;const Et=rt.buffer,st=rt.type,ne=rt.bytesPerElement,ve=st===i.INT||st===i.UNSIGNED_INT||me.gpuType===ul;if(me.isInterleavedBufferAttribute){const he=me.data,Ne=he.stride,Je=me.offset;if(he.isInstancedInterleavedBuffer){for(let Ge=0;Ge<de.locationSize;Ge++)p(de.location+Ge,he.meshPerAttribute);N.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ge=0;Ge<de.locationSize;Ge++)m(de.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Ge=0;Ge<de.locationSize;Ge++)S(de.location+Ge,Se/de.locationSize,st,ge,Ne*ne,(Je+Se/de.locationSize*Ge)*ne,ve)}else{if(me.isInstancedBufferAttribute){for(let he=0;he<de.locationSize;he++)p(de.location+he,me.meshPerAttribute);N.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let he=0;he<de.locationSize;he++)m(de.location+he);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let he=0;he<de.locationSize;he++)S(de.location+he,Se/de.locationSize,st,ge,Se*ne,Se/de.locationSize*he*ne,ve)}}else if(X!==void 0){const ge=X[re];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(de.location,ge);break;case 3:i.vertexAttrib3fv(de.location,ge);break;case 4:i.vertexAttrib4fv(de.location,ge);break;default:i.vertexAttrib1fv(de.location,ge)}}}}y()}function T(){w();for(const N in n){const B=n[N];for(const Q in B){const j=B[Q];for(const z in j){const Z=j[z];for(const X in Z)h(Z[X].object),delete Z[X];delete j[z]}}delete n[N]}}function E(N){if(n[N.id]===void 0)return;const B=n[N.id];for(const Q in B){const j=B[Q];for(const z in j){const Z=j[z];for(const X in Z)h(Z[X].object),delete Z[X];delete j[z]}}delete n[N.id]}function C(N){for(const B in n){const Q=n[B];for(const j in Q){const z=Q[j];if(z[N.id]===void 0)continue;const Z=z[N.id];for(const X in Z)h(Z[X].object),delete Z[X];delete z[N.id]}}}function _(N){for(const B in n){const Q=n[B],j=N.isInstancedMesh===!0?N.id:0,z=Q[j];if(z!==void 0){for(const Z in z){const X=z[Z];for(const re in X)h(X[re].object),delete X[re];delete z[Z]}delete Q[j],Object.keys(Q).length===0&&delete n[B]}}}function w(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:w,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function j0(i,e,t){let n;function s(o){n=o}function r(o,l){i.drawArrays(n,o,l),t.update(l,n,1)}function a(o,l,h){h!==0&&(i.drawArraysInstanced(n,o,l,h),t.update(l,n,h))}function c(o,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=c}function em(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Un&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const _=C===ci&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==yn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Nn&&!_)}function o(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=o(l);h!==l&&(tt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&tt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:c,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:S,maxFragmentUniforms:M,maxSamples:T,samples:E}}function tm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ni,c=new ct,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const y=r?0:n,S=y*4;let M=p.clippingState||null;o.value=M,M=h(g,f,S,d);for(let T=0;T!==S;++T)M[T]=t[T];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=o.value,g!==!0||m===null){const p=d+v*4,y=f.matrixWorldInverse;c.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,M=d;S!==v;++S,M+=4)a.copy(u[S]).applyMatrix4(y,c),a.normal.toArray(m,M),m[M+3]=a.constant}o.value=m,o.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const Si=4,Lc=[.125,.215,.35,.446,.526,.582],Ni=20,nm=256,Hs=new Pl,Ic=new ht;let no=null,io=0,so=0,ro=!1;const im=new L;class rl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:c=im}=r;no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o,c),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(no,io,so),this._renderer.xr.enabled=ro,e.scissorTest=!1,cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:un,minFilter:un,generateMipmaps:!1,type:ci,format:Un,colorSpace:ia,depthBuffer:!1},s=Nc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=sm(r)),this._blurMaterial=am(r,e,t),this._ggxMaterial=rm(r,e,t)}return s}_compileMaterial(e){const t=new qe(new Kt,e);this._renderer.compile(t,Hs)}_sceneToCubeUV(e,t,n,s,r){const o=new Mn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Ic),u.toneMapping=Yn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qe(new Bt,new ir({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(Ic),p=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x+h[S],r.y,r.z)):M===1?(o.up.set(0,0,l[S]),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y+h[S],r.z)):(o.up.set(0,l[S],0),o.position.set(r.x,r.y,r.z),o.lookAt(r.x,r.y,r.z+h[S]));const T=this._cubeSize;cs(s,M*T,S>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(v,o),u.render(e,o)}u.toneMapping=d,u.autoClear=f,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Bi||e.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const c=r.uniforms;c.envMap.value=e;const o=this._cubeSize;cs(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,Hs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const o=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=0+l*1.25,d=u*f,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Si?n-g+Si:0),p=4*(this._cubeSize-v);o.envMap.value=e.texture,o.roughness.value=d,o.mipInt.value=g-t,cs(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(c,Hs),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=g-n,cs(e,m,p,3*v,2*v),s.setRenderTarget(e),s.render(c,Hs)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,c){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&_t("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ni-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Ni;m>Ni&&tt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ni}`);const p=[];let y=0;for(let C=0;C<Ni;++C){const _=C/v,w=Math.exp(-_*_/2);p.push(w),C===0?y+=w:C<m&&(y+=2*w)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const M=this._sizeLods[s],T=3*M*(s>S-Si?s-S+Si:0),E=4*(this._cubeSize-M);cs(t,T,E,3*M,2*M),o.setRenderTarget(t),o.render(u,Hs)}}function sm(i){const e=[],t=[],n=[];let s=i;const r=i-Si+1+Lc.length;for(let a=0;a<r;a++){const c=Math.pow(2,s);e.push(c);let o=1/c;a>i-Si?o=Lc[a-i+Si-1]:a===0&&(o=0),t.push(o);const l=1/(c-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,p=1,y=new Float32Array(v*g*d),S=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let E=0;E<d;E++){const C=E%3*2/3-1,_=E>2?0:-1,w=[C,_,0,C+2/3,_,0,C+2/3,_+1,0,C,_,0,C+2/3,_+1,0,C,_+1,0];y.set(w,v*g*E),S.set(f,m*g*E);const P=[E,E,E,E,E,E];M.set(P,p*g*E)}const T=new Kt;T.setAttribute("position",new Tn(y,v)),T.setAttribute("uv",new Tn(S,m)),T.setAttribute("faceIndex",new Tn(M,p)),n.push(new qe(T,null)),s>Si&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Nc(i,e,t){const n=new qn(i,e,t);return n.texture.mapping=_a,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function cs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function rm(i,e,t){return new Jn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:nm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xa(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function am(i,e,t){const n=new Float32Array(Ni),s=new L(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xa(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Uc(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xa(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Fc(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function xa(){return`

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
	`}class Kh extends qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Dh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Bt(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:mn,blending:si});r.uniforms.tEquirect.value=t;const a=new qe(s,r),c=t.minFilter;return t.minFilter===Ui&&(t.minFilter=un),new ld(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function om(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Ea||d===wa)if(e.has(f)){const g=e.get(f).texture;return c(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const v=new Kh(g.height);return v.fromEquirectangularTexture(i,f),e.set(f,v),f.addEventListener("dispose",l),c(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,g=d===Ea||d===wa,v=d===Bi||d===ys;if(g||v){let m=t.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new rl(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const y=f.image;return g&&y&&y.height>0||v&&y&&o(y)?(n===null&&(n=new rl(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function c(f,d){return d===Ea?f.mapping=Bi:d===wa&&(f.mapping=ys),f}function o(f){let d=0;const g=6;for(let v=0;v<g;v++)f[v]!==void 0&&d++;return d===g}function l(f){const d=f.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function lm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&_s("WebGLRenderer: "+n+" extension not supported."),s}}}function cm(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function o(u){const f=u.attributes;for(const d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,g=u.attributes.position;let v=0;if(g===void 0)return;if(d!==null){const y=d.array;v=d.version;for(let S=0,M=y.length;S<M;S+=3){const T=y[S+0],E=y[S+1],C=y[S+2];f.push(T,E,E,C,C,T)}}else{const y=g.array;v=g.version;for(let S=0,M=y.length/3-1;S<M;S+=3){const T=S+0,E=S+1,C=S+2;f.push(T,E,E,C,C,T)}}const m=new(g.count>=65535?Ah:Th)(f,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:c,update:o,getWireframeAttribute:h}}function hm(i,e,t){let n;function s(u){n=u}let r,a;function c(u){r=u.type,a=u.bytesPerElement}function o(u,f){i.drawElements(n,f,r,u*a),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*a,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let v=0;for(let m=0;m<d;m++)v+=f[m];t.update(v,n,1)}this.setMode=s,this.setIndex=c,this.render=o,this.renderInstances=l,this.renderMultiDraw=h}function um(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(r/3);break;case i.LINES:t.lines+=c*(r/2);break;case i.LINE_STRIP:t.lines+=c*(r-1);break;case i.LINE_LOOP:t.lines+=c*r;break;case i.POINTS:t.points+=c*r;break;default:_t("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function fm(i,e,t){const n=new WeakMap,s=new Gt;function r(a,c,o){const l=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let w=function(){C.dispose(),n.delete(c),c.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();const d=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,v=c.morphAttributes.color!==void 0,m=c.morphAttributes.position||[],p=c.morphAttributes.normal||[],y=c.morphAttributes.color||[];let S=0;d===!0&&(S=1),g===!0&&(S=2),v===!0&&(S=3);let M=c.attributes.position.count*S,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const E=new Float32Array(M*T*4*u),C=new bh(E,M,T,u);C.type=Nn,C.needsUpdate=!0;const _=S*4;for(let P=0;P<u;P++){const N=m[P],B=p[P],Q=y[P],j=M*T*4*P;for(let z=0;z<N.count;z++){const Z=z*_;d===!0&&(s.fromBufferAttribute(N,z),E[j+Z+0]=s.x,E[j+Z+1]=s.y,E[j+Z+2]=s.z,E[j+Z+3]=0),g===!0&&(s.fromBufferAttribute(B,z),E[j+Z+4]=s.x,E[j+Z+5]=s.y,E[j+Z+6]=s.z,E[j+Z+7]=0),v===!0&&(s.fromBufferAttribute(Q,z),E[j+Z+8]=s.x,E[j+Z+9]=s.y,E[j+Z+10]=s.z,E[j+Z+11]=Q.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new J(M,T)},n.set(c,f),c.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const g=c.morphTargetsRelative?1:1-d;o.getUniforms().setValue(i,"morphTargetBaseInfluence",g),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function dm(i,e,t,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function c(){r=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const pm={[ch]:"LINEAR_TONE_MAPPING",[hh]:"REINHARD_TONE_MAPPING",[uh]:"CINEON_TONE_MAPPING",[hl]:"ACES_FILMIC_TONE_MAPPING",[dh]:"AGX_TONE_MAPPING",[ph]:"NEUTRAL_TONE_MAPPING",[fh]:"CUSTOM_TONE_MAPPING"};function mm(i,e,t,n,s,r){const a=new qn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Ss(e,t):void 0}),c=new qn(e,t,{type:ci,depthBuffer:!1,stencilBuffer:!1}),o=new Kt;o.setAttribute("position",new vt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new vt([0,2,0,0,2,0],2));const l=new td({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new qe(o,l),u=new Pl(-1,1,1,-1,0,1);let f=null,d=null,g=!1,v,m=null,p=[],y=!1;this.setSize=function(S,M){a.setSize(S,M),c.setSize(S,M);for(let T=0;T<p.length;T++){const E=p[T];E.setSize&&E.setSize(S,M)}},this.setEffects=function(S){p=S,y=p.length>0&&p[0].isRenderPass===!0;const M=a.width,T=a.height;for(let E=0;E<p.length;E++){const C=p[E];C.setSize&&C.setSize(M,T)}},this.begin=function(S,M){if(g||S.toneMapping===Yn&&p.length===0)return!1;if(m=M,M!==null){const T=M.width,E=M.height;(a.width!==T||a.height!==E)&&this.setSize(T,E)}return y===!1&&S.setRenderTarget(a),v=S.toneMapping,S.toneMapping=Yn,!0},this.hasRenderPass=function(){return y},this.end=function(S,M){S.toneMapping=v,g=!0;let T=a,E=c;for(let C=0;C<p.length;C++){const _=p[C];if(_.enabled!==!1&&(_.render(S,E,T,M),_.needsSwap!==!1)){const w=T;T=E,E=w}}if(f!==S.outputColorSpace||d!==S.toneMapping){f=S.outputColorSpace,d=S.toneMapping,l.defines={},Mt.getTransfer(f)===Ct&&(l.defines.SRGB_TRANSFER="");const C=pm[d];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,S.setRenderTarget(m),S.render(h,u),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),c.dispose(),o.dispose(),l.dispose()}}const Jh=new fn,al=new Ss(1,1),$h=new bh,Qh=new Qu,jh=new Dh,Oc=[],Bc=[],zc=new Float32Array(16),kc=new Float32Array(9),Vc=new Float32Array(4);function Ts(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Oc[s];if(r===void 0&&(r=new Float32Array(s),Oc[s]=r),e!==0){n.toArray(r,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(r,c)}return r}function jt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function en(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ma(i,e){let t=Bc[e];t===void 0&&(t=new Int32Array(e),Bc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function gm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function _m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2fv(this.addr,e),en(t,e)}}function vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(jt(t,e))return;i.uniform3fv(this.addr,e),en(t,e)}}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4fv(this.addr,e),en(t,e)}}function Mm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),en(t,e)}else{if(jt(t,n))return;Vc.set(n),i.uniformMatrix2fv(this.addr,!1,Vc),en(t,n)}}function ym(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),en(t,e)}else{if(jt(t,n))return;kc.set(n),i.uniformMatrix3fv(this.addr,!1,kc),en(t,n)}}function Sm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(jt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),en(t,e)}else{if(jt(t,n))return;zc.set(n),i.uniformMatrix4fv(this.addr,!1,zc),en(t,n)}}function bm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2iv(this.addr,e),en(t,e)}}function wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3iv(this.addr,e),en(t,e)}}function Tm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4iv(this.addr,e),en(t,e)}}function Am(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(jt(t,e))return;i.uniform2uiv(this.addr,e),en(t,e)}}function Cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(jt(t,e))return;i.uniform3uiv(this.addr,e),en(t,e)}}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(jt(t,e))return;i.uniform4uiv(this.addr,e),en(t,e)}}function Dm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(al.compareFunction=t.isReversedDepthBuffer()?xl:vl,r=al):r=Jh,t.setTexture2D(e||r,s)}function Lm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Qh,s)}function Im(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||jh,s)}function Nm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||$h,s)}function Um(i){switch(i){case 5126:return gm;case 35664:return _m;case 35665:return vm;case 35666:return xm;case 35674:return Mm;case 35675:return ym;case 35676:return Sm;case 5124:case 35670:return bm;case 35667:case 35671:return Em;case 35668:case 35672:return wm;case 35669:case 35673:return Tm;case 5125:return Am;case 36294:return Rm;case 36295:return Cm;case 36296:return Pm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Lm;case 35680:case 36300:case 36308:case 36293:return Im;case 36289:case 36303:case 36311:case 36292:return Nm}}function Fm(i,e){i.uniform1fv(this.addr,e)}function Om(i,e){const t=Ts(e,this.size,2);i.uniform2fv(this.addr,t)}function Bm(i,e){const t=Ts(e,this.size,3);i.uniform3fv(this.addr,t)}function zm(i,e){const t=Ts(e,this.size,4);i.uniform4fv(this.addr,t)}function km(i,e){const t=Ts(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Vm(i,e){const t=Ts(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gm(i,e){const t=Ts(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hm(i,e){i.uniform1iv(this.addr,e)}function Wm(i,e){i.uniform2iv(this.addr,e)}function Xm(i,e){i.uniform3iv(this.addr,e)}function Ym(i,e){i.uniform4iv(this.addr,e)}function qm(i,e){i.uniform1uiv(this.addr,e)}function Zm(i,e){i.uniform2uiv(this.addr,e)}function Km(i,e){i.uniform3uiv(this.addr,e)}function Jm(i,e){i.uniform4uiv(this.addr,e)}function $m(i,e,t){const n=this.cache,s=e.length,r=Ma(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),en(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=al:a=Jh;for(let c=0;c!==s;++c)t.setTexture2D(e[c]||a,r[c])}function Qm(i,e,t){const n=this.cache,s=e.length,r=Ma(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),en(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Qh,r[a])}function jm(i,e,t){const n=this.cache,s=e.length,r=Ma(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),en(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||jh,r[a])}function eg(i,e,t){const n=this.cache,s=e.length,r=Ma(t,s);jt(n,r)||(i.uniform1iv(this.addr,r),en(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||$h,r[a])}function tg(i){switch(i){case 5126:return Fm;case 35664:return Om;case 35665:return Bm;case 35666:return zm;case 35674:return km;case 35675:return Vm;case 35676:return Gm;case 5124:case 35670:return Hm;case 35667:case 35671:return Wm;case 35668:case 35672:return Xm;case 35669:case 35673:return Ym;case 5125:return qm;case 36294:return Zm;case 36295:return Km;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return $m;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return eg}}class ng{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Um(t.type)}}class ig{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tg(t.type)}}class sg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const c=s[r];c.setValue(e,t[c.id],n)}}}const ao=/(\w+)(\])?(\[|\.)?/g;function Gc(i,e){i.seq.push(e),i.map[e.id]=e}function rg(i,e,t){const n=i.name,s=n.length;for(ao.lastIndex=0;;){const r=ao.exec(n),a=ao.lastIndex;let c=r[1];const o=r[2]==="]",l=r[3];if(o&&(c=c|0),l===void 0||l==="["&&a+2===s){Gc(t,l===void 0?new ng(c,i,e):new ig(c,i,e));break}else{let u=t.map[c];u===void 0&&(u=new sg(c),Gc(t,u)),t=u}}}class jr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),o=e.getUniformLocation(t,c.name);rg(c,o,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const c=t[r],o=n[c.id];o.needsUpdate!==!1&&c.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Hc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ag=37297;let og=0;function lg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const Wc=new ct;function cg(i){Mt._getMatrix(Wc,Mt.workingColorSpace,i);const e=`mat3( ${Wc.elements.map(t=>t.toFixed(4))} )`;switch(Mt.getTransfer(i)){case sa:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return tt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Xc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+lg(i.getShaderSource(e),c)}else return r}function hg(i,e){const t=cg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const ug={[ch]:"Linear",[hh]:"Reinhard",[uh]:"Cineon",[hl]:"ACESFilmic",[dh]:"AgX",[ph]:"Neutral",[fh]:"Custom"};function fg(i,e){const t=ug[e];return t===void 0?(tt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Hr=new L;function dg(){Mt.getLuminanceCoefficients(Hr);const i=Hr.x.toFixed(4),e=Hr.y.toFixed(4),t=Hr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Js).join(`
`)}function mg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function gg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let c=1;r.type===i.FLOAT_MAT2&&(c=2),r.type===i.FLOAT_MAT3&&(c=3),r.type===i.FLOAT_MAT4&&(c=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function Js(i){return i!==""}function Yc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _g=/^[ \t]*#include +<([\w\d./]+)>/gm;function ol(i){return i.replace(_g,xg)}const vg=new Map;function xg(i,e){let t=ft[e];if(t===void 0){const n=vg.get(e);if(n!==void 0)t=ft[n],tt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ol(t)}const Mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zc(i){return i.replace(Mg,yg)}function yg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Sg={[$s]:"SHADOWMAP_TYPE_PCF",[qs]:"SHADOWMAP_TYPE_VSM"};function bg(i){return Sg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Eg={[Bi]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[_a]:"ENVMAP_TYPE_CUBE_UV"};function wg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Eg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Tg={[ys]:"ENVMAP_MODE_REFRACTION"};function Ag(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Tg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Rg={[cl]:"ENVMAP_BLENDING_MULTIPLY",[Pu]:"ENVMAP_BLENDING_MIX",[Du]:"ENVMAP_BLENDING_ADD"};function Cg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Rg[i.combine]||"ENVMAP_BLENDING_NONE"}function Pg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Dg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,c=t.fragmentShader;const o=bg(t),l=wg(t),h=Ag(t),u=Cg(t),f=Pg(t),d=pg(t),g=mg(r),v=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Js).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Js).join(`
`),p.length>0&&(p+=`
`)):(m=[Kc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Js).join(`
`),p=[Kc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?ft.tonemapping_pars_fragment:"",t.toneMapping!==Yn?fg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,hg("linearToOutputTexel",t.outputColorSpace),dg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Js).join(`
`)),a=ol(a),a=Yc(a,t),a=qc(a,t),c=ol(c),c=Yc(c,t),c=qc(c,t),a=Zc(a),c=Zc(c),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=y+m+a,M=y+p+c,T=Hc(s,s.VERTEX_SHADER,S),E=Hc(s,s.FRAGMENT_SHADER,M);s.attachShader(v,T),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(N){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(v)||"",Q=s.getShaderInfoLog(T)||"",j=s.getShaderInfoLog(E)||"",z=B.trim(),Z=Q.trim(),X=j.trim();let re=!0,de=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(re=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,E);else{const me=Xc(s,T,"vertex"),ge=Xc(s,E,"fragment");_t("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+z+`
`+me+`
`+ge)}else z!==""?tt("WebGLProgram: Program Info Log:",z):(Z===""||X==="")&&(de=!1);de&&(N.diagnostics={runnable:re,programLog:z,vertexShader:{log:Z,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(T),s.deleteShader(E),_=new jr(s,v),w=gg(s,v)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,ag)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=og++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=E,this}let Lg=0;class Ig{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ng(e),t.set(e,n)),n}}class Ng{constructor(e){this.id=Lg++,this.code=e,this.usedTimes=0}}function Ug(i){return i===zi||i===ea||i===ta}function Fg(i,e,t,n,s,r){const a=new yl,c=new Ig,o=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return o.add(_),_===0?"uv":`uv${_}`}function v(_,w,P,N,B,Q){const j=N.fog,z=B.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?N.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,re=e.get(_.envMap||Z,X),de=re&&re.mapping===_a?re.image.height:null,me=d[_.type];_.precision!==null&&(f=n.getMaxPrecision(_.precision),f!==_.precision&&tt("WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));const ge=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Se=ge!==void 0?ge.length:0;let rt=0;z.morphAttributes.position!==void 0&&(rt=1),z.morphAttributes.normal!==void 0&&(rt=2),z.morphAttributes.color!==void 0&&(rt=3);let Et,st,ne,ve;if(me){const Ue=Hn[me];Et=Ue.vertexShader,st=Ue.fragmentShader}else{Et=_.vertexShader,st=_.fragmentShader;const Ue=c.getVertexShaderStage(_),Dt=c.getFragmentShaderStage(_);c.update(_,Ue,Dt),ne=Ue.id,ve=Dt.id}const he=i.getRenderTarget(),Ne=i.state.buffers.depth.getReversed(),Je=B.isInstancedMesh===!0,Ge=B.isBatchedMesh===!0,mt=!!_.map,je=!!_.matcap,oe=!!re,ue=!!_.aoMap,fe=!!_.lightMap,Te=!!_.bumpMap&&_.wireframe===!1,Me=!!_.normalMap,Ze=!!_.displacementMap,Oe=!!_.emissiveMap,et=!!_.metalnessMap,it=!!_.roughnessMap,F=_.anisotropy>0,yt=_.clearcoat>0,dt=_.dispersion>0,A=_.iridescence>0,x=_.sheen>0,V=_.transmission>0,Y=F&&!!_.anisotropyMap,te=yt&&!!_.clearcoatMap,ae=yt&&!!_.clearcoatNormalMap,xe=yt&&!!_.clearcoatRoughnessMap,$=A&&!!_.iridescenceMap,se=A&&!!_.iridescenceThicknessMap,we=x&&!!_.sheenColorMap,He=x&&!!_.sheenRoughnessMap,Ae=!!_.specularMap,be=!!_.specularColorMap,Be=!!_.specularIntensityMap,$e=V&&!!_.transmissionMap,lt=V&&!!_.thicknessMap,O=!!_.gradientMap,ye=!!_.alphaMap,ie=_.alphaTest>0,Ee=!!_.alphaHash,Pe=!!_.extensions;let le=Yn;_.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(le=i.toneMapping);const ze={shaderID:me,shaderType:_.type,shaderName:_.name,vertexShader:Et,fragmentShader:st,defines:_.defines,customVertexShaderID:ne,customFragmentShaderID:ve,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&B._colorsTexture!==null,instancing:Je,instancingColor:Je&&B.instanceColor!==null,instancingMorph:Je&&B.morphTexture!==null,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:mt,matcap:je,envMap:oe,envMapMode:oe&&re.mapping,envMapCubeUVHeight:de,aoMap:ue,lightMap:fe,bumpMap:Te,normalMap:Me,displacementMap:Ze,emissiveMap:Oe,normalMapObjectSpace:Me&&_.normalMapType===Nu,normalMapTangentSpace:Me&&_.normalMapType===na,packedNormalMap:Me&&_.normalMapType===na&&Ug(_.normalMap.format),metalnessMap:et,roughnessMap:it,anisotropy:F,anisotropyMap:Y,clearcoat:yt,clearcoatMap:te,clearcoatNormalMap:ae,clearcoatRoughnessMap:xe,dispersion:dt,iridescence:A,iridescenceMap:$,iridescenceThicknessMap:se,sheen:x,sheenColorMap:we,sheenRoughnessMap:He,specularMap:Ae,specularColorMap:be,specularIntensityMap:Be,transmission:V,transmissionMap:$e,thicknessMap:lt,gradientMap:O,opaque:_.transparent===!1&&_.blending===gs&&_.alphaToCoverage===!1,alphaMap:ye,alphaTest:ie,alphaHash:Ee,combine:_.combine,mapUv:mt&&g(_.map.channel),aoMapUv:ue&&g(_.aoMap.channel),lightMapUv:fe&&g(_.lightMap.channel),bumpMapUv:Te&&g(_.bumpMap.channel),normalMapUv:Me&&g(_.normalMap.channel),displacementMapUv:Ze&&g(_.displacementMap.channel),emissiveMapUv:Oe&&g(_.emissiveMap.channel),metalnessMapUv:et&&g(_.metalnessMap.channel),roughnessMapUv:it&&g(_.roughnessMap.channel),anisotropyMapUv:Y&&g(_.anisotropyMap.channel),clearcoatMapUv:te&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ae&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:se&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:we&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:He&&g(_.sheenRoughnessMap.channel),specularMapUv:Ae&&g(_.specularMap.channel),specularColorMapUv:be&&g(_.specularColorMap.channel),specularIntensityMapUv:Be&&g(_.specularIntensityMap.channel),transmissionMapUv:$e&&g(_.transmissionMap.channel),thicknessMapUv:lt&&g(_.thicknessMap.channel),alphaMapUv:ye&&g(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Me||F),vertexNormals:!!z.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!z.attributes.uv&&(mt||ye),fog:!!j,useFog:_.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||z.attributes.normal===void 0&&Me===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ne,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:rt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:le,decodeVideoTexture:mt&&_.map.isVideoTexture===!0&&Mt.getTransfer(_.map.colorSpace)===Ct,decodeVideoTextureEmissive:Oe&&_.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(_.emissiveMap.colorSpace)===Ct,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===qt,flipSided:_.side===mn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Pe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&_.extensions.multiDraw===!0||Ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ze.vertexUv1s=o.has(1),ze.vertexUv2s=o.has(2),ze.vertexUv3s=o.has(3),o.clear(),ze}function m(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)w.push(P),w.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(p(w,_),y(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function p(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function y(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function S(_){const w=d[_.type];let P;if(w){const N=Hn[w];P=Qf.clone(N.uniforms)}else P=_.uniforms;return P}function M(_,w){let P=h.get(w);return P!==void 0?++P.usedTimes:(P=new Dg(i,w,_,s),l.push(P),h.set(w,P)),P}function T(_){if(--_.usedTimes===0){const w=l.indexOf(_);l[w]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function E(_){c.remove(_)}function C(){c.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:S,acquireProgram:M,releaseProgram:T,releaseShaderCache:E,programs:l,dispose:C}}function Og(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function s(a,c,o){i.get(a)[c]=o}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Bg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Jc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function $c(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function c(f,d,g,v,m,p){let y=i[e];return y===void 0?(y={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:m,group:p},i[e]=y):(y.id=f.id,y.object=f,y.geometry=d,y.material=g,y.materialVariant=a(f),y.groupOrder=v,y.renderOrder=f.renderOrder,y.z=m,y.group=p),e++,y}function o(f,d,g,v,m,p){const y=c(f,d,g,v,m,p);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):t.push(y)}function l(f,d,g,v,m,p){const y=c(f,d,g,v,m,p);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):t.unshift(y)}function h(f,d,g){t.length>1&&t.sort(f||Bg),n.length>1&&n.sort(d||Jc),s.length>1&&s.sort(d||Jc),g&&(t.reverse(),n.reverse(),s.reverse())}function u(){for(let f=e,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:h}}function zg(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new $c,i.set(n,[a])):s>=r.length?(a=new $c,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function kg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ht};break;case"SpotLight":t={position:new L,direction:new L,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Vg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Gg=0;function Hg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Wg(i){const e=new kg,t=Vg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new Pt,a=new Pt;function c(l){let h=0,u=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let d=0,g=0,v=0,m=0,p=0,y=0,S=0,M=0,T=0,E=0,C=0;l.sort(Hg);for(let w=0,P=l.length;w<P;w++){const N=l[w],B=N.color,Q=N.intensity,j=N.distance;let z=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===zi?z=N.shadow.map.texture:z=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=B.r*Q,u+=B.g*Q,f+=B.b*Q;else if(N.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(N.sh.coefficients[Z],Q);C++}else if(N.isDirectionalLight){const Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const X=N.shadow,re=t.get(N);re.shadowIntensity=X.intensity,re.shadowBias=X.bias,re.shadowNormalBias=X.normalBias,re.shadowRadius=X.radius,re.shadowMapSize=X.mapSize,n.directionalShadow[d]=re,n.directionalShadowMap[d]=z,n.directionalShadowMatrix[d]=N.shadow.matrix,y++}n.directional[d]=Z,d++}else if(N.isSpotLight){const Z=e.get(N);Z.position.setFromMatrixPosition(N.matrixWorld),Z.color.copy(B).multiplyScalar(Q),Z.distance=j,Z.coneCos=Math.cos(N.angle),Z.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Z.decay=N.decay,n.spot[v]=Z;const X=N.shadow;if(N.map&&(n.spotLightMap[T]=N.map,T++,X.updateMatrices(N),N.castShadow&&E++),n.spotLightMatrix[v]=X.matrix,N.castShadow){const re=t.get(N);re.shadowIntensity=X.intensity,re.shadowBias=X.bias,re.shadowNormalBias=X.normalBias,re.shadowRadius=X.radius,re.shadowMapSize=X.mapSize,n.spotShadow[v]=re,n.spotShadowMap[v]=z,M++}v++}else if(N.isRectAreaLight){const Z=e.get(N);Z.color.copy(B).multiplyScalar(Q),Z.halfWidth.set(N.width*.5,0,0),Z.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=Z,m++}else if(N.isPointLight){const Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),Z.distance=N.distance,Z.decay=N.decay,N.castShadow){const X=N.shadow,re=t.get(N);re.shadowIntensity=X.intensity,re.shadowBias=X.bias,re.shadowNormalBias=X.normalBias,re.shadowRadius=X.radius,re.shadowMapSize=X.mapSize,re.shadowCameraNear=X.camera.near,re.shadowCameraFar=X.camera.far,n.pointShadow[g]=re,n.pointShadowMap[g]=z,n.pointShadowMatrix[g]=N.shadow.matrix,S++}n.point[g]=Z,g++}else if(N.isHemisphereLight){const Z=e.get(N);Z.skyColor.copy(N.color).multiplyScalar(Q),Z.groundColor.copy(N.groundColor).multiplyScalar(Q),n.hemi[p]=Z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const _=n.hash;(_.directionalLength!==d||_.pointLength!==g||_.spotLength!==v||_.rectAreaLength!==m||_.hemiLength!==p||_.numDirectionalShadows!==y||_.numPointShadows!==S||_.numSpotShadows!==M||_.numSpotMaps!==T||_.numLightProbes!==C)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=M+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,_.directionalLength=d,_.pointLength=g,_.spotLength=v,_.rectAreaLength=m,_.hemiLength=p,_.numDirectionalShadows=y,_.numPointShadows=S,_.numSpotShadows=M,_.numSpotMaps=T,_.numLightProbes=C,n.version=Gg++)}function o(l,h){let u=0,f=0,d=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const S=l[p];if(S.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(S.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(S.isPointLight){const M=n.point[f];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:c,setupView:o,state:n}}function Qc(i){const e=new Wg(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){t.push(f)}function c(f){n.push(f)}function o(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:o}}function Xg(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let c;return a===void 0?(c=new Qc(i),e.set(s,[c])):r>=a.length?(c=new Qc(i),a.push(c)):c=a[r],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const Yg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qg=`uniform sampler2D shadow_pass;
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
}`,Zg=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Kg=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],jc=new Pt,Ws=new L,oo=new L;function Jg(i,e,t){let n=new Sl;const s=new J,r=new J,a=new Gt,c=new id,o=new sd,l={},h=t.maxTextureSize,u={[bi]:mn,[mn]:bi,[qt]:qt},f=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:Yg,fragmentShader:qg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Kt;g.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new qe(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$s;let p=this.type;this.render=function(E,C,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===uu&&(tt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=$s);const w=i.getRenderTarget(),P=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),B=i.state;B.setBlending(si),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const Q=p!==this.type;Q&&C.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(z=>z.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,z=E.length;j<z;j++){const Z=E[j],X=Z.shadow;if(X===void 0){tt("WebGLShadowMap:",Z,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const re=X.getFrameExtents();s.multiply(re),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/re.x),s.x=r.x*re.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/re.y),s.y=r.y*re.y,X.mapSize.y=r.y));const de=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=de,X.map===null||Q===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===qs){if(Z.isPointLight){tt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new qn(s.x,s.y,{format:zi,type:ci,minFilter:un,magFilter:un,generateMipmaps:!1}),X.map.texture.name=Z.name+".shadowMap",X.map.depthTexture=new Ss(s.x,s.y,Nn),X.map.depthTexture.name=Z.name+".shadowMapDepth",X.map.depthTexture.format=hi,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=rn,X.map.depthTexture.magFilter=rn}else Z.isPointLight?(X.map=new Kh(s.x),X.map.depthTexture=new xf(s.x,Zn)):(X.map=new qn(s.x,s.y),X.map.depthTexture=new Ss(s.x,s.y,Zn)),X.map.depthTexture.name=Z.name+".shadowMap",X.map.depthTexture.format=hi,this.type===$s?(X.map.depthTexture.compareFunction=de?xl:vl,X.map.depthTexture.minFilter=un,X.map.depthTexture.magFilter=un):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=rn,X.map.depthTexture.magFilter=rn);X.camera.updateProjectionMatrix()}const me=X.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<me;ge++){if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,ge),i.clear();else{ge===0&&(i.setRenderTarget(X.map),i.clear());const Se=X.getViewport(ge);a.set(r.x*Se.x,r.y*Se.y,r.x*Se.z,r.y*Se.w),B.viewport(a)}if(Z.isPointLight){const Se=X.camera,rt=X.matrix,Et=Z.distance||Se.far;Et!==Se.far&&(Se.far=Et,Se.updateProjectionMatrix()),Ws.setFromMatrixPosition(Z.matrixWorld),Se.position.copy(Ws),oo.copy(Se.position),oo.add(Zg[ge]),Se.up.copy(Kg[ge]),Se.lookAt(oo),Se.updateMatrixWorld(),rt.makeTranslation(-Ws.x,-Ws.y,-Ws.z),jc.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),X._frustum.setFromProjectionMatrix(jc,Se.coordinateSystem,Se.reversedDepth)}else X.updateMatrices(Z);n=X.getFrustum(),M(C,_,X.camera,Z,this.type)}X.isPointLightShadow!==!0&&this.type===qs&&y(X,_),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,P,N)};function y(E,C){const _=e.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new qn(s.x,s.y,{format:zi,type:ci})),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,_,f,v,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,_,d,v,null)}function S(E,C,_,w){let P=null;const N=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)P=N;else if(P=_.isPointLight===!0?o:c,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=P.uuid,Q=C.uuid;let j=l[B];j===void 0&&(j={},l[B]=j);let z=j[Q];z===void 0&&(z=P.clone(),j[Q]=z,C.addEventListener("dispose",T)),P=z}if(P.visible=C.visible,P.wireframe=C.wireframe,w===qs?P.side=C.shadowSide!==null?C.shadowSide:C.side:P.side=C.shadowSide!==null?C.shadowSide:u[C.side],P.alphaMap=C.alphaMap,P.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,P.map=C.map,P.clipShadows=C.clipShadows,P.clippingPlanes=C.clippingPlanes,P.clipIntersection=C.clipIntersection,P.displacementMap=C.displacementMap,P.displacementScale=C.displacementScale,P.displacementBias=C.displacementBias,P.wireframeLinewidth=C.wireframeLinewidth,P.linewidth=C.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const B=i.properties.get(P);B.light=_}return P}function M(E,C,_,w,P){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===qs)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);const Q=e.update(E),j=E.material;if(Array.isArray(j)){const z=Q.groups;for(let Z=0,X=z.length;Z<X;Z++){const re=z[Z],de=j[re.materialIndex];if(de&&de.visible){const me=S(E,de,w,P);E.onBeforeShadow(i,E,C,_,Q,me,re),i.renderBufferDirect(_,null,Q,me,E,re),E.onAfterShadow(i,E,C,_,Q,me,re)}}}else if(j.visible){const z=S(E,j,w,P);E.onBeforeShadow(i,E,C,_,Q,z,null),i.renderBufferDirect(_,null,Q,z,E,null),E.onAfterShadow(i,E,C,_,Q,z,null)}}const B=E.children;for(let Q=0,j=B.length;Q<j;Q++)M(B[Q],C,_,w,P)}function T(E){E.target.removeEventListener("dispose",T);for(const _ in l){const w=l[_],P=E.target.uuid;P in w&&(w[P].dispose(),delete w[P])}}}function $g(i,e){function t(){let O=!1;const ye=new Gt;let ie=null;const Ee=new Gt(0,0,0,0);return{setMask:function(Pe){ie!==Pe&&!O&&(i.colorMask(Pe,Pe,Pe,Pe),ie=Pe)},setLocked:function(Pe){O=Pe},setClear:function(Pe,le,ze,Ue,Dt){Dt===!0&&(Pe*=Ue,le*=Ue,ze*=Ue),ye.set(Pe,le,ze,Ue),Ee.equals(ye)===!1&&(i.clearColor(Pe,le,ze,Ue),Ee.copy(ye))},reset:function(){O=!1,ie=null,Ee.set(-1,0,0,0)}}}function n(){let O=!1,ye=!1,ie=null,Ee=null,Pe=null;return{setReversed:function(le){if(ye!==le){const ze=e.get("EXT_clip_control");le?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),ye=le;const Ue=Pe;Pe=null,this.setClear(Ue)}},getReversed:function(){return ye},setTest:function(le){le?he(i.DEPTH_TEST):Ne(i.DEPTH_TEST)},setMask:function(le){ie!==le&&!O&&(i.depthMask(le),ie=le)},setFunc:function(le){if(ye&&(le=Wu[le]),Ee!==le){switch(le){case go:i.depthFunc(i.NEVER);break;case _o:i.depthFunc(i.ALWAYS);break;case vo:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case xo:i.depthFunc(i.EQUAL);break;case Mo:i.depthFunc(i.GEQUAL);break;case yo:i.depthFunc(i.GREATER);break;case So:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=le}},setLocked:function(le){O=le},setClear:function(le){Pe!==le&&(Pe=le,ye&&(le=1-le),i.clearDepth(le))},reset:function(){O=!1,ie=null,Ee=null,Pe=null,ye=!1}}}function s(){let O=!1,ye=null,ie=null,Ee=null,Pe=null,le=null,ze=null,Ue=null,Dt=null;return{setTest:function(wt){O||(wt?he(i.STENCIL_TEST):Ne(i.STENCIL_TEST))},setMask:function(wt){ye!==wt&&!O&&(i.stencilMask(wt),ye=wt)},setFunc:function(wt,Sn,an){(ie!==wt||Ee!==Sn||Pe!==an)&&(i.stencilFunc(wt,Sn,an),ie=wt,Ee=Sn,Pe=an)},setOp:function(wt,Sn,an){(le!==wt||ze!==Sn||Ue!==an)&&(i.stencilOp(wt,Sn,an),le=wt,ze=Sn,Ue=an)},setLocked:function(wt){O=wt},setClear:function(wt){Dt!==wt&&(i.clearStencil(wt),Dt=wt)},reset:function(){O=!1,ye=null,ie=null,Ee=null,Pe=null,le=null,ze=null,Ue=null,Dt=null}}}const r=new t,a=new n,c=new s,o=new WeakMap,l=new WeakMap;let h={},u={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,y=null,S=null,M=null,T=null,E=null,C=null,_=new ht(0,0,0),w=0,P=!1,N=null,B=null,Q=null,j=null,z=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,re=0;const de=i.getParameter(i.VERSION);de.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(de)[1]),X=re>=1):de.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(de)[1]),X=re>=2);let me=null,ge={};const Se=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),Et=new Gt().fromArray(Se),st=new Gt().fromArray(rt);function ne(O,ye,ie,Ee){const Pe=new Uint8Array(4),le=i.createTexture();i.bindTexture(O,le),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<ie;ze++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ye,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(ye+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return le}const ve={};ve[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),ve[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ve[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),c.setClear(0),he(i.DEPTH_TEST),a.setFunc(Ms),Te(!1),Me(Vl),he(i.CULL_FACE),ue(si);function he(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function Ne(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function Je(O,ye){return f[O]!==ye?(i.bindFramebuffer(O,ye),f[O]=ye,O===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ye),O===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ye),!0):!1}function Ge(O,ye){let ie=g,Ee=!1;if(O){ie=d.get(ye),ie===void 0&&(ie=[],d.set(ye,ie));const Pe=O.textures;if(ie.length!==Pe.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let le=0,ze=Pe.length;le<ze;le++)ie[le]=i.COLOR_ATTACHMENT0+le;ie.length=Pe.length,Ee=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(ie)}function mt(O){return v!==O?(i.useProgram(O),v=O,!0):!1}const je={[Li]:i.FUNC_ADD,[du]:i.FUNC_SUBTRACT,[pu]:i.FUNC_REVERSE_SUBTRACT};je[mu]=i.MIN,je[gu]=i.MAX;const oe={[_u]:i.ZERO,[vu]:i.ONE,[xu]:i.SRC_COLOR,[po]:i.SRC_ALPHA,[wu]:i.SRC_ALPHA_SATURATE,[bu]:i.DST_COLOR,[yu]:i.DST_ALPHA,[Mu]:i.ONE_MINUS_SRC_COLOR,[mo]:i.ONE_MINUS_SRC_ALPHA,[Eu]:i.ONE_MINUS_DST_COLOR,[Su]:i.ONE_MINUS_DST_ALPHA,[Tu]:i.CONSTANT_COLOR,[Au]:i.ONE_MINUS_CONSTANT_COLOR,[Ru]:i.CONSTANT_ALPHA,[Cu]:i.ONE_MINUS_CONSTANT_ALPHA};function ue(O,ye,ie,Ee,Pe,le,ze,Ue,Dt,wt){if(O===si){m===!0&&(Ne(i.BLEND),m=!1);return}if(m===!1&&(he(i.BLEND),m=!0),O!==fu){if(O!==p||wt!==P){if((y!==Li||T!==Li)&&(i.blendEquation(i.FUNC_ADD),y=Li,T=Li),wt)switch(O){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gl:i.blendFunc(i.ONE,i.ONE);break;case Hl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:_t("WebGLState: Invalid blending: ",O);break}else switch(O){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hl:_t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wl:_t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:_t("WebGLState: Invalid blending: ",O);break}S=null,M=null,E=null,C=null,_.set(0,0,0),w=0,p=O,P=wt}return}Pe=Pe||ye,le=le||ie,ze=ze||Ee,(ye!==y||Pe!==T)&&(i.blendEquationSeparate(je[ye],je[Pe]),y=ye,T=Pe),(ie!==S||Ee!==M||le!==E||ze!==C)&&(i.blendFuncSeparate(oe[ie],oe[Ee],oe[le],oe[ze]),S=ie,M=Ee,E=le,C=ze),(Ue.equals(_)===!1||Dt!==w)&&(i.blendColor(Ue.r,Ue.g,Ue.b,Dt),_.copy(Ue),w=Dt),p=O,P=!1}function fe(O,ye){O.side===qt?Ne(i.CULL_FACE):he(i.CULL_FACE);let ie=O.side===mn;ye&&(ie=!ie),Te(ie),O.blending===gs&&O.transparent===!1?ue(si):ue(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const Ee=O.stencilWrite;c.setTest(Ee),Ee&&(c.setMask(O.stencilWriteMask),c.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),c.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Oe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):Ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function Te(O){N!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),N=O)}function Me(O){O!==cu?(he(i.CULL_FACE),O!==B&&(O===Vl?i.cullFace(i.BACK):O===hu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ne(i.CULL_FACE),B=O}function Ze(O){O!==Q&&(X&&i.lineWidth(O),Q=O)}function Oe(O,ye,ie){O?(he(i.POLYGON_OFFSET_FILL),(j!==ye||z!==ie)&&(j=ye,z=ie,a.getReversed()&&(ye=-ye),i.polygonOffset(ye,ie))):Ne(i.POLYGON_OFFSET_FILL)}function et(O){O?he(i.SCISSOR_TEST):Ne(i.SCISSOR_TEST)}function it(O){O===void 0&&(O=i.TEXTURE0+Z-1),me!==O&&(i.activeTexture(O),me=O)}function F(O,ye,ie){ie===void 0&&(me===null?ie=i.TEXTURE0+Z-1:ie=me);let Ee=ge[ie];Ee===void 0&&(Ee={type:void 0,texture:void 0},ge[ie]=Ee),(Ee.type!==O||Ee.texture!==ye)&&(me!==ie&&(i.activeTexture(ie),me=ie),i.bindTexture(O,ye||ve[O]),Ee.type=O,Ee.texture=ye)}function yt(){const O=ge[me];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function dt(){try{i.compressedTexImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function x(){try{i.texSubImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function V(){try{i.texSubImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function te(){try{i.compressedTexSubImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function ae(){try{i.texStorage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function xe(){try{i.texStorage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function $(){try{i.texImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function se(){try{i.texImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function we(O){return u[O]!==void 0?u[O]:i.getParameter(O)}function He(O,ye){u[O]!==ye&&(i.pixelStorei(O,ye),u[O]=ye)}function Ae(O){Et.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Et.copy(O))}function be(O){st.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),st.copy(O))}function Be(O,ye){let ie=l.get(ye);ie===void 0&&(ie=new WeakMap,l.set(ye,ie));let Ee=ie.get(O);Ee===void 0&&(Ee=i.getUniformBlockIndex(ye,O.name),ie.set(O,Ee))}function $e(O,ye){const Ee=l.get(ye).get(O);o.get(ye)!==Ee&&(i.uniformBlockBinding(ye,Ee,O.__bindingPointIndex),o.set(ye,Ee))}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},me=null,ge={},f={},d=new WeakMap,g=[],v=null,m=!1,p=null,y=null,S=null,M=null,T=null,E=null,C=null,_=new ht(0,0,0),w=0,P=!1,N=null,B=null,Q=null,j=null,z=null,Et.set(0,0,i.canvas.width,i.canvas.height),st.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),c.reset()}return{buffers:{color:r,depth:a,stencil:c},enable:he,disable:Ne,bindFramebuffer:Je,drawBuffers:Ge,useProgram:mt,setBlending:ue,setMaterial:fe,setFlipSided:Te,setCullFace:Me,setLineWidth:Ze,setPolygonOffset:Oe,setScissorTest:et,activeTexture:it,bindTexture:F,unbindTexture:yt,compressedTexImage2D:dt,compressedTexImage3D:A,texImage2D:$,texImage3D:se,pixelStorei:He,getParameter:we,updateUBOMapping:Be,uniformBlockBinding:$e,texStorage2D:ae,texStorage3D:xe,texSubImage2D:x,texSubImage3D:V,compressedTexSubImage2D:Y,compressedTexSubImage3D:te,scissor:Ae,viewport:be,reset:lt}}function Qg(i,e,t,n,s,r,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new J,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,x){return g?new OffscreenCanvas(A,x):ra("canvas")}function m(A,x,V){let Y=1;const te=dt(A);if((te.width>V||te.height>V)&&(Y=V/Math.max(te.width,te.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ae=Math.floor(Y*te.width),xe=Math.floor(Y*te.height);f===void 0&&(f=v(ae,xe));const $=x?v(ae,xe):f;return $.width=ae,$.height=xe,$.getContext("2d").drawImage(A,0,0,ae,xe),tt("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ae+"x"+xe+")."),$}else return"data"in A&&tt("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function p(A){return A.generateMipmaps}function y(A){i.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,x,V,Y,te,ae=!1){if(A!==null){if(i[A]!==void 0)return i[A];tt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let xe;Y&&(xe=e.get("EXT_texture_norm16"),xe||tt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=x;if(x===i.RED&&(V===i.FLOAT&&($=i.R32F),V===i.HALF_FLOAT&&($=i.R16F),V===i.UNSIGNED_BYTE&&($=i.R8),V===i.UNSIGNED_SHORT&&xe&&($=xe.R16_EXT),V===i.SHORT&&xe&&($=xe.R16_SNORM_EXT)),x===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&($=i.R8UI),V===i.UNSIGNED_SHORT&&($=i.R16UI),V===i.UNSIGNED_INT&&($=i.R32UI),V===i.BYTE&&($=i.R8I),V===i.SHORT&&($=i.R16I),V===i.INT&&($=i.R32I)),x===i.RG&&(V===i.FLOAT&&($=i.RG32F),V===i.HALF_FLOAT&&($=i.RG16F),V===i.UNSIGNED_BYTE&&($=i.RG8),V===i.UNSIGNED_SHORT&&xe&&($=xe.RG16_EXT),V===i.SHORT&&xe&&($=xe.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&($=i.RG8UI),V===i.UNSIGNED_SHORT&&($=i.RG16UI),V===i.UNSIGNED_INT&&($=i.RG32UI),V===i.BYTE&&($=i.RG8I),V===i.SHORT&&($=i.RG16I),V===i.INT&&($=i.RG32I)),x===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&($=i.RGB8UI),V===i.UNSIGNED_SHORT&&($=i.RGB16UI),V===i.UNSIGNED_INT&&($=i.RGB32UI),V===i.BYTE&&($=i.RGB8I),V===i.SHORT&&($=i.RGB16I),V===i.INT&&($=i.RGB32I)),x===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&($=i.RGBA8UI),V===i.UNSIGNED_SHORT&&($=i.RGBA16UI),V===i.UNSIGNED_INT&&($=i.RGBA32UI),V===i.BYTE&&($=i.RGBA8I),V===i.SHORT&&($=i.RGBA16I),V===i.INT&&($=i.RGBA32I)),x===i.RGB&&(V===i.UNSIGNED_SHORT&&xe&&($=xe.RGB16_EXT),V===i.SHORT&&xe&&($=xe.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),x===i.RGBA){const se=ae?sa:Mt.getTransfer(te);V===i.FLOAT&&($=i.RGBA32F),V===i.HALF_FLOAT&&($=i.RGBA16F),V===i.UNSIGNED_BYTE&&($=se===Ct?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&xe&&($=xe.RGBA16_EXT),V===i.SHORT&&xe&&($=xe.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function T(A,x){let V;return A?x===null||x===Zn||x===tr?V=i.DEPTH24_STENCIL8:x===Nn?V=i.DEPTH32F_STENCIL8:x===er&&(V=i.DEPTH24_STENCIL8,tt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Zn||x===tr?V=i.DEPTH_COMPONENT24:x===Nn?V=i.DEPTH_COMPONENT32F:x===er&&(V=i.DEPTH_COMPONENT16),V}function E(A,x){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==rn&&A.minFilter!==un?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function C(A){const x=A.target;x.removeEventListener("dispose",C),w(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function _(A){const x=A.target;x.removeEventListener("dispose",_),N(x)}function w(A){const x=n.get(A);if(x.__webglInit===void 0)return;const V=A.source,Y=d.get(V);if(Y){const te=Y[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&P(A),Object.keys(Y).length===0&&d.delete(V)}n.remove(A)}function P(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const V=A.source,Y=d.get(V);delete Y[x.__cacheKey],a.memory.textures--}function N(A){const x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let te=0;te<x.__webglFramebuffer[Y].length;te++)i.deleteFramebuffer(x.__webglFramebuffer[Y][te]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const V=A.textures;for(let Y=0,te=V.length;Y<te;Y++){const ae=n.get(V[Y]);ae.__webglTexture&&(i.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(V[Y])}n.remove(A)}let B=0;function Q(){B=0}function j(){return B}function z(A){B=A}function Z(){const A=B;return A>=s.maxTextures&&tt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),B+=1,A}function X(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function re(A,x){const V=n.get(A);if(A.isVideoTexture&&F(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&V.__version!==A.version){const Y=A.image;if(Y===null)tt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)tt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(V,A,x);return}}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+x)}function de(A,x){const V=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){Ne(V,A,x);return}else A.isExternalTexture&&(V.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+x)}function me(A,x){const V=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){Ne(V,A,x);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+x)}function ge(A,x){const V=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&V.__version!==A.version){Je(V,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+x)}const Se={[ri]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[bo]:i.MIRRORED_REPEAT},rt={[rn]:i.NEAREST,[Lu]:i.NEAREST_MIPMAP_NEAREST,[pr]:i.NEAREST_MIPMAP_LINEAR,[un]:i.LINEAR,[Ta]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},Et={[Uu]:i.NEVER,[ku]:i.ALWAYS,[Fu]:i.LESS,[vl]:i.LEQUAL,[Ou]:i.EQUAL,[xl]:i.GEQUAL,[Bu]:i.GREATER,[zu]:i.NOTEQUAL};function st(A,x){if(x.type===Nn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===un||x.magFilter===Ta||x.magFilter===pr||x.magFilter===Ui||x.minFilter===un||x.minFilter===Ta||x.minFilter===pr||x.minFilter===Ui)&&tt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Se[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Se[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Se[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,rt[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,rt[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Et[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===rn||x.minFilter!==pr&&x.minFilter!==Ui||x.type===Nn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ne(A,x){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",C));const Y=x.source;let te=d.get(Y);te===void 0&&(te={},d.set(Y,te));const ae=X(x);if(ae!==A.__cacheKey){te[ae]===void 0&&(te[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),te[ae].usedTimes++;const xe=te[A.__cacheKey];xe!==void 0&&(te[A.__cacheKey].usedTimes--,xe.usedTimes===0&&P(x)),A.__cacheKey=ae,A.__webglTexture=te[ae].texture}return V}function ve(A,x,V){return Math.floor(Math.floor(A/V)/x)}function he(A,x,V,Y){const ae=A.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,V,Y,x.data);else{ae.sort((He,Ae)=>He.start-Ae.start);let xe=0;for(let He=1;He<ae.length;He++){const Ae=ae[xe],be=ae[He],Be=Ae.start+Ae.count,$e=ve(be.start,x.width,4),lt=ve(Ae.start,x.width,4);be.start<=Be+1&&$e===lt&&ve(be.start+be.count-1,x.width,4)===$e?Ae.count=Math.max(Ae.count,be.start+be.count-Ae.start):(++xe,ae[xe]=be)}ae.length=xe+1;const $=t.getParameter(i.UNPACK_ROW_LENGTH),se=t.getParameter(i.UNPACK_SKIP_PIXELS),we=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let He=0,Ae=ae.length;He<Ae;He++){const be=ae[He],Be=Math.floor(be.start/4),$e=Math.ceil(be.count/4),lt=Be%x.width,O=Math.floor(Be/x.width),ye=$e,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,lt),t.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,lt,O,ye,ie,V,Y,x.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,$),t.pixelStorei(i.UNPACK_SKIP_PIXELS,se),t.pixelStorei(i.UNPACK_SKIP_ROWS,we)}}function Ne(A,x,V){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);const te=ne(A,x),ae=x.source;t.bindTexture(Y,A.__webglTexture,i.TEXTURE0+V);const xe=n.get(ae);if(ae.version!==xe.__version||te===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ie=Mt.getPrimaries(Mt.workingColorSpace),Ee=x.colorSpace===yi?null:Mt.getPrimaries(x.colorSpace),Pe=x.colorSpace===yi||ie===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let se=m(x.image,!1,s.maxTextureSize);se=yt(x,se);const we=r.convert(x.format,x.colorSpace),He=r.convert(x.type);let Ae=M(x.internalFormat,we,He,x.normalized,x.colorSpace,x.isVideoTexture);st(Y,x);let be;const Be=x.mipmaps,$e=x.isVideoTexture!==!0,lt=xe.__version===void 0||te===!0,O=ae.dataReady,ye=E(x,se);if(x.isDepthTexture)Ae=T(x.format===Fi,x.type),lt&&($e?t.texStorage2D(i.TEXTURE_2D,1,Ae,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Ae,se.width,se.height,0,we,He,null));else if(x.isDataTexture)if(Be.length>0){$e&&lt&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,Be[0].width,Be[0].height);for(let ie=0,Ee=Be.length;ie<Ee;ie++)be=Be[ie],$e?O&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,be.width,be.height,we,He,be.data):t.texImage2D(i.TEXTURE_2D,ie,Ae,be.width,be.height,0,we,He,be.data);x.generateMipmaps=!1}else $e?(lt&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,se.width,se.height),O&&he(x,se,we,He)):t.texImage2D(i.TEXTURE_2D,0,Ae,se.width,se.height,0,we,He,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){$e&&lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ae,Be[0].width,Be[0].height,se.depth);for(let ie=0,Ee=Be.length;ie<Ee;ie++)if(be=Be[ie],x.format!==Un)if(we!==null)if($e){if(O)if(x.layerUpdates.size>0){const Pe=Dc(be.width,be.height,x.format,x.type);for(const le of x.layerUpdates){const ze=be.data.subarray(le*Pe/be.data.BYTES_PER_ELEMENT,(le+1)*Pe/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,le,be.width,be.height,1,we,ze)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,be.width,be.height,se.depth,we,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Ae,be.width,be.height,se.depth,0,be.data,0,0);else tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?O&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,be.width,be.height,se.depth,we,He,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Ae,be.width,be.height,se.depth,0,we,He,be.data)}else{$e&&lt&&t.texStorage2D(i.TEXTURE_2D,ye,Ae,Be[0].width,Be[0].height);for(let ie=0,Ee=Be.length;ie<Ee;ie++)be=Be[ie],x.format!==Un?we!==null?$e?O&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,be.width,be.height,we,be.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Ae,be.width,be.height,0,be.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?O&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,be.width,be.height,we,He,be.data):t.texImage2D(i.TEXTURE_2D,ie,Ae,be.width,be.height,0,we,He,be.data)}else if(x.isDataArrayTexture)if($e){if(lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Ae,se.width,se.height,se.depth),O)if(x.layerUpdates.size>0){const ie=Dc(se.width,se.height,x.format,x.type);for(const Ee of x.layerUpdates){const Pe=se.data.subarray(Ee*ie/se.data.BYTES_PER_ELEMENT,(Ee+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ee,se.width,se.height,1,we,He,Pe)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,we,He,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,se.width,se.height,se.depth,0,we,He,se.data);else if(x.isData3DTexture)$e?(lt&&t.texStorage3D(i.TEXTURE_3D,ye,Ae,se.width,se.height,se.depth),O&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,we,He,se.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,se.width,se.height,se.depth,0,we,He,se.data);else if(x.isFramebufferTexture){if(lt)if($e)t.texStorage2D(i.TEXTURE_2D,ye,Ae,se.width,se.height);else{let ie=se.width,Ee=se.height;for(let Pe=0;Pe<ye;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,Ae,ie,Ee,0,we,He,null),ie>>=1,Ee>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),se.parentNode!==ie){ie.appendChild(se),u.add(x),ie.onpaint=Ee=>{const Pe=Ee.changedElements;for(const le of u)Pe.includes(le.image)&&(le.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,se);else{const Pe=i.RGBA,le=i.RGBA,ze=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Pe,le,ze,se)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Be.length>0){if($e&&lt){const ie=dt(Be[0]);t.texStorage2D(i.TEXTURE_2D,ye,Ae,ie.width,ie.height)}for(let ie=0,Ee=Be.length;ie<Ee;ie++)be=Be[ie],$e?O&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,we,He,be):t.texImage2D(i.TEXTURE_2D,ie,Ae,we,He,be);x.generateMipmaps=!1}else if($e){if(lt){const ie=dt(se);t.texStorage2D(i.TEXTURE_2D,ye,Ae,ie.width,ie.height)}O&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,He,se)}else t.texImage2D(i.TEXTURE_2D,0,Ae,we,He,se);p(x)&&y(Y),xe.__version=ae.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Je(A,x,V){if(x.image.length!==6)return;const Y=ne(A,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+V);const ae=n.get(te);if(te.version!==ae.__version||Y===!0){t.activeTexture(i.TEXTURE0+V);const xe=Mt.getPrimaries(Mt.workingColorSpace),$=x.colorSpace===yi?null:Mt.getPrimaries(x.colorSpace),se=x.colorSpace===yi||xe===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);const we=x.isCompressedTexture||x.image[0].isCompressedTexture,He=x.image[0]&&x.image[0].isDataTexture,Ae=[];for(let le=0;le<6;le++)!we&&!He?Ae[le]=m(x.image[le],!0,s.maxCubemapSize):Ae[le]=He?x.image[le].image:x.image[le],Ae[le]=yt(x,Ae[le]);const be=Ae[0],Be=r.convert(x.format,x.colorSpace),$e=r.convert(x.type),lt=M(x.internalFormat,Be,$e,x.normalized,x.colorSpace),O=x.isVideoTexture!==!0,ye=ae.__version===void 0||Y===!0,ie=te.dataReady;let Ee=E(x,be);st(i.TEXTURE_CUBE_MAP,x);let Pe;if(we){O&&ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,lt,be.width,be.height);for(let le=0;le<6;le++){Pe=Ae[le].mipmaps;for(let ze=0;ze<Pe.length;ze++){const Ue=Pe[ze];x.format!==Un?Be!==null?O?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze,0,0,Ue.width,Ue.height,Be,Ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze,lt,Ue.width,Ue.height,0,Ue.data):tt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze,0,0,Ue.width,Ue.height,Be,$e,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze,lt,Ue.width,Ue.height,0,Be,$e,Ue.data)}}}else{if(Pe=x.mipmaps,O&&ye){Pe.length>0&&Ee++;const le=dt(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,lt,le.width,le.height)}for(let le=0;le<6;le++)if(He){O?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Ae[le].width,Ae[le].height,Be,$e,Ae[le].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,lt,Ae[le].width,Ae[le].height,0,Be,$e,Ae[le].data);for(let ze=0;ze<Pe.length;ze++){const Dt=Pe[ze].image[le].image;O?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze+1,0,0,Dt.width,Dt.height,Be,$e,Dt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze+1,lt,Dt.width,Dt.height,0,Be,$e,Dt.data)}}else{O?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Be,$e,Ae[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,lt,Be,$e,Ae[le]);for(let ze=0;ze<Pe.length;ze++){const Ue=Pe[ze];O?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze+1,0,0,Be,$e,Ue.image[le]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+le,ze+1,lt,Be,$e,Ue.image[le])}}}p(x)&&y(i.TEXTURE_CUBE_MAP),ae.__version=te.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Ge(A,x,V,Y,te,ae){const xe=r.convert(V.format,V.colorSpace),$=r.convert(V.type),se=M(V.internalFormat,xe,$,V.normalized,V.colorSpace),we=n.get(x),He=n.get(V);if(He.__renderTarget=x,!we.__hasExternalTextures){const Ae=Math.max(1,x.width>>ae),be=Math.max(1,x.height>>ae);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,ae,se,Ae,be,x.depth,0,xe,$,null):t.texImage2D(te,ae,se,Ae,be,0,xe,$,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),it(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,te,He.__webglTexture,0,et(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,te,He.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(A,x,V){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const Y=x.depthTexture,te=Y&&Y.isDepthTexture?Y.type:null,ae=T(x.stencilBuffer,te),xe=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;it(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(x),ae,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(x),ae,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ae,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xe,i.RENDERBUFFER,A)}else{const Y=x.textures;for(let te=0;te<Y.length;te++){const ae=Y[te],xe=r.convert(ae.format,ae.colorSpace),$=r.convert(ae.type),se=M(ae.internalFormat,xe,$,ae.normalized,ae.colorSpace);it(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(x),se,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(x),se,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,se,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function je(A,x,V){const Y=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=n.get(x.depthTexture);if(te.__renderTarget=x,(!te.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(te.__webglInit===void 0&&(te.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),st(i.TEXTURE_CUBE_MAP,x.depthTexture);const we=r.convert(x.depthTexture.format),He=r.convert(x.depthTexture.type);let Ae;x.depthTexture.format===hi?Ae=i.DEPTH_COMPONENT24:x.depthTexture.format===Fi&&(Ae=i.DEPTH24_STENCIL8);for(let be=0;be<6;be++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Ae,x.width,x.height,0,we,He,null)}}else re(x.depthTexture,0);const ae=te.__webglTexture,xe=et(x),$=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,se=x.depthTexture.format===Fi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===hi)it(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,$,ae,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,se,$,ae,0);else if(x.depthTexture.format===Fi)it(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,$,ae,0,xe):i.framebufferTexture2D(i.FRAMEBUFFER,se,$,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function oe(A){const x=n.get(A),V=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const Y=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",te)};Y.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=Y}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let Y=0;Y<6;Y++)je(x.__webglFramebuffer[Y],A,Y);else{const Y=A.texture.mipmaps;Y&&Y.length>0?je(x.__webglFramebuffer[0],A,0):je(x.__webglFramebuffer,A,0)}else if(V){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),mt(x.__webglDepthbuffer[Y],A,!1);else{const te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ae)}}else{const Y=A.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),mt(x.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ae)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(A,x,V){const Y=n.get(A);x!==void 0&&Ge(Y.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&oe(A)}function fe(A){const x=A.texture,V=n.get(A),Y=n.get(x);A.addEventListener("dispose",_);const te=A.textures,ae=A.isWebGLCubeRenderTarget===!0,xe=te.length>1;if(xe||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,a.memory.textures++),ae){V.__webglFramebuffer=[];for(let $=0;$<6;$++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[$]=[];for(let se=0;se<x.mipmaps.length;se++)V.__webglFramebuffer[$][se]=i.createFramebuffer()}else V.__webglFramebuffer[$]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let $=0;$<x.mipmaps.length;$++)V.__webglFramebuffer[$]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(xe)for(let $=0,se=te.length;$<se;$++){const we=n.get(te[$]);we.__webglTexture===void 0&&(we.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&it(A)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let $=0;$<te.length;$++){const se=te[$];V.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[$]);const we=r.convert(se.format,se.colorSpace),He=r.convert(se.type),Ae=M(se.internalFormat,we,He,se.normalized,se.colorSpace,A.isXRRenderTarget===!0),be=et(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,be,Ae,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,V.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),mt(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),st(i.TEXTURE_CUBE_MAP,x);for(let $=0;$<6;$++)if(x.mipmaps&&x.mipmaps.length>0)for(let se=0;se<x.mipmaps.length;se++)Ge(V.__webglFramebuffer[$][se],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,se);else Ge(V.__webglFramebuffer[$],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);p(x)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let $=0,se=te.length;$<se;$++){const we=te[$],He=n.get(we);let Ae=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ae=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ae,He.__webglTexture),st(Ae,we),Ge(V.__webglFramebuffer,A,we,i.COLOR_ATTACHMENT0+$,Ae,0),p(we)&&y(Ae)}t.unbindTexture()}else{let $=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,Y.__webglTexture),st($,x),x.mipmaps&&x.mipmaps.length>0)for(let se=0;se<x.mipmaps.length;se++)Ge(V.__webglFramebuffer[se],A,x,i.COLOR_ATTACHMENT0,$,se);else Ge(V.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,$,0);p(x)&&y($),t.unbindTexture()}A.depthBuffer&&oe(A)}function Te(A){const x=A.textures;for(let V=0,Y=x.length;V<Y;V++){const te=x[V];if(p(te)){const ae=S(A),xe=n.get(te).__webglTexture;t.bindTexture(ae,xe),y(ae),t.unbindTexture()}}}const Me=[],Ze=[];function Oe(A){if(A.samples>0){if(it(A)===!1){const x=A.textures,V=A.width,Y=A.height;let te=i.COLOR_BUFFER_BIT;const ae=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xe=n.get(A),$=x.length>1;if($)for(let we=0;we<x.length;we++)t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const se=A.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let we=0;we<x.length;we++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xe.__webglColorRenderbuffer[we]);const He=n.get(x[we]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,He,0)}i.blitFramebuffer(0,0,V,Y,0,0,V,Y,te,i.NEAREST),o===!0&&(Me.length=0,Ze.length=0,Me.push(i.COLOR_ATTACHMENT0+we),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Me.push(ae),Ze.push(ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ze)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let we=0;we<x.length;we++){t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.RENDERBUFFER,xe.__webglColorRenderbuffer[we]);const He=n.get(x[we]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,xe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+we,i.TEXTURE_2D,He,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&o){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function et(A){return Math.min(s.maxSamples,A.samples)}function it(A){const x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function F(A){const x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function yt(A,x){const V=A.colorSpace,Y=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||V!==ia&&V!==yi&&(Mt.getTransfer(V)===Ct?(Y!==Un||te!==yn)&&tt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):_t("WebGLTextures: Unsupported texture color space:",V)),x}function dt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=Q,this.getTextureUnits=j,this.setTextureUnits=z,this.setTexture2D=re,this.setTexture2DArray=de,this.setTexture3D=me,this.setTextureCube=ge,this.rebindTextures=ue,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=it,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function jg(i,e){function t(n,s=yi){let r;const a=Mt.getTransfer(s);if(n===yn)return i.UNSIGNED_BYTE;if(n===fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===dl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===vh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===xh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===gh)return i.BYTE;if(n===_h)return i.SHORT;if(n===er)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===Zn)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===ci)return i.HALF_FLOAT;if(n===Mh)return i.ALPHA;if(n===yh)return i.RGB;if(n===Un)return i.RGBA;if(n===hi)return i.DEPTH_COMPONENT;if(n===Fi)return i.DEPTH_STENCIL;if(n===pl)return i.RED;if(n===ml)return i.RED_INTEGER;if(n===zi)return i.RG;if(n===gl)return i.RG_INTEGER;if(n===_l)return i.RGBA_INTEGER;if(n===Zr||n===Kr||n===Jr||n===$r)if(a===Ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Eo||n===wo||n===To||n===Ao)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Eo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===To)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ro||n===Co||n===Po||n===Do||n===Lo||n===ea||n===Io)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ro||n===Co)return a===Ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Po)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Do)return r.COMPRESSED_R11_EAC;if(n===Lo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ea)return r.COMPRESSED_RG11_EAC;if(n===Io)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===No||n===Uo||n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Vo||n===Go||n===Ho||n===Wo||n===Xo||n===Yo||n===qo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===No)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Uo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Bo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ko)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Go)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ho)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qo)return a===Ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zo||n===Ko||n===Jo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Zo)return a===Ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Jo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$o||n===Qo||n===ta||n===jo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===$o)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Qo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const e_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t_=`
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

}`;class n_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Lh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Jn({vertexShader:e_,fragmentShader:t_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qe(new li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class i_ extends Ei{constructor(e,t){super();const n=this;let s=null,r=1,a=null,c="local-floor",o=1,l=null,h=null,u=null,f=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new n_,p={},y=t.getContextAttributes();let S=null,M=null;const T=[],E=[],C=new J;let _=null;const w=new Mn;w.viewport=new Gt;const P=new Mn;P.viewport=new Gt;const N=[w,P],B=new cd;let Q=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ve=T[ne];return ve===void 0&&(ve=new Ia,T[ne]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(ne){let ve=T[ne];return ve===void 0&&(ve=new Ia,T[ne]=ve),ve.getGripSpace()},this.getHand=function(ne){let ve=T[ne];return ve===void 0&&(ve=new Ia,T[ne]=ve),ve.getHandSpace()};function z(ne){const ve=E.indexOf(ne.inputSource);if(ve===-1)return;const he=T[ve];he!==void 0&&(he.update(ne.inputSource,ne.frame,l||a),he.dispatchEvent({type:ne.type,data:ne.inputSource}))}function Z(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",X);for(let ne=0;ne<T.length;ne++){const ve=E[ne];ve!==null&&(E[ne]=null,T[ne].disconnect(ve))}Q=null,j=null,m.reset();for(const ne in p)delete p[ne];e.setRenderTarget(S),d=null,f=null,u=null,s=null,M=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&tt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){c=ne,n.isPresenting===!0&&tt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ne){l=ne},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ne){if(s=ne,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",X),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,Ne=null,Je=null;y.depth&&(Je=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=y.stencil?Fi:hi,Ne=y.stencil?tr:Zn);const Ge={colorFormat:t.RGBA8,depthFormat:Je,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new qn(f.textureWidth,f.textureHeight,{format:Un,type:yn,depthTexture:new Ss(f.textureWidth,f.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const he={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,he),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new qn(d.framebufferWidth,d.framebufferHeight,{format:Un,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(o),l=null,a=await s.requestReferenceSpace(c),st.setContext(s),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(ne){for(let ve=0;ve<ne.removed.length;ve++){const he=ne.removed[ve],Ne=E.indexOf(he);Ne>=0&&(E[Ne]=null,T[Ne].disconnect(he))}for(let ve=0;ve<ne.added.length;ve++){const he=ne.added[ve];let Ne=E.indexOf(he);if(Ne===-1){for(let Ge=0;Ge<T.length;Ge++)if(Ge>=E.length){E.push(he),Ne=Ge;break}else if(E[Ge]===null){E[Ge]=he,Ne=Ge;break}if(Ne===-1)break}const Je=T[Ne];Je&&Je.connect(he)}}const re=new L,de=new L;function me(ne,ve,he){re.setFromMatrixPosition(ve.matrixWorld),de.setFromMatrixPosition(he.matrixWorld);const Ne=re.distanceTo(de),Je=ve.projectionMatrix.elements,Ge=he.projectionMatrix.elements,mt=Je[14]/(Je[10]-1),je=Je[14]/(Je[10]+1),oe=(Je[9]+1)/Je[5],ue=(Je[9]-1)/Je[5],fe=(Je[8]-1)/Je[0],Te=(Ge[8]+1)/Ge[0],Me=mt*fe,Ze=mt*Te,Oe=Ne/(-fe+Te),et=Oe*-fe;if(ve.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(et),ne.translateZ(Oe),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),Je[10]===-1)ne.projectionMatrix.copy(ve.projectionMatrix),ne.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const it=mt+Oe,F=je+Oe,yt=Me-et,dt=Ze+(Ne-et),A=oe*je/F*it,x=ue*je/F*it;ne.projectionMatrix.makePerspective(yt,dt,A,x,it,F),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function ge(ne,ve){ve===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ve.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(s===null)return;let ve=ne.near,he=ne.far;m.texture!==null&&(m.depthNear>0&&(ve=m.depthNear),m.depthFar>0&&(he=m.depthFar)),B.near=P.near=w.near=ve,B.far=P.far=w.far=he,(Q!==B.near||j!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),Q=B.near,j=B.far),B.layers.mask=ne.layers.mask|6,w.layers.mask=B.layers.mask&-5,P.layers.mask=B.layers.mask&-3;const Ne=ne.parent,Je=B.cameras;ge(B,Ne);for(let Ge=0;Ge<Je.length;Ge++)ge(Je[Ge],Ne);Je.length===2?me(B,w,P):B.projectionMatrix.copy(w.projectionMatrix),Se(ne,B,Ne)};function Se(ne,ve,he){he===null?ne.matrix.copy(ve.matrixWorld):(ne.matrix.copy(he.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ve.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ve.projectionMatrix),ne.projectionMatrixInverse.copy(ve.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=tl*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&d===null))return o},this.setFoveation=function(ne){o=ne,f!==null&&(f.fixedFoveation=ne),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(ne){return p[ne]};let rt=null;function Et(ne,ve){if(h=ve.getViewerPose(l||a),g=ve,h!==null){const he=h.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let Ne=!1;he.length!==B.cameras.length&&(B.cameras.length=0,Ne=!0);for(let je=0;je<he.length;je++){const oe=he[je];let ue=null;if(d!==null)ue=d.getViewport(oe);else{const Te=u.getViewSubImage(f,oe);ue=Te.viewport,je===0&&(e.setRenderTargetTextures(M,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(M))}let fe=N[je];fe===void 0&&(fe=new Mn,fe.layers.enable(je),fe.viewport=new Gt,N[je]=fe),fe.matrix.fromArray(oe.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(oe.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(ue.x,ue.y,ue.width,ue.height),je===0&&(B.matrix.copy(fe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ne===!0&&B.cameras.push(fe)}const Je=s.enabledFeatures;if(Je&&Je.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const je=u.getDepthInformation(he[0]);je&&je.isValid&&je.texture&&m.init(je,s.renderState)}if(Je&&Je.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let je=0;je<he.length;je++){const oe=he[je].camera;if(oe){let ue=p[oe];ue||(ue=new Lh,p[oe]=ue);const fe=u.getCameraImage(oe);ue.sourceTexture=fe}}}}for(let he=0;he<T.length;he++){const Ne=E[he],Je=T[he];Ne!==null&&Je!==void 0&&Je.update(Ne,ve,l||a)}rt&&rt(ne,ve),ve.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ve}),g=null}const st=new qh;st.setAnimationLoop(Et),this.setAnimationLoop=function(ne){rt=ne},this.dispose=function(){}}}const s_=new Pt,eu=new ct;eu.set(-1,0,0,0,1,0,0,0,1);function r_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Hh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,S,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&c(m,p)):p.isPointsMaterial?o(m,p,y,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===mn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===mn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),S=y.envMap,M=y.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(s_.makeRotationFromEuler(M)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(eu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function c(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,y,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===mn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function a_(i,e,t,n){let s={},r={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function o(M,T){const E=T.program;n.uniformBlockBinding(M,E)}function l(M,T){let E=s[M.id];E===void 0&&(m(M),E=h(M),s[M.id]=E,M.addEventListener("dispose",y));const C=T.program;n.updateUBOMapping(M,C);const _=e.render.frame;r[M.id]!==_&&(f(M),r[M.id]=_)}function h(M){const T=u();M.__bindingPointIndex=T;const E=i.createBuffer(),C=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,C,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,E),E}function u(){for(let M=0;M<c;M++)if(a.indexOf(M)===-1)return a.push(M),M;return _t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const T=s[M.id],E=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,w=E.length;_<w;_++){const P=E[_];if(Array.isArray(P))for(let N=0,B=P.length;N<B;N++)d(P[N],_,N,C);else d(P,_,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,T,E,C){if(v(M,T,E,C)===!0){const _=M.__offset,w=M.value;if(Array.isArray(w)){let P=0;for(let N=0;N<w.length;N++){const B=w[N],Q=p(B);g(B,M.__data,P),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(P+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,T,E){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,E)}function v(M,T,E,C){const _=M.value,w=T+"_"+E;if(C[w]===void 0)return typeof _=="number"||typeof _=="boolean"?C[w]=_:ArrayBuffer.isView(_)?C[w]=_.slice():C[w]=_.clone(),!0;{const P=C[w];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return C[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function m(M){const T=M.uniforms;let E=0;const C=16;for(let w=0,P=T.length;w<P;w++){const N=Array.isArray(T[w])?T[w]:[T[w]];for(let B=0,Q=N.length;B<Q;B++){const j=N[B],z=Array.isArray(j.value)?j.value:[j.value];for(let Z=0,X=z.length;Z<X;Z++){const re=z[Z],de=p(re),me=E%C,ge=me%de.boundary,Se=me+ge;E+=ge,Se!==0&&C-Se<de.storage&&(E+=C-Se),j.__data=new Float32Array(de.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=E,E+=de.storage}}}const _=E%C;return _>0&&(E+=C-_),M.__size=E,M.__cache={},this}function p(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?tt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):tt("WebGLRenderer: Unsupported uniform value type.",M),T}function y(M){const T=M.target;T.removeEventListener("dispose",y);const E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function S(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:o,update:l,dispose:S}}const o_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let kn=null;function l_(){return kn===null&&(kn=new Ch(o_,16,16,zi,ci),kn.name="DFG_LUT",kn.minFilter=un,kn.magFilter=un,kn.wrapS=ii,kn.wrapT=ii,kn.generateMipmaps=!1,kn.needsUpdate=!0),kn}class c_{constructor(e={}){const{canvas:t=Gu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=yn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=d,m=new Set([_l,gl,ml]),p=new Set([yn,Zn,er,tr,fl,dl]),y=new Uint32Array(4),S=new Int32Array(4),M=new L;let T=null,E=null;const C=[],_=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,B=null,Q=null,j=null,z=null;this._outputColorSpace=hn;let Z=0,X=0,re=null,de=-1,me=null;const ge=new Gt,Se=new Gt;let rt=null;const Et=new ht(0);let st=0,ne=t.width,ve=t.height,he=1,Ne=null,Je=null;const Ge=new Gt(0,0,ne,ve),mt=new Gt(0,0,ne,ve);let je=!1;const oe=new Sl;let ue=!1,fe=!1;const Te=new Pt,Me=new L,Ze=new Gt,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function it(){return re===null?he:1}let F=n;function yt(b,k){return t.getContext(b,k)}try{const b={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ll}`),t.addEventListener("webglcontextlost",Dt,!1),t.addEventListener("webglcontextrestored",wt,!1),t.addEventListener("webglcontextcreationerror",Sn,!1),F===null){const k="webgl2";if(F=yt(k,b),F===null)throw yt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw _t("WebGLRenderer: "+b.message),b}let dt,A,x,V,Y,te,ae,xe,$,se,we,He,Ae,be,Be,$e,lt,O,ye,ie,Ee,Pe,le;function ze(){dt=new lm(F),dt.init(),Ee=new jg(F,dt),A=new em(F,dt,e,Ee),x=new $g(F,dt),A.reversedDepthBuffer&&f&&x.buffers.depth.setReversed(!0),Q=F.createFramebuffer(),j=F.createFramebuffer(),z=F.createFramebuffer(),V=new um(F),Y=new Og,te=new Qg(F,dt,x,Y,A,Ee,V),ae=new om(P),xe=new md(F),Pe=new Q0(F,xe),$=new cm(F,xe,V,Pe),se=new dm(F,$,xe,Pe,V),O=new fm(F,A,te),Be=new tm(Y),we=new Fg(P,ae,dt,A,Pe,Be),He=new r_(P,Y),Ae=new zg,be=new Xg(dt),lt=new $0(P,ae,x,se,g,o),$e=new Jg(P,se,A),le=new a_(F,V,A,x),ye=new j0(F,dt,V),ie=new hm(F,dt,V),V.programs=we.programs,P.capabilities=A,P.extensions=dt,P.properties=Y,P.renderLists=Ae,P.shadowMap=$e,P.state=x,P.info=V}ze(),v!==yn&&(w=new mm(v,t.width,t.height,c,s,r));const Ue=new i_(P,F);this.xr=Ue,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=dt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=dt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(b){b!==void 0&&(he=b,this.setSize(ne,ve,!1))},this.getSize=function(b){return b.set(ne,ve)},this.setSize=function(b,k,K=!0){if(Ue.isPresenting){tt("WebGLRenderer: Can't change size while VR device is presenting.");return}ne=b,ve=k,t.width=Math.floor(b*he),t.height=Math.floor(k*he),K===!0&&(t.style.width=b+"px",t.style.height=k+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,b,k)},this.getDrawingBufferSize=function(b){return b.set(ne*he,ve*he).floor()},this.setDrawingBufferSize=function(b,k,K){ne=b,ve=k,he=K,t.width=Math.floor(b*K),t.height=Math.floor(k*K),this.setViewport(0,0,b,k)},this.setEffects=function(b){if(v===yn){_t("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let k=0;k<b.length;k++)if(b[k].isOutputPass===!0){tt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ge)},this.getViewport=function(b){return b.copy(Ge)},this.setViewport=function(b,k,K,W){b.isVector4?Ge.set(b.x,b.y,b.z,b.w):Ge.set(b,k,K,W),x.viewport(ge.copy(Ge).multiplyScalar(he).round())},this.getScissor=function(b){return b.copy(mt)},this.setScissor=function(b,k,K,W){b.isVector4?mt.set(b.x,b.y,b.z,b.w):mt.set(b,k,K,W),x.scissor(Se.copy(mt).multiplyScalar(he).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(b){x.setScissorTest(je=b)},this.setOpaqueSort=function(b){Ne=b},this.setTransparentSort=function(b){Je=b},this.getClearColor=function(b){return b.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor(...arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha(...arguments)},this.clear=function(b=!0,k=!0,K=!0){let W=0;if(b){let q=!1;if(re!==null){const Re=re.texture.format;q=m.has(Re)}if(q){const Re=re.texture.type,Le=p.has(Re),Ce=lt.getClearColor(),Fe=lt.getClearAlpha(),We=Ce.r,at=Ce.g,Ke=Ce.b;Le?(y[0]=We,y[1]=at,y[2]=Ke,y[3]=Fe,F.clearBufferuiv(F.COLOR,0,y)):(S[0]=We,S[1]=at,S[2]=Ke,S[3]=Fe,F.clearBufferiv(F.COLOR,0,S))}else W|=F.COLOR_BUFFER_BIT}k&&(W|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),B=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",wt,!1),t.removeEventListener("webglcontextcreationerror",Sn,!1),lt.dispose(),Ae.dispose(),be.dispose(),Y.dispose(),ae.dispose(),se.dispose(),Pe.dispose(),le.dispose(),we.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",Rs),Ue.removeEventListener("sessionend",Cs),An.stop()};function Dt(b){b.preventDefault(),aa("WebGLRenderer: Context Lost."),N=!0}function wt(){aa("WebGLRenderer: Context Restored."),N=!1;const b=V.autoReset,k=$e.enabled,K=$e.autoUpdate,W=$e.needsUpdate,q=$e.type;ze(),V.autoReset=b,$e.enabled=k,$e.autoUpdate=K,$e.needsUpdate=W,$e.type=q}function Sn(b){_t("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function an(b){const k=b.target;k.removeEventListener("dispose",an),Vi(k)}function Vi(b){or(b),Y.remove(b)}function or(b){const k=Y.get(b).programs;k!==void 0&&(k.forEach(function(K){we.releaseProgram(K)}),b.isShaderMaterial&&we.releaseShaderCache(b))}this.renderBufferDirect=function(b,k,K,W,q,Re){k===null&&(k=Oe);const Le=q.isMesh&&q.matrixWorld.determinantAffine()<0,Ce=ur(b,k,K,W,q);x.setMaterial(W,Le);let Fe=K.index,We=1;if(W.wireframe===!0){if(Fe=$.getWireframeAttribute(K),Fe===void 0)return;We=2}const at=K.drawRange,Ke=K.attributes.position;let ke=at.start*We,Tt=(at.start+at.count)*We;Re!==null&&(ke=Math.max(ke,Re.start*We),Tt=Math.min(Tt,(Re.start+Re.count)*We)),Fe!==null?(ke=Math.max(ke,0),Tt=Math.min(Tt,Fe.count)):Ke!=null&&(ke=Math.max(ke,0),Tt=Math.min(Tt,Ke.count));const Vt=Tt-ke;if(Vt<0||Vt===1/0)return;Pe.setup(q,W,Ce,K,Fe);let Ot,At=ye;if(Fe!==null&&(Ot=xe.get(Fe),At=ie,At.setIndex(Ot)),q.isMesh)W.wireframe===!0?(x.setLineWidth(W.wireframeLinewidth*it()),At.setMode(F.LINES)):At.setMode(F.TRIANGLES);else if(q.isLine){let tn=W.linewidth;tn===void 0&&(tn=1),x.setLineWidth(tn*it()),q.isLineSegments?At.setMode(F.LINES):q.isLineLoop?At.setMode(F.LINE_LOOP):At.setMode(F.LINE_STRIP)}else q.isPoints?At.setMode(F.POINTS):q.isSprite&&At.setMode(F.TRIANGLES);if(q.isBatchedMesh)if(dt.get("WEBGL_multi_draw"))At.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const tn=q._multiDrawStarts,Ie=q._multiDrawCounts,R=q._multiDrawCount,I=Fe?xe.get(Fe).bytesPerElement:1,U=Y.get(W).currentProgram.getUniforms();for(let H=0;H<R;H++)U.setValue(F,"_gl_DrawID",H),At.render(tn[H]/I,Ie[H])}else if(q.isInstancedMesh)At.renderInstances(ke,Vt,q.count);else if(K.isInstancedBufferGeometry){const tn=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ie=Math.min(K.instanceCount,tn);At.renderInstances(ke,Vt,Ie)}else At.render(ke,Vt)};function Bn(b,k,K){b.transparent===!0&&b.side===qt&&b.forceSinglePass===!1?(b.side=mn,b.needsUpdate=!0,Wi(b,k,K),b.side=bi,b.needsUpdate=!0,Wi(b,k,K),b.side=qt):Wi(b,k,K)}this.compile=function(b,k,K=null){K===null&&(K=b),E=be.get(K),E.init(k),_.push(E),K.traverseVisible(function(q){q.isLight&&q.layers.test(k.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),b!==K&&b.traverseVisible(function(q){q.isLight&&q.layers.test(k.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),E.setupLights();const W=new Set;return b.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const Re=q.material;if(Re)if(Array.isArray(Re))for(let Le=0;Le<Re.length;Le++){const Ce=Re[Le];Bn(Ce,K,q),W.add(Ce)}else Bn(Re,K,q),W.add(Re)}),E=_.pop(),W},this.compileAsync=function(b,k,K=null){const W=this.compile(b,k,K);return new Promise(q=>{function Re(){if(W.forEach(function(Le){Y.get(Le).currentProgram.isReady()&&W.delete(Le)}),W.size===0){q(b);return}setTimeout(Re,10)}dt.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Ti=null;function As(b){Ti&&Ti(b)}function Rs(){An.stop()}function Cs(){An.start()}const An=new qh;An.setAnimationLoop(As),typeof self<"u"&&An.setContext(self),this.setAnimationLoop=function(b){Ti=b,Ue.setAnimationLoop(b),b===null?An.stop():An.start()},Ue.addEventListener("sessionstart",Rs),Ue.addEventListener("sessionend",Cs),this.render=function(b,k){if(k!==void 0&&k.isCamera!==!0){_t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;B!==null&&B.renderStart(b,k);const K=Ue.enabled===!0&&Ue.isPresenting===!0,W=w!==null&&(re===null||K)&&w.begin(P,re);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(k),k=Ue.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,k,re),E=be.get(b,_.length),E.init(k),E.state.textureUnits=te.getTextureUnits(),_.push(E),Te.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),oe.setFromProjectionMatrix(Te,Xn,k.reversedDepth),fe=this.localClippingEnabled,ue=Be.init(this.clippingPlanes,fe),T=Ae.get(b,C.length),T.init(),C.push(T),Ue.enabled===!0&&Ue.isPresenting===!0){const Le=P.xr.getDepthSensingMesh();Le!==null&&Ai(Le,k,-1/0,P.sortObjects)}Ai(b,k,0,P.sortObjects),T.finish(),P.sortObjects===!0&&T.sort(Ne,Je,k.reversedDepth),et=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,et&&lt.addToRenderList(T,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ue===!0&&Be.beginShadows();const q=E.state.shadowsArray;if($e.render(q,b,k),ue===!0&&Be.endShadows(),(W&&w.hasRenderPass())===!1){const Le=T.opaque,Ce=T.transmissive;if(E.setupLights(),k.isArrayCamera){const Fe=k.cameras;if(Ce.length>0)for(let We=0,at=Fe.length;We<at;We++){const Ke=Fe[We];Ps(Le,Ce,b,Ke)}et&&lt.render(b);for(let We=0,at=Fe.length;We<at;We++){const Ke=Fe[We];lr(T,b,Ke,Ke.viewport)}}else Ce.length>0&&Ps(Le,Ce,b,k),et&&lt.render(b),lr(T,b,k)}re!==null&&X===0&&(te.updateMultisampleRenderTarget(re),te.updateRenderTargetMipmap(re)),W&&w.end(P),b.isScene===!0&&b.onAfterRender(P,b,k),Pe.resetDefaultState(),de=-1,me=null,_.pop(),_.length>0?(E=_[_.length-1],te.setTextureUnits(E.state.textureUnits),ue===!0&&Be.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,B!==null&&B.renderEnd()};function Ai(b,k,K,W){if(b.visible===!1)return;if(b.layers.test(k.layers)){if(b.isGroup)K=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(k);else if(b.isLightProbeGrid)E.pushLightProbeGrid(b);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||oe.intersectsSprite(b)){W&&Ze.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Te);const Le=se.update(b),Ce=b.material;Ce.visible&&T.push(b,Le,Ce,K,Ze.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||oe.intersectsObject(b))){const Le=se.update(b),Ce=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ze.copy(b.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Ze.copy(Le.boundingSphere.center)),Ze.applyMatrix4(b.matrixWorld).applyMatrix4(Te)),Array.isArray(Ce)){const Fe=Le.groups;for(let We=0,at=Fe.length;We<at;We++){const Ke=Fe[We],ke=Ce[Ke.materialIndex];ke&&ke.visible&&T.push(b,Le,ke,K,Ze.z,Ke)}}else Ce.visible&&T.push(b,Le,Ce,K,Ze.z,null)}}const Re=b.children;for(let Le=0,Ce=Re.length;Le<Ce;Le++)Ai(Re[Le],k,K,W)}function lr(b,k,K,W){const{opaque:q,transmissive:Re,transparent:Le}=b;E.setupLightsView(K),ue===!0&&Be.setGlobalState(P.clippingPlanes,K),W&&x.viewport(ge.copy(W)),q.length>0&&Gi(q,k,K),Re.length>0&&Gi(Re,k,K),Le.length>0&&Gi(Le,k,K),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Ps(b,k,K,W){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){const ke=dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new qn(1,1,{generateMipmaps:!0,type:ke?ci:yn,minFilter:Ui,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}const Re=E.state.transmissionRenderTarget[W.id],Le=W.viewport||ge;Re.setSize(Le.z*P.transmissionResolutionScale,Le.w*P.transmissionResolutionScale);const Ce=P.getRenderTarget(),Fe=P.getActiveCubeFace(),We=P.getActiveMipmapLevel();P.setRenderTarget(Re),P.getClearColor(Et),st=P.getClearAlpha(),st<1&&P.setClearColor(16777215,.5),P.clear(),et&&lt.render(K);const at=P.toneMapping;P.toneMapping=Yn;const Ke=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),ue===!0&&Be.setGlobalState(P.clippingPlanes,W),Gi(b,K,W),te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re),dt.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Tt=0,Vt=k.length;Tt<Vt;Tt++){const Ot=k[Tt],{object:At,geometry:tn,material:Ie,group:R}=Ot;if(Ie.side===qt&&At.layers.test(W.layers)){const I=Ie.side;Ie.side=mn,Ie.needsUpdate=!0,Hi(At,K,W,tn,Ie,R),Ie.side=I,Ie.needsUpdate=!0,ke=!0}}ke===!0&&(te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re))}P.setRenderTarget(Ce,Fe,We),P.setClearColor(Et,st),Ke!==void 0&&(W.viewport=Ke),P.toneMapping=at}function Gi(b,k,K){const W=k.isScene===!0?k.overrideMaterial:null;for(let q=0,Re=b.length;q<Re;q++){const Le=b[q],{object:Ce,geometry:Fe,group:We}=Le;let at=Le.material;at.allowOverride===!0&&W!==null&&(at=W),Ce.layers.test(K.layers)&&Hi(Ce,k,K,Fe,at,We)}}function Hi(b,k,K,W,q,Re){b.onBeforeRender(P,k,K,W,q,Re),b.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(P,k,K,W,b,Re),q.transparent===!0&&q.side===qt&&q.forceSinglePass===!1?(q.side=mn,q.needsUpdate=!0,P.renderBufferDirect(K,k,W,q,b,Re),q.side=bi,q.needsUpdate=!0,P.renderBufferDirect(K,k,W,q,b,Re),q.side=qt):P.renderBufferDirect(K,k,W,q,b,Re),b.onAfterRender(P,k,K,W,q,Re)}function Wi(b,k,K){k.isScene!==!0&&(k=Oe);const W=Y.get(b),q=E.state.lights,Re=E.state.shadowsArray,Le=q.state.version,Ce=we.getParameters(b,q.state,Re,k,K,E.state.lightProbeGridArray),Fe=we.getProgramCacheKey(Ce);let We=W.programs;W.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?k.environment:null,W.fog=k.fog;const at=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;W.envMap=ae.get(b.envMap||W.environment,at),W.envMapRotation=W.environment!==null&&b.envMap===null?k.environmentRotation:b.envMapRotation,We===void 0&&(b.addEventListener("dispose",an),We=new Map,W.programs=We);let Ke=We.get(Fe);if(Ke!==void 0){if(W.currentProgram===Ke&&W.lightsStateVersion===Le)return hr(b,Ce),Ke}else Ce.uniforms=we.getUniforms(b),B!==null&&b.isNodeMaterial&&B.build(b,K,Ce),b.onBeforeCompile(Ce,P),Ke=we.acquireProgram(Ce,Fe),We.set(Fe,Ke),W.uniforms=Ce.uniforms;const ke=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ke.clippingPlanes=Be.uniform),hr(b,Ce),W.needsLights=ba(b),W.lightsStateVersion=Le,W.needsLights&&(ke.ambientLightColor.value=q.state.ambient,ke.lightProbe.value=q.state.probe,ke.directionalLights.value=q.state.directional,ke.directionalLightShadows.value=q.state.directionalShadow,ke.spotLights.value=q.state.spot,ke.spotLightShadows.value=q.state.spotShadow,ke.rectAreaLights.value=q.state.rectArea,ke.ltc_1.value=q.state.rectAreaLTC1,ke.ltc_2.value=q.state.rectAreaLTC2,ke.pointLights.value=q.state.point,ke.pointLightShadows.value=q.state.pointShadow,ke.hemisphereLights.value=q.state.hemi,ke.directionalShadowMatrix.value=q.state.directionalShadowMatrix,ke.spotLightMatrix.value=q.state.spotLightMatrix,ke.spotLightMap.value=q.state.spotLightMap,ke.pointShadowMatrix.value=q.state.pointShadowMatrix),W.lightProbeGrid=E.state.lightProbeGridArray.length>0,W.currentProgram=Ke,W.uniformsList=null,Ke}function cr(b){if(b.uniformsList===null){const k=b.currentProgram.getUniforms();b.uniformsList=jr.seqWithValue(k.seq,b.uniforms)}return b.uniformsList}function hr(b,k){const K=Y.get(b);K.outputColorSpace=k.outputColorSpace,K.batching=k.batching,K.batchingColor=k.batchingColor,K.instancing=k.instancing,K.instancingColor=k.instancingColor,K.instancingMorph=k.instancingMorph,K.skinning=k.skinning,K.morphTargets=k.morphTargets,K.morphNormals=k.morphNormals,K.morphColors=k.morphColors,K.morphTargetsCount=k.morphTargetsCount,K.numClippingPlanes=k.numClippingPlanes,K.numIntersection=k.numClipIntersection,K.vertexAlphas=k.vertexAlphas,K.vertexTangents=k.vertexTangents,K.toneMapping=k.toneMapping}function Rn(b,k){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;M.setFromMatrixPosition(k.matrixWorld);for(let K=0,W=b.length;K<W;K++){const q=b[K];if(q.texture!==null&&q.boundingBox.containsPoint(M))return q}return null}function ur(b,k,K,W,q){k.isScene!==!0&&(k=Oe),te.resetTextureUnits();const Re=k.fog,Le=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?k.environment:null,Ce=re===null?P.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Mt.workingColorSpace,Fe=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,We=ae.get(W.envMap||Le,Fe),at=W.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ke=!!K.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),ke=!!K.morphAttributes.position,Tt=!!K.morphAttributes.normal,Vt=!!K.morphAttributes.color;let Ot=Yn;W.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Ot=P.toneMapping);const At=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,tn=At!==void 0?At.length:0,Ie=Y.get(W),R=E.state.lights;if(ue===!0&&(fe===!0||b!==me)){const Qe=b===me&&W.id===de;Be.setState(W,b,Qe)}let I=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==R.state.version||Ie.outputColorSpace!==Ce||q.isBatchedMesh&&Ie.batching===!1||!q.isBatchedMesh&&Ie.batching===!0||q.isBatchedMesh&&Ie.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Ie.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Ie.instancing===!1||!q.isInstancedMesh&&Ie.instancing===!0||q.isSkinnedMesh&&Ie.skinning===!1||!q.isSkinnedMesh&&Ie.skinning===!0||q.isInstancedMesh&&Ie.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ie.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ie.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ie.instancingMorph===!1&&q.morphTexture!==null||Ie.envMap!==We||W.fog===!0&&Ie.fog!==Re||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==Be.numPlanes||Ie.numIntersection!==Be.numIntersection)||Ie.vertexAlphas!==at||Ie.vertexTangents!==Ke||Ie.morphTargets!==ke||Ie.morphNormals!==Tt||Ie.morphColors!==Vt||Ie.toneMapping!==Ot||Ie.morphTargetsCount!==tn||!!Ie.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(I=!0):(I=!0,Ie.__version=W.version);let U=Ie.currentProgram;I===!0&&(U=Wi(W,k,q),B&&W.isNodeMaterial&&B.onUpdateProgram(W,U,Ie));let H=!1,G=!1,ce=!1;const _e=U.getUniforms(),Ve=Ie.uniforms;if(x.useProgram(U.program)&&(H=!0,G=!0,ce=!0),W.id!==de&&(de=W.id,G=!0),Ie.needsLights){const Qe=Rn(E.state.lightProbeGridArray,q);Ie.lightProbeGrid!==Qe&&(Ie.lightProbeGrid=Qe,G=!0)}if(H||me!==b){x.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),_e.setValue(F,"projectionMatrix",b.projectionMatrix),_e.setValue(F,"viewMatrix",b.matrixWorldInverse);const Rt=_e.map.cameraPosition;Rt!==void 0&&Rt.setValue(F,Me.setFromMatrixPosition(b.matrixWorld)),A.logarithmicDepthBuffer&&_e.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&_e.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),me!==b&&(me=b,G=!0,ce=!0)}if(Ie.needsLights&&(R.state.directionalShadowMap.length>0&&_e.setValue(F,"directionalShadowMap",R.state.directionalShadowMap,te),R.state.spotShadowMap.length>0&&_e.setValue(F,"spotShadowMap",R.state.spotShadowMap,te),R.state.pointShadowMap.length>0&&_e.setValue(F,"pointShadowMap",R.state.pointShadowMap,te)),q.isSkinnedMesh){_e.setOptional(F,q,"bindMatrix"),_e.setOptional(F,q,"bindMatrixInverse");const Qe=q.skeleton;Qe&&(Qe.boneTexture===null&&Qe.computeBoneTexture(),_e.setValue(F,"boneTexture",Qe.boneTexture,te))}q.isBatchedMesh&&(_e.setOptional(F,q,"batchingTexture"),_e.setValue(F,"batchingTexture",q._matricesTexture,te),_e.setOptional(F,q,"batchingIdTexture"),_e.setValue(F,"batchingIdTexture",q._indirectTexture,te),_e.setOptional(F,q,"batchingColorTexture"),q._colorsTexture!==null&&_e.setValue(F,"batchingColorTexture",q._colorsTexture,te));const nt=K.morphAttributes;if((nt.position!==void 0||nt.normal!==void 0||nt.color!==void 0)&&O.update(q,K,U),(G||Ie.receiveShadow!==q.receiveShadow)&&(Ie.receiveShadow=q.receiveShadow,_e.setValue(F,"receiveShadow",q.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&k.environment!==null&&(Ve.envMapIntensity.value=k.environmentIntensity),Ve.dfgLUT!==void 0&&(Ve.dfgLUT.value=l_()),G){if(_e.setValue(F,"toneMappingExposure",P.toneMappingExposure),Ie.needsLights&&Sa(Ve,ce),Re&&W.fog===!0&&He.refreshFogUniforms(Ve,Re),He.refreshMaterialUniforms(Ve,W,he,ve,E.state.transmissionRenderTarget[b.id]),Ie.needsLights&&Ie.lightProbeGrid){const Qe=Ie.lightProbeGrid;Ve.probesSH.value=Qe.texture,Ve.probesMin.value.copy(Qe.boundingBox.min),Ve.probesMax.value.copy(Qe.boundingBox.max),Ve.probesResolution.value.copy(Qe.resolution)}jr.upload(F,cr(Ie),Ve,te)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(jr.upload(F,cr(Ie),Ve,te),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&_e.setValue(F,"center",q.center),_e.setValue(F,"modelViewMatrix",q.modelViewMatrix),_e.setValue(F,"normalMatrix",q.normalMatrix),_e.setValue(F,"modelMatrix",q.matrixWorld),W.uniformsGroups!==void 0){const Qe=W.uniformsGroups;for(let Rt=0,ot=Qe.length;Rt<ot;Rt++){const bt=Qe[Rt];le.update(bt,U),le.bind(bt,U)}}return U}function Sa(b,k){b.ambientLightColor.needsUpdate=k,b.lightProbe.needsUpdate=k,b.directionalLights.needsUpdate=k,b.directionalLightShadows.needsUpdate=k,b.pointLights.needsUpdate=k,b.pointLightShadows.needsUpdate=k,b.spotLights.needsUpdate=k,b.spotLightShadows.needsUpdate=k,b.rectAreaLights.needsUpdate=k,b.hemisphereLights.needsUpdate=k}function ba(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(b,k,K){const W=Y.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Y.get(b.texture).__webglTexture=k,Y.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:K,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,k){const K=Y.get(b);K.__webglFramebuffer=k,K.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(b,k=0,K=0){re=b,Z=k,X=K;let W=null,q=!1,Re=!1;if(b){const Ce=Y.get(b);if(Ce.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(F.FRAMEBUFFER,Ce.__webglFramebuffer),ge.copy(b.viewport),Se.copy(b.scissor),rt=b.scissorTest,x.viewport(ge),x.scissor(Se),x.setScissorTest(rt),de=-1;return}else if(Ce.__webglFramebuffer===void 0)te.setupRenderTarget(b);else if(Ce.__hasExternalTextures)te.rebindTextures(b,Y.get(b.texture).__webglTexture,Y.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const at=b.depthTexture;if(Ce.__boundDepthTexture!==at){if(at!==null&&Y.has(at)&&(b.width!==at.image.width||b.height!==at.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(b)}}const Fe=b.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(Re=!0);const We=Y.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(We[k])?W=We[k][K]:W=We[k],q=!0):b.samples>0&&te.useMultisampledRTT(b)===!1?W=Y.get(b).__webglMultisampledFramebuffer:Array.isArray(We)?W=We[K]:W=We,ge.copy(b.viewport),Se.copy(b.scissor),rt=b.scissorTest}else ge.copy(Ge).multiplyScalar(he).floor(),Se.copy(mt).multiplyScalar(he).floor(),rt=je;if(K!==0&&(W=Q),x.bindFramebuffer(F.FRAMEBUFFER,W)&&x.drawBuffers(b,W),x.viewport(ge),x.scissor(Se),x.setScissorTest(rt),q){const Ce=Y.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ce.__webglTexture,K)}else if(Re){const Ce=k;for(let Fe=0;Fe<b.textures.length;Fe++){const We=Y.get(b.textures[Fe]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Fe,We.__webglTexture,K,Ce)}}else if(b!==null&&K!==0){const Ce=Y.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ce.__webglTexture,K)}de=-1},this.readRenderTargetPixels=function(b,k,K,W,q,Re,Le,Ce=0){if(!(b&&b.isWebGLRenderTarget)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe){x.bindFramebuffer(F.FRAMEBUFFER,Fe);try{const We=b.textures[Ce],at=We.format,Ke=We.type;if(b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ce),!A.textureFormatReadable(at)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Ke)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=b.width-W&&K>=0&&K<=b.height-q&&F.readPixels(k,K,W,q,Ee.convert(at),Ee.convert(Ke),Re)}finally{const We=re!==null?Y.get(re).__webglFramebuffer:null;x.bindFramebuffer(F.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(b,k,K,W,q,Re,Le,Ce=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=Y.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Le!==void 0&&(Fe=Fe[Le]),Fe)if(k>=0&&k<=b.width-W&&K>=0&&K<=b.height-q){x.bindFramebuffer(F.FRAMEBUFFER,Fe);const We=b.textures[Ce],at=We.format,Ke=We.type;if(b.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Ce),!A.textureFormatReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ke=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ke),F.bufferData(F.PIXEL_PACK_BUFFER,Re.byteLength,F.STREAM_READ),F.readPixels(k,K,W,q,Ee.convert(at),Ee.convert(Ke),0);const Tt=re!==null?Y.get(re).__webglFramebuffer:null;x.bindFramebuffer(F.FRAMEBUFFER,Tt);const Vt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Hu(F,Vt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ke),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Re),F.deleteBuffer(ke),F.deleteSync(Vt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,k=null,K=0){const W=Math.pow(2,-K),q=Math.floor(b.image.width*W),Re=Math.floor(b.image.height*W),Le=k!==null?k.x:0,Ce=k!==null?k.y:0;te.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,Le,Ce,q,Re),x.unbindTexture()},this.copyTextureToTexture=function(b,k,K=null,W=null,q=0,Re=0){let Le,Ce,Fe,We,at,Ke,ke,Tt,Vt;const Ot=b.isCompressedTexture?b.mipmaps[Re]:b.image;if(K!==null)Le=K.max.x-K.min.x,Ce=K.max.y-K.min.y,Fe=K.isBox3?K.max.z-K.min.z:1,We=K.min.x,at=K.min.y,Ke=K.isBox3?K.min.z:0;else{const Ve=Math.pow(2,-q);Le=Math.floor(Ot.width*Ve),Ce=Math.floor(Ot.height*Ve),b.isDataArrayTexture?Fe=Ot.depth:b.isData3DTexture?Fe=Math.floor(Ot.depth*Ve):Fe=1,We=0,at=0,Ke=0}W!==null?(ke=W.x,Tt=W.y,Vt=W.z):(ke=0,Tt=0,Vt=0);const At=Ee.convert(k.format),tn=Ee.convert(k.type);let Ie;k.isData3DTexture?(te.setTexture3D(k,0),Ie=F.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(te.setTexture2DArray(k,0),Ie=F.TEXTURE_2D_ARRAY):(te.setTexture2D(k,0),Ie=F.TEXTURE_2D),x.activeTexture(F.TEXTURE0),x.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,k.flipY),x.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),x.pixelStorei(F.UNPACK_ALIGNMENT,k.unpackAlignment);const R=x.getParameter(F.UNPACK_ROW_LENGTH),I=x.getParameter(F.UNPACK_IMAGE_HEIGHT),U=x.getParameter(F.UNPACK_SKIP_PIXELS),H=x.getParameter(F.UNPACK_SKIP_ROWS),G=x.getParameter(F.UNPACK_SKIP_IMAGES);x.pixelStorei(F.UNPACK_ROW_LENGTH,Ot.width),x.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ot.height),x.pixelStorei(F.UNPACK_SKIP_PIXELS,We),x.pixelStorei(F.UNPACK_SKIP_ROWS,at),x.pixelStorei(F.UNPACK_SKIP_IMAGES,Ke);const ce=b.isDataArrayTexture||b.isData3DTexture,_e=k.isDataArrayTexture||k.isData3DTexture;if(b.isDepthTexture){const Ve=Y.get(b),nt=Y.get(k),Qe=Y.get(Ve.__renderTarget),Rt=Y.get(nt.__renderTarget);x.bindFramebuffer(F.READ_FRAMEBUFFER,Qe.__webglFramebuffer),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let ot=0;ot<Fe;ot++)ce&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Y.get(b).__webglTexture,q,Ke+ot),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Y.get(k).__webglTexture,Re,Vt+ot)),F.blitFramebuffer(We,at,Le,Ce,ke,Tt,Le,Ce,F.DEPTH_BUFFER_BIT,F.NEAREST);x.bindFramebuffer(F.READ_FRAMEBUFFER,null),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(q!==0||b.isRenderTargetTexture||Y.has(b)){const Ve=Y.get(b),nt=Y.get(k);x.bindFramebuffer(F.READ_FRAMEBUFFER,j),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,z);for(let Qe=0;Qe<Fe;Qe++)ce?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ve.__webglTexture,q,Ke+Qe):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ve.__webglTexture,q),_e?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,nt.__webglTexture,Re,Vt+Qe):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,nt.__webglTexture,Re),q!==0?F.blitFramebuffer(We,at,Le,Ce,ke,Tt,Le,Ce,F.COLOR_BUFFER_BIT,F.NEAREST):_e?F.copyTexSubImage3D(Ie,Re,ke,Tt,Vt+Qe,We,at,Le,Ce):F.copyTexSubImage2D(Ie,Re,ke,Tt,We,at,Le,Ce);x.bindFramebuffer(F.READ_FRAMEBUFFER,null),x.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else _e?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Ie,Re,ke,Tt,Vt,Le,Ce,Fe,At,tn,Ot.data):k.isCompressedArrayTexture?F.compressedTexSubImage3D(Ie,Re,ke,Tt,Vt,Le,Ce,Fe,At,Ot.data):F.texSubImage3D(Ie,Re,ke,Tt,Vt,Le,Ce,Fe,At,tn,Ot):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Re,ke,Tt,Le,Ce,At,tn,Ot.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Re,ke,Tt,Ot.width,Ot.height,At,Ot.data):F.texSubImage2D(F.TEXTURE_2D,Re,ke,Tt,Le,Ce,At,tn,Ot);x.pixelStorei(F.UNPACK_ROW_LENGTH,R),x.pixelStorei(F.UNPACK_IMAGE_HEIGHT,I),x.pixelStorei(F.UNPACK_SKIP_PIXELS,U),x.pixelStorei(F.UNPACK_SKIP_ROWS,H),x.pixelStorei(F.UNPACK_SKIP_IMAGES,G),Re===0&&k.generateMipmaps&&F.generateMipmap(Ie),x.unbindTexture()},this.initRenderTarget=function(b){Y.get(b).__webglFramebuffer===void 0&&te.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?te.setTextureCube(b,0):b.isData3DTexture?te.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?te.setTexture2DArray(b,0):te.setTexture2D(b,0),x.unbindTexture()},this.resetState=function(){Z=0,X=0,re=null,x.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}}const Xs=new L;function En(i,e,t,n,s,r){const a=2*Math.PI*s/4,c=Math.max(r-2*s,0),o=Math.PI/4;Xs.copy(e),Xs[n]=0,Xs.normalize();const l=.5*a/(a+c),h=1-Xs.angleTo(i)/o;return Math.sign(Xs[t])===1?h*l:c/(a+c)+l+l*(1-h)}class ya extends Bt{constructor(e=1,t=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const o=new L,l=new L,h=new L(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,g=u.length/6,v=new L,m=.5/a;for(let p=0,y=0;p<u.length;p+=3,y+=2)switch(o.fromArray(u,p),l.copy(o),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(o.x)+l.x*r,u[p+1]=h.y*Math.sign(o.y)+l.y*r,u[p+2]=h.z*Math.sign(o.z)+l.z*r,f[p+0]=l.x,f[p+1]=l.y,f[p+2]=l.z,Math.floor(p/g)){case 0:v.set(1,0,0),d[y+0]=En(v,l,"z","y",r,n),d[y+1]=1-En(v,l,"y","z",r,t);break;case 1:v.set(-1,0,0),d[y+0]=1-En(v,l,"z","y",r,n),d[y+1]=1-En(v,l,"y","z",r,t);break;case 2:v.set(0,1,0),d[y+0]=1-En(v,l,"x","z",r,e),d[y+1]=En(v,l,"z","x",r,n);break;case 3:v.set(0,-1,0),d[y+0]=1-En(v,l,"x","z",r,e),d[y+1]=1-En(v,l,"z","x",r,n);break;case 4:v.set(0,0,1),d[y+0]=1-En(v,l,"x","y",r,e),d[y+1]=1-En(v,l,"y","x",r,t);break;case 5:v.set(0,0,-1),d[y+0]=En(v,l,"x","y",r,e),d[y+1]=1-En(v,l,"y","x",r,t);break}}static fromJSON(e){return new ya(e.width,e.height,e.depth,e.segments,e.radius)}}const eh={type:"change"},Dl={type:"start"},tu={type:"end"},Wr=new va,th=new ni,h_=Math.cos(70*Yu.DEG2RAD),Jt=new L,gn=2*Math.PI,It={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},lo=1e-6;class u_ extends dd{constructor(e,t=null){super(e,t),this.state=It.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ms.ROTATE,MIDDLE:ms.DOLLY,RIGHT:ms.PAN},this.touches={ONE:fs.ROTATE,TWO:fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new ui,this._lastTargetPosition=new L,this._quat=new ui().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Cc,this._sphericalDelta=new Cc,this._scale=1,this._panOffset=new L,this._rotateStart=new J,this._rotateEnd=new J,this._rotateDelta=new J,this._panStart=new J,this._panEnd=new J,this._panDelta=new J,this._dollyStart=new J,this._dollyEnd=new J,this._dollyDelta=new J,this._dollyDirection=new L,this._mouse=new J,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=d_.bind(this),this._onPointerDown=f_.bind(this),this._onPointerUp=p_.bind(this),this._onContextMenu=y_.bind(this),this._onMouseWheel=__.bind(this),this._onKeyDown=v_.bind(this),this._onTouchStart=x_.bind(this),this._onTouchMove=M_.bind(this),this._onMouseDown=m_.bind(this),this._onMouseMove=g_.bind(this),this._interceptControlDown=S_.bind(this),this._interceptControlUp=b_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(eh),this.update(),this.state=It.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Jt.copy(t).sub(this.target),Jt.applyQuaternion(this._quat),this._spherical.setFromVector3(Jt),this.autoRotate&&this.state===It.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=gn:n>Math.PI&&(n-=gn),s<-Math.PI?s+=gn:s>Math.PI&&(s-=gn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Jt.setFromSpherical(this._spherical),Jt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Jt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const c=Jt.length();a=this._clampDistance(c*this._scale);const o=c-a;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),r=!!o}else if(this.object.isOrthographicCamera){const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=o!==this.object.zoom;const l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(c),this.object.updateMatrixWorld(),a=Jt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Wr.origin.copy(this.object.position),Wr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wr.direction))<h_?this.object.lookAt(this.target):(th.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wr.intersectPlane(th,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>lo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>lo||this._lastTargetPosition.distanceToSquared(this.target)>lo?(this.dispatchEvent(eh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?gn/60*this.autoRotateSpeed*e:gn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Jt.setFromMatrixColumn(t,0),Jt.multiplyScalar(-e),this._panOffset.add(Jt)}_panUp(e,t){this.screenSpacePanning===!0?Jt.setFromMatrixColumn(t,1):(Jt.setFromMatrixColumn(t,0),Jt.crossVectors(this.object.up,Jt)),Jt.multiplyScalar(e),this._panOffset.add(Jt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Jt.copy(s).sub(this.target);let r=Jt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,c=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/t.clientHeight),this._rotateUp(gn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-gn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(gn*this._rotateDelta.x/t.clientHeight),this._rotateUp(gn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,c=(e.pageY+t.y)*.5;this._updateZoomParameters(a,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new J,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function f_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function d_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function p_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tu),this.state=It.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function m_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ms.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=It.DOLLY;break;case ms.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=It.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=It.ROTATE}break;case ms.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=It.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=It.PAN}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(Dl)}function g_(i){switch(this.state){case It.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case It.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case It.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function __(i){this.enabled===!1||this.enableZoom===!1||this.state!==It.NONE||(i.preventDefault(),this.dispatchEvent(Dl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(tu))}function v_(i){this.enabled!==!1&&this._handleKeyDown(i)}function x_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=It.TOUCH_ROTATE;break;case fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=It.TOUCH_PAN;break;default:this.state=It.NONE}break;case 2:switch(this.touches.TWO){case fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=It.TOUCH_DOLLY_PAN;break;case fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=It.TOUCH_DOLLY_ROTATE;break;default:this.state=It.NONE}break;default:this.state=It.NONE}this.state!==It.NONE&&this.dispatchEvent(Dl)}function M_(i){switch(this._trackPointer(i),this.state){case It.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case It.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case It.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case It.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=It.NONE}}function y_(i){this.enabled!==!1&&i.preventDefault()}function S_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function b_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class E_ extends wh{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Bt;e.deleteAttribute("uv");const t=new pe({side:mn}),n=new pe,s=new ad(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new qe(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new pf(e,n,6),c=new Zt;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),a.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),a.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),a.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),a.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),a.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),a.setMatrixAt(5,c.matrix),this.add(a);const o=new qe(e,hs(50));o.position.set(-16.116,14.37,8.208),o.scale.set(.1,2.428,2.739),this.add(o);const l=new qe(e,hs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new qe(e,hs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new qe(e,hs(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const f=new qe(e,hs(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);const d=new qe(e,hs(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function hs(i){return new nd({color:0,emissive:16777215,emissiveIntensity:i})}const nh=1.8,us=.75,Ys=.9;function w_(i,e={}){const t=new c_({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),t.setSize(i.clientWidth||1,i.clientHeight||1),t.shadowMap.enabled=!0,t.shadowMap.type=$s,t.outputColorSpace=hn,t.toneMapping=hl,t.toneMappingExposure=1,t.domElement.style.display="block",t.domElement.style.touchAction="none",i.appendChild(t.domElement);const n=e.setting==="field",s=e.unitScale??1,r=new wh;r.background=new ht(n?12377333:14672872),r.fog=n?new oa(12377333,60*s,160*s):new oa(14672872,4*s,9*s);const a=new rl(t),c=a.fromScene(new E_,.04).texture;r.environment=c,r.environmentIntensity=.55,a.dispose();const o=new Mn(40,(i.clientWidth||1)/(i.clientHeight||1),.01*s,(n?300:30)*s),l=new L(...e.cameraPosition??[0,.5,1.45]),h=new L(...e.target??[0,.3,0]);o.position.copy(l);const u=new u_(o,t.domElement);u.target.copy(h),u.enableDamping=!0,u.dampingFactor=.08,u.enablePan=!1,u.minDistance=e.minDistance??.5,u.maxDistance=e.maxDistance??3,u.maxPolarAngle=Math.PI/2.05,u.minAzimuthAngle=-Math.PI/2.2,u.maxAzimuthAngle=Math.PI/2.2,u.update();const f=new $t;f.scale.setScalar(s),r.add(f),n?(R_(f),C_(f)):(T_(f),A_(f)),s!==1&&f.traverse(_=>{if(!(_ instanceof da)||!_.castShadow)return;const w=_.shadow.camera;w.left*=s,w.right*=s,w.top*=s,w.bottom*=s,w.near*=s,w.far*=s,w.updateProjectionMatrix(),_.shadow.normalBias*=s});const d=[],g=new hd;let v=0;const m=_=>{v=requestAnimationFrame(m),g.update(_);const w=Math.min(1,g.getDelta());d.forEach(P=>P(w)),u.update(),L_(r,o,t.domElement.clientHeight),t.render(r,o)};v=requestAnimationFrame(m);let p=null,y=null,S=!1;u.addEventListener("start",()=>{S=!0});const M=new ResizeObserver(()=>{const _=i.clientWidth,w=i.clientHeight;!_||!w||(t.setSize(_,w),o.aspect=_/w,o.updateProjectionMatrix(),p&&!S&&(y!==null?T(p,y):E(p)))});M.observe(i);function T(_,w=.7){if(_.isEmpty())return;p=_.clone(),y=w,S=!1;const P=_.getCenter(new L),N=l.clone().sub(h).normalize(),B=[0,1,2,3,4,5,6,7].map(Z=>new L(Z&1?_.max.x:_.min.x,Z&2?_.max.y:_.min.y,Z&4?_.max.z:_.min.z)),Q=Z=>(o.position.copy(P).addScaledVector(N,Z),o.lookAt(P),o.updateMatrixWorld(!0),B.every(X=>{const re=X.clone().project(o);return re.z<1&&Math.abs(re.x)<=w&&Math.abs(re.y)<=w}));let j=.01,z=u.maxDistance*4;for(let Z=0;Z<40;Z++){const X=(j+z)/2;Q(X)?z=X:j=X}u.maxDistance=Math.max(u.maxDistance,z*1.5),h.copy(P),l.copy(P).addScaledVector(N,z),o.position.copy(l),u.target.copy(h),u.update()}function E(_){if(_.isEmpty())return;p=_.clone(),y=null,S=!1;const w=_.getCenter(new L),P=_.getSize(new L),N=o.fov*Math.PI/180,B=2*Math.atan(Math.tan(N/2)*o.aspect),Q=Math.max(P.x/2/Math.tan(B/2),Math.max(P.y,P.z*.6)/2/Math.tan(N/2))*1.12+P.z*.25,j=l.clone().sub(h).normalize(),z=Math.min(u.maxDistance,Math.max(u.minDistance,Q));h.copy(w),l.copy(w).addScaledVector(j,z),o.position.copy(l),u.target.copy(h),u.update()}const C=new J;return{renderer:t,scene:r,camera:o,controls:u,canvas:t.domElement,onFrame:_=>{d.push(_)},resetView:()=>{o.position.copy(l),u.target.copy(h),u.update()},frameBox:E,fitBox:T,toNdc:_=>{const w=t.domElement.getBoundingClientRect();return C.set((_.clientX-w.left)/w.width*2-1,-((_.clientY-w.top)/w.height)*2+1),C},dispose:()=>{cancelAnimationFrame(v),M.disconnect(),u.dispose(),r.traverse(_=>{var w;(_ instanceof qe||_ instanceof vf||_ instanceof Fn)&&((w=_.geometry)==null||w.dispose(),(Array.isArray(_.material)?_.material:[_.material]).forEach(N=>{var B;(B=N.map)==null||B.dispose(),N.dispose()}))}),c.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.remove()}}}function T_(i){i.add(new Wh(16119807,9080729,.55));const e=new da(16777215,1.6);e.position.set(1.2,2.4,1.6),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),e.shadow.camera.left=-1,e.shadow.camera.right=1,e.shadow.camera.top=1,e.shadow.camera.bottom=-1,e.shadow.camera.near=.5,e.shadow.camera.far=6,e.shadow.bias=-5e-4,e.shadow.normalBias=.02,e.shadow.radius=4,i.add(e);const t=new da(14674175,.45);t.position.set(-1.6,1.2,.8),i.add(t)}function A_(i){const e=pa(512,512,(u,f,d)=>{u.fillStyle="#b9bec6",u.fillRect(0,0,f,d);for(let g=0;g<1200;g++)u.fillStyle=`rgba(${Math.random()>.5?"255,255,255":"60,64,72"},${Math.random()*.06})`,u.fillRect(Math.random()*f,Math.random()*d,3,3);u.strokeStyle="rgba(70,74,82,0.35)",u.lineWidth=3,u.strokeRect(0,0,f,d)});e.wrapS=e.wrapT=ri,e.repeat.set(12,12);const t=new qe(new li(14,14),new pe({map:e,roughness:.85}));t.rotation.x=-Math.PI/2,t.position.y=-Ys,t.receiveShadow=!0,i.add(t);const n=new qe(new li(14,5),new pe({color:15659250,roughness:.95}));n.position.set(0,1.6,-us/2-.25),n.receiveShadow=!0,i.add(n);const s=pa(256,256,(u,f,d)=>{u.fillStyle="#f7f8f9",u.fillRect(0,0,f,d),u.strokeStyle="#c9ced4",u.lineWidth=4,u.strokeRect(0,0,f,d)});s.wrapS=s.wrapT=ri,s.repeat.set(40,4);const r=new qe(new li(6,.6),new pe({map:s,roughness:.3,metalness:0}));r.position.set(0,.3,-us/2-.249),i.add(r);const a=new qe(new ya(nh,.035,us,3,.008),new fa({color:2040616,roughness:.42,clearcoat:.4,clearcoatRoughness:.35}));a.position.y=-.0175,a.receiveShadow=!0,a.castShadow=!0,i.add(a);const c=P_(),o=new qe(new Bt(nh-.06,Ys-.035,us-.06),new pe({map:c,roughness:.7}));o.position.y=-Ys/2-.0175,o.receiveShadow=!0,i.add(o);const l=new pe({color:3877404,roughness:.8}),h=I_.steel();for(const u of[-.6,0,.6]){const f=new qe(new Bt(.004,Ys-.12,.002),l);f.position.set(u,-Ys/2-.02,(us-.06)/2+.001),i.add(f)}for(const u of[-.66,-.54,-.06,.06,.54,.66]){const f=new qe(new ee(.006,.006,.1,12),h);f.position.set(u,-.2,(us-.06)/2+.015),i.add(f)}}function R_(i){i.add(new Wh(14675967,6126138,.8));const e=new da(16774368,2.2);e.position.set(8,30,18),e.target.position.set(12,0,0),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:80}),e.shadow.bias=-4e-4,e.shadow.normalBias=.03,i.add(e,e.target)}function C_(i){const e=pa(512,512,(a,c,o)=>{a.fillStyle="#5f8f3e",a.fillRect(0,0,c,o);for(let l=0;l<6e3;l++){const h=60+Math.random()*70;a.fillStyle=`rgba(${h*.6},${h+40},${h*.4},0.35)`,a.fillRect(Math.random()*c,Math.random()*o,2,5)}});e.wrapS=e.wrapT=ri,e.repeat.set(80,80);const t=new qe(new li(300,300),new pe({map:e,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,i.add(t);const n=new qe(new li(80,.1),new pe({color:16119280,roughness:.9}));n.rotation.x=-Math.PI/2,n.position.set(20,.003,-6),i.add(n);const s=new pe({color:5980976,roughness:.9}),r=new pe({color:4156202,roughness:.9});for(let a=0;a<14;a++){const c=-20+a*6+a%3*1.5,o=-30-a%4*4,l=new qe(new ee(.25,.35,3,8),s);l.position.set(c,1.5,o);const h=new qe(new kt(2.2+a%3*.5,12,10),r);h.position.set(c,4.2+a%2,o),i.add(l,h)}}function P_(){return pa(512,512,(i,e,t)=>{const n=i.createLinearGradient(0,0,e,0);n.addColorStop(0,"#8a5a36"),n.addColorStop(.5,"#9a6841"),n.addColorStop(1,"#84552f"),i.fillStyle=n,i.fillRect(0,0,e,t);for(let s=0;s<90;s++){const r=Math.random()*t;i.strokeStyle=`rgba(${Math.random()>.5?"60,35,18":"170,120,80"},${.08+Math.random()*.12})`,i.lineWidth=1+Math.random()*2,i.beginPath(),i.moveTo(0,r);for(let a=0;a<=e;a+=32)i.lineTo(a,r+Math.sin(a/60+s)*4);i.stroke()}})}function pa(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new bl(n);return s.colorSpace=hn,s.anisotropy=16,s}function D_(i,e=15,t){const s=document.createElement("canvas"),r=s.getContext("2d");r.font="800 64px Arial, sans-serif";const a=Math.ceil(r.measureText(i).width);s.width=a+36,s.height=88;const c=s.getContext("2d");c.fillStyle="rgba(255,255,255,0.92)",c.beginPath(),c.roundRect(0,0,s.width,s.height,18),c.fill(),c.strokeStyle="rgba(15,23,42,0.35)",c.lineWidth=3,c.stroke(),c.fillStyle="#0f172a",c.font="800 64px Arial, sans-serif",c.textAlign="center",c.textBaseline="middle",c.fillText(i,s.width/2,s.height/2+2);const o=new bl(s);o.colorSpace=hn;const l=new Fn(new xs({map:o,sizeAttenuation:!1,depthWrite:!1,transparent:!0,toneMapped:!1}));l.userData.screenPx=e,l.userData.aspect=s.width/s.height,l.userData.pairWith=t??null,l.userData.role="scale_label",l.renderOrder=6,l.raycast=()=>{};const h=e/700*.73;return l.scale.set(h*l.userData.aspect,h,1),l}const co=new L,ho=new L;function L_(i,e,t){const n=2*Math.tan(e.fov*Math.PI/180/2)/Math.max(1,t);i.traverse(s=>{const r=s.userData.screenPx;if(!r)return;const a=r*n;s.scale.set(a*s.userData.aspect,a,1);const c=s.userData.pairWith;if(!c)return;s.getWorldPosition(co).project(e),c.getWorldPosition(ho).project(e);const o=Math.abs(co.y-ho.y)*t/2+Math.abs(co.x-ho.x)*t/2;s.visible=o>r*1.25})}const I_={steel:()=>new pe({color:13094097,metalness:1,roughness:.28}),chrome:()=>new pe({color:15133164,metalness:1,roughness:.12}),brass:()=>new pe({color:13936715,metalness:1,roughness:.22}),castIron:()=>new pe({color:3099491,metalness:.4,roughness:.55}),blackPlastic:()=>new pe({color:1776928,roughness:.5}),glass:()=>new pe({color:16055039,metalness:0,roughness:.05,transparent:!0,opacity:.3,depthWrite:!1})},gt=(i=15857397)=>new fa({color:i,transparent:!0,opacity:.28,roughness:.05,metalness:0,clearcoat:1,clearcoatRoughness:.08,side:qt,depthWrite:!1}),xn=i=>new pe({color:i,roughness:.45,metalness:.15}),pt=(i=13094097)=>new pe({color:i,roughness:.28,metalness:1}),St=()=>new pe({color:15133164,roughness:.12,metalness:1}),Gn=()=>new pe({color:13936715,roughness:.22,metalness:1}),Ft=i=>new pe({color:i,roughness:.5,metalness:.05}),Yt=i=>new pe({color:i,roughness:.35,metalness:.1}),Vn=()=>new pe({color:10119233,roughness:.7}),Ye=(i,e,t,n=Math.min(i,e,t)*.12)=>new ya(i,e,t,3,n);function D(i,e,t=0,n=0,s=0){const r=new qe(i,e);return r.position.set(t,n,s),r}function Qt(i,e,t){const n=document.createElement("canvas");n.width=i,n.height=e,t(n.getContext("2d"),i,e);const s=new bl(n);return s.colorSpace=hn,s.anisotropy=16,s}function xi(i,e,t,n){const s=new $t;return s.add(D(new ee(.018,.022,.05,16),Gn(),0,.025,0)),s.add(D(new ee(.026,.026,.03,16),Ft(n),0,.06,0)),s.position.set(i,e,t),s}function Ln(i,e,t,n=.55){const s=e*.85,r=new qe(new ee(i*.9,i*.9,s,40),new pe({color:t,roughness:.1,metalness:0,transparent:!0,opacity:.8})),a=Math.max(.001,n);return r.scale.y=a,r.position.y=s*a/2,r.userData.role="liquid",r.userData.maxFillHeight=s,r}function Xr(i,e,t,n){const s=Qt(64,512,(a,c,o)=>{a.clearRect(0,0,c,o),a.fillStyle="#ffffff";const l=n*5;for(let h=1;h<=l;h++){const u=o-h/(l+1)*o;a.fillRect(0,u,h%5===0?44:24,h%5===0?4:2)}}),r=new qe(new ee(i*1.004,i*1.004,t,32,1,!0,-.35,.7),new ir({map:s,transparent:!0,depthWrite:!1,opacity:.85}));return r.position.y=e+t/2,r}function Yr(i){const e=Qt(512,112,n=>{n.fillStyle="rgba(15,23,42,0.82)",n.beginPath(),n.roundRect(4,12,504,88,44),n.fill(),n.fillStyle="#ffffff",n.font="bold 46px Arial",n.textAlign="center",n.textBaseline="middle",n.fillText(i,256,58)}),t=new Fn(new xs({map:e,depthTest:!1,transparent:!0}));return t.scale.set(.72,.158,1),t.renderOrder=10,t.userData.role="label",t.raycast=()=>{},t}function ih(i,e){return Qt(512,512,(t,n)=>{const s=n/2,r=n/2,a=n/2-6;t.fillStyle="#f8fafc",t.beginPath(),t.arc(s,r,a,0,Math.PI*2),t.fill();const c=Math.PI*.72,o=Math.PI*1.56;t.strokeStyle="#334155";for(let l=0;l<=50;l++){const h=c+l/50*o,u=l%10===0;t.lineWidth=u?4:1.5;const f=u?a-48:l%5===0?a-36:a-28;t.beginPath(),t.moveTo(s+Math.cos(h)*f,r+Math.sin(h)*f),t.lineTo(s+Math.cos(h)*(a-16),r+Math.sin(h)*(a-16)),t.stroke()}t.fillStyle="#0f172a",t.textAlign="center",t.textBaseline="middle";for(let l=0;l<=10;l++){const h=c+l/10*o;t.font=`900 ${l%5===0?50:36}px Arial, sans-serif`,t.fillText(String(l),s+Math.cos(h)*(a-82),r+Math.sin(h)*(a-82))}t.fillStyle=e,t.font="bold 84px serif",t.fillText(i,s,r+a*.42)})}function nu(i){return Qt(480,192,e=>{e.scale(3,3),e.fillStyle="rgba(21,128,61,0.92)",e.beginPath(),e.roundRect(0,8,160,48,12),e.fill(),e.fillStyle="#ffffff",e.font="bold 26px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(`${i}V`,80,32)})}function ma(i,e="#22c55e"){return Qt(600,270,t=>{t.scale(3,3),t.fillStyle="#0f172a",t.beginPath(),t.roundRect(0,0,200,90,10),t.fill(),t.fillStyle=e,t.font="bold 34px monospace",t.textAlign="center",t.textBaseline="middle",t.fillText(i,100,47)})}function sh(){return Qt(1024,160,(i,e,t)=>{i.fillStyle="#facc15",i.fillRect(0,0,e,t);const n=20,s=e-n*2,r=30;i.strokeStyle="#000000",i.fillStyle="#000000",i.lineWidth=2,i.font="bold 20px Arial",i.textAlign="center";for(let a=0;a<=r;a++){const c=n+a/r*s,o=a%5===0,l=o?55:30;i.lineWidth=o?3:1.5,i.beginPath(),i.moveTo(c,10),i.lineTo(c,10+l),i.stroke(),o&&i.fillText(String(a),c,100)}i.strokeStyle="#a16207",i.lineWidth=2,i.strokeRect(4,4,e-8,t-8)})}function N_(){return Qt(512,276,(i,e)=>{const t=e/2,n=e/2+10,s=e/2-10;i.fillStyle="rgba(251,146,60,0.96)",i.beginPath(),i.arc(t,n,s,Math.PI,Math.PI*2),i.closePath(),i.fill(),i.strokeStyle="#000000",i.lineWidth=3,i.stroke();for(let r=0;r<=180;r+=10){const a=Math.PI+r/180*Math.PI,c=r%30===0,o=c?s-26:s-14;i.lineWidth=c?3:1.5,i.beginPath(),i.moveTo(t+Math.cos(a)*o,n+Math.sin(a)*o),i.lineTo(t+Math.cos(a)*s,n+Math.sin(a)*s),i.stroke(),c&&(i.fillStyle="#000000",i.font="bold 16px Arial",i.textAlign="center",i.fillText(String(r),t+Math.cos(a)*(s-42),n+Math.sin(a)*(s-42)))}i.strokeStyle="#1d4ed8",i.lineWidth=2,i.beginPath(),i.moveTo(t-10,n),i.lineTo(t+10,n),i.moveTo(t,n-10),i.lineTo(t,n+2),i.stroke()})}const uo=["#1a1a1a","#7c4a1e","#dc2626","#f97316","#eab308","#16a34a","#2563eb","#7c3aed","#6b7280","#f8fafc"];function U_(i){const e=Math.max(1,Math.round(i||10)),t=String(e),n=parseInt(t[0]??"1",10),s=parseInt(t[1]??"0",10),r=Math.min(9,Math.max(0,t.length-2));return[uo[n],uo[s],uo[r],"#d4af37"]}class fo extends On{constructor(e,t,n){super(),this.length=e,this.radius=t,this.turns=n}getPoint(e,t=new L){const n=e*this.turns*Math.PI*2;return t.set(this.radius*Math.cos(n),(e-.5)*this.length,this.radius*Math.sin(n))}}function F_(i,e,t,n={}){const s=new $t;s.userData.objectKey=e,s.userData.objectType=i;const r=(...o)=>s.add(...o);switch(i){case"beaker":{const h=[new J(0,.004),new J(.301,.004),new J(.315,.03),new J(.33949999999999997,.58),new J(.357,.6),new J(.364,.612)];r(new qe(new Mi(h,48),gt()));const u=D(new In(.045,.07,3),gt(),.35*1,.6-.015,0);u.rotation.z=-Math.PI/2,r(u,Xr(.35*.95,.06,.6*.72,4),Ln(.35,.6,n.color||"#a9d6e5"));break}case"test_tube":{const h=D(new ee(.12,.12,.55,32,1,!0),gt(),0,.375),u=D(new kt(.12,32,16,0,Math.PI*2,0,Math.PI/2),gt(),0,.1);u.rotation.x=Math.PI;const f=D(new zt(.12*1.02,.012,10,32),gt(),0,.55+.1);f.rotation.x=Math.PI/2;const d=D(Ye(.34,.08,.34,.02),Vn(),0,.04);r(h,u,f,d,Ln(.12,.55,n.color||"#cfe8f3",.4));break}case"burette":{const h=D(new ee(.06,.06,1.1,32,1,!0),gt(),0,.7000000000000001),u=D(new ee(.06*1.25,.06*1.25,.1,24),gt(15660799),0,.1),f=D(Ye(.16,.03,.035,.012),Ft(1920728),.09,.1),d=D(new ee(.03,.01,.1,16,1,!0),gt(),0,.02),g=D(new ee(.2,.22,.04,32),Yt(3099491),0,.02);r(h,u,f,d,g,Xr(.06,.2,1.1*.85,10),Ln(.06,1.1,n.color||"#eaf6ff",.7));break}case"pipette":{const o=D(new ee(.018,.008,.3,16),gt(),0,.2),l=D(new kt(.055,24,16),gt(),0,.42);l.scale.y=1.8;const h=D(new ee(.018,.018,.3,16),gt(),0,.68),u=D(new zt(.02,.003,6,20),new ir({color:1120295}),0,.74);u.rotation.x=Math.PI/2;const f=D(new kt(.075,24,16),Ft(12131356),0,.9);f.scale.y=1.25;const d=D(Ye(.22,.07,.18,.02),Vn(),0,.035);r(o,l,h,u,f,d);break}case"measuring_cylinder":{const h=D(new ee(.18,.17099999999999999,.8,40,1,!0),gt(),0,.44),u=D(new ee(.18*1.6,.18*1.7,.05,6),gt(15266293),0,.025),f=D(new In(.035,.06,3),gt(),.18,.8+.03,0);f.rotation.z=-Math.PI/2,r(h,u,f,Xr(.18*.97,.12,.8*.8,5),Ln(.18,.8,n.color||"#cfe8f3",.5));break}case"bunsen_burner":{const o=new pe({color:1920728,roughness:.45,metalness:.2}),l=[new J(0,.005),new J(.27,.005),new J(.272,.018),new J(.2,.05),new J(.11,.1),new J(.075,.13),new J(0,.13)],h=new qe(new Mi(l,56),o),u=D(new ee(.068,.07,.11,36),o,0,.175),f=Qt(128,16,(_,w,P)=>{_.fillStyle="#d4d4d8",_.fillRect(0,0,w,P),_.fillStyle="#71717a";for(let N=0;N<w;N+=4)_.fillRect(N,0,1.5,P)});f.wrapS=ri,f.repeat.set(3,1);const d=D(new ee(.052,.052,.075,40),new pe({map:f,roughness:.3,metalness:1}),0,.268),g=D(new ee(.066,.066,.03,6),St(),0,.32),v=D(new ee(.06,.06,.012,40),St(),0,.341),m=D(new ee(.048,.048,.28,36,1,!0),St(),0,.485),p=D(new ee(.042,.042,.004,28),new pe({color:4144966,roughness:.8}),0,.6),y=D(new zt(.046,.004,8,32),St(),0,.625);y.rotation.x=Math.PI/2;const S=new $t,M=D(new ee(.032,.032,.2,24),St(),0,.1);S.add(M);for(let _=0;_<3;_++)S.add(D(new ee(.03,.036,.025,24),St(),0,.215+_*.03));S.add(D(new ee(.02,.02,.004,20),new pe({color:2565930}),0,.29)),S.rotation.z=Math.PI/2+.12,S.position.set(-.05,.16,0),r(h,u,d,g,v,m,p,y,S);const T=n.flame==="on",E=D(new In(.09,.3,24),new pe({color:16751933,emissive:16738816,emissiveIntensity:T?1:0,transparent:!0,opacity:T?.75:0,depthWrite:!1}),0,.77);E.userData.role="flame";const C=D(new In(.045,.16,16),new pe({color:6333946,emissive:2450411,emissiveIntensity:T?1.3:0,transparent:!0,opacity:T?.85:0,depthWrite:!1}),0,.7);C.userData.role="flame",r(E,C);break}case"thermometer":{const o=Qt(256,1690,(p,y,S)=>{p.fillStyle="#fbfbf8",p.fillRect(0,0,y,S),p.fillStyle="#0f172a",p.textAlign="left",p.textBaseline="middle";const M=S-250,T=S-400;for(let E=0;E<=100;E+=2){const C=M-E/100*T,_=E%10===0;p.fillRect(y-(_?90:50),C-(_?3:1.5),_?90:50,_?6:3),_&&(p.font=`900 ${E%50===0?62:52}px Arial, sans-serif`,p.fillText(String(E),10,C))}p.font="700 44px Arial, sans-serif",p.fillText("°C",14,M-T-70)}),l=D(Ye(.1,.66,.02,.008),new pe({map:o,roughness:.5}),0,.45,-.025),h=D(new ee(.022,.022,.62,24),gt(16777215),0,.45),u=D(new ee(.008,.008,.45,12),new pe({color:14427686,roughness:.2}),0,.32),f=D(new kt(.05,24,24),new pe({color:14427686,roughness:.2}),0,.1),d=D(new kt(.065,24,24),gt(16777215),0,.1),g=D(Ye(.26,.04,.2,.015),Yt(3099491),0,.02);r(l,h,u,f,d,g);const v=p=>.78-(1440-p*12.9)/1690*.66;let m;for(const p of[0,25,50,75,100]){const y=D_(`${p}°`,12,p%50===0?void 0:m);y.center.set(0,.5),y.position.set(.065,v(p),-.02),r(y),p%50===0&&(m=y)}break}case"battery":{const o=Qt(512,256,(g,v,m)=>{g.fillStyle="#111827",g.fillRect(0,0,v,m),g.fillStyle="#dc2626",g.fillRect(0,m*.62,v,m*.18),g.fillStyle="#fde68a",g.font="bold 96px Arial",g.textAlign="center",g.textBaseline="middle",g.fillText(`${n.voltage||6} V`,v/2,m*.34),g.fillStyle="#e5e7eb",g.font="bold 30px Arial",g.fillText("DC SUPPLY",v/2,m*.9)}),l=Ft(2042167),h=D(Ye(.6,.3,.3,.035),[l,l,l,l,new pe({map:o,roughness:.5}),l],0,.15),u=xi(.2,.3,0,14427686),f=xi(-.2,.3,0,1118481),d=new Fn(new xs({map:nu(n.voltage||6),depthTest:!1,transparent:!0}));d.scale.set(.34,.136,1),d.position.set(0,.58,0),d.renderOrder=9,d.userData.role="voltage",r(h,u,f,d);break}case"ruler":{const h=new pe({color:15381256,roughness:.6}),u=new pe({map:sh(),roughness:.55});r(D(new Bt(1.5,.015,.16),[h,h,u,h,h,h],0,.0075));break}case"bulb":{const o=n.state==="on",l=D(new kt(.18,32,32),new fa({color:16775656,transparent:!0,opacity:.35,roughness:.05,clearcoat:.8,emissive:o?16769126:0,emissiveIntensity:o?1.3:0,depthWrite:!1}),0,.37);l.userData.role="led";const h=D(new zt(.05,.006,8,24,Math.PI*1.7),new pe({color:4472892,emissive:o?16763989:0,emissiveIntensity:o?2:0}),0,.34);h.rotation.x=Math.PI/2,h.userData.role="led";const u=D(new ee(.095,.11,.16,24),Gn(),0,.12),f=new $t;for(let g=0;g<5;g++){const v=D(new zt(.1,.006,6,24),Gn(),0,.06+g*.028);v.rotation.x=Math.PI/2,f.add(v)}const d=D(Ye(.4,.04,.26,.015),Vn(),0,.02);r(l,h,u,f,d,xi(-.15,.04,.07,14427686),xi(.15,.04,.07,1118481));break}case"switch":{const o=D(Ye(.4,.06,.2,.012),Vn(),0,.03),l=D(new ee(.02,.02,.1,16),Gn(),-.12,.11),h=D(Ye(.05,.06,.05,.008),Gn(),.12,.09),u=D(new ee(.012,.012,.24,16),St()),f=n.state==="closed";u.position.set(f?0:-.06,.16,0),u.rotation.z=f?Math.PI/2-.35:Math.PI/2-.9,u.userData.role="lever",u.add(D(new kt(.028,16,12),Ft(1118481),0,-.13,0)),r(o,l,h,u);break}case"resistor":{const o=Qt(256,64,(g,v,m)=>{g.fillStyle="#d9c6a1",g.fillRect(0,0,v,m),U_(n.resistance_ohm).forEach((p,y)=>{g.fillStyle=p,g.fillRect(60+y*34+(y===3?22:0),0,16,m)})}),l=D(new ee(.07,.07,.32,32),new pe({map:o,roughness:.45}),0,.2);l.rotation.z=Math.PI/2;const h=D(new ee(.01,.01,.52,10),pt(13948120),0,.2);h.rotation.z=Math.PI/2;const u=D(Ye(.6,.04,.2,.012),Ft(15195332),0,.02),f=D(new ee(.012,.012,.16,10),pt(13948120),-.26,.12),d=f.clone();d.position.x=.26,r(l,h,u,f,d);break}case"ammeter":case"voltmeter":{const o=i==="ammeter",l=D(Ye(.42,.4,.18,.03),Yt(o?1981066:8330525),0,.2),h=D(new zt(.155,.015,12,48),St(),0,.2,.091),u=D(new Ii(.15,48),new pe({map:ih(o?"A":"V",o?"#1d4ed8":"#b91c1c"),roughness:.4}),0,.2,.092),f=D(new In(.012,.13,8),xn(14427686),.02,.2,.1);f.rotation.z=-Math.PI/2+.6,f.userData.role="needle";const d=D(new kt(.014,12,12),pt(2565930),0,.2,.1);r(l,h,u,f,d,xi(-.12,.4,0,14427686),xi(.12,.4,0,1118481));break}case"microscope":{const o=Yt(15659250),l=Yt(2040616);r(D(Ye(.36,.06,.47,.02),o,0,.03,-.05)),r(D(Ye(.1,.28,.1,.02),o,0,.19,-.22));const h=new Ih([new L(0,.27,-.23),new L(0,.55,-.23),new L(0,.74,-.14),new L(0,.8,-.03)]);r(new qe(new Oi(h,24,.044,12,!1),o));const u=D(new ee(.035,.035,.01,24),new pe({color:16775126,emissive:16436245,emissiveIntensity:0}),0,.105);u.userData.role="led",r(D(new ee(.045,.05,.05,24),l,0,.085),u),r(D(Ye(.3,.022,.28,.006),l,0,.32));for(const f of[-.08,.08])r(D(new Bt(.016,.004,.11),St(),f,.333,.03));r(D(new ee(.036,.036,.25,24),l,0,.7)),r(D(new ee(.025,.03,.11,24),l,0,.88)),r(D(new ee(.056,.06,.033,32),St(),0,.565)),[14427686,15381256,2450411].forEach((f,d)=>{const g=new $t;g.position.y=.55,g.rotation.y=2*Math.PI*d/3;const v=new $t;v.position.z=.03,v.rotation.x=.35,v.add(D(new ee(.015,.012,.07+d*.015,16),St(),0,-.04-d*.008)),v.add(D(new ee(.0158,.0158,.008,16),Ft(f),0,-.03)),g.add(v),r(g)});for(const f of[-1,1]){const d=D(new ee(.05,.05,.028,24),l,f*.08,.25,-.22);d.rotation.z=Math.PI/2;const g=D(new ee(.025,.025,.028,20),l,f*.11,.25,-.22);g.rotation.z=Math.PI/2,r(d,g)}break}case"lens":{const o=D(new kt(.22,40,40),gt(15988991),0,.42);o.scale.set(1,1,.22);const l=D(new zt(.22,.02,16,48),pt(10265519),0,.42),h=D(new ee(.015,.015,.2,12),pt(),0,.1),u=D(new ee(.12,.14,.03,32),Yt(3099491),0,.015);r(o,l,h,u);break}case"mirror":{const o=D(Ye(.4,.5,.02,.006),[pt(4674921),pt(4674921),pt(4674921),pt(4674921),new pe({color:16777215,metalness:1,roughness:.03}),pt(4674921)],0,.3,0),l=D(Ye(.36,.06,.12,.012),Vn(),0,.03,-.02);r(o,l);break}case"biological_model":{const o=D(new Bt(.5,.012,.18),gt(14742270),0,.006),l=D(new Bt(.14,.003,.14),gt(15857397),0,.014),h=D(new Ii(.045,32),new pe({color:8702998,roughness:.5,transparent:!0,opacity:.8}),0,.0135);h.rotation.x=-Math.PI/2;const u=D(new Bt(.12,.014,.17),Ft(16317180),-.18,.007);r(o,l,h,u);break}case"wire":{const o=new qe(new Oi(new fo(.12,.15,5),240,.012,8,!1),new pe({color:11817737,roughness:.3,metalness:1}));o.position.y=.08;const l=D(new ee(.135,.135,.14,24),Ft(3621201),0,.08);r(l,o);break}case"water_container":{const h=D(new ee(.255,.3,.75,48,1,!0),gt(),0,.375),u=D(new Ii(.3,48),gt(),0,.003);u.rotation.x=-Math.PI/2;const f=D(new zt(.14,.02,12,32,Math.PI*1.3),gt(),.3*.85,.75*.6);f.rotation.z=Math.PI/2,r(h,u,f,Ln(.3*.9,.75,n.color||"#a5d8ff",.8));break}case"specimen":{const o=n.length_cm??12,l=Math.max(.15,o*.05),h=D(new ee(.025,.025,l,24),pt(10265519),0,.025);h.rotation.z=Math.PI/2;const u=D(new kt(.025,16,16),pt(7434618),-l/2,.025),f=u.clone();f.position.x=l/2,r(h,u,f);break}case"balance":{const o=D(Ye(.55,.1,.42,.03),Yt(15067115),0,.05),l=D(new ee(.16,.16,.015,40),St(),0,.11,.02),h=D(new ee(.03,.03,.02,16),pt(),0,.1,.02),u=D(Ye(.3,.07,.05,.012),Ft(2042167),0,.07,.2),f=new Fn(new xs({map:ma("0.0 g"),depthTest:!1,transparent:!0}));f.scale.set(.3,.135,1),f.position.set(0,.24,.2),f.renderOrder=9,f.userData.role="balance_display",r(o,l,h,u,f);break}case"stopwatch":{const o=D(new ee(.13,.13,.045,48),Yt(2042167),0,.16);o.rotation.x=Math.PI/2;const l=D(new zt(.13,.01,10,48),St(),0,.16),h=D(new ee(.022,.022,.04,16),St(),0,.305),u=D(new zt(.025,.006,8,20),St(),0,.34),f=D(Ye(.18,.03,.12,.01),Ft(3621201),0,.015),d=new Fn(new xs({map:ma("00:00.0"),depthTest:!1,transparent:!0}));d.scale.set(.2,.09,1),d.position.set(0,.16,.03),d.renderOrder=9,d.userData.role="stopwatch_display",r(o,l,h,u,f,d);break}case"spring":{const o=n.natural_length_cm??15,l=n.max_safe_extension_cm??12,h=o*.05,u=(o+l*1.6)*.05,f=new qe(new Oi(new fo(u,.05,22),440,.007,6,!1),new pe({color:13094097,roughness:.25,metalness:1}));f.userData.role="spring_body",f.userData.naturalLengthUnits=h,f.userData.maxLengthUnits=u,f.scale.y=h/u,f.position.y=.85-u*f.scale.y/2;const d=D(new zt(.03,.008,8,20),pt(7434618),0,.85),g=D(new ee(.05,.05,.015,24),pt(5395035));g.userData.role="spring_hanger",g.position.y=.85-u*f.scale.y,r(f,d,g);break}case"retort_stand":{const o=Yt(3099491);r(D(Ye(.36,.035,.24,.012),o,0,.0175)),r(D(new ee(.016,.016,.95,20),pt(),-.13,.5)),r(D(Ye(.07,.07,.07,.01),o,-.13,.9));const l=D(new ee(.01,.01,.07,10),pt(),-.13,.9,.06);l.rotation.x=Math.PI/2;const h=D(new ee(.012,.012,.3,16),pt(),.03,.9);h.rotation.z=Math.PI/2,r(l,h,D(Ye(.04,.05,.05,.008),Gn(),.17,.9));break}case"mass_piece":{const o=n.mass_g??50,l=.05+Math.min(.05,o/4e3),h=.04+Math.min(.06,o/3e3),u=Qt(256,256,(d,g)=>{d.fillStyle="#4a525c",d.fillRect(0,0,g,g),d.fillStyle="#1f2328",d.beginPath(),d.arc(g/2,g/2,22,0,Math.PI*2),d.fill(),d.fillRect(g/2-9,g/2,18,g/2),d.fillStyle="#f1f5f9",d.font="bold 58px Arial",d.textAlign="center",d.textBaseline="middle",d.fillText(`${o}g`,g/2,g/2-62)}),f=Yt(4870748);f.metalness=.5,r(D(new ee(l,l,h,36),[f,new pe({map:u,metalness:.4,roughness:.5}),f],0,h/2));break}case"ray_box":{const o=n.state==="on",l=D(Ye(.35,.22,.28,.03),Yt(2042167),0,.11),h=D(new Bt(.2,.16,.012),Ft(988970),0,.11,.145),u=D(new Bt(.02,.12,.02),new pe({color:16639626,emissive:16096779,emissiveIntensity:o?1.4:0}),0,.11,.152);u.userData.role="led";const f=D(new ee(.012,.012,.3,10),Ft(1120295),0,.03,-.29);f.rotation.x=Math.PI/2,r(l,h,u,f);break}case"glass_block":{const o=(n.width_cm??5)*.05;r(D(Ye(o,.1,.55,.01),gt(14676223),0,.05));break}case"projectile_launcher":{const o=new pe({color:2962235,metalness:.6,roughness:.4});r(D(Ye(.5,.05,.36,.015),o,0,.025));for(const d of[-.09,.09])r(D(Ye(.1,.22,.02,.006),o,0,.14,d));const l=new $t;l.position.y=.22,l.rotation.z=Math.PI/4;const h=D(new ee(.05,.055,.45,28),new pe({color:1920728,metalness:.5,roughness:.35}),.17,0);h.rotation.z=-Math.PI/2;const u=D(new zt(.053,.011,12,28),St(),.39,0);u.rotation.y=Math.PI/2;const f=D(new ee(.018,.018,.22,16),pt());f.rotation.x=Math.PI/2,l.add(h,u,f),r(l);break}case"projectile":{r(D(new zt(.05,.012,10,28),Ft(3621201),0,.012)),r(D(new kt(.07,32,20),new pe({color:14427686,roughness:.35}),0,.07)),s.children[0].rotation.x=Math.PI/2;break}case"protractor":{const o=D(new ee(.28,.28,.008,48,1,!1,Math.PI,Math.PI),new pe({map:N_(),transparent:!0,opacity:.92,roughness:.3,side:qt}),0,.004);o.rotation.x=Math.PI/2,r(o);break}case"conical_flask":case"amber_conical_flask":{const o=i==="amber_conical_flask",l=.3,h=.62,u=.085,f=[new J(0,.004),new J(l*.96,.004),new J(l,.03),new J(u+.01,h*.7),new J(u,h*.76),new J(u,h-.02),new J(u+.012,h),new J(u+.012,h+.012)],d=o?new fa({color:11817737,transparent:!0,opacity:.62,roughness:.06,clearcoat:1,side:qt,depthWrite:!1}):gt();r(new qe(new Mi(f,56),d));const g=Qt(512,512,(S,M,T)=>{S.clearRect(0,0,M,T),S.fillStyle="#ffffff",S.strokeStyle="#ffffff",[[.78,"100"],[.5,"200"],[.3,"250"]].forEach(([C,_])=>{S.fillRect(M*.6,T*C,M*.13,5),S.font="bold 34px Arial",S.fillText(_,M*.76,T*C+12)}),S.fillRect(M*.63,T*.64,M*.07,4),S.font="bold 40px Arial",S.fillText("250 ml",M*.12,T*.52),S.fillRect(M*.14,T*.58,M*.2,T*.09),S.save(),S.translate(M*.56,T*.86),S.rotate(-Math.PI/2),S.font="bold 22px Arial",S.fillText("APPROX. VOL",0,0),S.restore()}),v=.03,m=h*.7,p=new qe(new Mi([new J(l*1.006,v),new J((u+.01)*1.006,m)],24,-.75,1.5),new ir({map:g,transparent:!0,depthWrite:!1,side:qt}));r(p);const y=new qe(new ee(.11,l*.94,h*.66,48),new pe({color:n.color||"#e0f2fe",roughness:.1,transparent:!0,opacity:.8}));y.userData.role="liquid",y.userData.maxFillHeight=h*.66,y.scale.y=.001,r(y);break}case"round_bottom_flask":{const o=D(new kt(.28,40,28),gt(),0,.36),l=D(new ee(.07,.07,.34,28,1,!0),gt(),0,.78),h=D(new zt(.2,.025,12,40),Ft(3621201),0,.05);h.rotation.x=Math.PI/2;const u=new $t;u.position.y=.14,u.add(Ln(.19,.5,n.color||"#e0f2fe",.001)),r(o,l,h,u);break}case"evaporating_dish":{const o=[new J(0,.01),new J(.12,.012),new J(.26,.09),new J(.3,.13)];r(new qe(new Mi(o,48),new pe({color:16317180,roughness:.25,side:qt})));const l=new $t;l.position.y=.012,l.add(Ln(.2,.13,n.color||"#bae6fd",.001)),r(l);break}case"tripod_stand":{const o=D(new zt(.3,.02,12,48),pt(5395035),0,.8);o.rotation.x=Math.PI/2,r(o);for(let l=0;l<3;l++){const h=l/3*Math.PI*2,u=D(new ee(.018,.018,.82,12),pt(5395035),Math.cos(h)*.34,.4,Math.sin(h)*.34);u.rotation.z=Math.cos(h)*-.08,u.rotation.x=Math.sin(h)*.08,r(u)}break}case"wire_gauze":{const o=Qt(256,256,(l,h,u)=>{l.fillStyle="#9ca3af",l.fillRect(0,0,h,u),l.strokeStyle="#4b5563",l.lineWidth=2;for(let f=0;f<h;f+=10)l.beginPath(),l.moveTo(f,0),l.lineTo(f,u),l.moveTo(0,f),l.lineTo(h,f),l.stroke();l.fillStyle="#f5f5f4",l.beginPath(),l.arc(h/2,u/2,h*.28,0,Math.PI*2),l.fill()});r(D(new Bt(.62,.008,.62),new pe({map:o,roughness:.6,metalness:.4}),0,.004));break}case"filter_funnel":{const o=D(new ee(.26,.03,.32,40,1,!0),gt(),0,.52),l=D(new ee(.025,.02,.32,20,1,!0),gt(),0,.2),h=D(new In(.22,.27,32,1,!0),new pe({color:16777215,roughness:.9,side:qt}),0,.53);h.rotation.x=Math.PI,r(o,l,h);break}case"test_tube_rack":{const o=D(Ye(.9,.04,.24,.01),Vn(),0,.3),l=D(Ye(.9,.04,.24,.01),Vn(),0,.02),h=D(Ye(.04,.3,.24,.01),Vn(),-.43,.16),u=h.clone();u.position.x=.43,r(o,l,h,u);const f=["#fca5a5","#bae6fd","#bbf7d0","#fde68a"];for(let d=0;d<4;d++){const g=-.3+d*.2;r(D(new ee(.055,.055,.42,20,1,!0),gt(),g,.25)),r(D(new ee(.05,.05,.12,20),new pe({color:f[d],transparent:!0,opacity:.8}),g,.12))}break}case"spatula":{const o=D(Ye(.32,.008,.05,.003),St(),.16,.006),l=D(new kt(.04,20,10,0,Math.PI*2,0,Math.PI/2),St(),-.18,.04);l.rotation.x=Math.PI;const h=D(new ee(.008,.008,.18,12),St(),-.06,.008);h.rotation.z=Math.PI/2,r(o,l,h);break}case"wash_bottle":{const o=D(new ee(.17,.18,.5,36),new pe({color:16317180,roughness:.35,transparent:!0,opacity:.55}),0,.25),l=D(new ee(.07,.09,.08,24),Ft(2450411),0,.54),h=D(new ee(.012,.012,.3,10),Ft(2450411),.08,.66);h.rotation.z=-.9,r(o,l,h,Ln(.16,.5,n.color||"#e0f2fe",.8));break}case"dropper":{const o=D(new ee(.02,.008,.36,16),gt(),0,.24),l=D(new kt(.045,20,14),Ft(1120295),0,.46);l.scale.y=1.6;const h=D(new ee(.1,.1,.22,28),new pe({color:9584654,roughness:.2,transparent:!0,opacity:.75}),.22,.11);r(o,l,h);break}case"crucible":{const o=[new J(0,.005),new J(.08,.005),new J(.13,.2),new J(.14,.21)],l=new pe({color:16119284,roughness:.3,side:qt});r(new qe(new Mi(o,40),l));const h=D(new ee(.15,.15,.015,40),l,.32,.008),u=D(new kt(.025,16,12),l,.32,.025);r(h,u);break}case"bar_magnet":{r(D(Ye(.3,.08,.1,.01),Yt(14427686),-.15,.04),D(Ye(.3,.08,.1,.01),Yt(1920728),.15,.04));const o=Yr("N");o.scale.set(.2,.044,1),o.position.set(-.22,.16,0);const l=Yr("S");l.scale.set(.2,.044,1),l.position.set(.22,.16,0),r(o,l);break}case"plotting_compass":{r(D(new ee(.12,.12,.04,40),Gn(),0,.02)),r(D(new ee(.105,.105,.002,40),new pe({color:16777215}),0,.041));const o=new $t,l=D(new In(.018,.09,4),xn(14427686),0,0,-.045);l.rotation.x=-Math.PI/2;const h=D(new In(.018,.09,4),xn(2042167),0,0,.045);h.rotation.x=Math.PI/2,o.add(l,h),o.position.y=.05,o.userData.role="needle",r(o,D(new ee(.11,.11,.012,40),gt(),0,.06));break}case"prism":{const o=new Zs;o.moveTo(-.22,0),o.lineTo(.22,0),o.lineTo(0,.38),o.closePath();const l=new ps(o,{depth:.22,bevelEnabled:!1});l.translate(0,0,-.11),r(new qe(l,gt(14742270)));break}case"rheostat":{const o=new pe({color:6054233,roughness:.75,metalness:.45}),l=new pe({color:14925716,roughness:.6}),h=new pe({color:1118481,roughness:.35}),u=.2,f=.79,d=Qt(64,64,(S,M,T)=>{S.fillStyle="#1a1a1a",S.fillRect(0,0,M,T);for(let E=0;E<T;E+=4)S.fillStyle="#3a3a3a",S.fillRect(0,E,M,1),S.fillStyle="#050505",S.fillRect(0,E+2,M,1)});d.wrapS=d.wrapT=ri,d.repeat.set(1,18);const g=D(new ee(.125,.125,1.24,48),new pe({map:d,roughness:.4,metalness:.6}),0,u);g.rotation.z=Math.PI/2,r(g);for(const S of[-1,1]){const M=D(new ee(.12,.12,.1,40),l,S*.67,u),T=D(new ee(.129,.129,.035,40),St(),S*.635,u),E=D(new ee(.1,.1,.05,32),o,S*.745,u);for(const P of[M,T,E])P.rotation.z=Math.PI/2;r(M,T,E);const C=new Zs;C.moveTo(-.17,0),C.lineTo(.17,0),C.lineTo(.09,.42),C.lineTo(-.09,.42),C.closePath();const _=new ps(C,{depth:.03,bevelEnabled:!0,bevelSize:.006,bevelThickness:.006,bevelSegments:2});_.translate(0,0,-.015);const w=new qe(_,o);w.rotation.y=Math.PI/2,w.position.x=S*f,r(w);for(const P of[-.2,.2]){const N=D(Ye(.1,.025,.09,.008),o,S*(f-S*.04),.0125,P),B=D(new ee(.018,.018,.027,16),new pe({color:2042167}),S*(f-S*.04),.0125,P);r(N,B)}r(D(Ye(.05,.03,.06,.006),St(),S*.6,u-.15,.06)),r(D(new ee(.014,.014,.02,12),pt(10265519),S*.6,u-.125,.06))}const v=(S,M,T,E)=>{const C=new $t,_=D(new ee(.012,.012,.04,12),Gn(),E*.02,0,0);_.rotation.z=Math.PI/2;const w=D(new ee(.03,.03,.06,18),h,E*.065,0,0);w.rotation.z=Math.PI/2;for(let P=0;P<9;P++){const N=D(new Bt(.06,.006,.006),h,E*.065,Math.cos(P*.7)*.03,Math.sin(P*.7)*.03);C.add(N)}return C.add(_,w),C.position.set(S,M,T),C};r(v(f+.02,.32,.03,1),v(f+.02,.1,.03,1),v(-f-.02,.2,.06,-1));const m=D(new ee(.012,.016,.05,12),Gn(),f+.04,.21,-.03);m.rotation.z=Math.PI/2,r(m),r(D(new Bt(f*2,.035,.035),St(),0,.395,-.02));const p=new $t,y=Qt(128,128,(S,M,T)=>{S.fillStyle="#111111",S.fillRect(0,0,M,T),S.fillStyle="#e5e7eb",S.font="bold 26px Arial",S.textAlign="center",S.save(),S.translate(30,T/2),S.rotate(-Math.PI/2),S.fillText("11",0,-4),S.fillText("5",0,22),S.restore()});p.add(D(Ye(.13,.08,.13,.015),[h,h,new pe({map:y,roughness:.35}),h,h,h],0,.41,-.01)),p.add(D(Ye(.12,.09,.05,.012),h,0,.34,.05));for(const S of[-.035,.025])p.add(D(new ee(.017,.017,.006,20),St(),.02,.453,S));p.position.x=.05,p.userData.role="slider",r(p);break}case"dry_cell":{const o=Qt(512,256,(v,m,p)=>{v.fillStyle="#d61f26",v.fillRect(0,0,m,p),v.fillStyle="#f5c518",v.fillRect(0,0,m,10),v.fillRect(0,p-10,m,10);const y=m*.25;v.textAlign="center",v.font="italic bold 40px Georgia",v.fillStyle="#fde68a",v.fillText("Power Cell",y,52),v.fillStyle="#f59e0b",v.beginPath(),v.arc(y,118,40,0,Math.PI*2),v.fill(),v.fillStyle="#7c2d12",v.font="bold 44px Arial",v.fillText("+",y,134),v.fillStyle="#fde68a",v.font="bold 22px Arial",v.fillText("SUPER QUALITY",y,190),v.fillStyle="#ffffff",v.font="bold 24px Arial",v.fillText("BATTERY",y,218),v.fillText("1.5V",y,242),v.fillStyle="#fde68a",v.font="bold 30px Arial",v.fillText("1.5V  DRY CELL",m*.75,p/2+10)});o.wrapS=ri,o.offset.x=.25;const l=.09,h=.32,u=D(new ee(l,l,h,48,1,!0),new pe({map:o,roughness:.35}),0,h/2+.006),f=D(new ee(l*.98,l*.98,.012,48),St(),0,h+.006),d=D(new ee(.03,.032,.025,24),St(),0,h+.024),g=D(new ee(l*.98,l*.98,.012,48),pt(10265519),0,.006);r(u,f,d,g);break}case"accumulator":{const o=Qt(1024,768,(p,y,S)=>{p.fillStyle="#f8fafc",p.fillRect(0,0,y,S),p.fillStyle="#1d4ed8",p.strokeStyle="#1d4ed8",p.textAlign="center",p.font="bold 44px Arial",p.fillText("UPPER LEVEL",y/2,70),p.fillRect(y*.08,90,y*.84,6),p.fillText("LOWER LEVEL",y/2,170),p.fillRect(y*.08,190,y*.84,6),p.fillRect(y*.06,250,y*.88,12),p.fillRect(y*.06,280,y*.4,300),p.fillStyle="#ffffff",p.font="bold 120px Arial",p.fillText("12V",y*.26,440),p.font="bold 34px Arial",p.fillText("LEAD-ACID",y*.26,520),p.fillStyle="#1d4ed8",p.font="bold 110px Arial",p.fillText("NS60",y*.7,400),p.font="bold 56px Arial",p.fillText("12V / 45AH",y*.7,480),p.font="bold 34px Arial",p.fillText("ACCUMULATOR",y*.7,545),p.fillRect(y*.06,600,y*.88,10)}),l=new pe({color:15857145,roughness:.55}),h=new pe({color:1920728,roughness:.4}),u=D(Ye(.9,.62,.55,.03),[l,l,l,l,new pe({map:o,roughness:.5}),l],0,.31),f=D(Ye(.94,.09,.59,.025),h,0,.665),d=D(Ye(.96,.03,.61,.01),h,0,.625),g=D(Ye(.16,.055,.03,.008),h,0,.66,.3);r(u,f,d,g);const v=new pe({color:16436245,roughness:.45});for(let p=0;p<6;p++){const y=-.35+p*.14;r(D(new ee(.045,.045,.02,24),h,y,.72,-.12)),r(D(new ee(.036,.04,.05,8),v,y,.75,-.12)),r(D(new ee(.026,.026,.012,16),v,y,.781,-.12))}const m=new pe({color:9146260,roughness:.5,metalness:.7});for(const[p,y]of[[-.38,"+"],[.38,"-"]]){r(D(new ee(.06,.06,.03,28),h,p,.725,.12)),r(D(new ee(.026,.032,.09,20),m,p,.785,.12));const S=Yr(y);S.scale.set(.16,.035,1),S.position.set(p,.86,.12),r(S)}break}case"metre_rule":{const o=new pe({color:14066524,roughness:.6}),l=new pe({map:sh(),color:16113331,roughness:.55});r(D(new Bt(5,.02,.2),[o,o,l,o,o,o],0,.01));break}case"galvanometer":{const o=D(Ye(.42,.3,.2,.03),Yt(1976635),0,.15),l=D(new Ii(.13,40,0,Math.PI),new pe({map:ih("G","#1d4ed8")}),0,.12,.101),h=D(new Bt(.006,.12,.004),xn(14427686),0,.18,.105);h.userData.role="needle",r(o,l,h,xi(-.12,.3,0,14427686),xi(.12,.3,0,1120295));break}case"tuning_fork":{const o=D(new Bt(.03,.4,.03),St(),-.04,.42),l=o.clone();l.position.x=.04;const h=D(new zt(.04,.015,10,20,Math.PI),St(),0,.22);h.rotation.z=Math.PI;const u=D(new ee(.015,.015,.14,12),St(),0,.12),f=D(Ye(.24,.05,.14,.01),Vn(),0,.025);r(o,l,h,u,f);break}case"pulley":{const o=D(new ee(.15,.15,.05,40),pt(10265519),0,.9);o.rotation.x=Math.PI/2;const l=D(new zt(.15,.015,10,40),Ft(3621201),0,.9),h=D(Ye(.06,.12,.08,.01),pt(5395035),0,1.08),u=D(new ee(.012,.012,1.1,12),pt(),-.3,.55),f=D(new ee(.01,.01,.3,12),pt(),-.15,1.08);f.rotation.z=Math.PI/2;const d=D(Ye(.36,.03,.24,.01),Yt(2042167),-.3,.015),g=D(new ee(.003,.003,.6,6),Ft(16119284),.15,.6);r(o,l,h,u,f,d,g,D(new ee(.05,.05,.1,20),Gn(),.15,.25));break}case"petri_dish":{r(D(new ee(.22,.22,.05,48,1,!0),gt(),0,.025)),r(D(new ee(.22,.22,.004,48),gt(),0,.002)),r(D(new ee(.21,.21,.02,48),new pe({color:n.color||"#fde68a",transparent:!0,opacity:.7,roughness:.3}),0,.012));for(let o=0;o<5;o++){const l=o*1.3,h=.05+o%3*.04;r(D(new ee(.02+o%2*.01,.02,.006,16),xn(16317180),Math.cos(l)*h,.025,Math.sin(l)*h))}break}case"hand_lens":{const o=D(new kt(.14,32,32),gt(15988991),0,.03);o.scale.set(1,.16,1);const l=D(new zt(.14,.018,12,48),Ft(1120295),0,.03);l.rotation.x=Math.PI/2;const h=D(Ye(.3,.035,.05,.012),Ft(1120295),.29,.03);r(o,l,h);break}case"scalpel":{const o=D(Ye(.32,.02,.035,.006),St(),0,.012),l=new Zs;l.moveTo(0,0),l.lineTo(.14,0),l.quadraticCurveTo(.12,.05,0,.04),l.closePath();const h=new qe(new ps(l,{depth:.003,bevelEnabled:!1}),St());h.rotation.x=-Math.PI/2,h.position.set(.16,.02,.02),r(o,h);break}case"forceps":{for(const o of[-1,1]){const l=D(Ye(.36,.012,.03,.004),St(),0,.012,o*.025);l.rotation.y=o*.07,r(l)}r(D(Ye(.05,.016,.08,.006),St(),-.18,.012));break}case"dissecting_tray":{r(D(Ye(.9,.08,.6,.03),Yt(2042167),0,.04)),r(D(new Bt(.82,.01,.52),new pe({color:1120295,roughness:.95}),0,.082));for(let o=0;o<4;o++)r(D(new ee(.006,.006,.06,8),St(),-.3+o*.2,.11,o%2?.18:-.18));break}case"specimen_bottle":{r(D(new ee(.16,.16,.5,36,1,!0),gt(),0,.25)),r(D(new ee(.17,.17,.06,36),Ft(1013358),0,.53)),r(D(new ee(.161,.161,.18,36,1,!0,-.6,1.2),new pe({color:16777215,roughness:.8,side:qt}),0,.3)),r(Ln(.16,.5,n.color||"#fef3c7",.6));break}case"potted_plant":{const o=D(new ee(.22,.16,.3,32),Yt(11817737),0,.15),l=D(new ee(.2,.2,.02,32),xn(4139549),0,.29),h=D(new ee(.015,.02,.5,10),xn(1409085),0,.54);r(o,l,h);const u=new pe({color:2278750,roughness:.5,side:qt});for(let f=0;f<6;f++){const d=D(new kt(.09,16,10),u,0,.42+f*.07);d.scale.set(1.4,.15,.6),d.rotation.y=f*2.1,d.position.x=Math.cos(f*2.1)*.08,d.position.z=-Math.sin(f*2.1)*.08,r(d)}break}case"soil_sieve":{const o=D(new ee(.4,.4,.14,48,1,!0),new pe({color:10576391,roughness:.6,side:qt}),0,.07),l=Qt(256,256,(u,f,d)=>{u.clearRect(0,0,f,d),u.strokeStyle="#6b7280",u.lineWidth=2;for(let g=0;g<f;g+=8)u.beginPath(),u.moveTo(g,0),u.lineTo(g,d),u.moveTo(0,g),u.lineTo(f,g),u.stroke()}),h=D(new Ii(.39,48),new pe({map:l,transparent:!0,metalness:.6,side:qt}),0,.03);h.rotation.x=-Math.PI/2,r(o,h);for(let u=0;u<14;u++){const f=u*2.4,d=u%4*.08;r(D(new wl(.025+u%3*.01),xn(7893356),Math.cos(f)*d,.05,Math.sin(f)*d))}break}case"rain_gauge":{const o=D(new ee(.2,.06,.16,36,1,!0),pt(13358561),0,1),l=D(new ee(.2,.2,.08,36,1,!0),pt(13358561),0,1.12),h=D(new ee(.1,.1,.9,32,1,!0),gt(),0,.47),u=D(new ee(.03,.01,.1,12),pt(5395035),0,.01);r(o,l,h,u,Xr(.1,.1,.75,5),Ln(.1,.9,n.color||"#bfdbfe",.001));break}case"watering_can":{const o=D(new ee(.22,.25,.42,36),Yt(1483594),0,.21),l=D(new ee(.025,.04,.6,16),Yt(1483594),.4,.4);l.rotation.z=-.95;const h=D(new ee(.07,.04,.06,20),pt(10265519),.64,.58);h.rotation.z=-.95;const u=D(new zt(.18,.022,10,32,Math.PI),Yt(1409085),0,.42);r(o,l,h,u,Ln(.21,.42,n.color||"#bfdbfe",.8));break}case"seed_tray":{r(D(Ye(.9,.12,.55,.02),Ft(1120295),0,.06)),r(D(new Bt(.84,.02,.49),xn(4139549),0,.115));for(let o=0;o<6;o++)for(let l=0;l<3;l++){const h=-.35+o*.14,u=-.15+l*.15;r(D(new ee(.004,.004,.08,6),xn(1483594),h,.16,u));const f=D(new kt(.022,10,8),xn(2278750),h,.2,u);f.scale.set(1.6,.3,.8),r(f)}break}case"garden_trowel":{const o=D(new kt(.12,24,12,0,Math.PI,0,Math.PI/2),pt(10265519),.16,.03);o.scale.set(1.6,.5,1),o.rotation.z=Math.PI/2;const l=D(new ee(.012,.012,.1,10),pt(),0,.03);l.rotation.z=Math.PI/2;const h=D(new ee(.03,.03,.24,16),Vn(),-.17,.03);h.rotation.z=Math.PI/2,r(o,l,h);break}case"hand_hoe":{const o=new $t,l=new pe({color:13213802,roughness:.6}),h=new pe({color:1842980,roughness:.45,metalness:.6}),u=D(new ee(.03,.034,1.6,20),l,.85,0);u.rotation.z=Math.PI/2;const f=D(new ee(.05,.05,.14,24),h,.05,0);f.rotation.z=Math.PI/2;const d=D(Ye(.05,.14,.05,.01),h,0,-.09),g=new Zs;g.moveTo(-.07,0),g.lineTo(.07,0),g.lineTo(.14,-.34),g.lineTo(-.14,-.34),g.closePath();const v=new ps(g,{depth:.014,bevelEnabled:!1}),m=new qe(v,new pe({color:5991296,roughness:.3,metalness:.8}));m.rotation.y=Math.PI/2,m.position.set(-.007,-.14,0);const p=D(new Bt(.016,.04,.28),new pe({color:15067115,roughness:.2,metalness:1}),0,-.46);o.add(u,f,d,m,p),o.rotation.z=.4,o.position.set(-.55,.44,0),r(o);break}case"fork_hoe":{const o=new $t,l=new pe({color:14729103,roughness:.55}),h=new pe({color:2303531,roughness:.5,metalness:.6}),u=D(new ee(.045,.036,1.3,20),l,.72,0);u.rotation.z=Math.PI/2;const f=D(Ye(.16,.11,.11,.012),h,.06,0),d=D(Ye(.03,.09,.08,.006),St(),.16,0),g=D(Ye(.05,.05,.24,.01),h,0,-.07);o.add(u,f,d,g);for(const v of[-.09,0,.09]){const m=D(Ye(.04,.5,.025,.008),h,0,-.33,v),p=D(new In(.016,.07,4),new pe({color:11844032,roughness:.25,metalness:1}),0,-.61,v);p.rotation.z=Math.PI,o.add(m,p)}o.rotation.z=Math.PI/2+.22,o.position.set(-.2,.08,0),r(o);break}case"soil_auger":{const o=D(new ee(.02,.02,1.2,12),pt(7041664),0,.75),l=D(new ee(.025,.025,.5,12),pt(7041664),0,1.35);l.rotation.z=Math.PI/2;const h=new qe(new Oi(new fo(.3,.05,4),200,.012,6,!1),pt(10265519));h.position.y=.15,r(o,l,h,D(new ee(.25,.25,.04,32),xn(5978660),0,.02));break}case"soil_sample":{r(D(Ye(.7,.08,.45,.02),Ft(13948120),0,.04)),[5978660,10119999,12755563].forEach((l,h)=>{const u=D(new kt(.11,20,12,0,Math.PI*2,0,Math.PI/2),new pe({color:l,roughness:1}),-.22+h*.22,.08);u.scale.y=.55,r(u)});break}case"safety_goggles":{for(const o of[-1,1]){const l=D(new kt(.085,24,16),new pe({color:12573694,transparent:!0,opacity:.45,roughness:.05}),o*.1,.08);l.scale.z=.5;const h=D(new zt(.085,.014,10,32),Ft(1013358),o*.1,.08);r(l,h)}r(D(new zt(.2,.012,8,40,Math.PI),Ft(1120295),0,.08,-.08)),s.children[s.children.length-1].rotation.x=Math.PI/2;break}case"crucible_tongs":{for(const o of[-1,1]){const l=D(new ee(.01,.01,.5,10),pt(7041664),0,.015,o*.03);l.rotation.z=Math.PI/2,l.rotation.y=o*.08,r(l)}r(D(new zt(.03,.008,8,20),pt(7041664),.26,.015));break}case"heat_proof_mat":{r(D(Ye(.8,.03,.8,.01),new pe({color:15197668,roughness:.95}),0,.015));break}default:r(D(Ye(.3,.3,.3,.03),xn(10265519),0,.15))}s.traverse(o=>{o instanceof qe&&(o.castShadow=!0,o.receiveShadow=!0)});const a=new Kn;s.children.forEach(o=>{o instanceof Fn||a.expandByObject(o)});const c=Yr(t);return c.position.y=(a.isEmpty()?.4:a.max.y)+.22,s.add(c),s}function rh(i,e){const t=i.clone().setY(i.y+.15),n=e.clone().setY(e.y+.15),s=t.clone().lerp(n,.5);s.y+=.15+t.distanceTo(n)*.12;const r=new qe(new Oi(new Rl(t,s,n),32,.014,8,!1),new pe({color:14427686,roughness:.45}));return r.castShadow=!0,r.userData.role="connection",r}const O_={class:"relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900"},B_={key:0,class:"w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6"},z_={class:"space-y-1"},k_=["onClick"],V_={class:"truncate"},G_={key:3,class:"absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto"},H_={class:"flex items-center justify-between gap-2 mb-2"},W_={class:"text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate"},X_={class:"flex flex-wrap gap-1.5"},Y_=["onClick"],q_={key:0,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Z_={class:"flex items-center gap-2"},K_={class:"flex-1 text-lg font-bold text-gray-900 dark:text-white"},J_={class:"text-xs font-medium text-gray-400 ml-1"},$_={key:1,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Q_={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},j_=["max"],ev={key:2,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},tv={class:"flex flex-wrap gap-1.5"},nv=["onClick"],iv={key:3,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},sv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},rv={key:4,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5"},av={key:0,class:"text-[11px] text-amber-600 dark:text-amber-400"},ov={class:"flex gap-1.5"},lv=["onClick"],cv={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},hv=["value"],uv={class:"flex items-center justify-between"},fv={class:"flex gap-1.5"},dv={key:0,class:"pt-1"},pv={class:"relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black"},mv={class:"text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize"},gv={key:5,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},_v={class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},vv={key:0,class:"text-[11px] text-red-500 dark:text-red-400 mt-1"},xv={key:6,class:"mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"},Mv={class:"flex flex-wrap gap-1.5"},yv={key:4,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]"},Sv={class:"text-center"},bv={class:"flex items-center gap-2 flex-shrink-0"},Ev={key:5,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5"},wv={class:"text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2"},Tv={class:"text-lg font-bold text-gray-900 dark:text-white mb-1"},Av=["max"],Rv={key:0,class:"absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]"},Cv={key:6,class:"absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3"},Pv={class:"flex items-start justify-between gap-2"},Dv={class:"text-xs text-gray-700 dark:text-gray-200"},Lv=.9,ah=5,Ov=iu({__name:"VirtualLabScene",props:{sceneObjects:{},objectCatalog:{},connections:{},readOnly:{type:Boolean},fixedView:{type:Boolean}},emits:["action"],setup(i,{expose:e,emit:t}){const n=i,s=t,r=xt(null),a=xt(!1);let c,o,l,h;const u=new Map,f=new fd,d=new J,g=new ni(new L(0,1,0),0),v=xt(null),m=xt(null),p=xt(null),y=xt(null);let S=!1,M=0;const T={move:"Move",rotate:"Rotate",connect:"Connect",pour:"Pour",heat:"Heat",measure:"Measure",switch_on:"Switch On",switch_off:"Switch Off",zoom:"Zoom",inspect:"Inspect",acknowledge:"Acknowledge",focus_coarse:"Coarse Focus",focus_fine:"Fine Focus",select_objective:"Select Lens"},E=R=>{if(P.value==="stopwatch"){if(R==="switch_on")return"Start";if(R==="switch_off")return"Stop";if(R==="measure")return"Read Time"}if(P.value==="microscope"){if(R==="switch_on")return"Light On";if(R==="switch_off")return"Light Off";if(R==="inspect")return"Observe"}return T[R]||R},C=()=>new Map(n.objectCatalog.map(R=>[R.object_type,R])),_=xt([]),w=xt(""),P=xt(null),N=xt(null),B=["beaker","test_tube","burette","measuring_cylinder","water_container","conical_flask","amber_conical_flask","round_bottom_flask","evaporating_dish","wash_bottle","specimen_bottle","rain_gauge","watering_can"],Q=["battery","dry_cell","accumulator"],j=["water_container","burette","wash_bottle","watering_can"],z=new Map,Z=new Map,X=new Map,re=new Map,de=xt([...n.connections||[]]),me=xt(null),ge=xt(null),Se=xt(""),rt=xt(0),Et=xt(100),st=xt(null),ne=xt(!1),ve=xt(null),he=xt(null),Ne=xt(null),Je=new Map,Ge=new Map,mt=new Map,je=xt(50),oe=xt(40),ue=xt("very_blurred"),fe=xt(!1),Te=xt(!1),Me=new Map,Ze=new Map,Oe=new Map,et=xt(0),it=xt(0),F=xt(!1);let yt=[];const dt={very_blurred:10,blurred:5,almost_focused:2,focused:0};function A(R){he.value=R,st.value="protractor",m.value="measure"}const x=xt(null),V=xt([]);function Y(R){const I=C().get(R.object_type),U={...(I==null?void 0:I.default_props)||{},...R.props||{}},H=F_(R.object_type,R.key,(I==null?void 0:I.display_name)||R.object_type,U);if(H.position.set(R.position.x,R.position.y,R.position.z),R.rotation&&(H.rotation.y=R.rotation.y),o.add(H),u.set(R.key,H),B.includes(R.object_type)){const G=xe(R.object_type,U);z.set(R.key,G),$(R.key,G/Number(U.capacity_ml??250))}Q.includes(R.object_type)&&Z.set(R.key,Number(U.voltage??6))}function te(R){if(n.readOnly)return;const I=V.value.findIndex(H=>H.key===R);if(I===-1)return;const U=V.value[I];Y(U),V.value.splice(I,1),s("action",{objectKey:R,action:"move",value:R})}function ae(R){const I=n.sceneObjects.find(H=>H.key===R);if(!I)return{};const U=C().get(I.object_type);return{...(U==null?void 0:U.default_props)||{},...I.props||{}}}function xe(R,I){return I.current_volume!==void 0?Number(I.current_volume):j.includes(R)?Number(I.capacity_ml??50):0}function $(R,I){const U=u.get(R);if(!U)return;const H=Math.max(.001,Math.min(1,I));U.traverse(G=>{if(G instanceof qe&&G.userData.role==="liquid"){const ce=G.userData.maxFillHeight;G.scale.y=H,G.position.y=ce*H/2}})}function se(R){const I=new Set([R]),U=[R];for(;U.length;){const H=U.shift();de.value.forEach(G=>{G.from===H&&!I.has(G.to)&&(I.add(G.to),U.push(G.to)),G.to===H&&!I.has(G.from)&&(I.add(G.from),U.push(G.from))})}return I}function we(R){const I=n.sceneObjects.find(nn=>Q.includes(nn.object_type)),U=n.sceneObjects.find(nn=>nn.object_type==="switch"),H=n.sceneObjects.find(nn=>nn.object_type==="resistor"),G=n.sceneObjects.find(nn=>nn.key===R);if(!G)return{value:0,reason:null};if(!I||!U||!H)return{value:0,reason:"The circuit is incomplete. Check your connections."};const ce=se(I.key),_e=ce.has(U.key),Ve=ce.has(H.key),nt=ce.has(R),Qe=X.get(U.key)==="on";if(_e&&Qe&&!Ve)return{value:0,reason:"Short circuit! Connect a resistor into the circuit before closing the switch."};if(!_e||!Ve)return{value:0,reason:"The circuit is incomplete. Check your connections."};if((X.get(I.key)??"on")==="off")return{value:0,reason:"Switch on the power supply."};if(!Qe)return{value:0,reason:"Close the switch before taking the reading."};if(!nt)return G.object_type==="ammeter"?{value:0,reason:"The ammeter should be connected in series with the circuit."}:G.object_type==="voltmeter"?{value:0,reason:"The voltmeter should be connected in parallel across the component being measured."}:{value:0,reason:"Check the circuit arrangement."};const Rt=Z.get(I.key)??ae(I.key).voltage??6,ot=ae(H.key).resistance_ohm??10,bt=Rt/ot;return G.object_type==="ammeter"?{value:Math.round(bt*100)/100,reason:null}:G.object_type==="voltmeter"?{value:Rt,reason:null}:{value:0,reason:null}}function He(R){const I=re.get(R);if(!I)return 25;const U=(Date.now()-I)/1e3;return Math.min(100,Math.round(25+U*3.5))}function Ae(R,I){const U=u.get(R),H=u.get(I);if(!U||!H)return{ok:!1};if(U.position.distanceTo(H.position)>Lv)return{ok:!1};const G=Ze.has(I)?Number(ae(I).natural_length_cm??15)+(Ze.get(I)??0):ae(I).length_cm??ae(I).natural_length_cm??10,ce=(Math.random()-.5)*.2;return{ok:!0,value:Math.round((G+ce)*10)/10}}function be(R){const I=Je.get(R);if(!I)return"very_blurred";const U=Number(ae(I).optimal_focus??50),H=Number(ae(I).focus_tolerance??6),G=mt.get(R)??40,ce=H*(40/G),_e=Ge.get(R)??0,Ve=Math.abs(_e-U);return Ve<=ce?"focused":Ve<=ce*2?"almost_focused":Ve<=ce*4?"blurred":"very_blurred"}function Be(R){v.value===R&&(je.value=Ge.get(R)??50,oe.value=mt.get(R)??40,fe.value=X.get(R)==="on",Te.value=Je.has(R),ue.value=be(R))}function $e(R){v.value&&(mt.set(v.value,R),s("action",{objectKey:v.value,action:"select_objective",value:String(R)}),Be(v.value))}function lt(R){v.value&&(Ge.set(v.value,R),s("action",{objectKey:v.value,action:"focus_coarse",value:String(Math.round(R))}),Be(v.value))}function O(R){if(!v.value)return;const I=v.value,U=Math.max(0,Math.min(100,(Ge.get(I)??50)+R));Ge.set(I,U),s("action",{objectKey:I,action:"focus_fine",value:String(U)}),Be(I)}function ye(R){const U=[...Me.get(R)??new Set].reduce((Rt,ot)=>Rt+Number(ae(ot).mass_g??0),0),H=Number(ae(R).spring_constant_n_per_m??40),ce=U/1e3*9.8/H*100,_e=Number(ae(R).max_safe_extension_cm??12),Ve=Oe.get(R)??0,nt=ce>_e;nt&&Ve===0&&Oe.set(R,(ce-_e)*.3);const Qe=ce+(Oe.get(R)??0);return Ze.set(R,Math.round(Qe*100)/100),ie(R,Qe),v.value===R&&(it.value=U,et.value=Math.round(Qe*100)/100,F.value=nt),{totalMassG:U,exceeded:nt}}function ie(R,I){const U=u.get(R);U&&U.traverse(H=>{if(H instanceof qe&&H.userData.role==="spring_body"){const G=H.userData.naturalLengthUnits,ce=H.userData.maxLengthUnits,_e=Math.min(ce,G+Math.max(0,I)*.05);H.scale.y=_e/ce,H.position.y=.85-ce*H.scale.y/2}if(H.userData.role==="spring_hanger"){const G=[...U.children].find(ce=>ce.userData.role==="spring_body");G&&(H.position.y=.85-G.userData.maxLengthUnits*G.scale.y)}})}function Ee(R){return new L(Math.sin(R),0,Math.cos(R))}function Pe(R,I){return R.clone().sub(I.clone().multiplyScalar(2*R.dot(I)))}function le(R,I,U,H){let G=I.clone(),ce=-G.dot(R);ce<0&&(ce=-ce,G=G.clone().negate());const _e=U/H,Ve=_e*_e*(1-ce*ce);if(Ve>1)return null;const nt=Math.sqrt(1-Ve);return R.clone().multiplyScalar(_e).add(G.clone().multiplyScalar(_e*ce-nt))}function ze(R,I){const U=u.get(R),H=u.get(I);if(!U||!H)return null;const G=U.position.clone(),ce=Ee(U.rotation.y),_e=Ee(H.rotation.y),Ve=ce.dot(_e);if(Math.abs(Ve)<.001)return null;const nt=H.position.clone().sub(G).dot(_e)/Ve;if(nt<=.05)return null;const Qe=G.clone().add(ce.clone().multiplyScalar(nt));return Qe.distanceTo(H.position)>.35?null:{point:Qe,normal:_e,incidentDir:ce}}function Ue(){yt.forEach(R=>{o.remove(R),R instanceof qe&&(R.geometry.dispose(),R.material.dispose())}),yt=[]}function Dt(R,I,U){const H=R.clone().add(I).multiplyScalar(.5),G=Math.max(.01,R.distanceTo(I)),ce=new qe(new ee(.006,.006,G,8),new pe({color:U,emissive:U,emissiveIntensity:.4,roughness:.4}));ce.position.copy(H);const _e=I.clone().sub(R).normalize();return ce.quaternion.copy(new ui().setFromUnitVectors(new L(0,1,0),_e)),ce}function wt(){Ue();const R=n.sceneObjects.find(nt=>nt.object_type==="ray_box"),I=n.sceneObjects.find(nt=>nt.object_type==="mirror"),U=n.sceneObjects.find(nt=>nt.object_type==="glass_block"),H=I||U;if(!R||!H||X.get(R.key)!=="on")return;const G=ze(R.key,H.key);if(!G)return;const ce=u.get(R.key),_e=Dt(ce.position,G.point,16498468),Ve=Dt(G.point.clone().sub(G.normal.clone().multiplyScalar(.01)),G.point.clone().add(G.normal.clone().multiplyScalar(.4)),9741240);if(o.add(_e,Ve),yt.push(_e,Ve),I){const nt=Pe(G.incidentDir,G.normal),Qe=Dt(G.point,G.point.clone().add(nt.multiplyScalar(1.2)),16498468);o.add(Qe),yt.push(Qe)}else if(U){const nt=Number(ae(U.key).refractive_index??1.5),Qe=le(G.incidentDir,G.normal,1,nt);if(Qe){const Rt=G.point.clone().add(Qe.clone().multiplyScalar(.4)),ot=Dt(G.point,Rt,6333946),bt=Dt(Rt,Rt.clone().add(G.incidentDir.clone().multiplyScalar(1)),16498468);o.add(ot,bt),yt.push(ot,bt)}}}function Sn(R,I,U){const H=n.sceneObjects.find(Rt=>Rt.object_type==="ray_box");if(!H)return{ok:!1};const G=ze(H.key,I);if(!G)return{ok:!1};const ce=u.get(R);if(!ce||ce.position.distanceTo(G.point)>.4)return{ok:!1};let _e;if(U==="incidence")_e=G.incidentDir.clone().negate();else{const Rt=n.sceneObjects.find(ot=>ot.key===I);if((Rt==null?void 0:Rt.object_type)==="glass_block"){const ot=Number(ae(I).refractive_index??1.5),bt=le(G.incidentDir,G.normal,1,ot);if(!bt)return{ok:!1};_e=bt}else _e=Pe(G.incidentDir,G.normal)}const Ve=Math.abs(_e.normalize().dot(G.normal)),nt=Math.acos(Math.min(1,Math.max(-1,Ve)))*180/Math.PI,Qe=(Math.random()-.5)*.6;return{ok:!0,value:Math.round((nt+Qe)*10)/10}}const an=new Map,Vi=new Map;function or(R){const I=u.get(R);if(!I)return;const U=an.get(R),H=U?Number(ae(U).mass_g??0):0;I.traverse(G=>{var ce;if(G instanceof Fn&&G.userData.role==="balance_display"){const _e=G.material;(ce=_e.map)==null||ce.dispose(),_e.map=ma(`${H.toFixed(1)} g`),_e.needsUpdate=!0}})}const Bn=new Map,Ti=new Map,As=new Map,Rs=xt("00:00.0");function Cs(R){const I=Math.max(0,R)/1e3,U=Math.floor(I/60).toString().padStart(2,"0"),H=(I%60).toFixed(1).padStart(4,"0");return`${U}:${H}`}function An(R){const I=As.get(R)??0;return Bn.get(R)?I+(Date.now()-(Ti.get(R)??Date.now())):I}function Ai(R){const I=u.get(R),U=An(R);v.value===R&&(Rs.value=Cs(U)),I&&I.traverse(H=>{var G;if(H instanceof Fn&&H.userData.role==="stopwatch_display"){const ce=H.material;(G=ce.map)==null||G.dispose(),ce.map=ma(Cs(U)),ce.needsUpdate=!0}})}function lr(R){Bn.set(R,!1),As.set(R,0),Ti.delete(R),Ai(R)}function Ps(R){u.forEach((I,U)=>{I.traverse(H=>{if(!(H instanceof qe)||H.userData.role==="flame"||H.userData.role==="led")return;(Array.isArray(H.material)?H.material:[H.material]).forEach(ce=>{ce instanceof pe&&(ce.emissive.setHex(U===R?2282478:0),ce.emissiveIntensity=U===R?.3:0)})})})}function Gi(R){v.value=R,y.value=null,p.value=null;const I=n.sceneObjects.find(H=>H.key===R),U=I?C().get(I.object_type):null;_.value=(U==null?void 0:U.supported_actions)??[],w.value=(U==null?void 0:U.display_name)??R,P.value=(I==null?void 0:I.object_type)??null,N.value=(I==null?void 0:I.object_type)==="battery"?Z.get(R)??ae(R).voltage??6:null,(I==null?void 0:I.object_type)==="microscope"&&Be(R),(I==null?void 0:I.object_type)==="spring"&&ye(R),Ps(R)}function Hi(){v.value=null,y.value=null,me.value=null,P.value=null,Ps(null)}function Wi(R){if(!v.value)return;N.value=R,Z.set(v.value,R);const I=u.get(v.value);I&&I.traverse(U=>{var H;if(U instanceof Fn&&U.userData.role==="voltage"){const G=U.material;(H=G.map)==null||H.dispose(),G.map=nu(R),G.needsUpdate=!0}})}function cr(R){const I=n.sceneObjects.find(H=>H.key===R);if(!I)return;const U=I.object_type;if(ne.value=!1,ve.value=R,B.includes(U)){me.value="readonly",Se.value="ml",ge.value=Math.round(z.get(R)??0),y.value=R;return}if(U==="ammeter"||U==="voltmeter"){const H=we(R);H.reason&&(Ne.value=H.reason,setTimeout(()=>{Ne.value=null},4e3)),me.value="readonly",Se.value=U==="ammeter"?"A":"V",ge.value=H.value,y.value=R,ne.value=!!H.reason&&H.reason.includes("Short circuit");return}if(U==="balance"){me.value="readonly",Se.value="g";const H=an.get(R);ge.value=H?Number(ae(H).mass_g??0):0,y.value=R;return}if(U==="stopwatch"){me.value="readonly",Se.value="s",ge.value=Math.round(An(R)/100)/10,y.value=R;return}if(U==="spring"){me.value="readonly",Se.value="cm";const H=Number(ae(R).natural_length_cm??15);ge.value=Math.round((H+(Ze.get(R)??0))*10)/10,y.value=R,ve.value=R;return}if(U==="protractor"){he.value="incidence",st.value="protractor",m.value="measure";return}if(U==="ruler"||U==="metre_rule"||U==="thermometer"){st.value=U==="thermometer"?"thermometer":"ruler",m.value="measure";return}me.value="slider",Se.value="ml",Et.value=Number(ae(R).capacity_ml??100),rt.value=Math.round(Et.value/2),y.value=R}function hr(R){if(v.value&&!n.readOnly&&!(R==="focus_coarse"||R==="focus_fine"||R==="select_objective")){if(R==="inspect"){const I=n.sceneObjects.find(ce=>ce.key===v.value),U=I?C().get(I.object_type):null;let H=(U==null?void 0:U.description)||"No further detail available.",G=null;if(P.value==="microscope"){const ce=v.value,_e=Je.get(ce),Ve=mt.get(ce)??40;if(!_e)H="Place a specimen slide on the stage first.";else if(X.get(ce)!=="on")H="Switch on the illumination to see anything through the eyepiece.";else{const nt=be(ce),Qe=ae(_e).expected_structures||"the specimen";nt==="focused"?H=`At ×${Ve}, clearly focused - you can see ${Qe}.`:nt==="almost_focused"?H=`At ×${Ve}, almost in focus - fine-tune the focus a little more.`:nt==="blurred"?H=`At ×${Ve}, blurred - adjust the coarse and fine focus.`:H=`At ×${Ve}, very blurred - use the focus knobs before observing.`,G=nt}}p.value=H,s("action",{objectKey:v.value,action:R,value:G});return}if(R==="zoom"){b(v.value),s("action",{objectKey:v.value,action:R,value:null});return}if(R==="switch_on"||R==="switch_off"){X.set(v.value,R==="switch_on"?"on":"off"),P.value==="stopwatch"&&(R==="switch_on"&&!Bn.get(v.value)?(Bn.set(v.value,!0),Ti.set(v.value,Date.now())):R==="switch_off"&&Bn.get(v.value)&&(As.set(v.value,An(v.value)),Bn.set(v.value,!1)),Ai(v.value)),P.value==="microscope"&&Be(v.value),P.value==="ray_box"&&wt(),s("action",{objectKey:v.value,action:R,value:null});return}if(R==="measure"){cr(v.value);return}if(R==="connect"||R==="pour"||R==="heat"||R==="move"||R==="rotate"){m.value=R,h.enabled=R!=="move"&&R!=="rotate";return}}}const Rn=xt("");qr(m,R=>{R==="connect"?Rn.value="Click the object to connect to.":R==="pour"?Rn.value="Click the container to pour into.":R==="heat"?Rn.value="Click the object to place over the flame.":R==="move"?Rn.value="Drag the object to reposition it, then click Done.":R==="rotate"?Rn.value="Drag left/right to rotate, then click Done.":R==="measure"&&st.value==="ruler"?Rn.value="Click the object to measure - place the ruler close to it first.":R==="measure"&&st.value==="thermometer"?Rn.value="Click the substance to take a temperature reading.":R==="measure"&&st.value==="protractor"&&(Rn.value="Click the mirror or glass block - centre the protractor on the ray first.")});function ur(){if(!y.value)return;const R=me.value==="slider"?String(Math.round(rt.value)):ge.value!==null?String(ge.value):null;s("action",{objectKey:y.value,action:"measure",value:R,unit:Se.value,label:w.value,safetyIssue:ne.value,targetObjectKey:ve.value}),y.value=null,me.value=null,ge.value=null,ne.value=!1,he.value=null}function Sa(){if(x.value){at();return}m.value=null,st.value=null,he.value=null,h.enabled=!0}function ba(){var R,I,U;if(!(!v.value||!m.value)){if(m.value==="move"){const H=u.get(v.value);let G=null;H&&u.forEach((ot,bt)=>{bt!==v.value&&ot.position.distanceTo(H.position)<.6&&(G=bt)});const ce=v.value;an.forEach((ot,bt)=>{ot===ce&&bt!==G&&(an.delete(bt),or(bt))});const _e=G?(R=n.sceneObjects.find(ot=>ot.key===G))==null?void 0:R.object_type:null;_e==="balance"&&G&&(an.set(G,ce),or(G)),Vi.forEach((ot,bt)=>{if(bt===ce&&ot!==G){const nn=Number(ae(bt).volume_ml??0),fr=Math.max(0,(z.get(ot)??0)-nn);z.set(ot,fr),$(ot,fr/Number(ae(ot).capacity_ml??250)),Vi.delete(bt)}});const Ve=Number(ae(ce).volume_ml??0);if(_e&&B.includes(_e)&&G&&Ve>0&&!Vi.has(ce)){Vi.set(ce,G);const ot=(z.get(G)??0)+Ve;z.set(G,ot),$(G,ot/Number(ae(G).capacity_ml??250))}const nt=(I=n.sceneObjects.find(ot=>ot.key===ce))==null?void 0:I.object_type;if(Je.forEach((ot,bt)=>{ot===ce&&bt!==G&&Je.delete(bt)}),_e==="microscope"&&G&&nt==="biological_model"){Je.set(G,ce);const ot=Number(ae(ce).optimal_focus??50),bt=Number(ae(ce).focus_tolerance??6),nn=Math.random()<.5?-1:1,fr=bt*(3+Math.random()*3)*nn;Ge.set(G,Math.max(0,Math.min(100,ot+fr))),mt.set(G,40),Be(G)}let Qe,Rt=!1;if(nt==="mass_piece"){Me.forEach((bt,nn)=>{bt.has(ce)&&nn!==G&&bt.delete(ce)}),_e==="spring"&&G&&(Me.has(G)||Me.set(G,new Set),Me.get(G).add(ce));const ot=new Set(G&&_e==="spring"?[G]:[]);Me.forEach((bt,nn)=>ot.add(nn)),ot.forEach(bt=>{const nn=ye(bt);G===bt&&(Qe=nn.totalMassG,Rt=nn.exceeded)}),Rt&&(Ne.value="Load exceeds the spring's safe extension limit - it may not return to its original length.",setTimeout(()=>{Ne.value=null},4500))}["ray_box","mirror","glass_block"].includes(nt||"")&&wt(),s("action",{objectKey:v.value,action:"move",value:G,springLoadG:Qe,safetyIssue:Rt})}else if(m.value==="rotate"){const H=u.get(v.value),G=H?Math.round(H.rotation.y*180/Math.PI):0,ce=(U=n.sceneObjects.find(_e=>_e.key===v.value))==null?void 0:U.object_type;["ray_box","mirror","glass_block"].includes(ce||"")&&wt(),s("action",{objectKey:v.value,action:"rotate",value:String(G)})}m.value=null,h.enabled=!0}}function b(R){const I=u.get(R);if(!I)return;const U=I.position.clone().add(new L(0,.3,0)),H=l.position.clone().sub(h.target).normalize(),G=U.clone().add(H.multiplyScalar(1.4)),ce=l.position.clone(),_e=h.target.clone();let Ve=0;const nt=()=>{Ve+=.05,l.position.lerpVectors(ce,G,Math.min(Ve,1)),h.target.lerpVectors(_e,U,Math.min(Ve,1)),h.update(),Ve<1&&requestAnimationFrame(nt)};nt()}function k(R){const I=c.domElement.getBoundingClientRect();d.x=(R.clientX-I.left)/I.width*2-1,d.y=-((R.clientY-I.top)/I.height)*2+1}function K(){f.setFromCamera(d,l);const R=[];u.forEach(H=>R.push(H));const I=f.intersectObjects(R,!0);if(I.length===0)return null;let U=I[0].object;for(;U&&!U.userData.objectKey;)U=U.parent;return U?U.userData.objectKey:null}let W=null;function q(R){if(k(R),W={x:R.clientX,y:R.clientY},m.value==="move"&&v.value){S=!0;return}if(m.value==="rotate"&&v.value){S=!0,M=R.clientX;return}}function Re(R){if(!(!S||!v.value)){if(k(R),m.value==="move"){f.setFromCamera(d,l);const I=new L;f.ray.intersectPlane(g,I);const U=u.get(v.value);U&&I&&(U.position.x=I.x,U.position.z=I.z)}else if(m.value==="rotate"){const I=R.clientX-M,U=u.get(v.value);U&&(U.rotation.y=I*.02)}}}function Le(R){const I=W&&(Math.abs(R.clientX-W.x)>4||Math.abs(R.clientY-W.y)>4);if(S=!1,m.value==="move"||m.value==="rotate"||I)return;k(R);const U=K();if(!U){Hi();return}if(m.value==="connect"||m.value==="pour"||m.value==="heat"||m.value==="measure"){if(U===v.value)return;const H=v.value,G=m.value;if(G==="measure"){if(st.value==="ruler"){const ce=Ae(H,U);if(!ce.ok){Ne.value="Align the zero mark of the ruler with the beginning of the object.",setTimeout(()=>{Ne.value=null},3500);return}me.value="readonly",Se.value="cm",ge.value=ce.value}else if(st.value==="thermometer")me.value="readonly",Se.value="°C",ge.value=He(U);else if(st.value==="protractor"){const ce=he.value??"incidence",_e=Sn(H,U,ce);if(!_e.ok){Ne.value="Position the centre of the protractor at the point where the ray meets the surface.",setTimeout(()=>{Ne.value=null},3500);return}me.value="readonly",Se.value="°",ge.value=_e.value}ve.value=U,y.value=H,m.value=null,st.value=null,h.enabled=!0;return}if(G==="connect"){const ce=u.get(H),_e=u.get(U);ce&&_e&&o.add(rh(ce.position,_e.position)),de.value.push({from:H,to:U}),s("action",{objectKey:H,action:G,value:U}),m.value=null,h.enabled=!0;return}if(G==="heat"){re.set(U,Date.now()),s("action",{objectKey:H,action:G,value:U}),m.value=null,h.enabled=!0;return}if(G==="pour"){Ce(H,U);return}}Gi(U)}function Ce(R,I){var Qe,Rt;const U=n.sceneObjects.find(ot=>ot.key===R),H=n.sceneObjects.find(ot=>ot.key===I);if(!U||!H)return;const G=Number(ae(I).capacity_ml??250),ce=z.get(I)??0,_e=Math.max(0,G-ce),Ve=B.includes(U.object_type),nt=Ve?z.get(R)??0:_e;x.value={from:R,to:I,amount:0,max:Math.max(1,Math.round(Math.min(_e,nt))),fromLabel:((Qe=C().get(U.object_type))==null?void 0:Qe.display_name)??U.object_type,toLabel:((Rt=C().get(H.object_type))==null?void 0:Rt.display_name)??H.object_type,fromTracked:Ve}}function Fe(){if(!x.value)return;const{from:R,to:I,amount:U,fromTracked:H}=x.value,G=Number(ae(I).capacity_ml??250);if($(I,((z.get(I)??0)+U)/G),H){const ce=Number(ae(R).capacity_ml??250);$(R,Math.max(0,(z.get(R)??0)-U)/ce)}}qr(()=>{var R;return(R=x.value)==null?void 0:R.amount},Fe);function We(){if(!x.value)return;const{from:R,to:I,amount:U,fromTracked:H}=x.value;z.set(I,Math.round((z.get(I)??0)+U)),H&&z.set(R,Math.max(0,Math.round((z.get(R)??0)-U))),s("action",{objectKey:I,action:"pour",value:String(Math.round(U))}),x.value=null,m.value=null,h.enabled=!0}function at(){if(x.value){const{from:R,to:I,fromTracked:U}=x.value,H=Number(ae(I).capacity_ml??250);if($(I,(z.get(I)??0)/H),U){const G=Number(ae(R).capacity_ml??250);$(R,(z.get(R)??0)/G)}}x.value=null,m.value=null,h.enabled=!0}let Ke=null;const ke=xt(null);function Tt(){const R=r.value;if(!R)return;try{Ke=w_(R,{unitScale:ah,cameraPosition:[.4,4.6,6.4],target:[0,.4,0],minDistance:1.2,maxDistance:14})}catch(U){console.error("Virtual Lab: failed to create a WebGL context",U),a.value=!0;return}c=Ke.renderer,o=Ke.scene,l=Ke.camera,h=Ke.controls,n.sceneObjects.forEach(U=>{if(U.in_tray){V.value.push(U);return}Y(U)}),(n.connections||[]).forEach(U=>{const H=u.get(U.from),G=u.get(U.to);H&&G&&o.add(rh(H.position,G.position))}),wt(),n.fixedView?Vt():Ot(),c.domElement.addEventListener("pointerdown",q),c.domElement.addEventListener("pointermove",Re),c.domElement.addEventListener("pointermove",At),c.domElement.addEventListener("pointerup",Le);let I=0;Ke.onFrame(U=>{I+=U,I>.15&&(I=0,Bn.forEach((H,G)=>{H&&Ai(G)})),u.forEach((H,G)=>{const ce=G===v.value||G===ke.value;H.children.forEach(_e=>{_e.userData.role==="label"&&(_e.visible=ce)})})})}qr(()=>n.sceneObjects.map(R=>`${R.key}@${R.position.x},${R.position.z}`).join("|"),()=>{if(!Ke)return;const R=new Map(n.sceneObjects.filter(U=>!U.in_tray).map(U=>[U.key,U]));let I=!1;u.forEach((U,H)=>{R.has(H)||(o.remove(U),U.traverse(G=>{var ce;(G instanceof qe||G instanceof Fn)&&((ce=G.geometry)==null||ce.dispose(),(Array.isArray(G.material)?G.material:[G.material]).forEach(Ve=>{var nt;(nt=Ve.map)==null||nt.dispose(),Ve.dispose()}))}),u.delete(H),v.value===H&&Hi())}),R.forEach((U,H)=>{const G=u.get(H);G?G.position.set(U.position.x,U.position.y,U.position.z):(Y(U),I=!0)}),I&&!n.fixedView&&Ot()});function Vt(){if(!Ke)return;const R=ah;Ke.fitBox(new Kn(new L(-.9*R,-.9*R,-.375*R),new L(.9*R,.1*R,.375*R)),.72)}function Ot(){if(!Ke||u.size===0)return;o.updateMatrixWorld(!0);const R=new Kn;u.forEach(I=>I.children.forEach(U=>{U.userData.role!=="label"&&R.expandByObject(U)})),Ke.frameBox(R)}function At(R){S||(k(R),ke.value=K(),c.domElement.style.cursor=ke.value?"pointer":"grab")}function tn(R,I){(I.state==="on"||I.state==="off")&&X.set(R,I.state);const U=u.get(R);U&&U.traverse(H=>{if(H.userData.role==="lever"&&"state"in I){const G=I.state==="on"||I.state==="closed";H.rotation.z=G?Math.PI/2-.35:Math.PI/2-.9,H.position.x=G?0:-.06}if(H.userData.role==="led"&&"state"in I&&H instanceof qe){const G=H.material;G.emissiveIntensity=I.state==="on"?1.2:0}if(H.userData.role==="flame"&&"flame"in I&&H instanceof qe){const G=H.material;G.emissiveIntensity=I.flame==="on"?1:0,G.opacity=I.flame==="on"?.9:0}})}e({setObjectState:tn});function Ie(){a.value=!1,ou(Tt)}return oh(Tt),lh(()=>{c==null||c.domElement.removeEventListener("pointerdown",q),c==null||c.domElement.removeEventListener("pointermove",Re),c==null||c.domElement.removeEventListener("pointermove",At),c==null||c.domElement.removeEventListener("pointerup",Le),Ke==null||Ke.dispose(),Ke=null}),(R,I)=>(Ut(),Nt("div",O_,[a.value?(Ut(),Nt("div",B_,[Ol(lu,{name:"beaker",class:"w-8 h-8"}),I[9]||(I[9]=Xe("p",{class:"text-sm text-gray-600 dark:text-gray-300"},"The 3D view couldn't start on this device.",-1)),Xe("button",{onClick:Ie,class:"mt-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Try Again")])):(Ut(),Nt("div",{key:1,ref_key:"canvasHost",ref:r,class:"w-full h-full"},null,512)),V.value.length>0?(Ut(),Nt("div",{key:2,class:Ds(["absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto",m.value||x.value?"top-16 sm:top-3":"top-2 sm:top-3"])},[I[10]||(I[10]=Xe("p",{class:"text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5"},"Apparatus Tray",-1)),Xe("div",z_,[(Ut(!0),Nt(Ls,null,dr(V.value,U=>{var H,G;return Ut(),Nt("button",{key:U.key,onClick:ce=>te(U.key),class:"w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"},[Xe("span",null,Wt(((H=C().get(U.object_type))==null?void 0:H.icon)||"🔬"),1),Xe("span",V_,Wt(((G=C().get(U.object_type))==null?void 0:G.display_name)||U.object_type),1)],8,k_)}),128))])],2)):on("",!0),v.value&&!m.value?(Ut(),Nt("div",G_,[Xe("div",H_,[Xe("p",W_,Wt(w.value),1),Xe("button",{onClick:Hi,class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")]),Xe("div",X_,[(Ut(!0),Nt(Ls,null,dr(_.value,U=>(Ut(),Nt("button",{key:U,onClick:H=>hr(U),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"},Wt(E(U)),9,Y_))),128))]),y.value&&me.value==="readonly"?(Ut(),Nt("div",q_,[I[11]||(I[11]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1"},"Reading",-1)),Xe("div",Z_,[Xe("span",K_,[Bl(Wt(ge.value),1),Xe("span",J_,Wt(Se.value),1)]),Xe("button",{onClick:ur,class:"flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])])):on("",!0),y.value&&me.value==="slider"?(Ut(),Nt("div",$_,[Xe("p",Q_,"Reading: "+Wt(Math.round(rt.value))+Wt(Se.value),1),zl(Xe("input",{"onUpdate:modelValue":I[0]||(I[0]=U=>rt.value=U),type:"range",min:"0",max:Et.value,step:"1",class:"w-full accent-emerald-600"},null,8,j_),[[kl,rt.value,void 0,{number:!0}]]),Xe("button",{onClick:ur,class:"mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"},"Record")])):on("",!0),P.value==="battery"?(Ut(),Nt("div",ev,[I[12]||(I[12]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Cell Voltage",-1)),Xe("div",tv,[(Ut(),Nt(Ls,null,dr([1.5,3,6,9,12],U=>Xe("button",{key:U,onClick:H=>Wi(U),class:Ds(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",N.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},Wt(U)+"V",11,nv)),64))])])):on("",!0),P.value==="stopwatch"?(Ut(),Nt("div",iv,[Xe("p",sv,"Elapsed: "+Wt(Rs.value),1),Xe("button",{onClick:I[1]||(I[1]=U=>lr(v.value)),class:"px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"Reset")])):on("",!0),P.value==="microscope"?(Ut(),Nt("div",rv,[Te.value?(Ut(),Nt(Ls,{key:1},[Xe("div",null,[I[13]||(I[13]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Objective Lens",-1)),Xe("div",ov,[(Ut(),Nt(Ls,null,dr([40,100,400],U=>Xe("button",{key:U,onClick:H=>$e(U),class:Ds(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",oe.value===U?"bg-emerald-600 text-white border-emerald-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"×"+Wt(U),11,lv)),64))])]),Xe("div",null,[Xe("p",cv,"Coarse Focus: "+Wt(Math.round(je.value)),1),Xe("input",{value:je.value,onChange:I[2]||(I[2]=U=>lt(Number(U.target.value))),type:"range",min:"0",max:"100",step:"10",class:"w-full accent-indigo-600"},null,40,hv)]),Xe("div",uv,[I[14]||(I[14]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"},"Fine Focus",-1)),Xe("div",fv,[Xe("button",{onClick:I[3]||(I[3]=U=>O(-1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"-"),Xe("button",{onClick:I[4]||(I[4]=U=>O(1)),class:"w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"},"+")])]),fe.value?(Ut(),Nt("div",dv,[I[16]||(I[16]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center"},"Eyepiece View",-1)),Xe("div",pv,[Xe("div",{class:"absolute inset-0 flex items-center justify-center",style:su({filter:`blur(${dt[ue.value]}px)`})},[...I[15]||(I[15]=[Xe("div",{class:"w-16 h-16 rounded-full",style:{background:"radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0"}},null,-1)])],4)]),Xe("p",mv,Wt(ue.value.replace("_"," "))+" · ×"+Wt(oe.value),1)])):on("",!0)],64)):(Ut(),Nt("div",av,"Place a specimen slide on the stage first."))])):on("",!0),P.value==="spring"?(Ut(),Nt("div",gv,[Xe("p",_v,"Attached Load: "+Wt(it.value)+" g · Extension: "+Wt(et.value)+" cm",1),F.value?(Ut(),Nt("p",vv,"Beyond the spring's safe extension limit.")):on("",!0)])):on("",!0),P.value==="protractor"?(Ut(),Nt("div",xv,[I[17]||(I[17]=Xe("p",{class:"text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5"},"Measure",-1)),Xe("div",Mv,[Xe("button",{onClick:I[5]||(I[5]=U=>A("incidence")),class:Ds(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",he.value==="incidence"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Incidence",2),Xe("button",{onClick:I[6]||(I[6]=U=>A("outgoing")),class:Ds(["px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors",he.value==="outgoing"&&m.value==="measure"?"bg-indigo-600 text-white border-indigo-600":"bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"])},"Angle of Reflection / Refraction",2)])])):on("",!0)])):on("",!0),m.value&&!x.value?(Ut(),Nt("div",yv,[Xe("span",Sv,Wt(Rn.value),1),Xe("span",bv,[m.value==="move"||m.value==="rotate"?(Ut(),Nt("button",{key:0,onClick:ba,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform"},"Done")):on("",!0),Xe("button",{onClick:Sa,class:"px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform"},"Cancel")])])):on("",!0),x.value?(Ut(),Nt("div",Ev,[Xe("p",wv,"Pouring "+Wt(x.value.fromLabel)+" → "+Wt(x.value.toLabel),1),Xe("p",Tv,[Bl(Wt(Math.round(x.value.amount))+" ",1),I[18]||(I[18]=Xe("span",{class:"text-xs font-medium text-gray-400"},"ml",-1))]),zl(Xe("input",{"onUpdate:modelValue":I[7]||(I[7]=U=>x.value.amount=U),type:"range",min:"0",max:x.value.max,step:"1",class:"w-full accent-indigo-600"},null,8,Av),[[kl,x.value.amount,void 0,{number:!0}]]),Xe("div",{class:"flex items-center gap-2 mt-2"},[Xe("button",{onClick:at,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"},"Cancel"),Xe("button",{onClick:We,class:"flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"},"Stop Pouring")])])):on("",!0),Ol(au,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0 -translate-y-1","leave-active-class":"transition duration-150 ease-in","leave-to-class":"opacity-0"},{default:ru(()=>[Ne.value?(Ut(),Nt("div",Rv,Wt(Ne.value),1)):on("",!0)]),_:1}),p.value?(Ut(),Nt("div",Cv,[Xe("div",Pv,[Xe("p",Dv,Wt(p.value),1),Xe("button",{onClick:I[8]||(I[8]=U=>p.value=null),class:"flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none"},"✕")])])):on("",!0),I[19]||(I[19]=Xe("p",{class:"hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none"}," Drag to orbit · Scroll to zoom · Click equipment to interact ",-1))]))}});export{hl as A,Bt as B,ee as C,qt as D,$t as G,Wh as H,vf as L,qe as M,u_ as O,ni as P,Rl as Q,fd as R,kt as S,zt as T,L as V,c_ as W,Ov as _,ya as a,pe as b,w_ as c,pa as d,Ii as e,ir as f,Kt as g,Fv as h,Ph as i,Oi as j,On as k,I_ as l,ad as m,li as n,ht as o,D_ as p,Mi as q,J as r,Ih as s,Gh as t,Uv as u,wh as v,Mn as w,hn as x,da as y,F_ as z};
