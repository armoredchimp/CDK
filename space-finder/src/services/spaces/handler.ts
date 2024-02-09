import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
  Context,
} from 'aws-lambda';
import { v4 } from 'uuid';
import { postSpaces } from './PostSpaces';
import { getSpaces } from './GetSpaces';
import { updateSpace } from './UpdateSpaces';
import { deleteSpace } from './DeleteSpace';
import { JSONError, MissingFieldError } from '../shared/Validator';

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case 'GET':
        const gResponse = await getSpaces(event, ddbClient, context);
        return gResponse;
      case 'POST':
        const pResponse = await postSpaces(event, ddbClient, context);
        return pResponse;
      case 'PUT':
        const putResponse = await updateSpace(event, ddbClient, context);
        console.log(putResponse);
        return putResponse;
      case 'DELETE':
        const deleteResponse = await deleteSpace(event, ddbClient, context);
        return deleteResponse;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
    }
    if (error instanceof JSONError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}
export { handler };
