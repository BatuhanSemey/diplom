"use client"

import style from '@/style/aside.module.css';
import Link from 'next/link';
import { useState } from 'react';

const Menu: React.FC = () => {
    const [onCategoryPay, setOnCategoryPay] = useState<boolean>(false)

    const openCat = () => {
        setOnCategoryPay(!onCategoryPay)
    }

    return (
        <aside className={style.aside_main_block}>
            <ul className={style.category}>
                <li>
                    <div onClick={() => openCat()} className={style.menu_item}>
                        <img src="/main_icon_1.svg" alt="Платежи" />
                        <p style={onCategoryPay ? {fontWeight: 'bold' } : { fontWeight: 'normal' }}>Платежи</p>
                    </div>
                    <ul style={onCategoryPay ? { display: 'block' } : { display: 'none' }} className={style.submenu}>
                        <li>
                            <Link href='/main/pay-in'>
                                <div className={style.menu_item}>
                                    <img src="/main_icon_2.svg" alt="PayIn Ecom" />
                                    <p>PayIn Ecom</p>
                                </div>
                            </Link>

                        </li>
                        <li>
                            <Link href={'/main/sbp'}>
                                <div className={style.menu_item}>
                                    <img src="/sbp.svg" alt="СБП" />
                                    <p>СБП</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={'/main/out-balance'}>
                        <div className={style.menu_item}>
                            <img src="/main_icon_4.svg" alt="OUT-Баланс" />
                            <p>OUT-Баланс</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href={'/main/profile'}>
                        <div className={style.menu_item}>
                            <img src="/profile.svg" alt="Профиль" />
                            <p>Профиль</p>
                        </div>
                    </Link>

                </li>
            </ul>
        </aside>
    );
};

export default Menu;
