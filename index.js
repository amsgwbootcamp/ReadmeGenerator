const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
var choiceBadges = "";
const noneBadge = "![Image of None Badge](https://img.shields.io/static/v1?label=license&message=No%20license%20chosen&color=green)";
const apacheBadge = "![Image of Apache License 2.0 Badge](https://img.shields.io/static/v1?label=license&message=Apache%20License%202.0&color=blue)";
const gnuBadge = "![Image of GNU General Public License 3.0 Badge](https://img.shields.io/static/v1?label=license&message=GNU%20General%20Public%20License%203.0&color=yellow)";
const mitBadge = "![Image of MIT License Badge](https://img.shields.io/static/v1?label=license&message=MIT%20License&color=orange)"; 
var Avatar = "";
var email = "";
var images = [];
var imageString = "";

const writeFileAsync = util.promisify(fs.writeFile);

async function init() 
{
  try {
    // user prompts
    const { githubUsername, projectTitle, description, installInfo, contributing, tests, license, usage } = await promptUser();
    // retrieve from GitHub
    const res = await axios.get(`https://api.github.com/users/${githubUsername}/events/public`);
    // set the variables
    email = res.data[0].payload.commits[0].author.email;
    gitHubAvatar = res.data[0].actor.avatar_url;
    Avatar = gitHubAvatar.substring(0,gitHubAvatar.length-1);
    gitHubImage = `![Image of GitHubUser](`+ Avatar +`)`;
    // generate the Readme and write to the Readme.md file
    return writeFileAsync("Readme.md", generateReadme(githubUsername, projectTitle, description, installInfo, contributing, tests, license, usage, email));
  }
  catch (err) {
      console.log(err);
  }
}

// based on the user choice will determine which badges should be displayed:  
function checkChoices(license) 
{
    choiceBadges = "\n\n";
   
    for (i=0; i < license.length; i++)
    {
      switch (license[i])
      {
        case "None": 
            images.push(noneBadge);
            break;
        case "Apache License 2.0":  
            images.push(apacheBadge);
            break;
        case "GNU General Public License 3.0": 
            images.push(gnuBadge);
            break;
        case "MIT License":
            images.push(mitBadge);
            break;
      }      
   }
}  

// this will generate the Readme and return it so that it can be written to the Readme.md:  
function generateReadme(githubUsername, projectTitle, description, installInfo, contributing, tests, license, usage, email)
{    
    checkChoices(license); 
    for (i=0; i < images.length; i++)
    {
      if (images[i] !== "")
      {
        imageString = imageString + images[i] + "\n\n";
      }      
    }
     return `# 07 Readme File Generator` + 
     `\n\n` + 
     `## Project Title` + `\n\n` + projectTitle +
     `\n\n` +
     `## Description`  + `\n\n` + description +
     `\n\n` +
     `## Table of Contents` + `\n\n` + 
     `- [07 Readme File Generator](#07-Readme-File-Generator)` + `\n` +
     `- [Project Title](#project-title)` + `\n` +
     `- [Description](#description)` + `\n` + 
     `- [Installation](#installation)` + `\n` +
     `- [Usage](#usage)` + `\n` +
     `- [License](#license)` + `\n` + 
     `- [Contributors](#contributors)` + `\n` +
     `- [Tests](#tests)` + `\n` +
     `- [Questions](#questions)` + `\n` +
     `- [Github Username](#github-username)` + `\n` +
     `- [Email](#email)` + 
     `\n\n` +
     `## Installation` + `\n\n` + installInfo +  
     `\n\n` + 
     `## Usage` + `\n\n` + usage +
     `\n\n` +
     `## License` + `\n\n` + imageString + 
     `\n\n` +
     `## Contributors` +  `\n\n` + contributing +
     `\n\n` +
     `## Tests` + `\n\n` + tests +
     `\n\n` + 
     `## Questions` + 
     `\n\n` + `#### GitHub Username` + `\n` + githubUsername +
     `\n` + `#### Email` + `\n` + email + `\n\n` +
     `<img src="` + Avatar + `" height="36px" width="36px">`;
};

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
      type:"input",
      name: "installInfo",
      message: "Installation instructions"
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
      name: "license",
      choices: ["None",
                "Apache License 2.0",
                "GNU General Public License 3.0",
                "MIT License"
              ]
    },
    {
      type: "input",
      name: "usage",
      message: "Enter the command to run this program"
    }
  ]);
}

init();
