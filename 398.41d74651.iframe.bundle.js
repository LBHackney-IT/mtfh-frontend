(self.webpackChunkmtfh_frontend=self.webpackChunkmtfh_frontend||[]).push([[398],{"./packages/react/node_modules/govuk-frontend/govuk/components/accordion/accordion.js":function(module,__unused_webpack_exports,__webpack_require__){module.exports=function(){"use strict";function nodeListForEach(nodes,callback){if(window.NodeList.prototype.forEach)return nodes.forEach(callback);for(var i=0;i<nodes.length;i++)callback.call(window,nodes[i],i,nodes)}function Accordion($module){this.$module=$module,this.moduleId=$module.getAttribute("id"),this.$sections=$module.querySelectorAll(".govuk-accordion__section"),this.$openAllButton="",this.browserSupportsSessionStorage=helper.checkForSessionStorage(),this.controlsClass="govuk-accordion__controls",this.openAllClass="govuk-accordion__open-all",this.iconClass="govuk-accordion__icon",this.sectionHeaderClass="govuk-accordion__section-header",this.sectionHeaderFocusedClass="govuk-accordion__section-header--focused",this.sectionHeadingClass="govuk-accordion__section-heading",this.sectionSummaryClass="govuk-accordion__section-summary",this.sectionButtonClass="govuk-accordion__section-button",this.sectionExpandedClass="govuk-accordion__section--expanded"}(function(undefined){var nativeDefineProperty,supportsAccessors,ERR_ACCESSORS_NOT_SUPPORTED,ERR_VALUE_ACCESSORS;"defineProperty"in Object&&function(){try{var a={};return Object.defineProperty(a,"test",{value:42}),!0}catch(e){return!1}}()||(nativeDefineProperty=Object.defineProperty,supportsAccessors=Object.prototype.hasOwnProperty("__defineGetter__"),ERR_ACCESSORS_NOT_SUPPORTED="Getters & setters cannot be defined on this javascript engine",ERR_VALUE_ACCESSORS="A property cannot both have accessors and be writable or have a value",Object.defineProperty=function defineProperty(object,property,descriptor){if(nativeDefineProperty&&(object===window||object===document||object===Element.prototype||object instanceof Element))return nativeDefineProperty(object,property,descriptor);if(null===object||!(object instanceof Object||"object"==typeof object))throw new TypeError("Object.defineProperty called on non-object");if(!(descriptor instanceof Object))throw new TypeError("Property description must be an object");var propertyString=String(property),hasValueOrWritable="value"in descriptor||"writable"in descriptor,getterType="get"in descriptor&&typeof descriptor.get,setterType="set"in descriptor&&typeof descriptor.set;if(getterType){if("function"!==getterType)throw new TypeError("Getter must be a function");if(!supportsAccessors)throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);if(hasValueOrWritable)throw new TypeError(ERR_VALUE_ACCESSORS);Object.__defineGetter__.call(object,propertyString,descriptor.get)}else object[propertyString]=descriptor.value;if(setterType){if("function"!==setterType)throw new TypeError("Setter must be a function");if(!supportsAccessors)throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);if(hasValueOrWritable)throw new TypeError(ERR_VALUE_ACCESSORS);Object.__defineSetter__.call(object,propertyString,descriptor.set)}return"value"in descriptor&&(object[propertyString]=descriptor.value),object})}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),function(undefined){"bind"in Function.prototype||Object.defineProperty(Function.prototype,"bind",{value:function bind(that){var isCallable,$Array=Array,$Object=Object,ObjectPrototype=$Object.prototype,ArrayPrototype=$Array.prototype,Empty=function Empty(){},to_string=ObjectPrototype.toString,hasToStringTag="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,fnToStr=Function.prototype.toString,tryFunctionObject=function tryFunctionObject(value){try{return fnToStr.call(value),!0}catch(e){return!1}},fnClass="[object Function]",genClass="[object GeneratorFunction]";isCallable=function isCallable(value){if("function"!=typeof value)return!1;if(hasToStringTag)return tryFunctionObject(value);var strClass=to_string.call(value);return strClass===fnClass||strClass===genClass};var array_slice=ArrayPrototype.slice,array_concat=ArrayPrototype.concat,array_push=ArrayPrototype.push,max=Math.max,target=this;if(!isCallable(target))throw new TypeError("Function.prototype.bind called on incompatible "+target);for(var bound,args=array_slice.call(arguments,1),binder=function(){if(this instanceof bound){var result=target.apply(this,array_concat.call(args,array_slice.call(arguments)));return $Object(result)===result?result:this}return target.apply(that,array_concat.call(args,array_slice.call(arguments)))},boundLength=max(0,target.length-args.length),boundArgs=[],i=0;i<boundLength;i++)array_push.call(boundArgs,"$"+i);return bound=Function("binder","return function ("+boundArgs.join(",")+"){ return binder.apply(this, arguments); }")(binder),target.prototype&&(Empty.prototype=target.prototype,bound.prototype=new Empty,Empty.prototype=null),bound}})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),function(undefined){var x;"DOMTokenList"in this&&(!("classList"in(x=document.createElement("x")))||!x.classList.toggle("x",!1)&&!x.className)||function(global){var e;"DOMTokenList"in global&&global.DOMTokenList&&(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg")||document.createElementNS("http://www.w3.org/2000/svg","svg").classList instanceof DOMTokenList)||(global.DOMTokenList=function(){var dpSupport=!0,defineGetter=function(object,name,fn,configurable){Object.defineProperty?Object.defineProperty(object,name,{configurable:!1===dpSupport||!!configurable,get:fn}):object.__defineGetter__(name,fn)};try{defineGetter({},"support")}catch(e){dpSupport=!1}return function(el,prop){var that=this,tokens=[],tokenMap={},length=0,maxLength=0,addIndexGetter=function(i){defineGetter(that,i,(function(){return preop(),tokens[i]}),!1)},reindex=function(){if(length>=maxLength)for(;maxLength<length;++maxLength)addIndexGetter(maxLength)},preop=function(){var error,i,args=arguments,rSpace=/\s+/;if(args.length)for(i=0;i<args.length;++i)if(rSpace.test(args[i]))throw(error=new SyntaxError('String "'+args[i]+'" contains an invalid character')).code=5,error.name="InvalidCharacterError",error;for(""===(tokens="object"==typeof el[prop]?(""+el[prop].baseVal).replace(/^\s+|\s+$/g,"").split(rSpace):(""+el[prop]).replace(/^\s+|\s+$/g,"").split(rSpace))[0]&&(tokens=[]),tokenMap={},i=0;i<tokens.length;++i)tokenMap[tokens[i]]=!0;length=tokens.length,reindex()};return preop(),defineGetter(that,"length",(function(){return preop(),length})),that.toLocaleString=that.toString=function(){return preop(),tokens.join(" ")},that.item=function(idx){return preop(),tokens[idx]},that.contains=function(token){return preop(),!!tokenMap[token]},that.add=function(){preop.apply(that,args=arguments);for(var args,token,i=0,l=args.length;i<l;++i)token=args[i],tokenMap[token]||(tokens.push(token),tokenMap[token]=!0);length!==tokens.length&&(length=tokens.length>>>0,"object"==typeof el[prop]?el[prop].baseVal=tokens.join(" "):el[prop]=tokens.join(" "),reindex())},that.remove=function(){preop.apply(that,args=arguments);for(var args,ignore={},i=0,t=[];i<args.length;++i)ignore[args[i]]=!0,delete tokenMap[args[i]];for(i=0;i<tokens.length;++i)ignore[tokens[i]]||t.push(tokens[i]);tokens=t,length=t.length>>>0,"object"==typeof el[prop]?el[prop].baseVal=tokens.join(" "):el[prop]=tokens.join(" "),reindex()},that.toggle=function(token,force){return preop.apply(that,[token]),undefined!==force?force?(that.add(token),!0):(that.remove(token),!1):tokenMap[token]?(that.remove(token),!1):(that.add(token),!0)},that}}()),"classList"in(e=document.createElement("span"))&&(e.classList.toggle("x",!1),e.classList.contains("x")&&(e.classList.constructor.prototype.toggle=function toggle(token){var force=arguments[1];if(force===undefined){var add=!this.contains(token);return this[add?"add":"remove"](token),add}return this[(force=!!force)?"add":"remove"](token),force})),function(){var e=document.createElement("span");if("classList"in e&&(e.classList.add("a","b"),!e.classList.contains("b"))){var native=e.classList.constructor.prototype.add;e.classList.constructor.prototype.add=function(){for(var args=arguments,l=arguments.length,i=0;i<l;i++)native.call(this,args[i])}}}(),function(){var e=document.createElement("span");if("classList"in e&&(e.classList.add("a"),e.classList.add("b"),e.classList.remove("a","b"),e.classList.contains("b"))){var native=e.classList.constructor.prototype.remove;e.classList.constructor.prototype.remove=function(){for(var args=arguments,l=arguments.length,i=0;i<l;i++)native.call(this,args[i])}}}()}(this)}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),function(undefined){"Document"in this||"undefined"==typeof WorkerGlobalScope&&"function"!=typeof importScripts&&(this.HTMLDocument?this.Document=this.HTMLDocument:(this.Document=this.HTMLDocument=document.constructor=new Function("return function Document() {}")(),this.Document.prototype=document))}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),function(undefined){"Element"in this&&"HTMLElement"in this||function(){if(!window.Element||window.HTMLElement){window.Element=window.HTMLElement=new Function("return function Element() {}")();var interval,vbody=document.appendChild(document.createElement("body")),frameDocument=vbody.appendChild(document.createElement("iframe")).contentWindow.document,prototype=Element.prototype=frameDocument.appendChild(frameDocument.createElement("*")),cache={},shiv=function(element,deep){var key,value,childNode,childNodes=element.childNodes||[],index=-1;if(1===element.nodeType&&element.constructor!==Element)for(key in element.constructor=Element,cache)value=cache[key],element[key]=value;for(;childNode=deep&&childNodes[++index];)shiv(childNode,deep);return element},elements=document.getElementsByTagName("*"),nativeCreateElement=document.createElement,loopLimit=100;prototype.attachEvent("onpropertychange",(function(event){for(var element,propertyName=event.propertyName,nonValue=!cache.hasOwnProperty(propertyName),newValue=prototype[propertyName],oldValue=cache[propertyName],index=-1;element=elements[++index];)1===element.nodeType&&(nonValue||element[propertyName]===oldValue)&&(element[propertyName]=newValue);cache[propertyName]=newValue})),prototype.constructor=Element,prototype.hasAttribute||(prototype.hasAttribute=function hasAttribute(name){return null!==this.getAttribute(name)}),bodyCheck()||(document.onreadystatechange=bodyCheck,interval=setInterval(bodyCheck,25)),document.createElement=function createElement(nodeName){var element=nativeCreateElement(String(nodeName).toLowerCase());return shiv(element)},document.removeChild(vbody)}else window.HTMLElement=window.Element;function bodyCheck(){return loopLimit--||clearTimeout(interval),!(!document.body||document.body.prototype||!/(complete|interactive)/.test(document.readyState)||(shiv(document,!0),interval&&document.body.prototype&&clearTimeout(interval),!document.body.prototype))}}()}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),function(undefined){var e;"document"in this&&"classList"in document.documentElement&&"Element"in this&&"classList"in Element.prototype&&((e=document.createElement("span")).classList.add("a","b"),e.classList.contains("b"))||function(global){var dpSupport=!0,defineGetter=function(object,name,fn,configurable){Object.defineProperty?Object.defineProperty(object,name,{configurable:!1===dpSupport||!!configurable,get:fn}):object.__defineGetter__(name,fn)};try{defineGetter({},"support")}catch(e){dpSupport=!1}var addProp=function(o,name,attr){defineGetter(o.prototype,name,(function(){var tokenList,THIS=this,gibberishProperty="__defineGetter__DEFINE_PROPERTY"+name;if(THIS[gibberishProperty])return tokenList;if(THIS[gibberishProperty]=!0,!1===dpSupport){for(var visage,mirror=addProp.mirror||document.createElement("div"),reflections=mirror.childNodes,l=reflections.length,i=0;i<l;++i)if(reflections[i]._R===THIS){visage=reflections[i];break}visage||(visage=mirror.appendChild(document.createElement("div"))),tokenList=DOMTokenList.call(visage,THIS,attr)}else tokenList=new DOMTokenList(THIS,attr);return defineGetter(THIS,name,(function(){return tokenList})),delete THIS[gibberishProperty],tokenList}),!0)};addProp(global.Element,"classList","className"),addProp(global.HTMLElement,"classList","className"),addProp(global.HTMLLinkElement,"relList","rel"),addProp(global.HTMLAnchorElement,"relList","rel"),addProp(global.HTMLAreaElement,"relList","rel")}(this)}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),Accordion.prototype.init=function(){if(this.$module){this.initControls(),this.initSectionHeaders();var areAllSectionsOpen=this.checkIfAllSectionsOpen();this.updateOpenAllButton(areAllSectionsOpen)}},Accordion.prototype.initControls=function(){this.$openAllButton=document.createElement("button"),this.$openAllButton.setAttribute("type","button"),this.$openAllButton.innerHTML='Open all <span class="govuk-visually-hidden">sections</span>',this.$openAllButton.setAttribute("class",this.openAllClass),this.$openAllButton.setAttribute("aria-expanded","false"),this.$openAllButton.setAttribute("type","button");var accordionControls=document.createElement("div");accordionControls.setAttribute("class",this.controlsClass),accordionControls.appendChild(this.$openAllButton),this.$module.insertBefore(accordionControls,this.$module.firstChild),this.$openAllButton.addEventListener("click",this.onOpenOrCloseAllToggle.bind(this))},Accordion.prototype.initSectionHeaders=function(){nodeListForEach(this.$sections,function($section,i){var header=$section.querySelector("."+this.sectionHeaderClass);this.initHeaderAttributes(header,i),this.setExpanded(this.isExpanded($section),$section),header.addEventListener("click",this.onSectionToggle.bind(this,$section)),this.setInitialState($section)}.bind(this))},Accordion.prototype.initHeaderAttributes=function($headerWrapper,index){var $module=this,$span=$headerWrapper.querySelector("."+this.sectionButtonClass),$heading=$headerWrapper.querySelector("."+this.sectionHeadingClass),$summary=$headerWrapper.querySelector("."+this.sectionSummaryClass),$button=document.createElement("button");$button.setAttribute("type","button"),$button.setAttribute("id",this.moduleId+"-heading-"+(index+1)),$button.setAttribute("aria-controls",this.moduleId+"-content-"+(index+1));for(var i=0;i<$span.attributes.length;i++){var attr=$span.attributes.item(i);$button.setAttribute(attr.nodeName,attr.nodeValue)}$button.addEventListener("focusin",(function(e){$headerWrapper.classList.contains($module.sectionHeaderFocusedClass)||($headerWrapper.className+=" "+$module.sectionHeaderFocusedClass)})),$button.addEventListener("blur",(function(e){$headerWrapper.classList.remove($module.sectionHeaderFocusedClass)})),null!=$summary&&$button.setAttribute("aria-describedby",this.moduleId+"-summary-"+(index+1)),$button.innerHTML=$span.innerHTML,$heading.removeChild($span),$heading.appendChild($button);var icon=document.createElement("span");icon.className=this.iconClass,icon.setAttribute("aria-hidden","true"),$button.appendChild(icon)},Accordion.prototype.onSectionToggle=function($section){var expanded=this.isExpanded($section);this.setExpanded(!expanded,$section),this.storeState($section)},Accordion.prototype.onOpenOrCloseAllToggle=function(){var $module=this,$sections=this.$sections,nowExpanded=!this.checkIfAllSectionsOpen();nodeListForEach($sections,(function($section){$module.setExpanded(nowExpanded,$section),$module.storeState($section)})),$module.updateOpenAllButton(nowExpanded)},Accordion.prototype.setExpanded=function(expanded,$section){$section.querySelector("."+this.sectionButtonClass).setAttribute("aria-expanded",expanded),expanded?$section.classList.add(this.sectionExpandedClass):$section.classList.remove(this.sectionExpandedClass);var areAllSectionsOpen=this.checkIfAllSectionsOpen();this.updateOpenAllButton(areAllSectionsOpen)},Accordion.prototype.isExpanded=function($section){return $section.classList.contains(this.sectionExpandedClass)},Accordion.prototype.checkIfAllSectionsOpen=function(){return this.$sections.length===this.$module.querySelectorAll("."+this.sectionExpandedClass).length},Accordion.prototype.updateOpenAllButton=function(expanded){var newButtonText=expanded?"Close all":"Open all";newButtonText+='<span class="govuk-visually-hidden"> sections</span>',this.$openAllButton.setAttribute("aria-expanded",expanded),this.$openAllButton.innerHTML=newButtonText};var helper={checkForSessionStorage:function(){var result,testString="this is the test string";try{return window.sessionStorage.setItem(testString,testString),result=window.sessionStorage.getItem(testString)===testString.toString(),window.sessionStorage.removeItem(testString),result}catch(exception){"undefined"!=typeof console&&void 0!==console.log||console.log("Notice: sessionStorage not available.")}}};return Accordion.prototype.storeState=function($section){if(this.browserSupportsSessionStorage){var $button=$section.querySelector("."+this.sectionButtonClass);if($button){var contentId=$button.getAttribute("aria-controls"),contentState=$button.getAttribute("aria-expanded");void 0!==contentId||"undefined"!=typeof console&&void 0!==console.log||console.error(new Error("No aria controls present in accordion section heading.")),void 0!==contentState||"undefined"!=typeof console&&void 0!==console.log||console.error(new Error("No aria expanded present in accordion section heading.")),contentId&&contentState&&window.sessionStorage.setItem(contentId,contentState)}}},Accordion.prototype.setInitialState=function($section){if(this.browserSupportsSessionStorage){var $button=$section.querySelector("."+this.sectionButtonClass);if($button){var contentId=$button.getAttribute("aria-controls"),contentState=contentId?window.sessionStorage.getItem(contentId):null;null!==contentState&&this.setExpanded("true"===contentState,$section)}}},Accordion}()},"./packages/react/node_modules/lbh-frontend/lbh/components/lbh-accordion/accordion.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var govuk_frontend_govuk_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/react/node_modules/govuk-frontend/govuk/components/accordion/accordion.js");const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__.n(govuk_frontend_govuk_components_accordion_accordion__WEBPACK_IMPORTED_MODULE_0__)()}}]);