
import './App.css';
import { transactionMockData, recordParser, fetchTransactionMockRecord } from "./services/transaction.api";
import { useEffect, useState } from 'react';
import RewardsTable from './components/RewardsTable';


function App() {

  const [mockTransactions, setMockTransactions] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [months, setmonths] = useState([])

  useEffect(() => {
    fetchTransactionMockRecord()
      .then(r => {
        setMockTransactions(r)
        setLoaded(true)
      })
  }, [])


  useEffect(() => {
    console.log(mockTransactions, loaded)
    if (loaded) {
      setMockTransactions(recordParser(mockTransactions))
      setmonths(Object.keys(recordParser(mockTransactions)))
    }
  }, [loaded])


  if (!loaded) return <p>Loading</p>
  return (
    <div className="App">
      {months.map((month) => (
        < RewardsTable key={month} mockTransactions={mockTransactions[month]} month={month} />)
      )}
    </div>
  );
}

export default App;
