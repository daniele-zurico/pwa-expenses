import React from 'react'
import styles from './MonthlyFinance.module.scss';
import AddFinance from './add-finance/AddFinance';
import Summary from './summary/Summary';
import { useExpenses } from '../../common/ExpensesContext';

type expense = {name: string;amount: string;type: string;}

const MonthlyFinance = () => {
    const {expenses, setExpenses, saveExpense} = useExpenses();
    const [total, setTotal] = React.useState(0);
    const financeAdded = (value: expense) => {
        const newSummary = [...expenses, value];
        setExpenses(newSummary);
        saveExpense(value.name, parseFloat(value.amount), value.type);
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
