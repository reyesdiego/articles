//@ts-check

const routes = [
    {
        method: 'GET',
        url: '/',
        schema: {
            summary: 'Articles API',
            description: 'Test server',
            tags: ['Server'],
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        hi: {type: 'string'}
                    },
                    example: {
                        hi: 'there'
                    }
                }
            }
        },
        handler: async function(req, res) {
            return {hi: 'there'};
        }
    }
];

module.exports = async function(fastify, opts, next) {
    routes.forEach(route => {
        fastify.route(route);
    });
};
