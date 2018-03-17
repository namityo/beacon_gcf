module.exports = (event, callback) => {
    const pubsubMessage = event.data

    console.log(pubsubMessage)

    callback()
}