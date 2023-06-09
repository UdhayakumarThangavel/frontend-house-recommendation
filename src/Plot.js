import {useState } from "react";

export default function Plot(props) {
    const [isHover, setIsHover] = useState(false);
    const [enableOnClick, setEnableOnClick] = useState(false)
    const [hoverColor, setHoverColor] = useState("#00BFFFFF")
    function handleName(){
        const name1 = props.handlePlotNotoName(+props.layout[+props.rowIndex][+props.colIndex][0])
        const name2 = props.handlePlotNotoName(+props.layout[+props.rowIndex][+props.colIndex][1])
        const name3 = props.handlePlotNotoName(+props.layout[+props.rowIndex][+props.colIndex][2])
        return name1+" "+name2+" "+name3
    }

    const [name, setName] = useState(handleName());
    const handleMouseEnter = () => {
        if (!name.includes(props.handlePlotNotoName(props.selectedPlot)) && props.handlePlotNotoName(props.selectedPlot) !== 'Delete' ) {
            if(props.handlePlotNotoName(props.selectedPlot) === 'House' && !name.includes("Restaurant") && !name.includes("Hospital") && !name.includes("Gym")){
                setIsHover(true);
                setEnableOnClick(true)
                setName(`Plot ${props.handlePlotNotoName(props.selectedPlot)}`)
            }else if(props.handlePlotNotoName(props.selectedPlot) !== 'House'){
                if(!name.includes("House")){
                    console.log("yes")
                    setIsHover(true);
                    setEnableOnClick(true)
                    setName(`Plot ${props.handlePlotNotoName(props.selectedPlot)}`)
                }

            }
        } else if (props.handlePlotNotoName(props.selectedPlot) === 'Delete' && name !== '  ') {
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
        setName(handleName())
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
            console.log(enableOnClick)
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
