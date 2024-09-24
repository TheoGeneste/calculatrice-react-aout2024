import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBarComponent from './Components/NavBarComponent';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function App() {
  // const [count, setCount] = useState(0);
  // camelCase
  const [total, setTotal] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);

  const handleChange = (charToAdd) => {
    if (operator == null) {
      if (firstNumber == null) {
        setFirstNumber(charToAdd);
        setTotal(charToAdd);
      } else {
        // Vérifie que mon charactere à ajouter est un point 
        if (charToAdd == ".") {
          // Vérifie que mon firstNumber ne contiens pas de point 
          if (!firstNumber.toString().includes(".")) {
            setFirstNumber(firstNumber + '' + charToAdd);
            setTotal(total + ''+ charToAdd);
          }
        }
        // Je fait mon setNumber si mon charactere n'est pas un point 
        else{
          setFirstNumber(firstNumber + '' + charToAdd);
          setTotal(total + ''+ charToAdd);
        }
      }
    } else {
      if (secondNumber == null) {
        setSecondNumber(charToAdd);
        setTotal(total + ''+ charToAdd);
      } else {
        if (charToAdd == ".") {
          // Vérifie que mon firstNumber ne contiens pas de point 
          if (!secondNumber.toString().includes(".")) {
            setSecondNumber(secondNumber + '' + charToAdd);
            setTotal(total + ''+ charToAdd);
          }
        }
        // Je fait mon setNumber si mon charactere n'est pas un point 
        else{
          setSecondNumber(secondNumber + '' + charToAdd);
          setTotal(total + ''+ charToAdd);
        }
      }
    }
  }

  const calculate = () => { 
    switch (operator) {
      case "+":
        setTotal(parseFloat(firstNumber) + parseFloat(secondNumber));
        setFirstNumber(parseFloat(firstNumber) + parseFloat(secondNumber));
        setSecondNumber(null);
        setOperator(null);
        break;
      case "-": 
        setTotal(parseFloat(firstNumber) - parseFloat(secondNumber));
        setFirstNumber(parseFloat(firstNumber) - parseFloat(secondNumber));
        setSecondNumber(null);
        setOperator(null);
        break;
      case "*": 
        setTotal(parseFloat(firstNumber) * parseFloat(secondNumber));
        setFirstNumber(parseFloat(firstNumber) * parseFloat(secondNumber));
        setSecondNumber(null);
        setOperator(null);
        break;
      case "/": 
        if(secondNumber != "0"){
          setTotal(parseFloat(firstNumber) / parseFloat(secondNumber));
          setFirstNumber(parseFloat(firstNumber) / parseFloat(secondNumber));
          setSecondNumber(null);
          setOperator(null);
        }else{
          setTotal("Erreur");
        }
        break;
      case "%": 
        if(secondNumber != "0"){
          setTotal(parseFloat(firstNumber) % parseFloat(secondNumber));
          setFirstNumber(parseFloat(firstNumber) / parseFloat(secondNumber));
          setSecondNumber(null);
          setOperator(null);
        }else{
          setTotal("Erreur");
        }
        break;
      default:
        console.log("Calcule impossible");
        break;
    }
  }

  const checkIfOperatorIsInTotal = (charactere) => {
    if (!total.toString().includes('%') && !total.toString().includes('/') 
      && !total.toString().includes('*') 
      && !total.toString().includes('-') && !total.toString().includes("+")) {
      setTotal(total + charactere);
    }
  }

  // Debut de function reset
  const reset = () => {
    setFirstNumber(null);
    setOperator(null);
    setSecondNumber(null);
    setTotal("0");
  }
  // Fin de function reset

  const deleteChar = () => {
    if (secondNumber != null) {
      setSecondNumber(secondNumber.toString().slice(0, -1));
    }else if (operator != null) {
      setOperator(null);
    }else if (firstNumber != null){
      setFirstNumber(firstNumber.toString().slice(0, -1));
    }
    setTotal(total.toString().slice(0, -1)); 
  }


  return <>
    <NavBarComponent />
    {/* <h1>Application</h1>
    <p>compteur : {count}</p>
    <button className='red' onClick={() => {setCount(count + 1)}}>Increment</button>
    {count > 0 &&  <button onClick={() => {setCount(count - 1)}}>Decrement</button>}
    <ButtonComponent classN='red' functionToDo={() => {setCount(0)}}  textToDisplay='Reset'/>
    <ButtonComponent functionToDo={() => {setCount(count +10)}}  textToDisplay='+ 10'/> */}
    <div className='d-flex flex-column align-items-center mt-2 gap-2'>
      <div className='col-3'>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Total</InputGroup.Text>
          <Form.Control
            placeholder="Total"
            aria-label="Total"
            aria-describedby="basic-addon1"
            disabled
            value={total}
          />
        </InputGroup>
      </div>
      <div className='col-3 d-flex justify-content-between flex-wrap'>
        <Button variant="danger" className="col-6" onClick={reset}>AC</Button>
        <Button variant="primary" className="col-3" onClick={() => { setOperator('%'); checkIfOperatorIsInTotal("%") }}>%</Button>
        <Button variant="primary" className="col-3" onClick={() => { setOperator('/'); checkIfOperatorIsInTotal("/") }}>/</Button>
      </div>
      <div className='col-3 d-flex justify-content-between flex-wrap'>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(7) }}>7</Button>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(8) }}>8</Button>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(9) }}>9</Button>
        <Button variant="primary" className="col-3" onClick={() => { setOperator('*'); checkIfOperatorIsInTotal("*") }}>*</Button>
      </div>
      <div className='col-3 d-flex justify-content-between flex-wrap'>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(4) }}>4</Button>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(5) }}>5</Button>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(6) }}>6</Button>
        <Button variant="primary" className="col-3" onClick={() => { setOperator('-'); checkIfOperatorIsInTotal("-") }}>-</Button>
      </div>
      <div className='col-3 d-flex justify-content-between flex-wrap'>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(1) }}>1</Button>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(2) }}>2</Button>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(3) }}>3</Button>
        <Button variant="primary" className="col-3" onClick={() => { setOperator('+'); checkIfOperatorIsInTotal("+") }}>+</Button>
      </div>
      <div className='col-3 d-flex justify-content-between flex-wrap'>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange(0) }}>0</Button>
        <Button variant="secondary" className="col-3" onClick={() => { handleChange('.') }}>.</Button>
        <Button variant="danger" className="col-3" onClick={deleteChar}>delete</Button>
        <Button variant="success" className="col-3" onClick={calculate}>=</Button>
      </div>
    </div>
  </>;
}

export default App;
