import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgets } from "../contexts/BudgetsContext"

export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((p, c) => p + c.amount, 0)
    const max = budgets.reduce((p, c) => p + c.max, 0)

    if (max === 0) return null

    return (
        <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />
    )
}
