import { baseUrl } from '../../config';

export const LOAD_EXPENSES = 'expenses/LOAD_EXPENSES';

export const loadExpenses = userId => ({ type: LOAD_EXPENSES, userId })

export const createExpense = ({
    members,
    totalAmount,
    userId,
    header,
    requirements,
    categoryId
}) => async dispatch => {
    const res = await fetch(`${baseUrl}/expenses`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members, totalAmount, userId, header, requirements, categoryId }),
    });

    if (res.ok) {
        const expenses = await res.json();
        console.log(expenses);
        return;
    }
    const errorRes = await res.json();
    console.log(errorRes);
}
