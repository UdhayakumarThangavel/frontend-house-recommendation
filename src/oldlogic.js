
export default function oldlogic(layout){
    console.table(layout)
    console.log(layout)
    const flat = layout.flat()
    const indexogHouses = []
    const indexHospitals = []

    for(let i=0; i<flat.length; i++){
        if(flat[i]===1){
            indexogHouses.push(i)
        }else if(flat[i]===3){
            indexHospitals.push(i)
        }
    }
    console.log(indexogHouses)
    console.log(indexHospitals)
    for(let i=0;i<indexogHouses.length;i++){
        let houseIndex = indexogHouses[i]
        //findNearestHospital(houseIndex)
    }
    findNearestHospital(indexogHouses[0])
    function findNearestHospital(house){
        const formattedHouseIndex = (Math.floor(house/5))+ (Math.floor(house%5))

        // console.log(formattedHouseIndex)
        // //works
        console.log((Math.floor(indexHospitals[0]/5))+ (Math.floor(indexHospitals[0]%5))-formattedHouseIndex)
        console.log('--------------------')
        console.log((Math.floor(indexHospitals[1]/5))+ (Math.floor(indexHospitals[1]%5))-formattedHouseIndex)
        console.log('--------------------')
        console.log((Math.floor(indexHospitals[2]/5))+ (Math.floor(indexHospitals[2]%5))-formattedHouseIndex)
        console.log('--------------------')
        console.log((Math.floor(indexHospitals[3]/5))+ (Math.floor(indexHospitals[3]%5))-formattedHouseIndex)

        const hospitalDistance = []
        for(let i=0;i<indexHospitals.length;i++){
            const formattedHospitalIndex = (Math.floor(indexHospitals[i]/5))+ (Math.floor(indexHospitals[i]%5))
            hospitalDistance.push(Math.abs(Math.abs(Math.abs(formattedHospitalIndex )- Math.abs(formattedHouseIndex))))
        }
        //console.log(Math.min(...hospitalDistance))
    }
}