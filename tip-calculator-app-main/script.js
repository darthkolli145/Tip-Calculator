const inputBill = document.getElementById("bill-amount");
const inputPeople = document.getElementById("people-count");
const inputCustom = document.querySelector(".custom-percentage");
const btn_5 = document.querySelector(".btn_5");
const btn_10 = document.querySelector(".btn_10");
const btn_15 = document.querySelector(".btn_15");
const btn_25 = document.querySelector(".btn_25");
const btn_50 = document.querySelector(".btn_50");
const btnReset = document.querySelector(".reset-btn");
const showTip = document.querySelector(".show-tip");
const showTotal = document.querySelector(".show-total");
const showWarning = document.querySelector("label span");

let billAmount = 0,
  numPeople = 0,
  customPercent = 0,
  percent = 0;
let tipTotal, tipPerson, totalPerson;

const percentBtns = [btn_5, btn_10, btn_15, btn_25, btn_50];

function resetBtn() {
  inputBill.value = "";
  inputPeople.value = "";
  inputPeople.classList.remove("empty");
  inputCustom.value = "";
  percent = 0;
  percentBtns.forEach(function (btn) {
    btn.classList.remove("click");
  });
  showTip.textContent = "$0.00";
  showTotal.textContent = "$0.00";
  showWarning.classList.remove("empty");
  btnReset.setAttribute("disabled", true);
}

function calculate() {
  billAmount = Number(inputBill.value);
  numPeople = Number(inputPeople.value);
  customPercent = Number(inputCustom.value);

  if (inputCustom.value !== "") {
    percent = customPercent;
  }

  if (customPercent > 100) {
    alert("Percentage cannot be greater than 100!");
    resetBtn();
    return;
  }

  if (customPercent < 0) {
    alert("Percentage cannot be negative!");
    resetBtn();
    return;
  }

  if (numPeople < 0) {
    alert("Number of people cannot be negative!");
    resetBtn();
    return;
  }

  if (billAmount < 0) {
    alert("Bill amount cannot be negative!");
    resetBtn();
    return;
  }

  if (billAmount !== 0 || numPeople !== 0 || percent !== 0) {
    btnReset.removeAttribute("disabled");
  } else {
    btnReset.setAttribute("disabled", true);
  }

  if (numPeople === 0) {
    showWarning.classList.add("empty");
    inputPeople.classList.add("empty");
    return;
  } else {
    showWarning.classList.remove("empty");
    inputPeople.classList.remove("empty");
  }

  if (billAmount > 0 && numPeople > 0 && percent > 0) {
    tipTotal = billAmount * (percent / 100);
    tipPerson = tipTotal / numPeople;
    totalPerson = (billAmount + tipTotal) / numPeople;

    showTip.textContent = "$" + tipPerson.toFixed(2);
    showTotal.textContent = "$" + totalPerson.toFixed(2);
  } else {
    showTip.textContent = "$0.00";
    showTotal.textContent = "$0.00";
  }
}

inputBill.addEventListener("input", calculate);
inputPeople.addEventListener("input", calculate);

inputCustom.addEventListener("input", function () {
  percentBtns.forEach(function (btn) {
    btn.classList.remove("click");
  });
  calculate();
});

percentBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    percentBtns.forEach(function (btnInner) {
      btnInner.classList.remove("click");
    });
    btn.classList.add("click");
    inputCustom.value = "";
    percent = Number(btn.textContent);
    calculate();
  });
});

btnReset.addEventListener("click", resetBtn);
