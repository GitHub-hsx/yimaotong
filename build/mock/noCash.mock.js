module.exports = {
  'GET /api/base': function(req, res) {
    res.json({
      "head": {
        "resMsg": ""
      },
      "key": "",
      "message": {
          "DT01": [
              {
                  "depositRate": 0.46,
                  "depositTerm": "Y0"
              }
          ],
          "DT03": [
              {
                  "depositRate": 1.43,
                  "depositTerm": "Y1"
              },
              {
                  "depositRate": 1.69,
                  "depositTerm": "Y3"
              },
              {
                  "depositRate": 1.95,
                  "depositTerm": "Y5"
              },
              {
                  "depositRate": 4.8,
                  "depositTerm": "Y05"
              },
              {
                  "depositRate": 3.575,
                  "depositTerm": "Y003"
              },
              {
                  "depositRate": 1.95,
                  "depositTerm": "Y001"
              },
              {
                  "depositRate": 2.73,
                  "depositTerm": "Y002"
              },
              {
                  "depositRate": 1.95,
                  "depositTerm": "LCBY000001"
              },
              {
                  "depositRate": 2.73,
                  "depositTerm": "LCBY000002"
              },
              {
                  "depositRate": 3.575,
                  "depositTerm": "LCBY000003"
              },
              {
                  "depositRate": 4.8,
                  "depositTerm": "LCBY000005"
              }
          ],
          "DT04": [
              {
                  "depositRate": 1.43,
                  "depositTerm": "M3"
              },
              {
                  "depositRate": 1.69,
                  "depositTerm": "M6"
              },
              {
                  "depositRate": 1.95,
                  "depositTerm": "Y1"
              },
              {
                  "depositRate": 2.73,
                  "depositTerm": "Y2"
              },
              {
                  "depositRate": 3.575,
                  "depositTerm": "Y3"
              },
              {
                  "depositRate": 4.8,
                  "depositTerm": "Y5"
              },
              {
                  "depositRate": 4.8,
                  "depositTerm": "Y005"
              },
              {
                  "depositRate": 1.69,
                  "depositTerm": "M06"
              },
              {
                  "depositRate": 1.95,
                  "depositTerm": "Y01"
              },
              {
                  "depositRate": 2.73,
                  "depositTerm": "Y02"
              },
              {
                  "depositRate": 3.575,
                  "depositTerm": "Y03"
              }
          ],
          "DT06": [
              {
                  "depositRate": 0.8,
                  "depositTerm": "D1"
              },
              {
                  "depositRate": 1.35,
                  "depositTerm": "D7"
              }
          ],
          "DT07": [
              {
                  "depositRate": 1.95,
                  "depositTerm": "Y1"
              },
              {
                  "depositRate": 3.575,
                  "depositTerm": "Y3"
              },
              {
                  "depositRate": 4.8,
                  "depositTerm": "Y5"
              },
              {
                  "depositRate": 2.73,
                  "depositTerm": "Y2"
              }
          ],
          "DT08": [
              {
                  "depositRate": 1.95,
                  "depositTerm": "Y1"
              },
              {
                  "depositRate": 3.575,
                  "depositTerm": "Y3"
              },
              {
                  "depositRate": 4.8,
                  "depositTerm": "Y6"
              }
          ],
          "DT10": [
              {
                  "depositRate": 1.95,
                  "depositTerm": "Y1"
              },
              {
                  "depositRate": 2.73,
                  "depositTerm": "Y2"
              },
              {
                  "depositRate": 3.575,
                  "depositTerm": "Y3"
              },
              {
                  "depositRate": 4.29,
                  "depositTerm": "Y5"
              }
          ],
          "effectiveTime": "2018-01-23 00:00:00"
      },
      "resCode": "1",
      "seq": "10010",
      "serialNum": "31214255992162859",
      "sign": "",
      "type": "depositRatesQuery"
    });
  },
  'POST /api/noCardCashReservateQuery': function(req, res){
    res.json({
        "head": {
            "resMsg": ""
        },
        "key": "",
        "message":{
            "paramDocList":[
                {
                    cardNo: '6222 *** 5233',     // 预约卡号
                    orderId: '',
                    orderIndate:'',
                    orderStatus:'部分取款',              // 预约状态
                    orderTime: '',
                    delayTakeAmount:'',
                    orderAmount:'￥20，000.00',              // 预约金额
                    invalidReason:'',
                    hasTakeAmount:'',
                },
                {
                    cardNo: '6222 *** 5233',     // 预约卡号
                    orderId: '',
                    orderIndate:'',
                    orderStatus:'部分取款',              // 预约状态
                    orderTime: '',
                    delayTakeAmount:'',
                    orderAmount:'￥20，000.00',              // 预约金额
                    invalidReason:'',
                    hasTakeAmount:'',
                },
                {
                    cardNo: '6222 *** 5233',     // 预约卡号
                    orderId: '',
                    orderIndate:'',
                    orderStatus:'部分取款',              // 预约状态
                    orderTime: '',
                    delayTakeAmount:'',
                    orderAmount:'￥20，000.00',              // 预约金额
                    invalidReason:'',
                    hasTakeAmount:'',
                }
            ]
           
        },
        "resCode": "1",
        "seq": "10010",
        "serialNum": "31214255992162859",
        "sign": "",
        "type": "otherBankAccountTradeQuery"
    })
  }
} 