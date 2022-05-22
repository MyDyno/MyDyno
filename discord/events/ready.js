module.exports = {
    name: 'ready',

    execute(ready, Discord, client){

        console.log('Discord: Logged in as: ' + client.user.tag)

        function setStatus(){
            let status = {
                type: 'PLAYING', 
                activity: 'in ' + client.guilds.cache.size + ' guilds!'
            }
            
            client.user.setActivity(status.activity, {type: status.type});
        }
        setStatus()
        setInterval(() => {
            setStatus()
        }, 60 * 1000);
        
    }
}