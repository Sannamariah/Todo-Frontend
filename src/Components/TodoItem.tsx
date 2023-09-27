import React from 'react';
import { List, Button, Checkbox, } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TodoProps } from './models/TodoProps';
import TodoEdit from './TodoEdit';



const Todo = ({todo, onTodoToggle, onTodoRemoval}: TodoProps) => {
    return (
        <div className="Todo">
            <List.Item>
                <p> {todo.title}</p>
                        <Checkbox 
                            onChange={() => onTodoToggle(todo)}
                            defaultChecked={todo.completed}>
                        </Checkbox>
                    <TodoEdit id={todo.id} title={todo.title} completed={todo.completed} 
                    />
                    <Button className='todo-btn' type='primary' danger ghost>
                        <DeleteOutlined />
                    </Button>
            </List.Item>
        </div>
    )
}

export default Todo;