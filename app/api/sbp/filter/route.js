import pool from '@/lib/db'

export async function GET(request) {
    const url = new URL(request.url);

    // Получаем данные из параметров URL
    const res = url.searchParams.get('data');
    let filters = {};

    if (res) {
        filters = JSON.parse(decodeURIComponent(res));
        console.log(filters);
    }

    try {
        const page = parseInt(filters.page) || 1;
        const limit = parseInt(filters.limit) || 14;
        const offset = (page - 1) * limit;
        // Собираем массив условий WHERE и массив значений для параметризованного запроса
        const whereClauses = [];
        const values = [];

        if (filters.startDate) {
            whereClauses.push(`created_at >= $${values.length + 1}`);
            values.push(filters.startDate);
        }

        if (filters.operationStatus) {
            whereClauses.push(`operation_status = $${values.length + 1}`);
            values.push(filters.operationStatus);
        }

        if (filters.endDate) {
            whereClauses.push(`completed_at <= $${values.length + 1}`);
            values.push(filters.endDate);
        }

        if (filters.amount) {
            whereClauses.push(`amount = $${values.length + 1}`);
            values.push(filters.amount);
        }

        if (filters.operationId) {
            whereClauses.push(`id = $${values.length + 1}`);
            values.push(filters.operationId);
        }

        if (filters.token) {
            whereClauses.push(`token = $${values.length + 1}`);
            values.push(filters.token);
        }

        // Строим SQL-запрос
        const query = `
            SELECT * FROM sbp
            ${whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : ''}
            LIMIT $${values.length + 1} OFFSET $${values.length + 2}
        `;

        values.push(limit, offset);
        // Выполняем запрос
        const result = await pool.query(query, values);
        const transactions = result.rows;

        const countQuery = `
            SELECT COUNT(*) FROM sbp
            ${whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : ''}
        `;

        const countResult = await pool.query(countQuery, values.slice(0, -2)); // Используем те же условия без лимита и смещения
        const totalRecords = parseInt(countResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalRecords / limit);

        console.log(totalPages);
        console.log(totalRecords);

        // Если данные не получены, возвращаем ответ со статусом 404
        if (!transactions.length) {
            return new Response(JSON.stringify({ message: 'Данные не найдены' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Возврат успешного ответа с отфильтрованными данными
        return new Response(JSON.stringify({
            message: 'Данные успешно получены',
            transactions,
            totalPages
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Данные не получены, обратитесь в тех-поддержку' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}