import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"

const BudgetsContext = React.createContext()

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([])
    const [expenses, setExpenses] = useState([])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(e => e.budgetId === budgetId)
    }
    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }
    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(b => b.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    function deleteBudget({ id }) {
        //TODO: deal with expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(b => b.id !== id)
        })
    }
    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(e => e.id !== id)
        })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        }}>{children}</BudgetsContext.Provider>
    )
}