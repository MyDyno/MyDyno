const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite bot!'),

    async execute(Discord, client, interaction){

        let token = process.env.token || client.config.betaToken
        let botInvite;
        if(token == process.env.token){botInvite = client.config.botInvite}
        else if(token == client.config.betaToken){botInvite = client.config.betaBotInvite}
        
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('[Invite me](' + botInvite + ')')
        await interaction.reply({embeds: [embed]})
    }
}