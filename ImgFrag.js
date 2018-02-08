class ImgFrag{
  constructor(img, targetPosX, targetPosY,x,y,nx,ny){
    this.img = img                    // 要绘制的图片点
    this.x = x                        // 当前图片点在canvas中的x坐标
    this.y = y                        // 当前图片点在canvas中的y坐标
    this.targetPosX = targetPosX      // 图片点在目标位置x
    this.targetPosY = targetPosY      // 图片点在目标位置y
    this.vx = 0.2                     // 图片点x方向速度
    this.vy = 0.2                     // 图片点在y方向的速度
    this.nx = nx                      // 图片下落的时候x方向的速度
    this.ny = ny                      // 图片下落时候y方向的速度
  } 
}