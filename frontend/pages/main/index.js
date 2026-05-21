import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    // Данные по 4 варианту (Животные)
    getData() {
        return [
            {
                id: 1,
                src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=300&h=200&fit=crop",
                title: "Лев",
                text: "Царь зверей"
            },
            {
                id: 2,
                src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=300&h=200&fit=crop",
                title: "Слон",
                text: "Величественный гигант"
            },
            {
                id: 3,
                src: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=300&h=200&fit=crop",
                title: "Пингвин",
                text: "Житель льдов"
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

   render() {
        this.parent.innerHTML = '';
        const html = `
            <div class="container mt-5">
                <h1 class="text-center mb-4">Мир животных</h1>
                <div id="main-page" class="d-flex flex-wrap justify-content-center gap-3"></div>

                <div class="fixed-bottom bg-primary text-white py-2">
                    <marquee behavior="scroll" direction="left">
                        Добро пожаловать в мир дикой природы! Узнайте больше о львах, слонах и пингвинах в нашей галерее.
                        Вариант №4 — Выполнено студенткой группы ИУ5-45Б Аней.
                    </marquee>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
