import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {AccordionComponent} from "../../components/accordion/index.js";
// Добавляем импорты для работы с сетью
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        // Запрашиваем данные конкретно для этой карточки по ID
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }

    renderData(data) {
        // Этот HTML был у тебя в методе render, теперь мы рисуем его, когда данные пришли
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

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        // Запускаем запрос данных
        this.getData();
    }
}
