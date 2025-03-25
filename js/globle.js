// 检测滚动条 将动画重置


let getyear = new Date().getFullYear();
let getyeardiv = document.getElementById('currentyear');
if (getyeardiv) {
    getyeardiv.innerHTML = getyear;
}


// header栏固定
function headerfixed() {
    let getheaderdiv = document.getElementsByTagName('header')[0].classList;
    if (document.documentElement.scrollTop > 100) {
        getheaderdiv.add('fixed');
    } else {
        getheaderdiv.remove('fixed');
    }
}
window.onscroll = headerfixed;


// 2秒后隐藏蒙版
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hide'); // 添加隐藏类
    }
}, 2000);