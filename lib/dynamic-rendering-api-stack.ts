import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';

export class DynamicRenderingApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // https://github.com/alixaxel/chrome-aws-lambda/blob/master/Makefile
    const puppeteerLayer = new lambda.LayerVersion(this, 'PuppeteerLayer', {
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
      code: lambda.AssetCode.fromAsset('src/lambda/puppeteer_layer_modules')
    });

    const dynamicRenderingLambda = new lambda.Function(this, 'DynamicRenderingLambda', {
      code: lambda.Code.fromAsset('src/lambda/handlers/dynamic-rendering'),
      handler: 'index.handler',
      description: "DynamicRenderingLambda",
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 512,
      layers: [puppeteerLayer],
    });

    new LambdaRestApi(this, 'DynamicRenderingAPI', {
      description: "DynamicRenderingAPI",
      handler: dynamicRenderingLambda
    });
  }
}
