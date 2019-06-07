const settings = require('../../settings');

exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Articles - API',
            description: 'Micro Service with Article routes',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: `localhost:${process.env.PORT || settings.api.port}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
};
