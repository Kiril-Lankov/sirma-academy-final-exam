import { useEffect, useState } from "react";

export const useCSV = (filePath) => {
    const[data,setData]=useState([]);
    const[loading, setLoading]=useState(true);
    const[error,setError]=useState(null);


useEffect (() => {
    const fetchCSV = async () => {
        try {
            const response = await fetch(filePath);
            const csvText = await response.text();

            const rows = csvText.trim().split("\n");
            const headers = rows[0].split(",").map(h => h.trim());

            const parseData = rows.slice(1).map( row => {
                const values = row.split(",");
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header] = values[i] === 'NULL' ? 90 : values[i].trim();
                });
                return obj;
            });

            setData(parseData);
        }catch (err) {
            setError(err.message);
        }finally {
            setLoading(false);
        }

    };

    fetchCSV();
}, [filePath]);

return {data,loading,error};

};