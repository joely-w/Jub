const socket = io.connect({path: '/live/socket.io'});
const {RTCPeerConnection, RTCSessionDescription} = window;
const peerConnection = new RTCPeerConnection({
    iceServers: [
        {url: "stun:numb.viagenie.ca", username: "joely_w@outlook.com", credential: "egNB`;,9)=Y=s2VN"}]
});
peerConnection.ontrack = function ({streams: [stream]}) {
    const remoteVideo = document.getElementById("remote-video");
    if (remoteVideo) {
        remoteVideo.srcObject = stream;
    }
};

class VideoChat {
    constructor() {
        this.localCamera();
        this.userItemListener();
        this.manageUser()
        this.socketListeners();
        this.isAlreadyCalling = false;
    }

    manageUser() {
        checkLogin(response => {
            if (!response.logged_in) {
                window.location.replace('/signin.html')
            } else {
                socket.emit('set name', response.details.firstName +" "+ response.details.lastName);
            }
        })
    }

    socketListeners() {
        socket.on('update-user-list', ({users}) => {
            this.updateUsersList(users);
        });

        socket.on('remove-user', ({socketId}) => {
            $(`#${socketId}`).remove();
        });

        socket.on('call-made', async data => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
            socket.emit('make-answer', {answer, to: data.socket});
        });
        socket.on('answer-made', async data => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));

            if (!this.isAlreadyCalling) {
                await this.callUser(data.socket);
                this.isAlreadyCalling = true;
            }
        });
    }

    localCamera() {
        navigator.getUserMedia(
            {video: true, audio: true},
            stream => {
                const localVideo = document.getElementById("local-video");
                if (localVideo) {
                    localVideo.srcObject = stream;
                }

                stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
            },
            error => {
                console.warn(error.message);
            }
        );
    }

    updateUsersList(socketIds) {
        const userContainer = $("#active-user-container");
        socketIds.forEach(sockets => {
            const existingUser = $(`#${sockets.id}`);
            if (existingUser.length === 0) {
                userContainer.append(this.userItemContainer(sockets.id, sockets.name));
            }
        })
    }

    userItemContainer(socketId, fullName) {
        return `<div class="active-user" id="${socketId}" data-name="${fullName}"><p class="username">${fullName}</p></div>`;
    }

    userItemListener() {
        const current_class = this;
        const talking_with = $("#talking-with-info");
        $(document).on('click', '.active-user', function () {
            current_class.unselectUsersList();
            $(this).addClass('active-user--selected');
            talking_with.text(`Talking with ${$(this).attr('data-name')}`);
            current_class.callUser($(this).attr('id'));
        })
    }

    unselectUsersList() {
        const selectedUser = $(".active-user.active-user--selected");
        selectedUser.removeClass('active-user--selected');
    }

    async callUser(socketId) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
        socket.emit("call-user", {offer, to: socketId});
    }
}

new VideoChat();
