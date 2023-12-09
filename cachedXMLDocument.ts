export interface XMLDocument {
    content: () => string,
}

export class CachedXMLDocument implements XMLDocument {
    public file: XMLDocument;
    public cachedContent: string;
    constructor (file: any) {
        this.file = file;
        this.cachedContent = file.content();
    }
    content() {
        if (this.cachedContent) {
            return this.cachedContent;
        }
        return this.file.content();
    }
};