import {useState} from "react"

export const ToDo = (props) => {
    const {content} = props   

    const[done, setDone] = useState(props.done)

    const handleImportant = () => {
        setDone(!done)
    }

    return (
        <li>
            <p>{content}</p>
            {<button onClick={() => handleImportant}>{done ? "Done" : "Not done"}</button>}
        </li>
    )
}