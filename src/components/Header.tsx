import React, { useState } from "react";
import '../styles/Header.scss'



const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

function Header(props: {onSearchValueChange : (search : string) => void}){
    const [searchValue, setSearchValue] = useState("men")
    return(
        <nav>
            <ul className="menu">
                <li key={"1"} className="logo"><a href="#">_LOGO</a></li>
                <li key={"2"} className="item"><a href="#">Home</a></li>
                <li key={"3"} className="item"><a href="#">Blog</a></li>
                <li key={"4"} className="item"><a href="#">Contact</a>
                </li>
                <li key={"7"} className="item button"><input 
                placeholder="Wyszukaj"
                value={searchValue} onChange={(e)=>{
                    setSearchValue(e.target.value)
                    props.onSearchValueChange(e.target.value)}}/></li>
                <li key={"5"} className="item button secondary"><a href="#">Sign Up</a></li>
                <li key={"6"} className="toggle"><a href="#"><i className="fas fa-bars"></i></a></li>
            </ul>
        </nav>
    )
}

export default Header