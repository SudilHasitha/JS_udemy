import logo from '../assets/investment-calculator-logo.png';

export default function Header() {
    return (
        <header id="header">
        <img src={logo} alt="Company Logo" className="logo" />
        <h1 className="title">Investment Calculator</h1>
        </header>
    );
    }
