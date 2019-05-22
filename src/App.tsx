import React from 'react'
import styles from './App.module.scss'
import Navigation from './components/navigation/Navigation'
import MonthlyFinance from './components/monthly-finance/MonthlyFinance'
import {ExpensesProvider} from './common/ExpensesContext'
import {initialiseDb} from './common/data'
import OfflinePopOver from './components/offlinePopOver/OfflinePopOver'
const App: React.FC = () => {
  initialiseDb()
  return (
    <div className={styles.App}>
      <OfflinePopOver />
      <div className={styles.Container}>
        <Navigation />
        <ExpensesProvider>
          <MonthlyFinance />
        </ExpensesProvider>
      </div>
    </div>
  )
}
export default App
