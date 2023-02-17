import { redisClient } from "../server.js";
import { io } from "../socketServer.js";

export const getSetSize = async (key) => {
  return new Promise((resolve, reject) => {
    redisClient.sCard(key, (err, count) => {
      if (err) {
        reject(err);
      } else {
        resolve(count);
      }
    });
  });
};

export const getSetMember = async (key) => {
  return new Promise((resolve, reject) => {
    redisClient.sMembers(key, (err, members) => {
      if (err) {
        reject(err);
      } else {
        resolve(members);
      }
    });
  });
};

export const checkHashIsOnline = async (key) => {
  return new Promise((resolve, reject) => {
    redisClient.hGet(key, "isOnline", (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

export const sendSocketMessageToUser = async (userId, socketLocation, data) => {
  const receiverSocket = await getSetMember(`userid:${userId}:socketIds`);
  for (let socketId of receiverSocket) {
    io.to(socketId).emit(socketLocation, data);
  }
};

export const rateLimiterIncrementKey = async (key) => {
  return new Promise((resolve, reject) => {
    redisClient.incr(key, (err, count) => {
      if (err) {
        reject(err);
      } else {
        resolve(count);
      }
    });
  });
};

export const rateLimiterSetExpire = async (key) => {
  return await new Promise((resolve, reject) => {
    redisClient.expire(key, 60, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
