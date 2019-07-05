const Sequelize = require('sequelize');
// const db = require("../db")

// module.exports = db.sequelize.define('blog_posts', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     title: {
//         type: Sequelize.STRING,
//         allownull: false
//     },
//     opener:{
//         type: Sequelize.STRING,
//         allownull: false
//     },
//     content: {
//         type: Sequelize.STRING,
//         allownull: false
//     },
//     image: {
//         type: Sequelize.STRING,
//         allownull: true
//     },
// }, { timestamps: true })

module.exports = (sequelize) => {
    const Post = sequelize.define('blog_posts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allownull: false
        },
        author: {
            type: Sequelize.STRING,
            allownull: false
        },
        opener: {
            type: Sequelize.STRING,
            allownull: false
        },
        content: {
            type: Sequelize.TEXT,
            allownull: false
        },
        image: {
            type: Sequelize.STRING,
            allownull: true
        },
        tag: {
            type: Sequelize.STRING,
            allownull: true
        },
    }, { timestamps: true })

    return Post;
}