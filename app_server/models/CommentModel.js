const Sequelize = require('sequelize');
// const db = require("../db")

// module.exports = db.sequelize.define('comments', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     content: {
//         type: Sequelize.STRING,
//         allownull: false
//     },
// },
//     {
//         tableName: 'comments',
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//         deletedAt: 'deteled_at',
//         paranoid: true,
//         timestamps: true,
//     })

module.exports = (sequelize) => {
    const Comment = sequelize.define('comments', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING,
            allownull: false
        }

    },
    {
        tableName: 'comments',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deteled_at',
        paranoid: true,
        timestamps: true,
    })
    return Comment;
}