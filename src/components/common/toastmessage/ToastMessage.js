import "./ToastMessage.css";
import { useToast } from "../../../context/ToastContext";

const ToastMessage = () => {
  const { toast } = useToast();

  // 토스트가 보이지 않을 때는 아예 DOM에서 제거
  if (!toast.visible) {
    return null;
  }

  return (
    <div className="toast-container show-toast">
      <p className="toast-message">{toast.message}</p>
    </div>
  );
};

export default ToastMessage;
