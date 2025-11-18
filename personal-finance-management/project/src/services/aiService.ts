import { GoogleGenerativeAI } from '@google/generative-ai';
import { Expense } from '../types/expense';
import { startOfMonth, endOfMonth, format } from 'date-fns';

const genAI = new GoogleGenerativeAI('YOUR_API_KEY'); // Replace with your API key

export async function generateExpenseInsights(expenses: Expense[]) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth(new Date()) && 
             expenseDate <= endOfMonth(new Date());
    });

    const expenseData = {
      total: expenses.reduce((sum, e) => sum + e.amount, 0),
      monthlyTotal: currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0),
      categories: Object.entries(
        expenses.reduce((acc, e) => {
          acc[e.category] = (acc[e.category] || 0) + e.amount;
          return acc;
        }, {} as Record<string, number>)
      ),
      month: format(new Date(), 'MMMM yyyy'),
    };

    const prompt = `
      Analyze this expense data and provide 3-4 meaningful insights:
      Total Expenses: $${expenseData.total}
      Monthly Expenses (${expenseData.month}): $${expenseData.monthlyTotal}
      Category Breakdown:
      ${expenseData.categories.map(([cat, amount]) => `${cat}: $${amount}`).join('\n')}

      Please provide insights about:
      1. Spending patterns and trends
      2. Category-specific observations
      3. Potential areas for savings
      4. Unusual spending patterns if any

      Format each insight as a JSON object with:
      - type: "info", "warning", or "alert"
      - message: the insight message
      - priority: 1-3 (1 being highest)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const insights = JSON.parse(response.text());

    return insights.map((insight: any) => ({
      ...insight,
      id: crypto.randomUUID(),
    }));
  } catch (error) {
    console.error('Error generating insights:', error);
    return [
      {
        id: crypto.randomUUID(),
        type: 'info',
        message: 'Unable to generate AI insights at this time. Please try again later.',
        priority: 3,
      },
    ];
  }
}