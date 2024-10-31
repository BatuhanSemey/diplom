import { searchConfigType } from '@/types/types';

export const searchConfigsPayIn: searchConfigType[] = [
    {
        type: 'input',
        label: 'Дата от',
        name: 'startDate',
        placeholder: '19.01.2024',
        defaultValue: '19.01.2024'
    },
    {
        type: 'input',
        label: 'Дата до',
        name: 'endDate',
        placeholder: '20.01.2024',
        defaultValue: '20.01.2024'
    },
    {
        type: 'input',
        label: 'Сумма',
        name: 'amount',
        placeholder: '10000',
        defaultValue: '10000'
    },
    {
        type: 'select',
        label: 'Валюта',
        name: 'currency',
        defaultValue: 'RUB',
        options: [
            {value: '', label: ''},
            { value: 'RUB', label: 'RUB' },
            { value: 'USD', label: 'USD' },
            { value: 'KZ', label: 'KZ' }
        ]
    },
    {
        type: 'input',
        label: 'Карта',
        name: 'card',
        placeholder: '440043567862113',
        defaultValue: '440043567862113'
    },
    {
        type: 'input',
        label: 'Токен',
        name: 'token',
        placeholder: '123456',
        defaultValue: '123456'
    },
    {
        type: 'input',
        label: 'ID Операции',
        name: 'operationId',
        placeholder: '123456',
        defaultValue: '123456'
    },
    {
        type: 'select',
        label: 'Статус операции',
        name: 'operationStatus',
        defaultValue: 'Success',
        options: [
            {value: '', label: ''},
            { value: 'Успешно', label: 'Успешно' },
            { value: 'Ошибка', label: 'Ошибка' },
            { value: 'Отменено', label: 'Отменено' },
            { value: 'В процессе', label: 'В процессе' },
        ]
    }
];

export const searchConfigsSBP: searchConfigType[] = [
    {
        type: 'input',
        label: 'Дата от',
        name: 'startDate',
        placeholder: '19.01.2024',
        defaultValue: '19.01.2024'
    },
    {
        type: 'input',
        label: 'Дата до',
        name: 'endDate',
        placeholder: '20.01.2024',
        defaultValue: '20.01.2024'
    },
    {
        type: 'input',
        label: 'Сумма',
        name: 'amount',
        placeholder: '10000',
        defaultValue: '10000'
    },
    {
        type: 'input',
        label: 'Токен',
        name: 'token',
        placeholder: '123456',
        defaultValue: '123456'
    },
    {
        type: 'input',
        label: 'ID Операции',
        name: 'operationId',
        placeholder: '123456',
        defaultValue: '123456'
    },
    {
        type: 'select',
        label: 'Статус операции',
        name: 'operationStatus',
        defaultValue: 'Success',
        options: [
            {value: '', label: ''},
            { value: 'Успешно', label: 'Успешно' },
            { value: 'Ошибка', label: 'Ошибка' },
            { value: 'Отменено', label: 'Отменено' },
            { value: 'В процессе', label: 'В процессе' },
        ]
    }
];