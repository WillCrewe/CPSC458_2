export default function Greeting({user, gratitudes, hasSubmittedToday}) {
    return (
        <div>
            <h1 className="text-white text-6xl">
                Welcome, <span className="text-indigo-400">{user.email}</span>!
            </h1>
            
            {
                hasSubmittedToday ? (
                    <h2 className="text-white font-black text-5xl">
                        Today you are grateful for: <span className="text-indigo-400">{gratitudes.slice(-1)[0]}</span>
                    </h2>
                ) : (
                    <h2 className="text-white font-black text-5xl">
                        What are you grateful for today?
                    </h2>
                )
            }
        </div>
    )
}