// 蒙版点击事件
document.addEventListener('DOMContentLoaded', function () {
    const showHeadInner = localStorage.getItem('headInnerDiv');
    const headInnerDiv = document.querySelector('.headInner');
    // 如果没有点击过蒙版，则显示蒙版
    if (showHeadInner == '1') {
        headInnerDiv.classList.add('hide');
    }
    const link = document.querySelector('.maskbutton');
    link.addEventListener('click', function (event) {
        headInnerDiv.classList.add('hide');
        localStorage.setItem('headInnerDiv', '1');
    });
});




// 开场动画 监听页面初始化完成
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const anima = document.querySelector('.intro-animation')
        if (anima) {
            anima.style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.intro-animation').style.display = 'none';
            }, 1000);
        }
    }, 3000);
});
// 点击图片放大
document.addEventListener('DOMContentLoaded', function () {
    var images = document.querySelectorAll('.entry__thumb img');
    images.forEach(function (img) {
        img.addEventListener('click', function () {
            // 创建一个全屏遮罩层
            var mask = document.createElement('div');
            mask.style.position = 'fixed';
            mask.style.top = 0;
            mask.style.left = 0;
            mask.style.right = 0;
            mask.style.bottom = 0;
            mask.style.zIndex = 999;
            mask.style.backdropFilter = "blur(2px)";
            mask.style.background = 'rgba(0,0,0,0.5)';
            mask.style.display = 'flex';
            mask.style.justifyContent = 'center';
            mask.style.alignItems = 'center';
            mask.style.transition = "all 10s ease-in-out"
            // 创建一个大图元素
            var bigImg = new Image();
            bigImg.src = img.getAttribute('data-bigimg');
            bigImg.style.maxWidth = '90%'; // 可以自定义最大宽度
            bigImg.style.maxHeight = '90%'; // 可以自定义最大高度
            // 点击空白部分关闭遮罩层
            mask.addEventListener('click', function () {
                document.body.removeChild(mask);
            });
            // 将大图和关闭按钮添加到遮罩层
            mask.appendChild(bigImg);
            // 将遮罩层添加到body
            document.body.appendChild(mask);

            bigImg.classList.add('fade-in');
        });
    });
});