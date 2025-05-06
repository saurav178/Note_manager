const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, body,content, tags } = req.body;
  const note = await Note.create({ title, body,content, tags, user: req.user._id });
  res.json(note);
};

exports.updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not allowed' });
  }
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not allowed' });
  }
  await note.deleteOne();
  res.json({ message: 'Note deleted' });
};
