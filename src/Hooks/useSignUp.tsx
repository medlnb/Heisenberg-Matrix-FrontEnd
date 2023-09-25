export const useSignUp = async (username: string, email: string, password: string) => {
  const API_Url = "https://heisenberg-matrix-backend.onrender.com/api/user/signup";
  const user = {
    username,
    email,
    password,
    expired: false
  };

  try {
    const response = await fetch(API_Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    localStorage.setItem("username", json.username)
    localStorage.setItem("email", json.email)
    localStorage.setItem("token", json.token)
    return json



  } catch (err) {
    return { err: "An error occurred while making the request." };
  }
};
