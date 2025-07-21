class MariesTerminal extends HTMLElement {
  constructor() {
    super();
    this.outputElement = null;
    this.commands = [
      "git pull",
      "ddev start",
      "ddev robo dev:refresh",
      "ddev drush cex -y",
      "ddev ssh",
      "platform ssh -p haxor42069 -e staging",
      "yarn start",
      "yarn add stylus",
      "npm run dev",
      "less intro.txt"
    ];

    this.finalMessage = `<br><br>After two decades I still find it hard to explain exactly what it is that I do. Sure, I can list out the _things_ — multi-medium designer, writer, strategist, creative director, front-end engineer, full-stack Drupal engineer, account lead, design lead, engineering manager — but I bet that read as impossible, hunh? Instead, I'll try and explain what makes me unique by listing my superpowers instead:<br><br>
    - My hyper-fixation is psychology and neurology especially at the nexus of pattern recognition and human universalities. I can listen to (and loud talk about) Brian Sapolsky and Isabel Wilkerson for days.<br><br>
    - A need for perfection mixed with cPTSD means no idea is a dumb, impossible, or too-expensive idea. However, it may require phased, roadmapped, and exhaustively documented so as to make info dissemination hyper-legible and comfy.<br><br>
    - Growing up, it was a requirement that my brothers and I fix and maintain our own cars (which were always lemons). I learned early on that diagnosing and resolving hard problems requires asking for help, practice, a talent for being able to hear/feel the problem, and a thirst to understand every inch of a thing.<br><br>
    - I am a self-proclaimed _mierenneuker_ and this affects everything from my ability to enjoy the typesetting of a fine dining menu to a feature merge request.`;
  }

  connectedCallback() {
    this.outputElement = this.querySelector(".terminal__output");
    if (this.outputElement) {
      this.executeCommands();
    }
  }

  // Type text one character at a time
  typeText(text, onComplete, speed = 30) {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        this.outputElement.innerHTML += text[i++];
        setTimeout(type, speed);
      } else {
        setTimeout(onComplete, 300); // Pause before deleting
      }
    };
    type();
  }

  // Delete text one character at a time
  deleteText(onComplete, speed = 15) {
    const erase = () => {
      if (this.outputElement.innerHTML.length > 0) {
        this.outputElement.innerHTML = this.outputElement.innerHTML.slice(0, -1);
        setTimeout(erase, speed);
      } else {
        setTimeout(onComplete, 250); // Pause before next command
      }
    };
    erase();
  }

  // Execute all the commands sequentially
  executeCommands(index = 0) {
    if (index < this.commands.length - 1) {
      this.typeText(this.commands[index], () => {
        this.deleteText(() => this.executeCommands(index + 1));
      });
    } else {
      // Last command stays, no untyping
      this.typeText(this.commands[index], () => {
        // Add a blank space after the last command
        this.outputElement.innerHTML += " ";

        // Directly add the final message after the last command
        setTimeout(() => {
          this.outputElement.innerHTML += this.finalMessage;
          this.restartLoop();
        }, 200); // Pause before appending final message
      });
    }
  }

  // Restart the typing loop
  restartLoop() {
    setTimeout(() => {
      this.deleteText(() => this.executeCommands()); // Restart the sequence
    }, 20000); // 20-second pause before reset
  }
}

// Define the custom element
customElements.define("maries-terminal", MariesTerminal);
