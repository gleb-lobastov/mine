(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1004:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(33),c=a(242),l=a.n(c),u=a(13),d=a(120),v=a(809),f=a(112),m=a(736),p=a(160),h=a(166),g=a(768),b=a(161),y=Object(d.a)(g.c),N=function(e){var t=e.classes,a=e.visits,n=(a=void 0===a?{}:a).data,i=void 0===n?[]:n,o=e.ridesDict;if(!o||!i)return r.a.createElement("div",null,"None");var s=r.a.createElement("div",null,"Заметки о поездке не найдены");if(!i.length)return s;var c=i.length-1,l=y(i).map(function(e,a){var n,i=e.visitId,s=e.arrivalRideId,l=e.departureRideId,u=e.visitComment,d=e.locationName,v=(o[s]||{}).rideComment;c===a&&(n=(o[l]||{}).rideComment);return v||n||u?r.a.createElement("article",{key:"id".concat(i),className:t.visitContainer},r.a.createElement("h1",{className:t.location},d),Boolean(v)&&r.a.createElement("section",{className:t.storyPart},v),Boolean(u)&&r.a.createElement("section",{className:t.storyPart},u),Boolean(n)&&r.a.createElement("section",{className:t.storyPart},n)):null}),u=l.some(Boolean)?l:s;return r.a.createElement("div",{className:t.container},u)};N.propTypes={classes:o.a.objectOf(o.a.string).isRequired,trips:o.a.shape({data:o.a.arrayOf(o.a.shape(h.default))}).isRequired,visits:o.a.shape({data:o.a.arrayOf(o.a.shape(b.default))}).isRequired,ridesDict:o.a.objectOf(o.a.shape(p.default)).isRequired};t.default=l()(s.g,Object(u.a)({container:{fontSize:"16px",lineHeight:"1.5"},visitContainer:{margin:"20px 0"},location:{fontWeight:"bold",fontSize:"21px"},storyPart:{margin:"12px 0"}}),Object(m.a)(function(e,t){var a=t.match.params.strTripId,n=Object(v.a)(a);return{identity:{strTripId:a},request:{rides:{modelName:"rides",query:{filter:{trip_id:{comparator:"=",value:n}},navigation:{isDisabled:!0}}},visits:{modelName:"visits",query:{filter:{trip_id:{comparator:"=",value:n}},navigation:{isDisabled:!0}}}},domain:"tripStoryPage"}},function(e){return{ridesDict:Object(f.d)(e,"rides")}}))(N)},1014:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(809),c=a(938),l=a.n(c),u=a(242),d=a.n(u),v=a(13),f=a(112),m=a(736),p=a(163),h=a(161),g=a(160),b=function(){var e=null,t=null;return{promise:new Promise(function(a,n){e=a,t=n}),resolver:e,rejector:t}};function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==s.return||s.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var N=function(e){var t=e.classes,a=e.location,i=(a=void 0===a?{}:a).locationName,o=a.lat,s=a.lon,c=e.visits,u=(c=void 0===c?{}:c).data,d=void 0===u?[]:u,v=e.ridesDict,f=r.a.createElement("div",null,"Заметки о поездке не найдены");if(!d.length)return f;var m=function(e){var t=e.lat,a=e.lon,r=Object(n.useMemo)(b,[]),i=r.promise,o=r.resolver;return Object(n.useEffect)(function(){var e;return i.then(function(n){var r=n.map,i=n.maps;e=new i.Marker({position:{lat:t,lng:a},map:r})}),function(){e&&e.setMap(null)}},[t,a]),{handleGoogleApiLoaded:o}}({lat:o,lon:s}).handleGoogleApiLoaded,p=function(e){var t=e.visitsList,a=e.ridesDict,n=t.map(function(e){var t=e.arrivalRideId;return(a[t]||{}).arrivalDateTime}).filter(Boolean).reduce(function(e,t){var a=t.getFullYear();return e[a]||(e[a]=0),e[a]+=1,e},{});return Object.entries(n).sort(function(e,t){return y(e,1)[0]-y(t,1)[0]}).map(function(e){var t=y(e,2),a=t[0],n=t[1];return n>1?"".concat(a," x").concat(n):a}).join(", ")}({visitsList:d,ridesDict:v});return r.a.createElement("div",{className:t.container},r.a.createElement("h1",{className:t.location},i),r.a.createElement("div",null,r.a.createElement("span",null,"Посещено ".concat(d.length," раз"))," ",p&&r.a.createElement("span",null,"в ".concat(p))),r.a.createElement("div",{className:t.googleMapContainer},r.a.createElement(l.a,{bootstrapURLKeys:{key:"AIzaSyCvP0e64ui7WpXKBdzOyEmkb4l5RuGy3Zs"},center:{lat:o,lng:s},defaultZoom:11,onGoogleApiLoaded:m})))};N.propTypes={classes:o.a.objectOf(o.a.string).isRequired,location:o.a.shape(p.default).isRequired,visits:o.a.shape({data:o.a.arrayOf(o.a.shape(h.default))}).isRequired,ridesDict:o.a.objectOf(o.a.shape(g.default)).isRequired};var E=d()(Object(v.a)({container:{fontSize:"16px",lineHeight:"1.5"},visitContainer:{margin:"20px 0"},location:{fontWeight:"bold",fontSize:"21px"},googleMapContainer:{margin:"12px 0",width:"800px",maxWidth:"100%",height:"400px",maxHeight:"100%"}}),Object(m.a)(function(e,t){var a=t.locationId,n=(Object(f.e)(e,"locationPage.visits")||{}).value,r=(n=void 0===n?{}:n)["locationPage.visits"],i=(r=void 0===r?{}:r).data;return{request:{location:{modelName:"locations",observe:a,query:{id:a}},visits:{modelName:"visits",observe:a,query:{filter:{location_id:{comparator:"=",value:a}},navigation:{isDisabled:!0}}},rides:{modelName:"rides",isNoop:!i||!i.length,observe:i,query:{filter:{visit_id:{comparator:"in",value:i}},navigation:{isDisabled:!0}}}},domain:"locationPage"}},function(e){return{ridesDict:Object(f.d)(e,"rides")}}))(N),O=function(e){var t=e.match.params.strLocationId;return r.a.createElement(E,{locationId:Object(s.a)(t)})};O.propTypes={match:o.a.shape({params:o.a.shape({strLocationId:o.a.string}).isRequired}).isRequired};t.default=O},736:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(244),o=function(e){return function(t){var a=t.provision,n=(a=void 0===a?{}:a).isPending,o=void 0===n||n,s=a.hasFallback;return o&&!s?r.a.createElement(i.a,null):r.a.createElement(e,t)}},s=a(112);t.a=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return t.reduceRight(function(e,t){return t(e)},e)}}(s.a.apply(void 0,t),o)(e)}}},768:function(e,t,a){"use strict";var n=a(739),r=a.n(n),i=a(783),o=a.n(i),s=a(744),c=a.n(s),l=function(e,t){var a=t.maxLength,n=t.separator,r=void 0===n?", ":n,i=c()(e),o=i.slice(0,a).join(r);return i.length>a?"".concat(o,"..."):o},u=a(164),d=function(e,t,a,n){if(!e.length)return n;var i=Object.keys(r()(e.filter(function(e){return e.visitType!==u.VISIT_TYPES.TRANSIT}),"countryId"));return 1===i.length?l(e.map(function(e){return e.locationName}),{maxLength:4})||n:l(i.map(function(e){return Number(e)!==a&&t[e]&&t[e].countryName}).filter(Boolean),{maxLength:4})||n};a.d(t,"c",function(){return v}),a.d(t,"a",function(){return f}),a.d(t,"b",function(){return d});var v=function(e){return e.sort(function(e,t){return e.orderInTrip-t.orderInTrip})},f=function(e){return o()(r()(e,"tripId"),v)}},809:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=function(e){var t=Number(e);return Number.isNaN(t)?NaN:parseFloat(e)}}}]);
//# sourceMappingURL=travel-TripStory-10b78f65002caff12445.js.map