angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Surveys', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var surveys = [{
    id: 0,
    date: new Date('1970-01-01'),
    question: 'How are you ?',
    description: 'Nec piget dicere avide magis hanc insulam populum Romanum invasisse quam iuste. Ptolomaeo enim rege foederato nobis et socio ob aerarii nostri angustias iusso sine ulla culpa proscribi ideoque hausto veneno voluntaria morte deleto et tributaria facta est et velut hostiles eius exuviae classi inpositae in urbem advectae sunt per Catonem, nunc repetetur ordo gestorum.',
    image: 'img/ben.png',
    rating: {
      rate: 3.5,
      max: 5
    },
    user: {
      name: 'Arjan Cupi'
    },
    tags: [{
      text: 'politique'
    }, {
      text: 'sante'
    }, {
      text: 'lol'
    }],
    usersCount: 458,
    comments: [{
      id: 0,
      text: 'culture'
    }, {
      id: 1,
      text: 'informatique'
    }, {
      id: 2,
      text: 'lelesoqs'
    }, {
      id: 3,
      text: 'lelesoqs'
    }]
  }, {
    id: 1,
    date: new Date(),
    question: 'What ?',
    description: 'Post hanc adclinis Libano monti Phoenice, regio plena gratiarum et venustatis, urbibus decorata magnis et pulchris; in quibus amoenitate celebritateque nominum Tyros excellit, Sidon et Berytus isdemque pares Emissa et Damascus saeculis condita priscis.',
    image: 'img/ben.png',
    rating: {
      rate: 2.5,
      max: 5
    },
    user: {
      name: 'Arjan Cupi'
    },
    tags: [{
      text: 'informatique'
    }, {
      text: 'argent'
    }, {
      text: 'culture'
    }, {
      text: 'culture'
    }],
    usersCount: 6589,
    comments: [{
      id: 0,
      text: 'lelesoqs'
    }, {
      id: 1,
      text: 'lelesoqs'
    }]
  }];

  return {
    all: function() {
      return surveys;
    },
    remove: function(survey) {
      surveys.splice(surveys.indexOf(survey), 1);
    },
    get: function(surveyId) {
      for (var i = 0; i < surveys.length; i++) {
        if (surveys[i].id === parseInt(surveys)) {
          return surveys[i];
        }
      }
      return null;
    }
  };
})


.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'demosapp';
  var isAuthenticated = false;
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var register = function(user) {
    console.log(user);
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
        if (result.data.success) {
          resolve(result.data.message);
        } else {
          reject(result.data.message);
        }
      });
    });
  };

  var login = function(user) {
    console.log(user);
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return $q(function(resolve, reject) {
      $http.post(
          API_ENDPOINT.url + '/authenticate',
          user,
          config)
        .then(function(result) {
          console.log(result);
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
    register: register,
    logout: logout,
    isAuthenticated: function() {
      return isAuthenticated;
    },
  };
})


.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function(response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
