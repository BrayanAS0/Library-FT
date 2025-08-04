interface DialogProps {
  open: boolean;
  body: string;
  onClose: () => void;
  method: () => void;
}

export default function Dialog({ open, body, onClose, method }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900 z-10 shadow-2xl shadow-amber-200 ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-amber-400 bg-orange-50 md:w-[20vw] w-[85vw] rounded-2xl p-4">
        <div className="flex justify-end">
          <button
            className="bg-red-600 hover:scale-101 hover:bg-red-700 transition-all duration-200 absolute p-1 rounded-full m-2 size-7 text-center cursor-pointer flex justify-center items-center"
            onClick={onClose}
          >X</button>
        </div>
        <span className="p-3 block">{body}</span>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 w-2/6 cursor-pointer hover:scale-102 hover:bg-red-700 transition-all duration-200 rounded-2xl"
          >Cancel</button>
          <button
            className="bg-emerald-600 w-2/6 cursor-pointer hover:scale-102 hover:bg-green-700 transition-all duration-200 rounded-2xl"
            onClick={method}
          >Save</button>
        </div>
      </div>
    </div>
  );
}
