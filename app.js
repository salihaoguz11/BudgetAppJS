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

// budgetForm submit
budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBudgetForm();
});
// expenseForm submit
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitExpenseForm();
});

//event listener has been added to parent element (expenseList)to control whole element
expenseList.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("edit-icon")) {
    editExpense(e.target.parentElement);
    expenseInput.focus();
    showBalance();
  } else if (e.target.parentElement.classList.contains("delete-icon")) {
    removeExpense(e.target.parentElement);
    showBalance();
  }
});
// This function handles the submission of the budget form.
function submitBudgetForm() {
  // It checks if the input value is empty or negative.If it is, it displays an error message.
  const value = budgetInput.value;
  if (value === "" || value < 0) {
    budgetFeedback.classList.add("showItem");
    budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;

    setTimeout(function () {
      budgetFeedback.classList.remove("showItem");
    }, 2000);
  } else {
    //If the input value is valid, it updates the budget amount on the page, resets the input field
    budgetAmount.textContent = value;
    budgetInput.value = 0;
    // and calls the showBalance function to update the balance.
    showBalance();
  }
}
// The showBalance function calculates and displays the balance by subtracting the total expenses
// from the budget amount. It then updates the balanceAmount element in the UI.
// This function ensures the visual representation of the budget's health based on the balance.
function showBalance() {
  let expense = totalExpense();
  let total = parseInt(budgetAmount.innerText) - expense;
  balanceAmount.textContent = total;
  if (total < 0) {
    // If the total balance is negative, it adds the "showRed" class to indicate a deficit.

    balanceAmount.classList.remove("showGreen", "showBlack");
    balanceAmount.classList.add("showRed");
  } else if (total > 0) {
    // If the balance is positive, it adds the "showGreen" class to indicate a surplus.
    balanceAmount.classList.remove("showRed", "showBlack");
    balanceAmount.classList.add("showGreen");
  } else if (total == 0) {
    // If the balance is exactly zero, it adds the "showBlack" class to indicate a balanced budget.
    balanceAmount.classList.remove("showRed", "showGreen");
    balanceAmount.classList.add("showBlack");
  }
}

// The submitExpenseForm function handles the submission of expense forms.

function submitExpenseForm() {
  // It retrieves the expense title and amount from the input fields.
  const expenseValue = expenseInput.value;
  const amountValue = amountInput.value;
  if (expenseValue === "" || amountValue === "" || amountValue < 0) {
    // If the input fields are empty or if the amount is negative, it displays an error message
    // and removes it after 3 seconds.
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
    setTimeout(() => {
      expenseFeedback.classList.remove("showItem");
    }, 3000);
  } else {
    // If the input values are valid, it creates an 'expense' object with the provided values.
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
    itemID++;
    // The 'expense' object is added to the 'itemList' array, and the UI is updated by
    // calling the 'addExpense' function to display the new expense.
    //itemList.push(expense)
    itemList = [expense, ...itemList];
    addExpense(expense);
    showBalance();
  }
}

// The addExpense function creates a new DOM element to represent an expense entry.
// It takes an 'expense' object as a parameter and uses its properties to populate
// the content of the created element.

function addExpense(expense) {
  // The function creates a <div> element with the class "expense" and sets its innerHTML
  // to generate the structure for displaying the expense title, amount, and icons for
  // editing and deleting. The data-id attribute is set for identifying the expense.
  const expenseDiv = document.createElement("div");
  expenseDiv.classList.add("expense");

  expenseDiv.innerHTML = `
  <div
  class="expense-item d-flex justify-content-between align-items-baseline"
>
  <h6 class="expense-title mb-0 text-uppercase list-item">-
    ${expense.title}
  </h6>

  <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
  <div class="expense-icons list-item">
    <a
      href="#"
      class="edit-icon mx-2"
      data-id="${expense.id}"
    >
      <i class="fas fa-edit"></i>
    </a>
    <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
    </a>
  </div>
</div>
  
  `;
  // The created 'expenseDiv' element is then appended to the 'expenseList' to display
  // the expense in the UI.
  expenseList.appendChild(expenseDiv);
}

// The totalExpense function calculates the total expense by summing up the 'amount'
// property of each expense object in the 'itemList' array.

const totalExpense = () => {
  // It initializes a 'total' variable to 0 and checks if there are expenses in the 'itemList'.
  // If there are expenses, it uses the 'reduce' method to iterate through each expense
  // and accumulate their 'amount' properties into the 'total'.
  let total = 0;
  if (itemList.length > 0) {
    total = itemList.reduce(function (acc, curr) {
      acc += curr.amount;
      return acc;
    }, 0);
  }
  // After calculating the total expense, it updates the text content of the 'expenseAmount'
  // element to display the new total and returns the calculated total value.
  expenseAmount.innerHTML = total;
  return total;
};
// The editExpense function is responsible for editing an expense record. It takes an 'element' as input,
// which should be the parent element of the edit action (containing the 'edit' button).

// It first extracts the 'id' of the expense from the 'data-id' attribute of the provided 'element'.
// Then, it identifies the parent container of the entire expense item by traversing up the DOM tree
// using 'element.parentElement.parentElement.parentElement'. This parent container is logged to the console.

// After identifying the parent container, it removes the corresponding expense item from the DOM
// by using 'expenseList.removeChild(parent)'.

// It then retrieves the original expense information using the 'id' and populates the expense input
// fields (title and amount) for editing. The edited item is removed from 'itemList', and 'showBalance' is
// called to update the balance based on the changes made.

function editExpense(element) {
  let id = parseInt(element.dataset.id);
  let parent = element.parentElement.parentElement.parentElement;
  console.log(parent);
  //remove from dom
  expenseList.removeChild(parent);

  let expense = itemList.filter((item) => item.id === id);
  expenseInput.value = expense[0].title;
  amountInput.value = expense[0].amount;
  let tempList = itemList.filter((item) => {
    return item.id !== id;
  });
  itemList = tempList;
  showBalance();
}
function removeExpense(element) {
  let id = parseInt(element.dataset.id);
  let parent = element.parentElement.parentElement.parentElement;

  expenseList.removeChild(parent);
  let tempList = itemList.filter((item) => item.id !== id);
  itemList = tempList;
  showBalance();
}
