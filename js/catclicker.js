(function() {
  var data = {
    cats: [
      {
        id: 0,
        name: "dino cat",
        img: "./resources/images/dino_cat.png",
        count: 0,
        focus: true
      },
      {
        id: 1,
        name: "beer cat",
        img: "./resources/images/beer_cat.png",
        count: 0,
        focus: false
      },
      {
        id: 2,
        name: "pumpkin cat",
        img: "./resources/images/pumkin_cats.png",
        count: 0,
        focus: false
      }
    ]
  };

  var controller = {
    updateCount: function() {
      var currentCat = this.getActiveCat();
      data.cats[currentCat.id].count++;
    },
    getCats: function() {
      return data.cats;
    },
    setActiveCat: function(cat) {
      data.cats.map(function(catListed) {
        if (catListed.id === cat.id) {
          catListed.focus = true;
        } else {
          catListed.focus = false;
        }
      });
    },
    getActiveCat: function() {
      var activeId;
      data.cats.map(function(cat) {
        if (cat.focus === true) {
          activeId = cat.id;
        }
      });
      return data.cats[activeId];
    },
    setNewValues: function(obj) {
      data.cats[obj.id].name = obj.newName;
      data.cats[obj.id].count = obj.newCount;
      data.cats[obj.id].img = obj.newImg;
      stageView.renderStage();
      listView.updateList();
    }
  };

  var stageView = {
    init: function() {
      var activeCat = controller.getActiveCat();
      var stageArea = document.getElementById("stage");
      this.catName = document.createElement("h2");
      this.catCount = document.createElement("h3");
      this.catImage = document.createElement("img");
      this.catName.textContent = activeCat.name;
      this.catCount.textContent = activeCat.count;
      this.catImage.setAttribute("src", activeCat.img);
      stageArea.appendChild(this.catName);
      stageArea.appendChild(this.catCount);
      stageArea.appendChild(this.catImage);
      this.catImage.addEventListener("click", function() {
        controller.updateCount();
        stageView.renderStage();
      });
    },
    renderStage: function() {
      var activeCat = controller.getActiveCat();
      var catName = document.querySelector("#stage h2");
      var catCount = document.querySelector("#stage h3");
      var catImage = document.querySelector("#stage img");
      catName.textContent = activeCat.name;
      catCount.textContent = activeCat.count;
      catImage.setAttribute("src", activeCat.img);
    }
  };

  var listView = {
    init: function() {
      var listEle = document.querySelector(".list");
      var listItems = controller.getCats();

      for (var i = 0; i < listItems.length; i++) {
        var cat = listItems[i];
        var listItem = document.createElement("li");
        var listTitle = document.createElement("h2");
        var listImg = document.createElement("img");
        listEle.appendChild(listItem);
        listTitle.textContent = cat.name;
        listImg.setAttribute("src", cat.img);
        listItem.appendChild(listTitle);
        listItem.append(listImg);
        listItem.addEventListener(
          "click",
          (function(catCopy) {
            return function() {
              controller.setActiveCat(catCopy);
              stageView.renderStage();
            };
          })(cat)
        );
      }
    },
    updateList: function() {
      var listEle = document.querySelectorAll(".list li");
      var listItems = controller.getCats();
      for (
        var i = 0, j = 0;
        i < listEle.length, j < listItems.length;
        i++, j++
      ) {
        var listTitle = listEle[i].querySelector("h2");
        var listImg = listEle[i].querySelector("img");
        listTitle.textContent = listItems[j].name;
        listImg.setAttribute("src", listItems[j].img);
      }
    }
  };

  var adminView = {
    nameInput: function() {
      return document.getElementById("catName");
    },
    countInput: function() {
      return document.getElementById("catCount");
    },
    imgInput: function() {
      return document.getElementById("catImg");
    },
    init: function() {
      const admBtn = document.querySelector(".adminBtn");
      const subBtn = document.querySelector(".submit");
      const canBtn = document.querySelector(".cancel");
      admBtn.addEventListener("click", adminView.reveal);
      subBtn.addEventListener("click", adminView.submit);
      canBtn.addEventListener("click", adminView.cancel);
    },
    reveal: function() {
      const adminArea = document.querySelector(".feilds");
      adminArea.classList.toggle("hidden");
      adminView.render();
    },
    render: function() {
      const activeCat = controller.getActiveCat();
      adminView.nameInput().value = activeCat.name;
      adminView.countInput().value = activeCat.count;
      adminView.imgInput().value = activeCat.img;
    },
    submit: function() {
      const newValues = {
        id: controller.getActiveCat().id,
        newName: adminView.nameInput().value,
        newCount: adminView.countInput().value,
        newImg: adminView.imgInput().value
      };
      controller.setNewValues(newValues);
      adminView.reveal();
    },
    cancel: function() {
      adminView.nameInput().value = "";
      adminView.countInput().value = "";
      adminView.imgInput().value = "";
      adminView.reveal();
    }
  };
  listView.init();
  stageView.init();
  adminView.init();
})();
