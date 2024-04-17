import {IndexHeader} from "../Components/PagesComponents/IndexPage/IndexHeader/IndexHeader.jsx";
import {BackgroundImg} from "../Components/PagesComponents/IndexPage/BackgroundImg/BackgroundImg.jsx";
import {StarterBlock} from "../Components/PagesComponents/IndexPage/IndexMain/StarterBlock/StarterBlock.jsx";


export function IndexPage() {
    return (
        <div className="IndexBody" style={{ height: 'calc(100vh - 20px)'}}>
            <IndexHeader />
            <StarterBlock />
            <BackgroundImg />
        </div>
    );
}