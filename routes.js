const express = require('express');
const router = express.Router();

const postController = require('./controllers/postController');

router.get('/', postController.index);

router.get('/posts', postController.Posts);

router.get('/posts/:id', postController.vizPost);

router.get('/cadastrar', postController.criarPost);

router.post('/cadastrar', postController.salvaPost);

router.post('/deletar', postController.criarPost);


module.exports = router;
