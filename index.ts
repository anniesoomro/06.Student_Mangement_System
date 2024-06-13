#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000)

let myBalance: number = 0

let answer = await inquirer.prompt(
    [
        {
            name: "students",
            type: "input",
            message: "Enter student name:",
            validate: function(value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value.";

            },
        },
        {
            name: "courses",
            type: "list",
            message: "Select the course to enrolled",
            choices: ["MS.Office", "HTML", "Javascript", "Typescript", "Python"]
        }
    ]
);

const tutionFee: {[key: string]: number} = {
    "MS.Office": 2000,
    "HTML": 2500,
    "Javascript": 5000,
    "Typescript": 6000,
    "Python": 10000
};

console.log(chalk.bgBlue`\nTution Fees: ${tutionFee[answer.courses]}/-\n`);
console.log(chalk.bgGray`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment method",
        choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
    },
    {
        name: "amount",
        type: "input",
        message: "Transfer Money:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    }
]);

console.log(chalk.bgCyanBright`\nYou select payment method ${paymentType.payment}\n`);

const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount)

if (tutionFees === paymentAmount) {
    console.log(chalk.bgYellow`Congratulations, you have successfully enrolled in ${answer.courses}.\n`);

let ans = await inquirer.prompt([
    {
        name: "select",
        type: "list",
        message: "What would you like to do next?",
        choices: ["View Status", "Exit"]
    }
])

if (ans.select === "View Status") {
    console.log("\n************Status************\n");
    console.log(chalk.bgBlackBright.bold`Student Name: ${answer.students}`);
    console.log(chalk.green.bold`Student ID: ${randomNumber}`);
    console.log(chalk.red.bold`Course: ${answer.courses}`);
    console.log(chalk.bgCyanBright.bold`Tution Fees Paid: ${paymentAmount}`);
    console.log(chalk.blueBright.bold`Balance: ${myBalance += paymentAmount}`);
} else {
    console.log(chalk.magentaBright.bold("\nExiting Student Management System\n"));
}

}else { 
    console.log(chalk.green.bold("Invalid amount due to course\n"));
}