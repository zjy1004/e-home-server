const {Router} = require('express');
const router = Router();
const categoryModel = require('../model/category');
const auth = require('./auth')

router.post('/', auth, async (req, res, next) => { // 添加分类
    try {
        let {
            title,
            icon
        } = req.body;
        const data = await categoryModel.create({
            title,
            icon
        });
        res.json({
            code: 200,
            data: data,
            msg: '分类新建成功'
        })
    } catch (err) {
        next(err)
    }
});
router.get('/', async (req, res, next) => { // 获取分类
    try {
        const dataList = await categoryModel.find();
        res.json({
            code: 200,
            data: dataList,
            msg: 'success'
        })
    } catch (err) {
        next(err)
    }
});
router.delete('/:id', async (req, res, next) => { // 删除分类
    try {
        const {id} = req.params
        const data = await categoryModel
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
router.patch('/:id', auth, async (req, res, next) => { // 修改某条分类
    try {
        const {id} = req.params;
        const {
            title,
            icon
        } = req.body;

        const data = await categoryModel.findById(id);
        const updateData = await data.update({$set: {
                title,
                icon
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


module.exports = router;