import { BotType } from "../index"

export const module = async (client: BotType) => {
  client.commands.set("ping", {
    name: "ping",
    description: "Pong!",
    run: async interaction => {
      await interaction.reply("Pong!")
    },
  })

  client.on("reactionAdd", async (reaction, user) => {
    if (reaction.emoji.name !== "👍") return
    if (user.bot) return // important to prevent infinite loops
  
    await reaction.message.react("👍")
  })
}
