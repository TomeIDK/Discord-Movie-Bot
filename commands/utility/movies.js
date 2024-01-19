const { SlashCommandBuilder } = require("discord.js");
const jsonData = require("../../data/movies.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("movies")
    .setDescription("Shows all movies on the movie list."),
  async execute(interaction) {
    let reply = `Movies:\n\n`;
    let movieList = jsonData.movieList.sort();
    for (let i = 0; i < movieList.length; i++) {
      reply += `${i+1}. ${movieList[i]}\n`;
    }
    await interaction.reply(reply);
  },
};
