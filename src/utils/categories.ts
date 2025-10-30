import type { CollectionEntry } from 'astro:content';

export interface CategoryInfo {
	key: string;
	segments: string[];
	label: string;
	title: string;
	count: number;
}

export interface CategoryIndex {
	categories: Map<string, CategoryInfo>;
	children: Map<string, Set<string>>;
}

const titleCaseSegment = (value: string) =>
	value
		.split('-')
		.map((segment) => (segment ? segment[0].toUpperCase() + segment.slice(1) : segment))
		.join(' ');

export const formatCategoryTitle = (segments: string[]) =>
	segments.map(titleCaseSegment).join(' / ');

export const buildCategoryIndex = (entries: CollectionEntry<'recipes'>[]): CategoryIndex => {
	const categories = new Map<string, CategoryInfo>();
	const children = new Map<string, Set<string>>();

	for (const entry of entries) {
		const segments = entry.id.split('/');
		if (segments.length < 2) {
			continue;
		}

		const categorySegments = segments.slice(0, -1);

		for (let depth = 1; depth <= categorySegments.length; depth += 1) {
			const keySegments = categorySegments.slice(0, depth);
			const key = keySegments.join('/');

			let info = categories.get(key);

			if (!info) {
				const label = titleCaseSegment(keySegments.at(-1)!);
				const title = formatCategoryTitle(keySegments);

				info = {
					key,
					segments: keySegments,
					label,
					title,
					count: 0
				};

				categories.set(key, info);
			}

			info.count += 1;

			const parentKey = depth === 1 ? '' : keySegments.slice(0, -1).join('/');
			const parentChildren = children.get(parentKey) ?? new Set<string>();

			parentChildren.add(key);
			children.set(parentKey, parentChildren);
		}
	}

	return {
		categories,
		children
	};
};

export const getChildCategories = (index: CategoryIndex, parentKey: string): CategoryInfo[] => {
	const childKeys = index.children.get(parentKey);

	if (!childKeys) {
		return [];
	}

	return Array.from(childKeys)
		.map((key) => index.categories.get(key))
		.filter((info): info is CategoryInfo => Boolean(info))
		.sort((a, b) => a.label.localeCompare(b.label));
};
