(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[910],{60410:(e,l,i)=>{Promise.resolve().then(i.bind(i,86584))},86584:(e,l,i)=>{"use strict";i.r(l),i.d(l,{default:()=>G});var n=i(95155),r=i(17425),a=i(18345),t=i(27703),s=i(54416),o=i(35923),c=i(69803),_=i(31010),E=i(72581),d=i(12115),u=i(60462),T=i(65606),g=i(48005),R=i(50263),I=i(21571),S=i(7520);let h={topDeadzone:0,bottomDeadzone:0,pressAccuracy:0,releaseAccuracy:0};function A(){let{defaultProfile:e,updateProfileDetails:l,resetProfileDetails:i,rebootSystem:A}=(0,T.l)(),[G,C]=(0,g.A)(),{t:x}=(0,S.o)(),[O,p]=(0,d.useState)(0),[f,v]=(0,d.useState)([]),[N,j]=(0,d.useState)(!1),[B,D]=(0,d.useState)({...h}),L=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];(0,d.useEffect)(()=>{var l,i,n;let r={...e.triggerConfigs};j(null!==(i=r.isAllBtnsConfiguring)&&void 0!==i&&i),v(L.map(e=>{var l,i;return null!==(i=null===(l=r.triggerConfigs)||void 0===l?void 0:l[e])&&void 0!==i?i:h})),D(null!==(n=null===(l=r.triggerConfigs)||void 0===l?void 0:l[0])&&void 0!==n?n:h),null==C||C(!1)},[e]);let b=()=>{var e;return null===O?h:null!==(e=f[O])&&void 0!==e?e:h},w=(e,l)=>{null!==O&&(f[O]={...b(),[e]:l},v(f))},P=(e,l)=>{D({...B,[e]:l})},k=e=>{!0===e&&D({...B,...b()}),j(e)},y=async()=>{let i=e.id;if(N){let e=[];L.forEach((l,i)=>{e[i]=B}),await l(i,{id:i,triggerConfigs:{isAllBtnsConfiguring:N,triggerConfigs:e}})}else await l(i,{id:i,triggerConfigs:{isAllBtnsConfiguring:N,triggerConfigs:f}})},m=e=>{console.log("handleButtonClick: ",e),!N&&O!==e&&e>=0&&p(e)};return(0,n.jsxs)(r.s,{direction:"row",width:"1700px",padding:"18px",children:[(0,n.jsx)(a.o,{width:"100%",flex:1,children:(0,n.jsx)(u.A,{onClick:e=>m(e),highlightIds:N?L:[null!=O?O:-1],interactiveIds:L})}),(0,n.jsx)(a.o,{width:"700px",children:(0,n.jsx)(t.Rs,{width:"100%",children:(0,n.jsxs)(s.B,{direction:"column",gap:4,children:[(0,n.jsx)(t.u4,{fontSize:"2rem",color:"green.600",children:x.SETTINGS_RAPID_TRIGGER_TITLE}),(0,n.jsx)(t.yR,{fontSize:"smaller",color:"gray.400",children:(0,n.jsx)(o.E,{whiteSpace:"pre-wrap",children:x.SETTINGS_RAPID_TRIGGER_HELPER_TEXT})}),(0,n.jsx)(t.CZ,{pt:"30px",children:(0,n.jsxs)(s.B,{gap:6,children:[(0,n.jsx)(E.d,{colorPalette:"green",checked:N,onChange:()=>{k(!N),null==C||C(!0)},children:x.SETTINGS_RAPID_TRIGGER_CONFIGURE_ALL}),(0,n.jsxs)(o.E,{color:N?"gray.700":"green.400",children:[null===O||N?x.SETTINGS_RAPID_TRIGGER_SELECT_A_BUTTON_TO_CONFIGURE:x.SETTINGS_RAPID_TRIGGER_ONFIGURING_BUTTON,null!==O&&!N&&(0,n.jsxs)(o.E,{as:"span",fontWeight:"bold",children:["KEY-",(null!=O?O:0)+1]})]}),[{key:"topDeadzone",label:x.SETTINGS_RAPID_TRIGGER_TOP_DEADZONE_LABEL},{key:"bottomDeadzone",label:x.SETTINGS_RAPID_TRIGGER_BOTTOM_DEADZONE_LABEL},{key:"pressAccuracy",label:x.SETTINGS_RAPID_TRIGGER_PRESS_ACCURACY_LABEL},{key:"releaseAccuracy",label:x.SETTINGS_RAPID_TRIGGER_RELEASE_ACCURACY_LABEL}].map(e=>{let{key:l,label:i}=e;return(0,n.jsxs)(s.B,{gap:6,children:[(0,n.jsx)(_.A,{label:i,value:[N?B[l]:b()[l]],colorPalette:"green",min:0,max:1,step:.1,onValueChange:e=>{N?P(l,e.value[0]):w(l,e.value[0]),null==C||C(!0)},disabled:null===O&&!N,width:"400px",marks:[{value:0,label:"0"},{value:.2,label:"0.2"},{value:.4,label:"0.4"},{value:.6,label:"0.6"},{value:.8,label:"0.8"},{value:1,label:"1"}]}),(0,n.jsxs)(o.E,{fontSize:"sm",color:"gray.400",children:["Value: ",N?B[l]:b()[l]]})]},l)}),(0,n.jsxs)(s.B,{direction:"row",gap:4,justifyContent:"flex-start",padding:"32px 0px",children:[(0,n.jsx)(c.$,{colorPalette:"teal",variant:"surface",size:"lg",width:"140px",onClick:i,children:x.BUTTON_RESET}),(0,n.jsx)(c.$,{colorPalette:"green",size:"lg",width:"140px",onClick:y,children:x.BUTTON_SAVE}),(0,n.jsx)(c.$,{colorPalette:"blue",variant:"surface",size:"lg",width:"180px",onClick:async()=>{await (0,I.X)({title:x.DIALOG_REBOOT_CONFIRM_TITLE,message:x.DIALOG_REBOOT_CONFIRM_MESSAGE})&&(await y(),await A(),(0,R.Dh)({title:x.DIALOG_REBOOT_SUCCESS_TITLE,status:"success",message:x.DIALOG_REBOOT_SUCCESS_MESSAGE}))},children:x.BUTTON_REBOOT_WITH_SAVING})]})]})})]})})})]})}function G(){return(0,n.jsx)(A,{})}}},e=>{var l=l=>e(e.s=l);e.O(0,[852,96,223,358],()=>l(60410)),_N_E=e.O()}]);