let watermarkPreview = document.getElementById("WatermarkPreview")
let orgImg = false;
// 上传图片
function changeFile(e){
    let imgPreview = document.getElementById("preview");
    let file = e.files && e.files[0];// 获取上传图片内容
    if(file){
        // 获取文件信息之后，转化成base64链接展示
        let reader = new FileReader();
        reader.readAsDataURL(file);//发起异步
        reader.onload = function (res){
            imgPreview.src = this.result;
            orgImg = true;
        }
    }
}
/**
 * @description 提交水印设置数据
 * */ 
function setWatermark(formId){
    if(!orgImg) return alert("请上传源图");
    let formElm = document.getElementById(formId)
    let inputList = formElm.getElementsByTagName("input");
    let selectList = formElm.getElementsByTagName("select");
    let option = {};
    for(item of inputList){
        option[item.name] = item.value
    }
    for(item of selectList){
        option[item.name] = item.value
    }
    let imgPreview = document.getElementById("preview");
    init(imgPreview.src,option)
}
// 渲染图片
let width=0,height=0;
let canvasC =null;
function init(imgSrc,option) {
    // 水印属性
    var img = new Image();
    img.src = imgSrc;
    img.setAttribute("crossOrigin",'Anonymous')
    img.onload = function (e) {
        width = e.path[0].naturalWidth;
        height = e.path[0].naturalHeight;
        // 动态创建一个canvas
        let canvasList = document.getElementsByTagName('canvas')
        if(!(canvasList && canvasList.length)){
            canvasC = document.createElement("canvas");
            canvasC.hidden = true
            document.getElementsByTagName('body')[0].appendChild(canvasC)
        }else{
            canvasC = canvasList[0];
        }
        // 获取原画的长宽属性
        canvasC.width = width;
        canvasC.height = height;
        let cxt = canvasC.getContext('2d');
        cxt.clearRect(0,0,width,height)
        cxt.drawImage(img, 0, 0);
        // 水印属性添加。
        let watermark = new Watermark(canvasC,option);
    }
}