import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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
const db = getDatabase(app);

document.getElementById("submit").addEventListener('click', function(eve) {
    eve.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const usersRef = ref(db, 'users');

    get(usersRef).then((snapshot) => {
        let userExists = false;
        let nextUserId = 1;

        snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.email === email) {
                userExists = true;
                return true; // Break the loop
            }
            nextUserId = Math.max(nextUserId, parseInt(childSnapshot.key) + 1);
        });

        if (userExists) {
            console.log("User already exists");
        } else {
            set(ref(db, 'users/' + nextUserId), {
                email: email,
                password: password
            });
            console.log("New user added with ID:", nextUserId);
        }
    }).catch((error) => {
        console.error("Error checking user:", error);
    });
});
