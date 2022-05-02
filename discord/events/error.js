const config = require('../config.json')

module.exports = {
    name: 'error',

    execute(error, Discord, client){

        console.log('An error occured: ' + error.message)
    }
}