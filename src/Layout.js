import {useState} from "react";
import Plot from "./Plot";

export default function Layout(props) {

return (
    <div>
        <div className="container-xxl d-flex flex-column border rounded mt-3" style={{height: "83vh"}}>
            {props.layout.map((value, rowindex) => (
                <div key={`rowindex${rowindex}`} className="row  flex-fill">
                    {value.map((value, colindex) => (
                        <Plot key={colindex} rowIndex={rowindex} colIndex={colindex} value={value}/>
                    ))}
                </div>
            ))}
        </div>
    </div>
)
}