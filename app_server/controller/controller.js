const express = require("express");
const users = express.Router()
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

const User = require( "../models/UserModel");
users.use(cors());

const Posts = require("../models/UserModel");

process.env.SECRET_KEY = 'secret'

// module.exports = (app,users, User, Blog, Tag, Comment) => {

    // REGISTRO

    // Registrar un nuevo Usuario
    users.post('/register', (req, res) => {
        console.log(req.body)
        const userData = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        // Verificar si usuario no existe
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                // Si no existe, hacemos la encriptacion de password
                // y creamos usuairo
                bycrypt.hash(req.body.password,10,(err,hash) => {
                    userData.password = hash

                    User.create(userData)
                    .then( user => {
                        res.json({status: user.email + 'registered'})
                    }).catch(err => {
                        res.send('error: ' + err) 
                    })
                })
            } else {
                res.json({ error: 'El usuario ya existe!' })
                console.log('El usuario ya existe!')
            }
        }).catch(err => {
            res.send('error: ' + err);
        })
    })

    // LOGIN

    users.post('/login', (req, res) => {
        // Verificar si usuario no existe
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (bycrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
                console.log('Enviado de controller login: ' +token)
            } else {
                res.status(400);
                res.json({ error: 'El usuario no existe!' })
            }
        }).catch(err => {
            res.status(400);
            res.send('error: ' + err);
        })
    })

    // PROFILE

    users.get('/profile', (req, res, next) => {

        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
          }
        
          if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
              if (err) {
                console.log(err)
                return res.json({
                  success: false,
                  message: 'Token is not valid'
                });
              } else {
                req.decoded = decoded;
                console.log(req.decoded)
                next();
              }
            });
          } else {
            console.log('Auth token is not supplied')
            return res.json({
              success: false,
              message: 'Auth token is not supplied'
            });
          }
    
        
        // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
        // console.log('decoded de controller: ' + decoded)
        User.findOne({
            where: {
                id: decoded.id
            }
        }).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('El usuario no existe')
            }
        }).catch(err => {
            res.send('error : ' + err)
        })
    })

   
  

