import React from 'react';
import { Form, Input,Select,Button,Radio } from 'antd';
import Employee from '../../model/Employee'
import '../../component/employee/register.css';
const FormItem = Form.Item;
const Option = Select.Option;
var checkValue = [];
const RadioGroup = Radio.Group;
class employeeUpdate extends React.Component {
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
          console.log('update values of form: ', values);
          const {updateEmployeefromMap,changeUpdateStatusfromMap} = selfThis.props;
          const employee = new Employee(selfThis.props.chooseValue.id,values.userName,values.name,values.email,values.phone,checkValue);
            updateEmployeefromMap(employee);
            changeUpdateStatusfromMap(false);
        }
      });
        this.props.form.resetFields();
    }


    onChange=(e)=>{
        console.log('checked = ', e.target.value);
        checkValue[0]=({id:e.target.value});
        const setCheckValuefromMap = this.props.setCheckValuefromMap;
        setCheckValuefromMap(e.target.value);
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
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
                label={(
                    <span>
                用户名
              </span>
                )}
            >
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your userName!', whitespace: true }],
                    initialValue: this.props.chooseValue.userName
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
                initialValue: this.props.chooseValue.email
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
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                initialValue: this.props.chooseValue.name
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话："
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
                initialValue: this.props.chooseValue.phone
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>
            <FormItem>
                <RadioGroup onChange={this.onChange} value={this.props.checkValue}>
                    <Radio value={"Manager"}>Manager</Radio>
                    <Radio value={"ParkingBoy"}>ParkingBoy</Radio>
                </RadioGroup>
            </FormItem>
          <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create()(employeeUpdate);
  
  export default WrappedRegistrationForm 