import {BackgroundImgOptions} from "../Components/PagesComponents/TraderOptionsPage/BackgroundImg/BackgroundImgOptions.jsx";
import {TraderOptionsHeader} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsHeader/TraderOptionsHeader.jsx";
import {OptionsMain} from "../Components/PagesComponents/TraderOptionsPage/TraderOptionsMain/OptionsMain.jsx";


export function TraderOptionsPage() {
    return (
        <div className="TraderOptionsBody" style={{ height: 'calc(100vh - 20px)'}}>
            <BackgroundImgOptions />
            <TraderOptionsHeader />
            <OptionsMain />
        </div>
    );
}