class APIService {
    static fetchData(url, method = 'GET', data = null, token = '') {
        return new Promise((resolve, reject) => {
            const options = { 
                method, 
                headers: {}, 
            }; 
            if (token) { 
                options.headers.Authorization = `Bearer ${token}`; 
            }
            if (method !== 'GET') {
                const formData = new FormData(); 
                for (const key in data) { 
                    formData.append(key, data[key]); 
                }
                options.body = formData;
            }
            fetch(url, options)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }
}