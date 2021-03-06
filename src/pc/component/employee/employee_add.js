import React from 'react';
import { Form, Input,Select,Button} from 'antd';
import Employee from '../../model/Employee'
import '../../component/employee/register.css';
const FormItem = Form.Item;
const Option = Select.Option;

class employeeAdd extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const selfThis = this;
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                console.log('Received values of form: ', values);
                const {addEmployeefromMap,changeAddStatusfromMap} = selfThis.props;
                const employee = new Employee("",values.userName,values.name,values.email,values.phone);
                addEmployeefromMap(employee);
                changeAddStatusfromMap(false);
                this.props.form.resetFields();
            }
        });
    }
    checkPhoneConfirm=(rule, value, callback)=>{
        var regPos = /^[0-9]+.?[0-9]*/; // 非负整数

        if(value.length!=0){
            if(value.length==11&&regPos.test(value)){
                callback();
            }
            else{
                callback("请至少输入正确的电话号码");
            }
        }
        else{
            callback();
        }

    }
    checkNameConfirm=(rule, value, callback)=>{
        if(value.length!=0){
            console.log(value);
            console.log(this.props.employeeList);
            let list = this.props.employeeList.filter(x=>x.name===value);
            console.log(list);
            if(list.length>0){
                callback("用户名已存在");

            }
            else{
                callback();
            }
        }
        else{
            callback();
        }

    }

    render() {
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        return (
            <Form onSubmit={this.handleSubmit} >
                <FormItem
                    {...formItemLayout}
                    label="用户名："
                >
                    {getFieldDecorator('name', {
                        rules: [ {required: true, message: 'Please input your name!',},
                            { validator: this.checkNameConfirm }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱："
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                姓名

              </span>
                    )}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your userName!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话："
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' },
                            { validator: this.checkPhoneConfirm }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(employeeAdd);

export default WrappedRegistrationForm