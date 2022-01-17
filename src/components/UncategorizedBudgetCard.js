import React from 'react'
import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((p, c) => p + c.amount, 0)

    if (amount === 0) return null

    return (
        <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
    )
}
