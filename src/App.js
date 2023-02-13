import { useContext, useState } from "react";
import toast from "react-hot-toast";
import "./App.css";

import Select from "react-select";

// import standardShemaObject from "./data/templates/DataStorageStandard-template.json";
// import standardShemaObjec from "./data/templates/ResearchOutputDescriptionStandard-template.json";
//import standardShemaObject from "./data/templates/BudgetStandard-template.json";
//import standardShemaObject from "./data/templates/ContributorStandard-template.json";
//import standardShemaObject from "./data/templates/PersonStandard-template.json";
//import standardShemaObject from "./data/templates/LicenseStandard-template.json";
//import standardShemaObject from "./data/templates/ControlledKeywordStandard-template.json";
//import standardShemaObject from "./data/templates/CostStandard-template.json";
//import standardShemaObject from "./data/templates/DataPreservationStandard-template.json";
//import standardShemaObject from "./data/templates/DataReuseStandard-template.json";
//import standardShemaObject from "./data/templates/DataCollectionStandard-template.json";
//import standardShemaObject from "./data/templates/DataProcessingStandard-template.json";
//import standardShemaObject from "./data/templates/DataSharingStandard-template.json";
//import standardShemaObject from "./data/templates/DistributionStandard-template.json";
//import standardShemaObject from "./data/templates/DMPStandard-template.json";
//import standardShemaObject from "./data/templates/DocumentationQualityStandard-template.json";
//import standardShemaObject from "./data/templates/ProjectStandard-template.json";
//import standardShemaObject from "./data/templates/DataSharingStandard-template.json";
//import standardShemaObject from "./data/templates/MesoatLRRequest-template.json";
//import standardShemaObject from "./data/templates/FunderStandard-template.json";

//si type = string et inputtype = dropdown
import BuilderForm from "./components/Builder/BuilderForm";
import { GlobalContext } from "./components/context/Global";
import { checkRequiredForm, getLabelName } from "./utils/GeneratorUtils";

const options = [
  { value: "DataStorageStandard-template", label: "DataStorageStandard-template" },
  { value: "ResearchOutputDescriptionStandard-template", label: "ResearchOutputDescriptionStandard-template" },
  { value: "DataSharingStandard-template", label: "DataSharingStandard-template" },
  { value: "BackupPolicyStandard-template", label: "BackupPolicyStandard-template" },
  { value: "BudgetStandard-template", label: "BudgetStandard-template" },
  { value: "FunderStandard-template", label: "FunderStandard-template" },
  { value: "MesoatLRRequest-template", label: "MesoatLRRequest-template" },
  { value: "DataReuseStandard-template", label: "DataReuseStandard-template" },
  { value: "ContributorStandard-template", label: "ContributorStandard-template" },
  { value: "DocumentationQualityStandard-template", label: "DocumentationQualityStandard-template" },
];

function App() {
  const { form, setform, setlng } = useContext(GlobalContext);
  let registerFile = require(`./data/templates/DataStorageStandard-template.json`);
  const [standardTemplate, setstandardTemplate] = useState(registerFile);

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

  /**
   * A function that is called when the user selects a template from the dropdown menu. It takes the selected template and sets the standardTemplate state
   * to the selected template. It also removes the form state from localStorage and sets the form state to null.
   * @param e - The event object
   */
  const handleChangeList = (e) => {
    let registerFile = require(`./data/templates/${e.value}.json`);
    setstandardTemplate(registerFile);
    localStorage.removeItem("form");
    setform(null);
  };

  return (
    <>
      <div className="row">
        <div className="col-9 m-3">
          <Select onChange={handleChangeList} defaultValue={options[0]} options={options} />
        </div>
        <div className="col-2 mt-2">
          <button className="btn btn-primary ml-2" onClick={() => setlng("fr")}>
            fr
          </button>
          <button className="btn btn-primary m-2" onClick={() => setlng("en")}>
            en
          </button>
        </div>
      </div>
      <div className="col-10 m-4"></div>
      <div className="m-4">
        <BuilderForm shemaObject={standardTemplate} level={1}></BuilderForm>
      </div>
      <button onClick={handleSaveForm} className="btn btn-primary m-4">
        Enregistrer
      </button>
    </>
  );
}

export default App;
