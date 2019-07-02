const Sequelize = require('sequelize');

const db = require("../db")

module.exports = db.sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    },

}, { timestamps: true })




// module.exports = (sequelize) => {
//     const User = sequelize.define('users',{
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         name: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         lastname: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         email: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             validate: {
//                 isEmail: true
//             }
//         },
//         username: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         password: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         role :{
//             type: Sequelize.STRING,
//             allowNull: true
//         }

//     },{timestamps:true})
//     return User;
// }