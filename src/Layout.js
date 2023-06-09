import Plot from "./Plot";
import { useEffect } from "react";

export default function Layout(props) {
    useEffect(() => {
    }, [props.layout]);
    return (
        <div>
            <div className="container-xxl d-flex flex-column border rounded mt-3" style={{ height: "83vh" }}>
                {props.layout.map((value, rowindex) => (
                    <div key={`rowindex${rowindex}`} className="row  flex-fill">
                        {value.map((value, colindex) => (
                            <Plot key={colindex}
                                rowIndex={rowindex}
                                colIndex={colindex}
                                layout={props.layout}
                                handlePlot={props.handlePlot}
                                handlePlotNotoName={props.handlePlotNotoName}
                                selectedPlot={props.selectedPlot}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}