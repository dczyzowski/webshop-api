import React from "react";
import classNames from "classnames";


function Pages(props: { pagesCounts: number, currentPage: number, onPageChanged: (arg0: number) => void }) {

    const prevPage = () => props.onPageChanged(props.currentPage - 1)
    const nextPage = () => props.onPageChanged(props.currentPage + 1)

    interface shortcutType {
        type?: string;
        value?: string;
    }

    const pagesShortcut = (range: number, current: number): shortcutType[] => {
        let returnArray: shortcutType[] = [{ value: "1" }]

        if (range < 5 && range > 2) {
            for (var i = 2; i <= range - 1; i++) {
                returnArray.push({ value: i.toString() })
            }
        } else if (range > 2) {
            if (current - 1 >= 2) {
                if (current - 1 > 2)
                    returnArray.push({type:"dots", value: "..." })
                if (range - current >= 2)
                    returnArray.push({ value: String(current - 1) }, { value: String(current) }, { value: String(current + 1) })
                else {
                    if (range - current === 0)
                        returnArray.push({ value: String(current - 2) }, { value: String(current - 1) })
                    if (range - current === 1)
                        returnArray.push({ value: String(current - 1) }, { value: String(current) })
                }
            }
            else {
                if (current - 1 === 1) returnArray.push({ value: String(current) })
                returnArray.push({ value: String(current + 1) })
                if (range - current > 2 && current - 1 !== 1) returnArray.push({ value: String(current + 2) })
            }
            if (range - current > 2) {
                returnArray.push({type:"dots", value: "..." })
            }
        }
        returnArray.push({ value: range.toString() })
        return (
            returnArray
        )
    }

    return (
        <div >
            <ul className="pagination">
                <li 
                    key={"prev"}
                    className="nextPage"
                >
                    {props.currentPage > 1 ?
                        <a
                            className="arrow-left page-text"
                            onClick={
                                () => props.onPageChanged(props.currentPage - 1)
                            }>
                            Previous
                        </a> : <></>}
                </li>

                <div className="numbers">
                {pagesShortcut(props.pagesCounts, props.currentPage).map((item, index) => (
                    <li
                        key={index}
                        className="page"
                        onClick={!item.type ? 
                            () => props.onPageChanged(Number(item.value)) :
                            undefined
                        }>
                        <a className={classNames("page-text", {higlighted: !item.type, dots: item.type, active: Number(item.value) === props.currentPage} )}>
                            {item.value}
                        </a>
                    </li>
                ))}
                </div>

                <li key={"next"}>
                    {props.currentPage < props.pagesCounts ?
                        <a 
                            className="arrow-right page-text"
                            onClick={
                                () => props.onPageChanged(props.currentPage + 1)
                            }> 
                            Next 
                            </a> : <></>}
                </li>
            </ul>
        </div>
    )
}

export default Pages