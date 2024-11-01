import nodemailer from 'nodemailer';
import pool from '../../../lib/db'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    const { email, subject, link } = await request.json();

    console.log(email, subject, link);

    if (!email || !subject || !link) {
        return new Response(
            JSON.stringify({ error: 'Все поля обязательны для заполнения' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    //Ищем пользователя в БД
    const user = await pool.query(
        'SELECT * FROM accounts2 WHERE email = $1',
        [email]
    );

    const token = jwt.sign({email: user.rows[0].email}, 'my-very-secret-key-for-jwt', {expiresIn: '1h'});

    console.log(token);

    // Настройка транспортера для Nodemailer
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',       // SMTP сервер Mailgun
        port: 587,                      // Порт для соединения
        auth: {
            user: 'postmaster@sandbox149a3098df664d81b2da3df9593499ed.mailgun.org', // SMTP username (адрес вашего Mailgun домена)
            pass: '64d5569bf8ed5b661fa068abea249b16-d010bdaf-d4e5af07',        // Ваш Mailgun Private API Key
        },
    });

    try {
        // Отправка письма
        await transporter.sendMail({
            from: 'postmaster@sandbox149a3098df664d81b2da3df9593499ed.mailgun.org',  // Адрес отправителя (настроенный домен Mailgun)
            to: email,                         // Адрес получателя
            subject: subject,                  // Тема письма
            text: `${link}?token=${token}`.replaceAll(' ', ''),  // Текст письма с переданным значением `link`
        });

        return new Response(
            JSON.stringify({ message: 'Письмо успешно отправлено. Проверьте свою почту. ' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Ошибка отправки письма:', error);
        return new Response(
            JSON.stringify({ error: 'Ошибка отправки письма' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
