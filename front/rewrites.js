module.exports = [
    // { source: 'URI', destination: 'page file' },
    { source: '/inscription', destination: '/register' },
    { source: '/mentions-legales', destination: '/tos' },
    { source: '/parametres', destination: '/settings/account' },
    { source: '/parametres/compte', destination: '/settings/account' },
    { source: '/parametres/securite', destination: '/settings/security' },
    { source: '/parametres/inventaire', destination: '/settings/stock' },
    {
        source: '/parametres/liste-de-souhaits',
        destination: '/settings/wishlist',
    },
    { source: '/partage/:hashId', destination: '/share/:hashId' },
    { source: '/variete/:id', destination: '/seed/:id' },
    { source: '/rechercher', destination: '/search' },
    { source: '/messagerie', destination: '/chat' },
];
