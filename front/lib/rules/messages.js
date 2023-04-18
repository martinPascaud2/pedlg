const messages = {
    /* Commmon */
    REQUIRED: 'Ce champs est requis',
    USER_NOT_FOUND: "Cet utilisateur n'existe pas",
    FIELD_CONFIRMATION: field =>
        `Ce champ et "${field}" doivent être identiques`,

    /* Username */
    USERNAME_EMPTY: () => messages.REQUIRED,
    USERNAME_UNIQUE: "Ce nom d'utilisateur existe déjà",
    USERNAME_FORMAT: (
        <span>
            Le nom d&#39;utilisateur doit:
            <div>- contenir seulement des minuscules, chiffres et _-</div>
            <div>
                - commencer et se terminer par un caractère alphanumérique
            </div>
        </span>
    ),
    USERNAME_LEN: values =>
        `Le nom d'utilisateur doit faire entre ${values[0]} et ${values[1]} caractères`,

    /* Password */
    PASSWORD_EMPTY: () => messages.REQUIRED,
    PASSWORD_INVALID: 'Ce mot de passe est invalide',
    PASSWORD_LEN: value =>
        `Le mot de passe doit faire au moins ${value} caractères`,
    PASSWORD_NO_NUMBER: 'Le mot de passe contenir au moins 1 chiffre',
    PASSWORD_NO_UPPERCASE: 'Le mot de passe contenir au moins 1 majuscule',
    PASSWORD_NO_LOWERCASE: 'Le mot de passe contenir au moins 1 minuscule',
    /* eslint-disable react/display-name */
    PASSWORD_FORMAT: constraints => (
        <span>
            Le mot de passe doit contenir au moins:
            <div className="tags">
                <span
                    className={`tag ${
                        !constraints.hasLowercase ? 'is-danger' : 'is-success'
                    }`}
                >
                    1 minuscule
                </span>
                <span
                    className={`tag ${
                        !constraints.hasUppercase ? 'is-danger' : 'is-success'
                    }`}
                >
                    1 majuscule
                </span>
                <span
                    className={`tag ${
                        !constraints.hasNumber ? 'is-danger' : 'is-success'
                    }`}
                >
                    1 chiffre
                </span>
                <span
                    className={`tag ${
                        !constraints.hasMinLen ? 'is-danger' : 'is-success'
                    }`}
                >
                    8 caractères
                </span>
            </div>
        </span>
    ),

    /* Email address */
    MAIL_EMPTY: () => messages.REQUIRED,
    MAIL_UNIQUE: () => 'Cette adresse e-mail existe déjà',
    MAIL_FORMAT: 'Ce champ doit être une adresse e-mail valide',
    MAIL_MAX: value =>
        `L'adresse e-mail doit faire au plus ${value} caractères`,

    /* Description */
    DESCRIPTION_LEN: values =>
        `La description doit faire entre ${values[0]} et ${values[1]} caractères`,

    /* Stock */
    STOCK_QUANTITY_MIN: value =>
        `La quantité ne peut être inférieure à ${value}`,
    STOCK_QUANTITY_UNIT: `L'unité ne peut être représentée qu'en "gramme", "pièce"`,

    /* getter */
    getMessage: (key, value = null) =>
        messages[key] && messages[key] instanceof Function
            ? messages[key](value)
            : messages[key],
};

const { getMessage } = messages;

export default getMessage;
