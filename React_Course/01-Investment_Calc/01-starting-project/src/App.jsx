import Header from "./components/Header";
import Results from "./components/Results";
import UserInput from "./components/UserInput";
import {calculateInvestmentResults} from "./util/investment";
import { useState } from "react";


function App() {
   const [userInput, setUserInput] = useState({
        initialInvestment: 0,
        annualInvestment: 0,
        expectedReturn: 0,
        duration: 0
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserInput(prevState => ({
            ...prevState,
            [name]: +value // dynamically update the state based on input name
        }))
    }
  return (
    <>
      <Header / >
      <UserInput userInput={userInput} handleChange={handleChange} />
      <Results investmentData={calculateInvestmentResults(userInput)} />
    </>
    
  )
}

export default App
