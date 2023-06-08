import Plot from "./Plot";

export default function Layout(props) {

return (
    <div>
        <div className="container-xxl d-flex flex-column border rounded mt-3" style={{height: "83vh"}}>
            {props.layout.map((value, rowindex) => (
                <div key={rowindex + 1} className="row  flex-fill">
                    {value.map((value, colindex) => (
                        <Plot rowIndex={rowindex} colIndex={colindex} value={value}/>
                    ))}
                </div>
            ))}
        </div>
    </div>
)
}