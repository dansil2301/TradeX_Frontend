import "./InformationBlock.css"

export function InformationBlock({ name }) {
    return (
        <div className="InformationBlock">
            <h3 className="InformationBlockHeader">{name}</h3>
            <h4 className="InformationBlockValue">TEST</h4>
        </div>
    );
}