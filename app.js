// variables for setup

let container; // class name of the div element in the html file that we'll inject the js into
let camera; // what you're looking at in the 3D world 
let renderer; // what's going to render the 3D model
let scene; // the 3D world scene and the camera looks at that scene
let house; // for the 3D model

function init() {
    container = document.querySelector('.scene'); // grabbing the div with the class of '.scene' in the html in order to inject with the 3D model so that it renders on the browser

    // create scene adn add the scene to the container
    scene = new THREE.Scene(); // after the new keyword --> js3d syntax

    const fov = 35; // here we're setting the field of view for the scene to 35 degrees, close to a monitor 90 is ok, big tv and further back, 60ish is ok. it depends on each model and situation
    const aspect = container.clientWidth / container.clientHeight; // what we're going to view on screen
    
    // clipping --> if it's outside of the zone that we set, you cannot see the model (ex: near clipping of 1, far clipping of 50 only renders what's inside of that range, anything else is not visible), clipping distances are in meters
    const near = 0.1;
    const far = 1000;

    // CAMERA
    // there are two types of cameras: 1). perspectiveCamera (lets you view 3D models like you image them, in 3D, this is the more common option) and 2). orthographicCamera (this kind of flattens everything closer to a 2D view)
    // takes arguments above that we've defined (field of view, aspect, near clipping, and far clipping), this sets up the limitations of view
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far); 
    // now we set the position of the camera, and it takes (x, y, and z) arguments, you need to play around with the arguments in order to achieve different effects
    camera.position.set(0, 3, 20);

    // RENDERER
    // antialias adds blur/opacity to the pixel edges so that the final rendered image looks smooth (especially when zoomed in)
    // setting alpha to true lets us set any background we want 
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    // set the size of the renderer 
    renderer.setSize(container.clientWidth, container.clientHeight);
    // set the pixel ratio to better match the device to user is on
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // injects a canvas in order to render the model
    container.appendChild(renderer.domElement);

    // LOAD MODEL
    // setting the GLTFLoader to a variable
    let loader = new THREE.GLTFLoader();
    // loading the model, use the path inside of the 3D directory and write a function to load the arguments defined above
    loader.load('./3d/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        renderer.render(scene, camera);
    })
    

}

init()
console.log(init());