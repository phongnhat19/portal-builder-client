import React, { useRef, useState } from 'react'
import { Modal, Form, Select, Input } from 'antd'

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

const { Option } = Select

const dataOfSelectProfile = [{
  profileId: 'profile_1',
  name: 'Minh 1',
  domain: 'minh-sc-1.cybozu-dev.com',
  username: 'minh1',
  password: 'ahihi'
},
{
  profileId: 'profile_2',
  name: 'Minh 2',
  domain: 'minh-sc-2.cybozu-dev.com',
  username: 'minh2',
  password: 'ahihi'
}];

const defaultValue = {
  name: '',
  domain: '',
  username: '',
  password: ''
}

const SettingModal = ({ isVisible = false, onClose, saveSetting }: {
  isVisible?: boolean
  onClose?: () => void
  saveSetting?: (settingData: any) => void
}) => {

  const [form] = Form.useForm();

  return (
    <Modal
      title="Setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            console.log('Result: ', typeof values, values);
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
        initialValues={defaultValue}
      >
        <Form.Item
          name="profile"
          label="Profile"
          hasFeedback
        >
          <Select
            placeholder="Please select a Profile"
            onChange={(value) => {
              const result = dataOfSelectProfile.filter(obj => obj.profileId === value)
              console.log(result[0]);

              form.setFieldsValue(result[0] || defaultValue)
            }}>
            <Option value="profile_1">Profile 1</Option>
            <Option value="profile_2">Profile 2</Option>
            <Option value="profile_add">Add new profile...</Option>
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
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SettingModal