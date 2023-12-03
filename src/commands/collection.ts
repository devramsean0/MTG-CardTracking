import { Command } from "../structures/command";
import { db } from "../lib/db";
const command = new Command("collection", "Manage your collection", async (subcommand) => {
    switch (subcommand[0]) {
        case "create":
            const name = subcommand[1];
            if (!name) return console.log("Please provide a name for your collection");
            console.log(`Creating collection ${name}`);
            await db.set(`collection-${name}`, {});
            console.log(`Collection ${name} created`);
        default:
            return console.log("Please provide a subcommand");
    }
});
module.exports = command;