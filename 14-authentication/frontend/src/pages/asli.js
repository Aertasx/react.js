import { useState, useEffect } from "react";
import PageContent from "../components/PageContent";

function AsliPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/veriler"); // txt dosyasının adını ve yolunu doğru şekilde ayarlayın
        const text = await response.text();
        console.log(response, text);
        const parsedData = text.split(";"); // ";" ile ayrılan verileri diziye ayır
        setData(parsedData);
        console.log(
          "dosyadan gelen veri: " + text,
          "parse edilmiş data: " + parsedData
        );
      } catch (error) {
        console.error("Veri yüklenirken bir hata oluştu: ", error);
      }
    }

    fetchData();
  }, []); // Boş bağımlılık dizisi, sadece bir kere çalışmasını sağlar

  return (
    <PageContent title="Veriler">
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </PageContent>
  );
}

export default AsliPage;
