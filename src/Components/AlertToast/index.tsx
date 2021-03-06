import { useEffect, useState } from "react";

interface AlertProps {
  show: boolean;
  close: () => void;
  message: string;
  level: string;
  timing?: number;
};

export default function AlertToast(props: AlertProps) {
  const [bgColor, setBgColor] = useState("info");
  useEffect(() => {
    switch (props.level) {
      case "info":
        setBgColor("bg-info");
        break;
      case "success":
        setBgColor("bg-success text-white");
        break;
      case "warning":
        setBgColor("bg-warning");
        break;
      case "danger":
        setBgColor("bg-danger text-white");
        break;
    }
    setTimeout(() => props.close(), props.timing ? props.timing : 5000);
  }, [props.level]);

  return props.show
    ? <div className="position-fixed bottom-0 start-50 translate-middle-x p-3" style={{ zIndex: 11 }}>
        <div className={`rounded shadow ${bgColor}`}>
          <div className="d-flex">
            <div className="toast-body">{props.message}</div>
            <button
              onClick={props.close}
              type="button"
              className="btn-close me-2 m-auto"
            ></button>
          </div>
        </div>
      </div>
    : <></>
  ;
}