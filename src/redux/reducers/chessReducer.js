import { user1 } from "../../config"

const initialState = {
    status: null,
    gameId: null,
    currentPlayer: 1
}

const chessReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch(type) {
        case "SAVE_CURRENT_PLAYER": return {
            ...state,
            currentPlayer: payload
        }
        case "SAVE_WINNER": return {
            ...state,
            winner: payload
        }
        case "SAVE_GAME_STATUS": return {
            ...state,
            status: payload
        }
        case "SAVE_GAME_ID": return {
            ...state,
            gameId: payload
        }
        default: return state
    }
}


export default chessReducer