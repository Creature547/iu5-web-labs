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
            1: {
                title: "Лев",
                src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=600&h=400&fit=crop",
                habitat: "Саванны Африки",
                fact: "Львы могут спать до 20 часов в сутки."
            },
            2: {
                title: "Слон",
                src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&h=400&fit=crop",
                habitat: "Джунгли и саванны",
                fact: "Слоны умеют плавать, используя хобот как трубку."
            },
            3: {
                title: "Пингвин",
                src: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=600&h=400&fit=crop",
                habitat: "Антарктида",
                fact: "У пингвинов есть особая железа, фильтрующая соль из морской воды."
            }
        };
        return animals[this.id];
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const data = this.getData();
        const html = `
            <div class="container mt-5">
                <div id="back-btn-container"></div>
                <div class="row">
                    <div class="col-md-6"><img src="${data.src}" class="img-fluid rounded shadow"></div>
                    <div class="col-md-6">
                        <h2>${data.title}</h2>
                        <div id="accordion-container"></div>
                    </div>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        new BackButtonComponent(document.getElementById('back-btn-container')).render(this.clickBack.bind(this));
        new AccordionComponent(document.getElementById('accordion-container')).render(data);
    }
}
