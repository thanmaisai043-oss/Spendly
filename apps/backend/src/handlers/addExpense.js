let expenses = [];

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const newExpense = {
      id: Date.now(),

      amount: Number(body.amount),

      category: body.category,

      description: body.description,

      date: body.date,
    };

    expenses.push(newExpense);

    return {
      statusCode: 200,

      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },

      body: JSON.stringify(newExpense),
    };
  } catch (error) {
    return {
      statusCode: 500,

      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },

      body: JSON.stringify({
        message: 'Failed to add expense',
        error: error.message,
      }),
    };
  }
};