(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[25],{5875:(e,t,n)=>{Promise.resolve().then(n.bind(n,7857))},9e3:(e,t,n)=>{"use strict";var r=n(2712);n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}}),n.o(r,"useRouter")&&n.d(t,{useRouter:function(){return r.useRouter}})},2130:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let r=n(3638)._(n(3586));function o(e,t){var n;let o={};"function"==typeof e&&(o.loader=e);let a={...o,...t};return(0,r.default)({...a,modules:null==(n=a.loadableGenerated)?void 0:n.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3489:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return o}});let r=n(5333);function o(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new r.BailoutToCSRError(t);return n}},3586:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let r=n(4001),o=n(7749),a=n(3489),l=n(8764);function s(e){return{default:e&&"default"in e?e.default:e}}let i={loader:()=>Promise.resolve(s(()=>null)),loading:null,ssr:!0},u=function(e){let t={...i,...e},n=(0,o.lazy)(()=>t.loader().then(s)),u=t.loading;function d(e){let s=u?(0,r.jsx)(u,{isLoading:!0,pastDelay:!0,error:null}):null,i=!t.ssr||!!t.loading,d=i?o.Suspense:o.Fragment,c=t.ssr?(0,r.jsxs)(r.Fragment,{children:["undefined"==typeof window?(0,r.jsx)(l.PreloadChunks,{moduleIds:t.modules}):null,(0,r.jsx)(n,{...e})]}):(0,r.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,r.jsx)(n,{...e})});return(0,r.jsx)(d,{...i?{fallback:s}:{},children:c})}return d.displayName="LoadableComponent",d}},8764:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadChunks",{enumerable:!0,get:function(){return s}});let r=n(4001),o=n(9864),a=n(3467),l=n(5826);function s(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=a.workAsyncStorage.getStore();if(void 0===n)return null;let s=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files;s.push(...t)}}return 0===s.length?null:(0,r.jsx)(r.Fragment,{children:s.map(e=>{let t=n.assetPrefix+"/_next/"+(0,l.encodeURIPath)(e);return e.endsWith(".css")?(0,r.jsx)("link",{precedence:"dynamic",href:t,rel:"stylesheet",as:"style"},e):((0,o.preload)(t,{as:"script",fetchPriority:"low"}),null)})})}},4664:(e,t,n)=>{"use strict";n.d(t,{FX:()=>l,jH:()=>s});var r=n(7749),o=n(4001),a=r.createContext(void 0),l=e=>{let{dir:t,children:n}=e;return(0,o.jsx)(a.Provider,{value:t,children:n})};function s(e){let t=r.useContext(a);return e||t||"ltr"}},5120:(e,t,n)=>{"use strict";n.d(t,{T:()=>o});var r=n(7749);function o(e,t,n=function e(t,n){return Array.isArray(t)&&Array.isArray(n)?n.length!==t.length||t.some((t,r)=>e(t,n[r])):t!==n}){let[a,l]=(0,r.useState)(e);n(a,e)&&(t(e,a),l(e))}},9810:(e,t,n)=>{},7906:(e,t,n)=>{"use strict";n.d(t,{T:()=>r.T});var r=n(5120);n(9810)},6959:(e,t,n)=>{"use strict";n.d(t,{s9:()=>a});var r=n(7749);let o=(0,r.createContext)({text:{search:"Search",searchNoResult:"No results found",toc:"On this page",tocNoHeadings:"No Headings",lastUpdate:"Last updated on",chooseLanguage:"Choose a language",nextPage:"Next",previousPage:"Previous",chooseTheme:"Theme",editOnGithub:"Edit on GitHub"}});function a(){return(0,r.useContext)(o)}},2839:(e,t,n)=>{"use strict";n.d(t,{$A:()=>l,YL:()=>i});var r=n(4001),o=n(7749);let a=(0,o.createContext)({enabled:!1,hotKey:[],setOpenSearch:()=>void 0});function l(){return(0,o.useContext)(a)}function s(){let[e,t]=(0,o.useState)("⌘");return(0,o.useEffect)(()=>{window.navigator.userAgent.includes("Windows")&&t("Ctrl")},[]),e}function i(e){let{SearchDialog:t,children:n,preload:l=!0,options:i,hotKey:u=[{key:e=>e.metaKey||e.ctrlKey,display:(0,r.jsx)(s,{})},{key:"k",display:"K"}],links:d}=e,[c,m]=(0,o.useState)(!l&&void 0);return(0,o.useEffect)(()=>{let e=e=>{u.every(t=>"string"==typeof t.key?e.key===t.key:t.key(e))&&(m(!0),e.preventDefault())};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},[u]),(0,r.jsxs)(a.Provider,{value:(0,o.useMemo)(()=>({enabled:!0,hotKey:u,setOpenSearch:m}),[u]),children:[void 0!==c&&(0,r.jsx)(t,{open:c,onOpenChange:m,links:d,...i}),n]})}},8135:(e,t,n)=>{"use strict";n.d(t,{G:()=>c,c:()=>d});var r=n(4001),o=n(7749),a=n(9e3);n(9810);var l=(0,o.createContext)(void 0);function s(e){var t,n;let[a,s]=(0,o.useState)(!1);return(0,r.jsx)(l.Provider,{value:[null!==(t=e.open)&&void 0!==t?t:a,null!==(n=e.onOpenChange)&&void 0!==n?n:s],children:e.children})}var i=n(7906);let u=(0,o.createContext)(void 0);function d(){let e=(0,o.useContext)(u);if(!e)throw Error("Missing root provider");return e}function c({children:e}){let t=(0,o.useRef)(!0),[n,l]=(0,o.useState)(!1),[d,c]=(0,o.useState)(!1),m=(0,a.usePathname)();return(0,i.T)(m,()=>{t.current&&l(!1),t.current=!0}),(0,r.jsx)(u.Provider,{value:(0,o.useMemo)(()=>({open:n,setOpen:l,collapsed:d,setCollapsed:c,closeOnRedirect:t}),[n,d]),children:(0,r.jsx)(s,{open:n,onOpenChange:l,children:e})})}},7857:(e,t,n)=>{"use strict";n.d(t,{RootProvider:()=>S});var r=n(4001),o=n(7749),a=(e,t,n,r,o,a,l,s)=>{let i=document.documentElement,u=["light","dark"];function d(t){(Array.isArray(e)?e:[e]).forEach(e=>{let n="class"===e,r=n&&a?o.map(e=>a[e]||e):o;n?(i.classList.remove(...r),i.classList.add(t)):i.setAttribute(e,t)}),s&&u.includes(t)&&(i.style.colorScheme=t)}if(r)d(r);else try{let e=localStorage.getItem(t)||n,r=l&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;d(r)}catch(e){}},l=["light","dark"],s="(prefers-color-scheme: dark)",i="undefined"==typeof window,u=o.createContext(void 0),d=e=>o.useContext(u)?o.createElement(o.Fragment,null,e.children):o.createElement(m,{...e}),c=["light","dark"],m=e=>{let{forcedTheme:t,disableTransitionOnChange:n=!1,enableSystem:r=!0,enableColorScheme:a=!0,storageKey:i="theme",themes:d=c,defaultTheme:m=r?"system":"light",attribute:v="data-theme",value:g,children:b,nonce:w,scriptProps:x}=e,[C,S]=o.useState(()=>h(i,m)),[j,k]=o.useState(()=>h(i)),P=g?Object.values(g):d,E=o.useCallback(e=>{let t=e;if(!t)return;"system"===e&&r&&(t=p());let o=g?g[t]:t,s=n?y(w):null,i=document.documentElement,u=e=>{"class"===e?(i.classList.remove(...P),o&&i.classList.add(o)):e.startsWith("data-")&&(o?i.setAttribute(e,o):i.removeAttribute(e))};if(Array.isArray(v)?v.forEach(u):u(v),a){let e=l.includes(m)?m:null,n=l.includes(t)?t:e;i.style.colorScheme=n}null==s||s()},[w]),T=o.useCallback(e=>{let t="function"==typeof e?e(C):e;S(t);try{localStorage.setItem(i,t)}catch(e){}},[C]),O=o.useCallback(e=>{k(p(e)),"system"===C&&r&&!t&&E("system")},[C,t]);o.useEffect(()=>{let e=window.matchMedia(s);return e.addListener(O),O(e),()=>e.removeListener(O)},[O]),o.useEffect(()=>{let e=e=>{e.key===i&&(e.newValue?S(e.newValue):T(m))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[T]),o.useEffect(()=>{E(null!=t?t:C)},[t,C]);let _=o.useMemo(()=>({theme:C,setTheme:T,forcedTheme:t,resolvedTheme:"system"===C?j:C,themes:r?[...d,"system"]:d,systemTheme:r?j:void 0}),[C,T,t,j,r,d]);return o.createElement(u.Provider,{value:_},o.createElement(f,{forcedTheme:t,storageKey:i,attribute:v,enableSystem:r,enableColorScheme:a,defaultTheme:m,value:g,themes:d,nonce:w,scriptProps:x}),b)},f=o.memo(e=>{let{forcedTheme:t,storageKey:n,attribute:r,enableSystem:l,enableColorScheme:s,defaultTheme:i,value:u,themes:d,nonce:c,scriptProps:m}=e,f=JSON.stringify([r,n,i,t,d,u,l,s]).slice(1,-1);return o.createElement("script",{...m,suppressHydrationWarning:!0,nonce:"undefined"==typeof window?c:"",dangerouslySetInnerHTML:{__html:"(".concat(a.toString(),")(").concat(f,")")}})}),h=(e,t)=>{let n;if(!i){try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},y=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},p=e=>(e||(e=window.matchMedia(s)),e.matches?"dark":"light"),v=n(2130),g=n.n(v),b=n(4664),w=n(8135),x=n(2839);n(6959),n(9e3),n(9810);let C=g()(()=>Promise.all([n.e(540),n.e(596)]).then(n.bind(n,2596)),{loadableGenerated:{webpack:()=>[require.resolveWeak("./components/dialog/search-default")]},ssr:!1});function S(e){let{children:t,dir:n,theme:{enabled:o=!0,...a}={},search:l}=e,s=t;return(null==l?void 0:l.enabled)!==!1&&(s=(0,r.jsx)(x.YL,{SearchDialog:C,...l,children:s})),o&&(s=(0,r.jsx)(d,{attribute:"class",defaultTheme:"system",enableSystem:!0,disableTransitionOnChange:!0,...a,children:s})),(0,r.jsx)(b.FX,{dir:null!=n?n:"ltr",children:(0,r.jsx)(w.G,{children:s})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[142,767,358],()=>t(5875)),_N_E=e.O()}]);