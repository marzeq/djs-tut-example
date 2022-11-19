import { BotType } from "../index"

export const module = async (client: BotType) => {
  client.commands.set("ping", {
    name: "ping",
    description: "Pong!",
    run: async interaction => {
      await interaction.reply("Pong!")
    },
  })
}
