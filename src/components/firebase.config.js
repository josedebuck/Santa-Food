import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBkUiNMC5SiF-LeI49blJRTH53_p7RTqC0",
    authDomain: "restaurantapp-7979b.firebaseapp.com",
    databaseURL: "https://restaurantapp-7979b-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-7979b",
    storageBucket: "restaurantapp-7979b.appspot.com",
    messagingSenderId: "82233303271",
    appId: "1:82233303271:web:835f458e742a722ec30242"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app, firestore, storage};