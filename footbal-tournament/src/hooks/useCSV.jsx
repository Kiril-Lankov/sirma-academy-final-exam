import { useState, useEffect } from "react";
// create custom Hook which can load and read CSV data
export default function useCSV(url) {
    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error ("Network not responding.");
             // Get content from CSV files
                const csvText = await response.text();
            //Parse CVS data into objects
            const parseData = parseCSV(csvText);
            } catch (err) {
                setError(err.message);
                
            }finally{
                setLoading(false);
            }
        };
        fetchData();
     }, [url]);

     const parseCSV = (csvText) => {
        const lines = csvText.split("\n").map(line => line.trim()); //split CSV text to new lines
        const headers = lines[0].split(",").map(header => header.trim()); // Extract headers
        return lines.slice(1).map(line => {
            const values = line.split(",").map(value => value.trim()); //Extract row values
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index]; //Map headers to value
                return obj;
            }, {});
        });

     };

     return {data, loading, error}
}