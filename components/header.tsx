"use client"

import '@/style/footer.css'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getData } from '@/utils/getFullname';
import { HeaderProps } from '@/types/types';
import { useRouter } from 'next/navigation';

const Header: React.FC<HeaderProps> = ({ onToggleMenu, onLogout, menuStatus }) => {
    const route = useRouter()
    const [timeZone, setTimeZone] = useState<string>('')
    const [fullNameUser, setFullNameUser] = useState<string>('')
    const data = new Date()

    useEffect(() => {
        const utc = data.getTimezoneOffset() / 60
        const timeZone = `UTC${utc > 0 ? '- 0 ' : ' + 0'}${Math.abs(utc)}:00`
        setTimeZone(timeZone)

        //Получаем необходимые данные
        const handleGetData = async () => {

            const token = localStorage.getItem('jwt');

            if (token) {
                const result = await getData(token)

                if (result!) {
                    setFullNameUser(result)
                }
            }
        }
        if (!fullNameUser) {
            handleGetData()
        }
    }, [data, fullNameUser])

    const exit = async () => {
        onLogout()

        if (menuStatus) {
            onToggleMenu()
        }
    
        route.replace('/auth')
    }

    return (
        <header className='main_block_header'>
            <div className='header_menu_block'>
                <Link href='/main'>
                    <img src="/header_icon.svg" alt="" />
                </Link>
                <img onClick={onToggleMenu} src="/burger_menu.svg" alt="" />
                <p>{timeZone}</p>
            </div>
            <div className='header_exit_block'>
                <div className='language_list_header'>
                    <select className='' name="" id="">
                        <option value="RUS">RUS</option>
                        <option value="ENG">ENG</option>
                    </select>
                </div>
                <p>{fullNameUser}</p>
                    <button onClick={exit} className='header_btn'>
                        <img src="/exit.svg" alt="" />
                    </button>
            </div>
        </header>
    )
};

export default Header;