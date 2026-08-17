import { ref } from 'firebase/database'
import { database } from 'clients/Firebase'


const USER_REFERENCE  = ref(database, 'users');
const SUBJECT_REFERENCE = ref(database, 'subject')
const USER_REF = (currentUserUid?: string) => ref(database, (currentUserUid ? `users/${currentUserUid}` : 'users'))



export { SUBJECT_REFERENCE, USER_REFERENCE, USER_REF }