
import {Request} from 'express'

type TokenPayload ={
    id:string,
    role:'ADMIN' | 'EMPLOYEE' | 'CUSTOMER'
}


declare global{
    namespace Express{
        interface Request{
            tokenPayload:TokenPayload
        }
    }
}