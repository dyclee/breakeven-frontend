import { baseUrl } from '../../config';
import { formatDate } from '../../util/helperFunctions';
import { setUser } from '../actions/auth';

export const LOAD_EXPENSES = 'expenses/LOAD_EXPENSES';
export const LIST_EXPENSES = 'expenses/LIST_EXPENSES';
export const REMOVE_EXPENSES = 'expenses/REMOVE_EXPENSES';

export const loadExpenses = expenses => ({ type: LOAD_EXPENSES, expenses });
export const listExpenses = listExpenses => ({ type: LIST_EXPENSES, listExpenses });
export const removeExpenses = () => ({ type: REMOVE_EXPENSES });

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
        const expense = await res.json();
        dispatch(getExpenses(userId));
        alert(`Expense created`);
        return;
    }
    const errorRes = await res.json();
    alert(`Error: Expense was not created. Please check the input fields`)
    return errorRes;
}

export const getExpenses = (userId) => async dispatch => {
    const res = await fetch(`${baseUrl}/expenses`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    });

    if (res.ok) {
        const expenses = await res.json();
        dispatch(loadExpenses(expenses))

        let listExpensesArr = [];
        const { owedExpenses, createdExpenses } = expenses;
        owedExpenses.forEach((owedExpense) => {
            let obj = {};
            obj.type = "toPay";
            obj.createdBy = owedExpense.Expense.User;
            obj.expenseId = owedExpense.expenseId;
            obj.amount = owedExpense.amount.toFixed(2);
            obj.paidStatus = owedExpense.paidStatus;
            obj.createdAt = owedExpense.Expense.createdAt;
            obj.header = owedExpense.Expense.header;
            obj.payUser = owedExpense.Expense.createdBy;
            obj.members = owedExpense.Expense.members
            obj.formattedDate = formatDate(new Date(owedExpense.Expense.createdAt))

            listExpensesArr.push(obj);
        })
        createdExpenses.forEach((createdExpense) => {
            let obj = {};
            obj.type = "toReceive";
            obj.createdBy = userId;
            obj.expenseId = createdExpense.id;
            obj.amount = createdExpense.totalAmount.toFixed(2);
            obj.paidStatus = createdExpense.paidStatus;
            obj.createdAt = createdExpense.createdAt;
            obj.header = createdExpense.header;
            obj.receiveUser = createdExpense.members;
            obj.members = createdExpense.members;
            obj.formattedDate = formatDate(new Date(createdExpense.createdAt))

            listExpensesArr.push(obj);
        })
        const sortedExpenses = listExpensesArr.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        dispatch(listExpenses(sortedExpenses))
        return;
    }
    const errorRes = await res.json();
    return errorRes;
}

export const payExpense = payArray => async dispatch => {
    const payUser = Number(payArray[0]);
    const expenseId = Number(payArray[1]);
    const userId = Number(payArray[2])
    // console.log("PAY ARRAY", payArray)

    const res = await fetch(`${baseUrl}/expenses/pay`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payUser, expenseId, userId })
    });
    const response = await res.json();
    console.log("RESPONSE", response)
    if (res.ok) {
        dispatch(getExpenses(userId))
        dispatch(setUser(response.payer))
        return
    }
}
