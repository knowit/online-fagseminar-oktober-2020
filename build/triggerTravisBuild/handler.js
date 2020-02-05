/* Environment variables:
 * TRAVIS_API_TOKEN
 * TRAVIS_REPO_SLUG (%2F separated, e.g. ftes%2Fsongbook-latex)
 */

console.log('Loading function');
const https = require('https')
const querystring = require('querystring');

var postData = querystring.stringify({});

const options = {
    hostname: 'api.travis-ci.org',
    post: 443,
    path: `/repo/${process.env.TRAVIS_REPO_SLUG}/requests`,
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Travis-API-Version": "3",
        "Authorization": `token ${process.env.TRAVIS_API_TOKEN}`,
    }
}

exports.build = (event, context, callback) => {
    var req = https.request(options, (res) => {
        console.log('Got response: ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (d) {
            console.log('Body: ' + d);
        });
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Result: ${res.statusCode} - Triggered build on ${decodeURIComponent(process.env.TRAVIS_REPO_SLUG)}`
            })
        })
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
        callback(e.message);
    });

    req.write(postData);
    req.end();

};
