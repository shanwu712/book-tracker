import React, { useState } from "react";
import styles from "./InfoForm.module.scss";
import { Button, Form, Input, Space, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import TextArea from "antd/es/input/TextArea";

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
  const [image, setImage] = useState("");
  const [form] = Form.useForm();

  function handleFinish(values: any) {
    if (!isValidUrl(image)) {
      message.error("Invalid URL!");
      return;
    }

    const data = { ...values, image, id: uuidv4() };

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
    setImage("");
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImage(e.target.value);
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
      {image && (
        <img
          src={image}
          alt="preview"
          style={{ maxWidth: "140px", marginTop: 8 }}
          className={styles.preview}
        />
      )}
      <Form.Item name="bookName" label="Book Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <TextArea style={{ maxHeight: "100px" }} />
      </Form.Item>
      <Form.Item label="image">
        <Input placeholder="URL" value={image} onChange={handleImageChange} />
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
