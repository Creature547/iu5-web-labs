import {MainPage} from "./pages/main/index.js";

const root = document.getElementById('root');

// Создаем экземпляр страницы и вызываем отрисовку
const mainPage = new MainPage(root);
mainPage.render();
