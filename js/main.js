const donateButtonOne = document.getElementById("donate");

donateButtonOne.addEventListener("click", function () {
  const getDonateNoakhali = parseFloat(
    document.getElementById("get-donate").value
  );
  if (isNaN(getDonateNoakhali) || getDonateNoakhali <= 0) {
    alert("Please enter the valid donation amount.");
    return;
  }

  let deductAccount = document.getElementById("accounts");
  let mainCurrentBalance = parseFloat(deductAccount.textContent.split(" ")[0]);

  if (getDonateNoakhali > mainCurrentBalance) {
    alert("Insufficient funds in the main accounts.");
    return;
  }

  let newBalance = mainCurrentBalance - getDonateNoakhali;
  updateMainAccounts(newBalance);

  let donateMoneyToNoakhali = document.getElementById("donated-money");
  let currentDonated = parseFloat(
    donateMoneyToNoakhali.textContent.split(" ")[0] || 0
  );
  let newDonatedBalance = currentDonated + getDonateNoakhali;

  donateMoneyToNoakhali.textContent = newDonatedBalance + " BDT";

  document.getElementById("get-donate").value = "";
});

function updateMainAccounts(newBalance) {
  let account = document.getElementById("accounts");

  account.textContent = newBalance + " " + "BDT";
}
updateMainAccounts(999999);
