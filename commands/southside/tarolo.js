const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("dotenv").config();
const { client } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tarolo")
    .setDescription("Sends food embed")
    .addStringOption(option => option.setName('tipus')
      .setDescription('Be vagy Ki')
      .setRequired(true)
      .addChoices(
        { name: "Be", value: "be" },
        { name: "Ki", value: "ki" },

      ))
    .addStringOption((option) => option.setName("item")
        .setDescription("Milyen tárgy")
        .setRequired(true)
        .addChoices( 
          { name: "piros-kén", value: "piros-kén" },
          { name: "puskapor", value: "puskapor" },
          { name: "piszkos pénz", value: "piszkos" },
        )
    )
    .addIntegerOption((option) => option.setName("mennyiseg")
        .setDescription("mennyi")
        .setRequired(true),
    ),
    
  async execute(interaction) {

    const piros_ken = 600

    const type = interaction.options.get("tipus").value
    const targy = interaction.options.get("item").value
    const mennyiseg = interaction.options.get("mennyiseg").value

    const collection_T = client.mongos.db("Southside").collection("tarolo");
    const collection_K = client.mongos.db("Southside").collection("piros-kén");

    if (type === "be") {
      const existingDocument_T = await collection_T.findOne({ Item: targy });
      const existingDocument_K = await collection_K.findOne({ Name: interaction.user.username });

      if (existingDocument_T) {
        // If document exists, update the "Value" field
        await collection_T.updateOne({ Item: targy }, { $inc: { Value: mennyiseg } });
        console.log(`Updated existing document for ${targy}.`);
      } else {
        // If document doesn't exist, create a new one
        await collection_T.insertOne({ Item: targy, Value: mennyiseg });
        console.log(`Created new document for ${targy}.`);
      }

      if (existingDocument_K) {
        // If document exists, update the "Value" field

        await collection_K.updateOne({ Name: interaction.user.username }, { $inc: { Value: mennyiseg, Money: mennyiseg * piros_ken }})
        console.log(`Updated existing document for ${targy} For piros-kén.`);
      } else {
        // If document doesn't exist, create a new one
        await collection_K.insertOne({ Name: interaction.user.username, Value: mennyiseg, Money: mennyiseg * piros_ken });
        console.log(`Created new document for ${targy} For piros-kén.`);
      }

      const beEmbed = new EmbedBuilder()
      .setTitle("Tároló **BETÉTEL**")
        .setColor(process.env.GREEN)
        .addFields(
        { name: "Név", value: `<@${interaction.user.id}>`},
        { name: " ", value: targy, inline: true },
        { name: " ", value: String(mennyiseg), inline: true },
        )
        .setTimestamp()
        .setFooter({ text: " " });
      await interaction.reply({ embeds: [beEmbed] });

    }
    if (type === "ki") {
      const existingDocument_T = await collection_T.findOne({ Item: targy });

      if (existingDocument_T) {
        // If document exists, subtract the "Value" field
        if (existingDocument_T.Value < mennyiseg){
          await interaction.reply("Többet szeretnél ki venni mint amennyi van benne!")
        } else {
          await collection_T.updateOne({ Item: targy }, { $inc: { Value: -mennyiseg } });
          console.log(`Subtracted ${mennyiseg} from existing document for ${targy}.`);
          const kiEmbed = new EmbedBuilder()
          .setTitle("Tároló **KIVÉTEL**")
            .setColor(process.env.RED)
            .addFields(
            { name: "Név", value: `<@${interaction.user.id}>` },
            { name: " ", value: targy, inline: true },
            { name: " ", value: String(mennyiseg), inline: true },
            )
            .setTimestamp()
            .setFooter({ text: " " });
          await interaction.reply({ embeds: [kiEmbed] });
        }
        } else {
        // If document doesn't exist, create a new one with negative value
        await interaction.reply("Nincsen ilyen tárgy a tárolóban!")
     }}
    }
};
