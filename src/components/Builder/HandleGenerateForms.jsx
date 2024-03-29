import React from "react";
import TextArea from "../Forms/TextArea";
import InputText from "../Forms/InputText";
import InputTextDynamicaly from "../Forms/InputTextDynamicaly";
import ModalTemplate from "../Forms/ModalTemplate";
import SelectContributor from "../Forms/SelectContributor";
import SelectMultipleList from "../Forms/SelectMultipleList";
import SelectSingleList from "../Forms/SelectSingleList";
import SelectWithCreate from "../Forms/SelectWithCreate";
import listContributor from "../../data/contributor.json";
import TinyArea from "../Forms/TinyArea";
import SelectInvestigator from "../Forms/SelectInvestigator";

function HandleGenerateForms({ shemaObject, level, lng, changeValue }) {
  const objectProp = shemaObject.properties;
  let data = [];
  // si type shema is an object
  //retun est code html
  if (shemaObject.type === "object") {
    for (const [key, value] of Object.entries(objectProp)) {
      const label = lng === "fr" ? value["form_label@fr_FR"] : value["form_label@en_GB"];
      const tooltip = lng === "fr" ? value["tooltip@fr_FR"] : value["tooltip@en_GB"];
      const isConst = value.hasOwnProperty("const@fr_FR") ? (lng === "fr" ? value["const@fr_FR"] : value["const@en_GB"]) : false;

      // condition 1
      if (value.type === "string" || value.type === "number") {
        // Condition 1.1
        // si inputType === textarea

        if (value.inputType === "textarea") {
          data.push(<TinyArea level={level} key={key} label={label} name={key} changeValue={changeValue} tooltip={tooltip}></TinyArea>);
          //sethtmlGenerator(data);
        }
        // Condition 1.2
        // si inputType === dropdown
        if (value.inputType === "dropdown" && value.hasOwnProperty("registry_name")) {
          data.push(
            <SelectSingleList
              label={label}
              name={key}
              key={key}
              registry={value.registry_name}
              changeValue={changeValue}
              tooltip={tooltip}
              level={level}
            ></SelectSingleList>
          );
        }
        // Condition 1.3
        // si on pas inputType propriete

        if (!value.hasOwnProperty("inputType")) {
          data.push(
            <InputText
              key={key}
              label={label}
              type={value.format ? value.format : value.type}
              placeholder={""}
              isSmall={false}
              smallText={""}
              name={key}
              changeValue={changeValue}
              hidden={value.hidden ? true : false}
              tooltip={tooltip}
              isConst={isConst}
            ></InputText>
          );
        }
      }
      // condition 2
      if (value.type === "array") {
        // condition 2.1
        // si inputType === dropdown et on n'a pas de registry_name
        if (value.inputType === "dropdown" && value.hasOwnProperty("registry_name")) {
          if (value.items.template_name) {
            data.push(
              <SelectWithCreate
                label={label}
                name={key}
                key={key}
                registry={value.registry_name}
                changeValue={changeValue}
                template={value.items.template_name}
                level={level}
                keyValue={key}
                header={value["table_header@fr_FR"]}
              ></SelectWithCreate>
            );
          } else {
            data.push(
              <SelectMultipleList
                label={label}
                name={key}
                key={key}
                registry={value.registry_name}
                changeValue={changeValue}
                tooltip={tooltip}
                level={level}
              ></SelectMultipleList>
            );
          }
        } else {
          // si on a type === array et items.type === object
          if (value.items.type === "object") {
            if (key === "contributor" && value.items.class === "Contributor") {
              data.push(
                <SelectContributor
                  label={label}
                  name={key}
                  key={key}
                  arrayList={listContributor}
                  changeValue={changeValue}
                  registry={value.items.template_name}
                  keyValue={key}
                  level={level}
                  tooltip={tooltip}
                  header={value["table_header@fr_FR"]}
                ></SelectContributor>
              );
            } else {
              data.push(
                <ModalTemplate
                  key={key}
                  tooltip={tooltip}
                  value={value}
                  template={value.items.template_name}
                  keyValue={key}
                  level={level}
                  header={value["table_header@fr_FR"]}
                ></ModalTemplate>
              );
            }
          }
          if (value.items.type === "string") {
            data.push(<InputTextDynamicaly key={key} label={label} name={key} tooltip={tooltip}></InputTextDynamicaly>);
          }
        }
      }
      // condition 3
      if (value.type === "object") {
        // condition 3.1
        if (value.hasOwnProperty("template_name")) {
          //console.log(" Sous fragment unique (sous formulaire)");
          if (value.inputType === "pickOrCreate") {
            data.push(
              <ModalTemplate
                key={key}
                tooltip={tooltip}
                value={value}
                lng={lng}
                template={value.template_name}
                keyValue={key}
                level={level}
              ></ModalTemplate>
            );
          }

          if (value.class === "Contributor") {
            //console.log("TODO : condition funder à voir");
            data.push(
              <SelectInvestigator
                label={label}
                name={key}
                key={key}
                arrayList={listContributor}
                changeValue={changeValue}
                registry={value.template_name}
                keyValue={key}
                level={level}
                tooltip={tooltip}
              ></SelectInvestigator>
            );
          }
        }
        // codition 3.2
        if (value.inputType === "dropdown") {
          if (value.hasOwnProperty("registry_name")) {
            data.push(
              <SelectSingleList
                registry={value.registry_name}
                label={label}
                name={key}
                changeValue={changeValue}
                tooltip={tooltip}
                level={level}
              ></SelectSingleList>
            );
          }
        }
      }
    }
  }
  return data;
}

export default HandleGenerateForms;
