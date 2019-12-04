import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');
import dynamodb = require('@aws-cdk/aws-dynamodb');

export class CdkSlackBotStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Money', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
    });

    const bot = new lambda.Function(this, 'BotHandler', {
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset('lambda'),
      handler: 'bot.handler',
      environment: {
        HITS_TABLE_NAME: table.tableName
      }
    });

    table.grantReadWriteData(bot);

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: bot
    });

  }
}
