window.onload = function() {
  toggleTheme()
  AttachContextMenu('body', 'menu')
}

//Context menu
function AttachContextMenu(element, id) {
  let contextMenuElement = document.querySelector(element);
  let contextMenuID = document.getElementById(id);

  contextMenuElement.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      contextMenuID.style.display = 'flex'
      contextMenuID.style.top = e.pageY + 'px'
      contextMenuID.style.left = e.pageX + 'px'
  }, false);

  document.addEventListener('click', function(e) {
      contextMenuID.style.display = 'none'
  }, false);
}

function generatePalette(theme) {
  //Get the accent color
  let Root = document.querySelector(':root');
  let AccentColor = getComputedStyle(Root).getPropertyValue('--AccentColor');
  let values;
  //Values for generating colors, based on the theme
  if(theme == 'Light') {
      values = [{
      name: 'AccentColorLight',
      theme: 'LightMode',
      value: 10
      },
      {
      name: 'AccentColor',
      theme: 'LightMode',
      value: 0
      },
      {
      name: 'AccentColorDark',
      theme: 'LightMode',
      value: -10
      }]
  }
  else {
      values = [{
      name: 'AccentColorLight',
      theme: 'DarkMode',
      value: 40
      },
      {
      name: 'AccentColor',
      theme: 'DarkMode',
      value: 30
      },
      {
      name: 'AccentColorDark',
      theme: 'DarkMode',
      value: 0
      }]
  }
  values.forEach(function (e) {
      //Turn the accent color into an array
      var HSLArray = AccentColor.split(',');
      //Copy the array and remove everything from it except the last value
      var Light = Array.from(HSLArray).splice(2, 1).toString();
      //Remove the %) and space at the beginning
      Light = Light.slice(0, -2);
      Light = Light.substring(1);
      //Convert light to a number
      let LightNumber = Number(Light)
      LightNumber+=e.value //Add the value
      //Make the sure light is less than 100%
      if(LightNumber >= 100) {
          LightNumber = 100
      }
      if(LightNumber <= 0) {
          LightNumber = 0
      }
      //Update Light with the new number and add %) back
      Light = LightNumber.toString()+'%)'
      //Remove the old color from the array
      HSLArray.splice(2, 1)
      //Push the new light to the color array
      HSLArray.push(Light)

      document.body.style.setProperty('--' + e.name, HSLArray);
  });
}

function toggleTheme(theme) {
  switch(theme) {
      case 'Light':
          set('LightMode')
      break;
      case 'Dark':
          set()
      break;
      case 'Switch':
      if(document.body.classList.contains('LightMode')) {
          set()
      }
      else {
          set('LightMode')
      }
      break;
      case undefined:
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      if (systemTheme.matches) {
          set()
      }
      else {
          set('LightMode')
      }
      break
  }
  function set(mode) {

      //Generate an array from the classes
      let classArray = Array.from(document.body.classList)
      classArray.splice(0, 1)
      generatePalette('Light')

      if(mode == 'LightMode') {
      classArray.unshift('LightMode')
      generatePalette('Light')
      }
      else {
      classArray.unshift('DarkMode')
      generatePalette()
      }

      //Turn classes into a string
      let classes = classArray.join(' ');
      document.body.setAttribute('class', classes)
  }
}
function toggleClass(element, class1, class2) {
  let classArray = Array.from(document.querySelector(element).classList)
  classArray.splice(0, 1)
  if(document.querySelector(element).classList.contains(class1)) {classArray.push(class2)}
  else {classArray.push(class1)}
  //Turn classes into a string
  let classes = classArray.join(' ');
  document.querySelector(element).setAttribute('class', classes)
}
function generateSnackbar(content, buttonText, buttonID) {
  let snackbar = document.createElement('div')
  snackbar.classList.add('snackbar')
  let snackbarHTML = `
  <p>${content}</p>
  <button class="linkButton">${buttonText}</button>
  `
  snackbar.innerHTML = snackbarHTML
  document.querySelector('.snackbarParent').appendChild(snackbar)
  snackbar.querySelector('button').setAttribute('id', buttonID)
  snackbar.onanimationend = function() {
      snackbar.style.animation="snackbarDisappear 0.3s 8s forwards";
      snackbar.onanimationend = function() {
      snackbar.remove()
      }
  }
}

