export class Assets {
    constructor(dir) {
        this.dir = dir;
        this._images = {};
    }
    loadImages(images) {
        let imagesRemaining = 0;
        images.forEach(i => {
            const image = new Image();
            image.src = this.dir + i.src;
            image.onload = () => {
                if (--imagesRemaining == 0) {
                    this.onImagesLoaded(this._images);
                }
            };
            this._images[i.name] = image;
            imagesRemaining++;
        });
        return this;
    }

    onImagesLoaded(images) {}

    getImage(name) {
        return this._images[name];
    }
}