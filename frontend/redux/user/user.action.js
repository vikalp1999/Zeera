import axios from "axios";
import { ADD_CHATROOM, CHANGE_STAT_DRAG, GET_USER_REQUEST, ERROR, CHANGE_STAT } from "./user.types";

let API = process.env.NEXT_PUBLIC_API_LINK;

export const teamAction = (id) => async (dispatch) => {
    console.log('triggered')
    try {
        const res = await axios.get(`${API}/chatroom/${id}`);
        const data = await res.data;
        dispatch({ type: GET_USER_REQUEST, payload: data.chatroom })
    } catch (error) {
        console.log(error.message)
    }
};

export const AddChatroom = (chatroom) => {
    return {
        type:ADD_CHATROOM,
        payload:chatroom
    }
}

export const deleteTaskAction = (task, chatroom) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/task/deltask`, {
            task,
            chatroom
        });
        const data = await res.data;
        dispatch(teamAction(chatroom))
    } catch (error) {
        console.log(error.message)
    }
};

export const updateTaskAction = (curr, id, changestatus) => async (dispatch) => {
    dispatch({
        type:CHANGE_STAT,
        payload:{curr, id, changestatus}
    })
    try {
        const res = await axios.post(`${API}/task/updatestatus/${id}`, {
            changestatus
        });
        const data = await res.data;
        return dispatch({
            type:ERROR
        })
    } catch (error) {
        console.log(error.message)
    }
};