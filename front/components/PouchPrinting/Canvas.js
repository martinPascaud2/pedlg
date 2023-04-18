import PropTypes from 'prop-types';

import { useEffect, useRef } from 'react';

const Canvas = ({ draw }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const render = () => {
            draw(context);
        };
        render();
    }, [draw]);

    return <canvas ref={canvasRef} width="600" height="600" />;
};

Canvas.propTypes = {
    draw: PropTypes.func.isRequired,
};

export default Canvas;
