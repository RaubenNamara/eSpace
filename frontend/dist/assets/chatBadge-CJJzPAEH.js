<<<<<<<< HEAD:frontend/dist/assets/chatBadge-C2hman7u.js
import{a6 as o,r as s,u,i as n}from"./index-DJnNs0qi.js";const d=o("chatBadge",()=>{const e=s(0);async function r(){const t=u().userRole;if(!(t!=="student"&&t!=="teacher"))try{const a=await n.get(`/api/${t}/chat/unread-count`);e.value=a.data.data.count}catch{}}return{unreadCount:e,refresh:r}});export{d as u};
========
import{a7 as o,r as s,u,i as n}from"./index-DS3sRtZP.js";const d=o("chatBadge",()=>{const e=s(0);async function r(){const t=u().userRole;if(!(t!=="student"&&t!=="teacher"))try{const a=await n.get(`/api/${t}/chat/unread-count`);e.value=a.data.data.count}catch{}}return{unreadCount:e,refresh:r}});export{d as u};
>>>>>>>> ec8deec7497da6dfe50a11c89bf12ac1ad3bbb8f:frontend/dist/assets/chatBadge-CJJzPAEH.js
