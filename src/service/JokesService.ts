import {firebaseConfig} from "@/helpers/FirebaseHelper";
import {CardIf} from "@/components/Card";

const jokes:any = {};
let initialized = false;
let initating = false;

async function init() {
    const response = await fetch(`${firebaseConfig.jokesUrl}?pageSize=100`)
    const json: any = await response.json()
    json.documents.forEach((doc: any) => {
        jokes[doc.fields.id.stringValue] = doc.fields.text.stringValue
    })
    return jokes
}


export const getJoke = async (card: CardIf ) => {
    if (!initialized)
    {
        if (initating) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(getJoke(card))
                }, 1000)
            })
        }
        initating = true
        await init()
    }
    return jokes[`${card.type}_${card.intensity}`]
}