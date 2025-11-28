const API = "https://depi-backend-five.vercel.app";


async function request(url, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };
  // Add Authorization header if authentication is required
  if (auth) headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

  try {
    const res = await fetch(API + url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const text = await res.text();
    let data;
    try { 
      // Attempt to parse JSON response
      data = JSON.parse(text); 
    } 
    catch { 
      // If parsing fails, treat the raw text as a message
      data = { message: text }; 
    }

    return { ok: res.ok, data };
  } catch (err) {
    return { ok: false, data: { message: "Network error. Please check your connection." } };
  }
}

// --- Authentication Exports ---

export function register(userData) { 
  return request("/auth/register", "POST", userData); 
}

export function login(userData) { 
  return request("/auth/login", "POST", userData); 
}

// CORRECTED: This now takes the email and OTP in the body and uses a POST method.
export function verifyEmail(verificationData) { 
  return request("/auth/verify", "POST", verificationData); 
}

export function forgotPassword(emailData) {
  return request("/auth/forgot-password", "POST", emailData);
}

export function resetPassword(resetData) {
  return request("/auth/reset-password", "POST", resetData);
}

// --- Level & Course Exports ---

export function getLevels() { 
  return request("/levels/levels", "GET", null, true); 
}

export function getPurchasedLevels() { 
  return request("/levels/purchased-levels", "GET", null, true); 
}

export function createCheckoutSession(levelId) { 
  // Backend requires levelId, userId, price, levelTitle in the body, but 
  // we only send levelId and rely on the backend to look up the rest from the token.
  return request("/stripe/create-checkout-session", "POST", { levelId }, true); 
}

// --- Unit Exports ---

export function getUnits(levelId) { 
  return request(`/units/${levelId}/units`, "GET", null, true); 
}

export function getUnit(levelId, unitId) { 
  return request(`/units/${levelId}/${unitId}`, "GET", null, true); 
}

export function completeUnit(unitId) { 
  return request(`/units/${unitId}/complete`, "POST", null, true); 
}