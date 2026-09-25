import { defineCollection, z } from 'astro:content';
import { optional } from 'astro:schema';

const recipeSchema = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    servings: z.number().int().positive().optional(),
    servingSize: z.string().optional(),
    ingredients: z.array(z.string()).nonempty(),
    steps: z.array(z.string()).nonempty(),
    tags: z.array(z.string()).default([]),
    createdAt: z.coerce.date().optional(),
    publishedAt: z.coerce.date().optional(),
    lastModifiedAt: z.coerce.date().optional(),
    author: z.string().optional()
});

const recipes = defineCollection({
    type: 'data',
    schema: recipeSchema
});

export const collections = {
    recipes
};

export type RecipeData = z.infer<typeof recipeSchema>;
