const expenses = [
  {
    id: 1,
    title: 'Food',
    amount: 500,
  },
  {
    id: 2,
    title: 'Travel',
    amount: 1200,
  },
];

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Expenses API Working 🚀',
      data: expenses,
    }),
  };
};