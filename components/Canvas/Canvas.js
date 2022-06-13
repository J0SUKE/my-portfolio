import styles from './Canvas.module.scss';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { useRef,useEffect } from 'react';
import { Mesh } from 'three';
import gsap from 'gsap'
import { throttle } from 'lodash';

export default function Canvas() {
  
  const canvas = useRef();
  const canvasContainer = useRef();

  useEffect(()=>{
    const scene = new THREE.Scene();

    let sizes = {
        width:canvasContainer.current.getBoundingClientRect().width,
        height:canvasContainer.current.getBoundingClientRect().height
    }

    const{width,height} = sizes;

    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );


    const renderer = new THREE.WebGLRenderer(
        {
            canvas:canvas.current,
            alpha:true,
            antialias: true
        }
    );
    renderer.setSize(width,height);
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const light = new THREE.AmbientLight( 'white',0.5); // soft white light
    scene.add( light );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
    directionalLight.castShadow = true
    directionalLight.position.y = 2;
    directionalLight.position.z = -1;
    directionalLight.position.x = 3;
    
    scene.add( directionalLight );

    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.mapSize.set(2048,2048)


    // Models -------------
    let group = new THREE.Group();
    scene.add(group);

    const floor = new Mesh(
        new THREE.PlaneGeometry(7,7,7),
        new THREE.MeshStandardMaterial({
            color:'white',
            toneMapped:false
        })
    )
    floor.receiveShadow = true;
    floor.rotateX(-Math.PI/2);
    floor.position.y = -1.2
    scene.add(floor);
    
    const texture = new THREE.TextureLoader().load( "/images/screen.png" );
    

    let screen = new Mesh(
        new THREE.PlaneGeometry(0.42,0.26,1),
        new THREE.MeshBasicMaterial({
            map:texture,
            toneMapped:false
        })
    )
    screen.position.x-=0.11;
    screen.position.y-=0.098;
    screen.position.z-=0.003;
    screen.rotateY(Math.PI/2);

    group.add(screen);

    // 3D models ----------------------

    // Instantiate a loader
    const loader = new GLTFLoader();

    const updateAllMaterials = () =>
    {
        scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                // ...

                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    loader.load(
        '/models/desk/Desk.glb',
        (gltf)=>{
            group.add(gltf.scene);
            gltf.scene.position.y = -1.2;
            gltf.scene.children.forEach(element => {
                element.castShadow = true
                element.receiveShadow = true
                element.position.y = -1.2;
                group.add(element);    
            });       
            updateAllMaterials();

        }
    )

    loader.load(
        '/models/plant/plant.glb',
        (gltf)=>{
            
            gltf.scene.children.forEach(element => {
                
                element.position.y = -0.26;
                element.position.z = -0.6;
                
                element.scale.x /=15;
                element.scale.y /=15;
                element.scale.z /=15;

                element.castShadow = true
                element.receiveShadow = true

                group.add(element);    
            });       
            updateAllMaterials();
        }
    )

    loader.load(
        '/models/pc/pc.glb',
        (gltf)=>{
            gltf.scene.scale.x /=6;
            gltf.scene.scale.y /=6;
            gltf.scene.scale.z /=6;

            gltf.scene.rotateY(Math.PI/2);
            gltf.scene.position.y = -0.24;

            group.add(gltf.scene);

            gltf.scene.children.forEach(element => {
                element.scale.x /=6;
                element.scale.y /=6;
                element.scale.z /=6;
                
                element.rotateY(Math.PI/2);

                element.position.y = -0.24;

                element.castShadow = true
                element.receiveShadow = true

                group.add(element);    
            });       
            gltf.scene.children[0].children.forEach(element => {
                element.position.y = -0.24;
                element.scale.x /=6;
                element.scale.y /=6;
                element.scale.z /=6;
                element.rotateY(Math.PI/2);
                element.castShadow = true
                element.receiveShadow = true

                group.add(element);    
            });       

            updateAllMaterials();
        }
    )

    loader.load(
        '/models/mug/mug.glb',
        (gltf)=>{
            
            gltf.scene.position.set(-0.1,-0.1,0);
            gltf.scene.children[0].position.set(0.3,-0.21,-0.3);
            
            gltf.scene.rotateY(Math.PI/4);
            gltf.scene.children[0].rotateY(Math.PI/4);
            
            group.add(gltf.scene);
            group.add(gltf.scene.children[0]);
            
            updateAllMaterials();
        }
    )

    loader.load(
        '/models/chair/chair.glb',
        (gltf)=>{
            
            gltf.scene.children[0].scale.set(0.03,0.03,0.03);
            gltf.scene.children[0].position.set(-5.5,-1.2,-10);
            gltf.scene.children[0].rotateY(-Math.PI/2)
            group.add(gltf.scene.children[0])
            
        }
    )

    loader.load(
        '/models/lamp/lamp.glb',
        (gltf)=>{
            gltf.scene.scale.set(0.4,0.4,0.4);
            gltf.scene.position.set(-0.3,0,0.5);
            gltf.scene.rotateY(Math.PI/1.5);

            group.add(gltf.scene);
            

            gltf.scene.children.forEach(element => {
                element.scale.set(0.4,0.4,0.4);
                element.position.set(-0.3,0,0.5);
                element.rotateY(Math.PI/1.5);
                group.add(element);
            });

            updateAllMaterials();

        }
    )

    loader.load(
        '/models/headphones/headphones.glb',
        (gltf)=>{
            gltf.scene.scale.set(0.004,0.004,0.004);
            gltf.scene.rotateY(Math.PI/8);
            gltf.scene.rotateX(Math.PI/1.45);
            gltf.scene.position.set(0.1,-0.23,0.5);
            group.add(gltf.scene);
        }
    )

    // camera -------------

    let camPosition = {
        x:1.1,
        y:0.3,
        z:1.4,
    }

    if (window.innerWidth<=700) {
        camPosition.x = 2;
        camPosition.z =2;   
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width=canvasContainer.current.getBoundingClientRect().width;
        sizes.height=canvasContainer.current.getBoundingClientRect().height;
        const{width,height} = sizes;
        // Update camera
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        if (window.innerWidth<=700) {
            camPosition.x = 2;
            camPosition.z =2;   
        }
        else
        {
            camPosition.x = 1.1;
            camPosition.z =1.4;   
        }

        camera.position.x = camPosition.x;
        camera.position.z = camPosition.z;


        // Update renderer
        renderer.setSize(width, height);
    })

    

    const{x,y,z} = camPosition;

    camera.position.z = x;
    camera.position.y = y;
    camera.position.x = z;
    
    let animating = false;
    let initialTop = 0;

    function resetCameraPosition() {
        const {scrollTop,clientHeight} = document.documentElement;   
        let ratio = scrollTop/clientHeight;
        let initailPos = 0.3-Math.sin(ratio);
        
        initialTop=scrollTop;
        animating = true;
        gsap.to(
            camera.position,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: camPosition.x,
                z: camPosition.z,
                y: initailPos,
                onComplete:()=>{
                    animating=false;
                }
            }
        )
    }

    function handleScroll() {
        const {scrollTop,clientHeight} = document.documentElement;   

        let ratio = scrollTop/clientHeight;
        if (animating) {
            window.scrollTo(0,initialTop);
        }
        if (ratio<=1 && !animating) {
            camera.position.y = 0.3-Math.sin(ratio);    
        }
    }

    canvas.current.addEventListener("mouseup",throttle(()=>{resetCameraPosition()}))
    canvas.current.addEventListener("touchend",throttle(()=>{resetCameraPosition()}));
    window.addEventListener("scroll",throttle(()=>{handleScroll()}))

    const controls = new OrbitControls( camera, canvas.current );
    controls.enableZoom =false;
    controls.enableDamping =true;
    controls.enablePan = false;
    controls.update();

    renderer.render( scene, camera );


    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );

    }
    animate();
    
  },[])
  
  
return (
    <div className={styles.sceneContainer} ref={canvasContainer}>
        <canvas className={styles.webGL} ref={canvas}></canvas>
    </div>
    
  )
}
