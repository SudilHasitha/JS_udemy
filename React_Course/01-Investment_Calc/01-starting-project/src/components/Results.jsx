import { formatter } from '../util/investment';
export default function Results({ investmentData }) {
    console.log(investmentData); // Debugging line to check the data being passed
  return (
    <section id="results">
      <h2>Investment Results</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Interest Earned</th>
            <th>Value at End of Year</th>
            <th>Annual Investment</th>
          </tr>
        </thead>
        <tbody>
          {investmentData.map((data) => (
            <tr key={data.year}>
              <td>{data.year}</td>
              <td>{formatter.format(data.interest)}</td>
              <td>{formatter.format(data.valueEndOfYear)}</td>
              <td>{formatter.format(data.annualInvestment)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}