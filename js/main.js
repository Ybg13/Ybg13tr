const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1 // Elemanın %10'u göründüğünde tetiklenir
});

// Reveal sınıfına sahip tüm elemanları izlemeye al
const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

// Firebase SDK'larını eklediğinizi varsayıyorum (İster CDN ister modül)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


 const firebaseConfig = {
    apiKey: "AIzaSyBzB59QQDTDZmf4AoRCrqPoxPIDDm7w_oM",
    authDomain: "ybg13lab.firebaseapp.com",
    projectId: "ybg13lab",
    storageBucket: "ybg13lab.firebasestorage.app",
    messagingSenderId: "735845573440",
    appId: "1:735845573440:web:8daab4b3727cc78fdc90a5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Formu yakalayalım
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.querySelector('#submit-btn');
    btn.innerText = "Gönderiliyor...";
    
    try {
        await addDoc(collection(db, "messages"), {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            message: document.querySelector('#message').value,
            timestamp: new Date()
        });
        
        document.querySelector('#form-status').innerText = "Mesajınız başarıyla iletildi!";
        contactForm.reset();
    } catch (error) {
        document.querySelector('#form-status').innerText = "Bir hata oluştu. Tekrar deneyin.";
    }
    btn.innerText = "Gönder";
});
