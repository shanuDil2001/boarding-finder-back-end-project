import bcrypt from "bcrypt";

// Generating a random string
export function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
}

// Hashing password with a salt
export async function hashPassword(password, salt) {
  const newPassword = password + salt;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// Checking users password whether it is correct or not
export async function comparePasswords(provided, existing) {
  try {
    const isPasswordCorrect = await bcrypt.compare(provided, existing);

    return isPasswordCorrect;
  } catch (error) {
    console.error(error);
    return error;
  }
}
