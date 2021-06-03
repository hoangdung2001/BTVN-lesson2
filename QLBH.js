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
