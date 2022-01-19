function AttachContextMenu(e,t){let n=document.querySelector(e),o=document.getElementById(t);n.addEventListener("contextmenu",function(e){e.preventDefault(),o.style.display="flex",o.style.top=e.pageY+"px",o.style.left=e.pageX+"px"},!1),document.addEventListener("click",function(e){o.style.display="none"},!1)}function generatePalette(e){let t,n=document.querySelector(":root"),o=getComputedStyle(n).getPropertyValue("--AccentColor");(t="Light"==e?[{name:"AccentColorLight",theme:"LightMode",value:10},{name:"AccentColor",theme:"LightMode",value:0},{name:"AccentColorDark",theme:"LightMode",value:-10}]:[{name:"AccentColorLight",theme:"DarkMode",value:40},{name:"AccentColor",theme:"DarkMode",value:30},{name:"AccentColorDark",theme:"DarkMode",value:0}]).forEach(function(e){var t=o.split(","),n=Array.from(t).splice(2,1).toString();n=(n=n.slice(0,-2)).substring(1);let s=Number(n);(s+=e.value)>=100&&(s=100),s<=0&&(s=0),n=s.toString()+"%)",t.splice(2,1),t.push(n),document.body.style.setProperty("--"+e.name,t)})}function toggleTheme(e){switch(e){case"Light":t("LightMode");break;case"Dark":t();break;case"Switch":document.body.classList.contains("LightMode")?t():t("LightMode");break;case void 0:window.matchMedia("(prefers-color-scheme: dark)").matches?t():t("LightMode")}function t(e){let t=Array.from(document.body.classList);t.splice(0,1),generatePalette("Light"),"LightMode"==e?(t.unshift("LightMode"),generatePalette("Light")):(t.unshift("DarkMode"),generatePalette());let n=t.join(" ");document.body.setAttribute("class",n)}}function toggleClass(e,t,n){let o=Array.from(document.querySelector(e).classList);o.splice(1,1),document.querySelector(e).classList.contains(t)?o.push(n):o.push(t);let s=o.join(" ");document.querySelector(e).setAttribute("class",s)}function generateSnackbar(e,t,n){let o=document.createElement("div");o.classList.add("snackbar");let s=`\n  <p>${e}</p>\n  <button class="linkButton">${t}</button>\n  `;o.innerHTML=s,document.querySelector(".snackbarParent").appendChild(o),o.querySelector("button").setAttribute("id",n),o.onanimationend=function(){o.style.animation="snackbarDisappear 0.3s 8s forwards",o.onanimationend=function(){o.remove()}}}window.onload=function(){toggleTheme(),AttachContextMenu("body","menu")};class NeonProgressRing extends HTMLElement{constructor(){super();var e=this.getAttribute("data-size");null===e&&(e="40");var t=`\n      <svg width="${e}" height="${e}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n      <path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z" fill="var(--Border1)"/>\n      <path d="M3.87565 9C2.91906 8.44771 2.58188 7.2151 3.24912 6.33484C4.51659 4.66272 6.10475 3.25084 7.92755 2.18567C10.3279 0.782995 13.0524 0.029993 15.8324 0.000877422C18.6125 -0.0282382 21.3521 0.667538 23.7813 2.01963C25.6261 3.04639 27.2434 4.4247 28.5457 6.06991C29.2312 6.936 28.9199 8.1754 27.9751 8.7476V8.7476C27.0303 9.3198 25.8119 9.00374 25.0908 8.16695C24.1736 7.10238 23.0729 6.20318 21.836 5.51473C20.0141 4.50065 17.9593 3.97882 15.8743 4.00066C13.7893 4.02249 11.746 4.58725 9.94567 5.63926C8.72344 6.35347 7.64188 7.27552 6.74709 8.35907C6.04376 9.21078 4.83223 9.55228 3.87565 9V9Z" fill="url(#paint0_linear_341_90)"/>\n      <defs>\n      <linearGradient id="paint0_linear_341_90" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">\n      <stop stop-color="var(--AccentColor)"/>\n      <stop offset="1" stop-color="var(--AccentColor)"/>\n      </linearGradient>\n      </defs>\n      </svg>    \n      `;this.innerHTML=t}}class NeonCheckbox extends HTMLElement{constructor(){super();var e=this.getAttribute("checked");""==e&&(e="checked");var t=`\n      <label class="checkbox">\n        <input type="checkbox" ${e}>\n        <span class="checkmark" tabindex="1">\n          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path class="path" d="M15.2733 0.830727L4.9431 11.1693L0.726807 6.92629" stroke="var(--Alt)" stroke-width="1.45135" stroke-linecap="round" stroke-linejoin="round"/>\n          </svg>\n        </span>\n      </label>\n      `;this.innerHTML=t}}class NeonSwitch extends HTMLElement{constructor(){super();var e=this.getAttribute("checked");""==e&&(e="checked");var t=`\n      <label class="toggleSwitch">\n        <input type="checkbox" ${e}>\n        <span class="switch" tabindex="1">\n        </span>\n      </label>\n      `;this.innerHTML=t}}class NeonSlider extends HTMLElement{constructor(){super();var e=`\n      <div class="sliderContainer">\n        <input class="slider" id="${this.getAttribute("val")}" type="range">\n      </div>\n      `;this.innerHTML=e}}customElements.define("neon-checkbox",NeonCheckbox),customElements.define("neon-progressring",NeonProgressRing),customElements.define("neon-slider",NeonSlider),customElements.define("neon-switch",NeonSwitch);