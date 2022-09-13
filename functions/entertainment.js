module.exports = {
    name: 'entertainment',
    description: 'entertainnnnn',

    async execute(message, client) {
        if (message.channel.id !== '727990054026346496') return;
        
        let randomNumber = Math.floor(Math.random() * 1000);
        const randomQuestion = require('random-question');
        let question = randomQuestion.randomQuestion();

        if (randomNumber > 995) message.channel.send(`**Random Question:**\n${`${question}`.slice(1, )}`);
    }
}