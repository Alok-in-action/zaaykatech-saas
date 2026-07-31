'use server';

/**
 * @fileOverview Implements the AI Call Assistant flow for taking customer orders and confirming them using a voice bot.
 *
 * - aiCallAssistant - A function that handles the AI call assistant process.
 * - AiCallAssistantInput - The input type for the aiCallAssistant function.
 * - AiCallAssistantOutput - The return type for the aiCallAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCallAssistantInputSchema = z.object({
  customerSpeech: z
    .string()
    .describe('The customer\u2019s speech as text. Provide the full order.'),
});
export type AiCallAssistantInput = z.infer<typeof AiCallAssistantInputSchema>;

const AiCallAssistantOutputSchema = z.object({
  orderConfirmation: z
    .string()
    .describe('The AI bot\u2019s confirmation of the order to the customer.'),
  orderDetailsForKitchen: z
    .string()
    .describe(
      'The order details formatted for the kitchen, including items and any special requests.'
    ),
});
export type AiCallAssistantOutput = z.infer<typeof AiCallAssistantOutputSchema>;

export async function aiCallAssistant(input: AiCallAssistantInput): Promise<AiCallAssistantOutput> {
  return aiCallAssistantFlow(input);
}

const aiCallAssistantPrompt = ai.definePrompt({
  name: 'aiCallAssistantPrompt',
  input: {schema: AiCallAssistantInputSchema},
  output: {schema: AiCallAssistantOutputSchema},
  prompt: `You are an AI voice bot assistant for a restaurant.
Your task is to take customer orders over the phone, confirm the order with the customer, and then send the order details to the kitchen.

Customer speech: {{{customerSpeech}}}

Respond to the customer in a natural, conversational tone. First, confirm their order, and clarify any ambiguities or missing information.

Then, generate order details that the kitchen staff will use to prepare the order. This should include each item, modifications, and any special requests.

Output should be formatted as JSON:
{
  "orderConfirmation": "Confirmation text to read to the customer.",
  "orderDetailsForKitchen": "Order details formatted for the kitchen staff."
}
`,
});

const aiCallAssistantFlow = ai.defineFlow(
  {
    name: 'aiCallAssistantFlow',
    inputSchema: AiCallAssistantInputSchema,
    outputSchema: AiCallAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiCallAssistantPrompt(input);
    return output!;
  }
);
