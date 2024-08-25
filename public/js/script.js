function validateForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if all fields are filled and have more than 3 characters
    if (username.length <= 3 || email.length <= 3 || password.length <= 3) {
        alert('All fields must be filled and have more than 3 characters');
        return false; // Prevent form submission
    }

    // Check if all fields contain only text
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        alert('All fields must contain only text');
        return false; // Prevent form submission
    }

    // If validation passes
    return true; // Allow form submission
}