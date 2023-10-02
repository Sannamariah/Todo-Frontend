import React from 'react';
import { Form, Row, Input, Col } from "antd";
import { Todo } from './models/Todo';
import { TodosFormsProps } from './models/TodosFormsProps';

const TodosForm: React.FC<TodosFormsProps> = (props) => {
    const [form] = Form.useForm();
    const { onFormSubmit } = props;

    const onFinish = () => {
        const todo: Todo = {
            title: form.getFieldValue('title'),
            completed: false,
        };
        onFormSubmit(todo);
        form.resetFields();
    }

    return(
        <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className='todo-input'>
                <Row gutter={0}>
                    <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                        <Form.Item
                        name={'title'}
                        rules={[{ required: true, message: 'Lägg till text'}]}>
                            <Input placeholder="Vad har du att göra idag?" />
                        </Form.Item>    
                        </Col>  
                        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                        <button type="submit" className="todo-btn" > 
                                 Lägg till       
                            </button>
                        </Col>  
                </Row>        
        </Form>        
    )

}
export default TodosForm;