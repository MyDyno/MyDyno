module.exports = {
    name: 'ready',

    execute(ready, Discord, client){
        client.statusType = 'PLAYING';
        client.refreshGuildCountStatus = true;
        client.refreshUserCountStatus = false;

        console.log('Discord: Logged in as: ' + client.user.tag)

        function setGuildCountStatus(){
            let status = {
                type: client.statusType, 
                activity: `in ${client.guilds.cache.size} guilds!`
            }
            
            client.user.setActivity(status.activity, {type: status.type});
        }
        function setUserCountStatus(){
            let status = {
                type: client.statusType, 
                activity: `with ${client.users.cache.size} users!`
            }
            
            client.user.setActivity(status.activity, {type: status.type});
        }

        setGuildCountStatus()
        setInterval(() => {
            if(client.refreshGuildCountStatus == true){
                setGuildCountStatus()
            }
            if(client.refreshUserCountStatus == true){
                setUserCountStatus()
            }
        }, 60 * 1000);
    }
}