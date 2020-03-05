import React from 'react'
import {Modal, Form, Select, Input} from 'antd'

type ProfileSetting = {
  name: string
  domain: string
  username: string
  password: string
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const {Option} = Select

const SettingModal = ({isVisible = false, onClose, saveSetting}: {
  isVisible?: boolean
  onClose?: () => void
  saveSetting?: (settingData: any) => void
}) => {

  const [form] = Form.useForm();

  return(
    <Modal
      title="Setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            saveSetting && saveSetting(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="form_in_modal"
        // initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="profile"
          label="Profile"
          hasFeedback
        >
          <Select placeholder="Please select a Profile">
            <Option value="profile_1">Profile 1</Option>
            <Option value="profile_2">Profile 2</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="name" 
          label="Name" 
          rules={[{ required: true, message: 'Please input your profile name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="domain" 
          label="Domain" 
          rules={[{ required: true, message: 'Please input your kintone domain!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="username" 
          label="Username" 
          rules={[{ required: true, message: 'Please input your kintone username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          name="password" 
          label="Password" 
          rules={[{ required: true, message: 'Please input your kintone password!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SettingModal