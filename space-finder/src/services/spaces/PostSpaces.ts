import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { validateSpace } from '../shared/Validator';
import { createRandomId, parseJSON } from '../shared/Utils';

export async function postSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient,
  context: Context
): Promise<APIGatewayProxyResult> {
  const randomId = createRandomId;
  const item = parseJSON(event.body);
  item.id = randomId;
  validateSpace(item);
  item.id = randomId;
  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: marshall(item),
    })
  );
  console.log(result);
  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId }),
  };
}
