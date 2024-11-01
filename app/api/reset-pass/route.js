import pool from '../../../lib/db'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function GET(request) {
    const url = new URL(request.url);

    const token = url.searchParams.get('token');
    const newPassword = url.searchParams.get('password');

    if (!token || !newPassword) {
        return new Response(JSON.stringify({error: 'Истек ссылка для восстановления, выполните сброс пароля повторно.'}), {
            status: 400,
            headers: {'Content=Type': 'application/json'}
        });
    }

    try {
        const decodedToken = jwt.decode(token, 'my-very-secret-key-for-jwt');

        const email = decodedToken.email

        /* Получаем данные с postgreSQL */
        const result = await pool.query('SELECT * FROM accounts2 WHERE email = $1', [email])

        const userData = await result.rows[0]


        if (!userData) {
            return new Response(JSON.stringify({error: `Пользователь с ${email} не найден.`}), {
                status: 401,
                headers: {'Content-Type': 'application/json'}
            });
        }

        const hashNewPassword = await bcrypt.hash(newPassword, 10)

        //Обновляем пароль пользователя
        await pool.query('UPDATE accounts2 SET password = $1 WHERE email = $2', [hashNewPassword, email])

        return new Response(JSON.stringify({message: `Пароль успешно сброшен. Войдите в систему для авторизации.`}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });


    } catch (error) {
        return new Response(JSON.stringify({error: `Ошибка сброса пароля, попробуйте позднее или обратитесь в тех.поддержку.`}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    }
}