const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL

const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true
});

const socket = io();

//Join chatroom
socket.emit('joinRoom', { username, room });


/* DONT NEED */
//Get room and users
socket.on('roomUsers', ({ room, users }) => {
	outputRoomName(room);
	outputUsers(users);
});

//Message from server
socket.on('message', message => {
	console.log(message);
	outputMessage(message);

	//Scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	//Get mesasge text
	const msg = e.target.elements.msg.value;

	//Emit message to server
	socket.emit('chatMessage', msg);

	//clear message input field after message submitted
	e.target.elements.msg.value = '';
	e.target.elements.msg.focus(); //focus keep us in the text box so no need click in it everytime after submited message
});

//output mesage to DOM (to the messenger area)
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	div.innerHTML = `
	<p class="meta">${message.username}<span>${message.time}</span></p>
	<p class="text">
		${message.text}
	</p>
	`;
	document.querySelector('.chat-messages').appendChild(div);

	/* HERE COULD TAKE
			message.username
			message.time
			message.text
	 and save it to the database */
}


/* DONT NEED */
//add room name to DOM
/* so this could be added as separate rooms for separate matches */
function outputRoomName(room) {
	roomName.innerText = room;
}

/* DONT NEED */
//Add users to DOM
/* added to the diebar who is in the room */
function outputUsers(users) {
	userList.innerHTML = `
	${users.map(user => `<li>${user.username}</li>`).join('')}
	`;
}