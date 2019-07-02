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


sequelize.sync({ force: false })
.then(() => {
    console.log(`Database & tables created!`)
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// //Models/tables
 db.users = require('./models/UserModel');  
 db.comments = require('./models/CommentModel');  
 db.posts = require('./models/PostModel');

 db.users = db.users(sequelize);
 db.comments = db.comments(sequelize);
 db.posts = db.posts(sequelize);

// //Relations
db.comments.belongsTo(db.posts);  
db.posts.hasMany(db.comments);  
db.posts.belongsTo(db.users);  
db.users.hasMany(db.posts);

module.exports = db;  
