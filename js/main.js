const historyTab = document.getElementById("history-tab");
const donationTab = document.getElementById("donation-tab");

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

const successModal = document.getElementById("my_modal_5");

function handleDonation(buttonId, inputId, donatedId, location) {
  const donationButton = document.getElementById(buttonId);

  donationButton.addEventListener("click", function () {
    const donateAmount = parseFloat(document.getElementById(inputId).value);
    if (isNaN(donateAmount) || donateAmount <= 0) {
      alert("Please enter the valid donation amount.");
      return;
    }

    let deductAccount = document.getElementById("accounts");
    let mainCurrentBalance = parseFloat(
      deductAccount.textContent.split(" ")[0]
    );

    if (donateAmount > mainCurrentBalance) {
      alert("Insufficient funds in the main accounts.");
      return;
    }

    let newBalance = mainCurrentBalance - donateAmount;
    updateMainAccounts(newBalance);

    let donateMoney = document.getElementById(donatedId);
    let currentDonated = parseFloat(donateMoney.textContent.split(" ")[0] || 0);
    let newDonatedBalance = currentDonated + donateAmount;

    donateMoney.textContent = newDonatedBalance + " BDT";

    document.getElementById(inputId).value = "";

    // const donationLocation = "Noakhali, Bangladesh";
    const historyItem = document.createElement("div");
    historyItem.className = "p-4 rounded-lg shadow-md border";
    historyItem.innerHTML = `
    <h4 class="text-[#111111] font-bold text-xl mb-2">${donateAmount} Taka is Donated for Flood Relief in ${location}
    </h4>
    <h4 class="text-[#111111B3] text-sm font-normal">${new Date().toLocaleString()}</h4>
  `;
    const historyWal = document.getElementById("history-page");
    historyWal.insertBefore(historyItem, historyWal.firstChild);
    successModal.showModal();
  });
}
function updateMainAccounts(newBalance) {
  let account = document.getElementById("accounts");

  account.textContent = newBalance + " " + "BDT";
}
updateMainAccounts(100000);

handleDonation(
  "donate-btn-one",
  "get-donate-one",
  "donate-money-one",
  "Noakhali, Bangladesh"
);
handleDonation(
  "donate-btn-two",
  "get-donate-two",
  "donate-money-two",
  "Feni, Bangladesh"
);
handleDonation(
  "donate-btn-three",
  "get-donate-three",
  "donate-money-three",
  "Quota Injured, Bangladesh"
);
