import { CommandParser } from "./parsers/command";
import path from 'path';
import figlet from "figlet";
export function mainCommand({ args }: any) {
    // Initial steps
    void args;
    console.log(figlet.textSync("MTG Cardtracker", {font: "Big"}));
    // Command parser setup
    const parser = new CommandParser();
    parser.loadCommandsFromDirectory(path.join(__dirname, 'commands'));
    // Input loop
    parser.startInputLoop('> ');
}