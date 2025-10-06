export default function Task({ task }) {
    return (
        <div style={{ border: "1px solid black", margin: "0.5rem 0", padding: "0.5rem" }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    );
}
