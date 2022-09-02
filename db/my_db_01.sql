/*
 Navicat Premium Data Transfer

 Source Server         : 本地mysql 8.0
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : my_db_01

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 02/09/2022 12:55:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ev_article_cate
-- ----------------------------
DROP TABLE IF EXISTS `ev_article_cate`;
CREATE TABLE `ev_article_cate`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '数据是否标记删除\\n0 没有被删除\\n1 被删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE,
  UNIQUE INDEX `name_UNIQUE`(`name`) USING BTREE,
  UNIQUE INDEX `alias_UNIQUE`(`alias`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文章分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ev_article_cate
-- ----------------------------
INSERT INTO `ev_article_cate` VALUES (1, '科技', 'KeJi', 0);
INSERT INTO `ev_article_cate` VALUES (2, '历史', 'LiShi', 0);
INSERT INTO `ev_article_cate` VALUES (3, '新闻', 'news', 0);
INSERT INTO `ev_article_cate` VALUES (4, '测试1', 'test1', 1);
INSERT INTO `ev_article_cate` VALUES (8, '新闻2', 'news2', 1);
INSERT INTO `ev_article_cate` VALUES (9, '测试3', 'test3', 1);
INSERT INTO `ev_article_cate` VALUES (10, '测试4', 'test4', 1);
INSERT INTO `ev_article_cate` VALUES (11, '测试5', 'test5', 1);

-- ----------------------------
-- Table structure for ev_articles
-- ----------------------------
DROP TABLE IF EXISTS `ev_articles`;
CREATE TABLE `ev_articles`  (
  `Id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cover_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pub_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `cate_id` int(0) NOT NULL,
  `author_id` int(0) NOT NULL,
  PRIMARY KEY (`Id`) USING BTREE,
  UNIQUE INDEX `Id_UNIQUE`(`Id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '文章表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ev_articles
-- ----------------------------
INSERT INTO `ev_articles` VALUES (1, 'test1', '<p>5</p>', '\\uploads\\e7f7367944c8af5b2be084d6bd12d3e6', '2022-09-01 20:29:49.305', '已发布', 1, 2, 5);
INSERT INTO `ev_articles` VALUES (2, 'test1', '<p>test1</p>', '\\uploads\\be8bf42e84611d218ca13ae99ee7088e', '2022-09-01 20:31:12.395', '已发布', 1, 1, 5);
INSERT INTO `ev_articles` VALUES (3, 'test1', '<p>t</p>', '\\uploads\\78d06d22b32f40ca39018f247c6a3b5b', '2022-09-01 20:32:49.826', '已发布', 0, 1, 5);
INSERT INTO `ev_articles` VALUES (4, 'test1', '<p>t</p>', '\\uploads\\25b81e236a5cbf86022679f1fe50317c', '2022-09-01 20:34:45.796', '已发布', 0, 1, 5);
INSERT INTO `ev_articles` VALUES (5, 'test...', '<p>test11212</p>', '\\uploads\\8c7d4bafb7ef6c98b789be1c4a33d57c', '2022-09-02 12:46:37.177', '已发布', 0, 3, 5);

-- ----------------------------
-- Table structure for ev_users
-- ----------------------------
DROP TABLE IF EXISTS `ev_users`;
CREATE TABLE `ev_users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE,
  UNIQUE INDEX `username_UNIQUE`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ev_users
-- ----------------------------
INSERT INTO `ev_users` VALUES (1, 'test1', '123456', '阿芳', '123456@qq.com', NULL);
INSERT INTO `ev_users` VALUES (2, 'test2', '123456', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (3, 'test3', '$2a$10$fupAfydEN/.nXQYjfNGLuu502k.JKNcXOwrexRr7qC2XCpQEuoxaa', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (5, 'test', '$2a$10$17zXt1PGb02c8edVJeQzT.r.Iy/5x6qijh3/Z0UqgWNyUZCVyn9l.', '小龙人', '11011@qq.com', 'data:image/png;base64,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');
INSERT INTO `ev_users` VALUES (9, 'test4', '$2a$10$o94voFbRCYzHDGyuc/LIOOZXyVg2IjBa82MfAYDodtuar05eRDyhe', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (10, 'test5', '$2a$10$C6lZJydH7p1KTIt6RGQGxevrZKNMxCgp3Pmxs.UdGrSiLpdK1jr3y', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (11, 't', '$2a$10$QvjjCBEAb1ZYr.Vrq6Nt6.EsOpMN6KWT3dmHBTduKw4ws9om9a6.W', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '这是用户信息唯一标识',
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户登录名',
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户登录密码',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '用户的状态，是一个布尔值\n0 表示用户状态正常\n1 表示用户被禁用',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE,
  UNIQUE INDEX `username_UNIQUE`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '张三', '123456', 0);
INSERT INTO `users` VALUES (2, '赵云', '123456', 1);
INSERT INTO `users` VALUES (3, '关羽', '098123', 0);
INSERT INTO `users` VALUES (4, 'tony statrk', '098123', 0);
INSERT INTO `users` VALUES (14, '马超', '321', 0);
INSERT INTO `users` VALUES (15, '张良', '123', 0);

SET FOREIGN_KEY_CHECKS = 1;
