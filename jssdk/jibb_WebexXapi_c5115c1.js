import e from"xapi";!function(){const e={NODE_ENV:"onprem",API_BASE_URL:"https://api.jibb.ai"};try{if(process)return process.env=Object.assign({},process.env),void Object.assign(process.env,e)}catch(e){}globalThis.process={env:e}}();let t=new class{constructor(){this.apiBaseURL=process.env.API_BASE_URL||"https://api.jibb.ai"}setApiBaseURL(e){this.apiBaseURL=e}};function n(e){this.message=e}n.prototype=new Error,n.prototype.name="InvalidCharacterError";var a="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new n("'atob' failed: The string to be decoded is not correctly encoded.");for(var a,i,s=0,r=0,o="";i=t.charAt(r++);~i&&(a=s%4?64*a+i:i,s++%4)?o+=String.fromCharCode(255&a>>(-2*s&6)):0)i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(i);return o};function i(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(a(e).replace(/(.)/g,(function(e,t){var n=t.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n})))}(t)}catch(e){return a(t)}}function s(e){this.message=e}s.prototype=new Error,s.prototype.name="InvalidTokenError";const r=0,o={USER:"USER",ADMIN:"ADMIN",SUPERADMIN:"SUPERADMIN"};class p{constructor(e){this.token=e,this.claims=function(e,t){if("string"!=typeof e)throw new s("Invalid token specified");var n=!0===(t=t||{}).header?0:1;try{return JSON.parse(i(e.split(".")[n]))}catch(e){throw new s("Invalid token specified: "+e.message)}}(e),this.expiryTime=new Date(1e3*this.claims.exp)}getSecondsUntilExpiry(){let e=this.expiryTime-Date.now();return e<0?0:e}getHoursUntilExpiry(){let e=this.getSecondsUntilExpiry();return Math.floor(e/3600)}isExpired(){return this.getSecondsUntilExpiry()<=60}}class c extends p{constructor(e){super(e),this.ownerId=this.claims.data.owner_id,this.meetindId=this.claims.data.meeting_id,this.title=this.claims.data.title,this.capacity=this.claims.data.capacity,this.permission=this.claims.data.permission,this.isTemporary=this.claims.data.is_temporary}}class l extends p{constructor(e){super(e),this.email=this.claims.data?.email,this.userId=this.claims.sub,this.organizationId=this.claims.data?.organization_id,this.organizationName=this.claims.data?.organization_name}getUserId(){return this.userId}}globalThis={},globalThis.http=new class{async get(t,n){let a=await e.Command.HttpClient.Get({Header:this.#e(n),Url:t,ResultBody:"PlainText"});return this.#t(a)}async post(t,n={},a={}){let i=await e.Command.HttpClient.Post({Header:this.#e(a),Url:t,ResultBody:"PlainText"},JSON.stringify(n));return this.#t(i)}async patch(t,n={},a={}){let i=await e.Command.HttpClient.Patch({Header:this.#e(a),Url:t,ResultBody:"PlainText"},JSON.stringify(n));return this.#t(i)}async put(t,n={},a={}){let i=await e.Command.HttpClient.Put({Header:this.#e(a),Url:t,ResultBody:"PlainText"},JSON.stringify(n));return this.#t(i)}async delete(t,n={}){let a=await e.Command.HttpClient.Delete({Header:this.#e(n),Url:t,ResultBody:"PlainText"});return this.#t(a)}#e(e){let t=[];for(const[n,a]of Object.entries(e))t.push(`${n}: ${a}`);return t}#t(e){let t=e;return t.data=JSON.parse(t.Body),delete t.Body,t}};let u,g=globalThis.http,d=new Map,m=async()=>{throw new Error("not implemented")};function w(e,t=o.USER){if(!e)return;let n=new l(e);n.isExpired()||d.set(t,n)}async function h({minExpiry:e,accessLevel:n}={}){e=e||1800,n=n||o.USER;let a=d.get(n),i=!1,s=a?a.getSecondsUntilExpiry():0;if(s<60?(a=void 0,i=!0):s<e&&(i=!0),i)return async function(e){return u?async function(e){let n,a={"Content-Type":"application/json",Accept:"application/json"},i={api_key:u};switch(e){case o.ADMIN:n=`${t.apiBaseURL}/v1/admin/auth/token`;break;case o.SUPERADMIN:n=`${t.apiBaseURL}/v1/superadmin/auth/token`;break;default:n=`${t.apiBaseURL}/v1/auth/token`}return(await g.post(n,i,a)).data.token}(e):async function(e){let n,a={"Content-Type":"application/json",Accept:"application/json","x-jibb-id-jwt":await m()},i={};switch(e){case o.ADMIN:n=`${t.apiBaseURL}/v1/admin/auth/token`;break;case o.SUPERADMIN:n=`${t.apiBaseURL}/v1/superadmin/auth/token`;break;default:n=`${t.apiBaseURL}/v1/auth/token`}return(await g.post(n,i,a)).data.token}(e)}(n).then((e=>(w(e,n),e))).catch((e=>{if(a)return a.token;throw e}));if(a)return a.token;throw new Error("could not create user token")}var y=Object.freeze({__proto__:null,configure:function({apiKey:e,getIdToken:t}){e&&(u=e),t&&(m=t),d.clear()},generateAPIKey:async function(){let e={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return(await g.get(`${t.apiBaseURL}/v1/auth/apikey`,e)).data.apiKey},generateCustomAuthPassword:async function(){let e={"Content-Type":"application/json",Accept:"application/json","x-jibb-id-jwt":await m()};return(await g.get(`${t.apiBaseURL}/v1/auth/custom`,e)).data.password},getUserClaims:async function(){return h().then((e=>d.get(o.USER)))},getUserToken:h,logout:function(){u=void 0,d.clear()},setUserToken:w});let j=new class{error(){}debug(){}warn(){}info(){}setLevel(){}};class f extends Error{constructor(e){super(e),this.name="NotFoundError"}}class b extends Error{constructor(e){super(e),this.name="PermissionDeniedError"}}var v=Object.freeze({__proto__:null,authorizeShortMeeting:async function({hashKey:e,password:n}){let a={password:n};return 200==(await g.post(`${t.apiBaseURL}/v1/meetings/url-shortener/auth/${e}`,a,{"Content-Type":"application/json",Accept:"application/json"})).status},createMeeting:async function({title:e,isTemporary:n,capacity:a,meetingType:i}){let s={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()},o={title:e||"",isTemporary:n||!1,capacity:a||2,meetingType:i||r};return(await g.post(`${t.apiBaseURL}/v1/meetings`,o,s)).data.meetingId},createShare:async function({email:e,meetingId:n,permission:a,meetingToken:i}){let s={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h(),"x-jibb-meeting-jwt":i},r={email:e,permission:a};return(await g.post(`${t.apiBaseURL}/v1/meetings/${n}/shares`,r,s)).data},createShortUrl:async function({meetingToken:e,url:n}){let a={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h(),"x-jibb-meeting-jwt":e},i={url:n};return(await g.post(`${t.apiBaseURL}/v1/meetings/url-shortener`,i,a)).data},createTemporaryShare:async function({meetingId:e,permission:n,expiry:a,auxData:i}){let s={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()},r={permission:n,expiry:{seconds:a||3600},auxilary:i||{}};return(await g.post(`${t.apiBaseURL}/v1/meetings/${e}/temp-shares`,r,s)).data.shareId},deleteMeeting:async function(e){let n={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return g.delete(`${t.apiBaseURL}/v1/meetings/${e}`,n)},deleteMeetingImages:async function({meetingId:e,mtoken:n}){let a={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h(),"x-jibb-meeting-jwt":n};return g.delete(`${t.apiBaseURL}/v1/meetings/${e}/images`,a)},deleteShare:async function(e){let n={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return g.delete(`${t.apiBaseURL}/v1/meetings/shares/${e}`,n)},endMeeting:async function({meetingId:e,meetingToken:n}){let a={"Content-Type":"application/json",Accept:"application/json","x-jibb-meeting-jwt":n};return g.post(`${t.apiBaseURL}/v1/meetings/${e}/actions/end`,{},a)},getFullUrl:async function(e){return(await g.get(`${t.apiBaseURL}/v1/meetings/url-shortener/${e}`,{"Content-Type":"application/json",Accept:"application/json"})).data.fullUrl},getIncomingShares:async function(){let e={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return(await g.get(`${t.apiBaseURL}/v1/meetings/shares?incoming=true`,e)).data.shares},getMeetingDetails:async function(e){let n={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return(await g.get(`${t.apiBaseURL}/v1/meetings/${e}`,n)).data},getMeetingImage:async function({meetingId:e,meetingToken:n,imageId:a}){let i={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h(),"x-jibb-meeting-jwt":n};return(await g.get(`${t.apiBaseURL}/v1/meetings/${e}/images/${a}`,i)).data},getMeetingImages:async function({meetingId:e,meetingToken:n}){let a={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h(),"x-jibb-meeting-jwt":n};return(await g.get(`${t.apiBaseURL}/v1/meetings/${e}/images`,a)).data},getMeetingList:async function(e){let n={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};void 0!==e&&(n["x-jibb-pagination"]=JSON.stringify(e));let a=await g.get(`${t.apiBaseURL}/v1/meetings`,n);return e=(e=a.headers["x-jibb-pagination"])&&JSON.parse(e),{meetings:a.data.meetings,pagination:e}},getMeetingToken:async function({meetingId:e,permission:n,expiry:a=3600}){let i;try{i=await h()}catch(e){throw j.error({err:e}),new b("user is not authenticated")}try{let s={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":i},r={permission:n,expiry:{seconds:a}};return(await g.post(`${t.apiBaseURL}/v1/meetings/${e}/token`,r,s)).data.token}catch(e){throw 404==e?.response?.status?new f("meeting not found"):e}},getMeetingTokenFromTempShareId:async function({meetingId:e,shareId:n}){return(await g.get(`${t.apiBaseURL}/v1/meetings/${e}/temp-shares/${n}`,{"Content-Type":"application/json",Accept:"application/json"})).data.token},getOutgoingShares:async function(){let e={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return(await g.get(`${t.apiBaseURL}/v1/meetings/shares?outgoing=true`,e)).data.shares},isMeetingOwner:async function(e){try{let t=new c(e);return new l(await h()).userId===t.ownerId}catch(e){return!1}},startMeeting:async function({meetingId:e,meetingToken:n}){let a={"Content-Type":"application/json",Accept:"application/json","x-jibb-meeting-jwt":n};try{let n={};return await g.post(`${t.apiBaseURL}/v1/meetings/${e}/actions/start`,n,a)}catch(e){throw 404==e?.response?.status?new f:e}},updateMeeting:async function({meetingId:e,title:n,capacity:a}){let i={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()},s={};return n&&(s.title=n),a&&(s.capacity=a),g.post(`${t.apiBaseURL}/v1/meetings/${e}`,s,i)},updateShare:async function({shareId:e,permission:n}){let a={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()},i={permission:n};return g.patch(`${t.apiBaseURL}/v1/meetings/shares/${e}`,i,a)}});async function U(){return{"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()}}function R({fixedCorners:e,flipLeftRight:t,flipUpDown:n,rotation:a,customCorners:i,enableColor:s,enableEstimation:r}){switch(a){case 90:a="1";break;case 180:case-180:a="2";break;case-90:case 270:a="3";break;default:a="0"}return{custom_corners:i||[],rotation:a,enable_color:s||!1,fixed_corners:e,enable_estimation:r||!1,flip_up_down:n||!1,flip_left_right:t||!1}}var C=Object.freeze({__proto__:null,getCameraList:async function(e){return(await g.get(`${t.apiBaseURL}/v1/eventbus/clients/${e}/cameras`,await U())).data.items},getCameraPreview:async function({cameraId:e,clientId:n}){return(await g.get(`${t.apiBaseURL}/v1/eventbus/clients/${n}/cameras/${e}`,await U())).data.image},getClientStatusList:async function(){return(await g.get(`${t.apiBaseURL}/v1/eventbus/clients`,await U())).data.clients},sendMessage:async function(e){return g.post(`${t.apiBaseURL}/v1/eventbus`,e,await U())},setRuntimeConfig:async function({flipLeftRight:e,flipUpDown:n,rotation:a,fixedCorners:i,customCorners:s,clientId:r,enableColor:o,enableEstimation:p}){let c={runtime_config_request:{runtime_config:R({fixedCorners:i,flipLeftRight:e,flipUpDown:n,rotation:a,customCorners:s,enableColor:o,enableEstimation:p})}};return g.post(`${t.apiBaseURL}/v1/eventbus/${r}/runtime_config`,c,await U())},startStream:async function({meetingToken:e,surfaceType:n,cameraId:a,sipUri:i,flipLeftRight:s,flipUpDown:r,rotation:o,fixedCorners:p,clientId:c,customCorners:l,enableColor:u,enableEstimation:d}){let m={config:{surface_type:n},runtime_config:R({fixedCorners:p,flipLeftRight:s,flipUpDown:r,rotation:o,customCorners:l,enableColor:u,enableEstimation:d}),meeting_token:e};if(!a&&!i)return Promise.reject("Invalid request: either sipUri or cameraId should be specified");if(a&&i)return Promise.reject(`Invalid request: both sipUri (${i}) and cameraId (${i}) are specified`);i?m.sip_uri=i:m.camera={id:a};let w={start_request:m};return g.post(`${t.apiBaseURL}/v1/eventbus/clients/${c}/start`,w,await U())},stopStream:async function(e){return g.post(`${t.apiBaseURL}/v1/eventbus/${e}/stop`,{},await U())}});var x=Object.freeze({__proto__:null,startRecording:async function(e={meetingToken:n,interval:a,sensivityLevel:i,alternativeEmail:alternativeEmail}){let n=e.meetingToken,a=e?.interval||0,i=e?.sensivityLevel||0,s=e?.alternativeEmail||"",r={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h(),"x-jibb-meeting-jwt":n},o={write_interval:a,level:i,alternative_email:s};return(await g.post(`${t.apiBaseURL}/v1/meetings/recordings/start`,o,r)).data},stopRecording:async function(){let e={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return(await g.post(`${t.apiBaseURL}/v1/meetings/recordings/stop`,{},e)).data},takeSnapshot:async function(){let e={"Content-Type":"application/json",Accept:"application/json","x-jibb-user-jwt":await h()};return(await g.post(`${t.apiBaseURL}/v1/meetings/recordings/snapshot`,{},e)).data}});console.log("JIBB Device Loading...");const $={Auth:y,Config:t,Meeting:v,EventBus:C,Recording:x};export{$ as JIBB};
