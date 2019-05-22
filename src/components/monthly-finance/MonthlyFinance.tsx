import React from 'react'
import styles from './MonthlyFinance.module.scss';
import AddFinance from './add-finance/AddFinance';
import Summary from './summary/Summary';
import { useExpenses } from '../../common/ExpensesContext';

type expense = {name: string;amount: string;type: string;}

const MonthlyFinance = () => {
    const {saveExpense} = useExpenses();
    const financeAdded = (value: expense) => {
        saveExpense(value.name, parseFloat(value.amount), value.type);  
    }

  return (
    <div className={styles.Container}>
      <div className={styles.AddFinanceBox}>
        <AddFinance onAddFinance={financeAdded}/>
      </div>
      <div className={styles.Summary}>
        <Summary/>
      </div>
    </div>
  )
}

export default MonthlyFinance
