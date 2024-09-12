const config = {
    api_path: 'http://172.20.213.81:5000',
    token_name: 'pos_token',
    headers: () => {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('pos_token')
            }
        }
    }
}

export default config;

config.headers