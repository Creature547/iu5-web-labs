import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
// Добавляем импорты для работы с сетью
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    // Запрос к API вместо статического массива
    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        });
    }

    // Отдельный метод для отрисовки данных, которые пришли с сервера
    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
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
                        Добро пожаловать в мир дикой природы! Узнайте больше в нашей галерее.
                    </marquee>
                </div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        // Запускаем процесс получения данных
        this.getData();
    }
}
