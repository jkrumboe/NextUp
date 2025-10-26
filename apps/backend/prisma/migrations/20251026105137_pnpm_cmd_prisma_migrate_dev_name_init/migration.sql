-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('BOOK', 'MOVIE', 'SHOW', 'MANGA', 'COMIC', 'ARTIST', 'ALBUM', 'GAME', 'PODCAST');

-- CreateEnum
CREATE TYPE "CreatorRole" AS ENUM ('AUTHOR', 'DIRECTOR', 'ARTIST', 'ACTOR', 'MUSICIAN', 'ILLUSTRATOR', 'WRITER', 'PRODUCER', 'OTHER');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('VIBE', 'THEME', 'TONE', 'GENRE', 'AESTHETIC', 'OTHER');

-- CreateEnum
CREATE TYPE "TagKind" AS ENUM ('GENRE', 'MOOD', 'TOPIC', 'STYLE');

-- CreateEnum
CREATE TYPE "ActivityKind" AS ENUM ('RATE', 'LINK', 'ADD', 'EDIT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_items" (
    "id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "year" INTEGER,
    "coverUrl" TEXT,
    "externalIds" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creators" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aliases" TEXT[],
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_item_creators" (
    "mediaItemId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "role" "CreatorRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_item_creators_pkey" PRIMARY KEY ("mediaItemId","creatorId","role")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaItemId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "reviewText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "fromMediaId" TEXT NOT NULL,
    "toMediaId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkType" "LinkType" NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "TagKind",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_item_tags" (
    "mediaItemId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_item_tags_pkey" PRIMARY KEY ("mediaItemId","tagId")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "ActivityKind" NOT NULL,
    "refId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_search_index" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "creatorNames" TEXT[],
    "tagNames" TEXT[],
    "year" INTEGER,
    "averageRating" DOUBLE PRECISION,
    "ratingsCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_search_index_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "media_items_type_idx" ON "media_items"("type");

-- CreateIndex
CREATE INDEX "media_items_title_idx" ON "media_items"("title");

-- CreateIndex
CREATE INDEX "media_items_year_idx" ON "media_items"("year");

-- CreateIndex
CREATE INDEX "creators_name_idx" ON "creators"("name");

-- CreateIndex
CREATE INDEX "media_item_creators_creatorId_idx" ON "media_item_creators"("creatorId");

-- CreateIndex
CREATE INDEX "ratings_mediaItemId_idx" ON "ratings"("mediaItemId");

-- CreateIndex
CREATE INDEX "ratings_userId_idx" ON "ratings"("userId");

-- CreateIndex
CREATE INDEX "ratings_score_idx" ON "ratings"("score");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_userId_mediaItemId_key" ON "ratings"("userId", "mediaItemId");

-- CreateIndex
CREATE INDEX "links_fromMediaId_idx" ON "links"("fromMediaId");

-- CreateIndex
CREATE INDEX "links_toMediaId_idx" ON "links"("toMediaId");

-- CreateIndex
CREATE INDEX "links_userId_idx" ON "links"("userId");

-- CreateIndex
CREATE INDEX "links_linkType_idx" ON "links"("linkType");

-- CreateIndex
CREATE UNIQUE INDEX "links_fromMediaId_toMediaId_userId_key" ON "links"("fromMediaId", "toMediaId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_kind_idx" ON "tags"("kind");

-- CreateIndex
CREATE INDEX "media_item_tags_tagId_idx" ON "media_item_tags"("tagId");

-- CreateIndex
CREATE INDEX "activities_userId_idx" ON "activities"("userId");

-- CreateIndex
CREATE INDEX "activities_kind_idx" ON "activities"("kind");

-- CreateIndex
CREATE INDEX "activities_createdAt_idx" ON "activities"("createdAt");

-- CreateIndex
CREATE INDEX "media_search_index_title_idx" ON "media_search_index"("title");

-- CreateIndex
CREATE INDEX "media_search_index_type_idx" ON "media_search_index"("type");

-- CreateIndex
CREATE INDEX "media_search_index_averageRating_idx" ON "media_search_index"("averageRating");

-- AddForeignKey
ALTER TABLE "media_item_creators" ADD CONSTRAINT "media_item_creators_mediaItemId_fkey" FOREIGN KEY ("mediaItemId") REFERENCES "media_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_item_creators" ADD CONSTRAINT "media_item_creators_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "creators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_mediaItemId_fkey" FOREIGN KEY ("mediaItemId") REFERENCES "media_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_fromMediaId_fkey" FOREIGN KEY ("fromMediaId") REFERENCES "media_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_toMediaId_fkey" FOREIGN KEY ("toMediaId") REFERENCES "media_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_item_tags" ADD CONSTRAINT "media_item_tags_mediaItemId_fkey" FOREIGN KEY ("mediaItemId") REFERENCES "media_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_item_tags" ADD CONSTRAINT "media_item_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_search_index" ADD CONSTRAINT "media_search_index_id_fkey" FOREIGN KEY ("id") REFERENCES "media_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
