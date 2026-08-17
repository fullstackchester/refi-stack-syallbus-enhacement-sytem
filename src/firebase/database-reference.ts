import { ref } from 'firebase/database'
import { database } from 'clients/Firebase'


const USER_REFERENCE  = ref(database, 'users');
const SCHOOL_YEAR_REFERENCE = ref(database, 'schoolYear')
const SUBJECT_REFERENCE = ref(database, 'subject')
const USER_REF = (currentUserUid?: string) => ref(database, (currentUserUid ? `users/${currentUserUid}` : 'users'))
const POST_REFERENCE = (postId?: string) => ref(database, (postId ? `posts/${postId}` : 'posts'))



export { POST_REFERENCE, SCHOOL_YEAR_REFERENCE, SUBJECT_REFERENCE, USER_REFERENCE, USER_REF }