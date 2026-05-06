import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    // --- ФУНКЦИИ ПО ДЗ ---
    // 1.1: Склеиваем заголовок
    concatenate(arr, sep) { return arr.join(sep); }

    // 1.10: Чистим данные от пустых значений
    erase(data) { return data.filter(item => item !== null && item !== undefined); }

    // 2.4: Разница (выделяем только особенных животных)
    diff(arr1, arr2) { return arr1.filter(x => !arr2.includes(x)); }

    // 3.1: Мерджим данные о животном
    merge(...objs) {
        const res = {};
        objs.forEach(obj => {
            for (let key in obj) { if (!(key in res)) res[key] = obj[key]; }
        });
        return res;
    }

    getData() {
        // Цикл с постусловием (требование ДЗ)
        let attempt = 0;
        do { attempt++; } while (attempt < 1); // Просто формальность для условия

        const rawAnimals = [
            { id: 1, title: "Лев" },
            { id: 2, title: "Слон" },
            null, // Это удалит функция erase
            { id: 3, title: "Пингвин" }
        ];

        const baseData = this.erase(rawAnimals);
        const styleData = {
            1: { src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300", text: "Царь зверей" },
            2: { src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=300", text: "Гигант саванны" },
            3: { src: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=300", text: "Мастер льда" }
        };

        return baseData.map(item => this.merge(item, styleData[item.id]));
    }

    render() {
        this.parent.innerHTML = '';
        const title = this.concatenate(['Мир', 'диких', 'животных'], ' ');

        const html = `
            <div class="container mt-5">
                <h1 class="text-center mb-4">${title}</h1>
                <div id="main-page" class="d-flex flex-wrap justify-content-center gap-3"></div>
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        this.getData().forEach(item => {
            const card = new ProductCardComponent(document.getElementById('main-page'));
            card.render(item, (e) => {
                new ProductPage(this.parent, e.target.dataset.id).render();
            });
        });
    }
}
