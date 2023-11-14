import "./styles.css";
import styled from "styled-components";
import React, { useState } from "react";
import { create, all } from "mathjs";

export default function App() {
    const math = create(all);
    const WrapperCalculadora = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  `;

    const Display = styled.input`
    text-align: right;
    font-size: 24px;
    padding: 10px;
  `;

    const ClearGrid = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
  `;

    const ButtonClear = styled.button`
    flex: 1;
    font-size: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 5px; // Adiciona espaço entre os botões
    }
  `;

    const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  `;

    const Button = styled.button`
    font-size: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
  `;

    const [displayValue, setDisplayValue] = useState("0");
    const [expression, setExpression] = useState("");

    const handleNumberClick = (number) => {
        if (displayValue === "0" || displayValue === "Error") {
            setDisplayValue(number);
        } else {
            setDisplayValue(displayValue + number);
        }
    };

    const handleOperatorClick = (operator) => {
        setExpression(expression + displayValue + operator);
        setDisplayValue("0");
    };

    const handleEqualsClick = () => {
        try {
            const resultado = math.evaluate(expression + displayValue);
            setDisplayValue(resultado.toString());
            setExpression("");
        } catch (error) {
            setDisplayValue("Error");
            console.log(Error);
            setExpression("");
        }
    };

    const handleBackspaceClick = () => {
        setDisplayValue(displayValue.slice(0, -1) || "0");
    };

    const handleClearClick = () => {
        setDisplayValue("0");
        setExpression("");
    };

    return (
        <div className="App">
            <WrapperCalculadora>
                <Display type="text" value={displayValue} readOnly />
                <ClearGrid>
                    <ButtonClear onClick={handleBackspaceClick}>backspace</ButtonClear>
                    <ButtonClear onClick={handleClearClick}>C</ButtonClear>
                </ClearGrid>
                <ButtonGrid>
                    <Button onClick={() => handleNumberClick("7")}>7</Button>
                    <Button onClick={() => handleNumberClick("8")}>8</Button>
                    <Button onClick={() => handleNumberClick("9")}>9</Button>
                    <Button onClick={() => handleOperatorClick("/")}>/</Button>
                    <Button onClick={() => handleNumberClick("4")}>4</Button>
                    <Button onClick={() => handleNumberClick("5")}>5</Button>
                    <Button onClick={() => handleNumberClick("6")}>6</Button>
                    <Button onClick={() => handleOperatorClick("*")}>*</Button>
                    <Button onClick={() => handleNumberClick("1")}>1</Button>
                    <Button onClick={() => handleNumberClick("2")}>2</Button>
                    <Button onClick={() => handleNumberClick("3")}>3</Button>
                    <Button onClick={() => handleOperatorClick("-")}>-</Button>
                    <Button onClick={() => handleNumberClick("0")}>0</Button>
                    <Button onClick={() => handleNumberClick(".")}>.</Button>
                    <Button onClick={handleEqualsClick}>=</Button>
                    <Button onClick={() => handleOperatorClick("+")}>+</Button>
                </ButtonGrid>
            </WrapperCalculadora>
        </div>
    );
}
