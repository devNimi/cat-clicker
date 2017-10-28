$(function() {

  var ViewModel = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('images/cat-1.jpg');

    this.incrementCounter = function() {
      this.clickCount(this.clickCount() + 1);
    }

    //computed observables
    this.catLevel = ko.computed(function() {
      console.log('call');
        if (this.clickCount() < 10) {
          return 'new born'
        } else if (this.clickCount() < 15){
          return 'teen'
        } else {
          return 'adult'
        }
    }, this);

  }

  ko.applyBindings(new ViewModel());

//     /* ======= Model ======= */
//
//     var model = {
//         currentCat: null,
//         'cats': [{
//                 'id': 'cat-1',
//                 'name': 'Kara',
//                 'image': 'images/cat-1.jpg',
//                 'clicksCounter': 0
//             },
//             {
//                 'id': 'cat-2',
//                 'name': 'Anshu ',
//                 'image': 'images/cat-2.jpg',
//                 'clicksCounter': 0
//             },
//             {
//                 'id': 'cat-3',
//                 'name': 'Aria',
//                 'image': 'images/cat-3.jpg',
//                 'clicksCounter': 0
//             },
//             {
//                 'id': 'cat-4',
//                 'name': 'Stevey',
//                 'image': 'images/cat-4.jpg',
//                 'clicksCounter': 0
//             },
//             {
//                 'id': 'cat-5',
//                 'name': 'Rosita',
//                 'image': 'images/cat-5.jpg',
//                 'clicksCounter': 0
//             },
//         ],
//         adminView: false
//     };
//
//     /* ======= Octopus ======= */
//
//     var octopus = {
//         init: function() {
//             // set our current cat to the first one in the list
//             model.currentCat = octopus.getCats()[0];
//
//             //initialize views
//             catView.init();
//             catListView.init();
//             adminView.init();
//             adminViewButton.init();
//         },
//
//         getCats: function() {
//             return model.cats
//         },
//
//         getCurrentcat: function() {
//             return model.currentCat;
//         },
//
//         // set the currently-selected cat to the object passed in
//         setCurrentCat: function(cat){
//             model.currentCat = cat;
//         },
//
//         // increments the counter for the currently-selected cat
//         incrementCounter: function(){
//           model.currentCat.clicksCounter++;
//           // option 1 - render entire cat view
//           // catView.render();
//           //option 2 - render on click counter DOM element
//           catView.clickCounterElem.text(this.getCurrentcat().clicksCounter);
//         },
//
//         adminViewState: function(){
//           return model.adminView;
//         },
//
//         showAdminView: function(){
//           model.adminView = true;
//           adminView.render();
//         },
//
//         hideAdminView: function(){
//           model.adminView = false;
//           adminView.render();
//         },
//         updateCatData: function(updatedCatName, updatedCatImageUrl, updatedCatClickCounter ) {
//           var currentCat = octopus.getCurrentcat();
//           //update the currentCat
//           currentCat.name = updatedCatName;
//           currentCat.image = updatedCatImageUrl;
//           currentCat.clicksCounter = updatedCatClickCounter;
//         }
//     }
//
// /* ======= View ======= */
//
//     var catView = {
//         init: function() {
//             // store pointers to our DOM elements for easy access later
//             this.catElem = $('#cat')
//             this.catNameElem = $('#cat-name');
//             this.clickCounterElem = $('#click-counter');
//             this.catImageElem = $('#cat-img');
//
//             // on click, increment the current cat's counter
//             this.catImageElem.click(function() {
//                 octopus.incrementCounter();
//             })
//
//             // render this view (update the DOM elements with the right values)
//             this.render();
//         },
//
//         render: function() {
//           // update the DOM elements with values from the current cat
//           var currentCat = octopus.getCurrentcat();
//           this.catNameElem.text(currentCat.name);
//           this.clickCounterElem.text(currentCat.clicksCounter);
//           this.catImageElem.attr('src', currentCat.image);
//         }
//     }
//
//     var catListView = {
//
//       init: function() {
//         // store the DOM element for easy access later
//         this.catListElem = $('#cat-list');
//
//         // render this view (update the DOM elements with the right values)
//         this.render();
//       },
//
//       render: function() {
//         // get the cats we'll be rendering from the octopus
//         var cats = octopus.getCats();
//
//         this.catListElem.html('');
//         // add cats to the list view and then attach click listners to them
//         cats.forEach(function(cat) {
//             catListView.catListElem.append('<a href="#"><p class="lead cat-list" id="' + cat.id + '">' + cat.name + '</p></a>')
//
//             //set click listeners on cat-list
//             $('#' + cat.id).click(function() {
//                 octopus.setCurrentCat(cat);
//                 catView.render();
//             })
//         })
//       }
//     }
//
//     var adminView = {
//       init: function(){
//         //grab form elements
//         this.catName = $('#form-cat-name'),
//         this.catImageUrl = $('#form-image-url'),
//         this.catClicksCounter = $('#form-clicks-counter'),
//         this.submit = $('#form-submit-button');
//         this.cancel = $('#form-cancel-button');
//
//         //set event listners on form buttons
//
//         this.submit.click(function(){
//           // update the cat with new data
//           // pass the feild values of form elements
//           octopus.updateCatData(adminView.catName.val(), adminView.catImageUrl.val(), adminView.catClicksCounter.val())
//
//           catListView.render();
//           catView.render();
//           // hide the admin view
//           octopus.hideAdminView();
//         })
//         this.cancel.click(function(){
//           // hide the admin view
//           octopus.hideAdminView();
//         })
//       },
//
//       render: function() {
//         // if admin view is there i.e. it's state is true
//         if (octopus.adminViewState()) {
//           $('#admin-view').css('display', 'inherit');
//           var currentCat = octopus.getCurrentcat();
//           //grab the values from form elements and update the currentCat
//           this.catName.val(currentCat.name);
//           this.catImageUrl.val(currentCat.image);
//           this.catClicksCounter.val(currentCat.clicksCounter);
//         } else {
//           // hide the admin view
//           $('#admin-view').css('display', 'none');
//         }
//       }
//     }
//
//     var adminViewButton = {
//       init: function(){
//         // attach click listner to admin button
//         $('#admin-button').click(function(){
//           octopus.showAdminView();
//         })
//       }
//     }
//
//     //initialize the application
//     octopus.init();



});
