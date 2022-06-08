import styles from './Canvas.module.scss';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { useRef,useEffect } from 'react';
import { Mesh } from 'three';

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

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width=canvasContainer.current.getBoundingClientRect().width;
        sizes.height=canvasContainer.current.getBoundingClientRect().height;
        const{width,height} = sizes;
        // Update camera
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(width, height);
    })

    const light = new THREE.AmbientLight( 'white',0.5); // soft white light
    scene.add( light );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 4 );
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
    // Instantiate a loader

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


    camera.position.z = 1.1;
    camera.position.y = 0.3;
    camera.position.x = 1.4;

    const controls = new OrbitControls( camera, canvas.current );
    controls.enableZoom =false;
    controls.enableDamping =true;
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
