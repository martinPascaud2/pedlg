import Document, { Html, Head, Main, NextScript } from 'next/document';

class PEDLG extends Document {
    render() {
        return (
            <Html lang="fr">
                <Head>
                    <meta
                        name="description"
                        content="Prends-en de la Graine est une plateforme en ligne gratuite d'échange de semences paysannes."
                    />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default PEDLG;
