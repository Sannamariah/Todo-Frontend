import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch, } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { TodoProps } from './models/TodoProps';
import TodoEdit from './TodoEdit';

const Todo = ({todo, onTodoToggle, onTodoRemoval}: TodoProps) => {
    return (
        <List.Item
            actions={[
                <Tooltip
                    title={todo.completed ? 'Markera som klar' : 'Markera som icke klar'}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            onChange={() => onTodoToggle(todo)}
                            defaultChecked={todo.completed}
                        />
                </Tooltip>,
                <TodoEdit id={todo.id} title={todo.title} completed={todo.completed} />,
                <Popconfirm
                title={'Vill du radera din todo ?'}
                onConfirm={() => {
                    onTodoRemoval(todo);
                }}>
                    <Button className='remove-todo-btn' type='primary' danger>
                        X
                    </Button>
                </Popconfirm>
            ]}
        className="list-item"
        key={todo.id}
        >
            <div className='todo-item'>
                <Tag color={todo.completed ? 'lime' : 'magenta'} className="Todo-tag">
                    {todo.title}
                </Tag>
            </div>
        </List.Item>
    )
}

export default Todo;