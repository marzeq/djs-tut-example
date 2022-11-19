import { Client, Collection, Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js"
import dotenv from "dotenv"

dotenv.config()

class Bot extends Client {
  protected commands = new Collection<string, Command>()
}

export type BotType = Bot

export interface Command extends ChatInputApplicationCommandData {
  run: (interaction: ChatInputCommandInteraction) => Awaitable<any>
}

const main = async () => {
  const client = new Bot({
    intents: ["Guilds"]
  })

  if (!("TOKEN" in process.env)) {
    throw new Error("No token provided")
  }

  client.login(process.env.TOKEN)
}

main().catch(console.error)
