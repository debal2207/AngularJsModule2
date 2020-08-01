(function () {
'use strict';
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
  toBuyList.errorMessage = ShoppingListCheckOffService.getToBuyMessage();
  toBuyList.buyItem = function (itemIndex, itemName, itemValue) {
    ShoppingListCheckOffService.buyItem(itemIndex, itemName, itemValue);
  };

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getItemsBought();
  boughtList.errorMessage = ShoppingListCheckOffService.getBoughtMessage();
}


function ShoppingListCheckOffService() {
  var service = this;
  var itemsToBuy = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "200"
  },
  {
    name: "Cookies",
    quantity: "300"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Medicine",
    quantity: "15"
  }
];
var itemsBought = [];

var toBuyErrorMessage = [];
var boughtErrorMessage = ["Nothing bought yet"];

service.buyItem = function (itemIndex, itemName, quantity) {

    itemsToBuy.splice(itemIndex, 1);
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsBought.push(item);

    if (itemsToBuy.length === 0) {
      var str="Everything is bought!";
      toBuyErrorMessage.push(str);
    }
    if (boughtErrorMessage.length > 0) {
      boughtErrorMessage.splice(0,1)
    }
  };

service.getItemsToBuy = function () {
    return itemsToBuy;
};

service.getItemsBought = function () {
    return itemsBought;
  };
service.getToBuyMessage = function () {
    return toBuyErrorMessage;
  };
service.getBoughtMessage = function () {
    return boughtErrorMessage;
  };
}

})();
