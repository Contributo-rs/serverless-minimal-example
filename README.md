### Introduction

If you are new to serverless and looking for a definitive guide on how to get started, you've come to the right place!

In this post we cover all the steps needed to deploy your first serverless endpoint using [**AWS Lambda**](https://aws.amazon.com/lambda/) and  [**Serverless Framework**](https://www.serverless.com/framework/docs/getting-started/):

- Setting up AWS Credentials 
- Creating minimal Serverless configuration with a simple Lambda function
- Deploy and run our function on AWS 

**Before we start**, the assumption is that you:
 - already have previous experience with **JavaScript** and **Node.js**. 
 - have **Node installed** on your system.
 - have an active [**AWS account**](https://aws.amazon.com/resources/create-account/). 

### Setting up AWS Credentials

If you haven't used AWS before or you don't have your credentials configured follow steps in this section, otherwise feel free to skip to the next section.

- Go to [AWS Console](https://console.aws.amazon.com/) and sign in with your root account.
- Go to **IAM** > **Users** > **Add new user**.
- Fill details as shown in the screenshot.

![Creating IAM User](create-iam-user.png)

- On next page **attach existing policies directly** and check *AdministratorAccess*. This will give you admin access to the AWS Account. Please use this only as an example and *do not use it in production environment*.
- **Continue until last step in the wizzard** and **Download CSV** with the credentials for newly created user.

### Serverless setup & Simple Lambda

Great, now we can proceed installing the **Serverless Framework CLI**. Open your terminal and navigate to the directory where you want 
your app to be located.

We can use **npm** for fetching the CLI and installing it globally on our machine.

```bash
npm install -g serverless
```

Additionally we will create a directory for our project. 

```bash
mkdir HelloServerless
cd HelloServerless
```

Inside this directory we will create couple of files: 
- `serverless.yml` - a file that will hold Serverless Framework configuration needed for deployment to AWS.
- `handler.js` - a JavaScript file that will expose a function that will be deployed to AWS Lambda 
- `.env` - a configuration file that will hold our AWS credentials.

```bash
touch serverless.yml handler.js .env
```
First we will write our `hello` function inside `handler.js` file. It will always return `statusCode 200` and a message `hello-serverless`.

```javascript
'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'hello-serverless'
      },
      null,
      2
    ),
  };
};

```
Next, inside `serverless.yml` we will configure a lambda that will invoke the function from `handler.js` whenever `GET /hello-serverless` endpoint is hit.

Additionally in the `provider` section we added general information about our deployment. 
The most important parameter is the `stackName` that tells Serverless Framework into which stack to deploy our AWS Resources. 

For now it is enough to know that stack is a group of AWS resources that are managed using `serverless.yml` file.
 
```yaml
 service: helloserverless
 
 provider:
   name: aws
   runtime: nodejs12.x
   stackName: helloserverless
   region: eu-central-1
 
 functions:
   hello:
     handler: handler.hello
     events:
       - http:
           path: hello-serverless
           method: get
```

### Deploying our first function 🚀
 
So far, so good, but nothing interesting until we can actually call our function that runs in the cloud.
To deploy our function we need to configure the **aws credentials** we downloaded at the start of this post. 

Copy `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from the **CSV** you downloaded previously into `.env` file. You can use following script:

```bash
echo AWS_ACCESS_KEY_ID=[YOUR_AWS_ACCESS_KEY_ID] >> .env 
echo AWS_SECRET_ACCESS_KEY=[YOUR_AWS_SECRET_ACCESS_KEY] >> .env 
echo AWS_DEFAULT_REGION=eu-central-1 >> .env
```

Finally, we can use the `serverless deploy` command to deploy our entire service via **CloudFormation**. 
*Note*: `set -a && . ./.env && set +a` is there to load our AWS Credentials from the `.env` file.

```bash
set -a && . ./.env && set +a && serverless deploy
```

The output should look something like this. Note there is an `endpoints section` that holds url we can use to trigger our lambda. 
```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service helloserverless.zip file to S3 (2.79 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................
Serverless: Stack update finished...
Service Information
service: helloserverless
stage: dev
region: eu-central-1
stack: my-first-deployment-igorjovic
resources: 11
api keys:
  None
endpoints:
  GET - https://k0nttg9a3f.execute-api.eu-central-1.amazonaws.com/dev/hello-serverless
functions:
  hello: helloserverless-dev-hello
layers:
  None
```

Now it's time to test our endpoint (make sure you use your endpoint url from the output above).

```bash
curl https://k0nttg9a3f.execute-api.eu-central-1.amazonaws.com/dev/hello-serverless
```

### What we just did

We created a CloudFormation stack with one endpoint and a corresponding lambda function. To see your stack go to **AWS Console** > **CloudFormation** and search for `helloserverless`. 
Under resources tab you will see the provisioned infrastructure needed for this example.


**Congratulations!** You made it to the end! If you have any questions feel free to [contact us](http://contributo.rs/#under-the-hood). 

