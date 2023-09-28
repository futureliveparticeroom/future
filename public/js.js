import * as THREE from 'three';
// import GifLoader from 'three-gif-loader';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xEEEEEE);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const gradientTexture = createGradientTexture();
const backgroundPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(111100, 150),
  new THREE.MeshBasicMaterial({ map: gradientTexture })
);
backgroundPlane.position.z = -145; 
scene.add(backgroundPlane);

function createGradientTexture() {
  const canvas = document.createElement('canvas');
  canvas.width =  256;
  canvas.height = 256;
  
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  
  gradient.addColorStop(0, '#B8CADF'); // 顶部颜色，蓝色
  gradient.addColorStop(0.5, '#FFFFFF'); // 中间颜色，绿色
  gradient.addColorStop(1, '#B8CADF'); // 底部颜色，红色
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  return new THREE.CanvasTexture(canvas);
}

// const loader = new GifLoader();
// fetch('http://localhost:3000/getVideos')
//   .then((response) => response.json())
//   .then((imagePaths) => {

const planes = [];
const planeCount = 15;
const planeSize = 1.4;



for (let i = 1; i < planeCount; i++) {

  const videoElement= document.getElementById('video4');

  const texture = new THREE.VideoTexture( videoElement );

  // const texture = new THREE.TextureLoader().load(imagePaths[i % imagePaths.length]);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize*1.778), material);
  plane.material.opacity = 1;

  const x = (Math.random() - 0.5) * 20;
  const y = (Math.random() - 0.5) * 10;
  const z = (Math.random() - 1.0) * 5 -2;
  plane.position.set(x, y, z);

  planes.push(plane);
  scene.add(plane);
}

    for (let i = 1; i < planeCount; i++) {

      const videoElement= document.getElementById('video3');

      const texture = new THREE.VideoTexture( videoElement );

      // const texture = new THREE.TextureLoader().load(imagePaths[i % imagePaths.length]);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize*1.778), material);
      plane.material.opacity = 1;
   
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 1.0) * 5 -2;
      plane.position.set(x, y, z);

      planes.push(plane);
      scene.add(plane);
    }

    for (let i = 1; i < planeCount; i++) {

      const videoElement= document.getElementById('video2');

      const texture = new THREE.VideoTexture( videoElement );

      // const texture = new THREE.TextureLoader().load(imagePaths[i % imagePaths.length]);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize*1.778), material);
      plane.material.opacity = 1;
   
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 1.0) * 5 -2;
      plane.position.set(x, y, z);

      planes.push(plane);
      scene.add(plane);
    }
    for (let i = 1; i < planeCount; i++) {

      const videoElement= document.getElementById('video1');

      const texture = new THREE.VideoTexture( videoElement );

      // const texture = new THREE.TextureLoader().load(imagePaths[i % imagePaths.length]);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize*1.778), material);
      plane.material.opacity = 1;
   
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 1.0) * 5 -2;
      plane.position.set(x, y, z);

      planes.push(plane);
      scene.add(plane);
    }
  // })
  // .catch((error) => console.error(error));




camera.position.z = 5;

const moveDirection = new THREE.Vector3(0, 0, 0.005);


const animate = () => {
  requestAnimationFrame(animate);


  planes.forEach((plane) => {
    plane.position.add(moveDirection);

    if (plane.position.z >1) {
      
      plane.position.z = -5;
    }

    if (plane.position.z > 0 && plane.position.z < 1) {

      plane.material.opacity = (1 - (plane.position.z ))/plane.position.z  ;

    } else if (plane.position.z < -2 && plane.position.z > -7) {

      plane.material.opacity = 1 - (-2 - plane.position.z) / 2;

    } else {
      plane.material.opacity = 1;
    }
  
    plane.material.transparent = true;
    plane.material.needsUpdate = true;
    const target = new THREE.Vector3(camera.position.x, plane.position.y, camera.position.z);

    plane.lookAt(target);
  });



  renderer.render(scene, camera);
};


animate();

// function updateImages() {
//   fetch('http://localhost:3001/getImages')
//     .then((response) => response.json())
//     .then((imagePaths) => {
//       planes.forEach((plane, i) => {
//         const newTexture = new THREE.TextureLoader().load(imagePaths[i % imagePaths.length], () => {
//           plane.material.map = newTexture;
//           plane.material.needsUpdate = true;
//         });
//       });
//     })
//     .catch((error) => console.error(error));
// }



// const updateInterval = 30000;
// setInterval(updateImages, updateInterval);

// function updateImagesWhenIdle() {

//   updateImages();
  

//   // window.requestIdleCallback(() => {
//   //   updateImagesWhenIdle();
//   // }, { timeout: updateInterval });
// }

// const updateInterval = 10000; 
// window.requestIdleCallback(() => {
//   updateImagesWhenIdle();
// }, { timeout: updateInterval });