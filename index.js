#!/usr/bin/env node

// This is called a shebang. It tells the system
//  that this script should be executed using Node.js.
// When you run the script from the command line, 
// the system uses the node interpreter to execute it.

const { Command } = require('commander');
// A library for building command-line interfaces (CLI). 
// It helps parse command-line arguments and options
const chalk = require('chalk');
// A library for styling terminal output (e.g., colored text).
const axios = require('axios');
const { log } = require('console');
// A library for making HTTP requests.
// It’s used to fetch data from the GitHub API.


const program = new Command();
// Creates a new instance of the Command class from the commander library.
// This instance will handle CLI commands and options.

program
    .version('1.0.0')
    .description('A CLI tool for fetching GitHub user data')
    .requiredOption('-u,--username <username>', 'Github UserName')
    .parse(process.argv);
    // The parse() method parses the command-line arguments and options(e.g., username).

const { username } = program.opts();

async function fetchGitHubActivity(username){
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events/public`)
        const events = response.data;
        if(events.length === 0) {
            console.log(chalk.red(`No recent Activity found for ${username}`))
            return; 
        }
        console.log(chalk.blue.bold(`Recent activity for ${username}:`));
        events.forEach((event,index) => {
            console.log(chalk.green(`${index + 1}. ${event.type}: ${event.repo.name}`));
            
        })   
    }catch (error) {
        console.error(chalk.red('Error fetching GitHub activity:', error.message));
    }
}
fetchGitHubActivity(username);
