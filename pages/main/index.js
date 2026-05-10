import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";


let rl;
if (typeof process !== 'undefined' && process.stdin) {
    const readline = await import('readline');
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    concatenate(arr, sep) { return arr.join(sep); }

    erase(data) { return data.filter(item => item !== null && item !== undefined); }

    diff(arr1, arr2) { return arr1.filter(x => !arr2.includes(x)); }

    merge(...objs) {
        const res = {};
        objs.forEach(obj => {
            for (let key in obj) { if (!(key in res)) res[key] = obj[key]; }
        });
        return res;
    }

    getData() {
        let attempt = 0;
        do { attempt++; } while (attempt < 1);

        const rawAnimals = [
            { id: 1, title: "Лев" },
            { id: 2, title: "Слон" },
            null,
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

    anagram(words) {
    const groups = {};

    words.forEach(word => {
        const sortedKey = word.toLowerCase().split('').sort().join('');

        if (!groups[sortedKey]) {
            groups[sortedKey] = [];
        }
        groups[sortedKey].push(word);
    });

    return Object.values(groups)
        .filter(group => group.length >= 2)
        .map(group => group.sort())
        .sort((a, b) => a[0].localeCompare(b[0]));
}
}


if (rl) {
    const page = new MainPage();

    rl.question("1. [DIFF] Введите первый массив через запятую: ", (input1) => {
        rl.question("   Введите второй массив через запятую: ", (input2) => {
            const arr1 = input1.split(',').map(s => s.trim()).filter(s => s);
            const arr2 = input2.split(',').map(s => s.trim()).filter(s => s);

            console.log("Результат DIFF:", page.diff(arr1, arr2));

            rl.question("2. [ANAGRAM] Введите слова через запятую: ", (input3) => {
                const words = input3.split(',').map(s => s.trim()).filter(s => s);
                const anagramResult = page.anagram(words);

                console.log("Результат ANAGRAM (от 2 слов):", JSON.stringify(anagramResult, null, 2));

                rl.close();
            });
        });
    });
} else {
    const testPage = new MainPage();
    console.log("Тест diff:", testPage.diff(['Лев', 'Слон'], ['Слон']));
    console.log("Тест anagram:", testPage.anagram(['сон', 'нос', 'лес', 'сел', 'дом']));
}
