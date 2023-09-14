const { getAllPosts, createPost, updatePost, getPostById, deletePost, renderCreatePost, renderDeletePost, renderUpdatePost } = require('../controllers/post.controllers')

const routes = require('express').Router()


routes.get('/', getAllPosts)
routes.get('/create', renderCreatePost)
routes.post('/create', createPost)
routes.get('/delete/:id', renderDeletePost)
routes.get('/update/:id', renderUpdatePost)
routes.post('/update/:id', updatePost)
routes.get('/:id', getPostById)
routes.delete('/delete/:id', deletePost)

module.exports = routes