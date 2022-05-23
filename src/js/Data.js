import { onValue, ref } from "firebase/database"
import { database } from "./Firebase"

export let subjects = []
export let schoolYear = []
export let posts = []

onValue(ref(database, `subject`), sub => {
    if (sub.exists()) {
        subjects = Object.values(sub.val())
    }
})

onValue(ref(database, `schoolYear`), sy => {
    if (sy.exists()) {
        schoolYear = Object.values(sy.val())
    }
})

onValue(ref(database, `posts`), post => {
    if (post.exists()) {
        posts = Object.values(post.val())
    }
})


