import cdk = require('aws-cdk-lib');
import { CfnApp, CfnBranch } from 'aws-cdk-lib/aws-amplify';
import { Construct } from 'constructs';

export class AmplifyConsoleAppCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApp = new CfnApp(this, 'test-app', {
      name: 'amplify-app-cdk',
      repository: 'https://github.com/<the-rest-of-the-repository-url>',
      oauthToken: ''
    });

    new CfnBranch(this, 'master', {
      appId: amplifyApp.attrAppId,
      branchName: 'master' // you can put any branch here (careful, it will listen to changes on this branch)
    });
  }
}

const app = new cdk.App();
new AmplifyConsoleAppCdkStack(app, 'AmplifyConsoleApp');
app.synth();