//Web components
class NeonProgressRing extends HTMLElement  {  
  constructor() {
      super();
      var ProgressRingSize = this.getAttribute('data-size')
      if(ProgressRingSize === null) {
          ProgressRingSize = '40'
      }
      var ProgressRingHTML = `
      <svg width="${ProgressRingSize}" height="${ProgressRingSize}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16Z" fill="var(--Border1)"/>
      <path d="M3.87565 9C2.91906 8.44771 2.58188 7.2151 3.24912 6.33484C4.51659 4.66272 6.10475 3.25084 7.92755 2.18567C10.3279 0.782995 13.0524 0.029993 15.8324 0.000877422C18.6125 -0.0282382 21.3521 0.667538 23.7813 2.01963C25.6261 3.04639 27.2434 4.4247 28.5457 6.06991C29.2312 6.936 28.9199 8.1754 27.9751 8.7476V8.7476C27.0303 9.3198 25.8119 9.00374 25.0908 8.16695C24.1736 7.10238 23.0729 6.20318 21.836 5.51473C20.0141 4.50065 17.9593 3.97882 15.8743 4.00066C13.7893 4.02249 11.746 4.58725 9.94567 5.63926C8.72344 6.35347 7.64188 7.27552 6.74709 8.35907C6.04376 9.21078 4.83223 9.55228 3.87565 9V9Z" fill="url(#paint0_linear_341_90)"/>
      <defs>
      <linearGradient id="paint0_linear_341_90" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
      <stop stop-color="var(--AccentColor)"/>
      <stop offset="1" stop-color="var(--AccentColor)"/>
      </linearGradient>
      </defs>
      </svg>    
      `
      this.innerHTML = ProgressRingHTML;
  }
}
class NeonCheckbox extends HTMLElement  {  
  constructor() {
      super();
      var State = this.getAttribute('checked')
      if(State == '') {
          State = 'checked'
      }
      var CheckboxHTML = `
      <label class="checkbox">
          <input type="checkbox" ${State}>
          <span class="checkmark" tabindex="1">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="path" d="M15.2733 0.830727L4.9431 11.1693L0.726807 6.92629" stroke="var(--Alt)" stroke-width="1.45135" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>
      </label>
      `
      this.innerHTML = CheckboxHTML;
  }
}
class NeonSwitch extends HTMLElement  {  
  constructor() {
      super();
      var State = this.getAttribute('checked')
      if(State == '') {
          State = 'checked'
      }
      var SwitchHTML = `
      <label class="toggleSwitch">
          <input type="checkbox" ${State}>
          <span class="switch" tabindex="1">
          </span>
      </label>
      `
      this.innerHTML = SwitchHTML;
  }
}
class NeonSlider extends HTMLElement  {  
  constructor() {
      super();
      var id = this.getAttribute('data-sliderID')
      var min = this.getAttribute('min')
      var max = this.getAttribute('max')
      var value = this.getAttribute('value')
      
      var SliderHTML = `
      <div class="sliderContainer">
          <input class="slider" id="${id}" min="${min}" value="${value}" max="${max}" type="range">
      </div>
      `
      this.innerHTML = SliderHTML;
      this.style.setProperty('--SliderValue', `${this.querySelector('input').value}%`)
      this.addEventListener("change", function() {
          this.style.setProperty('--SliderValue', `${this.querySelector('input').value}%`)
      }, false);        
  }
}
/*                                       */
customElements.define('neon-checkbox', NeonCheckbox);
customElements.define('neon-progressring', NeonProgressRing);
customElements.define('neon-slider', NeonSlider);
customElements.define('neon-switch', NeonSwitch);