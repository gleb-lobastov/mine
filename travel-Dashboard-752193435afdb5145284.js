"use strict";(self.webpackChunkmine=self.webpackChunkmine||[]).push([[292],{43011:(e,t,n)=>{n.d(t,{Z:()=>i}),n(23157),n(19601);var r=n(67294),a=n(73727),o=n(7310);function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l.apply(this,arguments)}var c={a:function(e){var t=e.href,n=e.children;return t.startsWith&&t.startsWith("/")?r.createElement(a.rU,{to:t},n):r.createElement("a",{href:t},n)}};const i=function(e){var t=e.children,n=e.forwardedProps;return r.createElement(o.Z,l({},n,{components:c}),t)}},33538:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var r=n(67294),a=n(41120),o=n(90166),l=n(30822),c=n(45646),i=(n(92222),n(57327),n(41539),n(88449),n(2490),n(59849),n(43011)),s=n(84090),u=n(57203);function m(e){var t=e.countriesIds,n=e.locationsDict,a=e.locationsIds,o=(0,s._l)().travel.visits,l=f(t.length,{one:"стране",many:"странах"}),c=f(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.filter((function(e){var n;return(null===(n=t[e])||void 0===n?void 0:n.locationClass)===u.LOCATION_CLASSES_ID.CITY})).length}(a,n),{one:"городе",many:"городах"});return r.createElement(i.Z,null,"\nСтатистика по моим путешествиям.\n\nЗдесь будет красивая инфографика, рассказы и фотки про 250 стран и\nтерриторий. Пока я побывал только в\n[".concat(l,"](").concat(o.toUrl(),") и \n[").concat(c,"](").concat(o.toUrl(),"),\nа раз так, то и на инфографику пока забил.\n  "))}function f(e,t){return null==e?"... ".concat(t.many):"".concat(e," ").concat((n=e,a=(r=t).many,l=void 0===(o=r.few)?a:o,c=r.one,i=Math.abs(n),(i%=100)>=5&&i<=20?a:1==(i%=10)?c:i>=2&&i<=4?l:a));var n,r,a,o,l,c,i}var v=n(282);function d(){return r.createElement(r.Fragment,null,r.createElement("div",null,r.createElement(v.Z,{component:"a",target:"_blank",rel:"nofollow noreferrer noopener",href:"https://lobastov.livejournal.com/tag/%D0%9F%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D0%B5"},"Про путешествия в ЖЖ")),r.createElement("a",{href:"https://my.flightradar24.com/lobastov",target:"_blank",rel:"nofollow noreferrer noopener"},r.createElement("img",{src:"https://banners-my.flightradar24.com/lobastov.png",alt:"My Flightdiary.net profile"})))}var h=(0,a.Z)({content:{display:"flex",flexDirection:"column",height:" 100%"},mapContainer:{flexGrow:1}});function p(){var e=h(),t=(0,o.Tp)(),n=t.queryFilter,a=t.setQueryFilter,i=(0,c.eS)(a,n),s=i.scaleBy,u=i.ratingLevel,f=(0,l.Yy)({userAlias:"my"}),v=f.countriesIds,p=f.isReady,g=f.locationsDict,y=f.locationsIds,D=f.locationsRating,E=f.visitsDict;return p?r.createElement("div",{className:e.content},r.createElement(m,{countriesIds:v,isReady:p,locationsDict:g,locationsIds:y}),r.createElement(c.ZP,{className:e.mapContainer,locationsDict:g,visitsDict:E,locationsRating:D,locationsIds:y,minHeight:300,scaleBy:s,ratingLevel:s===c.OJ.BY_RATING?u:void 0}),r.createElement(d,null)):"...Loading"}}}]);
//# sourceMappingURL=travel-Dashboard-752193435afdb5145284.js.map