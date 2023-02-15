# Auth

# I am using session authentication for this project. whenever a user is authenticated, a sessionID will be generated and save in my session storage (redis)

# Then this sessionID will be stored in client's frontend inside the http-only cookie. After that every requests the user make will needs includes this session id in the cookie.

# Session auth is vunlable to CSRF attack. IN this case, I will also generate an CSRF token after the user is being authenticated. Then this CSRF token will be saved in Localstorage

# because I want to have an long login features. The following requests a user make will also needs to send this CSRF token. I understand that saving CSRF token in localstorage will make

# it vunlable to XSS attack, but I believes that if XSS happens then no matter where I store (hidden form, http-only cookie, or session storage) it will not be safe.

# If a theif is already in your house, then no matter how much you renforce the door they will still steal everything from you.

# of course there exists much safer solutions, but I think for this project, the implementaiton above is enough as this chat app is not vunlable to any real money (like bank account or payment infos..) and the above implmentaions is good enought for 99% of the time.

# In this project, I want to pratice how to scale up, so I uses redis to store my sessionIDs (faster lookup and allows multiple server to access), and uses postgreSQL which is very

# good at handling many concurrent reads and writes. I also didn't set the cookie to sameSite : 'strict' because I to put my frontend code (static files) to be hosted on a platform that

# supports CDN services, which can significantly reduce the load time for my user around the world by caching in CDN Server. Therefore, that means the backend server and frontend will be

# running on different domain and meaning I needs to do something with CORS. The cookie will still have security set to true which means only https are allow to increase the security.

# The CSRF token will be stored in localstorage, and everytime a requests failed or user log out the CSRF will be deleted from the localstorage.

# This project, I am following ES Modules instead of CommonJS.

# Implemented Rate Limiting

# uses helmet on node.js express for more secure

# Friends functionalities and logic flow

# If an user wants to add another user, they will send out http request to the server containing receiver username or ID

# If such requests is valid, we will save this request.

# when user logs in, they will establish a socket connection with the server.

# The redis will uses and hastable to store all the socket ids..

# when a user log in, they will see all their friends.

# And they will use this friends lists to iterative finds out what are all the informations???

# if have time, look up how to set redis to socket storages for socket.io.

# The redis will store two entries for a user when a user logs in.

# 1. A String data type with key of sessionID and value of session informations such as userID, username, etc...

# 2. A hash data type with userID as key and property about websocket such as is Online or a list of all the socket ID that this user is currently log in to (in string representation hence parsing is needed when read / write is needed). For the list, I can actually use a redis set, but it will create 3 entries for the user (looks messy) and I think the size of the array won't be much so performance won't be a issue?? or should I??

# you may wonder, Why do we need this hash data type?? can't we just store user.isOnline in our session entry?? Well, the reason why I stored it in hash because we need to get information about

# whether a user is online or not or his friend is online or not. Therefore, we need a fast method to look up.

# If we don't use hash, we will need to iterate our entire redis session, and it will be extremely slow because we will need to do it for each user, and each user will use it multiple time. So, using a hash for redis with O(1) find time is more optimal and scalable.

# How about long login?? how is this implemented in my code?

# well, when a user login, a session will be created in redis

# the session will be set to expired after 25H, and the cookie is set to

# be exipred after 24H. If the user tried to login after his session is

# expired, he will be automatically logout and redirected to login page

# yes, the user will need to login every 25H, even he just opened this app at the 24.9H, he will be log out after 0.1H. I know we can optimize this user experiences by reseting session expirations time everytime uesr fetches a requests, but I am pretty happy with the current implementaions and will improve this in the future if available or by demand.

# Because Session authentication is vunlable to XSS attack, Once a user is authenticated, I need to bring the csrf token in each requests to furture help server validate a requests.

# Messages Deduplications:

# I believes that we need to handle messages deduplications, and it needs to be done on the

# client side.

# Reasons:

# I will fetch 10 old chat history when use first enter the chatroom using http protocol

# and i will use websocket to display any new messages the user receive after he entered the chat room

# let's consider the following scenerio

# User A entered a chatroom. he already have websocket connected to the app before he enter a chatroom. the moment he entered the chatroom, he sends out a http requests to get 10 oldest chat message. But, this http requests due to many many reasons, is very slow. And before this http requests even reach the server, someone in the chatroom has sent out 2 messages and those two messages are saved in the persistent database and is emited to UserA before that http requests for 10 old messages have even reach the server. In this scenario, User A will receive the 2 new messages first via websocket before the http request returns the 10 old messages.

# how to handle deduplications?

# other than a message array, I also have an messageIdSet, which stores only messageId.

# Since redux can't store sets, I use an Javascript Object (hashMap) instead of set, which also O(1) Get and set operations.

# For WebRTC, we need a signiling server (our server) and an stun server and an turn server.

# for most case a stun server is enough, but stun server is unreliable because most of our modern device sits behind a firewall and we can't get the nat infos from stun, hence we need a turn server to solve this problem.

# stun server I will use is the google stun server: stun:stun.l.google.com:19302

# Currently what i am thinking is that who ever join the chatroom is responsible for making the offer and who is already in the chatroom (video i mean) will make offer responding to that offer.

# We don't need to send CSRF token in GET request. CSRF Attack is a blind attack. It only sends requests to do something in the backend server.

# HTTP Requests now that needs CSRF Token:

# Backend Server Domain Name: https://quickchat-production.up.railway.app

# Frontend Server Domain Name: https://quickchat-app.netlify.app

# tricky bugs I encounter: Cookies are not being sent from server to client. Even when sameSite is set to none and secure set to true. The http response don't have set-cookie header.

# This event is happening even when both client and server have https. https://quickchat-production.up.railway.app && https://quickchat-app.netlify.app.

# solution: the requests is send using http, which I don't understand why. Changing http to https solves the problem.
