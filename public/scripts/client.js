var myApp =angular.module( 'myApp', [] );
//set up a controller
myApp.controller( 'AssignmentController', function($http){
  console.log('NG');

  var vm = this;




  vm.addAssignment = function (){
  console.log('in assignment function');
  var objectToSend = {
    assign: vm.assign_name,
    student: vm.stud_name,
    score: vm.score,
    date: vm.date
  };//end objectToSend
    console.log(objectToSend);
    $http({
      method: 'POST',
      url: '/assignment',
      data: objectToSend
    }).then(function(response){
      // vm.getItems();
      //empty inputs
    });
};//end addAssignment


});//end myApp
