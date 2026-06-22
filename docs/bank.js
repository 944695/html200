"use strict";

const startingBalance = 1000;
const lowBalanceWarningThreshold = 300;
const depositCap = 50000;

let balance = startingBalance;
let isRunning = true;

function formatCurrency(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
	}).format(amount);
}

function getAction() {
	return window.prompt(
		"Choose an action:\nW - Withdraw\nD - Deposit\nB - View Balance\nQ - Quit"
	);
}

function getAmount(message) {
	const response = window.prompt(message);

	if (response === null) {
		return null;
	}

	const amount = Number.parseFloat(response);

	if (!Number.isFinite(amount) || amount <= 0) {
		window.alert("Please enter a valid amount greater than zero.");
		return null;
	}

	return amount;
}

function withdrawMoney() {
	const amount = getAmount("How much would you like to withdraw?");

	if (amount === null) {
		return;
	}

	if (amount > balance) {
		window.alert("You do not have enough money for that withdrawal.");
		return;
	}

	const projectedBalance = balance - amount;

	if (projectedBalance < lowBalanceWarningThreshold) {
		const confirmLowBalance = window.confirm(
			`This withdrawal will leave your balance at ${formatCurrency(
				projectedBalance
			)}. Are you sure you want to continue?`
		);

		if (!confirmLowBalance) {
			return;
		}
	}

	balance = projectedBalance;
	window.alert(
		`Withdrawal complete. Your new balance is ${formatCurrency(balance)}.`
	);
}

function depositMoney() {
	const amount = getAmount("How much would you like to deposit?");

	if (amount === null) {
		return;
	}

	if (amount > depositCap) {
		window.alert(`Deposits cannot exceed ${formatCurrency(depositCap)}.`);
		return;
	}

	balance += amount;
	window.alert(
		`Deposit complete. Your new balance is ${formatCurrency(balance)}.`
	);
}

function viewBalance() {
	window.alert(`Your current balance is ${formatCurrency(balance)}.`);
}

function main() {
	while (isRunning) {
		const action = getAction();

		if (action === null) {
			isRunning = false;
			break;
		}

		const normalizedAction = action.trim().toUpperCase();

		switch (normalizedAction) {
			case "Q":
				isRunning = false;
				break;
			case "W":
				withdrawMoney();
				break;
			case "D":
				depositMoney();
				break;
			case "B":
				viewBalance();
				break;
			default:
				window.alert("Please enter W, D, B, or Q.");
				break;
		}
	}
}

window.addEventListener("DOMContentLoaded", () => {
	window.alert(
		`Welcome to the bank app. Your starting balance is ${formatCurrency(
			balance
		)}.`
	);
	main();
});
