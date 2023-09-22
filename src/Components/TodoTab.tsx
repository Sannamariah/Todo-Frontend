import { List } from "antd";
import TodoItem from './TodoItem';
import { TodosTabProps } from "./models/TodosTabProps";




const TodosTab = ({todos, onTodoToggle, onTodoRemoval}: TodosTabProps) => {
    return(
        <>
        <List
            locale={{emptyText:"Du har inga mer uppgifter att göra.",}}
            dataSource={todos}
            renderItem={(todo) => {
                return <TodoItem
                todo={todo}
                onTodoToggle={onTodoToggle}
                onTodoRemoval={onTodoRemoval}
                />
            }}
         />
        </>
    )
}

export default TodosTab;