import {CardIf} from "@/components/Card";

export const firebaseConfig = {
    baseUrl : 'https://firestore.googleapis.com/v1/projects/makemelaughjam/databases/(default)/documents/games',
    jokesUrl: 'https://firestore.googleapis.com/v1/projects/makemelaughjam/databases/(default)/documents/jokes'
}

export function toFirebaseObject(obj: any) {
    console.log(obj)
    const result: any = { fields:{

        }}
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string')
        {
            result.fields[key] = {stringValue: obj[key]}
        } else{
            result.fields[key] = {integerValue: obj[key]}
        }
    })
    return result
}


export function cardsFromFirebaseObject(obj: any): CardIf[] {
    const result:CardIf[]  = []

    console.log(obj)



    obj.fields.cards.arrayValue.values.forEach((cardRaw: any) => {


        const card: CardIf = {
            id: parseInt(cardRaw.mapValue.fields.id?.integerValue),
            text: cardRaw.mapValue.fields.text?.stringValue,
            type: cardRaw.mapValue.fields.type?.stringValue,
            intensity: cardRaw.mapValue.fields.intensity?.integerValue? parseInt(cardRaw.mapValue.fields.intensity?.integerValue): 0,
        }
        result.push(card)
    })
    return result
}