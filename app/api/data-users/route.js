import pool from '../../../lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        // Получение данных из запроса
        const data = await request.json();
        const { token } = data;


        if (!token) {
            return new Response(JSON.stringify({ error: 'Токен не найден' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const decodedToken = jwt.decode(token, 'my-very-secret-key-for-jwt');

        const email = decodedToken.email

        /* Получаем данные с postgreSQL */
        const result = await pool.query('SELECT * FROM accounts WHERE email = $1', [email])

        const userData = await result.rows[0]

        // Если данные не получены, возвращаем ответ со статусом 404
        if (!userData) {
            return new Response(JSON.stringify({ message: 'Пользователь не найден' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        // Возврат успешного ответа
        return new Response(JSON.stringify({ message: 'Авторизация успешна', nameUser: userData.fullname }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {

        return new Response(JSON.stringify({ error: 'Данные не найдены' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}