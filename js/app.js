
/*model having Cat objects*/
let modelCat = {
    currentCat: null,
    cats: [{
        name: 'Tommy',
        url: 'images/cat1.jpg',
        clickCount: 0
    },
    {
        name: 'Shaila',
        url: 'images/cat2.jpg',
        clickCount: 0
    },
    {
        name: 'Jerry',
        url: 'images/cat3.jpg',
        clickCount: 0
    },
    {
        name: 'Truffles',
        url: 'images/cat4.jpg',
        clickCount: 0
    },
    {
        name: 'Laila',
        url: 'images/cat5.jpg',
        clickCount: 0
    }]
}

/*controller communicating with other objects*/
let Controller = {
/*to initialize view objects*/
    init: function () {
        modelCat.currentCat = null;
        catListView.init();
        catView.init();
    },
    /*to remove the current cat from the display list*/
    removeCurrentCat: function () {
        catListView.render();
        modelCat.currentCat = null;
    },
    /*to display the cat on the event of option change*/
    displayCat: function (event) {
        catView.displayCat(event);
    },
    /*to display the current cat*/
    currentCat: function (newCatObj) {
        modelCat.currentCat = catView.render(newCatObj);
        catview.imgClick(modelCat.currentCat);
    },
    /*reads all cats present in model*/
    getCats: function () {
        return modelCat.cats;
    },
    /*increment count*/
    incrementCount: function () {
        catView.incrementCount(modelCat.currentCat);
    }

}

/*catListView object having list(select) of all cat names*/
let catListView = {
    init: function () {
        this.select = document.querySelector('select');
        this.main = document.querySelector('main');
        this.select.addEventListener('change', function (event) {
            Controller.displayCat(event);
        })
    },
    /*if default option is selected ,remove cat*/
    render: function () {
        let div = document.querySelectorAll('div');
        if (div.length > 1) {
            let item = this.main.lastElementChild;
            this.main.removeChild(item);
        }
    }
}

/*Cat view object to display the cat and increment the counter*/
let catView = {
    /*reading Cat objects from the model*/   
    init: function () {
        this.main = document.querySelector('main');
        this.cat = Controller.getCats();
    },
    /*incrementing count if cat image is clicked*/
    imgClick: function (currentCat) {
        document.querySelector('.cat').addEventListener('click', function () {
            for (let item of this.cat){
                if (item.name===currentCat.name){
                    item.clickCount++;
                    document.querySelector('.clickCount').textContent = item.clickCount;
                }
            }
                 
        }.bind(this));
    },
    /*rending cat image on the page*/
    render: function (newCat) {
        Controller.removeCurrentCat();
        let div = document.createElement('div');
        div.classList.add('image');
        div.innerHTML += `<h3>${newCat.name}</h3>
                             <img class="cat" src="${newCat.url}" alt="cute cat">
                             <p>Click Count=<span class="clickCount">${newCat.clickCount}</span></p>`;
        this.main.appendChild(div);
        return newCat;
    },
    /*event handler function having steps to be followed when a cat is selected on the page*/
    displayCat: function (event) {

        if (this.cat.currentCat !== null && event.target.value === 'default') {
            Controller.removeCurrentCat();
        }
        else {
            for (let obj of this.cat) {
                if (this.cat.currentCat !== null && obj.name === event.target.value) {
                    Controller.currentCat(obj);
                }
            }

        }
    }
}

Controller.init();


