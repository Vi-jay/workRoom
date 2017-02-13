let s;
function aa() {
    s = setTimeout(() => {
        aa();
        console.log(1)
    }, 2000);
}
aa();
clearTimeout(s);