import React, { useState, useEffect } from "react";
import ButtonDiv from "./ButtonGroup";
import EditableDisplay from "./EditableDisplay";
import { data } from "./data.js";
import "./calculate.css";

const MainCalulator = () => {
  const [newNumber, setNewNumber] = useState("0");
  const [displayNewNumber, setDisplayNewNumber] = useState(false);
  const [operator, setOperator] = useState("");
  const [overallResult, setOverallResult] = useState("0");
  const [manualInput, setmanualInput] = useState("");
  const [isEditable, setEditable] = useState(false);
  const [lastCal, setLastCal] = useState("0");
  const [isErrorHolder, setPlaceholder] = useState(false);

  useEffect(() => {
    if (!displayNewNumber && newNumber.length > 1) {
      console.log("Show current val");
      setDisplayNewNumber(true);
    }
    if (newNumber.length > 1 && newNumber[0] === "0") {
      setNewNumber(newNumber.slice(1));
    }
  }, [newNumber]);
  const resetEveryThing = () => {
    setOverallResult("0");
    setNewNumber("0");
    setOperator("");
    setLastCal("0");
    setmanualInput("");
    setPlaceholder(false);
  };

  const addOperator = (newOperator) => {
    if (newOperator === "C") {
      resetEveryThing();
      return;
    }
    if (newOperator === "=") {
      // If new operator is =
      if (operator.length === 0) {
        setOverallResult(newNumber);
      } else {
        calculatePrevious(newOperator);
      }
      setOperator("");
      // If new operator is not =
    } else {
      if (operator.length === 0) {
        setOverallResult(newNumber);
      } else if (newNumber !== "0") {
        calculatePrevious();
      }

      setNewNumber("0");
      console.log("Display total");
      setDisplayNewNumber(false);
      setOperator(newOperator);
    }
  };

  const calculatePrevious = () => {
    if (overallResult !== "0" && newNumber !== "0") {
      let result;
      switch (operator) {
        case "+":
          result = parseInt(overallResult) + parseInt(newNumber);
          break;
        case "-":
          result = parseInt(overallResult) - parseInt(newNumber);
          break;
        case "*":
          result = parseInt(overallResult) * parseInt(newNumber);
          break;
        case "/":
          result = parseInt(overallResult) / parseInt(newNumber);
          break;
      }
      setOverallResult(result);
      setNewNumber(result);
    }
  };

  return (
    <main>
      <EditableDisplay
        displayNewNumber={displayNewNumber}
        newNumber={newNumber}
        overallResult={overallResult}
        setEditable={setEditable}
        isEditable={isEditable}
        manualInput={manualInput}
        setmanualInput={setmanualInput}
        lastCal={lastCal}
        setLastCal={setLastCal}
        resetEveryThing={resetEveryThing}
        holder={isErrorHolder}
        setPlaceholder={setPlaceholder}
      />
      <ButtonDiv
        data={data}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        operator={operator}
        overallResult={overallResult}
        addOperator={addOperator}
        isEditable={isEditable}
      />
    </main>
  );
};

export default MainCalulator;
