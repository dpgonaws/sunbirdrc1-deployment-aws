import * as cdk from "aws-cdk-lib";
import * as helm from "aws-cdk-lib/aws-eks";
import { Construct } from "constructs";
import * as eks from "aws-cdk-lib/aws-eks";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { ConfigProps } from "./config";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as childProcess from 'child_process';

export interface helmStackProps extends cdk.StackProps {
  config: ConfigProps;
  vpc: ec2.Vpc;
  rdssecret: string;
  eksCluster: eks.FargateCluster;
  s3bucket: s3.Bucket;
}

export class helmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: helmStackProps) {
    super(scope, id, props);
    const vpc = props.vpc;
    const eksCluster = props.eksCluster;
    const rdssecretARN = props.rdssecret;
    /* const appSecret = Secret.fromSecretCompleteArn(
      this,
      "rdssecret",
      rdssecretARN
    );
    const user = appSecret.secretValueFromJson("username").toString();
    const base64encodedpass = cdk.Fn.base64(
      appSecret.secretValueFromJson("password").unsafeUnwrap.toString()
    );

    const useriam = new iam.User(this, "MyUser", {
      userName: "sbrc-minios", // Replace with your desired username
    });
    useriam.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess")
    );

    const accessKey = new iam.CfnAccessKey(this, "MyAccessKey", {
      userName: useriam.userName,
    });

    const encodedAccessKey = cdk.Fn.base64(
      accessKey.attrSecretAccessKey.toString()
    );
    const encodedSecretKey = cdk.Fn.base64(accessKey.ref); */

    // new helm.HelmChart(this, "SBRC-HelmChart", {
    //   cluster: eksCluster,
    //   chart: "azure-marketplace/nginx-test",
    //   // ]chartAsset: ChartdAsset,
    //   // release: "first-nginx",
    //   values: {
    //     "global.secrets.DB_PASSWORD": base64encodedpass,
    //     "global.secrets.MINIO_SECRET_KEY": encodedSecretKey,
    //     "global.secrets.access_key": encodedAccessKey,
    //   },
    //   repository: "https://marketplace.azurecr.io/helm/v1/repo", // Helm chart repository URL
    // });

    new helm.HelmChart(this, "cdkhelm", {
      cluster: eksCluster,
      chart: 'sunbird-rc',
      repository: 'https://amitvashist7.github.io/helm-example/',
      namespace: "sbrc-registry20",
      //release: "sbrc-registry",
      values: {
        global: {
          database: { 
            host: "rdsstack-a-databaseb269d8bb-ooqkaknrwybr.cluster-cveklit2rj4m.ap-south-1.rds.amazonaws.com",
          },
          kafka: {
            url: "kafka.sbrc.com:9098",
          },
          redis: {
            host: "redis.sbrc.com",
          },
          elastic_search: {
            url:  "es.sbrc.com",
          },
          secrets: {
            DB_PASSWORD: "czBnQzg2TnY4S1Z3TFRSM0p6U28zLC15RWFoeXk3",
            ELASTIC_SEARCH_PASSWORD: "T3BlbnNlYXJjaEAxMjMK",
            KEYCLOAK_ADMIN_CLIENT_SECRET: "YzllOTA1YTQtOWIyZi00NWU2LThlMDUtMTNjM2E5NTNmNjUx",
            KEYCLOAK_ADMIN_PASSWORD: "YWRtaW4xMjM=",
            MINIO_SECRET_KEY: "a3pySHYxNldQSGQ4VWRUWVo0c1YxNjV3eFBvSlpGalV5SkVqVksxdg==", 
            KEYCLOAK_DEFAULT_USER_PASSWORD: "YWRtaW5AMTIz",
            access_key: "QUtJQVZNVk5DUVlDUEdNSERDTUE=",
          },
          minio: {
            bucket_key: "sbrc-registry-201", 
            access_key: "QUtJQVZNVk5DUVlDUEdNSERDTUE=",
          }
        }  
      }, 
   });


    /* eksCluster.addHelmChart('NginxIngress', {
      chart: 'nginx-ingress',
      repository: 'https://helm.nginx.com/stable',
      namespace: 'sbrc-registry20',
    }); */

    // const vpc = ec2.Vpc.fromLookup(this, "SB-RCVPC", {
    //   vpcId: "vpc-09c0c359d8d0537c7",
    //   //   availabilityZones: ["aps1-az3", "aps1-az1"],
    //   //   publicSubnetIds: ["subnet-0a906b8d151a34ea0", "subnet-0b88badfa7d4ac407"],
    // });

    // const cluster = eks.Cluster.fromClusterAttributes(this, "MyEksCluster", {
    //   clusterName: "eks-sbrc-new-v2",
    //   kubectlRoleArn: "arn:aws:iam::370803901956:user/vishwajeet",
    //   vpc: vpc,
    //   //   eks.Vpc.fromVpcAttributes(this, "MyVpc", {
    //   //     vpcId: "vpc-09c0c359d8d0537c7",
    //   //     availabilityZones: ["aps1-az3", "aps1-az1"],
    //   //     publicSubnetIds: [
    //   //       "subnet-0a906b8d151a34ea0",
    //   //       "subnet-0b88badfa7d4ac407",
    //   //     ],
    //   //   }),
    // });

    // Define the local path to your Helm chart folder
    // const helmChartFolder = "../helm-deployment/infra/helm_charts";

    // Create a Helm chart using the local folder as the source
    // new helm.HelmChart(this, "MyHelmChart", {
    //   cluster: cluster,
    //   chart: helmChartFolder,
    //   release: "sunbirdrc",
    //   values: {
    //     "global.secrets.DB_PASSWORD":
    //       "aSx6M3NEZ1B6dEV3Mm1eMllrPUVIXkZrbWUsX2Fe",
    //     //"global.secrets.ELASTIC_SEARCH_PASSWORD":"abc",
    //     //"global.secrets.KEYCLOAK_ADMIN_CLIENT_SECRET":"abc",
    //     // "global.secrets.KEYCLOAK_ADMIN_PASSWORD":"password",
    //     "global.secrets.MINIO_SECRET_KEY": "QUtJQVZNVk5DUVlDSTNIRTJCWEM=",
    //     "global.secrets.access_key":
    //       "QzJvenppM3ZRUlVsSndDb1RaWVRjSXBHY0VzSFQ2a00vTyt5MXozVw==",
    //     //"global.minio.bucket_key":"abc",
    //   },
    // });
  }
}
