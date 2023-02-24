import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getDefaultModel, getFunder, getFunderById, getOrganisme, getOtherOrganisme, getOtherOrganismeById } from "../../services/DmpPlansApi";
import { GlobalContext } from "../context/Global";

function SecondStep({ handleNextStep }) {
  const { context, setContext } = useContext(GlobalContext);
  const [defaultModel, setdefaultModel] = useState(null);
  const [otherOrganisme, setOtherOrganisme] = useState(null);
  const [listFunder, setlistFunder] = useState(null);
  const [listOrganisme, setListOrganisme] = useState(null);
  const [isShowListOrganizme, setisShowListOrganizme] = useState(false);
  const [isShowOrganizme, setisShowOrganizme] = useState(false);
  const [isShowFunder, setisShowFunder] = useState(false);
  const [funders, setFunders] = useState(null);
  const [organismes, setorganismes] = useState(null);

  useEffect(() => {
    getOrganisme().then((res) => {
      setListOrganisme(res.data.templates);
    });
  }, [context]);

  useEffect(() => {
    getDefaultModel().then((res) => {
      setdefaultModel(res.data);
    });
  }, []);

  useEffect(() => {
    getOtherOrganisme().then((res) => {
      const options = res.data.map((option) => ({
        value: option.id,
        label: option.sort_name,
        object: option,
      }));
      setOtherOrganisme(options);
      //setdefaultModel(res.data);
    });
  }, []);

  useEffect(() => {
    getFunder().then((res) => {
      const options = res.data.map((option) => ({
        value: option.id,
        label: option.sort_name,
        object: option,
      }));
      setlistFunder(options);
    });
  }, []);

  const handleCheckOption = (val) => {
    console.log(val);
    if (val === "1") {
      setisShowListOrganizme(false);
      setisShowOrganizme(false);
    } else if (val === "2") {
      setisShowListOrganizme(true);
      setisShowOrganizme(false);
    } else if (val === "3") {
      setisShowListOrganizme(false);
      setisShowOrganizme(false);
      setorganismes(null);
    } else {
      setisShowListOrganizme(false);
      setisShowOrganizme(false);
    }
  };

  const handleChangeOtherOrganisme = (e) => {
    getOtherOrganismeById("", e.object, context).then((res) => {
      setorganismes(res.data.templates);
      setisShowOrganizme(true);
    });
  };

  const handleChangeFunder = (e) => {
    getFunderById("", e.object, context).then((res) => {
      console.log(res);
      setFunders(res.data.templates);
      setisShowFunder(true);
    });
  };

  return (
    <div className="container-card">
      <div className="row">
        <div className="row circle-content">
          <div className="circle">2</div>
          <span className="circle-text">Choisissez votre modèle</span>
        </div>
      </div>
      <div className="column">
        <div className="form-check">
          <input
            className="form-check-input check"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            defaultChecked
            onClick={() => handleCheckOption("1")}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Modèle par défaut
          </label>
          <div className="list-context">{defaultModel && defaultModel?.title}</div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onClick={() => handleCheckOption("2")} />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            INRAE (votre organisme)
          </label>

          <div className="list-organisme">
            {isShowListOrganizme &&
              listOrganisme &&
              listOrganisme.map((el) => (
                <label className="element-organisme">
                  <input type="radio" id={el.id} name="contact" />
                  {/* <label htmlFor={el.id}>{el.title}</label> */}
                  <div className="list-element">{el.title}</div>
                </label>
              ))}
          </div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={() => handleCheckOption("3")} />
          <label className="form-check-label" htmlFor="flexRadioDefault3">
            Autre organisme
          </label>
          <div>
            {otherOrganisme && <Select options={otherOrganisme} onChange={handleChangeOtherOrganisme} />}
            <div className="list-organisme">
              {isShowOrganizme &&
                organismes &&
                organismes.map((el) => (
                  <label className="element-organisme">
                    <input type="radio" id={el.id} name="contact" />
                    {/* <label htmlFor={el.id}>{el.title}</label> */}
                    <div className="list-element">{el.title}</div>
                  </label>
                ))}
            </div>
          </div>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" onClick={() => handleCheckOption("4")} />
          <label className="form-check-label" htmlFor="flexRadioDefault4">
            Financeur
          </label>
          <div>
            {listFunder && <Select options={listFunder} onChange={handleChangeFunder} />}
            <div className="list-organisme">
              {isShowFunder &&
                funders &&
                funders.map((el) => (
                  <label className="element-organisme">
                    <input type="radio" id={el.id} name="contact" />
                    {/* <label htmlFor={el.id}>{el.title}</label> */}
                    <div className="list-element">{el.title}</div>
                  </label>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <button type="button" className="btn btn-primary validate" onClick={handleNextStep}>
          Valider mon choix
        </button>
      </div>
    </div>
  );
}

export default SecondStep;
