"use client"

import style from '@/style/payin.module.css';
import Search from '@/components/search';
import { searchConfigsSBP } from '@/utils/searchConfigs'
import { useEffect, useState } from 'react';

const PayIn: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [filters, setFilters] = useState<any>({});

    const statusStyles: any = {
        'Успешно': { backgroundColor: '#B3CAA1' },
        'Ошибка': { backgroundColor: '#C07374' },
        'В процессе': { backgroundColor: '#cbd5e1' },
        'Отменено': { backgroundColor: 'orange' },
    };
    const fetchTransactions = async (params: any = {}, page: number = 1) => {
        try {
            const queryParams = { ...params, page };
            const encodedData = encodeURIComponent(JSON.stringify(queryParams));

            const response = await fetch(`/api/sbp/filter?data=${encodedData}`, {
                method: 'GET',
                headers: { 'Content-Type': 'Application/json' }
            })

            if (!response.ok) {
                const error = await response.json()
                setTransactions([])
            }
            else {
                const result = await response.json()
                setTransactions(result.transactions);
                setTotalPages(result.totalPages);
            }
        } catch (error) {
            console.log(error);
            setTransactions([]);
        }
    }
    useEffect(() => {
        fetchTransactions(filters, currentPage);
    }, [filters, currentPage])


    //Запрос с параметрами
    const handleSearch = async (params: any) => {
        setFilters(params);
        setCurrentPage(1);
    }

    return (
        <section className={style.main}>
            <Search searchConfigs={searchConfigsSBP} onSearch={handleSearch} />
            <div className={style.block_table}>
                <table>
                    <thead>
                        <tr>
                            <th>ID операции</th>
                            <th>Токен</th>
                            <th>Статус</th>
                            <th>Сумма</th>
                            <th>Валюта</th>
                            <th>Комиссия</th>
                            <th>Создан</th>
                            <th>Завершен</th>
                            <th>Код операции</th>
                            <th>Описание кода операции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.token}</td>
                                <td style={statusStyles[transaction.operation_status] || {}}>{transaction.operation_status}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.currency}</td>
                                <td>{transaction.commission}</td>
                                <td>{transaction.created_at}</td>
                                <td>{transaction.completed_at || '—'}</td>
                                <td>{transaction.operation_code}</td>
                                <td>{transaction.operation_description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={style.pagination}>
                <div>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        <img src="/arrow_left.svg" alt="" />
                    </button>

                    <span>
                        Страница {currentPage} из {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        <img src="/arrow_right.svg" alt="" />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default PayIn;
