import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"

export default function ViewExpensesModal({ show, budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const expenses = getBudgetExpenses(budgetId)
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
        ? { name: "Uncategorised", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id === budgetId)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <Button variant="outline-danger" onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }}>Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="2">
                    {expenses.map(e => (
                        <Stack direction="horizontal" gap="2" key={e.id}>
                            <div className="me-auto fs-4>">{e.description}</div>
                            <div className="fs-5>">{currencyFormatter.format(e.amount)}</div>
                            <Button onClick={() => deleteExpense(e)} size="sm" variant="outline-danger">&times;</Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}
