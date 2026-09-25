import { defineCollection, z } from 'astro:content';

const recipeSchema = z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    prepTime: z.string(),
    cookTime: z.string(),
    servings: z.number().int().positive(),
    ingredients: z.array(z.string()).nonempty(),
    steps: z.array(z.string()).nonempty(),
    tags: z.array(z.string()).default([]),
    createdAt: z.coerce.date().optional(),
    publishedAt: z.coerce.date().optional(),
    lastModifiedAt: z.coerce.date().optional()
});

const recipes = defineCollection({
    type: 'data',
    schema: recipeSchema
});

export const collections = {
    recipes
};

export type RecipeData = z.infer<typeof recipeSchema>;
