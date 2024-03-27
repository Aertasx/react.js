import { Modal } from 'antd';

export const openConfirmModal = async (title, content, onOk, onCancel) => {
  Modal.confirm({
    title: title,
    content: content,
    onOk: () => onOk(),
    onCancel: onCancel,
  });
};