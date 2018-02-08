class Main {
  constructor(targetPosX = 450, targetPosY = 50) {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext("2d")
    console.log(document.body.clientHeight)
    this.canvasW = this.canvas.width = document.body.clientWidth// canvas 的宽
    this.canvasH = this.canvas.height = document.body.clientHeight// canvas 的高
    this.imgW // 图片的宽
    this.imgH // 图片的高
    this.density = 1 // 每次取得像素密度
    this.targetPosX = targetPosX // 图片想要绘制在canvas中的位置X
    this.targetPosY = targetPosY // 图片想要绘制在canvas中的位置Y
    this.fragList = new Array() // 存放每一个图片点的数组   
    this.copyList               // copy一份图片点的数组 
    this.counter = 1            // 用来限制那些图片点可以运动
    this.isDown = false         // 图片是否已经落下
    this.init()
  }

  // 初始化
  init() {
    let _this = this
    let img = new Image()
    img.src = './imgs/timg.jpeg'
    img.onload = function () {
      _this.imgW = img.width
      _this.imgH = img.height
      let max = Math.max(_this.imgW, _this.imgH)
      _this.density = Math.floor(max/100)
      console.log(_this.density)
      _this.ctx.drawImage(img, 0, 0, _this.imgW, _this.imgH)

      for (var i = 0; i < _this.imgW / _this.density; i++) {
        _this.fragList[i] = []
        for (var j = 0; j < _this.imgH / _this.density; j++) {
          let fragImg = _this.ctx.getImageData(j * _this.density, i * _this.density, _this.density, _this.density) // 图片片段
          let targetPosX = j * _this.density + _this.targetPosX // 目标x位置
          let targetPosY = i * _this.density + _this.targetPosY // 目标y位置
          let x = Math.random() * _this.canvasW // 随机到canvas中x位置
          let y = Math.random() * _this.canvasH // 随机到canvas中y位置
          let nx = 0
          let ny = 0
          let frmg = new ImgFrag(fragImg, targetPosX, targetPosY, x, y,nx,ny)
          _this.fragList[i][j] = frmg
        }
      }
      _this.ctx.clearRect(0, 0, _this.canvasW, _this.canvasH)

      _this.draw()
    }
  }

  // 绘制图片
  draw() {
    let _this = this
    _this.ctx.clearRect(0, 0, _this.canvasW, _this.canvasH)
    if (_this.counter < _this.imgH) _this.counter++;
    if(!_this.isDown){
      for (let i = 0; i < this.imgW / _this.density; i++) {
        for (let j = 0; j < this.imgH / _this.density; j++) {
          let frag = this.fragList[i][j]
          if (i < _this.counter) {
            let tx = frag['targetPosX']
            let ty = frag['targetPosY']
            let x = frag['x']
            let y = frag['y']
            let dx = tx - x
            let dy = ty - y
            if (Math.abs(dx) < 0.5) {
              frag['x'] = tx
            } else {
              frag['x'] += dx * frag['vx']*Math.random()*1.5
            }
            if (Math.abs(dy) < 0.5) {
              frag['y'] = ty
            } else {
              frag['y'] += dy * frag['vy'] * Math.random() * 1.5
            }
          }

          this.ctx.putImageData(frag['img'], frag['x'], frag['y'])
        }
      }
    }else{
      for (let i = 0; i < _this.imgW / _this.density; i++) {
        for (let j = 0; j < _this.imgH / _this.density; j++) {
          let frag = _this.fragList[i][j]
            let ty = _this.canvasH - 20
            frag['x'] += frag['nx']
            frag['y'] += frag['ny']
          if (frag['y']>=ty){
            frag['y'] = ty
            frag['ny']*=-Math.random()*0.5
            if (Math.abs(frag['ny'])<=1){
              frag['ny']=0
            }
            if (Math.abs(frag['ny']) <= 1) frag['nx'] = 0;
          }else{
            frag['ny'] += 1
          }
            
          _this.ctx.putImageData(frag['img'], frag['x'], frag['y'])
        }
      }
    }
    
    window.requestAnimationFrame(_this.draw.bind(_this))
  }
  down (){
    let _this = this
    this.isDown = !this.isDown
    if(this.isDown){
      for (let i = 0; i < _this.imgW / _this.density; i++) {
        for (let j = 0; j < _this.imgH / _this.density; j++) {
          let frag = _this.fragList[i][j]
          frag['nx'] = (Math.random() - Math.random()) * 5;
          frag['ny'] = -Math.random() * 10
        }
      }
    }
    
    this.counter = 1
  }
}