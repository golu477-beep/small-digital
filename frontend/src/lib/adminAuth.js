import jwt from "jsonwebtoken";

export const ADMIN_COOKIE = "small_digital_admin";
const TOKEN_ISSUER = "small-digital";
const TOKEN_AUDIENCE = "small-digital-admin";
const TOKEN_LIFETIME_SECONDS = 60 * 60 * 8;

export function adminCredentialsConfigured() {
  return Boolean(
    globalThis.process.env.ADMIN_EMAIL &&
    globalThis.process.env.ADMIN_PASSWORD_HASH &&
    globalThis.process.env.ADMIN_JWT_SECRET &&
    globalThis.process.env.ADMIN_JWT_SECRET.length >= 32,
  );
}

export function createAdminToken(email) {
  if (!adminCredentialsConfigured()) {
    throw new Error("Admin authentication is not configured.");
  }

  return jwt.sign(
    { email },
    globalThis.process.env.ADMIN_JWT_SECRET,
    {
      algorithm: "HS256",
      audience: TOKEN_AUDIENCE,
      issuer: TOKEN_ISSUER,
      subject: "admin",
      expiresIn: TOKEN_LIFETIME_SECONDS,
    },
  );
}

function readCookie(request, name) {
  const cookies = request.headers.cookie?.split(";") ?? [];
  const cookie = cookies.find((item) => item.trim().startsWith(`${name}=`));
  if (!cookie) return "";
  return decodeURIComponent(cookie.trim().slice(name.length + 1));
}

export function setAdminCookie(response, token) {
  const attributes = [
    `${ADMIN_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/api/admin",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${TOKEN_LIFETIME_SECONDS}`,
  ];
  if (globalThis.process.env.NODE_ENV === "production") attributes.push("Secure");
  response.setHeader("Set-Cookie", attributes.join("; "));
}

export function clearAdminCookie(response) {
  const attributes = [
    `${ADMIN_COOKIE}=`,
    "Path=/api/admin",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=0",
  ];
  if (globalThis.process.env.NODE_ENV === "production") attributes.push("Secure");
  response.setHeader("Set-Cookie", attributes.join("; "));
}

export function verifyAdminRequest(request, response) {
  if (!adminCredentialsConfigured()) {
    response.status(503).json({
      success: false,
      message: "Admin authentication is not configured on the server.",
    });
    return false;
  }

  const token = readCookie(request, ADMIN_COOKIE);
  if (!token) {
    response.status(401).json({ success: false, message: "Please sign in to continue." });
    return false;
  }

  try {
    request.admin = jwt.verify(token, globalThis.process.env.ADMIN_JWT_SECRET, {
      algorithms: ["HS256"],
      audience: TOKEN_AUDIENCE,
      issuer: TOKEN_ISSUER,
      subject: "admin",
    });
    return true;
  } catch {
    clearAdminCookie(response);
    response.status(401).json({ success: false, message: "Your session has expired. Please sign in again." });
    return false;
  }
}

export function verifySameOrigin(request, response) {
  const origin = request.headers.origin;
  if (typeof origin !== "string") {
    response.status(403).json({ success: false, message: "A same-origin request is required." });
    return false;
  }

  try {
    const originUrl = new URL(origin);
    const isHttps = globalThis.process.env.NODE_ENV === "production";
    if (
      originUrl.host !== request.headers.host ||
      (isHttps && originUrl.protocol !== "https:") ||
      (!isHttps && !["http:", "https:"].includes(originUrl.protocol))
    ) {
      response.status(403).json({ success: false, message: "A same-origin request is required." });
      return false;
    }
    return true;
  } catch {
    response.status(403).json({ success: false, message: "A valid request origin is required." });
    return false;
  }
}
