const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Generate random 13-digit customer ID
  const randomId = Math.floor(1000000000000 + Math.random() * 9000000000000);

  // Collect values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // ✅ Save to localStorage for use on other pages
  localStorage.setItem("loggedInUser", name);

  // Show success acknowledgment
  alert(
    "✅ Consumer Registration Successful.\n\n" +
    "Customer ID: " + randomId + "\n" +
    "Customer Name: " + name + "\n" +
    "Email: " + email
  );

  // Redirect to home page
  window.open("/PayBill/Home.html", "_self");
});