const cote = require('cote'),
    timeService = new cote.Responder({ name: 'Time Service' });

timeService.on('time', (req, cb) => {
    cb(new Date());
})