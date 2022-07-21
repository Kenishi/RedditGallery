import { GalleryImage } from "../models/GalleryImage";
import { FileType, GalleryItem } from "../models/GalleryItem";
import { DupeChecker } from "./DupeChecker";

export class ImageProvider {
    constructor(page: URL, checker: DupeChecker) {
        this.checker = checker;
        this.page = page;
    }

    private page: URL;
    private checker: DupeChecker;

    next_after: string|null = "";

    private async getData(after: string) {
        const params = new URLSearchParams(this.page.search);
        params.set("after", after);
        this.page.search = params.toString();
        
        // Fetch data from endpoint
        const resp = await fetch(this.page);
        const data: any = await resp.json();

        return data;
    }

    isMedia(child_item: any): boolean {
        const hasPreview = child_item.data.preview !== undefined;
        const hasImages = hasPreview && child_item.data.preview.images && child_item.data.preview.images.length > 0;
        const hasVideoLinks = hasPreview && Object.keys(child_item.data.preview).some((k) => k.includes("video"));

        return hasImages || hasVideoLinks;
    }

    getChildMediaType(child_item: any): FileType {
        if(this.isMedia(child_item)) {
            return Object.keys(child_item.data.preview).some((k) => k.includes("video")) ? FileType.VIDEO : FileType.IMAGE;
        }
        return FileType.OTHER;
    }

    async *getImage() {
        do {
            // Get the data from endpoint
            const result = await this.getData(this.next_after!);
            this.next_after = result.data.after;

            // Look for children with video or image posts
            const items: GalleryItem[] = result.data.children.map((child: any) => {
                if(this.isMedia(child)) {
                    console.log(child);
                    const images = child.data.preview.images.map((img: any) => {
                        const info = img.resolutions[0];
                        return new GalleryImage({
                            url: new URL(info.url),
                            width: info.width,
                            height: info.height
                        });
                    });

                    const gallery_item = new GalleryItem({
                        thumbnails: images,
                        type: this.getChildMediaType(child),
                        user: child.data.author,
                        explore_user_link: new URL(`https://api.reddit.com/u/${child.data.author}/.json`),
                        post: child.data.permalink,
                        subreddit: child.data.subreddit,
                        explore_subreddit_link: new URL(`https://api.reddit.com/r/${child.data.subreddit}/.json`)
                    });
                    return gallery_item;
                }
                return [];
            })
            
            for(let i of items) {
                // TODO: Filter images that are dupes using the checker
                // TODO: Add non-dupes to the checker DB
                yield i;
            }
        } while(this.next_after && this.next_after.length > 0)
    }
}