export const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
  // Check for at least one number
  const hasNumber = /\d/.test(password);

  const hasUppercase = /[A-Z]/.test(password);

  // Check for at least one special character (you can customize the character set)
  const hasSpecialCharacter = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

  // Return true if both conditions are met
  return hasNumber && hasSpecialCharacter && hasUppercase;
};

export const validateForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Please enter valid name with at least 3 character";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!isEmailValid(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Your password must have at least 8 characters";
  } else if (!isPasswordValid(values.password)) {
    errors.password =
      "must have at one uppercase, number and special character";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "This field is required";
  } else if (!(values.confirmPassword == values.password)) {
    errors.confirmPassword = "You password does not match";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (values.phone.length < 11) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!values.identity) {
    errors.identity = "This field is required";
  } else if (values.identity.length < 5) {
    errors.identity = "Please enter valid number with at least 5 numbers";
  }

   if(!values.dob){
    errors.dob = "This field is required";
   }

  return errors;
};

export const validateEmail = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!isEmailValid(values.email)) {
    errors.email = "Please enter a valid email";
  }
  return errors;
};


export const truncatedWord = ( text, maxWords ) => {
  const words = text.split(" ");
  const truncatedText = words.slice(0, maxWords).join(" ");

  return truncatedText
};

export const truncatedText = (text, maxCharacters ) => {
  const truncatedText =
    text.length > maxCharacters
      ? text.substring(0, maxCharacters) + "..."
      : text;

  return truncatedText;
};