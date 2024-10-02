export const Task = (props) => {return (<div>
    <button onClick={() => props.completeTask(props.id)}>Mark</button>
    <h1 style={{color: props.completed ?"green":"black"}}>{props.name}</h1>
    <button onClick={() => props.deleteTask(props.id)}>D</button>
    </div>);};