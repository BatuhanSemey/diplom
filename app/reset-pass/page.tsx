"use client"

import '@/style/registration.css'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const ResetPassContent: React.FC = () => {
    const params = useSearchParams()
    const token = params.get('token')

    let passwordLength: number = 8
    const [password, setPassword] = useState<string>('')
    const [repPassword, setRepPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [hideSuccessResetPass, setHideSuccessResetPass] = useState<boolean>(false)

    /* Валидация полей */
    const validateInputs = (): boolean => {
        let errors: string[] = []

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
            const response = await fetch(`/api/reset-pass?token=${token}&password=${password}`)

            if (!response.ok) {
                return setErrorMessage(['Ошибка сброса пароля, срок токена истек. Восстановите пароль повторно.'])
            }

            const res = await response.json()

            setSuccessMessage(res.message)
            setHideSuccessResetPass(true)
            setPassword('')
            setRepPassword('')

        } catch (error) {
            setErrorMessage(['Ошибка сброса пароля, попробуйте позднее или обратитесь в тех.поддержку.'])
        }
    }

    return (
        <section className="reg_main_block">
            <form onSubmit={handleSubmit}>
                <h2>Сброс нового пароля</h2>

                <div className='reg_password_block'>
                    <div className='reg_icons_block'>
                        <img src="/auth_login_icon.svg" alt="Password Icon" />
                        <img src="/auth_pass_icon.svg" alt="" />
                    </div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Новый пароль"
                        disabled={hideSuccessResetPass}
                    />
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
                        placeholder="Повторите новый пароль"
                        disabled={hideSuccessResetPass}
                    />
                </div>
                {!hideSuccessResetPass && (
                    <button className='reg_btn' type="submit">
                        Сбросить
                        <img src="/auth_btn_icon.svg" alt="" />
                    </button>
                )}

                {hideSuccessResetPass && (
                    <Link href='/auth'>
                        <button className='reg_btn'>
                            Войти
                            <img src="/auth_btn_icon.svg" alt="" />
                        </button>
                    </Link>
                )}

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

const ResetPass: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPassContent />
        </Suspense>
    )
}

export default ResetPass;
