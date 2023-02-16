import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BuilderForm from "../Builder/BuilderForm";
import { parsePatern } from "../../utils/GeneratorUtils";
import { GlobalContext } from "../context/Global";
import toast from "react-hot-toast";
import { getContributor, getSchema } from "../../services/DmpServiceApi";

function SelectContributorSingle({ label, name, changeValue, template, keyValue, level, tooltip }) {
  const [show, setShow] = useState(false);
  const [options, setoptions] = useState(null);
  const { form, setform, temp, settemp } = useContext(GlobalContext);
  const [index, setindex] = useState(null);
  const [registerFile, setregisterFile] = useState(null);
  const [selectedValue, setselectedValue] = useState(null);

  useEffect(() => {
    getSchema(template, "token").then((resTemp) => {
      setregisterFile(resTemp);
      const patern = resTemp.to_string;
      getContributor("token").then((res) => {
        const optionsContributor = res.data.map((option) => ({
          value: option.firstName + " " + option.lastName,
          label: option.firstName + " " + option.lastName,
          object: option,
        }));
        if (form[keyValue] !== undefined) {
          var ids = new Set(form[keyValue].map((d) => d.lastName && d.firstName));
          var merged = [...form[keyValue], ...res.data.filter((d) => !ids.has(d.lastName) && !ids.has(d.firstName))];
          const options = merged.map((option) => ({
            value: option.firstName + " " + option.lastName,
            label: parsePatern(option, patern),
            object: option,
            objectName: parsePatern(option, patern),
          }));
          setoptions(options);
          setselectedValue(parsePatern(form[keyValue][0], patern));
        } else {
          setoptions(optionsContributor);
          setselectedValue("Sélectionnez une valeur de la liste ou saisissez une nouvelle");
          return;
        }
      });

      if (!patern.length) {
        return;
      }
    });
  }, [template, form[keyValue]]);

  useEffect(() => {}, []);

  /**
   * It closes the modal and resets the state of the modal.
   */
  const handleClose = () => {
    setShow(false);
    settemp(null);
    setindex(null);
  };
  /**
   * The function takes a boolean value as an argument and sets the state of the show variable to the value of the argument.
   * @param isOpen - boolean
   */
  const handleShow = (isOpen) => {
    setShow(isOpen);
  };

  /**
   * It takes the value of the input field and adds it to the list array.
   * @param e - the event object
   */
  const handleChangeList = (e) => {
    const patern = registerFile.to_string;
    const { object, value } = options[e.target.value];
    setselectedValue(e.target.value);
    if (patern.length > 0) {
      changeValue({ target: { name, value: [object] } });
      setform({ ...form, [keyValue]: [object] });
    } else {
      changeValue({ target: { name, value } });
    }
  };

  /**
   * If the index is not null, then delete the item at the index, add the temp item to the end of the array,
   * and then splice the item from the list array.
   * If the index is null, then just save the item.
   */
  const handleAddToList = () => {
    //edit
    if (index !== null) {
      //const objectPerson = { person: temp, role: "from create" };
      setform({ ...form, [keyValue]: [temp] });
    } else {
      //save new
      handleSave();
    }
    toast.success("Enregistrement a été effectué avec succès !");
    settemp(null);
    handleClose();
  };

  /**
   * When the user clicks the save button, the function will take the temporary person object and add it to the form object, then it will parse the
   * temporary person object and add it to the list array, then it will close the modal and set the temporary person object to null.
   */
  const handleSave = () => {
    //const objectPerson = { person: temp, role: "from create" };
    setform({ ...form, [keyValue]: [temp] });
    handleClose();
    settemp(null);
    setselectedValue(parsePatern(temp, registerFile.to_string));
  };

  /**
   * It sets the state of the temp variable to the value of the form[keyValue][idx] variable.
   * @param idx - the index of the item in the array
   */
  const handleEdit = (idx) => {
    settemp(form[keyValue][idx]);
    setShow(true);
    setindex(idx);
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

        <div>
          <h6>Sélectionner une valeur dans la liste ou créer une nouvelle valeur en cliquant sur +</h6>

          <div className="row">
            <div className="col-md-10">
              {/* {selectedValue && (
                <Select
                  onChange={handleChangeList}
                  options={options}
                  name={name}
                  //defaultValue={isEdit ? isEdit[name] : "Sélectionnez une valeur de la liste ou saisissez une nouvelle."}
                  defaultValue={{
                    label: temp ? temp[name] : selectedValue,
                    value: temp ? temp[name] : selectedValue,
                  }}
                />
              )} */}
              {options && (
                <select id="company" className="form-control" onChange={handleChangeList}>
                  {!form[keyValue] && <option>Sélectionnez une valeur de la liste ou saisissez une nouvelle.</option>}
                  {options.map((o, idx) => (
                    <option key={o.value} value={idx}>
                      {o.label}
                    </option>
                  ))}
                  ;
                </select>
              )}
            </div>
            <div className="col-md-2">
              <i className="fas fa-plus-square text-primary icon-margin-top" onClick={handleShow}></i>
            </div>
          </div>

          {form[keyValue] && (
            <div style={{ margin: "10px" }}>
              <strong>Valeur sélectionnée :</strong> {selectedValue}
              <a href="#" onClick={() => handleEdit(0)}>
                {" "}
                (modifié)
              </a>
            </div>
          )}
        </div>
      </div>
      <>
        {registerFile && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <BuilderForm shemaObject={registerFile} level={level + 1}></BuilderForm>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button variant="primary" onClick={handleAddToList}>
                Enregistrer
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    </>
  );
}

export default SelectContributorSingle;
