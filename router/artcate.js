const express = require('express');
const router = express.Router();

// 应用模块
const artcate_handler = require('../router_handler/artcate');

// joi验证
const expressJoi = require('@escook/express-joi');
const {
    add_cate_schema,
    delete_cate_schema,
    get_cate_schema,
    update_cate_schema,
} = require('../schema/artcate');



// 分类列表
router.get('/cates', artcate_handler.getArticleCates);

// 新增分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates);

// 删除分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById);

// 根据id 获取分类数据
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById);

// 根据id 更新分类数据
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById);

module.exports = router;