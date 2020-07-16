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
