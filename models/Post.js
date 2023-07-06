const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  texto: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  editadoEm: {
    type: Date,
    default: null
  }
});
 
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
