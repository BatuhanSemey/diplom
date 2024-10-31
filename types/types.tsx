export type searchConfigType = {
    type: 'input' | 'select';
    label: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    options?: { value: string; label: string }[];
}

export interface SearchProps {
    searchConfigs: searchConfigType[],
    onSearch: (params: SearchParams) => void
}

export interface SearchParams {
    [key: string]: string 
}

export interface HeaderProps {
    onToggleMenu: () => void;
    onLogout: () => void;
    menuStatus: boolean
}

export interface TableBalance {
    amount_range: string,
    currency: string
}