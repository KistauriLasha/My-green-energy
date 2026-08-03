// /api/order.js
// Serverless-функция Vercel: принимает заявку с сайта и отправляет её в Telegram-бот

export default async function handler(req, res) {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, kit, comment } = req.body || {};

    // Простая валидация обязательных полей
    if (!name || !phone) {
      return res.status(400).json({ error: 'Укажите имя и телефон' });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Не заданы переменные окружения TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID');
      return res.status(500).json({ error: 'Ошибка конфигурации сервера' });
    }

    // Экранируем HTML-спецсимволы, чтобы не сломать разметку сообщения
    const esc = (str = '') =>
      String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const text =
      `🟢 <b>Новая заявка с сайта</b>\n\n` +
      `👤 <b>Имя:</b> ${esc(name)}\n` +
      `📞 <b>Телефон:</b> ${esc(phone)}\n` +
      (kit ? `📦 <b>Комплект:</b> ${esc(kit)}\n` : '') +
      (comment ? `💬 <b>Комментарий:</b> ${esc(comment)}\n` : '');

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    const tgData = await tgResponse.json();

    if (!tgData.ok) {
      console.error('Telegram API error:', tgData);
      return res.status(502).json({ error: 'Не удалось отправить заявку' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Order handler error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}
