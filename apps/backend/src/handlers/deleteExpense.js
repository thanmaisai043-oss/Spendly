let expenses = [];

module.exports.handler = async (event) => {
  const id = Number(event.pathParameters.id);

  expenses = expenses.filter(
    (expense) => expense.id !== id
  );

  return {
    statusCode: 200,

    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },

    body: JSON.stringify({
      message: 'Deleted',
    }),
  };
};