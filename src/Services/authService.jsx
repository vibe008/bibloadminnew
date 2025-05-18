import { appuri } from "../ApiUrl/appurl"
export const registerUser = async (userData) => {
  try {
    console.log("userDataapi", userData)
    const res = await fetch(`${appuri}api/auth/register-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    const data = await res.json()
    return {
      status: res.status,
      data,
    }
  } catch (error) {

  }

};


export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${appuri}api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // to send cookies
      body: JSON.stringify(userData),
    });
    const data = await res.json()
    return {
      status: res.status,
      data,
    }
  } catch (error) {
    console.log("error", error)
  }
};

export const LogoutUser = async () => {
  try {
    const res = await fetch(`${appuri}api/auth/logout`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    console.log("data", data);
    return true; // ✅ fix here
  } catch (error) {
    console.error("Logout failed", error); // also fix variable name from `err` to `error`
    return false;
  }
};

export const fetchLoggedInUser = async () => {
  try {
    const res = await fetch(`${appuri}api/auth/me`, {
      method: "GET",
      credentials: "include", // include cookie
    });
    const data = await res.json();
    return data.user;
  } catch (err) {
    console.error("Error fetching user or not logged in", err);
    return null
  }
};



