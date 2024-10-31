"use client"

import style from '@/style/search.module.css'
import { ChangeEventHandler, useState } from 'react';
import { SearchProps } from '@/types/types';

const Search: React.FC<SearchProps> = ({ searchConfigs, onSearch }) => {
    const [openSearchParams, setOpenSearchParams] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useState<{ [key: string]: string }>({})

    //Открытие/закрытие параметров поиска
    const clickOpenParams = () => {
        if (openSearchParams) {
            return setOpenSearchParams(false)
        }

        setOpenSearchParams(true)
    }

    //Пушим параметры поиска
    const setInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target

        setSearchParams((e) => ({ ...e, [name]: value }))
    }

    //Отправляем параметры поиска в родительский компонент
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await onSearch(searchParams)

        clickOpenParams()        
    }
    return (
        <section className={style.main}>
            <div className={style.top_block}>
                <p>Поиск и экспорт</p>
                <button onClick={() => clickOpenParams()}>
                    <img src={openSearchParams ? '/search_exit.svg' : '/arrow_bottom.svg'} alt="" />
                </button>
            </div>
            <form className={`${style.search_params} ${openSearchParams ? style.open : ''}`} onSubmit={handleSubmit}>
                <div className={style.search_block}>
                    {searchConfigs.map((config, index) => (
                        <div key={index} className={style.search_param}>
                            <label htmlFor={config.name} className={style.label}>
                                {config.label}
                            </label>
                            {config.type === 'input' && (
                                <input
                                    onChange={(e) => setInputChange(e)}
                                    type="text"
                                    name={config.name}
                                    placeholder={config.placeholder || ''}
                                    className={style.input_field}
                                    id={config.name}
                                />
                            )}
                            {config.type === 'select' && (
                                <select
                                    onChange={(e) => setInputChange(e)}
                                    name={config.name}
                                    className={style.select_field}
                                    id={config.name}
                                >
                                    {config.options?.map((option, i) => (
                                        <option key={i} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>
                <button className={style.search_btn} type='submit'>Поиск
                    <img src="/search_icon.svg" alt="" />
                </button>
            </form>

        </section>

    )
};

export default Search;