import React, { useEffect } from "react";
import "./App.css";

import InterestsPage from "./interests/page/InterestsPage";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Organize me";
  }, []);
  return (
    <div className="App">
      <InterestsPage />
    </div>
  );
};

export default App;
