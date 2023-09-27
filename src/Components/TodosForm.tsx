import React from 'react';
import { Col, Form, Input, Row } from "antd";
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
            layout="inline">
                <Row
                gutter={5}>
                            <Form.Item
                            name="title"
                            rules={[{ required: true, message: 'Lägg till text'}]}>
                                <Input className="todo-input" placeholder="Vad har du att göra idag?" />
                                <button type="submit" className="todo-btn" > 
                                 Lägg till       
                                </button>
                            </Form.Item>        
                </Row>        
        </Form>        
    )

}
export default TodosForm;