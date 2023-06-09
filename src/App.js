import Layout from "./Layout";
import { useState } from "react";
import {findHouses, findServices, findShortestDistance} from "./logic";
import {Modal} from "react-bootstrap";

function App() {
    const [row, setRow] = useState(null);
    const [col, setCol] = useState(null)
    const [houseIndex,setHouseIndex] = useState(0)
    const [housesCount,setHouseCount] = useState(0)
    const [isLayoutCreated, setIsLayoutCreated] = useState(false)
    const [selectedPlot, setSelectedPlot] = useState(1)
    const [showResult,setShowResult] = useState(false)
    const [result,setResult] = useState({
        heading:"Plot the House",
        bestHouse:'',
        score:'',
        serviceDistance:{
            Restaurant:0,
            Hospital:0,
            Gym:0
        }
    })
    const [layout, setLayout] = useState(new Array(0).fill(2).map(() => (
        new Array(0).fill(0).map(()=>(new Array(3).fill(0)))
    )));

    //console.table(layout)
    const handlePlotNotoName = (value) => {
        if(value===1){
            return `House`
        }else if(value===2){
            return 'Restaurant'
        }else if(value===3){
            return 'Hospital'
        }else if(value===4){
            return 'Gym'
        }else if(value===-1){
            return 'Delete'
        }else if(value>=1000){
            return `House ${value%100}`
        }else {
            return ''
        }
    }
    function handleSelectPlot(value) {
        setSelectedPlot(value);
    }
    function handlePlot(rowIndex, colIndex) {
        const tempLayout = layout
        if (selectedPlot === -1) {
            const h = '' + tempLayout[rowIndex][colIndex][0]
            if(h.includes("House")){
                tempLayout[rowIndex][colIndex][0] = 0
                tempLayout[rowIndex][colIndex][1] = 0
                tempLayout[rowIndex][colIndex][2] = 0
            }else{
                tempLayout[rowIndex][colIndex][0] = 0
                tempLayout[rowIndex][colIndex][1] = 0
                tempLayout[rowIndex][colIndex][2] = 0
                if(housesCount>0){
                    setHouseCount(housesCount-1)
                }
            }
        } else {
            if(selectedPlot===1){
                console.log(tempLayout[rowIndex][colIndex][0])
                tempLayout[rowIndex][colIndex][0] = 1000+houseIndex+1
                setHouseCount(housesCount+1)
                setHouseIndex(houseIndex+1)
            }else {
                if(selectedPlot===2){
                    tempLayout[rowIndex][colIndex][0] = selectedPlot
                }else if(selectedPlot===3){
                    tempLayout[rowIndex][colIndex][1] = selectedPlot
                }else if(selectedPlot===4){
                    tempLayout[rowIndex][colIndex][2] = selectedPlot
                }

            }

        }
        setLayout(tempLayout)
        console.table(layout)
    }
    function handleLayoutChange() {
        if (isLayoutCreated) {
            setLayout(new Array(0).fill(0).map(() => (
                new Array(0).fill(0).map(()=>(new Array(3).fill(0)))
            )))
            setIsLayoutCreated(false)
            setRow(null)
            setCol(null)
            setSelectedPlot(1)
            setHouseCount(0)
            setHouseIndex(0)
            setResult({
                heading:"Plot the House",
                bestHouse:'',
                score:'',
                serviceDistance:{
                    Restaurant:0,
                    Hospital:0,
                    Gym:0
                }
            })
        } else {
            if (row > 1 && col > 1) {
                setLayout(new Array(+row).fill(2).map(() => (
                    new Array(+col).fill(0).map(()=>(new Array(3).fill(0)))
                )))
                setIsLayoutCreated(true)
            } else {
                alert("layout value should be at least 2x2")
                setRow(null)
                setCol(null)
            }
        }
    }

    function handleFindBestHouse(){
        if(housesCount>0){
            const houses = findHouses(layout)
            const houseScores = []
            for(let i=0;i<houses.length;i++){
                const allServiceDistance =[]
                for(let j=2;j<5;j++){
                    const currServices = findServices(layout,j)
                    const serviceDistance =[]
                    for(let k=0;k<currServices.length;k++){
                        const shortestDistance = findShortestDistance(layout,houses[i],currServices[k])
                        serviceDistance.push(shortestDistance)
                    }
                    let min = 0
                    if(serviceDistance.length > 0){
                        min = serviceDistance.reduce((prev,curr) =>{
                            return Math.abs(prev) < Math.abs(curr) ? prev : curr
                        })
                    }
                    //console.log(serviceDistance)
                    allServiceDistance.push(min)
                }
                //console.log(allServiceDistance)
                const houseScore = allServiceDistance.reduce((prev,curr)=>prev + curr,0)
                houseScores.push([houses[i],houseScore,allServiceDistance])
            }
            let tempMin = 0
            for(let i=0;i<houseScores.length;i++){
                if(houseScores[tempMin][1] > houseScores[i][1]){
                    tempMin = i
                }
            }
            const bestHouse = houseScores[tempMin]
            setResult({
                heading:"Best House",
                bestHouse:`House ${layout[bestHouse[0][0]][bestHouse[0][1]][0]%100}`,
                score:`Overall Score: ${bestHouse[1]}`,
                serviceDistance:{
                    Restaurant:bestHouse[2][0],
                    Hospital:bestHouse[2][1],
                    Gym:bestHouse[2][2]
                }
            })
            setShowResult(true)
        }else {
            setResult({
                heading:"Plot the House",
                bestHouse:"You don't have any houses in the layout.",
                score:'',
                serviceDistance:{
                    Restaurant:0,
                    Hospital:0,
                    Gym:0
                }
            })
            setShowResult(true)
        }

    }

    return (
        <div className="container-xxl mt-1 d-flex flex-wrap flex-column">
            <div className="row  flex-fill">
                <div className="col d-flex flex-column">
                    <div className="row  flex-fill">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Choose layout (MxN)</label>
                        <div className="col d-flex flex-column" style={{minWidth:'9rem',margin:5}}>
                            <input type="number" disabled={isLayoutCreated} className="form-control" value={'' + row} onChange={(e) => setRow(e.target.value)} placeholder="Enter row" />
                        </div>
                        <div className="col d-flex flex-column" style={{minWidth:'9rem',margin:5}}>
                            <input type="number" disabled={isLayoutCreated} className="form-control" value={'' + col} onChange={(e) => setCol(e.target.value)} placeholder="Enter col" />
                        </div>
                        <div className="col d-flex flex-column" style={{minWidth:'18rem',margin:5}}>
                            <button type="button" className="btn btn-primary" onClick={() => handleLayoutChange()}>{isLayoutCreated ? 'Discard Layout' : 'Create layout'}</button>
                        </div>
                    </div>
                </div>

                    {isLayoutCreated ? <div className="col d-flex flex-column "> <div className="d-flex flex-column" >
                        <div className="row flex-fill" >
                            <label htmlFor="exampleFormControlInput1" className="form-label">Select Plot</label>
                            <div className="col  d-flex flex-column" style={{minWidth:'18rem',margin:5}} >
                                <div className="btn-group d-grid gap-2">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {handlePlotNotoName(selectedPlot)}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><p className="dropdown-item" onClick={() => handleSelectPlot(1)}>House</p></li>
                                        <li><p className="dropdown-item" onClick={() => handleSelectPlot(2)}>Restaurant</p></li>
                                        <li><p className="dropdown-item" onClick={() => handleSelectPlot(3)}>Hospital</p></li>
                                        <li><p className="dropdown-item" onClick={() => handleSelectPlot(4)}>Gym</p></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><p className="dropdown-item" onClick={() => handleSelectPlot(-1)}>Delete</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col d-flex flex-column" style={{minWidth:'18rem',margin:5}}>
                                <div className="d-grid gap-2">
                                    <button onClick={()=> handleFindBestHouse()}  className="btn btn-success">Find Best House</button>
                                </div>
                            </div>
                        </div>
                    </div> </div>: <div />}

            </div>
            <Layout layout={layout} handlePlot={handlePlot} handlePlotNotoName={handlePlotNotoName} selectedPlot={selectedPlot}></Layout>
            <Modal show={showResult} onHide={()=>setShowResult(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{result.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="t-3 fs-4 fw-bold">{result.bestHouse}</p>
                    <p>{result.score}</p>
                    {result.serviceDistance.Restaurant>0?<p>Restaurant: {result.serviceDistance.Restaurant} km</p>:<p></p>}
                    {result.serviceDistance.Hospital>0?<p>Hospital: {result.serviceDistance.Hospital} km</p>:<p></p>}
                    {result.serviceDistance.Gym>0?<p>Gym: {result.serviceDistance.Gym} km</p>:<p></p>}
                </Modal.Body>

                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={()=>setShowResult(false)}>
                        Okay
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default App;
