"use strict"; var precacheConfig = [["/index.html", "8ce1e345c73575eb9db61234e4b51902"], ["/static/css/main.eec37a3c.css", "3025d19e5b236deabae9449e783a1c8e"], ["/static/js/main.151b6e8d.js", "d429678facdbff0139ee84daaff73f50"]], cacheName = "sw-precache-v3-sw-precache-webpack-plugin-" + (self.registration ? self.registration.scope : ""), ignoreUrlParametersMatching = [/^utm_/], addDirectoryIndex = function (e, t) { var n = new URL(e); return "/" === n.pathname.slice(-1) && (n.pathname += t), n.toString() }, cleanResponse = function (e) { return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function (t) { return new Response(t, { headers: e.headers, status: e.status, statusText: e.statusText }) }) : Promise.resolve(e) }, createCacheKey = function (e, t, n, r) { var a = new URL(e); return r && a.pathname.match(r) || (a.search += (a.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(n)), a.toString() }, isPathWhitelisted = function (e, t) { if (0 === e.length) return !0; var n = new URL(t).pathname; return e.some(function (e) { return n.match(e) }) }, stripIgnoredUrlParameters = function (e, t) { var n = new URL(e); return n.hash = "", n.search = n.search.slice(1).split("&").map(function (e) { return e.split("=") }).filter(function (e) { return t.every(function (t) { return !t.test(e[0]) }) }).map(function (e) { return e.join("=") }).join("&"), n.toString() }, hashParamName = "_sw-precache", urlsToCacheKeys = new Map(precacheConfig.map(function (e) { var t = e[0], n = e[1], r = new URL(t, self.location), a = createCacheKey(r, hashParamName, n, /\.\w{8}\./); return [r.toString(), a] })); function setOfCachedUrls(e) { return e.keys().then(function (e) { return e.map(function (e) { return e.url }) }).then(function (e) { return new Set(e) }) } self.addEventListener("install", function (e) { e.waitUntil(caches.open(cacheName).then(function (e) { return setOfCachedUrls(e).then(function (t) { return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (n) { if (!t.has(n)) { var r = new Request(n, { credentials: "same-origin" }); return fetch(r).then(function (t) { if (!t.ok) throw new Error("Request for " + n + " returned a response with status " + t.status); return cleanResponse(t).then(function (t) { return e.put(n, t) }) }) } })) }) }).then(function () { return self.skipWaiting() })) }), self.addEventListener("activate", function (e) { var t = new Set(urlsToCacheKeys.values()); e.waitUntil(caches.open(cacheName).then(function (e) { return e.keys().then(function (n) { return Promise.all(n.map(function (n) { if (!t.has(n.url)) return e.delete(n) })) }) }).then(function () { return self.clients.claim() })) }), self.addEventListener("fetch", function (e) { if ("GET" === e.request.method) { var t, n = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching), r = "index.html"; (t = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, r), t = urlsToCacheKeys.has(n)); var a = "/index.html"; !t && "navigate" === e.request.mode && isPathWhitelisted(["^(?!\\/__).*"], e.request.url) && (n = new URL(a, self.location).toString(), t = urlsToCacheKeys.has(n)), t && e.respondWith(caches.open(cacheName).then(function (e) { return e.match(urlsToCacheKeys.get(n)).then(function (e) { if (e) return e; throw Error("The cached response that was expected is missing.") }) }).catch(function (t) { return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request) })) } });

importScripts("https://www.gstatic.com/firebasejs/5.5.7/firebase.js");
const config = {
    apiKey: "AIzaSyAxmadWMfKFDoqTbC0IMZuBSDj3L8Bb4Wo",
    authDomain: "chatappweb-d9fae.firebaseapp.com",
    projectId: "chatappweb-d9fae",
    messagingSenderId: "715692354306"
  };

firebase.initializeApp(config);
var messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/fellowbot.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});


// {"data":{"icon":"image/logo.png","body":"Inner content","title":"Notification title"},"from":"715692354306","collapse_key":"do_not_collapse"}
// messaging.usePublicVapidKey("BIciYYDVp9XACz33egMLQlcxxQMR0I9l-Kb4nk8uV2pWU0-vA-X4xYrtqVvNcncBDwj2Fc7UCeh0CN-FpO5yIdQ");

