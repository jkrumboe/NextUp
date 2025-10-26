import { z } from 'zod';

// ===== Enums =====
export const MediaTypeEnum = z.enum([
  'BOOK',
  'MOVIE',
  'SHOW',
  'MANGA',
  'COMIC',
  'ARTIST',
  'ALBUM',
  'GAME',
  'PODCAST',
]);
export type MediaType = z.infer<typeof MediaTypeEnum>;

export const CreatorRoleEnum = z.enum([
  'AUTHOR',
  'DIRECTOR',
  'ARTIST',
  'ACTOR',
  'MUSICIAN',
  'ILLUSTRATOR',
  'WRITER',
  'PRODUCER',
  'OTHER',
]);
export type CreatorRole = z.infer<typeof CreatorRoleEnum>;

export const LinkTypeEnum = z.enum(['VIBE', 'THEME', 'TONE', 'GENRE', 'AESTHETIC', 'OTHER']);
export type LinkType = z.infer<typeof LinkTypeEnum>;

export const TagKindEnum = z.enum(['GENRE', 'MOOD', 'TOPIC', 'STYLE']);
export type TagKind = z.infer<typeof TagKindEnum>;

export const ActivityKindEnum = z.enum(['RATE', 'LINK', 'ADD', 'EDIT']);
export type ActivityKind = z.infer<typeof ActivityKindEnum>;

// ===== Auth Schemas =====
export const RegisterSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8),
});
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string(),
});
export type LoginDto = z.infer<typeof LoginSchema>;

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
    avatarUrl: z.string().nullable(),
    createdAt: z.string(),
  }),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// ===== User Schemas =====
export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  avatarUrl: z.string().nullable(),
  createdAt: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export const UpdateUserSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  avatarUrl: z.string().url().optional(),
});
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

// ===== Media Schemas =====
export const MediaItemSchema = z.object({
  id: z.string(),
  type: MediaTypeEnum,
  title: z.string(),
  subtitle: z.string().nullable(),
  description: z.string().nullable(),
  year: z.number().nullable(),
  coverUrl: z.string().nullable(),
  externalIds: z.record(z.string()).nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  creators: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        role: CreatorRoleEnum,
      })
    )
    .optional(),
  tags: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        kind: TagKindEnum.nullable(),
      })
    )
    .optional(),
  averageRating: z.number().nullable().optional(),
  ratingsCount: z.number().optional(),
  userRating: z.number().nullable().optional(),
});
export type MediaItem = z.infer<typeof MediaItemSchema>;

export const CreateMediaItemSchema = z.object({
  type: MediaTypeEnum,
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  year: z.number().min(1000).max(9999).optional(),
  coverUrl: z.string().url().optional(),
  externalIds: z.record(z.string()).optional(),
  creatorIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});
export type CreateMediaItemDto = z.infer<typeof CreateMediaItemSchema>;

// ===== Rating Schemas =====
export const RatingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  mediaItemId: z.string(),
  score: z.number().min(1).max(10),
  reviewText: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: UserSchema.optional(),
});
export type Rating = z.infer<typeof RatingSchema>;

export const UpsertRatingSchema = z.object({
  score: z.number().min(1).max(10),
  reviewText: z.string().max(2000).optional(),
});
export type UpsertRatingDto = z.infer<typeof UpsertRatingSchema>;

// ===== Link Schemas =====
export const LinkSchema = z.object({
  id: z.string(),
  fromMediaId: z.string(),
  toMediaId: z.string(),
  userId: z.string(),
  linkType: LinkTypeEnum,
  strength: z.number().min(0).max(1),
  note: z.string().nullable(),
  createdAt: z.string(),
  fromMedia: MediaItemSchema.optional(),
  toMedia: MediaItemSchema.optional(),
  user: UserSchema.optional(),
});
export type Link = z.infer<typeof LinkSchema>;

export const CreateLinkSchema = z.object({
  fromMediaId: z.string(),
  toMediaId: z.string(),
  linkType: LinkTypeEnum,
  strength: z.number().min(0).max(1).default(0.5),
  note: z.string().max(500).optional(),
});
export type CreateLinkDto = z.infer<typeof CreateLinkSchema>;

// ===== Tag Schemas =====
export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: TagKindEnum.nullable(),
  createdAt: z.string(),
});
export type Tag = z.infer<typeof TagSchema>;

export const CreateTagSchema = z.object({
  name: z.string().min(1).max(50),
  kind: TagKindEnum.optional(),
});
export type CreateTagDto = z.infer<typeof CreateTagSchema>;

// ===== Activity Schemas =====
export const ActivitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  kind: ActivityKindEnum,
  refId: z.string(),
  createdAt: z.string(),
  user: UserSchema.optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
});
export type Activity = z.infer<typeof ActivitySchema>;

// ===== Search & Query Schemas =====
export const MediaSearchParamsSchema = z.object({
  query: z.string().optional(),
  type: MediaTypeEnum.optional(),
  tag: z.string().optional(),
  creator: z.string().optional(),
  sort: z.enum(['recent', 'rating', 'popular', 'title']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});
export type MediaSearchParams = z.infer<typeof MediaSearchParamsSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
  });

// ===== Recommendation Schemas =====
export const RecommendationSchema = z.object({
  mediaItem: MediaItemSchema,
  score: z.number(),
  reasons: z.array(z.string()),
});
export type Recommendation = z.infer<typeof RecommendationSchema>;
