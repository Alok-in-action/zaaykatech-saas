export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  is_veg: boolean;
  description?: string;
}

/**
 * Stub implementation for OCR + LLM menu parsing.
 * Can easily be swapped with Google Cloud Vision, OpenAI Vision, or Genkit workflows later.
 */
export async function parseMenuStub(files: string[]): Promise<MenuItem[]> {
  // Simulate network processing delay for authentic UI feel
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      id: '1',
      name: 'Paneer Tikka Masala',
      price: 280,
      category: 'Main Course',
      is_veg: true,
      description: 'Cottage cheese cubes simmered in a rich tomato and onion gravy with spices.',
    },
    {
      id: '2',
      name: 'Butter Chicken',
      price: 340,
      category: 'Main Course',
      is_veg: false,
      description: 'Tender chicken pieces cooked in a creamy, mildly spiced butter tomato sauce.',
    },
    {
      id: '3',
      name: 'Garlic Naan',
      price: 60,
      category: 'Breads',
      is_veg: true,
      description: 'Leavened Indian flatbread baked in tandoor and topped with minced garlic & butter.',
    },
    {
      id: '4',
      name: 'Crispy Corn & Pepper',
      price: 210,
      category: 'Starters',
      is_veg: true,
      description: 'Golden fried sweet corn tossed with crushed black pepper and scallions.',
    },
    {
      id: '5',
      name: 'Masala Chai',
      price: 40,
      category: 'Beverages',
      is_veg: true,
      description: 'Traditional Indian cardamom & ginger infused spiced tea.',
    },
  ];
}
