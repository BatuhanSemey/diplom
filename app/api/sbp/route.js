import pool from '@/lib/db'

export async function GET(request) {

    try {
        /* Получаем данные с postgreSQL */
        const result = await pool.query('SELECT * FROM sbp')

        const transactions = await result.rows

        // Если данные не получены, возвращаем ответ со статусом 404
        if (!transactions) {
            return new Response(JSON.stringify({ message: 'Данные не найдены'}), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            })
        }


        // Возврат успешного ответа
        return new Response(JSON.stringify({ message: 'Данные успешно получены', transactions }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {

        return new Response(JSON.stringify({message: 'Данные не получены, обратитесь в тех-поддержку'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        })
    }
}