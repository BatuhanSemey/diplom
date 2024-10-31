export const getData = async (token: string): Promise<string> => {
    try {
        const response = await fetch('/api/data-users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            return ''
        }
        else {
            const data = await response.json()
            return data.nameUser
        }
    } catch (error) {
        return ''
    }
}