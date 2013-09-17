var app = angular.module('radarvectorApp', []);

// Home Page Serives
app.factory('radarvectorHomePageService', function ($http) {
	return {
		getTrendingVideos: function () {
			return $http.get('http://speakglobally.net/api/videos/home_video').then(function (result) {
				return result.data.rows;
			});
		},
		getLatestVideos: function () {
			return $http.get('http://speakglobally.net/api/videos/latest').then(function (result) {
				return result.data.rows;
			});
		},
		getLatestOneVideo: function () {
			return $http.get('http://speakglobally.net/api/videos/latest_one').then(function (result) {
				return result.data.rows[0];
			});
		},
		getTopNews: function (count) {
			return $http.get('http://wildridge.net/api/news/topnews?n=' + count).then(function (result) {
				return result.data.rows;
			});
		}
	};
});

// Home Page Controller
app.controller('RadarvectorHome', function ($scope, radarvectorHomePageService, $window) {
	// Trending Videos List
	$scope.trendingVideos = radarvectorHomePageService.getTrendingVideos();
	// Latest Videos List
	$scope.latestVideos = radarvectorHomePageService.getLatestVideos();
	// Top Latest Video Details
	$scope.latestVideo = radarvectorHomePageService.getLatestOneVideo();
	// Top 5 News items
	$scope.top5 = radarvectorHomePageService.getTopNews(5);

    // Set the hiro player's playlist with the latest video after getting the valid Video's Object
	$scope.$watch('latestVideo', function (videoObj) {
		if (videoObj !== undefined) {
			$window.hiro.playList[0].url= 'http://91cefb89b61292d7a6a5-9b3e53ad93e76fa27450765a72dfcdf1.r61.cf2.rackcdn.com/' + videoObj.value.video_path;
			$window.hiro.playList[0].customProperties.videoTitle = videoObj.value.title;
			$window.hiro.playList[0].customProperties.videoExternalId = videoObj.value._id;
			$window.hiro.playList[0].customProperties.videoDescription = videoObj.value.description;
			$window.hiro.playList[0].customProperties.videoKeyWords = videoObj.value.description;
			$window.hiro.playList[0].customProperties.videoTags = videoObj.value.title;
			$window.hiro.playList[0].customProperties.videoDurationSecs = videoObj.value.duration;
		}
	});
});