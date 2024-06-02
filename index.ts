#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class student {
    id: string;
    name: string;
    coursesEnrolled: string[];
    feesAmount: number;

    constructor(id: string, name: string, coursesEnrolled: string[], feesAmount: number) {
        this.id = id
        this.name = name
        this.coursesEnrolled = coursesEnrolled
        this.feesAmount = feesAmount
    }
}


let baseId = 10000
let studentId:  string = "";
let continueEnrollment = true;

let students: student[] = [];



   do{ 
        let  action = await inquirer.prompt({
             type: "list",
             name: "ans",
             message:  "Please select an option\n",
             choices: ["Enroll a student", "Show student status"]
       })

       if(action.ans === "Enroll a student"){
           let studentName = await inquirer.prompt({
               type: "input",
               name: "ans",
               message: "Please enter your name"
        })

        let trimmedStudentName = (studentName.ans).trim().toLowerCase()
        let studentNameCheck = students.map(obj => obj.name)

        if(studentNameCheck.includes(trimmedStudentName) === false){
            if (trimmedStudentName !== ""){
                 baseId++
                 studentId = "STID" + baseId
   
            console.log(chalk.blueBright.bold.italic("\n\tYour account has been created"));
            console.log(chalk.cyanBright.bold.italic(`Welcome, ${trimmedStudentName}!`));

            let course = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select a course", 
                choices: ["IT", "English", "Cooking"]
            })

            let courseFees = 0;
            switch(course.ans){
                case "IT":
                courseFees = 5000;
                break;  

                case "English":
                courseFees = 500;
                break;
                
                case "Cooking":
                courseFees = 200;
                break;
            }

            let courseConfirm = await inquirer.prompt({
                type: "confirm",
                name: "ans",
                message: "Do you want to enroll in this course"
            })


            if(courseConfirm.ans === true ){
                let Student = new student(studentId, trimmedStudentName,[course.ans],courseFees)
              
                students.push(Student) 
            
                 console.log(chalk.redBright.bold.italic("You have enrolled in this course"));

            }

            }else{
               console.log(chalk.greenBright.bold.italic("Invalid name"));
         }
        }else{
               console.log(chalk.yellowBright.bold.italic("this name is already exist"));
        }


   
    }
    else if (action.ans === "Show student status"){ 
             if(students.length !== 0){
                 let studentNameCheck = students.map(e => e.name)

                let selectedStudent = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select name",
                    choices: studentNameCheck 
        }) 

                 let foundStudent = students.find(Student => Student.name === selectedStudent.ans)

                 console.log(chalk.red.bold.italic("Student information"));
                 console.log(foundStudent);
                 console.log("\n");


                 

            }else{
                console.log(chalk.bold.italic("Record is empty"));
            }
    }

            let userConfirm = await inquirer.prompt({
                type: "confirm",
                name: "ans",
                message: "Do you want to continue?"
            })

            if(userConfirm.ans === false){
                continueEnrollment = false
        }

        
} while(continueEnrollment)