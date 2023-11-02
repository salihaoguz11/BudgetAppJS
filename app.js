const budgetFeedback = document.querySelector(".budget-feedback");
const expenseFeedback = document.querySelector(".expense-feedback");
const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const budgetAmount = document.getElementById("budget-amount");
const expenseAmount = document.getElementById("expense-amount");
const balance = document.getElementById("balance");
const balanceAmount = document.getElementById("balance-amount");
const expenseForm = document.getElementById("expense-form");
const expenseInput = document.getElementById("expense-input");
const amountInput = document.getElementById("amount-input");
const expenseList = document.getElementById("expense-list");

let itemID = 0;
let itemList = [];

budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBudgetForm();
});
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBudgetForm();
});

function submitBudgetForm() {
  const value = budgetInput.value;
  if (value === "" || value < 0) {
    budgetFeedback.classList.add("showItem");
    budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;

    setTimeout(function () {
      budgetFeedback.classList.remove("showItem");
    }, 2000);
  } else {
    budgetAmount.textContent = value;
    budgetInput.value = 0;
    showBalance();
  }
}

function submitExpenseForm() {
  const expenseValue = expenseInput.value;
  const amountValue = amountInput.value;
  if (expenseValue === "" || amountValue === 0 || amountValue < 0) {
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
    setTimeout(() => {
      expenseFeedback.classList.remove("showItem");
    }, 3000);
  } else {
    let amount = parseInt(amountValue);
    expenseInput.value = "";
    // expenseValue = "";
    amountInput.value = "";

    //todo new element as an expense

    let expense = {
      id: itemID,
      title: expenseValue,
      amount: amount,
    };
  }
}
