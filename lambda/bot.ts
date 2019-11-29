import * as QueryString from 'querystring';

exports.handler = async function (event: any) {
    const requestText = parseRequest(event.body);
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: requestText
    };
};
  
export function parseRequest(body: any): string {
    const query = QueryString.parse(body);
    console.log(JSON.stringify(query));

    return String(query.text)
}