# 🤖 Sema the ultimate Server-manager 🎵

[![Discord Server](https://img.shields.io/discord/123456789012345678?color=7289DA&label=Discord&logo=discord&logoColor=ffffff)](https://discord.gg/invite/fVCZEmgws5)
[![DeepSource](https://app.deepsource.com/gh/pdomi06/Sema.svg/?label=active+issues&show_trend=true&token=8Dns4wboJzsClyuwwuG5XqFv)](https://app.deepsource.com/gh/pdomi06/Sema/)

## 📝 Project Description

This project is a Discord bot with several features, including system logging, music playing from various sources such as YouTube, Spotify, and SoundCloud. The bot is designed to enhance the user experience on Discord servers by providing useful and entertaining features. This README file serves as documentation for the project, providing information on how to use and configure the bot.

## 🚀 Features

- 🎵 22 music command to listen your favourite music while playing/talking
- 📜 Audit log in text channel
- 💬 Some extra simple commands

## 🛠️ Installation

**Before you begin:**

This guide does not cover setting up MongoDB, obtaining your Discord token, or generating your Genius API key. Ensure you have these ready before proceeding. If any of these values are missing or incorrect in your `.env` file, the bot might not start or function properly.

1. Clone the repository
2. Install the dependencies with `npm install`
3. Create a `.env` file with your values:

```
CLIENTID=<Your application id>
GUILDID=<Your default guild id>
AUTHOR=<Your username>
AUTHOR_IMG=<Your image link>
RED=870707
GREEN=357F1E
YELLOW=ABAD0D
DEF_COLOR=<Your color>
TOKEN=<Your token>
MONGO_URI=<Yout mongo URI>
GENIUS_API=<Your API>
```

4. Run `dp.js` with your guild ID to set up the application integration
5. Run the bot with `node .` or `node <file_name>`

## 📖 Usage

- 🎶 To listen to music, use the `/play` command followed by the name of the song or a YouTube/Soundcloud/Spotify link.
- 📝 To setup the log system, use the `/setup_log` command followed by the name of the channel.

## 🤝 Contributing

Welcome to our project! We appreciate your interest in contributing to our repository. Here are some guidelines to follow:

1. Fork the repository and create a new branch for your changes.
2. Make your changes and ensure that they are properly tested.
3. Submit a pull request with a clear description of your changes and why they are necessary.
4. Be responsive to feedback and be willing to make changes if necessary.

## 🔍 Looking For

We are looking for contributions in the following areas:

1. More localization, including language options and multi-language commands.
2. Additional music commands to enhance the user experience.
3. Optimizations to improve performance and efficiency.

Your contributions are highly appreciated!

Thank you for your contributions! 🙏
