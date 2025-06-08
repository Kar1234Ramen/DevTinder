const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const isEditable = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    isEditable.includes(field)
  );

  const validateFields = (field) => {
    if (field === "emailId" && !validator.isEmail(req.body[field])) {
      throw new Error("Email is not valid");
    } else if (
      field === "age" &&
      (req.body[field] < 18 || req.body[field] > 100)
    ) {
      throw new Error("Age must be between 18 and 100");
    } else if (field === "photoUrl" && !validator.isURL(req.body[field])) {
      throw new Error("Photo URL is not valid");
    } else if (
      field === "about" &&
      !validator.isLength(req.body[field], { max: 500 })
    ) {
      throw new Error("About section cannot exceed 500 characters");
    } else if (field === "skills" && !Array.isArray(req.body[field])) {
      throw new Error("Skills must be an array");
    }
    return true;
  };

  const isValid = Object.keys(req.body).every((field) => validateFields(field));

  if (isEditAllowed && isValid) {
    return true;
  }
};

const updatedPasswordValidator = (req) => {
  const { password } = req.body;

  if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
  updatedPasswordValidator,
};
