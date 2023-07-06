const mongoose = require('mongoose');
const Post = require('../models/Post')

// Funções assíncronas
const post = {

    
    index: async (req, res) => {
        res.render('home')
    },
    criarPost: async (req, res) => {
        res.render('cadastrar/index')
    },
    salvaPost: async (req, res) => {
        

        console.log(req.body)

        if(!req.body.titulo || !req.body.categoria||!req.body.texto||!req.body.descricao||!req.body.status){
            req.flash('error_msg', 'Preencha todos os campos');
            return res.redirect('/cadastrar')

        }

        try {
            const novoPost = new Post({
              titulo:req.body.titulo,
              categoria:req.body.categoria,
              descricao:req.body.descricao,
              texto:req.body.texto,
              status:req.body.status
            });

            await novoPost.save()
            
            req.flash('success_msg', `Cadastro realizado com sucesso! ${novoPost._id}`);
            res.redirect('/')

          } catch (error) {
            throw new Error('Erro ao criar o post: ' + error.message);
          }
        
        



 
    },
    vizPost: async (req, res) => {

        let id = req.params.id

        console.log(id)

        let post = await Post.findOne({_id:id})

        console.log(post)


        res.render('vizPost/index',{
            post: post.toJSON()
        })

    },
    delPost: async (req, res) => {
        //res.render('cadastrar/index')
    },
    Posts: async (req, res) => {

        let posts = await Post.find({status:'ativo'})

      


        res.render('vizualizar/index',{
            posts: posts.map(post => post.toJSON())
        })
    }

};

// Exportar as funções
module.exports = post;