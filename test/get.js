const beaconlog = require('../lib/datastore/beaconlog')

const param = {
    detector : 'pi',
    uuid     : '8492e75f4fd6469db132043fe94921d8',
    date_lt  : new Date('2018-03-24T10:55:11.627Z'),
};

beaconlog.get(param, (results) => {
    results.forEach(result => {
        console.log(result.created);
    });
});
