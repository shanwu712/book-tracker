import React, { useState } from "react";
import styles from "./InfoForm.module.scss";
import { Avatar, Button, Form, Input, Space, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import TextArea from "antd/es/input/TextArea";

interface InfoFormProps {
  onSubmit: (data: any) => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function InfoForm({ onSubmit }: InfoFormProps) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [form] = Form.useForm();

  function handleFinish(values: any) {
    if (!isValidUrl(image)) {
      message.error("Invalid URL!");
      return;
    }

    const data = {
      ...values,
      image,
      id: uuidv4(),
      review: { name: name, comment: values.comment },
    };

    onSubmit(data);
    onReset();
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
      style={{ maxWidth: 600, alignSelf: "center" }}
    >
      {image && (
        <img
          src={image}
          alt="preview"
          style={{ maxWidth: "140px", marginTop: 8 }}
          className={styles.preview}
        />
      )}
      <div className={styles.container}>
        <Space className={styles.book}>
          <Form.Item
            name="bookName"
            label="Book Name"
            rules={[{ required: true }]}
          >
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
            <Input
              placeholder="URL"
              value={image}
              onChange={handleImageChange}
            />
          </Form.Item>
        </Space>

        <Space direction="vertical" className={styles.comment}>
          <Avatar size="large" style={{ marginBottom: "14px" }}>
            {name.split(" ")[0]}
          </Avatar>
          <Form.Item name="name" label="User Name">
            <Input
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="comment" label="Comment">
            <TextArea style={{ maxHeight: "75px" }} />
          </Form.Item>
        </Space>
      </div>
      <Space
        style={{
          width: "100%",
          marginTop: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Space>
    </Form>
  );
}
