import { useState } from "react"

export default function Input ({ handleSubmit, hasSubmittedToday }) {
    let [value, setValue] = useState("")

    let submitForm = e => {
        e.preventDefault()
        handleSubmit(value)
        setValue = ""
    }

    return (
        !hasSubmittedToday ? (
            <form onSubmit={submitForm}>
                <input 
                    placeholder = "Enter gratitude"
                    type="text" 
                    value={value}
                    className="rounded px-3 py-3 my-3 w-3/5"
                    onChange={(e) => setValue(e.target.value)}
                >
                </input>
                <button type="submit" className="bg-indigo-300 rounded px-12 py-2 mx-3 w-48">
                    Save
                </button>
            </form>
        ) : (
            <div className="py-2">
            </div>
        )
    )
}