const express = require('express');
const router = express.Router();
const auth = require('./auth');
const commonModel = require('../model/common');
const topicModel = require('../model/topic');

router.post('/', auth, async (req, res, next) => {
    try {
        const {
            content,
            topic_id
        } = req.body;
        const userId = req.session.user._id;
        let common;
        const topic = await topicModel.findById(topic_id);
        if (topic) {
            common = await commonModel.create({
                content,
                user: userId,
                topic: topic._id
            })

            await topic.update({$push: {common: common._id}});
            await topic.save();

            res.json({
                code: 200,
                data: common,
                msg: 'success'
            })
        } else {
            res.json({
                code: 400,
                msg: '没有该主题'
            })
        }
    } catch (err) {
        next(err)
    }
});
router.get('/getCommon/:topicId', auth, async (req, res, next) => {
    try {
        const topicId = req.params.topicId;

        const dataList = await commonModel
            .find({topic: topicId})
            .sort({_id: -1})
            .populate({
                path: 'user',
                select: 'username avatar'
            });

        res.json({
            code: 200,
            data: dataList,
            msg: 'success',
        })
    } catch (err) {
        next(err)
    }
});

module.exports = router;