const login = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@gmail.com", password: "admin" }),
    });
    const data = await response.json();
    console.log("Login Status:", response.status);
    if (data.success) {
      console.log("Login Successful, Token received.");
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      console.log("Token Payload:", payload);
      return data.token;
    } else {
      console.log("Login Failed:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    return null;
  }
};

const accessProtected = async (token) => {
  if (!token) return;
  try {
    const response = await fetch("http://localhost:3000/api/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: "Test Movie" }),
    });

    console.log("Protected Route Status:", response.status);
    const data = await response.json();
    console.log("Response:", data);

    if (response.status === 403 || response.status === 401) {
      console.log("Access Denied!");
    } else {
      console.log("Access Granted (or at least Auth passed)!");
    }
  } catch (error) {
    console.error("Protected Route Error:", error.message);
  }
};

(async () => {
  const token = await login();
  await accessProtected(token);
})();
