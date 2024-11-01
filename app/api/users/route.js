
import pool from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        // Получение данных из запроса
        const data = await request.json();
        const { fullName, email, password } = data;

        const hashPass = await bcrypt.hash(password, 10);

        // Вставка данных в базу
        const result = await pool.query(
            'INSERT INTO accounts2 (fullname, email, password) VALUES ($1, $2, $3) RETURNING id',
            [fullName, email, hashPass]
        );

        return new Response(
            JSON.stringify({ id: result.rows[0].id, message: 'Пользователь успешно зарегистрирован.' }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {

        console.error('Ошибка при обработке запроса:', error);
        if (error.code === '23505') {
            return new Response(
                JSON.stringify({ message: `Email уже зарегистрирован` }),
                { status: 409, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: `Ошибка регистрации, попробуйте позднее` }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );

    }
}

export async function GET(request) {
    const url = new URL(request.url);

    // Получение данных из запроса
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Недостаточно данных' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {

        /* Получаем данные с postgreSQL */
        const result = await pool.query('SELECT * FROM accounts2 WHERE email = $1', [email])

        const userData = await result.rows[0]

        // Если данные не получены, возвращаем ответ со статусом 404
        if (!userData) {
            return new Response(JSON.stringify({ message: 'Пользователь не найден'}), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        // Сравниваем пароли
        const chekPasswords = await bcrypt.compare(password, userData.password)

        if (!chekPasswords) {
            // Неверный пароль
            return new Response(JSON.stringify({ message: 'Неверный пароль' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        //Генерируем jwt-токен
        const token = jwt.sign({email: userData.email}, 'my-very-secret-key-for-jwt', {expiresIn: '1h'});

        // Возврат успешного ответа
        return new Response(JSON.stringify({ message: 'Авторизация успешна', token }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {

        return new Response(JSON.stringify({message: 'Ошибка авторизаций, попробуйте позднее.'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        })
    }
}