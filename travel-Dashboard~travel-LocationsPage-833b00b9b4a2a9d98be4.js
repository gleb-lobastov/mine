(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1049:function(e,t,n){"use strict";n.d(t,"a",(function(){return I})),n.d(t,"c",(function(){return K})),n.d(t,"b",(function(){return Q}));var r,i=n(0),a=n.n(i),o=n(2),c=n.n(o),s=n(106),u=n.n(s),l=n(1251),f=n.n(l),p=n(840),v=n(294),_=n(251),d=n(902),O=n.n(d),b=n(901),m=n.n(b);function g(e){var t=e.locationsIds,n=e.locationsDict,r=e.visitsDict,i=e.locationsRating;return t.map((function(e){var t=n[e];if(!t)return null;var a=t.lon,o=t.lat,c=t.locationName,s=function(e,t){return e.reduce((function(e,n){var r=t[n];if(r){var i=r.arrivalDateTime,a=r.departureDateTime;e.firstVisitDateTime=O()([e.firstVisitDateTime,i]),e.lastVisitDateTime=m()([e.lastVisitDateTime,a])}return e}),{firstVisitDateTime:null,lastVisitDateTime:null})}(t.visitsIds,r);return{locationName:c,lat:o,lon:a,firstVisitDateTime:s.firstVisitDateTime,lastVisitDateTime:s.lastVisitDateTime,locationRating:i[e],visitsCount:t.visitsIds.length}}))}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var I={BY_FIRST_VISIT:"fv",BY_LAST_VISIT:"lv",BY_VISITS_COUNT:"vc",BY_RATING:"r"},T=I.BY_LAST_VISIT,A=["step_by_time_1_zjtrlw.png","step_by_time_2_tvotvg.png","step_by_time_3_ylj1vi.png","step_by_time_4_uovfrs.png","step_by_time_5_s4jq0u.png","step_by_time_6_lmihnf.png"],E=(y(r={},I.BY_FIRST_VISIT,A),y(r,I.BY_LAST_VISIT,A),y(r,I.BY_VISITS_COUNT,["step_by_visits_1_zv3tba.png","step_by_visits_2_qthjqa.png","step_by_visits_3_xcjyla.png","step_by_visits_4_kwdwka.png","step_by_visits_5_xnnipa.png"]),y(r,I.BY_RATING,["step_by_rating_1_id2qgb.png","step_by_rating_2_iiqvik.png","step_by_rating_3_x2gzsd.png","step_by_rating_4_cbqdcn.png","step_by_rating_5_viyhls.png","step_by_rating_6_zzfgki.png","step_by_rating_7_pjjhhq.png","step_by_rating_8_vgetsd.png","step_by_rating_9_t6tenz.png","step_by_rating_10_yjywr0.png"]),r),j={ALL:"all",WANT_COME_BACK:"good",LOVE_THIS_PLACE:"best"},R=j.ALL,N=n(246);function h(e){var t=e.visitsCount;switch(!0){case t>10:return 5;case t>5:return 4;case t>2:return 3;case t>1:return 2;default:return 1}}function C(e){switch(e.locationRating){case N.LOCATION_RATING.PLACE_TO_LIVE:return 1;case N.LOCATION_RATING.FEW_PER_YEAR:case N.LOCATION_RATING.ONCE_PER_YEAR:return 3;case N.LOCATION_RATING.ONCE_PER_TWO_YEARS:case N.LOCATION_RATING.ONCE_PER_FIVE_YEARS:return 4;case N.LOCATION_RATING.ONCE_PER_DECADE:case N.LOCATION_RATING.TWICE_PER_LIVE:return 7;case N.LOCATION_RATING.ONCE_PER_LIVE:return 9;case N.LOCATION_RATING.NEVER:return 10;default:return 6}}function S(e){return{resolveStep:function(t,n){var r=(t[e]-n.minTime)/n.diff*6;return Math.min(Math.max(Math.floor(r),0),6)},resolveOptions:function(t){var n=t.map((function(t){return t[e]&&t[e].getTime()})).filter(Boolean),r=O()(n);return{minTime:r,diff:m()(n)+1-r}}}}var L=n(874),P=n(877);function D(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"eeeeee, d MMMM yyyy";return Object(P.a)(e,t,{locale:L.a})}function w(e){switch(e){case N.LOCATION_RATING.PLACE_TO_LIVE:return"Жил бы здесь";case N.LOCATION_RATING.FEW_PER_YEAR:case N.LOCATION_RATING.ONCE_PER_YEAR:return"Готов ездить сюда постоянно";case N.LOCATION_RATING.ONCE_PER_TWO_YEARS:case N.LOCATION_RATING.ONCE_PER_FIVE_YEARS:return"Приезжал бы иногда";case N.LOCATION_RATING.ONCE_PER_DECADE:case N.LOCATION_RATING.TWICE_PER_LIVE:return"Заглянул бы еще разок";case N.LOCATION_RATING.ONCE_PER_LIVE:return"Одного посещения достаточно";case N.LOCATION_RATING.NEVER:return"Тут нечего делать";default:return"?"}}function V(e,t){var n=E[t],r=n[e-1]||n[0];return"".concat("https://res.cloudinary.com/dc2eke0gj/image/upload/markers/").concat(r)}function B(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(r=(o=c.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(i)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return G(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var Y=n(218),M=n(844),q=n(845),k=n(847),x=n(856),W=n(1348),z=n(1335);function F(e){var t=e.classes,n=e.scaleBy,r=e.onClose,i=e.onChange;return(a.a.createElement(M.a,null,a.a.createElement(q.a,null,a.a.createElement(k.a,{className:t.formControl},a.a.createElement(x.a,{shrink:!0,id:"select-scaleBy-filter-label"},"Раскрасить маркеры"),a.a.createElement(W.a,{labelId:"select-scaleBy-filter-label",autoWidth:!0,id:"select-scaleBy-filter",value:n,onChange:function(e){r();var t,n,a,o=e.target.value,c=(a=o,(n="scale")in(t={})?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t);o!==I.BY_RATING&&(c.rating=void 0),i(c)}},a.a.createElement(z.a,{key:I.BY_FIRST_VISIT,value:I.BY_FIRST_VISIT},"По первому посещению"),a.a.createElement(z.a,{key:I.BY_LAST_VISIT,value:I.BY_LAST_VISIT},"По последнему посещению"),a.a.createElement(z.a,{key:I.BY_VISITS_COUNT,value:I.BY_VISITS_COUNT},"По числу посещений"),a.a.createElement(z.a,{key:I.BY_RATING,value:I.BY_RATING},"По рейтингу"))))))}function H(e){var t=e.classes,n=e.ratingLevel,r=e.onClose,i=e.onChange;return(a.a.createElement(M.a,null,a.a.createElement(q.a,null,a.a.createElement(k.a,{className:t.formControl},a.a.createElement(x.a,{shrink:!0,id:"select-ratingLevel-filter-label"},"Фильтр по рейтингу"),a.a.createElement(W.a,{labelId:"select-ratingLevel-filter-label",autoWidth:!0,id:"select-ratingLevel-filter",value:n,onChange:function(e){var t,n,a;r(),i((t={},n="rating",a=e.target.value,n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t))}},a.a.createElement(z.a,{key:j.ALL,value:j.ALL},"Все"),a.a.createElement(z.a,{key:j.WANT_COME_BACK,value:j.WANT_COME_BACK},"Куда бы вернулся"),a.a.createElement(z.a,{key:j.LOVE_THIS_PLACE,value:j.LOVE_THIS_PLACE},"Лучшие места"))))))}F.propTypes={classes:c.a.shape({formControl:c.a.string.isRequired}).isRequired,scaleBy:c.a.oneOf(Object.values(I)).isRequired,onClose:c.a.func.isRequired,onChange:c.a.func.isRequired},H.propTypes={classes:c.a.shape({formControl:c.a.string.isRequired}).isRequired,ratingLevel:c.a.oneOf(Object.values(j)).isRequired,onClose:c.a.func.isRequired,onChange:c.a.func.isRequired};var U=Object(p.a)({formControl:{width:"100%"}}),K=function(e,t){var n=U(),r=t||{},i=r.scale,o=r.rating,c=function(e){return Object.values(I).includes(e)?e:T}(i),s=function(e){return Object.values(j).includes(e)?e:R}(o);return Object(Y.b)((function(t){var r=t.closeSidebar;return(a.a.createElement(a.a.Fragment,null,a.a.createElement(F,{classes:n,onClose:r,scaleBy:c,onChange:e}),c===I.BY_RATING&&a.a.createElement(H,{classes:n,onClose:r,ratingLevel:s,onChange:e})))}),[c,s]),{scaleBy:c,ratingLevel:s}};function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(n),!0).forEach((function(t){$(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var X=Object(p.a)({googleMapContainer:{margin:"12px 0",maxWidth:"100%",flexGrow:1,minHeight:function(e){return e.minHeight},position:"relative"},googleMapPosition:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0"}});function Q(e){var t=e.className,n=e.locationsDict,r=e.visitsDict,o=e.locationsRating,c=e.locationsIds,s=e.minHeight,l=e.scaleBy,p=e.ratingLevel,v=X({minHeight:s}),_=function(e){var t=B(Object(i.useState)(null),2),n=t[0],r=t[1],a=Object(i.useRef)(!0);return Object(i.useEffect)((function(){if(n){var t=n.map,r=n.maps,i=new r.LatLngBounds,o=e.map((function(e){var n=e.lat,a=e.lon,o=e.iconUrl,c=e.title,s=e.zIndex,u=new r.Marker({map:t,position:{lat:n,lng:a},icon:{url:o,scaledSize:new r.Size(24,24)},scale:.5,title:c,zIndex:s});return i.extend(u.position),u}));return a.current&&(t.setOptions({maxZoom:11,minZoom:2}),t.fitBounds(i),t.setOptions({maxZoom:null,minZoom:null}),a.current=!1),function(){o.forEach((function(e){e.setMap(null),e.setVisible(!1)})),o.length=0}}}),[n,e]),{handleGoogleApiLoaded:function(e){return r(e)}}}(Object(i.useMemo)((function(){var e=function(e,t){var n=t.ratingLevel;return Object.values(j).includes(n)&&n!==j.ALL?e.filter((function(e){var t=e.locationRating,r=e.visitsCount;switch(n){case j.WANT_COME_BACK:return r<2?t<=N.LOCATION_RATING.TWICE_PER_LIVE:t<=N.LOCATION_RATING.ONCE_PER_DECADE;case j.LOVE_THIS_PLACE:return t<=N.LOCATION_RATING.ONCE_PER_YEAR;default:return!0}})):e}(g({locationsDict:n,visitsDict:r,locationsRating:o,locationsIds:c}),{ratingLevel:p}),t=function(e){switch(e){case I.BY_VISITS_COUNT:return{resolveStep:h};case I.BY_RATING:return{resolveStep:C};case I.BY_LAST_VISIT:return S("lastVisitDateTime");case I.BY_FIRST_VISIT:default:return S("firstVisitDateTime")}}(l),i=t.resolveStep,a=t.resolveOptions,s=a&&a(e);return e.map((function(e){var t,n,r,a,o,c,u=i(e,s);return J(J({},e),{},{zIndex:[I.BY_RATING,I.BY_FIRST_VISIT].includes(l)?10-u:u,iconUrl:V(u,l),title:(t=e,n=t.locationName,r=t.locationRating,a=t.visitsCount,o=t.firstVisitDateTime,c=t.lastVisitDateTime,[n,"Посещено ".concat(a," раз"),"Впервые ".concat(D(o)),a>1&&"Прошлое посешение ".concat(D(c)),"Рейтинг: ".concat(w(r))].filter(Boolean).join("\n"))})}))}),[n,r,o,c,l,p])).handleGoogleApiLoaded;return a.a.createElement("div",{className:u()(t,v.googleMapContainer)},a.a.createElement("div",{className:v.googleMapPosition},a.a.createElement(f.a,{bootstrapURLKeys:{key:"AIzaSyCvP0e64ui7WpXKBdzOyEmkb4l5RuGy3Zs"},center:{lat:0,lng:0},zoom:11,onGoogleApiLoaded:_})))}Q.propTypes={className:c.a.string,visitsDict:c.a.objectOf(c.a.shape(_.default)).isRequired,locationsDict:c.a.objectOf(c.a.shape(v.default)).isRequired,locationsIds:c.a.arrayOf(c.a.number).isRequired,locationsRating:c.a.objectOf(c.a.number).isRequired,minHeight:c.a.number,scaleBy:c.a.oneOf(Object.values(I)).isRequired,ratingLevel:c.a.oneOf(Object.values(j)).isRequired},Q.defaultProps={className:void 0,minHeight:"400px"}},860:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var r=n(0),i=n(79),a=n(901),o=n.n(a),c=n(902),s=n.n(c),u=n(924),l=n.n(u),f=n(172),p=n.n(f),v=n(105),_=n(20),d=n(885),O=n(867),b=n(886);function m(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function g(e){var t=e.userAlias,n=function(e){var t=e.userAlias,n=e.tripsIds,r=Object(i.c)((function(e){return{tripsDict:Object(v.c)(e,"trips")||{}}})).tripsDict,a=!n,o=!a&&n.filter((function(e){return!r[e]}));return Object(v.g)({domain:"travel.trips-".concat(t),isProvision:!0,modelName:"trips",observe:t,query:{userAlias:t,navigation:{isDisabled:!0},filter:a?{}:{id:{comparator:"in",value:o}}}})}({userAlias:t,tripsIds:e.tripsIds}),a=Object(d.a)({domain:"travel.trips-".concat(t,".user"),userAlias:t}),c=a.user,s=(c=void 0===c?{}:c).locationsRating,u=void 0===s?{}:s,f=m(a,["user"]),g=(Object(_.o)(n)||{}).data,I=void 0===g?[]:g,T=Object(i.c)((function(e){return{tripsDict:Object(v.c)(e,"trips")||{},visitsDict:Object(v.c)(e,"visits")||{},ridesDict:Object(v.c)(e,"rides")||{},countriesDict:Object(v.c)(e,"countries")||{},locationsDict:Object(v.c)(e,"locations")||{}}})),A=T.tripsDict,E=T.visitsDict,j=T.ridesDict,R=T.countriesDict,N=T.locationsDict,h=Object(r.useMemo)((function(){return Array.from(new Set(I.flatMap((function(e){var t;return(null===(t=A[e])||void 0===t?void 0:t.visits)||[]}))))}),[I,A]),C=Object(r.useMemo)((function(){return Array.from(new Set(I.flatMap((function(e){var t;return(null===(t=A[e])||void 0===t?void 0:t.rides)||[]}))))}),[I,A]),S=Object(r.useMemo)((function(){return Array.from(new Set(h.flatMap((function(e){var t;return(null===(t=E[e])||void 0===t?void 0:t.countryId)||[]}))))}),[h,E]),L=Object(r.useMemo)((function(){return Array.from(new Set(h.flatMap((function(e){var t;return(null===(t=E[e])||void 0===t?void 0:t.locationId)||[]}))))}),[h,E]),P=Object(O.a)(),D=Object(b.a)({domain:"travel.locations-".concat(t),locationsIds:L}),w=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{updatesCounter:l()(t.map(_.p)),isReady:t.every(_.i),isPending:t.some(_.h),isValid:t.every(_.k),error:t.find(_.g),errors:t.map(_.f).filter(Boolean),invalidate:function(){return t.forEach((function(e){return(0,e.invalidate)()}))}}}(n,f,P,D),V=w.isError,B=w.isValid,G=w.isReady,Y=w.isPending,M=function(e,t,n){var r=e.reduce((function(e,r){var i=t[r];if(!i)return e;var a=n[r],o=i.countryId;return e[o]||(e[o]=[]),e[o].push(a),e}),{});return p()(r,(function(e){return function(e){if(!e.length)return 1/0;var t=e.length/e.map((function(e){return 1/e})).reduce((function(e,t){return e+t})),n=o()(e),r=Math.log(e.length);return 1/(1/t+r/n)}(e)}))}(L,N,u);return{tripsProvision:n,countriesProvision:P,locationsProvision:D,isError:V,isValid:B,isReady:G,isPending:Y,tripsIds:I,tripsDict:A,visitsIds:h,visitsDict:E,ridesIds:C,ridesDict:j,ridesStats:y(C,j),locationsIds:L,locationsDict:N,locationsRating:u,countriesIds:S,countriesDict:R,countriesRating:M}}function y(e,t){return{earliestDeparture:new Date(s()(e.map((function(e){var n;return null===(n=t[e])||void 0===n?void 0:n.departureDateTime.getTime()})))),latestArrival:new Date(o()(e.map((function(e){var n;return null===(n=t[e])||void 0===n?void 0:n.arrivalDateTime.getTime()}))))}}},867:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(105);n(20);function i(){return Object(r.g)({domain:"travel.countries",isProvision:!0,modelName:"countries",query:{navigation:{isDisabled:!0}}})}},869:function(e,t,n){"use strict";function r(e){return e instanceof Date&&!Number.isNaN(e.getTime())}n.d(t,"a",(function(){return r}))},877:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(56),i=n(869);function a(e){if(!Object(i.a)(e))return"?";for(var t=arguments.length,n=new Array(t>1?t-1:0),a=1;a<t;a++)n[a-1]=arguments[a];return r.a.apply(void 0,[e].concat(n))}},885:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(79),i=n(105);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){var t=e.domain,n=e.userAlias,a=Object(r.c)((function(e){return Object(i.e)(e,"users",n)}));return o(o({},Object(i.g)({domain:t,applicableSchemaName:"item",isProvision:!0,modelName:"users",observe:n,condition:Boolean(n),query:{id:n}})),{},{user:a})}},886:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return f}));var r=n(79),i=n(105);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(r=(o=c.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(i)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e){var t=e.domain,n=e.locationsIds,a=Object(r.c)((function(e){return Object(i.c)(e,"locations")||{}})),o=n.filter((function(e){return!a[e]}));return Object(i.g)({domain:t,isProvision:!0,modelName:"locations",observe:n,condition:Boolean(o.length),query:{filter:{id:{comparator:"in",value:o}},navigation:{isDisabled:!0}}})}function f(e){var t=e.domain,n=s(Object(i.h)({domain:t,modelName:"locations",method:"POST"}),2),r=n[0];return o(o({},n[1]),{},{submitLocationRating:r})}}}]);
//# sourceMappingURL=travel-Dashboard~travel-LocationsPage-833b00b9b4a2a9d98be4.js.map