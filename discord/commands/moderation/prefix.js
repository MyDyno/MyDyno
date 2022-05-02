const settingModel = require('../../../models/discord/setting')

module.exports = {
    name: 'prefix',

    async execute(Discord, client, message, args, PREFIX){
        
        let model = await settingModel.findOne({guildId: message.guild.id})

        if(!message.member.permissions.has('MANAGE_GUILD')){

            const noPermsEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have permission `MANAGE_GUILD` to change prefix!')

            return message.channel.send({ embeds: [noPermsEmbed] })
        }

        if(!args[1]){
            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Pleave give a preifx!\nUsage: `' + PREFIX + 'prefix ?`')

            return message.channel.send({embeds:[embed]})
        }

        if(!isNaN(args[1])){
            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Prefix should not be a number!')

            return message.channel.send({embeds:[embed]})
        }

        if(args[1].length > 3){
            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Prefix cannot be greater than 3 characters!')

            return message.channel.send({embeds:[embed]})
        }

        if(!model){
            
            let createdModel = await settingModel.create({
                guildId: message.guild.id,
                prefix: args[1]
            })

            createdModel.save()
            .then(() => {

                let embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription('Prefix set to `' + args[1] + '`')

                message.channel.send({embeds:[embed]})
            })
        }
        else{

            await settingModel.findOneAndUpdate(
                {guildId: message.guild.id},
                {
                    prefix: args[1]
                }
            )
            .then(() => {

                let embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription('Prefix updated to `' + args[1] + '`')

                message.channel.send({embeds:[embed]})
            })
            
        }
    }
}