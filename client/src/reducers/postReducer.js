import { ADD_POST, DELETE_POST, GET_POSTS, POST_LOADING,GET_POST } from "../actions/types";

const initialState = {
    post: {},
    posts: [],
    loading: false
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            }

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }

        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }

        default:
            return state;
    }
}
export default postReducer