import { useEffect, useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseItem from "./components/ExpenseItem"
import axios from "axios"

const App = () => {

  const [expenses, setExpenses] = useState([
    { id: 1, title: "Food", amount: 50 },
    { id: 2, title: "Movie", amount: 2000 },
    { id: 3, title: "Rent", amount: -1000 }
  ])

  useEffect(() => {
    axios.get('https://expensestracker-ez5g.onrender.com')
      .then(res => {
        console.log(res.data)
        setExpenses(res.data)
  })
  .catch(err => console.log(err))
},[])

  const addExpense = (title, amount) => {
    const nextId = expenses[expenses.length - 1].id + 1
    setExpenses([...expenses, {id: nextId, title: title, amount: amount }])
  }
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id))
  }

  /*another method using filter and reduce
  const income = expenses
    .filter((expense) => expense.amount > 0)
    .reduce((total, expense) => total + expense.amount, 0);

  const expense = expenses
    .filter((expense) => expense.amount < 0)
    .reduce((total, expense) => total + expense.amount, 0);

  const balance = income + expense;*/

  let income=0, expense=0
  expenses.forEach((exp) => {
    if(exp.amount > 0){
      income += exp.amount
    }else{
      expense += exp.amount
    }
  })

  return(
    <>
    <div className="container">
        <h1>Expense Tracker</h1>
    </div>    
    <div className="app-header">
      <div className="balance">Balance: {income + expense}</div>
      <div className="income-expense-container">
        <div className="income">
          <span className="title">Income</span>
          <span>{income}</span>
        </div>
        <div className="block"></div>
        <div className="expense">
          <span className="title">Expense</span>  
          <span>{expense}</span>
        </div>
      </div>
      </div>
      <ExpenseForm addExpense = {addExpense}/>
    
    {expenses.map((expense) => (
     <ExpenseItem
    key={expense.id}
    id={expense.id}
    title={expense.title}
    amount={expense.amount}
    deleteExpense={() => deleteExpense(expense.id)}
  />
))}

    
    </>
  )
}

export default App

