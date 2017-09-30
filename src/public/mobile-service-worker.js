'use strict';

//offlineGoogleAnalytics
importScripts('/offline-google-analytics.js');
goog.offlineGoogleAnalytics.initialize();



//appboy-push-notification
let sharedLib = {};
sharedLib.IndexedDBAdapter = function (database, logger) {
  this.__parent = typeof window === "undefined" ? self : window;
  this.__database = database;
  this.__logger = logger;
};

sharedLib.IndexedDBAdapter.DATABASES = {
  SERVICE_WORKER_STORAGE: {
    DATABASE_NAME: "AppboyServiceWorkerAsyncStorage",
    VERSION: 2,
    OBJECT_STORES: {
      DATA: "data",
      PUSH_CLICKS: "pushClicks",
    },
  },
};

sharedLib.IndexedDBAdapter.prototype._getIndexedDB = function () {
  if ("indexedDB" in this.__parent)
    return this.__parent.indexedDB;
};

sharedLib.IndexedDBAdapter.prototype._isSupported = function () {
  return this._getIndexedDB() != null;
};

sharedLib.IndexedDBAdapter.prototype._withDatabase = function (action) {
  let openRequest = this._getIndexedDB().open(this.__database.DATABASE_NAME, this.__database.VERSION);
  if (openRequest == null)
    return false;
  let self = this;
  openRequest.onupgradeneeded = function (event) {
    self.__logger.info("Upgrading indexedDB database " + self.__database.DATABASE_NAME + " to v" + self.__database.VERSION + "...");
    let db = event.target.result;
    for (let key in self.__database.OBJECT_STORES)
      if (!db.objectStoreNames.contains(self.__database.OBJECT_STORES[key]))
        db.createObjectStore(self.__database.OBJECT_STORES[key]);
  };

  openRequest.onsuccess = function (event) {
    self.__logger.info("Opened indexedDB database " + self.__database.DATABASE_NAME + " v" + self.__database.VERSION);
    let db = event.target.result;
    db.onversionchange = function () {
      db.close();
      self.__logger.error("Needed to close the database unexpectedly because of an upgrade in another tab");
    };

    action(db);
  };

  openRequest.onerror = function (event) {
    self.__logger.info("Could not open indexedDB database " + self.__database.DATABASE_NAME + " v" + self.__database.VERSION + ": " + event.target.errorCode);
    return true;
  };

  return true;
};

