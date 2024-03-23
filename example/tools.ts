import { ToolConfig, Tools } from "../src/types";

const { exec } = require("child_process");
const fs = require("fs");

export const config: ToolConfig[] = [
  {
    type: "function",
    function: {
      name: "writeFile",
      description: "Writes content to a specified path.",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "The path to write to",
          },
          content: {
            type: "string",
            description: "The content to write",
          },
        },
        required: ["path", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "readFile",
      description: "Reads content from a specified path.",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "The path to read from",
          },
        },
        required: ["path"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "executeCommand",
      description: "Executes a bash command.",
      parameters: {
        type: "object",
        properties: {
          command: {
            type: "string",
            description: "The command to execute",
          },
        },
        required: ["command"],
      },
    },
  },
];

export const tools: Tools = {
  writeFile: ({ path, content }) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, (err: Error) => {
        if (err) {
          resolve(`Error writing to file: ${err.message}`);
        } else {
          resolve("File written successfully.");
        }
      });
    });
  },
  readFile: ({ path }) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err: Error, data: string) => {
        if (err) {
          resolve(`Error reading from file: ${err.message}`);
        } else {
          resolve(data);
        }
      });
    });
  },
  executeCommand: ({ command }) => {
    return new Promise((resolve, reject) => {
      exec(command, (error: Error, stdout: string, stderr: string) => {
        if (error) {
          resolve(`Error executing command: ${error.message}`);
        } else if (stderr) {
          resolve(`Command stderr: ${stderr}`);
        } else {
          resolve(stdout);
        }
      });
    });
  },
};
