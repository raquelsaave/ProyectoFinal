// const express = require('express');
const path = require('path');

// const app = express();

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'blog_cliente/build')));

// // An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });

// // Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log('App is listening on port ' + port);

// Dependencias
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// Controllers
// const JWTController = require('./app/controllers/JWTController');
// const PostController = require('./app/controllers/PostController');
// const TagController = require('./app/controllers/TagController');
const Controller = require('./app_server/controller/controller');

// Models
const UserModel = require('./app_server/models/UserModel');
const PostModel = require('./app_server/models/PostModel')
const TagModel = require('./app_server/models/TagModel');
const CommentModel = require('./app_server/models/CommentModel');

// Inicializamos express (app)
var express = require('express');
    app = express();
    port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'blog_cliente/build')));

// Inicializamos sequelize ( conexion con MySQL)
const sequelize = new Sequelize('bloggosfera','root','sweetheart',{
    host: 'localhost',
    dialect: 'mysql'
});

// Confirmamos que se conecte con éxito a la base de datos
sequelize
    .authenticate()
    .then( () => {
        console.log('Connection has been established succesfully');   
    }).catch( err => {
        console.error('Unable to connect to the database' ,err);
});


const User = UserModel(sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const BlogTag = sequelize.define('blog_tag', {});
const Blog = PostModel(sequelize);
const Tag = TagModel(sequelize);
const Comment = CommentModel(sequelize);
const BlogComment = sequelize.define('blog_comment', {});

// Blog.belongsToMany(Comment,{ through: BlogComment, unique: true});
// Comment.belongsToMany( Blog, { through : BlogComment, unique: true});

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })

// Comment.belongsTo(User);
Blog.belongsTo(User);


//otro tipo
Comment.belongsTo(Blog);
Blog.hasMany(Comment);
User.hasMany(Blog);

sequelize.sync({ force: false })
.then(() => {
    console.log(`Database & tables created!`)
});


Controller(app,User,Blog,Tag,Comment);

// Confirmamos el inicio de nuestra REST API 
app.listen(port);
console.log('todo listo RESTful API server started on: ' + port);