exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello from ${process.env.TABLE_NAME}`),
  };
};
