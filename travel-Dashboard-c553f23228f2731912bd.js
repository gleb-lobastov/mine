(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1314:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return g}));var r=n(0),a=n.n(r),i=n(832),o=n(140),c=n(880),s=n(1050),l=n(2),u=n.n(l),f=n(929),d=n(37);var v=n(301),m=n(288);function b(t){var e=t.countriesIds,n=t.locationsDict,r=t.locationsIds,i=Object(d.d)().travel.visits,o=p(e.length,{one:"стране",many:"странах"}),c=p(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.filter((function(t){var n;return(null===(n=e[t])||void 0===n?void 0:n.locationClass)===v.LOCATION_CLASSES_ID.CITY})).length}(r,n),{one:"городе",many:"городах"});return a.a.createElement(f.a,{source:"\nСтатистика по моим путешествиям.\n\nЗдесь будет красивая инфографика, рассказы и фотки про 250 стран и\nтерриторий. Пока я побывал только в\n[".concat(o,"](").concat(i.toUrl(),") и \n[").concat(c,"](").concat(i.toUrl(),"),\nа раз так, то и на инфографику пока забил.\n  ")})}function p(t,e){return null==t?"... ".concat(e.many):"".concat(t," ").concat((n=t,a=(r=e).many,i=r.few,o=void 0===i?a:i,c=r.one,s=Math.abs(n),(s%=100)>=5&&s<=20?a:1==(s%=10)?c:s>=2&&s<=4?o:a));var n,r,a,i,o,c,s}b.propTypes={countriesIds:u.a.arrayOf(u.a.number).isRequired,locationsDict:u.a.objectOf(u.a.shape(m.default)).isRequired,locationsIds:u.a.arrayOf(u.a.number).isRequired};var y=n(842);function h(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,a.a.createElement(y.a,{component:"a",target:"_blank",rel:"nofollow noreferrer noopener",href:"https://lobastov.livejournal.com/tag/%D0%9F%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D0%B5"},"Про путешествия в ЖЖ")),a.a.createElement("a",{href:"https://my.flightradar24.com/lobastov",target:"_blank",rel:"nofollow noreferrer noopener"},a.a.createElement("img",{src:"https://banners-my.flightradar24.com/lobastov.png",alt:"My Flightdiary.net profile"})))}var O=Object(i.a)({content:{display:"flex",flexDirection:"column",height:" 100%"},mapContainer:{flexGrow:1}});function g(){var t=O(),e=Object(o.b)(),n=e.queryFilter,r=e.setQueryFilter,i=Object(s.c)(r,n),l=i.scaleBy,u=i.ratingLevel,f=Object(c.b)({userAlias:"my"}),d=f.countriesIds,v=f.isReady,m=f.locationsDict,p=f.locationsIds,y=f.locationsRating,g=f.visitsDict;return v?a.a.createElement("div",{className:t.content},a.a.createElement(b,{countriesIds:d,isReady:v,locationsDict:m,locationsIds:p}),a.a.createElement(s.b,{className:t.mapContainer,locationsDict:m,visitsDict:g,locationsRating:y,locationsIds:p,minHeight:300,scaleBy:l,ratingLevel:l===s.a.BY_RATING?u:void 0}),a.a.createElement(h,null)):"...Loading"}},880:function(t,e,n){"use strict";n.d(e,"b",(function(){return r.a})),n.d(e,"c",(function(){return f})),n.d(e,"a",(function(){return d}));var r=n(853),a=(n(860),n(78)),i=n(105);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,a=!1,i=void 0;try{for(var o,c=t[Symbol.iterator]();!(r=(o=c.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){a=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(a)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t){var e=t.userAlias,n=t.visitId,r=Object(a.c)((function(t){return{visitsDict:Object(i.c)(t,"visits")||{}}})).visitsDict[n];return l({visit:r},Object(i.g)({domain:"travel.visit".concat(n,"-").concat(e),isProvision:!0,modelName:"visits",observe:n,condition:!r,query:{userAlias:e,filter:{visit_id:{comparator:"=",value:n}},navigation:{isDisabled:!0}}}))}function d(t){var e=t.domain,n=o(Object(i.h)({domain:e,modelName:"visits",method:"POST",contentType:"multipart/form-data"}),2),r=n[0];return l(l({},n[1]),{},{submitVisitPhoto:r})}},929:function(t,e,n){"use strict";var r=n(0),a=n.n(r),i=n(2),o=n.n(i),c=n(79),s=n(930),l=n.n(s);function u(){return(u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}var f={link:function(t){var e=t.href,n=t.children;return e.startsWith&&e.startsWith("/")?a.a.createElement(c.b,{to:e},n):a.a.createElement("a",{href:e},n)}};f.link.propTypes={href:o.a.string.isRequired,children:o.a.oneOfType([o.a.node,o.a.string]).isRequired},e.a=function(t){return a.a.createElement(l.a,u({},t,{renderers:f}))}}}]);
//# sourceMappingURL=travel-Dashboard-c553f23228f2731912bd.js.map