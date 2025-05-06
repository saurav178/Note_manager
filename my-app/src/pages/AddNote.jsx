import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AddNote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notes', {
        title: formData.title,
        content: formData.content,  // Important! Add content
      });
      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.message);
      alert('Failed to add note');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
