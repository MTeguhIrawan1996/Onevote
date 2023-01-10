import { useState } from "react";
import Button from "./Button";
import { createRoot } from "react-dom/client";

function Alter(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <div
      className={`relative z-10 ${!isOpen && "hidden"}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-zinc-100 bg-opacity-75" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full justify-center text-center items-center">
          <div className="relative transform overflow-hidden bg-white shadow-xl transition-all p-10 rounded-md">
            {/* Content */}
            <div className="flex flex-col w-full p-5 justify-center items-center space-y-6">
              <p className="text-2xl font-bold">{props.title || "Title"}</p>
              <p className="text-lg font-semibold">
                {props.message || "Message Here"}
              </p>
              <div className="flex w-full justify-center items-center gap-4">
                <button
                  className="text-sm w-2/4 bg-zinc-300 py-1 border-solid border-2 border-transparent hover:border-[#000000] hover:text-zinc-400 transition-all duration-300 delay-0 ease-cubic-bezier"
                  onClick={() => {
                    props.onNegativeClick;
                    setIsOpen(false);
                  }}
                >
                  {props.negativeBtnText || "Kembali"}
                </button>
                <button
                  className={`text-sm w-2/4 bg-zinc-300 py-1 border-solid border-2 border-transparent hover:border-[#000000] hover:text-zinc-400 transition-all duration-300 delay-0 ease-cubic-bezier ${
                    !props.onPositiveClick && "hidden"
                  }`}
                  onClick={() => {
                    props.onPositiveClick && props.onPositiveClick();
                    setIsOpen(false);
                  }}
                >
                  {props.positiveBtnText || "Ya"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShowAlert(props) {
  const alert = document.createElement("div");
  alert.id = alert;
  document.body.appendChild(alert);
  const root = createRoot(alert);
  root.render(
    <Alter
      isOpen={true}
      title={props.title}
      message={props.message}
      positiveBtnText={props.positiveBtnText}
      negativeBtnText={props.negativeBtnText}
      onPositiveClick={props.onPositiveClick}
      onNegativeClick={props.onNegativeClick}
    />
  );
}
