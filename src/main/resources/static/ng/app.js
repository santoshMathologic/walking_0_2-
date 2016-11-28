'use strict';



var app = angular
  .module('walkingApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngSanitize',
    'smart-table',
    'toaster'
    
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$httpProvider',
           function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider) {
	
	
	
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/home/dashboard');

    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl:'ng/directives/home/home.directive.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'walkingApp',
                    files:[
                           'ng/directives/home/home.js',
                           'ng/directives/dashboard/stats/stats.js'
                   
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('home.dashboard',{
        url:'/dashboard',
        controller: 'MainCtrl',
        templateUrl:'ng/directives/dashboard/dashboard.directive.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'walkingApp',
              files:[
              'ng/directives/dashboard/dashboard.js',
              'ng/controllers/main.js'
             
              ]
            })
          }
        }
      })
       .state('home.dashboard.blank',{
        templateUrl:'ng/directives/dashboard/blank/blank.directive.html',
        controller: 'blankCtrl',
        url:'/blank',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name:'walkingApp',
                files:[
                       "ng/directives/dashboard/blank/blank.js",
                       "ng/controllers/blank.js"
                ]
              })
            }
          }
    }) .state('home.dashboard.walking',{
        templateUrl:'ng/directives/dashboard/walking/walking.directive.html',
        controller: 'walkingCtrl',
        url:'/walking',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name:'walkingApp',
                files:[
                       "ng/directives/dashboard/walking/walking.js",
                       "ng/controllers/walking.js",
                       "ng/utils/serverTableRetrive.js"
                       
                ]
              })
            }
          }
    })
      .state('login',{
        templateUrl:'ng/login/login.html',
        url:'/login'
    });
   
  }]);

app.filter('toArray', function() { return function(obj) {
    if (!(obj instanceof Object)) return obj;
    var result = [];
	for(var i =0; i<Object.keys(obj).length ;i++){
		for(var item in obj){
			if(obj[item] == i){
				result.push(item);
			}
		}
	}
	return result;
}});