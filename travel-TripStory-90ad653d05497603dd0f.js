(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{794:function(t,r,e){"use strict";var n=e(0),a=e.n(n),i=e(258),o=function(t){return function(r){var e=r.provision,n=(e=void 0===e?{}:e).isComplete,o=void 0!==n&&n,u=e.isPending;return!o||(void 0===u||u)?a.a.createElement(i.a,null):a.a.createElement(t,r)}},u=e(127);r.a=function(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];return function(t){return function(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];return function(t){return r.reduceRight(function(t,r){return r(t)},t)}}(u.a.apply(void 0,r),o)(t)}}},796:function(t,r,e){var n=e(803),a=e(138);t.exports=function(t,r){return t&&n(t,r,a)}},798:function(t,r,e){var n=e(259),a=e(799),i=Object.prototype.hasOwnProperty,o=a(function(t,r,e){i.call(t,e)?t[e].push(r):n(t,e,[r])});t.exports=o},799:function(t,r,e){var n=e(800),a=e(801),i=e(371),o=e(28);t.exports=function(t,r){return function(e,u){var c=o(e)?n:a,s=r?r():{};return c(e,t,i(u,2),s)}}},800:function(t,r){t.exports=function(t,r,e,n){for(var a=-1,i=null==t?0:t.length;++a<i;){var o=t[a];r(n,o,e(o),t)}return n}},801:function(t,r,e){var n=e(802);t.exports=function(t,r,e,a){return n(t,function(t,n,i){r(a,t,e(t),i)}),a}},802:function(t,r,e){var n=e(796),a=e(805)(n);t.exports=a},803:function(t,r,e){var n=e(804)();t.exports=n},804:function(t,r){t.exports=function(t){return function(r,e,n){for(var a=-1,i=Object(r),o=n(r),u=o.length;u--;){var c=o[t?u:++a];if(!1===e(i[c],c,i))break}return r}}},805:function(t,r,e){var n=e(261);t.exports=function(t,r){return function(e,a){if(null==e)return e;if(!n(e))return t(e,a);for(var i=e.length,o=r?i:-1,u=Object(e);(r?o--:++o<i)&&!1!==a(u[o],o,u););return e}}},817:function(t,r,e){"use strict";e.d(r,"b",function(){return u}),e.d(r,"a",function(){return c});var n=e(798),a=e.n(n),i=e(818),o=e.n(i),u=function(t){return t.sort(function(t,r){return t.orderInTrip-r.orderInTrip})},c=function(t){return o()(a()(t,"tripId"),u)}},818:function(t,r,e){var n=e(259),a=e(796),i=e(371);t.exports=function(t,r){var e={};return r=i(r,3),a(t,function(t,a,i){n(e,a,r(t,a,i))}),e}},957:function(t,r,e){"use strict";e.r(r);var n=e(0),a=e.n(n),i=e(2),o=e.n(i),u=e(42),c=e(260),s=e.n(c),f=e(7),l=e(135),d=e(127),p=e(794),v=e(174),m=e(180),h=e(817),b=e(176),y=Object(l.a)(h.b),g=function(t){var r=t.classes,e=t.visits,n=(e=void 0===e?{}:e).data,i=void 0===n?[]:n,o=t.ridesDict;if(!o||!i)return a.a.createElement("div",null,"None");var u=a.a.createElement("div",null,"Заметки о поездке не найдены");if(!i.length)return u;var c=i.length-1,s=y(i).map(function(t,e){var n,i=t.visitId,u=t.arrivalRideId,s=t.departureRideId,f=t.visitComment,l=t.locationName,d=(o[u]||{}).rideComment;c===e&&(n=(o[s]||{}).rideComment);return d||n||f?a.a.createElement("article",{key:"id".concat(i),className:r.visitContainer},a.a.createElement("h1",{className:r.location},l),Boolean(d)&&a.a.createElement("section",{className:r.storyPart},d),Boolean(f)&&a.a.createElement("section",{className:r.storyPart},f),Boolean(n)&&a.a.createElement("section",{className:r.storyPart},n)):null}),f=s.some(Boolean)?s:u;return a.a.createElement("div",{className:r.container},f)};g.propTypes={classes:o.a.arrayOf(o.a.string).isRequired,trips:o.a.shape({data:o.a.arrayOf(o.a.shape(m.default))}).isRequired,visits:o.a.shape({data:o.a.arrayOf(o.a.shape(b.default))}).isRequired,ridesDict:o.a.objectOf(o.a.shape(v.default)).isRequired};r.default=s()(u.f,Object(f.a)({container:{fontSize:"16px",lineHeight:"1.5"},visitContainer:{margin:"20px 0"},location:{fontWeight:"bold",fontSize:"21px"},storyPart:{margin:"12px 0"}}),Object(p.a)(function(t,r){var e,n,a=r.match.params.strTripId,i=(e=a,n=Number(e),Number.isNaN(n)?NaN:parseFloat(e));return{identity:{strTripId:a},require:{rides:{modelName:"rides",query:{filter:{trip_id:{comparator:"=",value:i}},navigation:{isDisabled:!0}}},visits:{modelName:"visits",query:{filter:{trip_id:{comparator:"=",value:i}},navigation:{isDisabled:!0}}}},meta:{domain:"tripStory"}}},function(t){return{ridesDict:Object(d.d)(t,"rides")}}))(g)}}]);
//# sourceMappingURL=travel-TripStory-90ad653d05497603dd0f.js.map