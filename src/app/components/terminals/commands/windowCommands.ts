const windowCommands = {
    "help": {
        description: "Displays the list of all available commands",
        output: "Available commands: help, clear, aboutme, echo",
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
    }
}

export { windowCommands }