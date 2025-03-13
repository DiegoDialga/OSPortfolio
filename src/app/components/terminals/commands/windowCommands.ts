const windowCommands = {
    "help": {
        description: "Displays the list of all available commands",
        output: "Available commands: help, clear, aboutme, echo, gmail, portfolio, exit",
    },
    "clear": {
        description: "Clears the terminal screen",
        output: null
    },
    "aboutme": {
        description: "about The developer of this terminal",
        output: `Hi, my name is Deepanshu!\n
        I am a software Developer based in India.\n
        Passionate about sleeping and solving complex problems after sleeping.\n
        Note: Sleep is important.`
    },
    "echo": {
        description: "Echo everything you write.",
        output: null
    },
    "gmail": {
        description: "Gmail address of the developer",
        output: "deepanshunegi10@gmail.com"
    },
    "portfolio": {
        description: "Portfolio website of the developer",
        output: "Diegoalga.github.io"
    },
    "exit": {
        description: "Exits the terminal screen",
        output: "Bye Bye!"
    }
}

export { windowCommands }