module.exports = {
    name: 'ready',

    execute(ready, Discord, client){

        let status = {
            type: 'PLAYING', 
            activity: 'in ' + client.guilds.cache.size + ' guilds!'
        }

        console.log('Discord: Logged in as: ' + client.user.tag)

        function setStatus(){
            client.user.setActivity(status.activity, {type: status.type});
        }
        setStatus()
        setInterval(() => {
            setStatus()
        }, 600000);
        
    }
}