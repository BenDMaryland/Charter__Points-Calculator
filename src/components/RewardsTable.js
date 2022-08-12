import React, { useState } from 'react'
import './RewardsTable.css';

function RewardsTable({ mockTransactions, month }) {
    const [customers, setcustomers] = useState(Object.keys(mockTransactions))
    const [tableHeaders, setTableHeaders] = useState(Object.keys(mockTransactions[customers[0]].records[0]))

    return (
        <div >
            <h2>{month}</h2>
            <div className='table__month'>
                {customers.map(customer =>
                    <div key={customer} className='table__customer'>
                        <h3>Customer: {customer}</h3>
                        <table >
                            <thead>
                                <tr>
                                    {tableHeaders.map(tableHeader => (<th key={tableHeader}>{tableHeader}</th>))}
                                </tr>
                            </thead>
                            <tbody >
                                {mockTransactions[customer].records.map(transaction => (
                                    <tr key={transaction.transactionId}>
                                        {tableHeaders.map(tableHeader => (<td key={tableHeader}>
                                            {tableHeader === 'createDate' ? Date(transaction[tableHeader]) : transaction[tableHeader]}
                                        </td>))}
                                    </tr>
                                ))
                                }
                                <tr>
                                    <td colSpan="5">total Points:</td>
                                    <td>{mockTransactions[customer].totalPoints}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RewardsTable