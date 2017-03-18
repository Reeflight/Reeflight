'use strict';
export default base => class extends base {
	connected() {
		this.onMouseDown = this.onMouseDown.bind(this); // Bind method
    this.onMouseUp = this.onMouseUp.bind(this); // Bind method
    this.onMouseClick = this.onMouseClick.bind(this); // Bind method

    this.addEventListener('mousedown', this.onMouseDown);
    this.addEventListener('mouseup', this.onMouseUp);
    this.addEventListener('click', this.onMouseClick);
	}

	get ripple() {
		return this.root.querySelector('custom-ripple');
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
    this.ripple.run();
  }


  /**
   * @return {Boolean}
   */
  get stopPropagationDisabled() {
    return this.hasAttribute('disable-stop-propagation');
  }
};
