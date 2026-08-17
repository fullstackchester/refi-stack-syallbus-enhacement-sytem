import { onValue, ref } from "firebase/database"
import { database } from "./Firebase"
import { snapshotCollection } from './FirebaseData'
import type { Post, SchoolYear, Subject } from '../types/domain'

export let subjects: Subject[] = []
export let schoolYear: SchoolYear[] = []
export let posts: Post[] = []

onValue(ref(database, `subject`), sub => {
    if (sub.exists()) {
        subjects = snapshotCollection<Subject>(sub)
    }
})

onValue(ref(database, `schoolYear`), sy => {
    if (sy.exists()) {
        schoolYear = snapshotCollection<SchoolYear>(sy)
    }
})

onValue(ref(database, `posts`), post => {
    if (post.exists()) {
        posts = snapshotCollection<Post>(post)
    }
})

