1 : 
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

export class MemeCollection {
    constructor(id, name, owner, memes) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.memes = memes;
    }

}
export function add(meme, memes) {
    memes.push(meme);
    showMemeCollection(memes);
}
export function updateMemeCollection(id, data, memes) {
    Object.assign(memes[id], data);
    showMemeCollection(memes);
}
export function deleteMemeCollection(id, memes) {
    console.log(memes.indexOf(id));
    memes.splice(memes.indexOf(id), 1);
    showMemeCollection(memes);
}
export function showMemeCollection(memes) {
    console.log(memes);
}

2:
