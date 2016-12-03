'use strict';
/**
 * @extends HTMLElement
 */
class ReefTimeSelector extends HTMLElement {
  /**
   * Attributes to observer
   * @return {Array} []
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * Calls super
   */
  constructor() {
   super();
  }

  /**
   * Stamps innerHTML
   */
  connectedCallback() {
    this.innerHTML = `
       <style>
         :host {
           display: flex;
         }
         :host, svg {
           width: 200px;
           height: 200px;
         }
         .plate {
           flex: 1;
           background: #fff;
         }
         .fg, bearing {
           stroke: none;
           fill: #0095dd;
         },
         bg {
           stroke: none;
           fill: #c0e5f7;
         }
       </style>
       <svg>
         <g transform="translate(100,100)">
           <line x1="0" y1="0" x2="0" y2="-80"></line>
           <circle class="fg" r="3.5" cx="0" cy="-80"></circle>
           <circle class="bg" r="13" cx="0" cy="-80"></circle>
           <circle class="bearing" cx="0" cy="0" r="2"></circle>
         </g>
       </svg>
    `;
  }

  /**
   * Runs whenever attribute changes are detected
   * @param {string} name The name of the attribute that changed.
   * @param {string|object|array} oldValue
   * @param {string|object|array} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
   console.log(name, oldVal, newVal);
  }
}
customElements.define('reef-time-selector', ReefTimeSelector);
