const express = require('express');
const router = express.Router();
const auth = require('./auth');
const topicModel = require('../model/topic');

router.post('/', auth, async (req, res, next) => {
    try {
        const {content} = req.body;
        const userId = req.session.user._id;

        const topic = await topicModel.create({
            user: userId,
            content
        })
        res.json({
            code: 200,
            data: topic,
            msg: 'success'
        })

    } catch (err) {
        next(err)
    }
});
router.get('/', auth, async (req, res, next) => {
    try {
        let {page = 1, page_size = 10} = req.query;
        page = parseInt(page);
        page_size = parseInt(page_size);
        const count = await topicModel.count();
        const dataList = await topicModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})
            .populate({
                path: 'user',
                select: 'username avatar'
            });

        res.json({
            code: 200,
            data: dataList,
            msg: 'success',
            count
        })
    } catch (err) {
        next(err)
    }
});

module.exports = router;