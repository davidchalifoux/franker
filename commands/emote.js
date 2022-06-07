const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emote')
        .setDescription('Replies with a FrankerFaceZ emote.')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('The name of the emote to use.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const response = await axios.get(
            'https://api.frankerfacez.com/v1/emotes',
            {
                params: {
                    q: name,
                    sort: 'count-desc',
                },
            }
        );
        const emoticons = response.data.emoticons;
        if (emoticons.length > 0) {
            const firstEmote = emoticons[0];
            if (firstEmote.urls['2']) {
                await interaction.reply('https:' + firstEmote.urls['2']);
            } else {
                await interaction.reply('https:' + firstEmote.urls['1']);
            }
        } else {
            await interaction.reply({
                content: "I couldn't find that emote!",
                ephemeral: true,
            });
        }
    },
};
