# Sunbird RC, one-click deployment on AWS

## Description
Sunbird RC is an interoperable and unified registry infrastructure needs to be built to enable "live", "reusable", and “trustworthy” registries as a “single source of truth” to address the above three core issues. Learn more about Sunbird RC at https://docs.sunbirdrc.dev/.

This packaging initiative presents a practical approach to increase the adoption of Sunbird building blocks on AWS by leveraging the reference architecture and one-click deployment automation. Builders can now bypass the need for manual steps when working with the building block within scope and can seamlessly start on AWS.


## 
## Table of Contents
- [Packaging overview](#packaging-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Packaging overview
Talk about AWS CDK and Helm charts

### AWS CDK (Cloud Development Kit)
"Vishwajeet to Sudhakar" Explain how AWS CDK is used in your project to define and provision the AWS resources. You can include information about the key AWS resources created, the code structure, and any important considerations.

### Helm Charts for Service Deployment
"Amit to update" - Describe the use of Helm charts for deploying services in your project. Include details about how the Helm charts are organized, any customization options, and the deployment process. You can also mention any Helm-specific configurations or best practices.

### Sunbird RC services

- **sbrc-registry**

- **sbrc-registry-certificate-api**

- **sbrc-registry-certificate-signer**

- **sbrc-registry-claim-ms**

- **sbrc-registry-context-proxy-service**

- **sbrc-registry-keycloak-service**

- **sbrc-registry-notification-ms**

- **sbrc-registry-public-key-service**

- **sunbird-rc-admin**

### Reference architecture
Moz to update the reference architecture and add here.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **AWS Account**: You must have an AWS account. If you don't have one, you can create it [here](https://aws.amazon.com/).

- **IAM User**: We recommend setting up an AWS Identity and Access Management (IAM) user with the appropriate permissions to manage Amazon EKS cluster, S3 bucket, AWS Fargate, and the Elasti Loadbalancers. You can refer to our [IAM Configuration Guide](link-to-guide) for detailed instructions on how to configure the IAM user with the required permissions.

- **AWS CLI (optional)**: The AWS Command Line Interface (AWS CLI) configured to use one of the AWS Regions where an Amazon EKS cluster running Kubernetes pods on AWS Fargate is supported. For information about installing and configuring the AWS CLI, see [Installing, updating, and uninstalling the AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

- **kubectl**: Command line tool that you use to communicate with the Kubernetes API server from Amazon EKS cluster. The kubectl binary is available in many operating system package managers. Using a package manager for your installation is often easier than a manual download and install process, see [Installing or updating kubectl](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html).


## Installation

### Prepare your environment

The AWS CDK Toolkit, the CLI command cdk, is the primary tool for interacting with your AWS CDK app.

For information about installing the cdk command, see [AWS CDK Toolkit (cdk command)](https://docs.aws.amazon.com/cdk/v2/guide/cli.html).

```bash
npm install -g aws-cdk
```

### Update environment specific configuration

Supply inputs to config file for AWS CDK to use them during the provisioning stage.

```bash
git checkout
```

### Begin deployment
```bash
cdk 
```

