import * as fs from 'fs';
import * as path from 'path';
import { Command } from '../structures/command';
import readline from 'readline';
export class CommandParser {
  private commands: Map<string, Command> = new Map();

  addCommand(command: Command): void {
    this.commands.set(command.name, command);
  }
  loadCommandsFromDirectory(directoryPath: string): void {
    const readFilesRecursively = (dir: string): string[] => {
      const files = fs.readdirSync(dir);
      let result: string[] = [];

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          result = result.concat(readFilesRecursively(filePath));
        } else if (fs.statSync(filePath).isFile() && filePath.endsWith('.js')) {
          result.push(filePath);
        }
      });

      return result;
    };

    const commandFiles = readFilesRecursively(directoryPath);

    commandFiles.forEach((filePath) => {
      const commandModule = require(filePath);
      if (commandModule instanceof Command) {
        this.addCommand(commandModule);
      } else {
        console.warn(`Skipping invalid command file: ${filePath}`);
      }
    });
  }
  parse(input: string): void {
    const [commandName, ...subcommands] = input.split(' ');
    const command = this.commands.get(commandName);

    if (command) {
      command.execute(subcommands);
    } else {
      console.log(`Unknown command: ${commandName}`);
    }
  }
  startInputLoop(prompt: string): void {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: prompt
  });
      rl.prompt();
      rl.on('line', (line: string) => {
          if (line === 'exit') {
              rl.close();
          }
          this.parse(line);
          rl.prompt();
      });
      rl.on('close', () => {
          console.log('Have a great day!');
          process.exit(0);
      })
    }
}
