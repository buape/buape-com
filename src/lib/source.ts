import { blog as posts } from '~/../.source';
import { createMDXSource } from 'fumadocs-mdx';
import { type InferPageType, loader } from 'fumadocs-core/source';

export const blog = loader({
	baseUrl: '/blog',
	source: createMDXSource(posts, []),
});

export type Blog = InferPageType<typeof blog>
