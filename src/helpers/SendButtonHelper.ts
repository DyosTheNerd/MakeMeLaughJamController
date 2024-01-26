const data = {

    "fields": {
        "c": {
            "stringValue": "d"
        }
    },

}

const url = "https://firestore.googleapis.com/v1/projects/makemelaughjam/databases/(default)/documents/games/yg2qIriDEvQPz80d2acZ/players"

// function sendButton that performs a fetch POST to url with data
export function  sendButton  (): Promise<Response> {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

