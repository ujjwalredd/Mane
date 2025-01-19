// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWfLvvzNnfDFh8bIbtTfMSa_AjhYWNtjM",
    authDomain: "mane-a8168.firebaseapp.com",
    databaseURL: "https://mane-a8168-default-rtdb.firebaseio.com",
    projectId: "mane-a8168",
    storageBucket: "mane-a8168.firebasestorage.app",
    messagingSenderId: "269438093729",
    appId: "1:269438093729:web:b7145ff880dd5b4dd963e0"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                return; // Stop further execution if passwords don't match
            }
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                window.location.href = 'login.html';
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
        });

    }
});

