import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch, } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { TodoProps } from './models/TodoProps';

const Todo = ({todo, onTodoToggle}: TodoProps) => {
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
                </Tooltip>
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