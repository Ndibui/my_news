angular.module('starter.services', [])

.factory('FeedSvc', function($http){
  var feeds = [{
    id: 1,
    name: 'CNN',
    url: 'http://rss.cnn.com/rss/cnn_topstories.rss',
    logo: 'img/cnn.png' 
  },{
    id: 2,
    name: 'BBC',
    url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=int',
    logo: 'img/bbc.jpg'
  },{
    id: 3,
    name: 'Mashable',
    url: 'http://feeds2.feedburner.com/Mashable',
    logo: 'img/mashable.jpg'
  },{
    id: 4,
    name: 'Huffington Post',
    url: 'http://feeds.huffingtonpost.com/huffingtonpost/raw_feed',
    logo: 'img/huff.png'
  },{
    id: 5,
    name: 'TechCrunch',
    url: 'http://feeds.feedburner.com/TechCrunch',
    logo: 'img/crunch.png'
  }];
  return {
      all_feeds: function(){
        return feeds; //function to access feeds variable
      },
      remove_feeds: function(feed) {
        feeds.splice(feeds.indexOf(feed), 1); //function to delete elements in feed
      },
      get: function(feedId) { //get feedId
      for (var i = 0; i < feeds.length; i++) {
        if (feeds[i].id === parseInt(feedId)) {
          return feeds[i];
        }
      }
      return null;
    }
  }
});

