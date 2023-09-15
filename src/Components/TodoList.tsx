import TodoForm From './TodosForm';
import { createTodo } from './services/todoServices';
import { Todo } from "./models/Todo";

const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(False);

    const handleFormSumit = async (todo : Todo) => {
        await createTodo(todo);
        onRefresh();
        message.success("Your Todo has been added!");
    }
    
    const onRefresh = useCallback( async () => {
        setRefreshing(true);

        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {

    }, [onRefresh])

    return (
       <Layout className="layout">
            <Content style={{ padding: '10px 60px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={15} offset={5}>
                            <h1>Todo List</h1>
                            <TodosForm onFormSubmit={handleFormSumit} />
                            <br/>
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                </TabPane>
                                <TabPane tab="In Progress" key="active">
                                </TabPane>
                                <TabPane tab="Completed" key="complete">
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