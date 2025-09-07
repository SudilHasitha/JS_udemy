import { useCallback, useState } from "react";

async function sendRequest(url, config) {
    const response = await fetch(
        url,
        config
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data && data.message || data.data.message || 'Request failed!');
    }

    return data;
}


export function useHttp(url, config, initialData) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initialData);

    function clearData() {
        setData(initialData);
    }

    const sendRequestHandler = useCallback(
        async function sendRequestHandler(body) {
            setIsLoading(true);
            try {
                const finalConfig = {
                    ...config,
                    body: body ? JSON.stringify(body) : null,
                };

                const data = await sendRequest(url, finalConfig);
                setError('');
                setData(data);
            } catch (err) {
                setError(err.message || 'Something went wrong!');
            }
            setIsLoading(false);
    }, [url, config]);

    return {
        data,
        error,
        isLoading,
        sendRequest: sendRequestHandler,
        clearData
    }
}