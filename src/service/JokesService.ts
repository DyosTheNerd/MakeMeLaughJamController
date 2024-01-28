import {firebaseConfig} from "@/helpers/FirebaseHelper";
import {CardIf} from "@/components/Card";

const jokes:any = {};
let initialized = false;
let initating = false;

export async function initJokes() {
    if (initialized || initating) return;

    initating = true;

    const response = await fetch(`${firebaseConfig.jokesUrl}?pageSize=100`)
    const json: any = await response.json()
    json.documents.forEach((doc: any) => {
        jokes[doc.fields.id.stringValue] = doc.fields.text.stringValue
    })
    return jokes

    initialized = true
}


export const getJoke = (card: CardIf ) => {

    return jokes[`${card.type}_${card.intensity}`]
}