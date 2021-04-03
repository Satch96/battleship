import { useState } from "react";
import { gridSize } from "../App"

function Ships(){

    createEnemyShips();

    return(
        <div className="shipContainer">
            <div className="myships draggable carrier" draggable="true" value="carrier" length = {5}></div>
            <div className="myships draggable battleship" draggable="true" value="battleship" length = {4}></div>
            <div className="myships draggable cruiser" draggable="true" value="cruiser" length = {3}></div>
            <div className="myships draggable submarine" draggable="true" value="submarine" length = {3}></div>
            <div className="myships draggable destroyer" draggable="true" value="destroyer" length = {2}></div>
        </div>
    )
}

function shipFactory(name, length, locations){

    let hits = 0;
    let hitDivs = [];

    function isSunk(target){

        hitDivs = [...hitDivs, target]
        if (hits === length){
            for (let i = 0; i < hitDivs.length; i++){
                hitDivs[i].classList.add("hit")
            }
            console.log("sunk")
        }
    }

    return{
        name,
        length,
        locations,
        hit(value, target){
            
            for (let i = 0; i < locations.length; i++){
                
                if(locations[i] === value){
                    console.log("hit")
                    target.innerHTML = "X"
                    target.classList.remove("hover")
                    hits++;
                    isSunk(target);
                    return 0;
                }
            }
        }
    }
}

function createEnemyShips(){

    let enemyLocations = [];

    function getLocation(shipLength){

        // function that will check to see if there are any coordinates that have already been used
        function checkShips(){
            
            for (let i = 0; i < enemyLocations.length; i++){
                
                for (let j = 0; j < coordinates.length; j++){

                    if (enemyLocations[i] === coordinates[j]){

                        coordinates = [];
                        shipFound = true;
                        return;
                    }
                }
            }

            for (let i = 0; i < coordinates.length; i++){
                enemyLocations = [...enemyLocations, coordinates[i]]
            }

            shipFound = false;

        }

        // function that generates locations
        function createLocations(){

            if (alignment === 0){
            
                const x_value =  Math.floor(Math.random() * (gridSize - shipLength));
                const y_value = Math.floor(Math.random() * gridSize)
                
                for (let i = 0; i < shipLength; i++){
                    coordinates = [...coordinates, (i + x_value).toString() + "" + y_value.toString()]
                }

            }
            else if (alignment === 1){

                const x_value =  Math.floor(Math.random() * gridSize);
                const y_value = Math.floor(Math.random() * (gridSize - shipLength))

                for (let i = 0; i < shipLength; i++){
                    coordinates = [...coordinates, x_value.toString() + "" + (i + y_value).toString()]
                }

            }
            
        }

         // generates a random number between 0 and 1 to determine ship alignment
         const alignment = Math.floor(Math.random() * 2);
        
         let shipFound = false;
         let coordinates = [];

         // do while loop that will generate new coordinates if some have already been used
        do{
            createLocations();
            checkShips();
        }
        while (shipFound === true)

        return coordinates;
        
    }

    const carrier = shipFactory("carrier", 5, getLocation(5));
    const battleship = shipFactory("battlehsip", 4, getLocation(4));
    const cruiser = shipFactory("cruiser", 3, getLocation(3));
    const submarine = shipFactory("submarine", 3, getLocation(3));
    const destroyer = shipFactory("destroyer", 2, getLocation(2))

    const enemyShips = [carrier, battleship, cruiser, submarine, destroyer]
    return enemyShips;

}

function createMyShips(gridvalue, shiptype, shiplength, myships){

    const coordinates = gridvalue.split("")
    const x_value = parseInt(coordinates[0]);
    const y_value = parseInt(coordinates[1]);


    for (let i = 0; i < myships.length; i++){
        if (shiptype === myships[i].name){

            myships[i].locations = []
            for (let j = 0; j < myships[i].length; j ++){
                myships[i].locations = [...myships[i].locations, (x_value + j).toString() + "" + y_value.toString()]
            }
            return
        }
    }

    let locations = []
    for (let j = 0; j < shiplength; j ++){
        locations = [...locations, (x_value + j).toString() + "" + y_value.toString()]
    }

    myships.push(shipFactory(shiptype, shiplength, locations))
}

export { createEnemyShips, shipFactory, createMyShips, Ships}
