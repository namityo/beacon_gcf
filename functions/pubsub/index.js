const beaconlog = require('../../lib/datastore/beaconlog')


module.exports = (event, callback) => {
    const pubsubMessage = event.data

    // データチェック
    if (checkData(pubsubMessage)) {

        // 登録
        beaconlog.add(pubsubMessage, (err) => {
            if (err) console.log(err); 
        });
    } else {
        console.log("Invalid data was entered." + JSON.stringify(pubsubMessage));
    }

    callback();
};


/**
 * データチェック用関数
 * @param {*} data 
 */
function checkData(data) {
    
    // 日付が設定されていなければ現在時刻を設定
    if (data.created == null) data.created = new Date();

    return (
        data.detector != null &&
        data.uuid != null &&
        data.major != null &&
        data.minor != null
    );
};
