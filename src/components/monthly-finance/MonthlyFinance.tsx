import React from 'react'
import styles from './MonthlyFinance.module.scss';
import AddFinance from './add-finance/AddFinance';
import Summary from './summary/Summary';

type expense = {name: string;amount: string;type: string;}

const MonthlyFinance = () => {
    const [summary, setSummary] = React.useState<expense[]>([]);
    const [total, setTotal] = React.useState(0);
    const financeAdded = (value: expense) => {
        const newSummary = [...summary, value];
        setSummary(newSummary);
        const newTotal = value.type === 'income' ? (total + parseFloat(value.amount)) : (total - parseFloat(value.amount));
        setTotal(newTotal);
    }

  return (
    <div className={styles.Container}>
      <AddFinance onAddFinance={financeAdded}/>
      <div className={styles.Summary}>
        <Summary total={total}/>
      </div>
      
    </div>
  )
}

export default MonthlyFinance
