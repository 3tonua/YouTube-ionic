angular.module('starter.services', [])
.service('API', function ($http, $q, apiKeys, youtubeFactory) {
    return {
        getMostPopularVideos: function (token) {
            // var key = 'AIzaSyD0KxGbBLA3r2EtQD6t0eUYIEztv2zKRHs';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/videos',
                params: {
                    part: "snippet",
                    key: apiKeys.youtube,
                    chart: 'MostPopular',
                    maxResults: 10,
                    regionCode: 'UA',
                    pageToken: token

                }
            }).then(function (data) {
                var y_videos = data.data.items;
                console.log(y_videos[0]);
                var my_videos = youtubeFactory.convertYoutubeToTemplate(y_videos);

                var nextToken = data.data.nextPageToken;
                var prevToken = data.data.prevPageToken;
                console.log(nextToken);
                console.log(prevToken);

                var o = {
                    vid: (my_videos),
                    ntok: nextToken,
                    ptok: prevToken
                };
                d.resolve(o);
                console.log(o)
            });
            return d.promise
        },
        searchVideos: function (params) {
            var key = 'AIzaSyD0KxGbBLA3r2EtQD6t0eUYIEztv2zKRHs';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/youtube/v3/search',
                params: {
                    part: "snippet",
                    key: apiKeys.youtube,
                    maxResults: 5,
                    q: params.query,
                    regionCode: params.regions
                }
            }).then(function (data) {
                var y_videos = data.data.items;
                console.log(y_videos[0]);
                var my_videos = youtubeFactory.convertYoutubeToTemplate(y_videos);
                // console.log(my_videos);
                d.resolve(my_videos)
            });
            return d.promise
        }
    }
})

.constant('apiKeys', {
    youtube: 'AIzaSyD0KxGbBLA3r2EtQD6t0eUYIEztv2zKRHs'
})

.factory('youtubeFactory', function () {
    return  {
        convertYoutubeToTemplate: function (videos) {
            return videos.map(function (video, index) {
                return {
                    id: video.id,
                    image: video.snippet.thumbnails.high.url,
                    title: video.snippet.title,
                    description: video.snippet.description,
                    author: video.snippet.channelTitle
                }
            });
        }
    }
});