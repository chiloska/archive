const cote = require('cote'),
    client = new cote.Requester({ name: 'Client' });

client.send({ type: 'time' }, (time) => {
    console.log(time);
})