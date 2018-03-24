const beaconlog = require('../../lib/datastore/beaconlog')
const checkData = require('../../lib/helper/validator').checkData;


module.exports = (event, callback) => {
    const pubsubMessage = event.data
    const dataString = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : "{}";
    const data = JSON.parse(dataString);

    // データチェック
    if (checkData(data)) {

        // 時刻を設定
        if (data.created != null) {
            // 文字列をDate型に変換する
            const createdMillsec = Date.parse(data.created);
            data.created = new Date(createdMillsec);
        } else {
            // 設定されていなければ現在時刻を設定
            data.created = new Date();
        }

        // 登録
        beaconlog.add(data, (err) => {
            if (err) console.log(err); 
        });
    } else {
        console.log("Invalid data was entered." + JSON.stringify(data));
    }

    callback();
};
