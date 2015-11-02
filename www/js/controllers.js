angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope, FeedSvc) {
  $scope.settings = [{ name: 'CNN' , state : true },
    { name: 'BBC' , state : true },
    { name: 'Mashable' , state : false },
    { name: 'HuffingtonPost News' , state : false },
    { name: 'TechCrunch News' , state : true 
  }];
  
  $scope.feeds = FeedSvc.all_feeds();
  console.log($scope.feeds);
  
})

.controller('FeedsCtrl', function($scope, FeedSvc){
  $scope.feeds = FeedSvc.all_feeds();
  $scope.remove = function(feed) {
    FeedSvc.remove(feed);
  };
})

.controller('FeedsDetailCtrl', function($scope, $http, $stateParams, $ionicPopup, $ionicModal, FeedSvc){
    $scope.feed = FeedSvc.get($stateParams.feedId);
    $scope.url = $scope.feed.url;
    $scope.name = $scope.feed.name;
    $scope.getfeed = function(val){
      if(val == 'old'){
        //get old feed, and push into array of entries
      }else{
        
      }
       $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/load?callback=JSON_CALLBACK", { params: { "v": "1.0", "q": $scope.url, "num": '5' } })
            .then(function successCallback(response) {
              console.log(response);
               $scope.rssTitle = response.data.responseData.feed.title;
               $scope.rssUrl = response.data.responseData.feed.feedUrl;
               $scope.rssSiteUrl = response.data.responseData.feed.link;
               $scope.entries = response.data.responseData.feed.entries;
               $scope.publishedDate = response.data.responseData.feed.publishedDate;
               //if (entry.mediaGroups) {
                 // $scope.thumbnail = entry.mediaGroups[0].contents[0].url;
               // }
               //console.log(response.responseData.feed.entries.MediaGroup.contents);
               console.log(response.data.responseData.feed);
               //use cache items for offline access
               window.localStorage["entries"] = JSON.stringify(response.data.responseData.feed.entries);
            }, function errorCallback(response) {
                console.log("ERROR: " + response);
                // An alert dialog if an error occurs
                $ionicPopup.alert({
                   title: 'Ooops!',
                   template: 'Something went wrong, Try again later'
                });
                //use cached items for offline access
                if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
          })
          .finally(function() {
            $scope.$broadcast('scroll.refreshComplete'); //to avoid continous loop
          });
      }
     
      // Create the article modal
      $ionicModal.fromTemplateUrl('templates/article.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
    
      // Close the artical modal
      $scope.closeView = function() {
        $scope.modal.hide();
      };
    
      // Open the article modal
      $scope.detailView = function(i) {
        console.log($scope.entries[i]);
        //detailed view variables aka(dv_)
        if($scope.entries[i].mediaGroups){
          $scope.dv_avatar = $scope.entries[i].mediaGroups[0].contents[0].url;
          $scope.dv_Img = $scope.entries[i].mediaGroups[0].contents[0].url;
        }
        $scope.dv_title = $scope.entries[i].title;
        $scope.dv_publishedDate = $scope.entries[i].publishedDate;
        $scope.dv_link = $scope.entries[i].link;
        $scope.dv_content = $scope.entries[i].content;
        $scope.modal.show();
      };
      //pull-down to refresh
      $scope.doRefresh = function(){
        return $scope.getfeed();
      }
      //utilize infinite scroll to load older feeds
      $scope.getOlderfeed = function(){
        
      }
      
      //open link in mobile browser
      $scope.browse = function() {
         window.open($scope.dv_link, "_system", "location=yes");
      }
    
})
//force tabs to display at bottom
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
});
