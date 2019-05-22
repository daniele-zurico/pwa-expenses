import React from 'react'
import styles from './Summary.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faCaretUp,
  faPlusCircle,
  faMinusCircle,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'
import {useExpenses} from '../../../common/ExpensesContext'

type expense = {name: string; amount: string; type: string}
const Summary: React.FC = () => {
  const {expenses, loadExpenses} = useExpenses()
  React.useEffect(() => {
    loadExpenses()
  }, [])

  const calculateTotal = (expenses: any) => {
    let result = 0
    expenses.forEach((value: expense) => {
      result =
        value.type === 'income'
          ? result + parseFloat(value.amount)
          : result - parseFloat(value.amount)
    })
    return result
  }

  const buildRow = expenses.map((value: expense, index: number) => {
    return (
      <tr key={index}>
        <td>{value.name}</td>
        <td>{value.amount}</td>
        <td>
          <FontAwesomeIcon
            icon={value.type === 'income' ? faCaretUp : faCaretDown}
            size="sm"
            className={styles.IconIncomeOutcome}
            style={{color: value.type === 'income' ? '#2196F3' : 'red'}}
          />
        </td>
        <td>
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="sm"
            className={styles.IconPlus}
          />
          <FontAwesomeIcon
            icon={faMinusCircle}
            size="sm"
            className={styles.IconMinus}
          />
        </td>
      </tr>
    )
  })

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Income/Outcome</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {buildRow}
        <tr>
          <td colSpan={4} className={styles.Total}>
            <span>Total:</span>
            <span className={styles.Amount}>
              <FontAwesomeIcon
                icon={faPlus}
                size="sm"
                className={styles.IconTotal}
              />
              {calculateTotal(expenses)} £
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Summary
