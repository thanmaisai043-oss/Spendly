export const handler = async (event: any) => {
  const id = event.pathParameters.id;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Expense ${id} deleted successfully 🚀`,
    }),
  };
};