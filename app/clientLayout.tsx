// app/ClientLayout.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Footer from "@/components/footer";
import Header from "@/components/header";
import Menu from "@/components/menu";
import { useAuth } from '../utils/authContext';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
    const { isAuth, setIsAuth } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('jwt')

        if (token) {
            setIsAuth(true)
        }
    }, [])

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    const onLogout = () => {
        localStorage.removeItem('jwt')
        setIsAuth(false)
    }
    return (
        <>
            {isAuth && <Header onToggleMenu={toggleMenu} onLogout={onLogout} menuStatus={isMenuVisible} />}
            <main style={{ display: 'flex', flex: '1' }}>
                {isMenuVisible && <Menu />}
                <section style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </section>
            </main>

            <Footer />
        </>
    );
};

export default ClientLayout;
