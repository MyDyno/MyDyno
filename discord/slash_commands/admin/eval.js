const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Run eval() function! (Only for application owner)')
        .addStringOption(option => 
            option
            .setName('command')
            .setDescription('Write a command to run!')
            .setRequired(true)
        ),

    async execute(Discord, client, interaction){

        const clean = text => {
            if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }

        if(interaction.user.id == client.config.botDeveloperId){

            try {
                const code = interaction.options.getString('command');
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled)

                const embed = new Discord.MessageEmbed()

                    .setColor('BLACK')
                    .setTitle('EVAL')
                    .addFields(
                        {
                            name: '📥 Input',
                            value: `\`\`\`js\n${code}\n\`\`\``,
                        },
                        {
                            name: '📤 Output',
                            value: `\`\`\`js\n${clean(evaled)}\n\`\`\``,
                        },
                    )
                    .setTimestamp()
                    .setFooter({text: client.user.username})

                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
            catch (err) {
                await interaction.reply({content: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, ephemeral: true});
            }
        }
        else{

            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command is limited to the application owner only!')
            await interaction.reply({embeds: [embed]})
        }
    }
}