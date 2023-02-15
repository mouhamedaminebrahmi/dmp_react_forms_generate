import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./App.css";

//si type = string et inputtype = dropdown
import BuilderForm from "./components/Builder/BuilderForm";
import { GlobalContext } from "./components/context/Global";
import { checkRequiredForm, getLabelName } from "./utils/GeneratorUtils";
import { getSchema } from "./services/DmpServiceApi";

function App() {
  const { form, setlng } = useContext(GlobalContext);
  const [standardTemplate, setstandardTemplate] = useState(null);

  useEffect(() => {
    //DataStorageStandard
    getSchema("ProjectStandard", "token").then((el) => {
      setstandardTemplate(el);
    });
  }, []);

  /**
   * It checks if the form is filled in correctly.
   * @param e - the event object
   */
  const handleSaveForm = (e) => {
    e.preventDefault();
    const checkForm = checkRequiredForm(standardTemplate, form);
    if (checkForm) {
      toast.error("Veuiller remplire le champs " + getLabelName(checkForm, standardTemplate));
    } else {
      console.log(form);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-2 mt-2">
          <button className="btn btn-primary button-margin" onClick={() => setlng("fr")}>
            fr
          </button>
          <button className="btn btn-primary button-margin" onClick={() => setlng("en")}>
            en
          </button>
        </div>
      </div>
      <div className="col-md-10 m-4"></div>
      <div className="m-4">{standardTemplate && <BuilderForm shemaObject={standardTemplate} level={1}></BuilderForm>}</div>
      <button onClick={handleSaveForm} className="btn btn-primary m-4">
        Enregistrer
      </button>
    </>
  );
}

export default App;
