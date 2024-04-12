import {BackgroundImgOptions} from "../Components/TraderOptionsPage/BackgroundImg/BackgroundImgOptions.jsx";
import {TraderOptionsHeader} from "../Components/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {OptionsMain} from "../Components/TraderOptionsPage/TraderOptionsMain/OptionsMain.jsx";


export function TraderOptionsPage() {
    return (
        <div className="TraderOptionsBody" style={{ height: 'calc(100vh - 20px)'}}>
            <BackgroundImgOptions />
            <TraderOptionsHeader />
            <OptionsMain />
        </div>
    );
}