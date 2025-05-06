import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setFormData({ title: res.data.title, content: res.data.content });
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };
    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/notes/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.message);
      alert('Failed to update note');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        <br />
        <textarea name="content" value={formData.content} onChange={handleChange} required />
        <br />
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
