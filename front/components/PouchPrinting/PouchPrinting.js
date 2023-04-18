/* eslint no-param-reassign: 0 */
/* eslint no-unused-expressions: 0 */
import PropTypes from 'prop-types';

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import { useReactToPrint } from 'react-to-print';

import { GET_VARIETY } from 'lib/gql/queries';

import Loading from 'components/Loading';
import Canvas from './Canvas';

const MAX_WIDTH_FAMILY = 215;
const MAX_WIDTH_VARIETY = 175;
const MAX_WIDTH_LATIN_NAME = 170;
const MAX_WIDTH_TEXT_LIST = 160;
const MAX_WIDTH_URL_LIST = 180;
const ROTATION_TOP = (45 * Math.PI) / 180;
const ROTATION_BOTTOM = (450 * Math.PI) / 360;

const months = [
    { text: 'J', number: 1 },
    { text: 'F', number: 2 },
    { text: 'M', number: 3 },
    { text: 'A', number: 4 },
    { text: 'M', number: 5 },
    { text: 'J', number: 6 },
    { text: 'J', number: 7 },
    { text: 'A', number: 8 },
    { text: 'S', number: 9 },
    { text: 'O', number: 10 },
    { text: 'N', number: 11 },
    { text: 'D', number: 12 },
];

const centredRotatedFillText = (ctx, { text, x, y, width }) => {
    const measure = ctx.measureText(text);
    if (measure.width < width)
        ctx.fillText(text, x + (width - measure.width) / 2, y);
    else ctx.fillText(text, x, y, width);
};

const printcharacteristics = (ctx, text, array, { y, width }) => {
    const x = -55;
    if (array) {
        const joinArray = array.map(e => e?.nameFr).join(', ');
        ctx.font = '7px "Nunito"';
        const measure = ctx.measureText(text);

        ctx.fillText(text, x, y);
        ctx.font = 'bold 9px "Nunito"';

        ctx.fillText(joinArray, x + measure.width, y, width);
    }
};

const printPeriods = (ctx, periods, { x, y }) => {
    const offset = 11.5;
    if (periods) {
        ctx.fillStyle = 'green';
        months.forEach(month => {
            periods.forEach(period => {
                if (
                    month.number >= period.startDate &&
                    month.number <= period.endDate
                )
                    ctx.fillRect(x, y, 10, 10);
            });
            x += offset;
        });
    }
};

