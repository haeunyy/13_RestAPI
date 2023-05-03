import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_REGISTER = 'member/POST_REGISTER';
const POST_LOGIN = 'member/POST_LOGIN';
const RESET_MEMBER = 'member/RESET_MEMBER';

export const { member : { postRegister, postLogin, resetMember } } = createActions({
    [POST_REGISTER] : res => res,
    [POST_LOGIN] : res => res,
    [RESET_MEMBER] : () => {}
});

/* 리듀서 */
const memberReducer = handleActions({
    [POST_REGISTER] : (state, { payload }) => ({ regist : payload }),
    [POST_LOGIN] : (state, { payload }) => ({ login : payload }),
    [RESET_MEMBER] : (state, action) => initialState
}, initialState);

export default memberReducer;