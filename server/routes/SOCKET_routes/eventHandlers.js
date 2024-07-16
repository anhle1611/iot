'use strict';

const messageModel = {
  welcomeMessage: 'Hi! Great to see you here! How are you?',
  chatMessages: [
    'Nice! At the moment you are chatting with a machine! I hope you are ok with that! Are you?',
    'Great. Do you have any questions about this project?',
    'Between you and me, when I wrote this code, only God and I understood what I did. Now only God knows. So if you do have any questions... ;)',
    'Can I help you with anything else? I have got a riddle or two for you... Are you up for a riddle?',
    'Whether you are up for a riddle or not, here is your first riddle. What has a face and two hands but no arms or legs?',
    'A clock! Ready for the next one?',
    'Ready or not, here is your next riddle. What is full of holes but still holds water?',
    'It is a sponge:-). I have got one last one riddle. Ready?',
    'Ready or not, here it comes. I am an odd number. Take away a letter and I become even. What number am I?',
    'Seven...',
    'I am out of riddles. Join the reading room and enjoy the docs',
    'I am out of riddles. You better get to work! Happy coding!'
  ],
  customMessages: []
};
const userModel = {
  main_room: []
};

//Event handlers

exports.addToDB = (id) => {
  try {
    return addUser(id);
  } catch (error) {
    console.error(error);
  }
};

exports.welcomeClient  = (data) => {
  try {
    const message = messageModel.welcomeMessage;
    return { message: message, sender: 'server' };
  } catch (error) {
    console.error(error);
  }
};

exports.sendMessageToClient  = (data, id) => {
  try {
    if (userModel.main_room.length === 1) {
      const messageCount = getMessageCount(id);
      const message = messageModel.chatMessages[messageCount];
      return {
        message: message,
        sender: 'server'
      };
    }
    return {
      message: data
    };
  } catch (error) {
    console.error(error);
  }
};

exports.onClientDisconnect = (id) => {
  const updatedClientList = removeUser(id);
  return updatedClientList;
};

//Helper functions

function addUser (id) {
  userModel.main_room.push({ id, messageCount: 0 });
  return userModel.main_room;
}

function removeUser (id) {
  let index = userModel.main_room.map(el => el.id).indexOf(id);
  userModel.main_room.splice(index, 1);
  return userModel.main_room;
}

function getMessageCount (id) {
  const length = messageModel.chatMessages.length;
  const user = userModel.main_room.find(el => el.id === id);
  const messageCount = user.messageCount;
  messageCount < length - 1
    ? user.messageCount++ : user.messageCount;
  return messageCount;
}