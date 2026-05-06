import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {AccordionComponent} from "../../components/accordion/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const animals = {
            1: { title: "Лев", src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600", habitat: "Саванны", fact: "Спят 20 часов." },
            2: { title: "Слон", src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600", habitat: "Джунгли", fact: "Умеют плавать." },
            3: { title: "Пингвин", src: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=600", habitat: "Антарктида", fact: "Фильтруют соль." }
        };
        return animals[this.id];
    }

    render3D() {
        const canvas = document.getElementById('canvas-3d');
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa);
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / 400, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvas.clientWidth, 400);
        canvas.appendChild(renderer.domElement);

        const light = new THREE.AmbientLight(0x404040, 2);
        scene.add(light);

        // Используем стандартную модель уточки для примера (она точно работает)
        const loader = new THREE.GLTFLoader();
        loader.load('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb', (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(1, 1, 1);
        });

        camera.position.z = 2;
        const animate = () => {
            requestAnimationFrame(animate);
            scene.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }

    render() {
        this.parent.innerHTML = '';
        const data = this.getData();
        const html = `
            <div class="container mt-5">
                <div id="back-btn-container"></div>
                <div class="row">
                    <div class="col-md-6">
                        <img src="${data.src}" class="img-fluid rounded mb-3">
                        <div id="canvas-3d" class="border rounded" style="height: 400px;"></div>
                    </div>
                    <div class="col-md-6">
                        <h2>${data.title}</h2>
                        <div id="accordion-container"></div>
                    </div>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        new BackButtonComponent(document.getElementById('back-btn-container')).render(() => new MainPage(this.parent).render());
        new AccordionComponent(document.getElementById('accordion-container')).render(data);
        this.render3D();
    }
}
