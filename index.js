const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
var image = "![Image of Angela's Badge](https://img.shields.io/static/v1?label=Angela%27s+Badge&message=This+is+my+badge&color=red)";

const writeFileAsync = util.promisify(fs.writeFile);
// const url = `https://api.github.com/users/${username}/repos`;
// const { data } = await axios.get(
//     `https://api.github.com/users/${username}/repos`
//   );
//https://api.github.com/users/amsgwbootcamp

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub User Name?"
    }
    ,{
      type: "input",
      name: "projectTitle",
      message: "What is the title of your project?"
    }
    ,{
      type: "input",
      name: "description",
      message: "What is a brief description of your project?"
    },
    {
      type: "input",
      name: "contributing",
      message: "Who has worked on this with you?"
    },
    {
      type: "input",
      name: "tests",
      message: "Are there any tests for this project?"
    },
    {
      type: "checkbox",
      message: "What licenses are required?",
      name: "licenses",
      choices:["None","Apache License 2.0","GNU General Public License 3.0","MIT License"]
    },
    {
      type: "input",
      name: "usage",
      message: "Enter the command to run this program"
    }
  ]);
}

// function generateHTML(answers) {
//   return `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//   <title>Document</title>
// </head>
// <body>
//   <div class="jumbotron jumbotron-fluid">
//   <div class="container">
//     <h1 class="display-4">Hi! My name is ${answers.name}</h1>
//     <p class="lead">I am from ${answers.location}.</p>
//     <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
//     <ul class="list-group">
//       <li class="list-group-item">My GitHub username is ${answers.github}</li>
//       <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
//     </ul>
//   </div>
// </div>
// </body>
// </html>`;
// }

async function init() 
{
  console.log("hi");

  try {
    const { githubUsername, projectTitle, description, contributing, tests, licenses, usage } = await promptUser();
    //var queryUrl = "https://api.github.com/users/" + githubUsername + "/events/public";
    //console.log(githubUsername);
    //const { email } = await axios.get(queryUrl);
    //console.log(email);
    console.log("Getting ready to write file.");  
    return writeFileAsync("Readme.md", generateReadme(githubUsername, projectTitle, description, contributing, tests, licenses, usage));
  }
  catch (err) {
    console.log(err);
  }
}

function generateReadme(githubUsername, projectTitle, description, contributing, tests, licenses, usage)
{    return "# 07 Readme File Generator" + 
     "\n\n" + 
     "#### Project title:" + "\n\n" + projectTitle +
     "\n\n" +
     "#### Description" + "\n\n" + description +
     "\n\n" +
     "#### Table of Contents" +
     "\n\n" +
     "#### Installation" +
     "\n\n" +
     "#### Usage" + "\n\n" + usage +
     "\n\n" +
     "#### License" + "\n\n" + licenses +
     "\n\n" +
     "#### Contributing" + "\n\n" + contributing +
     "\n\n" +
     "#### Tests" + "\n\n" + tests +
     "\n\n" + 
     "#### Questions" +
     "\n" + "GitHub Username: " + githubUsername +
     "\n" + "Image: " + image
     ;

};

init();
