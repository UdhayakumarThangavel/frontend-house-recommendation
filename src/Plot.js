import {useState } from "react";

export default function Plot(props) {
    const [isHover, setIsHover] = useState(false);
    const [enableOnClick, setEnableOnClick] = useState(false)
    const [hoverColor, setHoverColor] = useState("#00BFFFFF")
    const [name, setName] = useState(props.handlePlotNotoName(+props.layout[+props.rowIndex][+props.colIndex]));

    const handleMouseEnter = () => {
        if (name === ' ' && props.handlePlotNotoName(props.selectedPlot) !== 'Delete' ) {
            setIsHover(true);
            setEnableOnClick(true)
            setName(`Plot ${props.handlePlotNotoName(props.selectedPlot)}`)
        } else if (props.handlePlotNotoName(props.selectedPlot) === 'Delete' && name !== ' ') {
            setHoverColor("#EA6969FF")
            setIsHover(true);
            setEnableOnClick(true)
            setName(`${props.handlePlotNotoName(props.selectedPlot)}`)
        }

    };
    const handleMouseLeave = () => {
        setIsHover(false);
        setEnableOnClick(false)
        setHoverColor("#00BFFFFF")
        setName(props.handlePlotNotoName(+props.layout[+props.rowIndex][+props.colIndex]))
    };
    const boxStyleHover = {
        backgroundColor: hoverColor,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    };
    const boxStyleNormal = {
        backgroundColor: '#F6F6F67F',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',

    };

    const handleOnClick = () => {
        if (enableOnClick) {
            props.handlePlot(+props.rowIndex, +props.colIndex)
            handleMouseLeave()
        }
    }
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleOnClick()}
            style={isHover ? boxStyleHover : boxStyleNormal} className="col border  d-flex flex-column ">
            {isHover ? <span style={{ fontSize: 12 }}>{name}&nbsp;</span> : <span>{name}&nbsp;</span>}
        </div>
    )
}
