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
  'POST /api/otherBankAccessAccountQuery': function(req, res) {
      res.json({
        "head": {
            "resMsg": ""
          },
          "key": "",
          "message":[
            {
              payOpenClearNo: '', // 他行账户清算行行号
              typeCode: '452',
              payAccountName: '不知道',
              effectiveDate: '2018-05-04', // 协议失效日期
              payAccountNo: '6217 *** 3422',
              protocolNo: '9527',
              receiptOpenNodeName: '中国工商银行',
              payOpenNodeName: '龙卡',
              receiptAccountNo: '6222 *** 5233',
              protocolStatus: '签订',
              receiptOpenClearNo: '', // 本行账户清算行行号
              invaliDate: '2018-05-04', // 协议失效日期
            },
            {
                payOpenClearNo: '', // 他行账户清算行行号
                typeCode: '452',
                payAccountName: '不知道',
                effectiveDate: '2018-05-04', // 协议失效日期
                payAccountNo: '6217 *** 3422',
                protocolNo: '9527',
                receiptOpenNodeName: '中国工商银行',
                payOpenNodeName: '龙卡',
                receiptAccountNo: '6222 *** 5233',
                protocolStatus: '签订',
                receiptOpenClearNo: '', // 本行账户清算行行号
                invaliDate: '2018-05-04', // 协议失效日期
            },
          ],
          "resCode": "1",
          "seq": "10010",
          "serialNum": "31214255992162859",
          "sign": "",
          "type": "otherBankAccountTradeQuery"
      })
  },
  'POST /api/otherBankPayAccountQuery': function(req, res) {
    res.json({
      "head": {
          "resMsg": ""
        },
        "key": "",
        "message":[
            {
                receiptAccountNo: '6222 *** 5233',
                receiptOpenClearNo: '',
                payAccountNo: '6217 *** 3422',
                receiptAccountName: '小白',
                protocolStatus: '签订',
                receiptAccountType: '',
                payOpenNodeName: '中国工商银行',
            },
            {
                receiptAccountNo: '6222 *** 5233',
                receiptOpenClearNo: '',
                payAccountNo: '6217 *** 3422',
                receiptAccountName: '小黑',
                protocolStatus: '签订',
                receiptAccountType: '',
                payOpenNodeName: '中国工商银行',
            },
        ],
        "resCode": "4",
        "seq": "10010",
        "serialNum": "31214255992162859",
        "sign": "",
        "type": "otherBankAccountTradeQuery"
    })
}
};
