import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="logo">QuickNotes</h2>
      {isLoggedIn ? (
        <>
          <Link to="/" className="nav-link">Notes</Link>
          <Link to="/add" className="nav-link">Add Note</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
