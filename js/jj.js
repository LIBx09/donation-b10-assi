const historyTab = document.getElementById("history-tab");
const donationTab = document.getElementById("donation-tab");

// Toggle between donation and history tabs
donationTab.addEventListener("click", function () {
  donationTab.classList.add("text-[#111111]", "bg-[#B4F461]");
  historyTab.classList.remove("text-[#111111]", "bg-[#B4F461]");
  historyTab.classList.add("text-[#111111B3]");
  document.getElementById("history-page").classList.add("hidden");
  document.getElementById("donation-page").classList.remove("hidden");
});

historyTab.addEventListener("click", function () {
  historyTab.classList.add("text-[#111111]", "bg-[#B4F461]");
  donationTab.classList.remove("text-[#111111]", "bg-[#B4F461]");
  donationTab.classList.add("text-[#111111B3]");
  document.getElementById("donation-page").classList.add("hidden");
  document.getElementById("history-page").classList.remove("hidden");
});

// Function to handle donation logic
function handleDonation(buttonId, inputId, donatedId, location) {
  const donateButton = document.getElementById(buttonId);

  donateButton.addEventListener("click", function () {
    const donateAmount = parseFloat(document.getElementById(inputId).value);
    if (isNaN(donateAmount) || donateAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    let deductAccount = document.getElementById("accounts");
    let mainCurrentBalance = parseFloat(
      deductAccount.textContent.split(" ")[0]
    );

    if (donateAmount > mainCurrentBalance) {
      alert("Insufficient funds in the main account.");
      return;
    }

    let newBalance = mainCurrentBalance - donateAmount;
    updateMainAccounts(newBalance);

    let donateMoneyElement = document.getElementById(donatedId);
    let currentDonated = parseFloat(
      donateMoneyElement.textContent.split(" ")[0] || 0
    );
    let newDonatedBalance = currentDonated + donateAmount;

    donateMoneyElement.textContent = newDonatedBalance + " BDT";

    document.getElementById(inputId).value = "";

    // Update donation history
    const historyItem = document.createElement("div");
    historyItem.className = "p-4 rounded-lg shadow-md border";
    historyItem.innerHTML = `
      <h4 class="text-[#111111] font-bold text-xl mb-2">${donateAmount} Taka is donated for ${location}</h4>
      <h4 class="text-[#111111B3] text-sm font-normal">${new Date().toLocaleString()}</h4>
    `;
    const historyWal = document.getElementById("history-page");
    historyWal.insertBefore(historyItem, historyWal.firstChild);
  });
}

// Updating the account balance
function updateMainAccounts(newBalance) {
  let account = document.getElementById("accounts");
  account.textContent = newBalance + " BDT";
}

// Initialize with default balance
updateMainAccounts(10000);

// Applying the function for all three donation cards
handleDonation(
  "donate",
  "get-donate",
  "donated-money",
  "Flood Relief in Noakhali, Bangladesh"
);
handleDonation(
  "donate-2",
  "get-donate-2",
  "donated-money-2",
  "Flood Relief in Feni, Bangladesh"
);
handleDonation(
  "donate-3",
  "get-donate-3",
  "donated-money-3",
  "Aid for Injured in Quota Movement"
);
