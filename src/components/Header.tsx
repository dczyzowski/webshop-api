import React from "react";

function Header(){
    return(
        <div className="header">
            <div className='logo'>
                LOGO
            </div>
            <div className='menu'>
                <nav className='main-nav'>
                    <ul>
                        <li>Strona główna</li>
                        <li>Produkty</li>
                        <li>Kontakt</li>                        
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header