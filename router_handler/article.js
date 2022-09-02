// 导入数据库操作模块
const db = require('../db/index')
// 导入处理路径的 path 核心模块
const path = require('path')


// 发布文章
module.exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！');
    // TODO：表单数据合法，继续后面的处理流程...

    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    };

    const sql = `insert into ev_articles set ?`;
    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')

        // 发布文章成功
        res.cc('发布文章成功', 0)
    });
}

// 获取文章列表
module.exports.getArticle = (req, res) => {
    let data = [];
    let sql = 'select art.Id,art.title,art.pub_date,art.state,cate.name as cate_name from ev_articles art  left join ev_article_cate cate on art.cate_id = cate.id where art.is_delete!=1 ';
    if (req.query.cate_id && req.query.state) {
        sql = sql + 'and art.cate_id =? and art.state =?'
        data.push(req.query.cate_id);
        data.push(req.query.state);
    } else if (req.query.state) {
        sql = sql + 'and art.state =?'
        data.push(req.query.state);
    } else if (req.query.cate_id) {
        sql = sql + 'and art.cate_id =?'
        data.push(req.query.cate_id);
    };
    db.query(sql, data, (err, results) => {
        if (err) return res.cc(err);
        // 搞了一个算法，动态显示刷新第几页第几页
        let data = [];
        const qishi = (req.query.pagenum - 1) * req.query.pagesize;
        if ((+req.query.pagesize + qishi) > results.length) {
            data = results.slice(qishi);
        } else {
            data = results.slice(qishi, (+req.query.pagesize + qishi));
        }

        //发送
        res.send({
            status: 0,
            message: '获取文章列表成功！',
            data: data,
            total: results.length,
        });
    });
}

// 删除文章
module.exports.deleteArticleById = (req, res) => {
    const sql = 'select * from ev_articles where is_delete!=1 and id=?';
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('未找到该文章！');
        // 可以开始修改 is_delete 了
        const sql = 'update ev_articles set is_delete = 1 where id=?';
        db.query(sql, req.params.id, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc('删除失败！');
            return res.cc('删除成功', 0);
        });
    });
};