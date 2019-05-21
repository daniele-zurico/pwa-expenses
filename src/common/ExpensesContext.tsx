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
    // load expenses from the local db
    const loadExpenses = async () => {
        const res: any = await readDocument('expenses');
        return setExpenses(res.expenses);
    }
    // save the expense to the local db
    const saveExpense = async (name: string, amount: number, type: string) => {
        const newExpense = {
            id: new Date().getTime() + '',
            name,
            amount,
            type
        };
        return await readDocument('expenses').then((doc:any) => {
            return saveDocument({
                _id: 'expenses',
                _rev: doc._rev,
                expenses: [...doc.expenses, newExpense]
            }).then(()=> setExpenses(() => [...expenses, newExpense]));
        }).catch((err) => {
            // document do not exist so I create a new one
            if(err.status === 404) {
                return saveDocument({
                    _id: 'expenses',
                    expenses: [newExpense]
                }).then(() => setExpenses(() => [...expenses, newExpense]));
            } else {
                return err;
            }
        });
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