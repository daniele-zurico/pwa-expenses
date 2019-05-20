import React from "react";
import { readDocument, saveDocument } from "./data";
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

    const saveExpense = async (name: string, amount: number, type: string) => {
        const res = await saveDocument({
            _id: 'expenses',
            expenses: [{
                id: new Date().getTime() + '',
                name,
                amount,
                type
            }]
        });
        return res;
    }
    return {
        expenses, setExpenses, loadExpenses, saveExpense
    };      
}

const ExpensesProvider = (props: React.Props<any>) => {
    const [expenses, setExpenses] = React.useState<expense[]>([]);
    const value = React.useMemo(() => [expenses, setExpenses], [expenses]);
    return <ExpensesContext.Provider value={value} {...props}/>  
}

export {ExpensesProvider, useExpenses};