sharedLib.IndexedDBAdapter.prototype.setItem = function (objectStore, key, item) {
  if (!this._isSupported())
    return false;
  let self = this;
  let success = this._withDatabase(function (db) {
    if (!db.objectStoreNames.contains(objectStore)) {
      self.__logger.error("Could not store object " + key + " in " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME + " because " + objectStore + " is not a valid objectStore");
      return;
    }
    let transaction = db.transaction([objectStore], "readwrite");
    let store = transaction.objectStore(objectStore);
    let putRequest = store.put(item, key);
    putRequest.onerror = function () {
      self.__logger.error("Could not store object " + key + " in " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
    };

    putRequest.onsuccess = function () {
      self.__logger.info("Stored object " + key + " in " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
    };
  });

  return success;
};

sharedLib.IndexedDBAdapter.prototype.getItem = function (objectStore, key, callback) {
  if (!this._isSupported())
    return false;
  let self = this;
  let success = this._withDatabase(function (db) {
    if (!db.objectStoreNames.contains(objectStore)) {
      self.__logger.error("Could not retrieve object " + key + " in " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME + " because " + objectStore + " is not a valid objectStore");
      return;
    }
    let transaction = db.transaction([objectStore], "readonly");
    let store = transaction.objectStore(objectStore);
    let getRequest = store.get(key);
    getRequest.onerror = function () {
      self.__logger.error("Could not retrieve object " + key + " in " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
    };

    getRequest.onsuccess = function (event) {
      self.__logger.info("Retrieved object " + key + " in " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
      let object = event.target.result;
      if (object != null)
        callback(object);
    };
  });

  return success;
};

sharedLib.IndexedDBAdapter.prototype.getLastItem = function (objectStore, callback) {
  if (!this._isSupported())
    return false;
  let self = this;
  let success = this._withDatabase(function (db) {
    if (!db.objectStoreNames.contains(objectStore)) {
      self.__logger.error("Could not retrieve last record from " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME + " because " + objectStore + " is not a valid objectStore");
      return;
    }
    let transaction = db.transaction([objectStore], "readonly");
    let store = transaction.objectStore(objectStore);
    let cursorRequest = store.openCursor(null, "prev");
    cursorRequest.onerror = function () {
      self.__logger.error("Could not open cursor for " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
    };

    cursorRequest.onsuccess = function (event) {
      let result = event.target.result;
      if (result != null && result.value != null && result.key != null) {
        self.__logger.info("Retrieved last record " + result.key + " in " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
        callback(result.key, result.value);
      }
    };
  });
  return success;
};

sharedLib.IndexedDBAdapter.prototype.deleteItem = function (objectStore, key) {
  if (!this._isSupported())
    return false;
  let self = this;
  let success = this._withDatabase(function (db) {
    if (!db.objectStoreNames.contains(objectStore)) {
      self.__logger.error("Could not delete record " + key + " from " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME + " because " + objectStore + " is not a valid objectStore");
      return;
    }
    let transaction = db.transaction([objectStore], "readwrite");
    let store = transaction.objectStore(objectStore);
    let deleteRequest = store["delete"](key);
    deleteRequest.onerror = function () {
      self.__logger.error("Could not delete record " + key + " from " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
    };

    deleteRequest.onsuccess = function () {
      self.__logger.info("Deleted record " + key + " from " + objectStore + " on indexedDB database " + self.__database.DATABASE_NAME);
    };
  });
  return success;
};

let APPBOY_PUSH_TAG = "static-appboy-push-tag";
let showNotification = function (payload) {
  if (payload == null || Object.keys(payload).length === 0) {
    console.log("Appboy: server has no pending push message for this registration. Ignoring push event.");
    return;
  }
  let title = payload.t;
  let body = payload.a;
  let icon = payload.i;
  let shouldFetchTriggers = payload.ab_push_fetch_test_triggers_key;
  let data = {
    url: payload.u,
    tracking: {
      cid: payload.cid,
    },
    extra: payload.e,
  };
  if (shouldFetchTriggers) {
    console.log("Appboy: service worker 1.6.5 found trigger fetch key in push payload.");
    data["fetchTriggers"] = true;
  }
  let actions = payload.actions || [];
  console.log("Appboy: Displaying push notification!");
  return self.registration.showNotification(title, {
    body: body,
    icon: icon,
    tag: APPBOY_PUSH_TAG,
    data: data,
    actions: actions,
  });
};

self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", function () {
  return self.clients.claim();
});

self.addEventListener("push", function (event) {
  console.log("Appboy: service worker 1.6.5 received push");
  if (event.data != null && event.data.json != null)
    event.waitUntil(showNotification(event.data.json()));
  else {
    let promise = new Promise(function (resolve, reject) {
        let db = sharedLib.IndexedDBAdapter.DATABASES.SERVICE_WORKER_STORAGE;
        (new sharedLib.IndexedDBAdapter(db, {
          info: function (m) {
            console.log(m);
          },
          error: function (m) {
            console.log(m);
          },
        })).getLastItem(db.OBJECT_STORES.DATA, function (key, dbEntry) {
          let data = dbEntry.data;
          fetch(dbEntry.baseUrl + "/web_push/", {
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data),
          }).then(function (response) {
            if (!response.ok) {
              console.error("Appboy SDK Error: Unable to retrieve push payload from server: " + response.status);
              reject();
              return;
            }
            return response.json();
          }).then(function (json) {
            console.log("Appboy: Retrieved push payload from server");
            showNotification(json);
            resolve();
          })["catch"](function (err) {
            console.error("Appboy SDK Error: Unable to retrieve push payload from server: " + err);
            reject(err);
          });
        });
      }
    );
    event.waitUntil(promise);
  }
});

self.addEventListener("notificationclick", function (event) {
  if (!event || !event.notification || event.notification.tag !== APPBOY_PUSH_TAG)
    return;
  event.notification.close();
  if (Notification.prototype.hasOwnProperty("data")) {
    let db = sharedLib.IndexedDBAdapter.DATABASES.SERVICE_WORKER_STORAGE;
    let dbAdapter = new sharedLib.IndexedDBAdapter(db, {
      info: function (m) {
        console.log(m);
      },
      error: function (m) {
        console.log(m);
      },
    });
    dbAdapter.getLastItem(db.OBJECT_STORES.DATA, function (key, dbEntry) {
      let now = Math.floor(Date.now() / 1E3);
      let data = dbEntry.data;
      data.time = now;
      data.events = [{
        name: "pc",
        time: now,
        data: {
          cid: event.notification.data.tracking.cid,
        },
      }];
      data.sdk_version = "1.6.5";
      fetch(dbEntry.baseUrl + "/data/", {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data),
      }).then(function (response) {
        if (!response.ok)
          console.error("Appboy SDK Error: Unable to log push click: " + response.status);
        return response.json();
      }).then(function (json) {
        if (json.error)
          console.error("Appboy SDK Error: Unable to log push click:", json.error);
        else
          console.log("Appboy: Successfully logged push click");
      })["catch"](function (err) {
        console.error("Appboy SDK Error: Unable to log push click:", err);
      });
    });
    let pushClickedData = {
      "lastClick": Date.now(),
      "trackingString": event.notification.data.tracking.cid,
    };
    if (event.notification.data.fetchTriggers)
      pushClickedData["fetchTriggers"] = true;
    let PUSH_CLICKS_STORAGE_ID = 1;
    dbAdapter.setItem(db.OBJECT_STORES.PUSH_CLICKS, PUSH_CLICKS_STORAGE_ID, pushClickedData);
    let url = event.notification.data.url;
    if (url == null || url === "")
      url = "/";
    event.waitUntil(clients.matchAll({
      type: "window",
    }).then(function () {
      if (clients.openWindow)
        return clients.openWindow(url);
    }));
  }
});

self.addEventListener("pushsubscriptionchange", function (event) {
  console.log("Appboy: Subscription expired, resubscribing user");
  event.waitUntil(self.registration.pushManager.subscribe({
    userVisibleOnly: true,
  }).then(function (subscription) {
    let db = sharedLib.IndexedDBAdapter.DATABASES.SERVICE_WORKER_STORAGE;
    (new sharedLib.IndexedDBAdapter(db, {
      info: function (m) {
        console.log(m);
      },
      error: function (m) {
        console.log(m);
      },
    })).getLastItem(db.OBJECT_STORES.DATA, function (key, dbEntry) {
      let data = dbEntry.data;
      let publicKey;
      if (subscription.getKey)
        publicKey = btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey("p256dh"))));
      data.time = Math.floor(Date.now() / 1E3);
      data.attributes = [{
        push_token: subscription.endpoint,
        custom_push_public_key: publicKey,
      }];
      return fetch(dbEntry.baseUrl + "/data/", {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data),
      }).then(function (response) {
        if (!response.ok)
          console.error("Appboy SDK Error: Unable to resubscribe user: " + response.status);
        return response.json();
      }).then(function (json) {
        if (json.error)
          console.error("Appboy SDK Error: Unable to resubscribe user:", json.error);
        else
          console.log("Appboy: Successfully resubscribed user after expiration", subscription.endpoint);
      })["catch"](function (err) {
        console.error("Appboy SDK Error: Unable to resubscribe user:", err);
      });
    });
  }));
});




