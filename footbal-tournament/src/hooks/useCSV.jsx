import { useState, useEffect } from "react";

export const useCSV = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const csvText = await response.text(); // Get CSV text content
        const parsedData = parseCSV(csvText);  // Parse CSV into objects
        setData(parsedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n").map(line => line.trim());
    const headers = lines[0].split(",").map(header => header.trim()); // Extract headers
    return lines.slice(1).map(line => {
      const values = line.split(",").map(value => value.trim()); // Extract row values
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];  // Map headers to values
        return obj;
      }, {});
    });
  };

  return { data, loading, error };
};