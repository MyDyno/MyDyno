module.exports = {
    error: (Discord, client) => {
        main(Discord, client)
    }
}

const main = (Discord, client) => {

    process.on("unhandledRejection", e => {
        console.log(e)
    });
    
    process.on("uncaughtException", e => {
        console.log(e)
    });
}