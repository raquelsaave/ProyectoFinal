const Sequelize = require('sequelize');
const db = {}

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


// const User = UserModel(sequelize)
// // BlogTag will be our way of tracking relationship between Blog and Tag models
// // each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define('blog_tag', {});
// const Blog = PostModel(sequelize);
// const Tag = TagModel(sequelize);
// const Comment = CommentModel(sequelize);
// // const BlogComment = sequelize.define('blog_comment', {});

// // Blog.belongsToMany(Comment,{ through: BlogComment, unique: true});
// // Comment.belongsToMany( Blog, { through : BlogComment, unique: true});

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false })

// // Comment.belongsTo(User);
// Blog.belongsTo(User);


// //otro tipo
// Comment.belongsTo(Blog);
// Blog.hasMany(Comment);
// User.hasMany(Blog);

sequelize.sync({ force: false })
.then(() => {
    console.log(`Database & tables created!`)
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;