const {Router} = require('express');
const router = Router();
const newsModel = require('../model/news');
const auth = require('./auth');

router.post('/', auth, async (req, res, next) => { // 添加新闻
    try {
        let {
            title,
            content,
            contentText,
            img,
            author,
            type
        } = req.body;
        const news = await newsModel.create({
            title,
            content,
            contentText,
            img,
            author,
            type,
        });
        res.json({
            code: 200,
            data: news,
            msg: '新闻新建成功'
        })
    } catch (err) {
        next(err)
    }
});

router.get('/', async (req, res, next) => { // 获取新闻
    try {
        let {page, page_size} = req.query;
        page = parseInt(page);
        page_size = parseInt(page_size);

        const dataList = await newsModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})
            .populate({
                path: 'author',
                select: '-password'
            })
            .populate({
                path: 'type'
            });

        res.json({
            code: 200,
            data: dataList,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
});
router.get('/:id', async (req, res, next) => { // 获取某条新闻
    try {
        const {id} = req.params;
        const data = await newsModel
            .findById(id)
            .populate({
                path: 'admin_user',
                select: '-password'
            })
            .populate({
                path: 'category'
            });
        res.json({
            code: 200,
            data: data,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
});
router.delete('/:id', async (req, res, next) => { // 删除某条新闻
    try {
        const {id} = req.params
        const data = await newsModel
            .findById(id)
            .remove()
        res.json({
            code: 200,
            data,
            msg: '删除成功'
        })
    } catch (err) {
        next(err)
    }
});



module.exports = router;