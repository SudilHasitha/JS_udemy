import { useState } from "react";

export default function UserInput({ userInput, handleChange }) {
   
    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input 
                        type="number" 
                        required 
                        name="initialInvestment"
                        onChange={handleChange}
                        value={userInput.initialInvestment}
                        placeholder="Enter your initial investment" 
                    />
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input 
                        type="number" 
                        required 
                        name="annualInvestment"
                        onChange={handleChange}
                        value={userInput.annualInvestment}
                        placeholder="Enter your annual investment" 
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label>Expected Return</label>
                    <input 
                        type="number" 
                        required 
                        name="expectedReturn"
                        onChange={handleChange}
                        value={userInput.expectedReturn}
                        placeholder="Enter your expected return" 
                    />
                </p>
                <p>
                    <label>Duration</label>
                    <input 
                        type="number" 
                        required 
                        name="duration"
                        onChange={handleChange}
                        value={userInput.duration}
                        placeholder="Enter the duration of the investment" 
                    />
                </p>
            </div>
        </section>
    );
}