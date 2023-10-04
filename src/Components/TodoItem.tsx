import React from 'react';
import { List, Button, Checkbox, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TodoProps } from './models/TodoProps';
import TodoEdit from './TodoEdit';


const Todo = ({todo, onTodoToggle, onTodoRemoval}: TodoProps) => {
    return (
        <div className="Todo">
            <List.Item 
            actions={[
                <Tooltip
                title={todo.completed}>
                <Checkbox 
                                onChange={() => onTodoToggle(todo)}
                                value={todo.completed}>
                                </Checkbox>
                                </Tooltip>,
                                <TodoEdit id={todo.id} title={todo.title} completed={todo.completed} />,

                                <Popconfirm 
                                title={'Vill du radera din todo ?'}
                                onConfirm={() => {
                                    onTodoRemoval(todo);                                    
                                }}>
                                    
                                <Button className='todo-btn' type='primary' danger ghost>
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>
            ]}
            className="list-item"
            key={todo.id}
            >
                

                {todo.title}
            </List.Item>
        </div>
    )
}

export default Todo;