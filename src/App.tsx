import { useState } from "react";
import "./index.scss"
import Loading from "./page/Loading";
import Options from "./page/Options";
import Result from "./page/Result";
import WebGL from "./page/WebGL";
function App() {
  const [isLoading,setLoading]= useState<boolean>(false);
  const [showResult,setShowResult] = useState<boolean>(false);
  const [showOptions,setOptions] = useState<boolean>(false);
  return (
    <div className="App">
      {
        isLoading?<Loading/>:<></>
      }
      <WebGL />
      {
        showOptions?<Options/>:<></>
      }
      {
        showOptions?<Result />:<></>
      }
    </div>
  );
}

export default App;
