// gentle reminder :) - make sure you run an observable for it'd value :D
$(function() {

  var initialCats =  [
              {
                  'id': 'cat-1',
                  'name': 'Kara',
                  'imgSrc': 'images/cat-1.jpg',
                  'clickCount': 0,
                  'nicknames': ['SuperGirl', 'Zor-al', 'K', 'apple', 'mac']
              },
              {
                  'id': 'cat-2',
                  'name': 'Anshu ',
                  'imgSrc': 'images/cat-2.jpg',
                  'clickCount': 0,
                  'nicknames': ['gopal']
              },
              {
                  'id': 'cat-3',
                  'name': 'Aria',
                  'imgSrc': 'images/cat-3.jpg',
                  'clickCount': 0,
                  'nicknames': ['jbl', 'melody']
              },
              {
                  'id': 'cat-4',
                  'name': 'Stevey',
                  'imgSrc': 'images/cat-4.jpg',
                  'clickCount': 0,
                  'nicknames': ['zooomm', 'jzzzz']
              },
              {
                  'id': 'cat-5',
                  'name': 'Rosita',
                  'imgSrc': 'images/cat-5.jpg',
                  'clickCount': 0,
                  'nicknames': ['trav', 'love']
              },
          ];

  var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observableArray(data.nicknames);
    //computed observables
    this.title = ko.computed(function() {
      var title;
      var clicks = this.clickCount();
        if (clicks < 10) {
          title =  'Newborn';
        } else if (clicks < 50){
          title = 'Infant';
        } else if (clicks < 200) {
          title = 'teen';
        } else {
          title = 'adult';
        }
        return title;
    }, this);
  }

  var ViewModel = function() {

    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem){
      self.catList.push( new Cat(catItem) );
    })

    this.currentCat = ko.observable( this.catList()[0] );



    this.incrementCounter = function() {
      self.currentCat().clickCount(self.currentCat().clickCount() + 1);
      // method -2 here we are already in the context of currentCat because of 'with' binding in the html
      // this.clickCount(this.clickCount() + 1);
    }

    this.setCat = function() {
      // since we used foreach binding, context changed. 'this' here refers to the cat itself
      self.currentCat(this);
    }
    // method 2
    //read documentation to know more - when you click on something and it runs a function, it passes in the object you clicked on, specifically the cat model here
    // this.setCat = function(currentCat) {
    //   // since we used foreach binding, context changed. 'this' here refers to the cat itself
    //   self.currentCat(this);



    }

  ko.applyBindings(new ViewModel());

});
