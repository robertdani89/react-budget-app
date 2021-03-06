import { Button, Container, Stack } from "react-bootstrap"
import AddBudgetModal from "./components/AddBudgetModal"
import AddExpenseModal from "./components/AddExpenseModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import TotalBudgetCard from "./components/TotalBudgetCard"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext"

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState(false)
    const [addExpenseModalId, setAddExpenseModalId] = useState(false)
    const { budgets, getBudgetExpenses } = useBudgets()

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalId(budgetId)
    }

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Budgets</h1>
                    <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                    <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
                </Stack>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start",
                }}
                >
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id).reduce((p, c) => p + c.amount, 0)

                        return <BudgetCard
                            key={budget.id}
                            name={budget.name}
                            amount={amount}
                            max={budget.max}
                            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                            onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}
                        ></BudgetCard>
                    })}
                    <UncategorizedBudgetCard 
                    onAddExpenseClick={() => openAddExpenseModal()} 
                    onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
                    />
                    <TotalBudgetCard />

                </div>
            </Container>
            <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalId}
                handleClose={() => setShowAddExpenseModal(false)} />
            <ViewExpensesModal
                show={viewExpenseModalBudgetId}
                budgetId={viewExpenseModalBudgetId}
                handleClose={() => setViewExpenseModalBudgetId(null)} />
        </>
    )
}

export default App