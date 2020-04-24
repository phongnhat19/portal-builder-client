import React, { useContext, useState, useEffect } from 'react'
import { Modal, Form, Select, Input } from 'antd'
import {ProfileContext} from '../../../App'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const { Option } = Select

const defaultValue = {
  name: '',
  domain: '',
  username: '',
  password: ''
}

const SettingModal = ({ isVisible = false, onClose }: {
  isVisible?: boolean
  onClose?: () => void
  saveSetting?: (settingData: any) => void
}) => {
  const [form] = Form.useForm();
  const {profiles, setProfiles} = useContext(ProfileContext);
  const [requiredField, setRequiredField] = useState(isVisible);

  useEffect(() => {
    setRequiredField(isVisible);
    form.validateFields();
  }, [isVisible]);

  return (
    <Modal
      title="Setting"
      visible={isVisible}
      okText="Save"
      onCancel={() => {
        form.resetFields();
        onClose && onClose();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            let newProfiles = [...profiles];
            let isEditProfile = false;
            newProfiles = newProfiles.map((profile) => {
              if (profile.profileId === values.profileId) {
                isEditProfile = true;
                return values as Profile;
              }
              return profile;
            })

            if (!isEditProfile) {
              values.profileId = values.name + Math.random()
              newProfiles = [...profiles, values as Profile]
            }
            setProfiles(newProfiles)
            window.localStorage.setItem("profiles", JSON.stringify(newProfiles))
            onClose && onClose()
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
          name="profileId"
          label="Profile"
          hasFeedback
        >
          <Select
            placeholder="Please select a Profile"
            onChange={(value) => {
              const result = profiles.filter(obj => obj.profileId === value)
              form.setFieldsValue(result[0] || defaultValue)
            }}>
              {
                profiles.map((profile, i) => {
                  return <Option key={i} value={profile.profileId}>{profile.name}</Option>
                })
              }
            <Option value="profile_add">Add new profile...</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: requiredField, message: 'Please input your profile name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="domain"
          label="Domain"
          rules={[{ required: requiredField, message: 'Please input your kintone domain!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: requiredField, message: 'Please input your kintone username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: requiredField, message: 'Please input your kintone password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SettingModal