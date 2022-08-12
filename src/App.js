
import './App.css';
import { transactionMockData, recordParser, calculatePoints } from "./services/transaction.api";
import { useEffect, useState } from 'react';
import RewardsTable from './components/RewardsTable';


function App() {

  const [mockTransactions, setMockTransactions] = useState(recordParser(transactionMockData))
  const [months, setmonths] = useState([])

  useEffect(() => {
    setmonths(Object.keys(mockTransactions))
  }, [mockTransactions])


  console.log("transactionMockData", transactionMockData);
  console.log("afterParser", recordParser(transactionMockData));


  return (
    <div className="App">
      {months.map((month) => (
        < RewardsTable key={month} mockTransactions={mockTransactions[month]} month={month} />)

      )}
    </div>
  );
}

export default App;
