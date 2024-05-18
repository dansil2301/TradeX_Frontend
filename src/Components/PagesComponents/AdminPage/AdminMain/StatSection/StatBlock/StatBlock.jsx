import "./StatBlock.css"

export function StatBlock({text, number}) {
    return (
        <div className="StatBlockComponent">
            <h2 className="StatBlockText TextGap">{text}</h2>
            <h1 className="StatBlockNumber TextGap">{number}</h1>
        </div>
    );
}