(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[347],{1346:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/result",function(){return s(3669)}])},2552:()=>{},3669:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>g});var n=s(7876),r=s(4250),i=s.n(r),o=s(4232),a=s(9099),c=s(1367),l=s(75),d=s(1928),u=s(953),h=s(5306);s(6120);var m=s(8230),p=s.n(m),f=s(7328),x=s.n(f);function g(){let e=(0,a.useRouter)(),[t,s]=(0,o.useState)([]),[r,m]=(0,o.useState)({});(0,o.useEffect)(()=>{let t=localStorage.getItem("testResult");if(t){let e=JSON.parse(t);console.log("Parsed Questions:",e.questions),s(e.questions),m(e.userAnswers||{})}else alert("No result data found. Redirecting to home."),e.push("/")},[e]);let f=t.filter((e,t)=>{let s=r[t]||[],n=e.correctOptions.map(t=>e.options[t.charCodeAt(0)-65]);return s.length>0&&n.every(e=>s.includes(e))&&s.length===n.length}).length,g=e=>{let s={};return t.forEach((t,n)=>{let i=t[e]||"N/A";s[i]||(s[i]={correct:0,total:0});let o=r[n]||[],a=t.correctOptions.map(e=>t.options[e.charCodeAt(0)-65]);s[i].total+=1,o.length>0&&a.every(e=>o.includes(e))&&o.length===a.length&&(s[i].correct+=1)}),s},b=g("section"),j=g("subject");return(0,n.jsxs)("div",{className:"jsx-e656508ad3b2101f min-h-screen p-8 flex flex-col gap-8 bg-white dark:bg-gray-900 text-black dark:text-white",children:[(0,n.jsxs)(x(),{children:[(0,n.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/img/apple-touch-icon.png",className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/img/favicon-32x32.png",className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/img/favicon-16x16.png",className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("link",{rel:"icon",type:"image/x-icon",href:"/favicon.ico",className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("link",{rel:"manifest",href:"/site.webmanifest",className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("meta",{property:"og:image",content:"".concat("https://rrjanbiah.github.io/mockguru","/img/og-image.png"),className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("meta",{property:"og:title",content:"Results | MockGuru",className:"jsx-e656508ad3b2101f"})," ",(0,n.jsx)("meta",{property:"og:description",content:"View your MockGuru test results and analyze your performance for JEE, NEET, UPSC, and more.",className:"jsx-e656508ad3b2101f"})," ",(0,n.jsx)("meta",{property:"og:url",content:"https://rrjanbiah.github.io/mockguru",className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("meta",{name:"twitter:card",content:"summary_large_image",className:"jsx-e656508ad3b2101f"}),(0,n.jsx)("title",{className:"jsx-e656508ad3b2101f",children:"Results | MockGuru"})," "]}),(0,n.jsx)("h1",{className:"jsx-e656508ad3b2101f text-2xl font-bold",children:"Test Results"}),(0,n.jsxs)("div",{className:"jsx-e656508ad3b2101f p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm",children:[(0,n.jsx)("h2",{className:"jsx-e656508ad3b2101f text-2xl font-bold mb-2",children:"Score"}),(0,n.jsxs)("p",{className:"jsx-e656508ad3b2101f text-lg",children:["You answered ",(0,n.jsx)("strong",{className:"jsx-e656508ad3b2101f",children:f})," out of"," ",(0,n.jsx)("strong",{className:"jsx-e656508ad3b2101f",children:t.length})," questions correctly."]}),(0,n.jsxs)("p",{className:"jsx-e656508ad3b2101f text-lg",children:["Your score:"," ",(0,n.jsxs)("strong",{className:"jsx-e656508ad3b2101f",children:[(f/t.length*100).toFixed(2),"%"]})]}),(0,n.jsx)("h3",{className:"jsx-e656508ad3b2101f text-xl font-bold mt-4",children:"Scores by Section"}),(0,n.jsx)("ul",{className:"jsx-e656508ad3b2101f list-disc pl-6",children:Object.entries(b).map(e=>{let[t,s]=e;return(0,n.jsxs)("li",{className:"jsx-e656508ad3b2101f",children:[(0,n.jsxs)("strong",{className:"jsx-e656508ad3b2101f",children:[t,":"]})," ",s.correct," / ",s.total," (",(s.correct/s.total*100).toFixed(2),"%)"]},t)})}),(0,n.jsx)("h3",{className:"jsx-e656508ad3b2101f text-xl font-bold mt-4",children:"Scores by Subject"}),(0,n.jsx)("ul",{className:"jsx-e656508ad3b2101f list-disc pl-6",children:Object.entries(j).map(e=>{let[t,s]=e;return(0,n.jsxs)("li",{className:"jsx-e656508ad3b2101f",children:[(0,n.jsxs)("strong",{className:"jsx-e656508ad3b2101f",children:[t,":"]})," ",s.correct," / ",s.total," (",(s.correct/s.total*100).toFixed(2),"%)"]},t)})})]}),(0,n.jsx)("div",{className:"jsx-e656508ad3b2101f flex flex-col gap-4",children:t.map((e,t)=>{let s=r[t]||[],i=e.correctOptions.map(t=>e.options[t.charCodeAt(0)-65]),o=s.length>0&&i.every(e=>s.includes(e))&&s.length===i.length;return(0,n.jsxs)("div",{className:"jsx-e656508ad3b2101f p-4 border rounded-md shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white print:border-none print:shadow-none",children:[(0,n.jsxs)("h2",{className:"jsx-e656508ad3b2101f font-medium",children:[(0,n.jsxs)("span",{className:"jsx-e656508ad3b2101f font-bold",children:["Q",t+1,":"]})," "," ",(0,n.jsx)(c.oz,{rehypePlugins:[l.A],remarkPlugins:[d.A,u.A,h.A],children:e.question})]}),(0,n.jsx)("ul",{className:"jsx-e656508ad3b2101f list-none space-y-2 mt-2",children:e.options.map((e,t)=>(0,n.jsx)("li",{className:"jsx-e656508ad3b2101f "+"p-2 rounded-md ".concat(i.includes(e)?"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":s.includes(e)?"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":"bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-300"),children:(0,n.jsx)(c.oz,{rehypePlugins:[l.A],remarkPlugins:[d.A],children:"".concat(String.fromCharCode(65+t),". ").concat(e)})},t))}),(0,n.jsxs)("p",{className:"jsx-e656508ad3b2101f mt-4",children:[(0,n.jsx)("strong",{className:"jsx-e656508ad3b2101f",children:"Result:"})," ",0===s.length?(0,n.jsx)("span",{className:"jsx-e656508ad3b2101f text-yellow-600",children:"⚠️ Skipped"}):o?(0,n.jsx)("span",{className:"jsx-e656508ad3b2101f text-green-600",children:"✅ Correct"}):(0,n.jsx)("span",{className:"jsx-e656508ad3b2101f text-red-600",children:"❌ Incorrect"})]}),e.explanation&&(0,n.jsxs)("div",{className:"jsx-e656508ad3b2101f mt-4",children:[(0,n.jsx)("strong",{className:"jsx-e656508ad3b2101f",children:"Explanation:"}),(0,n.jsx)(c.oz,{rehypePlugins:[l.A],remarkPlugins:[d.A,u.A,h.A],children:e.explanation.replace(/\\n/g,"\n")})]})]},t)})}),(0,n.jsx)("button",{onClick:()=>{let e="I will give you a list of questions from a mock test, including the exam name, section, subject, my answer, the correct answer, and the explanation for each. Based on this, analyze my strengths and weaknesses. Identify which areas I’m strong in and which topics need improvement. Then, provide detailed recommendations to help me improve in the weak areas. Here is the data:\n\nTotal Questions: ".concat(t.length,"\n\n```\n"),s=t.map((e,t)=>{let s=r[t]||[],n=e.correctOptions.map(t=>e.options[t.charCodeAt(0)-65]),i=s.length>0&&n.every(e=>s.includes(e))&&s.length===n.length,o=e.options.map((e,t)=>"".concat(String.fromCharCode(65+t),". ").concat(e).concat(n.includes(e)?" (Correct)":"").concat(s.includes(e)?" (Your Choice)":"")).join("\n");return"Q".concat(t+1,": ").concat(e.question,"\nExam: ").concat(e.exam,"\nSection: ").concat(e.section,"\nSubject: ").concat(e.subject,"\nOptions:\n").concat(o,"\nResult: ").concat(0===s.length?"⚠️ Skipped":i?"✅ Correct":"❌ Incorrect").concat(e.explanation?"\nExplanation: ".concat(e.explanation.replace(/\\n/g,"\n")):"")}).join("\n\n---\n\n");navigator.clipboard.writeText(e+s+"\n```"),alert("Result with ChatGPT prompt copied to clipboard!")},className:"jsx-e656508ad3b2101f px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer",children:"Copy for ChatGPT"}),(0,n.jsx)(p(),{href:"/",className:"mt-4 text-blue-500 hover:underline text-center",children:"Go back to the homepage"}),(0,n.jsx)(i(),{id:"e656508ad3b2101f",children:"@media print{body{background:white;color:black}.print\\:border-none{border:none!important}.print\\:shadow-none{-webkit-box-shadow:none!important;-moz-box-shadow:none!important;box-shadow:none!important}}"})]})}},4250:(e,t,s)=>{"use strict";e.exports=s(8817).style},8817:(e,t,s)=>{"use strict";var n=s(5364);s(2552);var r=s(4232),i=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(r),o=void 0!==n&&n.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},c=function(){function e(e){var t=void 0===e?{}:e,s=t.name,n=void 0===s?"stylesheet":s,r=t.optimizeForSpeed,i=void 0===r?o:r;l(a(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",l("boolean"==typeof i,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=i,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var c=document.querySelector('meta[property="csp-nonce"]');this._nonce=c?c.getAttribute("content"):null}var t=e.prototype;return t.setOptimizeForSpeed=function(e){l("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),l(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},t.isOptimizeForSpeed=function(){return this._optimizeForSpeed},t.inject=function(){var e=this;if(l(!this._injected,"sheet already injected"),this._injected=!0,this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,s){return"number"==typeof s?e._serverSheet.cssRules[s]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),s},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},t.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},t.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},t.insertRule=function(e,t){if(l(a(e),"`insertRule` accepts only strings"),this._optimizeForSpeed){var s=this.getSheet();"number"!=typeof t&&(t=s.cssRules.length);try{s.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},t.replaceRule=function(e,t){if(this._optimizeForSpeed){var s=this.getSheet();if(t.trim()||(t=this._deletedRulePlaceholder),!s.cssRules[e])return e;s.deleteRule(e);try{s.insertRule(t,e)}catch(n){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),s.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];l(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},t.deleteRule=function(e){if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];l(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},t.flush=function(){this._injected=!1,this._rulesCount=0,this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]},t.cssRules=function(){var e=this;return this._tags.reduce(function(t,s){return s?t=t.concat(Array.prototype.map.call(e.getSheetForTag(s).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},t.makeStyleTag=function(e,t,s){t&&l(a(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var r=document.head||document.getElementsByTagName("head")[0];return s?r.insertBefore(n,s):r.appendChild(n),n},function(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,[{key:"length",get:function(){return this._rulesCount}}]),e}();function l(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,s=e.length;s;)t=33*t^e.charCodeAt(--s);return t>>>0},u={};function h(e,t){if(!t)return"jsx-"+e;var s=String(t),n=e+s;return u[n]||(u[n]="jsx-"+d(e+"-"+s)),u[n]}function m(e,t){var s=e+t;return u[s]||(u[s]=t.replace(/__jsx-style-dynamic-selector/g,e)),u[s]}var p=function(){function e(e){var t=void 0===e?{}:e,s=t.styleSheet,n=void 0===s?null:s,r=t.optimizeForSpeed,i=void 0!==r&&r;this._sheet=n||new c({name:"styled-jsx",optimizeForSpeed:i}),this._sheet.inject(),n&&"boolean"==typeof i&&(this._sheet.setOptimizeForSpeed(i),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var s=this.getIdAndRules(e),n=s.styleId,r=s.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var i=r.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=i,this._instancesCounts[n]=1},t.remove=function(e){var t=this,s=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(s in this._instancesCounts,"styleId: `"+s+"` not found"),this._instancesCounts[s]-=1,this._instancesCounts[s]<1){var n=this._fromServer&&this._fromServer[s];n?(n.parentNode.removeChild(n),delete this._fromServer[s]):(this._indices[s].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[s]),delete this._instancesCounts[s]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],s=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return s[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,s;return t=this.cssRules(),void 0===(s=e)&&(s={}),t.map(function(e){var t=e[0],n=e[1];return i.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:s.nonce?s.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},t.getIdAndRules=function(e){var t=e.children,s=e.dynamic,n=e.id;if(s){var r=h(n,s);return{styleId:r,rules:Array.isArray(t)?t.map(function(e){return m(r,e)}):[m(r,t)]}}return{styleId:h(n),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),f=r.createContext(null);f.displayName="StyleSheetContext";var x=i.default.useInsertionEffect||i.default.useLayoutEffect,g=new p;function b(e){var t=g||r.useContext(f);return t&&x(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)]),null}b.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},t.style=b}},e=>{var t=t=>e(e.s=t);e.O(0,[333,695,27,372,636,593,792],()=>t(1346)),_N_E=e.O()}]);