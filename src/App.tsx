import { useContext, useState } from "react";
import { CompanyContext } from "./contexts/CompanyContext";
import Button from "./components/Button";
import Widget from "./components/Widget";

function App() {
  const companyContext = useContext(CompanyContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="resajet-container">
      <div className="resajet-section">
        <Button
          companyContext={companyContext}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Widget
          companyContext={companyContext}
          isOpen={isOpen}
          openCloseWidget={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  );
}

export default App;
