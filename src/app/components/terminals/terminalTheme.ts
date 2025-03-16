export const backgroundTheme = {
    'black': "0, 0, 0",
    'white': "255, 255, 255",
    'gray': "128, 128, 128",
    'red': "255, 0, 0",
    'green': "0, 255, 0",
    'blue': "0, 0, 255",
    'yellow': "255, 255, 0",
    'cyan': "0, 255, 255",
    'magenta': "255, 0, 255",
    'orange': "255, 165, 0",
    'pink': "255, 192, 203",
    'purple': "128, 0, 128",
    'brown': "165, 42, 42",
    'darkRed': "139, 0, 0",
    'darkGreen': "0, 100, 0",
    'darkBlue': "0, 0, 139",
    'lightGray': "211, 211, 211",
    'darkGray': "169, 169, 169",
    'pastelBlue': "173, 216, 230",
    'pastelGreen': "152, 251, 152",
    'pastelYellow': "255, 255, 153",
    'pastelPink': "255, 182, 193"
}


export const terminalTheme = (color = 'black', opacity = 0.3) => {
    return `rgba(${backgroundTheme[color]}, ${opacity})`
}