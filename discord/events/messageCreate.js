const settingModel = require('../../models/discord/setting')
const fs = require('fs');

module.exports = {
    name: 'messageCreate',

    async execute(message, Discord, client){

        if(message.author.bot) return;

        let token = process.env.token || client.config.betaToken
        let PREFIX;
        let model = await settingModel.findOne({guildId: message.guild.id})

        if(token == process.env.token){
            PREFIX = client.config.mainPrefix
            if(model){
                if(model.prefix){
                    PREFIX = model.prefix
                }
            }
        }
        else if(token == client.config.betaToken){
            PREFIX = client.config.betaPrefix   
        }

        if(message.content == '<@' + client.user.id + '>' || message.content == '<@!' + client.user.id + '>'){
            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('My prefix here is `' + PREFIX + '`')
            message.channel.send({embeds: [embed]})
        }
        
        if(message.channel.type == 'DM'){            
            let dmLogsChannel = client.channels.cache.find(channel => channel.id == client.config.dmLogsChannelId)
            const dm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('`' + message.content + '`')
            
            dmLogsChannel.send({embeds: [dm] })
            
            return message.channel.send('Please use commands inside a server!')
        }
        
        let args = message.content.substring(PREFIX.length).split(' ')
        if(!message.content.startsWith(PREFIX)) return;

        let commandFolders = fs.readdirSync('./discord/commands/')
        for(const folder of commandFolders){

            let commandFiles = fs.readdirSync('./discord/commands/' + folder).filter(file => file.endsWith('.js'))
            for(const file of commandFiles){

                const command = require('../commands/' + folder + '/' + file)

                if(args[0].toLowerCase() == command.name){
                    if(message.author.id !== client.config.botDeveloperId){
                        if(client.commandsHandler == false){
                            const embed = new Discord.MessageEmbed()
                                    .setColor('RED')
                                    .setDescription('The commands are `disabled` by the application owner! Please join [support server](' + client.config.supportServer + ') for more info!')
                            return message.reply({embeds: [embed]})
                        }
                    }
                    functionOptions(command)
                }
                if(command.alts){
                    command.alts.forEach((alt) => {
                        if(args[0].toLowerCase() == alt){
                            if(message.author.id !== client.config.botDeveloperId){
                                if(client.commandsHandler == false){
                                    const embed = new Discord.MessageEmbed()
                                            .setColor('RED')
                                            .setDescription('The commands are `disabled` by the application owner! Please join [support server](' + client.config.supportServer + ') for more info!')
                                    return message.reply({embeds: [embed]})
                                }
                            }
                            functionOptions(command)
                        }
                    })
                }
            }
        }

        async function functionOptions(command){

            let runNextFunction = true;

            if(runNextFunction == true){
                requireEconomyAccount()
            if(runNextFunction == true){
                permissions()
            if(runNextFunction == true){
                cooldown()
            }}}

            async function requireEconomyAccount(){
                if(command.requireEconomyAccount){
                    if(command.requireEconomyAccount == true){
                        const model = require('../../models/discord/economy')
                        let myModel = await model.findOne({userId: message.author.id})
        
                        if(!myModel){
        
                            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                .setDescription('You dont have an account!, Use `ecrt` command to create one!')
                
                            runNextFunction = false;
                            return message.channel.send({embeds: [noEconomyAccountEmbed]})
                        }
                    }
                }
            }

            async function permissions(){
                if(command.permissions){
                    command.permissions.forEach((perms) => {
                        if(!message.guild.me.permissions.has(perms)){

                            const noPermsEmbed = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                .setDescription('I dont have permission `' + perms + '` to execute this command!\nPlease provide me permissions from server settings!')
                
                            runNextFunction = false;
                            return message.channel.send({ embeds: [noPermsEmbed] })
                        }
                    })
                }
            }

            async function cooldown(){
                if(command.cooldown){
                    const model = require('../../models/discord/cooldown')
                    let myModel = await model.findOne({userId: message.author.id})
                    let todayDate = new Date().getTime()
                    let storeDate = Number(new Date().getTime()) + Number(command.cooldown)
                    let commandCooldown = myModel.cooldowns.find(cooldown => cooldown.name == command.name)
    
                    if(commandCooldown){
                        if(Number(todayDate) >= Number(commandCooldown.cooldownTime)){
        
                            updateCooldown()
                            .then(() => {
                                client.commands.get(command.name).execute(Discord, client, message, args, PREFIX)
                            })
                        }
                        else{
                            onCooldown()
                        }
                    }
                    else{
    
                        createCooldown()
                        .then(() => {
                            client.commands.get(command.name).execute(Discord, client, message, args, PREFIX)
                        })
                    }
    
                    async function createCooldown(){
    
                        await model.findOneAndUpdate(
                            {userId: message.author.id},
                            {
                                $push: {
                                    cooldowns:
                                    {
                                        name: command.name,
                                        cooldownTime: storeDate
                                    }
                                }
                            }
                        )
                    }
    
                    async function updateCooldown(){
    
                        await model.findOneAndUpdate(
                            {userId: message.author.id},
                            {
                                $pull: {
                                    cooldowns: myModel.cooldowns.find(cooldown => cooldown.name == command.name)
                                }
                            }
                        )
                        .then(async () => {
                            await model.findOneAndUpdate(
                                {userId: message.author.id},
                                {
                                    $push: {
                                        cooldowns:
                                        {
                                            name: command.name,
                                            cooldownTime: storeDate
                                        }
                                    }
                                }
                            )
                        })
                    }
    
                    function onCooldown(){
    
                        let dailyRemainingTime = Number(commandCooldown.cooldownTime) - Number(todayDate)
                        let totalSeconds = (dailyRemainingTime / 1000);
                        let days = Math.floor(totalSeconds / 86400);
                        totalSeconds %= 86400;
                        let hours = Math.floor(totalSeconds / 3600);
                        totalSeconds %= 3600;
                        let minutes = Math.floor(totalSeconds / 60);
                        let seconds = Math.floor(totalSeconds % 60);                
            
                        const dailyCooldownEmbed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                            .setTimestamp()
                            .setFooter(client.user.username)
            
                        message.channel.send({embeds: [dailyCooldownEmbed]})
                    }
                }
                else{
                    client.commands.get(command.name).execute(Discord, client, message, args, PREFIX)
                }
            }
        }

    }
}