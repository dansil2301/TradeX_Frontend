export function TraderItem({ item }) {
    return (
        <tr>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.status}</td>
            <td>{item.createdAt.split("T")[0]}</td>
        </tr>
    )
}