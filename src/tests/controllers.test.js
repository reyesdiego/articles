const t = require('tap');
const test = t.test;
const request = require('request');
const server = require('../../index.js');

// Run the server
server.start((err, fastify) => {
    t.error(err);

    test('The server should start', t => {
        t.plan(4);
        // Perform the request
        request(
            {
                method: 'GET',
                uri: `http://localhost:${fastify.server.address().port}`
            },
            (err, response, body) => {
                // Unit test
                t.error(err);
                t.strictEqual(response.statusCode, 200);
                t.strictEqual(response.headers['content-length'], '' + body.length);
                t.deepEqual(JSON.parse(body), {hi: 'there'});
                fastify.close();
            }
        );
    });
});
