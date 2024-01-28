import * as jokes from './jokes.json'
import {firebaseConfig, toFirebaseObject} from "@/helpers/FirebaseHelper";

export default function AdminJokes(){

    return (
        <div>
            <h1>Admin Jokes</h1>
            <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={()=>{
                uploadJokes()
            }}>Set Jokes</button>
        </div>
    )
}

function uploadJokes(){
    const anyJokes = jokes as any
    Object.keys(anyJokes).forEach((key)=> {
        if (key === 'default') return
        const joke = anyJokes[key]
        console.log(joke)
        fetch(`${firebaseConfig.jokesUrl}/${key}`, {
            method: 'PATCH',
            body: JSON.stringify(toFirebaseObject({id: key, text: joke})),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })
    }
