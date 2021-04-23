a = prompt("Nhập s1")
n = prompt("Nhập s2")
function findOppsiteNumber(a, n) {
  let c = "";
  if (a.length === n.length) {
    for (let i in a) {
      c += a[i] + n[i];
    }
  } else {
    if (a.length > n.length) {
      for (let i in n) {
        c += a[i] + n[i];
      }
      for (let j = n.length; j < a.length; j++) {
        c += a[j];
      }
    }
    if (n.length > a.length) {
      for (let i in a) {
        c += a[i] + n[i];
      }
      for (let j = a.length; j < n.length; j++) {
        c += n[j];
      }
    }
  }
  return c;
}
console.log(findOppsiteNumber(a,n));
