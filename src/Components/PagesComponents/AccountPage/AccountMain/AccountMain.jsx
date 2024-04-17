import "./AccountMain.css"
import {SignOutBtn} from "./SignOutBtn/SignOutBtn.jsx";
import {InformationBlock} from "./InformationBlock/InformationBlock.jsx";

export function AccountMain() {
    return(
        <div className="AccountMain">
            <section className="accountHeader">
                <h2 className="accountHeaderText">Trader Account</h2>
                <SignOutBtn/>
            </section>
            <line className="lineDelimiter"/>
            <h1 className="PersonalInformation">Personal Information</h1>
            <section className="PersonalInformationBlocks">
                <InformationBlock name="Username"/>
                <InformationBlock name="Email"/>
                <InformationBlock name="Status"/>
                <InformationBlock name="Created"/>
            </section>
        </div>
    );
}