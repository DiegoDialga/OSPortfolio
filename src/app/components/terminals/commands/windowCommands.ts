const windowCommands = {
    "help": {
        description: "Displays the list of all available commands",
        output: "Available commands: help, description, clear, aboutme, echo, gmail, projects, socials, portfolio, exit",
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
        output: "DiegoDialga.github.io"
    },
    "projects": {
        description: "Display all the projects I have made",
        output: "This command is not available yet. But will be added soon."
    },
    "socials": {
      description: "Displays my social links",
        output: `-> Github\t\t\thttps://github.com/DiegoDialga\n
        -> Twitter(X)\t\t\thttps://x.com/commenter_d\n
        -> Instagram\t\t\thttps://www.instagram.com/deepanshunegi10\n`
    },
    "exit": {
        description: "Exits the terminal screen",
        output: "Bye Bye!"
    }
}

export { windowCommands }