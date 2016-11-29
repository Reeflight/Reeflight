import BaseController from './base-controller';

export default class FirebaseController extends BaseController {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    const script = document.createElement('script');
    script.src = 'bower_components/firebase/firebase.js';
    script.setAttribute('async', '');
    script.onload = () => {
      // Initialize Firebase onload
      firebase.initializeApp(this.config);
      document.dispatchEvent(new CustomEvent('firebase-ready'));
    }
    this.appendChild(script);
  }
  get config() {
    return {
      apiKey: "AIzaSyCxBWJTjZ822a_0bxGbTJV3F1dZoQVFo1w",
      authDomain: "reeflight-fb71e.firebaseapp.com",
      databaseURL: "https://reeflight-fb71e.firebaseio.com",
      storageBucket: "reeflight-fb71e.appspot.com",
      messagingSenderId: "117361697825"
    };
  }
}
