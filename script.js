window.onload = () => {
    renderData();
}

// Add Income
document.getElementById("incomeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("incometitle").value.trim();
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    if (!title || isNaN(amount) || amount <= 0) {
        return alert("Kindly enter valid income details");
    }

    const income = { id: Date.now(), title, amount };
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    incomes.push(income);  // Push income object, not the array itself
    localStorage.setItem("incomes", JSON.stringify(incomes));
    this.reset();
    renderData();
});

// Add Expense
document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("expenseTitle").value.trim();
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    if (!title || isNaN(amount) || amount <= 0) {
        return alert("Please enter a valid expense");
    }

    const expense = { id: Date.now(), title, amount };
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense); // push expense object, not the array itself
    localStorage.setItem("expenses", JSON.stringify(expenses));
    this.reset();
    renderData();
});

// Delete income/expense by id
function deleteItem(id, type) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    data = data.filter(item => item.id !== id);
    localStorage.setItem(type, JSON.stringify(data));
    renderData();
}

function renderData() {
    const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Show income list
    const incomeList = document.getElementById("incomeList");
    incomeList.innerHTML = "";
    let totalIncome = 0;

    incomes.forEach(item => {
        totalIncome += item.amount;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.title}: ₹${item.amount.toFixed(2)}
            <button onclick="deleteItem(${item.id}, 'incomes')">Delete</button>
        `;
        incomeList.appendChild(li);
    });

    // Show expense list
    const expenseList = document.getElementById("expenselist");
    expenseList.innerHTML = "";
    let totalExpense = 0;

    expenses.forEach(item => {
        totalExpense += item.amount;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.title}: ₹${item.amount.toFixed(2)}
            <button onclick="deleteItem(${item.id}, 'expenses')">Delete</button>
        `;
        expenseList.appendChild(li);
    });

    // Update totals and balance
    document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
    document.getElementById("totalexpense").textContent = totalExpense.toFixed(2);
    document.getElementById("balance").textContent = (totalIncome - totalExpense).toFixed(2);
}
