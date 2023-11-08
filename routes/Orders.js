const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Orders = require('../models/Orders');
const Order_modifys = require('../models/Order_modifys');

// 创建订单
router.post("/create", async (req,res) => {
  try {
    const date = new Date();
    const { name,apply_unit,apply_department,bookkeeper_id,amount } = req.body;
    const orderData = {
      name,
      amount,
      apply_unit,
      apply_department,
      bookkeeper_id,
      created: date.getTime()
    }
    const order = await Orders.findOne({
      where: {name}
    })
    if(!order) {
      await Orders.create(orderData);
      res.send({msg:'创建成功!',success:true})
    }else {
      res.send({msg:'已经创建过该订单',success:false});
    }
  } catch {
    res.send({success:false,msg:'出错了'});
  }
})

// 拉取订单列表
router.post("/info",async (req,res) => {
  try {
    const {offset,limit} = req;
    // offset和limit也可能没有
    
    const data = await Orders.findAll({
      order: [
        ['created','DESC']
      ],
      limit: limit || 10,  // 默认10
      offset: offset || 0, // 默认没有
    });
    res.send({data});
  } catch {
    res.send({success:false,msg:'出错了'});
  }
})

module.exports = router;