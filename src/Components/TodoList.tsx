import { Col, Layout, message, Row, Tabs } from "antd";
import { createTodo, loadTodos } from '../services/todoServices';
import { Todo } from "./models/Todo";
import { useCallback, useEffect, useState } from "react";
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
        message.success("Your Todo has been added!");
    }
    
    const onRefresh = useCallback( async () => {
        setRefreshing(true);

        setRefreshing(false);
    }, [refreshing]);

    const refresh = async () => {
        await loadTodos()
        .then(json => {
            setTodos(json);
        })
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
                                <TodoTab todos={todos} />
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