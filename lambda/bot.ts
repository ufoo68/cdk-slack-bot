import * as QueryString from 'querystring';

exports.handler = async function (event: any) {
    console.log(event)
    const query = QueryString.parse(event.body);
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: query.text
    }
}