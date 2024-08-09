import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import PdfComp from "./PDFViewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.24:8000/documents/");
        const value = await response.json();
        setPdfData(value?.results);
      } catch (error) {
        console.error("Error fetching the PDF:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <PdfComp pdfFile={pdfData?.file} />
    </div>
  );
}

export default App;
