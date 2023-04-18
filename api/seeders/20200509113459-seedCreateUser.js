module.exports = {
    up: (queryInterface) => queryInterface
        .bulkInsert(
            'Users',
            [
                {
                    username: 'test-user',
                    email: 'test.user@pedlg.com',
                    password:
                            '$2b$05$L/fvG.NNCIce9St6gIFEwu3SPpzpbPBtQ5EdSKnES7aE85a9OmHsG',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    has_password: true,
                    register: true,
                    hash_id: 'jR',
                    online: false,
                },
            ],
            {},
        )
        .then((id) => queryInterface.bulkInsert(
            'UserMetadata',
            [
                {
                    userId: id,
                    department: '75',
                    description: 'I am a test user',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        )),

    down: (queryInterface) => queryInterface.bulkDelete('Users', [
        {
            username: 'test-user',
        },
    ]),
};
