// 渲染画布
function Watermark(canvas,option) {
    this.title = "默认水印";//水印内容
    this.rotate = 0;//倾斜角度
    this.color = 'rgba(250,250,250,1)';//水印颜色
    this.size = '20';//水印大小
    this.transparent = 1;//透明度
    this.mode = 'rightB';//水印排布模式
    this.overspread = '0';//是否循环铺满
    option && this.getOption(option);
    this.modeList = {
        'leftT': {
            top:this.size,
            left:"10",
            textAlign:"left"
        },
        'rightT': {
            top:this.size,
            left:width-10,
            textAlign:"end"
        },
        'rightB': {
            top:height-this.size,
            left:width-10,
            textAlign:"end"
        },
        'leftB': {
            top:height-this.size,
            left:"10",
            textAlign:"left"
        },
    };// 排布模式组合
    this.text(canvas)
}
// 用于解析传递进来的参数
Watermark.prototype.getOption = function (option){
    let _this = this;
    for(item in option){
        option[item]?_this[item] = option[item]:'';
    }
    return _this;
}
// 开始绘制文字
Watermark.prototype.text = function(canvas){
    let cxt = canvas.getContext('2d');
    // 设置字体样式
    cxt.font=`${this.size}px Georgia`;
    // 设置颜色 和 设置透明度
    cxt.fillStyle = this.color;
    cxt.globalAlpha  = this.transparent;
    // 设置旋转角度
    cxt.rotate(-this.rotate/180);
    // 填充文案
    textPosition = this.modeList[this.mode];
    // 是否开启循环铺满
    if(this.overspread == 1){
        let orgTitle = this.title+'    ';
        let textHeight = -(-20 - this.size);//定义一个文字的高度
        // 获取文字长度，然后先每排铺满
        let textNum = Math.ceil(width/cxt.measureText(orgTitle).width)*2;
        let heightNum = Math.ceil(height/textHeight);
        this.title = new Array(textNum).join(orgTitle);
        let leftF = 0,rightF = 0;
        if(this.rotate>0){
            leftF = height*Math.sin(this.rotate/180)
        }else{
            rightF = cxt.measureText(this.title).width*Math.sin(this.rotate/180)
        }
        // 开始循环
        for(let i=0;i<heightNum*3;i++){
            cxt.fillText(this.title,-leftF,i*textHeight+rightF);
        }
    }else{
        cxt.textAlign = textPosition.textAlign;
        cxt.fillText(this.title,textPosition.left,textPosition.top);
    }
    cxt.save();
    this.imageUrl()
}
// 获取图片路径
Watermark.prototype.imageUrl = function(){
    let dataURL = canvasC.toDataURL('image/png');
    window.watermarkPreview.src = dataURL;
}
Watermark.prototype.getBase64 = function(base64) {
  var changebase64 = base64.replace(/[\r\n]/g, "");
  return changebase64;
}