import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

export async function updateSpace(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient,
  context: Context
): Promise<APIGatewayProxyResult> {
  if (
    event.queryStringParameters &&
    'id' in event.queryStringParameters &&
    event.body
  ) {
    const parsedBody = JSON.parse(event.body);
    const spaceId = event.queryStringParameters['id'];
    const reqBodyKey = Object.keys(parsedBody)[0];
    const reqBodyVal = parsedBody[reqBodyKey];

    const updateResult = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: {
            S: spaceId,
          },
        },
        UpdateExpression: 'set #afef = :new',
        ExpressionAttributeValues: {
          ':new': {
            S: reqBodyVal,
          },
        },
        ExpressionAttributeNames: {
          '#afef': reqBodyKey,
        },
        ReturnValues: 'UPDATED_NEW',
      })
    );
    return {
      statusCode: 204,
      body: JSON.stringify(updateResult.Attributes),
    };
  }
  return {
    statusCode: 204,
    body: JSON.stringify('Wrong arguments'),
  };
}
