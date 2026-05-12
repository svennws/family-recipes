import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import type * as zod from 'astro/zod';

const recipeSchema = z.object({
    title: z.string(),
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
    loader: glob({
        base: './src/content/recipes',
        pattern: '**/*.json'
    }),
    schema: recipeSchema
});

export const collections = {
    recipes
};

export type RecipeData = zod.infer<typeof recipeSchema>;
