const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

/* Users Data JSON */

document.addEventListener('DOMContentLoaded', function() {
  const signInForm = document.querySelector('.sign-in-form');
  signInForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = signInForm.querySelector('.input-wrap:nth-child(1) input').value;
      const password = signInForm.querySelector('.input-wrap:nth-child(2) input').value;

      // Assuming users.json contains the user data
      fetch('users.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch user data');
              }
              return response.json();
          })
          .then(users => {
              const user = users.find(u => u.username === username && u.password === password);
              if (user) {
                  // Store user details in localStorage
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  window.location.href = 'index.html';
              } else {
                  alert('Invalid username or password');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Failed to authenticate. Please try again later.');
          });
  });
});

/* Newsletter */

function newsletterForm() {
  return {
    email: '',
    subscribe() {
      // Saves subscriptions to the localStorage
      const subscription = {
        email: this.email
      };
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
      subscriptions.push(subscription);
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

      // To clear the form fields after submission
      this.email = '';

      alert('Subscription successful!'); // You can replace this with any UI feedback you want
    }
  };
}
