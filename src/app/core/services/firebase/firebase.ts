import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9zPSSf6Fl27kUXtNhFi7EhFaI3iqK4fU",
  authDomain: "exercicios-diarios-1793c.firebaseapp.com",
  projectId: "exercicios-diarios-1793c",
  storageBucket: "exercicios-diarios-1793c.firebasestorage.app",
  messagingSenderId: "492919771583",
  appId: "1:492919771583:web:471f83c033fd70c56b110a",
  measurementId: "G-GFZHDBER8B"
};


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  auth = getAuth(this.app);
  db = getFirestore(this.app);
}
