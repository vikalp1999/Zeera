import { GET_USER_REQUEST, ADD_CHATROOM, ERROR, CHANGE_STAT } from "./user.types";

const initialState = {
    teamData: {},
    done:[],
    inprogress:[],
    todo:[],
    isError:false
};

export const teamReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USER_REQUEST: {
            let done = []
            let inprogress = []
            let todo = []
            payload.alltasks.forEach(ele=>{
                if(ele.status=='done'){
                    done.push(ele)
                } else if(ele.status=='todo'){
                    todo.push(ele)
                }  else if(ele.status=='inprogress'){
                    inprogress.push(ele)
                }
            })
            return {
                ...state,
                teamData: {...payload},
                todo,
                inprogress,
                done,
                isError:false
            }
        }
        case ADD_CHATROOM: {
            let done = []
            let inprogress = []
            let todo = []
            payload.alltasks.forEach(ele=>{
                if(ele.status=='done'){
                    done.push(ele)
                } else if(ele.status=='todo'){
                    todo.push(ele)
                }  else if(ele.status=='inprogress'){
                    inprogress.push(ele)
                }
            })
            return {
                ...state, 
                teamData:payload,
                todo,
                inprogress,
                done,
                isError:false
            }
        }
        case ERROR:{
            return {
                ...state,
                isError:true
            }
        }
        case CHANGE_STAT:{
            let from = state[payload.curr]
            let to = state[payload.changestatus]
            
            from = from.filter(ele=>{
                if(ele._id==payload.id){
                    ele.status = payload.changestatus
                    to.push(ele)
                } else {
                    return ele
                }
            })

            console.log(from, to)

            return {
                ...state,
                [payload.curr]:from,
                [payload.changeStatus]:to
            }
        }
        default: {
            return {
                ...state
            };
        }
    }
};
