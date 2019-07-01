const Sequelize = require('sequelize');

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
        content: {
            type: Sequelize.STRING,
            allownull: false
        },
        image: {
            type: Sequelize.STRING,
            allownull: true
        },

    },{timestamps:true})
    
    return Post;
}