import { handler } from '../src/services/spaces/handler';

process.env.AWS_REGION = 'us-west-1';
process.env.TABLE_NAME = 'SpacesTable-067eddd7d7c3'


handler({
  httpMethod: 'PUT',
  queryStringParameters: {
    id: 'asdfasdf'
  },
  body: JSON.stringify({
    location: 'Helsinki'
  })
} as any, {} as any)