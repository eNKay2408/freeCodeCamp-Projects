let price = 3.26;
let cid = [
	["PENNY", 1.01],
	["NICKEL", 2.05],
	["DIME", 3.1],
	["QUARTER", 4.25],
	["ONE", 90],
	["FIVE", 55],
	["TEN", 20],
	["TWENTY", 60],
	["ONE HUNDRED", 100],
];

let currencyUnit = [
	["PENNY", 0.01],
	["NICKEL", 0.05],
	["DIME", 0.1],
	["QUARTER", 0.25],
	["ONE", 1],
	["FIVE", 5],
	["TEN", 10],
	["TWENTY", 20],
	["ONE HUNDRED", 100],
];

const priceText = document.getElementById("price");
const drawerText = document.getElementById("drawer");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const cashInput = document.getElementById("cash");

let cash = 0;
priceText.textContent = price;

const updateDrawer = () => {
	drawerText.innerHTML = "Change in drawer:";
	cid.forEach((ele) => {
		drawerText.innerHTML += `
      <p>${
				ele[0].charAt(0) + ele[0].substring(1).toLowerCase()
			}: <span class="bold">\$${ele[1]}</p></span>
    `;
	});
};

const sumDrawerCurrent = (cid) => {
	return parseFloat(cid.reduce((sum, ele) => sum + ele[1], 0).toFixed(2));
};

const changeDueProcess = (cash) => {
	let changeDueCash = parseFloat((cash - price).toFixed(2));
	const changeDueDetail = [];
	let result = "";
	let cidCopy = cid.map((row) => row.slice());

	if (changeDueCash > sumDrawerCurrent(cidCopy)) {
		result = "Status: INSUFFICIENT_FUNDS";
	} else {
		for (let i = currencyUnit.length - 1; i >= 0; i--) {
			const currency = currencyUnit[i][1];
			let useCurrency = Math.min(
				Math.floor(changeDueCash / currency) * currency,
				cid[i][1]
			);

			if (useCurrency > 0) {
				changeDueDetail.push({
					key: currencyUnit[i][0],
					value: parseFloat(useCurrency.toFixed(2)),
				});
				cidCopy[i][1] = parseFloat((cid[i][1] - useCurrency).toFixed(2));
				changeDueCash = parseFloat((changeDueCash - useCurrency).toFixed(2));
			}
		}

		if (changeDueCash == 0) {
			if (sumDrawerCurrent(cidCopy) == 0) {
				result = `<p>Status: CLOSED</p>`;
			} else {
				result = "<p>Status: OPEN</p>";
			}

			cid = cidCopy;
			changeDueDetail.forEach((changeDue) => {
				result += `
          <p>${changeDue.key}: <span class="bold">\$${changeDue.value}</span></p>
        `;
			});
		} else {
			result = "Status: INSUFFICIENT_FUNDS";
		}
	}

	return result;
};

const checkCash = () => {
	cash = parseFloat(cashInput.value);
	let result = "";

	if (cash < price) {
		alert("Customer does not have enough money to purchase the item");
		return;
	}

	if (isNaN(cash)) {
		result = "Please, enter cash from customer";
	} else if (cash === price) {
		result = "No change due - customer paid with exact cash";
	} else {
		result = changeDueProcess(cash);
	}

	changeDue.style.display = "block";
	changeDue.innerHTML = result;
	cashInput.value = "";
	updateDrawer();
};

document.addEventListener("DOMContentLoaded", updateDrawer);
purchaseBtn.addEventListener("click", checkCash);
cashInput.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		checkCash();
	}
});
