//TODO make the function a general function collectionGetById
module.exports.articleGetById = async function(req, res) {
    const db = this.mongo.db;
    const ObjectId = this.mongo.ObjectId;

    const aggregate = [
        {$match: {_id: ObjectId(req.params.id), deleted_at: {$exists: false}}},
        {
            //TODO make the join a param
            $lookup: {
                from: 'authors',
                localField: 'authors',
                foreignField: '_id',
                as: 'authors'
            }
        }
    ];

    try {
        const result = await db
            .collection('articles') //TODO make model name a param
            .aggregate(aggregate)
            .toArray();
        return result[0];
    } catch (err) {
        res.status(500).send(err);
    }
};
//TODO make the function a general function collectionGet
module.exports.articleGet = async function(req, res) {
    const db = this.mongo.db;
    const ObjectId = this.mongo.ObjectId;
    const filter = req.body.filters || {};

    if (filter.filters && filter.filters.authors) {
        //TODO work on this filter on the client side in order to have a better and common collectionGet function
        if (filter.filters.authors.length) {
            filter.filters = {
                authors: {$in: filter.filters.authors.map(x => ObjectId(x))}
            };
        } else {
            delete filter.filters.authors;
        }
    }
    const aggregate = [
        {$match: {...filter.filters, deleted_at: {$exists: false}}},
        // {$match: {authors: [ObjectId('5cfe9740222c4d96757d67ea')], deleted_at: {$exists: false}}},
        {
            $lookup: {
                from: 'authors',
                localField: 'authors',
                foreignField: '_id',
                as: 'authors'
            }
        },
        {$sort: {[req.body.sortField]: req.body.sortOrder === 'descend' ? -1 : 1}},
        {$skip: (req.body.page - 1) * req.body.results || 0},
        {$limit: req.body.results || 1000}
    ];
    try {
        const data = await db
            .collection('articles')
            .aggregate(aggregate)
            .toArray();

        const count = await db.collection('articles').count({deleted_at: {$exists: false}});
        res.send({totalCount: count, data: data});
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.articleCreate = async function(req, res) {
    const db = this.mongo.db;
    const ObjectId = this.mongo.ObjectId;

    const date = new Date();
    const article = {...req.body, created_at: date, updated_at: date};

    if (article.authors) {
        article.authors = article.authors.map(x => ObjectId(x));
    }

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

    if (article.authors) {
        article.authors = article.authors.map(x => ObjectId(x));
    }
    try {
        await db
            .collection('articles')
            .updateOne({_id: new ObjectId(id), deleted_at: {$exists: false}}, {$set: article});

        const aggregate = [
            {$match: {_id: new ObjectId(id), deleted_at: {$exists: false}}},
            {
                $lookup: {
                    from: 'authors',
                    localField: 'authors',
                    foreignField: '_id',
                    as: 'authors'
                }
            }
        ];
        const result = await db
            .collection('articles')
            .aggregate(aggregate)
            .toArray();
        return result[0];
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
