import { DeleteItemCommand, DynamoDBClient, GetItemCommand, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';



export async function deleteSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient, context: Context): Promise<APIGatewayProxyResult> {

  if (event.queryStringParameters && ('id' in event.queryStringParameters)) {

    
    const spaceId = event.queryStringParameters['id'];
    

    await ddbClient.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        'id': {
          S: spaceId
        }
      }
    }
  ))
return {
  statusCode: 200,
  body: JSON.stringify(`Deleted ${spaceId}`)
}}
  return {
    statusCode: 204,
    body: JSON.stringify('Wrong arguments')
  }

}