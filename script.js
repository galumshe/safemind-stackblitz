console.log('Hello!');

// form validation to confirm the passwords match 
 document.getElementById("signup-form").addEventListener("submit", function (e) {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        if (password !== confirmPassword) {
            e.preventDefault(); // Prevents form submission
            alert("Passwords do not match! Please try again.");
        }
    });

// Form validation for signup and contact forms
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for signing up!');
});

document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Your message has been sent successfully!');
  });
