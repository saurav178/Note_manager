import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Note';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddNote /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
