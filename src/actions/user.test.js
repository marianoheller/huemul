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

    it('should return the right type and jwt on getVersion', () => {
        expect(actions.getVersion()).toEqual({
            type: actions.VERSION_GET,
            jwt: true
        })
    })

    it('should return the right type and buildVersion on setVersion', () => {
        const mockVersion = "0.0.1";
        expect(actions.setVersion(mockVersion)).toEqual({
            type: actions.VERSION_SET,
            buildVersion: mockVersion
        })
    })

})