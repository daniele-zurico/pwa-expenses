import React from 'react'
import styles from './AddFinance.module.scss';

type AddFinanceProps = {onAddFinance: (evt: {name:string, amount:string, type:string}) => void};

const AddFinance: React.FC<AddFinanceProps> = ({onAddFinance}) => {
    
    const [name, setName] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [type, setType] = React.useState<string>("income");
  
    return (
        <form 
            className={styles.Form} 
            onSubmit={ (evt) => { evt.preventDefault(); onAddFinance({name, amount, type})} }>
            <div>
                <label>Name:</label>
                <input 
                    placeholder="Name" 
                    value={name} 
                    onChange={(evt) => setName(evt.target.value)}
                />
                <label>Amount:</label>
                <input 
                    placeholder="Amount" 
                    type="number" 
                    value={amount} 
                    onChange={(evt) => setAmount(evt.target.value)}
                />
                <select onChange={(evt: React.FormEvent<HTMLSelectElement>) => setType(evt.currentTarget.value)}>
                    <option value="income">Income</option>
                    <option value="outcome">Outcome</option>
                </select>
                <button type="submit">ADD</button>
            </div>
        </form>
    )
}

export default AddFinance;
