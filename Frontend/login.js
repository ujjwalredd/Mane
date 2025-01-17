import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBWfLvvzNnfDFh8bIbtTfMSa_AjhYWNtjM",
    authDomain: "mane-a8168.firebaseapp.com",
    databaseURL: "https://mane-a8168-default-rtdb.firebaseio.com",
    projectId: "mane-a8168",
    storageBucket: "mane-a8168.firebasestorage.app",
    messagingSenderId: "269438093729",
    appId: "1:269438093729:web:b7145ff880dd5b4dd963e0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const loginForm = document.getElementById('submit');

if (loginForm) {
  loginForm.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Reference to the users node
        const usersRef = ref(db, 'users');
        
        get(usersRef).then((snapshot) => {
          if (snapshot.exists()) {
            const users = snapshot.val();
            let emailExists = false;
            
            // Check if email already exists
            for (let userId in users) {
              if (users[userId].email === email) {
                emailExists = true;
                console.log("Email already exists. Not updating database.");
                break;
              }
            }
            
            if (!emailExists) {
              // Email doesn't exist, proceed with adding new user
              let newUserId = 1;
              const userIds = Object.keys(users).map(Number);
              newUserId = Math.max(...userIds) + 1;
              
              const userRef = ref(db, 'users/' + newUserId);
              set(userRef, {
                email: user.email,
                lastLogin: new Date().toISOString(),
                firebaseUid: user.uid
              });
              console.log("New user data added to database with ID:", newUserId);
            }
          } else {
            // No users exist, add the first user
            const userRef = ref(db, 'users/1');
            set(userRef, {
              email: user.email,
              lastLogin: new Date().toISOString(),
              firebaseUid: user.uid
            });
            console.log("First user added to database with ID: 1");
          }
          
          // Redirect to profile page
          window.location.href = 'profile.html';
        }).catch((error) => {
          console.error("Error checking user data:", error);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
}