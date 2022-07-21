export interface GalleryImageParams {
    url: URL;
    width: number;
    height: number
}

export class GalleryImage {
    constructor(params: GalleryImageParams) {
        this.url = params.url;
        this.width = params.width;
        this.height = params.height;
    }

    url: URL;
    width: number;
    height: number;
}