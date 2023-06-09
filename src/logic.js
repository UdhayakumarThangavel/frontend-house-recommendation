// Function find the plotted services
export function findServices(layout,currServiceType){
    const services = []
    for(let i=0;i<layout.length;i++){
        for(let j=0;j<layout[0].length;j++){
            if(layout[i][j][0]===currServiceType || layout[i][j][1]===currServiceType || layout[i][j][2]===currServiceType ){
                services.push([i,j])
            }
        }
    }
    return services
}


// Function find the plotted houses
export function findHouses(layout){
    const houses = []
    for(let i=0;i<layout.length;i++){
        for(let j=0;j<layout[0].length;j++){
            if(layout[i][j][0]>=1000){
                houses.push([i,j])
            }
        }
    }
    return houses
}


// Function to find the shortest distance
export function findShortestDistance(tempLayout,currHouse,currService){
    const routes= []
    let m=tempLayout.length
    let n=tempLayout[0].length

    // Create a map to measure the distances
    const map = new Array(m).fill(Number.POSITIVE_INFINITY).map(()=>(
        new Array(n).fill(Number.POSITIVE_INFINITY)
    ))
    map[currHouse[0]][currHouse[1]] = 0

    // Start route with distance 0 and current house coordinates
    const start = [0,currHouse[0],currHouse[1]]
    routes.push(start)

    // Directions
    const dirRow = [-1,0,1,0]
    const dirCol = [0,1,0,-1]

    while (routes.length!==0){
        const currRoute = routes.shift()
        let dis = currRoute[0]
        let row = currRoute[1]
        let col = currRoute[2]
        for(let i=0;i<4;i++){
            let newRow = row + dirRow[i]
            let newCol = col + dirCol[i]

            // Checking the new coordinates are within the layout boundaries and the new distance is smaller than the previous distance
            if(newRow >= 0 && newCol >= 0 && newRow < m && newCol < n && dis+1 < map[newRow][newCol]){
                map[newRow][newCol] = 1+dis
                if(newRow === currService[0] && newCol === currService[1]){
                    return dis+1;
                }

                // Create the next route with updated distance and coordinates
                const nextRoute = [1+dis,newRow,newCol]
                routes.push(nextRoute)
            }
        }
    }
    return 0
}