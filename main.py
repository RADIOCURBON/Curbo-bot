import telebot
from telebot import types
import schedule
import time
from threading import Thread

bot = telebot.TeleBot('')

user_messages = {}  # Словарь для хранения последних сообщений пользователей

def start_markup():
    markup = types.InlineKeyboardMarkup(row_width=True)
    link_keyboard1 = types.InlineKeyboardButton(text='1-й канал', url="https://t.me/+2Apy-_qcZCRjYmNi")
    check_keyboard1 = types.InlineKeyboardButton(text='Проверить', callback_data='check')
    markup.add(link_keyboard1, check_keyboard1)
    return markup

def thank_you_markup():
    markup = types.InlineKeyboardMarkup(row_width=True)
    mini_web_button = types.InlineKeyboardButton(text='Открыть приложение !', url='')
    markup.add(mini_web_button)
    return markup

@bot.message_handler(commands=['start'])
def start(message):
    chat_id = message.chat.id
    first_name = message.chat.first_name
    if chat_id in user_messages:
        try:
            bot.delete_message(chat_id, user_messages[chat_id])
        except:
            pass
    sent_message = bot.send_message(chat_id, f"Привет {first_name}!\nЧтобы пользоваться ботом, подпишитесь на данный канал", reply_markup=start_markup())
    user_messages[chat_id] = sent_message.message_id

def check(call):
    try:
        status = ['creator', 'administrator', 'member']
        user_status = bot.get_chat_member(chat_id='-1002249640348', user_id=call.message.chat.id).status
        if user_status in status:
            if call.message.chat.id in user_messages:
                try:
                    bot.delete_message(call.message.chat.id, user_messages[call.message.chat.id])
                except:
                    pass
            sent_message = bot.send_message(call.message.chat.id, "Спасибо, что подписались на канал!", reply_markup=thank_you_markup())
            user_messages[call.message.chat.id] = sent_message.message_id
        else:
            bot.send_message(call.message.chat.id, 'Подпишитесь на канал!', reply_markup=start_markup())
    except telebot.apihelper.ApiTelegramException as e:
        bot.send_message(call.message.chat.id, f'Произошла ошибка: {e.description}')

@bot.callback_query_handler(func=lambda call: True)
def callback(call):
    if call.data == 'check':
        check(call)

def periodic_check():
    for chat_id in user_messages.keys():
        try:
            status = ['creator', 'administrator', 'member']
            user_status = bot.get_chat_member(chat_id='-1002249640348', user_id=chat_id).status
            if user_status not in status:
                if chat_id in user_messages:
                    try:
                        bot.delete_message(chat_id, user_messages[chat_id])
                    except:
                        pass
                sent_message = bot.send_message(chat_id, 'Подпишитесь на канал!', reply_markup=start_markup())
                user_messages[chat_id] = sent_message.message_id
        except telebot.apihelper.ApiTelegramException as e:
            bot.send_message(chat_id, f'Произошла ошибка: {e.description}')

def schedule_checker():
    while True:
        schedule.run_pending()
        time.sleep(1)

schedule.every(10).minutes.do(periodic_check)  # Проверка каждые 10 минут

Thread(target=schedule_checker).start()

bot.polling(none_stop=True)
