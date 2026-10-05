import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isLogin
        ? "/auth/login"
        : "/auth/register";

      const response = await API.post(url, form);

      if (isLogin) {
        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "name",
          response.data.name
        );

        alert("Login successful");
        navigate("/");
      } else {
        alert("Registration successful");

        setForm({
          name: "",
          email: "",
          password: ""
        });

        setIsLogin(true);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">
          📝
        </div>

        <h1>
          {isLogin
            ? "Welcome Back!"
            : "Join BlogSphere"}
        </h1>

        <p className="auth-subtitle">
          {isLogin
            ? "Login to continue sharing your ideas."
            : "Create an account and start writing."}
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Register" : " Login"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Auth;