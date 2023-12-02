export class Command {
    constructor(
      public name: string,
      public description: string,
      public execute: (subcommands: string[]) => void
    ) {}
  }