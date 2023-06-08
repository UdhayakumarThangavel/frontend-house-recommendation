import Layout from "./Layout";
import {useState} from "react";

function App() {
    const [row,setRow] = useState(0);
    const [col,setCol] = useState(0)
    const [selectedPlot,setSelectedPlot] = useState('House')
    const [layout, setLayout] = useState(new Array(0).fill(2).map(value => (
        new Array(0).fill(0)
    )));
    function handleSelectPlot(value){
        setSelectedPlot(value);
        console.log(selectedPlot)
    }

    function handleLayoutChange(){
        console.log(row)
        console.log(col)
        setLayout(new Array(+row).fill(2).map(value => (
            new Array(+col).fill(0)
        )))
        console.table(layout)
    }
  return (
    <div className="container-xxl">
        <div className="row">
            <div className="col-4">
                <div className="row">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Choose layout (MxN)</label>
                    <div className="col-2">
                        <input type="number" className="form-control" onChange={(e) => setRow(e.target.value)} placeholder="M"/>
                    </div>
                    <div className="col-2">
                        <input type="number" className="form-control" onChange={(e) => setCol(e.target.value)} placeholder="N"/>
                    </div>
                    <div className="col-8">
                        <button type="button" className="btn btn-primary" onClick={()=>handleLayoutChange()}>Create layout</button>
                    </div>
                </div>
            </div>
            <div className="col-4">

            </div>
            <div className="col-4 ">
                <div className="row">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Select Plot</label>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="btn-group d-grid gap-2">
                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectedPlot}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => handleSelectPlot('House')}>House</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSelectPlot('Restaurant')}>Restaurant</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSelectPlot('Hospital')}>Hospital</a></li>
                                <li><a className="dropdown-item" onClick={() => handleSelectPlot('Gym')}>Gym</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" onClick={() => handleSelectPlot('Delete')}>Delete</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6 d-grid gap-2">
                        <button className="btn btn-success">Find Best House</button>
                    </div>

                </div>
            </div>
        </div>
        <Layout layout={layout}></Layout>
    </div>
  );
}

export default App;
