import { Html, Head, Main, NextScript } from 'next/document'
import { AuthProvider } from '../hooks/useUser'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Kanit:300,400,500,700,800&display=optional" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700,800&display=optional" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}