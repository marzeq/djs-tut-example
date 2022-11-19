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

export type Module = Promise<{
  default: (client: Bot) => Awaitable<any>
} | {
  module: (client: Bot) => Awaitable<any>
}>

const loadModules = async (modules: Module[], client: Bot) => {
  for (const module of await Promise.all(modules)) {
    if ("default" in module) {
      module.default(client)
    } else {
      module.module(client)
    }
  }
}

const main = async () => {
  const client = new Bot({
    intents: ["Guilds"]
  })

  await loadModules([
    import("./modules/example"),
  ], client)

  if (!("TOKEN" in process.env)) {
    throw new Error("No token provided")
  }

  client.login(process.env.TOKEN)
}

main().catch(console.error)
