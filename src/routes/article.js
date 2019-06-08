const articleController = require('../controllers/article');

const article = {
    title: {
        type: 'string',
        description: 'Article Title',
        minLength: 2
    },
    short_description: {
        type: 'string',
        description: 'Article Short Description'
    },
    long_description: {
        type: 'string',
        description: 'Article Short Description'
    },
    created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Article Creation Date'
    },
    updated_at: {
        type: 'string',
        format: 'date-time',
        description: 'Article Update Date'
    },
    deleted_at: {
        type: 'string',
        format: 'date-time',
        description: 'Article Deletion Date'
    },
    authors: {
        type: 'string',
        description: 'Article Authors'
    }
};

const routes = [
    {
        method: 'GET',
        url: '/:id',
        schema: {
            tags: ['Articles'],
            summary: 'Gets an Article by Id',
            description: 'Returns the Article',
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Article Id'
                    }
                }
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Article Title'
                        },
                        ...article
                    },
                    example: {
                        _id: '5bab85296e9a75219ff7d0a3',
                        title: 'First Article',
                        short_description: 'This is a Short Description of the First Article',
                        long_description:
                            'This is a Long Description of the First Article, his is a Long Description of the First Article, his is a Long Description of the First Article',
                        createdAt: '2018-09-26T13:10:01.471Z',
                        updatedAt: '2018-09-26T13:10:01.471Z',
                        authors: 'Diego Reyes'
                    }
                }
            }
        },
        handler: articleController.articleGetById
    },
    {
        method: 'GET',
        url: '/',
        schema: {
            tags: ['Articles'],
            summary: 'Gets an List of Articles by Title and/or Authors',
            description: 'Returns the Articles List',
            response: {
                200: {
                    description: 'Successful response',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                                description: 'Article Title'
                            },
                            ...article
                        }
                    },
                    example: [
                        {
                            _id: '5bab85296e9a75219ff7d0a3',
                            title: 'First Article',
                            short_description: 'This is a Short Description of the First Article',
                            long_description:
                                'This is a Long Description of the First Article, his is a Long Description of the First Article, his is a Long Description of the First Article',
                            createdAt: '2018-09-26T13:10:01.471Z',
                            updatedAt: '2018-09-26T13:10:01.471Z',
                            authors: 'Diego Reyes'
                        },
                        {
                            _id: '5bab85296e9a75219ff7d0a3',
                            title: 'First Article',
                            short_description: 'This is a Short Description of the First Article',
                            long_description:
                                'This is a Long Description of the First Article, his is a Long Description of the First Article, his is a Long Description of the First Article',
                            createdAt: '2018-09-26T13:10:01.471Z',
                            updatedAt: '2018-09-26T13:10:01.471Z',
                            authors: 'Diego Reyes'
                        }
                    ]
                }
            }
        },
        handler: articleController.articleGet
    },
    {
        method: 'POST',
        url: '/',
        schema: {
            tags: ['Articles'],
            summary: 'Creates an Article',
            description: 'Returns the new Article',
            body: {
                type: 'object',
                required: ['title'],
                properties: article
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Article Title'
                        },
                        ...article
                    },
                    example: {
                        _id: '5bab85296e9a75219ff7d0a3',
                        title: 'First Article',
                        short_description: 'This is a Short Description of the First Article',
                        long_description:
                            'This is a Long Description of the First Article, his is a Long Description of the First Article, his is a Long Description of the First Article',
                        createdAt: '2018-09-26T13:10:01.471Z',
                        updatedAt: '2018-09-26T13:10:01.471Z',
                        authors: 'Diego Reyes'
                    }
                }
            }
        },
        handler: articleController.articleCreate
    },
    {
        method: 'PUT',
        url: '/',
        schema: {
            tags: ['Articles'],
            summary: 'Updates an Article',
            description: 'Returns the Updated Article',
            body: {
                type: 'object',
                required: ['_id', 'title'],
                properties: {
                    _id: {
                        type: 'string',
                        description: 'Article Title'
                    },
                    ...article
                }
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Article Title'
                        },
                        ...article
                    },
                    example: {
                        _id: '5bab85296e9a75219ff7d0a3',
                        title: 'First Article',
                        short_description: 'This is a Short Description of the First Article',
                        long_description:
                            'This is a Long Description of the First Article, his is a Long Description of the First Article, his is a Long Description of the First Article',
                        createdAt: '2018-09-26T13:10:01.471Z',
                        updatedAt: '2018-09-26T13:10:01.471Z',
                        authors: 'Diego Reyes'
                    }
                }
            }
        },
        handler: articleController.articleUpdate
    },
    ,
    {
        method: 'PATCH',
        url: '/',
        schema: {
            tags: ['Articles'],
            summary: 'Delete an Article',
            description: 'Returns the Deleted Article Id',
            body: {
                type: 'object',
                required: ['_id'],
                properties: {
                    _id: {
                        type: 'string',
                        description: 'Article Title'
                    }
                }
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Article Title'
                        },
                        deleted_at: {
                            type: 'string',
                            format: 'date-time'
                        }
                    },
                    example: {
                        _id: '5bab85296e9a75219ff7d0a3',
                        deleted_at: '2019-04-04T12:20:24-03:00'
                    }
                }
            }
        },
        handler: articleController.articleDelete
    }
];

module.exports = async function(fastify, opts, next) {
    routes.forEach(route => {
        fastify.route(route);
    });
};
