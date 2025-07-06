function logout() {
  alert("Logging out...");
  window.location.href = "/Customer_Registration/Login.html"; // Simulate logout
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.style.display = 'none');
  const target = document.getElementById(sectionId);
  if (target) {
    target.style.display = 'block';
  }
}

// Navigation menu
function goHome() {
  window.location.href = "/PayBill/Home.html";
}

function showPayBill() {
  window.location.href = "/PayBill/PayBill.html";
}

function showRegisterComplaint() {
  alert("Navigating to Register Complaint Screen.");
}

function showComplaintStatus() {
  alert("Navigating to Complaint Status Screen.");
}

// Pay Bill logic
function updateTotalAmount() {
  const checkboxes = document.querySelectorAll(".bill-checkbox");
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) {
      total += parseFloat(cb.getAttribute("data-amount"));
    }
  });
  const totalEl = document.getElementById("total-amount");
  if (totalEl) totalEl.textContent = total;
}

function proceedToPay() {
  const total = document.getElementById("total-amount").textContent;
  localStorage.setItem("billAmount", total);
  window.location.href = "/PayBill/Payment.html";
}

// Payment page logic
function loadPaymentPage() {
  const storedBill = localStorage.getItem("billAmount");
  const billAmt = document.getElementById("bill-amount");
  const totalAmt = document.getElementById("total-payable");
  const finalAmt = document.getElementById("final-amount");

  if (storedBill && billAmt && totalAmt && finalAmt) {
    billAmt.textContent = storedBill;
    const payable = parseInt(storedBill) + 100;
    totalAmt.textContent = payable;
    finalAmt.textContent = payable;
  }

  if (window.location.hash === "#payment-section") {
    showSection("payment-section");
  }
}

function showCardForm() {
  showSection("card-section");
}

function makePayment() {
  const cardNo = document.getElementById("card-no").value;
  const name = document.getElementById("card-name").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;

  if (cardNo.length < 16 || name.length < 10 || cvv.length < 3 || !expiry.match(/(0[1-9]|1[0-2])\/\d{2}/)) {
    alert("Please enter valid card details.");
    return;
  }

  const txnId = "TXN" + Math.floor(Math.random() * 1000000000);
  document.getElementById("txn-id").textContent = txnId;
  document.getElementById("paid-amount").textContent = document.getElementById("total-payable").textContent;
  showSection("confirmation-section");
}

function downloadReceipt() {
  const txnId = document.getElementById("txn-id").textContent;
  const amount = document.getElementById("paid-amount").textContent;
  const content = `Payment Receipt\n\nTransaction ID: ${txnId}\nAmount Paid: ₹${amount}\nThank you for your payment!`;

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "PaymentReceipt.txt";
  link.click();
}

// Auto setup based on page
document.addEventListener("DOMContentLoaded", () => {
  // Pay Bill page
  document.querySelectorAll(".bill-checkbox").forEach(cb => {
    cb.addEventListener("change", updateTotalAmount);
  });

  // Payment page
  if (document.getElementById("payment-section")) {
    loadPaymentPage();
  }
});

document.addEventListener("DOMContentLoaded", () => {
const user = localStorage.getItem("loggedInUser") || "Guest";
const nameEl = document.getElementById("username");
if (nameEl) nameEl.textContent = user;
});
