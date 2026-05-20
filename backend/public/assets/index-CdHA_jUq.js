(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card" style="width: 18rem;">
                <img src="${e.src}" class="card-img-top" alt="${e.title}">
                <div class="card-body">
                    <h5 class="card-title">${e.title}</h5>
                    <p class="card-text">${e.text}</p>
                    <button class="btn btn-primary" id="click-card-${e.id}" data-id="${e.id}">Открыть</button>
                </div>
            </div>
        `}addListeners(e,t){document.getElementById(`click-card-${e.id}`).addEventListener(`click`,n=>{console.log(`Нажали на карту номер: ${e.id}`),t(n)})}render(e,t){let n=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,n),this.addListeners(e,t)}},t=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`back-button`).addEventListener(`click`,e)}getHTML(){return`
            <button class="btn btn-outline-secondary mb-3" id="back-button">
                &larr; Назад к галерее
            </button>
        `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`afterbegin`,t),this.addListeners(e)}},n=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="accordion mt-3" id="animalAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                    Среда обитания
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#animalAccordion">
                  <div class="accordion-body">${e.habitat}</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                    Интересный факт
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#animalAccordion">
                  <div class="accordion-body">${e.fact}</div>
                </div>
              </div>
            </div>
        `}render(e){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e))}},r=class{constructor(e,t){this.parent=e,this.id=t}getData(){return{1:{title:`Лев`,src:`https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=600&h=400&fit=crop`,habitat:`Саванны Африки`,fact:`Львы могут спать до 20 часов в сутки.`},2:{title:`Слон`,src:`https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&h=400&fit=crop`,habitat:`Джунгли и саванны`,fact:`Слоны умеют плавать, используя хобот как трубку.`},3:{title:`Пингвин`,src:`https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=600&h=400&fit=crop`,habitat:`Антарктида`,fact:`У пингвинов есть особая железа, фильтрующая соль из морской воды.`}}[this.id]}clickBack(){new i(this.parent).render()}render(){this.parent.innerHTML=``;let e=this.getData(),r=`
            <div class="container mt-5">
                <div id="back-btn-container"></div>
                <div class="row">
                    <div class="col-md-6"><img src="${e.src}" class="img-fluid rounded shadow"></div>
                    <div class="col-md-6">
                        <h2>${e.title}</h2>
                        <div id="accordion-container"></div>
                    </div>
                </div>
            </div>
        `;this.parent.insertAdjacentHTML(`beforeend`,r),new t(document.getElementById(`back-btn-container`)).render(this.clickBack.bind(this)),new n(document.getElementById(`accordion-container`)).render(e)}},i=class{constructor(e){this.parent=e}get pageRoot(){return document.getElementById(`main-page`)}getData(){return[{id:1,src:`https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=300&h=200&fit=crop`,title:`Лев`,text:`Царь зверей`},{id:2,src:`https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=300&h=200&fit=crop`,title:`Слон`,text:`Величественный гигант`},{id:3,src:`https://images.unsplash.com/photo-1517783999520-f068d7431a60?q=80&w=300&h=200&fit=crop`,title:`Пингвин`,text:`Житель льдов`}]}clickCard(e){let t=e.target.dataset.id;new r(this.parent,t).render()}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,`
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
        `),this.getData().forEach(t=>{new e(this.pageRoot).render(t,this.clickCard.bind(this))})}};new i(document.getElementById(`root`)).render();