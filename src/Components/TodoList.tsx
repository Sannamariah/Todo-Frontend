import React, { useState, useEffect, useCallback} from "react";
import { Col, Layout, message, Row, Tabs } from "antd";
import { createTodo, loadTodos, updateTodo, deleteTodo } from '../services/todoServices';
import { Todo } from "./models/Todo";
import TodosForm from "./TodosForm";
import TodoTab from "./TodoTab";



const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);

    const handleFormSubmit = async (todo : Todo) => {
        await createTodo(todo);
        onRefresh();
        message.success("Din todo är nu tillagd");
    }
    const handleToggleTodoStatus = async (todo : Todo) => {
        todo.completed = !todo.completed;
        await updateTodo(todo);
        onRefresh();
        message.info('Din todo är nu updaterad!');
    }
    const handleRemoveTodo = async (todo: Todo) => {
       if (typeof todo.id !== 'undefined' && 'id' in todo) {
        await deleteTodo(todo.id);
        onRefresh();
        message.warning('Din todo är nu raderad');
       }
    }
    
    const onRefresh = useCallback( async () => {
        setRefreshing(true);
        await loadTodos()
        setRefreshing(false);
    }, [refreshing]);

    const refresh = async () => {
        await loadTodos()
        .then(json => {
            setTodos(json);
        });
    }

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (
        <Layout className="layout">
            <Content style={{ padding: '10px 60px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={15} offset={5}>
                            <h1>Todo Lista</h1>
                            <TodosForm onFormSubmit={handleFormSubmit} />
                            <br/>
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="Alla" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
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