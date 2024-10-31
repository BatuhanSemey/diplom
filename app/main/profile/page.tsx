"use client"

import style from '@/style/profile.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getData } from '@/utils/getFullname';

const Profile: React.FC = () => {
    let lengthPassword: number = 8
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [repNewPassword, setRepNewPassword] = useState<string>('')
    const [fullnameUser, setFullnameUser] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const [successMessage, setSuccessMessage] = useState<string>('')

    /*Валидация полей*/
    const validateInputs = (): boolean => {

        let errors: string[] = []

        if (newPassword.length < lengthPassword || repNewPassword.length < lengthPassword) {
            errors.push(`Пароль должен содержать минимум ${lengthPassword} символов.`)
        }
        if (newPassword !== repNewPassword) {
            errors.push('Пароли не совпадают.')
        }
        if (!(/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword))) {
            errors.push(`Пароль должен содержать как минимум одну заглавную и одну маленькую букву.`)
        }
        if (!(/[A-Z]/.test(repNewPassword) && /[a-z]/.test(repNewPassword))) {
            errors.push(`Повторный пароль должен содержать как минимум одну заглавную и одну маленькую букву.`)
        }
        if (errors.length > 0) {
            setErrorMessage(errors)
            return false
        }

        return true
    }

    useEffect(() => {
        const handleGetFullname = async () => {
            const token = localStorage.getItem('jwt')

            if (token) {
                const result = await getData(token)

                if (result) {
                    setFullnameUser(result)
                }
            }
        }
        if (!fullnameUser) {
            handleGetFullname()
        }
    }, [[], fullnameUser])

    const getResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateInputs()) {
            return
        }

        setErrorMessage([])

        try {
            const token = localStorage.getItem('jwt')

            const response = await fetch(`/api/profile-reset-pass?token=${token}&currentPassword=${currentPassword}&newPassword=${newPassword}`)

            if (!response.ok) {
                const error = await response.json()
                return setErrorMessage([error.error])
            }

            const res = await response.json()

            setSuccessMessage(res.message)

            setCurrentPassword('')
            setNewPassword('')
            setRepNewPassword('')

        } catch (error) {
            setErrorMessage(['Ошибка изменения пароля, попробуйте позднее или обратитесь в тех.поддержку.'])
        }
    }

    return (
        <section className={style.main}>
            <div className={style.profile_header}>
                <div>
                    <img className={style.img_1} src="/profile_icon.svg" alt="" />
                    <img className={style.img_2} src="/profile.svg" alt="" />
                </div>
                <p>{fullnameUser}</p>
            </div>
            <form className={style.from} onSubmit={getResetPassword} >
                <div className={style.current_pass_block}>
                    <div>
                        <label htmlFor="currentPassword">Текущий пароль</label>
                        <input
                            id='currentPassword'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                        />
                    </div>

                </div>

                <div className={style.new_pass_block}>
                    <div>
                        <label htmlFor="newPassword">Новый пароль</label>
                        <input
                            id='newPassword'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                        />
                    </div>

                </div>
                <div className={style.rep_new_pass_block}>
                    <div>
                        <label htmlFor="repNewPassword">Подтвердите новый пароль</label>
                        <input
                            id='repNewPassword'
                            value={repNewPassword}
                            onChange={(e) => setRepNewPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                        />
                    </div>

                </div>
                <div className={style.block_btn}>
                    <button className={style.edit_password} type="submit">
                        Изменить пароль
                    </button>
                </div>

                <div className={style.messages}>
                    <div>
                        {errorMessage?.length > 0 && (
                            <ul className={style.error_message}>
                                {errorMessage && errorMessage.map((element, index) => (
                                    <li key={index}>{element}</li>
                                ))}
                            </ul>
                        )}
                        <span className={style.success_message}>{successMessage}</span>
                    </div>

                </div>



            </form>
        </section>
    )
}

export default Profile;