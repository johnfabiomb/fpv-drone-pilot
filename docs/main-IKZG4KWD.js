import{a as b,b as v,c as w,d as A,e as R,g as F}from"./chunk-2XHQNURZ.js";import{d as _,k as x}from"./chunk-LVZZRJM4.js";import{Ka as u,Ma as f,N as l,Oa as C,P as c,Pa as M,Qa as P,V as d,Y as g,aa as h,ab as O,nb as y,qa as m}from"./chunk-SOU5UP3M.js";import"./chunk-CWTPBX7D.js";var I=[{path:"",loadComponent:()=>import("./chunk-OPRVWT2K.js").then(r=>r.HomeComponent)},{path:"malta",loadComponent:()=>import("./chunk-HS5ANO4R.js").then(r=>r.MaltaMapComponent)}];var j="@",k=(()=>{let e=class e{constructor(n,o,i,a,s){this.doc=n,this.delegate=o,this.zone=i,this.animationType=a,this.moduleImpl=s,this._rendererFactoryPromise=null,this.scheduler=d(f,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-3R7AMXJK.js")).catch(o=>{throw new l(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:i})=>{this._engine=o(this.animationType,this.doc,this.scheduler);let a=new i(this.delegate,this._engine,this.zone);return this.delegate=a,a})}createRenderer(n,o){let i=this.delegate.createRenderer(n,o);if(i.\u0275type===0)return i;typeof i.throwOnSyntheticProps=="boolean"&&(i.throwOnSyntheticProps=!1);let a=new p(i);return o?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(s=>{let S=s.createRenderer(n,o);a.use(S)}).catch(s=>{a.use(i)}),a}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(o){u()},e.\u0275prov=c({token:e,factory:e.\u0275fac});let r=e;return r})(),p=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let t of this.replay)t(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,t){return this.delegate.createElement(e,t)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,t){this.delegate.appendChild(e,t)}insertBefore(e,t,n,o){this.delegate.insertBefore(e,t,n,o)}removeChild(e,t,n){this.delegate.removeChild(e,t,n)}selectRootElement(e,t){return this.delegate.selectRootElement(e,t)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,t,n,o){this.delegate.setAttribute(e,t,n,o)}removeAttribute(e,t,n){this.delegate.removeAttribute(e,t,n)}addClass(e,t){this.delegate.addClass(e,t)}removeClass(e,t){this.delegate.removeClass(e,t)}setStyle(e,t,n,o){this.delegate.setStyle(e,t,n,o)}removeStyle(e,t,n){this.delegate.removeStyle(e,t,n)}setProperty(e,t,n){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(e,t,n)),this.delegate.setProperty(e,t,n)}setValue(e,t){this.delegate.setValue(e,t)}listen(e,t,n){return this.shouldReplay(t)&&this.replay.push(o=>o.listen(e,t,n)),this.delegate.listen(e,t,n)}shouldReplay(e){return this.replay!==null&&e.startsWith(j)}};function z(r="animations"){return M("NgAsyncAnimations"),h([{provide:C,useFactory:(e,t,n)=>new k(e,t,n,r),deps:[_,b,P]},{provide:m,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var D={providers:[A(I,R()),z()]};var N=(()=>{let e=class e{constructor(){this.title="fpv-pilot",this.map=!1}ngAfterViewInit(){this.map=!0}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=g({type:e,selectors:[["app-root"]],standalone:!0,features:[y],decls:1,vars:0,template:function(o,i){o&1&&O(0,"router-outlet")},dependencies:[w,x,F],styles:["a[_ngcontent-%COMP%]:link, a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover, a[_ngcontent-%COMP%]:active{text-decoration:none}.app[_ngcontent-%COMP%]{height:100dvh;display:flex;flex-direction:column}.app[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{height:auto;padding:10px 20px;box-sizing:border-box;display:flex;justify-content:center;align-items:center;gap:10px;background-color:#000;color:#fff}.app[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.app[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:0;font-size:30px;gap:5px}.app[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{display:flex;border-radius:50%;overflow:hidden}.app[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px;border-radius:50%;height:30px}.app[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .group[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{font-size:10px;font-weight:300}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{bottom:0;width:100%;height:60px;padding:10px 20px;box-sizing:border-box;display:flex;justify-content:end;align-items:center;background-color:#000;color:#fff;gap:10px}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]{text-align:start}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{font-size:14px;font-weight:600}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:12px;color:gray;font-weight:300}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%]   .user[_ngcontent-%COMP%]{font-size:14px;font-weight:300}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .profile-picture[_ngcontent-%COMP%]{padding:3px;box-sizing:border-box;border-radius:50%}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .fa-instagram[_ngcontent-%COMP%]{font-size:30px}.app[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]   .pb[_ngcontent-%COMP%]{font-weight:200}"]});let r=e;return r})();v(N,D).catch(r=>console.error(r));