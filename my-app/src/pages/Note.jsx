import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const res = await API.get('/notes');
      setNotes(res.data);
    } catch (error) {
      console.error(error.response?.data?.message);
      alert('Failed to load notes');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await API.delete(`/notes/${id}`);
        fetchNotes(); // Refresh notes after deletion
      } catch (error) {
        console.error(error.response?.data?.message);
        alert('Failed to delete note');
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Notes</h2>
      <Link to="/add">
        <button>Add New Note</button>
      </Link>
      <div>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} style={{ border: '1px solid gray', margin: '10px 0', padding: '10px' }}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <Link to={`/edit/${note._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(note._id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
