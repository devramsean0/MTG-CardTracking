import { Command } from "../../structures/command";

const command = new Command('test2', 'A test command', (subcommands) => {
    console.log('Test command executed', subcommands);
})
module.exports = command;