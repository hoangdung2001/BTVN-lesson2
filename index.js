export class DoGiaDung {
    constructor(dinhdanh, ten, gia, nhasx, giamgia, ngaynhap, doben) {
        this.dinhdanh = dinhdanh;
        this.ten = ten;
        this.gia = gia;
        this.nhasx = nhasx;
        this.giamgia = giamgia;
        this.ngaynhap = ngaynhap;
        this.doben = doben;
    }
}
export class QuanAo {
    constructor(dinhdanh, ten, gia, nhasx, giamgia, ngaynhap, xuatxu, chatlieu) {
        this.dinhdanh = dinhdanh;
        this.ten = ten;
        this.gia = gia;
        this.nhasx = nhasx;
        this.giamgia = giamgia;
        this.ngaynhap = ngaynhap;
        this.xuatxu = xuatxu;
        this.chatlieu = chatlieu;
    }
}
export class DoAn {
    constructor(dinhdanh, ten, gia, nhasx, giamgia, ngaynhap, vi) {
        this.dinhdanh = dinhdanh;
        this.ten = ten;
        this.gia = gia;
        this.nhasx = nhasx;
        this.giamgia = giamgia;
        this.ngaynhap = ngaynhap;
        this.vi = vi;
    }
}

export function addItem(type, arr) {
    arr.push(type);
    console.log(arr);
}
export function sell(type, arr, arr1) {
    arr.splice(arr.indexOf(type), 1);
    arr1.push(type);
    console.log(arr, arr1);
}
export function checkBill(arr1) {
    let bill = 0;
    bill = arr1.reduce((a, b) =>
        (a.gia - a.gia / a.giamgia) + (b.gia - b.gia / b.giamgia)
    )
    console.log(bill);
}

import { Meme, show, update } from './Meme.js';
import { MemeCollection, add, updateMemeCollection, deleteMemeCollection } from './memeCollection.js';
import { DoGiaDung, QuanAo, DoAn, addItem, sell, checkBill } from './QLBH.js';
var date = new Date();
const meme1 = new Meme(0, "smile", "https://s.memehay.com/files/posts/20200825/914176dc80ac20c0213a2e0279d82b32gau-truc-cao-tu.jpg", `${date.getDate()}`);
const meme2 = new Meme(1, "playing", "https://s.memehay.com/files/posts/20201124/gau-truc-danh-ban-noi-trai-dep-trai-dep-suot-ngay-chi-biet-trai-dep.jpg", `${date.getDate()}`);
const meme3 = new Meme(2, "smile", "https://s.memehay.com/files/posts/20200815/a7f31b85d6c2fa8cc1ec8049d12df43fgau-truc-danh-noi-nay-thi-ngang-nguoc.jpg", `${date.getDate()}`);
const memeCollection = new MemeCollection(1, "playing", "hoang", []);
document.querySelector("#m1").addEventListener("click", () => show(meme1));
document.querySelector("#m2").addEventListener("click", () => show(meme2));
document.querySelector("#m3").addEventListener("click", () => show(meme3));
update({ name: "bye", dateModified: `${date.getDay()}` }, meme1)
document.querySelector("#addm1").addEventListener("click", () => add(meme1, memeCollection.memes));
document.querySelector("#addm2").addEventListener("click", () => add(meme2, memeCollection.memes));
document.querySelector("#addm3").addEventListener("click", () => add(meme3, memeCollection.memes));

document.querySelector("#deletem1").addEventListener("click", () => deleteMemeCollection(meme1, memeCollection.memes));
document.querySelector("#deletem2").addEventListener("click", () => deleteMemeCollection(meme2, memeCollection.memes));
document.querySelector("#deletem3").addEventListener("click", () => deleteMemeCollection(meme3, memeCollection.memes));

const item1 = new DoGiaDung("do gia dung", "noi com dien", 100, "hoang", 10, date.getDate(), 80);
const item2 = new QuanAo("quanMy", "shirt", 150, "AmericanShirt", 5, date.getDate(), "American", "silve");
const item3 = new DoAn("HaiSan", "Crab", 50, "Ban", 2, date.getDate(), "sweet");
let kholuutru = [];
let hanghoa = [];

addItem(item1, hanghoa);
addItem(item2, hanghoa);
addItem(item3, hanghoa);
sell(item1, hanghoa, kholuutru);
sell(item3, hanghoa, kholuutru);
checkBill(kholuutru);
