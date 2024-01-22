exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello it's-a-me, ${process.env.TABLE_NAME}`),
  };
};
