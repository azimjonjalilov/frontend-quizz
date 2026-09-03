import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setError(null);
      try {
        const req = await fetch(url);
        if (!req.ok) {
          throw new Error(req.statusText || "Fetch failed");
        }
        const resData = await req.json();
        setData(resData);
        setIsPending(false);
      } catch (err) {
        try {
          const fallbackReq = await fetch("/data/db.json");
          if (!fallbackReq.ok) {
            throw new Error("Local data fetch failed");
          }
          const localData = await fallbackReq.json();
          const urlObj = new URL(url, window.location.origin);
          const titleParam = urlObj.searchParams.get("title");
          if (titleParam) {
            const filtered = localData.quizzes.filter(
              (q) => q.title.toLowerCase() === titleParam.toLowerCase()
            );
            setData({ data: filtered });
          } else {
            setData({ data: localData.quizzes });
          }
          setIsPending(false);
        } catch (fallbackErr) {
          setError(err.message);
          setIsPending(false);
        }
      }
    };
    fetchData();
  }, [url]);

  return { data, isPending, error };
}