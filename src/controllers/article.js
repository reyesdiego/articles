module.exports.articleGetById = async function(req, res) {
    const db = this.mongo.db;
    const ObjectId = this.mongo.ObjectId;

    try {
        return await db
            .collection('articles')
            .findOne({_id: new ObjectId(req.params.id), deleted_at: {$exists: false}});
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.articleGet = async function(req, res) {
    const db = this.mongo.db;

    const filter = {};
    if (req.body.title) {
        filter.title = req.body.title;
    }
    try {
        const p = await db
            .collection('articles')
            .find({...filter, deleted_at: {$exists: false}})
            .sort({[req.body.sortField]: req.body.sortOrder === 'descend' ? -1 : 1})
            .skip((req.body.page - 1) * req.body.results || 0)
            .limit(req.body.results || 1000)
            .toArray();
        const count = await db.collection('articles').count({deleted_at: {$exists: false}});
        res.send({totalCount: count, data: p});
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.articleCreate = async function(req, res) {
    const db = this.mongo.db;
    const ObjectId = this.mongo.ObjectId;

    const date = new Date();
    const article = {...req.body, created_at: date, updated_at: date};

    try {
        const newArticle = await db.collection('articles').insertOne(article);
        return await db.collection('articles').findOne({_id: new ObjectId(newArticle.insertedId)});
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.articleUpdate = async function(req, res) {
    const db = this.mongo.db;
    const ObjectId = this.mongo.ObjectId;

    const article = {...req.body, updated_at: new Date()};
    const id = article._id;
    delete article._id;

    try {
        const response = await db.collection('articles').findOneAndUpdate(
            {_id: new ObjectId(id), deleted_at: {$exists: false}},
            {$set: article},
            {
                returnOriginal: false
            }
        );
        return response.value;
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.articleDelete = async function(req, res) {
    const db = this.mongo.db;
    const ObjectId = this.mongo.ObjectId;

    const id = req.body._id;
    delete req.body._id;

    try {
        const response = await db
            .collection('articles')
            .updateOne(
                {_id: new ObjectId(id), deleted_at: {$exists: false}},
                {$set: {deleted_at: new Date()}}
            );
        return response;
    } catch (err) {
        res.status(500).send(err);
    }
};
