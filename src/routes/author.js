const authorController = require('../controllers/author');

const routes = [
    {
        method: 'POST',
        url: '/list',
        schema: {
            tags: ['Authors'],
            summary: 'Gets the List of Authors',
            description: 'Returns the List of Authors',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        totalCount: {type: 'number'},
                        data: {
                            type: 'array',
                            description: '',
                            items: {
                                type: 'object',
                                properties: {
                                    _id: {
                                        type: 'string',
                                        description: 'Author Id'
                                    },
                                    name: {type: 'string', description: 'Author Name'}
                                }
                            }
                        }
                    },
                    example: {
                        _id: '5bab85296e9a75219ff7d0a3',
                        name: 'Angus Young'
                    }
                }
            }
        },
        handler: authorController.authorsGet
    }
];
module.exports = async function(fastify, opts, next) {
    routes.forEach(route => {
        fastify.route(route);
    });
};