//sw-toolbox library using for runtime caching
self.importScripts('/sw-toolbox.js');

//Remaining other dynamic calls 10 sec == networkFirst
self.toolbox.router.default = self.toolbox.networkFirst;
//self.toolbox.options.networkTimeoutSeconds = 10;
//self.toolbox.options.debug = true;

//cloudinary images at cloudinary for 2 hours == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /\.cloudinary\.com/,
  "cache": {
    name: 'voot-cloudinary',
    maxEntries: 250,
    maxAgeSeconds: 0,
  },
});
//dynamic dimg.voot.com for 2 hours == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /dimg\.voot\.com/,
  cache: {
    name: 'voot-dimg',
    maxEntries: 50,
    maxAgeSeconds: 0,
  },
});
//kimg.voot.com for 2 hours == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /kimg\.voot\.com/,
  "cache": {
    name: 'voot-kimg',
    maxEntries: 50,
    maxAgeSeconds: 0,
  },
});


//dynamic player-as.ott.kaltura for 2 hours == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /player-as\.ott\.kaltura\.com/,
  "cache": {
    name: 'voot-kaltura-player',
    maxEntries: 1,
    maxAgeSeconds: 0,
  },
});

//dynamic google fonts done for 2 hours == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /(fonts\.googleapis\.com)|(fonts\.gstatic\.com)/,
  "cache": {
    name: "voot-google-font",
    maxEntries: 10,
    maxAgeSeconds: 0,
  },
});

