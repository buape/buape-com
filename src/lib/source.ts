import { blog as blogSrc, pages as pagesSrc } from '~/../.source';
import { createMDXSource } from 'fumadocs-mdx';
import { type InferPageType, loader } from 'fumadocs-core/source';

export const blog = loader({
	baseUrl: '/blog',
	source: createMDXSource(blogSrc, []),
});

export type Blog = InferPageType<typeof blog>

export const pages = loader({
	baseUrl: '/',
	source: createMDXSource(pagesSrc, []),
});

export type Pages = InferPageType<typeof pages>
