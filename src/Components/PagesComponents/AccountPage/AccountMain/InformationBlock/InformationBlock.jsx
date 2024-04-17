import "./InformationBlock.css"

export function InformationBlock({ name, value }) {
    return (
        <div className="InformationBlock">
            <h3 className="InformationBlockHeader">{name}</h3>
            <h4 className="InformationBlockValue">{value}</h4>
        </div>
    );
}