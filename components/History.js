export default function History({gratitudes}) {
    return (
        <div>
            {
                gratitudes.length > 0 ? (
                    <p className="text-white text-2xl">Previously you were grateful for: <span className="font-bold">{gratitudes.map(g => ' ' + g)}</span></p>
                ) : (
                    <p className="text-white text-2xl">No Previously entered gratitudes</p>
                )
            }
        </div>
    )
}