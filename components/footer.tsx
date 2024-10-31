import '@/style/footer.css'
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className='main_block_footer'>
            <div className='footer_block_center'>
                <div>
                    <div>
                        <img src="/footer_icon_1.svg" alt="" />
                        <p>Emoney
                            <span>tools</span>
                        </p>
                    </div>
                    <hr />
                    <Link href={'/main/profile'}>
                        Личный кабинет агента
                    </Link>

                    <hr />
                    <p>2024</p>
                </div>
            </div>

            <div className='footer_block_end'>
                <a href='#'>Документация</a>
            </div>

        </footer>
    )
};

export default Footer;