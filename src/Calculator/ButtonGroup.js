import React from "react";

const ButtonGroup = ({
  data,
  setNewNumber,
  newNumber,
  operator,
  overallResult,
  addOperator,
  isEditable,
}) => {
  return (
    <div className="btn-section">
      {data.map((ele) => {
        const numberFunction = () => {
          setNewNumber(String(newNumber) + String(ele.value));
        };
        const operatorFunction = () => {
          addOperator(ele.value);
        };
        return (
          <button
            key={ele.id}
            onClick={ele.type === "number" ? numberFunction : operatorFunction}
            className={
              ele.value === operator && overallResult !== "0"
                ? "activate-btn"
                : undefined
            }
            disabled={isEditable}
          >
            {ele.value}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
