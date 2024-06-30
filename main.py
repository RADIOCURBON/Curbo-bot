import telebot
from telebot import types

bot = telebot.TeleBot('7051824056:AAEtHdmndutwQYFFpi8oPz8AToupXF-Xxlo')

def start_markup():
    markup = types.InlineKeyboardMarkup(row_width=True)
    link_keyboard1 = types.InlineKeyboardButton(text='1-й канал', url="https://t.me/+2Apy-_qcZCRjYmNi")
    check_keyboard1 = types.InlineKeyboardButton(text='Проверить', callback_data='check')
    markup.add(link_keyboard1, check_keyboard1)
    return markup

def thank_you_markup():
    markup = types.InlineKeyboardMarkup(row_width=True)
    mini_web_button = types.InlineKeyboardButton(text='Открыть приложение !', url='t.me/Curbo_bot/app')
    markup.add(mini_web_button)
    return markup


@bot.message_handler(commands=['start'])
def start(message):
    chat_id = message.chat.id
    first_name = message.chat.first_name
    bot.send_message(chat_id, f"Привет {first_name}!\n"
                     "Чтобы пользоваться ботом, подпишитесь на данный канал", reply_markup=start_markup())

def check(call):
    try:
        status = ['creator', 'administrator', 'member']
        user_status = bot.get_chat_member(chat_id='-1002249640348', user_id=call.message.chat.id).status
        if user_status in status:
            bot.send_message(call.message.chat.id, "Спасибо, что подписались на канал!", reply_markup=thank_you_markup())
        else:
            bot.send_message(call.message.chat.id, 'Подпишитесь на канал!', reply_markup=start_markup())
    except telebot.apihelper.ApiTelegramException as e:
        bot.send_message(call.message.chat.id, f'Произошла ошибка: {e.description}')

@bot.callback_query_handler(func=lambda call: True)
def callback(call):
    if call.data == 'check':
        check(call)

bot.polling(none_stop=True)
