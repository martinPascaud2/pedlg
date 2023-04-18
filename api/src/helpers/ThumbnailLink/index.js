const fs = require('fs');

const { createCanvas, loadImage, registerFont } = require('canvas');

const { User, Stock, Want } = require('../../../models');

const { CLIENT_URL } = process.env;

const HEIGHT = 315;
const WIDTH = 600;

const CUSTOM_FONT = './src/public/font/Nature.ttf';
const NAME_FONT = 'Nature';

const BG_IMG = './src/public/assets/bg_list.jpg';

const LOGO = './src/public/assets/pedlg.png';
const LOGO_WIDTH = 30;
const LOGO_HEIGHT = 40;
const MARGIN_LOGO = 10;

const BLACK_COLOR = '#090b0c';
const WHITE_COLOR = '#fff';

const PEDLG_FONT = '14px Verdana bold';
const PEDLG = 'prendsendelagraine.net';

const LIST_FONT = '20px Verdana bold';

const MARGIN_LEFT = 50;

const TITLE_FONT = 'px "Nature"';
const TITLE_INITIAL_FONT_SIZE = 55;
const TITLE_MARGIN_HEIGHT = 130;
const TITLE_MARGIN_WIDTH = 90;

const WANT = 'Souhaites';
const WANT_HEIGHT = 250;
const STOCK = 'Partages';
const STOCK_HEIGHT = 200;
const LINK = `${CLIENT_URL}/partage/`;
const LINK_HEIGHT = 300;

const initContext = (canvas) => {
    registerFont(CUSTOM_FONT, { family: NAME_FONT });
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    ctx.fillStyle = WHITE_COLOR;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    return ctx;
};

const displayStock = (ctx, stock) => {
    ctx.font = LIST_FONT;
    ctx.fillStyle = WHITE_COLOR;

    let text = '';
    if (stock === 1) {
        text = `${STOCK} ${stock} variété`;
    } else if (stock > 1) {
        text = `${STOCK} ${stock} variétés`;
    }
    const stockSize = ctx.measureText(text);
    ctx.fillText(text, WIDTH - stockSize.width - MARGIN_LEFT, STOCK_HEIGHT);
};

const displayWant = (ctx, want) => {
    ctx.font = LIST_FONT;
    ctx.fillStyle = WHITE_COLOR;

    let text = '';
    if (want === 1) {
        text = `${WANT} ${want} variété`;
    } else if (want > 1) {
        text = `${WANT} ${want} variétés`;
    }
    const wantSize = ctx.measureText(text);
    ctx.fillText(text, WIDTH - wantSize.width - MARGIN_LEFT, WANT_HEIGHT);
};

const displayLink = (ctx, hashId) => {
    ctx.font = LIST_FONT;
    ctx.fillStyle = WHITE_COLOR;
    const text = `${LINK}${hashId}`;
    const linkSize = ctx.measureText(text);
    ctx.fillText(text, WIDTH - linkSize.width - MARGIN_LEFT, LINK_HEIGHT);
};

const displayPedlg = (ctx) => {
    ctx.font = PEDLG_FONT;
    const pedlgSize = ctx.measureText(PEDLG);
    ctx.fillText(
        PEDLG,
        MARGIN_LOGO * 2 + LOGO_WIDTH,
        MARGIN_LOGO + (pedlgSize.emHeightAscent + LOGO_HEIGHT) / 2,
    );
};

const saveThumbnail = (canvas, hashId) => {
    const base64String = canvas.toDataURL();
    const base64Image = base64String.split(';base64,').pop();
    fs.writeFile(
        `./src/public/lists/${hashId}.png`,
        base64Image,
        { encoding: 'base64' },
        (err) => {
            if (err) console.error(err);
            // else console.log('created');
        },
    );
};

const displayUsername = (ctx, username) => {
    ctx.fillStyle = BLACK_COLOR;

    ctx.font = `${TITLE_INITIAL_FONT_SIZE}${TITLE_FONT}`;
    let titleSize = ctx.measureText(username);
    let reducFont = 0;

    if (titleSize.width + TITLE_MARGIN_WIDTH > 400) {
        while (titleSize.width + TITLE_MARGIN_WIDTH - reducFont > 400) {
            ctx.font = `${TITLE_INITIAL_FONT_SIZE - reducFont}${TITLE_FONT}`;
            titleSize = ctx.measureText(username);
            reducFont += 1;
        }
    }
    ctx.fillText(username, TITLE_MARGIN_WIDTH, TITLE_MARGIN_HEIGHT);
};

const setThumbnail = (user, stock, want) => {
    const { username, hashId } = user;
    const canvas = createCanvas(200, 200);
    const ctx = initContext(canvas);

    loadImage(BG_IMG).then((image) => {
        ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);

        loadImage(LOGO).then((logo) => {
            ctx.drawImage(
                logo,
                MARGIN_LOGO,
                MARGIN_LOGO,
                LOGO_WIDTH,
                LOGO_HEIGHT,
            );
            displayUsername(ctx, username);
            displayPedlg(ctx);
            displayWant(ctx, want);
            displayStock(ctx, stock);
            displayLink(ctx, hashId);
            saveThumbnail(canvas, hashId);
        });
    });
};

const ThumbnailLink = {
    async set(id) {
        try {
            const user = await User.findOne({ where: { id } });
            const stock = await Stock.count({ where: { userId: id } });
            const want = await Want.count({ where: { userId: id } });
            setThumbnail(user, stock, want);
        } catch (e) {
            console.log(e);
        }
    },
};

module.exports = ThumbnailLink;
