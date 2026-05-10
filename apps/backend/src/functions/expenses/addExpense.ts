export const handler = async (event: any) => {
  const body = JSON.parse(event.body);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Expense Added Successfully 🚀',
      expense: body,
    }),
  };
};