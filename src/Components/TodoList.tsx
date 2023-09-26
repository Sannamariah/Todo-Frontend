import React, { useState, useEffect, useCallback} from "react";
import { Col, Layout, message, Row, Tabs } from "antd";
import { createTodo, loadTodos, updateTodo, deleteTodo } from '../services/todoServices';
import { Todo } from "./models/Todo";
import TodosForm from "./TodosForm";
import TodoTab from "./TodoTab";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    const queryClient = useQueryClient()

    const { isLoading, isError, data } = useQuery('todos', async () => {
        const data = await loadTodos();
        setActiveTodos(data.filter((todo : Todo) => todo.completed === false));
        setCompletedTodos(data.filter((todo : Todo) => todo.completed === true));
        return data
      }) 

    const createMutation = useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
            message.success('Added');
        },
    })

    const updateMutation = useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
            message.info('Updated');
        },
    })

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: () => {
        queryClient.invalidateQueries('todos')
        message.warning('Deleted');
    },
    onError: () => {
        console.log('Error deleteing todo')
   },
        
    })

    const handleFormSubmit = async (todo: Todo) => {
        createMutation.mutate(todo);
    }

    const handleToggleTodoStatus = async (todo: Todo) => {
        todo.completed = !todo.completed;
        updateMutation.mutate(todo);
    }

    const handleRemoveTodo = async (todo: Todo) => {
        if (typeof todo.id !== 'undefined' && 'id' in todo) {
            deleteMutation.mutate(todo.id);
        }
    }

    return (
        <Layout className="layout">
            <Content style={{ padding: '10px 60px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={15} offset={5}>
                            <h1>Todo Lista</h1>
                            <TodosForm onFormSubmit={handleFormSubmit} />
                            <br/>
                            {isLoading && <div>Loading todos from the server...</div>}
                            {isError && <div>Something went wrong</div>}
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="Alla" key="all">
                                    <TodoTab todos={data} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                <TabPane tab="In Progress" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Completed" key="complete">
                                    <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                            </Tabs>  
                        </Col>
                    </Row>
                </div>
            </Content>
    </Layout>
    );
}

export default TodoList;