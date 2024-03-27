import { Modal, Button } from 'antd';

export const checkProdsConfirmModal = async (title, content, onOk, onAction2, onCancel) => {
  Modal.confirm({
    title: title,
    content: content,
    onOk: () => onOk(),
    okText: 'Evet',
    okType: 'primary',
    okButtonProps: { danger:true },
    onCancel: onCancel,
    cancelText: 'Vazgeç',
    footer: (_, { OkBtn, CancelBtn }) => (
      <>
        <CancelBtn />
        <Button type="primary" key="action-2" onClick={() => onAction2()}>Hayır</Button>
        <OkBtn />
      </>
    ),
  });
};

export const confirmModalCloseHandler = () => {
  Modal.destroyAll();
}