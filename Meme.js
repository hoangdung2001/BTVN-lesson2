export class Meme {
    constructor(id, name, image, dateModified) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.dateModified = dateModified;
    }

}

export function show(meme) {
    document.querySelector("#name").textContent = "Name :" + meme.name;
    document.querySelector("#image").setAttribute("src", meme.image)
    document.querySelector("#dateModified").textContent = "Date:" + meme.dateModified;
}

export function update(data, meme) {
    Object.assign(meme, data);
    show(meme)
}
