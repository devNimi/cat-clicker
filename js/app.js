// gentle reminder :) - make sure you run an observable for it'd value :D
$(function() {

  var initialCats =  [
              {
                  'name': 'Kara',
                  'imgSrc': 'images/cat-1.jpg',
                  'clickCount': 0,
                  'nicknames': [
                    'SuperGirl', 'Zor-al', 'amoureux', 'macintosh', 'kay'
                  ]
              },
              {
                  'name': 'Anshu ',
                  'imgSrc': 'images/cat-2.jpg',
                  'clickCount': 0,
                  'nicknames': ['gopal']
              },
              {
                  'name': 'Aria',
                  'imgSrc': 'images/cat-3.jpg',
                  'clickCount': 0,
                  'nicknames': ['jbl', 'melody']
              },
              {
                  'name': 'Stevey',
                  'imgSrc': 'images/cat-4.jpg',
                  'clickCount': 0,
                  'nicknames': ['zooomm', 'jzzzz']
              },
              {
                  'name': 'Rosita',
                  'imgSrc': 'images/cat-5.jpg',
                  'clickCount': 0,
                  'nicknames': ['trav', 'love']
              },
          ];

  var Cat = function(data) {
    var self = this;
    self.clickCount = ko.observable(data.clickCount);
    self.name = ko.observable(data.name);
    self.imgSrc = ko.observable(data.imgSrc);
    self.nicknames = ko.observableArray()

    // makes nicknames in the original array observables
    // then add it to observable array of 'Cat'
    data.nicknames.forEach(function(nickname){
      // self.nicknames.push({'name': nickname});
      self.nicknames.push({'nickname' : ko.observable(nickname)});
    })

    //computed observables
    self.title = ko.computed(function() {
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
      // foreach binding (in HTML) changes context. 'this' here refers to the cat itself i.e.  Click listner is applied on C`at itelf
      self.currentCat(this);
    }
    // method 2
    //read documentation to nkow more - when you click on something and it runs a function, it passes in the object you clicked on, specifically the cat model here
    // this.setCat = function(currentCat) {
    //   // since we used foreach binding, context changed. 'this' here refers to the cat itself
    //   self.currentCat(this);

    //retrive 'add a new cat' form data and creates a new 'Cat'
    this.addUserCat = function(){
      // newUserCat object should be similar to initialCats array objects
      var newUserCat = {};
      var nameByUser = $('#add-user-cat-form').find('input[name="name"]').val();
      var clickCountByUser =  parseInt($('#add-user-cat-form').find('input[name="clickCount"]').val())
      if(!nameByUser) {
        console.log('enteres');
        nameByUser = 'Please name you cat :)';
      }
      // console.log(newUserCat.clickCount);
      if (Number.isNaN(clickCountByUser)) {
        clickCountByUser = 0;
      }
      newUserCat.name =  nameByUser;
      newUserCat.imgSrc =  $('#add-user-cat-form').find('input[name="imgSrc"]').val();
      newUserCat.clickCount =  clickCountByUser;
      newUserCat.nicknames =  [];
      // grab the nicknames from form feild
      var addCatFormNickNames = $('#user-cat-nicknames').children('input');
      // iterates over jQuery object which .children() returns and push it to newUserCat
      // .value is a proertly that jQuery object returns
      // log 'addCatFormNickNames' to console for details
      addCatFormNickNames.each(function(index, element){
        newUserCat.nicknames.push(element.value);
      })
      // pass newUserCat to catList observable array
      self.catList.push( new Cat(newUserCat) );
      // console.log(newUserCat);

      // set the currentCat to the new cat added
      self.currentCat(self.catList()[self.catList().length-1]);

      //close the modal
      $('#addNewUserCatModal').modal('hide');
      // display 'new cat added successful' message alert to user
        $("#user-cat-success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#user-cat-success-alert").slideUp(500);
        });
    }

    this.addNicknameField = function(){
      $('<input type="text" id="" name="" data-bind="">').insertBefore("#remove-nickname-btn")
    }

    this.removeNicknameField = function(){
      $('#user-cat-nicknames').find('input').last().remove();
    }
  }

  ko.applyBindings(new ViewModel());
  // initialize popovers
  $('[data-toggle="popover"]').popover()

});
