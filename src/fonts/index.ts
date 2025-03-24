import { Instrument_Sans, Roboto } from "next/font/google"
import localFont from "next/font/local"

export const instrumentSans = Instrument_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ['latin'],
    variable: "--font-intrument-sans"
})

export const roboto = Roboto({
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    subsets: ['latin'],
})

export const sfProText = localFont({
    display: "auto",
    src: [
        {
            path: './sf-pro-text/SFProText-Light.ttf',
            weight: '300',
        },
        {
            path: './sf-pro-text/SFProText-Regular.ttf',
            weight: '400',
        },
        {
            path: './sf-pro-text/SFProText-Medium.ttf',
            weight: '500',
        },
        {
            path: './sf-pro-text/SFProText-Semibold.ttf',
            weight: '600',
        },
        {
            path: './sf-pro-text/SFProText-Bold.ttf',
            weight: '700',
        },
    ]
})