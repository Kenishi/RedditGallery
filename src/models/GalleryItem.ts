import { GalleryImage } from "./GalleryImage";

export enum FileType {
    VIDEO, IMAGE, OTHER
}

export interface GalleryItemParams {
    thumbnails: GalleryImage[],
    type: FileType,
    user: string,
    post: string,
    explore_user_link: URL,
    subreddit: string,
    explore_subreddit_link: URL
}

export class GalleryItem {
    constructor(params: GalleryItemParams) {
        this.thumbnails = params.thumbnails;
        this.type = params.type;
        this.user = params.user;
        this.post = params.post;
        this.explore_user_link = params.explore_user_link;
        this.subreddit = params.subreddit;
        this.explore_subreddit_link = params.explore_subreddit_link;
    }

    thumbnails: GalleryImage[];
    type: FileType;
    user: string;
    post: string;
    explore_user_link: URL;
    subreddit: string;
    explore_subreddit_link: URL;
}