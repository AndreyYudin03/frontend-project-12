import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notify = (text, type) => {
  toast[type](text, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default Notify;
