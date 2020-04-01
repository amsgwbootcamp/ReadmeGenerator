const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);
// const url = `https://api.github.com/users/${username}/repos`;
// const { data } = await axios.get(
//     `https://api.github.com/users/${username}/repos`
//   );

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub User Name?"
    }
    // ,{
    //   type: "input",
    //   name: "location",
    //   message: "Where are you from?"
    // },
    // {
    //   type: "input",
    //   name: "hobby",
    //   message: "What is your favorite hobby?"
    // },
    // {
    //   type: "input",
    //   name: "food",
    //   message: "What is your favorite food?"
    // },
    // {
    //   type: "input",
    //   name: "github",
    //   message: "Enter your GitHub Username"
    // },
    // {
    //   type: "input",
    //   name: "linkedin",
    //   message: "Enter your LinkedIn URL."
    // }
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
    const { githubUsername } = await promptUser();
    console.log(githubUsername);
    const { data } = await axios.get(
      `https://api.github.com/users/${githubUsername}/repos`
    );
    console.log(data);
    console.log("Retrieved GitHub API");  
    // return writeFileAsync("index.html", generateHTML(answers));
  }
  catch (err) {
    console.log(err);
  }
}
 
init();
