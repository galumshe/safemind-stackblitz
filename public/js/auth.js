// Handle registration
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful! Please login.');
      window.location.href = '/login.html';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during registration');
  }
});