import React from 'react';
import { List, Button, Checkbox, Popconfirm, } from 'antd';
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
                            defaultChecked={todo.completed}
                            />
                    <TodoEdit id={todo.id} title={todo.title} completed={todo.completed} />
                    <Popconfirm 
                        title={'Vill du radera din todo ?'}
                        onConfirm={() => {
                            return onTodoRemoval(todo);
                        }}>
                    <Button className='todo-btn' type='primary' danger ghost>
                        <DeleteOutlined />
                    </Button>
                    </Popconfirm>
            </List.Item>
        </div>
    )
}

export default Todo;