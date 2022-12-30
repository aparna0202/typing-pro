import "./HistoryPage.css";

const HistoryPage = () => {
  let history = JSON.parse(localStorage.getItem("history"));
  return (
    <div className="HistoryPage">
      <h4>Previous Scores:-</h4>
      <table className="results" cellSpacing={0}>
        <tr>
          <th>Accuracy(%)</th>
          <th>Speed(W/M)</th>
          <th>Correct Letters</th>
          <th>Incorrect Letters</th>
        </tr>

        {history.map((data) => (
          <tr>
            <td>{data.accuracy}</td>
            <td>{data.speed}</td>
            <td>{data.correctLetters}</td>
            <td>{data.incorrectLetters}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default HistoryPage;
