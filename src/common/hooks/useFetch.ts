import baseService from "$/services/api/baseService";
import { useState } from "react";

export default function useFetch<T>(url: string, params?: any) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await baseService.get<T>(url, params);
            setData(response);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };
    
    return { data, loading, error, fetchData };
}