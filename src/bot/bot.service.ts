import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import telegram = require('node-telegram-bot-api')
import {
    CallbackService,
    GreetingService,
    TasksService,
    HelpService,
    WebAppService,
    UsersService,
} from './services'

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly callbackService: CallbackService,
        private readonly taskService: TasksService,
        private readonly configService: ConfigService,
        private readonly helpService: HelpService,
        private readonly greetingService: GreetingService,
        private readonly webAppService: WebAppService,
        private readonly userService: UsersService
    ) {}

    async onModuleInit() {
        const telegramToken = this.configService.get('telegram.token')
        const bot = new telegram(telegramToken, {
            polling: true,
        })
        await this.initBot(bot)
    }

    async initBot(bot) {
        bot.on('message', async (msg) => {
            const chatId = msg.chat.id
            const text = msg.text
            switch (text) {
                case '/start':
                    return this.greetingService.greeting(bot, chatId, msg)
                case '/tasks':
                    return await this.taskService.getTasks(bot, msg)
                case '/getMe':
                    return await this.userService.getUser(bot, msg)
                case '/help':
                    return this.helpService.help(bot, chatId)
                default:
                    break
            }
            if (msg?.web_app_data?.data) {
                try {
                    this.webAppService.agree(bot, chatId, msg)
                } catch (e) {
                    console.log(e)
                }
            }
        })
        bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(bot, callbackQuery)
        })
    }
}
