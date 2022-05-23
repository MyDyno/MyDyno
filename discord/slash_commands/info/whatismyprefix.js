const { SlashCommandBuilder } = require('@discordjs/builders')
const settingModel = require('../../../models/discord/setting')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('whatismyprefix')
        .setDescription('Know bot prefix!'),

    async execute(Discord, client, interaction){

        let token = process.env.token || client.config.betaToken
        let PREFIX;
        let model = await settingModel.findOne({guildId: interaction.guild.id})

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
        
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('My prefix here is `' + PREFIX + '`')
        await interaction.reply({embeds: [embed]})
    }
}