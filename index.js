const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
//var image = "![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)";
//var badge = https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>
//var badge = "https://img.shields.io/static/v1?label=Angela%27s+Badge&message=This+is+my+badge&color=red";
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
      name: "project",
      message: "What is the name of your project?"
    }
    //,
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
    const { githubUsername, project } = await promptUser();
    //var queryUrl = "https://api.github.com/users/" + githubUsername + "/events/public";
    //console.log(githubUsername);
    //const { email } = await axios.get(queryUrl);
    //console.log(email);
    console.log("Getting ready to write file.");  
    return writeFileAsync("Readme.md", generateReadme(githubUsername, project));
  }
  catch (err) {
    console.log(err);
  }
}

function generateReadme(githubUsername, project)
{    return "# 07 Readme File Generator" + 
     "\n\n" + 
     "#### Project title:" + project +
     "\n\n" +
     "#### Description" +
     "\n\n" +
     "#### Table of Contents" +
     "\n\n" +
     "#### Installation" +
     "\n\n" +
     "## Usage" +
     "\n\n" +
     "## License" +
     "\n\n" +
     "## Contributing" +
     "\n\n" +
     "## Tests" +
     "\n\n" +
     "## Questions" +
     "\n" + "GitHub Username: " + githubUsername +
     "\n" + "Image: " + image
     ;

};

init();
