"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import '@/style/restore.css'
import { useState } from "react"

const PassRestore: React.FC = ({ }) => {
    const [message, setMessage] = useState<string>('')
    const [subject, setSubject] = useState<string>('Восстановление пароля')
    const [link, setLink] = useState<string>('Перейдите по ссылке для восстановления пароля: http://localhost:3000/reset-pass')
    const [title, setTitle] = useState<string>('Ссылка на восстановление пароля будет отправлено на указанную почту')
    const [formNone, setFormNone] = useState<boolean>(false)

    const router = useSearchParams()
    const email: string = router.get('emailRestore') || ''

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, subject, link })
            })

            if (!response.ok) {
                console.log('Error');
            }
            else {
                const data = await response.json()
                setTitle(data.message)
                console.log(data);
                setFormNone(true)
            }
        } catch (error) {
            console.log('error');
        }
    }

    return (
        <section className="send_main_block">
            <section className="res_main_block">
                <h2>Восстановление пароля</h2>
                <h4>{title}</h4>
                <form style={{display: formNone ? 'none' : 'flex'}} onSubmit={sendEmail}>

                    <div className='res_email_block'>
                        <div className='res_icons_block'>
                            <img src="/auth_login_icon.svg" alt="Email Icon" />
                            <img src="/auth_email_icon.png" alt="" />
                        </div>
                        <input
                            value={email}
                            type="email"
                            placeholder="Email"
                            disabled />
                    </div>

                    <div className="res_btns">
                        <button className="res_btn" type="submit">
                            Восстановить
                            <img src="/auth_btn_icon.svg" alt="" />
                        </button>
                        <Link href='/auth'>
                            <button className="res_btn">
                                Назад
                                <img src="/auth_btn_icon.svg" alt="" />
                            </button>
                        </Link>
                    </div>

                </form>
            </section>
        </section>
    )
}

export default PassRestore