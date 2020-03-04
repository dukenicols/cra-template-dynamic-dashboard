import API_CLIENT from 'api/client';
import { useState, useEffect } from 'react';

function useFetch(url, active) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchUrl() {
            const response = await API_CLIENT.get(url);
            setLoading(false);
            setData(response.data);
        }

        if (active) {
            fetchUrl();
        }
    }, [url, active]);

    return [data, loading];
}

export { useFetch };
