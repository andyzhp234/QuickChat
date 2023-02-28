# Technical Specification Document

## Introduction

This technical specification document provides a detailed description about the implementations of the functional requirements of the system.

## Auth

I am using session authentication for this project. whenever a user successfully login / register / authenticated, a sessionID will be generated and save in my session storage (redis).

Then this sessionID will be stored in client's frontend inside the http-only cookie. After that every requests the user make will needs includes this session id in the cookie.

Session auth is vunlable to CSRF attack. In this case, I will also generate an CSRF token after the user is being authenticated. Then this CSRF token will be saved in Localstorage and will be included in future post / delete / put requests. We don't need CSRF Token for GET requests because CSRF attack is a blind attack. I understand that saving CSRF token in localstorage will make it vunlable to XSS attack, but I believes that if XSS happens then no matter where I store (hidden form, http-only cookie, or session storage) it will not be safe, and I should do other implementations such as adding Content Security Policy (CSP) to help protecting from XSS attack. If a theif is already in your house, then no matter how much you renforce the door they will still steal everything from you.

Of course there exists much safer solutions, but the implementaiton above is enough as this chat app is not vunlable to any real money (like bank account or payment infos..) and the above implmentaions is good enought for 99% of the time.

Whenever a user logout, they will send a http requests to the backend, which will make sure it deletes the current session from redis and destroy the cookie containing the sessionID.

Moreover, this project supports long login features, which allows user to login directly without the need to login again if they didn't manually signout within 24 Hours. Session is set to expired after 25H, and the cookie is set to be exipred after 24H. If the user tried to login after his session is expired, he will be automatically logout and redirected to login page. The user will need to login every 25H, even he just opened this app at the 24.9H, he will be log out after 0.1H. I know we can optimize this user experiences by reseting session expirations time everytime user fetches a requests, but currently I am pretty happy with the current implementaions.

Moreover, to make my website more secure, I used npm pacakges Helmet for node.js express server, as Helmet provides various middleware functions that can help secure your application against common web vulnerabilities such as cross-site scripting (XSS), cross-site request forgery (CSRF), and clickjacking.

## Sending and receiving messages

## Group chat functionality

## Online indicator

## Friend request

## Emoji support

## Voice and video calling

## Chat history

## Rate Limiter

## WebRTC

For WebRTC, we need a signiling server (our server) and an stun server and an turn server.

for most case a stun server is enough, but stun server is unreliable because most of our modern device sits behind a firewall and we can't get the nat infos from stun, hence we need a turn server to solve this problem.

stun server I will use is the google stun server: stun:stun.l.google.com:19302

## Messages Deduplications

I believes that we need to handle messages deduplications, and it needs to be done on the

client side.

Reasons:

I will fetch 10 old chat history when use first enter the chatroom using http protocol

and i will use websocket to display any new messages the user receive after he entered the chat room

let's consider the following scenerio

User A entered a chatroom. he already have websocket connected to the app before he enter a chatroom. the moment he entered the chatroom, he sends out a http requests to get 10 oldest chat message. But, this http requests due to many many reasons, is very slow. And before this http requests even reach the server, someone in the chatroom has sent out 2 messages and those two messages are saved in the persistent database and is emited to UserA before that http requests for 10 old messages have even reach the server. In this scenario, User A will receive the 2 new messages first via websocket before the http request returns the 10 old messages.

how to handle deduplications?

other than a message array, I also have an messageIdSet, which stores only messageId.

Since redux can't store sets, I use an Javascript Object (hashMap) instead of set, which also O(1) Get and set operations.

## Redis

The redis will store two entries for a user when a user logs in.

1. A String data type with key of sessionID and value of session informations such as userID, username, etc...

2. A hash data type with userID as key and property about websocket such as is Online or a list of all the socket ID that this user is currently log in to (in string representation hence parsing is needed when read / write is needed). For the list, I can actually use a redis set, but it will create 3 entries for the user (looks messy) and I think the size of the array won't be much so performance won't be a issue?? or should I??

you may wonder, Why do we need this hash data type?? can't we just store user.isOnline in our session entry?? Well, the reason why I stored it in hash because we need to get information about

whether a user is online or not or his friend is online or not. Therefore, we need a fast method to look up.

If we don't use hash, we will need to iterate our entire redis session, and it will be extremely slow because we will need to do it for each user, and each user will use it multiple time. So, using a hash for redis with O(1) find time is more optimal and scalable.

## Scaling

In this project, I am using redis as session storage as it allows for fast and efficient access to session information. Redis is also designed to be highly scalable, meaning that it can handle large amounts of data and traffic.

I am also using PostgreSQL for my persistent Database even I know other popular chat app such as Discord uses NoSQL Database such as MongoDB or Cassandra. Here's my reasons:

<ol>
  <li>Data for my chat apps are mostly relational</li>
  <li>Support ACID transactions</li>
  <li>I personally prefer SQL database unless I have a very good reason to use NoSQL database such as: High scalability & very low latency</li>
  <li>PostgreSQL is very good at handling many concurrent reads and writes. Also PostgreSQL is highly scalable and can handle large volumes of data and high traffic. This makes it an excellent choice for chat apps that require a large number of users and real-time messaging.</li>
</ol>

Currently the backend have only one server as there aren't much active user. If the number of active user increases, I am thinking of horizontally scaling the backend by adding more server to my backend, and change the hosting platform from railways.app to AWS / Azure with a load balancer palaced in front of the backend servers. I might also have an individual server for websocket to improve the performances.

Currently I am deploying my frontend code to netlify instead of having my backend server to serve the static frontend file. This is because I want to benefit from the global CDN that netlify offers when deploying frontend static pages, and this can greatly improve the initial page loading time for users around the country / world.

## Difficulties that I encountered

tricky bugs I encounter: Cookies are not being sent from server to client. Even when sameSite is set to none and secure set to true. The http response don't have set-cookie header.

This event is happening even when both client and server have https. https://quickchat-production.up.railway.app && https://quickchat-app.netlify.app.

solution: the requests is send using http, which I don't understand why. Changing http to https solves the problem.

another difficulties that i encountered during this is that the https requests made from the client always translate to http.

Which causes the cookies to not being forward and is unsafe to middle man attack. I needs to set "trust proxy" in order to solve the problem

this is mainly because railway.app sets an proxy infront of my express server.

spend some time finding http-only cookies, but realized that I can find them in client (broswer) as javascript can't find it.

Difficulties: Websocket connection is fails on incognition mode. trying to find out why...

Why should I deploy my website frontend to Netlify instead of having my main server serving the static file that is build from the frontend?

Netlify offers: Easy site analytics, Globally distributed CDN,

Why did I deploy my website to railways.app?

Problem with approach above: If I deployed frontend to netlify and backend to railways.app. The frontend and backend will have different domain name.

this will leads to issue such as CORS and cookies needs to be set secure: true and sameSite to none. Which is potentially more dangerous.

Solutions:

CSS questions that i learned from this project: 100vh don't work properly in mobile device. We need js to work around.

Solving bugs that 100vh doesn't work for mobile.

Solutions: use javascript to calculate the window.innerHeight

WebRTC is not working in production: reason -> not mute at first.

## Miscellaneous

I am following ES Modules instead of CommonJS.

Backend Server Domain Name: https://quickchat-production.up.railway.app

Frontend Server Domain Name: https://quickchat-app.netlify.app

## Attributions

Icons: Google Material Symbols and Icons
Logos: Canva
