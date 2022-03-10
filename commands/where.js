const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const Jimp = require("jimp");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('where')
    .setDescription('Sends an Ape-Where-Meme')
    .addStringOption(option => option
      .setName('where')
      .setDescription('What does the Ape look for? - 20 Characters max')
      .setRequired(true)),
    async execute(interaction) {

      const whereMessageInput = await interaction.options.getString('where');
      const whereMessage = "where " + whereMessageInput.toLocaleLowerCase();
      const imageName = "./ape-meme-blank.jpg";
      const xCoordinate = 175 - whereMessage.length * 6;
      const yCoordinate = 5;

      var loadedImage;

      if(whereMessage.length <= 26) {
        
        Jimp.read(imageName)
        .then(image => {
						loadedImage = image;
            Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
              .then(font => {
								loadedImage.print(font, xCoordinate, yCoordinate, whereMessage).getBufferAsync(Jimp.MIME_JPEG)
                  .then(buffer => {
                    const attachment = new MessageAttachment(buffer);
                    interaction.reply({files: [attachment]});
                  });
              });
        })
        .catch(error => console.log(error));

      } else {
        interaction.reply({ content: "Your where messages has to be 20 characters or less long!", ephemeral: true });
      }
    }
}