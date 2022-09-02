// 写规则
const joi = require('@hapi/joi');


// 查询分类名称 和 分类别名 的校验规则
const name = joi.string().required();
// alphanum 这个得是字母数字 
const alias = joi.string().alphanum().required();
module.exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}

// 删除分类规则
const id = joi.number().integer().min(1).required();
module.exports.delete_cate_schema = {
    params: {
        id,
    }
}

// 根据id获取分类数据
module.exports.get_cate_schema = {
    params: {
        id,
    }
}

// 根据id 更新分类数据
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}