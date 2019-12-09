var bootcampClass = require('./class');
var bootcampGroups = require('./groups');
var inquirer = require("inquirer");
var _ = require('lodash');
var fuzzy = require('fuzzy');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

// Functions that I need:

// Declare array of object keys
const roster = Object.keys(bootcampClass);
const groups = Object.keys(bootcampGroups);

// Function that searches through roster keys
searchStudents = (answers, input) => {
    input = input || '';
    return new Promise(function (resolve) {
        setTimeout(function () {
            var fuzzyResult = fuzzy.filter(input, roster);
            resolve(
                fuzzyResult.map(function (el) {
                    return el.original;
                })
            );
        }, _.random(30, 500));
    });
}

// Function that allows manipulation of class roster by prompting for addition of skills for certain students

// Function that creates groups for project two
// -- needs to validate for group size (min of 3, max of 4)
// -- needs to validate for every student having skills filled out
// -- doesn't allow groups to have >1 strong students, or >1 weak students

// Function that starts the program:
runProgram = () => {
    inquirer
        .prompt([
            {
                name: "welcome",
                type: "list",
                message: "Choose an option",
                choices: ["View Roster", "View Groups", "Create Groups"]
            }
        ])
        .then(function (answer) {
            switch (answer.search) {
                case "View Roster":
                    // Function for viewing roster
                    break;
                case "View Groups":
                    // Function for viewing groups
                    break;
                case "Create Groups":
                    // Function for creating groups
                    break;
                default:
                    runProgram();
                    break;
            }
        })
}

// Function that pulls up the entire class roster when prompted
viewRoster = () => {
    console.table(roster)
    inquirer
        .prompt([
            {
                name: "roster",
                message: "Choose A Student To See A Breakdown of The Student",
                type: "autocomplete",
                source: searchStudents
            }
        ])
        .then(function (student) {
            console.table(student);
            inquirer
                .prompt([
                    {
                        name: "studentActions",
                        message: "Select An Option To Alter Student Data",
                        type: "list",
                        choices: ["Add Attribute", "Change Attribute", "Insert Into Group", "Remove From Group"]
                    }
                ])
                .then(function (answer) {
                    switch (answer.studentActions) {
                        case "Add Attribute":
                            //Add Attribute to Student Function
                            break;
                        case "Change Attribute":
                            // Change Attribute to Student Function
                            break;
                        case "Insert Into Group":
                            // Insert Student Into Group Function
                            break;
                        case "Remove From Group":
                            // Remove Student From Group Function
                        default:
                            viewRoster();
                            break;
                    }
                })
        })
}

viewGroups = () => {
    console.table(groups)
    inquirer
        .prompt([
            {
                name: "groups",
                message: "Choose A Group To See Actions Available",
                type: "rawlist",
                choices: groups
            }])
        .then(function (answer) {
            console.table(answer.groups)
        })
}