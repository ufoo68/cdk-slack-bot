import * as QueryString from 'querystring'
import { DynamoDB } from 'aws-sdk'

exports.handler = async function (event: any) {
    const query = QueryString.parse(event.body)
    const dynamo = new DynamoDB()
    switch (query.command) {
        case '/set_money':
            if (query.user_name !== 'yuta.matsunaga') return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: 'You are not yuta.matsunaga'
            }
            await dynamo.updateItem({
                TableName: process.env.HITS_TABLE_NAME as string,
                Key: { path: { S: 'money' } },
                UpdateExpression: 'SET money = :num',
                ExpressionAttributeValues: { ':num': { N: query.text as string } }
            }).promise()
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: 'Set your total money'
            }
        case '/check_money':
            const money = await dynamo.getItem({
                TableName: process.env.HITS_TABLE_NAME as string,
                Key: { path: { S: 'money' } }
            }).promise()
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: `勝ち分は、${money.Item!.money.N}ドルです。`
            }
        default:
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: 'invalid command'
            }
    }

}