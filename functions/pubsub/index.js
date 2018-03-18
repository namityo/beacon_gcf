const beaconlog = require('../../lib/datastore/beaconlog')


module.exports = (event, callback) => {
    const pubsubMessage = event.data
    const data = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : {};

    // データチェック
    if (checkData(data)) {

        // 登録
        beaconlog.add(data, (err) => {
            if (err) console.log(err); 
        });
    } else {
        console.log("Invalid data was entered." + JSON.stringify(data));
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
