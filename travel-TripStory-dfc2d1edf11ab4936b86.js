(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1094:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),l=a(25),c=a(264),s=a.n(c),u=a(12),d=a(127),m=a(888),v=a(115),f=a(807),p=a(175),g=a(186),h=a(847),y=a(174),b=Object(d.a)(h.c),N=function(e){var t=e.classes,a=e.visits,n=(a=void 0===a?{}:a).data,i=void 0===n?[]:n,o=e.ridesDict;if(!o||!i)return r.a.createElement("div",null,"None");var l=r.a.createElement("div",null,"Заметки о поездке не найдены");if(!i.length)return l;var c=i.length-1,s=b(i).map(function(e,a){var n,i=e.visitId,l=e.arrivalRideId,s=e.departureRideId,u=e.visitComment,d=e.locationName,m=(o[l]||{}).rideComment;c===a&&(n=(o[s]||{}).rideComment);return m||n||u?r.a.createElement("article",{key:"id".concat(i),className:t.visitContainer},r.a.createElement("h1",{className:t.location},d),Boolean(m)&&r.a.createElement("section",{className:t.storyPart},m),Boolean(u)&&r.a.createElement("section",{className:t.storyPart},u),Boolean(n)&&r.a.createElement("section",{className:t.storyPart},n)):null}),u=s.some(Boolean)?s:l;return r.a.createElement("div",{className:t.container},u)};N.propTypes={classes:o.a.objectOf(o.a.string).isRequired,trips:o.a.shape({data:o.a.arrayOf(o.a.shape(g.default))}).isRequired,visits:o.a.shape({data:o.a.arrayOf(o.a.shape(y.default))}).isRequired,ridesDict:o.a.objectOf(o.a.shape(p.default)).isRequired};t.default=s()(l.g,Object(u.a)({container:{fontSize:"16px",lineHeight:"1.5"},visitContainer:{margin:"20px 0"},location:{fontWeight:"bold",fontSize:"21px"},storyPart:{margin:"12px 0"}}),Object(f.a)(function(e,t){var a=t.match.params.strTripId,n=Object(m.a)(a);return{identity:{strTripId:a},request:{rides:{modelName:"rides",query:{filter:{trip_id:{comparator:"=",value:n}},navigation:{isDisabled:!0}}},visits:{modelName:"visits",query:{filter:{trip_id:{comparator:"=",value:n}},navigation:{isDisabled:!0}}}},domain:"tripStoryPage"}},function(e){return{ridesDict:Object(v.d)(e,"rides")}}))(N)},1114:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),l=a(60),c=a(1030),s=a.n(c),u=a(264),d=a.n(u),m=a(12),v=a(888),f=a(115),p=a(807),g=a(16),h=a(176),y=a(174),b=a(175),N=function(){var e=null,t=null;return{promise:new Promise(function(a,n){e=a,t=n}),resolver:e,rejector:t}},E=function(e){var t=e.lat,a=e.lon,r=Object(n.useMemo)(N,[]),i=r.promise,o=r.resolver;return Object(n.useEffect)(function(){var e;return i.then(function(n){var r=n.map,i=n.maps;e=new i.Marker({position:{lat:t,lng:a},map:r})}),function(){e&&e.setMap(null)}},[t,a]),{handleGoogleApiLoaded:o}};function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=[],n=!0,r=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var j=function(e){var t=e.visitsList,a=e.ridesDict,n=e.yearly,i=t.map(function(e){var t=e.arrivalRideId;return(a[t]||{}).arrivalDateTime}).filter(Boolean).reduce(function(e,t){var a=t.getFullYear();return e[a]||(e[a]=0),e[a]+=1,e},{});return Object.entries(i).sort(function(e,t){return O(e,1)[0]-O(t,1)[0]}).map(function(e){var t=O(e,2),a=t[0],i=t[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.b,{key:a,to:n.toUrl({year:String(a)})},i>1?"".concat(a," x").concat(i):a)," ")})};function x(e){var t=e.classes,a=e.location,n=(a=void 0===a?{}:a).locationName,i=a.lat,o=a.lon,l=e.visits,c=(l=void 0===l?{}:l).data,u=void 0===c?[]:c,d=e.ridesDict,m=e.namedPaths.travel.yearly,v=r.a.createElement("div",null,"Заметки о поездке не найдены");if(!u.length)return v;var f=E({lat:i,lon:o}).handleGoogleApiLoaded,p=j({visitsList:u,ridesDict:d,yearly:m});return r.a.createElement("div",{className:t.container},r.a.createElement("h1",{className:t.location},n),r.a.createElement("div",null,r.a.createElement("span",null,"Посещено ".concat(u.length," раз"))," ",p&&r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,"в "),r.a.createElement("span",null,p))),r.a.createElement("div",{className:t.googleMapContainer},r.a.createElement(s.a,{bootstrapURLKeys:{key:"AIzaSyCvP0e64ui7WpXKBdzOyEmkb4l5RuGy3Zs"},center:{lat:i,lng:o},defaultZoom:11,onGoogleApiLoaded:f})))}x.propTypes={classes:o.a.objectOf(o.a.string).isRequired,location:o.a.shape(h.default).isRequired,visits:o.a.shape({data:o.a.arrayOf(o.a.shape(y.default))}).isRequired,ridesDict:o.a.objectOf(o.a.shape(b.default)).isRequired};t.default=d()(Object(m.a)({container:{fontSize:"16px",lineHeight:"1.5"},visitContainer:{margin:"20px 0"},location:{fontWeight:"bold",fontSize:"21px"},googleMapContainer:{margin:"12px 0",width:"800px",maxWidth:"100%",height:"400px",maxHeight:"100%"}}),g.g,Object(p.a)(function(e,t){var a=t.match.params.strLocationId,n=Object(v.a)(a),r=(Object(f.g)(e,"locationPage.visits")||{}).value,i=(r=void 0===r?{}:r)["locationPage.visits"],o=(i=void 0===i?{}:i).data;return{request:{location:{modelName:"locations",observe:n,query:{id:n}},visits:{modelName:"visits",observe:n,query:{filter:{location_id:{comparator:"=",value:n}},navigation:{isDisabled:!0}}},rides:{modelName:"rides",condition:o&&o.length,observe:o,query:{filter:{visit_id:{comparator:"in",value:o}},navigation:{isDisabled:!0}}}},domain:"locationPage"}},function(e){return{ridesDict:Object(f.d)(e,"rides")}}))(x)},807:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(268),o=function(e){return function(t){var a=t.provision,n=(a=void 0===a?{}:a).isPending,o=void 0===n||n,l=a.hasFallback;return o&&!l?r.a.createElement(i.a,null):r.a.createElement(e,t)}},l=a(115);t.a=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return t.reduceRight(function(e,t){return t(e)},e)}}(l.a.apply(void 0,t),o)(e)}}},847:function(e,t,a){"use strict";var n=a(806),r=a.n(n),i=a(832),o=a.n(i),l=a(810),c=a.n(l),s=function(e,t){var a=t.maxLength,n=t.separator,r=void 0===n?", ":n,i=c()(e),o=i.slice(0,a).join(r);return i.length>a?"".concat(o,"..."):o},u=a(181),d=function(e,t,a,n){if(!e.length)return n;var i=Object.keys(r()(e.filter(function(e){return e.visitType!==u.VISIT_TYPES.TRANSIT}),"countryId"));return 1===i.length?s(e.map(function(e){return e.locationName}),{maxLength:4})||n:s(i.map(function(e){return Number(e)!==a&&t[e]&&t[e].countryName}).filter(Boolean),{maxLength:4})||n};a.d(t,"c",function(){return m}),a.d(t,"a",function(){return v}),a.d(t,"b",function(){return d});var m=function(e){return e.sort(function(e,t){return e.orderInTrip-t.orderInTrip})},v=function(e){return o()(r()(e,"tripId"),m)}},888:function(e,t,a){"use strict";a.d(t,"a",function(){return n});var n=function(e){var t=Number(e);return Number.isNaN(t)?NaN:parseFloat(e)}}}]);
//# sourceMappingURL=travel-TripStory-dfc2d1edf11ab4936b86.js.map