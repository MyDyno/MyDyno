module.exports = {
    name: 'ready',

    execute(ready, Discord, client){
        client.refreshGuildCountStatus = true;
        client.refreshUserCountStatus = false;
        client.statusType = 'PLAYING';
        client.statusTypeText = 'Playing'
        client.statusMessage = `in ${client.guilds.cache.size} guilds!`

        console.log('Discord: Logged in as: ' + client.user.tag)

        function setGuildCountStatus(){
            let status = {
                type: client.statusType, 
                activity: client.statusMessage
            }
            
            client.user.setActivity(status.activity, {type: status.type});
        }
        function setUserCountStatus(){
            let status = {
                type: client.statusType, 
                activity: client.statusMessage
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