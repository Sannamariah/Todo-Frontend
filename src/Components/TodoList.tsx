import React, { useState, useEffect, useCallback } from "react";
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
            message.success('Tillagd');
        },
    })

    const updateMutation = useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
            message.info('Uppdaterad');
        },
    })

    const deleteMutation = useMutation(deleteTodo, {
        onSuccess: () => {
        queryClient.invalidateQueries('todos')
        message.warning('Raderad');
    },
    onError: () => {
        console.log('Error din todo vart inte raderad')
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
        <Layout className="TodoWrapper">
            <Content style={{ padding: '8px 0px'}}>
                <div>
                    <Row>
                        <Col span={15} offset={5} >
                            <h1>Todo Lista</h1>
                            <TodosForm onFormSubmit={handleFormSubmit} />
                            <br/>
                            {isLoading && <div>Loading todos from the server...</div>}
                            {isError && <div>Something went wrong</div>}
                            <Tabs className="tabs" defaultActiveKey="all" tabPosition="top">
                                <TabPane tab="Alla" key="all">
                                    <TodoTab todos={data} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                <TabPane tab="Aktiva" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Klara" key="complete">
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