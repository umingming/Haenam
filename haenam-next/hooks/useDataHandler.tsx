"use client";

const HTTP_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
} as const

type HttpMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];

export function useFetchData() {
    async function createData(url: string, data: any) {
        return await fetchData(HTTP_METHOD.POST, url, data);    
    }

    async function fetchData(method: HttpMethod, url: string, data?: any) {
        const response = await fetch(url, { method, body: JSON.stringify(data) });
        if (!response.ok) {
            console.log("response", response);
            return response.json();
        }
        return response.json();
    }

    return { createData, fetchData };
}
