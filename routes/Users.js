const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/test',async (req,res) => {
  res.json({name:'蔡徐坤'})
})

// 注册
router.post("/register", async (req,res) => {
  const avatarUrl = "https://cdn.luogu.com.cn/upload/usericon/1.png";
  try {
    const userData = {
      nick_name: req.body.nick_name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      avatar: avatarUrl
    }
    // 检查是否注册过了
    const user = await Users.findOne({
      where: {
        [Op.or]: [{email: userData.email},{phone: userData.phone}]
      },
      // attributes: { exclude: ['id'] }
    })
    if(!user) {
      bcrypt.hash(req.body.password,10,async (err,hash) => {
        // 加密
        userData.password = hash;
        try {
          await Users.create(userData);
          res.send({flag:true,msg:'注册成功!'});
        } catch(err) {
          res.send({flag:false,msg: '注册失败',err})
        }
      })
    } else {
      res.send({flag:false,msg:'该邮箱或者手机已经被注册过了~'});
    }
  } catch(err) {
    res.send({flag:false,msg: '注册失败',err})
  }
});

// 登录
router.post("/signin",async (req,res) => {
  try {
    const user = await Users.findOne({
      where: {
        [Op.or]: [{email:req.body.name},{phone:req.body.name}]
      }
    })
    // 查找到用户
    if(user) {
      if(bcrypt.compareSync(req.body.password,user.password)) {
        delete user.dataValues.password;
        res.send({success:true,userData:user,msg:'登录成功'});
      } else {
        res.send({success:false,msg:'密码错误'});
      }
    } else {
      res.send({success:false,msg:'邮箱或者手机号不存在'});
    }
  } catch(err) {
    res.send({success:false,msg:'登录失败--',err})
  }
})

// 返回用户信息
router.get("/infor",async (req,res) => {
  try {
    const { uid } = req.query;
    const user = await Users.findOne({
      where: {uid}
    })
    if(user) {
      delete user.dataValues.password;
      res.send({success:true,userData:user});
    } else {
      res.send({success:false,userData:null,msg:'用户不存在'});
    }
  } catch(err) {
    res.send({success:false,userData:null,msg:'查询错误',err})
  }
})

module.exports = router;