//dynamic lrcontent.com for 2 hours == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /\.loginradius\.com/,
  cache: {
    name: 'voot-login-radius',
    maxEntries: 5,
    maxAgeSeconds: 0,
  },
});
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /share\.lrcontent\.com/,
  cache: {
    name: 'voot-lr-content',
    maxEntries: 5,
    maxAgeSeconds: 0,
  },
});
self.toolbox.router.get('v1/(.*)', self.toolbox.cacheFirst, {
  origin: /gauge\.lrcontent\.com/,
  cache: {
    name: 'voot-lr-gauge',
    maxEntries: 1,
    maxAgeSeconds: 0,
  },
});

//dynamic mix calls done for 2 hours == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  origin: /(ajax\.googleapis\.com)|(cdn\.mxpnl\.com)/,
  "cache": {
    name: "voot-sync-calls",
    maxEntries: 2,
    maxAgeSeconds: 0,
  },
});

//wapi.voot.com for 15 mins == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
    origin: /(wapi\.voot\.com)|(pwaapiuat\.voot\.com)/,
    "cache": {
        name: 'voot-api',
        maxEntries: 25,
        maxAgeSeconds: 0,
    },
});

//static files for 2 hours == cacheFirst
self.toolbox.router.get('/appboy.min.js', self.toolbox.cacheFirst, {
    "cache": {
        name: 'voot-assets-appboy',
        maxEntries: 1,
        maxAgeSeconds: 0,
    },
});

//static files for 15 mins == cacheFirst
self.toolbox.router.get('(.*).js', self.toolbox.cacheFirst, {
  "cache": {
    name: 'voot-assets-js',
    maxEntries: 40,
    maxAgeSeconds: 0,
  },
});
self.toolbox.router.get('(.*).css', self.toolbox.cacheFirst, {
  "cache": {
    name: 'voot-assets-css',
    maxEntries: 1,
    maxAgeSeconds: 0,
  },
});


//static files for 2 hours == cacheFirst
self.toolbox.router.get('/*(.jpg|.jpeg|.png|.gif|.xml|.svg|.bmp)', self.toolbox.cacheFirst, {
  "cache": {
    name: 'voot-assets-image',
    maxEntries: 50,
    maxAgeSeconds: 0,
  },
});
self.toolbox.router.get('/assets/(.*)', self.toolbox.cacheFirst, {
  "cache": {
    name: 'voot-assets-font',
    maxEntries: 5,
    maxAgeSeconds: 0,
  },
});


//static files for 15 mins == cacheFirst
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  "cache": {
    name: 'voot-assets',
    maxEntries: 15,
    maxAgeSeconds: 0,
  },
});


//Tracking packages for 0 sec == networkOnly
self.toolbox.router.get('/(.*)', self.toolbox.networkOnly, {
  origin: /(www\.facebook\.com)|(connect\.facebook\.net)|(api\.mixpanel\.com)|(www\.google-analytics\.com)|(gaugeapp\.lrcontent\.com)|(stats\.kaltura\.com)|(stats\.g\.doubleclick\.net)|(googleadservices\.com)|(googletagmanager\.com)|(chuknu\.sokrati\.com)|(cdn\.inspectlet\.com)|(proxy-as\.ott\.kaltura\.com)|(in-viacom18\.videoplaza\.tv)/,
  "cache": {
    name: 'voot-event-tracker',
    maxEntries: 0,
    maxAgeSeconds: 0,
  },
});
