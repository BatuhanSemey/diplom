"use client"

import style from '@/style/balance.module.css';
import { useEffect, useState } from 'react';
import { TableBalance } from '@/types/types';

const Balance: React.FC = () => {
    const [dataTable, setDataTable] = useState<TableBalance[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('/api/out-balance', {
                    method: 'GET',
                    headers: { 'Content-Type': 'Application/json' }
                })

                if (!response.ok) {
                    const error = await response.json()
                    console.log(error.message);
                }
                else {
                    const result = await response.json()
                    setDataTable(result.balance)
                    console.log(result.balance);
                }

            } catch (error) {
                console.log(error);
            }
        }

        getData()

    }, [])

    return (
        <section className={style.main}>
            <div className={style.balance_header}>
                <p>OUT-Баланс (доступный / холд)</p>
            </div>
            <table className={style.block_table}>
                <tbody>
                    {dataTable.map((row, index) => (
                        <tr key={index}>

                            <td>{row.currency}</td>
                            <td>{row.amount_range}</td>
                        </tr>
                    ))}


                </tbody>
            </table>

        </section>
    )
}

export default Balance;