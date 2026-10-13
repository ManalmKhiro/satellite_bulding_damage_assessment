import { createContext, useContext, useState, useEffect } from "react";

const ResultContext = createContext();

export function ResultProvider({ children }) {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // تحميل من localStorage أول ما يفتح التطبيق
  useEffect(() => {
    const saved = localStorage.getItem("result");
    const savedHistory = localStorage.getItem("history");

    if (saved) setResult(JSON.parse(saved));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // حفظ أي تغيير
  const saveResult = (data) => {
    setResult(data);
    localStorage.setItem("result", JSON.stringify(data));

    const newHistory = [data, ...history];
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  return (
    <ResultContext.Provider value={{ result, saveResult, history }}>
      {children}
    </ResultContext.Provider>
  );
}

export const useResult = () => useContext(ResultContext);