import{Ja as h,La as p,O as A,P as a,Q as S,Ra as m,S as D,U as l,V as f,Z as _,_ as g,la as b,wb as v}from"./chunk-SOU5UP3M.js";var T=null;function F(){return T}function Ve(n){T??=n}var I=class{};var P=new D(""),k=(()=>{let e=class e{historyGo(t){throw new Error("")}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=a({token:e,factory:()=>f(V),providedIn:"platform"});let n=e;return n})();var V=(()=>{let e=class e extends k{constructor(){super(),this._doc=f(P),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return F().getBaseHref(this._doc)}onPopState(t){let i=F().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=F().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=a({token:e,factory:()=>new e,providedIn:"platform"});let n=e;return n})();function N(n,e){if(n.length==0)return e;if(e.length==0)return n;let s=0;return n.endsWith("/")&&s++,e.startsWith("/")&&s++,s==2?n+e.substring(1):s==1?n+e:n+"/"+e}function M(n){let e=n.match(/#|\?|$/),s=e&&e.index||n.length,t=s-(n[s-1]==="/"?1:0);return n.slice(0,t)+n.slice(s)}function c(n){return n&&n[0]!=="?"?"?"+n:n}var E=(()=>{let e=class e{historyGo(t){throw new Error("")}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=a({token:e,factory:()=>f(H),providedIn:"root"});let n=e;return n})(),G=new D(""),H=(()=>{let e=class e extends E{constructor(t,i){super(),this._platformLocation=t,this._removeListenerFns=[],this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??f(P).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return N(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+c(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,o){let u=this.prepareExternalUrl(r+c(o));this._platformLocation.pushState(t,i,u)}replaceState(t,i,r,o){let u=this.prepareExternalUrl(r+c(o));this._platformLocation.replaceState(t,i,u)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}};e.\u0275fac=function(i){return new(i||e)(l(k),l(G,8))},e.\u0275prov=a({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var Y=(()=>{let e=class e{constructor(t){this._subject=new b,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=K(M(L(i))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+c(i))}normalize(t){return e.stripTrailingSlash(Z(this._basePath,L(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+c(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+c(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i,complete:r})}};e.normalizeQueryParams=c,e.joinWithSlash=N,e.stripTrailingSlash=M,e.\u0275fac=function(i){return new(i||e)(l(E))},e.\u0275prov=a({token:e,factory:()=>W(),providedIn:"root"});let n=e;return n})();function W(){return new Y(l(E))}function Z(n,e){if(!n||!e.startsWith(n))return e;let s=e.substring(n.length);return s===""||["/",";","?","#"].includes(s[0])?s:e}function L(n){return n.replace(/\/index.html$/,"")}function K(n){if(new RegExp("^(https?:)?//").test(n)){let[,s]=n.split(/\/\/[^\/]+/);return s}return n}function Ge(n,e){e=encodeURIComponent(e);for(let s of n.split(";")){let t=s.indexOf("="),[i,r]=t==-1?[s,""]:[s.slice(0,t),s.slice(t+1)];if(i.trim()===e)return decodeURIComponent(r)}return null}var y=class{constructor(e,s,t,i){this.$implicit=e,this.ngForOf=s,this.index=t,this.count=i}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},He=(()=>{let e=class e{set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}constructor(t,i,r){this._viewContainer=t,this._template=i,this._differs=r,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;if(!this._differ&&t)if(0)try{}catch{}else this._differ=this._differs.find(t).create(this.ngForTrackBy)}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let i=this._viewContainer;t.forEachOperation((r,o,u)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new y(r.item,this._ngForOf,-1,-1),u===null?void 0:u);else if(u==null)i.remove(o===null?void 0:o);else if(o!==null){let d=i.get(o);i.move(d,u),R(d,r)}});for(let r=0,o=i.length;r<o;r++){let d=i.get(r).context;d.index=r,d.count=o,d.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let o=i.get(r.currentIndex);R(o,r)})}static ngTemplateContextGuard(t,i){return!0}};e.\u0275fac=function(i){return new(i||e)(h(m),h(p),h(v))},e.\u0275dir=g({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"},standalone:!0});let n=e;return n})();function R(n,e){n.context.$implicit=e.item}var Ye=(()=>{let e=class e{constructor(t,i){this._viewContainer=t,this._context=new C,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){B("ngIfThen",t),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){B("ngIfElse",t),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(t,i){return!0}};e.\u0275fac=function(i){return new(i||e)(h(m),h(p))},e.\u0275dir=g({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"},standalone:!0});let n=e;return n})(),C=class{constructor(){this.$implicit=null,this.ngIf=null}};function B(n,e){if(!!!(!e||e.createEmbeddedView))throw new Error(`${n} must be a TemplateRef, but received '${A(e)}'.`)}var We=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=_({type:e}),e.\u0275inj=S({});let n=e;return n})(),q="browser",X="server";function Ze(n){return n===q}function Ke(n){return n===X}var O=class{};var w=function(n){return n[n.State=0]="State",n[n.Transition=1]="Transition",n[n.Sequence=2]="Sequence",n[n.Group=3]="Group",n[n.Animate=4]="Animate",n[n.Keyframes=5]="Keyframes",n[n.Style=6]="Style",n[n.Trigger=7]="Trigger",n[n.Reference=8]="Reference",n[n.AnimateChild=9]="AnimateChild",n[n.AnimateRef=10]="AnimateRef",n[n.Query=11]="Query",n[n.Stagger=12]="Stagger",n}(w||{}),Qe="*";function Je(n,e=null){return{type:w.Sequence,steps:n,options:e}}function et(n){return{type:w.Style,styles:n,offset:null}}var $=class{constructor(e=0,s=0){this._onDoneFns=[],this._onStartFns=[],this._onDestroyFns=[],this._originalOnDoneFns=[],this._originalOnStartFns=[],this._started=!1,this._destroyed=!1,this._finished=!1,this._position=0,this.parentPlayer=null,this.totalTime=e+s}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(e=>e()),this._onDoneFns=[])}onStart(e){this._originalOnStartFns.push(e),this._onStartFns.push(e)}onDone(e){this._originalOnDoneFns.push(e),this._onDoneFns.push(e)}onDestroy(e){this._onDestroyFns.push(e)}hasStarted(){return this._started}init(){}play(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0}triggerMicrotask(){queueMicrotask(()=>this._onFinish())}_onStart(){this._onStartFns.forEach(e=>e()),this._onStartFns=[]}pause(){}restart(){}finish(){this._onFinish()}destroy(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(e=>e()),this._onDestroyFns=[])}reset(){this._started=!1,this._finished=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}setPosition(e){this._position=this.totalTime?e*this.totalTime:1}getPosition(){return this.totalTime?this._position/this.totalTime:1}triggerCallback(e){let s=e=="start"?this._onStartFns:this._onDoneFns;s.forEach(t=>t()),s.length=0}},x=class{constructor(e){this._onDoneFns=[],this._onStartFns=[],this._finished=!1,this._started=!1,this._destroyed=!1,this._onDestroyFns=[],this.parentPlayer=null,this.totalTime=0,this.players=e;let s=0,t=0,i=0,r=this.players.length;r==0?queueMicrotask(()=>this._onFinish()):this.players.forEach(o=>{o.onDone(()=>{++s==r&&this._onFinish()}),o.onDestroy(()=>{++t==r&&this._onDestroy()}),o.onStart(()=>{++i==r&&this._onStart()})}),this.totalTime=this.players.reduce((o,u)=>Math.max(o,u.totalTime),0)}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(e=>e()),this._onDoneFns=[])}init(){this.players.forEach(e=>e.init())}onStart(e){this._onStartFns.push(e)}_onStart(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(e=>e()),this._onStartFns=[])}onDone(e){this._onDoneFns.push(e)}onDestroy(e){this._onDestroyFns.push(e)}hasStarted(){return this._started}play(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(e=>e.play())}pause(){this.players.forEach(e=>e.pause())}restart(){this.players.forEach(e=>e.restart())}finish(){this._onFinish(),this.players.forEach(e=>e.finish())}destroy(){this._onDestroy()}_onDestroy(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(e=>e.destroy()),this._onDestroyFns.forEach(e=>e()),this._onDestroyFns=[])}reset(){this.players.forEach(e=>e.reset()),this._destroyed=!1,this._finished=!1,this._started=!1}setPosition(e){let s=e*this.totalTime;this.players.forEach(t=>{let i=t.totalTime?Math.min(1,s/t.totalTime):1;t.setPosition(i)})}getPosition(){let e=this.players.reduce((s,t)=>s===null||t.totalTime>s.totalTime?t:s,null);return e!=null?e.getPosition():0}beforeDestroy(){this.players.forEach(e=>{e.beforeDestroy&&e.beforeDestroy()})}triggerCallback(e){let s=e=="start"?this._onStartFns:this._onDoneFns;s.forEach(t=>t()),s.length=0}},tt="!";export{F as a,Ve as b,I as c,P as d,Y as e,Ge as f,He as g,Ye as h,We as i,q as j,Ze as k,Ke as l,O as m,w as n,Qe as o,Je as p,et as q,$ as r,x as s,tt as t};
