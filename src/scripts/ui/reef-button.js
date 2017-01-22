/**
* @extends HTMLElement
*/
export default class ReefButton extends HTMLElement {

  /**
   * Creates shadowRoot, Set's up eventListeners & binds methods
   */
  constructor() {
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = '<slot></slot>';

    this.onMouseDown = this.onMouseDown.bind(this); // Bind method
    this.onMouseUp = this.onMouseUp.bind(this); // Bind method
    this.onMouseClick = this.onMouseClick.bind(this); // Bind method

    this.addEventListener('mousedown', this.onMouseDown);
    this.addEventListener('mouseup', this.onMouseUp);
    this.addEventListener('click', this.onMouseClick);
  }

  /**
   * Stamps innerHTML
   */
  connectedCallback() {
    let style = document.createElement('style');
    style.innerHTML = `
      :host {
        display: inline-flex;
        position: relative;
        padding: var(--reef-button-padding, 8px);
        align-items: center;
        max-height:  56px;
        border-radius: var(--reef-button-radius, 3px);
        text-transform: uppercase;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box !important;
        color: var(--reef-button-color, #111);
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2)
      }
      .ripple {
        background: rgba(0,0,0,0.12);
        position: absolute;
        opacity: 0;
        right: 0;
        bottom: 0;
        border-radius: var(--reef-button-ripple-radius, 50%);
        outline: none;
        transition: transform cubic-bezier(0.22, 0.61, 0.36, 1) 600ms;
        transform: translate3d(0,0,0);
      }
      .run {
        opacity: 1;
        top: 0;
        left: 0;
        transition: transform cubic-bezier(0, 0, 0.2, 1) 400ms;
        transform: translate3d(0,0,0);
      }
			:host([no-shadow]) {
				box-shadow: none;
			}
    `;
    this.ripple = document.createElement('div');
    this.ripple.classList.add('ripple');
    this.root.appendChild(this.ripple);
    this.root.appendChild(style);
  }

  /**
   * @return {Boolean}
   */
  get stopPropagationDisabled() {
    return this.hasAttribute('disable-stop-propagation');
  }

  /**
   * @return {String}
   */
  get name() {
    return this.getAttribute('name') + '-button-click' || 'reef-button-click';
  }

  /**
   * Add's mousedown to classList
   */
  onMouseDown() {
    this.classList.add('mousedown');
  }

  /**
   * Set's boxShadow=none & removes mousedown from the classList
   */
  onMouseUp() {
    this.classList.remove('mousedown');
  }

  /**
   * @param {Object} event
   */
  onMouseClick(event) {
    if (this.stopPropagationDisabled === false) {
      event.stopPropagation();
    }
    document.dispatchEvent(new CustomEvent(this.name)); // Fire event
    this._drawRipple(event.offsetX, event.offsetY);
  }

  /**
   * Runs the ripple
   */
  _drawRipple() {
    this.ripple.classList.add('run');
    setTimeout(() => {
      this.ripple.classList.remove('run');
    }, 320);
  }

}
customElements.define('reef-button', ReefButton);
