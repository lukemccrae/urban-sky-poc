import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class UrbanskyPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "ConstructoBalloon", {
      name: "constructoballoon-graphql-api",
      schema: appsync.SchemaFile.fromAsset("infra/graphql/schema.graphql"),
    });

    const queryLambdaRole = new iam.Role(this, "QueryLambdaExecutionRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    const queryResolverLambda = new lambda.Function(
      this,
      "QueryResolverLambda",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset("src/lambdas/queryResolverLambda/dist"),
        role: queryLambdaRole,
      }
    );

    const queryDataSource = api.addLambdaDataSource(
      "QueryDataSource",
      queryResolverLambda
    );

    const cloudWatchLogsPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          resources: ["*"], // Adjust this to limit resources as needed
        }),
      ],
    });

    const cloudwatchPolicy = new iam.Policy(this, "CloudWatchLogsPolicy", {
      document: cloudWatchLogsPolicy,
    });

    queryLambdaRole.attachInlinePolicy(cloudwatchPolicy);

    queryDataSource.createResolver("viewer", {
      typeName: "Query",
      fieldName: "viewer",
    });

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'UrbanskyPocQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
