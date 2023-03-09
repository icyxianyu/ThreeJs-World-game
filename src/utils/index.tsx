import { ImprovedNoise } from "./ImprovedNoise";

export function launchFullScreen(element :any) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
export  function funZ(width: number, height: number) {
    var size = width * height;
    var data = new Uint8Array(size);
    var perlin = new ImprovedNoise();
    // 控制地面显示效果  可以尝试0.01  0.1  1等不值
    // 0.1凹凸不平的地面效果  1山脉地形效果
    var quality = 1;
    // z值不同每次执行随机出来的地形效果不同
    var z = Math.random() * 100;
    for (var j = 0; j < 4; j++) {
      for (var i = 0; i < size; i++) {
        // x的值0 1 2 3 4 5 6...
        var x = i % width;
        // ~表示按位取反 两个~就是按位取反后再取反
        // ~~相当于Math.floor(),效率高一点
        // y重复若干个值
        var y = ~~(i / width);
        // 通过噪声生成数据
        data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75);
      }
      // 循环执行的时候，quality累乘  乘的系数是1  显示效果平面
      quality *= 5;
    }
    return data;
  }