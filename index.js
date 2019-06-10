//@ts-check
'use strict';
const settings = require('./settings');
const PORT = parseInt(process.env.PORT) || settings.api.port;

const fastify = require('fastify')({
    logger: true
});
const swagger = require('./src/config/swagger');

fastify.register(require('fastify-swagger'), swagger.options);

const start = callback => {
    try {
        fastify
            .register(require('fastify-cors'), {})
            .register(require('fastify-compress'), {global: false})
            .register(require('fastify-mongodb'), {
                forceClose: true,
                url: settings.mongo.url
            })
            .register(require('./src/routes/server'))
            .register(require('./src/routes/article'), {prefix: '/article'})
            .register(require('./src/routes/author'), {prefix: '/author'});

        fastify
            .listen(PORT, '::')
            .then(address => {
                console.log(`server listening on ${address}`);
                if (callback) callback(null, fastify);
            })
            .catch(err => {
                console.log('Error starting server:', err);
                process.exit(1);
            });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
if (require.main === module) {
    start();
}
module.exports = {start};
