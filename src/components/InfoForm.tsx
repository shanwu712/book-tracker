import React, { useState } from "react";
import styles from "./InfoForm.module.scss";
import { Button, Form, Input, Space, message } from "antd";
import { v4 as uuidv4 } from "uuid";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface InfoFormProps {
  onSubmit: (data: any) => void;
}

export default function InfoForm({ onSubmit }: InfoFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();

  function handleFinish(values: any) {
    if (!isValidUrl(imageUrl)) {
      message.error("Invalid URL!");
      return;
    }

    const data = { ...values, imageUrl, id: uuidv4() };

    onSubmit(data);
  }

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  function onReset() {
    form.resetFields();
    setImageUrl("");
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImageUrl(e.target.value);
  }

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={handleFinish}
      style={{ maxWidth: 600 }}
      className={styles.form}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="preview"
          style={{ maxWidth: "140px", marginTop: 8 }}
          className={styles.preview}
        />
      )}
      <Form.Item
        name="Book Name"
        label="Book Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Image URL">
        <Input
          placeholder="URL"
          value={imageUrl}
          onChange={handleImageChange}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
