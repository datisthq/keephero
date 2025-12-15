import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { LinkType, FeedType, LanguageCode } from "./enums.ts";

export type channel = {
    id: Generated<string>;
    userId: string;
    slug: string;
    title: string;
    query: string | null;
    type: LinkType | null;
    tagIds: Generated<string[]>;
    minReadingTime: number | null;
    maxReadingTime: number | null;
    inboxCount: number;
    snoozedCount: number;
    archivedCount: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp | null;
};
export type feed = {
    userId: string;
    source: string;
    slug: string;
    type: FeedType;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp | null;
};
export type link = {
    userId: string;
    url: string;
    slug: string;
    languageCode: LanguageCode;
    type: LinkType;
    title: string;
    description: string;
    summary: string;
    content: string;
    readingTime: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp | null;
    isFavorite: boolean | null;
};
export type link_tag = {
    userId: string;
    url: string;
    tagSlug: string;
};
export type page = {
    url: string;
    languageCode: LanguageCode;
    type: LinkType;
    title: string;
    description: string;
    summary: string;
    content: string;
    readingTime: number;
    /**
     * @kyselyType({ keyword: string, emoji: string }[])
     */
    tags: { keyword: string, emoji: string }[];
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp | null;
};
export type tag = {
    slug: string;
    languageCode: LanguageCode;
    keyword: string;
    emoji: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp | null;
};
export type DB = {
    channel: channel;
    feed: feed;
    link: link;
    linkTag: link_tag;
    page: page;
    tag: tag;
};
