const {Router} = require('express');
const router = Router();
const swiperModel = require('../model/swiper');
const auth = require('./auth');

router.post('/', auth, async (req, res, next) => { //添加轮播图
    try {
        let {
            img,
            title,
            newsId,
            sort,
            status
        } = req.body;
        const swiperData = await swiperModel.create({
            img,
            title,
            newsId,
            sort,
            status
        });
        res.json({
            code: 200,
            data: swiperData,
            msg: '新建轮播图成功'
        })
    } catch (err) {
        next(err)
    }
});

router.get('/', async (req, res, next) => { // 获得轮播图
    try {
        let {page, page_size} = req.query;
        page = parseInt(page);
        page_size = parseInt(page_size);

        const dataList = await swiperModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({sort: -1, _id: -1})
            .populate({
                path: 'newsId',
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
router.get('/:id', async (req, res, next) => { // 获取某条轮播图
    try {
        const {id} = req.params

        const data = await swiperModel
            .findById(id)

        res.json({
            code: 200,
            data: data,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
});

router.patch('/:id', auth, async (req, res, next) => { // 修改某条轮播图
    try {
        const {id} = req.params;
        const {
            img,
            title,
            newsId,
            sort,
            status
        } = req.body;

        const data = await swiperModel.findById(id);
        const updateData = await data.update({$set: {
                img,
                title,
                newsId,
                sort,
                status
            }})
        res.json({
            code: 200,
            data: updateData,
            msg: '修改成功'
        })
    } catch (err) {
        next(err)
    }
});
router.delete('/:id', async (req, res, next) => { // 删除某条轮播图
    try {
        const {id} = req.params
        const data = await swiperModel
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