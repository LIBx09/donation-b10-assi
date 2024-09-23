const historyTab = document.getElementById("history-tab");
const donationTab = document.getElementById("donation-tab");
historyTab.addEventListener("click", function () {
  historyTab.classList.add("text-[#111111]", "bg-[#B4F461]");

  donationTab.classList.remove("text-[#111111]", "bg-[#B4F461]");

  donationTab.classList.add("text-[#111111B3]");

  document.getElementById("donation-page").classList.add("hidden");
  document.getElementById("history-page").classList.remove("hidden");
});

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

  const donationLocation = "Noakhali, Bangladesh";
  const historyItem = document.createElement("div");
  historyItem.className = "p-4 rounded-lg shadow-md border";
  historyItem.innerHTML = `

    <h4 class="text-[#111111] font-bold text-xl mb-2">${getDonateNoakhali} Taka is Donated for Flood Relief in ${donationLocation}
    </h4>

    <h4 class="text-[#111111B3] text-sm font-normal">${new Date().toLocaleString()}</h4>
  
  `;
  const historyWal = document.getElementById("history-page");
  historyWal.insertBefore(historyItem, historyWal.firstChild);
});

function updateMainAccounts(newBalance) {
  let account = document.getElementById("accounts");

  account.textContent = newBalance + " " + "BDT";
}
updateMainAccounts(10000);
