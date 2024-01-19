const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delmovie")
    .setDescription("Delete a movie from the movie list. (Case Sensitive)")
    .addStringOption((option) =>
      option
        .setName("movie")
        .setDescription("The name of the movie you want to delete")
        .setMaxLength(32)
        .setRequired(true)
    ),
  async execute(interaction) {
    let jsonData = require("../../data/movies.json");
    const target =
      interaction.options.getString("movie") ?? "No movie provided";
    if (jsonData.movieList.includes(target)) {
      jsonData.movieList.splice(jsonData.movieList.indexOf(target), 1);

      jsonData = JSON.stringify(jsonData);
      fs.writeFile("./data/movies.json", jsonData, function (error) {
        if (error) console.error(error);
        if (!error) console.log(`List updated`);
      });

      await interaction.reply(`Removed ${target} from the movie list. `);
      return;
    }
    await interaction.reply(`Could not find "${target}" in the movie list. (Case sensitive)`);
  },
};
