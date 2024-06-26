import { Injectable } from '@nestjs/common'

@Injectable()
export class HelpService {
    async help(bot, chatId) {
        await bot.sendMessage(
            chatId,
            `/tasks - Посмотреть весь список задач\n/projects - для просмотра моих проектов`,
            {
                protect_content: true,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [
                            {
                                text: 'Посмотреть весь список задач',
                                callback_data: 'tasks',
                            },
                        ],
                        [
                            {
                                text: 'Мои проекты',
                                callback_data: 'projects',
                            },
                        ],
                    ],
                }),
            }
        )
    }
}
