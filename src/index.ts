#! /usr/bin/env node
import { defineCommand, runMain } from "citty";
import { mainCommand } from "./mainCommand";
import "./lib/db";
const main = defineCommand({
    meta: {
        name: "mtg-cardtracker",
        version: "1.0.0",
        description: "A simple command to track your MTG cards and estimate their value",
    },
    run: mainCommand,
})
runMain(main);