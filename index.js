//@ts-check
'use strict';
const settings = require('./settings');
const PORT = parseInt(process.env.PORT) || settings.api.port;

const fastify = require('fastify')({
    logger: true
});
const swagger = require('./src/config/swagger');

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

const start = async () => {
    try {
        // Import Swagger Options
        fastify
            .register(require('fastify-cors'), {})
            .register(require('fastify-compress'), {global: false})
            .register(require('fastify-mongodb'), {
                forceClose: true,
                url: settings.mongo.url
            })
            .register(require('./src/routes/server'));
        // .register(require('./src/routes/download'), {prefix: '/download'})
        // .register(require('./src/routes/report'), {prefix: '/reports'})
        // .register(require('./src/routes/statistic'), {prefix: '/statistics'})
        // .register(require('./src/routes/webflow'), {prefix: '/webflow'});

        await fastify
            .listen(PORT, '::')
            .then(address => console.log(`server listening on ${address}`))
            .catch(err => {
                console.log('Error starting server:', err);
                process.exit(1);
            });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
