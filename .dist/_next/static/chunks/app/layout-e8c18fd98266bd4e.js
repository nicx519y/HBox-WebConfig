(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{542:(e,t,n)=>{Promise.resolve().then(n.bind(n,264))},264:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>Y});var r=n(5155),i=n(6196),l=n(5150),a=n(7113),s=n(2115);function o(e){return(0,r.jsx)(a.N,{attribute:"class",disableTransitionOnChange:!0,...e})}function d(e){return(0,r.jsx)(i.s,{value:l.$m,children:(0,r.jsx)(o,{...e})})}function c(e){let{children:t}=e;return(0,r.jsx)(r.Fragment,{children:t})}var h=n(6046),x=n(7425),u=n(4887),j=n(8359),f=n(8345),p=n(9383),g=n(5956),E=n(4416),m=n(341),b=n(3153),_=n(97);let v=s.forwardRef(function(e,t){let{portalled:n=!0,portalRef:i,...l}=e;return(0,r.jsx)(b.Z,{disabled:!n,container:i,children:(0,r.jsx)(_.y3,{children:(0,r.jsx)(_.rm,{ref:t,...l})})})});_.x0,_.PW;let T=_.il;_.bX;let I=_.Dr;_.e7,_.C1;let L=_.cQ;var C=n(745),S=n(2950),O=n(1571),R=n(9827),A=n(7837),N=n(4085),w=n(4087),y=n(9083),P=n(7520);let z=(0,R.v)(()=>({isOpen:!1,fields:[]}));function k(){let{isOpen:e,title:t,fields:n,resolve:i}=z(),[l,a]=(0,s.useState)({}),{t:o}=(0,P.o)(),d=()=>{z.setState({isOpen:!1}),null==i||i(null)};return(0,r.jsx)(A.Dz,{open:e,onOpenChange:d,children:(0,r.jsx)(A.Cf,{children:(0,r.jsxs)("form",{onSubmit:e=>{e.preventDefault();let t=new FormData(e.currentTarget),r={},l={};if(n.forEach(e=>{var n;let i=(null===(n=t.get(e.name))||void 0===n?void 0:n.toString())||"";if(r[e.name]=i,e.validate){let t=e.validate(i);t&&(l[e.name]=t)}}),Object.keys(l).length>0){a(l);return}z.setState({isOpen:!1}),null==i||i(r)},children:[(0,r.jsx)(A.c7,{children:(0,r.jsx)(A.L3,{fontSize:"sm",color:"gray.300",children:t})}),(0,r.jsx)(A.R4,{children:n.map((e,t)=>(0,r.jsx)(w.D,{errorText:l[e.name],invalid:!!l[e.name],children:(0,r.jsx)(y.p,{name:e.name,defaultValue:e.defaultValue,placeholder:e.placeholder,type:e.type||"text",autoComplete:"off"})},t))}),(0,r.jsxs)(A.Es,{children:[(0,r.jsx)(N.$,{width:"100px",size:"sm",colorPalette:"teal",variant:"surface",onClick:d,children:o.BUTTON_CANCEL}),(0,r.jsx)(N.$,{type:"submit",width:"100px",size:"sm",colorPalette:"green",children:o.BUTTON_SUBMIT})]})]})})})}function F(e){return new Promise(t=>{z.setState({isOpen:!0,title:e.title,fields:e.fields,resolve:t})})}var D=n(5606);function B(){var e;let{profileList:t,switchProfile:n,createProfile:i,deleteProfile:l,updateProfileDetails:a}=(0,D.l)(),{t:o}=(0,P.o)(),d=(0,s.useMemo)(()=>t.items.find(e=>e.id===t.defaultId),[t]),c=(0,s.useMemo)(()=>(0,g.R)({items:t.items.map(e=>({value:e.id,label:e.name}))}),[t]),h=e=>/[!@#$%^&*()_+\[\]{}|;:'",.<>?/\\]/.test(e)?[!1,o.PROFILE_SELECT_VALIDATION_SPECIAL_CHARS]:e.length>p.EU||e.length<1?[!1,o.PROFILE_SELECT_VALIDATION_LENGTH.replace("{0}",e.length.toString())]:e===(null==d?void 0:d.name)?[!1,o.PROFILE_SELECT_VALIDATION_SAME_NAME]:t.items.find(t=>t.name===e)?[!1,o.PROFILE_SELECT_VALIDATION_EXISTS]:[!0,""],x=async e=>{if(e!==(null==d?void 0:d.id))return await n(e)},u=async()=>{let e=await F({title:o.DIALOG_RENAME_PROFILE_TITLE,fields:[{name:"profileName",label:o.PROFILE_NAME_LABEL,defaultValue:null==d?void 0:d.name,placeholder:o.PROFILE_NAME_PLACEHOLDER,validate:e=>{let[t,n]=h(e);if(!t)return n}}]});if(e){var t,n;await a(null!==(t=null==d?void 0:d.id)&&void 0!==t?t:"",{id:null!==(n=null==d?void 0:d.id)&&void 0!==n?n:"",name:e.profileName})}},j=async()=>{let e=await F({title:o.PROFILE_CREATE_DIALOG_TITLE,fields:[{name:"profileName",label:o.PROFILE_NAME_LABEL,placeholder:o.PROFILE_NAME_PLACEHOLDER,validate:e=>{let[t,n]=h(e);if(!t)return n}}]});e&&await i(e.profileName)},f=async()=>{await (0,O.X)({title:o.PROFILE_DELETE_DIALOG_TITLE,message:o.PROFILE_DELETE_CONFIRM_MESSAGE})&&await b()},b=async()=>{var e;return await l(null!==(e=null==d?void 0:d.id)&&void 0!==e?e:"")};return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(E.B,{direction:"row",gap:2,alignItems:"center",children:[(0,r.jsxs)(C.H5,{size:"sm",width:"200px",collection:c,value:[null!==(e=null==d?void 0:d.id)&&void 0!==e?e:""],onValueChange:e=>x(e.value[0]),children:[(0,r.jsx)(C.bq,{children:(0,r.jsx)(C.NM,{color:"gray.300"})}),(0,r.jsx)(C.gC,{fontSize:"xs",children:c.items.map(e=>(0,r.jsx)(C.eb,{item:e,color:"gray.300",children:e.label},e.value))})]}),(0,r.jsxs)(T,{children:[(0,r.jsx)(L,{asChild:!0,children:(0,r.jsx)(m.K,{"aria-label":o.PROFILE_SELECT_MENU_BUTTON,variant:"ghost",size:"sm",children:(0,r.jsx)(S.z9i,{})})}),(0,r.jsxs)(v,{children:[(0,r.jsxs)(I,{value:"create",onClick:j,children:[(0,r.jsx)(S._rf,{}),o.PROFILE_SELECT_CREATE_BUTTON]}),(0,r.jsxs)(I,{value:"rename",onClick:u,children:[(0,r.jsx)(S.H6t,{}),o.PROFILE_SELECT_RENAME_BUTTON]}),(0,r.jsxs)(I,{value:"delete",onClick:f,children:[(0,r.jsx)(S.UJN,{}),o.PROFILE_SELECT_DELETE_BUTTON]})]})]})]})})}var M=n(6505);function G(e){let{children:t}=e,n=(0,h.useRouter)(),i=(0,h.usePathname)(),{t:l}=(0,P.o)(),a=[{label:l.SETTINGS_TAB_KEYS,path:"/keys-setting",icon:S.xjf},{label:l.SETTINGS_TAB_LEDS,path:"/leds-setting",icon:S.j1S},{label:l.SETTINGS_TAB_RAPID_TRIGGER,path:"/rapid-trigger",icon:S.oyB},{label:l.SETTINGS_TAB_HOTKEYS,path:"/hotkeys-setting",icon:S.JNI},{label:l.SETTINGS_TAB_FIRMWARE,path:"/firmware",icon:S.gLX}],s=!["/hotkeys-setting","/firmware"].includes(i),o=async e=>{await M.C.emit(e)&&n.push(e)};return(0,r.jsxs)(x.s,{direction:"column",height:"100%",flex:1,children:[(0,r.jsx)(u.pK,{defaultValue:i,value:i,size:"md",variant:"subtle",colorPalette:"green",backgroundColor:"rgba(0, 0, 0, 0.3)",borderBottom:"1px solid rgba(0, 255, 0, 0.1)",boxShadow:"0 1px 10px rgba(0, 0, 0, 0.7)",children:(0,r.jsxs)(u.j7,{justifyContent:"center",width:"100%",children:[a.map((e,t)=>(0,r.jsx)(u.Xi,{value:e.path,onClick:()=>o(e.path),width:"180px",justifyContent:"center",children:(0,r.jsxs)(j.z,{children:[(0,r.jsx)(e.icon,{size:18}),(0,r.jsx)("span",{children:e.label})]})},t)),(0,r.jsx)(u.E_,{rounded:"l2"})]})}),(0,r.jsxs)(x.s,{direction:"column",flex:1,height:"100%",children:[(0,r.jsx)(f.o,{pt:4,height:"50px",children:s&&(0,r.jsx)(B,{})}),(0,r.jsx)(f.o,{pt:4,flex:1,children:t})]})]})}var H=n(177),U=n(5923),V=n(6679),W=n(6105);function X(e){let{isOpen:t}=e;return t?(0,r.jsx)(b.Z,{children:(0,r.jsxs)(H.a,{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",children:[(0,r.jsx)(H.a,{position:"absolute",top:0,left:0,right:0,bottom:0,bg:"blackAlpha.100",backdropFilter:"blur(4px)"}),(0,r.jsx)(H.a,{position:"relative",zIndex:1,bg:"transparent",children:(0,r.jsx)(f.o,{p:8,children:(0,r.jsx)(W.y,{color:"green.500",size:"xl"})})})]})}):null}var $=n(263),K=n(9803);let Z="preferred_language";function q(){let{currentLanguage:e,setLanguage:t}=(0,P.o)();return(0,s.useEffect)(()=>{let e=localStorage.getItem(Z);("en"===e||"zh"===e)&&t(e)},[]),(0,s.useEffect)(()=>{localStorage.setItem(Z,e)},[e]),(0,r.jsx)(K.$,{height:"24px",fontSize:"xs",colorPalette:"green",variant:"surface",onClick:()=>t("en"===e?"zh":"en"),size:"sm",children:"en"===e?"中文":"English"})}function J(e){let{children:t}=e,{isLoading:n}=(0,D.l)(),[i,l]=(0,s.useState)(!1),{error:a}=(0,D.l)();return(0,s.useEffect)(()=>{a&&V.X.error({title:"Error",description:a})},[a]),(0,s.useEffect)(()=>{let e;return n?l(!0):e=setTimeout(()=>{l(!1)},300),()=>{e&&clearTimeout(e)}},[n]),(0,r.jsxs)(x.s,{direction:"column",height:"100vh",width:"100vw",background:"linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 100%),   radial-gradient(circle at 0% 0%, rgba(0, 210, 255, 0.15) 0%, transparent 50%),   radial-gradient(circle at 100% 0%, rgba(0, 255, 150, 0.1) 0%, transparent 50%),   radial-gradient(circle at 100% 100%, rgba(0, 180, 255, 0.15) 0%, transparent 50%),   radial-gradient(circle at 0% 100%, rgba(0, 210, 255, 0.1) 0%, transparent 50%),   linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)",position:"relative",overflow:"auto",children:[(0,r.jsx)(H.a,{position:"fixed",top:"5.5px",right:4,zIndex:2,children:(0,r.jsx)(q,{})}),(0,r.jsx)(H.a,{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",background:"repeating-linear-gradient(90deg,    rgba(0, 210, 255, 0.03) 0px,    transparent 1px,    transparent 60px   ),   repeating-linear-gradient(180deg,    rgba(0, 210, 255, 0.03) 0px,    transparent 1px,    transparent 60px   )",zIndex:0,opacity:.35}),(0,r.jsx)(H.a,{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",background:"radial-gradient(   circle at 50% 50%,   rgba(0, 210, 255, 0.1) 0%,   rgba(0, 180, 255, 0.06) 25%,   rgba(0, 150, 255, 0.03) 50%,   transparent 70%   )",zIndex:0,backdropFilter:"blur(90px)"}),(0,r.jsxs)(x.s,{direction:"column",height:"100%",zIndex:1,children:[(0,r.jsx)(G,{children:t}),(0,r.jsx)(f.o,{as:"footer",height:"40px",borderTop:"1px solid",borderColor:"rgba(0, 150, 255, 0.15)",children:(0,r.jsx)(U.E,{fontSize:"sm",color:"gray.500",children:"\xa9 2024 Hitbox Web Config. All rights reserved."})})]}),(0,r.jsx)(V.l,{}),(0,r.jsx)(X,{isOpen:i})]})}function Y(e){let{children:t}=e;return(0,r.jsx)("html",{suppressHydrationWarning:!0,style:{height:"100%"},children:(0,r.jsx)("body",{style:{height:"100vh",margin:0},children:(0,r.jsx)(c,{children:(0,r.jsx)(d,{children:(0,r.jsx)(D.f,{children:(0,r.jsxs)(P.I,{children:[(0,r.jsx)(J,{children:t}),(0,r.jsx)(O.Z,{}),(0,r.jsx)(k,{}),(0,r.jsx)($.sA,{})]})})})})})})}},4087:(e,t,n)=>{"use strict";n.d(t,{D:()=>l});var r=n(5155),i=n(3374);let l=n(2115).forwardRef(function(e,t){let{label:n,children:l,helperText:a,errorText:s,optionalText:o,...d}=e;return(0,r.jsxs)(i.XO,{ref:t,...d,children:[n&&(0,r.jsxs)(i.dh,{children:[n,(0,r.jsx)(i.tR,{fallback:o})]}),l,a&&(0,r.jsx)(i.sp,{children:a}),s&&(0,r.jsx)(i.wp,{children:s})]})})},745:(e,t,n)=>{"use strict";n.d(t,{H5:()=>u,NM:()=>x,bq:()=>o,eb:()=>h,gC:()=>c});var r=n(5155),i=n(1318),l=n(3153),a=n(8380),s=n(2115);let o=s.forwardRef(function(e,t){let{children:n,clearable:l,...a}=e;return(0,r.jsxs)(i.Yq,{...a,children:[(0,r.jsx)(i.bq,{ref:t,children:n}),(0,r.jsxs)(i.b3,{children:[l&&(0,r.jsx)(d,{}),(0,r.jsx)(i.mP,{})]})]})}),d=s.forwardRef(function(e,t){return(0,r.jsx)(i.A_,{asChild:!0,...e,ref:t,children:(0,r.jsx)(a.J,{size:"xs",variant:"plain",focusVisibleRing:"inside",focusRingWidth:"2px",pointerEvents:"auto"})})}),c=s.forwardRef(function(e,t){let{portalled:n=!0,portalRef:a,...s}=e;return(0,r.jsx)(l.Z,{disabled:!n,container:a,children:(0,r.jsx)(i.lE,{children:(0,r.jsx)(i.gC,{...s,ref:t})})})}),h=s.forwardRef(function(e,t){let{item:n,children:l,...a}=e;return(0,r.jsxs)(i.eb,{item:n,...a,ref:t,children:[l,(0,r.jsx)(i.h3,{})]},n.value)}),x=s.forwardRef(function(e,t){let{children:n,...l}=e;return(0,r.jsx)(i.NM,{...l,ref:t,children:(0,r.jsx)(i.CW,{children:t=>{let r=t.selectedItems;return 0===r.length?e.placeholder:n?n(r):1===r.length?t.collection.stringifyItem(r[0]):"".concat(r.length," selected")}})})}),u=s.forwardRef(function(e,t){return(0,r.jsx)(i.H5,{...e,ref:t,positioning:{sameWidth:!0,...e.positioning},children:e.asChild?e.children:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.JK,{}),e.children]})})});i.TR,i.h},6679:(e,t,n)=>{"use strict";n.d(t,{X:()=>d,l:()=>c});var r=n(5155),i=n(8453),l=n(3153),a=n(4298),s=n(6105),o=n(4416);let d=(0,i.j)({placement:"top",pauseOnPageIdle:!0,duration:3e3}),c=()=>(0,r.jsx)(l.Z,{children:(0,r.jsx)(a.l$,{toaster:d,insetInline:{mdDown:"4"},children:e=>{var t;return(0,r.jsxs)(a.mk,{width:{md:"sm"},children:["loading"===e.type?(0,r.jsx)(s.y,{size:"sm",color:"blue.solid"}):(0,r.jsx)(a.Lv,{}),(0,r.jsxs)(o.B,{gap:"1",flex:"1",maxWidth:"100%",children:[e.title&&(0,r.jsx)(a.Sb,{children:e.title}),e.description&&(0,r.jsx)(a.aD,{children:e.description})]}),e.action&&(0,r.jsx)(a.gC,{children:e.action.label}),(null===(t=e.meta)||void 0===t?void 0:t.closable)&&(0,r.jsx)(a.k1,{})]})}})})}},e=>{var t=t=>e(e.s=t);e.O(0,[150,899,347,427,406,330,35,729,586,441,517,358],()=>t(542)),_N_E=e.O()}]);