import {useState} from "react";

export default function Plot(props){
    const key = `${props.rowIndex+1}${props.colIndex+1}`
    const [isHover, setIsHover] = useState(false);
    const [name, setName] = useState(props.value);
    console.log(key)
    const handlePlotNotoName = (value) =>{
        switch (value){
            case 1:
                return 'House'
            case 2:
                return ''
        }
    }
    const handleMouseEnter = () => {
        setIsHover(true);
        setName("click to add")
    };
    const handleMouseLeave = () => {
        setIsHover(false);
        setName(props.value)
    };
    const boxStyle = {
        backgroundColor: 'rgb(0, 191, 255)',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    };
    const boxStyleNormal = {
        backgroundColor: 'rgba(246,246,246,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',

    };

    return(
        <div key={key}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
             style={isHover ?boxStyle:boxStyleNormal}  className="col border  d-flex flex-column ">
            {isHover?<span>{name}&nbsp;</span>:<span>{key}&nbsp;</span>}
        </div>
    )
}
