import React from "react";
import { readDocument } from "./data";
type expense = {name: string;amount: string;type: string;}

const ExpensesContext = React.createContext<any>([]);
const useExpenses = () => {
    // lets you read the context and subscribe to its changes
    const context = React.useContext(ExpensesContext);
    if (!context) {
      throw new Error(`useExpenses must be used within a ExpensesProvider`)
    }
    const [expenses, setExpenses] = context; 
    //reading from PouchDB - async data
    const loadExpenses = async () => {
        const res: any = await readDocument('expenses');
        return setExpenses(res.expenses);
    }
    return {
        expenses, setExpenses, loadExpenses
    };      
}

const ExpensesProvider = (props: React.Props<any>) => {
    const [expenses, setExpenses] = React.useState<expense[]>([]);
    const value = React.useMemo(() => [expenses, setExpenses], [expenses]);
    return <ExpensesContext.Provider value={value} {...props}/>  
}

export {ExpensesProvider, useExpenses};