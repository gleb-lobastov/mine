(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{745:function(t,e,n){"use strict";var r=n(0),o=n.n(r),a=n(77);function i(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var u=function(t,e){var n=e.require;return Array.isArray(n)&&Array.isArray(t)?Object.assign.apply(Object,i(t)):t},c=(Object(a.a)(u),Object(a.a)(u),n(193)),f=function(t){return function(e){var n=e.provision,r=(n=void 0===n?{}:n).isComplete,a=void 0!==r&&r,i=n.isPending;return!a||(void 0===i||i)?o.a.createElement(c.a,null):o.a.createElement(t,e)}},l=n(118);e.a=function(t){return function(e){return function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduceRight(function(t,e){return e(t)},t)}}(Object(l.a)(t),f)(e)}}},754:function(t,e,n){var r=n(194),o=n(755),a=Object.prototype.hasOwnProperty,i=o(function(t,e,n){a.call(t,n)?t[n].push(e):r(t,n,[e])});t.exports=i},755:function(t,e,n){var r=n(756),o=n(757),a=n(314),i=n(19);t.exports=function(t,e){return function(n,u){var c=i(n)?r:o,f=e?e():{};return c(n,t,a(u,2),f)}}},756:function(t,e){t.exports=function(t,e,n,r){for(var o=-1,a=null==t?0:t.length;++o<a;){var i=t[o];e(r,i,n(i),t)}return r}},757:function(t,e,n){var r=n(758);t.exports=function(t,e,n,o){return r(t,function(t,r,a){e(o,t,n(t),a)}),o}},758:function(t,e,n){var r=n(759),o=n(762)(r);t.exports=o},759:function(t,e,n){var r=n(760),o=n(87);t.exports=function(t,e){return t&&r(t,e,o)}},760:function(t,e,n){var r=n(761)();t.exports=r},761:function(t,e){t.exports=function(t){return function(e,n,r){for(var o=-1,a=Object(e),i=r(e),u=i.length;u--;){var c=i[t?u:++o];if(!1===n(a[c],c,a))break}return e}}},762:function(t,e,n){var r=n(195);t.exports=function(t,e){return function(n,o){if(null==n)return n;if(!r(n))return t(n,o);for(var a=n.length,i=e?a:-1,u=Object(n);(e?i--:++i<a)&&!1!==o(u[i],i,u););return n}}},874:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(754),i=n.n(a),u=n(1),c=n.n(u),f=n(745);function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var s=function(t,e){var n=l(t,2)[1],r=void 0===n?[]:n,o=l(e,2)[1];return(void 0===o?[]:o).length-r.length},p=function(t,e){var n=t.locationName,r=e.locationName;return n.localeCompare(r)},y=function(t){var e=t.locations,n=(e=void 0===e?{}:e).data,r=void 0===n?[]:n;return o.a.createElement("div",null,Object.entries(i()(r,"countryName")).sort(s).map(function(t,e){var n=l(t,2),r=n[0],a=n[1];return o.a.createElement("div",{key:r},o.a.createElement("h1",null,"".concat(e+1,". ").concat(r)),a.sort(p).map(function(t,e){var n=t.locationName;return o.a.createElement("div",{key:n},"".concat(e+1,". ").concat(n))}))}))};y.propTypes={locations:c.a.shape({data:c.a.arrayOf(c.a.string)})},y.defaultProps={locations:{data:[]}},e.default=Object(f.a)(function(){return{require:{locations:{modelName:"locations"}},meta:{domain:"countries"}}})(y)},881:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(54),i=n(193),u=function(){var t,e,n,r,o,a;return window.twttr||(window.twttr=(t=document,e="script",n="twitter-wjs",o=t.getElementsByTagName(e)[0],a=window.twttr||{},t.getElementById(n)?a:((r=t.createElement(e)).id=n,r.src="https://platform.twitter.com/widgets.js",o.parentNode.insertBefore(r,o),a._e=[],a.ready=function(t){a._e.push(t)},a))),window.twttr};function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function l(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function v(){var t=function(t,e){e||(e=t.slice(0));return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}(["\n  max-width: 540px;\n"]);return v=function(){return t},t}var d=a.a.article(v()),b=function(t){function e(){var t,n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=l(this,(t=s(e)).call.apply(t,[this].concat(a)))).containerRef=o.a.createRef(),n.state={isReady:!1},n}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,o.a.PureComponent),n=e,(r=[{key:"componentDidMount",value:function(){var t=this,e=u();e.ready(function(){t.setState({isReady:!0}),e.widgets.createTimeline({sourceType:"url",url:"https://twitter.com/lobastov"},t.containerRef.current)})}},{key:"render",value:function(){var t=this.state.isReady;return o.a.createElement(d,null,!t&&o.a.createElement(i.a,null),o.a.createElement("div",{ref:this.containerRef}))}}])&&f(n.prototype,r),a&&f(n,a),e}();y(b,"propTypes",{}),y(b,"defaultProps",{});e.default=b}}]);
//# sourceMappingURL=literature-Books-ec9de1b223ae8d147b3c.js.map