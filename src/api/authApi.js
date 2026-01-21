const API_KEY = "AIzaSyAEBB3j4x5KkYRa-TVD5V_wXsluRbx_VrQ";
const BASE_URL = "https://identitytoolkit.googleapis.com/v1";

// Login existing user
export async function loginUser(email, password) {
    const response = await fetch(
        `${BASE_URL}/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        }
    );
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error.message);
    }

    return data;
}

// Signup new user
export async function signupUser(email, password) {
    const response = await fetch(
        `${BASE_URL}/accounts:signUp?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error.message);
    }

    return data;
}

//  Send password reset email

export async function sendPasswordReset(email) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAEBB3j4x5KkYRa-TVD5V_wXsluRbx_VrQ`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message);
  }

  return data;
}
