const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Tag = sequelize.define('tags', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allownull: false
        }

    },{timestamps:true})

    return Tag;
}