import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BuilderForm from "../Builder/BuilderForm";
import Select from "react-select";
import { parsePatern } from "../../utils/GeneratorUtils";
import { GlobalContext } from "../context/Global";
import toast from "react-hot-toast";
import { getSchema } from "../../services/DmpServiceApi";

function SelectContributorSingle({ label, name, changeValue, template, keyValue, level, tooltip }) {
  const [show, setShow] = useState(false);
  const [options, setoptions] = useState(null);
  const [selectObject, setselectObject] = useState([]);
  const { form, setform, temp, settemp } = useContext(GlobalContext);
  const [index, setindex] = useState(null);
  const [registerFile, setregisterFile] = useState(null);
  const [selectedValue, setselectedValue] = useState(null);

  //   useEffect(() => {
  //     getSchema(template, "token").then((el) => {
  //       setregisterFile(el);
  //       const patern = el.to_string;
  //       if (form[keyValue] !== undefined) {
  //         const options = form[keyValue].map((option) => ({
  //           value: option.firstName + " " + option.lastName,
  //           label: parsePatern(option, patern),
  //           object: option,
  //           objectName: parsePatern(option, patern),
  //         }));
  //         setoptions(options);
  //         setselectedValue(parsePatern(form[keyValue][0], patern));
  //       } else {
  //         setselectedValue("Sélectionnez une valeur de la liste ou saisissez une nouvelle");
  //         return;
  //       }

  //       if (!patern.length) {
  //         return;
  //       }
  //     });
  //   }, [template, form[keyValue]]);

  useEffect(() => {
    let isMounted = true;
    console.log("f");

    const fetchData = async () => {
      try {
        const el = await getSchema(template, "token");
        if (!isMounted) {
          return;
        }

        setregisterFile(el);
        const patern = el.to_string;
        if (form && form[keyValue]) {
          const options = form[keyValue].map((option) => ({
            value: option.firstName + " " + option.lastName,
            label: parsePatern(option, patern),
            object: option,
            objectName: parsePatern(option, patern),
          }));
          setoptions(options);
          setselectedValue(parsePatern(form[keyValue][0], patern));
        } else {
          setselectedValue("Sélectionnez une valeur de la liste ou saisissez une nouvelle");
          return;
        }

        if (!patern.length) {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [template, keyValue, selectedValue]);

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
    const { object, value, objectName } = e;
    console.log(selectedValue);
    setselectedValue(objectName);

    if (patern.length > 0) {
      setselectObject([...selectObject, object]);
      changeValue({ target: { name, value: [object] } });
      //   const newObject = { person: object, role: "from list" };
      //   const arr3 = form[keyValue] ? [newObject] : [newObject];
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
              {selectedValue && (
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

        {/* <div style={{ margin: "20px 90px 20px 20px" }}>
          {list &&
            list.map((el, idx) => (
              <div key={idx} className="row border">
                <div className="col-md-10">
                  <p className="border m-2"> {list[idx]} </p>
                </div>
                <div className="col-md-1">
                  {level === 1 && <i className="fa fa-edit icon-margin-top text-primary" aria-hidden="true" onClick={() => handleEdit(idx)}></i>}
                </div>
                <div className="col-md-1">
                  <i className="fa fa-times icon-margin-top text-danger" aria-hidden="true" onClick={() => handleDeleteListe(idx)}></i>
                </div>
              </div>
            ))}
        </div> */}
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
