(()=>{"use strict";const t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","#","$","%","*","+",",","-",".",":",";","=","?","@","[","]","^","_","{","|","}","~"],a=(a,o)=>{var h="";for(let e=1;e<=o;e++){let r=Math.floor(a)/Math.pow(83,o-e)%83;h+=t[Math.floor(r)]}return h},o=t=>{let a=t/255;return a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)},h=t=>{let a=Math.max(0,Math.min(1,t));return a<=.0031308?Math.round(12.92*a*255+.5):Math.round(255*(1.055*Math.pow(a,1/2.4)-.055)+.5)},e=(t,a)=>(t<0?-1:1)*Math.pow(Math.abs(t),a);class r extends Error{constructor(t){super(t),this.name="ValidationError",this.message=t}}const n=(t,a,h,e)=>{let r=0,n=0,l=0;const s=4*a;for(let M=0;M<a;M++)for(let a=0;a<h;a++){const h=e(M,a);r+=h*o(t[4*M+0+a*s]),n+=h*o(t[4*M+1+a*s]),l+=h*o(t[4*M+2+a*s])}let M=1/(a*h);return[r*M,n*M,l*M]};onmessage=function(t){var o=t.data,l=o.payload,s=l.pixels,M=l.height,i=l.width,m=l.componentX,f=l.componentY,c=o.uniqId,u=((t,o,l,s,M)=>{if(s<1||s>9||M<1||M>9)throw new r("BlurHash must have between 1 and 9 components");if(o*l*4!==t.length)throw new r("Width and height must match the pixels array");let i=[];for(let a=0;a<M;a++)for(let h=0;h<s;h++){const e=0==h&&0==a?1:2,r=n(t,o,l,((t,r)=>e*Math.cos(Math.PI*h*t/o)*Math.cos(Math.PI*a*r/l)));i.push(r)}const m=i[0],f=i.slice(1);let c,u="";if(u+=a(s-1+9*(M-1),1),f.length>0){let t=Math.max(...f.map((t=>Math.max(...t)))),o=Math.floor(Math.max(0,Math.min(82,Math.floor(166*t-.5))));c=(o+1)/166,u+=a(o,1)}else c=1,u+=a(0,1);var p;return u+=a((h((p=m)[0])<<16)+(h(p[1])<<8)+h(p[2]),4),f.forEach((t=>{u+=a(((t,a)=>19*Math.floor(Math.max(0,Math.min(18,Math.floor(9*e(t[0]/a,.5)+9.5))))*19+19*Math.floor(Math.max(0,Math.min(18,Math.floor(9*e(t[1]/a,.5)+9.5))))+Math.floor(Math.max(0,Math.min(18,Math.floor(9*e(t[2]/a,.5)+9.5)))))(t,c),2)})),u})(s,M,i,m,f);postMessage({payload:u,uniqId:c})}})();
//# sourceMappingURL=108-ba0dd7d4f0fc486ba059.js.map