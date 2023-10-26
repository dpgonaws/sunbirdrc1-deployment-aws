#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { sbrcStack } from '../lib/25_octsbrc-stack';
import "source-map-support/register";
import { vpcStack } from "../lib/vpc-stack";
import { rdsStack } from "../lib/rds-stack";
import { eksStack } from "../lib/eks-stack";
import { helmStack } from "../lib/helm-stack";
import { getConfig } from "../lib/config";
import { ConfigProps } from "../lib/config";
import { Stack, StackProps } from "aws-cdk-lib";
import { s3Stack } from "../lib/s3-stack";


const config = getConfig();

const app = new cdk.App();

type AwsEnvStackProps = StackProps & {
  config: Readonly<ConfigProps>;
};


const MY_AWS_ENV_STACK_PROPS: AwsEnvStackProps = {
  // Define properties here, for example:
  env: {
    region: "ap-south-1",
    account: "370803901956",
  },
  config: config,
};


const infra = new vpcStack(app, "vpcstack-a", MY_AWS_ENV_STACK_PROPS);

const s3bucket = new s3Stack(app, "s3stack-a", MY_AWS_ENV_STACK_PROPS);

const eksCluster = new eksStack(app, "eksstack-a", {
  env: {
    region: "ap-south-1",
    account: "370803901956",
  },
  config: config,
  vpc: infra.vpc,
});

const rdssecret = new rdsStack(app, "rdsstack-a", {
  env: {
    region: "ap-south-1",
    account: "370803901956",
  },
  config: config,
  vpc: infra.vpc,
});

new helmStack(app, "helmstack-a", {
  env: {
    region: "ap-south-1",
    account: "370803901956",
  },
  config: config,
  vpc: infra.vpc,
  rdssecret: rdssecret.rdsSecret,
  eksCluster: eksCluster.eksCluster,
  s3bucket: s3bucket.s3bucket,
});
//new  sbrcStack(app, 'sbrcStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
//});

//new vpcStack(app, "vpcstack-a", MY_AWS_ENV_STACK_PROPS);
//new rdsStack(app, "rdsstack-a", MY_AWS_ENV_STAC
