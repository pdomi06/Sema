const { ActionRowBuilder } = require("discord.js")

module.exports = (buttons) => {
    let row = new ActionRowBuilder();

    for (let a = 0; a < buttons.length && a < 25; ++a) {
        if (a % 5 === 0 && a > 0) {
            components.push(row);
            row = new ActionRowBuild(0);
        }

        row.addComponents(buttons[a]);
    }

    if (row.components.length > 0) {
        components.push(row);
    }

    return components;
}