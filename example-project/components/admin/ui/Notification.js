import { notification } from 'antd';

export const openNotification = async (type, title, description, duration, closeFn) => {
  notification[type]({
    message: title,
    description: description,
    placement: 'top', //topRight
    duration,
    // closeIcon,
    onClose: closeFn
  });
};