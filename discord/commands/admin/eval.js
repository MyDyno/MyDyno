module.exports = {
    name: 'eval',

    execute(Discord, client, message, args){
        
        const clean = text => {
            if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }

        if (message.author.id == client.config.botDeveloperId) {

            try {
                const code = args.join(" ");
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

                message.channel.send({ embeds: [embed] });
            }
            catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }
        else{

            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command is limited to the application owner only!')

            return message.channel.send({embeds: [embed]})
        }
        
    }
}