import { useEffect, useState } from 'react'

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset states
        setData([]);
        setError(null);
        setLoading(true);

        // Check if URL is valid before fetching
        if (!url || url.includes('undefined')) {
            setLoading(false);
            setError('Invalid URL');
            return;
        }

        const fetchData = async () => {
            try {
                console.log("Fetching URL:", url);

                const res = await fetch(url, {
                    method: "GET"
                });

                const result = await res.json();
                if (!res.ok) {
                    throw new Error(result.message || "Failed to fetch data");
                }

                setData(result.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
                console.error("Error fetching data:", err.message);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;