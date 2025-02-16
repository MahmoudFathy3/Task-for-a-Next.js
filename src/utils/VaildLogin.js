export const vaildLogin = (email, password, setErrors) => {
  let isValid = true;
  const newErrors = { email: '', password: '' };

  // Validate email
  if (!email) {
    newErrors.email = 'Email is required';
    isValid = false;
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    newErrors.email = 'Invalid email format';
    isValid = false;
  }

  // Validate password
  if (!password) {
    newErrors.password = 'Password is required';
    isValid = false;
  } else if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters long';
    isValid = false;
  }

  // Set errors in state
  setErrors(newErrors);

  return isValid;
};
