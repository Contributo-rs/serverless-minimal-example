### Introduction

In [this post](http://contributo.rs/blog/deploy-your-first-lambda) we cover all the steps needed to deploy your first serverless endpoint, 
however if you want to skip the details and deploy this repository, just copy your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` into the `.env` file and run:

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

Now you can test your endpoint (make sure you use your endpoint url from the output above).

```bash
curl https://k0nttg9a3f.execute-api.eu-central-1.amazonaws.com/dev/hello-serverless
```

Read more on [Contributo.rs](http://contributo.rs)
