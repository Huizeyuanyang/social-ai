// Reads the username from the JWT saved after login.
// A JWT payload is only base64url-encoded (not encrypted), so the frontend can read it.
export function getUsername(token) {
  if (!token) return "";
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).username || "";
  } catch {
    return "";
  }
}
