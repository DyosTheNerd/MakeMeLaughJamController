import * as qrcode from "qrcode";

// current url on vercel from env variable

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL }` : "http://localhost:3000"

export default async function GET (req: any,res: any ) {

    const id = req.query.id

    console.log(`initializing a game with ${id}`)

    const data = await qrcode.toDataURL(`${baseUrl}/${id}`);

    res.send(data)

}