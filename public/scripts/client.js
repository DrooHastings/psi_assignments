var myApp =angular.module( 'myApp', [] );
//set up a controller
myApp.controller( 'AssignmentController', function($http){
  console.log('NG');

  //globals
  var vm = this;
  vm.items = [];





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
      console.log('back from server with:', response);
      vm.getAssignments();
      // vm.getItems();
      //empty inputs
    });
  };

    vm.getAssignments = function (){
      console.log('in getAssignments');
      $http({
        method: 'GET',
        url: '/assignment'
      }).then(function success(response){
        console.log('response.data is:', response.data);
        vm.items = response.data;
      });//end http
    };//end getAssignments

    vm.deleteAssn = function (id){
      console.log('in getAssnID');
      $http({
        method: 'DELETE',
        url: '/assignment/'+ id,
      }).then(function success(response){
        vm.getAssignments();
      });//end http
    };//end getAssignments

    vm.getAssn = function (name){
      console.log('in get assn', name);
      var route = '/assignment/' + name;
      console.log(route);
      $http({
        method: 'GET',
        url: route,
      }).then(function success(response){
        console.log('search response: ', response.data);
        vm.items = response.data;
        // vm.getAssignments();
      });//end then
    };//end getAssn




});//end myApp
