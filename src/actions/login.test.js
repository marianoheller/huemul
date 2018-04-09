
import * as actions from './login';



describe('login actions', ()=> {
    
    it('should return the right type and payload on loginRequest', () => {
        const loginData = {
            a:1, b: "asdasd", c: { d: ""}
        }
        expect(actions.loginRequest(loginData)).toEqual({
            type: actions.LOGIN_REQUEST,
            loginData
        })
    })

    it('should return the right type and payload on loginFailure', () => {
        const errors = { request: "request error!!" };
        expect(actions.loginFailure(errors)).toEqual({
            type: actions.LOGIN_FAILURE,
            errors
        })
    })

    it('should return the right type and payload on loginFailure', () => {
        expect(actions.loginSuccess()).toEqual({
            type: actions.LOGIN_SUCCESS,
        })
    })
})