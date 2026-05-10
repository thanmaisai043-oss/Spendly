export async function getExpenses() {
  const response = await fetch('http://localhost:4000/expenses');

  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }

  return response.json();
}