const PouchPrinting = ({ seedId }) => {
    const printRef = useRef();
    const { currentUser: user } = useSelector(state => state.auth);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    const { loading, error, data } = useQuery(GET_VARIETY, {
        variables: {
            id: Number(seedId),
        },
    });

    if (error) return `Error! ${error}`;
    if (loading) return <Loading />;

    const { variety_request: seed } = data;

    const draw = ctx => {
        const image = new Image();
        image.src = '/assets/images/bg_pouch.png';
        image.onload = () => {
            ctx.beginPath();
            ctx.drawImage(image, 0, 0, 600, 600);
            ctx.scale(1.5, 1.5);
            ctx.save();
            ctx.rotate(ROTATION_TOP);

            ctx.font = '15px Verdana';
            seed?.family &&
                centredRotatedFillText(ctx, {
                    text: seed.family,
                    x: 175,
                    y: -140,
                    width: MAX_WIDTH_FAMILY,
                });

            ctx.font = '20px Verdana';
            ctx.fillStyle = 'green';
            seed?.name &&
                centredRotatedFillText(ctx, {
                    text: seed.name,
                    x: 195,
                    y: -110,
                    width: MAX_WIDTH_VARIETY,
                });

            ctx.font = '10px Verdana';
            ctx.fillStyle = 'gray';
            seed?.latinName &&
                centredRotatedFillText(ctx, {
                    text: seed.latinName,
                    x: 200,
                    y: -95,
                    width: MAX_WIDTH_LATIN_NAME,
                });

            if (user.hashId && user.username) {
                ctx.font = '10px Nunito';
                ctx.fillStyle = 'grey';
                ctx.fillText(
                    `Toutes les variétés de ${user.username} ici:`,
                    360,
                    -30,
                    MAX_WIDTH_TEXT_LIST
                );

                ctx.font = '15px "Nunito"';
                ctx.fillStyle = 'green';

                ctx.fillText(
                    `${process.env.APP_URL}/partage/${user.hashId}`,
                    360,
                    -10,
                    MAX_WIDTH_URL_LIST
                );
            }
            ctx.restore();

            ctx.moveTo(170, 355);
            ctx.lineTo(45, 230);
            ctx.moveTo(180, 345);
            ctx.lineTo(55, 220);
            ctx.moveTo(160, 365);
            ctx.lineTo(35, 240);
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.save();
            ctx.moveTo(0, 0);
            ctx.translate(200, 200);
            ctx.rotate(ROTATION_BOTTOM);
            ctx.font = '8px Verdana';
            ctx.fillStyle = 'grey';
            let offset = 12;
            let x = -50;
            let y = -150;
            ctx.fillText(`Mois`, -90, y);

            months.forEach(month => {
                ctx.fillText(month.text, x, y);
                x += offset;
            });
            y = -143;
            ctx.fillStyle = 'black';
            ctx.fillText(`S.Abrité`, -90, -135);
            seed?.shelteredSowingDate?.length &&
                printPeriods(ctx, seed.shelteredSowingDate, {
                    x: -50,
                    y,
                });

            ctx.fillStyle = 'black';
            ctx.fillText(`S.Direct`, -90, -120);
            y += 14;
            seed?.directSowingDate?.length &&
                printPeriods(ctx, seed.directSowingDate, {
                    x: -50,
                    y,
                });

            ctx.fillStyle = 'black';
            ctx.fillText(`Récoltes`, -90, -105);
            y += 14;
            seed?.harvestDate?.length &&
                printPeriods(ctx, seed.harvestDate, {
                    x: -50,
                    y,
                });
            ctx.font = '7px "Nunito"';
            ctx.fillStyle = 'grey';
            y = -100;
            offset = 15;
            seed?.expositions?.length &&
                printcharacteristics(ctx, 'Exposition: ', seed.expositions, {
                    y: (y += offset),
                    width: 98,
                });

            seed?.waterNeeds?.length &&
                printcharacteristics(ctx, 'Arrosage: ', seed.waterNeeds, {
                    y: (y += offset),
                    width: 98,
                });

            seed?.growingMethods?.length &&
                printcharacteristics(ctx, 'Culture: ', seed.growingMethods, {
                    y: (y += offset),
                    width: 98,
                });
            seed?.soilQualities?.length &&
                printcharacteristics(ctx, 'Qualité sol: ', seed.soilQualities, {
                    y: (y += offset),
                    width: 85,
                });
            seed?.soilNatures?.length &&
                printcharacteristics(ctx, 'Nature sol :', seed.soilNatures, {
                    y: (y += offset),
                    width: 80,
                });
            seed?.precocities?.length &&
                printcharacteristics(ctx, 'Précocité :', seed.precocities, {
                    y: (y += offset),
                    width: 75,
                });

            ctx.restore();
        };
    };

    return (
        <div className="box">
            <h4 className="title is-4">Impression</h4>
            <h6 className="subtitle is-6">
                {`Imprimez votre pochon personnalisé pour ${seed.family}, ${seed.name}`}
            </h6>
            <hr />
            <h6 className="is-6">Aperçu:</h6>
            <div ref={printRef}>
                {!loading && seed && <Canvas draw={draw} />}
            </div>
            <button
                type="button"
                className="button is-fullwidth is-primary has-margin-left-1 has-margin-top-3"
                onClick={handlePrint}
            >
                Imprimer
            </button>
        </div>
    );
};

PouchPrinting.propTypes = {
    seedId: PropTypes.number.isRequired,
};

export default PouchPrinting;
