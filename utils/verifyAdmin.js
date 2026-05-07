export default function isAdmin(user) {
  if (user !== undefined) {
    if (user.role === "admin") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
