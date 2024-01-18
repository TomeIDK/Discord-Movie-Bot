const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");
let jsonData = require("../../data/movies.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addmovie")
    .setDescription("Add a movie to the movie list.")
    .addStringOption((option) =>
      option
        .setName("movie")
        .setDescription("The movie you want to add to the list")
        .setMaxLength(32)
        .setRequired(true)
    ),
  async execute(interaction) {
    const target =
      interaction.options.getString("movie") ?? "No movie provided";
      console.log("1. " + jsonData);
    console.log("2. " + jsonData.movieList);
    jsonData.movieList.push(target);
    jsonData = JSON.stringify(jsonData);
    fs.writeFile("./data/movies.json", jsonData, function (error) {
      if (error) console.error(error);
      if (!error) console.log(`Added ${target} to the list`);
    });
    await interaction.reply(`Added ${target} to the movie list. `);
  },
};
