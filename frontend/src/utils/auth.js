import { jwtDecode } from "jwt-decode";

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token); // vraća { id, username, email, iat, exp }
  } catch {
    return null;
  }
};
