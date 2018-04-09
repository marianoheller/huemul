import * as actions from './user';



describe('user actions', ()=> {
    
    it('should return the right type and payload on userLogin', () => {
        const user = { a:1, b: "asdasd", c: { d: ""} }
        expect(actions.userLogin(user)).toEqual({
            type: actions.USER_LOGIN,
            user
        })
    })

    it('should return the right type and payload on userLogout', () => {
        expect(actions.userLogout()).toEqual({
            type: actions.USER_LOGOUT,
        })
    })

    it('should return the right type and payload on userLogout', () => {
        expect(actions.userCheckin()).toEqual({
            type: actions.USER_CHECKIN,
        })
    })

})