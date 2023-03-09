import  * as THREE from "three"
import CANNON from "cannon"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { funZ } from "../../utils"
export const useInit = (ref:any) =>{
    return function(){
        const current = ref.current;
        const scene = new THREE.Scene();
        var width = 1000, height = 1000;

        //只有移动视角 
        var axesHelper = new THREE.AxesHelper(12)
        scene.add(axesHelper);


        //初始化场景

        const camera = new THREE.PerspectiveCamera( 75, current.clientWidth / current.clientHeight, 0.1, 1000 );
        camera.position.set(250, 250, 250);
        camera.lookAt(scene.position);
        //初始化相机

        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xfff)
        renderer.setSize( current.clientWidth, current.clientHeight );
        current.appendChild( renderer.domElement );
        // 初始化渲染器


        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        scene.add( directionalLight );
        // 初始化光源
        

            // 初始化物理世界
            const world = new CANNON.World();
            // 在多个步骤的任意轴上测试刚体的碰撞
            world.broadphase = new CANNON.SAPBroadphase(world);
            // 设置物理世界的重力为沿y轴向上-10米每二次方秒
            world.gravity.set(0, -10, 0);
            // 创建默认联系材质
            world.defaultContactMaterial.friction = 0;
            const groundMaterial = new CANNON.Material("groundMaterial");
            const wheelMaterial = new CANNON.Material("wheelMaterial");
            const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
            // 摩擦系数
            friction: 0,
            // 恢复系数
            restitution: 0,
            // 接触刚度
            contactEquationStiffness: 1000});
            world.addContactMaterial(wheelGroundContactMaterial);


            // 
          const data = funZ(width,height);
          const geometry = new THREE.PlaneGeometry(width,height, width - 1, height - 1);
          geometry.rotateX(-Math.PI / 2);

          // 访问几何体的顶点位置坐标数据
          var vertices = geometry.attributes.position;
          const {array} = vertices as any

          for (var i = 0, j = 0, l = array.length; i < l; i++, j += 3) {
            array[j + 1] = data[i] *0.3;
          }
          // 不执行computeVertexNormals，没有顶点法向量数据
          geometry.computeVertexNormals();
          var material = new THREE.MeshLambertMaterial({
            color: 0xCAA066,
            side: THREE.DoubleSide,
          });
          var mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
        // 


          const controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
          controls.addEventListener('change', animate);//监听鼠标、键盘事件
        
        function animate() {
            renderer.render( scene, camera );
        }
        requestAnimationFrame( animate );

        return {scene,camera,renderer,world,}
    }
}