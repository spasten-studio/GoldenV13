const { SlashCommandBuilder } = require("@discordjs/builders");
const formatDuration = require("format-duration");
const { replyInteractionEmbed, generateProgressBar, calcMsInTime } = require("../../modules/channelModule/channelModule");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nowplaying")
        .setDescription("See what is currently being played"),

    alias: ['np'],
    async execute(interaction, client)
    {
        const player = interaction.client.manager.get(interaction.guild.id);
        if (!player) return replyInteractionEmbed(interaction, '', 'Play a track before using this command.', 'DARK_RED');
        const queue = player.queue;

        var bar = generateProgressBar(player.position, queue.current.duration);

        return replyInteractionEmbed(interaction, '', `**Now Playing:** [${queue.current.title} by ${queue.current.author}](${queue.current.uri})\n**Duration:** ${bar} ${formatDuration(player.position)}|${formatDuration(queue.current.duration)}\n**Requested by:** ${queue.current.requester}`, `DARK_GREEN`, player.queue.current.displayThumbnail("mqdefault"), true);
    },
};