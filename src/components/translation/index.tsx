import { Trans, useTranslation } from "react-i18next";

/**
 * Translation component with support to HTML tags using react-i19next
 */
export const Translation = ({ id, values }: { id: string, values?: any }) => {
    useTranslation();

    return (
        <Trans
            i18nKey={id}
            values={values}
            components={{
                h1: <h1 />,
                h2: <h2 />,
                h3: <h3 />,
                li: <li />,
                ul: <ul />,
                p: <p />,
                br: <br />,
                b: <b />
            }}
        />
    )
}