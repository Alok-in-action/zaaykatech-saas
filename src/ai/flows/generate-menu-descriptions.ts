// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview AI-powered menu item description generator.
 *
 * - generateMenuItemDescription - A function that generates a menu item description.
 * - GenerateMenuItemDescriptionInput - The input type for the generateMenuItemDescription function.
 * - GenerateMenuItemDescriptionOutput - The return type for the generateMenuItemDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMenuItemDescriptionInputSchema = z.object({
  itemName: z.string().describe('The name of the menu item.'),
  itemType: z.string().describe('The type of the menu item (e.g., appetizer, entree, dessert).'),
  cuisine: z.string().describe('The cuisine of the menu item (e.g., Italian, Mexican, Indian).'),
  ingredients: z.string().describe('A list of the main ingredients in the menu item.'),
  tasteProfile: z.string().describe('The taste profile of the menu item (e.g., spicy, sweet, savory).'),
});
export type GenerateMenuItemDescriptionInput = z.infer<
  typeof GenerateMenuItemDescriptionInputSchema
>;

const GenerateMenuItemDescriptionOutputSchema = z.object({
  description: z.string().describe('A creative and appealing description of the menu item.'),
});
export type GenerateMenuItemDescriptionOutput = z.infer<
  typeof GenerateMenuItemDescriptionOutputSchema
>;

export async function generateMenuItemDescription(
  input: GenerateMenuItemDescriptionInput
): Promise<GenerateMenuItemDescriptionOutput> {
  return generateMenuItemDescriptionFlow(input);
}

const generateMenuItemDescriptionPrompt = ai.definePrompt({
  name: 'generateMenuItemDescriptionPrompt',
  input: {schema: GenerateMenuItemDescriptionInputSchema},
  output: {schema: GenerateMenuItemDescriptionOutputSchema},
  prompt: `You are a creative food writer specializing in writing appealing descriptions of menu items for restaurants.

  Using the following information, write a short and engaging description of the menu item.

  Menu Item Name: {{{itemName}}}
  Item Type: {{{itemType}}}
  Cuisine: {{{cuisine}}}
  Ingredients: {{{ingredients}}}
  Taste Profile: {{{tasteProfile}}}

  Description:`,
});

const generateMenuItemDescriptionFlow = ai.defineFlow(
  {
    name: 'generateMenuItemDescriptionFlow',
    inputSchema: GenerateMenuItemDescriptionInputSchema,
    outputSchema: GenerateMenuItemDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateMenuItemDescriptionPrompt(input);
    return output!;
  }
);
