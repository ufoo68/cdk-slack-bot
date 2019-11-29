import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');

export class CdkSlackBotStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bot = new lambda.Function(this, 'BotHandler', {
      runtime: lambda.Runtime.NODEJS_8_10,      // execution environment
      code: lambda.Code.asset('lambda'),  // code loaded from the "lambda" directory
      handler: 'bot.handler'                // file is "hello", function is "handler"
    });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: bot
    });

  }
}
