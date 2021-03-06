import React, { useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocaleStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocaleStorage("budgets", [])
    const [expenses, setExpenses] = useLocaleStorage("expenses", [])

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
        setExpenses(prevExpenses => {
            return prevExpenses.map(e => {
                if (e.budgetId !== id) return e
                return { ...e, budgetId: UNCATEGORIZED_BUDGET_ID }
            })
        })
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