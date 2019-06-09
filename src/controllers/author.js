module.exports.authorsGet = async function(req, res) {
    const db = this.mongo.db;

    try {
        const p = await db
            .collection('authors')
            .find({...req.body.filter})
            .sort(
                req.body.sortField
                    ? {[req.body.sortField]: req.body.sortOrder === 'descend' ? -1 : 1}
                    : {}
            )
            .skip((req.body.page - 1) * req.body.results || 0)
            .limit(req.body.results || 1000)
            .toArray();
        const count = await db.collection('authors').count();
        res.send({totalCount: count, data: p});
    } catch (err) {
        res.status(500).send(err);
    }
};
