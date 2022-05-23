import { onValue, ref } from "firebase/database"
import { database } from "./Firebase"

export let subjects = []
export let schoolYear = []

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
