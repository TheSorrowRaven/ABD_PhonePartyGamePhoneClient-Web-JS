const d = document

const inputName = d.querySelector('#inputName')
const inputRoomCode = d.querySelector('#inputRoomCode')
const pJoinRoom = d.querySelector('#pJoinRoom')
const divMessenger = d.querySelector('#divMessenger')

var RoomCode


d.querySelector("#buttonJoinRoom").addEventListener('click', () => {
    let roomCode = inputRoomCode.value
    console.log(roomCode)
    if (roomCode.length != 4) {
        pJoinRoom.textContent = 'Room Code must be 4 alphabetical letters'
        return
    }
    roomCode = roomCode.toUpperCase()
    if (!isAlpha(roomCode)) {
        pJoinRoom.textContent = 'Room Code must be 4 alphabetical letters'
        return
    }
    wsSend({
        req: 'join',
        join: {
            code: roomCode
        }
    },
    (res) => {

        if (res.join.error) {
            pJoinRoom.textContent = `Room Code ${roomCode} not found!`
            return
        }
        pJoinRoom.textContent = `Join successful! - ${res.join.code}`
        RoomCode = res.join.code
        divMessenger.hidden = false
    })

})

function isAlpha(input) {
    return /^[a-zA-Z]+$/.test(input);
}