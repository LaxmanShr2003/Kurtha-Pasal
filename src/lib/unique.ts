
import *as crypto from 'crypto'

export const unique = ()=>{
    return crypto.randomBytes(16).toString('hex');
}