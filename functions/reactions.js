module.exports = {
    name: 'reactions',
    description: 'react to messages',

    async execute(message, client) {

        let randomNumber = Math.floor(Math.random() * 500) + 1;
        let m = message.content.toLowerCase();
        function emoji(emojiName) {
            return client.emojis.cache.find(emoji => emoji.name === emojiName)
        }

        function has(possible, emojiReact) {
            possible.forEach(item => {
                if (m.includes(item)) return message.react(emoji(emojiReact))
            })
        }

        if (randomNumber > 450) {
            if (has(['pog'], 'pogChamp')) {

            } else if (has(['cool'], 'cool_cowboy')) {
    
            } else if (has(['nice', 'noice'], 'nice')) {
    
            } else if (has(['congrats', 'congrat', 'congratulations', 'well done', 'clap'], 'hdclapparty')) {
    
            } else if (has(['netflix', 'cheese', 'crackers'], 'netflixAndCrackers')) {
    
            } else if (has(['epic'], 'veryepic')) {
    
            }
        }
    }
}