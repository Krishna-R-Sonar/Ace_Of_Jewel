// Utility function for form validation

// Check if email is valid
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Check if password meets strength requirements
  export function isValidPassword(password) {
    // At least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
  
  // Check if a required field is not empty
  export function isRequiredField(value) {
    return value.trim() !== '';
  }
  
  // Example usage:
  // if (isValidEmail('test@example.com')) {
  //   console.log('Valid email');
  // } else {
  //   console.log('Invalid email');
  // }
  
  // if (isValidPassword('StrongPass@123')) {
  //   console.log('Valid password');
  // } else {
  //   console.log('Invalid password');
  // }
  