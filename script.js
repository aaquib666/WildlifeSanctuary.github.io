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

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector(".sign-up-form");
  const signInForm = document.querySelector(".sign-in-form");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    signUpForm.reset();
  });

  signInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const enteredEmail = signInForm.querySelector('input[type="text"]').value;
    const enteredPassword = signInForm.querySelector('input[type="password"]').value;

    // Checking if the entered email and password match the specific credentials
    if (
      enteredEmail === "aaquib@z-admin.com" && 
      enteredPassword === "aaquib@admin"
    ) {
      // Redirect to the newsletter subscriptions page upon successful login
      window.location.href = "newsletter_subscriptions.html";
    } else if (
      storedUserData &&
      storedUserData.email === enteredEmail &&
      storedUserData.password === enteredPassword
    ) {
      // Redirect to the index page if the stored credentials match the entered credentials
      window.location.href = "index.html";
    } else {
      // Alert for invalid email or password
      alert("Invalid email or password. Please try again.");
    }
    signInForm.reset();
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

/* Newsletter Dashboard */

document.addEventListener("DOMContentLoaded", function() {
  const subscriptionsList = document.getElementById('subscriptions-list');
  const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
  
  subscriptions.forEach(function(subscription) {
      const listItem = document.createElement('li');
      listItem.textContent = subscription.email;

      // Create a button to remove the email
      const removeButton = document.createElement('button');
      removeButton.textContent = 'REMOVE';
      removeButton.className = 'remove-button';
      removeButton.style.marginLeft = '30px';
      removeButton.addEventListener('click', function() {
          // Remove the email from the list and update localStorage
          const index = subscriptions.indexOf(subscription);
          if (index !== -1) {
              subscriptions.splice(index, 1);
              localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
              subscriptionsList.removeChild(listItem);
          }
      });

      // Append the remove button to the list item
      listItem.appendChild(removeButton);

      // Append the list item to the subscriptions list
      subscriptionsList.appendChild(listItem);
  });
});

/* NWS Dashboard Redirect Button */
document.getElementById("redirect-btn").addEventListener("click", function() {
  window.location.href = "signup.html";
  });