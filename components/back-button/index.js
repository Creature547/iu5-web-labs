export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        const button = document.getElementById('back-button');
        button.addEventListener("click", listener);
    }

    getHTML() {
        return `
            <button class="btn btn-outline-secondary mb-3" id="back-button">
                &larr; Назад к галерее
            </button>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html); // Добавляем в самое начало страницы
        this.addListeners(listener);
    }
}
