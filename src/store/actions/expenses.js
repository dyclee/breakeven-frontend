import { baseUrl } from '../../config';
import { formatDate } from '../../util/helperFunctions';
import { setUser } from '../actions/auth';

export const LOAD_NOTIFICATIONS= 'expenses/LOAD_NOTIFICATIONS';
export const REMOVE_NOTIFICATION = 'expenses/REMOVE_NOTIFICATION';
export const LOAD_EXPENSES = 'expenses/LOAD_EXPENSES';
export const LIST_EXPENSES = 'expenses/LIST_EXPENSES';
export const REMOVE_EXPENSES = 'expenses/REMOVE_EXPENSES';
export const NOTIFY = 'expenses/NOTIFY'

export const removeNotification = (payArray) => ({ type: REMOVE_NOTIFICATION, payArray});
export const loadNotifications = (notifications) => ({ type: LOAD_NOTIFICATIONS, notifications})
export const loadExpenses = expenses => ({ type: LOAD_EXPENSES, expenses });
export const listExpenses = listExpenses => ({ type: LIST_EXPENSES, listExpenses });
export const removeExpenses = () => ({ type: REMOVE_EXPENSES });
export const notify = (userId, expenseId) => ({ type: NOTIFY, userId, expenseId});

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
        // console.log("RES EXPENSES", expenses)
        dispatch(loadExpenses(expenses))

        let listExpensesArr = [];
        const { owedExpenses, createdExpenses, createdUserExpenses } = expenses;
        owedExpenses.forEach((owedExpense) => {
            let obj = {};
            obj.type = "toPay";
            obj.createdBy = owedExpense.Expense.User;
            obj.expenseId = owedExpense.expenseId;
            obj.amount = owedExpense.amount.toFixed(2);
            obj.paidStatus = owedExpense.paidStatus;
            obj.createdAt = owedExpense.Expense.createdAt;
            obj.updatedAt = owedExpense.updatedAt
            obj.header = owedExpense.Expense.header;
            obj.payUser = owedExpense.Expense.createdBy;
            obj.members = owedExpense.Expense.members
            obj.formattedDate = formatDate(new Date(owedExpense.Expense.createdAt))

            listExpensesArr.push(obj);
        })
        createdUserExpenses.forEach((createdExpense) => {
            let obj = {};
            obj.type = "toReceive";
            obj.createdBy = createdExpense.Expense.User;
            obj.expenseId = createdExpense.expenseId;
            obj.amount = createdExpense.amount.toFixed(2);
            obj.reminder = createdExpense.reminder;
            obj.paidStatus = createdExpense.paidStatus;
            obj.createdAt = createdExpense.Expense.createdAt;
            obj.updatedAt = createdExpense.updatedAt;
            obj.header = createdExpense.Expense.header;
            obj.receiveUser = createdExpense.User;
            obj.members = createdExpense.Expense.members;
            obj.formattedDate = formatDate(new Date(createdExpense.Expense.createdAt))

            listExpensesArr.push(obj);
        })
        const sortedExpenses = listExpensesArr.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            // if (new Date(b.createdAt) === new Date(a.createdAt)) {
            //     return new Date b.
            // }
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        dispatch(listExpenses(sortedExpenses))
        return;
    }
    const errorRes = await res.json();
    return errorRes;
}

export const receivedNotifications = (userId) => async dispatch => {
    const res = await fetch(`${baseUrl}/expenses/notifications`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });
    if (res.ok) {
        const { notifications } = await res.json();
        notifications.forEach((one) => {
            one.formattedDate = formatDate(new Date(one.createdAt))
        })
        dispatch(loadNotifications(notifications));
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
    // console.log("RESPONSE", response)
    if (res.ok) {
        // console.log("IS RES OK?")
        dispatch(removeNotification(payArray));
        dispatch(receivedNotifications(userId));
        dispatch(getExpenses(userId))
        dispatch(setUser(response.payer))
        return
    } else {
        // console.log("HITTING THIS?")
        alert("Balance does not contain enough funds to complete payment")
    }
}
export const remindExpense = remindArray => async dispatch => {
    const id = window.localStorage.getItem("userId");
    const userId = Number(remindArray[0]);
    const expenseId = Number(remindArray[1]);

    const res = await fetch(`${baseUrl}/expenses/remind`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, expenseId})
    })
    const response = await res.json();
    // console.log("RESPONSE", response);
    if (res.ok) {
        dispatch(notify(response.remindExpense.userId, response.remindExpense.expenseId));
        dispatch(getExpenses(id))
    }
}

export const removeReminder = payArray => async dispatch => {
    const expenseId = Number(payArray[1]);
    const userId = Number(payArray[2]);

    const res = await fetch(`${baseUrl}/expenses/deleteRemind`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, expenseId})
    })
    const response = await res.json();
    if (res.ok) {
        dispatch(receivedNotifications(userId));
    }
}
