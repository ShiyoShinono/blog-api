const Sequelize = require('sequelize')

const sequelize = new Sequelize('vue-api', 'root', 'liJUpeng98380274', {
    host: 'localhost',
    dialect: 'mysql'

})

module.exports = {
    sequelize
}