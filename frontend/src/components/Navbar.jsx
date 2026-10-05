import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [name, setName] = useState(
    localStorage.getItem("name")
  );

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
    setName(localStorage.getItem("name"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    setLoggedIn(false);
    setName(null);

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        📝 BlogSphere
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {loggedIn ? (
          <>
            <Link to="/create">Create Post</Link>

            <Link to="/my-posts">My Posts</Link>

            <span className="welcome">
              Hi, {name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="login-btn"
          >
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;