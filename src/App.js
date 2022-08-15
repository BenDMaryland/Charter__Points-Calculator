
import './App.css';
import { transactionMockData, recordParser, fetchTransactionMockRecord } from "./services/transaction.api";
import { useEffect, useState } from 'react';
import RewardsTable from './components/RewardsTable';


function App() {

  const [mockTransactions, setMockTransactions] = useState([])
  const [months, setmonths] = useState([])

  useEffect(() => {
    setMockTransactions(fetchTransactionMockRecord(transactionMockData))
  }, [])


  useEffect(() => {
    if (Array.isArray(transactionMockData)) {
      setMockTransactions(recordParser(transactionMockData))
    }
    setmonths(Object.keys(recordParser(transactionMockData)))
  }, [transactionMockData])

  if (months.length === 0) return <p>Loading</p>

  return (
    <div className="App">
      {months.map((month) => (
        < RewardsTable key={month} mockTransactions={mockTransactions[month]} month={month} />)
      )}
    </div>
  );
}

export default App;
