import React, { useState } from "react";

const EditableDisplay = ({
  displayNewNumber,
  newNumber,
  overallResult,
  setEditable,
  isEditable,
  manualInput,
  setmanualInput,
  lastCal,
  setLastCal,
  resetEveryThing,
  holder,
  setPlaceholder,
}) => {
  const textToList = (text, index) => {
    const resultArray = [];
    const allIOperator = ["-", "+", "*", "/"];
    const isNumber = (char) => /[0-9.]/.test(char);
    while (index < text.length && text[index] !== ")") {
      const currentChar = text[index];
      // If Operator
      if (allIOperator.includes(currentChar)) {
        resultArray.push(currentChar);
      } else if (currentChar === "(") {
        const [Newindex, subArray] = textToList(text, index + 1);
        resultArray.push(subArray);
        index = Newindex;
      } else if (isNumber(currentChar)) {
        const startIndex = index;
        let endIndex;
        index++;
        while (index < text.length && isNumber(text[index])) {
          endIndex = index;
          index++;
        }
        if (endIndex)
          resultArray.push(parseInt(text.slice(startIndex, endIndex + 1)));
        else {
          resultArray.push(parseInt(text[startIndex]));
        }
        index--;
      }
      index++;
    }
    return [index, resultArray];
  };

  const calulateFromList = (Arr) => {
    // Edge Case
    if (Arr.length === 1) {
      return Arr;
    }
    const [operatorIndex, func] = getPEMDAS(Arr);
    let left = Arr[operatorIndex - 1];
    let right = Arr[operatorIndex + 1];
    if (Array.isArray(left)) {
      left = calulateFromList(left)[0];
    }
    if (Array.isArray(right)) {
      right = calulateFromList(right)[0];
    }

    const result = func(left, right);
    console.log(result);
    Arr.splice(operatorIndex - 1, 3, result);
    return calulateFromList(Arr);
  };

  const getPEMDAS = (Arr) => {
    const data = [
      {
        operator: "+",
        func: function (one, two) {
          return one + two;
        },
      },
      {
        operator: "-",
        func: function (one, two) {
          return one - two;
        },
      },
      {
        operator: "*",
        func: function (one, two) {
          return one * two;
        },
      },
      {
        operator: "/",
        func: function (one, two) {
          return one / two;
        },
      },
    ];
    let MainIndex;
    if (Arr.includes("*") || Arr.includes("/")) {
      const index1 = Arr.indexOf("*") !== -1 ? Arr.indexOf("*") : Infinity;
      const index2 = Arr.indexOf("/") !== -1 ? Arr.indexOf("/") : Infinity;
      MainIndex = index1 < index2 ? index1 : index2;
    } else if (Arr.includes("+") || Arr.includes("-")) {
      const index1 = Arr.indexOf("+") !== -1 ? Arr.indexOf("+") : Infinity;
      const index2 = Arr.indexOf("-") !== -1 ? Arr.indexOf("-") : Infinity;
      MainIndex = index1 < index2 ? index1 : index2;
    }
    const op = data.filter((ele) => ele.operator === Arr[MainIndex]);
    return [MainIndex, op[0].func];
  };
  const calculateManual = () => {
    setLastCal(manualInput);
    if (/[^0-9^+^*^\/^\s^(^)]/.test(manualInput)) {
      setmanualInput("");
      setPlaceholder(true);
    } else if (manualInput.length === 0) {
      setmanualInput(0);
    } else {
      let textFromInput = manualInput;
      if (Number.isInteger(textFromInput)) {
        textFromInput = String(textFromInput);
      }
      const [_, array] = textToList(textFromInput, 0);
      console.log(array);
      const result = calulateFromList(array);
      setmanualInput(result[0]);
    }
  };
  return (
    <div className="displayBox">
      <div className="Head">
        <div>
          <button
            className="toggle-btn"
            onClick={() => {
              resetEveryThing();
              setEditable(!isEditable);
            }}
          >
            {isEditable
              ? "Go back to calculation mode"
              : "Click to activate manual mode"}
          </button>
        </div>

        {isEditable && (
          <div>
            <span>{lastCal}</span>
          </div>
        )}
      </div>
      {isEditable ? (
        <input
          type="text"
          className="editableBox"
          onChange={(e) => {
            setmanualInput(e.target.value);
            if (holder) {
              setPlaceholder(false);
            }
          }}
          placeholder={
            holder
              ? "Invalid Input : Accept only number and operator"
              : "Example : 1 * ( 2 + 3 ) / 4 and 'Enter' "
          }
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              calculateManual();
            }
          }}
          value={manualInput}
        />
      ) : (
        <h2>{displayNewNumber ? newNumber : overallResult}</h2>
      )}
    </div>
  );
};

export default EditableDisplay;
