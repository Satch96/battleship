import { useEffect, useState } from "react"
import "./Gameboard.css"
import { createMyShips } from "./Ships"
import { gridSize } from "../App"

function Gameboard({ships, myShips}){

    
    let arr = []
    
    for (let i =0; i < gridSize ; i++){
        for (let j = 0; j < gridSize; j++)
        arr = [...arr, {x: i, y: j}]
    }

    const [turn, changeTurn] = useState("myturn")

    let triedLocations = []
    let myTriedLocations = []

    function receiveAttack(target, triedLocations, ships, turn){
        
        const value = target.getAttribute("value")

        // checks to see if any of the locations have been clicked yet
        for (let i = 0; i < triedLocations.length; i++){
            if (triedLocations[i] === value){
                return;
            } 
        }
        
        
        for (let i = 0; i < ships.length; i++){
            if (ships[i].hit(value, target) === 0){
               triedLocations = [...triedLocations, value]
               changeTurn(turn)
               return;
            }
        }
        target.classList.add("miss")
        target.classList.remove("hover")

    }

    function oneTurn(e){

        receiveAttack(e.target, triedLocations, ships)
        
        let mygridelements = document.querySelectorAll(".mygrid")
        let selected = Math.floor(Math.random() * mygridelements.length);

        receiveAttack(mygridelements[selected], myTriedLocations, myShips)
        
    }


    useEffect(()=>{
        displayShip(myShips)
    })



    return(
        <div className="grid-container">
            <div className="grid1">
            {arr.map((x,i)=>{
                if (i%gridSize === 0){
                    return <div value={x.x + "" + x.y} key={i} className="grid new mygrid"></div>
                }
                else{
                    return <div value={x.x + "" + x.y} key={i} className="grid mygrid"></div>
                }
            })}
            </div>
            <div>
            {arr.map((x,i)=>{
                if (i%gridSize === 0){
                    return <div value={x.x + "" + x.y} onClick={(e)=>oneTurn(e)} key={i} className="grid new hover"></div>
                }
                else{
                    return <div value={x.x + "" + x.y} onClick={(e)=>oneTurn(e)} key={i} className="grid hover"></div>
                }
            })}
            </div>
        </div>
    )

}

function displayShip(myShips){

    const draggables = document.querySelectorAll(".draggable");
    const drag_containers = document.querySelectorAll(".mygrid");

    let value = "";
    let element = "";
    let length = "";

    draggables.forEach(x=>{
        x.addEventListener("dragstart",()=>{
            element = x;
            value = x.getAttribute("value");
            length = x.getAttribute("length")
        })
    })


    drag_containers.forEach(x=>{
        x.addEventListener("dragenter",()=>{
            x.classList.add("dragging")
        })
        x.addEventListener("dragleave", ()=>{
            x.classList.remove("dragging")
        })
        x.addEventListener("dragover", (e)=>{
            e.preventDefault()
        })
        x.addEventListener("drop", (e)=>{
            x.append(element)
            x.classList.remove("dragging")
            createMyShips(x.getAttribute("value"), value, length, myShips)
        })
    })
}


export { Gameboard }