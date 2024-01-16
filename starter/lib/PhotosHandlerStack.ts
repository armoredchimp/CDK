import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Fn } from 'aws-cdk-lib'
import { Code, Runtime, Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda'

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string
}

export class PhotosHandlerStack extends cdk.Stack {



  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);



    new LambdaFunction(this, 'PhotosHandler', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromInline(`
      exports.handler = async (event)=>{
        console.log('hello!: ' + process.env.TARGET_BUCKET)
      };`),
      environment: {
        TARGET_BUCKET: props.targetBucketArn,
      }
    })

  }

  // 1 create a new resource 
  // 2 delete the old one (when changing the bucket name after this)

  // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket2000')
}


