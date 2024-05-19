import "./TraderList.css"
import {TraderItem} from "./TraderItem/TraderItem.jsx";

export function TraderList({ data }) {
    const traders = data ? data : []

    return (
        <div className="TraderList">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                {traders.map((item) => (
                    <TraderItem key={item.id} item={item}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}