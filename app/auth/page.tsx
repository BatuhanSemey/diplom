"use client"

import '@/style/authorization.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../utils/authContext';


const Autorization: React.FC = () => {
    const { setIsAuth } = useAuth();
    const router = useRouter()
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const chekInputs = (): boolean => {
        if (!password && !email) {
            return false
        }
        return true
    }

    const getSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (!chekInputs()) {
            return setErrorMessage('Заполните все поля')
        }

        setErrorMessage('')

        try {

            const response = await fetch(`/api/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
                const error = await response.json()
                setErrorMessage(error.message)
            }
            else { 
                setEmail('')
                setPassword('')
                const data = await response.json()
                console.log(data);
                
                //Сохраняем jwt токен в localStorage
                localStorage.setItem('jwt', data.token)



                router.replace('/main')

                setIsAuth(true)
            }
        } catch (error) {
            setErrorMessage('Ошибка авторизаций, попробуйте позднее.')
        }
    }

    return (
        <section className="auth_main_block">
            <form onSubmit={getSubmit}>
                <h2>Вход в личный кабинет <br /> агента</h2>
                <div className='language_list'>
                    <select className='' name="" id="">
                        <option value="RUS">RUS</option>
                        <option value="ENG">ENG</option>
                    </select>
                </div>

                <div className='auth_login_block'>
                    <div className='auth_icons_block'>
                        <img src="/auth_login_icon.svg" alt="Login Icon" />
                        <img src="/auth_login_icon2.svg" alt="" />
                    </div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email" />
                </div>
                <div className='auth_password_block'>
                    <div className='auth_icons_block'>
                        <img src="/auth_login_icon.svg" alt="Password Icon" />
                        <img src="/auth_pass_icon.svg" alt="" />
                    </div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Пароль" />
                </div>
                {errorMessage === 'Неверный пароль' ?
                    <div className='login_link'>
                        <Link href={{ pathname: '/send-pass', query: { emailRestore: email } }} >
                            Сбросить пароль
                        </Link>
                    </div>
                    :
                    null
                }
                <button className='auth_btn' type="submit">
                    Вход
                    <img src="/auth_btn_icon.svg" alt="" />
                </button>
                <div className='login_link'>
                    <Link href='/regist'>Зарегестрироваться?</Link>
                </div>
                <span className='error_message'>{errorMessage}</span>
            </form>
        </section>
    )
}

export default Autorization;