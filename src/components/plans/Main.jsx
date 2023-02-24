import React, { useState } from "react";
import Banner from "../Shared/Banner";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

function Main() {
  const [firstStep, setfirstStep] = useState(true);
  const [secondStep, setsecondStep] = useState(false);

  const handleNextStep = () => {
    setfirstStep(!firstStep);
    setsecondStep(!secondStep);
  };

  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <div className="main">
        <div className="card-articles">
          {firstStep && <FirstStep handleNextStep={handleNextStep}></FirstStep>}
          {secondStep && <SecondStep handleNextStep={handleNextStep}></SecondStep>}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Main;
