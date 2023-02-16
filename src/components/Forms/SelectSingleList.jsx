import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getRegistry, getRegistryValue } from "../../services/DmpServiceApi";
import { GlobalContext } from "../context/Global";

function SelectSingleList({ label, name, changeValue, tooltip, registry }) {
  const [options, setoptions] = useState(null);
  const { form, temp, lng } = useContext(GlobalContext);

  /* A hook that is called when the component is mounted. It is used to set the options of the select list. */
  useEffect(() => {
    let isMounted = true;
    const createOptions = (data) => {
      return data.map((option) => ({
        value: lng === "fr" ? option?.fr_FR || option?.label?.fr_FR : option?.en_GB || option?.label?.en_GB,
        label: lng === "fr" ? option?.fr_FR || option?.label?.fr_FR : option?.en_GB || option?.label?.en_GB,
        object: option,
      }));
    };
    const setOptions = (data) => {
      if (isMounted) {
        setoptions(data);
      }
    };
    getRegistryValue(registry, "token").then((res) => {
      if (res) {
        setOptions(createOptions(res));
      } else {
        return getRegistry(registry, "token").then((resRegistry) => {
          setOptions(createOptions(resRegistry));
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, [registry, lng]);

  /**
   * It takes the value of the input field and adds it to the list array.
   * @param e - the event object
   */
  const handleChangeList = (e) => {
    console.log(e.object?.fr_FR);
    console.log(e.object?.label?.fr_FR);
    const label = e.object?.fr_FR || e.object?.label?.fr_FR;
    changeValue({ target: { name: name, value: e.object } });
  };

  return (
    <>
      <div className="form-group">
        <label>{label}</label>
        {tooltip && (
          <span className="m-4" data-toggle="tooltip" data-placement="top" title={tooltip}>
            ?
          </span>
        )}
        <div className="row">
          <div className="col-md-10">
            <Select
              onChange={handleChangeList}
              options={options}
              name={name}
              defaultValue={{
                label: temp ? temp[name]?.label?.fr_FR : form[name] ? "form[name]" : "Sélectionnez une valeur de la liste ou saisissez une nouvelle.",
                value: temp ? temp[name]?.label?.fr_FR : form[name] ? "form[name]" : "Sélectionnez une valeur de la liste ou saisissez une nouvelle.",
              }}
            />
          </div>
        </div>
      </div>
      {temp && <p>{JSON.stringify(temp[name]?.label?.fr_FR)}</p>}
    </>
  );
}

export default SelectSingleList;
