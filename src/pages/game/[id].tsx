'use client'

import {useRouter} from "next/router";
import {usePathname, useSearchParams} from "next/navigation";
import {JokeCarousel} from "@/components/JokeCarousel";
import {ThemeProvider} from "@material-tailwind/react";
// simple react component displaying the path parameters
//
export default function GameComponent({params}: { params: any }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const val = `${pathname} - ${searchParams} - ${useRouter()} - ${params}`

    return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div>
                    <p>Game {val} - {useRouter().query.id}</p>
                    <JokeCarousel></JokeCarousel>
                </div>
            </main>
    )
}