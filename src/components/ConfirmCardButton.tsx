


// simple react button component that performs a fetch on click if the prop is set
// to true. The button is disabled while the fetch is in progress.
// The button is disabled if the prop is set to false.

import {CardIf} from "@/components/Card";
import {useState} from "react";
import {firebaseConfig} from "@/helpers/FirebaseHelper";

export default function ConfirmCardButton(props: {card?: CardIf | undefined | null, confirmCard: () => Promise<void>}) {
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <div className="ConfirmCardButton">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={async ()=> {
                setLoading(true);
                await props.confirmCard();
                setLoading(false);
            }} disabled={!props.card || loading}>
                {!!props.card? `Confirm :loading ${loading}` : "Select a card"}
            </button>
        </div>
    )
}