module.exports = users;

    // // get all posts
    // app.get('/api/blogs', (req, res) => {
    //     Blog.findAll({
    //         order: [['createdAt', 'DESC']]
    //     }).then(posts => {
    //         res.send({ posts });
    //         res.status(200);
    //         console.log('Sent list of items')
    //     }).catch((err) => {
    //         res.status(500);
    //         console.log(err);
    //     });
    // })

    // // create a blog post
    // app.post('/api/blogs', (req, res) => {
    //     const body = req.body
    //     const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name } })
    //         .spread((tag, created) => tag))

    //     User.findOne({ where: { id: body.userId } })
    //         .then(() => Blog.create(body))
    //         .then(blog => Promise.all(tags).then(storedTags => blog.addTags(storedTags)).then(() => blog))
    //         .then(blog => Blog.findOne({ where: { id: blog.id }, include: [User, Tag] }))
    //         .then(blogWithAssociations => res.json(blogWithAssociations))
    //         .catch(err => {
    //             res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.` })
    //             console.log(err)
    //         })
    // })

    // // find blogs belonging to one user or all blogs
    // app.get('/api/blogs/:userId?', (req, res) => {
    //     let query;
    //     if (req.params.userId) {
    //         query = Blog.findAll({
    //             order: [['createdAt', 'DESC']], include: [
    //                 { model: User, where: { id: req.params.userId } },
    //                 { model: Tag }
    //             ]
    //         })
    //     } else {
    //         query = Blog.findAll({ order: [['createdAt', 'DESC']], include: [Tag, User] })
    //     }
    //     return query.then(blogs => res.json(blogs))
    // })

    // // find comments belonging to one blog
    // app.get('/api/blogs/comments', (req, res) => {
    //     let query;
    //     if (req.params.userId) {
    //         query = Comment.findAll({
    //             order: [['createdAt', 'DESC']], include: [
    //                 { model: Blog, where: { id: req.params.blogId } },
    //                 { model: user }
    //             ]
    //         })
    //     } else {
    //         query = Comment.findAll({ order: [['createdAt', 'DESC']], include: [Blog, User] })
    //     }
    //     return query.then(comments => res.json(comments))
    // })

    // // Hacer un update de un post

    // app.put('/api/blogs/update/:blogpostId?', (req, res) => {
    //     Blog.update(
    //         {
    //             title: req.body.title,
    //             content: req.body.content,
    //             image: req.body.image,
    //             tags: req.body.tags
    //         },
    //         { returning: true, where: { id: req.params.blogpostId } }
    //     ).then(function ([numberOfAffectedRows, affectedRows]) {
    //         res.json(affectedRows)
    //         res.status(200);
    //         console.log('Updated post!')
    //     }).catch((err) => { res.status(500); console.log(err) });
    // });

    // // BORRAR UN POST 
    // app.delete('/api/blogs/delete/:blogpostId', (req, res) => {
    //     // const body = req.body 
    //     Blog.destroy({
    //         where: {
    //             id: req.params.blogpostId
    //         }
    //     }).then(resp => {
    //         res.send({ message: 'Blog Post eliminado' })
    //         res.status(200);
    //         console.log(resp);
    //     }).catch(err => {
    //         res.status(400)
    //         res.send({ message: 'Blog Post no existe' })
    //         console.log("error=" + err);
    //     });
    // });

    // //  Hacer un update de un comentario
    // app.put('/api/blogs/comments/:commentId?', (req, res, next) => {
    //     Comment.update(
    //         { content: req.body.content },
    //         { returning: true, where: { id: req.params.commentId } }
    //     ).then(function ([rowsUpdate, [updatedComment]]) {
    //         res.json(updatedComment)
    //     }).catch(next)
    // });

    // // find blogs by tag
    // app.get('/api/blogs/:tag/tag', (req, res) => {
    //     Blog.findAll({
    //         order: [['createdAt', 'DESC']],
    //         include: [
    //             { model: Tag, where: { name: req.params.tag } }
    //         ]
    //     })
    //         .then(blogs => res.json(blogs))
    // })

    // // create a comment
    // app.post('/api/blogs/comment/:blogpostId?', (req, res) => {
    //     const body = req.body
    //     // const comment = body.comment.map(comment => Tag.Create({ where: { content: tag.name }, defaults: { content: tag.name }})
    //     // .spread((tag, created) => tag))

    //     Blog.findOne({ where: { id: req.params.blogpostId } })
    //         .then(() => {
    //             Comment.create(body);
    //             res.status(201);
    //             console.log('Comment created!')
    //         })
    //         // }.then(blog => Promise.all(comment).then(storedTags => blog.addComments(storedComments)).then(() => blog))
    //         // .then(blog => Blog.findOne({ where: {id: blog.id}, include: [User, Comment]}))
    //         .then(blogWithAssociations => res.json(blogWithAssociations))
    //         .catch(err => {
    //             res.status(400).json({ err: `Blog with id = [${body.blopostId}] doesn\'t exist.` });
    //             console.log(err)
    //         });
    // })

    // // Borra un blog post
    // app.delete('/api/blogs/delete/:blogpostId', (req, res) => {
    //     // const body = req.body 
    //     Blog.destroy({
    //         where: {
    //             id: req.params.blogpostId
    //         }
    //     }).then(resp => {
    //         res.send({ message: 'Blog Post eliminado' })
    //         res.status(204);
    //         console.log(resp);
    //     }).catch(err => {
    //         res.status(400)
    //         res.send({ message: 'Blog Post no existe' })
    //         console.log("error=" + err);
    //     });
    // });

    // // Borrar un comentario 
    // app.delete('/api/blogs/comment/delete/:commentId?', (req, res) => {
    //     // const body = req.body 
    //     Comment.destroy({
    //         where: {
    //             id: req.params.commentId
    //         }
    //     }).then(resp => {
    //         res.send({ message: 'comentario eliminado' })
    //         console.log(resp);
    //     }).catch(err => {
    //         res.status(400)
    //         res.send({ message: 'comentario no existe' })
    //         console.log("error=" + err);
    //     });

    // });
// }
