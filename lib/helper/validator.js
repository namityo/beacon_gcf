/**
 * データチェック用関数
 * @param {*} data 
 * @returns データが揃っていればtrueを返す
 */
module.exports.checkData = function(data) {
    return (
        data.detector != null &&
        data.uuid != null &&
        data.major != null &&
        data.minor != null
    );
};
