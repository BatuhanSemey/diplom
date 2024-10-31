"use client"


import '@/style/registration.css'
import Link from 'next/link';
import { useState } from 'react';

const Registration: React.FC = () => {
    let passwordLength: number = 8
    const [password, setPassword] = useState<string>('')
    const [repPassword, setRepPassword] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const [successMessage, setSuccessMessage] = useState<string>('')

    /*Валидация полей*/
    const validateInputs = (): boolean => {
        let errors: string[] = []

        if (!password || !repPassword || !fullName || !email) {
            errors.push('Заполните все поля.')
        }
        if (password.length < passwordLength || repPassword.length < passwordLength) {
            errors.push(`Пароль должен содержать минимум ${passwordLength} символов.`)
        }
        if (password !== repPassword) {
            errors.push('Пароли не совпадают.')
        }
        if (!(/[A-Z]/.test(password) && /[a-z]/.test(password))) {
            errors.push(`Пароль должен содержать как минимум одну заглавную и одну маленькую букву.`)
        }
        if (!(/[A-Z]/.test(repPassword) && /[a-z]/.test(repPassword))) {
            errors.push(`Повторный пароль должен содержать как минимум одну заглавную и одну маленькую букву.`)
        }
        if (errors.length > 0) {
            setErrorMessage(errors)
            return false
        }

        return true
    }

    /* Отправка формы */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateInputs()) {
            return
        }

        setErrorMessage([])
        
        /* Запрос в БД */
        try {
            const respone = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            })

            setEmail('')
            setFullName('')
            setPassword('')
            setRepPassword('')

            if (!respone.ok) {
                const error = await respone.json().then(data => data.message)
                setErrorMessage([error])
            }
            else {
                setSuccessMessage(`${await respone.json().then(data => data.message)} Для авторизаций воспользуйтесь кнопкой "Войти"`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="reg_main_block">
            <form onSubmit={handleSubmit}>
                <h2>Регистрация</h2>

                <div className='reg_login_block'>
                    <div className='reg_icons_block'>
                        <img src="/auth_login_icon.svg" alt="Login Icon" />
                        <img src="/auth_login_icon2.svg" alt="" />
                    </div>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        type="text"
                        placeholder="ФИО" />
                </div>

                <div className='reg_email_block'>
                    <div className='reg_icons_block'>
                        <img src="/auth_login_icon.svg" alt="Email Icon" />
                        <img src="/auth_email_icon.png" alt="" />
                    </div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email" />
                </div>

                <div className='reg_password_block'>
                    <div className='reg_icons_block'>
                        <img src="/auth_login_icon.svg" alt="Password Icon" />
                        <img src="/auth_pass_icon.svg" alt="" />
                    </div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Пароль" />
                </div>
                <div className='reg_password_block'>
                    <div className='reg_icons_block'>
                        <img src="/auth_login_icon.svg" alt="Password Icon" />
                        <img src="/auth_pass_icon.svg" alt="" />
                    </div>
                    <input
                        value={repPassword}
                        onChange={(e) => setRepPassword(e.target.value)}
                        type="password"
                        placeholder="Повторите пароль" />
                </div>
                <button className='reg_btn' type="submit">
                    Отправить
                    <img src="/auth_btn_icon.svg" alt="" />
                </button>
                <div className='login_link'>
                    <Link href='/auth'>Войти?</Link>
                </div>

                {errorMessage?.length > 0 && (
                    <ul className='error_message'>
                        {errorMessage && errorMessage.map((element, index) => (
                            <li key={index}>{element}</li>
                        ))}
                    </ul>
                )}
                <span className='success_message'>{successMessage}</span>

            </form>
        </section>
    )
}

export default Registration;